using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Learning;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Learning;

public class LearningTests(LearningFixture fx) : IClassFixture<LearningFixture>
{
    [Fact]
    public async Task Video_id_is_never_gated_for_anonymous_or_refunded_or_expired_users()
    {
        var seed = await fx.SeedCourse();
        // Anonymous
        var anon = fx.Client();
        var course = await anon.GetFromJsonAsync<CurriculumDto>($"/api/learn/courses/{seed.Course.Slug}");
        Assert.Equal(seed.VideoId, course!.Modules.Single().Lessons.Single().YoutubeVideoId);
        var lesson = await anon.GetFromJsonAsync<LessonViewDto>($"/api/learn/lessons/{seed.Lesson.Id}");
        Assert.Equal(seed.VideoId, lesson!.YoutubeVideoId);
        Assert.Null(lesson.PremiumNotesMarkdown);
        Assert.True(lesson.PremiumLocked);

        // User with a refunded (revoked) and an expired package — not enrolled, no progress, no quiz.
        var (u, c) = await fx.User(Roles.Student);
        await fx.Db(async d =>
        {
            d.Entitlements.Add(new Entitlement { UserId = u.Id, CourseId = seed.Course.Id, Source = EntitlementSource.Purchase, PackageId = seed.Package.Id, RevokedAt = DateTime.UtcNow });
            d.Entitlements.Add(new Entitlement { UserId = u.Id, CourseId = seed.Course.Id, Source = EntitlementSource.Purchase, PackageId = seed.Package.Id, StartsAt = DateTime.UtcNow.AddDays(-100), EndsAt = DateTime.UtcNow.AddDays(-1) });
            await d.SaveChangesAsync();
        });
        var l2 = await c.GetFromJsonAsync<LessonViewDto>($"/api/learn/lessons/{seed.Lesson.Id}");
        Assert.Equal(seed.VideoId, l2!.YoutubeVideoId);
        Assert.True(l2.PremiumLocked);
        var c2 = await c.GetFromJsonAsync<CurriculumDto>($"/api/learn/courses/{seed.Course.Slug}");
        Assert.Equal(seed.VideoId, c2!.Modules.Single().Lessons.Single().YoutubeVideoId);
    }

    [Fact]
    public async Task Premium_notes_locked_then_unlocked_with_entitlement()
    {
        var seed = await fx.SeedCourse();
        var (u, c) = await fx.User(Roles.Student);
        var before = await c.GetFromJsonAsync<LessonViewDto>($"/api/learn/lessons/{seed.Lesson.Id}");
        Assert.Equal("free notes", before!.NotesMarkdown);
        Assert.Null(before.PremiumNotesMarkdown);
        Assert.True(before.PremiumLocked);
        await fx.Db(async d =>
        {
            d.Entitlements.Add(new Entitlement { UserId = u.Id, CourseId = seed.Course.Id, Source = EntitlementSource.Grant, EndsAt = DateTime.UtcNow.AddDays(5) });
            await d.SaveChangesAsync();
        });
        var after = await c.GetFromJsonAsync<LessonViewDto>($"/api/learn/lessons/{seed.Lesson.Id}");
        Assert.Equal("premium secret notes", after!.PremiumNotesMarkdown);
        Assert.False(after.PremiumLocked);
    }

    [Fact]
    public async Task Unpublished_course_is_not_found()
    {
        var seed = await fx.SeedCourse();
        await fx.Db(d => d.Courses.Where(x => x.Id == seed.Course.Id).ExecuteUpdateAsync(s => s.SetProperty(x => x.Status, CourseStatus.Draft)));
        Assert.Equal(HttpStatusCode.NotFound, (await fx.Client().GetAsync($"/api/learn/courses/{seed.Course.Slug}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await fx.Client().GetAsync($"/api/learn/lessons/{seed.Lesson.Id}")).StatusCode);
    }

    [Fact]
    public async Task Progress_clamps_and_completion_is_sticky_and_dashboard_reports_percent()
    {
        var seed = await fx.SeedCourse();
        var (_, c) = await fx.User(Roles.Student);
        var p1 = await (await c.PutAsJsonAsync($"/api/learn/lessons/{seed.Lesson.Id}/progress", new { positionSeconds = -50, completed = true })).Content.ReadFromJsonAsync<LessonProgressDto>();
        Assert.Equal(0, p1!.PositionSeconds);
        var p2 = await (await c.PutAsJsonAsync($"/api/learn/lessons/{seed.Lesson.Id}/progress", new { positionSeconds = 99999, completed = false })).Content.ReadFromJsonAsync<LessonProgressDto>();
        Assert.Equal(600, p2!.PositionSeconds);
        Assert.True(p2.Completed);

        var e1 = await (await c.PostAsync($"/api/learn/courses/{seed.Course.Id}/enroll", null)).Content.ReadFromJsonAsync<EnrollmentResult>();
        var e2 = await (await c.PostAsync($"/api/learn/courses/{seed.Course.Id}/enroll", null)).Content.ReadFromJsonAsync<EnrollmentResult>();
        Assert.Equal(e1!.EnrollmentId, e2!.EnrollmentId);

        var dash = await c.GetFromJsonAsync<DashboardDto>("/api/me/dashboard");
        var en = dash!.Enrollments.Single(x => x.Course.Id == seed.Course.Id);
        Assert.Equal(100, en.ProgressPercent);
        Assert.Equal(seed.Lesson.Id, en.LastLessonId);
        Assert.Equal(HttpStatusCode.Unauthorized, (await fx.Client().PutAsJsonAsync($"/api/learn/lessons/{seed.Lesson.Id}/progress", new { positionSeconds = 1, completed = false })).StatusCode);
    }

    [Fact]
    public async Task Private_notes_are_isolated_searchable_and_exportable()
    {
        var seed = await fx.SeedCourse();
        var (_, owner) = await fx.User(Roles.Student);
        var res = await owner.PostAsJsonAsync("/api/me/notes", new { lessonId = seed.Lesson.Id, timestampSeconds = 75, body = "Remember the **OSI** model", tags = new[] { "Networking", "exam" } });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var note = (await res.Content.ReadFromJsonAsync<NoteDto>())!;
        await owner.PostAsJsonAsync("/api/me/notes", new { lessonId = seed.Lesson.Id, body = "Unrelated thought", tags = Array.Empty<string>() });

        Assert.Single((await owner.GetFromJsonAsync<List<NoteDto>>("/api/me/notes?q=OSI"))!);
        Assert.Single((await owner.GetFromJsonAsync<List<NoteDto>>("/api/me/notes?tag=networking"))!);
        Assert.Equal(2, (await owner.GetFromJsonAsync<List<NoteDto>>($"/api/me/notes?lessonId={seed.Lesson.Id}"))!.Count);

        // The course instructor and staff cannot see, edit or delete the learner's private note.
        foreach (var other in new[] { fx.Client(seed.Owner), (await fx.User(Roles.Admin)).Client, (await fx.User(Roles.Student)).Client })
        {
            Assert.Empty((await other.GetFromJsonAsync<List<NoteDto>>($"/api/me/notes?lessonId={seed.Lesson.Id}"))!);
            Assert.Equal(HttpStatusCode.NotFound, (await other.PutAsJsonAsync($"/api/me/notes/{note.Id}", new { body = "hacked", tags = Array.Empty<string>() })).StatusCode);
            Assert.Equal(HttpStatusCode.NotFound, (await other.DeleteAsync($"/api/me/notes/{note.Id}")).StatusCode);
        }

        var md = await owner.GetStringAsync("/api/me/notes/export");
        Assert.Contains("Remember the **OSI** model", md);
        Assert.Contains("[00:01:15]", md);

        // Notes survive lesson edits (course revision).
        await fx.Db(d => d.Lessons.Where(l => l.Id == seed.Lesson.Id).ExecuteUpdateAsync(s => s.SetProperty(l => l.Title, "Lesson 1 (revised)").SetProperty(l => l.NotesVersion, 2)));
        var after = (await owner.GetFromJsonAsync<List<NoteDto>>("/api/me/notes?q=OSI"))!.Single();
        Assert.Equal("Lesson 1 (revised)", after.LessonTitle);

        Assert.Equal(HttpStatusCode.NoContent, (await owner.DeleteAsync($"/api/me/notes/{note.Id}")).StatusCode);
    }

    [Fact]
    public async Task Review_requires_enrollment_is_one_per_user_and_verified_only_with_purchase()
    {
        var seed = await fx.SeedCourse();
        var (u, c) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await c.PostAsJsonAsync($"/api/courses/{seed.Course.Id}/reviews", new { rating = 5, body = "Great" })).StatusCode);
        await c.PostAsync($"/api/learn/courses/{seed.Course.Id}/enroll", null);
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PostAsJsonAsync($"/api/courses/{seed.Course.Id}/reviews", new { rating = 6, body = "x" })).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PostAsJsonAsync($"/api/courses/{seed.Course.Id}/reviews", new { rating = 4, body = new string('a', 4001) })).StatusCode);

        var r1 = (await (await c.PostAsJsonAsync($"/api/courses/{seed.Course.Id}/reviews", new { rating = 4, body = "Good" })).Content.ReadFromJsonAsync<ReviewDto>())!;
        Assert.False(r1.VerifiedPurchase);
        await fx.Db(async d =>
        {
            d.Entitlements.Add(new Entitlement { UserId = u.Id, CourseId = seed.Course.Id, Source = EntitlementSource.Purchase, PackageId = seed.Package.Id, EndsAt = DateTime.UtcNow.AddDays(30) });
            await d.SaveChangesAsync();
        });
        var r2 = (await (await c.PostAsJsonAsync($"/api/courses/{seed.Course.Id}/reviews", new { rating = 2, body = "Changed my mind" })).Content.ReadFromJsonAsync<ReviewDto>())!;
        Assert.Equal(r1.Id, r2.Id);
        Assert.True(r2.VerifiedPurchase);
        Assert.Equal(1, await fx.Db(d => d.CourseReviews.CountAsync(r => r.CourseId == seed.Course.Id && r.UserId == u.Id)));

        var (_, outsider) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await outsider.PostAsJsonAsync($"/api/studio/reviews/{r2.Id}/reply", new { reply = "no" })).StatusCode);
        var replied = (await (await fx.Client(seed.Owner).PostAsJsonAsync($"/api/studio/reviews/{r2.Id}/reply", new { reply = "Thanks!" })).Content.ReadFromJsonAsync<ReviewDto>())!;
        Assert.Equal("Thanks!", replied.InstructorReply);

        var page = await fx.Client().GetFromJsonAsync<JsonElement>($"/api/courses/{seed.Course.Id}/reviews");
        Assert.Equal(1, page.GetProperty("total").GetInt32());
    }
}
