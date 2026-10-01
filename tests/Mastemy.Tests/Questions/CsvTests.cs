using Mastemy.Api.Modules.Questions;

namespace Mastemy.Tests.Questions;

public class CsvTests
{
    [Fact]
    public void Parses_quoted_commas_escaped_quotes_and_embedded_newlines()
    {
        var rows = Csv.Parse("a,b,c\r\n\"x, y\",\"He said \"\"hi\"\"\",\"line1\r\nline2\nline3\"\r\n");
        Assert.Equal(2, rows.Count);
        Assert.Equal(["x, y", "He said \"hi\"", "line1\r\nline2\nline3"], rows[1]);
    }

    [Fact]
    public void Strips_bom_and_keeps_arabic_text()
    {
        var rows = Csv.Parse("﻿Stem,Option\n\"ما الذي يصف، بشكل أدق\nالنموذج؟\",نموذج يتنبأ بالنص\n");
        Assert.Equal("Stem", rows[0][0]);
        Assert.Equal("ما الذي يصف، بشكل أدق\nالنموذج؟", rows[1][0]);
        Assert.Equal("نموذج يتنبأ بالنص", rows[1][1]);
    }

    [Fact]
    public void Handles_lf_cr_line_endings_blank_lines_empty_fields_and_missing_trailing_newline()
    {
        var rows = Csv.Parse("a,b\r\r\n\n1,\r2,\"\"\n,\n3,4");
        Assert.Equal(5, rows.Count);
        Assert.Equal(["1", ""], rows[1]);
        Assert.Equal(["2", ""], rows[2]);
        Assert.Equal(["", ""], rows[3]);
        Assert.Equal(["3", "4"], rows[4]);
    }

    [Theory]
    [InlineData("a,\"unterminated\n")]
    [InlineData("a,b\"c\n")]
    [InlineData("\"x\"y,z\n")]
    public void Rejects_malformed_quoting(string text) => Assert.Throws<CsvFormatException>(() => Csv.Parse(text));

    [Theory]
    [InlineData("=SUM(A1:A2)", "'=SUM(A1:A2)")]
    [InlineData("+1", "'+1")]
    [InlineData("-cmd", "'-cmd")]
    [InlineData("@x", "'@x")]
    [InlineData("\tx", "'\tx")]
    [InlineData("\rx", "'\rx")]
    [InlineData("plain = text", "plain = text")]
    public void Neutralizes_formula_prefixes(string input, string expected) => Assert.Equal(expected, Csv.Neutralize(input));

    [Fact]
    public void Writer_round_trips_through_parser()
    {
        var data = new[] { new[] { "=1+1", "a,b", "quote \"q\"", "multi\r\nline", "عربي" } };
        var parsed = Csv.Parse(Csv.Write(data));
        Assert.Equal(["'=1+1", "a,b", "quote \"q\"", "multi\r\nline", "عربي"], parsed[0]);
    }
}
