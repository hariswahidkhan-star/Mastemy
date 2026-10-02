using System.Linq.Expressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Taxonomy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.Catalog;

/// <summary>
/// Public (anonymous) catalog reads. Only live courses (AccessService.IsLive) are ever returned, and every learner-facing
/// field (title, description, level, language, categories, curriculum, counts) comes from the course's latest published
/// snapshot, never from the working copy, so unreviewed edits are invisible until the next publish.
/// Lists (categories, search) run in SQL over the current snapshots' denormalized columns (Title, Level, Language,
/// CategoryIds ",1,5,", LessonCount, TotalDurationSeconds, SearchText): one escaped LIKE per search term on SearchText,
/// filters on Level/Language/CategoryIds, ORDER BY + LIMIT/OFFSET in SQL. Payloads are never deserialized for lists.
/// Extended filters (instructor, duration bucket, freshness, price, rating, skill, certification) are SQL subqueries on the
/// course id, so paging stays in SQL. Spelling tolerance and suggestions: see <see cref="SearchTolerant"/> / <see cref="Suggestions"/>.
/// Legacy live courses that predate snapshots (PublishedVersion = 0) are built in memory and merged (rare).
/// </summary>
public partial class CatalogQueryService(AppDbContext db, CourseSnapshotService snapshots, IMemoryCache cache,
    IOptions<TaxonomyOptions> taxonomy)
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

    /// <summary>Backwards-compatible entry point (no extended filters).</summary>
    public Task<PagedResult<CourseCardDto>> Search(string? q, string? category, CourseLevel? level, string? language,
        string? sort, int page, int pageSize) => Search(q, category, level, language, sort, page, pageSize, new SearchFilters());

    /// <summary>Duration buckets on the published total video duration: short &lt; 2h, medium 2–6h, long 6–17h, extended ≥ 17h.</summary>
    public static (int Min, int? Max) DurationBucket(string bucket) => bucket.ToLowerInvariant() switch
    {
        "short" => (0, 2 * 3600),
        "medium" => (2 * 3600, 6 * 3600),
        "long" => (6 * 3600, 17 * 3600),
        "extended" => (17 * 3600, null),
        _ => throw AppException.Bad("duration must be one of short, medium, long, extended."),
    };

    /// <summary>
    /// Course ids (live or not) matching the extended filters, as a SQL subquery. Freshness uses the publish time of the course's
    /// current snapshot (what learners see), price the cheapest active approved package, rating the non-hidden reviews,
    /// skills the snapshot-safe published links, certifications only those publicly visible.
    /// </summary>
    private async Task<IQueryable<Guid>?> ExtendedIds(SearchFilters f)
    {
        if (!f.Any) return null;
        var q = db.Courses.AsNoTracking();
        if (f.InstructorId is { } iid) q = q.Where(c => db.CourseInstructors.Any(ci => ci.CourseId == c.Id && ci.UserId == iid));
        if (f.UpdatedWithinDays is { } days)
        {
            if (days is < 1 or > 3650) throw AppException.Bad("updatedWithinDays must be between 1 and 3650.");
            var cutoff = DateTime.UtcNow.AddDays(-days);
            q = q.Where(c => db.CourseSnapshots.Any(s => s.CourseId == c.Id && s.Version == c.PublishedVersion && s.PublishedAt >= cutoff)
                             || (c.PublishedVersion == 0 && c.UpdatedAt >= cutoff));
        }
        if (f.MinPrice is { } minP && minP < 0 || f.MaxPrice is { } maxP0 && maxP0 < 0) throw AppException.Bad("Prices cannot be negative.");
        if (f.MinPrice is not null || f.MaxPrice is not null)
        {
            var lo = f.MinPrice ?? 0m;
            var hi = f.MaxPrice ?? decimal.MaxValue;
            q = q.Where(c => db.Packages.Any(p => p.CourseId == c.Id && p.IsActive && p.ApprovalStatus == "Approved")
                             && db.Packages.Where(p => p.CourseId == c.Id && p.IsActive && p.ApprovalStatus == "Approved").Min(p => p.Price) >= lo
                             && db.Packages.Where(p => p.CourseId == c.Id && p.IsActive && p.ApprovalStatus == "Approved").Min(p => p.Price) <= hi);
        }
        if (f.MinRating is { } mr)
        {
            if (mr is < 1 or > 5) throw AppException.Bad("minRating must be between 1 and 5.");
            var mrd = (double)mr;
            q = q.Where(c => db.CourseReviews.Any(r => r.CourseId == c.Id && !r.Hidden)
                             && db.CourseReviews.Where(r => r.CourseId == c.Id && !r.Hidden).Average(r => (double)r.Rating) >= mrd);
        }
        if (!string.IsNullOrWhiteSpace(f.Skill))
        {
            var code = f.Skill.Trim();
            var skillIds = await db.Set<Skill>().Where(s => s.Code == code && s.IsActive).Select(s => s.Id).ToListAsync();
            if (skillIds.Count == 0) return db.Courses.Where(c => false).Select(c => c.Id);
            // Include child skills one level at a time.
            var all = await db.Set<Skill>().AsNoTracking().Where(s => s.IsActive).Select(s => new { s.Id, s.ParentId }).ToListAsync();
            for (var i = 0; i < skillIds.Count; i++) skillIds.AddRange(all.Where(s => s.ParentId == skillIds[i] && !skillIds.Contains(s.Id)).Select(s => s.Id));
            var linked = SkillService.PublishedLinks(db).Where(cs => skillIds.Contains(cs.SkillId)).Select(cs => cs.CourseId);
            q = q.Where(c => linked.Contains(c.Id));
        }
        if (!string.IsNullOrWhiteSpace(f.Certification))
        {
            var key = f.Certification.Trim();
            var certs = db.Set<Certification>().AsNoTracking()
                .Where(CertificationService.PublicExpr(DateTime.UtcNow.AddDays(-taxonomy.Value.CertificationFreshDays)))
                .Where(c => c.Slug == key || c.ExamCode == key).Select(c => c.Id);
            var linked = db.Set<CourseCertification>().Where(l => certs.Contains(l.CertificationId)).Select(l => l.CourseId);
            q = q.Where(c => linked.Contains(c.Id));
        }
        return q.Select(c => c.Id);
    }

    public async Task<PagedResult<CourseCardDto>> Search(string? q, string? category, CourseLevel? level, string? language,
        string? sort, int page, int pageSize, SearchFilters filters)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize <= 0 ? 20 : pageSize, 1, 50);
        var sortKey = (sort ?? "newest").ToLowerInvariant();
        if (sortKey is not ("newest" or "updated" or "title")) throw AppException.Bad("sort must be one of newest, updated, title.");

        var terms = Terms(q);
        List<int>? catIds = null;
        if (!string.IsNullOrWhiteSpace(category))
        {
            catIds = await CategoryAndDescendants(category.Trim());
            if (catIds.Count == 0) return new PagedResult<CourseCardDto>([], 0, page, pageSize);
        }
        var lang = string.IsNullOrWhiteSpace(language) ? null : language.Trim();
        (int Min, int? Max)? dur = string.IsNullOrWhiteSpace(filters.Duration) ? null : DurationBucket(filters.Duration.Trim());
        var extIds = await ExtendedIds(filters);

        var query = snapshots.LiveCards();
        foreach (var t in terms)
        {
            var pattern = "%" + EscapeLike(t) + "%";
            query = query.Where(x => EF.Functions.Like(x.SearchText, pattern, "!"));
        }
        if (catIds is not null) query = query.Where(AnyCategory(catIds));
        if (level is { } lv) query = query.Where(x => x.Level == lv);
        if (lang is not null) query = query.Where(x => x.Language == lang);
        if (dur is { } d)
        {
            query = query.Where(x => x.TotalDurationSeconds >= d.Min);
            if (d.Max is { } mx) query = query.Where(x => x.TotalDurationSeconds < mx);
        }
        if (extIds is not null) query = query.Where(x => extIds.Contains(x.Id));

        // Legacy (never-snapshotted) live courses are filtered with the same rules in memory.
        var catPatterns = catIds?.Select(id => "," + id + ",").ToList();
        var legacy = (await snapshots.LegacyCards()).Where(x =>
            terms.All(t => x.SearchText.Contains(t, StringComparison.Ordinal))
            && (catPatterns is null || catPatterns.Any(p => x.CategoryIds.Contains(p, StringComparison.Ordinal)))
            && (level is null || x.Level == level)
            && (lang is null || string.Equals(x.Language, lang, StringComparison.OrdinalIgnoreCase))
            && (dur is null || (x.TotalDurationSeconds >= dur.Value.Min && (dur.Value.Max is null || x.TotalDurationSeconds < dur.Value.Max)))).ToList();
        if (legacy.Count > 0 && extIds is not null)
        {
            var legacyIds = legacy.Select(x => x.Id).ToList();
            var ok = (await extIds.Where(id => legacyIds.Contains(id)).ToListAsync()).ToHashSet();
            legacy = legacy.Where(x => ok.Contains(x.Id)).ToList();
        }

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
        return new PagedResult<CourseCardDto>(await ToCards(pageItems), total, page, pageSize);
    }

    private static List<string> Terms(string? q) =>
        string.IsNullOrWhiteSpace(q) ? [] : q.Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(t => (t.Length > 64 ? t[..64] : t).ToLowerInvariant()).Distinct().Take(8).ToList();

    /// <summary>
    /// Search with spelling tolerance: when the query has terms and nothing matches, each term that is not a known word is
    /// replaced by the closest vocabulary word (Levenshtein ≤ 2, ≤ 1 for terms of 4 characters or fewer) and the search is
    /// re-run; the corrected query is returned as DidYouMean when it finds results.
    /// </summary>
    public async Task<CourseSearchResultDto> SearchTolerant(string? q, string? category, CourseLevel? level, string? language,
        string? sort, int page, int pageSize, SearchFilters filters)
    {
        var r = await Search(q, category, level, language, sort, page, pageSize, filters);
        var terms = Terms(q);
        if (r.Total > 0 || terms.Count == 0) return new CourseSearchResultDto(r.Items, r.Total, r.Page, r.PageSize, null);
        var vocab = await Vocabulary();
        var changed = false;
        var corrected = terms.Select(t =>
        {
            if (vocab.Contains(t) || t.Length < 3 || !t.All(char.IsLetterOrDigit)) return t; // literal (punctuated) terms are never corrected
            var best = Closest(t, vocab);
            if (best is null) return t;
            changed = true;
            return best;
        }).ToList();
        if (!changed) return new CourseSearchResultDto(r.Items, r.Total, r.Page, r.PageSize, null);
        var suggestion = string.Join(' ', corrected);
        var r2 = await Search(suggestion, category, level, language, sort, page, pageSize, filters);
        return r2.Total == 0
            ? new CourseSearchResultDto(r.Items, r.Total, r.Page, r.PageSize, null)
            : new CourseSearchResultDto(r2.Items, r2.Total, r2.Page, r2.PageSize, suggestion);
    }

    public static string? Closest(string term, IReadOnlyCollection<string> vocab)
    {
        var maxDist = term.Length <= 4 ? 1 : 2;
        string? best = null; var bestD = int.MaxValue;
        foreach (var w in vocab)
        {
            if (Math.Abs(w.Length - term.Length) > maxDist) continue;
            var d = Levenshtein(term, w, maxDist);
            if (d <= maxDist && (d < bestD || (d == bestD && string.CompareOrdinal(w, best) < 0))) { best = w; bestD = d; }
        }
        return best;
    }

    /// <summary>Levenshtein distance with early exit once every cell of a row exceeds <paramref name="limit"/>.</summary>
    public static int Levenshtein(string a, string b, int limit = int.MaxValue)
    {
        var prev = new int[b.Length + 1];
        var cur = new int[b.Length + 1];
        for (var j = 0; j <= b.Length; j++) prev[j] = j;
        for (var i = 1; i <= a.Length; i++)
        {
            cur[0] = i; var rowMin = cur[0];
            for (var j = 1; j <= b.Length; j++)
            {
                cur[j] = Math.Min(Math.Min(cur[j - 1] + 1, prev[j] + 1), prev[j - 1] + (a[i - 1] == b[j - 1] ? 0 : 1));
                rowMin = Math.Min(rowMin, cur[j]);
            }
            if (rowMin > limit) return rowMin;
            (prev, cur) = (cur, prev);
        }
        return prev[b.Length];
    }

    private const string VocabCacheKey = "catalog:vocabulary";

    /// <summary>
    /// Lower-cased words (≥ 3 chars) of live snapshot titles/subtitles and active skill names; cached in memory for 10 minutes.
    /// Publish/archive invalidate the cache of the instance that handled the request; other instances of a multi-instance
    /// deployment keep their copy until the 10-minute TTL expires, so new titles reach their "did you mean" vocabulary within that window.
    /// </summary>
    public async Task<HashSet<string>> Vocabulary()
    {
        if (cache.TryGetValue(VocabCacheKey, out HashSet<string>? v) && v is not null) return v;
        var titles = await snapshots.LiveCards().Select(x => x.Title + " " + x.Subtitle).ToListAsync();
        titles.AddRange((await snapshots.LegacyCards()).Select(x => x.Title + " " + x.Subtitle));
        titles.AddRange(await db.Set<Skill>().AsNoTracking().Where(s => s.IsActive).Select(s => s.NameEn + " " + s.NameAr).ToListAsync());
        var words = titles.SelectMany(t => WordRx().Split(t.ToLowerInvariant())).Where(w => w.Length >= 3).ToHashSet(StringComparer.Ordinal);
        cache.Set(VocabCacheKey, words, TimeSpan.FromMinutes(10));
        return words;
    }

    public void InvalidateVocabulary() => InvalidateVocabulary(cache);

    /// <summary>Drops this process's cached vocabulary (in-process only; see <see cref="Vocabulary"/> for the multi-instance TTL).</summary>
    public static void InvalidateVocabulary(IMemoryCache cache) => cache.Remove(VocabCacheKey);

    [System.Text.RegularExpressions.GeneratedRegex(@"[^\p{L}\p{N}]+")] private static partial System.Text.RegularExpressions.Regex WordRx();

    /// <summary>Up to 8 prefix suggestions: live course titles (snapshot), active skills, then publicly visible certifications.</summary>
    public async Task<List<SuggestionDto>> Suggestions(string? q)
    {
        var term = (q ?? "").Trim();
        if (term.Length < 2) return [];
        if (term.Length > 64) term = term[..64];
        var e = EscapeLike(term);
        var start = e + "%";
        var word = "% " + e + "%";
        var courses = await snapshots.LiveCards().Where(x => EF.Functions.Like(x.Title, start, "!") || EF.Functions.Like(x.Title, word, "!"))
            .OrderBy(x => x.Title).Take(8).Select(x => new { x.Title, x.Slug }).ToListAsync();
        var skills = await db.Set<Skill>().AsNoTracking().Where(s => s.IsActive && (EF.Functions.Like(s.NameEn, start, "!") || EF.Functions.Like(s.NameEn, word, "!")
                || EF.Functions.Like(s.NameAr, start, "!") || EF.Functions.Like(s.Code, start, "!")))
            .OrderBy(s => s.NameEn).Take(8).Select(s => new { s.NameEn, s.Code }).ToListAsync();
        var certs = await db.Set<Certification>().AsNoTracking()
            .Where(CertificationService.PublicExpr(DateTime.UtcNow.AddDays(-taxonomy.Value.CertificationFreshDays)))
            .Where(c => EF.Functions.Like(c.Title, start, "!") || EF.Functions.Like(c.Title, word, "!") || EF.Functions.Like(c.ExamCode, start, "!"))
            .OrderBy(c => c.Title).Take(8).Select(c => new { c.Title, c.Slug }).ToListAsync();
        var result = new List<SuggestionDto>();
        result.AddRange(courses.Take(5).Select(c => new SuggestionDto("course", c.Title, c.Slug)));
        result.AddRange(skills.Take(2).Select(s => new SuggestionDto("skill", s.NameEn, s.Code)));
        result.AddRange(certs.Take(8 - result.Count).Select(c => new SuggestionDto("certification", c.Title, c.Slug)));
        // Fill any remaining slots with further courses/skills.
        foreach (var c in courses.Skip(5)) if (result.Count < 8) result.Add(new SuggestionDto("course", c.Title, c.Slug));
        foreach (var s in skills.Skip(2)) if (result.Count < 8) result.Add(new SuggestionDto("skill", s.NameEn, s.Code));
        return result.Take(8).ToList();
    }

    /// <summary>Cards for the given live course ids in the given order; non-live ids are dropped.</summary>
    public async Task<List<CourseCardDto>> Cards(IReadOnlyList<Guid> ids)
    {
        if (ids.Count == 0) return [];
        var rows = await snapshots.CardsFor(ids);
        return await ToCards(ids.Distinct().Where(rows.ContainsKey).Select(id => rows[id]).ToList());
    }

    private async Task<List<CourseCardDto>> ToCards(List<LiveCard> pageItems)
    {
        var ids = pageItems.Select(p => p.Id).ToList();
        var catSlugs = await db.Categories.AsNoTracking().ToDictionaryAsync(c => c.Id, c => c.Slug);
        var instr = await InstructorRows(ids);
        var ratings = await RatingRows(ids);
        return pageItems.Select(c =>
        {
            ratings.TryGetValue(c.Id, out var r);
            return new CourseCardDto(c.Id, c.Slug, c.Code, c.Title, c.Subtitle, c.Level, c.Language,
                CourseSnapshotService.ParseCategoryIds(c.CategoryIds).Where(catSlugs.ContainsKey).Select(x => catSlugs[x]).ToArray(),
                instr.Where(x => x.CourseId == c.Id).Select(x => x.DisplayName).ToArray(),
                c.LessonCount, c.TotalDurationSeconds, r?.Avg, r?.Count ?? 0, c.PublishedAt, c.UpdatedAt);
        }).ToList();
    }

    private static IQueryable<LiveCard> Sorted(IQueryable<LiveCard> q, string sortKey) => sortKey switch
    {
        "newest" => q.OrderByDescending(x => x.PublishedAt).ThenBy(x => x.Id),
        "updated" => q.OrderByDescending(x => x.UpdatedAt).ThenBy(x => x.Id),
        _ => q.OrderBy(x => x.Title).ThenBy(x => x.Id),
    };

    public async Task<List<int>> CategoryAndDescendants(string slugOrId)
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

/// <summary>Optional extended catalog filters (all combine with AND).</summary>
public record SearchFilters(Guid? InstructorId = null, string? Duration = null, int? UpdatedWithinDays = null, decimal? MinPrice = null,
    decimal? MaxPrice = null, decimal? MinRating = null, string? Skill = null, string? Certification = null)
{
    public bool Any => InstructorId is not null || UpdatedWithinDays is not null || MinPrice is not null || MaxPrice is not null
                       || MinRating is not null || !string.IsNullOrWhiteSpace(Skill) || !string.IsNullOrWhiteSpace(Certification);
}

/// <summary>Paged course search result; DidYouMean is the corrected query when the original matched nothing.</summary>
public record CourseSearchResultDto(IReadOnlyList<CourseCardDto> Items, int Total, int Page, int PageSize, string? DidYouMean);

/// <summary>Search suggestion: Kind is course | skill | certification; Key is the course slug, skill code or certification slug.</summary>
public record SuggestionDto(string Kind, string Text, string Key);
