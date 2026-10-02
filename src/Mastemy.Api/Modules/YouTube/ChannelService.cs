using System.Text.Json;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.YouTube;

public record ChannelDto(Guid Id, string ChannelId, string Title, ChannelMode Mode, Guid? OwnerUserId, bool IsActive, bool Authorized,
    string? GrantedScopes, DateTime? AuthorizedAt, DateTime? RevokedAt)
{
    public static ChannelDto From(YouTubeChannel c) => new(c.Id, c.ChannelId, c.Title, c.Mode, c.OwnerUserId, c.IsActive,
        ChannelPolicy.IsAuthorized(c), c.GrantedScopes, c.AuthorizedAt, c.RevokedAt);
}

public record CreateChannelRequest(string? ChannelId, string? Title, ChannelMode Mode, Guid? OwnerUserId);
public record OAuthStartDto(string AuthorizationUrl);
public record OAuthStartResult(OAuthStartDto Dto, string Nonce);

/// <summary>
/// Single-use OAuth state nonces persisted in the OAuthNonces table, so replay protection holds across app instances.
/// A nonce is inserted when the flow starts and consumed with one conditional UPDATE (unconsumed, unexpired, same user).
/// </summary>
public class OAuthNonceStore(AppDbContext db)
{
    public async Task Issue(string nonce, Guid userId, DateTime expiresAt, CancellationToken ct = default)
    {
        db.OAuthNonces.Add(new OAuthNonce { Nonce = nonce, UserId = userId, ExpiresAt = expiresAt });
        await db.SaveChangesAsync(ct);
    }

    /// <summary>Marks the nonce consumed; false if it is unknown, expired, for another user, or already used.</summary>
    public async Task<bool> TryConsume(string nonce, Guid userId, CancellationToken ct = default)
    {
        var now = DateTime.UtcNow;
        var n = await db.OAuthNonces.Where(x => x.Nonce == nonce && x.UserId == userId && x.ConsumedAt == null && x.ExpiresAt > now)
            .ExecuteUpdateAsync(u => u.SetProperty(x => x.ConsumedAt, now), ct);
        return n == 1;
    }

    /// <summary>Deletes nonces that expired more than an hour ago (consumed or not).</summary>
    public Task<int> CleanupExpired(CancellationToken ct = default)
    {
        var cutoff = DateTime.UtcNow.AddHours(-1);
        return db.OAuthNonces.Where(x => x.ExpiresAt < cutoff).ExecuteDeleteAsync(ct);
    }
}

/// <summary>Hourly removal of expired OAuth nonces.</summary>
public class OAuthNonceCleanupService(IServiceScopeFactory scopes, ILogger<OAuthNonceCleanupService> log) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromHours(1));
        try
        {
            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                try
                {
                    using var scope = scopes.CreateScope();
                    var n = await scope.ServiceProvider.GetRequiredService<OAuthNonceStore>().CleanupExpired(stoppingToken);
                    if (n > 0) log.LogInformation("Removed {Count} expired OAuth nonces", n);
                }
                catch (Exception ex) when (ex is not OperationCanceledException) { log.LogWarning(ex, "OAuth nonce cleanup failed"); }
            }
        }
        catch (OperationCanceledException) { }
    }
}

public partial class ChannelService(AppDbContext db, ICurrentUser me, AuditService audit, FeatureFlagService flags,
    GoogleOAuthClient google, SecretProtector secrets, IDataProtectionProvider dp, OAuthNonceStore nonces)
{
    [GeneratedRegex("^UC[A-Za-z0-9_-]{22}$")] private static partial Regex ChannelIdRx();
    public static bool IsValidChannelId(string? s) => s is not null && ChannelIdRx().IsMatch(s);

    private record StatePayload(Guid UserId, ChannelMode Mode, string Nonce);
    public const string NonceCookieName = "mastemy_yt_oauth";
    public static readonly TimeSpan StateLifetime = TimeSpan.FromMinutes(15);
    private ITimeLimitedDataProtector StateProtector => dp.CreateProtector("Mastemy.YouTube.OAuthState.v1").ToTimeLimitedDataProtector();

    public async Task<ChannelDto> Create(CreateChannelRequest req)
    {
        me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        var chId = req.ChannelId?.Trim();
        if (!IsValidChannelId(chId)) throw AppException.Bad("Channel id must be a YouTube channel id (UC followed by 22 characters).", "invalid_channel_id");
        var title = req.Title?.Trim();
        if (string.IsNullOrWhiteSpace(title) || title.Length > 200) throw AppException.Bad("Title is required (max 200 characters).");
        if (!Enum.IsDefined(req.Mode)) throw AppException.Bad("Invalid channel mode.");
        if (req.Mode == ChannelMode.InstructorOwned)
        {
            if (req.OwnerUserId is not { } owner) throw AppException.Bad("Instructor-owned channels need an owner.");
            var isInstructor = await db.UserRoles.AnyAsync(r => r.UserId == owner && r.Role == Roles.Instructor);
            if (!isInstructor) throw AppException.Bad("Owner must be an approved instructor.");
        }
        else if (req.OwnerUserId is not null) throw AppException.Bad("Mastemy-managed channels have no instructor owner.");
        if (await db.YouTubeChannels.AnyAsync(c => c.ChannelId == chId)) throw AppException.Conflict("This channel is already registered.", "duplicate_channel");
        var ch = new YouTubeChannel { ChannelId = chId!, Title = title, Mode = req.Mode, OwnerUserId = req.OwnerUserId };
        db.YouTubeChannels.Add(ch);
        audit.Record("youtube.channel.created", "YouTubeChannel", ch.Id, new { ch.ChannelId, ch.Title, mode = ch.Mode.ToString(), ch.OwnerUserId });
        await db.SaveChangesAsync();
        return ChannelDto.From(ch);
    }

    private async Task RequireMayConnect(Guid userId, ChannelMode mode, Func<string, Task<bool>> hasRole)
    {
        if (mode == ChannelMode.MastemyManaged)
        {
            if (!await hasRole(Roles.Admin) && !await hasRole(Roles.SuperAdmin))
                throw AppException.Forbidden("Only staff can connect the Mastemy-managed channel.");
        }
        else
        {
            if (!await flags.IsEnabled(FeatureFlags.InstructorOwnedChannelsEnabled))
                throw AppException.Forbidden("Instructor-owned channels are not enabled.");
            if (!await hasRole(Roles.Instructor)) throw AppException.Forbidden("Only approved instructors can connect their own channel.");
        }
    }

    public async Task<OAuthStartResult> Start(ChannelMode mode)
    {
        var uid = me.RequireId();
        if (!Enum.IsDefined(mode)) throw AppException.Bad("Invalid mode.");
        google.RequireConfigured();
        await RequireMayConnect(uid, mode, r => Task.FromResult(me.IsInRole(r)));
        var nonce = Tokens.Random(24);
        var payload = JsonSerializer.Serialize(new StatePayload(uid, mode, nonce));
        var state = StateProtector.Protect(payload, StateLifetime);
        await nonces.Issue(nonce, uid, DateTime.UtcNow.Add(StateLifetime));
        return new OAuthStartResult(new OAuthStartDto(google.BuildAuthorizationUrl(state)), nonce);
    }

    /// <summary>OAuth redirect target. Identity comes from the protected state (the browser redirect carries no bearer token).</summary>
    /// <remarks>
    /// The state is bound to the browser that started the flow (HttpOnly nonce cookie must equal the nonce inside the protected
    /// state), each nonce is single-use, and when the callback request is authenticated it must be the same user.
    /// </remarks>
    public async Task<ChannelDto> Callback(string? code, string? state, string? error, string? cookieNonce, CancellationToken ct)
    {
        google.RequireConfigured();
        if (!string.IsNullOrEmpty(error)) throw AppException.Bad("Google authorization was not granted.", "oauth_denied");
        if (string.IsNullOrWhiteSpace(code) || string.IsNullOrWhiteSpace(state)) throw AppException.Bad("Missing code or state.", "oauth_invalid");
        StatePayload? p;
        try { p = JsonSerializer.Deserialize<StatePayload>(StateProtector.Unprotect(state)); }
        catch (Exception ex) when (ex is System.Security.Cryptography.CryptographicException or JsonException or FormatException)
        { throw AppException.Bad("The authorization request is invalid or expired. Start again.", "oauth_state_invalid"); }
        if (p is null || string.IsNullOrEmpty(p.Nonce) || string.IsNullOrEmpty(cookieNonce)
            || !System.Security.Cryptography.CryptographicOperations.FixedTimeEquals(
                System.Text.Encoding.UTF8.GetBytes(p.Nonce), System.Text.Encoding.UTF8.GetBytes(cookieNonce)))
            throw AppException.Bad("The authorization request is invalid or expired. Start again.", "oauth_state_invalid");
        if (me.Id is { } current && current != p.UserId)
            throw AppException.Bad("The authorization request belongs to a different user.", "oauth_state_invalid");
        if (!await nonces.TryConsume(p.Nonce, p.UserId, ct))
            throw AppException.Bad("This authorization request was already used. Start again.", "oauth_state_invalid");

        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == p.UserId, ct);
        if (user is null || user.IsSuspended) throw AppException.Forbidden();
        await RequireMayConnect(user.Id, p.Mode, r => Task.FromResult(user.Roles.Any(x => x.Role == r)));

        var tokens = await google.ExchangeCode(code, ct);
        if (string.IsNullOrEmpty(tokens.RefreshToken))
            throw AppException.Bad("Google did not return offline access. Remove Mastemy's access in your Google account and try again.", "oauth_no_refresh_token");
        var granted = (tokens.Scope ?? "").Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (granted.Length > 0 && !(granted.Contains("https://www.googleapis.com/auth/youtube.upload") && granted.Contains("https://www.googleapis.com/auth/youtube.readonly")))
            throw AppException.Bad("Required YouTube permissions were not granted.", "oauth_scope_missing");
        var own = await google.GetOwnChannel(tokens.AccessToken, ct);

        var ch = await db.YouTubeChannels.FirstOrDefaultAsync(c => c.ChannelId == own.ChannelId, ct);
        if (ch is null)
        {
            ch = new YouTubeChannel { ChannelId = own.ChannelId, Title = own.Title, Mode = p.Mode, OwnerUserId = p.Mode == ChannelMode.InstructorOwned ? user.Id : null };
            db.YouTubeChannels.Add(ch);
        }
        else
        {
            if (ch.Mode != p.Mode) throw AppException.Conflict("This YouTube channel is registered under a different channel mode.", "channel_mode_conflict");
            if (ch.Mode == ChannelMode.InstructorOwned && ch.OwnerUserId != user.Id)
                throw AppException.Conflict("This YouTube channel is connected to another instructor.", "channel_owned_by_another");
            ch.Title = own.Title;
        }
        ch.EncryptedRefreshToken = secrets.Protect(tokens.RefreshToken);
        ch.GrantedScopes = string.IsNullOrWhiteSpace(tokens.Scope) ? GoogleOAuthClient.Scopes : tokens.Scope;
        ch.AuthorizedAt = DateTime.UtcNow;
        ch.RevokedAt = null;
        ch.IsActive = true;
        GoogleOAuthClient.Forget(ch.Id);
        db.AuditLogs.Add(new AuditLog
        {
            ActorId = user.Id, Action = "youtube.channel.authorized", EntityType = "YouTubeChannel", EntityId = ch.Id.ToString(),
            Details = JsonSerializer.Serialize(new { ch.ChannelId, mode = ch.Mode.ToString(), scopes = ch.GrantedScopes }),
        });
        await db.SaveChangesAsync(ct);
        return ChannelDto.From(ch);
    }

    public async Task Revoke(Guid id, CancellationToken ct)
    {
        var uid = me.RequireId();
        var ch = await db.YouTubeChannels.FirstOrDefaultAsync(c => c.Id == id, ct) ?? throw AppException.NotFound("Channel");
        var allowed = ch.Mode == ChannelMode.MastemyManaged ? me.IsStaff : (me.IsStaff || ch.OwnerUserId == uid);
        if (!allowed) throw AppException.Forbidden();
        if (ch.EncryptedRefreshToken is { } cipher)
        {
            try { await google.TryRevoke(secrets.Unprotect(cipher), ct); }
            catch (System.Security.Cryptography.CryptographicException) { }
        }
        ch.EncryptedRefreshToken = null;
        ch.RevokedAt = DateTime.UtcNow;
        GoogleOAuthClient.Forget(ch.Id);
        // Pending/active uploads on this channel can no longer proceed.
        var sessions = await db.UploadSessions.Where(s => s.ChannelId == ch.Id && (s.Status == UploadSessionStatus.Approved
            || s.Status == UploadSessionStatus.Uploading || s.Status == UploadSessionStatus.AwaitingSourceFile)).ToListAsync(ct);
        foreach (var s in sessions)
        {
            s.Status = UploadSessionStatus.Failed; s.FailureReason = "Channel authorization was revoked."; s.UpstreamSessionUri = null; s.UpdatedAt = DateTime.UtcNow;
        }
        audit.Record("youtube.channel.revoked", "YouTubeChannel", ch.Id, new { ch.ChannelId, failedUploads = sessions.Count });
        await db.SaveChangesAsync(ct);
    }
}
