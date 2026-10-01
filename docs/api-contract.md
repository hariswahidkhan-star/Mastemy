# Mastemy HTTP API contract (v1)

Base path `/api`. JSON, camelCase, enums as strings. Errors: RFC 7807 `{ status, title, type }`.
Auth: `Authorization: Bearer <accessToken>`. Paged lists: `{ items, total, page, pageSize }`.

## Identity (Modules/Identity)
- POST /api/auth/register {email,password,displayName,preferredLanguage} -> AuthResponse
- POST /api/auth/login {email,password} -> AuthResponse  (lockout after repeated failures; rate limited)
- POST /api/auth/refresh {refreshToken} -> AuthResponse (rotation; reuse of a revoked token revokes the family)
- POST /api/auth/logout {refreshToken}
- GET  /api/auth/me -> UserDto
- AuthResponse = { accessToken, refreshToken, expiresAt, user: UserDto }; UserDto = { id,email,displayName,preferredLanguage,roles[] }
- GET  /api/admin/settings (Staff) -> { [flag]: bool };  PUT /api/admin/settings/{key} {value:bool} (SuperAdmin, audited)
- GET  /api/admin/users?q=&page= (Staff); PUT /api/admin/users/{id}/roles {roles[]} (SuperAdmin; cannot remove own SuperAdmin); PUT /api/admin/users/{id}/suspend {suspended}
- GET  /api/admin/audit?entityType=&page= (Staff)
- GET  /api/instructor-onboarding/status -> { registrationOpen, inviteOnly, paused, myApplication? }
- POST /api/admin/instructor-invitations {email} (Staff) -> { code } (shown once)
- POST /api/instructor-applications {headline,bio,expertiseEvidence,testVideoUrl,agreementAccepted,invitationCode?}
- GET  /api/admin/instructor-applications?status= (Reviewer); POST /api/admin/instructor-applications/{id}/decision {decision: Approve|Reject|RequestChanges, notes} -> approve grants Instructor role

## Catalog & authoring (Modules/Catalog)
- GET /api/categories -> [{id,slug,nameEn,nameAr,parentId,isAcademy,courseCount}]
- GET /api/courses?q=&category=&level=&language=&sort=newest|updated|title&page= -> paged CourseCardDto (only Published/Updating)
- GET /api/courses/{slug} -> CourseDetailDto {.., outcomes[], modules[{id,title,lessons[{id,title,durationSeconds,isPreview,hasVideo}]}], videoCount, questionCount, totalDurationSeconds, instructors[], packages[], reviewedAt, ratingAverage?, ratingCount}
- GET /api/studio/courses (Instructor) -> my courses; POST /api/studio/courses {title,...}; GET/PUT /api/studio/courses/{id}
- POST /api/studio/courses/{id}/modules {title}; PUT/DELETE /api/studio/modules/{id}; POST /api/studio/courses/{id}/modules/reorder {ids[]}
- POST /api/studio/modules/{id}/lessons {title,objective}; PUT/DELETE /api/studio/lessons/{id}; POST /api/studio/modules/{id}/lessons/reorder {ids[]}
- PUT /api/studio/lessons/{id}/notes {notesMarkdown, premiumNotesMarkdown}
- POST /api/studio/courses/{id}/submit -> InReview (validation: every lesson has a Ready video, ≥1 module)
- GET /api/studio/courses/{id}/validation -> { ok, issues[] }
- POST /api/studio/courses/{id}/co-instructors {email, role, revenueSharePercent} (owner only)
- Review: GET /api/review/courses?status=InReview (Reviewer); POST /api/review/courses/{id}/decision {decision: Approve|RequestChanges, notes}; POST /api/review/courses/{id}/comments {lessonId?,questionId?,videoTimestampSeconds?,body}; GET same
- POST /api/admin/courses/{id}/publish (Staff; requires Approved + all videos Ready) ; POST /api/admin/courses/{id}/archive
- POST /api/studio/courses/{id}/start-update (Published -> Updating)

## YouTube (Modules/YouTube)
- GET /api/youtube/channels (Instructor: channels they may use) ; POST /api/admin/youtube/channels {channelId,title,mode} (Staff)
- POST /api/studio/lessons/{id}/video {url, channelId, rightsDeclared, rightsDeclarationText, title?, durationSeconds?} -> VideoAssetDto (parses watch/youtu.be/shorts/embed/ID; validates via YouTube Data API when ApiKey configured, else oEmbed, else manual metadata; checks channel match + embeddable + public/unlisted)
- POST /api/studio/videos/{id}/recheck ; GET /api/admin/youtube/videos?status=
- POST /api/studio/courses/{id}/import-playlist {playlistUrl, channelId} -> draft preview [{videoId,title,durationSeconds}] (needs ApiKey); POST .../import-playlist/commit {moduleTitle, items[{videoId,title}]}
- Uploader (flag YouTubeApiUploadsEnabled): POST /api/youtube/uploads {channelId, lessonId?, title, description, privacyStatus, notifySubscribers, syntheticMediaDisclosed, fileName, fileSize, fileFingerprint} -> AwaitingApproval; POST /api/admin/youtube/uploads/{id}/approve; PUT /api/youtube/uploads/{id}/chunk (Content-Range header, body ≤ chunk size; streamed to YouTube); GET /api/youtube/uploads/{id} -> {status, confirmedOffset}; POST /api/youtube/uploads/{id}/resume {fileFingerprint}; DELETE /api/youtube/uploads/{id}

## Learning (Modules/Learning)
- GET /api/learn/courses/{slug} -> curriculum with youtubeVideoId per lesson (NO auth required for video ids; never gated), my progress if logged in
- GET /api/learn/lessons/{id} -> {lesson, youtubeVideoId, notesMarkdown, premiumNotesMarkdown (only if entitled, else null + premiumLocked:true), assessments[]}
- PUT /api/learn/lessons/{id}/progress {positionSeconds, completed}
- POST /api/learn/courses/{id}/enroll (free, no gate on video)
- GET /api/me/dashboard -> {enrollments[{course, progressPercent, lastLessonId}], entitlements[], certificates[], recentAttempts[]}
- Learner notes: GET /api/me/notes?lessonId=&q= ; POST /api/me/notes {lessonId,timestampSeconds?,body,tags}; PUT/DELETE /api/me/notes/{id}; GET /api/me/notes/export (markdown)
- Reviews: POST /api/courses/{id}/reviews {rating 1-5, body} (one per user; must be enrolled; upsert); GET /api/courses/{id}/reviews ; POST /api/studio/reviews/{id}/reply

## Questions (Modules/Questions)
- GET /api/studio/courses/{id}/questions?state=&q= ; POST /api/studio/courses/{id}/questions QuestionInput; PUT /api/studio/questions/{id} (creates new version; published versions immutable); POST /api/studio/questions/{id}/state {state} (Reviewer for Reviewed/Approved/Active; author cannot approve own)
- QuestionInput = {externalId, type, language, stem, explanation, difficulty, skillCode, certificationObjective, tags, sourceReference, allowShuffle, moduleId?, lessonId?, options[{text,isCorrect,rationale}]}
- Import: POST /api/studio/courses/{id}/questions/import/preview multipart(file csv|json, mode create|update, idempotencyKey) -> {batchId, rows[{row, externalId, ok, errors[]}], validCount, errorCount}; POST .../import/{batchId}/commit (atomic; refuses if any error); GET .../import/{batchId}/errors.csv
- GET /api/studio/courses/{id}/questions/export.csv (authors only; formula-injection neutralized)
- GET /api/templates/mcq-import.csv

## Assessment (Modules/Assessment)
- Studio: GET/POST /api/studio/courses/{id}/assessments {title,kind,mode,timeLimitMinutes,maxAttempts,passPercent,multiSelectScoring,questionCount,isPremium,countsTowardCertificate,moduleId?,lessonId?,questionIds[]}; PUT/DELETE /api/studio/assessments/{id}
- Learner: GET /api/assessments/{id} -> summary incl. scoring rules (no keys); POST /api/assessments/{id}/attempts -> AttemptView (premium assessments require entitlement; attempt limit)
- AttemptView = {id, status, deadlineAt, serverNow, items[{itemId, type, stem, options[{id,text}], selectedOptionIds[], flagged}]} — never includes isCorrect
- PUT /api/attempts/{id}/items/{itemId} {selectedOptionIds[], flagged} (rejected after deadline)
- POST /api/attempts/{id}/submit -> AttemptResult {scorePercent, passed, passPercent, correct, incorrect, unanswered, topics[{tag,correct,total}], review?[] (Practice: always; Exam: after submit), certificateCode?}
- GET /api/attempts/{id} ; GET /api/me/attempts
- Practice mode: POST /api/attempts/{id}/items/{itemId}/check -> {correct, correctOptionIds, rationales} (Practice only)

## Certificates
- GET /api/certificates/verify/{code} (public, rate-limited, minimal fields) ; GET /api/me/certificates ; POST /api/admin/certificates/{id}/revoke {reason}

## Commerce (Modules/Commerce)
- Studio: POST /api/studio/courses/{id}/packages {title, contents, price, currency, accessDays} (Proposed); Admin: POST /api/admin/packages/{id}/decision {decision}
- POST /api/checkout {packageId, idempotencyKey} -> {checkoutUrl} (503 'payments_not_configured' if Stripe keys missing — never fakes success)
- POST /api/webhooks/stripe (signature verified; idempotent by event id) -> marks Paid, grants Entitlement, writes CommissionLedger
- GET /api/me/orders ; POST /api/me/orders/{id}/refund-request {reason}; Finance: GET /api/admin/refunds; POST /api/admin/refunds/{id}/decision -> revokes only the purchase entitlement, reverses commission
- Instructor: GET /api/studio/earnings -> {entries[], totals}; Finance: POST /api/admin/payout-batches
