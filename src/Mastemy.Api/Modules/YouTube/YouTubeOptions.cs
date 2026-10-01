namespace Mastemy.Api.Modules.YouTube;

/// <summary>Bound from the "YouTube" configuration section. All upstream URLs are configurable so tests can point at a fake.</summary>
public class YouTubeOptions
{
    public const string HttpClientName = "youtube";
    public const string UploadHttpClientName = "youtube-upload";
    public const int ChunkGranularity = 256 * 1024; // YouTube resumable uploads require multiples of 256 KiB (except the final chunk)

    public string ApiKey { get; set; } = "";
    public string OAuthClientId { get; set; } = "";
    public string OAuthClientSecret { get; set; } = "";
    public string OAuthRedirectUri { get; set; } = "";
    public long UploadChunkBytes { get; set; } = 8 * 1024 * 1024;
    public int MaxConcurrentUploadsPerUser { get; set; } = 2;
    public double RecheckHours { get; set; } = 24;
    public int PlaylistImportMaxItems { get; set; } = 200;

    public string ApiBaseUrl { get; set; } = "https://www.googleapis.com/youtube/v3";
    public string UploadBaseUrl { get; set; } = "https://www.googleapis.com/upload/youtube/v3";
    public string TokenUrl { get; set; } = "https://oauth2.googleapis.com/token";
    public string RevokeUrl { get; set; } = "https://oauth2.googleapis.com/revoke";
    public string AuthorizationUrl { get; set; } = "https://accounts.google.com/o/oauth2/v2/auth";
    public string OEmbedUrl { get; set; } = "https://www.youtube.com/oembed";

    public bool HasApiKey => !string.IsNullOrWhiteSpace(ApiKey);
    public bool OAuthConfigured => !string.IsNullOrWhiteSpace(OAuthClientId) && !string.IsNullOrWhiteSpace(OAuthClientSecret)
                                   && !string.IsNullOrWhiteSpace(OAuthRedirectUri);

    /// <summary>Effective chunk size: at least 256 KiB and rounded down to a 256 KiB multiple.</summary>
    public long EffectiveChunkBytes => Math.Max(ChunkGranularity, UploadChunkBytes / ChunkGranularity * ChunkGranularity);
}
