# Descriptive and Inferential Statistics for Analysts

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0975` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Descriptive and Inferential Statistics for Analysts (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describing data
2. Probability foundations
3. Random variables and distributions
4. Sampling and estimation
5. Hypothesis testing
6. Relationships and communication

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Describing data (MASTEMY-DESIGN 17%)

- Worked applications: (1) Summarise a dataset with mean, median and standard deviation; (2) Choose a chart that reveals the shape of a distribution
- Common misconception addressed: Treating the mean as representative even for a highly skewed distribution
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Measures of centre and spread | 80 | 6 |
| M01L02 | Distributions and visual summaries | 80 | 6 |

### M02 Probability foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute a simple and a conditional probability; (2) Apply the rules of probability to a business scenario
- Common misconception addressed: Confusing P(A|B) with P(B|A)
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Probability rules and independence | 80 | 6 |
| M02L02 | Conditional probability and Bayes intuition | 80 | 6 |

### M03 Random variables and distributions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Use the normal distribution to find a probability; (2) Recognise when a binomial or Poisson model fits
- Common misconception addressed: Assuming every dataset is normally distributed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Common distributions | 80 | 6 |
| M03L02 | The normal distribution and z-scores | 80 | 6 |

### M04 Sampling and estimation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a confidence interval for a mean; (2) Explain how sample size affects the margin of error
- Common misconception addressed: Confusing the standard deviation with the standard error
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sampling distributions and the CLT | 80 | 6 |
| M04L02 | Confidence intervals | 80 | 6 |

### M05 Hypothesis testing (MASTEMY-DESIGN 16%)

- Worked applications: (1) State null and alternative hypotheses for a claim; (2) Run and interpret a two-sample test
- Common misconception addressed: Interpreting a p-value as the probability the null hypothesis is true
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Logic of significance testing | 80 | 6 |
| M05L02 | t-tests, p-values and errors | 80 | 6 |

### M06 Relationships and communication (MASTEMY-DESIGN 16%)

- Worked applications: (1) Interpret a correlation coefficient and a simple regression slope; (2) Write a conclusion separating statistical from practical significance
- Common misconception addressed: Reading correlation as proof of causation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Correlation and simple regression | 80 | 6 |
| M06L02 | Communicating uncertainty honestly | 80 | 6 |

## Integrative case

Evaluate whether a website change improved conversion: summarise the two groups, visualise the distributions, state hypotheses, choose and run an appropriate test, report the p-value and a confidence interval, and write a plain-language conclusion that distinguishes statistical from practical significance.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0975-final-protected | 30 | 30 | yes |
| MST-0975-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0975-Q0001** (single-answer, Select ONE) A dataset of incomes is strongly right-skewed. Which measure best represents a typical value?

- A. The median **(key)**  
  _Rationale:_ Correct: the median resists the pull of extreme high values in a skewed distribution.
- B. The mean  
  _Rationale:_ The mean is dragged upward by large outliers in a right-skewed distribution.
- C. The maximum  
  _Rationale:_ The maximum is an extreme, not a typical value.
- D. The range  
  _Rationale:_ The range measures spread, not a typical value.

**MST-0975-Q0002** (multiple-answer, Select TWO) Which TWO statements about a 95% confidence interval for a mean are correct? (Select TWO)

- A. A larger sample size tends to narrow the interval **(key)**  
  _Rationale:_ Correct: larger samples reduce the standard error, narrowing the interval.
- B. It is built from the sample's standard error **(key)**  
  _Rationale:_ Correct: the interval uses the standard error of the estimate.
- C. It guarantees the true mean lies inside this specific interval  
  _Rationale:_ The 95% refers to the long-run procedure, not certainty for one interval.
- D. It is the same as the standard deviation of the data  
  _Rationale:_ The interval and the data's standard deviation are different quantities.

**MST-0975-Q0003** (single-answer, Select ONE) What does a p-value of 0.03 mean in a hypothesis test?

- A. If the null hypothesis were true, data this extreme would occur about 3% of the time **(key)**  
  _Rationale:_ Correct: the p-value is the probability of data at least this extreme assuming the null is true.
- B. There is a 3% chance the null hypothesis is true  
  _Rationale:_ The p-value is not the probability that the null is true.
- C. The effect is 3% in size  
  _Rationale:_ A p-value is not an effect size.
- D. The result is practically important  
  _Rationale:_ Statistical significance does not establish practical importance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
