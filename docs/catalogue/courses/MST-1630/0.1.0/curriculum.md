# Survey Design and Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1630` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-SDA-002 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design survey questions that are clear, unbiased and valid
2. Choose sampling methods and understand their error
3. Reduce and account for non-response and other biases
4. Analyse survey data with appropriate weighting and summaries
5. Report survey findings with honest margins of error

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Question design (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rewrite a leading question into a neutral one; (2) Fix a double-barrelled question and an unbalanced scale
- Common misconception addressed: Writing a question that measures two things at once
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Writing clear, unbiased questions | 96 | 8 |
| M01L02 | Response scales, order effects and validity | 96 | 8 |

### M02 Sampling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a sampling method for a stated population and budget; (2) Explain why a convenience sample cannot support population claims
- Common misconception addressed: Generalising from a self-selected sample to the whole population
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Probability vs non-probability sampling | 96 | 8 |
| M02L02 | Sample size and sampling error | 96 | 8 |

### M03 Bias and non-response (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify the likely bias in a described survey rollout; (2) Propose a way to reduce non-response bias
- Common misconception addressed: Assuming a large sample removes non-response bias
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Coverage, non-response and response bias | 96 | 8 |
| M03L02 | Mode effects and social desirability | 96 | 8 |

### M04 Analysis and weighting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide when weighting is needed and what it corrects; (2) Summarise a Likert item honestly without overstating precision
- Common misconception addressed: Reporting a mean of an ordinal scale as if it were interval data without caveat
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Summarising survey responses | 96 | 8 |
| M04L02 | Weighting and adjusting for the sample | 96 | 8 |

### M05 Reporting (MASTEMY-DESIGN 20%)

- Worked applications: (1) State a result with its margin of error in one plain sentence; (2) Spot an overstated claim that ignores the margin of error
- Common misconception addressed: Reporting a point percentage without any margin of error
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Margins of error and confidence | 96 | 8 |
| M05L02 | Visualising and communicating survey results | 96 | 8 |

## Integrative case

A product team wants to survey users about a proposed feature. Design unbiased questions, choose a sampling method the budget allows and state its limits, plan how to reduce non-response bias, decide whether weighting is needed, and report the headline result with an honest margin of error.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1630-final-protected | 25 | 25 | yes |
| MST-1630-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Question design | 5 |
| Sampling | 5 |
| Bias and non-response | 5 |
| Analysis and weighting | 5 |
| Reporting | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1630-Q0001** (single-answer, Select ONE) Why can a convenience sample not support claims about the whole population?

- A. It is self-selected, so it is not representative and has unknown bias **(key)**  
  _Rationale:_ Correct: non-probability samples cannot be generalised reliably.
- B. It is always too small  
  _Rationale:_ Size is not the core issue; representativeness is.
- C. It has no sampling error at all  
  _Rationale:_ It has bias that a margin of error cannot fix.
- D. Convenience samples are always representative  
  _Rationale:_ They are typically not representative.

**MST-1630-Q0002** (multiple-answer, Select TWO) Which TWO describe poorly written survey questions? (Select TWO.)

- A. A double-barrelled question asking about two things at once **(key)**  
  _Rationale:_ Correct: double-barrelled questions cannot be answered cleanly.
- B. A leading question that suggests a preferred answer **(key)**  
  _Rationale:_ Correct: leading wording biases responses.
- C. A single, neutral question with a balanced scale  
  _Rationale:_ That is a well-designed question.
- D. A clearly defined time reference  
  _Rationale:_ A clear time reference improves a question.

**MST-1630-Q0003** (single-answer, Select ONE) A survey reports 62% support. What makes this honest?

- A. Reporting it with a margin of error, e.g. 62% plus or minus 3 points **(key)**  
  _Rationale:_ Correct: a margin of error conveys the estimate's precision.
- B. Stating 62% as an exact, certain figure  
  _Rationale:_ That overstates precision and hides sampling error.
- C. Dropping the sample size from the report  
  _Rationale:_ Omitting sample size obscures reliability.
- D. Rounding to 60% to look cleaner  
  _Rationale:_ Rounding does not address the missing margin of error.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
