# AI-Assisted Excel Forecasting and Sensitivity Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0651` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Excel feature facts (FORECAST.ETS, Forecast Sheet, what-if Data Tables, Scenario Manager) and Copilot-in-Excel analysis behaviour grounded in official Microsoft documentation read via the Microsoft Learn MCP on 2026-10-02; Copilot features depend on licensing and roll out progressively, and Copilot output must be verified by the user. Confirm Copilot availability and function support against the current build and tenant before production. |
| Official sources | https://support.microsoft.com/office/forecast-ets-function-15389b8b-677e-4fbd-bd95-21d464333f41; https://learn.microsoft.com/copilot/finance/variance/analyze-variances |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-COPILOT-FCST |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — AI-Assisted Excel Forecasting and Sensitivity Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build statistical forecasts in Excel
2. Use Copilot to assist and then review analysis
3. Run sensitivity and scenario analysis
4. Track forecast accuracy against actuals
5. Communicate forecast uncertainty responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Forecasting foundations (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a Forecast Sheet with confidence bounds; (2) Model seasonality and trend with FORECAST.ETS
- Common misconception addressed: Forecasting without first checking for seasonality or trend
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Time-series structure | 80 | 5 |
| M01L02 | FORECAST.ETS and the Forecast Sheet | 80 | 5 |
| M01L03 | Seasonality and trend | 80 | 5 |

### M02 Copilot-assisted analysis (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Ask Copilot to analyse a trend and propose a column; (2) Validate a Copilot-suggested formula against a manual calculation
- Common misconception addressed: Accepting Copilot formulas or narratives without verifying the result
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting Copilot in Excel | 80 | 5 |
| M02L02 | Copilot formula and analysis suggestions | 80 | 5 |
| M02L03 | Reviewing Copilot output critically | 80 | 5 |

### M03 Sensitivity and scenarios (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a two-variable data table across two drivers; (2) Rank drivers by their sensitivity impact
- Common misconception addressed: Changing one input at a time and missing interactions between drivers
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | One- and two-variable data tables | 80 | 5 |
| M03L02 | Scenario Manager | 80 | 5 |
| M03L03 | Tornado-style sensitivity | 80 | 5 |

### M04 Forecast reporting (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Plot a forecast with its confidence band; (2) Build a forecast-versus-actual accuracy tracker
- Common misconception addressed: Presenting a single point forecast as if it were certain
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Confidence intervals in charts | 80 | 5 |
| M04L02 | Forecast-versus-actual tracking | 80 | 5 |
| M04L03 | Communicating uncertainty | 80 | 5 |

## Integrative case

A finance analyst forecasts quarterly demand: build a seasonal forecast, use Copilot to summarise the drivers, run a two-variable sensitivity table, and present a forecast with confidence bounds while being explicit about uncertainty.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0651-final-protected | 30 | 40 | yes |
| MST-0651-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Forecasting foundations | 8 |
| Copilot-assisted analysis | 8 |
| Sensitivity and scenarios | 7 |
| Forecast reporting | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0651-Q0001** (single-answer, Select ONE) FORECAST.ETS is most appropriate when the historical series:

- A. Has a repeating seasonal pattern over a consistent timeline **(key)**  
  _Rationale:_ Correct: FORECAST.ETS models trend and seasonality on a consistent time series.
- B. Has no time dimension at all  
  _Rationale:_ FORECAST.ETS needs a timeline.
- C. Contains only text labels  
  _Rationale:_ It forecasts numeric values over time.
- D. Is a single value  
  _Rationale:_ A single value cannot be forecast with seasonality.

**MST-0651-Q0002** (multiple-answer, Select TWO) Which TWO are good practices when using Copilot to help build an Excel forecast? (Select TWO.)

- A. Recompute or spot-check any formula Copilot proposes **(key)**  
  _Rationale:_ Correct: Copilot output must be verified against a manual check.
- B. State the assumptions and data range in the prompt **(key)**  
  _Rationale:_ Correct: clear, grounded prompts give more reliable assistance.
- C. Publish Copilot's number without any review  
  _Rationale:_ Unverified output can be wrong.
- D. Assume Copilot has calibrated the forecast's accuracy  
  _Rationale:_ Copilot does not guarantee calibrated accuracy.

**MST-0651-Q0003** (single-answer, Select ONE) Why prefer a two-variable data table over changing inputs one at a time?

- A. It shows the combined effect of two drivers across a grid of values **(key)**  
  _Rationale:_ Correct: a two-variable table reveals interaction across a grid.
- B. It is the only way Excel can multiply  
  _Rationale:_ Excel multiplies directly; this is about sensitivity analysis.
- C. It removes the need for any assumptions  
  _Rationale:_ Assumptions still apply.
- D. It guarantees the forecast is correct  
  _Rationale:_ It explores sensitivity, not correctness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
