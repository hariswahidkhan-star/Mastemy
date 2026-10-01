using Mastemy.Api.Domain;

namespace Mastemy.Api.Modules.Identity;

public record RegisterRequest(string? Email, string? Password, string? DisplayName, string? PreferredLanguage);
public record LoginRequest(string? Email, string? Password);
public record RefreshRequest(string? RefreshToken);
public record UserDto(Guid Id, string Email, string DisplayName, string PreferredLanguage, string[] Roles)
{
    public static UserDto From(User u) => new(u.Id, u.Email, u.DisplayName, u.PreferredLanguage,
        u.Roles.Select(r => r.Role).OrderBy(r => r, StringComparer.Ordinal).ToArray());
}
public record AuthResponse(string AccessToken, string RefreshToken, DateTime ExpiresAt, UserDto User);

public record PagedResult<T>(IReadOnlyList<T> Items, int Total, int Page, int PageSize);
public record SettingValueRequest(bool? Value);
public record SetRolesRequest(string[]? Roles);
public record SuspendRequest(bool? Suspended);
public record AdminUserDto(Guid Id, string Email, string DisplayName, string PreferredLanguage, string[] Roles,
    bool IsSuspended, DateTime? LockoutUntil, DateTime CreatedAt);
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
