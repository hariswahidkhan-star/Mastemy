using System.Collections.Concurrent;
using System.Diagnostics.Metrics;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Engagement;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Infrastructure;

/// <summary>
/// OpenTelemetry counters for security events (meter "Mastemy.Security"). Every <see cref="SecurityEvents.Warn"/> call
/// increments <c>mastemy.security.events</c> tagged with <c>category</c> (login_failure, mfa_failure, token_reuse,
/// rate_limited, forbidden, unauthorized, other) and the raw <c>event</c> code; 403 responses that never reached a
/// security log point (authorization policies) are counted by <see cref="CountForbiddenResponses"/>.
/// Alert rules on these series: docs/operations/alerts.md.
/// </summary>
public sealed class SecurityMetrics : IDisposable
{
    public const string MeterName = "Mastemy.Security";
    public const string EventsCounter = "mastemy.security.events";
    internal const string RecordedForbiddenItem = "Mastemy.Security.Forbidden.Recorded";
    private readonly Meter _meter;
    private readonly Counter<long> _events;

    public SecurityMetrics(IMeterFactory meters)
    {
        _meter = meters.Create(MeterName);
        _events = _meter.CreateCounter<long>(EventsCounter, unit: "{event}", description: "Security-relevant events (failed logins, MFA failures, token reuse, rate limits, 403s).");
    }

    public static string Category(string evt, int? status = null) => evt switch
    {
        "login_failed_bad_password" or "login_failed_unknown_user" or "login_rejected_backoff" or "invalid_credentials" => "login_failure",
        "invalid_mfa_code" or "invalid_mfa_challenge" => "mfa_failure",
        "refresh_token_reuse" => "token_reuse",
        "rate_limited" => "rate_limited",
        "forbidden" => "forbidden",
        _ => status switch { 403 => "forbidden", 401 => "unauthorized", 429 => "rate_limited", _ => "other" },
    };

    public void Record(string evt, string category) =>
        _events.Add(1, new KeyValuePair<string, object?>("category", category), new KeyValuePair<string, object?>("event", evt));

    /// <summary>Counts 403 responses produced outside the exception handler (e.g. authorization policies).</summary>
    public static IApplicationBuilder CountForbiddenResponses(IApplicationBuilder app) => app.Use(async (ctx, next) =>
    {
        await next();
        if (ctx.Response.StatusCode == StatusCodes.Status403Forbidden && !ctx.Items.ContainsKey(RecordedForbiddenItem))
            ctx.RequestServices.GetRequiredService<SecurityMetrics>().Record("forbidden", "forbidden");
    });

    public void Dispose() => _meter.Dispose();
}

public sealed class SecurityAlertOptions
{
    /// <summary>Built-in in-app alerts to Admins (Security:Alerts:Enabled). Metric-based alerting (alerts.md) is the primary path.</summary>
    public bool Enabled { get; set; } = true;
    public int LoginFailuresPerIpThreshold { get; set; } = 50;
    public int WindowMinutes { get; set; } = 5;
    /// <summary>Minimum time between two alerts for the same key (IP or user).</summary>
    public int CooldownMinutes { get; set; } = 30;
}

/// <summary>
/// Optional threshold notifier: notifies Admins/SuperAdmins in-app (kind trust_safety) when one IP exceeds
/// <see cref="SecurityAlertOptions.LoginFailuresPerIpThreshold"/> login failures within the window, or on any refresh-token
/// reuse. In-memory per instance (a multi-instance deployment should rely on the metric alerts); never throws into the caller.
/// </summary>
public sealed class SecurityAlertNotifier(IServiceScopeFactory scopes, IConfiguration cfg, TimeProvider clock, ILogger<SecurityAlertNotifier> log)
{
    public const string AlertLink = "/admin/audit";
    private readonly SecurityAlertOptions _opt = cfg.GetSection("Security:Alerts").Get<SecurityAlertOptions>() ?? new();
    private readonly ConcurrentDictionary<string, Queue<DateTimeOffset>> _failures = new();
    private readonly ConcurrentDictionary<string, DateTimeOffset> _lastAlert = new();

    public SecurityAlertOptions Options => _opt;

    /// <summary>Feeds one security event; returns the notification task (completed when nothing is sent).</summary>
    public Task Observe(string category, string? ip, Guid? userId)
    {
        if (!_opt.Enabled) return Task.CompletedTask;
        var now = clock.GetUtcNow();
        switch (category)
        {
            case "login_failure" when !string.IsNullOrEmpty(ip):
            {
                var q = _failures.GetOrAdd(ip, _ => new Queue<DateTimeOffset>());
                int count;
                lock (q)
                {
                    q.Enqueue(now);
                    var cutoff = now.AddMinutes(-_opt.WindowMinutes);
                    while (q.Count > 0 && q.Peek() < cutoff) q.Dequeue();
                    count = q.Count;
                }
                if (count > _opt.LoginFailuresPerIpThreshold && TryEnterCooldown("ip:" + ip, now))
                    return Send($"Security alert: {count} failed sign-ins from IP {ip} in {_opt.WindowMinutes} minutes");
                break;
            }
            case "token_reuse":
                if (TryEnterCooldown("reuse:" + (userId?.ToString() ?? ip ?? "-"), now))
                    return Send($"Security alert: refresh-token reuse detected for user {userId?.ToString() ?? "unknown"}; the session family was revoked");
                break;
        }
        return Task.CompletedTask;
    }

    private bool TryEnterCooldown(string key, DateTimeOffset now)
    {
        var cooldown = TimeSpan.FromMinutes(_opt.CooldownMinutes);
        while (true)
        {
            if (_lastAlert.TryGetValue(key, out var last))
            {
                if (now - last < cooldown) return false;
                if (_lastAlert.TryUpdate(key, now, last)) return true;
            }
            else if (_lastAlert.TryAdd(key, now)) return true;
        }
    }

    private async Task Send(string title)
    {
        try
        {
            using var scope = scopes.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var admins = await db.UserRoles.AsNoTracking().Where(r => r.Role == Roles.Admin || r.Role == Roles.SuperAdmin)
                .Select(r => r.UserId).Distinct().ToListAsync();
            if (admins.Count == 0) return;
            await scope.ServiceProvider.GetRequiredService<INotificationService>().Publish(admins, NotificationKinds.TrustSafety, title, AlertLink);
        }
        catch (Exception e)
        {
            log.LogError(e, "Could not deliver security alert {Title}", title);
        }
    }
}
