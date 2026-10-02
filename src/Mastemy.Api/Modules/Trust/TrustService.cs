using System.Collections.Concurrent;
using System.Net;
using System.Net.Mail;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Engagement;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Trust;

public record FileComplaintInput(string? Type, string? TargetType, Guid TargetId, string? Evidence, string? Email, string? Name);
public record ComplaintFiledDto(Guid Id, ComplaintStatus Status, DateTime CreatedAt);
public record ComplaintDto(Guid Id, ComplaintType Type, ComplaintTarget TargetType, Guid TargetId, Guid CourseId, string? CourseTitle,
    Guid? ReporterUserId, string ReporterEmail, string ReporterName, string Evidence, ComplaintStatus Status, ComplaintAction Action,
    string? ResolutionNote, Guid? ResolvedBy, DateTime? ResolvedAt, DateTime CreatedAt);
public record ResolveComplaintInput(string? Action, string? Note);
public record ComplaintResolutionDto(ComplaintDto Complaint, bool ComplainantNotified, int InstructorsNotified);
public record ContentHoldDto(Guid Id, HoldTarget TargetType, Guid TargetId, Guid CourseId, Guid? ComplaintId, Guid CreatedBy, DateTime CreatedAt,
    DateTime? ReleasedAt);
public record SuspendInput(string? Reason);
public record ReinstateInput(string? Note);
public record SuspensionDto(Guid Id, Guid UserId, string? DisplayName, string Reason, Guid HoldBatchId, int HeldEntries, Guid SuspendedBy,
    DateTime SuspendedAt, Guid? ReinstatedBy, DateTime? ReinstatedAt, string? ReinstateNote);
public record FileAppealInput(string? TargetType, Guid TargetId, string? Reason);
public record AppealDto(Guid Id, ComplaintTarget TargetType, Guid TargetId, Guid CourseId, Guid AppellantId, string Reason, AppealStatus Status,
    Guid? DecidedBy, string? DecisionNote, DateTime? DecidedAt, DateTime CreatedAt);
public record DecideAppealInput(string? Decision, string? Note);
public record PagedResult<T>(List<T> Items, int Total, int Page, int PageSize);

public static class TrustNotificationKinds
{
    public const string TrustSafety = NotificationKinds.TrustSafety;
}

/// <summary>Fixed-window limit on complaint filing per client IP (anonymous filing must not be a spam vector).</summary>
public sealed class ComplaintRateLimiter(IConfiguration cfg)
{
    private readonly ConcurrentDictionary<string, (DateTime Window, int Count)> _hits = new();
    private readonly int _perHour = cfg.GetValue("Trust:ComplaintsPerHourPerIp", 10);

    public void Acquire(IPAddress? ip)
    {
        var key = ip?.ToString() ?? "unknown";
        var now = DateTime.UtcNow;
        var window = new DateTime(now.Year, now.Month, now.Day, now.Hour, 0, 0, DateTimeKind.Utc);
        var v = _hits.AddOrUpdate(key, _ => (window, 1), (_, old) => old.Window == window ? (window, old.Count + 1) : (window, 1));
        if (_hits.Count > 10_000) foreach (var k in _hits.Where(x => x.Value.Window != window).Select(x => x.Key).ToList()) _hits.TryRemove(k, out _);
        if (v.Count > _perHour) throw new AppException(429, "Too many complaints from this address. Try again later.", "rate_limited");
    }
}

/// <summary>Trust &amp; safety workflows (spec §20): complaints/takedowns, content holds, instructor suspension, moderation appeals.</summary>
public class TrustService(AppDbContext db, ICurrentUser me, AuditService audit, AccessService access, EmailOutbox email, ILogger<TrustService> log,
    INotificationService notifications)
{
    public const string HeldBatchStatus = "Held";

    private static T ParseEnum<T>(string? value, string field) where T : struct, Enum =>
        Enum.TryParse<T>(value?.Trim(), true, out var v) && Enum.IsDefined(v) && !int.TryParse(value, out _)
            ? v
            : throw AppException.Bad($"{field} must be one of: {string.Join(", ", Enum.GetNames<T>())}.", "invalid_" + field.ToLowerInvariant());

    private static string Text(string? value, string field, int min, int max)
    {
        var t = (value ?? "").Trim();
        if (t.Length < min || t.Length > max) throw AppException.Bad($"{field} must be {min}-{max} characters.", "invalid_" + field.ToLowerInvariant());
        return t;
    }

    // ---------- targets ----------

    /// <summary>Course that owns the target; 404 when the target does not exist.</summary>
    private async Task<Guid> CourseOf(ComplaintTarget type, Guid id)
    {
        Guid? courseId = type switch
        {
            ComplaintTarget.Course => await db.Courses.Where(c => c.Id == id).Select(c => (Guid?)c.Id).FirstOrDefaultAsync(),
            ComplaintTarget.Lesson => await db.Lessons.Where(l => l.Id == id)
                .Join(db.Modules, l => l.ModuleId, m => m.Id, (l, m) => (Guid?)m.CourseId).FirstOrDefaultAsync(),
            ComplaintTarget.Discussion => await db.DiscussionThreads.Where(t => t.Id == id).Select(t => (Guid?)t.CourseId).FirstOrDefaultAsync(),
            ComplaintTarget.DiscussionReply => await db.DiscussionReplies.Where(r => r.Id == id)
                .Join(db.DiscussionThreads, r => r.ThreadId, t => t.Id, (r, t) => (Guid?)t.CourseId).FirstOrDefaultAsync(),
            ComplaintTarget.Review => await db.CourseReviews.Where(r => r.Id == id).Select(r => (Guid?)r.CourseId).FirstOrDefaultAsync(),
            ComplaintTarget.Resource => await db.ResourceFiles.Where(r => r.Id == id).Select(r => (Guid?)r.CourseId).FirstOrDefaultAsync(),
            _ => null,
        };
        return courseId ?? throw AppException.NotFound("Complaint target");
    }

    // ---------- complaints ----------

    public async Task<ComplaintFiledDto> FileComplaint(FileComplaintInput input)
    {
        var type = ParseEnum<ComplaintType>(input.Type, "Type");
        var target = ParseEnum<ComplaintTarget>(input.TargetType, "TargetType");
        if (input.TargetId == Guid.Empty) throw AppException.Bad("targetId is required.", "invalid_targetid");
        var evidence = Text(input.Evidence, "Evidence", 20, 20_000);
        var name = (input.Name ?? "").Trim();
        if (name.Length > 120) throw AppException.Bad("name must be at most 120 characters.", "invalid_name");

        string contact;
        Guid? reporter = me.Id;
        if (reporter is { } uid)
        {
            var u = await db.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == uid) ?? throw new AppException(401, "Authentication required.", "unauthenticated");
            contact = string.IsNullOrWhiteSpace(input.Email) ? u.Email : ValidEmail(input.Email);
            if (name.Length == 0) name = u.DisplayName;
        }
        else
        {
            if (string.IsNullOrWhiteSpace(input.Email)) throw AppException.Bad("An email address is required so we can contact you about this complaint.", "email_required");
            contact = ValidEmail(input.Email);
        }

        var courseId = await CourseOf(target, input.TargetId);
        var c = new Complaint
        {
            Type = type, TargetType = target, TargetId = input.TargetId, CourseId = courseId, ReporterUserId = reporter,
            ReporterEmail = contact, ReporterName = name, Evidence = evidence,
        };
        db.Set<Complaint>().Add(c);
        audit.Record("complaint.filed", nameof(Complaint), c.Id, new { type = type.ToString(), target = target.ToString(), c.TargetId, c.CourseId, anonymous = reporter is null });
        await db.SaveChangesAsync();
        return new ComplaintFiledDto(c.Id, c.Status, c.CreatedAt);
    }

    private static string ValidEmail(string raw)
    {
        var e = raw.Trim();
        if (e.Length > 254 || !MailAddress.TryCreate(e, out var addr) || addr.Address != e || !e.Contains('.', StringComparison.Ordinal))
            throw AppException.Bad("A valid email address is required.", "invalid_email");
        return e;
    }

    public async Task<PagedResult<ComplaintDto>> Complaints(string? status, string? type, int page, int pageSize)
    {
        page = Math.Max(1, page); pageSize = Math.Clamp(pageSize, 1, 100);
        var q = db.Set<Complaint>().AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status)) { var s = ParseEnum<ComplaintStatus>(status, "Status"); q = q.Where(x => x.Status == s); }
        if (!string.IsNullOrWhiteSpace(type)) { var t = ParseEnum<ComplaintType>(type, "Type"); q = q.Where(x => x.Type == t); }
        var total = await q.CountAsync();
        var rows = await q.OrderBy(x => x.Status == ComplaintStatus.Open ? 0 : 1).ThenBy(x => x.CreatedAt)
            .Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedResult<ComplaintDto>(await ToDtos(rows), total, page, pageSize);
    }

    public async Task<ComplaintDto> Complaint(Guid id)
    {
        var c = await db.Set<Complaint>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Complaint");
        return (await ToDtos([c]))[0];
    }

    private async Task<List<ComplaintDto>> ToDtos(List<Complaint> rows)
    {
        var ids = rows.Select(r => r.CourseId).Distinct().ToList();
        var titles = await db.Courses.AsNoTracking().Where(c => ids.Contains(c.Id)).ToDictionaryAsync(c => c.Id, c => c.Title);
        return rows.Select(c => new ComplaintDto(c.Id, c.Type, c.TargetType, c.TargetId, c.CourseId, titles.GetValueOrDefault(c.CourseId),
            c.ReporterUserId, c.ReporterEmail, c.ReporterName, c.Evidence, c.Status, c.Action, c.ResolutionNote, c.ResolvedBy, c.ResolvedAt,
            c.CreatedAt)).ToList();
    }

    public async Task<ComplaintResolutionDto> Resolve(Guid id, ResolveComplaintInput input)
    {
        var staff = me.RequireId();
        var action = ParseEnum<ComplaintAction>(input.Action, "Action");
        if (action == ComplaintAction.None) throw AppException.Bad("Action must be Dismiss, Hide or Archive.", "invalid_action");
        var note = Text(input.Note, "Note", 3, 5000);

        await using var tx = await db.Database.BeginTransactionAsync();
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT Id FROM Trust_Complaints WHERE Id = {id} FOR UPDATE");
        var c = await db.Set<Complaint>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Complaint");
        if (c.Status != ComplaintStatus.Open) throw AppException.Conflict($"Complaint is already {c.Status}.", "complaint_closed");

        object? effect = null;
        switch (action)
        {
            case ComplaintAction.Dismiss:
                c.Status = ComplaintStatus.Dismissed;
                break;
            case ComplaintAction.Hide:
                effect = await HideTarget(c, staff, note);
                c.Status = ComplaintStatus.Actioned;
                break;
            case ComplaintAction.Archive:
                if (c.TargetType != ComplaintTarget.Course)
                    throw AppException.Bad("Archive applies to course complaints only; use Hide for content items.", "invalid_action");
                var course = await db.Courses.FirstAsync(x => x.Id == c.TargetId);
                var from = course.Status;
                CourseStateMachine.Apply(course, CourseAction.Archive, DateTime.UtcNow); // 409 when already archived
                audit.Record("course.archived", nameof(Course), course.Id, new { from = from.ToString(), to = course.Status.ToString(), complaintId = c.Id });
                effect = new { archivedFrom = from.ToString() };
                c.Status = ComplaintStatus.Actioned;
                break;
        }
        c.Action = action; c.ResolutionNote = note; c.ResolvedBy = staff; c.ResolvedAt = DateTime.UtcNow;
        audit.Record("complaint.resolved", nameof(Complaint), c.Id, new { action = action.ToString(), target = c.TargetType.ToString(), c.TargetId, effect });

        var courseTitle = await db.Courses.Where(x => x.Id == c.CourseId).Select(x => x.Title).FirstOrDefaultAsync() ?? "";
        var outcome = action == ComplaintAction.Dismiss ? "was reviewed and no action was taken" : "was upheld and the content has been removed from public view";
        var complainantNotified = email.Enqueue(c.ReporterEmail, "Update on your Mastemy complaint",
            $"Your {c.Type} complaint about {c.TargetType} content in \"{courseTitle}\" {outcome}.\n\nReference: {c.Id}\n\n{note}");
        if (c.ReporterUserId is { } reporterId)
        {
            await Notify([reporterId], $"Your complaint {outcome}.", $"/account/complaints/{c.Id}");
            complainantNotified = true;
        }
        var instructors = 0;
        if (action != ComplaintAction.Dismiss)
        {
            var ids = await db.CourseInstructors.Where(x => x.CourseId == c.CourseId).Select(x => x.UserId).ToListAsync();
            await Notify(ids, $"Content in \"{courseTitle}\" was removed after a {c.Type} complaint.", $"/studio/courses/{c.CourseId}");
            var emails = await db.Users.Where(u => ids.Contains(u.Id)).Select(u => u.Email).ToListAsync();
            foreach (var to in emails)
                email.Enqueue(to, $"Takedown notice: {courseTitle}",
                    $"Following a {c.Type} complaint, {c.TargetType} {c.TargetId} in \"{courseTitle}\" was {(action == ComplaintAction.Archive ? "archived" : "hidden")}.\n\nReason: {note}\n\nReply to this email to submit a counter-notice.");
            instructors = ids.Count;
        }
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        log.LogInformation("Complaint {ComplaintId} resolved with {Action} by {StaffId}", c.Id, action, staff);
        return new ComplaintResolutionDto((await ToDtos([c]))[0], complainantNotified, instructors);
    }

    private async Task<object> HideTarget(Complaint c, Guid staff, string note)
    {
        switch (c.TargetType)
        {
            case ComplaintTarget.Course:
                throw AppException.Bad("Courses are taken down with the Archive action.", "invalid_action");
            case ComplaintTarget.Review:
                var review = await db.CourseReviews.FirstAsync(x => x.Id == c.TargetId);
                review.Hidden = true; review.UpdatedAt = DateTime.UtcNow;
                return new { hidden = "review" };
            case ComplaintTarget.Discussion:
                var thread = await db.DiscussionThreads.FirstAsync(x => x.Id == c.TargetId);
                thread.Hidden = true; thread.UpdatedAt = DateTime.UtcNow;
                await ModerationNotes.Set(db, ModerationNote.Thread, thread.Id, $"Removed after a {c.Type} complaint. {note}".Trim());
                return new { hidden = "discussion" };
            case ComplaintTarget.DiscussionReply:
                var reply = await db.DiscussionReplies.FirstAsync(x => x.Id == c.TargetId);
                reply.Hidden = true;
                await ModerationNotes.Set(db, ModerationNote.Reply, reply.Id, $"Removed after a {c.Type} complaint. {note}".Trim());
                return new { hidden = "discussion_reply" };
            default:
                var holdType = c.TargetType == ComplaintTarget.Lesson ? HoldTarget.Lesson : HoldTarget.Resource;
                var existing = await db.Set<ContentHold>().FirstOrDefaultAsync(h => h.TargetId == c.TargetId && h.TargetType == holdType && h.ReleasedAt == null);
                if (existing is not null) return new { holdId = existing.Id, alreadyHeld = true };
                var hold = new ContentHold { TargetType = holdType, TargetId = c.TargetId, CourseId = c.CourseId, ComplaintId = c.Id, CreatedBy = staff };
                db.Set<ContentHold>().Add(hold);
                audit.Record("content_hold.created", nameof(ContentHold), hold.Id, new { target = holdType.ToString(), hold.TargetId, hold.CourseId, complaintId = c.Id });
                return new { holdId = hold.Id };
        }
    }

    /// <summary>In-app (and opted-in email) notification through the shared service, so per-kind preferences apply.</summary>
    private Task Notify(IEnumerable<Guid> userIds, string title, string link) =>
        notifications.Publish(userIds, TrustNotificationKinds.TrustSafety, title, link);

    // ---------- holds ----------

    public async Task<List<ContentHoldDto>> Holds(bool includeReleased)
    {
        var q = db.Set<ContentHold>().AsNoTracking();
        if (!includeReleased) q = q.Where(h => h.ReleasedAt == null);
        return await q.OrderByDescending(h => h.CreatedAt).Take(500)
            .Select(h => new ContentHoldDto(h.Id, h.TargetType, h.TargetId, h.CourseId, h.ComplaintId, h.CreatedBy, h.CreatedAt, h.ReleasedAt)).ToListAsync();
    }

    public async Task<ContentHoldDto> ReleaseHold(Guid id, string? note)
    {
        var staff = me.RequireId();
        var reason = Text(note, "Note", 3, 5000);
        var h = await db.Set<ContentHold>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Content hold");
        if (h.ReleasedAt is not null) throw AppException.Conflict("Hold is already released.", "hold_released");
        h.ReleasedAt = DateTime.UtcNow; h.ReleasedBy = staff;
        audit.Record("content_hold.released", nameof(ContentHold), h.Id, new { target = h.TargetType.ToString(), h.TargetId, reason });
        await db.SaveChangesAsync();
        return new ContentHoldDto(h.Id, h.TargetType, h.TargetId, h.CourseId, h.ComplaintId, h.CreatedBy, h.CreatedAt, h.ReleasedAt);
    }

    public static Task<bool> IsHeld(AppDbContext db, HoldTarget type, Guid id) =>
        db.Set<ContentHold>().AnyAsync(h => h.TargetId == id && h.TargetType == type && h.ReleasedAt == null);

    // ---------- instructor suspension ----------

    public static Task<bool> IsSuspendedInstructor(AppDbContext db, Guid userId) =>
        db.Set<InstructorSuspension>().AnyAsync(s => s.UserId == userId && s.ReinstatedAt == null);

    /// <summary>Moves a suspended instructor's not-yet-batched ledger entries into their held batch so no payout batch claims them.</summary>
    public static async Task<int> SweepHeldEarnings(AppDbContext db, CancellationToken ct = default)
    {
        var active = await db.Set<InstructorSuspension>().AsNoTracking().Where(s => s.ReinstatedAt == null)
            .Select(s => new { s.UserId, s.HoldBatchId }).ToListAsync(ct);
        var moved = 0;
        foreach (var s in active)
            moved += await db.CommissionLedger.Where(e => e.InstructorId == s.UserId && e.PayoutBatchId == null)
                .ExecuteUpdateAsync(u => u.SetProperty(e => e.PayoutBatchId, s.HoldBatchId), ct);
        return moved;
    }

    public async Task<SuspensionDto> Suspend(Guid userId, SuspendInput input)
    {
        var staff = me.RequireId();
        var reason = Text(input.Reason, "Reason", 5, 5000);
        if (userId == staff) throw AppException.Bad("You cannot suspend yourself.", "self_suspension");
        await using var tx = await db.Database.BeginTransactionAsync();
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT Id FROM Users WHERE Id = {userId} FOR UPDATE");
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == userId) ?? throw AppException.NotFound("User");
        if (user.Roles.Any(r => r.Role is Roles.Admin or Roles.SuperAdmin))
            throw AppException.Bad("Staff accounts are managed through role administration, not instructor suspension.", "cannot_suspend_staff");
        var isInstructor = user.Roles.Any(r => r.Role == Roles.Instructor) || await db.CourseInstructors.AnyAsync(x => x.UserId == userId);
        if (!isInstructor) throw AppException.Bad("User is not an instructor.", "not_instructor");
        if (await IsSuspendedInstructor(db, userId)) throw AppException.Conflict("Instructor is already suspended.", "already_suspended");

        var hadRole = user.Roles.FirstOrDefault(r => r.Role == Roles.Instructor);
        if (hadRole is not null) db.UserRoles.Remove(hadRole);
        var batch = new PayoutBatch { Status = HeldBatchStatus, CreatedBy = staff };
        db.PayoutBatches.Add(batch);
        var s = new InstructorSuspension { UserId = userId, Reason = reason, HadInstructorRole = hadRole is not null, HoldBatchId = batch.Id, SuspendedBy = staff };
        db.Set<InstructorSuspension>().Add(s);
        await Notify([userId], "Your instructor account has been suspended. Studio editing and payouts are on hold.", "/studio");
        email.Enqueue(user.Email, "Your Mastemy instructor account is suspended",
            $"Your instructor privileges are suspended. Learners keep access to your published courses; studio edits and payouts are on hold.\n\nReason: {reason}");
        await db.SaveChangesAsync();
        var held = await db.CommissionLedger.Where(e => e.InstructorId == userId && e.PayoutBatchId == null)
            .ExecuteUpdateAsync(u => u.SetProperty(e => e.PayoutBatchId, batch.Id));
        audit.Record("instructor.suspended", nameof(User), userId, new { suspensionId = s.Id, reason, heldEntries = held, holdBatchId = batch.Id, removedInstructorRole = hadRole is not null });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await SuspensionDto(s);
    }

    public async Task<SuspensionDto> Reinstate(Guid userId, ReinstateInput input)
    {
        var staff = me.RequireId();
        var note = Text(input.Note, "Note", 3, 5000);
        await using var tx = await db.Database.BeginTransactionAsync();
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT Id FROM Users WHERE Id = {userId} FOR UPDATE");
        var s = await db.Set<InstructorSuspension>().FirstOrDefaultAsync(x => x.UserId == userId && x.ReinstatedAt == null)
                ?? throw AppException.NotFound("Active suspension");
        if (s.HadInstructorRole && !await db.UserRoles.AnyAsync(r => r.UserId == userId && r.Role == Roles.Instructor))
            db.UserRoles.Add(new UserRole { UserId = userId, Role = Roles.Instructor });
        s.ReinstatedAt = DateTime.UtcNow; s.ReinstatedBy = staff; s.ReinstateNote = note;
        await db.SaveChangesAsync();
        var released = await db.CommissionLedger.Where(e => e.PayoutBatchId == s.HoldBatchId)
            .ExecuteUpdateAsync(u => u.SetProperty(e => e.PayoutBatchId, (Guid?)null));
        await db.PayoutBatches.Where(b => b.Id == s.HoldBatchId && b.Status == HeldBatchStatus).ExecuteDeleteAsync();
        await Notify([userId], "Your instructor account has been reinstated.", "/studio");
        audit.Record("instructor.reinstated", nameof(User), userId, new { suspensionId = s.Id, note, releasedEntries = released });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await SuspensionDto(s);
    }

    public async Task<List<SuspensionDto>> Suspensions(bool includeEnded)
    {
        var q = db.Set<InstructorSuspension>().AsNoTracking();
        if (!includeEnded) q = q.Where(s => s.ReinstatedAt == null);
        var rows = await q.OrderByDescending(s => s.SuspendedAt).Take(500).ToListAsync();
        var list = new List<SuspensionDto>();
        foreach (var s in rows) list.Add(await SuspensionDto(s));
        return list;
    }

    private async Task<SuspensionDto> SuspensionDto(InstructorSuspension s)
    {
        var name = await db.Users.Where(u => u.Id == s.UserId).Select(u => u.DisplayName).FirstOrDefaultAsync();
        var held = s.ReinstatedAt is null ? await db.CommissionLedger.CountAsync(e => e.PayoutBatchId == s.HoldBatchId) : 0;
        return new SuspensionDto(s.Id, s.UserId, name, s.Reason, s.HoldBatchId, held, s.SuspendedBy, s.SuspendedAt, s.ReinstatedBy, s.ReinstatedAt, s.ReinstateNote);
    }

    // ---------- moderation appeals ----------

    private async Task<(Guid CourseId, Guid AuthorId, bool Hidden)> Moderated(ComplaintTarget type, Guid id)
    {
        var row = type switch
        {
            ComplaintTarget.Review => await db.CourseReviews.Where(r => r.Id == id).Select(r => new { r.CourseId, AuthorId = r.UserId, r.Hidden }).FirstOrDefaultAsync(),
            ComplaintTarget.Discussion => await db.DiscussionThreads.Where(t => t.Id == id).Select(t => new { t.CourseId, t.AuthorId, t.Hidden }).FirstOrDefaultAsync(),
            ComplaintTarget.DiscussionReply => await db.DiscussionReplies.Where(r => r.Id == id)
                .Join(db.DiscussionThreads, r => r.ThreadId, t => t.Id, (r, t) => new { t.CourseId, r.AuthorId, r.Hidden }).FirstOrDefaultAsync(),
            _ => throw AppException.Bad("Appeals apply to reviews, discussions and discussion replies.", "invalid_targettype"),
        };
        if (row is null) throw AppException.NotFound("Appeal target");
        return (row.CourseId, row.AuthorId, row.Hidden);
    }

    public async Task<AppealDto> FileAppeal(FileAppealInput input)
    {
        var uid = me.RequireId();
        var type = ParseEnum<ComplaintTarget>(input.TargetType, "TargetType");
        var reason = Text(input.Reason, "Reason", 10, 5000);
        var (courseId, authorId, hidden) = await Moderated(type, input.TargetId);
        if (authorId != uid && !await access.IsCourseAuthor(courseId))
            throw AppException.NotFound("Appeal target"); // do not reveal moderated content to unrelated users
        if (!hidden) throw AppException.Conflict("This content is not hidden; there is nothing to appeal.", "not_hidden");
        var prior = await db.Set<ModerationAppeal>().AsNoTracking()
            .Where(a => a.TargetType == type && a.TargetId == input.TargetId && (a.Status == AppealStatus.Pending || a.AppellantId == uid))
            .Select(a => a.Status).ToListAsync();
        if (prior.Contains(AppealStatus.Pending)) throw AppException.Conflict("An appeal for this content is already pending.", "appeal_pending");
        if (prior.Count > 0) throw AppException.Conflict("You have already appealed this decision.", "appeal_already_decided");
        var a = new ModerationAppeal { TargetType = type, TargetId = input.TargetId, CourseId = courseId, AppellantId = uid, Reason = reason };
        db.Set<ModerationAppeal>().Add(a);
        audit.Record("appeal.filed", nameof(ModerationAppeal), a.Id, new { target = type.ToString(), a.TargetId });
        await db.SaveChangesAsync();
        return ToDto(a);
    }

    public async Task<List<AppealDto>> MyAppeals()
    {
        var uid = me.RequireId();
        return (await db.Set<ModerationAppeal>().AsNoTracking().Where(a => a.AppellantId == uid).OrderByDescending(a => a.CreatedAt).Take(200).ToListAsync())
            .Select(ToDto).ToList();
    }

    public async Task<PagedResult<AppealDto>> Appeals(string? status, int page, int pageSize)
    {
        page = Math.Max(1, page); pageSize = Math.Clamp(pageSize, 1, 100);
        var q = db.Set<ModerationAppeal>().AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status)) { var s = ParseEnum<AppealStatus>(status, "Status"); q = q.Where(a => a.Status == s); }
        var total = await q.CountAsync();
        var rows = await q.OrderBy(a => a.CreatedAt).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedResult<AppealDto>(rows.Select(ToDto).ToList(), total, page, pageSize);
    }

    public async Task<AppealDto> DecideAppeal(Guid id, DecideAppealInput input)
    {
        var staff = me.RequireId();
        var decision = (input.Decision ?? "").Trim().ToLowerInvariant() switch
        {
            "uphold" => AppealStatus.Upheld,
            "reinstate" => AppealStatus.Reinstated,
            _ => throw AppException.Bad("decision must be 'Uphold' or 'Reinstate'.", "invalid_decision"),
        };
        var note = Text(input.Note, "Note", 3, 5000);
        await using var tx = await db.Database.BeginTransactionAsync();
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT Id FROM Trust_ModerationAppeals WHERE Id = {id} FOR UPDATE");
        var a = await db.Set<ModerationAppeal>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Appeal");
        if (a.Status != AppealStatus.Pending) throw AppException.Conflict($"Appeal is already {a.Status}.", "appeal_decided");
        if (a.AppellantId == staff) throw AppException.Forbidden("You cannot decide your own appeal.");
        if (decision == AppealStatus.Reinstated)
        {
            switch (a.TargetType)
            {
                case ComplaintTarget.Review:
                    await db.CourseReviews.Where(r => r.Id == a.TargetId).ExecuteUpdateAsync(u => u.SetProperty(r => r.Hidden, false).SetProperty(r => r.UpdatedAt, DateTime.UtcNow));
                    break;
                case ComplaintTarget.Discussion:
                    await db.DiscussionThreads.Where(r => r.Id == a.TargetId).ExecuteUpdateAsync(u => u.SetProperty(r => r.Hidden, false).SetProperty(r => r.UpdatedAt, DateTime.UtcNow));
                    await ModerationNotes.Clear(db, ModerationNote.Thread, a.TargetId);
                    break;
                case ComplaintTarget.DiscussionReply:
                    await db.DiscussionReplies.Where(r => r.Id == a.TargetId).ExecuteUpdateAsync(u => u.SetProperty(r => r.Hidden, false));
                    await ModerationNotes.Clear(db, ModerationNote.Reply, a.TargetId);
                    break;
            }
        }
        a.Status = decision; a.DecidedBy = staff; a.DecisionNote = note; a.DecidedAt = DateTime.UtcNow;
        await Notify([a.AppellantId], decision == AppealStatus.Reinstated ? "Your appeal was accepted and the content is visible again." : "Your appeal was reviewed and the decision was upheld.",
            "/account/appeals");
        audit.Record("appeal.decided", nameof(ModerationAppeal), a.Id, new { decision = decision.ToString(), target = a.TargetType.ToString(), a.TargetId, note });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return ToDto(a);
    }

    private static AppealDto ToDto(ModerationAppeal a) => new(a.Id, a.TargetType, a.TargetId, a.CourseId, a.AppellantId, a.Reason, a.Status,
        a.DecidedBy, a.DecisionNote, a.DecidedAt, a.CreatedAt);
}
