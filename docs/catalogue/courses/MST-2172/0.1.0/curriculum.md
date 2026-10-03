# Spacecraft Design Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2172` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Educational engineering-overview course; concepts versioned by verification date. No official syllabus; scope is conceptual spacecraft systems engineering only. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Spacecraft Design Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the spacecraft design process from requirements to review gates
2. Explain how the space environment drives design choices
3. Describe spacecraft subsystems and how they interact
4. Explain mass, power and thermal budgets at a concept level
5. Describe reliability, redundancy and testing approaches
6. Communicate design trade-offs and margins to stakeholders

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Requirements and the space environment (25% (Mastemy design weight), design weight)

- Worked applications: (1) Turn a mission goal into three design requirements; (2) Map two space-environment effects to design responses
- Common misconception addressed: Believing space is a benign, empty environment
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From mission needs to requirements | 120 | 7 |
| M01L02 | Vacuum, radiation, thermal and microgravity effects | 120 | 7 |

### M02 Subsystems and architecture (25% (Mastemy design weight), design weight)

- Worked applications: (1) Allocate subsystems to a spacecraft block diagram; (2) Explain one interface between two subsystems
- Common misconception addressed: Designing subsystems in isolation from each other
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Structure, power, thermal and propulsion roles | 120 | 7 |
| M02L02 | Avionics, data handling and payload integration | 120 | 7 |

### M03 Budgets and margins (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build a simple mass budget with margin; (2) Explain why thermal control is essential in vacuum
- Common misconception addressed: Ignoring margins and using point estimates only
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mass and power budgets conceptually | 120 | 7 |
| M03L02 | Thermal control and margin management | 120 | 7 |

### M04 Reliability, test and review (25% (Mastemy design weight), design weight)

- Worked applications: (1) Decide where redundancy is worth its mass cost; (2) Order a conceptual environmental test campaign
- Common misconception addressed: Assuming ground tests are unnecessary before launch
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Redundancy and reliability concepts | 120 | 7 |
| M04L02 | Environmental testing and review gates | 120 | 7 |

## Integrative case

A design class develops, at concept level, a small science spacecraft: starting from mission requirements and the space environment, they lay out subsystems, build mass/power/thermal budgets with margins, plan redundancy and testing, and present trade-offs at a preliminary design review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2172-final-protected | 40 | 40 | yes |
| MST-2172-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Requirements and the space environment | 10 |
| Subsystems and architecture | 10 |
| Budgets and margins | 10 |
| Reliability, test and review | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2172-Q0001** (single-answer, Select ONE) Why is thermal control a critical spacecraft subsystem in the vacuum of space?

- A. Without air, heat transfers mainly by radiation, so components can overheat or freeze **(key)**  
  _Rationale:_ Correct: vacuum removes convection, so thermal design manages radiative balance.
- B. Because space is uniformly room temperature  
  _Rationale:_ Space is not a uniform comfortable temperature.
- C. Because thermal control generates thrust  
  _Rationale:_ Thermal control manages temperature, not thrust.
- D. Because air conditioning is cheaper in space  
  _Rationale:_ There is no air to condition in vacuum.

**MST-2172-Q0002** (multiple-answer, Select TWO) Which TWO are reasons engineers keep margins in mass and power budgets? (Select TWO.)

- A. To absorb growth and uncertainty as the design matures **(key)**  
  _Rationale:_ Correct: margins cover inevitable design growth and uncertainty.
- B. To reduce the risk of exceeding launch or power limits **(key)**  
  _Rationale:_ Correct: margins protect against breaching hard limits.
- C. To make the spacecraft deliberately heavier  
  _Rationale:_ Margins manage risk, not add weight for its own sake.
- D. Because budgets are never checked again  
  _Rationale:_ Budgets are tracked throughout the program.

**MST-2172-Q0003** (single-answer, Select ONE) What is the main purpose of environmental testing before launch?

- A. To show the spacecraft can survive launch and space conditions **(key)**  
  _Rationale:_ Correct: testing verifies survival of vibration, vacuum and thermal extremes.
- B. To make the project take longer on purpose  
  _Rationale:_ Testing reduces risk; delay is not its purpose.
- C. To replace the need for any requirements  
  _Rationale:_ Testing verifies against requirements, not instead of them.
- D. To paint the spacecraft for launch  
  _Rationale:_ That is unrelated to environmental testing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
