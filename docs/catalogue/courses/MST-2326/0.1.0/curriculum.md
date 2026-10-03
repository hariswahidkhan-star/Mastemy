# Firmware And Device Drivers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2326` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Firmware And Device Drivers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain where firmware and drivers sit between hardware and the OS
2. Describe the boot process and firmware responsibilities
3. Access hardware through memory-mapped registers safely
4. Explain interrupt handling and driver execution contexts
5. Reason about concurrency and synchronisation in driver code
6. Apply practices for driver testing, logging and versioning

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Firmware fundamentals (25% (Mastemy design weight), design weight)

- Worked applications: (1) Order the steps from power-on reset to handing control to the OS; (2) Separate what firmware owns from what the OS driver owns
- Common misconception addressed: Confusing firmware stored on the device with the host OS driver
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Firmware vs application vs OS | 120 | 7 |
| M01L02 | Boot sequence and initialisation | 120 | 7 |

### M02 Register-level hardware access (25% (Mastemy design weight), design weight)

- Worked applications: (1) Read a datasheet to compute a register's address and the bit to set; (2) Explain why a register access must be declared volatile
- Common misconception addressed: Reading a hardware register once and caching the value by mistake
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Memory-mapped I/O and registers | 120 | 7 |
| M02L02 | Volatile access and bit manipulation | 120 | 7 |

### M03 Interrupts and driver contexts (25% (Mastemy design weight), design weight)

- Worked applications: (1) Split a driver into a short interrupt handler and deferred bottom-half work; (2) Describe how a driver exposes a read/write interface to the OS
- Common misconception addressed: Doing lengthy or sleeping work inside an interrupt handler
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Interrupt handlers and deferred work | 120 | 7 |
| M03L02 | Driver models and the OS interface | 120 | 7 |

### M04 Reliability (25% (Mastemy design weight), design weight)

- Worked applications: (1) Protect a shared device register with a lock against concurrent access; (2) Design a firmware update that verifies an image before applying it
- Common misconception addressed: Assuming driver code never runs concurrently on multi-core systems
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Concurrency and synchronisation in drivers | 120 | 7 |
| M04L02 | Testing, logging and firmware updates | 120 | 7 |

## Integrative case

A new sensor board ships with buggy firmware and an unstable Linux driver: trace the boot and initialisation path, audit the register access and interrupt handling for concurrency faults, and propose a safe update and test plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2326-final-protected | 40 | 40 | yes |
| MST-2326-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Firmware fundamentals | 10 |
| Register-level hardware access | 10 |
| Interrupts and driver contexts | 10 |
| Reliability | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2326-Q0001** (single-answer, Select ONE) Why must a variable mapped to a hardware status register be declared volatile in C?

- A. Because the hardware can change it independently, so the compiler must not cache or optimise away reads **(key)**  
  _Rationale:_ Correct: volatile forces each access, since hardware may change the register at any time.
- B. Because it makes the access faster  
  _Rationale:_ Volatile prevents optimisation; it does not speed access up.
- C. Because volatile encrypts the register value  
  _Rationale:_ Volatile has nothing to do with encryption.
- D. Because the OS requires all variables to be volatile  
  _Rationale:_ Only hardware- or concurrency-affected values need volatile.

**MST-2326-Q0002** (multiple-answer, Select TWO) Which TWO practices keep an interrupt handler safe and responsive? (Select TWO.)

- A. Keep the handler short and defer heavy work to a bottom half **(key)**  
  _Rationale:_ Correct: short handlers plus deferred work keep latency low.
- B. Avoid blocking or sleeping inside the handler **(key)**  
  _Rationale:_ Correct: handlers must not sleep, as they run in interrupt context.
- C. Perform long file I/O directly in the handler  
  _Rationale:_ Long I/O in a handler blocks other interrupts.
- D. Acquire a sleeping lock inside the handler  
  _Rationale:_ Sleeping locks are unsafe in interrupt context.

**MST-2326-Q0003** (single-answer, Select ONE) During boot, what is the typical responsibility of firmware before the operating system takes over?

- A. Initialise core hardware and load the OS or bootloader **(key)**  
  _Rationale:_ Correct: firmware brings up essential hardware and hands off to the OS/bootloader.
- B. Run user applications directly  
  _Rationale:_ User applications run later, under the OS.
- C. Render the desktop user interface  
  _Rationale:_ The UI is an OS/application concern, not firmware's boot role.
- D. Manage virtual memory paging for processes  
  _Rationale:_ Paging is an OS responsibility, established after boot.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
