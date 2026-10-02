# Robotics Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1809` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-RF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Robotics Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Robotics foundations
2. Coordinates and kinematics
3. Sensing and perception
4. Actuation and control
5. Programming and safety

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate programming or operating a live robot; hands-on practice belongs on hardware or a simulator.

## Modules

### M01 Robotics foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify the subsystems of a robot; (2) Match a robot type to an application
- Common misconception addressed: Thinking a robot is only a humanoid arm
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a robot is and its subsystems | 96 | 8 |
| M01L02 | Robot types and applications | 96 | 8 |

### M02 Coordinates and kinematics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply a coordinate transformation between frames; (2) Distinguish forward from inverse kinematics
- Common misconception addressed: Confusing forward kinematics (joints to pose) with inverse (pose to joints)
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Frames and transformations | 96 | 8 |
| M02L02 | Forward and inverse kinematics | 96 | 8 |

### M03 Sensing and perception (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a sensor for a given perception need; (2) Explain how feedback enables closed-loop motion
- Common misconception addressed: Assuming more sensors always mean better perception
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Internal and external sensors | 96 | 8 |
| M03L02 | Perception for navigation and grasping | 96 | 8 |

### M04 Actuation and control (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Select an actuator for a joint requirement; (2) Describe how PID controls a joint
- Common misconception addressed: Ignoring payload and torque limits when sizing an actuator
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Actuators and drives | 96 | 8 |
| M04L02 | Motion control and PID | 96 | 8 |

### M05 Programming and safety (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose teach-pendant vs offline programming; (2) Identify a safeguard for a collaborative robot
- Common misconception addressed: Treating a collaborative robot as safe in every task without a risk assessment
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Robot programming approaches | 96 | 8 |
| M05L02 | Safety and human-robot collaboration | 96 | 8 |

## Integrative case

A plant wants a robot to pick parts from a bin and place them on a line. The learner must choose a robot type, reason about the kinematics and coordinate frames, select sensors for perception and actuators for the joints, decide a programming approach, and plan safeguarding, then specify a feasible cell.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1809-final-protected | 25 | 25 | yes |
| MST-1809-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Robotics foundations | 5 |
| Coordinates and kinematics | 5 |
| Sensing and perception | 5 |
| Actuation and control | 5 |
| Programming and safety | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1809-Q0001** (single-answer, Select ONE) Inverse kinematics computes:

- A. The joint angles needed to reach a desired end-effector pose **(key)**  
  _Rationale:_ Correct: inverse kinematics solves joints from a target pose.
- B. The end-effector pose from known joint angles  
  _Rationale:_ That is forward kinematics.
- C. The force exerted by the gripper  
  _Rationale:_ That is a dynamics or force question, not kinematics.
- D. The robot's electrical power draw  
  _Rationale:_ Power is unrelated to kinematics.

**MST-1809-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate for safe human-robot collaboration? (Select TWO.)

- A. A task-based risk assessment before deployment **(key)**  
  _Rationale:_ Correct: collaboration safety depends on assessing the specific task.
- B. Speed and force limiting so contact stays within safe limits **(key)**  
  _Rationale:_ Correct: power-and-force limiting is a recognised collaborative method.
- C. Removing all guarding because the robot is 'collaborative'  
  _Rationale:_ A cobot is not automatically safe for every task or tool.
- D. Running at maximum speed to improve cycle time  
  _Rationale:_ High speed undermines collaborative safety.

**MST-1809-Q0003** (single-answer, Select ONE) A PID controller on a robot joint uses the error between:

- A. The commanded position and the measured position **(key)**  
  _Rationale:_ Correct: PID acts on the difference between target and actual position.
- B. Two unrelated joints  
  _Rationale:_ PID for one joint uses that joint's own error.
- C. The supply voltage and current  
  _Rationale:_ Those are electrical quantities, not the control error.
- D. The robot's price and budget  
  _Rationale:_ Cost is irrelevant to the control loop.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
