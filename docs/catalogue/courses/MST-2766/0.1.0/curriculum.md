# Drones & Unmanned Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2766` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Drones & Unmanned Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe types of unmanned systems and their main components
2. Explain flight principles and control for multirotor and fixed-wing drones
3. Reason about autonomy levels, navigation and payloads
4. Identify sensors and communication links used by drones
5. Explain safety, airspace rules and responsible operation at a high level
6. Match a drone platform and concept of operations to a mission

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Unmanned systems overview (20% (design weight), design weight)

- Worked applications: (1) Choose multirotor or fixed-wing for a survey; (2) List the core components of a drone
- Common misconception addressed: Thinking all drones are interchangeable for any mission
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Types of unmanned systems | 64 | 4 |
| M01L02 | Core components | 64 | 4 |
| M01L03 | Multirotor versus fixed-wing | 64 | 4 |

### M02 Flight and control (22% (design weight), design weight)

- Worked applications: (1) Explain how a multirotor changes direction; (2) Describe a sensible failsafe on signal loss
- Common misconception addressed: Assuming a drone keeps flying safely if control is lost
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How drones fly | 70 | 4 |
| M02L02 | Stabilisation and control | 70 | 4 |
| M02L03 | Failsafes | 71 | 4 |

### M03 Autonomy and payloads (20% (design weight), design weight)

- Worked applications: (1) Classify a mission by required autonomy level; (2) Match a payload to a mapping task
- Common misconception addressed: Confusing automated waypoints with full autonomy
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Levels of autonomy | 64 | 4 |
| M03L02 | Navigation and GNSS | 64 | 4 |
| M03L03 | Payloads and missions | 64 | 4 |

### M04 Sensors and links (20% (design weight), design weight)

- Worked applications: (1) Pick sensors for obstacle avoidance; (2) Explain what happens on loss of link
- Common misconception addressed: Ignoring GNSS-denied conditions in planning
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Onboard sensors | 64 | 4 |
| M04L02 | Communication links | 64 | 4 |
| M04L03 | Loss-of-link behaviour | 64 | 4 |

### M05 Safety and rules (18% (design weight), design weight)

- Worked applications: (1) Check basic airspace considerations for a flight; (2) Define a responsible operating boundary
- Common misconception addressed: Treating airspace and safety rules as optional
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Airspace and regulation basics | 57 | 4 |
| M05L02 | Risk and safety | 57 | 4 |
| M05L03 | Responsible operation | 59 | 4 |

## Integrative case

An inspection company plans drone surveys of power lines: choose the platform and payload, set autonomy and failsafe behaviour, select sensors and communication links, and ensure the concept of operations respects airspace rules and safety at a high level.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2766-final-protected | 40 | 40 | yes |
| MST-2766-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Unmanned systems overview | 8 |
| Flight and control | 9 |
| Autonomy and payloads | 8 |
| Sensors and links | 8 |
| Safety and rules | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2766-Q0001** (single-answer, Select ONE) A survey drone unexpectedly loses its control link mid-flight. What is the most responsible designed behaviour?

- A. Execute a predefined failsafe such as return-to-home or a safe controlled landing **(key)**  
  _Rationale:_ Correct: a safe, predefined failsafe protects people and property on loss of link.
- B. Continue the mission indefinitely with no link  
  _Rationale:_ Flying on blindly without control is unsafe.
- C. Immediately cut all power and drop from the sky  
  _Rationale:_ An uncontrolled fall endangers people and property.
- D. Speed up to finish before anyone notices  
  _Rationale:_ This is unsafe and ignores the loss-of-control situation.

**MST-2766-Q0002** (multiple-answer, Select TWO) Which TWO statements about drone platforms are accurate? (Select TWO.)

- A. Multirotors hover well and suit close inspection tasks **(key)**  
  _Rationale:_ Correct: multirotors excel at hovering and precise positioning.
- B. Fixed-wing drones generally cover large areas more efficiently **(key)**  
  _Rationale:_ Correct: fixed-wing platforms offer longer range and endurance for area coverage.
- C. All drones can hover indefinitely regardless of design  
  _Rationale:_ Fixed-wing drones generally cannot hover like multirotors.
- D. Payload choice never affects the mission outcome  
  _Rationale:_ Payload is central to what a mission can achieve.

**MST-2766-Q0003** (single-answer, Select ONE) Why must drone operators consider airspace rules before flying?

- A. Drones share airspace with other aircraft and people, so rules exist to keep operations safe and legal **(key)**  
  _Rationale:_ Correct: responsible operation requires respecting airspace and safety regulations.
- B. Because airspace rules only apply to large passenger jets  
  _Rationale:_ Rules apply to drone operations too, not just large aircraft.
- C. Because following rules makes the battery last longer  
  _Rationale:_ Rules concern safety and legality, not battery life.
- D. Because airspace rules determine the drone's colour  
  _Rationale:_ Rules govern safe operation, not cosmetic choices.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
