namespace Mastemy.Api.Modules.Operations;

public static class OperationsModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        var opt = cfg.GetSection("Operations").Get<OperationsOptions>() ?? new OperationsOptions();
        if (opt.OutboxDegradedMinutes <= 0 || opt.OverdueContentMonths is < 1 or > 120)
            throw new InvalidOperationException("Operations:OutboxDegradedMinutes must be positive and Operations:OverdueContentMonths 1-120.");
        s.AddSingleton(opt);
        s.AddScoped<QualityQueueService>();

        s.AddHealthChecks()
            .AddCheck<MySqlHealthCheck>("mysql", tags: ["ready"], timeout: TimeSpan.FromSeconds(5))
            .AddCheck<ResourceStorageHealthCheck>("resource_storage", tags: ["ready"], timeout: TimeSpan.FromSeconds(5))
            .AddCheck<OutboxBacklogHealthCheck>("email_outbox", tags: ["ready"], timeout: TimeSpan.FromSeconds(5))
            .AddCheck<MalwareScannerHealthCheck>("malware_scanner", tags: ["ready"], timeout: TimeSpan.FromSeconds(5));

        Observability.Add(s, cfg);
    }
}
