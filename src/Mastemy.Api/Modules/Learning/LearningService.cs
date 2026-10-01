using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Learning;

// ---------- DTOs ----------
public record LessonProgressDto(int PositionSeconds, bool Completed, DateTime UpdatedAt);
public record CurriculumLessonDto(Guid Id, string Code, string Title, int SortOrder, bool IsPreview, int DurationSeconds,
    string? YoutubeVideoId, LessonProgressDto? Progress);
public record CurriculumModuleDto(Guid Id, string Code, string Title, int SortOrder, List<CurriculumLessonDto> Lessons);
public record CurriculumDto(Guid CourseId, string Slug, string Title, string Subtitle, string Language, string Level,
    bool Enrolled, bool HasPremiumAccess, int ProgressPercent, Guid? LastLessonId, List<CurriculumModuleDto> Modules);
public record LessonAssessmentDto(Guid Id, string Title, string Kind, string Mode, bool IsPremium);
public record LessonInfoDto(Guid Id, Guid ModuleId, Guid CourseId, string CourseSlug, string CourseTitle, string Code, string Title,
    string Objective, int SortOrder, bool IsPreview, int DurationSeconds, int NotesVersion, Guid? PrevLessonId, Guid? NextLessonId);
public record LessonViewDto(LessonInfoDto Lesson, string? YoutubeVideoId, string NotesMarkdown, string? PremiumNotesMarkdown,
    bool PremiumLocked, bool HasPremiumNotes, List<LessonAssessmentDto> Assessments, LessonProgressDto? Progress);
public record ProgressInput(int PositionSeconds, bool Completed);
public record EnrollmentResult(Guid EnrollmentId, Guid CourseId, DateTime CreatedAt);
public record CourseRef(Guid Id, string Slug, string Title);
public record DashboardEnrollmentDto(CourseRef Course, int ProgressPercent, int CompletedLessons, int TotalLessons, Guid? LastLessonId, DateTime EnrolledAt);
public record DashboardEntitlementDto(Guid Id, CourseRef Course, Guid? PackageId, string? PackageTitle, string Source,
    DateTime StartsAt, DateTime? EndsAt, bool IsActive);
public record DashboardCertificateDto(Guid Id, string Code, Guid CourseId, string CourseTitle, decimal ScorePercent, string Status, DateTime IssuedAt);
public record DashboardAttemptDto(Guid Id, Guid AssessmentId, string AssessmentTitle, string Status, DateTime StartedAt,
    DateTime? SubmittedAt, decimal? ScorePercent, bool? Passed);
public record DashboardDto(List<DashboardEnrollmentDto> Enrollments, List<DashboardEntitlementDto> Entitlements,
    List<DashboardCertificateDto> Certificates, List<DashboardAttemptDto> RecentAttempts);

public class LearningService(AppDbContext db, ICurrentUser me, AccessService access)
{
    private record LiveLesson(Lesson Lesson, Course Course);

    /// <summary>Video ids are returned for every Ready video regardless of login, enrollment, payment, quiz or progress (spec §2).</summary>
    private static string? PlayableVideoId(VideoAsset? v) =>
        v is { Status: VideoStatus.Ready } && !string.IsNullOrEmpty(v.YouTubeVideoId) ? v.YouTubeVideoId : null;

    private async Task<Course> LiveCourseBySlug(string slug)
    {
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Slug == slug);
        if (c is null || !AccessService.IsLive(c.Status)) throw AppException.NotFound("Course");
        return c;
    }

    private async Task<LiveLesson> LiveLessonById(Guid lessonId)
    {
        var row = await (from l in db.Lessons.AsNoTracking().Include(l => l.VideoAsset)
                         join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                         join c in db.Courses.AsNoTracking() on m.CourseId equals c.Id
                         where l.Id == lessonId
                         select new { l, c }).FirstOrDefaultAsync();
        if (row is null || !AccessService.IsLive(row.c.Status)) throw AppException.NotFound("Lesson");
        return new LiveLesson(row.l, row.c);
    }

    private async Task<List<CourseModule>> Curriculum(Guid courseId) =>
        await db.Modules.AsNoTracking().Where(m => m.CourseId == courseId)
            .Include(m => m.Lessons).ThenInclude(l => l.VideoAsset)
            .OrderBy(m => m.SortOrder).ToListAsync();

    public async Task<CurriculumDto> GetCourse(string slug)
    {
        var c = await LiveCourseBySlug(slug);
        var modules = await Curriculum(c.Id);
        var lessonIds = modules.SelectMany(m => m.Lessons).Select(l => l.Id).ToList();
        var uid = me.Id;
        Dictionary<Guid, LessonProgress> progress = [];
        var enrolled = false; var premium = false;
        if (uid is not null)
        {
            progress = await db.LessonProgress.AsNoTracking().Where(p => p.UserId == uid && lessonIds.Contains(p.LessonId)).ToDictionaryAsync(p => p.LessonId);
            enrolled = await db.Enrollments.AnyAsync(e => e.UserId == uid && e.CourseId == c.Id);
            premium = await access.HasPremiumAccess(c.Id);
        }
        var total = lessonIds.Count;
        var done = progress.Values.Count(p => p.Completed);
        var last = progress.Values.OrderByDescending(p => p.UpdatedAt).FirstOrDefault()?.LessonId;
        return new CurriculumDto(c.Id, c.Slug, c.Title, c.Subtitle, c.Language, c.Level.ToString(), enrolled, premium,
            total == 0 ? 0 : (int)Math.Round(100.0 * done / total), last,
            modules.Select(m => new CurriculumModuleDto(m.Id, m.Code, m.Title, m.SortOrder,
                m.Lessons.OrderBy(l => l.SortOrder).Select(l => new CurriculumLessonDto(l.Id, l.Code, l.Title, l.SortOrder, l.IsPreview,
                    l.VideoAsset?.DurationSeconds ?? 0, PlayableVideoId(l.VideoAsset),
                    progress.TryGetValue(l.Id, out var p) ? new LessonProgressDto(p.PositionSeconds, p.Completed, p.UpdatedAt) : null)).ToList())).ToList());
    }

    public async Task<LessonViewDto> GetLesson(Guid lessonId)
    {
        var (l, c) = await LiveLessonById(lessonId);
        var ordered = (await Curriculum(c.Id)).SelectMany(m => m.Lessons.OrderBy(x => x.SortOrder)).Select(x => x.Id).ToList();
        var idx = ordered.IndexOf(l.Id);
        var premium = await access.HasPremiumAccess(c.Id);
        var hasPremiumNotes = !string.IsNullOrWhiteSpace(l.PremiumNotesMarkdown);
        var assessments = await db.Assessments.AsNoTracking().Where(a => a.LessonId == l.Id).OrderBy(a => a.Title)
            .Select(a => new { a.Id, a.Title, a.Kind, a.Mode, a.IsPremium }).ToListAsync();
        LessonProgressDto? prog = null;
        if (me.Id is { } uid)
        {
            var p = await db.LessonProgress.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == uid && x.LessonId == l.Id);
            if (p is not null) prog = new LessonProgressDto(p.PositionSeconds, p.Completed, p.UpdatedAt);
        }
        var info = new LessonInfoDto(l.Id, l.ModuleId, c.Id, c.Slug, c.Title, l.Code, l.Title, l.Objective, l.SortOrder, l.IsPreview,
            l.VideoAsset?.DurationSeconds ?? 0, l.NotesVersion,
            idx > 0 ? ordered[idx - 1] : null, idx >= 0 && idx < ordered.Count - 1 ? ordered[idx + 1] : null);
        return new LessonViewDto(info, PlayableVideoId(l.VideoAsset), l.NotesMarkdown,
            premium ? l.PremiumNotesMarkdown : null, hasPremiumNotes && !premium, hasPremiumNotes,
            assessments.Select(a => new LessonAssessmentDto(a.Id, a.Title, a.Kind.ToString(), a.Mode.ToString(), a.IsPremium)).ToList(), prog);
    }

    public async Task<LessonProgressDto> UpsertProgress(Guid lessonId, ProgressInput input)
    {
        var uid = me.RequireId();
        var (l, c) = await LiveLessonById(lessonId);
        var pos = Math.Max(0, input.PositionSeconds);
        var duration = l.VideoAsset?.DurationSeconds ?? 0;
        if (duration > 0) pos = Math.Min(pos, duration);
        await EnsureEnrollment(uid, c.Id);
        var p = await db.LessonProgress.FirstOrDefaultAsync(x => x.UserId == uid && x.LessonId == lessonId);
        if (p is null)
        {
            p = new LessonProgress { UserId = uid, LessonId = lessonId };
            db.LessonProgress.Add(p);
        }
        p.PositionSeconds = pos;
        p.Completed = p.Completed || input.Completed; // completion is sticky
        p.UpdatedAt = DateTime.UtcNow;
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException)
        {
            // Concurrent first write for the same (user, lesson): reload and apply on top.
            db.ChangeTracker.Clear();
            p = await db.LessonProgress.FirstAsync(x => x.UserId == uid && x.LessonId == lessonId);
            p.PositionSeconds = pos; p.Completed = p.Completed || input.Completed; p.UpdatedAt = DateTime.UtcNow;
            await db.SaveChangesAsync();
        }
        return new LessonProgressDto(p.PositionSeconds, p.Completed, p.UpdatedAt);
    }

    private async Task<Enrollment> EnsureEnrollment(Guid uid, Guid courseId)
    {
        var e = await db.Enrollments.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == uid && x.CourseId == courseId);
        if (e is not null) return e;
        e = new Enrollment { UserId = uid, CourseId = courseId };
        db.Enrollments.Add(e);
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException)
        {
            db.Entry(e).State = EntityState.Detached;
            e = await db.Enrollments.AsNoTracking().FirstAsync(x => x.UserId == uid && x.CourseId == courseId);
        }
        return e;
    }

    public async Task<EnrollmentResult> Enroll(Guid courseId)
    {
        var uid = me.RequireId();
        var c = await db.Courses.AsNoTracking().FirstOrDefaultAsync(x => x.Id == courseId);
        if (c is null || !AccessService.IsLive(c.Status)) throw AppException.NotFound("Course");
        var e = await EnsureEnrollment(uid, courseId);
        return new EnrollmentResult(e.Id, e.CourseId, e.CreatedAt);
    }

    public async Task<DashboardDto> Dashboard()
    {
        var uid = me.RequireId();
        var enrollments = await (from e in db.Enrollments.AsNoTracking()
                                 join c in db.Courses.AsNoTracking() on e.CourseId equals c.Id
                                 where e.UserId == uid
                                 orderby e.CreatedAt descending
                                 select new { e, c.Id, c.Slug, c.Title }).ToListAsync();
        var courseIds = enrollments.Select(x => x.Id).ToList();
        var lessons = await (from l in db.Lessons.AsNoTracking()
                             join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                             where courseIds.Contains(m.CourseId)
                             select new { l.Id, m.CourseId }).ToListAsync();
        var lessonCourse = lessons.ToDictionary(x => x.Id, x => x.CourseId);
        var lessonIds = lessons.Select(x => x.Id).ToList();
        var progress = await db.LessonProgress.AsNoTracking().Where(p => p.UserId == uid && lessonIds.Contains(p.LessonId)).ToListAsync();

        var enrollDtos = enrollments.Select(x =>
        {
            var total = lessons.Count(l => l.CourseId == x.Id);
            var mine = progress.Where(p => lessonCourse[p.LessonId] == x.Id).ToList();
            var done = mine.Count(p => p.Completed);
            return new DashboardEnrollmentDto(new CourseRef(x.Id, x.Slug, x.Title), total == 0 ? 0 : (int)Math.Round(100.0 * done / total),
                done, total, mine.OrderByDescending(p => p.UpdatedAt).FirstOrDefault()?.LessonId, x.e.CreatedAt);
        }).ToList();

        var now = DateTime.UtcNow;
        var ents = await (from e in db.Entitlements.AsNoTracking()
                          join c in db.Courses.AsNoTracking() on e.CourseId equals c.Id
                          join p in db.Packages.AsNoTracking() on e.PackageId equals p.Id into pj
                          from p in pj.DefaultIfEmpty()
                          where e.UserId == uid && e.RevokedAt == null
                          orderby e.StartsAt descending
                          select new { e, c.Id, c.Slug, c.Title, PackageTitle = p == null ? null : p.Title }).ToListAsync();
        var entDtos = ents.Select(x => new DashboardEntitlementDto(x.e.Id, new CourseRef(x.Id, x.Slug, x.Title), x.e.PackageId, x.PackageTitle,
            x.e.Source.ToString(), x.e.StartsAt, x.e.EndsAt, x.e.StartsAt <= now && (x.e.EndsAt == null || x.e.EndsAt > now))).ToList();

        var certs = await db.Certificates.AsNoTracking().Where(c => c.UserId == uid).OrderByDescending(c => c.IssuedAt)
            .Select(c => new DashboardCertificateDto(c.Id, c.Code, c.CourseId, c.CourseTitle, c.ScorePercent, c.Status.ToString(), c.IssuedAt)).ToListAsync();

        var attempts = await (from a in db.Attempts.AsNoTracking()
                              join s in db.Assessments.AsNoTracking() on a.AssessmentId equals s.Id
                              where a.UserId == uid
                              orderby a.StartedAt descending
                              select new { a, s.Title }).Take(10).ToListAsync();
        var attemptDtos = attempts.Select(x => new DashboardAttemptDto(x.a.Id, x.a.AssessmentId, x.Title, x.a.Status.ToString(), x.a.StartedAt,
            x.a.SubmittedAt, x.a.ScorePercent, x.a.Passed)).ToList();

        return new DashboardDto(enrollDtos, entDtos, certs, attemptDtos);
    }
}
