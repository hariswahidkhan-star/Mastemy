using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mastemy.Api.Modules.Commerce;

/// <summary>Public, unauthenticated read endpoints (prices, bundles, plans) and affiliate click capture.</summary>
[ApiController]
[AllowAnonymous]
public class CommercePublicController(PricingService pricing, SubscriptionService subs) : ControllerBase
{
    [HttpGet("api/packages/{id:guid}/price")]
    public Task<PriceView> Price(Guid id, [FromQuery] string? currency, [FromQuery] string? country) => pricing.PublicPrice(id, currency, country);

    [HttpGet("api/commerce/currencies")]
    public Task<List<CurrencyOptionDto>> Currencies([FromQuery] Guid? packageId, [FromQuery] Guid? courseId) => pricing.PublicCurrencies(packageId, courseId);

    [HttpGet("api/bundles")]
    public Task<List<BundleDto>> Bundles() => pricing.PublicBundles();

    [HttpGet("api/plans")]
    public Task<List<PlanDto>> Plans() => subs.Plans(false);

    [HttpPost("api/affiliates/clicks"), Microsoft.AspNetCore.RateLimiting.EnableRateLimiting("public-write")]
    public Task<AffiliateClickDto> Click(AffiliateClickInput input) => pricing.RecordClick(input);
}

/// <summary>Signed-in buyer endpoints.</summary>
[ApiController]
[Authorize]
public class CommerceBuyerController(PricingService pricing, SubscriptionService subs, GiftService gifts, InvoiceService invoices) : ControllerBase
{
    [HttpPost("api/checkout/quote")]
    public Task<QuoteDto> Quote(QuoteInput input) => pricing.QuoteForMe(input);

    [HttpPost("api/subscriptions/checkout")]
    public Task<SubscriptionCheckoutResponse> SubscriptionCheckout(SubscriptionCheckoutInput input) => subs.Checkout(input);

    [HttpGet("api/me/subscriptions")]
    public Task<List<SubscriptionDto>> MySubscriptions() => subs.MySubscriptions();

    [HttpPost("api/me/subscriptions/{id:guid}/cancel")]
    public Task<SubscriptionDto> Cancel(Guid id) => subs.SetCancelAtPeriodEnd(id, true);

    [HttpPost("api/me/subscriptions/{id:guid}/resume")]
    public Task<SubscriptionDto> Resume(Guid id) => subs.SetCancelAtPeriodEnd(id, false);

    [HttpGet("api/me/orders/{id:guid}/gift-code")]
    public Task<GiftCodeDto> GiftCode(Guid id) => gifts.Reveal(id);

    [HttpPost("api/gifts/redeem")]
    public Task<GiftRedeemDto> Redeem(GiftRedeemInput input) => gifts.Redeem(input);

    [HttpGet("api/me/invoices")]
    public Task<List<InvoiceDto>> MyInvoices() => invoices.MyInvoices();

    [HttpGet("api/me/invoices/{id:guid}/pdf")]
    public async Task<IActionResult> MyInvoicePdf(Guid id)
    {
        var (pdf, name) = await invoices.Pdf(id, false);
        return File(pdf, "application/pdf", name);
    }
}

/// <summary>Instructor commercial workspace.</summary>
[ApiController]
[Authorize(Policy = "Instructor")]
public class CommerceStudioController(PricingService pricing, FinanceService finance, Mastemy.Api.Infrastructure.ICurrentUser me) : ControllerBase
{
    [HttpGet("api/studio/commerce/policy")]
    public CommercePolicyDto Policy() => pricing.Policy();

    [HttpPost("api/studio/coupons")]
    public Task<CouponDto> CreateCoupon(CouponInput input) => pricing.CreateCoupon(input, false);

    [HttpGet("api/studio/coupons")]
    public Task<List<CouponDto>> MyCoupons() => pricing.ListCoupons(true);

    [HttpPost("api/studio/coupons/{id:guid}/disable")]
    public Task<CouponDto> DisableCoupon(Guid id) => pricing.DisableOwnCoupon(id);

    [HttpPost("api/studio/courses/{id:guid}/referral-codes")]
    public Task<ReferralCodeDto> CreateReferral(Guid id, ReferralCodeInput input) => pricing.CreateReferralCode(id, input);

    [HttpGet("api/studio/courses/{id:guid}/referral-codes")]
    public Task<List<ReferralCodeDto>> Referrals(Guid id) => pricing.MyReferralCodes(id);

    [HttpPost("api/studio/packages/{id:guid}/prices")]
    public Task<PackagePriceDto> ProposePrice(Guid id, PackagePriceInput input) => pricing.ProposePrice(id, input);

    [HttpGet("api/studio/packages/{id:guid}/prices")]
    public Task<List<PackagePriceDto>> Prices(Guid id) => pricing.PackagePrices(id);

    [HttpGet("api/studio/promotions")]
    public Task<List<PromotionDto>> Promotions() => pricing.Promotions();

    [HttpPost("api/studio/promotions/{id:guid}/opt-in")]
    public Task<PromotionDto> OptIn(Guid id, PromotionOptInput input) => pricing.OptIn(id, input);

    [HttpPost("api/studio/promotions/{id:guid}/opt-out")]
    public Task<PromotionDto> OptOut(Guid id, PromotionOptInput input) => pricing.OptOut(id, input);

    [HttpGet("api/studio/payout-profile")]
    public Task<PayoutProfileDto?> PayoutProfile() => finance.MyPayoutProfile();

    [HttpPut("api/studio/payout-profile")]
    public Task<PayoutProfileDto> SavePayoutProfile(PayoutProfileInput input) => finance.SavePayoutProfile(input);

    [HttpGet("api/studio/balances")]
    public Task<List<PayoutBalanceDto>> Balances() => finance.MyBalances();

    [HttpPost("api/studio/payout-requests")]
    public Task<PayoutRequestDto> RequestPayout(PayoutRequestInput input) => finance.RequestPayout(input);

    [HttpGet("api/studio/payout-requests")]
    public Task<List<PayoutRequestDto>> PayoutRequests() => finance.MyPayoutRequests();

    [HttpGet("api/studio/statements")]
    public async Task<IActionResult> Statement([FromQuery] int year, [FromQuery] int month, [FromQuery] string? format)
    {
        var (content, type, name) = await finance.StatementFile(me.RequireId(), year, month, format);
        return File(content, type, name);
    }
}

/// <summary>Staff (Admin/SuperAdmin) catalogue-commercial administration.</summary>
[ApiController]
[Authorize(Policy = "Staff")]
public class CommerceAdminController(PricingService pricing, SubscriptionService subs) : ControllerBase
{
    [HttpPost("api/admin/coupons")]
    public Task<CouponDto> CreateCoupon(CouponInput input) => pricing.CreateCoupon(input, true);

    [HttpGet("api/admin/coupons")]
    public Task<List<CouponDto>> Coupons() => pricing.ListCoupons(false);

    [HttpPost("api/admin/coupons/{id:guid}/decision")]
    public Task<CouponDto> DecideCoupon(Guid id, DecisionInput input) => pricing.DecideCoupon(id, input);

    [HttpGet("api/admin/package-prices")]
    public Task<List<PackagePriceDto>> PendingPrices() => pricing.PendingPrices();

    [HttpPost("api/admin/package-prices/{id:guid}/decision")]
    public Task<PackagePriceDto> DecidePrice(Guid id, DecisionInput input) => pricing.DecidePrice(id, input);

    [HttpPost("api/admin/promotions")]
    public Task<PromotionDto> CreatePromotion(PromotionInput input) => pricing.CreatePromotion(input);

    [HttpGet("api/admin/promotions")]
    public Task<List<PromotionDto>> Promotions() => pricing.Promotions();

    [HttpPost("api/admin/promotions/{id:guid}/cancel")]
    public Task<PromotionDto> CancelPromotion(Guid id) => pricing.CancelPromotion(id);

    [HttpPost("api/admin/bundles")]
    public Task<BundleDto> CreateBundle(BundleInput input) => pricing.CreateBundle(input);

    [HttpGet("api/admin/bundles")]
    public Task<List<BundleDto>> AdminBundles([FromQuery] bool includeInactive = false) => pricing.AdminBundles(includeInactive);

    [HttpPost("api/admin/bundles/{id:guid}/status")]
    public Task<BundleDto> BundleStatus(Guid id, BundleStatusInput input) => pricing.SetBundleStatus(id, input);

    [HttpPost("api/admin/plans")]
    public Task<PlanDto> CreatePlan(PlanInput input) => subs.CreatePlan(input);

    [HttpPut("api/admin/plans/{id:guid}")]
    public Task<PlanDto> UpdatePlan(Guid id, PlanUpdateInput input) => subs.UpdatePlan(id, input);

    [HttpGet("api/admin/plans")]
    public Task<List<PlanDto>> Plans() => subs.Plans(true);
}

/// <summary>Finance (Finance/Admin/SuperAdmin) operations.</summary>
[ApiController]
[Authorize(Policy = "Finance")]
public class CommerceFinanceController(FinanceService finance, InvoiceService invoices, PricingService pricing, SubscriptionService subs) : ControllerBase
{
    [HttpPost("api/admin/orders/{id:guid}/refunds")]
    public Task<RefundDto> Refund(Guid id, AdminRefundInput input) => finance.AdminRefund(id, input);

    [HttpGet("api/admin/disputes")]
    public Task<List<DisputeDto>> Disputes([FromQuery] string? status) => finance.Disputes(status);

    [HttpGet("api/admin/reconciliation")]
    public Task<ReconciliationDto> Reconciliation([FromQuery] DateOnly from, [FromQuery] DateOnly to) => finance.Reconcile(from, to);

    [HttpGet("api/admin/invoices")]
    public Task<List<InvoiceDto>> Invoices([FromQuery] Guid? orderId, [FromQuery] int? year) => invoices.AdminInvoices(orderId, year);

    [HttpGet("api/admin/invoices/{id:guid}/pdf")]
    public async Task<IActionResult> InvoicePdf(Guid id)
    {
        var (pdf, name) = await invoices.Pdf(id, true);
        return File(pdf, "application/pdf", name);
    }

    [HttpGet("api/admin/tax-rates")]
    public Task<List<TaxRateDto>> TaxRates() => invoices.TaxRates();

    [HttpPut("api/admin/tax-rates/{country}")]
    public Task<TaxRateDto> SetTaxRate(string country, TaxRateInput input) => invoices.SetTaxRate(country, input);

    [HttpDelete("api/admin/tax-rates/{country}")]
    public async Task<IActionResult> DeleteTaxRate(string country) { await invoices.DeleteTaxRate(country); return NoContent(); }

    [HttpGet("api/admin/payout-profiles")]
    public Task<List<PayoutProfileDto>> PayoutProfiles() => finance.PayoutProfiles();

    [HttpPut("api/admin/payout-profiles/{userId:guid}/tax-form-status")]
    public Task<PayoutProfileDto> TaxForm(Guid userId, TaxFormStatusInput input) => finance.SetTaxFormStatus(userId, input);

    [HttpGet("api/admin/payout-requests")]
    public Task<List<PayoutRequestDto>> PayoutRequests([FromQuery] string? status) => finance.PayoutRequests(status);

    [HttpPost("api/admin/payout-requests/batch")]
    public async Task<object> Batch(BatchRequestsInput input) => new { payoutBatchId = await finance.BatchRequests(input) };

    [HttpPost("api/admin/payout-requests/{id:guid}/reject")]
    public Task<PayoutRequestDto> Reject(Guid id, RejectInput input) => finance.RejectPayoutRequest(id, input);

    [HttpGet("api/admin/instructors/{id:guid}/statements")]
    public async Task<IActionResult> Statement(Guid id, [FromQuery] int year, [FromQuery] int month, [FromQuery] string? format)
    {
        var (content, type, name) = await finance.StatementFile(id, year, month, format);
        return File(content, type, name);
    }

    [HttpPost("api/admin/affiliates")]
    public Task<AffiliateDto> CreateAffiliate(AffiliateInput input) => pricing.CreateAffiliate(input);

    [HttpGet("api/admin/affiliates")]
    public Task<List<AffiliateDto>> Affiliates() => pricing.Affiliates();

    [HttpPost("api/admin/affiliates/{id:guid}/active")]
    public Task<AffiliateDto> AffiliateActive(Guid id, BundleStatusInput input) => pricing.SetAffiliateActive(id, input.Active);

    [HttpPost("api/admin/subscription-pool/allocate")]
    public Task<List<PoolAllocationDto>> Allocate(PoolAllocateInput input) => subs.AllocatePool(input.Year, input.Month);

    [HttpGet("api/admin/subscription-pool")]
    public Task<List<PoolAllocationDto>> Allocations([FromQuery] int? year) => subs.Allocations(year);
}
