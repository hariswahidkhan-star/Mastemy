using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Trust;

public enum ComplaintType { Copyright, Rights, Abuse, Privacy, Other }
public enum ComplaintTarget { Course, Lesson, Discussion, DiscussionReply, Review, Resource, Message = 100 }
public enum ComplaintStatus { Open, Dismissed, Actioned }
public enum ComplaintAction { None, Dismiss, Hide, Archive }
public enum AppealStatus { Pending, Upheld, Reinstated }
public enum HoldTarget { Lesson, Resource }

/// <summary>Complaint / takedown request (spec §20). Anyone may file; anonymous filers must leave a contact email.</summary>
public class Complaint
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public ComplaintType Type { get; set; }
    public ComplaintTarget TargetType { get; set; }
    public Guid TargetId { get; set; }
    public Guid CourseId { get; set; }
    public Guid? ReporterUserId { get; set; }
    public string ReporterEmail { get; set; } = "";
    public string ReporterName { get; set; } = "";
    public string Evidence { get; set; } = "";
    public ComplaintStatus Status { get; set; } = ComplaintStatus.Open;
    public ComplaintAction Action { get; set; } = ComplaintAction.None;
    public string? ResolutionNote { get; set; }
    public Guid? ResolvedBy { get; set; }
    public DateTime? ResolvedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Takedown hold on a snapshot-served content item (lesson or resource): learner reads return 451 while active.</summary>
public class ContentHold
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public HoldTarget TargetType { get; set; }
    public Guid TargetId { get; set; }
    public Guid CourseId { get; set; }
    public Guid? ComplaintId { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid? ReleasedBy { get; set; }
    public DateTime? ReleasedAt { get; set; }
}

/// <summary>Instructor suspension: authoring role removed (studio blocked), earnings parked in a "Held" payout batch.
/// Learners keep access to the instructor's live courses (continuity).</summary>
public class InstructorSuspension
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public string Reason { get; set; } = "";
    public bool HadInstructorRole { get; set; }
    public Guid HoldBatchId { get; set; }
    public Guid SuspendedBy { get; set; }
    public DateTime SuspendedAt { get; set; } = DateTime.UtcNow;
    public Guid? ReinstatedBy { get; set; }
    public DateTime? ReinstatedAt { get; set; }
    public string? ReinstateNote { get; set; }
}

/// <summary>Appeal of a moderation decision that hid a review, discussion thread or reply.</summary>
public class ModerationAppeal
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public ComplaintTarget TargetType { get; set; }
    public Guid TargetId { get; set; }
    public Guid CourseId { get; set; }
    public Guid AppellantId { get; set; }
    public string Reason { get; set; } = "";
    public AppealStatus Status { get; set; } = AppealStatus.Pending;
    public Guid? DecidedBy { get; set; }
    public string? DecisionNote { get; set; }
    public DateTime? DecidedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ComplaintConfiguration : IEntityTypeConfiguration<Complaint>
{
    public void Configure(EntityTypeBuilder<Complaint> b)
    {
        b.ToTable("Trust_Complaints");
        b.Property(x => x.Type).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.TargetType).HasConversion<string>().HasMaxLength(24);
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.Action).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.ReporterEmail).HasMaxLength(254);
        b.Property(x => x.ReporterName).HasMaxLength(120);
        b.Property(x => x.Evidence).HasColumnType("longtext");
        b.Property(x => x.ResolutionNote).HasColumnType("longtext");
        b.HasIndex(x => new { x.Status, x.CreatedAt });
        b.HasIndex(x => new { x.TargetType, x.TargetId });
    }
}

public class ContentHoldConfiguration : IEntityTypeConfiguration<ContentHold>
{
    public void Configure(EntityTypeBuilder<ContentHold> b)
    {
        b.ToTable("Trust_ContentHolds");
        b.Property(x => x.TargetType).HasConversion<string>().HasMaxLength(16);
        b.HasIndex(x => new { x.TargetId, x.ReleasedAt });
    }
}

public class InstructorSuspensionConfiguration : IEntityTypeConfiguration<InstructorSuspension>
{
    public void Configure(EntityTypeBuilder<InstructorSuspension> b)
    {
        b.ToTable("Trust_InstructorSuspensions");
        b.Property(x => x.Reason).HasColumnType("longtext");
        b.Property(x => x.ReinstateNote).HasColumnType("longtext");
        b.HasIndex(x => new { x.UserId, x.ReinstatedAt });
    }
}

public class ModerationAppealConfiguration : IEntityTypeConfiguration<ModerationAppeal>
{
    public void Configure(EntityTypeBuilder<ModerationAppeal> b)
    {
        b.ToTable("Trust_ModerationAppeals");
        b.Property(x => x.TargetType).HasConversion<string>().HasMaxLength(24);
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.Reason).HasColumnType("longtext");
        b.Property(x => x.DecisionNote).HasColumnType("longtext");
        b.HasIndex(x => new { x.Status, x.CreatedAt });
        b.HasIndex(x => new { x.TargetType, x.TargetId });
    }
}
