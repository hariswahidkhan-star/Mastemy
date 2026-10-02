using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Assessment;
using Mastemy.Api.Modules.Questions;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Assessment.AssessmentFixture;

namespace Mastemy.Tests.Assessment;

/// <summary>Completion awards (separate from assessed certificates), LinkedIn sharing, negative marking and worked solutions.</summary>
public class CompletionAwardAndScoringTests(AssessmentFixture fx) : IClassFixture<AssessmentFixture>
{
    private record Live(Course Course, Guid AuthorId, HttpClient Author);

    private async Task<Live> LiveCourse()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId, CourseStatus.Updating);
        return new Live(course, authorId, author);
    }

    private async Task<(Guid Id, HttpClient Client)> Enrolled(Live l)
    {
        var (uid, c) = await fx.User(Roles.Student);
        await fx.WithDb(async db => { db.Enrollments.Add(new Enrollment { UserId = uid, CourseId = l.Course.Id }); await db.SaveChangesAsync(); });
        return (uid, c);
    }

    private async Task CompleteAllLessons(Live l, Guid uid, int? only = null)
    {
        await fx.WithDb(async db =>
        {
            var ids = await db.Lessons.Where(x => db.Modules.Any(m => m.Id == x.ModuleId && m.CourseId == l.Course.Id)).Select(x => x.Id).ToListAsync();
            foreach (var id in ids.Take(only ?? ids.Count)) db.LessonProgress.Add(new LessonProgress { UserId = uid, LessonId = id, Completed = true });
            await db.SaveChangesAsync();
        });
    }

    private async Task<Question> Q(Live l, string ext)
    {
        var q = new Question { CourseId = l.Course.Id, ExternalId = ext, State = QuestionState.Active, CreatedBy = l.AuthorId };
        var v = new QuestionVersion { QuestionId = q.Id, Version = 1, Type = QuestionType.SingleChoice, Stem = ext + " stem", Explanation = ext + " explanation", Tags = "t", SkillCode = "SK" };
        v.Options = new[] { (ext + "-right", true), (ext + "-wrong", false) }
            .Select((o, i) => new QuestionOption { QuestionVersionId = v.Id, SortOrder = i, Text = o.Item1, IsCorrect = o.Item2, Rationale = "r" }).ToList();
        q.Versions.Add(v);
        await fx.WithDb(async db => { db.Questions.Add(q); await db.SaveChangesAsync(); });
        return q;
    }

    private static async Task<AssessmentDto> Assess(Live l, IEnumerable<Question> qs, AssessmentMode mode, bool cert = false, decimal pass = 50m)
    {
        var body = new
        {
            title = "A " + Guid.NewGuid().ToString("N")[..6], kind = mode == AssessmentMode.Exam ? AssessmentKind.FinalAssessment : AssessmentKind.LessonPractice,
            mode, timeLimitMinutes = (int?)null, maxAttempts = (int?)null, passPercent = pass, multiSelectScoring = MultiSelectScoring.AllOrNothing,
            questionCount = 0, isPremium = false, countsTowardCertificate = cert, questionIds = qs.Select(q => q.Id).ToList(),
            reviewPolicy = AnswerReviewPolicy.AfterSubmit, shuffleQuestions = false,
        };
        return await Read<AssessmentDto>(await l.Author.PostAsync($"/api/studio/courses/{l.Course.Id}/assessments", JsonBody(body)));
    }

    private static async Task<AttemptResult> Take(HttpClient c, Guid assessmentId, Dictionary<string, string?> answers)
    {
        var v = await Read<AttemptView>(await c.PostAsync($"/api/assessments/{assessmentId}/attempts", null));
        foreach (var item in v.Items)
        {
            var ext = item.Stem.Replace(" stem", "");
            if (answers.GetValueOrDefault(ext) is not { } text) continue;
            var id = item.Options.Single(o => o.Text == ext + "-" + text).Id;
            Assert.Equal(HttpStatusCode.OK, (await c.PutAsync($"/api/attempts/{v.Id}/items/{item.ItemId}", JsonBody(new { selectedOptionIds = new[] { id }, flagged = false }))).StatusCode);
        }
        return await Read<AttemptResult>(await c.PostAsync($"/api/attempts/{v.Id}/submit", null));
    }

    private static object Policy(decimal? neg) => new { allowPause = false, maxPauseMinutes = 0, maxExposuresPerQuestion = (int?)null, negativeMarkingPerWrong = neg };

    [Fact]
    public async Task Completion_award_is_separate_idempotent_verifiable_and_shareable()
    {
        var l = await LiveCourse();
        var (_, stranger) = await fx.User(Roles.Instructor);
        var (uid, learner) = await Enrolled(l);
        var url = $"/api/studio/courses/{l.Course.Id}/completion-award";

        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PutAsync(url, JsonBody(new { enabled = true }))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.GetAsync(url)).StatusCode);
        Assert.False((await Read<CompletionAwardSettingDto>(await l.Author.GetAsync(url))).Enabled);

        var claim = $"/api/me/courses/{l.Course.Id}/completion-award";
        var disabled = await learner.PostAsync(claim, null);
        Assert.Equal(HttpStatusCode.Conflict, disabled.StatusCode);
        Assert.Contains("completion_awards_disabled", await disabled.Content.ReadAsStringAsync());

        Assert.True((await Read<CompletionAwardSettingDto>(await l.Author.PutAsync(url, JsonBody(new { enabled = true })))).Enabled);
        Assert.Equal(HttpStatusCode.BadRequest, (await l.Author.PutAsync(url, JsonBody(new { }))).StatusCode);

        // Partially completed: no award (2 of 3 lessons).
        await CompleteAllLessons(l, uid, only: 2);
        var partial = await learner.PostAsync(claim, null);
        Assert.Equal(HttpStatusCode.Conflict, partial.StatusCode);
        Assert.Contains("course_not_completed", await partial.Content.ReadAsStringAsync());
        Assert.Empty(await Read<List<MyCertificateDto>>(await learner.GetAsync("/api/me/certificates")));

        await fx.WithDb(async db => { await db.LessonProgress.Where(p => p.UserId == uid).ExecuteDeleteAsync(); });
        await CompleteAllLessons(l, uid);
        var award = await Read<CompletionAwardDto>(await learner.PostAsync(claim, null));
        Assert.Equal(CredentialKinds.Completion, award.Kind);
        Assert.Equal("Certificate of Completion — attests lesson completion, not assessed knowledge", award.Title);
        Assert.Equal(3, award.LessonCount);
        var again = await Read<CompletionAwardDto>(await learner.PostAsync(claim, null));
        Assert.Equal(award.Id, again.Id); // idempotent
        Assert.Equal(1, await fx.WithDb(db => db.Set<CompletionAward>().CountAsync(a => a.UserId == uid)));
        Assert.Equal(0, await fx.WithDb(db => db.Certificates.CountAsync(c => c.UserId == uid))); // never an assessed certificate

        var mine = Assert.Single(await Read<List<MyCertificateDto>>(await learner.GetAsync("/api/me/certificates")));
        Assert.Equal(CredentialKinds.Completion, mine.Kind);
        Assert.Contains("not assessed knowledge", mine.AssessmentCriteria);

        var verify = await Read<CertificateVerification>(await fx.Factory.CreateClient().GetAsync($"/api/certificates/verify/{award.Code}"));
        Assert.Equal(CredentialKinds.Completion, verify.Kind);
        Assert.Equal(CredentialKinds.CompletionVerificationLabel, verify.VerificationLabel);
        Assert.Contains("does NOT certify assessed knowledge", verify.VerificationLabel);

        var pdf = await fx.Factory.CreateClient().GetAsync($"/api/certificates/{award.Code}/pdf");
        Assert.Equal(HttpStatusCode.OK, pdf.StatusCode);
        Assert.Equal("application/pdf", pdf.Content.Headers.ContentType!.MediaType);
        Assert.StartsWith("%PDF", System.Text.Encoding.ASCII.GetString((await pdf.Content.ReadAsByteArrayAsync())[..4]));

        var share = await Read<CertificateShareDto>(await learner.GetAsync($"/api/me/certificates/{award.Id}/share"));
        Assert.Equal(CredentialKinds.Completion, share.Kind);
        Assert.Contains("Certificate of Completion", share.CertificationName);
        Assert.DoesNotContain("Assessed", share.CertificationName);
        Assert.StartsWith("https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=", share.LinkedInAddToProfileUrl);
        Assert.Contains("&organizationName=Mastemy", share.LinkedInAddToProfileUrl);
        Assert.Contains($"&issueYear={award.IssuedAt.Year}&issueMonth={award.IssuedAt.Month}", share.LinkedInAddToProfileUrl);
        Assert.Contains("&certId=" + award.Code, share.LinkedInAddToProfileUrl);
        Assert.Contains("&certUrl=" + Uri.EscapeDataString(share.VerificationUrl), share.LinkedInAddToProfileUrl);
        Assert.Equal(HttpStatusCode.NotFound, (await stranger.GetAsync($"/api/me/certificates/{award.Id}/share")).StatusCode);

        // Hidden credentials cannot be shared; hidden ones do not verify publicly.
        await Read<MyCertificateDto>(await learner.PutAsync($"/api/me/certificates/{award.Id}/visibility", JsonBody(new { publiclyVisible = false })));
        Assert.Equal(HttpStatusCode.Conflict, (await learner.GetAsync($"/api/me/certificates/{award.Id}/share")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await fx.Factory.CreateClient().GetAsync($"/api/certificates/verify/{award.Code}")).StatusCode);

        // Staff revocation works for completion awards too.
        var (_, admin) = await fx.User(Roles.Admin);
        Assert.Equal(HttpStatusCode.NoContent, (await admin.PostAsync($"/api/admin/certificates/{award.Id}/revoke", JsonBody(new { reason = "Issued in error" }))).StatusCode);
        Assert.Equal(HttpStatusCode.Gone, (await learner.GetAsync($"/api/certificates/{award.Code}/pdf")).StatusCode);

        // Not enrolled: no award even with progress.
        var (_, outsider) = await fx.User(Roles.Student);
        var ne = await outsider.PostAsync(claim, null);
        Assert.Equal(HttpStatusCode.Conflict, ne.StatusCode);
        Assert.Contains("not_enrolled", await ne.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task Listing_credentials_issues_completion_award_automatically_and_assessed_certificate_shares_with_its_own_name()
    {
        var l = await LiveCourse();
        await Read<CompletionAwardSettingDto>(await l.Author.PutAsync($"/api/studio/courses/{l.Course.Id}/completion-award", JsonBody(new { enabled = true })));
        var q = await Q(l, "CA1");
        var exam = await Assess(l, [q], AssessmentMode.Exam, cert: true, pass: 70m);
        var (uid, learner) = await Enrolled(l);
        await CompleteAllLessons(l, uid);

        var result = await Take(learner, exam.Id, new() { ["CA1"] = "right" });
        Assert.True(result.Passed);
        var list = await Read<List<MyCertificateDto>>(await learner.GetAsync("/api/me/certificates"));
        Assert.Equal(2, list.Count);
        var assessed = list.Single(c => c.Kind == CredentialKinds.AssessedKnowledge);
        var completion = list.Single(c => c.Kind == CredentialKinds.Completion);
        Assert.NotEqual(assessed.Code, completion.Code);
        Assert.Equal(CredentialKinds.AssessedTitle, assessed.Title);

        var share = await Read<CertificateShareDto>(await learner.GetAsync($"/api/me/certificates/{assessed.Id}/share"));
        Assert.Equal(CredentialKinds.AssessedKnowledge, share.Kind);
        Assert.Contains("Certificate of Assessed Knowledge", share.CertificationName);
        Assert.Contains("&certId=" + assessed.Code, share.LinkedInAddToProfileUrl);
        var verify = await Read<CertificateVerification>(await fx.Factory.CreateClient().GetAsync($"/api/certificates/verify/{assessed.Code}"));
        Assert.Equal(CredentialKinds.AssessedKnowledge, verify.Kind);
        Assert.Equal(CredentialKinds.AssessedVerificationLabel, verify.VerificationLabel);
    }

    [Fact]
    public async Task Negative_marking_is_exam_only_disclosed_published_and_floored_at_zero()
    {
        var l = await LiveCourse();
        var qs = new List<Question>();
        for (var i = 1; i <= 4; i++) qs.Add(await Q(l, "NM" + i));
        var exam = await Assess(l, qs, AssessmentMode.Exam);
        var practice = await Assess(l, qs, AssessmentMode.Practice);

        Assert.Equal(HttpStatusCode.BadRequest, (await l.Author.PutAsync($"/api/studio/assessments/{practice.Id}/policy", JsonBody(Policy(0.25m)))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await l.Author.PutAsync($"/api/studio/assessments/{exam.Id}/policy", JsonBody(Policy(1.5m)))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await l.Author.PutAsync($"/api/studio/assessments/{exam.Id}/policy", JsonBody(Policy(-0.1m)))).StatusCode);
        var set = await Read<AssessmentPolicyDto>(await l.Author.PutAsync($"/api/studio/assessments/{exam.Id}/policy", JsonBody(Policy(0.25m))));
        Assert.Equal(0.25m, set.NegativeMarkingPerWrong);
        // Omitting the field keeps the configured rate.
        var kept = await Read<AssessmentPolicyDto>(await l.Author.PutAsync($"/api/studio/assessments/{exam.Id}/policy", JsonBody(new { allowPause = false, maxPauseMinutes = 0 })));
        Assert.Equal(0.25m, kept.NegativeMarkingPerWrong);

        var (_, learner) = await Enrolled(l);
        var summary = await Read<AssessmentSummaryDto>(await learner.GetAsync($"/api/assessments/{exam.Id}"));
        Assert.Equal(0.25m, summary.NegativeMarkingPerWrong);
        Assert.Contains("0.25 point(s) are deducted", summary.NegativeMarkingRules);
        var practiceSummary = await Read<AssessmentSummaryDto>(await learner.GetAsync($"/api/assessments/{practice.Id}"));
        Assert.Equal(0m, practiceSummary.NegativeMarkingPerWrong);
        Assert.Null(practiceSummary.NegativeMarkingRules);

        // 2 right, 2 wrong: 2 - 2 x 0.25 = 1.5 of 4 = 37.5%.
        var r1 = await Take(learner, exam.Id, new() { ["NM1"] = "right", ["NM2"] = "right", ["NM3"] = "wrong", ["NM4"] = "wrong" });
        Assert.Equal(1.5m, r1.PointsEarned);
        Assert.Equal(37.5m, r1.ScorePercent);
        Assert.False(r1.Passed); // pass decision uses the penalised total (50% needed)
        // Unanswered items are not penalised: 1 right, 3 blank = 25%.
        var r2 = await Take(learner, exam.Id, new() { ["NM1"] = "right" });
        Assert.Equal(1m, r2.PointsEarned);
        // All wrong floors at 0.
        var r3 = await Take(learner, exam.Id, new() { ["NM1"] = "wrong", ["NM2"] = "wrong", ["NM3"] = "wrong", ["NM4"] = "wrong" });
        Assert.Equal(0m, r3.PointsEarned);
        Assert.Equal(0m, r3.ScorePercent);
        // Practice is never penalised.
        var p = await Take(learner, practice.Id, new() { ["NM1"] = "right", ["NM2"] = "wrong" });
        Assert.Equal(1m, p.PointsEarned);

        Assert.Equal(1.5m, Scoring.ApplyNegativeMarking(2m, 2, 0.25m));
        Assert.Equal(0m, Scoring.ApplyNegativeMarking(0.5m, 3, 1m));
        Assert.Equal(2m, Scoring.ApplyNegativeMarking(2m, 5, 0m));
    }

    [Fact]
    public async Task Worked_solution_is_shown_in_practice_check_and_exam_review()
    {
        var l = await LiveCourse();
        var q = await Q(l, "WS1");
        var vid = await fx.WithDb(db => db.QuestionVersions.Where(v => v.QuestionId == q.Id).Select(v => v.Id).FirstAsync());
        await fx.WithDb(async db => { db.Set<QuestionWorkedSolution>().Add(new QuestionWorkedSolution { QuestionVersionId = vid, Text = "Step-by-step." }); await db.SaveChangesAsync(); });
        var exam = await Assess(l, [q], AssessmentMode.Exam);
        var practice = await Assess(l, [q], AssessmentMode.Practice);
        var (_, learner) = await Enrolled(l);

        var view = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{exam.Id}/attempts", null));
        var item = Assert.Single(view.Items);
        Assert.DoesNotContain("Step-by-step", System.Text.Json.JsonSerializer.Serialize(view)); // never during the attempt
        await learner.PutAsync($"/api/attempts/{view.Id}/items/{item.ItemId}", JsonBody(new { selectedOptionIds = new[] { item.Options[0].Id }, flagged = false }));
        var result = await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{view.Id}/submit", null));
        Assert.Equal("Step-by-step.", Assert.Single(result.Review!).WorkedSolution);

        var pv = await Read<AttemptView>(await learner.PostAsync($"/api/assessments/{practice.Id}/attempts", null));
        var pitem = Assert.Single(pv.Items);
        await learner.PutAsync($"/api/attempts/{pv.Id}/items/{pitem.ItemId}", JsonBody(new { selectedOptionIds = new[] { pitem.Options[0].Id }, flagged = false }));
        var check = await Read<CheckResult>(await learner.PostAsync($"/api/attempts/{pv.Id}/items/{pitem.ItemId}/check", null));
        Assert.Equal("Step-by-step.", check.WorkedSolution);
    }
}
