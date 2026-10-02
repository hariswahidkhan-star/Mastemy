using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mastemy.Api.Modules.Assessment;

/// <summary>The two credential kinds Mastemy issues (spec §17: completion and assessed-knowledge awards are separate).</summary>
public static class CredentialKinds
{
    public const string AssessedKnowledge = "AssessedKnowledge";
    public const string Completion = "Completion";

    public const string AssessedTitle = "Certificate of Assessed Knowledge";
    public const string CompletionTitle = "Certificate of Completion — attests lesson completion, not assessed knowledge";

    public const string AssessedVerificationLabel = "Assessed-knowledge certificate: issued for passing a server-scored assessment.";
    public const string CompletionVerificationLabel = "Completion award: attests that every lesson was completed. It does NOT certify assessed knowledge.";
}

/// <summary>Studio setting (1:1 with a course): whether learners who complete every lesson receive a completion award.</summary>
public class CourseCompletionAwardSetting
{
    public Guid CourseId { get; set; }
    public bool Enabled { get; set; }
    public Guid? UpdatedBy { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// A completion award: issued when a learner has completed every lesson of the course's current published snapshot. A
/// separate entity from <see cref="Certificate"/> so it can never be mistaken for an assessed-knowledge certificate; codes
/// share the certificate alphabet and are unique across both tables. One per (user, course).
/// </summary>
public class CompletionAward
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Code { get; set; } = "";
    public Guid UserId { get; set; }
    public Guid CourseId { get; set; }
    public int SnapshotVersion { get; set; }
    public int LessonCount { get; set; }
    public string RecipientName { get; set; } = "";
    public string CourseTitle { get; set; } = "";
    public CertificateStatus Status { get; set; }
    public string? RevocationReason { get; set; }
    public bool PubliclyVisible { get; set; } = true;
    public DateTime IssuedAt { get; set; } = DateTime.UtcNow;
}

public class CompletionAwardConfig : IEntityTypeConfiguration<CourseCompletionAwardSetting>, IEntityTypeConfiguration<CompletionAward>
{
    public void Configure(EntityTypeBuilder<CourseCompletionAwardSetting> b)
    {
        b.ToTable("Assessment_CompletionAwardSettings");
        b.HasKey(x => x.CourseId);
        b.HasOne<Course>().WithOne().HasForeignKey<CourseCompletionAwardSetting>(x => x.CourseId).OnDelete(DeleteBehavior.Cascade);
    }

    public void Configure(EntityTypeBuilder<CompletionAward> b)
    {
        b.ToTable("Assessment_CompletionAwards");
        b.HasKey(x => x.Id);
        b.Property(x => x.Code).HasMaxLength(32).IsRequired();
        b.HasIndex(x => x.Code).IsUnique();
        b.HasIndex(x => new { x.UserId, x.CourseId }).IsUnique(); // idempotent issuance
        b.Property(x => x.RecipientName).HasMaxLength(200);
        b.Property(x => x.CourseTitle).HasMaxLength(300);
        b.Property(x => x.RevocationReason).HasMaxLength(500);
        b.HasOne<User>().WithMany().HasForeignKey(x => x.UserId);
        b.HasOne<Course>().WithMany().HasForeignKey(x => x.CourseId);
    }
}

public record CompletionAwardSettingDto(Guid CourseId, bool Enabled, DateTime? UpdatedAt);
public record CompletionAwardSettingInput(bool? Enabled);
public record CompletionAwardDto(Guid Id, string Code, string Kind, string Title, Guid CourseId, string CourseTitle, string RecipientName,
    int LessonCount, int SnapshotVersion, CertificateStatus Status, bool PubliclyVisible, DateTime IssuedAt);
public record CertificateShareDto(Guid Id, string Kind, string CertificationName, string LinkedInAddToProfileUrl, string VerificationUrl);

public class CompletionAwardService(AppDbContext db, ICurrentUser me, AccessService access, AuditService audit,
    Catalog.CourseSnapshotService snapshots, Engagement.INotificationService notifications)
{
    public static string Criteria(int lessons, int version) =>
        $"Completed all {lessons} lesson(s) of version {version} of the course. Attests lesson completion, not assessed knowledge; " +
        "no assessment was passed to earn this award.";

    // ---------------- Studio setting ----------------

    public async Task<CompletionAwardSettingDto> GetSetting(Guid courseId)
    {
        await access.RequireCourseAuthorOrStaff(courseId);
        var s = await db.Set<CourseCompletionAwardSetting>().AsNoTracking().FirstOrDefaultAsync(x => x.CourseId == courseId);
        return new CompletionAwardSettingDto(courseId, s?.Enabled ?? false, s?.UpdatedAt);
    }

    public async Task<CompletionAwardSettingDto> SetSetting(Guid courseId, CompletionAwardSettingInput input)
    {
        var uid = me.RequireId();
        if (!await db.Courses.AnyAsync(c => c.Id == courseId)) throw AppException.NotFound("Course");
        await access.RequireCourseEditor(courseId);
        if (input?.Enabled is not { } enabled) throw AppException.Bad("'enabled' is required.");
        var s = await db.Set<CourseCompletionAwardSetting>().FirstOrDefaultAsync(x => x.CourseId == courseId);
        if (s is null) { s = new CourseCompletionAwardSetting { CourseId = courseId }; db.Set<CourseCompletionAwardSetting>().Add(s); }
        if (s.Enabled != enabled || s.UpdatedBy is null)
        {
            s.Enabled = enabled; s.UpdatedBy = uid; s.UpdatedAt = DateTime.UtcNow;
            audit.Record("course.completion_award_setting_changed", "Course", courseId, new { enabled });
            await db.SaveChangesAsync();
        }
        return new CompletionAwardSettingDto(courseId, s.Enabled, s.UpdatedAt);
    }

    // ---------------- Issuance ----------------

    /// <summary>Learner claim: issues (idempotently) when eligible, otherwise explains why not.</summary>
    public async Task<CompletionAwardDto> Claim(Guid courseId)
    {
        var uid = me.RequireId();
        var (award, reason) = await TryIssue(uid, courseId);
        if (award is not null) return Dto(award);
        throw reason switch
        {
            "disabled" => AppException.Conflict("This course does not issue completion awards.", "completion_awards_disabled"),
            "not_enrolled" => AppException.Conflict("You are not enrolled in this course.", "not_enrolled"),
            "not_live" => AppException.NotFound("Course"),
            _ => AppException.Conflict("Complete every lesson of the current course version to receive the completion award.", "course_not_completed"),
        };
    }

    /// <summary>Issues awards for every enrolled course the user has completed (used when listing their credentials).</summary>
    public async Task Sweep(Guid userId)
    {
        var candidates = await db.Enrollments.AsNoTracking().Where(e => e.UserId == userId)
            .Join(db.Set<CourseCompletionAwardSetting>().Where(s => s.Enabled), e => e.CourseId, s => s.CourseId, (e, s) => e.CourseId)
            .Where(cid => !db.Set<CompletionAward>().Any(a => a.UserId == userId && a.CourseId == cid)).Distinct().ToListAsync();
        foreach (var cid in candidates) await TryIssue(userId, cid);
    }

    public async Task<(CompletionAward? Award, string? Reason)> TryIssue(Guid userId, Guid courseId)
    {
        var existing = await db.Set<CompletionAward>().AsNoTracking().FirstOrDefaultAsync(a => a.UserId == userId && a.CourseId == courseId);
        if (existing is not null) return (existing, null);
        if (!await db.Set<CourseCompletionAwardSetting>().AnyAsync(s => s.CourseId == courseId && s.Enabled)) return (null, "disabled");
        if (!await db.Enrollments.AnyAsync(e => e.UserId == userId && e.CourseId == courseId)) return (null, "not_enrolled");
        var live = await snapshots.TryLiveById(courseId);
        if (live is null) return (null, "not_live");
        var lessonIds = live.Payload.OrderedLessons().Select(x => x.Lesson.Id).ToList();
        if (lessonIds.Count == 0) return (null, "not_completed");
        var done = await db.LessonProgress.AsNoTracking().CountAsync(p => p.UserId == userId && p.Completed && lessonIds.Contains(p.LessonId));
        if (done < lessonIds.Count) return (null, "not_completed");

        var user = await db.Users.AsNoTracking().FirstAsync(u => u.Id == userId);
        for (var tries = 0; tries < 5; tries++)
        {
            var code = CertificateService.NewCode();
            if (await db.Certificates.AnyAsync(c => c.Code == code)) continue; // codes are unique across both credential kinds
            var award = new CompletionAward
            {
                Code = code, UserId = userId, CourseId = courseId, SnapshotVersion = live.Version, LessonCount = lessonIds.Count,
                RecipientName = user.DisplayName, CourseTitle = live.Payload.Title, Status = CertificateStatus.Valid, IssuedAt = DateTime.UtcNow,
            };
            db.Set<CompletionAward>().Add(award);
            audit.Record("completion_award.issued", "CompletionAward", award.Id, new { userId, courseId, version = live.Version, lessons = lessonIds.Count });
            try
            {
                await db.SaveChangesAsync();
                await notifications.Publish([userId], "certificate", $"Completion award issued: {award.CourseTitle}", $"/verify/{award.Code}");
                return (award, null);
            }
            catch (DbUpdateException)
            {
                db.ChangeTracker.Clear();
                existing = await db.Set<CompletionAward>().AsNoTracking().FirstOrDefaultAsync(a => a.UserId == userId && a.CourseId == courseId);
                if (existing is not null) return (existing, null);
            }
        }
        throw new InvalidOperationException("Could not allocate a unique completion award code.");
    }

    public static CompletionAwardDto Dto(CompletionAward a) => new(a.Id, a.Code, CredentialKinds.Completion, CredentialKinds.CompletionTitle,
        a.CourseId, a.CourseTitle, a.RecipientName, a.LessonCount, a.SnapshotVersion, a.Status, a.PubliclyVisible, a.IssuedAt);
}

[ApiController]
public class CompletionAwardsController(CompletionAwardService svc, CertificateService certificates) : ControllerBase
{
    [Authorize(Policy = "Instructor")]
    [HttpGet("api/studio/courses/{courseId:guid}/completion-award")]
    public Task<CompletionAwardSettingDto> Get(Guid courseId) => svc.GetSetting(courseId);

    [Authorize(Policy = "Instructor")]
    [HttpPut("api/studio/courses/{courseId:guid}/completion-award")]
    public Task<CompletionAwardSettingDto> Put(Guid courseId, CompletionAwardSettingInput input) => svc.SetSetting(courseId, input);

    [Authorize]
    [HttpPost("api/me/courses/{courseId:guid}/completion-award")]
    public Task<CompletionAwardDto> Claim(Guid courseId) => svc.Claim(courseId);

    /// <summary>LinkedIn "Add to profile" link for one of the caller's credentials (either kind).</summary>
    [Authorize]
    [HttpGet("api/me/certificates/{id:guid}/share")]
    public Task<CertificateShareDto> Share(Guid id) => certificates.Share(id);
}
