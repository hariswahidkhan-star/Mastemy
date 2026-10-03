using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.SkillGraph;

// ---------- Entities ----------

public class SkillNode
{
    public int Id { get; set; }
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public string? Description { get; set; }
    public string? CategoryCode { get; set; }
    public int? CategoryId { get; set; }
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
}

public class SkillEdge
{
    public int Id { get; set; }
    public int FromSkillId { get; set; } // prerequisite
    public int ToSkillId { get; set; }   // dependent skill
    public SkillNode? FromSkill { get; set; }
    public SkillNode? ToSkill { get; set; }
}

public class SkillMastery
{
    public long Id { get; set; }
    public Guid UserId { get; set; }
    public int SkillId { get; set; }
    public decimal MasteryScore { get; set; } // 0-100
    public int EvidenceCount { get; set; }
    public DateTime LastPracticedUtc { get; set; } = DateTime.UtcNow;
    public DateTime? NextReviewUtc { get; set; } // spaced repetition
    public decimal Stability { get; set; } // FSRS stability parameter
    public decimal Difficulty { get; set; } // FSRS difficulty parameter
    public SkillNode? Skill { get; set; }
}

// ---------- DTOs ----------

public record SkillNodeDto(int Id, string Code, string Name, string? Description, string? CategoryCode, int? CategoryId);
public record SkillEdgeDto(int Id, int FromSkillId, int ToSkillId);
public record SkillGraphDto(IReadOnlyList<SkillNodeDto> Nodes, IReadOnlyList<SkillEdgeDto> Edges);

public record SkillMasteryDto(
    int SkillId, string SkillCode, string SkillName,
    decimal MasteryScore, int EvidenceCount,
    DateTime LastPracticedUtc, DateTime? NextReviewUtc,
    decimal Stability, decimal Difficulty);

public record SkillMasterySummaryDto(
    int TotalSkills, int MasteredCount, int InProgressCount, int WeakCount, int DueForReviewCount,
    IReadOnlyList<SkillMasteryDto> Items);

public record SkillGapDto(int SkillId, string SkillCode, string SkillName, decimal MasteryScore, int Depth);

public record SkillRecommendationDto(int SkillId, string SkillCode, string SkillName, string Reason, decimal MasteryScore, DateTime? NextReviewUtc);

public record RecordEvidenceRequest(decimal Score, string Source);

public record SkillNodeUpsertRequest(string Code, string Name, string? Description, string? CategoryCode, int? CategoryId);
public record SkillEdgeRequest(int FromSkillId, int ToSkillId);

// ---------- EF Configuration ----------

public class SkillGraphConfigurations :
    IEntityTypeConfiguration<SkillNode>,
    IEntityTypeConfiguration<SkillEdge>,
    IEntityTypeConfiguration<SkillMastery>
{
    public void Configure(EntityTypeBuilder<SkillNode> b)
    {
        b.ToTable("Skill_Nodes");
        b.Property(x => x.Code).HasMaxLength(64);
        b.Property(x => x.Name).HasMaxLength(200);
        b.Property(x => x.Description).HasColumnType("longtext");
        b.Property(x => x.CategoryCode).HasMaxLength(64);
        b.HasIndex(x => x.Code).IsUnique();
    }

    public void Configure(EntityTypeBuilder<SkillEdge> b)
    {
        b.ToTable("Skill_Edges");
        b.HasOne(x => x.FromSkill).WithMany().HasForeignKey(x => x.FromSkillId).OnDelete(DeleteBehavior.Cascade);
        b.HasOne(x => x.ToSkill).WithMany().HasForeignKey(x => x.ToSkillId).OnDelete(DeleteBehavior.Cascade);
        b.HasIndex(x => new { x.FromSkillId, x.ToSkillId }).IsUnique();
    }

    public void Configure(EntityTypeBuilder<SkillMastery> b)
    {
        b.ToTable("Skill_Mastery");
        b.Property(x => x.MasteryScore).HasPrecision(18, 4);
        b.Property(x => x.Stability).HasPrecision(18, 4);
        b.Property(x => x.Difficulty).HasPrecision(18, 4);
        b.HasOne(x => x.Skill).WithMany().HasForeignKey(x => x.SkillId).OnDelete(DeleteBehavior.Cascade);
        b.HasIndex(x => new { x.UserId, x.SkillId }).IsUnique();
        b.HasIndex(x => x.NextReviewUtc);
    }
}
