using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Authoring;
using Mastemy.Api.Modules.YouTube;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Catalog;

/// <summary>Authoring productivity on top of <see cref="StudioService"/>: duplicate course/module/lesson, bulk lessons, templates.</summary>
public partial class StudioService
{
    public const int MaxBulkLessons = 100;

    public async Task<StudioCourseDto> DuplicateCourse(Guid sourceId, DuplicateCourseRequest req)
    {
        var uid = me.RequireId();
        var src = await db.Courses.AsNoTracking().Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == sourceId)
                  ?? throw AppException.NotFound("Course");
        await scope.RequireCourseManager(sourceId); // editors may not clone a course out of the team
        var title = string.IsNullOrWhiteSpace(req.Title) ? Truncate("Copy of " + src.Title, MaxTitle) : RequireText(req.Title, "title", MaxTitle);
        var modules = await db.Modules.AsNoTracking().Where(m => m.CourseId == sourceId).Include(m => m.Lessons).AsSplitQuery()
            .OrderBy(m => m.SortOrder).ToListAsync();

        var copy = new Course
        {
            OwnerId = uid, Title = title, Subtitle = src.Subtitle, Description = src.Description, Audience = src.Audience,
            Prerequisites = src.Prerequisites, Outcomes = src.Outcomes, Language = src.Language, Level = src.Level,
            PromoVideoId = src.PromoVideoId, CredentialType = src.CredentialType, PassThresholdPercent = src.PassThresholdPercent,
            Status = CourseStatus.Draft,
        };
        copy.Slug = await UniqueSlug(title);
        copy.Code = await UniqueCode(title);
        copy.Instructors.Add(new CourseInstructor { CourseId = copy.Id, UserId = uid, Role = CourseInstructorRole.Owner, RevenueSharePercent = 100m });
        foreach (var cat in src.Categories) copy.Categories.Add(new CourseCategory { CourseId = copy.Id, CategoryId = cat.CategoryId });

        var reuse = new Dictionary<Guid, bool>();
        var unlinked = new List<Guid>();
        await using var tx = await db.Database.BeginTransactionAsync();
        db.Courses.Add(copy);
        foreach (var m in modules)
        {
            var nm = new CourseModule { CourseId = copy.Id, Code = m.Code, Title = m.Title, SortOrder = m.SortOrder };
            db.Modules.Add(nm);
            foreach (var l in m.Lessons.OrderBy(l => l.SortOrder))
            {
                var nl = await CopyLesson(l, nm.Id, l.Code, l.Title, l.SortOrder, copy.Id, reuse);
                if (l.VideoAssetId is not null && nl.VideoAssetId is null) unlinked.Add(l.Id);
            }
        }
        audit.Record("course.duplicated", nameof(Course), copy.Id, new { sourceCourseId = sourceId, copy.Code, copy.Title, unlinkedVideoLessons = unlinked });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await Get(copy.Id);
    }

    public async Task<StudioModuleDto> DuplicateModule(Guid moduleId)
    {
        var m = await db.Modules.AsNoTracking().Include(x => x.Lessons).FirstOrDefaultAsync(x => x.Id == moduleId) ?? throw AppException.NotFound("Module");
        var c = await LoadEditableCourse(m.CourseId);
        var existing = await db.Modules.Where(x => x.CourseId == c.Id).Select(x => new { x.SortOrder, x.Code }).ToListAsync();
        var n = existing.Count + 1;
        while (existing.Any(e => e.Code == $"M{n}")) n++;
        var nm = new CourseModule { CourseId = c.Id, Code = $"M{n}", Title = Truncate("Copy of " + m.Title, MaxTitle), SortOrder = existing.Max(x => x.SortOrder) + 1 };
        await using var tx = await db.Database.BeginTransactionAsync();
        db.Modules.Add(nm);
        var reuse = new Dictionary<Guid, bool>();
        var i = 0;
        var lessons = new List<Lesson>();
        foreach (var l in m.Lessons.OrderBy(l => l.SortOrder))
        {
            i++;
            lessons.Add(await CopyLesson(l, nm.Id, $"{nm.Code}.L{i}", l.Title, i, c.Id, reuse));
        }
        Touch(c);
        audit.Record("module.duplicated", nameof(CourseModule), nm.Id, new { courseId = c.Id, sourceModuleId = moduleId, lessons = lessons.Count });
        RecordContentChange(c, "create", nameof(CourseModule), nm.Id, ["title", "lessons"], new { duplicatedFrom = moduleId });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        var assets = await AssetsOf(lessons);
        foreach (var l in lessons) l.VideoAsset = l.VideoAssetId is { } v ? assets.GetValueOrDefault(v) : null;
        return new StudioModuleDto(nm.Id, nm.Code, nm.Title, nm.SortOrder, lessons.Select(ToDto).ToList());
    }

    public async Task<StudioLessonDto> DuplicateLesson(Guid lessonId)
    {
        var (src, c) = await LoadEditableLesson(lessonId);
        var module = await db.Modules.AsNoTracking().FirstAsync(x => x.Id == src.ModuleId);
        var (code, sort) = await NextLessonSlot(module);
        await using var tx = await db.Database.BeginTransactionAsync();
        var nl = await CopyLesson(src, module.Id, code, Truncate("Copy of " + src.Title, MaxTitle), sort, c.Id, []);
        Touch(c);
        audit.Record("lesson.duplicated", nameof(Lesson), nl.Id, new { sourceLessonId = lessonId, moduleId = module.Id });
        RecordContentChange(c, "create", nameof(Lesson), nl.Id, ["title", "objective", "notesMarkdown"], new { duplicatedFrom = lessonId });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        if (nl.VideoAssetId is { } vid) nl.VideoAsset = await db.VideoAssets.AsNoTracking().FirstOrDefaultAsync(v => v.Id == vid);
        return ToDto(nl);
    }

    public async Task<List<StudioLessonDto>> BulkCreateLessons(Guid moduleId, BulkLessonsRequest req)
    {
        var m = await db.Modules.FirstOrDefaultAsync(x => x.Id == moduleId) ?? throw AppException.NotFound("Module");
        var c = await LoadEditableCourse(m.CourseId);
        var titles = req.Titles ?? throw AppException.Bad("titles is required.");
        if (titles.Length is 0 or > MaxBulkLessons) throw AppException.Bad($"titles must contain 1 to {MaxBulkLessons} entries.");
        var clean = titles.Select((t, i) => RequireText(t, $"titles[{i}]", MaxTitle)).ToList();
        var existing = await db.Lessons.Where(l => l.ModuleId == moduleId).Select(l => new { l.SortOrder, l.Code }).ToListAsync();
        var codes = existing.Select(e => e.Code).ToHashSet();
        var sort = existing.Count == 0 ? 0 : existing.Max(x => x.SortOrder);
        var n = existing.Count;
        var created = new List<Lesson>();
        foreach (var t in clean)
        {
            do n++; while (codes.Contains($"{m.Code}.L{n}"));
            codes.Add($"{m.Code}.L{n}");
            var l = new Lesson { ModuleId = moduleId, Code = $"{m.Code}.L{n}", Title = t, SortOrder = ++sort };
            db.Lessons.Add(l);
            created.Add(l);
        }
        Touch(c);
        audit.Record("lesson.bulk_created", nameof(CourseModule), moduleId, new { count = created.Count, ids = created.Select(l => l.Id) });
        RecordContentChange(c, "create", nameof(Lesson), moduleId, ["title"], new { bulk = created.Count });
        await db.SaveChangesAsync();
        return created.Select(ToDto).ToList();
    }

    /// <summary>Creates a Draft course and lays down a template's module/lesson skeleton and checklist in one transaction.</summary>
    public async Task<StudioCourseDto> CreateFromTemplate(Guid templateId, CreateCourseRequest req)
    {
        me.RequireId();
        var t = await db.Set<CourseTemplate>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == templateId && x.IsActive)
                ?? throw AppException.NotFound("Template");
        var structure = TemplateService.ParseStructure(t.StructureJson);
        var checklist = TemplateService.ParseChecklist(t.ChecklistJson);
        await using var tx = await db.Database.BeginTransactionAsync();
        var created = await Create(req);
        var mi = 0;
        foreach (var tm in structure)
        {
            mi++;
            var m = new CourseModule { CourseId = created.Id, Code = $"M{mi}", Title = tm.Title, SortOrder = mi };
            db.Modules.Add(m);
            var li = 0;
            foreach (var tl in tm.Lessons ?? [])
            {
                li++;
                db.Lessons.Add(new Lesson { ModuleId = m.Id, Code = $"{m.Code}.L{li}", Title = tl.Title, Objective = tl.Objective ?? "", SortOrder = li });
            }
        }
        var si = 0;
        foreach (var item in checklist)
            db.Set<CourseChecklistItem>().Add(new CourseChecklistItem { CourseId = created.Id, Text = item, SortOrder = ++si, TemplateId = t.Id });
        audit.Record("course.template_applied", nameof(Course), created.Id, new { templateId = t.Id, t.Name, modules = structure.Count, checklist = checklist.Count });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await Get(created.Id);
    }

    // ---------- helpers ----------
    private async Task<(string Code, int Sort)> NextLessonSlot(CourseModule m)
    {
        var existing = await db.Lessons.Where(l => l.ModuleId == m.Id).Select(l => new { l.SortOrder, l.Code }).ToListAsync();
        var n = existing.Count + 1;
        while (existing.Any(e => e.Code == $"{m.Code}.L{n}")) n++;
        return ($"{m.Code}.L{n}", existing.Count == 0 ? 1 : existing.Max(x => x.SortOrder) + 1);
    }

    /// <summary>
    /// Copies a lesson's content. Its video is relinked to the same <see cref="VideoAsset"/> row only when the caller may reuse
    /// that asset under the YouTube sharing rules (staff, uploader/owner of the video, or author of every course already using
    /// it); otherwise the copy is left without a video. Video ownership is never transferred. Notes start a fresh revision history.
    /// </summary>
    private async Task<Lesson> CopyLesson(Lesson src, Guid moduleId, string code, string title, int sort, Guid courseId, Dictionary<Guid, bool> reuseCache)
    {
        Guid? video = null;
        if (src.VideoAssetId is { } vid)
        {
            if (!reuseCache.TryGetValue(vid, out var ok)) reuseCache[vid] = ok = await MayReuseVideo(vid);
            if (ok) video = vid;
        }
        var l = new Lesson
        {
            ModuleId = moduleId, Code = code, Title = title, Objective = src.Objective, SortOrder = sort, IsPreview = src.IsPreview,
            VideoAssetId = video, NotesMarkdown = src.NotesMarkdown, PremiumNotesMarkdown = src.PremiumNotesMarkdown, NotesVersion = 1,
        };
        db.Lessons.Add(l);
        db.Set<LessonRevision>().Add(new LessonRevision
        {
            LessonId = l.Id, CourseId = courseId, Revision = 1, NotesMarkdown = l.NotesMarkdown, PremiumNotesMarkdown = l.PremiumNotesMarkdown, AuthorId = me.Id,
        });
        return l;
    }

    private async Task<bool> MayReuseVideo(Guid assetId)
    {
        var a = await db.VideoAssets.AsNoTracking().FirstOrDefaultAsync(x => x.Id == assetId);
        if (a is null) return false;
        if (me.IsStaff || a.UploaderId == me.Id || a.VideoOwnerUserId == me.Id) return true;
        var usages = await VideoAssetSharing.UsagesAsync(db, [assetId], CancellationToken.None);
        return await VideoAssetSharing.PickMutableAsync(me, access, [a], null, usages) is not null;
    }

    private async Task<Dictionary<Guid, VideoAsset>> AssetsOf(IEnumerable<Lesson> lessons)
    {
        var ids = lessons.Where(l => l.VideoAssetId is not null).Select(l => l.VideoAssetId!.Value).Distinct().ToList();
        return ids.Count == 0 ? [] : await db.VideoAssets.AsNoTracking().Where(v => ids.Contains(v.Id)).ToDictionaryAsync(v => v.Id);
    }

    private static string Truncate(string s, int max) => s.Length <= max ? s : s[..max].TrimEnd();
}
