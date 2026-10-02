using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Enterprise;

public partial class EnterpriseService(AppDbContext db, ICurrentUser me, AuditService audit, OrgEntitlementSync sync)
{
    public const int MaxSeatLimit = 100_000;
    public const int MaxBulkRows = 1000;

    [GeneratedRegex("^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$")]
    private static partial Regex SlugRx();

    // ---------------- Staff: organizations ----------------

    public async Task<List<OrgDto>> ListOrgs()
    {
        var orgs = await db.Organizations.AsNoTracking().OrderBy(o => o.Name).ToListAsync();
        var counts = await db.OrganizationMembers.GroupBy(m => m.OrganizationId).Select(g => new { g.Key, N = g.Count() })
            .ToDictionaryAsync(x => x.Key, x => x.N);
        return orgs.Select(o => ToDto(o, counts.GetValueOrDefault(o.Id))).ToList();
    }

    public async Task<OrgDto> CreateOrg(OrgInput input)
    {
        var name = RequireName(input.Name);
        var slug = RequireSlug(input.Slug);
        RequireSeatLimit(input.SeatLimit);
        if (await db.Organizations.AnyAsync(o => o.Slug == slug)) throw AppException.Conflict("Slug is already in use.", "slug_taken");
        var org = new Organization { Name = name, Slug = slug, SeatLimit = input.SeatLimit };
        db.Organizations.Add(org);
        audit.Record("org.created", nameof(Organization), org.Id, new { name, slug, input.SeatLimit });
        await SaveUnique();
        return ToDto(org, 0);
    }

    public async Task<OrgDto> UpdateOrg(Guid id, OrgUpdateInput input)
    {
        await using var tx = await db.Database.BeginTransactionAsync();
        await LockOrg(id);
        var org = await db.Organizations.FirstOrDefaultAsync(o => o.Id == id) ?? throw AppException.NotFound("Organization");
        var used = await db.OrganizationMembers.CountAsync(m => m.OrganizationId == id);
        var before = new { org.Name, org.Slug, org.SeatLimit };
        if (input.Name is not null) org.Name = RequireName(input.Name);
        if (input.Slug is not null)
        {
            var slug = RequireSlug(input.Slug);
            if (slug != org.Slug && await db.Organizations.AnyAsync(o => o.Slug == slug)) throw AppException.Conflict("Slug is already in use.", "slug_taken");
            org.Slug = slug;
        }
        if (input.SeatLimit is { } limit)
        {
            RequireSeatLimit(limit);
            if (limit < used) throw AppException.Conflict($"Seat limit cannot be below the {used} seats in use.", "seat_limit_below_usage");
            org.SeatLimit = limit;
        }
        audit.Record("org.updated", nameof(Organization), org.Id, new { before, after = new { org.Name, org.Slug, org.SeatLimit } });
        await SaveUnique();
        await tx.CommitAsync();
        return ToDto(org, used);
    }

    public async Task<OrgDto> SetActive(Guid id, bool active)
    {
        await using var tx = await db.Database.BeginTransactionAsync();
        await LockOrg(id);
        var org = await db.Organizations.FirstOrDefaultAsync(o => o.Id == id) ?? throw AppException.NotFound("Organization");
        if (org.IsActive != active)
        {
            org.IsActive = active;
            await db.SaveChangesAsync();
            var (granted, revoked) = await sync.Reconcile(id);
            audit.Record(active ? "org.reactivated" : "org.deactivated", nameof(Organization), id, new { granted, revoked });
            await db.SaveChangesAsync();
        }
        await tx.CommitAsync();
        return ToDto(org, await db.OrganizationMembers.CountAsync(m => m.OrganizationId == id));
    }

    // ---------------- Org: details & members ----------------

    public async Task<OrgDto> GetOrg(Guid id)
    {
        var (org, _) = await RequireManager(id);
        return ToDto(org, await db.OrganizationMembers.CountAsync(m => m.OrganizationId == id));
    }

    public async Task<List<MemberDto>> Members(Guid id)
    {
        await RequireManager(id);
        return await (from m in db.OrganizationMembers
                      join u in db.Users on m.UserId equals u.Id
                      where m.OrganizationId == id
                      orderby u.Email
                      select new MemberDto(u.Id, u.Email, u.DisplayName, m.Role.ToString(), m.Department, m.JoinedAt)).ToListAsync();
    }

    public async Task<MemberDto> AddMember(Guid id, AddMemberInput input)
    {
        var (_, callerRole) = await RequireManager(id);
        var role = ParseRole(input.Role) ?? OrgRole.Member;
        RequireCanGrant(callerRole, role);
        var dept = NormalizeDepartment(input.Department);
        var user = await FindUserByEmail(input.Email) ?? throw AppException.NotFound("User account with that email");

        await using var tx = await db.Database.BeginTransactionAsync();
        var org = await LockActiveOrg(id);
        if (await db.OrganizationMembers.AnyAsync(m => m.OrganizationId == id && m.UserId == user.Id))
            throw AppException.Conflict("User is already a member of this organization.", "already_member");
        var used = await db.OrganizationMembers.CountAsync(m => m.OrganizationId == id);
        if (used + 1 > org.SeatLimit) throw AppException.Conflict("Seat limit reached for this organization.", "seat_limit_reached");
        var m = new OrganizationMember { OrganizationId = id, UserId = user.Id, Role = role, Department = dept };
        db.OrganizationMembers.Add(m);
        await db.SaveChangesAsync();
        var (granted, _) = await sync.Reconcile(id);
        audit.Record("org.member.added", nameof(Organization), id, new { userId = user.Id, role = role.ToString(), department = dept, granted });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return new MemberDto(user.Id, user.Email, user.DisplayName, role.ToString(), dept, m.JoinedAt);
    }

    public async Task<MemberDto> UpdateMember(Guid id, Guid userId, UpdateMemberInput input)
    {
        var (_, callerRole) = await RequireManager(id);
        var newRole = ParseRole(input.Role);
        var newDept = input.Department is null ? null : NormalizeDepartment(input.Department);
        await using var tx = await db.Database.BeginTransactionAsync();
        await LockActiveOrg(id);
        var m = await db.OrganizationMembers.FirstOrDefaultAsync(x => x.OrganizationId == id && x.UserId == userId) ?? throw AppException.NotFound("Member");
        if (m.Role != OrgRole.Member) RequireAdmin(callerRole, "Only an organization Admin can change a Manager or Admin.");
        var before = new { role = m.Role.ToString(), m.Department };
        if (newRole is { } r && r != m.Role)
        {
            RequireCanGrant(callerRole, r);
            if (m.Role == OrgRole.Admin && await IsLastAdmin(id)) throw AppException.Conflict("Cannot demote the last organization Admin.", "last_admin");
            m.Role = r;
        }
        if (newDept is not null) m.Department = newDept;
        await db.SaveChangesAsync();
        var (granted, revoked) = await sync.Reconcile(id);
        audit.Record("org.member.updated", nameof(Organization), id,
            new { userId, before, after = new { role = m.Role.ToString(), m.Department }, granted, revoked });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        var u = await db.Users.AsNoTracking().FirstAsync(x => x.Id == userId);
        return new MemberDto(u.Id, u.Email, u.DisplayName, m.Role.ToString(), m.Department, m.JoinedAt);
    }

    public async Task RemoveMember(Guid id, Guid userId)
    {
        var (_, callerRole) = await RequireManager(id);
        await using var tx = await db.Database.BeginTransactionAsync();
        await LockActiveOrg(id);
        var m = await db.OrganizationMembers.FirstOrDefaultAsync(x => x.OrganizationId == id && x.UserId == userId) ?? throw AppException.NotFound("Member");
        if (m.Role != OrgRole.Member) RequireAdmin(callerRole, "Only an organization Admin can remove a Manager or Admin.");
        if (m.Role == OrgRole.Admin && await IsLastAdmin(id)) throw AppException.Conflict("Cannot remove the last organization Admin.", "last_admin");
        db.OrganizationMembers.Remove(m);
        // Individual assignments for a departing user no longer have a subject.
        db.OrganizationAssignments.RemoveRange(await db.OrganizationAssignments.Where(a => a.OrganizationId == id && a.UserId == userId).ToListAsync());
        await db.SaveChangesAsync();
        var (_, revoked) = await sync.Reconcile(id);
        audit.Record("org.member.removed", nameof(Organization), id, new { userId, role = m.Role.ToString(), revoked });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
    }

    public async Task<BulkPreviewDto> BulkPreview(Guid id, BulkMembersInput input)
    {
        await RequireManager(id);
        var (rows, _) = await ValidateBulk(id, input);
        var org = await db.Organizations.AsNoTracking().FirstAsync(o => o.Id == id);
        var available = Math.Max(0, org.SeatLimit - await db.OrganizationMembers.CountAsync(m => m.OrganizationId == id));
        var valid = rows.Count(r => r.Error is null);
        return new BulkPreviewDto(rows.Count, valid, available, rows.Count > 0 && valid == rows.Count && valid <= available, rows);
    }

    public async Task<BulkPreviewDto> BulkCommit(Guid id, BulkMembersInput input)
    {
        await RequireManager(id);
        var dept = NormalizeDepartment(input.Department);
        await using var tx = await db.Database.BeginTransactionAsync();
        var org = await LockActiveOrg(id);
        var (rows, users) = await ValidateBulk(id, input);
        if (rows.Count == 0) throw AppException.Bad("CSV contains no emails.", "empty_csv");
        if (rows.Any(r => r.Error is not null)) throw AppException.Bad("CSV has invalid rows; fix them and preview again. Nothing was added.", "invalid_rows");
        var used = await db.OrganizationMembers.CountAsync(m => m.OrganizationId == id);
        if (used + users.Count > org.SeatLimit)
            throw AppException.Conflict($"Adding {users.Count} members would exceed the seat limit ({org.SeatLimit - used} available). Nothing was added.", "seat_limit_reached");
        foreach (var u in users) db.OrganizationMembers.Add(new OrganizationMember { OrganizationId = id, UserId = u.Id, Role = OrgRole.Member, Department = dept });
        await db.SaveChangesAsync();
        var (granted, _) = await sync.Reconcile(id);
        audit.Record("org.member.bulk_added", nameof(Organization), id, new { count = users.Count, department = dept, granted });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return new BulkPreviewDto(rows.Count, rows.Count, org.SeatLimit - used - users.Count, true, rows);
    }

    private async Task<(List<BulkRowResult> Rows, List<User> Users)> ValidateBulk(Guid id, BulkMembersInput input)
    {
        if (input.Csv is null) throw AppException.Bad("Csv is required.");
        if (input.Csv.Length > 512 * 1024) throw AppException.Bad("CSV is too large.", "too_large");
        NormalizeDepartment(input.Department);
        List<List<string>> records;
        try { records = Questions.Csv.Parse(input.Csv); }
        catch (Questions.CsvFormatException ex) { throw AppException.Bad($"Malformed CSV: {ex.Message}", "malformed_csv"); }
        var lines = new List<(int Line, string Email)>();
        for (var i = 0; i < records.Count; i++)
        {
            var cell = records[i].FirstOrDefault()?.Trim() ?? "";
            if (i == 0 && cell.Equals("email", StringComparison.OrdinalIgnoreCase)) continue; // optional header
            if (records[i].All(string.IsNullOrWhiteSpace)) continue;
            lines.Add((i + 1, cell));
        }
        if (lines.Count > MaxBulkRows) throw AppException.Bad($"At most {MaxBulkRows} rows per upload.", "too_many_rows");
        var normalized = lines.Select(l => IdentityValidation.NormalizeEmail(l.Email)).Distinct().ToList();
        var users = await db.Users.AsNoTracking().Where(u => normalized.Contains(u.NormalizedEmail)).ToListAsync();
        var byEmail = users.ToDictionary(u => u.NormalizedEmail);
        var ids = users.Select(u => u.Id).ToList();
        var existing = (await db.OrganizationMembers.Where(m => m.OrganizationId == id && ids.Contains(m.UserId)).Select(m => m.UserId).ToListAsync()).ToHashSet();
        var seen = new HashSet<string>();
        var rows = new List<BulkRowResult>();
        var toAdd = new List<User>();
        foreach (var (line, email) in lines)
        {
            var n = IdentityValidation.NormalizeEmail(email);
            string? error = null;
            if (email.Length == 0 || email.Length > 254 || !email.Contains('@')) error = "Invalid email address.";
            else if (!seen.Add(n)) error = "Duplicate email in file.";
            else if (!byEmail.TryGetValue(n, out var u)) error = "No user account with this email.";
            else if (existing.Contains(u.Id)) error = "Already a member.";
            else toAdd.Add(u);
            rows.Add(new BulkRowResult(line, email, error));
        }
        return (rows, toAdd);
    }

    // ---------------- Assignments ----------------

    public async Task<List<AssignmentDto>> Assignments(Guid id)
    {
        await RequireManager(id);
        return await AssignmentQuery(db.OrganizationAssignments.Where(a => a.OrganizationId == id));
    }

    public async Task<AssignmentDto> CreateAssignment(Guid id, AssignmentInput input)
    {
        var (_, callerRole) = await RequireManager(id);
        if (input.GrantsPremium) RequireAdmin(callerRole, "Only an organization Admin can create premium-granting assignments.");
        var course = await db.Courses.AsNoTracking().Where(c => c.Id == input.CourseId).Where(AccessService.IsLiveExpr).FirstOrDefaultAsync()
                     ?? throw AppException.NotFound("Live course");
        if (input.UserId is not null && !string.IsNullOrWhiteSpace(input.Department))
            throw AppException.Bad("Assign to either a user or a department, not both.", "invalid_scope");
        if (input.DueAt is { } due && due.ToUniversalTime() <= DateTime.UtcNow) throw AppException.Bad("Due date must be in the future.", "invalid_due_date");
        var dept = string.IsNullOrWhiteSpace(input.Department) ? null : NormalizeDepartment(input.Department);

        await using var tx = await db.Database.BeginTransactionAsync();
        await LockActiveOrg(id);
        if (input.UserId is { } uid && !await db.OrganizationMembers.AnyAsync(m => m.OrganizationId == id && m.UserId == uid))
            throw AppException.NotFound("Member");
        if (await db.OrganizationAssignments.AnyAsync(a => a.OrganizationId == id && a.CourseId == input.CourseId && a.UserId == input.UserId && a.Department == dept))
            throw AppException.Conflict("An assignment for this course and scope already exists.", "duplicate_assignment");
        var a = new OrganizationAssignment
        {
            OrganizationId = id, CourseId = course.Id, UserId = input.UserId, Department = dept, GrantsPremium = input.GrantsPremium,
            DueAt = input.DueAt?.ToUniversalTime(), AssignedBy = me.RequireId(),
        };
        db.OrganizationAssignments.Add(a);
        await db.SaveChangesAsync();
        var (granted, _) = await sync.Reconcile(id);
        audit.Record("org.assignment.created", nameof(Organization), id,
            new { assignmentId = a.Id, a.CourseId, a.UserId, a.Department, a.GrantsPremium, a.DueAt, granted });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return (await AssignmentQuery(db.OrganizationAssignments.Where(x => x.Id == a.Id))).Single();
    }

    public async Task DeleteAssignment(Guid id, Guid assignmentId)
    {
        var (_, callerRole) = await RequireManager(id);
        await using var tx = await db.Database.BeginTransactionAsync();
        await LockActiveOrg(id);
        var a = await db.OrganizationAssignments.FirstOrDefaultAsync(x => x.Id == assignmentId && x.OrganizationId == id) ?? throw AppException.NotFound("Assignment");
        if (a.GrantsPremium) RequireAdmin(callerRole, "Only an organization Admin can remove premium-granting assignments.");
        db.OrganizationAssignments.Remove(a);
        await db.SaveChangesAsync();
        var (_, revoked) = await sync.Reconcile(id);
        audit.Record("org.assignment.deleted", nameof(Organization), id, new { assignmentId, a.CourseId, a.UserId, a.Department, a.GrantsPremium, revoked });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
    }

    private Task<List<AssignmentDto>> AssignmentQuery(IQueryable<OrganizationAssignment> q) =>
        (from a in q
         join c in db.Courses on a.CourseId equals c.Id
         orderby a.CreatedAt
         select new AssignmentDto(a.Id, a.CourseId, c.Title, a.UserId != null ? "User" : a.Department != null ? "Department" : "Organization",
             a.UserId, a.Department, a.GrantsPremium, a.DueAt, a.CreatedAt)).ToListAsync();

    // ---------------- Member view ----------------

    public async Task<List<MyOrgDto>> MyOrganizations()
    {
        var uid = me.RequireId();
        var memberships = await (from m in db.OrganizationMembers
                                 join o in db.Organizations on m.OrganizationId equals o.Id
                                 where m.UserId == uid && o.IsActive
                                 orderby o.Name
                                 select new { m, o }).AsNoTracking().ToListAsync();
        var orgIds = memberships.Select(x => x.o.Id).ToList();
        var assignments = await (from a in db.OrganizationAssignments
                                 join c in db.Courses on a.CourseId equals c.Id
                                 where orgIds.Contains(a.OrganizationId)
                                 select new { a, c.Title, c.Slug }).AsNoTracking().ToListAsync();
        var now = DateTime.UtcNow;
        var passed = await EnterpriseReportService.PassedCourses(db, [uid]);
        return memberships.Select(x => new MyOrgDto(x.o.Id, x.o.Name, x.o.Slug, x.m.Role.ToString(), x.m.Department,
            assignments.Where(y => y.a.OrganizationId == x.o.Id && OrgEntitlementSync.Covers(y.a, x.m))
                .OrderBy(y => y.a.DueAt ?? DateTime.MaxValue)
                .Select(y => new MyOrgAssignmentDto(y.a.Id, y.a.CourseId, y.Title, y.Slug, y.a.GrantsPremium, y.a.DueAt,
                    y.a.DueAt < now && !passed.Contains((uid, y.a.CourseId)))).ToList())).ToList();
    }

    // ---------------- Authorization helpers ----------------

    /// <summary>
    /// Caller must be staff, or an Admin/Manager of this active organization. Anyone else gets 404 so the
    /// existence of other organizations is never revealed. Returns the caller's org role (null for staff).
    /// </summary>
    public async Task<(Organization Org, OrgRole? Role)> RequireManager(Guid id)
    {
        var uid = me.RequireId();
        var org = await db.Organizations.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id);
        if (me.IsStaff && org is not null) return (org, null);
        if (org is null || !org.IsActive) throw AppException.NotFound("Organization");
        var m = await db.OrganizationMembers.AsNoTracking().FirstOrDefaultAsync(x => x.OrganizationId == id && x.UserId == uid);
        if (m is null || m.Role == OrgRole.Member) throw AppException.NotFound("Organization");
        return (org, m.Role);
    }

    private static void RequireAdmin(OrgRole? callerRole, string msg)
    {
        if (callerRole is null or OrgRole.Admin) return; // staff or org admin
        throw AppException.Forbidden(msg);
    }

    private static void RequireCanGrant(OrgRole? callerRole, OrgRole target)
    {
        if (target != OrgRole.Member) RequireAdmin(callerRole, "Only an organization Admin can grant the Manager or Admin role.");
    }

    private async Task<bool> IsLastAdmin(Guid id) =>
        await db.OrganizationMembers.CountAsync(m => m.OrganizationId == id && m.Role == OrgRole.Admin) <= 1;

    private Task LockOrg(Guid id) =>
        db.Database.ExecuteSqlInterpolatedAsync($"SELECT `Id` FROM `Organizations` WHERE `Id` = {id.ToString()} FOR UPDATE");

    /// <summary>Row-locks the org (serializes seat/role changes) and re-checks it is active under the lock.</summary>
    private async Task<Organization> LockActiveOrg(Guid id)
    {
        await LockOrg(id);
        var org = await db.Organizations.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id) ?? throw AppException.NotFound("Organization");
        if (!org.IsActive) throw AppException.Conflict("Organization is deactivated.", "org_inactive");
        return org;
    }

    private async Task<User?> FindUserByEmail(string? email)
    {
        if (string.IsNullOrWhiteSpace(email) || email.Length > 254 || !email.Contains('@')) throw AppException.Bad("A valid email is required.", "invalid_email");
        var n = IdentityValidation.NormalizeEmail(email);
        return await db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.NormalizedEmail == n);
    }

    private static OrgRole? ParseRole(string? role)
    {
        if (string.IsNullOrWhiteSpace(role)) return null;
        var v = role.Trim();
        foreach (var r in Enum.GetValues<OrgRole>())
            if (string.Equals(r.ToString(), v, StringComparison.OrdinalIgnoreCase)) return r;
        throw AppException.Bad("Role must be Member, Manager or Admin.", "invalid_role");
    }

    private static string NormalizeDepartment(string? d)
    {
        var v = (d ?? "").Trim();
        if (v.Length > 100) throw AppException.Bad("Department must be at most 100 characters.", "invalid_department");
        return v;
    }

    private static string RequireName(string? name)
    {
        var v = (name ?? "").Trim();
        if (v.Length is < 2 or > 200) throw AppException.Bad("Name must be 2-200 characters.", "invalid_name");
        return v;
    }

    private static string RequireSlug(string? slug)
    {
        var v = (slug ?? "").Trim().ToLowerInvariant();
        if (!SlugRx().IsMatch(v)) throw AppException.Bad("Slug must be 1-64 lowercase letters, digits or hyphens.", "invalid_slug");
        return v;
    }

    private static void RequireSeatLimit(int n)
    {
        if (n is < 1 or > MaxSeatLimit) throw AppException.Bad($"Seat limit must be between 1 and {MaxSeatLimit}.", "invalid_seat_limit");
    }

    private async Task SaveUnique()
    {
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { throw AppException.Conflict("Slug is already in use.", "slug_taken"); }
    }

    private static OrgDto ToDto(Organization o, int used) => new(o.Id, o.Name, o.Slug, o.SeatLimit, used, o.IsActive, o.CreatedAt);
}
