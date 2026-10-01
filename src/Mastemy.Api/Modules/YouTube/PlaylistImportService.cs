using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.YouTube;

public record PlaylistPreviewRequest(string? PlaylistUrl, Guid ChannelId);
public record PlaylistPreviewItem(string VideoId, string Title, int DurationSeconds, int Position, VideoStatus ExpectedStatus, string? Issue);
public record PlaylistPreviewDto(string PlaylistId, Guid ChannelId, IReadOnlyList<PlaylistPreviewItem> Items);

public record PlaylistCommitItem(string? VideoId, string? Title);
public record PlaylistCommitRequest(string? ModuleTitle, Guid ChannelId, bool RightsDeclared, string? RightsDeclarationText, List<PlaylistCommitItem>? Items);
public record PlaylistCommitLesson(Guid LessonId, string Title, int SortOrder, VideoAssetDto Video);
public record PlaylistCommitResult(Guid ModuleId, string ModuleTitle, IReadOnlyList<PlaylistCommitLesson> Lessons);

/// <summary>
/// Playlist import (spec §10.2): preview is a reviewable draft; commit creates a NEW module with draft lessons in the given order.
/// Nothing is published; course status is not changed.
/// </summary>
public class PlaylistImportService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit,
    ChannelPolicy channels, IYouTubeMetadataClient yt, IOptions<YouTubeOptions> opt)
{
    private async Task<Course> EditableCourse(Guid courseId, CancellationToken ct)
    {
        me.RequireId();
        var course = await db.Courses.FirstOrDefaultAsync(c => c.Id == courseId, ct) ?? throw AppException.NotFound("Course");
        await access.RequireCourseEditor(course.Id);
        CourseRules.RequireEditable(course);
        return course;
    }

    private void RequireKey()
    {
        if (!yt.HasApiKey)
            throw new AppException(400, "Playlist import needs a YouTube Data API key. Link videos one by one instead.", YouTubeErrors.ApiKeyRequired);
    }

    private async Task<Dictionary<string, VideoMetadata>> Fetch(IEnumerable<string> ids, CancellationToken ct)
    {
        var result = new Dictionary<string, VideoMetadata>(StringComparer.Ordinal);
        try
        {
            foreach (var batch in ids.Distinct().Chunk(50))
                foreach (var kv in await yt.GetVideosAsync(batch, ct)) result[kv.Key] = kv.Value;
        }
        catch (YouTubeApiException ex) { throw ex.ToAppException(); }
        return result;
    }

    public async Task<PlaylistPreviewDto> Preview(Guid courseId, PlaylistPreviewRequest req, CancellationToken ct)
    {
        await EditableCourse(courseId, ct);
        if (!YouTubeUrlParser.TryParsePlaylistId(req.PlaylistUrl, out var playlistId))
            throw AppException.Bad("Not a supported YouTube playlist URL or id.", "invalid_playlist_url");
        var channel = await channels.RequireUsable(req.ChannelId);
        RequireKey();

        IReadOnlyList<PlaylistItem> items;
        try { items = await yt.GetPlaylistItemsAsync(playlistId, Math.Clamp(opt.Value.PlaylistImportMaxItems, 1, 1000), ct); }
        catch (YouTubeApiException ex) { throw ex.ToAppException(); }
        var meta = await Fetch(items.Select(i => i.VideoId), ct);

        var preview = items.Select(i =>
        {
            var md = meta.GetValueOrDefault(i.VideoId);
            var ev = VideoEvaluator.Evaluate(md, channel.ChannelId);
            return new PlaylistPreviewItem(i.VideoId, md?.Title ?? i.Title, md?.DurationSeconds ?? 0, i.Position,
                ev.Status, ev.Reason);
        }).ToList();
        return new PlaylistPreviewDto(playlistId, channel.Id, preview);
    }

    public async Task<PlaylistCommitResult> Commit(Guid courseId, PlaylistCommitRequest req, CancellationToken ct)
    {
        var uid = me.RequireId();
        var course = await EditableCourse(courseId, ct);
        var moduleTitle = req.ModuleTitle?.Trim();
        if (string.IsNullOrWhiteSpace(moduleTitle) || moduleTitle.Length > 200) throw AppException.Bad("Module title is required (max 200 characters).");
        if (!req.RightsDeclared) throw AppException.Bad("You must declare that you hold the rights to use these videos.", "rights_required");
        var rightsText = req.RightsDeclarationText?.Trim();
        if (rightsText is { Length: > 2000 }) throw AppException.Bad("Rights declaration is too long (max 2000 characters).");
        var items = req.Items ?? [];
        var max = Math.Clamp(opt.Value.PlaylistImportMaxItems, 1, 1000);
        if (items.Count == 0 || items.Count > max) throw AppException.Bad($"Provide between 1 and {max} items.");
        foreach (var it in items)
        {
            if (!YouTubeUrlParser.IsValidVideoId(it.VideoId)) throw AppException.Bad($"Invalid video id '{it.VideoId}'.", "invalid_youtube_url");
            if (string.IsNullOrWhiteSpace(it.Title) || it.Title.Trim().Length > 200) throw AppException.Bad($"Title for {it.VideoId} is required (max 200 characters).");
        }
        if (items.Select(i => i.VideoId).Distinct().Count() != items.Count) throw AppException.Bad("Duplicate videos in import.");

        var channel = await channels.RequireUsable(req.ChannelId);
        RequireKey();
        var meta = await Fetch(items.Select(i => i.VideoId!), ct);

        var evals = items.ToDictionary(i => i.VideoId!, i => VideoEvaluator.Evaluate(meta.GetValueOrDefault(i.VideoId!), channel.ChannelId));
        var wrong = evals.Where(e => e.Value.WrongChannel).Select(e => e.Key).ToList();
        if (wrong.Count > 0)
            throw AppException.Conflict($"These videos are not on the selected channel: {string.Join(", ", wrong)}.", YouTubeErrors.WrongChannel);
        var missing = items.Where(i => !meta.ContainsKey(i.VideoId!)).Select(i => i.VideoId).ToList();
        if (missing.Count > 0) throw AppException.Bad($"These videos were not found on YouTube: {string.Join(", ", missing)}.", YouTubeErrors.NotFound);

        var sort = (await db.Modules.Where(m => m.CourseId == course.Id).MaxAsync(m => (int?)m.SortOrder, ct) ?? 0) + 1;
        var module = new CourseModule { CourseId = course.Id, Title = moduleTitle, SortOrder = sort, Code = $"M{sort}" };
        db.Modules.Add(module);

        var ids = items.Select(i => i.VideoId!).ToList();
        var existing = await db.VideoAssets.Where(a => a.ChannelId == channel.Id && ids.Contains(a.YouTubeVideoId)).ToListAsync(ct);
        var lessons = new List<PlaylistCommitLesson>();
        var n = 0;
        foreach (var it in items)
        {
            n++;
            var md = meta[it.VideoId!];
            var asset = existing.FirstOrDefault(a => a.YouTubeVideoId == it.VideoId);
            if (asset is null)
            {
                asset = new VideoAsset { YouTubeVideoId = it.VideoId!, ChannelId = channel.Id, UploaderId = uid };
                db.VideoAssets.Add(asset);
            }
            VideoLinkService.Apply(asset, md, channel.ChannelId);
            asset.Title = it.Title!.Trim();
            asset.RightsDeclared = true;
            asset.RightsDeclarationText = string.IsNullOrWhiteSpace(rightsText) ? asset.RightsDeclarationText : rightsText;
            asset.VideoOwnerUserId ??= channel.Mode == ChannelMode.InstructorOwned ? channel.OwnerUserId : null;
            var lesson = new Lesson { ModuleId = module.Id, Title = it.Title.Trim(), SortOrder = n, Code = $"M{sort}-L{n}", VideoAssetId = asset.Id };
            db.Lessons.Add(lesson);
            lessons.Add(new PlaylistCommitLesson(lesson.Id, lesson.Title, n, VideoAssetDto.From(asset)));
        }
        audit.Record("playlist.imported", "Course", course.Id, new { moduleId = module.Id, channelId = channel.Id, count = items.Count });
        await db.SaveChangesAsync(ct);
        return new PlaylistCommitResult(module.Id, module.Title, lessons);
    }
}
