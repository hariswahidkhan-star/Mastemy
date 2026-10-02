# Generative Adversarial Networks

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1332` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain the adversarial framework
2. Diagnose GAN training dynamics
3. Apply stabilisation techniques
4. Describe conditional and variant GANs
5. Evaluate GANs and recognise risks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The adversarial game (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe each network's role; (2) Explain the adversarial objective
- Common misconception addressed: Thinking the generator sees real data directly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Generator and discriminator | 120 | 8 |
| M01L02 | The minimax objective | 120 | 8 |

### M02 Training dynamics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Recognise mode collapse; (2) Explain a cause of training instability
- Common misconception addressed: Assuming GANs converge like ordinary supervised models
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Why GANs are unstable | 120 | 8 |
| M02L02 | Mode collapse and non-convergence | 120 | 8 |

### M03 Stabilising GANs (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain how a Wasserstein loss helps; (2) Apply a stabilisation trick
- Common misconception addressed: Believing a single trick fixes all instability
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Loss variants (WGAN idea) | 120 | 8 |
| M03L02 | Architectural and training tricks | 120 | 8 |

### M04 Conditional and variants (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a conditional generation setup; (2) Match a GAN variant to a task
- Common misconception addressed: Assuming any GAN handles paired translation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Conditional GANs | 120 | 8 |
| M04L02 | Image-to-image and style variants | 120 | 8 |

### M05 Evaluation and risks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret an FID comparison; (2) Flag a misuse risk of generated media
- Common misconception addressed: Judging GAN quality by discriminator loss alone
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | FID and sample quality metrics | 120 | 8 |
| M05L02 | Deepfakes, misuse and provenance | 120 | 8 |

## Integrative case

A team trains a GAN for synthetic data generation and hits mode collapse. Diagnose the dynamics, apply stabilisation, choose a conditional variant, evaluate with FID, and address misuse risks.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1332-final-protected | 25 | 25 | yes |
| MST-1332-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The adversarial game | 5 |
| Training dynamics | 5 |
| Stabilising GANs | 5 |
| Conditional and variants | 5 |
| Evaluation and risks | 5 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1332-Q0001** (single-answer, Select ONE) What is mode collapse in a GAN?

- A. The generator produces limited, repetitive outputs that ignore data diversity **(key)**  
  _Rationale:_ Correct: it collapses to a few modes.
- B. The discriminator stops reading data  
  _Rationale:_ That is not mode collapse.
- C. The learning rate becomes zero  
  _Rationale:_ That is unrelated.
- D. The dataset is deleted  
  _Rationale:_ No data is deleted.

**MST-1332-Q0002** (multiple-answer, Select TWO) Which TWO describe a standard GAN? (Select TWO.)

- A. A generator creates samples to fool a discriminator **(key)**  
  _Rationale:_ Correct: that is the generator's role.
- B. A discriminator tries to tell real from generated data **(key)**  
  _Rationale:_ Correct: that is the discriminator's role.
- C. A single network trained with labels only  
  _Rationale:_ GANs use two networks adversarially.
- D. A clustering algorithm with no training  
  _Rationale:_ GANs are trained generative models.

**MST-1332-Q0003** (single-answer, Select ONE) Why is FID preferred over discriminator loss for judging sample quality?

- A. FID compares generated and real feature distributions, unlike the moving discriminator loss **(key)**  
  _Rationale:_ Correct: discriminator loss is a shifting adversarial signal, not a quality measure.
- B. Discriminator loss cannot be computed  
  _Rationale:_ It can be computed; it just is not a quality metric.
- C. FID requires no samples  
  _Rationale:_ FID needs generated samples.
- D. They always agree exactly  
  _Rationale:_ They measure different things.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
