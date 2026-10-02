namespace Mastemy.Api.Modules.Messaging;

public static class MessagingModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        var opt = cfg.GetSection("Messaging").Get<MessagingOptions>() ?? new MessagingOptions();
        if (opt.MaxPerHour <= 0 || opt.MaxPerDay <= 0 || opt.MaxBodyLength is < 1 or > 20_000)
            throw new InvalidOperationException("Messaging:MaxPerHour, MaxPerDay must be positive and MaxBodyLength 1-20000.");
        s.AddSingleton(opt);
        s.AddScoped<MessagingService>();
        s.AddSingleton<AutoMessageWorker>();
        s.AddHostedService(sp => sp.GetRequiredService<AutoMessageWorker>());
    }
}
