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

    [HttpGet("courses")]
    public Task<PagedResult<CourseCardDto>> Search([FromQuery] string? q, [FromQuery] string? category, [FromQuery] CourseLevel? level,
        [FromQuery] string? language, [FromQuery] string? sort, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => svc.Search(q, category, level, language, sort, page, pageSize);

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
    [HttpGet("courses/{id:guid}")] public Task<StudioCourseDto> Get(Guid id) => svc.Get(id);
    [HttpPut("courses/{id:guid}")] public Task<StudioCourseDto> Update(Guid id, UpdateCourseRequest req) => svc.Update(id, req);

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
    [HttpPut("lessons/{id:guid}/notes")] public Task<StudioLessonDto> Notes(Guid id, LessonNotesRequest req) => svc.UpdateNotes(id, req);

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
