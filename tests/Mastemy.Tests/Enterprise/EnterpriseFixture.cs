using System.Net.Http.Headers;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Enterprise;

public class EnterpriseFixture : IAsyncLifetime
{
    public string DbName { get; } = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;

    public async Task InitializeAsync()
    {
        Factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseEnvironment("Testing");
            b.UseSetting("ConnectionStrings:Default", $"Server=localhost;Port=3306;Database={DbName};User=mastemy;Password=mastemy_dev_pw;");
            b.UseSetting("Jwt:Key", "test-signing-key-0123456789abcdef0123456789abcdef");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
        });
        await Db(d => d.Database.EnsureCreatedAsync());
    }

    public async Task DisposeAsync()
    {
        await Db(d => d.Database.EnsureDeletedAsync());
        await Factory.DisposeAsync();
    }

    public async Task<T> Db<T>(Func<AppDbContext, Task<T>> f)
    {
        using var scope = Factory.Services.CreateScope();
        return await f(scope.ServiceProvider.GetRequiredService<AppDbContext>());
    }

    public Task Db(Func<AppDbContext, Task> f) => Db<int>(async d => { await f(d); return 0; });

    public async Task<(User User, HttpClient Client)> User(params string[] roles)
    {
        var u = new User { Email = $"{Guid.NewGuid():N}@t.local", DisplayName = "Tester", PasswordHash = "x" };
        u.NormalizedEmail = u.Email.ToLowerInvariant();
        u.Roles = roles.Select(r => new UserRole { UserId = u.Id, Role = r }).ToList();
        await Db(async d => { d.Users.Add(u); await d.SaveChangesAsync(); });
        return (u, Client(u));
    }

    public HttpClient Client(User u)
    {
        var c = Factory.CreateClient();
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Factory.Services.GetRequiredService<JwtIssuer>().Issue(u));
        return c;
    }

    public record SeededCourse(Course Course, List<Lesson> Lessons, Mastemy.Api.Domain.Assessment Final);

    public async Task<SeededCourse> Course(int lessons = 2, CourseStatus status = CourseStatus.Published, string? title = null)
    {
        var (owner, _) = await User(Roles.Instructor);
        var tag = Guid.NewGuid().ToString("N")[..10];
        var course = new Course
        {
            Code = "C" + tag, Slug = "c-" + tag, Title = title ?? "Course " + tag, OwnerId = owner.Id, Status = status,
            PublishedAt = status == CourseStatus.Published ? DateTime.UtcNow : null,
        };
        var module = new CourseModule { CourseId = course.Id, Code = "M1", Title = "M", SortOrder = 1 };
        for (var i = 0; i < lessons; i++) module.Lessons.Add(new Lesson { ModuleId = module.Id, Code = "L" + i, Title = "L" + i, SortOrder = i });
        course.Modules.Add(module);
        var final = new Mastemy.Api.Domain.Assessment { CourseId = course.Id, Title = "Final", Kind = AssessmentKind.FinalAssessment, Mode = AssessmentMode.Exam, CountsTowardCertificate = true };
        await Db(async d => { d.Courses.Add(course); d.Assessments.Add(final); await d.SaveChangesAsync(); });
        return new SeededCourse(course, module.Lessons, final);
    }
}
