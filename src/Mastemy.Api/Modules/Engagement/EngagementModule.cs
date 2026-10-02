namespace Mastemy.Api.Modules.Engagement;

public static class EngagementModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.Configure<EmailOptions>(cfg.GetSection("Email"));
        s.Configure<EmailOutboxOptions>(cfg.GetSection("Email"));
        s.AddSingleton<IEmailSender, SmtpEmailSender>();
        s.AddScoped<EmailOutbox>();
        s.AddSingleton<EmailOutboxWorker>();
        s.AddHostedService(sp => sp.GetRequiredService<EmailOutboxWorker>());
        s.AddScoped<NotificationService>();
        s.AddScoped<INotificationService>(sp => sp.GetRequiredService<NotificationService>());
        s.AddScoped<DiscoveryService>();
        s.AddScoped<DiscussionService>();
        s.AddScoped<AnnouncementService>();
        s.AddScoped<IssueReportService>();
    }
}
