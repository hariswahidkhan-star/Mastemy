# Snowflake SnowPro Advanced Data Analyst Certification

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0236` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Snowflake (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-DAT-SNOW-ADVDA-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Perform advanced analytics with Snowflake SQL
2. Model and prepare data for analysis
3. Optimise analytical queries and cost
4. Present, share and govern analytical results

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Advanced analytical SQL

- Worked applications: (1) Write a cohort-retention query with window functions; (2) Query nested JSON to produce a flat report
- Common misconception addressed: Using self-joins where window functions are clearer and faster
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Window functions and advanced aggregation | 180 | 6 |
| M01L02 | Common table expressions and recursion | 180 | 6 |
| M01L03 | Semi-structured data querying | 180 | 6 |
| M01L04 | Statistical and time-series analysis | 180 | 6 |

### M02 Data modelling and preparation

- Worked applications: (1) Model a messy source into an analysis-ready view; (2) Design a slowly-changing-dimension view
- Common misconception addressed: Reporting on raw source tables without a defined model
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Modelling for analytics | 180 | 6 |
| M02L02 | Cleaning and standardising data | 180 | 6 |
| M02L03 | Building reusable views | 180 | 6 |
| M02L04 | Handling slowly changing dimensions | 180 | 6 |

### M03 Query optimisation and cost

- Worked applications: (1) Optimise a repeated dashboard query; (2) Use result caching to cut cost
- Common misconception addressed: Re-running identical heavy queries instead of reusing results
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reading the query profile | 180 | 6 |
| M03L02 | Caching and result reuse | 180 | 6 |
| M03L03 | Warehouse sizing for analysis | 180 | 6 |
| M03L04 | Controlling analytical cost | 180 | 6 |

### M04 Presentation, sharing and governance

- Worked applications: (1) Package an analysis for a stakeholder with context; (2) Share a dataset securely with least privilege
- Common misconception addressed: Sharing a full table when a filtered secure view is needed
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Preparing results for consumption | 180 | 6 |
| M04L02 | Secure sharing of analyses | 180 | 6 |
| M04L03 | Access control for analysts | 180 | 6 |
| M04L04 | Documentation and reproducibility | 180 | 6 |

## Integrative case

An analyst answers complex business questions on Snowflake: modelling source data, writing advanced SQL, optimising cost and performance, and sharing governed results.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0236-practice-form-A | 108 | 108 | yes |
| MST-0236-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0236-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0236-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Advanced analytical SQL | 27 |
| Data modelling and preparation | 27 |
| Query optimisation and cost | 27 |
| Presentation, sharing and governance | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
