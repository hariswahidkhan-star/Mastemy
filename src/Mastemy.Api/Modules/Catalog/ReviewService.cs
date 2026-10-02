using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Catalog;

/// <summary>Course review decisions, review comments, and staff publish/archive.</summary>
public class ReviewService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit,
    CourseSnapshotService snapshots)
{
    public async Task<List<ReviewQueueItemDto>> Queue(CourseStatus? status)
    {
        var uid = me.RequireId();
        var s = status ?? CourseStatus.InReview;
        var courses = await db.Courses.AsNoTracking().Where(c => c.Status == s).OrderBy(c => c.UpdatedAt).Take(500).ToListAsync();
        var ids = courses.Select(c => c.Id).ToList();
        var instr = await (from ci in db.CourseInstructors.AsNoTracking()
                           join u in db.Users on ci.UserId equals u.Id
                           where ids.Contains(ci.CourseId)
                           select new { ci.CourseId, ci.UserId, u.DisplayName }).ToListAsync();
        return courses.Select(c => new ReviewQueueItemDto(c.Id, c.Code, c.Slug, c.Title, c.Status,
            instr.Where(i => i.CourseId == c.Id).Select(i => i.DisplayName).ToArray(),
            instr.Any(i => i.CourseId == c.Id && i.UserId == uid), c.UpdatedAt)).ToList();
    }

    public async Task<CourseStatusDto> Decide(Guid courseId, ReviewDecisionRequest req)
    {
        var uid = me.RequireId();
        var c = await db.Courses.FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        if (await access.IsCourseAuthor(courseId, uid))
            throw AppException.Forbidden("You cannot review a course you are an instructor of.");
        var action = (req.Decision ?? "").Trim().ToLowerInvariant() switch
        {
            "approve" => CourseAction.Approve,
            "requestchanges" => CourseAction.RequestChanges,
            _ => throw AppException.Bad("decision must be Approve or RequestChanges."),
        };
        var notes = (req.Notes ?? "").Trim();
        if (action == CourseAction.RequestChanges && notes.Length == 0) throw AppException.Bad("notes are required when requesting changes.");
        if (notes.Length > 20_000) throw AppException.Bad("notes are too long.");
        var from = c.Status;
        CourseStateMachine.Apply(c, action, DateTime.UtcNow);
        if (notes.Length > 0)
            db.ReviewComments.Add(new CourseReviewComment { CourseId = c.Id, AuthorId = uid, Body = notes });
        audit.Record(action == CourseAction.Approve ? "course.approved" : "course.changes_requested", nameof(Course), c.Id,
            new { from = from.ToString(), to = c.Status.ToString(), notes });
        await db.SaveChangesAsync();
        return new CourseStatusDto(c.Id, c.Status, c.ReviewedAt, c.PublishedAt);
    }

    public async Task<ReviewCommentDto> AddComment(Guid courseId, ReviewCommentRequest req)
    {
        var uid = me.RequireId();
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        var body = (req.Body ?? "").Trim();
        if (body.Length == 0) throw AppException.Bad("body is required.");
        if (body.Length > 20_000) throw AppException.Bad("body is too long.");
        if (req.VideoTimestampSeconds is < 0) throw AppException.Bad("videoTimestampSeconds must be non-negative.");
        if (req.VideoTimestampSeconds is not null && req.LessonId is null) throw AppException.Bad("videoTimestampSeconds requires lessonId.");
        if (req.LessonId is not null && !await (from l in db.Lessons join m in db.Modules on l.ModuleId equals m.Id
                                                where l.Id == req.LessonId && m.CourseId == courseId select l.Id).AnyAsync())
            throw AppException.Bad("lessonId does not belong to this course.");
        if (req.QuestionId is not null && !await db.Questions.AnyAsync(q => q.Id == req.QuestionId && q.CourseId == courseId))
            throw AppException.Bad("questionId does not belong to this course.");
        var comment = new CourseReviewComment
        {
            CourseId = courseId, LessonId = req.LessonId, QuestionId = req.QuestionId,
            VideoTimestampSeconds = req.VideoTimestampSeconds, AuthorId = uid, Body = body,
        };
        db.ReviewComments.Add(comment);
        audit.Record("course.review_comment.added", nameof(Course), courseId, new { commentId = comment.Id });
        await db.SaveChangesAsync();
        var name = await db.Users.Where(u => u.Id == uid).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "";
        return new ReviewCommentDto(comment.Id, comment.LessonId, comment.QuestionId, comment.VideoTimestampSeconds, uid, name, body, comment.CreatedAt);
    }

    public async Task<List<ReviewCommentDto>> Comments(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        return await (from r in db.ReviewComments.AsNoTracking()
                      join u in db.Users on r.AuthorId equals u.Id into uj
                      from u in uj.DefaultIfEmpty()
                      where r.CourseId == courseId
                      orderby r.CreatedAt
                      select new ReviewCommentDto(r.Id, r.LessonId, r.QuestionId, r.VideoTimestampSeconds, r.AuthorId,
                          u == null ? "" : u.DisplayName, r.Body, r.CreatedAt)).ToListAsync();
    }

    /// <summary>Course content change log since the last publish (all changes for a never-published course).</summary>
    public async Task<CourseChangesDto> Changes(Guid courseId)
    {
        me.RequireId();
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        var key = courseId.ToString();
        var lastPublishId = await db.AuditLogs.AsNoTracking()
            .Where(a => a.EntityType == nameof(Course) && a.EntityId == key && a.Action == "course.published")
            .OrderByDescending(a => a.Id).Select(a => (long?)a.Id).FirstOrDefaultAsync();
        var since = lastPublishId is null ? (DateTime?)null
            : await db.AuditLogs.AsNoTracking().Where(a => a.Id == lastPublishId).Select(a => (DateTime?)a.CreatedAt).FirstAsync();
        var floor = lastPublishId ?? 0;
        var rows = await (from a in db.AuditLogs.AsNoTracking()
                          join u in db.Users on a.ActorId equals u.Id into uj
                          from u in uj.DefaultIfEmpty()
                          where a.EntityType == nameof(Course) && a.EntityId == key && a.Id > floor
                                && a.Action == StudioService.ContentChangedAction
                          orderby a.Id
                          select new { a.Id, a.ActorId, Name = u == null ? null : u.DisplayName, a.Details, a.CreatedAt })
            .Take(5000).ToListAsync();
        var items = rows.Select(r =>
        {
            System.Text.Json.JsonElement details = default;
            if (r.Details is not null)
                try { details = System.Text.Json.JsonDocument.Parse(r.Details).RootElement.Clone(); } catch (System.Text.Json.JsonException) { }
            string? Str(string p) => details.ValueKind == System.Text.Json.JsonValueKind.Object && details.TryGetProperty(p, out var v)
                && v.ValueKind == System.Text.Json.JsonValueKind.String ? v.GetString() : null;
            var fields = details.ValueKind == System.Text.Json.JsonValueKind.Object && details.TryGetProperty("changedFields", out var f)
                && f.ValueKind == System.Text.Json.JsonValueKind.Array
                ? f.EnumerateArray().Where(x => x.ValueKind == System.Text.Json.JsonValueKind.String).Select(x => x.GetString()!).ToArray()
                : [];
            return new CourseChangeDto(r.Id, Str("op") ?? "", Str("entity") ?? "", Str("entityId"), fields, r.ActorId, r.Name,
                r.CreatedAt, r.Details);
        }).ToList();
        return new CourseChangesDto(c.Id, c.Status, c.PublishedAt, since, items);
    }

    public async Task<CourseStatusDto> Publish(Guid courseId)
    {
        var uid = me.RequireId();
        var c = await db.Courses.FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        var from = c.Status;
        CourseStateMachine.Next(from, CourseAction.Publish);
        var v = await CourseValidator.Validate(db, courseId);
        if (!v.Ok) throw AppException.Conflict("Course can no longer be published: " + string.Join(" ", v.Issues), "validation_failed");
        var now = DateTime.UtcNow;
        CourseStateMachine.Apply(c, CourseAction.Publish, now);
        // Freeze the reviewed content: learners are served this snapshot until the next publish.
        var snap = await snapshots.AddSnapshot(c, uid, now);
        audit.Record("course.published", nameof(Course), c.Id, new { from = from.ToString(), to = c.Status.ToString(), version = snap.Version });
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException)
        {
            throw AppException.Conflict("The course was published concurrently; reload and try again.", "concurrent_publish");
        }
        return new CourseStatusDto(c.Id, c.Status, c.ReviewedAt, c.PublishedAt);
    }

    public async Task<CourseStatusDto> Archive(Guid courseId)
    {
        me.RequireId();
        var c = await db.Courses.FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        var from = c.Status;
        CourseStateMachine.Apply(c, CourseAction.Archive, DateTime.UtcNow);
        audit.Record("course.archived", nameof(Course), c.Id, new { from = from.ToString(), to = c.Status.ToString() });
        await db.SaveChangesAsync();
        return new CourseStatusDto(c.Id, c.Status, c.ReviewedAt, c.PublishedAt);
    }
}
