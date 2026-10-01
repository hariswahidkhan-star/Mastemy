using System.Collections.Concurrent;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Commerce;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Learning;

/// <summary>Fake Stripe API: records requests and returns canned responses.</summary>
public class LearningFakeStripeHandler : HttpMessageHandler
{
    public ConcurrentQueue<(string Method, string Path, string Body)> Requests { get; } = new();
    private int _n;

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct)
    {
        var body = request.Content is null ? "" : await request.Content.ReadAsStringAsync(ct);
        var path = request.RequestUri!.AbsolutePath;
        Requests.Enqueue((request.Method.Method, path, body));
        if (request.Headers.Authorization?.Parameter != LearningFixture.SecretKey)
            return Json(HttpStatusCode.Unauthorized, """{"error":{"message":"bad key"}}""");
        if (request.Method == HttpMethod.Post && path == "/v1/checkout/sessions")
        {
            var form = System.Web.HttpUtility.ParseQueryString(body);
            var id = "cs_test_" + form["client_reference_id"];
            return Json(HttpStatusCode.OK, $$"""{"id":"{{id}}","url":"https://checkout.stripe.test/{{id}}"}""");
        }
        if (request.Method == HttpMethod.Get && path.StartsWith("/v1/checkout/sessions/"))
        {
            var id = path["/v1/checkout/sessions/".Length..];
            return Json(HttpStatusCode.OK, $$"""{"id":"{{id}}","url":"https://checkout.stripe.test/{{id}}"}""");
        }
        if (request.Method == HttpMethod.Post && path == "/v1/refunds")
            return Json(HttpStatusCode.OK, $$"""{"id":"re_test_{{Interlocked.Increment(ref _n)}}","status":"succeeded"}""");
        return Json(HttpStatusCode.NotFound, "{}");
    }

    private static HttpResponseMessage Json(HttpStatusCode code, string json) =>
        new(code) { Content = new StringContent(json, Encoding.UTF8, "application/json") };
}

public class LearningFixture : IAsyncLifetime
{
    public const string SecretKey = "sk_test_fake_123";
    public const string WebhookSecret = "whsec_test_fake_456";
    public string DbName { get; } = "mastemy_t_" + Guid.NewGuid().ToString("N");
    public LearningFakeStripeHandler Stripe { get; } = new();
    public WebApplicationFactory<Program> Factory { get; private set; } = null!;
    public string ConnectionString => $"Server=localhost;Port=3306;Database={DbName};User=mastemy;Password=mastemy_dev_pw;";

    public WebApplicationFactory<Program> Build(bool stripeConfigured) =>
        new WebApplicationFactory<Program>().WithWebHostBuilder(b =>
        {
            b.UseEnvironment("Testing");
            b.UseSetting("ConnectionStrings:Default", ConnectionString);
            b.UseSetting("Jwt:Key", "test-signing-key-0123456789abcdef0123456789abcdef");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Stripe:SecretKey", stripeConfigured ? SecretKey : "");
            b.UseSetting("Stripe:WebhookSecret", stripeConfigured ? WebhookSecret : "");
            b.UseSetting("Stripe:ApiBaseUrl", "https://stripe.fake.local");
            b.UseSetting("Commission:InstructorSharePercent", "70");
            b.UseSetting("Commerce:RefundWindowDays", "30");
            b.ConfigureServices(s => s.AddHttpClient(StripePaymentProvider.HttpClientName).ConfigurePrimaryHttpMessageHandler(() => Stripe));
        });

    public async Task InitializeAsync()
    {
        Factory = Build(true);
        using var scope = Factory.Services.CreateScope();
        await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureCreatedAsync();
    }

    public async Task DisposeAsync()
    {
        using (var scope = Factory.Services.CreateScope())
            await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureDeletedAsync();
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

    public record SeededCourse(Course Course, Lesson Lesson, string VideoId, User Owner, User CoInstructor, LearningPackage Package);

    /// <summary>Published course with one Ready-video lesson, owner (60%) + co-instructor (40%), and an approved package.</summary>
    public async Task<SeededCourse> SeedCourse(decimal price = 49.99m)
    {
        var (owner, _) = await User(Roles.Instructor);
        var (co, _) = await User(Roles.Instructor);
        var tag = Guid.NewGuid().ToString("N")[..10];
        var video = new VideoAsset { YouTubeVideoId = "yt" + tag[..9], Title = "v", DurationSeconds = 600, Status = VideoStatus.Ready, UploaderId = owner.Id };
        var course = new Course { Code = "C" + tag, Slug = "course-" + tag, Title = "Course " + tag, OwnerId = owner.Id, Status = CourseStatus.Published };
        var module = new CourseModule { CourseId = course.Id, Code = "M1", Title = "Module 1", SortOrder = 1 };
        var lesson = new Lesson { ModuleId = module.Id, Code = "L1", Title = "Lesson 1", SortOrder = 1, VideoAsset = video, NotesMarkdown = "free notes", PremiumNotesMarkdown = "premium secret notes" };
        module.Lessons.Add(lesson);
        course.Modules.Add(module);
        course.Instructors.Add(new CourseInstructor { CourseId = course.Id, UserId = owner.Id, Role = CourseInstructorRole.Owner, RevenueSharePercent = 60 });
        course.Instructors.Add(new CourseInstructor { CourseId = course.Id, UserId = co.Id, Role = CourseInstructorRole.CoInstructor, RevenueSharePercent = 40 });
        var pkg = new LearningPackage { CourseId = course.Id, Title = "Premium notes + mock exams", Contents = "Premium notes; MCQ bank; 2 mock exams", Price = price, Currency = "USD", AccessDays = 90, IsActive = true, ApprovalStatus = "Approved" };
        await Db(async d => { d.Courses.Add(course); d.Packages.Add(pkg); await d.SaveChangesAsync(); });
        return new SeededCourse(course, lesson, video.YouTubeVideoId, owner, co, pkg);
    }
}
