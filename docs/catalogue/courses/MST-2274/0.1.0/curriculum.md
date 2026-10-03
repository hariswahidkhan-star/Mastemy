# Integrating Online Payments with Stripe

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2274` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint and teach durable, transferable platform concepts. Platform features, pricing and user interfaces change frequently; product specifics must be verified at production and on-screen steps may differ from any shown. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Integrating Online Payments with Stripe (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain core payments concepts: authorisation, capture, settlement, refunds and disputes
2. Choose an appropriate integration approach for a given use case and risk tolerance
3. Implement a basic one-time payment flow using a hosted or embedded checkout
4. Handle asynchronous events reliably with webhooks and idempotency
5. Apply security and compliance basics including PCI scope reduction and key handling
6. Design subscriptions, refunds and dispute handling and test them safely before going live

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Payments fundamentals (25% (design weight), design weight)

- Worked applications: (1) Trace a card payment from authorisation to settlement; (2) Explain why a captured amount can differ from the authorised amount
- Common misconception addressed: Thinking a successful authorisation means the money has settled
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How card payments actually flow end to end | 120 | 7 |
| M01L02 | Core objects: charges, intents, customers and refunds | 120 | 7 |

### M02 Integration approaches (25% (design weight), design weight)

- Worked applications: (1) Choose hosted checkout vs a custom API flow for two products; (2) Build a minimal one-time payment with a hosted checkout
- Common misconception addressed: Believing a custom UI is always better than a hosted page
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Hosted vs embedded vs API-only integrations | 120 | 7 |
| M02L02 | Building a one-time payment flow | 120 | 7 |

### M03 Reliability with webhooks (25% (design weight), design weight)

- Worked applications: (1) Make a webhook handler idempotent against duplicate deliveries; (2) Reconcile an order whose webhook arrived before the redirect
- Common misconception addressed: Trusting the browser redirect as the source of truth for payment status
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Webhooks, events and idempotency | 120 | 7 |
| M03L02 | Reconciling payment state safely | 120 | 7 |

### M04 Security, billing and launch (25% (design weight), design weight)

- Worked applications: (1) Reduce PCI scope by never touching raw card data; (2) Simulate a dispute and a refund in test mode before launch
- Common misconception addressed: Hard-coding a secret key in client-side code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | PCI scope, keys and compliance basics | 120 | 7 |
| M04L02 | Subscriptions, disputes, testing and go-live | 120 | 7 |

## Integrative case

A SaaS team must take one-time and subscription payments: map the payment flow, choose a hosted checkout to cut PCI scope, build a webhook handler that is idempotent and treats events as the source of truth, keep secret keys server-side, and test refunds and disputes in test mode before switching to live keys.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2274-final-protected | 40 | 40 | yes |
| MST-2274-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Payments fundamentals | 10 |
| Integration approaches | 10 |
| Reliability with webhooks | 10 |
| Security, billing and launch | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2274-Q0001** (single-answer, Select ONE) After a customer pays, your app marks the order paid based on the browser redirect, but some orders are marked paid that later fail. What is the reliable source of truth?

- A. The server-side webhook event confirming the payment succeeded, handled idempotently **(key)**  
  _Rationale:_ Correct: webhooks delivered to the server are the authoritative, reliable record of payment state.
- B. The browser redirect URL parameters  
  _Rationale:_ Redirects can be tampered with or interrupted and are not authoritative.
- C. A screenshot from the customer  
  _Rationale:_ Customer screenshots are not a trustworthy system signal.
- D. The order's creation timestamp  
  _Rationale:_ A timestamp says when the order was made, not whether it was paid.

**MST-2274-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce PCI compliance scope and protect credentials? (Select TWO.)

- A. Using a hosted or tokenised field so raw card numbers never hit your server **(key)**  
  _Rationale:_ Correct: keeping card data off your servers reduces PCI scope significantly.
- B. Keeping secret API keys only on the server, never in client code **(key)**  
  _Rationale:_ Correct: secret keys in client code can be stolen and must stay server-side.
- C. Logging full card numbers for debugging  
  _Rationale:_ Storing or logging full card numbers increases scope and risk.
- D. Emailing keys to the whole team  
  _Rationale:_ Broad key distribution is a credential-exposure risk.

**MST-2274-Q0003** (single-answer, Select ONE) Your webhook endpoint occasionally receives the same event twice. What design prevents double-processing such as charging or fulfilling twice?

- A. Make handling idempotent by recording processed event IDs and skipping repeats **(key)**  
  _Rationale:_ Correct: idempotent handling keyed on the event ID makes duplicate deliveries harmless.
- B. Ignore all webhooks and poll hourly instead  
  _Rationale:_ Polling adds latency and still needs duplicate protection.
- C. Disable retries so events never repeat  
  _Rationale:_ Disabling retries risks losing events during transient failures.
- D. Process faster so duplicates cannot arrive  
  _Rationale:_ Speed does not prevent at-least-once delivery semantics.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
