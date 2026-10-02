using System.Globalization;
using System.Reflection;
using Mastemy.Api.Domain;
using PdfSharp.Drawing;
using PdfSharp.Fonts;
using PdfSharp.Pdf;
using QRCoder;

namespace Mastemy.Api.Modules.Assessment;

/// <summary>
/// Serves the bundled OFL fonts (Noto Sans, Noto Naskh Arabic; see Assets/Fonts/OFL-*.txt) to PDFsharp from embedded
/// resources, so PDF rendering never depends on fonts installed on the host.
/// </summary>
public sealed class BundledFontResolver : IFontResolver
{
    public const string Sans = "Mastemy Sans";
    public const string Arabic = "Mastemy Arabic";
    private static readonly object Gate = new();
    private static bool installed;

    public static void EnsureInstalled()
    {
        lock (Gate)
        {
            if (installed) return;
            if (GlobalFontSettings.FontResolver is null) GlobalFontSettings.FontResolver = new BundledFontResolver();
            installed = true;
        }
    }

    public FontResolverInfo? ResolveTypeface(string familyName, bool isBold, bool isItalic) => familyName switch
    {
        Sans => new FontResolverInfo(isBold ? "NotoSans-Bold" : "NotoSans-Regular"),
        Arabic => new FontResolverInfo("NotoNaskhArabic-Regular", isBold, false),
        _ => new FontResolverInfo(isBold ? "NotoSans-Bold" : "NotoSans-Regular"),
    };

    public byte[]? GetFont(string faceName)
    {
        using var s = Assembly.GetExecutingAssembly().GetManifestResourceStream($"Mastemy.Fonts.{faceName}.ttf")
                      ?? throw new InvalidOperationException($"Bundled font {faceName} is missing.");
        using var ms = new MemoryStream();
        s.CopyTo(ms);
        return ms.ToArray();
    }
}

/// <summary>Staff-managed certificate design applied when rendering (colours as #RRGGBB, optional PNG/JPEG logo bytes).</summary>
public record CertificateDesign(string TitleText, string PrimaryColor, string AccentColor, string SignatureName, string SignatureTitle, byte[]? Logo);

/// <summary>Single-page A4 landscape certificate (spec §17), generated on demand from the stored certificate record.</summary>
public static class CertificatePdf
{
    private static XColor Hex(string? hex, XColor fallback)
    {
        if (hex is not { Length: 7 } || hex[0] != '#') return fallback;
        try { return XColor.FromArgb(Convert.ToInt32(hex[1..3], 16), Convert.ToInt32(hex[3..5], 16), Convert.ToInt32(hex[5..7], 16)); }
        catch (FormatException) { return fallback; }
    }

    private static readonly XColor Ink = XColor.FromArgb(0x1F, 0x29, 0x37);
    private static readonly XColor Muted = XColor.FromArgb(0x4B, 0x55, 0x63);
    private static readonly XColor Accent = XColor.FromArgb(0x1D, 0x4E, 0xD8);

    public const string Statement =
        "This certificate attests knowledge assessed through server-scored multiple-choice questions on Mastemy. " +
        "It is not a professional licence, accreditation or qualification, and it does not certify video viewing or course completion.";

    public const string CompletionStatement =
        "Certificate of Completion — attests lesson completion, not assessed knowledge. No assessment was passed to earn it. " +
        "It is not a professional licence, accreditation or qualification.";

    /// <summary>Completion award PDF: fixed "Certificate of Completion" title (templates cannot rename it), no score line.</summary>
    public static byte[] RenderCompletion(CompletionAward a, string verificationUrl, CertificateDesign? design = null) =>
        Render(new Certificate
        {
            Code = a.Code, RecipientName = a.RecipientName, CourseTitle = a.CourseTitle, IssuedAt = a.IssuedAt,
            AssessmentCriteria = CompletionAwardService.Criteria(a.LessonCount, a.SnapshotVersion),
        }, verificationUrl, design is null ? null : design with { TitleText = "" }, completion: true);

    public static byte[] Render(Certificate c, string verificationUrl, CertificateDesign? design = null, bool completion = false)
    {
        var ink = Hex(design?.PrimaryColor, Ink);
        var accent = Hex(design?.AccentColor, Accent);
        BundledFontResolver.EnsureInstalled();
        using var doc = new PdfDocument();
        doc.Info.Title = completion ? $"Mastemy completion award {c.Code}" : $"Mastemy certificate {c.Code}";
        doc.Info.Subject = $"Certificate {c.Code} - verify at {verificationUrl}";
        doc.Info.Author = "Mastemy";
        doc.Info.Creator = "Mastemy";
        doc.Info.Keywords = $"certificate {c.Code}";
        var page = doc.AddPage();
        page.Width = XUnit.FromPoint(842);
        page.Height = XUnit.FromPoint(595);
        using (var g = XGraphics.FromPdfPage(page))
        {
            double w = page.Width.Point, h = page.Height.Point;
            g.DrawRectangle(new XPen(accent, 3), 24, 24, w - 48, h - 48);
            g.DrawRectangle(new XPen(accent, 0.75), 32, 32, w - 64, h - 64);
            if (design?.Logo is { Length: > 0 } logo)
            {
                try
                {
                    using var img = XImage.FromStream(new MemoryStream(logo));
                    var scale = Math.Min(64.0 / img.PointWidth, 64.0 / img.PointHeight);
                    g.DrawImage(img, 48, 44, img.PointWidth * scale, img.PointHeight * scale);
                }
                catch (Exception) { /* unreadable logo: render without it */ }
            }

            var y = 62.0;
            Centered(g, "MASTEMY", 12, true, accent, w, ref y, 6);
            if (completion)
            {
                Centered(g, "Certificate of Completion", 26, true, ink, w, ref y, 4);
                Centered(g, "Attests lesson completion, not assessed knowledge", 11, true, accent, w, ref y, 10);
            }
            else Centered(g, string.IsNullOrWhiteSpace(design?.TitleText) ? "Certificate of Assessed Knowledge" : design!.TitleText, 26, true, ink, w, ref y, 14);
            Centered(g, "This certifies that", 12, false, Muted, w, ref y, 6);
            Centered(g, c.RecipientName, 30, true, ink, w, ref y, 8);
            Centered(g, completion ? "completed every lesson of the course" : "passed the assessment for the course", 12, false, Muted, w, ref y, 6);
            Centered(g, c.CourseTitle, 20, true, ink, w, ref y, 10);
            var issued = c.IssuedAt.ToString("d MMMM yyyy", CultureInfo.InvariantCulture);
            Centered(g, completion ? $"Issued {issued}" : $"Issued {issued}   |   Score {c.ScorePercent.ToString("0.##", CultureInfo.InvariantCulture)}%", 12, false, ink, w, ref y, 10);

            foreach (var line in Wrap(g, "Criteria: " + c.AssessmentCriteria, 9.5, w - 2 * 90))
                Centered(g, line, 9.5, false, Muted, w, ref y, 2);
            y += 8;
            foreach (var line in Wrap(g, completion ? CompletionStatement : Statement, 8.5, w - 2 * 90))
                Centered(g, line, 8.5, false, Muted, w, ref y, 2);

            // Footer: issuer + code + verification URL (left), QR code (right).
            var qrSize = 92.0;
            var qrX = w - 60 - qrSize;
            var qrY = h - 56 - qrSize;
            DrawQr(g, verificationUrl, qrX, qrY, qrSize);
            var fx = 60.0;
            var fy = h - 56 - qrSize + 8;
            if (!string.IsNullOrWhiteSpace(design?.SignatureName))
            {
                var sx = w / 2 - 90;
                var sy = h - 56 - qrSize + 4;
                g.DrawLine(new XPen(ink, 0.75), sx, sy + 26, sx + 180, sy + 26);
                var ly = sy + 30;
                Left(g, design!.SignatureName, 10, true, ink, sx, ref ly);
                if (!string.IsNullOrWhiteSpace(design.SignatureTitle)) Left(g, design.SignatureTitle, 9, false, Muted, sx, ref ly);
            }
            Left(g, "Issued by Mastemy", 11, true, ink, fx, ref fy);
            Left(g, completion ? $"Completion award code: {c.Code}" : $"Certificate code: {c.Code}", 11, false, ink, fx, ref fy);
            Left(g, "Verify at:", 9, false, Muted, fx, ref fy);
            foreach (var line in Wrap(g, verificationUrl, 9, qrX - fx - 20)) Left(g, line, 9, false, accent, fx, ref fy);
        }
        using var ms = new MemoryStream();
        doc.Save(ms, false);
        return ms.ToArray();
    }

    private static XFont Font(bool arabic, double size, bool bold) =>
        new(arabic ? BundledFontResolver.Arabic : BundledFontResolver.Sans, size, bold ? XFontStyleEx.Bold : XFontStyleEx.Regular);

    private static double Width(XGraphics g, List<VisualRun> runs, double size, bool bold) =>
        runs.Sum(r => g.MeasureString(r.Text, Font(r.Arabic, size, bold)).Width);

    private static void DrawRuns(XGraphics g, List<VisualRun> runs, double size, bool bold, XColor color, double x, double y)
    {
        var brush = new XSolidBrush(color);
        foreach (var r in runs)
        {
            var f = Font(r.Arabic, size, bold);
            g.DrawString(r.Text, f, brush, x, y, XStringFormats.TopLeft);
            x += g.MeasureString(r.Text, f).Width;
        }
    }

    private static void Centered(XGraphics g, string text, double size, bool bold, XColor color, double pageWidth, ref double y, double after)
    {
        var runs = ArabicText.ToVisual(text);
        var maxWidth = pageWidth - 120;
        var width = Width(g, runs, size, bold);
        while (width > maxWidth && size > 7) { size -= 1; width = Width(g, runs, size, bold); } // long names/titles shrink to fit
        DrawRuns(g, runs, size, bold, color, (pageWidth - width) / 2, y);
        y += size * 1.35 + after;
    }

    private static void Left(XGraphics g, string text, double size, bool bold, XColor color, double x, ref double y)
    {
        DrawRuns(g, ArabicText.ToVisual(text), size, bold, color, x, y);
        y += size * 1.4;
    }

    /// <summary>Greedy word wrap on logical text (each wrapped line is then shaped/reordered independently).</summary>
    private static List<string> Wrap(XGraphics g, string text, double size, double maxWidth)
    {
        var lines = new List<string>();
        var current = "";
        foreach (var word in text.Split(' ', StringSplitOptions.RemoveEmptyEntries))
        {
            var candidate = current.Length == 0 ? word : current + " " + word;
            if (current.Length > 0 && Width(g, ArabicText.ToVisual(candidate), size, false) > maxWidth)
            {
                lines.Add(current);
                current = word;
            }
            else current = candidate;
        }
        if (current.Length > 0) lines.Add(current);
        return lines;
    }

    /// <summary>Draws the QR code as vector modules (error correction M, quiet zone included).</summary>
    private static void DrawQr(XGraphics g, string payload, double x, double y, double size)
    {
        using var gen = new QRCodeGenerator();
        using var data = gen.CreateQrCode(payload, QRCodeGenerator.ECCLevel.M);
        var matrix = data.ModuleMatrix;
        var n = matrix.Count;
        var cell = size / n;
        g.DrawRectangle(XBrushes.White, x, y, size, size);
        for (var r = 0; r < n; r++)
        for (var col = 0; col < n; col++)
            if (matrix[r][col])
                g.DrawRectangle(XBrushes.Black, x + col * cell, y + r * cell, cell + 0.05, cell + 0.05);
    }
}
