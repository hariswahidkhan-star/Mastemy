using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Catalog;

/// <summary>Spins up the API against a fresh, uniquely named real MySQL database; dropped on dispose.</summary>
public sealed class CatalogFixture : IAsyncLifetime
{
    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };

    private readonly string _dbName = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;

    public User InstructorA { get; private set; } = null!;
    public User InstructorB { get; private set; } = null!;
    public User Reviewer { get; private set; } = null!;
    public User Admin { get; private set; } = null!;
    public User Student { get; private set; } = null!;
    public int CategoryId { get; private set; }

    public async Task InitializeAsync()
    {
        var host = Environment.GetEnvironmentVariable("MASTEMY_TEST_MYSQL") ?? "Server=localhost;Port=3306;User=mastemy;Password=mastemy_dev_pw";
        var conn = $"{host};Database={_dbName}";
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", conn);
            b.UseSetting("Jwt:Key", "catalog-tests-signing-key-0123456789-abcdefghijklmnop");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Seed:Enabled", "false");
        });
        using var scope = Factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await db.Database.EnsureCreatedAsync();
        InstructorA = AddUser(db, "insta@test.local", "Instructor A", Roles.Instructor);
        InstructorB = AddUser(db, "instb@test.local", "Instructor B", Roles.Instructor);
        Reviewer = AddUser(db, "rev@test.local", "Reviewer R", Roles.Reviewer, Roles.Instructor);
        Admin = AddUser(db, "admin@test.local", "Admin", Roles.Admin);
        Student = AddUser(db, "student@test.local", "Student", Roles.Student);
        var cat = new Category { Slug = "data", NameEn = "Data", NameAr = "بيانات", SortOrder = 1 };
        db.Categories.Add(cat);
        await db.SaveChangesAsync();
        CategoryId = cat.Id;
    }

    private static User AddUser(AppDbContext db, string email, string name, params string[] roles)
    {
        var u = new User { Email = email, NormalizedEmail = email.ToUpperInvariant(), DisplayName = name, PasswordHash = "x" };
        u.Roles.AddRange(roles.Select(r => new UserRole { UserId = u.Id, Role = r }));
        db.Users.Add(u);
        return u;
    }

    public HttpClient Client(User? user = null)
    {
        var c = Factory.CreateClient();
        if (user is not null)
        {
            var token = Factory.Services.GetRequiredService<JwtIssuer>().Issue(user);
            c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }
        return c;
    }

    public async Task WithDb(Func<AppDbContext, Task> action)
    {
        using var scope = Factory.Services.CreateScope();
        await action(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public async Task<T> Read<T>(HttpResponseMessage res)
    {
        var body = await res.Content.ReadAsStringAsync();
        Assert.True(res.IsSuccessStatusCode, $"{(int)res.StatusCode}: {body}");
        return JsonSerializer.Deserialize<T>(body, Json)!;
    }

    public async Task DisposeAsync()
    {
        try
        {
            using var scope = Factory.Services.CreateScope();
            await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureDeletedAsync();
        }
        finally { await Factory.DisposeAsync(); }
    }
}

public static class HttpJson
{
    public static Task<HttpResponseMessage> PostJ<T>(this HttpClient c, string url, T body) => c.PostAsJsonAsync(url, body, CatalogFixture.Json);
    public static Task<HttpResponseMessage> PutJ<T>(this HttpClient c, string url, T body) => c.PutAsJsonAsync(url, body, CatalogFixture.Json);
}
