# Agile Estimation and Planning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1760` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PMB-SK-AEP-001 |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Agile Estimation and Planning (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Why estimate in agile
2. Relative sizing
3. Velocity and forecasting
4. Release and iteration planning
5. Dealing with uncertainty

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on performance of the skill; applied practice comes through instructor-facilitated exercises and model-answer analysis.

## Modules

### M01 Why estimate in agile (MASTEMY-DESIGN 22%)

- Worked applications: (1) Explain what an estimate is and is not; (2) Separate an estimate from a deadline
- Common misconception addressed: Treating an estimate as a guaranteed promise
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Purpose and limits of estimation | 58 | 6 |
| M01L02 | Estimates vs commitments | 58 | 6 |

### M02 Relative sizing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Size stories against a reference story; (2) Facilitate a planning poker round
- Common misconception addressed: Converting story points directly into hours
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Story points and relative estimation | 58 | 6 |
| M02L02 | Planning poker and reference stories | 58 | 6 |

### M03 Velocity and forecasting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Forecast a release window as a range; (2) Interpret a fluctuating velocity
- Common misconception addressed: Using velocity as a productivity target to push the team
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Velocity and what it means | 58 | 6 |
| M03L02 | Forecasting with ranges, not false precision | 58 | 6 |

### M04 Release and iteration planning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Plan an iteration against capacity; (2) Trade scope to protect a fixed date
- Common misconception addressed: Planning to 100% capacity with no slack
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Iteration planning basics | 57 | 6 |
| M04L02 | Release planning and scope trade-offs | 57 | 6 |

### M05 Dealing with uncertainty (MASTEMY-DESIGN 18%)

- Worked applications: (1) Adjust a plan as new information arrives; (2) Communicate uncertainty honestly to stakeholders
- Common misconception addressed: Pretending early estimates are precise commitments
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The cone of uncertainty | 57 | 6 |
| M05L02 | Re-planning as you learn | 57 | 6 |

## Integrative case

Leadership demands an exact delivery date for a half-understood feature set. Apply agile estimation and planning: size the work relatively, use velocity to forecast a range rather than a false-precision date, plan iterations against real capacity, and re-plan transparently as the cone of uncertainty narrows.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1760-final-protected | 25 | 25 | yes |
| MST-1760-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why estimate in agile | 5 |
| Relative sizing | 5 |
| Velocity and forecasting | 5 |
| Release and iteration planning | 5 |
| Dealing with uncertainty | 5 |

Minimum reviewed item bank: 270 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1760-Q0001** (single-answer, Select ONE) Why are story points used instead of direct hour estimates in many agile teams?

- A. Relative sizing is often more reliable than absolute time guesses **(key)**  
  _Rationale:_ Correct: people compare sizes better than they predict exact durations.
- B. Story points convert directly into hours  
  _Rationale:_ They deliberately avoid a fixed hour conversion.
- C. Hours are never used anywhere in agile  
  _Rationale:_ Hours can appear, e.g. in task breakdowns; the point is relative sizing at story level.
- D. Story points guarantee on-time delivery  
  _Rationale:_ No estimate guarantees delivery; they aid forecasting.

**MST-1760-Q0002** (multiple-answer, Select TWO) Which statements about velocity are correct? (Select TWO)

- A. It is best used to forecast delivery as a range **(key)**  
  _Rationale:_ Correct: velocity informs probabilistic forecasts, not exact dates.
- B. It is specific to a given team and context **(key)**  
  _Rationale:_ Correct: velocity is not comparable across different teams.
- C. It should be used as a productivity target to push teams  
  _Rationale:_ Using velocity as a target invites gaming and estimate inflation.
- D. It converts points into guaranteed calendar dates  
  _Rationale:_ Velocity supports forecasts with uncertainty, not guarantees.

**MST-1760-Q0003** (single-answer, Select ONE) Early in a project, stakeholders demand a single exact completion date. What is the most honest response?

- A. Provide a range and refine it as uncertainty decreases **(key)**  
  _Rationale:_ Correct: the cone of uncertainty is widest early, so a range is honest.
- B. Commit to a precise date to look confident  
  _Rationale:_ False precision misleads stakeholders and sets up failure.
- C. Refuse to give any information at all  
  _Rationale:_ A reasoned range is both possible and useful.
- D. Promise the earliest date anyone mentions  
  _Rationale:_ Anchoring to an optimistic date ignores real uncertainty.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
