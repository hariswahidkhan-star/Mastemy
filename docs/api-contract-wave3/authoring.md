# Authoring productivity (wave 3, spec §9 / §21 localization)

Module: `src/Mastemy.Api/Modules/Authoring` (+ `Modules/Catalog/StudioService.cs`). Tables: `Authoring_LessonRevisions`,
`Authoring_CourseTemplates`, `Authoring_CourseChecklistItems`, `Authoring_CourseTranslations`, `Authoring_AgreementVersions`,
`Authoring_AgreementAcceptances`.

## Course-team scopes

| Role | Content (curriculum, notes, checklist, preview, duplicate module/lesson, bulk) | Management (submit, start-update, co-instructors, duplicate course, translations, analytics, pricing) |
|---|---|---|
| Owner / CoInstructor | yes | yes (co-instructors: owner only) |
| Editor | yes | **403 `editor_scope`** |
| Staff (Admin/SuperAdmin) | yes | yes |

`CourseScopeService.RequireCourseManager(courseId)` / `RequireContentEditor(courseId)` / `IsCourseManager(courseId)` are the
helpers other modules should call (e.g. Commerce package pricing should use `RequireCourseManager`).

## Optimistic concurrency (draft autosave)

| Endpoint | Notes |
|---|---|
| `GET /api/studio/lessons/{id}/notes` | `{lessonId, notesVersion, etag, notesMarkdown, premiumNotesMarkdown}`; `ETag: "n{notesVersion}"`. Authors, reviewers, staff. |
| `PUT /api/studio/lessons/{id}/notes` | **`If-Match` required**: missing → `428 precondition_required`; stale / weak / `*` → `412 precondition_failed`. Success returns the lesson and the new `ETag`. Each effective save stores a revision (author, time, full text). Two racing saves from one version: exactly one wins, the other gets 412. |
| `GET /api/studio/courses/{id}` | now sets `ETag: "c{updatedAtTicks}"` |
| `PUT /api/studio/courses/{id}` | optional `If-Match`; stale → 412 |

## Revisions & history

- `GET /api/studio/lessons/{id}/revisions` → `[{revision, authorId, authorName, createdAt, restoredFromRevision, notesLength, premiumNotesLength, isCurrent}]` newest first. Revision 1 is the pre-tracking base text.
- `GET /api/studio/lessons/{id}/revisions/{revision}` → full text.
- `POST /api/studio/lessons/{id}/revisions/{revision}/restore` (If-Match as for PUT notes) → appends a new revision with `restoredFromRevision`.
- `GET /api/studio/courses/{id}/history?page=1&pageSize=50` → `{courseId, page, pageSize, hasMore, items:[{kind: "audit"|"notes_revision", action, at, actorId, actorName, lessonId, revision, details}]}` (course AuditLog entries incl. `course.content_changed`, merged with notes revisions, newest first). Authors/reviewers/staff.

## Duplicate / bulk

- `POST /api/studio/courses/{id}/duplicate` `{title?}` → new **Draft** `StudioCourseDto` owned by the caller (managers only). Copies metadata, categories, modules, lessons and notes. Not copied: packages/prices, questions, assessments, resources, co-instructors. Videos: the same `VideoAsset` id is relinked only when the caller may reuse it (staff, uploader/owner of the video, or author of every course already using it — `VideoAssetSharing` rules); otherwise the lesson is left without a video. Ownership is never transferred.
- `POST /api/studio/modules/{id}/duplicate` → `StudioModuleDto` appended at the end (content editors).
- `POST /api/studio/lessons/{id}/duplicate` → `StudioLessonDto` appended to its module.
- `POST /api/studio/modules/{id}/lessons/bulk` `{titles: string[1..100]}` → created lessons in order.

## Templates & checklist

- Staff: `GET/POST /api/admin/course-templates`, `GET/PUT/DELETE /api/admin/course-templates/{id}` (DELETE = deactivate). Body `{name, description?, modules:[{title, lessons:[{title, objective?}]}], checklist: string[], isActive?}`. Limits: 50 modules, 100 lessons/module, 100 checklist items. Duplicate name → 409 `template_exists`.
- Instructors: `GET /api/studio/course-templates[/{id}]` (active only).
- `POST /api/studio/courses/from-template` `{templateId, course: CreateCourseRequest}` → Draft course with the skeleton + checklist (one transaction). Inactive/unknown template → 404.
- `GET /api/studio/courses/{id}/checklist`, `POST …/checklist {text}`, `PUT …/checklist/{itemId} {done}`.

## Translations

- `GET /api/studio/courses/{id}/translations` → other language variants `[{courseId, code, title, language, status}]`.
- `POST /api/studio/courses/{id}/translations {courseId}` → links the two courses' groups (caller must manage both; each language once per group → 409 `translation_language_taken`).
- `DELETE /api/studio/courses/{id}/translations` → unlinks the course.
- Public: `GET /api/courses/{slug}/languages` → live variants only `[{courseId, slug, language, title, isCurrent}]` (titles from published snapshots); 404 when the course is not live.

## Learner preview

`GET /api/studio/courses/{id}/preview?as=free|premium&device=desktop|mobile|tablet` (authors, reviewers, staff) →
`{courseId, as, device, isDraftPreview: true, curriculum: CurriculumDto, lessons: LessonViewDto[]}` built from the **draft** rows using
the learner DTO shapes of `/api/learn`. `as=premium` reveals premium notes; `as=free` locks them. Assessments appear as settings only:
the payload never contains questions, options, `isCorrect`, rationales or explanations.

## Instructor agreement

- Staff: `GET /api/admin/agreements`, `POST /api/admin/agreements {version, title, body}` (immutable; duplicate version → 409).
- `GET /api/studio/agreement` → `{current, required, accepted, acceptedAt}`; `POST /api/studio/agreement/accept {version}` (must equal current, else 409 `agreement_version_mismatch`; idempotent).
- Submit (`POST /api/studio/courses/{id}/submit`) by a non-staff user requires acceptance of the **current** version → otherwise 409 `agreement_required`. Current = `Authoring:RequiredAgreementVersion` when set (503 `agreement_misconfigured` if it does not exist), else the latest published version. With no agreement published, submission is not blocked.
