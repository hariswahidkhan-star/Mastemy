using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.YouTube;

public record AvailabilityRunResult(int Checked, int Changed, bool QuotaExhausted);

/// <summary>One pass of the periodic availability check: Ready videos of live courses, 50 ids per videos.list call.</summary>
public class AvailabilityCheckService(AppDbContext db, IYouTubeMetadataClient yt, ILogger<AvailabilityCheckService> log)
{
    public async Task<AvailabilityRunResult> RunOnce(CancellationToken ct)
    {
        if (!yt.HasApiKey) return new(0, 0, false);
        var assetIds = await db.Lessons.Where(l => l.VideoAssetId != null)
            .Join(db.Modules, l => l.ModuleId, m => m.Id, (l, m) => new { l.VideoAssetId, m.CourseId })
            .Join(db.Courses.Where(AccessService.IsLiveExpr), x => x.CourseId, c => c.Id, (x, c) => x.VideoAssetId!.Value)
            .Distinct().ToListAsync(ct);

        var assets = await db.VideoAssets.Where(a => assetIds.Contains(a.Id) && a.Status == VideoStatus.Ready)
            .OrderBy(a => a.LastCheckedAt).ToListAsync(ct);
        var channelIds = await db.YouTubeChannels.ToDictionaryAsync(c => c.Id, c => c.ChannelId, ct);

        int checkedCount = 0, changed = 0;
        foreach (var batch in assets.Chunk(50))
        {
            IReadOnlyDictionary<string, VideoMetadata> map;
            try { map = await yt.GetVideosAsync(batch.Select(a => a.YouTubeVideoId).Distinct().ToList(), ct); }
            catch (YouTubeApiException ex) when (ex.IsQuota)
            {
                log.LogWarning("YouTube quota exhausted during availability check; {Checked} checked this run.", checkedCount);
                await db.SaveChangesAsync(ct);
                return new(checkedCount, changed, true);
            }
            foreach (var a in batch)
            {
                var expected = a.ChannelId is { } cid ? channelIds.GetValueOrDefault(cid) ?? "" : "";
                var before = a.Status;
                VideoLinkService.Apply(a, map.GetValueOrDefault(a.YouTubeVideoId), expected);
                checkedCount++;
                if (a.Status != before)
                {
                    changed++;
                    db.AuditLogs.Add(new AuditLog
                    {
                        Action = "video.availability_changed", EntityType = "VideoAsset", EntityId = a.Id.ToString(),
                        Details = System.Text.Json.JsonSerializer.Serialize(new { from = before.ToString(), to = a.Status.ToString(), reason = a.StatusReason }),
                    });
                }
            }
            await db.SaveChangesAsync(ct);
        }
        return new(checkedCount, changed, false);
    }
}

/// <summary>Runs <see cref="AvailabilityCheckService"/> every YouTube:RecheckHours (default 24) when an API key is configured.</summary>
public class AvailabilityCheckerHostedService(IServiceScopeFactory scopes, IOptions<YouTubeOptions> options, ILogger<AvailabilityCheckerHostedService> log)
    : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var o = options.Value;
        if (!o.HasApiKey || o.RecheckHours <= 0)
        {
            log.LogInformation("YouTube availability checker disabled (no API key or RecheckHours <= 0).");
            return;
        }
        var interval = TimeSpan.FromHours(Math.Max(0.05, o.RecheckHours));
        try { await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); } catch (OperationCanceledException) { return; }
        using var timer = new PeriodicTimer(interval);
        do
        {
            try
            {
                using var scope = scopes.CreateScope();
                var r = await scope.ServiceProvider.GetRequiredService<AvailabilityCheckService>().RunOnce(stoppingToken);
                log.LogInformation("YouTube availability check: {Checked} checked, {Changed} changed, quota exhausted: {Quota}", r.Checked, r.Changed, r.QuotaExhausted);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested) { return; }
            catch (Exception ex) { log.LogError(ex, "YouTube availability check failed"); }
        } while (await WaitNext(timer, stoppingToken));
    }

    private static async Task<bool> WaitNext(PeriodicTimer t, CancellationToken ct)
    {
        try { return await t.WaitForNextTickAsync(ct); } catch (OperationCanceledException) { return false; }
    }
}
