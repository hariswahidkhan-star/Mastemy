using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Identity;

/// <summary>
/// Refresh-token transport for browsers (default web mechanism): an HttpOnly, Secure, SameSite=Strict cookie scoped to
/// <see cref="CookiePath"/>. Login / register / MFA verify / MFA enroll-confirm / refresh set it; logout clears it.
/// CSRF: the cookie is never sent cross-site (SameSite=Strict) and only to /api/auth; in addition, a refresh or logout that
/// uses the cookie must carry the custom header <c>X-Requested-With: mastemy</c>, which a cross-site form cannot set and
/// cross-origin fetch cannot send without a CORS preflight. Body-token mode (JSON <c>refreshToken</c> in and out) remains for
/// non-browser clients while Auth:AllowBodyRefreshToken is true (default, backward compatible); when false the refresh token
/// is no longer returned in JSON and body tokens are rejected.
/// </summary>
public class RefreshCookies(IConfiguration cfg, JwtOptions opt)
{
    public const string CookieName = "mastemy_rt";
    public const string CookiePath = "/api/auth";
    public const string CsrfHeader = "X-Requested-With";
    public const string CsrfValue = "mastemy";

    public bool AllowBodyToken => cfg.GetValue("Auth:AllowBodyRefreshToken", true);

    private CookieOptions Options(DateTimeOffset? expires) => new()
    {
        HttpOnly = true, Secure = true, SameSite = SameSiteMode.Strict, Path = CookiePath, IsEssential = true, Expires = expires,
    };

    /// <summary>Writes the cookie for a response that carries a refresh token; strips the JSON token when body mode is off.</summary>
    public AuthResponse Issue(HttpResponse res, AuthResponse r)
    {
        if (string.IsNullOrEmpty(r.RefreshToken)) return r;
        res.Cookies.Append(CookieName, r.RefreshToken, Options(DateTimeOffset.UtcNow.AddDays(opt.RefreshTokenDays)));
        return AllowBodyToken ? r : r with { RefreshToken = null };
    }

    public void Clear(HttpResponse res) => res.Cookies.Delete(CookieName, Options(null));

    /// <summary>
    /// The refresh token of this request: the JSON body token when present (body mode must be enabled), otherwise the cookie
    /// (custom CSRF header required). Null when neither is present.
    /// </summary>
    public string? Resolve(HttpRequest req, string? bodyToken)
    {
        if (!string.IsNullOrWhiteSpace(bodyToken))
        {
            if (!AllowBodyToken)
                throw AppException.Bad("Refresh tokens in the request body are disabled; use the refresh cookie.", "body_refresh_token_disabled");
            return bodyToken;
        }
        if (!req.Cookies.TryGetValue(CookieName, out var cookie) || string.IsNullOrWhiteSpace(cookie)) return null;
        if (!string.Equals(req.Headers[CsrfHeader].ToString(), CsrfValue, StringComparison.Ordinal))
            throw new AppException(403, $"Cookie-based refresh requires the header {CsrfHeader}: {CsrfValue}.", "csrf_header_required");
        return cookie;
    }
}
