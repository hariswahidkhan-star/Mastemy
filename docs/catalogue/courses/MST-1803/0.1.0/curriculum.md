# PLC Programming Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1803` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-PPF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — PLC Programming Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. PLC hardware and operation
2. Ladder logic basics
3. Timers, counters and latches
4. Data and program structure
5. HMI, networking and safety

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate downloading and running code on a live PLC; hands-on practice belongs on hardware or a simulator.

## Modules

### M01 PLC hardware and operation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map a field device to an input or output module; (2) Explain the steps of the scan cycle
- Common misconception addressed: Assuming a PLC reacts instantly rather than once per scan
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | PLC architecture and I/O | 96 | 8 |
| M01L02 | The scan cycle | 96 | 8 |

### M02 Ladder logic basics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Translate a truth table into ladder logic; (2) Build an AND/OR rung from a requirement
- Common misconception addressed: Confusing a normally-closed contact with a de-energised coil
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Contacts, coils and rungs | 96 | 8 |
| M02L02 | Boolean logic in ladder | 96 | 8 |

### M03 Timers, counters and latches (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Program an on-delay timer for a delay; (2) Use a latch to hold a state
- Common misconception addressed: Expecting a non-retentive timer to resume after a power cycle
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | On-delay and off-delay timers | 96 | 8 |
| M03L02 | Counters and latching | 96 | 8 |

### M04 Data and program structure (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a data type for a value; (2) Organise logic into subroutines
- Common misconception addressed: Writing one giant rung instead of structured, readable logic
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Data types and memory | 96 | 8 |
| M04L02 | Functions, subroutines and structure | 96 | 8 |

### M05 HMI, networking and safety (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Link an HMI tag to a PLC variable; (2) Identify where a safety relay belongs
- Common misconception addressed: Implementing safety functions in standard logic instead of a rated safety system
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | HMI and operator interface | 96 | 8 |
| M05L02 | Networking and safety basics | 96 | 8 |

## Integrative case

A conveyor must start on a button, run a timed cycle, count parts, and stop safely on a guard open. The learner must assign I/O, write ladder logic with timers and counters, structure the program, link an HMI, and place the safety function correctly, then verify the control sequence against the specification.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1803-final-protected | 25 | 25 | yes |
| MST-1803-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| PLC hardware and operation | 5 |
| Ladder logic basics | 5 |
| Timers, counters and latches | 5 |
| Data and program structure | 5 |
| HMI, networking and safety | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1803-Q0001** (single-answer, Select ONE) During the PLC scan cycle, the controller:

- A. Reads inputs, executes the program, then updates outputs, repeatedly **(key)**  
  _Rationale:_ Correct: the scan reads inputs, solves logic, then writes outputs each cycle.
- B. Updates outputs continuously in real time  
  _Rationale:_ Outputs update once per scan, not continuously.
- C. Executes all rungs simultaneously  
  _Rationale:_ Rungs execute in order within a scan.
- D. Only runs the program once at power-up  
  _Rationale:_ The program runs every scan while in RUN mode.

**MST-1803-Q0002** (multiple-answer, Select TWO) Which TWO statements about PLC timers and latches are correct? (Select TWO.)

- A. An on-delay timer's output turns on after its preset time elapses **(key)**  
  _Rationale:_ Correct: the TON output energises once the accumulated time reaches the preset.
- B. A retentive (latched) element holds its state until explicitly reset **(key)**  
  _Rationale:_ Correct: latches retain state until a reset condition acts.
- C. A counter decreases every scan automatically  
  _Rationale:_ A counter changes only on its count event, not every scan.
- D. A non-retentive timer keeps its value through a power loss  
  _Rationale:_ Non-retentive timers reset on power loss.

**MST-1803-Q0003** (single-answer, Select ONE) A rated safety function (e.g. an emergency stop) should be implemented using:

- A. A dedicated safety-rated system or relay, not standard control logic **(key)**  
  _Rationale:_ Correct: safety functions require rated devices to meet safety integrity requirements.
- B. A normal coil in the main ladder program  
  _Rationale:_ Standard logic does not meet safety integrity requirements.
- C. The HMI touchscreen alone  
  _Rationale:_ An HMI is not a rated safety stop.
- D. A software comment reminding operators to be careful  
  _Rationale:_ A comment provides no protective function.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
