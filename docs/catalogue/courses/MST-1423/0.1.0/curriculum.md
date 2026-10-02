# Excel Formulas and Functions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1423` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02 (formula fundamentals, logical functions AND/OR/XOR/IF, lookup functions VLOOKUP/LOOKUP/INDEX/MATCH, structured references, error handling with IFERROR). Function availability and dynamic-array support vary by Excel channel and version; confirm against the current build before production. |
| Official sources | https://learn.microsoft.com/office/vba/library-reference/concepts/getting-started-with-vba-in-office; https://support.microsoft.com/office/overview-of-formulas-in-excel-ecfdc708-9162-49e8-b993-c311f47ca173 |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-FUNCTIONS |
| Legacy IDs | MST-MIC-SK-EFF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 55 / module checks 80 / cumulative 105 min |
| Certificate | Mastemy Certificate of Completion — Excel Formulas and Functions (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build formulas using cell references, operators and the correct order of evaluation
2. Apply logical functions (IF, AND, OR, nested conditions) to make decisions
3. Look up and retrieve data with VLOOKUP, XLOOKUP, INDEX and MATCH
4. Aggregate and summarise data with SUM, COUNT, AVERAGE and conditional variants
5. Handle errors and build auditable, maintainable formulas

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Formula fundamentals and references (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Rewrite three broken formulas by fixing absolute vs relative references; (2) Trace the order of evaluation in a multi-operator formula
- Common misconception addressed: Assuming a copied formula keeps the same cell addresses rather than adjusting relative references
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Operators, cell references and order of evaluation | 88 | 5 |
| M01L02 | Absolute, relative and mixed references | 88 | 5 |

### M02 Logical and conditional functions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Build a nested IF to band values into grades; (2) Replace nested IFs with IF+AND/OR for the same result
- Common misconception addressed: Nesting IF statements where a single AND/OR would be clearer and less error-prone
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | IF and comparison logic | 88 | 5 |
| M02L02 | AND, OR, XOR and nested conditions | 87 | 5 |

### M03 Lookup and reference functions (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Replace a fragile VLOOKUP with INDEX/MATCH; (2) Choose exact vs approximate match for two lookup scenarios
- Common misconception addressed: Expecting VLOOKUP to search leftwards or treating approximate match as exact
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | VLOOKUP and XLOOKUP | 87 | 5 |
| M03L02 | INDEX and MATCH | 87 | 5 |
| M03L03 | Approximate match and sorted data | 87 | 5 |

### M04 Aggregation and summarisation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Summarise revenue by region with SUMIFS; (2) Count qualifying rows with COUNTIFS across two criteria
- Common misconception addressed: Using SUM over a whole column and including header or stray values
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SUM, AVERAGE and COUNT | 87 | 5 |
| M04L02 | SUMIFS, COUNTIFS and AVERAGEIFS | 87 | 5 |

### M05 Error handling and auditable formulas (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Wrap a lookup in IFERROR with a meaningful fallback; (2) Use structured references so a table formula expands with the data
- Common misconception addressed: Hiding every error with IFERROR instead of understanding why it occurs
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | IFERROR and error types | 87 | 5 |
| M05L02 | Structured references and formula maintainability | 87 | 5 |

## Integrative case

A sales analyst inherits a workbook of raw order rows and a product price list; build formulas that classify orders, look up list prices, total revenue by region with conditional aggregation, and trap errors so the summary stays clean when data changes.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1423-final-protected | 30 | 40 | yes |
| MST-1423-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Formula fundamentals and references | 6 |
| Logical and conditional functions | 6 |
| Lookup and reference functions | 6 |
| Aggregation and summarisation | 6 |
| Error handling and auditable formulas | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1423-Q0001** (single-answer, Select ONE) A formula in C2 is =A2*$B$1 and is copied down to C3. What does C3 reference?

- A. =A3*$B$1 **(key)**  
  _Rationale:_ Correct: the relative reference A2 shifts to A3 while the absolute $B$1 stays fixed.
- B. =A2*$B$1  
  _Rationale:_ The relative part would change when copied down a row.
- C. =A3*$B$2  
  _Rationale:_ $B$1 is absolute, so its row does not shift.
- D. =A2*$B$2  
  _Rationale:_ Neither change here is correct for a downward copy.

**MST-1423-Q0002** (multiple-answer, Select TWO) Which TWO statements about VLOOKUP are correct? (Select TWO.)

- A. It searches for the lookup value in the first column of the table range **(key)**  
  _Rationale:_ Correct: VLOOKUP matches against the leftmost column of the range.
- B. With FALSE (exact match) it returns #N/A when no match is found **(key)**  
  _Rationale:_ Correct: an exact-match VLOOKUP returns #N/A for a missing value.
- C. It can return a value from a column to the left of the lookup column  
  _Rationale:_ VLOOKUP cannot look left; INDEX/MATCH or XLOOKUP is needed for that.
- D. Approximate match requires the lookup column to be sorted descending  
  _Rationale:_ Approximate match requires ascending order, not descending.

**MST-1423-Q0003** (single-answer, Select ONE) You need to total sales where Region is 'West' and Amount is above 1000. Which function fits best?

- A. SUMIFS **(key)**  
  _Rationale:_ Correct: SUMIFS sums values that meet multiple criteria.
- B. SUM  
  _Rationale:_ SUM cannot apply criteria.
- C. COUNTIFS  
  _Rationale:_ COUNTIFS counts rows, it does not total amounts.
- D. VLOOKUP  
  _Rationale:_ VLOOKUP retrieves one value, it does not aggregate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
