using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Commerce;

/// <summary>Regression tests: coupon usage-limit race and gift restrictions.</summary>
public class CouponRaceTests(CommerceFixture fx) : IClassFixture<CommerceFixture>
{
    private static string Code() => "R" + Guid.NewGuid().ToString("N")[..10];

    private async Task<CouponDto> StaffCoupon(object body)
    {
        var (_, admin) = await fx.User(Roles.Admin);
        var res = await admin.PostAsJsonAsync("/api/admin/coupons", body);
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        return (await res.Content.ReadFromJsonAsync<CouponDto>())!;
    }

    [Fact]
    public async Task Ten_parallel_checkouts_with_single_use_100_percent_coupon_yield_exactly_one_paid_order()
    {
        var seed = await fx.SeedCourse(20m);
        var code = Code();
        var coupon = await StaffCoupon(new { code, kind = "Fixed", amountOff = 20, currency = "USD", scope = "All", maxRedemptions = 1 });
        var clients = new List<HttpClient>();
        for (var i = 0; i < 10; i++) clients.Add((await fx.User(Roles.Student)).Client);

        using var gate = new SemaphoreSlim(0);
        var tasks = clients.Select(async c =>
        {
            await gate.WaitAsync();
            return await c.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = code });
        }).ToList();
        gate.Release(clients.Count);
        var results = await Task.WhenAll(tasks);

        var ok = results.Where(r => r.StatusCode == HttpStatusCode.OK).ToList();
        Assert.Single(ok);
        Assert.Equal("Paid", (await ok[0].Content.ReadFromJsonAsync<CheckoutResponse>())!.Status);
        foreach (var r in results.Where(r => r.StatusCode != HttpStatusCode.OK))
            Assert.Equal("coupon_exhausted", await Kit.ErrorCode(r));
        Assert.Equal(1, await fx.Db(d => (from o in d.Orders join det in d.Set<OrderDetail>() on o.Id equals det.OrderId
                                          where det.CouponId == coupon.Id && o.Status == OrderStatus.Paid select o).CountAsync()));
        Assert.Equal(1, await fx.Db(d => d.Entitlements.CountAsync(e => e.CourseId == seed.Course.Id)));
    }

    [Fact]
    public async Task Gift_purchases_reject_free_and_staff_percent_coupons_unless_allowed()
    {
        var seed = await fx.SeedCourse(20m);
        var (_, buyer) = await fx.User(Roles.Student);
        var free = Code();
        await StaffCoupon(new { code = free, kind = "Fixed", amountOff = 20, currency = "USD", scope = "All", maxRedemptions = 5 });
        var pct = Code();
        await StaffCoupon(new { code = pct, kind = "Percent", percentOff = 50, scope = "All" });
        var allowed = Code();
        await StaffCoupon(new { code = allowed, kind = "Percent", percentOff = 50, scope = "All", allowsGifts = true });

        object Body(string c) => new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = c, gift = new { recipientEmail = "friend@example.com" } };
        Assert.Equal("coupon_gift_not_allowed", await Kit.ErrorCode(await buyer.PostAsJsonAsync("/api/checkout", Body(free))));
        Assert.Equal("coupon_gift_not_allowed", await Kit.ErrorCode(await buyer.PostAsJsonAsync("/api/checkout", Body(pct))));
        var co = await Kit.Checkout(buyer, Body(allowed));
        Assert.Equal(10m, co.Amount);
        // Same coupons still work for non-gift purchases.
        var self = await Kit.Checkout(buyer, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = pct });
        Assert.Equal(10m, self.Amount);

        // Only staff may allow gifts.
        var (instructor, ic) = (seed.Owner, fx.Client(seed.Owner));
        var res = await ic.PostAsJsonAsync("/api/studio/coupons", new { code = Code(), kind = "Percent", percentOff = 10, scope = "Course", scopeId = seed.Course.Id, allowsGifts = true });
        Assert.Equal(HttpStatusCode.Forbidden, res.StatusCode);
        _ = instructor;
    }
}

/// <summary>Regression tests: subscription pool cannot be gamed by repeated consumption, authors, staff or refunded subscribers.</summary>
public class PoolGamingTests(CommerceFixture fx) : IClassFixture<CommerceFixture>
{
    private static long Unix(DateTime t) => new DateTimeOffset(t).ToUnixTimeSeconds();

    private async Task<PlanDto> Plan()
    {
        var (_, admin) = await fx.User(Roles.Admin);
        var res = await admin.PostAsJsonAsync("/api/admin/plans", new
        {
            code = "P" + Guid.NewGuid().ToString("N")[..8], name = "Premium", scope = "AllCourses", price = 20m, currency = "USD", interval = "month",
            aiAllowance = 200, includedServices = "Premium notes, all MCQ banks, mock exams",
        });
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        return (await res.Content.ReadFromJsonAsync<PlanDto>())!;
    }

    private async Task<(User User, Guid SubscriptionId)> Subscribe(PlanDto plan, DateTime paidAt, DateTime entStart, params string[] roles)
    {
        var (user, client) = await fx.User(roles.Length == 0 ? [Roles.Student] : roles);
        var res = await client.PostAsJsonAsync("/api/subscriptions/checkout", new { planId = plan.Id, idempotencyKey = Kit.Key() });
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        var co = (await res.Content.ReadFromJsonAsync<SubscriptionCheckoutResponse>())!;
        var providerId = "sub_" + Guid.NewGuid().ToString("N")[..12];
        var md = new { subscription_id = co.SubscriptionId.ToString() };
        await Kit.WebhookOk(fx, Kit.Event("checkout.session.completed",
            new { id = "cs_sub_" + co.SubscriptionId, mode = "subscription", subscription = providerId, customer = "cus_1", payment_status = "paid", metadata = md }));
        var periodEnd = DateTimeOffset.FromUnixTimeSeconds(Unix(DateTime.UtcNow.AddDays(30))).UtcDateTime;
        await Kit.WebhookOk(fx, Kit.Event("customer.subscription.created",
            new { id = providerId, status = "active", customer = "cus_1", cancel_at_period_end = false, current_period_start = Unix(DateTime.UtcNow), current_period_end = Unix(periodEnd), metadata = md }));
        var invoiceId = "in_" + Guid.NewGuid().ToString("N")[..10];
        await Kit.WebhookOk(fx, Kit.Event("invoice.paid", new
        {
            id = invoiceId, subscription = providerId, amount_paid = 2000L, currency = "usd", payment_intent = "pi_" + invoiceId,
            lines = new { data = new[] { new { period = new { start = Unix(periodEnd.AddDays(-30)), end = Unix(periodEnd) } } } },
        }));
        await fx.Db(async d =>
        {
            await d.Set<SubscriptionInvoice>().Where(x => x.ProviderInvoiceId == invoiceId).ExecuteUpdateAsync(s => s.SetProperty(x => x.PaidAt, paidAt));
            var entIds = d.Set<SubscriptionEntitlement>().Where(x => x.SubscriptionId == co.SubscriptionId).Select(x => x.EntitlementId);
            await d.Entitlements.Where(e => entIds.Contains(e.Id)).ExecuteUpdateAsync(s => s.SetProperty(e => e.StartsAt, entStart));
        });
        return (user, co.SubscriptionId);
    }

    [Fact]
    public async Task Five_thousand_downloads_by_one_subscriber_are_capped_and_excluded_users_count_nothing()
    {
        var course = await fx.SeedCourse();
        var plan = await Plan();
        var now = DateTime.UtcNow;
        var prevStart = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(-1);
        var mid = prevStart.AddDays(10);
        var gamer = await Subscribe(plan, mid, prevStart);
        var staff = await Subscribe(plan, mid, prevStart, Roles.Student, Roles.Support);
        var refunded = await Subscribe(plan, mid, prevStart);
        var author = await Subscribe(plan, mid, prevStart, Roles.Instructor);
        await fx.Db(async d =>
        {
            d.CourseInstructors.Add(new CourseInstructor { CourseId = course.Course.Id, UserId = author.User.Id, Role = CourseInstructorRole.CoInstructor, RevenueSharePercent = 0 });
            // Refund of the refunded subscriber's subscription payment, decided in the month.
            var orderId = await d.Set<SubscriptionInvoice>().Where(x => x.SubscriptionId == refunded.SubscriptionId).Select(x => x.OrderId).FirstAsync();
            d.Refunds.Add(new Refund { OrderId = orderId, Amount = 20m, Reason = "test", Status = "Completed", RequestedBy = refunded.User.Id, DecidedAt = mid.AddDays(1) });
            await d.SaveChangesAsync();
        });

        // 5000 downloads by one subscriber: 50 resources x 100 repeats spread over 5 days -> 250 distinct units before the cap.
        var resources = Enumerable.Range(0, 50).Select(_ => Guid.NewGuid()).ToList();
        await fx.Db(async d =>
        {
            for (var i = 0; i < 5000; i++)
                d.Set<ConsumptionEvent>().Add(new ConsumptionEvent { UserId = gamer.User.Id, CourseId = course.Course.Id, Kind = "PremiumDownload", RefId = resources[i % 50], OccurredAt = mid.AddDays(i % 5).AddSeconds(i) });
            foreach (var u in new[] { staff.User.Id, refunded.User.Id, author.User.Id })
                for (var i = 0; i < 20; i++)
                    d.Set<ConsumptionEvent>().Add(new ConsumptionEvent { UserId = u, CourseId = course.Course.Id, Kind = "PremiumDownload", RefId = Guid.NewGuid(), OccurredAt = mid.AddHours(i) });
            await d.SaveChangesAsync();
        });

        var (_, finance) = await fx.User(Roles.Finance);
        var res = await finance.PostAsJsonAsync("/api/admin/subscription-pool/allocate", new { year = prevStart.Year, month = prevStart.Month });
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        var alloc = (await res.Content.ReadFromJsonAsync<List<PoolAllocationDto>>())!.Single(x => x.Currency == "USD");
        Assert.Equal(30, alloc.TotalUnits); // default Subscriptions:MaxUnitsPerSubscriberPerCourse; staff/refunded/author contribute 0
        Assert.Equal(30, alloc.Lines.Single(l => l.CourseId == course.Course.Id).Units);
    }

    [Fact]
    public async Task Recorder_dedupes_on_resource_and_day_and_skips_authors_and_staff()
    {
        var course = await fx.SeedCourse();
        var (student, _) = await fx.User(Roles.Student);
        var (support, _) = await fx.User(Roles.Support);
        var resource = Guid.NewGuid();
        using (var scope = fx.Factory.Services.CreateScope())
        {
            var rec = scope.ServiceProvider.GetRequiredService<ConsumptionRecorder>();
            for (var i = 0; i < 25; i++) await rec.RecordPremiumDownload(student.Id, course.Course.Id, resource);
            await rec.RecordPremiumDownload(course.Owner.Id, course.Course.Id, resource);
            await rec.RecordPremiumDownload(support.Id, course.Course.Id, resource);
        }
        Assert.Equal(1, await fx.Db(d => d.Set<ConsumptionEvent>().CountAsync(c => c.RefId == resource)));
        Assert.Equal(student.Id, await fx.Db(d => d.Set<ConsumptionEvent>().Where(c => c.RefId == resource).Select(c => c.UserId).FirstAsync()));
    }
}
