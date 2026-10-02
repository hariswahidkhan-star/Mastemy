# Embedded Systems Programming

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1593` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-ESP-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Embedded Systems Programming (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Embedded foundations
2. The toolchain
3. GPIO and peripherals
4. Interrupts
5. Serial buses
6. Timers and PWM
7. Memory and concurrency
8. Power and real-time

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on programming embedded systems; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Embedded foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Describe constraints of an embedded target; (2) Compare an MCU with an application processor
- Common misconception addressed: Assuming a desktop programming model applies unchanged
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What makes a system embedded | 75 | 5 |
| M01L02 | Microcontrollers vs microprocessors | 75 | 5 |

### M02 The toolchain (MASTEMY-DESIGN 13%)

- Worked applications: (1) Build and flash firmware to a board; (2) Read a linker script's memory regions
- Common misconception addressed: Ignoring the limited flash/RAM budget
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cross-compilation and flashing | 75 | 5 |
| M02L02 | Memory map and linker basics | 75 | 5 |

### M03 GPIO and peripherals (MASTEMY-DESIGN 12%)

- Worked applications: (1) Toggle a GPIO pin via registers; (2) Find a register in the datasheet
- Common misconception addressed: Writing to a peripheral without enabling its clock
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Digital I/O and registers | 75 | 5 |
| M03L02 | Reading datasheets | 75 | 5 |

### M04 Interrupts (MASTEMY-DESIGN 13%)

- Worked applications: (1) Handle a button press with an interrupt; (2) Keep an ISR short and fast
- Common misconception addressed: Doing heavy work or blocking inside an ISR
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Interrupt service routines | 75 | 5 |
| M04L02 | Interrupt priorities and latency | 75 | 5 |

### M05 Serial buses (MASTEMY-DESIGN 12%)

- Worked applications: (1) Read a sensor over I2C; (2) Choose SPI vs I2C for a device
- Common misconception addressed: Mismatching baud rate or voltage levels
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | UART, SPI and I2C | 75 | 5 |
| M05L02 | Choosing a bus | 75 | 5 |

### M06 Timers and PWM (MASTEMY-DESIGN 13%)

- Worked applications: (1) Generate a PWM signal for an LED; (2) Use a timer for a periodic task
- Common misconception addressed: Using busy-wait delays instead of timers
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Hardware timers | 75 | 5 |
| M06L02 | Generating PWM | 75 | 5 |

### M07 Memory and concurrency (MASTEMY-DESIGN 12%)

- Worked applications: (1) Avoid dynamic allocation in a loop; (2) Mark an ISR-shared variable volatile
- Common misconception addressed: Sharing a variable with an ISR without volatile/atomicity
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Stack, heap and static memory | 75 | 5 |
| M07L02 | volatile and shared data | 75 | 5 |

### M08 Power and real-time (MASTEMY-DESIGN 12%)

- Worked applications: (1) Put the MCU into a sleep mode; (2) Reason about a hard real-time deadline
- Common misconception addressed: Ignoring power budget on a battery device
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Low-power modes | 75 | 5 |
| M08L02 | Meeting timing deadlines | 75 | 5 |

## Integrative case

Program a microcontroller for a sensor-and-actuator device: read a sensor over a peripheral bus, respond to an interrupt, drive an output with a timer/PWM, manage limited memory, and reason about timing and power constraints.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1593-final-protected | 40 | 40 | yes |
| MST-1593-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Embedded foundations | 5 |
| The toolchain | 5 |
| GPIO and peripherals | 5 |
| Interrupts | 5 |
| Serial buses | 5 |
| Timers and PWM | 5 |
| Memory and concurrency | 5 |
| Power and real-time | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1593-Q0001** (single-answer, Select ONE) Why should an interrupt service routine (ISR) be kept short and avoid blocking?

- A. A long ISR delays other interrupts and can cause missed events or latency **(key)**  
  _Rationale:_ Correct: ISRs should do minimal work and defer the rest.
- B. ISRs cannot access any variables  
  _Rationale:_ They can access variables, carefully.
- C. ISRs run only once per power cycle  
  _Rationale:_ They run on each triggering event.
- D. A long ISR speeds up the main loop  
  _Rationale:_ It harms responsiveness, not helps.

**MST-1593-Q0002** (single-answer, Select ONE) Why must a variable shared between an ISR and main code often be declared volatile?

- A. It prevents the compiler from caching the value, ensuring each access reads the real memory **(key)**  
  _Rationale:_ Correct: volatile stops optimisations that would miss ISR updates.
- B. It makes the variable thread-safe by itself  
  _Rationale:_ volatile does not guarantee atomicity.
- C. It allocates the variable on the heap  
  _Rationale:_ volatile does not control allocation.
- D. It speeds up access to the variable  
  _Rationale:_ It typically prevents caching, not speeds up.

**MST-1593-Q0003** (multiple-answer, Select ALL that apply) Which statements about embedded development are correct? (Select TWO)

- A. Hardware timers/PWM are preferred over busy-wait delays for periodic tasks **(key)**  
  _Rationale:_ Correct: timers free the CPU and keep timing accurate.
- B. A peripheral often needs its clock enabled before use **(key)**  
  _Rationale:_ Correct: forgetting the clock gate is a common bug.
- C. Embedded targets typically have abundant RAM like desktops  
  _Rationale:_ False; memory is tightly constrained.
- D. Dynamic allocation in a tight loop is best practice on MCUs  
  _Rationale:_ False; it risks fragmentation and is usually avoided.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
