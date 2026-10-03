using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Ai;
using Mastemy.Api.Modules.Lab;
using Mastemy.Api.Modules.Scenario;
using Mastemy.Api.Modules.SkillGraph;
using Mastemy.Api.Modules.StudyPath;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<PlatformSetting> PlatformSettings => Set<PlatformSetting>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<InstructorApplication> InstructorApplications => Set<InstructorApplication>();
    public DbSet<InstructorInvitation> InstructorInvitations => Set<InstructorInvitation>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Course> Courses => Set<Course>();
    public DbSet<CourseCategory> CourseCategories => Set<CourseCategory>();
    public DbSet<CourseInstructor> CourseInstructors => Set<CourseInstructor>();
    public DbSet<CourseModule> Modules => Set<CourseModule>();
    public DbSet<Lesson> Lessons => Set<Lesson>();
    public DbSet<CourseReviewComment> ReviewComments => Set<CourseReviewComment>();
    public DbSet<YouTubeChannel> YouTubeChannels => Set<YouTubeChannel>();
    public DbSet<VideoAsset> VideoAssets => Set<VideoAsset>();
    public DbSet<YouTubeUploadSession> UploadSessions => Set<YouTubeUploadSession>();
    public DbSet<Enrollment> Enrollments => Set<Enrollment>();
    public DbSet<LessonProgress> LessonProgress => Set<LessonProgress>();
    public DbSet<LearnerNote> LearnerNotes => Set<LearnerNote>();
    public DbSet<Question> Questions => Set<Question>();
    public DbSet<QuestionVersion> QuestionVersions => Set<QuestionVersion>();
    public DbSet<QuestionOption> QuestionOptions => Set<QuestionOption>();
    public DbSet<QuestionImportBatch> ImportBatches => Set<QuestionImportBatch>();
    public DbSet<Assessment> Assessments => Set<Assessment>();
    public DbSet<AssessmentQuestion> AssessmentQuestions => Set<AssessmentQuestion>();
    public DbSet<Attempt> Attempts => Set<Attempt>();
    public DbSet<AttemptItem> AttemptItems => Set<AttemptItem>();
    public DbSet<Certificate> Certificates => Set<Certificate>();
    public DbSet<LearningPackage> Packages => Set<LearningPackage>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Refund> Refunds => Set<Refund>();
    public DbSet<ProcessedWebhookEvent> ProcessedWebhookEvents => Set<ProcessedWebhookEvent>();
    public DbSet<Entitlement> Entitlements => Set<Entitlement>();
    public DbSet<CommissionLedgerEntry> CommissionLedger => Set<CommissionLedgerEntry>();
    public DbSet<PayoutBatch> PayoutBatches => Set<PayoutBatch>();
    public DbSet<CourseReview> CourseReviews => Set<CourseReview>();
    public DbSet<CourseSnapshot> CourseSnapshots => Set<CourseSnapshot>();
    public DbSet<SnapshotLesson> SnapshotLessons => Set<SnapshotLesson>();
    public DbSet<EmailOutboxMessage> EmailOutbox => Set<EmailOutboxMessage>();
    public DbSet<OrganizationInvitation> OrganizationInvitations => Set<OrganizationInvitation>();
    public DbSet<WishlistItem> Wishlist => Set<WishlistItem>();
    public DbSet<RecentlyViewed> RecentlyViewed => Set<RecentlyViewed>();
    public DbSet<DiscussionThread> DiscussionThreads => Set<DiscussionThread>();
    public DbSet<DiscussionReply> DiscussionReplies => Set<DiscussionReply>();
    public DbSet<Announcement> Announcements => Set<Announcement>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<NotificationPreference> NotificationPreferences => Set<NotificationPreference>();
    public DbSet<ResourceFile> ResourceFiles => Set<ResourceFile>();
    public DbSet<OAuthNonce> OAuthNonces => Set<OAuthNonce>();
    public DbSet<Organization> Organizations => Set<Organization>();
    public DbSet<OrganizationMember> OrganizationMembers => Set<OrganizationMember>();
    public DbSet<OrganizationAssignment> OrganizationAssignments => Set<OrganizationAssignment>();

    public DbSet<LabBlueprint> LabBlueprints => Set<LabBlueprint>();
    public DbSet<LabSession> LabSessions => Set<LabSession>();
    public DbSet<LabEvidence> LabEvidence => Set<LabEvidence>();

    public DbSet<ScenarioTemplate> ScenarioTemplates => Set<ScenarioTemplate>();
    public DbSet<ScenarioSession> ScenarioSessions => Set<ScenarioSession>();

    public DbSet<SkillNode> SkillNodes => Set<SkillNode>();
    public DbSet<SkillEdge> SkillEdges => Set<SkillEdge>();
    public DbSet<SkillMastery> SkillMasteries => Set<SkillMastery>();

    public DbSet<FeynmanSession> FeynmanSessions => Set<FeynmanSession>();

    public DbSet<StudyPathRecommendation> StudyPathRecommendations => Set<StudyPathRecommendation>();
    public DbSet<LearningStreak> LearningStreaks => Set<LearningStreak>();
    public DbSet<DailyChallenge> DailyChallenges => Set<DailyChallenge>();
    public DbSet<CoachHint> CoachHints => Set<CoachHint>();
    public DbSet<GeneratedExercise> GeneratedExercises => Set<GeneratedExercise>();

    protected override void ConfigureConventions(ModelConfigurationBuilder b)
    {
        b.Properties<decimal>().HavePrecision(18, 4);
        b.Properties<string>().HaveMaxLength(512);
        // MySQL DATETIME has no zone; all values are written as UTC, so mark them UTC on read (correct JSON 'Z' suffix).
        b.Properties<DateTime>().HaveConversion<UtcDateTimeConverter>();
        b.Properties<DateTime?>().HaveConversion<NullableUtcDateTimeConverter>();
    }

    protected override void OnModelCreating(ModelBuilder m)
    {
        // Modules own their newer entities: each adds an IEntityTypeConfiguration<T> in its own folder and uses
        // db.Set<T>(); they are discovered here, so parallel module work never edits this shared file.
        m.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // Long text columns
        void Text<T>(params System.Linq.Expressions.Expression<Func<T, string?>>[] props) where T : class
        { foreach (var p in props) m.Entity<T>().Property(p).HasColumnType("longtext"); }

        m.Entity<User>().HasIndex(x => x.NormalizedEmail).IsUnique();
        m.Entity<User>().HasMany(x => x.Roles).WithOne().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        m.Entity<UserRole>().HasKey(x => new { x.UserId, x.Role });
        m.Entity<RefreshToken>().HasIndex(x => x.TokenHash).IsUnique();
        m.Entity<RefreshToken>().HasOne<User>().WithMany().HasForeignKey(x => x.UserId);

        m.Entity<PlatformSetting>().HasKey(x => x.Key);
        Text<AuditLog>(x => x.Details);
        m.Entity<AuditLog>().Property(x => x.EntityType).HasMaxLength(128);
        m.Entity<AuditLog>().Property(x => x.EntityId).HasMaxLength(128);
        m.Entity<AuditLog>().HasIndex(x => new { x.EntityType, x.EntityId });

        Text<InstructorApplication>(x => x.Bio, x => x.ExpertiseEvidence, x => x.ReviewerNotes);
        m.Entity<InstructorApplication>().HasOne<User>().WithMany().HasForeignKey(x => x.UserId);
        m.Entity<InstructorInvitation>().HasIndex(x => x.CodeHash).IsUnique();

        m.Entity<Category>().HasIndex(x => x.Slug).IsUnique();
        m.Entity<Category>().HasOne<Category>().WithMany().HasForeignKey(x => x.ParentId).OnDelete(DeleteBehavior.Restrict);

        m.Entity<Course>().HasIndex(x => x.Slug).IsUnique();
        m.Entity<Course>().HasIndex(x => x.Code).IsUnique();
        m.Entity<Course>().HasIndex(x => x.Status);
        m.Entity<Course>().HasOne<User>().WithMany().HasForeignKey(x => x.OwnerId).OnDelete(DeleteBehavior.Restrict);
        m.Entity<Course>().HasOne<YouTubeChannel>().WithMany().HasForeignKey(x => x.YouTubeChannelId).OnDelete(DeleteBehavior.Restrict);
        Text<Course>(x => x.Description, x => x.Audience, x => x.Prerequisites, x => x.Outcomes);
        m.Entity<CourseCategory>().HasKey(x => new { x.CourseId, x.CategoryId });
        m.Entity<Course>().HasMany(x => x.Categories).WithOne().HasForeignKey(x => x.CourseId);
        m.Entity<CourseCategory>().HasOne<Category>().WithMany().HasForeignKey(x => x.CategoryId);
        m.Entity<CourseInstructor>().HasKey(x => new { x.CourseId, x.UserId });
        m.Entity<Course>().HasMany(x => x.Instructors).WithOne().HasForeignKey(x => x.CourseId);
        m.Entity<CourseInstructor>().HasOne<User>().WithMany().HasForeignKey(x => x.UserId);
        m.Entity<Course>().HasMany(x => x.Modules).WithOne().HasForeignKey(x => x.CourseId);
        m.Entity<CourseModule>().HasMany(x => x.Lessons).WithOne().HasForeignKey(x => x.ModuleId);
        m.Entity<Lesson>().HasOne(x => x.VideoAsset).WithMany().HasForeignKey(x => x.VideoAssetId).OnDelete(DeleteBehavior.SetNull);
        Text<Lesson>(x => x.NotesMarkdown, x => x.PremiumNotesMarkdown, x => x.Objective);
        Text<CourseReviewComment>(x => x.Body);
        m.Entity<CourseReviewComment>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);

        m.Entity<YouTubeChannel>().HasIndex(x => x.ChannelId).IsUnique();
        Text<YouTubeChannel>(x => x.EncryptedRefreshToken);
        m.Entity<VideoAsset>().HasIndex(x => x.YouTubeVideoId);
        m.Entity<VideoAsset>().HasOne<YouTubeChannel>().WithMany().HasForeignKey(x => x.ChannelId).OnDelete(DeleteBehavior.Restrict);
        Text<VideoAsset>(x => x.RightsDeclarationText);
        Text<YouTubeUploadSession>(x => x.Description, x => x.UpstreamSessionUri);
        m.Entity<YouTubeUploadSession>().HasOne<YouTubeChannel>().WithMany().HasForeignKey(x => x.ChannelId);

        m.Entity<Enrollment>().HasIndex(x => new { x.UserId, x.CourseId }).IsUnique();
        m.Entity<Enrollment>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        m.Entity<LessonProgress>().HasKey(x => new { x.UserId, x.LessonId });
        // No FK to Lessons: progress belongs to the published snapshot's lesson ids and must survive draft edits.
        m.Entity<LessonProgress>().HasIndex(x => x.LessonId);
        Text<LearnerNote>(x => x.Body);
        m.Entity<LearnerNote>().HasIndex(x => new { x.UserId, x.LessonId });
        m.Entity<LearnerNote>().HasOne<Lesson>().WithMany().HasForeignKey(x => x.LessonId).OnDelete(DeleteBehavior.SetNull);

        m.Entity<Question>().HasIndex(x => new { x.CourseId, x.ExternalId }).IsUnique();
        m.Entity<Question>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        m.Entity<Question>().HasMany(x => x.Versions).WithOne().HasForeignKey(x => x.QuestionId);
        m.Entity<QuestionVersion>().HasIndex(x => new { x.QuestionId, x.Version }).IsUnique();
        Text<QuestionVersion>(x => x.Stem, x => x.Explanation);
        m.Entity<QuestionVersion>().HasMany(x => x.Options).WithOne().HasForeignKey(x => x.QuestionVersionId);
        Text<QuestionOption>(x => x.Text, x => x.Rationale);
        m.Entity<QuestionImportBatch>().HasIndex(x => new { x.UserId, x.IdempotencyKey }).IsUnique();
        Text<QuestionImportBatch>(x => x.PayloadJson);

        m.Entity<Assessment>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        m.Entity<Assessment>().HasMany(x => x.Questions).WithOne().HasForeignKey(x => x.AssessmentId);
        m.Entity<AssessmentQuestion>().HasKey(x => new { x.AssessmentId, x.QuestionId });
        m.Entity<AssessmentQuestion>().HasOne<Question>().WithMany().HasForeignKey(x => x.QuestionId);
        m.Entity<Attempt>().HasOne<Assessment>().WithMany().HasForeignKey(x => x.AssessmentId);
        m.Entity<Attempt>().HasIndex(x => new { x.UserId, x.AssessmentId });
        m.Entity<Attempt>().HasMany(x => x.Items).WithOne().HasForeignKey(x => x.AttemptId);
        m.Entity<AttemptItem>().HasOne<QuestionVersion>().WithMany().HasForeignKey(x => x.QuestionVersionId).OnDelete(DeleteBehavior.Restrict);
        Text<AttemptItem>(x => x.OptionOrder, x => x.SelectedOptionIds);

        m.Entity<Certificate>().HasIndex(x => x.Code).IsUnique();
        m.Entity<Certificate>().HasIndex(x => new { x.UserId, x.CourseId }).IsUnique(); // idempotent issuance
        Text<Certificate>(x => x.AssessmentCriteria);

        Text<LearningPackage>(x => x.Contents);
        m.Entity<LearningPackage>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        m.Entity<Order>().HasIndex(x => new { x.UserId, x.IdempotencyKey }).IsUnique();
        m.Entity<Order>().HasIndex(x => x.ProviderSessionId);
        m.Entity<Order>().HasMany(x => x.Items).WithOne().HasForeignKey(x => x.OrderId);
        m.Entity<Payment>().HasIndex(x => x.ProviderPaymentId).IsUnique();
        m.Entity<Payment>().HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId);
        m.Entity<Refund>().HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId);
        m.Entity<ProcessedWebhookEvent>().HasKey(x => x.EventId);
        m.Entity<Entitlement>().HasIndex(x => new { x.UserId, x.CourseId });
        m.Entity<CommissionLedgerEntry>().HasIndex(x => new { x.OrderId, x.InstructorId, x.Kind }).IsUnique(); // no duplicate commission
        m.Entity<CourseReview>().HasIndex(x => new { x.CourseId, x.UserId }).IsUnique();
        Text<CourseReview>(x => x.Body, x => x.InstructorReply);

        m.Entity<CourseSnapshot>().HasIndex(x => new { x.CourseId, x.Version }).IsUnique();
        m.Entity<CourseSnapshot>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        Text<CourseSnapshot>(x => x.PayloadJson, x => x.SearchText);
        m.Entity<CourseSnapshot>().Property(x => x.CategoryIds).HasMaxLength(1024);
        m.Entity<SnapshotLesson>().HasKey(x => new { x.LessonId, x.SnapshotId });
        m.Entity<SnapshotLesson>().HasIndex(x => new { x.LessonId, x.CourseId, x.Version });
        m.Entity<SnapshotLesson>().HasOne<CourseSnapshot>().WithMany().HasForeignKey(x => x.SnapshotId);
        Text<EmailOutboxMessage>(x => x.Body, x => x.LastError);
        m.Entity<EmailOutboxMessage>().HasIndex(x => new { x.SentAt, x.NextAttemptAt });
        m.Entity<OrganizationInvitation>().HasIndex(x => x.TokenHash).IsUnique();
        m.Entity<OrganizationInvitation>().HasIndex(x => new { x.OrganizationId, x.NormalizedEmail });
        m.Entity<OrganizationInvitation>().HasOne<Organization>().WithMany().HasForeignKey(x => x.OrganizationId);
        m.Entity<WishlistItem>().HasKey(x => new { x.UserId, x.CourseId });
        m.Entity<WishlistItem>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        m.Entity<RecentlyViewed>().HasKey(x => new { x.UserId, x.CourseId });
        m.Entity<RecentlyViewed>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        m.Entity<DiscussionThread>().HasIndex(x => new { x.CourseId, x.CreatedAt });
        m.Entity<DiscussionThread>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        Text<DiscussionThread>(x => x.Body);
        m.Entity<DiscussionReply>().HasOne<DiscussionThread>().WithMany().HasForeignKey(x => x.ThreadId);
        Text<DiscussionReply>(x => x.Body);
        m.Entity<Announcement>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        Text<Announcement>(x => x.Body);
        m.Entity<Notification>().HasIndex(x => new { x.UserId, x.ReadAt, x.CreatedAt });
        m.Entity<NotificationPreference>().HasKey(x => new { x.UserId, x.Kind });
        m.Entity<NotificationPreference>().Property(x => x.Kind).HasMaxLength(64);
        m.Entity<ResourceFile>().HasIndex(x => new { x.CourseId, x.LessonId });
        m.Entity<ResourceFile>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        m.Entity<OAuthNonce>().HasKey(x => x.Nonce);
        m.Entity<OAuthNonce>().Property(x => x.Nonce).HasMaxLength(128);
        m.Entity<Organization>().HasIndex(x => x.Slug).IsUnique();
        m.Entity<OrganizationMember>().HasKey(x => new { x.OrganizationId, x.UserId });
        m.Entity<OrganizationMember>().HasOne<Organization>().WithMany().HasForeignKey(x => x.OrganizationId);
        m.Entity<OrganizationMember>().HasOne<User>().WithMany().HasForeignKey(x => x.UserId);
        m.Entity<OrganizationAssignment>().HasOne<Organization>().WithMany().HasForeignKey(x => x.OrganizationId);
        m.Entity<OrganizationAssignment>().HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
    }
}

public class UtcDateTimeConverter() : Microsoft.EntityFrameworkCore.Storage.ValueConversion.ValueConverter<DateTime, DateTime>(
    v => v.Kind == DateTimeKind.Local ? v.ToUniversalTime() : v,
    v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

public class NullableUtcDateTimeConverter() : Microsoft.EntityFrameworkCore.Storage.ValueConversion.ValueConverter<DateTime?, DateTime?>(
    v => v.HasValue && v.Value.Kind == DateTimeKind.Local ? v.Value.ToUniversalTime() : v,
    v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v);
