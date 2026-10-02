# Control Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1802` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-CS-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Control Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Control concepts
2. System modelling
3. Time-domain response
4. Stability analysis
5. Controller design

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot fully demonstrate tuning a live controller; hands-on practice belongs in a lab or simulation.

## Modules

### M01 Control concepts (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draw a closed-loop block diagram; (2) Derive a transfer function from a block diagram
- Common misconception addressed: Believing feedback always makes a system more stable
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Open vs closed loop | 96 | 8 |
| M01L02 | Block diagrams and transfer functions | 96 | 8 |

### M02 System modelling (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Model a first-order physical system; (2) Relate pole location to response speed
- Common misconception addressed: Ignoring that a right-half-plane pole means instability
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Modelling physical systems | 96 | 8 |
| M02L02 | Poles, zeros and response | 96 | 8 |

### M03 Time-domain response (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Read rise time and overshoot from a step response; (2) Relate damping ratio to overshoot
- Common misconception addressed: Assuming a faster response is always better regardless of overshoot
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | First and second-order response | 96 | 8 |
| M03L02 | Transient specifications | 96 | 8 |

### M04 Stability analysis (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply the Routh-Hurwitz test to a characteristic equation; (2) Judge stability from pole locations
- Common misconception addressed: Concluding stability from gain alone without checking the poles
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Stability concepts | 96 | 8 |
| M04L02 | Routh-Hurwitz criterion | 96 | 8 |

### M05 Controller design (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Describe the effect of each PID term; (2) Choose a tuning change to reduce overshoot
- Common misconception addressed: Increasing integral action to fix overshoot (it usually worsens it)
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | PID control action | 96 | 8 |
| M05L02 | Tuning and trade-offs | 96 | 8 |

## Integrative case

A temperature controller overshoots and oscillates. The learner must model the plant, derive the closed-loop transfer function, analyse the step response and stability with Routh-Hurwitz, and tune the PID terms to meet overshoot and settling targets, then justify the final controller settings.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1802-final-protected | 25 | 25 | yes |
| MST-1802-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Control concepts | 5 |
| System modelling | 5 |
| Time-domain response | 5 |
| Stability analysis | 5 |
| Controller design | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1802-Q0001** (single-answer, Select ONE) A linear system is unstable if any pole of its transfer function lies:

- A. In the right half of the complex plane **(key)**  
  _Rationale:_ Correct: a right-half-plane pole produces an unbounded response.
- B. On the negative real axis  
  _Rationale:_ Negative-real poles are stable.
- C. Exactly at the origin for a first-order system  
  _Rationale:_ Origin poles are marginal, handled case by case, not automatically unstable.
- D. Far into the left half-plane  
  _Rationale:_ Left-half-plane poles indicate stability.

**MST-1802-Q0002** (multiple-answer, Select TWO) Which TWO describe the effect of PID terms? (Select TWO.)

- A. Integral action eliminates steady-state error **(key)**  
  _Rationale:_ Correct: the integral term drives steady-state error to zero.
- B. Derivative action can reduce overshoot by anticipating change **(key)**  
  _Rationale:_ Correct: derivative adds damping based on the rate of change.
- C. Proportional action alone always removes steady-state error  
  _Rationale:_ Proportional-only control usually leaves a steady-state offset.
- D. Integral action speeds up the system with no downside  
  _Rationale:_ Too much integral action increases overshoot and can destabilise.

**MST-1802-Q0003** (single-answer, Select ONE) The key difference between closed-loop and open-loop control is that closed-loop:

- A. Uses measured output as feedback to correct the input **(key)**  
  _Rationale:_ Correct: feedback lets the controller respond to the actual output.
- B. Never uses any sensors  
  _Rationale:_ Closed-loop control relies on sensing the output.
- C. Is always cheaper than open-loop  
  _Rationale:_ Feedback often adds cost, not removes it.
- D. Cannot become unstable  
  _Rationale:_ Feedback can introduce instability if poorly designed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
