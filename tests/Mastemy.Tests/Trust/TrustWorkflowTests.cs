using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Mastemy.Api.Modules.Trust;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Trust.TrustDb;

namespace Mastemy.Tests.Trust;

public class TrustWorkflowTests(TrustFixture fx) : IClassFixture<TrustFixture>
{
    private const string Evidence = "I own the copyright to this material; see registration #12345 and the original at example.org.";

    private async Task<Guid> FileAnon(string type, string target, Guid id, string? email = "owner@example.org")
    {
        var anon = fx.Factory.CreateClient();
        var r = await anon.PostAsync("/api/complaints", JsonBody(new { type, targetType = target, targetId = id, evidence = Evidence, email, name = "Rights Owner" }));
        return (await Read<ComplaintFiledDto>(r)).Id;
    }

    private async Task<ComplaintResolutionDto> Resolve(HttpClient staff, Guid id, string action) =>
        await Read<ComplaintResolutionDto>(await staff.PostAsync($"/api/admin/trust/complaints/{id}/resolve", JsonBody(new { action, note = "Reviewed evidence." })));

    // ---------- complaints ----------

    [Fact]
    public async Task Anonymous_complaint_requires_a_valid_email_and_existing_target()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid);
        var anon = fx.Factory.CreateClient();
        var noEmail = await anon.PostAsync("/api/complaints", JsonBody(new { type = "Copyright", targetType = "Course", targetId = course.Id, evidence = Evidence }));
        Assert.Equal(HttpStatusCode.BadRequest, noEmail.StatusCode);
        Assert.Equal("email_required", await ErrorCode(noEmail));
        var badEmail = await anon.PostAsync("/api/complaints", JsonBody(new { type = "Copyright", targetType = "Course", targetId = course.Id, evidence = Evidence, email = "nope" }));
        Assert.Equal("invalid_email", await ErrorCode(badEmail));
        var badType = await anon.PostAsync("/api/complaints", JsonBody(new { type = "Spam", targetType = "Course", targetId = course.Id, evidence = Evidence, email = "a@b.org" }));
        Assert.Equal("invalid_type", await ErrorCode(badType));
        var shortEvidence = await anon.PostAsync("/api/complaints", JsonBody(new { type = "Abuse", targetType = "Course", targetId = course.Id, evidence = "bad", email = "a@b.org" }));
        Assert.Equal("invalid_evidence", await ErrorCode(shortEvidence));
        var missing = await anon.PostAsync("/api/complaints", JsonBody(new { type = "Abuse", targetType = "Lesson", targetId = Guid.NewGuid(), evidence = Evidence, email = "a@b.org" }));
        Assert.Equal(HttpStatusCode.NotFound, missing.StatusCode);

        var id = await FileAnon("Copyright", "Course", course.Id);
        var row = await fx.WithDb(db => db.Set<Complaint>().SingleAsync(c => c.Id == id));
        Assert.Null(row.ReporterUserId);
        Assert.Equal(course.Id, row.CourseId);
        Assert.Equal(ComplaintStatus.Open, row.Status);
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(a => a.Action == "complaint.filed" && a.EntityId == id.ToString())));
    }

    [Fact]
    public async Task Signed_in_complaint_defaults_contact_to_account_email()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (course, lessonId) = await fx.Course(aid);
        var (uid, learner) = await fx.User(Roles.Student);
        var dto = await Read<ComplaintFiledDto>(await learner.PostAsync("/api/complaints",
            JsonBody(new { type = "Privacy", targetType = "Lesson", targetId = lessonId, evidence = Evidence })));
        var row = await fx.WithDb(db => db.Set<Complaint>().SingleAsync(c => c.Id == dto.Id));
        Assert.Equal(uid, row.ReporterUserId);
        Assert.EndsWith("@test.local", row.ReporterEmail);
    }

    [Fact]
    public async Task Complaint_queue_is_staff_only()
    {
        var (_, learner) = await fx.User(Roles.Student);
        var (_, instructor) = await fx.User(Roles.Instructor);
        var anon = fx.Factory.CreateClient();
        Assert.Equal(HttpStatusCode.Unauthorized, (await anon.GetAsync("/api/admin/trust/complaints")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.GetAsync("/api/admin/trust/complaints")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.PostAsync($"/api/admin/trust/complaints/{Guid.NewGuid()}/resolve",
            JsonBody(new { action = "Dismiss", note = "x x x" }))).StatusCode);
        var (_, staff) = await fx.User(Roles.Admin);
        var page = await Read<PagedResult<ComplaintDto>>(await staff.GetAsync("/api/admin/trust/complaints?status=Open"));
        Assert.All(page.Items, c => Assert.Equal(ComplaintStatus.Open, c.Status));
    }

    [Fact]
    public async Task Dismiss_closes_without_touching_content_and_cannot_be_resolved_twice()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid, CourseStatus.Published);
        var id = await FileAnon("Other", "Course", course.Id);
        var (_, staff) = await fx.User(Roles.Admin);
        var res = await Resolve(staff, id, "Dismiss");
        Assert.Equal(ComplaintStatus.Dismissed, res.Complaint.Status);
        Assert.Equal(0, res.InstructorsNotified);
        Assert.Equal(CourseStatus.Published, await fx.WithDb(db => db.Courses.Where(c => c.Id == course.Id).Select(c => c.Status).SingleAsync()));
        var again = await staff.PostAsync($"/api/admin/trust/complaints/{id}/resolve", JsonBody(new { action = "Hide", note = "again" }));
        Assert.Equal(HttpStatusCode.Conflict, again.StatusCode);
        Assert.Equal("complaint_closed", await ErrorCode(again));
    }

    [Fact]
    public async Task Archive_takes_a_course_down_through_the_state_machine_and_notifies_instructors()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid, CourseStatus.Published);
        var (_, staff) = await fx.User(Roles.Admin);
        var id = await FileAnon("Copyright", "Course", course.Id);
        var res = await Resolve(staff, id, "Archive");
        Assert.Equal(ComplaintStatus.Actioned, res.Complaint.Status);
        Assert.Equal(1, res.InstructorsNotified);
        Assert.Equal(CourseStatus.Archived, await fx.WithDb(db => db.Courses.Where(c => c.Id == course.Id).Select(c => c.Status).SingleAsync()));
        Assert.True(await fx.WithDb(db => db.Notifications.AnyAsync(n => n.UserId == aid && n.Kind == TrustNotificationKinds.TrustSafety)));
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(a => a.Action == "course.archived" && a.EntityId == course.Id.ToString())));
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(a => a.Action == "complaint.resolved" && a.EntityId == id.ToString())));

        // Hide is not valid for a course and Archive is not valid for content items.
        var id2 = await FileAnon("Copyright", "Course", course.Id);
        var hide = await staff.PostAsync($"/api/admin/trust/complaints/{id2}/resolve", JsonBody(new { action = "Hide", note = "hide it" }));
        Assert.Equal("invalid_action", await ErrorCode(hide));
    }

    [Fact]
    public async Task Hide_review_and_discussion_and_hold_lesson_and_resource()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (course, lessonId) = await fx.Course(aid);
        var (learnerId, learner) = await fx.User(Roles.Student);
        var review = new CourseReview { CourseId = course.Id, UserId = learnerId, Rating = 1, Body = "copied" };
        var thread = new DiscussionThread { CourseId = course.Id, AuthorId = learnerId, Title = "t", Body = "b" };
        var resource = new ResourceFile { CourseId = course.Id, LessonId = lessonId, FileName = "x.pdf", ContentType = "application/pdf", Sha256 = new string('a', 64), StorageKey = new string('a', 64), UploadedBy = aid };
        await fx.WithDb(async db => { db.CourseReviews.Add(review); db.DiscussionThreads.Add(thread); db.ResourceFiles.Add(resource); await db.SaveChangesAsync(); });
        var (_, staff) = await fx.User(Roles.Admin);

        await Resolve(staff, await FileAnon("Abuse", "Review", review.Id), "Hide");
        await Resolve(staff, await FileAnon("Abuse", "Discussion", thread.Id), "Hide");
        Assert.True(await fx.WithDb(db => db.CourseReviews.Where(r => r.Id == review.Id).Select(r => r.Hidden).SingleAsync()));
        Assert.True(await fx.WithDb(db => db.DiscussionThreads.Where(r => r.Id == thread.Id).Select(r => r.Hidden).SingleAsync()));

        var lessonBefore = await learner.GetAsync($"/api/learn/lessons/{lessonId}");
        Assert.NotEqual((HttpStatusCode)451, lessonBefore.StatusCode);
        await Resolve(staff, await FileAnon("Copyright", "Lesson", lessonId), "Hide");
        await Resolve(staff, await FileAnon("Copyright", "Resource", resource.Id), "Hide");

        var anon = fx.Factory.CreateClient();
        var lesson = await anon.GetAsync($"/api/learn/lessons/{lessonId}");
        Assert.Equal((HttpStatusCode)451, lesson.StatusCode);
        Assert.Equal("content_unavailable", await ErrorCode(lesson));
        Assert.Equal((HttpStatusCode)451, (await learner.GetAsync($"/api/learn/lessons/{lessonId}/resources")).StatusCode);
        Assert.Equal((HttpStatusCode)451, (await learner.GetAsync($"/api/learn/resources/{resource.Id}/download")).StatusCode);
        Assert.NotEqual((HttpStatusCode)451, (await staff.GetAsync($"/api/learn/lessons/{lessonId}")).StatusCode);

        // Release the lesson hold → learners reach the lesson endpoint again.
        var holds = await Read<List<ContentHoldDto>>(await staff.GetAsync("/api/admin/trust/holds"));
        var lessonHold = holds.Single(h => h.TargetId == lessonId);
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.PostAsync($"/api/admin/trust/holds/{lessonHold.Id}/release", JsonBody(new { note = "ok now" }))).StatusCode);
        await Read<ContentHoldDto>(await staff.PostAsync($"/api/admin/trust/holds/{lessonHold.Id}/release", JsonBody(new { note = "Counter-notice accepted." })));
        Assert.NotEqual((HttpStatusCode)451, (await anon.GetAsync($"/api/learn/lessons/{lessonId}")).StatusCode);
        var twice = await staff.PostAsync($"/api/admin/trust/holds/{lessonHold.Id}/release", JsonBody(new { note = "again" }));
        Assert.Equal(HttpStatusCode.Conflict, twice.StatusCode);
    }

    [Fact]
    public async Task Signed_in_complainant_gets_an_in_app_notification_on_resolution()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid);
        var (uid, learner) = await fx.User(Roles.Student);
        var dto = await Read<ComplaintFiledDto>(await learner.PostAsync("/api/complaints",
            JsonBody(new { type = "Other", targetType = "Course", targetId = course.Id, evidence = Evidence })));
        var (_, staff) = await fx.User(Roles.Admin);
        var res = await Resolve(staff, dto.Id, "Dismiss");
        Assert.True(res.ComplainantNotified);
        Assert.True(await fx.WithDb(db => db.Notifications.AnyAsync(n => n.UserId == uid && n.Kind == TrustNotificationKinds.TrustSafety)));
    }

    // ---------- instructor suspension ----------

    private static CommissionLedgerEntry Entry(Guid instructor, Guid course, decimal amount) =>
        new() { InstructorId = instructor, CourseId = course, OrderId = Guid.NewGuid(), GrossAmount = amount * 2, InstructorAmount = amount, PlatformAmount = amount };

    [Fact]
    public async Task Suspension_blocks_studio_holds_payouts_keeps_learner_access_and_reinstate_restores()
    {
        var (iid, instructor) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(iid); // Updating: live and editable
        var (otherId, _) = await fx.User(Roles.Instructor);
        var (otherCourse, _) = await fx.Course(otherId, CourseStatus.Published);
        await fx.WithDb(async db => { db.CommissionLedger.AddRange(Entry(iid, course.Id, 10), Entry(iid, course.Id, 5)); await db.SaveChangesAsync(); });
        var (staffId, staff) = await fx.User(Roles.Admin);

        // Non-staff cannot suspend; staff cannot suspend themselves or other staff.
        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.PostAsync($"/api/admin/trust/instructors/{otherId}/suspend", JsonBody(new { reason = "abuse of platform" }))).StatusCode);
        Assert.Equal("self_suspension", await ErrorCode(await staff.PostAsync($"/api/admin/trust/instructors/{staffId}/suspend", JsonBody(new { reason = "testing self" }))));
        var (adminId, _) = await fx.User(Roles.Admin);
        Assert.Equal("cannot_suspend_staff", await ErrorCode(await staff.PostAsync($"/api/admin/trust/instructors/{adminId}/suspend", JsonBody(new { reason = "testing staff" }))));
        var (studentId, _) = await fx.User(Roles.Student);
        Assert.Equal("not_instructor", await ErrorCode(await staff.PostAsync($"/api/admin/trust/instructors/{studentId}/suspend", JsonBody(new { reason = "not an instructor" }))));

        var s = await Read<SuspensionDto>(await staff.PostAsync($"/api/admin/trust/instructors/{iid}/suspend", JsonBody(new { reason = "Repeated copyright strikes." })));
        Assert.Equal(2, s.HeldEntries);
        Assert.Equal(HttpStatusCode.Conflict, (await staff.PostAsync($"/api/admin/trust/instructors/{iid}/suspend", JsonBody(new { reason = "again again" }))).StatusCode);
        Assert.False(await fx.WithDb(db => db.UserRoles.AnyAsync(r => r.UserId == iid && r.Role == Roles.Instructor)));

        // Studio writes blocked even with the still-valid token that carries the Instructor role.
        var upload = await instructor.PostAsync($"/api/studio/courses/{course.Id}/resources", File("a.pdf", Pdf("x")));
        Assert.Equal(HttpStatusCode.Forbidden, upload.StatusCode);
        Assert.Equal("instructor_suspended", await ErrorCode(upload));

        // Learner continuity: course stays live (unchanged status).
        Assert.Equal(CourseStatus.Updating, await fx.WithDb(db => db.Courses.Where(c => c.Id == course.Id).Select(c => c.Status).SingleAsync()));

        // A sale after suspension, plus another instructor's sale; payout batch must only contain the other instructor.
        await fx.WithDb(async db => { db.CommissionLedger.AddRange(Entry(iid, course.Id, 7), Entry(otherId, otherCourse.Id, 3)); await db.SaveChangesAsync(); });
        var (_, finance) = await fx.User(Roles.Finance);
        var batch = await Read<PayoutBatchDto>(await finance.PostAsync("/api/admin/payout-batches", null));
        Assert.DoesNotContain(batch.Lines, l => l.InstructorId == iid);
        Assert.Contains(batch.Lines, l => l.InstructorId == otherId);
        Assert.Equal(3, await fx.WithDb(db => db.CommissionLedger.CountAsync(e => e.PayoutBatchId == s.HoldBatchId)));
        var held = await fx.WithDb(db => db.PayoutBatches.SingleAsync(b => b.Id == s.HoldBatchId));
        Assert.Equal(TrustService.HeldBatchStatus, held.Status);
        // A held batch can never be approved.
        var (_, finance2) = await fx.User(Roles.Finance);
        Assert.Equal(HttpStatusCode.Conflict, (await finance2.PostAsync($"/api/admin/payout-batches/{s.HoldBatchId}/approve", null)).StatusCode);

        var list = await Read<List<SuspensionDto>>(await staff.GetAsync("/api/admin/trust/suspensions"));
        Assert.Contains(list, x => x.UserId == iid);

        var r = await Read<SuspensionDto>(await staff.PostAsync($"/api/admin/trust/instructors/{iid}/reinstate", JsonBody(new { note = "Strikes resolved." })));
        Assert.NotNull(r.ReinstatedAt);
        Assert.True(await fx.WithDb(db => db.UserRoles.AnyAsync(x => x.UserId == iid && x.Role == Roles.Instructor)));
        Assert.Equal(3, await fx.WithDb(db => db.CommissionLedger.CountAsync(e => e.InstructorId == iid && e.PayoutBatchId == null)));
        Assert.False(await fx.WithDb(db => db.PayoutBatches.AnyAsync(b => b.Id == s.HoldBatchId)));
        var upload2 = await instructor.PostAsync($"/api/studio/courses/{course.Id}/resources", File("a.pdf", Pdf("after reinstate")));
        Assert.Equal(HttpStatusCode.Created, upload2.StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await staff.PostAsync($"/api/admin/trust/instructors/{iid}/reinstate", JsonBody(new { note = "again" }))).StatusCode);
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(a => a.Action == "instructor.suspended" && a.EntityId == iid.ToString())));
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(a => a.Action == "instructor.reinstated" && a.EntityId == iid.ToString())));
    }

    // ---------- appeals ----------

    [Fact]
    public async Task Appeal_flow_author_only_one_pending_staff_decides_reinstate()
    {
        var (aid, _) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid);
        var (learnerId, learner) = await fx.User(Roles.Student);
        var (strangerId, stranger) = await fx.User(Roles.Student);
        var review = new CourseReview { CourseId = course.Id, UserId = learnerId, Rating = 2, Body = "honest review", Hidden = true };
        var visible = new CourseReview { CourseId = course.Id, UserId = strangerId, Rating = 4, Body = "fine" };
        await fx.WithDb(async db => { db.CourseReviews.AddRange(review, visible); await db.SaveChangesAsync(); });

        var body = new { targetType = "Review", targetId = review.Id, reason = "My review was factual and polite." };
        Assert.Equal(HttpStatusCode.Unauthorized, (await fx.Factory.CreateClient().PostAsync("/api/appeals", JsonBody(body))).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await stranger.PostAsync("/api/appeals", JsonBody(body))).StatusCode);
        Assert.Equal("not_hidden", await ErrorCode(await stranger.PostAsync("/api/appeals", JsonBody(new { targetType = "Review", targetId = visible.Id, reason = "My review was factual and polite." }))));
        Assert.Equal("invalid_targettype", await ErrorCode(await learner.PostAsync("/api/appeals", JsonBody(new { targetType = "Course", targetId = course.Id, reason = "My review was factual and polite." }))));

        var appeal = await Read<AppealDto>(await learner.PostAsync("/api/appeals", JsonBody(body)));
        Assert.Equal(AppealStatus.Pending, appeal.Status);
        Assert.Equal("appeal_pending", await ErrorCode(await learner.PostAsync("/api/appeals", JsonBody(body))));
        Assert.Single(await Read<List<AppealDto>>(await learner.GetAsync("/api/me/appeals")));

        Assert.Equal(HttpStatusCode.Forbidden, (await learner.PostAsync($"/api/admin/trust/appeals/{appeal.Id}/decision", JsonBody(new { decision = "Reinstate", note = "self" }))).StatusCode);
        var (_, staff) = await fx.User(Roles.Admin);
        Assert.Equal("invalid_decision", await ErrorCode(await staff.PostAsync($"/api/admin/trust/appeals/{appeal.Id}/decision", JsonBody(new { decision = "Maybe", note = "hmm" }))));
        var queue = await Read<PagedResult<AppealDto>>(await staff.GetAsync("/api/admin/trust/appeals?status=Pending"));
        Assert.Contains(queue.Items, a => a.Id == appeal.Id);
        var decided = await Read<AppealDto>(await staff.PostAsync($"/api/admin/trust/appeals/{appeal.Id}/decision", JsonBody(new { decision = "Reinstate", note = "Moderation error." })));
        Assert.Equal(AppealStatus.Reinstated, decided.Status);
        Assert.False(await fx.WithDb(db => db.CourseReviews.Where(r => r.Id == review.Id).Select(r => r.Hidden).SingleAsync()));
        Assert.Equal(HttpStatusCode.Conflict, (await staff.PostAsync($"/api/admin/trust/appeals/{appeal.Id}/decision", JsonBody(new { decision = "Uphold", note = "late" }))).StatusCode);
    }

    [Fact]
    public async Task Upheld_appeal_keeps_content_hidden_and_cannot_be_refiled_and_instructor_may_appeal_on_their_course()
    {
        var (aid, instructor) = await fx.User(Roles.Instructor);
        var (course, _) = await fx.Course(aid);
        var (learnerId, _) = await fx.User(Roles.Student);
        var thread = new DiscussionThread { CourseId = course.Id, AuthorId = learnerId, Title = "Q", Body = "question", Hidden = true };
        await fx.WithDb(async db => { db.DiscussionThreads.Add(thread); await db.SaveChangesAsync(); });
        var body = new { targetType = "Discussion", targetId = thread.Id, reason = "This was a legitimate course question." };
        var appeal = await Read<AppealDto>(await instructor.PostAsync("/api/appeals", JsonBody(body)));
        var (_, staff) = await fx.User(Roles.Admin);
        var decided = await Read<AppealDto>(await staff.PostAsync($"/api/admin/trust/appeals/{appeal.Id}/decision", JsonBody(new { decision = "Uphold", note = "Off-topic." })));
        Assert.Equal(AppealStatus.Upheld, decided.Status);
        Assert.True(await fx.WithDb(db => db.DiscussionThreads.Where(r => r.Id == thread.Id).Select(r => r.Hidden).SingleAsync()));
        Assert.Equal("appeal_already_decided", await ErrorCode(await instructor.PostAsync("/api/appeals", JsonBody(body))));
    }
}
