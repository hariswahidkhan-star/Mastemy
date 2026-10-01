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
        var dtos = items.Select(x => QuestionRules.ToDto(x, versions.First(v => v.QuestionId == x.Id && v.Version == x.CurrentVersion))).ToList();
        return new Paged<QuestionDto>(dtos, total, page, pageSize);
    }

    public async Task<QuestionDetailDto> Get(Guid id)
    {
        var q = await db.Questions.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Question");
        await access.RequireCourseAuthorOrStaff(q.CourseId);
        var versions = await db.QuestionVersions.AsNoTracking().Include(v => v.Options).Where(v => v.QuestionId == id).OrderBy(v => v.Version).ToListAsync();
        var current = versions.First(v => v.Version == q.CurrentVersion);
        return new QuestionDetailDto(QuestionRules.ToDto(q, current), versions.Select(v => new QuestionVersionSummary(v.Id, v.Version, v.CreatedAt)).ToList());
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
        var v = NewVersion(q.Id, 1, input);
        db.Questions.Add(q);
        db.QuestionVersions.Add(v);
        audit.Record("question.created", "Question", q.Id, new { q.ExternalId, courseId });
        await db.SaveChangesAsync();
        return QuestionRules.ToDto(q, v);
    }

    public async Task<QuestionDto> Update(Guid id, QuestionInput input)
    {
        me.RequireId();
        var q = await db.Questions.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Question");
        await access.RequireCourseEditor(q.CourseId);
        if (q.State == QuestionState.Retired) throw AppException.Conflict("Retired questions cannot be edited.", "question_retired");
        await ValidateOrThrow(q.CourseId, input);
        if (input.ExternalId != q.ExternalId && await db.Questions.AnyAsync(x => x.CourseId == q.CourseId && x.ExternalId == input.ExternalId && x.Id != id))
            throw AppException.Conflict($"A question with externalId '{input.ExternalId}' already exists in this course.", "duplicate_external_id");

        var current = await db.QuestionVersions.Include(v => v.Options).FirstAsync(v => v.QuestionId == id && v.Version == q.CurrentVersion);
        var usedInAttempt = await db.AttemptItems.AnyAsync(a => a.QuestionVersionId == current.Id);
        var inPlace = q.State is QuestionState.Draft or QuestionState.Reviewed && !usedInAttempt;
        var previousState = q.State;
        QuestionVersion result;
        if (inPlace)
        {
            ApplyContent(current, input);
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
                existing.SortOrder = order++; existing.Text = o.Text.Trim(); existing.IsCorrect = o.IsCorrect; existing.Rationale = o.Rationale.Trim();
                keep.Add(existing.Id);
            }
            db.QuestionOptions.RemoveRange(current.Options.Where(x => !keep.Contains(x.Id)).ToList());
            result = current;
        }
        else
        {
            result = NewVersion(q.Id, q.CurrentVersion + 1, input);
            db.QuestionVersions.Add(result);
            q.CurrentVersion = result.Version;
        }
        q.ExternalId = input.ExternalId.Trim();
        q.ModuleId = input.ModuleId; q.LessonId = input.LessonId;
        // Changed content must be reviewed again before it can be served.
        q.State = QuestionState.Draft; q.ReviewedBy = null;
        q.UpdatedAt = DateTime.UtcNow;
        audit.Record(inPlace ? "question.edited" : "question.versioned", "Question", q.Id,
            new { version = q.CurrentVersion, previousState = previousState.ToString() });
        await db.SaveChangesAsync();
        var saved = await db.QuestionVersions.AsNoTracking().Include(v => v.Options).FirstAsync(v => v.Id == result.Id);
        return QuestionRules.ToDto(q, saved);
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
        if (!Allowed[q.State].Contains(target))
            throw AppException.Conflict($"Cannot move a question from {q.State} to {target}.", "invalid_transition");
        if (target is QuestionState.Reviewed or QuestionState.Approved or QuestionState.Active)
        {
            if (!me.CanReview) throw AppException.Forbidden("Only reviewers can review, approve or activate questions.");
            if (q.CreatedBy == uid) throw AppException.Forbidden("You cannot review or approve a question you created.");
            q.ReviewedBy = uid;
        }
        else if (!me.CanReview && !await access.IsCourseAuthor(q.CourseId))
            throw AppException.Forbidden();
        if (target == QuestionState.Draft) q.ReviewedBy = null;
        var from = q.State;
        q.State = target; q.UpdatedAt = DateTime.UtcNow;
        audit.Record("question.state_changed", "Question", q.Id, new { from = from.ToString(), to = target.ToString(), version = q.CurrentVersion });
        await db.SaveChangesAsync();
        var v = await db.QuestionVersions.AsNoTracking().Include(x => x.Options).FirstAsync(x => x.QuestionId == id && x.Version == q.CurrentVersion);
        return QuestionRules.ToDto(q, v);
    }

    internal static QuestionVersion NewVersion(Guid questionId, int version, QuestionInput input)
    {
        var v = new QuestionVersion { QuestionId = questionId, Version = version };
        ApplyContent(v, input);
        v.Options = input.Options.Select((o, i) => new QuestionOption
        {
            QuestionVersionId = v.Id, SortOrder = i, Text = o.Text.Trim(), IsCorrect = o.IsCorrect, Rationale = o.Rationale.Trim(),
        }).ToList();
        return v;
    }

    private static void ApplyContent(QuestionVersion v, QuestionInput i)
    {
        v.Type = i.Type; v.Language = i.Language; v.Stem = i.Stem.Trim(); v.Explanation = i.Explanation.Trim(); v.Difficulty = i.Difficulty;
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
        if (errors.Count > 0) throw AppException.Bad(string.Join(" ", errors), "validation_failed");
    }

    private async Task RequireCourse(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
    }
}
