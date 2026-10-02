using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Questions;

public record CopyQuestionsInput(List<Guid>? SourceQuestionIds, string? ExternalIdPrefix);
public record CopyQuestionsResult(List<QuestionDto> Created);
public record SharedQuestionDto(Guid Id, Guid CourseId, string ExternalId, int Version, QuestionType Type, string Language, string Stem,
    Difficulty Difficulty, string SkillCode, CognitiveLevel? CognitiveLevel, int OptionCount);
public record ReusableInput(bool Reusable);

/// <summary>
/// Question reuse (spec §13/§14): an author copies questions from another course they author, or from the shared bank of
/// questions staff have marked Reusable. A copy is always a brand-new Draft question with provenance
/// (SourceQuestionId/SourceVersion) — never a live link to the source — so it goes through review in the target course.
/// </summary>
public class QuestionReuseService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit, QuestionService questions)
{
    public const int MaxCopy = 50;

    public async Task<CopyQuestionsResult> Copy(Guid targetCourseId, CopyQuestionsInput input)
    {
        var uid = me.RequireId();
        if (!await db.Courses.AnyAsync(c => c.Id == targetCourseId)) throw AppException.NotFound("Course");
        await access.RequireCourseEditor(targetCourseId);
        var ids = (input?.SourceQuestionIds ?? []).Distinct().ToList();
        if (ids.Count is 0 or > MaxCopy) throw AppException.Bad($"sourceQuestionIds must contain 1-{MaxCopy} questions.");
        var prefix = input!.ExternalIdPrefix?.Trim() ?? "";
        if (prefix.Length > 0 && !QuestionRules.ExternalIdRx().IsMatch(prefix)) throw AppException.Bad("externalIdPrefix may only contain letters, digits, '.', '_' or '-'.");

        var sources = await db.Questions.AsNoTracking().Where(q => ids.Contains(q.Id)).ToListAsync();
        if (sources.Count != ids.Count) throw AppException.NotFound("Question");
        var metas = await db.Set<QuestionMeta>().AsNoTracking().Where(m => ids.Contains(m.QuestionId)).ToDictionaryAsync(m => m.QuestionId);
        var errors = new List<string>();
        var authored = new Dictionary<Guid, bool>();
        foreach (var s in sources)
        {
            if (!authored.TryGetValue(s.CourseId, out var isAuthor)) authored[s.CourseId] = isAuthor = me.IsStaff || await access.IsCourseAuthor(s.CourseId);
            var shared = metas.GetValueOrDefault(s.Id)?.Reusable == true && s.State == QuestionState.Active;
            // Unauthorized sources are reported as not found (no disclosure of other courses' banks).
            if (!isAuthor && !shared) throw AppException.NotFound("Question");
            if (s.State == QuestionState.Retired) errors.Add($"Question '{s.ExternalId}' is retired and cannot be copied.");
        }
        var versionKeys = sources.Select(s => new { s.Id, s.CurrentVersion }).ToList();
        var qids = sources.Select(s => s.Id).ToList();
        var versions = (await db.QuestionVersions.AsNoTracking().Include(v => v.Options).Where(v => qids.Contains(v.QuestionId)).ToListAsync())
            .Where(v => versionKeys.Any(k => k.Id == v.QuestionId && k.CurrentVersion == v.Version)).ToDictionary(v => v.QuestionId);
        foreach (var s in sources.Where(s => s.CourseId != targetCourseId))
        {
            var v = versions[s.Id];
            var refs = RichText.ResourceIds(v.Stem).Concat(RichText.ResourceIds(v.Explanation))
                .Concat(v.Options.SelectMany(o => RichText.ResourceIds(o.Text).Concat(RichText.ResourceIds(o.Rationale))));
            if (refs.Any()) errors.Add($"Question '{s.ExternalId}' embeds images of its own course; upload the images to this course and author it here instead.");
        }
        if (errors.Count > 0) throw AppException.Bad(string.Join(" ", errors), "copy_rejected");

        var taken = new HashSet<string>(await db.Questions.AsNoTracking().Where(q => q.CourseId == targetCourseId).Select(q => q.ExternalId).ToListAsync(),
            StringComparer.OrdinalIgnoreCase);
        var created = new List<Question>();
        await using var tx = await db.Database.BeginTransactionAsync();
        foreach (var s in sources.OrderBy(s => ids.IndexOf(s.Id)))
        {
            var v = versions[s.Id];
            var ext = UniqueExternalId(prefix + s.ExternalId, taken);
            taken.Add(ext);
            var q = new Question { CourseId = targetCourseId, ExternalId = ext, CreatedBy = uid, State = QuestionState.Draft, CurrentVersion = 1 };
            var input2 = new QuestionInput(ext, v.Type, v.Language, v.Stem, v.Explanation, v.Difficulty, v.SkillCode, v.CertificationObjective,
                QuestionRules.SplitTags(v.Tags), v.SourceReference, v.AllowShuffle, null, null,
                v.Options.OrderBy(o => o.SortOrder).Select(o => new OptionInput(null, o.Text, o.IsCorrect, o.Rationale)).ToList());
            db.Questions.Add(q);
            db.QuestionVersions.Add(QuestionService.NewVersion(q.Id, 1, input2, uid));
            db.Set<QuestionMeta>().Add(new QuestionMeta
            {
                QuestionId = q.Id, CognitiveLevel = metas.GetValueOrDefault(s.Id)?.CognitiveLevel,
                SourceQuestionId = s.Id, SourceVersion = v.Version, SourceCourseId = s.CourseId,
            });
            audit.Record("question.copied", "Question", q.Id, new { sourceQuestionId = s.Id, sourceVersion = v.Version, sourceCourseId = s.CourseId, targetCourseId });
            created.Add(q);
        }
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        var dtos = new List<QuestionDto>();
        foreach (var q in created) dtos.Add(await questions.Dto(q));
        return new CopyQuestionsResult(dtos);
    }

    private static string UniqueExternalId(string baseId, HashSet<string> taken)
    {
        baseId = baseId.Length > 90 ? baseId[..90] : baseId;
        if (!taken.Contains(baseId)) return baseId;
        for (var i = 1; ; i++)
        {
            var candidate = $"{baseId}-copy{(i == 1 ? "" : i.ToString())}";
            if (!taken.Contains(candidate)) return candidate;
        }
    }

    /// <summary>Staff mark an Active question as reusable (visible in the shared bank to all instructors) or withdraw it.</summary>
    public async Task<QuestionDto> SetReusable(Guid id, bool reusable)
    {
        var uid = me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        var q = await db.Questions.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Question");
        if (reusable && q.State != QuestionState.Active) throw AppException.Conflict("Only Active (reviewed and approved) questions can be shared.", "question_not_active");
        var meta = await db.Set<QuestionMeta>().FirstOrDefaultAsync(m => m.QuestionId == id);
        if (meta is null) { meta = new QuestionMeta { QuestionId = id }; db.Set<QuestionMeta>().Add(meta); }
        if (meta.Reusable != reusable)
        {
            meta.Reusable = reusable; meta.ReusableSetBy = uid; meta.UpdatedAt = DateTime.UtcNow;
            audit.Record(reusable ? "question.marked_reusable" : "question.unmarked_reusable", "Question", id, new { q.CourseId });
            await db.SaveChangesAsync();
        }
        return await questions.Dto(q);
    }

    /// <summary>Shared bank browse for instructors and staff: reusable Active questions (no answer keys).</summary>
    public async Task<Paged<SharedQuestionDto>> Shared(string? q, int page, int pageSize)
    {
        me.RequireId();
        if (!me.IsStaff && !me.IsInRole(Roles.Instructor)) throw AppException.Forbidden();
        page = Math.Max(1, page); pageSize = Math.Clamp(pageSize, 1, 100);
        var query = from m in db.Set<QuestionMeta>().AsNoTracking()
                    join qq in db.Questions.AsNoTracking() on m.QuestionId equals qq.Id
                    join v in db.QuestionVersions.AsNoTracking() on new { Q = qq.Id, V = qq.CurrentVersion } equals new { Q = v.QuestionId, V = v.Version }
                    where m.Reusable && qq.State == QuestionState.Active
                    select new { qq, v, m };
        if (!string.IsNullOrWhiteSpace(q)) { var term = q.Trim(); query = query.Where(x => x.v.Stem.Contains(term) || x.v.SkillCode.Contains(term) || x.v.Tags.Contains(term)); }
        var total = await query.CountAsync();
        var rows = await query.OrderBy(x => x.qq.ExternalId).Skip((page - 1) * pageSize).Take(pageSize)
            .Select(x => new SharedQuestionDto(x.qq.Id, x.qq.CourseId, x.qq.ExternalId, x.v.Version, x.v.Type, x.v.Language, x.v.Stem, x.v.Difficulty,
                x.v.SkillCode, x.m.CognitiveLevel, db.QuestionOptions.Count(o => o.QuestionVersionId == x.v.Id)))
            .ToListAsync();
        return new Paged<SharedQuestionDto>(rows, total, page, pageSize);
    }
}

public record ChallengeInput(string Reason);
public record ResolveChallengeInput(ChallengeResolution Resolution, string Note);
public record ChallengeDto(Guid Id, Guid QuestionId, Guid QuestionVersionId, Guid CourseId, string QuestionExternalId, Guid UserId, string Reason,
    ChallengeStatus Status, ChallengeResolution? Resolution, string? ResolutionNote, Guid? ResolvedBy, DateTime CreatedAt, DateTime? ResolvedAt);
public record MyChallengeDto(Guid Id, Guid QuestionVersionId, string Reason, ChallengeStatus Status, ChallengeResolution? Resolution,
    string? ResolutionNote, DateTime CreatedAt, DateTime? ResolvedAt);

/// <summary>
/// Learner challenges of questions → reviewer queue → resolution (no change / revise / retire) → learner notified.
/// Learner-facing creation is exposed by the Assessment module, which verifies the learner was actually shown the item.
/// </summary>
public class QuestionChallengeService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit,
    Engagement.INotificationService notifications)
{
    public const int MaxOpenPerUser = 20;

    /// <summary>Opens a challenge for a question version the caller was shown (ownership is verified by the caller).</summary>
    public async Task<MyChallengeDto> Open(Guid questionVersionId, string? reason)
    {
        var uid = me.RequireId();
        reason = reason?.Trim();
        if (string.IsNullOrEmpty(reason) || reason.Length < 10 || reason.Length > 2000 || QuestionRules.HasBadChars(reason))
            throw AppException.Bad("reason is required (10-2000 characters).");
        var v = await db.QuestionVersions.AsNoTracking().FirstOrDefaultAsync(x => x.Id == questionVersionId) ?? throw AppException.NotFound("Question");
        var q = await db.Questions.AsNoTracking().FirstAsync(x => x.Id == v.QuestionId);
        var set = db.Set<QuestionChallenge>();
        if (await set.AnyAsync(c => c.UserId == uid && c.QuestionId == q.Id && c.Status == ChallengeStatus.Open))
            throw AppException.Conflict("You already have an open challenge for this question.", "challenge_exists");
        if (await set.CountAsync(c => c.UserId == uid && c.Status == ChallengeStatus.Open) >= MaxOpenPerUser)
            throw AppException.Conflict($"You can have at most {MaxOpenPerUser} open challenges.", "too_many_challenges");
        var c = new QuestionChallenge { QuestionId = q.Id, QuestionVersionId = v.Id, CourseId = q.CourseId, UserId = uid, Reason = reason };
        set.Add(c);
        audit.Record("question.challenged", "QuestionChallenge", c.Id, new { questionId = q.Id, questionVersionId = v.Id });
        await db.SaveChangesAsync();
        return Mine(c);
    }

    public async Task<List<MyChallengeDto>> MyChallenges()
    {
        var uid = me.RequireId();
        var rows = await db.Set<QuestionChallenge>().AsNoTracking().Where(c => c.UserId == uid).OrderByDescending(c => c.CreatedAt).Take(200).ToListAsync();
        return rows.Select(Mine).ToList();
    }

    /// <summary>Reviewer queue (Reviewer role or staff), optionally filtered by status/course.</summary>
    public async Task<List<ChallengeDto>> Queue(ChallengeStatus? status, Guid? courseId)
    {
        me.RequireId();
        if (!me.CanReview) throw AppException.Forbidden();
        return await Query(status, courseId);
    }

    /// <summary>Course authors see the challenges of their own questions.</summary>
    public async Task<List<ChallengeDto>> ForCourse(Guid courseId, ChallengeStatus? status)
    {
        await access.RequireCourseAuthorOrStaff(courseId);
        return await Query(status, courseId);
    }

    private async Task<List<ChallengeDto>> Query(ChallengeStatus? status, Guid? courseId)
    {
        var q = db.Set<QuestionChallenge>().AsNoTracking().AsQueryable();
        if (status is not null) q = q.Where(c => c.Status == status);
        if (courseId is not null) q = q.Where(c => c.CourseId == courseId);
        return await q.OrderBy(c => c.CreatedAt).Take(500)
            .Join(db.Questions, c => c.QuestionId, x => x.Id, (c, x) => new ChallengeDto(c.Id, c.QuestionId, c.QuestionVersionId, c.CourseId, x.ExternalId,
                c.UserId, c.Reason, c.Status, c.Resolution, c.ResolutionNote, c.ResolvedBy, c.CreatedAt, c.ResolvedAt))
            .ToListAsync();
    }

    public async Task<ChallengeDto> Resolve(Guid id, ResolveChallengeInput input)
    {
        var uid = me.RequireId();
        if (!me.CanReview) throw AppException.Forbidden("Only reviewers can resolve question challenges.");
        if (input is null || !Enum.IsDefined(input.Resolution)) throw AppException.Bad("resolution must be NoChange, Revise or Retire.");
        var note = input.Note?.Trim();
        if (string.IsNullOrEmpty(note) || note.Length > 2000 || QuestionRules.HasBadChars(note)) throw AppException.Bad("note is required (max 2000 characters).");
        var c = await db.Set<QuestionChallenge>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Challenge");
        if (c.Status != ChallengeStatus.Open) throw AppException.Conflict("This challenge is already resolved.", "challenge_resolved");
        var q = await db.Questions.FirstAsync(x => x.Id == c.QuestionId);
        if (!me.IsStaff && await access.IsCourseAuthor(q.CourseId))
            throw AppException.Forbidden("Course authors cannot resolve challenges against their own questions.");
        c.Status = ChallengeStatus.Resolved; c.Resolution = input.Resolution; c.ResolutionNote = note; c.ResolvedBy = uid; c.ResolvedAt = DateTime.UtcNow;
        if (input.Resolution == ChallengeResolution.Retire && q.State != QuestionState.Retired)
        {
            var from = q.State;
            q.State = QuestionState.Retired; q.PendingVersion = null; q.PendingState = null; q.UpdatedAt = DateTime.UtcNow;
            audit.Record("question.state_changed", "Question", q.Id, new { from = from.ToString(), to = "Retired", reason = "challenge", challengeId = c.Id });
        }
        audit.Record("question.challenge_resolved", "QuestionChallenge", c.Id, new { resolution = c.Resolution.ToString(), questionId = q.Id });
        await db.SaveChangesAsync();
        var outcome = input.Resolution switch
        {
            ChallengeResolution.NoChange => "reviewed — no change",
            ChallengeResolution.Revise => "accepted — the question will be revised",
            _ => "accepted — the question was retired",
        };
        await notifications.Publish([c.UserId], Engagement.NotificationKinds.QuestionChallenge, $"Your question challenge was {outcome}", "/me/question-challenges");
        if (input.Resolution == ChallengeResolution.Revise)
        {
            var authors = await db.CourseInstructors.AsNoTracking().Where(x => x.CourseId == q.CourseId).Select(x => x.UserId).ToListAsync();
            await notifications.Publish(authors, Engagement.NotificationKinds.QuestionChallenge, $"Question {q.ExternalId} needs revision after a learner challenge", $"/studio/questions/{q.Id}");
        }
        return new ChallengeDto(c.Id, c.QuestionId, c.QuestionVersionId, c.CourseId, q.ExternalId, c.UserId, c.Reason, c.Status, c.Resolution,
            c.ResolutionNote, c.ResolvedBy, c.CreatedAt, c.ResolvedAt);
    }

    private static MyChallengeDto Mine(QuestionChallenge c) =>
        new(c.Id, c.QuestionVersionId, c.Reason, c.Status, c.Resolution, c.ResolutionNote, c.CreatedAt, c.ResolvedAt);
}
