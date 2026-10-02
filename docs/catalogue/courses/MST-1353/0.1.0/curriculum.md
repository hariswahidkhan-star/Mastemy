# CI/CD for Machine Learning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1353` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. CI/CD foundations for ML
2. Automated testing for ML
3. Continuous training and delivery
4. Release safety and rollback

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 CI/CD foundations for ML (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map the stages of an ML CI/CD pipeline; (2) Identify what to version beyond code
- Common misconception addressed: Treating an ML system as code-only with no data or model versioning
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How ML CI/CD differs from software CI/CD | 120 | 8 |
| M01L02 | Pipelines for data, model and code | 120 | 8 |

### M02 Automated testing for ML (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write a data-schema validation test; (2) Set a model quality gate for a merge
- Common misconception addressed: Relying only on unit tests and skipping data and model checks
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data validation and schema tests | 120 | 8 |
| M02L02 | Model quality gates and behavioural tests | 120 | 8 |

### M03 Continuous training and delivery (MASTEMY-DESIGN 25%)

- Worked applications: (1) Trigger retraining on data drift; (2) Package a model into a deployable image
- Common misconception addressed: Assuming a passing build means the deployed model still performs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Triggering retraining pipelines | 120 | 8 |
| M03L02 | Packaging and deploying models | 120 | 8 |

### M04 Release safety and rollback (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design a canary release for a model; (2) Automate rollback on a metric breach
- Common misconception addressed: Shipping a new model to 100% of traffic without a safe rollout
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Progressive delivery for models | 120 | 8 |
| M04L02 | Monitoring-driven rollback | 120 | 8 |

## Integrative case

A team ships model changes manually and a bad retrain reaches all users before anyone notices accuracy dropped. Build an ML CI/CD pipeline with data and model quality gates, canary delivery and automated, monitoring-driven rollback.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1353-final-protected | 20 | 20 | yes |
| MST-1353-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| CI/CD foundations for ML | 5 |
| Automated testing for ML | 5 |
| Continuous training and delivery | 5 |
| Release safety and rollback | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1353-Q0001** (single-answer, Select ONE) What makes ML CI/CD different from traditional software CI/CD?

- A. Data and models are versioned and tested, not just code **(key)**  
  _Rationale:_ Correct: ML pipelines must validate data and model quality too.
- B. ML needs no automated tests  
  _Rationale:_ ML needs more test types, not fewer.
- C. Code never changes in ML systems  
  _Rationale:_ Code still changes and is still tested.
- D. Deployments are always manual in ML  
  _Rationale:_ ML aims to automate deployment like software.

**MST-1353-Q0002** (multiple-answer, Select TWO) Which TWO quality gates belong in an ML CI pipeline beyond ordinary unit tests? (Select TWO.)

- A. Data schema/distribution validation **(key)**  
  _Rationale:_ Correct: bad input data must fail the pipeline early.
- B. A minimum model-performance threshold on a holdout set **(key)**  
  _Rationale:_ Correct: models below the bar should block the merge/deploy.
- C. Checking only code formatting  
  _Rationale:_ Linting alone does not catch data or model regressions.
- D. Counting lines of code changed  
  _Rationale:_ Not a quality signal for ML.

**MST-1353-Q0003** (single-answer, Select ONE) Why deploy a new model as a canary first?

- A. It limits blast radius and lets you compare metrics before full rollout **(key)**  
  _Rationale:_ Correct: canaries expose a small slice so regressions are caught early.
- B. It guarantees the model is more accurate  
  _Rationale:_ Canarying measures impact; it does not improve accuracy.
- C. It removes the need for monitoring  
  _Rationale:_ Canarying depends on monitoring.
- D. It trains the model faster  
  _Rationale:_ Canarying is a release strategy, not training.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
