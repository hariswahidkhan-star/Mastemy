# Industrial Automation, PLCs, and SCADA Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1178` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe industrial automation systems and the automation pyramid
2. Explain how PLCs work: scan cycle, I/O and basic programming
3. Interpret field instrumentation and control signals
4. Explain SCADA and HMI roles in monitoring and supervisory control
5. Recognise industrial networks and basic OT cybersecurity concerns

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Automation foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Place devices onto the correct level of the automation pyramid; (2) Decide where automation adds value in a described process
- Common misconception addressed: Assuming automation always means removing all human oversight
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What industrial automation is and why it is used | 96 | 8 |
| M01L02 | The automation pyramid and control levels | 96 | 8 |

### M02 PLC fundamentals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace inputs to outputs through one PLC scan cycle; (2) Read a simple ladder rung and predict the output state
- Common misconception addressed: Thinking a PLC executes all rungs truly simultaneously rather than per scan
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | PLC architecture, I/O and the scan cycle | 96 | 8 |
| M02L02 | Ladder logic basics | 96 | 8 |

### M03 Sensors and signals (MASTEMY-DESIGN 20%)

- Worked applications: (1) Scale a 4-20 mA signal to an engineering value; (2) Choose a discrete or analog input for a given measurement
- Common misconception addressed: Confusing a discrete (on/off) signal with an analog measurement
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Discrete and analog field devices | 96 | 8 |
| M03L02 | Signal types: 4-20 mA and digital | 96 | 8 |

### M04 SCADA and HMI (MASTEMY-DESIGN 20%)

- Worked applications: (1) Distinguish control done by the PLC from monitoring done by SCADA; (2) Identify a poor alarm practice that causes alarm flooding
- Common misconception addressed: Believing SCADA directly controls the process instead of supervising PLCs
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SCADA architecture and supervisory control | 96 | 8 |
| M04L02 | HMI design and alarms | 96 | 8 |

### M05 Networks and OT security (MASTEMY-DESIGN 20%)

- Worked applications: (1) Match a protocol to its typical role in a plant network; (2) Identify a basic OT security weakness in a described setup
- Common misconception addressed: Assuming IT security practices transfer unchanged to OT environments
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Industrial protocols and networks | 96 | 8 |
| M05L02 | OT cybersecurity basics | 96 | 8 |

## Integrative case

A new technician must support a packaging line's control system. Place the devices on the automation pyramid, follow a signal from a 4-20 mA sensor through the PLC scan to an output, explain how SCADA supervises rather than controls, and flag one alarm-management and one OT-security weakness to raise with the team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1178-final-protected | 25 | 25 | yes |
| MST-1178-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Automation foundations | 5 |
| PLC fundamentals | 5 |
| Sensors and signals | 5 |
| SCADA and HMI | 5 |
| Networks and OT security | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1178-Q0001** (single-answer, Select ONE) During a PLC scan cycle, in what order does the controller normally operate?

- A. Read inputs, execute the program, then update outputs **(key)**  
  _Rationale:_ Correct: the standard scan reads inputs, solves logic, then writes outputs, and repeats.
- B. Update outputs, read inputs, then execute the program  
  _Rationale:_ Outputs are written after logic runs, not first.
- C. Execute the program continuously without reading inputs  
  _Rationale:_ Inputs are sampled each scan; logic is not run on stale-only data.
- D. Read and write all points at exactly the same instant  
  _Rationale:_ The scan is sequential, not simultaneous.

**MST-1178-Q0002** (multiple-answer, Select TWO) Which TWO statements correctly describe the roles of PLCs and SCADA? (Select TWO.)

- A. The PLC performs real-time control of the process **(key)**  
  _Rationale:_ Correct: PLCs execute the fast, deterministic control logic at the equipment.
- B. SCADA provides supervisory monitoring and operator oversight **(key)**  
  _Rationale:_ Correct: SCADA aggregates data and lets operators supervise and set points.
- C. SCADA replaces the PLC for real-time control loops  
  _Rationale:_ SCADA supervises; it does not run the fast control loops itself.
- D. The PLC is only a display screen for operators  
  _Rationale:_ That describes an HMI, not a PLC.

**MST-1178-Q0003** (single-answer, Select ONE) A 4-20 mA transmitter measures 0-100 degC. What temperature does a 12 mA signal represent?

- A. 50 degC **(key)**  
  _Rationale:_ Correct: 12 mA is the midpoint of 4-20 mA, so it maps to 50% of the 0-100 range.
- B. 12 degC  
  _Rationale:_ The signal is in mA, not degrees; 12 mA maps to the midpoint of the range.
- C. 40 degC  
  _Rationale:_ This miscalculates the linear scaling; 12 mA is exactly mid-range.
- D. 60 degC  
  _Rationale:_ 12 mA is the midpoint, which is 50 degC, not 60.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
