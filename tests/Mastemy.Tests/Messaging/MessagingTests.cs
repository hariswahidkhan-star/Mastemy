using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Messaging;
using Mastemy.Api.Modules.Trust;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Messaging;

public class MessagingTests(MessagingFixture f) : IClassFixture<MessagingFixture>
{
    private static async Task<SentMessageDto> Sent(HttpResponseMessage res)
    {
        Assert.Equal(HttpStatusCode.Created, res.StatusCode);
        return (await res.Content.ReadFromJsonAsync<SentMessageDto>())!;
    }

    private static async Task<string?> Code(HttpResponseMessage res)
    {
        var json = await res.Content.ReadAsStringAsync();
        var m = System.Text.RegularExpressions.Regex.Match(json, "\"type\"\\s*:\\s*\"([^\"]+)\"");
        return m.Success ? m.Groups[1].Value : null;
    }

    [Fact]
    public async Task Learner_messages_instructors_and_instructor_replies_with_notifications()
    {
        var s = await f.Course();
        var (learner, lc) = await f.User(Roles.Student);
        var send = new SendMessageInput("Hello, I have a question about lesson 2.");

        Assert.Equal(HttpStatusCode.Forbidden, (await lc.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", send)).StatusCode);
        await f.Enroll(learner.Id, s.Course.Id);
        var first = await Sent(await lc.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", send));
        Assert.Equal("Learner", first.Message.SenderRole);
        Assert.True(await f.Db(d => d.Notifications.AnyAsync(n => n.UserId == s.Owner.Id && n.Kind == "message")));

        // Same thread is reused.
        var second = await Sent(await lc.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput("One more thing.")));
        Assert.Equal(first.Conversation.Id, second.Conversation.Id);

        var mine = await s.OwnerClient.GetFromJsonAsync<List<ConversationDto>>("api/messages/conversations");
        var conv = Assert.Single(mine!, c => c.Id == first.Conversation.Id);
        Assert.Equal("Instructor", conv.MyRole);
        Assert.Equal(2, conv.Unread);

        var reply = await Sent(await s.OwnerClient.PostAsJsonAsync($"api/messages/conversations/{conv.Id}/messages", new SendMessageInput("Sure, ask away.")));
        Assert.Equal("Instructor", reply.Message.SenderRole);
        Assert.True(await f.Db(d => d.Notifications.AnyAsync(n => n.UserId == learner.Id && n.Kind == "message")));

        var page = await lc.GetFromJsonAsync<ConversationPageDto>($"api/messages/conversations/{conv.Id}");
        Assert.Equal(3, page!.Messages.Count);
        Assert.Equal(0, (await lc.GetFromJsonAsync<List<ConversationDto>>("api/messages/conversations"))!.Single().Unread);
    }

    [Fact]
    public async Task No_learner_to_learner_access_and_plain_text_limits()
    {
        var s = await f.Course();
        var (a, ac) = await f.User(Roles.Student);
        var (b, bc) = await f.User(Roles.Student);
        await f.Enroll(a.Id, s.Course.Id);
        await f.Enroll(b.Id, s.Course.Id);
        var sent = await Sent(await ac.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput("Private question")));

        Assert.Equal(HttpStatusCode.NotFound, (await bc.GetAsync($"api/messages/conversations/{sent.Conversation.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await bc.PostAsJsonAsync($"api/messages/conversations/{sent.Conversation.Id}/messages", new SendMessageInput("hi"))).StatusCode);
        // A learner cannot use the instructor endpoint to reach another learner.
        Assert.Equal(HttpStatusCode.Forbidden, (await bc.PostAsJsonAsync($"api/studio/courses/{s.Course.Id}/learners/{a.Id}/messages", new SendMessageInput("hi"))).StatusCode);
        Assert.Empty((await bc.GetFromJsonAsync<List<ConversationDto>>("api/messages/conversations"))!);

        var html = await ac.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput("<script>alert(1)</script>"));
        Assert.Equal(HttpStatusCode.BadRequest, html.StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await ac.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput(new string('x', 2001)))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await ac.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput("   "))).StatusCode);
    }

    [Fact]
    public async Task Instructor_can_message_only_enrolled_learners_of_own_course()
    {
        var s = await f.Course();
        var other = await f.Course();
        var (learner, lc) = await f.User(Roles.Student);
        var msg = new SendMessageInput("Welcome aboard!");
        Assert.Equal(HttpStatusCode.NotFound, (await s.OwnerClient.PostAsJsonAsync($"api/studio/courses/{s.Course.Id}/learners/{learner.Id}/messages", msg)).StatusCode);
        await f.Enroll(learner.Id, s.Course.Id);
        Assert.Equal(HttpStatusCode.Forbidden, (await other.OwnerClient.PostAsJsonAsync($"api/studio/courses/{s.Course.Id}/learners/{learner.Id}/messages", msg)).StatusCode);
        var sent = await Sent(await s.OwnerClient.PostAsJsonAsync($"api/studio/courses/{s.Course.Id}/learners/{learner.Id}/messages", msg));
        Assert.Equal(learner.Id, sent.Conversation.LearnerId);
        // The other course's instructor cannot read this thread.
        Assert.Equal(HttpStatusCode.NotFound, (await other.OwnerClient.GetAsync($"api/messages/conversations/{sent.Conversation.Id}")).StatusCode);
        Assert.Equal("Learner", (await lc.GetFromJsonAsync<List<ConversationDto>>("api/messages/conversations"))!.Single().MyRole);
    }

    [Fact]
    public async Task Rate_limit_returns_429()
    {
        var s = await f.Course();
        var (learner, lc) = await f.User(Roles.Student);
        await f.Enroll(learner.Id, s.Course.Id);
        for (var i = 0; i < 5; i++) await Sent(await lc.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput("msg " + i)));
        var res = await lc.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput("one too many"));
        Assert.Equal((HttpStatusCode)429, res.StatusCode);
        Assert.Equal("rate_limited", await Code(res));
    }

    [Fact]
    public async Task Blocks_stop_delivery_in_both_directions()
    {
        var s = await f.Course();
        var (learner, lc) = await f.User(Roles.Student);
        var (stranger, _) = await f.User(Roles.Student);
        await f.Enroll(learner.Id, s.Course.Id);
        var sent = await Sent(await lc.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput("Hi")));

        Assert.Equal(HttpStatusCode.NotFound, (await lc.PostAsJsonAsync("api/messages/blocks", new BlockInput(stranger.Id))).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await lc.PostAsJsonAsync("api/messages/blocks", new BlockInput(s.Owner.Id))).StatusCode);
        var blocked = await s.OwnerClient.PostAsJsonAsync($"api/messages/conversations/{sent.Conversation.Id}/messages", new SendMessageInput("Reply"));
        Assert.Equal(HttpStatusCode.Forbidden, blocked.StatusCode);
        Assert.Equal("messaging_blocked", await Code(blocked));
        Assert.Single((await lc.GetFromJsonAsync<List<BlockDto>>("api/messages/blocks"))!);
        Assert.Equal(HttpStatusCode.NoContent, (await lc.DeleteAsync($"api/messages/blocks/{s.Owner.Id}")).StatusCode);
        await Sent(await s.OwnerClient.PostAsJsonAsync($"api/messages/conversations/{sent.Conversation.Id}/messages", new SendMessageInput("Reply")));

        // The only instructor blocks the learner: the learner can no longer message the course.
        Assert.Equal(HttpStatusCode.OK, (await s.OwnerClient.PostAsJsonAsync("api/messages/blocks", new BlockInput(learner.Id))).StatusCode);
        var res = await lc.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput("Hello?"));
        Assert.Equal(HttpStatusCode.Forbidden, res.StatusCode);
    }

    [Fact]
    public async Task Report_files_trust_complaint_and_moderator_hides()
    {
        var s = await f.Course();
        var (learner, lc) = await f.User(Roles.Student);
        var (_, plain) = await f.User(Roles.Student);
        var (_, moderator) = await f.User(Roles.Moderator);
        await f.Enroll(learner.Id, s.Course.Id);
        var conv = (await Sent(await lc.PostAsJsonAsync($"api/courses/{s.Course.Id}/messages", new SendMessageInput("Question")))).Conversation;
        var bad = (await Sent(await s.OwnerClient.PostAsJsonAsync($"api/messages/conversations/{conv.Id}/messages", new SendMessageInput("Abusive text")))).Message;

        Assert.Equal(HttpStatusCode.BadRequest, (await lc.PostAsJsonAsync($"api/messages/{bad.Id}/report", new ReportMessageInput("short"))).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await plain.PostAsJsonAsync($"api/messages/{bad.Id}/report", new ReportMessageInput("This is abusive behaviour."))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await s.OwnerClient.PostAsJsonAsync($"api/messages/{bad.Id}/report", new ReportMessageInput("Reporting my own message."))).StatusCode);
        var rep = await lc.PostAsJsonAsync($"api/messages/{bad.Id}/report", new ReportMessageInput("This is abusive behaviour."));
        Assert.Equal(HttpStatusCode.Created, rep.StatusCode);
        var report = (await rep.Content.ReadFromJsonAsync<MessageReportDto>())!;
        Assert.Equal(HttpStatusCode.Conflict, (await lc.PostAsJsonAsync($"api/messages/{bad.Id}/report", new ReportMessageInput("This is abusive behaviour."))).StatusCode);

        var complaint = await f.Db(d => d.Set<Complaint>().AsNoTracking().FirstAsync(c => c.Id == report.ComplaintId));
        Assert.Equal(ComplaintType.Abuse, complaint.Type);
        Assert.Equal(MessagingRules.MessageComplaintTarget, complaint.TargetType);
        Assert.Equal(bad.Id, complaint.TargetId);
        Assert.Equal(s.Course.Id, complaint.CourseId);
        Assert.Contains("Abusive text", complaint.Evidence);

        Assert.Equal(HttpStatusCode.Forbidden, (await plain.GetAsync("api/moderation/messages/reports")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await plain.PostAsJsonAsync($"api/moderation/messages/{bad.Id}/hide", new HideMessageInput("abuse"))).StatusCode);
        Assert.Contains((await moderator.GetFromJsonAsync<List<ModerationReportDto>>("api/moderation/messages/reports"))!, r => r.MessageId == bad.Id);
        var hidden = await moderator.PostAsJsonAsync($"api/moderation/messages/{bad.Id}/hide", new HideMessageInput("Abusive language"));
        Assert.Equal(HttpStatusCode.OK, hidden.StatusCode);

        var learnerView = (await lc.GetFromJsonAsync<ConversationPageDto>($"api/messages/conversations/{conv.Id}"))!.Messages.Single(m => m.Id == bad.Id);
        Assert.True(learnerView.Hidden);
        Assert.Null(learnerView.Body);
        var modView = (await moderator.GetFromJsonAsync<ConversationPageDto>($"api/messages/conversations/{conv.Id}"))!.Messages.Single(m => m.Id == bad.Id);
        Assert.Equal("Abusive text", modView.Body);
        Assert.True(await f.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "message.hidden" && a.EntityId == bad.Id.ToString())));
        Assert.Equal(HttpStatusCode.OK, (await moderator.PostAsync($"api/moderation/messages/{bad.Id}/unhide", null)).StatusCode);
    }

    [Fact]
    public async Task Welcome_and_completion_messages_are_delivered_once()
    {
        var s = await f.Course(lessons: 2);
        var (early, _) = await f.User(Roles.Student);
        await f.Enroll(early.Id, s.Course.Id, DateTime.UtcNow.AddMinutes(-1)); // before the welcome message existed
        var (_, outsider) = await f.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await outsider.PutAsJsonAsync($"api/studio/courses/{s.Course.Id}/auto-messages/welcome", new AutoMessageInput("Hi", true))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await s.OwnerClient.PutAsJsonAsync($"api/studio/courses/{s.Course.Id}/auto-messages/farewell", new AutoMessageInput("Hi", true))).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await s.OwnerClient.PutAsJsonAsync($"api/studio/courses/{s.Course.Id}/auto-messages/welcome", new AutoMessageInput("Welcome to the course!", true))).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await s.OwnerClient.PutAsJsonAsync($"api/studio/courses/{s.Course.Id}/auto-messages/completion", new AutoMessageInput("Congratulations on finishing!", true))).StatusCode);
        var autos = await s.OwnerClient.GetFromJsonAsync<List<AutoMessageDto>>($"api/studio/courses/{s.Course.Id}/auto-messages");
        Assert.All(autos!, a => Assert.True(a.Enabled));

        var (learner, lc) = await f.User(Roles.Student);
        await f.Enroll(learner.Id, s.Course.Id, DateTime.UtcNow.AddSeconds(1));
        var worker = f.Factory.Services.GetRequiredService<AutoMessageWorker>();
        var r1 = await worker.RunOnce(DateTime.UtcNow.AddSeconds(5));
        Assert.Equal(1, r1.Welcome);
        Assert.Equal(0, (await worker.RunOnce(DateTime.UtcNow.AddSeconds(6))).Welcome); // idempotent
        var conv = (await lc.GetFromJsonAsync<List<ConversationDto>>("api/messages/conversations"))!.Single();
        var page = await lc.GetFromJsonAsync<ConversationPageDto>($"api/messages/conversations/{conv.Id}");
        Assert.Equal("Welcome", page!.Messages.Single().Kind);
        Assert.Equal("Welcome to the course!", page.Messages.Single().Body);
        Assert.False(await f.Db(d => d.Set<Conversation>().AnyAsync(c => c.LearnerId == early.Id)));

        // Partial progress: no completion message.
        var now = DateTime.UtcNow.AddSeconds(2);
        await f.Db(async d => { d.LessonProgress.Add(new LessonProgress { UserId = learner.Id, LessonId = s.SnapshotLessonIds[0], Completed = true, UpdatedAt = now }); await d.SaveChangesAsync(); });
        Assert.Equal(0, (await worker.RunOnce(DateTime.UtcNow.AddSeconds(10))).Completion);
        await f.Db(async d => { d.LessonProgress.Add(new LessonProgress { UserId = learner.Id, LessonId = s.SnapshotLessonIds[1], Completed = true, UpdatedAt = now.AddSeconds(1) }); await d.SaveChangesAsync(); });
        Assert.Equal(1, (await worker.RunOnce(DateTime.UtcNow.AddSeconds(12))).Completion);
        Assert.Equal(0, (await worker.RunOnce(DateTime.UtcNow.AddSeconds(13))).Completion);
        page = await lc.GetFromJsonAsync<ConversationPageDto>($"api/messages/conversations/{conv.Id}");
        Assert.Equal(["Welcome", "Completion"], page!.Messages.Select(m => m.Kind).ToArray());
        Assert.Equal(2, await f.Db(d => d.Notifications.CountAsync(n => n.UserId == learner.Id && n.Kind == "message")));
    }
}
