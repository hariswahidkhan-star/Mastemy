using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Learning;

public record NoteInput(Guid LessonId, int? TimestampSeconds, string Body, List<string>? Tags);
public record NoteUpdateInput(int? TimestampSeconds, string Body, List<string>? Tags);
public record NoteDto(Guid Id, Guid? LessonId, string LessonTitle, Guid CourseId, string CourseTitle, int? TimestampSeconds,
    string Body, List<string> Tags, DateTime CreatedAt, DateTime UpdatedAt);

public record ReviewInput(int Rating, string Body);
public record ReplyInput(string Reply);
public record ReviewDto(Guid Id, Guid CourseId, Guid UserId, string AuthorName, int Rating, string Body, bool VerifiedPurchase,
    string? InstructorReply, DateTime CreatedAt, DateTime UpdatedAt);
public record ReviewPage(List<ReviewDto> Items, int Total, int Page, int PageSize, double? RatingAverage);

/// <summary>Private learner notes: strictly owner-scoped. Any other user (instructors and staff included) gets 404.</summary>
public class NotesService(AppDbContext db, ICurrentUser me)
{
    public const int MaxBody = 20000, MaxTags = 20, MaxTagLength = 40;

    public static string NormalizeTags(IEnumerable<string>? tags)
    {
        var list = (tags ?? []).Select(t => (t ?? "").Trim().ToLowerInvariant().Replace(",", " ")).Where(t => t.Length > 0)
            .Distinct().ToList();
        if (list.Count > MaxTags) throw AppException.Bad($"At most {MaxTags} tags allowed.");
        if (list.Any(t => t.Length > MaxTagLength)) throw AppException.Bad($"Tags must be at most {MaxTagLength} characters.");
        var joined = string.Join(",", list);
        if (joined.Length > 500) throw AppException.Bad("Too many tag characters.");
        return joined;
    }

    private static List<string> SplitTags(string t) => t.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList();

    private static void Validate(string body, int? ts)
    {
        if (string.IsNullOrWhiteSpace(body)) throw AppException.Bad("Note body is required.");
        if (body.Length > MaxBody) throw AppException.Bad($"Note body must be at most {MaxBody} characters.");
        if (ts is < 0 or > 86400) throw AppException.Bad("Timestamp must be between 0 and 86400 seconds.");
    }

    private async Task<List<NoteDto>> Load(Guid uid, Guid? lessonId, string? q, string? tag, Guid? id = null)
    {
        var notes = db.LearnerNotes.AsNoTracking().Where(n => n.UserId == uid);
        if (id is not null) notes = notes.Where(n => n.Id == id);
        if (lessonId is not null) notes = notes.Where(n => n.LessonId == lessonId);
        if (!string.IsNullOrWhiteSpace(q)) { var qq = q.Trim(); notes = notes.Where(n => n.Body.Contains(qq) || n.Tags.Contains(qq.ToLower())); }
        if (!string.IsNullOrWhiteSpace(tag)) { var t = "," + tag.Trim().ToLowerInvariant() + ","; notes = notes.Where(n => ("," + n.Tags + ",").Contains(t)); }
        // Left joins: notes whose lesson was removed in a course revision remain visible via their title snapshots.
        var rows = await (from n in notes
                          join l0 in db.Lessons.AsNoTracking() on n.LessonId equals (Guid?)l0.Id into lj
                          from l in lj.DefaultIfEmpty()
                          join m0 in db.Modules.AsNoTracking() on l.ModuleId equals m0.Id into mj
                          from m in mj.DefaultIfEmpty()
                          orderby n.CourseTitleSnapshot, m.SortOrder, l.SortOrder, n.TimestampSeconds, n.CreatedAt
                          select new { n, LessonTitle = l != null ? l.Title : n.LessonTitleSnapshot }).Take(2000).ToListAsync();
        return rows.Select(x => new NoteDto(x.n.Id, x.n.LessonId, x.LessonTitle, x.n.CourseId, x.n.CourseTitleSnapshot, x.n.TimestampSeconds, x.n.Body,
            SplitTags(x.n.Tags), x.n.CreatedAt, x.n.UpdatedAt)).ToList();
    }

    public Task<List<NoteDto>> List(Guid? lessonId, string? q, string? tag) => Load(me.RequireId(), lessonId, q, tag);

    public async Task<NoteDto> Create(NoteInput input)
    {
        var uid = me.RequireId();
        Validate(input.Body, input.TimestampSeconds);
        var live = await (from l in db.Lessons
                          join m in db.Modules on l.ModuleId equals m.Id
                          join c in db.Courses on m.CourseId equals c.Id
                          where l.Id == input.LessonId
                          select new { c.Status, c.PublishedAt, CourseId = c.Id, CourseTitle = c.Title, LessonTitle = l.Title }).ToListAsync();
        if (live.Count == 0 || !AccessService.IsLive(live[0].Status, live[0].PublishedAt)) throw AppException.NotFound("Lesson");
        var n = new LearnerNote { UserId = uid, LessonId = input.LessonId, CourseId = live[0].CourseId,
            CourseTitleSnapshot = live[0].CourseTitle, LessonTitleSnapshot = live[0].LessonTitle, TimestampSeconds = input.TimestampSeconds, Body = input.Body, Tags = NormalizeTags(input.Tags) };
        db.LearnerNotes.Add(n);
        await db.SaveChangesAsync();
        return (await Load(uid, null, null, null, n.Id)).Single();
    }

    public async Task<NoteDto> Update(Guid id, NoteUpdateInput input)
    {
        var uid = me.RequireId();
        var n = await db.LearnerNotes.FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid) ?? throw AppException.NotFound("Note");
        Validate(input.Body, input.TimestampSeconds);
        n.Body = input.Body; n.TimestampSeconds = input.TimestampSeconds; n.Tags = NormalizeTags(input.Tags); n.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return (await Load(uid, null, null, null, n.Id)).Single();
    }

    public async Task Delete(Guid id)
    {
        var uid = me.RequireId();
        var n = await db.LearnerNotes.FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid) ?? throw AppException.NotFound("Note");
        db.LearnerNotes.Remove(n);
        await db.SaveChangesAsync();
    }

    public async Task<string> ExportMarkdown()
    {
        var notes = await Load(me.RequireId(), null, null, null);
        var sb = new StringBuilder("# My Mastemy notes\n\n");
        foreach (var course in notes.GroupBy(n => (n.CourseId, n.CourseTitle)))
        {
            sb.Append("## ").Append(OneLine(course.Key.CourseTitle)).Append("\n\n");
            foreach (var lesson in course.GroupBy(n => (n.LessonId, n.LessonTitle)))
            {
                sb.Append("### ").Append(OneLine(lesson.Key.LessonTitle)).Append("\n\n");
                foreach (var n in lesson)
                {
                    if (n.TimestampSeconds is { } t) sb.Append($"**[{t / 3600:00}:{t / 60 % 60:00}:{t % 60:00}]** ");
                    if (n.Tags.Count > 0) sb.Append('_').Append(string.Join(", ", n.Tags.Select(x => "#" + x))).Append('_');
                    sb.Append("\n\n").Append(n.Body.Trim()).Append("\n\n---\n\n");
                }
            }
        }
        return sb.ToString();
    }

    private static string OneLine(string s) => s.Replace('\r', ' ').Replace('\n', ' ');
}

public class ReviewsService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit)
{
    public const int MaxBody = 4000;

    private async Task<ReviewDto> ToDto(CourseReview r)
    {
        var name = await db.Users.Where(u => u.Id == r.UserId).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "";
        return new ReviewDto(r.Id, r.CourseId, r.UserId, name, r.Rating, r.Body, r.VerifiedPurchase, r.InstructorReply, r.CreatedAt, r.UpdatedAt);
    }

    public async Task<ReviewDto> Upsert(Guid courseId, ReviewInput input)
    {
        var uid = me.RequireId();
        var course = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == courseId);
        if (course is null || !AccessService.IsLive(course)) throw AppException.NotFound("Course");
        if (input.Rating is < 1 or > 5) throw AppException.Bad("Rating must be between 1 and 5.");
        var body = (input.Body ?? "").Trim();
        if (body.Length > MaxBody) throw AppException.Bad($"Review must be at most {MaxBody} characters.");
        if (!await db.Enrollments.AnyAsync(e => e.UserId == uid && e.CourseId == courseId))
            throw AppException.Forbidden("You must be enrolled in the course to review it.");
        var verified = await db.Entitlements.AnyAsync(e => e.UserId == uid && e.CourseId == courseId
                                                           && e.Source == EntitlementSource.Purchase && e.RevokedAt == null);
        var r = await db.CourseReviews.FirstOrDefaultAsync(x => x.CourseId == courseId && x.UserId == uid);
        if (r is null) { r = new CourseReview { CourseId = courseId, UserId = uid }; db.CourseReviews.Add(r); }
        r.Rating = input.Rating; r.Body = body; r.VerifiedPurchase = verified; r.UpdatedAt = DateTime.UtcNow;
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { throw AppException.Conflict("Your review was submitted concurrently. Please retry.", "review_conflict"); }
        return await ToDto(r);
    }

    public async Task<ReviewPage> List(Guid courseId, int page, int pageSize)
    {
        page = Math.Max(1, page); pageSize = Math.Clamp(pageSize, 1, 100);
        var q = db.CourseReviews.AsNoTracking().Where(r => r.CourseId == courseId && !r.Hidden);
        var total = await q.CountAsync();
        double? avg = total == 0 ? null : Math.Round(await q.AverageAsync(r => (double)r.Rating), 2);
        var rows = await (from r in q
                          join u in db.Users.AsNoTracking() on r.UserId equals u.Id
                          orderby r.UpdatedAt descending
                          select new ReviewDto(r.Id, r.CourseId, r.UserId, u.DisplayName, r.Rating, r.Body, r.VerifiedPurchase, r.InstructorReply, r.CreatedAt, r.UpdatedAt))
            .Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return new ReviewPage(rows, total, page, pageSize, avg);
    }

    public async Task<ReviewDto> Reply(Guid reviewId, ReplyInput input)
    {
        me.RequireId();
        var r = await db.CourseReviews.FirstOrDefaultAsync(x => x.Id == reviewId) ?? throw AppException.NotFound("Review");
        if (!await access.IsCourseAuthor(r.CourseId)) throw AppException.Forbidden("Only the course's instructors may reply.");
        var reply = (input.Reply ?? "").Trim();
        if (reply.Length is 0 or > MaxBody) throw AppException.Bad($"Reply must be 1-{MaxBody} characters.");
        r.InstructorReply = reply; r.UpdatedAt = DateTime.UtcNow;
        audit.Record("review.replied", nameof(CourseReview), r.Id);
        await db.SaveChangesAsync();
        return await ToDto(r);
    }
}
