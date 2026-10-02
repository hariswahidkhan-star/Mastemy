using Mastemy.Api.Data;
using Mastemy.Api.Modules.Engagement;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Messaging;

/// <summary>
/// Delivers instructor welcome messages (on enrollment) and completion messages (when a learner has completed every lesson
/// of the course's current published snapshot). Polls Enrollments and LessonProgress changed since the previous run (with
/// a small overlap). Each (user, course, kind) is claimed with INSERT IGNORE on a unique key before the message is written,
/// in the same transaction, so overlapping runs and several API instances never deliver twice.
/// Config: Messaging:AutoMessagesEnabled (default true), Messaging:AutoMessageIntervalSeconds (default 60).
/// </summary>
public class AutoMessageWorker(IServiceScopeFactory scopes, IConfiguration cfg, ILogger<AutoMessageWorker> log) : BackgroundService
{
    public const string CursorKey = "auto-messages";
    public const int BatchSize = 2000;
    public static readonly TimeSpan Overlap = TimeSpan.FromMinutes(5);

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        if (!cfg.GetValue("Messaging:AutoMessagesEnabled", true)) return;
        var interval = TimeSpan.FromSeconds(Math.Clamp(cfg.GetValue("Messaging:AutoMessageIntervalSeconds", 60), 5, 3600));
        try { await Task.Delay(TimeSpan.FromSeconds(30), ct); } catch (OperationCanceledException) { return; }
        while (!ct.IsCancellationRequested)
        {
            try { await RunOnce(DateTime.UtcNow, ct); }
            catch (Exception ex) when (ex is not OperationCanceledException) { log.LogError(ex, "Auto-message run failed"); }
            try { await Task.Delay(interval, ct); } catch (OperationCanceledException) { return; }
        }
    }

    public record RunResult(int Welcome, int Completion);

    public async Task<RunResult> RunOnce(DateTime nowUtc, CancellationToken ct = default)
    {
        using var scope = scopes.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var notifications = scope.ServiceProvider.GetRequiredService<INotificationService>();
        var autos = await db.Set<CourseAutoMessage>().AsNoTracking().Where(a => a.Enabled && a.EnabledSince != null && a.Body != "").ToListAsync(ct);
        var state = await db.Set<MessagingWorkerState>().FirstOrDefaultAsync(s => s.Key == CursorKey, ct);
        if (autos.Count == 0)
        {
            await SaveCursor(db, state, nowUtc, ct);
            return new RunResult(0, 0);
        }
        var since = state is null ? autos.Min(a => a.EnabledSince!.Value) : state.LastRunAt - Overlap;
        var cursor = nowUtc;

        // ---- welcome: new enrollments ----
        var welcome = autos.Where(a => a.Kind == AutoMessageKind.Welcome).ToDictionary(a => a.CourseId);
        var welcomeCourses = welcome.Keys.ToList();
        var enrollments = welcomeCourses.Count == 0 ? [] : await db.Enrollments.AsNoTracking()
            .Where(e => welcomeCourses.Contains(e.CourseId) && e.CreatedAt > since && e.CreatedAt <= nowUtc)
            .OrderBy(e => e.CreatedAt).Take(BatchSize).Select(e => new { e.UserId, e.CourseId, e.CreatedAt }).ToListAsync(ct);
        if (enrollments.Count == BatchSize) cursor = Min(cursor, enrollments[^1].CreatedAt);
        var sentWelcome = 0;
        foreach (var e in enrollments)
        {
            var a = welcome[e.CourseId];
            if (e.CreatedAt < a.EnabledSince) continue;
            if (await Deliver(db, notifications, a, e.UserId, ct)) sentWelcome++;
        }

        // ---- completion: lessons completed recently, mapped to the course's current snapshot ----
        var completion = autos.Where(a => a.Kind == AutoMessageKind.Completion).ToDictionary(a => a.CourseId);
        var completionCourses = completion.Keys.ToList();
        var sentCompletion = 0;
        if (completionCourses.Count > 0)
        {
            var progress = await (from lp in db.LessonProgress.AsNoTracking()
                                  join sl in db.SnapshotLessons.AsNoTracking() on lp.LessonId equals sl.LessonId
                                  join c in db.Courses.AsNoTracking() on sl.CourseId equals c.Id
                                  where lp.Completed && lp.UpdatedAt > since && lp.UpdatedAt <= nowUtc
                                        && sl.Version == c.PublishedVersion && completionCourses.Contains(c.Id)
                                  orderby lp.UpdatedAt
                                  select new { lp.UserId, CourseId = c.Id, lp.UpdatedAt }).Take(BatchSize).ToListAsync(ct);
            if (progress.Count == BatchSize) cursor = Min(cursor, progress[^1].UpdatedAt);
            foreach (var g in progress.GroupBy(p => (p.UserId, p.CourseId)))
            {
                var a = completion[g.Key.CourseId];
                if (g.Max(x => x.UpdatedAt) < a.EnabledSince) continue;
                if (!await CompletedAll(db, g.Key.UserId, g.Key.CourseId, ct)) continue;
                if (await Deliver(db, notifications, a, g.Key.UserId, ct)) sentCompletion++;
            }
        }

        await SaveCursor(db, state, cursor, ct);
        if (sentWelcome + sentCompletion > 0)
            log.LogInformation("Delivered {Welcome} welcome and {Completion} completion messages", sentWelcome, sentCompletion);
        return new RunResult(sentWelcome, sentCompletion);
    }

    private static DateTime Min(DateTime a, DateTime b) => a < b ? a : b;

    /// <summary>True when the learner has completed every lesson of the course's current published snapshot.</summary>
    public static async Task<bool> CompletedAll(AppDbContext db, Guid userId, Guid courseId, CancellationToken ct = default)
    {
        var version = await db.Courses.Where(c => c.Id == courseId).Select(c => c.PublishedVersion).FirstOrDefaultAsync(ct);
        if (version <= 0) return false;
        var lessons = db.SnapshotLessons.Where(s => s.CourseId == courseId && s.Version == version).Select(s => s.LessonId);
        var total = await lessons.CountAsync(ct);
        if (total == 0) return false;
        var done = await db.LessonProgress.CountAsync(p => p.UserId == userId && p.Completed && lessons.Contains(p.LessonId), ct);
        return done >= total;
    }

    private static async Task SaveCursor(AppDbContext db, MessagingWorkerState? state, DateTime at, CancellationToken ct)
    {
        if (state is null) db.Set<MessagingWorkerState>().Add(new MessagingWorkerState { Key = CursorKey, LastRunAt = at });
        else if (at > state.LastRunAt) state.LastRunAt = at;
        try { await db.SaveChangesAsync(ct); }
        catch (DbUpdateException) { /* another instance created the cursor row concurrently */ }
    }

    /// <summary>Claims (user, course, kind) and writes the message in one transaction. Returns false when already delivered.</summary>
    private static async Task<bool> Deliver(AppDbContext db, INotificationService notifications, CourseAutoMessage a, Guid learnerId, CancellationToken ct)
    {
        await using var tx = await db.Database.BeginTransactionAsync(ct);
        var now = DateTime.UtcNow;
        var claimed = await db.Database.ExecuteSqlInterpolatedAsync(
            $"INSERT IGNORE INTO Messaging_AutoMessageDeliveries (UserId, CourseId, Kind, MessageId, DeliveredAt) VALUES ({learnerId.ToString()}, {a.CourseId.ToString()}, {a.Kind.ToString()}, NULL, {now})", ct);
        if (claimed == 0) return false;
        var sender = await SenderFor(db, a.CourseId, learnerId, ct);
        if (sender is null) { await tx.CommitAsync(ct); return false; } // no eligible sender (or learner blocked them): recorded, skipped
        var conv = await db.Set<Conversation>().AsNoTracking().FirstOrDefaultAsync(c => c.CourseId == a.CourseId && c.LearnerId == learnerId, ct);
        if (conv is null)
        {
            await db.Database.ExecuteSqlInterpolatedAsync(
                $"INSERT IGNORE INTO Messaging_Conversations (Id, CourseId, LearnerId, CreatedAt, LastMessageAt) VALUES ({Guid.NewGuid().ToString()}, {a.CourseId.ToString()}, {learnerId.ToString()}, {now}, {now})", ct);
            conv = await db.Set<Conversation>().AsNoTracking().FirstAsync(c => c.CourseId == a.CourseId && c.LearnerId == learnerId, ct);
        }
        var kind = a.Kind == AutoMessageKind.Welcome ? MessageKind.Welcome : MessageKind.Completion;
        var (msg, _) = await MessagingService.AppendCore(db, notifications, conv, sender.Value, kind, a.Body, [learnerId]);
        await db.Set<AutoMessageDelivery>().Where(d => d.UserId == learnerId && d.CourseId == a.CourseId && d.Kind == a.Kind)
            .ExecuteUpdateAsync(s => s.SetProperty(d => d.MessageId, msg.Id), ct);
        await tx.CommitAsync(ct);
        return true;
    }

    /// <summary>The course owner when still an active instructor, otherwise the first active instructor; none if the learner blocked them.</summary>
    private static async Task<Guid?> SenderFor(AppDbContext db, Guid courseId, Guid learnerId, CancellationToken ct)
    {
        var owner = await db.Courses.Where(c => c.Id == courseId).Select(c => c.OwnerId).FirstOrDefaultAsync(ct);
        var active = await (from ci in db.CourseInstructors
                            join u in db.Users on ci.UserId equals u.Id
                            where ci.CourseId == courseId && !u.IsSuspended && ci.UserId != learnerId
                            orderby ci.Role
                            select ci.UserId).ToListAsync(ct);
        var ordered = active.OrderBy(id => id == owner ? 0 : 1).ToList();
        var blocked = await db.Set<MessageBlock>().Where(b => b.BlockerId == learnerId).Select(b => b.BlockedId).ToListAsync(ct);
        foreach (var id in ordered) if (!blocked.Contains(id)) return id;
        return null;
    }
}
