using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Engagement;

/// <summary>Course/lesson Q&A (spec §9, §16). Posting requires enrollment or authorship; hidden content is visible only
/// to moderators; authors may edit their own posts for 24h; course authors resolve; moderators hide (audited).</summary>
public class DiscussionService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit, INotificationService notify)
{
    public const int TitleMax = 200, BodyMax = 5000;
    public static readonly TimeSpan EditWindow = TimeSpan.FromHours(24);
    public static readonly TimeSpan ReplyNotificationWindow = TimeSpan.FromMinutes(10);

    private bool IsModerator => me.IsStaff || me.IsInRole(Roles.Moderator);

    private async Task<Course> LiveCourse(Guid courseId)
    {
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId) ?? throw AppException.NotFound("Course");
        if (!AccessService.IsLive(c)) throw AppException.NotFound("Course");
        return c;
    }

    private async Task RequireParticipant(Guid courseId)
    {
        var uid = me.RequireId();
        if (await access.IsCourseAuthor(courseId)) return;
        if (!await db.Enrollments.AnyAsync(e => e.UserId == uid && e.CourseId == courseId))
            throw AppException.Forbidden("Enroll in this course to take part in its discussions.");
    }

    private async Task<DiscussionThread> VisibleThread(Guid id, bool track = false)
    {
        var q = track ? db.DiscussionThreads : db.DiscussionThreads.AsNoTracking();
        var t = await q.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Discussion");
        if (t.Hidden && !IsModerator) throw AppException.NotFound("Discussion");
        await LiveCourse(t.CourseId);
        return t;
    }

    public async Task<EngagementPage<ThreadSummaryDto>> List(Guid courseId, Guid? lessonId, string? q, bool? resolved, int page, int pageSize)
    {
        (page, pageSize) = TextRules.Paging(page, pageSize);
        await LiveCourse(courseId);
        var query = db.DiscussionThreads.AsNoTracking().Where(t => t.CourseId == courseId);
        if (!IsModerator) query = query.Where(t => !t.Hidden);
        if (lessonId is not null) query = query.Where(t => t.LessonId == lessonId);
        if (resolved is not null) query = query.Where(t => t.Resolved == resolved);
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            if (term.Length > 100) throw AppException.Bad("q must be at most 100 characters.");
            query = query.Where(t => t.Title.Contains(term) || t.Body.Contains(term));
        }
        var total = await query.CountAsync();
        var rows = await query.OrderByDescending(t => t.UpdatedAt).ThenBy(t => t.Id).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return new EngagementPage<ThreadSummaryDto>(await Summaries(rows), total, page, pageSize);
    }

    private async Task<List<ThreadSummaryDto>> Summaries(List<DiscussionThread> rows)
    {
        var ids = rows.Select(r => r.Id).ToList();
        var mod = IsModerator;
        var counts = await db.DiscussionReplies.AsNoTracking().Where(r => ids.Contains(r.ThreadId) && (mod || !r.Hidden))
            .GroupBy(r => r.ThreadId).Select(g => new { g.Key, Count = g.Count() }).ToDictionaryAsync(x => x.Key, x => x.Count);
        var names = await Names(rows.Select(r => r.AuthorId));
        return rows.Select(t => new ThreadSummaryDto(t.Id, t.CourseId, t.LessonId, t.AuthorId, names.GetValueOrDefault(t.AuthorId, ""),
            t.Title, t.Body, t.Resolved, t.Hidden, counts.GetValueOrDefault(t.Id), t.CreatedAt, t.UpdatedAt)).ToList();
    }

    private async Task<Dictionary<Guid, string>> Names(IEnumerable<Guid> ids)
    {
        var list = ids.Distinct().ToList();
        return await db.Users.AsNoTracking().Where(u => list.Contains(u.Id)).ToDictionaryAsync(u => u.Id, u => u.DisplayName);
    }

    public async Task<ThreadDetailDto> Get(Guid id)
    {
        var own = await db.DiscussionThreads.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        if (own is { Hidden: true } && !IsModerator && me.Id is { } uid && uid == own.AuthorId)
        {
            // The author learns why their post was hidden and how to appeal; nobody else can tell it exists.
            var note = await db.Set<ModerationNote>().AsNoTracking()
                .FirstOrDefaultAsync(n => n.TargetType == ModerationNote.Thread && n.TargetId == id);
            var notice = new ModerationNoticeDto(true, note?.Reason ?? "This post was hidden by a moderator.", note?.HiddenAt,
                ModerationNote.Thread, id, "/api/appeals", "/account/appeals");
            return new ThreadDetailDto((await Summaries([own])).Single(), [], notice);
        }
        var t = await VisibleThread(id);
        var mod = IsModerator;
        var replies = await db.DiscussionReplies.AsNoTracking().Where(r => r.ThreadId == id && (mod || !r.Hidden))
            .OrderBy(r => r.CreatedAt).ThenBy(r => r.Id).ToListAsync();
        var names = await Names(replies.Select(r => r.AuthorId));
        return new ThreadDetailDto((await Summaries([t])).Single(),
            replies.Select(r => new ReplyDto(r.Id, r.ThreadId, r.AuthorId, names.GetValueOrDefault(r.AuthorId, ""), r.Body,
                r.IsInstructorReply, r.Hidden, r.CreatedAt)).ToList());
    }

    public async Task<ThreadDetailDto> Create(Guid courseId, ThreadInput input)
    {
        var uid = me.RequireId();
        await LiveCourse(courseId);
        await RequireParticipant(courseId);
        if (input.LessonId is { } lid && !await db.Lessons.AnyAsync(l => l.Id == lid && db.Modules.Any(m => m.Id == l.ModuleId && m.CourseId == courseId)))
            throw AppException.Bad("Lesson does not belong to this course.");
        var t = new DiscussionThread
        {
            CourseId = courseId, LessonId = input.LessonId, AuthorId = uid,
            Title = TextRules.PlainText(input.Title, "Title", 3, TitleMax),
            Body = TextRules.PlainText(input.Body, "Body", 1, BodyMax),
        };
        db.DiscussionThreads.Add(t);
        await db.SaveChangesAsync();
        return await Get(t.Id);
    }

    public async Task<ReplyDto> Reply(Guid threadId, ReplyInput input)
    {
        var uid = me.RequireId();
        var t = await VisibleThread(threadId, track: true);
        await RequireParticipant(t.CourseId);
        var reply = new DiscussionReply
        {
            ThreadId = t.Id, AuthorId = uid, Body = TextRules.PlainText(input.Body, "Body", 1, BodyMax),
            IsInstructorReply = await access.IsCourseAuthor(t.CourseId),
        };
        await using var tx = await db.Database.BeginTransactionAsync();
        // Thread row lock serializes concurrent replies so the notification throttle below is race-free.
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT `Id` FROM `DiscussionThreads` WHERE `Id` = {t.Id.ToString()} FOR UPDATE");
        db.DiscussionReplies.Add(reply);
        t.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        if (t.AuthorId != uid)
        {
            var link = $"/courses/{t.CourseId}/discussions/{t.Id}";
            var since = DateTime.UtcNow - ReplyNotificationWindow;
            // Coalesce: at most one "reply" notification per (thread author, thread) per window.
            if (!await db.Notifications.AnyAsync(n => n.UserId == t.AuthorId && n.Kind == NotificationKinds.Reply && n.Link == link && n.CreatedAt > since))
                await notify.Publish([t.AuthorId], NotificationKinds.Reply,
                    (reply.IsInstructorReply ? "The instructor replied to: " : "New reply to: ") + t.Title, link);
        }
        await tx.CommitAsync();
        var names = await Names([uid]);
        return new ReplyDto(reply.Id, reply.ThreadId, uid, names.GetValueOrDefault(uid, ""), reply.Body, reply.IsInstructorReply, false, reply.CreatedAt);
    }

    public async Task<ThreadDetailDto> EditThread(Guid id, ThreadEditInput input)
    {
        var uid = me.RequireId();
        var t = await VisibleThread(id, track: true);
        if (t.AuthorId != uid) throw AppException.Forbidden("You can only edit your own posts.");
        if (t.Hidden) throw AppException.Forbidden("Hidden posts cannot be edited.");
        if (DateTime.UtcNow - t.CreatedAt > EditWindow) throw AppException.Forbidden("Posts can only be edited within 24 hours.");
        t.Title = TextRules.PlainText(input.Title, "Title", 3, TitleMax);
        t.Body = TextRules.PlainText(input.Body, "Body", 1, BodyMax);
        t.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return await Get(id);
    }

    public async Task<ReplyDto> EditReply(Guid id, ReplyInput input)
    {
        var uid = me.RequireId();
        var r = await db.DiscussionReplies.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Reply");
        if (r.Hidden && !IsModerator) throw AppException.NotFound("Reply");
        await VisibleThread(r.ThreadId);
        if (r.AuthorId != uid) throw AppException.Forbidden("You can only edit your own posts.");
        if (r.Hidden) throw AppException.Forbidden("Hidden posts cannot be edited.");
        if (DateTime.UtcNow - r.CreatedAt > EditWindow) throw AppException.Forbidden("Posts can only be edited within 24 hours.");
        r.Body = TextRules.PlainText(input.Body, "Body", 1, BodyMax);
        await db.SaveChangesAsync();
        var names = await Names([uid]);
        return new ReplyDto(r.Id, r.ThreadId, r.AuthorId, names.GetValueOrDefault(uid, ""), r.Body, r.IsInstructorReply, r.Hidden, r.CreatedAt);
    }

    public async Task<ThreadDetailDto> SetResolved(Guid id, bool resolved)
    {
        me.RequireId();
        var t = await VisibleThread(id, track: true);
        if (!await access.IsCourseAuthor(t.CourseId)) throw AppException.Forbidden("Only this course's instructors can resolve questions.");
        if (t.Resolved != resolved)
        {
            t.Resolved = resolved;
            audit.Record(resolved ? "discussion.resolved" : "discussion.unresolved", "DiscussionThread", t.Id);
            await db.SaveChangesAsync();
        }
        return await Get(id);
    }

    public async Task HideThread(Guid id, HideInput input)
    {
        me.RequireId();
        if (!IsModerator) throw AppException.Forbidden("Moderator role required.");
        var t = await db.DiscussionThreads.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Discussion");
        var reason = (input.Reason ?? "").Trim();
        if (input.Hidden && reason.Length is 0 or > 500) throw AppException.Bad("A reason (1-500 characters) is required to hide content.");
        if (t.Hidden == input.Hidden) return;
        t.Hidden = input.Hidden;
        if (input.Hidden) await ModerationNotes.Set(db, ModerationNote.Thread, t.Id, reason);
        else await ModerationNotes.Clear(db, ModerationNote.Thread, t.Id);
        audit.Record(input.Hidden ? "discussion.hidden" : "discussion.unhidden", "DiscussionThread", t.Id, new { reason, t.CourseId });
        await db.SaveChangesAsync();
    }

    public async Task HideReply(Guid id, HideInput input)
    {
        me.RequireId();
        if (!IsModerator) throw AppException.Forbidden("Moderator role required.");
        var r = await db.DiscussionReplies.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Reply");
        var reason = (input.Reason ?? "").Trim();
        if (input.Hidden && reason.Length is 0 or > 500) throw AppException.Bad("A reason (1-500 characters) is required to hide content.");
        if (r.Hidden == input.Hidden) return;
        r.Hidden = input.Hidden;
        if (input.Hidden) await ModerationNotes.Set(db, ModerationNote.Reply, r.Id, reason);
        else await ModerationNotes.Clear(db, ModerationNote.Reply, r.Id);
        audit.Record(input.Hidden ? "discussion_reply.hidden" : "discussion_reply.unhidden", "DiscussionReply", r.Id, new { reason, r.ThreadId });
        await db.SaveChangesAsync();
    }
}
