using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Trust;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Resources;

/// <summary>Malware-scan outcome for the current content of a resource file (1:1 side table of ResourceFile).</summary>
public class ResourceScanRecord
{
    public Guid ResourceFileId { get; set; }
    public string Sha256 { get; set; } = "";
    public ScanVerdict Verdict { get; set; }
    public string Engine { get; set; } = "";
    public DateTime ScannedAt { get; set; } = DateTime.UtcNow;
}

public class ResourceScanRecordConfiguration : IEntityTypeConfiguration<ResourceScanRecord>
{
    public void Configure(EntityTypeBuilder<ResourceScanRecord> b)
    {
        b.ToTable("Resources_ScanRecords");
        b.HasKey(x => x.ResourceFileId);
        b.Property(x => x.Sha256).HasMaxLength(64);
        b.Property(x => x.Verdict).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.Engine).HasMaxLength(32);
        b.HasOne<ResourceFile>().WithOne().HasForeignKey<ResourceScanRecord>(x => x.ResourceFileId).OnDelete(DeleteBehavior.Cascade);
    }
}
