# Cursor + Next.js + Stripe: Subscription Product Implementation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0812` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Cursor + Next.js + Stripe: Subscription Product Implementation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope a subscription product including lifecycle edge cases
2. Build a Next.js front end with Cursor and review the output
3. Integrate Stripe checkout, subscriptions and webhooks
4. Verify events server-side and protect secret keys
5. Test subscription scenarios and reconcile before launch

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Subscription product scope (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map the states of a subscription from trial to cancellation; (2) List the edge cases a billing flow must handle
- Common misconception addressed: Assuming the happy path is the whole subscription lifecycle
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Subscription model and lifecycle | 120 | 7 |
| M01L02 | Edge cases: trials, proration, dunning | 120 | 7 |

### M02 Cursor-assisted Next.js build (MASTEMY-DESIGN 20%)

- Worked applications: (1) Scaffold a pricing page and checkout route in Next.js; (2) Review Cursor-generated code against the design
- Common misconception addressed: Shipping AI-generated UI without reviewing behaviour
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pages, routing and components | 120 | 7 |
| M02L02 | Using Cursor to build and review | 120 | 7 |

### M03 Stripe integration (MASTEMY-DESIGN 20%)

- Worked applications: (1) Create a Stripe Checkout session for a plan; (2) Handle a subscription webhook to update app state
- Common misconception addressed: Trusting the client redirect instead of verifying via webhook
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Checkout, customers and subscriptions | 120 | 7 |
| M03L02 | Webhooks and event handling | 120 | 7 |

### M04 State, security and secrets (MASTEMY-DESIGN 20%)

- Worked applications: (1) Verify a webhook signature before acting on it; (2) Keep the Stripe secret key server-side only
- Common misconception addressed: Exposing a secret API key in client-side code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Server-side verification and keys | 120 | 7 |
| M04L02 | Protecting API keys and endpoints | 120 | 7 |

### M05 Testing and launch (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run trial, upgrade and failed-payment scenarios in test mode; (2) Reconcile Stripe records against app subscription state
- Common misconception addressed: Going live without exercising failed-payment scenarios
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Test mode, cards and scenarios | 120 | 7 |
| M05L02 | Monitoring and reconciliation | 120 | 7 |

## Integrative case

Implement a subscription product: model the lifecycle, build the Next.js pricing and checkout with Cursor, integrate Stripe Checkout and subscription webhooks, verify webhook signatures server-side, keep the secret key off the client, and test trial, upgrade and failed-payment paths before launch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0812-final-protected | 40 | 50 | yes |
| MST-0812-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Subscription product scope | 8 |
| Cursor-assisted Next.js build | 8 |
| Stripe integration | 8 |
| State, security and secrets | 8 |
| Testing and launch | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0812-Q0001** (single-answer, Select ONE) Why rely on a verified Stripe webhook rather than the client redirect to confirm a subscription?

- A. The client redirect can be faked or lost; the signed webhook is authoritative **(key)**  
  _Rationale:_ Correct: server-side verified webhooks are the reliable source of truth.
- B. The redirect is encrypted end to end  
  _Rationale:_ The redirect is not a trustworthy confirmation of payment state.
- C. Webhooks are slower so they are ignored  
  _Rationale:_ Webhooks are the authoritative event, not something to ignore.
- D. The client always reports accurately  
  _Rationale:_ Client state can be tampered with or interrupted.

**MST-0812-Q0002** (multiple-answer, Select TWO) Which TWO practices protect a Stripe integration? (Select TWO.)

- A. Verify the webhook signature before acting on the event **(key)**  
  _Rationale:_ Correct: signature verification rejects forged events.
- B. Keep the secret key on the server only **(key)**  
  _Rationale:_ Correct: a secret key in client code is exposed to users.
- C. Put the secret key in client-side JavaScript  
  _Rationale:_ Client code is fully visible to users.
- D. Act on unverified webhook payloads immediately  
  _Rationale:_ Unverified payloads can be forged.

**MST-0812-Q0003** (single-answer, Select ONE) Why exercise failed-payment scenarios in Stripe test mode before launch?

- A. Because dunning and recovery are part of the real subscription lifecycle **(key)**  
  _Rationale:_ Correct: failed payments are common and must be handled, not assumed away.
- B. Because test mode charges real cards  
  _Rationale:_ Test mode does not charge real cards.
- C. Because failed payments never happen in production  
  _Rationale:_ Failed payments are routine in production.
- D. Because it removes the need for webhooks  
  _Rationale:_ Webhooks are still needed to track payment state.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
