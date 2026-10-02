using Mastemy.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Engagement;

/// <summary>
/// Latest moderation reason for a hidden user post (discussion thread / reply), shown to its author together with an appeal
/// link. Written by moderator hides and by trust &amp; safety complaint takedowns; removed when the post is unhidden.
/// </summary>
public class ModerationNote
{
    public const string Thread = "Discussion", Reply = "DiscussionReply";
    public string TargetType { get; set; } = "";
    public Guid TargetId { get; set; }
    public string Reason { get; set; } = "";
    public DateTime HiddenAt { get; set; } = DateTime.UtcNow;
}

public class ModerationNoteConfig : IEntityTypeConfiguration<ModerationNote>
{
    public void Configure(EntityTypeBuilder<ModerationNote> b)
    {
        b.ToTable("Engagement_ModerationNotes");
        b.HasKey(x => new { x.TargetType, x.TargetId });
        b.Property(x => x.TargetType).HasMaxLength(32);
        b.Property(x => x.Reason).HasMaxLength(2000);
    }
}

public static class ModerationNotes
{
    /// <summary>Stages (insert or replace) the note; caller saves.</summary>
    public static async Task Set(AppDbContext db, string targetType, Guid targetId, string reason)
    {
        reason = reason.Length > 2000 ? reason[..2000] : reason;
        var set = db.Set<ModerationNote>();
        var n = await set.FirstOrDefaultAsync(x => x.TargetType == targetType && x.TargetId == targetId);
        if (n is null) set.Add(new ModerationNote { TargetType = targetType, TargetId = targetId, Reason = reason });
        else { n.Reason = reason; n.HiddenAt = DateTime.UtcNow; }
    }

    public static Task Clear(AppDbContext db, string targetType, Guid targetId) =>
        db.Set<ModerationNote>().Where(x => x.TargetType == targetType && x.TargetId == targetId).ExecuteDeleteAsync();
}
