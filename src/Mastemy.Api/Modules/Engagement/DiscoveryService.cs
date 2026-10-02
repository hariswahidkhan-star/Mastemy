using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Engagement;

/// <summary>
/// Wishlist, recently viewed, comparison and related courses (spec §4). Only live courses are exposed, and every
/// learner-facing field (title, level, language, categories, lesson/duration counts) comes from the course's current
/// published snapshot, so draft edits stay invisible until re-publish. Active question counts stay live (question edits
/// are staged by the question bank's own versioning).
/// </summary>
public class DiscoveryService(AppDbContext db, ICurrentUser me, CourseSnapshotService snapshots)
{
    public const int RecentLimit = 20;
    private IQueryable<Course> Live => db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr);

    private async Task<Course> RequireLive(Guid id) =>
        await Live.FirstOrDefaultAsync(c => c.Id == id) ?? throw AppException.NotFound("Course");

    private async Task<Dictionary<Guid, CourseCardLiteDto>> Cards(List<Guid> ids)
    {
        var cards = await snapshots.CardsFor(ids);
        var prices = (await db.Packages.AsNoTracking()
                .Where(p => ids.Contains(p.CourseId) && p.IsActive && p.ApprovalStatus == "Approved")
                .Select(p => new { p.CourseId, p.Price, p.Currency }).ToListAsync())
            .GroupBy(p => p.CourseId).ToDictionary(g => g.Key, g => g.OrderBy(x => x.Price).First());
        return cards.Values.ToDictionary(c => c.Id, c =>
        {
            prices.TryGetValue(c.Id, out var p);
            return new CourseCardLiteDto(c.Id, c.Slug, c.Title, c.Subtitle, c.Level, c.Language, p?.Price, p?.Currency);
        });
    }

    // ----- Wishlist -----
    public async Task AddWishlist(Guid courseId)
    {
        var uid = me.RequireId();
        await RequireLive(courseId);
        if (await db.Wishlist.AnyAsync(w => w.UserId == uid && w.CourseId == courseId)) return;
        db.Wishlist.Add(new WishlistItem { UserId = uid, CourseId = courseId });
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException)
        {
            // Concurrent duplicate add: idempotent if the row now exists.
            if (!await db.Wishlist.AsNoTracking().AnyAsync(w => w.UserId == uid && w.CourseId == courseId)) throw;
        }
    }

    public async Task RemoveWishlist(Guid courseId)
    {
        var uid = me.RequireId();
        await db.Wishlist.Where(w => w.UserId == uid && w.CourseId == courseId).ExecuteDeleteAsync();
    }

    public async Task<List<WishlistItemDto>> Wishlist()
    {
        var uid = me.RequireId();
        var rows = await db.Wishlist.AsNoTracking().Where(w => w.UserId == uid).OrderByDescending(w => w.CreatedAt).ToListAsync();
        var cards = await Cards(rows.Select(r => r.CourseId).ToList());
        return rows.Where(r => cards.ContainsKey(r.CourseId)).Select(r => new WishlistItemDto(cards[r.CourseId], r.CreatedAt)).ToList();
    }

    // ----- Recently viewed -----
    public async Task TrackView(Guid courseId)
    {
        var uid = me.RequireId();
        await RequireLive(courseId);
        var row = await db.RecentlyViewed.FirstOrDefaultAsync(r => r.UserId == uid && r.CourseId == courseId);
        if (row is null) db.RecentlyViewed.Add(new RecentlyViewed { UserId = uid, CourseId = courseId, ViewedAt = DateTime.UtcNow });
        else row.ViewedAt = DateTime.UtcNow;
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { /* concurrent first view for same pair: the other insert won, which is equivalent */ }

        var stale = await db.RecentlyViewed.Where(r => r.UserId == uid).OrderByDescending(r => r.ViewedAt)
            .Skip(RecentLimit).Select(r => r.CourseId).ToListAsync();
        if (stale.Count > 0)
            await db.RecentlyViewed.Where(r => r.UserId == uid && stale.Contains(r.CourseId)).ExecuteDeleteAsync();
    }

    public async Task<List<RecentlyViewedDto>> Recent()
    {
        var uid = me.RequireId();
        var rows = await db.RecentlyViewed.AsNoTracking().Where(r => r.UserId == uid).OrderByDescending(r => r.ViewedAt)
            .Take(RecentLimit).ToListAsync();
        var cards = await Cards(rows.Select(r => r.CourseId).ToList());
        return rows.Where(r => cards.ContainsKey(r.CourseId)).Select(r => new RecentlyViewedDto(cards[r.CourseId], r.ViewedAt)).ToList();
    }

    // ----- Compare -----
    public async Task<List<CompareCourseDto>> Compare(string? ids)
    {
        var parsed = new List<Guid>();
        foreach (var part in (ids ?? "").Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
        {
            if (!Guid.TryParse(part, out var g)) throw AppException.Bad($"'{part}' is not a valid course id.");
            if (!parsed.Contains(g)) parsed.Add(g);
        }
        if (parsed.Count is < 2 or > 4) throw AppException.Bad("Compare requires 2-4 distinct course ids.");
        var courses = await Live.Where(c => parsed.Contains(c.Id)).ToListAsync();
        if (courses.Count != parsed.Count) throw AppException.NotFound("Course");
        var published = await snapshots.ForCourses(courses);
        var snapLessons = published.Values.SelectMany(p => p.Payload.Modules.SelectMany(m => m.Lessons).Select(l => (CourseId: p.Course.Id, Lesson: l))).ToList();
        var states = await snapshots.VideoStates(snapLessons.Select(x => x.Lesson));
        var lessons = snapLessons.Select(x => new { x.CourseId, Ready = states[x.Lesson.Id].Playable, Duration = states[x.Lesson.Id].DurationSeconds }).ToList();
        var questions = await db.Questions.AsNoTracking().Where(q => parsed.Contains(q.CourseId) && q.State == QuestionState.Active)
            .GroupBy(q => q.CourseId).Select(g => new { g.Key, Count = g.Count() }).ToDictionaryAsync(x => x.Key, x => x.Count);
        var packages = await db.Packages.AsNoTracking()
            .Where(p => parsed.Contains(p.CourseId) && p.IsActive && p.ApprovalStatus == "Approved").OrderBy(p => p.Price).ToListAsync();
        var ratings = (await db.CourseReviews.AsNoTracking().Where(r => parsed.Contains(r.CourseId) && !r.Hidden)
                .GroupBy(r => r.CourseId).Select(g => new { g.Key, Sum = g.Sum(x => x.Rating), Count = g.Count() }).ToListAsync())
            .ToDictionary(x => x.Key);

        return parsed.Select(id =>
        {
            var c = courses.First(x => x.Id == id);
            var payload = published[id].Payload;
            var ls = lessons.Where(l => l.CourseId == id).ToList();
            ratings.TryGetValue(id, out var r);
            return new CompareCourseDto(c.Id, c.Slug, payload.Title, payload.Level, payload.Language, ls.Count, ls.Count(l => l.Ready),
                questions.GetValueOrDefault(id), ls.Where(l => l.Ready).Sum(l => l.Duration),
                packages.Where(p => p.CourseId == id).Select(p => new ComparePackageDto(p.Id, p.Title, p.Contents, p.Price, p.Currency, p.AccessDays)).ToList(),
                r is null ? null : Math.Round((decimal)r.Sum / r.Count, 2), r?.Count ?? 0, c.ReviewedAt, payload.CredentialType);
        }).ToList();
    }

    // ----- Related -----
    public async Task<List<CourseCardLiteDto>> Related(Guid courseId)
    {
        var self = (await snapshots.CardsFor([courseId])).GetValueOrDefault(courseId) ?? throw AppException.NotFound("Course");
        var cats = CourseSnapshotService.ParseCategoryIds(self.CategoryIds);
        if (cats.Length == 0) return [];
        // Candidates share at least one published category; overlap is ranked in memory from the small CategoryIds strings.
        var filter = CatalogQueryService.AnyCategory(cats);
        var candidates = await snapshots.LiveCards().Where(c => c.Id != courseId).Where(filter)
            .Select(c => new { c.Id, c.CategoryIds, c.PublishedAt, c.CreatedAt }).ToListAsync();
        candidates.AddRange((await snapshots.LegacyCards()).Where(c => c.Id != courseId)
            .Select(c => new { c.Id, c.CategoryIds, c.PublishedAt, c.CreatedAt }));
        var ranked = candidates
            .Select(c => new { CourseId = c.Id, Overlap = CourseSnapshotService.ParseCategoryIds(c.CategoryIds).Intersect(cats).Count(), c.PublishedAt, c.CreatedAt })
            .Where(c => c.Overlap > 0)
            .OrderByDescending(c => c.Overlap).ThenByDescending(c => c.PublishedAt).ThenByDescending(c => c.CreatedAt).ThenBy(c => c.CourseId)
            .Take(6).ToList();
        var cards = await Cards(ranked.Select(r => r.CourseId).ToList());
        return ranked.Where(r => cards.ContainsKey(r.CourseId)).Select(r => cards[r.CourseId]).ToList();
    }
}
