using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Infrastructure;

/// <summary>
/// Central server-side authorization for course content and the free-video / paid-services boundary.
/// Video playback is NEVER gated by payment, enrollment, quiz results or login (spec §2).
/// Premium services (premium notes, premium MCQ banks/mocks) require an active entitlement.
/// </summary>
public class AccessService(AppDbContext db, ICurrentUser me)
{
    /// <summary>Owner, co-instructor or editor of the course.</summary>
    public async Task<bool> IsCourseAuthor(Guid courseId, Guid? userId = null)
    {
        var uid = userId ?? me.Id;
        if (uid is null) return false;
        return await db.CourseInstructors.AnyAsync(x => x.CourseId == courseId && x.UserId == uid);
    }

    public async Task RequireCourseAuthorOrStaff(Guid courseId)
    {
        me.RequireId();
        if (me.IsStaff || me.IsInRole(Roles.Reviewer)) return;
        if (!await IsCourseAuthor(courseId)) throw AppException.Forbidden("You are not an instructor on this course.");
    }

    /// <summary>Write access: authors only (reviewers read but do not edit), staff may edit.</summary>
    public async Task RequireCourseEditor(Guid courseId)
    {
        me.RequireId();
        if (me.IsStaff) return;
        if (!await IsCourseAuthor(courseId)) throw AppException.Forbidden("You are not an instructor on this course.");
    }

    public async Task<bool> HasPremiumAccess(Guid courseId, Guid? userId = null)
    {
        var uid = userId ?? me.Id;
        if (uid is null) return false;
        var now = DateTime.UtcNow;
        return await db.Entitlements.AnyAsync(e => e.UserId == uid && e.CourseId == courseId && e.RevokedAt == null
                                                  && e.StartsAt <= now && (e.EndsAt == null || e.EndsAt > now));
    }

    /// <summary>Course is visible to learners (published or updating-with-published-version).</summary>
    public static bool IsLive(CourseStatus s) => s is CourseStatus.Published or CourseStatus.Updating;
}
