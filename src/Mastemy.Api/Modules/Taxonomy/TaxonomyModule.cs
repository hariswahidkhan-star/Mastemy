using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.Taxonomy;

public static class TaxonomyModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddMemoryCache();
        s.Configure<TaxonomyOptions>(cfg.GetSection("Taxonomy"));
        s.AddScoped<SkillService>();
        s.AddScoped<CertificationService>();
        s.AddScoped<DiscoveryService>();
        s.AddScoped<BestsellerService>();
        s.AddScoped<InstructorDirectoryService>();
        s.AddScoped<BacklogService>();
        s.AddHostedService<TaxonomyDailyJob>();
    }
}

/// <summary>Daily: recompute bestseller stats and flag stale certifications (Taxonomy:DailyJobEnabled / DailyJobIntervalHours).</summary>
public class TaxonomyDailyJob(IServiceScopeFactory scopes, IOptions<TaxonomyOptions> options, ILogger<TaxonomyDailyJob> log) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var o = options.Value;
        if (!o.DailyJobEnabled) { log.LogInformation("Taxonomy daily job disabled."); return; }
        try { await Task.Delay(TimeSpan.FromMinutes(2), stoppingToken); } catch (OperationCanceledException) { return; }
        using var timer = new PeriodicTimer(TimeSpan.FromHours(Math.Max(0.1, o.DailyJobIntervalHours)));
        do
        {
            try
            {
                using var scope = scopes.CreateScope();
                var now = DateTime.UtcNow;
                var best = await scope.ServiceProvider.GetRequiredService<BestsellerService>().Recompute(now);
                var stale = await scope.ServiceProvider.GetRequiredService<CertificationService>().FlagStale(now);
                log.LogInformation("Taxonomy daily job: {Eligible}/{Courses} bestseller-eligible, {Stale} certifications flagged stale",
                    best.Eligible, best.CoursesConsidered, stale);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested) { return; }
            catch (Exception ex) { log.LogError(ex, "Taxonomy daily job failed"); }
            try { if (!await timer.WaitForNextTickAsync(stoppingToken)) return; } catch (OperationCanceledException) { return; }
        } while (true);
    }
}
