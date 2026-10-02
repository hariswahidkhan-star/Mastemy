# Time-Series Analysis and Business Forecasting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0977` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-TSA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Time-Series Analysis and Business Forecasting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Time-series foundations
2. Exploratory analysis
3. Classical forecasting
4. Seasonality and regressors
5. Evaluation
6. Applied forecasting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Time-series foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Identify trend and seasonality in a sales series; (2) Resample daily data to monthly totals
- Common misconception addressed: Treating a date column as plain text instead of a time index
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Components of a time series | 80 | 6 |
| M01L02 | Stationarity | 80 | 6 |
| M01L03 | Resampling and date indexing | 80 | 6 |

### M02 Exploratory analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Decompose a series into trend/seasonal/residual; (2) Read an ACF plot for seasonality
- Common misconception addressed: Imputing time-series gaps with a global mean
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Trend and seasonality decomposition | 80 | 6 |
| M02L02 | Autocorrelation and lags | 80 | 6 |
| M02L03 | Missing values and outliers | 80 | 6 |

### M03 Classical forecasting (MASTEMY-DESIGN 17%)

- Worked applications: (1) Forecast with Holt-Winters seasonal smoothing; (2) Fit a simple ARIMA order
- Common misconception addressed: Reading ARIMA's p/d/q as if higher always means better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Moving averages and smoothing | 80 | 6 |
| M03L02 | Exponential smoothing (ETS) | 80 | 6 |
| M03L03 | ARIMA models | 80 | 6 |

### M04 Seasonality and regressors (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a holiday regressor to a forecast; (2) Choose a seasonal period for weekly data
- Common misconception addressed: Ignoring a known seasonal period when fitting a model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Seasonal ARIMA (SARIMA) | 80 | 6 |
| M04L02 | Exogenous regressors | 80 | 6 |
| M04L03 | Holiday and calendar effects | 80 | 6 |

### M05 Evaluation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Split a series without shuffling; (2) Compare models with MAPE and RMSE
- Common misconception addressed: Using random k-fold cross-validation on time-ordered data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Time-aware train/test splits | 80 | 6 |
| M05L02 | Forecast error metrics | 80 | 6 |
| M05L03 | Backtesting and rolling origin | 80 | 6 |

### M06 Applied forecasting (MASTEMY-DESIGN 16%)

- Worked applications: (1) Produce a monthly demand forecast with intervals; (2) Set up a re-forecast cadence
- Common misconception addressed: Reporting a point forecast with no uncertainty range
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | A demand forecasting workflow | 80 | 6 |
| M06L02 | Communicating uncertainty and intervals | 80 | 6 |
| M06L03 | Monitoring and re-forecasting | 80 | 6 |

## Integrative case

Forecast monthly demand for a product line: explore and decompose the history, fit and compare classical models, evaluate with time-aware backtesting, and deliver a forecast with prediction intervals.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0977-final-protected | 30 | 30 | yes |
| MST-0977-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Time-series foundations | 5 |
| Exploratory analysis | 5 |
| Classical forecasting | 5 |
| Seasonality and regressors | 5 |
| Evaluation | 5 |
| Applied forecasting | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0977-Q0001** (single-answer, Select ONE) Why is random k-fold cross-validation inappropriate for evaluating a forecasting model on time-ordered data?

- A. It lets future observations leak into training, inflating apparent accuracy **(key)**  
  _Rationale:_ Correct: shuffling allows future points into training, which leaks information and overstates accuracy.
- B. It is always slower than other methods  
  _Rationale:_ Speed is not the core issue; validity is.
- C. It cannot compute any error metric  
  _Rationale:_ Error metrics can still be computed; the problem is leakage.
- D. It requires the data to be stationary first  
  _Rationale:_ Stationarity is a modeling concern, not the reason k-fold leaks.

**MST-0977-Q0002** (single-answer, Select ONE) Which method is well suited to a series with both trend and strong seasonality?

- A. Holt-Winters (triple) exponential smoothing **(key)**  
  _Rationale:_ Correct: Holt-Winters models level, trend and seasonality together.
- B. A single global mean  
  _Rationale:_ A global mean ignores both trend and seasonality.
- C. Simple random sampling  
  _Rationale:_ Random sampling does not forecast a time series.
- D. Dropping all seasonal periods  
  _Rationale:_ Dropping seasonality discards the structure you need to model.

**MST-0977-Q0003** (multiple-answer, Select TWO) Which TWO are good practices when reporting a business forecast? (Select TWO)

- A. Include prediction intervals, not just a point estimate **(key)**  
  _Rationale:_ Correct: intervals communicate the uncertainty around the estimate.
- B. State the assumptions and the forecast horizon **(key)**  
  _Rationale:_ Correct: assumptions and horizon let the audience judge the forecast.
- C. Present the forecast as a certainty  
  _Rationale:_ Forecasts are uncertain; presenting certainty misleads.
- D. Hide the historical error from the audience  
  _Rationale:_ Hiding historical error prevents honest assessment of reliability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
