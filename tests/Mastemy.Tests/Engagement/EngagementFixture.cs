using System.Collections.Concurrent;
using System.Net.Http.Headers;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Engagement;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Engagement;

public class RecordingEmailSender : IEmailSender
{
    public ConcurrentQueue<(string To, string Subject)> Sent { get; } = new();
    public bool IsConfigured => true;
    /// <summary>Number of upcoming sends that throw (simulated SMTP outage).</summary>
    public int FailRemaining;
    public Task SendAsync(string to, string subject, string body, CancellationToken ct = default)
    {
        if (Interlocked.Decrement(ref FailRemaining) >= 0)
            throw new System.Net.Mail.SmtpException(System.Net.Mail.SmtpStatusCode.ServiceNotAvailable, "smtp.secret-host.example: auth user=admin pass=hunter2");
        Interlocked.Exchange(ref FailRemaining, 0);
        Sent.Enqueue((to, subject));
        return Task.CompletedTask;
    }
}

public class EngagementFixture : IAsyncLifetime
{
    public string DbName { get; } = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;
    public RecordingEmailSender Email { get; } = new();
    private WebApplicationFactory<Program>? _emailFactory;
    public string ConnectionString => $"Server=localhost;Port=3306;Database={DbName};User=mastemy;Password=mastemy_dev_pw;";

    private WebApplicationFactory<Program> Build(bool withEmail) =>
        new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseEnvironment("Testing");
            b.UseSetting("ConnectionStrings:Default", ConnectionString);
            b.UseSetting("Jwt:Key", "test-signing-key-0123456789abcdef0123456789abcdef");
            b.UseSetting("Security:RequireMfaForPrivileged", "false");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Email:SmtpHost", "");
            b.UseSetting("Email:PollIntervalSeconds", "3600"); // tests drive the outbox worker explicitly
            if (withEmail) b.ConfigureServices(s => s.AddSingleton<IEmailSender>(Email));
        });

    /// <summary>Factory whose IEmailSender records instead of sending (email "configured").</summary>
    public WebApplicationFactory<Program> EmailFactory => _emailFactory ??= Build(true);

    public async Task InitializeAsync()
    {
        Factory = Build(false);
        using var scope = Factory.Services.CreateScope();
        await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureCreatedAsync();
    }

    public async Task DisposeAsync()
    {
        using (var scope = Factory.Services.CreateScope())
            await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureDeletedAsync();
        await Factory.DisposeAsync();
        if (_emailFactory is not null) await _emailFactory.DisposeAsync();
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
        u.NormalizedEmail = u.Email.ToUpperInvariant();
        u.Roles = roles.Select(r => new UserRole { UserId = u.Id, Role = r }).ToList();
        await Db(async d => { d.Users.Add(u); await d.SaveChangesAsync(); });
        return (u, Client(u));
    }

    public HttpClient Client(User? u = null, WebApplicationFactory<Program>? factory = null)
    {
        var c = (factory ?? Factory).CreateClient();
        if (u is not null)
        {
            var token = Factory.Services.GetRequiredService<JwtIssuer>().Issue(u);
            c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }
        return c;
    }

    public async Task Enroll(Guid userId, Guid courseId) =>
        await Db(async d => { d.Enrollments.Add(new Enrollment { UserId = userId, CourseId = courseId }); await d.SaveChangesAsync(); });

    public record Seeded(Course Course, Lesson Lesson, User Owner, HttpClient OwnerClient);

    public async Task<Seeded> SeedCourse(CourseStatus status = CourseStatus.Published, int[]? categories = null,
        decimal? price = 20m, DateTime? publishedAt = null)
    {
        var (owner, oc) = await User(Roles.Instructor);
        var tag = Guid.NewGuid().ToString("N")[..10];
        var video = new VideoAsset { YouTubeVideoId = "yt" + tag[..9], Title = "v", DurationSeconds = 300, Status = VideoStatus.Ready, UploaderId = owner.Id };
        var course = new Course
        {
            Code = "C" + tag, Slug = "course-" + tag, Title = "Course " + tag, OwnerId = owner.Id, Status = status,
            PublishedAt = status == CourseStatus.Published ? publishedAt ?? DateTime.UtcNow : null,
        };
        var module = new CourseModule { CourseId = course.Id, Code = "M1", Title = "M1", SortOrder = 1 };
        var lesson = new Lesson { ModuleId = module.Id, Code = "L1", Title = "L1", SortOrder = 1, VideoAsset = video };
        module.Lessons.Add(lesson);
        module.Lessons.Add(new Lesson { ModuleId = module.Id, Code = "L2", Title = "L2", SortOrder = 2 });
        course.Modules.Add(module);
        course.Instructors.Add(new CourseInstructor { CourseId = course.Id, UserId = owner.Id, Role = CourseInstructorRole.Owner, RevenueSharePercent = 100 });
        foreach (var cat in categories ?? []) course.Categories.Add(new CourseCategory { CourseId = course.Id, CategoryId = cat });
        await Db(async d =>
        {
            d.Courses.Add(course);
            if (price is { } p)
            {
                d.Packages.Add(new LearningPackage { CourseId = course.Id, Title = "Cheap", Price = p, IsActive = true, ApprovalStatus = "Approved" });
                d.Packages.Add(new LearningPackage { CourseId = course.Id, Title = "Pricey", Price = p + 50, IsActive = true, ApprovalStatus = "Approved" });
                d.Packages.Add(new LearningPackage { CourseId = course.Id, Title = "Unapproved", Price = 1, IsActive = true, ApprovalStatus = "Proposed" });
            }
            await d.SaveChangesAsync();
        });
        return new Seeded(course, lesson, owner, oc);
    }

    public async Task<int> Category()
    {
        var c = new Category { Slug = "cat-" + Guid.NewGuid().ToString("N")[..8], NameEn = "c", NameAr = "c" };
        await Db(async d => { d.Categories.Add(c); await d.SaveChangesAsync(); });
        return c.Id;
    }
}
