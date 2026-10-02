using System.Linq.Expressions;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Taxonomy;

public class TaxonomyOptions
{
    /// <summary>A certification whose LastCheckedAt is older than this is stale: hidden publicly and queued for re-check.</summary>
    public int CertificationFreshDays { get; set; } = 180;
    /// <summary>Category slug whose courses (incl. sub-categories) form the homepage "AI Skills" row.</summary>
    public string AiAcademySlug { get; set; } = "ai-academy";
    public bool DailyJobEnabled { get; set; } = true;
    public double DailyJobIntervalHours { get; set; } = 24;
    public int BestsellerWindowDays { get; set; } = 30;
    public int BestsellerMinBuyers { get; set; } = 10;
    /// <summary>Optional path to docs/course-roadmap.md used by the import endpoint when no markdown is posted.</summary>
    public string? RoadmapPath { get; set; }
}

/// <summary>
/// Certification-preparation directory (spec §7). Reviewers/staff curate issuers, certifications and blueprint objectives;
/// every privileged change is audited. Public reads show only fresh, independently verified entries in a public state.
/// </summary>
public partial class CertificationService(AppDbContext db, ICurrentUser me, AuditService audit, AccessService access,
    CatalogQueryService catalog, Microsoft.Extensions.Options.IOptions<TaxonomyOptions> options)
{
    private readonly TaxonomyOptions _o = options.Value;
    public static readonly CertificationState[] PublicStates = [CertificationState.Verified, CertificationState.PublishedPreparation, CertificationState.InformationOnly];
    private static readonly CertificationState[] VerifiedStates = [.. PublicStates, CertificationState.InProduction];

    [GeneratedRegex("[^a-z0-9]+")] private static partial Regex NonSlug();
    public static string Slugify(string s) => NonSlug().Replace(s.ToLowerInvariant(), "-").Trim('-') is { Length: > 0 } x ? (x.Length > 150 ? x[..150].Trim('-') : x) : "item";

    public DateTime FreshCutoff(DateTime nowUtc) => nowUtc.AddDays(-_o.CertificationFreshDays);

    /// <summary>SQL-translatable "visible in the public directory" predicate.</summary>
    public static Expression<Func<Certification, bool>> PublicExpr(DateTime cutoff) => c =>
        (c.State == CertificationState.Verified || c.State == CertificationState.PublishedPreparation || c.State == CertificationState.InformationOnly)
        && c.ReviewerId != null && c.LastCheckedAt != null && c.LastCheckedAt >= cutoff;

    public IQueryable<Certification> PublicCertifications() =>
        db.Set<Certification>().AsNoTracking().Where(PublicExpr(FreshCutoff(DateTime.UtcNow)));

    // ---------- Issuers ----------
    public Task<List<IssuerDto>> Issuers() =>
        db.Set<CertificationIssuer>().AsNoTracking().OrderBy(i => i.Name).Select(i => new IssuerDto(i.Id, i.Name, i.WebsiteUrl, i.Country)).ToListAsync();

    public async Task<IssuerDto> UpsertIssuer(Guid? id, IssuerUpsertRequest req)
    {
        var name = (req.Name ?? "").Trim();
        if (name.Length is 0 or > 200) throw AppException.Bad("Issuer name is required (max 200).");
        var url = string.IsNullOrWhiteSpace(req.WebsiteUrl) ? null : RequireHttps(req.WebsiteUrl, "WebsiteUrl");
        CertificationIssuer i;
        if (id is { } gid) i = await db.Set<CertificationIssuer>().FirstOrDefaultAsync(x => x.Id == gid) ?? throw AppException.NotFound("Issuer");
        else { i = new CertificationIssuer(); db.Set<CertificationIssuer>().Add(i); }
        if (await db.Set<CertificationIssuer>().AnyAsync(x => x.Name == name && x.Id != i.Id)) throw AppException.Conflict("Issuer name already exists.");
        i.Name = name; i.WebsiteUrl = url; i.Country = Trunc(req.Country, 100); i.UpdatedAt = DateTime.UtcNow;
        audit.Record(id is null ? "cert_issuer.created" : "cert_issuer.updated", "CertificationIssuer", i.Id, new { i.Name });
        await db.SaveChangesAsync();
        return new IssuerDto(i.Id, i.Name, i.WebsiteUrl, i.Country);
    }

    // ---------- Certifications (admin) ----------
    public async Task<List<CertificationAdminDto>> AdminList(CertificationState? state, bool? staleOnly)
    {
        var q = db.Set<Certification>().AsNoTracking();
        if (state is { } s) q = q.Where(c => c.State == s);
        if (staleOnly == true)
        {
            var cutoff = FreshCutoff(DateTime.UtcNow);
            q = q.Where(c => c.State != CertificationState.Retired && c.State != CertificationState.ResearchCandidate
                             && (c.LastCheckedAt == null || c.LastCheckedAt < cutoff || c.ReviewerId == null));
        }
        var list = await q.OrderBy(c => c.Title).ToListAsync();
        return await ToAdminDtos(list);
    }

    public async Task<CertificationAdminDto> AdminGet(Guid id)
    {
        var c = await db.Set<Certification>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Certification");
        return (await ToAdminDtos([c]))[0];
    }

    private async Task<List<CertificationAdminDto>> ToAdminDtos(List<Certification> list)
    {
        var ids = list.Select(c => c.Id).ToList();
        var issuerIds = list.Select(c => c.IssuerId).Distinct().ToList();
        var issuers = await db.Set<CertificationIssuer>().AsNoTracking().Where(i => issuerIds.Contains(i.Id)).ToDictionaryAsync(i => i.Id, i => i.Name);
        var objectives = await db.Set<CertificationObjective>().AsNoTracking().Where(o => ids.Contains(o.CertificationId)).ToListAsync();
        var now = DateTime.UtcNow;
        var cutoff = FreshCutoff(now);
        var isPublic = PublicExpr(cutoff).Compile();
        return list.Select(c => new CertificationAdminDto(c.Id, c.IssuerId, issuers.GetValueOrDefault(c.IssuerId, ""), c.Slug, c.Title, c.Jurisdiction,
            c.ExamCode, c.LevelOrPart, c.Version, c.EffectiveFrom, c.EffectiveTo, c.Prerequisites, c.OfficialSourceUrl, c.LastCheckedAt,
            c.EvidenceNotes, c.RenewalInfo, c.RightsNotes, c.Kind, c.State, c.HasNonMcqTasks, c.NonMcqDisclosure, c.ReplacedById,
            c.ReviewerId, c.VerifiedAt, c.LastEditedBy, c.StaleFlaggedAt, c.LastCheckedAt is null || c.LastCheckedAt < cutoff, isPublic(c), c.UpdatedAt,
            Objectives(objectives.Where(o => o.CertificationId == c.Id)))).ToList();
    }

    private static List<ObjectiveDto> Objectives(IEnumerable<CertificationObjective> os) =>
        os.OrderBy(o => o.SortOrder).ThenBy(o => o.Code).Select(o => new ObjectiveDto(o.Id, o.Code, o.Title, o.WeightPercent, o.SortOrder)).ToList();

    public async Task<CertificationAdminDto> Create(CertificationUpsertRequest req)
    {
        var c = new Certification();
        await Apply(c, req);
        c.LastEditedBy = me.RequireId();
        db.Set<Certification>().Add(c);
        audit.Record("certification.created", "Certification", c.Id, new { c.Title, c.Slug, c.Kind });
        await db.SaveChangesAsync();
        return await AdminGet(c.Id);
    }

    /// <summary>Any edit clears the verification (ReviewerId) so the entry leaves the public directory until re-verified by someone else.</summary>
    public async Task<CertificationAdminDto> Update(Guid id, CertificationUpsertRequest req)
    {
        var c = await db.Set<Certification>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Certification");
        var wasVerifiedBy = c.ReviewerId;
        await Apply(c, req);
        MarkEdited(c);
        audit.Record("certification.updated", "Certification", c.Id, new { c.Title, c.State, verificationCleared = wasVerifiedBy is not null });
        await db.SaveChangesAsync();
        return await AdminGet(c.Id);
    }

    private void MarkEdited(Certification c)
    {
        c.LastEditedBy = me.RequireId(); c.ReviewerId = null; c.VerifiedAt = null; c.UpdatedAt = DateTime.UtcNow;
    }

    private async Task Apply(Certification c, CertificationUpsertRequest req)
    {
        if (!await db.Set<CertificationIssuer>().AnyAsync(i => i.Id == req.IssuerId)) throw AppException.Bad("Unknown issuer.");
        var title = (req.Title ?? "").Trim();
        if (title.Length is 0 or > 250) throw AppException.Bad("Title is required (max 250).");
        if (!Enum.IsDefined(req.Kind)) throw AppException.Bad("Invalid kind.");
        var slug = Slugify(string.IsNullOrWhiteSpace(req.Slug) ? title + " " + (req.ExamCode ?? "") : req.Slug);
        if (await db.Set<Certification>().AnyAsync(x => x.Slug == slug && x.Id != c.Id)) throw AppException.Conflict("Slug already in use.", "duplicate_slug");
        if (req.EffectiveFrom is { } f && req.EffectiveTo is { } t && t < f) throw AppException.Bad("EffectiveTo must be after EffectiveFrom.");
        if (req.LastCheckedAt is { } lc && lc > DateTime.UtcNow.AddDays(1)) throw AppException.Bad("LastCheckedAt cannot be in the future.");
        if (req.ReplacedById is { } rid)
        {
            if (rid == c.Id || !await db.Set<Certification>().AnyAsync(x => x.Id == rid)) throw AppException.Bad("Invalid ReplacedById.");
        }
        c.IssuerId = req.IssuerId; c.Title = title; c.Slug = slug;
        c.Jurisdiction = Trunc(req.Jurisdiction, 100); c.ExamCode = Trunc(req.ExamCode, 64); c.LevelOrPart = Trunc(req.LevelOrPart, 100);
        c.Version = Trunc(req.Version, 64); c.EffectiveFrom = req.EffectiveFrom; c.EffectiveTo = req.EffectiveTo;
        c.Prerequisites = Trunc(req.Prerequisites, 20000);
        c.OfficialSourceUrl = string.IsNullOrWhiteSpace(req.OfficialSourceUrl) ? "" : RequireHttps(req.OfficialSourceUrl, "OfficialSourceUrl");
        c.LastCheckedAt = req.LastCheckedAt; c.EvidenceNotes = Trunc(req.EvidenceNotes, 20000); c.RenewalInfo = Trunc(req.RenewalInfo, 20000);
        c.RightsNotes = Trunc(req.RightsNotes, 20000); c.Kind = req.Kind; c.HasNonMcqTasks = req.HasNonMcqTasks ?? false;
        c.NonMcqDisclosure = Trunc(req.NonMcqDisclosure, 5000); c.ReplacedById = req.ReplacedById; c.UpdatedAt = DateTime.UtcNow;
    }

    public async Task<CertificationAdminDto> ChangeState(Guid id, CertificationStateRequest req)
    {
        var c = await db.Set<Certification>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Certification");
        var uid = me.RequireId();
        if (!Enum.IsDefined(req.State)) throw AppException.Bad("Invalid state.");
        var from = c.State;
        if (from == CertificationState.Retired && req.State is not (CertificationState.Retired or CertificationState.ResearchCandidate))
            throw AppException.Conflict("A retired certification can only be reopened as a research candidate.", "invalid_transition");
        var now = DateTime.UtcNow;
        if (VerifiedStates.Contains(req.State))
        {
            var issues = VerificationIssues(c, uid, now);
            if (req.State == CertificationState.PublishedPreparation)
            {
                var linked = await (from l in db.Set<CourseCertification>() join co in db.Courses.Where(AccessService.IsLiveExpr) on l.CourseId equals co.Id
                                    where l.CertificationId == c.Id select co.Id).AnyAsync();
                if (!linked) issues.Add("PublishedPreparation requires at least one live course linked to this certification.");
            }
            if (req.State is CertificationState.InProduction or CertificationState.PublishedPreparation
                && !await db.Set<CertificationObjective>().AnyAsync(o => o.CertificationId == c.Id))
                issues.Add("Blueprint objectives are required before production.");
            if (issues.Count > 0) throw AppException.Conflict(string.Join(" ", issues), "verification_failed");
            c.ReviewerId = uid; c.VerifiedAt = now; c.StaleFlaggedAt = null;
        }
        c.State = req.State; c.UpdatedAt = now;
        audit.Record("certification.state_changed", "Certification", c.Id, new { from, to = req.State, notes = Trunc(req.Notes, 2000) });
        await db.SaveChangesAsync();
        return await AdminGet(c.Id);
    }

    /// <summary>Rules for every verified state: https official source, checked within the freshness window, reviewer ≠ last editor.</summary>
    public List<string> VerificationIssues(Certification c, Guid reviewerId, DateTime now)
    {
        var issues = new List<string>();
        if (!Uri.TryCreate(c.OfficialSourceUrl, UriKind.Absolute, out var u) || u.Scheme != Uri.UriSchemeHttps)
            issues.Add("An https official source URL is required.");
        if (c.LastCheckedAt is null || c.LastCheckedAt < FreshCutoff(now))
            issues.Add($"The official source must have been checked within the last {_o.CertificationFreshDays} days.");
        if (c.LastEditedBy == reviewerId) issues.Add("The reviewer must be a different person from the last editor.");
        if (c.HasNonMcqTasks && string.IsNullOrWhiteSpace(c.NonMcqDisclosure))
            issues.Add("A non-MCQ disclosure is required because the official exam includes non-MCQ tasks.");
        return issues;
    }

    // ---------- Objectives ----------
    public async Task<CertificationAdminDto> AddObjective(Guid certId, ObjectiveUpsertRequest req) => await UpsertObjective(certId, null, req);
    public async Task<CertificationAdminDto> UpdateObjective(Guid objectiveId, ObjectiveUpsertRequest req)
    {
        var o = await db.Set<CertificationObjective>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == objectiveId) ?? throw AppException.NotFound("Objective");
        return await UpsertObjective(o.CertificationId, objectiveId, req);
    }

    private async Task<CertificationAdminDto> UpsertObjective(Guid certId, Guid? objectiveId, ObjectiveUpsertRequest req)
    {
        var c = await db.Set<Certification>().FirstOrDefaultAsync(x => x.Id == certId) ?? throw AppException.NotFound("Certification");
        var code = (req.Code ?? "").Trim();
        var title = (req.Title ?? "").Trim();
        if (code.Length is 0 or > 64) throw AppException.Bad("Objective code is required (max 64).");
        if (title.Length is 0 or > 500) throw AppException.Bad("Objective title is required (max 500).");
        if (req.WeightPercent < 0 || req.WeightPercent > 100) throw AppException.Bad("WeightPercent must be between 0 and 100.");
        var others = await db.Set<CertificationObjective>().Where(o => o.CertificationId == certId && o.Id != objectiveId).ToListAsync();
        if (others.Any(o => string.Equals(o.Code, code, StringComparison.OrdinalIgnoreCase))) throw AppException.Conflict("Objective code already exists.");
        if (others.Sum(o => o.WeightPercent) + req.WeightPercent > 100m) throw AppException.Bad("Objective weights cannot exceed 100% in total.");
        CertificationObjective obj;
        if (objectiveId is { } oid) obj = await db.Set<CertificationObjective>().FirstAsync(x => x.Id == oid);
        else { obj = new CertificationObjective { CertificationId = certId, SortOrder = others.Count == 0 ? 0 : others.Max(o => o.SortOrder) + 1 }; db.Set<CertificationObjective>().Add(obj); }
        obj.Code = code; obj.Title = title; obj.WeightPercent = req.WeightPercent; obj.SortOrder = req.SortOrder ?? obj.SortOrder;
        MarkEdited(c);
        audit.Record(objectiveId is null ? "cert_objective.created" : "cert_objective.updated", "Certification", certId, new { obj.Id, obj.Code, obj.WeightPercent });
        await db.SaveChangesAsync();
        return await AdminGet(certId);
    }

    public async Task DeleteObjective(Guid objectiveId)
    {
        var o = await db.Set<CertificationObjective>().FirstOrDefaultAsync(x => x.Id == objectiveId) ?? throw AppException.NotFound("Objective");
        var c = await db.Set<Certification>().FirstAsync(x => x.Id == o.CertificationId);
        db.Set<ObjectiveLesson>().RemoveRange(db.Set<ObjectiveLesson>().Where(x => x.ObjectiveId == objectiveId));
        db.Set<ObjectiveQuestion>().RemoveRange(db.Set<ObjectiveQuestion>().Where(x => x.ObjectiveId == objectiveId));
        db.Set<CertificationObjective>().Remove(o);
        MarkEdited(c);
        audit.Record("cert_objective.deleted", "Certification", c.Id, new { o.Id, o.Code });
        await db.SaveChangesAsync();
    }

    // ---------- Mappings ----------
    /// <summary>Links a course to a certification (reviewers/staff only: this is a credential claim).</summary>
    public async Task LinkCourse(Guid certId, Guid courseId, bool link)
    {
        if (!await db.Set<Certification>().AnyAsync(x => x.Id == certId)) throw AppException.NotFound("Certification");
        if (!await db.Courses.AnyAsync(x => x.Id == courseId)) throw AppException.NotFound("Course");
        var existing = await db.Set<CourseCertification>().FirstOrDefaultAsync(x => x.CourseId == courseId && x.CertificationId == certId);
        if (link && existing is null) db.Set<CourseCertification>().Add(new CourseCertification { CourseId = courseId, CertificationId = certId });
        else if (!link && existing is not null) db.Set<CourseCertification>().Remove(existing);
        else return;
        audit.Record(link ? "certification.course_linked" : "certification.course_unlinked", "Certification", certId, new { courseId });
        await db.SaveChangesAsync();
    }

    private async Task<(CertificationObjective Obj, List<Guid> CourseIds)> ObjectiveForMapping(Guid objectiveId)
    {
        var o = await db.Set<CertificationObjective>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == objectiveId) ?? throw AppException.NotFound("Objective");
        var courses = await db.Set<CourseCertification>().AsNoTracking().Where(x => x.CertificationId == o.CertificationId).Select(x => x.CourseId).ToListAsync();
        return (o, courses);
    }

    /// <summary>Replaces the lessons (of one course) mapped to an objective. Course editors or staff; course must be linked to the certification.</summary>
    public async Task<CoverageReportDto> MapLessons(Guid objectiveId, Guid courseId, MappingRequest req)
    {
        var (o, courses) = await ObjectiveForMapping(objectiveId);
        if (!courses.Contains(courseId)) throw AppException.Conflict("Link the course to this certification first.", "course_not_linked");
        await access.RequireCourseEditor(courseId);
        var ids = (req.Ids ?? []).Distinct().ToList();
        var courseLessons = await (from l in db.Lessons join m in db.Modules on l.ModuleId equals m.Id where m.CourseId == courseId select l.Id).ToListAsync();
        if (ids.Any(i => !courseLessons.Contains(i))) throw AppException.Bad("Every lesson must belong to the course.");
        var existing = await db.Set<ObjectiveLesson>().Where(x => x.ObjectiveId == objectiveId && courseLessons.Contains(x.LessonId)).ToListAsync();
        db.Set<ObjectiveLesson>().RemoveRange(existing.Where(x => !ids.Contains(x.LessonId)));
        foreach (var id in ids.Where(i => existing.All(x => x.LessonId != i))) db.Set<ObjectiveLesson>().Add(new ObjectiveLesson { ObjectiveId = objectiveId, LessonId = id });
        audit.Record("cert_objective.lessons_mapped", "Course", courseId, new { objectiveId, lessons = ids });
        await db.SaveChangesAsync();
        return await Coverage(o.CertificationId, courseId);
    }

    public async Task<CoverageReportDto> MapQuestions(Guid objectiveId, Guid courseId, MappingRequest req)
    {
        var (o, courses) = await ObjectiveForMapping(objectiveId);
        if (!courses.Contains(courseId)) throw AppException.Conflict("Link the course to this certification first.", "course_not_linked");
        await access.RequireCourseEditor(courseId);
        var ids = (req.Ids ?? []).Distinct().ToList();
        var valid = await db.Questions.Where(q => q.CourseId == courseId && ids.Contains(q.Id)).Select(q => q.Id).ToListAsync();
        if (valid.Count != ids.Count) throw AppException.Bad("Every question must belong to the course.");
        var courseQuestions = db.Questions.Where(q => q.CourseId == courseId).Select(q => q.Id);
        var existing = await db.Set<ObjectiveQuestion>().Where(x => x.ObjectiveId == objectiveId && courseQuestions.Contains(x.QuestionId)).ToListAsync();
        db.Set<ObjectiveQuestion>().RemoveRange(existing.Where(x => !ids.Contains(x.QuestionId)));
        foreach (var id in ids.Where(i => existing.All(x => x.QuestionId != i))) db.Set<ObjectiveQuestion>().Add(new ObjectiveQuestion { ObjectiveId = objectiveId, QuestionId = id });
        audit.Record("cert_objective.questions_mapped", "Course", courseId, new { objectiveId, questions = ids });
        await db.SaveChangesAsync();
        return await Coverage(o.CertificationId, courseId);
    }

    /// <summary>
    /// Current lesson/question → objective mappings of one course for a certification (course authors, reviewers, staff).
    /// Only mappings to the course's own lessons/questions are returned.
    /// </summary>
    public async Task<CertificationMappingsDto> Mappings(Guid certId, Guid courseId)
    {
        if (!await db.Set<Certification>().AnyAsync(x => x.Id == certId)) throw AppException.NotFound("Certification");
        if (!await db.Courses.AnyAsync(x => x.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseAuthorOrStaff(courseId);
        var linked = await db.Set<CourseCertification>().AnyAsync(x => x.CertificationId == certId && x.CourseId == courseId);
        var objectives = await db.Set<CertificationObjective>().AsNoTracking().Where(o => o.CertificationId == certId)
            .OrderBy(o => o.SortOrder).ThenBy(o => o.Code).ToListAsync();
        var objIds = objectives.Select(o => o.Id).ToList();
        var lessons = await (from ol in db.Set<ObjectiveLesson>().AsNoTracking()
                             join l in db.Lessons.AsNoTracking() on ol.LessonId equals l.Id
                             join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                             where objIds.Contains(ol.ObjectiveId) && m.CourseId == courseId
                             orderby m.SortOrder, l.SortOrder
                             select new { ol.ObjectiveId, ol.LessonId }).ToListAsync();
        var questions = await (from oq in db.Set<ObjectiveQuestion>().AsNoTracking()
                               join q in db.Questions.AsNoTracking() on oq.QuestionId equals q.Id
                               where objIds.Contains(oq.ObjectiveId) && q.CourseId == courseId
                               orderby q.Id
                               select new { oq.ObjectiveId, oq.QuestionId }).ToListAsync();
        return new CertificationMappingsDto(certId, courseId, linked, objectives.Select(o => new ObjectiveMappingDto(o.Id, o.Code, o.Title,
            lessons.Where(x => x.ObjectiveId == o.Id).Select(x => x.LessonId).ToList(),
            questions.Where(x => x.ObjectiveId == o.Id).Select(x => x.QuestionId).ToList())).ToList());
    }

    /// <summary>Courses linked to a certification, live or not (reviewers/staff).</summary>
    public async Task<List<LinkedCourseDto>> LinkedCourses(Guid certId)
    {
        if (!await db.Set<Certification>().AnyAsync(x => x.Id == certId)) throw AppException.NotFound("Certification");
        var rows = await (from l in db.Set<CourseCertification>().AsNoTracking()
                          join c in db.Courses.AsNoTracking() on l.CourseId equals c.Id
                          where l.CertificationId == certId
                          orderby c.Title
                          select new { c.Id, c.Slug, c.Title, c.Status, c.PublishedAt, l.CreatedAt }).ToListAsync();
        return rows.Select(r => new LinkedCourseDto(r.Id, r.Slug, r.Title, r.Status, AccessService.IsLive(r.Status, r.PublishedAt), r.CreatedAt)).ToList();
    }

    /// <summary>Course authors/reviewers/staff: coverage of a certification's objectives by one course.</summary>
    public async Task<CoverageReportDto> CourseCoverage(Guid certId, Guid courseId)
    {
        await access.RequireCourseAuthorOrStaff(courseId);
        return await Coverage(certId, courseId);
    }

    /// <summary>
    /// Per-objective counts of mapped lessons and Active questions (restricted to one course, or across all linked courses when
    /// courseId is null). An objective is a gap when it has no lesson or no Active question.
    /// </summary>
    public async Task<CoverageReportDto> Coverage(Guid certId, Guid? courseId)
    {
        var c = await db.Set<Certification>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == certId) ?? throw AppException.NotFound("Certification");
        var objectives = await db.Set<CertificationObjective>().AsNoTracking().Where(o => o.CertificationId == certId)
            .OrderBy(o => o.SortOrder).ThenBy(o => o.Code).ToListAsync();
        var objIds = objectives.Select(o => o.Id).ToList();
        var courseIds = courseId is { } cid ? [cid]
            : await db.Set<CourseCertification>().AsNoTracking().Where(x => x.CertificationId == certId).Select(x => x.CourseId).ToListAsync();
        var lessonCounts = (await (from ol in db.Set<ObjectiveLesson>().AsNoTracking()
                                   join l in db.Lessons.AsNoTracking() on ol.LessonId equals l.Id
                                   join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                                   where objIds.Contains(ol.ObjectiveId) && courseIds.Contains(m.CourseId)
                                   select ol.ObjectiveId).ToListAsync()).GroupBy(x => x).ToDictionary(g => g.Key, g => g.Count());
        var questionCounts = (await (from oq in db.Set<ObjectiveQuestion>().AsNoTracking()
                                     join q in db.Questions.AsNoTracking() on oq.QuestionId equals q.Id
                                     where objIds.Contains(oq.ObjectiveId) && courseIds.Contains(q.CourseId) && q.State == QuestionState.Active
                                     select oq.ObjectiveId).ToListAsync()).GroupBy(x => x).ToDictionary(g => g.Key, g => g.Count());
        var rows = objectives.Select(o =>
        {
            var lc = lessonCounts.GetValueOrDefault(o.Id);
            var qc = questionCounts.GetValueOrDefault(o.Id);
            var gaps = new List<string>();
            if (lc == 0) gaps.Add("no_lessons");
            if (qc == 0) gaps.Add("no_active_questions");
            return new CoverageObjectiveDto(o.Id, o.Code, o.Title, o.WeightPercent, lc, qc, gaps.Count > 0, gaps.ToArray());
        }).ToList();
        return new CoverageReportDto(c.Id, c.Title, courseId, rows.Count, rows.Count(r => r.Gap), rows.Where(r => !r.Gap).Sum(r => r.WeightPercent), rows);
    }

    // ---------- Public ----------
    public async Task<List<PublicCertificationSummaryDto>> PublicList(string? q, Guid? issuerId, CertificationKind? kind)
    {
        var query = PublicCertifications();
        if (issuerId is { } iid) query = query.Where(c => c.IssuerId == iid);
        if (kind is { } k) query = query.Where(c => c.Kind == k);
        if (!string.IsNullOrWhiteSpace(q))
        {
            var p = "%" + CatalogQueryService.EscapeLike(q.Trim().ToLowerInvariant()) + "%";
            query = query.Where(c => EF.Functions.Like(c.Title.ToLower(), p, "!") || EF.Functions.Like(c.ExamCode.ToLower(), p, "!"));
        }
        var list = await (from c in query join i in db.Set<CertificationIssuer>() on c.IssuerId equals i.Id
                          orderby i.Name, c.Title select new { c, IssuerName = i.Name }).Take(500).ToListAsync();
        var ids = list.Select(x => x.c.Id).ToList();
        var counts = (await (from l in db.Set<CourseCertification>().AsNoTracking()
                             join co in db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr) on l.CourseId equals co.Id
                             where ids.Contains(l.CertificationId) select l.CertificationId).ToListAsync())
            .GroupBy(x => x).ToDictionary(g => g.Key, g => g.Count());
        return list.Select(x => new PublicCertificationSummaryDto(x.c.Id, x.c.Slug, x.c.Title, x.IssuerName, x.c.Jurisdiction, x.c.ExamCode,
            x.c.LevelOrPart, x.c.Kind, x.c.State, x.c.LastCheckedAt!.Value, counts.GetValueOrDefault(x.c.Id))).ToList();
    }

    public async Task<PublicCertificationDto> PublicDetail(string slug)
    {
        var c = await PublicCertifications().FirstOrDefaultAsync(x => x.Slug == slug) ?? throw AppException.NotFound("Certification");
        var issuer = await db.Set<CertificationIssuer>().AsNoTracking().Where(i => i.Id == c.IssuerId).Select(i => i.Name).FirstAsync();
        var objectives = await db.Set<CertificationObjective>().AsNoTracking().Where(o => o.CertificationId == c.Id).ToListAsync();
        var courseIds = await (from l in db.Set<CourseCertification>().AsNoTracking()
                               join co in db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr) on l.CourseId equals co.Id
                               where l.CertificationId == c.Id orderby co.Title select co.Id).ToListAsync();
        string? replacedBy = null;
        if (c.ReplacedById is { } rid) replacedBy = await PublicCertifications().Where(x => x.Id == rid).Select(x => x.Slug).FirstOrDefaultAsync();
        return new PublicCertificationDto(c.Id, c.Slug, c.Title, issuer, c.Jurisdiction, c.ExamCode, c.LevelOrPart, c.Version, c.EffectiveFrom,
            c.EffectiveTo, c.Prerequisites, c.OfficialSourceUrl, c.LastCheckedAt!.Value, c.RenewalInfo, c.Kind, c.State,
            c.HasNonMcqTasks ? c.NonMcqDisclosure : null, replacedBy, Objectives(objectives), await catalog.Cards(courseIds));
    }

    /// <summary>Certifications publicly shown for a live course.</summary>
    public async Task<List<PublicCertificationSummaryDto>> PublicForCourse(Guid courseId)
    {
        var ids = await db.Set<CourseCertification>().AsNoTracking().Where(x => x.CourseId == courseId).Select(x => x.CertificationId).ToListAsync();
        if (ids.Count == 0) return [];
        return (await PublicList(null, null, null)).Where(x => ids.Contains(x.Id)).ToList();
    }

    // ---------- Stale job ----------
    /// <summary>Flags entries in a verified state whose last check is older than the freshness window (they are already hidden publicly).</summary>
    public async Task<int> FlagStale(DateTime nowUtc)
    {
        var cutoff = FreshCutoff(nowUtc);
        var stale = await db.Set<Certification>().Where(c => c.StaleFlaggedAt == null
            && c.State != CertificationState.Retired && c.State != CertificationState.ResearchCandidate
            && (c.LastCheckedAt == null || c.LastCheckedAt < cutoff)).ToListAsync();
        foreach (var c in stale)
        {
            c.StaleFlaggedAt = nowUtc;
            db.AuditLogs.Add(new AuditLog { Action = "certification.flagged_stale", EntityType = "Certification", EntityId = c.Id.ToString(),
                Details = System.Text.Json.JsonSerializer.Serialize(new { c.LastCheckedAt, cutoff }) });
        }
        await db.SaveChangesAsync();
        return stale.Count;
    }

    private static string RequireHttps(string url, string field)
    {
        var t = url.Trim();
        if (t.Length > 1000 || !Uri.TryCreate(t, UriKind.Absolute, out var u) || u.Scheme != Uri.UriSchemeHttps)
            throw AppException.Bad($"{field} must be an absolute https URL.");
        return t;
    }

    public static string Trunc(string? s, int max)
    {
        var t = (s ?? "").Trim();
        if (t.Length > max) throw AppException.Bad($"Value too long (max {max} characters).");
        return t;
    }
}
