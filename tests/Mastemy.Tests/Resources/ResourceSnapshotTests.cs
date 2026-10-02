using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Resources;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using static Mastemy.Tests.Resources.ResourcesFixture;

namespace Mastemy.Tests.Resources;

/// <summary>Learners are served the resource files frozen in the published snapshot; blobs live until no snapshot serves them.</summary>
public class ResourceSnapshotTests(ResourcesFixture fx) : IClassFixture<ResourcesFixture>
{
    private string BlobPath(Guid courseId, string sha) => Path.Combine(fx.RootPath, courseId.ToString("N"), sha[..2], sha[2..4], sha);

    private static string UploadUrl(Guid courseId, Guid? lessonId, bool premium = false) =>
        $"/api/studio/courses/{courseId}/resources?kind=Resource&isPremium={premium.ToString().ToLowerInvariant()}"
        + (lessonId is { } l ? $"&lessonId={l}" : "");

    /// <summary>Makes the course publishable (description, outcome, ready videos), approves it and publishes as staff.</summary>
    private async Task Publish(Guid courseId)
    {
        var (_, admin) = await fx.User(Roles.Admin);
        await fx.WithDb(async db =>
        {
            var c = await db.Courses.SingleAsync(x => x.Id == courseId);
            c.Description = "About"; c.Outcomes = "Outcome"; c.Status = CourseStatus.Approved;
            var lessons = await db.Lessons.Where(l => db.Modules.Any(m => m.Id == l.ModuleId && m.CourseId == courseId) && l.VideoAssetId == null).ToListAsync();
            foreach (var l in lessons)
            {
                var v = new VideoAsset { YouTubeVideoId = "rs" + Guid.NewGuid().ToString("N")[..9], Title = "v", DurationSeconds = 60, Status = VideoStatus.Ready, UploaderId = c.OwnerId };
                db.VideoAssets.Add(v);
                l.VideoAssetId = v.Id;
            }
            await db.SaveChangesAsync();
        });
        await Read<CourseStatusDto>(await admin.PostAsync($"/api/admin/courses/{courseId}/publish", null));
    }

    private static async Task StartUpdate(HttpClient author, Guid courseId) =>
        await Read<CourseStatusDto>(await author.PostAsync($"/api/studio/courses/{courseId}/start-update", null));

    private async Task<(Guid AuthorId, HttpClient Author, Course Course, Guid LessonId)> DraftCourse()
    {
        var (aid, author) = await fx.User(Roles.Instructor);
        var (course, lessonId) = await fx.Course(aid, CourseStatus.Draft);
        return (aid, author, course, lessonId);
    }

    [Fact]
    public async Task New_draft_lesson_resource_is_not_listable_or_downloadable_until_publish()
    {
        var (_, author, course, _) = await DraftCourse();
        await Publish(course.Id);
        await StartUpdate(author, course.Id);
        var moduleId = await fx.WithDb(db => db.Modules.Where(m => m.CourseId == course.Id).Select(m => m.Id).FirstAsync());
        var newLesson = new Lesson { ModuleId = moduleId, Code = "L02", Title = "Draft lesson", SortOrder = 2 };
        await fx.WithDb(async db => { db.Lessons.Add(newLesson); await db.SaveChangesAsync(); });
        var dto = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course.Id, newLesson.Id), File("new.pdf", Pdf(90, (byte)'n'))));

        var anon = fx.Factory.CreateClient();
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/learn/lessons/{newLesson.Id}/resources")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/learn/resources/{dto.Id}/download")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/learn/lessons/{newLesson.Id}/captions")).StatusCode);
        // The author previews the working copy.
        Assert.Single(await Read<List<LearnerResourceDto>>(await author.GetAsync($"/api/learn/lessons/{newLesson.Id}/resources")));
        Assert.Equal(HttpStatusCode.OK, (await author.GetAsync($"/api/learn/resources/{dto.Id}/download")).StatusCode);

        await Publish(course.Id);
        Assert.Single(await Read<List<LearnerResourceDto>>(await anon.GetAsync($"/api/learn/lessons/{newLesson.Id}/resources")));
        Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync($"/api/learn/resources/{dto.Id}/download")).StatusCode);
    }

    [Fact]
    public async Task Premium_flip_in_draft_takes_effect_on_publish()
    {
        var (_, author, course, lessonId) = await DraftCourse();
        var dto = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course.Id, lessonId), File("flip.pdf", Pdf(70, (byte)'f'))));
        await Publish(course.Id);
        await StartUpdate(author, course.Id);
        Assert.True((await Read<ResourceDto>(await author.PatchAsync($"/api/studio/resources/{dto.Id}", JsonBody(new { isPremium = true })))).IsPremium);

        var anon = fx.Factory.CreateClient();
        Assert.False(Assert.Single(await Read<List<LearnerResourceDto>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/resources"))).IsPremium);
        Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync($"/api/learn/resources/{dto.Id}/download")).StatusCode);

        await Publish(course.Id);
        var row = Assert.Single(await Read<List<LearnerResourceDto>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/resources")));
        Assert.True(row.Locked);
        Assert.Equal(HttpStatusCode.Unauthorized, (await anon.GetAsync($"/api/learn/resources/{dto.Id}/download")).StatusCode);
    }

    [Fact]
    public async Task Deleted_resource_stays_downloadable_until_republish_then_row_and_blob_are_purged()
    {
        var (_, author, course, lessonId) = await DraftCourse();
        var dto = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course.Id, lessonId), File("gone.pdf", Pdf(80, (byte)'g'))));
        await Publish(course.Id);
        await StartUpdate(author, course.Id);
        Assert.Equal(HttpStatusCode.NoContent, (await author.DeleteAsync($"/api/studio/resources/{dto.Id}")).StatusCode);
        Assert.Empty(await Read<List<ResourceDto>>(await author.GetAsync($"/api/studio/courses/{course.Id}/resources")));
        Assert.Equal(HttpStatusCode.NotFound, (await author.DeleteAsync($"/api/studio/resources/{dto.Id}")).StatusCode);

        var anon = fx.Factory.CreateClient();
        Assert.Single(await Read<List<LearnerResourceDto>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/resources")));
        var dl = await anon.GetAsync($"/api/learn/resources/{dto.Id}/download");
        Assert.Equal(HttpStatusCode.OK, dl.StatusCode);
        Assert.Equal(Pdf(80, (byte)'g'), await dl.Content.ReadAsByteArrayAsync());
        Assert.True(System.IO.File.Exists(BlobPath(course.Id, dto.Sha256)));
        Assert.NotNull(await fx.WithDb(db => db.ResourceFiles.Where(x => x.Id == dto.Id).Select(x => x.DeletedAt).SingleAsync()));

        await Publish(course.Id);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/learn/resources/{dto.Id}/download")).StatusCode);
        Assert.Empty(await Read<List<LearnerResourceDto>>(await anon.GetAsync($"/api/learn/lessons/{lessonId}/resources")));
        Assert.False(System.IO.File.Exists(BlobPath(course.Id, dto.Sha256)));
        Assert.False(await fx.WithDb(db => db.ResourceFiles.AnyAsync(x => x.Id == dto.Id)));
    }

    [Fact]
    public async Task Replaced_version_is_served_until_republish_then_old_blob_is_purged()
    {
        var (_, author, course, lessonId) = await DraftCourse();
        var v1 = await Read<ResourceDto>(await author.PostAsync(UploadUrl(course.Id, lessonId), File("notes.txt", "version one"u8.ToArray())));
        await Publish(course.Id);
        await StartUpdate(author, course.Id);
        var v2 = await Read<ResourceDto>(await author.PutAsync($"/api/studio/resources/{v1.Id}/file", File("notes.txt", "version two"u8.ToArray())));
        Assert.Equal(2, v2.Version);

        var anon = fx.Factory.CreateClient();
        Assert.Equal("version one", await anon.GetStringAsync($"/api/learn/resources/{v1.Id}/download"));
        Assert.True(System.IO.File.Exists(BlobPath(course.Id, v1.Sha256)));
        Assert.Equal("version two", await author.GetStringAsync($"/api/learn/resources/{v1.Id}/download"));

        await Publish(course.Id);
        Assert.Equal("version two", await anon.GetStringAsync($"/api/learn/resources/{v1.Id}/download"));
        Assert.False(System.IO.File.Exists(BlobPath(course.Id, v1.Sha256)));
        Assert.True(System.IO.File.Exists(BlobPath(course.Id, v2.Sha256)));
    }

    [Fact]
    public async Task Identical_files_in_two_courses_do_not_share_a_blob()
    {
        var (_, authorA, courseA, lessonA) = await DraftCourse();
        var (_, authorB, courseB, lessonB) = await DraftCourse();
        var bytes = Pdf(100, (byte)'s');
        var a = await Read<ResourceDto>(await authorA.PostAsync(UploadUrl(courseA.Id, lessonA), File("same.pdf", bytes)));
        var b = await Read<ResourceDto>(await authorB.PostAsync(UploadUrl(courseB.Id, lessonB), File("same.pdf", bytes)));
        Assert.Equal(a.Sha256, b.Sha256);
        Assert.Equal(HttpStatusCode.NoContent, (await authorA.DeleteAsync($"/api/studio/resources/{a.Id}")).StatusCode);
        Assert.False(System.IO.File.Exists(BlobPath(courseA.Id, a.Sha256))); // never published: removed immediately
        Assert.True(System.IO.File.Exists(BlobPath(courseB.Id, b.Sha256)));
        Assert.Equal(bytes, await (await authorB.GetAsync($"/api/learn/resources/{b.Id}/download")).Content.ReadAsByteArrayAsync());
    }

    [Fact]
    public async Task Transcript_search_is_rate_limited_per_client()
    {
        await using var limited = fx.Factory.WithWebHostBuilder(b => b.UseSetting("Resources:TranscriptPerMinute", "3"));
        var (aid, _) = await fx.User(Roles.Instructor);
        var (_, lessonId) = await fx.Course(aid);
        var anon = limited.CreateClient();
        for (var i = 0; i < 3; i++)
            Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync($"/api/learn/lessons/{lessonId}/transcript?q=hello")).StatusCode);
        var blocked = await anon.GetAsync($"/api/learn/lessons/{lessonId}/transcript?q=hello");
        Assert.Equal((HttpStatusCode)429, blocked.StatusCode);
    }

    [Fact]
    public async Task Caption_cues_are_cached_per_resource_version()
    {
        using var cache = new CaptionCueCache();
        var id = Guid.NewGuid();
        var loads = 0;
        Task<List<CaptionCue>> Load() { loads++; return Task.FromResult(new List<CaptionCue> { new(TimeSpan.Zero, TimeSpan.FromSeconds(1), "x") }); }
        await cache.GetOrLoad(id, 1, Load);
        await cache.GetOrLoad(id, 1, Load);
        Assert.Equal(1, loads);
        await cache.GetOrLoad(id, 2, Load);
        Assert.Equal(2, loads);
    }
}
