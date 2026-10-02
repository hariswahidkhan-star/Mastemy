using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Commerce;

public class PricingTests(InvoicingFixture fx) : IClassFixture<InvoicingFixture>
{
    [Fact]
    public async Task Regional_price_needs_approval_and_checkout_uses_validated_currency_and_country()
    {
        var seed = await fx.SeedCourse(50m);
        var owner = fx.Client(seed.Owner);
        var (_, admin) = await fx.User(Roles.Admin);
        var (_, buyer) = await fx.User(Roles.Student);

        var eur = (await (await owner.PostAsJsonAsync($"/api/studio/packages/{seed.Package.Id}/prices", new { currency = "EUR", amount = 45 })).Content.ReadFromJsonAsync<PackagePriceDto>())!;
        var inr = (await (await owner.PostAsJsonAsync($"/api/studio/packages/{seed.Package.Id}/prices", new { currency = "USD", countries = new[] { "in" }, amount = 15 })).Content.ReadFromJsonAsync<PackagePriceDto>())!;
        Assert.Equal("Proposed", eur.Status);
        var (_, stranger) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PostAsJsonAsync($"/api/studio/packages/{seed.Package.Id}/prices", new { currency = "GBP", amount = 40 })).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await owner.PostAsJsonAsync($"/api/admin/package-prices/{eur.Id}/decision", new { decision = "Approve" })).StatusCode);

        // Not approved yet -> EUR not sellable.
        Assert.Equal("currency_not_available", await Kit.ErrorCode(await buyer.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), currency = "EUR" })));
        Assert.Equal(HttpStatusCode.OK, (await admin.PostAsJsonAsync($"/api/admin/package-prices/{eur.Id}/decision", new { decision = "Approve" })).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await admin.PostAsJsonAsync($"/api/admin/package-prices/{inr.Id}/decision", new { decision = "Approve" })).StatusCode);

        var co = await Kit.Checkout(buyer, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), currency = "EUR", country = "DE" });
        Assert.Equal(45m, co.Amount); Assert.Equal("EUR", co.Currency); Assert.Equal("Regional", co.PriceSource);
        var india = await Kit.Checkout(buyer, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), currency = "USD", country = "IN" });
        Assert.Equal(15m, india.Amount);
        var us = await Kit.Checkout(buyer, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), country = "US" });
        Assert.Equal(50m, us.Amount);
        Assert.Equal("invalid_currency", await Kit.ErrorCode(await buyer.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), currency = "eur" })));
        Assert.Equal("currency_not_available", await Kit.ErrorCode(await buyer.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), currency = "JPY" })));

        // Paying the EUR order: webhook must match EUR amount; history recorded on approval.
        Assert.Equal("paid", (await Kit.WebhookOk(fx, Kit.Event("checkout.session.completed", Kit.Completed(co.OrderId, 45m, "EUR")))).Status);
        Assert.True(await fx.Db(d => d.Set<PriceHistory>().AnyAsync(h => h.PackageId == seed.Package.Id && h.Currency == "EUR" && h.Amount == 45m && h.EffectiveTo == null)));
    }

    [Fact]
    public async Task Compare_at_price_is_shown_only_when_honest_and_offer_exposes_real_end_time()
    {
        var seed = await fx.SeedCourse(80m);
        var fresh = await fx.SeedCourse(80m);
        await fx.Db(async d =>
        {
            // Sold at 80 for 40 of the last 90 days (seed) ; fresh package only 10 days at 80.
            d.Set<PriceHistory>().Add(new PriceHistory { PackageId = seed.Package.Id, Currency = "USD", Amount = 80m, EffectiveFrom = DateTime.UtcNow.AddDays(-40) });
            d.Set<PriceHistory>().Add(new PriceHistory { PackageId = fresh.Package.Id, Currency = "USD", Amount = 80m, EffectiveFrom = DateTime.UtcNow.AddDays(-10) });
            await d.SaveChangesAsync();
        });
        var (_, admin) = await fx.User(Roles.Admin);
        var ends = DateTime.UtcNow.AddDays(5);
        var promo = (await (await admin.PostAsJsonAsync("/api/admin/promotions", new { name = "Exam season", percentOff = 25, startsAt = DateTime.UtcNow.AddMinutes(-5), endsAt = ends })).Content.ReadFromJsonAsync<PromotionDto>())!;
        Assert.Equal("promotion_too_long", await Kit.ErrorCode(await admin.PostAsJsonAsync("/api/admin/promotions", new { name = "Forever", percentOff = 25, startsAt = DateTime.UtcNow, endsAt = DateTime.UtcNow.AddDays(60) })));

        // Opt-in is instructor's choice; package without an established price is rejected.
        var notOptedIn = await fx.Client().GetFromJsonAsync<PriceView>($"/api/packages/{seed.Package.Id}/price");
        Assert.Null(notOptedIn!.Offer);
        Assert.Equal(80m, notOptedIn.Amount);
        Assert.Equal("reference_price_not_established", await Kit.ErrorCode(await fx.Client(fresh.Owner).PostAsJsonAsync($"/api/studio/promotions/{promo.Id}/opt-in", new { packageId = fresh.Package.Id })));
        Assert.Equal(HttpStatusCode.Forbidden, (await fx.Client(fresh.Owner).PostAsJsonAsync($"/api/studio/promotions/{promo.Id}/opt-in", new { packageId = seed.Package.Id })).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await fx.Client(seed.Owner).PostAsJsonAsync($"/api/studio/promotions/{promo.Id}/opt-in", new { packageId = seed.Package.Id })).StatusCode);

        var view = await fx.Client().GetFromJsonAsync<PriceView>($"/api/packages/{seed.Package.Id}/price");
        Assert.Equal(60m, view!.Amount);
        Assert.Equal(80m, view.CompareAtAmount);
        Assert.NotNull(view.Offer);
        Assert.InRange((view.Offer!.EndsAt - ends).Duration().TotalSeconds, 0, 2);
        Assert.Contains("free", view.FreeVideoNotice);

        // If the history no longer supports the reference price, no compare-at is shown (sale still honest about its end).
        await fx.Db(d => d.Set<PriceHistory>().Where(h => h.PackageId == seed.Package.Id).ExecuteUpdateAsync(s => s.SetProperty(h => h.EffectiveFrom, DateTime.UtcNow.AddDays(-5))));
        var noRef = await fx.Client().GetFromJsonAsync<PriceView>($"/api/packages/{seed.Package.Id}/price");
        Assert.Null(noRef!.CompareAtAmount);

        var (_, buyer) = await fx.User(Roles.Student);
        var co = await Kit.Checkout(buyer, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        Assert.Equal(60m, co.Amount); Assert.Equal("Offer", co.PriceSource);

        Assert.Equal(HttpStatusCode.OK, (await fx.Client(seed.Owner).PostAsJsonAsync($"/api/studio/promotions/{promo.Id}/opt-out", new { packageId = seed.Package.Id })).StatusCode);
        Assert.Equal(80m, (await fx.Client().GetFromJsonAsync<PriceView>($"/api/packages/{seed.Package.Id}/price"))!.Amount);
    }

    [Fact]
    public async Task Bundle_grants_each_package_and_splits_commission_pro_rata()
    {
        var a = await fx.SeedCourse(30m);
        var b = await fx.SeedCourse(10m);
        var (_, admin) = await fx.User(Roles.Admin);
        var catId = await fx.Db(async d => { var c = new Category { Slug = "cat-" + Guid.NewGuid().ToString("N")[..8], NameEn = "Cat", NameAr = "Cat" }; d.Categories.Add(c); await d.SaveChangesAsync(); return c.Id; });
        Assert.Equal("bundle_price_not_lower", await Kit.ErrorCode(await admin.PostAsJsonAsync("/api/admin/bundles", new { title = "Exam bundle", description = "All mocks", kind = "Category", categoryId = catId, price = 40, currency = "USD", packageIds = new[] { a.Package.Id, b.Package.Id } })));
        Assert.Equal("package_sells_video_access", await Kit.ErrorCode(await admin.PostAsJsonAsync("/api/admin/bundles", new { title = "All video access", description = "x", kind = "Category", categoryId = catId, price = 20, currency = "USD", packageIds = new[] { a.Package.Id, b.Package.Id } })));
        var (_, instructor) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.PostAsJsonAsync("/api/admin/bundles", new { title = "Exam bundle", description = "", kind = "Category", categoryId = catId, price = 20, currency = "USD", packageIds = new[] { a.Package.Id, b.Package.Id } })).StatusCode);
        var bundle = (await (await admin.PostAsJsonAsync("/api/admin/bundles", new { title = "Exam bundle", description = "Notes and mocks for two courses", kind = "Category", categoryId = catId, price = 20, currency = "USD", packageIds = new[] { a.Package.Id, b.Package.Id } })).Content.ReadFromJsonAsync<BundleDto>())!;
        Assert.Equal(40m, bundle.ComponentsListTotal);
        Assert.Contains(await fx.Client().GetFromJsonAsync<List<BundleDto>>("/api/bundles") ?? [], x => x.Id == bundle.Id);

        var (buyer, client) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, client, new { bundleId = bundle.Id, idempotencyKey = Kit.Key() });
        Assert.Equal(20m, co.Amount);
        var ents = await fx.Db(d => d.Entitlements.Where(e => e.OrderId == co.OrderId).ToListAsync());
        Assert.Equal(2, ents.Count);
        Assert.All(ents, e => Assert.Equal(buyer.Id, e.UserId));
        var items = await fx.Db(d => d.OrderItems.Where(i => i.OrderId == co.OrderId).ToListAsync());
        Assert.Equal(15m, items.Single(i => i.PackageId == a.Package.Id).UnitPrice); // 30/40 of 20
        Assert.Equal(5m, items.Single(i => i.PackageId == b.Package.Id).UnitPrice);
        var ledger = await fx.LedgerForOrder(co.OrderId);
        Assert.Equal(4, ledger.Count);
        Assert.Equal(20m, ledger.Sum(l => l.InstructorAmount + l.PlatformAmount));
        Assert.Equal(6.3m, ledger.Single(l => l.InstructorId == a.Owner.Id).InstructorAmount); // 15*70%*60%
        Assert.Equal(2.1m, ledger.Single(l => l.InstructorId == b.Owner.Id).InstructorAmount);  // 5*70%*60%

        Assert.Equal("gift_bundle_not_supported", await Kit.ErrorCode(await client.PostAsJsonAsync("/api/checkout", new { bundleId = bundle.Id, idempotencyKey = Kit.Key(), gift = new { recipientEmail = "x@y.test" } })));
    }

    [Fact]
    public async Task Referral_code_raises_instructor_pool_and_self_referral_is_rejected()
    {
        var seed = await fx.SeedCourse(100m);
        var owner = fx.Client(seed.Owner);
        var rc = (await (await owner.PostAsJsonAsync($"/api/studio/courses/{seed.Course.Id}/referral-codes", new { code = "REF" + Guid.NewGuid().ToString("N")[..8] })).Content.ReadFromJsonAsync<ReferralCodeDto>())!;
        var (_, stranger) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PostAsJsonAsync($"/api/studio/courses/{seed.Course.Id}/referral-codes", new { })).StatusCode);
        Assert.Equal("referral_self_use", await Kit.ErrorCode(await owner.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, referralCode = rc.Code })));

        var (_, buyer) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, buyer, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), referralCode = rc.Code.ToLowerInvariant() });
        var detail = await fx.Db(d => d.Set<OrderDetail>().FirstAsync(x => x.OrderId == co.OrderId));
        Assert.Equal(seed.Owner.Id, detail.ReferrerInstructorId);
        var ledger = await fx.LedgerForOrder(co.OrderId);
        Assert.Equal(54m, ledger.Single(l => l.InstructorId == seed.Owner.Id).InstructorAmount); // 100 * 90% * 60%
        Assert.Equal(36m, ledger.Single(l => l.InstructorId == seed.CoInstructor.Id).InstructorAmount);
    }

    [Fact]
    public async Task Affiliate_attribution_window_and_ledger()
    {
        var seed = await fx.SeedCourse(50m);
        var (_, finance) = await fx.User(Roles.Finance);
        var code = "AFF" + Guid.NewGuid().ToString("N")[..8];
        var aff = (await (await finance.PostAsJsonAsync("/api/admin/affiliates", new { name = "Blog", email = "blog@aff.test", code, commissionPercent = 10, attributionWindowDays = 7 })).Content.ReadFromJsonAsync<AffiliateDto>())!;
        var (_, student) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.PostAsJsonAsync("/api/admin/affiliates", new { name = "Me", email = "me@aff.test", code = "X" + code, commissionPercent = 10, attributionWindowDays = 7 })).StatusCode);

        var click = (await (await fx.Client().PostAsJsonAsync("/api/affiliates/clicks", new { code = code.ToLowerInvariant() })).Content.ReadFromJsonAsync<AffiliateClickDto>())!;
        var co = await Kit.Pay(fx, student, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), affiliateClickId = click.ClickId });
        var ledger = await fx.LedgerForOrder(co.OrderId);
        var affEntry = ledger.Single(l => l.Kind == "Affiliate");
        Assert.Equal(aff.Id, affEntry.InstructorId);
        Assert.Equal(5m, affEntry.InstructorAmount);
        Assert.Equal(-5m, affEntry.PlatformAmount);
        Assert.Equal(50m, ledger.Sum(l => l.InstructorAmount + l.PlatformAmount));

        // Expired click.
        var old = (await (await fx.Client().PostAsJsonAsync("/api/affiliates/clicks", new { code })).Content.ReadFromJsonAsync<AffiliateClickDto>())!;
        await fx.Db(d => d.Set<AffiliateClick>().Where(c => c.Id == old.ClickId).ExecuteUpdateAsync(s => s.SetProperty(c => c.CreatedAt, DateTime.UtcNow.AddDays(-8))));
        Assert.Equal("affiliate_expired", await Kit.ErrorCode(await student.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, affiliateClickId = old.ClickId })));
    }
}
