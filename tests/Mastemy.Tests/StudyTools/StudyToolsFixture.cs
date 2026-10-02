using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.StudyTools;

/// <summary>API against a fresh, uniquely named real MySQL database (dropped on dispose).</summary>
public sealed class StudyToolsFixture : IAsyncLifetime
{
    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web) { Converters = { new JsonStringEnumConverter() } };
    private readonly string _dbName = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;
    public User Owner { get; private set; } = null!;
    public User CoInstructor { get; private set; } = null!;
    public User Editor { get; private set; } = null!;
    public User Other { get; private set; } = null!;
    public User Reviewer { get; private set; } = null!;
    public User Admin { get; private set; } = null!;
    public User Student { get; private set; } = null!;
    public int CategoryId { get; private set; }

    public async Task InitializeAsync()
    {
        var host = Environment.GetEnvironmentVariable("MASTEMY_TEST_MYSQL") ?? "Server=localhost;Port=3306;User=mastemy;Password=mastemy_dev_pw";
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseSetting("ConnectionStrings:Default", $"{host};Database={_dbName}");
            b.UseSetting("Jwt:Key", "studytools-tests-signing-key-0123456789-abcdefghijklmnop");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Seed:Enabled", "false");
            b.UseSetting("StudyTools:RemindersEnabled", "false");
        });
        using var scope = Factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await db.Database.EnsureCreatedAsync();
        Owner = AddUser(db, "owner", Roles.Instructor);
        CoInstructor = AddUser(db, "co", Roles.Instructor);
        Editor = AddUser(db, "editor", Roles.Instructor);
        Other = AddUser(db, "other", Roles.Instructor);
        Reviewer = AddUser(db, "reviewer", Roles.Reviewer);
        Admin = AddUser(db, "admin", Roles.Admin);
        Student = AddUser(db, "student", Roles.Student);
        var cat = new Category { Slug = "auth-cat", NameEn = "Cat", NameAr = "فئة", SortOrder = 1 };
        db.Categories.Add(cat);
        await db.SaveChangesAsync();
        CategoryId = cat.Id;
    }

    private static User AddUser(AppDbContext db, string name, params string[] roles)
    {
        var email = $"{name}-{Guid.NewGuid():N}@test.local";
        var u = new User { Email = email, NormalizedEmail = email.ToUpperInvariant(), DisplayName = name, PasswordHash = "x" };
        u.Roles.AddRange(roles.Select(r => new UserRole { UserId = u.Id, Role = r }));
        db.Users.Add(u);
        return u;
    }

    public HttpClient Client(User? user = null)
    {
        var c = Factory.CreateClient(new WebApplicationFactoryClientOptions { HandleCookies = false });
        if (user is not null)
            c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Factory.Services.GetRequiredService<JwtIssuer>().Issue(user));
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

    public Task<HttpResponseMessage> Post<T>(HttpClient c, string url, T body) => c.PostAsJsonAsync(url, body, Json);
    public Task<HttpResponseMessage> Put<T>(HttpClient c, string url, T body) => c.PutAsJsonAsync(url, body, Json);

    public async Task<HttpResponseMessage> Send<T>(HttpClient c, HttpMethod method, string url, T? body, string? ifMatch)
    {
        var req = new HttpRequestMessage(method, url);
        if (body is not null) req.Content = JsonContent.Create(body, options: Json);
        if (ifMatch is not null) req.Headers.TryAddWithoutValidation("If-Match", ifMatch);
        return await c.SendAsync(req);
    }

    /// <summary>Course owned by <see cref="Owner"/> with Ready videos; optional co-instructor/editor membership.</summary>
    public async Task<StudioCourseDto> CreateCourse(string title, int modules = 1, int lessons = 2, bool withTeam = false, string language = "en")
    {
        var a = Client(Owner);
        var course = await Read<StudioCourseDto>(await Post(a, "/api/studio/courses", new CreateCourseRequest(
            title, "Sub", "About " + title, "Everyone", "None", ["Outcome"], language, CourseLevel.Beginner, [CategoryId])));
        for (var m = 0; m < modules; m++)
        {
            var mod = await Read<StudioModuleDto>(await Post(a, $"/api/studio/courses/{course.Id}/modules", new TitleRequest($"Module {m + 1}")));
            for (var l = 0; l < lessons; l++)
            {
                var lesson = await Read<StudioLessonDto>(await Post(a, $"/api/studio/modules/{mod.Id}/lessons", new LessonCreateRequest($"Lesson {m + 1}.{l + 1}", "Obj", l == 0)));
                await WithDb(async db =>
                {
                    var v = new VideoAsset { YouTubeVideoId = "abcdefghijk", Title = "v", DurationSeconds = 600, Status = VideoStatus.Ready, UploaderId = Owner.Id };
                    db.VideoAssets.Add(v);
                    (await db.Lessons.FirstAsync(x => x.Id == lesson.Id)).VideoAssetId = v.Id;
                    await db.SaveChangesAsync();
                });
            }
        }
        if (withTeam)
            await WithDb(async db =>
            {
                db.CourseInstructors.Add(new CourseInstructor { CourseId = course.Id, UserId = CoInstructor.Id, Role = CourseInstructorRole.CoInstructor });
                db.CourseInstructors.Add(new CourseInstructor { CourseId = course.Id, UserId = Editor.Id, Role = CourseInstructorRole.Editor });
                await db.SaveChangesAsync();
            });
        return await Read<StudioCourseDto>(await a.GetAsync($"/api/studio/courses/{course.Id}"));
    }

    public async Task Publish(Guid id, User? submitter = null)
    {
        await Read<CourseStatusDto>(await Client(submitter ?? Owner).PostAsync($"/api/studio/courses/{id}/submit", null));
        await Read<CourseStatusDto>(await Post(Client(Reviewer), $"/api/review/courses/{id}/decision", new ReviewDecisionRequest("Approve", null)));
        await Read<CourseStatusDto>(await Client(Admin).PostAsync($"/api/admin/courses/{id}/publish", null));
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
