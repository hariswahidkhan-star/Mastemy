# Copilot in Excel: Analysis, Formulas, and Verification

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0649` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Product skills course; features versioned by verification date. Licensing and in-app capability statements checked on Microsoft Learn 2026-10-02; the =COPILOT() worksheet function was seen only in a Microsoft Q&A answer (preview) and is NOT taught as generally available until its official page is checked. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-COPILOT-OVERVIEW |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Copilot in Excel: Analysis, Formulas, and Verification (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Copilot in Excel availability, licence prerequisites and admin dependencies
2. Prepare workbook data so Copilot can analyse it reliably
3. Use Copilot to analyse data, create PivotTables, charts and formula columns
4. Verify Copilot outputs with independent calculations, reconciliations and edge-case tests
5. Document AI-assisted changes and apply data-protection practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Access, licensing and data preparation (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Diagnose why Copilot is unavailable for a user (licence, account, storage location); (2) Convert a messy range into a well-formed table with clear headers
- Common misconception addressed: Assuming any Excel version includes Copilot
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Copilot availability, licences and admin settings | 72 | 6 |
| M01L02 | Preparing data: tables, headers and clean ranges | 72 | 6 |

### M02 Analysis and insights (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Ask Copilot for top overdue customers and verify with a PivotTable; (2) Generate a chart and correct a misleading axis
- Common misconception addressed: Treating a plausible insight as verified
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Asking analytical questions of a table | 120 | 6 |
| M02L02 | Generating summaries, PivotTables and charts with Copilot | 120 | 6 |

### M03 Formulas with Copilot (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a days-overdue formula column and test leap-year and blank dates; (2) Explain and simplify a nested formula with Copilot
- Common misconception addressed: Accepting a formula because it fills without errors
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Generating formula columns and explaining formulas | 120 | 6 |
| M03L02 | Checking generated formulas against hand calculations | 120 | 6 |

### M04 Verification and model risk (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Reconcile Copilot totals to the source ledger and log differences; (2) Build a review checklist for AI-assisted workbooks
- Common misconception addressed: Skipping documentation because the change was 'only' AI-assisted
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Verification workflow: reconciliation totals, edge cases, sampling | 96 | 6 |
| M04L02 | Documenting AI-assisted changes for review | 96 | 6 |

### M05 Responsible use and data protection (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Handle a labelled confidential workbook; (2) Rephrase an ambiguous request that produced wrong groupings
- Common misconception addressed: Believing Copilot can access data the user cannot
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data protection and sensitivity labels with Copilot | 72 | 6 |
| M05L02 | Limitations: incorrect values, ambiguous prompts, unsupported data | 72 | 6 |

## Integrative case

A finance analyst receives an AP ageing export with inconsistent dates and duplicate invoices: clean it, use Copilot to analyse overdue balances and build formula columns, reconcile totals to the ledger, and document every AI-assisted step.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0649-final-protected | 30 | 40 | yes |
| MST-0649-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Access, licensing and data preparation | 5 |
| Analysis and insights | 8 |
| Formulas with Copilot | 7 |
| Verification and model risk | 6 |
| Responsible use and data protection | 4 |

Minimum reviewed item bank: 340 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0649-Q0001** (single-answer, Select ONE) Copilot adds a 'Days overdue' column. What is the best first check?

- A. Recalculate a sample of rows by hand, including blank and future dates **(key)**  
  _Rationale:_ Correct: independent recalculation and edge cases are the core verification method.
- B. Check the column has no #VALUE! errors  
  _Rationale:_ No errors does not mean correct results.
- C. Ask Copilot to confirm the column is right  
  _Rationale:_ Self-confirmation is not independent verification.
- D. Format the column as a number  
  _Rationale:_ Formatting does not validate logic.

**MST-0649-Q0002** (multiple-answer, Select TWO) Which TWO data-preparation steps make Copilot analysis more reliable? (Select TWO.)

- A. Format the data as a table with one header row **(key)**  
  _Rationale:_ Correct: Copilot works best on well-structured tables.
- B. Remove merged cells and blank header names **(key)**  
  _Rationale:_ Correct: merged cells and unnamed columns create ambiguity.
- C. Add decorative colours to every other row  
  _Rationale:_ Formatting colour does not help analysis.
- D. Split the data across many small sheets  
  _Rationale:_ Fragmenting data makes analysis harder.

**MST-0649-Q0003** (single-answer, Select ONE) A user with Microsoft 365 but no Copilot add-on licence cannot see full Copilot chat in Excel. Based on Microsoft's licensing documentation, what is the likely reason?

- A. Without the add-on, users get a more limited Copilot experience; full features require an eligible licence **(key)**  
  _Rationale:_ Correct: Microsoft Learn describes a basic (standard-access) experience without the add-on and fuller features with it.
- B. Copilot must be installed as a COM add-in  
  _Rationale:_ Microsoft Q&A guidance notes Copilot cannot be manually added as an add-in.
- C. Copilot only works in CSV files  
  _Rationale:_ There is no such restriction.
- D. Copilot requires macros to be enabled  
  _Rationale:_ Macros are unrelated.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
