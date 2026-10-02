using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;
using System.Text;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.YouTube;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.YouTube;

public class PublishingFactory : YouTubeTestFactory, IAsyncLifetime
{
    public static readonly string Root = Path.Combine(Path.GetTempPath(), "mastemy-res-" + Guid.NewGuid().ToString("N"));
    public PublishingFactory() : base(extra: new() { ["Resources:RootPath"] = Root }) { }
    public async Task InitializeAsync() { Directory.CreateDirectory(Root); await InitDb(); }
    async Task IAsyncLifetime.DisposeAsync()
    {
        await DisposeAsync();
        try { Directory.Delete(Root, true); } catch { /* best effort */ }
    }
}

public class PublishingTests(PublishingFactory f) : IClassFixture<PublishingFactory>
{
    private static string NewVid() => "V" + Guid.NewGuid().ToString("N")[..10];

    /// <summary>Course on <paramref name="channel"/> with two modules: M1 (L1, L2), M2 (L3); each lesson linked to a video on that channel.</summary>
    private async Task<(Guid Course, string Code, Guid[] Lessons, Guid[] Assets, string[] Videos)> Course(Guid author, Guid channel)
    {
        var (courseId, moduleId, l1) = await f.Course(author);
        var videos = new[] { NewVid(), NewVid(), NewVid() };
        var assets = videos.Select(v => new VideoAsset { YouTubeVideoId = v, ChannelId = channel, UploaderId = author, Status = VideoStatus.Ready, Title = v }).ToArray();
        var m2 = new CourseModule { CourseId = courseId, Code = "M2", Title = "Two", SortOrder = 2 };
        var l2 = new Lesson { ModuleId = moduleId, Code = "L2", Title = "L2", SortOrder = 2 };
        var l3 = new Lesson { ModuleId = m2.Id, Code = "L3", Title = "L3", SortOrder = 1 };
        var code = "";
        await f.WithDb(async db =>
        {
            db.VideoAssets.AddRange(assets);
            db.Modules.Add(m2);
            db.Lessons.AddRange(l2, l3);
            await db.SaveChangesAsync();
            var c = await db.Courses.FirstAsync(x => x.Id == courseId);
            c.YouTubeChannelId = channel;
            code = c.Code;
            (await db.Lessons.FirstAsync(x => x.Id == l1)).VideoAssetId = assets[0].Id;
            l2.VideoAssetId = assets[1].Id;
            l3.VideoAssetId = assets[2].Id;
            db.Lessons.UpdateRange(l2, l3);
            await db.SaveChangesAsync();
        });
        return (courseId, code, [l1, l2.Id, l3.Id], assets.Select(a => a.Id).ToArray(), videos);
    }

    private Task<HttpResponseMessage> Sync(HttpClient c, Guid course) => c.PostAsync($"/api/studio/courses/{course}/youtube/playlist/sync", null);

    [Fact]
    public async Task Staff_playlist_sync_creates_once_and_orders_items()
    {
        var ch = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], authorized: true);
        var (author, _) = await f.User(Roles.Instructor);
        var (_, admin) = await f.User(Roles.Admin);
        var (course, code, lessons, _, v) = await Course(author, ch);

        var r1 = await Sync(admin, course);
        Assert.Equal(HttpStatusCode.OK, r1.StatusCode);
        var res1 = await r1.Read<PlaylistSyncResult>();
        Assert.True(res1.Created);
        Assert.Equal(3, res1.Inserted);
        Assert.Equal(PublishingService.PlaylistTitlePrefix + code, f.Fake.OwnPlaylists[res1.PlaylistId]);
        Assert.Equal(v, f.Fake.Playlists[res1.PlaylistId]);

        // Idempotent: found by title, nothing to change.
        var res2 = await (await Sync(admin, course)).Read<PlaylistSyncResult>();
        Assert.False(res2.Created);
        Assert.Equal(res1.PlaylistId, res2.PlaylistId);
        Assert.Equal((0, 0, 0), (res2.Inserted, res2.Moved, res2.Removed));
        Assert.Single(f.Fake.OwnPlaylists, kv => kv.Value == PublishingService.PlaylistTitlePrefix + code);

        // Reorder lessons in module 1, unlink lesson 3, and add a foreign item on YouTube.
        await f.WithDb(async db =>
        {
            (await db.Lessons.FirstAsync(x => x.Id == lessons[0])).SortOrder = 5;
            (await db.Lessons.FirstAsync(x => x.Id == lessons[2])).VideoAssetId = null;
            await db.SaveChangesAsync();
        });
        lock (f.Fake.Playlists) f.Fake.Playlists[res1.PlaylistId].Insert(0, "ForeignVid1");
        var res3 = await (await Sync(admin, course)).Read<PlaylistSyncResult>();
        Assert.Equal(2, res3.Removed);
        Assert.Equal(new[] { v[1], v[0] }, f.Fake.Playlists[res1.PlaylistId]);
        Assert.True(await f.WithDb(db => db.AuditLogs.AnyAsync(a => a.Action == "youtube.playlist.synced" && a.EntityId == course.ToString())));
    }

    [Fact]
    public async Task Playlist_sync_authorization_rules()
    {
        var managed = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], authorized: true);
        var (author, authorClient) = await f.User(Roles.Instructor);
        var (course, _, _, _, _) = await Course(author, managed);
        Assert.Equal(HttpStatusCode.Forbidden, (await Sync(authorClient, course)).StatusCode); // Mastemy-managed: staff only

        var owned = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], ChannelMode.InstructorOwned, author, authorized: true);
        var (course2, _, _, _, v) = await Course(author, owned);
        var ok = await Sync(authorClient, course2);
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        Assert.Equal(v, f.Fake.Playlists[(await ok.Read<PlaylistSyncResult>()).PlaylistId]);

        var (_, stranger) = await f.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await Sync(stranger, course2)).StatusCode);

        var unauthorized = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], ChannelMode.InstructorOwned, author);
        var (course3, _, _, _, _) = await Course(author, unauthorized);
        Assert.Equal("channel_not_authorized", await (await Sync(authorClient, course3)).ProblemType());

        var (noChannel, _, _) = await f.Course(author);
        Assert.Equal("course_channel_missing", await (await Sync(authorClient, noChannel)).ProblemType());
    }

    [Fact]
    public async Task Revoked_and_quota_errors_have_clear_codes()
    {
        var (author, _) = await f.User(Roles.Instructor);
        var (_, admin) = await f.User(Roles.Admin);
        var revoked = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], authorized: true);
        var (course, _, _, _, _) = await Course(author, revoked);
        f.Fake.TokenRevoked = true;
        try
        {
            var r = await Sync(admin, course);
            Assert.Equal(HttpStatusCode.Conflict, r.StatusCode);
            Assert.Equal("channel_not_authorized", await r.ProblemType());
        }
        finally { f.Fake.TokenRevoked = false; }

        f.Fake.QuotaExceeded = true;
        try
        {
            var r = await Sync(admin, course);
            Assert.Equal(HttpStatusCode.ServiceUnavailable, r.StatusCode);
            Assert.Equal(YouTubeErrors.QuotaExhausted, await r.ProblemType());
        }
        finally { f.Fake.QuotaExceeded = false; }

        await f.WithDb(async db =>
        {
            (await db.YouTubeChannels.FirstAsync(c => c.Id == revoked)).GrantedScopes = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly";
            await db.SaveChangesAsync();
        });
        Assert.Equal(PublishingService.ScopeMissing, await (await Sync(admin, course)).ProblemType());
    }

    private static MultipartFormDataContent Image(byte[] bytes, string type)
    {
        var form = new MultipartFormDataContent();
        var file = new ByteArrayContent(bytes);
        file.Headers.ContentType = new MediaTypeHeaderValue(type);
        form.Add(file, "file", "thumb");
        return form;
    }

    [Fact]
    public async Task Thumbnail_is_validated_and_relayed_without_storage()
    {
        var (author, authorClient) = await f.User(Roles.Instructor);
        var owned = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], ChannelMode.InstructorOwned, author, authorized: true);
        var (_, _, _, assets, v) = await Course(author, owned);
        byte[] png = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 1, 2, 3, 4];

        var ok = await authorClient.PostAsync($"/api/studio/videos/{assets[0]}/thumbnail", Image(png, "image/png"));
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        Assert.Contains($"{v[0]}:image/png:{png.Length}", f.Fake.Thumbnails);

        var gif = await authorClient.PostAsync($"/api/studio/videos/{assets[0]}/thumbnail", Image("GIF89a..."u8.ToArray(), "image/gif"));
        Assert.Equal("invalid_thumbnail", await gif.ProblemType());

        var big = new byte[2 * 1024 * 1024 + 1]; big[0] = 0xFF; big[1] = 0xD8; big[2] = 0xFF;
        var tooBig = await authorClient.PostAsync($"/api/studio/videos/{assets[0]}/thumbnail", Image(big, "image/jpeg"));
        Assert.True(tooBig.StatusCode is HttpStatusCode.BadRequest or HttpStatusCode.RequestEntityTooLarge);

        var (_, stranger) = await f.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.NotFound, (await stranger.PostAsync($"/api/studio/videos/{assets[0]}/thumbnail", Image(png, "image/png"))).StatusCode);
    }

    private async Task<Guid> CaptionFile(Guid course, Guid? lesson, Guid author, string kind = "Caption", string? storageKey = null)
    {
        var bytes = Encoding.UTF8.GetBytes("WEBVTT\n\n00:00.000 --> 00:01.000\nHello\n");
        var sha = Convert.ToHexString(SHA256.HashData(bytes)).ToLowerInvariant();
        var key = storageKey ?? Path.Combine(sha[..2], sha);
        if (storageKey is null)
        {
            Directory.CreateDirectory(Path.Combine(PublishingFactory.Root, sha[..2]));
            await File.WriteAllBytesAsync(Path.Combine(PublishingFactory.Root, key), bytes);
        }
        var rf = new ResourceFile
        {
            CourseId = course, LessonId = lesson, Kind = kind, Language = "en", FileName = "lesson-1.en.vtt", ContentType = "text/vtt",
            SizeBytes = bytes.Length, Sha256 = sha, StorageKey = key, UploadedBy = author,
        };
        await f.WithDb(async db => { db.ResourceFiles.Add(rf); await db.SaveChangesAsync(); });
        return rf.Id;
    }

    [Fact]
    public async Task Caption_push_reads_resource_file_and_inserts_caption()
    {
        var (author, authorClient) = await f.User(Roles.Instructor);
        var owned = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], ChannelMode.InstructorOwned, author, authorized: true);
        var (course, _, lessons, assets, v) = await Course(author, owned);
        var rf = await CaptionFile(course, lessons[0], author);

        var ok = await authorClient.PostAsJsonAsync($"/api/studio/videos/{assets[0]}/captions", new { resourceFileId = rf });
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        var res = await ok.Read<CaptionPushResult>();
        Assert.Equal(v[0], res.VideoId);
        Assert.Contains(f.Fake.Captions, b => b.Contains(v[0]) && b.Contains("WEBVTT") && b.Contains("\"language\":\"en\""));

        // Caption bound to lesson 1 cannot be pushed to lesson 2's video.
        Assert.Equal("caption_course_mismatch", await (await authorClient.PostAsJsonAsync($"/api/studio/videos/{assets[1]}/captions", new { resourceFileId = rf })).ProblemType());

        var notCaption = await CaptionFile(course, null, author, kind: "Resource");
        Assert.Equal("not_a_caption", await (await authorClient.PostAsJsonAsync($"/api/studio/videos/{assets[0]}/captions", new { resourceFileId = notCaption })).ProblemType());

        var escape = await CaptionFile(course, null, author, storageKey: "../../etc/passwd");
        Assert.Equal("resource_missing", await (await authorClient.PostAsJsonAsync($"/api/studio/videos/{assets[0]}/captions", new { resourceFileId = escape })).ProblemType());

        var (_, stranger) = await f.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await stranger.PostAsJsonAsync($"/api/studio/videos/{assets[0]}/captions", new { resourceFileId = rf })).StatusCode);

        f.Fake.ScopeInsufficient = true;
        try
        {
            var r = await authorClient.PostAsJsonAsync($"/api/studio/videos/{assets[0]}/captions", new { resourceFileId = rf });
            Assert.Equal(HttpStatusCode.Conflict, r.StatusCode);
            Assert.Equal(PublishingService.ScopeMissing, await r.ProblemType());
        }
        finally { f.Fake.ScopeInsufficient = false; }
    }

    [Fact]
    public async Task Managed_channel_caption_push_requires_staff()
    {
        var (author, authorClient) = await f.User(Roles.Instructor);
        var managed = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], authorized: true);
        var (course, _, lessons, assets, _) = await Course(author, managed);
        var rf = await CaptionFile(course, lessons[0], author);
        Assert.Equal(HttpStatusCode.Forbidden, (await authorClient.PostAsJsonAsync($"/api/studio/videos/{assets[0]}/captions", new { resourceFileId = rf })).StatusCode);
        var (_, admin) = await f.User(Roles.Admin);
        Assert.Equal(HttpStatusCode.OK, (await admin.PostAsJsonAsync($"/api/studio/videos/{assets[0]}/captions", new { resourceFileId = rf })).StatusCode);
    }
}
