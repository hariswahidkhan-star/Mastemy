using Mastemy.Api.Data;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Taxonomy;

/// <summary>
/// Notes Library: live courses (paged, by title) with a HasNotes flag computed from the published snapshot payload
/// (any lesson with non-empty free or premium notes). Note content itself is never returned here.
/// </summary>
public class NotesLibraryService(AppDbContext db, CourseSnapshotService snapshots, CatalogQueryService catalog)
{
    public async Task<PagedResult<NotesLibraryItemDto>> List(string? q, int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize <= 0 ? 20 : pageSize, 1, 50);
        var term = string.IsNullOrWhiteSpace(q) ? null : q.Trim().ToLowerInvariant();
        var live = snapshots.LiveCards();
        if (term is not null)
        {
            var p = "%" + CatalogQueryService.EscapeLike(term) + "%";
            live = live.Where(x => EF.Functions.Like(x.SearchText, p, "!") || EF.Functions.Like(x.Title, p, "!"));
        }
        var rows = (await live.Select(x => new { x.Id, x.Title }).ToListAsync()).Select(x => (x.Id, x.Title)).ToList();
        // Live courses published before snapshots existed are rare; include them in memory.
        foreach (var l in await snapshots.LegacyCards())
            if (term is null || (l.Title + " " + l.SearchText).Contains(term, StringComparison.OrdinalIgnoreCase))
                rows.Add((l.Id, l.Title));
        var ordered = rows.DistinctBy(r => r.Id).OrderBy(r => r.Title, StringComparer.OrdinalIgnoreCase).ThenBy(r => r.Id).ToList();
        var pageIds = ordered.Skip((page - 1) * pageSize).Take(pageSize).Select(r => r.Id).ToList();
        var courses = await db.Courses.AsNoTracking().Where(c => pageIds.Contains(c.Id)).ToListAsync();
        var payloads = await snapshots.ForCourses(courses);
        var cards = (await catalog.Cards(pageIds)).ToDictionary(c => c.Id);
        var items = new List<NotesLibraryItemDto>();
        foreach (var id in pageIds)
        {
            if (!cards.TryGetValue(id, out var card) || !payloads.TryGetValue(id, out var pc)) continue;
            var withNotes = (pc.Payload.Modules ?? []).SelectMany(m => m.Lessons ?? [])
                .Count(l => !string.IsNullOrWhiteSpace(l.NotesMarkdown) || !string.IsNullOrWhiteSpace(l.PremiumNotesMarkdown));
            items.Add(new NotesLibraryItemDto(card, withNotes > 0, withNotes));
        }
        return new PagedResult<NotesLibraryItemDto>(items, ordered.Count, page, pageSize);
    }
}
