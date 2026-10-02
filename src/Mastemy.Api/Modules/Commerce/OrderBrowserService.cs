using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Commerce;

public record AdminOrderRowDto(Guid Id, Guid UserId, string BuyerEmail, OrderStatus Status, string Kind, decimal Total, string Currency,
    decimal DiscountAmount, decimal RefundedAmount, string? CouponCode, int ItemCount, DateTime CreatedAt, DateTime? PaidAt);
public record AdminOrderItemDto(Guid Id, Guid PackageId, Guid CourseId, string CourseTitle, decimal UnitPrice);
public record AdminPaymentDto(Guid Id, string Provider, string ProviderPaymentId, decimal Amount, string Currency, DateTime CreatedAt);
public record AdminRefundDto(Guid Id, decimal Amount, string Reason, string Status, Guid? RequestedBy, Guid? DecidedBy, DateTime? DecidedAt,
    string? ProviderRefundId, DateTime CreatedAt);
public record AdminInvoiceDto(Guid Id, string Number, string Kind, decimal Total, string Currency, DateTime IssuedAt);
public record AdminLedgerDto(Guid Id, Guid InstructorId, Guid CourseId, string Kind, decimal GrossAmount, decimal InstructorAmount,
    decimal PlatformAmount, string Currency, Guid? PayoutBatchId, DateTime CreatedAt);
public record AdminDisputeDto(Guid Id, decimal Amount, string Currency, string Status, string Reason, DateTime CreatedAt, DateTime? ClosedAt);
public record AdminOrderDetailDto(AdminOrderRowDto Order, string? PriceSource, string? Country, decimal ListAmount,
    List<AdminOrderItemDto> Items, List<AdminPaymentDto> Payments, List<AdminRefundDto> Refunds, List<AdminInvoiceDto> Invoices,
    List<AdminLedgerDto> Ledger, List<AdminDisputeDto> Disputes);
public record OrderPage(List<AdminOrderRowDto> Items, int Total, int Page, int PageSize);

/// <summary>Support's read-only view of an order: masked buyer email and payment ids, no ledger/commission data.</summary>
public record SupportOrderDto(Guid Id, Guid UserId, string MaskedBuyerEmail, OrderStatus Status, decimal Total, string Currency,
    DateTime CreatedAt, DateTime? PaidAt, List<string> CourseTitles, List<string> MaskedPaymentIds,
    List<SupportRefundDto> Refunds, List<string> InvoiceNumbers);
public record SupportRefundDto(decimal Amount, string Status, DateTime CreatedAt);

/// <summary>
/// Staff/finance order browser (GET /api/admin/orders) and the Support role's read-only order lookup. Pure reads: nothing here
/// changes an order, so refunds and other money movements stay on the Finance endpoints.
/// </summary>
public class OrderBrowserService(AppDbContext db)
{
    public const int MaxPageSize = 100;

    public async Task<OrderPage> Search(string? status, string? email, Guid? courseId, DateTime? from, DateTime? to, string? currency,
        string? coupon, int page, int pageSize)
    {
        if (page < 1) throw AppException.Bad("page must be >= 1.");
        if (pageSize is < 1 or > MaxPageSize) throw AppException.Bad($"pageSize must be between 1 and {MaxPageSize}.");
        if (from is { } f && to is { } t && f > t) throw AppException.Bad("from must not be after to.", "invalid_range");
        var q = db.Orders.AsNoTracking().AsQueryable();
        if (!string.IsNullOrWhiteSpace(status))
        {
            if (!Enum.TryParse<OrderStatus>(status.Trim(), true, out var st) || !Enum.IsDefined(st))
                throw AppException.Bad($"status must be one of: {string.Join(", ", Enum.GetNames<OrderStatus>())}.", "invalid_status");
            q = q.Where(o => o.Status == st);
        }
        if (!string.IsNullOrWhiteSpace(email))
        {
            var norm = email.Trim().ToLowerInvariant();
            if (norm.Length > 256) throw AppException.Bad("email is too long.");
            q = q.Where(o => db.Users.Any(u => u.Id == o.UserId && u.NormalizedEmail == norm));
        }
        if (courseId is { } cid) q = q.Where(o => o.Items.Any(i => i.CourseId == cid));
        if (from is { } fromUtc) q = q.Where(o => o.CreatedAt >= fromUtc);
        if (to is { } toUtc) q = q.Where(o => o.CreatedAt <= toUtc);
        if (!string.IsNullOrWhiteSpace(currency))
        {
            var cur = currency.Trim().ToUpperInvariant();
            if (cur.Length != 3) throw AppException.Bad("currency must be a 3-letter ISO code.", "invalid_currency");
            q = q.Where(o => o.Currency == cur);
        }
        if (!string.IsNullOrWhiteSpace(coupon))
        {
            var code = coupon.Trim().ToUpperInvariant();
            q = q.Where(o => db.Set<CouponRedemption>().Any(r => r.OrderId == o.Id &&
                db.Set<Coupon>().Any(c => c.Id == r.CouponId && c.NormalizedCode == code)));
        }
        var total = await q.CountAsync();
        var orders = await q.OrderByDescending(o => o.CreatedAt).ThenBy(o => o.Id).Skip((page - 1) * pageSize).Take(pageSize)
            .Include(o => o.Items).ToListAsync();
        return new OrderPage(await Rows(orders), total, page, pageSize);
    }

    private async Task<List<AdminOrderRowDto>> Rows(List<Order> orders)
    {
        var ids = orders.Select(o => o.Id).ToList();
        var userIds = orders.Select(o => o.UserId).Distinct().ToList();
        var emails = await db.Users.AsNoTracking().Where(u => userIds.Contains(u.Id)).ToDictionaryAsync(u => u.Id, u => u.Email);
        var details = await db.Set<OrderDetail>().AsNoTracking().Where(d => ids.Contains(d.OrderId)).ToDictionaryAsync(d => d.OrderId);
        var coupons = await db.Set<CouponRedemption>().AsNoTracking().Where(r => ids.Contains(r.OrderId))
            .Join(db.Set<Coupon>(), r => r.CouponId, c => c.Id, (r, c) => new { r.OrderId, c.Code }).ToListAsync();
        return orders.Select(o =>
        {
            var d = details.GetValueOrDefault(o.Id);
            return new AdminOrderRowDto(o.Id, o.UserId, emails.GetValueOrDefault(o.UserId) ?? "", o.Status, d?.Kind ?? "Package", o.Total, o.Currency,
                d?.DiscountAmount ?? 0m, d?.RefundedAmount ?? 0m, coupons.FirstOrDefault(c => c.OrderId == o.Id)?.Code, o.Items.Count, o.CreatedAt, o.PaidAt);
        }).ToList();
    }

    public async Task<AdminOrderDetailDto> Detail(Guid id)
    {
        var o = await db.Orders.AsNoTracking().Include(x => x.Items).FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Order");
        var row = (await Rows([o]))[0];
        var d = await db.Set<OrderDetail>().AsNoTracking().FirstOrDefaultAsync(x => x.OrderId == id);
        var courseIds = o.Items.Select(i => i.CourseId).Distinct().ToList();
        var titles = await db.Courses.AsNoTracking().Where(c => courseIds.Contains(c.Id)).ToDictionaryAsync(c => c.Id, c => c.Title);
        var payments = await db.Payments.AsNoTracking().Where(p => p.OrderId == id).OrderBy(p => p.CreatedAt)
            .Select(p => new AdminPaymentDto(p.Id, p.Provider, p.ProviderPaymentId, p.Amount, p.Currency, p.CreatedAt)).ToListAsync();
        var refunds = await db.Refunds.AsNoTracking().Where(r => r.OrderId == id).OrderBy(r => r.CreatedAt)
            .Select(r => new AdminRefundDto(r.Id, r.Amount, r.Reason, r.Status, r.RequestedBy, r.DecidedBy, r.DecidedAt, r.ProviderRefundId, r.CreatedAt)).ToListAsync();
        var invoices = await db.Set<Invoice>().AsNoTracking().Where(i => i.OrderId == id).OrderBy(i => i.IssuedAt)
            .Select(i => new AdminInvoiceDto(i.Id, i.Number, i.Kind, i.Total, i.Currency, i.IssuedAt)).ToListAsync();
        var ledgerIds = await db.Set<LedgerSource>().AsNoTracking().Where(s => s.OrderId == id).Select(s => s.LedgerEntryId).ToListAsync();
        var ledger = await db.CommissionLedger.AsNoTracking().Where(e => e.OrderId == id || ledgerIds.Contains(e.Id)).OrderBy(e => e.CreatedAt)
            .Select(e => new AdminLedgerDto(e.Id, e.InstructorId, e.CourseId, e.Kind, e.GrossAmount, e.InstructorAmount, e.PlatformAmount, e.Currency,
                e.PayoutBatchId, e.CreatedAt)).ToListAsync();
        var disputes = await db.Set<Dispute>().AsNoTracking().Where(x => x.OrderId == id).OrderBy(x => x.CreatedAt)
            .Select(x => new AdminDisputeDto(x.Id, x.Amount, x.Currency, x.Status, x.Reason, x.CreatedAt, x.ClosedAt)).ToListAsync();
        return new AdminOrderDetailDto(row, d?.PriceSource, d?.Country, d?.ListAmount ?? o.Total,
            o.Items.Select(i => new AdminOrderItemDto(i.Id, i.PackageId, i.CourseId, titles.GetValueOrDefault(i.CourseId) ?? "", i.UnitPrice)).ToList(),
            payments, refunds, invoices, ledger, disputes);
    }

    /// <summary>Support lookup by exact buyer email or order id (at least one). Read-only, masked, at most 50 orders.</summary>
    public async Task<List<SupportOrderDto>> SupportLookup(string? email, Guid? orderId)
    {
        if (string.IsNullOrWhiteSpace(email) && orderId is null) throw AppException.Bad("Provide email or orderId.", "lookup_required");
        var q = db.Orders.AsNoTracking().AsQueryable();
        if (orderId is { } oid) q = q.Where(o => o.Id == oid);
        if (!string.IsNullOrWhiteSpace(email))
        {
            var norm = email.Trim().ToLowerInvariant();
            if (norm.Length > 256) throw AppException.Bad("email is too long.");
            q = q.Where(o => db.Users.Any(u => u.Id == o.UserId && u.NormalizedEmail == norm));
        }
        var orders = await q.OrderByDescending(o => o.CreatedAt).Take(50).Include(o => o.Items).ToListAsync();
        var ids = orders.Select(o => o.Id).ToList();
        var userIds = orders.Select(o => o.UserId).Distinct().ToList();
        var emails = await db.Users.AsNoTracking().Where(u => userIds.Contains(u.Id)).ToDictionaryAsync(u => u.Id, u => u.Email);
        var courseIds = orders.SelectMany(o => o.Items).Select(i => i.CourseId).Distinct().ToList();
        var titles = await db.Courses.AsNoTracking().Where(c => courseIds.Contains(c.Id)).ToDictionaryAsync(c => c.Id, c => c.Title);
        var payments = await db.Payments.AsNoTracking().Where(p => ids.Contains(p.OrderId)).ToListAsync();
        var refunds = await db.Refunds.AsNoTracking().Where(r => ids.Contains(r.OrderId)).ToListAsync();
        var invoices = await db.Set<Invoice>().AsNoTracking().Where(i => ids.Contains(i.OrderId)).ToListAsync();
        return orders.Select(o => new SupportOrderDto(o.Id, o.UserId, Identity.AdminService.MaskEmail(emails.GetValueOrDefault(o.UserId) ?? ""),
            o.Status, o.Total, o.Currency, o.CreatedAt, o.PaidAt,
            o.Items.Select(i => titles.GetValueOrDefault(i.CourseId) ?? "").ToList(),
            payments.Where(p => p.OrderId == o.Id).OrderBy(p => p.CreatedAt).Select(p => MaskPaymentId(p.ProviderPaymentId)).ToList(),
            refunds.Where(r => r.OrderId == o.Id).OrderBy(r => r.CreatedAt).Select(r => new SupportRefundDto(r.Amount, r.Status, r.CreatedAt)).ToList(),
            invoices.Where(i => i.OrderId == o.Id).OrderBy(i => i.IssuedAt).Select(i => i.Number).ToList())).ToList();
    }

    /// <summary>"pi_3NabcdefWXYZ" → "pi_…WXYZ": provider prefix and last 4 characters only.</summary>
    public static string MaskPaymentId(string? id)
    {
        if (string.IsNullOrEmpty(id)) return "";
        var us = id.IndexOf('_');
        var prefix = us is > 0 and <= 8 ? id[..(us + 1)] : "";
        var rest = id[prefix.Length..];
        return rest.Length <= 4 ? prefix + "…" : prefix + "…" + rest[^4..];
    }
}

[ApiController]
public class OrderBrowserController(OrderBrowserService svc) : ControllerBase
{
    /// <summary>Finance + Staff (the Finance policy admits Finance, Admin, SuperAdmin).</summary>
    [HttpGet("api/admin/orders"), Authorize(Policy = "Finance")]
    public Task<OrderPage> Search([FromQuery] string? status, [FromQuery] string? email, [FromQuery] Guid? courseId,
        [FromQuery] DateTime? from, [FromQuery] DateTime? to, [FromQuery] string? currency, [FromQuery] string? coupon,
        [FromQuery] int page = 1, [FromQuery] int pageSize = 25) =>
        svc.Search(status, email, courseId, from?.ToUniversalTime(), to?.ToUniversalTime(), currency, coupon, page, pageSize);

    [HttpGet("api/admin/orders/{id:guid}"), Authorize(Policy = "Finance")]
    public Task<AdminOrderDetailDto> Detail(Guid id) => svc.Detail(id);

    /// <summary>Support role (also Admin/SuperAdmin): read-only lookup by email or order id with masked payment ids.</summary>
    [HttpGet("api/support/orders"), Authorize(Policy = "Support")]
    public Task<List<SupportOrderDto>> Lookup([FromQuery] string? email, [FromQuery] Guid? orderId) => svc.SupportLookup(email, orderId);
}
