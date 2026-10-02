using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.Taxonomy;

/// <summary>
/// Pathways, editorial/topic collections, academy pages and the homepage. All public outputs contain only live courses
/// rendered from their current snapshot (via <see cref="CatalogQueryService.Cards"/>); non-live members are silently dropped.
/// </summary>
public partial class DiscoveryService(AppDbContext db, ICurrentUser me, AuditService audit, CatalogQueryService catalog,
    CourseSnapshotService snapshots, IOptions<TaxonomyOptions> options)
{
    private readonly TaxonomyOptions _o = options.Value;
    public const string BestsellerRule =
        "Bestseller: at least 10 distinct buyers with paid orders in the last 30 days, net of refunds (any requested, processing or " +
        "completed refund removes the order) and of orders no longer in Paid status (refunded, charged back, cancelled); buyers who " +
        "are authors of the course or staff accounts are excluded and each buyer counts once. Recomputed daily.";

    [GeneratedRegex("^[a-z0-9]+(?:-[a-z0-9]+)*$")] private static partial Regex SlugRx();

    private static string RequireSlug(string? slug)
    {
        var s = (slug ?? "").Trim().ToLowerInvariant();
        if (s.Length is 0 or > 150 || !SlugRx().IsMatch(s)) throw AppException.Bad("Slug must be lower-case letters, digits and single hyphens (max 150).");
        return s;
    }

    private async Task<List<Guid>> ValidCourseIds(Guid[]? ids)
    {
        var list = (ids ?? []).Distinct().ToList();
        if (list.Count > 100) throw AppException.Bad("At most 100 courses.");
        var existing = await db.Courses.Where(c => list.Contains(c.Id)).Select(c => c.Id).ToListAsync();
        if (existing.Count != list.Count) throw AppException.Bad("Unknown course id(s).");
        return list;
    }

    // ---------- Pathways (staff) ----------
    public async Task<List<PathwayAdminDto>> AdminPathways()
    {
        var ps = await db.Set<Pathway>().AsNoTracking().OrderBy(p => p.SortOrder).ThenBy(p => p.TitleEn).ToListAsync();
        var result = new List<PathwayAdminDto>();
        foreach (var p in ps) result.Add(await AdminPathwayDto(p));
        return result;
    }

    private async Task<PathwayAdminDto> AdminPathwayDto(Pathway p)
    {
        var courses = await db.Set<PathwayCourse>().AsNoTracking().Where(x => x.PathwayId == p.Id).OrderBy(x => x.SortOrder).Select(x => x.CourseId).ToArrayAsync();
        var skills = await (from ps in db.Set<PathwaySkill>().AsNoTracking() join s in db.Set<Skill>() on ps.SkillId equals s.Id
                            where ps.PathwayId == p.Id orderby s.Code select s.Code).ToArrayAsync();
        return new PathwayAdminDto(p.Id, p.Slug, p.TitleEn, p.TitleAr, p.DescriptionEn, p.DescriptionAr, p.Level, p.CategoryId, p.IsPublished,
            p.SortOrder, courses, skills, p.UpdatedAt);
    }

    public async Task<PathwayAdminDto> UpsertPathway(Guid? id, PathwayUpsertRequest req)
    {
        var slug = RequireSlug(req.Slug);
        var title = CertificationService.Trunc(req.TitleEn, 250);
        if (title.Length == 0) throw AppException.Bad("TitleEn is required.");
        if (!Enum.IsDefined(req.Level)) throw AppException.Bad("Invalid level.");
        if (req.CategoryId is { } cid && !await db.Categories.AnyAsync(c => c.Id == cid)) throw AppException.Bad("Unknown category.");
        var courseIds = await ValidCourseIds(req.CourseIds);
        var codes = (req.SkillCodes ?? []).Select(c => c.Trim()).Where(c => c.Length > 0).Distinct().ToList();
        var skills = await db.Set<Skill>().Where(s => codes.Contains(s.Code)).Select(s => s.Id).ToListAsync();
        if (skills.Count != codes.Count) throw AppException.Bad("Unknown skill code(s).", "unknown_skill");

        Pathway p;
        if (id is { } gid) p = await db.Set<Pathway>().FirstOrDefaultAsync(x => x.Id == gid) ?? throw AppException.NotFound("Pathway");
        else { p = new Pathway(); db.Set<Pathway>().Add(p); }
        if (await db.Set<Pathway>().AnyAsync(x => x.Slug == slug && x.Id != p.Id)) throw AppException.Conflict("Slug already in use.", "duplicate_slug");
        p.Slug = slug; p.TitleEn = title; p.TitleAr = CertificationService.Trunc(req.TitleAr, 250);
        p.DescriptionEn = CertificationService.Trunc(req.DescriptionEn, 20000); p.DescriptionAr = CertificationService.Trunc(req.DescriptionAr, 20000);
        p.Level = req.Level; p.CategoryId = req.CategoryId; p.IsPublished = req.IsPublished; p.SortOrder = req.SortOrder ?? p.SortOrder;
        p.UpdatedAt = DateTime.UtcNow;
        db.Set<PathwayCourse>().RemoveRange(db.Set<PathwayCourse>().Where(x => x.PathwayId == p.Id));
        db.Set<PathwaySkill>().RemoveRange(db.Set<PathwaySkill>().Where(x => x.PathwayId == p.Id));
        for (var i = 0; i < courseIds.Count; i++) db.Set<PathwayCourse>().Add(new PathwayCourse { PathwayId = p.Id, CourseId = courseIds[i], SortOrder = i });
        foreach (var s in skills) db.Set<PathwaySkill>().Add(new PathwaySkill { PathwayId = p.Id, SkillId = s });
        audit.Record(id is null ? "pathway.created" : "pathway.updated", "Pathway", p.Id, new { p.Slug, p.IsPublished, courses = courseIds.Count });
        await db.SaveChangesAsync();
        return await AdminPathwayDto(p);
    }

    public async Task DeletePathway(Guid id)
    {
        var p = await db.Set<Pathway>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Pathway");
        db.Set<PathwayCourse>().RemoveRange(db.Set<PathwayCourse>().Where(x => x.PathwayId == id));
        db.Set<PathwaySkill>().RemoveRange(db.Set<PathwaySkill>().Where(x => x.PathwayId == id));
        db.Set<Pathway>().Remove(p);
        audit.Record("pathway.deleted", "Pathway", id, new { p.Slug });
        await db.SaveChangesAsync();
    }

    // ---------- Pathways (public) ----------
    private async Task<(Dictionary<Guid, List<CourseCardDto>> Cards, Dictionary<Guid, List<SkillDto>> Skills)> PathwayMembers(List<Guid> pathwayIds)
    {
        var links = await db.Set<PathwayCourse>().AsNoTracking().Where(x => pathwayIds.Contains(x.PathwayId)).OrderBy(x => x.SortOrder).ToListAsync();
        var cards = (await catalog.Cards(links.Select(l => l.CourseId).Distinct().ToList())).ToDictionary(c => c.Id);
        var skillRows = await (from ps in db.Set<PathwaySkill>().AsNoTracking() join s in db.Set<Skill>() on ps.SkillId equals s.Id
                               where pathwayIds.Contains(ps.PathwayId) && s.IsActive select new { ps.PathwayId, s }).ToListAsync();
        return (pathwayIds.ToDictionary(id => id, id => links.Where(l => l.PathwayId == id && cards.ContainsKey(l.CourseId)).Select(l => cards[l.CourseId]).ToList()),
                pathwayIds.ToDictionary(id => id, id => skillRows.Where(x => x.PathwayId == id).Select(x => SkillService.ToDto(x.s)).OrderBy(x => x.NameEn).ToList()));
    }

    /// <summary>Published pathways that contain at least one live course.</summary>
    public async Task<List<PathwaySummaryDto>> PublicPathways(CourseLevel? level = null, int? categoryId = null, int? take = null)
    {
        var q = db.Set<Pathway>().AsNoTracking().Where(p => p.IsPublished);
        if (level is { } lv) q = q.Where(p => p.Level == lv);
        if (categoryId is { } cid) q = q.Where(p => p.CategoryId == cid);
        var ps = await q.OrderBy(p => p.SortOrder).ThenBy(p => p.TitleEn).ToListAsync();
        var (cards, skills) = await PathwayMembers(ps.Select(p => p.Id).ToList());
        var list = ps.Where(p => cards[p.Id].Count > 0).Select(p => new PathwaySummaryDto(p.Id, p.Slug, p.TitleEn, p.TitleAr, p.DescriptionEn,
            p.DescriptionAr, p.Level, cards[p.Id].Count, cards[p.Id].Sum(c => c.TotalDurationSeconds), skills[p.Id].Select(s => s.NameEn).ToArray()));
        return take is { } t ? list.Take(t).ToList() : list.ToList();
    }

    public async Task<PathwayDetailDto> PublicPathway(string slug)
    {
        var p = await db.Set<Pathway>().AsNoTracking().FirstOrDefaultAsync(x => x.Slug == slug && x.IsPublished) ?? throw AppException.NotFound("Pathway");
        var (cards, skills) = await PathwayMembers([p.Id]);
        if (cards[p.Id].Count == 0) throw AppException.NotFound("Pathway");
        return new PathwayDetailDto(p.Id, p.Slug, p.TitleEn, p.TitleAr, p.DescriptionEn, p.DescriptionAr, p.Level, skills[p.Id], cards[p.Id]);
    }

    /// <summary>
    /// Convenience: enrolls the signed-in learner in every live course of a published pathway. Enrollment (free video
    /// learning) never requires payment; premium packages are bought separately per course. Idempotent.
    /// </summary>
    public async Task<PathwayEnrollResultDto> EnrollInPathway(string slug)
    {
        var uid = me.RequireId();
        var detail = await PublicPathway(slug);
        var ids = detail.Courses.Select(c => c.Id).ToList();
        var already = await db.Enrollments.Where(e => e.UserId == uid && ids.Contains(e.CourseId)).Select(e => e.CourseId).ToListAsync();
        var created = 0;
        foreach (var cid in ids.Except(already))
        {
            db.Enrollments.Add(new Enrollment { UserId = uid, CourseId = cid });
            try { await db.SaveChangesAsync(); created++; }
            catch (DbUpdateException) { db.ChangeTracker.Clear(); } // concurrent enrollment of the same course
        }
        audit.Record("pathway.enrolled", "Pathway", detail.Id, new { created });
        await db.SaveChangesAsync();
        return new PathwayEnrollResultDto(detail.Id, created, ids.Count - created, ids.ToArray());
    }

    // ---------- Collections ----------
    public static bool IsActive(Collection c, DateTime now) => (c.ActiveFrom is null || c.ActiveFrom <= now) && (c.ActiveTo is null || c.ActiveTo > now);

    public async Task<List<CollectionAdminDto>> AdminCollections()
    {
        var cs = await db.Set<Collection>().AsNoTracking().OrderBy(c => c.SortOrder).ThenBy(c => c.TitleEn).ToListAsync();
        var ids = cs.Select(c => c.Id).ToList();
        var links = await db.Set<CollectionCourse>().AsNoTracking().Where(x => ids.Contains(x.CollectionId)).OrderBy(x => x.SortOrder).ToListAsync();
        var now = DateTime.UtcNow;
        return cs.Select(c => new CollectionAdminDto(c.Id, c.Slug, c.TitleEn, c.TitleAr, c.Kind, c.CategoryId, c.ActiveFrom, c.ActiveTo, c.SortOrder,
            links.Where(l => l.CollectionId == c.Id).Select(l => l.CourseId).ToArray(), IsActive(c, now))).ToList();
    }

    public async Task<CollectionAdminDto> UpsertCollection(Guid? id, CollectionUpsertRequest req)
    {
        var slug = RequireSlug(req.Slug);
        var title = CertificationService.Trunc(req.TitleEn, 250);
        if (title.Length == 0) throw AppException.Bad("TitleEn is required.");
        if (!Enum.IsDefined(req.Kind)) throw AppException.Bad("Invalid kind.");
        if (req.ActiveFrom is { } f && req.ActiveTo is { } t && t <= f) throw AppException.Bad("ActiveTo must be after ActiveFrom.");
        if (req.CategoryId is { } cid && !await db.Categories.AnyAsync(c => c.Id == cid)) throw AppException.Bad("Unknown category.");
        var courseIds = await ValidCourseIds(req.CourseIds);
        Collection c;
        if (id is { } gid) c = await db.Set<Collection>().FirstOrDefaultAsync(x => x.Id == gid) ?? throw AppException.NotFound("Collection");
        else { c = new Collection(); db.Set<Collection>().Add(c); }
        if (await db.Set<Collection>().AnyAsync(x => x.Slug == slug && x.Id != c.Id)) throw AppException.Conflict("Slug already in use.", "duplicate_slug");
        c.Slug = slug; c.TitleEn = title; c.TitleAr = CertificationService.Trunc(req.TitleAr, 250); c.Kind = req.Kind; c.CategoryId = req.CategoryId;
        c.ActiveFrom = req.ActiveFrom; c.ActiveTo = req.ActiveTo; c.SortOrder = req.SortOrder ?? c.SortOrder; c.UpdatedAt = DateTime.UtcNow;
        db.Set<CollectionCourse>().RemoveRange(db.Set<CollectionCourse>().Where(x => x.CollectionId == c.Id));
        for (var i = 0; i < courseIds.Count; i++) db.Set<CollectionCourse>().Add(new CollectionCourse { CollectionId = c.Id, CourseId = courseIds[i], SortOrder = i });
        audit.Record(id is null ? "collection.created" : "collection.updated", "Collection", c.Id, new { c.Slug, c.Kind, courses = courseIds.Count });
        await db.SaveChangesAsync();
        return (await AdminCollections()).First(x => x.Id == c.Id);
    }

    public async Task DeleteCollection(Guid id)
    {
        var c = await db.Set<Collection>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Collection");
        db.Set<CollectionCourse>().RemoveRange(db.Set<CollectionCourse>().Where(x => x.CollectionId == id));
        db.Set<Collection>().Remove(c);
        audit.Record("collection.deleted", "Collection", id, new { c.Slug });
        await db.SaveChangesAsync();
    }

    /// <summary>Active collections with their live courses (empty collections are omitted).</summary>
    public async Task<List<CollectionDto>> ActiveCollections(CollectionKind? kind, int? categoryId, bool onlyUncategorized)
    {
        var now = DateTime.UtcNow;
        var q = db.Set<Collection>().AsNoTracking().Where(c => (c.ActiveFrom == null || c.ActiveFrom <= now) && (c.ActiveTo == null || c.ActiveTo > now));
        if (kind is { } k) q = q.Where(c => c.Kind == k);
        if (categoryId is { } cid) q = q.Where(c => c.CategoryId == cid);
        else if (onlyUncategorized) q = q.Where(c => c.CategoryId == null);
        var cs = await q.OrderBy(c => c.SortOrder).ThenBy(c => c.TitleEn).ToListAsync();
        var ids = cs.Select(c => c.Id).ToList();
        var links = await db.Set<CollectionCourse>().AsNoTracking().Where(x => ids.Contains(x.CollectionId)).OrderBy(x => x.SortOrder).ToListAsync();
        var cards = (await catalog.Cards(links.Select(l => l.CourseId).Distinct().ToList())).ToDictionary(c => c.Id);
        return cs.Select(c => new CollectionDto(c.Id, c.Slug, c.TitleEn, c.TitleAr, c.Kind,
                links.Where(l => l.CollectionId == c.Id && cards.ContainsKey(l.CourseId)).Select(l => cards[l.CourseId]).ToList()))
            .Where(c => c.Courses.Count > 0).ToList();
    }

    public async Task<CollectionDto> PublicCollection(string slug) =>
        (await ActiveCollections(null, null, false)).FirstOrDefault(c => c.Slug == slug) ?? throw AppException.NotFound("Collection");

    // ---------- Academies ----------
    public async Task<AcademyDto> Academy(string slug)
    {
        var cat = await db.Categories.AsNoTracking().FirstOrDefaultAsync(c => c.Slug == slug && c.IsAcademy) ?? throw AppException.NotFound("Academy");
        var catIds = await catalog.CategoryAndDescendants(cat.Slug);
        var categoryDto = (await catalog.Categories()).First(c => c.Id == cat.Id);
        var courseIds = await snapshots.LiveCards().Where(CatalogQueryService.AnyCategory(catIds))
            .OrderByDescending(x => x.PublishedAt).ThenBy(x => x.Id).Take(24).Select(x => x.Id).ToListAsync();
        return new AcademyDto(categoryDto, await PublicPathways(null, cat.Id), await ActiveCollections(null, cat.Id, false), await catalog.Cards(courseIds));
    }

    // ---------- Home ----------
    public async Task<HomeDto> Home()
    {
        const int n = 8;
        var featured = await ActiveCollections(CollectionKind.Editorial, null, true);
        var newIds = await snapshots.LiveCards().OrderByDescending(x => x.PublishedAt).ThenBy(x => x.Id).Take(n).Select(x => x.Id).ToListAsync();
        var updatedIds = await (from c in db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr)
                                join s in db.CourseSnapshots.AsNoTracking() on new { Id = c.Id, V = c.PublishedVersion } equals new { Id = s.CourseId, V = s.Version }
                                where s.Version > 1
                                orderby s.PublishedAt descending, c.Id
                                select c.Id).Take(n).ToListAsync();
        var aiCats = await catalog.CategoryAndDescendants(_o.AiAcademySlug);
        var aiIds = aiCats.Count == 0 ? [] : await snapshots.LiveCards().Where(CatalogQueryService.AnyCategory(aiCats))
            .OrderByDescending(x => x.PublishedAt).ThenBy(x => x.Id).Take(n).Select(x => x.Id).ToListAsync();
        var cutoff = DateTime.UtcNow.AddDays(-_o.CertificationFreshDays);
        var publicCerts = db.Set<Certification>().Where(CertificationService.PublicExpr(cutoff)).Select(c => c.Id);
        var certCourseIds = db.Set<CourseCertification>().Where(l => publicCerts.Contains(l.CertificationId)).Select(l => l.CourseId);
        var certIds = await snapshots.LiveCards().Where(x => certCourseIds.Contains(x.Id))
            .OrderByDescending(x => x.PublishedAt).ThenBy(x => x.Id).Take(n).Select(x => x.Id).ToListAsync();
        var best = await db.Set<BestsellerStat>().AsNoTracking().Where(b => b.Eligible)
            .OrderByDescending(b => b.DistinctBuyers).ThenBy(b => b.CourseId).Take(n * 2).ToListAsync();
        var bestCards = (await catalog.Cards(best.Select(b => b.CourseId).ToList())).ToDictionary(c => c.Id);
        var bestselling = best.Where(b => bestCards.ContainsKey(b.CourseId)).Take(n)
            .Select(b => new BestsellerCardDto(bestCards[b.CourseId], b.DistinctBuyers, true)).ToList();
        return new HomeDto(featured, await catalog.Cards(newIds), await catalog.Cards(updatedIds), await catalog.Cards(aiIds),
            await catalog.Cards(certIds), await PublicPathways(CourseLevel.Beginner, null, n), bestselling, BestsellerRule);
    }
}
