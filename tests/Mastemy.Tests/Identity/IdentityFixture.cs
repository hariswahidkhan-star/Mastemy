using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Identity;

/// <summary>Spins up the API against a throwaway real MySQL database (one per test class).</summary>
public sealed class IdentityFixture : IAsyncLifetime
{
    public const string Password = "Passw0rdLong";
    private readonly string _dbName = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public string ConnectionString => $"Server=localhost;Port=3306;Database={_dbName};User=mastemy;Password=mastemy_dev_pw;";
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;
    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };

    public async Task InitializeAsync()
    {
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", ConnectionString);
            b.UseSetting("Jwt:Key", "test-signing-key-identity-0123456789-abcdef");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("RateLimits:AuthPerMinute", "10000");
        });
        await using var db = NewDb();
        await db.Database.EnsureCreatedAsync();
    }

    // Stop the host (and its background workers) before dropping the database; dropping first made a
    // worker's in-flight query fail during shutdown (CI: AdminTests class cleanup AggregateException).
    public Task DisposeAsync() => TestDatabase.DisposeHostsThenDropAsync(ConnectionString, Factory);

    public AppDbContext NewDb() => new(new DbContextOptionsBuilder<AppDbContext>().UseMySQL(ConnectionString).Options);

    public async Task<User> CreateUser(params string[] roles)
    {
        var email = $"u{Guid.NewGuid():N}@example.com";
        var u = new User { Email = email, NormalizedEmail = email, DisplayName = "Test User", PasswordHash = PasswordHasher.Hash(Password) };
        foreach (var r in roles.DefaultIfEmpty(Roles.Student)) u.Roles.Add(new UserRole { UserId = u.Id, Role = r });
        await using var db = NewDb();
        db.Users.Add(u);
        await db.SaveChangesAsync();
        return u;
    }

    public HttpClient Anon() => Factory.CreateClient();

    public async Task<HttpClient> As(User u)
    {
        var c = Factory.CreateClient();
        var res = await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = Password });
        res.EnsureSuccessStatusCode();
        var auth = (await res.Content.ReadFromJsonAsync<AuthResponse>(Json))!;
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.AccessToken);
        return c;
    }

    public async Task<HttpClient> AsNew(params string[] roles) => await As(await CreateUser(roles));

    public async Task SetFlag(string key, bool value)
    {
        await using var db = NewDb();
        var s = await db.PlatformSettings.FindAsync(key);
        if (s is null) db.PlatformSettings.Add(new PlatformSetting { Key = key, Value = value ? "true" : "false" });
        else s.Value = value ? "true" : "false";
        await db.SaveChangesAsync();
    }
}
