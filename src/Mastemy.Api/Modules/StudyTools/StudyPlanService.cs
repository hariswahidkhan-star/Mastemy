using Mastemy.Api.Data;
using Mastemy.Api.Domain;
using Mastemy.Api.Infrastructure;
using Mastemy.Api.Modules.Catalog;
using Microsoft.EntityFrameworkCore;

namespace Mastemy.Api.Modules.StudyTools;

/// <summary>SessionHour is the local start hour in the learner's profile time zone. SessionHourUtc (legacy) is converted to the
/// local hour it corresponds to today; SessionHour wins when both are given.</summary>
public record StudyPlanRequest(List<Guid>? CourseIds, DateTime TargetDate, int WeeklyMinutes, List<DayOfWeek>? SessionDays, int? SessionHourUtc,
    bool? RemindersEnabled, int? SessionHour = null);
public record StudyPlanItemDto(Guid Id, Guid CourseId, string CourseTitle, Guid LessonId, string LessonTitle, int DurationSeconds,
    DateTime ScheduledAt, bool Completed);
public record StudyPlanWeekDto(DateTime WeekStart, int PlannedMinutes, List<StudyPlanItemDto> Items);
/// <summary>ScheduledAt values are UTC instants; WeekStart is the local (plan time zone) Monday. SessionHourUtc is the UTC hour of
/// SessionHour today (informational; it shifts with DST).</summary>
public record StudyPlanDto(Guid Id, List<Guid> CourseIds, DateTime TargetDate, int WeeklyMinutes, List<DayOfWeek> SessionDays, int SessionHourUtc,
    bool RemindersEnabled, bool FitsBeforeTarget, DateTime? FinishesAt, int TotalLessons, int RemainingLessons, DateTime UpdatedAt,
    List<StudyPlanWeekDto> Weeks, int SessionHour = 0, string TimeZone = "UTC");

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
        if (req.SessionHour is < 0 or > 23) throw AppException.Bad("sessionHour must be between 0 and 23.");
        if (req.SessionHourUtc is < 0 or > 23) throw AppException.Bad("sessionHourUtc must be between 0 and 23.");
        var tzId = await ProfileTimeZone(uid);
        var tz = Zone(tzId);
        var hour = req.SessionHour
                   ?? (req.SessionHourUtc is { } hu ? TimeZoneInfo.ConvertTimeFromUtc(now.Date.AddHours(hu), tz).Hour : 18);

        var live = new List<PublishedCourse>();
        foreach (var id in courseIds) live.Add(await snapshots.TryLiveById(id) ?? throw AppException.NotFound("Course"));

        await using var tx = await db.Database.BeginTransactionAsync();
        var plan = await db.Set<StudyPlan>().FirstOrDefaultAsync(p => p.UserId == uid);
        if (plan is null) db.Set<StudyPlan>().Add(plan = new StudyPlan { UserId = uid });
        plan.TargetDate = target;
        plan.WeeklyMinutes = req.WeeklyMinutes;
        plan.SessionDaysMask = days.Aggregate(0, (m, x) => m | (1 << (int)x));
        plan.SessionHour = hour;
        plan.TimeZone = tzId;
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

    private async Task<string> ProfileTimeZone(Guid uid)
    {
        var id = await db.Set<Account.AccountProfile>().AsNoTracking().Where(p => p.UserId == uid).Select(p => p.TimeZone).FirstOrDefaultAsync();
        return string.IsNullOrWhiteSpace(id) || !TimeZoneInfo.TryFindSystemTimeZoneById(id, out _) ? "UTC" : id;
    }

    /// <summary>Resolves an IANA id (UTC when unknown).</summary>
    public static TimeZoneInfo Zone(string? id) =>
        !string.IsNullOrWhiteSpace(id) && TimeZoneInfo.TryFindSystemTimeZoneById(id, out var tz) ? tz : TimeZoneInfo.Utc;

    /// <summary>
    /// Local wall-clock time → UTC. A time inside a spring-forward gap moves forward by the gap;
    /// an ambiguous fall-back time resolves to its first (daylight) occurrence.
    /// </summary>
    public static DateTime LocalToUtc(DateTime local, TimeZoneInfo tz)
    {
        local = DateTime.SpecifyKind(local, DateTimeKind.Unspecified);
        if (tz.IsInvalidTime(local))
        {
            // Interpret with the offset in force just before the gap (02:30 in a 02:00→03:00 gap becomes 03:30 local).
            return DateTime.SpecifyKind(local - tz.GetUtcOffset(local.AddHours(-12)), DateTimeKind.Utc);
        }
        if (tz.IsAmbiguousTime(local))
        {
            var offsets = tz.GetAmbiguousTimeOffsets(local);
            return DateTime.SpecifyKind(local - offsets.Max(), DateTimeKind.Utc);
        }
        return TimeZoneInfo.ConvertTimeToUtc(local, tz);
    }

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
        // Sessions are placed on local calendar days at the local hour, then stored as UTC instants.
        var tz = Zone(plan.TimeZone);
        var localDay = TimeZoneInfo.ConvertTimeFromUtc(now, tz).Date;
        var sort = 0;
        DateTime? last = null;
        while (queue.Count > 0 && sort < MaxItems)
        {
            DateTime slot;
            while (true)
            {
                slot = LocalToUtc(localDay.AddHours(plan.SessionHour), tz);
                if (days.Contains(localDay.DayOfWeek) && slot > now) break;
                localDay = localDay.AddDays(1);
            }
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
                    LessonTitle = Cap(l.Title), DurationSeconds = dur, WeekStart = WeekStartOf(localDay), ScheduledAt = slot, SortOrder = ++sort,
                });
                used += dur;
            }
            last = localDay;
            localDay = localDay.AddDays(1);
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
        var tz = Zone(plan.TimeZone);
        var hourUtc = LocalToUtc(TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, tz).Date.AddHours(plan.SessionHour), tz).Hour;
        return new StudyPlanDto(plan.Id, courseIds, plan.TargetDate, plan.WeeklyMinutes, Days(plan.SessionDaysMask), hourUtc,
            plan.RemindersEnabled, plan.FitsBeforeTarget, items.Count == 0 ? null : items.Max(i => i.ScheduledAt), items.Count,
            items.Count(i => !done.Contains(i.LessonId)), plan.UpdatedAt, weeks, plan.SessionHour, plan.TimeZone);
    }

    /// <summary>The plan as an iCalendar feed: one VEVENT per study session.</summary>
    public Task<string> Ics() => IcsFor(me.RequireId());

    /// <summary>The user's plan as iCalendar, with times in the plan's time zone (TZID + VTIMEZONE; UTC plans use Z times).</summary>
    public async Task<string> IcsFor(Guid uid)
    {
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
        return IcsWriter.Calendar("Mastemy study plan", events.ToList(), DateTime.UtcNow, Zone(plan.TimeZone));
    }
}
