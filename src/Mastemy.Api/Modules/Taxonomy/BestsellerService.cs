using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.Taxonomy;

/// <summary>
/// Computes <see cref="BestsellerStat"/> rows (rule: <see cref="DiscoveryService.BestsellerRule"/>). Only real paid orders count;
/// nothing is ever estimated or padded. The table is fully replaced on every run.
/// </summary>
public class BestsellerService(AppDbContext db, IOptions<TaxonomyOptions> options)
{
    public static readonly string[] StaffRoles = [Roles.Admin, Roles.SuperAdmin, Roles.Finance, Roles.Support, Roles.Moderator, Roles.Reviewer];

    public async Task<BestsellerRunDto> Recompute(DateTime nowUtc)
    {
        var o = options.Value;
        var windowStart = nowUtc.AddDays(-o.BestsellerWindowDays);
        var staff = db.UserRoles.Where(r => StaffRoles.Contains(r.Role)).Select(r => r.UserId);
        var refunded = db.Refunds.Where(r => r.Status == "Requested" || r.Status == "Processing" || r.Status == "Completed").Select(r => r.OrderId);
        var rows = await (from oi in db.OrderItems.AsNoTracking()
                          join ord in db.Orders.AsNoTracking() on oi.OrderId equals ord.Id
                          where ord.Status == OrderStatus.Paid && ord.PaidAt != null && ord.PaidAt >= windowStart && ord.PaidAt <= nowUtc
                                && !refunded.Contains(ord.Id) && !staff.Contains(ord.UserId)
                                && !db.CourseInstructors.Any(ci => ci.CourseId == oi.CourseId && ci.UserId == ord.UserId)
                          select new { oi.CourseId, ord.UserId, oi.UnitPrice }).ToListAsync();
        var stats = rows.GroupBy(r => r.CourseId).Select(g => new BestsellerStat
        {
            CourseId = g.Key,
            DistinctBuyers = g.Select(x => x.UserId).Distinct().Count(),
            NetRevenue = g.Sum(x => x.UnitPrice),
            WindowStart = windowStart,
            ComputedAt = nowUtc,
        }).ToList();
        foreach (var s in stats) s.Eligible = s.DistinctBuyers >= o.BestsellerMinBuyers;

        await using var tx = await db.Database.BeginTransactionAsync();
        await db.Set<BestsellerStat>().ExecuteDeleteAsync();
        db.Set<BestsellerStat>().AddRange(stats);
        db.AuditLogs.Add(new AuditLog { Action = "bestsellers.recomputed", EntityType = "BestsellerStat", EntityId = "all",
            Details = System.Text.Json.JsonSerializer.Serialize(new { courses = stats.Count, eligible = stats.Count(s => s.Eligible), windowStart }) });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return new BestsellerRunDto(stats.Count, stats.Count(s => s.Eligible), windowStart, nowUtc);
    }
}
