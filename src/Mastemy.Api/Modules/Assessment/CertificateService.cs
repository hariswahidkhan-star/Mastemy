using System.Security.Cryptography;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;
using AssessmentEntity = Mastemy.Api.Domain.Assessment;

namespace Mastemy.Api.Modules.Assessment;

/// <summary>
/// Course certificates are issued only on assessed evidence (a passed, server-scored MCQ assessment that counts toward
/// the certificate) — never for watching videos. Issuance is idempotent per (user, course).
/// </summary>
public class CertificateService(AppDbContext db, ICurrentUser me, AuditService audit, IConfiguration cfg,
    Mastemy.Api.Modules.Engagement.INotificationService notifications, Resources.IResourceStorage storage, CompletionAwardService completion)
{
    /// <summary>Unambiguous alphabet: no 0/O, 1/I/L.</summary>
    public const string Alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    public const int CodeLength = 12;

    public static string NewCode()
    {
        Span<char> c = stackalloc char[CodeLength];
        for (var i = 0; i < CodeLength; i++) c[i] = Alphabet[RandomNumberGenerator.GetInt32(Alphabet.Length)];
        return new string(c);
    }

    public static string Criteria(AssessmentEntity a, int questionCount, decimal score) =>
        $"Passed the {a.Kind} assessment \"{a.Title}\" ({a.Mode} mode) with a score of {score:0.##}% against a pass threshold of {a.PassPercent:0.##}%, " +
        $"based on {questionCount} server-scored multiple-choice questions (multiple-select scoring: {a.MultiSelectScoring}). " +
        "Certifies assessed knowledge only; video viewing and course completion are not assessed.";

    /// <summary>Issues a certificate for a passed attempt if the assessment counts toward one. Returns the user's certificate code, if any.</summary>
    public async Task<string?> IssueIfEligible(Attempt attempt, AssessmentEntity assessment)
    {
        if (attempt.Passed != true || !assessment.CountsTowardCertificate || attempt.Status == AttemptStatus.InProgress) return await ExistingCode(attempt.UserId, assessment.CourseId);
        var existing = await ExistingCode(attempt.UserId, assessment.CourseId);
        if (existing is not null) return existing;
        var user = await db.Users.AsNoTracking().FirstAsync(u => u.Id == attempt.UserId);
        var course = await db.Courses.AsNoTracking().FirstAsync(c => c.Id == assessment.CourseId);
        for (var tries = 0; tries < 5; tries++)
        {
            var cert = new Certificate
            {
                Code = NewCode(), UserId = attempt.UserId, CourseId = course.Id, AttemptId = attempt.Id,
                RecipientName = user.DisplayName, CourseTitle = course.Title, ScorePercent = attempt.ScorePercent ?? 0,
                AssessmentCriteria = Criteria(assessment, attempt.PointsPossible ?? 0, attempt.ScorePercent ?? 0),
                Status = CertificateStatus.Valid, PubliclyVisible = true, IssuedAt = DateTime.UtcNow,
            };
            db.Certificates.Add(cert);
            audit.Record("certificate.issued", "Certificate", cert.Id, new { cert.UserId, cert.CourseId, cert.AttemptId, cert.ScorePercent });
            try
            {
                await db.SaveChangesAsync();
                await notifications.Publish([cert.UserId], "certificate", $"Certificate issued: {cert.CourseTitle}", $"/verify/{cert.Code}");
                return cert.Code;
            }
            catch (DbUpdateException)
            {
                db.ChangeTracker.Clear();
                // Either a concurrent issuance for the same (user, course) won, or (very unlikely) a code collision.
                existing = await ExistingCode(attempt.UserId, assessment.CourseId);
                if (existing is not null) return existing;
            }
        }
        throw new InvalidOperationException("Could not allocate a unique certificate code.");
    }

    private Task<string?> ExistingCode(Guid userId, Guid courseId) =>
        db.Certificates.AsNoTracking().Where(c => c.UserId == userId && c.CourseId == courseId).Select(c => c.Code).FirstOrDefaultAsync();

    private static string NormalizeCode(string? code)
    {
        var normalized = (code ?? "").Trim().ToUpperInvariant();
        if (normalized.Length != CodeLength || normalized.Any(ch => !Alphabet.Contains(ch))) throw AppException.NotFound("Certificate");
        return normalized;
    }

    /// <summary>Public verification link for a code (Certificates:VerifyBaseUrl, e.g. https://mastemy.example/verify).</summary>
    public string VerificationUrl(string code)
    {
        var baseUrl = cfg["Certificates:VerifyBaseUrl"];
        if (string.IsNullOrWhiteSpace(baseUrl)) baseUrl = "/verify";
        return baseUrl.TrimEnd('/') + "/" + Uri.EscapeDataString(code);
    }

    /// <summary>
    /// PDF of a certificate: available to its owner, or to anyone while publicly visible. Revoked certificates are gone (410);
    /// hidden ones are indistinguishable from unknown codes (404) for non-owners.
    /// </summary>
    public async Task<(byte[] Pdf, string Code)> Pdf(string code)
    {
        var normalized = NormalizeCode(code);
        var c = await db.Certificates.AsNoTracking().FirstOrDefaultAsync(x => x.Code == normalized);
        if (c is null)
        {
            var aw = await db.Set<CompletionAward>().AsNoTracking().FirstOrDefaultAsync(x => x.Code == normalized) ?? throw AppException.NotFound("Certificate");
            var owner = me.Id is { } u && u == aw.UserId;
            if (!owner && !aw.PubliclyVisible) throw AppException.NotFound("Certificate");
            if (aw.Status == CertificateStatus.Revoked) throw new AppException(410, "This completion award has been revoked.", "certificate_revoked");
            return (CertificatePdf.RenderCompletion(aw, VerificationUrl(aw.Code), await Design(aw.CourseId)), aw.Code);
        }
        var isOwner = me.Id is { } uid && uid == c.UserId;
        if (!isOwner && !c.PubliclyVisible) throw AppException.NotFound("Certificate");
        if (c.Status == CertificateStatus.Revoked) throw new AppException(410, "This certificate has been revoked.", "certificate_revoked");
        return (CertificatePdf.Render(c, VerificationUrl(c.Code), await Design(c.CourseId)), c.Code);
    }

    /// <summary>The course's selected certificate template (if any), with its logo bytes when the logo file is available.</summary>
    private async Task<CertificateDesign?> Design(Guid courseId)
    {
        var t = await db.Set<CourseCertificateSetting>().AsNoTracking().Where(s => s.CourseId == courseId)
            .Join(db.Set<CertificateTemplate>(), s => s.TemplateId, t => t.Id, (s, t) => t).FirstOrDefaultAsync();
        return t is null ? null : await DesignOf(t);
    }

    private async Task<CertificateDesign> DesignOf(CertificateTemplate t)
    {
        byte[]? logo = null;
        if (t.LogoResourceId is { } lid && await db.ResourceFiles.AsNoTracking().FirstOrDefaultAsync(r => r.Id == lid && r.DeletedAt == null) is { } file
            && file.SizeBytes <= 2 * 1024 * 1024 && storage.Exists(file.StorageKey))
        {
            await using var s = storage.OpenRead(file.StorageKey);
            using var ms = new MemoryStream();
            await s.CopyToAsync(ms);
            logo = ms.ToArray();
        }
        return new CertificateDesign(t.TitleText, t.PrimaryColor, t.AccentColor, t.SignatureName, t.SignatureTitle, logo);
    }

    /// <summary>
    /// Staff preview of a certificate template: a sample certificate (sample learner and course, code "SAMPLE-PREVIEW")
    /// rendered with that template. Nothing is stored and the code does not verify.
    /// </summary>
    public async Task<byte[]> PreviewTemplate(Guid templateId)
    {
        me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        var t = await db.Set<CertificateTemplate>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == templateId)
                ?? throw AppException.NotFound("Certificate template");
        var sample = new Certificate
        {
            Code = "SAMPLE-PREVIEW", RecipientName = "Sample Learner", CourseTitle = "Sample Course: Foundations",
            AssessmentCriteria = "Final exam, pass mark 70%", ScorePercent = 86m, IssuedAt = DateTime.UtcNow,
        };
        return CertificatePdf.Render(sample, VerificationUrl(sample.Code), await DesignOf(t));
    }

    /// <summary>Learner controls whether their certificate is publicly verifiable/downloadable.</summary>
    public async Task<MyCertificateDto> SetVisibility(Guid id, bool publiclyVisible)
    {
        var uid = me.RequireId();
        var c = await db.Certificates.FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid);
        if (c is null)
        {
            var aw = await db.Set<CompletionAward>().FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid) ?? throw AppException.NotFound("Certificate");
            if (aw.PubliclyVisible != publiclyVisible)
            {
                aw.PubliclyVisible = publiclyVisible;
                audit.Record("completion_award.visibility_changed", "CompletionAward", aw.Id, new { aw.Code, publiclyVisible });
                await db.SaveChangesAsync();
            }
            return AwardDto(aw);
        }
        if (c.PubliclyVisible != publiclyVisible)
        {
            c.PubliclyVisible = publiclyVisible;
            audit.Record("certificate.visibility_changed", "Certificate", c.Id, new { c.Code, publiclyVisible });
            await db.SaveChangesAsync();
        }
        return new MyCertificateDto(c.Id, c.Code, c.CourseId, c.CourseTitle, c.RecipientName, c.IssuedAt, c.Status, c.ScorePercent,
            c.AssessmentCriteria, c.PubliclyVisible);
    }

    public async Task<CertificateVerification> Verify(string code)
    {
        var normalized = NormalizeCode(code);
        var c = await db.Certificates.AsNoTracking().FirstOrDefaultAsync(x => x.Code == normalized);
        if (c is null)
        {
            var aw = await db.Set<CompletionAward>().AsNoTracking().FirstOrDefaultAsync(x => x.Code == normalized);
            if (aw is null || !aw.PubliclyVisible) throw AppException.NotFound("Certificate");
            return new CertificateVerification(aw.Code, aw.RecipientName, aw.CourseTitle, aw.IssuedAt, aw.Status,
                CompletionAwardService.Criteria(aw.LessonCount, aw.SnapshotVersion), CredentialKinds.Completion, CredentialKinds.CompletionTitle,
                CredentialKinds.CompletionVerificationLabel);
        }
        if (!c.PubliclyVisible) throw AppException.NotFound("Certificate");
        return new CertificateVerification(c.Code, c.RecipientName, c.CourseTitle, c.IssuedAt, c.Status, c.AssessmentCriteria);
    }

    public async Task<List<MyCertificateDto>> Mine()
    {
        var uid = me.RequireId();
        await completion.Sweep(uid); // completion awards are issued as soon as the learner looks for them after finishing
        var certs = await db.Certificates.AsNoTracking().Where(c => c.UserId == uid)
            .Select(c => new MyCertificateDto(c.Id, c.Code, c.CourseId, c.CourseTitle, c.RecipientName, c.IssuedAt, c.Status,
                c.ScorePercent, c.AssessmentCriteria, c.PubliclyVisible, CredentialKinds.AssessedKnowledge, CredentialKinds.AssessedTitle))
            .ToListAsync();
        var awards = await db.Set<CompletionAward>().AsNoTracking().Where(a => a.UserId == uid).ToListAsync();
        return certs.Concat(awards.Select(AwardDto)).OrderByDescending(c => c.IssuedAt).ToList();
    }

    private static MyCertificateDto AwardDto(CompletionAward a) => new(a.Id, a.Code, a.CourseId, a.CourseTitle, a.RecipientName, a.IssuedAt,
        a.Status, 0m, CompletionAwardService.Criteria(a.LessonCount, a.SnapshotVersion), a.PubliclyVisible, CredentialKinds.Completion,
        CredentialKinds.CompletionTitle);

    /// <summary>
    /// LinkedIn "Add to profile" (certification) link. The name says which kind of credential it is, so a completion award is
    /// never presented as an assessed certificate. Requires a valid, publicly visible credential and an absolute
    /// Certificates:VerifyBaseUrl (otherwise 503 — LinkedIn needs a public verification URL).
    /// </summary>
    public async Task<CertificateShareDto> Share(Guid id)
    {
        var uid = me.RequireId();
        string kind, code, courseTitle; DateTime issued; CertificateStatus status; bool visible;
        if (await db.Certificates.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid) is { } c)
        { kind = CredentialKinds.AssessedKnowledge; code = c.Code; courseTitle = c.CourseTitle; issued = c.IssuedAt; status = c.Status; visible = c.PubliclyVisible; }
        else if (await db.Set<CompletionAward>().AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid) is { } a)
        { kind = CredentialKinds.Completion; code = a.Code; courseTitle = a.CourseTitle; issued = a.IssuedAt; status = a.Status; visible = a.PubliclyVisible; }
        else throw AppException.NotFound("Certificate");
        if (status == CertificateStatus.Revoked) throw new AppException(410, "This credential has been revoked.", "certificate_revoked");
        if (!visible) throw AppException.Conflict("Make the credential publicly verifiable before sharing it.", "certificate_not_public");
        var verify = VerificationUrl(code);
        if (!Uri.TryCreate(verify, UriKind.Absolute, out var vu) || (vu.Scheme != Uri.UriSchemeHttps && vu.Scheme != Uri.UriSchemeHttp))
            throw new AppException(503, "Public certificate verification URL is not configured (Certificates:VerifyBaseUrl).", "verify_url_not_configured");
        var name = kind == CredentialKinds.Completion
            ? $"Certificate of Completion: {courseTitle} (lesson completion, not assessed)"
            : $"Certificate of Assessed Knowledge: {courseTitle}";
        var url = "https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME" +
                  "&name=" + Uri.EscapeDataString(name) +
                  "&organizationName=" + Uri.EscapeDataString("Mastemy") +
                  "&issueYear=" + issued.Year + "&issueMonth=" + issued.Month +
                  "&certUrl=" + Uri.EscapeDataString(verify) +
                  "&certId=" + Uri.EscapeDataString(code);
        return new CertificateShareDto(id, kind, name, url, verify);
    }

    public async Task Revoke(Guid id, string? reason)
    {
        me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        if (string.IsNullOrWhiteSpace(reason) || reason.Length > 500) throw AppException.Bad("reason is required (max 500 characters).");
        var c = await db.Certificates.FirstOrDefaultAsync(x => x.Id == id);
        if (c is null)
        {
            var aw = await db.Set<CompletionAward>().FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Certificate");
            if (aw.Status == CertificateStatus.Revoked) throw AppException.Conflict("Completion award is already revoked.", "already_revoked");
            aw.Status = CertificateStatus.Revoked; aw.RevocationReason = reason.Trim();
            audit.Record("completion_award.revoked", "CompletionAward", aw.Id, new { aw.Code, aw.UserId, aw.CourseId, reason = aw.RevocationReason });
            await db.SaveChangesAsync();
            return;
        }
        if (c.Status == CertificateStatus.Revoked) throw AppException.Conflict("Certificate is already revoked.", "already_revoked");
        c.Status = CertificateStatus.Revoked;
        c.RevocationReason = reason.Trim();
        audit.Record("certificate.revoked", "Certificate", c.Id, new { c.Code, c.UserId, c.CourseId, reason = c.RevocationReason });
        await db.SaveChangesAsync();
    }
}
