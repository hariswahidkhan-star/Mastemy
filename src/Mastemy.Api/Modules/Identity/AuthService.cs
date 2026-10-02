using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Engagement;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Identity;

public class AuthService(AppDbContext db, AccessTokenFactory jwt, JwtOptions opt, AuditService audit, LoginEmailRateLimiter emailLimiter,
    IHttpContextAccessor http, IConfiguration cfg, EmailVerificationService verification, TokenSessionValidator tokenValidator,
    SecurityEvents secLog)
{
    /// <summary>Failures tolerated before per-account exponential backoff starts.</summary>
    public const int BackoffThreshold = 5;
    public static readonly TimeSpan MaxBackoff = TimeSpan.FromMinutes(15);

    /// <summary>Backoff after <paramref name="failures"/> consecutive failures: 2^(n-5) seconds, capped at 15 minutes.</summary>
    public static TimeSpan BackoffFor(int failures)
    {
        if (failures < BackoffThreshold) return TimeSpan.Zero;
        var exp = failures - BackoffThreshold;
        if (exp >= 10) return MaxBackoff; // 2^10 s > 15 min
        var d = TimeSpan.FromSeconds(1 << exp);
        return d > MaxBackoff ? MaxBackoff : d;
    }
    private const string InvalidCredentials = "Invalid email or password.";
    private const string InvalidRefresh = "Invalid or expired refresh token.";

    private static AppException Unauthorized(string msg, string code = "invalid_credentials") => new(401, msg, code);

    public async Task<AuthResponse> Register(RegisterRequest req)
    {
        var email = IdentityValidation.RequireEmail(req.Email);
        IdentityValidation.RequirePassword(req.Password);
        var name = IdentityValidation.RequireText(req.DisplayName, "DisplayName", 1, 100);
        var lang = string.IsNullOrWhiteSpace(req.PreferredLanguage) ? "en" : req.PreferredLanguage.Trim().ToLowerInvariant();
        if (!IdentityValidation.Languages.Contains(lang)) throw AppException.Bad("Unsupported preferred language.", "invalid_language");

        var normalized = IdentityValidation.NormalizeEmail(email);
        if (await db.Users.AnyAsync(u => u.NormalizedEmail == normalized))
            throw AppException.Conflict("An account with this email already exists.", "email_taken");

        var user = new User
        {
            Email = email, NormalizedEmail = normalized, DisplayName = name, PreferredLanguage = lang,
            PasswordHash = PasswordHasher.Hash(req.Password!),
        };
        user.Roles.Add(new UserRole { UserId = user.Id, Role = Roles.Student });
        db.Users.Add(user);
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("Duplicate entry", StringComparison.OrdinalIgnoreCase) == true)
        {
            // Lost a race with a concurrent registration for the same email (unique index).
            throw AppException.Conflict("An account with this email already exists.", "email_taken");
        }
        // Registration never depends on email delivery: when SMTP is not configured the account stays unverified and
        // staff can resend or mark it verified (GET /api/admin/users shows the state).
        await verification.TrySend(user);
        return await IssueTokens(user, Guid.NewGuid(), false);
    }

    public async Task<AuthResponse> Login(LoginRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrEmpty(req.Password)) throw Unauthorized(InvalidCredentials);
        var normalized = IdentityValidation.NormalizeEmail(req.Email);
        // Per-email fixed window (complements the per-IP "auth" policy); applies to unknown emails too.
        if (!emailLimiter.TryAcquire(normalized))
            throw new AppException(429, "Too many login attempts. Please try again later.", "rate_limited");
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.NormalizedEmail == normalized);
        var now = DateTime.UtcNow;
        if (user is null)
        {
            // Burn comparable CPU time to reduce user enumeration via timing.
            PasswordHasher.Verify(req.Password, DummyHash);
            secLog.Warn("login_failed_unknown_user", email: normalized);
            throw Unauthorized(InvalidCredentials);
        }
        // Inside the backoff window every attempt is rejected without verifying or counting, so an attacker
        // cannot extend the delay faster than it elapses and the delay never exceeds MaxBackoff.
        if (user.LockoutUntil is { } until && until > now)
        {
            secLog.Warn("login_rejected_backoff", user.Id, user.Email);
            throw Unauthorized(InvalidCredentials);
        }

        if (!PasswordHasher.Verify(req.Password, user.PasswordHash))
        {
            user.FailedLoginCount++;
            var delay = BackoffFor(user.FailedLoginCount);
            if (delay > TimeSpan.Zero)
            {
                user.LockoutUntil = now.Add(delay);
                if (user.FailedLoginCount == BackoffThreshold) audit.Record("user.login_backoff_started", "User", user.Id);
            }
            await db.SaveChangesAsync();
            secLog.Warn("login_failed_bad_password", user.Id, user.Email, $"failures={user.FailedLoginCount}");
            throw Unauthorized(InvalidCredentials);
        }
        if (user.IsSuspended) throw Unauthorized(InvalidCredentials);

        user.FailedLoginCount = 0;
        user.LockoutUntil = null;

        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == user.Id);
        if (sec?.MfaEnabledAt is not null)
        {
            var raw = Tokens.Random(32);
            db.Set<MfaChallenge>().Add(new MfaChallenge
            {
                UserId = user.Id, TokenHash = Tokens.Sha256(raw), ExpiresAt = now.Add(MfaChallengeLifetime),
            });
            await db.SaveChangesAsync();
            return new AuthResponse(null, null, null, UserDto.From(user, sec), LoginStatus.MfaRequired, raw);
        }
        // An administrator reset this user's MFA: they must enroll again before the account can be used.
        if ((SecurityOptions.RequireMfaForPrivileged(cfg) && SecurityClaims.IsPrivileged(user.Roles.Select(r => r.Role)))
            || await MfaResetService.ReenrollmentPending(db, user.Id))
        {
            await db.SaveChangesAsync();
            return new AuthResponse(jwt.IssueEnrollmentToken(user), null, now.Add(AccessTokenFactory.EnrollmentTokenLifetime),
                UserDto.From(user, sec), LoginStatus.MfaEnrollmentRequired);
        }
        return await IssueTokens(user, Guid.NewGuid(), false);
    }

    public async Task<AuthResponse> Refresh(RefreshRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.RefreshToken)) throw Unauthorized(InvalidRefresh, "invalid_refresh_token");
        var hash = Tokens.Sha256(req.RefreshToken);
        var token = await db.RefreshTokens.AsNoTracking().FirstOrDefaultAsync(t => t.TokenHash == hash)
                    ?? throw Unauthorized(InvalidRefresh, "invalid_refresh_token");
        var now = DateTime.UtcNow;

        // Atomically claim the token; if it was already revoked (or concurrently used) this is a reuse.
        var claimed = token.RevokedAt is null
            ? await db.RefreshTokens.Where(t => t.Id == token.Id && t.RevokedAt == null)
                .ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, now))
            : 0;
        if (claimed == 0 && await TryGraceRetry(token, now)) claimed = 1;
        if (claimed == 0)
        {
            await db.RefreshTokens.Where(t => t.FamilyId == token.FamilyId && t.RevokedAt == null)
                .ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, now));
            tokenValidator.Invalidate(token.UserId);
            audit.Record("auth.refresh_token_reuse", "User", token.UserId, new { familyId = token.FamilyId });
            secLog.Warn("refresh_token_reuse", token.UserId, detail: $"family={token.FamilyId}");
            await db.SaveChangesAsync();
            throw Unauthorized(InvalidRefresh, "invalid_refresh_token");
        }
        if (token.ExpiresAt <= now) throw Unauthorized(InvalidRefresh, "invalid_refresh_token");

        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == token.UserId);
        if (user is null || user.IsSuspended)
        {
            await RevokeAllForUser(token.UserId);
            throw Unauthorized(InvalidRefresh, "invalid_refresh_token");
        }
        var session = await db.Set<AuthSession>().FirstOrDefaultAsync(x => x.FamilyId == token.FamilyId);
        if (session is not null) { session.LastUsedAt = now; session.LastIpAddress = Ip(); }
        // A privileged user may not keep refreshing a session that was not MFA-authenticated once MFA is required.
        // auth_time stays the original sign-in time of the session, so refreshing never makes an MFA sign-in look "fresh".
        return await IssueTokens(user, token.FamilyId, session?.MfaAuthenticated ?? false, token.Id, session?.CreatedAt);
    }

    /// <summary>
    /// Benign retry: a refresh whose response never reached the browser (reload/network cut) re-presents the token it just
    /// rotated. Within a short grace window, and only if the successor was never used, the unused successor is revoked and
    /// rotation continues from the presented token. Any other reuse (successor already used, outside the window) is treated
    /// as theft and the whole family is revoked by the caller.
    /// </summary>
    private async Task<bool> TryGraceRetry(RefreshToken token, DateTime now)
    {
        var graceSeconds = cfg.GetValue("Auth:RefreshReuseGraceSeconds", 20);
        if (graceSeconds <= 0 || token.RevokedAt is null || token.ReplacedById is null) return false;
        if (now - token.RevokedAt.Value > TimeSpan.FromSeconds(graceSeconds)) return false;
        // Atomically retire the unused successor; fails if it was already used (rotated or revoked).
        var retired = await db.RefreshTokens
            .Where(t => t.Id == token.ReplacedById && t.RevokedAt == null && t.ReplacedById == null)
            .ExecuteUpdateAsync(x => x.SetProperty(t => t.RevokedAt, now));
        if (retired == 0) return false;
        audit.Record("auth.refresh_grace_retry", "User", token.UserId, new { familyId = token.FamilyId });
        return true;
    }

    public async Task Logout(RefreshRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.RefreshToken)) return;
        var hash = Tokens.Sha256(req.RefreshToken);
        var token = await db.RefreshTokens.AsNoTracking().FirstOrDefaultAsync(t => t.TokenHash == hash);
        if (token is null) return;
        // Logging out ends the whole session (all rotated descendants of this login).
        await db.RefreshTokens.Where(t => t.FamilyId == token.FamilyId && t.RevokedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, DateTime.UtcNow));
        tokenValidator.Invalidate(token.UserId);
    }

    public async Task<UserDto> Me(Guid userId, System.Security.Claims.ClaimsPrincipal? principal = null)
    {
        var user = await db.Users.AsNoTracking().Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == userId)
                   ?? throw AppException.NotFound("User");
        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId);
        var dto = UserDto.From(user, sec);
        return principal is null ? dto : dto with { RequiresReauth = RequiresReauth(principal, dto.Roles) };
    }

    /// <summary>
    /// True when the caller's token no longer matches the account: its roles differ from the stored roles (e.g. a role was
    /// granted after sign-in) or the account holds a privileged role while the token lacks amr=mfa. The UI then prompts the
    /// user to sign in again.
    /// </summary>
    public static bool RequiresReauth(System.Security.Claims.ClaimsPrincipal principal, IReadOnlyCollection<string> dbRoles)
    {
        var tokenRoles = principal.FindAll(System.Security.Claims.ClaimTypes.Role).Select(c => c.Value).ToHashSet(StringComparer.Ordinal);
        if (!tokenRoles.SetEquals(dbRoles)) return true;
        return SecurityClaims.IsPrivileged(dbRoles) && principal.FindFirst(SecurityClaims.Amr)?.Value != SecurityClaims.AmrMfa;
    }

    public async Task RevokeAllForUser(Guid userId)
    {
        await db.RefreshTokens.Where(t => t.UserId == userId && t.RevokedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, DateTime.UtcNow));
        tokenValidator.Invalidate(userId);
    }

    public static readonly TimeSpan MfaChallengeLifetime = TimeSpan.FromMinutes(5);

    /// <summary>Starts a new session (refresh-token family) for an authenticated user.</summary>
    public Task<AuthResponse> StartSession(User user, bool mfa) => IssueTokens(user, Guid.NewGuid(), mfa);

    private string Ip() => Trunc(http.HttpContext?.Connection.RemoteIpAddress?.ToString() ?? "", 64);
    private static string Trunc(string s, int n) => s.Length > n ? s[..n] : s;

    private async Task<AuthResponse> IssueTokens(User user, Guid familyId, bool mfa, Guid? replacing = null, DateTime? authTime = null)
    {
        if (replacing is null)
        {
            db.Set<AuthSession>().Add(new AuthSession
            {
                FamilyId = familyId, UserId = user.Id, MfaAuthenticated = mfa,
                UserAgent = Trunc(http.HttpContext?.Request.Headers.UserAgent.ToString() ?? "", 512), IpAddress = Ip(), LastIpAddress = Ip(),
            });
        }
        var raw = Tokens.Random(48);
        var rt = new RefreshToken
        {
            UserId = user.Id, TokenHash = Tokens.Sha256(raw), FamilyId = familyId,
            ExpiresAt = DateTime.UtcNow.AddDays(opt.RefreshTokenDays),
        };
        db.RefreshTokens.Add(rt);
        await db.SaveChangesAsync();
        if (replacing is { } oldId)
            await db.RefreshTokens.Where(t => t.Id == oldId).ExecuteUpdateAsync(s => s.SetProperty(t => t.ReplacedById, rt.Id));
        var access = jwt.Issue(user, familyId, mfa, authTime ?? DateTime.UtcNow);
        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == user.Id);
        return new AuthResponse(access, raw, DateTime.UtcNow.AddMinutes(opt.AccessTokenMinutes), UserDto.From(user, sec));
    }

    private static readonly string DummyHash = PasswordHasher.Hash(Tokens.Random(16));
}
