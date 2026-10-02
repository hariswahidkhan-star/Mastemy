using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Mastemy.Api.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Mastemy.Api.Modules.Identity;

/// <summary>
/// Server-side validity check run for every access token (JwtBearer OnTokenValidated). A signed, unexpired token is still
/// rejected when: its user no longer exists or is suspended/deleted; it carries a role the user no longer has (demotion);
/// or its <c>sid</c> session no longer has a live (unrevoked, unexpired) refresh token (session revoked, logout, password
/// change, suspension). Tokens without <c>sid</c> (legacy issuer) are accepted only if the user is active and roles match.
/// Lookups are cached for at most <see cref="CacheTtl"/> per user / per (user, sid); <see cref="Invalidate"/> drops a user's
/// entries immediately in this process (called on revoke, suspend, delete and role change).
/// </summary>
public class TokenSessionValidator(IMemoryCache cache)
{
    public static readonly TimeSpan CacheTtl = TimeSpan.FromSeconds(5);
    private readonly ConcurrentDictionary<Guid, long> _generation = new();

    private sealed record UserState(bool Active, HashSet<string> Roles);

    public void Invalidate(Guid userId) => _generation.AddOrUpdate(userId, 1, (_, g) => g + 1);

    private long Gen(Guid userId) => _generation.GetValueOrDefault(userId);

    public async Task<string?> Check(ClaimsPrincipal principal, AppDbContext db, CancellationToken ct)
    {
        if (!Guid.TryParse(principal.FindFirstValue(JwtRegisteredClaimNames.Sub), out var uid)) return "token has no subject";
        var tokenRoles = principal.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();
        var state = await UserStateFor(uid, db, ct);
        if (!state.Active || tokenRoles.Any(r => !state.Roles.Contains(r)))
        {
            // A cached snapshot may predate a role grant / reactivation made elsewhere: re-read once before rejecting.
            Invalidate(uid);
            state = await UserStateFor(uid, db, ct);
        }
        if (!state.Active) return "user is not active";
        if (tokenRoles.Any(r => !state.Roles.Contains(r))) return "token roles are no longer granted";
        var gen = Gen(uid);

        var sidValue = principal.FindFirstValue(SecurityClaims.SessionId);
        if (sidValue is null) return null; // legacy token without session: active user + matching roles suffice
        if (!Guid.TryParse(sidValue, out var sid)) return "invalid session id";
        var live = await cache.GetOrCreateAsync(("tsv:sid", uid, sid, gen), async e =>
        {
            e.AbsoluteExpirationRelativeToNow = CacheTtl;
            var now = DateTime.UtcNow;
            return await db.RefreshTokens.AsNoTracking().AnyAsync(t => t.FamilyId == sid && t.UserId == uid && t.RevokedAt == null && t.ExpiresAt > now, ct);
        });
        return live ? null : "session has been revoked";
    }

    private async Task<UserState> UserStateFor(Guid uid, AppDbContext db, CancellationToken ct) =>
        (await cache.GetOrCreateAsync(("tsv:user", uid, Gen(uid)), async e =>
        {
            e.AbsoluteExpirationRelativeToNow = CacheTtl;
            var u = await db.Users.AsNoTracking().Where(x => x.Id == uid).Select(x => new { x.IsSuspended }).FirstOrDefaultAsync(ct);
            var roles = u is null ? [] : await db.UserRoles.AsNoTracking().Where(r => r.UserId == uid).Select(r => r.Role).ToListAsync(ct);
            return new UserState(u is { IsSuspended: false }, roles.ToHashSet(StringComparer.Ordinal));
        }))!;

    /// <summary>Chains the check into the JwtBearer events after any existing OnTokenValidated handler.</summary>
    public static void Attach(JwtBearerOptions o)
    {
        o.Events ??= new JwtBearerEvents();
        var previous = o.Events.OnTokenValidated;
        o.Events.OnTokenValidated = async ctx =>
        {
            if (previous is not null) await previous(ctx);
            if (ctx.Result is not null || ctx.Principal is null) return; // an earlier handler already decided
            var sp = ctx.HttpContext.RequestServices;
            var validator = sp.GetRequiredService<TokenSessionValidator>();
            var reason = await validator.Check(ctx.Principal, sp.GetRequiredService<AppDbContext>(), ctx.HttpContext.RequestAborted);
            if (reason is not null) ctx.Fail("Access token is no longer valid: " + reason + ".");
        };
    }
}
