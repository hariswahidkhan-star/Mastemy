# OpenAI Image API: Creative Production Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0504` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — OpenAI Image API: Creative Production Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Generate and edit images with the Image API for production use
2. Craft prompts and controls for consistent visual output
3. Build repeatable image production and variation workflows
4. Manage quality, rights, safety and cost in image production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Generating, editing and producing images through the Image API is taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded production or peer review.

## Modules

### M01 Image API foundations (17%)

- Worked applications: (1) Choose generation versus edit for a task; (2) Pick a size and format for a web banner
- Common misconception addressed: Expecting identical output from the same prompt every time
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Generation, edits and variations | 120 | 6 |
| M01L02 | Sizes, formats and parameters | 120 | 6 |

### M02 Prompting for images (17%)

- Worked applications: (1) Write a prompt for a product hero image; (2) Revise a prompt to remove an unwanted element
- Common misconception addressed: Using vague prompts and hoping the model guesses the brand style
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Describing subject, style and composition | 120 | 6 |
| M02L02 | Constraints and fixing unwanted elements | 120 | 6 |

### M03 Consistency and control (17%)

- Worked applications: (1) Use an edit to change only the background; (2) Plan a series with a consistent style
- Common misconception addressed: Regenerating from scratch when only one region should change
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reference images and edits | 120 | 6 |
| M03L02 | A consistent look across a set | 120 | 6 |

### M04 Production workflows (17%)

- Worked applications: (1) Plan a batch of ten variations and a selection step; (2) Automate naming and storage of outputs
- Common misconception addressed: Treating every raw generation as final without a review gate
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Batch generation and variations | 120 | 6 |
| M04L02 | Review and selection steps | 120 | 6 |

### M05 Quality and iteration (17%)

- Worked applications: (1) Build a checklist to accept or reject an image; (2) Turn reviewer feedback into a prompt revision
- Common misconception addressed: Judging quality by personal taste alone with no shared criteria
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Judging image quality | 120 | 6 |
| M05L02 | Iterating on feedback | 120 | 6 |

### M06 Rights, safety and cost (17%)

- Worked applications: (1) Decide whether a generated image is safe to publish; (2) Estimate the cost of a production batch
- Common misconception addressed: Assuming generated images carry no rights, safety or cost considerations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Content rights and safety | 120 | 6 |
| M06L02 | Cost and throughput planning | 120 | 6 |

## Integrative case

A marketing team builds a campaign image pipeline: it generates product hero images and variations with a consistent style, edits only the backgrounds for localisation, runs a review gate with shared accept and reject criteria, and plans rights, safety and cost for a large production batch.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0504-final-protected | 108 | 108 | yes |
| MST-0504-final-alternate | 108 | 108 | no (optional) |

| Domain | Items per form |
|---|---|
| Image API foundations | 18 |
| Prompting for images | 18 |
| Consistency and control | 18 |
| Production workflows | 18 |
| Quality and iteration | 18 |
| Rights, safety and cost | 18 |

Minimum reviewed item bank: 612 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0504-Q0001** (single-answer, Select ONE) When only the background of an existing image needs to change, what is the preferred approach?

- A. Use an edit so the rest of the image is preserved **(key)**  
  _Rationale:_ Correct: an edit changes only the targeted region.
- B. Regenerate the whole image from scratch each time  
  _Rationale:_ Regenerating risks changing the parts you wanted to keep.
- C. Increase the resolution and nothing else  
  _Rationale:_ Resolution does not change the background.
- D. Remove the prompt entirely  
  _Rationale:_ A prompt is still needed to direct the edit.

**MST-0504-Q0002** (single-answer, Select ONE) Why should an image production workflow include a review and selection step?

- A. Generations vary, so a review gate ensures only acceptable images ship **(key)**  
  _Rationale:_ Correct: a review gate filters variable output against criteria.
- B. It makes every generation identical  
  _Rationale:_ A review step does not remove natural variation.
- C. It removes all content-rights considerations  
  _Rationale:_ Rights considerations remain regardless of review.
- D. It eliminates generation cost  
  _Rationale:_ Review does not eliminate cost.

**MST-0504-Q0003** (multiple-answer, Select TWO) Which TWO factors must be planned before running a large image-production batch? (Select TWO)

- A. Content rights and safety of the images **(key)**  
  _Rationale:_ Correct: rights and safety govern whether images can be used.
- B. Cost and throughput of the batch **(key)**  
  _Rationale:_ Correct: large batches have real cost and throughput limits.
- C. A guarantee that output is identical to the prompt every time  
  _Rationale:_ Output varies and cannot be guaranteed identical.
- D. Removing any shared accept or reject criteria  
  _Rationale:_ Shared criteria are needed, not removed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
