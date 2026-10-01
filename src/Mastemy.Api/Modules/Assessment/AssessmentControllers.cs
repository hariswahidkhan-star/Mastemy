using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Mastemy.Api.Modules.Assessment;

[ApiController]
[Authorize]
public class AssessmentStudioController(AssessmentStudioService svc) : ControllerBase
{
    [HttpGet("api/studio/courses/{courseId:guid}/assessments")]
    public Task<List<AssessmentDto>> List(Guid courseId) => svc.List(courseId);

    [HttpPost("api/studio/courses/{courseId:guid}/assessments")]
    public async Task<ActionResult<AssessmentDto>> Create(Guid courseId, AssessmentInput input)
    {
        var dto = await svc.Create(courseId, input);
        return CreatedAtAction(nameof(Get), new { id = dto.Id }, dto);
    }

    [HttpGet("api/studio/assessments/{id:guid}")]
    public Task<AssessmentDto> Get(Guid id) => svc.Get(id);

    [HttpPut("api/studio/assessments/{id:guid}")]
    public Task<AssessmentDto> Update(Guid id, AssessmentInput input) => svc.Update(id, input);

    [HttpDelete("api/studio/assessments/{id:guid}")]
    public async Task<IActionResult> Delete(Guid id) { await svc.Delete(id); return NoContent(); }
}

[ApiController]
[Authorize]
public class AttemptsController(AttemptService svc) : ControllerBase
{
    /// <summary>Assessment summary incl. scoring rules; never includes answer keys. Anonymous access allowed.</summary>
    [AllowAnonymous]
    [HttpGet("api/assessments/{id:guid}")]
    public Task<AssessmentSummaryDto> Summary(Guid id) => svc.Summary(id);

    [HttpPost("api/assessments/{id:guid}/attempts")]
    public Task<AttemptView> Start(Guid id) => svc.Start(id);

    [HttpGet("api/attempts/{id:guid}")]
    public Task<AttemptDetail> Get(Guid id) => svc.Get(id);

    [HttpGet("api/me/attempts")]
    public Task<List<AttemptListItem>> Mine() => svc.Mine();

    [HttpPut("api/attempts/{id:guid}/items/{itemId:guid}")]
    public Task<AttemptItemView> Save(Guid id, Guid itemId, SaveItemInput input) => svc.SaveItem(id, itemId, input);

    [HttpPost("api/attempts/{id:guid}/items/{itemId:guid}/check")]
    public Task<CheckResult> Check(Guid id, Guid itemId) => svc.Check(id, itemId);

    [HttpPost("api/attempts/{id:guid}/submit")]
    public Task<AttemptResult> Submit(Guid id) => svc.Submit(id);
}

[ApiController]
public class CertificatesController(CertificateService svc) : ControllerBase
{
    [AllowAnonymous]
    [EnableRateLimiting("auth")]
    [HttpGet("api/certificates/verify/{code}")]
    public Task<CertificateVerification> Verify(string code) => svc.Verify(code);

    [Authorize]
    [HttpGet("api/me/certificates")]
    public Task<List<MyCertificateDto>> Mine() => svc.Mine();

    [Authorize(Policy = "Staff")]
    [HttpPost("api/admin/certificates/{id:guid}/revoke")]
    public async Task<IActionResult> Revoke(Guid id, RevokeInput input) { await svc.Revoke(id, input.Reason); return NoContent(); }
}
