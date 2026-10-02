# Amazon QuickSight

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1500` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Amazon QuickSight (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain QuickSight architecture, SPICE and data sources
2. Connect data and prepare datasets
3. Build analyses, visuals and dashboards
4. Share, secure and optimize dashboards

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 QuickSight foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Decide SPICE vs direct query for a source; (2) Identify the right edition for a need
- Common misconception addressed: Thinking SPICE refreshes automatically in real time without scheduling
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | QuickSight overview and editions | 72 | 7 |
| M01L02 | SPICE vs direct query | 72 | 7 |

### M02 Data preparation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Join two tables into one dataset; (2) Add a calculated field for margin
- Common misconception addressed: Confusing a data source connection with a prepared dataset
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Connecting data sources | 72 | 7 |
| M02L02 | Datasets, joins and calculated fields | 72 | 7 |

### M03 Building visuals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pick the right chart for a comparison; (2) Add a filter control to a dashboard
- Common misconception addressed: Choosing a chart type that distorts the comparison
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Analyses and visual types | 72 | 7 |
| M03L02 | Dashboards and interactivity | 72 | 7 |

### M04 Sharing and security (MASTEMY-DESIGN 25%)

- Worked applications: (1) Share a dashboard with a group; (2) Apply row-level security by region
- Common misconception addressed: Assuming sharing a dashboard also shares full edit rights
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Publishing and sharing dashboards | 72 | 7 |
| M04L02 | Row-level security and performance | 72 | 7 |

## Integrative case

A sales team needs a self-service dashboard. Connect QuickSight to the data, model a dataset with calculated fields, build visuals and a dashboard, and share it securely with row-level security for regional managers.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1500-final-protected | 28 | 35 | yes |
| MST-1500-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| QuickSight foundations | 7 |
| Data preparation | 7 |
| Building visuals | 7 |
| Sharing and security | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1500-Q0001** (single-answer, Select ONE) What is SPICE in Amazon QuickSight?

- A. An in-memory engine that stores imported data for fast queries **(key)**  
  _Rationale:_ Correct: SPICE caches data in memory for performance.
- B. A SQL dialect unique to QuickSight  
  _Rationale:_ SPICE is a storage/compute engine, not a SQL dialect.
- C. A row-level security rule  
  _Rationale:_ SPICE is not a security feature.
- D. A chart type  
  _Rationale:_ SPICE is not a visualization type.

**MST-1500-Q0002** (multiple-answer, Select TWO) Which TWO let you control what data different users see in a shared dashboard? (Select TWO.)

- A. Row-level security rules **(key)**  
  _Rationale:_ Correct: RLS filters rows per user/group.
- B. Sharing with specific groups rather than everyone **(key)**  
  _Rationale:_ Correct: scoped sharing limits access.
- C. Deleting the dataset  
  _Rationale:_ Deleting the dataset removes the dashboard entirely.
- D. Turning off SPICE  
  _Rationale:_ Disabling SPICE affects performance, not access control.

**MST-1500-Q0003** (single-answer, Select ONE) A calculated field for profit margin should be defined where?

- A. In the dataset, so all analyses reuse it **(key)**  
  _Rationale:_ Correct: dataset-level calculated fields are reusable across analyses.
- B. In the billing console  
  _Rationale:_ Billing is unrelated to dataset fields.
- C. In an IAM policy  
  _Rationale:_ IAM controls access, not calculated fields.
- D. In the VPC settings  
  _Rationale:_ Networking is unrelated to calculated fields.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
