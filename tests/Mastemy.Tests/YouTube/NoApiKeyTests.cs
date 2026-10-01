using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.YouTube;

namespace Mastemy.Tests.YouTube;

public class NoApiKeyFactory() : YouTubeTestFactory(apiKey: false, oauth: false), IAsyncLifetime
{
    public Task InitializeAsync() => InitDb();
    Task IAsyncLifetime.DisposeAsync() => DisposeAsync().AsTask();
}

public class NoApiKeyTests(NoApiKeyFactory f) : IClassFixture<NoApiKeyFactory>
{
    private async Task<(HttpClient C, Guid Lesson, Guid Channel)> Setup()
    {
        var (uid, c) = await f.User(Roles.Instructor);
        var (_, _, lesson) = await f.Course(uid);
        var ch = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22]);
        return (c, lesson, ch);
    }

    [Fact]
    public async Task OEmbed_path_requires_manual_metadata_and_is_not_ready_until_reviewer_confirms()
    {
        var (c, lesson, ch) = await Setup();
        f.Fake.OEmbed["abcdefghijk"] = HttpStatusCode.OK;

        var missing = await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video",
            new { url = "https://youtu.be/abcdefghijk", channelId = ch, rightsDeclared = true });
        Assert.Equal(HttpStatusCode.BadRequest, missing.StatusCode);
        Assert.Equal("manual_metadata_required", await missing.ProblemType());

        var r = await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video",
            new { url = "https://youtu.be/abcdefghijk", channelId = ch, rightsDeclared = true, title = "Manual", durationSeconds = 600 });
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        var dto = await r.Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.InContentReview, dto.Status);
        Assert.True(dto.MetadataEnteredManually);
        Assert.Equal(600, dto.DurationSeconds);
        Assert.Null(dto.ObservedChannelId);
        Assert.DoesNotContain(f.Fake.Requests, x => x.Contains("/videos"));

        Assert.Equal(HttpStatusCode.Forbidden, (await c.PostAsJsonAsync($"/api/admin/youtube/videos/{dto.Id}/confirm", new { approve = true })).StatusCode);
        var (_, reviewer) = await f.User(Roles.Reviewer);
        var ok = await (await reviewer.PostAsJsonAsync($"/api/admin/youtube/videos/{dto.Id}/confirm", new { approve = true })).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Ready, ok.Status);
    }

    [Fact]
    public async Task OEmbed_unauthorized_or_missing_is_not_ready()
    {
        var (c, lesson, ch) = await Setup();
        f.Fake.OEmbed["privatevid1"] = HttpStatusCode.Unauthorized;
        var r = await (await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video",
            new { url = "privatevid1", channelId = ch, rightsDeclared = true, title = "x", durationSeconds = 5 })).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Restricted, r.Status);
        var gone = await (await c.PostAsJsonAsync($"/api/studio/lessons/{lesson}/video",
            new { url = "gonegonegon", channelId = ch, rightsDeclared = true, title = "x", durationSeconds = 5 })).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Failed, gone.Status);
    }

    [Fact]
    public async Task Playlist_import_needs_api_key_and_oauth_unconfigured_is_503()
    {
        var (uid, c) = await f.User(Roles.Instructor);
        var (course, _, _) = await f.Course(uid);
        var ch = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22]);
        var r = await c.PostAsJsonAsync($"/api/studio/courses/{course}/import-playlist", new { playlistUrl = "PLabcdefghijklmnop", channelId = ch });
        Assert.Equal("youtube_api_key_required", await r.ProblemType());

        var (_, admin) = await f.User(Roles.Admin);
        var o = await admin.GetAsync("/api/youtube/oauth/start?mode=MastemyManaged");
        Assert.Equal(HttpStatusCode.ServiceUnavailable, o.StatusCode);
        Assert.Equal("youtube_oauth_not_configured", await o.ProblemType());
    }
}
