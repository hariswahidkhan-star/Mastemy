# Google Sheets: Formulas, Analysis, and Collaboration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0722` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google Sheets product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-SHEETS (https://support.google.com/docs/topic/9054603; https://support.google.com/docs/table/25273; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Google Sheets: Formulas, Analysis, and Collaboration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Enter, format and structure data in Google Sheets
2. Write formulas with absolute and relative references
3. Use core functions for aggregation and lookup
4. Clean, sort and filter data
5. Summarize data with pivot tables and charts
6. Collaborate with sharing, comments and protected ranges

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Data basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Format a range as currency and dates; (2) Convert a messy block into a clean table
- Common misconception addressed: Mixing data types in a single column
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Entering and formatting data | 80 | 5 |
| M01L02 | Structuring a clean table | 80 | 5 |

### M02 Formulas and references (MASTEMY-DESIGN 16%)

- Worked applications: (1) Fill a formula down with relative references; (2) Lock a reference with $ for a constant
- Common misconception addressed: Forgetting $ and dragging a broken formula
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing formulas | 80 | 5 |
| M02L02 | Absolute vs relative references | 80 | 5 |

### M03 Core functions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Total sales with SUMIF; (2) Look up a price with a lookup function
- Common misconception addressed: Using the wrong lookup column order
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SUM, AVERAGE, COUNT and IF | 80 | 5 |
| M03L02 | Lookups with VLOOKUP/XLOOKUP | 80 | 5 |

### M04 Cleaning and filtering (MASTEMY-DESIGN 17%)

- Worked applications: (1) Filter rows for one region; (2) Split a full name into two columns
- Common misconception addressed: Sorting one column without expanding the selection
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sort, filter and remove duplicates | 80 | 5 |
| M04L02 | Text and date helpers | 80 | 5 |

### M05 Summarizing data (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a pivot table by region; (2) Add a chart that updates with the data
- Common misconception addressed: Charting raw rows instead of a summary
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Pivot tables | 80 | 5 |
| M05L02 | Charts and dashboards | 80 | 5 |

### M06 Collaboration (MASTEMY-DESIGN 17%)

- Worked applications: (1) Share with commenter access; (2) Protect a summary range from edits
- Common misconception addressed: Leaving a summary range editable by everyone
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Sharing and comments | 80 | 5 |
| M06L02 | Protected ranges and version history | 80 | 5 |

## Integrative case

Turn a messy export of sales rows into a decision-ready workbook: clean and format the data, add calculated columns with the right references, build a pivot table by region, chart the trend, and share it with a locked summary range.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0722-final-protected | 40 | 50 | yes |
| MST-0722-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data basics | 7 |
| Formulas and references | 7 |
| Core functions | 7 |
| Cleaning and filtering | 7 |
| Summarizing data | 6 |
| Collaboration | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0722-Q0001** (single-answer, Select ONE) You copy a formula down a column, but one cell reference must always point to the same tax-rate cell. What should you use?

- A. An absolute reference such as $B$1 **(key)**  
  _Rationale:_ Correct: locking the reference with $ keeps it fixed when copied.
- B. A relative reference such as B1  
  _Rationale:_ A relative reference shifts as the formula is copied.
- C. A new formula typed in every row  
  _Rationale:_ Retyping is error-prone and unnecessary.
- D. A merged cell  
  _Rationale:_ Merging cells does not fix a reference.

**MST-0722-Q0002** (multiple-answer, Select TWO) Which TWO tools help summarize a large table in Google Sheets? (Select TWO.)

- A. A pivot table **(key)**  
  _Rationale:_ Correct: pivot tables aggregate data by category.
- B. A chart built on the summary **(key)**  
  _Rationale:_ Correct: a chart visualizes the summarized data.
- C. Manually retyping totals into a note  
  _Rationale:_ Manual totals are error-prone and not dynamic.
- D. Deleting rows until only totals remain  
  _Rationale:_ Deleting source data destroys the detail.

**MST-0722-Q0003** (single-answer, Select ONE) Which function totals only the values that meet a condition?

- A. SUMIF **(key)**  
  _Rationale:_ Correct: SUMIF totals values matching a criterion.
- B. COUNT  
  _Rationale:_ COUNT counts numeric cells; it does not total by condition.
- C. CONCATENATE  
  _Rationale:_ CONCATENATE joins text, not totals.
- D. TRIM  
  _Rationale:_ TRIM removes extra spaces from text.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
