using System.Net;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Assessment;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Assessment.AssessmentFixture;

namespace Mastemy.Tests.Assessment;

public class AttemptTests(AssessmentFixture fx) : IClassFixture<AssessmentFixture>
{
    private record Setup(Course Course, HttpClient Author, List<Guid> QuestionIds);

    /// <summary>Live course with one Active single-choice and one Active multiple-select question.</summary>
    private async Task<Setup> LiveCourse(CourseStatus status = CourseStatus.Published)
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId, status);
        Question Make(string ext, QuestionType type, string tag, params (string text, bool ok)[] opts)
        {
            var q = new Question { CourseId = course.Id, ExternalId = ext, State = QuestionState.Active, CreatedBy = authorId };
            var v = new QuestionVersion { QuestionId = q.Id, Version = 1, Type = type, Stem = ext + " stem", Explanation = ext + " explanation", Tags = tag, SkillCode = "SK" };
            v.Options = opts.Select((o, i) => new QuestionOption { QuestionVersionId = v.Id, SortOrder = i, Text = o.text, IsCorrect = o.ok, Rationale = "because " + o.text }).ToList();
            q.Versions.Add(v);
            return q;
        }
        var s = Make("S", QuestionType.SingleChoice, "topicS", ("S-right", true), ("S-wrong1", false), ("S-wrong2", false));
        var m = Make("M", QuestionType.MultipleSelect, "topicM;other", ("M-right1", true), ("M-right2", true), ("M-wrong1", false), ("M-wrong2", false));
        var draft = Make("D", QuestionType.SingleChoice, "draft", ("D-right", true), ("D-wrong", false));
        draft.State = QuestionState.Draft; // never served
        await fx.WithDb(async db => { db.Questions.AddRange(s, m, draft); await db.SaveChangesAsync(); });
        return new Setup(course, author, [s.Id, m.Id, draft.Id]);
    }

    private static async Task<AssessmentDto> CreateAssessment(Setup s, AssessmentMode mode = AssessmentMode.Exam, MultiSelectScoring scoring = MultiSelectScoring.AllOrNothing,
        int? maxAttempts = null, int? timeLimit = null, bool premium = false, bool cert = false, decimal pass = 70m)
    {
        var body = new
        {
            title = "Quiz " + Guid.NewGuid().ToString("N")[..6], kind = AssessmentKind.FinalAssessment, mode, timeLimitMinutes = timeLimit,
            maxAttempts, passPercent = pass, multiSelectScoring = scoring, questionCount = 0, isPremium = premium, countsTowardCertificate = cert,
            questionIds = s.QuestionIds,
        };
        return await Read<AssessmentDto>(await s.Author.PostAsync($"/api/studio/courses/{s.Course.Id}/assessments", JsonBody(body)));
    }

    private static async Task Answer(HttpClient c, AttemptView v, QuestionType type, params string[] texts)
    {
        var item = v.Items.Single(i => i.Type == type);
        var ids = item.Options.Where(o => texts.Contains(o.Text)).Select(o => o.Id).ToList();
        var r = await c.PutAsync($"/api/attempts/{v.Id}/items/{item.ItemId}", JsonBody(new { selectedOptionIds = ids, flagged = false }));
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        var raw = (await r.Content.ReadAsStringAsync()).ToLowerInvariant();
        Assert.DoesNotContain("iscorrect", raw);
        Assert.DoesNotContain("rationale", raw);
    }

    [Theory]
    [InlineData(QuestionType.SingleChoice, MultiSelectScoring.AllOrNothing, "a", "a", 1)]
    [InlineData(QuestionType.SingleChoice, MultiSelectScoring.PartialCredit, "a", "b", 0)]
    [InlineData(QuestionType.MultipleSelect, MultiSelectScoring.AllOrNothing, "ab", "ab", 1)]
    [InlineData(QuestionType.MultipleSelect, MultiSelectScoring.AllOrNothing, "ab", "a", 0)]
    [InlineData(QuestionType.MultipleSelect, MultiSelectScoring.PartialCredit, "ab", "a", 0.5)]
    [InlineData(QuestionType.MultipleSelect, MultiSelectScoring.PartialCredit, "ab", "abc", 0.5)]
    [InlineData(QuestionType.MultipleSelect, MultiSelectScoring.PartialCredit, "ab", "ac", 0)]
    [InlineData(QuestionType.MultipleSelect, MultiSelectScoring.PartialCredit, "ab", "cd", 0)]
    [InlineData(QuestionType.MultipleSelect, MultiSelectScoring.PartialCredit, "abc", "ab", 0.6667)]
    [InlineData(QuestionType.MultipleSelect, MultiSelectScoring.PartialCredit, "ab", "", 0)]
    public void Scoring_rules(QuestionType type, MultiSelectScoring policy, string correct, string selected, double expected)
    {
        var ids = "abcd".ToDictionary(c => c, _ => Guid.NewGuid());
        var points = Scoring.Item(type, correct.Select(c => ids[c]).ToList(), selected.Select(c => ids[c]).ToList(), policy);
        Assert.Equal((decimal)expected, points);
    }

    [Fact]
    public async Task Attempt_dtos_never_contain_answer_keys_and_only_active_questions_are_used()
    {
        var s = await LiveCourse();
        var a = await CreateAssessment(s);
        var (_, learner) = await fx.User(Roles.Student);

        var summary = await learner.GetAsync($"/api/assessments/{a.Id}");
        var summaryRaw = await summary.Content.ReadAsStringAsync();
        Assert.Contains("PartialCredit", summaryRaw); // scoring rules are documented
        Assert.DoesNotContain("isCorrect", summaryRaw, StringComparison.OrdinalIgnoreCase);

        var start = await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null);
        var raw = await start.Content.ReadAsStringAsync();
        Assert.Equal(HttpStatusCode.OK, start.StatusCode);
        Assert.DoesNotContain("iscorrect", raw.ToLowerInvariant());
        Assert.DoesNotContain("rationale", raw.ToLowerInvariant());
        Assert.DoesNotContain("explanation", raw.ToLowerInvariant());
        var view = JsonSerializer.Deserialize<AttemptView>(raw, Json)!;
        Assert.Equal(2, view.Items.Count);
        Assert.DoesNotContain(view.Items, i => i.Stem.StartsWith("D "));

        var get = (await (await learner.GetAsync($"/api/attempts/{view.Id}")).Content.ReadAsStringAsync()).ToLowerInvariant();
        Assert.DoesNotContain("iscorrect", get);
        Assert.DoesNotContain("rationale", get);

        // Starting again returns the same in-progress attempt.
        var again = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null));
        Assert.Equal(view.Id, again.Id);

        // Another learner cannot see this attempt.
        var (_, other) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await other.GetAsync($"/api/attempts/{view.Id}")).StatusCode);
    }

    [Theory]
    [InlineData(MultiSelectScoring.PartialCredit, 75, true)]
    [InlineData(MultiSelectScoring.AllOrNothing, 50, false)]
    public async Task Multi_select_scoring_policies_apply_on_submit(MultiSelectScoring policy, decimal expectedScore, bool passed)
    {
        var s = await LiveCourse();
        var a = await CreateAssessment(s, scoring: policy);
        var (_, learner) = await fx.User(Roles.Student);
        var view = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null));
        await Answer(learner, view, QuestionType.SingleChoice, "S-right");
        await Answer(learner, view, QuestionType.MultipleSelect, "M-right1", "M-right2", "M-wrong1"); // (2-1)/2 = 0.5

        var result = await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{view.Id}/submit", null));
        Assert.Equal(expectedScore, result.ScorePercent);
        Assert.Equal(passed, result.Passed);
        Assert.Equal(1, result.Correct);
        Assert.Equal(1, result.Incorrect);
        Assert.Equal(0, result.Unanswered);
        Assert.Contains(result.Topics, t => t.Tag == "topicM" && t.Total == 1);
        Assert.NotNull(result.Review); // Exam: review available after submit
        Assert.All(result.Review!, r => Assert.All(r.Options, o => Assert.False(string.IsNullOrEmpty(o.Rationale))));

        // Submit is idempotent.
        var again = await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{view.Id}/submit", null));
        Assert.Equal(result.ScorePercent, again.ScorePercent);
        Assert.Equal(AttemptStatus.Submitted, again.Status);
    }

    [Fact]
    public async Task Answers_after_deadline_are_rejected_and_attempt_expires()
    {
        var s = await LiveCourse();
        var a = await CreateAssessment(s, timeLimit: 10);
        var (_, learner) = await fx.User(Roles.Student);
        var view = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null));
        Assert.NotNull(view.DeadlineAt);
        Assert.True(view.DeadlineAt > view.ServerNow.AddMinutes(9));
        await Answer(learner, view, QuestionType.SingleChoice, "S-right");

        await fx.WithDb(async db => { var at = await db.Attempts.SingleAsync(x => x.Id == view.Id); at.DeadlineAt = DateTime.UtcNow.AddMinutes(-1); await db.SaveChangesAsync(); });
        var item = view.Items.Single(i => i.Type == QuestionType.MultipleSelect);
        var late = await learner.PutAsync($"/api/attempts/{view.Id}/items/{item.ItemId}", JsonBody(new { selectedOptionIds = new[] { item.Options[0].Id }, flagged = false }));
        Assert.Equal(HttpStatusCode.Conflict, late.StatusCode);

        var detail = await Read<AttemptDetail>(await learner.GetAsync($"/api/attempts/{view.Id}"));
        Assert.Equal(AttemptStatus.Expired, detail.Attempt.Status);
        Assert.NotNull(detail.Result);
        Assert.Equal(50m, detail.Result!.ScorePercent); // only the pre-deadline answer counts
        Assert.Equal(1, detail.Result.Unanswered);
    }

    [Fact]
    public async Task Attempt_limit_is_enforced()
    {
        var s = await LiveCourse();
        var a = await CreateAssessment(s, maxAttempts: 1);
        var (_, learner) = await fx.User(Roles.Student);
        var view = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null));
        await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{view.Id}/submit", null));
        var second = await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null);
        Assert.Equal(HttpStatusCode.Conflict, second.StatusCode);
    }

    [Fact]
    public async Task Premium_assessment_requires_entitlement()
    {
        var s = await LiveCourse();
        var a = await CreateAssessment(s, premium: true);
        var (learnerId, learner) = await fx.User(Roles.Student);
        var summary = await Read<AssessmentSummaryDto>(await learner.GetAsync($"/api/assessments/{a.Id}"));
        Assert.True(summary.PremiumLocked);
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null)).StatusCode);

        await fx.WithDb(async db =>
        {
            db.Entitlements.Add(new Entitlement { UserId = learnerId, CourseId = s.Course.Id, Source = EntitlementSource.Grant, StartsAt = DateTime.UtcNow.AddMinutes(-1) });
            await db.SaveChangesAsync();
        });
        Assert.Equal(HttpStatusCode.OK, (await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null)).StatusCode);
    }

    [Fact]
    public async Task Unpublished_course_assessments_are_hidden()
    {
        var s = await LiveCourse(CourseStatus.Draft);
        var a = await CreateAssessment(s);
        var (_, learner) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await learner.GetAsync($"/api/assessments/{a.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null)).StatusCode);
    }

    [Fact]
    public async Task Check_is_practice_only()
    {
        var s = await LiveCourse();
        var exam = await CreateAssessment(s);
        var practice = await CreateAssessment(s, mode: AssessmentMode.Practice);
        var (_, learner) = await fx.User(Roles.Student);

        var ev = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{exam.Id}/attempts", null));
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.PostAsync($"/api/attempts/{ev.Id}/items/{ev.Items[0].ItemId}/check", null)).StatusCode);

        var pv = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{practice.Id}/attempts", null));
        await Answer(learner, pv, QuestionType.SingleChoice, "S-right");
        var item = pv.Items.Single(i => i.Type == QuestionType.SingleChoice);
        var check = await Read<CheckResult>(await learner.PostAsync($"/api/attempts/{pv.Id}/items/{item.ItemId}/check", null));
        Assert.True(check.Correct);
        Assert.Single(check.CorrectOptionIds);
        Assert.Equal(3, check.Rationales.Count);
    }

    [Fact]
    public async Task Certificate_is_issued_once_on_pass_and_verification_is_minimal()
    {
        var s = await LiveCourse();
        var a1 = await CreateAssessment(s, cert: true);
        var a2 = await CreateAssessment(s, cert: true);
        var (learnerId, learner) = await fx.User(Roles.Student);

        // Practice-mode assessments cannot count toward a certificate.
        var bad = await s.Author.PostAsync($"/api/studio/courses/{s.Course.Id}/assessments", JsonBody(new
        {
            title = "P", kind = "MockExam", mode = "Practice", passPercent = 50, multiSelectScoring = "AllOrNothing", questionCount = 0,
            isPremium = false, countsTowardCertificate = true, questionIds = s.QuestionIds,
        }));
        Assert.Equal(HttpStatusCode.BadRequest, bad.StatusCode);

        // A failed attempt issues nothing.
        var failView = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{a2.Id}/attempts", null));
        var fail = await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{failView.Id}/submit", null));
        Assert.False(fail.Passed);
        Assert.Null(fail.CertificateCode);

        string? code = null;
        foreach (var a in new[] { a1, a2 })
        {
            var v = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null));
            await Answer(learner, v, QuestionType.SingleChoice, "S-right");
            await Answer(learner, v, QuestionType.MultipleSelect, "M-right1", "M-right2");
            var r = await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{v.Id}/submit", null));
            Assert.True(r.Passed);
            Assert.NotNull(r.CertificateCode);
            code ??= r.CertificateCode;
            Assert.Equal(code, r.CertificateCode);
        }
        Assert.Equal(1, await fx.WithDb(db => db.Certificates.CountAsync(c => c.UserId == learnerId)));
        Assert.Matches("^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{12}$", code);

        var anon = fx.Factory.CreateClient();
        var verify = await anon.GetAsync($"/api/certificates/verify/{code}");
        Assert.Equal(HttpStatusCode.OK, verify.StatusCode);
        using (var doc = JsonDocument.Parse(await verify.Content.ReadAsStringAsync()))
        {
            var keys = doc.RootElement.EnumerateObject().Select(p => p.Name).OrderBy(x => x).ToArray();
            Assert.Equal(new[] { "assessmentCriteria", "code", "courseTitle", "issuedAt", "recipientName", "status" }, keys);
            var criteria = doc.RootElement.GetProperty("assessmentCriteria").GetString()!;
            Assert.Contains("multiple-choice", criteria);
            Assert.Contains("video viewing", criteria); // explicitly not assessed
        }
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync("/api/certificates/verify/ABCDEFGHJKMN")).StatusCode);

        var mine = await Read<List<MyCertificateDto>>(await learner.GetAsync("/api/me/certificates"));
        Assert.Single(mine);

        // Learner cannot revoke; staff can (audited).
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.PostAsync($"/api/admin/certificates/{mine[0].Id}/revoke", JsonBody(new { reason = "x" }))).StatusCode);
        var (_, admin) = await fx.User(Roles.Admin);
        Assert.Equal(HttpStatusCode.NoContent, (await admin.PostAsync($"/api/admin/certificates/{mine[0].Id}/revoke", JsonBody(new { reason = "Academic misconduct" }))).StatusCode);
        var revoked = await Read<CertificateVerification>(await anon.GetAsync($"/api/certificates/verify/{code}"));
        Assert.Equal(CertificateStatus.Revoked, revoked.Status);
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(l => l.Action == "certificate.revoked" && l.EntityId == mine[0].Id.ToString())));

        // Hidden certificates are not publicly verifiable.
        await fx.WithDb(async db => { var c = await db.Certificates.SingleAsync(x => x.Code == code); c.PubliclyVisible = false; await db.SaveChangesAsync(); });
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/certificates/verify/{code}")).StatusCode);
    }

    [Fact]
    public async Task Studio_rejects_questions_from_other_courses_and_blocks_delete_with_attempts()
    {
        var s = await LiveCourse();
        var other = await LiveCourse();
        var r = await s.Author.PostAsync($"/api/studio/courses/{s.Course.Id}/assessments", JsonBody(new
        {
            title = "X", kind = "ModuleTest", mode = "Exam", passPercent = 50, multiSelectScoring = "AllOrNothing", questionCount = 0,
            isPremium = false, countsTowardCertificate = false, questionIds = other.QuestionIds,
        }));
        Assert.Equal(HttpStatusCode.BadRequest, r.StatusCode);

        var a = await CreateAssessment(s);
        var (_, learner) = await fx.User(Roles.Student);
        await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null));
        Assert.Equal(HttpStatusCode.Conflict, (await s.Author.DeleteAsync($"/api/studio/assessments/{a.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.GetAsync($"/api/studio/courses/{s.Course.Id}/assessments")).StatusCode);
    }
}
