using Mastemy.Api.Domain;

namespace Mastemy.Api.Modules.Catalog;

public record PagedResult<T>(IReadOnlyList<T> Items, int Total, int Page, int PageSize);

// ---------- Public ----------
public record CategoryDto(int Id, string Slug, string NameEn, string NameAr, int? ParentId, bool IsAcademy, int CourseCount);

public record CourseCardDto(Guid Id, string Slug, string Code, string Title, string Subtitle, CourseLevel Level, string Language,
    string[] Categories, string[] Instructors, int VideoCount, int TotalDurationSeconds, decimal? RatingAverage, int RatingCount,
    DateTime? PublishedAt, DateTime UpdatedAt);

public record PublicLessonDto(Guid Id, string Title, int DurationSeconds, bool IsPreview, bool HasVideo);
public record PublicModuleDto(Guid Id, string Title, IReadOnlyList<PublicLessonDto> Lessons);
public record InstructorDto(Guid UserId, string DisplayName, CourseInstructorRole Role);
public record PackageDto(Guid Id, string Title, string Contents, decimal Price, string Currency, int AccessDays);

public record CourseDetailDto(Guid Id, string Slug, string Code, string Title, string Subtitle, string Description, string Audience,
    string Prerequisites, string[] Outcomes, string Language, CourseLevel Level, CourseStatus Status, string CredentialType,
    decimal PassThresholdPercent, string? PromoVideoId, string[] Categories, IReadOnlyList<PublicModuleDto> Modules,
    int VideoCount, int QuestionCount, int TotalDurationSeconds, IReadOnlyList<InstructorDto> Instructors,
    IReadOnlyList<PackageDto> Packages, DateTime? ReviewedAt, DateTime? PublishedAt, DateTime UpdatedAt,
    decimal? RatingAverage, int RatingCount);

// ---------- Studio ----------
public record CreateCourseRequest(string Title, string? Subtitle, string? Description, string? Audience, string? Prerequisites,
    string[]? Outcomes, string? Language, CourseLevel? Level, int[]? CategoryIds);

public record UpdateCourseRequest(string Title, string? Subtitle, string? Description, string? Audience, string? Prerequisites,
    string[]? Outcomes, string? Language, CourseLevel? Level, int[]? CategoryIds, string? PromoVideoId,
    string? CredentialType, decimal? PassThresholdPercent);

public record TitleRequest(string Title);
public record LessonCreateRequest(string Title, string? Objective, bool? IsPreview);
public record LessonUpdateRequest(string Title, string? Objective, bool? IsPreview);
public record ReorderRequest(Guid[] Ids);
public record LessonNotesRequest(string? NotesMarkdown, string? PremiumNotesMarkdown);
public record CoInstructorRequest(string Email, CourseInstructorRole Role, decimal RevenueSharePercent);

public record StudioCourseSummaryDto(Guid Id, string Code, string Slug, string Title, CourseStatus Status, CourseInstructorRole? MyRole,
    DateTime UpdatedAt, DateTime? PublishedAt);

public record StudioLessonDto(Guid Id, string Code, string Title, string Objective, int SortOrder, bool IsPreview,
    Guid? VideoAssetId, VideoStatus? VideoStatus, string? YouTubeVideoId, int DurationSeconds,
    string NotesMarkdown, string? PremiumNotesMarkdown, int NotesVersion);
public record StudioModuleDto(Guid Id, string Code, string Title, int SortOrder, IReadOnlyList<StudioLessonDto> Lessons);
public record StudioInstructorDto(Guid UserId, string DisplayName, string Email, CourseInstructorRole Role, decimal RevenueSharePercent);

public record StudioCourseDto(Guid Id, string Code, string Slug, string Title, string Subtitle, string Description, string Audience,
    string Prerequisites, string[] Outcomes, string Language, CourseLevel Level, CourseStatus Status, string CredentialType,
    decimal PassThresholdPercent, string? PromoVideoId, int[] CategoryIds, IReadOnlyList<StudioModuleDto> Modules,
    IReadOnlyList<StudioInstructorDto> Instructors, bool Editable, DateTime CreatedAt, DateTime UpdatedAt,
    DateTime? ReviewedAt, DateTime? PublishedAt);

public record ValidationResultDto(bool Ok, IReadOnlyList<string> Issues);

// ---------- Review ----------
public record ReviewQueueItemDto(Guid Id, string Code, string Slug, string Title, CourseStatus Status, string[] Instructors,
    bool IsMyCourse, DateTime UpdatedAt);
public record ReviewDecisionRequest(string Decision, string? Notes);
public record ReviewCommentRequest(Guid? LessonId, Guid? QuestionId, int? VideoTimestampSeconds, string Body);
public record ReviewCommentDto(Guid Id, Guid? LessonId, Guid? QuestionId, int? VideoTimestampSeconds, Guid AuthorId,
    string AuthorName, string Body, DateTime CreatedAt);
public record CourseStatusDto(Guid Id, CourseStatus Status, DateTime? ReviewedAt, DateTime? PublishedAt);
