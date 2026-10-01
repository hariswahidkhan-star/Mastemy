using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Commerce;

public class CommerceTests(CommerceFixture fx) : IClassFixture<CommerceFixture>
{
    private static string Key() => "idem-" + Guid.NewGuid().ToString("N");

    private async Task<HttpResponseMessage> PostWebhook(string json, string? signature = null)
    {
        var raw = Encoding.UTF8.GetBytes(json);
        var req = new HttpRequestMessage(HttpMethod.Post, "/api/webhooks/stripe") { Content = new ByteArrayContent(raw) };
        req.Content.Headers.ContentType = new("application/json");
        req.Headers.Add("Stripe-Signature", signature ?? StripeSignature.Header(raw, DateTimeOffset.UtcNow.ToUnixTimeSeconds(), CommerceFixture.WebhookSecret));
        return await fx.Client().SendAsync(req);
    }

    private static string CompletedEvent(string eventId, Guid orderId, long amountMinor, string currency = "usd", string paymentStatus = "paid") =>
        JsonSerializer.Serialize(new
        {
            id = eventId, type = "checkout.session.completed",
            data = new { @object = new {
                id = "cs_test_" + orderId, payment_status = paymentStatus, amount_total = amountMinor, currency,
                payment_intent = "pi_" + orderId.ToString("N"), client_reference_id = orderId.ToString(),
                metadata = new { order_id = orderId.ToString() } } },
        });

    private async Task<(CommerceFixture.SeededCourse Seed, User Buyer, HttpClient Client, Guid OrderId)> PaidOrder(decimal price = 49.99m)
    {
        var seed = await fx.SeedCourse(price);
        var (buyer, client) = await fx.User(Roles.Student);
        var res = await client.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Key() });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var co = (await res.Content.ReadFromJsonAsync<CheckoutResponse>())!;
        var wh = await PostWebhook(CompletedEvent("evt_" + Guid.NewGuid().ToString("N"), co.OrderId, (long)(price * 100)));
        Assert.Equal(HttpStatusCode.OK, wh.StatusCode);
        return (seed, buyer, client, co.OrderId);
    }

    [Fact]
    public async Task Checkout_without_keys_returns_503()
    {
        var seed = await fx.SeedCourse();
        await using var noKeys = fx.Build(stripeConfigured: false);
        var (u, _) = await fx.User(Roles.Student);
        var res = await fx.Client(u, noKeys).PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Key() });
        Assert.Equal(HttpStatusCode.ServiceUnavailable, res.StatusCode);
        Assert.Contains("payments_not_configured", await res.Content.ReadAsStringAsync());
        Assert.False(await fx.Db(d => d.Orders.AnyAsync(o => o.UserId == u.Id)));
    }

    [Fact]
    public async Task Checkout_is_idempotent_and_grants_nothing_before_webhook()
    {
        var seed = await fx.SeedCourse();
        var (u, c) = await fx.User(Roles.Student);
        var key = Key();
        var a = await (await c.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = key })).Content.ReadFromJsonAsync<CheckoutResponse>();
        var b = await (await c.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = key })).Content.ReadFromJsonAsync<CheckoutResponse>();
        Assert.Equal(a!.OrderId, b!.OrderId);
        Assert.Equal(a.CheckoutUrl, b.CheckoutUrl);
        Assert.Equal(1, await fx.Db(d => d.Orders.CountAsync(o => o.UserId == u.Id)));
        Assert.Equal(OrderStatus.Pending, await fx.Db(d => d.Orders.Where(o => o.Id == a.OrderId).Select(o => o.Status).FirstAsync()));
        Assert.False(await fx.Db(d => d.Entitlements.AnyAsync(e => e.UserId == u.Id)));
        var stripeReq = fx.Stripe.Requests.Last(r => r.Path == "/v1/checkout/sessions");
        Assert.Contains("metadata%5Border_id%5D=" + a.OrderId, stripeReq.Body);
        Assert.Contains("client_reference_id=" + a.OrderId, stripeReq.Body);
        Assert.Contains("unit_amount%5D=4999", stripeReq.Body);
    }

    [Fact]
    public async Task Webhook_with_bad_signature_returns_400()
    {
        var json = CompletedEvent("evt_bad", Guid.NewGuid(), 100);
        Assert.Equal(HttpStatusCode.BadRequest, (await PostWebhook(json, "t=" + DateTimeOffset.UtcNow.ToUnixTimeSeconds() + ",v1=deadbeef")).StatusCode);
        var stale = StripeSignature.Header(Encoding.UTF8.GetBytes(json), DateTimeOffset.UtcNow.AddMinutes(-10).ToUnixTimeSeconds(), CommerceFixture.WebhookSecret);
        Assert.Equal(HttpStatusCode.BadRequest, (await PostWebhook(json, stale)).StatusCode);
        var wrongSecret = StripeSignature.Header(Encoding.UTF8.GetBytes(json), DateTimeOffset.UtcNow.ToUnixTimeSeconds(), "whsec_other");
        Assert.Equal(HttpStatusCode.BadRequest, (await PostWebhook(json, wrongSecret)).StatusCode);
        Assert.False(await fx.Db(d => d.ProcessedWebhookEvents.AnyAsync(e => e.EventId == "evt_bad")));
    }

    [Fact]
    public async Task Valid_webhook_grants_entitlement_and_splits_commission()
    {
        var (seed, buyer, _, orderId) = await PaidOrder(49.99m);
        var order = await fx.Db(d => d.Orders.FirstAsync(o => o.Id == orderId));
        Assert.Equal(OrderStatus.Paid, order.Status);
        var ent = await fx.Db(d => d.Entitlements.SingleAsync(e => e.OrderId == orderId));
        Assert.Equal(buyer.Id, ent.UserId);
        Assert.Equal(EntitlementSource.Purchase, ent.Source);
        Assert.InRange((ent.EndsAt!.Value - ent.StartsAt).TotalDays, 89.99, 90.01);
        Assert.True(await fx.Db(d => d.Payments.AnyAsync(p => p.OrderId == orderId && p.ProviderPaymentId == "pi_" + orderId.ToString("N"))));

        var ledger = await fx.Db(d => d.CommissionLedger.Where(c => c.OrderId == orderId).ToListAsync());
        Assert.Equal(2, ledger.Count);
        // pool = 49.99 * 70% = 34.993 -> owner 60% = 20.9958 -> 20.99 ; co 40% = 13.9972 -> 13.99
        Assert.Equal(20.99m, ledger.Single(l => l.InstructorId == seed.Owner.Id).InstructorAmount);
        Assert.Equal(13.99m, ledger.Single(l => l.InstructorId == seed.CoInstructor.Id).InstructorAmount);
        Assert.Equal(49.99m, ledger.Sum(l => l.InstructorAmount + l.PlatformAmount));

        var earnings = await fx.Client(seed.Owner).GetFromJsonAsync<EarningsDto>("/api/studio/earnings");
        Assert.Equal(20.99m, earnings!.Totals.Single(t => t.Currency == "USD").InstructorAmount);
    }

    [Fact]
    public async Task Duplicate_event_is_processed_once()
    {
        var seed = await fx.SeedCourse(10m);
        var (u, c) = await fx.User(Roles.Student);
        var co = (await (await c.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Key() })).Content.ReadFromJsonAsync<CheckoutResponse>())!;
        var json = CompletedEvent("evt_dup_" + Guid.NewGuid().ToString("N"), co.OrderId, 1000);
        var r1 = await PostWebhook(json);
        var r2 = await PostWebhook(json);
        Assert.Equal(HttpStatusCode.OK, r1.StatusCode);
        Assert.Equal(HttpStatusCode.OK, r2.StatusCode);
        Assert.Contains("duplicate", await r2.Content.ReadAsStringAsync());
        // A different event id for the same session must not double-grant either.
        Assert.Equal(HttpStatusCode.OK, (await PostWebhook(CompletedEvent("evt_other_" + Guid.NewGuid().ToString("N"), co.OrderId, 1000))).StatusCode);
        Assert.Equal(1, await fx.Db(d => d.Entitlements.CountAsync(e => e.UserId == u.Id)));
        Assert.Equal(1, await fx.Db(d => d.Payments.CountAsync(p => p.OrderId == co.OrderId)));
        Assert.Equal(2, await fx.Db(d => d.CommissionLedger.CountAsync(e => e.OrderId == co.OrderId)));
    }

    [Fact]
    public async Task Amount_or_currency_mismatch_is_rejected()
    {
        var seed = await fx.SeedCourse(25m);
        var (u, c) = await fx.User(Roles.Student);
        var co = (await (await c.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Key() })).Content.ReadFromJsonAsync<CheckoutResponse>())!;
        var r = await PostWebhook(CompletedEvent("evt_mm_" + Guid.NewGuid().ToString("N"), co.OrderId, 100));
        Assert.Contains("rejected", await r.Content.ReadAsStringAsync());
        await PostWebhook(CompletedEvent("evt_mm2_" + Guid.NewGuid().ToString("N"), co.OrderId, 2500, "eur"));
        Assert.Equal(OrderStatus.Pending, await fx.Db(d => d.Orders.Where(o => o.Id == co.OrderId).Select(o => o.Status).FirstAsync()));
        Assert.False(await fx.Db(d => d.Entitlements.AnyAsync(e => e.UserId == u.Id)));
        Assert.False(await fx.Db(d => d.CommissionLedger.AnyAsync(e => e.OrderId == co.OrderId)));
    }

    [Fact]
    public async Task Refund_revokes_only_purchase_entitlement_and_video_stays_free()
    {
        var (seed, buyer, client, orderId) = await PaidOrder(30m);
        // Organization entitlement from another source on the same course must survive the refund.
        var orgEnt = new Entitlement { UserId = buyer.Id, CourseId = seed.Course.Id, Source = EntitlementSource.Organization, EndsAt = DateTime.UtcNow.AddDays(365) };
        await fx.Db(async d => { d.Entitlements.Add(orgEnt); await d.SaveChangesAsync(); });

        var rr = await client.PostAsJsonAsync($"/api/me/orders/{orderId}/refund-request", new { reason = "Not what I expected" });
        Assert.Equal(HttpStatusCode.OK, rr.StatusCode);
        var refund = (await rr.Content.ReadFromJsonAsync<RefundDto>())!;
        Assert.Equal(HttpStatusCode.Conflict, (await client.PostAsJsonAsync($"/api/me/orders/{orderId}/refund-request", new { reason = "again please" })).StatusCode);

        // Someone else's order is not visible.
        var (_, stranger) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await stranger.PostAsJsonAsync($"/api/me/orders/{orderId}/refund-request", new { reason = "mine?" })).StatusCode);

        var (_, finance) = await fx.User(Roles.Finance);
        var dec = await finance.PostAsJsonAsync($"/api/admin/refunds/{refund.Id}/decision", new { decision = "Approve" });
        Assert.Equal(HttpStatusCode.OK, dec.StatusCode);
        Assert.Contains(fx.Stripe.Requests, r => r.Path == "/v1/refunds" && r.Body.Contains("payment_intent=pi_" + orderId.ToString("N")) && r.Body.Contains("amount=3000"));

        Assert.Equal(OrderStatus.Refunded, await fx.Db(d => d.Orders.Where(o => o.Id == orderId).Select(o => o.Status).FirstAsync()));
        Assert.NotNull(await fx.Db(d => d.Entitlements.Where(e => e.OrderId == orderId).Select(e => e.RevokedAt).FirstAsync()));
        Assert.Null(await fx.Db(d => d.Entitlements.Where(e => e.Id == orgEnt.Id).Select(e => e.RevokedAt).FirstAsync()));
        var ledger = await fx.Db(d => d.CommissionLedger.Where(c => c.OrderId == orderId).ToListAsync());
        Assert.Equal(2, ledger.Count(l => l.Kind == "RefundReversal"));
        Assert.Equal(0m, ledger.Sum(l => l.InstructorAmount));
        Assert.Equal(0m, ledger.Sum(l => l.PlatformAmount));

        Assert.Equal(HttpStatusCode.Conflict, (await finance.PostAsJsonAsync($"/api/admin/refunds/{refund.Id}/decision", new { decision = "Approve" })).StatusCode);

        // Free video playback is unaffected by the refund.
        var lesson = await client.GetFromJsonAsync<JsonElement>($"/api/learn/lessons/{seed.Lesson.Id}");
        Assert.Equal(seed.VideoId, lesson.GetProperty("youtubeVideoId").GetString());
        // Organization entitlement still provides premium access.
        Assert.False(lesson.GetProperty("premiumLocked").GetBoolean());
    }

    [Fact]
    public async Task Package_guard_rejects_video_access_and_admin_approves()
    {
        var seed = await fx.SeedCourse();
        var owner = fx.Client(seed.Owner);
        var bad = await owner.PostAsJsonAsync($"/api/studio/courses/{seed.Course.Id}/packages",
            new { title = "Full video access", contents = "All lessons", price = 20, currency = "USD", accessDays = 30 });
        Assert.Equal(HttpStatusCode.BadRequest, bad.StatusCode);
        Assert.Contains("package_sells_video_access", await bad.Content.ReadAsStringAsync());
        Assert.Equal(HttpStatusCode.BadRequest, (await owner.PostAsJsonAsync($"/api/studio/courses/{seed.Course.Id}/packages",
            new { title = "Exam prep", contents = "Mock exams", price = 20, currency = "usd", accessDays = 30 })).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await owner.PostAsJsonAsync($"/api/studio/courses/{seed.Course.Id}/packages",
            new { title = "Exam prep", contents = "Mock exams", price = 20000, currency = "USD", accessDays = 30 })).StatusCode);
        var (_, other) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await other.PostAsJsonAsync($"/api/studio/courses/{seed.Course.Id}/packages",
            new { title = "Exam prep", contents = "Mock exams", price = 20, currency = "USD", accessDays = 30 })).StatusCode);

        var ok = await owner.PostAsJsonAsync($"/api/studio/courses/{seed.Course.Id}/packages",
            new { title = "Exam prep", contents = "Premium notes and 3 mock exams", price = 20, currency = "USD", accessDays = 30 });
        var pkg = (await ok.Content.ReadFromJsonAsync<PackageDto>())!;
        Assert.False(pkg.IsActive);
        var (_, admin) = await fx.User(Roles.Admin);
        var approved = (await (await admin.PostAsJsonAsync($"/api/admin/packages/{pkg.Id}/decision", new { decision = "Approve" })).Content.ReadFromJsonAsync<PackageDto>())!;
        Assert.True(approved.IsActive);
        Assert.True(await fx.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "package.decision" && a.EntityId == pkg.Id.ToString())));
    }

    [Fact]
    public async Task Payout_batch_requires_different_approver()
    {
        await PaidOrder(12m);
        var (_, f1) = await fx.User(Roles.Finance);
        var (_, f2) = await fx.User(Roles.Finance);
        var res = await f1.PostAsJsonAsync("/api/admin/payout-batches", new { });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var batch = (await res.Content.ReadFromJsonAsync<PayoutBatchDto>())!;
        Assert.NotEmpty(batch.Lines);
        Assert.Equal(HttpStatusCode.Forbidden, (await f1.PostAsync($"/api/admin/payout-batches/{batch.Id}/approve", null)).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await f2.PostAsync($"/api/admin/payout-batches/{batch.Id}/approve", null)).StatusCode);
    }

    [Fact]
    public void Commission_split_rounds_with_remainder_to_platform()
    {
        var a = Guid.NewGuid(); var b = Guid.NewGuid(); var c = Guid.NewGuid();
        var rows = CommissionSplit.Compute(Guid.NewGuid(), Guid.NewGuid(), 10m, "USD", 70m,
        [
            new CourseInstructor { UserId = a, RevenueSharePercent = 33.34m },
            new CourseInstructor { UserId = b, RevenueSharePercent = 33.33m },
            new CourseInstructor { UserId = c, RevenueSharePercent = 33.33m },
        ]);
        Assert.Equal(3, rows.Count);
        Assert.All(rows, r => Assert.Equal(r.InstructorAmount, Math.Round(r.InstructorAmount, 2)));
        Assert.Equal(10m, rows.Sum(r => r.InstructorAmount + r.PlatformAmount));
        Assert.True(rows.Sum(r => r.InstructorAmount) <= 7m);
    }
}
