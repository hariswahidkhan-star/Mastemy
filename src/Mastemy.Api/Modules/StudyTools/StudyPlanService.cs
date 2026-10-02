using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.StudyTools;

public record StudyPlanRequest(List<Guid>? CourseIds, DateTime TargetDate, int WeeklyMinutes, List<DayOfWeek>? SessionDays, int? SessionHourUtc,
    bool? RemindersEnabled);
public record StudyPlanItemDto(Guid Id, Guid CourseId, string CourseTitle, Guid LessonId, string LessonTitle, int DurationSeconds,
    DateTime ScheduledAt, bool Completed);
public record StudyPlanWeekDto(DateTime WeekStart, int PlannedMinutes, List<StudyPlanItemDto> Items);
public record StudyPlanDto(Guid Id, List<Guid> CourseIds, DateTime TargetDate, int WeeklyMinutes, List<DayOfWeek> SessionDays, int SessionHourUtc,
    bool RemindersEnabled, bool FitsBeforeTarget, DateTime? FinishesAt, int TotalLessons, int RemainingLessons, DateTime UpdatedAt,
    List<StudyPlanWeekDto> Weeks);

/// <summary>
/// Study plans (spec §16): picks the remaining (not yet completed) published lessons of the goal courses in curriculum order and
/// spreads them over the chosen weekly session days within the weekly minute budget. Regenerated on every save.
/// </summary>
public class StudyPlanService(AppDbContext db, ICurrentUser me, CourseSnapshotService snapshots)
{
    public const int MaxCourses = 10, MaxItems = 3000, DefaultLessonSeconds = 600, MinLessonSeconds = 120;

    public async Task<StudyPlanDto?> Get()
    {
        var uid = me.RequireId();
        var plan = await db.Set<StudyPlan>().AsNoTracking().FirstOrDefaultAsync(p => p.UserId == uid);
        return plan is null ? null : await ToDto(plan);
    }

    public async Task<StudyPlanDto> Save(StudyPlanRequest req)
    {
        var uid = me.RequireId();
        var courseIds = (req.CourseIds ?? []).Distinct().ToList();
        if (courseIds.Count is 0 or > MaxCourses) throw AppException.Bad($"courseIds must contain 1 to {MaxCourses} courses.");
        var now = DateTime.UtcNow;
        var target = (req.TargetDate.Kind == DateTimeKind.Unspecified ? DateTime.SpecifyKind(req.TargetDate, DateTimeKind.Utc) : req.TargetDate.ToUniversalTime()).Date;
        if (target <= now.Date) throw AppException.Bad("targetDate must be in the future.");
        if (target > now.Date.AddYears(3)) throw AppException.Bad("targetDate must be within 3 years.");
        if (req.WeeklyMinutes is < 15 or > 3000) throw AppException.Bad("weeklyMinutes must be between 15 and 3000.");
        var days = (req.SessionDays is { Count: > 0 } d ? d : [DayOfWeek.Monday, DayOfWeek.Wednesday, DayOfWeek.Friday]).Distinct().ToList();
        if (days.Any(x => !Enum.IsDefined(x))) throw AppException.Bad("sessionDays contains an invalid day.");
        var hour = req.SessionHourUtc ?? 18;
        if (hour is < 0 or > 23) throw AppException.Bad("sessionHourUtc must be between 0 and 23.");

        var live = new List<PublishedCourse>();
        foreach (var id in courseIds) live.Add(await snapshots.TryLiveById(id) ?? throw AppException.NotFound("Course"));

        await using var tx = await db.Database.BeginTransactionAsync();
        var plan = await db.Set<StudyPlan>().FirstOrDefaultAsync(p => p.UserId == uid);
        if (plan is null) db.Set<StudyPlan>().Add(plan = new StudyPlan { UserId = uid });
        plan.TargetDate = target;
        plan.WeeklyMinutes = req.WeeklyMinutes;
        plan.SessionDaysMask = days.Aggregate(0, (m, x) => m | (1 << (int)x));
        plan.SessionHourUtc = hour;
        plan.RemindersEnabled = req.RemindersEnabled ?? false;
        plan.UpdatedAt = now;
        await db.Set<StudyPlanCourse>().Where(x => x.PlanId == plan.Id).ExecuteDeleteAsync();
        for (var i = 0; i < courseIds.Count; i++) db.Set<StudyPlanCourse>().Add(new StudyPlanCourse { PlanId = plan.Id, CourseId = courseIds[i], SortOrder = i });
        await Generate(plan, live, now);
        try { await db.SaveChangesAsync(); }
        catch (DbUpdateException) { throw AppException.Conflict("Your study plan was changed concurrently. Retry.", "plan_conflict"); }
        await tx.CommitAsync();
        return await ToDto(plan);
    }

    /// <summary>Re-schedules remaining lessons from now (e.g. after falling behind or finishing lessons early).</summary>
    public async Task<StudyPlanDto> Regenerate()
    {
        var uid = me.RequireId();
        var plan = await db.Set<StudyPlan>().FirstOrDefaultAsync(p => p.UserId == uid) ?? throw AppException.NotFound("Study plan");
        var ids = await db.Set<StudyPlanCourse>().Where(x => x.PlanId == plan.Id).OrderBy(x => x.SortOrder).Select(x => x.CourseId).ToListAsync();
        var live = new List<PublishedCourse>();
        foreach (var id in ids) if (await snapshots.TryLiveById(id) is { } pc) live.Add(pc);
        await using var tx = await db.Database.BeginTransactionAsync();
        plan.UpdatedAt = DateTime.UtcNow;
        await Generate(plan, live, DateTime.UtcNow);
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return await ToDto(plan);
    }

    public async Task Delete()
    {
        var uid = me.RequireId();
        var plan = await db.Set<StudyPlan>().FirstOrDefaultAsync(p => p.UserId == uid) ?? throw AppException.NotFound("Study plan");
        db.Set<StudyPlan>().Remove(plan);
        await db.SaveChangesAsync();
    }

    public static List<DayOfWeek> Days(int mask) => Enum.GetValues<DayOfWeek>().Where(d => (mask & (1 << (int)d)) != 0).ToList();

    public static DateTime WeekStartOf(DateTime d) => d.Date.AddDays(-(((int)d.DayOfWeek + 6) % 7));

    private async Task Generate(StudyPlan plan, List<PublishedCourse> courses, DateTime now)
    {
        await db.Set<StudyPlanItem>().Where(x => x.PlanId == plan.Id).ExecuteDeleteAsync();
        var lessons = courses.SelectMany(pc => pc.Payload.OrderedLessons().Select(x => (Course: pc, x.Lesson))).ToList();
        var lessonIds = lessons.Select(x => x.Lesson.Id).ToList();
        var done = (await db.LessonProgress.AsNoTracking().Where(p => p.UserId == plan.UserId && p.Completed && lessonIds.Contains(p.LessonId))
            .Select(p => p.LessonId).ToListAsync()).ToHashSet();
        var queue = new Queue<(PublishedCourse Course, Catalog.SnapshotLesson Lesson)>(lessons.Where(x => !done.Contains(x.Lesson.Id)));
        var days = Days(plan.SessionDaysMask);
        var perSession = plan.WeeklyMinutes * 60 / Math.Max(1, days.Count);
        var slot = now.Date.AddHours(plan.SessionHourUtc);
        var sort = 0;
        DateTime? last = null;
        while (queue.Count > 0 && sort < MaxItems)
        {
            while (!days.Contains(slot.DayOfWeek) || slot <= now) slot = slot.AddDays(1);
            var used = 0;
            while (queue.Count > 0 && sort < MaxItems)
            {
                var (pc, l) = queue.Peek();
                var dur = l.DurationSeconds > 0 ? Math.Max(MinLessonSeconds, l.DurationSeconds) : DefaultLessonSeconds;
                if (used > 0 && used + dur > perSession) break; // a session always holds at least one lesson
                queue.Dequeue();
                db.Set<StudyPlanItem>().Add(new StudyPlanItem
                {
                    PlanId = plan.Id, UserId = plan.UserId, CourseId = pc.Course.Id, LessonId = l.Id, CourseTitle = Cap(pc.Payload.Title),
                    LessonTitle = Cap(l.Title), DurationSeconds = dur, WeekStart = WeekStartOf(slot), ScheduledAt = slot, SortOrder = ++sort,
                });
                used += dur;
            }
            last = slot;
            slot = slot.AddDays(1);
        }
        plan.FitsBeforeTarget = last is null || last.Value < plan.TargetDate.AddDays(1);
    }

    private static string Cap(string s) => s.Length <= 500 ? s : s[..500];

    private async Task<StudyPlanDto> ToDto(StudyPlan plan)
    {
        var courseIds = await db.Set<StudyPlanCourse>().AsNoTracking().Where(x => x.PlanId == plan.Id).OrderBy(x => x.SortOrder).Select(x => x.CourseId).ToListAsync();
        var items = await db.Set<StudyPlanItem>().AsNoTracking().Where(x => x.PlanId == plan.Id).OrderBy(x => x.SortOrder).ToListAsync();
        var ids = items.Select(i => i.LessonId).ToList();
        var done = (await db.LessonProgress.AsNoTracking().Where(p => p.UserId == plan.UserId && p.Completed && ids.Contains(p.LessonId))
            .Select(p => p.LessonId).ToListAsync()).ToHashSet();
        var weeks = items.GroupBy(i => i.WeekStart).OrderBy(g => g.Key).Select(g => new StudyPlanWeekDto(g.Key, g.Sum(i => i.DurationSeconds) / 60,
            g.Select(i => new StudyPlanItemDto(i.Id, i.CourseId, i.CourseTitle, i.LessonId, i.LessonTitle, i.DurationSeconds, i.ScheduledAt,
                done.Contains(i.LessonId))).ToList())).ToList();
        return new StudyPlanDto(plan.Id, courseIds, plan.TargetDate, plan.WeeklyMinutes, Days(plan.SessionDaysMask), plan.SessionHourUtc,
            plan.RemindersEnabled, plan.FitsBeforeTarget, items.Count == 0 ? null : items.Max(i => i.ScheduledAt), items.Count,
            items.Count(i => !done.Contains(i.LessonId)), plan.UpdatedAt, weeks);
    }

    /// <summary>The plan as an iCalendar feed: one VEVENT per study session.</summary>
    public async Task<string> Ics()
    {
        var uid = me.RequireId();
        var plan = await db.Set<StudyPlan>().AsNoTracking().FirstOrDefaultAsync(p => p.UserId == uid) ?? throw AppException.NotFound("Study plan");
        var items = await db.Set<StudyPlanItem>().AsNoTracking().Where(x => x.PlanId == plan.Id).OrderBy(x => x.SortOrder).ToListAsync();
        var events = items.GroupBy(i => i.ScheduledAt).OrderBy(g => g.Key).Select(g =>
        {
            var list = g.OrderBy(i => i.SortOrder).ToList();
            var minutes = Math.Max(15, (int)Math.Ceiling(list.Sum(i => i.DurationSeconds) / 60.0));
            var courses = list.Select(i => i.CourseTitle).Distinct().ToList();
            var summary = $"Study: {string.Join(", ", courses)} ({list.Count} lesson{(list.Count == 1 ? "" : "s")})";
            var desc = string.Join("\n", list.Select(i => $"• {i.CourseTitle} — {i.LessonTitle} ({Math.Max(1, i.DurationSeconds / 60)} min)"));
            return new IcsEvent($"{plan.Id:N}-{g.Key:yyyyMMddHHmm}@mastemy", g.Key, g.Key.AddMinutes(minutes), summary, desc, null,
                plan.RemindersEnabled ? 15 : null);
        });
        return IcsWriter.Calendar("Mastemy study plan", events, DateTime.UtcNow);
    }
}
