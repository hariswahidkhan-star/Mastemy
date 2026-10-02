using Mastemy.Api.Data;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Authoring;

public record AgreementDto(Guid Id, string Version, string Title, string Body, DateTime PublishedAt);
public record MyAgreementDto(AgreementDto? Current, bool Required, bool Accepted, DateTime? AcceptedAt);
public record CreateAgreementRequest(string Version, string Title, string Body);
public record AcceptAgreementRequest(string Version);

/// <summary>
/// Instructor content agreement. The current version is <c>Authoring:RequiredAgreementVersion</c> when configured, otherwise
/// the most recently published version. When a current version exists, an instructor must have accepted it before submitting
/// a course for review. With no agreement published at all there is nothing to accept and submission is not blocked.
/// </summary>
public class AgreementService(AppDbContext db, ICurrentUser me, AuditService audit, IConfiguration cfg)
{
    public async Task<AgreementVersion?> Current()
    {
        var pinned = cfg["Authoring:RequiredAgreementVersion"];
        if (!string.IsNullOrWhiteSpace(pinned))
            return await db.Set<AgreementVersion>().AsNoTracking().FirstOrDefaultAsync(a => a.Version == pinned.Trim())
                   ?? throw new AppException(503, $"Configured agreement version '{pinned}' does not exist.", "agreement_misconfigured");
        return await db.Set<AgreementVersion>().AsNoTracking().OrderByDescending(a => a.PublishedAt).ThenByDescending(a => a.Version)
            .FirstOrDefaultAsync();
    }

    public async Task<MyAgreementDto> Mine()
    {
        var uid = me.RequireId();
        var cur = await Current();
        if (cur is null) return new MyAgreementDto(null, false, false, null);
        var acc = await db.Set<AgreementAcceptance>().AsNoTracking().FirstOrDefaultAsync(a => a.AgreementVersionId == cur.Id && a.UserId == uid);
        return new MyAgreementDto(ToDto(cur), true, acc is not null, acc?.AcceptedAt);
    }

    public async Task<MyAgreementDto> Accept(AcceptAgreementRequest req)
    {
        var uid = me.RequireId();
        var cur = await Current() ?? throw AppException.NotFound("Agreement");
        if (!string.Equals((req.Version ?? "").Trim(), cur.Version, StringComparison.Ordinal))
            throw AppException.Conflict("Only the current agreement version can be accepted.", "agreement_version_mismatch");
        if (!await db.Set<AgreementAcceptance>().AnyAsync(a => a.AgreementVersionId == cur.Id && a.UserId == uid))
        {
            db.Set<AgreementAcceptance>().Add(new AgreementAcceptance { AgreementVersionId = cur.Id, UserId = uid });
            audit.Record("agreement.accepted", nameof(AgreementVersion), cur.Id, new { cur.Version });
            try { await db.SaveChangesAsync(); }
            catch (DbUpdateException) { db.ChangeTracker.Clear(); } // concurrent double-accept: the other insert won
        }
        return await Mine();
    }

    /// <summary>Throws 409 <c>agreement_required</c> when the caller (non-staff) has not accepted the current agreement.</summary>
    public async Task RequireAccepted()
    {
        var uid = me.RequireId();
        if (me.IsStaff) return;
        var cur = await Current();
        if (cur is null) return;
        if (!await db.Set<AgreementAcceptance>().AnyAsync(a => a.AgreementVersionId == cur.Id && a.UserId == uid))
            throw AppException.Conflict($"Accept the instructor agreement (version {cur.Version}) before submitting a course.", "agreement_required");
    }

    // ---------- staff ----------
    public Task<List<AgreementDto>> List() =>
        db.Set<AgreementVersion>().AsNoTracking().OrderByDescending(a => a.PublishedAt)
            .Select(a => new AgreementDto(a.Id, a.Version, a.Title, a.Body, a.PublishedAt)).ToListAsync();

    public async Task<AgreementDto> Create(CreateAgreementRequest req)
    {
        var uid = me.RequireId();
        var version = (req.Version ?? "").Trim();
        if (version.Length is 0 or > 64) throw AppException.Bad("version is required (max 64 characters).");
        var title = (req.Title ?? "").Trim();
        if (title.Length is 0 or > 200) throw AppException.Bad("title is required (max 200 characters).");
        var body = (req.Body ?? "").Trim();
        if (body.Length is 0 or > 200_000) throw AppException.Bad("body is required (max 200000 characters).");
        if (await db.Set<AgreementVersion>().AnyAsync(a => a.Version == version))
            throw AppException.Conflict("That agreement version already exists; versions are immutable.", "agreement_exists");
        var a = new AgreementVersion { Version = version, Title = title, Body = body, CreatedBy = uid };
        db.Set<AgreementVersion>().Add(a);
        audit.Record("agreement.published", nameof(AgreementVersion), a.Id, new { version, title });
        await db.SaveChangesAsync();
        return ToDto(a);
    }

    private static AgreementDto ToDto(AgreementVersion a) => new(a.Id, a.Version, a.Title, a.Body, a.PublishedAt);
}
