# YouTube Operations Runbook

Status: no Mastemy YouTube channel has been connected and no video has been uploaded. Recheck YouTube policies before launch: https://developers.google.com/youtube/terms/developer-policies

## Policies operators must follow

- Do not charge users to watch YouTube content. Videos are free; paid packages sell separate services (notes, MCQ banks, mocks, analytics, tutoring).
- Unlisted is not secure: anyone with the link can watch and share it. Never describe unlisted video as protected or exclusive.
- Do not promise ad-free playback or removal of recommendations.
- Do not require likes, subscriptions or shares; never reward views.
- API uploads from an unverified Google Cloud project created after 28 July 2020 are locked to private until the YouTube API audit passes. Such videos are shown as Restricted and must not be marked learner-ready.
- Use the official embedded player only. Never download or scrape YouTube videos, including as backup.

## Launch flow: YouTube Studio + paste link

1. Producer delivers the final master to the authorized channel operator (direct handoff, not via Mastemy).
2. Operator uploads in YouTube Studio to the approved Mastemy channel: title, description, captions, language, synthetic-media disclosure if applicable, visibility Public or Unlisted (not Private), embedding allowed, notify subscribers off for bulk lesson uploads.
3. Wait for processing to complete.
4. Author pastes the URL (`youtube.com/watch?v=`, `youtu.be/`, `/embed/`, `/shorts/`) or video ID into the lesson in Mastemy.
5. Mastemy validates format and, when `YouTube__ApiKey` is set, channel ID, privacy, processing and embeddable. Without a key, enter metadata manually; the video remains unverified until checked.
6. Reviewer opens the video in an access mode they can actually view, gives timestamped feedback, and approves.
7. Publish the course only when every lesson video is Ready.

## Source-master retention

- Mastemy never stores video files. Producers keep original source files locally or in storage they already control.
- Minimum policy: two copies on separate devices/media, one off-site; keep for the life of the course plus 12 months; record file name and checksum in the production package.
- Originals are the only recovery path if YouTube removes a video or the channel becomes unavailable.

## Availability checks

- Before publication: verify each video's ID, channel, visibility, processing, embeddable flag and lesson mapping.
- Periodic checks (planned job): re-query metadata, record timestamp, raise broken-link tasks for removed, private, embedding-disabled, region/age-restricted or channel-changed videos. Respect API quota and data-retention rules.
- Daily: review the admin YouTube status/broken-link queue.

## Takedown / removal handling

1. Video flagged unavailable or a takedown/claim notice received → mark lesson video Restricted/Failed; learners see an "unavailable" message, not a stale player.
2. Notify course owner and Admin; open a repair task.
3. Investigate: copyright claim, community-guidelines strike, owner deletion (Mode B), privacy change.
4. Resolve: dispute via YouTube Studio if justified, or fix content and re-upload from the retained original, then paste the new link.
5. If not recoverable, move course to Updating or archive; preserve learner notes, attempts and certificates.
6. Course deletion never deletes the YouTube video; deleting a channel asset is a separate, confirmed, authorized action.

## Integrated uploader (feature-flagged)

Keep `YouTubeApiUploadsEnabled` off until OAuth client verification, API audit, quota, and relay integration tests are complete. Studio + link remains the fallback at all times.
