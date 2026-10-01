using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;

namespace Mastemy.Tests.Catalog;

public class CourseStateMachineTests
{
    public static TheoryData<CourseStatus, CourseAction, CourseStatus?> Cases()
    {
        var expected = new Dictionary<(CourseStatus, CourseAction), CourseStatus>
        {
            [(CourseStatus.Draft, CourseAction.Submit)] = CourseStatus.InReview,
            [(CourseStatus.ChangesRequested, CourseAction.Submit)] = CourseStatus.InReview,
            [(CourseStatus.Updating, CourseAction.Submit)] = CourseStatus.InReview,
            [(CourseStatus.InReview, CourseAction.Approve)] = CourseStatus.Approved,
            [(CourseStatus.InReview, CourseAction.RequestChanges)] = CourseStatus.ChangesRequested,
            [(CourseStatus.Approved, CourseAction.Publish)] = CourseStatus.Published,
            [(CourseStatus.Published, CourseAction.StartUpdate)] = CourseStatus.Updating,
        };
        foreach (var s in Enum.GetValues<CourseStatus>())
            if (s != CourseStatus.Archived) expected[(s, CourseAction.Archive)] = CourseStatus.Archived;

        var data = new TheoryData<CourseStatus, CourseAction, CourseStatus?>();
        foreach (var s in Enum.GetValues<CourseStatus>())
            foreach (var a in Enum.GetValues<CourseAction>())
                data.Add(s, a, expected.TryGetValue((s, a), out var to) ? to : null);
        return data;
    }

    [Theory, MemberData(nameof(Cases))]
    public void Transition_table_is_exact(CourseStatus from, CourseAction action, CourseStatus? to)
    {
        var course = new Course { Status = from };
        if (to is null)
        {
            Assert.False(CourseStateMachine.CanApply(from, action));
            var ex = Assert.Throws<AppException>(() => CourseStateMachine.Apply(course, action, DateTime.UtcNow));
            Assert.Equal(409, ex.Status);
            Assert.Equal(from, course.Status);
        }
        else
        {
            Assert.Equal(to, CourseStateMachine.Apply(course, action, DateTime.UtcNow));
            Assert.Equal(to, course.Status);
        }
    }

    [Fact]
    public void Timestamps_are_set()
    {
        var now = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        var c = new Course { Status = CourseStatus.InReview };
        CourseStateMachine.Apply(c, CourseAction.Approve, now);
        Assert.Equal(now, c.ReviewedAt);
        CourseStateMachine.Apply(c, CourseAction.Publish, now);
        Assert.Equal(now, c.PublishedAt);
    }

    [Theory]
    [InlineData(CourseStatus.Draft, true)]
    [InlineData(CourseStatus.ChangesRequested, true)]
    [InlineData(CourseStatus.Updating, true)]
    [InlineData(CourseStatus.InReview, false)]
    [InlineData(CourseStatus.Approved, false)]
    [InlineData(CourseStatus.Published, false)]
    [InlineData(CourseStatus.Archived, false)]
    public void Editability(CourseStatus s, bool editable) => Assert.Equal(editable, CourseStateMachine.IsEditable(s));

    [Theory]
    [InlineData("Intro to Data Analytics!", "intro-to-data-analytics", "ITDA")]
    [InlineData("Café   Basics", "cafe-basics", "CB")]
    [InlineData("SQL", "sql", "SQL")]
    [InlineData("!!!", "course", "COURSE")]
    public void Slug_and_code(string title, string slug, string codePrefix)
    {
        Assert.Equal(slug, StudioService.Slugify(title));
        Assert.StartsWith(codePrefix, StudioService.CodeBase(title));
        Assert.True(StudioService.CodeBase(title).Length >= 3);
    }
}
