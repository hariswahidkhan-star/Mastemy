using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Assessment;

public record RegradeProposalInput(Guid? QuestionVersionId, List<Guid>? CorrectOptionIds, string Reason);
public record RegradeDecisionInput(string Note);
public record RegradeDto(Guid Id, Guid QuestionId, Guid QuestionVersionId, List<Guid> OldCorrectOptionIds, List<Guid> NewCorrectOptionIds,
    string Reason, Guid ProposedBy, DateTime ProposedAt, RegradeStatus Status, Guid? DecidedBy, DateTime? DecidedAt, string? DecisionNote,
    int AffectedAttempts, int ChangedAttempts);
public record RegradeResultDto(Guid AttemptId, Guid UserId, decimal OldPointsEarned, decimal NewPointsEarned, decimal OldScorePercent,
    decimal NewScorePercent, bool OldPassed, bool NewPassed);
public record RegradeDetailDto(RegradeDto Regrade, List<RegradeResultDto> Results, List<Guid> FlaggedCertificateIds, List<string> IssuedCertificateCodes);
public record CertificateFlagDto(Guid Id, Guid CertificateId, string CertificateCode, Guid UserId, Guid? RegradeId, string Reason,
    CertificateFlagStatus Status, Guid? DecidedBy, DateTime? DecidedAt, string? DecisionNote, DateTime CreatedAt);
public record CertificateFlagDecisionInput(bool Revoke, string Note);
public record RegradePreviewDto(Guid RegradeId, int AffectedAttempts, int ChangedAttempts, int NewlyPassing, int NewlyFailing,
    int CertificatesToFlag, List<RegradeResultDto> Results);

/// <summary>
/// Regrading after a key error (spec §15): a reviewer proposes a corrected key for one question version; a different staff
/// member approves. Approval corrects the key and re-scores every finished attempt that used the version — the learners'
/// original answers are untouched — storing old and new scores per attempt. Newly passing attempts get their certificate
/// issued; certificates whose evidence no longer passes are flagged for a staff decision (never auto-revoked). Affected
/// learners are notified, and every step is audited.
/// </summary>
public class RegradeService(AppDbContext db, ICurrentUser me, AuditService audit, CertificateService certificates,
    Engagement.INotificationService notifications)
{
    public async Task<RegradeDto> Propose(Guid questionId, RegradeProposalInput input)
    {
        var uid = me.RequireId();
        if (!me.CanReview) throw AppException.Forbidden("Only reviewers can propose a regrade.");
        if (input is null) throw AppException.Bad("Request body is required.");
        var reason = input.Reason?.Trim();
        if (string.IsNullOrEmpty(reason) || reason.Length > 2000) throw AppException.Bad("reason is required (max 2000 characters).");
        var q = await db.Questions.AsNoTracking().FirstOrDefaultAsync(x => x.Id == questionId) ?? throw AppException.NotFound("Question");
        var vid = input.QuestionVersionId;
        var v = await db.QuestionVersions.AsNoTracking().Include(x => x.Options)
                    .FirstOrDefaultAsync(x => x.QuestionId == questionId && (vid == null ? x.Version == q.CurrentVersion : x.Id == vid))
                ?? throw AppException.NotFound("Question version");
        var newKey = (input.CorrectOptionIds ?? []).Distinct().ToList();
        var optionIds = v.Options.Select(o => o.Id).ToHashSet();
        if (newKey.Count == 0 || newKey.Any(id => !optionIds.Contains(id))) throw AppException.Bad("correctOptionIds must list options of this question version.");
        if (v.Type == QuestionType.SingleChoice && newKey.Count != 1) throw AppException.Bad("SingleChoice questions need exactly one correct option.");
        var oldKey = v.Options.OrderBy(o => o.SortOrder).Where(o => o.IsCorrect).Select(o => o.Id).ToList();
        if (oldKey.ToHashSet().SetEquals(newKey)) throw AppException.Bad("The proposed key is identical to the current key.", "key_unchanged");
        if (await db.Set<RegradeRequest>().AnyAsync(r => r.QuestionVersionId == v.Id && r.Status == RegradeStatus.Proposed))
            throw AppException.Conflict("A regrade proposal for this version is already awaiting a decision.", "regrade_pending");
        var r = new RegradeRequest
        {
            QuestionId = q.Id, QuestionVersionId = v.Id, OldCorrectOptionIds = string.Join(',', oldKey),
            NewCorrectOptionIds = string.Join(',', v.Options.OrderBy(o => o.SortOrder).Where(o => newKey.Contains(o.Id)).Select(o => o.Id)),
            Reason = reason, ProposedBy = uid,
        };
        db.Set<RegradeRequest>().Add(r);
        audit.Record("regrade.proposed", "RegradeRequest", r.Id, new { questionId = q.Id, questionVersionId = v.Id, oldKey, newKey });
        await db.SaveChangesAsync();
        return Dto(r);
    }

    public async Task<List<RegradeDto>> List(RegradeStatus? status)
    {
        me.RequireId();
        if (!me.CanReview) throw AppException.Forbidden();
        var q = db.Set<RegradeRequest>().AsNoTracking().AsQueryable();
        if (status is not null) q = q.Where(r => r.Status == status);
        return (await q.OrderByDescending(r => r.ProposedAt).Take(500).ToListAsync()).Select(Dto).ToList();
    }

    public async Task<RegradeDetailDto> Get(Guid id)
    {
        me.RequireId();
        if (!me.CanReview) throw AppException.Forbidden();
        var r = await db.Set<RegradeRequest>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Regrade");
        return await Detail(r, []);
    }

    /// <summary>
    /// Dry run of <see cref="Approve"/>: re-scores every finished attempt that used the version with the proposed key, in
    /// memory only (no tracking, nothing written), so reviewers and staff can see the impact before deciding.
    /// </summary>
    public async Task<RegradePreviewDto> Preview(Guid id)
    {
        me.RequireId();
        if (!me.CanReview) throw AppException.Forbidden();
        var r = await db.Set<RegradeRequest>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Regrade");
        if (r.Status != RegradeStatus.Proposed) throw AppException.Conflict("Only pending regrades can be previewed; see the applied results instead.", "regrade_decided");
        var vid = r.QuestionVersionId;
        var version = await db.QuestionVersions.AsNoTracking().FirstAsync(v => v.Id == vid);
        var newKey = Ids(r.NewCorrectOptionIds);
        var attempts = await db.Attempts.AsNoTracking().Include(a => a.Items)
            .Where(a => a.Status != AttemptStatus.InProgress && a.Items.Any(i => i.QuestionVersionId == vid))
            .OrderBy(a => a.SubmittedAt).ToListAsync();
        var results = new List<RegradeResultDto>();
        var failingIds = new List<Guid>();
        foreach (var at in attempts)
        {
            var oldEarned = at.PointsEarned ?? 0; var oldScore = at.ScorePercent ?? 0; var oldPassed = at.Passed == true;
            var earned = at.Items.Sum(i => i.QuestionVersionId == vid
                ? Scoring.Item(version.Type, newKey, Ids(i.SelectedOptionIds), at.ScoringPolicy)
                : i.Points ?? 0);
            var possible = at.PointsPossible ?? at.Items.Count;
            var passed = Scoring.Passed(earned, possible, at.PassPercent);
            results.Add(new RegradeResultDto(at.Id, at.UserId, oldEarned, earned, oldScore, Scoring.DisplayPercent(earned, possible), oldPassed, passed));
            if (oldPassed && !passed) failingIds.Add(at.Id);
        }
        var certs = failingIds.Count == 0 ? 0
            : await db.Certificates.CountAsync(c => failingIds.Contains(c.AttemptId) && c.Status == CertificateStatus.Valid);
        return new RegradePreviewDto(r.Id, results.Count, results.Count(x => x.NewPointsEarned != x.OldPointsEarned),
            results.Count(x => !x.OldPassed && x.NewPassed), failingIds.Count, certs, results);
    }

    public async Task<RegradeDto> Reject(Guid id, RegradeDecisionInput input)
    {
        var uid = me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden("Only staff can decide on regrades.");
        var note = RequireNote(input);
        var r = await db.Set<RegradeRequest>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Regrade");
        if (r.Status != RegradeStatus.Proposed) throw AppException.Conflict("This regrade was already decided.", "regrade_decided");
        r.Status = RegradeStatus.Rejected; r.DecidedBy = uid; r.DecidedAt = DateTime.UtcNow; r.DecisionNote = note;
        audit.Record("regrade.rejected", "RegradeRequest", r.Id, new { note });
        await db.SaveChangesAsync();
        return Dto(r);
    }

    public async Task<RegradeDetailDto> Approve(Guid id, RegradeDecisionInput input)
    {
        var uid = me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden("Only staff can approve regrades.");
        var note = RequireNote(input);
        var pending = await db.Set<RegradeRequest>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Regrade");
        if (pending.ProposedBy == uid) throw AppException.Forbidden("A regrade must be approved by someone other than its proposer.");

        db.ChangeTracker.Clear();
        var newlyPassing = new List<Attempt>();
        var flagged = new List<Guid>();
        var affectedUsers = new HashSet<Guid>();
        await using (var tx = await db.Database.BeginTransactionAsync())
        {
            var claimed = await db.Set<RegradeRequest>().Where(x => x.Id == id && x.Status == RegradeStatus.Proposed)
                .ExecuteUpdateAsync(s => s.SetProperty(x => x.Status, RegradeStatus.Applied));
            if (claimed == 0) { await tx.RollbackAsync(); throw AppException.Conflict("This regrade was already decided.", "regrade_decided"); }
            var r = await db.Set<RegradeRequest>().FirstAsync(x => x.Id == id);

            // 1) Correct the key of the version (old key preserved on the regrade record).
            var newKey = Ids(r.NewCorrectOptionIds).ToHashSet();
            var options = await db.QuestionOptions.Where(o => o.QuestionVersionId == r.QuestionVersionId).ToListAsync();
            foreach (var o in options) o.IsCorrect = newKey.Contains(o.Id);
            await db.SaveChangesAsync();

            // 2) Re-score finished attempts that used the version; answers are never modified.
            var vid = r.QuestionVersionId;
            var attempts = await db.Attempts.Include(a => a.Items)
                .Where(a => a.Status != AttemptStatus.InProgress && a.Items.Any(i => i.QuestionVersionId == vid)).ToListAsync();
            var version = await db.QuestionVersions.AsNoTracking().Include(v => v.Options).FirstAsync(v => v.Id == vid);
            var correct = version.Options.Where(o => o.IsCorrect).Select(o => o.Id).ToList();
            var changed = 0;
            foreach (var at in attempts)
            {
                var oldEarned = at.PointsEarned ?? 0; var oldScore = at.ScorePercent ?? 0; var oldPassed = at.Passed == true;
                foreach (var item in at.Items.Where(i => i.QuestionVersionId == vid))
                    item.Points = Scoring.Item(version.Type, correct, Ids(item.SelectedOptionIds), at.ScoringPolicy);
                var earned = at.Items.Sum(i => i.Points ?? 0);
                var possible = at.PointsPossible ?? at.Items.Count;
                at.PointsEarned = earned;
                at.ScorePercent = Scoring.DisplayPercent(earned, possible);
                at.Passed = Scoring.Passed(earned, possible, at.PassPercent);
                if (earned != oldEarned) changed++;
                affectedUsers.Add(at.UserId);
                db.Set<RegradeResult>().Add(new RegradeResult
                {
                    RegradeId = r.Id, AttemptId = at.Id, UserId = at.UserId, OldPointsEarned = oldEarned, NewPointsEarned = earned,
                    OldScorePercent = oldScore, NewScorePercent = at.ScorePercent ?? 0, OldPassed = oldPassed, NewPassed = at.Passed == true,
                });
                if (!oldPassed && at.Passed == true) newlyPassing.Add(at);
                if (oldPassed && at.Passed != true)
                {
                    var certs = await db.Certificates.Where(c => c.AttemptId == at.Id && c.Status == CertificateStatus.Valid).ToListAsync();
                    foreach (var c in certs)
                    {
                        var flag = new CertificateFlag
                        {
                            CertificateId = c.Id, RegradeId = r.Id,
                            Reason = $"After regrade the evidencing attempt scores {at.ScorePercent:0.##}% (was {oldScore:0.##}%) against a pass mark of {at.PassPercent:0.##}%.",
                        };
                        db.Set<CertificateFlag>().Add(flag);
                        flagged.Add(c.Id);
                        audit.Record("certificate.flagged", "Certificate", c.Id, new { regradeId = r.Id, flagId = flag.Id });
                    }
                }
            }
            r.DecidedBy = uid; r.DecidedAt = DateTime.UtcNow; r.DecisionNote = note;
            r.AffectedAttempts = attempts.Count; r.ChangedAttempts = changed;
            audit.Record("regrade.applied", "RegradeRequest", r.Id, new
            {
                r.QuestionId, r.QuestionVersionId, oldKey = r.OldCorrectOptionIds, newKey = r.NewCorrectOptionIds,
                affected = attempts.Count, changed, newlyPassing = newlyPassing.Count, flagged = flagged.Count,
            });
            await db.SaveChangesAsync();
            await tx.CommitAsync();
        }

        // 3) Certificates for attempts that now pass (idempotent per learner/course).
        var issued = new List<string>();
        foreach (var at in newlyPassing)
        {
            var a = await db.Assessments.AsNoTracking().FirstAsync(x => x.Id == at.AssessmentId);
            if (!a.CountsTowardCertificate) continue;
            if (await certificates.IssueIfEligible(at, a) is { } code) issued.Add(code);
        }
        // 4) Tell every affected learner.
        if (affectedUsers.Count > 0)
            await notifications.Publish(affectedUsers, Engagement.NotificationKinds.Regrade, "A question in one of your assessments was corrected and your result was re-scored", "/me/attempts");
        var final = await db.Set<RegradeRequest>().AsNoTracking().FirstAsync(x => x.Id == id);
        return await Detail(final, issued, flagged);
    }

    // ---------------- Certificate flags ----------------

    public async Task<List<CertificateFlagDto>> Flags(CertificateFlagStatus? status)
    {
        me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        var q = db.Set<CertificateFlag>().AsNoTracking().AsQueryable();
        if (status is not null) q = q.Where(f => f.Status == status);
        return await q.OrderBy(f => f.CreatedAt).Take(500)
            .Join(db.Certificates, f => f.CertificateId, c => c.Id, (f, c) => new CertificateFlagDto(f.Id, f.CertificateId, c.Code, c.UserId, f.RegradeId, f.Reason,
                f.Status, f.DecidedBy, f.DecidedAt, f.DecisionNote, f.CreatedAt))
            .ToListAsync();
    }

    public async Task<CertificateFlagDto> DecideFlag(Guid id, CertificateFlagDecisionInput input)
    {
        var uid = me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        if (input is null || string.IsNullOrWhiteSpace(input.Note) || input.Note.Length > 500) throw AppException.Bad("note is required (max 500 characters).");
        var f = await db.Set<CertificateFlag>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Certificate flag");
        if (f.Status != CertificateFlagStatus.Open) throw AppException.Conflict("This flag was already decided.", "flag_decided");
        var cert = await db.Certificates.AsNoTracking().FirstAsync(c => c.Id == f.CertificateId);
        if (input.Revoke && cert.Status == CertificateStatus.Valid) await certificates.Revoke(cert.Id, input.Note.Trim());
        f.Status = input.Revoke ? CertificateFlagStatus.Revoked : CertificateFlagStatus.Kept;
        f.DecidedBy = uid; f.DecidedAt = DateTime.UtcNow; f.DecisionNote = input.Note.Trim();
        audit.Record("certificate.flag_decided", "CertificateFlag", f.Id, new { f.CertificateId, decision = f.Status.ToString() });
        await db.SaveChangesAsync();
        if (input.Revoke)
            await notifications.Publish([cert.UserId], "certificate", $"Your certificate for {cert.CourseTitle} was revoked after a regrade; you may appeal", "/me/certificates");
        return new CertificateFlagDto(f.Id, f.CertificateId, cert.Code, cert.UserId, f.RegradeId, f.Reason, f.Status, f.DecidedBy, f.DecidedAt, f.DecisionNote, f.CreatedAt);
    }

    private static string RequireNote(RegradeDecisionInput? input)
    {
        var note = input?.Note?.Trim();
        if (string.IsNullOrEmpty(note) || note.Length > 2000) throw AppException.Bad("note is required (max 2000 characters).");
        return note;
    }

    private async Task<RegradeDetailDto> Detail(RegradeRequest r, List<string> issued, List<Guid>? flagged = null)
    {
        var results = await db.Set<RegradeResult>().AsNoTracking().Where(x => x.RegradeId == r.Id).OrderBy(x => x.CreatedAt)
            .Select(x => new RegradeResultDto(x.AttemptId, x.UserId, x.OldPointsEarned, x.NewPointsEarned, x.OldScorePercent, x.NewScorePercent, x.OldPassed, x.NewPassed))
            .ToListAsync();
        flagged ??= await db.Set<CertificateFlag>().AsNoTracking().Where(f => f.RegradeId == r.Id).Select(f => f.CertificateId).ToListAsync();
        return new RegradeDetailDto(Dto(r), results, flagged, issued);
    }

    private static RegradeDto Dto(RegradeRequest r) => new(r.Id, r.QuestionId, r.QuestionVersionId, Ids(r.OldCorrectOptionIds), Ids(r.NewCorrectOptionIds),
        r.Reason, r.ProposedBy, r.ProposedAt, r.Status, r.DecidedBy, r.DecidedAt, r.DecisionNote, r.AffectedAttempts, r.ChangedAttempts);

    private static List<Guid> Ids(string csv) =>
        string.IsNullOrEmpty(csv) ? [] : csv.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(Guid.Parse).ToList();
}

public record OptionStatDto(Guid OptionId, int SortOrder, string Text, bool IsCorrect, int SelectedCount, double? SelectedProportion);
public record ItemAnalyticsDto(Guid QuestionId, string ExternalId, Guid QuestionVersionId, int Version, int N, int MinimumN, bool SufficientData,
    double? Difficulty, double? DifficultyLow, double? DifficultyHigh, double? Discrimination, double? DiscriminationLow, double? DiscriminationHigh,
    List<OptionStatDto> Distractors, int Exposures, int DistinctLearners, string Note);

/// <summary>Item analytics for authors, reviewers and staff (spec §15: shown only with adequate data and uncertainty).</summary>
public class ItemAnalyticsService(AppDbContext db, AccessService access)
{
    public const string Note =
        "Difficulty is the proportion of fully correct responses (Wilson 95% interval); discrimination is the corrected point-biserial " +
        "correlation with the rest of the test (Fisher-z 95% interval). Statistics are withheld below the minimum sample size. " +
        "Only finished attempts with at least two items are analysed.";

    public async Task<ItemAnalyticsDto> ForQuestion(Guid questionId, int? version)
    {
        var q = await db.Questions.AsNoTracking().FirstOrDefaultAsync(x => x.Id == questionId) ?? throw AppException.NotFound("Question");
        await access.RequireCourseAuthorOrStaff(q.CourseId);
        var v = await db.QuestionVersions.AsNoTracking().Include(x => x.Options)
                    .FirstOrDefaultAsync(x => x.QuestionId == questionId && x.Version == (version ?? q.CurrentVersion))
                ?? throw AppException.NotFound("Question version");
        return await Compute(q, v, null);
    }

    public async Task<List<ItemAnalyticsDto>> ForAssessment(Guid assessmentId)
    {
        var a = await db.Assessments.AsNoTracking().FirstOrDefaultAsync(x => x.Id == assessmentId) ?? throw AppException.NotFound("Assessment");
        await access.RequireCourseAuthorOrStaff(a.CourseId);
        var qids = await db.AssessmentQuestions.AsNoTracking().Where(x => x.AssessmentId == assessmentId).OrderBy(x => x.SortOrder).Select(x => x.QuestionId).ToListAsync();
        var questions = await db.Questions.AsNoTracking().Where(x => qids.Contains(x.Id)).ToDictionaryAsync(x => x.Id);
        var result = new List<ItemAnalyticsDto>();
        foreach (var qid in qids)
        {
            var q = questions[qid];
            var v = await db.QuestionVersions.AsNoTracking().Include(x => x.Options).FirstAsync(x => x.QuestionId == qid && x.Version == q.CurrentVersion);
            result.Add(await Compute(q, v, assessmentId));
        }
        return result;
    }

    private async Task<ItemAnalyticsDto> Compute(Question q, QuestionVersion v, Guid? assessmentId)
    {
        var query = from it in db.AttemptItems.AsNoTracking()
                    join at in db.Attempts.AsNoTracking() on it.AttemptId equals at.Id
                    where it.QuestionVersionId == v.Id && at.Status != AttemptStatus.InProgress && it.Points != null && at.PointsPossible > 1
                    select new { it.Points, it.SelectedOptionIds, at.PointsEarned, at.PointsPossible, at.AssessmentId };
        if (assessmentId is { } aid) query = query.Where(x => x.AssessmentId == aid);
        var rows = await query.ToListAsync();
        var responses = rows.Select(r => (Correct: r.Points == 1m,
            RestScore: (double)(((r.PointsEarned ?? 0) - (r.Points ?? 0)) / ((r.PointsPossible ?? 2) - 1)))).ToList();
        var stat = ItemStatistics.Compute(responses);
        var options = v.Options.OrderBy(o => o.SortOrder).Select(o =>
        {
            var count = rows.Count(r => r.SelectedOptionIds.Contains(o.Id.ToString()));
            return new OptionStatDto(o.Id, o.SortOrder, o.Text.Length > 120 ? o.Text[..120] + "…" : o.Text, o.IsCorrect, count,
                stat.SufficientData ? Math.Round((double)count / rows.Count, 4) : null);
        }).ToList();
        var versionIds = await db.QuestionVersions.AsNoTracking().Where(x => x.QuestionId == q.Id).Select(x => x.Id).ToListAsync();
        var attemptExposure = await db.AttemptItems.AsNoTracking().Where(i => versionIds.Contains(i.QuestionVersionId))
            .Join(db.Attempts, i => i.AttemptId, at => at.Id, (i, at) => new { at.UserId, at.AssessmentId }).ToListAsync();
        if (assessmentId is { } aid2) attemptExposure = attemptExposure.Where(x => x.AssessmentId == aid2).ToList();
        var practiceExposure = assessmentId is not null ? [] : await db.Set<PracticeItem>().AsNoTracking().Where(i => i.QuestionId == q.Id)
            .Join(db.Set<PracticeSession>(), i => i.SessionId, s => s.Id, (i, s) => s.UserId).ToListAsync();
        var learners = attemptExposure.Select(x => x.UserId).Concat(practiceExposure).Distinct().Count();
        return new ItemAnalyticsDto(q.Id, q.ExternalId, v.Id, v.Version, stat.N, ItemStatistics.MinN, stat.SufficientData,
            stat.PValue, stat.PValueLow, stat.PValueHigh, stat.Discrimination, stat.DiscriminationLow, stat.DiscriminationHigh,
            options, attemptExposure.Count + practiceExposure.Count, learners, Note);
    }
}
