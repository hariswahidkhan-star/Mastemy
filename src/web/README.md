# Mastemy web client

React 19 + TypeScript + Vite single-page client for the Mastemy API (`docs/api-contract.md`).
All business rules, grading, permissions and payments live in the .NET API; this client never decides
anything the server must enforce.

## Requirements and scripts

Node 22+. Dependencies are pinned to exact versions in `package.json`.

| Script              | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Vite dev server on :5173, proxying `/api` to `http://localhost:5080` |
| `npm run build`     | Type-checks (`tsc -b`), builds the client to `dist/` and the SSR server to `dist-server/` |
| `npm run build:ssr` | Builds only the self-contained SSR server bundle (`dist-server/main.js`) |
| `npm start`         | Runs the SSR server (`PUBLIC_BASE_URL` required)             |
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
  "Watch on YouTube" link. If the API script cannot load (blocked/offline), a plain official embed
  iframe is shown instead so the video stays available (only progress saving is lost). Progress is
  saved best-effort every 15 s and on pause/end.
- Assessment attempts render only what `AttemptView` contains (no correctness); the countdown uses the
  `serverNow` offset; results come from `AttemptResult`.
- Integrated YouTube upload: the "Upload via Mastemy" tab tries `POST /api/youtube/uploads`; a 403
  (`uploads_disabled`) switches the tab to "Integrated upload is disabled; upload in YouTube Studio and
  paste the link". Chunks are 8 MiB with `Content-Range`; resume requires re-selecting the same file
  (SHA-256 of first 1 MiB + last 1 MiB + size).
- Every button calls a real endpoint from the contract; features without an endpoint are not shown.

## API contract notes (verified end to end)

The client was first built against `docs/api-contract.md` with mocks. It has since been run against the
real API in a browser (`e2e/`, Playwright) and the mismatches were fixed. Where the server shape differs
from what a screen wants, a small adapter in `src/api` converts it, so pages keep one view model:

- `api/hooks.ts` — `toLearnCourse` / `toLessonView`: the API returns `courseId` and nests per-learner
  `progress { positionSeconds, completed }`; the learn page reads them flattened onto lessons.
- `api/questions.ts` — questions come as metadata + `version` (+ optional staged `pending` edit) and take
  `tags` as a list; the question form edits a flat question with comma-separated tags.
- `pages/assessment/AttemptPage.tsx` — `GET /api/attempts/{id}` returns `{ attempt, result }`; review
  rationales arrive inside each item's `options`, practice-check rationales as `[{ optionId, rationale }]`.
- Course `outcomes` are a string list on read and write (one per line in the form). The wizard's
  "goals" step is guidance only; the API does not store it, so the editor does not show it.
- `GET /api/studio/courses/{id}` lessons include `video` (`VideoAssetDto`) and `code`; the import panel
  shows the course/module/lesson codes the CSV needs (`CourseCode`, `ModuleCode` `M1`, `LessonCode` `M1.L1`).
- Catalogue cards list instructors as display names; the course page sends `{ userId, displayName, role }`.
- Earnings `totals` is one entry per currency `{ currency, instructorAmount, grossSales, entries }`;
  ledger rows and admin package proposals include `courseTitle`.
- Lesson pages list lesson practice plus the module's tests and course-wide exams, each with its scoring
  summary (`questionCount`, `passPercent`, `timeLimitMinutes`, ...).
- Dashboard entitlements reference the course as `course { id, slug, title }`; orders and refund requests
  use `GET /api/me/orders` and `POST /api/me/orders/{id}/refund-request`.
- Admin screens added for endpoints the UI lacked: register a Mastemy-managed YouTube channel and
  confirm/reject manually linked videos (YouTube videos page), and reviewer question review
  (Draft → Reviewed → Approved → Active, review queue, including Draft courses).
- Business-rule refusals (`403` with problem type `forbidden`) show the server's reason.
- Remaining tolerance: list endpoints are read either as a bare array or `{ items, total, page, pageSize }`;
  problem `type` values are matched on their suffix. `CourseDetailDto.refundTerms` is not sent, so the
  platform refund text is shown. Upload chunk responses are re-read from `GET /api/youtube/uploads/{id}`
  after a failure (not exercised end to end: integrated uploads need YouTube OAuth).

## SEO and server rendering (spec §21)

Implemented:

- **On-demand server rendering** (`server/main.ts`, `src/ssr/`). A `node:http` server renders the public
  routes `/`, `/courses`, `/courses/:slug`, `/categories/:slug`, `/free-lessons`, `/verify`, `/teach`,
  `/about`, `/help`, `/contact` with `renderToString` + `StaticRouter`, fetching data from the API
  (`API_INTERNAL_URL`) with the same react-query hooks the browser uses (render, fetch what the page asked
  for, re-render). Rendered HTML is cached per URL for `SSR_CACHE_SECONDS` (default 60). The dehydrated
  query cache is embedded as `window.__MASTEMY_SSR__`; `main.tsx` hydrates it and calls `hydrateRoot`, so
  there is no loading flash or refetch. When a visitor's first render would differ from the anonymous
  server render (signed in, stored language differs from the URL, explicit theme), the client renders
  fresh but still reuses the embedded data.
- **Metadata**: title/description come from each page's `usePageMeta` (collected during the server render),
  plus robots, canonical URL, `hreflang` alternates (`en`, `ar`, `x-default`), Open Graph and Twitter tags.
- **Localized URLs**: there is no locale path prefix. English is the bare URL; Arabic is the same URL with
  `?lang=ar` (the URL language wins over the stored preference; `?lang` does not overwrite it).
- **Structured data**: `Course` JSON-LD on course pages (provider Mastemy, creators, level, language,
  outcomes, `CourseInstance` online). `aggregateRating` only appears when the course has real reviews
  (`ratingCount > 0`). The home page carries `Organization` JSON-LD.
- **Kept out of indexes**: every non-public route (`/learn`, `/me`, `/studio`, `/admin`, `/attempts`,
  `/login`, `/register`, unknown paths) gets the empty SPA shell with `noindex, nofollow` and no data;
  certificate results (`/verify/:code`) render but are `noindex`; unknown courses/categories return 404 +
  `noindex`. Private notes, paid resources and answers are never fetched by the renderer (it is anonymous).
- **Sitemap and robots** are generated by the API (`GET /sitemap.xml`, `GET /robots.txt`, also under
  `/api/seo/`) from live catalogue data and `Seo:PublicBaseUrl`; nginx and the SSR server proxy them.

Deployment: the `web` image runs nginx (static assets, `/api` proxy) in front of the SSR server on
127.0.0.1:3000. It needs `PUBLIC_BASE_URL`; the API needs `Seo:PublicBaseUrl` (same value).

Not done: build-time prerendering to static files (pages are rendered on demand and cached instead) and
instructor profile pages (no public instructor route exists yet).

## Accessibility

Components use native semantics (buttons, labels, fieldset/legend for MCQs, `role="tab"` with roving
focus, modal dialogs with focus trap and restore, `aria-live` toasts), visible `:focus-visible` outlines,
logical CSS properties for RTL, and colour tokens chosen for WCAG AA contrast. This has not yet been
audited with assistive technology, so no conformance claim is made.
