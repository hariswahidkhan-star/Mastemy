# Wave 2: resources, captions, transcript search, certificate PDF

Errors are RFC 7807 problem details; `type` carries the error code.

## Configuration

| Key | Meaning |
| --- | --- |
| `Resources:RootPath` | Blob directory (relative to the content root unless absolute) |
| `Resources:MaxFileBytes` | Per-file limit (413 `file_too_large`) |
| `Resources:PerCourseQuotaBytes` | Sum of a course's resource sizes (413 `quota_exceeded`) |
| `Certificates:VerifyBaseUrl` | Base of the public verification link printed and QR-encoded on PDFs, e.g. `https://mastemy.example/verify` (default `/verify`) → `<base>/<CODE>` |

## Studio (authors of the course; staff). Mutations require the course to be editable (Draft, ChangesRequested, Updating), otherwise 409 `course_not_editable`.

| Method | Route | Notes |
| --- | --- | --- |
| GET | `/api/studio/courses/{courseId}/resources` | `ResourceDto[]` (authors, reviewers, staff) |
| GET | `/api/studio/courses/{courseId}/resources/usage` | `{ usedBytes, quotaBytes, maxFileBytes }` |
| POST | `/api/studio/courses/{courseId}/resources?lessonId=&kind=Resource\|Caption&language=&isPremium=` | `multipart/form-data`, one part named `file`. 201 `ResourceDto` |
| PUT | `/api/studio/resources/{id}/file?isPremium=` | multipart replace; `version` + 1, old blob released |
| PATCH | `/api/studio/resources/{id}` | `{ isPremium }` |
| DELETE | `/api/studio/resources/{id}` | 204 |

`ResourceDto { id, courseId, lessonId, kind, language, fileName, contentType, sizeBytes, sha256, isPremium, version, createdAt }`

Allowed: pdf, docx, pptx, xlsx, csv, txt, md, png, jpg/jpeg, webp, vtt, srt. Extension AND magic bytes are verified
(OOXML: zip with `[Content_Types].xml` and the right part folder; text: UTF-8 without control characters).
Errors: 415 `video_not_allowed` (any video/audio extension, or video/audio content under any extension; videos must be on YouTube),
415 `archive_not_allowed`, 415 `file_type_not_allowed`, 415 `file_content_mismatch`, 409 `duplicate_resource` (same SHA-256 already in the course),
413 `file_too_large`, 413 `quota_exceeded`, 400 `multipart_required` / `file_required`.
File names are reduced to a display name (last path segment, control/reserved characters replaced); storage keys are SHA-256 only.

Captions: `kind=Caption`, `lessonId` required, `language` BCP-47 (normalized, e.g. `en-GB`; 400 `invalid_language`), `.vtt`/`.srt` only,
every cue timing parsed and validated (400 `invalid_caption_file`), never premium (400 `captions_must_be_free`).

## Learner (anonymous allowed; course must be live unless the caller is an author/reviewer/staff — otherwise 404)

| Method | Route | Notes |
| --- | --- | --- |
| GET | `/api/learn/lessons/{lessonId}/resources` | `LearnerResourceDto[]` — premium items without entitlement: `locked: true`, `downloadUrl: null` |
| GET | `/api/learn/resources/{id}/download` | streams file, `Content-Disposition: attachment`, `X-Content-Type-Options: nosniff`, CSP sandbox. Premium: 401 anonymous, 403 `premium_required` without entitlement (re-checked on every request) |
| GET | `/api/learn/lessons/{lessonId}/captions` | `[{ id, language, url, version }]` |
| GET | `/api/learn/captions/{id}/vtt` | `text/vtt` (SRT converted on the fly) |
| GET | `/api/learn/lessons/{lessonId}/transcript?q=&language=` | q 2–200 chars, case-insensitive over the course's own caption files. `[{ captionId, language, startSeconds, endSeconds, start: "HH:MM:SS.mmm", text }]` (max 200) |

`LearnerResourceDto { id, lessonId, kind, language, fileName, contentType, sizeBytes, isPremium, locked, version, downloadUrl }`

## Certificates

| Method | Route | Notes |
| --- | --- | --- |
| GET | `/api/certificates/{code}/pdf` | owner (bearer) or anyone while `publiclyVisible`; hidden → 404 for others; revoked → 410 `certificate_revoked` (also for the owner). `application/pdf` attachment |
| PUT | `/api/me/certificates/{id}/visibility` | `{ publiclyVisible }` owner only (others 404). Returns `MyCertificateDto`. Hidden certificates also 404 on `/api/certificates/verify/{code}` |

The PDF (A4 landscape) shows recipient, course title, issue date, score, criteria text, certificate code, verification URL and QR code,
issuer "Mastemy", and a statement that it attests MCQ-assessed knowledge and is not a professional licence.
