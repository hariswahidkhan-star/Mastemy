using System.Net;
using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Learning;

public class ReviewVisibilityTests(LearningFixture fx) : IClassFixture<LearningFixture>
{
    [Theory]
    [InlineData(CourseStatus.Draft)]
    [InlineData(CourseStatus.Archived)]
    public async Task Public_review_list_is_404_for_non_live_course(CourseStatus status)
    {
        var seed = await fx.SeedCourse();
        var (u, _) = await fx.User(Roles.Student);
        await fx.Db(async d =>
        {
            d.CourseReviews.Add(new CourseReview { CourseId = seed.Course.Id, UserId = u.Id, Rating = 5, Body = "Hidden course review" });
            await d.SaveChangesAsync();
        });
        Assert.Equal(HttpStatusCode.OK, (await fx.Client().GetAsync($"/api/courses/{seed.Course.Id}/reviews")).StatusCode);

        await fx.Db(d => d.Courses.Where(c => c.Id == seed.Course.Id).ExecuteUpdateAsync(s => s.SetProperty(c => c.Status, status)));
        var r = await fx.Client().GetAsync($"/api/courses/{seed.Course.Id}/reviews");
        Assert.Equal(HttpStatusCode.NotFound, r.StatusCode);
        Assert.DoesNotContain("Hidden course review", await r.Content.ReadAsStringAsync());
        Assert.Equal(HttpStatusCode.NotFound, (await fx.Client().GetAsync($"/api/courses/{Guid.NewGuid()}/reviews")).StatusCode);
    }
}
