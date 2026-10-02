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

namespace Mastemy.Tests.Account;

/// <summary>API against a throwaway real MySQL database (one per test class). No SMTP configured.</summary>
public sealed class AccountFixture : IAsyncLifetime
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
            b.UseSetting("Jwt:Key", "test-signing-key-account-0123456789-abcdefgh");
            b.UseSetting("Database:MigrateOnStartup", "false");
            b.UseSetting("Security:RequireMfaForPrivileged", "false"); // MFA enforcement is covered by Identity tests
            b.UseSetting("RateLimits:AuthPerMinute", "10000");
            b.UseSetting("RateLimits:LoginPerEmailPerMinute", "10000");
        });
        await using var db = NewDb();
        await db.Database.EnsureCreatedAsync();
    }

    // Stop the host (and its background workers) before dropping the database; dropping first made a
    // worker's in-flight query fail during shutdown (CI: AdminTests class cleanup AggregateException).
    public Task DisposeAsync() => TestDatabase.DisposeHostsThenDropAsync(ConnectionString, Factory);

    public AppDbContext NewDb() => new(new DbContextOptionsBuilder<AppDbContext>().UseMySQL(ConnectionString).Options);

    public HttpClient Anon() => Factory.CreateClient();

    public async Task<User> CreateUser(params string[] roles)
    {
        var email = $"a{Guid.NewGuid():N}@example.com";
        var u = new User { Email = email, NormalizedEmail = email, DisplayName = "Ada Lovelace", PasswordHash = PasswordHasher.Hash(Password) };
        foreach (var r in roles.DefaultIfEmpty(Roles.Student)) u.Roles.Add(new UserRole { UserId = u.Id, Role = r });
        await using var db = NewDb();
        db.Users.Add(u);
        await db.SaveChangesAsync();
        return u;
    }

    public async Task<HttpClient> As(User u)
    {
        var c = Factory.CreateClient();
        var res = await c.PostAsJsonAsync("/api/auth/login", new { email = u.Email, password = Password });
        res.EnsureSuccessStatusCode();
        var auth = (await res.Content.ReadFromJsonAsync<AuthResponse>(Json))!;
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", auth.AccessToken);
        return c;
    }

    public static string Code(string secret, int offset = 0) =>
        Totp.Code(Totp.FromBase32(secret), Totp.StepAt(DateTimeOffset.UtcNow) + offset);

    public record Seeded(Course Course, Mastemy.Api.Domain.Assessment Assessment, Attempt Attempt, Order Order, Certificate Certificate, LearnerNote Note);

    /// <summary>Seeds a course with a passed MCQ attempt (skill code), an order with payment/ledger, a certificate and a note.</summary>
    public async Task<Seeded> SeedLearningAndCommerce(User learner, string skillCode)
    {
        var tag = Guid.NewGuid().ToString("N")[..10];
        var owner = await CreateUser(Roles.Instructor);
        await using var db = NewDb();
        var course = new Course { Code = "C" + tag, Slug = "c-" + tag, Title = "Course " + tag, OwnerId = owner.Id, Status = CourseStatus.Published };
        db.Courses.Add(course);
        var q = new Question { CourseId = course.Id, ExternalId = "Q" + tag, State = QuestionState.Active, CreatedBy = owner.Id };
        var v = new QuestionVersion { QuestionId = q.Id, Version = 1, Stem = "Stem", SkillCode = skillCode };
        q.Versions.Add(v);
        db.Questions.Add(q);
        var a = new Mastemy.Api.Domain.Assessment { CourseId = course.Id, Title = "Final " + tag, Kind = AssessmentKind.FinalAssessment, Mode = AssessmentMode.Exam, QuestionCount = 1 };
        db.Assessments.Add(a);
        var attempt = new Attempt { AssessmentId = a.Id, UserId = learner.Id, Status = AttemptStatus.Submitted, SubmittedAt = DateTime.UtcNow,
            ScorePercent = 90m, Passed = true, PassPercent = 70m };
        attempt.Items.Add(new AttemptItem { AttemptId = attempt.Id, QuestionVersionId = v.Id, SortOrder = 1 });
        db.Attempts.Add(attempt);
        db.Enrollments.Add(new Enrollment { UserId = learner.Id, CourseId = course.Id });
        var order = new Order { UserId = learner.Id, Status = OrderStatus.Paid, Total = 49m, IdempotencyKey = "k" + tag, PaidAt = DateTime.UtcNow };
        db.Orders.Add(order);
        db.Payments.Add(new Payment { OrderId = order.Id, ProviderPaymentId = "pi_" + tag, Amount = 49m });
        db.CommissionLedger.Add(new CommissionLedgerEntry { InstructorId = owner.Id, OrderId = order.Id, CourseId = course.Id, GrossAmount = 49m,
            InstructorAmount = 29m, PlatformAmount = 20m });
        var cert = new Certificate { Code = "CERT" + tag, UserId = learner.Id, CourseId = course.Id, AttemptId = attempt.Id, RecipientName = learner.DisplayName,
            CourseTitle = course.Title, ScorePercent = 90m };
        db.Certificates.Add(cert);
        var note = new LearnerNote { UserId = learner.Id, CourseId = course.Id, Body = "my private note " + tag };
        db.LearnerNotes.Add(note);
        await db.SaveChangesAsync();
        return new(course, a, attempt, order, cert, note);
    }
}
