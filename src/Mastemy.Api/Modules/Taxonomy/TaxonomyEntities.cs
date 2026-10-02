using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Taxonomy;

// ---------- Skills ----------
public class Skill
{
    public int Id { get; set; }
    public string Code { get; set; } = ""; // stable code, matches QuestionVersion.SkillCode
    public string NameEn { get; set; } = "";
    public string NameAr { get; set; } = "";
    public int? ParentId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// Course ↔ skill link with a validity interval. Authors edit the working set; the public sees only links that were in
/// effect when the course's current snapshot was published (AddedAt ≤ snapshot.PublishedAt &lt; RemovedAt), so skill
/// edits stay invisible until the next publish, exactly like other course content.
/// </summary>
public class CourseSkill
{
    public long Id { get; set; }
    public Guid CourseId { get; set; }
    public int SkillId { get; set; }
    public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    public DateTime? RemovedAt { get; set; }
    public Guid? AddedBy { get; set; }
    public Guid? RemovedBy { get; set; }
}

// ---------- Certification directory ----------
public enum CertificationState { ResearchCandidate, Verified, InProduction, PublishedPreparation, InformationOnly, Retired }
public enum CertificationKind { Examination, Qualification, CompletionAward, ProfessionalCertification }

public class CertificationIssuer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public string? WebsiteUrl { get; set; }
    public string Country { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Certification
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid IssuerId { get; set; }
    public string Slug { get; set; } = "";
    public string Title { get; set; } = ""; // exact official title
    public string Jurisdiction { get; set; } = ""; // country / jurisdiction ("Global" allowed)
    public string ExamCode { get; set; } = "";
    public string LevelOrPart { get; set; } = "";
    public string Version { get; set; } = "";
    public DateTime? EffectiveFrom { get; set; }
    public DateTime? EffectiveTo { get; set; }
    public string Prerequisites { get; set; } = "";
    public string OfficialSourceUrl { get; set; } = "";
    public DateTime? LastCheckedAt { get; set; }
    public string EvidenceNotes { get; set; } = "";
    public string RenewalInfo { get; set; } = "";
    public string RightsNotes { get; set; } = "";
    public CertificationKind Kind { get; set; }
    public CertificationState State { get; set; } = CertificationState.ResearchCandidate;
    public bool HasNonMcqTasks { get; set; }
    public string NonMcqDisclosure { get; set; } = "";
    public Guid? ReplacedById { get; set; }
    public Guid? ReviewerId { get; set; } // who verified the current content (cleared on every substantive edit)
    public DateTime? VerifiedAt { get; set; }
    public Guid? LastEditedBy { get; set; }
    public DateTime? StaleFlaggedAt { get; set; } // set by the daily job when LastCheckedAt is older than the freshness window
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class CertificationObjective
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CertificationId { get; set; }
    public string Code { get; set; } = "";
    public string Title { get; set; } = "";
    public decimal WeightPercent { get; set; }
    public int SortOrder { get; set; }
}

public class CourseCertification { public Guid CourseId { get; set; } public Guid CertificationId { get; set; } public DateTime CreatedAt { get; set; } = DateTime.UtcNow; }
public class ObjectiveLesson { public Guid ObjectiveId { get; set; } public Guid LessonId { get; set; } }
public class ObjectiveQuestion { public Guid ObjectiveId { get; set; } public Guid QuestionId { get; set; } }

// ---------- Pathways / collections ----------
public class Pathway
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Slug { get; set; } = "";
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public string DescriptionEn { get; set; } = "";
    public string DescriptionAr { get; set; } = "";
    public CourseLevel Level { get; set; }
    public int? CategoryId { get; set; } // academy the pathway belongs to (optional)
    public bool IsPublished { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
public class PathwayCourse { public Guid PathwayId { get; set; } public Guid CourseId { get; set; } public int SortOrder { get; set; } }
public class PathwaySkill { public Guid PathwayId { get; set; } public int SkillId { get; set; } }

public enum CollectionKind { Editorial, Topic }
public class Collection
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Slug { get; set; } = "";
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public CollectionKind Kind { get; set; }
    public int? CategoryId { get; set; } // featured on that academy page when set
    public DateTime? ActiveFrom { get; set; }
    public DateTime? ActiveTo { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
public class CollectionCourse { public Guid CollectionId { get; set; } public Guid CourseId { get; set; } public int SortOrder { get; set; } }

/// <summary>Daily-computed bestseller statistics (see docs/api-contract-wave3/taxonomy.md for the rule).</summary>
public class BestsellerStat
{
    public Guid CourseId { get; set; }
    public int DistinctBuyers { get; set; }
    public decimal NetRevenue { get; set; }
    public bool Eligible { get; set; }
    public DateTime WindowStart { get; set; }
    public DateTime ComputedAt { get; set; }
}

// ---------- Production backlog ----------
public enum CourseIdeaState { Idea, Validating, Approved, InProduction, Published, Rejected }
public class CourseIdea
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = "";
    public string Audience { get; set; } = "";
    public string Rationale { get; set; } = "";
    public string DemandEvidence { get; set; } = "";
    public string Group { get; set; } = "";
    public CourseIdeaState State { get; set; } = CourseIdeaState.Idea;
    public Guid? OwnerId { get; set; }
    public Guid? UpdateOwnerId { get; set; }
    public Guid? LinkedCourseId { get; set; }
    public string CertificationIds { get; set; } = ""; // comma-separated certification ids
    public string MaintenanceCostNote { get; set; } = "";
    public int PriorityScore { get; set; }
    public int? RoadmapRank { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

// ---------- EF configuration (auto-discovered) ----------
public class TaxonomyConfigurations :
    IEntityTypeConfiguration<Skill>, IEntityTypeConfiguration<CourseSkill>, IEntityTypeConfiguration<CertificationIssuer>,
    IEntityTypeConfiguration<Certification>, IEntityTypeConfiguration<CertificationObjective>, IEntityTypeConfiguration<CourseCertification>,
    IEntityTypeConfiguration<ObjectiveLesson>, IEntityTypeConfiguration<ObjectiveQuestion>, IEntityTypeConfiguration<Pathway>,
    IEntityTypeConfiguration<PathwayCourse>, IEntityTypeConfiguration<PathwaySkill>, IEntityTypeConfiguration<Collection>,
    IEntityTypeConfiguration<CollectionCourse>, IEntityTypeConfiguration<BestsellerStat>, IEntityTypeConfiguration<CourseIdea>
{
    public void Configure(EntityTypeBuilder<Skill> b)
    {
        b.ToTable("Taxonomy_Skills");
        b.Property(x => x.Code).HasMaxLength(64);
        b.Property(x => x.NameEn).HasMaxLength(200);
        b.Property(x => x.NameAr).HasMaxLength(200);
        b.HasIndex(x => x.Code).IsUnique();
    }
    public void Configure(EntityTypeBuilder<CourseSkill> b)
    {
        b.ToTable("Taxonomy_CourseSkills");
        b.HasIndex(x => new { x.CourseId, x.SkillId });
        b.HasIndex(x => x.SkillId);
    }
    public void Configure(EntityTypeBuilder<CertificationIssuer> b)
    {
        b.ToTable("Taxonomy_CertificationIssuers");
        b.Property(x => x.Name).HasMaxLength(200);
        b.Property(x => x.Country).HasMaxLength(100);
        b.Property(x => x.WebsiteUrl).HasMaxLength(500);
        b.HasIndex(x => x.Name).IsUnique();
    }
    public void Configure(EntityTypeBuilder<Certification> b)
    {
        b.ToTable("Taxonomy_Certifications");
        b.Property(x => x.Slug).HasMaxLength(160);
        b.Property(x => x.Title).HasMaxLength(250);
        b.Property(x => x.Jurisdiction).HasMaxLength(100);
        b.Property(x => x.ExamCode).HasMaxLength(64);
        b.Property(x => x.LevelOrPart).HasMaxLength(100);
        b.Property(x => x.Version).HasMaxLength(64);
        b.Property(x => x.OfficialSourceUrl).HasMaxLength(1000);
        foreach (var p in new[] { nameof(Certification.Prerequisites), nameof(Certification.EvidenceNotes), nameof(Certification.RenewalInfo),
                     nameof(Certification.RightsNotes), nameof(Certification.NonMcqDisclosure) })
            b.Property(p).HasColumnType("longtext");
        b.Property(x => x.Kind).HasConversion<string>().HasMaxLength(32);
        b.Property(x => x.State).HasConversion<string>().HasMaxLength(32);
        b.HasIndex(x => x.Slug).IsUnique();
        b.HasIndex(x => x.State);
        b.HasIndex(x => x.IssuerId);
    }
    public void Configure(EntityTypeBuilder<CertificationObjective> b)
    {
        b.ToTable("Taxonomy_CertificationObjectives");
        b.Property(x => x.Code).HasMaxLength(64);
        b.Property(x => x.Title).HasMaxLength(500);
        b.Property(x => x.WeightPercent).HasPrecision(18, 4);
        b.HasIndex(x => new { x.CertificationId, x.Code }).IsUnique();
    }
    public void Configure(EntityTypeBuilder<CourseCertification> b)
    {
        b.ToTable("Taxonomy_CourseCertifications");
        b.HasKey(x => new { x.CourseId, x.CertificationId });
        b.HasIndex(x => x.CertificationId);
    }
    public void Configure(EntityTypeBuilder<ObjectiveLesson> b)
    {
        b.ToTable("Taxonomy_ObjectiveLessons");
        b.HasKey(x => new { x.ObjectiveId, x.LessonId });
        b.HasIndex(x => x.LessonId);
    }
    public void Configure(EntityTypeBuilder<ObjectiveQuestion> b)
    {
        b.ToTable("Taxonomy_ObjectiveQuestions");
        b.HasKey(x => new { x.ObjectiveId, x.QuestionId });
        b.HasIndex(x => x.QuestionId);
    }
    public void Configure(EntityTypeBuilder<Pathway> b)
    {
        b.ToTable("Taxonomy_Pathways");
        b.Property(x => x.Slug).HasMaxLength(160);
        b.Property(x => x.TitleEn).HasMaxLength(250);
        b.Property(x => x.TitleAr).HasMaxLength(250);
        b.Property(x => x.DescriptionEn).HasColumnType("longtext");
        b.Property(x => x.DescriptionAr).HasColumnType("longtext");
        b.HasIndex(x => x.Slug).IsUnique();
    }
    public void Configure(EntityTypeBuilder<PathwayCourse> b) { b.ToTable("Taxonomy_PathwayCourses"); b.HasKey(x => new { x.PathwayId, x.CourseId }); }
    public void Configure(EntityTypeBuilder<PathwaySkill> b) { b.ToTable("Taxonomy_PathwaySkills"); b.HasKey(x => new { x.PathwayId, x.SkillId }); }
    public void Configure(EntityTypeBuilder<Collection> b)
    {
        b.ToTable("Taxonomy_Collections");
        b.Property(x => x.Slug).HasMaxLength(160);
        b.Property(x => x.TitleEn).HasMaxLength(250);
        b.Property(x => x.TitleAr).HasMaxLength(250);
        b.Property(x => x.Kind).HasConversion<string>().HasMaxLength(32);
        b.HasIndex(x => x.Slug).IsUnique();
    }
    public void Configure(EntityTypeBuilder<CollectionCourse> b) { b.ToTable("Taxonomy_CollectionCourses"); b.HasKey(x => new { x.CollectionId, x.CourseId }); }
    public void Configure(EntityTypeBuilder<BestsellerStat> b)
    {
        b.ToTable("Taxonomy_BestsellerStats");
        b.HasKey(x => x.CourseId);
        b.Property(x => x.NetRevenue).HasPrecision(18, 4);
    }
    public void Configure(EntityTypeBuilder<CourseIdea> b)
    {
        b.ToTable("Taxonomy_CourseIdeas");
        b.Property(x => x.Title).HasMaxLength(250);
        b.Property(x => x.Group).HasMaxLength(200);
        b.Property(x => x.State).HasConversion<string>().HasMaxLength(32);
        foreach (var p in new[] { nameof(CourseIdea.Audience), nameof(CourseIdea.Rationale), nameof(CourseIdea.DemandEvidence),
                     nameof(CourseIdea.CertificationIds), nameof(CourseIdea.MaintenanceCostNote) })
            b.Property(p).HasColumnType("longtext");
        b.HasIndex(x => x.Title).IsUnique();
        b.HasIndex(x => x.State);
    }
}
