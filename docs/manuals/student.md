# Student Manual

## Account

- **Register** with email and password. If the site sends email, confirm your address with the link (valid for 48
  hours, or resend it from your account). Switch language (English/العربية) and light/dark from the header.
- **Onboarding** (`/welcome`): set your goals, the skills you are interested in and your learning language. You can
  change them later.
- **Profile** (`/me/profile`): display name, headline, bio, preferred language, time zone and up to 5 https links.
- **Security** (`/me/security`):
  - Change your password. This signs out every session.
  - Turn on two-factor authentication: scan the QR code with an authenticator app, enter a code, and save the 10
    recovery codes. Each recovery code works once.
  - See and revoke your sessions.
- **Forgot password**: request a link from the sign-in page. It is valid for 1 hour, and only the newest link works.
  This needs the site to have email configured; otherwise contact support.
- **Privacy** (`/me/privacy`):
  - Download a copy of your data (JSON).
  - Delete your account. Deletion is immediate and cannot be undone. Your notes, sessions and profile are deleted.
    Orders, payments and certificates are kept for legal reasons. Certificates are made private, and your posts show
    as "Deleted user".
- **Skills** (`/me/skills`): add self-declared skills or external credentials. These are always shown as *not
  verified by Mastemy*. Skills from passed MCQ assessments are added automatically and labelled as MCQ-assessed
  knowledge.

## Finding courses

Browse the 14 subject domains and academies from the menu. You can also search (suggestions and "did you mean")
and filter by skill, certification, instructor, level, language, duration, freshness, price and rating. Other
discovery tools:

- wishlist, recently viewed, side-by-side comparison of up to 4 courses
- pathways (`/pathways`); enrolling in a pathway enrolls you in all of its live courses
- collections and the certification-preparation directory (`/certifications`)

Bestseller labels follow a published rule (`/bestseller-rule`). Ratings come only from real reviews.

## Watching and studying

- Videos play from YouTube and are **free to watch**. No purchase and no sign-in is needed to watch available videos.
  YouTube may show ads or recommendations; Mastemy does not control them.
- If a video is unavailable (removed, private, embedding disabled), the lesson explains why and offers a "Watch on
  YouTube" link where possible.
- Workspace tabs:
  - **Notes**: instructor study notes. Premium notes need a package.
  - **My notes**: private notes with the video timestamp. Click a timestamp to jump back. You can add tags, search
    and export your notes.
  - **Resources**: downloads. Premium ones are locked without a package.
  - **Transcript**: search the captions and click to seek.
  - **Q&A**: ask questions and read answers. Enrol to post.
  - **Announcements**.
  - **AI tutor**, when enabled.
- **Bookmarks** (`/me/bookmarks`) save a point in a video with a label. **Folders** (`/me/folders`) group your
  enrolled courses. **Continue learning** on `/me` takes you back to where you stopped.
- **Study plan** (`/me/study-plan`): choose courses, a target date and your weekly minutes. Mastemy schedules the
  remaining lessons and tells you whether the plan fits before the target date. You can download it as a calendar
  file (.ics) and turn on in-app reminders.
- **Report an issue** on a lesson (video unavailable, content or question error). The instructor is notified.

## Practice and exams

- **Practice sessions** (`/practice`): build a session from your courses, filtering by topic, skill, difficulty,
  objective, unseen questions, previous mistakes, bookmarked questions or questions due for spaced review. Check
  answers one at a time and see explanations. Practice never affects certificates. Premium banks need a package.
- **Quizzes, module tests, diagnostics and exams** are listed on lesson pages with their rules: question count, pass
  mark, time limit and scoring for multiple-select questions (all-or-nothing or partial credit). Read the scoring rule
  before you start.
- **Exam mode**:
  - The deadline is set by the server. The timer keeps running if you disconnect, and answers after the deadline are
    not accepted.
  - Pausing is possible only when the assessment allows it.
  - Explanations appear at the configured review point.
  - You can flag questions for review and move between them.
- **Accommodations** (extra time or untimed) are granted by staff and applied when you start an attempt. See your
  grants on `/accommodations`.
- **Results** show score, pass mark, correct/incorrect/unanswered, timing and topic strengths, plus recommended lessons
  for weak skills. Readiness estimates are estimates, not pass guarantees.
- **Challenge a question** you think is wrong. For exams, you can do this after submitting. If a question is regraded,
  your result is recalculated and you are notified.

## AI tutor (when enabled)

The tutor answers from the course's published material only and cites the lesson and timestamp. If the course does
not cover a question, it says so. It is not available while you have an exam in progress, and it will not answer live
assessment questions. AI practice questions are unreviewed and unscored. Your chats are private, even from staff.
They are deleted after a period of inactivity (90 days by default). Usage is limited per month (see `/me` → AI usage).

## Packages, subscriptions and gifts

- Packages (`/packages`), bundles (`/bundles`) and subscription plans (`/plans`) sell **study services**: premium
  notes, MCQ banks, mock exams, analytics and AI allowances. They never sell video access.
- Prices are shown in your currency where a regional price exists. Coupons (one per order), scholarships and
  instructor referral codes are entered at checkout. A crossed-out reference price appears only if it was really the
  regular price recently.
- You pay through Stripe. Access starts when the server receives Stripe's confirmation, not when you are redirected
  back.
- **Subscriptions**: cancel from `/me`. Access continues to the end of the paid period. If a renewal payment fails,
  you keep access for a short grace period.
- **Gifts**: buy a package as a gift. The code is either emailed to the recipient or shown to you once. Redeem a code
  at `/gift/redeem`.
- **Orders and invoices** (`/me/orders`): request a refund within the refund window (30 days by default) and download
  invoices and credit notes. Refunds remove the package's services only, never video access, and never access granted
  by your organization.

## Notifications and reviews

- The bell shows in-app notifications. In `/me/settings/notifications` you choose, per kind, whether to get in-app
  and/or email notifications. Email is off by default.
- You can write one review per course and edit it. A "verified purchase" label appears only if you really bought a
  package. If your review or post was hidden, you can appeal (`/me/appeals`).

## Certificates

Certificates are earned by passing the approved MCQ assessment, not by watch time. Each has a code and a QR link that
anyone can check at `/verify`, unless you make it private. You can:

- download the PDF
- request a name correction (the same code is re-issued)
- appeal a revocation

A certificate shows knowledge assessed by MCQs. It is not a professional licence or an external credential.

## Organizations

If your employer invites you, accept the invitation link while signed in with the invited email. Courses assigned to
you, with due dates, appear on `/me` under "Assigned by your organization". Your organization sees your progress,
scores and certificates for assigned courses, never your private notes.
