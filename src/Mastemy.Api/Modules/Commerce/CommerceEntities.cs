using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Commerce;

// Module-owned commerce entities (wave 3). Tables are prefixed "Commerce_". Existing core entities (Order, Payment,
// Refund, Entitlement, CommissionLedgerEntry, PayoutBatch) are extended through 1:1 side tables, never edited.

/// <summary>1:1 side table of <see cref="Order"/>: pricing breakdown, attribution and refund/dispute state.</summary>
public class OrderDetail
{
    public Guid OrderId { get; set; }
    public string Kind { get; set; } = "Package"; // Package, Bundle, Gift, SubscriptionInvoice
    public string Fingerprint { get; set; } = ""; // what was requested (idempotency comparison)
    public decimal ListAmount { get; set; } // before any discount
    public decimal DiscountAmount { get; set; }
    public string PriceSource { get; set; } = "Base"; // Base, Regional, Offer, Coupon
    public Guid? CouponId { get; set; }
    public Guid? PromotionId { get; set; }
    public Guid? BundleId { get; set; }
    public Guid? ReferralCodeId { get; set; }
    public Guid? ReferrerInstructorId { get; set; }
    public Guid? AffiliateId { get; set; }
    public string? Country { get; set; }
    public string? BillingName { get; set; }
    public decimal RefundedAmount { get; set; }
    public string? DisputeStatus { get; set; } // Open, Won, Lost
    public string? GiftRecipientEmail { get; set; }
    public string? GiftMessage { get; set; }
    public Guid? SubscriptionId { get; set; }
}

/// <summary>
/// Provenance of every ledger entry written by this module. <see cref="CommissionLedgerEntry.OrderId"/> holds the
/// document id that keeps the (OrderId, InstructorId, Kind) unique index meaningful (order, order item, derived
/// refund/dispute id, pool line); the real order (if any) and source document live here.
/// </summary>
public class LedgerSource
{
    public Guid LedgerEntryId { get; set; }
    public Guid? OrderId { get; set; }
    public string SourceType { get; set; } = ""; // Order, OrderItem, Refund, Dispute, DisputeWon, SubscriptionPool
    public Guid SourceId { get; set; }
    public Guid? RelatedEntryId { get; set; } // entry this one reverses/reinstates
}

public class Coupon
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Code { get; set; } = "";
    public string NormalizedCode { get; set; } = "";
    public string Kind { get; set; } = "Percent"; // Percent, Fixed, Scholarship
    public decimal? PercentOff { get; set; }
    public decimal? AmountOff { get; set; }
    public string? Currency { get; set; } // required for Fixed and for MinAmount
    public string Scope { get; set; } = "All"; // All, Course, Package, Bundle
    public Guid? ScopeId { get; set; }
    public int? MaxRedemptions { get; set; }
    public int MaxPerUser { get; set; } = 1;
    public DateTime StartsAt { get; set; } = DateTime.UtcNow;
    public DateTime? ExpiresAt { get; set; }
    public decimal? MinAmount { get; set; }
    public string AllowedEmails { get; set; } = ""; // newline separated, lower-case (IDN punycode); legacy rows may be upper-case and are compared case-insensitively
    public string AllowedDomains { get; set; } = ""; // newline separated, lower-case (IDN punycode); legacy rows may be upper-case and are compared case-insensitively
    public Guid? AllowedOrganizationId { get; set; }
    public string Status { get; set; } = "Active"; // Active, PendingApproval, Rejected, Disabled
    public Guid CreatedBy { get; set; }
    public bool CreatedByStaff { get; set; }
    public Guid? ApprovedBy { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class CouponRedemption
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CouponId { get; set; }
    public Guid UserId { get; set; }
    public Guid OrderId { get; set; }
    public decimal DiscountAmount { get; set; }
    public string Currency { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ReferralCode
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Code { get; set; } = "";
    public string NormalizedCode { get; set; } = "";
    public Guid CourseId { get; set; }
    public Guid InstructorId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Affiliate
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Code { get; set; } = "";
    public string NormalizedCode { get; set; } = "";
    public decimal CommissionPercent { get; set; }
    public int AttributionWindowDays { get; set; } = 30;
    public bool IsActive { get; set; } = true;
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class AffiliateClick
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AffiliateId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Regional price for a package (approval required). Countries: comma separated ISO-3166 alpha-2, empty = any country.</summary>
public class PackagePrice
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PackageId { get; set; }
    public string Currency { get; set; } = "";
    public string Countries { get; set; } = "";
    public decimal Amount { get; set; }
    public string Status { get; set; } = "Proposed"; // Proposed, Approved, Rejected, Retired
    public Guid ProposedBy { get; set; }
    public Guid? DecidedBy { get; set; }
    public DateTime? DecidedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Regular (non-sale) price in effect for a package/currency over time; basis for honest reference prices.</summary>
public class PriceHistory
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PackageId { get; set; }
    public string Currency { get; set; } = "";
    public decimal Amount { get; set; }
    public DateTime EffectiveFrom { get; set; }
    public DateTime? EffectiveTo { get; set; }
}

/// <summary>Staff-scheduled, time-boxed sale. Packages join only when an instructor of the course opts in.</summary>
public class Promotion
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public decimal PercentOff { get; set; }
    public DateTime StartsAt { get; set; }
    public DateTime EndsAt { get; set; }
    public string Status { get; set; } = "Scheduled"; // Scheduled, Cancelled
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class PromotionParticipation
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid PromotionId { get; set; }
    public Guid PackageId { get; set; }
    public Guid OptedInBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? WithdrawnAt { get; set; }
}

public class Bundle
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Kind { get; set; } = "Category"; // Category, Certification
    public int? CategoryId { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; } = "USD";
    public string Status { get; set; } = "Active"; // Active, Inactive
    public Guid CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class BundleItem
{
    public Guid BundleId { get; set; }
    public Guid PackageId { get; set; }
}

public class Plan
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public string Scope { get; set; } = "AllCourses"; // AllCourses, Category
    public int? CategoryId { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; } = "USD";
    public string Interval { get; set; } = "month"; // month, year
    public int AiAllowance { get; set; } // AI tutor requests per billing period (explicit, never "unlimited")
    public string IncludedServices { get; set; } = "";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Subscription
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid PlanId { get; set; }
    public string Status { get; set; } = "Incomplete"; // Incomplete, Active, PastDue, Canceled, Ended
    public string IdempotencyKey { get; set; } = "";
    public string? ProviderSessionId { get; set; }
    public string? ProviderSubscriptionId { get; set; }
    public string? ProviderCustomerId { get; set; }
    public DateTime? CurrentPeriodStart { get; set; }
    public DateTime? CurrentPeriodEnd { get; set; }
    public bool CancelAtPeriodEnd { get; set; }
    public DateTime? GraceUntil { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? EndedAt { get; set; }
}

public class SubscriptionEntitlement
{
    public Guid EntitlementId { get; set; }
    public Guid SubscriptionId { get; set; }
}

public class SubscriptionInvoice
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SubscriptionId { get; set; }
    public string ProviderInvoiceId { get; set; } = "";
    public Guid OrderId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "";
    public DateTime? PeriodStart { get; set; }
    public DateTime? PeriodEnd { get; set; }
    public DateTime PaidAt { get; set; } = DateTime.UtcNow;
}

/// <summary>Premium consumption signal used for subscription pool allocation (premium resource downloads).</summary>
public class ConsumptionEvent
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public string Kind { get; set; } = "PremiumDownload";
    public Guid? RefId { get; set; }
    public DateTime OccurredAt { get; set; } = DateTime.UtcNow;
}

public class PoolAllocation
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Year { get; set; }
    public int Month { get; set; }
    public string Currency { get; set; } = "";
    public decimal Revenue { get; set; }
    public decimal PoolPercent { get; set; }
    public decimal Pool { get; set; }
    public long TotalUnits { get; set; }
    public decimal Allocated { get; set; }
    public Guid? CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class PoolAllocationLine
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid AllocationId { get; set; }
    public Guid CourseId { get; set; }
    public long Units { get; set; }
    public decimal Amount { get; set; }
}

public class GiftCode
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrderId { get; set; }
    public Guid PackageId { get; set; }
    public string CodeHash { get; set; } = "";
    public string? CodeCipher { get; set; } // cleared once revealed to the buyer
    public string? RecipientEmail { get; set; }
    public string Status { get; set; } = "Active"; // Active, Redeemed, Void
    public Guid? RedeemedBy { get; set; }
    public DateTime? RedeemedAt { get; set; }
    public DateTime? RevealedAt { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Invoice
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Number { get; set; } = "";
    public string Kind { get; set; } = "Invoice"; // Invoice, CreditNote
    public int Year { get; set; }
    public long Sequence { get; set; }
    public Guid OrderId { get; set; }
    public Guid? RefundId { get; set; }
    public Guid? RelatedInvoiceId { get; set; }
    public Guid UserId { get; set; }
    public string BuyerName { get; set; } = "";
    public string BuyerEmail { get; set; } = "";
    public string? BuyerCountry { get; set; }
    public string Currency { get; set; } = "";
    public decimal Subtotal { get; set; }
    public decimal? TaxAmount { get; set; }
    public decimal? TaxRatePercent { get; set; }
    public string TaxMode { get; set; } = "None";
    public decimal Total { get; set; }
    public string LinesJson { get; set; } = "[]";
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
}

public class InvoiceCounter
{
    public string Kind { get; set; } = "";
    public int Year { get; set; }
    public long Next { get; set; }
}

public class TaxRate
{
    public string Country { get; set; } = "";
    public decimal RatePercent { get; set; }
    public Guid? UpdatedBy { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Dispute
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string ProviderDisputeId { get; set; } = "";
    public Guid OrderId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "";
    public string Status { get; set; } = "Open"; // Open, Won, Lost
    public string Reason { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ClosedAt { get; set; }
}

public class PayoutProfile
{
    public Guid UserId { get; set; }
    public string LegalName { get; set; } = "";
    public string Country { get; set; } = "";
    public string Method { get; set; } = "Email"; // Email, Iban
    public string DestinationCipher { get; set; } = "";
    public string DestinationMasked { get; set; } = "";
    public string TaxFormStatus { get; set; } = "NotSubmitted"; // NotSubmitted, Submitted, Verified, Rejected
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class PayoutRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid InstructorId { get; set; }
    public string Currency { get; set; } = "";
    public decimal Amount { get; set; }
    public string Status { get; set; } = "Requested"; // Requested, Batched, Rejected
    public Guid? PayoutBatchId { get; set; }
    public Guid? DecidedBy { get; set; }
    public DateTime? DecidedAt { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class PayoutRequestEntry
{
    public Guid LedgerEntryId { get; set; }
    public Guid PayoutRequestId { get; set; }
}

// ===================== EF configurations =====================

public class OrderDetailConfig : IEntityTypeConfiguration<OrderDetail>
{
    public void Configure(EntityTypeBuilder<OrderDetail> b)
    {
        b.ToTable("Commerce_OrderDetails"); b.HasKey(x => x.OrderId);
        b.HasOne<Order>().WithOne().HasForeignKey<OrderDetail>(x => x.OrderId);
        b.Property(x => x.Kind).HasMaxLength(32); b.Property(x => x.Fingerprint).HasMaxLength(255);
        b.Property(x => x.PriceSource).HasMaxLength(32); b.Property(x => x.Country).HasMaxLength(2);
        b.Property(x => x.BillingName).HasMaxLength(200); b.Property(x => x.DisputeStatus).HasMaxLength(16);
        b.Property(x => x.GiftRecipientEmail).HasMaxLength(255); b.Property(x => x.GiftMessage).HasMaxLength(500);
        b.HasIndex(x => x.SubscriptionId);
    }
}

public class LedgerSourceConfig : IEntityTypeConfiguration<LedgerSource>
{
    public void Configure(EntityTypeBuilder<LedgerSource> b)
    {
        b.ToTable("Commerce_LedgerSources"); b.HasKey(x => x.LedgerEntryId);
        b.HasOne<CommissionLedgerEntry>().WithOne().HasForeignKey<LedgerSource>(x => x.LedgerEntryId);
        b.Property(x => x.SourceType).HasMaxLength(32);
        b.HasIndex(x => x.OrderId); b.HasIndex(x => x.RelatedEntryId); b.HasIndex(x => new { x.SourceType, x.SourceId });
    }
}

public class CouponConfig : IEntityTypeConfiguration<Coupon>
{
    public void Configure(EntityTypeBuilder<Coupon> b)
    {
        b.ToTable("Commerce_Coupons");
        b.Property(x => x.Code).HasMaxLength(64); b.Property(x => x.NormalizedCode).HasMaxLength(64);
        b.HasIndex(x => x.NormalizedCode).IsUnique();
        b.Property(x => x.Kind).HasMaxLength(16); b.Property(x => x.Scope).HasMaxLength(16); b.Property(x => x.Status).HasMaxLength(24);
        b.Property(x => x.Currency).HasMaxLength(3);
        b.Property(x => x.AllowedEmails).HasColumnType("longtext"); b.Property(x => x.AllowedDomains).HasColumnType("longtext");
        b.HasIndex(x => x.CreatedBy);
    }
}

public class CouponRedemptionConfig : IEntityTypeConfiguration<CouponRedemption>
{
    public void Configure(EntityTypeBuilder<CouponRedemption> b)
    {
        b.ToTable("Commerce_CouponRedemptions");
        b.HasIndex(x => x.OrderId).IsUnique(); // idempotent redemption per order
        b.HasIndex(x => new { x.CouponId, x.UserId });
        b.HasOne<Coupon>().WithMany().HasForeignKey(x => x.CouponId);
        b.Property(x => x.Currency).HasMaxLength(3);
    }
}

public class ReferralCodeConfig : IEntityTypeConfiguration<ReferralCode>
{
    public void Configure(EntityTypeBuilder<ReferralCode> b)
    {
        b.ToTable("Commerce_ReferralCodes");
        b.Property(x => x.Code).HasMaxLength(64); b.Property(x => x.NormalizedCode).HasMaxLength(64);
        b.HasIndex(x => x.NormalizedCode).IsUnique();
        b.HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
    }
}

public class AffiliateConfig : IEntityTypeConfiguration<Affiliate>
{
    public void Configure(EntityTypeBuilder<Affiliate> b)
    {
        b.ToTable("Commerce_Affiliates");
        b.Property(x => x.Code).HasMaxLength(64); b.Property(x => x.NormalizedCode).HasMaxLength(64);
        b.HasIndex(x => x.NormalizedCode).IsUnique();
        b.Property(x => x.Name).HasMaxLength(200); b.Property(x => x.Email).HasMaxLength(255);
    }
}

public class AffiliateClickConfig : IEntityTypeConfiguration<AffiliateClick>
{
    public void Configure(EntityTypeBuilder<AffiliateClick> b)
    {
        b.ToTable("Commerce_AffiliateClicks");
        b.HasOne<Affiliate>().WithMany().HasForeignKey(x => x.AffiliateId);
    }
}

public class PackagePriceConfig : IEntityTypeConfiguration<PackagePrice>
{
    public void Configure(EntityTypeBuilder<PackagePrice> b)
    {
        b.ToTable("Commerce_PackagePrices");
        b.Property(x => x.Currency).HasMaxLength(3); b.Property(x => x.Countries).HasMaxLength(255); b.Property(x => x.Status).HasMaxLength(16);
        b.HasIndex(x => new { x.PackageId, x.Currency, x.Status });
        b.HasOne<LearningPackage>().WithMany().HasForeignKey(x => x.PackageId);
    }
}

public class PriceHistoryConfig : IEntityTypeConfiguration<PriceHistory>
{
    public void Configure(EntityTypeBuilder<PriceHistory> b)
    {
        b.ToTable("Commerce_PriceHistory");
        b.Property(x => x.Currency).HasMaxLength(3);
        b.HasIndex(x => new { x.PackageId, x.Currency, x.EffectiveFrom });
        b.HasOne<LearningPackage>().WithMany().HasForeignKey(x => x.PackageId);
    }
}

public class PromotionConfig : IEntityTypeConfiguration<Promotion>
{
    public void Configure(EntityTypeBuilder<Promotion> b)
    {
        b.ToTable("Commerce_Promotions");
        b.Property(x => x.Name).HasMaxLength(200); b.Property(x => x.Status).HasMaxLength(16);
    }
}

public class PromotionParticipationConfig : IEntityTypeConfiguration<PromotionParticipation>
{
    public void Configure(EntityTypeBuilder<PromotionParticipation> b)
    {
        b.ToTable("Commerce_PromotionParticipations");
        b.HasIndex(x => new { x.PromotionId, x.PackageId }).IsUnique();
        b.HasOne<Promotion>().WithMany().HasForeignKey(x => x.PromotionId);
        b.HasOne<LearningPackage>().WithMany().HasForeignKey(x => x.PackageId);
    }
}

public class BundleConfig : IEntityTypeConfiguration<Bundle>
{
    public void Configure(EntityTypeBuilder<Bundle> b)
    {
        b.ToTable("Commerce_Bundles");
        b.Property(x => x.Title).HasMaxLength(200); b.Property(x => x.Description).HasColumnType("longtext");
        b.Property(x => x.Kind).HasMaxLength(16); b.Property(x => x.Status).HasMaxLength(16); b.Property(x => x.Currency).HasMaxLength(3);
    }
}

public class BundleItemConfig : IEntityTypeConfiguration<BundleItem>
{
    public void Configure(EntityTypeBuilder<BundleItem> b)
    {
        b.ToTable("Commerce_BundleItems"); b.HasKey(x => new { x.BundleId, x.PackageId });
        b.HasOne<Bundle>().WithMany().HasForeignKey(x => x.BundleId);
        b.HasOne<LearningPackage>().WithMany().HasForeignKey(x => x.PackageId);
    }
}

public class PlanConfig : IEntityTypeConfiguration<Plan>
{
    public void Configure(EntityTypeBuilder<Plan> b)
    {
        b.ToTable("Commerce_Plans");
        b.Property(x => x.Code).HasMaxLength(64); b.HasIndex(x => x.Code).IsUnique();
        b.Property(x => x.Name).HasMaxLength(200); b.Property(x => x.Scope).HasMaxLength(16);
        b.Property(x => x.Currency).HasMaxLength(3); b.Property(x => x.Interval).HasMaxLength(8);
        b.Property(x => x.IncludedServices).HasColumnType("longtext");
    }
}

public class SubscriptionConfig : IEntityTypeConfiguration<Subscription>
{
    public void Configure(EntityTypeBuilder<Subscription> b)
    {
        b.ToTable("Commerce_Subscriptions");
        b.Property(x => x.Status).HasMaxLength(16); b.Property(x => x.IdempotencyKey).HasMaxLength(128);
        b.Property(x => x.ProviderSessionId).HasMaxLength(255); b.Property(x => x.ProviderSubscriptionId).HasMaxLength(255);
        b.Property(x => x.ProviderCustomerId).HasMaxLength(255);
        b.HasIndex(x => new { x.UserId, x.IdempotencyKey }).IsUnique();
        b.HasIndex(x => x.ProviderSubscriptionId).IsUnique();
        b.HasIndex(x => new { x.Status, x.GraceUntil });
        b.HasOne<Plan>().WithMany().HasForeignKey(x => x.PlanId);
    }
}

public class SubscriptionEntitlementConfig : IEntityTypeConfiguration<SubscriptionEntitlement>
{
    public void Configure(EntityTypeBuilder<SubscriptionEntitlement> b)
    {
        b.ToTable("Commerce_SubscriptionEntitlements"); b.HasKey(x => x.EntitlementId);
        b.HasIndex(x => x.SubscriptionId);
        b.HasOne<Entitlement>().WithOne().HasForeignKey<SubscriptionEntitlement>(x => x.EntitlementId);
    }
}

public class SubscriptionInvoiceConfig : IEntityTypeConfiguration<SubscriptionInvoice>
{
    public void Configure(EntityTypeBuilder<SubscriptionInvoice> b)
    {
        b.ToTable("Commerce_SubscriptionInvoices");
        b.Property(x => x.ProviderInvoiceId).HasMaxLength(255); b.HasIndex(x => x.ProviderInvoiceId).IsUnique();
        b.Property(x => x.Currency).HasMaxLength(3);
        b.HasIndex(x => new { x.PaidAt, x.Currency });
        b.HasOne<Subscription>().WithMany().HasForeignKey(x => x.SubscriptionId);
        b.HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId);
    }
}

public class ConsumptionEventConfig : IEntityTypeConfiguration<ConsumptionEvent>
{
    public void Configure(EntityTypeBuilder<ConsumptionEvent> b)
    {
        b.ToTable("Commerce_ConsumptionEvents");
        b.Property(x => x.Kind).HasMaxLength(32);
        b.HasIndex(x => new { x.OccurredAt, x.CourseId });
    }
}

public class PoolAllocationConfig : IEntityTypeConfiguration<PoolAllocation>
{
    public void Configure(EntityTypeBuilder<PoolAllocation> b)
    {
        b.ToTable("Commerce_PoolAllocations");
        b.Property(x => x.Currency).HasMaxLength(3);
        b.HasIndex(x => new { x.Year, x.Month, x.Currency }).IsUnique(); // monthly allocation is idempotent
    }
}

public class PoolAllocationLineConfig : IEntityTypeConfiguration<PoolAllocationLine>
{
    public void Configure(EntityTypeBuilder<PoolAllocationLine> b)
    {
        b.ToTable("Commerce_PoolAllocationLines");
        b.HasIndex(x => new { x.AllocationId, x.CourseId }).IsUnique();
        b.HasOne<PoolAllocation>().WithMany().HasForeignKey(x => x.AllocationId);
    }
}

public class GiftCodeConfig : IEntityTypeConfiguration<GiftCode>
{
    public void Configure(EntityTypeBuilder<GiftCode> b)
    {
        b.ToTable("Commerce_GiftCodes");
        b.Property(x => x.CodeHash).HasMaxLength(64); b.HasIndex(x => x.CodeHash).IsUnique();
        b.HasIndex(x => x.OrderId).IsUnique();
        b.Property(x => x.CodeCipher).HasColumnType("longtext");
        b.Property(x => x.RecipientEmail).HasMaxLength(255); b.Property(x => x.Status).HasMaxLength(16);
        b.HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId);
    }
}

/// <summary>1:1 side table of <see cref="Invoice"/>: the seller's legal details as they were when the document was issued.</summary>
public class InvoiceSellerSnapshot
{
    public Guid InvoiceId { get; set; }
    public string Name { get; set; } = "";
    public string Address { get; set; } = "";
    public string TaxId { get; set; } = "";
    public DateTime CapturedAt { get; set; } = DateTime.UtcNow;
}

public class InvoiceSellerSnapshotConfig : IEntityTypeConfiguration<InvoiceSellerSnapshot>
{
    public void Configure(EntityTypeBuilder<InvoiceSellerSnapshot> b)
    {
        b.ToTable("Commerce_InvoiceSellerSnapshots");
        b.HasKey(x => x.InvoiceId);
        b.Property(x => x.Name).HasMaxLength(255); b.Property(x => x.Address).HasColumnType("longtext"); b.Property(x => x.TaxId).HasMaxLength(100);
        b.HasOne<Invoice>().WithOne().HasForeignKey<InvoiceSellerSnapshot>(x => x.InvoiceId);
    }
}

public class InvoiceConfig : IEntityTypeConfiguration<Invoice>
{
    public void Configure(EntityTypeBuilder<Invoice> b)
    {
        b.ToTable("Commerce_Invoices");
        b.Property(x => x.Number).HasMaxLength(32); b.HasIndex(x => x.Number).IsUnique();
        b.HasIndex(x => new { x.Kind, x.Year, x.Sequence }).IsUnique();
        b.HasIndex(x => x.OrderId); b.HasIndex(x => x.UserId);
        b.HasIndex(x => x.RefundId).IsUnique();
        b.Property(x => x.Kind).HasMaxLength(16); b.Property(x => x.BuyerName).HasMaxLength(200);
        b.Property(x => x.BuyerEmail).HasMaxLength(255); b.Property(x => x.BuyerCountry).HasMaxLength(2);
        b.Property(x => x.Currency).HasMaxLength(3); b.Property(x => x.TaxMode).HasMaxLength(16);
        b.Property(x => x.LinesJson).HasColumnType("longtext");
        b.HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId);
    }
}

public class InvoiceCounterConfig : IEntityTypeConfiguration<InvoiceCounter>
{
    public void Configure(EntityTypeBuilder<InvoiceCounter> b)
    {
        b.ToTable("Commerce_InvoiceCounters"); b.HasKey(x => new { x.Kind, x.Year });
        b.Property(x => x.Kind).HasMaxLength(16);
    }
}

public class TaxRateConfig : IEntityTypeConfiguration<TaxRate>
{
    public void Configure(EntityTypeBuilder<TaxRate> b)
    {
        b.ToTable("Commerce_TaxRates"); b.HasKey(x => x.Country);
        b.Property(x => x.Country).HasMaxLength(2);
    }
}

public class DisputeConfig : IEntityTypeConfiguration<Dispute>
{
    public void Configure(EntityTypeBuilder<Dispute> b)
    {
        b.ToTable("Commerce_Disputes");
        b.Property(x => x.ProviderDisputeId).HasMaxLength(255); b.HasIndex(x => x.ProviderDisputeId).IsUnique();
        b.Property(x => x.Currency).HasMaxLength(3); b.Property(x => x.Status).HasMaxLength(16); b.Property(x => x.Reason).HasMaxLength(255);
        b.HasOne<Order>().WithMany().HasForeignKey(x => x.OrderId);
    }
}

public class PayoutProfileConfig : IEntityTypeConfiguration<PayoutProfile>
{
    public void Configure(EntityTypeBuilder<PayoutProfile> b)
    {
        b.ToTable("Commerce_PayoutProfiles"); b.HasKey(x => x.UserId);
        b.HasOne<User>().WithOne().HasForeignKey<PayoutProfile>(x => x.UserId);
        b.Property(x => x.LegalName).HasMaxLength(200); b.Property(x => x.Country).HasMaxLength(2);
        b.Property(x => x.Method).HasMaxLength(16); b.Property(x => x.DestinationCipher).HasColumnType("longtext");
        b.Property(x => x.DestinationMasked).HasMaxLength(64); b.Property(x => x.TaxFormStatus).HasMaxLength(16);
    }
}

public class PayoutRequestConfig : IEntityTypeConfiguration<PayoutRequest>
{
    public void Configure(EntityTypeBuilder<PayoutRequest> b)
    {
        b.ToTable("Commerce_PayoutRequests");
        b.Property(x => x.Currency).HasMaxLength(3); b.Property(x => x.Status).HasMaxLength(16); b.Property(x => x.Notes).HasMaxLength(500);
        b.HasIndex(x => new { x.InstructorId, x.Status });
    }
}

public class PayoutRequestEntryConfig : IEntityTypeConfiguration<PayoutRequestEntry>
{
    public void Configure(EntityTypeBuilder<PayoutRequestEntry> b)
    {
        b.ToTable("Commerce_PayoutRequestEntries"); b.HasKey(x => x.LedgerEntryId); // an entry can be claimed by one request only
        b.HasIndex(x => x.PayoutRequestId);
        b.HasOne<PayoutRequest>().WithMany().HasForeignKey(x => x.PayoutRequestId);
    }
}

/// <summary>1:1 gift policy for a coupon. Absent row = 100% and staff Percent coupons cannot be used on gift purchases.</summary>
public class CouponGiftPolicy
{
    public Guid CouponId { get; set; }
    public bool AllowsGifts { get; set; }
    public Guid SetBy { get; set; }
    public DateTime SetAt { get; set; } = DateTime.UtcNow;
}

public class CouponGiftPolicyConfig : IEntityTypeConfiguration<CouponGiftPolicy>
{
    public void Configure(EntityTypeBuilder<CouponGiftPolicy> b)
    {
        b.ToTable("Commerce_CouponGiftPolicies"); b.HasKey(x => x.CouponId);
        b.HasOne<Coupon>().WithMany().HasForeignKey(x => x.CouponId);
    }
}
