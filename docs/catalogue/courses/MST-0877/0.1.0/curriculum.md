# Next.js Rendering, Caching, and Deployment Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0877` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Next.js Rendering, Caching, and Deployment Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Compare and select Next.js rendering strategies
2. Build with the App Router and React Server Components
3. Fetch and cache data correctly in the App Router
4. Reason about Next.js caching layers and invalidation
5. Implement mutations with Server Actions
6. Deploy Next.js with the right runtime and configuration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Rendering models in Next.js (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pick SSG vs SSR for a marketing page and a dashboard; (2) Add ISR revalidation to a product page
- Common misconception addressed: Believing getServerSideProps output is cached by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SSR, SSG, ISR and client rendering | 120 | 7 |
| M01L02 | Choosing a rendering strategy per route | 120 | 7 |

### M02 The App Router and Server Components (MASTEMY-DESIGN 17%)

- Worked applications: (1) Mark a component 'use client' only where interactivity is needed; (2) Stream a slow section with Suspense
- Common misconception addressed: Adding 'use client' to a layout and forcing the whole tree to the client
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Server vs Client Components and boundaries | 120 | 7 |
| M02L02 | Layouts, streaming and Suspense | 120 | 7 |

### M03 Data fetching and the fetch cache (MASTEMY-DESIGN 17%)

- Worked applications: (1) Tag a fetch and revalidate it on a mutation; (2) Opt a route into dynamic rendering deliberately
- Common misconception addressed: Assuming every fetch is dynamic when Next.js caches it by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | fetch caching, revalidation and tags | 120 | 7 |
| M03L02 | Request memoization and dynamic rendering | 120 | 7 |

### M04 Caching layers and invalidation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Invalidate a listing after a server action mutation; (2) Diagnose stale data from the client router cache
- Common misconception addressed: Thinking a hard refresh clears the server-side data cache
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Full route cache, data cache and router cache | 120 | 7 |
| M04L02 | Invalidation with revalidatePath and revalidateTag | 120 | 7 |

### M05 Server Actions and mutations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Submit a form via a Server Action and revalidate; (2) Return field errors from a Server Action
- Common misconception addressed: Expecting a Server Action to run on the client
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Server Actions, forms and progressive enhancement | 120 | 7 |
| M05L02 | Validation, revalidation and error handling | 120 | 7 |

### M06 Deployment and runtime architecture (MASTEMY-DESIGN 17%)

- Worked applications: (1) Move auth checks into middleware at the edge; (2) Configure environment-specific build output
- Common misconception addressed: Assuming all Node APIs are available in the Edge runtime
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Edge vs Node runtimes and middleware | 120 | 7 |
| M06L02 | Build output, environments and observability | 120 | 7 |

## Integrative case

Design the rendering and caching architecture for a storefront: static marketing pages with ISR, a dynamic authenticated dashboard, tagged product data invalidated by Server Actions, edge middleware for auth, and a plan to debug a reported stale-cache bug across the route, data and router caches.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0877-final-protected | 40 | 50 | yes |
| MST-0877-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Rendering models in Next.js | 7 |
| The App Router and Server Components | 7 |
| Data fetching and the fetch cache | 7 |
| Caching layers and invalidation | 7 |
| Server Actions and mutations | 6 |
| Deployment and runtime architecture | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0877-Q0001** (single-answer, Select ONE) In the Next.js App Router, a fetch() in a Server Component has no cache options set. By default this request is:

- A. Cached (static) unless something opts the route into dynamic rendering **(key)**  
  _Rationale:_ Correct: App Router fetches default to caching; dynamic behaviour must be triggered.
- B. Always dynamic and never cached  
  _Rationale:_ That was the Pages Router mental model; App Router caches by default.
- C. Cached only in production builds  
  _Rationale:_ The default caching applies in development reasoning and production builds alike for this model.
- D. Stored in the client router cache only  
  _Rationale:_ The router cache is a separate client-side layer, not where fetch results are stored.

**MST-0877-Q0002** (multiple-answer, Select TWO) Which TWO are valid ways to invalidate cached data after a mutation in the App Router? (Select TWO.)

- A. Call revalidateTag for a tag used on the fetch **(key)**  
  _Rationale:_ Correct: revalidateTag purges all entries sharing that tag.
- B. Call revalidatePath for the affected route **(key)**  
  _Rationale:_ Correct: revalidatePath invalidates the cached render for that path.
- C. Mutate a module-level variable on the server  
  _Rationale:_ That does not touch the data cache and is unsafe across requests.
- D. Ask the user to hard-refresh the browser  
  _Rationale:_ A hard refresh does not clear the server-side data cache.

**MST-0877-Q0003** (single-answer, Select ONE) Why can adding 'use client' to a shared layout component be a performance mistake?

- A. It pushes the layout and its children toward client rendering, enlarging the JS bundle **(key)**  
  _Rationale:_ Correct: the client boundary cascades to descendants, shipping more JavaScript.
- B. It disables all data fetching in the app  
  _Rationale:_ Client Components can still fetch; it does not disable fetching globally.
- C. It forces every route to use SSG  
  _Rationale:_ 'use client' does not change the route's rendering strategy to SSG.
- D. It prevents the app from deploying  
  _Rationale:_ The app still deploys; the issue is bundle size and interactivity cost.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
