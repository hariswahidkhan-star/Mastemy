# Snowflake for Analysts

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1641` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-SA-002 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Snowflake's architecture and separation of storage and compute
2. Query and manage data with Snowflake SQL and objects
3. Use warehouses, scaling and caching for performance and cost
4. Share and load data using stages and sharing features
5. Apply roles, access control and cost-aware analyst practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Snowflake architecture (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain how separate storage and compute affect scaling; (2) Navigate the object hierarchy for a described table
- Common misconception addressed: Assuming resizing a warehouse changes stored data
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Separation of storage, compute and services | 96 | 8 |
| M01L02 | Databases, schemas and tables | 96 | 8 |

### M02 Querying data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Query a VARIANT column for a nested JSON field; (2) Choose a view vs a table for a reusable transformation
- Common misconception addressed: Treating Snowflake SQL as identical to another dialect in every detail
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Snowflake SQL for analysts | 96 | 8 |
| M02L02 | Views, result sets and semi-structured data | 96 | 8 |

### M03 Warehouses and performance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a warehouse size and auto-suspend for an analyst workload; (2) Explain when the result cache serves a repeated query
- Common misconception addressed: Leaving a large warehouse running idle and incurring cost
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Virtual warehouses, sizing and auto-suspend | 96 | 8 |
| M03L02 | Caching and query performance | 96 | 8 |

### M04 Loading and sharing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe the path from a staged file to a loaded table; (2) Decide when secure sharing beats copying data
- Common misconception addressed: Copying data to share it when secure sharing would avoid duplication
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Stages and the COPY command (conceptual) | 96 | 8 |
| M04L02 | Secure data sharing between accounts | 96 | 8 |

### M05 Access and cost awareness (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assign the least-privilege role for a described analyst task; (2) Identify two habits that control an analyst's compute cost
- Common misconception addressed: Ignoring warehouse auto-suspend and running up credits
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Roles and role-based access control | 96 | 8 |
| M05L02 | Cost monitoring and analyst good practice | 96 | 8 |

## Integrative case

An analyst joins a company using Snowflake and must deliver a monthly dashboard query. Choose an appropriately sized warehouse with auto-suspend, query a semi-structured column, decide between a view and a table, use secure sharing instead of copying where possible, and apply least-privilege roles while keeping compute cost under control.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1641-final-protected | 25 | 25 | yes |
| MST-1641-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Snowflake architecture | 5 |
| Querying data | 5 |
| Warehouses and performance | 5 |
| Loading and sharing | 5 |
| Access and cost awareness | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1641-Q0001** (single-answer, Select ONE) What does Snowflake's separation of storage and compute allow?

- A. Scaling compute (warehouses) independently of stored data **(key)**  
  _Rationale:_ Correct: compute can scale up or down without changing storage.
- B. Deleting data whenever a warehouse is resized  
  _Rationale:_ Resizing compute does not touch stored data.
- C. Running queries with no compute at all  
  _Rationale:_ Queries still require a running warehouse.
- D. Storing data only inside the warehouse  
  _Rationale:_ Storage is separate from the compute warehouses.

**MST-1641-Q0002** (multiple-answer, Select TWO) Which TWO habits help an analyst control Snowflake compute cost? (Select TWO.)

- A. Enable auto-suspend so idle warehouses stop consuming credits **(key)**  
  _Rationale:_ Correct: auto-suspend stops paying for idle compute.
- B. Use an appropriately sized warehouse for the workload **(key)**  
  _Rationale:_ Correct: right-sizing avoids paying for unused capacity.
- C. Leave a large warehouse running continuously just in case  
  _Rationale:_ Idle large warehouses waste credits.
- D. Re-run identical queries to avoid the result cache  
  _Rationale:_ Avoiding the cache wastes compute unnecessarily.

**MST-1641-Q0003** (single-answer, Select ONE) Two accounts need access to the same live dataset without duplicating it. What fits best?

- A. Snowflake secure data sharing **(key)**  
  _Rationale:_ Correct: secure sharing gives live access without copying data.
- B. Exporting and emailing CSV files daily  
  _Rationale:_ That duplicates data and goes stale immediately.
- C. Copying the whole database to each account  
  _Rationale:_ Copying duplicates storage and causes drift.
- D. Giving everyone the ACCOUNTADMIN role  
  _Rationale:_ That violates least privilege and does not address sharing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
