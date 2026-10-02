using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using System.Security.Cryptography;
using System.Text;
using Mastemy.Api.Modules.Engagement;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Mastemy.Api.Modules.Enterprise;

public partial class EnterpriseService(AppDbContext db, ICurrentUser me, AuditService audit, OrgEntitlementSync sync,
    EmailOutbox outbox, IOptions<EmailOptions> emailOpt)
{
    public const int MaxSeatLimit = 100_000;
    public const int MaxBulkRows = 1000;
    public static readonly TimeSpan InvitationLifetime = TimeSpan.FromDays(14);

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

    /// <summary>Emails are visible only to org Admins and staff; Managers see display names and departments.</summary>
    public async Task<List<MemberDto>> Members(Guid id)
    {
        var (_, callerRole) = await RequireManager(id);
        var showEmail = callerRole is null or OrgRole.Admin;
        var rows = await (from m in db.OrganizationMembers
                          join u in db.Users on m.UserId equals u.Id
                          where m.OrganizationId == id
                          orderby u.DisplayName, u.Id
                          select new { u.Id, u.Email, u.DisplayName, m.Role, m.Department, m.JoinedAt }).ToListAsync();
        return rows.Select(r => new MemberDto(r.Id, showEmail ? r.Email : null, r.DisplayName, r.Role.ToString(), r.Department, r.JoinedAt)).ToList();
    }

    // ---------------- Invitations ----------------

    /// <summary>
    /// Invites any email address. The response is identical whether or not an account exists for it (no account
    /// enumeration); membership is created only when the matching user accepts. Seats are checked at acceptance.
    /// </summary>
    public async Task<InvitationCreatedDto> Invite(Guid id, AddMemberInput input)
    {
        var (_, callerRole) = await RequireManager(id);
        var role = ParseRole(input.Role) ?? OrgRole.Member;
        RequireCanGrant(callerRole, role);
        var dept = NormalizeDepartment(input.Department);
        var email = IdentityValidation.RequireEmail(input.Email);

        await using var tx = await db.Database.BeginTransactionAsync();
        var org = await LockActiveOrg(id);
        var created = await IssueInvitation(org, email, role, dept);
        audit.Record("org.invitation.created", nameof(Organization), id,
            new { invitationId = created.Id, role = role.ToString(), department = dept });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return created;
    }

    /// <summary>Revokes any earlier pending invitation for the same address, stages a new one (and its email). Caller saves.</summary>
    private async Task<InvitationCreatedDto> IssueInvitation(Organization org, string email, OrgRole role, string dept)
    {
        var normalized = IdentityValidation.NormalizeEmail(email);
        var now = DateTime.UtcNow;
        await db.OrganizationInvitations.Where(i => i.OrganizationId == org.Id && i.NormalizedEmail == normalized && i.AcceptedAt == null && i.RevokedAt == null)
            .ExecuteUpdateAsync(s => s.SetProperty(i => i.RevokedAt, now));
        var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32)).TrimEnd('=').Replace('+', '-').Replace('/', '_');
        var inv = new OrganizationInvitation
        {
            OrganizationId = org.Id, Email = email, NormalizedEmail = normalized, Role = role, Department = dept,
            TokenHash = HashToken(token), InvitedBy = me.RequireId(), ExpiresAt = now + InvitationLifetime, CreatedAt = now,
        };
        db.OrganizationInvitations.Add(inv);
        var baseUrl = emailOpt.Value.PublicBaseUrl.TrimEnd('/');
        var queued = outbox.Enqueue(email, $"You're invited to join {org.Name} on Mastemy",
            $"You have been invited to join {org.Name} on Mastemy.\n\nSign in with this email address and open:\n" +
            $"{baseUrl}/org-invitations/accept?token={token}\n\nThis invitation expires on {inv.ExpiresAt:yyyy-MM-dd} (UTC).");
        return new InvitationCreatedDto(inv.Id, email, role.ToString(), dept, inv.ExpiresAt, token, queued);
    }

    public static string HashToken(string token) =>
        Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token))).ToLowerInvariant();

    public async Task<List<InvitationDto>> Invitations(Guid id)
    {
        await RequireManager(id);
        var now = DateTime.UtcNow;
        return await db.OrganizationInvitations.AsNoTracking()
            .Where(i => i.OrganizationId == id && i.AcceptedAt == null && i.RevokedAt == null && i.ExpiresAt > now)
            .OrderBy(i => i.CreatedAt)
            .Select(i => new InvitationDto(i.Id, i.Email, i.Role.ToString(), i.Department, i.InvitedBy, i.CreatedAt, i.ExpiresAt))
            .ToListAsync();
    }

    public async Task RevokeInvitation(Guid id, Guid invitationId)
    {
        var (_, callerRole) = await RequireManager(id);
        await using var tx = await db.Database.BeginTransactionAsync();
        await LockOrg(id);
        var inv = await db.OrganizationInvitations.FirstOrDefaultAsync(i => i.Id == invitationId && i.OrganizationId == id
                      && i.AcceptedAt == null && i.RevokedAt == null) ?? throw AppException.NotFound("Invitation");
        if (inv.Role != OrgRole.Member) RequireAdmin(callerRole, "Only an organization Admin can revoke Manager or Admin invitations.");
        inv.RevokedAt = DateTime.UtcNow;
        audit.Record("org.invitation.revoked", nameof(Organization), id, new { invitationId });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
    }

    /// <summary>
    /// Accepts an invitation as the signed-in user. The invitation's address must match the caller's account email
    /// (case-insensitive); otherwise 404, so a token never reveals anything to the wrong account. Seat limit is enforced
    /// under the organization row lock.
    /// </summary>
    public async Task<AcceptedInvitationDto> AcceptInvitation(AcceptInvitationInput input)
    {
        var uid = me.RequireId();
        var token = (input.Token ?? "").Trim();
        if (token.Length is 0 or > 200) throw AppException.Bad("token is required.", "invalid_token");
        var hash = HashToken(token);
        var user = await db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("Invitation");
        var found = await db.OrganizationInvitations.AsNoTracking().FirstOrDefaultAsync(i => i.TokenHash == hash);
        if (found is null || found.RevokedAt is not null || found.NormalizedEmail != IdentityValidation.NormalizeEmail(user.Email))
            throw AppException.NotFound("Invitation");

        await using var tx = await db.Database.BeginTransactionAsync();
        var org = await LockActiveOrg(found.OrganizationId);
        var inv = await db.OrganizationInvitations.FirstAsync(i => i.Id == found.Id); // re-read under the org lock
        if (inv.RevokedAt is not null) throw AppException.NotFound("Invitation");
        if (inv.AcceptedAt is not null) throw AppException.Conflict("This invitation has already been used.", "invitation_used");
        if (inv.ExpiresAt <= DateTime.UtcNow) throw AppException.Conflict("This invitation has expired.", "invitation_expired");
        if (await db.OrganizationMembers.AnyAsync(m => m.OrganizationId == org.Id && m.UserId == uid))
            throw AppException.Conflict("You are already a member of this organization.", "already_member");
        var used = await db.OrganizationMembers.CountAsync(m => m.OrganizationId == org.Id);
        if (used + 1 > org.SeatLimit) throw AppException.Conflict("This organization has no free seats. Ask an administrator for help.", "seat_limit_reached");
        db.OrganizationMembers.Add(new OrganizationMember { OrganizationId = org.Id, UserId = uid, Role = inv.Role, Department = inv.Department });
        inv.AcceptedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        var (granted, _) = await sync.Reconcile(org.Id);
        audit.Record("org.member.added", nameof(Organization), org.Id,
            new { userId = uid, invitationId = inv.Id, role = inv.Role.ToString(), department = inv.Department, granted });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return new AcceptedInvitationDto(org.Id, org.Name, org.Slug, inv.Role.ToString(), inv.Department);
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
        if (newDept is not null && !string.Equals(newDept, m.Department, StringComparison.Ordinal))
        {
            if (callerRole is OrgRole.Manager && await ChangesPremiumCoverage(id, m, newDept))
                throw new AppException(403, "Only an organization Admin can move a member between departments with different premium access.",
                    "premium_scope_requires_admin");
            m.Department = newDept;
        }
        await db.SaveChangesAsync();
        var (granted, revoked) = await sync.Reconcile(id);
        audit.Record("org.member.updated", nameof(Organization), id,
            new { userId, before, after = new { role = m.Role.ToString(), m.Department }, granted, revoked });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        var u = await db.Users.AsNoTracking().FirstAsync(x => x.Id == userId);
        return new MemberDto(u.Id, callerRole is null or OrgRole.Admin ? u.Email : null, u.DisplayName, m.Role.ToString(), m.Department, m.JoinedAt);
    }

    /// <summary>True when moving the member to <paramref name="newDept"/> would grant or revoke any premium course.</summary>
    private async Task<bool> ChangesPremiumCoverage(Guid orgId, OrganizationMember m, string newDept)
    {
        var premium = await db.OrganizationAssignments.AsNoTracking().Where(a => a.OrganizationId == orgId && a.GrantsPremium).ToListAsync();
        var moved = new OrganizationMember { OrganizationId = m.OrganizationId, UserId = m.UserId, Role = m.Role, Department = newDept };
        var before = premium.Where(a => OrgEntitlementSync.Covers(a, m)).Select(a => a.CourseId).ToHashSet();
        var after = premium.Where(a => OrgEntitlementSync.Covers(a, moved)).Select(a => a.CourseId).ToHashSet();
        return !before.SetEquals(after);
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
        var org = await db.Organizations.AsNoTracking().FirstAsync(o => o.Id == id);
        var available = Math.Max(0, org.SeatLimit - await db.OrganizationMembers.CountAsync(m => m.OrganizationId == id));
        var (rows, _) = ValidateBulk(input, available);
        var valid = rows.Count(r => r.Error is null);
        return new BulkPreviewDto(rows.Count, valid, available, rows.Count > 0 && valid == rows.Count, rows);
    }

    /// <summary>Creates one invitation per row (all-or-nothing). Seats are consumed only when invitations are accepted.</summary>
    public async Task<BulkInviteResultDto> BulkCommit(Guid id, BulkMembersInput input)
    {
        await RequireManager(id);
        var dept = NormalizeDepartment(input.Department);
        await using var tx = await db.Database.BeginTransactionAsync();
        var org = await LockActiveOrg(id);
        var available = Math.Max(0, org.SeatLimit - await db.OrganizationMembers.CountAsync(m => m.OrganizationId == id));
        var (rows, emails) = ValidateBulk(input, available);
        if (rows.Count == 0) throw AppException.Bad("CSV contains no emails.", "empty_csv");
        if (rows.Any(r => r.Error is not null)) throw AppException.Bad("CSV has invalid rows; fix them and preview again. Nothing was sent.", "invalid_rows");
        var invitations = new List<InvitationCreatedDto>();
        foreach (var e in emails) invitations.Add(await IssueInvitation(org, e, OrgRole.Member, dept));
        audit.Record("org.invitation.bulk_created", nameof(Organization), id, new { count = invitations.Count, department = dept });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return new BulkInviteResultDto(rows.Count, invitations.Count, available, rows, invitations);
    }

    /// <summary>
    /// Uniform per-row validation: format, duplicates within the file, and seat capacity (rows beyond the free seats).
    /// Deliberately never consults user accounts or memberships, so the result carries no account-existence signal.
    /// </summary>
    private (List<BulkRowResult> Rows, List<string> Emails) ValidateBulk(BulkMembersInput input, int available)
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
        var seen = new HashSet<string>();
        var rows = new List<BulkRowResult>();
        var ok = new List<string>();
        foreach (var (line, email) in lines)
        {
            string? error = null;
            if (!IsValidEmail(email)) error = "Invalid email address.";
            else if (!seen.Add(IdentityValidation.NormalizeEmail(email))) error = "Duplicate email in file.";
            else if (ok.Count >= available) error = "Exceeds available seats.";
            else ok.Add(email);
            rows.Add(new BulkRowResult(line, email, error));
        }
        return (rows, ok);
    }

    private static bool IsValidEmail(string email)
    {
        try { IdentityValidation.RequireEmail(email); return true; }
        catch (AppException) { return false; }
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
