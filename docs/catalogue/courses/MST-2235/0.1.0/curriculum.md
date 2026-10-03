# Feedback and Automatic Control Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2235` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Engineering standards, tool specifics and formulae must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Feedback and Automatic Control Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model simple dynamic systems with transfer functions and block diagrams
2. Explain open-loop versus closed-loop control and the role of feedback
3. Analyse first- and second-order system responses
4. Tune a PID controller and explain each term's effect
5. Assess stability using poles and basic criteria
6. Describe sensors, actuators and discrete/digital control basics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 System modelling (25% (Mastemy design weight), design weight)

- Worked applications: (1) Reduce a two-block feedback diagram to one transfer function; (2) Classify a response as first- or second-order from its curve
- Common misconception addressed: Mixing up the plant and controller when writing the loop
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Transfer functions and block diagrams | 120 | 7 |
| M01L02 | First- and second-order responses | 120 | 7 |

### M02 Feedback and control structure (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain why feedback reduces sensitivity to a disturbance; (2) Predict steady-state error for a step input
- Common misconception addressed: Believing open-loop control can reject unknown disturbances
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Open-loop vs closed-loop control | 120 | 7 |
| M02L02 | Steady-state error and disturbance rejection | 120 | 7 |

### M03 PID control and tuning (25% (Mastemy design weight), design weight)

- Worked applications: (1) Increase proportional gain and predict the effect on overshoot; (2) Add integral action to remove a steady-state offset
- Common misconception addressed: Adding derivative gain to a noisy signal without filtering
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The P, I and D terms | 120 | 7 |
| M03L02 | Tuning methods and trade-offs | 120 | 7 |

### M04 Stability and implementation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide stability from pole locations in the s-plane; (2) Pick a sampling rate fast enough for a given bandwidth
- Common misconception addressed: Assuming a continuous design works unchanged when sampled slowly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Poles, stability and the response it implies | 120 | 7 |
| M04L02 | Sensors, actuators and digital control | 120 | 7 |

## Integrative case

A team builds a temperature controller for a small reactor: model the heater and vessel, close the loop, tune a PID for fast settling without overshoot, check stability, and choose a safe sampling rate.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2235-final-protected | 40 | 40 | yes |
| MST-2235-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| System modelling | 10 |
| Feedback and control structure | 10 |
| PID control and tuning | 10 |
| Stability and implementation | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2235-Q0001** (single-answer, Select ONE) What is the primary benefit of closed-loop (feedback) control over open-loop control?

- A. It corrects for disturbances and model errors using the measured output **(key)**  
  _Rationale:_ Correct: feedback compares output to setpoint and acts on the error.
- B. It never needs a sensor  
  _Rationale:_ Closed-loop control depends on measuring the output.
- C. It is always cheaper  
  _Rationale:_ Feedback can add cost; its benefit is accuracy and robustness.
- D. It eliminates the need for an actuator  
  _Rationale:_ An actuator is still required to affect the plant.

**MST-2235-Q0002** (multiple-answer, Select TWO) Which TWO effects are typically associated with increasing the integral term in a PID controller? (Select TWO.)

- A. It drives steady-state error toward zero **(key)**  
  _Rationale:_ Correct: integral action accumulates error until it is removed.
- B. It can reduce stability margins and increase overshoot **(key)**  
  _Rationale:_ Correct: too much integral action tends to destabilise the loop.
- C. It instantly removes all measurement noise  
  _Rationale:_ Noise handling is more about derivative filtering, not integral action.
- D. It has no effect on steady-state error  
  _Rationale:_ Removing steady-state error is exactly what integral action does.

**MST-2235-Q0003** (single-answer, Select ONE) A system's transfer function has a pole in the right half of the s-plane. What does this imply?

- A. The system is unstable **(key)**  
  _Rationale:_ Correct: a right-half-plane pole produces a growing response.
- B. The system is critically damped  
  _Rationale:_ Damping classification does not make an RHP pole stable.
- C. The system has no steady-state error  
  _Rationale:_ Pole location governs stability, not that claim.
- D. The system is faster but stable  
  _Rationale:_ An RHP pole means instability, not merely speed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
