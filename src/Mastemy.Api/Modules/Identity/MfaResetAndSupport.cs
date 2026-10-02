using System.Security.Claims;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Engagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Identity;

/// <summary>An administrative MFA reset. While <see cref="ReenrolledAt"/> is null the user must enroll MFA again before using the account.</summary>
public class MfaResetRecord
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid ActorId { get; set; }
    public string Reason { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ReenrolledAt { get; set; }
}

public class MfaResetRecordConfig : IEntityTypeConfiguration<MfaResetRecord>
{
    public void Configure(EntityTypeBuilder<MfaResetRecord> b)
    {
        b.ToTable("Identity_MfaResets");
        b.HasKey(x => x.Id);
        b.Property(x => x.Reason).HasMaxLength(500).IsRequired();
        b.HasIndex(x => new { x.UserId, x.ReenrolledAt });
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
    }
}

public record MfaResetRequest(string? Reason);
public record MfaResetResultDto(Guid UserId, Guid ResetId, DateTime ResetAt, bool SessionsRevoked, bool ReenrollmentRequired);

public record SupportEnrollmentDto(Guid CourseId, string CourseTitle, DateTime EnrolledAt);
public record SupportOrderSummaryDto(Guid Id, OrderStatus Status, decimal Total, string Currency, DateTime CreatedAt);
public record SupportCertificateDto(Guid Id, string Kind, string CourseTitle, string Status, DateTime IssuedAt);
public record SupportUserDto(Guid Id, string DisplayName, string MaskedEmail, bool EmailVerified, bool IsSuspended, bool MfaEnabled,
    DateTime CreatedAt, List<SupportEnrollmentDto> Enrollments, List<SupportOrderSummaryDto> Orders, List<SupportCertificateDto> Certificates);

public static class SupportPolicy
{
    public const string Name = "Support";
    /// <summary>Support capabilities are read-only lookups plus resending verification email; Admin/SuperAdmin inherit them.</summary>
    public static readonly string[] Roles_ = [Roles.Support, Roles.Admin, Roles.SuperAdmin];
}

/// <summary>
/// SuperAdmin-only MFA reset (spec §21 account recovery) with safeguards: the acting SuperAdmin's own token must be MFA
/// authenticated (amr=mfa) with an auth_time within <see cref="FreshMfaWindow"/>; never for oneself; a reason is recorded;
/// the user is notified (in-app and email when configured); every session is revoked; the user must enroll MFA again at the
/// next sign-in (login returns mfa_enrollment_required until enrollment is confirmed). Audited as user.mfa_reset_by_admin.
/// </summary>
public class MfaResetService(AppDbContext db, ICurrentUser me, IHttpContextAccessor http, AuditService audit, AuthService auth,
    INotificationService notifications, EmailOutbox outbox)
{
    public static readonly TimeSpan FreshMfaWindow = TimeSpan.FromMinutes(10);

    public static bool HasFreshMfa(ClaimsPrincipal? p, DateTime nowUtc)
    {
        if (p?.FindFirst(SecurityClaims.Amr)?.Value != SecurityClaims.AmrMfa) return false;
        if (!long.TryParse(p.FindFirst(SecurityClaims.AuthTime)?.Value, out var secs)) return false;
        var at = DateTimeOffset.FromUnixTimeSeconds(secs).UtcDateTime;
        return at <= nowUtc.AddSeconds(30) && nowUtc - at <= FreshMfaWindow;
    }

    public async Task<MfaResetResultDto> Reset(Guid userId, MfaResetRequest req)
    {
        var actor = me.RequireId();
        if (!me.IsInRole(Roles.SuperAdmin)) throw AppException.Forbidden();
        var now = DateTime.UtcNow;
        if (!HasFreshMfa(http.HttpContext?.User, now))
            throw new AppException(403, "Resetting another user's MFA requires you to have signed in with MFA within the last 10 minutes.", "fresh_mfa_required");
        if (userId == actor) throw AppException.Bad("You cannot reset your own MFA; use your recovery codes.", "cannot_reset_own_mfa");
        var reason = (req?.Reason ?? "").Trim();
        if (reason.Length is < 10 or > 500) throw AppException.Bad("reason is required (10-500 characters).", "invalid_reason");
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == userId) ?? throw AppException.NotFound("User");
        var sec = await db.Set<UserSecurity>().FirstOrDefaultAsync(s => s.UserId == userId);
        if (sec?.MfaEnabledAt is null && sec?.MfaPendingSecretProtected is null)
            throw AppException.Conflict("This user has no MFA to reset.", "mfa_not_enabled");

        sec!.MfaSecretProtected = null; sec.MfaEnabledAt = null; sec.MfaLastUsedStep = null;
        sec.MfaPendingSecretProtected = null; sec.MfaPendingCreatedAt = null;
        await db.Set<MfaRecoveryCode>().Where(c => c.UserId == userId).ExecuteDeleteAsync();
        await db.Set<MfaChallenge>().Where(c => c.UserId == userId && c.UsedAt == null).ExecuteUpdateAsync(s => s.SetProperty(c => c.UsedAt, now));
        var record = new MfaResetRecord { UserId = userId, ActorId = actor, Reason = reason, CreatedAt = now };
        db.Set<MfaResetRecord>().Add(record);
        audit.Record("user.mfa_reset_by_admin", "User", userId, new { resetId = record.Id, reason });
        if (outbox.Enabled)
            outbox.Enqueue(user.Email, "Your Mastemy two-factor authentication was reset",
                $"Hello {user.DisplayName},\n\nA Mastemy administrator reset the two-factor authentication on your account and signed out all of " +
                "your sessions. You will be asked to set up two-factor authentication again the next time you sign in.\n\n" +
                "If you did not ask for this, contact Mastemy support immediately.");
        await db.SaveChangesAsync();
        await auth.RevokeAllForUser(userId);
        await notifications.Publish([userId], NotificationKinds.AccountSecurity,
            "Your two-factor authentication was reset by an administrator. Sign in again to set it up.", "/login?reason=mfa_reset");
        return new MfaResetResultDto(userId, record.Id, now, true, true);
    }

    /// <summary>True while an admin reset is awaiting re-enrollment.</summary>
    public static Task<bool> ReenrollmentPending(AppDbContext db, Guid userId) =>
        db.Set<MfaResetRecord>().AnyAsync(r => r.UserId == userId && r.ReenrolledAt == null);
}

/// <summary>Support desk reads (masked) and the one Support write: resending a verification email.</summary>
public class SupportService(AppDbContext db, AdminService admin, EmailVerificationService verification)
{
    public Task<List<UserLookupDto>> Lookup(string? q, int limit) => admin.Lookup(q, limit);

    public async Task<SupportUserDto> User(Guid id)
    {
        var u = await db.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("User");
        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == id);
        var enrollments = await db.Enrollments.AsNoTracking().Where(e => e.UserId == id)
            .OrderByDescending(e => e.CreatedAt).Take(200)
            .Join(db.Courses, e => e.CourseId, c => c.Id, (e, c) => new SupportEnrollmentDto(c.Id, c.Title, e.CreatedAt)).ToListAsync();
        var orders = await db.Orders.AsNoTracking().Where(o => o.UserId == id).OrderByDescending(o => o.CreatedAt).Take(100)
            .Select(o => new SupportOrderSummaryDto(o.Id, o.Status, o.Total, o.Currency, o.CreatedAt)).ToListAsync();
        var certs = (await db.Certificates.AsNoTracking().Where(c => c.UserId == id).Select(c => new { c.Id, c.CourseTitle, c.Status, c.IssuedAt }).ToListAsync())
            .Select(c => new SupportCertificateDto(c.Id, Assessment.CredentialKinds.AssessedKnowledge, c.CourseTitle, c.Status.ToString(), c.IssuedAt));
        var awards = (await db.Set<Assessment.CompletionAward>().AsNoTracking().Where(c => c.UserId == id).Select(c => new { c.Id, c.CourseTitle, c.Status, c.IssuedAt }).ToListAsync())
            .Select(c => new SupportCertificateDto(c.Id, Assessment.CredentialKinds.Completion, c.CourseTitle, c.Status.ToString(), c.IssuedAt));
        return new SupportUserDto(u.Id, u.DisplayName, AdminService.MaskEmail(u.Email), EmailVerificationService.IsVerified(u, sec), u.IsSuspended,
            sec?.MfaEnabledAt is not null, u.CreatedAt, enrollments, orders, certs.Concat(awards).OrderByDescending(c => c.IssuedAt).ToList());
    }

    public Task ResendVerification(Guid id) => verification.Resend(id, byStaff: true);
}

[ApiController]
[Route("api/support")]
[Authorize(Policy = SupportPolicy.Name)]
public class SupportController(SupportService support) : ControllerBase
{
    [HttpGet("users/lookup")]
    public Task<List<UserLookupDto>> Lookup([FromQuery] string? q, [FromQuery] int limit = 10) => support.Lookup(q, limit);

    [HttpGet("users/{id:guid}")]
    public Task<SupportUserDto> GetUser(Guid id) => support.User(id);

    [HttpPost("users/{id:guid}/email-verification/resend")]
    public async Task<IActionResult> Resend(Guid id) { await support.ResendVerification(id); return Accepted(); }
}

[ApiController]
public class MfaResetController(MfaResetService svc) : ControllerBase
{
    [HttpPost("api/admin/users/{id:guid}/mfa/reset"), Authorize(Policy = "SuperAdmin")]
    public Task<MfaResetResultDto> Reset(Guid id, MfaResetRequest req) => svc.Reset(id, req);
}
