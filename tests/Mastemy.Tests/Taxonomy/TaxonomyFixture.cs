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

namespace Mastemy.Tests.Taxonomy;

/// <summary>API against a fresh, uniquely named real MySQL database (dropped on dispose); daily job disabled.</summary>
public sealed class TaxonomyFixture : IAsyncLifetime
{
    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };
    private readonly string _dbName = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;

    public User InstructorA { get; private set; } = null!;
    public User InstructorB { get; private set; } = null!;
    public User Reviewer { get; private set; } = null!;
    public User Reviewer2 { get; private set; } = null!;
    public User Admin { get; private set; } = null!;
    public User Student { get; private set; } = null!;
    public int CategoryId { get; private set; }
    public int AiCategoryId { get; private set; }

    public async Task InitializeAsync()
    {
        var host = Environment.GetEnvironmentVariable("MASTEMY_TEST_MYSQL") ?? "Server=localhost;Port=3306;User=mastemy;Password=mastemy_dev_pw";
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", $"{host};Database={_dbName}");
            b.UseSetting("Jwt:Key", "taxonomy-tests-signing-key-0123456789-abcdefghijklmnop");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Seed:Enabled", "false");
            b.UseSetting("Taxonomy:DailyJobEnabled", "false");
        });
        using var scope = Factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await db.Database.EnsureCreatedAsync();
        InstructorA = AddUser(db, "insta@test.local", "Alice Instructor", Roles.Instructor);
        InstructorB = AddUser(db, "instb@test.local", "Bob Instructor", Roles.Instructor);
        Reviewer = AddUser(db, "rev@test.local", "Reviewer R", Roles.Reviewer);
        Reviewer2 = AddUser(db, "rev2@test.local", "Reviewer S", Roles.Reviewer);
        Admin = AddUser(db, "admin@test.local", "Admin", Roles.Admin);
        Student = AddUser(db, "student@test.local", "Student", Roles.Student);
        var cat = new Category { Slug = "data", NameEn = "Data", NameAr = "بيانات", SortOrder = 1 };
        var ai = new Category { Slug = "ai-academy", NameEn = "AI Academy", NameAr = "أكاديمية الذكاء", SortOrder = 2, IsAcademy = true };
        db.Categories.AddRange(cat, ai);
        await db.SaveChangesAsync();
        CategoryId = cat.Id; AiCategoryId = ai.Id;
    }

    public static User AddUser(AppDbContext db, string email, string name, params string[] roles)
    {
        var u = new User { Email = email, NormalizedEmail = email.ToUpperInvariant(), DisplayName = name, PasswordHash = "x" };
        u.Roles.AddRange(roles.Select(r => new UserRole { UserId = u.Id, Role = r }));
        db.Users.Add(u);
        return u;
    }

    public async Task<User> NewUser(string name, params string[] roles)
    {
        User u = null!;
        await WithDb(async db => { u = AddUser(db, Guid.NewGuid().ToString("N")[..10] + "@test.local", name, roles); await db.SaveChangesAsync(); });
        return u;
    }

    /// <summary>Inserts a course; when live, also its version-1 snapshot (published <paramref name="publishedDaysAgo"/> days ago).</summary>
    public async Task<Course> AddCourse(string title, Guid instructorId, bool live = true, int? categoryId = null, int durationSeconds = 3600,
        CourseLevel level = CourseLevel.Beginner, double publishedDaysAgo = 1, string? description = null)
    {
        var slug = title.ToLowerInvariant().Replace(' ', '-') + "-" + Guid.NewGuid().ToString("N")[..6];
        var publishedAt = DateTime.UtcNow.AddDays(-publishedDaysAgo);
        var c = new Course
        {
            Code = "C" + Guid.NewGuid().ToString("N")[..8], Slug = slug, Title = title, Description = description ?? "", Level = level, OwnerId = instructorId,
            Status = live ? CourseStatus.Published : CourseStatus.Draft, PublishedAt = live ? publishedAt : null, PublishedVersion = live ? 1 : 0,
            UpdatedAt = publishedAt,
        };
        await WithDb(async db =>
        {
            db.Courses.Add(c);
            db.CourseInstructors.Add(new CourseInstructor { CourseId = c.Id, UserId = instructorId, Role = CourseInstructorRole.Owner, RevenueSharePercent = 100 });
            if (categoryId is { } cid) db.CourseCategories.Add(new CourseCategory { CourseId = c.Id, CategoryId = cid });
            if (live)
                db.CourseSnapshots.Add(new CourseSnapshot
                {
                    CourseId = c.Id, Version = 1, PayloadJson = "{}", Title = title, Subtitle = "", Level = level, Language = "en",
                    CategoryIds = categoryId is { } x ? "," + x + "," : "", LessonCount = 1, TotalDurationSeconds = durationSeconds,
                    SearchText = (title + "\n" + (description ?? "")).ToLowerInvariant(), PublishedBy = instructorId, PublishedAt = publishedAt,
                });
            await db.SaveChangesAsync();
        });
        return c;
    }

    /// <summary>Simulates a staff re-publish: adds the next snapshot (published now) and bumps PublishedVersion.</summary>
    public async Task Republish(Guid courseId)
    {
        await WithDb(async db =>
        {
            var c = await db.Courses.FirstAsync(x => x.Id == courseId);
            var prev = await db.CourseSnapshots.Where(s => s.CourseId == courseId).OrderByDescending(s => s.Version).FirstAsync();
            var now = DateTime.UtcNow;
            db.CourseSnapshots.Add(new CourseSnapshot
            {
                CourseId = courseId, Version = prev.Version + 1, PayloadJson = "{}", Title = prev.Title, Subtitle = prev.Subtitle, Level = prev.Level,
                Language = prev.Language, CategoryIds = prev.CategoryIds, LessonCount = prev.LessonCount, TotalDurationSeconds = prev.TotalDurationSeconds,
                SearchText = prev.SearchText, PublishedBy = prev.PublishedBy, PublishedAt = now,
            });
            c.PublishedVersion = prev.Version + 1; c.UpdatedAt = now;
            await db.SaveChangesAsync();
        });
    }

    public HttpClient Client(User? user = null)
    {
        var c = Factory.CreateClient();
        if (user is not null)
            c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Factory.Services.GetRequiredService<JwtIssuer>().Issue(user));
        return c;
    }

    public async Task WithDb(Func<AppDbContext, Task> action)
    {
        using var scope = Factory.Services.CreateScope();
        await action(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public async Task<T> WithService<TService, T>(Func<TService, Task<T>> action) where TService : notnull
    {
        using var scope = Factory.Services.CreateScope();
        return await action(scope.ServiceProvider.GetRequiredService<TService>());
    }

    public static async Task<T> Read<T>(HttpResponseMessage res)
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

public static class TaxHttp
{
    public static Task<HttpResponseMessage> PostJ<T>(this HttpClient c, string url, T body) => c.PostAsJsonAsync(url, body, TaxonomyFixture.Json);
    public static Task<HttpResponseMessage> PutJ<T>(this HttpClient c, string url, T body) => c.PutAsJsonAsync(url, body, TaxonomyFixture.Json);
}
