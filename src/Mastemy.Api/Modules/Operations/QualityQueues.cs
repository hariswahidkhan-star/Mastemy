using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Engagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Operations;

/// <summary>Record of a "notify instructor" action on the broken-link queue.</summary>
public class BrokenLinkNotice
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid VideoAssetId { get; set; }
    public Guid NotifiedBy { get; set; }
    public int Recipients { get; set; }
    public DateTime NotifiedAt { get; set; } = DateTime.UtcNow;
}

public class BrokenLinkNoticeConfiguration : IEntityTypeConfiguration<BrokenLinkNotice>
{
    public void Configure(EntityTypeBuilder<BrokenLinkNotice> b)
    {
        b.ToTable("Operations_BrokenLinkNotices");
        b.HasIndex(x => new { x.VideoAssetId, x.NotifiedAt });
    }
}

public record AffectedLessonDto(Guid LessonId, string Title);
public record AffectedCourseDto(Guid CourseId, string Title, string Slug, int Version, List<AffectedLessonDto> Lessons, List<Guid> InstructorIds);
public record BrokenLinkDto(Guid VideoAssetId, string YouTubeVideoId, string Title, VideoStatus Status, string? StatusReason, DateTime? LastCheckedAt,
    List<AffectedCourseDto> Courses, DateTime? LastNotifiedAt);
public record BrokenLinkNoticeDto(Guid VideoAssetId, int CoursesNotified, int Recipients, DateTime NotifiedAt);
public record OverdueCourseDto(Guid CourseId, string Title, string Slug, CourseStatus Status, Guid OwnerId, string? OwnerName,
    DateTime LastPublishedAt, int MonthsSincePublish);

/// <summary>Admin quality queues (spec §20): broken video links in live courses and overdue content updates.</summary>
public class QualityQueueService(AppDbContext db, ICurrentUser me, AuditService audit, EmailOutbox email, OperationsOptions opt)
{
    private const int MaxAssets = 500;

    public async Task<List<BrokenLinkDto>> BrokenLinks(CancellationToken ct = default)
    {
        var assets = await db.VideoAssets.AsNoTracking()
            .Where(v => v.Status == VideoStatus.Restricted || v.Status == VideoStatus.Failed)
            .OrderByDescending(v => v.LastCheckedAt).Take(MaxAssets).ToListAsync(ct);
        var result = new List<BrokenLinkDto>();
        if (assets.Count == 0) return result;
        var ids = assets.Select(a => a.Id).ToList();
        var lastNotices = await db.Set<BrokenLinkNotice>().AsNoTracking().Where(n => ids.Contains(n.VideoAssetId))
            .GroupBy(n => n.VideoAssetId).Select(g => new { g.Key, At = g.Max(n => n.NotifiedAt) }).ToDictionaryAsync(x => x.Key, x => x.At, ct);
        foreach (var a in assets)
        {
            var courses = await AffectedCourses(a.Id, ct);
            if (courses.Count == 0) continue; // only assets that learners actually hit in a live snapshot
            result.Add(new BrokenLinkDto(a.Id, a.YouTubeVideoId, a.Title, a.Status, a.StatusReason, a.LastCheckedAt, courses,
                lastNotices.TryGetValue(a.Id, out var at) ? at : null));
        }
        return result;
    }

    /// <summary>Live courses whose CURRENT published snapshot plays this asset (draft-only links are not learner-facing).</summary>
    private async Task<List<AffectedCourseDto>> AffectedCourses(Guid assetId, CancellationToken ct)
    {
        var needle = assetId.ToString("D");
        var snaps = await db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr)
            .Join(db.CourseSnapshots.AsNoTracking(), c => new { c.Id, V = c.PublishedVersion }, s => new { Id = s.CourseId, V = s.Version },
                (c, s) => new { c.Id, c.Title, c.Slug, s.Version, s.PayloadJson })
            .Where(x => x.PayloadJson.Contains(needle))
            .ToListAsync(ct);
        var list = new List<AffectedCourseDto>();
        foreach (var s in snaps)
        {
            var payload = CourseSnapshotService.Deserialize(s.PayloadJson);
            var lessons = payload.OrderedLessons().Where(x => x.Lesson.VideoAssetId == assetId)
                .Select(x => new AffectedLessonDto(x.Lesson.Id, x.Lesson.Title)).ToList();
            if (lessons.Count == 0) continue;
            var instructors = await db.CourseInstructors.AsNoTracking().Where(i => i.CourseId == s.Id).Select(i => i.UserId).ToListAsync(ct);
            list.Add(new AffectedCourseDto(s.Id, s.Title, s.Slug, s.Version, lessons, instructors));
        }
        return list;
    }

    public async Task<BrokenLinkNoticeDto> NotifyBrokenLink(Guid assetId, CancellationToken ct = default)
    {
        var staff = me.RequireId();
        var asset = await db.VideoAssets.AsNoTracking().FirstOrDefaultAsync(v => v.Id == assetId, ct) ?? throw AppException.NotFound("Video");
        if (asset.Status is not (VideoStatus.Restricted or VideoStatus.Failed))
            throw AppException.Conflict("This video is not in a broken state.", "video_not_broken");
        var courses = await AffectedCourses(assetId, ct);
        if (courses.Count == 0) throw AppException.Conflict("No live course lesson uses this video.", "not_linked");
        var recipients = courses.SelectMany(c => c.InstructorIds).Distinct().ToList();
        var now = DateTime.UtcNow;
        foreach (var c in courses)
            foreach (var uid in c.InstructorIds)
                db.Notifications.Add(new Notification
                {
                    UserId = uid, Kind = "broken_video", CreatedAt = now, Link = $"/studio/courses/{c.CourseId}",
                    Title = Trim($"A video in \"{c.Title}\" is unavailable on YouTube ({asset.Status}). Re-upload or relink {c.Lessons.Count} lesson(s)."),
                });
        var users = await db.Users.AsNoTracking().Where(u => recipients.Contains(u.Id) && !u.IsSuspended).Select(u => u.Email).ToListAsync(ct);
        foreach (var to in users)
            email.Enqueue(to, "Action needed: a course video is unavailable",
                $"The YouTube video \"{asset.Title}\" ({asset.YouTubeVideoId}) is {asset.Status}{(asset.StatusReason is null ? "" : $": {asset.StatusReason}")}.\n" +
                "Learners cannot play it in: " + string.Join("; ", courses.Select(c => $"{c.Title} ({c.Lessons.Count} lesson(s))")) +
                ".\nRe-upload from your retained source file and relink the lesson in the studio.");
        db.Set<BrokenLinkNotice>().Add(new BrokenLinkNotice { VideoAssetId = assetId, NotifiedBy = staff, Recipients = recipients.Count, NotifiedAt = now });
        audit.Record("broken_link.notified", nameof(VideoAsset), assetId, new { courses = courses.Select(c => c.CourseId), recipients = recipients.Count });
        await db.SaveChangesAsync(ct);
        return new BrokenLinkNoticeDto(assetId, courses.Count, recipients.Count, now);
    }

    private static string Trim(string s) => s.Length > 300 ? s[..300] : s;

    public async Task<List<OverdueCourseDto>> OverdueContent(int? months, CancellationToken ct = default)
    {
        var m = months ?? opt.OverdueContentMonths;
        if (m is < 1 or > 120) throw AppException.Bad("months must be between 1 and 120.", "invalid_months");
        var now = DateTime.UtcNow;
        var cutoff = now.AddMonths(-m);
        var rows = await db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr)
            .Select(c => new
            {
                c.Id, c.Title, c.Slug, c.Status, c.OwnerId,
                Last = db.CourseSnapshots.Where(s => s.CourseId == c.Id).Max(s => (DateTime?)s.PublishedAt) ?? c.PublishedAt,
            })
            .Where(x => x.Last != null && x.Last < cutoff)
            .OrderBy(x => x.Last).Take(1000).ToListAsync(ct);
        var owners = rows.Select(r => r.OwnerId).Distinct().ToList();
        var names = await db.Users.AsNoTracking().Where(u => owners.Contains(u.Id)).ToDictionaryAsync(u => u.Id, u => u.DisplayName, ct);
        return rows.Select(r => new OverdueCourseDto(r.Id, r.Title, r.Slug, r.Status, r.OwnerId, names.GetValueOrDefault(r.OwnerId), r.Last!.Value,
            (now.Year - r.Last!.Value.Year) * 12 + now.Month - r.Last!.Value.Month)).ToList();
    }
}

[ApiController]
[Authorize(Policy = "Staff")]
[Route("api/admin/operations")]
public class QualityQueuesController(QualityQueueService svc) : ControllerBase
{
    [HttpGet("broken-links")]
    public Task<List<BrokenLinkDto>> BrokenLinks(CancellationToken ct) => svc.BrokenLinks(ct);

    [HttpPost("broken-links/{videoAssetId:guid}/notify")]
    public Task<BrokenLinkNoticeDto> Notify(Guid videoAssetId, CancellationToken ct) => svc.NotifyBrokenLink(videoAssetId, ct);

    [HttpGet("overdue-content")]
    public Task<List<OverdueCourseDto>> Overdue([FromQuery] int? months, CancellationToken ct) => svc.OverdueContent(months, ct);
}
