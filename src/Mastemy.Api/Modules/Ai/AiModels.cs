using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Ai;

// ---------- Entities (module-owned tables, prefixed "Ai_") ----------

public static class AiSourceKinds
{
    public const string Notes = "Notes", PremiumNotes = "PremiumNotes", Transcript = "Transcript";
}

/// <summary>
/// One retrievable passage of APPROVED, PUBLISHED course material (lesson notes, premium notes, caption transcript),
/// rebuilt from the course's latest snapshot. Questions, options, rationales and answer keys are never indexed.
/// </summary>
public class AiChunk
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public int SnapshotVersion { get; set; }
    public Guid LessonId { get; set; }
    public string LessonTitle { get; set; } = "";
    public string Section { get; set; } = ""; // heading path for notes, "mm:ss" for transcripts
    public string SourceKind { get; set; } = AiSourceKinds.Notes;
    public bool IsPremium { get; set; }
    public int? StartSeconds { get; set; }
    public int Ordinal { get; set; }
    public string Text { get; set; } = "";
    public int TokenEstimate { get; set; }
}

/// <summary>Which snapshot version a course's chunks were built from.</summary>
public class AiIndexState
{
    public Guid CourseId { get; set; }
    public int SnapshotVersion { get; set; }
    public int ChunkCount { get; set; }
    public DateTime IndexedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>A learner's private tutor conversation, scoped to one course. Content is readable only by its owner.</summary>
public class AiConversation
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public string Title { get; set; } = "";
    public int MessageCount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastMessageAt { get; set; } = DateTime.UtcNow;
}

public class AiMessage
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ConversationId { get; set; }
    public string Role { get; set; } = "user"; // user | assistant
    public string Content { get; set; } = "";
    public string CitationsJson { get; set; } = "[]";
    public bool Grounded { get; set; }
    public string? Outcome { get; set; } // answered, not_covered, declined_assessment_item, refused, error
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Metered usage of one provider call (no prompt/response content).</summary>
public class AiUsageRecord
{
    public long Id { get; set; }
    public Guid UserId { get; set; }
    public Guid? OrganizationId { get; set; }
    public Guid? CourseId { get; set; }
    public string Feature { get; set; } = ""; // tutor, practice, assist.*, mcq_drafts
    public string Model { get; set; } = "";
    public int InputTokens { get; set; }
    public int OutputTokens { get; set; }
    public int CacheReadTokens { get; set; }
    public int CacheWriteTokens { get; set; }
    public decimal CostEstimate { get; set; }
    public string Period { get; set; } = ""; // yyyy-MM (UTC)
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Side table flagging a Draft question as AI-generated (it still needs the normal human review workflow).</summary>
public class AiGeneratedQuestion
{
    public Guid QuestionId { get; set; }
    public Guid CourseId { get; set; }
    public string Model { get; set; } = "";
    public Guid RequestedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Ephemeral, non-scored, unreviewed AI practice set for one learner. Never mixed with the reviewed bank.</summary>
public class AiPracticeSet
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public Guid? LessonId { get; set; }
    public string PayloadJson { get; set; } = "[]"; // includes the generated keys; only revealed through /check
    public string Model { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime ExpiresAt { get; set; }
}

// ---------- EF configuration (auto-discovered) ----------

public class AiChunkConfig : IEntityTypeConfiguration<AiChunk>
{
    public void Configure(EntityTypeBuilder<AiChunk> b)
    {
        b.ToTable("Ai_Chunks");
        b.HasKey(x => x.Id);
        b.Property(x => x.LessonTitle).HasMaxLength(255);
        b.Property(x => x.Section).HasMaxLength(255);
        b.Property(x => x.SourceKind).HasMaxLength(32);
        b.Property(x => x.Text).HasColumnType("longtext");
        b.HasIndex(x => new { x.CourseId, x.SnapshotVersion });
    }
}

public class AiIndexStateConfig : IEntityTypeConfiguration<AiIndexState>
{
    public void Configure(EntityTypeBuilder<AiIndexState> b)
    {
        b.ToTable("Ai_IndexStates");
        b.HasKey(x => x.CourseId);
    }
}

public class AiConversationConfig : IEntityTypeConfiguration<AiConversation>
{
    public void Configure(EntityTypeBuilder<AiConversation> b)
    {
        b.ToTable("Ai_Conversations");
        b.HasKey(x => x.Id);
        b.Property(x => x.Title).HasMaxLength(200);
        b.HasIndex(x => new { x.UserId, x.CourseId });
        b.HasIndex(x => x.LastMessageAt);
    }
}

public class AiMessageConfig : IEntityTypeConfiguration<AiMessage>
{
    public void Configure(EntityTypeBuilder<AiMessage> b)
    {
        b.ToTable("Ai_Messages");
        b.HasKey(x => x.Id);
        b.Property(x => x.Role).HasMaxLength(16);
        b.Property(x => x.Content).HasColumnType("longtext");
        b.Property(x => x.CitationsJson).HasColumnType("longtext");
        b.Property(x => x.Outcome).HasMaxLength(64);
        b.HasIndex(x => new { x.ConversationId, x.CreatedAt });
        b.HasOne<AiConversation>().WithMany().HasForeignKey(x => x.ConversationId).OnDelete(DeleteBehavior.Cascade);
    }
}

public class AiUsageRecordConfig : IEntityTypeConfiguration<AiUsageRecord>
{
    public void Configure(EntityTypeBuilder<AiUsageRecord> b)
    {
        b.ToTable("Ai_Usage");
        b.HasKey(x => x.Id);
        b.Property(x => x.Feature).HasMaxLength(64);
        b.Property(x => x.Model).HasMaxLength(100);
        b.Property(x => x.Period).HasMaxLength(7);
        b.Property(x => x.CostEstimate).HasPrecision(18, 6);
        b.HasIndex(x => new { x.Period, x.UserId });
        b.HasIndex(x => new { x.Period, x.OrganizationId });
    }
}

public class AiGeneratedQuestionConfig : IEntityTypeConfiguration<AiGeneratedQuestion>
{
    public void Configure(EntityTypeBuilder<AiGeneratedQuestion> b)
    {
        b.ToTable("Ai_GeneratedQuestions");
        b.HasKey(x => x.QuestionId);
        b.Property(x => x.Model).HasMaxLength(100);
        b.HasIndex(x => x.CourseId);
    }
}

public class AiPracticeSetConfig : IEntityTypeConfiguration<AiPracticeSet>
{
    public void Configure(EntityTypeBuilder<AiPracticeSet> b)
    {
        b.ToTable("Ai_PracticeSets");
        b.HasKey(x => x.Id);
        b.Property(x => x.PayloadJson).HasColumnType("longtext");
        b.Property(x => x.Model).HasMaxLength(100);
        b.HasIndex(x => new { x.UserId, x.CreatedAt });
        b.HasIndex(x => x.ExpiresAt);
    }
}

// ---------- Options ----------

public class AiPrice
{
    public decimal InputPerMTok { get; set; }
    public decimal OutputPerMTok { get; set; }
    public decimal CacheReadPerMTok { get; set; }
    public decimal CacheWritePerMTok { get; set; }
}

public class AiOptions
{
    public string ApiKey { get; set; } = "";
    public string BaseUrl { get; set; } = "https://api.anthropic.com";
    public string Model { get; set; } = "claude-opus-5-5";
    /// <summary>output_config.effort sent with every request (low/medium/high/xhigh/max).</summary>
    public string Effort { get; set; } = "medium";
    /// <summary>Server-side refusal fallbacks (fallbacks: "default", beta server-side-fallback-2026-07-01).</summary>
    public bool RefusalFallback { get; set; } = true;
    public int TimeoutSeconds { get; set; } = 300;

    public int TutorMaxOutputTokens { get; set; } = 4096;
    public int GenerationMaxOutputTokens { get; set; } = 16000;
    public int MaxUserMessageChars { get; set; } = 2000;
    public int MaxAssistInputChars { get; set; } = 60000;
    public int HistoryTurns { get; set; } = 6;
    public int RetrievalTopK { get; set; } = 6;
    public double RetrievalMinScore { get; set; } = 0.5;
    public int ChunkTokens { get; set; } = 800;

    public int UserMonthlyTokens { get; set; } = 200_000;
    public int PremiumUserMonthlyTokens { get; set; } = 600_000;
    public int InstructorMonthlyTokens { get; set; } = 2_000_000;
    public long OrgMonthlyTokens { get; set; } = 5_000_000;
    public long GlobalMonthlyTokens { get; set; } = 200_000_000;
    public int PerUserPerMinute { get; set; } = 10;

    public int ConversationRetentionDays { get; set; } = 90;
    public int PracticeSetHours { get; set; } = 24;
    public int IndexPollSeconds { get; set; } = 30;
    /// <summary>Runs the index/retention background worker (disable only in tests or on secondary nodes).</summary>
    public bool BackgroundEnabled { get; set; } = true;
    public double StemSimilarityThreshold { get; set; } = 0.6;

    public Dictionary<string, AiPrice> Pricing { get; set; } = new(StringComparer.OrdinalIgnoreCase)
    {
        ["claude-opus-5-5"] = new() { InputPerMTok = 4m, OutputPerMTok = 20m, CacheReadPerMTok = 0.2m, CacheWritePerMTok = 5m },
        ["claude-opus-5"] = new() { InputPerMTok = 5m, OutputPerMTok = 25m, CacheReadPerMTok = 0.5m, CacheWritePerMTok = 6.25m },
        ["claude-opus-4-8"] = new() { InputPerMTok = 5m, OutputPerMTok = 25m, CacheReadPerMTok = 0.5m, CacheWritePerMTok = 6.25m },
        ["claude-sonnet-5-5"] = new() { InputPerMTok = 2m, OutputPerMTok = 10m, CacheReadPerMTok = 0.2m, CacheWritePerMTok = 2.5m },
        ["claude-haiku-4-5"] = new() { InputPerMTok = 1m, OutputPerMTok = 5m, CacheReadPerMTok = 0.1m, CacheWritePerMTok = 1.25m },
    };

    public bool IsConfigured => !string.IsNullOrWhiteSpace(ApiKey);
}

// ---------- DTOs ----------

public record AiStatusDto(bool Configured, string? Model, string? Message);
public record CreateConversationInput(Guid CourseId, string? Title);
public record ConversationDto(Guid Id, Guid CourseId, string Title, int MessageCount, DateTime CreatedAt, DateTime LastMessageAt);
public record CitationDto(Guid ChunkId, Guid LessonId, string LessonTitle, string Section, string SourceKind, int? StartSeconds);
public record MessageDto(Guid Id, string Role, string Content, List<CitationDto> Citations, bool Grounded, string? Outcome, DateTime CreatedAt);
public record ConversationDetailDto(ConversationDto Conversation, List<MessageDto> Messages);
public record SendMessageInput(string Content);

public record PracticeInput(Guid CourseId, Guid? LessonId, int Count = 3);
public record PracticeOptionDto(int Index, string Text);
public record PracticeQuestionDto(int Index, string Stem, List<PracticeOptionDto> Options, bool MultipleSelect);
public record PracticeSetDto(Guid Id, Guid CourseId, Guid? LessonId, string Label, bool AiGenerated, bool Reviewed, bool Scored,
    List<PracticeQuestionDto> Questions, DateTime ExpiresAt);
public record PracticeCheckInput(int QuestionIndex, List<int> Selected);
public record PracticeCheckDto(int QuestionIndex, bool Correct, List<int> CorrectIndexes, string Explanation, List<string> Rationales, string Label);

public enum AssistKind { Outline, VideoScript, LessonNotes, CaptionCleanup, Metadata }
public record AssistInput(AssistKind Kind, Guid? LessonId, string? Input, string? Language);
public record AssistResultDto(AssistKind Kind, string Draft, string Label, bool RequiresReview, string Model);
public record McqDraftInput(Guid? LessonId, int Count = 3, string? SourceText = null, string? Language = null);
public record McqDraftResultDto(List<Guid> CreatedQuestionIds, List<string> Rejected, string Label);

public record UsageSummaryDto(string Period, string Plan, long UsedTokens, long LimitTokens, long RemainingTokens);
public record UsageRowDto(string Key, long InputTokens, long OutputTokens, decimal CostEstimate, int Calls);
public record AdminUsageDto(string Period, long TotalTokens, decimal TotalCost, long GlobalLimit, List<UsageRowDto> ByFeature,
    List<UsageRowDto> ByModel, List<UsageRowDto> TopUsers, List<UsageRowDto> ByOrganization);
public record ConversationMetaDto(Guid Id, Guid UserId, Guid CourseId, int MessageCount, DateTime CreatedAt, DateTime LastMessageAt);
