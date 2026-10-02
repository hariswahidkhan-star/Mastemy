# Probability and Statistical Inference for Machine Learning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0434` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Apply probability rules and conditional probability
2. Work with common discrete and continuous distributions
3. Use expectation, variance and covariance
4. Apply Bayes' theorem and reason about priors
5. Estimate parameters and build confidence intervals
6. Perform and interpret hypothesis tests responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Probability foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute the probability of a compound event; (2) Decide whether two events are independent from data
- Common misconception addressed: Confusing P(A|B) with P(B|A)
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Sample spaces, events and rules | 140 | 8 |
| M01L02 | Conditional probability and independence | 140 | 8 |

### M02 Random variables and distributions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model a count process with a suitable distribution; (2) Standardise values and read a normal table
- Common misconception addressed: Applying a discrete model to continuous data
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Discrete distributions | 140 | 8 |
| M02L02 | Continuous distributions and the normal | 140 | 8 |

### M03 Expectation and variance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute expectation and variance for a distribution; (2) Interpret a correlation between two features
- Common misconception addressed: Reading correlation as causation
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Expectation, variance and moments | 140 | 8 |
| M03L02 | Covariance, correlation and the CLT | 140 | 8 |

### M04 Bayesian reasoning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Update a belief with new evidence using Bayes; (2) Explain how a prior influences a posterior
- Common misconception addressed: Ignoring the base rate when updating
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bayes' theorem and updating | 140 | 8 |
| M04L02 | Priors, likelihood and posteriors | 140 | 8 |

### M05 Estimation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build a confidence interval for a mean; (2) Use a bootstrap to estimate uncertainty
- Common misconception addressed: Interpreting a 95% interval as a 95% probability for the parameter
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Point estimation and bias | 140 | 8 |
| M05L02 | Confidence intervals and the bootstrap | 140 | 8 |

### M06 Hypothesis testing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Run and interpret a two-sample test; (2) Adjust for multiple comparisons
- Common misconception addressed: Treating a small p-value as proof of a large effect
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Tests, p-values and errors | 140 | 8 |
| M06L02 | Multiple testing and practical significance | 140 | 8 |

## Integrative case

An analyst must decide whether a new model is genuinely better than the old one on a held-out sample. Choose an appropriate estimator and test, state assumptions, compute a confidence interval, and interpret the result and its uncertainty for a non-statistical stakeholder.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0434-final-protected | 30 | 30 | yes |
| MST-0434-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Probability foundations | 5 |
| Random variables and distributions | 5 |
| Expectation and variance | 5 |
| Bayesian reasoning | 5 |
| Estimation | 5 |
| Hypothesis testing | 5 |

Minimum reviewed item bank: 546 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0434-Q0001** (single-answer, Select ONE) A test is 99% accurate for a disease affecting 1 in 1000 people. A random positive is most likely to be:

- A. A false positive, because the base rate is very low **(key)**  
  _Rationale:_ Correct: with a rare condition, false positives can outnumber true positives.
- B. A true positive, because the test is 99% accurate  
  _Rationale:_ Accuracy alone ignores the low base rate.
- C. Impossible to reason about without more tests  
  _Rationale:_ Bayes' theorem lets us reason with the given numbers.
- D. Equally likely true or false  
  _Rationale:_ The low prior makes false positives more likely here.

**MST-0434-Q0002** (multiple-answer, Select TWO) Which TWO statements about a 95% confidence interval are correct? (Select TWO.)

- A. It is built by a procedure that captures the true value 95% of the time over repeated samples **(key)**  
  _Rationale:_ Correct: the guarantee is about the long-run procedure.
- B. A wider interval reflects more uncertainty in the estimate **(key)**  
  _Rationale:_ Correct: width grows with variance and shrinks with sample size.
- C. There is a 95% probability the true parameter lies in this particular interval  
  _Rationale:_ The parameter is fixed; the probability statement is about the procedure.
- D. It guarantees the sample mean equals the population mean  
  _Rationale:_ It does not; it quantifies uncertainty around the estimate.

**MST-0434-Q0003** (single-answer, Select ONE) A study reports p = 0.001. What does this most directly indicate?

- A. The data are unlikely under the null hypothesis; it does not by itself show a large effect **(key)**  
  _Rationale:_ Correct: a small p-value concerns surprise under the null, not effect size.
- B. The effect is large and important  
  _Rationale:_ p-values do not measure effect size or importance.
- C. The result will replicate for certain  
  _Rationale:_ A single p-value does not guarantee replication.
- D. The null hypothesis is proven false  
  _Rationale:_ Hypothesis tests give evidence, not proof.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
