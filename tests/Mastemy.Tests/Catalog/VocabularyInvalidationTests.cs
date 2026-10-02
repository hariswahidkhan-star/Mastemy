using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.Catalog;

/// <summary>Publishing a course drops the cached search vocabulary so its title feeds "did you mean" immediately.</summary>
public class VocabularyInvalidationTests(CatalogFixture f) : IClassFixture<CatalogFixture>
{
    [Fact]
    public async Task Publish_invalidates_vocabulary_cache()
    {
        var a = f.Client(f.InstructorA);
        var course = await f.Read<StudioCourseDto>(await a.PostJ("/api/studio/courses", new CreateCourseRequest(
            "Xylophonics Fundamentals", "Sub", "About xylophones", "Musicians", "None", ["Outcome"], "en", CourseLevel.Beginner, [f.CategoryId])));
        var mod = await f.Read<StudioModuleDto>(await a.PostJ($"/api/studio/courses/{course.Id}/modules", new TitleRequest("Module 1")));
        var lesson = await f.Read<StudioLessonDto>(await a.PostJ($"/api/studio/modules/{mod.Id}/lessons", new LessonCreateRequest("Lesson 1", "Obj", false)));
        await f.Read<StudioLessonDto>(await a.PutNotes(lesson.Id, new LessonNotesRequest("Notes", null)));
        await f.WithDb(async db =>
        {
            var v = new VideoAsset { YouTubeVideoId = "vocab" + Guid.NewGuid().ToString("N")[..6], Title = "v", DurationSeconds = 100, Status = VideoStatus.Ready, UploaderId = f.InstructorA.Id };
            db.VideoAssets.Add(v);
            (await db.Lessons.FirstAsync(x => x.Id == lesson.Id)).VideoAssetId = v.Id;
            await db.SaveChangesAsync();
        });

        // Prime the cache before the course is live.
        using (var scope = f.Factory.Services.CreateScope())
            Assert.DoesNotContain("xylophonics", await scope.ServiceProvider.GetRequiredService<CatalogQueryService>().Vocabulary());

        await f.Read<CourseStatusDto>(await f.Client(f.InstructorA).PostAsync($"/api/studio/courses/{course.Id}/submit", null));
        await f.Read<CourseStatusDto>(await f.Client(f.Reviewer).PostJ($"/api/review/courses/{course.Id}/decision", new ReviewDecisionRequest("Approve", null)));
        await f.Read<CourseStatusDto>(await f.Client(f.Admin).PostAsync($"/api/admin/courses/{course.Id}/publish", null));

        using (var scope = f.Factory.Services.CreateScope())
            Assert.Contains("xylophonics", await scope.ServiceProvider.GetRequiredService<CatalogQueryService>().Vocabulary());
        var r = await f.Read<CourseSearchResultDto>(await f.Client().GetAsync("/api/courses?q=xylophonicz"));
        Assert.Equal("xylophonics", r.DidYouMean);
    }
}
