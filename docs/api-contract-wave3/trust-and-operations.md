# Trust & safety, quality queues, scanning and health API (wave 3)

Enums serialize as strings. Errors are RFC 7807 problem documents; `type` carries the machine code listed below.
Paged responses: `{ items, total, page, pageSize }` (page >= 1, pageSize 1-100, default 25). Every privileged change is
written to the audit log (action names in brackets).

## Complaints and takedowns (spec §20)

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /api/complaints | anyone | `{type, targetType, targetId, evidence(20-20000), email?, name?(≤120)}` → 201 `{id, status:"Open", createdAt}`. `type`: Copyright, Rights, Abuse, Privacy, Other. `targetType`: Course, Lesson, Discussion, DiscussionReply, Review, Resource. Anonymous filers must give `email` (400 `email_required` / `invalid_email`); signed-in filers default to their account email. 404 when the target does not exist. Rate limit per IP per hour (`Trust:ComplaintsPerHourPerIp`, default 10) → 429 `rate_limited`. [complaint.filed] |
| GET | /api/admin/trust/complaints?status&type&page&pageSize | Staff | open first, oldest first. Item: `{id, type, targetType, targetId, courseId, courseTitle, reporterUserId, reporterEmail, reporterName, evidence, status, action, resolutionNote, resolvedBy, resolvedAt, createdAt}` |
| GET | /api/admin/trust/complaints/{id} | Staff | single complaint |
| POST | /api/admin/trust/complaints/{id}/resolve | Staff | `{action, note(3-5000)}` → `{complaint, complainantNotified, instructorsNotified}`. Actions: **Dismiss** (no content change); **Hide** — Review/Discussion/DiscussionReply set `Hidden`; Lesson/Resource get a takedown hold (learner reads → 451); Course → 400 `invalid_action`; **Archive** — courses only, applied through `CourseStateMachine` (409 `invalid_transition` if already archived; shared media is never deleted). 409 `complaint_closed` when not Open. Complainant: email via outbox (when SMTP configured) and an in-app notification if signed in. Instructors of the course: in-app notification (kind `trust_safety`) + email on Hide/Archive. [complaint.resolved, course.archived, content_hold.created] |

### Takedown holds

While a hold is active, these learner routes return **451 `content_unavailable`** for everyone except Staff:
`GET /api/learn/lessons/{id}` and every `/api/learn/lessons/{lessonId}/…` route (lesson holds);
`GET /api/learn/resources/{id}/download`, `GET /api/learn/captions/{id}/vtt` (resource holds).
Course outlines still list a held lesson's title (snapshot payloads are immutable); playback, notes, resources, captions and transcript are blocked.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | /api/admin/trust/holds?includeReleased=false | Staff | `[{id, targetType: Lesson/Resource, targetId, courseId, complaintId, createdBy, createdAt, releasedAt}]` |
| POST | /api/admin/trust/holds/{id}/release | Staff | `{note(3-5000)}` (e.g. counter-notice accepted); 409 `hold_released` if already released. [content_hold.released] |

## Instructor suspension

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /api/admin/trust/instructors/{userId}/suspend | Staff | `{reason(5-5000)}` → suspension. Removes the `Instructor` role (AccessService author checks fail immediately), blocks every non-GET `/api/studio/**` request from the user even with a still-valid token (403 `instructor_suspended`), and moves all unbatched commission ledger entries into a per-suspension payout batch with status **`Held`** (cannot be approved: Commerce only approves `Draft`). New sales are swept into the held batch every `Trust:HeldEarningsSweepMinutes` (default 10) and immediately before any `POST /api/admin/payout-batches`. Learners keep access to the instructor's live courses. 400 `self_suspension`, `cannot_suspend_staff`, `not_instructor`; 409 `already_suspended`. [instructor.suspended] |
| POST | /api/admin/trust/instructors/{userId}/reinstate | Staff | `{note(3-5000)}`; restores the role (if it was held), releases held entries back to unbatched and deletes the held batch; 404 when no active suspension. [instructor.reinstated] |
| GET | /api/admin/trust/suspensions?includeEnded=false | Staff | `[{id, userId, displayName, reason, holdBatchId, heldEntries, suspendedBy, suspendedAt, reinstatedBy, reinstatedAt, reinstateNote}]` |

## Moderation appeals

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /api/appeals | user | `{targetType: Review/Discussion/DiscussionReply, targetId, reason(10-5000)}` → 201 appeal. Only the content's author or an instructor of the course may appeal (others get 404). 409 `not_hidden`, `appeal_pending`, `appeal_already_decided` (one appeal per person per item). [appeal.filed] |
| GET | /api/me/appeals | user | own appeals, newest first |
| GET | /api/admin/trust/appeals?status&page&pageSize | Staff | oldest first |
| POST | /api/admin/trust/appeals/{id}/decision | Staff | `{decision: Uphold/Reinstate, note}`; Reinstate un-hides the content; appellant notified in-app. 409 `appeal_decided`; 403 for the appellant deciding their own appeal. [appeal.decided] |

Appeal: `{id, targetType, targetId, courseId, appellantId, reason, status: Pending/Upheld/Reinstated, decidedBy, decisionNote, decidedAt, createdAt}`.

## Quality queues

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | /api/admin/operations/broken-links | Staff | Video assets in `Restricted`/`Failed` that are played by a lesson in the **current published snapshot** of a live course (draft-only links are excluded). `[{videoAssetId, youTubeVideoId, title, status, statusReason, lastCheckedAt, courses:[{courseId, title, slug, version, lessons:[{lessonId, title}], instructorIds}], lastNotifiedAt}]` (max 500 assets) |
| POST | /api/admin/operations/broken-links/{videoAssetId}/notify | Staff | in-app notification (kind `broken_video`) + email to every instructor of each affected course → `{videoAssetId, coursesNotified, recipients, notifiedAt}`. 404 unknown asset; 409 `video_not_broken`, `not_linked`. [broken_link.notified] |
| GET | /api/admin/operations/overdue-content?months=N | Staff | live courses whose latest publish is older than N months (default `Operations:OverdueContentMonths` = 12; 1-120 else 400 `invalid_months`) → `[{courseId, title, slug, status, ownerId, ownerName, lastPublishedAt, monthsSincePublish}]`, stalest first |

## Resource upload malware scanning

`POST /api/studio/courses/{courseId}/resources` and `PUT /api/studio/resources/{id}/file` scan the staged file before it is committed:

| Outcome | Response |
|---|---|
| Clean | 201/200 as before; `scanStatus: "Clean"`, `scannedAt` set |
| Malware signature found | **422 `malware_detected`**; staged file deleted, nothing stored, previous version (replace) untouched |
| Scanner missing/unreachable, `Scanning:Mode=Required` | **503 `scanning_unavailable`**; file discarded |
| Scanner missing/unreachable, `Scanning:Mode=Optional` | accepted; `scanStatus: "NotScanned"` |

`ResourceDto` (studio list/upload/replace/update) gains `scanStatus` (`Clean`/`NotScanned`) and `scannedAt`.
Configuration: `Scanning:ClamAvHost`, `Scanning:ClamAvPort` (3310), `Scanning:Mode` (`Required`/`Optional`; default Required when a host is set, Optional otherwise), `Scanning:TimeoutSeconds` (30), `Scanning:ChunkBytes` (65536, must not exceed clamd `StreamMaxLength`).

## Health

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | /health/live | anon | `{status:"Healthy"}` — process is serving; no dependency checks |
| GET | /health/ready | anon / Staff | runs `mysql`, `resource_storage` (write/read/delete probe + free space), `email_outbox` (oldest pending age > `Operations:OutboxDegradedMinutes` or dead-lettered rows → Degraded), `malware_scanner` (PING). 200 when Healthy/Degraded, **503 when Unhealthy**. Anonymous and non-staff: `{status}` only. Staff: `{status, totalDurationMs, checks:[{name, status, description, durationMs, data}]}` |
| GET | /health | anon | unchanged legacy probe |

Every response carries `X-Correlation-Id` (inbound value reused when it matches `[A-Za-z0-9._-]{1,64}`, otherwise generated); it is also the request's `TraceIdentifier` and a `CorrelationId` logging scope.


## Final-wave additions
- **Notifications**: trust & safety (`trust_safety`) and broken-video (`broken_video`) notices are now published through
  `INotificationService`, so per-kind in-app/email preferences apply. For broken videos the detailed action-needed email is
  still sent to instructors with no explicit preference for the kind; opted-in users get the service's email instead and
  opted-out users get none.
- **Hidden-post notice for authors**: moderator hides (`/api/moderation/discussions|discussion-replies/{id}/hide`) and
  complaint takedowns record the reason (`Engagement_ModerationNotes`). `GET /api/discussions/{id}` on a hidden thread
  returns **200 to its author only** with `hidden: true` and `moderation: { hidden, reason, hiddenAt, appealTargetType:
  "Discussion", appealTargetId, appealUrl: "/api/appeals", appealsPage: "/account/appeals" }` (no replies). Everyone else
  still gets 404; moderators see the post. Unhiding or a reinstating appeal clears the notice.
- **Manual video status override**: `POST /api/admin/youtube/videos/{id}/mark` (Staff) body `{ status: "Restricted"|"Failed",
  reason }` (reason 1–1000 chars, required). `Ready` is refused with 400 `use_confirm` — it is only reachable through
  reviewer confirmation (`/confirm`). Videos still in the upload pipeline (Draft, AwaitingApproval, AwaitingSourceFile,
  Uploading) → 409 `invalid_state`. Audited as `video.marked` with from/to/reason. Returns `VideoAssetDto`.
