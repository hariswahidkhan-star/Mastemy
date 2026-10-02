using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Commerce;

/// <summary>
/// Writes commission ledger entries together with their <see cref="LedgerSource"/> provenance, and computes
/// pro-rata reversals (refunds, chargebacks) so that the sum of reversals never exceeds the original entry.
/// Ledger kinds: Sale, Affiliate, RefundReversal, Chargeback, ChargebackReversal, SubscriptionPool.
/// </summary>
public class LedgerService(AppDbContext db)
{
    public void Add(CommissionLedgerEntry e, Guid? realOrderId, string sourceType, Guid sourceId, Guid? relatedEntryId = null)
    {
        db.CommissionLedger.Add(e);
        db.Set<LedgerSource>().Add(new LedgerSource { LedgerEntryId = e.Id, OrderId = realOrderId, SourceType = sourceType, SourceId = sourceId, RelatedEntryId = relatedEntryId });
    }

    /// <summary>Positive revenue entries of an order (Sale + Affiliate), including entries written before provenance existed.</summary>
    public async Task<List<CommissionLedgerEntry>> OriginalEntries(Guid orderId)
    {
        var withSource = await (from s in db.Set<LedgerSource>()
                                join e in db.CommissionLedger on s.LedgerEntryId equals e.Id
                                where s.OrderId == orderId && (e.Kind == "Sale" || e.Kind == "Affiliate")
                                select e).ToListAsync();
        var legacy = await db.CommissionLedger.Where(e => e.OrderId == orderId && e.Kind == "Sale"
                                                          && !db.Set<LedgerSource>().Any(s => s.LedgerEntryId == e.Id)).ToListAsync();
        return withSource.Concat(legacy).DistinctBy(e => e.Id).OrderBy(e => e.CreatedAt).ThenBy(e => e.Id).ToList();
    }

    /// <summary>
    /// Writes reversal entries for an order: ratio = amount / orderTotal of each original entry (floored to minor units),
    /// or the full remaining amount when <paramref name="full"/>. Already-reversed amounts (by any earlier refund or
    /// chargeback, net of reinstatements) are respected, so totals never go below zero.
    /// </summary>
    public async Task<List<CommissionLedgerEntry>> Reverse(Guid orderId, decimal amount, decimal orderTotal, bool full, string kind, string sourceType, Guid sourceId)
    {
        var originals = await OriginalEntries(orderId);
        var ids = originals.Select(o => o.Id).ToList();
        var prior = await (from s in db.Set<LedgerSource>()
                           join e in db.CommissionLedger on s.LedgerEntryId equals e.Id
                           where s.RelatedEntryId != null && ids.Contains(s.RelatedEntryId!.Value)
                           select new { Related = s.RelatedEntryId!.Value, e.GrossAmount, e.InstructorAmount, e.PlatformAmount }).ToListAsync();
        // Legacy (pre-provenance) full reversals made by the original refund flow.
        var legacyReversed = await db.CommissionLedger.Where(e => e.OrderId == orderId && e.Kind == "RefundReversal").Select(e => e.InstructorId).ToListAsync();
        var created = new List<CommissionLedgerEntry>();
        if (orderTotal <= 0) return [];
        amount = Math.Min(amount, orderTotal);
        decimal Part(decimal x, string cur) => Money.Floor(x * amount / orderTotal, cur); // multiply first: exact for representable shares
        foreach (var o in originals)
        {
            if (legacyReversed.Contains(o.InstructorId) && o.Kind == "Sale") continue;
            var p = prior.Where(x => x.Related == o.Id).ToList();
            decimal remGross = o.GrossAmount + p.Sum(x => x.GrossAmount), remInst = o.InstructorAmount + p.Sum(x => x.InstructorAmount),
                    remPlat = o.PlatformAmount + p.Sum(x => x.PlatformAmount);
            decimal g, i, pl;
            if (full) { g = remGross; i = remInst; pl = remPlat; }
            else
            {
                g = Bound(Part(o.GrossAmount, o.Currency), remGross);
                i = Bound(Part(o.InstructorAmount, o.Currency), remInst);
                pl = Bound(Part(o.PlatformAmount, o.Currency), remPlat);
            }
            if (g == 0 && i == 0 && pl == 0) continue;
            var e = new CommissionLedgerEntry
            {
                InstructorId = o.InstructorId, OrderId = CommerceText.Derive(sourceType, sourceId, o.Id), CourseId = o.CourseId, Kind = kind,
                GrossAmount = -g, InstructorAmount = -i, PlatformAmount = -pl, Currency = o.Currency,
            };
            Add(e, orderId, sourceType, sourceId, o.Id);
            created.Add(e);
        }
        return created;
    }

    /// <summary>Same sign as the original, never more (in absolute value) than what remains.</summary>
    private static decimal Bound(decimal value, decimal remaining) =>
        remaining >= 0 ? Math.Clamp(value, 0, remaining) : Math.Clamp(value, remaining, 0);

    /// <summary>Reinstates chargeback entries of a dispute that was won.</summary>
    public async Task<List<CommissionLedgerEntry>> Reinstate(Guid orderId, Guid disputeId)
    {
        var chargebacks = await (from s in db.Set<LedgerSource>()
                                 join e in db.CommissionLedger on s.LedgerEntryId equals e.Id
                                 where s.SourceType == "Dispute" && s.SourceId == disputeId && e.Kind == "Chargeback"
                                 select new { e, s.RelatedEntryId }).ToListAsync();
        var created = new List<CommissionLedgerEntry>();
        foreach (var c in chargebacks)
        {
            var e = new CommissionLedgerEntry
            {
                InstructorId = c.e.InstructorId, OrderId = CommerceText.Derive("DisputeWon", disputeId, c.e.Id), CourseId = c.e.CourseId,
                Kind = "ChargebackReversal", GrossAmount = -c.e.GrossAmount, InstructorAmount = -c.e.InstructorAmount,
                PlatformAmount = -c.e.PlatformAmount, Currency = c.e.Currency,
            };
            Add(e, orderId, "DisputeWon", disputeId, c.RelatedEntryId);
            created.Add(e);
        }
        return created;
    }
}
