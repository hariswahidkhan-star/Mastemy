using System.Security.Cryptography;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Questions;
using Microsoft.EntityFrameworkCore;
using AssessmentEntity = Mastemy.Api.Domain.Assessment;

namespace Mastemy.Api.Modules.Assessment;

/// <summary>
/// Learner attempts. All scoring is server-side; learner views never contain correctness or rationales until allowed
/// (Practice: per-item check and result review; Exam: review only after submission). Deadlines use server time.
/// </summary>
public class AttemptService(AppDbContext db, ICurrentUser me, AccessService access, CertificateService certificates,
    Catalog.CourseSnapshotService snapshots, AuditService audit, AccommodationService accommodations, QuestionChallengeService challenges)
{
    /// <summary>Attempt side rows (accommodation / pause state) loaded for this request, keyed by attempt id.</summary>
    private readonly Dictionary<Guid, AttemptExtension?> exts = new();

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
        var policy = await db.Set<AssessmentPolicy>().AsNoTracking().FirstOrDefaultAsync(p => p.AssessmentId == id);
        var acc = uid is { } u ? await accommodations.ActiveFor(u, id) : null;
        return new AssessmentSummaryDto(a.Id, a.CourseId, a.ModuleId, a.LessonId, a.Title, a.Kind, a.Mode, a.TimeLimitMinutes, a.MaxAttempts,
            a.PassPercent, a.MultiSelectScoring, count, a.IsPremium, locked, a.CountsTowardCertificate, Scoring.Rules, criteria, used, inProgress, a.ReviewPolicy,
            policy?.AllowPause == true && a.TimeLimitMinutes is not null, policy?.AllowPause == true ? policy.MaxPauseMinutes : 0,
            EffectiveMinutes(a.TimeLimitMinutes, acc), acc is not null);
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
            await LoadExt(o);
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
        var metas = await db.Set<QuestionMeta>().AsNoTracking().Where(m => qidSet.Contains(m.QuestionId)).ToDictionaryAsync(m => m.QuestionId);
        var policy = await db.Set<AssessmentPolicy>().AsNoTracking().FirstOrDefaultAsync(p => p.AssessmentId == a.Id);

        // Exposure rule: questions this learner has already been shown the maximum number of times (in this assessment) are
        // withheld, together with their whole case group.
        var excluded = new HashSet<Guid>();
        if (policy?.MaxExposuresPerQuestion is { } maxExposures)
        {
            var exposures = await (from it in db.AttemptItems
                                   join at in db.Attempts on it.AttemptId equals at.Id
                                   join v in db.QuestionVersions on it.QuestionVersionId equals v.Id
                                   where at.UserId == uid && at.AssessmentId == a.Id && qidSet.Contains(v.QuestionId)
                                   group it by v.QuestionId into g
                                   select new { g.Key, Count = g.Count() }).ToListAsync();
            excluded = exposures.Where(e => e.Count >= maxExposures).Select(e => e.Key).ToHashSet();
        }
        var candidates = questions.Select(q =>
        {
            var m = metas.GetValueOrDefault(q.Id);
            return new FormCandidate(q.Id, links.First(l => l.QuestionId == q.Id).SortOrder, m?.CaseGroupId, m?.CaseGroupOrder ?? 0);
        }).ToList();
        var blockedGroups = candidates.Where(c => c.CaseGroupId is not null && excluded.Contains(c.QuestionId)).Select(c => c.CaseGroupId!.Value).ToHashSet();
        candidates = candidates.Where(c => !excluded.Contains(c.QuestionId) && (c.CaseGroupId is not { } g || !blockedGroups.Contains(g))).ToList();
        if (candidates.Count == 0)
            throw AppException.Conflict("You have already been shown every question of this assessment the maximum number of times allowed.", "exposure_limit_reached");
        var drawnIds = FormBuilder.Build(candidates, a.ShuffleQuestions, a.QuestionCount);
        var versions = await db.QuestionVersions.AsNoTracking().Include(v => v.Options).Where(v => drawnIds.Contains(v.QuestionId)).ToListAsync();

        // Accommodations (staff-granted) are applied once, here, at attempt start.
        var acc = await accommodations.ActiveFor(uid, a.Id);
        var now = DateTime.UtcNow;
        var effective = EffectiveSeconds(a.TimeLimitMinutes, acc);
        var attempt = new Attempt
        {
            AssessmentId = a.Id, UserId = uid, Status = AttemptStatus.InProgress, StartedAt = now,
            DeadlineAt = effective is { } secs ? now.AddSeconds(secs) : null,
            ScoringPolicy = a.MultiSelectScoring, PassPercent = a.PassPercent,
        };
        var order = 0;
        var itemByQuestion = new Dictionary<Guid, Guid>();
        foreach (var qid in drawnIds)
        {
            var q = questions.First(x => x.Id == qid);
            var v = versions.First(x => x.QuestionId == q.Id && x.Version == q.CurrentVersion);
            var opts = v.Options.OrderBy(o => o.SortOrder).ToList();
            if (a.ShuffleOptions && v.AllowShuffle) opts = opts.OrderBy(_ => RandomNumberGenerator.GetInt32(int.MaxValue)).ToList();
            var item = new AttemptItem
            {
                AttemptId = attempt.Id, QuestionVersionId = v.Id, SortOrder = order++,
                OptionOrder = string.Join(',', opts.Select(o => o.Id)), SelectedOptionIds = "",
            };
            itemByQuestion[qid] = item.Id;
            attempt.Items.Add(item);
        }
        var ext = new AttemptExtension
        {
            AttemptId = attempt.Id, BaseTimeLimitMinutes = a.TimeLimitMinutes, AccommodationId = acc?.Id,
            ExtraTimePercent = acc?.ExtraTimePercent ?? 0, Untimed = acc?.Untimed == true && a.TimeLimitMinutes is not null,
            PauseAllowanceSeconds = policy?.AllowPause == true && attempt.DeadlineAt is not null ? policy.MaxPauseMinutes * 60 : 0,
        };
        var groupIds = drawnIds.Select(id => metas.GetValueOrDefault(id)?.CaseGroupId).Where(g => g is not null).Select(g => g!.Value).Distinct().ToList();
        var groups = await db.Set<CaseGroup>().AsNoTracking().Where(g => groupIds.Contains(g.Id)).ToListAsync();
        db.Attempts.Add(attempt);
        db.Set<AttemptExtension>().Add(ext);
        foreach (var g in groups)
            db.Set<AttemptCase>().Add(new AttemptCase
            {
                AttemptId = attempt.Id, CaseGroupId = g.Id, Title = g.Title, ExhibitMarkdown = g.ExhibitMarkdown, ResourceIds = g.ResourceIds,
                QuestionIds = string.Join(',', drawnIds.Where(id => metas.GetValueOrDefault(id)?.CaseGroupId == g.Id)),
            });
        if (acc is not null)
            audit.Record("attempt.accommodation_applied", "Attempt", attempt.Id,
                new { accommodationId = acc.Id, acc.ExtraTimePercent, acc.Untimed, baseMinutes = a.TimeLimitMinutes, attempt.DeadlineAt, userId = uid });
        exts[attempt.Id] = ext;
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
            RequireNotPaused(at);
            await RequirePremium(asm);
            var item = at.Items.FirstOrDefault(i => i.Id == itemId) ?? throw AppException.NotFound("Attempt item");
            if (item.CheckedAt is not null)
                throw AppException.Conflict("This answer was checked and is now locked.", "item_locked");
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
            if (at.Status != AttemptStatus.InProgress) throw AppException.Conflict("This attempt is already finished.", "attempt_closed");
            if (IsOverdue(at)) { await Finalize(at, asm, AttemptStatus.Expired); expired = true; return; }
            RequireNotPaused(at);
            await RequirePremium(asm);
            var item = at.Items.FirstOrDefault(i => i.Id == itemId) ?? throw AppException.NotFound("Attempt item");
            // Revealing the answer locks the item so the learner cannot change it afterwards.
            item.CheckedAt ??= DateTime.UtcNow;
            var v = await db.QuestionVersions.AsNoTracking().Include(x => x.Options).FirstAsync(x => x.Id == item.QuestionVersionId);
            var order = ParseIds(item.OptionOrder);
            var opts = order.Select(id => v.Options.First(o => o.Id == id)).ToList();
            var correctIds = opts.Where(o => o.IsCorrect).Select(o => o.Id).ToList();
            var points = Scoring.Item(v.Type, correctIds, ParseIds(item.SelectedOptionIds), at.ScoringPolicy);
            result = new CheckResult(item.Id, points == 1m, correctIds, opts.Select(o => new RationaleDto(o.Id, o.Rationale)).ToList(), v.Explanation);
            if (ParseIds(item.SelectedOptionIds).Count > 0) await ReviewScheduler.Record(db, at.UserId, v.QuestionId, points);
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
            if (exts.GetValueOrDefault(at.Id) is { PausedAt: not null } ext) await EndPause(at, ext, DateTime.UtcNow);
            if (!IsOverdue(at)) await RequirePremium(asm);
            await Finalize(at, asm, IsOverdue(at) ? AttemptStatus.Expired : AttemptStatus.Submitted);
        });
        await certificates.IssueIfEligible(attempt, a);
        return await Result(attempt, a);
    }

    // ---------------- Internals ----------------

    /// <summary>Premium entitlement is re-checked on every write, so access lost mid-attempt (refund/revocation) stops the attempt.</summary>
    private async Task RequirePremium(AssessmentEntity a)
    {
        if (a.IsPremium && !await access.HasPremiumAccess(a.CourseId))
            throw new AppException(403, "Premium access for this assessment is no longer active.", "premium_required");
    }

    /// <summary>A paused attempt (within its pause allowance) is never overdue; its deadline moves on resume.</summary>
    private bool IsOverdue(Attempt a) => a.Status == AttemptStatus.InProgress && a.DeadlineAt is { } d && DateTime.UtcNow > d
                                         && exts.GetValueOrDefault(a.Id)?.PausedAt is null;

    internal static int? EffectiveSeconds(int? baseMinutes, Accommodation? acc)
    {
        if (baseMinutes is not { } m) return null;
        if (acc?.Untimed == true) return null;
        return (int)Math.Ceiling(m * 60 * (100 + (acc?.ExtraTimePercent ?? 0)) / 100.0);
    }

    private static int? EffectiveMinutes(int? baseMinutes, Accommodation? acc) =>
        EffectiveSeconds(baseMinutes, acc) is { } s ? (int)Math.Ceiling(s / 60.0) : null;

    private async Task<AttemptExtension?> LoadExt(Attempt at)
    {
        if (exts.TryGetValue(at.Id, out var cached)) return cached;
        var ext = await db.Set<AttemptExtension>().FirstOrDefaultAsync(x => x.AttemptId == at.Id);
        exts[at.Id] = ext;
        if (ext?.PausedAt is { } pausedAt)
        {
            // Pause allowance exhausted while paused: the clock restarted automatically when the allowance ran out.
            var remaining = Math.Max(0, ext.PauseAllowanceSeconds - ext.PausedSecondsUsed);
            if ((DateTime.UtcNow - pausedAt).TotalSeconds >= remaining) await EndPause(at, ext, pausedAt.AddSeconds(remaining));
        }
        return ext;
    }

    /// <summary>Closes the open pause at <paramref name="resumedAt"/>, crediting the paused time (bounded by the allowance) to the deadline.</summary>
    private async Task EndPause(Attempt at, AttemptExtension ext, DateTime resumedAt)
    {
        if (ext.PausedAt is not { } pausedAt) return;
        var remaining = Math.Max(0, ext.PauseAllowanceSeconds - ext.PausedSecondsUsed);
        var credit = (int)Math.Clamp(Math.Floor((resumedAt - pausedAt).TotalSeconds), 0, remaining);
        if (at.DeadlineAt is { } d) at.DeadlineAt = d.AddSeconds(credit);
        ext.PausedSecondsUsed += credit;
        ext.PausedAt = null;
        var row = await db.Set<AttemptPause>().Where(p => p.AttemptId == at.Id && p.ResumedAt == null).OrderByDescending(p => p.PausedAt).FirstOrDefaultAsync();
        if (row is not null) { row.ResumedAt = resumedAt; row.CreditedSeconds = credit; }
    }

    // ---------------- Pause policy ----------------

    public async Task<AttemptView> Pause(Guid attemptId)
    {
        var (attempt, a) = await Locked(attemptId, async (at, asm) =>
        {
            if (at.Status != AttemptStatus.InProgress) throw AppException.Conflict("This attempt is already finished.", "attempt_closed");
            if (IsOverdue(at)) throw AppException.Conflict("The time limit for this attempt has passed.", "attempt_deadline_passed");
            var ext = exts.GetValueOrDefault(at.Id);
            if (ext is null || ext.PauseAllowanceSeconds <= 0 || at.DeadlineAt is null)
                throw AppException.Conflict("This assessment does not allow pausing.", "pause_not_allowed");
            if (ext.PausedAt is not null) throw AppException.Conflict("This attempt is already paused.", "attempt_paused");
            if (ext.PausedSecondsUsed >= ext.PauseAllowanceSeconds) throw AppException.Conflict("The pause allowance for this attempt is used up.", "pause_allowance_exhausted");
            var now = DateTime.UtcNow;
            ext.PausedAt = now;
            db.Set<AttemptPause>().Add(new AttemptPause { AttemptId = at.Id, PausedAt = now });
            await Task.CompletedTask;
        });
        return await View(attempt, a);
    }

    public async Task<AttemptView> Resume(Guid attemptId)
    {
        var (attempt, a) = await Locked(attemptId, async (at, asm) =>
        {
            if (at.Status != AttemptStatus.InProgress) throw AppException.Conflict("This attempt is already finished.", "attempt_closed");
            var ext = exts.GetValueOrDefault(at.Id);
            if (ext?.PausedAt is null) throw AppException.Conflict("This attempt is not paused.", "attempt_not_paused");
            await EndPause(at, ext, DateTime.UtcNow);
        });
        return await View(attempt, a);
    }

    private void RequireNotPaused(Attempt at)
    {
        if (exts.GetValueOrDefault(at.Id)?.PausedAt is not null)
            throw AppException.Conflict("This attempt is paused; resume it to continue.", "attempt_paused");
    }

    /// <summary>
    /// The assessment as the caller may take it. Learners only see assessments in the course's current published snapshot,
    /// with the snapshot's settings (pass mark, scoring, time limit, attempts, review policy, premium) overlaid on the row,
    /// so draft edits take effect only after re-publish. Course authors, reviewers and staff preview the live row.
    /// </summary>
    private async Task<(AssessmentEntity, Course)> LoadLive(Guid id)
    {
        var a = await db.Assessments.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Assessment");
        var course = await db.Courses.AsNoTracking().FirstAsync(c => c.Id == a.CourseId);
        if (!AccessService.IsLive(course)) throw AppException.NotFound("Assessment");
        if (await IsPrivileged(a.CourseId)) return (a, course);
        var published = await PublishedCopy(a.CourseId, a.Id) ?? throw AppException.NotFound("Assessment");
        return (Overlay(a, published), course);
    }

    private async Task<bool> IsPrivileged(Guid courseId) =>
        me.Id is not null && (me.IsStaff || me.CanReview || await access.IsCourseAuthor(courseId));

    private async Task<Catalog.SnapshotAssessment?> PublishedCopy(Guid courseId, Guid assessmentId)
    {
        var pc = await snapshots.TryLiveById(courseId);
        return pc?.Payload.Assessments?.FirstOrDefault(x => x.Id == assessmentId);
    }

    /// <summary>Applies published settings to a detached (AsNoTracking) assessment row.</summary>
    private static AssessmentEntity Overlay(AssessmentEntity a, Catalog.SnapshotAssessment s)
    {
        a.Title = s.Title; a.Kind = s.Kind; a.Mode = s.Mode; a.IsPremium = s.IsPremium; a.ModuleId = s.ModuleId; a.LessonId = s.LessonId;
        a.TimeLimitMinutes = s.TimeLimitMinutes; a.MaxAttempts = s.MaxAttempts; a.PassPercent = s.PassPercent;
        a.MultiSelectScoring = s.MultiSelectScoring; a.ReviewPolicy = s.ReviewPolicy; a.QuestionCount = s.QuestionCount;
        a.CountsTowardCertificate = s.CountsTowardCertificate;
        return a;
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
        exts.Remove(attempt.Id);
        await LoadExt(attempt);
        var a = await db.Assessments.AsNoTracking().FirstAsync(x => x.Id == attempt.AssessmentId);
        // Learners keep the published settings for review/attempt-limit decisions (live row if it left the snapshot).
        if (!await IsPrivileged(a.CourseId) && await PublishedCopy(a.CourseId, a.Id) is { } published) a = Overlay(a, published);
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
            // Spaced repetition: every answered, not yet self-checked item feeds the learner's review schedule.
            if (item.CheckedAt is null && ParseIds(item.SelectedOptionIds).Count > 0) await ReviewScheduler.Record(db, at.UserId, v.QuestionId, item.Points.Value);
        }
        var possible = at.Items.Count;
        at.PointsEarned = earned;
        at.PointsPossible = possible;
        at.ScorePercent = Scoring.DisplayPercent(earned, possible);
        at.Passed = Scoring.Passed(earned, possible, at.PassPercent);
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
        var cases = await db.Set<AttemptCase>().AsNoTracking().Where(c => c.AttemptId == at.Id).ToListAsync();
        var caseOf = new Dictionary<Guid, Guid>();
        foreach (var c in cases) foreach (var qid in QuestionAssets.ParseIds(c.QuestionIds)) caseOf[qid] = c.CaseGroupId;
        var ordered = at.Items.OrderBy(i => i.SortOrder).ToList();
        var items = ordered.Select(i =>
        {
            var v = versions[i.QuestionVersionId];
            return ItemView(i, v) with { CaseGroupId = caseOf.TryGetValue(v.QuestionId, out var g) ? g : null };
        }).ToList();
        var caseDtos = cases.Select(c => new AttemptCaseDto(c.CaseGroupId, c.Title, c.ExhibitMarkdown, QuestionAssets.ParseIds(c.ResourceIds),
            items.Where(i => i.CaseGroupId == c.CaseGroupId).Select(i => i.ItemId).ToList())).OrderBy(c => items.FindIndex(i => i.CaseGroupId == c.CaseGroupId)).ToList();
        var ext = exts.TryGetValue(at.Id, out var e) ? e : await db.Set<AttemptExtension>().AsNoTracking().FirstOrDefaultAsync(x => x.AttemptId == at.Id);
        var pause = ext is null ? null : new AttemptPauseState(ext.PauseAllowanceSeconds > 0, ext.PausedAt is not null, ext.PausedAt,
            Math.Max(0, ext.PauseAllowanceSeconds - ext.PausedSecondsUsed - (ext.PausedAt is { } p ? (int)(DateTime.UtcNow - p).TotalSeconds : 0)));
        return new AttemptView(at.Id, at.AssessmentId, a.Mode, at.Status, at.StartedAt, at.DeadlineAt, DateTime.UtcNow, at.SubmittedAt, items,
            caseDtos, pause, ext?.ExtraTimePercent is > 0 ? ext.ExtraTimePercent : null, ext?.Untimed == true);
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
        // Practice: review always available. Exam: governed by the assessment's answer review policy.
        var reveal = a.Mode == AssessmentMode.Practice;
        if (!reveal)
        {
            var used = a.MaxAttempts is null ? 0 : await db.Attempts.CountAsync(x => x.AssessmentId == a.Id && x.UserId == at.UserId && x.Status != AttemptStatus.InProgress);
            reveal = Scoring.RevealAnswers(a.ReviewPolicy, at.Passed == true, used, a.MaxAttempts);
        }
        string? code = null;
        if (at.Passed == true && a.CountsTowardCertificate)
            code = await db.Certificates.AsNoTracking().Where(c => c.UserId == at.UserId && c.CourseId == a.CourseId).Select(c => c.Code).FirstOrDefaultAsync();
        var regraded = await db.Set<RegradeResult>().AnyAsync(r => r.AttemptId == at.Id);
        return new AttemptResult(at.Id, at.Status, at.ScorePercent ?? 0, at.PointsEarned ?? 0, at.PointsPossible ?? 0, at.Passed ?? false,
            at.PassPercent, at.ScoringPolicy, correct, incorrect, unanswered,
            topics.Select(kv => new TopicResult(kv.Key, kv.Value.c, kv.Value.t)).OrderBy(t => t.Tag).ToList(), reveal ? review : null, code, reveal,
            Regraded: regraded);
    }

    // ---------------- Challenges and recommendations ----------------

    /// <summary>
    /// A learner challenges an item they were shown. Exam-mode items can only be challenged after the attempt is finished
    /// (no mid-exam channel to reviewers); practice items any time.
    /// </summary>
    public async Task<MyChallengeDto> Challenge(Guid attemptId, Guid itemId, ChallengeInput input)
    {
        var uid = me.RequireId();
        var at = await db.Attempts.AsNoTracking().Include(x => x.Items).FirstOrDefaultAsync(x => x.Id == attemptId && x.UserId == uid)
                 ?? throw AppException.NotFound("Attempt");
        var item = at.Items.FirstOrDefault(i => i.Id == itemId) ?? throw AppException.NotFound("Attempt item");
        var a = await db.Assessments.AsNoTracking().FirstAsync(x => x.Id == at.AssessmentId);
        if (a.Mode == AssessmentMode.Exam && at.Status == AttemptStatus.InProgress)
            throw AppException.Conflict("Exam questions can be challenged after the attempt is submitted.", "attempt_in_progress");
        return await challenges.Open(item.QuestionVersionId, input?.Reason);
    }

    public const decimal WeakSkillThreshold = 0.6m;

    /// <summary>
    /// Skill breakdown of a finished attempt with lesson recommendations for weak skills (accuracy below 60%). Intended for
    /// Diagnostic assessments but available for any finished attempt. Recommendations never include answer keys.
    /// </summary>
    public async Task<RecommendationsDto> Recommendations(Guid attemptId)
    {
        var uid = me.RequireId();
        var at = await db.Attempts.AsNoTracking().Include(x => x.Items).FirstOrDefaultAsync(x => x.Id == attemptId && x.UserId == uid)
                 ?? throw AppException.NotFound("Attempt");
        if (at.Status == AttemptStatus.InProgress) throw AppException.Conflict("Recommendations are available after the attempt is submitted.", "attempt_in_progress");
        var a = await db.Assessments.AsNoTracking().FirstAsync(x => x.Id == at.AssessmentId);
        var versions = await Versions(at);
        var qids = versions.Values.Select(v => v.QuestionId).Distinct().ToList();
        var lessonOf = await db.Questions.AsNoTracking().Where(q => qids.Contains(q.Id)).ToDictionaryAsync(q => q.Id, q => q.LessonId);
        var rows = at.Items.Select(i => (Skill: string.IsNullOrWhiteSpace(versions[i.QuestionVersionId].SkillCode) ? "General" : versions[i.QuestionVersionId].SkillCode,
            Points: i.Points ?? 0m, Lesson: lessonOf.GetValueOrDefault(versions[i.QuestionVersionId].QuestionId))).ToList();
        var skills = rows.GroupBy(r => r.Skill).Select(g =>
        {
            var total = g.Count();
            var earned = g.Sum(x => x.Points);
            var ratio = total == 0 ? 0 : earned / total;
            return new SkillResultDto(g.Key, Math.Round(earned, 4), total, Math.Round(ratio * 100m, 2), ratio < WeakSkillThreshold);
        }).OrderBy(s => s.AccuracyPercent).ThenBy(s => s.Skill).ToList();
        var weak = skills.Where(s => s.Weak).Select(s => s.Skill).ToHashSet();
        var missesByLesson = rows.Where(r => weak.Contains(r.Skill) && r.Lesson is not null && r.Points < 1m)
            .GroupBy(r => r.Lesson!.Value).ToDictionary(g => g.Key, g => (Misses: g.Count(), Skills: g.Select(x => x.Skill).Distinct().OrderBy(x => x).ToList()));
        var lessons = new List<LessonRecommendationDto>();
        var published = await snapshots.TryLiveById(a.CourseId);
        if (published is not null)
        {
            foreach (var (module, lesson) in published.Payload.OrderedLessons())
                if (missesByLesson.TryGetValue(lesson.Id, out var info))
                    lessons.Add(new LessonRecommendationDto(lesson.Id, module.Title, lesson.Title, info.Skills, info.Misses));
        }
        lessons = lessons.OrderByDescending(l => l.Misses).ToList();
        return new RecommendationsDto(at.Id, a.Kind, skills, lessons, true, Scoring.ReadinessDisclaimer);
    }
}
