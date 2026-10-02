using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Commerce;

/// <summary>
/// Applies the effects of a verified paid order inside the caller's transaction: entitlements (or a gift code),
/// commission (referral policy, bundle pro-rata items, affiliate cut), coupon redemption (idempotent per order)
/// and the sequential invoice.
/// </summary>
public class FulfillmentService(AppDbContext db, AuditService audit, LedgerService ledger, InvoiceService invoices,
    SecretProtector protector, IConfiguration cfg)
{
    private decimal DefaultPool => Math.Clamp(cfg.GetValue("Commission:InstructorSharePercent", 70m), 0m, 100m);
    private decimal ReferralPool => Math.Clamp(cfg.GetValue("Commission:ReferralInstructorSharePercent", DefaultPool), 0m, 100m);

    public record FulfillResult(string? GiftCode);

    public async Task<FulfillResult> FulfillPaidOrder(Order order, OrderDetail? detail, DateTime now)
    {
        var isGift = detail?.Kind == "Gift";
        var pkgIds = order.Items.Select(i => i.PackageId).ToList();
        var pkgs = await db.Packages.AsNoTracking().Where(p => pkgIds.Contains(p.Id)).ToDictionaryAsync(p => p.Id);
        Guid? referralCourse = null;
        if (detail?.ReferralCodeId is { } rcId)
            referralCourse = await db.Set<ReferralCode>().Where(r => r.Id == rcId).Select(r => (Guid?)r.CourseId).FirstOrDefaultAsync();
        var single = order.Items.Count == 1;
        string? giftCode = null;

        foreach (var item in order.Items)
        {
            var pkg = pkgs[item.PackageId];
            if (!isGift)
                db.Entitlements.Add(new Entitlement
                {
                    UserId = order.UserId, CourseId = item.CourseId, PackageId = item.PackageId, OrderId = order.Id,
                    Source = EntitlementSource.Purchase, StartsAt = now, EndsAt = now.AddDays(pkg.AccessDays),
                });
            if (item.UnitPrice <= 0) continue;
            var pool = detail?.ReferrerInstructorId is not null && referralCourse == item.CourseId ? ReferralPool : DefaultPool;
            var instructors = await db.CourseInstructors.AsNoTracking().Where(ci => ci.CourseId == item.CourseId)
                .OrderBy(ci => ci.Role).ThenBy(ci => ci.UserId).ToListAsync();
            var docId = single ? order.Id : item.Id;
            foreach (var e in CommissionSplit.Compute(docId, item.CourseId, item.UnitPrice, order.Currency, pool, instructors))
                ledger.Add(e, order.Id, single ? "Order" : "OrderItem", docId);
        }

        if (detail?.AffiliateId is { } affId && order.Total > 0)
        {
            var aff = await db.Set<Affiliate>().AsNoTracking().FirstOrDefaultAsync(a => a.Id == affId);
            if (aff is not null)
            {
                var cut = Money.Floor(order.Total * aff.CommissionPercent / 100m, order.Currency);
                if (cut > 0)
                    ledger.Add(new CommissionLedgerEntry
                    {
                        InstructorId = aff.Id, OrderId = order.Id, CourseId = order.Items[0].CourseId, Kind = "Affiliate",
                        GrossAmount = order.Total, InstructorAmount = cut, PlatformAmount = -cut, Currency = order.Currency,
                    }, order.Id, "Order", order.Id);
            }
        }

        if (isGift)
        {
            var item = order.Items[0];
            giftCode = "GIFT-" + Tokens.Random(15).ToUpperInvariant().Replace("_", "X").Replace("-", "Y");
            var hasRecipient = !string.IsNullOrWhiteSpace(detail!.GiftRecipientEmail);
            db.Set<GiftCode>().Add(new GiftCode
            {
                OrderId = order.Id, PackageId = item.PackageId, CodeHash = Tokens.Sha256(giftCode), RecipientEmail = detail.GiftRecipientEmail,
                CodeCipher = hasRecipient ? null : protector.Protect(giftCode), // emailed codes are never stored in recoverable form
            });
            if (hasRecipient)
            {
                var buyer = await db.Users.AsNoTracking().Where(u => u.Id == order.UserId).Select(u => u.DisplayName).FirstOrDefaultAsync() ?? "Someone";
                var pkg = pkgs[item.PackageId];
                db.EmailOutbox.Add(new EmailOutboxMessage
                {
                    ToAddress = detail.GiftRecipientEmail!,
                    Subject = "You received a Mastemy study package",
                    Body = $"{buyer} sent you \"{pkg.Title}\" on Mastemy.\n\nIncluded study services: {pkg.Contents}\n\n" +
                           (string.IsNullOrWhiteSpace(detail.GiftMessage) ? "" : $"Message: {detail.GiftMessage}\n\n") +
                           $"Redeem with this code after signing in: {giftCode}\n\n{CommerceText.FreeVideoNotice}",
                });
            }
        }

        if (detail?.CouponId is { } couponId && !await db.Set<CouponRedemption>().AnyAsync(r => r.OrderId == order.Id))
            db.Set<CouponRedemption>().Add(new CouponRedemption
            {
                CouponId = couponId, UserId = order.UserId, OrderId = order.Id, Currency = order.Currency,
                DiscountAmount = Math.Max(0, (detail.ListAmount) - order.Total),
            });

        if (order.Total > 0)
        {
            var courseIds = order.Items.Select(i => i.CourseId).Distinct().ToList();
            var courses = await db.Courses.AsNoTracking().Where(c => courseIds.Contains(c.Id)).ToDictionaryAsync(c => c.Id, c => c.Title);
            var lines = order.Items.Select(i => new InvoiceLine($"{pkgs[i.PackageId].Title} ({courses.GetValueOrDefault(i.CourseId, "")}){(isGift ? " - gift" : "")}", i.UnitPrice)).ToList();
            await invoices.IssueInvoice(order, detail, lines, now);
        }
        audit.Record("order.fulfilled", nameof(Order), order.Id, new { gift = isGift, items = order.Items.Count, order.Total, order.Currency });
        return new FulfillResult(giftCode);
    }
}
