# Data Science Project Lifecycle

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1633` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-DSPL-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame a data science problem from a business question
2. Plan data acquisition, understanding and preparation
3. Structure modelling, evaluation and iteration
4. Plan deployment, monitoring and maintenance
5. Manage stakeholders, ethics and reproducibility across the lifecycle

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Problem framing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Translate a vague business ask into a measurable problem statement; (2) Define a success metric aligned to the business decision
- Common misconception addressed: Jumping to modelling before the problem is framed
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From business question to data science problem | 96 | 8 |
| M01L02 | Success metrics and feasibility | 96 | 8 |

### M02 Data understanding and prep (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draft a data-understanding checklist for a new dataset; (2) Spot a data-leakage risk in a described feature
- Common misconception addressed: Letting information from the future leak into training features
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data acquisition and understanding | 96 | 8 |
| M02L02 | Cleaning, feature preparation and leakage | 96 | 8 |

### M03 Modelling and evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose an evaluation metric that matches the business cost of errors; (2) Design a train/validation/test split that prevents leakage
- Common misconception addressed: Tuning on the test set and reporting its score as unbiased
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Baselines, modelling and iteration | 96 | 8 |
| M03L02 | Evaluation, validation and overfitting | 96 | 8 |

### M04 Deployment and monitoring (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide what to monitor after a model goes live; (2) Plan a retraining trigger based on drift
- Common misconception addressed: Assuming a deployed model's performance stays constant
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Deployment patterns and handoff | 96 | 8 |
| M04L02 | Monitoring, drift and retraining | 96 | 8 |

### M05 People, ethics, reproducibility (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a one-paragraph scope and assumptions note for stakeholders; (2) List what must be versioned to reproduce a result
- Common misconception addressed: Treating a notebook that 'ran once' as a reproducible result
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Stakeholders, communication and scope | 96 | 8 |
| M05L02 | Ethics, reproducibility and documentation | 96 | 8 |

## Integrative case

A data scientist is asked to 'use ML to reduce churn'. Frame the measurable problem and success metric, plan data understanding and guard against leakage, choose an evaluation metric matching the cost of errors, plan monitoring and a retraining trigger, and document scope, ethics and reproducibility for stakeholders.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1633-final-protected | 25 | 25 | yes |
| MST-1633-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Problem framing | 5 |
| Data understanding and prep | 5 |
| Modelling and evaluation | 5 |
| Deployment and monitoring | 5 |
| People, ethics, reproducibility | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1633-Q0001** (single-answer, Select ONE) What is data leakage in a modelling project?

- A. Information unavailable at prediction time leaking into training features, inflating performance **(key)**  
  _Rationale:_ Correct: leakage uses future or target-derived information, overstating results.
- B. A network security breach of the dataset  
  _Rationale:_ That is a different meaning of leak, not the modelling concept.
- C. Losing rows during a join  
  _Rationale:_ That is data loss, not leakage.
- D. Using too many features  
  _Rationale:_ Feature count alone is not leakage.

**MST-1633-Q0002** (multiple-answer, Select TWO) Which TWO should be done before declaring a model ready for deployment? (Select TWO.)

- A. Evaluate on a held-out test set not used for tuning **(key)**  
  _Rationale:_ Correct: an untouched test set gives an unbiased estimate.
- B. Plan what to monitor for drift after launch **(key)**  
  _Rationale:_ Correct: monitoring is needed because performance degrades over time.
- C. Tune hyperparameters on the test set and report that score  
  _Rationale:_ Tuning on the test set biases the reported performance.
- D. Assume performance will stay constant indefinitely  
  _Rationale:_ Models degrade; this assumption is unsafe.

**MST-1633-Q0003** (single-answer, Select ONE) A stakeholder says 'use ML to improve the business'. What is the first lifecycle step?

- A. Frame a specific, measurable problem and success metric tied to a decision **(key)**  
  _Rationale:_ Correct: problem framing precedes data and modelling work.
- B. Immediately train several models and compare them  
  _Rationale:_ Modelling before framing wastes effort on the wrong target.
- C. Buy the largest dataset available  
  _Rationale:_ Data acquisition follows a framed problem.
- D. Deploy a model and see what happens  
  _Rationale:_ Deployment is the last stage, not the first.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
