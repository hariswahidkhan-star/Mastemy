using System.Text;

namespace Mastemy.Api.Modules.Questions;

public class CsvFormatException(string message, int line) : Exception(message)
{
    public int Line { get; } = line;
}

/// <summary>
/// Strict RFC 4180 CSV reader/writer. Supports quoted fields, escaped quotes (""), embedded commas and
/// line breaks (CRLF, LF or CR), a leading UTF-8 BOM and any Unicode text (e.g. Arabic).
/// Malformed input (stray quotes, unterminated quoted fields) raises <see cref="CsvFormatException"/>.
/// Blank lines are skipped.
/// </summary>
public static class Csv
{
    public static List<List<string>> Parse(string text)
    {
        var records = new List<List<string>>();
        if (string.IsNullOrEmpty(text)) return records;
        var i = text[0] == '﻿' ? 1 : 0;
        var record = new List<string>();
        var field = new StringBuilder();
        var line = 1;
        var started = false; // any content (char, comma or quote) consumed for the current record

        void EndRecord()
        {
            record.Add(field.ToString());
            field.Clear();
            if (started) records.Add(record);
            record = [];
            started = false;
        }

        while (i < text.Length)
        {
            var c = text[i];
            if (c == '"')
            {
                if (field.Length > 0) throw new CsvFormatException($"Unexpected quote inside an unquoted field on line {line}.", line);
                started = true;
                var quoteLine = line;
                i++;
                var closed = false;
                while (i < text.Length)
                {
                    var q = text[i];
                    if (q == '"')
                    {
                        if (i + 1 < text.Length && text[i + 1] == '"') { field.Append('"'); i += 2; continue; }
                        i++; closed = true; break;
                    }
                    if (q == '\r')
                    {
                        line++;
                        if (i + 1 < text.Length && text[i + 1] == '\n') { field.Append("\r\n"); i += 2; continue; }
                    }
                    else if (q == '\n') line++;
                    field.Append(q); i++;
                }
                if (!closed) throw new CsvFormatException($"Unterminated quoted field starting on line {quoteLine}.", quoteLine);
                if (i < text.Length && text[i] is not (',' or '\r' or '\n'))
                    throw new CsvFormatException($"Unexpected character after closing quote on line {line}.", line);
                continue;
            }
            if (c == ',') { started = true; record.Add(field.ToString()); field.Clear(); i++; continue; }
            if (c is '\r' or '\n')
            {
                if (c == '\r' && i + 1 < text.Length && text[i + 1] == '\n') i++;
                i++; line++;
                EndRecord();
                continue;
            }
            started = true;
            field.Append(c); i++;
        }
        if (started) EndRecord();
        return records;
    }

    /// <summary>Prefixes a single quote to cells that spreadsheet apps would interpret as formulas.</summary>
    public static string Neutralize(string? value)
    {
        value ??= "";
        if (value.Length > 0 && value[0] is '=' or '+' or '-' or '@' or '\t' or '\r') return "'" + value;
        return value;
    }

    public static string Escape(string? value)
    {
        var v = Neutralize(value);
        var needsQuotes = v.IndexOfAny([',', '"', '\r', '\n']) >= 0 || (v.Length > 0 && (char.IsWhiteSpace(v[0]) || char.IsWhiteSpace(v[^1])));
        return needsQuotes ? "\"" + v.Replace("\"", "\"\"") + "\"" : v;
    }

    public static string Write(IEnumerable<IEnumerable<string?>> rows)
    {
        var sb = new StringBuilder();
        foreach (var r in rows) sb.Append(string.Join(',', r.Select(Escape))).Append("\r\n");
        return sb.ToString();
    }

    /// <summary>UTF-8 bytes with BOM so spreadsheet apps open Arabic text correctly.</summary>
    public static byte[] ToUtf8WithBom(string csv) => [.. Encoding.UTF8.GetPreamble(), .. Encoding.UTF8.GetBytes(csv)];
}
