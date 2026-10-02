using System.Globalization;
using System.Text.Json;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Assessment;
using Microsoft.EntityFrameworkCore;
using PdfSharp.Drawing;
using PdfSharp.Pdf;

namespace Mastemy.Api.Modules.Commerce;

public record InvoiceLine(string Description, decimal Amount);
public record InvoiceDto(Guid Id, string Number, string Kind, Guid OrderId, Guid? RefundId, Guid? RelatedInvoiceId, string BuyerName, string? BuyerCountry,
    string Currency, decimal Subtotal, decimal? TaxAmount, decimal? TaxRatePercent, string TaxMode, decimal Total, List<InvoiceLine> Lines, DateTime IssuedAt);
public record TaxRateInput(decimal RatePercent);
public record TaxRateDto(string Country, decimal RatePercent, DateTime UpdatedAt);
public record SellerDetails(string Name, string Address, string TaxId);

/// <summary>
/// Invoices and credit notes. Numbers are sequential per kind and calendar year without gaps: the counter row is
/// incremented inside the same transaction that inserts the document (row lock held until commit; a rollback
/// releases the number). Tax fields are filled only when Tax:Mode=Inclusive and an admin-managed rate exists for
/// the buyer's country — no rates are ever invented.
/// </summary>
public class InvoiceService(AppDbContext db, ICurrentUser me, AuditService audit, IConfiguration cfg)
{
    public string TaxMode => cfg["Tax:Mode"] is "Inclusive" ? "Inclusive" : "None";

    public SellerDetails? Seller()
    {
        string name = cfg["Invoice:SellerName"] ?? "", address = cfg["Invoice:SellerAddress"] ?? "", taxId = cfg["Invoice:SellerTaxId"] ?? "";
        return string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(address) || string.IsNullOrWhiteSpace(taxId) ? null : new SellerDetails(name.Trim(), address.Trim(), taxId.Trim());
    }

    private async Task<long> NextNumber(string kind, int year)
    {
        if (db.Database.CurrentTransaction is null) throw new InvalidOperationException("Invoice numbers must be allocated inside a transaction.");
        await db.Database.ExecuteSqlInterpolatedAsync(
            $"INSERT INTO Commerce_InvoiceCounters (Kind, Year, Next) VALUES ({kind}, {year}, 1) ON DUPLICATE KEY UPDATE Next = Next + 1");
        return await db.Set<InvoiceCounter>().AsNoTracking().Where(c => c.Kind == kind && c.Year == year).Select(c => c.Next).FirstAsync();
    }

    private async Task<(decimal? Rate, decimal? Tax, decimal Subtotal)> Tax(decimal total, string currency, string? country)
    {
        if (TaxMode != "Inclusive" || country is null) return (null, null, total);
        var rate = await db.Set<TaxRate>().AsNoTracking().Where(t => t.Country == country).Select(t => (decimal?)t.RatePercent).FirstOrDefaultAsync();
        if (rate is null) return (null, null, total);
        var tax = Money.Round(total * rate.Value / (100m + rate.Value), currency);
        return (rate, tax, total - tax);
    }

    public async Task<Invoice> IssueInvoice(Order order, OrderDetail? detail, List<InvoiceLine> lines, DateTime now)
    {
        var existing = await db.Set<Invoice>().FirstOrDefaultAsync(i => i.OrderId == order.Id && i.Kind == "Invoice");
        if (existing is not null) return existing;
        var user = await db.Users.AsNoTracking().FirstAsync(u => u.Id == order.UserId);
        var seq = await NextNumber("Invoice", now.Year);
        var (rate, tax, subtotal) = await Tax(order.Total, order.Currency, detail?.Country);
        var inv = new Invoice
        {
            Number = $"INV-{now.Year}-{seq:D6}", Kind = "Invoice", Year = now.Year, Sequence = seq, OrderId = order.Id, UserId = order.UserId,
            BuyerName = string.IsNullOrWhiteSpace(detail?.BillingName) ? user.DisplayName : detail!.BillingName!, BuyerEmail = user.Email,
            BuyerCountry = detail?.Country, Currency = order.Currency, Subtotal = subtotal, TaxAmount = tax, TaxRatePercent = rate, TaxMode = TaxMode,
            Total = order.Total, LinesJson = JsonSerializer.Serialize(lines), IssuedAt = now,
        };
        db.Set<Invoice>().Add(inv);
        SnapshotSeller(inv.Id, Seller());
        audit.Record("invoice.issued", nameof(Invoice), inv.Id, new { inv.Number, order.Id, inv.Total, inv.Currency });
        return inv;
    }

    public async Task<Invoice?> IssueCreditNote(Order order, Refund refund, decimal amount, DateTime now)
    {
        var original = await db.Set<Invoice>().AsNoTracking().FirstOrDefaultAsync(i => i.OrderId == order.Id && i.Kind == "Invoice");
        if (original is null) return null; // nothing was invoiced (e.g. zero-amount order)
        var seq = await NextNumber("CreditNote", now.Year);
        decimal? tax = original.TaxRatePercent is { } r ? Money.Round(amount * r / (100m + r), order.Currency) : null;
        var cn = new Invoice
        {
            Number = $"CN-{now.Year}-{seq:D6}", Kind = "CreditNote", Year = now.Year, Sequence = seq, OrderId = order.Id, RefundId = refund.Id,
            RelatedInvoiceId = original.Id, UserId = order.UserId, BuyerName = original.BuyerName, BuyerEmail = original.BuyerEmail,
            BuyerCountry = original.BuyerCountry, Currency = order.Currency, Subtotal = amount - (tax ?? 0), TaxAmount = tax,
            TaxRatePercent = original.TaxRatePercent, TaxMode = original.TaxMode, Total = amount,
            LinesJson = JsonSerializer.Serialize(new List<InvoiceLine> { new($"Credit for invoice {original.Number}: {refund.Reason}", amount) }), IssuedAt = now,
        };
        db.Set<Invoice>().Add(cn);
        // The credit note carries the seller as configured when it is issued; if configuration was removed since, reuse the
        // original invoice's snapshot so the document still names the legal seller.
        SnapshotSeller(cn.Id, Seller() ?? await SnapshotOf(original.Id));
        audit.Record("credit_note.issued", nameof(Invoice), cn.Id, new { cn.Number, order.Id, refundId = refund.Id, amount });
        return cn;
    }

    private void SnapshotSeller(Guid invoiceId, SellerDetails? seller)
    {
        if (seller is null) return;
        db.Set<InvoiceSellerSnapshot>().Add(new InvoiceSellerSnapshot { InvoiceId = invoiceId, Name = seller.Name, Address = seller.Address, TaxId = seller.TaxId });
    }

    private async Task<SellerDetails?> SnapshotOf(Guid invoiceId) =>
        await db.Set<InvoiceSellerSnapshot>().AsNoTracking().Where(s => s.InvoiceId == invoiceId)
            .Select(s => new SellerDetails(s.Name, s.Address, s.TaxId)).FirstOrDefaultAsync();

    public static InvoiceDto ToDto(Invoice i) => new(i.Id, i.Number, i.Kind, i.OrderId, i.RefundId, i.RelatedInvoiceId, i.BuyerName, i.BuyerCountry,
        i.Currency, i.Subtotal, i.TaxAmount, i.TaxRatePercent, i.TaxMode, i.Total,
        JsonSerializer.Deserialize<List<InvoiceLine>>(i.LinesJson) ?? [], i.IssuedAt);

    public async Task<List<InvoiceDto>> MyInvoices()
    {
        var uid = me.RequireId();
        return (await db.Set<Invoice>().AsNoTracking().Where(i => i.UserId == uid).OrderByDescending(i => i.IssuedAt).Take(500).ToListAsync()).Select(ToDto).ToList();
    }

    public async Task<List<InvoiceDto>> AdminInvoices(Guid? orderId, int? year)
    {
        var q = db.Set<Invoice>().AsNoTracking();
        if (orderId is not null) q = q.Where(i => i.OrderId == orderId);
        if (year is not null) q = q.Where(i => i.Year == year);
        return (await q.OrderBy(i => i.Kind).ThenBy(i => i.Year).ThenBy(i => i.Sequence).Take(1000).ToListAsync()).Select(ToDto).ToList();
    }

    public async Task<(byte[] Pdf, string FileName)> Pdf(Guid id, bool asFinance)
    {
        var uid = me.RequireId();
        var inv = await db.Set<Invoice>().AsNoTracking().FirstOrDefaultAsync(i => i.Id == id) ?? throw AppException.NotFound("Invoice");
        if (!asFinance && inv.UserId != uid) throw AppException.NotFound("Invoice");
        // Render from the seller captured at issue time; documents issued before snapshots existed fall back to current config.
        var seller = await SnapshotOf(inv.Id) ?? Seller() ?? throw new AppException(503, "Invoicing is not configured on this server (seller name, address and tax id are required).", "invoicing_not_configured");
        return (InvoicePdf.Render(inv, seller), inv.Number + ".pdf");
    }

    // ----- tax rates (admin-managed; never invented) -----

    public async Task<List<TaxRateDto>> TaxRates() =>
        await db.Set<TaxRate>().AsNoTracking().OrderBy(t => t.Country).Select(t => new TaxRateDto(t.Country, t.RatePercent, t.UpdatedAt)).ToListAsync();

    public async Task<TaxRateDto> SetTaxRate(string country, TaxRateInput input)
    {
        var c = CommerceText.OptionalCountry(country) ?? throw AppException.Bad("Country is required.", "invalid_country");
        if (input.RatePercent < 0 || input.RatePercent > 50 || decimal.Round(input.RatePercent, 3) != input.RatePercent)
            throw AppException.Bad("ratePercent must be between 0 and 50 with at most 3 decimals.");
        var t = await db.Set<TaxRate>().FirstOrDefaultAsync(x => x.Country == c);
        var old = t?.RatePercent;
        if (t is null) { t = new TaxRate { Country = c }; db.Set<TaxRate>().Add(t); }
        t.RatePercent = input.RatePercent; t.UpdatedBy = me.Id; t.UpdatedAt = DateTime.UtcNow;
        audit.Record("tax_rate.set", nameof(TaxRate), c, new { old, @new = input.RatePercent });
        await db.SaveChangesAsync();
        return new TaxRateDto(t.Country, t.RatePercent, t.UpdatedAt);
    }

    public async Task DeleteTaxRate(string country)
    {
        var c = CommerceText.OptionalCountry(country) ?? throw AppException.Bad("Country is required.", "invalid_country");
        var t = await db.Set<TaxRate>().FirstOrDefaultAsync(x => x.Country == c) ?? throw AppException.NotFound("Tax rate");
        db.Set<TaxRate>().Remove(t);
        audit.Record("tax_rate.deleted", nameof(TaxRate), c, new { t.RatePercent });
        await db.SaveChangesAsync();
    }
}

/// <summary>A4 portrait invoice / credit note rendered with PDFsharp and the bundled fonts.</summary>
public static class InvoicePdf
{
    public static byte[] Render(Invoice inv, SellerDetails seller)
    {
        BundledFontResolver.EnsureInstalled();
        using var doc = new PdfDocument();
        doc.Info.Title = (inv.Kind == "CreditNote" ? "Credit note " : "Invoice ") + inv.Number;
        doc.Info.Author = seller.Name;
        var page = doc.AddPage();
        page.Width = XUnit.FromPoint(595); page.Height = XUnit.FromPoint(842);
        using (var g = XGraphics.FromPdfPage(page))
        {
            var bold = new XFont(BundledFontResolver.Sans, 11, XFontStyleEx.Bold);
            var title = new XFont(BundledFontResolver.Sans, 20, XFontStyleEx.Bold);
            var font = new XFont(BundledFontResolver.Sans, 10, XFontStyleEx.Regular);
            double x = 50, y = 60, right = 545;
            g.DrawString(inv.Kind == "CreditNote" ? "CREDIT NOTE" : "INVOICE", title, XBrushes.Black, x, y); y += 28;
            void Line(string text, XFont f) { g.DrawString(text, f, XBrushes.Black, x, y); y += 15; }
            Line($"Number: {inv.Number}", bold);
            Line($"Date: {inv.IssuedAt.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)}", font);
            if (inv.Kind == "CreditNote") Line("Credits an earlier invoice for the same order.", font);
            y += 10; Line("Seller", bold); Line(seller.Name, font);
            foreach (var l in seller.Address.Split('\n', StringSplitOptions.TrimEntries)) Line(l, font);
            Line($"Tax ID: {seller.TaxId}", font);
            y += 10; Line("Bill to", bold); Line(inv.BuyerName, font); Line(inv.BuyerEmail, font);
            if (inv.BuyerCountry is not null) Line($"Country: {inv.BuyerCountry}", font);
            y += 15;
            g.DrawLine(XPens.Black, x, y, right, y); y += 15;
            g.DrawString("Description", bold, XBrushes.Black, x, y);
            g.DrawString($"Amount ({inv.Currency})", bold, XBrushes.Black, new XRect(x, y - 11, right - x, 14), XStringFormats.TopRight); y += 18;
            foreach (var li in JsonSerializer.Deserialize<List<InvoiceLine>>(inv.LinesJson) ?? [])
            {
                var desc = li.Description.Length > 80 ? li.Description[..80] + "..." : li.Description;
                g.DrawString(desc, font, XBrushes.Black, x, y);
                g.DrawString(Fmt(li.Amount, inv.Currency), font, XBrushes.Black, new XRect(x, y - 10, right - x, 14), XStringFormats.TopRight); y += 16;
            }
            g.DrawLine(XPens.Black, x, y, right, y); y += 16;
            void Total(string label, decimal v, XFont f)
            {
                g.DrawString(label, f, XBrushes.Black, x + 250, y);
                g.DrawString(Fmt(v, inv.Currency), f, XBrushes.Black, new XRect(x, y - 10, right - x, 14), XStringFormats.TopRight); y += 16;
            }
            if (inv.TaxAmount is not null)
            {
                Total("Net", inv.Subtotal, font);
                Total($"Tax ({inv.TaxRatePercent?.ToString("0.###", CultureInfo.InvariantCulture)}%, included)", inv.TaxAmount.Value, font);
            }
            Total("Total", inv.Total, bold);
            y += 20;
            g.DrawString("Course videos are free on YouTube; this document covers Mastemy study services only.", font, XBrushes.Gray, x, y);
        }
        using var ms = new MemoryStream();
        doc.Save(ms, false);
        return ms.ToArray();
    }

    private static string Fmt(decimal v, string currency) => v.ToString(Money.IsZeroDecimal(currency) ? "0" : "0.00", CultureInfo.InvariantCulture);
}
