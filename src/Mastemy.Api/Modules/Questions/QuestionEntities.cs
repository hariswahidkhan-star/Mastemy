using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Questions;

/// <summary>Bloom-style cognitive level of a question (spec §13).</summary>
public enum CognitiveLevel { Remember, Understand, Apply, Analyze, Evaluate }

/// <summary>
/// 1:1 side table of <see cref="Question"/> owned by the Questions module: cognitive level, case-group membership,
/// provenance of copied questions and the staff-controlled "reusable shared bank" flag.
/// </summary>
public class QuestionMeta
{
    public Guid QuestionId { get; set; }
    public CognitiveLevel? CognitiveLevel { get; set; }
    public Guid? CaseGroupId { get; set; }
    public int CaseGroupOrder { get; set; }
    public Guid? SourceQuestionId { get; set; }
    public int? SourceVersion { get; set; }
    public Guid? SourceCourseId { get; set; }
    public bool Reusable { get; set; }
    public Guid? ReusableSetBy { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Case group: a shared exhibit (title, Markdown, resource files) whose questions are always delivered together and in order.</summary>
public class CaseGroup
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public string Title { get; set; } = "";
    public string ExhibitMarkdown { get; set; } = "";
    public string ResourceIds { get; set; } = ""; // comma-separated ResourceFile ids attached to the exhibit
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Queued commit of a large import batch (processed by <see cref="QuestionImportWorker"/>).</summary>
public class QuestionImportJob
{
    public Guid BatchId { get; set; }
    public Guid CourseId { get; set; }
    public Guid UserId { get; set; }
    public string Status { get; set; } = "Queued"; // Queued, Processing, Completed, Failed
    public string? Error { get; set; }
    public int Created { get; set; }
    public int Updated { get; set; }
    public DateTime QueuedAt { get; set; } = DateTime.UtcNow;
    public DateTime? StartedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
}

public enum ChallengeStatus { Open, Resolved }
public enum ChallengeResolution { NoChange, Revise, Retire }

/// <summary>A learner's challenge of a question they were shown (spec §13 "track errors, challenges, revisions and retirement").</summary>
public class QuestionChallenge
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid QuestionId { get; set; }
    public Guid QuestionVersionId { get; set; }
    public Guid CourseId { get; set; }
    public Guid UserId { get; set; }
    public string Reason { get; set; } = "";
    public ChallengeStatus Status { get; set; } = ChallengeStatus.Open;
    public ChallengeResolution? Resolution { get; set; }
    public string? ResolutionNote { get; set; }
    public Guid? ResolvedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ResolvedAt { get; set; }
}

public class QuestionMetaConfig : IEntityTypeConfiguration<QuestionMeta>
{
    public void Configure(EntityTypeBuilder<QuestionMeta> b)
    {
        b.ToTable("Questions_Meta");
        b.HasKey(x => x.QuestionId);
        b.HasOne<Question>().WithOne().HasForeignKey<QuestionMeta>(x => x.QuestionId);
        b.HasIndex(x => x.CaseGroupId);
        b.HasIndex(x => x.Reusable);
        b.Property(x => x.CognitiveLevel).HasConversion<string>().HasMaxLength(20);
    }
}

public class CaseGroupConfig : IEntityTypeConfiguration<CaseGroup>
{
    public void Configure(EntityTypeBuilder<CaseGroup> b)
    {
        b.ToTable("Questions_CaseGroups");
        b.HasKey(x => x.Id);
        b.HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        b.Property(x => x.Title).HasMaxLength(200);
        b.Property(x => x.ExhibitMarkdown).HasColumnType("longtext");
        b.Property(x => x.ResourceIds).HasColumnType("longtext");
        b.HasIndex(x => x.CourseId);
    }
}

public class QuestionImportJobConfig : IEntityTypeConfiguration<QuestionImportJob>
{
    public void Configure(EntityTypeBuilder<QuestionImportJob> b)
    {
        b.ToTable("Questions_ImportJobs");
        b.HasKey(x => x.BatchId);
        b.HasOne<QuestionImportBatch>().WithOne().HasForeignKey<QuestionImportJob>(x => x.BatchId);
        b.Property(x => x.Status).HasMaxLength(20);
        b.Property(x => x.Error).HasColumnType("longtext");
        b.HasIndex(x => new { x.Status, x.QueuedAt });
    }
}

public class QuestionChallengeConfig : IEntityTypeConfiguration<QuestionChallenge>
{
    public void Configure(EntityTypeBuilder<QuestionChallenge> b)
    {
        b.ToTable("Questions_Challenges");
        b.HasKey(x => x.Id);
        b.HasOne<Question>().WithMany().HasForeignKey(x => x.QuestionId);
        b.Property(x => x.Reason).HasColumnType("longtext");
        b.Property(x => x.ResolutionNote).HasColumnType("longtext");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
        b.Property(x => x.Resolution).HasConversion<string>().HasMaxLength(20);
        b.HasIndex(x => new { x.Status, x.CreatedAt });
        b.HasIndex(x => new { x.UserId, x.QuestionId, x.Status });
    }
}
