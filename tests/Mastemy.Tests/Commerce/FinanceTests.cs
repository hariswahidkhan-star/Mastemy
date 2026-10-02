using System.Net;
using System.Net.Http.Json;
using System.Text;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Commerce;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Commerce;

/// <summary>Invoices/credit notes, partial refunds, chargebacks, reconciliation, payout profiles/requests and statements.</summary>
public class FinanceTests(InvoicingFixture fx) : IClassFixture<InvoicingFixture>
{
    [Fact]
    public async Task Invoices_are_numbered_sequentially_with_tax_and_pdf()
    {
        var seed = await fx.SeedCourse(119m);
        var (_, finance) = await fx.User(Roles.Finance);
        Assert.Equal(HttpStatusCode.OK, (await finance.PutAsJsonAsync("/api/admin/tax-rates/de", new { ratePercent = 19 })).StatusCode);
        var (_, student) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.PutAsJsonAsync("/api/admin/tax-rates/FR", new { ratePercent = 20 })).StatusCode);

        var orders = new List<Guid>();
        for (var i = 0; i < 3; i++)
            orders.Add((await Kit.Pay(fx, student, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key(), country = i == 0 ? "DE" : "US", billingName = "Ada Learner" })).OrderId);
        var all = await finance.GetFromJsonAsync<List<InvoiceDto>>($"/api/admin/invoices?year={DateTime.UtcNow.Year}");
        var nums = all!.Where(i => i.Kind == "Invoice").Select(i => i.Number).OrderBy(n => n).ToList();
        for (var i = 1; i < nums.Count; i++)
            Assert.Equal(int.Parse(nums[i - 1][^6..]) + 1, int.Parse(nums[i][^6..])); // no gaps
        var de = all!.Single(i => i.OrderId == orders[0]);
        Assert.Equal("Ada Learner", de.BuyerName);
        Assert.Equal(19m, de.TaxAmount); // 119 incl. 19% -> 19.00 tax
        Assert.Equal(100m, de.Subtotal);
        Assert.Null(all!.Single(i => i.OrderId == orders[1]).TaxAmount); // no admin rate for US -> no tax fields

        var pdf = await student.GetAsync($"/api/me/invoices/{de.Id}/pdf");
        Assert.Equal(HttpStatusCode.OK, pdf.StatusCode);
        Assert.Equal("application/pdf", pdf.Content.Headers.ContentType!.MediaType);
        Assert.StartsWith("%PDF", Encoding.ASCII.GetString((await pdf.Content.ReadAsByteArrayAsync())[..4]));
        var (_, other) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.NotFound, (await other.GetAsync($"/api/me/invoices/{de.Id}/pdf")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await finance.GetAsync($"/api/admin/invoices/{de.Id}/pdf")).StatusCode);
    }

    [Fact]
    public async Task Partial_refunds_reverse_pro_rata_keep_access_until_full_and_issue_credit_notes()
    {
        var seed = await fx.SeedCourse(100m);
        var (buyer, client) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var (_, finance) = await fx.User(Roles.Finance);
        var (_, instructor) = await fx.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 10, reason = "x" })).StatusCode);
        Assert.Equal("refund_exceeds_remaining", await Kit.ErrorCode(await finance.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 150, reason = "too much" })));
        Assert.Equal("invalid_amount", await Kit.ErrorCode(await finance.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 1.005, reason = "fractional" })));

        var r1 = await finance.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 40, reason = "service issue" });
        Assert.True(r1.StatusCode == HttpStatusCode.OK, await r1.Content.ReadAsStringAsync());
        Assert.Equal(OrderStatus.PartiallyRefunded, await fx.Db(d => d.Orders.Where(o => o.Id == co.OrderId).Select(o => o.Status).FirstAsync()));
        Assert.Null(await fx.Db(d => d.Entitlements.Where(e => e.OrderId == co.OrderId).Select(e => e.RevokedAt).FirstAsync())); // access kept
        Assert.Contains(fx.Stripe.Requests, r => r.Path == "/v1/refunds" && r.Body.Contains("amount=4000"));
        var ledger = await fx.LedgerForOrder(co.OrderId);
        Assert.Equal(-16.8m, ledger.Where(l => l.Kind == "RefundReversal" && l.InstructorId == seed.Owner.Id).Sum(l => l.InstructorAmount)); // 42 * 40%

        var r2 = await finance.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 60, reason = "rest" });
        Assert.Equal(HttpStatusCode.OK, r2.StatusCode);
        Assert.Equal(OrderStatus.Refunded, await fx.Db(d => d.Orders.Where(o => o.Id == co.OrderId).Select(o => o.Status).FirstAsync()));
        Assert.NotNull(await fx.Db(d => d.Entitlements.Where(e => e.OrderId == co.OrderId).Select(e => e.RevokedAt).FirstAsync()));
        ledger = await fx.LedgerForOrder(co.OrderId);
        Assert.Equal(0m, ledger.Sum(l => l.InstructorAmount));
        Assert.Equal(0m, ledger.Sum(l => l.PlatformAmount));
        Assert.Equal("order_not_paid", await Kit.ErrorCode(await finance.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 1, reason = "more" })));

        var invoices = await finance.GetFromJsonAsync<List<InvoiceDto>>($"/api/admin/invoices?orderId={co.OrderId}");
        Assert.Equal(2, invoices!.Count(i => i.Kind == "CreditNote"));
        Assert.Equal(100m, invoices!.Where(i => i.Kind == "CreditNote").Sum(i => i.Total));
        Assert.All(invoices!.Where(i => i.Kind == "CreditNote"), i => Assert.StartsWith("CN-", i.Number));
        Assert.True(await Kit.Audits(fx, "refund.partial") >= 1);
        _ = buyer;
    }

    [Fact]
    public async Task Partial_refund_can_revoke_when_finance_chooses_and_provider_failure_rolls_back()
    {
        var seed = await fx.SeedCourse(50m);
        var (_, client) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var (_, finance) = await fx.User(Roles.Finance);
        fx.Stripe.FailRefunds = true;
        try { Assert.Equal(HttpStatusCode.BadGateway, (await finance.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 10, reason = "x provider" })).StatusCode); }
        finally { fx.Stripe.FailRefunds = false; }
        Assert.Equal(0m, await fx.Db(d => d.Set<OrderDetail>().Where(x => x.OrderId == co.OrderId).Select(x => x.RefundedAmount).FirstAsync()));
        Assert.True(await fx.Db(d => d.Refunds.AnyAsync(r => r.OrderId == co.OrderId && r.Status == "Failed")));
        var ok = await finance.PostAsJsonAsync($"/api/admin/orders/{co.OrderId}/refunds", new { amount = 10, reason = "abuse", revokeEntitlements = true });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        Assert.NotNull(await fx.Db(d => d.Entitlements.Where(e => e.OrderId == co.OrderId).Select(e => e.RevokedAt).FirstAsync()));
    }

    private object Dispute(string id, Guid orderId, decimal amount, string status = "needs_response") => new
    {
        id, amount = (long)(amount * 100), currency = "usd", payment_intent = "pi_" + orderId.ToString("N"), charge = "ch_x", reason = "fraudulent", status,
    };

    [Fact]
    public async Task Chargeback_freezes_commission_and_lost_dispute_revokes_purchase()
    {
        var seed = await fx.SeedCourse(30m);
        var (buyer, client) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var dp = "dp_" + Guid.NewGuid().ToString("N")[..10];
        var created = Kit.Event("charge.dispute.created", Dispute(dp, co.OrderId, 30m));
        Assert.Equal(HttpStatusCode.BadRequest, (await Kit.Webhook(fx, created, "whsec_wrong")).StatusCode);
        Assert.Equal("dispute_opened", (await Kit.WebhookOk(fx, created)).Status);
        Assert.Equal("duplicate", (await Kit.WebhookOk(fx, created)).Status);
        Assert.Equal("duplicate_dispute", (await Kit.WebhookOk(fx, Kit.Event("charge.dispute.created", Dispute(dp, co.OrderId, 30m))))!.Status);
        var ledger = await fx.LedgerForOrder(co.OrderId);
        Assert.Equal(0m, ledger.Sum(l => l.InstructorAmount)); // frozen
        Assert.Equal(2, ledger.Count(l => l.Kind == "Chargeback"));

        Assert.Equal("dispute_lost", (await Kit.WebhookOk(fx, Kit.Event("charge.dispute.closed", Dispute(dp, co.OrderId, 30m, "lost")))).Status);
        Assert.NotNull(await fx.Db(d => d.Entitlements.Where(e => e.OrderId == co.OrderId).Select(e => e.RevokedAt).FirstAsync()));
        Assert.Equal("dispute_already_closed", (await Kit.WebhookOk(fx, Kit.Event("charge.dispute.closed", Dispute(dp, co.OrderId, 30m, "won")))).Status);
        Assert.True(await Kit.Audits(fx, "dispute.lost") >= 1);
        var (_, finance) = await fx.User(Roles.Finance);
        Assert.Contains(await finance.GetFromJsonAsync<List<DisputeDto>>("/api/admin/disputes?status=Lost") ?? [], d => d.ProviderDisputeId == dp);
        _ = buyer;
    }

    [Fact]
    public async Task Won_dispute_reinstates_commission_and_keeps_access()
    {
        var seed = await fx.SeedCourse(30m);
        var (_, client) = await fx.User(Roles.Student);
        var co = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var dp = "dp_" + Guid.NewGuid().ToString("N")[..10];
        await Kit.WebhookOk(fx, Kit.Event("charge.dispute.created", Dispute(dp, co.OrderId, 10m)));
        var frozen = await fx.LedgerForOrder(co.OrderId);
        Assert.Equal(21m - 7m, frozen.Sum(l => l.InstructorAmount)); // 1/3 of 21 frozen
        Assert.Equal("dispute_won", (await Kit.WebhookOk(fx, Kit.Event("charge.dispute.closed", Dispute(dp, co.OrderId, 10m, "won")))).Status);
        var ledger = await fx.LedgerForOrder(co.OrderId);
        Assert.Equal(21m, ledger.Sum(l => l.InstructorAmount));
        Assert.Equal(2, ledger.Count(l => l.Kind == "ChargebackReversal"));
        Assert.Null(await fx.Db(d => d.Entitlements.Where(e => e.OrderId == co.OrderId).Select(e => e.RevokedAt).FirstAsync()));

        // Unknown payment -> rejected, recorded, 200 (no retry storm).
        var unknown = await Kit.WebhookOk(fx, Kit.Event("charge.dispute.created", new { id = "dp_unknown" + Guid.NewGuid().ToString("N")[..5], amount = 100, currency = "usd", payment_intent = "pi_nope" }));
        Assert.Equal("rejected", unknown.Status);
    }

    [Fact]
    public async Task Reconciliation_compares_payments_with_ledger_per_day()
    {
        var seed = await fx.SeedCourse(10m);
        var (_, client) = await fx.User(Roles.Student);
        await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var (_, finance) = await fx.User(Roles.Finance);
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var rec = await finance.GetFromJsonAsync<ReconciliationDto>($"/api/admin/reconciliation?from={today:yyyy-MM-dd}&to={today:yyyy-MM-dd}");
        var usd = rec!.Rows.Single(r => r.Currency == "USD");
        Assert.True(usd.Payments >= 10m);
        Assert.Equal(usd.Payments - usd.SubscriptionPayments, usd.LedgerSales + usd.SalesDifference);

        // A payment without ledger (manual DB tampering) shows up as a mismatch.
        await fx.Db(async d =>
        {
            var o = new Order { UserId = seed.Owner.Id, Status = OrderStatus.Paid, Total = 7m, Currency = "USD", IdempotencyKey = Kit.Key(), PaidAt = DateTime.UtcNow };
            d.Orders.Add(o);
            d.Payments.Add(new Payment { OrderId = o.Id, ProviderPaymentId = "pi_manual_" + Guid.NewGuid().ToString("N"), Amount = 7m, Currency = "USD" });
            await d.SaveChangesAsync();
        });
        var rec2 = await finance.GetFromJsonAsync<ReconciliationDto>($"/api/admin/reconciliation?from={today:yyyy-MM-dd}&to={today:yyyy-MM-dd}");
        var row = rec2!.Rows.Single(r => r.Currency == "USD");
        Assert.Equal("mismatch", row.Status);
        Assert.True(row.SalesDifference >= 7m);
        Assert.Equal(HttpStatusCode.BadRequest, (await finance.GetAsync($"/api/admin/reconciliation?from=2026-01-01&to=2026-12-31")).StatusCode);
        var (_, student) = await fx.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.GetAsync($"/api/admin/reconciliation?from={today:yyyy-MM-dd}&to={today:yyyy-MM-dd}")).StatusCode);
    }

    [Fact]
    public async Task Payout_profile_requests_batches_and_statements()
    {
        var seed = await fx.SeedCourse(100m);
        var (_, client) = await fx.User(Roles.Student);
        var paid = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        var owner = fx.Client(seed.Owner);
        var (_, finance) = await fx.User(Roles.Finance);

        Assert.Equal("invalid_iban", await Kit.ErrorCode(await owner.PutAsJsonAsync("/api/studio/payout-profile", new { legalName = "Owner Person", country = "DE", method = "Iban", destination = "DE00 0000 0000 0000 0000 00" })));
        var saved = await owner.PutAsJsonAsync("/api/studio/payout-profile", new { legalName = "Owner Person", country = "de", method = "Iban", destination = "DE89 3704 0044 0532 0130 00", taxFormSubmitted = true });
        Assert.True(saved.StatusCode == HttpStatusCode.OK, await saved.Content.ReadAsStringAsync());
        var profile = (await saved.Content.ReadFromJsonAsync<PayoutProfileDto>())!;
        Assert.Equal("DE** **** 3000", profile.DestinationMasked);
        Assert.Equal("Submitted", profile.TaxFormStatus);
        var cipher = await fx.Db(d => d.Set<PayoutProfile>().Where(p => p.UserId == seed.Owner.Id).Select(p => p.DestinationCipher).FirstAsync());
        Assert.DoesNotContain("37040044", cipher);
        Assert.False(await fx.Db(d => d.AuditLogs.AnyAsync(a => a.Details != null && a.Details.Contains("37040044"))));

        // Not verified yet.
        Assert.Equal("payout_profile_incomplete", await Kit.ErrorCode(await owner.PostAsJsonAsync("/api/studio/payout-requests", new { currency = "USD" })));
        Assert.Equal(HttpStatusCode.Forbidden, (await owner.PutAsJsonAsync($"/api/admin/payout-profiles/{seed.Owner.Id}/tax-form-status", new { status = "Verified" })).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await finance.PutAsJsonAsync($"/api/admin/payout-profiles/{seed.Owner.Id}/tax-form-status", new { status = "Verified" })).StatusCode);

        // Fresh earnings are not cleared until the refund window passed.
        Assert.Equal("below_minimum_payout", await Kit.ErrorCode(await owner.PostAsJsonAsync("/api/studio/payout-requests", new { currency = "USD" })));
        var balance = (await owner.GetFromJsonAsync<List<PayoutBalanceDto>>("/api/studio/balances"))!.Single(b => b.Currency == "USD");
        Assert.Equal(0m, balance.Cleared); Assert.Equal(42m, balance.Pending);

        await fx.Db(d => d.CommissionLedger.Where(e => e.OrderId == paid.OrderId).ExecuteUpdateAsync(s => s.SetProperty(e => e.CreatedAt, DateTime.UtcNow.AddDays(-31))));
        var req = await owner.PostAsJsonAsync("/api/studio/payout-requests", new { currency = "USD" });
        Assert.True(req.StatusCode == HttpStatusCode.OK, await req.Content.ReadAsStringAsync());
        var pr = (await req.Content.ReadFromJsonAsync<PayoutRequestDto>())!;
        Assert.Equal(42m, pr.Amount);
        Assert.Equal("below_minimum_payout", await Kit.ErrorCode(await owner.PostAsJsonAsync("/api/studio/payout-requests", new { currency = "USD" }))); // entries already claimed

        // The legacy sweep must not take entries reserved by a request.
        var (_, f2) = await fx.User(Roles.Finance);
        var sweep = await f2.PostAsJsonAsync("/api/admin/payout-batches", new { });
        if (sweep.StatusCode == HttpStatusCode.OK)
        {
            var b = (await sweep.Content.ReadFromJsonAsync<PayoutBatchDto>())!;
            Assert.DoesNotContain(b.Lines, l => l.InstructorId == seed.Owner.Id);
        }

        var batch = await finance.PostAsJsonAsync("/api/admin/payout-requests/batch", new { requestIds = new[] { pr.Id } });
        Assert.Equal(HttpStatusCode.OK, batch.StatusCode);
        Assert.Equal("payout_request_decided", await Kit.ErrorCode(await finance.PostAsJsonAsync("/api/admin/payout-requests/batch", new { requestIds = new[] { pr.Id } })));
        Assert.True(await fx.Db(d => d.CommissionLedger.AnyAsync(e => e.OrderId == paid.OrderId && e.InstructorId == seed.Owner.Id && e.PayoutBatchId != null)));

        // Statements (CSV + PDF) for the month the entries were created in.
        var month = DateTime.UtcNow.AddDays(-31);
        var csv = await owner.GetAsync($"/api/studio/statements?year={month.Year}&month={month.Month}&format=csv");
        Assert.Equal(HttpStatusCode.OK, csv.StatusCode);
        var text = await csv.Content.ReadAsStringAsync();
        Assert.StartsWith("date,kind,course", text);
        Assert.Contains(",Sale,", text);
        Assert.Contains("closing=42", text);
        var pdf = await finance.GetAsync($"/api/admin/instructors/{seed.Owner.Id}/statements?year={month.Year}&month={month.Month}&format=pdf");
        Assert.Equal("application/pdf", pdf.Content.Headers.ContentType!.MediaType);
        Assert.Equal(HttpStatusCode.Forbidden, (await client.GetAsync($"/api/studio/statements?year={month.Year}&month={month.Month}")).StatusCode);
    }

    [Fact]
    public async Task Rejected_payout_request_releases_entries()
    {
        var seed = await fx.SeedCourse(100m);
        var (_, client) = await fx.User(Roles.Student);
        var paid = await Kit.Pay(fx, client, new { packageId = seed.Package.Id, idempotencyKey = Kit.Key() });
        await fx.Db(d => d.CommissionLedger.Where(e => e.OrderId == paid.OrderId).ExecuteUpdateAsync(s => s.SetProperty(e => e.CreatedAt, DateTime.UtcNow.AddDays(-40))));
        var co = fx.Client(seed.CoInstructor);
        await co.PutAsJsonAsync("/api/studio/payout-profile", new { legalName = "Co Person", country = "US", method = "Email", destination = "co@pay.test" });
        var (_, finance) = await fx.User(Roles.Finance);
        await finance.PutAsJsonAsync($"/api/admin/payout-profiles/{seed.CoInstructor.Id}/tax-form-status", new { status = "Verified" });
        var pr = (await (await co.PostAsJsonAsync("/api/studio/payout-requests", new { currency = "USD" })).Content.ReadFromJsonAsync<PayoutRequestDto>())!;
        Assert.Equal(28m, pr.Amount);
        Assert.Equal(HttpStatusCode.OK, (await finance.PostAsJsonAsync($"/api/admin/payout-requests/{pr.Id}/reject", new { notes = "tax form mismatch" })).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await finance.PostAsJsonAsync($"/api/admin/payout-requests/{pr.Id}/reject", new { notes = "again" })).StatusCode);
        var again = (await (await co.PostAsJsonAsync("/api/studio/payout-requests", new { currency = "USD" })).Content.ReadFromJsonAsync<PayoutRequestDto>())!;
        Assert.Equal(28m, again.Amount);
    }
}
