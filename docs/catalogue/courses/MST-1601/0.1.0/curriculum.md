# Databricks Certified Data Analyst Associate Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1601` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Databricks (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-DAT-DBX-DAA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use the Databricks SQL environment for analysis
2. Query, transform and model data for analytics
3. Build dashboards, visualisations and alerts
4. Apply governance and sharing to analytics assets

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Databricks SQL foundations

- Worked applications: (1) Configure a SQL warehouse for a reporting workload; (2) Save and parameterise a reusable query
- Common misconception addressed: Confusing a SQL warehouse with an all-purpose cluster
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Databricks SQL workspace and warehouses | 90 | 6 |
| M01L02 | Running and saving queries | 90 | 6 |
| M01L03 | Connecting to data and the lakehouse | 90 | 6 |
| M01L04 | Working with the query editor | 90 | 6 |

### M02 Querying and modelling

- Worked applications: (1) Write a query answering a trend question; (2) Build a view that standardises a messy source
- Common misconception addressed: Repeating logic across queries instead of using views
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Analytical SQL and joins | 90 | 6 |
| M02L02 | Aggregations and window functions | 90 | 6 |
| M02L03 | Building views for reuse | 90 | 6 |
| M02L04 | Data types and semi-structured data | 90 | 6 |

### M03 Visualisation and dashboards

- Worked applications: (1) Build a dashboard answering three stakeholder questions; (2) Set an alert on a threshold metric
- Common misconception addressed: Choosing chart types that distort the comparison
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Creating visualisations | 90 | 6 |
| M03L02 | Building and sharing dashboards | 90 | 6 |
| M03L03 | Parameters and filters | 90 | 6 |
| M03L04 | Alerts and scheduled refresh | 90 | 6 |

### M04 Governance and sharing

- Worked applications: (1) Set least-privilege access on a reporting schema; (2) Document a dashboard's sources and metrics
- Common misconception addressed: Sharing a dashboard without restricting the underlying data
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Access control with Unity Catalog | 90 | 6 |
| M04L02 | Sharing dashboards and queries | 90 | 6 |
| M04L03 | Data lineage and documentation | 90 | 6 |
| M04L04 | Responsible data use | 90 | 6 |

## Integrative case

An analyst delivers a sales-reporting solution on Databricks SQL: querying and modelling the data, building a dashboard with alerts, and governing access to the assets.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1601-practice-form-A | 54 | 54 | yes |
| MST-1601-practice-form-B | 54 | 54 | no (optional practice) |
| MST-1601-practice-form-C | 54 | 54 | no (optional practice) |
| MST-1601-final-protected | 54 | 54 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Databricks SQL foundations | 14 |
| Querying and modelling | 14 |
| Visualisation and dashboards | 13 |
| Governance and sharing | 13 |

Minimum reviewed item bank: 660 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
