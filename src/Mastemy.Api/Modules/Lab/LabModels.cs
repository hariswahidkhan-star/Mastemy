namespace Mastemy.Api.Modules.Lab;

public enum LabEngine { Sql, JavaScript, Python, Spreadsheet, Terminal, ApiClient, DocumentEditor, Simulation, Prompt }
public enum LabDifficulty { Beginner, Intermediate, Advanced, Expert }
public enum LabSessionStatus { Active, Completed, Abandoned, TimedOut }

public class LabBlueprint
{
    public int Id { get; set; }
    public Guid CourseId { get; set; }
    public Guid? ModuleId { get; set; }
    public Guid? LessonId { get; set; }
    public LabEngine Engine { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public LabDifficulty Difficulty { get; set; }
    public int? TimeLimitMinutes { get; set; }
    public int? MaxAttempts { get; set; }
    public int SortOrder { get; set; }
    public string StarterCode { get; set; } = "";
    public string SolutionCode { get; set; } = "";
    public string SeedDataJson { get; set; } = "";
    public string ChecksJson { get; set; } = "";
    public string HintsJson { get; set; } = "";
    public string InstructionsMarkdown { get; set; } = "";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedUtc { get; set; } = DateTime.UtcNow;
}

public class LabSession
{
    public long Id { get; set; }
    public int BlueprintId { get; set; }
    public Guid UserId { get; set; }
    public LabSessionStatus Status { get; set; } = LabSessionStatus.Active;
    public int AttemptNumber { get; set; } = 1;
    public string Code { get; set; } = "";
    public DateTime StartedUtc { get; set; } = DateTime.UtcNow;
    public DateTime LastSavedUtc { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedUtc { get; set; }
    public int? DurationSeconds { get; set; }
    public decimal? ScorePercent { get; set; }
    public string? CheckResultsJson { get; set; }
    public int HintsUsed { get; set; }
    public string? FeedbackJson { get; set; }
}

public class LabEvidence
{
    public long Id { get; set; }
    public long SessionId { get; set; }
    public Guid UserId { get; set; }
    public string? SkillCode { get; set; }
    public string? CompetencyCode { get; set; }
    public string EvidenceType { get; set; } = "";
    public bool Passed { get; set; }
    public string? Detail { get; set; }
    public DateTime RecordedUtc { get; set; } = DateTime.UtcNow;
}
