using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.YouTube;

/// <summary>Who may use which channel (spec §10.4). Mode A: any approved instructor; Mode B: only its owner and only when enabled.</summary>
public class ChannelPolicy(AppDbContext db, ICurrentUser me, FeatureFlagService flags)
{
    public bool IsApprovedInstructor => me.IsStaff || me.IsInRole(Roles.Instructor);

    public async Task<bool> CanUse(YouTubeChannel ch)
    {
        var uid = me.Id;
        if (uid is null || !ch.IsActive) return false;
        return ch.Mode switch
        {
            ChannelMode.MastemyManaged => IsApprovedInstructor,
            ChannelMode.InstructorOwned => ch.OwnerUserId == uid && me.IsInRole(Roles.Instructor)
                                           && await flags.IsEnabled(FeatureFlags.InstructorOwnedChannelsEnabled),
            _ => false,
        };
    }

    public async Task<List<YouTubeChannel>> Usable()
    {
        var uid = me.RequireId();
        var ownedEnabled = await flags.IsEnabled(FeatureFlags.InstructorOwnedChannelsEnabled);
        var q = db.YouTubeChannels.AsNoTracking().Where(c => c.IsActive);
        var list = await q.Where(c => (c.Mode == ChannelMode.MastemyManaged && IsApprovedInstructor)
                                      || (c.Mode == ChannelMode.InstructorOwned && ownedEnabled && c.OwnerUserId == uid))
                          .OrderBy(c => c.Title).ToListAsync();
        return me.IsInRole(Roles.Instructor) ? list : list.Where(c => c.Mode == ChannelMode.MastemyManaged).ToList();
    }

    public async Task<YouTubeChannel> RequireUsable(Guid channelId)
    {
        var ch = await db.YouTubeChannels.FirstOrDefaultAsync(c => c.Id == channelId) ?? throw AppException.NotFound("Channel");
        if (!await CanUse(ch)) throw AppException.Forbidden("You may not use this YouTube channel.");
        return ch;
    }

    public static bool IsAuthorized(YouTubeChannel ch) => ch.IsActive && ch.EncryptedRefreshToken is not null && ch.RevokedAt is null;
}

public static class CourseRules
{
    /// <summary>Statuses in which authors may change course structure/content.</summary>
    public static bool IsEditable(CourseStatus s) => s is CourseStatus.Draft or CourseStatus.ChangesRequested or CourseStatus.Updating;

    public static void RequireEditable(Course c)
    {
        if (!IsEditable(c.Status))
            throw AppException.Conflict($"Course is {c.Status} and cannot be edited. Start an update first.", "course_not_editable");
    }
}

public record VideoAssetDto(Guid Id, string YouTubeVideoId, Guid? ChannelId, string? ObservedChannelId, string Title, int DurationSeconds,
    VideoStatus Status, string? StatusReason, string? PrivacyStatus, bool? Embeddable, bool MetadataEnteredManually,
    bool RightsDeclared, Guid UploaderId, DateTime? LastCheckedAt, DateTime CreatedAt)
{
    public static VideoAssetDto From(VideoAsset a) => new(a.Id, a.YouTubeVideoId, a.ChannelId, a.ObservedChannelId, a.Title, a.DurationSeconds,
        a.Status, a.StatusReason, a.PrivacyStatus, a.Embeddable, a.MetadataEnteredManually, a.RightsDeclared, a.UploaderId, a.LastCheckedAt, a.CreatedAt);
}

public record LinkVideoRequest(string? Url, Guid ChannelId, bool RightsDeclared, string? RightsDeclarationText, string? Title, int? DurationSeconds);

public class VideoLinkService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit,
    ChannelPolicy channels, IYouTubeMetadataClient yt)
{
    public const string ManualReviewReason =
        "Metadata entered manually (no YouTube Data API key): channel, privacy, processing and embedding were not verified. Reviewer confirmation required.";

    public async Task<VideoAssetDto> Link(Guid lessonId, LinkVideoRequest req, CancellationToken ct)
    {
        var uid = me.RequireId();
        var lesson = await db.Lessons.FirstOrDefaultAsync(l => l.Id == lessonId, ct) ?? throw AppException.NotFound("Lesson");
        var course = await db.Modules.Where(m => m.Id == lesson.ModuleId).Join(db.Courses, m => m.CourseId, c => c.Id, (m, c) => c)
                         .FirstOrDefaultAsync(ct) ?? throw AppException.NotFound("Course");
        await access.RequireCourseEditor(course.Id);
        CourseRules.RequireEditable(course);

        if (!req.RightsDeclared) throw AppException.Bad("You must declare that you hold the rights to use this video.", "rights_required");
        var rightsText = req.RightsDeclarationText?.Trim();
        if (rightsText is { Length: > 2000 }) throw AppException.Bad("Rights declaration is too long (max 2000 characters).");
        if (!YouTubeUrlParser.TryParseVideoId(req.Url, out var videoId))
            throw AppException.Bad("Not a supported YouTube video URL or id.", "invalid_youtube_url");
        var manualTitle = req.Title?.Trim();
        if (manualTitle is { Length: > 200 }) throw AppException.Bad("Title is too long (max 200 characters).");
        if (req.DurationSeconds is < 0 or > 86_400) throw AppException.Bad("Duration must be between 1 second and 24 hours.");

        var channel = await channels.RequireUsable(req.ChannelId);

        string title; int duration; VideoStatus status; string? reason; string? privacy = null; bool? embeddable = null;
        string? observed = null; bool manual = false;
        if (yt.HasApiKey)
        {
            IReadOnlyDictionary<string, VideoMetadata> map;
            try { map = await yt.GetVideosAsync([videoId], ct); }
            catch (YouTubeApiException ex) { throw ex.ToAppException(); }
            var md = map.GetValueOrDefault(videoId);
            var ev = VideoEvaluator.Evaluate(md, channel.ChannelId);
            if (ev.WrongChannel)
                throw AppException.Conflict($"This video belongs to YouTube channel {md!.ChannelId}, not the selected channel \"{channel.Title}\".", YouTubeErrors.WrongChannel);
            status = ev.Status; reason = ev.Reason;
            title = !string.IsNullOrWhiteSpace(manualTitle) ? manualTitle : md?.Title ?? manualTitle ?? "";
            duration = md?.DurationSeconds ?? req.DurationSeconds ?? 0;
            privacy = md?.PrivacyStatus; embeddable = md?.Embeddable; observed = md?.ChannelId;
            if (string.IsNullOrWhiteSpace(title)) title = videoId;
        }
        else
        {
            var oe = await yt.GetOEmbedAsync(videoId, ct);
            manual = true;
            title = !string.IsNullOrWhiteSpace(manualTitle) ? manualTitle : oe.Title ?? "";
            duration = req.DurationSeconds ?? 0;
            switch (oe.Outcome)
            {
                case OEmbedOutcome.NotFound:
                    status = VideoStatus.Failed; reason = VideoEvaluator.NotFoundReason; break;
                case OEmbedOutcome.Unauthorized:
                    status = VideoStatus.Restricted; reason = "YouTube refused to embed this video (private or embedding disabled)."; embeddable = false; break;
                default:
                    if (string.IsNullOrWhiteSpace(title) || duration <= 0)
                        throw AppException.Bad(oe.Outcome == OEmbedOutcome.Unavailable
                            ? "YouTube could not be reached to read this video's details (no YouTube Data API key is configured). Enter the title and duration manually; a reviewer will confirm the video before publication."
                            : "Without a YouTube Data API key, enter the lesson title and duration manually.", "manual_metadata_required");
                    status = VideoStatus.InContentReview; reason = ManualReviewReason;
                    if (oe.Outcome == OEmbedOutcome.Found) embeddable = true;
                    break;
            }
            if (string.IsNullOrWhiteSpace(title)) title = videoId;
        }

        var candidates = await db.VideoAssets.Where(a => a.YouTubeVideoId == videoId && a.ChannelId == channel.Id).ToListAsync(ct);
        var usages = await VideoAssetSharing.UsagesAsync(db, candidates.Select(c => c.Id), ct);
        var asset = await VideoAssetSharing.PickMutableAsync(me, access, candidates, lesson.Id, usages);
        var isNew = asset is null;
        if (asset is null)
        {
            asset = new VideoAsset { YouTubeVideoId = videoId, ChannelId = channel.Id, UploaderId = uid };
            db.VideoAssets.Add(asset);
        }
        // Never downgrade an already-Ready asset from link: the manual/oEmbed path cannot verify anything, and a transient
        // non-Ready Data API result must not break live lessons (the availability checker is the authority for downgrades).
        var keepStatus = !isNew && asset.Status == VideoStatus.Ready && status != VideoStatus.Ready
                         && (manual || VideoAssetSharing.IsReadyAndLive(asset, usages));
        if (!keepStatus)
        {
            asset.ObservedChannelId = observed;
            asset.Status = status;
            asset.StatusReason = reason;
            asset.PrivacyStatus = privacy;
            asset.Embeddable = embeddable;
            asset.MetadataEnteredManually = manual;
            asset.DurationSeconds = duration;
        }
        else status = asset.Status;
        asset.Title = title;
        asset.RightsDeclared = true;
        asset.RightsDeclarationText = string.IsNullOrWhiteSpace(rightsText) ? asset.RightsDeclarationText : rightsText;
        asset.VideoOwnerUserId ??= channel.Mode == ChannelMode.InstructorOwned ? channel.OwnerUserId : null;
        asset.LastCheckedAt = DateTime.UtcNow;
        lesson.VideoAssetId = asset.Id;
        audit.Record("video.linked", "Lesson", lesson.Id, new { videoId, channelId = channel.Id, status = status.ToString(), manual });
        await db.SaveChangesAsync(ct);
        return VideoAssetDto.From(asset);
    }

    public async Task<VideoAssetDto> Recheck(Guid assetId, CancellationToken ct)
    {
        var uid = me.RequireId();
        var asset = await db.VideoAssets.FirstOrDefaultAsync(a => a.Id == assetId, ct) ?? throw AppException.NotFound("Video");
        if (!me.CanReview && asset.UploaderId != uid)
        {
            var courseIds = await db.Lessons.Where(l => l.VideoAssetId == asset.Id)
                .Join(db.Modules, l => l.ModuleId, m => m.Id, (l, m) => m.CourseId).Distinct().ToListAsync(ct);
            var ok = false;
            foreach (var cid in courseIds) if (await access.IsCourseAuthor(cid)) { ok = true; break; }
            if (!ok) throw AppException.Forbidden();
        }

        var old = asset.Status;
        if (yt.HasApiKey)
        {
            var expected = asset.ChannelId is { } chId
                ? await db.YouTubeChannels.Where(c => c.Id == chId).Select(c => c.ChannelId).FirstOrDefaultAsync(ct) : null;
            IReadOnlyDictionary<string, VideoMetadata> map;
            try { map = await yt.GetVideosAsync([asset.YouTubeVideoId], ct); }
            catch (YouTubeApiException ex) { throw ex.ToAppException(); }
            Apply(asset, map.GetValueOrDefault(asset.YouTubeVideoId), expected ?? "");
        }
        else
        {
            var oe = await yt.GetOEmbedAsync(asset.YouTubeVideoId, ct);
            if (oe.Outcome == OEmbedOutcome.NotFound) { asset.Status = VideoStatus.Failed; asset.StatusReason = VideoEvaluator.NotFoundReason; }
            else if (oe.Outcome == OEmbedOutcome.Unauthorized)
            { asset.Status = VideoStatus.Restricted; asset.StatusReason = "YouTube refused to embed this video (private or embedding disabled)."; asset.Embeddable = false; }
            else if (oe.Outcome == OEmbedOutcome.Found && asset.Status is VideoStatus.Restricted or VideoStatus.Failed && asset.MetadataEnteredManually)
            { asset.Status = VideoStatus.InContentReview; asset.StatusReason = ManualReviewReason; asset.Embeddable = true; }
            asset.LastCheckedAt = DateTime.UtcNow;
        }
        audit.Record("video.rechecked", "VideoAsset", asset.Id, new { from = old.ToString(), to = asset.Status.ToString() });
        await db.SaveChangesAsync(ct);
        return VideoAssetDto.From(asset);
    }

    /// <summary>Applies Data API metadata to an asset (used by recheck and the background checker).</summary>
    public static void Apply(VideoAsset asset, VideoMetadata? md, string expectedChannelId)
    {
        var ev = VideoEvaluator.Evaluate(md, expectedChannelId);
        asset.Status = ev.Status;
        asset.StatusReason = ev.Reason;
        asset.LastCheckedAt = DateTime.UtcNow;
        if (md is null) return;
        asset.ObservedChannelId = md.ChannelId;
        asset.PrivacyStatus = md.PrivacyStatus;
        asset.Embeddable = md.Embeddable;
        if (md.DurationSeconds > 0) asset.DurationSeconds = md.DurationSeconds;
        asset.MetadataEnteredManually = false;
    }

    /// <summary>
    /// Staff manual override: mark a video Restricted or Failed (e.g. YouTube removed it, wrong channel) with a reason.
    /// Ready is never set here — it goes through reviewer confirmation. Upload-pipeline states cannot be overridden.
    /// </summary>
    public async Task<VideoAssetDto> StaffMark(Guid assetId, string? status, string? reason, CancellationToken ct)
    {
        me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        if (string.Equals(status?.Trim(), nameof(VideoStatus.Ready), StringComparison.OrdinalIgnoreCase))
            throw AppException.Bad("Videos become Ready only through reviewer confirmation (POST /api/admin/youtube/videos/{id}/confirm).", "use_confirm");
        VideoStatus target = (status?.Trim().ToLowerInvariant()) switch
        {
            "restricted" => VideoStatus.Restricted,
            "failed" => VideoStatus.Failed,
            _ => throw AppException.Bad("status must be Restricted or Failed.", "invalid_status"),
        };
        reason = reason?.Trim();
        if (string.IsNullOrEmpty(reason) || reason.Length > 1000) throw AppException.Bad("reason is required (max 1000 characters).");
        var asset = await db.VideoAssets.FirstOrDefaultAsync(a => a.Id == assetId, ct) ?? throw AppException.NotFound("Video");
        if (asset.Status is VideoStatus.Draft or VideoStatus.AwaitingApproval or VideoStatus.AwaitingSourceFile or VideoStatus.Uploading)
            throw AppException.Conflict($"Video is {asset.Status}; manage it through its upload session instead.", "invalid_state");
        var from = asset.Status;
        asset.Status = target;
        asset.StatusReason = reason;
        asset.LastCheckedAt = DateTime.UtcNow;
        audit.Record("video.marked", "VideoAsset", asset.Id, new { from = from.ToString(), to = target.ToString(), reason });
        await db.SaveChangesAsync(ct);
        return VideoAssetDto.From(asset);
    }

    public async Task<VideoAssetDto> ReviewerConfirm(Guid assetId, bool approve, string? reason, CancellationToken ct)
    {
        me.RequireId();
        if (!me.CanReview) throw AppException.Forbidden();
        var asset = await db.VideoAssets.FirstOrDefaultAsync(a => a.Id == assetId, ct) ?? throw AppException.NotFound("Video");
        if (asset.Status != VideoStatus.InContentReview)
            throw AppException.Conflict($"Video is {asset.Status}; only videos in content review can be confirmed.", "invalid_state");
        reason = reason?.Trim();
        if (reason is { Length: > 1000 }) throw AppException.Bad("Reason is too long (max 1000 characters).");
        if (approve)
        {
            asset.Status = VideoStatus.Ready;
            asset.StatusReason = string.IsNullOrWhiteSpace(reason) ? "Confirmed by reviewer (public/unlisted, embeddable, correct channel)." : reason;
        }
        else
        {
            if (string.IsNullOrWhiteSpace(reason)) throw AppException.Bad("A reason is required when rejecting a video.");
            asset.Status = VideoStatus.Restricted;
            asset.StatusReason = reason;
        }
        asset.LastCheckedAt = DateTime.UtcNow;
        audit.Record(approve ? "video.confirmed" : "video.rejected", "VideoAsset", asset.Id, new { reason });
        await db.SaveChangesAsync(ct);
        return VideoAssetDto.From(asset);
    }
}
