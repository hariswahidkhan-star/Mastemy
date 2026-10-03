# PC Building And Hardware Troubleshooting

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2327` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — PC Building And Hardware Troubleshooting (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify PC components and their compatibility requirements
2. Assemble a PC safely using correct handling and static precautions
3. Configure firmware/BIOS settings and verify POST
4. Diagnose common hardware faults methodically
5. Reason about thermals, power supply sizing and cabling
6. Apply preventive maintenance and safe upgrade practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Components and compatibility (25% (Mastemy design weight), design weight)

- Worked applications: (1) Check that a chosen CPU, motherboard socket and RAM type are compatible; (2) Size a power supply for a build with a mid-range GPU
- Common misconception addressed: Assuming any RAM module fits any motherboard
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CPU, motherboard, RAM and storage | 120 | 7 |
| M01L02 | GPU, PSU and form factors | 120 | 7 |

### M02 Assembly (25% (Mastemy design weight), design weight)

- Worked applications: (1) Use an anti-static strap and handle components by their edges; (2) Seat a CPU and apply the right amount of thermal paste
- Common misconception addressed: Forcing a connector that is keyed to fit only one way
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | ESD safety and handling | 120 | 7 |
| M02L02 | Step-by-step build and cable management | 120 | 7 |

### M03 Firmware and bring-up (25% (Mastemy design weight), design weight)

- Worked applications: (1) Enable XMP/EXPO memory profiles and set the correct boot device; (2) Interpret POST beep or LED codes to locate a fault
- Common misconception addressed: Believing a black screen always means a dead motherboard
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | BIOS/UEFI settings and POST | 120 | 7 |
| M03L02 | Boot order, drivers and first boot | 120 | 7 |

### M04 Troubleshooting and maintenance (25% (Mastemy design weight), design weight)

- Worked applications: (1) Apply a swap-and-test method to isolate a faulty stick of RAM; (2) Diagnose thermal throttling from temperature and clock behaviour
- Common misconception addressed: Skipping the simplest checks like power and cabling first
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | A structured diagnostic method | 120 | 7 |
| M04L02 | Thermals, cleaning and safe upgrades | 120 | 7 |

## Integrative case

A gaming PC powers on but shows no display: work through a structured diagnostic, check compatibility, reseating, POST codes and thermals, and isolate whether the fault is the GPU, RAM or power supply before replacing parts.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2327-final-protected | 40 | 40 | yes |
| MST-2327-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Components and compatibility | 10 |
| Assembly | 10 |
| Firmware and bring-up | 10 |
| Troubleshooting and maintenance | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2327-Q0001** (single-answer, Select ONE) What is the single most important precaution when handling internal PC components?

- A. Guard against electrostatic discharge by grounding yourself and handling boards by the edges **(key)**  
  _Rationale:_ Correct: ESD can silently damage components, so grounding and edge-handling are essential.
- B. Work as quickly as possible to reduce exposure  
  _Rationale:_ Speed does not protect components; ESD control does.
- C. Keep the power supply switched on for convenience  
  _Rationale:_ Live power while building risks shorts and shocks.
- D. Hold chips firmly by their gold contacts  
  _Rationale:_ Touching contacts risks ESD damage and contamination.

**MST-2327-Q0002** (multiple-answer, Select TWO) Which TWO symptoms most directly point to a memory (RAM) fault during bring-up? (Select TWO.)

- A. The system fails POST with a memory-specific beep or LED code **(key)**  
  _Rationale:_ Correct: POST codes flag memory faults explicitly.
- B. Random crashes or memory errors that follow a specific stick when swapped **(key)**  
  _Rationale:_ Correct: a fault that tracks one stick indicates that module.
- C. The desktop wallpaper looks different  
  _Rationale:_ A wallpaper change is cosmetic and unrelated to RAM.
- D. The keyboard LEDs are the wrong colour  
  _Rationale:_ Keyboard lighting is unrelated to a RAM fault.

**MST-2327-Q0003** (single-answer, Select ONE) A PC powers on but gives no display. Following a structured method, what should you check first?

- A. The simplest causes first: power connections, monitor input and reseating the GPU/RAM **(key)**  
  _Rationale:_ Correct: structured troubleshooting checks the simplest, most likely causes first.
- B. Immediately replace the motherboard  
  _Rationale:_ Replacing parts before diagnosis is wasteful and premature.
- C. Reinstall the operating system  
  _Rationale:_ No display at POST is a hardware-stage issue, not an OS one.
- D. Update the GPU driver from within the OS  
  _Rationale:_ You cannot reach the OS if there is no display at boot.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
