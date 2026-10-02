# Experimental Design and A/B Testing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0976` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-DAT-SK-BTE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Experimental Design and A/B Testing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Foundations of experimentation
2. Designing an A/B test
3. Statistics for experiments
4. Power and sample size
5. Analysis and pitfalls
6. Beyond the simple A/B test

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on tool operation or production data work; those are taught through instructor-built demonstrations and walkthroughs.

## Modules

### M01 Foundations of experimentation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Explain why randomization supports a causal claim; (2) Identify a confounder a controlled experiment removes
- Common misconception addressed: Inferring causation from an observational difference
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why experiment: causation vs correlation | 80 | 5 |
| M01L02 | Randomization, control groups and treatment | 80 | 5 |

### M02 Designing an A/B test (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define a primary metric and a guardrail for a feature test; (2) Choose the right randomization unit for a change
- Common misconception addressed: Optimising a primary metric while ignoring harmful guardrail effects
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Hypotheses, metrics and the OEC | 80 | 5 |
| M02L02 | Unit of randomization and guardrail metrics | 80 | 5 |

### M03 Statistics for experiments (MASTEMY-DESIGN 17%)

- Worked applications: (1) Interpret a confidence interval for a conversion lift; (2) Distinguish statistical from practical significance
- Common misconception addressed: Reading a non-significant result as proof of no effect
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Hypothesis tests, p-values and significance | 80 | 5 |
| M03L02 | Confidence intervals and effect sizes | 80 | 5 |

### M04 Power and sample size (MASTEMY-DESIGN 17%)

- Worked applications: (1) Estimate sample size for a target minimum detectable effect; (2) Decide how long to run a test given traffic
- Common misconception addressed: Stopping a test early the moment it looks significant (peeking)
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Statistical power and the role of sample size | 80 | 5 |
| M04L02 | Minimum detectable effect and test duration | 80 | 5 |

### M05 Analysis and pitfalls (MASTEMY-DESIGN 16%)

- Worked applications: (1) Detect a sample-ratio mismatch and respond; (2) Adjust for multiple comparisons across many metrics
- Common misconception addressed: Running many segment comparisons and chasing a spurious winner
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reading results and segmenting safely | 80 | 5 |
| M05L02 | Common pitfalls: peeking, multiple comparisons, SRM | 80 | 5 |

### M06 Beyond the simple A/B test (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain how variance reduction speeds up a test; (2) Pick a design when a clean A/B test is not feasible
- Common misconception addressed: Treating every rollout as a fully randomized experiment when it is not
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Sequential tests, CUPED and variance reduction | 80 | 5 |
| M06L02 | Advanced designs and building an experiment culture | 80 | 5 |

## Integrative case

Design and analyse an A/B test for a checkout change: state the hypothesis and OEC with guardrails, pick the randomization unit, compute the sample size and duration for a target MDE, then analyse results while avoiding peeking, SRM and multiple-comparison traps.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0976-final-protected | 42 | 42 | yes |
| MST-0976-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Foundations of experimentation | 7 |
| Designing an A/B test | 7 |
| Statistics for experiments | 7 |
| Power and sample size | 7 |
| Analysis and pitfalls | 7 |
| Beyond the simple A/B test | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0976-Q0001** (single-answer, Select ONE) Why does randomly assigning users to control and treatment support a causal conclusion?

- A. Randomization balances confounders on average, so outcome differences are attributable to the treatment **(key)**  
  _Rationale:_ Correct: random assignment makes the groups comparable except for the treatment.
- B. It guarantees the sample is representative of all users  
  _Rationale:_ Randomization balances groups against each other; it does not ensure population representativeness.
- C. It removes the need for a control group  
  _Rationale:_ A control group is still required for comparison.
- D. It makes the p-value always significant  
  _Rationale:_ Randomization does not control significance, which depends on effect and sample size.

**MST-0976-Q0002** (multiple-answer, Select ALL that apply) Which statements about experiment analysis are correct? (Select TWO)

- A. Repeatedly checking results and stopping when significant inflates the false-positive rate **(key)**  
  _Rationale:_ Correct: peeking without correction increases spurious significant findings.
- B. A statistically significant lift may still be too small to matter in practice **(key)**  
  _Rationale:_ Correct: statistical and practical significance are distinct.
- C. A non-significant result proves the treatment has no effect  
  _Rationale:_ It fails to detect an effect; it does not prove none exists.
- D. Testing many metrics needs no adjustment for multiple comparisons  
  _Rationale:_ Multiple comparisons require adjustment to control false positives.

**MST-0976-Q0003** (single-answer, Select ONE) What does statistical power describe in an experiment?

- A. The probability of detecting a true effect of a given size if it exists **(key)**  
  _Rationale:_ Correct: power is the chance of correctly rejecting the null when the effect is real.
- B. The probability that the null hypothesis is true  
  _Rationale:_ Power is not the probability the null is true.
- C. The size of the observed effect  
  _Rationale:_ Effect size is separate from power.
- D. The significance threshold chosen for the test  
  _Rationale:_ That is alpha, the false-positive rate, not power.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
