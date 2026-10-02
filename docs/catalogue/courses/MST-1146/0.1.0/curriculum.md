# Project Risk Analysis and Quantitative Schedule Risk

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1146` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the purpose and vocabulary of project risk management
2. Build and maintain a structured risk register with qualitative assessment
3. Set up a quantitative schedule risk model using three-point estimates
4. Run and interpret a Monte Carlo schedule simulation
5. Communicate contingency and risk findings to decision-makers

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Risk management foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a project's risk process to the plan-identify-assess-respond-monitor cycle; (2) Classify ten events as threats, opportunities or issues
- Common misconception addressed: Treating issues that have already occurred as risks still to be managed
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Risk concepts, process and governance | 96 | 8 |
| M01L02 | Risk appetite, tolerance and categories | 96 | 8 |

### M02 Qualitative risk assessment (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write five risk statements in cause-event-effect form; (2) Score and rank risks on a probability-impact matrix
- Common misconception addressed: Confusing a risk's cause with its effect in the register
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Identifying and describing risks | 96 | 8 |
| M02L02 | Probability-impact scoring and the risk register | 96 | 8 |

### M03 Quantitative schedule modelling (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assign optimistic-most likely-pessimistic durations to driving activities; (2) Choose a triangular vs PERT distribution for an uncertain task
- Common misconception addressed: Assuming the most likely duration equals the expected completion date
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Three-point estimates and distributions | 96 | 8 |
| M03L02 | Linking risk to activity durations | 96 | 8 |

### M04 Monte Carlo simulation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret a completion-date S-curve to find the P80 date; (2) Use a tornado chart to find the activities driving schedule risk
- Common misconception addressed: Believing the deterministic critical path is always the risk-driving path
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Running a schedule risk simulation | 96 | 8 |
| M04L02 | Reading S-curves and criticality | 96 | 8 |

### M05 Contingency and communication (MASTEMY-DESIGN 20%)

- Worked applications: (1) Derive a time contingency from a target confidence level; (2) Draft a one-page risk summary for a bid review
- Common misconception addressed: Presenting a single date as certain instead of a confidence range
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Setting time and cost contingency | 96 | 8 |
| M05L02 | Reporting risk to decision-makers | 96 | 8 |

## Integrative case

A contractor is bidding a 14-month civil project with a fixed completion date. Build a risk register, assign three-point durations to the driving activities, run a schedule risk analysis, and recommend a defensible completion date and time contingency to the bid team without overstating confidence.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1146-final-protected | 25 | 25 | yes |
| MST-1146-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Risk management foundations | 5 |
| Qualitative risk assessment | 5 |
| Quantitative schedule modelling | 5 |
| Monte Carlo simulation | 5 |
| Contingency and communication | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1146-Q0001** (single-answer, Select ONE) A simulation shows the project reaches 50% completion-probability on 3 May and 80% on 24 May. The client wants a commitment date with reasonable confidence. Which date best supports that decision?

- A. 24 May, the P80 date, giving an 80% chance of finishing on or before it  **(key)**  
  _Rationale:_ Correct: the P80 date carries a stated, higher confidence suitable for a committed date.
- B. 3 May, the P50 date, because it is the most likely outcome  
  _Rationale:_ P50 gives only a coin-flip chance of meeting the date; it is not a confident commitment.
- C. The earliest date in the distribution, to look competitive  
  _Rationale:_ The earliest date has very low probability and would almost certainly be missed.
- D. The deterministic finish from the CPM bar chart  
  _Rationale:_ The deterministic date ignores duration uncertainty and typically understates risk.

**MST-1146-Q0002** (multiple-answer, Select TWO) Which TWO statements correctly describe three-point estimating for schedule risk? (Select TWO.)

- A. Each uncertain activity gets optimistic, most-likely and pessimistic durations  **(key)**  
  _Rationale:_ Correct: three points define the spread of each activity's duration distribution.
- B. The spread of the three points reflects the activity's uncertainty  **(key)**  
  _Rationale:_ Correct: wider gaps between the points model greater duration uncertainty.
- C. The most-likely value is always the mean of the distribution  
  _Rationale:_ The mean depends on the distribution shape; for a skewed triangular it is not the mode.
- D. Three-point estimates remove the need for a risk register  
  _Rationale:_ Estimates model duration uncertainty; discrete risk events still belong in the register.

**MST-1146-Q0003** (single-answer, Select ONE) A risk is logged as 'Delay to the project.' Why is this a poor risk statement?

- A. It names an effect without the cause or the uncertain event  **(key)**  
  _Rationale:_ Correct: a usable risk statement links a cause, the uncertain event and its effect.
- B. It is too specific to act on  
  _Rationale:_ The problem is the opposite: it is vague, not overly specific.
- C. Delays can never be risks  
  _Rationale:_ Delays are common effects of risks; the issue is how the statement is written.
- D. Risk statements should only describe opportunities  
  _Rationale:_ Risk statements cover both threats and opportunities.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
