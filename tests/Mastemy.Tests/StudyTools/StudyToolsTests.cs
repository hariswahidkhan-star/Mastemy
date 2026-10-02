using System.Net;
using System.Text;
using Mastemy.Api.Domain;
using Mastemy.Api.Modules.Catalog;
using Mastemy.Api.Modules.Learning;
using Mastemy.Api.Modules.StudyTools;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Mastemy.Tests.StudyTools;

public class StudyToolsTests(StudyToolsFixture f) : IClassFixture<StudyToolsFixture>
{
    private async Task<User> NewStudent()
    {
        var u = new User { Email = $"st-{Guid.NewGuid():N}@t", DisplayName = "Learner", PasswordHash = "x" };
        u.NormalizedEmail = u.Email.ToUpperInvariant();
        u.Roles.Add(new UserRole { UserId = u.Id, Role = Roles.Student });
        await f.WithDb(async db => { db.Users.Add(u); await db.SaveChangesAsync(); });
        return u;
    }

    private async Task<StudioCourseDto> LiveCourse(string title)
    {
        var c = await f.CreateCourse(title, modules: 2, lessons: 2);
        await f.Publish(c.Id);
        return c;
    }

    [Fact]
    public async Task Plan_schedules_remaining_lessons_within_weekly_budget()
    {
        var c = await LiveCourse("Plan Course");
        var s = await NewStudent();
        var cl = f.Client(s);
        var first = c.Modules[0].Lessons[0].Id;
        await f.Read<LessonProgressDto>(await f.Put(cl, $"/api/learn/lessons/{first}/progress", new ProgressInput(600, true)));

        var target = DateTime.UtcNow.Date.AddDays(60);
        var plan = await f.Read<StudyPlanDto>(await f.Put(cl, "/api/me/study-plan", new StudyPlanRequest([c.Id], target, 30,
            [DayOfWeek.Monday, DayOfWeek.Wednesday, DayOfWeek.Friday], 18, false)));
        var items = plan.Weeks.SelectMany(w => w.Items).ToList();
        Assert.Equal(3, items.Count); // completed lesson skipped
        Assert.DoesNotContain(items, i => i.LessonId == first);
        Assert.Equal(c.Modules.SelectMany(m => m.Lessons).Skip(1).Select(l => l.Id), items.Select(i => i.LessonId));
        Assert.All(items, i => Assert.Contains(i.ScheduledAt.DayOfWeek, new[] { DayOfWeek.Monday, DayOfWeek.Wednesday, DayOfWeek.Friday }));
        Assert.All(items, i => Assert.Equal(18, i.ScheduledAt.Hour));
        Assert.All(items, i => Assert.True(i.ScheduledAt > DateTime.UtcNow));
        Assert.Equal(3, items.Select(i => i.ScheduledAt).Distinct().Count()); // 10-minute sessions hold one 10-minute lesson
        Assert.True(plan.FitsBeforeTarget);
        Assert.All(plan.Weeks, w => Assert.Equal(DayOfWeek.Monday, w.WeekStart.DayOfWeek));

        // Bigger budget: all remaining lessons in one session.
        plan = await f.Read<StudyPlanDto>(await f.Put(cl, "/api/me/study-plan", new StudyPlanRequest([c.Id], target, 90, [DayOfWeek.Saturday], 7, false)));
        Assert.Single(plan.Weeks.SelectMany(w => w.Items).Select(i => i.ScheduledAt).Distinct());
        // Tight deadline cannot be met.
        plan = await f.Read<StudyPlanDto>(await f.Put(cl, "/api/me/study-plan", new StudyPlanRequest([c.Id], DateTime.UtcNow.Date.AddDays(1), 15, [DayOfWeek.Sunday], 7, false)));
        Assert.False(plan.FitsBeforeTarget);

        Assert.Equal(HttpStatusCode.BadRequest, (await f.Put(cl, "/api/me/study-plan", new StudyPlanRequest([c.Id], target, 5, null, null, null))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Put(cl, "/api/me/study-plan", new StudyPlanRequest([c.Id], DateTime.UtcNow.AddDays(-1), 60, null, null, null))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Put(cl, "/api/me/study-plan", new StudyPlanRequest([], target, 60, null, null, null))).StatusCode);
        var draft = await f.CreateCourse("Draft Plan Course");
        Assert.Equal(HttpStatusCode.NotFound, (await f.Put(cl, "/api/me/study-plan", new StudyPlanRequest([draft.Id], target, 60, null, null, null))).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Client().GetAsync("/api/me/study-plan")).StatusCode);
        // Plans are private: another learner has none.
        Assert.Equal(HttpStatusCode.NoContent, (await f.Client(await NewStudent()).GetAsync("/api/me/study-plan")).StatusCode);
    }

    [Fact]
    public async Task Ics_export_is_valid_rfc5545()
    {
        var c = await f.CreateCourse("ICS, Course; with \\ specials", modules: 1, lessons: 3);
        await f.Publish(c.Id);
        var s = await NewStudent();
        var cl = f.Client(s);
        await f.Read<StudyPlanDto>(await f.Put(cl, "/api/me/study-plan", new StudyPlanRequest([c.Id], DateTime.UtcNow.Date.AddDays(30), 30,
            [DayOfWeek.Tuesday, DayOfWeek.Thursday, DayOfWeek.Saturday], 9, true)));
        var res = await cl.GetAsync("/api/me/study-plan.ics");
        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        Assert.Equal("text/calendar", res.Content.Headers.ContentType!.MediaType);
        var bytes = await res.Content.ReadAsByteArrayAsync();
        var ics = Encoding.UTF8.GetString(bytes);
        Assert.StartsWith("BEGIN:VCALENDAR\r\nVERSION:2.0\r\n", ics);
        Assert.EndsWith("END:VCALENDAR\r\n", ics);
        Assert.DoesNotContain("\n", ics.Replace("\r\n", ""));
        var physical = ics.Split("\r\n");
        Assert.All(physical, l => Assert.True(Encoding.UTF8.GetByteCount(l) <= 75, l));
        var unfolded = ics.Replace("\r\n ", "").Split("\r\n", StringSplitOptions.RemoveEmptyEntries);
        Assert.Equal(3, unfolded.Count(l => l == "BEGIN:VEVENT"));
        Assert.Equal(3, unfolded.Count(l => l == "BEGIN:VALARM"));
        Assert.Equal(3, unfolded.Count(l => l.StartsWith("UID:")));
        Assert.Equal(unfolded.Count(l => l.StartsWith("UID:")), unfolded.Where(l => l.StartsWith("UID:")).Distinct().Count());
        Assert.All(unfolded.Where(l => l.StartsWith("DTSTART:")), l => Assert.Matches(@"^DTSTART:\d{8}T090000Z$", l));
        Assert.Contains(unfolded, l => l.StartsWith("SUMMARY:") && l.Contains(@"ICS\, Course\; with \\ specials"));
        Assert.Contains(unfolded, l => l.StartsWith("DESCRIPTION:") && !l.Contains('\n'));
        Assert.Equal(HttpStatusCode.NotFound, (await f.Client(await NewStudent()).GetAsync("/api/me/study-plan.ics")).StatusCode);
    }

    [Fact]
    public void Ics_escaping_and_folding_round_trip()
    {
        Assert.Equal(@"a\\b\;c\,d\ne\nf", IcsWriter.Escape("a\\b;c,d\r\ne\nf"));
        var text = "SUMMARY:" + string.Concat(Enumerable.Repeat("دورة تعلم الآلة ", 12));
        var folded = IcsWriter.Fold(text);
        Assert.All(folded.Split("\r\n"), l => Assert.True(Encoding.UTF8.GetByteCount(l) <= 75));
        Assert.Equal(text, folded.Replace("\r\n ", "").TrimEnd('\r', '\n'));
    }

    [Fact]
    public async Task Reminders_fire_once_per_session_and_respect_opt_out()
    {
        var c = await LiveCourse("Reminder Course");
        var s = await NewStudent();
        var plan = await f.Read<StudyPlanDto>(await f.Put(f.Client(s), "/api/me/study-plan", new StudyPlanRequest([c.Id], DateTime.UtcNow.Date.AddDays(40), 20,
            [DayOfWeek.Monday, DayOfWeek.Thursday], 12, true)));
        var firstSession = plan.Weeks.SelectMany(w => w.Items).Min(i => i.ScheduledAt);
        var worker = f.Factory.Services.GetRequiredService<StudyReminderWorker>();
        Assert.Equal(1, await worker.RunOnce(firstSession.AddMinutes(-30), TimeSpan.FromHours(1)));
        Assert.Equal(0, await worker.RunOnce(firstSession.AddMinutes(-20), TimeSpan.FromHours(1)));
        await f.WithDb(async db =>
        {
            var n = await db.Notifications.Where(x => x.UserId == s.Id && x.Kind == StudyReminderWorker.Kind).ToListAsync();
            Assert.Single(n);
            Assert.Contains("Reminder Course", n[0].Title);
        });

        // Opted-out user: claimed but no notification.
        var s2 = await NewStudent();
        var plan2 = await f.Read<StudyPlanDto>(await f.Put(f.Client(s2), "/api/me/study-plan", new StudyPlanRequest([c.Id], DateTime.UtcNow.Date.AddDays(40), 20,
            [DayOfWeek.Tuesday], 3, true)));
        await f.WithDb(async db => { db.NotificationPreferences.Add(new NotificationPreference { UserId = s2.Id, Kind = StudyReminderWorker.Kind, InApp = false }); await db.SaveChangesAsync(); });
        var t2 = plan2.Weeks.SelectMany(w => w.Items).Min(i => i.ScheduledAt);
        await worker.RunOnce(t2.AddMinutes(-10), TimeSpan.FromHours(1));
        await f.WithDb(async db => Assert.False(await db.Notifications.AnyAsync(x => x.UserId == s2.Id)));

        // Reminders disabled: nothing claimed.
        var s3 = await NewStudent();
        var plan3 = await f.Read<StudyPlanDto>(await f.Put(f.Client(s3), "/api/me/study-plan", new StudyPlanRequest([c.Id], DateTime.UtcNow.Date.AddDays(40), 20,
            [DayOfWeek.Wednesday], 4, false)));
        var t3 = plan3.Weeks.SelectMany(w => w.Items).Min(i => i.ScheduledAt);
        await worker.RunOnce(t3.AddMinutes(-10), TimeSpan.FromHours(1));
        await f.WithDb(async db => Assert.False(await db.Set<StudyPlanItem>().AnyAsync(i => i.UserId == s3.Id && i.ReminderSentAt != null)));
    }

    [Fact]
    public async Task Folders_hold_enrolled_courses_and_are_private()
    {
        var c = await LiveCourse("Folder Course");
        var s = await NewStudent();
        var cl = f.Client(s);
        var folder = await f.Read<FolderDto>(await f.Post(cl, "/api/me/folders", new FolderRequest("Exam prep", null)));
        Assert.Equal(HttpStatusCode.Conflict, (await f.Post(cl, "/api/me/folders", new FolderRequest("Exam prep", null))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Post(cl, "/api/me/folders", new FolderRequest(" ", null))).StatusCode);
        var notEnrolled = await cl.PutAsync($"/api/me/folders/{folder.Id}/courses/{c.Id}", null);
        Assert.Equal(HttpStatusCode.BadRequest, notEnrolled.StatusCode);
        await f.Read<EnrollmentResult>(await cl.PostAsync($"/api/learn/courses/{c.Id}/enroll", null));
        Assert.Equal(HttpStatusCode.NoContent, (await cl.PutAsync($"/api/me/folders/{folder.Id}/courses/{c.Id}", null)).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await cl.PutAsync($"/api/me/folders/{folder.Id}/courses/{c.Id}", null)).StatusCode); // idempotent
        var list = await f.Read<List<FolderDto>>(await cl.GetAsync("/api/me/folders"));
        Assert.Equal("Folder Course", Assert.Single(Assert.Single(list).Courses).Title);
        var renamed = await f.Read<FolderDto>(await f.Put(cl, $"/api/me/folders/{folder.Id}", new FolderRequest("Certs", 2)));
        Assert.Equal("Certs", renamed.Name);

        var other = f.Client(await NewStudent());
        Assert.Empty(await f.Read<List<FolderDto>>(await other.GetAsync("/api/me/folders")));
        Assert.Equal(HttpStatusCode.NotFound, (await f.Put(other, $"/api/me/folders/{folder.Id}", new FolderRequest("x", null))).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await other.DeleteAsync($"/api/me/folders/{folder.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await other.DeleteAsync($"/api/me/folders/{folder.Id}/courses/{c.Id}")).StatusCode);

        Assert.Equal(HttpStatusCode.NoContent, (await cl.DeleteAsync($"/api/me/folders/{folder.Id}/courses/{c.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await cl.DeleteAsync($"/api/me/folders/{folder.Id}")).StatusCode);
        Assert.Empty(await f.Read<List<FolderDto>>(await cl.GetAsync("/api/me/folders")));
    }

    [Fact]
    public async Task Bookmarks_are_timestamped_private_and_separate_from_notes()
    {
        var c = await LiveCourse("Bookmark Course");
        var lesson = c.Modules[0].Lessons[0].Id;
        var s = await NewStudent();
        var cl = f.Client(s);
        var b = await f.Read<BookmarkDto>(await f.Post(cl, "/api/me/bookmarks", new BookmarkRequest(lesson, 125, "Key formula")));
        Assert.Equal((125, "Key formula", "Bookmark Course"), (b.TimestampSeconds, b.Label, b.CourseTitle));
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Post(cl, "/api/me/bookmarks", new BookmarkRequest(lesson, 601, null))).StatusCode);
        Assert.Equal(HttpStatusCode.BadRequest, (await f.Post(cl, "/api/me/bookmarks", new BookmarkRequest(lesson, -1, null))).StatusCode);
        Assert.Equal(HttpStatusCode.NotFound, (await f.Post(cl, "/api/me/bookmarks", new BookmarkRequest(Guid.NewGuid(), 1, null))).StatusCode);
        // Same timestamp again updates the label instead of duplicating.
        await f.Read<BookmarkDto>(await f.Post(cl, "/api/me/bookmarks", new BookmarkRequest(lesson, 125, "Renamed")));
        await f.Read<BookmarkDto>(await f.Post(cl, "/api/me/bookmarks", new BookmarkRequest(lesson, 30, null)));
        var list = await f.Read<List<BookmarkDto>>(await cl.GetAsync($"/api/me/bookmarks?courseId={c.Id}"));
        Assert.Equal([(30, ""), (125, "Renamed")], list.Select(x => (x.TimestampSeconds, x.Label)).ToArray());
        Assert.All(list, x => Assert.True(x.LessonAvailable));
        await f.WithDb(async db => Assert.False(await db.LearnerNotes.AnyAsync(n => n.UserId == s.Id)));

        var other = f.Client(await NewStudent());
        Assert.Empty(await f.Read<List<BookmarkDto>>(await other.GetAsync("/api/me/bookmarks")));
        Assert.Equal(HttpStatusCode.NotFound, (await other.DeleteAsync($"/api/me/bookmarks/{b.Id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await cl.DeleteAsync($"/api/me/bookmarks/{b.Id}")).StatusCode);
        Assert.Single(await f.Read<List<BookmarkDto>>(await cl.GetAsync("/api/me/bookmarks")));
    }

    [Fact]
    public async Task Continue_learning_resumes_the_right_lesson()
    {
        var c1 = await LiveCourse("Continue A");
        var c2 = await LiveCourse("Continue B");
        var s = await NewStudent();
        var cl = f.Client(s);
        await f.Read<EnrollmentResult>(await cl.PostAsync($"/api/learn/courses/{c1.Id}/enroll", null));
        await f.Read<EnrollmentResult>(await cl.PostAsync($"/api/learn/courses/{c2.Id}/enroll", null));
        var empty = await f.Read<List<ContinueLearningDto>>(await cl.GetAsync("/api/me/continue-learning"));
        Assert.Equal(2, empty.Count);
        Assert.All(empty, x => Assert.Equal(x.CourseId == c1.Id ? c1.Modules[0].Lessons[0].Id : c2.Modules[0].Lessons[0].Id, x.LessonId));

        var a1 = c1.Modules[0].Lessons[0].Id; var a2 = c1.Modules[0].Lessons[1].Id;
        await f.Read<LessonProgressDto>(await f.Put(cl, $"/api/learn/lessons/{a1}/progress", new ProgressInput(200, false)));
        var r = await f.Read<List<ContinueLearningDto>>(await cl.GetAsync("/api/me/continue-learning"));
        Assert.Equal(c1.Id, r[0].CourseId); // most recent activity first
        Assert.Equal((a1, 200), (r[0].LessonId!.Value, r[0].PositionSeconds));

        await f.Read<LessonProgressDto>(await f.Put(cl, $"/api/learn/lessons/{a1}/progress", new ProgressInput(600, true)));
        r = await f.Read<List<ContinueLearningDto>>(await cl.GetAsync("/api/me/continue-learning"));
        Assert.Equal((a2, 0, 25, 1, 4), (r[0].LessonId!.Value, r[0].PositionSeconds, r[0].ProgressPercent, r[0].CompletedLessons, r[0].TotalLessons));

        Assert.Empty(await f.Read<List<ContinueLearningDto>>(await f.Client(await NewStudent()).GetAsync("/api/me/continue-learning")));
        Assert.Equal(HttpStatusCode.Unauthorized, (await f.Client().GetAsync("/api/me/continue-learning")).StatusCode);
    }
}
