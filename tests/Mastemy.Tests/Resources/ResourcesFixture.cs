using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Resources;

/// <summary>API against a fresh MySQL database and a private temp resources directory, with small size limits.</summary>
public class ResourcesFixture : IAsyncLifetime
{
    public const long MaxFileBytes = 4096;
    public const long QuotaBytes = 6000;
    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };
    public string DbName { get; } = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public string RootPath { get; } = Path.Combine(Path.GetTempPath(), "mastemy-res-" + Guid.NewGuid().ToString("N"));
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;

    private string ConnectionString =>
        Environment.GetEnvironmentVariable("MASTEMY_TEST_MYSQL") is { Length: > 0 } baseCs
            ? $"{baseCs};Database={DbName}"
            : $"Server=localhost;Port=3306;Database={DbName};User=mastemy;Password=mastemy_dev_pw;";

    public async Task InitializeAsync()
    {
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", ConnectionString);
            b.UseSetting("Jwt:Key", "test-signing-key-0123456789-abcdefghijklmnop");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("RateLimits:AuthPerMinute", "1000");
            b.UseSetting("Resources:RootPath", RootPath);
            b.UseSetting("Resources:MaxFileBytes", MaxFileBytes.ToString());
            b.UseSetting("Resources:PerCourseQuotaBytes", QuotaBytes.ToString());
        });
        await WithDb(db => db.Database.EnsureCreatedAsync());
    }

    public async Task DisposeAsync()
    {
        await WithDb(db => db.Database.EnsureDeletedAsync());
        await Factory.DisposeAsync();
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

    public async Task<(Guid Id, HttpClient Client)> User(params string[] roles)
    {
        var user = new User
        {
            Email = $"{Guid.NewGuid():N}@test.local", DisplayName = "Test User " + Guid.NewGuid().ToString("N")[..6],
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

    /// <summary>Course (one module, one lesson) owned by <paramref name="ownerId"/>; Updating = live and editable.</summary>
    public async Task<(Course Course, Guid LessonId)> Course(Guid ownerId, CourseStatus status = CourseStatus.Updating)
    {
        var code = "C" + Guid.NewGuid().ToString("N")[..8].ToUpperInvariant();
        var course = new Course
        {
            Code = code, Slug = code.ToLowerInvariant(), Title = "Course " + code, OwnerId = ownerId, Status = status,
            PublishedAt = status is CourseStatus.Updating or CourseStatus.Published ? DateTime.UtcNow : null,
        };
        var m1 = new CourseModule { CourseId = course.Id, Code = "M01", Title = "Module 1" };
        var lesson = new Lesson { ModuleId = m1.Id, Code = "L01", Title = "Lesson 1" };
        m1.Lessons.Add(lesson);
        course.Modules.Add(m1);
        course.Instructors.Add(new CourseInstructor { CourseId = course.Id, UserId = ownerId, Role = CourseInstructorRole.Owner, RevenueSharePercent = 70 });
        await WithDb(async db => { db.Courses.Add(course); await db.SaveChangesAsync(); });
        return (course, lesson.Id);
    }

    public static MultipartFormDataContent File(string fileName, byte[] content)
    {
        var form = new MultipartFormDataContent();
        var part = new ByteArrayContent(content);
        part.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        form.Add(part, "file", fileName);
        return form;
    }

    public static byte[] Pdf(int size, byte fill = (byte)'a')
    {
        var b = Enumerable.Repeat(fill, size).ToArray();
        "%PDF-1.4\n"u8.ToArray().CopyTo(b, 0);
        return b;
    }

    public static StringContent JsonBody(object o) => new(JsonSerializer.Serialize(o, Json), System.Text.Encoding.UTF8, "application/json");

    public static async Task<T> Read<T>(HttpResponseMessage r)
    {
        var body = await r.Content.ReadAsStringAsync();
        if (!r.IsSuccessStatusCode) throw new Xunit.Sdk.XunitException($"HTTP {(int)r.StatusCode}: {body}");
        return JsonSerializer.Deserialize<T>(body, Json)!;
    }
}
