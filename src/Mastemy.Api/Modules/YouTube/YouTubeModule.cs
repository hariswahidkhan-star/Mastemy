namespace Mastemy.Api.Modules.YouTube;

public static class YouTubeModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.Configure<YouTubeOptions>(cfg.GetSection("YouTube"));

        s.AddHttpClient(YouTubeOptions.HttpClientName, c => c.Timeout = TimeSpan.FromSeconds(30));
        // Upload relay: long per-chunk timeout; never follow redirects (308 is YouTube's "resume incomplete").
        s.AddHttpClient(YouTubeOptions.UploadHttpClientName, c => c.Timeout = TimeSpan.FromMinutes(30))
            .ConfigurePrimaryHttpMessageHandler(() => new SocketsHttpHandler { AllowAutoRedirect = false, PooledConnectionLifetime = TimeSpan.FromMinutes(10) });

        s.AddScoped<IYouTubeMetadataClient, YouTubeMetadataClient>();
        s.AddScoped<GoogleOAuthClient>();
        s.AddScoped<ChannelPolicy>();
        s.AddScoped<ChannelService>();
        s.AddSingleton<OAuthNonceStore>();
        s.AddScoped<VideoLinkService>();
        s.AddScoped<PlaylistImportService>();
        s.AddScoped<UploadRelayService>();
        s.AddScoped<AvailabilityCheckService>();
        s.AddHostedService<AvailabilityCheckerHostedService>();
    }
}
