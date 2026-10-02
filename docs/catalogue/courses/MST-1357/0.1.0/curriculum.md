# AI System Design Interviews

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1357` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Framework and requirements
2. Data and features
3. Modelling and evaluation
4. Serving, scale and iteration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Framework and requirements (MASTEMY-DESIGN 25%)

- Worked applications: (1) Scope an ambiguous ML design prompt; (2) List SLAs and constraints up front
- Common misconception addressed: Jumping to model choice before clarifying requirements
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | A repeatable ML system design framework | 120 | 8 |
| M01L02 | Clarifying functional and non-functional needs | 120 | 8 |

### M02 Data and features (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design a labelling strategy; (2) Avoid leakage in a proposed feature
- Common misconception addressed: Assuming clean, labelled data is freely available
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data sources, labelling and pipelines | 120 | 8 |
| M02L02 | Feature design and leakage avoidance | 120 | 8 |

### M03 Modelling and evaluation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Pick a baseline then a model; (2) Define online metrics and guardrails
- Common misconception addressed: Picking a complex model with no simple baseline to beat
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Choosing models and baselines | 120 | 8 |
| M03L02 | Offline and online metrics | 120 | 8 |

### M04 Serving, scale and iteration (MASTEMY-DESIGN 25%)

- Worked applications: (1) Sketch a serving architecture at scale; (2) Plan an A/B test and retraining loop
- Common misconception addressed: Designing for peak scale while ignoring monitoring and iteration
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Serving, latency and scale | 120 | 8 |
| M04L02 | Monitoring, retraining and A/B tests | 120 | 8 |

## Integrative case

In a 45-minute interview you must design a 'recommend products on the home page' system. Clarify requirements and SLAs, propose data/labelling, a baseline and model, offline/online metrics, a serving architecture at scale, and a monitoring and A/B iteration loop.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1357-final-protected | 20 | 20 | yes |
| MST-1357-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Framework and requirements | 5 |
| Data and features | 5 |
| Modelling and evaluation | 5 |
| Serving, scale and iteration | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1357-Q0001** (single-answer, Select ONE) What should you do first when given an open-ended ML design prompt?

- A. Clarify functional and non-functional requirements, scale and success metrics **(key)**  
  _Rationale:_ Correct: scoping requirements frames every later decision.
- B. Immediately name a deep-learning architecture  
  _Rationale:_ Premature; requirements drive the choice.
- C. Start writing production code  
  _Rationale:_ Design interviews are about reasoning, not coding a system.
- D. Pick the largest possible model  
  _Rationale:_ Size is not a goal; fit to requirements is.

**MST-1357-Q0002** (multiple-answer, Select TWO) Which TWO are good reasons to define a simple baseline before a complex model? (Select TWO.)

- A. It sets a bar the complex model must beat to justify its cost **(key)**  
  _Rationale:_ Correct: baselines quantify the value of added complexity.
- B. It can ship quickly and reveal data/plumbing issues early **(key)**  
  _Rationale:_ Correct: a baseline surfaces pipeline and data problems cheaply.
- C. It guarantees the complex model is unnecessary  
  _Rationale:_ It informs, but does not guarantee, that outcome.
- D. It removes the need for any evaluation metrics  
  _Rationale:_ Metrics are still required to compare.

**MST-1357-Q0003** (single-answer, Select ONE) Why discuss monitoring and A/B testing in a design interview even if asked only to 'build a recommender'?

- A. Production ML must be measured and iterated; omitting it signals an incomplete design **(key)**  
  _Rationale:_ Correct: a strong design covers the full lifecycle, not just training.
- B. Monitoring is irrelevant to recommenders  
  _Rationale:_ It is essential for drift and quality.
- C. A/B testing is only for front-end colours  
  _Rationale:_ A/B testing validates model/product changes.
- D. Interviewers never ask about iteration  
  _Rationale:_ Lifecycle thinking is commonly assessed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
