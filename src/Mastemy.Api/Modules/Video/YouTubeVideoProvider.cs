using Mastemy.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Video;

public class YouTubeVideoProvider(AppDbContext db) : IVideoProvider
{
    public string ProviderKey => "youtube";
    public bool IsConfigured => true;

    public async Task<VideoPlaybackInfo> GetPlaybackInfoAsync(string assetId, CancellationToken ct = default)
    {
        if (!Guid.TryParse(assetId, out var id))
            throw new ArgumentException("Invalid video asset id.", nameof(assetId));

        var asset = await db.VideoAssets.AsNoTracking().FirstOrDefaultAsync(a => a.Id == id, ct)
            ?? throw new KeyNotFoundException($"VideoAsset {assetId} not found.");

        var youtubeId = asset.YouTubeVideoId;
        return new VideoPlaybackInfo(
            ProviderKey,
            EmbedUrl: $"https://www.youtube-nocookie.com/embed/{Uri.EscapeDataString(youtubeId)}",
            DirectUrl: $"https://www.youtube.com/watch?v={Uri.EscapeDataString(youtubeId)}",
            DurationSeconds: asset.DurationSeconds > 0 ? asset.DurationSeconds : null,
            ThumbnailUrl: $"https://img.youtube.com/vi/{Uri.EscapeDataString(youtubeId)}/hqdefault.jpg"
        );
    }
}
