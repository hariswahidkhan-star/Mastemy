using System.Net;
using System.Text.Json;
using System.Xml;
using Mastemy.Api.Infrastructure;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.YouTube;

/// <summary>Metadata observed on YouTube for one video (Data API v3 videos.list).</summary>
public record VideoMetadata(
    string VideoId,
    string ChannelId,
    string Title,
    int DurationSeconds,
    string? PrivacyStatus,
    bool? Embeddable,
    string? UploadStatus,
    string? FailureReason,
    string? RejectionReason,
    IReadOnlyList<string> RegionAllowed,
    IReadOnlyList<string> RegionBlocked,
    bool AgeRestricted);

public enum OEmbedOutcome { Found, NotFound, Unauthorized, Unavailable }

public record OEmbedResult(OEmbedOutcome Outcome, string? Title, string? AuthorName, string? AuthorUrl);

public record PlaylistItem(string VideoId, string Title, int Position);

/// <summary>An error from a YouTube/Google API. <see cref="Code"/> is surfaced to clients.</summary>
public class YouTubeApiException(int httpStatus, string code, string message) : Exception(message)
{
    public int HttpStatus { get; } = httpStatus;
    public string Code { get; } = code;
    public bool IsQuota => Code == YouTubeErrors.QuotaExhausted;
    public AppException ToAppException() => IsQuota
        ? new AppException(503, "YouTube API quota is exhausted. Try again after the daily quota resets.", YouTubeErrors.QuotaExhausted)
        : HttpStatus == 404
            ? new AppException(404, Message, Code)
            : new AppException(502, Message, Code);
}

public static class YouTubeErrors
{
    public const string QuotaExhausted = "youtube_quota_exhausted";
    public const string Upstream = "youtube_upstream_error";
    public const string NotFound = "youtube_not_found";
    public const string Forbidden = "youtube_forbidden";
    public const string ApiKeyRequired = "youtube_api_key_required";
    public const string OAuthNotConfigured = "youtube_oauth_not_configured";
    public const string WrongChannel = "wrong_channel";
    public const string UploadsDisabled = "uploads_disabled";
    public const string FileMismatch = "file_mismatch";

    /// <summary>Maps a Google API error body to an <see cref="YouTubeApiException"/>.</summary>
    public static YouTubeApiException FromResponse(HttpStatusCode status, string body)
    {
        string? reason = null, message = null;
        try
        {
            using var doc = JsonDocument.Parse(body);
            if (doc.RootElement.TryGetProperty("error", out var err) && err.ValueKind == JsonValueKind.Object)
            {
                if (err.TryGetProperty("message", out var m) && m.ValueKind == JsonValueKind.String) message = m.GetString();
                if (err.TryGetProperty("errors", out var errs) && errs.ValueKind == JsonValueKind.Array)
                    foreach (var e in errs.EnumerateArray())
                        if (e.TryGetProperty("reason", out var r) && r.ValueKind == JsonValueKind.String) { reason = r.GetString(); break; }
            }
        }
        catch (JsonException) { }

        var code = (int)status;
        if (reason is "quotaExceeded" or "dailyLimitExceeded" or "rateLimitExceeded" or "userRateLimitExceeded" or "uploadLimitExceeded")
            return new YouTubeApiException(code, QuotaExhausted, "YouTube API quota is exhausted.");
        if (code == 404)
            return new YouTubeApiException(code, NotFound, message ?? "Not found on YouTube.");
        if (code is 401 or 403)
            return new YouTubeApiException(code, Forbidden, $"YouTube refused the request{(reason is null ? "" : $" ({reason})")}.");
        return new YouTubeApiException(code, Upstream, $"YouTube API error {code}{(reason is null ? "" : $" ({reason})")}.");
    }
}

public interface IYouTubeMetadataClient
{
    bool HasApiKey { get; }

    /// <summary>videos.list for up to 50 ids. Missing ids are not present in the result (removed / never existed).</summary>
    Task<IReadOnlyDictionary<string, VideoMetadata>> GetVideosAsync(IReadOnlyCollection<string> videoIds, CancellationToken ct = default);

    /// <summary>oEmbed lookup (no API key): confirms existence and, loosely, embeddability. Never yields a channel id.</summary>
    Task<OEmbedResult> GetOEmbedAsync(string videoId, CancellationToken ct = default);

    /// <summary>playlistItems.list, all pages up to <paramref name="maxItems"/>.</summary>
    Task<IReadOnlyList<PlaylistItem>> GetPlaylistItemsAsync(string playlistId, int maxItems, CancellationToken ct = default);
}

public class YouTubeMetadataClient(IHttpClientFactory http, IOptions<YouTubeOptions> options, ILogger<YouTubeMetadataClient> log) : IYouTubeMetadataClient
{
    private YouTubeOptions O => options.Value;
    public bool HasApiKey => O.HasApiKey;

    private HttpClient Client() => http.CreateClient(YouTubeOptions.HttpClientName);

    private string ApiUrl(string resource, string query) =>
        $"{O.ApiBaseUrl.TrimEnd('/')}/{resource}?{query}&key={Uri.EscapeDataString(O.ApiKey)}";

    private void RequireKey()
    {
        if (!O.HasApiKey) throw new AppException(400, "A YouTube Data API key is not configured.", YouTubeErrors.ApiKeyRequired);
    }

    public async Task<IReadOnlyDictionary<string, VideoMetadata>> GetVideosAsync(IReadOnlyCollection<string> videoIds, CancellationToken ct = default)
    {
        RequireKey();
        if (videoIds.Count == 0) return new Dictionary<string, VideoMetadata>();
        if (videoIds.Count > 50) throw new ArgumentException("videos.list accepts at most 50 ids per call.", nameof(videoIds));
        if (videoIds.Any(id => !YouTubeUrlParser.IsValidVideoId(id))) throw new ArgumentException("Invalid video id.", nameof(videoIds));

        var url = ApiUrl("videos", $"part=snippet,contentDetails,status&maxResults=50&id={string.Join(",", videoIds)}");
        using var doc = await GetJson(url, ct);
        var result = new Dictionary<string, VideoMetadata>(StringComparer.Ordinal);
        if (!doc.RootElement.TryGetProperty("items", out var items) || items.ValueKind != JsonValueKind.Array) return result;
        foreach (var it in items.EnumerateArray())
        {
            var id = Str(it, "id");
            if (id is null) continue;
            var snippet = Obj(it, "snippet");
            var content = Obj(it, "contentDetails");
            var status = Obj(it, "status");
            var region = content is { } c ? Obj(c, "regionRestriction") : null;
            var rating = content is { } c2 ? Obj(c2, "contentRating") : null;
            result[id] = new VideoMetadata(
                id,
                snippet is { } s ? Str(s, "channelId") ?? "" : "",
                snippet is { } s2 ? Str(s2, "title") ?? "" : "",
                ParseIsoDuration(content is { } c3 ? Str(c3, "duration") : null),
                status is { } st ? Str(st, "privacyStatus") : null,
                status is { } st2 && st2.TryGetProperty("embeddable", out var emb) && emb.ValueKind is JsonValueKind.True or JsonValueKind.False ? emb.GetBoolean() : null,
                status is { } st3 ? Str(st3, "uploadStatus") : null,
                status is { } st4 ? Str(st4, "failureReason") : null,
                status is { } st5 ? Str(st5, "rejectionReason") : null,
                region is { } r1 ? StrArray(r1, "allowed") : [],
                region is { } r2 ? StrArray(r2, "blocked") : [],
                rating is { } rt && Str(rt, "ytRating") == "ytAgeRestricted");
        }
        return result;
    }

    public async Task<OEmbedResult> GetOEmbedAsync(string videoId, CancellationToken ct = default)
    {
        if (!YouTubeUrlParser.IsValidVideoId(videoId)) throw new ArgumentException("Invalid video id.", nameof(videoId));
        var watch = $"https://www.youtube.com/watch?v={videoId}";
        var url = $"{O.OEmbedUrl}?url={Uri.EscapeDataString(watch)}&format=json";
        try
        {
            using var resp = await Client().GetAsync(url, ct);
            if (resp.StatusCode is HttpStatusCode.NotFound or HttpStatusCode.BadRequest) return new OEmbedResult(OEmbedOutcome.NotFound, null, null, null);
            if (resp.StatusCode is HttpStatusCode.Unauthorized or HttpStatusCode.Forbidden) return new OEmbedResult(OEmbedOutcome.Unauthorized, null, null, null);
            if (!resp.IsSuccessStatusCode) return new OEmbedResult(OEmbedOutcome.Unavailable, null, null, null);
            using var doc = JsonDocument.Parse(await resp.Content.ReadAsStringAsync(ct));
            var r = doc.RootElement;
            return new OEmbedResult(OEmbedOutcome.Found, Str(r, "title"), Str(r, "author_name"), Str(r, "author_url"));
        }
        catch (Exception ex) when (ex is HttpRequestException or JsonException or TaskCanceledException && !ct.IsCancellationRequested)
        {
            log.LogWarning(ex, "oEmbed lookup failed for {VideoId}", videoId);
            return new OEmbedResult(OEmbedOutcome.Unavailable, null, null, null);
        }
    }

    public async Task<IReadOnlyList<PlaylistItem>> GetPlaylistItemsAsync(string playlistId, int maxItems, CancellationToken ct = default)
    {
        RequireKey();
        if (!YouTubeUrlParser.IsValidPlaylistId(playlistId)) throw new ArgumentException("Invalid playlist id.", nameof(playlistId));
        var list = new List<PlaylistItem>();
        string? pageToken = null;
        var pages = 0;
        do
        {
            var q = $"part=snippet,contentDetails&maxResults=50&playlistId={Uri.EscapeDataString(playlistId)}";
            if (pageToken is not null) q += $"&pageToken={Uri.EscapeDataString(pageToken)}";
            using var doc = await GetJson(ApiUrl("playlistItems", q), ct);
            if (doc.RootElement.TryGetProperty("items", out var items) && items.ValueKind == JsonValueKind.Array)
                foreach (var it in items.EnumerateArray())
                {
                    var cd = Obj(it, "contentDetails");
                    var sn = Obj(it, "snippet");
                    var vid = cd is { } c ? Str(c, "videoId") : null;
                    if (vid is null && sn is { } s0 && Obj(s0, "resourceId") is { } rid) vid = Str(rid, "videoId");
                    if (!YouTubeUrlParser.IsValidVideoId(vid)) continue;
                    var pos = sn is { } s1 && s1.TryGetProperty("position", out var p) && p.ValueKind == JsonValueKind.Number ? p.GetInt32() : list.Count;
                    list.Add(new PlaylistItem(vid!, sn is { } s2 ? Str(s2, "title") ?? "" : "", pos));
                    if (list.Count >= maxItems) break;
                }
            pageToken = Str(doc.RootElement, "nextPageToken");
        } while (pageToken is not null && list.Count < maxItems && ++pages < 100);
        return list.OrderBy(x => x.Position).ToList();
    }

    private async Task<JsonDocument> GetJson(string url, CancellationToken ct)
    {
        HttpResponseMessage resp;
        try { resp = await Client().GetAsync(url, ct); }
        catch (HttpRequestException ex)
        {
            log.LogWarning(ex, "YouTube Data API unreachable");
            throw new YouTubeApiException(502, YouTubeErrors.Upstream, "YouTube Data API is unreachable.");
        }
        using (resp)
        {
            var body = await resp.Content.ReadAsStringAsync(ct);
            if (!resp.IsSuccessStatusCode) throw YouTubeErrors.FromResponse(resp.StatusCode, body);
            try { return JsonDocument.Parse(body); }
            catch (JsonException) { throw new YouTubeApiException(502, YouTubeErrors.Upstream, "YouTube Data API returned an invalid response."); }
        }
    }

    public static int ParseIsoDuration(string? iso)
    {
        if (string.IsNullOrWhiteSpace(iso)) return 0;
        try
        {
            var ts = XmlConvert.ToTimeSpan(iso);
            return ts.TotalSeconds is > 0 and < int.MaxValue ? (int)ts.TotalSeconds : 0;
        }
        catch (FormatException) { return 0; }
    }

    private static JsonElement? Obj(JsonElement e, string name) =>
        e.ValueKind == JsonValueKind.Object && e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.Object ? v : null;

    private static string? Str(JsonElement e, string name) =>
        e.ValueKind == JsonValueKind.Object && e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString() : null;

    private static IReadOnlyList<string> StrArray(JsonElement e, string name) =>
        e.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.Array
            ? v.EnumerateArray().Where(x => x.ValueKind == JsonValueKind.String).Select(x => x.GetString()!).ToList()
            : [];
}
