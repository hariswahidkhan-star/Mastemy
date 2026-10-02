using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Authoring;

/// <summary>
/// Full history of a lesson's instructor notes. Every notes save writes one row whose <see cref="Revision"/> equals the
/// lesson's new <see cref="Lesson.NotesVersion"/>. The unique (LessonId, Revision) index is the optimistic-concurrency
/// guard: two saves racing from the same base version cannot both insert the next revision.
/// </summary>
public class LessonRevision
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid LessonId { get; set; }
    public Guid CourseId { get; set; }
    public int Revision { get; set; }
    public string NotesMarkdown { get; set; } = "";
    public string? PremiumNotesMarkdown { get; set; }
    public Guid? AuthorId { get; set; }
    public int? RestoredFromRevision { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Staff-managed course skeleton (modules/lessons) plus a production checklist, applied when a course is created.</summary>
public class CourseTemplate
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public string Description { get; set; } = "";
    public string StructureJson { get; set; } = "[]"; // [{ title, lessons: [{ title, objective }] }]
    public string ChecklistJson { get; set; } = "[]"; // ["item", ...]
    public bool IsActive { get; set; } = true;
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Per-course production checklist item (copied from a template; toggled by the course team).</summary>
public class CourseChecklistItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public string Text { get; set; } = "";
    public int SortOrder { get; set; }
    public bool Done { get; set; }
    public Guid? DoneBy { get; set; }
    public DateTime? DoneAt { get; set; }
    public Guid? TemplateId { get; set; }
}

/// <summary>Links language variants of the same course: every course in a group is a translation of the others.</summary>
public class CourseTranslation
{
    public Guid CourseId { get; set; }
    public Guid GroupId { get; set; }
    public Guid LinkedBy { get; set; }
    public DateTime LinkedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>A published version of the instructor content agreement.</summary>
public class AgreementVersion
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Version { get; set; } = "";
    public string Title { get; set; } = "";
    public string Body { get; set; } = "";
    public Guid CreatedBy { get; set; }
    public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
}

public class AgreementAcceptance
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AgreementVersionId { get; set; }
    public Guid UserId { get; set; }
    public DateTime AcceptedAt { get; set; } = DateTime.UtcNow;
}

public class LessonRevisionConfig : IEntityTypeConfiguration<LessonRevision>
{
    public void Configure(EntityTypeBuilder<LessonRevision> b)
    {
        b.ToTable("Authoring_LessonRevisions");
        b.HasKey(x => x.Id);
        b.HasIndex(x => new { x.LessonId, x.Revision }).IsUnique();
        b.HasIndex(x => new { x.CourseId, x.CreatedAt });
        b.Property(x => x.NotesMarkdown).HasColumnType("longtext");
        b.Property(x => x.PremiumNotesMarkdown).HasColumnType("longtext");
        b.HasOne<Lesson>().WithMany().HasForeignKey(x => x.LessonId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class CourseTemplateConfig : IEntityTypeConfiguration<CourseTemplate>
{
    public void Configure(EntityTypeBuilder<CourseTemplate> b)
    {
        b.ToTable("Authoring_CourseTemplates");
        b.HasKey(x => x.Id);
        b.Property(x => x.Name).HasMaxLength(200);
        b.HasIndex(x => x.Name).IsUnique();
        b.Property(x => x.Description).HasColumnType("longtext");
        b.Property(x => x.StructureJson).HasColumnType("longtext");
        b.Property(x => x.ChecklistJson).HasColumnType("longtext");
    }
}

public class CourseChecklistItemConfig : IEntityTypeConfiguration<CourseChecklistItem>
{
    public void Configure(EntityTypeBuilder<CourseChecklistItem> b)
    {
        b.ToTable("Authoring_CourseChecklistItems");
        b.HasKey(x => x.Id);
        b.HasIndex(x => new { x.CourseId, x.SortOrder });
        b.HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class CourseTranslationConfig : IEntityTypeConfiguration<CourseTranslation>
{
    public void Configure(EntityTypeBuilder<CourseTranslation> b)
    {
        b.ToTable("Authoring_CourseTranslations");
        b.HasKey(x => x.CourseId);
        b.HasIndex(x => x.GroupId);
        b.HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class AgreementVersionConfig : IEntityTypeConfiguration<AgreementVersion>
{
    public void Configure(EntityTypeBuilder<AgreementVersion> b)
    {
        b.ToTable("Authoring_AgreementVersions");
        b.HasKey(x => x.Id);
        b.Property(x => x.Version).HasMaxLength(64);
        b.HasIndex(x => x.Version).IsUnique();
        b.HasIndex(x => x.PublishedAt);
        b.Property(x => x.Body).HasColumnType("longtext");
    }
}

public class AgreementAcceptanceConfig : IEntityTypeConfiguration<AgreementAcceptance>
{
    public void Configure(EntityTypeBuilder<AgreementAcceptance> b)
    {
        b.ToTable("Authoring_AgreementAcceptances");
        b.HasKey(x => x.Id);
        b.HasIndex(x => new { x.AgreementVersionId, x.UserId }).IsUnique();
        b.HasOne<AgreementVersion>().WithMany().HasForeignKey(x => x.AgreementVersionId).OnDelete(DeleteBehavior.Restrict);
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}
