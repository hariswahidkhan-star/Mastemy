using System.Net;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Assessment;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Assessment.AssessmentFixture;

namespace Mastemy.Tests.Assessment;

/// <summary>Self-graded spaced review, safe bookmarking, regrade preview, template preview and staff assessment picker.</summary>
public class FinalGapAssessmentTests(AssessmentFixture fx) : IClassFixture<AssessmentFixture>
{
    private record Live(Course Course, Guid AuthorId, HttpClient Author);

    private async Task<Live> LiveCourse()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId, CourseStatus.Updating);
        return new Live(course, authorId, author);
    }

    private async Task<Question> Q(Live l, string ext, params (string text, bool ok)[] opts)
    {
        if (opts.Length == 0) opts = [(ext + "-right", true), (ext + "-wrong", false), (ext + "-other", false)];
        var q = new Question { CourseId = l.Course.Id, ExternalId = ext, State = QuestionState.Active, CreatedBy = l.AuthorId };
        var v = new QuestionVersion { QuestionId = q.Id, Version = 1, Type = QuestionType.SingleChoice, Stem = ext + " stem", Explanation = ext + " explanation", Tags = "t", SkillCode = "SK" };
        v.Options = opts.Select((o, i) => new QuestionOption { QuestionVersionId = v.Id, SortOrder = i, Text = o.text, IsCorrect = o.ok, Rationale = "because " + o.text }).ToList();
        q.Versions.Add(v);
        await fx.WithDb(async db => { db.Questions.Add(q); await db.SaveChangesAsync(); });
        return q;
    }

    private static async Task<AssessmentDto> Assess(Live l, IEnumerable<Question> qs, AssessmentMode mode = AssessmentMode.Exam, decimal pass = 70m,
        bool cert = false, AssessmentKind kind = AssessmentKind.FinalAssessment, string? title = null)
    {
        var body = new
        {
            title = title ?? "A " + Guid.NewGuid().ToString("N")[..6], kind, mode, timeLimitMinutes = (int?)null, maxAttempts = (int?)null, passPercent = pass,
            multiSelectScoring = MultiSelectScoring.AllOrNothing, questionCount = 0, isPremium = false, countsTowardCertificate = cert,
            questionIds = qs.Select(q => q.Id).ToList(), reviewPolicy = AnswerReviewPolicy.AfterSubmit, shuffleQuestions = false,
        };
        return await Read<AssessmentDto>(await l.Author.PostAsync($"/api/studio/courses/{l.Course.Id}/assessments", JsonBody(body)));
    }

    private static async Task Answer(HttpClient c, AttemptView v, string ext, string optionText)
    {
        var item = v.Items.Single(i => i.Stem == ext + " stem");
        var id = item.Options.Single(o => o.Text == optionText).Id;
        Assert.Equal(HttpStatusCode.OK, (await c.PutAsync($"/api/attempts/{v.Id}/items/{item.ItemId}", JsonBody(new { selectedOptionIds = new[] { id }, flagged = false }))).StatusCode);
    }

    private static async Task<AttemptView> Start(HttpClient c, Guid assessmentId) => await Read<AttemptView>(await c.PostAsync($"/api/assessments/{assessmentId}/attempts", null));

    [Fact]
    public async Task Learner_self_grades_practice_items_and_due_reviews_with_sm2_quality()
    {
        var l = await LiveCourse();
        var q1 = await Q(l, "SG1");
        await Assess(l, [q1], mode: AssessmentMode.Practice, kind: AssessmentKind.LessonPractice);
        var (uid, learner) = await fx.User(Roles.Student);
        await fx.WithDb(async db => { db.Enrollments.Add(new Enrollment { UserId = uid, CourseId = l.Course.Id }); await db.SaveChangesAsync(); });

        var s = await Read<PracticeSessionView>(await learner.PostAsync("/api/practice/sessions", JsonBody(new { count = 5 })));
        var item = Assert.Single(s.Items);
        Assert.Equal(q1.Id, item.QuestionId); // practice views carry a stable question id for bookmarking
        var url = $"/api/practice/sessions/{s.Id}/items/{item.ItemId}";

        // Not before the answer is revealed; quality must be 0..5.
        Assert.Equal(HttpStatusCode.Conflict, (await learner.PostAsync(url + "/self-grade", JsonBody(new { quality = 5 }))).StatusCode);
        var wrong = item.Options.Single(o => o.Text == "SG1-wrong").Id;
        await Read<PracticeItemView>(await learner.PutAsync(url, JsonBody(new { selectedOptionIds = new[] { wrong } })));
        await Read<CheckResult>(await learner.PostAsync(url + "/check", null));
        var auto = await fx.WithDb(db => db.Set<ReviewCard>().AsNoTracking().SingleAsync(c => c.UserId == uid && c.QuestionId == q1.Id));
        Assert.Equal((0, 1, 1), (auto.Repetitions, auto.IntervalDays, auto.LastQuality));
        Assert.Equal(HttpStatusCode.BadRequest, (await learner.PostAsync(url + "/self-grade", JsonBody(new { quality = 6 }))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await learner.PostAsync(url + "/self-grade", JsonBody(new { }))).StatusCode);

        // Self-grade 5 replaces the automatic step (computed from the pre-check state, not stacked on top of it).
        var graded = await Read<ReviewCardDto>(await learner.PostAsync(url + "/self-grade", JsonBody(new { quality = 5 })));
        var (reps, ease, interval) = Sm2.Next(0, 2.5m, 0, 5);
        Assert.Equal((reps, ease, interval, 5), (graded.Repetitions, graded.EaseFactor, graded.IntervalDays, graded.LastQuality));
        Assert.Equal(HttpStatusCode.Conflict, (await learner.PostAsync(url + "/self-grade", JsonBody(new { quality = 4 }))).StatusCode);
        Assert.Equal(5, (await Read<PracticeSessionView>(await learner.GetAsync($"/api/practice/sessions/{s.Id}"))).Items.Single().SelfGrade);

        // Another learner cannot self-grade this item.
        var (_, other) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await other.PostAsync(url + "/self-grade", JsonBody(new { quality = 3 }))).StatusCode);

        // Due-review self-grade applies a new step to an existing card only.
        var step = await Read<ReviewCardDto>(await learner.PostAsync($"/api/practice/review/{q1.Id}/grade", JsonBody(new { quality = 4 })));
        var expected = Sm2.Next(graded.Repetitions, graded.EaseFactor, graded.IntervalDays, 4);
        Assert.Equal((expected.Repetitions, expected.IntervalDays), (step.Repetitions, step.IntervalDays));
        Assert.Equal(HttpStatusCode.NotFound, (await other.PostAsync($"/api/practice/review/{q1.Id}/grade", JsonBody(new { quality = 4 }))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await learner.PostAsync($"/api/practice/review/{q1.Id}/grade", JsonBody(new { quality = -1 }))).StatusCode);
    }

    [Fact]
    public async Task Bookmarking_from_practice_items_and_finished_attempts_only()
    {
        var l = await LiveCourse();
        var pq = await Q(l, "BP1");
        var eq = await Q(l, "BE1");
        await Assess(l, [pq], mode: AssessmentMode.Practice, kind: AssessmentKind.LessonPractice);
        var exam = await Assess(l, [eq]);
        var (uid, learner) = await fx.User(Roles.Student);
        var (_, other) = await fx.User(Roles.Student);
        await fx.WithDb(async db => { db.Enrollments.Add(new Enrollment { UserId = uid, CourseId = l.Course.Id }); await db.SaveChangesAsync(); });

        var s = await Read<PracticeSessionView>(await learner.PostAsync("/api/practice/sessions", JsonBody(new { count = 5 })));
        var pItem = s.Items.Single(i => i.Stem == "BP1 stem");
        Assert.Equal(HttpStatusCode.NotFound, (await other.PutAsync($"/api/practice/sessions/{s.Id}/items/{pItem.ItemId}/bookmark", null)).StatusCode);
        var marked = await Read<JsonElement>(await learner.PutAsync($"/api/practice/sessions/{s.Id}/items/{pItem.ItemId}/bookmark", null));
        Assert.Equal(pq.Id, marked.GetProperty("questionId").GetGuid());

        // Exam attempt views never expose question ids; bookmarking waits for submission.
        var raw = await (await learner.PostAsync($"/api/assessments/{exam.Id}/attempts", null)).Content.ReadAsStringAsync();
        Assert.DoesNotContain("questionId", raw, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain(eq.Id.ToString(), raw);
        var v = JsonSerializer.Deserialize<AttemptView>(raw, Json)!;
        var eItem = v.Items.Single();
        Assert.Equal(HttpStatusCode.Conflict, (await learner.PutAsync($"/api/attempts/{v.Id}/items/{eItem.ItemId}/bookmark", null)).StatusCode);
        await Answer(learner, v, "BE1", "BE1-right");
        await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{v.Id}/submit", null));
        Assert.Equal(HttpStatusCode.NotFound, (await other.PutAsync($"/api/attempts/{v.Id}/items/{eItem.ItemId}/bookmark", null)).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await learner.PutAsync($"/api/attempts/{v.Id}/items/{eItem.ItemId}/bookmark", null)).StatusCode);

        var marks = await Read<List<BookmarkDto>>(await learner.GetAsync("/api/me/question-bookmarks"));
        Assert.Equal(new[] { pq.Id, eq.Id }.OrderBy(x => x), marks.Select(m => m.QuestionId).OrderBy(x => x));
    }

    [Fact]
    public async Task Regrade_preview_reports_impact_without_writing()
    {
        var l = await LiveCourse();
        var k1 = await Q(l, "RP1", ("RP1-keyed", true), ("RP1-true", false), ("RP1-other", false));
        var k2 = await Q(l, "RP2");
        var a = await Assess(l, [k1, k2], pass: 75m, cert: true);
        var (aId, learnerA) = await fx.User(Roles.Student);
        var (bId, learnerB) = await fx.User(Roles.Student);
        var va = await Start(learnerA, a.Id);
        await Answer(learnerA, va, "RP1", "RP1-true"); await Answer(learnerA, va, "RP2", "RP2-right");
        await Read<AttemptResult>(await learnerA.PostAsync($"/api/attempts/{va.Id}/submit", null));
        var vb = await Start(learnerB, a.Id);
        await Answer(learnerB, vb, "RP1", "RP1-keyed"); await Answer(learnerB, vb, "RP2", "RP2-right");
        await Read<AttemptResult>(await learnerB.PostAsync($"/api/attempts/{vb.Id}/submit", null));

        var version = await fx.WithDb(db => db.QuestionVersions.Include(v => v.Options).FirstAsync(v => v.QuestionId == k1.Id));
        var trueId = version.Options.Single(o => o.Text == "RP1-true").Id;
        var (_, reviewer) = await fx.User(Roles.Reviewer);
        var (_, staff) = await fx.User(Roles.Admin);
        var proposal = await Read<RegradeDto>(await reviewer.PostAsync($"/api/review/questions/{k1.Id}/regrades",
            JsonBody(new { correctOptionIds = new[] { trueId }, reason = "Key error." })));

        Assert.Equal(HttpStatusCode.Forbidden, (await learnerA.GetAsync($"/api/review/regrades/{proposal.Id}/preview")).StatusCode);
        var preview = await Read<RegradePreviewDto>(await reviewer.GetAsync($"/api/review/regrades/{proposal.Id}/preview"));
        Assert.Equal((2, 2, 1, 1, 1), (preview.AffectedAttempts, preview.ChangedAttempts, preview.NewlyPassing, preview.NewlyFailing, preview.CertificatesToFlag));
        var pa = preview.Results.Single(r => r.UserId == aId);
        Assert.Equal((50m, 100m, false, true), (pa.OldScorePercent, pa.NewScorePercent, pa.OldPassed, pa.NewPassed));
        var pb = preview.Results.Single(r => r.UserId == bId);
        Assert.Equal((100m, 50m, true, false), (pb.OldScorePercent, pb.NewScorePercent, pb.OldPassed, pb.NewPassed));

        // Nothing changed: key, stored scores, results and flags are untouched.
        Assert.True(await fx.WithDb(db => db.QuestionOptions.AnyAsync(o => o.QuestionVersionId == version.Id && o.Text == "RP1-keyed" && o.IsCorrect)));
        Assert.Equal(50m, (await fx.WithDb(db => db.Attempts.SingleAsync(x => x.Id == va.Id))).ScorePercent);
        Assert.False(await fx.WithDb(db => db.Set<RegradeResult>().AnyAsync(r => r.RegradeId == proposal.Id)));
        Assert.Equal(RegradeStatus.Proposed, (await fx.WithDb(db => db.Set<RegradeRequest>().SingleAsync(r => r.Id == proposal.Id))).Status);

        // The preview matches the applied outcome; afterwards preview is closed.
        var detail = await Read<RegradeDetailDto>(await staff.PostAsync($"/api/admin/regrades/{proposal.Id}/approve", JsonBody(new { note = "ok" })));
        Assert.Equal(preview.ChangedAttempts, detail.Regrade.ChangedAttempts);
        Assert.Equal(HttpStatusCode.Conflict, (await reviewer.GetAsync($"/api/review/regrades/{proposal.Id}/preview")).StatusCode);
    }

    [Fact]
    public async Task Certificate_template_preview_pdf_is_staff_only()
    {
        var (_, staff) = await fx.User(Roles.Admin);
        var (_, instructor) = await fx.User(Roles.Instructor);
        var tpl = await Read<CertificateTemplateDto>(await staff.PostAsync("/api/admin/certificate-templates", JsonBody(new
        {
            name = "Preview " + Guid.NewGuid().ToString("N")[..4], titleText = "Certificate of Mastery", primaryColor = "#123456", accentColor = "#654321",
            logoResourceId = (Guid?)null, signatureName = "Dr. P", signatureTitle = "Dean",
        })));
        var r = await staff.GetAsync($"/api/admin/certificate-templates/{tpl.Id}/preview.pdf");
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        Assert.Equal("application/pdf", r.Content.Headers.ContentType!.MediaType);
        var bytes = await r.Content.ReadAsByteArrayAsync();
        Assert.StartsWith("%PDF", System.Text.Encoding.ASCII.GetString(bytes[..4]));
        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.GetAsync($"/api/admin/certificate-templates/{tpl.Id}/preview.pdf")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await staff.GetAsync($"/api/admin/certificate-templates/{Guid.NewGuid()}/preview.pdf")).StatusCode);
        Assert.False(await fx.WithDb(db => db.Certificates.AnyAsync(c => c.Code == "SAMPLE-PREVIEW"))); // nothing stored
    }

    [Fact]
    public async Task Staff_assessment_picker_searches_title_and_course()
    {
        var l = await LiveCourse();
        var q = await Q(l, "PK1");
        var a = await Assess(l, [q], title: "Pharmacology Final " + Guid.NewGuid().ToString("N")[..4]);
        var (_, staff) = await fx.User(Roles.Admin);
        var (_, learner) = await fx.User(Roles.Student);

        var byTitle = await Read<List<AssessmentPickerDto>>(await staff.GetAsync($"/api/admin/assessments?q={Uri.EscapeDataString(a.Title)}"));
        var hit = Assert.Single(byTitle);
        Assert.Equal((a.Id, l.Course.Id, l.Course.Code), (hit.Id, hit.CourseId, hit.CourseCode));
        Assert.Contains(await Read<List<AssessmentPickerDto>>(await staff.GetAsync($"/api/admin/assessments?q={l.Course.Code}")), x => x.Id == a.Id);
        Assert.Contains(await Read<List<AssessmentPickerDto>>(await staff.GetAsync($"/api/admin/assessments?q={a.Id}")), x => x.Id == a.Id);
        Assert.Empty(await Read<List<AssessmentPickerDto>>(await staff.GetAsync("/api/admin/assessments?q=zz-no-such-thing-zz")));
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.GetAsync("/api/admin/assessments?q=a")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await l.Author.GetAsync("/api/admin/assessments?q=a")).StatusCode);
    }
}
