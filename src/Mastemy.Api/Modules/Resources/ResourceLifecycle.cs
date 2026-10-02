using System.Net;
using System.Threading.RateLimiting;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Mastemy.Api.Modules.Resources;

/// <summary>
/// Blob lifetime for resource files. Learners download the blob pinned in the course's current published snapshot, so a
/// blob is kept while any non-deleted row of the course (or, for legacy shared keys, any row at all) or the current
/// snapshot still references it. Studio deletes are soft while the current snapshot still serves the file; the row and
/// blob are purged by <see cref="AfterPublish"/> once a newer snapshot no longer references them.
/// </summary>
public class ResourceBlobJanitor(AppDbContext db, IResourceStorage storage, ILogger<ResourceBlobJanitor> log)
{
    /// <summary>Resources of the course's current snapshot (empty when never published or the snapshot predates frozen resources).</summary>
    public async Task<List<SnapshotResource>> CurrentSnapshotResources(Guid courseId, CancellationToken ct = default)
    {
        var json = await (from c in db.Courses.AsNoTracking()
                          join s in db.CourseSnapshots.AsNoTracking() on new { Id = c.Id, V = c.PublishedVersion } equals new { Id = s.CourseId, V = s.Version }
                          where c.Id == courseId
                          select s.PayloadJson).FirstOrDefaultAsync(ct);
        return json is null ? [] : CourseSnapshotService.Deserialize(json).Resources ?? [];
    }

    /// <summary>Deletes the blob unless a row or the course's current snapshot still references it.</summary>
    public async Task ReleaseIfUnreferenced(Guid courseId, string key, CancellationToken ct = default)
    {
        if (string.IsNullOrEmpty(key)) return;
        var rowRef = ResourceStorageKeys.IsCourseScoped(key)
            ? await db.ResourceFiles.AnyAsync(x => x.CourseId == courseId && x.StorageKey == key && x.DeletedAt == null, ct)
            // Legacy bare-digest keys may be shared by other courses: any remaining row (even soft-deleted, which another
            // course's snapshot may still serve) keeps the blob.
            : await db.ResourceFiles.AnyAsync(x => x.StorageKey == key, ct);
        if (rowRef) return;
        if ((await CurrentSnapshotResources(courseId, ct)).Any(r => r.StorageKey == key)) return;
        await storage.DeleteAsync(key, ct);
    }

    /// <summary>
    /// Runs after a new snapshot is saved: hard-deletes soft-deleted rows the new snapshot no longer serves, and releases
    /// their blobs plus blobs only the previous snapshot referenced (replaced file versions). Failures are logged, never
    /// surfaced: an orphaned blob is harmless, a failed publish is not.
    /// </summary>
    public async Task AfterPublish(Guid courseId, int previousVersion, CancellationToken ct = default)
    {
        try
        {
            var current = await CurrentSnapshotResources(courseId, ct);
            var servedIds = current.Select(r => r.Id).ToHashSet();
            var deleted = await db.ResourceFiles.Where(x => x.CourseId == courseId && x.DeletedAt != null).ToListAsync(ct);
            var purge = deleted.Where(x => !servedIds.Contains(x.Id)).ToList();
            var keys = purge.Select(x => x.StorageKey).ToHashSet();
            if (previousVersion > 0)
            {
                var prev = await db.CourseSnapshots.AsNoTracking().Where(s => s.CourseId == courseId && s.Version == previousVersion)
                    .Select(s => s.PayloadJson).FirstOrDefaultAsync(ct);
                if (prev is not null)
                    foreach (var r in CourseSnapshotService.Deserialize(prev).Resources ?? []) keys.Add(r.StorageKey);
            }
            if (purge.Count > 0)
            {
                db.ResourceFiles.RemoveRange(purge);
                await db.SaveChangesAsync(ct);
            }
            foreach (var key in keys) await ReleaseIfUnreferenced(courseId, key, ct);
        }
        catch (Exception ex) when (ex is not OperationCanceledException)
        {
            log.LogWarning(ex, "Resource purge after publishing course {CourseId} failed; blobs will be retried on the next publish.", courseId);
        }
    }
}

/// <summary>Parsed caption cues cached per (resource id, version), bounded by total cue count.</summary>
public sealed class CaptionCueCache : IDisposable
{
    public const long MaxCachedCues = 200_000;
    private readonly MemoryCache cache = new(new MemoryCacheOptions { SizeLimit = MaxCachedCues });

    public async Task<List<CaptionCue>> GetOrLoad(Guid resourceId, int version, Func<Task<List<CaptionCue>>> load)
    {
        var key = (resourceId, version);
        if (cache.TryGetValue(key, out List<CaptionCue>? hit) && hit is not null) return hit;
        var cues = await load();
        cache.Set(key, cues, new MemoryCacheEntryOptions { Size = Math.Max(1, cues.Count), SlidingExpiration = TimeSpan.FromMinutes(30) });
        return cues;
    }

    public void Dispose() => cache.Dispose();
}

/// <summary>Per-client-IP token bucket for the transcript search endpoint (Resources:TranscriptPerMinute, default 60).</summary>
public sealed class TranscriptRateLimiter : IDisposable
{
    private readonly PartitionedRateLimiter<string> limiter;

    public TranscriptRateLimiter(ResourceOptions opt)
    {
        var perMinute = opt.TranscriptPerMinute;
        limiter = PartitionedRateLimiter.Create<string, string>(ip => RateLimitPartition.GetTokenBucketLimiter(ip, _ => new TokenBucketRateLimiterOptions
        {
            TokenLimit = perMinute, TokensPerPeriod = perMinute, ReplenishmentPeriod = TimeSpan.FromMinutes(1),
            QueueLimit = 0, AutoReplenishment = true,
        }));
    }

    /// <summary>Throws 429 when the caller's bucket is empty.</summary>
    public void Acquire(IPAddress? ip)
    {
        using var lease = limiter.AttemptAcquire(ip?.ToString() ?? "unknown");
        if (!lease.IsAcquired) throw new AppException(429, "Too many transcript searches; try again in a minute.", "rate_limited");
    }

    public void Dispose() => limiter.Dispose();
}
