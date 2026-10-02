using System.Globalization;
using System.IO.Compression;
using System.Security;
using System.Text;
using System.Xml;

namespace Mastemy.Api.Modules.Questions;

public class XlsxFormatException(string message) : Exception(message);

/// <summary>
/// Minimal, dependency-free Office Open XML spreadsheet (.xlsx) reader and writer built on System.IO.Compression and
/// XmlReader (no third-party licence to track).
/// Reader rules (spec §14 "never execute spreadsheet formulas"): only the first worksheet is read; cell values are taken as
/// the raw stored text (shared/inline strings, numbers exactly as stored, TRUE/FALSE); any cell containing a formula is
/// rejected with its cell reference — cached formula results are never trusted. Macro-enabled workbooks, DTDs, oversized
/// or excessively compressed parts (zip bombs) are refused.
/// Writer: inline-string cells only (nothing a spreadsheet would evaluate), with formula-looking values neutralized.
/// </summary>
public static class Xlsx
{
    public const int MaxEntries = 200;
    public const long MaxPartBytes = 64L * 1024 * 1024;
    public const long MaxTotalBytes = 128L * 1024 * 1024;
    public const int MaxCompressionRatio = 200;
    public const int MaxColumns = 200;

    private const string MainNs = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
    private const string RelNs = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
    private const string PkgRelNs = "http://schemas.openxmlformats.org/package/2006/relationships";

    public static bool LooksLikeXlsx(byte[] bytes) => bytes.Length > 4 && bytes[0] == 'P' && bytes[1] == 'K' && bytes[2] == 3 && bytes[3] == 4;

    /// <summary>Reads the first worksheet as rows of raw cell text (row 1 first). Empty trailing cells are trimmed per row.</summary>
    public static List<List<string>> Read(byte[] bytes, int maxRows)
    {
        ZipArchive zip;
        try { zip = new ZipArchive(new MemoryStream(bytes, writable: false), ZipArchiveMode.Read); }
        catch (InvalidDataException) { throw new XlsxFormatException("The file is not a valid .xlsx workbook."); }
        using (zip)
        {
            if (zip.Entries.Count > MaxEntries) throw new XlsxFormatException("The workbook contains too many parts.");
            long total = 0;
            foreach (var e in zip.Entries)
            {
                if (e.FullName.Contains("vbaProject", StringComparison.OrdinalIgnoreCase))
                    throw new XlsxFormatException("Macro-enabled workbooks are not accepted.");
                if (e.Length > MaxPartBytes) throw new XlsxFormatException("A workbook part is too large.");
                if (e.CompressedLength > 0 && e.Length / Math.Max(1, e.CompressedLength) > MaxCompressionRatio && e.Length > 1024 * 1024)
                    throw new XlsxFormatException("The workbook is compressed suspiciously (possible archive bomb).");
                total += e.Length;
            }
            if (total > MaxTotalBytes) throw new XlsxFormatException("The workbook is too large when uncompressed.");

            var sheetPath = FirstSheetPath(zip);
            var shared = SharedStrings(zip);
            var sheet = zip.GetEntry(sheetPath) ?? throw new XlsxFormatException("The workbook has no worksheet.");
            return ReadSheet(sheet, shared, maxRows);
        }
    }

    private static XmlReader Xml(ZipArchiveEntry e) => XmlReader.Create(new LimitedStream(e.Open(), MaxPartBytes), new XmlReaderSettings
    {
        DtdProcessing = DtdProcessing.Prohibit, XmlResolver = null, IgnoreWhitespace = false, IgnoreComments = true, MaxCharactersFromEntities = 0,
    });

    private static string FirstSheetPath(ZipArchive zip)
    {
        var wb = zip.GetEntry("xl/workbook.xml") ?? throw new XlsxFormatException("The file is not an .xlsx workbook (xl/workbook.xml missing).");
        string? rid = null;
        using (var r = Xml(wb))
            while (r.Read())
                if (r.NodeType == XmlNodeType.Element && r.LocalName == "sheet" && r.NamespaceURI == MainNs) { rid = r.GetAttribute("id", RelNs); break; }
        if (rid is null) throw new XlsxFormatException("The workbook has no worksheet.");
        var rels = zip.GetEntry("xl/_rels/workbook.xml.rels");
        if (rels is null) return "xl/worksheets/sheet1.xml";
        using (var r = Xml(rels))
            while (r.Read())
                if (r.NodeType == XmlNodeType.Element && r.LocalName == "Relationship" && r.NamespaceURI == PkgRelNs && r.GetAttribute("Id") == rid)
                {
                    var target = r.GetAttribute("Target") ?? "";
                    if (r.GetAttribute("TargetMode") == "External") throw new XlsxFormatException("External worksheets are not accepted.");
                    target = target.StartsWith('/') ? target.TrimStart('/') : "xl/" + target;
                    return Path.GetFullPath("/" + target).TrimStart('/').Replace('\\', '/') is var p && p.StartsWith("xl/") ? p : throw new XlsxFormatException("Invalid worksheet path.");
                }
        throw new XlsxFormatException("The first worksheet could not be located.");
    }

    private static List<string> SharedStrings(ZipArchive zip)
    {
        var list = new List<string>();
        var e = zip.GetEntry("xl/sharedStrings.xml");
        if (e is null) return list;
        using var r = Xml(e);
        StringBuilder? sb = null;
        var phonetic = 0;
        var advanced = false;
        while (advanced || r.Read())
        {
            advanced = false;
            if (r.NodeType == XmlNodeType.Element && r.NamespaceURI == MainNs)
            {
                if (r.LocalName == "si") sb = new StringBuilder();
                else if (r.LocalName == "rPh" && !r.IsEmptyElement) phonetic++;
                else if (r.LocalName == "t" && sb is not null && phonetic == 0 && !r.IsEmptyElement) { sb.Append(r.ReadElementContentAsString()); advanced = true; }
            }
            else if (r.NodeType == XmlNodeType.EndElement && r.NamespaceURI == MainNs)
            {
                if (r.LocalName == "si" && sb is not null) { list.Add(sb.ToString()); sb = null; }
                else if (r.LocalName == "rPh") phonetic--;
            }
        }
        return list;
    }

    private static List<List<string>> ReadSheet(ZipArchiveEntry sheet, List<string> shared, int maxRows)
    {
        var rows = new SortedDictionary<int, SortedDictionary<int, string>>();
        using var r = Xml(sheet);
        int rowNo = 0;
        while (r.Read())
        {
            if (r.NodeType != XmlNodeType.Element || r.NamespaceURI != MainNs) continue;
            if (r.LocalName == "row")
            {
                rowNo = int.TryParse(r.GetAttribute("r"), NumberStyles.None, CultureInfo.InvariantCulture, out var rn) ? rn : rowNo + 1;
                if (rowNo > maxRows + 1) throw new XlsxFormatException($"The worksheet has more than {maxRows} data rows.");
                continue;
            }
            if (r.LocalName != "c") continue;
            var cellRef = r.GetAttribute("r");
            var type = r.GetAttribute("t") ?? "n";
            var (col, rowFromRef) = ParseRef(cellRef);
            var thisRow = rowFromRef ?? rowNo;
            if (col is null)
            {
                rows.TryGetValue(thisRow, out var existing);
                col = existing is null || existing.Count == 0 ? 1 : existing.Keys.Max() + 1;
            }
            if (col > MaxColumns) throw new XlsxFormatException($"The worksheet has more than {MaxColumns} columns.");
            string? value = null;
            if (!r.IsEmptyElement)
            {
                var depth = r.Depth;
                var advanced = false;
                while (advanced || r.Read())
                {
                    advanced = false;
                    if (r.NodeType == XmlNodeType.EndElement && r.Depth == depth) break;
                    if (r.NodeType != XmlNodeType.Element || r.NamespaceURI != MainNs) continue;
                    if (r.LocalName == "f")
                        throw new XlsxFormatException($"Cell {cellRef ?? $"{ColumnName(col.Value)}{thisRow}"} contains a formula; formulas are not accepted. Paste values only.");
                    if (r.LocalName == "v" && !r.IsEmptyElement) { value = r.ReadElementContentAsString(); advanced = true; }
                    else if (r.LocalName == "is" && !r.IsEmptyElement) value = InlineText(r);
                }
            }
            string text = type switch
            {
                "s" => int.TryParse(value, NumberStyles.None, CultureInfo.InvariantCulture, out var idx) && idx >= 0 && idx < shared.Count
                    ? shared[idx] : throw new XlsxFormatException($"Cell {cellRef} references a missing shared string."),
                "b" => value == "1" ? "TRUE" : "FALSE",
                "e" => throw new XlsxFormatException($"Cell {cellRef} contains an error value."),
                "str" => throw new XlsxFormatException($"Cell {cellRef} contains a formula result; formulas are not accepted."),
                _ => value ?? "",
            };
            if (!rows.TryGetValue(thisRow, out var cells)) rows[thisRow] = cells = new SortedDictionary<int, string>();
            cells[col.Value] = text;
        }
        var result = new List<List<string>>();
        if (rows.Count == 0) return result;
        var last = rows.Keys.Max();
        for (var i = 1; i <= last; i++)
        {
            if (!rows.TryGetValue(i, out var cells) || cells.Count == 0) { result.Add([]); continue; }
            var width = cells.Keys.Max();
            var list = new List<string>(width);
            for (var c = 1; c <= width; c++) list.Add(cells.GetValueOrDefault(c, ""));
            result.Add(list);
        }
        return result;
    }

    private static string InlineText(XmlReader r)
    {
        var sb = new StringBuilder();
        var depth = r.Depth;
        var phonetic = 0;
        var advanced = false;
        while (advanced || r.Read())
        {
            advanced = false;
            if (r.NodeType == XmlNodeType.EndElement && r.Depth == depth) break;
            if (r.NodeType == XmlNodeType.Element && r.LocalName == "rPh" && !r.IsEmptyElement) phonetic++;
            else if (r.NodeType == XmlNodeType.EndElement && r.LocalName == "rPh") phonetic--;
            else if (r.NodeType == XmlNodeType.Element && r.LocalName == "t" && phonetic == 0 && !r.IsEmptyElement) { sb.Append(r.ReadElementContentAsString()); advanced = true; }
        }
        return sb.ToString();
    }

    private static (int? Col, int? Row) ParseRef(string? cellRef)
    {
        if (string.IsNullOrEmpty(cellRef)) return (null, null);
        var col = 0; var i = 0;
        while (i < cellRef.Length && char.IsAsciiLetterUpper(cellRef[i])) { col = col * 26 + (cellRef[i] - 'A' + 1); i++; if (col > 16384) return (null, null); }
        int? row = int.TryParse(cellRef.AsSpan(i), NumberStyles.None, CultureInfo.InvariantCulture, out var rr) ? rr : null;
        return (col == 0 ? null : col, row);
    }

    public static string ColumnName(int col)
    {
        var s = "";
        while (col > 0) { var m = (col - 1) % 26; s = (char)('A' + m) + s; col = (col - 1) / 26; }
        return s;
    }

    // ---------------- Writer ----------------

    /// <summary>Writes a single-sheet workbook of inline strings. Values that look like formulas are neutralized with a leading apostrophe.</summary>
    public static byte[] Write(string sheetName, IEnumerable<IEnumerable<string?>> rows)
    {
        using var ms = new MemoryStream();
        using (var zip = new ZipArchive(ms, ZipArchiveMode.Create, leaveOpen: true))
        {
            Part(zip, "[Content_Types].xml",
                "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Types xmlns=\"http://schemas.openxmlformats.org/package/2006/content-types\">" +
                "<Default Extension=\"rels\" ContentType=\"application/vnd.openxmlformats-package.relationships+xml\"/>" +
                "<Default Extension=\"xml\" ContentType=\"application/xml\"/>" +
                "<Override PartName=\"/xl/workbook.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml\"/>" +
                "<Override PartName=\"/xl/worksheets/sheet1.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\"/>" +
                "<Override PartName=\"/xl/styles.xml\" ContentType=\"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml\"/>" +
                "</Types>");
            Part(zip, "_rels/.rels",
                "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Relationships xmlns=\"" + PkgRelNs + "\">" +
                "<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument\" Target=\"xl/workbook.xml\"/></Relationships>");
            Part(zip, "xl/workbook.xml",
                "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><workbook xmlns=\"" + MainNs + "\" xmlns:r=\"" + RelNs + "\">" +
                "<sheets><sheet name=\"" + SecurityElement.Escape(sheetName) + "\" sheetId=\"1\" r:id=\"rId1\"/></sheets></workbook>");
            Part(zip, "xl/_rels/workbook.xml.rels",
                "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Relationships xmlns=\"" + PkgRelNs + "\">" +
                "<Relationship Id=\"rId1\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet\" Target=\"worksheets/sheet1.xml\"/>" +
                "<Relationship Id=\"rId2\" Type=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles\" Target=\"styles.xml\"/></Relationships>");
            Part(zip, "xl/styles.xml",
                "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><styleSheet xmlns=\"" + MainNs + "\">" +
                "<fonts count=\"2\"><font><sz val=\"11\"/><name val=\"Calibri\"/></font><font><b/><sz val=\"11\"/><name val=\"Calibri\"/></font></fonts>" +
                "<fills count=\"2\"><fill><patternFill patternType=\"none\"/></fill><fill><patternFill patternType=\"gray125\"/></fill></fills>" +
                "<borders count=\"1\"><border><left/><right/><top/><bottom/><diagonal/></border></borders>" +
                "<cellStyleXfs count=\"1\"><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\"/></cellStyleXfs>" +
                "<cellXfs count=\"2\"><xf numFmtId=\"0\" fontId=\"0\" fillId=\"0\" borderId=\"0\" xfId=\"0\"/>" +
                "<xf numFmtId=\"49\" fontId=\"1\" fillId=\"0\" borderId=\"0\" xfId=\"0\" applyFont=\"1\" applyNumberFormat=\"1\"/></cellXfs>" +
                "</styleSheet>");
            var sb = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><worksheet xmlns=\"" + MainNs + "\"><sheetData>");
            var r = 0;
            foreach (var row in rows)
            {
                r++;
                sb.Append("<row r=\"").Append(r).Append("\">");
                var c = 0;
                foreach (var v in row)
                {
                    c++;
                    var text = Csv.Neutralize(v);
                    sb.Append("<c r=\"").Append(ColumnName(c)).Append(r).Append("\" t=\"inlineStr\"").Append(r == 1 ? " s=\"1\"" : "")
                      .Append("><is><t xml:space=\"preserve\">").Append(XmlEscape(text)).Append("</t></is></c>");
                }
                sb.Append("</row>");
            }
            sb.Append("</sheetData></worksheet>");
            Part(zip, "xl/worksheets/sheet1.xml", sb.ToString());
        }
        return ms.ToArray();
    }

    /// <summary>XML-escapes text and drops characters that are illegal in XML 1.0.</summary>
    private static string XmlEscape(string s)
    {
        var sb = new StringBuilder(s.Length);
        foreach (var ch in s)
        {
            if (ch is '\t' or '\n' or '\r' || (ch >= 0x20 && ch != 0xFFFE && ch != 0xFFFF)) sb.Append(ch switch
            {
                '<' => "&lt;", '>' => "&gt;", '&' => "&amp;", '"' => "&quot;", _ => ch.ToString(),
            });
        }
        return sb.ToString();
    }

    private static void Part(ZipArchive zip, string name, string content)
    {
        var e = zip.CreateEntry(name, CompressionLevel.Optimal);
        using var s = e.Open();
        var b = new UTF8Encoding(false).GetBytes(content);
        s.Write(b);
    }

    /// <summary>Throws once more than <c>max</c> bytes are read from the inner stream (defence against lying zip headers).</summary>
    private sealed class LimitedStream(Stream inner, long max) : Stream
    {
        private long read;
        public override bool CanRead => true;
        public override bool CanSeek => false;
        public override bool CanWrite => false;
        public override long Length => throw new NotSupportedException();
        public override long Position { get => read; set => throw new NotSupportedException(); }
        public override void Flush() { }
        public override int Read(byte[] buffer, int offset, int count)
        {
            var n = inner.Read(buffer, offset, count);
            read += n;
            if (read > max) throw new XlsxFormatException("A workbook part is too large.");
            return n;
        }
        public override long Seek(long offset, SeekOrigin origin) => throw new NotSupportedException();
        public override void SetLength(long value) => throw new NotSupportedException();
        public override void Write(byte[] buffer, int offset, int count) => throw new NotSupportedException();
        protected override void Dispose(bool disposing) { if (disposing) inner.Dispose(); base.Dispose(disposing); }
    }
}
