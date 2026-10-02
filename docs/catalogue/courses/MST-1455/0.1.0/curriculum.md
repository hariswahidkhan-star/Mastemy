# BigQuery ML

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1455` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GCP-BQML (https://cloud.google.com/bigquery/docs/bqml-introduction; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — BigQuery ML (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what BigQuery ML does and when to use in-database ML
2. Create and train models with the CREATE MODEL statement
3. Choose model types for regression, classification and forecasting
4. Evaluate models with ML.EVALUATE and interpret metrics
5. Generate predictions with ML.PREDICT and ML.FORECAST
6. Apply feature engineering, data splits and responsible-use practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 BigQuery ML foundations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Decide whether a task suits in-database ML or an external pipeline; (2) Prepare a training table with a clean label column
- Common misconception addressed: Thinking BigQuery ML replaces all need for data preparation
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What BigQuery ML is and when to use it | 48 | 5 |
| M01L02 | Data preparation and training tables | 48 | 5 |

### M02 Creating and training models (MASTEMY-DESIGN 16%)

- Worked applications: (1) Train a linear regression model with CREATE MODEL; (2) Set training options such as input label and data split
- Common misconception addressed: Omitting a data split and evaluating on training data
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The CREATE MODEL statement | 48 | 5 |
| M02L02 | Training options and model inspection | 48 | 5 |

### M03 Model types (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pick between linear and logistic regression for a target; (2) Choose a model type for a multi-class problem
- Common misconception addressed: Using a regression model for a yes/no classification target
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Regression and classification models | 48 | 5 |
| M03L02 | Clustering, time-series and imported models | 48 | 5 |

### M04 Evaluating models (MASTEMY-DESIGN 17%)

- Worked applications: (1) Run ML.EVALUATE and read precision, recall and ROC AUC; (2) Compare two models on the same evaluation set
- Common misconception addressed: Reading accuracy alone on an imbalanced dataset
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | ML.EVALUATE and metrics | 48 | 5 |
| M04L02 | Confusion matrix and threshold selection | 48 | 5 |

### M05 Prediction and forecasting (MASTEMY-DESIGN 17%)

- Worked applications: (1) Generate scored predictions with ML.PREDICT; (2) Produce a forecast with confidence intervals using ML.FORECAST
- Common misconception addressed: Treating forecast point values as certain outcomes
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | ML.PREDICT for scoring | 48 | 5 |
| M05L02 | ML.FORECAST for time series | 48 | 5 |

### M06 Feature engineering and responsible use (MASTEMY-DESIGN 17%)

- Worked applications: (1) Apply TRANSFORM to preprocess features inside the model; (2) Check a model for leakage and document its limits
- Common misconception addressed: Including a feature that leaks the label into training
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | TRANSFORM and feature engineering | 48 | 5 |
| M06L02 | Data leakage, bias and responsible use | 48 | 5 |

## Integrative case

A retailer wants to forecast weekly demand and flag likely churners from data already in BigQuery: build a time-series forecast and a logistic-regression churn model with BigQuery ML, evaluate both, generate predictions, and explain the trade-offs of in-database ML to the data team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1455-final-protected | 30 | 30 | yes |
| MST-1455-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| BigQuery ML foundations | 5 |
| Creating and training models | 5 |
| Model types | 5 |
| Evaluating models | 5 |
| Prediction and forecasting | 5 |
| Feature engineering and responsible use | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1455-Q0001** (single-answer, Select ONE) You want to predict whether each customer will churn (yes/no) from data in BigQuery. Which model type fits?

- A. Logistic regression **(key)**  
  _Rationale:_ Correct: logistic regression is a classifier for binary outcomes.
- B. Linear regression  
  _Rationale:_ Linear regression predicts a continuous value, not a class.
- C. ARIMA_PLUS time series  
  _Rationale:_ Time-series models forecast values over time, not a yes/no label.
- D. K-means clustering  
  _Rationale:_ Clustering groups unlabeled data; it does not predict a known label.

**MST-1455-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce the risk of a misleading BigQuery ML model? (Select TWO.)

- A. Hold out an evaluation split separate from training data **(key)**  
  _Rationale:_ Correct: evaluating on held-out data gives an honest estimate.
- B. Remove features that leak the label **(key)**  
  _Rationale:_ Correct: leakage inflates metrics and fails in production.
- C. Evaluate only on the rows used for training  
  _Rationale:_ Training-set evaluation overstates performance.
- D. Judge an imbalanced classifier by accuracy alone  
  _Rationale:_ Accuracy hides poor recall on the minority class.

**MST-1455-Q0003** (single-answer, Select ONE) Which statement creates and trains a model directly in BigQuery?

- A. CREATE MODEL ... OPTIONS(...) AS SELECT ... **(key)**  
  _Rationale:_ Correct: CREATE MODEL defines and trains a model from a query.
- B. ML.EVALUATE(...)  
  _Rationale:_ ML.EVALUATE measures a trained model; it does not create one.
- C. ML.PREDICT(...)  
  _Rationale:_ ML.PREDICT scores with an existing model.
- D. TRAIN TABLE ...  
  _Rationale:_ There is no TRAIN TABLE statement in BigQuery ML.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
