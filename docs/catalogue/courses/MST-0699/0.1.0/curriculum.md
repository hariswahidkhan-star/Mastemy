# Azure Document Intelligence: Extraction and Validation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0699` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-AZURE-DOCINTEL (https://learn.microsoft.com/azure/ai-services/document-intelligence/overview) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Azure Document Intelligence: Extraction and Validation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Understand Document Intelligence' to professional tasks
2. Apply the skills of 'Use prebuilt models' to professional tasks
3. Apply the skills of 'Build custom models' to professional tasks
4. Apply the skills of 'Validate and act on results' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Understand Document Intelligence (25%, design assumption)

- Worked applications: (1) Run Layout on a PDF and inspect text, tables and selection marks; (2) Decide whether Read, Layout or a prebuilt model fits a document
- Common misconception addressed: Assuming every document needs a custom-trained model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Document Intelligence does | 60 | 6 |
| M01L02 | Read and Layout features | 60 | 6 |
| M01L03 | General document key-value extraction | 60 | 6 |
| M01L04 | Document Intelligence Studio, SDKs and REST API | 60 | 6 |
### M02 Use prebuilt models (25%, design assumption)

- Worked applications: (1) Extract fields from an invoice with the prebuilt invoice model; (2) Match four business documents to the right prebuilt model
- Common misconception addressed: Expecting a prebuilt model to extract fields it was never designed for
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prebuilt invoice and receipt models | 60 | 6 |
| M02L02 | Identity and tax document models | 60 | 6 |
| M02L03 | Model output and field schemas | 60 | 6 |
| M02L04 | Choosing a prebuilt model by document type | 60 | 6 |
### M03 Build custom models (25%, design assumption)

- Worked applications: (1) Label five sample forms and train a custom extraction model; (2) Decide between a template and a neural model for variable layouts
- Common misconception addressed: Thinking more training documents always beats consistent, well-labeled ones
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Custom template vs custom neural models | 60 | 6 |
| M03L02 | Labeling a training dataset | 60 | 6 |
| M03L03 | Custom classifier models | 60 | 6 |
| M03L04 | Composed models for similar form types | 60 | 6 |
### M04 Validate and act on results (25%, design assumption)

- Worked applications: (1) Set a confidence threshold that routes low-confidence fields for review; (2) Design a review step before extracted invoice data posts to finance
- Common misconception addressed: Treating a high confidence score as a guarantee the value is correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Confidence scores (document, field, word) | 60 | 6 |
| M04L02 | Designing a human-in-the-loop review | 60 | 6 |
| M04L03 | Thresholds and routing low-confidence items | 60 | 6 |
| M04L04 | Integrating extraction into a workflow | 60 | 6 |

## Integrative case

An accounts-payable team wants to automate invoice intake: use the prebuilt invoice model, train a custom model for a non-standard vendor form, add a classifier to route document types, and design a confidence-threshold human review before data posts to the finance system.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0699-final-protected | 72 | 72 | yes |
| MST-0699-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Understand Document Intelligence | 18 |
| Use prebuilt models | 18 |
| Build custom models | 18 |
| Validate and act on results | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0699-Q0001** (single-answer, Select ONE) A team must extract fields from a non-standard vendor form with varying layouts and the highest practical accuracy. Which approach does Microsoft recommend first?

- A. Train a custom neural model **(key)**  
  _Rationale:_ Correct: for supported languages and variable layouts, Microsoft recommends neural models over template models for higher accuracy.
- B. Use the prebuilt receipt model  
  _Rationale:_ The receipt model targets receipts, not an arbitrary custom vendor form.
- C. Use Read only  
  _Rationale:_ Read extracts raw text and locations, not labeled business fields.
- D. Skip training and rely on confidence scores  
  _Rationale:_ Confidence scores describe certainty; they do not extract custom fields without a model.
**MST-0699-Q0002** (single-answer, Select ONE) An extracted invoice total returns a confidence score of 0.62. What is the most appropriate action in a production workflow?

- A. Route the field for human review **(key)**  
  _Rationale:_ Correct: low-confidence fields should be routed to a human-in-the-loop review before being trusted.
- B. Post it to finance automatically  
  _Rationale:_ A low confidence score means the value should not be trusted without review.
- C. Delete the document  
  _Rationale:_ Deleting the document loses the data instead of validating it.
- D. Retrain the model on this single document  
  _Rationale:_ A single low-confidence result is not a basis for retraining; it should be reviewed.
**MST-0699-Q0003** (multiple-answer, Select TWO) Which TWO are valid Document Intelligence custom model capabilities? (Select TWO)

- A. Custom classifier models identify a document's type **(key)**  
  _Rationale:_ Correct: classifier models identify the document type before an extraction model is invoked.
- B. Composed models combine several custom models for similar form types **(key)**  
  _Rationale:_ Correct: composed models group custom models to analyze similar form types.
- C. Prebuilt models require labeling five examples before use  
  _Rationale:_ Prebuilt models require no custom training; labeling applies to custom models.
- D. Custom models eliminate the need for any confidence review  
  _Rationale:_ Confidence scores and review remain relevant regardless of model type.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/azure/ai-services/document-intelligence/overview) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
