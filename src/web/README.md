# Mastemy web client

React 19 + TypeScript + Vite single-page client for the Mastemy API (`docs/api-contract.md`).
All business rules, grading, permissions and payments live in the .NET API; this client never decides
anything the server must enforce.

## Requirements and scripts

Node 22+. Dependencies are pinned to exact versions in `package.json`.

| Script              | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Vite dev server on :5173, proxying `/api` to `http://localhost:5080` |
| `npm run build`     | Type-checks (`tsc -b`) and builds to `dist/`                 |
| `npm run typecheck` | TypeScript only                                              |
| `npm run lint`      | ESLint (typescript-eslint, react-hooks) + Prettier check     |
| `npm test`          | Vitest + Testing Library (jsdom)                             |

Environment (`.env.example`):

- `VITE_API_BASE_URL` – absolute API origin for production builds. Empty means same-origin `/api`.
- `VITE_SUPPORT_EMAIL` – optional support address shown on the Contact page. When unset, the page says
  no address has been published instead of inventing one.

## Structure

```
src/
  api/          fetch client (bearer token in memory, refresh token in localStorage,
                single-flight refresh on 401, RFC 7807 errors), DTO types, react-query hooks
  auth/         AuthProvider (roles from /api/auth/me) and RequireRole route guard
  i18n/         en.json / ar.json dictionaries, provider sets <html lang dir>
  theme/        light/dark via CSS custom properties, prefers-color-scheme + persisted toggle
  components/   accessible UI kit (Button, Field, Select, Checkbox, Dialog, Tabs, Toast,
                EmptyState, Spinner, ErrorState, Badge, Pagination), YouTubePlayer, Markdown
  lib/          countdown (server offset), chunked uploader + fingerprint, YouTube API loader, SEO hook
  pages/        public, learn, assessment, me, studio, admin
  styles/       tokens.css (design tokens) and global.css (logical properties only, RTL-safe)
```

## Product rules reflected in the UI

- Video is never gated: `/learn/:slug/:lessonId` has no login wall; only notes, practice and premium
  notes require an account or entitlement. The course page and Free Video Lessons page carry the notice
  "All video lessons are free to watch on YouTube; paid packages cover Mastemy study services only".
- The player is the official IFrame Player API (script loaded once, `youtube-nocookie.com` host), with
  nothing drawn over it. Player error codes 2/5/100/101/150/153 show an explanation and a
  "Watch on YouTube" link. Progress is saved best-effort every 15 s and on pause/end.
- Assessment attempts render only what `AttemptView` contains (no correctness); the countdown uses the
  `serverNow` offset; results come from `AttemptResult`.
- Integrated YouTube upload: the "Upload via Mastemy" tab tries `POST /api/youtube/uploads`; a 403
  (`uploads_disabled`) switches the tab to "Integrated upload is disabled; upload in YouTube Studio and
  paste the link". Chunks are 8 MiB with `Content-Range`; resume requires re-selecting the same file
  (SHA-256 of first 1 MiB + last 1 MiB + size).
- Every button calls a real endpoint from the contract; features without an endpoint are not shown.

## Contract assumptions

The contract does not spell out every DTO field. Where the client needed one it is typed as optional
in `src/api/types.ts` (marked "assumed") and the UI degrades gracefully when it is absent:

- List endpoints may return either a bare array or `{ items, total, page, pageSize }`.
- `CourseDetailDto.credentialType` and `refundTerms` (fallback texts are shown when missing).
- `LessonViewDto.lesson.positionSeconds` / `LearnCourseDto` lesson `positionSeconds`, `completed` for resume.
- `AttemptView.mode`, `assessmentTitle` and `result` (present on `GET /api/attempts/{id}` once submitted).
- `PracticeCheck.rationales` keyed by option id; review rationales as a map or `[{optionId,text}]`.
- `GET /api/review/courses/{id}/comments` is readable by the course author (for the studio review tab).
- `GET /api/admin/packages?status=Proposed` lists package proposals (the contract only lists the
  decision endpoint). Refund/package decisions are posted as `{ decision: "Approve" | "Reject" }`.
- `PUT /api/studio/lessons/{id}` accepts `{ title, objective, isPreview }`; studio course GET returns
  modules → lessons including `notesMarkdown`, `premiumNotesMarkdown` and `video` (`VideoAssetDto`).
- Chunk `PUT` may return `{ status, confirmedOffset }`; otherwise the client advances by the chunk size
  and re-reads `GET /api/youtube/uploads/{id}` after a failure.
- Problem `type` values are matched on their suffix (e.g. `.../uploads_disabled`, `payments_not_configured`).

## SEO and crawlable public pages (plan, not implemented)

Today the app is a client-rendered SPA. Each page sets `<title>`, meta description and robots via
`usePageMeta`; private pages (dashboard, notes, attempts, studio, admin) are marked `noindex`.
**Public pages are not yet prerendered, so crawlers that do not execute JavaScript see an empty shell.**

Planned approach:

1. Add a build step that prerenders public routes (`/`, `/courses`, `/courses/:slug`,
   `/categories/:slug`, `/free-lessons`, `/teach`, `/help`, `/about`, `/contact`, `/verify`) to static
   HTML using React's `renderToString`/`prerender` from `react-dom/server` with data fetched from the API
   at build time (or on a schedule), then hydrate with `hydrateRoot`.
2. Emit `sitemap.xml`, canonical URLs, `hreflang` alternates for `en`/`ar`, and `Course` JSON-LD on course
   pages from the same build step.
3. Keep notes, premium content, attempts and answer keys out of prerendered output.

## Accessibility

Components use native semantics (buttons, labels, fieldset/legend for MCQs, `role="tab"` with roving
focus, modal dialogs with focus trap and restore, `aria-live` toasts), visible `:focus-visible` outlines,
logical CSS properties for RTL, and colour tokens chosen for WCAG AA contrast. This has not yet been
audited with assistive technology, so no conformance claim is made.
