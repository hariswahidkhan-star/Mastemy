using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Identity;

public class AdminService(AppDbContext db, AuditService audit, ICurrentUser me, AuthService auth)
{
    public async Task<PagedResult<AdminUserDto>> ListUsers(string? q, int page, int pageSize)
    {
        (page, pageSize) = IdentityValidation.Paging(page, pageSize);
        var query = db.Users.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(q))
        {
            var term = q.Trim();
            var norm = term.ToLowerInvariant();
            query = query.Where(u => u.NormalizedEmail.Contains(norm) || u.DisplayName.Contains(term));
        }
        var total = await query.CountAsync();
        var items = await query.OrderBy(u => u.NormalizedEmail).Skip((page - 1) * pageSize).Take(pageSize)
            .Include(u => u.Roles).ToListAsync();
        var ids = items.Select(u => u.Id).ToList();
        var sec = await db.Set<UserSecurity>().AsNoTracking().Where(s => ids.Contains(s.UserId)).ToDictionaryAsync(s => s.UserId);
        return new(items.Select(u => ToDto(u, sec.GetValueOrDefault(u.Id))).ToList(), total, page, pageSize);
    }

    public async Task<AdminUserDto> SetRoles(Guid userId, SetRolesRequest req)
    {
        if (!me.IsInRole(Roles.SuperAdmin)) throw AppException.Forbidden();
        if (req.Roles is null || req.Roles.Length == 0) throw AppException.Bad("At least one role is required.", "invalid_roles");
        var unknown = req.Roles.Where(r => !Roles.All.Contains(r)).ToArray();
        if (unknown.Length > 0) throw AppException.Bad($"Unknown role(s): {string.Join(", ", unknown)}.", "invalid_roles");
        var wanted = req.Roles.Distinct().ToHashSet();
        if (userId == me.RequireId() && !wanted.Contains(Roles.SuperAdmin))
            throw AppException.Bad("You cannot remove your own SuperAdmin role.", "cannot_remove_own_superadmin");

        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == userId) ?? throw AppException.NotFound("User");
        var old = user.Roles.Select(r => r.Role).OrderBy(r => r).ToArray();
        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId);
        var addedPrivileged = wanted.Where(r => SecurityClaims.PrivilegedRoles.Contains(r) && !old.Contains(r)).ToArray();
        if (addedPrivileged.Length > 0 && !EmailVerificationService.IsVerified(user, sec))
            throw AppException.Conflict($"The user's email address must be verified before granting {string.Join(", ", addedPrivileged)}.", "email_not_verified");
        foreach (var r in user.Roles.Where(r => !wanted.Contains(r.Role)).ToList()) user.Roles.Remove(r);
        foreach (var r in wanted.Where(r => user.Roles.All(x => x.Role != r))) user.Roles.Add(new UserRole { UserId = user.Id, Role = r });
        var @new = user.Roles.Select(r => r.Role).OrderBy(r => r).ToArray();
        audit.Record("user.roles_changed", "User", user.Id, new { old, @new });
        await db.SaveChangesAsync();
        return ToDto(user, sec);
    }

    public async Task<AdminUserDto> Get(Guid userId)
    {
        var user = await db.Users.AsNoTracking().Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == userId) ?? throw AppException.NotFound("User");
        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId);
        return ToDto(user, sec);
    }

    public async Task<AdminUserDto> Suspend(Guid userId, SuspendRequest req)
    {
        if (req.Suspended is not { } suspended) throw AppException.Bad("'suspended' is required.");
        if (suspended && userId == me.RequireId()) throw AppException.Bad("You cannot suspend yourself.", "cannot_suspend_self");
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == userId) ?? throw AppException.NotFound("User");
        if (suspended && user.Roles.Any(r => r.Role == Roles.SuperAdmin) && !me.IsInRole(Roles.SuperAdmin))
            throw AppException.Forbidden("Only a SuperAdmin can suspend a SuperAdmin.");
        if (user.IsSuspended != suspended)
        {
            user.IsSuspended = suspended;
            audit.Record(suspended ? "user.suspended" : "user.unsuspended", "User", user.Id);
            await db.SaveChangesAsync();
        }
        if (suspended) await auth.RevokeAllForUser(user.Id);
        return ToDto(user, await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == userId));
    }

    public async Task<PagedResult<AuditLogDto>> Audit(string? entityType, int page, int pageSize)
    {
        (page, pageSize) = IdentityValidation.Paging(page, pageSize);
        var query = db.AuditLogs.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(entityType)) query = query.Where(a => a.EntityType == entityType.Trim());
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(a => a.Id).Skip((page - 1) * pageSize).Take(pageSize)
            .Select(a => new AuditLogDto(a.Id, a.ActorId, a.Action, a.EntityType, a.EntityId, a.Details, a.CreatedAt))
            .ToListAsync();
        return new(items, total, page, pageSize);
    }

    private static AdminUserDto ToDto(User u, UserSecurity? sec) => new(u.Id, u.Email, u.DisplayName, u.PreferredLanguage,
        u.Roles.Select(r => r.Role).OrderBy(r => r, StringComparer.Ordinal).ToArray(), u.IsSuspended, u.LockoutUntil, u.CreatedAt,
        EmailVerificationService.IsVerified(u, sec), sec?.MfaEnabledAt is not null);
}
