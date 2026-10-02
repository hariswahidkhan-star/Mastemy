using System.Net;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Account;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.StudyTools;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.StudyTools;

public class TimeZoneAndCalendarFeedTests(StudyToolsFixture f) : IClassFixture<StudyToolsFixture>
{
    private const string NewYork = "America/New_York";
    private static readonly TimeZoneInfo Ny = TimeZoneInfo.FindSystemTimeZoneById(NewYork);
    private static readonly DayOfWeek[] AllDays = Enum.GetValues<DayOfWeek>();

    private async Task<User> NewStudent(string? timeZone = null)
    {
        var u = new User { Email = $"tz-{Guid.NewGuid():N}@t", DisplayName = "Learner", PasswordHash = "x" };
        u.NormalizedEmail = u.Email.ToUpperInvariant();
        u.Roles.Add(new UserRole { UserId = u.Id, Role = Roles.Student });
        await f.WithDb(async db =>
        {
            db.Users.Add(u);
            if (timeZone is not null) db.Set<AccountProfile>().Add(new AccountProfile { UserId = u.Id, TimeZone = timeZone });
            await db.SaveChangesAsync();
        });
        return u;
    }

    private StudioCourseDto? _course;
    private async Task<StudioCourseDto> Course()
    {
        if (_course is not null) return _course;
        _course = await f.CreateCourse("TZ Course " + Guid.NewGuid().ToString("N")[..4], modules: 1, lessons: 3);
        await f.Publish(_course.Id);
        return _course;
    }

    [Fact]
    public async Task Plan_is_scheduled_at_the_local_hour_of_the_profile_time_zone()
    {
        var c = await Course();
        var s = await NewStudent(NewYork);
        var cl = f.Client(s);
        var req = new StudyPlanRequest([c.Id], DateTime.UtcNow.Date.AddDays(60), 30, [DayOfWeek.Tuesday, DayOfWeek.Friday], null, false, SessionHour: 9);
        var plan = await f.Read<StudyPlanDto>(await f.Put(cl, "/api/me/study-plan", req));
        Assert.Equal((9, NewYork), (plan.SessionHour, plan.TimeZone));
        var items = plan.Weeks.SelectMany(w => w.Items).ToList();
        Assert.Equal(3, items.Count);
        Assert.All(items, i =>
        {
            var local = TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(i.ScheduledAt, DateTimeKind.Utc), Ny);
            Assert.Equal(9, local.Hour);
            Assert.Contains(local.DayOfWeek, new[] { DayOfWeek.Tuesday, DayOfWeek.Friday });
            Assert.Contains(i.ScheduledAt.Hour, new[] { 13, 14 }); // 09:00 EDT = 13Z, 09:00 EST = 14Z
        });
        var todayLocal = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, Ny).Date;
        Assert.Equal(StudyPlanService.LocalToUtc(todayLocal.AddHours(9), Ny).Hour, plan.SessionHourUtc);

        // Legacy clients send sessionHourUtc: it becomes the matching local hour and the plan is still zoned.
        var legacy = await f.Read<StudyPlanDto>(await f.Put(cl, "/api/me/study-plan", new StudyPlanRequest([c.Id], DateTime.UtcNow.Date.AddDays(60), 30, AllDays.ToList(), 18, false)));
        Assert.Equal(NewYork, legacy.TimeZone);
        Assert.Equal(18, legacy.SessionHourUtc);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Put(cl, "/api/me/study-plan", req with { SessionHour = 24 })).StatusCode);

        // No profile: UTC fallback, Z times in the ICS.
        var utcUser = await NewStudent();
        var utcPlan = await f.Read<StudyPlanDto>(await f.Put(f.Client(utcUser), "/api/me/study-plan", req));
        Assert.Equal("UTC", utcPlan.TimeZone);
        Assert.All(utcPlan.Weeks.SelectMany(w => w.Items), i => Assert.Equal(9, i.ScheduledAt.Hour));
        var utcIcs = await (await f.Client(utcUser).GetAsync("/api/me/study-plan.ics")).Content.ReadAsStringAsync();
        Assert.DoesNotContain("VTIMEZONE", utcIcs);
        Assert.Matches(@"DTSTART:\d{8}T090000Z", utcIcs);
    }

    [Fact]
    public async Task Ics_uses_tzid_with_a_matching_vtimezone_and_reminders_show_local_time()
    {
        var c = await Course();
        var s = await NewStudent(NewYork);
        var cl = f.Client(s);
        var plan = await f.Read<StudyPlanDto>(await f.Put(cl, "/api/me/study-plan",
            new StudyPlanRequest([c.Id], DateTime.UtcNow.Date.AddDays(60), 15, [DayOfWeek.Monday], null, true, SessionHour: 7)));
        var ics = await (await cl.GetAsync("/api/me/study-plan.ics")).Content.ReadAsStringAsync();
        var lines = ics.Replace("\r\n ", "").Split("\r\n", StringSplitOptions.RemoveEmptyEntries);
        Assert.Contains("X-WR-TIMEZONE:" + NewYork, lines);
        Assert.Single(lines, l => l == "BEGIN:VTIMEZONE");
        Assert.Contains("TZID:" + NewYork, lines);
        Assert.True(Array.IndexOf(lines, "END:VTIMEZONE") < Array.IndexOf(lines, "BEGIN:VEVENT"));
        var starts = lines.Where(l => l.StartsWith("DTSTART;")).ToList();
        Assert.Equal(3, starts.Count);
        Assert.All(starts, l => Assert.Matches($@"^DTSTART;TZID={NewYork}:\d{{8}}T070000$", l));
        Assert.All(lines.Where(l => l.StartsWith("DTEND;")), l => Assert.StartsWith($"DTEND;TZID={NewYork}:", l));

        var first = plan.Weeks.SelectMany(w => w.Items).Min(i => i.ScheduledAt);
        var worker = f.Factory.Services.GetRequiredService<StudyReminderWorker>();
        Assert.Equal(1, await worker.RunOnce(first.AddMinutes(-10), TimeSpan.FromHours(1)));
        await f.WithDb(async db =>
        {
            var n = await db.Notifications.SingleAsync(x => x.UserId == s.Id && x.Kind == StudyReminderWorker.Kind);
            Assert.Contains($"07:00 {NewYork}", n.Title);
        });
    }

    [Fact]
    public void Local_to_utc_handles_dst_gaps_and_overlaps()
    {
        // Normal: 09:00 EST (UTC-5) in January.
        Assert.Equal(new DateTime(2026, 1, 13, 14, 0, 0), StudyPlanService.LocalToUtc(new DateTime(2026, 1, 13, 9, 0, 0), Ny));
        // Summer: 09:00 EDT (UTC-4).
        Assert.Equal(new DateTime(2026, 7, 14, 13, 0, 0), StudyPlanService.LocalToUtc(new DateTime(2026, 7, 14, 9, 0, 0), Ny));
        // 02:30 does not exist on 2026-03-08: interpreted with the pre-gap offset (= 03:30 EDT).
        var gap = StudyPlanService.LocalToUtc(new DateTime(2026, 3, 8, 2, 30, 0), Ny);
        Assert.Equal(new DateTime(2026, 3, 8, 7, 30, 0), gap);
        Assert.Equal(3, TimeZoneInfo.ConvertTimeFromUtc(gap, Ny).Hour);
        // 01:30 occurs twice on 2026-11-01: first (EDT) occurrence.
        Assert.Equal(new DateTime(2026, 11, 1, 5, 30, 0), StudyPlanService.LocalToUtc(new DateTime(2026, 11, 1, 1, 30, 0), Ny));
        Assert.Equal(DateTimeKind.Utc, gap.Kind);
    }

    [Fact]
    public void Vtimezone_lists_the_transitions_in_range()
    {
        var lines = IcsWriter.VTimeZone(Ny, new DateTime(2026, 2, 1, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 4, 1, 0, 0, 0, DateTimeKind.Utc)).ToList();
        Assert.Equal("BEGIN:VTIMEZONE", lines[0]);
        Assert.Equal("END:VTIMEZONE", lines[^1]);
        var daylight = lines.IndexOf("BEGIN:DAYLIGHT");
        Assert.True(daylight > 0);
        Assert.Equal(["DTSTART:20260308T020000", "TZOFFSETFROM:-0500", "TZOFFSETTO:-0400"], lines.Skip(daylight + 1).Take(3).ToList());
        Assert.Equal(1, lines.Count(l => l == "BEGIN:DAYLIGHT"));
        Assert.Equal(1, lines.Count(l => l == "BEGIN:STANDARD")); // the zone's state at the start of the range
    }

    [Fact]
    public async Task Calendar_subscription_token_is_hashed_revocable_and_anonymous()
    {
        var c = await Course();
        var s = await NewStudent(NewYork);
        var cl = f.Client(s);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Client().PostAsync("/api/me/study-plan/calendar-token", null)).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await cl.PostAsync("/api/me/study-plan/calendar-token", null)).StatusCode); // no plan yet
        await f.Read<StudyPlanDto>(await f.Put(cl, "/api/me/study-plan",
            new StudyPlanRequest([c.Id], DateTime.UtcNow.Date.AddDays(60), 30, [DayOfWeek.Monday], null, false, SessionHour: 8)));

        Assert.False((await f.Read<CalendarTokenStatusDto>(await cl.GetAsync("/api/me/study-plan/calendar-token"))).Active);
        var t1 = await f.Read<CalendarTokenDto>(await cl.PostAsync("/api/me/study-plan/calendar-token", null));
        Assert.Equal(43, t1.Token.Length);
        Assert.Equal($"/api/calendar/{t1.Token}.ics", t1.Url);
        await f.WithDb(async db =>
        {
            var row = await db.Set<CalendarFeedToken>().SingleAsync(x => x.UserId == s.Id);
            Assert.NotEqual(t1.Token, row.TokenHash);
            Assert.Equal(CalendarFeedService.Hash(t1.Token), row.TokenHash);
        });

        var anon = f.Client();
        var feed = await anon.GetAsync(t1.Url);
        Assert.Equal(HttpStatusCode.OK, feed.StatusCode);
        Assert.Equal("text/calendar", feed.Content.Headers.ContentType!.MediaType);
        var body = await feed.Content.ReadAsStringAsync();
        Assert.StartsWith("BEGIN:VCALENDAR", body);
        Assert.Contains($"DTSTART;TZID={NewYork}:", body);
        Assert.True((await f.Read<CalendarTokenStatusDto>(await cl.GetAsync("/api/me/study-plan/calendar-token"))).LastUsedAt is not null);

        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync("/api/calendar/not-a-token.ics")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync($"/api/calendar/{new string('A', 43)}.ics")).StatusCode);

        // Rotation revokes the old URL; DELETE revokes the current one.
        var t2 = await f.Read<CalendarTokenDto>(await cl.PostAsync("/api/me/study-plan/calendar-token", null));
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync(t1.Url)).StatusCode);
        Assert.Equal(HttpStatusCode.OK, (await anon.GetAsync(t2.Url)).StatusCode);
        // A suspended account's feed stops working.
        await f.WithDb(db => db.Users.Where(u => u.Id == s.Id).ExecuteUpdateAsync(x => x.SetProperty(u => u.IsSuspended, true)));
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync(t2.Url)).StatusCode);
        await f.WithDb(db => db.Users.Where(u => u.Id == s.Id).ExecuteUpdateAsync(x => x.SetProperty(u => u.IsSuspended, false)));
        Assert.Equal(HttpStatusCode.NoContent, (await cl.DeleteAsync("/api/me/study-plan/calendar-token")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await anon.GetAsync(t2.Url)).StatusCode);
        Assert.False((await f.Read<CalendarTokenStatusDto>(await cl.GetAsync("/api/me/study-plan/calendar-token"))).Active);
    }
}
