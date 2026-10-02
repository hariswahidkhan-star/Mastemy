using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;

namespace Mastemy.Api.Modules.Identity;

public static class SecurityClaims
{
    /// <summary>Authentication methods reference (RFC 8176): "pwd" or "mfa".</summary>
    public const string Amr = "amr";
    public const string AmrPassword = "pwd";
    public const string AmrMfa = "mfa";
    /// <summary>Refresh-token family (session) id the access token belongs to.</summary>
    public const string SessionId = "sid";
    /// <summary>OIDC auth_time: unix seconds of the sign-in that started this session (kept across refreshes).</summary>
    public const string AuthTime = "auth_time";
    /// <summary>Marks a restricted token; only value: <see cref="MfaEnrollmentUse"/>.</summary>
    public const string TokenUse = "token_use";
    public const string MfaEnrollmentUse = "mfa_enrollment";

    /// <summary>Roles that must use MFA (and a verified email) — spec §21 "MFA for privileged users".</summary>
    public static readonly string[] PrivilegedRoles = [Roles.Admin, Roles.SuperAdmin, Roles.Finance, Roles.Reviewer, Roles.Moderator, Roles.Support];

    public static bool IsPrivileged(IEnumerable<string> roles) => roles.Any(r => PrivilegedRoles.Contains(r));
}

public class SecurityOptions
{
    /// <summary>Config key Security:RequireMfaForPrivileged (default true).</summary>
    public static bool RequireMfaForPrivileged(IConfiguration cfg) => cfg.GetValue("Security:RequireMfaForPrivileged", true);
}

/// <summary>Issues access tokens with amr/sid claims (and the restricted MFA-enrollment token).</summary>
public class AccessTokenFactory(JwtOptions opt)
{
    public static readonly TimeSpan EnrollmentTokenLifetime = TimeSpan.FromMinutes(10);

    public string Issue(User user, Guid sessionId, bool mfa, DateTime? authTimeUtc = null)
    {
        var authTime = new DateTimeOffset(DateTime.SpecifyKind(authTimeUtc ?? DateTime.UtcNow, DateTimeKind.Utc)).ToUnixTimeSeconds();
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new("name", user.DisplayName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(SecurityClaims.Amr, mfa ? SecurityClaims.AmrMfa : SecurityClaims.AmrPassword),
            new(SecurityClaims.SessionId, sessionId.ToString()),
            new(SecurityClaims.AuthTime, authTime.ToString(System.Globalization.CultureInfo.InvariantCulture), ClaimValueTypes.Integer64),
        };
        claims.AddRange(user.Roles.Select(r => new Claim(ClaimTypes.Role, r.Role)));
        return Write(claims, DateTime.UtcNow.AddMinutes(opt.AccessTokenMinutes));
    }

    /// <summary>Token with no roles that the MFA filter only accepts on MFA-enrollment endpoints.</summary>
    public string IssueEnrollmentToken(User user) => Write(
    [
        new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new(SecurityClaims.TokenUse, SecurityClaims.MfaEnrollmentUse),
        new(SecurityClaims.Amr, SecurityClaims.AmrPassword),
    ], DateTime.UtcNow.Add(EnrollmentTokenLifetime));

    private string Write(IEnumerable<Claim> claims, DateTime expires)
    {
        var creds = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(opt.Key)), SecurityAlgorithms.HmacSha256);
        return new JwtSecurityTokenHandler().WriteToken(new JwtSecurityToken(opt.Issuer, opt.Audience, claims, expires: expires, signingCredentials: creds));
    }
}

/// <summary>Endpoint may be called by a privileged user whose token lacks amr=mfa (enrollment, sign-out, own status).</summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class AllowWithoutMfaAttribute : Attribute;

/// <summary>Endpoint also accepts the restricted "mfa_enrollment" token. Implies <see cref="AllowWithoutMfaAttribute"/>.</summary>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class AllowMfaEnrollmentTokenAttribute : Attribute;

/// <summary>
/// Global MVC filter. (1) A restricted mfa_enrollment token only reaches endpoints marked
/// <see cref="AllowMfaEnrollmentTokenAttribute"/>. (2) When Security:RequireMfaForPrivileged is on, a user holding a privileged
/// role whose token was not MFA-authenticated gets 403 mfa_required everywhere except <see cref="AllowWithoutMfaAttribute"/> endpoints.
/// </summary>
public class MfaEnforcementFilter(IConfiguration cfg) : IAsyncAuthorizationFilter
{
    public Task OnAuthorizationAsync(AuthorizationFilterContext ctx)
    {
        var user = ctx.HttpContext.User;
        if (user.Identity?.IsAuthenticated != true) return Task.CompletedTask;
        var meta = ctx.ActionDescriptor.EndpointMetadata;
        var enrollmentAllowed = meta.Any(m => m is AllowMfaEnrollmentTokenAttribute);

        if (user.FindFirst(SecurityClaims.TokenUse)?.Value == SecurityClaims.MfaEnrollmentUse)
        {
            if (!enrollmentAllowed)
                throw new AppException(403, "Multi-factor authentication must be set up before using this account.", "mfa_enrollment_required");
            return Task.CompletedTask;
        }
        if (!SecurityOptions.RequireMfaForPrivileged(cfg)) return Task.CompletedTask;
        if (enrollmentAllowed || meta.Any(m => m is AllowWithoutMfaAttribute)) return Task.CompletedTask;
        var privileged = SecurityClaims.PrivilegedRoles.Any(user.IsInRole);
        if (privileged && user.FindFirst(SecurityClaims.Amr)?.Value != SecurityClaims.AmrMfa)
            throw new AppException(403, "This account requires multi-factor authentication. Sign in again with MFA.", "mfa_required");
        return Task.CompletedTask;
    }
}
