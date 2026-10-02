namespace Mastemy.Api.Modules.Enterprise;

public record OrgInput(string Name, string Slug, int SeatLimit);
public record OrgUpdateInput(string? Name, string? Slug, int? SeatLimit);
public record OrgDto(Guid Id, string Name, string Slug, int SeatLimit, int SeatsUsed, bool IsActive, DateTime CreatedAt);

public record AddMemberInput(string Email, string? Role, string? Department);
public record UpdateMemberInput(string? Role, string? Department);
public record MemberDto(Guid UserId, string Email, string DisplayName, string Role, string Department, DateTime JoinedAt);

public record BulkMembersInput(string Csv, string? Department);
public record BulkRowResult(int Line, string Email, string? Error);
public record BulkPreviewDto(int Total, int Valid, int SeatsAvailable, bool CanCommit, List<BulkRowResult> Rows);

public record AssignmentInput(Guid CourseId, Guid? UserId, string? Department, DateTime? DueAt, bool GrantsPremium);
public record AssignmentDto(Guid Id, Guid CourseId, string CourseTitle, string Scope, Guid? UserId, string? Department,
    bool GrantsPremium, DateTime? DueAt, DateTime CreatedAt);

public record ProgressRowDto(Guid UserId, string Email, string DisplayName, string Department, Guid CourseId, string CourseTitle,
    int CompletedLessons, int TotalLessons, decimal ProgressPercent, decimal? BestScorePercent, bool Passed,
    string? CertificateCode, DateTime? DueAt, bool Overdue);

public record MyOrgAssignmentDto(Guid AssignmentId, Guid CourseId, string CourseTitle, string CourseSlug, bool GrantsPremium, DateTime? DueAt, bool Overdue);
public record MyOrgDto(Guid Id, string Name, string Slug, string Role, string Department, List<MyOrgAssignmentDto> Assignments);
