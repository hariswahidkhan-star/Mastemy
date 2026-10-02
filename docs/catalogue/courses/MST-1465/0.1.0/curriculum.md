# Google Cloud Cost Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1465` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - vendor product documentation not reachable from build env (https://cloud.google.com/billing/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Cost Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Google Cloud billing accounts, projects and the billing hierarchy
2. Create budgets and alerts to monitor spend
3. Analyze costs with reports and BigQuery billing export
4. Apply committed-use and sustained-use discounts
5. Right-size and schedule resources to reduce waste
6. Attribute cost with labels and showback

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Billing structure (MASTEMY-DESIGN 16%)

- Worked applications: (1) Link projects to a billing account; (2) Grant a billing viewer the right role
- Common misconception addressed: Confusing a project with a billing account
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Billing accounts and projects | 48 | 5 |
| M01L02 | Billing hierarchy and roles | 48 | 5 |
### M02 Budgets and alerts (MASTEMY-DESIGN 16%)

- Worked applications: (1) Set a monthly budget with 50/90/100% alerts; (2) Route an alert to a Pub/Sub action
- Common misconception addressed: Expecting a budget to cap or stop spending automatically
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating a budget | 48 | 5 |
| M02L02 | Threshold alerts and actions | 48 | 5 |
### M03 Cost analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Find the top cost drivers in the reports; (2) Query detailed costs from the BigQuery export
- Common misconception addressed: Relying only on the summary page when detailed export is needed
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cost reports and breakdowns | 48 | 5 |
| M03L02 | BigQuery billing export | 48 | 5 |
### M04 Discounts (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose a CUD term for steady compute; (2) Use spot VMs for fault-tolerant batch work
- Common misconception addressed: Buying a commitment for spiky, short-lived workloads
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Committed-use discounts | 48 | 5 |
| M04L02 | Sustained-use and spot | 48 | 5 |
### M05 Right-sizing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply a machine-type right-sizing recommendation; (2) Stop dev instances outside work hours
- Common misconception addressed: Leaving oversized or idle resources running 24/7
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Recommendations and right-sizing | 48 | 5 |
| M05L02 | Scheduling and autoscaling | 48 | 5 |
### M06 Cost attribution (MASTEMY-DESIGN 17%)

- Worked applications: (1) Label resources by team and environment; (2) Build a showback report per team
- Common misconception addressed: Having no labels, so cost cannot be attributed
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Labels and tags | 48 | 5 |
| M06L02 | Showback and chargeback | 48 | 5 |

## Integrative case

A finance-conscious team needs to control Google Cloud spend: organize billing and projects, set budgets and alerts, analyze costs with reports and BigQuery export, apply committed-use and sustained-use discounts, and right-size resources, then present a savings plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1465-final-protected | 30 | 30 | yes |
| MST-1465-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Billing structure | 5 |
| Budgets and alerts | 5 |
| Cost analysis | 5 |
| Discounts | 5 |
| Right-sizing | 5 |
| Cost attribution | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1465-Q0001** (single-answer, Select ONE) A team sets a Google Cloud budget of $5,000/month. What does the budget do when spend reaches it?

- A. Sends alerts at configured thresholds; it does not stop spending **(key)**  
  _Rationale:_ Correct: budgets notify at thresholds but do not cap or halt usage by themselves.
- B. Automatically shuts down all resources  
  _Rationale:_ Budgets do not stop resources unless you build an automated action.
- C. Refunds overspend to the billing account  
  _Rationale:_ There is no automatic refund for exceeding a budget.
- D. Blocks new API calls permanently  
  _Rationale:_ Budgets do not block API calls.

**MST-1465-Q0002** (multiple-answer, Select TWO) Which TWO reduce cost for predictable, steady compute workloads? (Select TWO.)

- A. Purchase committed-use discounts for the steady baseline **(key)**  
  _Rationale:_ Correct: CUDs lower cost for committed, steady usage over a term.
- B. Right-size machine types to actual utilization **(key)**  
  _Rationale:_ Correct: removing over-provisioning cuts cost without hurting steady workloads.
- C. Run the production baseline entirely on preemptible spot VMs  
  _Rationale:_ Spot VMs can be reclaimed, unsuitable for a steady production baseline.
- D. Delete all labels to simplify billing  
  _Rationale:_ Labels aid attribution and do not reduce cost.

**MST-1465-Q0003** (single-answer, Select ONE) Where can a team analyze detailed, line-item Google Cloud costs over time?

- A. The BigQuery billing export **(key)**  
  _Rationale:_ Correct: exporting billing to BigQuery enables detailed, queryable line-item analysis.
- B. The VM serial console  
  _Rationale:_ The serial console is for instance debugging, not cost analysis.
- C. The firewall rules page  
  _Rationale:_ Firewall rules are network config, not cost data.
- D. The IAM policy editor  
  _Rationale:_ IAM manages access, not cost analysis.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
