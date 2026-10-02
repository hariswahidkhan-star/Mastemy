# AWS Cost Optimization and FinOps

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0768` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on AWS Cost Management docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-FINOPS (https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-costmanagement.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AWS Cost Optimization and FinOps (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain AWS cost drivers and pricing models
2. Analyse spend with Cost Explorer and reports
3. Set budgets and anomaly detection
4. Apply savings plans and reservations
5. Right-size and eliminate waste
6. Operate FinOps practices across teams

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Cost drivers and pricing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map a bill to its main cost drivers; (2) Compare on-demand and commitment pricing
- Common misconception addressed: Assuming all services bill the same way
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pricing models | 80 | 7 |
| M01L02 | On-demand vs commitment | 80 | 7 |

### M02 Cost analysis (MASTEMY-DESIGN 16%)

- Worked applications: (1) Break down spend by service in Cost Explorer; (2) Allocate costs with tags
- Common misconception addressed: Analysing cost without a tagging strategy
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cost Explorer | 80 | 7 |
| M02L02 | Allocation tags and reports | 80 | 7 |

### M03 Budgets and anomalies (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a monthly budget with an alert; (2) Enable cost anomaly detection
- Common misconception addressed: Setting a budget but ignoring the alerts
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Budgets and alerts | 80 | 7 |
| M03L02 | Anomaly detection | 80 | 7 |

### M04 Commitments and savings (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose a savings plan for steady compute; (2) Reserve capacity for a predictable database
- Common misconception addressed: Committing to savings plans for spiky, unpredictable load
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Savings Plans | 80 | 7 |
| M04L02 | Reserved capacity | 80 | 7 |

### M05 Right-sizing and waste (MASTEMY-DESIGN 17%)

- Worked applications: (1) Right-size an over-provisioned instance; (2) Delete unattached volumes and idle resources
- Common misconception addressed: Right-sizing once and never revisiting
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Right-sizing | 80 | 7 |
| M05L02 | Finding idle and orphaned resources | 80 | 7 |

### M06 FinOps operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set up a monthly cost review; (2) Produce a showback report per team
- Common misconception addressed: Treating cost as only the finance team's job
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | FinOps culture and ownership | 80 | 7 |
| M06L02 | Showback and chargeback | 80 | 7 |

## Integrative case

Cut a team's AWS bill: analyse spend in Cost Explorer, tag resources for allocation, set budgets with alerts, buy a savings plan for steady compute, right-size over-provisioned instances, and set up a monthly FinOps review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0768-final-protected | 40 | 50 | yes |
| MST-0768-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cost drivers and pricing | 6 |
| Cost analysis | 6 |
| Budgets and anomalies | 7 |
| Commitments and savings | 7 |
| Right-sizing and waste | 7 |
| FinOps operations | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0768-Q0001** (single-answer, Select ONE) What is the main benefit of a Savings Plan or reserved capacity?

- A. A lower rate in exchange for a usage commitment over a term **(key)**  
  _Rationale:_ Correct: commitments trade flexibility for a discount.
- B. Unlimited free usage  
  _Rationale:_ They discount usage; they are not free.
- C. Automatic deletion of idle resources  
  _Rationale:_ They do not remove idle resources.
- D. A guarantee of zero cost anomalies  
  _Rationale:_ They do not prevent anomalies.

**MST-0768-Q0002** (single-answer, Select ONE) Why is a resource tagging strategy important for cost management?

- A. It enables cost allocation and accountability by team or project **(key)**  
  _Rationale:_ Correct: tags drive allocation, showback and accountability.
- B. It reduces the on-demand price automatically  
  _Rationale:_ Tags do not change pricing.
- C. It encrypts billing data  
  _Rationale:_ Tags are metadata, not encryption.
- D. It prevents all overspending by itself  
  _Rationale:_ Tags inform but do not prevent spend.

**MST-0768-Q0003** (multiple-answer, Select TWO) Which TWO are effective cost-optimisation actions? (Select TWO.)

- A. Right-size over-provisioned resources **(key)**  
  _Rationale:_ Correct: right-sizing cuts waste.
- B. Remove idle and orphaned resources **(key)**  
  _Rationale:_ Correct: deleting waste lowers spend.
- C. Commit to savings plans for highly unpredictable spikes  
  _Rationale:_ Commitments suit steady, not spiky, load.
- D. Ignore budget alerts to avoid distraction  
  _Rationale:_ Ignoring alerts defeats their purpose.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
