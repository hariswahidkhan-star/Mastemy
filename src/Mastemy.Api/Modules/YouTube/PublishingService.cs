using System.Net;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.YouTube;

public record PlaylistSyncRequest(string? PrivacyStatus);
public record PlaylistSyncResult(string PlaylistId, bool Created, int VideoCount, int Inserted, int Moved, int Removed, List<Guid> SkippedLessonIds);
public record CaptionPushRequest(Guid ResourceFileId);
public record CaptionPushResult(string CaptionId, string VideoId, string Language);
public record ThumbnailResult(string VideoId);

/// <summary>
/// Publishing extras through the channel's OAuth authorization (spec §10.5): course playlist maintenance, thumbnail set and
/// caption push. Only for authorized channels. Mastemy-managed channels: staff only; instructor-owned channels: the owner
/// (or staff). The caller must also be an author of the course concerned (or staff). Nothing is stored locally.
/// </summary>
public partial class PublishingService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit, GoogleOAuthClient google,
    IHttpClientFactory http, IOptions<YouTubeOptions> options, IConfiguration cfg, IWebHostEnvironment env)
{
    public const long MaxThumbnailBytes = 2 * 1024 * 1024;
    public const string PlaylistTitlePrefix = "Mastemy: ";
    public const string ScopeMissing = "youtube_scope_missing";

    [GeneratedRegex(@"^[A-Za-z]{2,3}(-[A-Za-z0-9]{2,8})*$")] private static partial Regex LanguageRx();

    private YouTubeOptions O => options.Value;
    private string Api => O.ApiBaseUrl.TrimEnd('/');
    private string Upload => O.UploadBaseUrl.TrimEnd('/');
    private HttpClient Client() => http.CreateClient(YouTubeOptions.HttpClientName);

    // ---------- authorization ----------

    private async Task<YouTubeChannel> RequirePublishableChannel(Guid channelId, CancellationToken ct)
    {
        var uid = me.RequireId();
        var ch = await db.YouTubeChannels.FirstOrDefaultAsync(c => c.Id == channelId, ct) ?? throw AppException.NotFound("Channel");
        var allowed = ch.Mode == ChannelMode.MastemyManaged ? me.IsStaff : (me.IsStaff || ch.OwnerUserId == uid);
        if (!allowed)
            throw AppException.Forbidden(ch.Mode == ChannelMode.MastemyManaged
                ? "Only staff may publish to the Mastemy-managed channel."
                : "Only the channel owner may publish to this channel.");
        if (!ChannelPolicy.IsAuthorized(ch))
            throw AppException.Conflict("The channel has no active OAuth authorization. Connect it first.", "channel_not_authorized");
        if (!string.IsNullOrWhiteSpace(ch.GrantedScopes)
            && !ch.GrantedScopes.Split(' ', StringSplitOptions.RemoveEmptyEntries).Any(s => s is GoogleOAuthClient.ForceSslScope or "https://www.googleapis.com/auth/youtube"))
            throw AppException.Conflict("The channel authorization lacks the YouTube management permission. Reconnect the channel.", ScopeMissing);
        return ch;
    }

    private async Task RequireCourseAuthor(Guid courseId, CancellationToken ct)
    {
        if (!await db.Courses.AnyAsync(c => c.Id == courseId, ct)) throw AppException.NotFound("Course");
        if (me.IsStaff) return;
        if (!await access.IsCourseAuthor(courseId)) throw AppException.Forbidden("You are not an instructor on this course.");
    }

    // ---------- upstream ----------

    private async Task<JsonDocument?> Call(YouTubeChannel ch, HttpMethod method, string url, HttpContent? content, CancellationToken ct)
    {
        var token = await google.GetAccessToken(ch, ct);
        using var req = new HttpRequestMessage(method, url) { Content = content };
        req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        HttpResponseMessage resp;
        try { resp = await Client().SendAsync(req, ct); }
        catch (HttpRequestException) { throw new AppException(502, "YouTube API is unreachable.", YouTubeErrors.Upstream); }
        using (resp)
        {
            var body = await resp.Content.ReadAsStringAsync(ct);
            if (!resp.IsSuccessStatusCode)
            {
                if (resp.StatusCode == HttpStatusCode.Unauthorized)
                {
                    GoogleOAuthClient.Forget(ch.Id);
                    throw AppException.Conflict("YouTube rejected the channel authorization (revoked or expired). Reconnect the channel.", "channel_not_authorized");
                }
                var err = YouTubeErrors.FromResponse(resp.StatusCode, body);
                if (!err.IsQuota && resp.StatusCode == HttpStatusCode.Forbidden
                    && (body.Contains("insufficientPermissions", StringComparison.Ordinal) || body.Contains("ACCESS_TOKEN_SCOPE_INSUFFICIENT", StringComparison.Ordinal)))
                    throw AppException.Conflict("The channel authorization lacks the YouTube management permission. Reconnect the channel.", ScopeMissing);
                throw err.ToAppException();
            }
            if (string.IsNullOrWhiteSpace(body)) return null;
            try { return JsonDocument.Parse(body); }
            catch (JsonException) { throw new AppException(502, "YouTube returned an invalid response.", YouTubeErrors.Upstream); }
        }
    }

    private static StringContent JsonBody(object o) => new(JsonSerializer.Serialize(o), Encoding.UTF8, "application/json");

    private static string? Str(JsonElement e, params string[] path)
    {
        foreach (var p in path)
        {
            if (e.ValueKind != JsonValueKind.Object || !e.TryGetProperty(p, out e)) return null;
        }
        return e.ValueKind == JsonValueKind.String ? e.GetString() : null;
    }

    private async IAsyncEnumerable<JsonElement> Paged(YouTubeChannel ch, string baseUrl, [System.Runtime.CompilerServices.EnumeratorCancellation] CancellationToken ct)
    {
        string? page = null;
        for (var i = 0; i < 40; i++)
        {
            using var doc = await Call(ch, HttpMethod.Get, baseUrl + (page is null ? "" : "&pageToken=" + Uri.EscapeDataString(page)), null, ct);
            if (doc is null) yield break;
            if (doc.RootElement.TryGetProperty("items", out var items) && items.ValueKind == JsonValueKind.Array)
                foreach (var it in items.EnumerateArray()) yield return it.Clone();
            page = Str(doc.RootElement, "nextPageToken");
            if (string.IsNullOrEmpty(page)) yield break;
        }
    }

    // ---------- playlist sync ----------

    private record PlItem(string ItemId, string VideoId);

    public async Task<PlaylistSyncResult> SyncPlaylist(Guid courseId, PlaylistSyncRequest? req, CancellationToken ct)
    {
        me.RequireId();
        await RequireCourseAuthor(courseId, ct);
        var course = await db.Courses.AsNoTracking().FirstAsync(c => c.Id == courseId, ct);
        if (course.YouTubeChannelId is not { } channelId)
            throw AppException.Conflict("The course has no YouTube channel. Set the course channel first.", "course_channel_missing");
        var privacy = req?.PrivacyStatus?.Trim().ToLowerInvariant() ?? "unlisted";
        if (privacy is not ("private" or "unlisted" or "public")) throw AppException.Bad("Privacy must be private, unlisted or public.");
        var ch = await RequirePublishableChannel(channelId, ct);

        // Desired order: modules then lessons by sort order; only videos that live on the course's channel.
        var lessons = await db.Modules.Where(m => m.CourseId == courseId)
            .Join(db.Lessons, m => m.Id, l => l.ModuleId, (m, l) => new { MSort = m.SortOrder, LSort = l.SortOrder, l.Id, l.VideoAssetId })
            .OrderBy(x => x.MSort).ThenBy(x => x.LSort).ToListAsync(ct);
        var assetIds = lessons.Where(l => l.VideoAssetId != null).Select(l => l.VideoAssetId!.Value).Distinct().ToList();
        var assets = await db.VideoAssets.AsNoTracking().Where(a => assetIds.Contains(a.Id)).ToDictionaryAsync(a => a.Id, ct);
        var desired = new List<string>();
        var skipped = new List<Guid>();
        foreach (var l in lessons)
        {
            if (l.VideoAssetId is not { } aid) continue;
            if (!assets.TryGetValue(aid, out var a) || a.ChannelId != ch.Id || a.Status is VideoStatus.Failed or VideoStatus.Restricted
                || !YouTubeUrlParser.IsValidVideoId(a.YouTubeVideoId)) { skipped.Add(l.Id); continue; }
            if (!desired.Contains(a.YouTubeVideoId)) desired.Add(a.YouTubeVideoId);
        }

        // Idempotent playlist discovery by its deterministic title.
        var title = PlaylistTitlePrefix + course.Code;
        string? playlistId = null;
        await foreach (var p in Paged(ch, $"{Api}/playlists?part=snippet&mine=true&maxResults=50", ct))
            if (Str(p, "snippet", "title") == title) { playlistId = Str(p, "id"); break; }
        var created = false;
        if (string.IsNullOrEmpty(playlistId))
        {
            using var doc = await Call(ch, HttpMethod.Post, $"{Api}/playlists?part=snippet,status", JsonBody(new
            {
                snippet = new { title, description = course.Subtitle.Length > 4000 ? course.Subtitle[..4000] : course.Subtitle },
                status = new { privacyStatus = privacy },
            }), ct);
            playlistId = doc is null ? null : Str(doc.RootElement, "id");
            if (string.IsNullOrEmpty(playlistId)) throw new AppException(502, "YouTube did not return a playlist id.", YouTubeErrors.Upstream);
            created = true;
        }

        var current = new List<PlItem>();
        await foreach (var it in Paged(ch, $"{Api}/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId={Uri.EscapeDataString(playlistId)}", ct))
        {
            var itemId = Str(it, "id");
            var vid = Str(it, "contentDetails", "videoId") ?? Str(it, "snippet", "resourceId", "videoId");
            if (!string.IsNullOrEmpty(itemId) && !string.IsNullOrEmpty(vid)) current.Add(new PlItem(itemId, vid));
        }

        int inserted = 0, moved = 0, removed = 0;
        // Remove items not in the course and duplicates.
        var seen = new HashSet<string>();
        foreach (var it in current.ToList())
        {
            if (desired.Contains(it.VideoId) && seen.Add(it.VideoId)) continue;
            await Call(ch, HttpMethod.Delete, $"{Api}/playlistItems?id={Uri.EscapeDataString(it.ItemId)}", null, ct);
            current.Remove(it);
            removed++;
        }
        for (var i = 0; i < desired.Count; i++)
        {
            var vid = desired[i];
            if (i < current.Count && current[i].VideoId == vid) continue;
            var resource = new { kind = "youtube#video", videoId = vid };
            var j = current.FindIndex(x => x.VideoId == vid);
            if (j >= 0)
            {
                var item = current[j];
                await Call(ch, HttpMethod.Put, $"{Api}/playlistItems?part=snippet", JsonBody(new
                {
                    id = item.ItemId, snippet = new { playlistId, resourceId = resource, position = i },
                }), ct);
                current.RemoveAt(j);
                current.Insert(i, item);
                moved++;
            }
            else
            {
                using var doc = await Call(ch, HttpMethod.Post, $"{Api}/playlistItems?part=snippet", JsonBody(new
                {
                    snippet = new { playlistId, resourceId = resource, position = i },
                }), ct);
                var itemId = doc is null ? null : Str(doc.RootElement, "id");
                current.Insert(Math.Min(i, current.Count), new PlItem(itemId ?? "", vid));
                inserted++;
            }
        }

        audit.Record("youtube.playlist.synced", "Course", courseId, new { playlistId, created, inserted, moved, removed, videos = desired.Count, channel = ch.ChannelId });
        await db.SaveChangesAsync(ct);
        return new PlaylistSyncResult(playlistId, created, desired.Count, inserted, moved, removed, skipped);
    }

    // ---------- video-level actions ----------

    /// <summary>The asset's channel must be publishable by the caller, and the caller must author a course using the asset (or be staff).</summary>
    private async Task<(VideoAsset Asset, YouTubeChannel Channel, List<Guid> CourseIds)> RequireVideo(Guid assetId, CancellationToken ct)
    {
        var uid = me.RequireId();
        var asset = await db.VideoAssets.AsNoTracking().FirstOrDefaultAsync(a => a.Id == assetId, ct) ?? throw AppException.NotFound("Video");
        var courseIds = await db.Lessons.Where(l => l.VideoAssetId == assetId)
            .Join(db.Modules, l => l.ModuleId, m => m.Id, (l, m) => m.CourseId).Distinct().ToListAsync(ct);
        if (!me.IsStaff)
        {
            var authored = courseIds.Count > 0 && await db.CourseInstructors.AnyAsync(ci => courseIds.Contains(ci.CourseId) && ci.UserId == uid, ct);
            if (!authored && asset.UploaderId != uid) throw AppException.NotFound("Video");
        }
        if (asset.ChannelId is not { } chId)
            throw AppException.Conflict("This video is not on a connected Mastemy channel.", "channel_not_authorized");
        var ch = await RequirePublishableChannel(chId, ct);
        return (asset, ch, courseIds);
    }

    public async Task<ThumbnailResult> SetThumbnail(Guid assetId, IFormFile? file, CancellationToken ct)
    {
        if (file is null || file.Length == 0) throw AppException.Bad("An image file is required.", "invalid_thumbnail");
        if (file.Length > MaxThumbnailBytes) throw AppException.Bad("Thumbnail must be at most 2 MB.", "invalid_thumbnail");
        var (asset, ch, _) = await RequireVideo(assetId, ct);
        var bytes = new byte[file.Length];
        await using (var s = file.OpenReadStream())
        {
            var read = 0;
            while (read < bytes.Length)
            {
                var n = await s.ReadAsync(bytes.AsMemory(read), ct);
                if (n == 0) break;
                read += n;
            }
            if (read != bytes.Length) throw AppException.Bad("The image upload was incomplete.", "invalid_thumbnail");
        }
        var type = bytes is [0xFF, 0xD8, 0xFF, ..] ? "image/jpeg"
            : bytes is [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, ..] ? "image/png"
            : throw AppException.Bad("Thumbnail must be a JPEG or PNG image.", "invalid_thumbnail");
        var content = new ByteArrayContent(bytes);
        content.Headers.ContentType = new MediaTypeHeaderValue(type);
        using (await Call(ch, HttpMethod.Post, $"{Upload}/thumbnails/set?videoId={Uri.EscapeDataString(asset.YouTubeVideoId)}&uploadType=media", content, ct)) { }
        audit.Record("youtube.thumbnail.set", "VideoAsset", asset.Id, new { videoId = asset.YouTubeVideoId, bytes = bytes.Length, type });
        await db.SaveChangesAsync(ct);
        return new ThumbnailResult(asset.YouTubeVideoId);
    }

    public async Task<CaptionPushResult> PushCaption(Guid assetId, CaptionPushRequest req, CancellationToken ct)
    {
        me.RequireId();
        if (req.ResourceFileId == Guid.Empty) throw AppException.Bad("resourceFileId is required.");
        var rf = await db.ResourceFiles.AsNoTracking().FirstOrDefaultAsync(r => r.Id == req.ResourceFileId, ct) ?? throw AppException.NotFound("Resource file");
        await RequireCourseAuthor(rf.CourseId, ct);
        if (!string.Equals(rf.Kind, "Caption", StringComparison.OrdinalIgnoreCase)) throw AppException.Bad("The resource file is not a caption file.", "not_a_caption");
        if (!LanguageRx().IsMatch(rf.Language ?? "")) throw AppException.Bad("The caption file has no valid language code.", "invalid_caption_language");
        if (rf.SizeBytes <= 0 || rf.SizeBytes > O.MaxCaptionBytes) throw AppException.Bad("Caption file size is not allowed.", "invalid_caption");

        var (asset, ch, courseIds) = await RequireVideo(assetId, ct);
        if (!courseIds.Contains(rf.CourseId)) throw AppException.Bad("The video is not used in the caption file's course.", "caption_course_mismatch");
        if (rf.LessonId is { } lessonId && !await db.Lessons.AnyAsync(l => l.Id == lessonId && l.VideoAssetId == asset.Id, ct))
            throw AppException.Bad("The caption file belongs to a lesson that does not use this video.", "caption_course_mismatch");

        var bytes = await ReadResource(rf, ct);
        var name = Path.GetFileNameWithoutExtension(rf.FileName);
        if (name.Length > 150) name = name[..150];
        var meta = new StringContent(JsonSerializer.Serialize(new { snippet = new { videoId = asset.YouTubeVideoId, language = rf.Language, name, isDraft = false } }),
            Encoding.UTF8, "application/json");
        var media = new ByteArrayContent(bytes);
        media.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
        var multipart = new MultipartContent("related") { meta, media };
        using var doc = await Call(ch, HttpMethod.Post, $"{Upload}/captions?part=snippet&uploadType=multipart", multipart, ct);
        var captionId = doc is null ? null : Str(doc.RootElement, "id");
        if (string.IsNullOrEmpty(captionId)) throw new AppException(502, "YouTube did not return a caption id.", YouTubeErrors.Upstream);
        audit.Record("youtube.caption.pushed", "VideoAsset", asset.Id, new { videoId = asset.YouTubeVideoId, resourceFileId = rf.Id, rf.Language, captionId });
        await db.SaveChangesAsync(ct);
        return new CaptionPushResult(captionId, asset.YouTubeVideoId, rf.Language!);
    }

    /// <summary>Reads a content-addressed resource from Resources:RootPath/StorageKey, refusing paths that escape the root.</summary>
    private async Task<byte[]> ReadResource(ResourceFile rf, CancellationToken ct)
    {
        var rootSetting = cfg["Resources:RootPath"];
        if (string.IsNullOrWhiteSpace(rootSetting)) throw new AppException(503, "Resource storage is not configured.", "resource_storage_unavailable");
        var root = Path.GetFullPath(rootSetting, env.ContentRootPath);
        if (string.IsNullOrWhiteSpace(rf.StorageKey)) throw AppException.Conflict("The caption file content is missing.", "resource_missing");
        var path = Path.GetFullPath(Path.Combine(root, rf.StorageKey));
        if (!path.StartsWith(Path.TrimEndingDirectorySeparator(root) + Path.DirectorySeparatorChar, StringComparison.Ordinal))
            throw AppException.Conflict("The caption file content is missing.", "resource_missing");
        if (!File.Exists(path)) throw AppException.Conflict("The caption file content is missing.", "resource_missing");
        var info = new FileInfo(path);
        if (info.Length > O.MaxCaptionBytes) throw AppException.Bad("Caption file size is not allowed.", "invalid_caption");
        var bytes = await File.ReadAllBytesAsync(path, ct);
        if (!string.IsNullOrEmpty(rf.Sha256)
            && !string.Equals(Convert.ToHexString(SHA256.HashData(bytes)), rf.Sha256, StringComparison.OrdinalIgnoreCase))
            throw AppException.Conflict("The caption file failed its integrity check.", "resource_integrity");
        return bytes;
    }
}
