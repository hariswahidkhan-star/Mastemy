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
/// <summary>Learner-facing assessment settings frozen at publish (question pools stay live; question edits are staged by the bank).</summary>
public record SnapshotAssessment(Guid Id, string Title, AssessmentKind Kind, AssessmentMode Mode, bool IsPremium, Guid? ModuleId, Guid? LessonId,
    int? TimeLimitMinutes, int? MaxAttempts, decimal PassPercent, MultiSelectScoring MultiSelectScoring, AnswerReviewPolicy ReviewPolicy,
    int QuestionCount, bool CountsTowardCertificate);
/// <summary>A resource/caption file as published. StorageKey pins the blob version learners download until the next publish.</summary>
public record SnapshotResource(Guid Id, Guid? LessonId, string Kind, string Language, string FileName, string ContentType, long SizeBytes,
    bool IsPremium, int Version, string StorageKey, string Sha256);
public record CourseSnapshotPayload(string Title, string Subtitle, string Description, string Audience, string Prerequisites,
    string Outcomes, string Language, CourseLevel Level, string CredentialType, decimal PassThresholdPercent, string? PromoVideoId,
    int[] Categories, List<SnapshotModule> Modules, List<SnapshotAssessment>? Assessments = null, List<SnapshotResource>? Resources = null)
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

/// <summary>Card/list projection of a live course's current snapshot (no payload deserialization).</summary>
public class LiveCard
{
    public Guid Id { get; init; }
    public string Slug { get; init; } = "";
    public string Code { get; init; } = "";
    public string Title { get; init; } = "";
    public string Subtitle { get; init; } = "";
    public CourseLevel Level { get; init; }
    public string Language { get; init; } = "";
    public string CategoryIds { get; init; } = "";
    public string SearchText { get; init; } = "";
    public int LessonCount { get; init; }
    public int TotalDurationSeconds { get; init; }
    public DateTime? PublishedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? ReviewedAt { get; init; }
    public string CredentialType { get; init; } = "";
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
                    l.VideoAsset?.DurationSeconds ?? 0, l.NotesMarkdown, l.PremiumNotesMarkdown, l.NotesVersion)).ToList())).ToList(),
            await DraftAssessments(courseId), await DraftResources(courseId));
    }

    private Task<List<SnapshotAssessment>> DraftAssessments(Guid courseId) =>
        db.Assessments.AsNoTracking().Where(a => a.CourseId == courseId).OrderBy(a => a.Title).ThenBy(a => a.Id)
            .Select(a => new SnapshotAssessment(a.Id, a.Title, a.Kind, a.Mode, a.IsPremium, a.ModuleId, a.LessonId, a.TimeLimitMinutes,
                a.MaxAttempts, a.PassPercent, a.MultiSelectScoring, a.ReviewPolicy, a.QuestionCount, a.CountsTowardCertificate)).ToListAsync();

    private Task<List<SnapshotResource>> DraftResources(Guid courseId) =>
        db.ResourceFiles.AsNoTracking().Where(r => r.CourseId == courseId && r.DeletedAt == null).OrderBy(r => r.FileName).ThenBy(r => r.Id)
            .Select(r => new SnapshotResource(r.Id, r.LessonId, r.Kind, r.Language, r.FileName, r.ContentType, r.SizeBytes, r.IsPremium,
                r.Version, r.StorageKey, r.Sha256)).ToListAsync();

    /// <summary>Lower-cased text the catalog search matches against (title, subtitle, description, outcomes).</summary>
    public static string SearchTextOf(CourseSnapshotPayload p) =>
        string.Join('\n', p.Title, p.Subtitle, p.Description, p.Outcomes).ToLowerInvariant();

    public static string CategoryIdsOf(IEnumerable<int> ids)
    {
        var list = ids.Distinct().OrderBy(x => x).ToList();
        return list.Count == 0 ? "" : "," + string.Join(',', list) + ",";
    }

    public static int[] ParseCategoryIds(string csv) =>
        csv.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(x => int.TryParse(x, out var v) ? v : -1).Where(x => x >= 0).ToArray();

    /// <summary>
    /// Adds the next snapshot for a tracked course and bumps PublishedVersion, with its denormalized card/search columns and
    /// one SnapshotLessons index row per lesson. Caller saves.
    /// </summary>
    public async Task<CourseSnapshot> AddSnapshot(Course course, Guid publishedBy, DateTime nowUtc)
    {
        var payload = await BuildFromDraft(course.Id);
        var maxVersion = await db.CourseSnapshots.Where(s => s.CourseId == course.Id).MaxAsync(s => (int?)s.Version) ?? 0;
        var lessons = payload.OrderedLessons().Select(x => x.Lesson).ToList();
        var ready = await ReadyVideoDurations(lessons);
        var snap = new CourseSnapshot
        {
            CourseId = course.Id, Version = Math.Max(course.PublishedVersion, maxVersion) + 1,
            PayloadJson = JsonSerializer.Serialize(payload, Json), PublishedBy = publishedBy, PublishedAt = nowUtc,
            Title = payload.Title, Subtitle = payload.Subtitle, Level = payload.Level, Language = payload.Language,
            CategoryIds = CategoryIdsOf(payload.Categories), LessonCount = lessons.Count,
            TotalDurationSeconds = lessons.Sum(l => ready.GetValueOrDefault(l.Id)), SearchText = SearchTextOf(payload),
        };
        db.CourseSnapshots.Add(snap);
        foreach (var l in lessons.DistinctBy(l => l.Id))
            db.SnapshotLessons.Add(new Domain.SnapshotLesson { LessonId = l.Id, SnapshotId = snap.Id, CourseId = course.Id, Version = snap.Version });
        course.PublishedVersion = snap.Version;
        return snap;
    }

    /// <summary>Durations of lessons whose video asset is currently Ready (absent otherwise).</summary>
    private async Task<Dictionary<Guid, int>> ReadyVideoDurations(IReadOnlyCollection<SnapshotLesson> lessons)
    {
        var states = await VideoStates(lessons);
        return states.Where(kv => kv.Value.Playable).ToDictionary(kv => kv.Key, kv => kv.Value.DurationSeconds);
    }

    /// <summary>
    /// Latest payloads for the given live courses. Courses that went live before snapshots existed (PublishedVersion = 0,
    /// e.g. legacy data) fall back to an in-memory build of their current rows until their next publish. Snapshots written
    /// before assessments/resources were frozen have those lists filled from the current rows.
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
            if (s is null) { result[c.Id] = new PublishedCourse(c, 0, await BuildFromDraft(c.Id)); continue; }
            var p = Deserialize(s.PayloadJson);
            if (p.Assessments is null) p = p with { Assessments = await DraftAssessments(c.Id) };
            if (p.Resources is null) p = p with { Resources = await DraftResources(c.Id) };
            result[c.Id] = new PublishedCourse(c, s.Version, p);
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

    public async Task<PublishedCourse> LiveById(Guid id, string what = "Course") =>
        await TryLiveById(id) ?? throw AppException.NotFound(what);

    /// <summary>The live course rendered from its latest snapshot, or null when the course does not exist or is not live.</summary>
    public async Task<PublishedCourse?> TryLiveById(Guid id)
    {
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        return c is null || !AccessService.IsLive(c) ? null : await ForCourse(c);
    }

    /// <summary>
    /// Finds the live course whose latest snapshot contains the lesson, via the indexed SnapshotLessons table. Works for
    /// lessons deleted from the working copy after the snapshot was taken; lessons added since the last publish are not
    /// found (404). Legacy live courses without a snapshot (PublishedVersion = 0) resolve through their working rows.
    /// </summary>
    public async Task<(PublishedCourse Course, SnapshotModule Module, SnapshotLesson Lesson)> LiveLesson(Guid lessonId)
    {
        var candidates = await (from sl in db.SnapshotLessons.AsNoTracking()
                                join c in db.Courses.AsNoTracking() on sl.CourseId equals c.Id
                                where sl.LessonId == lessonId && sl.Version == c.PublishedVersion
                                select c).ToListAsync();
        if (candidates.Count == 0)
        {
            // Legacy course (never snapshotted) or a snapshot written before the lesson index existed: resolve the
            // working-copy lesson's course; its payload decides below whether the lesson is actually published.
            candidates = await (from l in db.Lessons.AsNoTracking()
                                join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                                join c in db.Courses.AsNoTracking() on m.CourseId equals c.Id
                                where l.Id == lessonId && (c.PublishedVersion == 0
                                      || !db.SnapshotLessons.Any(sl => sl.CourseId == c.Id && sl.Version == c.PublishedVersion))
                                select c).ToListAsync();
        }
        foreach (var c in candidates.DistinctBy(c => c.Id))
        {
            if (!AccessService.IsLive(c)) continue;
            var pc = await ForCourse(c);
            foreach (var (m, l) in pc.Payload.OrderedLessons())
                if (l.Id == lessonId) return (pc, m, l);
        }
        throw AppException.NotFound("Lesson");
    }

    // ---------- Card / list read model (SQL over the current snapshots' denormalized columns) ----------

    /// <summary>Live courses joined to their current snapshot's card columns. Excludes legacy courses (PublishedVersion = 0).</summary>
    public IQueryable<LiveCard> LiveCards() =>
        from c in db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr)
        join s in db.CourseSnapshots.AsNoTracking() on new { Id = c.Id, V = c.PublishedVersion } equals new { Id = s.CourseId, V = s.Version }
        select new LiveCard
        {
            Id = c.Id, Slug = c.Slug, Code = c.Code, Title = s.Title, Subtitle = s.Subtitle, Level = s.Level, Language = s.Language,
            CategoryIds = s.CategoryIds, SearchText = s.SearchText, LessonCount = s.LessonCount, TotalDurationSeconds = s.TotalDurationSeconds,
            PublishedAt = c.PublishedAt, UpdatedAt = c.UpdatedAt, CreatedAt = c.CreatedAt, ReviewedAt = c.ReviewedAt, CredentialType = c.CredentialType,
        };

    /// <summary>
    /// Cards for live legacy courses (PublishedVersion = 0) built in memory from their working rows. Rare (pre-snapshot data
    /// only), so callers union these with <see cref="LiveCards"/> results in memory.
    /// </summary>
    public async Task<List<LiveCard>> LegacyCards(IReadOnlyCollection<Guid>? onlyIds = null)
    {
        var q = db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr).Where(c => c.PublishedVersion == 0);
        if (onlyIds is not null) q = q.Where(c => onlyIds.Contains(c.Id));
        var courses = await q.ToListAsync();
        if (courses.Count == 0) return [];
        var published = await ForCourses(courses);
        var result = new List<LiveCard>();
        foreach (var pc in published.Values)
        {
            var lessons = pc.Payload.OrderedLessons().Select(x => x.Lesson).ToList();
            var ready = await ReadyVideoDurations(lessons);
            var c = pc.Course;
            result.Add(new LiveCard
            {
                Id = c.Id, Slug = c.Slug, Code = c.Code, Title = pc.Payload.Title, Subtitle = pc.Payload.Subtitle, Level = pc.Payload.Level,
                Language = pc.Payload.Language, CategoryIds = CategoryIdsOf(pc.Payload.Categories), SearchText = SearchTextOf(pc.Payload),
                LessonCount = lessons.Count, TotalDurationSeconds = ready.Values.Sum(), PublishedAt = c.PublishedAt, UpdatedAt = c.UpdatedAt,
                CreatedAt = c.CreatedAt, ReviewedAt = c.ReviewedAt, CredentialType = c.CredentialType,
            });
        }
        return result;
    }

    /// <summary>Card rows for the given live course ids (snapshot columns; legacy courses built in memory). Non-live ids are absent.</summary>
    public async Task<Dictionary<Guid, LiveCard>> CardsFor(IReadOnlyCollection<Guid> ids)
    {
        if (ids.Count == 0) return [];
        var list = ids.Distinct().ToList();
        var rows = await LiveCards().Where(x => list.Contains(x.Id)).ToListAsync();
        var missing = list.Except(rows.Select(r => r.Id)).ToList();
        if (missing.Count > 0) rows.AddRange(await LegacyCards(missing));
        return rows.ToDictionary(r => r.Id);
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
