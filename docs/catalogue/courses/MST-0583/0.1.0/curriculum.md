# Prompt Engineering for Structured Data Extraction

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0583` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Prompt Engineering for Structured Data Extraction (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Specify output schemas and constraints for extraction tasks
2. Prompt models to extract data faithfully from source text
3. Validate extracted output against a schema and handle failures
4. Evaluate and improve extraction accuracy

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Defining the output schema (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Write a JSON schema for an invoice with required and optional fields; (2) Decide how the schema represents a value that is absent from the source
- Common misconception addressed: Leaving the output format implicit and hoping the model is consistent
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Specifying JSON schemas | 80 | 5 |
| M01L02 | Field types and constraints | 80 | 5 |
| M01L03 | Handling optional and missing fields | 80 | 5 |

### M02 Extraction prompting (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add few-shot examples that show the exact output format; (2) Instruct the model to return null rather than guess a missing field
- Common misconception addressed: Prompting in a way that encourages the model to fill gaps with plausible inventions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting for faithful extraction | 80 | 5 |
| M02L02 | Few-shot examples for formats | 80 | 5 |
| M02L03 | Avoiding fabricated values | 80 | 5 |

### M03 Validation and robustness (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Validate model output against the schema and reject non-conforming results; (2) Design a retry that repairs or re-requests malformed output
- Common misconception addressed: Assuming schema-valid output is also factually correct extraction
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Validating output against the schema | 80 | 5 |
| M03L02 | Handling malformed output and retries | 80 | 5 |
| M03L03 | Evaluating extraction accuracy | 80 | 5 |

## Integrative case

Invoices and emails must be turned into structured records. Define a JSON schema with constraints, prompt the model to extract faithfully without inventing values, validate the output and retry on malformed results, and measure extraction accuracy on a labelled sample.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0583-final-protected | 30 | 30 | yes |
| MST-0583-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Defining the output schema | 10 |
| Extraction prompting | 10 |
| Validation and robustness | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0583-Q0001** (single-answer, Select ONE) A field is sometimes absent from the source document. How should the schema and prompt handle it?

- A. Mark it optional/nullable and instruct the model to return null when absent **(key)**  
  _Rationale:_ Correct: an explicit null contract prevents invented values and stays schema-valid.
- B. Require the field and let the model guess a value  
  _Rationale:_ Requiring a guess invites fabricated data.
- C. Omit the field from the schema entirely  
  _Rationale:_ Omitting it loses the ability to represent the real, sometimes-present value.
- D. Ask the model to leave the JSON malformed when unsure  
  _Rationale:_ Malformed output defeats downstream validation.

**MST-0583-Q0002** (multiple-answer, Select TWO) Which TWO measures most reduce fabricated values in extraction? (Select TWO.) (Select TWO.)

- A. Instruct the model to return null for anything not present in the source **(key)**  
  _Rationale:_ Correct: an explicit null-on-absence rule discourages invention.
- B. Provide few-shot examples that include absent fields returned as null **(key)**  
  _Rationale:_ Correct: examples teach the desired behaviour for missing data.
- C. Tell the model to always produce a value for every field  
  _Rationale:_ Forcing a value for every field causes fabrication.
- D. Raise the temperature to improve creativity  
  _Rationale:_ Higher temperature increases the chance of invented values.

**MST-0583-Q0003** (single-answer, Select ONE) Model output passes JSON-schema validation. What can you conclude?

- A. That it is well-formed and typed correctly, but not that the extracted values are factually correct **(key)**  
  _Rationale:_ Correct: schema validity is structural, not a guarantee of factual accuracy.
- B. That the extraction is definitely accurate  
  _Rationale:_ Validation checks structure, not truth.
- C. That no evaluation against labelled data is needed  
  _Rationale:_ Accuracy still requires evaluation against labels.
- D. That the source document was read in full  
  _Rationale:_ Schema validity does not prove full or faithful reading.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
