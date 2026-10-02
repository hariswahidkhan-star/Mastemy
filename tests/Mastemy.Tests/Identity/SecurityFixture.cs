using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Engagement;
using Mastemy.Api.Modules.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Mastemy.Tests.Identity;

/// <summary>Email transport that is "configured" but delivers nowhere; tests read tokens from the EmailOutbox table.</summary>
public sealed class NullEmailSender : IEmailSender
{
    public bool IsConfigured => true;
    public Task SendAsync(string to, string subject, string body, CancellationToken ct = default) => Task.CompletedTask;
}

/// <summary>Identity fixture with MFA enforcement ON (Security:RequireMfaForPrivileged default) and an email transport.</summary>
public sealed class SecurityFixture : IAsyncLifetime
{
    public const string Password = "Passw0rdLong";
    private readonly string _dbName = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public string ConnectionString => $"Server=localhost;Port=3306;Database={_dbName};User=mastemy;Password=mastemy_dev_pw;";
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;

    public async Task InitializeAsync()
    {
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", ConnectionString);
            b.UseSetting("Jwt:Key", "test-signing-key-security-0123456789-abcdef");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("RateLimits:AuthPerMinute", "10000");
            b.UseSetting("RateLimits:LoginPerEmailPerMinute", "10000");
            b.UseSetting("Email:PublicBaseUrl", "https://mastemy.test");
            b.ConfigureTestServices(s =>
            {
                s.RemoveAll<IEmailSender>();
                s.AddSingleton<IEmailSender, NullEmailSender>();
            });
        });
        await using var db = NewDb();
        await db.Database.EnsureCreatedAsync();
    }

    // Stop the host (and its background workers) before dropping the database; dropping first made a
    // worker's in-flight query fail during shutdown (CI: AdminTests class cleanup AggregateException).
    public Task DisposeAsync() => TestDatabase.DisposeHostsThenDropAsync(ConnectionString, Factory);

    public AppDbContext NewDb() => new(new DbContextOptionsBuilder<AppDbContext>().UseMySQL(ConnectionString).Options);

    public HttpClient Anon() => Factory.CreateClient();

    public static HttpClient WithToken(HttpClient c, string? token)
    {
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return c;
    }

    public async Task<User> CreateUser(bool verified, params string[] roles)
    {
        var email = $"s{Guid.NewGuid():N}@example.com";
        var u = new User { Email = email, NormalizedEmail = email, DisplayName = "Sec User", PasswordHash = PasswordHasher.Hash(Password) };
        foreach (var r in roles.DefaultIfEmpty(Roles.Student)) u.Roles.Add(new UserRole { UserId = u.Id, Role = r });
        await using var db = NewDb();
        db.Users.Add(u);
        if (verified) db.Set<UserSecurity>().Add(new UserSecurity { UserId = u.Id, EmailVerifiedAt = DateTime.UtcNow, VerifiedEmail = email });
        await db.SaveChangesAsync();
        return u;
    }

    /// <summary>Seeds an enabled TOTP secret directly. Returns the base32 secret.</summary>
    public async Task<string> SeedMfa(User u)
    {
        var secret = Totp.ToBase32(Totp.NewSecret());
        var protector = Factory.Services.GetRequiredService<SecretProtector>();
        await using var db = NewDb();
        var sec = await db.Set<UserSecurity>().FirstOrDefaultAsync(s => s.UserId == u.Id);
        if (sec is null) { sec = new UserSecurity { UserId = u.Id }; db.Set<UserSecurity>().Add(sec); }
        sec.MfaSecretProtected = protector.Protect(secret);
        sec.MfaEnabledAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return secret;
    }

    /// <summary>TOTP code for the current step plus <paramref name="offset"/> (offset within ±1 is accepted by the server).</summary>
    public static string Code(string secret, int offset = 0) =>
        Totp.Code(Totp.FromBase32(secret), Totp.StepAt(DateTimeOffset.UtcNow) + offset);

    public Task<HttpResponseMessage> Login(HttpClient c, User u, string? password = null) =>
        c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = password ?? Password });

    public static async Task<AuthResponse> Read(HttpResponseMessage r) =>
        (await r.Content.ReadFromJsonAsync<AuthResponse>(IdentityFixture.Json))!;

    /// <summary>Privileged (or any) user with MFA, fully signed in with amr=mfa.</summary>
    public async Task<(HttpClient Client, User User, string Secret, AuthResponse Auth)> SignedInWithMfa(params string[] roles)
    {
        var u = await CreateUser(true, roles);
        var secret = await SeedMfa(u);
        var c = Anon();
        var login = await Read(await Login(c, u));
        var res = await c.PostAsJsonAsync("/api/auth/mfa/verify", new { mfaToken = login.MfaToken, code = Code(secret) });
        res.EnsureSuccessStatusCode();
        var auth = await Read(res);
        WithToken(c, auth.AccessToken);
        return (c, u, secret, auth);
    }

    /// <summary>Extracts the raw token from the newest outbox email to <paramref name="to"/> whose link has <paramref name="path"/>.</summary>
    public async Task<string?> LatestEmailToken(string to, string path)
    {
        await using var db = NewDb();
        var bodies = await db.EmailOutbox.AsNoTracking().Where(m => m.ToAddress == to).OrderByDescending(m => m.CreatedAt)
            .Select(m => m.Body).ToListAsync();
        foreach (var b in bodies)
        {
            var m = Regex.Match(b, Regex.Escape(path) + @"\?token=([^\s]+)");
            if (m.Success) return Uri.UnescapeDataString(m.Groups[1].Value);
        }
        return null;
    }
}
