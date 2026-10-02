using Mastemy.Api.Modules.Ai;
using Mastemy.Api.Modules.Analytics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Analytics;

public class RetentionAndAiUsageTests(AnalyticsFixture f) : IClassFixture<AnalyticsFixture>
{
    [Fact]
    public async Task Retention_job_purges_events_older_than_the_retention_window()
    {
        var now = DateTime.UtcNow;
        var tag = Guid.NewGuid().ToString("N")[..12];
        await f.WithDb(async db =>
        {
            db.Set<AnalyticsEvent>().AddRange(
                new AnalyticsEvent { Type = "page_view", AnonId = tag + "old", OccurredAt = now.AddDays(-AnalyticsRetentionWorker.DefaultRetentionDays - 5) },
                new AnalyticsEvent { Type = "page_view", AnonId = tag + "edge", OccurredAt = now.AddDays(-AnalyticsRetentionWorker.DefaultRetentionDays + 1) },
                new AnalyticsEvent { Type = "page_view", AnonId = tag + "new", OccurredAt = now.AddDays(-1) });
            await db.SaveChangesAsync();
        });
        var worker = f.Factory.Services.GetRequiredService<AnalyticsRetentionWorker>();
        Assert.Equal(395, worker.RetentionDays);
        Assert.True(await worker.PurgeOnce(now) >= 1);
        List<string> left = [];
        await f.WithDb(async db => left = await db.Set<AnalyticsEvent>().Where(e => e.AnonId.StartsWith(tag)).Select(e => e.AnonId).ToListAsync());
        Assert.Equal(new[] { tag + "edge", tag + "new" }, left.OrderBy(x => x));
        Assert.Equal(0, await worker.PurgeOnce(now)); // idempotent
    }

    [Fact]
    public async Task Admin_dashboard_reports_ai_usage_totals_for_the_period()
    {
        var from = new DateTime(2021, 3, 1, 0, 0, 0, DateTimeKind.Utc);
        var to = new DateTime(2021, 4, 1, 0, 0, 0, DateTimeKind.Utc);
        var u1 = Guid.NewGuid(); var u2 = Guid.NewGuid();
        await f.WithDb(async db =>
        {
            db.Set<AiUsageRecord>().AddRange(
                new AiUsageRecord { UserId = u1, Feature = "tutor", Model = "m", InputTokens = 100, OutputTokens = 50, CostEstimate = 0.10m, Period = "2021-03", CreatedAt = from.AddDays(2) },
                new AiUsageRecord { UserId = u1, Feature = "tutor", Model = "m", InputTokens = 200, OutputTokens = 70, CacheReadTokens = 30, CostEstimate = 0.20m, Period = "2021-03", CreatedAt = from.AddDays(3) },
                new AiUsageRecord { UserId = u2, Feature = "mcq_drafts", Model = "m", InputTokens = 1000, OutputTokens = 900, CostEstimate = 1.50m, Period = "2021-03", CreatedAt = from.AddDays(10) },
                // Outside the period.
                new AiUsageRecord { UserId = u2, Feature = "tutor", Model = "m", InputTokens = 9999, OutputTokens = 9999, CostEstimate = 99m, Period = "2021-04", CreatedAt = to.AddDays(1) });
            await db.SaveChangesAsync();
        });
        var d = await f.Read<AdminDashboardDto>(await f.Client(f.Admin).GetAsync($"/api/admin/analytics/dashboard?from={from:O}&to={to:O}&bucket=month"));
        var ai = d.AiUsage;
        Assert.Equal((3L, 2L, 1300L, 1020L, 30L, 1.80m), (ai.Calls, ai.DistinctUsers, ai.InputTokens, ai.OutputTokens, ai.CacheReadTokens, ai.CostEstimate));
        Assert.Equal(["mcq_drafts", "tutor"], ai.ByFeature.Select(x => x.Feature).ToList()); // highest cost first
        var tutor = ai.ByFeature.Single(x => x.Feature == "tutor");
        Assert.Equal((2L, 300L, 120L, 0.30m), (tutor.Calls, tutor.InputTokens, tutor.OutputTokens, tutor.CostEstimate));
    }
}
