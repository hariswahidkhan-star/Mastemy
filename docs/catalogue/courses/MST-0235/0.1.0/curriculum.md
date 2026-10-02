# Snowflake SnowPro Advanced Data Engineer Certification

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0235` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Snowflake (no affiliation or endorsement) |
| Exam code | (none verified) |
| Version basis | DESIGN ASSUMPTION - official outline/weightings not retrieved (issuer site egress-blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked; no official source read |
| Legacy IDs | MST-DAT-SNOW-ADVDE-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design and build data pipelines on Snowflake
2. Optimise storage, performance and cost
3. Implement data transformation and sharing
4. Secure, govern and operationalise data engineering workloads

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules (design-assumption competency areas; official domains/weightings not verified)

### M01 Data pipelines on Snowflake

- Worked applications: (1) Design a continuous ingestion pipeline with streams and tasks; (2) Flatten and query semi-structured JSON
- Common misconception addressed: Polling tables for changes instead of using streams
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Ingestion with Snowpipe and streams | 180 | 6 |
| M01L02 | Tasks and pipeline orchestration | 180 | 6 |
| M01L03 | Change data capture patterns | 180 | 6 |
| M01L04 | Semi-structured data handling | 180 | 6 |

### M02 Performance and cost optimisation

- Worked applications: (1) Diagnose a slow query with the query profile; (2) Right-size a warehouse for a workload
- Common misconception addressed: Increasing warehouse size to fix a poorly written query
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Virtual warehouses and scaling | 180 | 6 |
| M02L02 | Clustering and micro-partitions | 180 | 6 |
| M02L03 | Query profiling and tuning | 180 | 6 |
| M02L04 | Cost monitoring and controls | 180 | 6 |

### M03 Transformation and sharing

- Worked applications: (1) Use cloning to create a safe test environment; (2) Set up a secure share for an external consumer
- Common misconception addressed: Copying data for sharing instead of using secure shares
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Transformations and materialised views | 180 | 6 |
| M03L02 | Zero-copy cloning and time travel | 180 | 6 |
| M03L03 | Secure data sharing | 180 | 6 |
| M03L04 | Working with external data | 180 | 6 |

### M04 Security, governance and operations

- Worked applications: (1) Design a role hierarchy with least privilege; (2) Apply a masking policy to sensitive columns
- Common misconception addressed: Granting roles directly to users instead of via role hierarchy
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Access control and roles | 180 | 6 |
| M04L02 | Data masking and row access policies | 180 | 6 |
| M04L03 | Monitoring and resource governance | 180 | 6 |
| M04L04 | Reliability and recovery | 180 | 6 |

## Integrative case

A data engineer builds a near-real-time analytics pipeline on Snowflake: ingesting streaming data, transforming it, optimising performance and cost, and applying governance and sharing controls.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0235-practice-form-A | 108 | 108 | yes |
| MST-0235-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0235-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0235-final-protected | 108 | 108 | yes |

| Domain (design-assumption module) | Items per form |
|---|---|
| Data pipelines on Snowflake | 27 |
| Performance and cost optimisation | 27 |
| Transformation and sharing | 27 |
| Security, governance and operations | 27 |

Minimum reviewed item bank: 1128 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

See `assessments/question_bank.json` for the three draft samples (two single-answer, one multiple-answer 'Select TWO'). Every option carries a rationale. No full item bank is authored.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`, `curriculum.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
