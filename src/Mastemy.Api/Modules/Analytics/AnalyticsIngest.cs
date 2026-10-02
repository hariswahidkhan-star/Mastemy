using System.Security.Cryptography;
using System.Text;
using System.Threading.RateLimiting;
using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Analytics;

public record AnalyticsEventInput(string Type, Guid? CourseId, Guid? LessonId, DateTime? Ts);
public record AnalyticsEventsRequest(List<AnalyticsEventInput>? Events);
public record AnalyticsIngestResult(int Accepted, int Rejected);
public record ConsentDto(bool Analytics, string Source);
public record ConsentRequest(bool Analytics);

public static class AnalyticsEventTypes
{
    public const string CourseView = "course_view", LessonView = "lesson_view", VideoPlay = "video_play", VideoComplete = "video_complete",
        PreviewPlay = "preview_play", CheckoutStart = "checkout_start", Search = "search";
    public static readonly string[] All = [CourseView, LessonView, VideoPlay, VideoComplete, PreviewPlay, CheckoutStart, Search];
}

/// <summary>Per-client fixed-window limiter for event ingest (in-process; the client key is never stored).</summary>
public sealed class AnalyticsRateLimiter(IConfiguration cfg) : IDisposable
{
    private readonly PartitionedRateLimiter<string> _limiter = PartitionedRateLimiter.Create<string, string>(key =>
        RateLimitPartition.GetFixedWindowLimiter(key, _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = Math.Max(1, cfg.GetValue("Analytics:EventsPerMinute", 120)), Window = TimeSpan.FromMinutes(1), QueueLimit = 0,
        }));

    public bool TryAcquire(string key, int permits)
    {
        using var lease = _limiter.AttemptAcquire(key, permits);
        return lease.IsAcquired;
    }

    public void Dispose() => _limiter.Dispose();
}

/// <summary>
/// Consent-based first-party analytics (spec §21). Events are stored only when the visitor has opted in: an authenticated
/// user's stored choice wins; otherwise the <c>mastemy_consent</c> cookie must contain <c>analytics</c>. Without consent the
/// request is refused (403 <c>consent_required</c>) and nothing is written.
/// </summary>
public class AnalyticsIngestService(AppDbContext db, ICurrentUser me, IConfiguration cfg, AnalyticsRateLimiter limiter)
{
    public const string ConsentCookie = "mastemy_consent";
    public const int MaxBatch = 20;

    public static bool CookieGrantsAnalytics(string? cookie) =>
        !string.IsNullOrWhiteSpace(cookie) && cookie.Split([',', ' ', '|', ';'], StringSplitOptions.RemoveEmptyEntries)
            .Any(t => string.Equals(t, "analytics", StringComparison.OrdinalIgnoreCase));

    public async Task<ConsentDto> Consent(string? cookie)
    {
        if (me.Id is { } uid)
        {
            var row = await db.Set<AnalyticsConsent>().AsNoTracking().FirstOrDefaultAsync(c => c.UserId == uid);
            if (row is not null) return new ConsentDto(row.Analytics, "account");
        }
        return new ConsentDto(CookieGrantsAnalytics(cookie), "cookie");
    }

    public async Task<ConsentDto> SetConsent(bool analytics)
    {
        if (me.Id is not { } uid) return new ConsentDto(analytics, "cookie");
        var row = await db.Set<AnalyticsConsent>().FirstOrDefaultAsync(c => c.UserId == uid);
        if (row is null) db.Set<AnalyticsConsent>().Add(row = new AnalyticsConsent { UserId = uid });
        row.Analytics = analytics;
        row.UpdatedAt = DateTime.UtcNow;
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException)
        {
            db.ChangeTracker.Clear();
            await db.Set<AnalyticsConsent>().Where(c => c.UserId == uid)
                .ExecuteUpdateAsync(s => s.SetProperty(c => c.Analytics, analytics).SetProperty(c => c.UpdatedAt, DateTime.UtcNow));
        }
        return new ConsentDto(analytics, "account");
    }

    public async Task<AnalyticsIngestResult> Ingest(AnalyticsEventsRequest req, string? cookie, string clientKey)
    {
        if (!(await Consent(cookie)).Analytics) throw new AppException(403, "Analytics consent has not been given.", "consent_required");
        var events = req.Events ?? throw AppException.Bad("events is required.");
        if (events.Count is 0 or > MaxBatch) throw AppException.Bad($"events must contain 1 to {MaxBatch} items.");
        if (!limiter.TryAcquire(clientKey, events.Count)) throw new AppException(429, "Too many analytics events. Slow down.", "rate_limited");

        var now = DateTime.UtcNow;
        var courseIds = events.Where(e => e?.CourseId is not null).Select(e => e.CourseId!.Value).Distinct().ToList();
        var liveCourses = courseIds.Count == 0 ? [] : (await db.Courses.AsNoTracking().Where(c => courseIds.Contains(c.Id))
            .Where(AccessService.IsLiveExpr).Select(c => c.Id).ToListAsync()).ToHashSet();
        var lessonIds = events.Where(e => e?.LessonId is not null).Select(e => e.LessonId!.Value).Distinct().ToList();
        var lessonCourse = lessonIds.Count == 0 ? [] : await db.SnapshotLessons.AsNoTracking().Where(s => lessonIds.Contains(s.LessonId))
            .Select(s => new { s.LessonId, s.CourseId }).Distinct().ToListAsync();
        var anon = AnonId(me.Id?.ToString() ?? clientKey, now);
        var accepted = 0;
        foreach (var e in events)
        {
            if (e is null || !AnalyticsEventTypes.All.Contains(e.Type)) continue;
            var ts = e.Ts is { } t ? (t.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(t, DateTimeKind.Utc) : t.ToUniversalTime()) : now;
            if (ts < now.AddHours(-24) || ts > now.AddMinutes(5)) continue;
            if (e.CourseId is { } cid && !liveCourses.Contains(cid)) continue;
            if (e.LessonId is { } lid && (e.CourseId is null || !lessonCourse.Any(x => x.LessonId == lid && x.CourseId == e.CourseId))) continue;
            db.Set<AnalyticsEvent>().Add(new AnalyticsEvent { Type = e.Type, CourseId = e.CourseId, LessonId = e.LessonId, AnonId = anon, OccurredAt = ts, ReceivedAt = now });
            accepted++;
        }
        if (accepted > 0) await db.SaveChangesAsync();
        return new AnalyticsIngestResult(accepted, events.Count - accepted);
    }

    /// <summary>HMAC(secret, UTC date | visitor key): stable within a day for de-duplication, unlinkable across days.</summary>
    public string AnonId(string visitorKey, DateTime nowUtc)
    {
        using var h = new HMACSHA256(Secret());
        var mac = h.ComputeHash(Encoding.UTF8.GetBytes(nowUtc.ToString("yyyy-MM-dd") + "|" + visitorKey));
        return Convert.ToHexString(mac, 0, 16).ToLowerInvariant();
    }

    private byte[] Secret()
    {
        var s = cfg["Analytics:HashSecret"];
        if (!string.IsNullOrWhiteSpace(s)) return Encoding.UTF8.GetBytes(s);
        // Fallback: derived from the (required) JWT signing key, so it is stable across instances without extra config.
        return SHA256.HashData(Encoding.UTF8.GetBytes("mastemy-analytics-v1|" + (cfg["Jwt:Key"] ?? "")));
    }
}
