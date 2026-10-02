using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Questions;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Assessment;

public record CertificateTemplateInput(string Name, string TitleText, string PrimaryColor, string AccentColor, Guid? LogoResourceId,
    string SignatureName, string SignatureTitle);
public record CertificateTemplateDto(Guid Id, string Name, string TitleText, string PrimaryColor, string AccentColor, Guid? LogoResourceId,
    string SignatureName, string SignatureTitle, bool Archived, DateTime CreatedAt, DateTime UpdatedAt);
public record CourseTemplateInput(Guid? TemplateId);
public record CourseTemplateDto(Guid CourseId, Guid? TemplateId);
public record CorrectionInput(string RequestedName, string Reason);
public record AppealInput(string Reason);
public record RequestDecisionInput(bool Approve, string Note);
public record CorrectionDto(Guid Id, Guid CertificateId, string CertificateCode, Guid UserId, string CurrentName, string RequestedName, string Reason,
    CertificateRequestStatus Status, Guid? DecidedBy, DateTime? DecidedAt, string? DecisionNote, DateTime CreatedAt);
public record AppealDto(Guid Id, Guid CertificateId, string CertificateCode, Guid UserId, string Reason, string? RevocationReason,
    CertificateRequestStatus Status, Guid? DecidedBy, DateTime? DecidedAt, string? DecisionNote, DateTime CreatedAt);

/// <summary>
/// Certificate designs, name corrections and revocation appeals (spec §17).
/// Templates are staff-managed and selected per course by its editors or staff. A name correction, once approved by staff,
/// re-issues the certificate under the same code with the corrected name (the original issue date is kept; the change is
/// audited). A learner may appeal a revocation; staff either uphold it or reinstate the certificate.
/// </summary>
public partial class CertificateWorkflowService(AppDbContext db, ICurrentUser me, AuditService audit, AccessService access,
    Engagement.INotificationService notifications)
{
    [GeneratedRegex("^#[0-9A-Fa-f]{6}$")] private static partial Regex ColorRx();
    private static readonly string[] LogoTypes = ["image/png", "image/jpeg"];

    // ---------------- Templates ----------------

    public async Task<List<CertificateTemplateDto>> Templates(bool includeArchived)
    {
        me.RequireId();
        // Course editors pick from the list; only staff manage it.
        if (!me.IsStaff && !me.IsInRole(Roles.Instructor)) throw AppException.Forbidden();
        var q = db.Set<CertificateTemplate>().AsNoTracking().AsQueryable();
        if (!includeArchived || !me.IsStaff) q = q.Where(t => !t.Archived);
        return (await q.OrderBy(t => t.Name).ToListAsync()).Select(Dto).ToList();
    }

    public async Task<CertificateTemplateDto> CreateTemplate(CertificateTemplateInput input)
    {
        var uid = RequireStaff();
        await ValidateTemplate(input);
        var t = new CertificateTemplate { CreatedBy = uid };
        Apply(t, input);
        db.Set<CertificateTemplate>().Add(t);
        audit.Record("certificate_template.created", "CertificateTemplate", t.Id, new { t.Name });
        await db.SaveChangesAsync();
        return Dto(t);
    }

    public async Task<CertificateTemplateDto> UpdateTemplate(Guid id, CertificateTemplateInput input)
    {
        RequireStaff();
        var t = await db.Set<CertificateTemplate>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Certificate template");
        await ValidateTemplate(input);
        Apply(t, input);
        t.UpdatedAt = DateTime.UtcNow;
        audit.Record("certificate_template.updated", "CertificateTemplate", t.Id, new { t.Name });
        await db.SaveChangesAsync();
        return Dto(t);
    }

    /// <summary>Templates are archived, never deleted, because issued certificates keep rendering with them.</summary>
    public async Task ArchiveTemplate(Guid id)
    {
        RequireStaff();
        var t = await db.Set<CertificateTemplate>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Certificate template");
        if (t.Archived) return;
        t.Archived = true; t.UpdatedAt = DateTime.UtcNow;
        audit.Record("certificate_template.archived", "CertificateTemplate", t.Id, new { t.Name });
        await db.SaveChangesAsync();
    }

    public async Task<CourseTemplateDto> SetCourseTemplate(Guid courseId, CourseTemplateInput input)
    {
        var uid = me.RequireId();
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseEditor(courseId);
        var set = db.Set<CourseCertificateSetting>();
        var current = await set.FirstOrDefaultAsync(x => x.CourseId == courseId);
        if (input?.TemplateId is not { } tid)
        {
            if (current is not null) set.Remove(current);
        }
        else
        {
            if (!await db.Set<CertificateTemplate>().AnyAsync(t => t.Id == tid && !t.Archived)) throw AppException.NotFound("Certificate template");
            if (current is null) { current = new CourseCertificateSetting { CourseId = courseId }; set.Add(current); }
            current.TemplateId = tid; current.UpdatedBy = uid; current.UpdatedAt = DateTime.UtcNow;
        }
        audit.Record("course.certificate_template_set", "Course", courseId, new { templateId = input?.TemplateId });
        await db.SaveChangesAsync();
        return new CourseTemplateDto(courseId, input?.TemplateId);
    }

    public async Task<CourseTemplateDto> GetCourseTemplate(Guid courseId)
    {
        await access.RequireCourseAuthorOrStaff(courseId);
        var s = await db.Set<CourseCertificateSetting>().AsNoTracking().FirstOrDefaultAsync(x => x.CourseId == courseId);
        return new CourseTemplateDto(courseId, s?.TemplateId);
    }

    private async Task ValidateTemplate(CertificateTemplateInput? i)
    {
        if (i is null) throw AppException.Bad("Request body is required.");
        var e = new List<string>();
        void Line(string name, string? v, int max, bool required)
        {
            if (string.IsNullOrWhiteSpace(v)) { if (required) e.Add($"{name} is required."); return; }
            if (v.Length > max || QuestionRules.HasBadSingleLine(v)) e.Add($"{name} must be a single line of at most {max} characters.");
        }
        Line("name", i.Name, 100, true);
        Line("titleText", i.TitleText, 120, true);
        Line("signatureName", i.SignatureName, 100, false);
        Line("signatureTitle", i.SignatureTitle, 100, false);
        if (i.PrimaryColor is null || !ColorRx().IsMatch(i.PrimaryColor)) e.Add("primaryColor must be a hex colour like #1F2937.");
        if (i.AccentColor is null || !ColorRx().IsMatch(i.AccentColor)) e.Add("accentColor must be a hex colour like #1D4ED8.");
        if (i.LogoResourceId is { } lid && !await db.ResourceFiles.AnyAsync(r => r.Id == lid && r.DeletedAt == null && !r.IsPremium && LogoTypes.Contains(r.ContentType)))
            e.Add("logoResourceId must be a non-premium PNG or JPEG resource file.");
        if (e.Count > 0) throw AppException.Bad(string.Join(" ", e), "validation_failed");
    }

    private static void Apply(CertificateTemplate t, CertificateTemplateInput i)
    {
        t.Name = i.Name.Trim(); t.TitleText = i.TitleText.Trim(); t.PrimaryColor = i.PrimaryColor.ToUpperInvariant(); t.AccentColor = i.AccentColor.ToUpperInvariant();
        t.LogoResourceId = i.LogoResourceId; t.SignatureName = i.SignatureName?.Trim() ?? ""; t.SignatureTitle = i.SignatureTitle?.Trim() ?? "";
    }

    private static CertificateTemplateDto Dto(CertificateTemplate t) => new(t.Id, t.Name, t.TitleText, t.PrimaryColor, t.AccentColor, t.LogoResourceId,
        t.SignatureName, t.SignatureTitle, t.Archived, t.CreatedAt, t.UpdatedAt);

    // ---------------- Name corrections ----------------

    public async Task<CorrectionDto> RequestCorrection(Guid certificateId, CorrectionInput input)
    {
        var uid = me.RequireId();
        var c = await db.Certificates.AsNoTracking().FirstOrDefaultAsync(x => x.Id == certificateId && x.UserId == uid) ?? throw AppException.NotFound("Certificate");
        if (c.Status != CertificateStatus.Valid) throw AppException.Conflict("Only valid certificates can be corrected.", "certificate_revoked");
        var name = input?.RequestedName?.Trim();
        if (string.IsNullOrEmpty(name) || name.Length is < 2 or > 100 || QuestionRules.HasBadSingleLine(name)) throw AppException.Bad("requestedName must be 2-100 characters on one line.");
        if (name == c.RecipientName) throw AppException.Bad("requestedName is the same as the current name.", "name_unchanged");
        var reason = input!.Reason?.Trim();
        if (string.IsNullOrEmpty(reason) || reason.Length > 1000) throw AppException.Bad("reason is required (max 1000 characters).");
        if (await db.Set<CertificateCorrection>().AnyAsync(x => x.CertificateId == c.Id && x.Status == CertificateRequestStatus.Pending))
            throw AppException.Conflict("A correction request for this certificate is already pending.", "correction_pending");
        var r = new CertificateCorrection { CertificateId = c.Id, UserId = uid, CurrentName = c.RecipientName, RequestedName = name, Reason = reason };
        db.Set<CertificateCorrection>().Add(r);
        audit.Record("certificate.correction_requested", "Certificate", c.Id, new { correctionId = r.Id });
        await db.SaveChangesAsync();
        return CDto(r, c.Code);
    }

    public async Task<List<CorrectionDto>> Corrections(CertificateRequestStatus? status, bool mine)
    {
        var uid = me.RequireId();
        if (!mine && !me.IsStaff) throw AppException.Forbidden();
        var q = db.Set<CertificateCorrection>().AsNoTracking().AsQueryable();
        if (mine) q = q.Where(x => x.UserId == uid);
        if (status is not null) q = q.Where(x => x.Status == status);
        return await q.OrderBy(x => x.CreatedAt).Take(500).Join(db.Certificates, x => x.CertificateId, c => c.Id, (x, c) => new CorrectionDto(x.Id, x.CertificateId,
            c.Code, x.UserId, x.CurrentName, x.RequestedName, x.Reason, x.Status, x.DecidedBy, x.DecidedAt, x.DecisionNote, x.CreatedAt)).ToListAsync();
    }

    public async Task<CorrectionDto> DecideCorrection(Guid id, RequestDecisionInput input)
    {
        var uid = RequireStaff();
        var note = Note(input);
        var r = await db.Set<CertificateCorrection>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Correction request");
        if (r.Status != CertificateRequestStatus.Pending) throw AppException.Conflict("This request was already decided.", "request_decided");
        var c = await db.Certificates.FirstAsync(x => x.Id == r.CertificateId);
        r.Status = input.Approve ? CertificateRequestStatus.Approved : CertificateRequestStatus.Rejected;
        r.DecidedBy = uid; r.DecidedAt = DateTime.UtcNow; r.DecisionNote = note;
        if (input.Approve)
        {
            if (c.Status != CertificateStatus.Valid) throw AppException.Conflict("The certificate is no longer valid.", "certificate_revoked");
            var old = c.RecipientName;
            c.RecipientName = r.RequestedName; // same code; the PDF and verification page show the corrected name
            audit.Record("certificate.reissued_corrected_name", "Certificate", c.Id, new { c.Code, oldName = old, newName = r.RequestedName, correctionId = r.Id });
        }
        audit.Record("certificate.correction_decided", "CertificateCorrection", r.Id, new { decision = r.Status.ToString() });
        await db.SaveChangesAsync();
        await notifications.Publish([r.UserId], "certificate",
            input.Approve ? $"Your certificate for {c.CourseTitle} was re-issued with the corrected name" : $"Your name correction request for {c.CourseTitle} was declined",
            "/me/certificates");
        return CDto(r, c.Code);
    }

    // ---------------- Appeals ----------------

    public async Task<AppealDto> Appeal(Guid certificateId, AppealInput input)
    {
        var uid = me.RequireId();
        var c = await db.Certificates.AsNoTracking().FirstOrDefaultAsync(x => x.Id == certificateId && x.UserId == uid) ?? throw AppException.NotFound("Certificate");
        if (c.Status != CertificateStatus.Revoked) throw AppException.Conflict("Only revoked certificates can be appealed.", "certificate_not_revoked");
        var reason = input?.Reason?.Trim();
        if (string.IsNullOrEmpty(reason) || reason.Length is < 10 or > 2000) throw AppException.Bad("reason is required (10-2000 characters).");
        if (await db.Set<CertificateAppeal>().AnyAsync(x => x.CertificateId == c.Id && x.Status == CertificateRequestStatus.Pending))
            throw AppException.Conflict("An appeal for this certificate is already pending.", "appeal_pending");
        var a = new CertificateAppeal { CertificateId = c.Id, UserId = uid, Reason = reason };
        db.Set<CertificateAppeal>().Add(a);
        audit.Record("certificate.appealed", "Certificate", c.Id, new { appealId = a.Id });
        await db.SaveChangesAsync();
        return ADto(a, c);
    }

    public async Task<List<AppealDto>> Appeals(CertificateRequestStatus? status, bool mine)
    {
        var uid = me.RequireId();
        if (!mine && !me.IsStaff) throw AppException.Forbidden();
        var q = db.Set<CertificateAppeal>().AsNoTracking().AsQueryable();
        if (mine) q = q.Where(x => x.UserId == uid);
        if (status is not null) q = q.Where(x => x.Status == status);
        return await q.OrderBy(x => x.CreatedAt).Take(500).Join(db.Certificates, x => x.CertificateId, c => c.Id, (x, c) => new AppealDto(x.Id, x.CertificateId,
            c.Code, x.UserId, x.Reason, c.RevocationReason, x.Status, x.DecidedBy, x.DecidedAt, x.DecisionNote, x.CreatedAt)).ToListAsync();
    }

    /// <summary>Approve = reinstate the certificate; reject = the revocation stands.</summary>
    public async Task<AppealDto> DecideAppeal(Guid id, RequestDecisionInput input)
    {
        var uid = RequireStaff();
        var note = Note(input);
        var a = await db.Set<CertificateAppeal>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Appeal");
        if (a.Status != CertificateRequestStatus.Pending) throw AppException.Conflict("This appeal was already decided.", "request_decided");
        var c = await db.Certificates.FirstAsync(x => x.Id == a.CertificateId);
        a.Status = input.Approve ? CertificateRequestStatus.Approved : CertificateRequestStatus.Rejected;
        a.DecidedBy = uid; a.DecidedAt = DateTime.UtcNow; a.DecisionNote = note;
        if (input.Approve && c.Status == CertificateStatus.Revoked)
        {
            var reason = c.RevocationReason;
            c.Status = CertificateStatus.Valid; c.RevocationReason = null;
            audit.Record("certificate.reinstated", "Certificate", c.Id, new { c.Code, previousRevocationReason = reason, appealId = a.Id });
        }
        audit.Record("certificate.appeal_decided", "CertificateAppeal", a.Id, new { decision = a.Status.ToString() });
        await db.SaveChangesAsync();
        await notifications.Publish([a.UserId], "certificate",
            input.Approve ? $"Your appeal was upheld: the certificate for {c.CourseTitle} is reinstated" : $"Your appeal for the certificate for {c.CourseTitle} was declined",
            "/me/certificates");
        return ADto(a, c);
    }

    private Guid RequireStaff()
    {
        var uid = me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        return uid;
    }

    private static string Note(RequestDecisionInput? input)
    {
        var note = input?.Note?.Trim();
        if (string.IsNullOrEmpty(note) || note.Length > 1000) throw AppException.Bad("note is required (max 1000 characters).");
        return note;
    }

    private static CorrectionDto CDto(CertificateCorrection r, string code) => new(r.Id, r.CertificateId, code, r.UserId, r.CurrentName, r.RequestedName,
        r.Reason, r.Status, r.DecidedBy, r.DecidedAt, r.DecisionNote, r.CreatedAt);

    private static AppealDto ADto(CertificateAppeal a, Certificate c) => new(a.Id, a.CertificateId, c.Code, a.UserId, a.Reason, c.RevocationReason,
        a.Status, a.DecidedBy, a.DecidedAt, a.DecisionNote, a.CreatedAt);
}
