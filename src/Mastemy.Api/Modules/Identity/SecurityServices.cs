using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Engagement;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.Identity;

internal static class SecurityRows
{
    public static async Task<UserSecurity> GetOrCreate(AppDbContext db, Guid userId)
    {
        var sec = await db.Set<UserSecurity>().FirstOrDefaultAsync(s => s.UserId == userId);
        if (sec is null) { sec = new UserSecurity { UserId = userId }; db.Set<UserSecurity>().Add(sec); }
        return sec;
    }

    public static string Link(EmailOptions o, string path, string token)
    {
        var rel = $"{path}?token={Uri.EscapeDataString(token)}";
        return string.IsNullOrWhiteSpace(o.PublicBaseUrl) ? rel : o.PublicBaseUrl.TrimEnd('/') + rel;
    }

    public static AppException EmailNotConfigured() =>
        new(503, "Email delivery is not configured on this server.", "email_not_configured");
}

/// <summary>Email ownership verification. Tokens are random, stored hashed, single-use and expire after 48 hours.</summary>
public class EmailVerificationService(AppDbContext db, EmailOutbox outbox, IOptions<EmailOptions> emailOpt, AuditService audit, ICurrentUser me)
{
    public static readonly TimeSpan Lifetime = TimeSpan.FromHours(48);
    public static readonly TimeSpan ResendCooldown = TimeSpan.FromSeconds(60);

    public static bool IsVerified(User u, UserSecurity? sec) =>
        sec?.EmailVerifiedAt is not null && sec.VerifiedEmail == u.NormalizedEmail;

    /// <summary>Queues a verification email when SMTP is configured. Returns false (and sends nothing) otherwise.</summary>
    public async Task<bool> TrySend(User user)
    {
        if (!outbox.Enabled) return false;
        var raw = Tokens.Random(32);
        db.Set<OneTimeToken>().Add(new OneTimeToken
        {
            UserId = user.Id, Purpose = OneTimeTokenPurpose.EmailVerification, TokenHash = Tokens.Sha256(raw),
            Email = user.NormalizedEmail, ExpiresAt = DateTime.UtcNow.Add(Lifetime),
        });
        var link = SecurityRows.Link(emailOpt.Value, "/verify-email", raw);
        outbox.Enqueue(user.Email, "Confirm your Mastemy email address",
            $"Hello {user.DisplayName},\n\nConfirm your email address by opening this link (valid for 48 hours):\n{link}\n\n" +
            "If you did not create a Mastemy account you can ignore this message.");
        await db.SaveChangesAsync();
        return true;
    }

    public async Task Resend(Guid userId, bool byStaff)
    {
        if (!outbox.Enabled) throw SecurityRows.EmailNotConfigured();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == userId) ?? throw AppException.NotFound("User");
        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId);
        if (IsVerified(user, sec)) throw AppException.Conflict("The email address is already verified.", "email_already_verified");
        var since = DateTime.UtcNow - ResendCooldown;
        if (!byStaff && await db.Set<OneTimeToken>().AnyAsync(t => t.UserId == userId
                && t.Purpose == OneTimeTokenPurpose.EmailVerification && t.CreatedAt > since))
            throw new AppException(429, "A verification email was sent recently. Please wait a minute.", "rate_limited");
        if (byStaff) audit.Record("user.email_verification_resent", "User", userId);
        await TrySend(user);
    }

    public async Task Verify(string? token)
    {
        if (string.IsNullOrWhiteSpace(token)) throw AppException.Bad("Invalid or expired verification link.", "invalid_token");
        var hash = Tokens.Sha256(token.Trim());
        var now = DateTime.UtcNow;
        var t = await db.Set<OneTimeToken>().AsNoTracking().FirstOrDefaultAsync(x => x.TokenHash == hash
                    && x.Purpose == OneTimeTokenPurpose.EmailVerification)
                ?? throw AppException.Bad("Invalid or expired verification link.", "invalid_token");
        if (t.UsedAt is not null || t.ExpiresAt <= now) throw AppException.Bad("Invalid or expired verification link.", "invalid_token");
        var claimed = await db.Set<OneTimeToken>().Where(x => x.Id == t.Id && x.UsedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.UsedAt, now));
        if (claimed == 0) throw AppException.Bad("Invalid or expired verification link.", "invalid_token");
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == t.UserId) ?? throw AppException.Bad("Invalid or expired verification link.", "invalid_token");
        // The address may have changed since the link was sent; only the address the link was sent to is verified.
        if (user.NormalizedEmail != t.Email) throw AppException.Bad("Invalid or expired verification link.", "invalid_token");
        var sec = await SecurityRows.GetOrCreate(db, user.Id);
        sec.EmailVerifiedAt = now; sec.VerifiedEmail = user.NormalizedEmail;
        await db.SaveChangesAsync();
    }

    public async Task MarkVerified(Guid userId)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == userId) ?? throw AppException.NotFound("User");
        var sec = await SecurityRows.GetOrCreate(db, userId);
        if (IsVerified(user, sec)) return;
        sec.EmailVerifiedAt = DateTime.UtcNow; sec.VerifiedEmail = user.NormalizedEmail;
        audit.Record("user.email_marked_verified", "User", userId, new { by = me.Id, email = user.NormalizedEmail });
        await db.SaveChangesAsync();
    }
}

/// <summary>Password reset (single-use hashed token, 1h expiry, uniform response) and password change.</summary>
public class PasswordService(AppDbContext db, EmailOutbox outbox, IOptions<EmailOptions> emailOpt, AuditService audit, AuthService auth, ICurrentUser me)
{
    public static readonly TimeSpan ResetLifetime = TimeSpan.FromHours(1);
    public const string UniformMessage = "If an account exists for that email address, a password reset link has been sent.";

    public async Task<MessageDto> Forgot(ForgotPasswordRequest req)
    {
        // Without SMTP no reset can ever be delivered: say so (uniformly, regardless of the address) rather than fake success.
        if (!outbox.Enabled) throw SecurityRows.EmailNotConfigured();
        if (string.IsNullOrWhiteSpace(req.Email) || req.Email.Length > 254) return new(UniformMessage);
        var normalized = IdentityValidation.NormalizeEmail(req.Email);
        var user = await db.Users.FirstOrDefaultAsync(u => u.NormalizedEmail == normalized);
        if (user is null || user.IsSuspended) return new(UniformMessage);
        var now = DateTime.UtcNow;
        // Only the newest link works.
        await db.Set<OneTimeToken>().Where(t => t.UserId == user.Id && t.Purpose == OneTimeTokenPurpose.PasswordReset && t.UsedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(t => t.UsedAt, now));
        var raw = Tokens.Random(32);
        db.Set<OneTimeToken>().Add(new OneTimeToken
        {
            UserId = user.Id, Purpose = OneTimeTokenPurpose.PasswordReset, TokenHash = Tokens.Sha256(raw),
            Email = user.NormalizedEmail, ExpiresAt = now.Add(ResetLifetime),
        });
        var link = SecurityRows.Link(emailOpt.Value, "/reset-password", raw);
        outbox.Enqueue(user.Email, "Reset your Mastemy password",
            $"A password reset was requested for your Mastemy account.\n\nReset it within one hour using this link:\n{link}\n\n" +
            "If you did not request this, you can ignore this message; your password is unchanged.");
        await db.SaveChangesAsync();
        return new(UniformMessage);
    }

    public async Task Reset(ResetPasswordRequest req)
    {
        static AppException Invalid() => AppException.Bad("Invalid or expired reset link.", "invalid_token");
        if (string.IsNullOrWhiteSpace(req.Token)) throw Invalid();
        IdentityValidation.RequirePassword(req.NewPassword);
        var hash = Tokens.Sha256(req.Token.Trim());
        var now = DateTime.UtcNow;
        var t = await db.Set<OneTimeToken>().AsNoTracking()
            .FirstOrDefaultAsync(x => x.TokenHash == hash && x.Purpose == OneTimeTokenPurpose.PasswordReset) ?? throw Invalid();
        if (t.UsedAt is not null || t.ExpiresAt <= now) throw Invalid();
        var claimed = await db.Set<OneTimeToken>().Where(x => x.Id == t.Id && x.UsedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.UsedAt, now));
        if (claimed == 0) throw Invalid();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == t.UserId) ?? throw Invalid();
        if (user.IsSuspended || user.NormalizedEmail != t.Email) throw Invalid();
        user.PasswordHash = PasswordHasher.Hash(req.NewPassword!);
        user.FailedLoginCount = 0; user.LockoutUntil = null;
        var sec = await SecurityRows.GetOrCreate(db, user.Id);
        sec.PasswordChangedAt = now;
        // Receiving the link proves control of the mailbox.
        if (sec.EmailVerifiedAt is null || sec.VerifiedEmail != user.NormalizedEmail) { sec.EmailVerifiedAt = now; sec.VerifiedEmail = user.NormalizedEmail; }
        audit.Record("user.password_reset", "User", user.Id);
        await db.SaveChangesAsync();
        await auth.RevokeAllForUser(user.Id);
    }

    public async Task Change(ChangePasswordRequest req)
    {
        var uid = me.RequireId();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("User");
        if (string.IsNullOrEmpty(req.CurrentPassword) || !PasswordHasher.Verify(req.CurrentPassword, user.PasswordHash))
            throw AppException.Bad("The current password is incorrect.", "invalid_current_password");
        IdentityValidation.RequirePassword(req.NewPassword);
        if (req.NewPassword == req.CurrentPassword) throw AppException.Bad("The new password must differ from the current one.", "password_unchanged");
        user.PasswordHash = PasswordHasher.Hash(req.NewPassword!);
        var sec = await SecurityRows.GetOrCreate(db, user.Id);
        sec.PasswordChangedAt = DateTime.UtcNow;
        audit.Record("user.password_changed", "User", user.Id);
        await db.SaveChangesAsync();
        await auth.RevokeAllForUser(user.Id);
    }
}

/// <summary>TOTP MFA enrollment, verification, recovery codes.</summary>
public class MfaService(AppDbContext db, SecretProtector protector, AuditService audit, ICurrentUser me, AuthService auth, IConfiguration cfg)
{
    public const int RecoveryCodeCount = 10;
    public const int MaxChallengeAttempts = 5;
    public static readonly TimeSpan PendingLifetime = TimeSpan.FromMinutes(15);
    private const string Issuer = "Mastemy";

    private static AppException InvalidCode() => new(401, "Invalid verification code.", "invalid_mfa_code");
    private static AppException InvalidChallenge() => new(401, "The sign-in challenge is invalid or has expired. Sign in again.", "invalid_mfa_challenge");

    public async Task<MfaStatusDto> Status()
    {
        var uid = me.RequireId();
        var user = await db.Users.AsNoTracking().Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("User");
        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == uid);
        var remaining = await db.Set<MfaRecoveryCode>().CountAsync(c => c.UserId == uid && c.UsedAt == null);
        return new(sec?.MfaEnabledAt is not null, sec?.MfaEnabledAt, sec?.MfaEnabledAt is null ? 0 : remaining, IsRequired(user));
    }

    private bool IsRequired(User user) =>
        SecurityOptions.RequireMfaForPrivileged(cfg) && SecurityClaims.IsPrivileged(user.Roles.Select(r => r.Role));

    public async Task<MfaEnrollmentDto> BeginEnrollment()
    {
        var uid = me.RequireId();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("User");
        var sec = await SecurityRows.GetOrCreate(db, uid);
        if (sec.MfaEnabledAt is not null) throw AppException.Conflict("MFA is already enabled.", "mfa_already_enabled");
        var secret = Totp.ToBase32(Totp.NewSecret());
        sec.MfaPendingSecretProtected = protector.Protect(secret);
        sec.MfaPendingCreatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        var label = Uri.EscapeDataString($"{Issuer}:{user.Email}");
        var uri = $"otpauth://totp/{label}?secret={secret}&issuer={Issuer}&algorithm=SHA1&digits={Totp.Digits}&period={Totp.StepSeconds}";
        return new(secret, uri, Totp.Digits, Totp.StepSeconds, "SHA1");
    }

    public async Task<MfaEnrolledDto> ConfirmEnrollment(MfaCodeRequest req)
    {
        var uid = me.RequireId();
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("User");
        if (user.IsSuspended) throw AppException.Forbidden();
        var sec = await SecurityRows.GetOrCreate(db, uid);
        if (sec.MfaEnabledAt is not null) throw AppException.Conflict("MFA is already enabled.", "mfa_already_enabled");
        if (sec.MfaPendingSecretProtected is null || sec.MfaPendingCreatedAt is not { } started || started.Add(PendingLifetime) <= DateTime.UtcNow)
            throw AppException.Bad("No MFA enrollment in progress. Start enrollment again.", "mfa_enrollment_not_started");
        var secret = protector.Unprotect(sec.MfaPendingSecretProtected);
        var step = Totp.Match(Totp.FromBase32(secret), req.Code, DateTimeOffset.UtcNow) ?? throw AppException.Bad("Invalid verification code.", "invalid_mfa_code");
        sec.MfaSecretProtected = sec.MfaPendingSecretProtected;
        sec.MfaPendingSecretProtected = null; sec.MfaPendingCreatedAt = null;
        sec.MfaEnabledAt = DateTime.UtcNow;
        sec.MfaLastUsedStep = step;
        var codes = ReplaceRecoveryCodes(uid);
        audit.Record("user.mfa_enabled", "User", uid);
        await db.SaveChangesAsync();
        // Sessions created before MFA were password-only; end them and start a fresh MFA-authenticated one.
        await auth.RevokeAllForUser(uid);
        var session = await auth.StartSession(user, mfa: true);
        return new(codes, session);
    }

    public async Task<RecoveryCodesDto> RegenerateRecoveryCodes(MfaCodeRequest req)
    {
        var uid = me.RequireId();
        if (!await VerifyTotp(uid, req.Code)) throw InvalidCode();
        var codes = ReplaceRecoveryCodes(uid);
        audit.Record("user.mfa_recovery_codes_regenerated", "User", uid);
        await db.SaveChangesAsync();
        return new(codes);
    }

    public async Task Disable(MfaDisableRequest req)
    {
        var uid = me.RequireId();
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("User");
        if (IsRequired(user)) throw AppException.Conflict("MFA is required for your role and cannot be disabled.", "mfa_required_for_role");
        if (string.IsNullOrEmpty(req.Password) || !PasswordHasher.Verify(req.Password, user.PasswordHash))
            throw AppException.Bad("The current password is incorrect.", "invalid_current_password");
        var sec = await db.Set<UserSecurity>().FirstOrDefaultAsync(s => s.UserId == uid);
        if (sec?.MfaEnabledAt is null) throw AppException.Conflict("MFA is not enabled.", "mfa_not_enabled");
        if (!await VerifyTotp(uid, req.Code)) throw InvalidCode();
        sec.MfaSecretProtected = null; sec.MfaEnabledAt = null; sec.MfaLastUsedStep = null;
        await db.Set<MfaRecoveryCode>().Where(c => c.UserId == uid).ExecuteDeleteAsync();
        audit.Record("user.mfa_disabled", "User", uid);
        await db.SaveChangesAsync();
    }

    /// <summary>Completes a password login that returned mfa_required.</summary>
    public async Task<AuthResponse> VerifyChallenge(MfaVerifyRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.MfaToken)) throw InvalidChallenge();
        var hash = Tokens.Sha256(req.MfaToken.Trim());
        var now = DateTime.UtcNow;
        var ch = await db.Set<MfaChallenge>().AsNoTracking().FirstOrDefaultAsync(c => c.TokenHash == hash) ?? throw InvalidChallenge();
        if (ch.UsedAt is not null || ch.ExpiresAt <= now || ch.FailedAttempts >= MaxChallengeAttempts) throw InvalidChallenge();
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == ch.UserId) ?? throw InvalidChallenge();
        if (user.IsSuspended) throw InvalidChallenge();

        bool ok; var usedRecovery = false;
        if (!string.IsNullOrWhiteSpace(req.RecoveryCode)) { ok = await UseRecoveryCode(user.Id, req.RecoveryCode); usedRecovery = ok; }
        else ok = await VerifyTotp(user.Id, req.Code);
        if (!ok)
        {
            await db.Set<MfaChallenge>().Where(c => c.Id == ch.Id)
                .ExecuteUpdateAsync(s => s.SetProperty(c => c.FailedAttempts, c => c.FailedAttempts + 1));
            throw InvalidCode();
        }
        var claimed = await db.Set<MfaChallenge>().Where(c => c.Id == ch.Id && c.UsedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.UsedAt, now));
        if (claimed == 0) throw InvalidChallenge();
        if (usedRecovery)
        {
            audit.Record("user.mfa_recovery_code_used", "User", user.Id);
            await db.SaveChangesAsync();
        }
        return await auth.StartSession(user, mfa: true);
    }

    /// <summary>Checks a TOTP code (±1 step) and consumes its time step: a code (or an older one) is never accepted twice.</summary>
    public async Task<bool> VerifyTotp(Guid userId, string? code)
    {
        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId);
        if (sec?.MfaEnabledAt is null || sec.MfaSecretProtected is null) return false;
        var secret = Totp.FromBase32(protector.Unprotect(sec.MfaSecretProtected));
        if (Totp.Match(secret, code, DateTimeOffset.UtcNow) is not { } step) return false;
        var n = await db.Set<UserSecurity>()
            .Where(x => x.UserId == userId && (x.MfaLastUsedStep == null || x.MfaLastUsedStep < step))
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.MfaLastUsedStep, step));
        return n == 1;
    }

    public async Task<bool> UseRecoveryCode(Guid userId, string? code)
    {
        var norm = NormalizeRecoveryCode(code);
        if (norm is null) return false;
        var hash = Tokens.Sha256(norm);
        var n = await db.Set<MfaRecoveryCode>().Where(c => c.UserId == userId && c.CodeHash == hash && c.UsedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(c => c.UsedAt, DateTime.UtcNow));
        return n == 1;
    }

    public async Task<bool> IsEnabled(Guid userId) =>
        await db.Set<UserSecurity>().AnyAsync(s => s.UserId == userId && s.MfaEnabledAt != null);

    private static string? NormalizeRecoveryCode(string? code)
    {
        var c = (code ?? "").Replace("-", "").Replace(" ", "").Trim().ToUpperInvariant();
        return c.Length == 10 ? c : null;
    }

    /// <summary>Stages deletion of old codes and 10 new hashed codes (caller saves). Returns the plaintext codes, shown once.</summary>
    private string[] ReplaceRecoveryCodes(Guid userId)
    {
        db.Set<MfaRecoveryCode>().RemoveRange(db.Set<MfaRecoveryCode>().Where(c => c.UserId == userId));
        var codes = new string[RecoveryCodeCount];
        for (var i = 0; i < codes.Length; i++)
        {
            var raw = Totp.ToBase32(System.Security.Cryptography.RandomNumberGenerator.GetBytes(7))[..10];
            codes[i] = raw[..5] + "-" + raw[5..];
            db.Set<MfaRecoveryCode>().Add(new MfaRecoveryCode { UserId = userId, CodeHash = Tokens.Sha256(raw) });
        }
        return codes;
    }
}

/// <summary>Active sessions (refresh-token families) of the current user.</summary>
public class SessionService(AppDbContext db, ICurrentUser me, AuditService audit, IHttpContextAccessor http, TokenSessionValidator tokens)
{
    private Guid? CurrentSid =>
        Guid.TryParse(http.HttpContext?.User.FindFirst(SecurityClaims.SessionId)?.Value, out var g) ? g : null;

    public async Task<List<SessionDto>> List()
    {
        var uid = me.RequireId();
        var now = DateTime.UtcNow;
        var families = await db.RefreshTokens.AsNoTracking()
            .Where(t => t.UserId == uid && t.RevokedAt == null && t.ExpiresAt > now)
            .GroupBy(t => t.FamilyId)
            .Select(g => new { FamilyId = g.Key, Created = g.Min(t => t.CreatedAt), Expires = g.Max(t => t.ExpiresAt) })
            .ToListAsync();
        var ids = families.Select(f => f.FamilyId).ToList();
        var info = await db.Set<AuthSession>().AsNoTracking().Where(s => ids.Contains(s.FamilyId)).ToDictionaryAsync(s => s.FamilyId);
        var sid = CurrentSid;
        return families.Select(f =>
        {
            info.TryGetValue(f.FamilyId, out var s);
            return new SessionDto(f.FamilyId, s?.CreatedAt ?? f.Created, s?.LastUsedAt ?? f.Created, f.Expires, s?.UserAgent ?? "",
                s?.IpAddress ?? "", s?.LastIpAddress ?? "", s?.MfaAuthenticated ?? false, f.FamilyId == sid);
        }).OrderByDescending(s => s.LastUsedAt).ToList();
    }

    public async Task Revoke(Guid familyId)
    {
        var uid = me.RequireId();
        var n = await db.RefreshTokens.Where(t => t.UserId == uid && t.FamilyId == familyId && t.RevokedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, DateTime.UtcNow));
        tokens.Invalidate(uid);
        if (n == 0) throw AppException.NotFound("Session");
        audit.Record("user.session_revoked", "User", uid, new { sessionId = familyId });
        await db.SaveChangesAsync();
    }

    public async Task<int> RevokeAll()
    {
        var uid = me.RequireId();
        var n = await db.RefreshTokens.Where(t => t.UserId == uid && t.RevokedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, DateTime.UtcNow));
        tokens.Invalidate(uid);
        audit.Record("user.sessions_revoked_all", "User", uid, new { tokens = n });
        await db.SaveChangesAsync();
        return n;
    }
}
