using Mastemy.Api.Modules.Trust;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Enterprise;

/// <summary>A Taxonomy pathway assigned to an org scope; expanded into one OrganizationAssignment per live course.</summary>
public class OrgPathwayAssignment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public Guid PathwayId { get; set; }
    public Guid? UserId { get; set; }
    public string? Department { get; set; }
    public bool GrantsPremium { get; set; }
    public DateTime? DueAt { get; set; }
    public Guid AssignedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Course assignment rows created by a pathway assignment (removed together with it).</summary>
public class OrgPathwayAssignmentCourse
{
    public Guid PathwayAssignmentId { get; set; }
    public Guid OrganizationAssignmentId { get; set; }
    public Guid CourseId { get; set; }
}

/// <summary>Org-private, non-video material. Only members of the organization can list or download it; never public.</summary>
public class OrgMaterial
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public string Title { get; set; } = "";
    public string? Department { get; set; } // null = whole organization
    public string FileName { get; set; } = "";
    public string ContentType { get; set; } = "";
    public long SizeBytes { get; set; }
    public string Sha256 { get; set; } = "";
    public string StorageKey { get; set; } = "";
    public ScanVerdict ScanVerdict { get; set; }
    public string ScanEngine { get; set; } = "";
    public Guid UploadedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DeletedAt { get; set; }
}

public enum SeatRequestStatus { Requested, Invoiced, Paid, Rejected, Cancelled }

/// <summary>Org admin's request for additional seats; staff turn it into an enterprise order + invoice (bank transfer).</summary>
public class SeatRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public int Quantity { get; set; }
    public string Note { get; set; } = "";
    public Guid RequestedBy { get; set; }
    public SeatRequestStatus Status { get; set; } = SeatRequestStatus.Requested;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid? DecidedBy { get; set; }
    public DateTime? DecidedAt { get; set; }
    public string? DecisionNote { get; set; }
}

public enum EnterpriseOrderStatus { AwaitingPayment, Paid, Cancelled }

/// <summary>Enterprise seat order (side table of the Commerce Order it created). Paid by bank transfer, confirmed by staff.</summary>
public class EnterpriseOrder
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public Guid? SeatRequestId { get; set; }
    public Guid OrderId { get; set; }
    public Guid InvoiceId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public string Currency { get; set; } = "USD";
    public decimal Total { get; set; }
    public EnterpriseOrderStatus Status { get; set; } = EnterpriseOrderStatus.AwaitingPayment;
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid? PaidMarkedBy { get; set; }
    public DateTime? PaidAt { get; set; }
    public string? PaymentReference { get; set; }
    public int? SeatLimitBefore { get; set; }
    public int? SeatLimitAfter { get; set; }
}

/// <summary>Per-organization OIDC single sign-on configuration (SAML is out of scope).</summary>
public class OrgSsoConfig
{
    public Guid OrganizationId { get; set; }
    public string Issuer { get; set; } = "";
    public string ClientId { get; set; } = "";
    public string ClientSecretProtected { get; set; } = "";
    public string AllowedDomains { get; set; } = ""; // comma-separated, lowercase
    public bool Enabled { get; set; } = true;
    public Guid UpdatedBy { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>In-flight SSO login: state (hashed), nonce, PKCE verifier (encrypted); later the one-time handoff code.</summary>
public class SsoLoginState
{
    public string StateHash { get; set; } = "";
    public Guid OrganizationId { get; set; }
    public string Nonce { get; set; } = "";
    public string CodeVerifierProtected { get; set; } = "";
    public string ReturnPath { get; set; } = "/";
    public DateTime ExpiresAt { get; set; }
    public DateTime? ConsumedAt { get; set; }
    public string? HandoffHash { get; set; }
    public Guid? UserId { get; set; }
    public DateTime? HandoffExpiresAt { get; set; }
    public DateTime? HandoffUsedAt { get; set; }
    /// <summary>SHA-256 of the browser-binding cookie set by start; the callback must present it (login CSRF).</summary>
    public string BinderHash { get; set; } = "";
    /// <summary>SHA-256 of the fresh binder cookie set by the callback; the handoff exchange must present it.</summary>
    public string? HandoffBinderHash { get; set; }
    /// <summary>Set for an explicit account-link flow started by this signed-in user.</summary>
    public Guid? LinkUserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Link between an IdP subject and a Mastemy user.</summary>
public class SsoIdentity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public string Issuer { get; set; } = "";
    public string Subject { get; set; } = "";
    /// <summary>SHA-256 (hex) of <see cref="Issuer"/>; identities are keyed by (organization, issuer, subject).</summary>
    public string IssuerHash { get; set; } = "";
    public Guid UserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastLoginAt { get; set; } = DateTime.UtcNow;
}

public class EnterprisePhase2Configurations : IEntityTypeConfiguration<OrgPathwayAssignment>, IEntityTypeConfiguration<OrgPathwayAssignmentCourse>,
    IEntityTypeConfiguration<OrgMaterial>, IEntityTypeConfiguration<SeatRequest>, IEntityTypeConfiguration<EnterpriseOrder>,
    IEntityTypeConfiguration<OrgSsoConfig>, IEntityTypeConfiguration<SsoLoginState>, IEntityTypeConfiguration<SsoIdentity>
{
    public void Configure(EntityTypeBuilder<OrgPathwayAssignment> b)
    {
        b.ToTable("Enterprise_PathwayAssignments");
        b.Property(x => x.Department).HasMaxLength(100);
        b.HasIndex(x => new { x.OrganizationId, x.PathwayId });
    }

    public void Configure(EntityTypeBuilder<OrgPathwayAssignmentCourse> b)
    {
        b.ToTable("Enterprise_PathwayAssignmentCourses");
        b.HasKey(x => new { x.PathwayAssignmentId, x.OrganizationAssignmentId });
        b.HasIndex(x => x.OrganizationAssignmentId);
    }

    public void Configure(EntityTypeBuilder<OrgMaterial> b)
    {
        b.ToTable("Enterprise_OrgMaterials");
        b.Property(x => x.Title).HasMaxLength(200);
        b.Property(x => x.Department).HasMaxLength(100);
        b.Property(x => x.FileName).HasMaxLength(255);
        b.Property(x => x.ContentType).HasMaxLength(128);
        b.Property(x => x.Sha256).HasMaxLength(64);
        b.Property(x => x.StorageKey).HasMaxLength(200);
        b.Property(x => x.ScanVerdict).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.ScanEngine).HasMaxLength(32);
        b.HasIndex(x => new { x.OrganizationId, x.DeletedAt });
    }

    public void Configure(EntityTypeBuilder<SeatRequest> b)
    {
        b.ToTable("Enterprise_SeatRequests");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.Note).HasMaxLength(1000);
        b.Property(x => x.DecisionNote).HasMaxLength(1000);
        b.HasIndex(x => new { x.Status, x.CreatedAt });
        b.HasIndex(x => x.OrganizationId);
    }

    public void Configure(EntityTypeBuilder<EnterpriseOrder> b)
    {
        b.ToTable("Enterprise_Orders");
        b.Property(x => x.Status).HasConversion<string>().HasMaxLength(16);
        b.Property(x => x.Currency).HasMaxLength(3);
        b.Property(x => x.UnitPrice).HasPrecision(18, 4);
        b.Property(x => x.Total).HasPrecision(18, 4);
        b.Property(x => x.PaymentReference).HasMaxLength(200);
        b.HasIndex(x => x.OrderId).IsUnique();
        b.HasIndex(x => x.SeatRequestId).IsUnique();
        b.HasIndex(x => x.OrganizationId);
    }

    public void Configure(EntityTypeBuilder<OrgSsoConfig> b)
    {
        b.ToTable("Enterprise_SsoConfigs");
        b.HasKey(x => x.OrganizationId);
        b.Property(x => x.Issuer).HasMaxLength(500);
        b.Property(x => x.ClientId).HasMaxLength(255);
        b.Property(x => x.ClientSecretProtected).HasColumnType("longtext");
        b.Property(x => x.AllowedDomains).HasMaxLength(2000);
    }

    public void Configure(EntityTypeBuilder<SsoLoginState> b)
    {
        b.ToTable("Enterprise_SsoLoginStates");
        b.HasKey(x => x.StateHash);
        b.Property(x => x.StateHash).HasMaxLength(64);
        b.Property(x => x.Nonce).HasMaxLength(128);
        b.Property(x => x.CodeVerifierProtected).HasColumnType("longtext");
        b.Property(x => x.ReturnPath).HasMaxLength(500);
        b.Property(x => x.HandoffHash).HasMaxLength(64);
        b.Property(x => x.BinderHash).HasMaxLength(64);
        b.Property(x => x.HandoffBinderHash).HasMaxLength(64);
        b.HasIndex(x => x.HandoffHash).IsUnique();
        b.HasIndex(x => x.ExpiresAt);
    }

    public void Configure(EntityTypeBuilder<SsoIdentity> b)
    {
        b.ToTable("Enterprise_SsoIdentities");
        b.Property(x => x.Issuer).HasMaxLength(500);
        b.Property(x => x.Subject).HasMaxLength(255);
        b.Property(x => x.IssuerHash).HasMaxLength(64);
        b.HasIndex(x => new { x.OrganizationId, x.IssuerHash, x.Subject }).IsUnique();
        b.HasIndex(x => new { x.OrganizationId, x.UserId });
        b.HasIndex(x => x.UserId);
    }
}
