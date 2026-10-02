using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Commerce;

public record GiftCodeDto(Guid OrderId, string Code, string Notice);
public record GiftRedeemInput(string Code);
public record GiftRedeemDto(Guid PackageId, Guid CourseId, DateTime EndsAt);

public class GiftService(AppDbContext db, ICurrentUser me, AuditService audit, SecretProtector protector)
{
    /// <summary>Shows the gift code to the buyer exactly once (codes sent by email are never shown).</summary>
    public async Task<GiftCodeDto> Reveal(Guid orderId)
    {
        var uid = me.RequireId();
        var order = await db.Orders.AsNoTracking().FirstOrDefaultAsync(o => o.Id == orderId && o.UserId == uid) ?? throw AppException.NotFound("Order");
        var gift = await db.Set<GiftCode>().AsNoTracking().FirstOrDefaultAsync(g => g.OrderId == order.Id) ?? throw AppException.NotFound("Gift");
        if (gift.RecipientEmail is not null) throw AppException.Conflict("The gift code was emailed to the recipient.", "gift_code_emailed");
        // Atomic one-time reveal: only the request that clears the cipher may return it.
        var cipher = gift.CodeCipher;
        if (cipher is null) throw AppException.Conflict("The gift code has already been shown.", "gift_code_already_revealed");
        var cleared = await db.Set<GiftCode>().Where(g => g.Id == gift.Id && g.CodeCipher == cipher)
            .ExecuteUpdateAsync(s => s.SetProperty(g => g.CodeCipher, (string?)null).SetProperty(g => g.RevealedAt, (DateTime?)DateTime.UtcNow));
        if (cleared != 1) throw AppException.Conflict("The gift code has already been shown.", "gift_code_already_revealed");
        audit.Record("gift.code_revealed", nameof(GiftCode), gift.Id, new { orderId });
        await db.SaveChangesAsync();
        return new GiftCodeDto(orderId, protector.Unprotect(cipher), "This code is shown only once. Store it safely or give it to the recipient now.");
    }

    public async Task<GiftRedeemDto> Redeem(GiftRedeemInput input)
    {
        var uid = me.RequireId();
        var code = (input.Code ?? "").Trim();
        if (code.Length is < 8 or > 64) throw AppException.Bad("Gift code is not valid.", "gift_invalid");
        var hash = Tokens.Sha256(code.ToUpperInvariant());
        var gift = await db.Set<GiftCode>().AsNoTracking().FirstOrDefaultAsync(g => g.CodeHash == hash) ?? throw AppException.Bad("Gift code is not valid.", "gift_invalid");
        var order = await db.Orders.AsNoTracking().FirstAsync(o => o.Id == gift.OrderId);
        if (order.Status != OrderStatus.Paid || gift.Status == "Void") throw AppException.Bad("This gift is no longer valid.", "gift_void");
        if (gift.Status == "Redeemed") throw AppException.Conflict("This gift has already been redeemed.", "gift_already_redeemed");
        var pkg = await db.Packages.AsNoTracking().FirstAsync(p => p.Id == gift.PackageId);
        var now = DateTime.UtcNow;
        await using var tx = await db.Database.BeginTransactionAsync();
        var claimed = await db.Set<GiftCode>().Where(g => g.Id == gift.Id && g.Status == "Active")
            .ExecuteUpdateAsync(s => s.SetProperty(g => g.Status, "Redeemed").SetProperty(g => g.RedeemedBy, (Guid?)uid).SetProperty(g => g.RedeemedAt, (DateTime?)now));
        if (claimed != 1) throw AppException.Conflict("This gift has already been redeemed.", "gift_already_redeemed");
        var e = new Entitlement
        {
            UserId = uid, CourseId = pkg.CourseId, PackageId = pkg.Id, OrderId = order.Id, Source = EntitlementSource.Purchase,
            StartsAt = now, EndsAt = now.AddDays(pkg.AccessDays),
        };
        db.Entitlements.Add(e);
        audit.Record("gift.redeemed", nameof(GiftCode), gift.Id, new { order.Id, redeemer = uid, entitlement = e.Id });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return new GiftRedeemDto(pkg.Id, pkg.CourseId, e.EndsAt!.Value);
    }
}
