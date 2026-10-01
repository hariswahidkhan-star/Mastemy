using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.YouTube;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.YouTube;

public class UploadFactory() : YouTubeTestFactory(apiKey: true), IAsyncLifetime
{
    public async Task InitializeAsync()
    {
        await InitDb();
        await SetFlag(FeatureFlags.YouTubeApiUploadsEnabled, true);
    }
    Task IAsyncLifetime.DisposeAsync() => DisposeAsync().AsTask();
}

public class UploadRelayTests(UploadFactory f) : IClassFixture<UploadFactory>
{
    private const int K256 = 256 * 1024;

    private async Task<(HttpClient C, Guid Lesson, Guid Channel, HttpClient Admin)> Setup(bool authorized = true)
    {
        f.Fake.Received.SetLength(0);
        f.Fake.ChunkRanges.Clear();
        f.Fake.SessionExpired = false;
        f.Fake.QuotaExceeded = false;
        var (uid, c) = await f.User(Roles.Instructor);
        var (_, _, lesson) = await f.Course(uid);
        var ch = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], authorized: authorized);
        var (_, admin) = await f.User(Roles.Admin);
        return (c, lesson, ch, admin);
    }

    private static object Intent(Guid ch, Guid? lesson, long size, string fp = "fp-0123456789") => new
    {
        channelId = ch, lessonId = lesson, title = "Lesson upload", description = "desc", privacyStatus = "unlisted",
        notifySubscribers = false, syntheticMediaDisclosed = true, fileName = "lesson.mp4", fileSize = size, fileFingerprint = fp,
    };

    private async Task<UploadDto> CreateApproved(HttpClient c, HttpClient admin, Guid ch, Guid? lesson, long size, string fp = "fp-0123456789")
    {
        var r = await c.PostAsJsonAsync("/api/youtube/uploads", Intent(ch, lesson, size, fp));
        Assert.Equal(HttpStatusCode.Created, r.StatusCode);
        var dto = await r.Read<UploadDto>();
        Assert.Equal(UploadSessionStatus.AwaitingApproval, dto.Status);
        var a = await admin.PostAsync($"/api/admin/youtube/uploads/{dto.Id}/approve", null);
        Assert.Equal(HttpStatusCode.OK, a.StatusCode);
        return await a.Read<UploadDto>();
    }

    private static Task<HttpResponseMessage> PutChunk(HttpClient c, Guid id, byte[] data, long start, long total, int? len = null)
    {
        var n = len ?? data.Length - (int)start;
        var content = new ByteArrayContent(data, (int)start, n);
        content.Headers.ContentRange = new ContentRangeHeaderValue(start, start + n - 1, total);
        content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        return c.PutAsync($"/api/youtube/uploads/{id}/chunk", content);
    }

    [Fact]
    public async Task Disabled_flag_is_403()
    {
        var (c, lesson, ch, _) = await Setup();
        await f.SetFlag(FeatureFlags.YouTubeApiUploadsEnabled, false);
        try
        {
            var r = await c.PostAsJsonAsync("/api/youtube/uploads", Intent(ch, lesson, 1000));
            Assert.Equal(HttpStatusCode.Forbidden, r.StatusCode);
            Assert.Equal("uploads_disabled", await r.ProblemType());
            var chunk = await PutChunk(c, Guid.NewGuid(), new byte[10], 0, 10);
            Assert.Equal("uploads_disabled", await chunk.ProblemType());
        }
        finally { await f.SetFlag(FeatureFlags.YouTubeApiUploadsEnabled, true); }
    }

    [Fact]
    public async Task Streams_three_chunks_creates_video_asset_and_writes_no_files()
    {
        var (c, lesson, ch, admin) = await Setup();
        var payload = new byte[3 * K256];
        new Random(42).NextBytes(payload);
        var up = await CreateApproved(c, admin, ch, lesson, payload.Length);
        Assert.Equal(UploadSessionStatus.Approved, up.Status);

        var contentRoot = f.Services.GetRequiredService<IWebHostEnvironment>().ContentRootPath;
        var started = DateTime.UtcNow.AddSeconds(-1);
        var before = Snapshot(contentRoot);

        for (var i = 0; i < 3; i++)
        {
            var r = await PutChunk(c, up.Id, payload, i * K256, payload.Length, K256);
            Assert.Equal(HttpStatusCode.OK, r.StatusCode);
            var dto = await r.Read<UploadDto>();
            if (i < 2)
            {
                Assert.Equal(UploadSessionStatus.Uploading, dto.Status);
                Assert.Equal((i + 1) * K256, dto.ConfirmedOffset);
            }
            else
            {
                Assert.Equal(UploadSessionStatus.Completed, dto.Status);
                Assert.Equal(f.Fake.CompletedVideoId, dto.ResultVideoId);
            }
        }

        Assert.Equal(payload, f.Fake.Received.ToArray());
        Assert.Equal(["0-262143/786432", "262144-524287/786432", "524288-786431/786432"], f.Fake.ChunkRanges);
        Assert.Contains("notifySubscribers=false", f.Fake.LastInitiateQuery);
        using (var doc = JsonDocument.Parse(f.Fake.LastInitiateBody!))
        {
            Assert.Equal("unlisted", doc.RootElement.GetProperty("status").GetProperty("privacyStatus").GetString());
            Assert.True(doc.RootElement.GetProperty("status").GetProperty("containsSyntheticMedia").GetBoolean());
        }

        // Nothing written to disk: no new sizeable files in the content root or the temp directory.
        var after = Snapshot(contentRoot);
        Assert.Empty(after.Except(before));
        var newTemp = new DirectoryInfo(Path.GetTempPath()).EnumerateFiles("*", SearchOption.TopDirectoryOnly)
            .Where(x => x.LastWriteTimeUtc >= started && (x.Length >= K256 || x.Name.StartsWith("ASPNETCORE_", StringComparison.Ordinal))).ToList();
        Assert.Empty(newTemp);

        var session = await f.WithDb(db => db.UploadSessions.AsNoTracking().FirstAsync(s => s.Id == up.Id));
        Assert.Null(session.UpstreamSessionUri);
        var asset = await f.WithDb(db => db.VideoAssets.AsNoTracking().FirstAsync(a => a.YouTubeVideoId == f.Fake.CompletedVideoId && a.ChannelId == ch));
        Assert.Equal(VideoStatus.Processing, asset.Status);
        Assert.Equal(asset.Id, await f.WithDb(db => db.Lessons.Where(l => l.Id == lesson).Select(l => l.VideoAssetId).FirstAsync()));

        // The status endpoint never leaks the upstream session URI or tokens.
        var raw = await (await c.GetAsync($"/api/youtube/uploads/{up.Id}")).Content.ReadAsStringAsync();
        Assert.DoesNotContain(FakeYouTube.UploadHost, raw);
        Assert.DoesNotContain("ya29", raw);
    }

    private static HashSet<string> Snapshot(string root) =>
        Directory.EnumerateFiles(root, "*", SearchOption.AllDirectories)
            .Where(p => !p.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}") && !p.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}"))
            .Select(p => p + "|" + new FileInfo(p).Length).ToHashSet();

    [Fact]
    public async Task Chunk_offset_mismatch_is_409_with_offset_and_bad_ranges_are_rejected()
    {
        var (c, lesson, ch, admin) = await Setup();
        var payload = new byte[2 * K256];
        var up = await CreateApproved(c, admin, ch, lesson, payload.Length, "fp-offset-test");

        var r = await PutChunk(c, up.Id, payload, K256, payload.Length, K256);
        Assert.Equal(HttpStatusCode.Conflict, r.StatusCode);
        var body = await r.Content.ReadAsStringAsync();
        using (var doc = JsonDocument.Parse(body))
        {
            Assert.Equal("offset_mismatch", doc.RootElement.GetProperty("type").GetString());
            Assert.Equal(0, doc.RootElement.GetProperty("confirmedOffset").GetInt64());
        }

        // Non-final chunk not a 256 KiB multiple.
        Assert.Equal("invalid_chunk_size", await (await PutChunk(c, up.Id, payload, 0, payload.Length, 1000)).ProblemType());
        // Wrong total.
        Assert.Equal("invalid_content_range", await (await PutChunk(c, up.Id, payload, 0, payload.Length + 1, K256)).ProblemType());
        // Larger than the configured chunk size (512 KiB).
        var big = new byte[3 * K256];
        var up2 = await CreateApproved(c, admin, ch, null, big.Length, "fp-big-chunk");
        Assert.Equal("chunk_too_large", await (await PutChunk(c, up2.Id, big, 0, big.Length)).ProblemType());

        // Success after the offset mismatch, then re-sending an already confirmed chunk is rejected.
        Assert.Equal(HttpStatusCode.OK, (await PutChunk(c, up.Id, payload, 0, payload.Length, K256)).StatusCode);
        var dup = await PutChunk(c, up.Id, payload, 0, payload.Length, K256);
        Assert.Equal(HttpStatusCode.Conflict, dup.StatusCode);
    }

    [Fact]
    public async Task Resume_checks_fingerprint_and_resyncs_offset()
    {
        var (c, lesson, ch, admin) = await Setup();
        var payload = new byte[2 * K256];
        var up = await CreateApproved(c, admin, ch, lesson, payload.Length, "fp-resume-ok");
        Assert.Equal(HttpStatusCode.OK, (await PutChunk(c, up.Id, payload, 0, payload.Length, K256)).StatusCode);

        var bad = await c.PostAsJsonAsync($"/api/youtube/uploads/{up.Id}/resume", new { fileFingerprint = "another-file" });
        Assert.Equal(HttpStatusCode.Conflict, bad.StatusCode);
        Assert.Equal("file_mismatch", await bad.ProblemType());

        var ok = await (await c.PostAsJsonAsync($"/api/youtube/uploads/{up.Id}/resume", new { fileFingerprint = "fp-resume-ok" })).Read<UploadDto>();
        Assert.Equal(K256, ok.ConfirmedOffset);
        Assert.Equal(UploadSessionStatus.Uploading, ok.Status);
        Assert.Contains(f.Fake.Requests, x => x.StartsWith("PUT"));
    }

    [Fact]
    public async Task Expired_upstream_session_requires_restart()
    {
        var (c, lesson, ch, admin) = await Setup();
        var payload = new byte[2 * K256];
        var up = await CreateApproved(c, admin, ch, lesson, payload.Length, "fp-expired");
        Assert.Equal(HttpStatusCode.OK, (await PutChunk(c, up.Id, payload, 0, payload.Length, K256)).StatusCode);

        f.Fake.SessionExpired = true;
        try
        {
            var r = await PutChunk(c, up.Id, payload, K256, payload.Length, K256);
            Assert.Equal(HttpStatusCode.Conflict, r.StatusCode);
            Assert.Equal("upload_session_expired", await r.ProblemType());
            var st = await (await c.GetAsync($"/api/youtube/uploads/{up.Id}")).Read<UploadDto>();
            Assert.Equal(UploadSessionStatus.Expired, st.Status);

            var noRestart = await c.PostAsJsonAsync($"/api/youtube/uploads/{up.Id}/resume", new { fileFingerprint = "fp-expired" });
            Assert.Equal("upload_session_expired", await noRestart.ProblemType());
        }
        finally { f.Fake.SessionExpired = false; }

        var restarted = await (await c.PostAsJsonAsync($"/api/youtube/uploads/{up.Id}/resume", new { fileFingerprint = "fp-expired", restart = true })).Read<UploadDto>();
        Assert.Equal(UploadSessionStatus.Approved, restarted.Status);
        Assert.Equal(0, restarted.ConfirmedOffset);
    }

    [Fact]
    public async Task Approval_requires_authorized_channel_cap_and_cancel()
    {
        var (c, lesson, ch, admin) = await Setup(authorized: false);
        var r = await c.PostAsJsonAsync("/api/youtube/uploads", Intent(ch, lesson, 1000, "fp-cap-1"));
        var dto = await r.Read<UploadDto>();
        var approve = await admin.PostAsync($"/api/admin/youtube/uploads/{dto.Id}/approve", null);
        Assert.Equal("channel_not_authorized", await approve.ProblemType());

        // Instructors cannot approve their own uploads.
        Assert.Equal(HttpStatusCode.Forbidden, (await c.PostAsync($"/api/admin/youtube/uploads/{dto.Id}/approve", null)).StatusCode);
        // Duplicate intent for the same file returns the existing session.
        var again = await c.PostAsJsonAsync("/api/youtube/uploads", Intent(ch, lesson, 1000, "fp-cap-1"));
        Assert.Equal(HttpStatusCode.OK, again.StatusCode);
        Assert.Equal(dto.Id, (await again.Read<UploadDto>()).Id);

        Assert.Equal(HttpStatusCode.Created, (await c.PostAsJsonAsync("/api/youtube/uploads", Intent(ch, lesson, 1000, "fp-cap-2"))).StatusCode);
        var third = await c.PostAsJsonAsync("/api/youtube/uploads", Intent(ch, lesson, 1000, "fp-cap-3"));
        Assert.Equal("too_many_uploads", await third.ProblemType());

        var cancelled = await (await c.DeleteAsync($"/api/youtube/uploads/{dto.Id}")).Read<UploadDto>();
        Assert.Equal(UploadSessionStatus.Cancelled, cancelled.Status);
        Assert.Equal(HttpStatusCode.Created, (await c.PostAsJsonAsync("/api/youtube/uploads", Intent(ch, lesson, 1000, "fp-cap-3"))).StatusCode);
        Assert.DoesNotContain(f.Fake.Requests, x => x.StartsWith("DELETE"));

        // Another user cannot see the session.
        var (_, other) = await f.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.NotFound, (await other.GetAsync($"/api/youtube/uploads/{dto.Id}")).StatusCode);
    }

    [Fact]
    public async Task Quota_exhausted_before_transfer_keeps_intent_queued()
    {
        var (c, lesson, ch, admin) = await Setup();
        var payload = new byte[K256];
        var up = await CreateApproved(c, admin, ch, lesson, payload.Length, "fp-quota");
        f.Fake.QuotaExceeded = true;
        try
        {
            var r = await PutChunk(c, up.Id, payload, 0, payload.Length);
            Assert.Equal(HttpStatusCode.ServiceUnavailable, r.StatusCode);
            Assert.Equal("youtube_quota_exhausted", await r.ProblemType());
        }
        finally { f.Fake.QuotaExceeded = false; }
        var st = await (await c.GetAsync($"/api/youtube/uploads/{up.Id}")).Read<UploadDto>();
        Assert.Equal(UploadSessionStatus.Approved, st.Status);
        Assert.Equal(HttpStatusCode.OK, (await PutChunk(c, up.Id, payload, 0, payload.Length)).StatusCode);
    }

    [Fact]
    public async Task OAuth_connect_stores_real_channel_and_never_returns_tokens()
    {
        var (_, admin) = await f.User(Roles.Admin);
        var start = await admin.GetAsync("/api/youtube/oauth/start?mode=MastemyManaged");
        Assert.Equal(HttpStatusCode.OK, start.StatusCode);
        var url = new Uri((await start.Read<OAuthStartDto>()).AuthorizationUrl);
        var q = System.Web.HttpUtility.ParseQueryString(url.Query);
        Assert.Equal("offline", q["access_type"]);
        Assert.Equal("consent", q["prompt"]);
        Assert.Contains("youtube.upload", q["scope"]);
        Assert.Contains("youtube.readonly", q["scope"]);

        var (_, instructor) = await f.User(Roles.Instructor);
        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.GetAsync("/api/youtube/oauth/start?mode=MastemyManaged")).StatusCode);
        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.GetAsync("/api/youtube/oauth/start?mode=InstructorOwned")).StatusCode);

        var anon = f.CreateClient();
        Assert.Equal("oauth_state_invalid", await (await anon.GetAsync("/api/youtube/oauth/callback?code=abc&state=forged")).ProblemType());

        f.Fake.OwnChannelId = "UC" + Guid.NewGuid().ToString("N")[..22];
        var cb = await anon.GetAsync($"/api/youtube/oauth/callback?code=abc&state={Uri.EscapeDataString(q["state"]!)}");
        var raw = await cb.Content.ReadAsStringAsync();
        Assert.Equal(HttpStatusCode.OK, cb.StatusCode);
        Assert.DoesNotContain("refresh", raw, StringComparison.OrdinalIgnoreCase);
        Assert.DoesNotContain("ya29", raw);
        var dto = JsonSerializer.Deserialize<ChannelDto>(raw, Http.Json)!;
        Assert.Equal(f.Fake.OwnChannelId, dto.ChannelId);
        Assert.True(dto.Authorized);
        var stored = await f.WithDb(db => db.YouTubeChannels.AsNoTracking().FirstAsync(x => x.Id == dto.Id));
        Assert.NotEqual("1//refresh-fake", stored.EncryptedRefreshToken);
        Assert.Equal("1//refresh-fake", f.Services.GetRequiredService<SecretProtector>().Unprotect(stored.EncryptedRefreshToken!));

        Assert.Equal(HttpStatusCode.Forbidden, (await instructor.DeleteAsync($"/api/youtube/channels/{dto.Id}/authorization")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await admin.DeleteAsync($"/api/youtube/channels/{dto.Id}/authorization")).StatusCode);
        var revoked = await f.WithDb(db => db.YouTubeChannels.AsNoTracking().FirstAsync(x => x.Id == dto.Id));
        Assert.Null(revoked.EncryptedRefreshToken);
        Assert.NotNull(revoked.RevokedAt);
    }
}
