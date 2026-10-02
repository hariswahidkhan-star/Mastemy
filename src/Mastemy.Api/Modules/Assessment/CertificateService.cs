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
public class CertificateService(AppDbContext db, ICurrentUser me, AuditService audit, IConfiguration cfg)
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
        var c = await db.Certificates.AsNoTracking().FirstOrDefaultAsync(x => x.Code == normalized) ?? throw AppException.NotFound("Certificate");
        var isOwner = me.Id is { } uid && uid == c.UserId;
        if (!isOwner && !c.PubliclyVisible) throw AppException.NotFound("Certificate");
        if (c.Status == CertificateStatus.Revoked) throw new AppException(410, "This certificate has been revoked.", "certificate_revoked");
        return (CertificatePdf.Render(c, VerificationUrl(c.Code)), c.Code);
    }

    /// <summary>Learner controls whether their certificate is publicly verifiable/downloadable.</summary>
    public async Task<MyCertificateDto> SetVisibility(Guid id, bool publiclyVisible)
    {
        var uid = me.RequireId();
        var c = await db.Certificates.FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid) ?? throw AppException.NotFound("Certificate");
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
        if (c is null || !c.PubliclyVisible) throw AppException.NotFound("Certificate");
        return new CertificateVerification(c.Code, c.RecipientName, c.CourseTitle, c.IssuedAt, c.Status, c.AssessmentCriteria);
    }

    public async Task<List<MyCertificateDto>> Mine()
    {
        var uid = me.RequireId();
        return await db.Certificates.AsNoTracking().Where(c => c.UserId == uid).OrderByDescending(c => c.IssuedAt)
            .Select(c => new MyCertificateDto(c.Id, c.Code, c.CourseId, c.CourseTitle, c.RecipientName, c.IssuedAt, c.Status,
                c.ScorePercent, c.AssessmentCriteria, c.PubliclyVisible))
            .ToListAsync();
    }

    public async Task Revoke(Guid id, string? reason)
    {
        me.RequireId();
        if (!me.IsStaff) throw AppException.Forbidden();
        if (string.IsNullOrWhiteSpace(reason) || reason.Length > 500) throw AppException.Bad("reason is required (max 500 characters).");
        var c = await db.Certificates.FirstOrDefaultAsync(x => x.Id == id) ?? throw AppException.NotFound("Certificate");
        if (c.Status == CertificateStatus.Revoked) throw AppException.Conflict("Certificate is already revoked.", "already_revoked");
        c.Status = CertificateStatus.Revoked;
        c.RevocationReason = reason.Trim();
        audit.Record("certificate.revoked", "Certificate", c.Id, new { c.Code, c.UserId, c.CourseId, reason = c.RevocationReason });
        await db.SaveChangesAsync();
    }
}
