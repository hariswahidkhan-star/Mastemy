using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Mastemy.Api.Modules.Identity;

[ApiController]
[Route("api/auth")]
public class AuthController(AuthService auth, ICurrentUser me) : ControllerBase
{
    [HttpPost("register"), AllowAnonymous, EnableRateLimiting("auth")]
    public Task<AuthResponse> Register(RegisterRequest req) => auth.Register(req);

    [HttpPost("login"), AllowAnonymous, EnableRateLimiting("auth")]
    public Task<AuthResponse> Login(LoginRequest req) => auth.Login(req);

    [HttpPost("refresh"), AllowAnonymous, EnableRateLimiting("auth")]
    public Task<AuthResponse> Refresh(RefreshRequest req) => auth.Refresh(req);

    [HttpPost("logout"), AllowAnonymous]
    public async Task<IActionResult> Logout(RefreshRequest req) { await auth.Logout(req); return NoContent(); }

    [HttpGet("me"), Authorize]
    public Task<UserDto> Me() => auth.Me(me.RequireId());
}

[ApiController]
[Route("api/admin")]
[Authorize(Policy = "Staff")]
public class AdminController(AdminService admin, FeatureFlagService flags) : ControllerBase
{
    [HttpGet("settings")]
    public Task<Dictionary<string, bool>> GetSettings() => flags.All();

    [HttpPut("settings/{key}"), Authorize(Policy = "SuperAdmin")]
    public async Task<Dictionary<string, bool>> PutSetting(string key, SettingValueRequest req)
    {
        if (req.Value is not { } value) throw AppException.Bad("'value' is required.");
        await flags.Set(key, value);
        return await flags.All();
    }

    [HttpGet("users")]
    public Task<PagedResult<AdminUserDto>> Users([FromQuery] string? q, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => admin.ListUsers(q, page, pageSize);

    [HttpPut("users/{id:guid}/roles"), Authorize(Policy = "SuperAdmin")]
    public Task<AdminUserDto> SetRoles(Guid id, SetRolesRequest req) => admin.SetRoles(id, req);

    [HttpPut("users/{id:guid}/suspend")]
    public Task<AdminUserDto> Suspend(Guid id, SuspendRequest req) => admin.Suspend(id, req);

    [HttpGet("audit")]
    public Task<PagedResult<AuditLogDto>> Audit([FromQuery] string? entityType, [FromQuery] int page = 1, [FromQuery] int pageSize = 50)
        => admin.Audit(entityType, page, pageSize);
}

[ApiController]
public class OnboardingController(OnboardingService onboarding) : ControllerBase
{
    [HttpGet("api/instructor-onboarding/status"), AllowAnonymous]
    public Task<OnboardingStatusDto> Status() => onboarding.Status();

    [HttpPost("api/admin/instructor-invitations"), Authorize(Policy = "Staff")]
    public Task<InvitationCreatedDto> Invite(CreateInvitationRequest req) => onboarding.CreateInvitation(req);

    [HttpPost("api/instructor-applications"), Authorize]
    public Task<ApplicationDto> Apply(SubmitApplicationRequest req) => onboarding.Submit(req);

    [HttpGet("api/admin/instructor-applications"), Authorize(Policy = "Reviewer")]
    public Task<PagedResult<ApplicationDto>> List([FromQuery] string? status, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        => onboarding.List(status, page, pageSize);

    [HttpPost("api/admin/instructor-applications/{id:guid}/decision"), Authorize(Policy = "Reviewer")]
    public Task<ApplicationDto> Decide(Guid id, DecisionRequest req) => onboarding.Decide(id, req);
}
