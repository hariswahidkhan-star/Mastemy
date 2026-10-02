using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Learning;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Authoring;

/// <summary>Lesson notes revisions (list, read, restore) and the per-course change history.</summary>
public class RevisionService(AppDbContext db, AccessService access, StudioService studio)
{
    private async Task<(Lesson Lesson, Guid CourseId)> LessonWithCourse(Guid lessonId)
    {
        var row = await (from l in db.Lessons.AsNoTracking()
                         join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                         where l.Id == lessonId
                         select new { l, m.CourseId }).FirstOrDefaultAsync() ?? throw AppException.NotFound("Lesson");
        await access.RequireCourseAuthorOrStaff(row.CourseId);
        return (row.l, row.CourseId);
    }

    public async Task<LessonNotesDto> Notes(Guid lessonId)
    {
        var (l, _) = await LessonWithCourse(lessonId);
        return new LessonNotesDto(l.Id, l.NotesVersion, StudioService.NotesETag(l.NotesVersion), l.NotesMarkdown, l.PremiumNotesMarkdown);
    }

    public async Task<List<LessonRevisionSummaryDto>> List(Guid lessonId)
    {
        var (l, _) = await LessonWithCourse(lessonId);
        var rows = await db.Set<LessonRevision>().AsNoTracking().Where(r => r.LessonId == lessonId).OrderByDescending(r => r.Revision)
            .Select(r => new { r.Revision, r.AuthorId, r.CreatedAt, r.RestoredFromRevision, N = r.NotesMarkdown.Length,
                P = r.PremiumNotesMarkdown == null ? 0 : r.PremiumNotesMarkdown.Length }).ToListAsync();
        var names = await Names(rows.Select(r => r.AuthorId));
        return rows.Select(r => new LessonRevisionSummaryDto(r.Revision, r.AuthorId, r.AuthorId is { } a ? names.GetValueOrDefault(a) : null,
            r.CreatedAt, r.RestoredFromRevision, r.N, r.P, r.Revision == l.NotesVersion)).ToList();
    }

    public async Task<LessonRevisionDto> Get(Guid lessonId, int revision)
    {
        var (l, _) = await LessonWithCourse(lessonId);
        var r = await db.Set<LessonRevision>().AsNoTracking().FirstOrDefaultAsync(x => x.LessonId == lessonId && x.Revision == revision)
                ?? throw AppException.NotFound("Revision");
        var names = await Names([r.AuthorId]);
        return new LessonRevisionDto(r.Revision, r.AuthorId, r.AuthorId is { } a ? names.GetValueOrDefault(a) : null, r.CreatedAt,
            r.RestoredFromRevision, r.NotesMarkdown, r.PremiumNotesMarkdown, r.Revision == l.NotesVersion);
    }

    /// <summary>Restores an old revision as a new revision (history is append-only). Same If-Match rules as a notes save.</summary>
    public async Task<StudioLessonDto> Restore(Guid lessonId, int revision, string? ifMatch)
    {
        var r = await db.Set<LessonRevision>().AsNoTracking().FirstOrDefaultAsync(x => x.LessonId == lessonId && x.Revision == revision)
                ?? throw AppException.NotFound("Revision");
        return await studio.UpdateNotes(lessonId, new LessonNotesRequest(r.NotesMarkdown, r.PremiumNotesMarkdown), ifMatch, revision);
    }

    /// <summary>Course audit trail (content changes, lifecycle, duplication…) merged with notes revisions, newest first.</summary>
    public async Task<CourseHistoryDto> History(Guid courseId, int page, int pageSize)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);
        var take = page * pageSize + 1;
        var key = courseId.ToString();
        var audits = await db.AuditLogs.AsNoTracking().Where(a => a.EntityType == nameof(Course) && a.EntityId == key)
            .OrderByDescending(a => a.CreatedAt).ThenByDescending(a => a.Id).Take(take)
            .Select(a => new { a.Action, a.CreatedAt, a.ActorId, a.Details, a.Id }).ToListAsync();
        var revs = await db.Set<LessonRevision>().AsNoTracking().Where(r => r.CourseId == courseId)
            .OrderByDescending(r => r.CreatedAt).ThenByDescending(r => r.Revision).Take(take)
            .Select(r => new { r.LessonId, r.Revision, r.CreatedAt, r.AuthorId, r.RestoredFromRevision }).ToListAsync();
        var merged = audits.Select(a => new CourseHistoryEntryDto("audit", a.Action, a.CreatedAt, a.ActorId, null, null, null, a.Details))
            .Concat(revs.Select(r => new CourseHistoryEntryDto("notes_revision",
                r.RestoredFromRevision is null ? "lesson.notes.revision" : "lesson.notes.restored", r.CreatedAt, r.AuthorId, null,
                r.LessonId, r.Revision, r.RestoredFromRevision is null ? null : JsonSerializer.Serialize(new { restoredFrom = r.RestoredFromRevision }))))
            .OrderByDescending(e => e.At).ToList();
        var slice = merged.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        var names = await Names(slice.Select(e => e.ActorId));
        return new CourseHistoryDto(courseId, page, pageSize, merged.Count > page * pageSize,
            slice.Select(e => e with { ActorName = e.ActorId is { } u ? names.GetValueOrDefault(u) : null }).ToList());
    }

    private async Task<Dictionary<Guid, string>> Names(IEnumerable<Guid?> ids)
    {
        var list = ids.Where(x => x is not null).Select(x => x!.Value).Distinct().ToList();
        return list.Count == 0 ? [] : await db.Users.AsNoTracking().Where(u => list.Contains(u.Id)).ToDictionaryAsync(u => u.Id, u => u.DisplayName);
    }
}

/// <summary>Staff-managed course templates and the per-course production checklist.</summary>
public class TemplateService(AppDbContext db, ICurrentUser me, AuditService audit, AccessService access, CourseScopeService scope)
{
    public const int MaxModules = 50, MaxLessonsPerModule = 100, MaxChecklist = 100;

    public static List<TemplateModuleDto> ParseStructure(string json) =>
        JsonSerializer.Deserialize<List<TemplateModuleDto>>(json, CourseSnapshotService.Json) ?? [];

    public static List<string> ParseChecklist(string json) => JsonSerializer.Deserialize<List<string>>(json, CourseSnapshotService.Json) ?? [];

    public async Task<List<CourseTemplateDto>> List(bool activeOnly)
    {
        var q = db.Set<CourseTemplate>().AsNoTracking();
        if (activeOnly) q = q.Where(t => t.IsActive);
        return (await q.OrderBy(t => t.Name).ToListAsync()).Select(ToDto).ToList();
    }

    public async Task<CourseTemplateDto> Get(Guid id, bool activeOnly)
    {
        var t = await db.Set<CourseTemplate>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && (!activeOnly || x.IsActive))
                ?? throw AppException.NotFound("Template");
        return ToDto(t);
    }

    public async Task<CourseTemplateDto> Create(CourseTemplateRequest req)
    {
        var uid = me.RequireId();
        var t = new CourseTemplate { CreatedBy = uid };
        await Apply(t, req);
        db.Set<CourseTemplate>().Add(t);
        audit.Record("course_template.created", nameof(CourseTemplate), t.Id, new { t.Name });
        await Save();
        return ToDto(t);
    }

    public async Task<CourseTemplateDto> Update(Guid id, CourseTemplateRequest req)
    {
        me.RequireId();
        var t = await db.Set<CourseTemplate>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Template");
        await Apply(t, req);
        t.UpdatedAt = DateTime.UtcNow;
        audit.Record("course_template.updated", nameof(CourseTemplate), t.Id, new { t.Name, t.IsActive });
        await Save();
        return ToDto(t);
    }

    /// <summary>Soft delete: courses already created from it are unaffected.</summary>
    public async Task Deactivate(Guid id)
    {
        me.RequireId();
        var t = await db.Set<CourseTemplate>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Template");
        t.IsActive = false; t.UpdatedAt = DateTime.UtcNow;
        audit.Record("course_template.deactivated", nameof(CourseTemplate), t.Id, new { t.Name });
        await db.SaveChangesAsync();
    }

    private async Task Save()
    {
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { throw AppException.Conflict("A template with that name already exists.", "template_exists"); }
    }

    private async Task Apply(CourseTemplate t, CourseTemplateRequest req)
    {
        var name = (req.Name ?? "").Trim();
        if (name.Length is 0 or > 200) throw AppException.Bad("name is required (max 200 characters).");
        if (await db.Set<CourseTemplate>().AnyAsync(x => x.Name == name && x.Id != t.Id))
            throw AppException.Conflict("A template with that name already exists.", "template_exists");
        var desc = (req.Description ?? "").Trim();
        if (desc.Length > 4000) throw AppException.Bad("description must be at most 4000 characters.");
        var modules = req.Modules ?? [];
        if (modules.Count > MaxModules) throw AppException.Bad($"A template can have at most {MaxModules} modules.");
        var cleanModules = new List<TemplateModuleDto>();
        foreach (var (m, i) in modules.Select((m, i) => (m, i)))
        {
            if (m is null) throw AppException.Bad($"modules[{i}] is required.");
            var title = Title(m.Title, $"modules[{i}].title");
            var lessons = m.Lessons ?? [];
            if (lessons.Count > MaxLessonsPerModule) throw AppException.Bad($"A template module can have at most {MaxLessonsPerModule} lessons.");
            cleanModules.Add(new TemplateModuleDto(title, lessons.Select((l, j) =>
            {
                if (l is null) throw AppException.Bad($"modules[{i}].lessons[{j}] is required.");
                var obj = (l.Objective ?? "").Trim();
                if (obj.Length > 4000) throw AppException.Bad("objective must be at most 4000 characters.");
                return new TemplateLessonDto(Title(l.Title, $"modules[{i}].lessons[{j}].title"), obj.Length == 0 ? null : obj);
            }).ToList()));
        }
        var checklist = (req.Checklist ?? []).Select(x => (x ?? "").Trim()).Where(x => x.Length > 0).ToList();
        if (checklist.Count > MaxChecklist) throw AppException.Bad($"At most {MaxChecklist} checklist items are allowed.");
        if (checklist.Any(x => x.Length > 500)) throw AppException.Bad("Each checklist item must be at most 500 characters.");
        t.Name = name; t.Description = desc;
        t.StructureJson = JsonSerializer.Serialize(cleanModules, CourseSnapshotService.Json);
        t.ChecklistJson = JsonSerializer.Serialize(checklist, CourseSnapshotService.Json);
        if (req.IsActive is not null) t.IsActive = req.IsActive.Value;
    }

    private static string Title(string? v, string field)
    {
        var t = (v ?? "").Trim();
        if (t.Length is 0 or > 200) throw AppException.Bad($"{field} is required (max 200 characters).");
        return t;
    }

    private static CourseTemplateDto ToDto(CourseTemplate t) =>
        new(t.Id, t.Name, t.Description, ParseStructure(t.StructureJson), ParseChecklist(t.ChecklistJson), t.IsActive, t.UpdatedAt);

    // ---------- checklist ----------
    public async Task<List<ChecklistItemDto>> Checklist(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        return await db.Set<CourseChecklistItem>().AsNoTracking().Where(i => i.CourseId == courseId).OrderBy(i => i.SortOrder)
            .Select(i => new ChecklistItemDto(i.Id, i.Text, i.SortOrder, i.Done, i.DoneBy, i.DoneAt)).ToListAsync();
    }

    public async Task<ChecklistItemDto> AddChecklistItem(Guid courseId, ChecklistAddRequest req)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await scope.RequireContentEditor(courseId);
        var text = (req.Text ?? "").Trim();
        if (text.Length is 0 or > 500) throw AppException.Bad("text is required (max 500 characters).");
        var items = db.Set<CourseChecklistItem>().Where(i => i.CourseId == courseId);
        if (await items.CountAsync() >= MaxChecklist) throw AppException.Bad($"At most {MaxChecklist} checklist items are allowed.");
        var item = new CourseChecklistItem { CourseId = courseId, Text = text, SortOrder = (await items.MaxAsync(i => (int?)i.SortOrder) ?? 0) + 1 };
        db.Set<CourseChecklistItem>().Add(item);
        await db.SaveChangesAsync();
        return new ChecklistItemDto(item.Id, item.Text, item.SortOrder, item.Done, item.DoneBy, item.DoneAt);
    }

    public async Task<ChecklistItemDto> ToggleChecklistItem(Guid courseId, Guid itemId, ChecklistToggleRequest req)
    {
        var item = await db.Set<CourseChecklistItem>().FirstOrDefaultAsync(i => i.Id == itemId && i.CourseId == courseId)
                   ?? throw AppException.NotFound("Checklist item");
        await scope.RequireContentEditor(courseId);
        item.Done = req.Done;
        item.DoneBy = req.Done ? me.Id : null;
        item.DoneAt = req.Done ? DateTime.UtcNow : null;
        await db.SaveChangesAsync();
        return new ChecklistItemDto(item.Id, item.Text, item.SortOrder, item.Done, item.DoneBy, item.DoneAt);
    }
}

/// <summary>Language variants of a course (spec §21 localization): link/unlink in the studio, list publicly.</summary>
public class TranslationService(AppDbContext db, ICurrentUser me, AuditService audit, AccessService access, CourseScopeService scope,
    CourseSnapshotService snapshots)
{
    private IQueryable<CourseTranslation> Links => db.Set<CourseTranslation>();

    public async Task<List<StudioTranslationDto>> ForStudio(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        var grp = await Links.Where(x => x.CourseId == courseId).Select(x => (Guid?)x.GroupId).FirstOrDefaultAsync();
        if (grp is null) return [];
        return await (from t in Links.AsNoTracking()
                      join c in db.Courses.AsNoTracking() on t.CourseId equals c.Id
                      where t.GroupId == grp && t.CourseId != courseId
                      orderby c.Language
                      select new StudioTranslationDto(c.Id, c.Code, c.Title, c.Language, c.Status)).ToListAsync();
    }

    public async Task<List<StudioTranslationDto>> Link(Guid courseId, TranslationLinkRequest req)
    {
        me.RequireId();
        if (req.CourseId == courseId) throw AppException.Bad("A course cannot be a translation of itself.");
        var a = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId) ?? throw AppException.NotFound("Course");
        await scope.RequireCourseManager(a.Id);
        var b = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == req.CourseId) ?? throw AppException.NotFound("Course");
        await scope.RequireCourseManager(b.Id);
        await using var tx = await db.Database.BeginTransactionAsync();
        var la = await Links.FirstOrDefaultAsync(x => x.CourseId == a.Id);
        var lb = await Links.FirstOrDefaultAsync(x => x.CourseId == b.Id);
        if (la is not null && lb is not null && la.GroupId == lb.GroupId) return await ForStudio(courseId);
        var groupA = la?.GroupId; var groupB = lb?.GroupId;
        var members = await (from t in Links
                             join c in db.Courses on t.CourseId equals c.Id
                             where (groupA != null && t.GroupId == groupA) || (groupB != null && t.GroupId == groupB)
                             select new { c.Id, c.Language }).ToListAsync();
        var all = members.Concat([new { a.Id, a.Language }, new { b.Id, b.Language }]).DistinctBy(x => x.Id).ToList();
        if (all.GroupBy(x => x.Language).Any(g => g.Count() > 1))
            throw AppException.Conflict("Each language can appear only once among a course's translations.", "translation_language_taken");
        var target = groupA ?? groupB ?? Guid.NewGuid();
        var uid = me.RequireId();
        foreach (var id in all.Select(x => x.Id))
        {
            var row = await Links.FirstOrDefaultAsync(x => x.CourseId == id);
            if (row is null) db.Set<CourseTranslation>().Add(new CourseTranslation { CourseId = id, GroupId = target, LinkedBy = uid });
            else if (row.GroupId != target) { row.GroupId = target; row.LinkedBy = uid; row.LinkedAt = DateTime.UtcNow; }
        }
        audit.Record("course.translation_linked", nameof(Course), a.Id, new { linkedCourseId = b.Id, groupId = target });
        audit.Record("course.translation_linked", nameof(Course), b.Id, new { linkedCourseId = a.Id, groupId = target });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await ForStudio(courseId);
    }

    public async Task Unlink(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await scope.RequireCourseManager(courseId);
        var row = await Links.FirstOrDefaultAsync(x => x.CourseId == courseId);
        if (row is null) return;
        db.Set<CourseTranslation>().Remove(row);
        var rest = await Links.Where(x => x.GroupId == row.GroupId && x.CourseId != courseId).ToListAsync();
        if (rest.Count == 1) db.Set<CourseTranslation>().Remove(rest[0]); // a group of one is no translation at all
        audit.Record("course.translation_unlinked", nameof(Course), courseId, new { groupId = row.GroupId });
        await db.SaveChangesAsync();
    }

    /// <summary>Public: live language variants of a live course (titles from published snapshots). Draft variants never appear.</summary>
    public async Task<List<CourseLanguageDto>> PublicLanguages(string slug)
    {
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Slug == slug);
        if (c is null || !AccessService.IsLive(c)) throw AppException.NotFound("Course");
        var grp = await Links.AsNoTracking().Where(x => x.CourseId == c.Id).Select(x => (Guid?)x.GroupId).FirstOrDefaultAsync();
        var ids = grp is null ? [c.Id] : await Links.AsNoTracking().Where(x => x.GroupId == grp).Select(x => x.CourseId).ToListAsync();
        var cards = await snapshots.CardsFor(ids);
        return cards.Values.OrderBy(x => x.Language, StringComparer.Ordinal)
            .Select(x => new CourseLanguageDto(x.Id, x.Slug, x.Language, x.Title, x.Id == c.Id)).ToList();
    }
}

/// <summary>
/// Learner preview for authors/reviewers (spec §9): renders the DRAFT rows through the same learner DTO shapes as /api/learn,
/// with premium access simulated by <c>as</c>. Built only from <see cref="CourseSnapshotService.BuildFromDraft"/>, whose payload
/// carries assessment settings but never questions, options or answer keys.
/// </summary>
public class PreviewService(AppDbContext db, AccessService access, CourseSnapshotService snapshots)
{
    public static readonly string[] Devices = ["desktop", "mobile", "tablet"];

    public async Task<LearnerPreviewDto> Preview(Guid courseId, string? @as, string? device)
    {
        var mode = string.IsNullOrWhiteSpace(@as) ? "free" : @as.Trim().ToLowerInvariant();
        if (mode is not ("free" or "premium")) throw AppException.Bad("as must be 'free' or 'premium'.");
        var dev = string.IsNullOrWhiteSpace(device) ? "desktop" : device.Trim().ToLowerInvariant();
        if (!Devices.Contains(dev)) throw AppException.Bad("device must be one of: " + string.Join(", ", Devices) + ".");
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        var premium = mode == "premium";
        var p = await snapshots.BuildFromDraft(courseId);
        var ordered = p.OrderedLessons().ToList();
        var videos = await snapshots.VideoStates(ordered.Select(x => x.Lesson));
        var modules = p.Modules.OrderBy(m => m.SortOrder).Select(m => new CurriculumModuleDto(m.Id, m.Code, m.Title, m.SortOrder,
            m.Lessons.OrderBy(l => l.SortOrder).Select(l =>
            {
                var v = videos[l.Id];
                return new CurriculumLessonDto(l.Id, l.Code, l.Title, l.SortOrder, l.IsPreview, v.DurationSeconds, v.YoutubeVideoId, null, v.UnavailableReason);
            }).ToList())).ToList();
        var curriculum = new CurriculumDto(c.Id, c.Slug, p.Title, p.Subtitle, p.Language, p.Level.ToString(), false, premium, 0, null, modules);
        var ids = ordered.Select(x => x.Lesson.Id).ToList();
        var lessons = new List<LessonViewDto>();
        for (var i = 0; i < ordered.Count; i++)
        {
            var (module, l) = ordered[i];
            var v = videos[l.Id];
            var hasPremiumNotes = !string.IsNullOrWhiteSpace(l.PremiumNotesMarkdown);
            var assessments = (p.Assessments ?? [])
                .Where(a => a.LessonId == l.Id || (a.LessonId == null && (a.ModuleId == module.Id || a.ModuleId == null)))
                .OrderBy(a => a.LessonId == null).ThenBy(a => a.ModuleId == null).ThenBy(a => a.Title, StringComparer.Ordinal)
                .Select(a => new LessonAssessmentDto(a.Id, a.Title, a.Kind.ToString(), a.Mode.ToString(), a.IsPremium, a.QuestionCount,
                    a.PassPercent, a.TimeLimitMinutes, a.MaxAttempts, a.MultiSelectScoring.ToString(), a.CountsTowardCertificate, a.LessonId, a.ModuleId))
                .ToList();
            var info = new LessonInfoDto(l.Id, module.Id, c.Id, c.Slug, p.Title, l.Code, l.Title, l.Objective, l.SortOrder, l.IsPreview,
                v.DurationSeconds, l.NotesVersion, i > 0 ? ids[i - 1] : null, i < ids.Count - 1 ? ids[i + 1] : null);
            lessons.Add(new LessonViewDto(info, v.YoutubeVideoId, l.NotesMarkdown, premium ? l.PremiumNotesMarkdown : null,
                hasPremiumNotes && !premium, hasPremiumNotes, assessments, null, v.UnavailableReason));
        }
        return new LearnerPreviewDto(c.Id, mode, dev, true, curriculum, lessons);
    }
}
