# Microcontroller and Sensor Interfacing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2321` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Microcontroller and Sensor Interfacing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe microcontroller architecture and its on-chip peripherals
2. Configure GPIO, timers and interrupts for real-world tasks
3. Use common serial buses such as UART, SPI and I2C
4. Explain polling versus interrupt-driven I/O and their trade-offs
5. Reason about real-time constraints, latency and power modes
6. Apply safe practices for reading sensors and driving actuators

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Microcontroller architecture (25% (Mastemy design weight), design weight)

- Worked applications: (1) Read a datasheet to find the register that enables an on-chip timer; (2) Choose between flash, SRAM and EEPROM for different data lifetimes
- Common misconception addressed: Assuming a microcontroller runs an operating system by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CPU core, memory map and peripherals | 120 | 7 |
| M01L02 | Clock sources, reset and power modes | 120 | 7 |

### M02 Digital and analogue I/O (25% (Mastemy design weight), design weight)

- Worked applications: (1) Configure a GPIO pin as an input with a pull-up and debounce a button; (2) Set a PWM duty cycle to dim an LED to 25% brightness
- Common misconception addressed: Leaving a floating input pin and expecting a stable logic level
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | GPIO configuration and debouncing | 120 | 7 |
| M02L02 | ADC, PWM and driving actuators | 120 | 7 |

### M03 Interrupts and timing (25% (Mastemy design weight), design weight)

- Worked applications: (1) Write an interrupt service routine that is short and sets a flag; (2) Pick a timer prescaler and reload value for a 1 ms tick
- Common misconception addressed: Doing long blocking work inside an interrupt service routine
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Interrupts and the vector table | 120 | 7 |
| M03L02 | Timers, counters and scheduling | 120 | 7 |

### M04 Serial communication (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute the UART register value for 9600 baud from the peripheral clock; (2) Choose SPI versus I2C for connecting four sensors on one bus
- Common misconception addressed: Forgetting that I2C requires pull-up resistors on the bus lines
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | UART framing and baud rate | 120 | 7 |
| M04L02 | SPI and I2C bus protocols | 120 | 7 |

## Integrative case

A wearable heart-rate monitor must sample a sensor, respond to a button, and send readings over a serial bus while conserving battery: choose polling or interrupts, configure timers and a low-power mode, and justify the real-time design.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2321-final-protected | 40 | 40 | yes |
| MST-2321-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Microcontroller architecture | 10 |
| Digital and analogue I/O | 10 |
| Interrupts and timing | 10 |
| Serial communication | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2321-Q0001** (single-answer, Select ONE) Why is it poor practice to perform a long computation inside an interrupt service routine?

- A. It blocks other interrupts and increases latency for time-critical events **(key)**  
  _Rationale:_ Correct: a long ISR delays or masks other interrupts, hurting responsiveness.
- B. Interrupt routines cannot contain arithmetic  
  _Rationale:_ ISRs can do arithmetic; the issue is how long they run.
- C. The main loop stops permanently after an interrupt  
  _Rationale:_ The main loop resumes after the ISR returns.
- D. Interrupts automatically disable the CPU clock  
  _Rationale:_ Interrupts do not stop the clock.

**MST-2321-Q0002** (multiple-answer, Select TWO) Which TWO signals are required by the I2C bus for communication? (Select TWO.)

- A. A serial data line (SDA) **(key)**  
  _Rationale:_ Correct: I2C uses SDA to carry data bits.
- B. A serial clock line (SCL) **(key)**  
  _Rationale:_ Correct: I2C uses SCL to synchronise transfers.
- C. Separate transmit and receive lines like UART  
  _Rationale:_ Those belong to UART, not the two-wire I2C bus.
- D. A dedicated chip-select line per device like SPI  
  _Rationale:_ I2C addresses devices in software, not with chip-select lines.

**MST-2321-Q0003** (single-answer, Select ONE) A system must react to an external event within 50 microseconds even while busy. Which I/O approach fits best?

- A. Interrupt-driven I/O, so the event preempts the current work **(key)**  
  _Rationale:_ Correct: interrupts give bounded low-latency response regardless of main-loop work.
- B. Polling in a slow main loop  
  _Rationale:_ Polling latency depends on loop length and may exceed the deadline.
- C. Disabling all interrupts to save power  
  _Rationale:_ Disabling interrupts would prevent the required fast response.
- D. Adding a delay before checking the input  
  _Rationale:_ A delay increases, not decreases, response latency.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
