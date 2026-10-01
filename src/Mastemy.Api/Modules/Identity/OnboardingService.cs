using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Identity;

/// <summary>Instructor onboarding (spec §9, §10.6). Flag changes only gate NEW applications; they never touch existing roles.</summary>
public class OnboardingService(AppDbContext db, FeatureFlagService flags, AuditService audit, ICurrentUser me)
{
    public const string AgreementVersion = "instructor-agreement-v1";
    public static readonly TimeSpan InvitationLifetime = TimeSpan.FromDays(14);
    private static readonly ApplicationStatus[] OpenStatuses =
        [ApplicationStatus.Submitted, ApplicationStatus.InReview, ApplicationStatus.ChangesRequested];

    public async Task<OnboardingStatusDto> Status()
    {
        var all = await flags.All();
        ApplicationDto? mine = null;
        if (me.Id is { } uid)
        {
            var app = await db.InstructorApplications.AsNoTracking().Where(a => a.UserId == uid)
                .OrderByDescending(a => a.CreatedAt).FirstOrDefaultAsync();
            if (app is not null) mine = ApplicationDto.From(app);
        }
        return new(all[FeatureFlags.ExternalInstructorRegistrationEnabled], all[FeatureFlags.InstructorApplicationsInviteOnly],
            all[FeatureFlags.NewInstructorApplicationsPaused], mine);
    }

    public async Task<InvitationCreatedDto> CreateInvitation(CreateInvitationRequest req)
    {
        var email = IdentityValidation.RequireEmail(req.Email);
        var code = Tokens.Random(24);
        var inv = new InstructorInvitation
        {
            Email = IdentityValidation.NormalizeEmail(email), CodeHash = Tokens.Sha256(code),
            CreatedBy = me.RequireId(), ExpiresAt = DateTime.UtcNow.Add(InvitationLifetime),
        };
        db.InstructorInvitations.Add(inv);
        audit.Record("instructor_invitation.created", "InstructorInvitation", inv.Id, new { email = inv.Email });
        await db.SaveChangesAsync();
        return new(inv.Id, inv.Email, code, inv.ExpiresAt);
    }

    public async Task<ApplicationDto> Submit(SubmitApplicationRequest req)
    {
        var userId = me.RequireId();
        var user = await db.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == userId) ?? throw AppException.NotFound("User");
        var all = await flags.All();
        if (all[FeatureFlags.NewInstructorApplicationsPaused])
            throw AppException.Forbidden("New instructor applications are currently paused.");

        InstructorInvitation? invitation = null;
        if (!string.IsNullOrWhiteSpace(req.InvitationCode))
        {
            var hash = Tokens.Sha256(req.InvitationCode.Trim());
            invitation = await db.InstructorInvitations.FirstOrDefaultAsync(i => i.CodeHash == hash);
            if (invitation is null || invitation.UsedAt is not null || invitation.ExpiresAt <= DateTime.UtcNow
                || invitation.Email != user.NormalizedEmail)
                throw AppException.Forbidden("The invitation code is invalid, expired, already used, or issued for another email.");
        }
        if (invitation is null)
        {
            if (!all[FeatureFlags.ExternalInstructorRegistrationEnabled])
                throw AppException.Forbidden("Instructor applications are by invitation only at this time.");
            if (all[FeatureFlags.InstructorApplicationsInviteOnly])
                throw AppException.Forbidden("A valid invitation code is required to apply.");
        }

        if (user.Roles.Any(r => r.Role == Roles.Instructor)) throw AppException.Conflict("You are already an instructor.", "already_instructor");
        if (await db.InstructorApplications.AnyAsync(a => a.UserId == userId && OpenStatuses.Contains(a.Status)))
            throw AppException.Conflict("You already have an open application.", "application_open");
        if (!req.AgreementAccepted) throw AppException.Bad("You must accept the instructor agreement.", "agreement_required");
        var headline = IdentityValidation.RequireText(req.Headline, "Headline", 3, 200);
        var bio = IdentityValidation.RequireText(req.Bio, "Bio", 20, 5000);
        var evidence = IdentityValidation.RequireText(req.ExpertiseEvidence, "ExpertiseEvidence", 10, 5000);
        if (!YouTubeUrl.TryParseVideoId(req.TestVideoUrl, out var videoId))
            throw AppException.Bad("Test video URL must be a valid YouTube video link.", "invalid_test_video_url");

        var app = new InstructorApplication
        {
            UserId = userId, Headline = headline, Bio = bio, ExpertiseEvidence = evidence,
            TestVideoUrl = req.TestVideoUrl!.Trim(), TestVideoId = videoId,
            AgreementAccepted = true, AgreementVersion = AgreementVersion,
        };
        db.InstructorApplications.Add(app);
        if (invitation is not null)
        {
            invitation.UsedAt = DateTime.UtcNow;
            audit.Record("instructor_invitation.used", "InstructorInvitation", invitation.Id, new { applicationId = app.Id });
        }
        audit.Record("instructor_application.submitted", "InstructorApplication", app.Id, new { invited = invitation is not null });
        await db.SaveChangesAsync();
        return ApplicationDto.From(app);
    }

    public async Task<PagedResult<ApplicationDto>> List(string? status, int page, int pageSize)
    {
        (page, pageSize) = IdentityValidation.Paging(page, pageSize);
        var query = db.InstructorApplications.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(status))
        {
            if (!Enum.TryParse<ApplicationStatus>(status, true, out var st) || !Enum.IsDefined(st))
                throw AppException.Bad("Unknown application status.", "invalid_status");
            query = query.Where(a => a.Status == st);
        }
        var total = await query.CountAsync();
        var items = await query.OrderBy(a => a.CreatedAt).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
        var userIds = items.Select(a => a.UserId).Distinct().ToList();
        var users = await db.Users.AsNoTracking().Where(u => userIds.Contains(u.Id)).ToDictionaryAsync(u => u.Id);
        return new(items.Select(a => ApplicationDto.From(a, users.GetValueOrDefault(a.UserId))).ToList(), total, page, pageSize);
    }

    public async Task<ApplicationDto> Decide(Guid id, DecisionRequest req)
    {
        var reviewer = me.RequireId();
        var newStatus = req.Decision?.Trim().ToLowerInvariant() switch
        {
            "approve" => ApplicationStatus.Approved,
            "reject" => ApplicationStatus.Rejected,
            "requestchanges" => ApplicationStatus.ChangesRequested,
            _ => throw AppException.Bad("Decision must be Approve, Reject or RequestChanges.", "invalid_decision"),
        };
        var notes = req.Notes?.Trim();
        if (notes is { Length: > 5000 }) throw AppException.Bad("Notes are too long.");
        if (newStatus != ApplicationStatus.Approved && string.IsNullOrEmpty(notes))
            throw AppException.Bad("Notes are required when rejecting or requesting changes.", "notes_required");

        var app = await db.InstructorApplications.FirstOrDefaultAsync(a => a.Id == id) ?? throw AppException.NotFound("Application");
        if (app.UserId == reviewer) throw AppException.Forbidden("You cannot review your own application.");
        if (!OpenStatuses.Contains(app.Status))
            throw AppException.Conflict("This application has already been decided.", "application_closed");

        app.Status = newStatus; app.ReviewerNotes = string.IsNullOrEmpty(notes) ? null : notes;
        app.ReviewedBy = reviewer; app.ReviewedAt = DateTime.UtcNow;
        audit.Record("instructor_application.decided", "InstructorApplication", app.Id, new { decision = newStatus.ToString() });

        if (newStatus == ApplicationStatus.Approved)
        {
            var hasRole = await db.UserRoles.AnyAsync(r => r.UserId == app.UserId && r.Role == Roles.Instructor);
            if (!hasRole)
            {
                db.UserRoles.Add(new UserRole { UserId = app.UserId, Role = Roles.Instructor });
                audit.Record("user.role_granted", "User", app.UserId, new { role = Roles.Instructor, applicationId = app.Id });
            }
        }
        await db.SaveChangesAsync();
        return ApplicationDto.From(app);
    }
}
