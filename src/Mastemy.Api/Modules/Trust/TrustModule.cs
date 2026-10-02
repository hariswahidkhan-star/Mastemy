using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Trust;

public static class TrustModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        var scan = cfg.GetSection("Scanning").Get<ScanningOptions>() ?? new ScanningOptions();
        if (scan.ClamAvPort is <= 0 or > 65535) throw new InvalidOperationException("Scanning:ClamAvPort must be a valid TCP port.");
        s.AddSingleton(scan);
        if (string.IsNullOrWhiteSpace(scan.ClamAvHost)) s.AddSingleton<IMalwareScanner, NullScanner>();
        else s.AddSingleton<IMalwareScanner, ClamAvScanner>();
        s.AddSingleton<MalwareScanPolicy>();

        s.AddScoped<TrustService>();
        s.AddSingleton<ComplaintRateLimiter>();
        s.AddScoped<TrustGuardFilter>();
        s.Configure<MvcOptions>(o => o.Filters.AddService<TrustGuardFilter>());
        s.AddHostedService<HeldEarningsSweeper>();
    }
}
