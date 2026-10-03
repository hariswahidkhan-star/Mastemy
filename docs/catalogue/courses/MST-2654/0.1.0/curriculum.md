# Excel Power Query for Data Transformation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2654` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Microsoft Excel and AI product features change often; this spec teaches durable concepts and must have product specifics re-verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel Power Query for Data Transformation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Import data into Power Query from files, folders, workbooks and the web
2. Clean data with steps: remove columns, change types, trim, split and replace values
3. Reshape data by unpivoting, pivoting, grouping and adding custom columns
4. Merge and append queries to combine tables like joins and unions
5. Understand the Applied Steps list and how a query refreshes repeatably
6. Build a robust, documented query that turns a messy export into a clean table on refresh

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Getting data in (25% (design weight), design weight)

- Worked applications: (1) Connect to a folder of monthly CSVs and combine them into one table; (2) Change a column's type early so later steps do not break
- Common misconception addressed: Doing type changes last, after steps that assumed the wrong type
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Connecting to files, folders and workbooks | 120 | 7 |
| M01L02 | The Power Query Editor and preview | 120 | 7 |

### M02 Cleaning and shaping (25% (design weight), design weight)

- Worked applications: (1) Unpivot a cross-tab of months into a tidy one-row-per-month table; (2) Split a 'City, State' column into two with a delimiter
- Common misconception addressed: Pivoting data that should stay long, then struggling to analyse it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Type changes, trim, split and replace | 120 | 7 |
| M02L02 | Unpivot, pivot and group by | 120 | 7 |

### M03 Combining queries (25% (design weight), design weight)

- Worked applications: (1) Merge orders with a customer table using a left outer join; (2) Append this quarter's file to last quarter's with the same columns
- Common misconception addressed: Choosing an inner join and silently dropping unmatched orders
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Merge (join) queries and join kinds | 120 | 7 |
| M03L02 | Append (union) and folder consolidation | 120 | 7 |

### M04 Repeatable, maintainable queries (25% (design weight), design weight)

- Worked applications: (1) Rename Applied Steps so a colleague can follow the logic; (2) Refresh the query after a new file lands and confirm it flows through
- Common misconception addressed: Hard-coding a user-specific file path that breaks on another machine
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Applied Steps, renaming and comments | 120 | 7 |
| M04L02 | Refresh behaviour and avoiding hard-coded paths | 120 | 7 |

## Integrative case

A finance assistant receives twelve monthly branch exports in a folder, each a cross-tab with stray spaces and mixed types: they build one Power Query that consolidates the folder, cleans and unpivots the data, merges in a branch-name table, and refreshes to a clean table whenever new files arrive.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2654-final-protected | 40 | 40 | yes |
| MST-2654-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Getting data in | 10 |
| Cleaning and shaping | 10 |
| Combining queries | 10 |
| Repeatable, maintainable queries | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2654-Q0001** (single-answer, Select ONE) You have a folder of identically structured monthly CSV files and want one combined table that updates when a new file is added. What is the Power Query approach?

- A. Connect to the folder and combine/append the files, then refresh **(key)**  
  _Rationale:_ Correct: a folder query consolidates matching files and picks up new ones on refresh.
- B. Copy and paste each file into a sheet by hand  
  _Rationale:_ That is manual and not repeatable.
- C. Use VLOOKUP across twelve workbooks  
  _Rationale:_ VLOOKUP does not consolidate files.
- D. Email each file to yourself and merge in the body  
  _Rationale:_ That is not a data-transformation method.

**MST-2654-Q0002** (multiple-answer, Select TWO) Which TWO statements about Power Query are correct? (Select TWO.)

- A. Applied Steps record each transformation and replay on refresh **(key)**  
  _Rationale:_ Correct: the recorded steps make the query repeatable.
- B. Unpivot turns wide cross-tab columns into tidy rows **(key)**  
  _Rationale:_ Correct: unpivoting is the standard reshape for cross-tabs.
- C. Changes must be redone manually every time data changes  
  _Rationale:_ Refresh replays the steps automatically.
- D. Power Query can only read a single worksheet  
  _Rationale:_ It connects to files, folders, workbooks, databases and the web.

**MST-2654-Q0003** (single-answer, Select ONE) A merge between Orders and Customers returns fewer rows than Orders had. Which join most likely caused this and what is the safer default when you want to keep all orders?

- A. An inner join dropped unmatched orders; a left outer join keeps all orders **(key)**  
  _Rationale:_ Correct: inner joins keep only matches, whereas a left outer join preserves every order.
- B. A left outer join dropped them; switch to inner  
  _Rationale:_ That is backwards; inner drops unmatched rows.
- C. Append caused it; use merge instead  
  _Rationale:_ Append stacks rows and would not reduce order count this way.
- D. Type change caused it; remove all type changes  
  _Rationale:_ A type change does not drop rows based on matching.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
