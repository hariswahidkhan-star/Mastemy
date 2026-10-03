# Excel for Business Reporting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2660` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Excel for Business Reporting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design a clear, repeatable report structure that separates data, logic and presentation
2. Build period-over-period and variance reports with correct signs and % change
3. Use conditional formatting and clean number formats to make reports scannable
4. Automate refresh by linking reports to Tables, PivotTables and named ranges
5. Produce print- and PDF-ready layouts with headers, footers and consistent styling
6. Apply a review and version-control routine so reports are accurate and trustworthy

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Report design foundations (25% (design weight), design weight)

- Worked applications: (1) Set up a report template with a data tab, a calc tab and a presentation tab; (2) Reuse the template next month by refreshing rather than rebuilding
- Common misconception addressed: Mixing raw data and presentation on one tab so refresh breaks the layout
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Separating source data, calculations and layout | 120 | 7 |
| M01L02 | Templates and repeatable structures | 120 | 7 |

### M02 Variance and period reporting (25% (design weight), design weight)

- Worked applications: (1) Compute actual-minus-budget variance with the correct sign for costs vs revenue; (2) Add a % change column that handles a zero prior value without #DIV/0!
- Common misconception addressed: Showing a favourable cost variance as negative and confusing readers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Actual vs budget and prior-period variance | 120 | 7 |
| M02L02 | Percentage change, signs and totals that tie | 120 | 7 |

### M03 Presentation and automation (25% (design weight), design weight)

- Worked applications: (1) Use conditional formatting to flag variances beyond a threshold; (2) Apply a thousands/percent number format so figures are instantly readable
- Common misconception addressed: Colour-coding so heavily the report becomes noise rather than signal
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditional formatting and number formats | 120 | 7 |
| M03L02 | Linking to Tables/PivotTables for one-click refresh | 120 | 7 |

### M04 Delivery and trust (25% (design weight), design weight)

- Worked applications: (1) Export a clean one-page PDF with a header, footer and page numbers; (2) Keep a dated version and a change log so prior figures are traceable
- Common misconception addressed: Overwriting last month's file so an audit cannot see what changed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Print, PDF and layout for distribution | 120 | 7 |
| M04L02 | Review, version control and sign-off | 120 | 7 |

## Integrative case

A finance analyst owns the monthly management report: they build a reusable template that separates data from layout, compute actual-vs-budget variance with correct signs and safe % change, flag exceptions with conditional formatting, and deliver a versioned, print-ready PDF with a sign-off step.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2660-final-protected | 40 | 40 | yes |
| MST-2660-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Report design foundations | 10 |
| Variance and period reporting | 10 |
| Presentation and automation | 10 |
| Delivery and trust | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2660-Q0001** (single-answer, Select ONE) A % change column shows #DIV/0! whenever the prior period was zero. What is the cleanest fix?

- A. Guard the division, e.g. =IF(prior=0,"n/a",(current-prior)/prior) **(key)**  
  _Rationale:_ Correct: handling the zero denominator avoids the error and communicates clearly.
- B. Delete every row where prior is zero  
  _Rationale:_ That hides legitimate new items.
- C. Format the cell so the error is white text  
  _Rationale:_ Hiding the error leaves a wrong, confusing value.
- D. Set calculation to manual  
  _Rationale:_ That stops updates everywhere, not just this column.

**MST-2660-Q0002** (multiple-answer, Select TWO) Which TWO practices make a monthly report both trustworthy and efficient? (Select TWO.)

- A. Link the report to Tables/PivotTables so it refreshes rather than being rebuilt **(key)**  
  _Rationale:_ Correct: automated refresh reduces errors and effort each cycle.
- B. Keep dated versions and a change log for traceability **(key)**  
  _Rationale:_ Correct: version control lets reviewers see what changed and when.
- C. Type each month's numbers in by hand for control  
  _Rationale:_ Manual re-entry is slow and error-prone.
- D. Overwrite the previous file to save space  
  _Rationale:_ That destroys the audit trail.

**MST-2660-Q0003** (single-answer, Select ONE) Why separate source data, calculations and presentation across different areas or tabs?

- A. So the report can be refreshed and audited without breaking the layout **(key)**  
  _Rationale:_ Correct: separation keeps refresh reliable and makes logic easy to review.
- B. Because Excel requires three tabs in every file  
  _Rationale:_ There is no such requirement.
- C. To make the workbook open faster  
  _Rationale:_ Speed is not the primary reason.
- D. Because formulas cannot span tabs  
  _Rationale:_ Formulas can reference across tabs freely.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
