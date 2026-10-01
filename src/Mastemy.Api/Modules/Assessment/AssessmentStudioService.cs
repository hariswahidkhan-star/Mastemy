using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using AssessmentEntity = Mastemy.Api.Domain.Assessment;

namespace Mastemy.Api.Modules.Assessment;

public class AssessmentStudioService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit)
{
    public async Task<List<AssessmentDto>> List(Guid courseId)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        var list = await db.Assessments.AsNoTracking().Include(a => a.Questions).Where(a => a.CourseId == courseId).OrderBy(a => a.Title).ToListAsync();
        var result = new List<AssessmentDto>();
        foreach (var a in list) result.Add(await ToDto(a));
        return result;
    }

    public async Task<AssessmentDto> Get(Guid id)
    {
        var a = await db.Assessments.AsNoTracking().Include(x => x.Questions).FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Assessment");
        await access.RequireCourseAuthorOrStaff(a.CourseId);
        return await ToDto(a);
    }

    public async Task<AssessmentDto> Create(Guid courseId, AssessmentInput input)
    {
        me.RequireId();
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseEditor(courseId);
        await Validate(courseId, input);
        var a = new AssessmentEntity { CourseId = courseId };
        Apply(a, input);
        db.Assessments.Add(a);
        audit.Record("assessment.created", "Assessment", a.Id, new { courseId, a.Title });
        await db.SaveChangesAsync();
        return await Get(a.Id);
    }

    public async Task<AssessmentDto> Update(Guid id, AssessmentInput input)
    {
        me.RequireId();
        var a = await db.Assessments.Include(x => x.Questions).FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Assessment");
        await access.RequireCourseEditor(a.CourseId);
        await Validate(a.CourseId, input);
        Apply(a, input, setQuestions: false);
        var ids = input.QuestionIds!;
        db.AssessmentQuestions.RemoveRange(a.Questions.Where(q => !ids.Contains(q.QuestionId)).ToList());
        for (var idx = 0; idx < ids.Count; idx++)
        {
            var link = a.Questions.FirstOrDefault(q => q.QuestionId == ids[idx]);
            if (link is null) db.AssessmentQuestions.Add(new AssessmentQuestion { AssessmentId = a.Id, QuestionId = ids[idx], SortOrder = idx });
            else link.SortOrder = idx;
        }
        audit.Record("assessment.updated", "Assessment", a.Id, new { a.Title, questions = ids.Count });
        await db.SaveChangesAsync();
        db.ChangeTracker.Clear();
        return await Get(a.Id);
    }

    public async Task Delete(Guid id)
    {
        me.RequireId();
        var a = await db.Assessments.Include(x => x.Questions).FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Assessment");
        await access.RequireCourseEditor(a.CourseId);
        if (await db.Attempts.AnyAsync(x => x.AssessmentId == id))
            throw AppException.Conflict("This assessment has learner attempts and cannot be deleted; results must be retained.", "assessment_has_attempts");
        db.AssessmentQuestions.RemoveRange(a.Questions);
        db.Assessments.Remove(a);
        audit.Record("assessment.deleted", "Assessment", id, new { a.Title });
        await db.SaveChangesAsync();
    }

    private static void Apply(AssessmentEntity a, AssessmentInput i, bool setQuestions = true)
    {
        a.Title = i.Title.Trim(); a.Kind = i.Kind; a.Mode = i.Mode; a.TimeLimitMinutes = i.TimeLimitMinutes; a.MaxAttempts = i.MaxAttempts;
        a.PassPercent = i.PassPercent; a.MultiSelectScoring = i.MultiSelectScoring; a.QuestionCount = i.QuestionCount;
        a.ShuffleQuestions = i.ShuffleQuestions ?? true; a.ShuffleOptions = i.ShuffleOptions ?? true;
        a.IsPremium = i.IsPremium; a.CountsTowardCertificate = i.CountsTowardCertificate; a.ModuleId = i.ModuleId; a.LessonId = i.LessonId;
        if (setQuestions) a.Questions = (i.QuestionIds ?? []).Select((q, idx) => new AssessmentQuestion { AssessmentId = a.Id, QuestionId = q, SortOrder = idx }).ToList();
    }

    private async Task Validate(Guid courseId, AssessmentInput? i)
    {
        if (i is null) throw AppException.Bad("Request body is required.");
        var e = new List<string>();
        if (string.IsNullOrWhiteSpace(i.Title) || i.Title.Length > 200) e.Add("title is required (max 200 characters).");
        if (!Enum.IsDefined(i.Kind)) e.Add("kind is invalid.");
        if (!Enum.IsDefined(i.Mode)) e.Add("mode must be Practice or Exam.");
        if (!Enum.IsDefined(i.MultiSelectScoring)) e.Add("multiSelectScoring must be AllOrNothing or PartialCredit.");
        if (i.TimeLimitMinutes is < 1 or > 600) e.Add("timeLimitMinutes must be between 1 and 600.");
        if (i.MaxAttempts is < 1 or > 100) e.Add("maxAttempts must be between 1 and 100.");
        if (i.PassPercent is < 0 or > 100) e.Add("passPercent must be between 0 and 100.");
        if (i.QuestionCount is < 0 or > 500) e.Add("questionCount must be between 0 (all) and 500.");
        if (i.CountsTowardCertificate && i.Mode != AssessmentMode.Exam)
            e.Add("Only Exam-mode assessments can count toward a certificate (Practice mode reveals answers during the attempt).");
        var ids = i.QuestionIds ?? [];
        if (ids.Count == 0) e.Add("questionIds must contain at least one question.");
        if (ids.Distinct().Count() != ids.Count) e.Add("questionIds contains duplicates.");
        if (ids.Count > 0 && await db.Questions.CountAsync(q => ids.Contains(q.Id) && q.CourseId == courseId) != ids.Distinct().Count())
            e.Add("Every question must belong to this course.");
        if (i.ModuleId is { } mid && !await db.Modules.AnyAsync(m => m.Id == mid && m.CourseId == courseId)) e.Add("moduleId does not belong to this course.");
        if (i.LessonId is { } lid && !await db.Lessons.Where(l => l.Id == lid).Join(db.Modules, l => l.ModuleId, m => m.Id, (l, m) => m.CourseId).AnyAsync(c => c == courseId))
            e.Add("lessonId does not belong to this course.");
        if (e.Count > 0) throw AppException.Bad(string.Join(" ", e), "validation_failed");
    }

    private async Task<AssessmentDto> ToDto(AssessmentEntity a)
    {
        var qids = a.Questions.OrderBy(q => q.SortOrder).Select(q => q.QuestionId).ToList();
        var active = await db.Questions.CountAsync(q => qids.Contains(q.Id) && q.State == QuestionState.Active);
        var attempts = await db.Attempts.CountAsync(x => x.AssessmentId == a.Id);
        return new AssessmentDto(a.Id, a.CourseId, a.ModuleId, a.LessonId, a.Title, a.Kind, a.Mode, a.TimeLimitMinutes, a.MaxAttempts,
            a.PassPercent, a.MultiSelectScoring, a.QuestionCount, a.ShuffleQuestions, a.ShuffleOptions, a.IsPremium,
            a.CountsTowardCertificate, qids, active, attempts);
    }
}
