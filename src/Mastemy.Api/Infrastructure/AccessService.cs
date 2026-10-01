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
    private static readonly string[] AuthoringRoles = [Roles.Instructor, Roles.Admin, Roles.SuperAdmin];

    /// <summary>
    /// Owner, co-instructor or editor of the course who still holds an authoring role (Instructor/Admin/SuperAdmin)
    /// and is not suspended. Checked against the database, so a demoted or suspended user loses access immediately
    /// even with an unexpired token.
    /// </summary>
    public async Task<bool> IsCourseAuthor(Guid courseId, Guid? userId = null)
    {
        var uid = userId ?? me.Id;
        if (uid is null) return false;
        return await db.CourseInstructors.AnyAsync(x => x.CourseId == courseId && x.UserId == uid
            && db.Users.Any(u => u.Id == uid && !u.IsSuspended)
            && db.UserRoles.Any(r => r.UserId == uid && AuthoringRoles.Contains(r.Role)));
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

    /// <summary>
    /// Course is visible to learners. Published/Updating are live; a course that has ever been published
    /// (PublishedAt set) stays live while it goes through re-review (InReview, ChangesRequested, Approved).
    /// Archived and never-published courses are never live.
    /// </summary>
    public static bool IsLive(CourseStatus s, DateTime? publishedAt) =>
        s is CourseStatus.Published or CourseStatus.Updating
        || (publishedAt != null && s is CourseStatus.InReview or CourseStatus.ChangesRequested or CourseStatus.Approved);

    public static bool IsLive(Course c) => IsLive(c.Status, c.PublishedAt);

    /// <summary>SQL-translatable form of <see cref="IsLive(CourseStatus, DateTime?)"/> for catalog queries.</summary>
    public static readonly System.Linq.Expressions.Expression<Func<Course, bool>> IsLiveExpr = c =>
        c.Status == CourseStatus.Published || c.Status == CourseStatus.Updating
        || (c.PublishedAt != null && (c.Status == CourseStatus.InReview || c.Status == CourseStatus.ChangesRequested
                                      || c.Status == CourseStatus.Approved));
}
