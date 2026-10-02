using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Engagement;

public class AnnouncementService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit, INotificationService notify)
{
    public const int MaxPer24h = 3, TitleMax = 200, BodyMax = 5000;

    public const string CreatedAction = "announcement.created";
    public static readonly TimeSpan IdempotencyWindow = TimeSpan.FromHours(24);

    private record CreatedDetails(Guid AnnouncementId, string Title, string? IdempotencyKey, int Notified);

    /// <summary>Row-locks the course for the rest of the caller's transaction (serializes per-course rate-limit checks).</summary>
    internal static Task LockCourse(AppDbContext db, Guid courseId) =>
        db.Database.ExecuteSqlInterpolatedAsync($"SELECT `Id` FROM `Courses` WHERE `Id` = {courseId.ToString()} FOR UPDATE");

    /// <summary>The key is hashed so arbitrary client strings never land in the audit details verbatim.</summary>
    private static string? HashKey(string? key)
    {
        if (string.IsNullOrWhiteSpace(key)) return null;
        var k = key.Trim();
        if (k.Length > 200) throw AppException.Bad("Idempotency key must be at most 200 characters.", "invalid_idempotency_key");
        return Convert.ToHexString(System.Security.Cryptography.SHA256.HashData(System.Text.Encoding.UTF8.GetBytes(k))).ToLowerInvariant();
    }

    public async Task<AnnouncementCreatedDto> Create(Guid courseId, AnnouncementInput input, string? idempotencyKey = null)
    {
        var uid = me.RequireId();
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        if (!await access.IsCourseAuthor(courseId)) throw AppException.Forbidden("Only this course's instructors can post announcements.");
        if (!AccessService.IsLive(c)) throw AppException.Conflict("Announcements can only be posted on a live course.", "course_not_live");
        var title = TextRules.PlainText(input.Title, "Title", 3, TitleMax);
        var body = TextRules.PlainText(input.Body, "Body", 1, BodyMax);
        var key = HashKey(string.IsNullOrWhiteSpace(idempotencyKey) ? input.ClientRequestId : idempotencyKey);
        var cid = courseId.ToString();

        await using var tx = await db.Database.BeginTransactionAsync();
        await LockCourse(db, courseId);
        var since = DateTime.UtcNow - IdempotencyWindow;
        if (key is not null)
        {
            var marker = $"\"IdempotencyKey\":\"{key}\"";
            var prior = await db.AuditLogs.AsNoTracking()
                .Where(x => x.Action == CreatedAction && x.EntityType == "Course" && x.EntityId == cid && x.ActorId == uid
                            && x.CreatedAt > since && x.Details!.Contains(marker))
                .OrderByDescending(x => x.Id).FirstOrDefaultAsync();
            if (prior?.Details is not null)
            {
                var d = JsonSerializer.Deserialize<CreatedDetails>(prior.Details)!;
                var existing = await db.Announcements.AsNoTracking().FirstOrDefaultAsync(x => x.Id == d.AnnouncementId);
                if (existing is not null)
                {
                    await tx.CommitAsync();
                    return new AnnouncementCreatedDto(await ToDto(existing), d.Notified, Duplicate: true);
                }
            }
        }
        if (await db.Announcements.CountAsync(a => a.CourseId == courseId && a.CreatedAt > since) >= MaxPer24h)
            throw new AppException(429, $"At most {MaxPer24h} announcements per course in 24 hours.", "announcement_rate_limited");

        var a = new Announcement { CourseId = courseId, AuthorId = uid, Title = title, Body = body };
        db.Announcements.Add(a);
        await db.SaveChangesAsync();

        var recipients = await db.Enrollments.AsNoTracking().Where(e => e.CourseId == courseId && e.UserId != uid)
            .Select(e => e.UserId).Distinct().ToListAsync();
        var n = await notify.Publish(recipients, NotificationKinds.Announcement, $"{c.Title}: {title}", $"/courses/{c.Slug}/announcements");
        audit.Record(CreatedAction, "Course", courseId, new CreatedDetails(a.Id, title, key, n));
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return new AnnouncementCreatedDto(await ToDto(a), n);
    }

    private async Task<AnnouncementDto> ToDto(Announcement a)
    {
        var name = await db.Users.AsNoTracking().Where(u => u.Id == a.AuthorId).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "";
        return new AnnouncementDto(a.Id, a.CourseId, a.AuthorId, name, a.Title, a.Body, a.CreatedAt);
    }

    public async Task<EngagementPage<AnnouncementDto>> List(Guid courseId, int page, int pageSize)
    {
        (page, pageSize) = TextRules.Paging(page, pageSize);
        var uid = me.RequireId();
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        var author = await access.IsCourseAuthor(courseId);
        if (!author && !me.IsStaff)
        {
            if (!AccessService.IsLive(c)) throw AppException.NotFound("Course");
            if (!await db.Enrollments.AnyAsync(e => e.UserId == uid && e.CourseId == courseId))
                throw AppException.Forbidden("Enroll in this course to see its announcements.");
        }
        var q = db.Announcements.AsNoTracking().Where(a => a.CourseId == courseId);
        var total = await q.CountAsync();
        var items = await (from a in q
                           join u in db.Users on a.AuthorId equals u.Id
                           orderby a.CreatedAt descending
                           select new AnnouncementDto(a.Id, a.CourseId, a.AuthorId, u.DisplayName, a.Title, a.Body, a.CreatedAt))
            .Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return new EngagementPage<AnnouncementDto>(items, total, page, pageSize);
    }
}

public enum IssueCategory { VideoUnavailable, ContentError, QuestionError, Other }

/// <summary>Learner issue reports, stored as audit entries ("issue.reported" on the Course) and pushed to course authors.</summary>
public class IssueReportService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit, INotificationService notify)
{
    public const string Action = "issue.reported";
    public const int BodyMax = 2000, MaxPerUserPerDay = 10;

    private record Details(Guid? LessonId, string Category, string Body);

    public async Task<IssueDto> Report(Guid courseId, IssueInput input)
    {
        var uid = me.RequireId();
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        if (!AccessService.IsLive(c)) throw AppException.NotFound("Course");
        if (!Enum.TryParse<IssueCategory>(input.Category, true, out var cat) || !Enum.IsDefined(cat) || int.TryParse(input.Category, out _))
            throw AppException.Bad("category must be one of VideoUnavailable, ContentError, QuestionError, Other.");
        if (input.LessonId is { } lid && !await db.Lessons.AnyAsync(l => l.Id == lid && db.Modules.Any(m => m.Id == l.ModuleId && m.CourseId == courseId)))
            throw AppException.Bad("Lesson does not belong to this course.");
        var body = TextRules.PlainText(input.Body, "Body", 5, BodyMax);
        var cid = courseId.ToString();
        var since = DateTime.UtcNow.AddHours(-24);
        await using var tx = await db.Database.BeginTransactionAsync();
        await AnnouncementService.LockCourse(db, courseId);
        if (await db.AuditLogs.CountAsync(a => a.Action == Action && a.EntityType == "Course" && a.EntityId == cid && a.ActorId == uid && a.CreatedAt > since) >= MaxPerUserPerDay)
            throw new AppException(429, "Too many issue reports for this course today.", "issue_rate_limited");

        var row = new AuditLog
        {
            ActorId = uid, Action = Action, EntityType = "Course", EntityId = cid,
            Details = JsonSerializer.Serialize(new Details(input.LessonId, cat.ToString(), body)),
        };
        db.AuditLogs.Add(row);
        await db.SaveChangesAsync();

        var authors = await db.CourseInstructors.AsNoTracking().Where(i => i.CourseId == courseId).Select(i => i.UserId).ToListAsync();
        await notify.Publish(authors, NotificationKinds.IssueReported, $"Issue reported on {c.Title}: {cat}", $"/studio/courses/{courseId}/issues");
        await tx.CommitAsync();
        var name = await db.Users.AsNoTracking().Where(u => u.Id == uid).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "";
        return new IssueDto(row.Id, courseId, input.LessonId, cat.ToString(), body, uid, name, row.CreatedAt);
    }

    public async Task<EngagementPage<IssueDto>> List(Guid courseId, int page, int pageSize)
    {
        (page, pageSize) = TextRules.Paging(page, pageSize);
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        var cid = courseId.ToString();
        var q = db.AuditLogs.AsNoTracking().Where(a => a.Action == Action && a.EntityType == "Course" && a.EntityId == cid);
        var total = await q.CountAsync();
        var rows = await q.OrderByDescending(a => a.Id).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        var actorIds = rows.Where(r => r.ActorId != null).Select(r => r.ActorId!.Value).Distinct().ToList();
        var names = await db.Users.AsNoTracking().Where(u => actorIds.Contains(u.Id)).ToDictionaryAsync(u => u.Id, u => u.DisplayName);
        var items = rows.Select(r =>
        {
            var d = r.Details is null ? null : JsonSerializer.Deserialize<Details>(r.Details);
            return new IssueDto(r.Id, courseId, d?.LessonId, d?.Category ?? "Other", d?.Body ?? "", r.ActorId,
                r.ActorId is { } a ? names.GetValueOrDefault(a, "") : "", r.CreatedAt);
        }).ToList();
        return new EngagementPage<IssueDto>(items, total, page, pageSize);
    }
}
