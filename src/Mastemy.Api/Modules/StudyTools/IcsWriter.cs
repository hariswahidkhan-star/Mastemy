using System.Globalization;
using System.Text;

namespace Mastemy.Api.Modules.StudyTools;

public record IcsEvent(string Uid, DateTime StartUtc, DateTime EndUtc, string Summary, string Description, string? Url, int? AlarmMinutesBefore);

/// <summary>Minimal RFC 5545 writer: CRLF line endings, TEXT escaping (§3.3.11) and 75-octet line folding (§3.1).</summary>
public static class IcsWriter
{
    public static string Escape(string value)
    {
        var sb = new StringBuilder(value.Length + 8);
        for (var i = 0; i < value.Length; i++)
        {
            var ch = value[i];
            switch (ch)
            {
                case '\\': sb.Append("\\\\"); break;
                case ';': sb.Append("\\;"); break;
                case ',': sb.Append("\\,"); break;
                case '\r':
                    if (i + 1 < value.Length && value[i + 1] == '\n') i++;
                    sb.Append("\\n"); break;
                case '\n': sb.Append("\\n"); break;
                default:
                    if (char.IsControl(ch) && ch != '\t') continue; // CONTROL characters are not allowed in TEXT
                    sb.Append(ch); break;
            }
        }
        return sb.ToString();
    }

    /// <summary>Folds a content line so no physical line exceeds 75 octets, never splitting a UTF-8 sequence.</summary>
    public static string Fold(string line)
    {
        var bytes = Encoding.UTF8.GetByteCount(line);
        if (bytes <= 75) return line + "\r\n";
        var sb = new StringBuilder();
        var count = 0;
        var limit = 75;
        var e = StringInfo.GetTextElementEnumerator(line);
        while (e.MoveNext())
        {
            var el = (string)e.Current;
            var n = Encoding.UTF8.GetByteCount(el);
            if (count + n > limit)
            {
                sb.Append("\r\n ");
                count = 0;
                limit = 74; // continuation lines start with one space
            }
            sb.Append(el);
            count += n;
        }
        return sb.Append("\r\n").ToString();
    }

    public static string Utc(DateTime d) => d.ToUniversalTime().ToString("yyyyMMdd'T'HHmmss'Z'", CultureInfo.InvariantCulture);

    public static string Calendar(string name, IEnumerable<IcsEvent> events, DateTime nowUtc)
    {
        var sb = new StringBuilder();
        void L(string s) => sb.Append(Fold(s));
        L("BEGIN:VCALENDAR");
        L("VERSION:2.0");
        L("PRODID:-//Mastemy//Study Plan//EN");
        L("CALSCALE:GREGORIAN");
        L("METHOD:PUBLISH");
        L("X-WR-CALNAME:" + Escape(name));
        foreach (var ev in events)
        {
            L("BEGIN:VEVENT");
            L("UID:" + ev.Uid);
            L("DTSTAMP:" + Utc(nowUtc));
            L("DTSTART:" + Utc(ev.StartUtc));
            L("DTEND:" + Utc(ev.EndUtc));
            L("SUMMARY:" + Escape(ev.Summary));
            L("DESCRIPTION:" + Escape(ev.Description));
            if (!string.IsNullOrEmpty(ev.Url)) L("URL:" + ev.Url);
            if (ev.AlarmMinutesBefore is { } m)
            {
                L("BEGIN:VALARM");
                L("ACTION:DISPLAY");
                L("DESCRIPTION:" + Escape(ev.Summary));
                L($"TRIGGER:-PT{m}M");
                L("END:VALARM");
            }
            L("END:VEVENT");
        }
        L("END:VCALENDAR");
        return sb.ToString();
    }
}
