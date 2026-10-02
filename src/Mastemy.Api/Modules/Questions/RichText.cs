using System.Text.RegularExpressions;

namespace Mastemy.Api.Modules.Questions;

/// <summary>
/// Restricted Markdown used for stems, options, rationales, explanations and case exhibits (spec §13 "rich stems").
/// Allowed: paragraphs, **bold**, *italic*/_italic_, `inline code`, fenced code blocks (```), pipe tables, ordered and
/// unordered lists, block quotes, LaTeX math delimited by $...$ (inline) or $$...$$ (display), and images that reference a
/// course resource file by id: <c>![alt](resource:GUID)</c>.
/// Rejected (validation error, never silently rewritten): raw HTML or autolinks, headings (ATX and setext), horizontal
/// rules, hyperlinks and reference definitions, images pointing anywhere other than a course resource, unclosed code
/// fences and unbalanced math delimiters (write <c>\$</c> for a literal dollar sign).
/// The only server-side rewrite is line-ending normalization (CRLF/CR to LF) — see <see cref="Normalize"/>.
/// </summary>
public static partial class RichText
{
    [GeneratedRegex(@"!\[([^\]\n]*)\]\(([^)\n]*)\)")] private static partial Regex ImageRx();
    [GeneratedRegex(@"^resource:([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$")] private static partial Regex ResourceRx();
    [GeneratedRegex(@"\[[^\]\n]*\]\([^)\n]*\)")] private static partial Regex LinkRx();
    [GeneratedRegex(@"^\s{0,3}\[[^\]\n]+\]:\s*\S")] private static partial Regex RefDefRx();
    [GeneratedRegex(@"^\s{0,3}#{1,6}(\s|$)")] private static partial Regex AtxHeadingRx();
    [GeneratedRegex(@"^\s{0,3}(=+|-{2,})\s*$")] private static partial Regex SetextRx();
    [GeneratedRegex(@"^\s{0,3}((\*\s*){3,}|(_\s*){3,})$")] private static partial Regex RuleRx();
    [GeneratedRegex(@"<\s*[A-Za-z/!?]")] private static partial Regex HtmlRx();
    [GeneratedRegex(@"(?<!\\)\$\$(.+?)(?<!\\)\$\$", RegexOptions.Singleline)] private static partial Regex DisplayMathRx();
    [GeneratedRegex(@"(?<!\\)\$([^$\n]+?)(?<!\\)\$")] private static partial Regex InlineMathRx();
    [GeneratedRegex(@"(`+)(.+?)\1", RegexOptions.Singleline)] private static partial Regex InlineCodeRx();
    [GeneratedRegex(@"(?<!\\)\$")] private static partial Regex DollarRx();

    public static string Normalize(string? s) => (s ?? "").Replace("\r\n", "\n").Replace('\r', '\n');

    /// <summary>Validates <paramref name="text"/>; adds errors prefixed with <paramref name="field"/> and collects referenced resource ids.</summary>
    public static void Validate(string field, string? text, List<string> errors, ISet<Guid> resourceIds)
    {
        if (string.IsNullOrEmpty(text)) return;
        var lines = Normalize(text).Split('\n');

        // 1) Drop fenced code blocks (their content is literal).
        var prose = new List<string>();
        var inFence = false;
        string? fence = null;
        foreach (var line in lines)
        {
            var t = line.TrimStart();
            if (!inFence && (t.StartsWith("```") || t.StartsWith("~~~")))
            {
                inFence = true; fence = t[..3]; prose.Add(""); continue;
            }
            if (inFence)
            {
                if (t.StartsWith(fence!)) { inFence = false; fence = null; }
                prose.Add("");
                continue;
            }
            prose.Add(line);
        }
        if (inFence) { errors.Add($"{field}: code block is not closed (```)."); return; }

        var body = string.Join('\n', prose);
        // 2) Drop inline code spans and math (both literal; may legitimately contain '<', '[' or '#').
        body = InlineCodeRx().Replace(body, " ");
        body = DisplayMathRx().Replace(body, " ");
        body = InlineMathRx().Replace(body, " ");
        if (DollarRx().IsMatch(body))
            errors.Add($"{field}: unbalanced math delimiter '$' (use $...$ or $$...$$; write \\$ for a literal dollar sign).");

        // 3) Images: only course resources.
        foreach (Match m in ImageRx().Matches(body))
        {
            var target = m.Groups[2].Value.Trim();
            var rm = ResourceRx().Match(target);
            if (!rm.Success) errors.Add($"{field}: images must reference a course resource as ![alt](resource:<id>) (found '{QuestionRules.Trunc(target)}').");
            else resourceIds.Add(Guid.Parse(rm.Groups[1].Value));
        }
        var withoutImages = ImageRx().Replace(body, " ");
        if (LinkRx().IsMatch(withoutImages)) errors.Add($"{field}: hyperlinks are not allowed.");
        if (HtmlRx().IsMatch(withoutImages)) errors.Add($"{field}: HTML tags and autolinks are not allowed.");

        var bodyLines = withoutImages.Split('\n');
        for (var i = 0; i < bodyLines.Length; i++)
        {
            var l = bodyLines[i];
            if (AtxHeadingRx().IsMatch(l)) { errors.Add($"{field}: headings are not allowed."); break; }
            if (RefDefRx().IsMatch(l)) { errors.Add($"{field}: link reference definitions are not allowed."); break; }
            if (RuleRx().IsMatch(l)) { errors.Add($"{field}: horizontal rules are not allowed."); break; }
            if (SetextRx().IsMatch(l) && !l.Contains('|'))
            {
                var prev = i > 0 ? bodyLines[i - 1] : "";
                errors.Add(prev.Trim().Length > 0 && !prev.Contains('|')
                    ? $"{field}: headings are not allowed."
                    : $"{field}: horizontal rules are not allowed.");
                break;
            }
        }
    }

    /// <summary>Resource ids referenced as images in <paramref name="text"/> (no validation).</summary>
    public static IEnumerable<Guid> ResourceIds(string? text)
    {
        if (string.IsNullOrEmpty(text)) yield break;
        foreach (Match m in ImageRx().Matches(text))
        {
            var rm = ResourceRx().Match(m.Groups[2].Value.Trim());
            if (rm.Success) yield return Guid.Parse(rm.Groups[1].Value);
        }
    }

    public static readonly string[] ImageContentTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];
}
