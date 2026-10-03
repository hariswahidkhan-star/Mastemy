using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Scenario;

// ---------- Enums ----------

public enum ScenarioCategory
{
    ClientMeeting, Interview, IncidentResponse, Negotiation, Presentation,
    Audit, Consultation, Management, CrisisManagement, CustomerService
}

// ---------- Entities ----------

public class ScenarioTemplate
{
    public int Id { get; set; }
    public Guid? CourseId { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public ScenarioCategory Category { get; set; }
    public string CharacterName { get; set; } = "";
    public string CharacterRole { get; set; } = "";
    public string CharacterPersonality { get; set; } = "";
    public string SituationBrief { get; set; } = "";
    public string SystemPrompt { get; set; } = "";
    public string ScoringRubricJson { get; set; } = "[]";
    public int MaxTurns { get; set; } = 10;
    public string Difficulty { get; set; } = "Intermediate";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
}

public class ScenarioSession
{
    public long Id { get; set; }
    public int TemplateId { get; set; }
    public Guid UserId { get; set; }
    public string TranscriptJson { get; set; } = "[]";
    public int TurnCount { get; set; }
    public bool IsCompleted { get; set; }
    public string? ScoresJson { get; set; }
    public decimal? OverallScore { get; set; }
    public string? SummaryFeedback { get; set; }
    public DateTime StartedUtc { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedUtc { get; set; }
}

// ---------- EF configuration ----------

public class ScenarioTemplateConfig : IEntityTypeConfiguration<ScenarioTemplate>
{
    public void Configure(EntityTypeBuilder<ScenarioTemplate> b)
    {
        b.ToTable("Scenario_Templates");
        b.HasKey(x => x.Id);
        b.Property(x => x.Title).HasMaxLength(300);
        b.Property(x => x.Description).HasColumnType("longtext");
        b.Property(x => x.Category).HasConversion<string>().HasMaxLength(30);
        b.Property(x => x.CharacterName).HasMaxLength(100);
        b.Property(x => x.CharacterRole).HasMaxLength(200);
        b.Property(x => x.CharacterPersonality).HasColumnType("longtext");
        b.Property(x => x.SituationBrief).HasColumnType("longtext");
        b.Property(x => x.SystemPrompt).HasColumnType("longtext");
        b.Property(x => x.ScoringRubricJson).HasColumnType("longtext");
        b.Property(x => x.Difficulty).HasMaxLength(30);
        b.HasIndex(x => x.CourseId);
        b.HasIndex(x => x.Category);
    }
}

public class ScenarioSessionConfig : IEntityTypeConfiguration<ScenarioSession>
{
    public void Configure(EntityTypeBuilder<ScenarioSession> b)
    {
        b.ToTable("Scenario_Sessions");
        b.HasKey(x => x.Id);
        b.HasOne<ScenarioTemplate>().WithMany().HasForeignKey(x => x.TemplateId);
        b.Property(x => x.TranscriptJson).HasColumnType("longtext");
        b.Property(x => x.ScoresJson).HasColumnType("longtext");
        b.Property(x => x.SummaryFeedback).HasColumnType("longtext");
        b.Property(x => x.OverallScore).HasPrecision(5, 2);
        b.HasIndex(x => new { x.UserId, x.TemplateId });
        b.HasIndex(x => x.StartedUtc);
    }
}

// ---------- DTOs ----------

public record ScenarioTemplateDto(
    int Id, Guid? CourseId, string Title, string Description, string Category,
    string CharacterName, string CharacterRole, string SituationBrief,
    int MaxTurns, string Difficulty, DateTime CreatedUtc);

public record ScenarioTemplateDetailDto(
    int Id, Guid? CourseId, string Title, string Description, string Category,
    string CharacterName, string CharacterRole, string CharacterPersonality,
    string SituationBrief, string SystemPrompt, string ScoringRubricJson,
    int MaxTurns, string Difficulty, bool IsActive, DateTime CreatedUtc);

public record ScenarioSessionDto(
    long Id, int TemplateId, string TemplateTitle, string CharacterName,
    string Category, int TurnCount, int MaxTurns, bool IsCompleted,
    decimal? OverallScore, DateTime StartedUtc, DateTime? CompletedUtc);

public record ScenarioSessionDetailDto(
    long Id, int TemplateId, string TemplateTitle, string CharacterName, string CharacterRole,
    string Category, string SituationBrief, int TurnCount, int MaxTurns, bool IsCompleted,
    List<ScenarioMessageDto> Transcript, List<ScenarioDimensionScoreDto>? Scores,
    decimal? OverallScore, string? SummaryFeedback, DateTime StartedUtc, DateTime? CompletedUtc);

public record ScenarioMessageDto(string Role, string Content, DateTime Timestamp);

public record ScenarioDimensionScoreDto(string Dimension, decimal Score, decimal Weight, string Feedback);

public record StartScenarioInput(int TemplateId);
public record ScenarioRespondInput(string Message);

public record CreateScenarioTemplateInput(
    Guid? CourseId, string Title, string Description, string Category,
    string CharacterName, string CharacterRole, string CharacterPersonality,
    string SituationBrief, string SystemPrompt, string ScoringRubricJson,
    int MaxTurns, string Difficulty);

public record UpdateScenarioTemplateInput(
    string? Title, string? Description, string? Category,
    string? CharacterName, string? CharacterRole, string? CharacterPersonality,
    string? SituationBrief, string? SystemPrompt, string? ScoringRubricJson,
    int? MaxTurns, string? Difficulty, bool? IsActive);
