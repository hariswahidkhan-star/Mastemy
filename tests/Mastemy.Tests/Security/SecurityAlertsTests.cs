using System.Diagnostics.Metrics;
using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Engagement;
using Mastemy.Tests.Trust;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;

namespace Mastemy.Tests.Security;

public class SecurityAlertsFixture : TrustDb;

public sealed class ManualClock(DateTimeOffset start) : TimeProvider
{
    public DateTimeOffset Now { get; set; } = start;
    public override DateTimeOffset GetUtcNow() => Now;
}

public class SecurityAlertsTests(SecurityAlertsFixture fx) : IClassFixture<SecurityAlertsFixture>
{
    private (SecurityAlertNotifier Notifier, ManualClock Clock) Notifier(bool enabled = true)
    {
        var cfg = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
        {
            ["Security:Alerts:Enabled"] = enabled ? "true" : "false",
            ["Security:Alerts:LoginFailuresPerIpThreshold"] = "3",
            ["Security:Alerts:WindowMinutes"] = "5",
            ["Security:Alerts:CooldownMinutes"] = "30",
        }).Build();
        var clock = new ManualClock(new DateTimeOffset(2026, 10, 1, 12, 0, 0, TimeSpan.Zero));
        return (new SecurityAlertNotifier(fx.Factory.Services.GetRequiredService<IServiceScopeFactory>(), cfg, clock,
            NullLogger<SecurityAlertNotifier>.Instance), clock);
    }

    private Task<int> AlertsFor(Guid adminId, string contains) => fx.WithDb(db => db.Notifications
        .CountAsync(n => n.UserId == adminId && n.Kind == NotificationKinds.TrustSafety && n.Title.Contains(contains)));

    [Fact]
    public async Task Login_failures_above_threshold_from_one_ip_notify_admins_once_per_cooldown()
    {
        var (admin, _) = await fx.User(Roles.Admin);
        var (n, clock) = Notifier();
        const string ip = "203.0.113.10";
        for (var i = 0; i < 3; i++) await n.Observe("login_failure", ip, null);
        Assert.Equal(0, await AlertsFor(admin, ip));

        await n.Observe("login_failure", ip, null); // 4 > 3
        Assert.Equal(1, await AlertsFor(admin, ip));

        await n.Observe("login_failure", ip, null); // still above, inside cooldown
        Assert.Equal(1, await AlertsFor(admin, ip));

        await n.Observe("login_failure", "203.0.113.11", null); // other IPs are counted separately
        Assert.Equal(0, await AlertsFor(admin, "203.0.113.11"));

        clock.Now = clock.Now.AddMinutes(31); // cooldown over, but the old failures left the window
        await n.Observe("login_failure", ip, null);
        Assert.Equal(1, await AlertsFor(admin, ip));
    }

    [Fact]
    public async Task Failures_spread_beyond_the_window_do_not_alert()
    {
        var (admin, _) = await fx.User(Roles.SuperAdmin);
        var (n, clock) = Notifier();
        const string ip = "198.51.100.7";
        for (var i = 0; i < 8; i++)
        {
            await n.Observe("login_failure", ip, null);
            clock.Now = clock.Now.AddMinutes(2); // at most 3 inside any 5-minute window
        }
        Assert.Equal(0, await AlertsFor(admin, ip));
    }

    [Fact]
    public async Task Any_refresh_token_reuse_notifies_admins_but_not_students()
    {
        var (admin, _) = await fx.User(Roles.Admin);
        var (student, _) = await fx.User(Roles.Student);
        var (n, _) = Notifier();
        var victim = Guid.NewGuid();
        await n.Observe("token_reuse", "192.0.2.1", victim);
        Assert.Equal(1, await AlertsFor(admin, victim.ToString()));
        Assert.Equal(0, await AlertsFor(student, victim.ToString()));
        await n.Observe("token_reuse", "192.0.2.1", victim); // cooldown per user
        Assert.Equal(1, await AlertsFor(admin, victim.ToString()));
    }

    [Fact]
    public async Task Disabled_notifier_sends_nothing()
    {
        var (admin, _) = await fx.User(Roles.Admin);
        var (n, _) = Notifier(enabled: false);
        var victim = Guid.NewGuid();
        await n.Observe("token_reuse", "192.0.2.2", victim);
        for (var i = 0; i < 10; i++) await n.Observe("login_failure", "192.0.2.2", null);
        Assert.Equal(0, await AlertsFor(admin, victim.ToString()));
        Assert.Equal(0, await AlertsFor(admin, "192.0.2.2"));
    }

    [Theory]
    [InlineData("login_failed_bad_password", null, "login_failure")]
    [InlineData("login_failed_unknown_user", null, "login_failure")]
    [InlineData("invalid_mfa_code", 401, "mfa_failure")]
    [InlineData("refresh_token_reuse", null, "token_reuse")]
    [InlineData("rate_limited", null, "rate_limited")]
    [InlineData("course_forbidden", 403, "forbidden")]
    [InlineData("whatever", 401, "unauthorized")]
    public void Events_are_classified(string evt, int? status, string expected) => Assert.Equal(expected, SecurityMetrics.Category(evt, status));

    [Fact]
    public async Task Failed_logins_and_forbidden_responses_increment_the_security_counter()
    {
        var seen = new List<(string Category, string Event)>();
        using var listener = new MeterListener();
        listener.InstrumentPublished = (inst, l) =>
        {
            if (inst.Meter.Name == SecurityMetrics.MeterName && inst.Name == SecurityMetrics.EventsCounter) l.EnableMeasurementEvents(inst);
        };
        listener.SetMeasurementEventCallback<long>((_, _, tags, _) =>
        {
            string? c = null, e = null;
            foreach (var t in tags) { if (t.Key == "category") c = (string?)t.Value; if (t.Key == "event") e = (string?)t.Value; }
            lock (seen) seen.Add((c!, e!));
        });
        listener.Start();

        var anon = fx.Factory.CreateClient();
        var login = await anon.PostAsJsonAsync("/api/auth/login", new { email = $"nobody-{Guid.NewGuid():N}@test.local", password = "wrong-password-123" });
        Assert.Equal(HttpStatusCode.Unauthorized, login.StatusCode);

        var (_, student) = await fx.User(Roles.Student);
        var admin = await student.GetAsync("/api/admin/users/lookup?q=x");
        Assert.Equal(HttpStatusCode.Forbidden, admin.StatusCode);

        lock (seen)
        {
            Assert.Contains(("login_failure", "login_failed_unknown_user"), seen);
            Assert.Contains(seen, s => s.Category == "forbidden");
        }
    }
}
