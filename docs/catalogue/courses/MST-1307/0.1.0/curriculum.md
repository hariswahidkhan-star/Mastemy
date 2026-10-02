# Mathematics for AI: Probability and Statistics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1307` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Interpret probability as a measure of uncertainty
2. Apply basic rules of probability to simple problems
3. Describe key probability distributions used in AI
4. Summarise data with descriptive statistics
5. Reason about sampling, variation and inference at a conceptual level

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Probability basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute the probability of a simple event; (2) Apply Bayes' idea to a screening example
- Common misconception addressed: Confusing P(A|B) with P(B|A)
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Sample spaces and events | 48 | 4 |
| M01L02 | Conditional probability and independence | 48 | 4 |

### M02 Random variables (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute an expected value for a payout; (2) Interpret variance as spread
- Common misconception addressed: Treating expectation as a guaranteed outcome
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Discrete and continuous variables | 48 | 4 |
| M02L02 | Expectation and variance | 48 | 4 |

### M03 Distributions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a scenario to a distribution; (2) Read a normal curve's spread
- Common misconception addressed: Assuming all data is normally distributed
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Normal, Bernoulli and binomial | 48 | 4 |
| M03L02 | When each distribution applies | 48 | 4 |

### M04 Descriptive statistics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Summarise a small dataset; (2) Explain why correlation is not causation
- Common misconception addressed: Reading causation into correlation
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Centre, spread and shape | 48 | 4 |
| M04L02 | Correlation and its traps | 48 | 4 |

### M05 Sampling and inference (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a biased sampling method; (2) Interpret a margin of error loosely
- Common misconception addressed: Treating a small sample as the whole population
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Samples, populations and bias | 48 | 4 |
| M05L02 | Confidence and uncertainty intuition | 48 | 4 |

## Integrative case

An analyst reports that a model is '92% accurate'. Use probability and statistics ideas to question what that number means, what sample it came from, and what uncertainty remains.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1307-final-protected | 25 | 25 | yes |
| MST-1307-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Probability basics | 5 |
| Random variables | 5 |
| Distributions | 5 |
| Descriptive statistics | 5 |
| Sampling and inference | 5 |

Minimum reviewed item bank: 214 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1307-Q0001** (single-answer, Select ONE) A test is 99% accurate for a rare disease. A positive result alone does NOT strongly imply disease mainly because:

- A. With a rare condition, false positives can outnumber true positives **(key)**  
  _Rationale:_ Correct: base rates make positives mostly false when the condition is rare.
- B. 99% accuracy means the test is useless  
  _Rationale:_ The test is useful but base rate still matters.
- C. Probability does not apply to medicine  
  _Rationale:_ Probability applies directly here.
- D. Accuracy and probability are unrelated  
  _Rationale:_ They are linked through base rates.

**MST-1307-Q0002** (multiple-answer, Select TWO) Which TWO statements about correlation are correct? (Select TWO.)

- A. Correlation measures how two variables move together **(key)**  
  _Rationale:_ Correct: it quantifies co-movement.
- B. Correlation does not by itself prove causation **(key)**  
  _Rationale:_ Correct: a third factor may explain both.
- C. A strong correlation guarantees one causes the other  
  _Rationale:_ Causation is not implied by correlation.
- D. Correlation can only be exactly zero or one  
  _Rationale:_ It ranges continuously between -1 and 1.

**MST-1307-Q0003** (single-answer, Select ONE) What does the expected value of a random variable represent?

- A. The long-run average outcome over many repetitions **(key)**  
  _Rationale:_ Correct: it is the probability-weighted mean.
- B. The single outcome that will definitely occur  
  _Rationale:_ It is not a guaranteed single outcome.
- C. The largest possible outcome  
  _Rationale:_ It is an average, not a maximum.
- D. The variance of the variable  
  _Rationale:_ Variance measures spread, not the mean.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
