# Admin Manual

## Feature flags (SuperAdmin)
Settings → Platform features. Every change is audited. Defaults: ExternalInstructorRegistrationEnabled off, InstructorApplicationsInviteOnly on, InstructorOwnedChannelsEnabled off, YouTubeApiUploadsEnabled off. Turning a flag on never auto-approves courses or changes existing permissions. Keep the uploader off until OAuth verification, API audit and tests are complete.

## Review queue
Courses In Review appear in the queue. Check: outcomes covered by video + notes + MCQs; every lesson video Ready on the correct channel; MCQ rationales and answer keys; rights. Approve or request changes with comments. Publish only approved courses.

## Users and roles
Assign roles (Instructor, Reviewer, Moderator, Support, Finance, Admin). Only SuperAdmin grants Admin/SuperAdmin.

## Commerce
Orders are paid only when the Stripe webhook confirms them. Review entitlements and the commission ledger. Packages must sell services, not video access.

## YouTube status
Monitor broken or restricted videos and follow `docs/youtube-operations.md` for takedowns. Archiving a course does not delete YouTube videos.

## Backups
See `docs/deployment-runbook.md`. Backups never include video files.
