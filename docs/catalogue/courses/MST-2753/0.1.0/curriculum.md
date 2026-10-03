# Robotics Foundations: Sensors, Actuators and Control

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2753` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal curriculum design (no official syllabus); emerging-technology scope as of 2026-10, speculative topics treated conceptually and safely. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Robotics Foundations: Sensors, Actuators and Control (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the sense-plan-act loop and the main subsystems of a robot
2. Explain sensors and actuators and how they are chosen for a task
3. Reason about coordinate frames and basic kinematics
4. Explain control loops and feedback at a conceptual level
5. Identify safety considerations for robots that share space with people
6. Match a robot type to a task and its constraints

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Anatomy of a robot (20% (design weight), design weight)

- Worked applications: (1) Map a pick-and-place task to sense-plan-act; (2) Classify three robots by their task domain
- Common misconception addressed: Thinking a robot 'thinks' rather than runs a sense-plan-act loop
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Sense-plan-act loop | 64 | 4 |
| M01L02 | Subsystems overview | 64 | 4 |
| M01L03 | Robot types and tasks | 64 | 4 |

### M02 Sensors and actuators (22% (design weight), design weight)

- Worked applications: (1) Choose a sensor to detect a nearby obstacle; (2) Choose an actuator for a precise joint
- Common misconception addressed: Assuming more sensors always improve performance
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Common sensors | 70 | 4 |
| M02L02 | Actuators and drives | 70 | 4 |
| M02L03 | Choosing sensors for a task | 71 | 4 |

### M03 Frames and kinematics (20% (design weight), design weight)

- Worked applications: (1) Convert a point between two frames; (2) Count the degrees of freedom of an arm
- Common misconception addressed: Confusing the robot's frame with the world frame
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Coordinate frames | 64 | 4 |
| M03L02 | Forward kinematics intuition | 64 | 4 |
| M03L03 | Degrees of freedom | 64 | 4 |

### M04 Control and feedback (20% (design weight), design weight)

- Worked applications: (1) Tune a conceptual PID to reduce overshoot; (2) Explain why feedback corrects disturbances
- Common misconception addressed: Believing open-loop control handles unexpected disturbances
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Open versus closed loop | 64 | 4 |
| M04L02 | PID control intuition | 64 | 4 |
| M04L03 | Stability basics | 64 | 4 |

### M05 Safety and selection (18% (design weight), design weight)

- Worked applications: (1) Run a basic risk assessment for a shared workspace; (2) Select a cobot versus a caged arm for a line
- Common misconception addressed: Ignoring human safety because the robot 'moves slowly'
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Human-robot safety | 57 | 4 |
| M05L02 | Risk assessment basics | 57 | 4 |
| M05L03 | Selecting a robot for a job | 59 | 4 |

## Integrative case

A small manufacturer wants to automate a repetitive packing station next to human workers: choose the robot type and sensors, reason about frames and control, and complete a basic safety assessment before proposing a design.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2753-final-protected | 40 | 40 | yes |
| MST-2753-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Anatomy of a robot | 8 |
| Sensors and actuators | 9 |
| Frames and kinematics | 8 |
| Control and feedback | 8 |
| Safety and selection | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2753-Q0001** (single-answer, Select ONE) A robot must stop when a person steps into its area. Which design best ensures this behaviour?

- A. A closed-loop system using presence sensors that feed back to halt motion **(key)**  
  _Rationale:_ Correct: closed-loop feedback from presence sensing lets the robot react to the unplanned event.
- B. An open-loop sequence timed to the normal cycle  
  _Rationale:_ Open-loop timing cannot react to an unexpected person entering the area.
- C. A faster motor so the task finishes before anyone arrives  
  _Rationale:_ Speed does not provide safety against people entering the workspace.
- D. Removing all sensors to simplify the controller  
  _Rationale:_ Removing sensing eliminates the feedback needed to stop safely.

**MST-2753-Q0002** (multiple-answer, Select TWO) Which TWO belong to the 'sense' and 'act' parts of the sense-plan-act loop respectively? (Select TWO.)

- A. A camera detecting an object's position is part of 'sense' **(key)**  
  _Rationale:_ Correct: perception via a camera is sensing.
- B. A motor moving the gripper to the object is part of 'act' **(key)**  
  _Rationale:_ Correct: driving actuators to affect the world is acting.
- C. Choosing which object to pick next is sensing  
  _Rationale:_ Deciding the next action is 'plan', not 'sense'.
- D. Converting sensor data into a world model is acting  
  _Rationale:_ Building a model from sensor data is sensing/perception, not acting.

**MST-2753-Q0003** (single-answer, Select ONE) Why does a robot need defined coordinate frames?

- A. So positions sensed in one frame can be transformed into the frame needed to act **(key)**  
  _Rationale:_ Correct: frames let the robot relate sensor, tool and world positions consistently.
- B. Because frames make the motors spin faster  
  _Rationale:_ Frames are a geometric bookkeeping tool, not a speed control.
- C. Because without frames a robot cannot be powered on  
  _Rationale:_ Power-up does not depend on coordinate frames.
- D. Because frames replace the need for any sensors  
  _Rationale:_ Frames organise spatial data but do not replace sensing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
