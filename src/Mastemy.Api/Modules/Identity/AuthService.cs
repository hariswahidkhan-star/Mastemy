using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Identity;

public class AuthService(AppDbContext db, JwtIssuer jwt, JwtOptions opt, AuditService audit)
{
    public const int MaxFailedLogins = 5;
    public static readonly TimeSpan LockoutDuration = TimeSpan.FromMinutes(15);
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
        return await IssueTokens(user, Guid.NewGuid());
    }

    public async Task<AuthResponse> Login(LoginRequest req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrEmpty(req.Password)) throw Unauthorized(InvalidCredentials);
        var normalized = IdentityValidation.NormalizeEmail(req.Email);
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.NormalizedEmail == normalized);
        var now = DateTime.UtcNow;
        if (user is null)
        {
            // Burn comparable CPU time to reduce user enumeration via timing.
            PasswordHasher.Verify(req.Password, DummyHash);
            throw Unauthorized(InvalidCredentials);
        }
        if (user.LockoutUntil is { } until && until > now)
            throw Unauthorized(InvalidCredentials);

        if (!PasswordHasher.Verify(req.Password, user.PasswordHash))
        {
            user.FailedLoginCount++;
            if (user.FailedLoginCount >= MaxFailedLogins)
            {
                user.LockoutUntil = now.Add(LockoutDuration);
                user.FailedLoginCount = 0;
                audit.Record("user.locked_out", "User", user.Id);
            }
            await db.SaveChangesAsync();
            throw Unauthorized(InvalidCredentials);
        }
        if (user.IsSuspended) throw Unauthorized(InvalidCredentials);

        user.FailedLoginCount = 0;
        user.LockoutUntil = null;
        return await IssueTokens(user, Guid.NewGuid());
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
        if (claimed == 0)
        {
            await db.RefreshTokens.Where(t => t.FamilyId == token.FamilyId && t.RevokedAt == null)
                .ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, now));
            audit.Record("auth.refresh_token_reuse", "User", token.UserId, new { familyId = token.FamilyId });
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
        var res = await IssueTokens(user, token.FamilyId, token.Id);
        return res;
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
    }

    public async Task<UserDto> Me(Guid userId)
    {
        var user = await db.Users.AsNoTracking().Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == userId)
                   ?? throw AppException.NotFound("User");
        return UserDto.From(user);
    }

    public Task RevokeAllForUser(Guid userId) =>
        db.RefreshTokens.Where(t => t.UserId == userId && t.RevokedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, DateTime.UtcNow));

    private async Task<AuthResponse> IssueTokens(User user, Guid familyId, Guid? replacing = null)
    {
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
        var access = jwt.Issue(user);
        return new AuthResponse(access, raw, DateTime.UtcNow.AddMinutes(opt.AccessTokenMinutes), UserDto.From(user));
    }

    private static readonly string DummyHash = PasswordHasher.Hash(Tokens.Random(16));
}
