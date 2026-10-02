using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.YouTube;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.YouTube;

/// <summary>Two app instances (two WebApplicationFactory hosts) on the same database and the same Data Protection key ring.</summary>
public class TwoInstancesFixture : IAsyncLifetime
{
    private readonly string _keys = Path.Combine(Path.GetTempPath(), "mastemy-dp-" + Guid.NewGuid().ToString("N"));
    public YouTubeTestFactory A { get; }
    public YouTubeTestFactory B { get; }

    public TwoInstancesFixture()
    {
        var extra = new Dictionary<string, string?> { ["DataProtection:KeysPath"] = _keys };
        A = new YouTubeTestFactory(extra: extra);
        B = new YouTubeTestFactory(extra: extra, sharedDbName: A.DbName);
    }

    public async Task InitializeAsync()
    {
        await A.InitDb();
        await A.SetFlag(FeatureFlags.YouTubeApiUploadsEnabled, true);
        _ = B.Services; // start the second host
    }

    public async Task DisposeAsync()
    {
        await B.DisposeAsync();
        await A.DisposeAsync();
        try { Directory.Delete(_keys, true); } catch { /* best effort */ }
    }
}

public class MultiInstanceTests(TwoInstancesFixture fx) : IClassFixture<TwoInstancesFixture>
{
    private static HttpClient As(YouTubeTestFactory f, HttpClient template)
    {
        var c = f.CreateClient();
        c.DefaultRequestHeaders.Authorization = template.DefaultRequestHeaders.Authorization;
        return c;
    }

    private static HttpContent Body(int size)
    {
        var content = new ByteArrayContent(new byte[size]);
        content.Headers.ContentRange = new ContentRangeHeaderValue(0, size - 1, size);
        content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        return content;
    }

    private async Task<(Guid UploadId, HttpClient OnA, HttpClient OnB)> ApprovedUpload(int size)
    {
        var (uid, a) = await fx.A.User(Roles.Instructor);
        var (_, _, lesson) = await fx.A.Course(uid);
        var ch = await fx.A.Channel("UC" + Guid.NewGuid().ToString("N")[..22], authorized: true);
        var (_, admin) = await fx.A.User(Roles.Admin);
        var created = await (await a.PostAsJsonAsync("/api/youtube/uploads", new
        {
            channelId = ch, lessonId = lesson, title = "Multi", description = "d", privacyStatus = "unlisted",
            notifySubscribers = false, syntheticMediaDisclosed = false, fileName = "m.mp4", fileSize = size, fileFingerprint = "fp-" + Guid.NewGuid().ToString("N")[..12],
        })).Read<UploadDto>();
        Assert.Equal(HttpStatusCode.OK, (await admin.PostAsync($"/api/admin/youtube/uploads/{created.Id}/approve", null)).StatusCode);
        return (created.Id, a, As(fx.B, a));
    }

    [Fact]
    public async Task Concurrent_chunks_from_two_instances_exactly_one_proceeds()
    {
        const int size = 1000;
        foreach (var f in new[] { fx.A.Fake, fx.B.Fake }) { f.Received.SetLength(0); f.ChunkRanges.Clear(); f.CompletedVideoId = "MuLtIiNsT01"; }
        var (id, onA, onB) = await ApprovedUpload(size);

        var entered = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        var hold = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        fx.A.Fake.ChunkEntered = entered; fx.B.Fake.ChunkEntered = entered;
        fx.A.Fake.HoldChunk = hold; fx.B.Fake.HoldChunk = hold;
        try
        {
            var ta = onA.PutAsync($"/api/youtube/uploads/{id}/chunk", Body(size));
            var tb = onB.PutAsync($"/api/youtube/uploads/{id}/chunk", Body(size));
            await entered.Task.WaitAsync(TimeSpan.FromSeconds(20));
            // The loser answers without waiting for the holder.
            var first = await Task.WhenAny(ta, tb).WaitAsync(TimeSpan.FromSeconds(20));
            var loser = await first;
            Assert.Equal(HttpStatusCode.Conflict, loser.StatusCode);
            Assert.Equal("chunk_in_progress", await loser.ProblemType());

            hold.TrySetResult();
            var winner = await (first == ta ? tb : ta);
            Assert.Equal(HttpStatusCode.OK, winner.StatusCode);
            Assert.Equal(UploadSessionStatus.Completed, (await winner.Read<UploadDto>()).Status);
        }
        finally
        {
            hold.TrySetResult();
            foreach (var f in new[] { fx.A.Fake, fx.B.Fake }) { f.ChunkEntered = null; f.HoldChunk = null; }
        }
        Assert.Equal(1, fx.A.Fake.ChunkRanges.Count + fx.B.Fake.ChunkRanges.Count);
        var s = await fx.A.WithDb(db => db.UploadSessions.AsNoTracking().FirstAsync(x => x.Id == id));
        Assert.Null(s.LockToken);
        Assert.Null(s.LockedUntil);
    }

    [Fact]
    public async Task Cancel_on_other_instance_during_transfer_wins_and_is_not_overwritten()
    {
        const int size = 1000;
        fx.A.Fake.Received.SetLength(0); fx.A.Fake.ChunkRanges.Clear(); fx.A.Fake.CompletedVideoId = "MuLtIcAnC01";
        var (id, onA, onB) = await ApprovedUpload(size);
        fx.A.Fake.ChunkEntered = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        fx.A.Fake.HoldChunk = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        try
        {
            var chunk = onA.PutAsync($"/api/youtube/uploads/{id}/chunk", Body(size));
            await fx.A.Fake.ChunkEntered.Task.WaitAsync(TimeSpan.FromSeconds(20));
            var cancel = await onB.DeleteAsync($"/api/youtube/uploads/{id}");
            Assert.Equal(HttpStatusCode.OK, cancel.StatusCode);
            Assert.Equal(UploadSessionStatus.Cancelled, (await cancel.Read<UploadDto>()).Status);
            fx.A.Fake.HoldChunk.TrySetResult();
            Assert.Equal(UploadSessionStatus.Cancelled, (await (await chunk).Read<UploadDto>()).Status);
        }
        finally
        {
            fx.A.Fake.HoldChunk?.TrySetResult();
            fx.A.Fake.ChunkEntered = null; fx.A.Fake.HoldChunk = null;
        }
        var s = await fx.A.WithDb(db => db.UploadSessions.AsNoTracking().FirstAsync(x => x.Id == id));
        Assert.Equal(UploadSessionStatus.Cancelled, s.Status);
        Assert.Equal("MuLtIcAnC01", s.ResultVideoId);
    }

    [Fact]
    public async Task Expired_lease_from_a_crashed_instance_is_taken_over()
    {
        const int size = 1000;
        fx.B.Fake.Received.SetLength(0); fx.B.Fake.ChunkRanges.Clear(); fx.B.Fake.CompletedVideoId = "MuLtIsTaLe1";
        var (id, _, onB) = await ApprovedUpload(size);
        await fx.A.WithDb(db => db.UploadSessions.Where(x => x.Id == id).ExecuteUpdateAsync(u =>
            u.SetProperty(x => x.LockToken, "crashed").SetProperty(x => x.LockedUntil, DateTime.UtcNow.AddSeconds(60))));
        var blocked = await onB.PutAsync($"/api/youtube/uploads/{id}/chunk", Body(size));
        Assert.Equal("chunk_in_progress", await blocked.ProblemType());

        await fx.A.WithDb(db => db.UploadSessions.Where(x => x.Id == id).ExecuteUpdateAsync(u =>
            u.SetProperty(x => x.LockedUntil, DateTime.UtcNow.AddSeconds(-1))));
        var ok = await onB.PutAsync($"/api/youtube/uploads/{id}/chunk", Body(size));
        Assert.Equal(HttpStatusCode.OK, ok.StatusCode);
        Assert.Equal(UploadSessionStatus.Completed, (await ok.Read<UploadDto>()).Status);
    }

    [Fact]
    public async Task OAuth_nonce_is_single_use_across_instances()
    {
        var (_, admin) = await fx.A.User(Roles.Admin);
        var start = await admin.GetAsync("/api/youtube/oauth/start?mode=MastemyManaged");
        Assert.Equal(HttpStatusCode.OK, start.StatusCode);
        var cookie = start.Headers.GetValues("Set-Cookie").Single(h => h.StartsWith(ChannelService.NonceCookieName + "=")).Split(';')[0];
        var state = System.Web.HttpUtility.ParseQueryString(new Uri((await start.Read<OAuthStartDto>()).AuthorizationUrl).Query)["state"]!;
        var nonce = cookie[(ChannelService.NonceCookieName.Length + 1)..];
        Assert.True(await fx.A.WithDb(db => db.OAuthNonces.AnyAsync(n => n.Nonce == nonce && n.ConsumedAt == null)));

        Task<HttpResponseMessage> Callback(YouTubeTestFactory f)
        {
            var req = new HttpRequestMessage(HttpMethod.Get, $"/api/youtube/oauth/callback?code=abc&state={Uri.EscapeDataString(state)}");
            req.Headers.Add("Cookie", cookie);
            return f.CreateClient(new() { HandleCookies = false }).SendAsync(req);
        }

        fx.B.Fake.OwnChannelId = "UC" + Guid.NewGuid().ToString("N")[..22];
        fx.A.Fake.OwnChannelId = fx.B.Fake.OwnChannelId;
        Assert.Equal(HttpStatusCode.OK, (await Callback(fx.B)).StatusCode); // state issued on A is accepted once on B
        var replay = await Callback(fx.A);
        Assert.Equal(HttpStatusCode.BadRequest, replay.StatusCode);
        Assert.Equal("oauth_state_invalid", await replay.ProblemType());
        var replayB = await Callback(fx.B);
        Assert.Equal("oauth_state_invalid", await replayB.ProblemType());
        Assert.True(await fx.A.WithDb(db => db.OAuthNonces.AnyAsync(n => n.Nonce == nonce && n.ConsumedAt != null)));
    }

    [Fact]
    public async Task Expired_nonces_are_cleaned_up()
    {
        await fx.A.WithDb(async db =>
        {
            db.OAuthNonces.Add(new OAuthNonce { Nonce = "old-" + Guid.NewGuid().ToString("N"), UserId = Guid.NewGuid(), ExpiresAt = DateTime.UtcNow.AddHours(-3) });
            db.OAuthNonces.Add(new OAuthNonce { Nonce = "new-" + Guid.NewGuid().ToString("N"), UserId = Guid.NewGuid(), ExpiresAt = DateTime.UtcNow.AddMinutes(10) });
            await db.SaveChangesAsync();
        });
        using var scope = fx.B.Services.CreateScope();
        var removed = await scope.ServiceProvider.GetRequiredService<OAuthNonceStore>().CleanupExpired();
        Assert.True(removed >= 1);
        Assert.False(await fx.A.WithDb(db => db.OAuthNonces.AnyAsync(n => n.ExpiresAt < DateTime.UtcNow.AddHours(-1))));
        Assert.True(await fx.A.WithDb(db => db.OAuthNonces.AnyAsync(n => n.Nonce.StartsWith("new-"))));
    }
}
