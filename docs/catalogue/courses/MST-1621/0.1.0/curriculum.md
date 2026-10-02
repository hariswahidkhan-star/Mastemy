# Excel for Data Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1621` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-DAT-SK-EDA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Excel for Data Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Data analysis foundations in Excel
2. Cleaning and shaping with Power Query
3. Lookup and reference formulas
4. Dynamic arrays and modern functions
5. PivotTables and the data model
6. Statistics and summarisation
7. Dashboards and visualisation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Data analysis foundations in Excel (MASTEMY-DESIGN 14%)

- Worked applications: (1) Convert a raw range into an Excel Table and use structured references; (2) Diagnose why a dataset is not tidy and plan the fix
- Common misconception addressed: Treating a formatted range as if it were a structured Table
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The analysis workflow and tidy-data principles | 69 | 6 |
| M01L02 | Tables, structured references and named ranges | 69 | 6 |

### M02 Cleaning and shaping with Power Query (MASTEMY-DESIGN 16%)

- Worked applications: (1) Unpivot a cross-tab export into a tidy fact table; (2) Merge orders with a lookup table on a key
- Common misconception addressed: Pasting data manually instead of building a refreshable query
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Importing, cleaning and transforming data | 69 | 6 |
| M02L02 | Appending, merging and refreshable queries | 69 | 6 |

### M03 Lookup and reference formulas (MASTEMY-DESIGN 15%)

- Worked applications: (1) Replace a fragile VLOOKUP with XLOOKUP and a not-found default; (2) Build a two-way lookup with INDEX and MATCH
- Common misconception addressed: Using approximate match by accident on unsorted data
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | XLOOKUP, INDEX/MATCH and exact vs approximate match | 69 | 6 |
| M03L02 | Handling errors and missing matches | 69 | 6 |

### M04 Dynamic arrays and modern functions (MASTEMY-DESIGN 15%)

- Worked applications: (1) Build a self-updating top-10 list with SORT and FILTER; (2) Refactor a long formula with LET to name intermediate steps
- Common misconception addressed: Hard-coding ranges that break when rows are added
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | FILTER, SORT, UNIQUE and spill ranges | 69 | 6 |
| M04L02 | LET and lambda basics for readable formulas | 69 | 6 |

### M05 PivotTables and the data model (MASTEMY-DESIGN 15%)

- Worked applications: (1) Build a relationship between sales and calendar tables; (2) Create a distinct-count measure a normal PivotTable cannot
- Common misconception addressed: Flattening everything into one sheet instead of a model
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | PivotTables, grouping and slicers | 68 | 6 |
| M05L02 | Relationships and simple DAX measures in the model | 68 | 6 |

### M06 Statistics and summarisation (MASTEMY-DESIGN 13%)

- Worked applications: (1) Summarise sales by region and month with SUMIFS; (2) Compute a moving average to smooth a noisy trend
- Common misconception addressed: Confusing average with median on a skewed distribution
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Aggregation, conditional summaries and SUMIFS/COUNTIFS | 68 | 6 |
| M06L02 | Descriptive statistics and trend summaries | 68 | 6 |

### M07 Dashboards and visualisation (MASTEMY-DESIGN 12%)

- Worked applications: (1) Wire slicers to several PivotCharts for one-click filtering; (2) Choose the right chart for a part-to-whole versus a trend
- Common misconception addressed: Using a pie chart for a time series
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Chart choice, PivotCharts and conditional formatting | 68 | 6 |
| M07L02 | Designing an interactive, refreshable dashboard | 68 | 6 |

## Integrative case

Analyse a year of regional sales from a messy export: clean and shape it with Power Query, build a data model with relationships and measures, summarise with PivotTables and dynamic-array formulas, and deliver an interactive dashboard that updates when next month's export is dropped in.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1621-final-protected | 30 | 30 | yes |
| MST-1621-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data analysis foundations in Excel | 5 |
| Cleaning and shaping with Power Query | 5 |
| Lookup and reference formulas | 4 |
| Dynamic arrays and modern functions | 4 |
| PivotTables and the data model | 4 |
| Statistics and summarisation | 4 |
| Dashboards and visualisation | 4 |

Minimum reviewed item bank: 396 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1621-Q0001** (single-answer, Select ONE) A lookup must return a value from a column to the LEFT of the key column and show 'Not found' when there is no match. Which is the best choice?

- A. XLOOKUP with its if_not_found argument **(key)**  
  _Rationale:_ Correct: XLOOKUP looks in any direction and has a built-in if_not_found argument for missing matches.
- B. VLOOKUP  
  _Rationale:_ VLOOKUP cannot look to the left of its lookup column and has no built-in not-found message.
- C. HLOOKUP  
  _Rationale:_ HLOOKUP searches across rows, not the vertical left-column case described, and also lacks a not-found argument.
- D. A nested IF chain over every value  
  _Rationale:_ A hand-written IF chain does not scale and is error-prone compared with a lookup function.

**MST-1621-Q0002** (multiple-answer, Select ALL that apply) Which are advantages of cleaning data with Power Query rather than editing cells by hand? (Select TWO)

- A. The steps are recorded and re-run automatically when new data arrives **(key)**  
  _Rationale:_ Correct: Power Query records each transform so a refresh reapplies them to new data.
- B. The original source is left unchanged while the query produces the clean output **(key)**  
  _Rationale:_ Correct: the query reads the source and outputs a transformed copy, preserving the source.
- C. It permanently overwrites the source file so the mess cannot return  
  _Rationale:_ Power Query does not overwrite the source; it transforms a loaded copy.
- D. It guarantees the statistics will be correct without any analysis choices  
  _Rationale:_ Cleaning shapes data but does not make analytical decisions correct on its own.

**MST-1621-Q0003** (single-answer, Select ONE) Why add a separate calendar table and relate it to the sales table in the data model?

- A. It enables time-based measures and avoids duplicating date logic across the model **(key)**  
  _Rationale:_ Correct: a dedicated calendar table gives consistent, reusable time intelligence through the relationship.
- B. It makes the workbook file smaller in every case  
  _Rationale:_ Adding a table does not reliably shrink the file; that is not its purpose.
- C. It is required before you can type any formula in Excel  
  _Rationale:_ Ordinary formulas work without a data model; the calendar table is about modelled analysis.
- D. It converts text dates to numbers automatically everywhere  
  _Rationale:_ Type conversion is a separate cleaning step, not the reason for a related calendar table.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
