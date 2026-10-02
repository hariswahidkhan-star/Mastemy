# Google Cloud Document AI: Extraction and Validation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0749` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google (Google Cloud) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-DOCAI (https://cloud.google.com/document-ai/docs; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Google Cloud Document AI: Extraction and Validation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Select and configure Document AI processors for a document type
2. Extract text, entities and key-value pairs from documents
3. Validate, correct and enrich extracted data in a human-in-the-loop flow
4. Integrate Document AI into automated processing pipelines
5. Measure extraction accuracy and handle low-confidence results
6. Secure document data and control processing cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Processors and setup (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a processor and process a sample document; (2) Map a document type to the right processor
- Common misconception addressed: Using a general OCR processor when a specialized parser exists
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Processor types and choosing one | 120 | 5 |
| M01L02 | Projects, processors and API basics | 120 | 5 |

### M02 Extraction (MASTEMY-DESIGN 25%)

- Worked applications: (1) Extract entities and read their confidence scores; (2) Parse a table into structured rows
- Common misconception addressed: Ignoring confidence scores and treating all fields as equally reliable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Text, entities and key-value extraction | 120 | 5 |
| M02L02 | Tables, line items and confidence scores | 120 | 5 |

### M03 Validation and human review (MASTEMY-DESIGN 25%)

- Worked applications: (1) Apply validation rules and flag failures; (2) Route low-confidence fields to a review queue
- Common misconception addressed: Auto-approving extracted data without validation thresholds
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Validation rules and correction | 120 | 5 |
| M03L02 | Human-in-the-loop review routing | 120 | 5 |

### M04 Pipelines, accuracy and security (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write validated records to a datastore from a pipeline; (2) Measure field accuracy against a labelled sample
- Common misconception addressed: Reporting accuracy without a labelled ground-truth sample
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Pipeline integration and storage | 120 | 5 |
| M04L02 | Accuracy measurement, security and cost | 120 | 5 |

## Integrative case

Automate accounts-payable intake with Document AI: choose an invoice processor, extract vendor, totals and line items, route low-confidence fields to human review, write validated records to a database, measure accuracy against a sample, and secure the pipeline and documents.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0749-final-protected | 40 | 50 | yes |
| MST-0749-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Processors and setup | 10 |
| Extraction | 10 |
| Validation and human review | 10 |
| Pipelines, accuracy and security | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0749-Q0001** (single-answer, Select ONE) An invoice field is extracted with a low confidence score. What is the most appropriate automated response?

- A. Route that field to human review before it is accepted **(key)**  
  _Rationale:_ Correct: low confidence should trigger review, not silent acceptance.
- B. Accept the value and continue  
  _Rationale:_ Accepting low-confidence data risks propagating errors.
- C. Discard the entire document  
  _Rationale:_ Discarding wastes correct fields; only the uncertain field needs review.
- D. Re-run the same processor until confidence rises  
  _Rationale:_ Re-running the same processor on the same input does not change the result.

**MST-0749-Q0002** (multiple-answer, Select TWO) Which TWO steps are needed to report extraction accuracy honestly? (Select TWO.)

- A. Compare extracted fields to a labelled ground-truth sample **(key)**  
  _Rationale:_ Correct: accuracy requires a known-correct reference.
- B. Report accuracy per field type, not just an overall number **(key)**  
  _Rationale:_ Correct: per-field reporting exposes weak fields.
- C. Assume accuracy equals the average confidence score  
  _Rationale:_ Confidence is not the same as measured accuracy.
- D. Test only on documents the processor was tuned with  
  _Rationale:_ That biases the result upward.

**MST-0749-Q0003** (single-answer, Select ONE) You need to extract vendor, date and totals from standard invoices. Which processor choice is best?

- A. A specialized invoice parser processor **(key)**  
  _Rationale:_ Correct: a specialized parser targets invoice entities directly.
- B. A plain OCR-only processor  
  _Rationale:_ OCR returns text but not structured invoice entities.
- C. A form-field processor for a different document type  
  _Rationale:_ A mismatched processor extracts the wrong fields.
- D. No processor; parse the PDF with string matching  
  _Rationale:_ Manual string matching is brittle and error-prone.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
