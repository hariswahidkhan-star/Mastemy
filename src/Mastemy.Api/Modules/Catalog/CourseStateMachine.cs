using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;

namespace Mastemy.Api.Modules.Catalog;

public enum CourseAction { Submit, Approve, RequestChanges, Publish, StartUpdate, Archive }

/// <summary>
/// The single authority for course lifecycle transitions (spec §5/§9). Every status change in the
/// Catalog module goes through <see cref="Apply"/>; editability is decided by <see cref="IsEditable"/>.
/// </summary>
public static class CourseStateMachine
{
    private static readonly Dictionary<(CourseStatus From, CourseAction Action), CourseStatus> Table = new()
    {
        [(CourseStatus.Draft, CourseAction.Submit)] = CourseStatus.InReview,
        [(CourseStatus.ChangesRequested, CourseAction.Submit)] = CourseStatus.InReview,
        [(CourseStatus.Updating, CourseAction.Submit)] = CourseStatus.InReview,
        [(CourseStatus.InReview, CourseAction.Approve)] = CourseStatus.Approved,
        [(CourseStatus.InReview, CourseAction.RequestChanges)] = CourseStatus.ChangesRequested,
        [(CourseStatus.Approved, CourseAction.Publish)] = CourseStatus.Published,
        [(CourseStatus.Published, CourseAction.StartUpdate)] = CourseStatus.Updating,
        [(CourseStatus.Draft, CourseAction.Archive)] = CourseStatus.Archived,
        [(CourseStatus.InReview, CourseAction.Archive)] = CourseStatus.Archived,
        [(CourseStatus.ChangesRequested, CourseAction.Archive)] = CourseStatus.Archived,
        [(CourseStatus.Approved, CourseAction.Archive)] = CourseStatus.Archived,
        [(CourseStatus.Published, CourseAction.Archive)] = CourseStatus.Archived,
        [(CourseStatus.Updating, CourseAction.Archive)] = CourseStatus.Archived,
    };

    public static IReadOnlyDictionary<(CourseStatus From, CourseAction Action), CourseStatus> Transitions => Table;

    public static bool CanApply(CourseStatus from, CourseAction action) => Table.ContainsKey((from, action));

    public static CourseStatus Next(CourseStatus from, CourseAction action) =>
        Table.TryGetValue((from, action), out var to)
            ? to
            : throw AppException.Conflict($"Cannot {action} a course in status {from}.", "invalid_transition");

    /// <summary>Applies the transition to the entity (status + timestamps). Throws 409 when not allowed.</summary>
    public static CourseStatus Apply(Course course, CourseAction action, DateTime nowUtc)
    {
        var to = Next(course.Status, action);
        course.Status = to;
        course.UpdatedAt = nowUtc;
        if (action == CourseAction.Approve) course.ReviewedAt = nowUtc;
        // PublishedAt marks the FIRST publish (live continuity); re-publishes only bump UpdatedAt.
        if (action == CourseAction.Publish) course.PublishedAt ??= nowUtc;
        return to;
    }

    public static bool IsEditable(CourseStatus s) => s is CourseStatus.Draft or CourseStatus.ChangesRequested or CourseStatus.Updating;

    public static void RequireEditable(Course course)
    {
        if (!IsEditable(course.Status))
            throw AppException.Conflict($"Course content cannot be edited while in status {course.Status}.", "course_not_editable");
    }
}
