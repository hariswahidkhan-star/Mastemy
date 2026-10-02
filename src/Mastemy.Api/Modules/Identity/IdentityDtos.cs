using Mastemy.Api.Domain;

namespace Mastemy.Api.Modules.Identity;

public record RegisterRequest(string? Email, string? Password, string? DisplayName, string? PreferredLanguage);
public record LoginRequest(string? Email, string? Password);
public record RefreshRequest(string? RefreshToken);
public record UserDto(Guid Id, string Email, string DisplayName, string PreferredLanguage, string[] Roles,
    bool EmailVerified = false, bool MfaEnabled = false, bool RequiresReauth = false)
{
    public static UserDto From(User u, UserSecurity? sec = null) => new(u.Id, u.Email, u.DisplayName, u.PreferredLanguage,
        u.Roles.Select(r => r.Role).OrderBy(r => r, StringComparer.Ordinal).ToArray(),
        EmailVerificationService.IsVerified(u, sec), sec?.MfaEnabledAt is not null);
}

public static class LoginStatus
{
    public const string Ok = "ok", MfaRequired = "mfa_required", MfaEnrollmentRequired = "mfa_enrollment_required";
}

/// <summary>Status "ok": full token pair. "mfa_required": no tokens, post MfaToken + code to /api/auth/mfa/verify.
/// "mfa_enrollment_required": AccessToken is a short-lived restricted token accepted only by /api/auth/mfa enrollment endpoints.</summary>
public record AuthResponse(string? AccessToken, string? RefreshToken, DateTime? ExpiresAt, UserDto User,
    string Status = LoginStatus.Ok, string? MfaToken = null);

public record MfaVerifyRequest(string? MfaToken, string? Code, string? RecoveryCode);
public record MfaCodeRequest(string? Code);
public record MfaDisableRequest(string? Password, string? Code);
public record MfaEnrollmentDto(string Secret, string OtpAuthUri, int Digits, int PeriodSeconds, string Algorithm);
public record MfaEnrolledDto(string[] RecoveryCodes, AuthResponse Session);
public record MfaStatusDto(bool Enabled, DateTime? EnabledAt, int RemainingRecoveryCodes, bool Required);
public record RecoveryCodesDto(string[] RecoveryCodes);
public record TokenRequest(string? Token);
public record ForgotPasswordRequest(string? Email);
public record ResetPasswordRequest(string? Token, string? NewPassword);
public record ChangePasswordRequest(string? CurrentPassword, string? NewPassword);
public record MessageDto(string Message);
public record SessionDto(Guid Id, DateTime CreatedAt, DateTime LastUsedAt, DateTime ExpiresAt, string UserAgent, string IpAddress,
    string LastIpAddress, bool MfaAuthenticated, bool Current);

public record PagedResult<T>(IReadOnlyList<T> Items, int Total, int Page, int PageSize);
public record SettingValueRequest(bool? Value);
public record SetRolesRequest(string[]? Roles);
public record SuspendRequest(bool? Suspended);
public record AdminUserDto(Guid Id, string Email, string DisplayName, string PreferredLanguage, string[] Roles,
    bool IsSuspended, DateTime? LockoutUntil, DateTime CreatedAt, bool EmailVerified = false, bool MfaEnabled = false,
    bool SignInAgainRequired = false, string? Notice = null);
public record UserLookupDto(Guid Id, string DisplayName, string MaskedEmail, bool IsSuspended);
public record AuditLogDto(long Id, Guid? ActorId, string Action, string EntityType, string EntityId, string? Details, DateTime CreatedAt);

public record CreateInvitationRequest(string? Email);
public record InvitationCreatedDto(Guid Id, string Email, string Code, DateTime ExpiresAt);
public record SubmitApplicationRequest(string? Headline, string? Bio, string? ExpertiseEvidence, string? TestVideoUrl,
    bool AgreementAccepted, string? InvitationCode);
public record DecisionRequest(string? Decision, string? Notes);
public record ApplicationDto(Guid Id, Guid UserId, string Headline, string Bio, string ExpertiseEvidence, string TestVideoUrl,
    string? TestVideoId, bool AgreementAccepted, string AgreementVersion, ApplicationStatus Status, string? ReviewerNotes,
    Guid? ReviewedBy, DateTime CreatedAt, DateTime? ReviewedAt, string? ApplicantName = null, string? ApplicantEmail = null)
{
    public static ApplicationDto From(InstructorApplication a, User? applicant = null) => new(a.Id, a.UserId, a.Headline, a.Bio,
        a.ExpertiseEvidence, a.TestVideoUrl, a.TestVideoId, a.AgreementAccepted, a.AgreementVersion, a.Status, a.ReviewerNotes,
        a.ReviewedBy, a.CreatedAt, a.ReviewedAt, applicant?.DisplayName, applicant?.Email);
}
public record OnboardingStatusDto(bool RegistrationOpen, bool InviteOnly, bool Paused, ApplicationDto? MyApplication);
