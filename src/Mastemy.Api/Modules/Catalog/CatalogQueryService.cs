using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Catalog;

/// <summary>
/// Public (anonymous) catalog reads. Only live courses (AccessService.IsLive) are ever returned, and every learner-facing
/// field (title, description, level, language, categories, curriculum, counts) comes from the course's latest published
/// snapshot, never from the working copy, so unreviewed edits are invisible until the next publish.
/// Search: SQL prefilters live courses with LIKE on the snapshot JSON (one predicate per term), then matches the terms
/// exactly against the snapshot's title/subtitle/description and filters/sorts/pages in memory. Adequate for v1 scale
/// (a few thousand live courses); the index plan is a denormalized CourseSnapshot search column with a FULLTEXT index.
/// </summary>
public class CatalogQueryService(AppDbContext db, CourseSnapshotService snapshots)
{
    private IQueryable<Course> Live => db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr);

    public async Task<List<CategoryDto>> Categories()
    {
        var live = await Live.ToListAsync();
        var published = await snapshots.ForCourses(live);
        var counts = published.Values.SelectMany(p => p.Payload.Categories.Distinct()).GroupBy(x => x).ToDictionary(g => g.Key, g => g.Count());
        var cats = await db.Categories.AsNoTracking().OrderBy(c => c.SortOrder).ThenBy(c => c.NameEn).ToListAsync();
        return cats.Select(c => new CategoryDto(c.Id, c.Slug, c.NameEn, c.NameAr, c.ParentId, c.IsAcademy, counts.GetValueOrDefault(c.Id))).ToList();
    }

    public static string EscapeLike(string term) =>
        term.Replace("!", "!!").Replace("%", "!%").Replace("_", "!_");

    public async Task<PagedResult<CourseCardDto>> Search(string? q, string? category, CourseLevel? level, string? language,
        string? sort, int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize <= 0 ? 20 : pageSize, 1, 50);
        var sortKey = (sort ?? "newest").ToLowerInvariant();
        if (sortKey is not ("newest" or "updated" or "title")) throw AppException.Bad("sort must be one of newest, updated, title.");
        var query = Live;

        var terms = string.IsNullOrWhiteSpace(q) ? [] : q.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(t => t.Length > 64 ? t[..64] : t).Distinct().Take(8).ToList();
        foreach (var t in terms)
        {
            // Prefilter on the published snapshot (legacy never-snapshotted courses are prefiltered on their rows).
            var pattern = "%" + EscapeLike(t) + "%";
            query = query.Where(c => db.CourseSnapshots.Any(s => s.CourseId == c.Id && s.Version == c.PublishedVersion
                                                                 && EF.Functions.Like(s.PayloadJson, pattern, "!"))
                                     || (c.PublishedVersion == 0 && (EF.Functions.Like(c.Title, pattern, "!")
                                         || EF.Functions.Like(c.Subtitle, pattern, "!") || EF.Functions.Like(c.Description, pattern, "!"))));
        }
        HashSet<int>? catIds = null;
        if (!string.IsNullOrWhiteSpace(category))
        {
            catIds = (await CategoryAndDescendants(category.Trim())).ToHashSet();
            if (catIds.Count == 0) return new PagedResult<CourseCardDto>([], 0, page, pageSize);
        }
        var lang = string.IsNullOrWhiteSpace(language) ? null : language.Trim();

        var candidates = await query.ToListAsync();
        var published = await snapshots.ForCourses(candidates);
        IEnumerable<PublishedCourse> filtered = published.Values.Where(p =>
            terms.All(t => Contains(p.Payload.Title, t) || Contains(p.Payload.Subtitle, t) || Contains(p.Payload.Description, t))
            && (catIds is null || p.Payload.Categories.Any(catIds.Contains))
            && (level is null || p.Payload.Level == level)
            && (lang is null || string.Equals(p.Payload.Language, lang, StringComparison.OrdinalIgnoreCase)));
        filtered = sortKey switch
        {
            "newest" => filtered.OrderByDescending(p => p.Course.PublishedAt).ThenBy(p => p.Course.Id),
            "updated" => filtered.OrderByDescending(p => p.Course.UpdatedAt).ThenBy(p => p.Course.Id),
            _ => filtered.OrderBy(p => p.Payload.Title, StringComparer.OrdinalIgnoreCase).ThenBy(p => p.Course.Id),
        };
        var all = filtered.ToList();
        var pageItems = all.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        var ids = pageItems.Select(p => p.Course.Id).ToList();

        var catSlugs = await db.Categories.AsNoTracking().ToDictionaryAsync(c => c.Id, c => c.Slug);
        var instr = await InstructorRows(ids);
        var videos = await snapshots.VideoStates(pageItems.SelectMany(p => p.Payload.Modules.SelectMany(m => m.Lessons)));
        var ratings = await RatingRows(ids);

        var items = pageItems.Select(p =>
        {
            var c = p.Course;
            ratings.TryGetValue(c.Id, out var r);
            var states = p.Payload.Modules.SelectMany(m => m.Lessons).Select(l => videos[l.Id]).Where(v => v.Playable).ToList();
            return new CourseCardDto(c.Id, c.Slug, c.Code, p.Payload.Title, p.Payload.Subtitle, p.Payload.Level, p.Payload.Language,
                p.Payload.Categories.Where(catSlugs.ContainsKey).Select(x => catSlugs[x]).ToArray(),
                instr.Where(x => x.CourseId == c.Id).Select(x => x.DisplayName).ToArray(),
                states.Count, states.Sum(v => v.DurationSeconds), r?.Avg, r?.Count ?? 0, c.PublishedAt, c.UpdatedAt);
        }).ToList();
        return new PagedResult<CourseCardDto>(items, all.Count, page, pageSize);
    }

    private static bool Contains(string? haystack, string term) =>
        haystack is not null && haystack.Contains(term, StringComparison.OrdinalIgnoreCase);

    private async Task<List<int>> CategoryAndDescendants(string slugOrId)
    {
        var all = await db.Categories.AsNoTracking().Select(c => new { c.Id, c.Slug, c.ParentId }).ToListAsync();
        var root = all.FirstOrDefault(c => c.Slug == slugOrId) ?? (int.TryParse(slugOrId, out var id) ? all.FirstOrDefault(c => c.Id == id) : null);
        if (root is null) return [];
        var result = new List<int> { root.Id };
        for (var i = 0; i < result.Count; i++)
            result.AddRange(all.Where(c => c.ParentId == result[i] && !result.Contains(c.Id)).Select(c => c.Id));
        return result;
    }

    private record InstructorRow(Guid CourseId, Guid UserId, string DisplayName, CourseInstructorRole Role);
    private record RatingRow(decimal Avg, int Count);

    private async Task<List<InstructorRow>> InstructorRows(List<Guid> ids) =>
        (await (from ci in db.CourseInstructors.AsNoTracking()
                join u in db.Users on ci.UserId equals u.Id
                where ids.Contains(ci.CourseId)
                select new { ci.CourseId, ci.UserId, u.DisplayName, ci.Role }).ToListAsync())
        .OrderBy(x => x.Role).ThenBy(x => x.DisplayName)
        .Select(x => new InstructorRow(x.CourseId, x.UserId, x.DisplayName, x.Role)).ToList();

    private async Task<Dictionary<Guid, RatingRow>> RatingRows(List<Guid> ids) =>
        (await db.CourseReviews.AsNoTracking().Where(r => ids.Contains(r.CourseId) && !r.Hidden)
            .GroupBy(r => r.CourseId)
            .Select(g => new { g.Key, Sum = g.Sum(x => x.Rating), Count = g.Count() }).ToListAsync())
        .ToDictionary(x => x.Key, x => new RatingRow(Math.Round((decimal)x.Sum / x.Count, 2), x.Count));

    public async Task<CourseDetailDto> Detail(string slug)
    {
        var pc = await snapshots.LiveBySlug(slug);
        var (c, p) = (pc.Course, pc.Payload);
        var ids = new List<Guid> { c.Id };
        var videos = await snapshots.VideoStates(p.Modules.SelectMany(m => m.Lessons));
        var moduleDtos = p.Modules.OrderBy(m => m.SortOrder).Select(m => new PublicModuleDto(m.Id, m.Title,
            m.Lessons.OrderBy(l => l.SortOrder).Select(l =>
            {
                var v = videos[l.Id];
                return new PublicLessonDto(l.Id, l.Title, v.DurationSeconds, l.IsPreview, v.Playable);
            }).ToList())).ToList();
        var allLessons = moduleDtos.SelectMany(m => m.Lessons).ToList();

        var questionCount = await db.Questions.AsNoTracking().CountAsync(q => q.CourseId == c.Id && q.State == QuestionState.Active);
        var catSlugs = await db.Categories.AsNoTracking().Where(cat => p.Categories.Contains(cat.Id))
            .OrderBy(cat => cat.SortOrder).Select(cat => cat.Slug).ToArrayAsync();
        var instructors = (await InstructorRows(ids)).Select(x => new InstructorDto(x.UserId, x.DisplayName, x.Role)).ToList();
        var packages = await db.Packages.AsNoTracking()
            .Where(pk => pk.CourseId == c.Id && pk.IsActive && pk.ApprovalStatus == "Approved")
            .OrderBy(pk => pk.Price)
            .Select(pk => new PackageDto(pk.Id, pk.Title, pk.Contents, pk.Price, pk.Currency, pk.AccessDays)).ToListAsync();
        var ratings = await RatingRows(ids);
        ratings.TryGetValue(c.Id, out var r);

        return new CourseDetailDto(c.Id, c.Slug, c.Code, p.Title, p.Subtitle, p.Description, p.Audience, p.Prerequisites,
            SplitOutcomes(p.Outcomes), p.Language, p.Level, c.Status, p.CredentialType, p.PassThresholdPercent, p.PromoVideoId,
            catSlugs, moduleDtos, allLessons.Count(l => l.HasVideo), questionCount, allLessons.Sum(l => l.DurationSeconds),
            instructors, packages, c.ReviewedAt, c.PublishedAt, c.UpdatedAt, r?.Avg, r?.Count ?? 0);
    }

    public static string[] SplitOutcomes(string outcomes) =>
        outcomes.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}
