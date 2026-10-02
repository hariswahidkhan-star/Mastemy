# OpenAI Vision and Document-Understanding Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0503` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Vision and Document-Understanding Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how vision models interpret images and documents
2. Send images and documents to the model and structure the task
3. Extract structured data from documents reliably
4. Evaluate accuracy and handle low-quality or ambiguous inputs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Sending images and documents, extracting structured data and validating results are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Vision foundations (25%)

- Worked applications: (1) Decide whether a task needs vision or text alone; (2) Choose image resolution or detail for a task
- Common misconception addressed: Expecting pixel-perfect OCR accuracy on poor-quality scans
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What vision models can and cannot do | 120 | 6 |
| M01L02 | Sending images and documents | 120 | 6 |

### M02 Structuring the task (25%)

- Worked applications: (1) Write a prompt to extract fields from an invoice; (2) Define a schema for the extracted fields
- Common misconception addressed: Asking for free text when downstream systems need structured fields
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting for document tasks | 120 | 6 |
| M02L02 | Requesting structured output | 120 | 6 |

### M03 Reliable extraction (25%)

- Worked applications: (1) Plan extraction across a ten-page statement; (2) Add a validation check on a total field
- Common misconception addressed: Trusting extracted numbers without any validation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Multi-page and mixed documents | 120 | 6 |
| M03L02 | Validating extracted data | 120 | 6 |

### M04 Accuracy and edge cases (25%)

- Worked applications: (1) Build a labelled set to measure field accuracy; (2) Decide a confidence threshold for human review
- Common misconception addressed: Shipping document extraction with no human-review path for low confidence
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Measuring extraction accuracy | 120 | 6 |
| M04L02 | Low-quality and ambiguous inputs | 120 | 6 |

## Integrative case

An operations team builds an invoice-processing assistant: it accepts scanned invoices, extracts fields to a defined schema, validates totals, routes low-confidence results to a human, and the team measures field accuracy against a labelled set before rollout.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0503-final-protected | 72 | 72 | yes |
| MST-0503-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Vision foundations | 18 |
| Structuring the task | 18 |
| Reliable extraction | 18 |
| Accuracy and edge cases | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0503-Q0001** (single-answer, Select ONE) What is a realistic expectation when using a vision model on a poor-quality scanned document?

- A. Accuracy can degrade, so outputs may need validation or human review **(key)**  
  _Rationale:_ Correct: poor scans reduce accuracy and need safeguards.
- B. It will always extract every field perfectly  
  _Rationale:_ Perfect extraction is not guaranteed on poor scans.
- C. It cannot read any text at all  
  _Rationale:_ It can often read text, just with reduced accuracy.
- D. It removes the need for a defined output schema  
  _Rationale:_ A schema is still needed for reliable downstream use.

**MST-0503-Q0002** (single-answer, Select ONE) Why request structured output (a defined schema) when extracting data from documents?

- A. Downstream systems can consume consistent fields reliably **(key)**  
  _Rationale:_ Correct: structured fields integrate cleanly downstream.
- B. It makes the image unnecessary  
  _Rationale:_ The image is still the source of the data.
- C. It guarantees the model is always correct  
  _Rationale:_ A schema shapes output but does not guarantee correctness.
- D. It removes the need to measure accuracy  
  _Rationale:_ Accuracy must still be measured.

**MST-0503-Q0003** (multiple-answer, Select TWO) Which TWO safeguards make a document-extraction application more trustworthy? (Select TWO)

- A. Validating extracted values such as checking a total **(key)**  
  _Rationale:_ Correct: validation catches extraction errors.
- B. Routing low-confidence results to a human reviewer **(key)**  
  _Rationale:_ Correct: a human-review path handles uncertain cases.
- C. Publishing extracted numbers with no checks  
  _Rationale:_ Unchecked numbers are a reliability risk.
- D. Measuring accuracy on no examples at all  
  _Rationale:_ Accuracy must be measured on labelled examples.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
