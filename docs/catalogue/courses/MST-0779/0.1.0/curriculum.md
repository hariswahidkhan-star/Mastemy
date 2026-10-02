# Amazon Selling Partner Operations and Marketplace Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0779` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Web Services (AWS) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AMZN-SP-API (https://developer-docs.amazon.com/sp-api/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon Selling Partner Operations and Marketplace Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Selling Partner ecosystem, roles and authorization
2. Manage listings, inventory and fulfillment data
3. Process orders and reconcile financial events
4. Retrieve and build reports for marketplace analytics
5. Apply operational metrics and account-health practices
6. Handle rate limits, data accuracy and secure access

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Platform and access (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map the roles involved in a selling-partner integration; (2) Describe the authorization flow for API access
- Common misconception addressed: Confusing seller authorization with ordinary user login
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Selling Partner ecosystem and roles | 120 | 5 |
| M01L02 | Authorization and secure access | 120 | 5 |

### M02 Listings and inventory (MASTEMY-DESIGN 25%)

- Worked applications: (1) Update a listing attribute through the API; (2) Reconcile available inventory across fulfillment types
- Common misconception addressed: Assuming inventory updates are instant and never need reconciliation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Listings and catalog data | 120 | 5 |
| M02L02 | Inventory and fulfillment data | 120 | 5 |

### M03 Orders and finance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Retrieve and process a batch of orders; (2) Reconcile fees and payouts from financial events
- Common misconception addressed: Treating order totals as final without accounting for fees and refunds
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Order retrieval and processing | 120 | 5 |
| M03L02 | Financial events and settlement reconciliation | 120 | 5 |

### M04 Reporting, metrics and limits (MASTEMY-DESIGN 25%)

- Worked applications: (1) Request a sales report and load it for analysis; (2) Handle rate limits with backoff and monitor account health
- Common misconception addressed: Ignoring rate limits and getting requests throttled or blocked
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reports and marketplace analytics | 120 | 5 |
| M04L02 | Account health, rate limits and data security | 120 | 5 |

## Integrative case

A seller operations team automates marketplace management via the Selling Partner API: authorize access, keep listings and inventory in sync, process and reconcile orders and settlement data, pull sales and traffic reports, monitor account health, and respect rate limits and data security.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0779-final-protected | 40 | 50 | yes |
| MST-0779-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Platform and access | 10 |
| Listings and inventory | 10 |
| Orders and finance | 10 |
| Reporting, metrics and limits | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0779-Q0001** (single-answer, Select ONE) A seller's reported revenue does not match the bank payout. Which data must be reconciled to explain the difference most directly?

- A. Financial events such as fees, refunds and adjustments **(key)**  
  _Rationale:_ Correct: payouts reflect order totals net of fees, refunds and adjustments.
- B. The product images  
  _Rationale:_ Images do not affect payout amounts.
- C. The listing title keywords  
  _Rationale:_ Keywords affect discovery, not payout reconciliation.
- D. The account's time zone only  
  _Rationale:_ Time zone alone does not explain a revenue-to-payout gap.

**MST-0779-Q0002** (multiple-answer, Select TWO) Which TWO practices help a Selling Partner integration stay reliable under API quotas? (Select TWO.)

- A. Respect rate limits and apply exponential backoff on throttling **(key)**  
  _Rationale:_ Correct: backoff keeps the integration within quotas.
- B. Monitor account health and request status **(key)**  
  _Rationale:_ Correct: monitoring catches throttling and account issues early.
- C. Send as many requests as fast as possible  
  _Rationale:_ That triggers throttling and failures.
- D. Ignore error responses and retry immediately in a tight loop  
  _Rationale:_ Tight retry loops worsen throttling.

**MST-0779-Q0003** (single-answer, Select ONE) Which statement best describes access to Selling Partner API data?

- A. A selling partner authorizes an application to act on the account's data **(key)**  
  _Rationale:_ Correct: access is granted through a selling-partner authorization, not a personal login.
- B. Anyone can read any seller's data without authorization  
  _Rationale:_ Seller data requires explicit authorization.
- C. Access requires no credentials at all  
  _Rationale:_ Credentials and authorization are required.
- D. Data is only available by email request  
  _Rationale:_ Data is retrieved programmatically under authorization.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
