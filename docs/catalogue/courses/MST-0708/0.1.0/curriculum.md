# Power BI DAX: Advanced Analytical Modeling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0708` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-POWERBI-DAX (https://learn.microsoft.com/dax/dax-overview) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Power BI DAX: Advanced Analytical Modeling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'DAX foundations' to professional tasks
2. Apply the skills of 'Modify context with CALCULATE' to professional tasks
3. Apply the skills of 'Time intelligence' to professional tasks
4. Apply the skills of 'Advanced patterns and optimization' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 DAX foundations (25%, design assumption)

- Worked applications: (1) Rewrite a calculated column as a measure and explain the difference; (2) Trace how a measure is evaluated per cell in a matrix
- Common misconception addressed: Confusing a calculated column (row context) with a measure (filter context)
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Calculated columns vs measures | 60 | 6 |
| M01L02 | Row context and filter context | 60 | 6 |
| M01L03 | Aggregation and iterator functions | 60 | 6 |
| M01L04 | Variables and readable DAX | 60 | 6 |
### M02 Modify context with CALCULATE (25%, design assumption)

- Worked applications: (1) Use CALCULATE to compute a percentage of grand total; (2) Use ALLEXCEPT to keep only a chosen grouping
- Common misconception addressed: Assuming CALCULATE adds filters without ever replacing existing ones
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | CALCULATE and filter modification | 60 | 6 |
| M02L02 | FILTER, ALL and ALLEXCEPT | 60 | 6 |
| M02L03 | Removing and replacing filters | 60 | 6 |
| M02L04 | CALCULATETABLE | 60 | 6 |
### M03 Time intelligence (25%, design assumption)

- Worked applications: (1) Build a year-over-year growth measure with time intelligence; (2) Compare DATEADD and SAMEPERIODLASTYEAR behavior
- Common misconception addressed: Writing time-intelligence measures without a proper date table
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Date tables and marking a date table | 60 | 6 |
| M03L02 | TOTALYTD, SAMEPERIODLASTYEAR, DATEADD | 60 | 6 |
| M03L03 | Period-over-period comparisons | 60 | 6 |
| M03L04 | Fixed vs flexible time shifts | 60 | 6 |
### M04 Advanced patterns and optimization (25%, design assumption)

- Worked applications: (1) Create a dynamic ranking measure over a category; (2) Write an RLS rule that filters rows by the current user
- Common misconception addressed: Treating a slow measure as a visual problem rather than a DAX one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Ranking and running totals | 60 | 6 |
| M04L02 | Virtual tables and relationships in DAX | 60 | 6 |
| M04L03 | Row-level security with DAX | 60 | 6 |
| M04L04 | Measure performance and quick measures | 60 | 6 |

## Integrative case

An analyst must deliver an executive sales model: build measures using CALCULATE and filter modification, add year-over-year and running-total time intelligence, implement row-level security with DAX, and tune the slowest measures.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0708-final-protected | 72 | 72 | yes |
| MST-0708-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| DAX foundations | 18 |
| Modify context with CALCULATE | 18 |
| Time intelligence | 18 |
| Advanced patterns and optimization | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0708-Q0001** (single-answer, Select ONE) Which DAX function evaluates an expression in a modified filter context and is the basis for most advanced measures?

- A. CALCULATE **(key)**  
  _Rationale:_ Correct: CALCULATE evaluates an expression in a modified filter context and underpins most advanced DAX.
- B. SUM  
  _Rationale:_ SUM is a simple aggregation; it does not modify filter context.
- C. CONCATENATE  
  _Rationale:_ CONCATENATE joins text and has nothing to do with filter context.
- D. FORMAT  
  _Rationale:_ FORMAT converts a value to text; it does not change filter context.
**MST-0708-Q0002** (single-answer, Select ONE) A measure using time-intelligence functions returns blanks across the matrix. What is the most likely cause?

- A. There is no properly marked date table in the model **(key)**  
  _Rationale:_ Correct: most time-intelligence functions require a proper, contiguous date table.
- B. The report theme is set to dark mode  
  _Rationale:_ Visual theming does not affect DAX evaluation.
- C. The capacity is paused  
  _Rationale:_ A paused capacity would stop everything, not blank one measure.
- D. The measure name is too long  
  _Rationale:_ Measure name length does not cause blank time-intelligence results.
**MST-0708-Q0003** (multiple-answer, Select TWO) Which TWO statements about DAX measures and calculated columns are correct? (Select TWO)

- A. A measure is evaluated in the filter context of each cell at query time **(key)**  
  _Rationale:_ Correct: measures are dynamic and evaluated per cell in the current context.
- B. A calculated column is computed row by row and stored in the model **(key)**  
  _Rationale:_ Correct: calculated columns use row context and are materialized in the model.
- C. A measure stores one static value in the table  
  _Rationale:_ Measures are dynamic, not a single stored value.
- D. A calculated column changes with each slicer selection  
  _Rationale:_ Calculated columns are computed at refresh, not per slicer selection.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/dax/dax-overview) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
