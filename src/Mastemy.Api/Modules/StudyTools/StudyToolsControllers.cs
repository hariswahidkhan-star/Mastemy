using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.StudyTools;

[ApiController]
[Authorize]
[Route("api/me")]
public class StudyToolsController(StudyPlanService plans, LearnerToolsService tools) : ControllerBase
{
    // ---------- study plan ----------
    [HttpGet("study-plan")]
    public async Task<IActionResult> Plan() => await plans.Get() is { } p ? Ok(p) : NoContent();

    [HttpPut("study-plan")]
    public Task<StudyPlanDto> SavePlan(StudyPlanRequest req) => plans.Save(req);

    [HttpPost("study-plan/regenerate")]
    public Task<StudyPlanDto> Regenerate() => plans.Regenerate();

    [HttpDelete("study-plan")]
    public async Task<IActionResult> DeletePlan() { await plans.Delete(); return NoContent(); }

    [HttpGet("study-plan.ics")]
    public async Task<IActionResult> Ics()
    {
        var ics = await plans.Ics();
        Response.Headers.CacheControl = "private, no-store";
        return File(Encoding.UTF8.GetBytes(ics), "text/calendar; charset=utf-8", "mastemy-study-plan.ics");
    }

    // ---------- folders ----------
    [HttpGet("folders")] public Task<List<FolderDto>> Folders() => tools.Folders();
    [HttpPost("folders")] public Task<FolderDto> CreateFolder(FolderRequest req) => tools.CreateFolder(req);
    [HttpPut("folders/{id:guid}")] public Task<FolderDto> UpdateFolder(Guid id, FolderRequest req) => tools.UpdateFolder(id, req);
    [HttpDelete("folders/{id:guid}")]
    public async Task<IActionResult> DeleteFolder(Guid id) { await tools.DeleteFolder(id); return NoContent(); }
    [HttpPut("folders/{id:guid}/courses/{courseId:guid}")]
    public async Task<IActionResult> AddCourse(Guid id, Guid courseId) { await tools.AddToFolder(id, courseId); return NoContent(); }
    [HttpDelete("folders/{id:guid}/courses/{courseId:guid}")]
    public async Task<IActionResult> RemoveCourse(Guid id, Guid courseId) { await tools.RemoveFromFolder(id, courseId); return NoContent(); }

    // ---------- bookmarks ----------
    [HttpGet("bookmarks")]
    public Task<List<BookmarkDto>> Bookmarks([FromQuery] Guid? courseId, [FromQuery] Guid? lessonId) => tools.Bookmarks(courseId, lessonId);
    [HttpPost("bookmarks")] public Task<BookmarkDto> AddBookmark(BookmarkRequest req) => tools.AddBookmark(req);
    [HttpDelete("bookmarks/{id:guid}")]
    public async Task<IActionResult> DeleteBookmark(Guid id) { await tools.DeleteBookmark(id); return NoContent(); }

    // ---------- continue learning ----------
    [HttpGet("continue-learning")]
    public Task<List<ContinueLearningDto>> ContinueLearning([FromQuery] int limit = 10) => tools.ContinueLearning(limit);
}
