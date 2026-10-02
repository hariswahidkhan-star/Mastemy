using System.Net;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Analytics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Analytics;

public class AnalyticsTests(AnalyticsFixture f) : IClassFixture<AnalyticsFixture>
{
    private static HttpRequestMessage Events(object body, string? cookie, string ua = "test-agent")
    {
        var req = new HttpRequestMessage(HttpMethod.Post, "/api/analytics/events") { Content = System.Net.Http.Json.JsonContent.Create(body, options: AnalyticsFixture.Json) };
        if (cookie is not null) req.Headers.Add("Cookie", cookie);
        req.Headers.UserAgent.ParseAdd(ua);
        return req;
    }

    private async Task<int> EventCount(Guid courseId)
    {
        var n = 0;
        await f.WithDb(async db => n = await db.Set<AnalyticsEvent>().CountAsync(e => e.CourseId == courseId));
        return n;
    }

    [Fact]
    public async Task Events_are_stored_only_with_consent()
    {
        var c = await f.CreateCourse("Consent Course");
        await f.Publish(c.Id);
        var body = new AnalyticsEventsRequest([new AnalyticsEventInput(AnalyticsEventTypes.CourseView, c.Id, null, null)]);
        var anon = f.Client();

        var none = await anon.SendAsync(Events(body, null));
        Assert.Equal(HttpStatusCode.Forbidden, none.StatusCode);
        Assert.Contains("consent_required", await none.Content.ReadAsStringAsync());
        Assert.Equal(HttpStatusCode.Forbidden, (await anon.SendAsync(Events(body, "mastemy_consent=necessary"))).StatusCode);
        Assert.Equal(0, await EventCount(c.Id));

        var ok = await anon.SendAsync(Events(body, "mastemy_consent=analytics"));
        Assert.Equal(HttpStatusCode.Accepted, ok.StatusCode);
        Assert.Equal(1, (await f.Read<AnalyticsIngestResult>(ok)).Accepted);
        Assert.Equal(1, await EventCount(c.Id));

        // A signed-in user's stored choice overrides the cookie.
        var student = f.Client(f.Student);
        var set = await f.Put(student, "/api/analytics/consent", new ConsentRequest(false));
        Assert.Equal("account", (await f.Read<ConsentDto>(set)).Source);
        Assert.Contains(set.Headers.GetValues("Set-Cookie"), v => v.StartsWith("mastemy_consent=necessary"));
        Assert.Equal(HttpStatusCode.Forbidden, (await student.SendAsync(Events(body, "mastemy_consent=analytics"))).StatusCode);
        var on = await f.Put(student, "/api/analytics/consent", new ConsentRequest(true));
        Assert.Contains(on.Headers.GetValues("Set-Cookie"), v => v.StartsWith("mastemy_consent=analytics"));
        Assert.Equal(HttpStatusCode.Accepted, (await student.SendAsync(Events(body, null))).StatusCode);
        Assert.True((await f.Read<ConsentDto>(await student.GetAsync("/api/analytics/consent"))).Analytics);

        // No PII: the stored row only has the minimal fields and a hashed id that is not the user id.
        await f.WithDb(async db =>
        {
            var rows = await db.Set<AnalyticsEvent>().Where(e => e.CourseId == c.Id).ToListAsync();
            Assert.Equal(2, rows.Count);
            Assert.All(rows, r => Assert.Matches("^[0-9a-f]{32}$", r.AnonId));
            Assert.DoesNotContain(rows, r => r.AnonId.Contains(f.Student.Id.ToString("N")));
        });
    }

    [Fact]
    public async Task Invalid_events_are_rejected_and_ids_rotate_daily()
    {
        var c = await f.CreateCourse("Validation Course");
        var draft = await f.CreateCourse("Draft Only Course");
        await f.Publish(c.Id);
        var lesson = c.Modules[0].Lessons[0].Id;
        var res = await f.Client().SendAsync(Events(new AnalyticsEventsRequest(
        [
            new AnalyticsEventInput(AnalyticsEventTypes.LessonView, c.Id, lesson, DateTime.UtcNow.AddMinutes(-5)),
            new AnalyticsEventInput("page_scroll", c.Id, null, null), // unknown type
            new AnalyticsEventInput(AnalyticsEventTypes.CourseView, draft.Id, null, null), // not live
            new AnalyticsEventInput(AnalyticsEventTypes.CourseView, c.Id, null, DateTime.UtcNow.AddDays(-3)), // too old
            new AnalyticsEventInput(AnalyticsEventTypes.LessonView, c.Id, Guid.NewGuid(), null), // lesson not in course
        ]), "mastemy_consent=analytics", "validation-agent"));
        var r = await f.Read<AnalyticsIngestResult>(res);
        Assert.Equal(1, r.Accepted);
        Assert.Equal(4, r.Rejected);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Client().SendAsync(Events(new AnalyticsEventsRequest([]), "mastemy_consent=analytics"))).StatusCode);

        using var scope = f.Factory.Services.CreateScope();
        var svc = scope.ServiceProvider.GetRequiredService<AnalyticsIngestService>();
        var d1 = new DateTime(2026, 3, 1, 10, 0, 0, DateTimeKind.Utc);
        Assert.Equal(svc.AnonId("visitor", d1), svc.AnonId("visitor", d1.AddHours(5)));
        Assert.NotEqual(svc.AnonId("visitor", d1), svc.AnonId("visitor", d1.AddDays(1)));
        Assert.NotEqual(svc.AnonId("visitor", d1), svc.AnonId("other", d1));
    }

    [Fact]
    public async Task Ingest_is_rate_limited_per_client()
    {
        var c = await f.CreateCourse("Rate Course");
        await f.Publish(c.Id);
        var batch = new AnalyticsEventsRequest(Enumerable.Range(0, 20).Select(_ => new AnalyticsEventInput(AnalyticsEventTypes.VideoPlay, c.Id, null, null)).ToList());
        var codes = new List<HttpStatusCode>();
        for (var i = 0; i < 8; i++) codes.Add((await f.Client().SendAsync(Events(batch, "mastemy_consent=analytics", "rate-agent"))).StatusCode);
        Assert.Equal(6, codes.Count(x => x == HttpStatusCode.Accepted)); // 120 events/minute default
        Assert.Equal((HttpStatusCode)429, codes[^1]);
        // Another client is unaffected.
        Assert.Equal(HttpStatusCode.Accepted, (await f.Client().SendAsync(Events(batch, "mastemy_consent=analytics", "another-agent"))).StatusCode);
    }

    [Fact]
    public async Task Course_analytics_are_correct_on_seeded_data()
    {
        var c = await f.CreateCourse("Analytics Course", withTeam: true);
        await f.Publish(c.Id);
        var l1 = c.Modules[0].Lessons[0].Id; var l2 = c.Modules[0].Lessons[1].Id;
        DateTime D(int m, int d, int h = 10) => new(2026, m, d, h, 0, 0, DateTimeKind.Utc);
        await f.WithDb(async db =>
        {
            var s = Enumerable.Range(1, 4).Select(i => new User { Email = $"s{i}-{Guid.NewGuid():N}@t", NormalizedEmail = Guid.NewGuid().ToString(), DisplayName = $"s{i}" }).ToList();
            db.Users.AddRange(s);
            db.Enrollments.AddRange(
                new Enrollment { UserId = s[0].Id, CourseId = c.Id, CreatedAt = D(1, 5, 10) },
                new Enrollment { UserId = s[1].Id, CourseId = c.Id, CreatedAt = D(1, 5, 15) },
                new Enrollment { UserId = s[2].Id, CourseId = c.Id, CreatedAt = D(1, 20) },
                new Enrollment { UserId = s[3].Id, CourseId = c.Id, CreatedAt = new DateTime(2025, 12, 1, 0, 0, 0, DateTimeKind.Utc) });
            db.LessonProgress.AddRange(
                new LessonProgress { UserId = s[0].Id, LessonId = l1, Completed = true, UpdatedAt = D(1, 6) },
                new LessonProgress { UserId = s[0].Id, LessonId = l2, Completed = true, UpdatedAt = D(1, 7) },
                new LessonProgress { UserId = s[1].Id, LessonId = l1, Completed = true, UpdatedAt = D(1, 6) },
                new LessonProgress { UserId = s[2].Id, LessonId = l1, Completed = false, PositionSeconds = 30, UpdatedAt = D(1, 21) });
            var asm = new Mastemy.Api.Domain.Assessment { CourseId = c.Id, Title = "Final", Kind = AssessmentKind.FinalAssessment, Mode = AssessmentMode.Exam };
            db.Assessments.Add(asm);
            db.Attempts.AddRange(
                new Attempt { AssessmentId = asm.Id, UserId = s[0].Id, Status = AttemptStatus.Submitted, SubmittedAt = D(1, 8), ScorePercent = 80, Passed = true },
                new Attempt { AssessmentId = asm.Id, UserId = s[1].Id, Status = AttemptStatus.Submitted, SubmittedAt = D(1, 9), ScorePercent = 90, Passed = true },
                new Attempt { AssessmentId = asm.Id, UserId = s[2].Id, Status = AttemptStatus.Submitted, SubmittedAt = D(1, 22), ScorePercent = 40, Passed = false },
                new Attempt { AssessmentId = asm.Id, UserId = s[3].Id, Status = AttemptStatus.InProgress });
            var pkg = new LearningPackage { CourseId = c.Id, Title = "Premium", Price = 100 };
            db.Packages.Add(pkg);
            Order O(OrderStatus st, decimal total, string cur, DateTime paid, Guid user)
            {
                var o = new Order { UserId = user, Status = st, Total = total, Currency = cur, PaidAt = paid, IdempotencyKey = Guid.NewGuid().ToString() };
                o.Items.Add(new OrderItem { OrderId = o.Id, PackageId = pkg.Id, CourseId = c.Id, UnitPrice = total });
                return o;
            }
            var o1 = O(OrderStatus.Paid, 100, "USD", D(1, 6), s[0].Id);
            var o2 = O(OrderStatus.Refunded, 50, "USD", D(1, 10), s[1].Id);
            var o3 = O(OrderStatus.Paid, 30, "EUR", new DateTime(2025, 12, 2, 0, 0, 0, DateTimeKind.Utc), s[3].Id);
            db.Orders.AddRange(o1, o2, o3);
            db.CommissionLedger.AddRange(
                new CommissionLedgerEntry { InstructorId = f.Owner.Id, OrderId = o1.Id, CourseId = c.Id, Kind = "Sale", GrossAmount = 100, InstructorAmount = 70, PlatformAmount = 30, Currency = "USD", CreatedAt = D(1, 6) },
                new CommissionLedgerEntry { InstructorId = f.Owner.Id, OrderId = o2.Id, CourseId = c.Id, Kind = "Sale", GrossAmount = 50, InstructorAmount = 35, PlatformAmount = 15, Currency = "USD", CreatedAt = D(1, 10) },
                new CommissionLedgerEntry { InstructorId = f.Owner.Id, OrderId = o2.Id, CourseId = c.Id, Kind = "RefundReversal", GrossAmount = -50, InstructorAmount = -35, PlatformAmount = -15, Currency = "USD", CreatedAt = D(1, 11) },
                new CommissionLedgerEntry { InstructorId = f.Owner.Id, OrderId = o3.Id, CourseId = c.Id, Kind = "Sale", GrossAmount = 30, InstructorAmount = 21, PlatformAmount = 9, Currency = "EUR", CreatedAt = new DateTime(2025, 12, 2, 0, 0, 0, DateTimeKind.Utc) });
            foreach (var anon in new[] { "a1", "a1", "a2", "a3" })
                db.Set<AnalyticsEvent>().Add(new AnalyticsEvent { Type = AnalyticsEventTypes.CourseView, CourseId = c.Id, AnonId = anon, OccurredAt = D(1, 4) });
            db.Set<AnalyticsEvent>().Add(new AnalyticsEvent { Type = AnalyticsEventTypes.CourseView, CourseId = c.Id, AnonId = "old", OccurredAt = D(3, 1) });
            await db.SaveChangesAsync();
        });

        var url = $"/api/studio/courses/{c.Id}/analytics?from=2026-01-01T00:00:00Z&to=2026-02-01T00:00:00Z&bucket=day";
        var a = await f.Read<CourseAnalyticsDto>(await f.Client(f.Owner).GetAsync(url));
        Assert.Equal([("2026-01-05", 2L), ("2026-01-20", 1L)], a.EnrollmentsOverTime.Select(x => (x.Bucket, x.Value)).ToArray());
        Assert.Equal(3, a.EnrollmentsInRange);
        Assert.Equal(4, a.TotalEnrollments);
        Assert.Equal(3, a.ActiveLearnersInRange);
        Assert.Equal([("2026-01-06", 2L), ("2026-01-07", 1L), ("2026-01-21", 1L)], a.ActiveLearnersOverTime.Select(x => (x.Bucket, x.Value)).ToArray());
        Assert.Equal([(l1, 3L, 2L), (l2, 1L, 1L)], a.CompletionFunnel.Select(x => (x.LessonId, x.Started, x.Completed)).ToArray());
        Assert.Equal(37.5m, a.AverageProgressPercent); // 3 completions / (4 enrollments x 2 lessons)
        var final = Assert.Single(a.Assessments);
        Assert.Equal((3L, 2L, 66.67m, 70m), (final.Attempts, final.Passed, final.PassRatePercent, final.AverageScorePercent!.Value));
        Assert.Equal(3, a.Conversion.CourseViewVisitors);
        Assert.Equal(2, a.Conversion.Purchases);
        Assert.Equal(100m, a.Conversion.ViewToEnrollPercent);
        Assert.Equal(66.67m, a.Conversion.EnrollToPurchasePercent);
        Assert.Equal([("USD", "RefundReversal", -50m, -35m), ("USD", "Sale", 150m, 105m)], a.Revenue.Select(x => (x.Currency, x.Kind, x.Gross, x.InstructorAmount)).ToArray());
        Assert.Equal(a.Revenue.Count, a.MyEarnings.Count);
        Assert.Equal((2L, 1L, 50m), (a.Refunds.PaidOrders, a.Refunds.RefundedOrders, a.Refunds.RefundRatePercent!.Value));

        var weekly = await f.Read<CourseAnalyticsDto>(await f.Client(f.Owner).GetAsync(url.Replace("bucket=day", "bucket=week")));
        Assert.Equal([("2026-01-05", 2L), ("2026-01-19", 1L)], weekly.EnrollmentsOverTime.Select(x => (x.Bucket, x.Value)).ToArray());
        var monthly = await f.Read<CourseAnalyticsDto>(await f.Client(f.Owner).GetAsync(url.Replace("bucket=day", "bucket=month")));
        Assert.Equal([("2026-01-01", 3L)], monthly.EnrollmentsOverTime.Select(x => (x.Bucket, x.Value)).ToArray());

        // Cached for 5 minutes: same payload instance timestamp.
        var again = await f.Read<CourseAnalyticsDto>(await f.Client(f.Owner).GetAsync(url));
        Assert.Equal(a.GeneratedAt, again.GeneratedAt);

        // Authorization: co-instructor and staff yes; editor, other instructor, student no.
        await f.Read<CourseAnalyticsDto>(await f.Client(f.CoInstructor).GetAsync(url));
        await f.Read<CourseAnalyticsDto>(await f.Client(f.Admin).GetAsync(url));
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Editor).GetAsync(url)).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Other).GetAsync(url)).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Student).GetAsync(url)).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Client(f.Owner).GetAsync(url.Replace("bucket=day", "bucket=hour"))).StatusCode);
    }

    [Fact]
    public async Task Question_stats_never_expose_answer_keys()
    {
        var c = await f.CreateCourse("Question Stats Course");
        await f.WithDb(async db =>
        {
            var q = new Question { CourseId = c.Id, ExternalId = "QS1", State = QuestionState.Active, CreatedBy = f.Owner.Id };
            var v = new QuestionVersion { QuestionId = q.Id, Version = 1, Stem = "S" };
            v.Options.Add(new QuestionOption { Text = "A", IsCorrect = true });
            q.Versions.Add(v);
            db.Questions.Add(q);
            var asm = new Mastemy.Api.Domain.Assessment { CourseId = c.Id, Title = "Q" };
            db.Assessments.Add(asm);
            foreach (var pts in new decimal[] { 1, 0, 1 })
            {
                var at = new Attempt { AssessmentId = asm.Id, UserId = f.Student.Id, Status = AttemptStatus.Submitted, SubmittedAt = DateTime.UtcNow };
                at.Items.Add(new AttemptItem { AttemptId = at.Id, QuestionVersionId = v.Id, SelectedOptionIds = "x", Points = pts });
                db.Attempts.Add(at);
            }
            await db.SaveChangesAsync();
        });
        var res = await f.Client(f.Owner).GetAsync($"/api/studio/courses/{c.Id}/analytics/questions");
        Assert.DoesNotContain("isCorrect", await res.Content.ReadAsStringAsync(), StringComparison.OrdinalIgnoreCase);
        var stat = Assert.Single(await f.Read<List<QuestionStatDto>>(res));
        Assert.Equal((3L, 2L, 66.67m), (stat.Answered, stat.FullCredit, stat.FullCreditPercent!.Value));
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Other).GetAsync($"/api/studio/courses/{c.Id}/analytics/questions")).StatusCode);
    }

    [Fact]
    public async Task Admin_dashboard_reports_platform_health()
    {
        var live = await f.CreateCourse("Stale Live Course");
        await f.Publish(live.Id);
        var inReview = await f.CreateCourse("Queued Course");
        await f.Read<Mastemy.Api.Modules.Catalog.CourseStatusDto>(await f.Client(f.Owner).PostAsync($"/api/studio/courses/{inReview.Id}/submit", null));
        await f.WithDb(async db =>
        {
            var old = DateTime.UtcNow.AddMonths(-14);
            await db.CourseSnapshots.Where(s => s.CourseId == live.Id).ExecuteUpdateAsync(s => s.SetProperty(x => x.PublishedAt, old));
            await db.Courses.Where(x => x.Id == live.Id).ExecuteUpdateAsync(s => s.SetProperty(x => x.PublishedAt, old));
            db.VideoAssets.Add(new VideoAsset { YouTubeVideoId = "restricted1", Status = VideoStatus.Restricted, StatusReason = "Made private", UploaderId = f.Owner.Id });
            db.VideoAssets.Add(new VideoAsset { YouTubeVideoId = "failedvid01", Status = VideoStatus.Failed, UploaderId = f.Owner.Id });
            var o = new Order { UserId = f.Student.Id, Status = OrderStatus.Paid, Total = 40, Currency = "SAR", PaidAt = DateTime.UtcNow, IdempotencyKey = Guid.NewGuid().ToString() };
            db.Orders.Add(o);
            db.Refunds.Add(new Refund { OrderId = o.Id, Amount = 10, Status = "Completed", DecidedAt = DateTime.UtcNow });
            db.Refunds.Add(new Refund { OrderId = o.Id, Amount = 5, Status = "Requested" });
            await db.SaveChangesAsync();
        });

        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Owner).GetAsync("/api/admin/analytics/dashboard")).StatusCode);
        var d = await f.Read<AdminDashboardDto>(await f.Client(f.Admin).GetAsync("/api/admin/analytics/dashboard?bucket=month"));
        Assert.True(d.TotalUsers >= 7);
        Assert.True(d.NewSignupsInRange >= 7);
        Assert.True(d.PublishedCourses >= 1);
        Assert.Equal(2, d.VideosNeedingRepair);
        Assert.Contains(d.VideosNeedingRepairSample, v => v.YouTubeVideoId == "restricted1" && v.Reason == "Made private");
        Assert.Equal(12, d.ContentReviewMonths);
        Assert.Contains(d.OverdueContentSample, x => x.Id == live.Id);
        Assert.True(d.ReviewQueues.CoursesInReview >= 1);
        Assert.Contains(d.OrdersByCurrency, x => x.Currency == "SAR" && x.Count == 1 && x.Amount == 40m);
        Assert.Contains(d.RefundsByCurrency, x => x.Currency == "SAR" && x.Count == 1 && x.Amount == 10m);
        Assert.Equal(1, d.PendingRefundRequests);
        Assert.Null(d.AiUsage);
    }
}
