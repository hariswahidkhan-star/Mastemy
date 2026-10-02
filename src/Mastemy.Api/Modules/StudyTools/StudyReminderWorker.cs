using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.StudyTools;

/// <summary>
/// Hourly study-session reminders. For plans with reminders enabled, each session starting within the next hour produces one
/// in-app notification (kind <c>study_reminder</c>) unless the user turned that kind off. Items are claimed with a conditional
/// UPDATE (ReminderSentAt IS NULL), so several API instances never send the same reminder twice.
/// </summary>
public class StudyReminderWorker(IServiceScopeFactory scopes, ILogger<StudyReminderWorker> log, IConfiguration cfg) : BackgroundService
{
    public const string Kind = "study_reminder";

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        if (!cfg.GetValue("StudyTools:RemindersEnabled", true)) return;
        var interval = TimeSpan.FromMinutes(Math.Clamp(cfg.GetValue("StudyTools:ReminderIntervalMinutes", 60), 1, 1440));
        try { await Task.Delay(TimeSpan.FromSeconds(30), ct); } catch (OperationCanceledException) { return; }
        while (!ct.IsCancellationRequested)
        {
            try { await RunOnce(DateTime.UtcNow, interval, ct); }
            catch (Exception ex) when (ex is not OperationCanceledException) { log.LogError(ex, "Study reminder run failed"); }
            try { await Task.Delay(interval, ct); } catch (OperationCanceledException) { return; }
        }
    }

    /// <summary>Sends reminders for sessions starting in (now - window, now + window]. Returns notifications created.</summary>
    public async Task<int> RunOnce(DateTime nowUtc, TimeSpan window, CancellationToken ct = default)
    {
        using var scope = scopes.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var due = await (from i in db.Set<StudyPlanItem>().AsNoTracking()
                         join p in db.Set<StudyPlan>().AsNoTracking() on i.PlanId equals p.Id
                         where p.RemindersEnabled && i.ReminderSentAt == null && i.ScheduledAt > nowUtc - window && i.ScheduledAt <= nowUtc + window
                         orderby i.ScheduledAt, i.SortOrder
                         select new { i.Id, i.UserId, i.ScheduledAt, i.CourseTitle, i.LessonId, i.SortOrder, p.TimeZone }).Take(5000).ToListAsync(ct);
        var created = 0;
        foreach (var session in due.GroupBy(x => new { x.UserId, x.ScheduledAt }))
        {
            var ids = session.Select(x => x.Id).ToList();
            var claimed = await db.Set<StudyPlanItem>().Where(i => ids.Contains(i.Id) && i.ReminderSentAt == null)
                .ExecuteUpdateAsync(s => s.SetProperty(i => i.ReminderSentAt, nowUtc), ct);
            if (claimed == 0) continue; // another instance took it
            var optedOut = await db.NotificationPreferences.AnyAsync(p => p.UserId == session.Key.UserId && p.Kind == Kind && !p.InApp, ct);
            if (optedOut) continue;
            var first = session.OrderBy(x => x.SortOrder).First();
            var tz = StudyPlanService.Zone(first.TimeZone);
            var local = TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(session.Key.ScheduledAt, DateTimeKind.Utc), tz);
            var zoneLabel = tz == TimeZoneInfo.Utc ? "UTC" : tz.Id;
            var title = $"Study session at {local:HH:mm} {zoneLabel}: {first.CourseTitle} ({session.Count()} lesson{(session.Count() == 1 ? "" : "s")})";
            db.Notifications.Add(new Notification
            {
                UserId = session.Key.UserId, Kind = Kind, Title = title.Length > 300 ? title[..300] : title, Link = "/me/study-plan",
            });
            await db.SaveChangesAsync(ct);
            created++;
        }
        return created;
    }
}
