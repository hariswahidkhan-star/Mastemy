# AI Art and Generative Creativity

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2433` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal curriculum blueprint (no issuer syllabus). Outcomes are Mastemy internal IDs derived from the course blueprint; tool/technique specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AI Art and Generative Creativity (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how modern generative image and media models work at a conceptual level
2. Write, structure and iterate prompts to steer generative output
3. Combine generative tools with traditional craft in a creative workflow
4. Evaluate and curate generative output against an artistic intent
5. Apply controls such as references, seeds and parameters to guide results
6. Navigate originality, rights, attribution and disclosure responsibly when using AI art

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 How generative models work (25% (design weight), design weight)

- Worked applications: (1) Explain in plain terms why a model 'hallucinates' details; (2) Predict which prompt a given image likely came from
- Common misconception addressed: Believing the model 'understands' meaning the way a person does
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Concepts: training, latent space and sampling | 120 | 7 |
| M01L02 | Capabilities, limits and failure modes | 120 | 7 |

### M02 Prompting and control (25% (design weight), design weight)

- Worked applications: (1) Iterate one prompt through five deliberate revisions; (2) Reproduce a result using a fixed seed and parameters
- Common misconception addressed: Treating a lucky one-off result as a repeatable, controllable outcome
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing and iterating prompts | 120 | 7 |
| M02L02 | References, seeds, parameters and reproducibility | 120 | 7 |

### M03 Creative workflow and curation (25% (design weight), design weight)

- Worked applications: (1) Combine a generated base with hand editing; (2) Curate a 3-image set from 30 generations against a brief
- Common misconception addressed: Accepting the first output instead of curating toward intent
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Blending generative and traditional craft | 120 | 7 |
| M03L02 | Evaluating and curating against intent | 120 | 7 |

### M04 Ethics, rights and originality (25% (design weight), design weight)

- Worked applications: (1) Write an honest AI-involvement disclosure for a piece; (2) Check whether reference inputs may be used and credited
- Common misconception addressed: Assuming any generated image is automatically free of rights or attribution obligations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Originality, authorship and attribution | 120 | 7 |
| M04L02 | Training-data rights, consent and disclosure | 120 | 7 |

## Integrative case

A learner develops a small series on one theme using generative tools: drafting and iterating prompts, using reference and parameter controls, curating the strongest results, and documenting tools used, rights of any inputs, and an honest disclosure of AI involvement.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); design assumption.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2433-final-protected | 40 | 40 | yes |
| MST-2433-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How generative models work | 10 |
| Prompting and control | 10 |
| Creative workflow and curation | 10 |
| Ethics, rights and originality | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2433-Q0001** (single-answer, Select ONE) At a conceptual level, a diffusion image model generates an image by:

- A. Starting from noise and iteratively denoising it toward output guided by the prompt **(key)**  
  _Rationale:_ Correct: diffusion models iteratively denoise from random noise toward a conditioned result.
- B. Copying and pasting pieces of specific training images together  
  _Rationale:_ It does not stitch retrieved training images together.
- C. Looking up the exact image in a database  
  _Rationale:_ There is no retrieval of a stored exact image.
- D. Rendering a hand-built 3D scene  
  _Rationale:_ That describes 3D rendering, not diffusion.

**MST-2433-Q0002** (multiple-answer, Select TWO) Which TWO practices support responsible, honest use of AI-generated art? (Select TWO.)

- A. Disclosing meaningful AI involvement when it matters to the audience or context **(key)**  
  _Rationale:_ Correct: honest disclosure respects audiences and many platform/contest rules.
- B. Checking the rights and permissions of any reference inputs you supply **(key)**  
  _Rationale:_ Correct: inputs you feed in may carry rights and consent obligations.
- C. Presenting generated work as a hand-made photograph to win a photo contest  
  _Rationale:_ That is misrepresentation.
- D. Assuming all outputs are automatically free of any attribution duty  
  _Rationale:_ Rights and attribution duties can still apply.

**MST-2433-Q0003** (single-answer, Select ONE) Fixing the random 'seed' together with the same prompt and parameters is useful because it:

- A. Makes a generation reproducible, so you can make controlled variations **(key)**  
  _Rationale:_ Correct: a fixed seed and settings reproduce or systematically vary a result.
- B. Guarantees the image is copyright-free  
  _Rationale:_ Seeds say nothing about rights.
- C. Improves resolution automatically  
  _Rationale:_ Seed does not set resolution.
- D. Removes the need to curate output  
  _Rationale:_ Curation is still required.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
