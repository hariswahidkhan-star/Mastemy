# Marketing Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1624` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-DAT-SK-MA-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define marketing metrics across the funnel from awareness to retention
2. Measure campaign performance and channel contribution
3. Explain attribution models and their trade-offs
4. Analyse customer value, segmentation and cohort behaviour
5. Interpret experiments and avoid common marketing-data pitfalls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The marketing funnel and metrics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map five metrics to the correct funnel stage; (2) Compute conversion rate from a funnel and spot a leaky stage
- Common misconception addressed: Treating a vanity metric like impressions as a success measure
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Funnel stages and stage-specific metrics | 96 | 8 |
| M01L02 | Rates, costs and conversion definitions | 96 | 8 |

### M02 Campaign and channel measurement (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare two campaigns on ROAS and cost per acquisition; (2) Design a UTM scheme for a multi-channel launch
- Common misconception addressed: Crediting the last-clicked channel with the entire outcome
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Campaign performance and ROAS | 96 | 8 |
| M02L02 | Channel contribution and tracking (UTMs) | 96 | 8 |

### M03 Attribution (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply first-touch and last-touch attribution to one journey and compare; (2) Explain why a channel can look profitable in attribution yet add no incremental sales
- Common misconception addressed: Believing an attribution model reveals true causation
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Single-touch vs multi-touch models | 96 | 8 |
| M03L02 | Incrementality and the limits of attribution | 96 | 8 |

### M04 Customer value and segments (MASTEMY-DESIGN 20%)

- Worked applications: (1) Estimate a simple customer lifetime value and state its assumptions; (2) Read a cohort retention table to spot a drop-off week
- Common misconception addressed: Optimising acquisition while ignoring retention and lifetime value
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | CLV, retention and churn | 96 | 8 |
| M04L02 | Segmentation and cohort analysis | 96 | 8 |

### M05 Experiments and pitfalls (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide whether an observed campaign lift is likely real or seasonal; (2) Identify a selection bias in a 'customers who used the coupon' analysis
- Common misconception addressed: Reading correlation between spend and sales as proof the spend caused the sales
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | A/B tests and lift measurement | 96 | 8 |
| M05L02 | Bias, seasonality and data-quality pitfalls | 96 | 8 |

## Integrative case

A marketing lead must decide where to move next quarter's budget. Measure each channel's cost per acquisition and ROAS, reconcile what last-touch attribution says against an incrementality view, factor in customer lifetime value and retention by cohort, and recommend a reallocation while naming the biases that could mislead the decision.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1624-final-protected | 25 | 25 | yes |
| MST-1624-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The marketing funnel and metrics | 5 |
| Campaign and channel measurement | 5 |
| Attribution | 5 |
| Customer value and segments | 5 |
| Experiments and pitfalls | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1624-Q0001** (single-answer, Select ONE) Why can last-touch attribution overstate a channel's value?

- A. It credits the final touchpoint with the whole outcome, ignoring earlier influences **(key)**  
  _Rationale:_ Correct: last-touch assigns all credit to the last interaction.
- B. It always undercounts conversions  
  _Rationale:_ It misallocates credit rather than undercounting totals.
- C. It measures incrementality directly  
  _Rationale:_ Attribution is not the same as incrementality.
- D. It cannot be tracked with UTMs  
  _Rationale:_ UTMs support, not prevent, last-touch tracking.

**MST-1624-Q0002** (multiple-answer, Select TWO) Which TWO metrics best reflect long-term marketing health rather than vanity? (Select TWO.)

- A. Customer lifetime value **(key)**  
  _Rationale:_ Correct: CLV captures long-term value per customer.
- B. Cohort retention rate **(key)**  
  _Rationale:_ Correct: retention shows whether customers stay and keep paying.
- C. Total impressions served  
  _Rationale:_ Impressions do not show value or action.
- D. Number of social media likes  
  _Rationale:_ Likes are a vanity metric with weak link to value.

**MST-1624-Q0003** (single-answer, Select ONE) Spend and sales both rose during a campaign. What is the safest conclusion?

- A. The rise may be partly seasonal or coincidental; an experiment is needed to show incrementality **(key)**  
  _Rationale:_ Correct: correlation during a campaign does not prove the spend caused the sales.
- B. The spend definitely caused all the extra sales  
  _Rationale:_ Correlation alone cannot establish causation.
- C. The campaign had no effect  
  _Rationale:_ That is equally unsupported without a test.
- D. Attribution has proven causation  
  _Rationale:_ Attribution allocates credit, it does not prove causation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
