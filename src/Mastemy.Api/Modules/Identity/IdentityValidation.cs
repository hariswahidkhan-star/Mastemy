using System.Net.Mail;
using System.Text.RegularExpressions;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Identity;

public static class IdentityValidation
{
    public const int MinPasswordLength = 10;
    public static readonly string[] Languages = ["en", "ar"];

    public static string NormalizeEmail(string email) => email.Trim().ToLowerInvariant();

    public static string RequireEmail(string? email)
    {
        var e = email?.Trim() ?? "";
        if (e.Length is 0 or > 254 || !MailAddress.TryCreate(e, out var addr) || addr.Address != e
            || !e[(e.IndexOf('@') + 1)..].Contains('.'))
            throw AppException.Bad("A valid email address is required.", "invalid_email");
        return e;
    }

    public static void RequirePassword(string? password)
    {
        if (password is null || password.Length < MinPasswordLength || password.Length > 256
            || !password.Any(char.IsLetter) || !password.Any(char.IsDigit))
            throw AppException.Bad($"Password must be at least {MinPasswordLength} characters and contain at least one letter and one digit.", "weak_password");
    }

    public static string RequireText(string? value, string field, int min, int max)
    {
        var v = value?.Trim() ?? "";
        if (v.Length < min || v.Length > max)
            throw AppException.Bad($"{field} must be between {min} and {max} characters.", "invalid_" + field.ToLowerInvariant());
        return v;
    }

    public static (int page, int size) Paging(int page, int pageSize = 20) =>
        (Math.Max(1, page), Math.Clamp(pageSize, 1, 100));
}

/// <summary>Minimal local YouTube URL parser (kept independent of the YouTube module).</summary>
public static partial class YouTubeUrl
{
    [GeneratedRegex("^[A-Za-z0-9_-]{11}$")] private static partial Regex IdRegex();

    private static readonly HashSet<string> YouTubeHosts =
        ["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"];

    public static bool TryParseVideoId(string? url, out string videoId)
    {
        videoId = "";
        if (string.IsNullOrWhiteSpace(url) || !Uri.TryCreate(url.Trim(), UriKind.Absolute, out var uri)) return false;
        if (uri.Scheme != Uri.UriSchemeHttps && uri.Scheme != Uri.UriSchemeHttp) return false;
        var host = uri.Host.ToLowerInvariant();
        var segs = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);
        string? candidate = null;
        if (host is "youtu.be" or "www.youtu.be")
            candidate = segs.Length == 1 ? segs[0] : null;
        else if (YouTubeHosts.Contains(host))
        {
            if (segs.Length == 1 && segs[0] == "watch")
                candidate = Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(uri.Query).TryGetValue("v", out var v) ? v.ToString() : null;
            else if (segs.Length == 2 && segs[0] is "embed" or "shorts" or "live" or "v")
                candidate = segs[1];
        }
        if (candidate is null || !IdRegex().IsMatch(candidate)) return false;
        videoId = candidate;
        return true;
    }
}
