# Experiment Tracking and Model Registry

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1350` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Experiment tracking fundamentals
2. Tracking tools and integration
3. Model registry and lifecycle
4. Governance, lineage and handoff

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Experiment tracking fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Log a training run with params and metrics; (2) Compare two runs to pick a winner
- Common misconception addressed: Believing a saved metric number alone makes a run reproducible
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Runs, parameters, metrics and artifacts | 120 | 8 |
| M01L02 | Reproducibility and run comparison | 120 | 8 |

### M02 Tracking tools and integration (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add tracking to an existing training script; (2) Choose a tracking backend for a team
- Common misconception addressed: Assuming autologging captures data and code versions by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | MLflow, Weights & Biases and alternatives | 120 | 8 |
| M02L02 | Instrumenting training code to log automatically | 120 | 8 |

### M03 Model registry and lifecycle (MASTEMY-DESIGN 25%)

- Worked applications: (1) Register a model and promote it to staging; (2) Design a promotion gate to production
- Common misconception addressed: Confusing a logged model artifact with a governed registry entry
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Registering models and versions | 120 | 8 |
| M03L02 | Stages, aliases and promotion workflows | 120 | 8 |

### M04 Governance, lineage and handoff (MASTEMY-DESIGN 25%)

- Worked applications: (1) Trace a production model back to its run; (2) Plan a rollback to a prior model version
- Common misconception addressed: Thinking the newest model version is automatically the best to serve
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lineage from data to deployed model | 120 | 8 |
| M04L02 | Approvals, audit trails and rollback | 120 | 8 |

## Integrative case

A fraud team cannot explain which data and code produced the model now in production, and a bad version was promoted by accident. Design tracking, a registry with promotion gates, lineage and rollback so every production model is traceable and reversible.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1350-final-protected | 20 | 20 | yes |
| MST-1350-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Experiment tracking fundamentals | 5 |
| Tracking tools and integration | 5 |
| Model registry and lifecycle | 5 |
| Governance, lineage and handoff | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1350-Q0001** (single-answer, Select ONE) What is the minimum you should log to make a training run reproducible?

- A. Parameters, code/data versions, environment and the resulting metrics **(key)**  
  _Rationale:_ Correct: reproducibility needs the full context, not just the score.
- B. Only the final accuracy number  
  _Rationale:_ A number alone cannot reproduce the run.
- C. Only the trained model file  
  _Rationale:_ The artifact without params/versions cannot be reproduced.
- D. Only the dataset name  
  _Rationale:_ Insufficient; versions and params are also required.

**MST-1350-Q0002** (multiple-answer, Select TWO) A model has been logged dozens of times. Which TWO things does a model registry add beyond a pile of logged artifacts? (Select TWO.)

- A. Named stages/aliases such as staging and production **(key)**  
  _Rationale:_ Correct: a registry governs which version is in which stage.
- B. An auditable promotion and approval workflow **(key)**  
  _Rationale:_ Correct: registries record who promoted what and when.
- C. Faster GPU training of the model  
  _Rationale:_ Registries do not change training speed.
- D. Automatic relabelling of the training data  
  _Rationale:_ Registries do not alter datasets.

**MST-1350-Q0003** (single-answer, Select ONE) A new model version scores slightly higher offline. Why is promoting it to production automatically risky?

- A. Offline gains may not hold online and there is no approval or rollback plan **(key)**  
  _Rationale:_ Correct: promotion should pass a gate with online checks and a rollback path.
- B. Higher offline scores always transfer to production  
  _Rationale:_ They often do not, due to distribution shift and metric mismatch.
- C. Registries forbid having more than one version  
  _Rationale:_ Registries are designed to hold many versions.
- D. The older version cannot be kept  
  _Rationale:_ Keeping prior versions enables rollback.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
