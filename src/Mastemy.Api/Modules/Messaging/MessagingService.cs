using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Engagement;
using Mastemy.Api.Modules.Trust;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Messaging;

public record SendMessageInput(string? Body);
public record MessageDto(Guid Id, Guid ConversationId, Guid SenderId, string SenderName, string SenderRole, string Kind, string? Body,
    bool Hidden, string? HiddenReason, DateTime CreatedAt);
public record ConversationDto(Guid Id, Guid CourseId, string CourseTitle, Guid LearnerId, string LearnerName, string MyRole,
    DateTime LastMessageAt, int Unread);
public record ConversationPageDto(ConversationDto Conversation, List<MessageDto> Messages, bool HasMore);
public record SentMessageDto(ConversationDto Conversation, MessageDto Message);
public record BlockInput(Guid UserId);
public record BlockDto(Guid UserId, string DisplayName, DateTime CreatedAt);
public record ReportMessageInput(string? Reason);
public record MessageReportDto(Guid Id, Guid MessageId, Guid ComplaintId, DateTime CreatedAt);
public record ModerationReportDto(Guid ReportId, Guid MessageId, Guid ConversationId, Guid CourseId, Guid SenderId, string SenderName,
    Guid ReporterId, string Reason, string Body, bool Hidden, Guid ComplaintId, DateTime CreatedAt);
public record HideMessageInput(string? Reason);
public record AutoMessageInput(string? Body, bool Enabled);
public record AutoMessageDto(string Kind, string Body, bool Enabled, DateTime? EnabledSince, DateTime? UpdatedAt);

public class MessagingOptions
{
    public int MaxPerHour { get; set; } = 30;
    public int MaxPerDay { get; set; } = 200;
    public int MaxBodyLength { get; set; } = 2000;
}

public static class MessagingRules
{
    /// <summary>
    /// Trust has no dedicated complaint target for private messages; message reports are filed with this sentinel
    /// target value (stored as "100") so Trust's queue shows them without colliding with content targets. The
    /// message itself is moderated through the messaging moderation endpoints.
    /// </summary>
    public const ComplaintTarget MessageComplaintTarget = ComplaintTarget.Message;
    public const int MaxAutoBodyLength = 5000;
}

/// <summary>
/// Controlled learner messaging (spec §9, §16): a learner may message the instructors of a course they are enrolled
/// in; instructors may reply and may message their enrolled learners. There is no learner↔learner messaging. Plain text
/// only, bounded length, per-sender rate limits, blocks, reports (filed as Trust complaints) and moderator hide.
/// </summary>
public class MessagingService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit, INotificationService notifications,
    MessagingOptions opt)
{
    private bool IsModerator => me.IsStaff || me.IsInRole(Roles.Moderator);

    // ---------- sending ----------

    /// <summary>Learner → the course's instructor team (creates the thread on first use).</summary>
    public async Task<SentMessageDto> LearnerSend(Guid courseId, SendMessageInput input)
    {
        var uid = me.RequireId();
        var body = Body(input.Body);
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        if (!await db.Enrollments.AnyAsync(e => e.CourseId == courseId && e.UserId == uid))
            throw AppException.Forbidden("Enroll in this course to message its instructors.");
        await RateLimit(uid);
        var recipients = await InstructorRecipients(courseId, uid);
        if (recipients.Count == 0) throw new AppException(403, "You cannot message the instructors of this course.", "messaging_blocked");
        var conv = await GetOrCreateConversation(courseId, uid);
        return await Append(conv, uid, MessageKind.Text, body, recipients);
    }

    /// <summary>Instructor → one enrolled learner of a course they teach.</summary>
    public async Task<SentMessageDto> InstructorSend(Guid courseId, Guid learnerId, SendMessageInput input)
    {
        var uid = me.RequireId();
        var body = Body(input.Body);
        if (!await access.IsCourseAuthor(courseId)) throw AppException.Forbidden("You are not an instructor on this course.");
        if (learnerId == uid) throw AppException.Bad("You cannot message yourself.", "invalid_recipient");
        if (!await db.Enrollments.AnyAsync(e => e.CourseId == courseId && e.UserId == learnerId)) throw AppException.NotFound("Enrolled learner");
        await RateLimit(uid);
        if (await IsBlocked(learnerId, uid)) throw new AppException(403, "This learner is not accepting your messages.", "messaging_blocked");
        var conv = await GetOrCreateConversation(courseId, learnerId);
        return await Append(conv, uid, MessageKind.Text, body, [learnerId]);
    }

    /// <summary>Reply within an existing thread (learner or any instructor of the course).</summary>
    public async Task<SentMessageDto> Reply(Guid conversationId, SendMessageInput input)
    {
        var uid = me.RequireId();
        var body = Body(input.Body);
        var conv = await db.Set<Conversation>().AsNoTracking().FirstOrDefaultAsync(c => c.Id == conversationId) ?? throw AppException.NotFound("Conversation");
        if (conv.LearnerId == uid)
        {
            if (!await db.Enrollments.AnyAsync(e => e.CourseId == conv.CourseId && e.UserId == uid))
                throw AppException.Forbidden("You are no longer enrolled in this course.");
            await RateLimit(uid);
            var recipients = await InstructorRecipients(conv.CourseId, uid);
            if (recipients.Count == 0) throw new AppException(403, "You cannot message the instructors of this course.", "messaging_blocked");
            return await Append(conv, uid, MessageKind.Text, body, recipients);
        }
        if (!await access.IsCourseAuthor(conv.CourseId)) throw AppException.NotFound("Conversation");
        await RateLimit(uid);
        if (await IsBlocked(conv.LearnerId, uid)) throw new AppException(403, "This learner is not accepting your messages.", "messaging_blocked");
        return await Append(conv, uid, MessageKind.Text, body, [conv.LearnerId]);
    }

    private string Body(string? raw) => TextRules.PlainText(raw, "Message", 1, opt.MaxBodyLength);

    private async Task RateLimit(Guid uid)
    {
        var now = DateTime.UtcNow;
        var hourAgo = now.AddHours(-1);
        var dayAgo = now.AddDays(-1);
        var q = db.Set<Message>().Where(m => m.SenderId == uid && m.Kind == MessageKind.Text && m.CreatedAt > dayAgo);
        if (await q.CountAsync(m => m.CreatedAt > hourAgo) >= opt.MaxPerHour || await q.CountAsync() >= opt.MaxPerDay)
            throw new AppException(429, "You are sending messages too quickly. Try again later.", "rate_limited");
    }

    /// <summary>Active (non-suspended) instructors of the course who have not blocked <paramref name="learnerId"/>.</summary>
    private async Task<List<Guid>> InstructorRecipients(Guid courseId, Guid learnerId)
    {
        var ids = await (from ci in db.CourseInstructors
                         join u in db.Users on ci.UserId equals u.Id
                         where ci.CourseId == courseId && !u.IsSuspended && ci.UserId != learnerId
                         select ci.UserId).Distinct().ToListAsync();
        var blockers = await db.Set<MessageBlock>().Where(b => b.BlockedId == learnerId && ids.Contains(b.BlockerId)).Select(b => b.BlockerId).ToListAsync();
        return ids.Except(blockers).ToList();
    }

    private Task<bool> IsBlocked(Guid recipient, Guid sender) =>
        db.Set<MessageBlock>().AnyAsync(b => b.BlockerId == recipient && b.BlockedId == sender);

    /// <summary>Race-safe get-or-create of the (course, learner) thread (unique index + INSERT IGNORE).</summary>
    internal async Task<Conversation> GetOrCreateConversation(Guid courseId, Guid learnerId)
    {
        var existing = await db.Set<Conversation>().AsNoTracking().FirstOrDefaultAsync(c => c.CourseId == courseId && c.LearnerId == learnerId);
        if (existing is not null) return existing;
        var now = DateTime.UtcNow;
        await db.Database.ExecuteSqlInterpolatedAsync(
            $"INSERT IGNORE INTO Messaging_Conversations (Id, CourseId, LearnerId, CreatedAt, LastMessageAt) VALUES ({Guid.NewGuid().ToString()}, {courseId.ToString()}, {learnerId.ToString()}, {now}, {now})");
        return await db.Set<Conversation>().AsNoTracking().FirstAsync(c => c.CourseId == courseId && c.LearnerId == learnerId);
    }

    private async Task<SentMessageDto> Append(Conversation conv, Guid sender, MessageKind kind, string body, List<Guid> recipients)
    {
        var (msg, _) = await AppendCore(db, notifications, conv, sender, kind, body, recipients);
        return new SentMessageDto(await ConversationDto(conv, sender), await ToDto(msg, conv));
    }

    /// <summary>Adds the message, bumps the thread, marks it read for the sender and notifies recipients (one transaction).</summary>
    internal static async Task<(Message Msg, int Notified)> AppendCore(AppDbContext db, INotificationService notifications, Conversation conv,
        Guid sender, MessageKind kind, string body, IReadOnlyCollection<Guid> recipients)
    {
        var ownTx = db.Database.CurrentTransaction is null ? await db.Database.BeginTransactionAsync() : null;
        try
        {
            var now = DateTime.UtcNow;
            var msg = new Message { ConversationId = conv.Id, SenderId = sender, Kind = kind, Body = body, CreatedAt = now };
            db.Set<Message>().Add(msg);
            await db.SaveChangesAsync();
            await db.Set<Conversation>().Where(c => c.Id == conv.Id).ExecuteUpdateAsync(s => s.SetProperty(c => c.LastMessageAt, now));
            await MarkRead(db, conv.Id, sender, now);
            var senderName = await db.Users.Where(u => u.Id == sender).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "";
            var title = await db.Courses.Where(c => c.Id == conv.CourseId).Select(c => c.Title).FirstOrDefaultAsync() ?? "";
            var label = kind switch { MessageKind.Welcome => "Welcome message", MessageKind.Completion => "Congratulations message", _ => "New message" };
            var notified = await notifications.Publish(recipients, NotificationKinds.Message, $"{label} from {senderName} about \"{title}\"",
                $"/messages/{conv.Id}");
            if (ownTx is not null) await ownTx.CommitAsync();
            conv.LastMessageAt = now;
            return (msg, notified);
        }
        finally
        {
            if (ownTx is not null) await ownTx.DisposeAsync();
        }
    }

    private static async Task MarkRead(AppDbContext db, Guid conversationId, Guid userId, DateTime at)
    {
        await db.Database.ExecuteSqlInterpolatedAsync(
            $"INSERT INTO Messaging_ReadMarkers (ConversationId, UserId, LastReadAt) VALUES ({conversationId.ToString()}, {userId.ToString()}, {at}) ON DUPLICATE KEY UPDATE LastReadAt = GREATEST(LastReadAt, VALUES(LastReadAt))");
    }

    // ---------- reading ----------

    public async Task<List<ConversationDto>> MyConversations()
    {
        var uid = me.RequireId();
        var taught = await db.CourseInstructors.Where(ci => ci.UserId == uid).Select(ci => ci.CourseId).ToListAsync();
        if (taught.Count > 0 && !await access.IsCourseAuthor(taught[0])) taught = []; // demoted/suspended authors lose instructor-side access
        var convs = await db.Set<Conversation>().AsNoTracking()
            .Where(c => c.LearnerId == uid || taught.Contains(c.CourseId))
            .OrderByDescending(c => c.LastMessageAt).Take(500).ToListAsync();
        var result = new List<ConversationDto>();
        foreach (var c in convs) result.Add(await ConversationDto(c, uid));
        return result;
    }

    public async Task<ConversationPageDto> Get(Guid conversationId, DateTime? before, int limit)
    {
        var uid = me.RequireId();
        var conv = await db.Set<Conversation>().AsNoTracking().FirstOrDefaultAsync(c => c.Id == conversationId) ?? throw AppException.NotFound("Conversation");
        var participant = conv.LearnerId == uid || await access.IsCourseAuthor(conv.CourseId);
        if (!participant && !IsModerator) throw AppException.NotFound("Conversation");
        limit = Math.Clamp(limit <= 0 ? 50 : limit, 1, 200);
        var q = db.Set<Message>().AsNoTracking().Where(m => m.ConversationId == conversationId);
        if (before is { } b) q = q.Where(m => m.CreatedAt < b);
        var rows = await q.OrderByDescending(m => m.CreatedAt).ThenByDescending(m => m.Id).Take(limit + 1).ToListAsync();
        var hasMore = rows.Count > limit;
        rows = rows.Take(limit).OrderBy(m => m.CreatedAt).ToList();
        if (participant) await MarkRead(db, conv.Id, uid, DateTime.UtcNow);
        var dtos = new List<MessageDto>();
        foreach (var m in rows) dtos.Add(await ToDto(m, conv));
        return new ConversationPageDto(await ConversationDto(conv, uid), dtos, hasMore);
    }

    private async Task<ConversationDto> ConversationDto(Conversation c, Guid viewer)
    {
        var title = await db.Courses.Where(x => x.Id == c.CourseId).Select(x => x.Title).FirstOrDefaultAsync() ?? "";
        var learner = await db.Users.Where(u => u.Id == c.LearnerId).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "";
        var lastRead = await db.Set<ConversationRead>().Where(r => r.ConversationId == c.Id && r.UserId == viewer)
            .Select(r => (DateTime?)r.LastReadAt).FirstOrDefaultAsync();
        var unread = await db.Set<Message>().CountAsync(m => m.ConversationId == c.Id && m.SenderId != viewer && m.HiddenAt == null
                                                             && (lastRead == null || m.CreatedAt > lastRead));
        return new ConversationDto(c.Id, c.CourseId, title, c.LearnerId, learner, c.LearnerId == viewer ? "Learner" : "Instructor",
            c.LastMessageAt, unread);
    }

    private async Task<MessageDto> ToDto(Message m, Conversation c)
    {
        var name = await db.Users.Where(u => u.Id == m.SenderId).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "";
        var hidden = m.HiddenAt is not null;
        var showBody = !hidden || IsModerator;
        return new MessageDto(m.Id, m.ConversationId, m.SenderId, name, m.SenderId == c.LearnerId ? "Learner" : "Instructor", m.Kind.ToString(),
            showBody ? m.Body : null, hidden, hidden ? m.HiddenReason : null, m.CreatedAt);
    }

    // ---------- blocks ----------

    public async Task<List<BlockDto>> Blocks()
    {
        var uid = me.RequireId();
        return await (from b in db.Set<MessageBlock>().AsNoTracking()
                      join u in db.Users on b.BlockedId equals u.Id
                      where b.BlockerId == uid
                      orderby b.CreatedAt
                      select new BlockDto(b.BlockedId, u.DisplayName, b.CreatedAt)).ToListAsync();
    }

    /// <summary>Blocks a user the caller shares a conversation with (no blind blocking of arbitrary ids).</summary>
    public async Task<BlockDto> Block(BlockInput input)
    {
        var uid = me.RequireId();
        if (input.UserId == uid) throw AppException.Bad("You cannot block yourself.", "invalid_block");
        var target = await db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == input.UserId) ?? throw AppException.NotFound("User");
        if (!await SharesConversation(uid, target.Id)) throw AppException.NotFound("User");
        var existing = await db.Set<MessageBlock>().FirstOrDefaultAsync(b => b.BlockerId == uid && b.BlockedId == target.Id);
        if (existing is null)
        {
            existing = new MessageBlock { BlockerId = uid, BlockedId = target.Id };
            db.Set<MessageBlock>().Add(existing);
            await db.SaveChangesAsync();
        }
        return new BlockDto(target.Id, target.DisplayName, existing.CreatedAt);
    }

    public async Task Unblock(Guid userId)
    {
        var uid = me.RequireId();
        await db.Set<MessageBlock>().Where(b => b.BlockerId == uid && b.BlockedId == userId).ExecuteDeleteAsync();
    }

    private async Task<bool> SharesConversation(Guid a, Guid b)
    {
        // a is learner, b instructor of the course — or the reverse.
        var aCourses = db.CourseInstructors.Where(ci => ci.UserId == a).Select(ci => ci.CourseId);
        var bCourses = db.CourseInstructors.Where(ci => ci.UserId == b).Select(ci => ci.CourseId);
        return await db.Set<Conversation>().AnyAsync(c => (c.LearnerId == a && bCourses.Contains(c.CourseId)) || (c.LearnerId == b && aCourses.Contains(c.CourseId)));
    }

    // ---------- reports & moderation ----------

    /// <summary>A participant reports a message they received; files a Trust complaint (Abuse) with the message as evidence.</summary>
    public async Task<MessageReportDto> Report(Guid messageId, ReportMessageInput input)
    {
        var uid = me.RequireId();
        var reason = TextRules.PlainText(input.Reason, "Reason", 10, 2000);
        var msg = await db.Set<Message>().AsNoTracking().FirstOrDefaultAsync(m => m.Id == messageId) ?? throw AppException.NotFound("Message");
        var conv = await db.Set<Conversation>().AsNoTracking().FirstAsync(c => c.Id == msg.ConversationId);
        var participant = conv.LearnerId == uid || await access.IsCourseAuthor(conv.CourseId);
        if (!participant) throw AppException.NotFound("Message");
        if (msg.SenderId == uid) throw AppException.Bad("You cannot report your own message.", "invalid_report");
        if (await db.Set<MessageReport>().AnyAsync(r => r.MessageId == messageId && r.ReporterId == uid))
            throw AppException.Conflict("You have already reported this message.", "already_reported");
        var reporter = await db.Users.AsNoTracking().FirstAsync(u => u.Id == uid);
        var senderName = await db.Users.Where(u => u.Id == msg.SenderId).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "";

        await using var tx = await db.Database.BeginTransactionAsync();
        var complaint = new Complaint
        {
            Type = ComplaintType.Abuse, TargetType = MessagingRules.MessageComplaintTarget, TargetId = msg.Id, CourseId = conv.CourseId,
            ReporterUserId = uid, ReporterEmail = reporter.Email, ReporterName = reporter.DisplayName.Length > 120 ? reporter.DisplayName[..120] : reporter.DisplayName,
            Evidence = $"Private message report.\nMessage: {msg.Id}\nConversation: {conv.Id}\nSender: {senderName} ({msg.SenderId})\nSent: {msg.CreatedAt:u}\n---\n{msg.Body}\n---\nReporter's reason: {reason}",
        };
        db.Set<Complaint>().Add(complaint);
        var report = new MessageReport { MessageId = msg.Id, ReporterId = uid, ComplaintId = complaint.Id, Reason = reason };
        db.Set<MessageReport>().Add(report);
        audit.Record("message.reported", nameof(Message), msg.Id, new { complaintId = complaint.Id, conv.CourseId, conversationId = conv.Id });
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { throw AppException.Conflict("You have already reported this message.", "already_reported"); }
        await tx.CommitAsync();
        return new MessageReportDto(report.Id, msg.Id, complaint.Id, report.CreatedAt);
    }

    public async Task<List<ModerationReportDto>> Reports(bool includeHidden)
    {
        RequireModerator();
        var rows = await (from r in db.Set<MessageReport>().AsNoTracking()
                          join m in db.Set<Message>() on r.MessageId equals m.Id
                          join c in db.Set<Conversation>() on m.ConversationId equals c.Id
                          join u in db.Users on m.SenderId equals u.Id
                          where includeHidden || m.HiddenAt == null
                          orderby r.CreatedAt descending
                          select new ModerationReportDto(r.Id, m.Id, c.Id, c.CourseId, m.SenderId, u.DisplayName, r.ReporterId, r.Reason, m.Body,
                              m.HiddenAt != null, r.ComplaintId, r.CreatedAt)).Take(500).ToListAsync();
        return rows;
    }

    public async Task<MessageDto> Hide(Guid messageId, HideMessageInput input)
    {
        RequireModerator();
        var reason = TextRules.PlainText(input.Reason, "Reason", 3, 500);
        var msg = await db.Set<Message>().FirstOrDefaultAsync(m => m.Id == messageId) ?? throw AppException.NotFound("Message");
        msg.HiddenAt ??= DateTime.UtcNow; msg.HiddenBy = me.RequireId(); msg.HiddenReason = reason;
        audit.Record("message.hidden", nameof(Message), msg.Id, new { reason });
        await db.SaveChangesAsync();
        var conv = await db.Set<Conversation>().AsNoTracking().FirstAsync(c => c.Id == msg.ConversationId);
        return await ToDto(msg, conv);
    }

    public async Task<MessageDto> Unhide(Guid messageId)
    {
        RequireModerator();
        var msg = await db.Set<Message>().FirstOrDefaultAsync(m => m.Id == messageId) ?? throw AppException.NotFound("Message");
        msg.HiddenAt = null; msg.HiddenBy = null; msg.HiddenReason = null;
        audit.Record("message.unhidden", nameof(Message), msg.Id);
        await db.SaveChangesAsync();
        var conv = await db.Set<Conversation>().AsNoTracking().FirstAsync(c => c.Id == msg.ConversationId);
        return await ToDto(msg, conv);
    }

    private void RequireModerator()
    {
        me.RequireId();
        if (!IsModerator) throw AppException.Forbidden("Moderator access required.");
    }

    // ---------- welcome / completion messages ----------

    public async Task<List<AutoMessageDto>> AutoMessages(Guid courseId)
    {
        await access.RequireCourseEditor(courseId);
        var rows = await db.Set<CourseAutoMessage>().AsNoTracking().Where(a => a.CourseId == courseId).ToListAsync();
        return Enum.GetValues<AutoMessageKind>().Select(k => rows.FirstOrDefault(r => r.Kind == k) is { } r
            ? new AutoMessageDto(k.ToString(), r.Body, r.Enabled, r.EnabledSince, r.UpdatedAt)
            : new AutoMessageDto(k.ToString(), "", false, null, null)).ToList();
    }

    public async Task<AutoMessageDto> SetAutoMessage(Guid courseId, string kindRaw, AutoMessageInput input)
    {
        await access.RequireCourseEditor(courseId);
        if (!Enum.TryParse<AutoMessageKind>(kindRaw, true, out var kind) || !Enum.IsDefined(kind))
            throw AppException.Bad("Kind must be 'welcome' or 'completion'.", "invalid_kind");
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        var body = string.IsNullOrWhiteSpace(input.Body) && !input.Enabled ? "" : TextRules.PlainText(input.Body, "Body", 1, MessagingRules.MaxAutoBodyLength);
        var row = await db.Set<CourseAutoMessage>().FirstOrDefaultAsync(a => a.CourseId == courseId && a.Kind == kind);
        if (row is null) { row = new CourseAutoMessage { CourseId = courseId, Kind = kind }; db.Set<CourseAutoMessage>().Add(row); }
        var now = DateTime.UtcNow;
        if (input.Enabled && !row.Enabled) row.EnabledSince = now;
        if (!input.Enabled) row.EnabledSince = null;
        row.Enabled = input.Enabled; row.Body = body; row.UpdatedBy = me.RequireId(); row.UpdatedAt = now;
        audit.Record("course.auto_message.updated", nameof(Course), courseId, new { kind = kind.ToString(), row.Enabled, length = body.Length });
        await db.SaveChangesAsync();
        return new AutoMessageDto(kind.ToString(), row.Body, row.Enabled, row.EnabledSince, row.UpdatedAt);
    }
}
