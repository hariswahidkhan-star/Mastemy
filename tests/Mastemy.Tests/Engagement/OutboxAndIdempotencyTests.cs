using System.Diagnostics;
using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Engagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Engagement;

public class OutboxAndIdempotencyTests(EngagementFixture fx) : IClassFixture<EngagementFixture>
{
    private string Url(Guid courseId) => $"/api/studio/courses/{courseId}/announcements";

    private async Task<int> NotificationCount(Guid userId, string kind) =>
        await fx.Db(d => d.Notifications.CountAsync(n => n.UserId == userId && n.Kind == kind));

    [Fact]
    public async Task Without_smtp_no_outbox_rows_are_created()
    {
        var s = await fx.SeedCourse();
        var (u, c) = await fx.User(Roles.Student);
        await fx.Enroll(u.Id, s.Course.Id);
        await c.PutAsJsonAsync("/api/me/notification-preferences", new PreferencesInput([new PreferenceDto("announcement", true, true)]));
        Assert.Equal(HttpStatusCode.OK, (await s.OwnerClient.PostAsJsonAsync(Url(s.Course.Id), new AnnouncementInput("No smtp", "x"))).StatusCode);
        Assert.Equal(1, await NotificationCount(u.Id, "announcement"));
        Assert.False(await fx.Db(d => d.EmailOutbox.AnyAsync(m => m.ToAddress == u.Email)));
    }

    [Fact]
    public async Task Outbox_worker_sends_in_batches_and_retries_with_backoff_without_leaking_secrets()
    {
        var worker = fx.EmailFactory.Services.GetRequiredService<EmailOutboxWorker>();
        while (await worker.ProcessBatchAsync() > 0) { } // drain anything earlier tests queued
        var s = await fx.SeedCourse();
        var users = new List<User>();
        for (var i = 0; i < 3; i++)
        {
            var (u, _) = await fx.User(Roles.Student);
            users.Add(u);
            await fx.Enroll(u.Id, s.Course.Id);
            var ec = fx.Client(u, fx.EmailFactory);
            await ec.PutAsJsonAsync("/api/me/notification-preferences", new PreferencesInput([new PreferenceDto("announcement", true, true)]));
        }
        var owner = fx.Client(s.Owner, fx.EmailFactory);
        Assert.Equal(HttpStatusCode.OK, (await owner.PostAsJsonAsync(Url(s.Course.Id), new AnnouncementInput("Queued", "x"))).StatusCode);
        var ids = users.Select(u => u.Email).ToList();
        Assert.Equal(3, await fx.Db(d => d.EmailOutbox.CountAsync(m => ids.Contains(m.ToAddress) && m.SentAt == null)));
        Assert.DoesNotContain(fx.Email.Sent, m => ids.Contains(m.To));

        // SMTP outage on the first message: it is retried later with backoff; the others are sent.
        fx.Email.FailRemaining = 1;
        Assert.Equal(3, await worker.ProcessBatchAsync());
        var failed = await fx.Db(d => d.EmailOutbox.AsNoTracking().SingleAsync(m => ids.Contains(m.ToAddress) && m.SentAt == null));
        Assert.Equal(1, failed.Attempts);
        Assert.Equal("SmtpException: ServiceNotAvailable", failed.LastError);
        Assert.DoesNotContain("hunter2", failed.LastError);
        Assert.True(failed.NextAttemptAt > DateTime.UtcNow.AddSeconds(10));
        Assert.Equal(2, fx.Email.Sent.Count(m => ids.Contains(m.To)));
        Assert.Equal(0, await worker.ProcessBatchAsync()); // not due yet

        await fx.Db(d => d.EmailOutbox.Where(m => m.Id == failed.Id).ExecuteUpdateAsync(x => x.SetProperty(m => m.NextAttemptAt, DateTime.UtcNow.AddSeconds(-1))));
        Assert.Equal(1, await worker.ProcessBatchAsync());
        Assert.Equal(3, fx.Email.Sent.Count(m => ids.Contains(m.To)));
        Assert.Equal(TimeSpan.FromSeconds(60), worker.Backoff(2));

        // Messages that exhausted their attempts are never picked up again.
        await fx.Db(async d =>
        {
            d.EmailOutbox.Add(new EmailOutboxMessage { ToAddress = "dead@t.local", Subject = "x", Body = "x", Attempts = EmailOutboxWorker.MaxAttempts, NextAttemptAt = DateTime.UtcNow.AddMinutes(-1) });
            await d.SaveChangesAsync();
        });
        Assert.Equal(0, await worker.ProcessBatchAsync());
    }

    [Fact]
    public async Task Large_fan_out_of_5000_enrollees_completes_quickly()
    {
        var s = await fx.SeedCourse();
        var userIds = new List<Guid>();
        await fx.Db(async d =>
        {
            for (var i = 0; i < 5000; i++)
            {
                var u = new User { Email = $"{Guid.NewGuid():N}@bulk.local", DisplayName = "B", PasswordHash = "x" };
                u.NormalizedEmail = u.Email;
                d.Users.Add(u);
                d.Enrollments.Add(new Enrollment { UserId = u.Id, CourseId = s.Course.Id });
                userIds.Add(u.Id);
            }
            d.ChangeTracker.AutoDetectChangesEnabled = false;
            await d.SaveChangesAsync();
        });
        var sw = Stopwatch.StartNew();
        var res = await s.OwnerClient.PostAsJsonAsync(Url(s.Course.Id), new AnnouncementInput("Everyone", "x"));
        sw.Stop();
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        Assert.Equal(5000, (await res.Content.ReadFromJsonAsync<AnnouncementCreatedDto>())!.NotifiedCount);
        Assert.True(sw.Elapsed < TimeSpan.FromSeconds(5), $"Fan-out took {sw.Elapsed}");
        var link = $"/courses/{s.Course.Slug}/announcements";
        Assert.Equal(5000, await fx.Db(d => d.Notifications.CountAsync(n => n.Link == link)));
    }

    [Fact]
    public async Task Idempotency_key_replays_without_renotifying()
    {
        var s = await fx.SeedCourse();
        var (u, _) = await fx.User(Roles.Student);
        await fx.Enroll(u.Id, s.Course.Id);

        async Task<(HttpStatusCode, AnnouncementCreatedDto?)> Post(string? header, string? clientId, string title = "Same")
        {
            var req = new HttpRequestMessage(HttpMethod.Post, Url(s.Course.Id)) { Content = JsonContent.Create(new AnnouncementInput(title, "x", clientId)) };
            if (header is not null) req.Headers.Add("Idempotency-Key", header);
            var r = await s.OwnerClient.SendAsync(req);
            return (r.StatusCode, r.IsSuccessStatusCode ? await r.Content.ReadFromJsonAsync<AnnouncementCreatedDto>() : null);
        }

        var (c1, first) = await Post("key-1", null);
        var (c2, again) = await Post("key-1", null, "Retry with other title");
        Assert.Equal(HttpStatusCode.OK, c1); Assert.Equal(HttpStatusCode.OK, c2);
        Assert.False(first!.Duplicate);
        Assert.True(again!.Duplicate);
        Assert.Equal(first.Announcement.Id, again.Announcement.Id);
        Assert.Equal(1, again.NotifiedCount);
        Assert.Equal(1, await NotificationCount(u.Id, "announcement"));

        // Body clientRequestId works the same way; concurrent duplicates still produce one announcement.
        var parallel = await Task.WhenAll(Enumerable.Range(0, 4).Select(_ => Post(null, "client-req-9", "Parallel")));
        Assert.All(parallel, p => Assert.Equal(HttpStatusCode.OK, p.Item1));
        Assert.Single(parallel.Select(p => p.Item2!.Announcement.Id).Distinct());
        Assert.Equal(2, await fx.Db(d => d.Announcements.CountAsync(a => a.CourseId == s.Course.Id)));
        Assert.Equal(2, await NotificationCount(u.Id, "announcement"));
    }

    [Fact]
    public async Task Announcement_and_issue_rate_limits_hold_under_concurrency()
    {
        var s = await fx.SeedCourse();
        var results = await Task.WhenAll(Enumerable.Range(0, 8).Select(i =>
            s.OwnerClient.PostAsJsonAsync(Url(s.Course.Id), new AnnouncementInput("Burst " + i, "x"))));
        Assert.Equal(AnnouncementService.MaxPer24h, results.Count(r => r.StatusCode == HttpStatusCode.OK));
        Assert.All(results.Where(r => r.StatusCode != HttpStatusCode.OK), r => Assert.Equal(HttpStatusCode.TooManyRequests, r.StatusCode));
        Assert.Equal(AnnouncementService.MaxPer24h, await fx.Db(d => d.Announcements.CountAsync(a => a.CourseId == s.Course.Id)));

        var (_, lc) = await fx.User(Roles.Student);
        var issues = await Task.WhenAll(Enumerable.Range(0, 15).Select(i =>
            lc.PostAsJsonAsync($"/api/courses/{s.Course.Id}/issues", new IssueInput(null, "Other", "Problem number " + i))));
        Assert.Equal(IssueReportService.MaxPerUserPerDay, issues.Count(r => r.StatusCode == HttpStatusCode.OK));
        Assert.All(issues.Where(r => r.StatusCode != HttpStatusCode.OK), r => Assert.Equal(HttpStatusCode.TooManyRequests, r.StatusCode));
    }

    [Fact]
    public async Task Reply_notifications_are_coalesced_per_thread_within_ten_minutes()
    {
        var s = await fx.SeedCourse();
        var (learner, lc) = await fx.User(Roles.Student);
        await fx.Enroll(learner.Id, s.Course.Id);
        var thread = (await (await lc.PostAsJsonAsync($"/api/courses/{s.Course.Id}/discussions", new ThreadInput(null, "Coalesce me", "Q"))).Content.ReadFromJsonAsync<ThreadDetailDto>())!;
        var replies = await Task.WhenAll(Enumerable.Range(0, 5).Select(i =>
            s.OwnerClient.PostAsJsonAsync($"/api/discussions/{thread.Thread.Id}/replies", new ReplyInput("Answer " + i))));
        Assert.All(replies, r => Assert.Equal(HttpStatusCode.OK, r.StatusCode));
        Assert.Equal(1, await NotificationCount(learner.Id, "reply"));

        // After the window a new reply notifies again.
        await fx.Db(d => d.Notifications.Where(n => n.UserId == learner.Id && n.Kind == "reply")
            .ExecuteUpdateAsync(x => x.SetProperty(n => n.CreatedAt, DateTime.UtcNow.AddMinutes(-11))));
        Assert.Equal(HttpStatusCode.OK, (await s.OwnerClient.PostAsJsonAsync($"/api/discussions/{thread.Thread.Id}/replies", new ReplyInput("Later"))).StatusCode);
        Assert.Equal(2, await NotificationCount(learner.Id, "reply"));
    }
}
