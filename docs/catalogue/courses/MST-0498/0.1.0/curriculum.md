# OpenAI Structured Outputs and Schema Validation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0498` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Structured Outputs and Schema Validation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define schemas that constrain model output to a required shape
2. Request and parse structured outputs reliably
3. Validate and handle outputs that fail the schema
4. Apply versioning and safety controls to structured-output contracts

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Writing and running real validation code and engineering judgement on data contracts are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded code or peer review.

## Modules

### M01 Defining output schemas (25%)

- Worked applications: (1) Write a schema for an extracted invoice record; (2) Decide which fields must be required vs optional
- Common misconception addressed: Assuming free-text output can be parsed reliably without a schema
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why constrain output to a schema | 120 | 6 |
| M01L02 | Writing a schema for a required shape | 120 | 6 |

### M02 Requesting structured output (25%)

- Worked applications: (1) Request output that conforms to a defined schema; (2) Parse the structured result into a typed object
- Common misconception addressed: Trusting that output is valid without parsing it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Asking for schema-conformant output | 120 | 6 |
| M02L02 | Parsing the structured response | 120 | 6 |

### M03 Validating and handling failures (25%)

- Worked applications: (1) Validate a response and reject one missing a required field; (2) Recover gracefully when validation fails
- Common misconception addressed: Passing unvalidated model output straight into a database
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Validating against the schema | 120 | 6 |
| M03L02 | Handling and recovering from invalid output | 120 | 6 |

### M04 Contracts and safety (25%)

- Worked applications: (1) Version a schema so old and new consumers both work; (2) Add a guard that stops malformed data reaching downstream systems
- Common misconception addressed: Changing an output contract silently and breaking consumers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Versioning an output contract | 120 | 6 |
| M04L02 | Guarding downstream systems from bad data | 120 | 6 |

## Integrative case

A data-integration developer extracts structured records from documents with the OpenAI API: they define a strict schema, request schema-conformant output, validate every response and reject or recover from invalid ones, guard the database from malformed data, and version the schema so existing consumers keep working.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0498-final-protected | 72 | 72 | yes |
| MST-0498-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Defining output schemas | 18 |
| Requesting structured output | 18 |
| Validating and handling failures | 18 |
| Contracts and safety | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0498-Q0001** (single-answer, Select ONE) Why constrain model output to a defined schema in an extraction pipeline?

- A. Downstream code can rely on a predictable, parseable shape **(key)**  
  _Rationale:_ Correct: a schema makes output structure predictable for downstream consumers.
- B. It guarantees the extracted values are factually correct  
  _Rationale:_ A schema constrains shape, not factual correctness of values.
- C. It removes the need to validate the output  
  _Rationale:_ Validation is still needed; models can still deviate or omit fields.
- D. It makes the model cheaper per token  
  _Rationale:_ Schemas do not change token pricing.

**MST-0498-Q0002** (single-answer, Select ONE) A structured response is missing a required field. What is the safe action?

- A. Reject or recover from it; do not pass it downstream **(key)**  
  _Rationale:_ Correct: failing validation must stop bad data from propagating.
- B. Insert it into the database as-is  
  _Rationale:_ Storing invalid data corrupts downstream systems.
- C. Assume the field is empty and continue silently  
  _Rationale:_ Silently assuming values hides data-quality failures.
- D. Disable validation to avoid the error  
  _Rationale:_ Disabling validation defeats its purpose.

**MST-0498-Q0003** (multiple-answer, Select TWO) Which TWO practices protect consumers when an output schema must change? (Select TWO)

- A. Version the schema so old consumers keep working **(key)**  
  _Rationale:_ Correct: versioning avoids breaking existing consumers on a change.
- B. Validate output against the correct schema version **(key)**  
  _Rationale:_ Correct: validating per version keeps the contract enforceable.
- C. Change the contract silently in place  
  _Rationale:_ Silent changes break downstream consumers without warning.
- D. Stop validating to speed things up  
  _Rationale:_ Dropping validation lets malformed data through.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

