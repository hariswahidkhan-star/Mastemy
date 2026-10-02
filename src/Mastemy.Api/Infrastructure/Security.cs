using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.HttpOverrides;

namespace Mastemy.Api.Infrastructure;

/// <summary>
/// Security response headers for every API response (OWASP A05). Content-dependent headers (CSP, Cache-Control) are decided
/// in OnStarting, after the endpoint picked its content type and authentication ran.
/// </summary>
public static class SecurityHeaders
{
    public const string JsonCsp = "default-src 'none'; frame-ancestors 'none'; base-uri 'none'";
    public const string FileCsp = "default-src 'none'; sandbox";
    public const string Hsts = "max-age=63072000; includeSubDomains; preload";
    public const string PermissionsPolicy =
        "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), browsing-topics=()";

    public static IApplicationBuilder UseMastemySecurityHeaders(this IApplicationBuilder app, IConfiguration cfg)
    {
        var hsts = cfg.GetValue("Security:Hsts:Enabled", true);
        return app.Use(async (ctx, next) =>
        {
            var h = ctx.Response.Headers;
            h["X-Content-Type-Options"] = "nosniff";
            h["Referrer-Policy"] = "strict-origin-when-cross-origin";
            h["X-Frame-Options"] = "DENY";
            h["Permissions-Policy"] = PermissionsPolicy;
            h["Cross-Origin-Opener-Policy"] = "same-origin";
            h["Cross-Origin-Resource-Policy"] = "same-site";
            // IsHttps reflects X-Forwarded-Proto only when the request came through a trusted proxy (UseForwardedHeaders).
            if (hsts && ctx.Request.IsHttps) h.StrictTransportSecurity = Hsts;
            ctx.Response.OnStarting(() =>
            {
                var rh = ctx.Response.Headers;
                rh.Remove("Server");
                rh.Remove("X-Powered-By");
                var type = ctx.Response.ContentType ?? "";
                var isJson = type.Length == 0 || type.Contains("json", StringComparison.OrdinalIgnoreCase);
                rh.ContentSecurityPolicy = isJson ? JsonCsp : FileCsp;
                var authenticated = ctx.User.Identity?.IsAuthenticated == true || ctx.Request.Headers.Authorization.Count > 0;
                // Authenticated JSON is never cacheable; anonymous JSON is no-store unless the endpoint opted into caching.
                if (isJson && (authenticated || string.IsNullOrEmpty(rh.CacheControl)))
                {
                    rh.CacheControl = "no-store";
                    rh.Pragma = "no-cache";
                }
                return Task.CompletedTask;
            });
            await next();
        });
    }

    /// <summary>
    /// Trust X-Forwarded-For/Proto only from proxies listed in Network:TrustedProxies (IPs or CIDR ranges). Defaults
    /// (loopback) are cleared so nothing is trusted unless configured.
    /// </summary>
    public static void ConfigureForwardedHeaders(ForwardedHeadersOptions o, IConfiguration cfg)
    {
        o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
        o.KnownProxies.Clear();
        o.KnownIPNetworks.Clear();
        o.ForwardLimit = 1;
        foreach (var entry in cfg.GetSection("Network:TrustedProxies").Get<string[]>() ?? [])
        {
            var e = entry.Trim();
            if (e.Length == 0) continue;
            if (e.Contains('/'))
            {
                if (!System.Net.IPNetwork.TryParse(e, out var net)) throw new InvalidOperationException($"Network:TrustedProxies entry '{e}' is not a valid CIDR.");
                if (net.PrefixLength == 0) throw new InvalidOperationException("Network:TrustedProxies must not trust every address.");
                o.KnownIPNetworks.Add(net);
            }
            else if (IPAddress.TryParse(e, out var ip)) o.KnownProxies.Add(ip);
            else throw new InvalidOperationException($"Network:TrustedProxies entry '{e}' is not an IP address or CIDR.");
        }
    }
}

/// <summary>Helpers that keep personal data and secrets out of logs (OWASP A09).</summary>
public static partial class LogRedaction
{
    /// <summary>"alice@example.com" → "a***@example.com".</summary>
    public static string MaskEmail(string? email)
    {
        if (string.IsNullOrWhiteSpace(email)) return "";
        var e = email.Trim();
        var at = e.LastIndexOf('@');
        if (at <= 0) return "***";
        return e[0] + "***" + e[at..];
    }

    [GeneratedRegex(@"[\r\n\t\u0000-\u001f]")]
    private static partial Regex Control();

    /// <summary>Strips control characters (log forging) and truncates.</summary>
    public static string Clean(string? value, int max = 200)
    {
        if (string.IsNullOrEmpty(value)) return "";
        var v = Control().Replace(value, "_");
        return v.Length > max ? v[..max] : v;
    }
}

/// <summary>Host filtering (AllowedHosts) sanity check: production should list the public host(s), never "*".</summary>
public static class HostFilteringCheck
{
    public static bool IsWildcard(IConfiguration cfg) =>
        (cfg["AllowedHosts"] ?? "*").Split(';', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries) is var hosts
        && (hosts.Length == 0 || hosts.Contains("*"));

    /// <summary>Logs a warning (does not stop startup) when Production runs with AllowedHosts "*".</summary>
    public static bool WarnIfUnsafe(IHostEnvironment env, IConfiguration cfg, ILogger log)
    {
        if (!env.IsProduction() || !IsWildcard(cfg)) return false;
        log.LogWarning("AllowedHosts is \"*\" in Production: Host header filtering is off. Set AllowedHosts (e.g. {Example}) to the public host plus internal service names.",
            "AllowedHosts=${PUBLIC_HOST};api;localhost");
        return true;
    }
}

/// <summary>Logger category for security events; correlation id comes from the request logging scope.
/// Each event is also counted (<see cref="SecurityMetrics"/>) and fed to the optional <see cref="SecurityAlertNotifier"/>.</summary>
public sealed class SecurityEvents(ILoggerFactory factory, SecurityMetrics metrics, SecurityAlertNotifier alerts, IHttpContextAccessor http)
{
    public const string Category = "Mastemy.Security";
    private readonly ILogger log = factory.CreateLogger(Category);

    public void Warn(string evt, Guid? userId = null, string? email = null, string? detail = null, int? status = null)
    {
        log.LogWarning("Security event {SecurityEvent} user={UserId} email={MaskedEmail} {Detail}",
            evt, userId?.ToString() ?? "-", LogRedaction.MaskEmail(email), LogRedaction.Clean(detail));
        var category = SecurityMetrics.Category(evt, status);
        metrics.Record(evt, category);
        var ctx = http.HttpContext;
        if (category == "forbidden" && ctx is not null) ctx.Items[SecurityMetrics.RecordedForbiddenItem] = true;
        _ = alerts.Observe(category, ctx?.Connection.RemoteIpAddress?.ToString(), userId);
    }
}

/// <summary>
/// SSRF guard for outbound connections to organization-controlled hosts (OIDC issuers): resolves the host and refuses
/// loopback, private, link-local, CGNAT, multicast and unspecified addresses at connect time (so DNS rebinding cannot
/// slip past a pre-check). Disabled only when Sso:AllowInsecureHttp is set (tests/development).
/// </summary>
public static class SsrfGuard
{
    public static SocketsHttpHandler CreateHandler(bool allowPrivate) => new()
    {
        AllowAutoRedirect = false,
        PooledConnectionLifetime = TimeSpan.FromMinutes(5),
        ConnectCallback = async (ctx, ct) =>
        {
            var addresses = IPAddress.TryParse(ctx.DnsEndPoint.Host, out var literal)
                ? [literal]
                : await Dns.GetHostAddressesAsync(ctx.DnsEndPoint.Host, ct);
            var allowed = addresses.Where(a => allowPrivate || IsPublic(a)).ToArray();
            if (allowed.Length == 0) throw new HttpRequestException($"Outbound connection to '{ctx.DnsEndPoint.Host}' is not allowed (non-public address).");
            var socket = new Socket(SocketType.Stream, ProtocolType.Tcp) { NoDelay = true };
            try
            {
                await socket.ConnectAsync(allowed, ctx.DnsEndPoint.Port, ct);
                return new NetworkStream(socket, ownsSocket: true);
            }
            catch { socket.Dispose(); throw; }
        },
    };

    public static bool IsPublic(IPAddress ip)
    {
        if (ip.IsIPv4MappedToIPv6) ip = ip.MapToIPv4();
        if (IPAddress.IsLoopback(ip) || ip.Equals(IPAddress.Any) || ip.Equals(IPAddress.IPv6Any) || ip.Equals(IPAddress.None)) return false;
        if (ip.AddressFamily == AddressFamily.InterNetwork)
        {
            var b = ip.GetAddressBytes();
            return !(b[0] == 0 || b[0] == 10 || b[0] == 127 || (b[0] == 169 && b[1] == 254) || (b[0] == 172 && (b[1] & 0xF0) == 16)
                     || (b[0] == 192 && b[1] == 168) || (b[0] == 100 && (b[1] & 0xC0) == 64) || (b[0] == 192 && b[1] == 0 && b[2] == 0)
                     || (b[0] == 198 && (b[1] & 0xFE) == 18) || b[0] >= 224);
        }
        if (ip.AddressFamily == AddressFamily.InterNetworkV6)
        {
            if (ip.IsIPv6LinkLocal || ip.IsIPv6SiteLocal || ip.IsIPv6Multicast || ip.IsIPv6UniqueLocal) return false;
            var b = ip.GetAddressBytes();
            if (b[0] == 0x20 && b[1] == 0x01 && b[2] == 0x0d && b[3] == 0xb8) return false; // documentation
            if (b[0] == 0x00 && b[1] == 0x64 && b[2] == 0xff && b[3] == 0x9b) return false; // NAT64 (could reach private v4)
            return true;
        }
        return false;
    }
}
