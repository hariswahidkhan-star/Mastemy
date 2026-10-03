using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Lab;

public static class LabModule
{
    public static void Add(IServiceCollection s, IConfiguration cfg)
    {
        s.AddScoped<LabService>();
        s.AddScoped<LabBlueprintService>();
    }
}

public class LabBlueprintConfig : IEntityTypeConfiguration<LabBlueprint>
{
    public void Configure(EntityTypeBuilder<LabBlueprint> b)
    {
        b.ToTable("Lab_Blueprints");
        b.HasKey(x => x.Id);
        b.HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
        b.Property(x => x.Engine).HasConversion<string>().HasMaxLength(30);
        b.Property(x => x.Difficulty).HasConversion<string>().HasMaxLength(20);
        b.Property(x => x.Title).HasMaxLength(300);
        b.Property(x => x.StarterCode).HasColumnType("longtext");
        b.Property(x => x.SolutionCode).HasColumnType("longtext");
        b.Property(x => x.SeedDataJson).HasColumnType("longtext");
        b.Property(x => x.ChecksJson).HasColumnType("longtext");
        b.Property(x => x.HintsJson).HasColumnType("longtext");
        b.Property(x => x.InstructionsMarkdown).HasColumnType("longtext");
        b.HasIndex(x => new { x.CourseId, x.SortOrder });
    }
}

public class LabSessionConfig : IEntityTypeConfiguration<LabSession>
{
    public void Configure(EntityTypeBuilder<LabSession> b)
    {
        b.ToTable("Lab_Sessions");
        b.HasKey(x => x.Id);
        b.HasOne<LabBlueprint>().WithMany().HasForeignKey(x => x.BlueprintId);
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId);
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(20);
        b.Property(x => x.Code).HasColumnType("longtext");
        b.Property(x => x.CheckResultsJson).HasColumnType("longtext");
        b.Property(x => x.FeedbackJson).HasColumnType("longtext");
        b.Property(x => x.ScorePercent).HasPrecision(5, 2);
        b.HasIndex(x => new { x.UserId, x.BlueprintId });
    }
}

public class LabEvidenceConfig : IEntityTypeConfiguration<LabEvidence>
{
    public void Configure(EntityTypeBuilder<LabEvidence> b)
    {
        b.ToTable("Lab_Evidence");
        b.HasKey(x => x.Id);
        b.HasOne<LabSession>().WithMany().HasForeignKey(x => x.SessionId);
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId);
        b.Property(x => x.SkillCode).HasMaxLength(100);
        b.Property(x => x.CompetencyCode).HasMaxLength(100);
        b.Property(x => x.EvidenceType).HasMaxLength(50);
        b.Property(x => x.Detail).HasColumnType("longtext");
        b.HasIndex(x => new { x.UserId, x.SkillCode });
    }
}
