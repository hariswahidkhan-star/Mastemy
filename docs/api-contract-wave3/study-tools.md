# Study tools (wave 3, spec §16)

Module: `src/Mastemy.Api/Modules/StudyTools`. Tables: `StudyTools_Plans`, `StudyTools_PlanCourses`, `StudyTools_PlanItems`,
`StudyTools_Folders`, `StudyTools_FolderCourses`, `StudyTools_Bookmarks`. All endpoints require authentication and only touch the
caller's own rows (another user's folder/bookmark id → 404).

## Study plan (one per user)

- `GET /api/me/study-plan` → `StudyPlanDto` or `204` when none.
- `PUT /api/me/study-plan` `{courseIds: Guid[1..10], targetDate, weeklyMinutes: 15..3000, sessionDays?: DayOfWeek[] (default Mon/Wed/Fri), sessionHourUtc?: 0..23 (default 18), remindersEnabled?: bool (default false)}` → creates/replaces and generates the schedule. Courses must be live (404 otherwise).
- `POST /api/me/study-plan/regenerate` → reschedules remaining lessons from now. `DELETE /api/me/study-plan`.
- Schedule: published lessons of the goal courses in curriculum order, skipping lessons the learner completed; per-session budget = weeklyMinutes / sessionDays; each session holds at least one lesson (lesson length = video duration, min 2 min, 10 min when unknown).
- `StudyPlanDto`: `{id, courseIds, targetDate, weeklyMinutes, sessionDays, sessionHourUtc, remindersEnabled, fitsBeforeTarget, finishesAt, totalLessons, remainingLessons, updatedAt, weeks:[{weekStart (Monday), plannedMinutes, items:[{id, courseId, courseTitle, lessonId, lessonTitle, durationSeconds, scheduledAt, completed}]}]}`.
- `GET /api/me/study-plan.ics` → `text/calendar` (RFC 5545: CRLF, TEXT escaping of `\ ; , newline`, 75-octet folding on UTF-8 boundaries, one VEVENT per session with stable UID, VALARM 15 min before when reminders are on). 404 without a plan. Bearer-authenticated (no public feed URL).
- Reminders: `StudyReminderWorker` (BackgroundService, every `StudyTools:ReminderIntervalMinutes`, default 60; disable with `StudyTools:RemindersEnabled=false`) creates one in-app `Notification` (kind `study_reminder`, link `/me/study-plan`) per session starting within the window, only for plans with reminders enabled and unless the user set preference `study_reminder` InApp=false. Sessions are claimed with a conditional UPDATE so multiple instances never double-send.

## Course folders

`GET /api/me/folders` → `[{id, name, sortOrder, createdAt, courses:[{courseId, slug, title, addedAt}]}]`; `POST /api/me/folders {name, sortOrder?}` (max 50, unique name → 409); `PUT /api/me/folders/{id}`; `DELETE /api/me/folders/{id}`; `PUT|DELETE /api/me/folders/{id}/courses/{courseId}` (only enrolled courses → 400 `not_enrolled`; add is idempotent).

## Bookmarks (separate from notes)

`GET /api/me/bookmarks?courseId&lessonId` → `[{id, courseId, courseTitle, lessonId, lessonTitle, timestampSeconds, label, lessonAvailable, createdAt}]`; `POST /api/me/bookmarks {lessonId, timestampSeconds, label?}` (lesson must be in a live course's published snapshot; timestamp within the video; same lesson+timestamp updates the label; max 2000); `DELETE /api/me/bookmarks/{id}`.

## Continue learning

`GET /api/me/continue-learning?limit=10` → enrolled live courses, most recent activity first: `[{courseId, slug, courseTitle, lessonId, lessonTitle, positionSeconds, progressPercent, completedLessons, totalLessons, courseCompleted, lastActivityAt}]`. Resume lesson = last touched lesson if unfinished (at its saved position), else the next unfinished lesson in order.
