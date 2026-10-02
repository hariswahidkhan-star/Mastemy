namespace Mastemy.Api.Modules.Analytics;

public static class AnalyticsModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddMemoryCache();
        s.AddSingleton<AnalyticsRateLimiter>();
        s.AddScoped<AnalyticsIngestService>();
        s.AddScoped<AnalyticsReportService>();
    }
}
