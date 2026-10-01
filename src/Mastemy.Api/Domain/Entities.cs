namespace Mastemy.Api.Domain;

// ---------- Identity ----------
public static class Roles
{
    public const string Student = "Student", Instructor = "Instructor", Reviewer = "Reviewer",
        Moderator = "Moderator", Support = "Support", Finance = "Finance", Admin = "Admin", SuperAdmin = "SuperAdmin";
    public static readonly string[] All = [Student, Instructor, Reviewer, Moderator, Support, Finance, Admin, SuperAdmin];
}

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = "";
    public string NormalizedEmail { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string DisplayName { get; set; } = "";
    public string PreferredLanguage { get; set; } = "en";
    public bool IsSuspended { get; set; }
    public int FailedLoginCount { get; set; }
    public DateTime? LockoutUntil { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<UserRole> Roles { get; set; } = [];
}

public class UserRole
{
    public Guid UserId { get; set; }
    public string Role { get; set; } = "";
}

public class RefreshToken
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string TokenHash { get; set; } = "";
    public Guid FamilyId { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime? RevokedAt { get; set; }
    public Guid? ReplacedById { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ---------- Platform / audit ----------
public class PlatformSetting
{
    public string Key { get; set; } = "";
    public string Value { get; set; } = "";
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public Guid? UpdatedBy { get; set; }
}

public class AuditLog
{
    public long Id { get; set; }
    public Guid? ActorId { get; set; }
    public string Action { get; set; } = "";
    public string EntityType { get; set; } = "";
    public string EntityId { get; set; } = "";
    public string? Details { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ---------- Instructor onboarding ----------
public enum ApplicationStatus { Submitted, InReview, ChangesRequested, Approved, Rejected }

public class InstructorApplication
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string Headline { get; set; } = "";
    public string Bio { get; set; } = "";
    public string ExpertiseEvidence { get; set; } = "";
    public string TestVideoUrl { get; set; } = "";
    public string? TestVideoId { get; set; }
    public bool AgreementAccepted { get; set; }
    public string AgreementVersion { get; set; } = "";
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Submitted;
    public string? ReviewerNotes { get; set; }
    public Guid? ReviewedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ReviewedAt { get; set; }
}

public class InstructorInvitation
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; } = "";
    public string CodeHash { get; set; } = "";
    public Guid CreatedBy { get; set; }
    public DateTime ExpiresAt { get; set; }
    public DateTime? UsedAt { get; set; }
}

// ---------- Catalog ----------
public class Category
{
    public int Id { get; set; }
    public string Slug { get; set; } = "";
    public string NameEn { get; set; } = "";
    public string NameAr { get; set; } = "";
    public int? ParentId { get; set; }
    public bool IsAcademy { get; set; }
    public int SortOrder { get; set; }
}

public enum CourseStatus { Draft, InReview, ChangesRequested, Approved, Published, Updating, Archived }
public enum CourseLevel { Beginner, Intermediate, Advanced, Executive }

public class Course
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Code { get; set; } = "";
    public string Slug { get; set; } = "";
    public string Title { get; set; } = "";
    public string Subtitle { get; set; } = "";
    public string Description { get; set; } = "";
    public string Audience { get; set; } = "";
    public string Prerequisites { get; set; } = "";
    public string Outcomes { get; set; } = ""; // newline separated
    public string Language { get; set; } = "en";
    public CourseLevel Level { get; set; }
    public CourseStatus Status { get; set; } = CourseStatus.Draft;
    public Guid OwnerId { get; set; }
    public Guid? YouTubeChannelId { get; set; }
    public string? PromoVideoId { get; set; }
    public string CredentialType { get; set; } = "Knowledge assessment certificate";
    public decimal PassThresholdPercent { get; set; } = 70m;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? PublishedAt { get; set; }
    public DateTime? ReviewedAt { get; set; }
    public List<CourseModule> Modules { get; set; } = [];
    public List<CourseCategory> Categories { get; set; } = [];
    public List<CourseInstructor> Instructors { get; set; } = [];
}

public class CourseCategory { public Guid CourseId { get; set; } public int CategoryId { get; set; } }

public enum CourseInstructorRole { Owner, CoInstructor, Editor }

public class CourseInstructor
{
    public Guid CourseId { get; set; }
    public Guid UserId { get; set; }
    public CourseInstructorRole Role { get; set; }
    public decimal RevenueSharePercent { get; set; }
}

public class CourseModule
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public string Code { get; set; } = "";
    public string Title { get; set; } = "";
    public int SortOrder { get; set; }
    public List<Lesson> Lessons { get; set; } = [];
}

public class Lesson
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ModuleId { get; set; }
    public string Code { get; set; } = "";
    public string Title { get; set; } = "";
    public string Objective { get; set; } = "";
    public int SortOrder { get; set; }
    public bool IsPreview { get; set; }
    public Guid? VideoAssetId { get; set; }
    public VideoAsset? VideoAsset { get; set; }
    public string NotesMarkdown { get; set; } = ""; // instructor study notes (free)
    public string? PremiumNotesMarkdown { get; set; } // gated by premium entitlement
    public int NotesVersion { get; set; } = 1;
}

public class CourseReviewComment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public Guid? LessonId { get; set; }
    public Guid? QuestionId { get; set; }
    public int? VideoTimestampSeconds { get; set; }
    public Guid AuthorId { get; set; }
    public string Body { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ---------- YouTube ----------
public enum ChannelMode { MastemyManaged, InstructorOwned }

public class YouTubeChannel
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string ChannelId { get; set; } = ""; // YouTube UC... id
    public string Title { get; set; } = "";
    public ChannelMode Mode { get; set; }
    public Guid? OwnerUserId { get; set; } // instructor for Mode B
    public bool IsActive { get; set; } = true;
    public string? EncryptedRefreshToken { get; set; }
    public string? GrantedScopes { get; set; }
    public DateTime? AuthorizedAt { get; set; }
    public DateTime? RevokedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum VideoStatus { Draft, AwaitingApproval, AwaitingSourceFile, Uploading, Processing, InContentReview, Ready, Restricted, Failed }

public class VideoAsset
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string YouTubeVideoId { get; set; } = "";
    public Guid? ChannelId { get; set; }
    public string? ObservedChannelId { get; set; }
    public string Title { get; set; } = "";
    public int DurationSeconds { get; set; }
    public VideoStatus Status { get; set; } = VideoStatus.Draft;
    public string? StatusReason { get; set; }
    public string? PrivacyStatus { get; set; }
    public bool? Embeddable { get; set; }
    public Guid UploaderId { get; set; }
    public Guid? VideoOwnerUserId { get; set; }
    public bool RightsDeclared { get; set; }
    public string? RightsDeclarationText { get; set; }
    public bool MetadataEnteredManually { get; set; }
    public DateTime? LastCheckedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum UploadSessionStatus { AwaitingApproval, Approved, AwaitingSourceFile, Uploading, Completed, Cancelled, Failed, Expired }

public class YouTubeUploadSession
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid ChannelId { get; set; }
    public Guid? LessonId { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string PrivacyStatus { get; set; } = "private";
    public bool NotifySubscribers { get; set; }
    public bool SyntheticMediaDisclosed { get; set; }
    public string FileName { get; set; } = "";
    public long FileSize { get; set; }
    public string FileFingerprint { get; set; } = ""; // client-computed hash of first/last chunks + size
    public string? UpstreamSessionUri { get; set; } // never exposed to client
    public long ConfirmedOffset { get; set; }
    public UploadSessionStatus Status { get; set; } = UploadSessionStatus.AwaitingApproval;
    public string? ResultVideoId { get; set; }
    public string? FailureReason { get; set; }
    public Guid? ApprovedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

// ---------- Learning ----------
public class Enrollment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class LessonProgress
{
    public Guid UserId { get; set; }
    public Guid LessonId { get; set; }
    public int PositionSeconds { get; set; }
    public bool Completed { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class LearnerNote
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    // Nullable so a learner's private notes survive removal of the lesson during course revision (spec §12).
    public Guid? LessonId { get; set; }
    public Guid CourseId { get; set; }
    public string LessonTitleSnapshot { get; set; } = "";
    public string CourseTitleSnapshot { get; set; } = "";
    public int? TimestampSeconds { get; set; }
    public string Body { get; set; } = "";
    public string Tags { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

// ---------- Questions ----------
public enum QuestionType { SingleChoice, MultipleSelect }
public enum QuestionState { Draft, Reviewed, Approved, Active, Retired }
public enum Difficulty { Easy, Medium, Hard }

public class Question
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public Guid? ModuleId { get; set; }
    public Guid? LessonId { get; set; }
    public string ExternalId { get; set; } = "";
    public QuestionState State { get; set; } = QuestionState.Draft;
    public int CurrentVersion { get; set; } = 1;
    public Guid CreatedBy { get; set; }
    public Guid? ReviewedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public List<QuestionVersion> Versions { get; set; } = [];
}

public class QuestionVersion
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid QuestionId { get; set; }
    public int Version { get; set; }
    public QuestionType Type { get; set; }
    public string Language { get; set; } = "en";
    public string Stem { get; set; } = "";
    public string Explanation { get; set; } = "";
    public Difficulty Difficulty { get; set; }
    public string SkillCode { get; set; } = "";
    public string CertificationObjective { get; set; } = "";
    public string Tags { get; set; } = "";
    public string SourceReference { get; set; } = "";
    public bool AllowShuffle { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<QuestionOption> Options { get; set; } = [];
}

public class QuestionOption
{
    public Guid Id { get; set; } = Guid.NewGuid(); // stable option id
    public Guid QuestionVersionId { get; set; }
    public int SortOrder { get; set; }
    public string Text { get; set; } = "";
    public bool IsCorrect { get; set; }
    public string Rationale { get; set; } = "";
}

public class QuestionImportBatch
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public Guid UserId { get; set; }
    public string IdempotencyKey { get; set; } = "";
    public string Status { get; set; } = "Previewed"; // Previewed, Committed, Rejected
    public string PayloadJson { get; set; } = "";
    public int RowCount { get; set; }
    public int ErrorCount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ---------- Assessment ----------
public enum AssessmentKind { LessonPractice, ModuleTest, FinalAssessment, MockExam, Diagnostic }
public enum AssessmentMode { Practice, Exam }
public enum MultiSelectScoring { AllOrNothing, PartialCredit }

public class Assessment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public Guid? ModuleId { get; set; }
    public Guid? LessonId { get; set; }
    public string Title { get; set; } = "";
    public AssessmentKind Kind { get; set; }
    public AssessmentMode Mode { get; set; }
    public int? TimeLimitMinutes { get; set; }
    public int? MaxAttempts { get; set; }
    public decimal PassPercent { get; set; } = 70m;
    public MultiSelectScoring MultiSelectScoring { get; set; }
    public int QuestionCount { get; set; }
    public bool ShuffleQuestions { get; set; } = true;
    public bool ShuffleOptions { get; set; } = true;
    public bool IsPremium { get; set; }
    public bool CountsTowardCertificate { get; set; }
    public List<AssessmentQuestion> Questions { get; set; } = [];
}

public class AssessmentQuestion
{
    public Guid AssessmentId { get; set; }
    public Guid QuestionId { get; set; }
    public int SortOrder { get; set; }
}

public enum AttemptStatus { InProgress, Submitted, Expired }

public class Attempt
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AssessmentId { get; set; }
    public Guid UserId { get; set; }
    public AttemptStatus Status { get; set; }
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeadlineAt { get; set; }
    public DateTime? SubmittedAt { get; set; }
    public decimal? ScorePercent { get; set; }
    public decimal? PointsEarned { get; set; }
    public int? PointsPossible { get; set; }
    public bool? Passed { get; set; }
    public MultiSelectScoring ScoringPolicy { get; set; }
    public decimal PassPercent { get; set; }
    public List<AttemptItem> Items { get; set; } = [];
}

public class AttemptItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AttemptId { get; set; }
    public Guid QuestionVersionId { get; set; }
    public int SortOrder { get; set; }
    public string OptionOrder { get; set; } = ""; // comma-separated option ids as displayed
    public string SelectedOptionIds { get; set; } = "";
    public bool Flagged { get; set; }
    public decimal? Points { get; set; }
}

// ---------- Certificates ----------
public enum CertificateStatus { Valid, Revoked }

public class Certificate
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Code { get; set; } = ""; // random, non-sequential
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public Guid AttemptId { get; set; }
    public string RecipientName { get; set; } = "";
    public string CourseTitle { get; set; } = "";
    public string AssessmentCriteria { get; set; } = "";
    public decimal ScorePercent { get; set; }
    public CertificateStatus Status { get; set; }
    public string? RevocationReason { get; set; }
    public bool PubliclyVisible { get; set; } = true;
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
}

// ---------- Commerce ----------
public class LearningPackage
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public string Title { get; set; } = "";
    public string Contents { get; set; } = ""; // explicit list of included paid services
    public decimal Price { get; set; }
    public string Currency { get; set; } = "USD";
    public int AccessDays { get; set; } = 365;
    public bool IsActive { get; set; }
    public string ApprovalStatus { get; set; } = "Proposed"; // Proposed, Approved, Rejected
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum OrderStatus { Pending, Paid, Failed, Refunded, PartiallyRefunded, Cancelled }

public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public OrderStatus Status { get; set; }
    public decimal Total { get; set; }
    public string Currency { get; set; } = "USD";
    public string? ProviderSessionId { get; set; }
    public string IdempotencyKey { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? PaidAt { get; set; }
    public List<OrderItem> Items { get; set; } = [];
}

public class OrderItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrderId { get; set; }
    public Guid PackageId { get; set; }
    public Guid CourseId { get; set; }
    public decimal UnitPrice { get; set; }
}

public class Payment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrderId { get; set; }
    public string Provider { get; set; } = "stripe";
    public string ProviderPaymentId { get; set; } = "";
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "USD";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Refund
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrderId { get; set; }
    public decimal Amount { get; set; }
    public string Reason { get; set; } = "";
    public string Status { get; set; } = "Requested"; // Requested, Completed, Rejected
    public string? ProviderRefundId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ProcessedWebhookEvent
{
    public string EventId { get; set; } = "";
    public string Type { get; set; } = "";
    public DateTime ProcessedAt { get; set; } = DateTime.UtcNow;
}

public enum EntitlementSource { Purchase, Organization, Grant, Subscription }

public class Entitlement
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public Guid? PackageId { get; set; }
    public Guid? OrderId { get; set; }
    public EntitlementSource Source { get; set; }
    public DateTime StartsAt { get; set; } = DateTime.UtcNow;
    public DateTime? EndsAt { get; set; }
    public DateTime? RevokedAt { get; set; }
}

public class CommissionLedgerEntry
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid InstructorId { get; set; }
    public Guid OrderId { get; set; }
    public Guid CourseId { get; set; }
    public string Kind { get; set; } = "Sale"; // Sale, RefundReversal
    public decimal GrossAmount { get; set; }
    public decimal InstructorAmount { get; set; }
    public decimal PlatformAmount { get; set; }
    public string Currency { get; set; } = "USD";
    public Guid? PayoutBatchId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class PayoutBatch
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Status { get; set; } = "Draft"; // Draft, Approved, Paid
    public Guid CreatedBy { get; set; }
    public Guid? ApprovedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ---------- Reviews ----------
public class CourseReview
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public Guid UserId { get; set; }
    public int Rating { get; set; }
    public string Body { get; set; } = "";
    public bool VerifiedPurchase { get; set; }
    public string? InstructorReply { get; set; }
    public bool Hidden { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
