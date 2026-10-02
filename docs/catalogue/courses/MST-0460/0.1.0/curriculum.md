# MLOps: From Experiment to Production

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0460` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-MF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. MLOps foundations
2. Data and experiment management
3. Model packaging and registry
4. Deployment and serving
5. Monitoring and reliability
6. Governance and collaboration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 MLOps foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map an ML lifecycle for a team; (2) Assess MLOps maturity of a workflow
- Common misconception addressed: Treating a one-off notebook as a production system
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From notebooks to production | 120 | 8 |
| M01L02 | Lifecycle, roles and maturity | 120 | 8 |

### M02 Data and experiment management (MASTEMY-DESIGN 20%)

- Worked applications: (1) Version a dataset and a pipeline; (2) Track experiments for reproducibility
- Common misconception addressed: Reporting a result that cannot be reproduced
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data versioning and pipelines | 120 | 8 |
| M02L02 | Experiment tracking and reproducibility | 120 | 8 |

### M03 Model packaging and registry (MASTEMY-DESIGN 20%)

- Worked applications: (1) Containerize a model for serving; (2) Promote a model through a registry
- Common misconception addressed: Deploying a model with no recorded version
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Packaging and containerization | 120 | 8 |
| M03L02 | Model registry and versioning | 120 | 8 |

### M04 Deployment and serving (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose batch vs online serving; (2) Build a CI/CD pipeline for a model
- Common misconception addressed: Shipping a model change with no automated tests
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Batch, online and streaming serving | 120 | 8 |
| M04L02 | CI/CD for models | 120 | 8 |

### M05 Monitoring and reliability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set a drift-detection threshold; (2) Define a retraining trigger and rollback
- Common misconception addressed: Monitoring only system uptime, not model quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Performance, data and concept drift | 120 | 8 |
| M05L02 | Alerting, rollback and retraining triggers | 120 | 8 |

### M06 Governance and collaboration (MASTEMY-DESIGN 20%)

- Worked applications: (1) Record lineage for an audit; (2) Design a handoff between DS and ops
- Common misconception addressed: Leaving models undocumented for the operations team
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Lineage, audit and documentation | 120 | 8 |
| M06L02 | Team workflows and handoffs | 120 | 8 |

## Integrative case

A data-science team keeps models in notebooks and deploys by hand. Design an end-to-end MLOps path: version data and experiments, package and register models, automate deployment with CI/CD, and monitor for drift with rollback and retraining triggers.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0460-final-protected | 30 | 30 | yes |
| MST-0460-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| MLOps foundations | 5 |
| Data and experiment management | 5 |
| Model packaging and registry | 5 |
| Deployment and serving | 5 |
| Monitoring and reliability | 5 |
| Governance and collaboration | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0460-Q0001** (single-answer, Select ONE) What primarily distinguishes a production ML system from a one-off notebook?

- A. It is reproducible, versioned, deployable and monitored over time **(key)**  
  _Rationale:_ Correct: production systems add reproducibility, versioning and monitoring.
- B. It uses a larger font in the code  
  _Rationale:_ Presentation is irrelevant.
- C. It never needs evaluation  
  _Rationale:_ Production systems need ongoing evaluation.
- D. It must avoid version control  
  _Rationale:_ Version control is essential in production.

**MST-0460-Q0002** (multiple-answer, Select TWO) Which TWO signals should production model monitoring track beyond uptime? (Select TWO.)

- A. Input data drift versus the training distribution **(key)**  
  _Rationale:_ Correct: data drift warns that inputs have changed.
- B. Model prediction quality or a proxy for it over time **(key)**  
  _Rationale:_ Correct: degrading quality is a key signal.
- C. The developer's typing speed  
  _Rationale:_ Irrelevant to model reliability.
- D. The number of comments in the code  
  _Rationale:_ Not a monitoring signal.

**MST-0460-Q0003** (single-answer, Select ONE) Why is a model registry with versioning valuable in an MLOps pipeline?

- A. It tracks which model version is deployed and enables controlled rollback **(key)**  
  _Rationale:_ Correct: a registry records versions and supports safe promotion/rollback.
- B. It trains the model automatically  
  _Rationale:_ A registry stores and tracks models; it does not train them.
- C. It removes the need for monitoring  
  _Rationale:_ Monitoring is still required.
- D. It guarantees zero drift  
  _Rationale:_ Drift can still occur; the registry does not prevent it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
