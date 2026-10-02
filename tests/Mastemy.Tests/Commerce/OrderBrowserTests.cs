using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;

namespace Mastemy.Tests.Commerce;

/// <summary>Staff/finance order browser and the Support role's masked, read-only order lookup.</summary>
public class OrderBrowserTests(CommerceFixture fx) : IClassFixture<CommerceFixture>
{
    private static readonly System.Text.Json.JsonSerializerOptions J = new(System.Text.Json.JsonSerializerDefaults.Web)
    { Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() } };
    private readonly string PayId = "pi_3N" + Guid.NewGuid().ToString("N")[..10] + "WXYZ";

    private async Task<(User Buyer, Order Paid, Order Pending, Coupon Coupon, CommerceFixture.SeededCourse Seed)> Seed()
    {
        var seed = await fx.SeedCourse();
        var email = $"buyer{Guid.NewGuid():N}@example.com";
        var buyer = new User { Email = email, NormalizedEmail = email, DisplayName = "Buyer", PasswordHash = "x" };
        var coupon = new Coupon { Code = "SAVE" + Guid.NewGuid().ToString("N")[..6].ToUpperInvariant() };
        coupon.NormalizedCode = coupon.Code.ToUpperInvariant();
        var paid = new Order { UserId = buyer.Id, Status = OrderStatus.PartiallyRefunded, Total = 40m, Currency = "EUR", IdempotencyKey = Guid.NewGuid().ToString(),
            CreatedAt = new DateTime(2026, 3, 10, 12, 0, 0, DateTimeKind.Utc), PaidAt = new DateTime(2026, 3, 10, 12, 1, 0, DateTimeKind.Utc) };
        paid.Items.Add(new OrderItem { OrderId = paid.Id, PackageId = seed.Package.Id, CourseId = seed.Course.Id, UnitPrice = 40m });
        var pending = new Order { UserId = buyer.Id, Status = OrderStatus.Pending, Total = 49.99m, Currency = "USD", IdempotencyKey = Guid.NewGuid().ToString(),
            CreatedAt = new DateTime(2026, 5, 1, 0, 0, 0, DateTimeKind.Utc) };
        await fx.Db(async d =>
        {
            d.Users.Add(buyer);
            d.Set<Coupon>().Add(coupon);
            d.Orders.AddRange(paid, pending);
            d.Set<CouponRedemption>().Add(new CouponRedemption { CouponId = coupon.Id, UserId = buyer.Id, OrderId = paid.Id, DiscountAmount = 9.99m, Currency = "EUR" });
            d.Set<OrderDetail>().Add(new OrderDetail { OrderId = paid.Id, ListAmount = 49.99m, DiscountAmount = 9.99m, PriceSource = "Coupon", CouponId = coupon.Id, RefundedAmount = 10m });
            d.Payments.Add(new Payment { OrderId = paid.Id, ProviderPaymentId = PayId, Amount = 40m, Currency = "EUR" });
            d.Refunds.Add(new Refund { OrderId = paid.Id, Amount = 10m, Reason = "partial", Status = "Completed", ProviderRefundId = "re_123" });
            d.Set<Invoice>().Add(new Invoice { Number = "INV-T-" + Guid.NewGuid().ToString("N")[..6], OrderId = paid.Id, UserId = buyer.Id, Currency = "EUR", Total = 40m, Year = 2026, Sequence = Random.Shared.NextInt64(1, long.MaxValue) });
            d.CommissionLedger.Add(new CommissionLedgerEntry { InstructorId = seed.Owner.Id, OrderId = paid.Id, CourseId = seed.Course.Id, GrossAmount = 40m, InstructorAmount = 24m, PlatformAmount = 16m, Currency = "EUR" });
            await d.SaveChangesAsync();
        });
        return (buyer, paid, pending, coupon, seed);
    }

    [Fact]
    public async Task Finance_and_staff_browse_filter_and_open_orders_others_cannot()
    {
        var s = await Seed();
        var (_, finance) = await fx.User(Roles.Finance);
        var (_, admin) = await fx.User(Roles.Admin);
        var (_, student) = await fx.User(Roles.Student);
        var (_, support) = await fx.User(Roles.Support);

        Assert.Equal(HttpStatusCode.Forbidden, (await student.GetAsync("/api/admin/orders")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await support.GetAsync("/api/admin/orders")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await support.GetAsync($"/api/admin/orders/{s.Paid.Id}")).StatusCode);

        var byEmail = (await finance.GetFromJsonAsync<OrderPage>($"/api/admin/orders?email={Uri.EscapeDataString(s.Buyer.Email.ToUpperInvariant())}", J))!;
        Assert.Equal(2, byEmail.Total);
        Assert.Equal(s.Pending.Id, byEmail.Items[0].Id); // newest first
        Assert.Equal(1, (await admin.GetFromJsonAsync<OrderPage>($"/api/admin/orders?email={s.Buyer.Email}&status=partiallyrefunded", J))!.Total);
        Assert.Equal(1, (await admin.GetFromJsonAsync<OrderPage>($"/api/admin/orders?email={s.Buyer.Email}&currency=eur", J))!.Total);
        var byCoupon = (await finance.GetFromJsonAsync<OrderPage>($"/api/admin/orders?coupon={s.Coupon.Code.ToLowerInvariant()}", J))!;
        Assert.Equal(s.Paid.Id, Assert.Single(byCoupon.Items).Id);
        Assert.Equal(s.Coupon.Code, byCoupon.Items[0].CouponCode);
        Assert.Equal(1, (await finance.GetFromJsonAsync<OrderPage>($"/api/admin/orders?courseId={s.Seed.Course.Id}", J))!.Total);
        Assert.Equal(1, (await finance.GetFromJsonAsync<OrderPage>($"/api/admin/orders?email={s.Buyer.Email}&from=2026-03-01T00:00:00Z&to=2026-03-31T00:00:00Z", J))!.Total);
        var paged = (await finance.GetFromJsonAsync<OrderPage>($"/api/admin/orders?email={s.Buyer.Email}&page=2&pageSize=1", J))!;
        Assert.Equal((2, 1), (paged.Total, paged.Items.Count));
        Assert.Equal(s.Paid.Id, paged.Items[0].Id);

        foreach (var bad in new[] { "status=Nope", "currency=EURO", "pageSize=101", "page=0", "from=2026-04-01&to=2026-03-01" })
            Assert.Equal(HttpStatusCode.BadRequest, (await finance.GetAsync("/api/admin/orders?" + bad)).StatusCode);

        var d = (await finance.GetFromJsonAsync<AdminOrderDetailDto>($"/api/admin/orders/{s.Paid.Id}", J))!;
        Assert.Equal(s.Seed.Course.Title, Assert.Single(d.Items).CourseTitle);
        Assert.Equal(PayId, Assert.Single(d.Payments).ProviderPaymentId); // finance sees full ids
        Assert.Single(d.Refunds);
        Assert.Single(d.Invoices);
        Assert.Equal(24m, Assert.Single(d.Ledger).InstructorAmount);
        Assert.Equal(49.99m, d.ListAmount);
        Assert.Equal(HttpStatusCode.NotFound, (await finance.GetAsync($"/api/admin/orders/{Guid.NewGuid()}")).StatusCode);
    }

    [Fact]
    public async Task Support_looks_up_orders_by_email_or_id_with_masked_payment_ids_only()
    {
        var s = await Seed();
        var (_, support) = await fx.User(Roles.Support);
        Assert.Equal(HttpStatusCode.BadRequest, (await support.GetAsync("/api/support/orders")).StatusCode);

        var list = (await support.GetFromJsonAsync<List<SupportOrderDto>>($"/api/support/orders?email={s.Buyer.Email}", J))!;
        Assert.Equal(2, list.Count);
        var paid = list.Single(o => o.Id == s.Paid.Id);
        Assert.Equal("pi_…WXYZ", Assert.Single(paid.MaskedPaymentIds));
        Assert.DoesNotContain(s.Buyer.Email, paid.MaskedBuyerEmail);
        Assert.Equal(10m, Assert.Single(paid.Refunds).Amount);
        Assert.Single(paid.InvoiceNumbers);
        var raw = await (await support.GetAsync($"/api/support/orders?orderId={s.Paid.Id}")).Content.ReadAsStringAsync();
        Assert.DoesNotContain(PayId[..12], raw);
        Assert.DoesNotContain("InstructorAmount", raw, StringComparison.OrdinalIgnoreCase);

        // Read-only: Support cannot refund.
        Assert.Equal(HttpStatusCode.Forbidden, (await support.PostAsJsonAsync($"/api/admin/orders/{s.Paid.Id}/refunds", new { amount = 1m, reason = "x" })).StatusCode);

        Assert.Equal("pi_…WXYZ", OrderBrowserService.MaskPaymentId("pi_3NabcdefghijWXYZ"));
        Assert.Equal("…", OrderBrowserService.MaskPaymentId("abc"));
        Assert.Equal("", OrderBrowserService.MaskPaymentId(null));
    }
}
