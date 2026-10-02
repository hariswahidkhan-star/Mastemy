# SOA Exam P: Probability

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0078` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | SOA (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed |
| Version basis | DESIGN ASSUMPTION - official outline not retrieved (network egress blocked on issuer site) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked on 2026-10-02; structure is a DESIGN ASSUMPTION pending official confirmation |
| Legacy IDs |  |
| Planned time | T = 12000 min; instruction I = 9600 min (80%); assessment A = 2400 min (20%) |
| Assessment split | lesson checks 600 / module checks 840 / cumulative 960 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the axioms of probability, counting methods and conditional probability (design-assumption scope, pending official confirmation)
2. Work with univariate discrete and continuous random variables, their expectations and moments
3. Analyse multivariate random variables, covariance and transformations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 General probability (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'General probability' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'General probability'
- Module check: 280 items / 280 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Set theory, axioms and combinatorics | 1600 | 6 |
| M01L02 | Conditional probability and Bayes' theorem | 1600 | 6 |

### M02 Univariate random variables (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Univariate random variables' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Univariate random variables'
- Module check: 280 items / 280 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Discrete distributions and expectation | 1600 | 6 |
| M02L02 | Continuous distributions and moments | 1600 | 6 |

### M03 Multivariate random variables (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Multivariate random variables' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Multivariate random variables'
- Module check: 280 items / 280 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Joint, marginal and conditional distributions | 1600 | 6 |
| M03L02 | Covariance, correlation and transformations | 1600 | 6 |

## Integrative case

An actuarial student models claim counts and sizes: chooses a discrete distribution for frequency and a continuous one for severity, computes an expected aggregate loss, and interprets the variance for a pricing memo.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0078-practice-form-A | 360 | 360 | yes |
| MST-0078-practice-form-B | 360 | 360 | no (optional practice) |
| MST-0078-practice-form-C | 360 | 360 | no (optional practice) |
| MST-0078-final-protected | 360 | 360 | yes |

| Domain | Items per form |
|---|---|
| General probability | 120 |
| Univariate random variables | 120 |
| Multivariate random variables | 120 |

Minimum reviewed item bank: 3192 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0078-Q0001** (single-answer, Select ONE) Two events A and B are independent with P(A)=0.3 and P(B)=0.5. What is P(A and B)?

- A. 0.15 **(key)**  
  _Rationale:_ Correct: for independent events P(A and B)=P(A)P(B)=0.3x0.5=0.15.
- B. 0.80  
  _Rationale:_ 0.80 is P(A)+P(B)-P(A and B) only under a different setup; it is the union-style sum, not the intersection.
- C. 0.50  
  _Rationale:_ 0.50 is P(B) alone and ignores independence multiplication.
- D. 0.00  
  _Rationale:_ Independent events with positive probabilities have a positive joint probability.

**MST-0078-Q0002** (single-answer, Select ONE) For a continuous random variable, the expected value E[X] is best described as which of the following?

- A. The integral of x times the probability density function over its support **(key)**  
  _Rationale:_ Correct: E[X]=integral of x f(x) dx over the support for a continuous variable.
- B. The most likely single value (the mode)  
  _Rationale:_ The mode is the density's peak, not the mean.
- C. The middle value (the median) in all cases  
  _Rationale:_ The median equals the mean only for symmetric distributions, not in general.
- D. The range of the variable  
  _Rationale:_ The range is max minus min, unrelated to expectation.

**MST-0078-Q0003** (multiple-answer, Select TWO) Select TWO quantities that require the joint distribution of two random variables to compute. (Select TWO.)

- A. The covariance of X and Y **(key)**  
  _Rationale:_ Correct: covariance depends on the joint distribution of X and Y.
- B. The correlation of X and Y **(key)**  
  _Rationale:_ Correct: correlation is derived from covariance and thus the joint distribution.
- C. The mean of X alone  
  _Rationale:_ The marginal mean of X needs only X's distribution.
- D. The variance of Y alone  
  _Rationale:_ The marginal variance of Y needs only Y's distribution.
- E. The median of X alone  
  _Rationale:_ The marginal median of X needs only X's distribution.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
