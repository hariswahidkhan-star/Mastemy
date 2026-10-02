using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Json.Serialization;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Catalog;

// ---------- Snapshot payload (stored as JSON in CourseSnapshot.PayloadJson) ----------
public record SnapshotLesson(Guid Id, string Code, string Title, string Objective, int SortOrder, bool IsPreview,
    Guid? VideoAssetId, string? YoutubeVideoId, int DurationSeconds, string NotesMarkdown, string? PremiumNotesMarkdown, int NotesVersion);
public record SnapshotModule(Guid Id, string Code, string Title, int SortOrder, List<SnapshotLesson> Lessons);
public record CourseSnapshotPayload(string Title, string Subtitle, string Description, string Audience, string Prerequisites,
    string Outcomes, string Language, CourseLevel Level, string CredentialType, decimal PassThresholdPercent, string? PromoVideoId,
    int[] Categories, List<SnapshotModule> Modules)
{
    public IEnumerable<(SnapshotModule Module, SnapshotLesson Lesson)> OrderedLessons() =>
        Modules.OrderBy(m => m.SortOrder).SelectMany(m => m.Lessons.OrderBy(l => l.SortOrder).Select(l => (m, l)));
}

/// <summary>A live course paired with the learner-facing payload it must be rendered from.</summary>
public record PublishedCourse(Course Course, int Version, CourseSnapshotPayload Payload);

/// <summary>Current playability of a snapshot lesson's video (asset status is always checked live).</summary>
public record SnapshotVideoState(string? YoutubeVideoId, int DurationSeconds, string? UnavailableReason)
{
    public bool Playable => YoutubeVideoId is not null;
}

// ---------- API DTOs ----------
public record PublishedPreviewDto(Guid CourseId, int Version, DateTime PublishedAt, Guid PublishedBy, CourseSnapshotPayload Payload);
public record FieldChangeDto(string Field, string? Before, string? After);
public record DiffModuleDto(Guid Id, string Title);
public record DiffLessonDto(Guid Id, Guid ModuleId, string Title);
public record ChangedEntityDto(Guid Id, string Title, List<FieldChangeDto> Changes);
public record CourseDiffDto(Guid CourseId, CourseStatus Status, int? BaseVersion, bool HasChanges, List<FieldChangeDto> CourseFields,
    List<DiffModuleDto> ModulesAdded, List<DiffModuleDto> ModulesRemoved, List<ChangedEntityDto> ModulesChanged,
    List<DiffLessonDto> LessonsAdded, List<DiffLessonDto> LessonsRemoved, List<ChangedEntityDto> LessonsChanged);

/// <summary>
/// Immutable published copies of a course. Every staff publish writes a new <see cref="CourseSnapshot"/>
/// (Version = PublishedVersion + 1) and all learner/public reads of a live course are served from the latest one,
/// so edits made while Updating / in re-review stay invisible until the next publish.
/// </summary>
public class CourseSnapshotService(AppDbContext db, ICurrentUser me, AccessService access)
{
    // Non-ASCII (e.g. Arabic) is stored unescaped so the catalog LIKE prefilter can match it.
    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web)
    {
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
        Converters = { new JsonStringEnumConverter() },
    };

    public static CourseSnapshotPayload Deserialize(string json) =>
        JsonSerializer.Deserialize<CourseSnapshotPayload>(json, Json) ?? throw new InvalidOperationException("Empty course snapshot.");

    /// <summary>Builds the learner-facing payload from the current working rows (used at publish and for diffs).</summary>
    public async Task<CourseSnapshotPayload> BuildFromDraft(Guid courseId)
    {
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        var cats = await db.CourseCategories.AsNoTracking().Where(x => x.CourseId == courseId).Select(x => x.CategoryId).OrderBy(x => x).ToArrayAsync();
        var modules = await db.Modules.AsNoTracking().Where(m => m.CourseId == courseId)
            .Include(m => m.Lessons).ThenInclude(l => l.VideoAsset).AsSplitQuery().ToListAsync();
        return new CourseSnapshotPayload(c.Title, c.Subtitle, c.Description, c.Audience, c.Prerequisites, c.Outcomes, c.Language, c.Level,
            c.CredentialType, c.PassThresholdPercent, c.PromoVideoId, cats,
            modules.OrderBy(m => m.SortOrder).Select(m => new SnapshotModule(m.Id, m.Code, m.Title, m.SortOrder,
                m.Lessons.OrderBy(l => l.SortOrder).Select(l => new SnapshotLesson(l.Id, l.Code, l.Title, l.Objective, l.SortOrder, l.IsPreview,
                    l.VideoAssetId, string.IsNullOrEmpty(l.VideoAsset?.YouTubeVideoId) ? null : l.VideoAsset!.YouTubeVideoId,
                    l.VideoAsset?.DurationSeconds ?? 0, l.NotesMarkdown, l.PremiumNotesMarkdown, l.NotesVersion)).ToList())).ToList());
    }

    /// <summary>Adds the next snapshot for a tracked course and bumps PublishedVersion. Caller saves.</summary>
    public async Task<CourseSnapshot> AddSnapshot(Course course, Guid publishedBy, DateTime nowUtc)
    {
        var payload = await BuildFromDraft(course.Id);
        var maxVersion = await db.CourseSnapshots.Where(s => s.CourseId == course.Id).MaxAsync(s => (int?)s.Version) ?? 0;
        var snap = new CourseSnapshot
        {
            CourseId = course.Id, Version = Math.Max(course.PublishedVersion, maxVersion) + 1,
            PayloadJson = JsonSerializer.Serialize(payload, Json), PublishedBy = publishedBy, PublishedAt = nowUtc,
        };
        db.CourseSnapshots.Add(snap);
        course.PublishedVersion = snap.Version;
        return snap;
    }

    /// <summary>
    /// Latest payloads for the given live courses. Courses that went live before snapshots existed (PublishedVersion = 0,
    /// e.g. legacy data) fall back to an in-memory build of their current rows until their next publish.
    /// </summary>
    public async Task<Dictionary<Guid, PublishedCourse>> ForCourses(IReadOnlyCollection<Course> courses)
    {
        var ids = courses.Where(c => c.PublishedVersion > 0).Select(c => c.Id).ToList();
        var snaps = ids.Count == 0 ? [] : await (from s in db.CourseSnapshots.AsNoTracking()
                                                  join c in db.Courses on s.CourseId equals c.Id
                                                  where ids.Contains(s.CourseId) && s.Version == c.PublishedVersion
                                                  select new { s.CourseId, s.Version, s.PayloadJson }).ToListAsync();
        var result = new Dictionary<Guid, PublishedCourse>();
        foreach (var c in courses)
        {
            var s = snaps.FirstOrDefault(x => x.CourseId == c.Id);
            result[c.Id] = s is not null
                ? new PublishedCourse(c, s.Version, Deserialize(s.PayloadJson))
                : new PublishedCourse(c, 0, await BuildFromDraft(c.Id));
        }
        return result;
    }

    public async Task<PublishedCourse> ForCourse(Course c) => (await ForCourses([c]))[c.Id];

    /// <summary>Live course by slug rendered from its latest snapshot; 404 when not live.</summary>
    public async Task<PublishedCourse> LiveBySlug(string slug, string what = "Course")
    {
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Slug == slug);
        if (c is null || !AccessService.IsLive(c)) throw AppException.NotFound(what);
        return await ForCourse(c);
    }

    public async Task<PublishedCourse> LiveById(Guid id, string what = "Course")
    {
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if (c is null || !AccessService.IsLive(c)) throw AppException.NotFound(what);
        return await ForCourse(c);
    }

    /// <summary>
    /// Finds the live course whose latest snapshot contains the lesson. Works for lessons deleted from the working copy
    /// after the snapshot was taken; lessons added since the last publish are not found (404).
    /// </summary>
    public async Task<(PublishedCourse Course, SnapshotModule Module, SnapshotLesson Lesson)> LiveLesson(Guid lessonId)
    {
        var candidates = await (from l in db.Lessons.AsNoTracking()
                                join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                                where l.Id == lessonId
                                select m.CourseId).ToListAsync();
        var key = "%" + lessonId.ToString() + "%";
        candidates.AddRange(await (from s in db.CourseSnapshots.AsNoTracking()
                                   join c in db.Courses on s.CourseId equals c.Id
                                   where s.Version == c.PublishedVersion && EF.Functions.Like(s.PayloadJson, key)
                                   select s.CourseId).ToListAsync());
        foreach (var courseId in candidates.Distinct())
        {
            var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId);
            if (c is null || !AccessService.IsLive(c)) continue;
            var pc = await ForCourse(c);
            foreach (var (m, l) in pc.Payload.OrderedLessons())
                if (l.Id == lessonId) return (pc, m, l);
        }
        throw AppException.NotFound("Lesson");
    }

    /// <summary>Current video states for snapshot lessons. Playback is never gated, except that a video whose asset is
    /// no longer Ready (restricted, failed, removed) cannot be played.</summary>
    public async Task<Dictionary<Guid, SnapshotVideoState>> VideoStates(IEnumerable<SnapshotLesson> lessons)
    {
        var list = lessons.ToList();
        var assetIds = list.Where(l => l.VideoAssetId is not null).Select(l => l.VideoAssetId!.Value).Distinct().ToList();
        var assets = assetIds.Count == 0 ? [] : await db.VideoAssets.AsNoTracking().Where(v => assetIds.Contains(v.Id))
            .Select(v => new { v.Id, v.Status, v.StatusReason }).ToDictionaryAsync(v => v.Id);
        var result = new Dictionary<Guid, SnapshotVideoState>();
        foreach (var l in list)
        {
            if (l.VideoAssetId is null) { result[l.Id] = new SnapshotVideoState(null, 0, null); continue; }
            if (!assets.TryGetValue(l.VideoAssetId.Value, out var a))
                result[l.Id] = new SnapshotVideoState(null, 0, "This video is no longer available.");
            else if (a.Status != VideoStatus.Ready || l.YoutubeVideoId is null)
                result[l.Id] = new SnapshotVideoState(null, 0, string.IsNullOrWhiteSpace(a.StatusReason)
                    ? $"This video is currently unavailable ({a.Status})." : a.StatusReason);
            else
                result[l.Id] = new SnapshotVideoState(l.YoutubeVideoId, l.DurationSeconds, null);
        }
        return result;
    }

    // ---------- Authoring views ----------

    public async Task<PublishedPreviewDto> PublishedPreview(Guid courseId)
    {
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        var s = await db.CourseSnapshots.AsNoTracking().FirstOrDefaultAsync(x => x.CourseId == courseId && x.Version == c.PublishedVersion)
                ?? throw AppException.NotFound("Published snapshot");
        return new PublishedPreviewDto(courseId, s.Version, s.PublishedAt, s.PublishedBy, Deserialize(s.PayloadJson));
    }

    public async Task<CourseDiffDto> Diff(Guid courseId)
    {
        me.RequireId();
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        var draft = await BuildFromDraft(courseId);
        var s = c.PublishedVersion == 0 ? null
            : await db.CourseSnapshots.AsNoTracking().FirstOrDefaultAsync(x => x.CourseId == courseId && x.Version == c.PublishedVersion);
        var basePayload = s is null ? null : Deserialize(s.PayloadJson);
        return ComputeDiff(c.Id, c.Status, s?.Version, basePayload, draft);
    }

    public static CourseDiffDto ComputeDiff(Guid courseId, CourseStatus status, int? baseVersion, CourseSnapshotPayload? before, CourseSnapshotPayload after)
    {
        var courseFields = new List<FieldChangeDto>();
        void F(List<FieldChangeDto> into, string name, string? b, string? a) { if (!string.Equals(b, a, StringComparison.Ordinal)) into.Add(new FieldChangeDto(name, b, a)); }
        static string D(decimal d) => d.ToString("0.##", System.Globalization.CultureInfo.InvariantCulture);
        if (before is not null)
        {
            F(courseFields, "title", before.Title, after.Title);
            F(courseFields, "subtitle", before.Subtitle, after.Subtitle);
            F(courseFields, "description", before.Description, after.Description);
            F(courseFields, "audience", before.Audience, after.Audience);
            F(courseFields, "prerequisites", before.Prerequisites, after.Prerequisites);
            F(courseFields, "outcomes", before.Outcomes, after.Outcomes);
            F(courseFields, "language", before.Language, after.Language);
            F(courseFields, "level", before.Level.ToString(), after.Level.ToString());
            F(courseFields, "credentialType", before.CredentialType, after.CredentialType);
            F(courseFields, "passThresholdPercent", D(before.PassThresholdPercent), D(after.PassThresholdPercent));
            F(courseFields, "promoVideoId", before.PromoVideoId, after.PromoVideoId);
            F(courseFields, "categories", string.Join(",", before.Categories.OrderBy(x => x)), string.Join(",", after.Categories.OrderBy(x => x)));
        }

        var bMods = before?.Modules.ToDictionary(m => m.Id) ?? [];
        var aMods = after.Modules.ToDictionary(m => m.Id);
        var modulesAdded = after.Modules.Where(m => !bMods.ContainsKey(m.Id)).Select(m => new DiffModuleDto(m.Id, m.Title)).ToList();
        var modulesRemoved = (before?.Modules ?? []).Where(m => !aMods.ContainsKey(m.Id)).Select(m => new DiffModuleDto(m.Id, m.Title)).ToList();
        var modulesChanged = new List<ChangedEntityDto>();
        foreach (var m in after.Modules.Where(m => bMods.ContainsKey(m.Id)))
        {
            var b = bMods[m.Id]; var ch = new List<FieldChangeDto>();
            F(ch, "title", b.Title, m.Title);
            F(ch, "sortOrder", b.SortOrder.ToString(), m.SortOrder.ToString());
            if (ch.Count > 0) modulesChanged.Add(new ChangedEntityDto(m.Id, m.Title, ch));
        }

        var bLessons = (before?.Modules ?? []).SelectMany(m => m.Lessons.Select(l => (m.Id, l))).ToDictionary(x => x.l.Id);
        var aLessons = after.Modules.SelectMany(m => m.Lessons.Select(l => (m.Id, l))).ToDictionary(x => x.l.Id);
        var lessonsAdded = aLessons.Values.Where(x => !bLessons.ContainsKey(x.l.Id)).Select(x => new DiffLessonDto(x.l.Id, x.Item1, x.l.Title)).ToList();
        var lessonsRemoved = bLessons.Values.Where(x => !aLessons.ContainsKey(x.l.Id)).Select(x => new DiffLessonDto(x.l.Id, x.Item1, x.l.Title)).ToList();
        var lessonsChanged = new List<ChangedEntityDto>();
        foreach (var (moduleId, l) in aLessons.Values.Where(x => bLessons.ContainsKey(x.l.Id)))
        {
            var (bModuleId, b) = bLessons[l.Id]; var ch = new List<FieldChangeDto>();
            F(ch, "moduleId", bModuleId.ToString(), moduleId.ToString());
            F(ch, "title", b.Title, l.Title);
            F(ch, "objective", b.Objective, l.Objective);
            F(ch, "sortOrder", b.SortOrder.ToString(), l.SortOrder.ToString());
            F(ch, "isPreview", b.IsPreview.ToString(), l.IsPreview.ToString());
            F(ch, "videoAssetId", b.VideoAssetId?.ToString(), l.VideoAssetId?.ToString());
            F(ch, "youtubeVideoId", b.YoutubeVideoId, l.YoutubeVideoId);
            F(ch, "notesMarkdown", b.NotesMarkdown, l.NotesMarkdown);
            F(ch, "premiumNotesMarkdown", b.PremiumNotesMarkdown, l.PremiumNotesMarkdown);
            if (ch.Count > 0) lessonsChanged.Add(new ChangedEntityDto(l.Id, l.Title, ch));
        }
        var has = courseFields.Count + modulesAdded.Count + modulesRemoved.Count + modulesChanged.Count
                  + lessonsAdded.Count + lessonsRemoved.Count + lessonsChanged.Count > 0;
        return new CourseDiffDto(courseId, status, baseVersion, has, courseFields, modulesAdded, modulesRemoved, modulesChanged,
            lessonsAdded, lessonsRemoved, lessonsChanged);
    }
}
