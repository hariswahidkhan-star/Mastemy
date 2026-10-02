# Generative AI for Images

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1347` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how diffusion-based image generation works at a high level
2. Describe prompting and conditioning for image models
3. Apply techniques such as inpainting and image-to-image
4. Evaluate generated image quality and relevance
5. Recognise copyright, bias and safety concerns in image generation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 How image generation works (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain denoising diffusion in plain terms; (2) Distinguish generation from image search
- Common misconception addressed: Thinking the model stores and retrieves existing images
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Diffusion models in plain terms | 72 | 8 |
| M01L02 | From noise to image | 72 | 8 |

### M02 Prompting and conditioning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a prompt with clear subject and style; (2) Use negative prompts and guidance
- Common misconception addressed: Assuming longer prompts always give better images
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompt structure for images | 72 | 8 |
| M02L02 | Conditioning, seeds and guidance | 72 | 8 |

### M03 Editing techniques (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use inpainting to fix part of an image; (2) Apply image-to-image for a style change
- Common misconception addressed: Treating inpainting and full regeneration as identical
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Inpainting and outpainting | 72 | 8 |
| M03L02 | Image-to-image and control inputs | 72 | 8 |

### M04 Evaluating outputs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define quality criteria for a brief; (2) Check an image against the prompt's requirements
- Common misconception addressed: Judging images only by first impression
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Quality and relevance criteria | 72 | 8 |
| M04L02 | Reviewing against the brief | 72 | 8 |

### M05 Rights, bias and safety (MASTEMY-DESIGN 20%)

- Worked applications: (1) Flag a likely copyright or likeness issue; (2) Spot stereotyped output and plan mitigation
- Common misconception addressed: Assuming any generated image is free to use
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Copyright, likeness and consent | 72 | 8 |
| M05L02 | Bias and safety in generated images | 72 | 8 |

## Integrative case

A marketing team wants to generate images from briefs. Choose a generation approach, design prompts and conditioning for brand consistency, define how quality and appropriateness are reviewed, and document the copyright, consent and safety constraints the team must respect.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1347-final-protected | 25 | 25 | yes |
| MST-1347-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How image generation works | 5 |
| Prompting and conditioning | 5 |
| Editing techniques | 5 |
| Evaluating outputs | 5 |
| Rights, bias and safety | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1347-Q0001** (single-answer, Select ONE) At a high level, how does a diffusion model generate an image?

- A. It starts from noise and iteratively denoises it toward an image matching the prompt **(key)**  
  _Rationale:_ Correct: diffusion models learn to reverse a noising process, guided by the prompt.
- B. It searches a database and returns the closest stored photo  
  _Rationale:_ It generates rather than retrieving existing images.
- C. It renders a 3D model from CAD files  
  _Rationale:_ That is unrelated to diffusion image generation.
- D. It copies pixels directly from the training set  
  _Rationale:_ It synthesises new images, not pixel copies.

**MST-1347-Q0002** (multiple-answer, Select TWO) Which TWO concerns should a team document before using generated images commercially? (Select TWO.)

- A. Copyright and likeness rights of depicted content **(key)**  
  _Rationale:_ Correct: generated content can raise copyright and likeness issues.
- B. Potential biased or stereotyped depictions **(key)**  
  _Rationale:_ Correct: image models can reproduce harmful stereotypes.
- C. The exact random seed is legally required on every asset  
  _Rationale:_ Seeds are a technical detail, not a legal requirement.
- D. Images need no review if they look good  
  _Rationale:_ Appearance does not clear rights or bias concerns.

**MST-1347-Q0003** (single-answer, Select ONE) A designer wants to change only the background of an otherwise good image. Which technique fits best?

- A. Inpainting the selected region while keeping the rest **(key)**  
  _Rationale:_ Correct: inpainting edits a masked region and preserves the rest.
- B. Regenerating the whole image from scratch  
  _Rationale:_ Full regeneration risks losing the good parts.
- C. Quantising the model  
  _Rationale:_ Quantisation is a compression step, not an editing tool.
- D. Increasing the context window  
  _Rationale:_ Context window is irrelevant to image editing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
