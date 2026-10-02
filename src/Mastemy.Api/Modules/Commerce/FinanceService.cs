using System.Globalization;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Assessment;
using Microsoft.EntityFrameworkCore;
using PdfSharp.Drawing;
using PdfSharp.Pdf;

namespace Mastemy.Api.Modules.Commerce;

public record AdminRefundInput(decimal Amount, string Reason, bool? RevokeEntitlements);
public record DisputeDto(Guid Id, string ProviderDisputeId, Guid OrderId, decimal Amount, string Currency, string Status, string Reason, DateTime CreatedAt, DateTime? ClosedAt);
public record ReconciliationRow(DateOnly Day, string Currency, decimal Payments, decimal SubscriptionPayments, decimal LedgerSales, decimal SalesDifference,
    decimal Refunds, decimal LedgerRefundReversals, decimal RefundDifference, decimal Chargebacks, string Status);
public record ReconciliationDto(DateOnly From, DateOnly To, List<ReconciliationRow> Rows, int MismatchedDays);
public record PayoutProfileInput(string LegalName, string Country, string Method, string Destination, bool? TaxFormSubmitted);
public record PayoutProfileDto(Guid UserId, string LegalName, string Country, string Method, string DestinationMasked, string TaxFormStatus, DateTime UpdatedAt);
public record TaxFormStatusInput(string Status);
public record PayoutRequestInput(string Currency);
public record PayoutRequestDto(Guid Id, Guid InstructorId, string Currency, decimal Amount, string Status, Guid? PayoutBatchId, int Entries, DateTime CreatedAt, string? Notes);
public record PayoutBalanceDto(string Currency, decimal Cleared, decimal Pending, decimal MinimumPayout);
public record BatchRequestsInput(List<Guid> RequestIds);
public record RejectInput(string? Notes);

/// <summary>
/// Finance operations: partial/full refunds with ledger reversal and credit notes, chargebacks, reconciliation,
/// instructor payout profiles/requests and monthly statements.
/// </summary>
public class FinanceService(AppDbContext db, ICurrentUser me, AuditService audit, IPaymentProvider provider, LedgerService ledger,
    InvoiceService invoices, SecretProtector protector, IConfiguration cfg, ILogger<FinanceService> log)
{
    public int RefundWindowDays => Math.Max(0, cfg.GetValue("Commerce:RefundWindowDays", 30));
    private decimal MinimumPayout => Math.Max(0m, cfg.GetValue("Payouts:MinimumAmount", 50m));

    public async Task<OrderDetail> EnsureDetail(Order order)
    {
        var d = await db.Set<OrderDetail>().FirstOrDefaultAsync(x => x.OrderId == order.Id);
        if (d is not null) return d;
        d = new OrderDetail { OrderId = order.Id, Kind = "Package", ListAmount = order.Total, Fingerprint = "legacy" };
        db.Set<OrderDetail>().Add(d);
        await db.SaveChangesAsync();
        return d;
    }

    // ===================== Refund engine =====================

    /// <summary>
    /// Executes a claimed refund (status Processing). Reserves the amount atomically against the order's remaining
    /// refundable balance, calls the provider (idempotent per refund id), then — in one transaction — completes the refund,
    /// reverses commission pro-rata, revokes entitlements on a full refund (or when finance chooses), and issues a credit note.
    /// Any failure before completion undoes the reservation and rethrows.
    /// </summary>
    public async Task ExecuteRefund(Refund r, Order order, bool? revokeEntitlements, string? notes)
    {
        if (order.Status is not (OrderStatus.Paid or OrderStatus.PartiallyRefunded)) throw AppException.Conflict("Order is not in a refundable state.", "order_not_paid");
        var detail = await EnsureDetail(order);
        var amount = r.Amount;
        if (amount <= 0 || !Money.IsValidAmount(amount, order.Currency)) throw AppException.Bad("Refund amount is invalid for the order currency.", "invalid_amount");
        var remainingBefore = order.Total - detail.RefundedAmount;
        if (amount > remainingBefore) throw AppException.Conflict($"Refund exceeds the remaining refundable amount ({remainingBefore} {order.Currency}).", "refund_exceeds_remaining");
        var full = amount == remainingBefore;

        var gift = await db.Set<GiftCode>().AsNoTracking().FirstOrDefaultAsync(g => g.OrderId == order.Id);
        var giftVoided = false;
        if (gift is not null)
        {
            if (!full || detail.RefundedAmount > 0) throw AppException.Bad("Gift purchases can only be refunded in full.", "gift_partial_refund_not_allowed");
            var voided = await db.Set<GiftCode>().Where(g => g.Id == gift.Id && g.Status == "Active").ExecuteUpdateAsync(s => s.SetProperty(g => g.Status, "Void"));
            if (voided != 1) throw AppException.Conflict("The gift has already been redeemed and can no longer be refunded.", "gift_already_redeemed");
            giftVoided = true;
        }

        var total = order.Total;
        var reserved = await db.Set<OrderDetail>().Where(d => d.OrderId == order.Id && d.RefundedAmount + amount <= total)
            .ExecuteUpdateAsync(s => s.SetProperty(d => d.RefundedAmount, d => d.RefundedAmount + amount));
        if (reserved != 1)
        {
            if (giftVoided) await db.Set<GiftCode>().Where(g => g.Id == gift!.Id).ExecuteUpdateAsync(s => s.SetProperty(g => g.Status, "Active"));
            throw AppException.Conflict("Refund exceeds the remaining refundable amount.", "refund_exceeds_remaining");
        }

        ProviderRefundResult pr;
        try
        {
            var payment = await db.Payments.AsNoTracking().Where(p => p.OrderId == order.Id).OrderBy(p => p.CreatedAt).FirstOrDefaultAsync()
                          ?? throw AppException.Conflict("No captured payment found for this order.", "payment_missing");
            pr = await provider.RefundPayment(payment.ProviderPaymentId, Money.ToMinor(amount, order.Currency), order.Id, "refund-" + r.Id);
        }
        catch
        {
            await db.Set<OrderDetail>().Where(d => d.OrderId == order.Id).ExecuteUpdateAsync(s => s.SetProperty(d => d.RefundedAmount, d => d.RefundedAmount - amount));
            if (giftVoided) await db.Set<GiftCode>().Where(g => g.Id == gift!.Id).ExecuteUpdateAsync(s => s.SetProperty(g => g.Status, "Active"));
            throw;
        }

        var now = DateTime.UtcNow;
        await db.Entry(detail).ReloadAsync();
        await using var tx = await db.Database.BeginTransactionAsync();
        r.Status = "Completed";
        r.ProviderRefundId = pr.RefundId;
        r.DecidedAt ??= now;
        var fullyRefunded = detail.RefundedAmount >= order.Total;
        order.Status = fullyRefunded ? OrderStatus.Refunded : OrderStatus.PartiallyRefunded;
        var reversals = await ledger.Reverse(order.Id, amount, order.Total, fullyRefunded, "RefundReversal", "Refund", r.Id);
        var revoke = fullyRefunded || revokeEntitlements == true;
        List<Guid> revokedEnts = [], revokedCerts = [];
        if (revoke)
        {
            var ents = await db.Entitlements.Where(e => e.OrderId == order.Id && e.RevokedAt == null).ToListAsync();
            foreach (var e in ents) e.RevokedAt = now;
            revokedEnts = ents.Select(e => e.Id).ToList();
            revokedCerts = await RevokePremiumCertificates(order, now, "refund");
        }
        await invoices.IssueCreditNote(order, r, amount, now);
        audit.Record(fullyRefunded ? "refund.approved" : "refund.partial", nameof(Refund), r.Id,
            new { r.OrderId, amount, pr.RefundId, refundedTotal = detail.RefundedAmount, reversals = reversals.Count, revokedEntitlements = revokedEnts, revokedCertificates = revokedCerts, notes });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
    }

    public async Task<RefundDto> AdminRefund(Guid orderId, AdminRefundInput input)
    {
        var uid = me.RequireId();
        var reason = (input.Reason ?? "").Trim();
        if (reason.Length is < 3 or > 500) throw AppException.Bad("Reason must be 3-500 characters.");
        var order = await db.Orders.FirstOrDefaultAsync(o => o.Id == orderId) ?? throw AppException.NotFound("Order");
        if (!Money.IsValidAmount(input.Amount, order.Currency) || input.Amount <= 0) throw AppException.Bad("Amount is invalid for the order currency.", "invalid_amount");
        var r = new Refund { OrderId = orderId, Amount = input.Amount, Reason = reason, Status = "Processing", RequestedBy = uid, DecidedBy = uid, DecidedAt = DateTime.UtcNow };
        db.Refunds.Add(r);
        audit.Record("refund.initiated", nameof(Refund), r.Id, new { orderId, input.Amount, input.RevokeEntitlements });
        await db.SaveChangesAsync();
        try { await ExecuteRefund(r, order, input.RevokeEntitlements, null); }
        catch
        {
            db.ChangeTracker.Clear();
            await db.Refunds.Where(x => x.Id == r.Id && x.Status == "Processing").ExecuteUpdateAsync(s => s.SetProperty(x => x.Status, "Failed"));
            throw;
        }
        return new RefundDto(r.Id, orderId, order.UserId, r.Amount, order.Currency, r.Reason, r.Status, r.ProviderRefundId, r.CreatedAt);
    }

    /// <summary>
    /// A certificate earned through a premium (paid) assessment depends on the purchase: revoke it unless the user
    /// still holds another active entitlement for the course (e.g. organization grant, subscription or another order).
    /// </summary>
    public async Task<List<Guid>> RevokePremiumCertificates(Order order, DateTime now, string reason)
    {
        var courseIds = await db.OrderItems.AsNoTracking().Where(i => i.OrderId == order.Id).Select(i => i.CourseId).Distinct().ToListAsync();
        var revoked = new List<Guid>();
        foreach (var courseId in courseIds)
        {
            var stillEntitled = await db.Entitlements.AnyAsync(e => e.UserId == order.UserId && e.CourseId == courseId && e.OrderId != order.Id
                && e.RevokedAt == null && e.StartsAt <= now && (e.EndsAt == null || e.EndsAt > now));
            if (stillEntitled) continue;
            var certs = await (from c in db.Certificates
                               join at in db.Attempts on c.AttemptId equals at.Id
                               join a in db.Assessments on at.AssessmentId equals a.Id
                               where c.UserId == order.UserId && c.CourseId == courseId && c.Status == CertificateStatus.Valid && a.IsPremium
                               select c).ToListAsync();
            foreach (var c in certs)
            {
                c.Status = CertificateStatus.Revoked;
                c.RevocationReason = reason == "refund"
                    ? "Refunded purchase: certificate was earned through premium assessment access."
                    : "Payment reversed (chargeback): certificate was earned through premium assessment access.";
                audit.Record("certificate.revoked", nameof(Certificate), c.Id, new { reason, order.Id, courseId });
                revoked.Add(c.Id);
            }
        }
        return revoked;
    }

    // ===================== Chargebacks =====================

    private static string? Str(JsonElement e, string name) =>
        e.ValueKind == JsonValueKind.Object && e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString() : null;

    private static long? Long(JsonElement e, string name) =>
        e.ValueKind == JsonValueKind.Object && e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.Number && v.TryGetInt64(out var l) ? l : null;

    public async Task<WebhookResult> OnDisputeCreated(JsonElement obj, string eventId)
    {
        var (dispute, result) = await OpenDispute(obj, eventId);
        return result ?? new WebhookResult("dispute_opened");
    }

    private async Task<(Dispute? Dispute, WebhookResult? Result)> OpenDispute(JsonElement obj, string eventId)
    {
        var providerId = Str(obj, "id");
        if (string.IsNullOrEmpty(providerId)) return (null, Rejected(eventId, null, "dispute_id_missing"));
        var existing = await db.Set<Dispute>().FirstOrDefaultAsync(d => d.ProviderDisputeId == providerId);
        if (existing is not null) return (existing, new WebhookResult("duplicate_dispute"));
        var pi = Str(obj, "payment_intent"); var charge = Str(obj, "charge");
        var payment = await db.Payments.AsNoTracking().FirstOrDefaultAsync(p => p.ProviderPaymentId == pi || p.ProviderPaymentId == charge);
        if (payment is null) return (null, Rejected(eventId, null, "payment_not_found"));
        var order = await db.Orders.FirstAsync(o => o.Id == payment.OrderId);
        var amountMinor = Long(obj, "amount"); var currency = Str(obj, "currency");
        if (amountMinor is null || currency is null || !string.Equals(currency, order.Currency, StringComparison.OrdinalIgnoreCase))
            return (null, Rejected(eventId, order.Id, "dispute_amount_or_currency_invalid"));
        var amount = Math.Min(Money.FromMinor(amountMinor.Value, order.Currency), order.Total);
        var detail = await EnsureDetail(order);
        var d = new Dispute { ProviderDisputeId = providerId, OrderId = order.Id, Amount = amount, Currency = order.Currency, Reason = (Str(obj, "reason") ?? "").Length > 255 ? Str(obj, "reason")![..255] : Str(obj, "reason") ?? "" };
        db.Set<Dispute>().Add(d);
        detail.DisputeStatus = "Open";
        // Freeze: instructors' share of the disputed amount is reversed immediately; reinstated if the dispute is won.
        var remaining = order.Total - detail.RefundedAmount;
        var entries = await ledger.Reverse(order.Id, amount, order.Total, amount >= remaining, "Chargeback", "Dispute", d.Id);
        audit.Record("dispute.opened", nameof(Dispute), d.Id, new { eventId, providerId, order.Id, amount, frozenEntries = entries.Count });
        return (d, null);
    }

    public async Task<WebhookResult> OnDisputeClosed(JsonElement obj, string eventId)
    {
        var (d, rejected) = await OpenDispute(obj, eventId);
        if (d is null) return rejected!;
        if (d.Status != "Open") return new WebhookResult("dispute_already_closed");
        var status = Str(obj, "status");
        var order = await db.Orders.FirstAsync(o => o.Id == d.OrderId);
        var detail = await EnsureDetail(order);
        var now = DateTime.UtcNow;
        if (status is "won" or "warning_closed")
        {
            d.Status = "Won"; d.ClosedAt = now; detail.DisputeStatus = "Won";
            await db.SaveChangesAsync(); // persist the freeze written by OpenDispute (out-of-order closed events) before reinstating
            var reinstated = await ledger.Reinstate(order.Id, d.Id);
            audit.Record("dispute.won", nameof(Dispute), d.Id, new { eventId, order.Id, reinstated = reinstated.Count });
            return new WebhookResult("dispute_won");
        }
        if (status == "lost")
        {
            d.Status = "Lost"; d.ClosedAt = now; detail.DisputeStatus = "Lost";
            var ents = await db.Entitlements.Where(e => e.OrderId == order.Id && e.Source == EntitlementSource.Purchase && e.RevokedAt == null).ToListAsync();
            foreach (var e in ents) e.RevokedAt = now;
            await db.Set<GiftCode>().Where(g => g.OrderId == order.Id && g.Status == "Active").ExecuteUpdateAsync(s => s.SetProperty(g => g.Status, "Void"));
            var certs = await RevokePremiumCertificates(order, now, "chargeback");
            audit.Record("dispute.lost", nameof(Dispute), d.Id, new { eventId, order.Id, revokedEntitlements = ents.Select(e => e.Id), revokedCertificates = certs });
            return new WebhookResult("dispute_lost");
        }
        audit.Record("dispute.updated", nameof(Dispute), d.Id, new { eventId, status });
        return new WebhookResult("dispute_recorded", status);
    }

    private WebhookResult Rejected(string eventId, Guid? orderId, string reason)
    {
        log.LogWarning("Stripe event {EventId} rejected: {Reason}", eventId, reason);
        audit.Record("stripe.event_rejected", "WebhookEvent", eventId, new { reason, orderId });
        return new WebhookResult("rejected", reason);
    }

    public async Task<List<DisputeDto>> Disputes(string? status)
    {
        var q = db.Set<Dispute>().AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status)) q = q.Where(d => d.Status == status);
        return await q.OrderByDescending(d => d.CreatedAt).Take(500)
            .Select(d => new DisputeDto(d.Id, d.ProviderDisputeId, d.OrderId, d.Amount, d.Currency, d.Status, d.Reason, d.CreatedAt, d.ClosedAt)).ToListAsync();
    }

    // ===================== Reconciliation =====================

    /// <summary>
    /// Per UTC day and currency: provider payments vs ledger. SalesDifference = Payments − SubscriptionPayments − LedgerSales
    /// (ledger sales = Σ instructor + platform of Sale entries, i.e. the gross recognised for package/bundle/gift orders;
    /// subscription revenue reaches the ledger through the monthly pool instead). RefundDifference = package refunds +
    /// RefundReversal ledger totals. Non-zero differences are flagged "mismatch".
    /// </summary>
    public async Task<ReconciliationDto> Reconcile(DateOnly from, DateOnly to)
    {
        if (to < from) throw AppException.Bad("'to' must not be before 'from'.");
        if (to.DayNumber - from.DayNumber > 92) throw AppException.Bad("The range may span at most 93 days.");
        var start = from.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
        var end = to.AddDays(1).ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
        var payments = await db.Payments.AsNoTracking().Where(p => p.CreatedAt >= start && p.CreatedAt < end)
            .Select(p => new { p.CreatedAt, p.Currency, p.Amount }).ToListAsync();
        var subs = await db.Set<SubscriptionInvoice>().AsNoTracking().Where(s => s.PaidAt >= start && s.PaidAt < end)
            .Select(s => new { s.PaidAt, s.Currency, s.Amount, s.OrderId }).ToListAsync();
        var subOrderIds = await db.Set<OrderDetail>().AsNoTracking().Where(d => d.Kind == "SubscriptionInvoice").Select(d => d.OrderId).ToListAsync();
        var ledgerRows = await db.CommissionLedger.AsNoTracking().Where(e => e.CreatedAt >= start && e.CreatedAt < end && (e.Kind == "Sale" || e.Kind == "RefundReversal" || e.Kind == "Chargeback"))
            .Select(e => new { e.CreatedAt, e.Currency, e.Kind, Total = e.InstructorAmount + e.PlatformAmount }).ToListAsync();
        var refunds = await (from r in db.Refunds.AsNoTracking()
                             join o in db.Orders.AsNoTracking() on r.OrderId equals o.Id
                             where r.Status == "Completed" && r.DecidedAt >= start && r.DecidedAt < end
                             select new { At = r.DecidedAt!.Value, o.Currency, r.Amount, r.OrderId }).ToListAsync();
        var keys = payments.Select(p => (DateOnly.FromDateTime(p.CreatedAt), p.Currency))
            .Concat(ledgerRows.Select(l => (DateOnly.FromDateTime(l.CreatedAt), l.Currency)))
            .Concat(refunds.Select(r => (DateOnly.FromDateTime(r.At), r.Currency))).Distinct().OrderBy(k => k.Item1).ThenBy(k => k.Item2).ToList();
        var rows = new List<ReconciliationRow>();
        foreach (var (day, cur) in keys)
        {
            bool Same(DateTime t, string c) => DateOnly.FromDateTime(t) == day && c == cur;
            var pay = payments.Where(p => Same(p.CreatedAt, p.Currency)).Sum(p => p.Amount);
            var sub = subs.Where(s => Same(s.PaidAt, s.Currency)).Sum(s => s.Amount);
            var sales = ledgerRows.Where(l => l.Kind == "Sale" && Same(l.CreatedAt, l.Currency)).Sum(l => l.Total);
            var refundsPkg = refunds.Where(r => Same(r.At, r.Currency) && !subOrderIds.Contains(r.OrderId)).Sum(r => r.Amount);
            var reversals = ledgerRows.Where(l => l.Kind == "RefundReversal" && Same(l.CreatedAt, l.Currency)).Sum(l => l.Total);
            var chargebacks = ledgerRows.Where(l => l.Kind == "Chargeback" && Same(l.CreatedAt, l.Currency)).Sum(l => l.Total);
            var salesDiff = pay - sub - sales;
            var refundDiff = refundsPkg + reversals;
            rows.Add(new ReconciliationRow(day, cur, pay, sub, sales, salesDiff, refundsPkg, reversals, refundDiff, chargebacks,
                salesDiff == 0 && refundDiff == 0 ? "ok" : "mismatch"));
        }
        return new ReconciliationDto(from, to, rows, rows.Where(r => r.Status == "mismatch").Select(r => r.Day).Distinct().Count());
    }

    // ===================== Payout profile =====================

    private static readonly Regex IbanPattern = new("^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$", RegexOptions.CultureInvariant);

    public static bool IsValidIban(string iban)
    {
        if (!IbanPattern.IsMatch(iban)) return false;
        var rearranged = iban[4..] + iban[..4];
        var rem = 0;
        foreach (var ch in rearranged)
        {
            var v = char.IsDigit(ch) ? ch - '0' : ch - 'A' + 10;
            rem = v >= 10 ? (rem * 100 + v) % 97 : (rem * 10 + v) % 97;
        }
        return rem == 1;
    }

    private static PayoutProfileDto ToDto(PayoutProfile p) => new(p.UserId, p.LegalName, p.Country, p.Method, p.DestinationMasked, p.TaxFormStatus, p.UpdatedAt);

    public async Task<PayoutProfileDto?> MyPayoutProfile()
    {
        var uid = me.RequireId();
        var p = await db.Set<PayoutProfile>().AsNoTracking().FirstOrDefaultAsync(x => x.UserId == uid);
        return p is null ? null : ToDto(p);
    }

    public async Task<PayoutProfileDto> SavePayoutProfile(PayoutProfileInput input)
    {
        var uid = me.RequireId();
        var name = (input.LegalName ?? "").Trim();
        if (name.Length is < 2 or > 200) throw AppException.Bad("Legal name must be 2-200 characters.");
        var country = CommerceText.OptionalCountry(input.Country) ?? throw AppException.Bad("Country is required.", "invalid_country");
        string dest, masked;
        switch (input.Method)
        {
            case "Email":
                dest = (input.Destination ?? "").Trim();
                if (!Regex.IsMatch(dest, @"^[^@\s]+@[^@\s]+\.[^@\s]+$") || dest.Length > 255) throw AppException.Bad("A valid payout email is required.");
                var at = dest.IndexOf('@');
                masked = dest[..1] + "***" + dest[at..];
                break;
            case "Iban":
                dest = Regex.Replace((input.Destination ?? "").ToUpperInvariant(), @"\s+", "");
                if (!IsValidIban(dest)) throw AppException.Bad("IBAN is not valid.", "invalid_iban");
                masked = dest[..2] + "** **** " + dest[^4..];
                break;
            default: throw AppException.Bad("Method must be Email or Iban.");
        }
        var p = await db.Set<PayoutProfile>().FirstOrDefaultAsync(x => x.UserId == uid);
        var isNew = p is null;
        if (p is null) { p = new PayoutProfile { UserId = uid }; db.Set<PayoutProfile>().Add(p); }
        var destinationChanged = isNew || p.DestinationMasked != masked || p.Method != input.Method;
        p.LegalName = name; p.Country = country; p.Method = input.Method; p.DestinationCipher = protector.Protect(dest); p.DestinationMasked = masked;
        if (input.TaxFormSubmitted == true && p.TaxFormStatus is "NotSubmitted" or "Rejected") p.TaxFormStatus = "Submitted";
        p.UpdatedAt = DateTime.UtcNow;
        // Never audit the destination itself; only that it changed.
        audit.Record("payout_profile.saved", nameof(PayoutProfile), uid, new { country, input.Method, destinationChanged, p.TaxFormStatus });
        await db.SaveChangesAsync();
        return ToDto(p);
    }

    public async Task<PayoutProfileDto> SetTaxFormStatus(Guid userId, TaxFormStatusInput input)
    {
        if (input.Status is not ("NotSubmitted" or "Submitted" or "Verified" or "Rejected")) throw AppException.Bad("Status must be NotSubmitted, Submitted, Verified or Rejected.");
        var p = await db.Set<PayoutProfile>().FirstOrDefaultAsync(x => x.UserId == userId) ?? throw AppException.NotFound("Payout profile");
        var old = p.TaxFormStatus;
        p.TaxFormStatus = input.Status; p.UpdatedAt = DateTime.UtcNow;
        audit.Record("payout_profile.tax_form_status", nameof(PayoutProfile), userId, new { old, @new = input.Status });
        await db.SaveChangesAsync();
        return ToDto(p);
    }

    public async Task<List<PayoutProfileDto>> PayoutProfiles() =>
        (await db.Set<PayoutProfile>().AsNoTracking().OrderBy(p => p.LegalName).Take(1000).ToListAsync()).Select(ToDto).ToList();

    // ===================== Payout requests =====================

    /// <summary>Unbatched, unclaimed entries. Positive entries are cleared only once older than the refund window; negatives always count.</summary>
    private IQueryable<CommissionLedgerEntry> Claimable(Guid instructorId, string currency, bool clearedOnly)
    {
        var cutoff = DateTime.UtcNow.AddDays(-RefundWindowDays);
        var q = db.CommissionLedger.Where(e => e.InstructorId == instructorId && e.Currency == currency && e.PayoutBatchId == null
                                               && !db.Set<PayoutRequestEntry>().Any(r => r.LedgerEntryId == e.Id));
        return clearedOnly ? q.Where(e => e.InstructorAmount < 0 || e.CreatedAt <= cutoff) : q;
    }

    public async Task<List<PayoutBalanceDto>> MyBalances()
    {
        var uid = me.RequireId();
        var currencies = await db.CommissionLedger.AsNoTracking().Where(e => e.InstructorId == uid).Select(e => e.Currency).Distinct().ToListAsync();
        var res = new List<PayoutBalanceDto>();
        foreach (var c in currencies.OrderBy(c => c))
        {
            var cleared = await Claimable(uid, c, true).SumAsync(e => (decimal?)e.InstructorAmount) ?? 0m;
            var all = await Claimable(uid, c, false).SumAsync(e => (decimal?)e.InstructorAmount) ?? 0m;
            res.Add(new PayoutBalanceDto(c, cleared, all - cleared, MinimumPayout));
        }
        return res;
    }

    private async Task<PayoutRequestDto> ToDto(PayoutRequest r) => new(r.Id, r.InstructorId, r.Currency, r.Amount, r.Status, r.PayoutBatchId,
        await db.Set<PayoutRequestEntry>().CountAsync(x => x.PayoutRequestId == r.Id), r.CreatedAt, r.Notes);

    public async Task<PayoutRequestDto> RequestPayout(PayoutRequestInput input)
    {
        var uid = me.RequireId();
        var cur = CommerceText.Currency(input.Currency);
        var profile = await db.Set<PayoutProfile>().AsNoTracking().FirstOrDefaultAsync(p => p.UserId == uid);
        if (profile is null || profile.TaxFormStatus != "Verified")
            throw AppException.Bad("Complete your payout profile and have your tax form verified before requesting a payout.", "payout_profile_incomplete");
        await using var tx = await db.Database.BeginTransactionAsync();
        var entries = await Claimable(uid, cur, true).Select(e => new { e.Id, e.InstructorAmount }).ToListAsync();
        var amount = entries.Sum(e => e.InstructorAmount);
        if (amount < MinimumPayout || amount <= 0)
            throw AppException.Bad($"Cleared balance {amount} {cur} is below the minimum payout of {MinimumPayout}.", "below_minimum_payout");
        var r = new PayoutRequest { InstructorId = uid, Currency = cur, Amount = amount };
        db.Set<PayoutRequest>().Add(r);
        foreach (var e in entries) db.Set<PayoutRequestEntry>().Add(new PayoutRequestEntry { LedgerEntryId = e.Id, PayoutRequestId = r.Id });
        audit.Record("payout_request.created", nameof(PayoutRequest), r.Id, new { cur, amount, entries = entries.Count });
        try { await db.SaveChangesAsync(); await tx.CommitAsync(); }
        catch (DbUpdateException)
        {
            // A concurrent request claimed some of the same entries (primary key on LedgerEntryId).
            throw AppException.Conflict("Another payout request is being created. Retry.", "payout_request_conflict");
        }
        return await ToDto(r);
    }

    public async Task<List<PayoutRequestDto>> MyPayoutRequests()
    {
        var uid = me.RequireId();
        var list = await db.Set<PayoutRequest>().AsNoTracking().Where(r => r.InstructorId == uid).OrderByDescending(r => r.CreatedAt).Take(200).ToListAsync();
        var res = new List<PayoutRequestDto>();
        foreach (var r in list) res.Add(await ToDto(r));
        return res;
    }

    public async Task<List<PayoutRequestDto>> PayoutRequests(string? status)
    {
        var q = db.Set<PayoutRequest>().AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status)) q = q.Where(r => r.Status == status);
        var list = await q.OrderBy(r => r.CreatedAt).Take(500).ToListAsync();
        var res = new List<PayoutRequestDto>();
        foreach (var r in list) res.Add(await ToDto(r));
        return res;
    }

    public async Task<PayoutRequestDto> RejectPayoutRequest(Guid id, RejectInput input)
    {
        var uid = me.RequireId();
        await using var tx = await db.Database.BeginTransactionAsync();
        var claimed = await db.Set<PayoutRequest>().Where(r => r.Id == id && r.Status == "Requested")
            .ExecuteUpdateAsync(s => s.SetProperty(r => r.Status, "Rejected").SetProperty(r => r.DecidedBy, (Guid?)uid).SetProperty(r => r.DecidedAt, (DateTime?)DateTime.UtcNow)
                .SetProperty(r => r.Notes, input.Notes == null ? null : input.Notes.Length > 500 ? input.Notes.Substring(0, 500) : input.Notes));
        if (claimed != 1)
        {
            if (!await db.Set<PayoutRequest>().AnyAsync(r => r.Id == id)) throw AppException.NotFound("Payout request");
            throw AppException.Conflict("Payout request is no longer pending.", "payout_request_decided");
        }
        await db.Set<PayoutRequestEntry>().Where(x => x.PayoutRequestId == id).ExecuteDeleteAsync(); // release the entries
        audit.Record("payout_request.rejected", nameof(PayoutRequest), id, new { input.Notes });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await ToDto(await db.Set<PayoutRequest>().AsNoTracking().FirstAsync(r => r.Id == id));
    }

    /// <summary>Finance groups pending requests into a Draft payout batch (approved by a second person through the batch flow).</summary>
    public async Task<Guid> BatchRequests(BatchRequestsInput input)
    {
        var uid = me.RequireId();
        var ids = (input.RequestIds ?? []).Distinct().ToList();
        if (ids.Count is < 1 or > 500) throw AppException.Bad("Provide 1-500 request ids.");
        await using var tx = await db.Database.BeginTransactionAsync();
        var batch = new PayoutBatch { CreatedBy = uid, Status = "Draft" };
        db.PayoutBatches.Add(batch);
        await db.SaveChangesAsync();
        var claimed = await db.Set<PayoutRequest>().Where(r => ids.Contains(r.Id) && r.Status == "Requested")
            .ExecuteUpdateAsync(s => s.SetProperty(r => r.Status, "Batched").SetProperty(r => r.PayoutBatchId, (Guid?)batch.Id)
                .SetProperty(r => r.DecidedBy, (Guid?)uid).SetProperty(r => r.DecidedAt, (DateTime?)DateTime.UtcNow));
        if (claimed != ids.Count)
        {
            await tx.RollbackAsync();
            throw AppException.Conflict("Some payout requests are not pending.", "payout_request_decided");
        }
        var entryIds = db.Set<PayoutRequestEntry>().Where(x => ids.Contains(x.PayoutRequestId)).Select(x => x.LedgerEntryId);
        var moved = await db.CommissionLedger.Where(e => entryIds.Contains(e.Id) && e.PayoutBatchId == null)
            .ExecuteUpdateAsync(s => s.SetProperty(e => e.PayoutBatchId, (Guid?)batch.Id));
        audit.Record("payout_batch.created_from_requests", nameof(PayoutBatch), batch.Id, new { requests = ids, entries = moved });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return batch.Id;
    }

    // ===================== Statements =====================

    public record StatementLine(DateTime Date, string Kind, string Course, Guid Document, string Currency, decimal Gross, decimal InstructorAmount, decimal PlatformAmount, Guid? PayoutBatchId);

    public async Task<(List<StatementLine> Lines, Dictionary<string, decimal> Opening)> Statement(Guid instructorId, int year, int month)
    {
        if (year is < 2000 or > 2100 || month is < 1 or > 12) throw AppException.Bad("Invalid statement period.");
        var start = new DateTime(year, month, 1, 0, 0, 0, DateTimeKind.Utc);
        var end = start.AddMonths(1);
        var entries = await db.CommissionLedger.AsNoTracking().Where(e => e.InstructorId == instructorId && e.CreatedAt >= start && e.CreatedAt < end)
            .OrderBy(e => e.CreatedAt).ThenBy(e => e.Id).ToListAsync();
        var opening = await db.CommissionLedger.AsNoTracking().Where(e => e.InstructorId == instructorId && e.CreatedAt < start)
            .GroupBy(e => e.Currency).Select(g => new { g.Key, Sum = g.Sum(e => e.InstructorAmount) }).ToDictionaryAsync(x => x.Key, x => x.Sum);
        var courseIds = entries.Select(e => e.CourseId).Distinct().ToList();
        var titles = await db.Courses.AsNoTracking().Where(c => courseIds.Contains(c.Id)).ToDictionaryAsync(c => c.Id, c => c.Title);
        return (entries.Select(e => new StatementLine(e.CreatedAt, e.Kind, titles.GetValueOrDefault(e.CourseId, ""), e.OrderId, e.Currency, e.GrossAmount,
            e.InstructorAmount, e.PlatformAmount, e.PayoutBatchId)).ToList(), opening);
    }

    private static string Csv(string s) => s.IndexOfAny([',', '"', '\n', '\r']) >= 0 || s.StartsWith('=') || s.StartsWith('+') || s.StartsWith('-') || s.StartsWith('@')
        ? "\"" + (s.StartsWith('=') || s.StartsWith('+') || s.StartsWith('-') || s.StartsWith('@') ? "'" : "") + s.Replace("\"", "\"\"") + "\"" : s;

    public async Task<(byte[] Content, string ContentType, string FileName)> StatementFile(Guid instructorId, int year, int month, string? format)
    {
        var (lines, opening) = await Statement(instructorId, year, month);
        var name = $"statement-{year:D4}-{month:D2}";
        var inv = CultureInfo.InvariantCulture;
        if (format is null or "csv")
        {
            var sb = new StringBuilder();
            sb.AppendLine("date,kind,course,document,currency,gross,instructor_amount,platform_amount,payout_batch");
            foreach (var l in lines)
                sb.AppendLine(string.Join(',', l.Date.ToString("yyyy-MM-ddTHH:mm:ssZ", inv), l.Kind, Csv(l.Course), l.Document, l.Currency,
                    l.Gross.ToString(inv), l.InstructorAmount.ToString(inv), l.PlatformAmount.ToString(inv), l.PayoutBatchId?.ToString() ?? ""));
            foreach (var cur in lines.Select(l => l.Currency).Concat(opening.Keys).Distinct().OrderBy(c => c))
            {
                var open = opening.GetValueOrDefault(cur);
                var net = lines.Where(l => l.Currency == cur).Sum(l => l.InstructorAmount);
                sb.AppendLine($"# {cur} opening={open.ToString(inv)} net={net.ToString(inv)} closing={(open + net).ToString(inv)}");
            }
            return (Encoding.UTF8.GetBytes(sb.ToString()), "text/csv; charset=utf-8", name + ".csv");
        }
        if (format != "pdf") throw AppException.Bad("format must be csv or pdf.");
        var legal = await db.Set<PayoutProfile>().AsNoTracking().Where(p => p.UserId == instructorId).Select(p => p.LegalName).FirstOrDefaultAsync()
                    ?? await db.Users.AsNoTracking().Where(u => u.Id == instructorId).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "";
        BundledFontResolver.EnsureInstalled();
        using var doc = new PdfDocument();
        doc.Info.Title = $"Mastemy earnings statement {year:D4}-{month:D2}";
        var font = new XFont(BundledFontResolver.Sans, 8, XFontStyleEx.Regular);
        var bold = new XFont(BundledFontResolver.Sans, 12, XFontStyleEx.Bold);
        PdfPage page = null!; XGraphics g = null!; double y = 0;
        void NewPage()
        {
            g?.Dispose();
            page = doc.AddPage(); page.Width = XUnit.FromPoint(842); page.Height = XUnit.FromPoint(595);
            g = XGraphics.FromPdfPage(page); y = 40;
        }
        void Row(string text, XFont f) { if (y > 560) NewPage(); g.DrawString(text, f, XBrushes.Black, 30, y); y += 13; }
        NewPage();
        Row($"Earnings statement {year:D4}-{month:D2} - {legal}", bold); y += 6;
        Row("Date        Kind                 Currency  Gross        Instructor   Platform     Course", font);
        foreach (var l in lines)
            Row($"{l.Date:yyyy-MM-dd}  {l.Kind,-20} {l.Currency,-8}  {l.Gross,11:0.00}  {l.InstructorAmount,11:0.00}  {l.PlatformAmount,11:0.00}  {(l.Course.Length > 60 ? l.Course[..60] : l.Course)}", font);
        y += 6;
        foreach (var cur in lines.Select(l => l.Currency).Concat(opening.Keys).Distinct().OrderBy(c => c))
        {
            var open = opening.GetValueOrDefault(cur); var net = lines.Where(l => l.Currency == cur).Sum(l => l.InstructorAmount);
            Row($"{cur}: opening {open.ToString("0.00", inv)}, net {net.ToString("0.00", inv)}, closing {(open + net).ToString("0.00", inv)}", font);
        }
        Row("Earnings come only from paid study services and verified subscription consumption; never from YouTube views.", font);
        g.Dispose();
        using var ms = new MemoryStream();
        doc.Save(ms, false);
        return (ms.ToArray(), "application/pdf", name + ".pdf");
    }
}
