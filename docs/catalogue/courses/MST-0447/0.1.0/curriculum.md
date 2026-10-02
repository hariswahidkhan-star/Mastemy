# Time-Series Forecasting with Machine Learning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0447` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-TSFM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Time-series fundamentals
2. Classical forecasting
3. Machine-learning forecasting
4. Validation and evaluation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Time-series fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decompose a sales series into components; (2) Difference a series to remove a trend
- Common misconception addressed: Assuming a series is stationary without checking
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Components: trend, seasonality, noise | 120 | 8 |
| M01L02 | Stationarity and differencing | 120 | 8 |

### M02 Classical forecasting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Fit an ARIMA order from ACF/PACF plots; (2) Choose ETS components for a seasonal series
- Common misconception addressed: Reading ACF/PACF plots as proof of causation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | ARIMA and SARIMA models | 120 | 8 |
| M02L02 | Exponential smoothing and ETS | 120 | 8 |

### M03 Machine-learning forecasting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build lag and rolling features without leakage; (2) Compare a gradient-boosted model to ARIMA
- Common misconception addressed: Creating features that leak future information
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Feature engineering with lags and windows | 120 | 8 |
| M03L02 | Tree and neural models for forecasting | 120 | 8 |

### M04 Validation and evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set up a rolling-origin backtest; (2) Choose MAE vs MAPE for a series with zeros
- Common misconception addressed: Using random k-fold splits on time-ordered data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Backtesting with rolling origin | 120 | 8 |
| M04L02 | Forecast metrics and horizons | 120 | 8 |

## Integrative case

A retailer needs weekly demand forecasts per store with clear seasonality and promotions. Decide on stationarity treatment, pick classical versus ML models, engineer leak-free features, and design a rolling-origin backtest with appropriate metrics.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0447-final-protected | 20 | 20 | yes |
| MST-0447-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Time-series fundamentals | 5 |
| Classical forecasting | 5 |
| Machine-learning forecasting | 5 |
| Validation and evaluation | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0447-Q0001** (single-answer, Select ONE) Why is random k-fold cross-validation usually inappropriate for time-series forecasting?

- A. It lets the model train on future data and test on the past, leaking information **(key)**  
  _Rationale:_ Correct: shuffling breaks temporal order and leaks future into training.
- B. It cannot compute any error metric  
  _Rationale:_ It can compute metrics; the problem is leakage.
- C. It always underfits  
  _Rationale:_ Fit quality is unrelated to the ordering issue.
- D. It requires stationarity  
  _Rationale:_ The issue is temporal leakage, not stationarity.

**MST-0447-Q0002** (multiple-answer, Select TWO) Which TWO signs suggest a series is non-stationary and may need differencing? (Select TWO.)

- A. A visible upward trend over time **(key)**  
  _Rationale:_ Correct: a trend means the mean changes over time.
- B. Strong, slowly decaying autocorrelation **(key)**  
  _Rationale:_ Correct: slow ACF decay is typical of non-stationary series.
- C. Constant mean and variance over time  
  _Rationale:_ That describes stationarity, not non-stationarity.
- D. White-noise residuals  
  _Rationale:_ White noise is stationary.

**MST-0447-Q0003** (single-answer, Select ONE) For a demand series that contains many zero-sales weeks, why can MAPE be a poor metric?

- A. MAPE divides by the actual value, which is undefined or explodes at zero **(key)**  
  _Rationale:_ Correct: zero actuals make percentage error undefined or huge.
- B. MAPE ignores the forecast entirely  
  _Rationale:_ MAPE uses the forecast.
- C. MAPE only works for classification  
  _Rationale:_ MAPE is a regression metric.
- D. MAPE requires stationarity  
  _Rationale:_ It does not require stationarity.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
