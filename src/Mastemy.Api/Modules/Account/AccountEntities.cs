using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Account;

/// <summary>1:1 profile side table for <see cref="Domain.User"/> (display name and language stay on User).</summary>
public class AccountProfile
{
    public Guid UserId { get; set; }
    public string Headline { get; set; } = "";
    public string Bio { get; set; } = "";
    public string TimeZone { get; set; } = "UTC";
    /// <summary>JSON array of {label,url}; https only.</summary>
    public string LinksJson { get; set; } = "[]";
    /// <summary>Instructor profile is shown publicly (only for users holding the Instructor role).</summary>
    public bool PublicInstructorProfile { get; set; }
    public DateTime? DeletedAt { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Goal / skill / language onboarding answers (spec §16).</summary>
public class LearningGoals
{
    public Guid UserId { get; set; }
    public string Goals { get; set; } = "";
    /// <summary>Newline-separated skills of interest.</summary>
    public string SkillsOfInterest { get; set; } = "";
    public string LearningLanguage { get; set; } = "en";
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum SkillEvidenceKind { SelfDeclared = 1, ExternalCredential = 2 }

/// <summary>User-entered skill evidence. Never verified by Mastemy.</summary>
public class UserSkill
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public SkillEvidenceKind Kind { get; set; }
    public string Name { get; set; } = "";
    public string Issuer { get; set; } = "";
    public string CredentialUrl { get; set; } = "";
    public DateTime? ObtainedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class AccountProfileConfig : IEntityTypeConfiguration<AccountProfile>
{
    public void Configure(EntityTypeBuilder<AccountProfile> b)
    {
        b.ToTable("Account_Profiles");
        b.HasKey(x => x.UserId);
        b.Property(x => x.Headline).HasMaxLength(160).IsRequired();
        b.Property(x => x.Bio).HasColumnType("longtext").IsRequired();
        b.Property(x => x.TimeZone).HasMaxLength(64).IsRequired();
        b.Property(x => x.LinksJson).HasColumnType("longtext").IsRequired();
        b.HasOne<Domain.User>().WithOne().HasForeignKey<AccountProfile>(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class LearningGoalsConfig : IEntityTypeConfiguration<LearningGoals>
{
    public void Configure(EntityTypeBuilder<LearningGoals> b)
    {
        b.ToTable("Account_LearningGoals");
        b.HasKey(x => x.UserId);
        b.Property(x => x.Goals).HasColumnType("longtext").IsRequired();
        b.Property(x => x.SkillsOfInterest).HasColumnType("longtext").IsRequired();
        b.Property(x => x.LearningLanguage).HasMaxLength(16).IsRequired();
        b.HasOne<Domain.User>().WithOne().HasForeignKey<LearningGoals>(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class UserSkillConfig : IEntityTypeConfiguration<UserSkill>
{
    public void Configure(EntityTypeBuilder<UserSkill> b)
    {
        b.ToTable("Account_UserSkills");
        b.HasKey(x => x.Id);
        b.Property(x => x.Name).HasMaxLength(100).IsRequired();
        b.Property(x => x.Issuer).HasMaxLength(150).IsRequired();
        b.Property(x => x.CredentialUrl).HasMaxLength(500).IsRequired();
        b.HasIndex(x => x.UserId);
        b.HasOne<Domain.User>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}
