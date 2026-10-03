using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.StudyPath;

// ---------- Entities ----------

public class StudyPathRecommendation
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public string RecommendedLessonIds { get; set; } = "[]";
    public string Reasoning { get; set; } = "";
    public string OptimalOrder { get; set; } = "[]";
    public int EstimatedMinutes { get; set; }
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
}

public class LearningStreak
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public int CurrentStreak { get; set; }
    public int LongestStreak { get; set; }
    public DateTime LastActivityUtc { get; set; } = DateTime.UtcNow;
    public int TotalMinutesThisWeek { get; set; }
    public int WeeklyGoalMinutes { get; set; } = 60;
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedUtc { get; set; } = DateTime.UtcNow;
}

public class DailyChallenge
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public string ChallengeType { get; set; } = "";
    public string ChallengeJson { get; set; } = "{}";
    public DateTime? CompletedAt { get; set; }
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
}

// ---------- EF Configuration ----------

public class StudyPathRecommendationConfig : IEntityTypeConfiguration<StudyPathRecommendation>
{
    public void Configure(EntityTypeBuilder<StudyPathRecommendation> b)
    {
        b.ToTable("StudyPath_Recommendations");
        b.HasKey(x => x.Id);
        b.Property(x => x.RecommendedLessonIds).HasColumnType("longtext");
        b.Property(x => x.Reasoning).HasColumnType("longtext");
        b.Property(x => x.OptimalOrder).HasColumnType("longtext");
        b.HasIndex(x => new { x.UserId, x.CourseId });
    }
}

public class LearningStreakConfig : IEntityTypeConfiguration<LearningStreak>
{
    public void Configure(EntityTypeBuilder<LearningStreak> b)
    {
        b.ToTable("StudyPath_Streaks");
        b.HasKey(x => x.Id);
        b.HasIndex(x => x.UserId).IsUnique();
    }
}

public class DailyChallengeConfig : IEntityTypeConfiguration<DailyChallenge>
{
    public void Configure(EntityTypeBuilder<DailyChallenge> b)
    {
        b.ToTable("StudyPath_DailyChallenges");
        b.HasKey(x => x.Id);
        b.Property(x => x.ChallengeType).HasMaxLength(64);
        b.Property(x => x.ChallengeJson).HasColumnType("longtext");
        b.HasIndex(x => new { x.UserId, x.CreatedUtc });
    }
}

// ---------- DTOs ----------

public record StudyPathRecommendationDto(
    Guid Id, Guid CourseId, List<Guid> RecommendedLessonIds, string Reasoning,
    List<OptimalOrderItem> OptimalOrder, int EstimatedMinutes, DateTime CreatedUtc);

public record OptimalOrderItem(Guid LessonId, string Title, string Reason);

public record LearningStreakDto(
    int CurrentStreak, int LongestStreak, DateTime LastActivityUtc,
    int TotalMinutesThisWeek, int WeeklyGoalMinutes);

public record DailyChallengeDto(
    Guid Id, Guid CourseId, string ChallengeType, DailyChallengeContent Challenge,
    bool Completed, DateTime CreatedUtc);

public record DailyChallengeContent(string Question, string Hint, string Type);

public record RecordActivityInput(int Minutes);
