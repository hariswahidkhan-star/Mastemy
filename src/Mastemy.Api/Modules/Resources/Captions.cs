using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Resources;

public record CaptionCue(TimeSpan Start, TimeSpan End, string Text);

/// <summary>Strict-enough WebVTT/SRT parsing: every cue must have valid, ordered timings. SRT is converted to WebVTT for players.</summary>
public static partial class Captions
{
    public const int MaxCues = 20_000;

    [GeneratedRegex(@"^\s*(?<s>(\d{1,3}:)?\d{2}:\d{2}[\.,]\d{3})\s*-->\s*(?<e>(\d{1,3}:)?\d{2}:\d{2}[\.,]\d{3})(?<settings>[ \t].*)?$")]
    private static partial Regex TimingLine();

    [GeneratedRegex("^[A-Za-z]{2,3}(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-[A-Za-z0-9]{5,8})*$")]
    private static partial Regex Bcp47();

    [GeneratedRegex("<[^>]{0,200}>")]
    private static partial Regex Tags();

    public static string NormalizeLanguage(string? lang)
    {
        var l = (lang ?? "").Trim();
        if (l.Length is 0 or > 35 || !Bcp47().IsMatch(l))
            throw AppException.Bad("language must be a BCP-47 tag such as 'en', 'ar' or 'en-GB'.", "invalid_language");
        var parts = l.Split('-');
        parts[0] = parts[0].ToLowerInvariant();
        for (var i = 1; i < parts.Length; i++)
            parts[i] = parts[i].Length == 4 ? char.ToUpperInvariant(parts[i][0]) + parts[i][1..].ToLowerInvariant()
                : parts[i].Length is 2 or 3 ? parts[i].ToUpperInvariant() : parts[i].ToLowerInvariant();
        return string.Join('-', parts);
    }

    private static TimeSpan ParseTime(string t)
    {
        t = t.Replace(',', '.');
        var parts = t.Split(':');
        int h = 0, m, idx = 0;
        if (parts.Length == 3) h = int.Parse(parts[idx++], CultureInfo.InvariantCulture);
        m = int.Parse(parts[idx++], CultureInfo.InvariantCulture);
        var secParts = parts[idx].Split('.');
        var s = int.Parse(secParts[0], CultureInfo.InvariantCulture);
        var ms = int.Parse(secParts[1], CultureInfo.InvariantCulture);
        if (m > 59 || s > 59) throw new FormatException();
        return new TimeSpan(0, h, m, s, ms);
    }

    /// <summary>Parses WebVTT ("vtt") or SubRip ("srt") text. Throws 400 invalid_caption_file on any malformed cue.</summary>
    public static List<CaptionCue> Parse(string text, string format)
    {
        if (text.Length > 0 && text[0] == '﻿') text = text[1..];
        var lines = text.Replace("\r\n", "\n").Replace('\r', '\n').Split('\n');
        var i = 0;
        if (format == "vtt")
        {
            if (lines.Length == 0 || !(lines[0] == "WEBVTT" || lines[0].StartsWith("WEBVTT ") || lines[0].StartsWith("WEBVTT\t")))
                throw Invalid("WebVTT files must start with 'WEBVTT'.");
            i = 1;
        }
        var cues = new List<CaptionCue>();
        while (i < lines.Length)
        {
            if (string.IsNullOrWhiteSpace(lines[i])) { i++; continue; }
            // Skip WebVTT NOTE/STYLE/REGION blocks.
            if (format == "vtt" && (lines[i].StartsWith("NOTE") || lines[i] == "STYLE" || lines[i] == "REGION"))
            {
                while (i < lines.Length && !string.IsNullOrWhiteSpace(lines[i])) i++;
                continue;
            }
            var blockStart = i + 1;
            var m = TimingLine().Match(lines[i]);
            if (!m.Success && i + 1 < lines.Length) { i++; m = TimingLine().Match(lines[i]); } // cue identifier / SRT index
            if (!m.Success) throw Invalid($"Missing or malformed cue timing near line {blockStart}.");
            TimeSpan start, end;
            try { start = ParseTime(m.Groups["s"].Value); end = ParseTime(m.Groups["e"].Value); }
            catch (Exception e) when (e is FormatException or OverflowException or ArgumentOutOfRangeException)
            { throw Invalid($"Invalid timestamp near line {i + 1}."); }
            if (end <= start) throw Invalid($"Cue end must be after its start (line {i + 1}).");
            i++;
            var sb = new StringBuilder();
            while (i < lines.Length && !string.IsNullOrWhiteSpace(lines[i]))
            {
                if (TimingLine().IsMatch(lines[i])) throw Invalid($"Cue without a blank separator near line {i + 1}.");
                if (sb.Length > 0) sb.Append('\n');
                sb.Append(lines[i]);
                i++;
            }
            cues.Add(new CaptionCue(start, end, sb.ToString()));
            if (cues.Count > MaxCues) throw Invalid($"Too many cues (max {MaxCues}).");
        }
        if (cues.Count == 0) throw Invalid("The caption file contains no cues.");
        return cues;
    }

    private static AppException Invalid(string msg) => AppException.Bad("Invalid caption file: " + msg, "invalid_caption_file");

    public static string FormatVtt(TimeSpan t) =>
        $"{(int)t.TotalHours:00}:{t.Minutes:00}:{t.Seconds:00}.{t.Milliseconds:000}";

    /// <summary>Serializes cues as WebVTT. Cue text is emitted verbatim except that "-->" is neutralized.</summary>
    public static string ToVtt(IEnumerable<CaptionCue> cues)
    {
        var sb = new StringBuilder("WEBVTT\n\n");
        foreach (var c in cues)
            sb.Append(FormatVtt(c.Start)).Append(" --> ").Append(FormatVtt(c.End)).Append('\n')
              .Append(c.Text.Replace("-->", "->")).Append("\n\n");
        return sb.ToString();
    }

    /// <summary>Cue text with markup tags removed, for transcript display/search.</summary>
    public static string PlainText(string cueText) =>
        System.Net.WebUtility.HtmlDecode(Tags().Replace(cueText, "")).Replace('\n', ' ').Trim();
}
