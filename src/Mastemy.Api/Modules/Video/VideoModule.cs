namespace Mastemy.Api.Modules.Video;

public static class VideoModule
{
    public static IServiceCollection AddVideoProviders(this IServiceCollection services)
    {
        services.AddScoped<IVideoProvider, YouTubeVideoProvider>();
        services.AddScoped<VideoProviderRegistry>();
        return services;
    }
}
