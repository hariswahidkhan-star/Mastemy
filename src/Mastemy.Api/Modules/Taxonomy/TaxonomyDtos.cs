using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Catalog;

namespace Mastemy.Api.Modules.Taxonomy;

// ---------- Skills ----------
public record SkillDto(int Id, string Code, string NameEn, string NameAr, int? ParentId, bool IsActive);
public record SkillUpsertRequest(string Code, string NameEn, string? NameAr, int? ParentId, bool? IsActive);
public record CourseSkillsRequest(string[] Codes);
public record UnknownSkillCodeDto(string Code, int QuestionCount);

// ---------- Certifications ----------
public record IssuerDto(Guid Id, string Name, string? WebsiteUrl, string Country);
public record IssuerUpsertRequest(string Name, string? WebsiteUrl, string? Country);

public record CertificationUpsertRequest(Guid IssuerId, string Title, string? Slug, string? Jurisdiction, string? ExamCode,
    string? LevelOrPart, string? Version, DateTime? EffectiveFrom, DateTime? EffectiveTo, string? Prerequisites,
    string? OfficialSourceUrl, DateTime? LastCheckedAt, string? EvidenceNotes, string? RenewalInfo, string? RightsNotes,
    CertificationKind Kind, bool? HasNonMcqTasks, string? NonMcqDisclosure, Guid? ReplacedById);

public record CertificationStateRequest(CertificationState State, string? Notes);

public record CertificationAdminDto(Guid Id, Guid IssuerId, string IssuerName, string Slug, string Title, string Jurisdiction,
    string ExamCode, string LevelOrPart, string Version, DateTime? EffectiveFrom, DateTime? EffectiveTo, string Prerequisites,
    string OfficialSourceUrl, DateTime? LastCheckedAt, string EvidenceNotes, string RenewalInfo, string RightsNotes,
    CertificationKind Kind, CertificationState State, bool HasNonMcqTasks, string NonMcqDisclosure, Guid? ReplacedById,
    Guid? ReviewerId, DateTime? VerifiedAt, Guid? LastEditedBy, DateTime? StaleFlaggedAt, bool IsStale, bool PubliclyVisible,
    DateTime UpdatedAt, IReadOnlyList<ObjectiveDto> Objectives);

public record PublicCertificationDto(Guid Id, string Slug, string Title, string IssuerName, string Jurisdiction, string ExamCode,
    string LevelOrPart, string Version, DateTime? EffectiveFrom, DateTime? EffectiveTo, string Prerequisites, string OfficialSourceUrl,
    DateTime LastCheckedAt, string RenewalInfo, CertificationKind Kind, CertificationState State, string? NonMcqDisclosure,
    string? ReplacedBySlug, IReadOnlyList<ObjectiveDto> Objectives, IReadOnlyList<CourseCardDto> PreparationCourses);

public record PublicCertificationSummaryDto(Guid Id, string Slug, string Title, string IssuerName, string Jurisdiction, string ExamCode,
    string LevelOrPart, CertificationKind Kind, CertificationState State, DateTime LastCheckedAt, int PreparationCourseCount);

public record ObjectiveDto(Guid Id, string Code, string Title, decimal WeightPercent, int SortOrder);
public record ObjectiveUpsertRequest(string Code, string Title, decimal WeightPercent, int? SortOrder);
public record MappingRequest(Guid[] Ids);

public record CoverageObjectiveDto(Guid ObjectiveId, string Code, string Title, decimal WeightPercent, int LessonCount,
    int ActiveQuestionCount, bool Gap, string[] Gaps);
public record CoverageReportDto(Guid CertificationId, string CertificationTitle, Guid? CourseId, int ObjectiveCount, int GapCount,
    decimal CoveredWeightPercent, IReadOnlyList<CoverageObjectiveDto> Objectives);

// ---------- Pathways / collections / home ----------
public record PathwayUpsertRequest(string Slug, string TitleEn, string? TitleAr, string? DescriptionEn, string? DescriptionAr,
    CourseLevel Level, int? CategoryId, bool IsPublished, int? SortOrder, Guid[]? CourseIds, string[]? SkillCodes);
public record PathwaySummaryDto(Guid Id, string Slug, string TitleEn, string TitleAr, string DescriptionEn, string DescriptionAr,
    CourseLevel Level, int CourseCount, int TotalDurationSeconds, string[] Skills);
public record PathwayDetailDto(Guid Id, string Slug, string TitleEn, string TitleAr, string DescriptionEn, string DescriptionAr,
    CourseLevel Level, IReadOnlyList<SkillDto> Skills, IReadOnlyList<CourseCardDto> Courses);
public record PathwayAdminDto(Guid Id, string Slug, string TitleEn, string TitleAr, string DescriptionEn, string DescriptionAr,
    CourseLevel Level, int? CategoryId, bool IsPublished, int SortOrder, Guid[] CourseIds, string[] SkillCodes, DateTime UpdatedAt);
public record PathwayEnrollResultDto(Guid PathwayId, int Enrolled, int AlreadyEnrolled, Guid[] CourseIds);

public record CollectionUpsertRequest(string Slug, string TitleEn, string? TitleAr, CollectionKind Kind, int? CategoryId,
    DateTime? ActiveFrom, DateTime? ActiveTo, int? SortOrder, Guid[]? CourseIds);
public record CollectionAdminDto(Guid Id, string Slug, string TitleEn, string TitleAr, CollectionKind Kind, int? CategoryId,
    DateTime? ActiveFrom, DateTime? ActiveTo, int SortOrder, Guid[] CourseIds, bool ActiveNow);
public record CollectionDto(Guid Id, string Slug, string TitleEn, string TitleAr, CollectionKind Kind, IReadOnlyList<CourseCardDto> Courses);

public record BestsellerCardDto(CourseCardDto Course, int DistinctBuyers, bool BestsellerLabel);
public record HomeDto(IReadOnlyList<CollectionDto> Featured, IReadOnlyList<CourseCardDto> New, IReadOnlyList<CourseCardDto> RecentlyUpdated,
    IReadOnlyList<CourseCardDto> AiSkills, IReadOnlyList<CourseCardDto> CertificationPreparation,
    IReadOnlyList<PathwaySummaryDto> BeginnerPathways, IReadOnlyList<BestsellerCardDto> Bestselling, string BestsellerRule);
public record AcademyDto(CategoryDto Category, IReadOnlyList<PathwaySummaryDto> Pathways, IReadOnlyList<CollectionDto> Featured,
    IReadOnlyList<CourseCardDto> Courses);
public record BestsellerRunDto(int CoursesConsidered, int Eligible, DateTime WindowStart, DateTime ComputedAt);

// ---------- Instructors ----------
/// <summary>Headline/Bio come from the instructor's account profile and are present only when they opted into a public profile.</summary>
public record InstructorSummaryDto(Guid Id, string DisplayName, int LiveCourseCount, decimal? RatingAverage, int RatingCount, string? Headline = null);
public record InstructorProfileDto(Guid Id, string DisplayName, int LiveCourseCount, decimal? RatingAverage, int RatingCount,
    IReadOnlyList<CourseCardDto> Courses, string? Headline = null, string? Bio = null);

// ---------- Objective mappings / linked courses / bestsellers / notes library ----------
public record ObjectiveMappingDto(Guid ObjectiveId, string Code, string Title, IReadOnlyList<Guid> LessonIds, IReadOnlyList<Guid> QuestionIds);
public record CertificationMappingsDto(Guid CertificationId, Guid CourseId, bool Linked, IReadOnlyList<ObjectiveMappingDto> Objectives);
public record LinkedCourseDto(Guid CourseId, string Slug, string Title, CourseStatus Status, bool IsLive, DateTime LinkedAt);
public record BestsellerRowDto(Guid CourseId, string CourseTitle, string CourseSlug, int DistinctBuyers, decimal NetRevenue, bool Eligible,
    DateTime WindowStart, DateTime ComputedAt);
public record NotesLibraryItemDto(CourseCardDto Course, bool HasNotes, int LessonsWithNotes);

// ---------- Backlog ----------
public record CourseIdeaUpsertRequest(string Title, string? Audience, string? Rationale, string? DemandEvidence, string? Group,
    Guid? OwnerId, Guid? UpdateOwnerId, Guid? LinkedCourseId, Guid[]? CertificationIds, string? MaintenanceCostNote, int? PriorityScore);
public record CourseIdeaStateRequest(CourseIdeaState State, string? Notes);
public record CourseIdeaDto(Guid Id, string Title, string Audience, string Rationale, string DemandEvidence, string Group,
    CourseIdeaState State, Guid? OwnerId, Guid? UpdateOwnerId, Guid? LinkedCourseId, Guid[] CertificationIds,
    string MaintenanceCostNote, int PriorityScore, int? RoadmapRank, DateTime CreatedAt, DateTime UpdatedAt);
public record RoadmapImportRequest(string? Markdown);
public record RoadmapImportResultDto(int Parsed, int Created, int Skipped);
