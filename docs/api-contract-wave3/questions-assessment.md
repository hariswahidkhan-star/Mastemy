# Wave 3 — Question bank, assessment delivery, practice, regrading and certificates

Spec sections §13, §14, §15, §17. All endpoints require a bearer token unless marked *anonymous*. Errors use the shared
problem shape (`type` = error code, `title` = message). Every privileged change writes an audit log row.

## 1. Rich question content (§13)

Stems, options, rationales, explanations and case exhibits are **restricted Markdown**, validated server-side (never
silently rewritten except CRLF/CR → LF):

| Allowed | Rejected (400 `validation_failed`) |
|---|---|
| paragraphs, `**bold**`, `*italic*`/`_italic_`, `` `code` ``, fenced code blocks (```` ``` ````), pipe tables, lists, block quotes | raw HTML / autolinks (`<...>`), headings (`#`, setext), horizontal rules |
| LaTeX math `$...$` and `$$...$$` (`\$` for a literal dollar) | hyperlinks `[x](url)`, reference definitions, unbalanced `$`, unclosed code fences |
| images `![alt](resource:<ResourceFile id>)` | images pointing anywhere else |

Image resources must be live (not deleted), **non-premium** image files (`png/jpeg/gif/webp`) of the **same course**
(max 20 per question).

### Question input additions
`POST /api/studio/courses/{courseId}/questions`, `PUT /api/studio/questions/{id}` accept (all optional):

```json
{ "cognitiveLevel": "Remember|Understand|Apply|Analyze|Evaluate", "caseGroupId": "guid|null", "caseGroupOrder": 0 }
```

`allowShuffle: false` marks a question whose options must not be shuffled (existing). Every `QuestionDto` now has
`meta: { cognitiveLevel, caseGroupId, caseGroupOrder, sourceQuestionId, sourceVersion, sourceCourseId, reusable }`.

### Case groups
| Method | Path | Who |
|---|---|---|
| GET | `/api/studio/courses/{courseId}/case-groups` | course authors, reviewers, staff |
| POST | `/api/studio/courses/{courseId}/case-groups` | course editors, staff |
| GET | `/api/studio/case-groups/{id}` | course authors, reviewers, staff |
| PUT | `/api/studio/case-groups/{id}` | course editors, staff |
| DELETE | `/api/studio/case-groups/{id}` | course editors, staff — 409 `case_group_in_use` while questions reference it |

Body: `{ "title": "≤200", "exhibitMarkdown": "restricted Markdown ≤20000", "resourceIds": ["guid"] }` (attached resources:
any non-premium resource file of the course). Response `CaseGroupDto` includes `questionIds` ordered by `caseGroupOrder`.

**Form rule:** members of a case group are one indivisible unit — always delivered together, contiguous and in
`caseGroupOrder`, regardless of question shuffling or `questionCount` (whole units are drawn while they fit). The exhibit
is frozen per attempt (`AttemptView.cases[]`: `caseGroupId, title, exhibitMarkdown, resourceIds, itemIds`; each item has
`caseGroupId`).

## 2. Import / export (§14)

| Method | Path | Notes |
|---|---|---|
| POST | `/api/studio/courses/{courseId}/questions/import/inspect` | multipart `file` (.csv/.xlsx). Returns `{ format, headers, suggestedMapping: {header: Column\|null}, columns, requiredColumns, sampleRows (≤5), rowCount }`. Nothing stored. |
| POST | `/api/studio/courses/{courseId}/questions/import/preview` | multipart `file`, `mode` (`create`/`update`), `idempotencyKey`, optional `mapping` (JSON object `{ "file header": "Column" }`; `""`/null ignores a header). Without a mapping, headers must be the template columns. |
| POST | `/api/studio/courses/{courseId}/questions/import/{batchId}/commit` | 200 `{status:"Committed"}` inline; **202** `{status:"Queued"}` when the batch has more than `Questions:QueuedImportThresholdRows` (default 500) rows. |
| GET | `/api/studio/courses/{courseId}/questions/import/{batchId}` | status polling: `Previewed`, `Queued`, `Processing`, `Committed`, `Failed` with `created`, `updated`, `error`. Only the requester. |
| GET | `/api/studio/courses/{courseId}/questions/export.xlsx` | course editors/staff; values that look like formulas are prefixed with `'`. |
| GET | `/api/templates/mcq-import.xlsx` | *anonymous* XLSX template (server-generated). |

XLSX rules: first worksheet only; cells are read as **raw stored text** (shared/inline strings, numbers as stored,
TRUE/FALSE). **Any cell containing a formula is rejected** (`400 malformed_xlsx`, message names the cell, e.g. `E2`) —
cached formula results are never used. Macro-enabled workbooks, `.xls/.xlsm`, DTDs, external sheets and suspicious
compression (archive bombs) are refused. Implemented without third-party libraries (System.IO.Compression + XmlReader).

New column **`ImageResource`**: file name of an image already uploaded to the course resources (non-premium, image type,
unique name); the image is appended to the stem as `![name](resource:<id>)`. Unknown or ambiguous names are row errors.

Large-import atomicity: the queued commit runs in one transaction in the `QuestionImportWorker` background service
(claims jobs with conditional updates; re-checks that the requester can still edit the course and that referenced
modules, lessons and images still exist). On any failure nothing is imported and the status is `Failed`.

## 3. Question reuse

| Method | Path | Who |
|---|---|---|
| POST | `/api/studio/courses/{courseId}/questions/copy` | target course editors/staff. Body `{ "sourceQuestionIds": [..≤50], "externalIdPrefix": "opt" }` |
| GET | `/api/studio/shared-questions?q=&page=&pageSize=` | instructors/staff — reusable Active questions, no answer keys |
| PUT | `/api/admin/questions/{id}/reusable` | **staff**. `{ "reusable": true }` (only Active questions) |

A source is copyable when the caller authors its course (or is staff), or staff marked it reusable and it is Active.
Unauthorized sources answer 404. Retired sources and cross-course sources embedding course images are rejected (400
`copy_rejected`). Each copy is a **new Draft question** (new ids, new options) with `meta.sourceQuestionId/sourceVersion/
sourceCourseId`; it is never linked to the source and must be reviewed. External-id clashes get `-copy`, `-copy2`, ...

## 4. Practice (§15)

| Method | Path |
|---|---|
| POST | `/api/practice/sessions` |
| GET | `/api/practice/sessions` (mine, latest 50) |
| GET | `/api/practice/sessions/{id}` |
| PUT | `/api/practice/sessions/{id}/items/{itemId}` `{ "selectedOptionIds": [] }` |
| POST | `/api/practice/sessions/{id}/items/{itemId}/check` → `CheckResult` (correct ids, rationales, explanation; locks item) |
| POST | `/api/practice/sessions/{id}/finish` → `PracticeResult` with full review and readiness disclaimer (idempotent) |
| POST | `/api/practice/sessions/{id}/items/{itemId}/challenge` |
| GET | `/api/practice/review/due?limit=50` → SM-2 due queue |
| GET / PUT / DELETE | `/api/me/question-bookmarks`, `/api/me/question-bookmarks/{questionId}` |

Session body: `{ courseIds?, topics?, skills?, difficulties?, objectives?, unseenOnly, previousMistakes, bookmarkedOnly,
dueForReview, count (1-100, default 20) }`. Without `courseIds`, the learner's enrolled/entitled courses are used.
Eligible questions: Active, linked to an assessment in the course's **published snapshot** that does **not** count toward
a certificate; premium assessments need an active entitlement (re-checked on every answer/check → 403 `premium_required`).
`previousMistakes` = latest scored answer not fully correct; `unseenOnly` = never shown in an attempt or practice session.
Bookmarks are only accepted for questions the learner was shown (otherwise 404). Session views never include keys.

Spaced repetition (SM-2): every scored answer (practice checks/finish, attempt checks, attempt submission) updates the
learner's card: quality 4 (correct), 3 (partial), 1 (wrong); intervals 1, 6, then × ease factor (floor 1.3).

## 5. Attempts: accommodations, pause policy, exposure, reports

| Method | Path | Who |
|---|---|---|
| POST | `/api/admin/accommodations` `{ userId, assessmentId|null, extraTimePercent 0-300, untimed, reason }` | staff |
| GET | `/api/admin/accommodations?userId=&includeRevoked=` | staff |
| DELETE | `/api/admin/accommodations/{id}` (revoke) | staff |
| GET | `/api/me/accommodations` | learner |
| GET / PUT | `/api/studio/assessments/{id}/policy` `{ allowPause, maxPauseMinutes, maxExposuresPerQuestion|null }` | authors/staff (PUT: editors/staff) |
| POST | `/api/attempts/{id}/pause`, `/api/attempts/{id}/resume` | attempt owner |
| POST | `/api/attempts/{id}/items/{itemId}/challenge` `{ reason 10-2000 }` | attempt owner |
| GET | `/api/attempts/{id}/recommendations` | attempt owner, finished attempts |

* Accommodations: the assessment-specific grant wins over a global one; applied **at attempt start** (deadline =
  limit × (100+extra)/100, or none when untimed) and audited (`attempt.accommodation_applied`). A new grant for the same
  scope replaces (revokes) the previous one. `AttemptView.extraTimePercent/untimed`, summary `effectiveTimeLimitMinutes`,
  `accommodationApplied`.
* Pause: only when the policy has `allowPause` with 1-240 minutes and the attempt is timed (409 `pause_not_allowed`
  otherwise). The server records each paused interval; on resume the deadline moves by the paused time, bounded by the
  remaining budget (a pause that outlives the budget auto-resumes when the budget runs out). Answers/checks while paused:
  409 `attempt_paused`. `AttemptView.pause = { allowPause, paused, pausedAt, pauseSecondsRemaining }`.
* Exposure rule: `maxExposuresPerQuestion` caps how many times a learner is shown a question across their attempts of the
  assessment; exhausted questions (and their whole case group) are excluded from new forms; 409 `exposure_limit_reached`
  when nothing remains.
* Challenges of Exam items are accepted only after submission (409 `attempt_in_progress`).
* Reports: `AttemptResult` adds `readinessIsEstimate: true`, `readinessDisclaimer`, `regraded`. Recommendations
  (`RecommendationsDto`): per-skill accuracy, `weak` when < 60 %, lessons (from the published snapshot) linked to missed
  questions of weak skills ranked by misses, plus the disclaimer. Intended for `Diagnostic` assessments, available for any.

## 6. Regrading

| Method | Path | Who |
|---|---|---|
| POST | `/api/review/questions/{questionId}/regrades` `{ questionVersionId?, correctOptionIds, reason }` | reviewers/staff |
| GET | `/api/review/regrades?status=Proposed|Applied|Rejected`, `/api/review/regrades/{id}` | reviewers/staff |
| POST | `/api/admin/regrades/{id}/approve` `{ note }` | staff, not the proposer |
| POST | `/api/admin/regrades/{id}/reject` `{ note }` | staff |
| GET | `/api/admin/certificate-flags?status=Open|Kept|Revoked` | staff |
| POST | `/api/admin/certificate-flags/{id}/decide` `{ revoke, note }` | staff |

Approval (single transaction): corrects the key of that version (old key kept on the regrade), re-scores every finished
attempt that used the version with the attempt's own scoring policy and pass mark, **without touching the answers**, and
stores old/new points, score and pass per attempt (`RegradeDetailDto.results`). Then: certificates are issued for newly
passing attempts (idempotent), certificates evidenced by newly failing attempts are **flagged** (never auto-revoked) for a
staff decision, and all affected learners are notified. One open proposal per version.

## 7. Item analytics

| GET | `/api/studio/questions/{id}/analytics?version=` | `/api/studio/assessments/{id}/item-analytics` |
|---|---|---|

Authors, reviewers, staff. Finished attempts with ≥ 2 items. `difficulty` = proportion fully correct (Wilson 95 % CI),
`discrimination` = corrected point-biserial vs rest-of-test score (Fisher-z 95 % CI). **All statistics and distractor
proportions are null below N = 30** (`sufficientData: false`); raw distractor counts, `exposures` and
`distinctLearners` are always shown.

## 8. Question challenges

| Method | Path | Who |
|---|---|---|
| GET | `/api/review/question-challenges?status=&courseId=` | reviewers/staff |
| POST | `/api/review/question-challenges/{id}/resolve` `{ resolution: NoChange|Revise|Retire, note }` | reviewers/staff (not authors of the course) |
| GET | `/api/studio/courses/{courseId}/question-challenges?status=` | course authors/reviewers/staff |
| GET | `/api/me/question-challenges` | learner |

One open challenge per learner and question; max 20 open per learner. `Retire` retires the question (audited). The
learner is notified; on `Revise` the course instructors are notified too.

## 9. Certificates: designs, corrections, appeals (§17)

| Method | Path | Who |
|---|---|---|
| GET | `/api/certificate-templates?includeArchived=` | instructors/staff |
| POST / PUT | `/api/admin/certificate-templates`, `/api/admin/certificate-templates/{id}` | staff |
| DELETE | `/api/admin/certificate-templates/{id}` (archive) | staff |
| GET / PUT | `/api/studio/courses/{courseId}/certificate-template` `{ templateId|null }` | course editors/staff |
| POST | `/api/me/certificates/{id}/corrections` `{ requestedName 2-100, reason }` | certificate owner (valid certs) |
| GET | `/api/me/certificate-corrections`, `/api/admin/certificate-corrections?status=` | owner / staff |
| POST | `/api/admin/certificate-corrections/{id}/decide` `{ approve, note }` | staff |
| POST | `/api/me/certificates/{id}/appeals` `{ reason 10-2000 }` | owner (revoked certs) |
| GET | `/api/me/certificate-appeals`, `/api/admin/certificate-appeals?status=` | owner / staff |
| POST | `/api/admin/certificate-appeals/{id}/decide` `{ approve, note }` | staff (approve = reinstate) |

Template: `{ name, titleText, primaryColor "#RRGGBB", accentColor, logoResourceId (non-premium PNG/JPEG resource), signatureName, signatureTitle }`;
the PDF (`/api/certificates/{code}/pdf`) uses the course's template. An approved correction re-issues the **same code**
with the corrected name (original issue date kept; audited `certificate.reissued_corrected_name`).

## Configuration keys
| Key | Default | Meaning |
|---|---|---|
| `Questions:QueuedImportThresholdRows` | 500 | commits above this row count are queued |
| `Questions:ImportWorkerPollSeconds` | 2 | queued-import worker poll interval |


## 10. Final-wave additions

### Self-graded spaced review (SM-2)
Automatic grading still updates the learner's review card on check/finish. After seeing the answer the learner may choose
their own recall quality (0–5); it **replaces** the automatic step of that item (recomputed from the card's state before the
check, never stacked).

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/api/practice/sessions/{id}/items/{itemId}/self-grade` | owner | Body `{ "quality": 0..5 }`. 409 `not_checked` before the item is checked (or the session finished); 409 `already_graded`; 400 for a missing/out-of-range quality; 403 `premium_required` when premium access lapsed. Returns `ReviewCardDto { questionId, dueAt, intervalDays, repetitions, easeFactor, lastQuality }`. |
| POST | `/api/practice/review/{questionId}/grade` | learner | Self-grade from the due-review queue; applies one SM-2 step. 404 when the learner has no card for the question. |

`PracticeItemView` now includes `questionId` (practice and review items only) and `selfGrade`. **Exam/quiz attempt views never
include question ids.**

### Bookmarking without exposing exam questions
| Method | Path | Auth | Notes |
|---|---|---|---|
| PUT | `/api/practice/sessions/{id}/items/{itemId}/bookmark` | owner | Server resolves the question; returns `{ questionId }`. |
| PUT | `/api/attempts/{id}/items/{itemId}/bookmark` | owner | 409 `attempt_in_progress` until the attempt is submitted/expired; 204 afterwards. The question id is not returned. |

### Regrade preview
`GET /api/review/regrades/{id}/preview` (Reviewer/Staff) — dry run of approval with the proposed key: nothing is written.
Returns `RegradePreviewDto { regradeId, affectedAttempts, changedAttempts, newlyPassing, newlyFailing, certificatesToFlag,
results: [{ attemptId, userId, oldPointsEarned, newPointsEarned, oldScorePercent, newScorePercent, oldPassed, newPassed }] }`.
409 `regrade_decided` once the proposal was approved or rejected.

### Certificate template preview
`GET /api/admin/certificate-templates/{id}/preview.pdf` (Staff) — renders a sample certificate ("Sample Learner",
"Sample Course: Foundations", code `SAMPLE-PREVIEW`) with that template's colours, title, signature and logo. Nothing is
stored; the sample code never verifies. 404 for unknown templates.

### Staff assessment picker (accommodations UI)
`GET /api/admin/assessments?q=&limit=20` (Staff) — matches assessment title, course title, course code, or an exact
assessment/course id. Returns `[{ id, title, courseId, courseCode, courseTitle, kind, mode, timeLimitMinutes,
countsTowardCertificate }]` (max 50).
