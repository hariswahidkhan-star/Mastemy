namespace Mastemy.Api.Modules.Video;

public interface IVideoProvider
{
    string ProviderKey { get; }
    bool IsConfigured { get; }
    Task<VideoPlaybackInfo> GetPlaybackInfoAsync(string assetId, CancellationToken ct = default);
}

public record VideoPlaybackInfo(
    string ProviderKey,
    string EmbedUrl,
    string? DirectUrl,
    int? DurationSeconds,
    string? ThumbnailUrl
);
