using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Questions;

/// <summary>
/// Question bank: versioned MCQs with a review workflow (Draft → Reviewed → Approved → Active → Retired).
/// Content of a version that is (or was) live, or that learners have answered, is never changed in place.
/// </summary>
public class QuestionService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit)
{
    public async Task<Paged<QuestionDto>> List(Guid courseId, QuestionState? state, string? q, int page, int pageSize)
    {
        await RequireCourse(courseId);
        await access.RequireCourseAuthorOrStaff(courseId);
        page = Math.Max(1, page); pageSize = Math.Clamp(pageSize, 1, 200);
        var query = db.Questions.AsNoTracking().Where(x => x.CourseId == courseId);
        if (state is not null) query = query.Where(x => x.State == state);
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            query = query.Where(x => x.ExternalId.Contains(term) ||
                db.QuestionVersions.Any(v => v.QuestionId == x.Id && v.Version == x.CurrentVersion && v.Stem.Contains(term)));
        }
        var total = await query.CountAsync();
        var items = await query.OrderBy(x => x.ExternalId).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        var ids = items.Select(x => x.Id).ToList();
        var versions = await db.QuestionVersions.AsNoTracking().Include(v => v.Options)
            .Where(v => ids.Contains(v.QuestionId)).ToListAsync();
        var metas = await db.Set<QuestionMeta>().AsNoTracking().Where(m => ids.Contains(m.QuestionId)).ToDictionaryAsync(m => m.QuestionId);
        var dtos = items.Select(x => QuestionRules.ToDto(x, versions.First(v => v.QuestionId == x.Id && v.Version == x.CurrentVersion),
            x.PendingVersion is { } pv ? versions.FirstOrDefault(v => v.QuestionId == x.Id && v.Version == pv) : null)
            with { Meta = QuestionMetaDto.From(metas.GetValueOrDefault(x.Id)) }).ToList();
        return new Paged<QuestionDto>(dtos, total, page, pageSize);
    }

    public async Task<QuestionDetailDto> Get(Guid id)
    {
        var q = await db.Questions.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Question");
        await access.RequireCourseAuthorOrStaff(q.CourseId);
        var versions = await db.QuestionVersions.AsNoTracking().Include(v => v.Options).Where(v => v.QuestionId == id).OrderBy(v => v.Version).ToListAsync();
        var current = versions.First(v => v.Version == q.CurrentVersion);
        var pending = q.PendingVersion is { } pv ? versions.FirstOrDefault(v => v.Version == pv) : null;
        var meta = await db.Set<QuestionMeta>().AsNoTracking().FirstOrDefaultAsync(m => m.QuestionId == id);
        return new QuestionDetailDto(QuestionRules.ToDto(q, current, pending) with { Meta = QuestionMetaDto.From(meta) },
            versions.Select(v => new QuestionVersionSummary(v.Id, v.Version, v.CreatedAt, v.EditedBy, v.ReviewedBy)).ToList());
    }

    public async Task<QuestionDto> Create(Guid courseId, QuestionInput input)
    {
        var uid = me.RequireId();
        await RequireCourse(courseId);
        await access.RequireCourseEditor(courseId);
        await ValidateOrThrow(courseId, input);
        if (await db.Questions.AnyAsync(x => x.CourseId == courseId && x.ExternalId == input.ExternalId))
            throw AppException.Conflict($"A question with externalId '{input.ExternalId}' already exists in this course.", "duplicate_external_id");
        var q = new Question
        {
            CourseId = courseId, ExternalId = input.ExternalId.Trim(), ModuleId = input.ModuleId, LessonId = input.LessonId,
            CreatedBy = uid, State = QuestionState.Draft, CurrentVersion = 1,
        };
        var v = NewVersion(q.Id, 1, input, uid);
        db.Questions.Add(q);
        db.QuestionVersions.Add(v);
        var meta = new QuestionMeta { QuestionId = q.Id };
        ApplyMeta(meta, input);
        db.Set<QuestionMeta>().Add(meta);
        audit.Record("question.created", "Question", q.Id, new { q.ExternalId, courseId });
        await db.SaveChangesAsync();
        return QuestionRules.ToDto(q, v) with { Meta = QuestionMetaDto.From(meta) };
    }

    public async Task<QuestionDto> Update(Guid id, QuestionInput input)
    {
        var uid = me.RequireId();
        var q = await db.Questions.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Question");
        await access.RequireCourseEditor(q.CourseId);
        if (q.State == QuestionState.Retired) throw AppException.Conflict("Retired questions cannot be edited.", "question_retired");
        await ValidateOrThrow(q.CourseId, input);
        if (input.ExternalId != q.ExternalId && await db.Questions.AnyAsync(x => x.CourseId == q.CourseId && x.ExternalId == input.ExternalId && x.Id != id))
            throw AppException.Conflict($"A question with externalId '{input.ExternalId}' already exists in this course.", "duplicate_external_id");

        var previousState = q.State;
        string action;
        if (IsStaged(q))
        {
            // Live (or approved) content keeps being served; the edit is staged as a pending version with its own review.
            var next = await NextVersionNumber(q.Id);
            db.QuestionVersions.Add(NewVersion(q.Id, next, input, uid));
            q.PendingVersion = next; q.PendingState = QuestionState.Draft;
            action = "question.edit_staged";
        }
        else
        {
            var current = await db.QuestionVersions.Include(v => v.Options).FirstAsync(v => v.QuestionId == id && v.Version == q.CurrentVersion);
            var usedInAttempt = await db.AttemptItems.AnyAsync(a => a.QuestionVersionId == current.Id);
            if (!usedInAttempt)
            {
                ApplyContent(current, input);
                current.EditedBy = uid; current.ReviewedBy = null;
                var keep = new HashSet<Guid>();
                var order = 0;
                foreach (var o in input.Options)
                {
                    var existing = o.Id is { } oid ? current.Options.FirstOrDefault(x => x.Id == oid) : null;
                    if (existing is null)
                    {
                        existing = new QuestionOption { QuestionVersionId = current.Id };
                        db.QuestionOptions.Add(existing);
                    }
                    existing.SortOrder = order++; existing.Text = RichText.Normalize(o.Text).Trim(); existing.IsCorrect = o.IsCorrect; existing.Rationale = RichText.Normalize(o.Rationale).Trim();
                    keep.Add(existing.Id);
                }
                db.QuestionOptions.RemoveRange(current.Options.Where(x => !keep.Contains(x.Id)).ToList());
                action = "question.edited";
            }
            else
            {
                var next = await NextVersionNumber(q.Id);
                db.QuestionVersions.Add(NewVersion(q.Id, next, input, uid));
                q.CurrentVersion = next;
                action = "question.versioned";
            }
            // Changed content must be reviewed again before it can be served.
            q.State = QuestionState.Draft; q.ReviewedBy = null;
        }
        q.ExternalId = input.ExternalId.Trim();
        q.ModuleId = input.ModuleId; q.LessonId = input.LessonId;
        q.UpdatedAt = DateTime.UtcNow;
        var meta = await db.Set<QuestionMeta>().FirstOrDefaultAsync(m => m.QuestionId == q.Id);
        if (meta is null) { meta = new QuestionMeta { QuestionId = q.Id }; db.Set<QuestionMeta>().Add(meta); }
        ApplyMeta(meta, input);
        audit.Record(action, "Question", q.Id,
            new { version = q.CurrentVersion, pendingVersion = q.PendingVersion, previousState = previousState.ToString() });
        await db.SaveChangesAsync();
        return await Dto(q);
    }

    /// <summary>Active/Approved questions (or ones already carrying a staged edit) stage further edits instead of changing served content.</summary>
    internal static bool IsStaged(Question q) => q.PendingVersion is not null || q.State is QuestionState.Active or QuestionState.Approved;

    private async Task<int> NextVersionNumber(Guid questionId) =>
        (await db.QuestionVersions.Where(v => v.QuestionId == questionId).MaxAsync(v => (int?)v.Version) ?? 0) + 1;

    internal async Task<QuestionDto> Dto(Question q)
    {
        var versions = await db.QuestionVersions.AsNoTracking().Include(v => v.Options)
            .Where(v => v.QuestionId == q.Id && (v.Version == q.CurrentVersion || v.Version == q.PendingVersion)).ToListAsync();
        var meta = await db.Set<QuestionMeta>().AsNoTracking().FirstOrDefaultAsync(m => m.QuestionId == q.Id);
        return QuestionRules.ToDto(q, versions.First(v => v.Version == q.CurrentVersion),
            q.PendingVersion is { } pv ? versions.FirstOrDefault(v => v.Version == pv) : null) with { Meta = QuestionMetaDto.From(meta) };
    }

    internal static void ApplyMeta(QuestionMeta meta, QuestionInput input)
    {
        meta.CognitiveLevel = input.CognitiveLevel;
        meta.CaseGroupId = input.CaseGroupId;
        meta.CaseGroupOrder = input.CaseGroupId is null ? 0 : input.CaseGroupOrder ?? 0;
        meta.UpdatedAt = DateTime.UtcNow;
    }

    private static readonly Dictionary<QuestionState, QuestionState[]> Allowed = new()
    {
        [QuestionState.Draft] = [QuestionState.Reviewed, QuestionState.Retired],
        [QuestionState.Reviewed] = [QuestionState.Approved, QuestionState.Draft, QuestionState.Retired],
        [QuestionState.Approved] = [QuestionState.Active, QuestionState.Draft, QuestionState.Retired],
        [QuestionState.Active] = [QuestionState.Retired],
        [QuestionState.Retired] = [],
    };

    public async Task<QuestionDto> ChangeState(Guid id, QuestionState target)
    {
        var uid = me.RequireId();
        var q = await db.Questions.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Question");
        await access.RequireCourseAuthorOrStaff(q.CourseId);
        // A staged edit moves through its own review; Retire always applies to the whole question (and discards the staged edit).
        var onPending = q.PendingVersion is not null && target != QuestionState.Retired;
        var fromState = onPending ? q.PendingState ?? QuestionState.Draft : q.State;
        var allowed = onPending ? PendingAllowed : Allowed;
        if (!allowed.TryGetValue(fromState, out var targets) || !targets.Contains(target))
            throw AppException.Conflict($"Cannot move {(onPending ? "the pending version" : "a question")} from {fromState} to {target}.", "invalid_transition");
        var versionNo = onPending ? q.PendingVersion!.Value : q.CurrentVersion;
        var version = await db.QuestionVersions.FirstAsync(v => v.QuestionId == id && v.Version == versionNo);

        if (target is QuestionState.Reviewed or QuestionState.Approved or QuestionState.Active)
        {
            if (!me.CanReview) throw AppException.Forbidden("Only reviewers can review, approve or activate questions.");
            if (q.CreatedBy == uid) throw AppException.Forbidden("You cannot review or approve a question you created.");
            if (version.EditedBy == uid) throw AppException.Forbidden("You cannot review or approve a version you edited.");
            if (!me.IsStaff && await access.IsCourseAuthor(q.CourseId))
                throw AppException.Forbidden("Course authors cannot review, approve or activate questions in their own course.");
            if (target == QuestionState.Approved && version.ReviewedBy == uid)
                throw AppException.Forbidden("Approval must be given by a different person than the reviewer.");
            if (target == QuestionState.Reviewed) { version.ReviewedBy = uid; if (!onPending) q.ReviewedBy = uid; }
        }
        else if (!me.CanReview && !await access.IsCourseAuthor(q.CourseId))
            throw AppException.Forbidden();
        if (target == QuestionState.Draft) { version.ReviewedBy = null; if (!onPending) q.ReviewedBy = null; }

        if (onPending)
        {
            if (target == QuestionState.Active)
            {
                q.CurrentVersion = versionNo; q.PendingVersion = null; q.PendingState = null;
                q.State = QuestionState.Active; q.ReviewedBy = version.ReviewedBy;
            }
            else q.PendingState = target;
        }
        else
        {
            q.State = target;
            if (target == QuestionState.Retired) { q.PendingVersion = null; q.PendingState = null; }
        }
        q.UpdatedAt = DateTime.UtcNow;
        audit.Record("question.state_changed", "Question", q.Id,
            new { from = fromState.ToString(), to = target.ToString(), version = versionNo, pending = onPending });
        await db.SaveChangesAsync();
        return await Dto(q);
    }

    private static readonly Dictionary<QuestionState, QuestionState[]> PendingAllowed = new()
    {
        [QuestionState.Draft] = [QuestionState.Reviewed],
        [QuestionState.Reviewed] = [QuestionState.Approved, QuestionState.Draft],
        [QuestionState.Approved] = [QuestionState.Active, QuestionState.Draft],
    };

    internal static QuestionVersion NewVersion(Guid questionId, int version, QuestionInput input, Guid editedBy)
    {
        var v = new QuestionVersion { QuestionId = questionId, Version = version, EditedBy = editedBy };
        ApplyContent(v, input);
        v.Options = input.Options.Select((o, i) => new QuestionOption
        {
            QuestionVersionId = v.Id, SortOrder = i, Text = RichText.Normalize(o.Text).Trim(), IsCorrect = o.IsCorrect, Rationale = RichText.Normalize(o.Rationale).Trim(),
        }).ToList();
        return v;
    }

    private static void ApplyContent(QuestionVersion v, QuestionInput i)
    {
        v.Type = i.Type; v.Language = i.Language; v.Stem = RichText.Normalize(i.Stem).Trim(); v.Explanation = RichText.Normalize(i.Explanation).Trim(); v.Difficulty = i.Difficulty;
        v.SkillCode = i.SkillCode?.Trim() ?? ""; v.CertificationObjective = i.CertificationObjective?.Trim() ?? "";
        v.Tags = string.Join(';', QuestionRules.NormalizeTags(i.Tags)); v.SourceReference = i.SourceReference?.Trim() ?? "";
        v.AllowShuffle = i.AllowShuffle;
    }

    private async Task ValidateOrThrow(Guid courseId, QuestionInput input)
    {
        if (input is null) throw AppException.Bad("Request body is required.");
        var errors = QuestionRules.Validate(input with { Options = input.Options ?? [] });
        if (input.ModuleId is { } mid && !await db.Modules.AnyAsync(m => m.Id == mid && m.CourseId == courseId))
            errors.Add("moduleId does not belong to this course.");
        if (input.LessonId is { } lid)
        {
            var lesson = await db.Lessons.Where(l => l.Id == lid).Join(db.Modules, l => l.ModuleId, m => m.Id, (l, m) => new { l.ModuleId, m.CourseId }).FirstOrDefaultAsync();
            if (lesson is null || lesson.CourseId != courseId) errors.Add("lessonId does not belong to this course.");
            else if (input.ModuleId is { } m2 && lesson.ModuleId != m2) errors.Add("lessonId does not belong to moduleId.");
        }
        if (errors.Count == 0) errors.AddRange(await QuestionAssets.Check(db, courseId, QuestionRules.ResourceIds(input), input.CaseGroupId));
        if (errors.Count > 0) throw AppException.Bad(string.Join(" ", errors), "validation_failed");
    }

    private async Task RequireCourse(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
    }
}
