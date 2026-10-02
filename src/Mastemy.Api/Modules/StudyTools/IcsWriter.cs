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

    public static string Local(DateTime utc, TimeZoneInfo tz) =>
        TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(utc, DateTimeKind.Utc), tz).ToString("yyyyMMdd'T'HHmmss", CultureInfo.InvariantCulture);

    private static string Offset(TimeSpan o) =>
        (o < TimeSpan.Zero ? "-" : "+") + o.Duration().ToString("hhmm", CultureInfo.InvariantCulture);

    /// <summary>
    /// VTIMEZONE for <paramref name="tz"/> covering [fromUtc, toUtc]: one observance for the offset in force at the start and
    /// one per offset transition inside the range (found by scanning hourly), so the TZID definition is exact for every event.
    /// </summary>
    public static IEnumerable<string> VTimeZone(TimeZoneInfo tz, DateTime fromUtc, DateTime toUtc)
    {
        yield return "BEGIN:VTIMEZONE";
        yield return "TZID:" + tz.Id;
        DateTime Clamp(DateTime d) => DateTime.SpecifyKind(d, DateTimeKind.Utc);
        var t = Clamp(fromUtc.AddDays(-1)); var end = Clamp(toUtc.AddDays(1));
        var prev = tz.GetUtcOffset(t);
        IEnumerable<string> Obs(DateTime instantUtc, TimeSpan from, TimeSpan to)
        {
            var kind = tz.IsDaylightSavingTime(instantUtc) ? "DAYLIGHT" : "STANDARD";
            yield return "BEGIN:" + kind;
            // DTSTART of an observance is the onset as local time in the TZOFFSETFROM offset.
            yield return "DTSTART:" + (instantUtc + from).ToString("yyyyMMdd'T'HHmmss", CultureInfo.InvariantCulture);
            yield return "TZOFFSETFROM:" + Offset(from);
            yield return "TZOFFSETTO:" + Offset(to);
            yield return "END:" + kind;
        }
        foreach (var l in Obs(t, prev, prev)) yield return l;
        for (var h = t.AddHours(1); h <= end; h = h.AddHours(1))
        {
            var o = tz.GetUtcOffset(h);
            if (o == prev) continue;
            // Narrow to the minute of the change.
            var at = h.AddHours(-1);
            while (tz.GetUtcOffset(at) == prev) at = at.AddMinutes(1);
            foreach (var l in Obs(at, prev, o)) yield return l;
            prev = o;
        }
        yield return "END:VTIMEZONE";
    }

    public static string Calendar(string name, IReadOnlyList<IcsEvent> events, DateTime nowUtc, TimeZoneInfo? tz = null)
    {
        var sb = new StringBuilder();
        void L(string s) => sb.Append(Fold(s));
        var zoned = tz is not null && tz != TimeZoneInfo.Utc && tz.Id != "UTC" && tz.Id != "Etc/UTC";
        L("BEGIN:VCALENDAR");
        L("VERSION:2.0");
        L("PRODID:-//Mastemy//Study Plan//EN");
        L("CALSCALE:GREGORIAN");
        L("METHOD:PUBLISH");
        L("X-WR-CALNAME:" + Escape(name));
        if (zoned)
        {
            L("X-WR-TIMEZONE:" + tz!.Id);
            if (events.Count > 0)
                foreach (var line in VTimeZone(tz, events.Min(e => e.StartUtc), events.Max(e => e.EndUtc))) L(line);
        }
        foreach (var ev in events)
        {
            L("BEGIN:VEVENT");
            L("UID:" + ev.Uid);
            L("DTSTAMP:" + Utc(nowUtc));
            if (zoned)
            {
                L($"DTSTART;TZID={tz!.Id}:" + Local(ev.StartUtc, tz));
                L($"DTEND;TZID={tz.Id}:" + Local(ev.EndUtc, tz));
            }
            else
            {
                L("DTSTART:" + Utc(ev.StartUtc));
                L("DTEND:" + Utc(ev.EndUtc));
            }
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
