using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Learning;

/// <summary>Learner workspace. Curriculum and lesson reads are anonymous: YouTube playback is never gated.</summary>
[ApiController]
public class LearnController(LearningService svc) : ControllerBase
{
    [HttpGet("api/learn/courses/{slug}"), AllowAnonymous]
    public Task<CurriculumDto> Course(string slug) => svc.GetCourse(slug);

    [HttpGet("api/learn/lessons/{id:guid}"), AllowAnonymous]
    public Task<LessonViewDto> Lesson(Guid id) => svc.GetLesson(id);

    [HttpPut("api/learn/lessons/{id:guid}/progress"), Authorize]
    public Task<LessonProgressDto> Progress(Guid id, ProgressInput input) => svc.UpsertProgress(id, input);

    [HttpPost("api/learn/courses/{id:guid}/enroll"), Authorize]
    public Task<EnrollmentResult> Enroll(Guid id) => svc.Enroll(id);

    [HttpGet("api/me/dashboard"), Authorize]
    public Task<DashboardDto> Dashboard() => svc.Dashboard();
}

[ApiController, Authorize]
public class NotesController(NotesService svc) : ControllerBase
{
    [HttpGet("api/me/notes")]
    public Task<List<NoteDto>> List([FromQuery] Guid? lessonId, [FromQuery] string? q, [FromQuery] string? tag) => svc.List(lessonId, q, tag);

    [HttpPost("api/me/notes")]
    public Task<NoteDto> Create(NoteInput input) => svc.Create(input);

    [HttpPut("api/me/notes/{id:guid}")]
    public Task<NoteDto> Update(Guid id, NoteUpdateInput input) => svc.Update(id, input);

    [HttpDelete("api/me/notes/{id:guid}")]
    public async Task<IActionResult> Delete(Guid id) { await svc.Delete(id); return NoContent(); }

    [HttpGet("api/me/notes/export")]
    public async Task<IActionResult> Export()
        => File(Encoding.UTF8.GetBytes(await svc.ExportMarkdown()), "text/markdown; charset=utf-8", "mastemy-notes.md");
}

[ApiController]
public class ReviewsController(ReviewsService svc) : ControllerBase
{
    [HttpPost("api/courses/{id:guid}/reviews"), Authorize]
    public Task<ReviewDto> Upsert(Guid id, ReviewInput input) => svc.Upsert(id, input);

    [HttpGet("api/courses/{id:guid}/reviews"), AllowAnonymous]
    public Task<ReviewPage> List(Guid id, [FromQuery] int page = 1, [FromQuery] int pageSize = 20) => svc.List(id, page, pageSize);

    [HttpPost("api/studio/reviews/{id:guid}/reply"), Authorize]
    public Task<ReviewDto> Reply(Guid id, ReplyInput input) => svc.Reply(id, input);
}
