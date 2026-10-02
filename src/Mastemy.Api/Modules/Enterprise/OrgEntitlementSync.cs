using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Enterprise;

/// <summary>
/// Keeps Organization-sourced entitlements in line with an organization's premium assignments.
/// Only rows with Source=Organization AND OrganizationId=this org are ever created or revoked;
/// Purchase/Grant/Subscription entitlements and other orgs' entitlements are never touched.
/// </summary>
public class OrgEntitlementSync(AppDbContext db)
{
    public static bool Covers(OrganizationAssignment a, OrganizationMember m) =>
        a.UserId is { } uid
            ? uid == m.UserId
            : a.Department is null || string.Equals(a.Department, m.Department, StringComparison.OrdinalIgnoreCase);

    /// <summary>Recomputes desired entitlements from persisted state and stages adds/revokes (caller saves).</summary>
    public async Task<(int Granted, int Revoked)> Reconcile(Guid orgId)
    {
        var org = await db.Organizations.AsNoTracking().FirstAsync(o => o.Id == orgId);
        var desired = new HashSet<(Guid User, Guid Course)>();
        if (org.IsActive)
        {
            var members = await db.OrganizationMembers.AsNoTracking().Where(m => m.OrganizationId == orgId).ToListAsync();
            var premium = await db.OrganizationAssignments.AsNoTracking().Where(a => a.OrganizationId == orgId && a.GrantsPremium).ToListAsync();
            foreach (var a in premium)
                foreach (var m in members)
                    if (Covers(a, m)) desired.Add((m.UserId, a.CourseId));
        }
        var existing = await db.Entitlements
            .Where(e => e.OrganizationId == orgId && e.Source == EntitlementSource.Organization && e.RevokedAt == null)
            .ToListAsync();
        var now = DateTime.UtcNow;
        var have = new HashSet<(Guid, Guid)>();
        var revoked = 0;
        foreach (var e in existing)
        {
            if (desired.Contains((e.UserId, e.CourseId)) && have.Add((e.UserId, e.CourseId))) continue;
            e.RevokedAt = now; revoked++;
        }
        var granted = 0;
        foreach (var d in desired.Where(d => !have.Contains(d)))
        {
            db.Entitlements.Add(new Entitlement
            {
                UserId = d.User, CourseId = d.Course, OrganizationId = orgId, Source = EntitlementSource.Organization, StartsAt = now,
            });
            granted++;
        }
        return (granted, revoked);
    }
}
