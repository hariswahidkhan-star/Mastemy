using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Mastemy.Api.Infrastructure;

/// <summary>Thrown for business-rule violations; mapped to RFC 7807 responses.</summary>
public class AppException(int status, string message, string? code = null) : Exception(message)
{
    public int Status { get; } = status;
    public string? Code { get; } = code;
    public static AppException NotFound(string what = "Resource") => new(404, $"{what} not found.", "not_found");
    public static AppException Forbidden(string msg = "You do not have permission for this action.") => new(403, msg, "forbidden");
    public static AppException Bad(string msg, string? code = null) => new(400, msg, code ?? "bad_request");
    public static AppException Conflict(string msg, string? code = null) => new(409, msg, code ?? "conflict");
}

public static class PasswordHasher
{
    private const int Iterations = 210_000; // PBKDF2-SHA512 (OWASP guidance)
    public static string Hash(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(16);
        var key = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, HashAlgorithmName.SHA512, 32);
        return $"pbkdf2-sha512${Iterations}${Convert.ToBase64String(salt)}${Convert.ToBase64String(key)}";
    }
    public static bool Verify(string password, string stored)
    {
        var parts = stored.Split('$');
        if (parts.Length != 4 || parts[0] != "pbkdf2-sha512") return false;
        var iter = int.Parse(parts[1]);
        var salt = Convert.FromBase64String(parts[2]);
        var expected = Convert.FromBase64String(parts[3]);
        var actual = Rfc2898DeriveBytes.Pbkdf2(password, salt, iter, HashAlgorithmName.SHA512, expected.Length);
        return CryptographicOperations.FixedTimeEquals(actual, expected);
    }
}

public static class Tokens
{
    public static string Random(int bytes = 32) => Base64UrlEncoder.Encode(RandomNumberGenerator.GetBytes(bytes));
    public static string Sha256(string value) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(value)));
}

public class JwtOptions
{
    public string Issuer { get; set; } = "mastemy";
    public string Audience { get; set; } = "mastemy";
    public string Key { get; set; } = "";
    public int AccessTokenMinutes { get; set; } = 15;
    public int RefreshTokenDays { get; set; } = 14;
}

public class JwtIssuer(JwtOptions opt)
{
    public string Issue(User user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new("name", user.DisplayName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
        claims.AddRange(user.Roles.Select(r => new Claim(ClaimTypes.Role, r.Role)));
        var creds = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(opt.Key)), SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(opt.Issuer, opt.Audience, claims, expires: DateTime.UtcNow.AddMinutes(opt.AccessTokenMinutes), signingCredentials: creds);
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public interface ICurrentUser
{
    Guid? Id { get; }
    Guid RequireId();
    bool IsInRole(string role);
    bool IsStaff { get; } // Admin or SuperAdmin
    bool CanReview { get; } // Reviewer, Admin, SuperAdmin
}

public class CurrentUser(IHttpContextAccessor http) : ICurrentUser
{
    private ClaimsPrincipal? P => http.HttpContext?.User;
    public Guid? Id => Guid.TryParse(P?.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? P?.FindFirstValue(ClaimTypes.NameIdentifier), out var g) ? g : null;
    public Guid RequireId() => Id ?? throw new AppException(401, "Authentication required.", "unauthenticated");
    public bool IsInRole(string role) => P?.IsInRole(role) ?? false;
    public bool IsStaff => IsInRole(Roles.Admin) || IsInRole(Roles.SuperAdmin);
    public bool CanReview => IsStaff || IsInRole(Roles.Reviewer);
}

public class AuditService(AppDbContext db, ICurrentUser me)
{
    public void Record(string action, string entityType, object entityId, object? details = null)
    {
        db.AuditLogs.Add(new AuditLog
        {
            ActorId = me.Id, Action = action, EntityType = entityType, EntityId = entityId.ToString() ?? "",
            Details = details is null ? null : System.Text.Json.JsonSerializer.Serialize(details),
        });
    }
}

/// <summary>Admin-controlled feature switches (spec 10.6). Defaults: closed public onboarding, invite-only, no owned channels, no API uploads.</summary>
public static class FeatureFlags
{
    public const string ExternalInstructorRegistrationEnabled = nameof(ExternalInstructorRegistrationEnabled);
    public const string InstructorApplicationsInviteOnly = nameof(InstructorApplicationsInviteOnly);
    public const string InstructorOwnedChannelsEnabled = nameof(InstructorOwnedChannelsEnabled);
    public const string YouTubeApiUploadsEnabled = nameof(YouTubeApiUploadsEnabled);
    public const string NewInstructorApplicationsPaused = nameof(NewInstructorApplicationsPaused);

    public static readonly Dictionary<string, bool> Defaults = new()
    {
        [ExternalInstructorRegistrationEnabled] = false,
        [InstructorApplicationsInviteOnly] = true,
        [InstructorOwnedChannelsEnabled] = false,
        [YouTubeApiUploadsEnabled] = false,
        [NewInstructorApplicationsPaused] = false,
    };
}

public class FeatureFlagService(AppDbContext db, AuditService audit, ICurrentUser me)
{
    public async Task<bool> IsEnabled(string key)
    {
        var s = await db.PlatformSettings.AsNoTracking().FirstOrDefaultAsync(x => x.Key == key);
        return s is null ? FeatureFlags.Defaults.GetValueOrDefault(key) : s.Value == "true";
    }

    public async Task<Dictionary<string, bool>> All()
    {
        var stored = await db.PlatformSettings.AsNoTracking().ToDictionaryAsync(x => x.Key, x => x.Value);
        return FeatureFlags.Defaults.ToDictionary(kv => kv.Key, kv => stored.TryGetValue(kv.Key, out var v) ? v == "true" : kv.Value);
    }

    public async Task Set(string key, bool value)
    {
        if (!FeatureFlags.Defaults.ContainsKey(key)) throw AppException.Bad($"Unknown setting '{key}'.");
        var s = await db.PlatformSettings.FindAsync(key);
        var old = s?.Value ?? (FeatureFlags.Defaults[key] ? "true" : "false");
        if (s is null) { s = new PlatformSetting { Key = key }; db.PlatformSettings.Add(s); }
        s.Value = value ? "true" : "false"; s.UpdatedAt = DateTime.UtcNow; s.UpdatedBy = me.Id;
        audit.Record("setting.changed", "PlatformSetting", key, new { old, @new = s.Value });
        await db.SaveChangesAsync();
    }
}

/// <summary>Encrypts OAuth refresh tokens at rest using ASP.NET Data Protection.</summary>
public class SecretProtector(IDataProtectionProvider dp)
{
    private readonly IDataProtector _p = dp.CreateProtector("Mastemy.YouTube.OAuth.v1");
    public string Protect(string plain) => _p.Protect(plain);
    public string Unprotect(string cipher) => _p.Unprotect(cipher);
}
