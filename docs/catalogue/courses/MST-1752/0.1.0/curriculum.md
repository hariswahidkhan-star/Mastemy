# Process Mapping (BPMN)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1752` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PMB-SK-PMB-001 |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Process Mapping (BPMN) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Why map processes
2. Core BPMN elements
3. Lanes and participants
4. Modelling decisions and flows
5. Quality and improvement

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on performance of the skill; applied practice comes through instructor-facilitated exercises and model-answer analysis.

## Modules

### M01 Why map processes (MASTEMY-DESIGN 22%)

- Worked applications: (1) Decide whether a situation needs a process map; (2) State the goal of a specific map
- Common misconception addressed: Mapping everything in exhaustive detail with no purpose
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Purpose and benefits of process mapping | 58 | 6 |
| M01L02 | When BPMN is the right tool | 58 | 6 |

### M02 Core BPMN elements (MASTEMY-DESIGN 20%)

- Worked applications: (1) Label the core elements in a sample diagram; (2) Fix an invalid sequence flow
- Common misconception addressed: Using gateways and events interchangeably without meaning
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Activities, events and gateways | 58 | 6 |
| M02L02 | Sequence flow and basic rules | 58 | 6 |

### M03 Lanes and participants (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assign activities to the correct lane; (2) Highlight a risky handoff
- Common misconception addressed: Hiding handoffs by leaving everything in one lane
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pools and swimlanes | 58 | 6 |
| M03L02 | Showing handoffs and responsibilities | 58 | 6 |

### M04 Modelling decisions and flows (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose the correct gateway for a decision; (2) Add an exception path to a happy-path map
- Common misconception addressed: Only ever modelling the happy path
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Exclusive, parallel and inclusive gateways | 57 | 6 |
| M04L02 | Loops and exception paths | 57 | 6 |

### M05 Quality and improvement (MASTEMY-DESIGN 18%)

- Worked applications: (1) Critique a cluttered diagram for readability; (2) Mark an improvement opportunity on a map
- Common misconception addressed: Confusing a prettier diagram with a better process
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Readability and common modelling errors | 57 | 6 |
| M05L02 | Using a map to drive improvement | 57 | 6 |

## Integrative case

An onboarding process is described differently by every team and nobody can see where new hires get stuck. Model it in BPMN: choose the right level of detail, use activities, events and gateways correctly, place work in the right lanes to expose handoffs, add the exception paths, then use the map to pinpoint the delay.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1752-final-protected | 25 | 25 | yes |
| MST-1752-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why map processes | 5 |
| Core BPMN elements | 5 |
| Lanes and participants | 5 |
| Modelling decisions and flows | 5 |
| Quality and improvement | 5 |

Minimum reviewed item bank: 270 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1752-Q0001** (single-answer, Select ONE) In BPMN, what is the primary role of an exclusive gateway?

- A. To route the flow down exactly one of several mutually exclusive paths **(key)**  
  _Rationale:_ Correct: an exclusive (XOR) gateway selects a single path based on a condition.
- B. To start the process  
  _Rationale:_ That is the role of a start event, not a gateway.
- C. To run several paths at the same time  
  _Rationale:_ That describes a parallel (AND) gateway.
- D. To represent a task performed by a person  
  _Rationale:_ A task, not a gateway, represents work performed.

**MST-1752-Q0002** (multiple-answer, Select TWO) Which practices improve a BPMN process map? (Select TWO)

- A. Placing each activity in the lane of the role that performs it **(key)**  
  _Rationale:_ Correct: lanes make responsibilities and handoffs explicit.
- B. Including exception paths, not only the happy path **(key)**  
  _Rationale:_ Correct: real processes have exceptions that must be shown.
- C. Keeping everything in a single lane for simplicity  
  _Rationale:_ This hides who does what and obscures handoffs.
- D. Using events and gateways to mean the same thing  
  _Rationale:_ They have distinct meanings; conflating them breaks the model.

**MST-1752-Q0003** (single-answer, Select ONE) A reviewer praises a diagram as 'much nicer looking' though the underlying process still has the same delays. What misconception does this reflect?

- A. A tidier diagram is not the same as an improved process **(key)**  
  _Rationale:_ Correct: readability helps analysis but does not by itself fix the process.
- B. Diagrams should never be made readable  
  _Rationale:_ Readability is valuable; it is just not the end goal.
- C. BPMN cannot represent delays  
  _Rationale:_ BPMN can model timing and bottlenecks.
- D. Process maps cannot drive improvement  
  _Rationale:_ They can, but only when the actual flow changes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
