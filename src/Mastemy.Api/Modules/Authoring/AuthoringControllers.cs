using Mastemy.Api.Modules.Catalog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Authoring;

[ApiController]
[Route("api/studio")]
[Authorize(Policy = "Instructor")]
public class AuthoringController(StudioService studio, RevisionService revisions, TemplateService templates, TranslationService translations,
    AgreementService agreements) : ControllerBase
{
    // ---------- productivity ----------
    [HttpPost("courses/{id:guid}/duplicate")]
    public Task<StudioCourseDto> DuplicateCourse(Guid id, DuplicateCourseRequest? req) => studio.DuplicateCourse(id, req ?? new DuplicateCourseRequest(null));

    [HttpPost("modules/{id:guid}/duplicate")]
    public Task<StudioModuleDto> DuplicateModule(Guid id) => studio.DuplicateModule(id);

    [HttpPost("lessons/{id:guid}/duplicate")]
    public Task<StudioLessonDto> DuplicateLesson(Guid id) => studio.DuplicateLesson(id);

    [HttpPost("modules/{id:guid}/lessons/bulk")]
    public Task<List<StudioLessonDto>> BulkLessons(Guid id, BulkLessonsRequest req) => studio.BulkCreateLessons(id, req);

    // ---------- templates ----------
    [HttpGet("course-templates")]
    public Task<List<CourseTemplateDto>> Templates() => templates.List(activeOnly: true);

    [HttpGet("course-templates/{id:guid}")]
    public Task<CourseTemplateDto> Template(Guid id) => templates.Get(id, activeOnly: true);

    [HttpPost("courses/from-template")]
    public Task<StudioCourseDto> FromTemplate(CreateFromTemplateRequest req) => studio.CreateFromTemplate(req.TemplateId, req.Course);

    [HttpGet("courses/{id:guid}/checklist")]
    public Task<List<ChecklistItemDto>> Checklist(Guid id) => templates.Checklist(id);

    [HttpPost("courses/{id:guid}/checklist")]
    public Task<ChecklistItemDto> AddChecklistItem(Guid id, ChecklistAddRequest req) => templates.AddChecklistItem(id, req);

    [HttpPut("courses/{id:guid}/checklist/{itemId:guid}")]
    public Task<ChecklistItemDto> ToggleChecklistItem(Guid id, Guid itemId, ChecklistToggleRequest req) => templates.ToggleChecklistItem(id, itemId, req);

    // ---------- revisions / history ----------
    [HttpGet("lessons/{id:guid}/notes")]
    public async Task<LessonNotesDto> Notes(Guid id)
    {
        var dto = await revisions.Notes(id);
        Response.Headers.ETag = dto.ETag;
        return dto;
    }

    [HttpGet("lessons/{id:guid}/revisions")]
    public Task<List<LessonRevisionSummaryDto>> Revisions(Guid id) => revisions.List(id);

    [HttpGet("lessons/{id:guid}/revisions/{revision:int}")]
    public Task<LessonRevisionDto> Revision(Guid id, int revision) => revisions.Get(id, revision);

    /// <summary>Requires If-Match with the current notes ETag (428 missing / 412 stale).</summary>
    [HttpPost("lessons/{id:guid}/revisions/{revision:int}/restore")]
    public async Task<StudioLessonDto> Restore(Guid id, int revision)
    {
        var dto = await revisions.Restore(id, revision, Request.Headers.IfMatch.ToString());
        Response.Headers.ETag = StudioService.NotesETag(dto.NotesVersion);
        return dto;
    }

    [HttpGet("courses/{id:guid}/history")]
    public Task<CourseHistoryDto> History(Guid id, [FromQuery] int page = 1, [FromQuery] int pageSize = 50) => revisions.History(id, page, pageSize);

    // ---------- translations ----------
    [HttpGet("courses/{id:guid}/translations")]
    public Task<List<StudioTranslationDto>> Translations(Guid id) => translations.ForStudio(id);

    [HttpPost("courses/{id:guid}/translations")]
    public Task<List<StudioTranslationDto>> LinkTranslation(Guid id, TranslationLinkRequest req) => translations.Link(id, req);

    [HttpDelete("courses/{id:guid}/translations")]
    public async Task<IActionResult> UnlinkTranslation(Guid id) { await translations.Unlink(id); return NoContent(); }

    // ---------- agreement ----------
    [HttpGet("agreement")]
    public Task<MyAgreementDto> Agreement() => agreements.Mine();

    [HttpPost("agreement/accept")]
    public Task<MyAgreementDto> AcceptAgreement(AcceptAgreementRequest req) => agreements.Accept(req);
}

/// <summary>Learner preview of the draft (authors, reviewers, staff). Reviewers do not hold the Instructor policy, so authorize per course.</summary>
[ApiController]
[Authorize]
public class LearnerPreviewController(PreviewService svc) : ControllerBase
{
    [HttpGet("api/studio/courses/{id:guid}/preview")]
    public Task<LearnerPreviewDto> Preview(Guid id, [FromQuery(Name = "as")] string? @as, [FromQuery] string? device) => svc.Preview(id, @as, device);
}

[ApiController]
[Route("api/admin")]
[Authorize(Policy = "Staff")]
public class AuthoringAdminController(TemplateService templates, AgreementService agreements) : ControllerBase
{
    [HttpGet("course-templates")] public Task<List<CourseTemplateDto>> Templates() => templates.List(activeOnly: false);
    [HttpGet("course-templates/{id:guid}")] public Task<CourseTemplateDto> Template(Guid id) => templates.Get(id, activeOnly: false);
    [HttpPost("course-templates")] public Task<CourseTemplateDto> Create(CourseTemplateRequest req) => templates.Create(req);
    [HttpPut("course-templates/{id:guid}")] public Task<CourseTemplateDto> Update(Guid id, CourseTemplateRequest req) => templates.Update(id, req);
    [HttpDelete("course-templates/{id:guid}")]
    public async Task<IActionResult> Deactivate(Guid id) { await templates.Deactivate(id); return NoContent(); }

    [HttpGet("agreements")] public Task<List<AgreementDto>> Agreements() => agreements.List();
    [HttpPost("agreements")] public Task<AgreementDto> PublishAgreement(CreateAgreementRequest req) => agreements.Create(req);
}

[ApiController]
[AllowAnonymous]
public class CourseLanguagesController(TranslationService svc) : ControllerBase
{
    /// <summary>Live language variants of a live course, for the public course detail page.</summary>
    [HttpGet("api/courses/{slug}/languages")]
    public Task<List<CourseLanguageDto>> Languages(string slug) => svc.PublicLanguages(slug);
}
