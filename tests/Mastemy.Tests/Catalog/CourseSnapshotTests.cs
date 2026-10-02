using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Learning;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.Catalog;

/// <summary>Learners are served the latest published snapshot; working-copy edits stay invisible until re-publish.</summary>
public class CourseSnapshotTests(CatalogFixture f) : IClassFixture<CatalogFixture>
{
    private async Task<StudioCourseDto> CreateCourse(string title, int lessons = 2)
    {
        var a = f.Client(f.InstructorA);
        var course = await f.Read<StudioCourseDto>(await a.PostJ("/api/studio/courses", new CreateCourseRequest(
            title, "Sub", "About " + title, "Analysts", "None", ["Outcome"], "en", CourseLevel.Beginner, [f.CategoryId])));
        var mod = await f.Read<StudioModuleDto>(await a.PostJ($"/api/studio/courses/{course.Id}/modules", new TitleRequest("Module 1")));
        for (var i = 0; i < lessons; i++)
        {
            var lesson = await f.Read<StudioLessonDto>(await a.PostJ($"/api/studio/modules/{mod.Id}/lessons", new LessonCreateRequest($"Lesson {i + 1}", "Obj", false)));
            await f.Read<StudioLessonDto>(await a.PutNotes(lesson.Id, new LessonNotesRequest($"Notes v1 L{i + 1}", null)));
            await f.WithDb(async db =>
            {
                var v = new VideoAsset { YouTubeVideoId = "vid" + i.ToString("00000000"), Title = "v", DurationSeconds = 100, Status = VideoStatus.Ready, UploaderId = f.InstructorA.Id };
                db.VideoAssets.Add(v);
                (await db.Lessons.FirstAsync(x => x.Id == lesson.Id)).VideoAssetId = v.Id;
                await db.SaveChangesAsync();
            });
        }
        return await f.Read<StudioCourseDto>(await a.GetAsync($"/api/studio/courses/{course.Id}"));
    }

    private async Task Publish(Guid id)
    {
        await f.Read<CourseStatusDto>(await f.Client(f.InstructorA).PostAsync($"/api/studio/courses/{id}/submit", null));
        await f.Read<CourseStatusDto>(await f.Client(f.Reviewer).PostJ($"/api/review/courses/{id}/decision", new ReviewDecisionRequest("Approve", null)));
        await f.Read<CourseStatusDto>(await f.Client(f.Admin).PostAsync($"/api/admin/courses/{id}/publish", null));
    }

    private Task StartUpdate(Guid id) => f.Client(f.InstructorA).PostAsync($"/api/studio/courses/{id}/start-update", null)
        .ContinueWith(t => f.Read<CourseStatusDto>(t.Result)).Unwrap();

    [Fact]
    public async Task Publish_creates_incrementing_versions()
    {
        var c = await CreateCourse("Versioned Snapshot Course");
        await Publish(c.Id);
        await f.WithDb(async db =>
        {
            Assert.Equal(1, (await db.Courses.SingleAsync(x => x.Id == c.Id)).PublishedVersion);
            var s = await db.CourseSnapshots.SingleAsync(x => x.CourseId == c.Id);
            Assert.Equal(1, s.Version);
            Assert.Equal(f.Admin.Id, s.PublishedBy);
        });
        await StartUpdate(c.Id);
        await Publish(c.Id);
        await f.WithDb(async db =>
        {
            Assert.Equal(2, (await db.Courses.SingleAsync(x => x.Id == c.Id)).PublishedVersion);
            Assert.Equal([1, 2], await db.CourseSnapshots.Where(x => x.CourseId == c.Id).OrderBy(x => x.Version).Select(x => x.Version).ToListAsync());
        });
        var preview = await f.Read<PublishedPreviewDto>(await f.Client(f.InstructorA).GetAsync($"/api/studio/courses/{c.Id}/published-preview"));
        Assert.Equal(2, preview.Version);
        Assert.Equal("Versioned Snapshot Course", preview.Payload.Title);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorB).GetAsync($"/api/studio/courses/{c.Id}/published-preview")).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await f.Client(f.Reviewer).GetAsync($"/api/studio/courses/{c.Id}/published-preview")).StatusCode);
    }

    [Fact]
    public async Task Edits_while_updating_are_invisible_until_republish()
    {
        var c = await CreateCourse("Frozen Notes Course");
        var a = f.Client(f.InstructorA);
        var anon = f.Client();
        var lesson = c.Modules[0].Lessons[0];
        await Publish(c.Id);
        await StartUpdate(c.Id);

        await f.Read<StudioLessonDto>(await a.PutNotes(lesson.Id, new LessonNotesRequest("Notes v2 secret", null)));
        await f.Read<StudioCourseDto>(await a.PutJ($"/api/studio/courses/{c.Id}", new UpdateCourseRequest("Renamed Unreviewed", "Sub", "About it", "Analysts", "None",
            ["Outcome"], "en", CourseLevel.Beginner, [f.CategoryId], null, null, null)));
        var newLesson = await f.Read<StudioLessonDto>(await a.PostJ($"/api/studio/modules/{c.Modules[0].Id}/lessons", new LessonCreateRequest("Brand new", null, null)));

        var view = await f.Read<LessonViewDto>(await anon.GetAsync($"/api/learn/lessons/{lesson.Id}"));
        Assert.Equal("Notes v1 L1", view.NotesMarkdown);
        var detail = await f.Read<CourseDetailDto>(await anon.GetAsync($"/api/courses/{c.Slug}"));
        Assert.Equal("Frozen Notes Course", detail.Title);
        Assert.Equal(2, detail.Modules[0].Lessons.Count);
        var curriculum = await f.Read<CurriculumDto>(await anon.GetAsync($"/api/learn/courses/{c.Slug}"));
        Assert.Equal("Frozen Notes Course", curriculum.Title);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/learn/lessons/{newLesson.Id}")).StatusCode);
        var search = await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync("/api/courses?q=Renamed%20Unreviewed"));
        Assert.DoesNotContain(search.Items, x => x.Id == c.Id);
        search = await f.Read<PagedResult<CourseCardDto>>(await anon.GetAsync("/api/courses?q=Frozen%20Notes"));
        Assert.Equal("Frozen Notes Course", Assert.Single(search.Items, x => x.Id == c.Id).Title);

        // Remove the new video-less lesson so the course validates, then re-publish.
        Assert.Equal(HttpStatusCode.NoContent, (await a.DeleteAsync($"/api/studio/lessons/{newLesson.Id}")).StatusCode);
        await Publish(c.Id);
        view = await f.Read<LessonViewDto>(await anon.GetAsync($"/api/learn/lessons/{lesson.Id}"));
        Assert.Equal("Notes v2 secret", view.NotesMarkdown);
        Assert.Equal("Renamed Unreviewed", (await f.Read<CourseDetailDto>(await anon.GetAsync($"/api/courses/{c.Slug}"))).Title);
    }

    [Fact]
    public async Task Deleted_lesson_still_renders_and_tracks_progress_until_republish()
    {
        var c = await CreateCourse("Deleted Lesson Course", lessons: 3);
        var a = f.Client(f.InstructorA);
        var gone = c.Modules[0].Lessons[2];
        await Publish(c.Id);
        await StartUpdate(c.Id);
        Assert.Equal(HttpStatusCode.NoContent, (await a.DeleteAsync($"/api/studio/lessons/{gone.Id}")).StatusCode);

        var student = f.Client(f.Student);
        var view = await f.Read<LessonViewDto>(await student.GetAsync($"/api/learn/lessons/{gone.Id}"));
        Assert.Equal("Lesson 3", view.Lesson.Title);
        Assert.Equal("vid00000002", view.YoutubeVideoId);
        // Progress on surviving lessons is unaffected, and the lesson removed from the draft still records progress until re-publish.
        var prog = await f.Read<LessonProgressDto>(await student.PutJ($"/api/learn/lessons/{c.Modules[0].Lessons[0].Id}/progress", new ProgressInput(50, true)));
        Assert.True(prog.Completed);
        var goneProg = await f.Read<LessonProgressDto>(await student.PutJ($"/api/learn/lessons/{gone.Id}/progress", new ProgressInput(50, true)));
        Assert.True(goneProg.Completed);
        Assert.Equal(3, (await f.Read<CourseDetailDto>(await f.Client().GetAsync($"/api/courses/{c.Slug}"))).Modules[0].Lessons.Count);

        var diff = await f.Read<CourseDiffDto>(await f.Client(f.Reviewer).GetAsync($"/api/review/courses/{c.Id}/diff"));
        Assert.Equal(gone.Id, Assert.Single(diff.LessonsRemoved).Id);

        await Publish(c.Id);
        Assert.Equal(HttpStatusCode.NotFound, (await student.GetAsync($"/api/learn/lessons/{gone.Id}")).StatusCode);
        Assert.Equal(2, (await f.Read<CourseDetailDto>(await f.Client().GetAsync($"/api/courses/{c.Slug}"))).Modules[0].Lessons.Count);
    }

    [Fact]
    public async Task Video_restricted_after_snapshot_is_not_playable()
    {
        var c = await CreateCourse("Restricted Video Course");
        var lesson = c.Modules[0].Lessons[0];
        await Publish(c.Id);
        await f.WithDb(async db =>
        {
            var v = await db.VideoAssets.SingleAsync(x => x.Id == lesson.VideoAssetId);
            v.Status = VideoStatus.Restricted; v.StatusReason = "Video made private on YouTube.";
            await db.SaveChangesAsync();
        });
        var anon = f.Client();
        var view = await f.Read<LessonViewDto>(await anon.GetAsync($"/api/learn/lessons/{lesson.Id}"));
        Assert.Null(view.YoutubeVideoId);
        Assert.Equal("Video made private on YouTube.", view.VideoUnavailableReason);
        var cur = await f.Read<CurriculumDto>(await anon.GetAsync($"/api/learn/courses/{c.Slug}"));
        var l0 = cur.Modules[0].Lessons.Single(x => x.Id == lesson.Id);
        Assert.Null(l0.YoutubeVideoId);
        Assert.NotNull(l0.VideoUnavailableReason);
        Assert.NotNull(cur.Modules[0].Lessons.Single(x => x.Id != lesson.Id).YoutubeVideoId);
        var detail = await f.Read<CourseDetailDto>(await anon.GetAsync($"/api/courses/{c.Slug}"));
        Assert.Equal(1, detail.VideoCount);
    }

    [Fact]
    public async Task Diff_lists_field_module_and_lesson_changes()
    {
        var c = await CreateCourse("Diff Course");
        var a = f.Client(f.InstructorA);
        await Publish(c.Id);
        var clean = await f.Read<CourseDiffDto>(await f.Client(f.Reviewer).GetAsync($"/api/review/courses/{c.Id}/diff"));
        Assert.False(clean.HasChanges);
        Assert.Equal(1, clean.BaseVersion);

        await StartUpdate(c.Id);
        var lesson = c.Modules[0].Lessons[1];
        await f.Read<StudioLessonDto>(await a.PutNotes(lesson.Id, new LessonNotesRequest("New notes", "Premium!")));
        await f.Read<StudioLessonDto>(await a.PutJ($"/api/studio/lessons/{lesson.Id}", new LessonUpdateRequest("Lesson Two Renamed", "Obj", false)));
        await f.Read<StudioCourseDto>(await a.PutJ($"/api/studio/courses/{c.Id}", new UpdateCourseRequest("Diff Course", "New sub", "About Diff Course", "Analysts", "None",
            ["Outcome"], "en", CourseLevel.Beginner, [f.CategoryId], null, null, null)));
        var mod = await f.Read<StudioModuleDto>(await a.PostJ($"/api/studio/courses/{c.Id}/modules", new TitleRequest("Module 2")));
        var added = await f.Read<StudioLessonDto>(await a.PostJ($"/api/studio/modules/{mod.Id}/lessons", new LessonCreateRequest("Added", null, null)));

        var diff = await f.Read<CourseDiffDto>(await f.Client(f.Reviewer).GetAsync($"/api/review/courses/{c.Id}/diff"));
        Assert.True(diff.HasChanges);
        Assert.Contains(diff.CourseFields, x => x.Field == "subtitle" && x.Before == "Sub" && x.After == "New sub");
        Assert.Equal(mod.Id, Assert.Single(diff.ModulesAdded).Id);
        Assert.Equal(added.Id, Assert.Single(diff.LessonsAdded).Id);
        var changed = Assert.Single(diff.LessonsChanged);
        Assert.Equal(lesson.Id, changed.Id);
        Assert.Contains(changed.Changes, x => x.Field == "title" && x.After == "Lesson Two Renamed");
        Assert.Contains(changed.Changes, x => x.Field == "notesMarkdown" && x.Before == "Notes v1 L2" && x.After == "New notes");
        Assert.Contains(changed.Changes, x => x.Field == "premiumNotesMarkdown" && x.Before == null && x.After == "Premium!");
        Assert.Empty(diff.LessonsRemoved);

        Assert.Equal(HttpStatusCode.OK, (await a.GetAsync($"/api/review/courses/{c.Id}/diff")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.Student).GetAsync($"/api/review/courses/{c.Id}/diff")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await f.Client(f.InstructorB).GetAsync($"/api/review/courses/{c.Id}/diff")).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Client().GetAsync($"/api/review/courses/{c.Id}/diff")).StatusCode);
    }

    [Fact]
    public async Task Never_published_course_has_no_preview_and_diff_lists_everything_as_added()
    {
        var c = await CreateCourse("Unpublished Preview Course");
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client(f.InstructorA).GetAsync($"/api/studio/courses/{c.Id}/published-preview")).StatusCode);
        var diff = await f.Read<CourseDiffDto>(await f.Client(f.InstructorA).GetAsync($"/api/review/courses/{c.Id}/diff"));
        Assert.Null(diff.BaseVersion);
        Assert.Single(diff.ModulesAdded);
        Assert.Equal(2, diff.LessonsAdded.Count);
    }
}
