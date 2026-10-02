# DAX Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1425` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft DAX (Data Analysis Expressions) documentation read via the Microsoft Learn MCP on 2026-10-02. Specific product UI labels can vary by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/dax/dax-overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-DAX |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — DAX Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain DAX syntax, functions, and evaluation context
2. Write measures using aggregation, filter, and time intelligence functions
3. Build reusable measures with variables for Power BI models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 DAX syntax and context (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Write a measure with the SUM function and the equals operator; (2) Reference tables and columns with the correct notation
- Common misconception addressed: Confusing calculated columns with measures
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Syntax, operators, and data types | 84 | 4 |
| M01L02 | Row context and filter context | 84 | 4 |

### M02 DAX functions (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Use aggregation functions such as SUM and AVERAGE; (2) Use CALCULATE to modify filter context
- Common misconception addressed: Thinking DAX functions act on a single cell like Excel rather than a whole column
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Aggregation, logical, and text functions | 84 | 4 |
| M02L02 | Time intelligence and CALCULATE | 84 | 4 |

### M03 Building measures and models (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Create a year-over-year measure with time intelligence; (2) Define variables with VAR to simplify a measure
- Common misconception addressed: Hardcoding date ranges instead of using a marked date table
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Variables and iterators | 72 | 4 |
| M03L02 | Measures for reporting | 72 | 4 |

## Integrative case

An analyst builds a set of DAX measures for a sales model, uses CALCULATE and time intelligence to produce a year-over-year growth measure, and documents them with variables.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1425-final-protected | 24 | 32 | yes |
| MST-1425-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| DAX syntax and context | 8 |
| DAX functions | 8 |
| Building measures and models | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1425-Q0001** (single-answer, Select ONE) Which element begins a DAX measure formula and indicates it will return a result when calculated?

- A. The equals sign operator (=) **(key)**  
  _Rationale:_ Correct: the equals sign begins the formula and returns a result when calculated.
- B. A semicolon (;)  
  _Rationale:_ A semicolon does not begin a DAX formula.
- C. The @ symbol  
  _Rationale:_ The @ symbol is not DAX formula syntax.
- D. The # symbol  
  _Rationale:_ The # symbol is not used to begin a DAX measure.

**MST-1425-Q0002** (multiple-answer, Select TWO) Which TWO statements about DAX functions are true? (Select TWO.)

- A. A DAX function always references a complete column or table **(key)**  
  _Rationale:_ Correct: DAX functions reference whole columns or tables, with filters as needed.
- B. DAX includes time intelligence functions for date-based calculations **(key)**  
  _Rationale:_ Correct: DAX provides time intelligence functions for comparisons across periods.
- C. DAX functions operate only on a single selected cell  
  _Rationale:_ Incorrect: DAX works over columns and tables, not single cells.
- D. DAX cannot aggregate values  
  _Rationale:_ Incorrect: DAX includes aggregation functions such as SUM.

**MST-1425-Q0003** (single-answer, Select ONE) Which DAX function modifies the filter context of a calculation?

- A. CALCULATE **(key)**  
  _Rationale:_ Correct: CALCULATE evaluates an expression in a modified filter context.
- B. SUM  
  _Rationale:_ SUM aggregates a column but does not modify filter context on its own.
- C. LEN  
  _Rationale:_ LEN returns string length and is unrelated to filter context.
- D. TODAY  
  _Rationale:_ TODAY returns the current date and does not modify filter context.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
