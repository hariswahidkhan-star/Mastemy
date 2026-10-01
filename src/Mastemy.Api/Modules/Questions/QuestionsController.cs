using Mastemy.Api.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Questions;

[ApiController]
[Authorize]
public class QuestionsController(QuestionService questions, QuestionImportService import) : ControllerBase
{
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

    [HttpPost("api/studio/courses/{courseId:guid}/questions/import/preview")]
    [RequestSizeLimit(QuestionImportService.MaxFileBytes + 64 * 1024)]
    [RequestFormLimits(MultipartBodyLengthLimit = QuestionImportService.MaxFileBytes + 64 * 1024)]
    public async Task<ImportPreviewResult> Preview(Guid courseId, IFormFile file, [FromForm] string? mode, [FromForm] string? idempotencyKey)
    {
        await using var s = file.OpenReadStream();
        return await import.Preview(courseId, s, file.Length, file.FileName ?? "", mode, idempotencyKey);
    }

    [HttpPost("api/studio/courses/{courseId:guid}/questions/import/{batchId:guid}/commit")]
    public Task<ImportCommitResult> Commit(Guid courseId, Guid batchId) => import.Commit(courseId, batchId);

    [HttpGet("api/studio/courses/{courseId:guid}/questions/import/{batchId:guid}/errors.csv")]
    public async Task<IActionResult> Errors(Guid courseId, Guid batchId)
        => File(await import.ErrorsCsv(courseId, batchId), "text/csv; charset=utf-8", $"import-{batchId:N}-errors.csv");

    [HttpGet("api/studio/courses/{courseId:guid}/questions/export.csv")]
    public async Task<IActionResult> Export(Guid courseId)
        => File(await import.Export(courseId), "text/csv; charset=utf-8", $"questions-{courseId:N}.csv");

    [AllowAnonymous]
    [HttpGet("api/templates/mcq-import.csv")]
    public IActionResult Template() => File(QuestionImportService.Template(), "text/csv; charset=utf-8", "mcq-import-template.csv");
}
