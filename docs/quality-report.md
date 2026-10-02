# Web quality report

Measured on 2026-10-02. Everything here comes from real runs. The stack was the production client and SSR build (`npm run build`), the Node SSR server (`dist-server`) with `API_INTERNAL_URL` and `PUBLIC_BASE_URL`, and the API in the Development environment on a fresh MySQL database (`mastemy_dod_web`). Content was seeded over the API by `e2e/lighthouse/seed.mjs`: a reviewed and published course with 2 modules, 3 lessons with notes, YouTube videos confirmed through the manual path, an approved MCQ quiz, an approved study package and a publicly visible certification.

Reproduce the Lighthouse numbers with `scripts/lighthouse.sh`. It uses `npx lighthouse@12`, Chromium in headless mode, the default mobile config and `--preset=desktop`. The "after" numbers are the median of 3 runs. The "before" numbers come from commit `f03f71d`, built and audited the same way with 1 run.

## Lighthouse scores

Scores are listed as Performance / Accessibility / Best Practices / SEO.

| Page | Mobile before | Mobile after | Desktop before | Desktop after |
| --- | --- | --- | --- | --- |
| Home `/` | 41 / 100 / 100 / 100 | **98 / 100 / 100 / 100** | 88 / 100 / 100 / 100 | **100 / 100 / 100 / 100** |
| Courses `/courses` | 44 / 98 / 100 / 100 | **97 / 100 / 100 / 100** | 88 / 98 / 100 / 100 | **100 / 100 / 100 / 100** |
| Course detail `/courses/<slug>` | 45 / 100 / 100 / 100 | **96 / 100 / 100 / 100** | 88 / 100 / 100 / 100 | **99 / 100 / 100 / 100** |
| Category `/categories/<slug>` | 45 / 98 / 100 / 100 | **98 / 100 / 100 / 100** | 88 / 98 / 100 / 100 | **100 / 100 / 100 / 100** |
| Certifications `/certifications` | 45 / 98 / 100 / 100 | **98 / 100 / 100 / 100** | 88 / 98 / 100 / 100 | **100 / 100 / 100 / 100** |
| Article `/articles/how-mcq-certificates-work` | 45 / 100 / 100 / 100 | **97 / 100 / 100 / 100** | 88 / 100 / 100 / 100 | **99 / 100 / 100 / 100** |
| Login `/login` | 57 / 100 / 96 / 54 | **98 / 100 / 100 / 100** | 90 / 100 / 96 / 54 | **100 / 100 / 100 / 100** |
| Verify `/verify` | 44 / 100 / 100 / 100 | **98 / 100 / 100 / 100** | 88 / 100 / 100 / 100 | **100 / 100 / 100 / 100** |

## Core Web Vitals

### Lighthouse lab metrics (after)

Total Blocking Time (TBT) is the lab stand-in for INP.

| Page | Mobile LCP | Mobile TBT | Mobile CLS | Desktop LCP | Desktop TBT | Desktop CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Home | 1874 ms | 81 ms | 0 | 653 ms | 0 ms | 0 |
| Courses | 1894 ms | 111 ms | 0 | 664 ms | 0 ms | 0 |
| Course detail | 2021 ms | 158 ms | 0 | 742 ms | 0 ms | 0 |
| Category | 1874 ms | 95 ms | 0 | 519 ms | 0 ms | 0 |
| Certifications | 1874 ms | 79 ms | 0 | 406 ms | 0 ms | 0 |
| Article | 1878 ms | 134 ms | 0 | 785 ms | 0 ms | 0 |
| Login | 1911 ms | 30 ms | 0 | 637 ms | 0 ms | 0 |
| Verify | 1877 ms | 39 ms | 0 | 650 ms | 0 ms | 0.011 |

Before the changes, mobile LCP was 7.55–7.74 s on every page and CLS was 0.262 on mobile and 0.11 on desktop. TBT reached 241 ms on the home page.

### In-browser measurements (`e2e/tests/perf.spec.ts`)

The spec runs a real browser against the SSR server. INP is measured with Event Timing (`PerformanceObserver` type `event`, grouped by `interactionId`, worst interaction), the same method as web-vitals. Conditions are mobile-like: a 360×780 viewport and 4× CPU throttling.

| Interaction flow | INP | LCP | CLS |
| --- | --- | --- | --- |
| Home: open the menu and the Explore mega-menu | 40 ms | 552 ms | 0 |
| Courses: type a search and toggle compare | 48 ms | 380 ms | 0 |
| Course detail: switch theme and language (Arabic dictionary chunk) | 120 ms | 456 ms | 0 |
| Login: fill the form | 24 ms | 296 ms | 0 |

Page loads on all 23 public pages also stay under budget, with LCP < 2.5 s and CLS < 0.1. In this setup LCP ranged from 276 ms to 1156 ms and CLS was 0 on every page.

## Bundles

Sizes are gzip, from `src/web/scripts/check-budgets.mjs`, which is enforced in CI.

| | Before | After | Budget |
| --- | --- | --- | --- |
| Initial JS (entry plus its static imports) | 332.8 kB (17 files) | **133.7 kB** (9 files) | 150 kB |
| Initial CSS | 7.8 kB | 7.0 kB (inlined into the HTML by the SSR server) | 12 kB |
| Largest lazy route (beyond the initial set) | 126.4 kB | 202.5 kB (studio course editor) | 225 kB |
| Lazy route chunks | 27 | 40 | |

The initial bundle shrank for three reasons:

- **Pages are lazy-loaded.** Every page is now loaded through `lazyNamed`, a React.lazy-style helper that renders synchronously once its chunk is preloaded.
  - The server renders with `react-dom/static` `prerender`, so public pages are still fully server-rendered.
  - The server records which lazy components a page used, and the browser preloads those chunks before `hydrateRoot`. Hydration therefore never suspends.
- **Dictionaries are split.** Only the core English dictionary ships in the initial bundle. The English area dictionaries and the Arabic dictionary are separate chunks.
- **Signed-in-only UI is deferred.** The email verification banner, the reauth banner, the notification bell and the compare tray load on demand.

The largest lazy route grew because shared editor code (KaTeX, marked, DOMPurify, zod) moved out of the initial bundle into the route chunks that use it.

## Images

The app renders no raster content images. The UI is CSS and inline SVG, and lesson thumbnails come from YouTube embeds.

`scripts/generate-images.mjs` uses sharp at build time to generate these brand rasters into `public/` (git-ignored):

- A branded 1200×630 Open Graph and Twitter card: `og-image.png` (36 kB), `og-image.webp` (28 kB) and `og-image.avif` (14 kB).
- `apple-touch-icon.png`.
- `icon-192` and `icon-512` in PNG and WebP, referenced from `site.webmanifest`.

## SEO

- **Metadata in the SSR HTML.** Every public page has:
  - a unique title and meta description
  - `robots index, follow` and an absolute canonical URL
  - hreflang links for en, ar and x-default
  - Open Graph tags (title, description, url, image, image size and alt)
  - a Twitter card (`summary_large_image`, title, description, image)
  - JSON-LD: Organization on the home page, Course on course pages, plus the existing discover and instructor schemas.
- **Checks:** `e2e/tests/ssr.spec.ts` checks all 23 public pages.
- **Login and register:**
  - These pages were `noindex` and disallowed in robots.txt, which capped Lighthouse SEO at 54. They are now indexable and server-rendered, with descriptions.
  - This took one trivial backend edit: `/login` and `/register` were removed from `SeoController.DisallowedPaths`.
- **Headings and alt text.** `e2e/tests/quality.spec.ts` checks that every public page has exactly one h1, no skipped heading levels, and alt text on every `<img>`.
  - Visually hidden h2 headings were added above the result lists on courses, category, free lessons, certifications, pathways and collections, and above the teach page's feature cards.

## Security headers

The SSR server and nginx now send these headers:

- **CSP** on every SSR response:
  - `default-src 'self'`
  - `script-src 'self' 'sha256-…' https://www.youtube.com https://s.ytimg.com`. The hash is computed at startup from the inline theme script.
  - `style-src 'self' 'unsafe-inline'`
  - `img-src` adds `i.ytimg.com`. `frame-src` allows `youtube-nocookie.com` and `www.youtube.com`. KaTeX fonts are self-hosted.
  - `object-src 'none'`, `base-uri 'self'` and `form-action 'self'`
  - `frame-ancestors 'none'`
  - `upgrade-insecure-requests` behind HTTPS
- **Making the CSP hold:**
  - The SSR data payload is now a non-executing `application/json` block.
  - React's inline streaming scripts are avoided: `progressiveChunkSize: Infinity`, plus another render pass when a lazy chunk was awaited.
  - zod's eval probe is turned off with `z.config({ jitless: true })`.
- **Other headers:**
  - `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`
  - `Cross-Origin-Opener-Policy: same-origin`, CORP, and a restrictive `Permissions-Policy`
  - HSTS `max-age=63072000; includeSubDomains; preload` only when `X-Forwarded-Proto` is https (in the SSR server), and via an nginx map on `$http_x_forwarded_proto`.
- **Compression:** brotli or gzip from the SSR server, and gzip in nginx.
- **Verification:**
  - `ssr.spec.ts` checks the headers.
  - Its CSP smoke test visits every public page, signs in and opens the YouTube lesson player. It records CSP violations through DOM events, console messages and DevTools Audits issues, and requires there to be none.

## Accessibility (WCAG 2.2 AA)

- **axe.** `e2e/tests/a11y.spec.ts` runs axe with the wcag2a, wcag2aa, wcag21aa and wcag22aa tags, which include target-size. It now covers 33 pages, each in en/ar and light/dark:
  - all public pages
  - the dashboard, profile, security, notes, notifications, study plan, bookmarks, practice hub and messages
  - the lesson, attempt and checkout pages
  - studio, the studio course editor, admin and admin users
  - the MFA challenge
- **Result:** 0 serious or critical violations. One was found and fixed: dark-mode contrast on the profile avatar.
- **Focus.** `quality.spec.ts` checks focus visibility (2.4.7) and that focus is never entirely hidden (2.4.11) at 360 px and 1280 px on key public and signed-in pages. Fixes made:
  - the tab panels now show a focus ring
  - the video frame shows `:focus-within`
  - the docked consent banner reserves its height and scrolls focused controls out from under it
- **Lighthouse accessibility** is 100 on every audited page. Two label-in-name issues were fixed: the Compare and language buttons.

## Responsive layout, loading and error states, source hygiene

- **No horizontal scroll** at 360, 768 and 1280 px on all 23 public pages plus the dashboard, lesson and profile pages. Screenshots of the key pages are attached to the test. One overflow was found and fixed: a long email address on the profile page at 360 px.
- **Loading and error states.** `scripts/check-query-states.mjs` runs in CI.
  - It flagged 40 components that read query data without loading or error handling.
  - 31 now render a `<QueryStatus>` (a spinner, or an error with retry) or an error notice.
  - 9 are marked `// optional-query:` with a reason. These are flags with safe defaults and typeahead hints.
- **No TODO, FIXME or lorem ipsum** in `src`. A CI grep enforces this.

## Tests

- **Web unit tests:** 147 passing (vitest). `npm run lint` and `npm run typecheck` are clean.
- **End to end:** `scripts/e2e-all.sh` with `E2E_PORT_BASE=6500` runs the vite preview, the SSR server and the full stack. Final run: **111 / 111 passed** in 18.7 minutes, including the new quality, SSR/CSP and perf specs.
- **One existing workspace spec was adjusted.** It had depended on a race: an anonymous first fetch of a hidden thread. With auth-ready lazy rendering, the author now correctly sees the moderation notice with its Appeal button.

## CI jobs added

- **`quality-gates`:** bundle budgets, the loading/error state audit, and the TODO grep.
- **`lighthouse`:** `scripts/lighthouse.sh`, median of 3 runs, requiring ≥ 95 in every category on mobile and desktop and LCP < 2.5 s, CLS < 0.1 and TBT < 200 ms.

## Final verification on the merged branch (2026-10-02, commit 738b6d3)

Full e2e suite (scripts/e2e-all.sh, MFA on): 111 passed. Lighthouse 12, median of 3 runs per page/form factor:

| Page | Form factor | Performance | Accessibility | Best Practices | SEO | LCP (ms) | TBT (ms) | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| home (`/`) | mobile | 98 | 100 | 100 | 100 | 1869 | 78 | 0 |
| home (`/`) | desktop | 100 | 100 | 100 | 100 | 483 | 0 | 0 |
| courses (`/courses`) | mobile | 98 | 100 | 100 | 100 | 1809 | 80 | 0 |
| courses (`/courses`) | desktop | 100 | 100 | 100 | 100 | 420 | 0 | 0.005 |
| course-detail (`/courses/<slug>`) | mobile | 97 | 100 | 100 | 100 | 1958 | 119 | 0 |
| course-detail (`/courses/<slug>`) | desktop | 100 | 100 | 100 | 100 | 571 | 0 | 0 |
| category (`/categories/<slug>`) | mobile | 98 | 100 | 100 | 100 | 1894 | 75 | 0 |
| category (`/categories/<slug>`) | desktop | 100 | 100 | 100 | 100 | 511 | 0 | 0.005 |
| certifications (`/certifications`) | mobile | 98 | 100 | 100 | 100 | 1864 | 61 | 0 |
| certifications (`/certifications`) | desktop | 100 | 100 | 100 | 100 | 522 | 0 | 0 |
| article (`/articles/how-mcq-certificates-work`) | mobile | 98 | 100 | 100 | 100 | 1873 | 17 | 0 |
| article (`/articles/how-mcq-certificates-work`) | desktop | 100 | 100 | 100 | 100 | 487 | 0 | 0 |
| login (`/login`) | mobile | 98 | 100 | 100 | 100 | 1880 | 32 | 0 |
| login (`/login`) | desktop | 100 | 100 | 100 | 100 | 593 | 0 | 0 |
| verify (`/verify`) | mobile | 98 | 100 | 100 | 100 | 1866 | 44 | 0 |
| verify (`/verify`) | desktop | 100 | 100 | 100 | 100 | 632 | 0 | 0.017 |
