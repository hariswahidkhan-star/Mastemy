# Data Science Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1632` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Frame business questions as data-science problems
2. Acquire, clean and explore data
3. Apply descriptive and inferential statistics appropriately
4. Build and evaluate basic predictive models
5. Avoid common pitfalls like leakage and overfitting
6. Communicate findings and their uncertainty

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Problem framing and data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Translate a business question into a metric; (2) Assess a dataset for quality issues
- Common misconception addressed: Starting modelling before defining the question
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Turning questions into analyses | 168 | 8 |
| M01L02 | Data acquisition and quality | 168 | 8 |

### M02 Exploratory data analysis (MASTEMY-DESIGN 20%)

- Worked applications: (1) Profile a dataset with summary stats; (2) Spot a misleading outlier
- Common misconception addressed: Treating a correlation as a cause
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Summaries, distributions and outliers | 168 | 8 |
| M02L02 | Relationships and visual exploration | 168 | 8 |

### M03 Statistics for data science (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a confidence interval; (2) Choose a test for a comparison
- Common misconception addressed: Reading a p-value as the probability the result is true
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Descriptive vs inferential statistics | 168 | 8 |
| M03L02 | Hypothesis tests and confidence intervals | 168 | 8 |

### M04 Modelling and evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a baseline then a simple model; (2) Evaluate with an appropriate metric
- Common misconception addressed: Evaluating on the training data
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Baselines and simple models | 168 | 8 |
| M04L02 | Train/test split and metrics | 168 | 8 |

### M05 Pitfalls and communication (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot data leakage in a pipeline; (2) Present a result with its uncertainty
- Common misconception addressed: Over-claiming precision the data cannot support
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Leakage, overfitting and bias | 168 | 8 |
| M05L02 | Communicating results and uncertainty | 168 | 8 |

## Integrative case

Given a customer churn dataset, frame the question, clean and explore the data, build a baseline model, evaluate it honestly, and present a recommendation with its caveats to a non-technical stakeholder.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1632-final-protected | 25 | 25 | yes |
| MST-1632-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Problem framing and data | 5 |
| Exploratory data analysis | 5 |
| Statistics for data science | 5 |
| Modelling and evaluation | 5 |
| Pitfalls and communication | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1632-Q0001** (single-answer, Select ONE) Why hold out a separate test set when evaluating a model?

- A. To estimate performance on data the model has not seen **(key)**  
  _Rationale:_ Correct: a held-out set estimates generalisation.
- B. To give the model more data to learn from  
  _Rationale:_ The test set is not used for training.
- C. To guarantee the model is unbiased  
  _Rationale:_ A test set does not guarantee fairness.
- D. To speed up training  
  _Rationale:_ It does not affect training speed meaningfully.

**MST-1632-Q0002** (multiple-answer, Select TWO) Which TWO are forms of data leakage? (Select TWO.)

- A. Using future information not available at prediction time **(key)**  
  _Rationale:_ Correct: leaking the future inflates performance.
- B. Fitting a scaler on the full dataset before splitting **(key)**  
  _Rationale:_ Correct: that leaks test statistics into training.
- C. Splitting data before any preprocessing  
  _Rationale:_ Splitting first is the correct practice.
- D. Reporting a confidence interval  
  _Rationale:_ That is good practice, not leakage.

**MST-1632-Q0003** (single-answer, Select ONE) A p-value of 0.03 most accurately means what?

- A. If the null hypothesis were true, data this extreme would occur about 3% of the time **(key)**  
  _Rationale:_ Correct: that is the definition of a p-value.
- B. There is a 97% chance the result is real  
  _Rationale:_ A p-value is not the probability the hypothesis is true.
- C. The effect size is large  
  _Rationale:_ p-values do not measure effect size.
- D. The sample is representative  
  _Rationale:_ p-values say nothing about representativeness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
