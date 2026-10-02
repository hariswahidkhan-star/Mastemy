using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Authoring;

/// <summary>
/// Scoped course-team permissions (spec §9 "co-instructors and scoped editors").
/// <list type="bullet">
/// <item><b>Content</b> (curriculum, notes, questions, resources, preview): Owner, CoInstructor and Editor.</item>
/// <item><b>Management</b> (pricing/packages, co-instructors, submit/start-update, translations, duplicate, analytics/revenue):
/// Owner and CoInstructor only. An <see cref="CourseInstructorRole.Editor"/> is refused with 403 <c>editor_scope</c>.</item>
/// </list>
/// Staff (Admin/SuperAdmin) pass every check. Course membership is verified against the database via
/// <see cref="AccessService.IsCourseAuthor"/> (demoted/suspended users lose access immediately). Other modules
/// (e.g. Commerce package pricing) should call <see cref="RequireCourseManager"/> for management actions.
/// </summary>
public class CourseScopeService(AppDbContext db, ICurrentUser me, AccessService access)
{
    /// <summary>The caller's role on the course, or null when they are not an active author of it.</summary>
    public async Task<CourseInstructorRole?> RoleOf(Guid courseId, Guid? userId = null)
    {
        var uid = userId ?? me.Id;
        if (uid is null) return null;
        if (!await access.IsCourseAuthor(courseId, uid)) return null;
        return await db.CourseInstructors.AsNoTracking().Where(i => i.CourseId == courseId && i.UserId == uid)
            .Select(i => (CourseInstructorRole?)i.Role).FirstOrDefaultAsync();
    }

    public static bool IsManagerRole(CourseInstructorRole? r) => r is CourseInstructorRole.Owner or CourseInstructorRole.CoInstructor;

    /// <summary>Content edits: any course author (incl. Editor) or staff.</summary>
    public async Task RequireContentEditor(Guid courseId)
    {
        me.RequireId();
        if (me.IsStaff) return;
        if (await RoleOf(courseId) is null) throw AppException.Forbidden("You are not an instructor on this course.");
    }

    /// <summary>Management actions: Owner/CoInstructor or staff. Editors get 403 <c>editor_scope</c>.</summary>
    public async Task RequireCourseManager(Guid courseId)
    {
        me.RequireId();
        if (me.IsStaff) return;
        var role = await RoleOf(courseId);
        if (role is null) throw AppException.Forbidden("You are not an instructor on this course.");
        if (!IsManagerRole(role))
            throw new AppException(403, "Editors can change course content only (not pricing, co-instructors, submission or analytics).", "editor_scope");
    }

    public async Task<bool> IsCourseManager(Guid courseId)
    {
        if (me.Id is null) return false;
        return me.IsStaff || IsManagerRole(await RoleOf(courseId));
    }
}
