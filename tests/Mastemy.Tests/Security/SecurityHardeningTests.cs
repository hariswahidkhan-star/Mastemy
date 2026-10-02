using System.Collections.Concurrent;
using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Tests.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace Mastemy.Tests.Security;

public sealed record CapturedLog(string Category, LogLevel Level, string Message, IReadOnlyList<string> Scopes, Exception? Exception);

/// <summary>In-memory logger provider that records messages and their scopes (for redaction / correlation assertions).</summary>
public sealed class CaptureLoggerProvider(ConcurrentQueue<CapturedLog> entries) : ILoggerProvider, ISupportExternalScope
{
    public ConcurrentQueue<CapturedLog> Entries { get; } = entries;
    private IExternalScopeProvider _scopes = new LoggerExternalScopeProvider();
    public void SetScopeProvider(IExternalScopeProvider scopeProvider) => _scopes = scopeProvider;
    public ILogger CreateLogger(string categoryName) => new L(this, categoryName);
    public void Dispose() { }

    private sealed class L(CaptureLoggerProvider p, string category) : ILogger
    {
        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => p._scopes.Push(state);
        public bool IsEnabled(LogLevel logLevel) => true;
        public void Log<TState>(LogLevel level, EventId id, TState state, Exception? ex, Func<TState, Exception?, string> fmt)
        {
            var scopes = new List<string>();
            p._scopes.ForEachScope((s, acc) =>
            {
                if (s is IEnumerable<KeyValuePair<string, object>> kv) acc.AddRange(kv.Select(x => $"{x.Key}={x.Value}"));
                else acc.Add(s?.ToString() ?? "");
            }, scopes);
            p.Entries.Enqueue(new CapturedLog(category, level, fmt(state, ex), scopes, ex));
        }
    }
}

/// <summary>Test-only pipeline hooks: a throwing route (A05 error leakage) and a remote-IP override (trusted proxy tests).</summary>
public sealed class TestHooksStartupFilter : IStartupFilter
{
    public const string RemoteIpHeader = "X-Test-Remote-Ip";

    public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next) => app =>
    {
        app.Use(async (ctx, nxt) =>
        {
            if (ctx.Request.Headers.TryGetValue(RemoteIpHeader, out var ip)) ctx.Connection.RemoteIpAddress = IPAddress.Parse(ip!);
            await nxt();
        });
        next(app);
        app.Run(ctx =>
        {
            if (ctx.Request.Path == "/__test/throw") throw new InvalidOperationException("secret-internal-detail at Mastemy.Internal.Thing");
            ctx.Response.StatusCode = StatusCodes.Status404NotFound;
            return Task.CompletedTask;
        });
    };
}

/// <summary>Builds API instances (Development / Production) over one throwaway database, with log capture.</summary>
public sealed class HardeningFixture : IAsyncLifetime
{
    private readonly string _dbName = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public string ConnectionString => $"Server=localhost;Port=3306;Database={_dbName};User=mastemy;Password=mastemy_dev_pw;";
    /// <summary>Shared sink; each app gets its own provider (scope providers are per logger factory).</summary>
    public ConcurrentQueue<CapturedLog> LogEntries { get; } = new();
    public WebApplicationFactory<Program> Dev { get; private set; } = null!;
    public WebApplicationFactory<Program> Prod { get; private set; } = null!;

    public WebApplicationFactory<Program> Build(string env, params (string Key, string Value)[] settings) =>
        new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseEnvironment(env);
            b.UseSetting("ConnectionStrings:Default", ConnectionString);
            b.UseSetting("Jwt:Key", "test-signing-key-hardening-0123456789-abcdef");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("RateLimits:AuthPerMinute", "10000");
            b.UseSetting("RateLimits:LoginPerEmailPerMinute", "10000");
            b.UseSetting("Cors:Origins:0", "https://app.mastemy.test");
            b.UseSetting("Network:TrustedProxies:0", "10.0.0.0/8");
            foreach (var (k, v) in settings) b.UseSetting(k, v);
            b.ConfigureTestServices(s =>
            {
                s.AddSingleton<IStartupFilter, TestHooksStartupFilter>();
                s.AddSingleton<ILoggerProvider>(new CaptureLoggerProvider(LogEntries));
            });
        });

    public async Task InitializeAsync()
    {
        Dev = Build("Development");
        Prod = Build("Production");
        await using var db = NewDb();
        await db.Database.EnsureCreatedAsync();
    }

    public async Task DisposeAsync()
    {
        await using (var db = NewDb()) await db.Database.EnsureDeletedAsync();
        await Dev.DisposeAsync();
        await Prod.DisposeAsync();
    }

    public AppDbContext NewDb() => new(new DbContextOptionsBuilder<AppDbContext>().UseMySQL(ConnectionString).Options);

    public async Task<User> CreateUser(params string[] roles)
    {
        var email = $"h{Guid.NewGuid():N}@example.com";
        var u = new User { Email = email, NormalizedEmail = email, DisplayName = "Hardening User", PasswordHash = PasswordHasher.Hash(IdentityFixture.Password) };
        foreach (var r in roles.DefaultIfEmpty(Roles.Student)) u.Roles.Add(new UserRole { UserId = u.Id, Role = r });
        await using var db = NewDb();
        db.Users.Add(u);
        await db.SaveChangesAsync();
        return u;
    }

    public async Task<HttpClient> As(WebApplicationFactory<Program> app, User u)
    {
        var c = app.CreateClient();
        var res = await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = IdentityFixture.Password });
        res.EnsureSuccessStatusCode();
        var auth = (await res.Content.ReadFromJsonAsync<Mastemy.Api.Modules.Identity.AuthResponse>(IdentityFixture.Json))!;
        c.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", auth.AccessToken);
        return c;
    }
}

public class SecurityHardeningTests(HardeningFixture f) : IClassFixture<HardeningFixture>
{
    private static string? H(HttpResponseMessage r, string name) =>
        r.Headers.TryGetValues(name, out var v) ? string.Join(",", v)
        : r.Content.Headers.TryGetValues(name, out var c) ? string.Join(",", c) : null;

    // ---------- A05: security headers ----------
    [Theory]
    [InlineData("/health")]
    [InlineData("/api/categories")]
    [InlineData("/api/me/profile")] // 401
    [InlineData("/api/does-not-exist")] // 404
    public async Task Every_response_carries_baseline_security_headers(string url)
    {
        var r = await f.Prod.CreateClient().GetAsync(url);
        Assert.Equal("nosniff", H(r, "X-Content-Type-Options"));
        Assert.Equal("strict-origin-when-cross-origin", H(r, "Referrer-Policy"));
        Assert.Equal("same-origin", H(r, "Cross-Origin-Opener-Policy"));
        Assert.Equal("same-site", H(r, "Cross-Origin-Resource-Policy"));
        Assert.Contains("camera=()", H(r, "Permissions-Policy"));
        Assert.Equal(SecurityHeaders.JsonCsp, H(r, "Content-Security-Policy"));
        Assert.Null(H(r, "Server"));
        Assert.Null(H(r, "X-Powered-By"));
    }

    [Fact]
    public async Task File_responses_get_a_sandboxed_csp()
    {
        var r = await f.Prod.CreateClient().GetAsync("/api/templates/mcq-import.csv");
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        Assert.Equal(SecurityHeaders.FileCsp, H(r, "Content-Security-Policy"));
        // Content-Disposition is produced by the framework (quoted filename + RFC 5987 filename*), never by concatenation.
        Assert.Equal("attachment", r.Content.Headers.ContentDisposition?.DispositionType);
    }

    [Fact]
    public async Task Authenticated_json_is_never_cached()
    {
        var c = await f.As(f.Prod, await f.CreateUser());
        var r = await c.GetAsync("/api/auth/sessions");
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        Assert.Contains("no-store", H(r, "Cache-Control"));
        var login = await f.Prod.CreateClient().PostAsJsonAsync("/api/auth/login", new { email = "nobody@example.com", password = "x" });
        Assert.Contains("no-store", H(login, "Cache-Control"));
    }

    [Fact]
    public async Task Hsts_only_over_https_or_trusted_proxy_forwarded_https()
    {
        var plain = await f.Prod.CreateClient().GetAsync("/health");
        Assert.Null(H(plain, "Strict-Transport-Security"));

        var https = await f.Prod.CreateClient(new WebApplicationFactoryClientOptions { BaseAddress = new Uri("https://localhost") }).GetAsync("/health");
        Assert.Equal(SecurityHeaders.Hsts, H(https, "Strict-Transport-Security"));

        // X-Forwarded-Proto from a trusted proxy (10.0.0.0/8 in config) is honoured...
        var trusted = new HttpRequestMessage(HttpMethod.Get, "/health");
        trusted.Headers.Add(TestHooksStartupFilter.RemoteIpHeader, "10.1.2.3");
        trusted.Headers.Add("X-Forwarded-Proto", "https");
        Assert.Equal(SecurityHeaders.Hsts, H(await f.Prod.CreateClient().SendAsync(trusted), "Strict-Transport-Security"));

        // ...but not from an arbitrary client.
        var spoofed = new HttpRequestMessage(HttpMethod.Get, "/health");
        spoofed.Headers.Add(TestHooksStartupFilter.RemoteIpHeader, "203.0.113.9");
        spoofed.Headers.Add("X-Forwarded-Proto", "https");
        Assert.Null(H(await f.Prod.CreateClient().SendAsync(spoofed), "Strict-Transport-Security"));
    }

    [Fact]
    public void Trusted_proxy_config_rejects_trust_all()
    {
        var cfg = new Microsoft.Extensions.Configuration.ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?> { ["Network:TrustedProxies:0"] = "0.0.0.0/0" }).Build();
        Assert.Throws<InvalidOperationException>(() => SecurityHeaders.ConfigureForwardedHeaders(new ForwardedHeadersOptions(), cfg));
        var empty = new ForwardedHeadersOptions();
        SecurityHeaders.ConfigureForwardedHeaders(empty, new Microsoft.Extensions.Configuration.ConfigurationBuilder().Build());
        Assert.Empty(empty.KnownProxies); // default loopback trust is removed
        Assert.Empty(empty.KnownIPNetworks);
    }

    // ---------- A05: error handling, OpenAPI, CORS ----------
    [Fact]
    public async Task Production_errors_are_problem_details_without_internals()
    {
        var r = await f.Prod.CreateClient().GetAsync("/__test/throw");
        Assert.Equal(HttpStatusCode.InternalServerError, r.StatusCode);
        Assert.Equal("application/problem+json", r.Content.Headers.ContentType?.MediaType);
        var body = await r.Content.ReadAsStringAsync();
        Assert.DoesNotContain("secret-internal-detail", body);
        Assert.DoesNotContain("InvalidOperationException", body);
        Assert.DoesNotContain(" at ", body);
        Assert.Contains("An unexpected error occurred.", body);
    }

    [Fact]
    public async Task OpenApi_is_hidden_in_production_unless_enabled()
    {
        Assert.Equal(HttpStatusCode.NotFound, (await f.Prod.CreateClient().GetAsync("/openapi/v1.json")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await f.Dev.CreateClient().GetAsync("/openapi/v1.json")).StatusCode);
        await using var enabled = f.Build("Production", ("OpenApi:Enabled", "true"));
        Assert.Equal(HttpStatusCode.OK, (await enabled.CreateClient().GetAsync("/openapi/v1.json")).StatusCode);
    }

    [Fact]
    public async Task Cors_allows_only_configured_origins_and_never_credentials()
    {
        async Task<HttpResponseMessage> Preflight(string origin)
        {
            var req = new HttpRequestMessage(HttpMethod.Options, "/api/courses");
            req.Headers.Add("Origin", origin);
            req.Headers.Add("Access-Control-Request-Method", "GET");
            return await f.Prod.CreateClient().SendAsync(req);
        }
        var ok = await Preflight("https://app.mastemy.test");
        Assert.Equal("https://app.mastemy.test", H(ok, "Access-Control-Allow-Origin"));
        Assert.Null(H(ok, "Access-Control-Allow-Credentials"));
        var evil = await Preflight("https://evil.example");
        Assert.Null(H(evil, "Access-Control-Allow-Origin"));
    }

    [Fact]
    public void Cors_wildcard_origin_fails_startup()
    {
        using var app = f.Build("Production", ("Cors:Origins:0", "*"));
        Assert.ThrowsAny<Exception>(() => app.CreateClient());
    }

    // ---------- A07: authentication ----------
    [Theory]
    [InlineData("short1")]
    [InlineData("onlyletterslong")]
    [InlineData("1234567890123")]
    public async Task Weak_passwords_are_rejected_on_register(string pw)
    {
        var r = await f.Prod.CreateClient().PostAsJsonAsync("/api/auth/register",
            new { email = $"w{Guid.NewGuid():N}@example.com", password = pw, displayName = "Weak" });
        Assert.Equal(HttpStatusCode.BadRequest, r.StatusCode);
        Assert.Contains("weak_password", await r.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task Login_failures_are_generic_for_unknown_user_and_wrong_password()
    {
        var u = await f.CreateUser();
        var c = f.Prod.CreateClient();
        var unknown = await c.PostAsJsonAsync("/api/auth/login", new { email = $"nobody{Guid.NewGuid():N}@example.com", password = "Wrong-password-1" });
        var wrong = await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = "Wrong-password-1" });
        Assert.Equal(HttpStatusCode.Unauthorized, unknown.StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, wrong.StatusCode);
        Assert.Equal(await unknown.Content.ReadAsStringAsync(), await wrong.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task Refresh_cookie_is_httponly_secure_strict_and_path_scoped()
    {
        var u = await f.CreateUser();
        var r = await f.Prod.CreateClient().PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = IdentityFixture.Password });
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        var cookie = r.Headers.GetValues("Set-Cookie").Single(c => c.StartsWith("mastemy_rt="));
        Assert.Contains("httponly", cookie, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("secure", cookie, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("samesite=strict", cookie, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("path=/api/auth", cookie, StringComparison.OrdinalIgnoreCase);
    }

    // ---------- A09: logging ----------
    [Fact]
    public async Task Security_events_are_logged_at_warning_with_correlation_id_and_masked_email()
    {
        var u = await f.CreateUser();
        var correlation = "corr-" + Guid.NewGuid().ToString("N")[..12];
        var req = new HttpRequestMessage(HttpMethod.Post, "/api/auth/login")
        {
            Content = JsonContent.Create(new { email = u.Email, password = "Wrong-password-XYZ1" }),
        };
        req.Headers.Add("X-Correlation-Id", correlation);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Prod.CreateClient().SendAsync(req)).StatusCode);

        var events = f.LogEntries.Where(e => e.Category == SecurityEvents.Category && e.Scopes.Contains($"CorrelationId={correlation}")).ToList();
        Assert.Contains(events, e => e.Level == LogLevel.Warning && e.Message.Contains("login_failed_bad_password"));
        Assert.All(events, e => Assert.Equal(LogLevel.Warning, e.Level));
        Assert.Contains(events, e => e.Message.Contains(LogRedaction.MaskEmail(u.Email)));

        // Nothing logged anywhere (any category) contains the raw email or the attempted password.
        Assert.DoesNotContain(f.LogEntries, e => e.Message.Contains(u.Email, StringComparison.OrdinalIgnoreCase));
        Assert.DoesNotContain(f.LogEntries, e => e.Message.Contains("Wrong-password-XYZ1"));
    }

    [Fact]
    public async Task Forged_correlation_ids_are_replaced()
    {
        var req = new HttpRequestMessage(HttpMethod.Get, "/health");
        req.Headers.TryAddWithoutValidation("X-Correlation-Id", "abc\" injected=1 <script>");
        var r = await f.Prod.CreateClient().SendAsync(req);
        var id = H(r, "X-Correlation-Id");
        Assert.NotNull(id);
        Assert.Matches("^[A-Za-z0-9._-]{1,64}$", id);
    }

    [Theory]
    [InlineData("alice@example.com", "a***@example.com")]
    [InlineData("x", "***")]
    [InlineData("", "")]
    public void Emails_are_masked(string input, string expected) => Assert.Equal(expected, LogRedaction.MaskEmail(input));

    [Fact]
    public void Log_values_are_stripped_of_control_characters() =>
        Assert.Equal("a_b_c", LogRedaction.Clean("a\r\nb\tc".Replace("\r\n", "\n")));

    [Fact]
    public async Task Privileged_admin_actions_write_audit_logs()
    {
        var admin = await f.As(f.Prod, await f.CreateUser(Roles.Admin));
        var superAdmin = await f.As(f.Prod, await f.CreateUser(Roles.SuperAdmin));
        var target = await f.CreateUser();

        Assert.Equal(HttpStatusCode.OK, (await admin.PutAsJsonAsync($"/api/admin/users/{target.Id}/suspend", new { suspended = true })).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await superAdmin.PutAsJsonAsync($"/api/admin/users/{target.Id}/roles", new { roles = new[] { "Student", "Instructor" } })).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await superAdmin.PutAsJsonAsync($"/api/admin/settings/{FeatureFlags.YouTubeApiUploadsEnabled}", new { value = true })).StatusCode);

        await using var db = f.NewDb();
        var actions = await db.AuditLogs.AsNoTracking().Select(a => new { a.Action, a.EntityId, a.ActorId }).ToListAsync();
        Assert.Contains(actions, a => a.Action == "user.suspended" && a.EntityId == target.Id.ToString() && a.ActorId != null);
        Assert.Contains(actions, a => a.Action == "user.roles_changed" && a.EntityId == target.Id.ToString());
        Assert.Contains(actions, a => a.Action.Contains("setting", StringComparison.OrdinalIgnoreCase) || a.Action.Contains("flag", StringComparison.OrdinalIgnoreCase));
    }
}
