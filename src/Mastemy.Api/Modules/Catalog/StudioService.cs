using System.Text;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Catalog;

/// <summary>Instructor authoring: course metadata, curriculum, notes, co-instructors, validation and lifecycle actions.</summary>
public partial class StudioService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit)
{
    private const int MaxTitle = 200;
    private const int MaxShort = 500;
    private const int MaxMarkdown = 200_000;

    // ---------- Courses ----------
    public async Task<List<StudioCourseSummaryDto>> MyCourses()
    {
        var uid = me.RequireId();
        return await (from ci in db.CourseInstructors.AsNoTracking()
                      join c in db.Courses on ci.CourseId equals c.Id
                      where ci.UserId == uid
                      orderby c.UpdatedAt descending
                      select new StudioCourseSummaryDto(c.Id, c.Code, c.Slug, c.Title, c.Status, ci.Role, c.UpdatedAt, c.PublishedAt))
            .ToListAsync();
    }

    public async Task<StudioCourseDto> Create(CreateCourseRequest req)
    {
        var uid = me.RequireId();
        var title = RequireText(req.Title, "title", MaxTitle);
        var course = new Course
        {
            OwnerId = uid,
            Title = title,
            Subtitle = Opt(req.Subtitle, "subtitle", MaxShort),
            Description = Opt(req.Description, "description", MaxMarkdown),
            Audience = Opt(req.Audience, "audience", MaxMarkdown),
            Prerequisites = Opt(req.Prerequisites, "prerequisites", MaxMarkdown),
            Outcomes = JoinOutcomes(req.Outcomes),
            Language = Lang(req.Language),
            Level = req.Level ?? CourseLevel.Beginner,
        };
        course.Slug = await UniqueSlug(title);
        course.Code = await UniqueCode(title);
        course.Instructors.Add(new CourseInstructor { CourseId = course.Id, UserId = uid, Role = CourseInstructorRole.Owner, RevenueSharePercent = 100m });
        await SetCategories(course, req.CategoryIds);
        db.Courses.Add(course);
        audit.Record("course.created", nameof(Course), course.Id, new { course.Code, course.Slug, course.Title });
        await db.SaveChangesAsync();
        return await Get(course.Id);
    }

    public async Task<StudioCourseDto> Get(Guid id)
    {
        await access.RequireCourseAuthorOrStaff(id);
        var c = await db.Courses.AsNoTracking().Include(x => x.Categories).Include(x => x.Instructors)
                    .FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Course");
        var modules = await db.Modules.AsNoTracking().Where(m => m.CourseId == id).OrderBy(m => m.SortOrder)
            .Include(m => m.Lessons).ThenInclude(l => l.VideoAsset).AsSplitQuery().ToListAsync();
        var userIds = c.Instructors.Select(i => i.UserId).ToList();
        var users = await db.Users.AsNoTracking().Where(u => userIds.Contains(u.Id)).ToDictionaryAsync(u => u.Id);
        return new StudioCourseDto(c.Id, c.Code, c.Slug, c.Title, c.Subtitle, c.Description, c.Audience, c.Prerequisites,
            CatalogQueryService.SplitOutcomes(c.Outcomes), c.Language, c.Level, c.Status, c.CredentialType, c.PassThresholdPercent,
            c.PromoVideoId, c.Categories.Select(x => x.CategoryId).OrderBy(x => x).ToArray(),
            modules.Select(m => new StudioModuleDto(m.Id, m.Code, m.Title, m.SortOrder,
                m.Lessons.OrderBy(l => l.SortOrder).Select(l => new StudioLessonDto(l.Id, l.Code, l.Title, l.Objective, l.SortOrder,
                    l.IsPreview, l.VideoAssetId, l.VideoAsset?.Status, l.VideoAsset?.YouTubeVideoId, l.VideoAsset?.DurationSeconds ?? 0,
                    l.NotesMarkdown, l.PremiumNotesMarkdown, l.NotesVersion)).ToList())).ToList(),
            c.Instructors.OrderBy(i => i.Role).Select(i => new StudioInstructorDto(i.UserId,
                users.GetValueOrDefault(i.UserId)?.DisplayName ?? "", users.GetValueOrDefault(i.UserId)?.Email ?? "",
                i.Role, i.RevenueSharePercent)).ToList(),
            CourseStateMachine.IsEditable(c.Status), c.CreatedAt, c.UpdatedAt, c.ReviewedAt, c.PublishedAt);
    }

    public async Task<StudioCourseDto> Update(Guid id, UpdateCourseRequest req)
    {
        var c = await LoadEditableCourse(id, includeCategories: true);
        var before = new object?[] { c.Title, c.Subtitle, c.Description, c.Audience, c.Prerequisites, c.Outcomes, c.Language, c.Level,
            c.PromoVideoId, c.CredentialType, c.PassThresholdPercent, string.Join(",", c.Categories.Select(x => x.CategoryId).OrderBy(x => x)) };
        c.Title = RequireText(req.Title, "title", MaxTitle);
        c.Subtitle = Opt(req.Subtitle, "subtitle", MaxShort);
        c.Description = Opt(req.Description, "description", MaxMarkdown);
        c.Audience = Opt(req.Audience, "audience", MaxMarkdown);
        c.Prerequisites = Opt(req.Prerequisites, "prerequisites", MaxMarkdown);
        c.Outcomes = JoinOutcomes(req.Outcomes);
        c.Language = Lang(req.Language);
        if (req.Level is not null) c.Level = req.Level.Value;
        if (req.PromoVideoId is not null)
        {
            var p = req.PromoVideoId.Trim();
            if (p.Length > 0 && !YouTubeIdRegex().IsMatch(p)) throw AppException.Bad("promoVideoId must be an 11-character YouTube video id.");
            c.PromoVideoId = p.Length == 0 ? null : p;
        }
        if (req.CredentialType is not null) c.CredentialType = RequireText(req.CredentialType, "credentialType", 128);
        if (req.PassThresholdPercent is not null)
        {
            if (req.PassThresholdPercent is < 1 or > 100) throw AppException.Bad("passThresholdPercent must be between 1 and 100.");
            c.PassThresholdPercent = req.PassThresholdPercent.Value;
        }
        if (req.CategoryIds is not null)
        {
            db.CourseCategories.RemoveRange(c.Categories);
            c.Categories.Clear();
            await SetCategories(c, req.CategoryIds);
        }
        c.UpdatedAt = DateTime.UtcNow;
        var after = new object?[] { c.Title, c.Subtitle, c.Description, c.Audience, c.Prerequisites, c.Outcomes, c.Language, c.Level,
            c.PromoVideoId, c.CredentialType, c.PassThresholdPercent, string.Join(",", c.Categories.Select(x => x.CategoryId).OrderBy(x => x)) };
        string[] names = ["title", "subtitle", "description", "audience", "prerequisites", "outcomes", "language", "level",
            "promoVideoId", "credentialType", "passThresholdPercent", "categoryIds"];
        var changed = names.Where((_, i) => !Equals(before[i], after[i])).ToArray();
        audit.Record("course.updated", nameof(Course), c.Id, new { c.Title, changedFields = changed });
        RecordContentChange(c, "update", nameof(Course), c.Id, changed);
        await db.SaveChangesAsync();
        return await Get(id);
    }

    // ---------- Modules ----------
    public async Task<StudioModuleDto> AddModule(Guid courseId, TitleRequest req)
    {
        var c = await LoadEditableCourse(courseId);
        var title = RequireText(req.Title, "title", MaxTitle);
        var existing = await db.Modules.Where(m => m.CourseId == courseId).Select(m => new { m.SortOrder, m.Code }).ToListAsync();
        var n = existing.Count + 1;
        while (existing.Any(e => e.Code == $"M{n}")) n++;
        var m = new CourseModule { CourseId = courseId, Title = title, Code = $"M{n}", SortOrder = existing.Count == 0 ? 1 : existing.Max(x => x.SortOrder) + 1 };
        db.Modules.Add(m);
        Touch(c);
        audit.Record("module.created", nameof(CourseModule), m.Id, new { courseId, title });
        RecordContentChange(c, "create", nameof(CourseModule), m.Id, ["title"]);
        await db.SaveChangesAsync();
        return new StudioModuleDto(m.Id, m.Code, m.Title, m.SortOrder, []);
    }

    public async Task UpdateModule(Guid moduleId, TitleRequest req)
    {
        var m = await db.Modules.FirstOrDefaultAsync(x => x.Id == moduleId) ?? throw AppException.NotFound("Module");
        var c = await LoadEditableCourse(m.CourseId);
        var oldTitle = m.Title;
        m.Title = RequireText(req.Title, "title", MaxTitle);
        Touch(c);
        audit.Record("module.updated", nameof(CourseModule), m.Id, new { m.Title });
        RecordContentChange(c, "update", nameof(CourseModule), m.Id, oldTitle == m.Title ? [] : ["title"]);
        await db.SaveChangesAsync();
    }

    public async Task DeleteModule(Guid moduleId)
    {
        var m = await db.Modules.Include(x => x.Lessons).FirstOrDefaultAsync(x => x.Id == moduleId) ?? throw AppException.NotFound("Module");
        var c = await LoadEditableCourse(m.CourseId);
        await EnsureStructuralDeleteAllowed(c);
        await using var tx = await db.Database.BeginTransactionAsync();
        var lessonIds = m.Lessons.Select(l => l.Id).ToList();
        var readyVideoLessons = await db.Lessons.Where(l => l.ModuleId == m.Id && l.VideoAsset != null && l.VideoAsset.Status == VideoStatus.Ready)
            .Select(l => l.Id).ToListAsync();
        await DetachLessons(lessonIds);
        await db.Questions.Where(q => q.ModuleId == moduleId).ExecuteUpdateAsync(s => s.SetProperty(q => q.ModuleId, (Guid?)null));
        await db.Assessments.Where(a => a.ModuleId == moduleId).ExecuteUpdateAsync(s => s.SetProperty(a => a.ModuleId, (Guid?)null));
        foreach (var l in m.Lessons) l.VideoAssetId = null; // unlink only; VideoAssets are never deleted here
        db.Lessons.RemoveRange(m.Lessons);
        db.Modules.Remove(m);
        Touch(c);
        audit.Record("module.deleted", nameof(CourseModule), m.Id, new { courseId = c.Id, m.Title, lessons = lessonIds });
        RecordContentChange(c, "delete", nameof(CourseModule), m.Id, ["*"], new { m.Title, lessons = lessonIds, readyVideoLessons });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
    }

    public async Task ReorderModules(Guid courseId, ReorderRequest req)
    {
        var c = await LoadEditableCourse(courseId);
        var modules = await db.Modules.Where(m => m.CourseId == courseId).ToListAsync();
        ApplyOrder(modules, req.Ids, m => m.Id, (m, i) => m.SortOrder = i);
        Touch(c);
        audit.Record("module.reordered", nameof(Course), courseId, new { ids = req.Ids });
        RecordContentChange(c, "reorder", nameof(CourseModule), courseId, ["sortOrder"]);
        await db.SaveChangesAsync();
    }

    // ---------- Lessons ----------
    public async Task<StudioLessonDto> AddLesson(Guid moduleId, LessonCreateRequest req)
    {
        var m = await db.Modules.FirstOrDefaultAsync(x => x.Id == moduleId) ?? throw AppException.NotFound("Module");
        var c = await LoadEditableCourse(m.CourseId);
        var existing = await db.Lessons.Where(l => l.ModuleId == moduleId).Select(l => new { l.SortOrder, l.Code }).ToListAsync();
        var n = existing.Count + 1;
        while (existing.Any(e => e.Code == $"{m.Code}.L{n}")) n++;
        var l = new Lesson
        {
            ModuleId = moduleId, Code = $"{m.Code}.L{n}",
            Title = RequireText(req.Title, "title", MaxTitle),
            Objective = Opt(req.Objective, "objective", 4000),
            IsPreview = req.IsPreview ?? false,
            SortOrder = existing.Count == 0 ? 1 : existing.Max(x => x.SortOrder) + 1,
        };
        db.Lessons.Add(l);
        Touch(c);
        audit.Record("lesson.created", nameof(Lesson), l.Id, new { moduleId, l.Title });
        RecordContentChange(c, "create", nameof(Lesson), l.Id, ["title", "objective", "isPreview"]);
        await db.SaveChangesAsync();
        return ToDto(l);
    }

    public async Task<StudioLessonDto> UpdateLesson(Guid lessonId, LessonUpdateRequest req)
    {
        var (l, c) = await LoadEditableLesson(lessonId);
        var before = (l.Title, l.Objective, l.IsPreview);
        l.Title = RequireText(req.Title, "title", MaxTitle);
        l.Objective = Opt(req.Objective, "objective", 4000);
        if (req.IsPreview is not null) l.IsPreview = req.IsPreview.Value;
        Touch(c);
        var changed = new List<string>();
        if (before.Title != l.Title) changed.Add("title");
        if (before.Objective != l.Objective) changed.Add("objective");
        if (before.IsPreview != l.IsPreview) changed.Add("isPreview");
        audit.Record("lesson.updated", nameof(Lesson), l.Id, new { l.Title, changedFields = changed });
        RecordContentChange(c, "update", nameof(Lesson), l.Id, changed.ToArray());
        await db.SaveChangesAsync();
        return ToDto(l);
    }

    public async Task DeleteLesson(Guid lessonId)
    {
        var (l, c) = await LoadEditableLesson(lessonId);
        await EnsureStructuralDeleteAllowed(c);
        await using var tx = await db.Database.BeginTransactionAsync();
        await DetachLessons([l.Id]);
        var videoAssetId = l.VideoAssetId;
        var hadReadyVideo = l.VideoAsset is { Status: VideoStatus.Ready };
        l.VideoAssetId = null; // unlink only; the VideoAsset row is kept
        db.Lessons.Remove(l);
        Touch(c);
        audit.Record("lesson.deleted", nameof(Lesson), l.Id, new { courseId = c.Id, l.Title, unlinkedVideoAssetId = videoAssetId });
        RecordContentChange(c, "delete", nameof(Lesson), l.Id, ["*"],
            new { l.Title, unlinkedVideoAssetId = videoAssetId, hadReadyVideo });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
    }

    public async Task ReorderLessons(Guid moduleId, ReorderRequest req)
    {
        var m = await db.Modules.FirstOrDefaultAsync(x => x.Id == moduleId) ?? throw AppException.NotFound("Module");
        var c = await LoadEditableCourse(m.CourseId);
        var lessons = await db.Lessons.Where(l => l.ModuleId == moduleId).ToListAsync();
        ApplyOrder(lessons, req.Ids, l => l.Id, (l, i) => l.SortOrder = i);
        Touch(c);
        audit.Record("lesson.reordered", nameof(CourseModule), moduleId, new { ids = req.Ids });
        RecordContentChange(c, "reorder", nameof(Lesson), moduleId, ["sortOrder"]);
        await db.SaveChangesAsync();
    }

    public async Task<StudioLessonDto> UpdateNotes(Guid lessonId, LessonNotesRequest req)
    {
        var (l, c) = await LoadEditableLesson(lessonId);
        var notes = req.NotesMarkdown ?? "";
        var premium = string.IsNullOrWhiteSpace(req.PremiumNotesMarkdown) ? null : req.PremiumNotesMarkdown;
        if (notes.Length > MaxMarkdown || (premium?.Length ?? 0) > MaxMarkdown) throw AppException.Bad("Notes are too long.");
        if (notes != l.NotesMarkdown || premium != l.PremiumNotesMarkdown)
        {
            var changed = new List<string>();
            if (notes != l.NotesMarkdown) changed.Add("notesMarkdown");
            if (premium != l.PremiumNotesMarkdown) changed.Add("premiumNotesMarkdown");
            l.NotesMarkdown = notes;
            l.PremiumNotesMarkdown = premium;
            l.NotesVersion++;
            Touch(c);
            audit.Record("lesson.notes.updated", nameof(Lesson), l.Id, new { l.NotesVersion, changedFields = changed });
            RecordContentChange(c, "update", nameof(Lesson), l.Id, changed.ToArray(), new { l.NotesVersion });
            await db.SaveChangesAsync();
        }
        return ToDto(l);
    }

    // ---------- Co-instructors ----------
    public async Task<StudioCourseDto> AddCoInstructor(Guid courseId, CoInstructorRequest req)
    {
        var uid = me.RequireId();
        var c = await db.Courses.Include(x => x.Instructors).FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        if (!c.Instructors.Any(i => i.UserId == uid && i.Role == CourseInstructorRole.Owner))
            throw AppException.Forbidden("Only the course owner can manage co-instructors.");
        if (c.Status == CourseStatus.Archived) throw AppException.Conflict("Archived courses cannot be changed.", "course_archived");
        if (req.Role == CourseInstructorRole.Owner) throw AppException.Bad("role must be CoInstructor or Editor.");
        if (req.RevenueSharePercent is < 0 or > 100) throw AppException.Bad("revenueSharePercent must be between 0 and 100.");
        var email = (req.Email ?? "").Trim().ToUpperInvariant();
        if (email.Length == 0) throw AppException.Bad("email is required.");
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.NormalizedEmail == email) ?? throw AppException.NotFound("User");
        if (user.IsSuspended) throw AppException.Bad("That user is suspended.");
        if (!user.Roles.Any(r => r.Role is Roles.Instructor or Roles.Admin or Roles.SuperAdmin))
            throw AppException.Bad("That user is not an approved instructor.");
        if (user.Id == c.OwnerId) throw AppException.Bad("The owner is already on this course.");

        var owner = c.Instructors.First(i => i.Role == CourseInstructorRole.Owner);
        var entry = c.Instructors.FirstOrDefault(i => i.UserId == user.Id);
        var othersShare = c.Instructors.Where(i => i.Role != CourseInstructorRole.Owner && i.UserId != user.Id).Sum(i => i.RevenueSharePercent);
        var ownerShare = 100m - othersShare - req.RevenueSharePercent;
        if (ownerShare < 0) throw AppException.Bad("Total revenue share would exceed 100%.");
        if (entry is null)
        {
            entry = new CourseInstructor { CourseId = c.Id, UserId = user.Id };
            c.Instructors.Add(entry);
        }
        entry.Role = req.Role;
        entry.RevenueSharePercent = req.RevenueSharePercent;
        owner.RevenueSharePercent = ownerShare;
        Touch(c);
        audit.Record("course.instructor.upserted", nameof(Course), c.Id, new { userId = user.Id, role = req.Role.ToString(), req.RevenueSharePercent, ownerShare });
        await db.SaveChangesAsync();
        return await Get(courseId);
    }

    // ---------- Validation & lifecycle ----------
    public async Task<ValidationResultDto> Validate(Guid courseId)
    {
        await access.RequireCourseAuthorOrStaff(courseId);
        return await CourseValidator.Validate(db, courseId);
    }

    public async Task<CourseStatusDto> Submit(Guid courseId)
    {
        await access.RequireCourseEditor(courseId);
        var c = await db.Courses.FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        var from = c.Status;
        CourseStateMachine.Next(from, CourseAction.Submit); // 409 before running validation when state is wrong
        var v = await CourseValidator.Validate(db, courseId);
        if (!v.Ok) throw AppException.Bad("Course is not ready for review: " + string.Join(" ", v.Issues), "validation_failed");
        CourseStateMachine.Apply(c, CourseAction.Submit, DateTime.UtcNow);
        audit.Record("course.submitted", nameof(Course), c.Id, new { from = from.ToString(), to = c.Status.ToString() });
        await db.SaveChangesAsync();
        return new CourseStatusDto(c.Id, c.Status, c.ReviewedAt, c.PublishedAt);
    }

    public async Task<CourseStatusDto> StartUpdate(Guid courseId)
    {
        await access.RequireCourseEditor(courseId);
        var c = await db.Courses.FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        var from = c.Status;
        CourseStateMachine.Apply(c, CourseAction.StartUpdate, DateTime.UtcNow);
        audit.Record("course.update_started", nameof(Course), c.Id, new { from = from.ToString(), to = c.Status.ToString() });
        await db.SaveChangesAsync();
        return new CourseStatusDto(c.Id, c.Status, c.ReviewedAt, c.PublishedAt);
    }

    // ---------- helpers ----------
    public const string ContentChangedAction = "course.content_changed";

    /// <summary>
    /// Course-scoped change log entry (entity + changed fields) so reviewers can see exactly what an instructor
    /// edited since the last publish. There are no content snapshots yet: while a previously published course is
    /// Updating/ChangesRequested, these edits are visible to learners before re-review, so every one is audited.
    /// </summary>
    private void RecordContentChange(Course c, string op, string entity, Guid entityId, string[] changedFields, object? extra = null)
    {
        if (changedFields.Length == 0) return;
        audit.Record(ContentChangedAction, nameof(Course), c.Id, new
        {
            op, entity, entityId, changedFields, courseStatus = c.Status.ToString(),
            liveUnreviewed = AccessService.IsLive(c), extra,
        });
    }

    private async Task<Course> LoadEditableCourse(Guid courseId, bool includeCategories = false)
    {
        var q = db.Courses.AsQueryable();
        if (includeCategories) q = q.Include(x => x.Categories);
        var c = await q.FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        await access.RequireCourseEditor(courseId);
        CourseStateMachine.RequireEditable(c);
        return c;
    }

    private async Task<(Lesson, Course)> LoadEditableLesson(Guid lessonId)
    {
        var l = await db.Lessons.Include(x => x.VideoAsset).FirstOrDefaultAsync(x => x.Id == lessonId) ?? throw AppException.NotFound("Lesson");
        var courseId = await db.Modules.Where(m => m.Id == l.ModuleId).Select(m => m.CourseId).FirstAsync();
        return (l, await LoadEditableCourse(courseId));
    }

    private async Task EnsureStructuralDeleteAllowed(Course c)
    {
        if (c.PublishedAt is not null && await db.Enrollments.AnyAsync(e => e.CourseId == c.Id))
            throw AppException.Conflict("This course has been published and has enrolled learners; lessons and modules cannot be deleted. Edit them instead.", "has_enrollments");
    }

    /// <summary>Removes learner-owned rows tied to lessons that are about to be deleted (only reachable for never-published or enrollment-free courses) and unlinks loose references.</summary>
    private async Task DetachLessons(List<Guid> lessonIds)
    {
        if (lessonIds.Count == 0) return;
        await db.LessonProgress.Where(p => lessonIds.Contains(p.LessonId)).ExecuteDeleteAsync();
        // Learner private notes are preserved (LessonId set to null by FK); they keep their title snapshots.
        await db.LearnerNotes.Where(n => n.LessonId != null && lessonIds.Contains(n.LessonId.Value)).ExecuteUpdateAsync(u => u.SetProperty(n => n.LessonId, (Guid?)null));
        await db.Questions.Where(q => q.LessonId != null && lessonIds.Contains(q.LessonId.Value)).ExecuteUpdateAsync(s => s.SetProperty(q => q.LessonId, (Guid?)null));
        await db.Assessments.Where(a => a.LessonId != null && lessonIds.Contains(a.LessonId.Value)).ExecuteUpdateAsync(s => s.SetProperty(a => a.LessonId, (Guid?)null));
        await db.ReviewComments.Where(r => r.LessonId != null && lessonIds.Contains(r.LessonId.Value)).ExecuteUpdateAsync(s => s.SetProperty(r => r.LessonId, (Guid?)null));
        await db.UploadSessions.Where(u => u.LessonId != null && lessonIds.Contains(u.LessonId.Value)).ExecuteUpdateAsync(s => s.SetProperty(u => u.LessonId, (Guid?)null));
    }

    private static void ApplyOrder<T>(List<T> items, Guid[]? ids, Func<T, Guid> key, Action<T, int> set)
    {
        if (ids is null) throw AppException.Bad("ids is required.");
        if (ids.Length != ids.Distinct().Count()) throw AppException.Bad("ids must not contain duplicates.", "invalid_order");
        var existing = items.Select(key).ToHashSet();
        if (ids.Length != existing.Count || !ids.All(existing.Contains))
            throw AppException.Bad("ids must contain exactly the existing items.", "invalid_order");
        var map = items.ToDictionary(key);
        for (var i = 0; i < ids.Length; i++) set(map[ids[i]], i + 1);
    }

    private static StudioLessonDto ToDto(Lesson l) => new(l.Id, l.Code, l.Title, l.Objective, l.SortOrder, l.IsPreview, l.VideoAssetId,
        l.VideoAsset?.Status, l.VideoAsset?.YouTubeVideoId, l.VideoAsset?.DurationSeconds ?? 0, l.NotesMarkdown, l.PremiumNotesMarkdown, l.NotesVersion);

    private static void Touch(Course c) => c.UpdatedAt = DateTime.UtcNow;

    private async Task SetCategories(Course c, int[]? ids)
    {
        if (ids is null || ids.Length == 0) return;
        var distinct = ids.Distinct().ToList();
        if (distinct.Count > 10) throw AppException.Bad("A course can have at most 10 categories.");
        var found = await db.Categories.Where(x => distinct.Contains(x.Id)).Select(x => x.Id).ToListAsync();
        if (found.Count != distinct.Count) throw AppException.Bad("One or more categories do not exist.");
        foreach (var id in distinct) c.Categories.Add(new CourseCategory { CourseId = c.Id, CategoryId = id });
    }

    private static string RequireText(string? v, string field, int max)
    {
        var t = (v ?? "").Trim();
        if (t.Length == 0) throw AppException.Bad($"{field} is required.");
        if (t.Length > max) throw AppException.Bad($"{field} must be at most {max} characters.");
        return t;
    }

    private static string Opt(string? v, string field, int max)
    {
        var t = (v ?? "").Trim();
        if (t.Length > max) throw AppException.Bad($"{field} must be at most {max} characters.");
        return t;
    }

    private static string Lang(string? v)
    {
        var t = string.IsNullOrWhiteSpace(v) ? "en" : v.Trim().ToLowerInvariant();
        if (!LangRegex().IsMatch(t)) throw AppException.Bad("language must be a language code such as 'en' or 'ar'.");
        return t;
    }

    private static string JoinOutcomes(string[]? outcomes)
    {
        var list = (outcomes ?? []).Select(o => (o ?? "").Replace("\r", " ").Replace("\n", " ").Trim()).Where(o => o.Length > 0).ToList();
        if (list.Count > 30) throw AppException.Bad("At most 30 outcomes are allowed.");
        if (list.Any(o => o.Length > 500)) throw AppException.Bad("Each outcome must be at most 500 characters.");
        return string.Join("\n", list);
    }

    public static string Slugify(string title)
    {
        var normalized = title.Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder();
        foreach (var ch in normalized)
        {
            if (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(ch) == System.Globalization.UnicodeCategory.NonSpacingMark) continue;
            var lc = char.ToLowerInvariant(ch);
            sb.Append(lc is >= 'a' and <= 'z' or >= '0' and <= '9' ? lc : '-');
        }
        var slug = MultiDash().Replace(sb.ToString(), "-").Trim('-');
        if (slug.Length > 80) slug = slug[..80].TrimEnd('-');
        return slug.Length == 0 ? "course" : slug;
    }

    public static string CodeBase(string title)
    {
        var words = Slugify(title).Split('-', StringSplitOptions.RemoveEmptyEntries);
        var code = words.Length >= 2
            ? string.Concat(words.Take(6).Select(w => char.ToUpperInvariant(w[0])))
            : (words.FirstOrDefault() ?? "CRS").ToUpperInvariant();
        if (code.Length > 12) code = code[..12];
        while (code.Length < 3) code += "X";
        return code;
    }

    private async Task<string> UniqueSlug(string title)
    {
        var b = Slugify(title);
        var taken = (await db.Courses.Where(c => c.Slug == b || c.Slug.StartsWith(b + "-")).Select(c => c.Slug).ToListAsync()).ToHashSet();
        if (!taken.Contains(b)) return b;
        for (var i = 2; ; i++) if (!taken.Contains($"{b}-{i}")) return $"{b}-{i}";
    }

    private async Task<string> UniqueCode(string title)
    {
        var b = CodeBase(title);
        var taken = (await db.Courses.Where(c => c.Code == b || c.Code.StartsWith(b + "-")).Select(c => c.Code).ToListAsync()).ToHashSet();
        if (!taken.Contains(b)) return b;
        for (var i = 2; ; i++) if (!taken.Contains($"{b}-{i}")) return $"{b}-{i}";
    }

    [GeneratedRegex("-{2,}")] private static partial Regex MultiDash();
    [GeneratedRegex("^[a-z]{2,3}(-[a-z0-9]{2,8})?$")] private static partial Regex LangRegex();
    [GeneratedRegex("^[A-Za-z0-9_-]{11}$")] private static partial Regex YouTubeIdRegex();
}

public static class CourseValidator
{
    public static async Task<ValidationResultDto> Validate(AppDbContext db, Guid courseId)
    {
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        var issues = new List<string>();
        if (string.IsNullOrWhiteSpace(c.Title)) issues.Add("Title is required.");
        if (string.IsNullOrWhiteSpace(c.Description)) issues.Add("Description is required.");
        if (CatalogQueryService.SplitOutcomes(c.Outcomes).Length == 0) issues.Add("At least one learning outcome is required.");
        var modules = await db.Modules.AsNoTracking().Where(m => m.CourseId == courseId).OrderBy(m => m.SortOrder)
            .Include(m => m.Lessons).ThenInclude(l => l.VideoAsset).AsSplitQuery().ToListAsync();
        if (modules.Count == 0) issues.Add("The course needs at least one module.");
        foreach (var m in modules)
        {
            if (m.Lessons.Count == 0) issues.Add($"Module '{m.Title}' has no lessons.");
            foreach (var l in m.Lessons.OrderBy(l => l.SortOrder))
            {
                if (l.VideoAsset is null) issues.Add($"Lesson '{l.Title}' has no video.");
                else if (l.VideoAsset.Status != VideoStatus.Ready)
                    issues.Add($"Lesson '{l.Title}' video is not ready (status {l.VideoAsset.Status}).");
            }
        }
        return new ValidationResultDto(issues.Count == 0, issues);
    }
}
