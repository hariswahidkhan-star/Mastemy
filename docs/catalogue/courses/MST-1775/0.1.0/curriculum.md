# Biostatistics for Health Sciences

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1775` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Biostatistics for Health Sciences (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Summarise and display health data with descriptive statistics
2. Apply probability and sampling distributions to health data
3. Perform and interpret estimation and hypothesis tests
4. Choose and interpret regression and appropriate tests for study data

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Describing data (25%, MASTEMY-DESIGN)

- Worked applications: (1) Choose mean or median for a skewed distribution; (2) Select an appropriate chart for a given variable type
- Common misconception addressed: Reporting the mean for a strongly skewed distribution without noting the median
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Variable types and levels of measurement | 60 | 6 |
| M01L02 | Measures of central tendency | 60 | 6 |
| M01L03 | Measures of spread | 60 | 6 |
| M01L04 | Displaying distributions | 60 | 6 |
### M02 Probability and sampling (25%, MASTEMY-DESIGN)

- Worked applications: (1) Use the normal distribution to find a probability; (2) Explain how sample size affects the standard error
- Common misconception addressed: Confusing the standard deviation with the standard error of the mean
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Basic probability rules | 60 | 6 |
| M02L02 | Probability distributions | 60 | 6 |
| M02L03 | The normal distribution | 60 | 6 |
| M02L04 | Sampling distributions and the standard error | 60 | 6 |
### M03 Estimation and testing (25%, MASTEMY-DESIGN)

- Worked applications: (1) Interpret a 95% confidence interval for a mean difference; (2) Decide whether a result is statistically significant at a stated alpha
- Common misconception addressed: Interpreting a p-value as the probability that the null hypothesis is true
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Confidence intervals | 60 | 6 |
| M03L02 | Hypothesis testing and p-values | 60 | 6 |
| M03L03 | Type I and Type II errors and power | 60 | 6 |
| M03L04 | t-tests and chi-square tests | 60 | 6 |
### M04 Relationships and modelling (25%, MASTEMY-DESIGN)

- Worked applications: (1) Interpret a regression coefficient in context; (2) Match a data scenario to the correct statistical test
- Common misconception addressed: Assuming a strong correlation proves one variable causes the other
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Correlation | 60 | 6 |
| M04L02 | Linear regression | 60 | 6 |
| M04L03 | Logistic regression and odds ratios | 60 | 6 |
| M04L04 | Choosing the right statistical test | 60 | 6 |

## Integrative case

A research team has data from a trial comparing a new treatment to usual care. Describe the data, estimate the effect with a confidence interval, test the hypothesis, choose the right analysis, and interpret the findings honestly.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1775-final-protected | 72 | 72 | yes |
| MST-1775-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Describing data | 18 |
| Probability and sampling | 18 |
| Estimation and testing | 18 |
| Relationships and modelling | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1775-Q0001** (single-answer, Select ONE) A trial reports a mean difference in blood pressure of 5 mmHg with a 95% confidence interval of 2 to 8 mmHg. The best interpretation is:

- A. The data are compatible with a true effect plausibly between 2 and 8 mmHg, and the effect is unlikely to be zero **(key)**  
  _Rationale:_ Correct: the interval excludes zero and gives a plausible range for the true effect.
- B. There is a 95% chance the true difference is exactly 5 mmHg  
  _Rationale:_ The point estimate is 5, but the interval, not a single value, carries the uncertainty; it is not a 95% chance of exactly 5.
- C. The result is not significant because an interval was reported  
  _Rationale:_ An interval that excludes zero indicates significance at the 5% level.
- D. The sample size must have been very small  
  _Rationale:_ Interval width relates to precision, but the interval itself does not tell us the size directly as 'very small'.**MST-1775-Q0002** (single-answer, Select ONE) A p-value of 0.03 for a two-group comparison (alpha 0.05) most correctly means:

- A. If the null hypothesis were true, data this extreme or more would occur about 3% of the time **(key)**  
  _Rationale:_ Correct: the p-value is the probability of the observed or more extreme data given the null hypothesis.
- B. There is a 3% chance the null hypothesis is true  
  _Rationale:_ A p-value is not the probability that the null hypothesis is true.
- C. The effect size is large  
  _Rationale:_ A small p-value does not by itself indicate a large or important effect.
- D. The result will replicate 97% of the time  
  _Rationale:_ The p-value does not give the probability of replication.**MST-1775-Q0003** (multiple-answer, Select TWO) Which TWO statements about the standard error of the mean are correct? (Select TWO)

- A. It measures the precision of the sample mean as an estimate **(key)**  
  _Rationale:_ Correct: the standard error quantifies how precisely the sample mean estimates the population mean.
- B. It gets smaller as the sample size increases **(key)**  
  _Rationale:_ Correct: larger samples give a smaller standard error.
- C. It is the same thing as the standard deviation of the data  
  _Rationale:_ The standard deviation describes spread of individual values; the standard error describes spread of the mean.
- D. It increases without limit as sample size grows  
  _Rationale:_ The standard error decreases, not increases, with larger samples.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
