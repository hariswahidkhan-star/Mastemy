using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Mastemy.Api.Modules.Identity;

[ApiController]
[Route("api/auth")]
[AllowWithoutMfa]
public class AuthController(AuthService auth, ICurrentUser me, RefreshCookies cookies) : ControllerBase
{
    [HttpPost("register"), AllowAnonymous, EnableRateLimiting("auth")]
    public async Task<AuthResponse> Register(RegisterRequest req) => cookies.Issue(Response, await auth.Register(req));

    [HttpPost("login"), AllowAnonymous, EnableRateLimiting("auth")]
    public async Task<AuthResponse> Login(LoginRequest req) => cookies.Issue(Response, await auth.Login(req));

    /// <summary>Body token (non-browser clients, Auth:AllowBodyRefreshToken) or the HttpOnly cookie + X-Requested-With: mastemy.</summary>
    [HttpPost("refresh"), AllowAnonymous, EnableRateLimiting("auth")]
    public async Task<AuthResponse> Refresh([FromBody(EmptyBodyBehavior = Microsoft.AspNetCore.Mvc.ModelBinding.EmptyBodyBehavior.Allow)] RefreshRequest? req)
    {
        var token = cookies.Resolve(Request, req?.RefreshToken);
        try { return cookies.Issue(Response, await auth.Refresh(new RefreshRequest(token))); }
        catch (AppException ex) when (ex.Status == 401)
        {
            // The error handler clears the response; clear the dead cookie as the error response starts.
            Response.OnStarting(() => { cookies.Clear(Response); return Task.CompletedTask; });
            throw;
        }
    }

    [HttpPost("logout"), AllowAnonymous]
    public async Task<IActionResult> Logout([FromBody(EmptyBodyBehavior = Microsoft.AspNetCore.Mvc.ModelBinding.EmptyBodyBehavior.Allow)] RefreshRequest? req)
    {
        var token = cookies.Resolve(Request, req?.RefreshToken);
        cookies.Clear(Response);
        await auth.Logout(new RefreshRequest(token));
        return NoContent();
    }

    [HttpGet("me"), Authorize, AllowMfaEnrollmentToken]
    public Task<UserDto> Me() => auth.Me(me.RequireId(), User);
}

[ApiController]
[Route("api/auth/mfa")]
public class MfaController(MfaService mfa, RefreshCookies cookies) : ControllerBase
{
    [HttpGet("status"), Authorize, AllowMfaEnrollmentToken]
    public Task<MfaStatusDto> Status() => mfa.Status();

    [HttpPost("enroll"), Authorize, AllowMfaEnrollmentToken]
    public Task<MfaEnrollmentDto> Enroll() => mfa.BeginEnrollment();

    [HttpPost("enroll/confirm"), Authorize, AllowMfaEnrollmentToken, EnableRateLimiting("auth")]
    public async Task<MfaEnrolledDto> Confirm(MfaCodeRequest req)
    {
        var r = await mfa.ConfirmEnrollment(req);
        return r with { Session = cookies.Issue(Response, r.Session) };
    }

    [HttpPost("verify"), AllowAnonymous, AllowWithoutMfa, EnableRateLimiting("auth")]
    public async Task<AuthResponse> Verify(MfaVerifyRequest req) => cookies.Issue(Response, await mfa.VerifyChallenge(req));

    [HttpPost("recovery-codes"), Authorize, EnableRateLimiting("auth")]
    public Task<RecoveryCodesDto> Regenerate(MfaCodeRequest req) => mfa.RegenerateRecoveryCodes(req);

    [HttpPost("disable"), Authorize, EnableRateLimiting("auth")]
    public async Task<IActionResult> Disable(MfaDisableRequest req) { await mfa.Disable(req); return NoContent(); }
}

[ApiController]
[Route("api/auth")]
public class AccountSecurityController(EmailVerificationService verification, PasswordService passwords, SessionService sessions,
    ICurrentUser me) : ControllerBase
{
    [HttpPost("email/verify"), AllowAnonymous, AllowWithoutMfa, EnableRateLimiting("auth")]
    public async Task<IActionResult> VerifyEmail(TokenRequest req) { await verification.Verify(req.Token); return NoContent(); }

    [HttpPost("email/resend"), Authorize, AllowMfaEnrollmentToken, EnableRateLimiting("auth")]
    public async Task<IActionResult> ResendEmail() { await verification.Resend(me.RequireId(), byStaff: false); return Accepted(); }

    [HttpPost("password/forgot"), AllowAnonymous, AllowWithoutMfa, EnableRateLimiting("auth")]
    public async Task<IActionResult> Forgot(ForgotPasswordRequest req) => Accepted(await passwords.Forgot(req));

    [HttpPost("password/reset"), AllowAnonymous, AllowWithoutMfa, EnableRateLimiting("auth")]
    public async Task<IActionResult> Reset(ResetPasswordRequest req) { await passwords.Reset(req); return NoContent(); }

    [HttpPost("password/change"), Authorize, EnableRateLimiting("auth")]
    public async Task<IActionResult> Change(ChangePasswordRequest req) { await passwords.Change(req); return NoContent(); }

    [HttpGet("sessions"), Authorize]
    public Task<List<SessionDto>> Sessions() => sessions.List();

    [HttpDelete("sessions/{id:guid}"), Authorize]
    public async Task<IActionResult> RevokeSession(Guid id) { await sessions.Revoke(id); return NoContent(); }

    [HttpDelete("sessions"), Authorize]
    public async Task<IActionResult> RevokeAll() { await sessions.RevokeAll(); return NoContent(); }
}

[ApiController]
[Route("api/admin")]
[Authorize(Policy = "Staff")]
public class AdminController(AdminService admin, FeatureFlagService flags, EmailVerificationService verification) : ControllerBase
{
    /// <summary>Minimal picker (trust suspensions etc.): id, display name, masked email. Exact email or id also match.</summary>
    [HttpGet("users/lookup")]
    public Task<List<UserLookupDto>> Lookup([FromQuery] string? q, [FromQuery] int limit = 10) => admin.Lookup(q, limit);

    [HttpGet("users/{id:guid}")]
    public Task<AdminUserDto> GetUser(Guid id) => admin.Get(id);

    [HttpPost("users/{id:guid}/email-verification/resend")]
    public async Task<IActionResult> ResendVerification(Guid id) { await verification.Resend(id, byStaff: true); return Accepted(); }

    [HttpPost("users/{id:guid}/email-verification/mark-verified")]
    public async Task<AdminUserDto> MarkVerified(Guid id) { await verification.MarkVerified(id); return await admin.Get(id); }

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
