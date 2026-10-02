using System.Collections.Concurrent;
using System.Net.Http.Headers;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.YouTube;

public record OAuthTokens(string AccessToken, string? RefreshToken, int ExpiresIn, string? Scope);
public record OwnChannel(string ChannelId, string Title);

/// <summary>
/// Google OAuth + channel identity. Access tokens live only in memory (per channel, until shortly before expiry);
/// refresh tokens are stored encrypted by <see cref="SecretProtector"/> and never leave the server.
/// </summary>
public class GoogleOAuthClient(IHttpClientFactory http, IOptions<YouTubeOptions> options, SecretProtector secrets, ILogger<GoogleOAuthClient> log)
{
    public const string Scopes = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly " + ForceSslScope;
    /// <summary>Needed for playlist maintenance and caption uploads (spec §10.5).</summary>
    public const string ForceSslScope = "https://www.googleapis.com/auth/youtube.force-ssl";
    private static readonly ConcurrentDictionary<Guid, (string Token, DateTime ExpiresAt, string CipherHash)> AccessCache = new();

    private YouTubeOptions O => options.Value;
    private HttpClient Client() => http.CreateClient(YouTubeOptions.HttpClientName);

    public void RequireConfigured()
    {
        if (!O.OAuthConfigured)
            throw new AppException(503, "YouTube OAuth is not configured on this server.", YouTubeErrors.OAuthNotConfigured);
    }

    public string BuildAuthorizationUrl(string state)
    {
        RequireConfigured();
        var q = new Dictionary<string, string>
        {
            ["client_id"] = O.OAuthClientId,
            ["redirect_uri"] = O.OAuthRedirectUri,
            ["response_type"] = "code",
            ["scope"] = Scopes,
            ["access_type"] = "offline",
            ["prompt"] = "consent",
            ["include_granted_scopes"] = "false",
            ["state"] = state,
        };
        return O.AuthorizationUrl + "?" + string.Join("&", q.Select(kv => $"{kv.Key}={Uri.EscapeDataString(kv.Value)}"));
    }

    public Task<OAuthTokens> ExchangeCode(string code, CancellationToken ct) => Token(new Dictionary<string, string>
    {
        ["grant_type"] = "authorization_code", ["code"] = code, ["redirect_uri"] = O.OAuthRedirectUri,
        ["client_id"] = O.OAuthClientId, ["client_secret"] = O.OAuthClientSecret,
    }, ct);

    /// <summary>Returns a valid access token for the channel, refreshing with its stored refresh token when needed.</summary>
    public async Task<string> GetAccessToken(YouTubeChannel ch, CancellationToken ct)
    {
        RequireConfigured();
        if (!ChannelPolicy.IsAuthorized(ch))
            throw AppException.Conflict("The YouTube channel is not authorized. Reconnect it first.", "channel_not_authorized");
        var cipherHash = Tokens.Sha256(ch.EncryptedRefreshToken!);
        if (AccessCache.TryGetValue(ch.Id, out var c) && c.CipherHash == cipherHash && c.ExpiresAt > DateTime.UtcNow.AddSeconds(60))
            return c.Token;
        string refresh;
        try { refresh = secrets.Unprotect(ch.EncryptedRefreshToken!); }
        catch (System.Security.Cryptography.CryptographicException)
        {
            throw AppException.Conflict("Stored channel credentials cannot be decrypted. Reconnect the channel.", "channel_not_authorized");
        }
        var t = await Token(new Dictionary<string, string>
        {
            ["grant_type"] = "refresh_token", ["refresh_token"] = refresh,
            ["client_id"] = O.OAuthClientId, ["client_secret"] = O.OAuthClientSecret,
        }, ct);
        AccessCache[ch.Id] = (t.AccessToken, DateTime.UtcNow.AddSeconds(Math.Max(60, t.ExpiresIn)), cipherHash);
        return t.AccessToken;
    }

    public static void Forget(Guid channelId) => AccessCache.TryRemove(channelId, out _);

    public async Task<OwnChannel> GetOwnChannel(string accessToken, CancellationToken ct)
    {
        using var req = new HttpRequestMessage(HttpMethod.Get, $"{O.ApiBaseUrl.TrimEnd('/')}/channels?part=snippet&mine=true");
        req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        using var resp = await Send(req, ct);
        var body = await resp.Content.ReadAsStringAsync(ct);
        if (!resp.IsSuccessStatusCode) throw YouTubeErrors.FromResponse(resp.StatusCode, body).ToAppException();
        using var doc = JsonDocument.Parse(body);
        if (doc.RootElement.TryGetProperty("items", out var items) && items.ValueKind == JsonValueKind.Array)
            foreach (var it in items.EnumerateArray())
            {
                var id = it.TryGetProperty("id", out var i) ? i.GetString() : null;
                var title = it.TryGetProperty("snippet", out var s) && s.TryGetProperty("title", out var tt) ? tt.GetString() : null;
                if (!string.IsNullOrEmpty(id)) return new OwnChannel(id, title ?? id);
            }
        throw AppException.Bad("The Google account has no YouTube channel.", "no_channel");
    }

    /// <summary>Best-effort revocation at Google; local revocation proceeds regardless.</summary>
    public async Task TryRevoke(string refreshToken, CancellationToken ct)
    {
        try
        {
            using var resp = await Client().PostAsync(O.RevokeUrl, new FormUrlEncodedContent(new Dictionary<string, string> { ["token"] = refreshToken }), ct);
            if (!resp.IsSuccessStatusCode) log.LogWarning("Google token revocation returned {Status}", (int)resp.StatusCode);
        }
        catch (HttpRequestException ex) { log.LogWarning(ex, "Google token revocation failed"); }
    }

    private async Task<OAuthTokens> Token(Dictionary<string, string> form, CancellationToken ct)
    {
        HttpResponseMessage r0;
        try { r0 = await Client().PostAsync(O.TokenUrl, new FormUrlEncodedContent(form), ct); }
        catch (HttpRequestException) { throw new AppException(502, "Google OAuth is unreachable.", YouTubeErrors.Upstream); }
        using var resp = r0;
        var body = await resp.Content.ReadAsStringAsync(ct);
        string? error = null;
        JsonElement root = default;
        JsonDocument? doc = null;
        try { doc = JsonDocument.Parse(body); root = doc.RootElement; error = root.TryGetProperty("error", out var e) && e.ValueKind == JsonValueKind.String ? e.GetString() : null; }
        catch (JsonException) { }
        using (doc)
        {
            if (!resp.IsSuccessStatusCode || doc is null || error is not null)
            {
                if (error == "invalid_grant")
                    throw AppException.Conflict("Google rejected the channel authorization (revoked or expired). Reconnect the channel.", "channel_not_authorized");
                log.LogWarning("Google token endpoint returned {Status} {Error}", (int)resp.StatusCode, error);
                throw new AppException(502, "Google OAuth token request failed.", YouTubeErrors.Upstream);
            }
            var access = root.TryGetProperty("access_token", out var a) ? a.GetString() : null;
            if (string.IsNullOrEmpty(access)) throw new AppException(502, "Google OAuth returned no access token.", YouTubeErrors.Upstream);
            return new OAuthTokens(access,
                root.TryGetProperty("refresh_token", out var r) ? r.GetString() : null,
                root.TryGetProperty("expires_in", out var x) && x.ValueKind == JsonValueKind.Number ? x.GetInt32() : 3600,
                root.TryGetProperty("scope", out var sc) ? sc.GetString() : null);
        }
    }

    private async Task<HttpResponseMessage> Send(HttpRequestMessage req, CancellationToken ct)
    {
        try { return await Client().SendAsync(req, ct); }
        catch (HttpRequestException) { throw new AppException(502, "YouTube API is unreachable.", YouTubeErrors.Upstream); }
    }
}
