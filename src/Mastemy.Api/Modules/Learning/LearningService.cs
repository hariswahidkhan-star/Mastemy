using System.Text;
using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.Learning;

// ---------- DTOs ----------
public record LessonProgressDto(int PositionSeconds, bool Completed, DateTime UpdatedAt);
public record CurriculumLessonDto(Guid Id, string Code, string Title, int SortOrder, bool IsPreview, int DurationSeconds,
    string? YoutubeVideoId, LessonProgressDto? Progress, string? VideoUnavailableReason = null);
public record CurriculumModuleDto(Guid Id, string Code, string Title, int SortOrder, List<CurriculumLessonDto> Lessons);
public record CurriculumDto(Guid CourseId, string Slug, string Title, string Subtitle, string Language, string Level,
    bool Enrolled, bool HasPremiumAccess, int ProgressPercent, Guid? LastLessonId, List<CurriculumModuleDto> Modules);
public record LessonAssessmentDto(Guid Id, string Title, string Kind, string Mode, bool IsPremium, int QuestionCount, decimal PassPercent,
    int? TimeLimitMinutes, int? MaxAttempts, string MultiSelectScoring, bool CountsTowardCertificate, Guid? LessonId, Guid? ModuleId);
public record LessonInfoDto(Guid Id, Guid ModuleId, Guid CourseId, string CourseSlug, string CourseTitle, string Code, string Title,
    string Objective, int SortOrder, bool IsPreview, int DurationSeconds, int NotesVersion, Guid? PrevLessonId, Guid? NextLessonId);
public record LessonViewDto(LessonInfoDto Lesson, string? YoutubeVideoId, string NotesMarkdown, string? PremiumNotesMarkdown,
    bool PremiumLocked, bool HasPremiumNotes, List<LessonAssessmentDto> Assessments, LessonProgressDto? Progress,
    string? VideoUnavailableReason = null);
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

/// <summary>
/// Learner reads. Live courses are rendered from their latest published snapshot (see <see cref="CourseSnapshotService"/>),
/// so working-copy edits made while a course is Updating or in re-review are not visible until re-published. Progress is
/// keyed by lesson id and keeps working for lessons removed from the working copy after the snapshot.
/// </summary>
public class LearningService(AppDbContext db, ICurrentUser me, AccessService access, CourseSnapshotService snapshots)
{
    public async Task<CurriculumDto> GetCourse(string slug)
    {
        var pc = await snapshots.LiveBySlug(slug);
        var (c, payload) = (pc.Course, pc.Payload);
        var modules = payload.Modules.OrderBy(m => m.SortOrder).ToList();
        var lessonIds = modules.SelectMany(m => m.Lessons).Select(l => l.Id).ToList();
        var videos = await snapshots.VideoStates(modules.SelectMany(m => m.Lessons));
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
        return new CurriculumDto(c.Id, c.Slug, payload.Title, payload.Subtitle, payload.Language, payload.Level.ToString(), enrolled, premium,
            total == 0 ? 0 : (int)Math.Round(100.0 * done / total), last,
            modules.Select(m => new CurriculumModuleDto(m.Id, m.Code, m.Title, m.SortOrder,
                m.Lessons.OrderBy(l => l.SortOrder).Select(l =>
                {
                    var v = videos[l.Id];
                    return new CurriculumLessonDto(l.Id, l.Code, l.Title, l.SortOrder, l.IsPreview, v.DurationSeconds, v.YoutubeVideoId,
                        progress.TryGetValue(l.Id, out var p) ? new LessonProgressDto(p.PositionSeconds, p.Completed, p.UpdatedAt) : null,
                        v.UnavailableReason);
                }).ToList())).ToList());
    }

    public async Task<LessonViewDto> GetLesson(Guid lessonId)
    {
        var (pc, module, l) = await snapshots.LiveLesson(lessonId);
        var c = pc.Course;
        var ordered = pc.Payload.OrderedLessons().Select(x => x.Lesson.Id).ToList();
        var idx = ordered.IndexOf(l.Id);
        var video = (await snapshots.VideoStates([l]))[l.Id];
        var premium = await access.HasPremiumAccess(c.Id);
        var hasPremiumNotes = !string.IsNullOrWhiteSpace(l.PremiumNotesMarkdown);
        // Lesson practice plus the module's tests and course-wide exams, so every assessment is reachable from the lesson page.
        // Published settings only: assessments added or changed in the draft appear after the next publish.
        var assessments = (pc.Payload.Assessments ?? [])
            .Where(a => a.LessonId == l.Id || (a.LessonId == null && (a.ModuleId == module.Id || a.ModuleId == null)))
            .OrderBy(a => a.LessonId == null).ThenBy(a => a.ModuleId == null).ThenBy(a => a.Title, StringComparer.Ordinal).ToList();
        LessonProgressDto? prog = null;
        if (me.Id is { } uid)
        {
            var p = await db.LessonProgress.AsNoTracking().FirstOrDefaultAsync(x => x.UserId == uid && x.LessonId == l.Id);
            if (p is not null) prog = new LessonProgressDto(p.PositionSeconds, p.Completed, p.UpdatedAt);
        }
        var info = new LessonInfoDto(l.Id, module.Id, c.Id, c.Slug, pc.Payload.Title, l.Code, l.Title, l.Objective, l.SortOrder, l.IsPreview,
            video.DurationSeconds, l.NotesVersion,
            idx > 0 ? ordered[idx - 1] : null, idx >= 0 && idx < ordered.Count - 1 ? ordered[idx + 1] : null);
        return new LessonViewDto(info, video.YoutubeVideoId, l.NotesMarkdown,
            premium ? l.PremiumNotesMarkdown : null, hasPremiumNotes && !premium, hasPremiumNotes,
            assessments.Select(a => new LessonAssessmentDto(a.Id, a.Title, a.Kind.ToString(), a.Mode.ToString(), a.IsPremium, a.QuestionCount,
                a.PassPercent, a.TimeLimitMinutes, a.MaxAttempts, a.MultiSelectScoring.ToString(), a.CountsTowardCertificate, a.LessonId,
                a.ModuleId)).ToList(), prog, video.UnavailableReason);
    }

    public async Task<LessonProgressDto> UpsertProgress(Guid lessonId, ProgressInput input)
    {
        var uid = me.RequireId();
        var (pc, _, l) = await snapshots.LiveLesson(lessonId);
        var c = pc.Course;
        var pos = Math.Max(0, input.PositionSeconds);
        var duration = l.DurationSeconds;
        // Progress is keyed by the snapshot lesson id (no FK to the working-copy row), so a lesson removed from the draft
        // keeps recording progress until the next publish retires it from the snapshot.
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
        await snapshots.LiveById(courseId);
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
                                 select new { e, c }).ToListAsync();
        // Lesson totals and titles come from the published snapshot of live courses (working copy only for courses no longer live).
        var liveCourses = enrollments.Select(x => x.c).Where(AccessService.IsLive).DistinctBy(c => c.Id).ToList();
        var published = await snapshots.ForCourses(liveCourses);
        var deadIds = enrollments.Select(x => x.c.Id).Where(id => !published.ContainsKey(id)).Distinct().ToList();
        var lessons = published.Values.SelectMany(p => p.Payload.Modules.SelectMany(m => m.Lessons).Select(l => new { l.Id, CourseId = p.Course.Id })).ToList();
        lessons.AddRange(await (from l in db.Lessons.AsNoTracking()
                                join m in db.Modules.AsNoTracking() on l.ModuleId equals m.Id
                                where deadIds.Contains(m.CourseId)
                                select new { l.Id, m.CourseId }).ToListAsync());
        var lessonCourse = lessons.GroupBy(x => x.Id).ToDictionary(g => g.Key, g => g.First().CourseId);
        string TitleOf(Course c) => published.TryGetValue(c.Id, out var p) ? p.Payload.Title : c.Title;
        var lessonIds = lessons.Select(x => x.Id).ToList();
        var progress = await db.LessonProgress.AsNoTracking().Where(p => p.UserId == uid && lessonIds.Contains(p.LessonId)).ToListAsync();

        var enrollDtos = enrollments.Select(x =>
        {
            var total = lessons.Count(l => l.CourseId == x.c.Id);
            var mine = progress.Where(p => lessonCourse[p.LessonId] == x.c.Id).ToList();
            var done = mine.Count(p => p.Completed);
            return new DashboardEnrollmentDto(new CourseRef(x.c.Id, x.c.Slug, TitleOf(x.c)), total == 0 ? 0 : (int)Math.Round(100.0 * done / total),
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
        // Published title for live courses (snapshot columns), working title only for courses no longer live.
        var entCards = await snapshots.CardsFor(ents.Select(x => x.Id).Distinct().ToList());
        var entDtos = ents.Select(x => new DashboardEntitlementDto(x.e.Id,
            new CourseRef(x.Id, x.Slug, entCards.TryGetValue(x.Id, out var card) ? card.Title : x.Title), x.e.PackageId, x.PackageTitle,
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
