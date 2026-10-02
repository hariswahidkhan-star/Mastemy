using System.IO.Compression;
using System.Text;
using Mastemy.Api.Modules.Questions;

namespace Mastemy.Tests.Questions;

public class RichTextAndXlsxTests
{
    private static List<string> Errors(string text, out HashSet<Guid> ids)
    {
        var e = new List<string>();
        ids = [];
        RichText.Validate("stem", text, e, ids);
        return e;
    }

    [Theory]
    [InlineData("Plain **bold** and *italic* and _also italic_.")]
    [InlineData("Inline `x < y && <div>` code is literal.")]
    [InlineData("```\n<script>alert(1)</script>\n# not a heading\n```")]
    [InlineData("| a | b |\n|---|---|\n| 1 | 2 |")]
    [InlineData("- one\n- two\n\n1. first\n2. second")]
    [InlineData("Solve $x^2 < 4$ and $$\\int_0^1 x\\,dx$$")]
    [InlineData("It costs \\$5.")]
    [InlineData("> quoted exhibit text")]
    public void Allowed_markdown_passes(string text)
    {
        Assert.Empty(Errors(text, out _));
    }

    [Theory]
    [InlineData("# Heading", "headings")]
    [InlineData("Title\n=====", "headings")]
    [InlineData("Title\n---", "headings")]
    [InlineData("***", "horizontal rules")]
    [InlineData("Click <b>here</b>", "HTML")]
    [InlineData("See <https://evil.example>", "HTML")]
    [InlineData("[link](https://example.com)", "hyperlinks")]
    [InlineData("[ref]: https://example.com", "reference")]
    [InlineData("![x](https://example.com/a.png)", "course resource")]
    [InlineData("![x](javascript:alert(1))", "course resource")]
    [InlineData("```\nnever closed", "not closed")]
    [InlineData("It costs $5", "unbalanced")]
    public void Disallowed_markdown_is_rejected(string text, string expected)
    {
        var e = Errors(text, out _);
        Assert.Contains(e, m => m.Contains(expected, StringComparison.OrdinalIgnoreCase));
    }

    [Fact]
    public void Resource_images_are_collected()
    {
        var id = Guid.NewGuid();
        Assert.Empty(Errors($"Look: ![chart](resource:{id})", out var ids));
        Assert.Equal([id], ids);
    }

    [Fact]
    public void Xlsx_round_trip_reads_raw_text_and_neutralizes_formula_like_values()
    {
        var bytes = Xlsx.Write("Q", [["ExternalId", "Stem"], ["Q-1", "مرحبا <b> & \"x\""], ["Q-2", "=SUM(A1:A2)"]]);
        var rows = Xlsx.Read(bytes, 10);
        Assert.Equal(3, rows.Count);
        Assert.Equal("مرحبا <b> & \"x\"", rows[1][1]);
        Assert.Equal("'=SUM(A1:A2)", rows[2][1]); // written as text, never as a formula
    }

    private static byte[] Workbook(string sheetXml, string? sharedStrings = null, bool macro = false)
    {
        using var ms = new MemoryStream();
        using (var zip = new ZipArchive(ms, ZipArchiveMode.Create, true))
        {
            void Add(string name, string content)
            {
                using var s = zip.CreateEntry(name).Open();
                s.Write(Encoding.UTF8.GetBytes(content));
            }
            const string ns = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
            Add("xl/workbook.xml", $"<workbook xmlns=\"{ns}\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"><sheets><sheet name=\"S\" sheetId=\"1\" r:id=\"rId1\"/></sheets></workbook>");
            Add("xl/_rels/workbook.xml.rels", "<Relationships xmlns=\"http://schemas.openxmlformats.org/package/2006/relationships\"><Relationship Id=\"rId1\" Type=\"x\" Target=\"worksheets/sheet1.xml\"/></Relationships>");
            Add("xl/worksheets/sheet1.xml", $"<worksheet xmlns=\"{ns}\"><sheetData>{sheetXml}</sheetData></worksheet>");
            if (sharedStrings is not null) Add("xl/sharedStrings.xml", $"<sst xmlns=\"{ns}\">{sharedStrings}</sst>");
            if (macro) Add("xl/vbaProject.bin", "x");
        }
        return ms.ToArray();
    }

    [Fact]
    public void Xlsx_cells_with_formulas_are_rejected_with_cell_reference()
    {
        var bytes = Workbook("<row r=\"1\"><c r=\"A1\" t=\"inlineStr\"><is><t>A</t></is></c></row><row r=\"2\"><c r=\"B2\"><f>1+1</f><v>2</v></c></row>");
        var ex = Assert.Throws<XlsxFormatException>(() => Xlsx.Read(bytes, 10));
        Assert.Contains("B2", ex.Message);
        Assert.Contains("formula", ex.Message);
    }

    [Fact]
    public void Xlsx_reads_shared_strings_numbers_and_rich_runs()
    {
        var bytes = Workbook(
            "<row r=\"1\"><c r=\"A1\" t=\"s\"><v>0</v></c><c r=\"C1\" t=\"s\"><v>1</v></c></row><row r=\"2\"><c r=\"A2\"><v>42</v></c><c r=\"B2\" t=\"b\"><v>1</v></c></row>",
            "<si><t>Head</t></si><si><r><t>Ri</t></r><r><t>ch</t></r></si>");
        var rows = Xlsx.Read(bytes, 10);
        Assert.Equal(["Head", "", "Rich"], rows[0]);
        Assert.Equal(["42", "TRUE"], rows[1]);
    }

    [Fact]
    public void Macro_workbooks_and_non_zip_files_are_rejected()
    {
        Assert.Throws<XlsxFormatException>(() => Xlsx.Read(Workbook("", null, macro: true), 10));
        Assert.Throws<XlsxFormatException>(() => Xlsx.Read(Encoding.UTF8.GetBytes("PK\u0003\u0004 not really a zip"), 10));
    }

    [Fact]
    public void Dtds_are_refused()
    {
        var bytes = Workbook("<row r=\"1\"><c r=\"A1\" t=\"inlineStr\"><is><t>A</t></is></c></row>");
        // Rebuild the sheet with a DTD (entity expansion attack).
        using var ms = new MemoryStream();
        ms.Write(bytes);
        using (var zip = new ZipArchive(ms, ZipArchiveMode.Update, true))
        {
            zip.GetEntry("xl/worksheets/sheet1.xml")!.Delete();
            using var s = zip.CreateEntry("xl/worksheets/sheet1.xml").Open();
            s.Write(Encoding.UTF8.GetBytes("<!DOCTYPE x [<!ENTITY a \"aaaa\">]><worksheet xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\"><sheetData/></worksheet>"));
        }
        Assert.ThrowsAny<Exception>(() => Xlsx.Read(ms.ToArray(), 10));
    }

    [Fact]
    public void Column_mapping_suggestions_cover_common_header_names()
    {
        var m = QuestionImportService.SuggestMapping(["Question ID", "Question", "Choice A", "Choice B", "Answer", "Rationale B", "Level", "Image", "Whatever"]);
        Assert.Equal("ExternalId", m["Question ID"]);
        Assert.Equal("Stem", m["Question"]);
        Assert.Equal("OptionA", m["Choice A"]);
        Assert.Equal("OptionB", m["Choice B"]);
        Assert.Equal("CorrectOptions", m["Answer"]);
        Assert.Equal("ExplanationB", m["Rationale B"]);
        Assert.Equal("Difficulty", m["Level"]);
        Assert.Equal("ImageResource", m["Image"]);
        Assert.Null(m["Whatever"]);
    }
}
