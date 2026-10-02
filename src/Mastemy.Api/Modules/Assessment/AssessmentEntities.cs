using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Assessment;

/// <summary>Per-assessment delivery policy (1:1 side table of Assessment): explicit pause policy and exposure rule.</summary>
public class AssessmentPolicy
{
    public Guid AssessmentId { get; set; }
    public bool AllowPause { get; set; }
    public int MaxPauseMinutes { get; set; }
    /// <summary>Maximum times one learner may be shown the same question across their attempts of this assessment (null = unlimited).</summary>
    public int? MaxExposuresPerQuestion { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Staff-granted testing accommodation for one learner, for one assessment or globally (AssessmentId null).</summary>
public class Accommodation
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid? AssessmentId { get; set; }
    public int ExtraTimePercent { get; set; }
    public bool Untimed { get; set; }
    public string Reason { get; set; } = "";
    public Guid GrantedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? RevokedAt { get; set; }
    public Guid? RevokedBy { get; set; }
}

/// <summary>1:1 side table of Attempt: applied accommodation, base time limit and pause state.</summary>
public class AttemptExtension
{
    public Guid AttemptId { get; set; }
    public int? BaseTimeLimitMinutes { get; set; }
    public Guid? AccommodationId { get; set; }
    public int ExtraTimePercent { get; set; }
    public bool Untimed { get; set; }
    public DateTime? PausedAt { get; set; }
    public int PausedSecondsUsed { get; set; }
    public int PauseAllowanceSeconds { get; set; }
}

public class AttemptPause
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AttemptId { get; set; }
    public DateTime PausedAt { get; set; }
    public DateTime? ResumedAt { get; set; }
    public int CreditedSeconds { get; set; }
}

/// <summary>Case exhibit as delivered in an attempt (frozen at attempt start).</summary>
public class AttemptCase
{
    public Guid AttemptId { get; set; }
    public Guid CaseGroupId { get; set; }
    public string Title { get; set; } = "";
    public string ExhibitMarkdown { get; set; } = "";
    public string ResourceIds { get; set; } = "";
    public string QuestionIds { get; set; } = ""; // members delivered in this attempt, in order
}

/// <summary>Custom practice session built from filters across the courses a learner can access (never scored for certificates).</summary>
public class PracticeSession
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string FiltersJson { get; set; } = "";
    public MultiSelectScoring ScoringPolicy { get; set; } = MultiSelectScoring.PartialCredit;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? FinishedAt { get; set; }
    public List<PracticeItem> Items { get; set; } = [];
}

public class PracticeItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SessionId { get; set; }
    public Guid QuestionVersionId { get; set; }
    public Guid QuestionId { get; set; }
    public Guid CourseId { get; set; }
    public bool RequiresPremium { get; set; }
    public int SortOrder { get; set; }
    public string OptionOrder { get; set; } = "";
    public string SelectedOptionIds { get; set; } = "";
    public DateTime? CheckedAt { get; set; }
    public decimal? Points { get; set; }
}

public class QuestionBookmark
{
    public Guid UserId { get; set; }
    public Guid QuestionId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>SM-2 spaced-repetition state per learner and question.</summary>
public class ReviewCard
{
    public Guid UserId { get; set; }
    public Guid QuestionId { get; set; }
    public int Repetitions { get; set; }
    public decimal EaseFactor { get; set; } = 2.5m;
    public int IntervalDays { get; set; }
    public DateTime DueAt { get; set; }
    public DateTime LastReviewedAt { get; set; }
    public int LastQuality { get; set; }
}

public enum RegradeStatus { Proposed, Applied, Rejected }

public class RegradeRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid QuestionId { get; set; }
    public Guid QuestionVersionId { get; set; }
    public string OldCorrectOptionIds { get; set; } = "";
    public string NewCorrectOptionIds { get; set; } = "";
    public string Reason { get; set; } = "";
    public Guid ProposedBy { get; set; }
    public DateTime ProposedAt { get; set; } = DateTime.UtcNow;
    public RegradeStatus Status { get; set; } = RegradeStatus.Proposed;
    public Guid? DecidedBy { get; set; }
    public DateTime? DecidedAt { get; set; }
    public string? DecisionNote { get; set; }
    public int AffectedAttempts { get; set; }
    public int ChangedAttempts { get; set; }
}

public class RegradeResult
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RegradeId { get; set; }
    public Guid AttemptId { get; set; }
    public Guid UserId { get; set; }
    public decimal OldPointsEarned { get; set; }
    public decimal NewPointsEarned { get; set; }
    public decimal OldScorePercent { get; set; }
    public decimal NewScorePercent { get; set; }
    public bool OldPassed { get; set; }
    public bool NewPassed { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum CertificateFlagStatus { Open, Kept, Revoked }

/// <summary>A certificate whose evidence no longer passes after a regrade; staff decide (never auto-revoked).</summary>
public class CertificateFlag
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CertificateId { get; set; }
    public Guid? RegradeId { get; set; }
    public string Reason { get; set; } = "";
    public CertificateFlagStatus Status { get; set; } = CertificateFlagStatus.Open;
    public Guid? DecidedBy { get; set; }
    public DateTime? DecidedAt { get; set; }
    public string? DecisionNote { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class CertificateTemplate
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public string TitleText { get; set; } = "";
    public string PrimaryColor { get; set; } = "#1F2937";
    public string AccentColor { get; set; } = "#1D4ED8";
    public Guid? LogoResourceId { get; set; }
    public string SignatureName { get; set; } = "";
    public string SignatureTitle { get; set; } = "";
    public bool Archived { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class CourseCertificateSetting
{
    public Guid CourseId { get; set; }
    public Guid TemplateId { get; set; }
    public Guid UpdatedBy { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum CertificateRequestStatus { Pending, Approved, Rejected }

public class CertificateCorrection
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CertificateId { get; set; }
    public Guid UserId { get; set; }
    public string CurrentName { get; set; } = "";
    public string RequestedName { get; set; } = "";
    public string Reason { get; set; } = "";
    public CertificateRequestStatus Status { get; set; } = CertificateRequestStatus.Pending;
    public Guid? DecidedBy { get; set; }
    public DateTime? DecidedAt { get; set; }
    public string? DecisionNote { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class CertificateAppeal
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CertificateId { get; set; }
    public Guid UserId { get; set; }
    public string Reason { get; set; } = "";
    /// <summary>Approved = revocation overturned (certificate reinstated); Rejected = revocation upheld.</summary>
    public CertificateRequestStatus Status { get; set; } = CertificateRequestStatus.Pending;
    public Guid? DecidedBy { get; set; }
    public DateTime? DecidedAt { get; set; }
    public string? DecisionNote { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ---------------- EF configuration (discovered by ApplyConfigurationsFromAssembly) ----------------

public class AssessmentEntityConfigs :
    IEntityTypeConfiguration<AssessmentPolicy>, IEntityTypeConfiguration<Accommodation>, IEntityTypeConfiguration<AttemptExtension>,
    IEntityTypeConfiguration<AttemptPause>, IEntityTypeConfiguration<AttemptCase>, IEntityTypeConfiguration<PracticeSession>,
    IEntityTypeConfiguration<PracticeItem>, IEntityTypeConfiguration<QuestionBookmark>, IEntityTypeConfiguration<ReviewCard>,
    IEntityTypeConfiguration<RegradeRequest>, IEntityTypeConfiguration<RegradeResult>, IEntityTypeConfiguration<CertificateFlag>,
    IEntityTypeConfiguration<CertificateTemplate>, IEntityTypeConfiguration<CourseCertificateSetting>,
    IEntityTypeConfiguration<CertificateCorrection>, IEntityTypeConfiguration<CertificateAppeal>
{
    public void Configure(EntityTypeBuilder<AssessmentPolicy> b)
    {
        b.ToTable("Assessment_Policies");
        b.HasKey(x => x.AssessmentId);
        b.HasOne<Domain.Assessment>().WithOne().HasForeignKey<AssessmentPolicy>(x => x.AssessmentId);
    }

    public void Configure(EntityTypeBuilder<Accommodation> b)
    {
        b.ToTable("Assessment_Accommodations");
        b.HasKey(x => x.Id);
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId);
        b.Property(x => x.Reason).HasMaxLength(500);
        b.HasIndex(x => new { x.UserId, x.AssessmentId, x.RevokedAt });
    }

    public void Configure(EntityTypeBuilder<AttemptExtension> b)
    {
        b.ToTable("Assessment_AttemptExtensions");
        b.HasKey(x => x.AttemptId);
        b.HasOne<Attempt>().WithOne().HasForeignKey<AttemptExtension>(x => x.AttemptId);
    }

    public void Configure(EntityTypeBuilder<AttemptPause> b)
    {
        b.ToTable("Assessment_AttemptPauses");
        b.HasKey(x => x.Id);
        b.HasOne<Attempt>().WithMany().HasForeignKey(x => x.AttemptId);
        b.HasIndex(x => x.AttemptId);
    }

    public void Configure(EntityTypeBuilder<AttemptCase> b)
    {
        b.ToTable("Assessment_AttemptCases");
        b.HasKey(x => new { x.AttemptId, x.CaseGroupId });
        b.HasOne<Attempt>().WithMany().HasForeignKey(x => x.AttemptId);
        b.Property(x => x.Title).HasMaxLength(200);
        b.Property(x => x.ExhibitMarkdown).HasColumnType("longtext");
        b.Property(x => x.ResourceIds).HasColumnType("longtext");
        b.Property(x => x.QuestionIds).HasColumnType("longtext");
    }

    public void Configure(EntityTypeBuilder<PracticeSession> b)
    {
        b.ToTable("Assessment_PracticeSessions");
        b.HasKey(x => x.Id);
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId);
        b.Property(x => x.FiltersJson).HasColumnType("longtext");
        b.HasMany(x => x.Items).WithOne().HasForeignKey(x => x.SessionId);
        b.HasIndex(x => new { x.UserId, x.CreatedAt });
    }

    public void Configure(EntityTypeBuilder<PracticeItem> b)
    {
        b.ToTable("Assessment_PracticeItems");
        b.HasKey(x => x.Id);
        b.HasOne<QuestionVersion>().WithMany().HasForeignKey(x => x.QuestionVersionId).OnDelete(DeleteBehavior.Restrict);
        b.Property(x => x.OptionOrder).HasColumnType("longtext");
        b.Property(x => x.SelectedOptionIds).HasColumnType("longtext");
        b.HasIndex(x => x.QuestionId);
    }

    public void Configure(EntityTypeBuilder<QuestionBookmark> b)
    {
        b.ToTable("Assessment_Bookmarks");
        b.HasKey(x => new { x.UserId, x.QuestionId });
        b.HasOne<Question>().WithMany().HasForeignKey(x => x.QuestionId);
    }

    public void Configure(EntityTypeBuilder<ReviewCard> b)
    {
        b.ToTable("Assessment_ReviewCards");
        b.HasKey(x => new { x.UserId, x.QuestionId });
        b.HasOne<Question>().WithMany().HasForeignKey(x => x.QuestionId);
        b.Property(x => x.EaseFactor).HasPrecision(18, 4);
        b.HasIndex(x => new { x.UserId, x.DueAt });
    }

    public void Configure(EntityTypeBuilder<RegradeRequest> b)
    {
        b.ToTable("Assessment_Regrades");
        b.HasKey(x => x.Id);
        b.HasOne<QuestionVersion>().WithMany().HasForeignKey(x => x.QuestionVersionId).OnDelete(DeleteBehavior.Restrict);
        b.Property(x => x.OldCorrectOptionIds).HasColumnType("longtext");
        b.Property(x => x.NewCorrectOptionIds).HasColumnType("longtext");
        b.Property(x => x.Reason).HasColumnType("longtext");
        b.Property(x => x.DecisionNote).HasColumnType("longtext");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
        b.HasIndex(x => new { x.QuestionVersionId, x.Status });
    }

    public void Configure(EntityTypeBuilder<RegradeResult> b)
    {
        b.ToTable("Assessment_RegradeResults");
        b.HasKey(x => x.Id);
        b.HasOne<RegradeRequest>().WithMany().HasForeignKey(x => x.RegradeId);
        b.HasOne<Attempt>().WithMany().HasForeignKey(x => x.AttemptId);
        b.Property(x => x.OldPointsEarned).HasPrecision(18, 4);
        b.Property(x => x.NewPointsEarned).HasPrecision(18, 4);
        b.Property(x => x.OldScorePercent).HasPrecision(18, 4);
        b.Property(x => x.NewScorePercent).HasPrecision(18, 4);
        b.HasIndex(x => x.AttemptId);
    }

    public void Configure(EntityTypeBuilder<CertificateFlag> b)
    {
        b.ToTable("Assessment_CertificateFlags");
        b.HasKey(x => x.Id);
        b.HasOne<Certificate>().WithMany().HasForeignKey(x => x.CertificateId);
        b.Property(x => x.Reason).HasColumnType("longtext");
        b.Property(x => x.DecisionNote).HasColumnType("longtext");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
        b.HasIndex(x => x.Status);
    }

    public void Configure(EntityTypeBuilder<CertificateTemplate> b)
    {
        b.ToTable("Assessment_CertificateTemplates");
        b.HasKey(x => x.Id);
        b.Property(x => x.Name).HasMaxLength(100);
        b.Property(x => x.TitleText).HasMaxLength(120);
        b.Property(x => x.PrimaryColor).HasMaxLength(7);
        b.Property(x => x.AccentColor).HasMaxLength(7);
        b.Property(x => x.SignatureName).HasMaxLength(100);
        b.Property(x => x.SignatureTitle).HasMaxLength(100);
    }

    public void Configure(EntityTypeBuilder<CourseCertificateSetting> b)
    {
        b.ToTable("Assessment_CourseCertificateSettings");
        b.HasKey(x => x.CourseId);
        b.HasOne<Course>().WithOne().HasForeignKey<CourseCertificateSetting>(x => x.CourseId);
        b.HasOne<CertificateTemplate>().WithMany().HasForeignKey(x => x.TemplateId);
    }

    public void Configure(EntityTypeBuilder<CertificateCorrection> b)
    {
        b.ToTable("Assessment_CertificateCorrections");
        b.HasKey(x => x.Id);
        b.HasOne<Certificate>().WithMany().HasForeignKey(x => x.CertificateId);
        b.Property(x => x.CurrentName).HasMaxLength(200);
        b.Property(x => x.RequestedName).HasMaxLength(200);
        b.Property(x => x.Reason).HasColumnType("longtext");
        b.Property(x => x.DecisionNote).HasColumnType("longtext");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
        b.HasIndex(x => new { x.CertificateId, x.Status });
    }

    public void Configure(EntityTypeBuilder<CertificateAppeal> b)
    {
        b.ToTable("Assessment_CertificateAppeals");
        b.HasKey(x => x.Id);
        b.HasOne<Certificate>().WithMany().HasForeignKey(x => x.CertificateId);
        b.Property(x => x.Reason).HasColumnType("longtext");
        b.Property(x => x.DecisionNote).HasColumnType("longtext");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
        b.HasIndex(x => new { x.CertificateId, x.Status });
    }
}
