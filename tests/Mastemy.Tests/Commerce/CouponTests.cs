using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Commerce;

public class CouponTests(CommerceFixture fx) : IClassFixture<CommerceFixture>
{
    private static string Code() => "C" + Guid.NewGuid().ToString("N")[..10];

    private async Task<CouponDto> StaffCoupon(object body)
    {
        var (_, admin) = await fx.User(Roles.Admin);
        var res = await admin.PostAsJsonAsync("/api/admin/coupons", body);
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        return (await res.Content.ReadFromJsonAsync<CouponDto>())!;
    }

    [Fact]
    public async Task Percent_coupon_is_case_insensitive_validated_server_side_and_redeemed_once()
    {
        var seed = await fx.SeedCourse(40m);
        var code = Code();
        var coupon = await StaffCoupon(new { code, kind = "Percent", percentOff = 25, scope = "Course", scopeId = seed.Course.Id, maxRedemptions = 10, maxPerUser = 1 });
        var (buyer, client) = await fx.User(Roles.Student);

        var quote = await (await client.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, couponCode = code.ToLowerInvariant() })).Content.ReadFromJsonAsync<QuoteDto>();
        Assert.Equal(30m, quote!.Amount);
        Assert.True(quote.CouponApplied);

        var co = await Kit.Checkout(client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = code.ToLowerInvariant() });
        Assert.Equal(30m, co.Amount);
        Assert.Equal(10m, co.Discount);
        Assert.Contains(fx.Stripe.Requests, r => r.Path == "/v1/checkout/sessions" && r.Body.Contains("unit_amount%5D=3000"));

        // Paid webhook delivered twice: one redemption only.
        var json = Kit.Event("checkout.session.completed", Kit.Completed(co.OrderId, 30m));
        Assert.Equal("paid", (await Kit.WebhookOk(fx, json)).Status);
        Assert.Equal("duplicate", (await Kit.WebhookOk(fx, json)).Status);
        Assert.Equal(1, await fx.Db(d => d.Set<CouponRedemption>().CountAsync(r => r.CouponId == coupon.Id)));
        var red = await fx.Db(d => d.Set<CouponRedemption>().SingleAsync(r => r.CouponId == coupon.Id));
        Assert.Equal(buyer.Id, red.UserId);
        Assert.Equal(10m, red.DiscountAmount);

        // Per-user limit reached.
        var again = await client.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = code });
        Assert.Equal(HttpStatusCode.BadRequest, again.StatusCode);
        Assert.Equal("coupon_already_used", await Kit.ErrorCode(again));
    }

    [Fact]
    public async Task Total_usage_limit_counts_pending_reservations()
    {
        var seed = await fx.SeedCourse(20m);
        var code = Code();
        await StaffCoupon(new { code, kind = "Fixed", amountOff = 5, currency = "USD", scope = "All", maxRedemptions = 1 });
        var (_, a) = await fx.User(Roles.Student);
        var (_, b) = await fx.User(Roles.Student);
        var first = await Kit.Checkout(a, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = code });
        Assert.Equal(15m, first.Amount);
        var second = await b.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = code });
        Assert.Equal("coupon_exhausted", await Kit.ErrorCode(second));
    }

    [Fact]
    public async Task Coupon_rules_expiry_min_amount_currency_scope_and_codes_unique()
    {
        var seed = await fx.SeedCourse(20m);
        var other = await fx.SeedCourse(20m);
        var (_, client) = await fx.User(Roles.Student);
        async Task<string> Try(string code) => await Kit.ErrorCode(await client.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, couponCode = code }));

        var expired = Code();
        await StaffCoupon(new { code = expired, kind = "Percent", percentOff = 10, scope = "All", startsAt = DateTime.UtcNow.AddDays(-10), expiresAt = DateTime.UtcNow.AddDays(-1) });
        Assert.Equal("coupon_expired", await Try(expired));

        var future = Code();
        await StaffCoupon(new { code = future, kind = "Percent", percentOff = 10, scope = "All", startsAt = DateTime.UtcNow.AddDays(1) });
        Assert.Equal("coupon_not_started", await Try(future));

        var min = Code();
        await StaffCoupon(new { code = min, kind = "Percent", percentOff = 10, scope = "All", minAmount = 50, currency = "USD" });
        Assert.Equal("coupon_min_amount", await Try(min));

        var eur = Code();
        await StaffCoupon(new { code = eur, kind = "Fixed", amountOff = 5, currency = "EUR", scope = "All" });
        Assert.Equal("coupon_currency_mismatch", await Try(eur));

        var scoped = Code();
        await StaffCoupon(new { code = scoped, kind = "Percent", percentOff = 10, scope = "Course", scopeId = other.Course.Id });
        Assert.Equal("coupon_not_applicable", await Try(scoped));

        Assert.Equal("coupon_invalid", await Try("NOPE" + Guid.NewGuid().ToString("N")[..6]));

        var (_, admin) = await fx.User(Roles.Admin);
        var dup = await admin.PostAsJsonAsync("/api/admin/coupons", new { code = scoped.ToLowerInvariant(), kind = "Percent", percentOff = 10, scope = "All" });
        Assert.Equal(HttpStatusCode.Conflict, dup.StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await admin.PostAsJsonAsync("/api/admin/coupons", new { code = Code(), kind = "Percent", percentOff = 100, scope = "All" })).StatusCode);
        Assert.True(await Kit.Audits(fx, "coupon.created") >= 5);
    }

    [Fact]
    public async Task Instructor_coupons_are_limited_to_own_courses_and_policy_and_authors_cannot_self_use()
    {
        var seed = await fx.SeedCourse(40m);
        var owner = fx.Client(seed.Owner);
        var tooBig = await owner.PostAsJsonAsync("/api/studio/coupons", new { code = Code(), kind = "Percent", percentOff = 60, scope = "Course", scopeId = seed.Course.Id });
        Assert.Equal("coupon_exceeds_policy", await Kit.ErrorCode(tooBig));
        var fixedTooBig = await owner.PostAsJsonAsync("/api/studio/coupons", new { code = Code(), kind = "Fixed", amountOff = 30, currency = "USD", scope = "Package", scopeId = seed.Package.Id });
        Assert.Equal("coupon_exceeds_policy", await Kit.ErrorCode(fixedTooBig));
        Assert.Equal(HttpStatusCode.Forbidden, (await owner.PostAsJsonAsync("/api/studio/coupons", new { code = Code(), kind = "Percent", percentOff = 10, scope = "All" })).StatusCode);

        var (_, stranger) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PostAsJsonAsync("/api/studio/coupons", new { code = Code(), kind = "Percent", percentOff = 10, scope = "Course", scopeId = seed.Course.Id })).StatusCode);
        var (_, student) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.PostAsJsonAsync("/api/studio/coupons", new { code = Code(), kind = "Percent", percentOff = 10, scope = "Course", scopeId = seed.Course.Id })).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.PostAsJsonAsync("/api/admin/coupons", new { code = Code(), kind = "Percent", percentOff = 10, scope = "All" })).StatusCode);

        var code = Code();
        var ok = await owner.PostAsJsonAsync("/api/studio/coupons", new { code, kind = "Percent", percentOff = 50, scope = "Course", scopeId = seed.Course.Id });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        Assert.False((await ok.Content.ReadFromJsonAsync<CouponDto>())!.CreatedByStaff);

        // Anti-abuse: the co-instructor (a course author) cannot use any coupon on this course.
        var self = await fx.Client(seed.CoInstructor).PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = code });
        Assert.Equal("coupon_self_use", await Kit.ErrorCode(self));

        var co = await Kit.Checkout(student, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = code });
        Assert.Equal(20m, co.Amount);
        var mine = await owner.GetFromJsonAsync<List<CouponDto>>("/api/studio/coupons");
        Assert.Single(mine!);
    }

    [Fact]
    public async Task Scholarship_requires_second_person_approval_and_restricted_recipients_get_free_access()
    {
        var seed = await fx.SeedCourse(30m);
        var (adminUser, admin) = await fx.User(Roles.Admin);
        var (_, admin2) = await fx.User(Roles.Admin);
        var (eligible, eligibleClient) = await fx.User(Roles.Student);
        var (_, other) = await fx.User(Roles.Student);
        var code = Code();
        var unrestricted = await admin.PostAsJsonAsync("/api/admin/coupons", new { code = Code(), kind = "Scholarship", scope = "Course", scopeId = seed.Course.Id });
        Assert.Equal("scholarship_unrestricted", await Kit.ErrorCode(unrestricted));

        var res = await admin.PostAsJsonAsync("/api/admin/coupons", new { code, kind = "Scholarship", scope = "Course", scopeId = seed.Course.Id, allowedEmails = new[] { eligible.Email } });
        var coupon = (await res.Content.ReadFromJsonAsync<CouponDto>())!;
        Assert.Equal("PendingApproval", coupon.Status);
        Assert.Equal("coupon_invalid", await Kit.ErrorCode(await eligibleClient.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, couponCode = code })));

        Assert.Equal(HttpStatusCode.Forbidden, (await admin.PostAsJsonAsync($"/api/admin/coupons/{coupon.Id}/decision", new { decision = "Approve" })).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await admin2.PostAsJsonAsync($"/api/admin/coupons/{coupon.Id}/decision", new { decision = "Approve" })).StatusCode);

        Assert.Equal("coupon_not_eligible", await Kit.ErrorCode(await other.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = code })));

        var before = fx.Stripe.Requests.Count;
        var co = await Kit.Checkout(eligibleClient, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), couponCode = code });
        Assert.Equal("Paid", co.Status);
        Assert.Null(co.CheckoutUrl);
        Assert.Equal(0m, co.Amount);
        Assert.Equal(before, fx.Stripe.Requests.Count); // no provider call for a free order
        Assert.True(await fx.Db(d => d.Entitlements.AnyAsync(e => e.UserId == eligible.Id && e.OrderId == co.OrderId && e.RevokedAt == null)));
        Assert.Equal(1, await fx.Db(d => d.Set<CouponRedemption>().CountAsync(r => r.OrderId == co.OrderId)));
        Assert.Empty(await fx.LedgerForOrder(co.OrderId));
        Assert.False(await fx.Db(d => d.Payments.AnyAsync(p => p.OrderId == co.OrderId)));
        Assert.True(await fx.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "coupon.decision" && a.EntityId == coupon.Id.ToString())));
    }

    [Fact]
    public async Task Coupon_does_not_stack_with_a_running_offer()
    {
        var seed = await fx.SeedCourse(100m);
        await fx.Db(async d =>
        {
            d.Set<PriceHistory>().Add(new PriceHistory { PackageId = seed.Package.Id, Currency = "USD", Amount = 100m, EffectiveFrom = DateTime.UtcNow.AddDays(-60) });
            var promo = new Promotion { Name = "Spring", PercentOff = 30, StartsAt = DateTime.UtcNow.AddHours(-1), EndsAt = DateTime.UtcNow.AddDays(3), CreatedBy = seed.Owner.Id };
            d.Set<Promotion>().Add(promo);
            d.Set<PromotionParticipation>().Add(new PromotionParticipation { PromotionId = promo.Id, PackageId = seed.Package.Id, OptedInBy = seed.Owner.Id });
            await d.SaveChangesAsync();
        });
        var small = Code(); var big = Code();
        await StaffCoupon(new { code = small, kind = "Percent", percentOff = 10, scope = "All" });
        await StaffCoupon(new { code = big, kind = "Percent", percentOff = 50, scope = "All" });
        var (_, client) = await fx.User(Roles.Student);
        Assert.Equal("coupon_does_not_stack", await Kit.ErrorCode(await client.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, couponCode = small })));
        var q = (await (await client.PostAsJsonAsync("/api/checkout/quote", new { packageId = seed.Package.Id, couponCode = big })).Content.ReadFromJsonAsync<QuoteDto>())!;
        Assert.Equal(50m, q.Amount); // 50% of the regular price, not 50% of the sale price
        Assert.Equal("Coupon", q.PriceSource);
        Assert.Null(q.OfferEndsAt);
    }

    [Fact]
    public async Task Editor_co_instructors_cannot_change_pricing()
    {
        var seed = await fx.SeedCourse(40m);
        var (editor, editorClient) = await fx.User(Roles.Instructor);
        await fx.Db(async d => { d.CourseInstructors.Add(new CourseInstructor { CourseId = seed.Course.Id, UserId = editor.Id, Role = CourseInstructorRole.Editor }); await d.SaveChangesAsync(); });
        Assert.Equal("editor_scope", await Kit.ErrorCode(await editorClient.PostAsJsonAsync("/api/studio/coupons", new { code = Code(), kind = "Percent", percentOff = 10, scope = "Course", scopeId = seed.Course.Id })));
        Assert.Equal("editor_scope", await Kit.ErrorCode(await editorClient.PostAsJsonAsync($"/api/studio/packages/{seed.Package.Id}/prices", new { currency = "EUR", amount = 30 })));
        Assert.Equal("editor_scope", await Kit.ErrorCode(await editorClient.PostAsJsonAsync($"/api/studio/courses/{seed.Course.Id}/referral-codes", new { })));
        Assert.Equal("editor_scope", await Kit.ErrorCode(await editorClient.PostAsJsonAsync($"/api/studio/courses/{seed.Course.Id}/packages",
            new { title = "Exam prep", contents = "Mock exams", price = 20, currency = "USD", accessDays = 30 })));
    }
}
