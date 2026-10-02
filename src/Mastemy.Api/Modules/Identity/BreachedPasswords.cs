using System.Security.Cryptography;
using System.Text;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Identity;

public sealed class BreachedPasswordOptions
{
    public const string Section = "Security:BreachedPasswordCheck";
    public const string HttpClientName = "hibp";

    /// <summary>Default: on in Production, off elsewhere (tests, e2e and local development never call out).</summary>
    public bool? Enabled { get; set; }
    /// <summary>Have I Been Pwned k-anonymity range endpoint; the 5-character SHA-1 prefix is appended.</summary>
    public string RangeApiUrl { get; set; } = "https://api.pwnedpasswords.com/range/";
    public int TimeoutSeconds { get; set; } = 3;
}

/// <summary>
/// Rejects passwords that appear in known breaches (Have I Been Pwned "range" API, k-anonymity): only the first five hex
/// characters of the password's SHA-1 leave the server, with Add-Padding so the response size reveals nothing. Fail-open:
/// when the service is unreachable or slow (3 s) the password is accepted and a warning is logged.
/// </summary>
public sealed class BreachedPasswordChecker(IHttpClientFactory http, IConfiguration cfg, IHostEnvironment env, ILogger<BreachedPasswordChecker> log)
{
    private readonly BreachedPasswordOptions _opt = cfg.GetSection(BreachedPasswordOptions.Section).Get<BreachedPasswordOptions>() ?? new();
    public bool Enabled => _opt.Enabled ?? env.IsProduction();

    public static (string Prefix, string Suffix) Sha1Parts(string password)
    {
        var hex = Convert.ToHexString(SHA1.HashData(Encoding.UTF8.GetBytes(password))); // upper-case
        return (hex[..5], hex[5..]);
    }

    /// <summary>Throws 400 password_breached when the password is known to be breached.</summary>
    public async Task EnsureNotBreached(string password, CancellationToken ct = default)
    {
        if (!Enabled) return;
        var (prefix, suffix) = Sha1Parts(password);
        int? count;
        try { count = await Lookup(prefix, suffix, ct); }
        catch (Exception e) when (e is HttpRequestException or TaskCanceledException or OperationCanceledException && !ct.IsCancellationRequested)
        {
            log.LogWarning("Breached-password check unavailable ({Error}); accepting the password (fail-open).", e.GetType().Name);
            return;
        }
        if (count is > 0)
            throw AppException.Bad("This password has appeared in a known data breach. Choose a different password.", "password_breached");
    }

    private async Task<int?> Lookup(string prefix, string suffix, CancellationToken ct)
    {
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(ct);
        timeout.CancelAfter(TimeSpan.FromSeconds(Math.Max(1, _opt.TimeoutSeconds)));
        using var req = new HttpRequestMessage(HttpMethod.Get, _opt.RangeApiUrl.TrimEnd('/') + "/" + prefix);
        req.Headers.TryAddWithoutValidation("Add-Padding", "true");
        using var resp = await http.CreateClient(BreachedPasswordOptions.HttpClientName).SendAsync(req, HttpCompletionOption.ResponseHeadersRead, timeout.Token);
        if (!resp.IsSuccessStatusCode) throw new HttpRequestException($"HIBP range API returned {(int)resp.StatusCode}");
        var body = await resp.Content.ReadAsStringAsync(timeout.Token);
        foreach (var raw in body.Split('\n'))
        {
            var line = raw.Trim();
            var colon = line.IndexOf(':');
            if (colon != 35 || !line.AsSpan(0, 35).Equals(suffix, StringComparison.OrdinalIgnoreCase)) continue;
            // Padding entries carry a count of 0 and never match a real password.
            return int.TryParse(line.AsSpan(colon + 1), out var n) ? n : 0;
        }
        return null;
    }
}
