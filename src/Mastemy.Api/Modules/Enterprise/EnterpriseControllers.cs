using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Enterprise;

[ApiController]
[Authorize(Policy = "Staff")]
[Route("api/admin/orgs")]
public class AdminOrgsController(EnterpriseService svc) : ControllerBase
{
    [HttpGet] public Task<List<OrgDto>> List() => svc.ListOrgs();
    [HttpPost] public Task<OrgDto> Create(OrgInput input) => svc.CreateOrg(input);
    [HttpPut("{id:guid}")] public Task<OrgDto> Update(Guid id, OrgUpdateInput input) => svc.UpdateOrg(id, input);
    [HttpPost("{id:guid}/deactivate")] public Task<OrgDto> Deactivate(Guid id) => svc.SetActive(id, false);
    [HttpPost("{id:guid}/reactivate")] public Task<OrgDto> Reactivate(Guid id) => svc.SetActive(id, true);
}

[ApiController]
[Authorize]
[Route("api/orgs/{id:guid}")]
public class OrgsController(EnterpriseService svc, EnterpriseReportService reports) : ControllerBase
{
    [HttpGet] public Task<OrgDto> Get(Guid id) => svc.GetOrg(id);

    [HttpGet("members")] public Task<List<MemberDto>> Members(Guid id) => svc.Members(id);
    /// <summary>Invites an email address (uniform response; membership is created on acceptance).</summary>
    [HttpPost("members")] public Task<InvitationCreatedDto> Invite(Guid id, AddMemberInput input) => svc.Invite(id, input);
    [HttpGet("invitations")] public Task<List<InvitationDto>> Invitations(Guid id) => svc.Invitations(id);

    [HttpDelete("invitations/{invitationId:guid}")]
    public async Task<IActionResult> Revoke(Guid id, Guid invitationId) { await svc.RevokeInvitation(id, invitationId); return NoContent(); }
    [HttpPatch("members/{userId:guid}")] public Task<MemberDto> Update(Guid id, Guid userId, UpdateMemberInput input) => svc.UpdateMember(id, userId, input);

    [HttpDelete("members/{userId:guid}")]
    public async Task<IActionResult> Remove(Guid id, Guid userId) { await svc.RemoveMember(id, userId); return NoContent(); }

    [HttpPost("members/bulk/preview")] public Task<BulkPreviewDto> BulkPreview(Guid id, BulkMembersInput input) => svc.BulkPreview(id, input);
    [HttpPost("members/bulk")] public Task<BulkInviteResultDto> BulkCommit(Guid id, BulkMembersInput input) => svc.BulkCommit(id, input);

    [HttpGet("assignments")] public Task<List<AssignmentDto>> Assignments(Guid id) => svc.Assignments(id);
    [HttpPost("assignments")] public Task<AssignmentDto> Assign(Guid id, AssignmentInput input) => svc.CreateAssignment(id, input);

    [HttpDelete("assignments/{assignmentId:guid}")]
    public async Task<IActionResult> Unassign(Guid id, Guid assignmentId) { await svc.DeleteAssignment(id, assignmentId); return NoContent(); }

    [HttpGet("reports/progress")]
    public async Task<IActionResult> Progress(Guid id, [FromQuery] string? format)
    {
        if (string.Equals(format, "csv", StringComparison.OrdinalIgnoreCase))
            return File(await reports.ProgressCsv(id), "text/csv; charset=utf-8", "progress.csv");
        return Ok(await reports.Progress(id));
    }
}

[ApiController]
[Authorize]
public class MyOrgsController(EnterpriseService svc) : ControllerBase
{
    [HttpGet("api/me/organizations")] public Task<List<MyOrgDto>> Mine() => svc.MyOrganizations();
    [HttpPost("api/org-invitations/accept")] public Task<AcceptedInvitationDto> Accept(AcceptInvitationInput input) => svc.AcceptInvitation(input);
}
