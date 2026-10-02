using Mastemy.Api.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Questions;

[ApiController]
[Authorize]
public class QuestionsController(QuestionService questions, QuestionImportService import) : ControllerBase
{
    private const string XlsxType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    [HttpGet("api/studio/courses/{courseId:guid}/questions")]
    public Task<Paged<QuestionDto>> List(Guid courseId, [FromQuery] QuestionState? state, [FromQuery] string? q, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
        => questions.List(courseId, state, q, page, pageSize);

    [HttpPost("api/studio/courses/{courseId:guid}/questions")]
    public async Task<ActionResult<QuestionDto>> Create(Guid courseId, QuestionInput input)
    {
        var dto = await questions.Create(courseId, input);
        return CreatedAtAction(nameof(Get), new { id = dto.Id }, dto);
    }

    [HttpGet("api/studio/questions/{id:guid}")]
    public Task<QuestionDetailDto> Get(Guid id) => questions.Get(id);

    [HttpPut("api/studio/questions/{id:guid}")]
    public Task<QuestionDto> Update(Guid id, QuestionInput input) => questions.Update(id, input);

    [HttpPost("api/studio/questions/{id:guid}/state")]
    public Task<QuestionDto> State(Guid id, StateChangeInput input) => questions.ChangeState(id, input.State);

    /// <summary>Column-mapping step: headers, suggested mapping and sample rows (CSV/XLSX). Nothing is stored.</summary>
    [HttpPost("api/studio/courses/{courseId:guid}/questions/import/inspect")]
    [RequestSizeLimit(QuestionImportService.MaxFileBytes + 64 * 1024)]
    [RequestFormLimits(MultipartBodyLengthLimit = QuestionImportService.MaxFileBytes + 64 * 1024)]
    public async Task<ImportInspectResult> Inspect(Guid courseId, IFormFile file)
    {
        await using var s = file.OpenReadStream();
        return await import.Inspect(courseId, s, file.Length, file.FileName ?? "");
    }

    [HttpPost("api/studio/courses/{courseId:guid}/questions/import/preview")]
    [RequestSizeLimit(QuestionImportService.MaxFileBytes + 64 * 1024)]
    [RequestFormLimits(MultipartBodyLengthLimit = QuestionImportService.MaxFileBytes + 64 * 1024)]
    public async Task<ImportPreviewResult> Preview(Guid courseId, IFormFile file, [FromForm] string? mode, [FromForm] string? idempotencyKey,
        [FromForm] string? mapping)
    {
        await using var s = file.OpenReadStream();
        return await import.Preview(courseId, s, file.Length, file.FileName ?? "", mode, idempotencyKey, mapping);
    }

    /// <summary>200 when committed inline; 202 when the batch (more than Questions:QueuedImportThresholdRows rows) was queued.</summary>
    [HttpPost("api/studio/courses/{courseId:guid}/questions/import/{batchId:guid}/commit")]
    public async Task<ActionResult<ImportCommitResult>> Commit(Guid courseId, Guid batchId)
    {
        var r = await import.Commit(courseId, batchId);
        return r.Status is "Queued" or "Processing" ? Accepted($"/api/studio/courses/{courseId}/questions/import/{batchId}", r) : Ok(r);
    }

    [HttpGet("api/studio/courses/{courseId:guid}/questions/import/{batchId:guid}")]
    public Task<ImportStatusResult> ImportStatus(Guid courseId, Guid batchId) => import.Status(courseId, batchId);

    [HttpGet("api/studio/courses/{courseId:guid}/questions/import/{batchId:guid}/errors.csv")]
    public async Task<IActionResult> Errors(Guid courseId, Guid batchId)
        => File(await import.ErrorsCsv(courseId, batchId), "text/csv; charset=utf-8", $"import-{batchId:N}-errors.csv");

    [HttpGet("api/studio/courses/{courseId:guid}/questions/export.csv")]
    public async Task<IActionResult> Export(Guid courseId)
        => File(await import.Export(courseId), "text/csv; charset=utf-8", $"questions-{courseId:N}.csv");

    [HttpGet("api/studio/courses/{courseId:guid}/questions/export.xlsx")]
    public async Task<IActionResult> ExportXlsx(Guid courseId)
        => File(await import.ExportXlsx(courseId), XlsxType, $"questions-{courseId:N}.xlsx");

    [AllowAnonymous]
    [HttpGet("api/templates/mcq-import.csv")]
    public IActionResult Template() => File(QuestionImportService.Template(), "text/csv; charset=utf-8", "mcq-import-template.csv");

    [AllowAnonymous]
    [HttpGet("api/templates/mcq-import.xlsx")]
    public IActionResult TemplateXlsx() => File(QuestionImportService.TemplateXlsx(), XlsxType, "mcq-import-template.xlsx");
}

[ApiController]
[Authorize]
public class CaseGroupsController(CaseGroupService svc) : ControllerBase
{
    [HttpGet("api/studio/courses/{courseId:guid}/case-groups")]
    public Task<List<CaseGroupDto>> List(Guid courseId) => svc.List(courseId);

    [HttpPost("api/studio/courses/{courseId:guid}/case-groups")]
    public Task<CaseGroupDto> Create(Guid courseId, CaseGroupInput input) => svc.Create(courseId, input);

    [HttpGet("api/studio/case-groups/{id:guid}")]
    public Task<CaseGroupDto> Get(Guid id) => svc.Get(id);

    [HttpPut("api/studio/case-groups/{id:guid}")]
    public Task<CaseGroupDto> Update(Guid id, CaseGroupInput input) => svc.Update(id, input);

    [HttpDelete("api/studio/case-groups/{id:guid}")]
    public async Task<IActionResult> Delete(Guid id) { await svc.Delete(id); return NoContent(); }
}

[ApiController]
[Authorize]
public class QuestionReuseController(QuestionReuseService svc, QuestionChallengeService challenges) : ControllerBase
{
    [HttpPost("api/studio/courses/{courseId:guid}/questions/copy")]
    public Task<CopyQuestionsResult> Copy(Guid courseId, CopyQuestionsInput input) => svc.Copy(courseId, input);

    [HttpGet("api/studio/shared-questions")]
    public Task<Paged<SharedQuestionDto>> Shared([FromQuery] string? q, [FromQuery] int page = 1, [FromQuery] int pageSize = 50) => svc.Shared(q, page, pageSize);

    [Authorize(Policy = "Staff")]
    [HttpPut("api/admin/questions/{id:guid}/reusable")]
    public Task<QuestionDto> Reusable(Guid id, ReusableInput input) => svc.SetReusable(id, input.Reusable);

    [HttpGet("api/review/question-challenges")]
    public Task<List<ChallengeDto>> Queue([FromQuery] ChallengeStatus? status, [FromQuery] Guid? courseId) => challenges.Queue(status, courseId);

    [HttpPost("api/review/question-challenges/{id:guid}/resolve")]
    public Task<ChallengeDto> Resolve(Guid id, ResolveChallengeInput input) => challenges.Resolve(id, input);

    [HttpGet("api/studio/courses/{courseId:guid}/question-challenges")]
    public Task<List<ChallengeDto>> ForCourse(Guid courseId, [FromQuery] ChallengeStatus? status) => challenges.ForCourse(courseId, status);

    [HttpGet("api/me/question-challenges")]
    public Task<List<MyChallengeDto>> Mine() => challenges.MyChallenges();
}
