# Marketing Attribution, Experiments, and Budget Allocation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1140` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course design (vendor-neutral). No third-party exam code, weighting or syllabus is claimed; content to be verified against current sources at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none (original Mastemy design) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Marketing Attribution, Experiments, and Budget Allocation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain marketing attribution models and their trade-offs
2. Design marketing experiments for causal measurement
3. Allocate budget across channels using evidence
4. Build measurement, tracking and reporting foundations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Attribution models (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compare last-click and linear attribution on one journey; (2) Choose an attribution approach for a goal
- Common misconception addressed: Trusting last-click attribution as literal truth
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Single-touch vs multi-touch attribution | 120 | 8 |
| M01L02 | Data-driven and media-mix approaches | 120 | 8 |

### M02 Marketing experiments (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Design a geo holdout to measure incrementality; (2) Interpret an incrementality result
- Common misconception addressed: Confusing correlation in attribution with causal lift
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Incrementality and geo/holdout tests | 120 | 8 |
| M02L02 | Designing a clean experiment | 120 | 8 |

### M03 Budget allocation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Allocate budget by marginal return; (2) Reallocate from a saturated channel
- Common misconception addressed: Spreading budget evenly regardless of marginal return
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Marginal ROI and diminishing returns | 120 | 8 |
| M03L02 | Reallocating across channels | 120 | 8 |

### M04 Measurement foundations (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Design a UTM and tracking convention; (2) Build a reporting cadence for decisions
- Common misconception addressed: Building reports on inconsistent, untagged tracking data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Tracking, UTMs and data quality | 120 | 8 |
| M04L02 | Reporting and decision cadence | 120 | 8 |

## Integrative case

A marketing analyst must decide how to split next quarter's budget. They must compare attribution models, design an incrementality experiment to check causal lift, allocate budget by marginal return, and set up clean tracking and reporting, defending the plan against an executive who trusts last-click reports.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1140-final-protected | 40 | 40 | yes |
| MST-1140-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Attribution models | 10 |
| Marketing experiments | 10 |
| Budget allocation | 10 |
| Measurement foundations | 10 |

Minimum reviewed item bank: 376 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1140-Q0001** (single-answer, Select ONE) Last-click attribution tends to:

- A. Over-credit the final touchpoint and undervalue earlier ones **(key)**  
  _Rationale:_ Correct: it ignores assisting touchpoints.
- B. Split credit evenly across all touchpoints  
  _Rationale:_ That is linear attribution.
- C. Measure true incremental lift  
  _Rationale:_ Attribution is not the same as incrementality.
- D. Credit only the first touchpoint  
  _Rationale:_ That is first-click attribution.

**MST-1140-Q0002** (multiple-answer, Select TWO) Which TWO are true of incrementality experiments? (Select TWO.)

- A. They estimate causal lift by comparing exposed and holdout groups **(key)**  
  _Rationale:_ Correct: holdouts isolate the channel's causal effect.
- B. They can reveal that attributed conversions were not incremental **(key)**  
  _Rationale:_ Correct: some attributed sales would have happened anyway.
- C. They are identical to last-click attribution  
  _Rationale:_ They measure causality, which attribution does not.
- D. They require no control or holdout group  
  _Rationale:_ A holdout is essential.

**MST-1140-Q0003** (single-answer, Select ONE) Allocating budget by marginal return means:

- A. Shifting spend to where the next dollar yields the most **(key)**  
  _Rationale:_ Correct: marginal ROI guides efficient allocation.
- B. Giving every channel an identical amount  
  _Rationale:_ That ignores diminishing returns.
- C. Spending only on the newest channel  
  _Rationale:_ Novelty is not a marginal-return rule.
- D. Never changing the budget  
  _Rationale:_ Allocation is dynamic.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
