using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Engagement;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Engagement;

internal static class J
{
    public static readonly System.Text.Json.JsonSerializerOptions O = new(System.Text.Json.JsonSerializerDefaults.Web)
    { Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() } };
}

public class DiscoveryTests(EngagementFixture fx) : IClassFixture<EngagementFixture>
{
    [Fact]
    public async Task Wishlist_accepts_only_live_courses_and_returns_card_fields()
    {
        var live = await fx.SeedCourse();
        var draft = await fx.SeedCourse(CourseStatus.Draft);
        var (_, c) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await c.PostAsync($"/api/me/wishlist/{draft.Course.Id}", null)).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await c.PostAsync($"/api/me/wishlist/{live.Course.Id}", null)).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await c.PostAsync($"/api/me/wishlist/{live.Course.Id}", null)).StatusCode); // idempotent
        var list = await c.GetFromJsonAsync<List<WishlistItemDto>>("/api/me/wishlist", J.O);
        var item = Assert.Single(list!);
        Assert.Equal(live.Course.Slug, item.Course.Slug);
        Assert.Equal(20m, item.Course.MinPrice); // unapproved package ignored

        // Course archived later disappears from the list.
        await fx.Db(async d => { (await d.Courses.FindAsync(live.Course.Id))!.Status = CourseStatus.Archived; await d.SaveChangesAsync(); });
        Assert.Empty((await c.GetFromJsonAsync<List<WishlistItemDto>>("/api/me/wishlist", J.O))!);
        Assert.Equal(HttpStatusCode.NoContent, (await c.DeleteAsync($"/api/me/wishlist/{live.Course.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await fx.Client().GetAsync("/api/me/wishlist")).StatusCode);
    }

    [Fact]
    public async Task Recently_viewed_keeps_latest_20()
    {
        var (u, c) = await fx.User(Roles.Student);
        var courses = new List<Guid>();
        for (var i = 0; i < 22; i++) courses.Add((await fx.SeedCourse(price: null)).Course.Id);
        foreach (var id in courses) Assert.Equal(HttpStatusCode.NoContent, (await c.PostAsync($"/api/me/recently-viewed/{id}", null)).StatusCode);
        await c.PostAsync($"/api/me/recently-viewed/{courses[5]}", null); // re-view moves to top
        var list = await c.GetFromJsonAsync<List<RecentlyViewedDto>>("/api/me/recently-viewed", J.O);
        Assert.Equal(20, list!.Count);
        Assert.Equal(courses[5], list[0].Course.Id);
        Assert.Equal(20, await fx.Db(d => d.RecentlyViewed.CountAsync(r => r.UserId == u.Id)));
        Assert.DoesNotContain(list, x => x.Course.Id == courses[0]);
    }

    [Fact]
    public async Task Compare_validates_and_returns_facts()
    {
        var a = await fx.SeedCourse();
        var b = await fx.SeedCourse(price: null);
        var draft = await fx.SeedCourse(CourseStatus.Draft);
        var anon = fx.Client();
        Assert.Equal(HttpStatusCode.BadRequest, (await anon.GetAsync($"/api/courses/compare?ids={a.Course.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await anon.GetAsync($"/api/courses/compare?ids={a.Course.Id},{a.Course.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await anon.GetAsync($"/api/courses/compare?ids={a.Course.Id},nope")).StatusCode);
        var five = string.Join(",", Enumerable.Range(0, 5).Select(_ => Guid.NewGuid()));
        Assert.Equal(HttpStatusCode.BadRequest, (await anon.GetAsync($"/api/courses/compare?ids={five}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/courses/compare?ids={a.Course.Id},{draft.Course.Id}")).StatusCode);

        await fx.Db(async d =>
        {
            d.CourseReviews.Add(new CourseReview { CourseId = a.Course.Id, UserId = Guid.NewGuid(), Rating = 4 });
            d.CourseReviews.Add(new CourseReview { CourseId = a.Course.Id, UserId = Guid.NewGuid(), Rating = 1, Hidden = true });
            await d.SaveChangesAsync();
        });
        var res = await anon.GetFromJsonAsync<List<CompareCourseDto>>($"/api/courses/compare?ids={a.Course.Id},{b.Course.Id}", J.O);
        Assert.Equal(2, res!.Count);
        Assert.Equal(a.Course.Id, res[0].Id);
        Assert.Equal(2, res[0].LessonCount);
        Assert.Equal(1, res[0].ReadyVideoCount);
        Assert.Equal(300, res[0].TotalDurationSeconds);
        Assert.Equal(2, res[0].Packages.Count);
        Assert.Equal(4m, res[0].RatingAverage);
        Assert.Equal(1, res[0].RatingCount);
        Assert.Empty(res[1].Packages);
    }

    [Fact]
    public async Task Related_orders_by_overlap_then_newest_and_excludes_self_and_non_live()
    {
        var c1 = await fx.Category(); var c2 = await fx.Category();
        var self = await fx.SeedCourse(categories: [c1, c2]);
        var both = await fx.SeedCourse(categories: [c1, c2], publishedAt: DateTime.UtcNow.AddDays(-10));
        var oneOld = await fx.SeedCourse(categories: [c1], publishedAt: DateTime.UtcNow.AddDays(-5));
        var oneNew = await fx.SeedCourse(categories: [c2], publishedAt: DateTime.UtcNow.AddDays(-1));
        await fx.SeedCourse(CourseStatus.Draft, categories: [c1, c2]);
        var res = await fx.Client().GetFromJsonAsync<List<CourseCardLiteDto>>($"/api/courses/{self.Course.Id}/related", J.O);
        Assert.Equal([both.Course.Id, oneNew.Course.Id, oneOld.Course.Id], res!.Select(x => x.Id).ToArray());
    }
}

public class DiscussionTests(EngagementFixture fx) : IClassFixture<EngagementFixture>
{
    [Fact]
    public async Task Non_enrolled_cannot_post_enrolled_can_and_instructor_reply_is_flagged_and_notifies()
    {
        var s = await fx.SeedCourse();
        var (_, stranger) = await fx.User(Roles.Student);
        var (learner, lc) = await fx.User(Roles.Student);
        await fx.Enroll(learner.Id, s.Course.Id);
        var input = new ThreadInput(s.Lesson.Id, "How does X work?", "Please explain.");
        Assert.Equal(HttpStatusCode.Unauthorized, (await fx.Client().PostAsJsonAsync($"/api/courses/{s.Course.Id}/discussions", input)).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PostAsJsonAsync($"/api/courses/{s.Course.Id}/discussions", input)).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await lc.PostAsJsonAsync($"/api/courses/{s.Course.Id}/discussions", input with { Body = "<script>x</script>" })).StatusCode);
        var created = await (await lc.PostAsJsonAsync($"/api/courses/{s.Course.Id}/discussions", input)).Content.ReadFromJsonAsync<ThreadDetailDto>();

        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PostAsJsonAsync($"/api/discussions/{created!.Thread.Id}/replies", new ReplyInput("hi"))).StatusCode);
        var reply = await (await s.OwnerClient.PostAsJsonAsync($"/api/discussions/{created.Thread.Id}/replies", new ReplyInput("Here is how."))).Content.ReadFromJsonAsync<ReplyDto>();
        Assert.True(reply!.IsInstructorReply);

        var notes = await lc.GetFromJsonAsync<NotificationPageDto>("/api/me/notifications");
        Assert.Equal(1, notes!.UnreadCount);
        Assert.Equal("reply", notes.Items.Single().Kind);
        Assert.Equal(HttpStatusCode.NoContent, (await lc.PostAsync($"/api/me/notifications/{notes.Items[0].Id}/read", null)).StatusCode);
        Assert.Equal(0, (await lc.GetFromJsonAsync<NotificationPageDto>("/api/me/notifications"))!.UnreadCount);

        var search = await fx.Client().GetFromJsonAsync<EngagementPage<ThreadSummaryDto>>($"/api/courses/{s.Course.Id}/discussions?q=work");
        Assert.Equal(1, search!.Total);
        Assert.Equal(1, search.Items[0].ReplyCount);
        Assert.Equal(0, (await fx.Client().GetFromJsonAsync<EngagementPage<ThreadSummaryDto>>($"/api/courses/{s.Course.Id}/discussions?q=zzz"))!.Total);
    }

    [Fact]
    public async Task Only_course_authors_resolve_and_authors_edit_own_within_24h()
    {
        var s = await fx.SeedCourse();
        var other = await fx.SeedCourse();
        var (learner, lc) = await fx.User(Roles.Student);
        var (l2, lc2) = await fx.User(Roles.Student);
        await fx.Enroll(learner.Id, s.Course.Id); await fx.Enroll(l2.Id, s.Course.Id);
        var t = (await (await lc.PostAsJsonAsync($"/api/courses/{s.Course.Id}/discussions", new ThreadInput(null, "Question one", "body"))).Content.ReadFromJsonAsync<ThreadDetailDto>())!.Thread;

        Assert.Equal(HttpStatusCode.Forbidden, (await other.OwnerClient.PostAsJsonAsync($"/api/discussions/{t.Id}/resolve", new ResolveInput(true))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await lc.PostAsJsonAsync($"/api/discussions/{t.Id}/resolve", new ResolveInput(true))).StatusCode);
        var resolved = await (await s.OwnerClient.PostAsJsonAsync($"/api/discussions/{t.Id}/resolve", new ResolveInput(true))).Content.ReadFromJsonAsync<ThreadDetailDto>();
        Assert.True(resolved!.Thread.Resolved);

        Assert.Equal(HttpStatusCode.Forbidden, (await lc2.PutAsJsonAsync($"/api/discussions/{t.Id}", new ThreadEditInput("Hijacked", "x"))).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await lc.PutAsJsonAsync($"/api/discussions/{t.Id}", new ThreadEditInput("Question edited", "x"))).StatusCode);
        await fx.Db(async d => { (await d.DiscussionThreads.FindAsync(t.Id))!.CreatedAt = DateTime.UtcNow.AddHours(-25); await d.SaveChangesAsync(); });
        Assert.Equal(HttpStatusCode.Forbidden, (await lc.PutAsJsonAsync($"/api/discussions/{t.Id}", new ThreadEditInput("Too late", "x"))).StatusCode);
    }

    [Fact]
    public async Task Hidden_content_is_invisible_to_learners_and_hiding_is_moderator_only_and_audited()
    {
        var s = await fx.SeedCourse();
        var (learner, lc) = await fx.User(Roles.Student);
        await fx.Enroll(learner.Id, s.Course.Id);
        var (_, mod) = await fx.User(Roles.Moderator);
        var t = (await (await lc.PostAsJsonAsync($"/api/courses/{s.Course.Id}/discussions", new ThreadInput(null, "Spam thread", "body"))).Content.ReadFromJsonAsync<ThreadDetailDto>())!.Thread;
        var r = await (await lc.PostAsJsonAsync($"/api/discussions/{t.Id}/replies", new ReplyInput("bad reply"))).Content.ReadFromJsonAsync<ReplyDto>();

        Assert.Equal(HttpStatusCode.Forbidden, (await s.OwnerClient.PostAsJsonAsync($"/api/moderation/discussion-replies/{r!.Id}/hide", new HideInput(true, "spam"))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await mod.PostAsJsonAsync($"/api/moderation/discussion-replies/{r.Id}/hide", new HideInput(true, ""))).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await mod.PostAsJsonAsync($"/api/moderation/discussion-replies/{r.Id}/hide", new HideInput(true, "spam"))).StatusCode);
        Assert.Empty((await lc.GetFromJsonAsync<ThreadDetailDto>($"/api/discussions/{t.Id}"))!.Replies);
        Assert.Single((await mod.GetFromJsonAsync<ThreadDetailDto>($"/api/discussions/{t.Id}"))!.Replies);

        Assert.Equal(HttpStatusCode.NoContent, (await mod.PostAsJsonAsync($"/api/moderation/discussions/{t.Id}/hide", new HideInput(true, "spam"))).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await lc.GetAsync($"/api/discussions/{t.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await lc.PostAsJsonAsync($"/api/discussions/{t.Id}/replies", new ReplyInput("x"))).StatusCode);
        Assert.Equal(0, (await fx.Client().GetFromJsonAsync<EngagementPage<ThreadSummaryDto>>($"/api/courses/{s.Course.Id}/discussions"))!.Total);
        Assert.Equal(1, (await mod.GetFromJsonAsync<EngagementPage<ThreadSummaryDto>>($"/api/courses/{s.Course.Id}/discussions"))!.Total);
        Assert.True(await fx.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "discussion.hidden" && a.EntityId == t.Id.ToString())));

        Assert.Equal(HttpStatusCode.NoContent, (await mod.PostAsJsonAsync($"/api/moderation/discussions/{t.Id}/hide", new HideInput(false, null))).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await lc.GetAsync($"/api/discussions/{t.Id}")).StatusCode);
    }
}

public class AnnouncementAndNotificationTests(EngagementFixture fx) : IClassFixture<EngagementFixture>
{
    [Fact]
    public async Task Announcement_fans_out_respecting_preferences_and_is_rate_limited()
    {
        var s = await fx.SeedCourse();
        var (a, ac) = await fx.User(Roles.Student);
        var (b, bc) = await fx.User(Roles.Student);
        var (_, outsider) = await fx.User(Roles.Student);
        await fx.Enroll(a.Id, s.Course.Id); await fx.Enroll(b.Id, s.Course.Id);
        var prefs = await bc.PutAsJsonAsync("/api/me/notification-preferences",
            new PreferencesInput([new PreferenceDto("announcement", false, false)]));
        Assert.Equal(HttpStatusCode.OK, prefs.StatusCode);

        Assert.Equal(HttpStatusCode.Forbidden, (await ac.PostAsJsonAsync($"/api/studio/courses/{s.Course.Id}/announcements", new AnnouncementInput("Hello all", "x"))).StatusCode);
        var created = await (await s.OwnerClient.PostAsJsonAsync($"/api/studio/courses/{s.Course.Id}/announcements", new AnnouncementInput("Week 1", "Welcome"))).Content.ReadFromJsonAsync<AnnouncementCreatedDto>();
        Assert.Equal(1, created!.NotifiedCount);
        Assert.Single((await ac.GetFromJsonAsync<NotificationPageDto>("/api/me/notifications"))!.Items, n => n.Kind == "announcement");
        Assert.Empty((await bc.GetFromJsonAsync<NotificationPageDto>("/api/me/notifications"))!.Items);

        // Enrolled learners see announcements; outsiders cannot.
        Assert.Equal(1, (await bc.GetFromJsonAsync<EngagementPage<AnnouncementDto>>($"/api/courses/{s.Course.Id}/announcements"))!.Total);
        Assert.Equal(HttpStatusCode.Forbidden, (await outsider.GetAsync($"/api/courses/{s.Course.Id}/announcements")).StatusCode);

        Assert.Equal(HttpStatusCode.OK, (await s.OwnerClient.PostAsJsonAsync($"/api/studio/courses/{s.Course.Id}/announcements", new AnnouncementInput("Week 2", "x"))).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await s.OwnerClient.PostAsJsonAsync($"/api/studio/courses/{s.Course.Id}/announcements", new AnnouncementInput("Week 3", "x"))).StatusCode);
        Assert.Equal(HttpStatusCode.TooManyRequests, (await s.OwnerClient.PostAsJsonAsync($"/api/studio/courses/{s.Course.Id}/announcements", new AnnouncementInput("Week 4", "x"))).StatusCode);
        Assert.Equal(3, await fx.Db(d => d.Announcements.CountAsync(x => x.CourseId == s.Course.Id)));

        Assert.Equal(HttpStatusCode.NoContent, (await ac.PostAsync("/api/me/notifications/read-all", null)).StatusCode);
        Assert.Equal(0, (await ac.GetFromJsonAsync<NotificationPageDto>("/api/me/notifications"))!.UnreadCount);
    }

    [Fact]
    public async Task Announcement_requires_live_course()
    {
        var s = await fx.SeedCourse(CourseStatus.Draft);
        Assert.Equal(HttpStatusCode.Conflict, (await s.OwnerClient.PostAsJsonAsync($"/api/studio/courses/{s.Course.Id}/announcements", new AnnouncementInput("Hello", "x"))).StatusCode);
    }

    [Fact]
    public async Task Preferences_default_and_email_availability()
    {
        var (u, c) = await fx.User(Roles.Student);
        var p = await c.GetFromJsonAsync<PreferencesDto>("/api/me/notification-preferences");
        Assert.False(p!.EmailAvailable);
        Assert.All(p.Items, i => { Assert.True(i.InApp); Assert.False(i.Email); });
        Assert.Equal(HttpStatusCode.BadRequest, (await c.PutAsJsonAsync("/api/me/notification-preferences", new PreferencesInput([new PreferenceDto("bogus", true, true)]))).StatusCode);

        // With email configured, opted-in users receive email; others do not.
        var ec = fx.Client(u, fx.EmailFactory);
        Assert.True((await ec.GetFromJsonAsync<PreferencesDto>("/api/me/notification-preferences"))!.EmailAvailable);
        await ec.PutAsJsonAsync("/api/me/notification-preferences", new PreferencesInput([new PreferenceDto("announcement", true, true)]));
        var s = await fx.SeedCourse();
        var (v, _) = await fx.User(Roles.Student);
        await fx.Enroll(u.Id, s.Course.Id); await fx.Enroll(v.Id, s.Course.Id);
        var owner = fx.Client(s.Owner, fx.EmailFactory);
        Assert.Equal(HttpStatusCode.OK, (await owner.PostAsJsonAsync($"/api/studio/courses/{s.Course.Id}/announcements", new AnnouncementInput("Mail me", "x"))).StatusCode);
        Assert.Contains(fx.Email.Sent, m => m.To == u.Email);
        Assert.DoesNotContain(fx.Email.Sent, m => m.To == v.Email);
    }

    [Fact]
    public async Task Issue_reports_notify_authors_and_list_only_for_authors()
    {
        var s = await fx.SeedCourse();
        var other = await fx.SeedCourse();
        var (_, lc) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.BadRequest, (await lc.PostAsJsonAsync($"/api/courses/{s.Course.Id}/issues", new IssueInput(null, "Nope", "Video broken"))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await lc.PostAsJsonAsync($"/api/courses/{s.Course.Id}/issues", new IssueInput(other.Lesson.Id, "VideoUnavailable", "Video broken"))).StatusCode);
        var ok = await lc.PostAsJsonAsync($"/api/courses/{s.Course.Id}/issues", new IssueInput(s.Lesson.Id, "VideoUnavailable", "Video is private now"));
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);

        var list = await s.OwnerClient.GetFromJsonAsync<EngagementPage<IssueDto>>($"/api/studio/courses/{s.Course.Id}/issues");
        var issue = Assert.Single(list!.Items);
        Assert.Equal("VideoUnavailable", issue.Category);
        Assert.Equal(s.Lesson.Id, issue.LessonId);
        Assert.Equal(HttpStatusCode.Forbidden, (await other.OwnerClient.GetAsync($"/api/studio/courses/{s.Course.Id}/issues")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await lc.GetAsync($"/api/studio/courses/{s.Course.Id}/issues")).StatusCode);
        Assert.Contains((await s.OwnerClient.GetFromJsonAsync<NotificationPageDto>("/api/me/notifications"))!.Items, n => n.Kind == "issue_reported");
    }
}
