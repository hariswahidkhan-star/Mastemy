using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Analytics;

/// <summary>
/// First-party, consent-gated product event. Deliberately minimal: no user id, IP, user agent, URL or free text. AnonId is an
/// HMAC of the visitor key and the UTC date, so it rotates daily and cannot be joined across days or back to an account.
/// </summary>
public class AnalyticsEvent
{
    public long Id { get; set; }
    public string Type { get; set; } = "";
    public Guid? CourseId { get; set; }
    public Guid? LessonId { get; set; }
    public string AnonId { get; set; } = "";
    public DateTime OccurredAt { get; set; }
    public DateTime ReceivedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>An authenticated user's analytics consent choice (overrides the cookie for that user).</summary>
public class AnalyticsConsent
{
    public Guid UserId { get; set; }
    public bool Analytics { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class AnalyticsEventConfig : IEntityTypeConfiguration<AnalyticsEvent>
{
    public void Configure(EntityTypeBuilder<AnalyticsEvent> b)
    {
        b.ToTable("Analytics_Events");
        b.HasKey(x => x.Id);
        b.Property(x => x.Id).ValueGeneratedOnAdd();
        b.Property(x => x.Type).HasMaxLength(32);
        b.Property(x => x.AnonId).HasMaxLength(64);
        b.HasIndex(x => new { x.CourseId, x.Type, x.OccurredAt });
        b.HasIndex(x => new { x.Type, x.OccurredAt });
    }
}

public class AnalyticsConsentConfig : IEntityTypeConfiguration<AnalyticsConsent>
{
    public void Configure(EntityTypeBuilder<AnalyticsConsent> b)
    {
        b.ToTable("Analytics_Consents");
        b.HasKey(x => x.UserId);
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}
