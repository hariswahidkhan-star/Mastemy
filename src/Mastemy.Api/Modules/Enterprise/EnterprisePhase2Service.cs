using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Commerce;
using Mastemy.Api.Modules.Resources;
using Mastemy.Api.Modules.Taxonomy;
using Mastemy.Api.Modules.Trust;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Enterprise;

public record PathwayAssignmentInput(Guid PathwayId, Guid? UserId, string? Department, DateTime? DueAt, bool GrantsPremium);
public record PathwayAssignmentDto(Guid Id, Guid PathwayId, string PathwayTitle, string Scope, Guid? UserId, string? Department, bool GrantsPremium,
    DateTime? DueAt, List<Guid> CourseIds, List<Guid> SkippedCourseIds, DateTime CreatedAt);

public record OrgMaterialDto(Guid Id, string Title, string? Department, string FileName, string ContentType, long SizeBytes, string ScanVerdict,
    DateTime CreatedAt, string DownloadUrl);
public sealed record OrgMaterialDownload(Stream Content, string ContentType, string FileName);

public record SeatRequestInput(int Quantity, string? Note);
public record SeatRequestDto(Guid Id, Guid OrganizationId, string OrganizationName, int Quantity, string Note, Guid RequestedBy, string Status,
    DateTime CreatedAt, string? DecisionNote, Guid? EnterpriseOrderId);
public record RejectSeatRequestInput(string? Note);
public record EnterpriseOrderInput(Guid OrganizationId, Guid? SeatRequestId, int? Quantity, decimal UnitPrice, string? Currency);
public record MarkPaidInput(string? PaymentReference);
public record EnterpriseOrderDto(Guid Id, Guid OrganizationId, string OrganizationName, Guid? SeatRequestId, Guid OrderId, Guid InvoiceId,
    string InvoiceNumber, int Quantity, decimal UnitPrice, string Currency, decimal Total, string Status, string PaymentInstructions,
    DateTime CreatedAt, DateTime? PaidAt, string? PaymentReference, int? SeatLimitBefore, int? SeatLimitAfter);

/// <summary>
/// Enterprise phase 2 (spec §20): assigned pathways, org-private materials and seat purchasing with bank-transfer invoices.
/// Organization isolation is the same as phase 1: non-members get 404 for another organization's data.
/// </summary>
public class EnterprisePhase2Service(AppDbContext db, ICurrentUser me, AuditService audit, EnterpriseService orgs, OrgEntitlementSync sync,
    IResourceStorage storage, ResourceOptions resourceOpt, MalwareScanPolicy scanPolicy, InvoiceService invoices, IConfiguration cfg)
{
    public const string PaymentInstructions = "Payment due by bank transfer";
    public long MaterialQuotaBytes => Math.Max(1, cfg.GetValue("Enterprise:OrgMaterialQuotaBytes", 2L * 1024 * 1024 * 1024));
    public long MaxMaterialBytes => resourceOpt.MaxFileBytes;

    // ================= assigned pathways =================

    public async Task<List<PathwayAssignmentDto>> PathwayAssignments(Guid orgId)
    {
        await orgs.RequireManager(orgId);
        var rows = await db.Set<OrgPathwayAssignment>().AsNoTracking().Where(p => p.OrganizationId == orgId).OrderBy(p => p.CreatedAt).ToListAsync();
        var result = new List<PathwayAssignmentDto>();
        foreach (var r in rows) result.Add(await PathwayDto(r, []));
        return result;
    }

    public async Task<PathwayAssignmentDto> AssignPathway(Guid orgId, PathwayAssignmentInput input)
    {
        var (_, role) = await orgs.RequireManager(orgId);
        if (input.GrantsPremium) RequireAdmin(role, "Only an organization Admin can create premium-granting assignments.");
        var pathway = await db.Set<Pathway>().AsNoTracking().FirstOrDefaultAsync(p => p.Id == input.PathwayId && p.IsPublished)
                      ?? throw AppException.NotFound("Pathway");
        if (input.UserId is not null && !string.IsNullOrWhiteSpace(input.Department))
            throw AppException.Bad("Assign to either a user or a department, not both.", "invalid_scope");
        if (input.DueAt is { } due && due.ToUniversalTime() <= DateTime.UtcNow) throw AppException.Bad("Due date must be in the future.", "invalid_due_date");
        var dept = string.IsNullOrWhiteSpace(input.Department) ? null : Department(input.Department);
        var courses = await (from pc in db.Set<PathwayCourse>()
                             join c in db.Courses.Where(AccessService.IsLiveExpr) on pc.CourseId equals c.Id
                             where pc.PathwayId == pathway.Id
                             orderby pc.SortOrder
                             select c.Id).ToListAsync();
        if (courses.Count == 0) throw AppException.Conflict("This pathway has no live courses to assign.", "pathway_has_no_live_courses");

        await using var tx = await db.Database.BeginTransactionAsync();
        await LockActiveOrg(orgId);
        if (input.UserId is { } uid && !await db.OrganizationMembers.AnyAsync(m => m.OrganizationId == orgId && m.UserId == uid))
            throw AppException.NotFound("Member");
        if (await db.Set<OrgPathwayAssignment>().AnyAsync(p => p.OrganizationId == orgId && p.PathwayId == pathway.Id && p.UserId == input.UserId && p.Department == dept))
            throw AppException.Conflict("This pathway is already assigned to this scope.", "duplicate_assignment");
        var pa = new OrgPathwayAssignment
        {
            OrganizationId = orgId, PathwayId = pathway.Id, UserId = input.UserId, Department = dept, GrantsPremium = input.GrantsPremium,
            DueAt = input.DueAt?.ToUniversalTime(), AssignedBy = me.RequireId(),
        };
        db.Set<OrgPathwayAssignment>().Add(pa);
        var skipped = new List<Guid>();
        foreach (var courseId in courses)
        {
            // An existing assignment for the same course and scope (made directly or by another pathway) is left as is.
            if (await db.OrganizationAssignments.AnyAsync(a => a.OrganizationId == orgId && a.CourseId == courseId && a.UserId == input.UserId && a.Department == dept))
            { skipped.Add(courseId); continue; }
            var a = new OrganizationAssignment
            {
                OrganizationId = orgId, CourseId = courseId, UserId = input.UserId, Department = dept, GrantsPremium = input.GrantsPremium,
                DueAt = pa.DueAt, AssignedBy = pa.AssignedBy,
            };
            db.OrganizationAssignments.Add(a);
            db.Set<OrgPathwayAssignmentCourse>().Add(new OrgPathwayAssignmentCourse { PathwayAssignmentId = pa.Id, OrganizationAssignmentId = a.Id, CourseId = courseId });
        }
        await db.SaveChangesAsync();
        var (granted, _) = await sync.Reconcile(orgId);
        audit.Record("org.pathway_assignment.created", nameof(Organization), orgId,
            new { pathwayAssignmentId = pa.Id, pa.PathwayId, pa.UserId, pa.Department, pa.GrantsPremium, pa.DueAt, courses = courses.Count, skipped = skipped.Count, granted });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await PathwayDto(pa, skipped);
    }

    public async Task DeletePathwayAssignment(Guid orgId, Guid id)
    {
        var (_, role) = await orgs.RequireManager(orgId);
        await using var tx = await db.Database.BeginTransactionAsync();
        await LockActiveOrg(orgId);
        var pa = await db.Set<OrgPathwayAssignment>().FirstOrDefaultAsync(p => p.Id == id && p.OrganizationId == orgId) ?? throw AppException.NotFound("Assignment");
        if (pa.GrantsPremium) RequireAdmin(role, "Only an organization Admin can remove premium-granting assignments.");
        var links = await db.Set<OrgPathwayAssignmentCourse>().Where(l => l.PathwayAssignmentId == id).ToListAsync();
        var ids = links.Select(l => l.OrganizationAssignmentId).ToList();
        db.OrganizationAssignments.RemoveRange(await db.OrganizationAssignments.Where(a => ids.Contains(a.Id) && a.OrganizationId == orgId).ToListAsync());
        db.Set<OrgPathwayAssignmentCourse>().RemoveRange(links);
        db.Set<OrgPathwayAssignment>().Remove(pa);
        await db.SaveChangesAsync();
        var (_, revoked) = await sync.Reconcile(orgId);
        audit.Record("org.pathway_assignment.deleted", nameof(Organization), orgId, new { pathwayAssignmentId = id, pa.PathwayId, removed = ids.Count, revoked });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
    }

    private async Task<PathwayAssignmentDto> PathwayDto(OrgPathwayAssignment p, List<Guid> skipped)
    {
        var title = await db.Set<Pathway>().Where(x => x.Id == p.PathwayId).Select(x => x.TitleEn).FirstOrDefaultAsync() ?? "";
        var courseIds = await db.Set<OrgPathwayAssignmentCourse>().Where(l => l.PathwayAssignmentId == p.Id).Select(l => l.CourseId).ToListAsync();
        return new PathwayAssignmentDto(p.Id, p.PathwayId, title, p.UserId != null ? "User" : p.Department != null ? "Department" : "Organization",
            p.UserId, p.Department, p.GrantsPremium, p.DueAt, courseIds, skipped, p.CreatedAt);
    }

    // ================= org-private materials =================

    /// <summary>Org Admins (or staff) upload. Same allow-list (no video/audio/archives), magic-byte check and malware policy as course resources.</summary>
    public async Task<OrgMaterialDto> UploadMaterial(Guid orgId, string? title, string? department, string? clientFileName, Stream body, CancellationToken ct)
    {
        var (_, role) = await orgs.RequireManager(orgId);
        RequireAdmin(role, "Only an organization Admin can upload materials.");
        var fileName = FileTypePolicy.SanitizeFileName(clientFileName);
        var ext = FileTypePolicy.CheckExtension(fileName);
        var t = string.IsNullOrWhiteSpace(title) ? Path.GetFileNameWithoutExtension(fileName) : title.Trim();
        if (t.Length is < 1 or > 200) throw AppException.Bad("Title must be 1-200 characters.", "invalid_title");
        var dept = string.IsNullOrWhiteSpace(department) ? null : Department(department);

        await using var staged = await storage.StageAsync(body, MaxMaterialBytes, ct);
        FileTypePolicy.VerifyContent(ext, staged);
        var scan = await scanPolicy.EnforceAsync(staged.TempPath, ct); // infected → 422; Required w/o scanner → 503

        await using var tx = await db.Database.BeginTransactionAsync(ct);
        await LockActiveOrg(orgId);
        var used = await db.Set<OrgMaterial>().Where(m => m.OrganizationId == orgId && m.DeletedAt == null).SumAsync(m => (long?)m.SizeBytes, ct) ?? 0;
        if (used + staged.Size > MaterialQuotaBytes)
            throw new AppException(413, "The organization's material storage quota would be exceeded.", "quota_exceeded");
        var m = new OrgMaterial
        {
            OrganizationId = orgId, Title = t, Department = dept, FileName = fileName, ContentType = FileTypePolicy.Allowed[ext], SizeBytes = staged.Size,
            Sha256 = staged.Sha256, StorageKey = ResourceStorageKeys.For(orgId, staged.Sha256), ScanVerdict = scan.Verdict, ScanEngine = scan.Engine,
            UploadedBy = me.RequireId(),
        };
        await storage.CommitAsync(staged, m.StorageKey, ct);
        db.Set<OrgMaterial>().Add(m);
        audit.Record("org.material.uploaded", nameof(Organization), orgId,
            new { materialId = m.Id, m.FileName, m.SizeBytes, m.Sha256, m.Department, scan = scan.Verdict.ToString() });
        await db.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);
        return MaterialDto(m);
    }

    public async Task<List<OrgMaterialDto>> Materials(Guid orgId)
    {
        var (role, dept) = await RequireMember(orgId);
        var q = db.Set<OrgMaterial>().AsNoTracking().Where(m => m.OrganizationId == orgId && m.DeletedAt == null);
        var rows = await q.OrderByDescending(m => m.CreatedAt).Take(1000).ToListAsync();
        return rows.Where(m => CanSee(m, role, dept)).Select(MaterialDto).ToList();
    }

    public async Task<OrgMaterialDownload> DownloadMaterial(Guid orgId, Guid id)
    {
        var (role, dept) = await RequireMember(orgId);
        var m = await db.Set<OrgMaterial>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.OrganizationId == orgId && x.DeletedAt == null);
        if (m is null || !CanSee(m, role, dept) || !storage.Exists(m.StorageKey)) throw AppException.NotFound("Material");
        return new OrgMaterialDownload(storage.OpenRead(m.StorageKey), m.ContentType, m.FileName);
    }

    public async Task DeleteMaterial(Guid orgId, Guid id, CancellationToken ct)
    {
        var (_, role) = await orgs.RequireManager(orgId);
        RequireAdmin(role, "Only an organization Admin can delete materials.");
        var m = await db.Set<OrgMaterial>().FirstOrDefaultAsync(x => x.Id == id && x.OrganizationId == orgId && x.DeletedAt == null, ct)
                ?? throw AppException.NotFound("Material");
        m.DeletedAt = DateTime.UtcNow;
        audit.Record("org.material.deleted", nameof(Organization), orgId, new { materialId = id, m.FileName });
        await db.SaveChangesAsync(ct);
        if (!await db.Set<OrgMaterial>().AnyAsync(x => x.OrganizationId == orgId && x.StorageKey == m.StorageKey && x.DeletedAt == null, ct))
            await storage.DeleteAsync(m.StorageKey, ct);
    }

    /// <summary>Managers/Admins/staff see everything; members see org-wide material and their own department's.</summary>
    private static bool CanSee(OrgMaterial m, OrgRole? role, string? dept) =>
        role is null or OrgRole.Admin or OrgRole.Manager || m.Department is null || string.Equals(m.Department, dept, StringComparison.OrdinalIgnoreCase);

    private static OrgMaterialDto MaterialDto(OrgMaterial m) => new(m.Id, m.Title, m.Department, m.FileName, m.ContentType, m.SizeBytes,
        m.ScanVerdict.ToString(), m.CreatedAt, $"/api/orgs/{m.OrganizationId}/materials/{m.Id}/download");

    /// <summary>Any member of the active org, or staff. Others get 404. Returns (role, department); role null for staff.</summary>
    private async Task<(OrgRole? Role, string? Dept)> RequireMember(Guid orgId)
    {
        var uid = me.RequireId();
        var org = await db.Organizations.AsNoTracking().FirstOrDefaultAsync(o => o.Id == orgId);
        if (org is null) throw AppException.NotFound("Organization");
        var m = await db.OrganizationMembers.AsNoTracking().FirstOrDefaultAsync(x => x.OrganizationId == orgId && x.UserId == uid);
        if (m is not null && org.IsActive) return (m.Role, m.Department);
        if (me.IsStaff) return (null, null);
        throw AppException.NotFound("Organization");
    }

    // ================= seat purchasing =================

    public async Task<SeatRequestDto> RequestSeats(Guid orgId, SeatRequestInput input)
    {
        var (org, role) = await orgs.RequireManager(orgId);
        RequireAdmin(role, "Only an organization Admin can request seats.");
        if (input.Quantity is < 1 or > EnterpriseService.MaxSeatLimit) throw AppException.Bad($"Quantity must be 1-{EnterpriseService.MaxSeatLimit}.", "invalid_quantity");
        var note = (input.Note ?? "").Trim();
        if (note.Length > 1000) throw AppException.Bad("Note must be at most 1000 characters.", "invalid_note");
        await using var tx = await db.Database.BeginTransactionAsync();
        await LockActiveOrg(orgId);
        if (await db.Set<SeatRequest>().AnyAsync(r => r.OrganizationId == orgId && r.Status == SeatRequestStatus.Requested))
            throw AppException.Conflict("A seat request is already awaiting review.", "seat_request_pending");
        var r = new SeatRequest { OrganizationId = orgId, Quantity = input.Quantity, Note = note, RequestedBy = me.RequireId() };
        db.Set<SeatRequest>().Add(r);
        audit.Record("org.seat_request.created", nameof(Organization), orgId, new { requestId = r.Id, r.Quantity });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await SeatRequestDto(r);
    }

    public async Task<List<SeatRequestDto>> OrgSeatRequests(Guid orgId)
    {
        await orgs.RequireManager(orgId);
        var rows = await db.Set<SeatRequest>().AsNoTracking().Where(r => r.OrganizationId == orgId).OrderByDescending(r => r.CreatedAt).Take(200).ToListAsync();
        var list = new List<SeatRequestDto>();
        foreach (var r in rows) list.Add(await SeatRequestDto(r));
        return list;
    }

    public async Task<List<EnterpriseOrderDto>> OrgOrders(Guid orgId)
    {
        var (_, role) = await orgs.RequireManager(orgId);
        RequireAdmin(role, "Only an organization Admin can view enterprise invoices.");
        return await OrderDtos(db.Set<EnterpriseOrder>().Where(o => o.OrganizationId == orgId));
    }

    public async Task<List<SeatRequestDto>> AllSeatRequests(string? status)
    {
        var q = db.Set<SeatRequest>().AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status))
        {
            if (!Enum.TryParse<SeatRequestStatus>(status, true, out var s)) throw AppException.Bad("Unknown status.", "invalid_status");
            q = q.Where(r => r.Status == s);
        }
        var rows = await q.OrderByDescending(r => r.CreatedAt).Take(500).ToListAsync();
        var list = new List<SeatRequestDto>();
        foreach (var r in rows) list.Add(await SeatRequestDto(r));
        return list;
    }

    public async Task<SeatRequestDto> RejectSeatRequest(Guid id, RejectSeatRequestInput input)
    {
        var note = (input.Note ?? "").Trim();
        if (note.Length is < 3 or > 1000) throw AppException.Bad("A note of 3-1000 characters is required.", "invalid_note");
        var r = await db.Set<SeatRequest>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Seat request");
        if (r.Status != SeatRequestStatus.Requested) throw AppException.Conflict($"Seat request is already {r.Status}.", "seat_request_closed");
        r.Status = SeatRequestStatus.Rejected; r.DecidedBy = me.RequireId(); r.DecidedAt = DateTime.UtcNow; r.DecisionNote = note;
        audit.Record("org.seat_request.rejected", nameof(Organization), r.OrganizationId, new { requestId = id, note });
        await db.SaveChangesAsync();
        return await SeatRequestDto(r);
    }

    public Task<List<EnterpriseOrderDto>> AllOrders() => OrderDtos(db.Set<EnterpriseOrder>());

    /// <summary>
    /// Staff create an enterprise order (quantity × unit price) for an organization, optionally from a seat request, and
    /// issue its invoice through Commerce's InvoiceService ("Payment due by bank transfer"). Seats increase only when paid.
    /// </summary>
    public async Task<EnterpriseOrderDto> CreateOrder(EnterpriseOrderInput input)
    {
        var staff = me.RequireId();
        var currency = (input.Currency ?? "USD").Trim().ToUpperInvariant();
        if (currency.Length != 3 || !currency.All(char.IsAsciiLetterUpper)) throw AppException.Bad("Currency must be a 3-letter ISO code.", "invalid_currency");
        if (input.UnitPrice <= 0 || input.UnitPrice > 1_000_000m || !Money.IsValidAmount(input.UnitPrice, currency))
            throw AppException.Bad("Unit price must be positive and valid for the currency.", "invalid_unit_price");

        await using var tx = await db.Database.BeginTransactionAsync();
        var org = await LockActiveOrg(input.OrganizationId);
        SeatRequest? request = null;
        if (input.SeatRequestId is { } rid)
        {
            request = await db.Set<SeatRequest>().FirstOrDefaultAsync(r => r.Id == rid && r.OrganizationId == org.Id) ?? throw AppException.NotFound("Seat request");
            if (request.Status != SeatRequestStatus.Requested) throw AppException.Conflict($"Seat request is already {request.Status}.", "seat_request_closed");
        }
        var qty = input.Quantity ?? request?.Quantity ?? 0;
        if (qty is < 1 or > EnterpriseService.MaxSeatLimit) throw AppException.Bad($"Quantity must be 1-{EnterpriseService.MaxSeatLimit}.", "invalid_quantity");
        if (org.SeatLimit + qty > EnterpriseService.MaxSeatLimit) throw AppException.Conflict("The seat limit would exceed the platform maximum.", "seat_limit_exceeded");
        var buyer = request?.RequestedBy
                    ?? await db.OrganizationMembers.Where(m => m.OrganizationId == org.Id && m.Role == OrgRole.Admin).OrderBy(m => m.JoinedAt).Select(m => (Guid?)m.UserId).FirstOrDefaultAsync()
                    ?? throw AppException.Conflict("The organization has no Admin to address the invoice to.", "org_has_no_admin");
        var total = Money.Round(qty * input.UnitPrice, currency);
        var now = DateTime.UtcNow;
        var order = new Order
        {
            UserId = buyer, Status = OrderStatus.Pending, Total = total, Currency = currency, IdempotencyKey = "enterprise-" + Guid.NewGuid().ToString("N"), CreatedAt = now,
        };
        db.Orders.Add(order);
        var detail = new OrderDetail
        {
            OrderId = order.Id, Kind = "EnterpriseSeats", Fingerprint = $"enterprise-seats:{org.Id}:{qty}:{input.UnitPrice}:{currency}",
            ListAmount = total, PriceSource = "Base", BillingName = org.Name.Length > 200 ? org.Name[..200] : org.Name,
        };
        db.Set<OrderDetail>().Add(detail);
        await db.SaveChangesAsync();
        var invoice = await invoices.IssueInvoice(order, detail,
        [
            new InvoiceLine($"{qty} enterprise seat{(qty == 1 ? "" : "s")} for {org.Name} @ {input.UnitPrice} {currency}", total),
            new InvoiceLine($"{PaymentInstructions}. Quote the invoice number as the payment reference.", 0m),
        ], now);
        var eo = new EnterpriseOrder
        {
            OrganizationId = org.Id, SeatRequestId = request?.Id, OrderId = order.Id, InvoiceId = invoice.Id, Quantity = qty, UnitPrice = input.UnitPrice,
            Currency = currency, Total = total, CreatedBy = staff, CreatedAt = now,
        };
        db.Set<EnterpriseOrder>().Add(eo);
        if (request is not null) { request.Status = SeatRequestStatus.Invoiced; request.DecidedBy = staff; request.DecidedAt = now; }
        audit.Record("enterprise.order.created", nameof(Organization), org.Id,
            new { enterpriseOrderId = eo.Id, orderId = order.Id, invoice = invoice.Number, qty, input.UnitPrice, currency, total, seatRequestId = request?.Id });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return (await OrderDtos(db.Set<EnterpriseOrder>().Where(o => o.Id == eo.Id))).Single();
    }

    /// <summary>Staff confirm the bank transfer: order → Paid and the organization's seat limit grows by the quantity.</summary>
    public async Task<EnterpriseOrderDto> MarkPaid(Guid id, MarkPaidInput input)
    {
        var reference = (input.PaymentReference ?? "").Trim();
        if (reference.Length is < 3 or > 200) throw AppException.Bad("Payment reference must be 3-200 characters.", "invalid_reference");
        var found = await db.Set<EnterpriseOrder>().AsNoTracking().FirstOrDefaultAsync(o => o.Id == id) ?? throw AppException.NotFound("Enterprise order");
        await using var tx = await db.Database.BeginTransactionAsync();
        await LockOrg(found.OrganizationId);
        var eo = await db.Set<EnterpriseOrder>().FirstAsync(o => o.Id == id);
        if (eo.Status != EnterpriseOrderStatus.AwaitingPayment) throw AppException.Conflict($"Enterprise order is already {eo.Status}.", "order_not_awaiting_payment");
        var org = await db.Organizations.FirstAsync(o => o.Id == eo.OrganizationId);
        if (org.SeatLimit + eo.Quantity > EnterpriseService.MaxSeatLimit) throw AppException.Conflict("The seat limit would exceed the platform maximum.", "seat_limit_exceeded");
        var now = DateTime.UtcNow;
        eo.SeatLimitBefore = org.SeatLimit;
        org.SeatLimit += eo.Quantity;
        eo.SeatLimitAfter = org.SeatLimit;
        eo.Status = EnterpriseOrderStatus.Paid; eo.PaidAt = now; eo.PaidMarkedBy = me.RequireId(); eo.PaymentReference = reference;
        var order = await db.Orders.FirstAsync(o => o.Id == eo.OrderId);
        order.Status = OrderStatus.Paid; order.PaidAt = now;
        if (eo.SeatRequestId is { } rid)
            await db.Set<SeatRequest>().Where(r => r.Id == rid).ExecuteUpdateAsync(s => s.SetProperty(r => r.Status, SeatRequestStatus.Paid));
        audit.Record("enterprise.order.paid", nameof(Organization), org.Id,
            new { enterpriseOrderId = eo.Id, eo.OrderId, reference, seatLimitBefore = eo.SeatLimitBefore, seatLimitAfter = eo.SeatLimitAfter });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return (await OrderDtos(db.Set<EnterpriseOrder>().Where(o => o.Id == eo.Id))).Single();
    }

    private async Task<SeatRequestDto> SeatRequestDto(SeatRequest r)
    {
        var name = await db.Organizations.Where(o => o.Id == r.OrganizationId).Select(o => o.Name).FirstOrDefaultAsync() ?? "";
        var orderId = await db.Set<EnterpriseOrder>().Where(o => o.SeatRequestId == r.Id).Select(o => (Guid?)o.Id).FirstOrDefaultAsync();
        return new SeatRequestDto(r.Id, r.OrganizationId, name, r.Quantity, r.Note, r.RequestedBy, r.Status.ToString(), r.CreatedAt, r.DecisionNote, orderId);
    }

    private async Task<List<EnterpriseOrderDto>> OrderDtos(IQueryable<EnterpriseOrder> q)
    {
        var rows = await (from o in q.AsNoTracking()
                          join org in db.Organizations on o.OrganizationId equals org.Id
                          join i in db.Set<Invoice>() on o.InvoiceId equals i.Id
                          orderby o.CreatedAt descending
                          select new { o, org.Name, i.Number }).Take(500).ToListAsync();
        return rows.Select(x => new EnterpriseOrderDto(x.o.Id, x.o.OrganizationId, x.Name, x.o.SeatRequestId, x.o.OrderId, x.o.InvoiceId, x.Number,
            x.o.Quantity, x.o.UnitPrice, x.o.Currency, x.o.Total, x.o.Status.ToString(), PaymentInstructions, x.o.CreatedAt, x.o.PaidAt,
            x.o.PaymentReference, x.o.SeatLimitBefore, x.o.SeatLimitAfter)).ToList();
    }

    // ================= helpers =================

    internal static void RequireAdmin(OrgRole? role, string msg)
    {
        if (role is null or OrgRole.Admin) return;
        throw AppException.Forbidden(msg);
    }

    private static string Department(string d)
    {
        var v = d.Trim();
        if (v.Length > 100) throw AppException.Bad("Department must be at most 100 characters.", "invalid_department");
        return v;
    }

    private Task LockOrg(Guid id) =>
        db.Database.ExecuteSqlInterpolatedAsync($"SELECT `Id` FROM `Organizations` WHERE `Id` = {id.ToString()} FOR UPDATE");

    private async Task<Organization> LockActiveOrg(Guid id)
    {
        await LockOrg(id);
        var org = await db.Organizations.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id) ?? throw AppException.NotFound("Organization");
        if (!org.IsActive) throw AppException.Conflict("Organization is deactivated.", "org_inactive");
        return org;
    }
}
