namespace Mastemy.Api.Modules.Commerce;

public static class CommerceModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddHttpClient(StripePaymentProvider.HttpClientName, c => c.Timeout = TimeSpan.FromSeconds(30));
        s.AddScoped<IPaymentProvider, StripePaymentProvider>();
        s.AddScoped<CommerceService>();
        s.AddScoped<PricingService>();
        s.AddScoped<LedgerService>();
        s.AddScoped<InvoiceService>();
        s.AddScoped<FulfillmentService>();
        s.AddScoped<FinanceService>();
        s.AddScoped<SubscriptionService>();
        s.AddScoped<GiftService>();
        s.AddScoped<OrderBrowserService>();
        s.AddScoped<ConsumptionRecorder>();
        s.AddHostedService<CommerceJobs>();
    }
}

/// <summary>
/// Commerce maintenance loop (Commerce:BackgroundJobsEnabled, default true; every Commerce:JobIntervalMinutes, default 60):
/// ends subscriptions whose payment grace period expired, materialises subscription entitlements for newly published
/// in-scope courses, and allocates the previous month's subscription pool once Commerce:PoolAllocationDelayDays
/// (default 3, leaves time for late refunds) have passed. Every step is idempotent.
/// </summary>
public class CommerceJobs(IServiceScopeFactory scopes, IConfiguration cfg, ILogger<CommerceJobs> log) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        if (!cfg.GetValue("Commerce:BackgroundJobsEnabled", true)) return;
        var interval = TimeSpan.FromMinutes(Math.Clamp(cfg.GetValue("Commerce:JobIntervalMinutes", 60), 1, 24 * 60));
        while (!ct.IsCancellationRequested)
        {
            try
            {
                using var scope = scopes.CreateScope();
                var subs = scope.ServiceProvider.GetRequiredService<SubscriptionService>();
                var (ended, synced) = await subs.Maintain();
                if (ended > 0) log.LogInformation("Ended {Count} subscriptions after grace period; synced {Synced}", ended, synced);
                var now = DateTime.UtcNow;
                var delay = Math.Clamp(cfg.GetValue("Commerce:PoolAllocationDelayDays", 3), 0, 27);
                if (now.Day > delay)
                {
                    var prev = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(-1);
                    var allocations = await subs.AllocatePool(prev.Year, prev.Month);
                    foreach (var a in allocations)
                        log.LogInformation("Allocated subscription pool {Year}-{Month} {Currency}: {Allocated} of {Pool}", a.Year, a.Month, a.Currency, a.Allocated, a.Pool);
                }
            }
            catch (OperationCanceledException) when (ct.IsCancellationRequested) { break; }
            catch (Exception ex) { log.LogError(ex, "Commerce maintenance failed"); }
            try { await Task.Delay(interval, ct); } catch (OperationCanceledException) { break; }
        }
    }
}
