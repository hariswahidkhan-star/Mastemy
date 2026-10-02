using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Messaging;

public enum MessageKind { Text, Welcome, Completion }
public enum AutoMessageKind { Welcome, Completion }

/// <summary>
/// One thread per (course, learner): the learner on one side and the course's instructor team on the other. There is
/// no learner↔learner conversation by construction.
/// </summary>
public class Conversation
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CourseId { get; set; }
    public Guid LearnerId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastMessageAt { get; set; } = DateTime.UtcNow;
}

public class Message
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ConversationId { get; set; }
    public Guid SenderId { get; set; }
    public MessageKind Kind { get; set; } = MessageKind.Text;
    public string Body { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? HiddenAt { get; set; }
    public Guid? HiddenBy { get; set; }
    public string? HiddenReason { get; set; }
}

/// <summary>Per-user read marker for a conversation (unread counts).</summary>
public class ConversationRead
{
    public Guid ConversationId { get; set; }
    public Guid UserId { get; set; }
    public DateTime LastReadAt { get; set; }
}

/// <summary><see cref="BlockerId"/> no longer receives messages from <see cref="BlockedId"/>.</summary>
public class MessageBlock
{
    public Guid BlockerId { get; set; }
    public Guid BlockedId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>A participant's report on a message; each report files one Trust complaint.</summary>
public class MessageReport
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid MessageId { get; set; }
    public Guid ReporterId { get; set; }
    public Guid ComplaintId { get; set; }
    public string Reason { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Author-edited welcome / completion message for a course.</summary>
public class CourseAutoMessage
{
    public Guid CourseId { get; set; }
    public AutoMessageKind Kind { get; set; }
    public string Body { get; set; } = "";
    public bool Enabled { get; set; }
    /// <summary>When the message was (last) switched on: only enrollments/completions after this moment trigger it, so
    /// enabling a welcome message never blasts the existing learner base.</summary>
    public DateTime? EnabledSince { get; set; }
    public Guid UpdatedBy { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Idempotency record: at most one auto message per (user, course, kind), ever.</summary>
public class AutoMessageDelivery
{
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public AutoMessageKind Kind { get; set; }
    public Guid? MessageId { get; set; }
    public DateTime DeliveredAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Polling cursor of the auto-message worker.</summary>
public class MessagingWorkerState
{
    public string Key { get; set; } = "";
    public DateTime LastRunAt { get; set; }
}

public class MessagingConfigurations : IEntityTypeConfiguration<Conversation>, IEntityTypeConfiguration<Message>,
    IEntityTypeConfiguration<ConversationRead>, IEntityTypeConfiguration<MessageBlock>, IEntityTypeConfiguration<MessageReport>,
    IEntityTypeConfiguration<CourseAutoMessage>, IEntityTypeConfiguration<AutoMessageDelivery>, IEntityTypeConfiguration<MessagingWorkerState>
{
    public void Configure(EntityTypeBuilder<Conversation> b)
    {
        b.ToTable("Messaging_Conversations");
        b.HasIndex(x => new { x.CourseId, x.LearnerId }).IsUnique();
        b.HasIndex(x => new { x.LearnerId, x.LastMessageAt });
        b.HasIndex(x => new { x.CourseId, x.LastMessageAt });
    }

    public void Configure(EntityTypeBuilder<Message> b)
    {
        b.ToTable("Messaging_Messages");
        b.Property(x => x.Kind).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.Body).HasColumnType("longtext");
        b.Property(x => x.HiddenReason).HasMaxLength(500);
        b.HasIndex(x => new { x.ConversationId, x.CreatedAt });
        b.HasIndex(x => new { x.SenderId, x.CreatedAt });
        b.HasOne<Conversation>().WithMany().HasForeignKey(x => x.ConversationId).OnDelete(DeleteBehavior.Cascade);
    }

    public void Configure(EntityTypeBuilder<ConversationRead> b)
    {
        b.ToTable("Messaging_ReadMarkers");
        b.HasKey(x => new { x.ConversationId, x.UserId });
    }

    public void Configure(EntityTypeBuilder<MessageBlock> b)
    {
        b.ToTable("Messaging_Blocks");
        b.HasKey(x => new { x.BlockerId, x.BlockedId });
    }

    public void Configure(EntityTypeBuilder<MessageReport> b)
    {
        b.ToTable("Messaging_Reports");
        b.Property(x => x.Reason).HasMaxLength(2000);
        b.HasIndex(x => new { x.MessageId, x.ReporterId }).IsUnique();
    }

    public void Configure(EntityTypeBuilder<CourseAutoMessage> b)
    {
        b.ToTable("Messaging_CourseAutoMessages");
        b.HasKey(x => new { x.CourseId, x.Kind });
        b.Property(x => x.Kind).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.Body).HasColumnType("longtext");
    }

    public void Configure(EntityTypeBuilder<AutoMessageDelivery> b)
    {
        b.ToTable("Messaging_AutoMessageDeliveries");
        b.HasKey(x => new { x.UserId, x.CourseId, x.Kind });
        b.Property(x => x.Kind).HasConversion<string>().HasMaxLength(16);
    }

    public void Configure(EntityTypeBuilder<MessagingWorkerState> b)
    {
        b.ToTable("Messaging_WorkerState");
        b.HasKey(x => x.Key);
        b.Property(x => x.Key).HasMaxLength(64);
    }
}
