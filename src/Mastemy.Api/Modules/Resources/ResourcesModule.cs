namespace Mastemy.Api.Modules.Resources;

public static class ResourcesModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        var opt = cfg.GetSection("Resources").Get<ResourceOptions>() ?? new ResourceOptions();
        if (opt.MaxFileBytes <= 0 || opt.PerCourseQuotaBytes <= 0)
            throw new InvalidOperationException("Resources:MaxFileBytes and Resources:PerCourseQuotaBytes must be positive.");
        if (opt.TranscriptPerMinute <= 0) throw new InvalidOperationException("Resources:TranscriptPerMinute must be positive.");
        s.AddSingleton(opt);
        s.AddSingleton<IResourceStorage, LocalDiskResourceStorage>();
        s.AddScoped<ResourceService>();
        s.AddScoped<ResourceBlobJanitor>();
        s.AddSingleton<CaptionCueCache>();
        s.AddSingleton<TranscriptRateLimiter>();
    }
}
