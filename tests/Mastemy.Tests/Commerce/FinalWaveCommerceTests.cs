using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Commerce;

/// <summary>Scholarship restriction normalization, public currency list, gift flags on orders, admin bundle list,
/// studio commerce policy, invoice seller snapshots and platform-only reconciliation.</summary>
public class FinalWaveCommerceTests(InvoicingFixture fx) : IClassFixture<InvoicingFixture>
{
    private static string Code() => "S" + Guid.NewGuid().ToString("N")[..10];

    /// <summary>A user stored the way Identity stores them (NormalizedEmail lower-cased).</summary>
    private async Task<(User User, HttpClient Client)> RealUser(string email)
    {
        var u = new User { Email = email, NormalizedEmail = email.Trim().ToLowerInvariant(), DisplayName = "Learner", PasswordHash = "x" };
        u.Roles = [new UserRole { UserId = u.Id, Role = Roles.Student }];
        await fx.Db(async d => { d.Users.Add(u); await d.SaveChangesAsync(); });
        return (u, fx.Client(u));
    }

    private async Task<CouponDto> ApprovedScholarship(Guid courseId, object restrictions)
    {
        var (_, admin) = await fx.User(Roles.Admin);
        var (_, admin2) = await fx.User(Roles.Admin);
        var body = new Dictionary<string, object?> { ["code"] = Code(), ["kind"] = "Scholarship", ["scope"] = "Course", ["scopeId"] = courseId };
        foreach (var p in restrictions.GetType().GetProperties()) body[p.Name] = p.GetValue(restrictions);
        var res = await admin.PostAsJsonAsync("/api/admin/coupons", body);
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        var c = (await res.Content.ReadFromJsonAsync<CouponDto>())!;
        Assert.Equal(HttpStatusCode.OK, (await admin2.PostAsJsonAsync($"/api/admin/coupons/{c.Id}/decision", new { decision = "Approve" })).StatusCode);
        return c;
    }

    [Fact]
    public async Task Scholarship_email_restriction_matches_regardless_of_case_and_legacy_rows()
    {
        var seed = await fx.SeedCourse(30m);
        var tag = Guid.NewGuid().ToString("N")[..8];
        var (_, eligible) = await RealUser($"Ada.{tag}@Example.org");
        var (_, other) = await RealUser($"bob.{tag}@example.org");
        var c = await ApprovedScholarship(seed.Course.Id, new { allowedEmails = new[] { $"  ADA.{tag}@EXAMPLE.ORG " } });
        Assert.Equal([$"ada.{tag}@example.org"], c.AllowedEmails); // stored lower-case and trimmed

        Assert.Equal("coupon_not_eligible", await Kit.ErrorCode(await other.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, couponCode = c.Code })));
        var q = await (await eligible.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, couponCode = c.Code })).Content.ReadFromJsonAsync<QuoteDto>();
        Assert.Equal(0m, q!.Amount);

        // Rows written before the fix were upper-case: they must still match.
        await fx.Db(async d =>
        {
            var row = await d.Set<Coupon>().FirstAsync(x => x.Id == c.Id);
            row.AllowedEmails = $"ADA.{tag}@EXAMPLE.ORG";
            await d.SaveChangesAsync();
        });
        var co = await Kit.Checkout(eligible, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = c.Code });
        Assert.Equal("Paid", co.Status);
    }

    [Fact]
    public async Task Scholarship_domain_restriction_matches_case_insensitively_and_idn_domains()
    {
        var seed = await fx.SeedCourse(30m);
        var tag = Guid.NewGuid().ToString("N")[..8];
        var (_, uni) = await RealUser($"x{tag}@Uni-{tag}.edu");
        var (_, idn) = await RealUser($"y{tag}@bücher-{tag}.example");
        var (_, outsider) = await RealUser($"z{tag}@elsewhere.edu");
        var c = await ApprovedScholarship(seed.Course.Id, new { allowedDomains = new[] { $"@UNI-{tag}.EDU", $"BÜCHER-{tag}.example" } });
        Assert.Contains($"uni-{tag}.edu", c.AllowedDomains);
        Assert.Contains(c.AllowedDomains, d => d.StartsWith("xn--")); // IDN stored as punycode

        Assert.Equal("Paid", (await Kit.Checkout(uni, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = c.Code })).Status);
        Assert.Equal("Paid", (await Kit.Checkout(idn, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = c.Code })).Status);
        Assert.Equal("coupon_not_eligible", await Kit.ErrorCode(await outsider.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, couponCode = c.Code })));

        // Legacy upper-case domain rows still match.
        await fx.Db(async d => { var row = await d.Set<Coupon>().FirstAsync(x => x.Id == c.Id); row.AllowedDomains = $"UNI-{tag}.EDU"; await d.SaveChangesAsync(); });
        var (_, uni2) = await RealUser($"w{tag}@uni-{tag}.edu");
        Assert.Equal(0m, (await (await uni2.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, couponCode = c.Code })).Content.ReadFromJsonAsync<QuoteDto>())!.Amount);
    }

    [Fact]
    public async Task Public_currency_list_shows_base_and_approved_regional_prices_only()
    {
        var seed = await fx.SeedCourse(50m);
        var owner = fx.Client(seed.Owner);
        var (_, admin) = await fx.User(Roles.Admin);
        var eur = (await (await owner.PostAsJsonAsync($"/api/studio/packages/{seed.Package.Id}/prices", new { currency = "EUR", amount = 45 })).Content.ReadFromJsonAsync<PackagePriceDto>())!;
        await owner.PostAsJsonAsync($"/api/studio/packages/{seed.Package.Id}/prices", new { currency = "GBP", amount = 40 }); // stays Proposed
        Assert.Equal(HttpStatusCode.OK, (await admin.PostAsJsonAsync($"/api/admin/package-prices/{eur.Id}/decision", new { decision = "Approve" })).StatusCode);

        var anon = fx.Client();
        var list = (await anon.GetFromJsonAsync<List<CurrencyOptionDto>>($"/api/commerce/currencies?packageId={seed.Package.Id}"))!;
        Assert.Contains(list, x => x.Currency == "USD" && x.IsBase && x.Amount == 50m);
        Assert.Contains(list, x => x.Currency == "EUR" && !x.IsBase && x.Amount == 45m);
        Assert.DoesNotContain(list, x => x.Currency == "GBP");
        var byCourse = (await anon.GetFromJsonAsync<List<CurrencyOptionDto>>($"/api/commerce/currencies?courseId={seed.Course.Id}"))!;
        Assert.Equal(list.Count, byCourse.Count);
        Assert.Equal(HttpStatusCode.BadRequest, (await anon.GetAsync("/api/commerce/currencies")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/commerce/currencies?packageId={Guid.NewGuid()}")).StatusCode);
    }

    [Fact]
    public async Task Orders_flag_gifts_with_status()
    {
        var seed = await fx.SeedCourse(25m);
        var (_, buyer) = await fx.User(Roles.Student);
        var gift = await Kit.Pay(fx, buyer, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), gift = new { message = "Enjoy" } });
        var own = await Kit.Pay(fx, buyer, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var orders = (await buyer.GetFromJsonAsync<List<OrderDto>>("/api/me/orders"))!;
        var g = orders.Single(o => o.Id == gift.OrderId);
        Assert.True(g.IsGift); Assert.Equal("Active", g.GiftStatus); Assert.False(g.GiftCodeRevealed);
        var o2 = orders.Single(o => o.Id == own.OrderId);
        Assert.False(o2.IsGift); Assert.Null(o2.GiftStatus);
        await buyer.GetAsync($"/api/me/orders/{gift.OrderId}/gift-code");
        Assert.True((await buyer.GetFromJsonAsync<List<OrderDto>>("/api/me/orders"))!.Single(o => o.Id == gift.OrderId).GiftCodeRevealed);
    }

    [Fact]
    public async Task Admin_bundle_list_can_include_inactive_bundles()
    {
        var a = await fx.SeedCourse(30m);
        var b = await fx.SeedCourse(10m);
        var (_, admin) = await fx.User(Roles.Admin);
        var catId = await fx.Db(async d => { var c = new Category { Slug = "cat-" + Guid.NewGuid().ToString("N")[..8], NameEn = "Cat", NameAr = "Cat" }; d.Categories.Add(c); await d.SaveChangesAsync(); return c.Id; });
        var bundle = (await (await admin.PostAsJsonAsync("/api/admin/bundles", new { title = "Inactive bundle", description = "x", kind = "Category", categoryId = catId, price = 20, currency = "USD", packageIds = new[] { a.Package.Id, b.Package.Id } })).Content.ReadFromJsonAsync<BundleDto>())!;
        Assert.Equal(HttpStatusCode.OK, (await admin.PostAsJsonAsync($"/api/admin/bundles/{bundle.Id}/status", new { active = false })).StatusCode);
        Assert.DoesNotContain((await admin.GetFromJsonAsync<List<BundleDto>>("/api/admin/bundles"))!, x => x.Id == bundle.Id);
        Assert.Contains((await admin.GetFromJsonAsync<List<BundleDto>>("/api/admin/bundles?includeInactive=true"))!, x => x.Id == bundle.Id && x.Status == "Inactive");
        var (_, student) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.GetAsync("/api/admin/bundles?includeInactive=true")).StatusCode);
    }

    [Fact]
    public async Task Studio_policy_exposes_instructor_limits()
    {
        var (_, instructor) = await fx.User(Roles.Instructor);
        var p = (await instructor.GetFromJsonAsync<CommercePolicyDto>("/api/studio/commerce/policy"))!;
        Assert.Equal(50m, p.InstructorCouponMaxPercent);
        Assert.Equal(30, p.RefundWindowDays);
        Assert.Equal(10m, p.PayoutMinimumAmount);
        var (_, student) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.GetAsync("/api/studio/commerce/policy")).StatusCode);
    }

    [Fact]
    public async Task Invoice_pdf_renders_from_seller_snapshot_and_falls_back_to_config()
    {
        var seed = await fx.SeedCourse(20m);
        var (student, client) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var co2 = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var invoices = (await client.GetFromJsonAsync<List<InvoiceDto>>("/api/me/invoices"))!;
        var inv = invoices.Single(i => i.OrderId == co.OrderId);
        var inv2 = invoices.Single(i => i.OrderId == co2.OrderId);
        var snap = await fx.Db(d => d.Set<InvoiceSellerSnapshot>().AsNoTracking().FirstAsync(s => s.InvoiceId == inv.Id));
        Assert.Equal("Mastemy Test Ltd", snap.Name); Assert.Equal("TX-123", snap.TaxId);

        // inv2 simulates a document issued before snapshots existed.
        await fx.Db(async d => { d.Set<InvoiceSellerSnapshot>().Remove(await d.Set<InvoiceSellerSnapshot>().FirstAsync(s => s.InvoiceId == inv2.Id)); await d.SaveChangesAsync(); });
        Assert.Equal(HttpStatusCode.OK, (await client.GetAsync($"/api/me/invoices/{inv2.Id}/pdf")).StatusCode); // config fallback

        // With seller configuration removed, the snapshot still renders; the legacy document cannot.
        await using var unconfigured = fx.Factory.WithWebHostBuilder(b => b.UseSetting("Invoice:SellerName", ""));
        var c2 = fx.Client(student, unconfigured);
        Assert.Equal(HttpStatusCode.OK, (await c2.GetAsync($"/api/me/invoices/{inv.Id}/pdf")).StatusCode);
        Assert.Equal(HttpStatusCode.ServiceUnavailable, (await c2.GetAsync($"/api/me/invoices/{inv2.Id}/pdf")).StatusCode);
    }

    [Fact]
    public async Task Reconciliation_reports_platform_only_revenue_without_flagging_it()
    {
        var seed = await fx.SeedCourse(13m);
        await fx.Db(async d =>
        {
            foreach (var ci in await d.CourseInstructors.Where(c => c.CourseId == seed.Course.Id).ToListAsync()) ci.RevenueSharePercent = 0;
            await d.SaveChangesAsync();
        });
        var (_, client) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        Assert.Empty(await fx.LedgerForOrder(co.OrderId));
        var (_, finance) = await fx.User(Roles.Finance);
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var row = (await finance.GetFromJsonAsync<ReconciliationDto>($"/api/admin/reconciliation?from={today:yyyy-MM-dd}&to={today:yyyy-MM-dd}"))!.Rows.Single(r => r.Currency == "USD");
        Assert.True(row.PlatformOnlyPayments >= 13m);
        Assert.Equal(0m, row.SalesDifference);
        Assert.Equal("ok", row.Status);
    }
}
