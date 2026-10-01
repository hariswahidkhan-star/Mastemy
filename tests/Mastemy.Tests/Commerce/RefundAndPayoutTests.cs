using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Commerce;

/// <summary>Regression tests: refund claim race, provider failure rollback, certificate revocation, minor units, payout listing.</summary>
public class RefundAndPayoutTests(CommerceFixture fx) : IClassFixture<CommerceFixture>
{
    private static string Key() => "idem-" + Guid.NewGuid().ToString("N");

    private async Task<HttpResponseMessage> PostWebhook(string json)
    {
        var raw = Encoding.UTF8.GetBytes(json);
        var req = new HttpRequestMessage(HttpMethod.Post, "/api/webhooks/stripe") { Content = new ByteArrayContent(raw) };
        req.Content.Headers.ContentType = new("application/json");
        req.Headers.Add("Stripe-Signature", StripeSignature.Header(raw, DateTimeOffset.UtcNow.ToUnixTimeSeconds(), CommerceFixture.WebhookSecret));
        return await fx.Client().SendAsync(req);
    }

    private async Task<(CommerceFixture.SeededCourse Seed, User Buyer, HttpClient Client, Guid OrderId)> PaidOrder(decimal price = 20m)
    {
        var seed = await fx.SeedCourse(price);
        var (buyer, client) = await fx.User(Roles.Student);
        var res = await client.PostAsJsonAsync("/api/checkout", new { packageId = seed.Package.Id, idempotencyKey = Key() });
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var co = (await res.Content.ReadFromJsonAsync<CheckoutResponse>())!;
        var json = JsonSerializer.Serialize(new
        {
            id = "evt_" + Guid.NewGuid().ToString("N"), type = "checkout.session.completed",
            data = new { @object = new {
                id = "cs_test_" + co.OrderId, payment_status = "paid", amount_total = (long)(price * 100), currency = "usd",
                payment_intent = "pi_" + co.OrderId.ToString("N"), client_reference_id = co.OrderId.ToString(),
                metadata = new { order_id = co.OrderId.ToString() } } },
        });
        Assert.Equal(HttpStatusCode.OK, (await PostWebhook(json)).StatusCode);
        return (seed, buyer, client, co.OrderId);
    }

    private static async Task<RefundDto> Request(HttpClient client, Guid orderId)
    {
        var rr = await client.PostAsJsonAsync($"/api/me/orders/{orderId}/refund-request", new { reason = "Changed my mind" });
        Assert.Equal(HttpStatusCode.OK, rr.StatusCode);
        return (await rr.Content.ReadFromJsonAsync<RefundDto>())!;
    }

    [Fact]
    public async Task Concurrent_approvals_refund_once_and_record_decider()
    {
        var (_, buyer, client, orderId) = await PaidOrder();
        var refund = await Request(client, orderId);
        Assert.Equal(buyer.Id, await fx.Db(d => d.Refunds.Where(r => r.Id == refund.Id).Select(r => r.RequestedBy).FirstAsync()));

        var (f1, c1) = await fx.User(Roles.Finance);
        var (f2, c2) = await fx.User(Roles.Finance);
        fx.Stripe.RefundDelay = TimeSpan.FromMilliseconds(300);
        try
        {
            var results = await Task.WhenAll(
                c1.PostAsJsonAsync($"/api/admin/refunds/{refund.Id}/decision", new { decision = "Approve" }),
                c2.PostAsJsonAsync($"/api/admin/refunds/{refund.Id}/decision", new { decision = "Approve" }));
            Assert.Single(results, r => r.StatusCode == HttpStatusCode.OK);
            Assert.Single(results, r => r.StatusCode == HttpStatusCode.Conflict);
        }
        finally { fx.Stripe.RefundDelay = TimeSpan.Zero; }

        Assert.Single(fx.Stripe.Requests, r => r.Path == "/v1/refunds" && r.Body.Contains("pi_" + orderId.ToString("N")));
        var stored = await fx.Db(d => d.Refunds.AsNoTracking().FirstAsync(r => r.Id == refund.Id));
        Assert.Equal("Completed", stored.Status);
        Assert.Contains(stored.DecidedBy!.Value, new[] { f1.Id, f2.Id });
        Assert.NotNull(stored.DecidedAt);
        Assert.Equal(2, await fx.Db(d => d.CommissionLedger.CountAsync(c => c.OrderId == orderId && c.Kind == "RefundReversal")));
    }

    [Fact]
    public async Task Provider_failure_releases_claim_so_refund_can_be_retried()
    {
        var (_, _, client, orderId) = await PaidOrder();
        var refund = await Request(client, orderId);
        var (_, finance) = await fx.User(Roles.Finance);
        fx.Stripe.FailRefunds = true;
        try
        {
            var failed = await finance.PostAsJsonAsync($"/api/admin/refunds/{refund.Id}/decision", new { decision = "Approve" });
            Assert.False(failed.IsSuccessStatusCode);
        }
        finally { fx.Stripe.FailRefunds = false; }
        var after = await fx.Db(d => d.Refunds.AsNoTracking().FirstAsync(r => r.Id == refund.Id));
        Assert.Equal("Requested", after.Status);
        Assert.Null(after.DecidedBy);
        Assert.Equal(OrderStatus.Paid, await fx.Db(d => d.Orders.Where(o => o.Id == orderId).Select(o => o.Status).FirstAsync()));

        var retry = await finance.PostAsJsonAsync($"/api/admin/refunds/{refund.Id}/decision", new { decision = "Approve" });
        Assert.Equal(HttpStatusCode.OK, retry.StatusCode);
        Assert.Equal("Completed", (await retry.Content.ReadFromJsonAsync<RefundDto>())!.Status);
    }

    private async Task<Guid> SeedCertificate(Guid userId, Guid courseId, bool premiumAssessment)
    {
        var assessment = new Assessment { CourseId = courseId, Title = "Final", IsPremium = premiumAssessment, CountsTowardCertificate = true };
        var attempt = new Attempt { AssessmentId = assessment.Id, UserId = userId, Status = AttemptStatus.Submitted, Passed = true, ScorePercent = 90 };
        var cert = new Certificate
        {
            Code = Guid.NewGuid().ToString("N"), UserId = userId, CourseId = courseId, AttemptId = attempt.Id, RecipientName = "Tester",
            CourseTitle = "Course", ScorePercent = 90, Status = CertificateStatus.Valid,
        };
        await fx.Db(async d => { d.Assessments.Add(assessment); d.Attempts.Add(attempt); d.Certificates.Add(cert); await d.SaveChangesAsync(); });
        return cert.Id;
    }

    [Fact]
    public async Task Refund_revokes_certificate_earned_through_premium_assessment()
    {
        var (seed, buyer, client, orderId) = await PaidOrder();
        var certId = await SeedCertificate(buyer.Id, seed.Course.Id, premiumAssessment: true);
        var refund = await Request(client, orderId);
        var (_, finance) = await fx.User(Roles.Finance);
        Assert.Equal(HttpStatusCode.OK, (await finance.PostAsJsonAsync($"/api/admin/refunds/{refund.Id}/decision", new { decision = "Approve" })).StatusCode);

        var cert = await fx.Db(d => d.Certificates.AsNoTracking().FirstAsync(c => c.Id == certId));
        Assert.Equal(CertificateStatus.Revoked, cert.Status);
        Assert.False(string.IsNullOrWhiteSpace(cert.RevocationReason));
        Assert.True(await fx.Db(d => d.AuditLogs.AnyAsync(a => a.Action == "certificate.revoked" && a.EntityId == certId.ToString())));
    }

    [Fact]
    public async Task Refund_keeps_certificate_from_free_assessment()
    {
        var (seed, buyer, client, orderId) = await PaidOrder();
        var certId = await SeedCertificate(buyer.Id, seed.Course.Id, premiumAssessment: false);
        var refund = await Request(client, orderId);
        var (_, finance) = await fx.User(Roles.Finance);
        Assert.Equal(HttpStatusCode.OK, (await finance.PostAsJsonAsync($"/api/admin/refunds/{refund.Id}/decision", new { decision = "Approve" })).StatusCode);
        Assert.Equal(CertificateStatus.Valid, await fx.Db(d => d.Certificates.Where(c => c.Id == certId).Select(c => c.Status).FirstAsync()));
    }

    [Fact]
    public void Commission_split_uses_whole_units_for_zero_decimal_currency()
    {
        var a = Guid.NewGuid(); var b = Guid.NewGuid();
        var rows = CommissionSplit.Compute(Guid.NewGuid(), Guid.NewGuid(), 1001m, "JPY", 70m,
        [
            new CourseInstructor { UserId = a, RevenueSharePercent = 50m },
            new CourseInstructor { UserId = b, RevenueSharePercent = 50m },
        ]);
        // pool = 700.7 -> each 350.35 -> rounded down to whole yen.
        Assert.All(rows, r => Assert.Equal(350m, r.InstructorAmount));
        Assert.Equal(301m, rows[0].PlatformAmount);
        Assert.All(rows, r => Assert.Equal(r.PlatformAmount, Math.Round(r.PlatformAmount, 0)));
        Assert.Equal(1001m, rows.Sum(r => r.InstructorAmount + r.PlatformAmount));
    }

    [Fact]
    public async Task Payout_batch_listing_returns_lines_for_every_batch()
    {
        var (s1, _, _, _) = await PaidOrder(10m);
        var (_, fin) = await fx.User(Roles.Finance);
        var b1 = (await (await fin.PostAsJsonAsync("/api/admin/payout-batches", new { })).Content.ReadFromJsonAsync<PayoutBatchDto>())!;
        var (s2, _, _, _) = await PaidOrder(20m);
        var b2 = (await (await fin.PostAsJsonAsync("/api/admin/payout-batches", new { })).Content.ReadFromJsonAsync<PayoutBatchDto>())!;

        var list = (await fin.GetFromJsonAsync<List<PayoutBatchDto>>("/api/admin/payout-batches"))!;
        var l1 = list.Single(b => b.Id == b1.Id);
        var l2 = list.Single(b => b.Id == b2.Id);
        Assert.Equal(b1.Lines, l1.Lines);
        Assert.Equal(b2.Lines, l2.Lines);
        Assert.Contains(l1.Lines, l => l.InstructorId == s1.Owner.Id && l.Amount == 4.20m);
        Assert.Contains(l2.Lines, l => l.InstructorId == s2.Owner.Id && l.Amount == 8.40m);
        Assert.DoesNotContain(l1.Lines, l => l.InstructorId == s2.Owner.Id);
    }
}
