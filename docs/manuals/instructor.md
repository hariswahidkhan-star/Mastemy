# Instructor Manual

At launch, external instructor registration is off. Internal and invited authors use the studio (`/studio`). When a
SuperAdmin opens registration, applicants apply from `/teach`. An application includes a headline, a bio, expertise
evidence and a link to a short test video. A reviewer decides. Invited applicants use their invitation.

## Before your first submission

- **Agreement**: accept the current instructor agreement (`/studio` prompts you). You cannot submit a course for
  review without it.
- **Profile**: optionally publish a public instructor profile (`/me/profile`).
- **Payout profile** (`/studio` → Earnings → Payout profile): legal name, country, method (email or IBAN) and
  destination. The destination is stored encrypted and shown masked. Finance must mark your tax form as Verified
  before you can request a payout.

## Create a course

1. Studio → New course, or start from a template or the guided wizard. Enter the title, domain/categories, audience,
   prerequisites, outcomes, language and level.
2. Add modules and lessons. You can drag to reorder, create lessons in bulk from a list of titles, and duplicate
   modules, lessons or a whole course.
3. Attach a YouTube video to each lesson (see `docs/youtube-operations.md`). There are three ways:
   - paste a link or video ID of a video already on the approved channel;
   - import a playlist, which creates an editable draft and never publishes automatically;
   - when enabled, use "Upload via Mastemy". You must keep the file open in the browser. If the transfer is
     interrupted, select the same file again to resume.

   Mastemy shows each video's status: Ready, Processing, Restricted, Failed and so on. A lesson is learner-ready only
   when its video is Ready. Without a YouTube API key, a reviewer confirms the video manually.
4. Write lesson notes in Markdown (tables, `$formulas$`, code). Mark premium notes separately. Notes autosave. If
   someone else saved in the meantime, you are asked to reload rather than overwrite. Every save is a revision you can
   view and restore (History tab).
5. Upload resources (PDF, DOCX, PPTX, XLSX, CSV, TXT, MD, images) and captions (VTT/SRT, never premium). Each course
   has a quota.
   - Uploads are scanned for malware when scanning is enabled.
   - Videos and archives are refused.
6. Map skills and, if the course prepares for a certification, link lessons and questions to its objectives. The
   coverage report shows gaps.
7. Work through the course checklist, and preview as a free or premium learner on desktop, tablet or mobile.

## Course team

Owners add co-instructors and editors.

- Editors can change content but cannot submit, price or manage the team.
- Revenue shares are set per instructor.

## Questions and assessments

- Write SingleChoice or MultipleSelect questions with an explanation for every option. You can also set:
  - difficulty, cognitive level, skill and objective
  - images from course resources
  - case groups with a shared exhibit
  - "do not shuffle" for questions whose options must stay in order
- **Bulk import**: download the CSV or XLSX template (or use the JSON schema in `templates/`). Upload the file, map
  columns if the headers differ, then preview. Fix the row errors (a downloadable error report is available) and
  commit. Nothing is saved until commit. A file with errors is never partially imported. Large files are queued, and
  you can watch their status. Spreadsheet formulas are rejected.
- **Reuse**: copy your own questions, or staff-marked reusable ones, into another course. Copies are new Drafts.
- **Review**: questions move Draft → Reviewed → Approved → Active through reviewers. Editing an Active question creates
  a new version; past attempts keep their version.
- **Assessments**: lesson quiz, module test, diagnostic, final exam or mock. Configure question count, pass mark, time
  limit, attempt limit, scoring (all-or-nothing or partial credit), whether it counts toward the certificate, premium
  access, pause policy and exposure cap. Choose a certificate design.
- **Item analytics** show difficulty and discrimination once 30 or more learners have answered. Learner challenges
  appear in the course's challenge list.

## AI assistance (when enabled)

Ask for draft outlines, video scripts, lesson notes, caption cleanup or metadata. Drafts are never saved
automatically; you copy what you want and review it. AI MCQ drafts are created as Draft questions marked as
AI-generated and must pass normal review.

## Review and publishing

1. Submit for review (Draft → In Review).
2. Reviewers leave comments, which can point at a video timestamp or a question. They then approve or request changes.
   You cannot approve your own course.
3. Staff publish. Publishing creates a snapshot, and learners see that snapshot.
4. To change a live course, start an update (Updating). Learners keep seeing the published version until the next
   publish. Enrolled learners are notified of updates if they opted in.
5. You cannot delete a published course that has learners. Archiving a course never deletes its YouTube videos.

## YouTube publishing extras

For channels you are allowed to manage, you can sync the course playlist, set thumbnails and push caption files. These
need OAuth authorization of the channel. For instructor-owned channels (when enabled), remember that you control that
channel: deleting or restricting a video there breaks lessons for learners.

## Engaging learners

- Answer Q&A (your replies get an instructor badge) and mark threads resolved.
- Post announcements (live courses only, at most 3 per day). Enrolled learners are notified.
- Reply to reviews. Read issue reports in the Engagement tab.
- Course analytics show enrollments, active learners, the completion funnel, assessment pass rates, conversion and
  revenue. Analytics come from consenting visitors only.

## Pricing and promotions

- **Packages**: describe exactly which study services are included. Text that sells video access is rejected.
- **Regional prices**: propose prices per currency/country. Staff approve them.
- **Coupons**: own course/package only, up to 50% by default. Scholarship coupons need staff approval.
- **Referral codes**: when a learner buys with your code, your instructor share is the referral share.
- **Promotions**: opt in to staff promotions only if your price has been stable for 30 days. This prevents fake
  reference prices.

## Earnings and payouts

- Earnings come from paid services through the commission ledger, never from YouTube views. Refunds and chargebacks
  reverse the matching share.
- **Balances**: earnings clear after the refund window.
- **Payout request**: claims your whole cleared balance in a currency (minimum 50 by default). Finance batches and
  approves it, and the transfer is made outside Mastemy.
- **Statements**: download a monthly statement (CSV or PDF) at transaction level.

## Rules

- Videos must be free to watch. Do not ask learners to like, subscribe or share.
- Use only original or licensed content. No exam dumps.
- Keep your original video files; Mastemy does not store them, and you will need them to re-upload if YouTube removes
  a video.
- Suspension blocks studio changes and holds your earnings until it is reviewed.
