using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.YouTube;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.YouTube;

public class ApiKeyFactory() : YouTubeTestFactory(apiKey: true), IAsyncLifetime
{
    public Task InitializeAsync() => InitDb();
    Task IAsyncLifetime.DisposeAsync() => DisposeAsync().AsTask();
}

internal static class Http
{
    public static async Task<string?> ProblemType(this HttpResponseMessage r)
    {
        var body = await r.Content.ReadAsStringAsync();
        try { using var d = JsonDocument.Parse(body); return d.RootElement.TryGetProperty("type", out var t) ? t.GetString() : null; }
        catch (JsonException) { return null; }
    }

    public static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web)
    { Converters = { new System.Text.Json.Serialization.JsonStringEnumConverter() } };

    public static async Task<T> Read<T>(this HttpResponseMessage r) => (await r.Content.ReadFromJsonAsync<T>(Json))!;
}

public class VideoLinkTests(ApiKeyFactory f) : IClassFixture<ApiKeyFactory>
{
    private static string NewId() => Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Replace('+', '-').Replace('/', '_')[..11];
    private static string NewChannel() => "UC" + Guid.NewGuid().ToString("N")[..22];

    private async Task<(HttpClient C, Guid Lesson, Guid Channel, string YtChannel, Guid Course)> Setup(CourseStatus status = CourseStatus.Draft)
    {
        var (uid, c) = await f.User(Roles.Instructor);
        var (course, _, lesson) = await f.Course(uid, status);
        var yt = NewChannel();
        var ch = await f.Channel(yt);
        return (c, lesson, ch, yt, course);
    }

    private static object Body(string url, Guid channel, bool rights = true, string? title = null, int? duration = null) =>
        new { url, channelId = channel, rightsDeclared = rights, rightsDeclarationText = "I own this", title, durationSeconds = duration };

    [Fact]
    public async Task Valid_video_becomes_ready_and_asset_is_reused()
    {
        var (c, lesson, ch, yt, _) = await Setup();
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, "unlisted", duration: "PT1H2M3S", title: "Intro");
        var r = await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body($"https://youtu.be/{vid}", ch));
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        var dto = await r.Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Ready, dto.Status);
        Assert.Equal(3723, dto.DurationSeconds);
        Assert.Equal("Intro", dto.Title);
        Assert.Equal(yt, dto.ObservedChannelId);
        Assert.False(dto.MetadataEnteredManually);

        var r2 = await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body($"https://www.youtube.com/watch?v={vid}", ch));
        Assert.Equal(dto.Id, (await r2.Read<VideoAssetDto>()).Id);
        var linked = await f.WithDb(db => db.Lessons.Where(l => l.Id == lesson).Select(l => l.VideoAssetId).FirstAsync());
        Assert.Equal(dto.Id, linked);
        Assert.Equal(1, await f.WithDb(db => db.VideoAssets.CountAsync(a => a.YouTubeVideoId == vid)));
    }

    [Fact]
    public async Task Wrong_channel_is_409()
    {
        var (c, lesson, ch, _, _) = await Setup();
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, NewChannel());
        var r = await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, ch));
        Assert.Equal(HttpStatusCode.Conflict, r.StatusCode);
        Assert.Equal("wrong_channel", await r.ProblemType());
        Assert.Equal(0, await f.WithDb(db => db.VideoAssets.CountAsync(a => a.YouTubeVideoId == vid)));
    }

    [Fact]
    public async Task Private_video_is_restricted()
    {
        var (c, lesson, ch, yt, _) = await Setup();
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, "private");
        var dto = await (await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, ch))).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Restricted, dto.Status);
        Assert.Equal("private videos cannot be played by learners", dto.StatusReason);
    }

    [Fact]
    public async Task Not_embeddable_is_restricted()
    {
        var (c, lesson, ch, yt, _) = await Setup();
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, embeddable: false);
        var dto = await (await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, ch))).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Restricted, dto.Status);
        Assert.Contains("Embedding", dto.StatusReason);
    }

    [Fact]
    public async Task Still_processing_is_not_ready_and_missing_is_failed()
    {
        var (c, lesson, ch, yt, _) = await Setup();
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, upload: "uploaded");
        Assert.Equal(VideoStatus.Processing, (await (await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, ch))).Read<VideoAssetDto>()).Status);
        var missing = await (await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(NewId(), ch))).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Failed, missing.Status);
        Assert.NotNull(missing.StatusReason);
    }

    [Fact]
    public async Task Quota_error_is_surfaced()
    {
        var (c, lesson, ch, _, _) = await Setup();
        f.Fake.QuotaExceeded = true;
        try
        {
            var r = await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(NewId(), ch));
            Assert.Equal(HttpStatusCode.ServiceUnavailable, r.StatusCode);
            Assert.Equal("youtube_quota_exhausted", await r.ProblemType());
        }
        finally { f.Fake.QuotaExceeded = false; }
    }

    [Fact]
    public async Task Validation_and_permissions()
    {
        var (c, lesson, ch, yt, _) = await Setup();
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt);
        var noRights = await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, ch, rights: false));
        Assert.Equal(HttpStatusCode.BadRequest, noRights.StatusCode);
        Assert.Equal("rights_required", await noRights.ProblemType());

        var badUrl = await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body("https://youtube.com.evil.test/watch?v=" + vid, ch));
        Assert.Equal("invalid_youtube_url", await badUrl.ProblemType());

        var (_, other) = await f.User(Roles.Instructor);
        var forbidden = await other.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, ch));
        Assert.Equal(HttpStatusCode.Forbidden, forbidden.StatusCode);

        var (_, student) = await f.User(Roles.Student);
        Assert.Equal(HttpStatusCode.Forbidden, (await student.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, ch))).StatusCode);

        // A live course must be put into Updating before content changes.
        var (c2, lesson2, ch2, yt2, _) = await Setup(CourseStatus.Published);
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt2);
        var live = await c2.PostAsJsonAsync($"/api/studio/lessons/{lesson2}/video", Body(vid, ch2));
        Assert.Equal("course_not_editable", await live.ProblemType());
    }

    [Fact]
    public async Task Instructor_owned_channel_needs_flag_and_ownership()
    {
        var (uid, c) = await f.User(Roles.Instructor);
        var (_, _, lesson) = await f.Course(uid);
        var yt = NewChannel();
        var owned = await f.Channel(yt, ChannelMode.InstructorOwned, uid);
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt);

        await f.SetFlag(FeatureFlags.InstructorOwnedChannelsEnabled, false);
        Assert.Equal(HttpStatusCode.Forbidden, (await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, owned))).StatusCode);
        var list = await (await c.GetAsync("/api/youtube/channels")).Read<List<ChannelDto>>();
        Assert.DoesNotContain(list, x => x.Id == owned);

        await f.SetFlag(FeatureFlags.InstructorOwnedChannelsEnabled, true);
        try
        {
            Assert.Equal(VideoStatus.Ready, (await (await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, owned))).Read<VideoAssetDto>()).Status);
            var (otherId, other) = await f.User(Roles.Instructor);
            var (_, _, otherLesson) = await f.Course(otherId);
            Assert.Equal(HttpStatusCode.Forbidden, (await other.PostAsJsonAsync($"/api/studio/lessons/{otherLesson}/video", Body(vid, owned))).StatusCode);
            list = await (await c.GetAsync("/api/youtube/channels")).Read<List<ChannelDto>>();
            Assert.Contains(list, x => x.Id == owned);
            Assert.All(list, x => Assert.DoesNotContain("refresh", JsonSerializer.Serialize(x)));
        }
        finally { await f.SetFlag(FeatureFlags.InstructorOwnedChannelsEnabled, false); }
    }

    [Fact]
    public async Task Recheck_and_background_checker_detect_changes()
    {
        var (c, lesson, ch, yt, course) = await Setup();
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt);
        var dto = await (await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video", Body(vid, ch))).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Ready, dto.Status);

        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, "private");
        var re = await (await c.PostAsync($"/api/studio/videos/{dto.Id}/recheck", null)).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Restricted, re.Status);
        Assert.NotNull(re.LastCheckedAt);

        // Background pass: live course, Ready video that was removed from YouTube.
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt);
        await c.PostAsync($"/api/studio/videos/{dto.Id}/recheck", null);
        await f.WithDb(async db => { (await db.Courses.FirstAsync(x => x.Id == course)).Status = CourseStatus.Published; await db.SaveChangesAsync(); });
        f.Fake.Videos.TryRemove(vid, out _);
        using (var scope = f.Services.CreateScope())
        {
            var r = await scope.ServiceProvider.GetRequiredService<AvailabilityCheckService>().RunOnce(default);
            Assert.True(r.Checked >= 1);
        }
        var after = await f.WithDb(db => db.VideoAssets.AsNoTracking().FirstAsync(a => a.Id == dto.Id));
        Assert.Equal(VideoStatus.Failed, after.Status);
        Assert.NotNull(after.StatusReason);

        var (_, admin) = await f.User(Roles.Admin);
        var page = await (await admin.GetAsync("/api/admin/youtube/videos?status=Failed")).Read<PagedResult<VideoAssetDto>>();
        Assert.Contains(page.Items, x => x.Id == dto.Id);
        Assert.All(page.Items, x => Assert.Equal(VideoStatus.Failed, x.Status));
    }

    [Fact]
    public async Task Playlist_import_creates_draft_module_without_publishing()
    {
        var (c, _, ch, yt, course) = await Setup();
        var ids = new[] { NewId(), NewId(), NewId() };
        foreach (var id in ids) f.Fake.Videos[id] = FakeYouTube.Video(id, yt, title: "T" + id);
        f.Fake.Videos[ids[2]] = FakeYouTube.Video(ids[2], yt, "private");
        var pl = "PL" + Guid.NewGuid().ToString("N")[..16];
        f.Fake.Playlists[pl] = ids.ToList();

        var prev = await c.PostAsJsonAsync($"/api/studio/courses/{course}/import-playlist", new { playlistUrl = $"https://www.youtube.com/playlist?list={pl}", channelId = ch });
        Assert.Equal(HttpStatusCode.OK, prev.StatusCode);
        var preview = await prev.Read<PlaylistPreviewDto>();
        Assert.Equal(3, preview.Items.Count);
        Assert.Equal(VideoStatus.Restricted, preview.Items[2].ExpectedStatus);

        var commit = await c.PostAsJsonAsync($"/api/studio/courses/{course}/import-playlist/commit", new
        {
            moduleTitle = "Imported", channelId = ch, rightsDeclared = true,
            items = new[] { new { videoId = ids[1], title = "Second first" }, new { videoId = ids[0], title = "Then first" }, new { videoId = ids[2], title = "Private one" } },
        });
        Assert.Equal(HttpStatusCode.Created, commit.StatusCode);
        var res = await commit.Read<PlaylistCommitResult>();
        Assert.Equal(["Second first", "Then first", "Private one"], res.Lessons.Select(l => l.Title).ToArray());
        Assert.Equal(VideoStatus.Ready, res.Lessons[0].Video.Status);
        Assert.Equal(VideoStatus.Restricted, res.Lessons[2].Video.Status);
        var status = await f.WithDb(db => db.Courses.Where(x => x.Id == course).Select(x => x.Status).FirstAsync());
        Assert.Equal(CourseStatus.Draft, status);
        Assert.Equal(2, await f.WithDb(db => db.Modules.CountAsync(m => m.CourseId == course)));

        f.Fake.Videos[ids[0]] = FakeYouTube.Video(ids[0], NewChannel());
        var wrong = await c.PostAsJsonAsync($"/api/studio/courses/{course}/import-playlist/commit", new
        { moduleTitle = "X", channelId = ch, rightsDeclared = true, items = new[] { new { videoId = ids[0], title = "a" } } });
        Assert.Equal("wrong_channel", await wrong.ProblemType());
    }
}
