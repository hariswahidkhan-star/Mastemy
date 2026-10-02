using Mastemy.Api.Modules.Identity;
using Mastemy.Api.Modules.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace Mastemy.Api.Modules.Enterprise;

[ApiController]
[Authorize]
[Route("api/orgs/{id:guid}")]
public class OrgPhase2Controller(EnterprisePhase2Service svc, SsoConfigService sso) : ControllerBase
{
    [HttpGet("pathway-assignments")] public Task<List<PathwayAssignmentDto>> Pathways(Guid id) => svc.PathwayAssignments(id);
    [HttpPost("pathway-assignments")] public Task<PathwayAssignmentDto> AssignPathway(Guid id, PathwayAssignmentInput input) => svc.AssignPathway(id, input);

    [HttpDelete("pathway-assignments/{assignmentId:guid}")]
    public async Task<IActionResult> Unassign(Guid id, Guid assignmentId) { await svc.DeletePathwayAssignment(id, assignmentId); return NoContent(); }

    [HttpGet("materials")] public Task<List<OrgMaterialDto>> Materials(Guid id) => svc.Materials(id);

    /// <summary>multipart/form-data with one "file" part; title and department in the query string.</summary>
    [HttpPost("materials")]
    [DisableRequestSizeLimit]
    [DisableFormValueModelBinding]
    public async Task<IActionResult> Upload(Guid id, [FromQuery] string? title, [FromQuery] string? department, CancellationToken ct)
    {
        var dto = await MultipartUpload.WithFile(Request, svc.MaxMaterialBytes, (name, body, c) => svc.UploadMaterial(id, title, department, name, body, c), ct);
        return StatusCode(201, dto);
    }

    [HttpGet("materials/{materialId:guid}/download")]
    public async Task<IActionResult> Download(Guid id, Guid materialId)
    {
        var d = await svc.DownloadMaterial(id, materialId);
        Response.Headers[HeaderNames.XContentTypeOptions] = "nosniff";
        Response.Headers[HeaderNames.ContentSecurityPolicy] = "default-src 'none'; sandbox";
        Response.Headers[HeaderNames.CacheControl] = "private, no-store";
        return File(d.Content, d.ContentType, d.FileName, enableRangeProcessing: true);
    }

    [HttpDelete("materials/{materialId:guid}")]
    public async Task<IActionResult> DeleteMaterial(Guid id, Guid materialId, CancellationToken ct) { await svc.DeleteMaterial(id, materialId, ct); return NoContent(); }

    [HttpGet("seat-requests")] public Task<List<SeatRequestDto>> SeatRequests(Guid id) => svc.OrgSeatRequests(id);
    [HttpPost("seat-requests")] public async Task<IActionResult> RequestSeats(Guid id, SeatRequestInput input) => StatusCode(201, await svc.RequestSeats(id, input));
    [HttpGet("enterprise-orders")] public Task<List<EnterpriseOrderDto>> Orders(Guid id) => svc.OrgOrders(id);

    [HttpGet("sso")] public Task<SsoConfigDto> GetSso(Guid id) => sso.Get(id);
    [HttpPut("sso")] public Task<SsoConfigDto> PutSso(Guid id, SsoConfigInput input) => sso.Put(id, input);
    [HttpDelete("sso")] public async Task<IActionResult> DeleteSso(Guid id) { await sso.Delete(id); return NoContent(); }
}

[ApiController]
[Authorize(Policy = "Staff")]
[Route("api/admin/enterprise")]
public class AdminEnterpriseController(EnterprisePhase2Service svc) : ControllerBase
{
    [HttpGet("seat-requests")] public Task<List<SeatRequestDto>> SeatRequests([FromQuery] string? status) => svc.AllSeatRequests(status);
    [HttpPost("seat-requests/{id:guid}/reject")] public Task<SeatRequestDto> Reject(Guid id, RejectSeatRequestInput input) => svc.RejectSeatRequest(id, input);
    [HttpGet("orders")] public Task<List<EnterpriseOrderDto>> Orders() => svc.AllOrders();
    [HttpPost("orders")] public async Task<IActionResult> Create(EnterpriseOrderInput input) => StatusCode(201, await svc.CreateOrder(input));
    [HttpPost("orders/{id:guid}/mark-paid")] public Task<EnterpriseOrderDto> MarkPaid(Guid id, MarkPaidInput input) => svc.MarkPaid(id, input);
}

[ApiController]
[AllowAnonymous]
[Route("api/sso")]
public class SsoController(SsoLoginService svc, Identity.RefreshCookies cookies) : ControllerBase
{
    /// <summary>Redirects the browser to the organization's identity provider.</summary>
    [HttpGet("{orgSlug}/start")]
    public async Task<IActionResult> Start(string orgSlug, [FromQuery] string? returnTo, CancellationToken ct) =>
        Redirect(await svc.Start(orgSlug, returnTo, ct));

    /// <summary>IdP redirect target. Always redirects to Sso:CompletionUrl with ?handoff=… or ?error=….</summary>
    [HttpGet("callback")]
    public async Task<IActionResult> Callback([FromQuery] string? code, [FromQuery] string? state, [FromQuery] string? error, CancellationToken ct)
    {
        Response.Headers[HeaderNames.CacheControl] = "no-store";
        return Redirect(await svc.Callback(code, state, error, ct));
    }

    [HttpPost("exchange")]
    [Microsoft.AspNetCore.RateLimiting.EnableRateLimiting("auth")]
    // Browser sessions use the HttpOnly refresh cookie, same as password login.
    public async Task<AuthResponse> Exchange(SsoExchangeInput input, CancellationToken ct) => cookies.Issue(Response, await svc.Exchange(input, ct));
}
