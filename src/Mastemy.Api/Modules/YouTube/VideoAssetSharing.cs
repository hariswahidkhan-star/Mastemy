using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.YouTube;

/// <summary>
/// Guards shared <see cref="VideoAsset"/> rows. Several lessons (possibly in courses of different instructors) can reference
/// the same asset row. A caller may only mutate an existing asset when every lesson referencing it belongs to a course the
/// caller authors (staff excepted); otherwise the caller gets a separate asset row for their own lesson. Downgrades of a
/// Ready asset are left to the availability checker / explicit recheck, never to a link or import.
/// </summary>
public static class VideoAssetSharing
{
    public record Usage(Guid AssetId, Guid LessonId, Guid CourseId, bool CourseLive);

    public static async Task<List<Usage>> UsagesAsync(AppDbContext db, IEnumerable<Guid> assetIds, CancellationToken ct)
    {
        var ids = assetIds.Distinct().ToList();
        if (ids.Count == 0) return [];
        var rows = await (from l in db.Lessons.AsNoTracking()
                          join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                          join c in db.Courses.AsNoTracking() on m.CourseId equals c.Id
                          where l.VideoAssetId != null && ids.Contains(l.VideoAssetId!.Value)
                          select new { AssetId = l.VideoAssetId!.Value, LessonId = l.Id, CourseId = c.Id, c.Status, c.PublishedAt }).ToListAsync(ct);
        return rows.Select(r => new Usage(r.AssetId, r.LessonId, r.CourseId, AccessService.IsLive(r.Status, r.PublishedAt))).ToList();
    }

    /// <summary>
    /// Picks an existing candidate the caller may mutate (preferring the one already on <paramref name="lessonId"/>), or null when
    /// a new asset row must be created.
    /// </summary>
    public static async Task<VideoAsset?> PickMutableAsync(ICurrentUser me, AccessService access,
        IReadOnlyList<VideoAsset> candidates, Guid? lessonId, List<Usage> usages)
    {
        if (candidates.Count == 0) return null;
        var ordered = candidates.OrderByDescending(a => usages.Any(u => u.AssetId == a.Id && u.LessonId == lessonId)).ThenBy(a => a.CreatedAt);
        var authorCache = new Dictionary<Guid, bool>();
        foreach (var a in ordered)
        {
            if (me.IsStaff) return a;
            var ok = true;
            foreach (var cid in usages.Where(u => u.AssetId == a.Id && u.LessonId != lessonId).Select(u => u.CourseId).Distinct())
            {
                if (!authorCache.TryGetValue(cid, out var isAuthor)) authorCache[cid] = isAuthor = await access.IsCourseAuthor(cid);
                if (!isAuthor) { ok = false; break; }
            }
            if (ok) return a;
        }
        return null;
    }

    /// <summary>True when the asset is Ready and referenced by a lesson of a live course: link/import must not flip it.</summary>
    public static bool IsReadyAndLive(VideoAsset a, List<Usage> usages) =>
        a.Status == VideoStatus.Ready && usages.Any(u => u.AssetId == a.Id && u.CourseLive);
}
