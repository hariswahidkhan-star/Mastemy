using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Resources;

public static class ResourceKinds
{
    public const string Resource = "Resource";
    public const string Caption = "Caption";

    public static string Normalize(string? kind) => (kind ?? Resource).Trim().ToLowerInvariant() switch
    {
        "" or "resource" => Resource,
        "caption" => Caption,
        _ => throw AppException.Bad("kind must be 'Resource' or 'Caption'.", "invalid_kind"),
    };
}

public record ResourceDto(Guid Id, Guid CourseId, Guid? LessonId, string Kind, string Language, string FileName, string ContentType,
    long SizeBytes, string Sha256, bool IsPremium, int Version, DateTime CreatedAt,
    string ScanStatus = "NotScanned", DateTime? ScannedAt = null);

public record LearnerResourceDto(Guid Id, Guid? LessonId, string Kind, string Language, string FileName, string ContentType, long SizeBytes,
    bool IsPremium, bool Locked, int Version, string? DownloadUrl);

public record CaptionTrackDto(Guid Id, string Language, string Url, int Version);
public record TranscriptMatch(Guid CaptionId, string Language, double StartSeconds, double EndSeconds, string Start, string Text);
public record ResourceUsageDto(long UsedBytes, long QuotaBytes, long MaxFileBytes);
public record UpdateResourceInput(bool? IsPremium);

public record UploadRequest(Guid? LessonId, string? Kind, string? Language, bool IsPremium);

/// <summary>A file to deliver: content stream plus server-verified metadata.</summary>
public sealed record ResourceDownload(Stream Content, string ContentType, string FileName, bool Premium);

/// <summary>
/// Supporting (non-video) files and caption tracks for courses (spec §3, §12). Uploads are allow-listed by extension
/// and magic bytes, bounded per file and per course, content-addressed and de-duplicated within a course. Premium
/// files are listed to everyone but downloadable only with a premium entitlement; free files are open to all on live courses.
/// </summary>
public class ResourceService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit,
    IResourceStorage storage, ResourceOptions opt, CourseSnapshotService snapshots, ResourceBlobJanitor janitor, CaptionCueCache cueCache,
    Trust.MalwareScanPolicy scanPolicy)
{
    public ResourceOptions Options => opt;

    // ---------- studio ----------

    private async Task<Course> EditableCourse(Guid courseId)
    {
        await access.RequireCourseEditor(courseId);
        var course = await db.Courses.FirstOrDefaultAsync(c => c.Id == courseId) ?? throw AppException.NotFound("Course");
        CourseStateMachine.RequireEditable(course);
        return course;
    }

    public async Task<List<ResourceDto>> StudioList(Guid courseId)
    {
        await access.RequireCourseAuthorOrStaff(courseId);
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        var rows = await db.ResourceFiles.AsNoTracking().Where(r => r.CourseId == courseId && r.DeletedAt == null)
            .OrderBy(r => r.LessonId).ThenBy(r => r.Kind).ThenBy(r => r.FileName).ToListAsync();
        var ids = rows.Select(r => r.Id).ToList();
        var scans = await db.Set<ResourceScanRecord>().AsNoTracking().Where(x => ids.Contains(x.ResourceFileId))
            .ToDictionaryAsync(x => x.ResourceFileId);
        return rows.Select(r => ToDto(r, scans.GetValueOrDefault(r.Id))).ToList();
    }

    public async Task<ResourceUsageDto> Usage(Guid courseId)
    {
        await access.RequireCourseAuthorOrStaff(courseId);
        var used = await db.ResourceFiles.Where(r => r.CourseId == courseId && r.DeletedAt == null).SumAsync(r => (long?)r.SizeBytes) ?? 0;
        return new ResourceUsageDto(used, opt.PerCourseQuotaBytes, opt.MaxFileBytes);
    }

    public async Task<ResourceDto> Upload(Guid courseId, UploadRequest req, string? clientFileName, Stream body, CancellationToken ct)
    {
        await EditableCourse(courseId);
        var kind = ResourceKinds.Normalize(req.Kind);
        if (req.LessonId is { } lessonId && !await LessonInCourse(lessonId, courseId)) throw AppException.Bad("lessonId does not belong to this course.", "invalid_lesson");
        var language = "";
        if (kind == ResourceKinds.Caption)
        {
            if (req.LessonId is null) throw AppException.Bad("Captions must be attached to a lesson.", "lesson_required");
            if (req.IsPremium) throw AppException.Bad("Captions accompany free videos and cannot be premium.", "captions_must_be_free");
            language = Captions.NormalizeLanguage(req.Language);
        }
        else if (!string.IsNullOrWhiteSpace(req.Language)) language = Captions.NormalizeLanguage(req.Language);

        var fileName = FileTypePolicy.SanitizeFileName(clientFileName);
        var ext = FileTypePolicy.CheckExtension(fileName);
        if (kind == ResourceKinds.Caption && !FileTypePolicy.CaptionExtensions.Contains(ext))
            throw new AppException(415, "Caption files must be .vtt or .srt.", "file_type_not_allowed");

        await using var staged = await storage.StageAsync(body, opt.MaxFileBytes, ct);
        await Validate(ext, kind, staged, ct);
        var scan = await scanPolicy.EnforceAsync(staged.TempPath, ct); // infected → 422; the staged file is discarded on dispose

        var entity = new ResourceFile
        {
            CourseId = courseId, LessonId = req.LessonId, Kind = kind, Language = language, FileName = fileName,
            ContentType = FileTypePolicy.Allowed[ext], SizeBytes = staged.Size, Sha256 = staged.Sha256,
            StorageKey = ResourceStorageKeys.For(courseId, staged.Sha256),
            IsPremium = req.IsPremium, Version = 1, UploadedBy = me.RequireId(), CreatedAt = DateTime.UtcNow,
        };
        await using var tx = await db.Database.BeginTransactionAsync(ct);
        await LockCourse(courseId, ct);
        await EnsureUniqueAndWithinQuota(courseId, null, staged, ct);
        await storage.CommitAsync(staged, entity.StorageKey, ct);
        db.ResourceFiles.Add(entity);
        var record = new ResourceScanRecord { ResourceFileId = entity.Id, Sha256 = entity.Sha256, Verdict = scan.Verdict, Engine = scan.Engine, ScannedAt = DateTime.UtcNow };
        db.Set<ResourceScanRecord>().Add(record);
        audit.Record("resource.uploaded", "ResourceFile", entity.Id,
            new { entity.CourseId, entity.LessonId, entity.Kind, entity.FileName, entity.SizeBytes, entity.Sha256, entity.IsPremium, scan = scan.Verdict.ToString() });
        await db.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);
        return ToDto(entity, record);
    }

    /// <summary>
    /// Replaces the file content of an existing resource; the version increments. The old blob stays available while the
    /// current published snapshot still serves it, and is purged on the next publish.
    /// </summary>
    public async Task<ResourceDto> Replace(Guid id, bool? isPremium, string? clientFileName, Stream body, CancellationToken ct)
    {
        var r = await db.ResourceFiles.FirstOrDefaultAsync(x => x.Id == id && x.DeletedAt == null, ct) ?? throw AppException.NotFound("Resource");
        await EditableCourse(r.CourseId);
        var fileName = FileTypePolicy.SanitizeFileName(clientFileName);
        var ext = FileTypePolicy.CheckExtension(fileName);
        if (r.Kind == ResourceKinds.Caption && !FileTypePolicy.CaptionExtensions.Contains(ext))
            throw new AppException(415, "Caption files must be .vtt or .srt.", "file_type_not_allowed");
        if (r.Kind == ResourceKinds.Caption && isPremium == true) throw AppException.Bad("Captions cannot be premium.", "captions_must_be_free");

        await using var staged = await storage.StageAsync(body, opt.MaxFileBytes, ct);
        await Validate(ext, r.Kind, staged, ct);
        var scan = await scanPolicy.EnforceAsync(staged.TempPath, ct);

        await using var tx = await db.Database.BeginTransactionAsync(ct);
        await LockCourse(r.CourseId, ct);
        await EnsureUniqueAndWithinQuota(r.CourseId, r.Id, staged, ct);
        var newKey = ResourceStorageKeys.For(r.CourseId, staged.Sha256);
        await storage.CommitAsync(staged, newKey, ct);
        var oldKey = r.StorageKey;
        var oldVersion = r.Version;
        r.FileName = fileName;
        r.ContentType = FileTypePolicy.Allowed[ext];
        r.SizeBytes = staged.Size;
        r.Sha256 = staged.Sha256;
        r.StorageKey = newKey;
        if (isPremium is { } p) r.IsPremium = p;
        r.Version = oldVersion + 1;
        r.UploadedBy = me.RequireId();
        var record = await db.Set<ResourceScanRecord>().FirstOrDefaultAsync(x => x.ResourceFileId == r.Id, ct);
        if (record is null) { record = new ResourceScanRecord { ResourceFileId = r.Id }; db.Set<ResourceScanRecord>().Add(record); }
        record.Sha256 = r.Sha256; record.Verdict = scan.Verdict; record.Engine = scan.Engine; record.ScannedAt = DateTime.UtcNow;
        audit.Record("resource.replaced", "ResourceFile", r.Id, new { r.CourseId, fromVersion = oldVersion, toVersion = r.Version, r.FileName, r.Sha256, r.IsPremium, scan = scan.Verdict.ToString() });
        await db.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);
        if (oldKey != newKey) await janitor.ReleaseIfUnreferenced(r.CourseId, oldKey, ct);
        return ToDto(r, record);
    }

    public async Task<ResourceDto> Update(Guid id, UpdateResourceInput input)
    {
        var r = await db.ResourceFiles.FirstOrDefaultAsync(x => x.Id == id && x.DeletedAt == null) ?? throw AppException.NotFound("Resource");
        await EditableCourse(r.CourseId);
        if (input.IsPremium is { } p && p != r.IsPremium)
        {
            if (r.Kind == ResourceKinds.Caption && p) throw AppException.Bad("Captions cannot be premium.", "captions_must_be_free");
            r.IsPremium = p;
            audit.Record("resource.premium_changed", "ResourceFile", r.Id, new { r.CourseId, r.IsPremium });
            await db.SaveChangesAsync();
        }
        return ToDto(r, await db.Set<ResourceScanRecord>().AsNoTracking().FirstOrDefaultAsync(x => x.ResourceFileId == r.Id));
    }

    /// <summary>
    /// Removes a resource from the working copy. While the current published snapshot still serves it the row is soft-deleted
    /// (learners keep downloading it) and the row and blob are purged on the next publish; otherwise it is removed now.
    /// </summary>
    public async Task Delete(Guid id, CancellationToken ct)
    {
        var r = await db.ResourceFiles.FirstOrDefaultAsync(x => x.Id == id && x.DeletedAt == null, ct) ?? throw AppException.NotFound("Resource");
        await EditableCourse(r.CourseId);
        var published = (await janitor.CurrentSnapshotResources(r.CourseId, ct)).Any(x => x.Id == r.Id);
        if (published) r.DeletedAt = DateTime.UtcNow;
        else db.ResourceFiles.Remove(r);
        audit.Record("resource.deleted", "ResourceFile", r.Id, new { r.CourseId, r.LessonId, r.FileName, r.Sha256, r.Version, deferred = published });
        await db.SaveChangesAsync(ct);
        if (!published) await janitor.ReleaseIfUnreferenced(r.CourseId, r.StorageKey, ct);
    }

    private async Task Validate(string ext, string kind, StagedFile staged, CancellationToken ct)
    {
        FileTypePolicy.VerifyContent(ext, staged);
        if (kind == ResourceKinds.Caption || FileTypePolicy.CaptionExtensions.Contains(ext))
            Captions.Parse(await File.ReadAllTextAsync(staged.TempPath, Encoding.UTF8, ct), ext);
    }

    /// <summary>Serializes quota checks per course (row lock held until the surrounding transaction ends).</summary>
    private Task LockCourse(Guid courseId, CancellationToken ct) =>
        db.Database.ExecuteSqlInterpolatedAsync($"SELECT Id FROM Courses WHERE Id = {courseId} FOR UPDATE", ct);

    private async Task EnsureUniqueAndWithinQuota(Guid courseId, Guid? replacingId, StagedFile staged, CancellationToken ct)
    {
        var dup = await db.ResourceFiles.AsNoTracking()
            .Where(x => x.CourseId == courseId && x.Sha256 == staged.Sha256 && x.Id != replacingId && x.DeletedAt == null)
            .Select(x => new { x.Id, x.FileName }).FirstOrDefaultAsync(ct);
        if (dup is not null)
            throw AppException.Conflict($"This file is already uploaded to the course as '{dup.FileName}' ({dup.Id}).", "duplicate_resource");
        var used = await db.ResourceFiles.Where(x => x.CourseId == courseId && x.Id != replacingId && x.DeletedAt == null).SumAsync(x => (long?)x.SizeBytes, ct) ?? 0;
        if (used + staged.Size > opt.PerCourseQuotaBytes)
            throw new AppException(413, $"Course storage quota exceeded: {used} of {opt.PerCourseQuotaBytes} bytes used, this file needs {staged.Size}.", "quota_exceeded");
    }

    private Task<bool> LessonInCourse(Guid lessonId, Guid courseId) =>
        db.Lessons.AnyAsync(l => l.Id == lessonId && db.Modules.Any(m => m.Id == l.ModuleId && m.CourseId == courseId));

    private static ResourceDto ToDto(ResourceFile r, ResourceScanRecord? scan = null) => new(r.Id, r.CourseId, r.LessonId, r.Kind, r.Language,
        r.FileName, r.ContentType, r.SizeBytes, r.Sha256, r.IsPremium, r.Version, r.CreatedAt,
        scan is not null && scan.Sha256 == r.Sha256 ? scan.Verdict.ToString() : nameof(Trust.ScanVerdict.NotScanned),
        scan is not null && scan.Sha256 == r.Sha256 ? scan.ScannedAt : null);

    // ---------- learners ----------
    // Learners are served the files frozen in the course's current published snapshot (file version, storage key and
    // premium flag), resolved through the published lesson; draft uploads, premium flips, replacements and deletes take
    // effect on the next publish. Course authors, reviewers and staff preview the working copy.

    private async Task<bool> IsPrivileged(Guid courseId) =>
        me.Id is not null && (me.IsStaff || me.CanReview || await access.IsCourseAuthor(courseId));

    private static SnapshotResource ToSnapshot(ResourceFile r) => new(r.Id, r.LessonId, r.Kind, r.Language, r.FileName, r.ContentType,
        r.SizeBytes, r.IsPremium, r.Version, r.StorageKey, r.Sha256);

    /// <summary>Files attached to a lesson as the caller may see them: working copy for privileged users, else the published snapshot.</summary>
    private async Task<(Guid CourseId, bool Privileged, List<SnapshotResource> Files)> LessonFiles(Guid lessonId, CancellationToken ct = default)
    {
        var draftCourseId = await (from l in db.Lessons.AsNoTracking()
                                   join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                                   where l.Id == lessonId
                                   select (Guid?)m.CourseId).FirstOrDefaultAsync(ct);
        if (draftCourseId is { } cid && await IsPrivileged(cid))
        {
            var rows = await db.ResourceFiles.AsNoTracking().Where(r => r.CourseId == cid && r.LessonId == lessonId && r.DeletedAt == null).ToListAsync(ct);
            return (cid, true, rows.Select(ToSnapshot).ToList());
        }
        var (pc, _, _) = await snapshots.LiveLesson(lessonId);
        return (pc.Course.Id, false, (pc.Payload.Resources ?? []).Where(r => r.LessonId == lessonId).ToList());
    }

    /// <summary>A single file as the caller may access it; 404 when it is not part of what the caller can see.</summary>
    private async Task<(SnapshotResource File, Guid CourseId, bool Privileged)> VisibleFile(Guid id, string? kind, string what, CancellationToken ct = default)
    {
        var row = await db.ResourceFiles.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct) ?? throw AppException.NotFound(what);
        if (row.DeletedAt is null && (kind is null || row.Kind == kind) && await IsPrivileged(row.CourseId))
            return (ToSnapshot(row), row.CourseId, true);
        var pc = await snapshots.TryLiveById(row.CourseId) ?? throw AppException.NotFound(what);
        var f = pc.Payload.Resources?.FirstOrDefault(x => x.Id == id) ?? throw AppException.NotFound(what);
        if (kind is not null && f.Kind != kind) throw AppException.NotFound(what);
        if (f.LessonId is { } lid && !pc.Payload.Modules.Any(m => m.Lessons.Any(l => l.Id == lid))) throw AppException.NotFound(what);
        return (f, row.CourseId, false);
    }

    public async Task<List<LearnerResourceDto>> LessonResources(Guid lessonId)
    {
        var (courseId, privileged, files) = await LessonFiles(lessonId);
        var rows = files.Where(r => r.Kind == ResourceKinds.Resource).OrderBy(r => r.FileName, StringComparer.Ordinal).ToList();
        var premium = privileged || (rows.Any(r => r.IsPremium) && await access.HasPremiumAccess(courseId));
        return rows.Select(r =>
        {
            var locked = r.IsPremium && !premium;
            return new LearnerResourceDto(r.Id, r.LessonId, r.Kind, r.Language, r.FileName, r.ContentType, r.SizeBytes, r.IsPremium, locked,
                r.Version, locked ? null : $"/api/learn/resources/{r.Id}/download");
        }).ToList();
    }

    /// <summary>Authorization is re-checked on every download; locked premium files return 403, unpublished files 404.</summary>
    public async Task<ResourceDownload> Download(Guid id)
    {
        var (f, courseId, privileged) = await VisibleFile(id, null, "Resource");
        if (f.IsPremium && !privileged)
        {
            if (me.Id is null) throw new AppException(401, "Sign in to download premium resources.", "unauthenticated");
            if (!await access.HasPremiumAccess(courseId))
                throw new AppException(403, "This resource is part of the course's premium services.", "premium_required");
        }
        if (!storage.Exists(f.StorageKey)) throw AppException.NotFound("Resource file");
        return new ResourceDownload(storage.OpenRead(f.StorageKey), f.ContentType, f.FileName, f.IsPremium);
    }

    public async Task<List<CaptionTrackDto>> CaptionTracks(Guid lessonId)
    {
        var (_, _, files) = await LessonFiles(lessonId);
        return files.Where(r => r.Kind == ResourceKinds.Caption).OrderBy(r => r.Language, StringComparer.Ordinal)
            .Select(r => new CaptionTrackDto(r.Id, r.Language, "/api/learn/captions/" + r.Id + "/vtt", r.Version)).ToList();
    }

    /// <summary>Caption track as WebVTT (SRT converted on the fly). Captions are always free.</summary>
    public async Task<string> CaptionVtt(Guid id, CancellationToken ct)
    {
        var (f, _, _) = await VisibleFile(id, ResourceKinds.Caption, "Caption", ct);
        if (f.LessonId is null) throw AppException.NotFound("Caption");
        return Captions.ToVtt(await Cues(f, ct));
    }

    private Task<List<CaptionCue>> Cues(SnapshotResource f, CancellationToken ct) =>
        cueCache.GetOrLoad(f.Id, f.Version, async () =>
        {
            if (!storage.Exists(f.StorageKey)) throw AppException.NotFound("Caption file");
            await using var s = storage.OpenRead(f.StorageKey);
            using var reader = new StreamReader(s, Encoding.UTF8);
            return Captions.Parse(await reader.ReadToEndAsync(ct), FileTypePolicy.Extension(f.FileName));
        });

    /// <summary>Searches the course's own caption files for the lesson (owned/licensed text only, spec).</summary>
    public async Task<List<TranscriptMatch>> Transcript(Guid lessonId, string? q, string? language, CancellationToken ct)
    {
        var query = (q ?? "").Trim();
        if (query.Length is < 2 or > 200) throw AppException.Bad("q must be 2-200 characters.", "invalid_query");
        var lang = string.IsNullOrWhiteSpace(language) ? null : Captions.NormalizeLanguage(language);
        var (_, _, files) = await LessonFiles(lessonId, ct);
        var tracks = files.Where(r => r.Kind == ResourceKinds.Caption && (lang == null || r.Language == lang))
            .OrderBy(r => r.Language, StringComparer.Ordinal).ToList();
        var result = new List<TranscriptMatch>();
        foreach (var t in tracks)
        foreach (var cue in await Cues(t, ct))
        {
            var text = Captions.PlainText(cue.Text);
            if (!text.Contains(query, StringComparison.InvariantCultureIgnoreCase)) continue;
            result.Add(new TranscriptMatch(t.Id, t.Language, cue.Start.TotalSeconds, cue.End.TotalSeconds, Captions.FormatVtt(cue.Start), text));
            if (result.Count >= 200) return result;
        }
        return result;
    }
}
