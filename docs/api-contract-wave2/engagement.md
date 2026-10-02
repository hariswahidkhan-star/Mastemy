# Engagement API (wave 2)

Enums serialize as strings. Paged responses: `{ items, total, page, pageSize }` (page >= 1, pageSize 1-100, default 20).
User text (titles/bodies) is plain text: HTML tags are rejected with 400 `html_not_allowed`.

## Discovery (spec §4) — live courses only
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | /api/me/wishlist | user | `[{ course: {id, slug, title, subtitle, level, language, minPrice, currency}, addedAt }]`; non-live courses omitted |
| POST | /api/me/wishlist/{courseId} | user | idempotent, 204; 404 if course not live |
| DELETE | /api/me/wishlist/{courseId} | user | 204 |
| GET | /api/me/recently-viewed | user | `[{ course, viewedAt }]`, newest first, max 20 |
| POST | /api/me/recently-viewed/{courseId} | user | upsert, keeps latest 20 per user; 204 |
| GET | /api/courses/compare?ids=a,b[,c,d] | anon | 2-4 distinct ids (400 otherwise; 404 if any not live). `[{id, slug, title, level, language, lessonCount, readyVideoCount, activeQuestionCount, totalDurationSeconds, packages:[{id,title,contents,price,currency,accessDays}], ratingAverage, ratingCount, reviewedAt, credentialType}]` in request order |
| GET | /api/courses/{id}/related | anon | up to 6 card objects sharing categories, ordered by overlap desc then newest |

## Discussions / Q&A (spec §9, §16)
| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | /api/courses/{id}/discussions?lessonId&q&resolved&page&pageSize | anon | thread summaries `{id, courseId, lessonId, authorId, authorName, title, body, resolved, hidden, replyCount, createdAt, updatedAt}`; hidden only for Moderator/Admin |
| POST | /api/courses/{id}/discussions | enrolled or course author | `{lessonId?, title(3-200), body(1-5000)}` → thread detail |
| GET | /api/discussions/{id} | anon | `{thread, replies:[{id, threadId, authorId, authorName, body, isInstructorReply, hidden, createdAt}]}`; hidden thread → 404 for non-moderators |
| PUT | /api/discussions/{id} | thread author, ≤24h | `{title, body}` |
| POST | /api/discussions/{id}/replies | enrolled or course author | `{body}`; author replies flagged `isInstructorReply`; notifies thread author (kind `reply`), coalesced: at most one `reply` notification per (thread author, thread) per 10 minutes (thread row-locked, so concurrent replies cannot double-notify) |
| PUT | /api/discussion-replies/{id} | reply author, ≤24h | `{body}` |
| POST | /api/discussions/{id}/resolve | course author | `{resolved: bool}` (audited) |
| POST | /api/moderation/discussions/{id}/hide | Moderator/Admin/SuperAdmin | `{hidden, reason}` (reason required when hiding; audited) 204 |
| POST | /api/moderation/discussion-replies/{id}/hide | Moderator/Admin/SuperAdmin | same |

## Announcements
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /api/studio/courses/{id}/announcements | course author | `{title(3-200), body(1-5000), clientRequestId?}` + optional header `Idempotency-Key` (≤200 chars; header wins over `clientRequestId`). course must be live (409 `course_not_live`); max 3 per course per 24h (429 `announcement_rate_limited`). The rate-limit count and idempotency lookup run under `SELECT … FOR UPDATE` on the Course row, so concurrent posts cannot exceed the limit. Returns `{announcement, notifiedCount, duplicate}`. A repeated key from the same author on the same course within 24h returns the original announcement with `duplicate=true` (200, no new notifications, does not count against the limit). Fans out `announcement` notifications to enrolled users with in-app pref on (multi-row inserts in chunks of 1000, same transaction as the announcement) |
| GET | /api/courses/{id}/announcements?page&pageSize | enrolled, course author, or Admin | `{id, courseId, authorId, authorName, title, body, createdAt}` |

## Notifications
Kinds: `announcement, reply, review_reply, course_updated, certificate, issue_reported`. Defaults: inApp=true, email=false (opt-in).
| Method | Path | Notes |
|---|---|---|
| GET | /api/me/notifications?page&pageSize&unreadOnly | `{items:[{id, kind, title, link, readAt, createdAt}], total, page, pageSize, unreadCount}` |
| POST | /api/me/notifications/{id}/read | 204 |
| POST | /api/me/notifications/read-all | 204 |
| GET | /api/me/notification-preferences | `{emailAvailable, items:[{kind, inApp, email}]}`; `emailAvailable=false` when SMTP (Email:SmtpHost + Email:From) is not configured — email prefs are stored but no email rows are queued and nothing is sent |
| PUT | /api/me/notification-preferences | `{items:[{kind, inApp, email}]}` (partial list allowed) |

Other modules: inject `Mastemy.Api.Modules.Engagement.INotificationService.Publish(userIds, kind, title, link)`.
Email config: `Email:SmtpHost, SmtpPort(587), Username, Password, From, EnableSsl(true), PublicBaseUrl, BatchSize(50), PollIntervalSeconds(10), RetryBaseSeconds(30)`.

**Email delivery (outbox).** `Publish` never sends SMTP inline. For opted-in, non-suspended recipients it inserts `EmailOutbox`
rows in the same transaction as the in-app notifications (only when SMTP is configured). `EmailOutboxWorker` (hosted service)
claims due rows in batches of `Email:BatchSize` with `FOR UPDATE SKIP LOCKED` plus a 5-minute lease (safe with several API
instances), sends them, and on failure retries with exponential backoff (`RetryBaseSeconds × 2^(attempt-1)`), up to 6 attempts.
`LastError` stores only the exception type and SMTP status code (no server text, credentials or addresses).

## Issue reporting
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /api/courses/{id}/issues | user | `{lessonId?, category: VideoUnavailable|ContentError|QuestionError|Other, body(5-2000)}`; stored as AuditLog `issue.reported` on Course; notifies course authors (`issue_reported`); max 10 per user per course per 24h (429 `issue_rate_limited`), counted under a row lock on the Course so parallel reports cannot exceed it |
| GET | /api/studio/courses/{id}/issues?page&pageSize | course author or staff/reviewer | `{id, courseId, lessonId, category, body, reporterId, reporterName, createdAt}` |
