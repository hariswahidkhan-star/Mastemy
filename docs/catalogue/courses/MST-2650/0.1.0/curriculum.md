# Excel Intermediate: Logical, Text, and Date Functions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2650` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Excel Intermediate: Logical, Text, and Date Functions (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Combine functions and operators to build multi-step formulas that stay readable
2. Apply logical functions IF, AND, OR, IFS and nested conditions to real decisions
3. Summarise data conditionally with SUMIF(S), COUNTIF(S) and AVERAGEIF(S)
4. Manipulate text with LEFT, RIGHT, MID, TRIM, TEXT, CONCAT and TEXTJOIN
5. Work with dates and times using TODAY, DATEDIF, EOMONTH, WEEKDAY and NETWORKDAYS
6. Trace, audit and fix errors (#DIV/0!, #N/A, #VALUE!) with IFERROR and the auditing tools

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Logical and conditional logic (25% (design weight), design weight)

- Worked applications: (1) Grade scores into bands with IFS instead of deeply nested IFs; (2) Combine two conditions with AND to flag at-risk accounts
- Common misconception addressed: Nesting five IFs where IFS or a lookup table is clearer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | IF, nested IF and IFS | 120 | 7 |
| M01L02 | AND, OR and combining conditions | 120 | 7 |

### M02 Conditional aggregation (25% (design weight), design weight)

- Worked applications: (1) Total sales for one region and quarter with SUMIFS; (2) Count orders above a threshold with COUNTIF
- Common misconception addressed: Using SUMIF when two criteria are needed (SUMIFS)
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | SUMIF and SUMIFS | 120 | 7 |
| M02L02 | COUNTIF(S) and AVERAGEIF(S) with criteria | 120 | 7 |

### M03 Text and data cleaning functions (25% (design weight), design weight)

- Worked applications: (1) Extract an area code with LEFT and clean stray spaces with TRIM; (2) Build a full name from parts with TEXTJOIN and a delimiter
- Common misconception addressed: Forgetting that LEFT/MID return text, breaking later arithmetic
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | LEFT/RIGHT/MID, LEN and TRIM | 120 | 7 |
| M03L02 | TEXT, CONCAT, TEXTJOIN and splitting text | 120 | 7 |

### M04 Dates, time and error handling (25% (design weight), design weight)

- Worked applications: (1) Compute age in complete years with DATEDIF; (2) Wrap a VLOOKUP in IFERROR to show a friendly message instead of #N/A
- Common misconception addressed: Hiding a real #REF! error with IFERROR and never fixing the cause
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Date/time functions and durations | 120 | 7 |
| M04L02 | Error types, IFERROR and formula auditing | 120 | 7 |

## Integrative case

An operations analyst receives a monthly export of orders with inconsistent names, mixed date formats and some error values: they must clean the text, classify orders with logical rules, total sales by region and month, and replace raw error codes with clear messages for a manager's review.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2650-final-protected | 40 | 40 | yes |
| MST-2650-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Logical and conditional logic | 10 |
| Conditional aggregation | 10 |
| Text and data cleaning functions | 10 |
| Dates, time and error handling | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2650-Q0001** (single-answer, Select ONE) You need the total of Sales where Region is 'North' and Quarter is 'Q1'. Which function fits best?

- A. SUMIFS with two criteria ranges **(key)**  
  _Rationale:_ Correct: SUMIFS sums with multiple conditions, one criterion per range.
- B. SUMIF, which supports two conditions  
  _Rationale:_ SUMIF takes only a single criterion.
- C. SUM wrapped in IF  
  _Rationale:_ That does not aggregate conditionally across rows the way SUMIFS does.
- D. COUNTIFS  
  _Rationale:_ COUNTIFS counts rows; it does not total a value.

**MST-2650-Q0002** (multiple-answer, Select TWO) A VLOOKUP returns #N/A for unmatched codes and you want a clean report. Which TWO are sound ways to handle it? (Select TWO.)

- A. Wrap it as =IFERROR(VLOOKUP(...),"Not found") **(key)**  
  _Rationale:_ Correct: IFERROR substitutes a friendly value when the lookup fails.
- B. Investigate whether the missing codes indicate a real data problem **(key)**  
  _Rationale:_ Correct: suppressing the symbol is not enough; genuine gaps should be understood.
- C. Delete every row that shows #N/A without checking  
  _Rationale:_ Deleting data blindly can remove legitimate records.
- D. Turn off formula calculation  
  _Rationale:_ That stops all results updating, not just the error.

**MST-2650-Q0003** (single-answer, Select ONE) LEFT(A2,3) returns the first three characters of a phone number, but a later SUM of that column fails. Why?

- A. LEFT returns text, so the extracted values are not numbers **(key)**  
  _Rationale:_ Correct: text-returning functions produce text; convert with VALUE or multiply by 1 if numbers are needed.
- B. LEFT only works on numbers  
  _Rationale:_ LEFT works on text and text representations of numbers.
- C. SUM cannot read column A  
  _Rationale:_ SUM can read any column; the issue is the data type.
- D. The cells are merged  
  _Rationale:_ Merging is unrelated to the text-vs-number cause here.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
