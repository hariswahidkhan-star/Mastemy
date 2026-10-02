using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Taxonomy;

/// <summary>
/// Public instructor directory: non-suspended users holding the Instructor role who teach at least one live course.
/// Exposes only the display name, live courses and aggregate genuine (non-hidden) ratings; profile bio/headline is
/// intentionally not read here (owned by the account module).
/// </summary>
public class InstructorDirectoryService(AppDbContext db, CatalogQueryService catalog)
{
    private IQueryable<Guid> PublicInstructorIds() =>
        from u in db.Users.AsNoTracking()
        where !u.IsSuspended && db.UserRoles.Any(r => r.UserId == u.Id && r.Role == Roles.Instructor)
              && db.CourseInstructors.Any(ci => ci.UserId == u.Id && db.Courses.Where(AccessService.IsLiveExpr).Any(c => c.Id == ci.CourseId))
        select u.Id;

    private async Task<Dictionary<Guid, (int Courses, decimal? Avg, int Count)>> Aggregates(List<Guid> userIds)
    {
        var live = await (from ci in db.CourseInstructors.AsNoTracking()
                          join c in db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr) on ci.CourseId equals c.Id
                          where userIds.Contains(ci.UserId) select new { ci.UserId, ci.CourseId }).ToListAsync();
        var courseIds = live.Select(x => x.CourseId).Distinct().ToList();
        var ratings = await db.CourseReviews.AsNoTracking().Where(r => courseIds.Contains(r.CourseId) && !r.Hidden)
            .GroupBy(r => r.CourseId).Select(g => new { g.Key, Sum = g.Sum(x => x.Rating), Count = g.Count() }).ToDictionaryAsync(x => x.Key);
        return userIds.ToDictionary(id => id, id =>
        {
            var cs = live.Where(x => x.UserId == id).Select(x => x.CourseId).Distinct().ToList();
            var sum = cs.Sum(c => ratings.TryGetValue(c, out var r) ? r.Sum : 0);
            var cnt = cs.Sum(c => ratings.TryGetValue(c, out var r) ? r.Count : 0);
            return (cs.Count, cnt == 0 ? (decimal?)null : Math.Round((decimal)sum / cnt, 2), cnt);
        });
    }

    public async Task<PagedResult<InstructorSummaryDto>> List(string? q, int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize <= 0 ? 20 : pageSize, 1, 50);
        var ids = PublicInstructorIds();
        var users = db.Users.AsNoTracking().Where(u => ids.Contains(u.Id));
        if (!string.IsNullOrWhiteSpace(q))
        {
            var p = "%" + CatalogQueryService.EscapeLike(q.Trim()) + "%";
            users = users.Where(u => EF.Functions.Like(u.DisplayName, p, "!"));
        }
        var total = await users.CountAsync();
        var rows = await users.OrderBy(u => u.DisplayName).ThenBy(u => u.Id).Skip((page - 1) * pageSize).Take(pageSize)
            .Select(u => new { u.Id, u.DisplayName }).ToListAsync();
        var agg = await Aggregates(rows.Select(r => r.Id).ToList());
        return new PagedResult<InstructorSummaryDto>(rows.Select(r =>
        {
            var a = agg[r.Id];
            return new InstructorSummaryDto(r.Id, r.DisplayName, a.Courses, a.Avg, a.Count);
        }).ToList(), total, page, pageSize);
    }

    public async Task<InstructorProfileDto> Profile(Guid id)
    {
        if (!await PublicInstructorIds().AnyAsync(x => x == id)) throw AppException.NotFound("Instructor");
        var name = await db.Users.AsNoTracking().Where(u => u.Id == id).Select(u => u.DisplayName).FirstAsync();
        var courseIds = await (from ci in db.CourseInstructors.AsNoTracking()
                               join c in db.Courses.AsNoTracking().Where(AccessService.IsLiveExpr) on ci.CourseId equals c.Id
                               where ci.UserId == id orderby c.PublishedAt descending select c.Id).ToListAsync();
        var a = (await Aggregates([id]))[id];
        return new InstructorProfileDto(id, name, a.Courses, a.Avg, a.Count, await catalog.Cards(courseIds));
    }
}
