using System.Linq.Expressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Catalog;

/// <summary>
/// Public (anonymous) catalog reads. Only live courses (AccessService.IsLive) are ever returned, and every learner-facing
/// field (title, description, level, language, categories, curriculum, counts) comes from the course's latest published
/// snapshot, never from the working copy, so unreviewed edits are invisible until the next publish.
/// Lists (categories, search) run in SQL over the current snapshots' denormalized columns (Title, Level, Language,
/// CategoryIds ",1,5,", LessonCount, TotalDurationSeconds, SearchText): one escaped LIKE per search term on SearchText,
/// filters on Level/Language/CategoryIds, ORDER BY + LIMIT/OFFSET in SQL. Payloads are never deserialized for lists.
/// Legacy live courses that predate snapshots (PublishedVersion = 0) are built in memory and merged (rare).
/// </summary>
public class CatalogQueryService(AppDbContext db, CourseSnapshotService snapshots)
{
    public async Task<List<CategoryDto>> Categories()
    {
        var catLists = await snapshots.LiveCards().Select(x => x.CategoryIds).ToListAsync();
        catLists.AddRange((await snapshots.LegacyCards()).Select(x => x.CategoryIds));
        var counts = catLists.SelectMany(CourseSnapshotService.ParseCategoryIds).GroupBy(x => x).ToDictionary(g => g.Key, g => g.Count());
        var cats = await db.Categories.AsNoTracking().OrderBy(c => c.SortOrder).ThenBy(c => c.NameEn).ToListAsync();
        return cats.Select(c => new CategoryDto(c.Id, c.Slug, c.NameEn, c.NameAr, c.ParentId, c.IsAcademy, counts.GetValueOrDefault(c.Id))).ToList();
    }

    public static string EscapeLike(string term) =>
        term.Replace("!", "!!").Replace("%", "!%").Replace("_", "!_");

    /// <summary>OR of <c>CategoryIds LIKE '%,id,%'</c> over the given ids (SQL-translatable).</summary>
    public static Expression<Func<LiveCard, bool>> AnyCategory(IEnumerable<int> ids)
    {
        var x = Expression.Parameter(typeof(LiveCard), "x");
        var like = typeof(DbFunctionsExtensions).GetMethod(nameof(DbFunctionsExtensions.Like),
            [typeof(DbFunctions), typeof(string), typeof(string)])!;
        Expression? body = null;
        foreach (var id in ids.Distinct())
        {
            var call = Expression.Call(like, Expression.Property(null, typeof(EF), nameof(EF.Functions)), Expression.Property(x, nameof(LiveCard.CategoryIds)),
                Expression.Constant("%," + id + ",%"));
            body = body is null ? call : Expression.OrElse(body, call);
        }
        return Expression.Lambda<Func<LiveCard, bool>>(body ?? Expression.Constant(false), x);
    }

    public async Task<PagedResult<CourseCardDto>> Search(string? q, string? category, CourseLevel? level, string? language,
        string? sort, int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize <= 0 ? 20 : pageSize, 1, 50);
        var sortKey = (sort ?? "newest").ToLowerInvariant();
        if (sortKey is not ("newest" or "updated" or "title")) throw AppException.Bad("sort must be one of newest, updated, title.");

        var terms = string.IsNullOrWhiteSpace(q) ? [] : q.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(t => (t.Length > 64 ? t[..64] : t).ToLowerInvariant()).Distinct().Take(8).ToList();
        List<int>? catIds = null;
        if (!string.IsNullOrWhiteSpace(category))
        {
            catIds = await CategoryAndDescendants(category.Trim());
            if (catIds.Count == 0) return new PagedResult<CourseCardDto>([], 0, page, pageSize);
        }
        var lang = string.IsNullOrWhiteSpace(language) ? null : language.Trim();

        var query = snapshots.LiveCards();
        foreach (var t in terms)
        {
            var pattern = "%" + EscapeLike(t) + "%";
            query = query.Where(x => EF.Functions.Like(x.SearchText, pattern, "!"));
        }
        if (catIds is not null) query = query.Where(AnyCategory(catIds));
        if (level is { } lv) query = query.Where(x => x.Level == lv);
        if (lang is not null) query = query.Where(x => x.Language == lang);

        // Legacy (never-snapshotted) live courses are filtered with the same rules in memory.
        var catPatterns = catIds?.Select(id => "," + id + ",").ToList();
        var legacy = (await snapshots.LegacyCards()).Where(x =>
            terms.All(t => x.SearchText.Contains(t, StringComparison.Ordinal))
            && (catPatterns is null || catPatterns.Any(p => x.CategoryIds.Contains(p, StringComparison.Ordinal)))
            && (level is null || x.Level == level)
            && (lang is null || string.Equals(x.Language, lang, StringComparison.OrdinalIgnoreCase))).ToList();

        List<LiveCard> pageItems;
        int total;
        if (legacy.Count == 0)
        {
            total = await query.CountAsync();
            pageItems = await Sorted(query, sortKey).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        }
        else
        {
            var all = await query.ToListAsync();
            all.AddRange(legacy);
            var ordered = sortKey switch
            {
                "newest" => all.OrderByDescending(x => x.PublishedAt).ThenBy(x => x.Id),
                "updated" => all.OrderByDescending(x => x.UpdatedAt).ThenBy(x => x.Id),
                _ => all.OrderBy(x => x.Title, StringComparer.OrdinalIgnoreCase).ThenBy(x => x.Id),
            };
            total = all.Count;
            pageItems = ordered.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        }
        var ids = pageItems.Select(p => p.Id).ToList();
        var catSlugs = await db.Categories.AsNoTracking().ToDictionaryAsync(c => c.Id, c => c.Slug);
        var instr = await InstructorRows(ids);
        var ratings = await RatingRows(ids);

        var items = pageItems.Select(c =>
        {
            ratings.TryGetValue(c.Id, out var r);
            return new CourseCardDto(c.Id, c.Slug, c.Code, c.Title, c.Subtitle, c.Level, c.Language,
                CourseSnapshotService.ParseCategoryIds(c.CategoryIds).Where(catSlugs.ContainsKey).Select(x => catSlugs[x]).ToArray(),
                instr.Where(x => x.CourseId == c.Id).Select(x => x.DisplayName).ToArray(),
                c.LessonCount, c.TotalDurationSeconds, r?.Avg, r?.Count ?? 0, c.PublishedAt, c.UpdatedAt);
        }).ToList();
        return new PagedResult<CourseCardDto>(items, total, page, pageSize);
    }

    private static IQueryable<LiveCard> Sorted(IQueryable<LiveCard> q, string sortKey) => sortKey switch
    {
        "newest" => q.OrderByDescending(x => x.PublishedAt).ThenBy(x => x.Id),
        "updated" => q.OrderByDescending(x => x.UpdatedAt).ThenBy(x => x.Id),
        _ => q.OrderBy(x => x.Title).ThenBy(x => x.Id),
    };

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

        // Active question count stays live: question edits are already staged by the bank's own review/versioning.
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
