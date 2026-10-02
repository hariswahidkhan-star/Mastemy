# Analytics (wave 3, spec §9 course analytics / §20 dashboards / §21 consent)

Module: `src/Mastemy.Api/Modules/Analytics`. Tables: `Analytics_Events`, `Analytics_Consents`.

## Consent & ingest (first-party)

- `GET /api/analytics/consent` → `{analytics: bool, source: "account"|"cookie"}`.
- `PUT /api/analytics/consent {analytics}` → stores the choice on the account when signed in and sets cookie `mastemy_consent=analytics|necessary` (Lax, 180 days, readable by the web client).
- `POST /api/analytics/events {events:[{type, courseId?, lessonId?, ts?}]}` (1–20 per call) → `202 {accepted, rejected}`.
  - Consent: a signed-in user's stored choice wins; otherwise the `mastemy_consent` cookie must contain `analytics`. No consent → `403 consent_required`, nothing stored.
  - Types: `course_view, lesson_view, video_play, video_complete, preview_play, checkout_start, search`. Events for unknown types, non-live courses, lessons not in the course's published snapshot, or `ts` older than 24 h / >5 min in the future are dropped (counted in `rejected`).
  - Rate limit per client: `Analytics:EventsPerMinute` (default 120) → `429 rate_limited`.
  - Stored fields: type, courseId, lessonId, occurredAt, receivedAt, `anonId` = HMAC-SHA256(`Analytics:HashSecret` or a key derived from `Jwt:Key`, UTC date | visitor key) truncated to 32 hex chars. Visitor key = user id when signed in, else hash(IP | User-Agent); neither is stored. The id rotates daily.

## Instructor course analytics

`GET /api/studio/courses/{id}/analytics?from&to&bucket=day|week|month` — owner, co-instructors, staff (editors → 403 `editor_scope`).
Default range: last 30 days; max 2 years. Weeks start Monday; bucket labels are `yyyy-MM-dd`.

Response: `enrollmentsOverTime[{bucket,value}]`, `enrollmentsInRange`, `totalEnrollments`, `activeLearnersOverTime` (distinct learners whose progress row was last updated in the bucket), `activeLearnersInRange`, `completionFunnel[{lessonId, moduleTitle, lessonTitle, sortIndex, started, completed}]` (published lesson order), `averageProgressPercent` (completions by enrolled learners / (enrollments × lessons)), `assessments[{assessmentId, title, kind, attempts, passed, passRatePercent, averageScorePercent}]` (submitted attempts in range), `questionStatsUrl`, `conversion{courseViewVisitors, enrollments, purchases, viewToEnrollPercent, enrollToPurchasePercent, note}` (views = distinct consented anon ids), `revenue[{currency, kind, gross, instructorAmount, platformAmount, entries}]` (commission ledger in range, by currency and Sale/RefundReversal), `myEarnings` (same, caller's rows), `revenueOverTime[{bucket, currency, amount}]`, `refunds{paidOrders, refundedOrders, refundRatePercent}`.

`GET /api/studio/courses/{id}/analytics/questions` (content editors) → `[{questionId, externalId, answered, fullCredit, averagePoints, fullCreditPercent}]` from submitted attempts; never exposes option correctness.

## Admin platform dashboard

`GET /api/admin/analytics/dashboard?from&to&bucket` (Staff) → `totalUsers, newSignupsInRange, signupsOverTime, activeLearnersInRange, activeLearnersOverTime, publishedCourses, ordersByCurrency[{currency,count,amount}]` (paid/refunded orders by PaidAt), `revenueOverTime`, `refundsByCurrency` (completed refunds), `pendingRefundRequests`, `aiUsage: null` (no AI usage table exists yet — reported as null, never a fabricated 0), `videosNeedingRepair` + `videosNeedingRepairSample` (Restricted/Failed, top 50), `contentReviewMonths`, `overdueContentUpdates` + `overdueContentSample` (live courses whose latest snapshot publish is older than `Analytics:ContentReviewMonths`, default 12), `reviewQueues{coursesInReview, questionsAwaitingReview, questionsAwaitingApproval, instructorApplications, refundRequests, uploadApprovals}`.

All aggregates run in MySQL (GROUP BY on `DATE_FORMAT` bucket expressions) and are cached in-memory for 5 minutes per report/scope/range/bucket (authorization is checked before the cache).
