# Machine-Learning Monitoring and Drift Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0461` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-MMPD-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why deployed ML models degrade and the types of drift that cause it
2. Design monitoring for data quality, prediction distribution and model performance
3. Select metrics and thresholds that trigger investigation or retraining
4. Diagnose the root cause of a performance drop from monitoring signals
5. Plan a retraining and rollback response that limits business impact

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why models degrade in production (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify three incidents as data drift, concept drift or a pipeline bug; (2) Map a model's decay curve to likely causes over six months
- Common misconception addressed: Believing a model validated once stays accurate indefinitely
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From validation accuracy to production reality | 96 | 8 |
| M01L02 | Concept drift, data drift and label drift | 96 | 8 |

### M02 Building a monitoring stack (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose which signals to log for a fraud model with delayed labels; (2) Design a dashboard layout for a daily-scored churn model
- Common misconception addressed: Assuming accuracy can be monitored in real time when labels arrive late
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Monitoring inputs: data quality and feature drift | 96 | 8 |
| M02L02 | Monitoring outputs: prediction and performance metrics | 96 | 8 |

### M03 Detecting drift with the right metrics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick PSI versus a KS test for a categorical versus a continuous feature; (2) Set an alert threshold that balances false alarms against missed drift
- Common misconception addressed: Treating any distribution change as a problem requiring retraining
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Statistical tests and distance measures for drift | 96 | 8 |
| M03L02 | Setting thresholds and alert policies | 96 | 8 |

### M04 Diagnosing root causes (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace a sudden precision drop to an upstream schema change; (2) Decide whether a gradual decline needs retraining or recalibration
- Common misconception addressed: Assuming every performance drop means the model must be retrained
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | From alert to root cause | 96 | 8 |
| M04L02 | Separating model issues from data and pipeline issues | 96 | 8 |

### M05 Responding: retraining, rollback and governance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define retraining triggers for a demand-forecasting model; (2) Write a rollback criterion and incident note for a failed deployment
- Common misconception addressed: Deploying a retrained model without a rollback plan
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Retraining triggers and validation gates | 96 | 8 |
| M05L02 | Rollback, shadow deployment and incident records | 96 | 8 |

## Integrative case

A lender's credit-risk model shows a slow accuracy decline and one sudden alert. Build the monitoring plan, diagnose each signal, decide what to retrain or roll back, and brief risk leadership on the response without overstating detection certainty.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0461-final-protected | 25 | 25 | yes |
| MST-0461-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why models degrade in production | 5 |
| Building a monitoring stack | 5 |
| Detecting drift with the right metrics | 5 |
| Diagnosing root causes | 5 |
| Responding: retraining, rollback and governance | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0461-Q0001** (single-answer, Select ONE) A model's input feature distribution shifts while the true relationship between inputs and target stays the same. What is this?

- A. Data drift **(key)**  
  _Rationale:_ Correct: the inputs changed while the input-output relationship did not.
- B. Concept drift  
  _Rationale:_ Concept drift is when the input-output relationship itself changes.
- C. Label leakage  
  _Rationale:_ Leakage is a training-time flaw, not a production distribution shift.
- D. Overfitting  
  _Rationale:_ Overfitting is a training issue, not a live distribution change.

**MST-0461-Q0002** (multiple-answer, Select TWO) Which TWO signals can be monitored before ground-truth labels arrive? (Select TWO.)

- A. The input feature distribution **(key)**  
  _Rationale:_ Correct: inputs are available immediately at scoring time.
- B. The prediction score distribution **(key)**  
  _Rationale:_ Correct: prediction outputs are available without labels.
- C. Realised accuracy against true labels  
  _Rationale:_ Requires labels, which arrive later.
- D. F1 computed against ground truth  
  _Rationale:_ Requires labels, which are delayed.

**MST-0461-Q0003** (single-answer, Select ONE) A sudden precision drop coincides with an upstream schema change. What is the best first action?

- A. Investigate the pipeline and data before retraining **(key)**  
  _Rationale:_ Correct: a data or pipeline fault is the likely cause and retraining would not fix it.
- B. Immediately retrain the model  
  _Rationale:_ Retraining on broken data wastes effort and can worsen things.
- C. Ignore the alert  
  _Rationale:_ A sharp precision drop is a real incident.
- D. Lower the alert threshold  
  _Rationale:_ This hides the problem rather than diagnosing it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
