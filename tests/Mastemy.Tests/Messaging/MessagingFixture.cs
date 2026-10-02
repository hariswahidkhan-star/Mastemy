using System.Net.Http.Headers;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Messaging;

public class MessagingFixture : IAsyncLifetime
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
            b.UseSetting("Messaging:AutoMessagesEnabled", "false"); // tests drive the worker explicitly
            b.UseSetting("Messaging:MaxPerHour", "5");
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
        var u = new User { Email = $"{Guid.NewGuid():N}@t.local", DisplayName = "U" + Guid.NewGuid().ToString("N")[..6], PasswordHash = "x" };
        u.NormalizedEmail = u.Email.ToLowerInvariant();
        u.Roles = roles.Select(r => new UserRole { UserId = u.Id, Role = r }).ToList();
        await Db(async d => { d.Users.Add(u); await d.SaveChangesAsync(); });
        var c = Factory.CreateClient();
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Factory.Services.GetRequiredService<JwtIssuer>().Issue(u));
        return (u, c);
    }

    public record Seeded(Course Course, User Owner, HttpClient OwnerClient, List<Guid> SnapshotLessonIds);

    /// <summary>Published course with an owner (Instructor) and a v1 snapshot listing <paramref name="lessons"/> lessons.</summary>
    public async Task<Seeded> Course(int lessons = 2)
    {
        var (owner, oc) = await User(Roles.Instructor);
        var tag = Guid.NewGuid().ToString("N")[..10];
        var course = new Course { Code = "C" + tag, Slug = "c-" + tag, Title = "Course " + tag, OwnerId = owner.Id, Status = CourseStatus.Published, PublishedAt = DateTime.UtcNow, PublishedVersion = 1 };
        var module = new CourseModule { CourseId = course.Id, Code = "M1", Title = "M", SortOrder = 1 };
        for (var i = 0; i < lessons; i++) module.Lessons.Add(new Lesson { ModuleId = module.Id, Code = "L" + i, Title = "L" + i, SortOrder = i });
        course.Modules.Add(module);
        var snap = new CourseSnapshot { CourseId = course.Id, Version = 1, PayloadJson = "{}", Title = course.Title, PublishedBy = owner.Id };
        await Db(async d =>
        {
            d.Courses.Add(course);
            d.CourseInstructors.Add(new CourseInstructor { CourseId = course.Id, UserId = owner.Id, Role = CourseInstructorRole.Owner, RevenueSharePercent = 100 });
            d.CourseSnapshots.Add(snap);
            foreach (var l in module.Lessons) d.SnapshotLessons.Add(new SnapshotLesson { LessonId = l.Id, SnapshotId = snap.Id, CourseId = course.Id, Version = 1 });
            await d.SaveChangesAsync();
        });
        return new Seeded(course, owner, oc, module.Lessons.Select(l => l.Id).ToList());
    }

    public Task Enroll(Guid userId, Guid courseId, DateTime? at = null) => Db(async d =>
    {
        d.Enrollments.Add(new Enrollment { UserId = userId, CourseId = courseId, CreatedAt = at ?? DateTime.UtcNow });
        await d.SaveChangesAsync();
    });
}
