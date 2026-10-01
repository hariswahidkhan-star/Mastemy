using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.YouTube;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Tests.YouTube;

public class UploadCancelRaceTests(UploadFactory f) : IClassFixture<UploadFactory>
{
    [Fact]
    public async Task Cancel_during_final_chunk_is_not_overwritten_and_video_is_recorded_unlinked()
    {
        f.Fake.Received.SetLength(0);
        f.Fake.ChunkRanges.Clear();
        f.Fake.CompletedVideoId = "CaNcElRaCe1";
        var (uid, c) = await f.User(Roles.Instructor);
        var (_, _, lesson) = await f.Course(uid);
        var ch = await f.Channel("UC" + Guid.NewGuid().ToString("N")[..22], authorized: true);
        var (_, admin) = await f.User(Roles.Admin);

        var size = 1000;
        var created = await (await c.PostAsJsonAsync("/api/youtube/uploads", new
        {
            channelId = ch, lessonId = lesson, title = "Race", description = "d", privacyStatus = "unlisted",
            notifySubscribers = false, syntheticMediaDisclosed = false, fileName = "a.mp4", fileSize = size, fileFingerprint = "fp-race-0001",
        })).Read<UploadDto>();
        Assert.Equal(HttpStatusCode.OK, (await admin.PostAsync($"/api/admin/youtube/uploads/{created.Id}/approve", null)).StatusCode);

        f.Fake.ChunkEntered = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        f.Fake.HoldChunk = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
        try
        {
            var content = new ByteArrayContent(new byte[size]);
            content.Headers.ContentRange = new ContentRangeHeaderValue(0, size - 1, size);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            var chunkTask = c.PutAsync($"/api/youtube/uploads/{created.Id}/chunk", content);
            await f.Fake.ChunkEntered.Task.WaitAsync(TimeSpan.FromSeconds(20));

            var cancel = await c.DeleteAsync($"/api/youtube/uploads/{created.Id}");
            Assert.Equal(HttpStatusCode.OK, cancel.StatusCode);
            Assert.Equal(UploadSessionStatus.Cancelled, (await cancel.Read<UploadDto>()).Status);

            f.Fake.HoldChunk.TrySetResult();
            var chunk = await chunkTask;
            Assert.Equal(HttpStatusCode.OK, chunk.StatusCode);
            Assert.Equal(UploadSessionStatus.Cancelled, (await chunk.Read<UploadDto>()).Status);
        }
        finally
        {
            f.Fake.HoldChunk?.TrySetResult();
            f.Fake.ChunkEntered = null;
            f.Fake.HoldChunk = null;
        }

        var s = await f.WithDb(db => db.UploadSessions.AsNoTracking().FirstAsync(x => x.Id == created.Id));
        Assert.Equal(UploadSessionStatus.Cancelled, s.Status);
        Assert.Equal("CaNcElRaCe1", s.ResultVideoId);
        Assert.False(string.IsNullOrWhiteSpace(s.FailureReason));
        Assert.True(await f.WithDb(db => db.VideoAssets.AnyAsync(a => a.YouTubeVideoId == "CaNcElRaCe1" && a.ChannelId == ch)));
        Assert.Null(await f.WithDb(db => db.Lessons.Where(l => l.Id == lesson).Select(l => l.VideoAssetId).FirstAsync()));
    }
}
