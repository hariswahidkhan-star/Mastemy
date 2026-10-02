# CAS Exam MAS-I: Modern Actuarial Statistics I

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0085` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | CAS (no affiliation or endorsement) |
| Exam code | official_exam_code left empty; design assumption: Exam MAS-I (assumed designation) (vendor designation treated as a design assumption; not an official-source-verified code) |
| Version basis | DESIGN ASSUMPTION - official CAS exam content outline and domain weightings not retrieved (issuer site egress-blocked 2026-10-02); confirm on the issuer's website. |
| Evidence | **unverified-needs-official-check** - issuer source egress-blocked on access date; confirm on official site |
| Legacy IDs | none |
| Planned time | T = 12000 min; instruction I = 9600 min (80%); assessment A = 2400 min (20%) |
| Assessment split | lesson checks 600 / module checks 840 / cumulative 960 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply probability models and stochastic processes to actuarial problems
2. Apply statistical estimation and hypothesis testing
3. Fit extended linear models and basic time-series models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Probability Models and Stochastic Processes (design assumption - weight not verified)

- Worked applications: (1) Compute transition probabilities for a two-state Markov chain; (2) Derive the mean and variance of a compound Poisson aggregate
- Common misconception addressed: Treating a compound Poisson mean as its variance
- Module check: 210 items / 210 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Poisson and compound processes | 1200 | 6 |
| M01L02 | Markov chains and survival models | 1200 | 6 |

### M02 Statistics (design assumption - weight not verified)

- Worked applications: (1) Construct a confidence interval for a mean from a sample; (2) Run a likelihood-ratio test on a parameter
- Common misconception addressed: Interpreting a p-value as the probability the null is true
- Module check: 210 items / 210 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Point estimation and properties | 1200 | 6 |
| M02L02 | Hypothesis testing and confidence intervals | 1200 | 6 |

### M03 Extended Linear Models (design assumption - weight not verified)

- Worked applications: (1) Fit a GLM with a log link to claim counts; (2) Diagnose heteroskedasticity from a residual plot
- Common misconception addressed: Assuming ordinary least squares is valid for count data
- Module check: 210 items / 210 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Linear regression and diagnostics | 1200 | 6 |
| M03L02 | Generalised linear models and link functions | 1200 | 6 |

### M04 Time Series (design assumption - weight not verified)

- Worked applications: (1) Identify an AR(1) from an autocorrelation function; (2) Produce a one-step forecast with a prediction interval
- Common misconception addressed: Fitting a trend model to a non-stationary series without differencing
- Module check: 210 items / 210 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Stationarity and autocorrelation | 1200 | 6 |
| M04L02 | ARIMA models and forecasting | 1200 | 6 |

## Integrative case

An analyst models claim frequency for an insurance line: the candidate selects a stochastic process, fits a generalised linear model, and checks residuals and forecasts.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the issuer's exam content outline (question count/duration) was not retrieved (egress-blocked); form lengths derive from the Mastemy assessment time budget, not the official exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0085-practice-form-A | 360 | 360 | yes |
| MST-0085-practice-form-B | 360 | 360 | no (optional practice) |
| MST-0085-practice-form-C | 360 | 360 | no (optional practice) |
| MST-0085-final-protected | 360 | 360 | yes |

| Domain | Items (practice form A) |
|---|---|
| Probability Models and Stochastic Processes | 90 |
| Statistics | 90 |
| Extended Linear Models | 90 |
| Time Series | 90 |

Minimum reviewed item bank: 3216 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0085-Q0001** (single-answer, Select ONE) For a compound Poisson aggregate loss S with frequency mean lambda and i.i.d. severities, which is true?

- A. E[S] equals Var[S] always  
  _Rationale:_ That holds for a simple Poisson count, not a compound aggregate.
- B. E[S] = lambda x E[X] where X is severity **(key)**  
  _Rationale:_ Correct: the compound Poisson mean is frequency mean times severity mean.
- C. S is always normally distributed  
  _Rationale:_ S is generally not normal, though it may be approximated for large lambda.
- D. Var[S] cannot be computed  
  _Rationale:_ Var[S] = lambda x E[X^2] is well defined.

**MST-0085-Q0002** (single-answer, Select ONE) A p-value of 0.03 in a hypothesis test at the 5% level means:

- A. There is a 3% probability the null hypothesis is true  
  _Rationale:_ A p-value is not the probability the null is true.
- B. The result is not significant  
  _Rationale:_ 0.03 < 0.05, so it is significant at the 5% level.
- C. We reject the null hypothesis at the 5% level **(key)**  
  _Rationale:_ Correct: p=0.03 is below 0.05, so we reject the null.
- D. The alternative hypothesis is proven  
  _Rationale:_ Tests provide evidence, not proof.

**MST-0085-Q0003** (multiple-answer, Select TWO) Select TWO reasons ordinary least squares is inappropriate for modelling insurance claim counts directly.

- A. Counts are non-negative integers, which OLS can predict as negative **(key)**  
  _Rationale:_ Correct: OLS can produce negative or non-integer predictions for counts.
- B. OLS cannot be fitted to any real data  
  _Rationale:_ OLS is widely applicable to continuous responses.
- C. Counts always follow a normal distribution  
  _Rationale:_ Counts typically follow Poisson-type, not normal, distributions.
- D. Count variance typically increases with the mean, violating OLS homoskedasticity **(key)**  
  _Rationale:_ Correct: mean-variance dependence breaks the OLS constant-variance assumption.
- E. A GLM cannot model counts  
  _Rationale:_ A Poisson GLM is the standard tool for counts.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
