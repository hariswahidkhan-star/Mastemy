# Document Extraction Agents with Reconciliation Controls

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0629` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Document Extraction Agents with Reconciliation Controls (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design extraction schemas and field-level confidence
2. Extract structured data from documents reliably
3. Reconcile extracted values against source and cross-checks
4. Route low-confidence results to review and measure accuracy

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Extraction design (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Define an extraction schema with required fields and confidence; (2) Extract fields from a sample document into the schema
- Common misconception addressed: Extracting free text instead of a validated structured schema
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Extraction schemas | 80 | 5 |
| M01L02 | Field-level confidence | 80 | 5 |
| M01L03 | Handling document variety | 80 | 5 |

### M02 Reconciliation (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Reconcile line items against the stated total; (2) Cross-check a field against a second source
- Common misconception addressed: Accepting extracted numbers without any reconciliation check
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Source reconciliation | 80 | 5 |
| M02L02 | Cross-field and cross-source checks | 80 | 5 |
| M02L03 | Detecting inconsistencies | 80 | 5 |

### M03 Review and accuracy (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Route items below a confidence threshold to human review; (2) Measure field-level accuracy against a labelled set
- Common misconception addressed: Treating every extraction as correct because the agent returned a value
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Confidence thresholds and routing | 80 | 5 |
| M03L02 | Human-in-the-loop review | 80 | 5 |
| M03L03 | Measuring accuracy over time | 80 | 5 |

## Integrative case

A team builds an invoice-extraction agent: define an extraction schema with per-field confidence, extract fields from varied documents, reconcile totals and cross-field checks against the source, route low-confidence or failing items to human review, and track accuracy over time.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0629-final-protected | 30 | 30 | yes |
| MST-0629-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Extraction design | 10 |
| Reconciliation | 10 |
| Review and accuracy | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0629-Q0001** (single-answer, Select ONE) Why attach a confidence score to each extracted field?

- A. So low-confidence fields can be routed to review instead of trusted blindly **(key)**  
  _Rationale:_ Correct: per-field confidence drives review routing and reduces silent errors.
- B. Because it makes extraction faster  
  _Rationale:_ Confidence scoring is about reliability, not speed.
- C. To change the document's layout  
  _Rationale:_ Confidence does not alter the source document.
- D. To avoid defining a schema  
  _Rationale:_ Confidence complements a schema; it does not replace it.

**MST-0629-Q0002** (multiple-answer, Select TWO) Which TWO reconciliation checks catch extraction errors on an invoice? (Select TWO.)

- A. Line items must sum to the stated total **(key)**  
  _Rationale:_ Correct: a sum check catches many extraction mistakes.
- B. A key field is cross-checked against a second source **(key)**  
  _Rationale:_ Correct: cross-source agreement flags inconsistent extractions.
- C. Trusting the first extracted value with no check  
  _Rationale:_ No check means errors pass through silently.
- D. Deleting fields that look wrong without review  
  _Rationale:_ Silently discarding data loses information and hides errors.

**MST-0629-Q0003** (single-answer, Select ONE) An extracted field comes back with low confidence and fails a reconciliation check. What should happen?

- A. Route the item to human review rather than accepting it automatically **(key)**  
  _Rationale:_ Correct: low-confidence, failing items should go to review, not straight through.
- B. Accept it anyway because the agent produced a value  
  _Rationale:_ Producing a value does not make it correct.
- C. Drop the whole document silently  
  _Rationale:_ Silent dropping loses data and hides the problem.
- D. Lower the confidence threshold so it passes  
  _Rationale:_ Weakening the threshold hides the error rather than handling it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
