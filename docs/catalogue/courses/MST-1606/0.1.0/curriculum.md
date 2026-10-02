# Statistics for Data Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1606` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-DAT-SK-SDA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Statistics for Data Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describing data
2. Probability foundations
3. Sampling and estimation
4. Hypothesis testing
5. Relationships and pitfalls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate full statistical modelling on real data; methods are taught through instructor-built walkthroughs.

## Modules

### M01 Describing data (MASTEMY-DESIGN 18%)

- Worked applications: (1) Summarise a sample with centre and spread; (2) Read a histogram to judge shape and skew
- Common misconception addressed: Treating standard deviation and variance as interchangeable units
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Variables, distributions and summary statistics | 96 | 6 |
| M01L02 | Measures of spread and shape | 96 | 6 |

### M02 Probability foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute the probability of at least one success in several trials; (2) Apply the complement rule to a reliability question
- Common misconception addressed: Assuming independent events are mutually exclusive
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Probability basics, independence and conditional probability | 96 | 6 |
| M02L02 | Common distributions: normal and binomial | 96 | 6 |

### M03 Sampling and estimation (MASTEMY-DESIGN 22%)

- Worked applications: (1) Build and interpret a 95% confidence interval for a mean; (2) Explain how sample size affects the margin of error
- Common misconception addressed: Interpreting a 95% CI as a 95% probability the parameter is in this interval
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sampling, sampling distributions and the central limit theorem | 96 | 6 |
| M03L02 | Confidence intervals and margin of error | 96 | 6 |

### M04 Hypothesis testing (MASTEMY-DESIGN 24%)

- Worked applications: (1) State null and alternative hypotheses for an A/B test; (2) Decide significance from a p-value and a chosen alpha
- Common misconception addressed: Reading a non-significant result as proof of no effect
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Null and alternative hypotheses, p-values and errors | 96 | 6 |
| M04L02 | Choosing a test: t-tests and chi-square basics | 96 | 6 |

### M05 Relationships and pitfalls (MASTEMY-DESIGN 16%)

- Worked applications: (1) Interpret a correlation coefficient and a scatter plot; (2) Identify a confounder in a reported association
- Common misconception addressed: Reading correlation as causation
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Correlation and simple linear regression basics | 96 | 6 |
| M05L02 | Confounding, bias and common statistical pitfalls | 96 | 6 |

## Integrative case

A product team ran an A/B test on a checkout change. Describe the two samples, state the hypotheses, choose an appropriate test, interpret the p-value and a confidence interval, and advise whether the observed lift is practically meaningful, not just statistically detectable.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1606-final-protected | 25 | 25 | yes |
| MST-1606-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Describing data | 5 |
| Probability foundations | 5 |
| Sampling and estimation | 5 |
| Hypothesis testing | 5 |
| Relationships and pitfalls | 5 |

Minimum reviewed item bank: 338 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1606-Q0001** (single-answer, Select ONE) A test returns p = 0.03 with alpha set at 0.05. What is the correct conclusion?

- A. The result is statistically significant at the 0.05 level; reject the null hypothesis **(key)**  
  _Rationale:_ Correct: p is below alpha, so you reject the null at that level.
- B. The null hypothesis is proven true  
  _Rationale:_ Hypothesis tests never prove the null; they fail to reject or reject it.
- C. There is a 3% chance the alternative is false  
  _Rationale:_ A p-value is not the probability that a hypothesis is true or false.
- D. The effect is definitely large and important  
  _Rationale:_ Significance speaks to detectability, not to the practical size of the effect.

**MST-1606-Q0002** (multiple-answer, Select ALL that apply) Which statements about a 95% confidence interval for a mean are correct? (Select TWO)

- A. Over many repeated samples, about 95% of such intervals would contain the true mean **(key)**  
  _Rationale:_ Correct: the 95% refers to the long-run capture rate of the procedure.
- B. A larger sample size tends to produce a narrower interval **(key)**  
  _Rationale:_ Correct: more data reduces the standard error and narrows the interval.
- C. There is a 95% probability the true mean lies in this specific interval  
  _Rationale:_ The parameter is fixed; the 95% describes the procedure, not this one interval.
- D. The interval always contains the sample mean's opposite value  
  _Rationale:_ This is not a meaningful property of a confidence interval.

**MST-1606-Q0003** (single-answer, Select ONE) Ice-cream sales and drowning incidents are positively correlated. What most likely explains this?

- A. A confounding variable, hot weather, drives both **(key)**  
  _Rationale:_ Correct: a common cause (hot weather) produces the association without direct causation.
- B. Ice cream causes drowning  
  _Rationale:_ There is no plausible direct causal mechanism; a confounder is the likely cause.
- C. Drowning causes ice-cream sales  
  _Rationale:_ This reverses an implausible causal claim and still ignores the confounder.
- D. The correlation must be a calculation error  
  _Rationale:_ The correlation is real; it is explained by a confounder, not an error.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
