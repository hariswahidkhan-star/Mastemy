using System.Text.Json;
using System.Text.RegularExpressions;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Identity;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Account;

public record ProfileLink(string? Label, string? Url);
public record ProfileDto(Guid Id, string Email, string DisplayName, string Initials, string Headline, string Bio, string PreferredLanguage,
    string TimeZone, List<ProfileLink> Links, bool PublicInstructorProfile, bool EmailVerified, bool MfaEnabled, string[] Roles);
public record UpdateProfileRequest(string? DisplayName, string? Headline, string? Bio, string? PreferredLanguage, string? TimeZone,
    List<ProfileLink>? Links, bool? PublicInstructorProfile);
public record PublicInstructorProfileDto(Guid Id, string DisplayName, string Initials, string Headline, string Bio, List<ProfileLink> Links);
public record LearningGoalsDto(string Goals, List<string> SkillsOfInterest, string LearningLanguage, DateTime? UpdatedAt);
public record UpdateLearningGoalsRequest(string? Goals, List<string>? SkillsOfInterest, string? LearningLanguage);

public static class SkillEvidence
{
    public const string SelfDeclared = "self_declared", McqAssessed = "mcq_assessed", ExternalCredential = "external_credential";
    public const string SelfDeclaredLabel = "Self-declared by the learner";
    public const string McqLabel = "Assessed by multiple-choice questions on Mastemy (knowledge check; does not verify practical professional competence)";
    public const string ExternalLabel = "External credential reported by the learner — not verified by Mastemy";
    public const string Notice = "Mastemy does not verify skills. Multiple-choice results show knowledge on Mastemy assessments only and do not " +
                                 "certify practical professional competence; external credentials are as reported by the learner.";
}

public record SkillEvidenceDto(Guid? Id, string Name, string EvidenceType, string Label, bool Verified, string? Issuer,
    string? CredentialUrl, DateTime? ObtainedAt, int? AssessmentsPassed, decimal? BestScorePercent, DateTime? LastPassedAt);
public record SkillProfileDto(List<SkillEvidenceDto> Items, string Notice);
public record AddSkillRequest(string? Name, string? EvidenceType, string? Issuer, string? CredentialUrl, DateTime? ObtainedAt);
public record DeleteAccountRequest(string? Password, string? MfaCode, string? Confirm);

internal static partial class AccountRules
{
    public const int MaxLinks = 5, MaxSkills = 100, MaxInterests = 20;

    [GeneratedRegex("^[a-z]{2,3}(-[A-Za-z]{2,4})?$")] public static partial Regex LanguageTag();

    public static string Initials(string name)
    {
        var parts = name.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var s = string.Concat(parts.Take(2).Select(p => char.ToUpperInvariant(p[0])));
        return s.Length == 0 ? "?" : s;
    }

    public static string Text(string? v, string field, int max)
    {
        var t = (v ?? "").Trim();
        if (t.Length > max) throw AppException.Bad($"{field} must be at most {max} characters.", "invalid_" + field.ToLowerInvariant());
        return t;
    }

    public static string TimeZone(string? id)
    {
        var tz = (id ?? "").Trim();
        if (tz.Length is 0 or > 64 || !TimeZoneInfo.TryFindSystemTimeZoneById(tz, out var info) || !info.HasIanaId
            || !tz.Equals(info.Id, StringComparison.Ordinal))
            throw AppException.Bad("TimeZone must be a valid IANA time zone id (e.g. Europe/London).", "invalid_timezone");
        return tz;
    }

    public static string HttpsUrl(string? url, string field)
    {
        var u = (url ?? "").Trim();
        if (u.Length is 0 or > 500 || !Uri.TryCreate(u, UriKind.Absolute, out var uri) || uri.Scheme != Uri.UriSchemeHttps
            || !string.IsNullOrEmpty(uri.UserInfo) || string.IsNullOrEmpty(uri.Host))
            throw AppException.Bad($"{field} must be an absolute https:// URL.", "invalid_url");
        return uri.AbsoluteUri;
    }

    public static List<ProfileLink> ReadLinks(string json)
    {
        try { return JsonSerializer.Deserialize<List<ProfileLink>>(json) ?? []; } catch (JsonException) { return []; }
    }
}

public class ProfileService(AppDbContext db, ICurrentUser me)
{
    private async Task<AccountProfile> GetOrCreate(Guid uid)
    {
        var p = await db.Set<AccountProfile>().FirstOrDefaultAsync(x => x.UserId == uid);
        if (p is null) { p = new AccountProfile { UserId = uid }; db.Set<AccountProfile>().Add(p); }
        return p;
    }

    public async Task<ProfileDto> Get()
    {
        var uid = me.RequireId();
        var user = await db.Users.AsNoTracking().Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("User");
        var p = await db.Set<AccountProfile>().AsNoTracking().FirstOrDefaultAsync(x => x.UserId == uid) ?? new AccountProfile { UserId = uid };
        var sec = await db.Set<UserSecurity>().AsNoTracking().FirstOrDefaultAsync(s => s.UserId == uid);
        return new(user.Id, user.Email, user.DisplayName, AccountRules.Initials(user.DisplayName), p.Headline, p.Bio, user.PreferredLanguage,
            p.TimeZone, AccountRules.ReadLinks(p.LinksJson), p.PublicInstructorProfile, EmailVerificationService.IsVerified(user, sec),
            sec?.MfaEnabledAt is not null, user.Roles.Select(r => r.Role).OrderBy(r => r, StringComparer.Ordinal).ToArray());
    }

    /// <summary>Partial update: null fields are left unchanged.</summary>
    public async Task<ProfileDto> Update(UpdateProfileRequest req)
    {
        var uid = me.RequireId();
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("User");
        var p = await GetOrCreate(uid);
        if (req.DisplayName is not null) user.DisplayName = IdentityValidation.RequireText(req.DisplayName, "DisplayName", 1, 100);
        if (req.Headline is not null) p.Headline = AccountRules.Text(req.Headline, "Headline", 160);
        if (req.Bio is not null) p.Bio = AccountRules.Text(req.Bio, "Bio", 5000);
        if (req.PreferredLanguage is not null)
        {
            var lang = req.PreferredLanguage.Trim().ToLowerInvariant();
            if (!IdentityValidation.Languages.Contains(lang)) throw AppException.Bad("Unsupported preferred language.", "invalid_language");
            user.PreferredLanguage = lang;
        }
        if (req.TimeZone is not null) p.TimeZone = AccountRules.TimeZone(req.TimeZone);
        if (req.Links is not null)
        {
            if (req.Links.Count > AccountRules.MaxLinks) throw AppException.Bad($"At most {AccountRules.MaxLinks} links are allowed.", "too_many_links");
            var links = req.Links.Select(l => new ProfileLink(
                IdentityValidation.RequireText(l?.Label, "Label", 1, 50), AccountRules.HttpsUrl(l?.Url, "Link url"))).ToList();
            p.LinksJson = JsonSerializer.Serialize(links);
        }
        if (req.PublicInstructorProfile is { } pub)
        {
            if (pub && !user.Roles.Any(r => r.Role == Roles.Instructor))
                throw AppException.Forbidden("Only instructors can publish an instructor profile.");
            p.PublicInstructorProfile = pub;
        }
        p.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return await Get();
    }

    public async Task<PublicInstructorProfileDto> PublicInstructor(Guid userId)
    {
        var user = await db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId && !u.IsSuspended
                       && db.UserRoles.Any(r => r.UserId == userId && r.Role == Roles.Instructor))
                   ?? throw AppException.NotFound("Instructor");
        var p = await db.Set<AccountProfile>().AsNoTracking()
                    .FirstOrDefaultAsync(x => x.UserId == userId && x.PublicInstructorProfile && x.DeletedAt == null)
                ?? throw AppException.NotFound("Instructor");
        return new(user.Id, user.DisplayName, AccountRules.Initials(user.DisplayName), p.Headline, p.Bio, AccountRules.ReadLinks(p.LinksJson));
    }

    public async Task<LearningGoalsDto> GetGoals()
    {
        var uid = me.RequireId();
        var g = await db.Set<LearningGoals>().AsNoTracking().FirstOrDefaultAsync(x => x.UserId == uid);
        return g is null ? new("", [], "en", null) : ToDto(g);
    }

    public async Task<LearningGoalsDto> PutGoals(UpdateLearningGoalsRequest req)
    {
        var uid = me.RequireId();
        var goals = AccountRules.Text(req.Goals, "Goals", 2000);
        var skills = (req.SkillsOfInterest ?? []).Select(s => (s ?? "").Trim()).Where(s => s.Length > 0)
            .Distinct(StringComparer.OrdinalIgnoreCase).ToList();
        if (skills.Count > AccountRules.MaxInterests) throw AppException.Bad($"At most {AccountRules.MaxInterests} skills of interest.", "too_many_skills");
        if (skills.Any(s => s.Length > 60 || s.Contains('\n'))) throw AppException.Bad("Each skill must be at most 60 characters.", "invalid_skill");
        var lang = string.IsNullOrWhiteSpace(req.LearningLanguage) ? "en" : req.LearningLanguage.Trim();
        if (!AccountRules.LanguageTag().IsMatch(lang)) throw AppException.Bad("LearningLanguage must be a language code such as 'en' or 'ar'.", "invalid_language");
        var g = await db.Set<LearningGoals>().FirstOrDefaultAsync(x => x.UserId == uid);
        if (g is null) { g = new LearningGoals { UserId = uid }; db.Set<LearningGoals>().Add(g); }
        g.Goals = goals; g.SkillsOfInterest = string.Join('\n', skills); g.LearningLanguage = lang; g.UpdatedAt = DateTime.UtcNow;
        await db.SaveChangesAsync();
        return ToDto(g);
    }

    private static LearningGoalsDto ToDto(LearningGoals g) => new(g.Goals,
        g.SkillsOfInterest.Split('\n', StringSplitOptions.RemoveEmptyEntries).ToList(), g.LearningLanguage, g.UpdatedAt);
}

/// <summary>Skill profile (spec §16): every item states its evidence type; nothing is presented as verified.</summary>
public class SkillProfileService(AppDbContext db, ICurrentUser me)
{
    public async Task<SkillProfileDto> Get()
    {
        var uid = me.RequireId();
        var items = new List<SkillEvidenceDto>();
        var own = await db.Set<UserSkill>().AsNoTracking().Where(s => s.UserId == uid).OrderBy(s => s.Name).ToListAsync();
        items.AddRange(own.Select(ToDto));

        var rows = await (from a in db.Attempts.AsNoTracking()
                          where a.UserId == uid && a.Status == AttemptStatus.Submitted && a.Passed == true
                          join i in db.AttemptItems on a.Id equals i.AttemptId
                          join v in db.QuestionVersions on i.QuestionVersionId equals v.Id
                          where v.SkillCode != ""
                          select new { v.SkillCode, a.AssessmentId, a.ScorePercent, a.SubmittedAt }).Distinct().ToListAsync();
        items.AddRange(rows.GroupBy(r => r.SkillCode.Trim(), StringComparer.OrdinalIgnoreCase).OrderBy(g => g.Key).Select(g =>
            new SkillEvidenceDto(null, g.Key, SkillEvidence.McqAssessed, SkillEvidence.McqLabel, false, null, null, null,
                g.Select(r => r.AssessmentId).Distinct().Count(), g.Max(r => r.ScorePercent), g.Max(r => r.SubmittedAt))));
        return new(items, SkillEvidence.Notice);
    }

    public async Task<SkillEvidenceDto> Add(AddSkillRequest req)
    {
        var uid = me.RequireId();
        var kind = req.EvidenceType switch
        {
            SkillEvidence.SelfDeclared => SkillEvidenceKind.SelfDeclared,
            SkillEvidence.ExternalCredential => SkillEvidenceKind.ExternalCredential,
            _ => throw AppException.Bad("EvidenceType must be 'self_declared' or 'external_credential' (MCQ evidence is derived from assessments).", "invalid_evidence_type"),
        };
        var name = IdentityValidation.RequireText(req.Name, "Name", 1, 100);
        var s = new UserSkill { UserId = uid, Kind = kind, Name = name };
        if (kind == SkillEvidenceKind.ExternalCredential)
        {
            s.Issuer = IdentityValidation.RequireText(req.Issuer, "Issuer", 1, 150);
            if (!string.IsNullOrWhiteSpace(req.CredentialUrl)) s.CredentialUrl = AccountRules.HttpsUrl(req.CredentialUrl, "CredentialUrl");
            if (req.ObtainedAt is { } at)
            {
                if (at > DateTime.UtcNow.AddDays(1)) throw AppException.Bad("ObtainedAt cannot be in the future.", "invalid_date");
                s.ObtainedAt = DateTime.SpecifyKind(at.Date, DateTimeKind.Utc);
            }
        }
        else if (!string.IsNullOrWhiteSpace(req.Issuer) || !string.IsNullOrWhiteSpace(req.CredentialUrl))
            throw AppException.Bad("Issuer and CredentialUrl apply to external credentials only.", "invalid_evidence_type");
        if (await db.Set<UserSkill>().CountAsync(x => x.UserId == uid) >= AccountRules.MaxSkills)
            throw AppException.Bad($"At most {AccountRules.MaxSkills} skills.", "too_many_skills");
        if (await db.Set<UserSkill>().AnyAsync(x => x.UserId == uid && x.Kind == kind && x.Name == name && x.Issuer == s.Issuer))
            throw AppException.Conflict("This skill is already in your profile.", "duplicate_skill");
        db.Set<UserSkill>().Add(s);
        await db.SaveChangesAsync();
        return ToDto(s);
    }

    public async Task Delete(Guid id)
    {
        var uid = me.RequireId();
        var n = await db.Set<UserSkill>().Where(s => s.Id == id && s.UserId == uid).ExecuteDeleteAsync();
        if (n == 0) throw AppException.NotFound("Skill");
    }

    private static SkillEvidenceDto ToDto(UserSkill s) => s.Kind == SkillEvidenceKind.SelfDeclared
        ? new(s.Id, s.Name, SkillEvidence.SelfDeclared, SkillEvidence.SelfDeclaredLabel, false, null, null, null, null, null, null)
        : new(s.Id, s.Name, SkillEvidence.ExternalCredential, SkillEvidence.ExternalLabel, false, s.Issuer,
            s.CredentialUrl.Length == 0 ? null : s.CredentialUrl, s.ObtainedAt, null, null, null);
}

/// <summary>Data-subject rights: export of the user's own data and account deletion by anonymization.</summary>
public class DataRightsService(AppDbContext db, ICurrentUser me, AuditService audit, MfaService mfa, SkillProfileService skills,
    ProfileService profiles, Identity.TokenSessionValidator tokenValidator)
{
    public const string DeleteConfirmation = "DELETE";

    public async Task<object> Export()
    {
        var uid = me.RequireId();
        var user = await db.Users.AsNoTracking().Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("User");

        var enrollments = await (from e in db.Enrollments.AsNoTracking() where e.UserId == uid
                                 join c in db.Courses on e.CourseId equals c.Id into cs from c in cs.DefaultIfEmpty()
                                 orderby e.CreatedAt
                                 select new { e.CourseId, CourseTitle = c == null ? null : c.Title, EnrolledAt = e.CreatedAt }).ToListAsync();
        var progress = await db.LessonProgress.AsNoTracking().Where(p => p.UserId == uid)
            .Select(p => new { p.LessonId, p.PositionSeconds, p.Completed, p.UpdatedAt }).ToListAsync();
        var notes = await db.LearnerNotes.AsNoTracking().Where(n => n.UserId == uid).OrderBy(n => n.CreatedAt)
            .Select(n => new { n.Id, n.CourseId, n.LessonId, n.CourseTitleSnapshot, n.LessonTitleSnapshot, n.TimestampSeconds, n.Body, n.Tags, n.CreatedAt, n.UpdatedAt })
            .ToListAsync();
        var attempts = await (from a in db.Attempts.AsNoTracking() where a.UserId == uid
                              join s in db.Assessments on a.AssessmentId equals s.Id into ss from s in ss.DefaultIfEmpty()
                              orderby a.StartedAt
                              select new { a.Id, a.AssessmentId, AssessmentTitle = s == null ? null : s.Title, Status = a.Status.ToString(),
                                  a.StartedAt, a.SubmittedAt, a.ScorePercent, a.Passed }).ToListAsync();
        var certificates = await db.Certificates.AsNoTracking().Where(c => c.UserId == uid)
            .Select(c => new { c.Code, c.CourseId, c.CourseTitle, c.RecipientName, c.ScorePercent, Status = c.Status.ToString(), c.PubliclyVisible, c.IssuedAt })
            .ToListAsync();
        var orders = await db.Orders.AsNoTracking().Where(o => o.UserId == uid).Include(o => o.Items).OrderBy(o => o.CreatedAt).ToListAsync();
        var orderIds = orders.Select(o => o.Id).ToList();
        var payments = await db.Payments.AsNoTracking().Where(p => orderIds.Contains(p.OrderId))
            .Select(p => new { p.OrderId, p.Provider, p.Amount, p.Currency, p.CreatedAt }).ToListAsync();
        var refunds = await db.Refunds.AsNoTracking().Where(r => orderIds.Contains(r.OrderId))
            .Select(r => new { r.OrderId, r.Amount, r.Reason, r.Status, r.CreatedAt, r.DecidedAt }).ToListAsync();
        var threads = await db.DiscussionThreads.AsNoTracking().Where(t => t.AuthorId == uid)
            .Select(t => new { t.Id, t.CourseId, t.LessonId, t.Title, t.Body, t.Hidden, t.CreatedAt, t.UpdatedAt }).ToListAsync();
        var replies = await db.DiscussionReplies.AsNoTracking().Where(r => r.AuthorId == uid)
            .Select(r => new { r.Id, r.ThreadId, r.Body, r.Hidden, r.CreatedAt }).ToListAsync();
        var reviews = await db.CourseReviews.AsNoTracking().Where(r => r.UserId == uid)
            .Select(r => new { r.CourseId, r.Rating, r.Body, r.VerifiedPurchase, r.Hidden, r.CreatedAt, r.UpdatedAt }).ToListAsync();
        var wishlist = await db.Wishlist.AsNoTracking().Where(w => w.UserId == uid).Select(w => new { w.CourseId, w.CreatedAt }).ToListAsync();
        var prefs = await db.NotificationPreferences.AsNoTracking().Where(p => p.UserId == uid).Select(p => new { p.Kind, p.InApp, p.Email }).ToListAsync();
        var sessions = await db.Set<AuthSession>().AsNoTracking().Where(s => s.UserId == uid)
            .Select(s => new { s.CreatedAt, s.LastUsedAt, s.UserAgent, s.IpAddress, s.MfaAuthenticated }).ToListAsync();

        audit.Record("user.data_exported", "User", uid);
        await db.SaveChangesAsync();
        return new
        {
            format = "mastemy-account-export/v1",
            exportedAt = DateTime.UtcNow,
            account = new { user.Id, user.Email, user.DisplayName, user.PreferredLanguage, user.CreatedAt,
                roles = user.Roles.Select(r => r.Role).OrderBy(r => r, StringComparer.Ordinal) },
            profile = await profiles.Get(),
            learningGoals = await profiles.GetGoals(),
            skills = await skills.Get(),
            enrollments, lessonProgress = progress, notes,
            assessmentAttempts = attempts, certificates,
            orders = orders.Select(o => new { o.Id, Status = o.Status.ToString(), o.Total, o.Currency, o.CreatedAt, o.PaidAt,
                items = o.Items.Select(i => new { i.PackageId, i.CourseId, i.UnitPrice }) }),
            payments, refunds,
            discussions = new { threads, replies },
            reviews, wishlist, notificationPreferences = prefs, sessions,
        };
    }

    /// <summary>Immediate, irreversible anonymization. Financial records are retained for legal obligations.</summary>
    public async Task Delete(DeleteAccountRequest req)
    {
        var uid = me.RequireId();
        if (req.Confirm != DeleteConfirmation)
            throw AppException.Bad("Account deletion is immediate and cannot be undone. Send confirm: \"DELETE\" to proceed.", "confirmation_required");
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == uid) ?? throw AppException.NotFound("User");
        if (string.IsNullOrEmpty(req.Password) || !PasswordHasher.Verify(req.Password, user.PasswordHash))
            throw AppException.Bad("The current password is incorrect.", "invalid_current_password");
        if (await mfa.IsEnabled(uid) && !await mfa.VerifyTotp(uid, req.MfaCode))
            throw AppException.Bad("A valid MFA code is required to delete this account.", "invalid_mfa_code");
        if (user.Roles.Any(r => r.Role == Roles.SuperAdmin)
            && !await db.UserRoles.AnyAsync(r => r.Role == Roles.SuperAdmin && r.UserId != uid && db.Users.Any(u => u.Id == r.UserId && !u.IsSuspended)))
            throw AppException.Conflict("The last active SuperAdmin cannot delete their account.", "last_superadmin");

        await using var tx = await db.Database.BeginTransactionAsync();
        var now = DateTime.UtcNow;
        var anonEmail = $"deleted+{uid:N}@invalid";
        user.Email = anonEmail; user.NormalizedEmail = anonEmail;
        user.DisplayName = "Deleted user";
        user.PasswordHash = PasswordHasher.Hash(Tokens.Random(32));
        user.IsSuspended = true; user.FailedLoginCount = 0; user.LockoutUntil = null;
        foreach (var r in user.Roles.Where(r => r.Role != Roles.Student).ToList()) user.Roles.Remove(r);
        if (user.Roles.Count == 0) user.Roles.Add(new UserRole { UserId = uid, Role = Roles.Student });

        await db.RefreshTokens.Where(t => t.UserId == uid && t.RevokedAt == null).ExecuteUpdateAsync(s => s.SetProperty(t => t.RevokedAt, now));
        await db.Set<AuthSession>().Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.Set<OneTimeToken>().Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.Set<MfaRecoveryCode>().Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.Set<MfaChallenge>().Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.Set<UserSecurity>().Where(x => x.UserId == uid).ExecuteDeleteAsync();
        var notes = await db.LearnerNotes.Where(n => n.UserId == uid).ExecuteDeleteAsync();
        await db.Wishlist.Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.RecentlyViewed.Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.Notifications.Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.NotificationPreferences.Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.Set<LearningGoals>().Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.Set<UserSkill>().Where(x => x.UserId == uid).ExecuteDeleteAsync();
        await db.Set<StudyTools.CalendarFeedToken>().Where(x => x.UserId == uid).ExecuteDeleteAsync(); // anonymous feed URL dies too
        await db.Certificates.Where(c => c.UserId == uid).ExecuteUpdateAsync(s => s.SetProperty(c => c.PubliclyVisible, false));

        var p = await db.Set<AccountProfile>().FirstOrDefaultAsync(x => x.UserId == uid);
        if (p is null) { p = new AccountProfile { UserId = uid }; db.Set<AccountProfile>().Add(p); }
        p.Headline = ""; p.Bio = ""; p.LinksJson = "[]"; p.PublicInstructorProfile = false; p.TimeZone = "UTC";
        p.DeletedAt = now; p.UpdatedAt = now;

        audit.Record("user.deleted", "User", uid, new
        {
            anonymized = true, notesDeleted = notes,
            retained = new[] { "orders", "payments", "refunds", "commission_ledger", "certificates (not publicly visible)", "audit_log" },
        });
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        tokenValidator.Invalidate(uid); // outstanding access tokens stop working immediately in this process
    }
}
