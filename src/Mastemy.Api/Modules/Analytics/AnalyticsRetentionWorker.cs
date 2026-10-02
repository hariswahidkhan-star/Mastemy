using Mastemy.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Analytics;

/// <summary>
/// Deletes product analytics events older than <c>Analytics:EventRetentionDays</c> (default 395 ≈ 13 months, so
/// year-over-year comparisons still work). Runs every <c>Analytics:RetentionIntervalHours</c> (default 24) in bounded
/// batches so a large backlog never holds long locks. Disable with <c>Analytics:RetentionEnabled=false</c>.
/// </summary>
public class AnalyticsRetentionWorker(IServiceScopeFactory scopes, ILogger<AnalyticsRetentionWorker> log, IConfiguration cfg) : BackgroundService
{
    public const int DefaultRetentionDays = 395, BatchSize = 5000;

    public int RetentionDays => Math.Clamp(cfg.GetValue("Analytics:EventRetentionDays", DefaultRetentionDays), 1, 3650);

    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        if (!cfg.GetValue("Analytics:RetentionEnabled", true)) return;
        var interval = TimeSpan.FromHours(Math.Clamp(cfg.GetValue("Analytics:RetentionIntervalHours", 24), 1, 168));
        try { await Task.Delay(TimeSpan.FromMinutes(2), ct); } catch (OperationCanceledException) { return; }
        while (!ct.IsCancellationRequested)
        {
            try
            {
                var n = await PurgeOnce(DateTime.UtcNow, ct);
                if (n > 0) log.LogInformation("Analytics retention purged {Count} events older than {Days} days", n, RetentionDays);
            }
            catch (Exception ex) when (ex is not OperationCanceledException) { log.LogError(ex, "Analytics retention run failed"); }
            try { await Task.Delay(interval, ct); } catch (OperationCanceledException) { return; }
        }
    }

    /// <summary>Deletes every event that occurred before now - retention. Returns the number deleted.</summary>
    public async Task<int> PurgeOnce(DateTime nowUtc, CancellationToken ct = default)
    {
        using var scope = scopes.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var cutoff = nowUtc.AddDays(-RetentionDays);
        var total = 0;
        while (!ct.IsCancellationRequested)
        {
            var ids = await db.Set<AnalyticsEvent>().AsNoTracking().Where(e => e.OccurredAt < cutoff)
                .OrderBy(e => e.Id).Select(e => e.Id).Take(BatchSize).ToListAsync(ct);
            if (ids.Count == 0) break;
            total += await db.Set<AnalyticsEvent>().Where(e => ids.Contains(e.Id)).ExecuteDeleteAsync(ct);
            if (ids.Count < BatchSize) break;
        }
        return total;
    }
}
