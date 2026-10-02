# Admin Manual (Admin, SuperAdmin, Reviewer, Moderator)

Every privileged action is written to the audit log (Admin → Audit). Staff roles need two-factor authentication. On
first sign-in you are asked to enroll an authenticator app; keep your recovery codes offline. Finance tasks are in
`finance.md`, and organization managers have `organization-admin.md`.

## SuperAdmin

- **Feature flags** (Admin → Settings / Flags). Every change is audited. Defaults:
  - `ExternalInstructorRegistrationEnabled`: off
  - `InstructorApplicationsInviteOnly`: on
  - `InstructorOwnedChannelsEnabled`: off
  - `YouTubeApiUploadsEnabled`: off

  Turning a flag on never approves courses or changes existing permissions. Keep the uploader off until OAuth
  verification, the YouTube API audit and a real test upload are done (`docs/launch-checklist.md`).
- **Roles** (Admin → Users): only a SuperAdmin assigns roles. A user's email must be verified before they get a
  privileged role (Admin, SuperAdmin, Finance, Reviewer, Moderator). Without SMTP, mark it verified manually after
  confirming the person's identity. The **Support** role currently grants no extra capability (see `role-matrix.md`).

## Users

- Search users, view email-verification and MFA state, resend verification, and suspend or unsuspend. Suspension
  ends sessions immediately.
- Users delete their own accounts; staff cannot recover a deleted account.

## Instructor onboarding

- Send instructor invitations (Admin → Applications).
- Reviewers decide applications. Check the expertise evidence and the test video, and record the reason.
- Publish instructor agreement versions (Admin → Agreements). Versions are immutable. The agreement text must be
  reviewed by a lawyer before use.
- Maintain course templates and their checklists (Admin → Templates).

## Course review (Reviewer, Admin)

- The review queue lists courses In Review.
- Use the diff against the published snapshot and the learner preview. Leave comments on a lesson, a video timestamp
  or a question.
- Check that:
  - every promised outcome is covered by video, notes and MCQs;
  - every lesson video is Ready on the correct channel;
  - answer keys and rationales are correct;
  - rights are declared;
  - packages sell study services only.
- Approve or request changes. You cannot approve a course you author.
- Admins publish approved courses. Publishing creates a new snapshot. Archiving is available but never deletes YouTube
  videos.
- Approve or reject proposed packages.

## Question quality (Reviewer, Admin)

- **Question review queue**: Draft → Reviewed → Approved → Active. Different reviewers should perform each step.
- **Challenges**: resolve with NoChange, Revise or Retire. You cannot resolve challenges on your own course.
- **Regrades**: a reviewer proposes a corrected key with a reason, and a *different* staff member approves it. Approval
  re-scores the affected attempts, issues new certificates and flags certificates of newly failing attempts. Staff
  decide flagged certificates; certificates are never revoked automatically.
- Mark Active questions as reusable across courses.
- Grant **accommodations** (extra time or untimed) per learner, globally or per assessment.
- **Certificate corrections** (name changes) and **appeals** of revocations are decided under Admin → Certificates.
  Revoke a certificate only with a recorded reason.

## YouTube

- Register the Mastemy-managed channel and authorize it with OAuth (Admin → Videos / Channels).
- Without an API key, confirm or reject manually linked videos.
- Approve upload requests (metadata and rights) before any transfer.
- Monitor the broken-link queue (Admin → Operations) and notify instructors. Follow `docs/youtube-operations.md` for
  takedowns. Video status is re-checked every `YouTube:RecheckHours` when an API key is set.

## Catalog and discovery

- Skills catalog (codes, hierarchy). The unknown-question-codes report lists skill codes used in questions that are
  missing from the catalog.
- **Certification directory**: issuers, certifications, objectives (weights) and course links.
  - Verification states need an https official source, a check within 180 days, and a reviewer different from the
    last editor.
  - Any edit hides the entry again until someone re-verifies it. Work the stale re-check queue regularly.
- Pathways, collections (editorial Featured rows), academies, bestseller recompute.
- Production backlog: course ideas with owner and update owner, and roadmap import (`docs/course-roadmap.md`).
- Categories are seeded; there is no category editor in the admin UI.

## Commerce settings (Admin)

- Coupons of any scope. Scholarship coupons need an approver other than their creator.
- Regional price proposals: approving one writes price history.
- Promotions: at most 31 days, within the configured percent limits.
- Bundles must cost less than their parts.
- Subscription plans: price, interval and scope are fixed after creation.

## Trust & safety (Admin)

- **Complaints** (Admin → Trust):
  - Triage daily.
  - Dismiss, Hide (reviews and posts are hidden; lessons and resources get a takedown hold and learners see "content
    unavailable") or Archive the course. Write a note.
  - The complainant and the instructors are notified.
- **Holds**: release after an accepted counter-notice.
- **Moderation** (Moderator, Admin): hide or unhide discussions and replies with a reason. Decide appeals; where
  possible, use a different person from the one who hid the content.
- **Instructor suspension**: blocks studio writes immediately and moves earnings into a held batch. Learners keep
  access. Reinstating releases the earnings.
- Malware detections and incident handling: `docs/operations/runbook.md`.

## Organizations (Admin)

Create organizations with a seat limit, change seats (never below usage), and deactivate or reactivate them.
Deactivating revokes all org-granted premium access. Day-to-day member management is done by the org's own admins.

## Dashboards

- **Analytics dashboard**: signups, active learners, published courses, revenue and refunds by currency, videos
  needing repair, overdue content (no re-publish for 12 months), and review queues.
- **AI usage** (Admin → AI): tokens and estimated cost by feature, model, user and org. Conversation metadata only,
  never content. You can force an index rebuild for a course.

## Health and operations

`/health/ready` with a staff token shows MySQL, storage, email outbox and scanner state. Backups, restore drills, key
rotation and incidents: `docs/operations/runbook.md` and `docs/deployment-runbook.md`. Backups never include video
files.
