using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Commerce;

public class SubscriptionTests(CommerceFixture fx) : IClassFixture<CommerceFixture>
{
    private static long Unix(DateTime t) => new DateTimeOffset(t).ToUnixTimeSeconds();

    private async Task<PlanDto> Plan(string interval = "month", decimal price = 20m)
    {
        var (_, admin) = await fx.User(Roles.Admin);
        var res = await admin.PostAsJsonAsync("/api/admin/plans", new
        {
            code = "P" + Guid.NewGuid().ToString("N")[..8], name = "Premium " + interval, scope = "AllCourses", price, currency = "USD", interval,
            aiAllowance = 200, includedServices = "Premium notes, all MCQ banks, mock exams, 200 AI tutor requests per period",
        });
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        return (await res.Content.ReadFromJsonAsync<PlanDto>())!;
    }

    private record Active(User User, HttpClient Client, Guid SubscriptionId, string ProviderId, DateTime PeriodEnd);

    private async Task<Active> Subscribe(PlanDto plan)
    {
        var (user, client) = await fx.User(Roles.Student);
        var res = await client.PostAsJsonAsync("/api/subscriptions/checkout", new { planId = plan.Id, idempotencyKey = Kit.Key() });
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        var co = (await res.Content.ReadFromJsonAsync<SubscriptionCheckoutResponse>())!;
        var providerId = "sub_" + Guid.NewGuid().ToString("N")[..12];
        var md = new { subscription_id = co.SubscriptionId.ToString() };
        Assert.Equal("subscription_linked", (await Kit.WebhookOk(fx, Kit.Event("checkout.session.completed",
            new { id = "cs_sub_" + co.SubscriptionId, mode = "subscription", subscription = providerId, customer = "cus_1", payment_status = "paid", metadata = md }))).Status);
        var periodEnd = DateTime.UtcNow.AddDays(30).AddTicks(-(DateTime.UtcNow.Ticks % TimeSpan.TicksPerSecond));
        periodEnd = DateTimeOffset.FromUnixTimeSeconds(Unix(periodEnd)).UtcDateTime;
        Assert.Equal("subscription_active", (await Kit.WebhookOk(fx, Kit.Event("customer.subscription.created",
            new { id = providerId, status = "active", customer = "cus_1", cancel_at_period_end = false, current_period_start = Unix(DateTime.UtcNow), current_period_end = Unix(periodEnd), metadata = md }))).Status);
        return new Active(user, client, co.SubscriptionId, providerId, periodEnd);
    }

    private object Invoice(string providerSub, string invoiceId, decimal amount, DateTime periodEnd) => new
    {
        id = invoiceId, subscription = providerSub, amount_paid = (long)(amount * 100), currency = "usd", payment_intent = "pi_" + invoiceId,
        lines = new { data = new[] { new { period = new { start = Unix(periodEnd.AddDays(-30)), end = Unix(periodEnd) } } } },
    };

    [Fact]
    public async Task Plan_guards_and_public_listing_show_terms()
    {
        var (_, admin) = await fx.User(Roles.Admin);
        var unlimited = await admin.PostAsJsonAsync("/api/admin/plans", new { code = "U" + Guid.NewGuid().ToString("N")[..8], name = "Unlimited", scope = "AllCourses", price = 10, currency = "USD", interval = "month", aiAllowance = 10, includedServices = "Unlimited AI tutoring" });
        Assert.Equal("unlimited_claim", await Kit.ErrorCode(unlimited));
        var video = await admin.PostAsJsonAsync("/api/admin/plans", new { code = "V" + Guid.NewGuid().ToString("N")[..8], name = "Videos", scope = "AllCourses", price = 10, currency = "USD", interval = "month", aiAllowance = 10, includedServices = "Unlock all videos" });
        Assert.Equal("package_sells_video_access", await Kit.ErrorCode(video));
        var (_, student) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.PostAsJsonAsync("/api/admin/plans", new { code = "S1234567", name = "Mine", scope = "AllCourses", price = 1, currency = "USD", interval = "month", aiAllowance = 1, includedServices = "notes" })).StatusCode);
        var plan = await Plan("year", 120m);
        var list = await fx.Client().GetFromJsonAsync<List<PlanDto>>("/api/plans");
        var shown = list!.Single(p => p.Id == plan.Id);
        Assert.Contains("Renews automatically every year", shown.RenewalTerms);
        Assert.Contains("200 AI tutor", shown.RenewalTerms);
        Assert.Contains("free", shown.FreeVideoNotice);
    }

    [Fact]
    public async Task Full_lifecycle_entitlements_invoice_cancel_failure_grace_and_end()
    {
        var seed = await fx.SeedCourse();
        var plan = await Plan();
        var sub = await Subscribe(plan);
        Assert.Contains(fx.Stripe.Requests, r => r.Path == "/v1/checkout/sessions" && r.Body.Contains("mode=subscription") && r.Body.Contains("recurring%5D%5Binterval%5D=month"));

        var ent = await fx.Db(d => d.Entitlements.SingleAsync(e => e.UserId == sub.User.Id && e.CourseId == seed.Course.Id));
        Assert.Equal(EntitlementSource.Subscription, ent.Source);
        Assert.Equal(sub.PeriodEnd, ent.EndsAt);
        var lesson = await sub.Client.GetFromJsonAsync<System.Text.Json.JsonElement>($"/api/learn/lessons/{seed.Lesson.Id}");
        Assert.False(lesson.GetProperty("premiumLocked").GetBoolean());

        // invoice.paid: order + payment + sequential invoice; duplicates are idempotent.
        var newEnd = sub.PeriodEnd.AddDays(30);
        var invJson = Kit.Event("invoice.paid", Invoice(sub.ProviderId, "in_" + Guid.NewGuid().ToString("N")[..10], 20m, newEnd));
        Assert.Equal("subscription_renewed", (await Kit.WebhookOk(fx, invJson)).Status);
        Assert.Equal("duplicate", (await Kit.WebhookOk(fx, invJson)).Status);
        var si = await fx.Db(d => d.Set<SubscriptionInvoice>().SingleAsync(x => x.SubscriptionId == sub.SubscriptionId));
        Assert.Equal(20m, si.Amount);
        Assert.True(await fx.Db(d => d.Payments.AnyAsync(p => p.OrderId == si.OrderId && p.Amount == 20m)));
        Assert.True(await fx.Db(d => d.Set<Invoice>().AnyAsync(i => i.OrderId == si.OrderId && i.Kind == "Invoice")));
        Assert.Equal(newEnd, await fx.Db(d => d.Entitlements.Where(e => e.Id == ent.Id).Select(e => e.EndsAt).FirstAsync()));
        Assert.Equal("duplicate_invoice", (await Kit.WebhookOk(fx, Kit.Event("invoice.paid", Invoice(sub.ProviderId, si.ProviderInvoiceId, 20m, newEnd)))).Status);
        Assert.Equal(0, await fx.Db(d => d.CommissionLedger.CountAsync(e => e.OrderId == si.OrderId))); // pool allocation pays instructors later

        // Learners cannot refund a subscription invoice through the package form.
        Assert.Equal("subscription_refund_not_supported", await Kit.ErrorCode(await sub.Client.PostAsJsonAsync($"/api/me/orders/{si.OrderId}/refund-request", new { reason = "nope nope" })));

        // Cancel at period end: provider failure leaves state untouched; success sets the flag. Others cannot cancel.
        var (_, other) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await other.PostAsync($"/api/me/subscriptions/{sub.SubscriptionId}/cancel", null)).StatusCode);
        fx.Stripe.FailSubscriptions = true;
        try { Assert.Equal(HttpStatusCode.BadGateway, (await sub.Client.PostAsync($"/api/me/subscriptions/{sub.SubscriptionId}/cancel", null)).StatusCode); }
        finally { fx.Stripe.FailSubscriptions = false; }
        Assert.False(await fx.Db(d => d.Set<Subscription>().Where(s => s.Id == sub.SubscriptionId).Select(s => s.CancelAtPeriodEnd).FirstAsync()));
        var cancelled = (await (await sub.Client.PostAsync($"/api/me/subscriptions/{sub.SubscriptionId}/cancel", null)).Content.ReadFromJsonAsync<SubscriptionDto>())!;
        Assert.True(cancelled.CancelAtPeriodEnd);
        Assert.Equal(newEnd, cancelled.CurrentPeriodEnd);
        Assert.Contains(fx.Stripe.Requests, r => r.Path == "/v1/subscriptions/" + sub.ProviderId && r.Body.Contains("cancel_at_period_end=true"));

        // Payment failure: past due with grace; access extends to the grace end at least.
        Assert.Equal("subscription_past_due", (await Kit.WebhookOk(fx, Kit.Event("invoice.payment_failed", new { id = "in_fail_" + Guid.NewGuid().ToString("N")[..6], subscription = sub.ProviderId }))).Status);
        var s1 = await fx.Db(d => d.Set<Subscription>().FirstAsync(s => s.Id == sub.SubscriptionId));
        Assert.Equal("PastDue", s1.Status);
        Assert.InRange((s1.GraceUntil!.Value - DateTime.UtcNow).TotalDays, 6.9, 7.1);

        // Grace expires -> maintenance ends the subscription and its entitlements.
        await fx.Db(d => d.Set<Subscription>().Where(s => s.Id == sub.SubscriptionId).ExecuteUpdateAsync(x => x.SetProperty(s => s.GraceUntil, DateTime.UtcNow.AddMinutes(-1))));
        using (var scope = fx.Factory.Services.CreateScope())
            await scope.ServiceProvider.GetRequiredService<SubscriptionService>().Maintain();
        Assert.Equal("Ended", await fx.Db(d => d.Set<Subscription>().Where(s => s.Id == sub.SubscriptionId).Select(s => s.Status).FirstAsync()));
        Assert.True(await fx.Db(d => d.Entitlements.Where(e => e.Id == ent.Id).Select(e => e.EndsAt).FirstAsync()) <= DateTime.UtcNow);
        var after = await sub.Client.GetFromJsonAsync<System.Text.Json.JsonElement>($"/api/learn/lessons/{seed.Lesson.Id}");
        Assert.True(after.GetProperty("premiumLocked").GetBoolean());
        Assert.Equal(seed.VideoId, after.GetProperty("youtubeVideoId").GetString()); // the free video is never gated
        Assert.True(await Kit.Audits(fx, "subscription.grace_expired") >= 1);
    }

    [Fact]
    public async Task Deleted_event_ends_access_and_stale_updates_do_not_revive_it()
    {
        await fx.SeedCourse();
        var sub = await Subscribe(await Plan());
        var md = new { subscription_id = sub.SubscriptionId.ToString() };
        Assert.Equal("subscription_canceled", (await Kit.WebhookOk(fx, Kit.Event("customer.subscription.deleted", new { id = sub.ProviderId, status = "canceled", metadata = md }))).Status);
        var now = DateTime.UtcNow;
        Assert.False(await fx.Db(d => d.Entitlements.AnyAsync(e => e.UserId == sub.User.Id && (e.EndsAt == null || e.EndsAt > now))));
        var stale = await Kit.WebhookOk(fx, Kit.Event("customer.subscription.updated", new { id = sub.ProviderId, status = "active", current_period_end = Unix(DateTime.UtcNow.AddDays(30)), metadata = md }));
        Assert.Equal("ignored", stale.Status);
        Assert.Equal("Canceled", await fx.Db(d => d.Set<Subscription>().Where(s => s.Id == sub.SubscriptionId).Select(s => s.Status).FirstAsync()));
    }

    [Fact]
    public async Task Unlinked_invoice_is_retried_and_bad_signatures_are_rejected()
    {
        var plan = await Plan();
        var (_, client) = await fx.User(Roles.Student);
        var co = (await (await client.PostAsJsonAsync("/api/subscriptions/checkout", new { planId = plan.Id, idempotencyKey = Kit.Key() })).Content.ReadFromJsonAsync<SubscriptionCheckoutResponse>())!;
        var providerId = "sub_" + Guid.NewGuid().ToString("N")[..12];
        var json = Kit.Event("invoice.paid", Invoice(providerId, "in_" + Guid.NewGuid().ToString("N")[..10], 20m, DateTime.UtcNow.AddDays(30)));

        // Wrong secret / stale timestamp -> 400, nothing recorded.
        Assert.Equal(HttpStatusCode.BadRequest, (await Kit.Webhook(fx, json, "whsec_wrong")).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await Kit.Webhook(fx, json, ts: DateTimeOffset.UtcNow.AddMinutes(-10).ToUnixTimeSeconds())).StatusCode);

        // Raced ahead of linking -> 409 so Stripe retries; the event is NOT marked processed.
        Assert.Equal(HttpStatusCode.Conflict, (await Kit.Webhook(fx, json)).StatusCode);
        await Kit.WebhookOk(fx, Kit.Event("checkout.session.completed", new { id = "cs_x", mode = "subscription", subscription = providerId, metadata = new { subscription_id = co.SubscriptionId.ToString() } }));
        Assert.Equal("subscription_renewed", (await Kit.WebhookOk(fx, json)).Status);
        Assert.Equal("Active", await fx.Db(d => d.Set<Subscription>().Where(s => s.Id == co.SubscriptionId).Select(s => s.Status).FirstAsync()));

        // Already subscribed to the same plan.
        Assert.Equal("already_subscribed", await Kit.ErrorCode(await client.PostAsJsonAsync("/api/subscriptions/checkout", new { planId = plan.Id, idempotencyKey = Kit.Key() })));
    }

    [Fact]
    public async Task Monthly_pool_allocates_by_premium_consumption_share_once()
    {
        var a = await fx.SeedCourse();
        var b = await fx.SeedCourse();
        var sub = await Subscribe(await Plan());
        var invoiceId = "in_" + Guid.NewGuid().ToString("N")[..10];
        await Kit.WebhookOk(fx, Kit.Event("invoice.paid", Invoice(sub.ProviderId, invoiceId, 20m, sub.PeriodEnd)));

        var now = DateTime.UtcNow;
        var prevStart = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(-1);
        var mid = prevStart.AddDays(10);
        await fx.Db(async d =>
        {
            await d.Set<SubscriptionInvoice>().Where(x => x.ProviderInvoiceId == invoiceId).ExecuteUpdateAsync(s => s.SetProperty(x => x.PaidAt, mid));
            var entIds = d.Set<SubscriptionEntitlement>().Where(x => x.SubscriptionId == sub.SubscriptionId).Select(x => x.EntitlementId);
            await d.Entitlements.Where(e => entIds.Contains(e.Id)).ExecuteUpdateAsync(s => s.SetProperty(e => e.StartsAt, prevStart));
            var asA = new Mastemy.Api.Domain.Assessment { CourseId = a.Course.Id, Title = "Premium mock A", IsPremium = true };
            var asB = new Mastemy.Api.Domain.Assessment { CourseId = b.Course.Id, Title = "Premium mock B", IsPremium = true };
            var freeA = new Mastemy.Api.Domain.Assessment { CourseId = a.Course.Id, Title = "Free practice", IsPremium = false };
            d.Assessments.AddRange(asA, asB, freeA);
            for (var i = 0; i < 3; i++) d.Attempts.Add(new Attempt { AssessmentId = asA.Id, UserId = sub.User.Id, Status = AttemptStatus.Submitted, StartedAt = mid, SubmittedAt = mid.AddHours(i) });
            d.Attempts.Add(new Attempt { AssessmentId = asB.Id, UserId = sub.User.Id, Status = AttemptStatus.Submitted, StartedAt = mid, SubmittedAt = mid });
            d.Attempts.Add(new Attempt { AssessmentId = freeA.Id, UserId = sub.User.Id, Status = AttemptStatus.Submitted, StartedAt = mid, SubmittedAt = mid }); // not premium
            d.Attempts.Add(new Attempt { AssessmentId = asA.Id, UserId = a.Owner.Id, Status = AttemptStatus.Submitted, StartedAt = mid, SubmittedAt = mid }); // not a subscriber
            d.Set<ConsumptionEvent>().Add(new ConsumptionEvent { UserId = sub.User.Id, CourseId = b.Course.Id, Kind = "PremiumDownload", OccurredAt = mid });
            await d.SaveChangesAsync();
        });

        var (_, student) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.PostAsJsonAsync("/api/admin/subscription-pool/allocate", new { year = prevStart.Year, month = prevStart.Month })).StatusCode);
        var (_, finance) = await fx.User(Roles.Finance);
        Assert.Equal("period_not_closed", await Kit.ErrorCode(await finance.PostAsJsonAsync("/api/admin/subscription-pool/allocate", new { year = now.Year, month = now.Month })));
        var res = await finance.PostAsJsonAsync("/api/admin/subscription-pool/allocate", new { year = prevStart.Year, month = prevStart.Month });
        Assert.True(res.StatusCode == HttpStatusCode.OK, await res.Content.ReadAsStringAsync());
        var alloc = (await res.Content.ReadFromJsonAsync<List<PoolAllocationDto>>())!.Single(x => x.Currency == "USD");
        Assert.Equal(20m, alloc.Revenue);
        Assert.Equal(14m, alloc.Pool);
        Assert.Equal(5, alloc.TotalUnits);
        Assert.Equal(8.4m, alloc.Lines.Single(l => l.CourseId == a.Course.Id).Amount);
        Assert.Equal(5.6m, alloc.Lines.Single(l => l.CourseId == b.Course.Id).Amount);
        var pool = await fx.Db(d => d.CommissionLedger.Where(e => e.Kind == "SubscriptionPool").ToListAsync());
        Assert.Equal(5.04m, pool.Single(e => e.InstructorId == a.Owner.Id).InstructorAmount);
        Assert.Equal(3.36m, pool.Single(e => e.InstructorId == a.CoInstructor.Id).InstructorAmount);
        Assert.Equal(14m, pool.Sum(e => e.InstructorAmount + e.PlatformAmount));

        var again = await (await finance.PostAsJsonAsync("/api/admin/subscription-pool/allocate", new { year = prevStart.Year, month = prevStart.Month })).Content.ReadFromJsonAsync<List<PoolAllocationDto>>();
        Assert.Empty(again!);
        Assert.Equal(4, await fx.Db(d => d.CommissionLedger.CountAsync(e => e.Kind == "SubscriptionPool")));
    }
}
