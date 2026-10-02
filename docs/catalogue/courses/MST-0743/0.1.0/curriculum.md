# BigQuery Machine Learning and AI-Assisted Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0743` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google BigQuery ML docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-BQML (https://cloud.google.com/bigquery/docs/bqml-introduction; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — BigQuery Machine Learning and AI-Assisted Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Create and train models with BigQuery ML SQL
2. Prepare features inside BigQuery
3. Evaluate model quality
4. Run predictions at scale
5. Use built-in and imported model types
6. Apply AI functions and responsible-use practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 BQML fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Train a linear regression with CREATE MODEL; (2) Choose a model type for a classification task
- Common misconception addressed: Thinking BQML requires exporting data to a separate ML tool
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CREATE MODEL basics | 80 | 7 |
| M01L02 | Model types overview | 80 | 7 |

### M02 Feature engineering (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build features with SQL before training; (2) Use TRANSFORM to keep preprocessing with the model
- Common misconception addressed: Leaking the label into the feature set
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Preparing features in SQL | 80 | 7 |
| M02L02 | TRANSFORM and preprocessing | 80 | 7 |

### M03 Evaluation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Evaluate a model with ML.EVALUATE; (2) Hold out an evaluation split
- Common misconception addressed: Judging a model only on training data
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | ML.EVALUATE metrics | 80 | 7 |
| M03L02 | Train/eval splits | 80 | 7 |

### M04 Prediction at scale (MASTEMY-DESIGN 17%)

- Worked applications: (1) Score new rows with ML.PREDICT; (2) Write predictions to a results table
- Common misconception addressed: Expecting predictions without retraining as data drifts
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | ML.PREDICT | 80 | 7 |
| M04L02 | Batch scoring patterns | 80 | 7 |

### M05 Model types and import (MASTEMY-DESIGN 17%)

- Worked applications: (1) Train an ARIMA_PLUS time-series model; (2) Call a remote model for inference
- Common misconception addressed: Assuming every model type is trained the same way
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Time series and clustering | 80 | 7 |
| M05L02 | Imported and remote models | 80 | 7 |

### M06 AI functions and responsible use (MASTEMY-DESIGN 17%)

- Worked applications: (1) Call a generative AI function over a column; (2) Document data assumptions for review
- Common misconception addressed: Treating model output as unbiased and always correct
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Generative AI SQL functions | 80 | 7 |
| M06L02 | Governance and limits | 80 | 7 |

## Integrative case

Forecast product demand with BigQuery ML: engineer features from sales tables, train a regression model with CREATE MODEL, evaluate it with ML.EVALUATE, generate predictions with ML.PREDICT, compare a time-series model, and document assumptions for review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0743-final-protected | 40 | 50 | yes |
| MST-0743-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| BQML fundamentals | 6 |
| Feature engineering | 6 |
| Evaluation | 7 |
| Prediction at scale | 7 |
| Model types and import | 7 |
| AI functions and responsible use | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0743-Q0001** (single-answer, Select ONE) What is distinctive about BigQuery ML?

- A. You create and run models using SQL inside BigQuery **(key)**  
  _Rationale:_ Correct: BQML lets you build models with SQL where the data lives.
- B. It requires exporting data to a separate notebook first  
  _Rationale:_ BQML runs inside BigQuery without exporting data.
- C. It only supports deep neural networks  
  _Rationale:_ It supports many model types, not only DNNs.
- D. It cannot evaluate model quality  
  _Rationale:_ ML.EVALUATE provides quality metrics.

**MST-0743-Q0002** (single-answer, Select ONE) Which function returns quality metrics for a trained BigQuery ML model?

- A. ML.EVALUATE **(key)**  
  _Rationale:_ Correct: ML.EVALUATE returns evaluation metrics.
- B. ML.PREDICT  
  _Rationale:_ ML.PREDICT generates predictions, not metrics.
- C. CREATE MODEL  
  _Rationale:_ CREATE MODEL trains; it does not report evaluation metrics.
- D. ML.TRANSFORM only  
  _Rationale:_ TRANSFORM handles preprocessing, not evaluation.

**MST-0743-Q0003** (multiple-answer, Select TWO) Which TWO practices help avoid misleading BigQuery ML results? (Select TWO.)

- A. Evaluate on held-out data, not training data **(key)**  
  _Rationale:_ Correct: held-out evaluation avoids over-optimistic metrics.
- B. Exclude any feature that leaks the label **(key)**  
  _Rationale:_ Correct: label leakage inflates apparent accuracy.
- C. Score forever without retraining as data drifts  
  _Rationale:_ Drift requires retraining.
- D. Judge the model on one lucky query  
  _Rationale:_ A single query is not a sound evaluation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
