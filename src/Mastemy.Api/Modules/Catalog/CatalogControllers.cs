using Mastemy.Api.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Catalog;

[ApiController]
[Route("api")]
[AllowAnonymous]
public class CatalogController(CatalogQueryService svc) : ControllerBase
{
    [HttpGet("categories")]
    public Task<List<CategoryDto>> Categories() => svc.Categories();

    /// <summary>
    /// Catalog search. Extended filters: instructor (user id), duration (short|medium|long|extended), updatedWithinDays,
    /// minPrice/maxPrice (cheapest active approved package), minRating (1-5), skill (code), certification (slug or exam code).
    /// When nothing matches, a spelling-corrected query is tried and returned as didYouMean.
    /// </summary>
    [HttpGet("courses")]
    public Task<CourseSearchResultDto> Search([FromQuery] string? q, [FromQuery] string? category, [FromQuery] CourseLevel? level,
        [FromQuery] string? language, [FromQuery] string? sort, [FromQuery] Guid? instructor, [FromQuery] string? duration,
        [FromQuery] int? updatedWithinDays, [FromQuery] decimal? minPrice, [FromQuery] decimal? maxPrice, [FromQuery] decimal? minRating,
        [FromQuery] string? skill, [FromQuery] string? certification, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => svc.SearchTolerant(q, category, level, language, sort, page, pageSize,
            new SearchFilters(instructor, duration, updatedWithinDays, minPrice, maxPrice, minRating, skill, certification));

    /// <summary>Up to 8 prefix suggestions over live course titles, skills and public certifications.</summary>
    [HttpGet("search/suggestions")]
    public Task<List<SuggestionDto>> Suggestions([FromQuery] string? q) => svc.Suggestions(q);

    [HttpGet("courses/{slug}")]
    public Task<CourseDetailDto> Detail(string slug) => svc.Detail(slug);
}

[ApiController]
[Route("api/studio")]
[Authorize(Policy = "Instructor")]
public class StudioCoursesController(StudioService svc) : ControllerBase
{
    [HttpGet("courses")] public Task<List<StudioCourseSummaryDto>> Mine() => svc.MyCourses();
    [HttpPost("courses")] public Task<StudioCourseDto> Create(CreateCourseRequest req) => svc.Create(req);
    [HttpGet("courses/{id:guid}")]
    public async Task<StudioCourseDto> Get(Guid id)
    {
        var dto = await svc.Get(id);
        Response.Headers.ETag = StudioService.CourseETag(dto.UpdatedAt);
        return dto;
    }

    /// <summary>Optional If-Match (course ETag from GET) → 412 when another save happened meanwhile.</summary>
    [HttpPut("courses/{id:guid}")]
    public async Task<StudioCourseDto> Update(Guid id, UpdateCourseRequest req)
    {
        var dto = await svc.Update(id, req, Request.Headers.IfMatch.ToString());
        Response.Headers.ETag = StudioService.CourseETag(dto.UpdatedAt);
        return dto;
    }

    [HttpPost("courses/{id:guid}/modules")] public Task<StudioModuleDto> AddModule(Guid id, TitleRequest req) => svc.AddModule(id, req);
    [HttpPost("courses/{id:guid}/modules/reorder")]
    public async Task<IActionResult> ReorderModules(Guid id, ReorderRequest req) { await svc.ReorderModules(id, req); return NoContent(); }
    [HttpPut("modules/{id:guid}")]
    public async Task<IActionResult> UpdateModule(Guid id, TitleRequest req) { await svc.UpdateModule(id, req); return NoContent(); }
    [HttpDelete("modules/{id:guid}")]
    public async Task<IActionResult> DeleteModule(Guid id) { await svc.DeleteModule(id); return NoContent(); }

    [HttpPost("modules/{id:guid}/lessons")] public Task<StudioLessonDto> AddLesson(Guid id, LessonCreateRequest req) => svc.AddLesson(id, req);
    [HttpPost("modules/{id:guid}/lessons/reorder")]
    public async Task<IActionResult> ReorderLessons(Guid id, ReorderRequest req) { await svc.ReorderLessons(id, req); return NoContent(); }
    [HttpPut("lessons/{id:guid}")] public Task<StudioLessonDto> UpdateLesson(Guid id, LessonUpdateRequest req) => svc.UpdateLesson(id, req);
    [HttpDelete("lessons/{id:guid}")]
    public async Task<IActionResult> DeleteLesson(Guid id) { await svc.DeleteLesson(id); return NoContent(); }
    /// <summary>Requires If-Match: "n{notesVersion}" (428 when missing, 412 when stale). Returns the new ETag.</summary>
    [HttpPut("lessons/{id:guid}/notes")]
    public async Task<StudioLessonDto> Notes(Guid id, LessonNotesRequest req)
    {
        var dto = await svc.UpdateNotes(id, req, Request.Headers.IfMatch.ToString());
        Response.Headers.ETag = StudioService.NotesETag(dto.NotesVersion);
        return dto;
    }

    [HttpGet("courses/{id:guid}/validation")] public Task<ValidationResultDto> Validation(Guid id) => svc.Validate(id);
    [HttpPost("courses/{id:guid}/submit")] public Task<CourseStatusDto> Submit(Guid id) => svc.Submit(id);
    [HttpPost("courses/{id:guid}/start-update")] public Task<CourseStatusDto> StartUpdate(Guid id) => svc.StartUpdate(id);
    [HttpPost("courses/{id:guid}/co-instructors")]
    public Task<StudioCourseDto> CoInstructor(Guid id, CoInstructorRequest req) => svc.AddCoInstructor(id, req);
}

[ApiController]
[Route("api/review/courses")]
public class CourseReviewController(ReviewService svc) : ControllerBase
{
    [HttpGet, Authorize(Policy = "Reviewer")]
    public Task<List<ReviewQueueItemDto>> Queue([FromQuery] CourseStatus? status) => svc.Queue(status);

    [HttpPost("{id:guid}/decision"), Authorize(Policy = "Reviewer")]
    public Task<CourseStatusDto> Decide(Guid id, ReviewDecisionRequest req) => svc.Decide(id, req);

    [HttpPost("{id:guid}/comments"), Authorize(Policy = "Reviewer")]
    public Task<ReviewCommentDto> Comment(Guid id, ReviewCommentRequest req) => svc.AddComment(id, req);

    /// <summary>Reviewers, staff and the course's own instructors may read review comments.</summary>
    [HttpGet("{id:guid}/changes"), Authorize(Policy = "Reviewer")]
    public Task<CourseChangesDto> Changes(Guid id) => svc.Changes(id);

    /// <summary>Structured diff between the working copy and the latest published snapshot (reviewers, staff, course authors).</summary>
    [HttpGet("{id:guid}/diff"), Authorize]
    public Task<CourseDiffDto> Diff(Guid id, [FromServices] CourseSnapshotService snapshots) => snapshots.Diff(id);

    [HttpGet("{id:guid}/comments"), Authorize]
    public Task<List<ReviewCommentDto>> Comments(Guid id) => svc.Comments(id);
}

[ApiController]
[Route("api/admin/courses")]
[Authorize(Policy = "Staff")]
public class AdminCoursesController(ReviewService svc) : ControllerBase
{
    [HttpPost("{id:guid}/publish")] public Task<CourseStatusDto> Publish(Guid id) => svc.Publish(id);
    [HttpPost("{id:guid}/archive")] public Task<CourseStatusDto> Archive(Guid id) => svc.Archive(id);
}

/// <summary>What learners currently see: the latest published snapshot (course authors, reviewers, staff).</summary>
[ApiController]
[Route("api/studio/courses")]
[Authorize]
public class PublishedPreviewController(CourseSnapshotService svc) : ControllerBase
{
    [HttpGet("{id:guid}/published-preview")] public Task<PublishedPreviewDto> Preview(Guid id) => svc.PublishedPreview(id);
}
