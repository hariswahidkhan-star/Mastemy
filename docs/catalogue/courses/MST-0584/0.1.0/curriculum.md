# Prompt Engineering for Multimodal Inputs and Outputs

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0584` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Prompt Engineering for Multimodal Inputs and Outputs (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Prompt models over image and document inputs grounded in the source
2. Design mixed-modality tasks that combine text and visuals
3. Produce structured outputs from visual and document inputs
4. Verify multimodal answers and handle unreadable media

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Working with image and document inputs (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Prompt the model to answer only from the provided image; (2) Extract a table from a document into structured rows
- Common misconception addressed: Letting the model answer from general knowledge instead of the provided media
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Prompting over images | 80 | 5 |
| M01L02 | Prompting over documents and tables | 80 | 5 |
| M01L03 | Grounding answers in the input | 80 | 5 |

### M02 Mixed-modality tasks (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Combine a text instruction with an image to produce a structured record; (2) Handle a low-quality scan where OCR is uncertain
- Common misconception addressed: Assuming layout and reading order are always recovered correctly from a scan
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Combining text and image context | 80 | 5 |
| M02L02 | Generating structured output from visuals | 80 | 5 |
| M02L03 | Handling OCR and layout | 80 | 5 |

### M03 Reliability across modalities (DESIGN ASSUMPTION, equal weight; no official weighting)

- Worked applications: (1) Add a check that the answer is supported by the media; (2) Return an explicit 'cannot determine' when the media is unreadable
- Common misconception addressed: Treating a confident answer about a blurry image as reliable
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Verifying multimodal answers | 80 | 5 |
| M03L02 | Handling unreadable or ambiguous media | 80 | 5 |
| M03L03 | Evaluating multimodal quality | 80 | 5 |

## Integrative case

A workflow answers questions about scanned forms and charts. Design prompts that ground answers in the provided media, extract structured output from the visuals, verify the answers, and handle cases where the media is unreadable or ambiguous.

## Cumulative assessment

Form length basis: Mastemy knowledge check (no external exam defines length).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0584-final-protected | 30 | 30 | yes |
| MST-0584-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Working with image and document inputs | 10 |
| Mixed-modality tasks | 10 |
| Reliability across modalities | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0584-Q0001** (single-answer, Select ONE) You want answers about a scanned form to stay faithful to the document. What should the prompt require?

- A. That answers come only from the provided media and say so when the information is not present **(key)**  
  _Rationale:_ Correct: grounding to the source prevents answers drawn from general knowledge.
- B. That the model fill any gaps with its best general guess  
  _Rationale:_ Guessing undermines grounding and invites errors.
- C. That the model ignore the document and use its training data  
  _Rationale:_ Ignoring the source defeats the task.
- D. That the answer always be a single word  
  _Rationale:_ Answer length is unrelated to grounding faithfulness.

**MST-0584-Q0002** (multiple-answer, Select TWO) A scan is low quality and OCR is uncertain. Which TWO responses are appropriate? (Select TWO.) (Select TWO.)

- A. Return an explicit 'cannot determine' for fields that are unreadable **(key)**  
  _Rationale:_ Correct: flagging unreadable fields is safer than guessing.
- B. Flag low confidence so a human can review the uncertain fields **(key)**  
  _Rationale:_ Correct: surfacing uncertainty routes hard cases to review.
- C. Invent the most likely value and present it as certain  
  _Rationale:_ Presenting guesses as certain is unsafe.
- D. Silently drop the document from the results  
  _Rationale:_ Silently dropping data hides the problem.

**MST-0584-Q0003** (single-answer, Select ONE) The model gives a confident answer about a blurry chart. What is the correct stance?

- A. Verify the answer against the media; confidence on degraded input is not reliable **(key)**  
  _Rationale:_ Correct: confidence does not compensate for poor-quality input.
- B. Accept it because the model sounded sure  
  _Rationale:_ Confidence is not evidence on degraded media.
- C. Assume blurry images are always read correctly  
  _Rationale:_ Degraded media raises error risk.
- D. Skip verification for image tasks  
  _Rationale:_ Multimodal answers still need verification.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
