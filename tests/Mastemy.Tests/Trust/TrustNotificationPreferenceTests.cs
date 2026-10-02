using System.Net;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Trust;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Trust.TrustDb;

namespace Mastemy.Tests.Trust;

public class TrustNotificationPreferenceTests(TrustFixture fx) : IClassFixture<TrustFixture>
{
    private const string Evidence = "This thread is advertising and harassment; see the repeated links to an external shop in the body.";

    [Fact]
    public async Task Trust_notifications_go_through_the_notification_service_and_respect_preferences()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid, CourseStatus.Published);
        var (optedOut, outClient) = await fx.User(Roles.Student);
        var (optedIn, inClient) = await fx.User(Roles.Student);
        await fx.WithDb(async db =>
        {
            db.NotificationPreferences.Add(new NotificationPreference { UserId = optedOut, Kind = TrustNotificationKinds.TrustSafety, InApp = false });
            await db.SaveChangesAsync();
        });
        var (_, staff) = await fx.User(Roles.Admin);
        async Task<Guid> File(HttpClient c) =>
            (await Read<ComplaintFiledDto>(await c.PostAsync("/api/complaints", JsonBody(new { type = "Other", targetType = "Course", targetId = course.Id, evidence = Evidence })))).Id;
        var c1 = await File(outClient);
        var c2 = await File(inClient);
        await Read<ComplaintResolutionDto>(await staff.PostAsync($"/api/admin/trust/complaints/{c1}/resolve", JsonBody(new { action = "Dismiss", note = "No issue." })));
        await Read<ComplaintResolutionDto>(await staff.PostAsync($"/api/admin/trust/complaints/{c2}/resolve", JsonBody(new { action = "Dismiss", note = "No issue." })));
        Assert.False(await fx.WithDb(db => db.Notifications.AnyAsync(n => n.UserId == optedOut && n.Kind == TrustNotificationKinds.TrustSafety)));
        Assert.True(await fx.WithDb(db => db.Notifications.AnyAsync(n => n.UserId == optedIn && n.Kind == TrustNotificationKinds.TrustSafety)));
    }

    [Fact]
    public async Task Complaint_takedown_of_a_thread_shows_its_author_the_reason()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid, CourseStatus.Published);
        var (author, authorClient) = await fx.User(Roles.Student);
        var thread = new DiscussionThread { CourseId = course.Id, AuthorId = author, Title = "Cheap meds", Body = "spam" };
        await fx.WithDb(async db => { db.DiscussionThreads.Add(thread); await db.SaveChangesAsync(); });
        var (_, staff) = await fx.User(Roles.Admin);
        var anon = fx.Factory.CreateClient();
        var filed = await Read<ComplaintFiledDto>(await anon.PostAsync("/api/complaints",
            JsonBody(new { type = "Abuse", targetType = "Discussion", targetId = thread.Id, evidence = Evidence, email = "r@example.org", name = "R" })));
        await Read<ComplaintResolutionDto>(await staff.PostAsync($"/api/admin/trust/complaints/{filed.Id}/resolve", JsonBody(new { action = "Hide", note = "Spam links." })));

        var res = await authorClient.GetAsync($"/api/discussions/{thread.Id}");
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var mo = JsonDocument.Parse(await res.Content.ReadAsStringAsync()).RootElement.GetProperty("moderation");
        Assert.Contains("Spam links.", mo.GetProperty("reason").GetString());
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/discussions/{thread.Id}")).StatusCode);

        // The author appeals with the advertised target; staff reinstate, which clears the notice.
        var appeal = await Read<AppealDto>(await authorClient.PostAsync("/api/appeals",
            JsonBody(new { targetType = mo.GetProperty("appealTargetType").GetString(), targetId = thread.Id, reason = "It was a genuine question." })));
        await Read<AppealDto>(await staff.PostAsync($"/api/admin/trust/appeals/{appeal.Id}/decision", JsonBody(new { decision = "reinstate", note = "Reviewed: genuine." })));
        Assert.Equal(JsonValueKind.Null, JsonDocument.Parse(await (await authorClient.GetAsync($"/api/discussions/{thread.Id}")).Content.ReadAsStringAsync())
            .RootElement.GetProperty("moderation").ValueKind);
    }
}
