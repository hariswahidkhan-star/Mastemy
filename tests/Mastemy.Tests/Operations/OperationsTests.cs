using System.Net;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Operations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using static Mastemy.Tests.Operations.OperationsFixture;

namespace Mastemy.Tests.Operations;

public class OperationsTests(OperationsFixture fx) : IClassFixture<OperationsFixture>
{
    // ---------- health ----------

    [Fact]
    public async Task Live_is_anonymous_and_simple()
    {
        var r = await fx.Factory.CreateClient().GetAsync("/health/live");
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        using var doc = JsonDocument.Parse(await r.Content.ReadAsStringAsync());
        Assert.Equal("Healthy", doc.RootElement.GetProperty("status").GetString());
    }

    [Fact]
    public async Task Ready_hides_details_from_anonymous_and_non_staff_but_shows_them_to_staff()
    {
        var anon = await fx.Factory.CreateClient().GetAsync("/health/ready");
        Assert.Equal(HttpStatusCode.OK, anon.StatusCode);
        var anonBody = await anon.Content.ReadAsStringAsync();
        Assert.DoesNotContain("mysql", anonBody);
        Assert.DoesNotContain("freeBytes", anonBody);
        using (var d = JsonDocument.Parse(anonBody))
            Assert.Equal(["status"], d.RootElement.EnumerateObject().Select(p => p.Name).ToList()); // only {status}

        var (_, learner) = await fx.User(Roles.Student);
        Assert.DoesNotContain("mysql", await (await learner.GetAsync("/health/ready")).Content.ReadAsStringAsync());

        var (_, staff) = await fx.User(Roles.Admin);
        var report = await Read<HealthReportDto>(await staff.GetAsync("/health/ready"));
        var names = report.Checks!.Select(c => c.Name).ToList();
        Assert.Contains("mysql", names);
        Assert.Contains("resource_storage", names);
        Assert.Contains("email_outbox", names);
        Assert.Contains("malware_scanner", names);
        Assert.Equal("Healthy", report.Checks!.Single(c => c.Name == "mysql").Status);
        Assert.Equal("Healthy", report.Checks!.Single(c => c.Name == "resource_storage").Status);
    }

    [Fact]
    public async Task Anonymous_ready_is_served_from_a_cached_report_while_staff_get_fresh_details()
    {
        var anon = fx.Factory.CreateClient();
        Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync("/health/ready")).StatusCode); // primes the public cache
        var msg = new EmailOutboxMessage { ToAddress = "y@test.local", Subject = "s", Body = "b", CreatedAt = DateTime.UtcNow.AddHours(-2) };
        await fx.WithDb(async db => { db.EmailOutbox.Add(msg); await db.SaveChangesAsync(); });
        try
        {
            // Within 10s anonymous callers get the cached status: no new probes are triggered by anonymous traffic.
            using (var d = JsonDocument.Parse(await (await anon.GetAsync("/health/ready")).Content.ReadAsStringAsync()))
                Assert.Equal("Healthy", d.RootElement.GetProperty("status").GetString());
            var (_, staff) = await fx.User(Roles.Admin);
            await Task.Delay(HealthController.StaffCacheTtl + TimeSpan.FromMilliseconds(200));
            var report = await Read<HealthReportDto>(await staff.GetAsync("/health/ready"));
            Assert.Equal("Degraded", report.Status);
        }
        finally
        {
            await fx.WithDb(db => db.EmailOutbox.Where(m => m.Id == msg.Id).ExecuteDeleteAsync());
        }
    }

    [Fact]
    public async Task Ready_is_503_when_mysql_is_unreachable()
    {
        await using var f = fx.Create(fx.ConnectionStringFor("mastemy_t_missing_" + Guid.NewGuid().ToString("N")[..8]), fx.RootPath);
        var r = await f.CreateClient().GetAsync("/health/ready");
        Assert.Equal(HttpStatusCode.ServiceUnavailable, r.StatusCode);
        using var doc = JsonDocument.Parse(await r.Content.ReadAsStringAsync());
        Assert.Equal("Unhealthy", doc.RootElement.GetProperty("status").GetString());
        Assert.Equal(HttpStatusCode.OK, (await f.CreateClient().GetAsync("/health/live")).StatusCode);
    }

    [Fact]
    public async Task Outbox_backlog_older_than_threshold_degrades_readiness_but_stays_200()
    {
        var msg = new EmailOutboxMessage { ToAddress = "x@test.local", Subject = "s", Body = "b", CreatedAt = DateTime.UtcNow.AddHours(-2) };
        await fx.WithDb(async db => { db.EmailOutbox.Add(msg); await db.SaveChangesAsync(); });
        try
        {
            var (_, staff) = await fx.User(Roles.SuperAdmin);
            await Task.Delay(HealthController.StaffCacheTtl + TimeSpan.FromMilliseconds(200)); // let a cached staff report from another test expire
            var r = await staff.GetAsync("/health/ready");
            Assert.Equal(HttpStatusCode.OK, r.StatusCode);
            var report = await Read<HealthReportDto>(r);
            Assert.Equal("Degraded", report.Status);
            Assert.Equal("Degraded", report.Checks!.Single(c => c.Name == "email_outbox").Status);
        }
        finally
        {
            await fx.WithDb(db => db.EmailOutbox.Where(m => m.Id == msg.Id).ExecuteDeleteAsync());
        }
    }

    // ---------- correlation id ----------

    [Fact]
    public async Task Correlation_id_is_echoed_when_valid_and_generated_otherwise_including_errors()
    {
        var client = fx.Factory.CreateClient();
        var req = new HttpRequestMessage(HttpMethod.Get, "/health/live");
        req.Headers.Add("X-Correlation-Id", "edge-abc.123_X");
        var r = await client.SendAsync(req);
        Assert.Equal("edge-abc.123_X", r.Headers.GetValues("X-Correlation-Id").Single());

        var bad = new HttpRequestMessage(HttpMethod.Get, "/health/live");
        bad.Headers.TryAddWithoutValidation("X-Correlation-Id", "<script>alert(1)</script>");
        var r2 = await client.SendAsync(bad);
        var generated = r2.Headers.GetValues("X-Correlation-Id").Single();
        Assert.NotEqual("<script>alert(1)</script>", generated);
        Assert.True(CorrelationIdStartupFilter.IsValid(generated));

        var notFound = await client.GetAsync($"/api/admin/trust/complaints/{Guid.NewGuid()}"); // 401 from auth
        Assert.True(notFound.Headers.Contains("X-Correlation-Id"));
        var (_, staff) = await fx.User(Roles.Admin);
        var problem = await staff.GetAsync($"/api/admin/trust/complaints/{Guid.NewGuid()}"); // 404 via exception handler
        Assert.Equal(HttpStatusCode.NotFound, problem.StatusCode);
        Assert.True(problem.Headers.Contains("X-Correlation-Id"));
    }

    // ---------- logging / telemetry configuration ----------

    [Fact]
    public async Task Json_logging_and_otel_are_off_by_default_and_on_when_configured()
    {
        Assert.NotEqual("json", fx.Factory.Services.GetRequiredService<Microsoft.Extensions.Options.IOptionsMonitor<Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions>>().CurrentValue.FormatterName);
        Assert.Null(fx.Factory.Services.GetService<OpenTelemetry.Trace.TracerProvider>());

        await using var f = fx.Create(fx.ConnectionStringFor(fx.DbName), fx.RootPath, new()
        {
            ["Logging:Json"] = "true", ["Otel:Endpoint"] = "http://127.0.0.1:4317", ["Otel:TraceSampleRatio"] = "0.5",
        });
        Assert.Equal("json", f.Services.GetRequiredService<Microsoft.Extensions.Options.IOptionsMonitor<Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions>>().CurrentValue.FormatterName);
        Assert.NotNull(f.Services.GetService<OpenTelemetry.Trace.TracerProvider>());
        Assert.NotNull(f.Services.GetService<OpenTelemetry.Metrics.MeterProvider>());
        Assert.Equal(HttpStatusCode.OK, (await f.CreateClient().GetAsync("/health/live")).StatusCode);
    }

    // ---------- quality queues ----------

    private async Task<(Course Course, Guid LessonId, VideoAsset Asset, Guid OwnerId)> LiveCourseWithVideo(VideoStatus status, Guid? existingAsset = null)
    {
        var (ownerId, _) = await fx.User(Roles.Instructor);
        var asset = new VideoAsset { YouTubeVideoId = "yt" + Guid.NewGuid().ToString("N")[..9], Title = "Intro", Status = status, UploaderId = ownerId, StatusReason = "Removed by uploader" };
        var code = "C" + Guid.NewGuid().ToString("N")[..8].ToUpperInvariant();
        var course = new Course { Code = code, Slug = code.ToLowerInvariant(), Title = "Course " + code, OwnerId = ownerId, Status = CourseStatus.Published, PublishedAt = DateTime.UtcNow };
        var m = new CourseModule { CourseId = course.Id, Code = "M01", Title = "M" };
        var lesson = new Lesson { ModuleId = m.Id, Code = "L01", Title = "Broken lesson", VideoAssetId = existingAsset ?? asset.Id };
        m.Lessons.Add(lesson); course.Modules.Add(m);
        course.Instructors.Add(new CourseInstructor { CourseId = course.Id, UserId = ownerId, Role = CourseInstructorRole.Owner });
        await fx.WithScope(async sp =>
        {
            var db = sp.GetRequiredService<Mastemy.Api.Data.AppDbContext>();
            if (existingAsset is null) db.VideoAssets.Add(asset);
            db.Courses.Add(course);
            await db.SaveChangesAsync();
            await sp.GetRequiredService<CourseSnapshotService>().AddSnapshot(course, ownerId, DateTime.UtcNow);
            await db.SaveChangesAsync();
            return 0;
        });
        return (course, lesson.Id, asset, ownerId);
    }

    [Fact]
    public async Task Staff_mark_override_is_audited_and_broken_video_notices_respect_preferences()
    {
        var (_, _, asset, ownerId) = await LiveCourseWithVideo(VideoStatus.Ready);
        var (_, staff) = await fx.User(Roles.Admin);
        var (_, reviewer) = await fx.User(Roles.Reviewer);
        var url = $"/api/admin/youtube/videos/{asset.Id}/mark";

        Assert.Equal(HttpStatusCode.Forbidden, (await reviewer.PostAsync(url, JsonBody(new { status = "Restricted", reason = "Gone" }))).StatusCode);
        var ready = await staff.PostAsync(url, JsonBody(new { status = "Ready", reason = "Looks fine" }));
        Assert.Equal(HttpStatusCode.BadRequest, ready.StatusCode);
        Assert.Contains("use_confirm", await ready.Content.ReadAsStringAsync());
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsync(url, JsonBody(new { status = "Processing", reason = "x" }))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsync(url, JsonBody(new { status = "Restricted", reason = " " }))).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await staff.PostAsync($"/api/admin/youtube/videos/{Guid.NewGuid()}/mark", JsonBody(new { status = "Failed", reason = "x" }))).StatusCode);

        var marked = await staff.PostAsync(url, JsonBody(new { status = "restricted", reason = "Video made private by the channel owner." }));
        Assert.Equal(HttpStatusCode.OK, marked.StatusCode);
        var row = await fx.WithDb(db => db.VideoAssets.AsNoTracking().SingleAsync(v => v.Id == asset.Id));
        Assert.Equal((VideoStatus.Restricted, "Video made private by the channel owner."), (row.Status, row.StatusReason));
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(a => a.Action == "video.marked" && a.EntityId == asset.Id.ToString() && a.Details!.Contains("Ready"))));

        // Upload-pipeline states cannot be overridden.
        var (upId, _) = await fx.User(Roles.Instructor);
        var uploading = new VideoAsset { YouTubeVideoId = "up" + Guid.NewGuid().ToString("N")[..9], Title = "U", Status = VideoStatus.Uploading, UploaderId = upId };
        await fx.WithDb(async db => { db.VideoAssets.Add(uploading); await db.SaveChangesAsync(); });
        Assert.Equal(HttpStatusCode.Conflict, (await staff.PostAsync($"/api/admin/youtube/videos/{uploading.Id}/mark", JsonBody(new { status = "Failed", reason = "stuck" }))).StatusCode);

        // The owner turned broken_video in-app notifications off: the notice is sent through the service and skipped.
        await fx.WithDb(async db =>
        {
            db.NotificationPreferences.Add(new NotificationPreference { UserId = ownerId, Kind = "broken_video", InApp = false });
            await db.SaveChangesAsync();
        });
        var notice = await Read<BrokenLinkNoticeDto>(await staff.PostAsync($"/api/admin/operations/broken-links/{asset.Id}/notify", null));
        Assert.Equal(1, notice.Recipients);
        Assert.False(await fx.WithDb(db => db.Notifications.AnyAsync(n => n.UserId == ownerId && n.Kind == "broken_video")));
        Assert.Equal(1, notice.CoursesNotified);
    }

    [Fact]
    public async Task Broken_link_queue_lists_live_snapshot_lessons_and_notify_alerts_instructors()
    {
        var (course, lessonId, asset, ownerId) = await LiveCourseWithVideo(VideoStatus.Restricted);
        var (_, healthyCourseLesson, healthy, _) = await LiveCourseWithVideo(VideoStatus.Ready);
        // A draft-only link (course never published) must not appear.
        var (draftOwner, _) = await fx.User(Roles.Instructor);
        var draftAsset = new VideoAsset { YouTubeVideoId = "draftvid0001", Title = "D", Status = VideoStatus.Failed, UploaderId = draftOwner };
        await fx.WithDb(async db => { db.VideoAssets.Add(draftAsset); await db.SaveChangesAsync(); });

        var (_, staff) = await fx.User(Roles.Admin);
        var (_, instructor) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.GetAsync("/api/admin/operations/broken-links")).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await fx.Factory.CreateClient().GetAsync("/api/admin/operations/broken-links")).StatusCode);

        var queue = await Read<List<BrokenLinkDto>>(await staff.GetAsync("/api/admin/operations/broken-links"));
        var item = Assert.Single(queue, q => q.VideoAssetId == asset.Id);
        Assert.DoesNotContain(queue, q => q.VideoAssetId == healthy.Id || q.VideoAssetId == draftAsset.Id);
        var affected = Assert.Single(item.Courses);
        Assert.Equal(course.Id, affected.CourseId);
        Assert.Equal(lessonId, Assert.Single(affected.Lessons).LessonId);
        Assert.Null(item.LastNotifiedAt);

        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.PostAsync($"/api/admin/operations/broken-links/{asset.Id}/notify", null)).StatusCode);
        var notice = await Read<BrokenLinkNoticeDto>(await staff.PostAsync($"/api/admin/operations/broken-links/{asset.Id}/notify", null));
        Assert.Equal(1, notice.CoursesNotified);
        Assert.Equal(1, notice.Recipients);
        Assert.True(await fx.WithDb(db => db.Notifications.AnyAsync(n => n.UserId == ownerId && n.Kind == "broken_video")));
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(a => a.Action == "broken_link.notified" && a.EntityId == asset.Id.ToString())));
        var again = await Read<List<BrokenLinkDto>>(await staff.GetAsync("/api/admin/operations/broken-links"));
        Assert.NotNull(again.Single(q => q.VideoAssetId == asset.Id).LastNotifiedAt);

        Assert.Equal(HttpStatusCode.Conflict, (await staff.PostAsync($"/api/admin/operations/broken-links/{healthy.Id}/notify", null)).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await staff.PostAsync($"/api/admin/operations/broken-links/{draftAsset.Id}/notify", null)).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await staff.PostAsync($"/api/admin/operations/broken-links/{Guid.NewGuid()}/notify", null)).StatusCode);
        _ = healthyCourseLesson;
    }

    [Fact]
    public async Task Overdue_content_lists_live_courses_not_republished_within_N_months()
    {
        var (stale, _, _, _) = await LiveCourseWithVideo(VideoStatus.Ready);
        var (fresh, _, _, _) = await LiveCourseWithVideo(VideoStatus.Ready);
        await fx.WithDb(db => db.CourseSnapshots.Where(s => s.CourseId == stale.Id).ExecuteUpdateAsync(u => u.SetProperty(s => s.PublishedAt, DateTime.UtcNow.AddMonths(-14))));
        var (_, staff) = await fx.User(Roles.Admin);
        var list = await Read<List<OverdueCourseDto>>(await staff.GetAsync("/api/admin/operations/overdue-content?months=12"));
        var row = Assert.Single(list, x => x.CourseId == stale.Id);
        Assert.InRange(row.MonthsSincePublish, 13, 15);
        Assert.DoesNotContain(list, x => x.CourseId == fresh.Id);
        Assert.DoesNotContain(await Read<List<OverdueCourseDto>>(await staff.GetAsync("/api/admin/operations/overdue-content?months=24")), x => x.CourseId == stale.Id);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.GetAsync("/api/admin/operations/overdue-content?months=0")).StatusCode);
        var (_, learner) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.GetAsync("/api/admin/operations/overdue-content")).StatusCode);
    }
}
