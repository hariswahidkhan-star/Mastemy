using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Assessment;

public record AccommodationInput(Guid UserId, Guid? AssessmentId, int ExtraTimePercent, bool Untimed, string Reason);
public record AccommodationDto(Guid Id, Guid UserId, Guid? AssessmentId, int ExtraTimePercent, bool Untimed, string Reason, Guid GrantedBy,
    DateTime CreatedAt, DateTime? RevokedAt);
public record MyAccommodationDto(Guid Id, Guid? AssessmentId, int ExtraTimePercent, bool Untimed, DateTime CreatedAt);
public record AssessmentPolicyInput(bool AllowPause, int MaxPauseMinutes, int? MaxExposuresPerQuestion);
public record AssessmentPolicyDto(Guid AssessmentId, bool AllowPause, int MaxPauseMinutes, int? MaxExposuresPerQuestion, DateTime? UpdatedAt);

/// <summary>
/// Testing accommodations (spec §15): staff grant a learner extra time (percent) and/or untimed delivery, for one assessment
/// or globally. The assessment-specific grant wins over a global one. Applied when an attempt starts; every grant,
/// revocation and application is audited. Learners can see (not change) their own accommodations.
/// </summary>
public class AccommodationService(AppDbContext db, ICurrentUser me, AuditService audit, AccessService access)
{
    public const int MaxExtraTimePercent = 300;

    public async Task<Accommodation?> ActiveFor(Guid userId, Guid assessmentId)
    {
        var list = await db.Set<Accommodation>().AsNoTracking()
            .Where(x => x.UserId == userId && x.RevokedAt == null && (x.AssessmentId == assessmentId || x.AssessmentId == null)).ToListAsync();
        return list.Where(x => x.AssessmentId == assessmentId).OrderByDescending(x => x.CreatedAt).FirstOrDefault()
               ?? list.Where(x => x.AssessmentId == null).OrderByDescending(x => x.CreatedAt).FirstOrDefault();
    }

    public async Task<AccommodationDto> Grant(AccommodationInput input)
    {
        var uid = me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        if (input is null) throw AppException.Bad("Request body is required.");
        var e = new List<string>();
        if (input.ExtraTimePercent is < 0 or > MaxExtraTimePercent) e.Add($"extraTimePercent must be between 0 and {MaxExtraTimePercent}.");
        if (input.ExtraTimePercent == 0 && !input.Untimed) e.Add("Grant extra time (extraTimePercent > 0) and/or untimed delivery.");
        if (string.IsNullOrWhiteSpace(input.Reason) || input.Reason.Length > 500) e.Add("reason is required (max 500 characters).");
        if (e.Count > 0) throw AppException.Bad(string.Join(" ", e), "validation_failed");
        if (!await db.Users.AnyAsync(u => u.Id == input.UserId)) throw AppException.NotFound("User");
        if (input.AssessmentId is { } aid && !await db.Assessments.AnyAsync(a => a.Id == aid)) throw AppException.NotFound("Assessment");

        var now = DateTime.UtcNow;
        // One active grant per (learner, scope): a new grant replaces the previous one.
        var previous = await db.Set<Accommodation>().Where(x => x.UserId == input.UserId && x.AssessmentId == input.AssessmentId && x.RevokedAt == null).ToListAsync();
        foreach (var p in previous)
        {
            p.RevokedAt = now; p.RevokedBy = uid;
            audit.Record("accommodation.replaced", "Accommodation", p.Id, new { p.UserId, p.AssessmentId });
        }
        var acc = new Accommodation
        {
            UserId = input.UserId, AssessmentId = input.AssessmentId, ExtraTimePercent = input.ExtraTimePercent, Untimed = input.Untimed,
            Reason = input.Reason.Trim(), GrantedBy = uid, CreatedAt = now,
        };
        db.Set<Accommodation>().Add(acc);
        audit.Record("accommodation.granted", "Accommodation", acc.Id, new { acc.UserId, acc.AssessmentId, acc.ExtraTimePercent, acc.Untimed });
        await db.SaveChangesAsync();
        return Dto(acc);
    }

    public async Task<List<AccommodationDto>> List(Guid? userId, bool includeRevoked)
    {
        me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        var q = db.Set<Accommodation>().AsNoTracking().AsQueryable();
        if (userId is not null) q = q.Where(x => x.UserId == userId);
        if (!includeRevoked) q = q.Where(x => x.RevokedAt == null);
        return (await q.OrderByDescending(x => x.CreatedAt).Take(500).ToListAsync()).Select(Dto).ToList();
    }

    public async Task Revoke(Guid id)
    {
        var uid = me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        var acc = await db.Set<Accommodation>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Accommodation");
        if (acc.RevokedAt is not null) throw AppException.Conflict("This accommodation is already revoked.", "already_revoked");
        acc.RevokedAt = DateTime.UtcNow; acc.RevokedBy = uid;
        audit.Record("accommodation.revoked", "Accommodation", acc.Id, new { acc.UserId, acc.AssessmentId });
        await db.SaveChangesAsync();
    }

    public async Task<List<MyAccommodationDto>> Mine()
    {
        var uid = me.RequireId();
        return await db.Set<Accommodation>().AsNoTracking().Where(x => x.UserId == uid && x.RevokedAt == null).OrderByDescending(x => x.CreatedAt)
            .Select(x => new MyAccommodationDto(x.Id, x.AssessmentId, x.ExtraTimePercent, x.Untimed, x.CreatedAt)).ToListAsync();
    }

    // ---------------- Delivery policy (pause, exposure) ----------------

    public async Task<AssessmentPolicyDto> GetPolicy(Guid assessmentId)
    {
        var a = await db.Assessments.AsNoTracking().FirstOrDefaultAsync(x => x.Id == assessmentId) ?? throw AppException.NotFound("Assessment");
        await access.RequireCourseAuthorOrStaff(a.CourseId);
        var p = await db.Set<AssessmentPolicy>().AsNoTracking().FirstOrDefaultAsync(x => x.AssessmentId == assessmentId);
        return p is null ? new AssessmentPolicyDto(assessmentId, false, 0, null, null)
            : new AssessmentPolicyDto(assessmentId, p.AllowPause, p.MaxPauseMinutes, p.MaxExposuresPerQuestion, p.UpdatedAt);
    }

    /// <summary>
    /// Pausing is never implicit: it exists only when AllowPause is set with a positive pause budget, and only for timed
    /// attempts; the server records every paused interval and extends the deadline by at most the budget.
    /// </summary>
    public async Task<AssessmentPolicyDto> SetPolicy(Guid assessmentId, AssessmentPolicyInput input)
    {
        me.RequireId();
        var a = await db.Assessments.AsNoTracking().FirstOrDefaultAsync(x => x.Id == assessmentId) ?? throw AppException.NotFound("Assessment");
        await access.RequireCourseEditor(a.CourseId);
        if (input is null) throw AppException.Bad("Request body is required.");
        var e = new List<string>();
        if (input.AllowPause && input.MaxPauseMinutes is < 1 or > 240) e.Add("maxPauseMinutes must be between 1 and 240 when pausing is allowed.");
        if (!input.AllowPause && input.MaxPauseMinutes != 0) e.Add("maxPauseMinutes must be 0 when pausing is not allowed.");
        if (input.AllowPause && a.TimeLimitMinutes is null) e.Add("Pausing only applies to timed assessments.");
        if (input.MaxExposuresPerQuestion is < 1 or > 100) e.Add("maxExposuresPerQuestion must be between 1 and 100 (or null for unlimited).");
        if (e.Count > 0) throw AppException.Bad(string.Join(" ", e), "validation_failed");
        var p = await db.Set<AssessmentPolicy>().FirstOrDefaultAsync(x => x.AssessmentId == assessmentId);
        if (p is null) { p = new AssessmentPolicy { AssessmentId = assessmentId }; db.Set<AssessmentPolicy>().Add(p); }
        p.AllowPause = input.AllowPause; p.MaxPauseMinutes = input.MaxPauseMinutes; p.MaxExposuresPerQuestion = input.MaxExposuresPerQuestion;
        p.UpdatedAt = DateTime.UtcNow;
        audit.Record("assessment.policy_updated", "Assessment", assessmentId, new { input.AllowPause, input.MaxPauseMinutes, input.MaxExposuresPerQuestion });
        await db.SaveChangesAsync();
        return new AssessmentPolicyDto(assessmentId, p.AllowPause, p.MaxPauseMinutes, p.MaxExposuresPerQuestion, p.UpdatedAt);
    }

    private static AccommodationDto Dto(Accommodation x) =>
        new(x.Id, x.UserId, x.AssessmentId, x.ExtraTimePercent, x.Untimed, x.Reason, x.GrantedBy, x.CreatedAt, x.RevokedAt);
}
