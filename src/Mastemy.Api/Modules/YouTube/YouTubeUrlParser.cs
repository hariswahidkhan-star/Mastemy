using System.Text.RegularExpressions;

namespace Mastemy.Api.Modules.YouTube;

/// <summary>
/// Strict parser for YouTube video and playlist references. Only exact YouTube hosts are accepted;
/// lookalike hosts (youtube.com.evil.net, notyoutube.com, ...), credentials in URLs, non-default ports and
/// non-http(s) schemes are rejected.
/// </summary>
public static partial class YouTubeUrlParser
{
    [GeneratedRegex("^[A-Za-z0-9_-]{11}$")] private static partial Regex VideoIdRx();
    [GeneratedRegex("^(PL|OL|UU|FL|LL|RD|UL|PU)[A-Za-z0-9_-]{10,62}$")] private static partial Regex PlaylistIdRx();

    private static readonly HashSet<string> WatchHosts = ["youtube.com", "www.youtube.com", "m.youtube.com"];
    private static readonly HashSet<string> NoCookieHosts = ["youtube-nocookie.com", "www.youtube-nocookie.com"];
    private static readonly HashSet<string> ShortHosts = ["youtu.be"];

    public static bool IsValidVideoId(string? id) => id is not null && VideoIdRx().IsMatch(id);
    public static bool IsValidPlaylistId(string? id) => id is not null && PlaylistIdRx().IsMatch(id);

    public static bool TryParseVideoId(string? input, out string videoId)
    {
        videoId = "";
        if (string.IsNullOrWhiteSpace(input)) return false;
        var s = input.Trim();
        if (s.Length > 2048) return false;
        if (IsValidVideoId(s)) { videoId = s; return true; }
        if (!TryUri(s, out var uri)) return false;
        var host = uri.Host.ToLowerInvariant();
        var segs = Segments(uri);
        string? candidate = null;

        if (ShortHosts.Contains(host))
        {
            if (segs.Length == 1) candidate = segs[0];
        }
        else if (WatchHosts.Contains(host))
        {
            if (segs.Length == 1 && segs[0] == "watch") candidate = Query(uri, "v");
            else if (segs.Length == 2 && segs[0] is "shorts" or "embed" or "live") candidate = segs[1];
        }
        else if (NoCookieHosts.Contains(host))
        {
            if (segs.Length == 2 && segs[0] == "embed") candidate = segs[1];
        }

        if (!IsValidVideoId(candidate)) return false;
        videoId = candidate!;
        return true;
    }

    public static bool TryParsePlaylistId(string? input, out string playlistId)
    {
        playlistId = "";
        if (string.IsNullOrWhiteSpace(input)) return false;
        var s = input.Trim();
        if (s.Length > 2048) return false;
        if (IsValidPlaylistId(s)) { playlistId = s; return true; }
        if (!TryUri(s, out var uri)) return false;
        var host = uri.Host.ToLowerInvariant();
        var segs = Segments(uri);
        bool pathOk;
        if (WatchHosts.Contains(host))
            pathOk = (segs.Length == 1 && segs[0] is "playlist" or "watch") || (segs.Length == 2 && segs[0] == "embed");
        else if (NoCookieHosts.Contains(host))
            pathOk = segs.Length == 2 && segs[0] == "embed";
        else if (ShortHosts.Contains(host))
            pathOk = segs.Length == 1;
        else
            pathOk = false;
        if (!pathOk) return false;
        var list = Query(uri, "list");
        if (!IsValidPlaylistId(list)) return false;
        playlistId = list!;
        return true;
    }

    private static bool TryUri(string s, out Uri uri)
    {
        uri = null!;
        if (s.Any(char.IsWhiteSpace) || s.Contains('\\')) return false;
        if (!s.Contains("://", StringComparison.Ordinal)) s = "https://" + s;
        if (!Uri.TryCreate(s, UriKind.Absolute, out var u)) return false;
        if (u.Scheme != Uri.UriSchemeHttps && u.Scheme != Uri.UriSchemeHttp) return false;
        if (!string.IsNullOrEmpty(u.UserInfo)) return false;
        if (!u.IsDefaultPort) return false;
        uri = u;
        return true;
    }

    private static string[] Segments(Uri u) => u.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);

    private static string? Query(Uri u, string key)
    {
        string? found = null;
        foreach (var part in u.Query.TrimStart('?').Split('&', StringSplitOptions.RemoveEmptyEntries))
        {
            var eq = part.IndexOf('=');
            var k = eq < 0 ? part : part[..eq];
            if (!string.Equals(Uri.UnescapeDataString(k), key, StringComparison.Ordinal)) continue;
            var v = eq < 0 ? "" : Uri.UnescapeDataString(part[(eq + 1)..]);
            if (found is not null && found != v) return null; // ambiguous duplicate parameter
            found = v;
        }
        return found;
    }
}
