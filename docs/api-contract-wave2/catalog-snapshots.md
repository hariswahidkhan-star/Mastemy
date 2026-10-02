# Catalog: published snapshots (wave 2)

## GET /api/studio/courses/{id}/published-preview
Auth: course author (owner/co-instructor/editor), Reviewer, Admin/SuperAdmin. 403 otherwise; 404 if the course was never published.
Response `PublishedPreviewDto`: `{ courseId, version, publishedAt, publishedBy, payload }` where `payload` is
`{ title, subtitle, description, audience, prerequisites, outcomes (newline-separated), language, level, credentialType, passThresholdPercent, promoVideoId, categories: int[], modules: [{ id, code, title, sortOrder, lessons: [{ id, code, title, objective, sortOrder, isPreview, videoAssetId, youtubeVideoId, durationSeconds, notesMarkdown, premiumNotesMarkdown, notesVersion }] }] }`.

## GET /api/review/courses/{id}/diff
Auth: same as above (authors may see their own diff). 401 anonymous.
Response `CourseDiffDto`: `{ courseId, status, baseVersion (null if never published), hasChanges, courseFields: [{ field, before, after }], modulesAdded: [{ id, title }], modulesRemoved, modulesChanged: [{ id, title, changes: [{ field, before, after }] }], lessonsAdded: [{ id, moduleId, title }], lessonsRemoved, lessonsChanged }`.
Lesson fields compared: moduleId, title, objective, sortOrder, isPreview, videoAssetId, youtubeVideoId, notesMarkdown, premiumNotesMarkdown. Module fields: title, sortOrder.

## Changed behaviour
- `POST /api/admin/courses/{id}/publish` creates snapshot version `PublishedVersion + 1`; 409 `concurrent_publish` on a racing publish.
- Public catalog and learner endpoints read the latest snapshot (see docs/traceability-register.md).
- `CurriculumLessonDto` and `LessonViewDto` gain `videoUnavailableReason` (string|null), set when the snapshot's video asset is no longer Ready.
- `PUT /api/learn/lessons/{id}/progress` returns 409 `lesson_retired` for a lesson still in the published snapshot but deleted from the working copy.
