using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Catalog;

public record CategoryAdminInput(string? Slug, string? NameEn, string? NameAr, int? ParentId, bool IsAcademy, int SortOrder);
public record CategoryAdminDto(int Id, string Slug, string NameEn, string NameAr, int? ParentId, bool IsAcademy, int SortOrder,
    int CourseCount, int ChildCount);

/// <summary>
/// Staff management of the category tree (spec §9/§20): bilingual names, parent/child hierarchy, sort order and the
/// academy flag. Slugs are unique; a category can never become its own ancestor; a category that still has courses,
/// children or pathways cannot be deleted (409). Every change is audited.
/// </summary>
public partial class CategoryAdminService(AppDbContext db, AuditService audit)
{
    public const int MaxDepth = 4;

    [GeneratedRegex("^[a-z0-9](?:[a-z0-9-]{0,98}[a-z0-9])?$")]
    private static partial Regex SlugRx();

    public async Task<List<CategoryAdminDto>> List()
    {
        var cats = await db.Categories.AsNoTracking().OrderBy(c => c.ParentId).ThenBy(c => c.SortOrder).ThenBy(c => c.NameEn).ToListAsync();
        var courses = await db.CourseCategories.GroupBy(x => x.CategoryId).Select(g => new { g.Key, N = g.Count() }).ToDictionaryAsync(x => x.Key, x => x.N);
        return cats.Select(c => ToDto(c, courses.GetValueOrDefault(c.Id), cats.Count(x => x.ParentId == c.Id))).ToList();
    }

    public async Task<CategoryAdminDto> Get(int id)
    {
        var c = await db.Categories.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Category");
        return await Dto(c);
    }

    public async Task<CategoryAdminDto> Create(CategoryAdminInput input)
    {
        var (slug, en, ar) = Validate(input);
        if (await db.Categories.AnyAsync(c => c.Slug == slug)) throw AppException.Conflict("Slug is already in use.", "slug_taken");
        if (input.ParentId is { } pid) await RequireParent(pid, null);
        var c = new Category { Slug = slug, NameEn = en, NameAr = ar, ParentId = input.ParentId, IsAcademy = input.IsAcademy, SortOrder = input.SortOrder };
        db.Categories.Add(c);
        await SaveUnique();
        audit.Record("category.created", nameof(Category), c.Id, new { c.Slug, c.NameEn, c.NameAr, c.ParentId, c.IsAcademy, c.SortOrder });
        await db.SaveChangesAsync();
        return await Dto(c);
    }

    public async Task<CategoryAdminDto> Update(int id, CategoryAdminInput input)
    {
        var c = await db.Categories.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Category");
        var (slug, en, ar) = Validate(input);
        if (slug != c.Slug && await db.Categories.AnyAsync(x => x.Slug == slug && x.Id != id)) throw AppException.Conflict("Slug is already in use.", "slug_taken");
        if (input.ParentId is { } pid) await RequireParent(pid, id);
        var before = new { c.Slug, c.NameEn, c.NameAr, c.ParentId, c.IsAcademy, c.SortOrder };
        c.Slug = slug; c.NameEn = en; c.NameAr = ar; c.ParentId = input.ParentId; c.IsAcademy = input.IsAcademy; c.SortOrder = input.SortOrder;
        audit.Record("category.updated", nameof(Category), c.Id, new { before, after = new { c.Slug, c.NameEn, c.NameAr, c.ParentId, c.IsAcademy, c.SortOrder } });
        await SaveUnique();
        return await Dto(c);
    }

    public async Task Delete(int id)
    {
        var c = await db.Categories.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Category");
        if (await db.CourseCategories.AnyAsync(x => x.CategoryId == id))
            throw AppException.Conflict("This category still has courses. Move them to another category first.", "category_has_courses");
        var token = "," + id + ",";
        if (await db.CourseSnapshots.AnyAsync(s => s.CategoryIds.Contains(token)))
            throw AppException.Conflict("Published course versions still reference this category.", "category_has_courses");
        if (await db.Categories.AnyAsync(x => x.ParentId == id))
            throw AppException.Conflict("This category has subcategories. Move or delete them first.", "category_has_children");
        if (await db.Set<Taxonomy.Pathway>().AnyAsync(p => p.CategoryId == id))
            throw AppException.Conflict("Pathways belong to this category. Reassign them first.", "category_has_pathways");
        if (await db.Set<Commerce.Plan>().AnyAsync(p => p.CategoryId == id))
            throw AppException.Conflict("Subscription plans are scoped to this category. Reassign them first.", "category_in_use");
        if (await db.Set<Commerce.Bundle>().AnyAsync(b => b.CategoryId == id))
            throw AppException.Conflict("Bundles belong to this category. Reassign them first.", "category_in_use");
        if (await db.Set<Taxonomy.Collection>().AnyAsync(x => x.CategoryId == id))
            throw AppException.Conflict("Collections are featured on this category. Reassign them first.", "category_in_use");
        db.Categories.Remove(c);
        audit.Record("category.deleted", nameof(Category), id, new { c.Slug, c.NameEn, c.NameAr, c.ParentId });
        await db.SaveChangesAsync();
    }

    private static (string Slug, string En, string Ar) Validate(CategoryAdminInput input)
    {
        var slug = (input.Slug ?? "").Trim().ToLowerInvariant();
        if (!SlugRx().IsMatch(slug)) throw AppException.Bad("Slug must be 1-100 lowercase letters, digits or hyphens.", "invalid_slug");
        var en = Name(input.NameEn, "nameEn");
        var ar = Name(input.NameAr, "nameAr");
        if (input.SortOrder is < -100_000 or > 100_000) throw AppException.Bad("sortOrder is out of range.", "invalid_sort_order");
        return (slug, en, ar);
    }

    private static string Name(string? v, string field)
    {
        var s = (v ?? "").Trim();
        if (s.Length is < 1 or > 100) throw AppException.Bad($"{field} must be 1-100 characters.", "invalid_name");
        if (s.Contains('<') || s.Contains('>')) throw AppException.Bad($"{field} must be plain text.", "invalid_name");
        return s;
    }

    /// <summary>Parent must exist, must not be the category itself or one of its descendants, and the tree stays shallow.</summary>
    private async Task RequireParent(int parentId, int? selfId)
    {
        var all = await db.Categories.AsNoTracking().Select(c => new { c.Id, c.ParentId }).ToDictionaryAsync(c => c.Id, c => c.ParentId);
        if (!all.ContainsKey(parentId)) throw AppException.Bad("Parent category does not exist.", "invalid_parent");
        var depth = 1;
        int? cur = parentId;
        var guard = 0;
        while (cur is { } id)
        {
            if (selfId == id) throw AppException.Bad("A category cannot be moved under itself or one of its subcategories.", "category_cycle");
            cur = all.GetValueOrDefault(id);
            depth++;
            if (++guard > 1000) throw AppException.Conflict("Category tree is inconsistent.", "category_cycle");
        }
        // Height of the moved subtree also counts.
        var height = selfId is { } s ? Height(s, all) : 1;
        if (depth - 1 + height > MaxDepth) throw AppException.Bad($"Categories can be nested at most {MaxDepth} levels deep.", "category_too_deep");
    }

    private static int Height(int id, Dictionary<int, int?> all)
    {
        var children = all.Where(kv => kv.Value == id).Select(kv => kv.Key).ToList();
        return 1 + (children.Count == 0 ? 0 : children.Max(c => Height(c, all)));
    }

    private async Task SaveUnique()
    {
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("Duplicate", StringComparison.OrdinalIgnoreCase) == true)
        { throw AppException.Conflict("Slug is already in use.", "slug_taken"); }
    }

    private async Task<CategoryAdminDto> Dto(Category c) => ToDto(c,
        await db.CourseCategories.CountAsync(x => x.CategoryId == c.Id), await db.Categories.CountAsync(x => x.ParentId == c.Id));

    private static CategoryAdminDto ToDto(Category c, int courses, int children) =>
        new(c.Id, c.Slug, c.NameEn, c.NameAr, c.ParentId, c.IsAcademy, c.SortOrder, courses, children);
}

[ApiController]
[Authorize(Policy = "Staff")]
[Route("api/admin/categories")]
public class CategoryAdminController(CategoryAdminService svc) : ControllerBase
{
    [HttpGet] public Task<List<CategoryAdminDto>> List() => svc.List();
    [HttpGet("{id:int}")] public Task<CategoryAdminDto> Get(int id) => svc.Get(id);
    [HttpPost] public async Task<IActionResult> Create(CategoryAdminInput input) => StatusCode(201, await svc.Create(input));
    [HttpPut("{id:int}")] public Task<CategoryAdminDto> Update(int id, CategoryAdminInput input) => svc.Update(id, input);
    [HttpDelete("{id:int}")] public async Task<IActionResult> Delete(int id) { await svc.Delete(id); return NoContent(); }
}
