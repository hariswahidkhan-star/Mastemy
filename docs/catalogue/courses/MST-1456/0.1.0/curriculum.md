# Vertex AI Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1456` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google (Google Cloud) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-VERTEX (https://cloud.google.com/vertex-ai/docs; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Vertex AI Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the Vertex AI platform and its main components
2. Use foundation models and notebooks for common AI tasks
3. Train or tune and evaluate a simple model
4. Deploy a model to an endpoint and call it
5. Apply responsible-AI and cost practices on Vertex AI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Vertex AI overview (MASTEMY-DESIGN 25%)

- Worked applications: (1) Open a managed notebook and load a dataset; (2) Map an AI task to the right Vertex component
- Common misconception addressed: Thinking Vertex AI is a single model rather than a platform
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Platform components and workflow | 72 | 5 |
| M01L02 | Notebooks and the console | 72 | 5 |

### M02 Models and training (MASTEMY-DESIGN 25%)

- Worked applications: (1) Get a baseline from a foundation model; (2) Tune a small model on labelled data
- Common misconception addressed: Training a custom model before checking a foundation-model baseline
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Foundation models and baselines | 72 | 5 |
| M02L02 | Training or tuning a simple model | 72 | 5 |

### M03 Evaluation and deployment (MASTEMY-DESIGN 25%)

- Worked applications: (1) Evaluate a model against a held-out set; (2) Deploy a model to an endpoint and send a prediction
- Common misconception addressed: Reporting training accuracy as if it were test accuracy
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Evaluating model quality | 72 | 5 |
| M03L02 | Endpoints and predictions | 72 | 5 |

### M04 Responsible AI and cost (MASTEMY-DESIGN 25%)

- Worked applications: (1) Review a model for obvious bias and safety risks; (2) Estimate serving cost for an endpoint
- Common misconception addressed: Leaving an endpoint running idle and ignoring its cost
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Responsible-AI considerations | 72 | 5 |
| M04L02 | Monitoring and cost awareness | 72 | 5 |

## Integrative case

A data team prototypes a product-category classifier on Vertex AI: explore data in a notebook, try a foundation model baseline, tune a simple custom model, evaluate it, deploy it to an endpoint, and review responsible-AI and cost considerations before any launch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1456-final-protected | 40 | 50 | yes |
| MST-1456-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Vertex AI overview | 10 |
| Models and training | 10 |
| Evaluation and deployment | 10 |
| Responsible AI and cost | 10 |

Minimum reviewed item bank: 260 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1456-Q0001** (single-answer, Select ONE) Before building a custom classifier, a team wants a quick quality reference with minimal effort. What is the sensible first step on Vertex AI?

- A. Establish a baseline using a foundation model **(key)**  
  _Rationale:_ Correct: a foundation-model baseline is fast and sets a reference to beat.
- B. Train a large custom model immediately  
  _Rationale:_ Custom training is costly before a baseline exists.
- C. Deploy to production without evaluation  
  _Rationale:_ Deploying first skips the quality check.
- D. Delete the labelled data to save storage  
  _Rationale:_ Labelled data is needed for evaluation and tuning.

**MST-1456-Q0002** (multiple-answer, Select TWO) Which TWO practices support honest model evaluation? (Select TWO.)

- A. Measure quality on a held-out test set the model did not train on **(key)**  
  _Rationale:_ Correct: held-out data gives an unbiased estimate.
- B. Report the metric relevant to the task, not just overall accuracy **(key)**  
  _Rationale:_ Correct: task-appropriate metrics avoid misleading conclusions.
- C. Evaluate only on the training data  
  _Rationale:_ Training-data metrics overstate real performance.
- D. Pick the metric after seeing which one looks best  
  _Rationale:_ Choosing metrics post hoc biases the result.

**MST-1456-Q0003** (single-answer, Select ONE) A deployed Vertex AI endpoint serves few requests but keeps incurring cost. What is the most likely cause to check first?

- A. The endpoint keeps provisioned resources running while idle **(key)**  
  _Rationale:_ Correct: endpoints can hold resources and bill even when idle.
- B. The notebook was closed  
  _Rationale:_ A closed notebook does not drive endpoint cost.
- C. The training data is too small  
  _Rationale:_ Dataset size is unrelated to idle serving cost.
- D. The model is too accurate  
  _Rationale:_ Accuracy does not cause idle cost.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
