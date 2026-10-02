using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Mastemy.Api.Modules.Enterprise;

public record SsoConfigInput(string? Issuer, string? ClientId, string? ClientSecret, List<string>? AllowedDomains, bool Enabled);
public record SsoConfigDto(Guid OrganizationId, string Issuer, string ClientId, bool HasClientSecret, List<string> AllowedDomains, bool Enabled,
    string? RedirectUri, string LoginUrl, DateTime UpdatedAt);
public record SsoExchangeInput(string? Handoff);

/// <summary>Config section "Sso".</summary>
public class SsoOptions
{
    /// <summary>Absolute URL of GET /api/sso/callback as registered at the IdP (required to start a login).</summary>
    public string RedirectUri { get; set; } = "";
    /// <summary>Front-end page that receives ?handoff=… (or ?error=…) and calls POST /api/sso/exchange (required).</summary>
    public string CompletionUrl { get; set; } = "";
    public int StateLifetimeMinutes { get; set; } = 10;
    /// <summary>Development only: allow http:// issuers and endpoints.</summary>
    public bool AllowInsecureHttp { get; set; }
    public int MetadataCacheMinutes { get; set; } = 60;
}

public record OidcDiscovery(string Issuer, string AuthorizationEndpoint, string TokenEndpoint, string JwksUri);

/// <summary>Fetches and caches OIDC discovery documents and JWKS (refetching JWKS once on an unknown key id).</summary>
public class OidcMetadataClient(IHttpClientFactory http, IMemoryCache cache, SsoOptions opt)
{
    public const string HttpClientName = "mastemy-oidc";
    private static readonly TimeSpan MinRefresh = TimeSpan.FromSeconds(30);

    public async Task<OidcDiscovery> Discovery(string issuer, CancellationToken ct)
    {
        var key = "oidc:disc:" + issuer;
        if (cache.TryGetValue(key, out OidcDiscovery? d) && d is not null) return d;
        var url = issuer.TrimEnd('/') + "/.well-known/openid-configuration";
        using var doc = await GetJson(url, ct);
        var root = doc.RootElement;
        string Req(string name) => root.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.String && v.GetString() is { Length: > 0 } s
            ? s : throw Fail($"Discovery document is missing '{name}'.");
        d = new OidcDiscovery(Req("issuer"), Req("authorization_endpoint"), Req("token_endpoint"), Req("jwks_uri"));
        if (!string.Equals(d.Issuer.TrimEnd('/'), issuer.TrimEnd('/'), StringComparison.Ordinal)) throw Fail("Discovery issuer does not match the configured issuer.");
        foreach (var u in new[] { d.AuthorizationEndpoint, d.TokenEndpoint, d.JwksUri }) RequireUrl(u, opt.AllowInsecureHttp);
        cache.Set(key, d, TimeSpan.FromMinutes(Math.Clamp(opt.MetadataCacheMinutes, 1, 24 * 60)));
        return d;
    }

    public async Task<IList<SecurityKey>> Keys(string jwksUri, bool refresh, CancellationToken ct)
    {
        var key = "oidc:jwks:" + jwksUri;
        var stamp = "oidc:jwks-at:" + jwksUri;
        if (cache.TryGetValue(key, out IList<SecurityKey>? keys) && keys is not null)
        {
            if (!refresh) return keys;
            if (cache.TryGetValue(stamp, out DateTime at) && DateTime.UtcNow - at < MinRefresh) return keys; // throttle refetches
        }
        using var doc = await GetJson(jwksUri, ct);
        keys = new JsonWebKeySet(doc.RootElement.GetRawText()).GetSigningKeys();
        cache.Set(key, keys, TimeSpan.FromMinutes(Math.Clamp(opt.MetadataCacheMinutes, 1, 24 * 60)));
        cache.Set(stamp, DateTime.UtcNow, TimeSpan.FromHours(1));
        return keys;
    }

    public async Task<string> ExchangeCode(OidcDiscovery d, string clientId, string clientSecret, string code, string verifier, string redirectUri, CancellationToken ct)
    {
        var client = http.CreateClient(HttpClientName);
        using var res = await client.PostAsync(d.TokenEndpoint, new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["grant_type"] = "authorization_code", ["code"] = code, ["redirect_uri"] = redirectUri, ["client_id"] = clientId,
            ["client_secret"] = clientSecret, ["code_verifier"] = verifier,
        }), ct);
        if (!res.IsSuccessStatusCode) throw new SsoException("sso_token_exchange_failed", "The identity provider rejected the sign-in.");
        using var doc = JsonDocument.Parse(await res.Content.ReadAsStringAsync(ct));
        return doc.RootElement.TryGetProperty("id_token", out var t) && t.ValueKind == JsonValueKind.String ? t.GetString()!
            : throw new SsoException("sso_token_exchange_failed", "The identity provider returned no id_token.");
    }

    private async Task<JsonDocument> GetJson(string url, CancellationToken ct)
    {
        RequireUrl(url, opt.AllowInsecureHttp);
        var client = http.CreateClient(HttpClientName);
        try
        {
            using var res = await client.GetAsync(url, ct);
            if (!res.IsSuccessStatusCode) throw Fail($"Identity provider metadata request failed ({(int)res.StatusCode}).");
            var body = await res.Content.ReadAsStringAsync(ct);
            if (body.Length > 512 * 1024) throw Fail("Identity provider metadata is too large.");
            return JsonDocument.Parse(body);
        }
        catch (HttpRequestException) { throw Fail("Identity provider is unreachable."); }
        catch (TaskCanceledException) when (!ct.IsCancellationRequested) { throw Fail("Identity provider timed out."); }
        catch (JsonException) { throw Fail("Identity provider metadata is not valid JSON."); }
    }

    public static void RequireUrl(string url, bool allowHttp)
    {
        if (!Uri.TryCreate(url, UriKind.Absolute, out var u) || !(u.Scheme == Uri.UriSchemeHttps || (allowHttp && u.Scheme == Uri.UriSchemeHttp)))
            throw Fail("Identity provider URLs must be absolute https URLs.");
    }

    private static SsoException Fail(string msg) => new("sso_provider_unavailable", msg);
}

/// <summary>SSO failure carried to the callback redirect as ?error=code.</summary>
public class SsoException(string code, string message) : Exception(message)
{
    public string Code { get; } = code;
}

/// <summary>Per-org OIDC configuration, managed by the org Admin or staff. The client secret is stored encrypted and never returned.</summary>
public partial class SsoConfigService(AppDbContext db, ICurrentUser me, AuditService audit, EnterpriseService orgs, SecretProtector protector, SsoOptions opt)
{
    [GeneratedRegex(@"^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$")]
    private static partial Regex DomainRx();

    public async Task<SsoConfigDto> Get(Guid orgId)
    {
        var (org, role) = await orgs.RequireManager(orgId);
        EnterprisePhase2Service.RequireAdmin(role, "Only an organization Admin can view SSO settings.");
        var c = await db.Set<OrgSsoConfig>().AsNoTracking().FirstOrDefaultAsync(x => x.OrganizationId == orgId) ?? throw AppException.NotFound("SSO configuration");
        return Dto(c, org.Slug);
    }

    public async Task<SsoConfigDto> Put(Guid orgId, SsoConfigInput input)
    {
        var (org, role) = await orgs.RequireManager(orgId);
        EnterprisePhase2Service.RequireAdmin(role, "Only an organization Admin can change SSO settings.");
        var issuer = (input.Issuer ?? "").Trim();
        if (issuer.Length is 0 or > 500) throw AppException.Bad("issuer is required (max 500 characters).", "invalid_issuer");
        try { OidcMetadataClient.RequireUrl(issuer, opt.AllowInsecureHttp); }
        catch (SsoException) { throw AppException.Bad("issuer must be an absolute https URL.", "invalid_issuer"); }
        var clientId = (input.ClientId ?? "").Trim();
        if (clientId.Length is 0 or > 255) throw AppException.Bad("clientId is required (max 255 characters).", "invalid_client_id");
        var domains = (input.AllowedDomains ?? []).Select(d => (d ?? "").Trim().TrimStart('@').ToLowerInvariant()).Where(d => d.Length > 0).Distinct().ToList();
        if (domains.Count is 0 or > 50 || domains.Any(d => !DomainRx().IsMatch(d)))
            throw AppException.Bad("allowedDomains must list 1-50 valid email domains.", "invalid_domains");
        var secret = input.ClientSecret?.Trim();
        if (secret is { Length: > 2000 }) throw AppException.Bad("clientSecret is too long.", "invalid_client_secret");

        var c = await db.Set<OrgSsoConfig>().FirstOrDefaultAsync(x => x.OrganizationId == orgId);
        var created = c is null;
        if (c is null)
        {
            if (string.IsNullOrEmpty(secret)) throw AppException.Bad("clientSecret is required.", "invalid_client_secret");
            c = new OrgSsoConfig { OrganizationId = orgId };
            db.Set<OrgSsoConfig>().Add(c);
        }
        c.Issuer = issuer; c.ClientId = clientId; c.AllowedDomains = string.Join(',', domains); c.Enabled = input.Enabled;
        if (!string.IsNullOrEmpty(secret)) c.ClientSecretProtected = protector.Protect(secret);
        c.UpdatedBy = me.RequireId(); c.UpdatedAt = DateTime.UtcNow;
        audit.Record(created ? "org.sso.configured" : "org.sso.updated", nameof(Organization), orgId,
            new { issuer, clientId, domains, input.Enabled, secretChanged = !string.IsNullOrEmpty(secret) });
        await db.SaveChangesAsync();
        return Dto(c, org.Slug);
    }

    public async Task Delete(Guid orgId)
    {
        var (_, role) = await orgs.RequireManager(orgId);
        EnterprisePhase2Service.RequireAdmin(role, "Only an organization Admin can change SSO settings.");
        var c = await db.Set<OrgSsoConfig>().FirstOrDefaultAsync(x => x.OrganizationId == orgId) ?? throw AppException.NotFound("SSO configuration");
        db.Set<OrgSsoConfig>().Remove(c);
        audit.Record("org.sso.removed", nameof(Organization), orgId);
        await db.SaveChangesAsync();
    }

    private SsoConfigDto Dto(OrgSsoConfig c, string slug) => new(c.OrganizationId, c.Issuer, c.ClientId, c.ClientSecretProtected.Length > 0,
        c.AllowedDomains.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList(), c.Enabled,
        string.IsNullOrWhiteSpace(opt.RedirectUri) ? null : opt.RedirectUri, $"/api/sso/{slug}/start", c.UpdatedAt);
}

/// <summary>
/// OIDC authorization-code login with state + nonce + PKCE (S256). The id_token is validated (iss, aud, exp, nonce,
/// RS256/ES256 signature against the IdP's JWKS). Users are provisioned just in time as org Members when their email
/// domain is allowed and email_verified is true; an existing Mastemy account is linked only when its own email is
/// verified too. Privileged accounts (staff roles that require MFA) can never sign in through SSO. On success the
/// browser receives a one-time, 2-minute handoff code that the SPA exchanges for normal Mastemy tokens.
/// </summary>
public class SsoLoginService(AppDbContext db, SsoOptions opt, OidcMetadataClient oidc, SecretProtector protector, AuthService auth,
    OrgEntitlementSync sync, AuditService audit, ILogger<SsoLoginService> log)
{
    public static readonly TimeSpan HandoffLifetime = TimeSpan.FromMinutes(2);
    private static readonly string[] Algorithms = [SecurityAlgorithms.RsaSha256, SecurityAlgorithms.EcdsaSha256];

    private void RequireConfigured()
    {
        if (string.IsNullOrWhiteSpace(opt.RedirectUri) || string.IsNullOrWhiteSpace(opt.CompletionUrl))
            throw new AppException(503, "Single sign-on is not configured on this server.", "sso_not_configured");
    }

    /// <summary>Returns the IdP authorization URL for the organization's login.</summary>
    public async Task<string> Start(string orgSlug, string? returnPath, CancellationToken ct)
    {
        RequireConfigured();
        var slug = (orgSlug ?? "").Trim().ToLowerInvariant();
        var org = await db.Organizations.AsNoTracking().FirstOrDefaultAsync(o => o.Slug == slug && o.IsActive, ct);
        var cfg = org is null ? null : await db.Set<OrgSsoConfig>().AsNoTracking().FirstOrDefaultAsync(c => c.OrganizationId == org.Id && c.Enabled, ct);
        if (org is null || cfg is null) throw new AppException(404, "Single sign-on is not available for this organization.", "sso_not_available");
        OidcDiscovery d;
        try { d = await oidc.Discovery(cfg.Issuer, ct); }
        catch (SsoException e) { throw new AppException(503, e.Message, e.Code); }

        var state = Tokens.Random(32);
        var nonce = Tokens.Random(24);
        var verifier = Tokens.Random(32);
        var challenge = Base64UrlEncoder.Encode(SHA256.HashData(Encoding.ASCII.GetBytes(verifier)));
        var now = DateTime.UtcNow;
        db.Set<SsoLoginState>().Add(new SsoLoginState
        {
            StateHash = Tokens.Sha256(state), OrganizationId = org.Id, Nonce = nonce, CodeVerifierProtected = protector.Protect(verifier),
            ReturnPath = SafeReturnPath(returnPath), ExpiresAt = now.AddMinutes(Math.Clamp(opt.StateLifetimeMinutes, 1, 60)), CreatedAt = now,
        });
        await db.Set<SsoLoginState>().Where(s => s.ExpiresAt < now.AddDays(-1)).ExecuteDeleteAsync(ct); // housekeeping
        await db.SaveChangesAsync(ct);
        var q = new Dictionary<string, string>
        {
            ["response_type"] = "code", ["client_id"] = cfg.ClientId, ["redirect_uri"] = opt.RedirectUri, ["scope"] = "openid email profile",
            ["state"] = state, ["nonce"] = nonce, ["code_challenge"] = challenge, ["code_challenge_method"] = "S256",
        };
        var sep = d.AuthorizationEndpoint.Contains('?') ? "&" : "?";
        return d.AuthorizationEndpoint + sep + string.Join("&", q.Select(kv => kv.Key + "=" + Uri.EscapeDataString(kv.Value)));
    }

    public static string SafeReturnPath(string? p)
    {
        var v = (p ?? "").Trim();
        if (v.Length is 0 or > 500 || !v.StartsWith('/') || v.StartsWith("//") || v.Contains('\\') || v.Any(char.IsControl)) return "/";
        return v;
    }

    /// <summary>Handles the IdP redirect. Always returns the front-end completion URL (with ?handoff= or ?error=).</summary>
    public async Task<string> Callback(string? code, string? state, string? error, CancellationToken ct)
    {
        RequireConfigured();
        try
        {
            var (handoff, returnPath) = await CallbackCore(code, state, error, ct);
            return Completion($"handoff={Uri.EscapeDataString(handoff)}&returnTo={Uri.EscapeDataString(returnPath)}");
        }
        catch (SsoException e)
        {
            log.LogWarning("SSO login failed: {Code} {Message}", e.Code, e.Message);
            return Completion("error=" + Uri.EscapeDataString(e.Code));
        }
    }

    private string Completion(string query) => opt.CompletionUrl + (opt.CompletionUrl.Contains('?') ? "&" : "?") + query;

    private async Task<(string Handoff, string ReturnPath)> CallbackCore(string? code, string? state, string? error, CancellationToken ct)
    {
        if (string.IsNullOrEmpty(state) || state.Length > 200) throw new SsoException("sso_invalid_state", "Missing state.");
        var stateHash = Tokens.Sha256(state);
        var now = DateTime.UtcNow;
        // Single use: only the first callback for a state can claim it.
        var claimed = await db.Set<SsoLoginState>().Where(s => s.StateHash == stateHash && s.ConsumedAt == null && s.ExpiresAt > now)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.ConsumedAt, now), ct);
        if (claimed == 0) throw new SsoException("sso_invalid_state", "Unknown, expired or already used state.");
        var st = await db.Set<SsoLoginState>().AsNoTracking().FirstAsync(s => s.StateHash == stateHash, ct);
        if (!string.IsNullOrEmpty(error)) throw new SsoException("sso_idp_error", "The identity provider reported an error.");
        if (string.IsNullOrEmpty(code) || code.Length > 4096) throw new SsoException("sso_invalid_request", "Missing authorization code.");

        var cfg = await db.Set<OrgSsoConfig>().AsNoTracking().FirstOrDefaultAsync(c => c.OrganizationId == st.OrganizationId && c.Enabled, ct)
                  ?? throw new SsoException("sso_not_available", "SSO is no longer enabled for this organization.");
        var d = await oidc.Discovery(cfg.Issuer, ct);
        var idToken = await oidc.ExchangeCode(d, cfg.ClientId, protector.Unprotect(cfg.ClientSecretProtected), code,
            protector.Unprotect(st.CodeVerifierProtected), opt.RedirectUri, ct);
        var claims = await ValidateIdToken(idToken, d, cfg.ClientId, st.Nonce, ct);

        var sub = Claim(claims, "sub") ?? throw new SsoException("sso_invalid_token", "id_token has no subject.");
        var email = Claim(claims, "email");
        if (string.IsNullOrWhiteSpace(email)) throw new SsoException("sso_email_missing", "The identity provider did not share an email address.");
        if (!EmailVerified(claims)) throw new SsoException("sso_email_unverified", "Your email address is not verified by your identity provider.");
        try { email = IdentityValidation.RequireEmail(email); }
        catch (AppException) { throw new SsoException("sso_email_missing", "The identity provider shared an invalid email address."); }
        var domain = email[(email.LastIndexOf('@') + 1)..].ToLowerInvariant();
        var allowed = cfg.AllowedDomains.Split(',', StringSplitOptions.RemoveEmptyEntries);
        if (!allowed.Contains(domain)) throw new SsoException("sso_domain_not_allowed", "Your email domain is not allowed for this organization.");

        var userId = await Provision(st.OrganizationId, cfg.Issuer, sub, email, Claim(claims, "name"), ct);
        var handoff = Tokens.Random(32);
        await db.Set<SsoLoginState>().Where(s => s.StateHash == stateHash).ExecuteUpdateAsync(s => s
            .SetProperty(x => x.HandoffHash, Tokens.Sha256(handoff)).SetProperty(x => x.UserId, userId)
            .SetProperty(x => x.HandoffExpiresAt, DateTime.UtcNow + HandoffLifetime), ct);
        return (handoff, st.ReturnPath);
    }

    private async Task<IDictionary<string, object>> ValidateIdToken(string idToken, OidcDiscovery d, string clientId, string nonce, CancellationToken ct)
    {
        var handler = new JsonWebTokenHandler();
        async Task<TokenValidationResult> Validate(bool refresh) => await handler.ValidateTokenAsync(idToken, new TokenValidationParameters
        {
            ValidIssuer = d.Issuer, ValidAudience = clientId, IssuerSigningKeys = await oidc.Keys(d.JwksUri, refresh, ct),
            ValidAlgorithms = Algorithms, RequireSignedTokens = true, RequireExpirationTime = true, ValidateLifetime = true,
            ValidateIssuer = true, ValidateAudience = true, ValidateIssuerSigningKey = true, ClockSkew = TimeSpan.FromMinutes(2),
        });
        var result = await Validate(false);
        if (!result.IsValid && result.Exception is SecurityTokenSignatureKeyNotFoundException) result = await Validate(true); // key rotation
        if (!result.IsValid) throw new SsoException("sso_invalid_token", "The identity token could not be validated.");
        var tokenNonce = result.Claims.TryGetValue("nonce", out var n) ? n?.ToString() : null;
        if (tokenNonce is null || !CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(tokenNonce), Encoding.UTF8.GetBytes(nonce)))
            throw new SsoException("sso_invalid_token", "Nonce mismatch.");
        return result.Claims;
    }

    private static string? Claim(IDictionary<string, object> claims, string name) =>
        claims.TryGetValue(name, out var v) && v is not null ? v.ToString() : null;

    private static bool EmailVerified(IDictionary<string, object> claims) =>
        claims.TryGetValue("email_verified", out var v) && v switch
        {
            bool b => b,
            string s => string.Equals(s, "true", StringComparison.OrdinalIgnoreCase),
            JsonElement { ValueKind: JsonValueKind.True } => true,
            _ => string.Equals(v?.ToString(), "true", StringComparison.OrdinalIgnoreCase),
        };

    /// <summary>Finds/links/creates the user and ensures org membership (seat-limited). Returns the user id.</summary>
    private async Task<Guid> Provision(Guid orgId, string issuer, string sub, string email, string? name, CancellationToken ct)
    {
        await using var tx = await db.Database.BeginTransactionAsync(ct);
        await db.Database.ExecuteSqlInterpolatedAsync($"SELECT `Id` FROM `Organizations` WHERE `Id` = {orgId.ToString()} FOR UPDATE", ct);
        var org = await db.Organizations.AsNoTracking().FirstOrDefaultAsync(o => o.Id == orgId, ct);
        if (org is null || !org.IsActive) throw new SsoException("sso_not_available", "Organization is not active.");
        var normalized = IdentityValidation.NormalizeEmail(email);
        var identity = await db.Set<SsoIdentity>().FirstOrDefaultAsync(i => i.OrganizationId == orgId && i.Subject == sub, ct);
        User user;
        if (identity is not null)
        {
            user = await db.Users.Include(u => u.Roles).FirstAsync(u => u.Id == identity.UserId, ct);
            identity.LastLoginAt = DateTime.UtcNow;
        }
        else
        {
            var existing = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.NormalizedEmail == normalized, ct);
            if (existing is not null)
            {
                var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == existing.Id, ct);
                if (!EmailVerificationService.IsVerified(existing, sec))
                    throw new SsoException("sso_link_requires_verified_email", "Verify the email address of your existing Mastemy account before signing in with SSO.");
                user = existing;
                audit.Record("sso.identity_linked", nameof(User), user.Id, new { organizationId = orgId, issuer });
            }
            else
            {
                var display = (name ?? "").Trim();
                if (display.Length is 0 or > 100 || display.Contains('<')) display = email[..email.IndexOf('@')];
                if (display.Length > 100) display = display[..100];
                user = new User
                {
                    Email = email, NormalizedEmail = normalized, DisplayName = display, PasswordHash = PasswordHasher.Hash(Tokens.Random(32)),
                };
                user.Roles.Add(new UserRole { UserId = user.Id, Role = Roles.Student });
                db.Users.Add(user);
                db.Set<UserSecurity>().Add(new UserSecurity { UserId = user.Id, EmailVerifiedAt = DateTime.UtcNow, VerifiedEmail = normalized });
                audit.Record("sso.user_provisioned", nameof(User), user.Id, new { organizationId = orgId, issuer });
            }
            db.Set<SsoIdentity>().Add(new SsoIdentity { OrganizationId = orgId, Issuer = issuer, Subject = sub.Length > 255 ? sub[..255] : sub, UserId = user.Id });
        }
        RequireSsoEligible(user);
        if (!await db.OrganizationMembers.AnyAsync(m => m.OrganizationId == orgId && m.UserId == user.Id, ct))
        {
            var used = await db.OrganizationMembers.CountAsync(m => m.OrganizationId == orgId, ct);
            if (used + 1 > org.SeatLimit) throw new SsoException("seat_limit_reached", "This organization has no free seats. Ask an administrator for help.");
            db.OrganizationMembers.Add(new OrganizationMember { OrganizationId = orgId, UserId = user.Id, Role = OrgRole.Member, Department = "" });
            await db.SaveChangesAsync(ct);
            var (granted, _) = await sync.Reconcile(orgId);
            audit.Record("org.member.added", nameof(Organization), orgId, new { userId = user.Id, via = "sso", role = "Member", granted });
        }
        audit.Record("sso.login", nameof(User), user.Id, new { organizationId = orgId });
        try { await db.SaveChangesAsync(ct); }
        catch (DbUpdateException) { throw new SsoException("sso_conflict", "A concurrent sign-in is in progress. Try again."); }
        await tx.CommitAsync(ct);
        return user.Id;
    }

    private static void RequireSsoEligible(User user)
    {
        if (user.IsSuspended) throw new SsoException("sso_account_suspended", "This account is suspended.");
        if (SecurityClaims.IsPrivileged(user.Roles.Select(r => r.Role)))
            throw new SsoException("sso_privileged_not_allowed", "Privileged accounts must sign in with password and MFA.");
    }

    /// <summary>Exchanges the one-time handoff code for normal Mastemy access/refresh tokens.</summary>
    public async Task<AuthResponse> Exchange(SsoExchangeInput input, CancellationToken ct)
    {
        var raw = (input.Handoff ?? "").Trim();
        if (raw.Length is 0 or > 200) throw AppException.Bad("handoff is required.", "invalid_handoff");
        var hash = Tokens.Sha256(raw);
        var now = DateTime.UtcNow;
        var claimed = await db.Set<SsoLoginState>().Where(s => s.HandoffHash == hash && s.HandoffUsedAt == null && s.HandoffExpiresAt > now)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.HandoffUsedAt, now), ct);
        if (claimed == 0) throw new AppException(401, "The sign-in link is invalid or has expired.", "invalid_handoff");
        var st = await db.Set<SsoLoginState>().AsNoTracking().FirstAsync(s => s.HandoffHash == hash, ct);
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == st.UserId, ct)
                   ?? throw new AppException(401, "The sign-in link is invalid or has expired.", "invalid_handoff");
        try { RequireSsoEligible(user); }
        catch (SsoException e) { throw new AppException(403, e.Message, e.Code); }
        return await auth.StartSession(user, false);
    }
}
