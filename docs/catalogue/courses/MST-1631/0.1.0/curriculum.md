# Econometrics Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1631` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-EF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Specify and interpret linear regression models
2. State and check the classical regression assumptions
3. Diagnose and address heteroskedasticity, autocorrelation and multicollinearity
4. Apply approaches for causal identification
5. Interpret econometric results honestly, separating association from causation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The regression model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a slope coefficient in context with its units; (2) Explain what R-squared does and does not tell you
- Common misconception addressed: Reading a high R-squared as proof the model is correct
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Simple and multiple linear regression | 96 | 8 |
| M01L02 | Interpreting coefficients and fit | 96 | 8 |

### M02 Classical assumptions (MASTEMY-DESIGN 20%)

- Worked applications: (1) List which assumption a described problem violates; (2) Explain the effect of omitted-variable bias on a coefficient
- Common misconception addressed: Assuming OLS is unbiased regardless of omitted variables
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Gauss-Markov assumptions | 96 | 8 |
| M02L02 | Consequences when assumptions fail | 96 | 8 |

### M03 Diagnostics and fixes (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose robust standard errors for a described heteroskedastic case; (2) Diagnose multicollinearity from a correlation matrix and VIF
- Common misconception addressed: Treating a biased coefficient as fixable by adjusting standard errors
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Heteroskedasticity and autocorrelation | 96 | 8 |
| M03L02 | Multicollinearity and robust standard errors | 96 | 8 |

### M04 Causal identification (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain why an endogenous regressor biases OLS; (2) Describe the parallel-trends idea behind difference-in-differences
- Common misconception addressed: Interpreting a regression coefficient as causal by default
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Endogeneity and instrumental variables (conceptual) | 96 | 8 |
| M04L02 | Difference-in-differences and panel ideas (conceptual) | 96 | 8 |

### M05 Honest interpretation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Distinguish a statistically significant but tiny effect from a meaningful one; (2) Rewrite an overstated causal claim into an honest associational one
- Common misconception addressed: Equating a small p-value with a large or important effect
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Statistical vs practical significance | 96 | 8 |
| M05L02 | Reporting limitations and uncertainty | 96 | 8 |

## Integrative case

An analyst estimates the effect of a training programme on wages. Specify the regression, check the Gauss-Markov assumptions, address heteroskedasticity with robust errors, reason about the omitted variables and endogeneity that threaten a causal claim, and report the finding separating association from causation with honest caveats.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1631-final-protected | 25 | 25 | yes |
| MST-1631-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The regression model | 5 |
| Classical assumptions | 5 |
| Diagnostics and fixes | 5 |
| Causal identification | 5 |
| Honest interpretation | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1631-Q0001** (single-answer, Select ONE) Omitting a variable that affects both the regressor and the outcome causes what?

- A. Omitted-variable bias in the estimated coefficient **(key)**  
  _Rationale:_ Correct: a correlated omitted driver biases the coefficient.
- B. Only a change in R-squared, with unbiased coefficients  
  _Rationale:_ The coefficient itself becomes biased, not just fit.
- C. No effect at all  
  _Rationale:_ A correlated omitted variable does bias estimates.
- D. Perfect multicollinearity  
  _Rationale:_ That is a different problem entirely.

**MST-1631-Q0002** (multiple-answer, Select TWO) Which TWO statements about regression results are correct? (Select TWO.)

- A. A statistically significant coefficient can still be practically trivial **(key)**  
  _Rationale:_ Correct: significance does not imply a large or important effect.
- B. A regression coefficient is not causal unless identification is credibly argued **(key)**  
  _Rationale:_ Correct: association needs an identification strategy to be causal.
- C. A high R-squared proves the model is correctly specified  
  _Rationale:_ High fit does not guarantee correct specification or causality.
- D. A small p-value guarantees a large effect size  
  _Rationale:_ P-value and effect size are distinct.

**MST-1631-Q0003** (single-answer, Select ONE) When errors are heteroskedastic but the model is otherwise well specified, what is an appropriate response?

- A. Use robust (heteroskedasticity-consistent) standard errors for valid inference **(key)**  
  _Rationale:_ Correct: robust errors fix inference under heteroskedasticity.
- B. Ignore it because coefficients become biased anyway  
  _Rationale:_ Heteroskedasticity affects standard errors, not coefficient unbiasedness.
- C. Drop half the data at random  
  _Rationale:_ That discards information and does not address the issue.
- D. Switch to a causal claim without further work  
  _Rationale:_ Heteroskedasticity has nothing to do with establishing causation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
