# Autonomous Mobile Robots

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2755` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Autonomous Mobile Robots (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the navigation stack: perception, localisation, mapping, planning, control
2. Describe localisation and the idea of simultaneous localisation and mapping (SLAM)
3. Explain global and local path planning at a conceptual level
4. Reason about obstacle avoidance and dynamic environments
5. Identify sensors used for mobile robot navigation and their trade-offs
6. Assess safety and failure handling for autonomous movement

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Navigation overview (20% (design weight), design weight)

- Worked applications: (1) Label the stages of a navigation stack for a warehouse robot; (2) Choose a map representation for a corridor
- Common misconception addressed: Thinking a map alone is enough without localisation
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The navigation stack | 64 | 4 |
| M01L02 | Maps and representations | 64 | 4 |
| M01L03 | Mobile robot types | 64 | 4 |

### M02 Localisation and SLAM (22% (design weight), design weight)

- Worked applications: (1) Explain how SLAM builds a map while tracking pose; (2) Fuse odometry with LiDAR for a better pose
- Common misconception addressed: Assuming odometry alone gives accurate long-run position
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Localisation basics | 70 | 4 |
| M02L02 | SLAM intuition | 70 | 4 |
| M02L03 | Sensor fusion for pose | 71 | 4 |

### M03 Path planning (20% (design weight), design weight)

- Worked applications: (1) Compare a global plan with a local plan around an obstacle; (2) Interpret a costmap to pick a route
- Common misconception addressed: Confusing global planning with reactive avoidance
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Global planning | 64 | 4 |
| M03L02 | Local planning | 64 | 4 |
| M03L03 | Costmaps | 64 | 4 |

### M04 Obstacles and dynamics (20% (design weight), design weight)

- Worked applications: (1) Design a replanning trigger for a blocked path; (2) Handle a moving person crossing the route
- Common misconception addressed: Treating a dynamic environment as if it were static
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Static versus dynamic obstacles | 64 | 4 |
| M04L02 | Avoidance strategies | 64 | 4 |
| M04L03 | Replanning | 64 | 4 |

### M05 Sensors and safety (18% (design weight), design weight)

- Worked applications: (1) Select sensors for a low-cost indoor robot; (2) Define a safe-stop behaviour on sensor loss
- Common misconception addressed: Ignoring what the robot should do when a sensor fails
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | LiDAR, cameras and odometry | 57 | 4 |
| M05L02 | Sensor trade-offs | 57 | 4 |
| M05L03 | Safe failure handling | 59 | 4 |

## Integrative case

A logistics startup deploys autonomous carts in a busy warehouse: design the navigation stack, decide how the robot localises and replans around people and pallets, pick sensors within budget, and define safe behaviour when a sensor drops out.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2755-final-protected | 40 | 40 | yes |
| MST-2755-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Navigation overview | 8 |
| Localisation and SLAM | 9 |
| Path planning | 8 |
| Obstacles and dynamics | 8 |
| Sensors and safety | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2755-Q0001** (single-answer, Select ONE) An indoor robot's wheel odometry says it has travelled straight, but it has actually drifted sideways. Which capability most directly corrects this?

- A. Localisation that fuses external sensing (e.g. LiDAR) with odometry to correct accumulated drift **(key)**  
  _Rationale:_ Correct: odometry drifts over time; fusing it with external references corrects the pose estimate.
- B. Increasing motor torque to drive straighter  
  _Rationale:_ Torque does not fix an estimation error about where the robot is.
- C. Switching off all sensors to reduce noise  
  _Rationale:_ Removing sensing removes the information needed to correct drift.
- D. Using a larger global map  
  _Rationale:_ A bigger map does not by itself correct odometry drift.

**MST-2755-Q0002** (multiple-answer, Select TWO) Which TWO responsibilities belong to an autonomous mobile robot's navigation stack? (Select TWO.)

- A. Planning a path from the robot's pose to a goal **(key)**  
  _Rationale:_ Correct: path planning is a core navigation responsibility.
- B. Avoiding obstacles detected along the way **(key)**  
  _Rationale:_ Correct: local avoidance/replanning handles obstacles during motion.
- C. Signing the robot's firmware for security  
  _Rationale:_ Firmware signing is a security task, not part of navigation.
- D. Billing the customer for the delivery  
  _Rationale:_ Billing is a business function unrelated to navigation.

**MST-2755-Q0003** (single-answer, Select ONE) What is SLAM, in one sentence?

- A. Building a map of an unknown environment while simultaneously tracking the robot's position within it **(key)**  
  _Rationale:_ Correct: SLAM jointly estimates the map and the robot's pose.
- B. Pre-loading a perfect map so no sensing is needed  
  _Rationale:_ SLAM is used precisely when no prior map exists.
- C. A method to make motors run faster  
  _Rationale:_ SLAM concerns mapping and localisation, not motor speed.
- D. A way to delete obstacles from the real world  
  _Rationale:_ SLAM perceives obstacles; it cannot remove physical objects.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
