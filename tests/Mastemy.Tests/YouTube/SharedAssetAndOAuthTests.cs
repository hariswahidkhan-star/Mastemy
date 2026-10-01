using System.Net;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.YouTube;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.YouTube;

public class SharedAssetTests(ApiKeyFactory f) : IClassFixture<ApiKeyFactory>
{
    private static string NewId() => Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Replace('+', '-').Replace('/', '_')[..11];
    private static string NewChannel() => "UC" + Guid.NewGuid().ToString("N")[..22];

    private static object Body(string vid, Guid channel, string? title = null) =>
        new { url = vid, channelId = channel, rightsDeclared = true, rightsDeclarationText = "mine", title, durationSeconds = (int?)null };

    [Fact]
    public async Task Other_instructor_gets_own_asset_and_cannot_tamper_with_shared_one()
    {
        var yt = NewChannel();
        var ch = await f.Channel(yt);
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, title: "Original");

        var (a, ca) = await f.User(Roles.Instructor);
        var (_, _, lessonA) = await f.Course(a);
        var dtoA = await (await ca.PostAsJsonAsync($"/api/studio/lessons/{lessonA}/video", Body(vid, ch))).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Ready, dtoA.Status);

        // Attacker links the same video with a different title while YouTube reports it private.
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, privacy: "private", title: "Original");
        var (b, cb) = await f.User(Roles.Instructor);
        var (_, _, lessonB) = await f.Course(b);
        var r = await cb.PostAsJsonAsync($"/api/studio/lessons/{lessonB}/video", Body(vid, ch, "Defaced"));
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        var dtoB = await r.Read<VideoAssetDto>();
        Assert.NotEqual(dtoA.Id, dtoB.Id);

        var shared = await f.WithDb(db => db.VideoAssets.AsNoTracking().FirstAsync(x => x.Id == dtoA.Id));
        Assert.Equal("Original", shared.Title);
        Assert.Equal(VideoStatus.Ready, shared.Status);
        Assert.Equal(dtoB.Id, await f.WithDb(db => db.Lessons.Where(l => l.Id == lessonB).Select(l => l.VideoAssetId).FirstAsync()));
        Assert.Equal(dtoA.Id, await f.WithDb(db => db.Lessons.Where(l => l.Id == lessonA).Select(l => l.VideoAssetId).FirstAsync()));
    }

    [Fact]
    public async Task Transient_non_ready_result_does_not_flip_ready_asset_on_live_lessons()
    {
        var yt = NewChannel();
        var ch = await f.Channel(yt);
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt);
        var (a, ca) = await f.User(Roles.Instructor);
        var (liveCourse, _, liveLesson) = await f.Course(a);
        var dto = await (await ca.PostAsJsonAsync($"/api/studio/lessons/{liveLesson}/video", Body(vid, ch))).Read<VideoAssetDto>();
        Assert.Equal(VideoStatus.Ready, dto.Status);
        await f.WithDb(db => db.Courses.Where(c => c.Id == liveCourse).ExecuteUpdateAsync(s => s.SetProperty(c => c.Status, CourseStatus.Published)));

        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, upload: "uploaded"); // still processing (transient)
        var (_, _, draftLesson) = await f.Course(a);
        var again = await (await ca.PostAsJsonAsync($"/api/studio/lessons/{draftLesson}/video", Body(vid, ch))).Read<VideoAssetDto>();
        Assert.Equal(dto.Id, again.Id);
        Assert.Equal(VideoStatus.Ready, again.Status);
        Assert.Equal(VideoStatus.Ready, await f.WithDb(db => db.VideoAssets.Where(x => x.Id == dto.Id).Select(x => x.Status).FirstAsync()));
    }

    [Fact]
    public async Task Playlist_import_does_not_mutate_asset_of_other_instructor()
    {
        var yt = NewChannel();
        var ch = await f.Channel(yt);
        var vid = NewId();
        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, title: "Original");
        var (a, ca) = await f.User(Roles.Instructor);
        var (_, _, lessonA) = await f.Course(a);
        var dtoA = await (await ca.PostAsJsonAsync($"/api/studio/lessons/{lessonA}/video", Body(vid, ch))).Read<VideoAssetDto>();

        f.Fake.Videos[vid] = FakeYouTube.Video(vid, yt, privacy: "private", title: "Original");
        var (b, cb) = await f.User(Roles.Instructor);
        var (courseB, _, _) = await f.Course(b);
        var r = await cb.PostAsJsonAsync($"/api/studio/courses/{courseB}/import-playlist/commit", new
        {
            moduleTitle = "Imported", channelId = ch, rightsDeclared = true, rightsDeclarationText = "mine",
            items = new[] { new { videoId = vid, title = "Defaced" } },
        });
        Assert.Equal(HttpStatusCode.Created, r.StatusCode);
        var res = await r.Read<PlaylistCommitResult>();
        Assert.NotEqual(dtoA.Id, res.Lessons[0].Video.Id);
        var shared = await f.WithDb(db => db.VideoAssets.AsNoTracking().FirstAsync(x => x.Id == dtoA.Id));
        Assert.Equal("Original", shared.Title);
        Assert.Equal(VideoStatus.Ready, shared.Status);
    }
}

public class ManualPathNoDowngradeTests(NoApiKeyFactory f) : IClassFixture<NoApiKeyFactory>
{
    [Fact]
    public async Task Manual_oembed_link_never_downgrades_ready_asset()
    {
        var (uid, c) = await f.User(Roles.Instructor);
        var (_, _, lesson1) = await f.Course(uid);
        var (_, _, lesson2) = await f.Course(uid);
        var ch = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22]);
        const string vid = "rEaDyVid001";
        var asset = new VideoAsset { YouTubeVideoId = vid, ChannelId = ch, Title = "Confirmed", DurationSeconds = 100, Status = VideoStatus.Ready, UploaderId = uid, RightsDeclared = true };
        await f.WithDb(async db =>
        {
            db.VideoAssets.Add(asset);
            await db.SaveChangesAsync();
            await db.Lessons.Where(l => l.Id == lesson1).ExecuteUpdateAsync(s => s.SetProperty(l => l.VideoAssetId, asset.Id));
        });
        f.Fake.OEmbed[vid] = HttpStatusCode.OK;
        var r = await c.PostAsJsonAsync($"/api/studio/lessons/{lesson2}/video",
            new { url = vid, channelId = ch, rightsDeclared = true, title = "Manual", durationSeconds = 120 });
        Assert.Equal(HttpStatusCode.OK, r.StatusCode);
        var dto = await r.Read<VideoAssetDto>();
        Assert.Equal(asset.Id, dto.Id);
        Assert.Equal(VideoStatus.Ready, dto.Status);
        Assert.Equal(VideoStatus.Ready, await f.WithDb(db => db.VideoAssets.Where(x => x.Id == asset.Id).Select(x => x.Status).FirstAsync()));
    }
}

public class OAuthStateTests(ApiKeyFactory f) : IClassFixture<ApiKeyFactory>
{
    private async Task<(string State, string Cookie)> Start(HttpClient admin)
    {
        var start = await admin.GetAsync("/api/youtube/oauth/start?mode=MastemyManaged");
        Assert.Equal(HttpStatusCode.OK, start.StatusCode);
        var setCookie = start.Headers.GetValues("Set-Cookie").Single(h => h.StartsWith(ChannelService.NonceCookieName + "="));
        Assert.Contains("httponly", setCookie, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("samesite=lax", setCookie, StringComparison.OrdinalIgnoreCase);
        var url = new Uri((await start.Read<OAuthStartDto>()).AuthorizationUrl);
        return (System.Web.HttpUtility.ParseQueryString(url.Query)["state"]!, setCookie.Split(';')[0]);
    }

    private Task<HttpResponseMessage> Callback(HttpClient c, string state, string? cookie)
    {
        var req = new HttpRequestMessage(HttpMethod.Get, $"/api/youtube/oauth/callback?code=abc&state={Uri.EscapeDataString(state)}");
        if (cookie is not null) req.Headers.Add("Cookie", cookie);
        return c.SendAsync(req);
    }

    private static HttpClient Fresh(ApiKeyFactory f) => f.CreateClient(new() { HandleCookies = false });

    [Fact]
    public async Task Callback_without_matching_cookie_is_rejected()
    {
        var (_, admin) = await f.User(Roles.Admin);
        var (state, _) = await Start(admin);
        var (_, other) = await Start(admin);
        var anon = Fresh(f);
        Assert.Equal("oauth_state_invalid", await (await Callback(anon, state, null)).ProblemType());
        Assert.Equal("oauth_state_invalid", await (await Callback(anon, state, other)).ProblemType());
    }

    [Fact]
    public async Task Nonce_is_single_use()
    {
        var (_, admin) = await f.User(Roles.Admin);
        var (state, cookie) = await Start(admin);
        f.Fake.OwnChannelId = "UC" + Guid.NewGuid().ToString("N")[..22];
        var anon = Fresh(f);
        Assert.Equal(HttpStatusCode.OK, (await Callback(anon, state, cookie)).StatusCode);
        var replay = await Callback(anon, state, cookie);
        Assert.Equal(HttpStatusCode.BadRequest, replay.StatusCode);
        Assert.Equal("oauth_state_invalid", await replay.ProblemType());
    }

    [Fact]
    public async Task Authenticated_callback_must_be_same_user()
    {
        var (_, admin) = await f.User(Roles.Admin);
        var (state, cookie) = await Start(admin);
        var (_, otherAdmin) = await f.User(Roles.Admin);
        var r = await Callback(otherAdmin, state, cookie);
        Assert.Equal(HttpStatusCode.BadRequest, r.StatusCode);
        Assert.Equal("oauth_state_invalid", await r.ProblemType());
    }
}
