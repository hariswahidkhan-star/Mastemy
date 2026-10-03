namespace Mastemy.Api.Modules.Ai;

public static class AiModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        var opt = cfg.GetSection("Ai").Get<AiOptions>() ?? new AiOptions();
        if (string.IsNullOrWhiteSpace(opt.Model)) throw new InvalidOperationException("Ai:Model must not be empty.");
        if (opt.TutorMaxOutputTokens <= 0 || opt.GenerationMaxOutputTokens <= 0) throw new InvalidOperationException("Ai output token caps must be positive.");
        if (!Uri.TryCreate(opt.BaseUrl, UriKind.Absolute, out _)) throw new InvalidOperationException("Ai:BaseUrl must be an absolute URL.");
        s.AddSingleton(opt);
        s.AddMemoryCache();
        s.AddHttpClient(AnthropicProvider.HttpClientName, c => c.Timeout = TimeSpan.FromSeconds(Math.Max(10, opt.TimeoutSeconds)));
        s.AddSingleton<IAiProvider, AnthropicProvider>();
        s.AddSingleton<AiRateLimiter>();
        s.AddScoped<AiBudgetService>();
        s.AddScoped<AiAssessmentGuard>();
        s.AddScoped<AiIndexer>();
        s.AddScoped<AiTutorService>();
        s.AddScoped<AiAssistService>();
        s.AddScoped<FeynmanService>();
        s.AddScoped<AiCoachService>();
        s.AddScoped<AdaptiveExerciseService>();
        s.AddHostedService<AiMaintenanceWorker>();
    }
}
