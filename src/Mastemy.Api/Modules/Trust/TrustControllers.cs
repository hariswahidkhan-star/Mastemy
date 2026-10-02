using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Trust;

/// <summary>Public complaint intake: signed-in users or anonymous filers with a contact email.</summary>
[ApiController]
[AllowAnonymous]
public class ComplaintsController(TrustService svc, ComplaintRateLimiter limiter) : ControllerBase
{
    [HttpPost("api/complaints")]
    public async Task<IActionResult> File(FileComplaintInput input)
    {
        limiter.Acquire(HttpContext.Connection.RemoteIpAddress);
        return StatusCode(201, await svc.FileComplaint(input));
    }
}

[ApiController]
[Authorize]
public class AppealsController(TrustService svc) : ControllerBase
{
    [HttpPost("api/appeals")]
    public async Task<IActionResult> File(FileAppealInput input) => StatusCode(201, await svc.FileAppeal(input));

    [HttpGet("api/me/appeals")]
    public Task<List<AppealDto>> Mine() => svc.MyAppeals();
}

[ApiController]
[Authorize(Policy = "Staff")]
[Route("api/admin/trust")]
public class TrustAdminController(TrustService svc) : ControllerBase
{
    [HttpGet("complaints")]
    public Task<PagedResult<ComplaintDto>> Complaints([FromQuery] string? status, [FromQuery] string? type, [FromQuery] int page = 1, [FromQuery] int pageSize = 25) =>
        svc.Complaints(status, type, page, pageSize);

    [HttpGet("complaints/{id:guid}")]
    public Task<ComplaintDto> Complaint(Guid id) => svc.Complaint(id);

    [HttpPost("complaints/{id:guid}/resolve")]
    public Task<ComplaintResolutionDto> Resolve(Guid id, ResolveComplaintInput input) => svc.Resolve(id, input);

    [HttpGet("holds")]
    public Task<List<ContentHoldDto>> Holds([FromQuery] bool includeReleased = false) => svc.Holds(includeReleased);

    public record ReleaseInput(string? Note);

    [HttpPost("holds/{id:guid}/release")]
    public Task<ContentHoldDto> Release(Guid id, ReleaseInput input) => svc.ReleaseHold(id, input.Note);

    [HttpGet("suspensions")]
    public Task<List<SuspensionDto>> Suspensions([FromQuery] bool includeEnded = false) => svc.Suspensions(includeEnded);

    [HttpPost("instructors/{userId:guid}/suspend")]
    public Task<SuspensionDto> Suspend(Guid userId, SuspendInput input) => svc.Suspend(userId, input);

    [HttpPost("instructors/{userId:guid}/reinstate")]
    public Task<SuspensionDto> Reinstate(Guid userId, ReinstateInput input) => svc.Reinstate(userId, input);

    [HttpGet("appeals")]
    public Task<PagedResult<AppealDto>> Appeals([FromQuery] string? status, [FromQuery] int page = 1, [FromQuery] int pageSize = 25) =>
        svc.Appeals(status, page, pageSize);

    [HttpPost("appeals/{id:guid}/decision")]
    public Task<AppealDto> Decide(Guid id, DecideAppealInput input) => svc.DecideAppeal(id, input);
}
