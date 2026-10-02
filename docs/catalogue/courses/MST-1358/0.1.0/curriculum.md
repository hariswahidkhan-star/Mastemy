# OCR and Document AI

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1358` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. OCR fundamentals
2. Layout and structure
3. Document understanding
4. Evaluation and pipelines

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 OCR fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a basic OCR preprocessing step; (2) Diagnose why OCR misreads a scan
- Common misconception addressed: Feeding raw, skewed scans to OCR and blaming the model for errors
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From pixels to text: the OCR pipeline | 120 | 8 |
| M01L02 | Preprocessing: deskew, denoise, binarise | 120 | 8 |

### M02 Layout and structure (MASTEMY-DESIGN 25%)

- Worked applications: (1) Extract a table's cells from a scan; (2) Recover reading order in multi-column text
- Common misconception addressed: Assuming text comes out in correct reading order automatically
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Text detection and layout analysis | 120 | 8 |
| M02L02 | Tables, forms and reading order | 120 | 8 |

### M03 Document understanding (MASTEMY-DESIGN 25%)

- Worked applications: (1) Extract fields from an invoice; (2) Classify incoming document types
- Common misconception addressed: Treating document AI as plain OCR with no layout or semantics
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Key-value extraction from forms | 120 | 8 |
| M03L02 | Document classification and LayoutLM-style models | 120 | 8 |

### M04 Evaluation and pipelines (MASTEMY-DESIGN 25%)

- Worked applications: (1) Measure field-level extraction accuracy; (2) Route low-confidence pages to review
- Common misconception addressed: Reporting character accuracy when the business needs correct fields
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Character/word error rates and field accuracy | 120 | 8 |
| M04L02 | Human-in-the-loop and confidence routing | 120 | 8 |

## Integrative case

An insurer must digitise claim forms that arrive as noisy scans with tables and handwriting. Design preprocessing, layout analysis, key-value field extraction, field-level accuracy metrics and confidence-based human review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1358-final-protected | 20 | 20 | yes |
| MST-1358-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| OCR fundamentals | 5 |
| Layout and structure | 5 |
| Document understanding | 5 |
| Evaluation and pipelines | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1358-Q0001** (single-answer, Select ONE) A scanner produces skewed, noisy images and OCR accuracy is poor. The best first fix is:

- A. Preprocess: deskew, denoise and binarise before OCR **(key)**  
  _Rationale:_ Correct: input quality dominates OCR accuracy.
- B. Switch business domains  
  _Rationale:_ Irrelevant to image quality.
- C. Lower the output font size  
  _Rationale:_ Output font is not an OCR input factor.
- D. Report results without checking accuracy  
  _Rationale:_ That hides the problem instead of fixing it.

**MST-1358-Q0002** (multiple-answer, Select TWO) Which TWO capabilities distinguish document AI from plain OCR? (Select TWO.)

- A. Understanding layout such as tables and forms **(key)**  
  _Rationale:_ Correct: document AI models use spatial layout.
- B. Extracting structured key-value fields **(key)**  
  _Rationale:_ Correct: it returns semantic fields, not just raw text.
- C. Rendering fonts more smoothly  
  _Rationale:_ Not a document-AI capability.
- D. Compressing the image file  
  _Rationale:_ Compression is unrelated to understanding.

**MST-1358-Q0003** (single-answer, Select ONE) The business needs correct invoice totals. Which metric matters most?

- A. Field-level extraction accuracy for the total field **(key)**  
  _Rationale:_ Correct: business value depends on correct fields, not raw characters.
- B. Overall character accuracy across the page  
  _Rationale:_ High character accuracy can still get the total wrong.
- C. Image file size  
  _Rationale:_ Unrelated to extraction correctness.
- D. Number of pages processed per hour alone  
  _Rationale:_ Throughput does not measure correctness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
