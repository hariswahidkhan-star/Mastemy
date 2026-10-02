using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.YouTube;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.YouTube;

/// <summary>Two instances on one database with a short upload lease (renewed every 2 s) so lease loss is observable quickly.</summary>
public class ShortLeaseInstancesFixture : IAsyncLifetime
{
    private readonly string _keys = Path.Combine(Path.GetTempPath(), "mastemy-dp-" + Guid.NewGuid().ToString("N"));
    public YouTubeTestFactory A { get; }
    public YouTubeTestFactory B { get; }

    public ShortLeaseInstancesFixture()
    {
        var extra = new Dictionary<string, string?> { ["DataProtection:KeysPath"] = _keys, ["YouTube:UploadLeaseSeconds"] = "6" };
        A = new YouTubeTestFactory(extra: extra);
        B = new YouTubeTestFactory(extra: extra, sharedDbName: A.DbName);
    }

    public async Task InitializeAsync()
    {
        await A.InitDb();
        await A.SetFlag(FeatureFlags.YouTubeApiUploadsEnabled, true);
        _ = B.Services;
    }

    public async Task DisposeAsync()
    {
        await B.DisposeAsync();
        await A.DisposeAsync();
        try { Directory.Delete(_keys, true); } catch { /* best effort */ }
    }
}

public class UploadLeaseTakeoverTests(ShortLeaseInstancesFixture fx) : IClassFixture<ShortLeaseInstancesFixture>
{
    private static HttpContent Body(int size)
    {
        var content = new ByteArrayContent(new byte[size]);
        content.Headers.ContentRange = new ContentRangeHeaderValue(0, size - 1, size);
        content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        return content;
    }

    [Fact]
    public async Task Stale_holder_is_aborted_with_lease_lost_and_never_overwrites_the_new_holder()
    {
        const int size = 1000;
        foreach (var f in new[] { fx.A.Fake, fx.B.Fake }) { f.Received.SetLength(0); f.ChunkRanges.Clear(); }
        fx.A.Fake.CompletedVideoId = "StAlEhOlDa1";
        fx.B.Fake.CompletedVideoId = "TaKeOvErBb1";

        var (uid, onA) = await fx.A.User(Roles.Instructor);
        var (_, _, lesson) = await fx.A.Course(uid);
        var ch = await fx.A.Channel("UC" + Guid.NewGuid().ToString("N")[..22], authorized: true);
        var (_, admin) = await fx.A.User(Roles.Admin);
        var created = await (await onA.PostAsJsonAsync("/api/youtube/uploads", new
        {
            channelId = ch, lessonId = lesson, title = "Lease", description = "d", privacyStatus = "unlisted",
            notifySubscribers = false, syntheticMediaDisclosed = false, fileName = "l.mp4", fileSize = size, fileFingerprint = "fp-" + Guid.NewGuid().ToString("N")[..12],
        })).Read<UploadDto>();
        Assert.Equal(HttpStatusCode.OK, (await admin.PostAsync($"/api/admin/youtube/uploads/{created.Id}/approve", null)).StatusCode);
        var onB = fx.B.CreateClient();
        onB.DefaultRequestHeaders.Authorization = onA.DefaultRequestHeaders.Authorization;

        fx.A.Fake.ChunkEntered = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        fx.A.Fake.HoldChunk = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        try
        {
            var stale = onA.PutAsync($"/api/youtube/uploads/{created.Id}/chunk", Body(size));
            await fx.A.Fake.ChunkEntered.Task.WaitAsync(TimeSpan.FromSeconds(20));

            // Force A's lease to expire (as if A stalled past it) and let instance B take the upload over.
            HttpResponseMessage? takeover = null;
            for (var i = 0; i < 20 && takeover?.StatusCode != HttpStatusCode.OK; i++)
            {
                await fx.A.WithDb(db => db.UploadSessions.Where(x => x.Id == created.Id)
                    .ExecuteUpdateAsync(u => u.SetProperty(x => x.LockedUntil, DateTime.UtcNow.AddSeconds(-1))));
                takeover = await onB.PutAsync($"/api/youtube/uploads/{created.Id}/chunk", Body(size));
            }
            Assert.Equal(HttpStatusCode.OK, takeover!.StatusCode);
            Assert.Equal(UploadSessionStatus.Completed, (await takeover.Read<UploadDto>()).Status);

            // A's renewer notices the lost lease and cancels the in-flight upstream transfer (still held at the fake).
            var res = await stale.WaitAsync(TimeSpan.FromSeconds(30));
            Assert.Equal(HttpStatusCode.Conflict, res.StatusCode);
            Assert.Equal("lease_lost", await res.ProblemType());
        }
        finally
        {
            fx.A.Fake.HoldChunk?.TrySetResult();
            fx.A.Fake.ChunkEntered = null; fx.A.Fake.HoldChunk = null;
        }

        var s = await fx.A.WithDb(db => db.UploadSessions.AsNoTracking().FirstAsync(x => x.Id == created.Id));
        Assert.Equal(UploadSessionStatus.Completed, s.Status);
        Assert.Equal("TaKeOvErBb1", s.ResultVideoId);
        Assert.Equal(size, s.ConfirmedOffset);
        Assert.Null(s.FailureReason);
        Assert.False(await fx.A.WithDb(db => db.VideoAssets.AnyAsync(a => a.YouTubeVideoId == "StAlEhOlDa1")));
    }
}
