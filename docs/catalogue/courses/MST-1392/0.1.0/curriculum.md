# AI for Spreadsheet Power Users

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1392` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-ASPU-001 |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use AI features inside modern spreadsheet products
2. Generate formulas, cleaning and analysis with AI
3. Build summaries, insights and charts with AI assistance
4. Apply accuracy, privacy and governance safeguards to AI spreadsheet work

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI in the spreadsheet (MASTEMY-DESIGN 25%)

- Worked applications: (1) Compare AI features across two spreadsheet products for a task; (2) Write an in-cell AI prompt that references the right range
- Common misconception addressed: Expecting AI to understand a sheet without any context or clean headers
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The AI-assisted spreadsheet landscape | 48 | 6 |
| M01L02 | Prompting inside spreadsheets | 48 | 6 |
### M02 Formulas and data cleaning (MASTEMY-DESIGN 25%)

- Worked applications: (1) Have AI generate and explain a lookup formula, then test it; (2) Use AI to split, standardise and deduplicate a column
- Common misconception addressed: Trusting a generated formula without checking it on edge cases
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generating and explaining formulas with AI | 48 | 6 |
| M02L02 | Cleaning and transforming data with AI | 48 | 6 |
### M03 Analysis and presentation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Ask AI for a pivot summary and validate the totals; (2) Generate a chart and a one-line narrative, then correct it
- Common misconception addressed: Letting AI choose a chart type that misrepresents the data
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Summaries, pivots and insights with AI | 48 | 6 |
| M03L02 | Charts and narrative reporting with AI | 48 | 6 |
### M04 Accuracy and governance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a verification checklist for AI spreadsheet output; (2) Classify what data may and may not be sent to an AI feature
- Common misconception addressed: Pasting confidential data into an AI tool without checking policy
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Verifying AI spreadsheet output | 48 | 6 |
| M04L02 | Privacy, data residency and governance | 48 | 6 |

## Integrative case

An analyst receives a messy monthly sales export. Use AI inside the spreadsheet to clean it, build the right formulas, produce a pivot summary and a chart, then verify the AI output and apply data-handling safeguards before sharing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1392-final-protected | 20 | 20 | yes |
| MST-1392-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI in the spreadsheet | 5 |
| Formulas and data cleaning | 5 |
| Analysis and presentation | 5 |
| Accuracy and governance | 5 |

Minimum reviewed item bank: 204 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-1392-Q0001** (single-answer, Select ONE) Why does an in-spreadsheet AI prompt usually work better when it references a specific range?

- A. It gives the AI the exact data context to act on **(key)**  
  _Rationale:_ Correct: scoping to a range improves relevance and accuracy.
- B. It makes the workbook file smaller  
  _Rationale:_ Referencing a range does not shrink the file.
- C. It prevents the AI from ever making mistakes  
  _Rationale:_ Context helps but does not guarantee correctness.
- D. It disables all formulas in the sheet  
  _Rationale:_ It does not disable formulas.

**MST-1392-Q0002** (multiple-answer, Select TWO) Which TWO steps help verify AI-generated spreadsheet output? (Select TWO.)

- A. Spot-check results against the source data **(key)**  
  _Rationale:_ Correct: comparison to source catches wrong outputs.
- B. Accept any formula that returns a number  
  _Rationale:_ A returned number can still be wrong.
- C. Test a generated formula on known edge cases **(key)**  
  _Rationale:_ Correct: edge-case testing reveals hidden errors.
- D. Hide the formula so no one can question it  
  _Rationale:_ Hiding logic reduces, not improves, trust.

**MST-1392-Q0003** (single-answer, Select ONE) AI suggests a pie chart for a 12-month sales trend. Why is this a poor choice?

- A. Pie charts show parts of a whole, not change over time **(key)**  
  _Rationale:_ Correct: trends are better shown with a line or column chart.
- B. Pie charts cannot be made in spreadsheets  
  _Rationale:_ They can be made; they are just the wrong fit here.
- C. Twelve months is too few to chart  
  _Rationale:_ Twelve points is fine to chart.
- D. Charts should never be used for sales data  
  _Rationale:_ Charts are appropriate for sales data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
