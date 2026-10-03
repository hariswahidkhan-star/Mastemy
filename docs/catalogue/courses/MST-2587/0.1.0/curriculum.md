# SQL: Advanced Performance, Windowing and Transactions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2587` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint; compiler, runtime, standard-library and tooling versions to be pinned at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — SQL: Advanced Performance, Windowing and Transactions (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Analyse and improve query performance using execution plans
2. Design indexes for selectivity, covering and composite keys
3. Reason about transactions, isolation levels and locking
4. Use advanced window framing and analytic functions
5. Apply normalisation and deliberate denormalisation trade-offs
6. Write maintainable SQL with stored routines and set-based thinking

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Query optimisation (20% (design weight), design weight)

- Worked applications: (1) Spot a full scan in a plan and fix it; (2) Choose a better join order
- Common misconception addressed: Optimising by guesswork instead of the plan
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Reading execution plans | 64 | 4 |
| M01L02 | Join algorithms: nested loop, hash, merge | 64 | 4 |
| M01L03 | Statistics and cardinality estimates | 64 | 4 |

### M02 Indexing strategy (20% (design weight), design weight)

- Worked applications: (1) Design a composite index for a query; (2) Add a covering index
- Common misconception addressed: Leading a composite index with a low-selectivity column
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Composite index column order | 64 | 4 |
| M02L02 | Covering indexes | 64 | 4 |
| M02L03 | Index-only scans and write cost | 64 | 4 |

### M03 Transactions (20% (design weight), design weight)

- Worked applications: (1) Pick an isolation level for a report; (2) Resolve a deadlock by lock ordering
- Common misconception addressed: Assuming the default isolation prevents all anomalies
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | ACID and isolation levels | 64 | 4 |
| M03L02 | Dirty/non-repeatable/phantom reads | 64 | 4 |
| M03L03 | Locking and deadlocks | 64 | 4 |

### M04 Advanced analytics (20% (design weight), design weight)

- Worked applications: (1) Compute a 7-row moving average with ROWS; (2) Detect gaps with LAG
- Common misconception addressed: Confusing RANGE and ROWS framing
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Window frames ROWS vs RANGE | 64 | 4 |
| M04L02 | LAG, LEAD, NTILE | 64 | 4 |
| M04L03 | Percentiles and gaps-and-islands | 64 | 4 |

### M05 Modelling and routines (20% (design weight), design weight)

- Worked applications: (1) Normalise a redundant table; (2) Replace a row-by-row cursor with a set operation
- Common misconception addressed: Using cursors where a single set-based statement suffices
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Normalisation to 3NF | 64 | 4 |
| M05L02 | Denormalisation trade-offs | 64 | 4 |
| M05L03 | Set-based logic over cursors | 64 | 4 |

## Integrative case

An engineer tunes a reporting warehouse in SQL: read execution plans to remove a full scan, design a covering composite index, choose an isolation level that avoids a reporting anomaly, and replace a cursor with set-based logic.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2587-final-protected | 40 | 40 | yes |
| MST-2587-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Query optimisation | 8 |
| Indexing strategy | 8 |
| Transactions | 8 |
| Advanced analytics | 8 |
| Modelling and routines | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2587-Q0001** (single-answer, Select ONE) Why does column order matter in a composite index for WHERE a = ? AND b = ?

- A. The index is most useful when its leading columns match the query's equality predicates **(key)**  
  _Rationale:_ A composite index is ordered left-to-right; leading columns drive seekability.
- B. Column order never affects index usage  
  _Rationale:_ Order determines whether the index can seek efficiently.
- C. The last column is always the most important  
  _Rationale:_ The leading column generally matters most for seeks.
- D. Composite indexes cannot support multiple predicates  
  _Rationale:_ They are designed exactly for multi-column predicates.

**MST-2587-Q0002** (multiple-answer, Select TWO) Select TWO anomalies that a higher transaction isolation level is designed to prevent.

- A. Non-repeatable reads **(key)**  
  _Rationale:_ Higher isolation prevents a row changing between two reads in one transaction.
- B. Phantom reads **(key)**  
  _Rationale:_ Serializable isolation prevents new rows appearing in a repeated range query.
- C. Deadlocks  
  _Rationale:_ Isolation levels do not eliminate deadlocks; lock ordering does.
- D. Disk fragmentation  
  _Rationale:_ Fragmentation is a storage concern, not an isolation anomaly.

**MST-2587-Q0003** (single-answer, Select ONE) What is the difference between ROWS and RANGE in a window frame?

- A. ROWS counts a fixed number of physical rows; RANGE groups peers with equal ORDER BY values **(key)**  
  _Rationale:_ RANGE includes all ties at a boundary; ROWS is a strict physical offset.
- B. They are identical  
  _Rationale:_ They differ in how ties at the frame edge are treated.
- C. RANGE is only valid without ORDER BY  
  _Rationale:_ RANGE depends on the ORDER BY values.
- D. ROWS cannot be used with moving averages  
  _Rationale:_ ROWS is commonly used for moving averages.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
