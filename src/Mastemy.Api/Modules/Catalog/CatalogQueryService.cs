using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Catalog;

/// <summary>Public (anonymous) catalog reads. Only live courses (AccessService.IsLive) are ever returned.</summary>
public class CatalogQueryService(AppDbContext db)
{
    private static readonly CourseStatus[] LiveStatuses =
        Enum.GetValues<CourseStatus>().Where(AccessService.IsLive).ToArray();

    private IQueryable<Course> Live => db.Courses.AsNoTracking().Where(c => LiveStatuses.Contains(c.Status));

    public async Task<List<CategoryDto>> Categories()
    {
        var counts = await db.CourseCategories.AsNoTracking()
            .Where(cc => db.Courses.Any(c => c.Id == cc.CourseId && LiveStatuses.Contains(c.Status)))
            .GroupBy(cc => cc.CategoryId)
            .Select(g => new { g.Key, Count = g.Count() })
            .ToDictionaryAsync(x => x.Key, x => x.Count);
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
        var query = Live;

        if (!string.IsNullOrWhiteSpace(q))
        {
            var terms = q.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Select(t => t.Length > 64 ? t[..64] : t).Distinct().Take(8).ToList();
            foreach (var t in terms)
            {
                var pattern = "%" + EscapeLike(t) + "%";
                query = query.Where(c => EF.Functions.Like(c.Title, pattern, "!")
                                         || EF.Functions.Like(c.Subtitle, pattern, "!")
                                         || EF.Functions.Like(c.Description, pattern, "!"));
            }
        }
        if (!string.IsNullOrWhiteSpace(category))
        {
            var catIds = await CategoryAndDescendants(category.Trim());
            if (catIds.Count == 0) return new PagedResult<CourseCardDto>([], 0, page, pageSize);
            query = query.Where(c => db.CourseCategories.Any(cc => cc.CourseId == c.Id && catIds.Contains(cc.CategoryId)));
        }
        if (level is not null) query = query.Where(c => c.Level == level);
        if (!string.IsNullOrWhiteSpace(language)) { var lang = language.Trim(); query = query.Where(c => c.Language == lang); }

        query = (sort ?? "newest").ToLowerInvariant() switch
        {
            "newest" => query.OrderByDescending(c => c.PublishedAt).ThenBy(c => c.Id),
            "updated" => query.OrderByDescending(c => c.UpdatedAt).ThenBy(c => c.Id),
            "title" => query.OrderBy(c => c.Title).ThenBy(c => c.Id),
            _ => throw AppException.Bad("sort must be one of newest, updated, title."),
        };

        var total = await query.CountAsync();
        var courses = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        var ids = courses.Select(c => c.Id).ToList();

        var catNames = await (from cc in db.CourseCategories.AsNoTracking()
                              join cat in db.Categories on cc.CategoryId equals cat.Id
                              where ids.Contains(cc.CourseId)
                              select new { cc.CourseId, cat.Slug }).ToListAsync();
        var instr = await InstructorRows(ids);
        var videos = await (from m in db.Modules.AsNoTracking()
                            join l in db.Lessons on m.Id equals l.ModuleId
                            join v in db.VideoAssets on l.VideoAssetId equals v.Id
                            where ids.Contains(m.CourseId) && v.Status == VideoStatus.Ready
                            group v by m.CourseId into g
                            select new { CourseId = g.Key, Count = g.Count(), Duration = g.Sum(x => x.DurationSeconds) })
            .ToDictionaryAsync(x => x.CourseId);
        var ratings = await RatingRows(ids);

        var items = courses.Select(c =>
        {
            videos.TryGetValue(c.Id, out var v);
            ratings.TryGetValue(c.Id, out var r);
            return new CourseCardDto(c.Id, c.Slug, c.Code, c.Title, c.Subtitle, c.Level, c.Language,
                catNames.Where(x => x.CourseId == c.Id).Select(x => x.Slug).ToArray(),
                instr.Where(x => x.CourseId == c.Id).Select(x => x.DisplayName).ToArray(),
                v?.Count ?? 0, v?.Duration ?? 0, r?.Avg, r?.Count ?? 0, c.PublishedAt, c.UpdatedAt);
        }).ToList();
        return new PagedResult<CourseCardDto>(items, total, page, pageSize);
    }

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
        var c = await Live.FirstOrDefaultAsync(x => x.Slug == slug) ?? throw AppException.NotFound("Course");
        var ids = new List<Guid> { c.Id };
        var modules = await db.Modules.AsNoTracking().Where(m => m.CourseId == c.Id).OrderBy(m => m.SortOrder)
            .Include(m => m.Lessons).ThenInclude(l => l.VideoAsset).AsSplitQuery().ToListAsync();
        var moduleDtos = modules.Select(m => new PublicModuleDto(m.Id, m.Title,
            m.Lessons.OrderBy(l => l.SortOrder).Select(l =>
            {
                var ready = l.VideoAsset is { Status: VideoStatus.Ready };
                return new PublicLessonDto(l.Id, l.Title, ready ? l.VideoAsset!.DurationSeconds : 0, l.IsPreview, ready);
            }).ToList())).ToList();
        var allLessons = moduleDtos.SelectMany(m => m.Lessons).ToList();

        var questionCount = await db.Questions.AsNoTracking().CountAsync(q => q.CourseId == c.Id && q.State == QuestionState.Active);
        var catSlugs = await (from cc in db.CourseCategories.AsNoTracking()
                              join cat in db.Categories on cc.CategoryId equals cat.Id
                              where cc.CourseId == c.Id
                              orderby cat.SortOrder
                              select cat.Slug).ToArrayAsync();
        var instructors = (await InstructorRows(ids)).Select(x => new InstructorDto(x.UserId, x.DisplayName, x.Role)).ToList();
        var packages = await db.Packages.AsNoTracking()
            .Where(p => p.CourseId == c.Id && p.IsActive && p.ApprovalStatus == "Approved")
            .OrderBy(p => p.Price)
            .Select(p => new PackageDto(p.Id, p.Title, p.Contents, p.Price, p.Currency, p.AccessDays)).ToListAsync();
        var ratings = await RatingRows(ids);
        ratings.TryGetValue(c.Id, out var r);

        return new CourseDetailDto(c.Id, c.Slug, c.Code, c.Title, c.Subtitle, c.Description, c.Audience, c.Prerequisites,
            SplitOutcomes(c.Outcomes), c.Language, c.Level, c.Status, c.CredentialType, c.PassThresholdPercent, c.PromoVideoId,
            catSlugs, moduleDtos, allLessons.Count(l => l.HasVideo), questionCount, allLessons.Sum(l => l.DurationSeconds),
            instructors, packages, c.ReviewedAt, c.PublishedAt, c.UpdatedAt, r?.Avg, r?.Count ?? 0);
    }

    public static string[] SplitOutcomes(string outcomes) =>
        outcomes.Split('\n', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
}
