# AWS Billing and Pricing Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1497` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Billing and Pricing Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain AWS pricing models and the free tier
2. Read and allocate costs with Cost Explorer and tags
3. Set budgets and alerts to control spend
4. Optimize cost with commitments and right-sizing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Pricing fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Classify three services' pricing dimensions; (2) Estimate a monthly bill for a small app
- Common misconception addressed: Assuming the free tier never incurs charges after limits
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | AWS pricing models and free tier | 72 | 7 |
| M01L02 | How key services are billed | 72 | 7 |

### M02 Visibility and allocation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Break down cost by service in Cost Explorer; (2) Tag resources for chargeback
- Common misconception addressed: Thinking untagged resources are automatically allocated to a team
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cost Explorer and reports | 72 | 7 |
| M02L02 | Cost allocation tags | 72 | 7 |

### M03 Budgets and alerts (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a monthly cost budget with alerts; (2) Enable a cost anomaly alert
- Common misconception addressed: Confusing a budget alert with a hard spending cap
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AWS Budgets | 72 | 7 |
| M03L02 | Alerts and anomaly detection | 72 | 7 |

### M04 Cost optimization (MASTEMY-DESIGN 25%)

- Worked applications: (1) Choose a Savings Plan for steady usage; (2) Right-size an over-provisioned instance
- Common misconception addressed: Buying commitments for workloads that are temporary or spiky
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Savings Plans and Reserved Instances | 72 | 7 |
| M04L02 | Right-sizing and eliminating waste | 72 | 7 |

## Integrative case

A finance partner needs AWS spend under control. Set up cost allocation tags and Cost Explorer views, create budgets with alerts, identify savings from right-sizing and commitments, and present a cost-reduction plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1497-final-protected | 28 | 35 | yes |
| MST-1497-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Pricing fundamentals | 7 |
| Visibility and allocation | 7 |
| Budgets and alerts | 7 |
| Cost optimization | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1497-Q0001** (single-answer, Select ONE) What does an AWS Budget alert do when spend approaches the threshold?

- A. Notifies you; it does not automatically stop resources **(key)**  
  _Rationale:_ Correct: budgets alert but do not enforce a hard cap by themselves.
- B. Immediately shuts down all running services  
  _Rationale:_ Budgets do not automatically terminate resources.
- C. Refunds the overage  
  _Rationale:_ Budgets do not issue refunds.
- D. Deletes the account  
  _Rationale:_ Budgets never delete the account.

**MST-1497-Q0002** (multiple-answer, Select TWO) Which TWO are effective ways to reduce steady-state AWS compute cost? (Select TWO.)

- A. Purchase a Savings Plan or Reserved Instance for predictable usage **(key)**  
  _Rationale:_ Correct: commitments discount steady usage.
- B. Right-size over-provisioned instances **(key)**  
  _Rationale:_ Correct: matching size to need removes waste.
- C. Leave idle instances running  
  _Rationale:_ Idle resources waste money.
- D. Turn off all monitoring  
  _Rationale:_ That does not reduce compute cost and hurts visibility.

**MST-1497-Q0003** (single-answer, Select ONE) To attribute costs to specific teams, you should first:

- A. Apply cost allocation tags to resources **(key)**  
  _Rationale:_ Correct: tags enable cost breakdown by team/project once activated.
- B. Create a new AWS account per invoice line  
  _Rationale:_ Per-line accounts are impractical; tags are the mechanism.
- C. Disable Cost Explorer  
  _Rationale:_ Cost Explorer is needed for analysis.
- D. Delete untagged resources  
  _Rationale:_ Deleting resources is not how allocation works.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
