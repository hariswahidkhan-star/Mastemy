# Software Estimation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1575` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-SE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Software Estimation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Estimation foundations
2. Uncertainty
3. Decomposition
4. Relative sizing
5. Historical data
6. Common biases
7. Techniques
8. Communicating estimates

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on estimating software work; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Estimation foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Distinguish an estimate from a deadline; (2) Frame an estimate as a range
- Common misconception addressed: Treating a single-point estimate as a guarantee
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why we estimate | 60 | 5 |
| M01L02 | Estimates vs commitments vs targets | 60 | 5 |

### M02 Uncertainty (MASTEMY-DESIGN 13%)

- Worked applications: (1) Express an estimate with a range; (2) Narrow a range as information improves
- Common misconception addressed: Giving precise numbers for poorly understood work
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The cone of uncertainty | 60 | 5 |
| M02L02 | Ranges and confidence | 60 | 5 |

### M03 Decomposition (MASTEMY-DESIGN 12%)

- Worked applications: (1) Split a feature into estimable tasks; (2) Identify a task too large to estimate
- Common misconception addressed: Estimating a vague epic as one lump
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Breaking work into tasks | 60 | 5 |
| M03L02 | Right-sizing work items | 60 | 5 |

### M04 Relative sizing (MASTEMY-DESIGN 13%)

- Worked applications: (1) Size two stories relative to each other; (2) Run a planning-poker round
- Common misconception addressed: Converting story points directly into fixed hours
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Story points and relative scale | 60 | 5 |
| M04L02 | Planning poker | 60 | 5 |

### M05 Historical data (MASTEMY-DESIGN 12%)

- Worked applications: (1) Forecast completion from past velocity; (2) Use throughput to project a date range
- Common misconception addressed: Forecasting from a single sprint's velocity
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Velocity and throughput | 60 | 5 |
| M05L02 | Forecasting from data | 60 | 5 |

### M06 Common biases (MASTEMY-DESIGN 13%)

- Worked applications: (1) Spot the planning fallacy in an estimate; (2) Counter anchoring in a discussion
- Common misconception addressed: Blindly padding every estimate by a fixed percentage
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Optimism and planning fallacy | 60 | 5 |
| M06L02 | Padding and anchoring | 60 | 5 |

### M07 Techniques (MASTEMY-DESIGN 12%)

- Worked applications: (1) Compute a PERT estimate from three points; (2) Use a comparable past project as a reference
- Common misconception addressed: Ignoring comparable past work when estimating
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Three-point (PERT) estimation | 60 | 5 |
| M07L02 | Reference-class forecasting | 60 | 5 |

### M08 Communicating estimates (MASTEMY-DESIGN 12%)

- Worked applications: (1) Document the assumptions behind an estimate; (2) Update an estimate when scope changes
- Common misconception addressed: Never revisiting an estimate after new information
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Explaining assumptions and risks | 60 | 5 |
| M08L02 | Re-estimating as you learn | 60 | 5 |

## Integrative case

Estimate a feature with real uncertainty: break it into tasks, apply relative sizing, account for uncertainty with ranges, use historical throughput to forecast, and communicate the estimate honestly to stakeholders.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1575-final-protected | 40 | 40 | yes |
| MST-1575-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Estimation foundations | 5 |
| Uncertainty | 5 |
| Decomposition | 5 |
| Relative sizing | 5 |
| Historical data | 5 |
| Common biases | 5 |
| Techniques | 5 |
| Communicating estimates | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1575-Q0001** (single-answer, Select ONE) What does the 'cone of uncertainty' describe?

- A. Estimate accuracy improves as a project progresses and uncertainty is resolved **(key)**  
  _Rationale:_ Correct: early estimates are inherently wide, narrowing over time.
- B. Estimates always get worse over time  
  _Rationale:_ The opposite: they narrow as you learn.
- C. Velocity always increases each sprint  
  _Rationale:_ Unrelated to the cone.
- D. Story points convert to exact hours  
  _Rationale:_ The cone is about uncertainty, not conversion.

**MST-1575-Q0002** (single-answer, Select ONE) Why express an estimate as a range rather than a single number?

- A. It honestly communicates uncertainty instead of implying false precision **(key)**  
  _Rationale:_ Correct: ranges set realistic expectations.
- B. Ranges are always wrong  
  _Rationale:_ Ranges reflect reality better than points.
- C. It removes the need to decompose work  
  _Rationale:_ Decomposition still helps estimate.
- D. It guarantees on-time delivery  
  _Rationale:_ No estimate guarantees delivery.

**MST-1575-Q0003** (multiple-answer, Select ALL that apply) Which statements about using velocity for forecasting are correct? (Select TWO)

- A. Averaging several past sprints gives a more reliable forecast than one sprint **(key)**  
  _Rationale:_ Correct: more data smooths out variance.
- B. Forecasting as a date range is more honest than a single date **(key)**  
  _Rationale:_ Correct: it reflects remaining uncertainty.
- C. One sprint's velocity reliably predicts all future delivery  
  _Rationale:_ False; a single data point is noisy.
- D. Story points should be converted to hours for stakeholders  
  _Rationale:_ False; points are relative, not hour conversions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
