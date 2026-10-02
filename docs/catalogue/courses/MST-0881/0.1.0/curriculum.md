# Nuxt: Production Vue Application Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0881` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Nuxt: Production Vue Application Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Nuxt universal rendering and routing
2. Fetch data across server and client
3. Select Nuxt rendering modes and deploy targets
4. Manage state and extend Nuxt with modules
5. Optimise SEO, performance and caching
6. Operate a Nuxt app in production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Nuxt fundamentals and rendering (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create pages with file-based routing; (2) Trace hydration from server to client
- Common misconception addressed: Assuming window is available during server-side rendering
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Universal rendering and the Nuxt lifecycle | 120 | 7 |
| M01L02 | File-based routing and pages | 120 | 7 |

### M02 Data fetching in Nuxt (MASTEMY-DESIGN 17%)

- Worked applications: (1) Fetch data with useAsyncData and a stable key; (2) Add a server API route with Nitro
- Common misconception addressed: Calling a browser-only fetch in setup and breaking SSR
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | useFetch, useAsyncData and keys | 120 | 7 |
| M02L02 | Server routes and the Nitro engine | 120 | 7 |

### M03 Rendering modes and deployment targets (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply route rules to prerender marketing pages; (2) Choose a deployment preset for a provider
- Common misconception addressed: Believing 'static' generation can include per-request dynamic data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SSR, SSG, SPA and hybrid route rules | 120 | 7 |
| M03L02 | Deployment presets and edge targets | 120 | 7 |

### M04 State, composables and modules (MASTEMY-DESIGN 17%)

- Worked applications: (1) Share state across components with useState; (2) Write an auto-imported composable
- Common misconception addressed: Using a module-scoped variable for request state and leaking it across users on the server
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | useState and shared state | 120 | 7 |
| M04L02 | Auto-imports, composables and modules | 120 | 7 |

### M05 SEO, performance and caching (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set per-page meta with useHead; (2) Enable route caching with revalidation
- Common misconception addressed: Assuming client-set meta tags are seen by crawlers that do not run JS
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Head management and meta tags | 120 | 7 |
| M05L02 | Payload, caching and ISR-style revalidation | 120 | 7 |

### M06 Production operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Expose safe config via runtimeConfig; (2) Add a global error handler and logging
- Common misconception addressed: Leaking a private runtimeConfig value to the client bundle
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Environment config and runtime config | 120 | 7 |
| M06L02 | Error handling and observability | 120 | 7 |

## Integrative case

Architect a content-plus-dashboard Nuxt app: prerendered marketing routes, SSR dashboard with Nitro server routes, useAsyncData with stable keys, per-user request state kept off module scope, SEO meta via useHead, route caching with revalidation, and private runtime config kept server-only.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0881-final-protected | 40 | 50 | yes |
| MST-0881-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Nuxt fundamentals and rendering | 7 |
| Data fetching in Nuxt | 7 |
| Rendering modes and deployment targets | 7 |
| State, composables and modules | 7 |
| SEO, performance and caching | 6 |
| Production operations | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0881-Q0001** (single-answer, Select ONE) Why can referencing window directly in a component's setup break a Nuxt universal app?

- A. setup runs on the server during SSR, where window is undefined **(key)**  
  _Rationale:_ Correct: server rendering has no browser globals; guard with onMounted or import.meta.client.
- B. window is reserved by Nuxt and cannot be used anywhere  
  _Rationale:_ window is fine in client-only contexts.
- C. Nuxt forbids all browser APIs permanently  
  _Rationale:_ Browser APIs work on the client; only SSR lacks them.
- D. window only works inside Pinia stores  
  _Rationale:_ Pinia does not change the availability of window.

**MST-0881-Q0002** (multiple-answer, Select TWO) Which TWO are correct about runtimeConfig in Nuxt? (Select TWO.)

- A. Values under the public key are exposed to the client **(key)**  
  _Rationale:_ Correct: public config is intentionally shipped to the browser.
- B. Private top-level config is available only on the server **(key)**  
  _Rationale:_ Correct: non-public runtimeConfig stays server-side.
- C. All runtimeConfig values are always sent to the client  
  _Rationale:_ Only public values are; sending private ones would leak secrets.
- D. runtimeConfig cannot be overridden by environment variables  
  _Rationale:_ It is designed to be overridden by env vars at runtime.

**MST-0881-Q0003** (single-answer, Select ONE) A developer stores per-request user data in a module-level variable in a Nuxt server route. What is the risk?

- A. State can leak across concurrent requests and between users on the server **(key)**  
  _Rationale:_ Correct: module scope is shared on the server, so request data can bleed across users.
- B. Nothing; module variables are per-request by default  
  _Rationale:_ Module variables are shared, not per-request.
- C. It only affects client-side rendering  
  _Rationale:_ The risk is specifically on the shared server runtime.
- D. It improves performance with no downside  
  _Rationale:_ The correctness and security risk outweighs any perceived gain.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
