# Excel Power Pivot and the Data Model

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2655` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Excel Power Pivot and the Data Model (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Load tables into the Data Model and understand why it scales beyond the worksheet grid
2. Design a star schema with fact and dimension tables and create relationships
3. Write DAX measures with SUM, SUMX, CALCULATE and FILTER
4. Build time-intelligence measures such as year-to-date and prior-year comparisons
5. Distinguish calculated columns from measures and choose the right one
6. Use a date dimension and understand row context versus filter context at a basic level

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The Data Model (25% (design weight), design weight)

- Worked applications: (1) Load three related tables into the Data Model instead of one giant sheet; (2) Diagnose a pivot showing the same total for every product due to a missing relationship
- Common misconception addressed: Flattening everything into one wide table and losing relationship benefits
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Loading tables and why the model scales | 120 | 7 |
| M01L02 | Fact vs dimension tables | 120 | 7 |

### M02 Relationships and schema (25% (design weight), design weight)

- Worked applications: (1) Create a one-to-many relationship from a sales fact to a product dimension; (2) Add a dedicated date table and mark it as a date table
- Common misconception addressed: Relating two fact tables directly instead of through a shared dimension
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating one-to-many relationships | 120 | 7 |
| M02L02 | Designing a star schema and a date table | 120 | 7 |

### M03 DAX measures (25% (design weight), design weight)

- Worked applications: (1) Write a Total Sales measure with SUMX over quantity times price; (2) Use CALCULATE to compute sales for one category regardless of the pivot filter
- Common misconception addressed: Writing a calculated column where a measure was needed, bloating the model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SUM, SUMX and CALCULATE | 120 | 7 |
| M03L02 | FILTER and modifying filter context | 120 | 7 |

### M04 Time intelligence and context (25% (design weight), design weight)

- Worked applications: (1) Build a year-to-date measure with a marked date table; (2) Compare this year to prior year with a time-intelligence measure
- Common misconception addressed: Expecting time intelligence to work without a proper contiguous date table
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | YTD and prior-year measures | 120 | 7 |
| M04L02 | Calculated columns vs measures; row vs filter context | 120 | 7 |

## Integrative case

A management accountant must report sales, margin and year-on-year growth across products, regions and months from three source tables: they load them into the Data Model, build a star schema with a marked date table, and write DAX measures for total sales, margin and prior-year comparison for a refreshable pivot.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2655-final-protected | 40 | 40 | yes |
| MST-2655-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The Data Model | 10 |
| Relationships and schema | 10 |
| DAX measures | 10 |
| Time intelligence and context | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2655-Q0001** (single-answer, Select ONE) A PivotTable from the Data Model shows the same sales total for every product. What is the most likely cause?

- A. There is no relationship between the sales table and the product table **(key)**  
  _Rationale:_ Correct: without a relationship, the product filter cannot reach the fact table, so totals do not vary.
- B. DAX cannot sum numbers  
  _Rationale:_ DAX sums values; the issue is the missing relationship.
- C. The date table is marked  
  _Rationale:_ Marking a date table does not cause identical product totals.
- D. Measures always return the grand total  
  _Rationale:_ Measures respect filter context when relationships exist.

**MST-2655-Q0002** (multiple-answer, Select TWO) Which TWO statements about Power Pivot are correct? (Select TWO.)

- A. A measure is calculated at query time within the current filter context **(key)**  
  _Rationale:_ Correct: measures evaluate dynamically based on the pivot's filters.
- B. CALCULATE can change the filter context of an expression **(key)**  
  _Rationale:_ Correct: CALCULATE modifies or overrides filters applied to the calculation.
- C. Calculated columns are always preferable to measures  
  _Rationale:_ Calculated columns consume memory and are not dynamic like measures.
- D. The Data Model cannot handle more rows than a worksheet  
  _Rationale:_ The model's columnar engine scales well beyond the 1,048,576-row grid.

**MST-2655-Q0003** (single-answer, Select ONE) You need a Year-to-Date sales measure that resets each year. What must be in place for time intelligence to work reliably?

- A. A contiguous date table marked as a date table and related to the fact table **(key)**  
  _Rationale:_ Correct: time-intelligence functions require a proper, unbroken date dimension.
- B. Only that the fact table has a date column, with no date table  
  _Rationale:_ A dedicated marked date table is required for reliable time intelligence.
- C. Sorting the fact table by date  
  _Rationale:_ Sorting does not satisfy time-intelligence requirements.
- D. Formatting the dates as text  
  _Rationale:_ Text dates break date calculations entirely.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
