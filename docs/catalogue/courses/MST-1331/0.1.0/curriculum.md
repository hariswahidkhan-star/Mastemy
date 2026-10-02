# Diffusion Models

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1331` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the diffusion process
2. Describe diffusion training
3. Explain diffusion sampling
4. Describe conditioning and guidance
5. Recognise applications and risks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Core idea (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain the forward diffusion step; (2) Explain what the reverse model learns
- Common misconception addressed: Thinking diffusion adds noise only once
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Forward noising process | 120 | 8 |
| M01L02 | Reverse denoising process | 120 | 8 |

### M02 Training (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe the denoising training target; (2) Explain the role of the noise schedule
- Common misconception addressed: Assuming diffusion is trained like a GAN
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Denoising objective | 120 | 8 |
| M02L02 | Noise schedules | 120 | 8 |

### M03 Sampling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why sampling is iterative; (2) Trade steps for speed vs quality
- Common misconception addressed: Believing one forward pass generates a sample
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Iterative sampling steps | 120 | 8 |
| M03L02 | Fast samplers and step/quality trade-off | 120 | 8 |

### M04 Conditioning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain guidance strength trade-offs; (2) Explain why latent diffusion is efficient
- Common misconception addressed: Thinking stronger guidance always improves quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Text and class conditioning | 120 | 8 |
| M04L02 | Classifier-free guidance and latent diffusion | 120 | 8 |

### M05 Applications and risks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match diffusion to a generation task; (2) Flag a misuse or provenance concern
- Common misconception addressed: Assuming generated content needs no provenance safeguards
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Image, audio and beyond | 120 | 8 |
| M05L02 | Compute cost, misuse and provenance | 120 | 8 |

## Integrative case

A creative tool team adopts a diffusion model for image generation. Explain training and sampling trade-offs, tune guidance, choose latent diffusion for efficiency, and address misuse and provenance.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1331-final-protected | 25 | 25 | yes |
| MST-1331-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Core idea | 5 |
| Training | 5 |
| Sampling | 5 |
| Conditioning | 5 |
| Applications and risks | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1331-Q0001** (single-answer, Select ONE) What does the reverse process of a diffusion model learn to do?

- A. Gradually remove noise to recover data from a noisy sample **(key)**  
  _Rationale:_ Correct: the model learns to denoise step by step.
- B. Add more noise to clean data  
  _Rationale:_ That is the forward process.
- C. Classify images into categories  
  _Rationale:_ Diffusion is generative, not a classifier.
- D. Compress files losslessly  
  _Rationale:_ It generates samples, not compression.

**MST-1331-Q0002** (multiple-answer, Select TWO) Which TWO statements about diffusion sampling are correct? (Select TWO.)

- A. Sampling is typically iterative over many denoising steps **(key)**  
  _Rationale:_ Correct: samples are refined across steps.
- B. Fewer steps can speed sampling but may reduce quality **(key)**  
  _Rationale:_ Correct: there is a step/quality trade-off.
- C. A single forward pass always produces the final image  
  _Rationale:_ Standard sampling is iterative.
- D. Sampling requires labelled data at run time  
  _Rationale:_ No labels are needed to sample.

**MST-1331-Q0003** (single-answer, Select ONE) Why is latent diffusion more efficient than pixel-space diffusion?

- A. It runs the diffusion process in a compressed latent space, reducing compute **(key)**  
  _Rationale:_ Correct: operating on latents lowers dimensionality and cost.
- B. It skips training entirely  
  _Rationale:_ It still requires training.
- C. It needs no noise schedule  
  _Rationale:_ It still uses a noise schedule.
- D. It generates without any model  
  _Rationale:_ A model is still required.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
