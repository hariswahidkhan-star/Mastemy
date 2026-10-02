# YouTube (wave 2)

## Multi-instance behaviour
- Upload chunk/resume use a DB lease on `YouTubeUploadSession` (`LockToken`, `LockedUntil`), taken with one conditional UPDATE
  and renewed while a chunk streams. Config `YouTube:UploadLeaseSeconds` (default 120). A second concurrent chunk/resume on any
  instance gets `409 chunk_in_progress`. `DELETE /api/youtube/uploads/{id}` waits up to 2 s for the lease; if a chunk is in flight
  the cancel is still applied (conditional update) and the chunk holder never overwrites it.
- Every relay write of session state (status, confirmedOffset, upstream URI, failure, result) is a conditional UPDATE on
  `LockToken == <this holder's token>`. If the lease renewer finds the lease gone (another instance took it after it expired) or
  renewal fails twice in a row, it cancels the in-flight upstream transfer; the chunk/resume request then returns
  `409 lease_lost` and the stale holder writes nothing (its staged audit/asset rows are discarded). Clients should
  `GET /api/youtube/uploads/{id}` and resume from the reported `confirmedOffset`.
- OAuth state nonces are stored in `OAuthNonces` (inserted at `/oauth/start`, consumed once at callback on any instance);
  expired rows are removed hourly. OAuth now also requests `youtube.force-ssl` (needed for playlists/captions).

## Publishing extras (spec §10.5)
Rules for all three: channel must be OAuth-authorized (`409 channel_not_authorized`, also when Google reports revoked/expired);
Mastemy-managed channel → staff only; instructor-owned channel → its owner (or staff) (`403`). Caller must author the course (or be staff).
Missing management scope → `409 youtube_scope_missing`; quota → `503 youtube_quota_exhausted`; other upstream → `502 youtube_upstream_error`.

### POST /api/studio/courses/{id}/youtube/playlist/sync
Body (optional): `{ "privacyStatus": "unlisted" | "private" | "public" }` (used only when creating; default unlisted).
Finds (by title `Mastemy: {course code}` via playlists.list mine) or creates the playlist on the course's channel, then makes its items
exactly match lesson videos on that channel in module/lesson order (insert/update position/delete).
`409 course_channel_missing` if the course has no channel.
Response 200: `{ playlistId, created, videoCount, inserted, moved, removed, skippedLessonIds[] }` (skipped = videos on other channels / Failed / Restricted).

### POST /api/studio/videos/{id}/thumbnail
multipart/form-data, field `file`: JPEG or PNG (magic bytes checked), ≤ 2 MB → thumbnails.set. Never stored.
`400 invalid_thumbnail`. Caller must author a course using the video, or be its uploader (else 404).
Response 200: `{ videoId }`.

### POST /api/studio/videos/{id}/captions
Body `{ "resourceFileId": guid }`. ResourceFile must be `Kind = Caption` (`400 not_a_caption`), have a valid language
(`400 invalid_caption_language`), belong to a course using this video (and, if lesson-bound, that lesson's video) (`400 caption_course_mismatch`).
File is read from `Resources:RootPath/StorageKey` (path escape or missing → `409 resource_missing`; SHA-256 mismatch → `409 resource_integrity`),
max `YouTube:MaxCaptionBytes` (10 MB) → captions.insert.
Response 200: `{ captionId, videoId, language }`.
