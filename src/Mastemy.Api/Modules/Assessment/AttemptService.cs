using System.Security.Cryptography;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using AssessmentEntity = Mastemy.Api.Domain.Assessment;

namespace Mastemy.Api.Modules.Assessment;

/// <summary>
/// Learner attempts. All scoring is server-side; learner views never contain correctness or rationales until allowed
/// (Practice: per-item check and result review; Exam: review only after submission). Deadlines use server time.
/// </summary>
public class AttemptService(AppDbContext db, ICurrentUser me, AccessService access, CertificateService certificates)
{
    // ---------------- Summary ----------------

    public async Task<AssessmentSummaryDto> Summary(Guid id)
    {
        var (a, _) = await LoadLive(id);
        var uid = me.Id;
        var pool = await ActivePoolCount(a);
        var count = a.QuestionCount > 0 ? Math.Min(a.QuestionCount, pool) : pool;
        int? used = null; Guid? inProgress = null;
        if (uid is not null)
        {
            used = await db.Attempts.CountAsync(x => x.AssessmentId == id && x.UserId == uid);
            inProgress = await db.Attempts.Where(x => x.AssessmentId == id && x.UserId == uid && x.Status == AttemptStatus.InProgress)
                .Select(x => (Guid?)x.Id).FirstOrDefaultAsync();
        }
        var locked = a.IsPremium && !(uid is not null && await access.HasPremiumAccess(a.CourseId));
        var criteria = a.CountsTowardCertificate
            ? $"Passing this assessment (score >= {a.PassPercent:0.##}%) earns the course certificate. Certificates reflect assessed MCQ performance only, never video viewing."
            : "This assessment does not count toward a certificate.";
        return new AssessmentSummaryDto(a.Id, a.CourseId, a.ModuleId, a.LessonId, a.Title, a.Kind, a.Mode, a.TimeLimitMinutes, a.MaxAttempts,
            a.PassPercent, a.MultiSelectScoring, count, a.IsPremium, locked, a.CountsTowardCertificate, Scoring.Rules, criteria, used, inProgress);
    }

    // ---------------- Start ----------------

    public async Task<AttemptView> Start(Guid assessmentId)
    {
        var uid = me.RequireId();
        var (a, _) = await LoadLive(assessmentId);
        if (a.IsPremium && !await access.HasPremiumAccess(a.CourseId))
            throw new AppException(403, "This assessment is part of a premium learning package.", "premium_required");

        await using var tx = await db.Database.BeginTransactionAsync();
        // Serialize starts per user so only one InProgress attempt can exist per assessment.
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT `Id` FROM `Users` WHERE `Id` = {uid.ToString()} FOR UPDATE");

        var open = await db.Attempts.Include(x => x.Items).Where(x => x.AssessmentId == assessmentId && x.UserId == uid && x.Status == AttemptStatus.InProgress).ToListAsync();
        foreach (var o in open)
        {
            if (IsOverdue(o)) { await Finalize(o, a, AttemptStatus.Expired); continue; }
            await db.SaveChangesAsync();
            await tx.CommitAsync();
            return await View(o, a);
        }
        if (open.Count > 0) await db.SaveChangesAsync();

        var used = await db.Attempts.CountAsync(x => x.AssessmentId == assessmentId && x.UserId == uid);
        if (a.MaxAttempts is { } max && used >= max)
        {
            await tx.CommitAsync();
            await IssueAfterFinalize(open, a);
            throw AppException.Conflict($"You have used all {max} attempt(s) for this assessment.", "attempt_limit_reached");
        }

        var links = await db.AssessmentQuestions.AsNoTracking().Where(x => x.AssessmentId == a.Id).ToListAsync();
        var qids = links.Select(l => l.QuestionId).ToList();
        var questions = await db.Questions.AsNoTracking().Where(q => qids.Contains(q.Id) && q.State == QuestionState.Active).ToListAsync();
        if (questions.Count == 0) throw AppException.Conflict("This assessment has no active questions yet.", "no_active_questions");
        var qidSet = questions.Select(q => q.Id).ToList();
        var versions = await db.QuestionVersions.AsNoTracking().Include(v => v.Options).Where(v => qidSet.Contains(v.QuestionId)).ToListAsync();

        var drawn = questions.OrderBy(_ => RandomNumberGenerator.GetInt32(int.MaxValue)).ToList();
        if (a.QuestionCount > 0 && a.QuestionCount < drawn.Count) drawn = drawn.Take(a.QuestionCount).ToList();
        if (!a.ShuffleQuestions) drawn = drawn.OrderBy(q => links.First(l => l.QuestionId == q.Id).SortOrder).ToList();

        var now = DateTime.UtcNow;
        var attempt = new Attempt
        {
            AssessmentId = a.Id, UserId = uid, Status = AttemptStatus.InProgress, StartedAt = now,
            DeadlineAt = a.TimeLimitMinutes is { } m ? now.AddMinutes(m) : null,
            ScoringPolicy = a.MultiSelectScoring, PassPercent = a.PassPercent,
        };
        var order = 0;
        foreach (var q in drawn)
        {
            var v = versions.First(x => x.QuestionId == q.Id && x.Version == q.CurrentVersion);
            var opts = v.Options.OrderBy(o => o.SortOrder).ToList();
            if (a.ShuffleOptions && v.AllowShuffle) opts = opts.OrderBy(_ => RandomNumberGenerator.GetInt32(int.MaxValue)).ToList();
            attempt.Items.Add(new AttemptItem
            {
                AttemptId = attempt.Id, QuestionVersionId = v.Id, SortOrder = order++,
                OptionOrder = string.Join(',', opts.Select(o => o.Id)), SelectedOptionIds = "",
            });
        }
        db.Attempts.Add(attempt);
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        await IssueAfterFinalize(open, a);
        return await View(attempt, a);
    }

    // ---------------- Read ----------------

    public async Task<AttemptDetail> Get(Guid attemptId)
    {
        var (attempt, a) = await Locked(attemptId, async (at, asm) => { if (IsOverdue(at)) await Finalize(at, asm, AttemptStatus.Expired); });
        if (attempt.Status != AttemptStatus.InProgress) await certificates.IssueIfEligible(attempt, a);
        var view = await View(attempt, a);
        AttemptResult? result = attempt.Status == AttemptStatus.InProgress ? null : await Result(attempt, a);
        return new AttemptDetail(view, result);
    }

    public async Task<List<AttemptListItem>> Mine()
    {
        var uid = me.RequireId();
        return await db.Attempts.AsNoTracking().Where(x => x.UserId == uid)
            .Join(db.Assessments, x => x.AssessmentId, a => a.Id, (x, a) => new { x, a })
            .OrderByDescending(p => p.x.StartedAt).Take(200)
            .Select(p => new AttemptListItem(p.x.Id, p.a.Id, p.a.Title, p.a.CourseId, p.x.Status, p.x.StartedAt, p.x.SubmittedAt, p.x.ScorePercent, p.x.Passed))
            .ToListAsync();
    }

    // ---------------- Answer / check / submit ----------------

    public async Task<AttemptItemView> SaveItem(Guid attemptId, Guid itemId, SaveItemInput input)
    {
        if (input is null) throw AppException.Bad("Request body is required.");
        AttemptItemView? view = null;
        var expired = false;
        await Locked(attemptId, async (at, asm) =>
        {
            if (at.Status != AttemptStatus.InProgress) throw AppException.Conflict("This attempt is already finished.", "attempt_closed");
            if (IsOverdue(at)) { await Finalize(at, asm, AttemptStatus.Expired); expired = true; return; }
            var item = at.Items.FirstOrDefault(i => i.Id == itemId) ?? throw AppException.NotFound("Attempt item");
            var version = await db.QuestionVersions.AsNoTracking().Include(v => v.Options).FirstAsync(v => v.Id == item.QuestionVersionId);
            var allowed = ParseIds(item.OptionOrder);
            var selected = (input.SelectedOptionIds ?? []).Distinct().ToList();
            if (selected.Any(s => !allowed.Contains(s))) throw AppException.Bad("selectedOptionIds contains an option that is not part of this item.");
            if (version.Type == QuestionType.SingleChoice && selected.Count > 1) throw AppException.Bad("Single-choice items accept at most one option.");
            // Keep the display order for stable storage.
            item.SelectedOptionIds = string.Join(',', allowed.Where(selected.Contains));
            item.Flagged = input.Flagged;
            view = ItemView(item, version);
        });
        if (expired)
        {
            await IssueFor(attemptId);
            throw AppException.Conflict("The time limit for this attempt has passed; the attempt was submitted automatically.", "attempt_deadline_passed");
        }
        return view!;
    }

    public async Task<CheckResult> Check(Guid attemptId, Guid itemId)
    {
        CheckResult? result = null;
        var expired = false;
        await Locked(attemptId, async (at, asm) =>
        {
            if (asm.Mode != AssessmentMode.Practice) throw AppException.Forbidden("Answers can only be checked during practice assessments.");
            if (IsOverdue(at)) { await Finalize(at, asm, AttemptStatus.Expired); expired = true; return; }
            var item = at.Items.FirstOrDefault(i => i.Id == itemId) ?? throw AppException.NotFound("Attempt item");
            var v = await db.QuestionVersions.AsNoTracking().Include(x => x.Options).FirstAsync(x => x.Id == item.QuestionVersionId);
            var order = ParseIds(item.OptionOrder);
            var opts = order.Select(id => v.Options.First(o => o.Id == id)).ToList();
            var correctIds = opts.Where(o => o.IsCorrect).Select(o => o.Id).ToList();
            var points = Scoring.Item(v.Type, correctIds, ParseIds(item.SelectedOptionIds), at.ScoringPolicy);
            result = new CheckResult(item.Id, points == 1m, correctIds, opts.Select(o => new RationaleDto(o.Id, o.Rationale)).ToList(), v.Explanation);
        });
        if (expired)
        {
            await IssueFor(attemptId);
            throw AppException.Conflict("The time limit for this attempt has passed; the attempt was submitted automatically.", "attempt_deadline_passed");
        }
        return result!;
    }

    public async Task<AttemptResult> Submit(Guid attemptId)
    {
        var (attempt, a) = await Locked(attemptId, async (at, asm) =>
        {
            if (at.Status != AttemptStatus.InProgress) return; // idempotent: already scored
            await Finalize(at, asm, IsOverdue(at) ? AttemptStatus.Expired : AttemptStatus.Submitted);
        });
        await certificates.IssueIfEligible(attempt, a);
        return await Result(attempt, a);
    }

    // ---------------- Internals ----------------

    private static bool IsOverdue(Attempt a) => a.Status == AttemptStatus.InProgress && a.DeadlineAt is { } d && DateTime.UtcNow > d;

    private async Task<(AssessmentEntity, Course)> LoadLive(Guid id)
    {
        var a = await db.Assessments.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Assessment");
        var course = await db.Courses.AsNoTracking().FirstAsync(c => c.Id == a.CourseId);
        if (!AccessService.IsLive(course.Status)) throw AppException.NotFound("Assessment");
        return (a, course);
    }

    private async Task<int> ActivePoolCount(AssessmentEntity a) =>
        await db.AssessmentQuestions.Where(x => x.AssessmentId == a.Id)
            .Join(db.Questions, x => x.QuestionId, q => q.Id, (x, q) => q).CountAsync(q => q.State == QuestionState.Active);

    /// <summary>Runs <paramref name="action"/> on the caller's attempt under a row lock, then saves and commits.</summary>
    private async Task<(Attempt, AssessmentEntity)> Locked(Guid attemptId, Func<Attempt, AssessmentEntity, Task> action)
    {
        var uid = me.RequireId();
        db.ChangeTracker.Clear();
        await using var tx = await db.Database.BeginTransactionAsync();
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT `Id` FROM `Attempts` WHERE `Id` = {attemptId.ToString()} FOR UPDATE");
        var attempt = await db.Attempts.Include(x => x.Items).FirstOrDefaultAsync(x => x.Id == attemptId);
        if (attempt is null || attempt.UserId != uid) throw AppException.NotFound("Attempt");
        var a = await db.Assessments.AsNoTracking().FirstAsync(x => x.Id == attempt.AssessmentId);
        await action(attempt, a);
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return (attempt, a);
    }

    private async Task IssueFor(Guid attemptId)
    {
        var at = await db.Attempts.AsNoTracking().FirstAsync(x => x.Id == attemptId);
        var a = await db.Assessments.AsNoTracking().FirstAsync(x => x.Id == at.AssessmentId);
        await certificates.IssueIfEligible(at, a);
    }

    private async Task IssueAfterFinalize(List<Attempt> finalized, AssessmentEntity a)
    {
        foreach (var f in finalized.Where(x => x.Status != AttemptStatus.InProgress)) await certificates.IssueIfEligible(f, a);
    }

    /// <summary>Scores the attempt (tracked entity) using the snapshotted question versions.</summary>
    private async Task Finalize(Attempt at, AssessmentEntity a, AttemptStatus status)
    {
        var versions = await Versions(at);
        decimal earned = 0;
        foreach (var item in at.Items)
        {
            var v = versions[item.QuestionVersionId];
            var correct = v.Options.Where(o => o.IsCorrect).Select(o => o.Id).ToList();
            item.Points = Scoring.Item(v.Type, correct, ParseIds(item.SelectedOptionIds), at.ScoringPolicy);
            earned += item.Points.Value;
        }
        var possible = at.Items.Count;
        at.PointsEarned = earned;
        at.PointsPossible = possible;
        at.ScorePercent = possible == 0 ? 0 : Math.Round(earned / possible * 100m, 2);
        at.Passed = at.ScorePercent >= at.PassPercent;
        at.Status = status;
        at.SubmittedAt = status == AttemptStatus.Expired && at.DeadlineAt is { } d ? d : DateTime.UtcNow;
    }

    private async Task<Dictionary<Guid, QuestionVersion>> Versions(Attempt at)
    {
        var ids = at.Items.Select(i => i.QuestionVersionId).Distinct().ToList();
        return await db.QuestionVersions.AsNoTracking().Include(v => v.Options).Where(v => ids.Contains(v.Id)).ToDictionaryAsync(v => v.Id);
    }

    private static List<Guid> ParseIds(string csv) =>
        string.IsNullOrEmpty(csv) ? [] : csv.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(Guid.Parse).ToList();

    private static AttemptItemView ItemView(AttemptItem item, QuestionVersion v)
    {
        var opts = ParseIds(item.OptionOrder).Select(id => v.Options.First(o => o.Id == id)).Select(o => new LearnerOptionDto(o.Id, o.Text)).ToList();
        return new AttemptItemView(item.Id, item.SortOrder, v.Type, v.Stem, opts, ParseIds(item.SelectedOptionIds), item.Flagged);
    }

    private async Task<AttemptView> View(Attempt at, AssessmentEntity a)
    {
        var versions = await Versions(at);
        var items = at.Items.OrderBy(i => i.SortOrder).Select(i => ItemView(i, versions[i.QuestionVersionId])).ToList();
        return new AttemptView(at.Id, at.AssessmentId, a.Mode, at.Status, at.StartedAt, at.DeadlineAt, DateTime.UtcNow, at.SubmittedAt, items);
    }

    private static string Topic(QuestionVersion v)
    {
        var tag = v.Tags.Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).FirstOrDefault();
        return tag ?? (string.IsNullOrWhiteSpace(v.SkillCode) ? "General" : v.SkillCode);
    }

    private async Task<AttemptResult> Result(Attempt at, AssessmentEntity a)
    {
        var versions = await Versions(at);
        int correct = 0, incorrect = 0, unanswered = 0;
        var topics = new Dictionary<string, (int c, int t)>();
        var review = new List<ReviewItemDto>();
        foreach (var item in at.Items.OrderBy(i => i.SortOrder))
        {
            var v = versions[item.QuestionVersionId];
            var selected = ParseIds(item.SelectedOptionIds);
            var points = item.Points ?? 0;
            var full = points == 1m;
            if (selected.Count == 0) unanswered++; else if (full) correct++; else incorrect++;
            var topic = Topic(v);
            var cur = topics.GetValueOrDefault(topic);
            topics[topic] = (cur.c + (full ? 1 : 0), cur.t + 1);
            var opts = ParseIds(item.OptionOrder).Select(id => v.Options.First(o => o.Id == id)).ToList();
            review.Add(new ReviewItemDto(item.Id, item.SortOrder, v.Type, v.Stem, v.Explanation, points, full, selected,
                opts.Where(o => o.IsCorrect).Select(o => o.Id).ToList(),
                opts.Select(o => new ReviewOptionDto(o.Id, o.Text, o.IsCorrect, selected.Contains(o.Id), o.Rationale)).ToList()));
        }
        // Review is shown after scoring in both modes (Practice also allows per-item checks during the attempt).
        string? code = null;
        if (at.Passed == true && a.CountsTowardCertificate)
            code = await db.Certificates.AsNoTracking().Where(c => c.UserId == at.UserId && c.CourseId == a.CourseId).Select(c => c.Code).FirstOrDefaultAsync();
        return new AttemptResult(at.Id, at.Status, at.ScorePercent ?? 0, at.PointsEarned ?? 0, at.PointsPossible ?? 0, at.Passed ?? false,
            at.PassPercent, at.ScoringPolicy, correct, incorrect, unanswered,
            topics.Select(kv => new TopicResult(kv.Key, kv.Value.c, kv.Value.t)).OrderBy(t => t.Tag).ToList(), review, code);
    }
}
