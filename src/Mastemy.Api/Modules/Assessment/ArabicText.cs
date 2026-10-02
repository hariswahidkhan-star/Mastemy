using System.Text;

namespace Mastemy.Api.Modules.Assessment;

/// <summary>A run of text in visual (left-to-right drawing) order, tagged with whether it needs the Arabic font.</summary>
public record VisualRun(string Text, bool Arabic);

/// <summary>
/// Minimal Arabic text preparation for PDF output, where the PDF library draws code points without OpenType shaping:
/// (1) contextual shaping into Unicode Arabic Presentation Forms (isolated/initial/medial/final, plus lam-alef
/// ligatures), and (2) a simplified single-line bidi reordering (RTL base when the line contains Arabic, LTR runs such
/// as Latin words and digits kept in reading order). Diacritics are kept but not positioned (no GPOS mark placement).
/// </summary>
public static class ArabicText
{
    // code point -> (isolated, final, initial, medial); 0 = form not available (right-joining letters have no initial/medial).
    private static readonly Dictionary<char, (char Iso, char Fin, char Ini, char Med)> Forms = Build();

    private static Dictionary<char, (char, char, char, char)> Build()
    {
        var d = new Dictionary<char, (char, char, char, char)>();
        void R(int c, int iso) => d[(char)c] = ((char)iso, (char)(iso + 1), '\0', '\0');
        void D(int c, int iso) => d[(char)c] = ((char)iso, (char)(iso + 1), (char)(iso + 2), (char)(iso + 3));
        d['ء'] = ('ﺀ', '\0', '\0', '\0');
        R(0x0622, 0xFE81); R(0x0623, 0xFE83); R(0x0624, 0xFE85); R(0x0625, 0xFE87);
        D(0x0626, 0xFE89); R(0x0627, 0xFE8D); D(0x0628, 0xFE8F); R(0x0629, 0xFE93);
        D(0x062A, 0xFE95); D(0x062B, 0xFE99); D(0x062C, 0xFE9D); D(0x062D, 0xFEA1); D(0x062E, 0xFEA5);
        R(0x062F, 0xFEA9); R(0x0630, 0xFEAB); R(0x0631, 0xFEAD); R(0x0632, 0xFEAF);
        D(0x0633, 0xFEB1); D(0x0634, 0xFEB5); D(0x0635, 0xFEB9); D(0x0636, 0xFEBD); D(0x0637, 0xFEC1);
        D(0x0638, 0xFEC5); D(0x0639, 0xFEC9); D(0x063A, 0xFECD); D(0x0641, 0xFED1); D(0x0642, 0xFED5);
        D(0x0643, 0xFED9); D(0x0644, 0xFEDD); D(0x0645, 0xFEE1); D(0x0646, 0xFEE5); D(0x0647, 0xFEE9);
        R(0x0648, 0xFEED); R(0x0649, 0xFEEF); D(0x064A, 0xFEF1);
        // Persian/Urdu letters (Presentation Forms-A)
        D(0x067E, 0xFB56); D(0x0686, 0xFB7A); R(0x0698, 0xFB8A); D(0x06A9, 0xFB8E); D(0x06AF, 0xFB92); D(0x06CC, 0xFBFC);
        return d;
    }

    private const char Tatweel = 'ـ';
    private const char Lam = 'ل';

    private static readonly Dictionary<char, (char Iso, char Fin)> LamAlef = new()
    {
        ['آ'] = ('ﻵ', 'ﻶ'), ['أ'] = ('ﻷ', 'ﻸ'),
        ['إ'] = ('ﻹ', 'ﻺ'), ['ا'] = ('ﻻ', 'ﻼ'),
    };

    public static bool IsArabic(char c) => c is >= '؀' and <= 'ۿ' or >= 'ݐ' and <= 'ݿ'
        or >= 'ﭐ' and <= '﷿' or >= 'ﹰ' and <= '﻿';

    private static bool IsTransparent(char c) => c is >= 'ً' and <= 'ٟ' or 'ٰ' or >= 'ۖ' and <= 'ۭ';

    private static bool JoinsLeft(char c) => c == Tatweel || (Forms.TryGetValue(c, out var f) && f.Ini != '\0');
    private static bool Joins(char c) => c == Tatweel || (Forms.TryGetValue(c, out var f) && f.Fin != '\0');

    /// <summary>Contextual shaping of logical-order text (non-Arabic characters pass through unchanged).</summary>
    public static string Shape(string s)
    {
        var sb = new StringBuilder(s.Length);
        for (var i = 0; i < s.Length; i++)
        {
            var c = s[i];
            if (!Forms.TryGetValue(c, out var f)) { sb.Append(c); continue; }
            var prev = Neighbor(s, i, -1);
            var next = Neighbor(s, i, +1);
            var prevJoins = prev is { } p && JoinsLeft(s[p]);
            if (c == Lam && next is { } n && LamAlef.TryGetValue(s[n], out var lig))
            {
                sb.Append(prevJoins ? lig.Fin : lig.Iso);
                for (var k = i + 1; k < n; k++) sb.Append(s[k]); // keep diacritics on the lam
                i = n;
                continue;
            }
            var nextJoins = f.Ini != '\0' && next is { } nx && Joins(s[nx]);
            var canFinal = f.Fin != '\0';
            sb.Append((prevJoins && canFinal, nextJoins) switch
            {
                (true, true) => f.Med,
                (true, false) => f.Fin,
                (false, true) => f.Ini,
                _ => f.Iso,
            });
        }
        return sb.ToString();
    }

    private static int? Neighbor(string s, int i, int dir)
    {
        for (var j = i + dir; j >= 0 && j < s.Length; j += dir)
            if (!IsTransparent(s[j])) return j;
        return null;
    }

    private enum Dir { L, R, N }

    private static Dir Classify(char c) =>
        IsArabic(c) && !(c is >= '٠' and <= '٩' or >= '۰' and <= '۹') ? Dir.R
        : char.IsLetterOrDigit(c) || c is >= '٠' and <= '٩' or >= '۰' and <= '۹' ? Dir.L
        : Dir.N;

    private static char Mirror(char c) => c switch { '(' => ')', ')' => '(', '[' => ']', ']' => '[', '{' => '}', '}' => '{', '<' => '>', '>' => '<', '«' => '»', '»' => '«', _ => c };

    /// <summary>
    /// Shapes and reorders one line for left-to-right drawing. Lines without Arabic are returned as a single LTR run.
    /// </summary>
    public static List<VisualRun> ToVisual(string logical)
    {
        if (!logical.Any(IsArabic)) return [new VisualRun(logical, false)];
        var shaped = Shape(logical);
        var dirs = shaped.Select(Classify).ToArray();
        // Resolve neutrals: same strong direction on both sides -> that direction, otherwise the RTL base direction.
        for (var i = 0; i < dirs.Length; i++)
        {
            if (dirs[i] != Dir.N) continue;
            var j = i;
            while (j < dirs.Length && dirs[j] == Dir.N) j++;
            var before = i > 0 ? dirs[i - 1] : Dir.R;
            var after = j < dirs.Length ? dirs[j] : Dir.R;
            var resolved = before == after ? before : Dir.R;
            for (var k = i; k < j; k++) dirs[k] = resolved;
            i = j - 1;
        }
        // Split into directional runs (logical order), then lay out right-to-left.
        var runs = new List<(Dir D, string T)>();
        for (var i = 0; i < shaped.Length;)
        {
            var j = i;
            while (j < shaped.Length && dirs[j] == dirs[i]) j++;
            runs.Add((dirs[i], shaped[i..j]));
            i = j;
        }
        runs.Reverse();
        var visual = new List<VisualRun>();
        foreach (var (d, t) in runs)
        {
            var text = d == Dir.R ? new string(t.Reverse().Select(Mirror).ToArray()) : t;
            // Split by font: Arabic-script characters use the Arabic font, everything else the Latin font.
            for (var i = 0; i < text.Length;)
            {
                var ar = IsArabic(text[i]);
                var j = i;
                while (j < text.Length && (IsArabic(text[j]) == ar || (text[j] == ' ' && ar))) j++;
                visual.Add(new VisualRun(text[i..j], ar));
                i = j;
            }
        }
        return visual;
    }
}
