using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Commerce;

// ---------- DTOs ----------
public record CouponInput(string Code, string Kind, decimal? PercentOff, decimal? AmountOff, string? Currency, string Scope, Guid? ScopeId,
    int? MaxRedemptions, int? MaxPerUser, DateTime? StartsAt, DateTime? ExpiresAt, decimal? MinAmount,
    List<string>? AllowedEmails = null, List<string>? AllowedDomains = null, Guid? AllowedOrganizationId = null, bool AllowsGifts = false);
public record CouponDto(Guid Id, string Code, string Kind, decimal? PercentOff, decimal? AmountOff, string? Currency, string Scope, Guid? ScopeId,
    int? MaxRedemptions, int MaxPerUser, DateTime StartsAt, DateTime? ExpiresAt, decimal? MinAmount, string Status, bool CreatedByStaff,
    Guid CreatedBy, int Redemptions, List<string> AllowedEmails, List<string> AllowedDomains, Guid? AllowedOrganizationId, DateTime CreatedAt);
public record ReferralCodeInput(string? Code);
public record ReferralCodeDto(Guid Id, string Code, Guid CourseId, Guid InstructorId, bool IsActive, DateTime CreatedAt);
public record AffiliateInput(string Name, string Email, string Code, decimal CommissionPercent, int AttributionWindowDays);
public record AffiliateDto(Guid Id, string Name, string Email, string Code, decimal CommissionPercent, int AttributionWindowDays, bool IsActive, DateTime CreatedAt);
public record AffiliateClickInput(string Code);
public record AffiliateClickDto(Guid ClickId, DateTime AttributionExpiresAt);
public record PackagePriceInput(string Currency, List<string>? Countries, decimal Amount);
public record PackagePriceDto(Guid Id, Guid PackageId, string Currency, List<string> Countries, decimal Amount, string Status, DateTime CreatedAt);
public record PromotionInput(string Name, decimal PercentOff, DateTime StartsAt, DateTime EndsAt);
public record PromotionDto(Guid Id, string Name, decimal PercentOff, DateTime StartsAt, DateTime EndsAt, string Status, List<Guid> PackageIds);
public record PromotionOptInput(Guid PackageId);
public record BundleInput(string Title, string Description, string Kind, int? CategoryId, decimal Price, string Currency, List<Guid> PackageIds);
public record BundleComponentDto(Guid PackageId, Guid CourseId, string Title, string Contents, decimal ListPrice, int AccessDays);
public record BundleDto(Guid Id, string Title, string Description, string Kind, int? CategoryId, decimal Price, string Currency, string Status,
    decimal ComponentsListTotal, List<BundleComponentDto> Components, string FreeVideoNotice);
public record BundleStatusInput(bool Active);
public record OfferView(string Name, DateTime EndsAt);
public record PriceView(Guid PackageId, string Title, string IncludedServices, int AccessDays, string Currency, decimal Amount, decimal RegularAmount,
    decimal? CompareAtAmount, OfferView? Offer, string FreeVideoNotice);
public record QuoteInput(Guid? PackageId, Guid? BundleId = null, string? CouponCode = null, string? ReferralCode = null, Guid? AffiliateClickId = null,
    string? Currency = null, string? Country = null, bool Gift = false);
public record QuoteDto(string Kind, string Currency, decimal ListAmount, decimal Amount, decimal Discount, string PriceSource, decimal? CompareAtAmount,
    DateTime? OfferEndsAt, bool CouponApplied, List<QuoteItem> Items, string FreeVideoNotice);

public record QuoteItem(Guid PackageId, Guid CourseId, string Title, decimal ListPrice, decimal UnitPrice, int AccessDays);

/// <summary>Server-side computed price for a purchase. The client never supplies amounts.</summary>
public class Quote
{
    public string Kind { get; set; } = "Package";
    public string Currency { get; set; } = "";
    public decimal ListAmount { get; set; }
    public decimal Amount { get; set; }
    public string PriceSource { get; set; } = "Base";
    public decimal? CompareAtAmount { get; set; }
    public DateTime? OfferEndsAt { get; set; }
    public Guid? CouponId { get; set; }
    public decimal CouponDiscount { get; set; }
    public Guid? PromotionId { get; set; }
    public Guid? BundleId { get; set; }
    public Guid? ReferralCodeId { get; set; }
    public Guid? ReferrerInstructorId { get; set; }
    public Guid? AffiliateId { get; set; }
    public string? Country { get; set; }
    public string ProductName { get; set; } = "";
    public string Fingerprint { get; set; } = "";
    public List<QuoteItem> Items { get; set; } = [];
    public decimal Discount => ListAmount - Amount;
}

public static class CommerceText
{
    public const string FreeVideoNotice =
        "Course videos are always free to watch on YouTube. Purchases and subscriptions only cover Mastemy study services " +
        "(premium notes, MCQ banks, mock exams, analytics and the listed allowances); they never sell or unlock video access.";

    private static readonly Regex CodePattern = new("^[A-Za-z0-9_-]{3,40}$", RegexOptions.CultureInvariant);
    private static readonly Regex CurrencyPattern = new("^[A-Z]{3}$", RegexOptions.CultureInvariant);
    private static readonly Regex CountryPattern = new("^[A-Z]{2}$", RegexOptions.CultureInvariant);

    public static string NormalizeCode(string? code, string what = "Code")
    {
        var c = (code ?? "").Trim();
        if (!CodePattern.IsMatch(c)) throw AppException.Bad($"{what} must be 3-40 characters: letters, digits, '-' or '_'.", "invalid_code");
        return c.ToUpperInvariant();
    }

    public static string Currency(string? currency)
    {
        var c = (currency ?? "").Trim();
        if (!CurrencyPattern.IsMatch(c)) throw AppException.Bad("Currency must be an ISO 4217 code in upper case (e.g. USD).", "invalid_currency");
        return c;
    }

    public static string? OptionalCountry(string? country)
    {
        if (string.IsNullOrWhiteSpace(country)) return null;
        var c = country.Trim().ToUpperInvariant();
        if (!CountryPattern.IsMatch(c)) throw AppException.Bad("Country must be an ISO 3166-1 alpha-2 code.", "invalid_country");
        return c;
    }

    public static void ValidAmount(decimal amount, string currency, string what = "Amount", bool allowZero = false)
    {
        var max = Money.IsZeroDecimal(currency) ? 10_000_000m : 100_000m;
        if ((allowZero ? amount < 0 : amount <= 0) || amount > max) throw AppException.Bad($"{what} must be {(allowZero ? "zero or more" : "greater than 0")} and at most {max} {currency}.", "invalid_amount");
        if (!Money.IsValidAmount(amount, currency)) throw AppException.Bad($"{what} has more decimal places than {currency} allows.", "invalid_amount");
    }

    /// <summary>Deterministic id for derived ledger documents (keeps the ledger's unique index idempotent per source × entry).</summary>
    public static Guid Derive(params object[] parts)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(string.Join("|", parts.Select(p => Convert.ToString(p, CultureInfo.InvariantCulture)))));
        return new Guid(bytes.AsSpan(0, 16));
    }

    public static List<string> Lines(string s) => s.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList();
}

public class PricingService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit, IConfiguration cfg,
    Mastemy.Api.Modules.Authoring.CourseScopeService scope)
{
    private decimal InstructorCouponMaxPercent => Math.Clamp(cfg.GetValue("Commerce:InstructorCouponMaxPercent", 50m), 0m, 100m);
    private int ReservationMinutes => Math.Max(1, cfg.GetValue("Commerce:CouponReservationMinutes", 60));

    // ===================== Quote =====================

    public async Task<QuoteDto> QuoteForMe(QuoteInput input)
    {
        var q = await BuildQuote(me.RequireId(), input, null);
        return new QuoteDto(q.Kind, q.Currency, q.ListAmount, q.Amount, q.Discount, q.PriceSource, q.CompareAtAmount, q.OfferEndsAt,
            q.CouponId is not null, q.Items, CommerceText.FreeVideoNotice);
    }

    public async Task<Quote> BuildQuote(Guid userId, QuoteInput input, Guid? excludeOrderId)
    {
        if ((input.PackageId is null) == (input.BundleId is null)) throw AppException.Bad("Provide exactly one of packageId or bundleId.");
        var currency = string.IsNullOrWhiteSpace(input.Currency) ? null : CommerceText.Currency(input.Currency);
        var country = CommerceText.OptionalCountry(input.Country);
        var now = DateTime.UtcNow;
        var q = new Quote { Country = country };
        decimal? saleAmount = null;

        if (input.PackageId is { } packageId)
        {
            var pkg = await db.Packages.AsNoTracking().FirstOrDefaultAsync(p => p.Id == packageId) ?? throw AppException.NotFound("Package");
            if (!pkg.IsActive || pkg.ApprovalStatus != "Approved") throw AppException.Bad("Package is not available for purchase.", "package_unavailable");
            var course = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == pkg.CourseId) ?? throw AppException.NotFound("Course");
            if (!AccessService.IsLive(course)) throw AppException.Bad("Course is not available.", "course_unavailable");
            var (regular, cur, source) = await ResolveRegularPrice(pkg, currency, country);
            q.Kind = input.Gift ? "Gift" : "Package";
            q.Currency = cur; q.ListAmount = regular; q.Amount = regular; q.PriceSource = source;
            q.ProductName = pkg.Title;
            var promo = await ActivePromotion(pkg.Id, now);
            if (promo is not null)
            {
                saleAmount = Money.Round(regular * (100m - promo.PercentOff) / 100m, cur);
                if (saleAmount > 0 && saleAmount < regular)
                {
                    q.Amount = saleAmount.Value; q.PriceSource = "Offer"; q.PromotionId = promo.Id; q.OfferEndsAt = promo.EndsAt;
                    q.CompareAtAmount = await IsHonestReference(pkg.Id, cur, regular, now) ? regular : null;
                }
                else saleAmount = null;
            }
            q.Items = [new QuoteItem(pkg.Id, pkg.CourseId, pkg.Title, regular, q.Amount, pkg.AccessDays)];
        }
        else
        {
            if (input.Gift) throw AppException.Bad("Bundles cannot be bought as gifts.", "gift_bundle_not_supported");
            var bundle = await db.Set<Bundle>().AsNoTracking().FirstOrDefaultAsync(b => b.Id == input.BundleId) ?? throw AppException.NotFound("Bundle");
            if (bundle.Status != "Active") throw AppException.Bad("Bundle is not available for purchase.", "bundle_unavailable");
            if (currency is not null && currency != bundle.Currency) throw AppException.Bad($"This bundle is only sold in {bundle.Currency}.", "currency_not_available");
            var components = await Components(bundle.Id);
            if (components.Count < 2 || components.Any(c => !c.Available)) throw AppException.Bad("Bundle is not available for purchase.", "bundle_unavailable");
            q.Kind = "Bundle"; q.BundleId = bundle.Id; q.Currency = bundle.Currency;
            q.ListAmount = bundle.Price; q.Amount = bundle.Price; q.PriceSource = "Base"; q.ProductName = "Bundle: " + bundle.Title;
            q.Items = components.Select(c => new QuoteItem(c.Package.Id, c.Package.CourseId, c.Package.Title, c.Package.Price, 0m, c.Package.AccessDays)).ToList();
        }

        if (!string.IsNullOrWhiteSpace(input.CouponCode))
            await ApplyCoupon(q, userId, input.CouponCode!, saleAmount, input.Gift, excludeOrderId, now);

        if (!string.IsNullOrWhiteSpace(input.ReferralCode))
        {
            var norm = CommerceText.NormalizeCode(input.ReferralCode, "Referral code");
            var rc = await db.Set<ReferralCode>().AsNoTracking().FirstOrDefaultAsync(r => r.NormalizedCode == norm && r.IsActive)
                     ?? throw AppException.Bad("Referral code is not valid.", "referral_invalid");
            if (q.Items.All(i => i.CourseId != rc.CourseId)) throw AppException.Bad("Referral code does not apply to this purchase.", "referral_not_applicable");
            if (rc.InstructorId == userId) throw AppException.Bad("You cannot use your own referral code.", "referral_self_use");
            if (!await db.CourseInstructors.AnyAsync(ci => ci.CourseId == rc.CourseId && ci.UserId == rc.InstructorId))
                throw AppException.Bad("Referral code is not valid.", "referral_invalid");
            q.ReferralCodeId = rc.Id; q.ReferrerInstructorId = rc.InstructorId;
        }

        if (input.AffiliateClickId is { } clickId)
        {
            var click = await db.Set<AffiliateClick>().AsNoTracking().FirstOrDefaultAsync(c => c.Id == clickId)
                        ?? throw AppException.Bad("Affiliate referral is not valid.", "affiliate_invalid");
            var aff = await db.Set<Affiliate>().AsNoTracking().FirstOrDefaultAsync(a => a.Id == click.AffiliateId && a.IsActive)
                      ?? throw AppException.Bad("Affiliate referral is not valid.", "affiliate_invalid");
            if (click.CreatedAt.AddDays(aff.AttributionWindowDays) < now) throw AppException.Bad("Affiliate referral has expired.", "affiliate_expired");
            var email = await db.Users.Where(u => u.Id == userId).Select(u => u.NormalizedEmail).FirstOrDefaultAsync();
            if (email is not null && email == aff.Email.ToUpperInvariant()) throw AppException.Bad("Affiliates cannot earn commission on their own purchases.", "affiliate_self_referral");
            q.AffiliateId = aff.Id;
        }

        AllocateItems(q);
        q.Fingerprint = string.Join("|", q.Kind, input.PackageId, input.BundleId, q.CouponId, q.ReferralCodeId, q.AffiliateId, q.Currency, country ?? "");
        if (q.Fingerprint.Length > 255) q.Fingerprint = q.Fingerprint[..255];
        return q;
    }

    /// <summary>Bundle price is split across components pro-rata by component list price (floor to minor unit, remainder on the last item).</summary>
    private static void AllocateItems(Quote q)
    {
        if (q.Items.Count == 1) { q.Items[0] = q.Items[0] with { UnitPrice = q.Amount }; return; }
        var listTotal = q.Items.Sum(i => i.ListPrice);
        var allocated = 0m;
        for (var i = 0; i < q.Items.Count; i++)
        {
            var share = i == q.Items.Count - 1 ? q.Amount - allocated
                : listTotal == 0 ? 0m : Money.Floor(q.Amount * q.Items[i].ListPrice / listTotal, q.Currency);
            allocated += share;
            q.Items[i] = q.Items[i] with { UnitPrice = share };
        }
    }

    private async Task<(decimal Amount, string Currency, string Source)> ResolveRegularPrice(LearningPackage pkg, string? currency, string? country)
    {
        var cur = currency ?? pkg.Currency;
        var rows = await db.Set<PackagePrice>().AsNoTracking().Where(p => p.PackageId == pkg.Id && p.Currency == cur && p.Status == "Approved").ToListAsync();
        var specific = country is null ? null : rows.FirstOrDefault(r => SplitCountries(r.Countries).Contains(country));
        if (specific is not null) return (specific.Amount, cur, "Regional");
        var generic = rows.FirstOrDefault(r => r.Countries == "");
        if (generic is not null) return (generic.Amount, cur, "Regional");
        if (cur == pkg.Currency) return (pkg.Price, cur, "Base");
        throw AppException.Bad($"This package is not sold in {cur}{(country is null ? "" : " for " + country)}.", "currency_not_available");
    }

    private static List<string> SplitCountries(string s) => s.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).ToList();

    private async Task<Promotion?> ActivePromotion(Guid packageId, DateTime now) =>
        await (from pp in db.Set<PromotionParticipation>().AsNoTracking()
               join p in db.Set<Promotion>().AsNoTracking() on pp.PromotionId equals p.Id
               where pp.PackageId == packageId && pp.WithdrawnAt == null && p.Status == "Scheduled" && p.StartsAt <= now && p.EndsAt > now
               orderby p.PercentOff descending
               select p).FirstOrDefaultAsync();

    /// <summary>
    /// Honest reference price: an amount may be shown as "compare-at" only if it was the regular price of the package in that
    /// currency for at least 30 of the last 90 days (from <see cref="PriceHistory"/>).
    /// </summary>
    public async Task<bool> IsHonestReference(Guid packageId, string currency, decimal amount, DateTime now)
    {
        var from = now.AddDays(-90);
        var rows = await db.Set<PriceHistory>().AsNoTracking()
            .Where(h => h.PackageId == packageId && h.Currency == currency && h.Amount == amount && (h.EffectiveTo == null || h.EffectiveTo > from) && h.EffectiveFrom < now)
            .ToListAsync();
        // Merge overlapping intervals (several regional rows can share an amount) before measuring.
        var intervals = rows.Select(r => (Start: r.EffectiveFrom < from ? from : r.EffectiveFrom, End: r.EffectiveTo is null || r.EffectiveTo > now ? now : r.EffectiveTo.Value))
            .Where(i => i.End > i.Start).OrderBy(i => i.Start).ToList();
        var total = TimeSpan.Zero; DateTime? cs = null, ce = null;
        foreach (var (s, e) in intervals)
        {
            if (cs is null) { cs = s; ce = e; continue; }
            if (s <= ce) { if (e > ce) ce = e; }
            else { total += ce!.Value - cs.Value; cs = s; ce = e; }
        }
        if (cs is not null) total += ce!.Value - cs.Value;
        return total >= TimeSpan.FromDays(30);
    }

    // ===================== Coupons =====================

    /// <summary>
    /// Locks the coupon row (SELECT ... FOR UPDATE) for the rest of the caller's transaction so that usage-limit counting and
    /// the order insert are serialized per coupon. Unknown codes lock nothing (ApplyCoupon rejects them).
    /// </summary>
    public async Task LockCoupon(string code)
    {
        if (db.Database.CurrentTransaction is null) throw new InvalidOperationException("Coupon locks require a transaction.");
        string norm;
        try { norm = CommerceText.NormalizeCode(code, "Coupon code"); } catch (AppException) { return; }
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT Id FROM Commerce_Coupons WHERE NormalizedCode = {norm} FOR UPDATE");
    }

    private async Task ApplyCoupon(Quote q, Guid userId, string code, decimal? saleAmount, bool gift, Guid? excludeOrderId, DateTime now)
    {
        var norm = CommerceText.NormalizeCode(code, "Coupon code");
        var c = await db.Set<Coupon>().AsNoTracking().FirstOrDefaultAsync(x => x.NormalizedCode == norm)
                ?? throw AppException.Bad("Coupon code is not valid.", "coupon_invalid");
        if (c.Status != "Active") throw AppException.Bad("Coupon code is not valid.", "coupon_invalid");
        if (c.StartsAt > now) throw AppException.Bad("Coupon is not active yet.", "coupon_not_started");
        if (c.ExpiresAt is not null && c.ExpiresAt <= now) throw AppException.Bad("Coupon has expired.", "coupon_expired");
        var applies = c.Scope switch
        {
            "All" => true,
            "Course" => q.Kind != "Bundle" && q.Items.Any(i => i.CourseId == c.ScopeId),
            "Package" => q.Kind != "Bundle" && q.Items.Any(i => i.PackageId == c.ScopeId),
            "Bundle" => q.BundleId == c.ScopeId,
            _ => false,
        };
        if (!applies) throw AppException.Bad("Coupon does not apply to this purchase.", "coupon_not_applicable");

        // Anti-abuse: course authors cannot use coupons on their own courses.
        var courseIds = q.Items.Select(i => i.CourseId).Distinct().ToList();
        if (await db.CourseInstructors.AnyAsync(ci => courseIds.Contains(ci.CourseId) && ci.UserId == userId))
            throw AppException.Bad("Course instructors cannot use coupons on their own courses.", "coupon_self_use");

        var giftsAllowed = gift && await db.Set<CouponGiftPolicy>().AnyAsync(p => p.CouponId == c.Id && p.AllowsGifts);
        if (c.Kind == "Scholarship")
        {
            if (gift) throw AppException.Bad("Scholarship codes cannot be used for gifts.", "coupon_not_applicable");
            var user = await db.Users.AsNoTracking().FirstAsync(u => u.Id == userId);
            var emails = CommerceText.Lines(c.AllowedEmails);
            var domains = CommerceText.Lines(c.AllowedDomains);
            var domain = user.NormalizedEmail.Contains('@') ? user.NormalizedEmail[(user.NormalizedEmail.LastIndexOf('@') + 1)..] : "";
            var eligible = emails.Contains(user.NormalizedEmail) || domains.Contains(domain)
                || (c.AllowedOrganizationId is { } org && await db.OrganizationMembers.AnyAsync(m => m.OrganizationId == org && m.UserId == userId));
            if (!eligible) throw AppException.Bad("This scholarship code is restricted to specific recipients.", "coupon_not_eligible");
        }

        if (c.Currency is not null && (c.Kind == "Fixed" || c.MinAmount is not null) && c.Currency != q.Currency)
            throw AppException.Bad($"Coupon is only valid for purchases in {c.Currency}.", "coupon_currency_mismatch");
        if (c.MinAmount is { } min && q.ListAmount < min) throw AppException.Bad($"Coupon requires a minimum purchase of {min} {c.Currency}.", "coupon_min_amount");

        // Usage limits: completed redemptions + recent pending orders that reserved the coupon.
        var since = now.AddMinutes(-ReservationMinutes);
        var reservedQuery = from o in db.Orders.AsNoTracking()
                            join d in db.Set<OrderDetail>().AsNoTracking() on o.Id equals d.OrderId
                            where d.CouponId == c.Id && o.Status == OrderStatus.Pending && o.CreatedAt >= since && o.Id != excludeOrderId
                            select o;
        if (c.MaxRedemptions is { } maxTotal)
        {
            var used = await db.Set<CouponRedemption>().CountAsync(r => r.CouponId == c.Id) + await reservedQuery.CountAsync();
            if (used >= maxTotal) throw AppException.Bad("Coupon usage limit has been reached.", "coupon_exhausted");
        }
        var mine = await db.Set<CouponRedemption>().CountAsync(r => r.CouponId == c.Id && r.UserId == userId) + await reservedQuery.CountAsync(o => o.UserId == userId);
        if (mine >= c.MaxPerUser) throw AppException.Bad("You have already used this coupon.", "coupon_already_used");

        var discount = c.Kind switch
        {
            "Percent" => Money.Round(q.ListAmount * c.PercentOff!.Value / 100m, q.Currency),
            "Fixed" => Math.Min(c.AmountOff!.Value, q.ListAmount),
            "Scholarship" => q.ListAmount,
            _ => 0m,
        };
        // Gifts: staff Percent coupons and any coupon that would make the gift free are reserved for coupons that
        // explicitly allow gifts (default false), so internal/100% codes cannot be laundered into transferable gift claims.
        if (gift && !giftsAllowed && ((c.CreatedByStaff && c.Kind == "Percent") || discount >= q.ListAmount))
            throw AppException.Bad("This coupon cannot be used for gift purchases.", "coupon_gift_not_allowed");
        if (!c.CreatedByStaff && c.Kind != "Scholarship" && discount > Money.Round(q.ListAmount * InstructorCouponMaxPercent / 100m, q.Currency))
            throw AppException.Bad("Coupon exceeds the instructor discount policy.", "coupon_exceeds_policy");
        var after = q.ListAmount - discount;
        // No stacking: a coupon applies to the regular price and replaces (never combines with) a running offer.
        if (saleAmount is not null && after >= saleAmount)
            throw AppException.Bad("Coupons cannot be combined with the current offer, which is already the better price.", "coupon_does_not_stack");
        q.Amount = after; q.CouponId = c.Id; q.CouponDiscount = discount; q.PriceSource = "Coupon";
        q.PromotionId = null; q.OfferEndsAt = null; q.CompareAtAmount = null;
    }

    private async Task<CouponDto> CouponDto(Coupon c) => new(c.Id, c.Code, c.Kind, c.PercentOff, c.AmountOff, c.Currency, c.Scope, c.ScopeId,
        c.MaxRedemptions, c.MaxPerUser, c.StartsAt, c.ExpiresAt, c.MinAmount, c.Status, c.CreatedByStaff, c.CreatedBy,
        await db.Set<CouponRedemption>().CountAsync(r => r.CouponId == c.Id),
        CommerceText.Lines(c.AllowedEmails), CommerceText.Lines(c.AllowedDomains), c.AllowedOrganizationId, c.CreatedAt);

    public async Task<CouponDto> CreateCoupon(CouponInput input, bool asStaff)
    {
        var uid = me.RequireId();
        var code = (input.Code ?? "").Trim();
        var norm = CommerceText.NormalizeCode(code, "Coupon code");
        var kind = input.Kind;
        if (kind is not ("Percent" or "Fixed" or "Scholarship")) throw AppException.Bad("Kind must be Percent, Fixed or Scholarship.");
        if (input.Scope is not ("All" or "Course" or "Package" or "Bundle")) throw AppException.Bad("Scope must be All, Course, Package or Bundle.");
        var c = new Coupon
        {
            Code = code, NormalizedCode = norm, Kind = kind, Scope = input.Scope, ScopeId = input.Scope == "All" ? null : input.ScopeId,
            CreatedBy = uid, CreatedByStaff = asStaff, StartsAt = input.StartsAt ?? DateTime.UtcNow, ExpiresAt = input.ExpiresAt,
            MaxRedemptions = input.MaxRedemptions, MaxPerUser = input.MaxPerUser ?? 1,
        };
        if (c.Scope != "All" && c.ScopeId is null) throw AppException.Bad("scopeId is required for a scoped coupon.");
        if (c.ExpiresAt is not null && c.ExpiresAt <= c.StartsAt) throw AppException.Bad("expiresAt must be after startsAt.");
        if (c.MaxRedemptions is < 1 or > 1_000_000) throw AppException.Bad("maxRedemptions must be between 1 and 1000000.");
        if (c.MaxPerUser is < 1 or > 100) throw AppException.Bad("maxPerUser must be between 1 and 100.");

        // Scope target and ownership.
        Guid? scopeCourse = null; decimal? scopePrice = null; string? scopeCurrency = null;
        switch (c.Scope)
        {
            case "Course":
                if (!await db.Courses.AnyAsync(x => x.Id == c.ScopeId)) throw AppException.NotFound("Course");
                scopeCourse = c.ScopeId; break;
            case "Package":
                var pkg = await db.Packages.AsNoTracking().FirstOrDefaultAsync(p => p.Id == c.ScopeId) ?? throw AppException.NotFound("Package");
                scopeCourse = pkg.CourseId; scopePrice = pkg.Price; scopeCurrency = pkg.Currency; break;
            case "Bundle":
                if (!await db.Set<Bundle>().AnyAsync(b => b.Id == c.ScopeId)) throw AppException.NotFound("Bundle");
                break;
        }
        if (!asStaff)
        {
            if (c.Scope is not ("Course" or "Package")) throw AppException.Forbidden("Instructors can only create coupons for their own courses or packages.");
            await scope.RequireCourseManager(scopeCourse!.Value); // Editors cannot change pricing
        }

        switch (kind)
        {
            case "Percent":
                if (input.PercentOff is not { } pct || pct <= 0 || pct >= 100) throw AppException.Bad("percentOff must be greater than 0 and less than 100.");
                if (decimal.Round(pct, 2) != pct) throw AppException.Bad("percentOff allows at most 2 decimal places.");
                if (!asStaff && pct > InstructorCouponMaxPercent)
                    throw AppException.Bad($"Instructor coupons may give at most {InstructorCouponMaxPercent}% off.", "coupon_exceeds_policy");
                c.PercentOff = pct; break;
            case "Fixed":
                c.Currency = CommerceText.Currency(input.Currency);
                CommerceText.ValidAmount(input.AmountOff ?? 0, c.Currency, "amountOff");
                c.AmountOff = input.AmountOff;
                if (!asStaff && scopePrice is not null && scopeCurrency == c.Currency && c.AmountOff > Money.Round(scopePrice.Value * InstructorCouponMaxPercent / 100m, c.Currency))
                    throw AppException.Bad($"Instructor coupons may give at most {InstructorCouponMaxPercent}% off.", "coupon_exceeds_policy");
                break;
            case "Scholarship":
                var emails = (input.AllowedEmails ?? []).Select(e => (e ?? "").Trim().ToUpperInvariant()).Where(e => e.Length > 0).Distinct().ToList();
                var domains = (input.AllowedDomains ?? []).Select(e => (e ?? "").Trim().TrimStart('@').ToUpperInvariant()).Where(e => e.Length > 0).Distinct().ToList();
                if (emails.Any(e => !Regex.IsMatch(e, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))) throw AppException.Bad("allowedEmails contains an invalid address.");
                if (domains.Any(d => !Regex.IsMatch(d, @"^[A-Z0-9.-]+\.[A-Z]{2,}$"))) throw AppException.Bad("allowedDomains contains an invalid domain.");
                if (input.AllowedOrganizationId is { } org && !await db.Organizations.AnyAsync(o => o.Id == org)) throw AppException.NotFound("Organization");
                if (emails.Count == 0 && domains.Count == 0 && input.AllowedOrganizationId is null)
                    throw AppException.Bad("Scholarship codes must be restricted to specific emails, domains or an organization.", "scholarship_unrestricted");
                if (emails.Count > 5000 || domains.Count > 100) throw AppException.Bad("Too many restrictions (max 5000 emails, 100 domains).");
                c.AllowedEmails = string.Join('\n', emails); c.AllowedDomains = string.Join('\n', domains);
                c.AllowedOrganizationId = input.AllowedOrganizationId;
                c.Status = "PendingApproval"; // scholarships always need a second person's approval
                break;
        }
        if (input.MinAmount is { } minAmount)
        {
            c.Currency ??= CommerceText.Currency(input.Currency);
            CommerceText.ValidAmount(minAmount, c.Currency, "minAmount");
            c.MinAmount = minAmount;
        }
        if (await db.Set<Coupon>().AnyAsync(x => x.NormalizedCode == norm)) throw AppException.Conflict("A coupon with this code already exists.", "coupon_code_taken");
        if (input.AllowsGifts && !asStaff) throw AppException.Forbidden("Only staff can allow a coupon to be used for gifts.");
        db.Set<Coupon>().Add(c);
        if (input.AllowsGifts) db.Set<CouponGiftPolicy>().Add(new CouponGiftPolicy { CouponId = c.Id, AllowsGifts = true, SetBy = uid });
        audit.Record("coupon.created", nameof(Coupon), c.Id, new { c.Code, c.Kind, c.PercentOff, c.AmountOff, c.Currency, c.Scope, c.ScopeId, c.MaxRedemptions, c.MaxPerUser, c.StartsAt, c.ExpiresAt, c.Status, asStaff, input.AllowsGifts });
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { throw AppException.Conflict("A coupon with this code already exists.", "coupon_code_taken"); }
        return await CouponDto(c);
    }

    public async Task<List<CouponDto>> ListCoupons(bool mine)
    {
        var uid = me.RequireId();
        var q = db.Set<Coupon>().AsNoTracking();
        if (mine) q = q.Where(c => c.CreatedBy == uid);
        var list = await q.OrderByDescending(c => c.CreatedAt).Take(500).ToListAsync();
        var res = new List<CouponDto>();
        foreach (var c in list) res.Add(await CouponDto(c));
        return res;
    }

    public async Task<CouponDto> DecideCoupon(Guid id, DecisionInput input)
    {
        var uid = me.RequireId();
        var c = await db.Set<Coupon>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Coupon");
        var old = c.Status;
        switch (input.Decision)
        {
            case "Approve":
                if (c.Status != "PendingApproval") throw AppException.Conflict($"Coupon is {c.Status}.", "coupon_not_pending");
                if (c.CreatedBy == uid) throw AppException.Forbidden("A scholarship code must be approved by someone other than its creator.");
                c.Status = "Active"; c.ApprovedBy = uid; c.ApprovedAt = DateTime.UtcNow; break;
            case "Reject":
                if (c.Status != "PendingApproval") throw AppException.Conflict($"Coupon is {c.Status}.", "coupon_not_pending");
                c.Status = "Rejected"; break;
            case "Disable":
                c.Status = "Disabled"; break;
            default: throw AppException.Bad("Decision must be Approve, Reject or Disable.");
        }
        audit.Record("coupon.decision", nameof(Coupon), c.Id, new { input.Decision, old, @new = c.Status, input.Notes });
        await db.SaveChangesAsync();
        return await CouponDto(c);
    }

    public async Task<CouponDto> DisableOwnCoupon(Guid id)
    {
        var uid = me.RequireId();
        var c = await db.Set<Coupon>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Coupon");
        if (c.CreatedBy != uid) throw AppException.NotFound("Coupon");
        c.Status = "Disabled";
        audit.Record("coupon.disabled", nameof(Coupon), c.Id);
        await db.SaveChangesAsync();
        return await CouponDto(c);
    }

    // ===================== Referral codes =====================

    public async Task<ReferralCodeDto> CreateReferralCode(Guid courseId, ReferralCodeInput input)
    {
        var uid = me.RequireId();
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await scope.RequireCourseManager(courseId);
        var code = string.IsNullOrWhiteSpace(input.Code) ? "R" + Tokens.Random(9).Replace("-", "x").Replace("_", "y").ToUpperInvariant() : input.Code!.Trim();
        var norm = CommerceText.NormalizeCode(code, "Referral code");
        if (await db.Set<ReferralCode>().AnyAsync(r => r.NormalizedCode == norm)) throw AppException.Conflict("This referral code is taken.", "referral_code_taken");
        var r = new ReferralCode { Code = code, NormalizedCode = norm, CourseId = courseId, InstructorId = uid };
        db.Set<ReferralCode>().Add(r);
        audit.Record("referral_code.created", nameof(ReferralCode), r.Id, new { courseId, code });
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { throw AppException.Conflict("This referral code is taken.", "referral_code_taken"); }
        return new ReferralCodeDto(r.Id, r.Code, r.CourseId, r.InstructorId, r.IsActive, r.CreatedAt);
    }

    public async Task<List<ReferralCodeDto>> MyReferralCodes(Guid courseId)
    {
        var uid = me.RequireId();
        return await db.Set<ReferralCode>().AsNoTracking().Where(r => r.CourseId == courseId && r.InstructorId == uid)
            .OrderByDescending(r => r.CreatedAt).Select(r => new ReferralCodeDto(r.Id, r.Code, r.CourseId, r.InstructorId, r.IsActive, r.CreatedAt)).ToListAsync();
    }

    // ===================== Affiliates =====================

    private static AffiliateDto ToDto(Affiliate a) => new(a.Id, a.Name, a.Email, a.Code, a.CommissionPercent, a.AttributionWindowDays, a.IsActive, a.CreatedAt);

    public async Task<AffiliateDto> CreateAffiliate(AffiliateInput input)
    {
        var uid = me.RequireId();
        var name = (input.Name ?? "").Trim(); var email = (input.Email ?? "").Trim();
        if (name.Length is < 2 or > 200) throw AppException.Bad("Name must be 2-200 characters.");
        if (!Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$") || email.Length > 255) throw AppException.Bad("A valid email is required.");
        var norm = CommerceText.NormalizeCode(input.Code, "Affiliate code");
        var maxPct = Math.Clamp(cfg.GetValue("Commerce:AffiliateMaxPercent", 30m), 0m, 100m);
        if (input.CommissionPercent <= 0 || input.CommissionPercent > maxPct) throw AppException.Bad($"commissionPercent must be greater than 0 and at most {maxPct}.");
        if (input.AttributionWindowDays is < 1 or > 90) throw AppException.Bad("attributionWindowDays must be between 1 and 90.");
        if (await db.Set<Affiliate>().AnyAsync(a => a.NormalizedCode == norm)) throw AppException.Conflict("This affiliate code is taken.", "affiliate_code_taken");
        var a = new Affiliate
        {
            Name = name, Email = email, Code = input.Code!.Trim(), NormalizedCode = norm, CommissionPercent = input.CommissionPercent,
            AttributionWindowDays = input.AttributionWindowDays, CreatedBy = uid,
        };
        db.Set<Affiliate>().Add(a);
        audit.Record("affiliate.created", nameof(Affiliate), a.Id, new { a.Code, a.CommissionPercent, a.AttributionWindowDays });
        await db.SaveChangesAsync();
        return ToDto(a);
    }

    public async Task<List<AffiliateDto>> Affiliates() =>
        (await db.Set<Affiliate>().AsNoTracking().OrderBy(a => a.Name).ToListAsync()).Select(ToDto).ToList();

    public async Task<AffiliateDto> SetAffiliateActive(Guid id, bool active)
    {
        var a = await db.Set<Affiliate>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Affiliate");
        a.IsActive = active;
        audit.Record(active ? "affiliate.activated" : "affiliate.deactivated", nameof(Affiliate), a.Id);
        await db.SaveChangesAsync();
        return ToDto(a);
    }

    /// <summary>Cookie-less attribution: the landing page records a click and passes the returned id into checkout.</summary>
    public async Task<AffiliateClickDto> RecordClick(AffiliateClickInput input)
    {
        var norm = CommerceText.NormalizeCode(input.Code, "Affiliate code");
        var a = await db.Set<Affiliate>().AsNoTracking().FirstOrDefaultAsync(x => x.NormalizedCode == norm && x.IsActive)
                ?? throw AppException.NotFound("Affiliate");
        var click = new AffiliateClick { AffiliateId = a.Id };
        db.Set<AffiliateClick>().Add(click);
        await db.SaveChangesAsync();
        return new AffiliateClickDto(click.Id, click.CreatedAt.AddDays(a.AttributionWindowDays));
    }

    // ===================== Regional prices =====================

    private static PackagePriceDto ToDto(PackagePrice p) => new(p.Id, p.PackageId, p.Currency, SplitCountries(p.Countries), p.Amount, p.Status, p.CreatedAt);

    public async Task<PackagePriceDto> ProposePrice(Guid packageId, PackagePriceInput input)
    {
        var uid = me.RequireId();
        var pkg = await db.Packages.AsNoTracking().FirstOrDefaultAsync(p => p.Id == packageId) ?? throw AppException.NotFound("Package");
        await scope.RequireCourseManager(pkg.CourseId);
        var cur = CommerceText.Currency(input.Currency);
        CommerceText.ValidAmount(input.Amount, cur);
        var countries = (input.Countries ?? []).Select(c => CommerceText.OptionalCountry(c) ?? throw AppException.Bad("Country codes must not be empty.", "invalid_country"))
            .Distinct().OrderBy(c => c).ToList();
        if (countries.Count > 60) throw AppException.Bad("At most 60 countries per price.");
        if (cur == pkg.Currency && countries.Count == 0) throw AppException.Bad("The base currency price is the package price; regional prices in it must name countries.", "duplicate_base_price");
        var p = new PackagePrice { PackageId = packageId, Currency = cur, Countries = string.Join(',', countries), Amount = input.Amount, ProposedBy = uid };
        db.Set<PackagePrice>().Add(p);
        audit.Record("package_price.proposed", nameof(PackagePrice), p.Id, new { packageId, cur, p.Countries, p.Amount });
        await db.SaveChangesAsync();
        return ToDto(p);
    }

    public async Task<List<PackagePriceDto>> PackagePrices(Guid packageId)
    {
        var pkg = await db.Packages.AsNoTracking().FirstOrDefaultAsync(p => p.Id == packageId) ?? throw AppException.NotFound("Package");
        await access.RequireCourseAuthorOrStaff(pkg.CourseId);
        return (await db.Set<PackagePrice>().AsNoTracking().Where(p => p.PackageId == packageId).OrderByDescending(p => p.CreatedAt).ToListAsync()).Select(ToDto).ToList();
    }

    public async Task<List<PackagePriceDto>> PendingPrices() =>
        (await db.Set<PackagePrice>().AsNoTracking().Where(p => p.Status == "Proposed").OrderBy(p => p.CreatedAt).Take(500).ToListAsync()).Select(ToDto).ToList();

    public async Task<PackagePriceDto> DecidePrice(Guid id, DecisionInput input)
    {
        var uid = me.RequireId();
        var p = await db.Set<PackagePrice>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Package price");
        var now = DateTime.UtcNow;
        var old = p.Status;
        await using var tx = await db.Database.BeginTransactionAsync();
        switch (input.Decision)
        {
            case "Approve":
                if (p.Status != "Proposed") throw AppException.Conflict($"Price is {p.Status}.", "price_not_pending");
                // A newer approved price for the same currency/countries replaces the previous one.
                var replaced = await db.Set<PackagePrice>().Where(x => x.PackageId == p.PackageId && x.Currency == p.Currency && x.Countries == p.Countries && x.Status == "Approved").ToListAsync();
                foreach (var r in replaced) { r.Status = "Retired"; await CloseHistory(r.PackageId, r.Currency, r.Amount, now); }
                p.Status = "Approved";
                db.Set<PriceHistory>().Add(new PriceHistory { PackageId = p.PackageId, Currency = p.Currency, Amount = p.Amount, EffectiveFrom = now });
                break;
            case "Reject":
                if (p.Status != "Proposed") throw AppException.Conflict($"Price is {p.Status}.", "price_not_pending");
                p.Status = "Rejected"; break;
            case "Retire":
                if (p.Status != "Approved") throw AppException.Conflict($"Price is {p.Status}.", "price_not_approved");
                p.Status = "Retired"; await CloseHistory(p.PackageId, p.Currency, p.Amount, now); break;
            default: throw AppException.Bad("Decision must be Approve, Reject or Retire.");
        }
        p.DecidedBy = uid; p.DecidedAt = now;
        audit.Record("package_price.decision", nameof(PackagePrice), p.Id, new { input.Decision, old, @new = p.Status, p.Currency, p.Countries, p.Amount, input.Notes });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return ToDto(p);
    }

    private async Task CloseHistory(Guid packageId, string currency, decimal amount, DateTime now)
    {
        var open = await db.Set<PriceHistory>().Where(h => h.PackageId == packageId && h.Currency == currency && h.Amount == amount && h.EffectiveTo == null)
            .OrderByDescending(h => h.EffectiveFrom).FirstOrDefaultAsync();
        if (open is not null) open.EffectiveTo = now;
    }

    /// <summary>Called when a package's base price becomes sellable (package approval).</summary>
    public async Task RecordBasePriceApproved(LearningPackage pkg)
    {
        var now = DateTime.UtcNow;
        if (await db.Set<PriceHistory>().AnyAsync(h => h.PackageId == pkg.Id && h.Currency == pkg.Currency && h.Amount == pkg.Price && h.EffectiveTo == null)) return;
        db.Set<PriceHistory>().Add(new PriceHistory { PackageId = pkg.Id, Currency = pkg.Currency, Amount = pkg.Price, EffectiveFrom = now });
    }

    public async Task RecordBasePriceWithdrawn(LearningPackage pkg) => await CloseHistory(pkg.Id, pkg.Currency, pkg.Price, DateTime.UtcNow);

    public async Task<PriceView> PublicPrice(Guid packageId, string? currency, string? country)
    {
        var pkg = await db.Packages.AsNoTracking().FirstOrDefaultAsync(p => p.Id == packageId && p.IsActive && p.ApprovalStatus == "Approved")
                  ?? throw AppException.NotFound("Package");
        var course = await db.Courses.AsNoTracking().FirstOrDefaultAsync(c => c.Id == pkg.CourseId);
        if (course is null || !AccessService.IsLive(course)) throw AppException.NotFound("Package");
        var cur = string.IsNullOrWhiteSpace(currency) ? null : CommerceText.Currency(currency);
        var (regular, resolved, _) = await ResolveRegularPrice(pkg, cur, CommerceText.OptionalCountry(country));
        var now = DateTime.UtcNow;
        var promo = await ActivePromotion(pkg.Id, now);
        decimal amount = regular; decimal? compareAt = null; OfferView? offer = null;
        if (promo is not null)
        {
            var sale = Money.Round(regular * (100m - promo.PercentOff) / 100m, resolved);
            if (sale > 0 && sale < regular)
            {
                amount = sale;
                offer = new OfferView(promo.Name, promo.EndsAt); // the real end time; never a synthetic countdown
                compareAt = await IsHonestReference(pkg.Id, resolved, regular, now) ? regular : null;
            }
        }
        return new PriceView(pkg.Id, pkg.Title, pkg.Contents, pkg.AccessDays, resolved, amount, regular, compareAt, offer, CommerceText.FreeVideoNotice);
    }

    // ===================== Promotions (scheduled offers) =====================

    private async Task<PromotionDto> ToDto(Promotion p) => new(p.Id, p.Name, p.PercentOff, p.StartsAt, p.EndsAt, p.Status,
        await db.Set<PromotionParticipation>().Where(x => x.PromotionId == p.Id && x.WithdrawnAt == null).Select(x => x.PackageId).ToListAsync());

    public async Task<PromotionDto> CreatePromotion(PromotionInput input)
    {
        var uid = me.RequireId();
        var name = (input.Name ?? "").Trim();
        if (name.Length is < 3 or > 200) throw AppException.Bad("Name must be 3-200 characters.");
        var maxPct = Math.Clamp(cfg.GetValue("Commerce:PromotionMaxPercent", 70m), 1m, 95m);
        if (input.PercentOff < 5 || input.PercentOff > maxPct || decimal.Round(input.PercentOff, 2) != input.PercentOff)
            throw AppException.Bad($"percentOff must be between 5 and {maxPct}.");
        var starts = DateTime.SpecifyKind(input.StartsAt, DateTimeKind.Utc); var ends = DateTime.SpecifyKind(input.EndsAt, DateTimeKind.Utc);
        if (ends <= starts || ends <= DateTime.UtcNow) throw AppException.Bad("endsAt must be in the future and after startsAt.");
        if (ends - starts > TimeSpan.FromDays(31)) throw AppException.Bad("A sale may last at most 31 days.", "promotion_too_long");
        var p = new Promotion { Name = name, PercentOff = input.PercentOff, StartsAt = starts, EndsAt = ends, CreatedBy = uid };
        db.Set<Promotion>().Add(p);
        audit.Record("promotion.created", nameof(Promotion), p.Id, new { name, input.PercentOff, starts, ends });
        await db.SaveChangesAsync();
        return await ToDto(p);
    }

    public async Task<List<PromotionDto>> Promotions()
    {
        var now = DateTime.UtcNow;
        var list = await db.Set<Promotion>().AsNoTracking().Where(p => p.EndsAt > now.AddDays(-30)).OrderByDescending(p => p.StartsAt).Take(200).ToListAsync();
        var res = new List<PromotionDto>();
        foreach (var p in list) res.Add(await ToDto(p));
        return res;
    }

    public async Task<PromotionDto> CancelPromotion(Guid id)
    {
        var p = await db.Set<Promotion>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Promotion");
        p.Status = "Cancelled";
        audit.Record("promotion.cancelled", nameof(Promotion), p.Id);
        await db.SaveChangesAsync();
        return await ToDto(p);
    }

    /// <summary>Instructor opt-in. Requires an established regular price (honest reference) so the sale is a real reduction.</summary>
    public async Task<PromotionDto> OptIn(Guid promotionId, PromotionOptInput input)
    {
        var uid = me.RequireId();
        var p = await db.Set<Promotion>().FirstOrDefaultAsync(x => x.Id == promotionId) ?? throw AppException.NotFound("Promotion");
        var pkg = await db.Packages.AsNoTracking().FirstOrDefaultAsync(x => x.Id == input.PackageId) ?? throw AppException.NotFound("Package");
        await scope.RequireCourseManager(pkg.CourseId);
        if (p.Status != "Scheduled" || p.EndsAt <= DateTime.UtcNow) throw AppException.Conflict("Promotion is not open for participation.", "promotion_closed");
        if (!pkg.IsActive || pkg.ApprovalStatus != "Approved") throw AppException.Bad("Only approved, active packages can join a sale.", "package_unavailable");
        if (!await IsHonestReference(pkg.Id, pkg.Currency, pkg.Price, DateTime.UtcNow))
            throw AppException.Bad("The package must have been sold at its regular price for at least 30 of the last 90 days before it can join a sale.", "reference_price_not_established");
        var existing = await db.Set<PromotionParticipation>().FirstOrDefaultAsync(x => x.PromotionId == p.Id && x.PackageId == pkg.Id);
        if (existing is null) db.Set<PromotionParticipation>().Add(new PromotionParticipation { PromotionId = p.Id, PackageId = pkg.Id, OptedInBy = uid });
        else { existing.WithdrawnAt = null; existing.OptedInBy = uid; }
        audit.Record("promotion.opt_in", nameof(Promotion), p.Id, new { packageId = pkg.Id });
        await db.SaveChangesAsync();
        return await ToDto(p);
    }

    public async Task<PromotionDto> OptOut(Guid promotionId, PromotionOptInput input)
    {
        var p = await db.Set<Promotion>().FirstOrDefaultAsync(x => x.Id == promotionId) ?? throw AppException.NotFound("Promotion");
        var pkg = await db.Packages.AsNoTracking().FirstOrDefaultAsync(x => x.Id == input.PackageId) ?? throw AppException.NotFound("Package");
        await scope.RequireCourseManager(pkg.CourseId);
        var existing = await db.Set<PromotionParticipation>().FirstOrDefaultAsync(x => x.PromotionId == p.Id && x.PackageId == pkg.Id && x.WithdrawnAt == null)
                       ?? throw AppException.NotFound("Participation");
        existing.WithdrawnAt = DateTime.UtcNow;
        audit.Record("promotion.opt_out", nameof(Promotion), p.Id, new { packageId = pkg.Id });
        await db.SaveChangesAsync();
        return await ToDto(p);
    }

    // ===================== Bundles =====================

    private record Component(LearningPackage Package, bool Available);

    private async Task<List<Component>> Components(Guid bundleId)
    {
        var pkgs = await (from bi in db.Set<BundleItem>().AsNoTracking()
                          join p in db.Packages.AsNoTracking() on bi.PackageId equals p.Id
                          where bi.BundleId == bundleId
                          select p).ToListAsync();
        var courseIds = pkgs.Select(p => p.CourseId).Distinct().ToList();
        var live = await db.Courses.AsNoTracking().Where(c => courseIds.Contains(c.Id)).Where(AccessService.IsLiveExpr).Select(c => c.Id).ToListAsync();
        return pkgs.OrderBy(p => p.Title).ThenBy(p => p.Id)
            .Select(p => new Component(p, p.IsActive && p.ApprovalStatus == "Approved" && live.Contains(p.CourseId))).ToList();
    }

    private async Task<BundleDto> ToDto(Bundle b)
    {
        var comps = await Components(b.Id);
        return new BundleDto(b.Id, b.Title, b.Description, b.Kind, b.CategoryId, b.Price, b.Currency, b.Status, comps.Sum(c => c.Package.Price),
            comps.Select(c => new BundleComponentDto(c.Package.Id, c.Package.CourseId, c.Package.Title, c.Package.Contents, c.Package.Price, c.Package.AccessDays)).ToList(),
            CommerceText.FreeVideoNotice);
    }

    public async Task<BundleDto> CreateBundle(BundleInput input)
    {
        var uid = me.RequireId();
        var title = (input.Title ?? "").Trim(); var desc = (input.Description ?? "").Trim();
        if (title.Length is < 3 or > 200) throw AppException.Bad("Title must be 3-200 characters.");
        if (desc.Length > 8000) throw AppException.Bad("Description must be at most 8000 characters.");
        if (CommerceService.MentionsVideoAccess(title) || CommerceService.MentionsVideoAccess(desc))
            throw AppException.Bad("Bundles may only sell paid study services; course videos are always free.", "package_sells_video_access");
        if (input.Kind is not ("Category" or "Certification")) throw AppException.Bad("Kind must be Category or Certification.");
        if (input.Kind == "Category" && (input.CategoryId is null || !await db.Categories.AnyAsync(c => c.Id == input.CategoryId)))
            throw AppException.Bad("A category bundle needs a valid categoryId.");
        var cur = CommerceText.Currency(input.Currency);
        CommerceText.ValidAmount(input.Price, cur, "Price");
        var ids = (input.PackageIds ?? []).Distinct().ToList();
        if (ids.Count is < 2 or > 50) throw AppException.Bad("A bundle needs 2-50 packages.");
        var pkgs = await db.Packages.AsNoTracking().Where(p => ids.Contains(p.Id)).ToListAsync();
        if (pkgs.Count != ids.Count) throw AppException.NotFound("Package");
        if (pkgs.Any(p => !p.IsActive || p.ApprovalStatus != "Approved")) throw AppException.Bad("All bundle packages must be approved and active.", "package_unavailable");
        if (pkgs.Any(p => p.Currency != cur)) throw AppException.Bad("All bundle packages must be priced in the bundle currency.", "currency_mismatch");
        if (input.Price >= pkgs.Sum(p => p.Price)) throw AppException.Bad("Bundle price must be lower than the sum of its packages.", "bundle_price_not_lower");
        var b = new Bundle { Title = title, Description = desc, Kind = input.Kind, CategoryId = input.CategoryId, Price = input.Price, Currency = cur, CreatedBy = uid };
        db.Set<Bundle>().Add(b);
        foreach (var id in ids) db.Set<BundleItem>().Add(new BundleItem { BundleId = b.Id, PackageId = id });
        audit.Record("bundle.created", nameof(Bundle), b.Id, new { title, input.Kind, input.Price, cur, ids });
        await db.SaveChangesAsync();
        return await ToDto(b);
    }

    public async Task<BundleDto> SetBundleStatus(Guid id, BundleStatusInput input)
    {
        var b = await db.Set<Bundle>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Bundle");
        b.Status = input.Active ? "Active" : "Inactive";
        audit.Record("bundle.status", nameof(Bundle), b.Id, new { b.Status });
        await db.SaveChangesAsync();
        return await ToDto(b);
    }

    public async Task<List<BundleDto>> PublicBundles()
    {
        var list = await db.Set<Bundle>().AsNoTracking().Where(b => b.Status == "Active").OrderBy(b => b.Title).Take(200).ToListAsync();
        var res = new List<BundleDto>();
        foreach (var b in list)
        {
            var dto = await ToDto(b);
            var comps = await Components(b.Id);
            if (comps.Count >= 2 && comps.All(c => c.Available)) res.Add(dto);
        }
        return res;
    }
}
