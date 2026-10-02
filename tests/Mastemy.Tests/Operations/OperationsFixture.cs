using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Operations;

public class OperationsFixture : IAsyncLifetime
{
    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };
    public string DbName { get; } = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public string RootPath { get; } = Path.Combine(Path.GetTempPath(), "mastemy-ops-" + Guid.NewGuid().ToString("N"));
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;
    private readonly List<WebApplicationFactory<Program>> _extra = [];

    public string ConnectionStringFor(string db) =>
        Environment.GetEnvironmentVariable("MASTEMY_TEST_MYSQL") is { Length: > 0 } baseCs
            ? $"{baseCs};Database={db}"
            : $"Server=localhost;Port=3306;Database={db};User=mastemy;Password=mastemy_dev_pw;";

    public WebApplicationFactory<Program> Create(string connectionString, string rootPath, Dictionary<string, string?>? settings = null)
    {
        var f = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", connectionString);
            b.UseSetting("Jwt:Key", "test-signing-key-0123456789-abcdefghijklmnop");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Resources:RootPath", rootPath);
            b.UseSetting("Operations:OutboxDegradedMinutes", "15");
            foreach (var kv in settings ?? []) b.UseSetting(kv.Key, kv.Value);
        });
        if (Factory is not null) _extra.Add(f);
        return f;
    }

    public async Task InitializeAsync()
    {
        Factory = Create(ConnectionStringFor(DbName), RootPath);
        await WithDb(db => db.Database.EnsureCreatedAsync());
    }

    public async Task DisposeAsync()
    {
        await WithDb(db => db.Database.EnsureDeletedAsync());
        await Factory.DisposeAsync();
        foreach (var f in _extra) await f.DisposeAsync();
        try { Directory.Delete(RootPath, true); } catch (IOException) { }
    }

    public async Task WithDb(Func<AppDbContext, Task> action)
    {
        using var scope = Factory.Services.CreateScope();
        await action(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public async Task<T> WithDb<T>(Func<AppDbContext, Task<T>> action)
    {
        using var scope = Factory.Services.CreateScope();
        return await action(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public async Task<T> WithScope<T>(Func<IServiceProvider, Task<T>> action)
    {
        using var scope = Factory.Services.CreateScope();
        return await action(scope.ServiceProvider);
    }

    public async Task<(Guid Id, HttpClient Client)> User(params string[] roles)
    {
        var user = new User
        {
            Email = $"{Guid.NewGuid():N}@test.local", DisplayName = "Ops User " + Guid.NewGuid().ToString("N")[..6],
            PasswordHash = "x", Roles = roles.Select(r => new UserRole { Role = r }).ToList(),
        };
        user.NormalizedEmail = user.Email.ToUpperInvariant();
        foreach (var r in user.Roles) r.UserId = user.Id;
        await WithDb(async db => { db.Users.Add(user); await db.SaveChangesAsync(); });
        var token = Factory.Services.GetRequiredService<JwtIssuer>().Issue(user);
        var client = Factory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return (user.Id, client);
    }

    public static StringContent JsonBody(object o) => new(JsonSerializer.Serialize(o, Json), Encoding.UTF8, "application/json");

    public static async Task<T> Read<T>(HttpResponseMessage r)
    {
        var body = await r.Content.ReadAsStringAsync();
        if (!r.IsSuccessStatusCode) throw new Xunit.Sdk.XunitException($"HTTP {(int)r.StatusCode}: {body}");
        return JsonSerializer.Deserialize<T>(body, Json)!;
    }
}
