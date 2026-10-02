using System.Net;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Assessment;
using Mastemy.Api.Modules.Questions;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Assessment.AssessmentFixture;

namespace Mastemy.Tests.Assessment;

public class Wave3AssessmentTests(AssessmentFixture fx) : IClassFixture<AssessmentFixture>
{
    private record Live(Course Course, Guid AuthorId, HttpClient Author);

    private async Task<Live> LiveCourse()
    {
        var (authorId, author) = await fx.User(Roles.Instructor);
        var course = await fx.Course(authorId, CourseStatus.Updating);
        return new Live(course, authorId, author);
    }

    /// <summary>Active question; options given as (text, keyed correct).</summary>
    private async Task<Question> Q(Live l, string ext, string skill = "SK", Guid? lessonId = null, Guid? caseGroup = null, int caseOrder = 0,
        QuestionType type = QuestionType.SingleChoice, params (string text, bool ok)[] opts)
    {
        if (opts.Length == 0) opts = [(ext + "-right", true), (ext + "-wrong", false), (ext + "-other", false)];
        var q = new Question { CourseId = l.Course.Id, ExternalId = ext, State = QuestionState.Active, CreatedBy = l.AuthorId, LessonId = lessonId };
        var v = new QuestionVersion { QuestionId = q.Id, Version = 1, Type = type, Stem = ext + " stem", Explanation = ext + " explanation", Tags = "t-" + skill, SkillCode = skill };
        v.Options = opts.Select((o, i) => new QuestionOption { QuestionVersionId = v.Id, SortOrder = i, Text = o.text, IsCorrect = o.ok, Rationale = "because " + o.text }).ToList();
        q.Versions.Add(v);
        await fx.WithDb(async db =>
        {
            db.Questions.Add(q);
            if (caseGroup is not null) db.Set<QuestionMeta>().Add(new QuestionMeta { QuestionId = q.Id, CaseGroupId = caseGroup, CaseGroupOrder = caseOrder });
            await db.SaveChangesAsync();
        });
        return q;
    }

    private static async Task<AssessmentDto> Assess(Live l, IEnumerable<Question> qs, AssessmentMode mode = AssessmentMode.Exam, int? timeLimit = null,
        int? maxAttempts = null, decimal pass = 70m, bool cert = false, int count = 0, AssessmentKind kind = AssessmentKind.FinalAssessment, bool premium = false,
        bool shuffle = true)
    {
        var body = new
        {
            title = "A " + Guid.NewGuid().ToString("N")[..6], kind, mode, timeLimitMinutes = timeLimit, maxAttempts, passPercent = pass,
            multiSelectScoring = MultiSelectScoring.AllOrNothing, questionCount = count, isPremium = premium, countsTowardCertificate = cert,
            questionIds = qs.Select(q => q.Id).ToList(), reviewPolicy = AnswerReviewPolicy.AfterSubmit, shuffleQuestions = shuffle,
        };
        return await Read<AssessmentDto>(await l.Author.PostAsync($"/api/studio/courses/{l.Course.Id}/assessments", JsonBody(body)));
    }

    private static async Task Answer(HttpClient c, AttemptView v, string ext, string optionText)
    {
        var item = v.Items.Single(i => i.Stem == ext + " stem");
        var id = item.Options.Single(o => o.Text == optionText).Id;
        var r = await c.PutAsync($"/api/attempts/{v.Id}/items/{item.ItemId}", JsonBody(new { selectedOptionIds = new[] { id }, flagged = false }));
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
    }

    private static Task<AttemptView> Start(HttpClient c, Guid assessmentId) => c.PostAsync($"/api/assessments/{assessmentId}/attempts", null).ContinueWith(t => Read<AttemptView>(t.Result)).Unwrap();

    // ---------------- Case groups in forms ----------------

    [Fact]
    public async Task Case_group_members_are_delivered_together_in_order_with_frozen_exhibit()
    {
        var l = await LiveCourse();
        var group = new CaseGroup { CourseId = l.Course.Id, Title = "Case A", ExhibitMarkdown = "Exhibit v1", CreatedBy = l.AuthorId };
        await fx.WithDb(async db => { db.Set<CaseGroup>().Add(group); await db.SaveChangesAsync(); });
        var singles = new List<Question>();
        for (var i = 0; i < 4; i++) singles.Add(await Q(l, "S" + i));
        var c2 = await Q(l, "C2", caseGroup: group.Id, caseOrder: 2);
        var c0 = await Q(l, "C0", caseGroup: group.Id, caseOrder: 0);
        var c1 = await Q(l, "C1", caseGroup: group.Id, caseOrder: 1);
        var a = await Assess(l, singles.Take(2).Append(c2).Concat(singles.Skip(2)).Append(c0).Append(c1));

        for (var run = 0; run < 6; run++)
        {
            var (_, learner) = await fx.User(Roles.Student);
            var v = await Start(learner, a.Id);
            var stems = v.Items.Select(i => i.Stem).ToList();
            var start = stems.IndexOf("C0 stem");
            Assert.Equal(["C0 stem", "C1 stem", "C2 stem"], stems.Skip(start).Take(3).ToList());
            var caseDto = Assert.Single(v.Cases!);
            Assert.Equal(run == 0 ? "Exhibit v1" : "Exhibit v2", caseDto.ExhibitMarkdown); // new attempts get the current exhibit
            Assert.Equal(3, caseDto.ItemIds.Count);
            Assert.All(v.Items.Skip(start).Take(3), i => Assert.Equal(group.Id, i.CaseGroupId));
            if (run == 0)
            {
                // The exhibit is frozen for the attempt even if the author edits it later.
                await fx.WithDb(db => db.Set<CaseGroup>().Where(g => g.Id == group.Id).ExecuteUpdateAsync(s => s.SetProperty(g => g.ExhibitMarkdown, "Exhibit v2")));
                var again = await Read<AttemptDetail>(await learner.GetAsync($"/api/attempts/{v.Id}"));
                Assert.Equal("Exhibit v1", again.Attempt.Cases![0].ExhibitMarkdown);
            }
        }
    }

    // ---------------- Exposure rule ----------------

    [Fact]
    public async Task Exposure_rule_limits_how_often_a_learner_sees_each_question()
    {
        var l = await LiveCourse();
        var qs = new[] { await Q(l, "E1"), await Q(l, "E2"), await Q(l, "E3") };
        var a = await Assess(l, qs, count: 1);
        var (_, stranger) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PutAsync($"/api/studio/assessments/{a.Id}/policy",
            JsonBody(new { allowPause = false, maxPauseMinutes = 0, maxExposuresPerQuestion = 1 }))).StatusCode);
        await Read<AssessmentPolicyDto>(await l.Author.PutAsync($"/api/studio/assessments/{a.Id}/policy",
            JsonBody(new { allowPause = false, maxPauseMinutes = 0, maxExposuresPerQuestion = 1 })));

        var (_, learner) = await fx.User(Roles.Student);
        var seen = new HashSet<string>();
        for (var i = 0; i < 3; i++)
        {
            var v = await Start(learner, a.Id);
            Assert.True(seen.Add(Assert.Single(v.Items).Stem), "a question was shown twice despite the exposure limit");
            await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{v.Id}/submit", null));
        }
        var fourth = await learner.PostAsync($"/api/assessments/{a.Id}/attempts", null);
        Assert.Equal(HttpStatusCode.Conflict, fourth.StatusCode);
        Assert.Contains("exposure_limit_reached", await fourth.Content.ReadAsStringAsync());
    }

    // ---------------- Accommodations ----------------

    [Fact]
    public async Task Accommodations_extend_or_remove_time_limits_and_are_audited()
    {
        var l = await LiveCourse();
        var a = await Assess(l, [await Q(l, "T1")], timeLimit: 10);
        var (_, staff) = await fx.User(Roles.Admin);
        var (learnerId, learner) = await fx.User(Roles.Student);
        var (otherId, other) = await fx.User(Roles.Student);

        Assert.Equal(HttpStatusCode.Forbidden, (await l.Author.PostAsync("/api/admin/accommodations",
            JsonBody(new { userId = learnerId, assessmentId = a.Id, extraTimePercent = 50, untimed = false, reason = "x" }))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsync("/api/admin/accommodations",
            JsonBody(new { userId = learnerId, assessmentId = a.Id, extraTimePercent = 0, untimed = false, reason = "x" }))).StatusCode);

        // Global untimed for the learner, overridden by an assessment-specific +50%.
        await Read<AccommodationDto>(await staff.PostAsync("/api/admin/accommodations",
            JsonBody(new { userId = learnerId, assessmentId = (Guid?)null, extraTimePercent = 0, untimed = true, reason = "Documented need" })));
        var specific = await Read<AccommodationDto>(await staff.PostAsync("/api/admin/accommodations",
            JsonBody(new { userId = learnerId, assessmentId = a.Id, extraTimePercent = 50, untimed = false, reason = "Documented need" })));
        var summary = await Read<AssessmentSummaryDto>(await learner.GetAsync($"/api/assessments/{a.Id}"));
        Assert.Equal(15, summary.EffectiveTimeLimitMinutes);
        Assert.True(summary.AccommodationApplied);

        var v = await Start(learner, a.Id);
        Assert.Equal(15 * 60, (v.DeadlineAt!.Value - v.StartedAt).TotalSeconds, 1.0);
        Assert.Equal(50, v.ExtraTimePercent);
        var audit = await fx.WithDb(db => db.AuditLogs.AnyAsync(x => x.Action == "attempt.accommodation_applied" && x.EntityId == v.Id.ToString()));
        Assert.True(audit);
        Assert.Contains(await Read<List<MyAccommodationDto>>(await learner.GetAsync("/api/me/accommodations")), x => x.Id == specific.Id);

        // Without accommodations the standard limit applies.
        var ov = await Start(other, a.Id);
        Assert.Equal(10 * 60, (ov.DeadlineAt!.Value - ov.StartedAt).TotalSeconds, 1.0);

        // Revoking the specific grant leaves the global untimed one.
        Assert.Equal(HttpStatusCode.NoContent, (await staff.DeleteAsync($"/api/admin/accommodations/{specific.Id}")).StatusCode);
        await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{v.Id}/submit", null));
        var untimed = await Start(learner, a.Id);
        Assert.Null(untimed.DeadlineAt);
        Assert.True(untimed.Untimed);
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(x => x.Action == "accommodation.revoked" && x.EntityId == specific.Id.ToString())));
        _ = otherId;
    }

    // ---------------- Pause policy ----------------

    [Fact]
    public async Task Pausing_requires_an_explicit_policy_and_credits_at_most_the_budget()
    {
        var l = await LiveCourse();
        var a = await Assess(l, [await Q(l, "P1")], timeLimit: 30);
        var (_, learner) = await fx.User(Roles.Student);
        var v = await Start(learner, a.Id);
        var noPause = await learner.PostAsync($"/api/attempts/{v.Id}/pause", null);
        Assert.Equal(HttpStatusCode.Conflict, noPause.StatusCode);
        Assert.Contains("pause_not_allowed", await noPause.Content.ReadAsStringAsync());
        await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{v.Id}/submit", null));

        var untimedA = await Assess(l, [await Q(l, "P2")]);
        Assert.Equal(HttpStatusCode.BadRequest, (await l.Author.PutAsync($"/api/studio/assessments/{untimedA.Id}/policy",
            JsonBody(new { allowPause = true, maxPauseMinutes = 5, maxExposuresPerQuestion = (int?)null }))).StatusCode);
        await Read<AssessmentPolicyDto>(await l.Author.PutAsync($"/api/studio/assessments/{a.Id}/policy",
            JsonBody(new { allowPause = true, maxPauseMinutes = 5, maxExposuresPerQuestion = (int?)null })));

        var (_, learner2) = await fx.User(Roles.Student);
        var w = await Start(learner2, a.Id);
        var deadline0 = w.DeadlineAt!.Value;
        var paused = await Read<AttemptView>(await learner2.PostAsync($"/api/attempts/{w.Id}/pause", null));
        Assert.True(paused.Pause!.Paused);
        // Answers cannot be changed while paused.
        var item = paused.Items[0];
        var save = await learner2.PutAsync($"/api/attempts/{w.Id}/items/{item.ItemId}", JsonBody(new { selectedOptionIds = new[] { item.Options[0].Id }, flagged = false }));
        Assert.Equal(HttpStatusCode.Conflict, save.StatusCode);
        Assert.Contains("attempt_paused", await save.Content.ReadAsStringAsync());

        // Simulate 2 minutes paused: the deadline moves by 2 minutes.
        await fx.WithDb(db => db.Set<AttemptExtension>().Where(x => x.AttemptId == w.Id)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.PausedAt, x => x.PausedAt!.Value.AddSeconds(-120))));
        var resumed = await Read<AttemptView>(await learner2.PostAsync($"/api/attempts/{w.Id}/resume", null));
        Assert.False(resumed.Pause!.Paused);
        Assert.Equal(120, (resumed.DeadlineAt!.Value - deadline0).TotalSeconds, 2.0);

        // A 10-minute pause only earns the remaining 3 minutes of the 5-minute budget, settled automatically.
        await Read<AttemptView>(await learner2.PostAsync($"/api/attempts/{w.Id}/pause", null));
        await fx.WithDb(db => db.Set<AttemptExtension>().Where(x => x.AttemptId == w.Id)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.PausedAt, x => x.PausedAt!.Value.AddSeconds(-600))));
        var settled = await Read<AttemptDetail>(await learner2.GetAsync($"/api/attempts/{w.Id}"));
        Assert.False(settled.Attempt.Pause!.Paused);
        Assert.Equal(300, (settled.Attempt.DeadlineAt!.Value - deadline0).TotalSeconds, 2.0);
        var exhausted = await learner2.PostAsync($"/api/attempts/{w.Id}/pause", null);
        Assert.Contains("pause_allowance_exhausted", await exhausted.Content.ReadAsStringAsync());
        var pauses = await fx.WithDb(db => db.Set<AttemptPause>().Where(p => p.AttemptId == w.Id).OrderBy(p => p.PausedAt).ToListAsync());
        Assert.Equal([120, 180], pauses.Select(p => p.CreditedSeconds).ToList());
    }

    // ---------------- Regrading ----------------

    [Fact]
    public async Task Regrade_rescores_attempts_keeps_answers_issues_and_flags_certificates()
    {
        var l = await LiveCourse();
        // K1 is keyed wrongly: "K1-true" is actually right but the key says "K1-keyed".
        var k1 = await Q(l, "K1", opts: [("K1-keyed", true), ("K1-true", false), ("K1-other", false)]);
        var k2 = await Q(l, "K2");
        var a = await Assess(l, [k1, k2], pass: 75m, cert: true);
        var (aId, learnerA) = await fx.User(Roles.Student);
        var (bId, learnerB) = await fx.User(Roles.Student);

        var va = await Start(learnerA, a.Id);
        await Answer(learnerA, va, "K1", "K1-true");
        await Answer(learnerA, va, "K2", "K2-right");
        var ra = await Read<AttemptResult>(await learnerA.PostAsync($"/api/attempts/{va.Id}/submit", null));
        Assert.False(ra.Passed);
        var vb = await Start(learnerB, a.Id);
        await Answer(learnerB, vb, "K1", "K1-keyed");
        await Answer(learnerB, vb, "K2", "K2-right");
        var rb = await Read<AttemptResult>(await learnerB.PostAsync($"/api/attempts/{vb.Id}/submit", null));
        Assert.True(rb.Passed);
        Assert.NotNull(rb.CertificateCode);

        var version = await fx.WithDb(db => db.QuestionVersions.Include(v => v.Options).FirstAsync(v => v.QuestionId == k1.Id));
        var trueId = version.Options.Single(o => o.Text == "K1-true").Id;
        var (_, reviewer) = await fx.User(Roles.Reviewer);
        var (_, staff) = await fx.User(Roles.Admin);
        var (_, staff2) = await fx.User(Roles.Admin);
        var proposalBody = JsonBody(new { correctOptionIds = new[] { trueId }, reason = "Option K1-true is the defensible answer; key was wrong." });
        Assert.Equal(HttpStatusCode.Forbidden, (await learnerA.PostAsync($"/api/review/questions/{k1.Id}/regrades", proposalBody)).StatusCode);
        var proposal = await Read<RegradeDto>(await reviewer.PostAsync($"/api/review/questions/{k1.Id}/regrades",
            JsonBody(new { correctOptionIds = new[] { trueId }, reason = "Option K1-true is the defensible answer; key was wrong." })));
        Assert.Equal(HttpStatusCode.Conflict, (await reviewer.PostAsync($"/api/review/questions/{k1.Id}/regrades",
            JsonBody(new { correctOptionIds = new[] { trueId }, reason = "dup" }))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await reviewer.PostAsync($"/api/admin/regrades/{proposal.Id}/approve", JsonBody(new { note = "ok" }))).StatusCode);

        var detail = await Read<RegradeDetailDto>(await staff.PostAsync($"/api/admin/regrades/{proposal.Id}/approve", JsonBody(new { note = "Confirmed by SME." })));
        Assert.Equal(RegradeStatus.Applied, detail.Regrade.Status);
        Assert.Equal(2, detail.Regrade.AffectedAttempts);
        Assert.Equal(2, detail.Regrade.ChangedAttempts);
        var resA = detail.Results.Single(r => r.UserId == aId);
        Assert.Equal((50m, 100m, false, true), (resA.OldScorePercent, resA.NewScorePercent, resA.OldPassed, resA.NewPassed));
        var resB = detail.Results.Single(r => r.UserId == bId);
        Assert.Equal((100m, 50m, true, false), (resB.OldScorePercent, resB.NewScorePercent, resB.OldPassed, resB.NewPassed));
        Assert.Single(detail.IssuedCertificateCodes);

        // Answers are untouched; learner A now passes and holds a certificate; B's certificate is flagged, not revoked.
        var itemsB = await fx.WithDb(db => db.AttemptItems.Where(i => i.AttemptId == vb.Id).ToListAsync());
        Assert.Contains(itemsB, i => i.SelectedOptionIds == version.Options.Single(o => o.Text == "K1-keyed").Id.ToString());
        var certA = await fx.WithDb(db => db.Certificates.SingleAsync(c => c.UserId == aId));
        Assert.Equal(CertificateStatus.Valid, certA.Status);
        var certB = await fx.WithDb(db => db.Certificates.SingleAsync(c => c.UserId == bId));
        Assert.Equal(CertificateStatus.Valid, certB.Status);
        var flags = await Read<List<CertificateFlagDto>>(await staff.GetAsync("/api/admin/certificate-flags?status=Open"));
        var flag = Assert.Single(flags, f => f.CertificateId == certB.Id);
        var resultA = await Read<AttemptDetail>(await learnerA.GetAsync($"/api/attempts/{va.Id}"));
        Assert.True(resultA.Result!.Regraded);
        Assert.True(resultA.Result.Passed);
        Assert.True(await fx.WithDb(db => db.Notifications.AnyAsync(n => n.UserId == bId && n.Kind == "regrade" && n.Title.Contains("re-scored"))));
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(x => x.Action == "regrade.applied" && x.EntityId == proposal.Id.ToString())));

        // Staff decide on the flag: revoke. The learner appeals; another staff member reinstates.
        await Read<CertificateFlagDto>(await staff.PostAsync($"/api/admin/certificate-flags/{flag.Id}/decide", JsonBody(new { revoke = true, note = "Evidence no longer passes." })));
        Assert.Equal(CertificateStatus.Revoked, (await fx.WithDb(db => db.Certificates.SingleAsync(c => c.Id == certB.Id))).Status);
        Assert.Equal(HttpStatusCode.NotFound, (await learnerA.PostAsync($"/api/me/certificates/{certB.Id}/appeals", JsonBody(new { reason = "Not mine but trying anyway." }))).StatusCode);
        var appeal = await Read<AppealDto>(await learnerB.PostAsync($"/api/me/certificates/{certB.Id}/appeals", JsonBody(new { reason = "I retook the material and request review." })));
        Assert.Equal(HttpStatusCode.Conflict, (await learnerB.PostAsync($"/api/me/certificates/{certB.Id}/appeals", JsonBody(new { reason = "Second appeal while pending." }))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await learnerB.PostAsync($"/api/admin/certificate-appeals/{appeal.Id}/decide", JsonBody(new { approve = true, note = "self" }))).StatusCode);
        var decided = await Read<AppealDto>(await staff2.PostAsync($"/api/admin/certificate-appeals/{appeal.Id}/decide", JsonBody(new { approve = true, note = "Reinstated on review." })));
        Assert.Equal(CertificateRequestStatus.Approved, decided.Status);
        Assert.Equal(CertificateStatus.Valid, (await fx.WithDb(db => db.Certificates.SingleAsync(c => c.Id == certB.Id))).Status);
    }

    [Fact]
    public async Task Regrade_must_be_approved_by_someone_other_than_the_proposer()
    {
        var l = await LiveCourse();
        var q = await Q(l, "R1");
        var (_, staff) = await fx.User(Roles.Admin);
        var v = await fx.WithDb(db => db.QuestionVersions.Include(x => x.Options).FirstAsync(x => x.QuestionId == q.Id));
        var wrong = v.Options.Single(o => o.Text == "R1-wrong").Id;
        var p = await Read<RegradeDto>(await staff.PostAsync($"/api/review/questions/{q.Id}/regrades", JsonBody(new { correctOptionIds = new[] { wrong }, reason = "r" })));
        Assert.Equal(HttpStatusCode.Forbidden, (await staff.PostAsync($"/api/admin/regrades/{p.Id}/approve", JsonBody(new { note = "self" }))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsync($"/api/review/questions/{q.Id}/regrades",
            JsonBody(new { correctOptionIds = new[] { wrong, v.Options.Single(o => o.Text == "R1-other").Id }, reason = "two keys on single choice" }))).StatusCode);
        var (_, staff2) = await fx.User(Roles.Admin);
        var rejected = await Read<RegradeDto>(await staff2.PostAsync($"/api/admin/regrades/{p.Id}/reject", JsonBody(new { note = "Key is fine." })));
        Assert.Equal(RegradeStatus.Rejected, rejected.Status);
        Assert.True((await fx.WithDb(db => db.QuestionOptions.SingleAsync(o => o.Text == "R1-right" && o.QuestionVersionId == v.Id))).IsCorrect);
    }

    // ---------------- Item analytics ----------------

    private async Task SeedAttempts(Guid assessmentId, Guid userId, QuestionVersion v, QuestionVersion filler, int n)
    {
        await fx.WithDb(async db =>
        {
            var right = v.Options.Single(o => o.IsCorrect).Id;
            var wrong = v.Options.Single(o => o.Text.EndsWith("-wrong")).Id;
            for (var k = 0; k < n; k++)
            {
                var correct = k % 2 == 0;
                var fillerOk = correct || k % 3 == 0;
                var at = new Attempt
                {
                    AssessmentId = assessmentId, UserId = userId, Status = AttemptStatus.Submitted, SubmittedAt = DateTime.UtcNow,
                    PointsPossible = 2, PointsEarned = (correct ? 1 : 0) + (fillerOk ? 1 : 0), ScorePercent = 0, PassPercent = 70,
                };
                at.Items.Add(new AttemptItem { AttemptId = at.Id, QuestionVersionId = v.Id, SortOrder = 0, OptionOrder = right + "," + wrong,
                    SelectedOptionIds = (correct ? right : wrong).ToString(), Points = correct ? 1 : 0 });
                at.Items.Add(new AttemptItem { AttemptId = at.Id, QuestionVersionId = filler.Id, SortOrder = 1, OptionOrder = "", SelectedOptionIds = "", Points = fillerOk ? 1 : 0 });
                db.Attempts.Add(at);
            }
            await db.SaveChangesAsync();
        });
    }

    [Fact]
    public async Task Item_analytics_are_withheld_until_thirty_responses()
    {
        var l = await LiveCourse();
        var q = await Q(l, "AN1");
        var f = await Q(l, "AN2");
        var a = await Assess(l, [q, f]);
        var (uid, _) = await fx.User(Roles.Student);
        var v = await fx.WithDb(db => db.QuestionVersions.Include(x => x.Options).FirstAsync(x => x.QuestionId == q.Id));
        var fv = await fx.WithDb(db => db.QuestionVersions.Include(x => x.Options).FirstAsync(x => x.QuestionId == f.Id));
        await SeedAttempts(a.Id, uid, v, fv, 29);

        var few = await Read<ItemAnalyticsDto>(await l.Author.GetAsync($"/api/studio/questions/{q.Id}/analytics"));
        Assert.Equal(29, few.N);
        Assert.False(few.SufficientData);
        Assert.Null(few.Difficulty);
        Assert.Null(few.Discrimination);
        Assert.All(few.Distractors, d => Assert.Null(d.SelectedProportion));
        Assert.Equal(29, few.Exposures);

        await SeedAttempts(a.Id, uid, v, fv, 1);
        var enough = await Read<ItemAnalyticsDto>(await l.Author.GetAsync($"/api/studio/questions/{q.Id}/analytics"));
        Assert.Equal(30, enough.N);
        Assert.True(enough.SufficientData);
        Assert.Equal(0.5333, enough.Difficulty); // 16 of 30 fully correct
        Assert.True(enough.DifficultyLow < 0.5333 && enough.DifficultyHigh > 0.5333);
        Assert.NotNull(enough.Discrimination);
        Assert.True(enough.DiscriminationLow <= enough.Discrimination && enough.Discrimination <= enough.DiscriminationHigh);
        Assert.Equal(16, enough.Distractors.Single(d => d.IsCorrect).SelectedCount);
        Assert.Equal(14, enough.Distractors.Single(d => d.Text == "AN1-wrong").SelectedCount);
        Assert.Equal(0.5333, enough.Distractors.Single(d => d.IsCorrect).SelectedProportion);
        Assert.Equal(0, enough.Distractors.Single(d => d.Text == "AN1-other").SelectedCount);
        Assert.Equal(1, enough.DistinctLearners);

        var list = await Read<List<ItemAnalyticsDto>>(await l.Author.GetAsync($"/api/studio/assessments/{a.Id}/item-analytics"));
        Assert.Equal(2, list.Count);
        var (_, stranger) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.GetAsync($"/api/studio/questions/{q.Id}/analytics")).StatusCode);
        var (_, student) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.GetAsync($"/api/studio/assessments/{a.Id}/item-analytics")).StatusCode);
    }

    // ---------------- Practice, bookmarks, spaced review ----------------

    [Fact]
    public async Task Custom_practice_respects_access_filters_and_never_leaks_keys()
    {
        var l = await LiveCourse();
        var free1 = await Q(l, "PF1", skill: "SKA");
        var free2 = await Q(l, "PF2", skill: "SKB");
        var certQ = await Q(l, "PC1", skill: "SKA");
        var premQ = await Q(l, "PP1", skill: "SKA");
        await Assess(l, [free1, free2], mode: AssessmentMode.Practice, kind: AssessmentKind.LessonPractice);
        await Assess(l, [certQ], cert: true);
        await Assess(l, [premQ], mode: AssessmentMode.Practice, kind: AssessmentKind.MockExam, premium: true);
        var (uid, learner) = await fx.User(Roles.Student);
        await fx.WithDb(async db => { db.Enrollments.Add(new Enrollment { UserId = uid, CourseId = l.Course.Id }); await db.SaveChangesAsync(); });

        var raw = await (await learner.PostAsync("/api/practice/sessions", JsonBody(new { count = 10 }))).Content.ReadAsStringAsync();
        Assert.DoesNotContain("iscorrect", raw.ToLowerInvariant());
        Assert.DoesNotContain("rationale", raw.ToLowerInvariant());
        var s = JsonSerializer.Deserialize<PracticeSessionView>(raw, Json)!;
        Assert.Equal(["PF1 stem", "PF2 stem"], s.Items.Select(i => i.Stem).OrderBy(x => x).ToList()); // no certificate-exam or premium items

        await fx.WithDb(async db => { db.Entitlements.Add(new Entitlement { UserId = uid, CourseId = l.Course.Id, Source = EntitlementSource.Grant }); await db.SaveChangesAsync(); });
        var withPremium = await Read<PracticeSessionView>(await learner.PostAsync("/api/practice/sessions", JsonBody(new { count = 10, skills = new[] { "SKA" } })));
        Assert.Equal(["PF1 stem", "PP1 stem"], withPremium.Items.Select(i => i.Stem).OrderBy(x => x).ToList());

        // Answer PF1 wrongly and check: rationale revealed, item locked, SM-2 card created.
        var item = s.Items.Single(i => i.Stem == "PF1 stem");
        var wrong = item.Options.Single(o => o.Text == "PF1-wrong").Id;
        await Read<PracticeItemView>(await learner.PutAsync($"/api/practice/sessions/{s.Id}/items/{item.ItemId}", JsonBody(new { selectedOptionIds = new[] { wrong } })));
        var check = await Read<CheckResult>(await learner.PostAsync($"/api/practice/sessions/{s.Id}/items/{item.ItemId}/check", null));
        Assert.False(check.Correct);
        Assert.NotEmpty(check.Rationales);
        Assert.Equal(HttpStatusCode.Conflict, (await learner.PutAsync($"/api/practice/sessions/{s.Id}/items/{item.ItemId}", JsonBody(new { selectedOptionIds = new[] { wrong } }))).StatusCode);
        var card = await fx.WithDb(db => db.Set<ReviewCard>().SingleAsync(c => c.UserId == uid && c.QuestionId == free1.Id));
        Assert.Equal(1, card.IntervalDays);
        var result = await Read<PracticeResult>(await learner.PostAsync($"/api/practice/sessions/{s.Id}/finish", null));
        Assert.True(result.ReadinessIsEstimate);

        // Wrong-answer revision: only the missed question.
        var mistakes = await Read<PracticeSessionView>(await learner.PostAsync("/api/practice/sessions", JsonBody(new { previousMistakes = true })));
        Assert.Equal(["PF1 stem"], mistakes.Items.Select(i => i.Stem).ToList());
        // Unseen: PF2 and PP1 were seen in sessions above; nothing unseen remains among accessible items except none.
        var unseen = await learner.PostAsync("/api/practice/sessions", JsonBody(new { unseenOnly = true }));
        Assert.Equal(HttpStatusCode.Conflict, unseen.StatusCode);

        // Bookmarks only for questions the learner was shown.
        Assert.Equal(HttpStatusCode.NotFound, (await learner.PutAsync($"/api/me/question-bookmarks/{certQ.Id}", null)).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await learner.PutAsync($"/api/me/question-bookmarks/{free2.Id}", null)).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await learner.PutAsync($"/api/me/question-bookmarks/{free2.Id}", null)).StatusCode); // idempotent
        Assert.Single(await Read<List<BookmarkDto>>(await learner.GetAsync("/api/me/question-bookmarks")));
        var bookmarked = await Read<PracticeSessionView>(await learner.PostAsync("/api/practice/sessions", JsonBody(new { bookmarkedOnly = true })));
        Assert.Equal(["PF2 stem"], bookmarked.Items.Select(i => i.Stem).ToList());

        // Spaced review: make the card due.
        Assert.Empty(await Read<List<DueReviewDto>>(await learner.GetAsync("/api/practice/review/due")));
        await fx.WithDb(db => db.Set<ReviewCard>().Where(c => c.UserId == uid && c.QuestionId == free1.Id).ExecuteUpdateAsync(x => x.SetProperty(c => c.DueAt, DateTime.UtcNow.AddMinutes(-1))));
        var due = await Read<List<DueReviewDto>>(await learner.GetAsync("/api/practice/review/due"));
        Assert.Equal(free1.Id, Assert.Single(due).QuestionId);
        var review = await Read<PracticeSessionView>(await learner.PostAsync("/api/practice/sessions", JsonBody(new { dueForReview = true })));
        Assert.Equal(["PF1 stem"], review.Items.Select(i => i.Stem).ToList());

        // Another learner cannot touch this session; invalid counts are rejected.
        var (_, other) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await other.GetAsync($"/api/practice/sessions/{s.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await learner.PostAsync("/api/practice/sessions", JsonBody(new { count = 500 }))).StatusCode);

        // Premium items stop working when the entitlement ends.
        var p = withPremium.Items.Single(i => i.Stem == "PP1 stem");
        var right = p.Options.Single(o => o.Text == "PP1-right").Id;
        await Read<PracticeItemView>(await learner.PutAsync($"/api/practice/sessions/{withPremium.Id}/items/{p.ItemId}", JsonBody(new { selectedOptionIds = new[] { right } })));
        await fx.WithDb(db => db.Entitlements.Where(e => e.UserId == uid).ExecuteUpdateAsync(x => x.SetProperty(e => e.RevokedAt, DateTime.UtcNow)));
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.PostAsync($"/api/practice/sessions/{withPremium.Id}/items/{p.ItemId}/check", null)).StatusCode);

        // Refund-then-finish: the score is returned but the premium item's key, rationales and explanation are stripped.
        var finished = await Read<PracticeResult>(await learner.PostAsync($"/api/practice/sessions/{withPremium.Id}/finish", null));
        Assert.Equal(1m, finished.PointsEarned);
        Assert.Equal(1, finished.Correct);
        var stripped = finished.Review.Single(r => r.Stem == "PP1 stem");
        Assert.Empty(stripped.CorrectOptionIds);
        Assert.Equal("", stripped.Explanation);
        Assert.All(stripped.Options, o => { Assert.False(o.IsCorrect); Assert.Equal("", o.Rationale); });
        var freeReview = finished.Review.Single(r => r.Stem == "PF1 stem");
        Assert.NotEmpty(freeReview.CorrectOptionIds); // free items keep their review
        var again = await Read<PracticeResult>(await learner.PostAsync($"/api/practice/sessions/{withPremium.Id}/finish", null)); // idempotent re-read
        Assert.Empty(again.Review.Single(r => r.Stem == "PP1 stem").CorrectOptionIds);
    }

    // ---------------- Diagnostic recommendations ----------------

    [Fact]
    public async Task Diagnostic_recommends_lessons_for_weak_skills_with_disclaimer()
    {
        var l = await LiveCourse();
        var lessons = await fx.WithDb(db => db.Lessons.Join(db.Modules.Where(m => m.CourseId == l.Course.Id), x => x.ModuleId, m => m.Id, (x, m) => x).OrderBy(x => x.Code).ToListAsync());
        var weakLesson = lessons[0];
        var d1 = await Q(l, "D1", skill: "WEAK", lessonId: weakLesson.Id);
        var d2 = await Q(l, "D2", skill: "WEAK", lessonId: weakLesson.Id);
        var d3 = await Q(l, "D3", skill: "STRONG", lessonId: lessons[1].Id);
        var a = await Assess(l, [d1, d2, d3], kind: AssessmentKind.Diagnostic);
        var (_, learner) = await fx.User(Roles.Student);
        var v = await Start(learner, a.Id);
        Assert.Equal(HttpStatusCode.Conflict, (await learner.GetAsync($"/api/attempts/{v.Id}/recommendations")).StatusCode);
        await Answer(learner, v, "D1", "D1-wrong");
        await Answer(learner, v, "D2", "D2-right");
        await Answer(learner, v, "D3", "D3-right");
        var result = await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{v.Id}/submit", null));
        Assert.True(result.ReadinessIsEstimate);
        Assert.Contains("not a prediction or guarantee", result.ReadinessDisclaimer);

        var rec = await Read<RecommendationsDto>(await learner.GetAsync($"/api/attempts/{v.Id}/recommendations"));
        Assert.Equal(AssessmentKind.Diagnostic, rec.Kind);
        Assert.True(rec.Skills.Single(s => s.Skill == "WEAK").Weak);
        Assert.False(rec.Skills.Single(s => s.Skill == "STRONG").Weak);
        var lesson = Assert.Single(rec.Lessons);
        Assert.Equal(weakLesson.Id, lesson.LessonId);
        Assert.Equal(["WEAK"], lesson.WeakSkills);
        Assert.True(rec.ReadinessIsEstimate);
        var (_, other) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await other.GetAsync($"/api/attempts/{v.Id}/recommendations")).StatusCode);
    }

    // ---------------- Challenges ----------------

    [Fact]
    public async Task Learners_challenge_questions_and_reviewers_resolve_them()
    {
        var l = await LiveCourse();
        var q = await Q(l, "CH1");
        var a = await Assess(l, [q]);
        var (learnerId, learner) = await fx.User(Roles.Student);
        var v = await Start(learner, a.Id);
        var itemId = v.Items[0].ItemId;
        var body = JsonBody(new { reason = "Two options are defensible given the stem wording." });
        Assert.Equal(HttpStatusCode.Conflict, (await learner.PostAsync($"/api/attempts/{v.Id}/items/{itemId}/challenge", body)).StatusCode);
        await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{v.Id}/submit", null));
        var (_, other) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await other.PostAsync($"/api/attempts/{v.Id}/items/{itemId}/challenge",
            JsonBody(new { reason = "Two options are defensible given the stem wording." }))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await learner.PostAsync($"/api/attempts/{v.Id}/items/{itemId}/challenge", JsonBody(new { reason = "short" }))).StatusCode);
        var ch = await Read<MyChallengeDto>(await learner.PostAsync($"/api/attempts/{v.Id}/items/{itemId}/challenge",
            JsonBody(new { reason = "Two options are defensible given the stem wording." })));
        Assert.Equal(HttpStatusCode.Conflict, (await learner.PostAsync($"/api/attempts/{v.Id}/items/{itemId}/challenge",
            JsonBody(new { reason = "Two options are defensible given the stem wording." }))).StatusCode);

        Assert.Equal(HttpStatusCode.Forbidden, (await learner.GetAsync("/api/review/question-challenges")).StatusCode);
        var (_, reviewer) = await fx.User(Roles.Reviewer);
        var queue = await Read<List<ChallengeDto>>(await reviewer.GetAsync("/api/review/question-challenges?status=Open"));
        Assert.Contains(queue, c => c.Id == ch.Id && c.QuestionExternalId == "CH1");
        Assert.Contains(await Read<List<ChallengeDto>>(await l.Author.GetAsync($"/api/studio/courses/{l.Course.Id}/question-challenges")), c => c.Id == ch.Id);
        Assert.Equal(HttpStatusCode.Forbidden, (await l.Author.PostAsync($"/api/review/question-challenges/{ch.Id}/resolve",
            JsonBody(new { resolution = "NoChange", note = "fine" }))).StatusCode);

        var resolved = await Read<ChallengeDto>(await reviewer.PostAsync($"/api/review/question-challenges/{ch.Id}/resolve",
            JsonBody(new { resolution = "Retire", note = "Ambiguous; retired." })));
        Assert.Equal(ChallengeStatus.Resolved, resolved.Status);
        Assert.Equal(QuestionState.Retired, (await fx.WithDb(db => db.Questions.SingleAsync(x => x.Id == q.Id))).State);
        Assert.True(await fx.WithDb(db => db.Notifications.AnyAsync(n => n.UserId == learnerId && n.Kind == "question_challenge" && n.Title.Contains("challenge"))));
        var mine = await Read<List<MyChallengeDto>>(await learner.GetAsync("/api/me/question-challenges"));
        Assert.Equal(ChallengeResolution.Retire, mine.Single(c => c.Id == ch.Id).Resolution);
        Assert.Equal(HttpStatusCode.Conflict, (await reviewer.PostAsync($"/api/review/question-challenges/{ch.Id}/resolve",
            JsonBody(new { resolution = "NoChange", note = "again" }))).StatusCode);
    }

    // ---------------- Certificate templates and corrections ----------------

    [Fact]
    public async Task Certificate_templates_and_name_corrections()
    {
        var l = await LiveCourse();
        var q = await Q(l, "CT1");
        var a = await Assess(l, [q], pass: 70m, cert: true);
        var (uid, learner) = await fx.User(Roles.Student);
        var v = await Start(learner, a.Id);
        await Answer(learner, v, "CT1", "CT1-right");
        var r = await Read<AttemptResult>(await learner.PostAsync($"/api/attempts/{v.Id}/submit", null));
        var code = r.CertificateCode!;
        var cert = await fx.WithDb(db => db.Certificates.SingleAsync(c => c.UserId == uid));
        var (_, staff) = await fx.User(Roles.Admin);

        var tpl = new { name = "Classic", titleText = "Certificate of Achievement", primaryColor = "#112233", accentColor = "#AA5500", logoResourceId = (Guid?)null, signatureName = "Dr. A", signatureTitle = "Academic Director" };
        Assert.Equal(HttpStatusCode.Forbidden, (await l.Author.PostAsync("/api/admin/certificate-templates", JsonBody(tpl))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await staff.PostAsync("/api/admin/certificate-templates", JsonBody(tpl with { primaryColor = "red" }))).StatusCode);
        var created = await Read<CertificateTemplateDto>(await staff.PostAsync("/api/admin/certificate-templates", JsonBody(tpl)));
        Assert.Contains(await Read<List<CertificateTemplateDto>>(await l.Author.GetAsync("/api/certificate-templates")), t => t.Id == created.Id);
        await Read<CourseTemplateDto>(await l.Author.PutAsync($"/api/studio/courses/{l.Course.Id}/certificate-template", JsonBody(new { templateId = created.Id })));
        var (_, stranger) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PutAsync($"/api/studio/courses/{l.Course.Id}/certificate-template", JsonBody(new { templateId = created.Id }))).StatusCode);
        var pdf = await learner.GetAsync($"/api/certificates/{code}/pdf");
        Assert.Equal(HttpStatusCode.OK, pdf.StatusCode);
        Assert.StartsWith("%PDF", System.Text.Encoding.ASCII.GetString((await pdf.Content.ReadAsByteArrayAsync())[..4]));

        // Name correction: learner requests, staff approves, same code re-issued with the corrected name.
        Assert.Equal(HttpStatusCode.NotFound, (await stranger.PostAsync($"/api/me/certificates/{cert.Id}/corrections",
            JsonBody(new { requestedName = "Someone Else", reason = "typo" }))).StatusCode);
        var corr = await Read<CorrectionDto>(await learner.PostAsync($"/api/me/certificates/{cert.Id}/corrections",
            JsonBody(new { requestedName = "Fatima Al-Zahra", reason = "My legal name was misspelled." })));
        Assert.Equal(HttpStatusCode.Conflict, (await learner.PostAsync($"/api/me/certificates/{cert.Id}/corrections",
            JsonBody(new { requestedName = "Fatima Al Zahra", reason = "again" }))).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await learner.PostAsync($"/api/admin/certificate-corrections/{corr.Id}/decide", JsonBody(new { approve = true, note = "self" }))).StatusCode);
        var pending = await Read<List<CorrectionDto>>(await staff.GetAsync("/api/admin/certificate-corrections?status=Pending"));
        Assert.Contains(pending, c => c.Id == corr.Id);
        var done = await Read<CorrectionDto>(await staff.PostAsync($"/api/admin/certificate-corrections/{corr.Id}/decide", JsonBody(new { approve = true, note = "ID checked." })));
        Assert.Equal(CertificateRequestStatus.Approved, done.Status);
        var verify = await Read<CertificateVerification>(await fx.Factory.CreateClient().GetAsync($"/api/certificates/verify/{code}"));
        Assert.Equal("Fatima Al-Zahra", verify.RecipientName);
        Assert.Equal(code, verify.Code);
        Assert.True(await fx.WithDb(db => db.AuditLogs.AnyAsync(x => x.Action == "certificate.reissued_corrected_name" && x.EntityId == cert.Id.ToString())));
        // Appeals are only for revoked certificates.
        Assert.Equal(HttpStatusCode.Conflict, (await learner.PostAsync($"/api/me/certificates/{cert.Id}/appeals", JsonBody(new { reason = "Nothing to appeal here." }))).StatusCode);
    }
}
