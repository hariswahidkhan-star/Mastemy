using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Taxonomy;

public record CourseTaxonomyDto(IReadOnlyList<SkillDto> Skills, IReadOnlyList<PublicCertificationSummaryDto> Certifications);

// ---------- Public ----------
[ApiController]
[Route("api")]
[AllowAnonymous]
public class DiscoveryController(DiscoveryService discovery, SkillService skills, CertificationService certs,
    InstructorDirectoryService instructors, CourseSnapshotService snapshots) : ControllerBase
{
    [HttpGet("home")] public Task<HomeDto> Home() => discovery.Home();
    [HttpGet("skills")] public Task<List<SkillDto>> Skills() => skills.List(false);

    /// <summary>Skills and public certifications of a live course, as of its current published snapshot.</summary>
    [HttpGet("courses/{slug}/taxonomy")]
    public async Task<CourseTaxonomyDto> CourseTaxonomy(string slug)
    {
        var pc = await snapshots.LiveBySlug(slug);
        return new CourseTaxonomyDto(await skills.PublicCourseSkills(pc.Course.Id), await certs.PublicForCourse(pc.Course.Id));
    }

    [HttpGet("certifications")]
    public Task<List<PublicCertificationSummaryDto>> Certifications([FromQuery] string? q, [FromQuery] Guid? issuer, [FromQuery] CertificationKind? kind)
        => certs.PublicList(q, issuer, kind);
    [HttpGet("certifications/{slug}")] public Task<PublicCertificationDto> Certification(string slug) => certs.PublicDetail(slug);

    [HttpGet("pathways")] public Task<List<PathwaySummaryDto>> Pathways([FromQuery] CourseLevel? level) => discovery.PublicPathways(level);
    [HttpGet("pathways/{slug}")] public Task<PathwayDetailDto> Pathway(string slug) => discovery.PublicPathway(slug);
    [HttpPost("pathways/{slug}/enroll"), Authorize] public Task<PathwayEnrollResultDto> Enroll(string slug) => discovery.EnrollInPathway(slug);

    [HttpGet("collections/{slug}")] public Task<CollectionDto> Collection(string slug) => discovery.PublicCollection(slug);
    [HttpGet("academies/{slug}")] public Task<AcademyDto> Academy(string slug) => discovery.Academy(slug);

    [HttpGet("instructors")]
    public Task<PagedResult<InstructorSummaryDto>> Instructors([FromQuery] string? q, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => instructors.List(q, page, pageSize);
    [HttpGet("instructors/{id:guid}")] public Task<InstructorProfileDto> Instructor(Guid id) => instructors.Profile(id);
}

// ---------- Studio (course authors; checks are per course in the services) ----------
[ApiController]
[Route("api/studio")]
[Authorize]
public class TaxonomyStudioController(SkillService skills, CertificationService certs) : ControllerBase
{
    [HttpGet("courses/{id:guid}/skills")] public Task<List<SkillDto>> CourseSkills(Guid id) => skills.CourseWorkingSkills(id);
    [HttpPut("courses/{id:guid}/skills"), Authorize(Policy = "Instructor")]
    public Task<List<SkillDto>> SetCourseSkills(Guid id, CourseSkillsRequest req) => skills.SetCourseSkills(id, req);

    [HttpGet("courses/{courseId:guid}/certifications/{certId:guid}/coverage")]
    public Task<CoverageReportDto> Coverage(Guid courseId, Guid certId) => certs.CourseCoverage(certId, courseId);

    [HttpPut("objectives/{objectiveId:guid}/courses/{courseId:guid}/lessons"), Authorize(Policy = "Instructor")]
    public Task<CoverageReportDto> MapLessons(Guid objectiveId, Guid courseId, MappingRequest req) => certs.MapLessons(objectiveId, courseId, req);
    [HttpPut("objectives/{objectiveId:guid}/courses/{courseId:guid}/questions"), Authorize(Policy = "Instructor")]
    public Task<CoverageReportDto> MapQuestions(Guid objectiveId, Guid courseId, MappingRequest req) => certs.MapQuestions(objectiveId, courseId, req);
}

// ---------- Admin: skills ----------
[ApiController]
[Route("api/admin/skills")]
[Authorize(Policy = "Staff")]
public class AdminSkillsController(SkillService svc) : ControllerBase
{
    [HttpGet] public Task<List<SkillDto>> List() => svc.List(true);
    [HttpPost] public Task<SkillDto> Create(SkillUpsertRequest req) => svc.Create(req);
    [HttpPut("{id:int}")] public Task<SkillDto> Update(int id, SkillUpsertRequest req) => svc.Update(id, req);
}

// ---------- Admin: certification directory (reviewers and staff) ----------
[ApiController]
[Route("api/admin")]
[Authorize(Policy = "Reviewer")]
public class AdminCertificationsController(CertificationService svc) : ControllerBase
{
    /// <summary>Soft validation report (reviewers and staff): question skill codes that are not in the skills catalog.</summary>
    [HttpGet("skills/unknown-question-codes")]
    public Task<List<UnknownSkillCodeDto>> UnknownSkillCodes([FromServices] SkillService skills) => skills.UnknownQuestionSkillCodes();

    [HttpGet("certification-issuers")] public Task<List<IssuerDto>> Issuers() => svc.Issuers();
    [HttpPost("certification-issuers")] public Task<IssuerDto> CreateIssuer(IssuerUpsertRequest req) => svc.UpsertIssuer(null, req);
    [HttpPut("certification-issuers/{id:guid}")] public Task<IssuerDto> UpdateIssuer(Guid id, IssuerUpsertRequest req) => svc.UpsertIssuer(id, req);

    /// <summary>stale=true is the re-check queue: verified-state entries that are stale or lost their verification by an edit.</summary>
    [HttpGet("certifications")]
    public Task<List<CertificationAdminDto>> List([FromQuery] CertificationState? state, [FromQuery] bool? stale) => svc.AdminList(state, stale);
    [HttpGet("certifications/{id:guid}")] public Task<CertificationAdminDto> Get(Guid id) => svc.AdminGet(id);
    [HttpPost("certifications")] public Task<CertificationAdminDto> Create(CertificationUpsertRequest req) => svc.Create(req);
    [HttpPut("certifications/{id:guid}")] public Task<CertificationAdminDto> Update(Guid id, CertificationUpsertRequest req) => svc.Update(id, req);
    [HttpPost("certifications/{id:guid}/state")] public Task<CertificationAdminDto> State(Guid id, CertificationStateRequest req) => svc.ChangeState(id, req);

    [HttpPost("certifications/{id:guid}/objectives")] public Task<CertificationAdminDto> AddObjective(Guid id, ObjectiveUpsertRequest req) => svc.AddObjective(id, req);
    [HttpPut("certification-objectives/{id:guid}")] public Task<CertificationAdminDto> UpdateObjective(Guid id, ObjectiveUpsertRequest req) => svc.UpdateObjective(id, req);
    [HttpDelete("certification-objectives/{id:guid}")]
    public async Task<IActionResult> DeleteObjective(Guid id) { await svc.DeleteObjective(id); return NoContent(); }

    [HttpPut("certifications/{id:guid}/courses/{courseId:guid}")]
    public async Task<IActionResult> Link(Guid id, Guid courseId) { await svc.LinkCourse(id, courseId, true); return NoContent(); }
    [HttpDelete("certifications/{id:guid}/courses/{courseId:guid}")]
    public async Task<IActionResult> Unlink(Guid id, Guid courseId) { await svc.LinkCourse(id, courseId, false); return NoContent(); }

    [HttpGet("certifications/{id:guid}/coverage")]
    public Task<CoverageReportDto> Coverage(Guid id, [FromQuery] Guid? courseId) => svc.Coverage(id, courseId);

    [HttpPost("certifications/flag-stale"), Authorize(Policy = "Staff")]
    public async Task<object> FlagStale() => new { flagged = await svc.FlagStale(DateTime.UtcNow) };
}

// ---------- Admin: pathways, collections, bestsellers, backlog (staff) ----------
[ApiController]
[Route("api/admin")]
[Authorize(Policy = "Staff")]
public class AdminDiscoveryController(DiscoveryService discovery, BestsellerService bestsellers, BacklogService backlog, AppDbContext db) : ControllerBase
{
    [HttpGet("pathways")] public Task<List<PathwayAdminDto>> Pathways() => discovery.AdminPathways();
    [HttpPost("pathways")] public Task<PathwayAdminDto> CreatePathway(PathwayUpsertRequest req) => discovery.UpsertPathway(null, req);
    [HttpPut("pathways/{id:guid}")] public Task<PathwayAdminDto> UpdatePathway(Guid id, PathwayUpsertRequest req) => discovery.UpsertPathway(id, req);
    [HttpDelete("pathways/{id:guid}")]
    public async Task<IActionResult> DeletePathway(Guid id) { await discovery.DeletePathway(id); return NoContent(); }

    [HttpGet("collections")] public Task<List<CollectionAdminDto>> Collections() => discovery.AdminCollections();
    [HttpPost("collections")] public Task<CollectionAdminDto> CreateCollection(CollectionUpsertRequest req) => discovery.UpsertCollection(null, req);
    [HttpPut("collections/{id:guid}")] public Task<CollectionAdminDto> UpdateCollection(Guid id, CollectionUpsertRequest req) => discovery.UpsertCollection(id, req);
    [HttpDelete("collections/{id:guid}")]
    public async Task<IActionResult> DeleteCollection(Guid id) { await discovery.DeleteCollection(id); return NoContent(); }

    [HttpGet("bestsellers")]
    public Task<List<BestsellerStat>> Bestsellers() => db.Set<BestsellerStat>().AsNoTracking().OrderByDescending(b => b.DistinctBuyers).ToListAsync();
    [HttpPost("bestsellers/recompute")] public Task<BestsellerRunDto> Recompute() => bestsellers.Recompute(DateTime.UtcNow);

    [HttpGet("course-ideas")] public Task<List<CourseIdeaDto>> Ideas([FromQuery] CourseIdeaState? state, [FromQuery] string? q) => backlog.List(state, q);
    [HttpGet("course-ideas/{id:guid}")] public Task<CourseIdeaDto> Idea(Guid id) => backlog.Get(id);
    [HttpPost("course-ideas")] public Task<CourseIdeaDto> CreateIdea(CourseIdeaUpsertRequest req) => backlog.Upsert(null, req);
    [HttpPut("course-ideas/{id:guid}")] public Task<CourseIdeaDto> UpdateIdea(Guid id, CourseIdeaUpsertRequest req) => backlog.Upsert(id, req);
    [HttpPost("course-ideas/{id:guid}/state")] public Task<CourseIdeaDto> IdeaState(Guid id, CourseIdeaStateRequest req) => backlog.ChangeState(id, req);
    [HttpDelete("course-ideas/{id:guid}")]
    public async Task<IActionResult> DeleteIdea(Guid id) { await backlog.Delete(id); return NoContent(); }
    [HttpPost("course-ideas/import-roadmap")]
    public Task<RoadmapImportResultDto> Import([FromBody] RoadmapImportRequest? req) => backlog.ImportRoadmap(req);
}
