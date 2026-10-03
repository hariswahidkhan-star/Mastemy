# Automotive Electronics and ECUs

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2400` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | curriculum specification (design assumption, see course package); no official syllabus exists for this general professional-skills course |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Automotive Electronics and ECUs (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the architecture of automotive electronic control units
2. Explain sensors and actuators and their signal conditioning
3. Analyse in-vehicle communication networks such as CAN and LIN
4. Explain embedded control software and real-time constraints
5. Describe on-board diagnostics and fault handling
6. Apply basic troubleshooting to an electronic control fault

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 ECU hardware (20% (design weight), design weight)

- Worked applications: (1) Sketch the main blocks of an engine ECU; (2) Explain why ECUs need reverse-polarity and load-dump protection
- Common misconception addressed: An ECU is just an ordinary desktop computer in a box
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | ECU architecture | 48 | 3 |
| M01L02 | Microcontrollers and memory | 48 | 3 |
| M01L03 | Power supply and protection | 48 | 3 |
| M01L04 | Packaging and environment | 48 | 3 |

### M02 Sensors and actuators (20% (design weight), design weight)

- Worked applications: (1) Condition a raw temperature-sensor voltage into a usable signal; (2) Diagnose a sensor stuck at its supply voltage
- Common misconception addressed: Every sensor outputs a clean digital value directly
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Common sensors | 48 | 3 |
| M02L02 | Signal conditioning | 48 | 3 |
| M02L03 | Actuator drivers | 48 | 3 |
| M02L04 | Fault modes | 48 | 3 |

### M03 In-vehicle networks (20% (design weight), design weight)

- Worked applications: (1) Decode a simple CAN frame's identifier and data; (2) Explain why CAN uses arbitration rather than a central master
- Common misconception addressed: CAN is a point-to-point link between just two devices
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CAN bus basics | 48 | 3 |
| M03L02 | LIN and FlexRay | 48 | 3 |
| M03L03 | Automotive Ethernet | 48 | 3 |
| M03L04 | Gateways and topology | 48 | 3 |

### M04 Embedded control (20% (design weight), design weight)

- Worked applications: (1) Explain why a control task must meet its deadline; (2) Describe how interrupts preempt a running task
- Common misconception addressed: In embedded control it never matters when a task finishes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Real-time software | 48 | 3 |
| M04L02 | Control loops | 48 | 3 |
| M04L03 | Interrupts and scheduling | 48 | 3 |
| M04L04 | AUTOSAR concepts | 48 | 3 |

### M05 Diagnostics (20% (design weight), design weight)

- Worked applications: (1) Map a stored DTC to a likely subsystem fault; (2) Follow a structured workflow to isolate an intermittent fault
- Common misconception addressed: A diagnostic trouble code always names the exact broken part
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | OBD and DTCs | 48 | 3 |
| M05L02 | Diagnostic protocols | 48 | 3 |
| M05L03 | Fault detection | 48 | 3 |
| M05L04 | Troubleshooting workflow | 48 | 3 |

## Integrative case

A supplier must integrate a new body-control feature across several ECUs: the team must choose sensors and a network, define real-time behaviour and diagnostics, and plan how an intermittent communication fault would be isolated in the field.

## Cumulative assessment

Form length basis: 40-item knowledge form (1 minute per item) across ECU hardware, sensors, networks, embedded control and diagnostics

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2400-final-protected | 40 | 40 | yes |
| MST-2400-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| ECU hardware | 8 |
| Sensors and actuators | 8 |
| In-vehicle networks | 8 |
| Embedded control | 8 |
| Diagnostics | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2400-Q0001** (single-answer, Select ONE) On a Controller Area Network (CAN) bus, how is access to the bus resolved when two nodes transmit at the same time?

- A. A central master grants each node a fixed time slot  
  _Rationale:_ Classic CAN has no central master; access is decentralised.
- B. Non-destructive bit-wise arbitration based on message identifier priority **(key)**  
  _Rationale:_ CAN uses bit-wise arbitration where the lower identifier (higher priority) wins without destroying the message.
- C. The node with the longest message always wins  
  _Rationale:_ Message length does not determine arbitration.
- D. Both messages are discarded and neither node retries  
  _Rationale:_ The winning message continues; the loser retries later.

**MST-2400-Q0002** (single-answer, Select ONE) What is the primary purpose of signal conditioning between a sensor and an ECU input?

- A. To convert the vehicle into a hybrid  
  _Rationale:_ Signal conditioning is unrelated to powertrain type.
- B. To scale, filter and protect the raw sensor signal so the ECU can read it accurately **(key)**  
  _Rationale:_ Conditioning adjusts range, removes noise and protects the input so the microcontroller reads a valid value.
- C. To increase the engine's compression ratio  
  _Rationale:_ That is a mechanical engine parameter, not an electronics function.
- D. To store diagnostic trouble codes  
  _Rationale:_ DTC storage is a diagnostic function, not signal conditioning.

**MST-2400-Q0003** (multiple-answer, Select TWO) A technician is diagnosing an intermittent CAN communication fault. Select TWO checks that are appropriate early steps.

- A. Measure the bus termination resistance **(key)**  
  _Rationale:_ Incorrect or missing termination is a common CAN fault and is quick to check.
- B. Inspect connectors and wiring for intermittent open or short conditions **(key)**  
  _Rationale:_ Intermittent faults frequently stem from wiring and connector problems.
- C. Replace every ECU on the vehicle immediately  
  _Rationale:_ Wholesale replacement is costly and not an appropriate early diagnostic step.
- D. Increase the tyre pressures  
  _Rationale:_ Tyre pressure has no bearing on CAN communication.
- E. Reflash the infotainment theme  
  _Rationale:_ A cosmetic change cannot address a physical-layer communication fault.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
