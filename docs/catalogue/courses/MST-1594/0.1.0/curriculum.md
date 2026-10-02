# Arduino and Microcontrollers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1594` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-AM-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Arduino and Microcontrollers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Arduino foundations
2. Digital I/O
3. Analog I/O
4. Timing
5. Debouncing and input
6. Sensors
7. Actuators and power
8. Communication

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on building projects with Arduino and microcontrollers; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Arduino foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Upload a blink sketch; (2) Explain setup() vs loop()
- Common misconception addressed: Putting one-time setup code inside loop()
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Boards and the IDE | 75 | 5 |
| M01L02 | The sketch: setup and loop | 75 | 5 |

### M02 Digital I/O (MASTEMY-DESIGN 13%)

- Worked applications: (1) Light an LED from a pin; (2) Wire a button with a pull-up resistor
- Common misconception addressed: Leaving an input floating without a pull resistor
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | pinMode and digitalWrite/Read | 75 | 5 |
| M02L02 | Buttons and pull resistors | 75 | 5 |

### M03 Analog I/O (MASTEMY-DESIGN 12%)

- Worked applications: (1) Read a potentiometer value; (2) Dim an LED with PWM
- Common misconception addressed: Expecting analogWrite to output a true analog voltage
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | analogRead and the ADC | 75 | 5 |
| M03L02 | analogWrite and PWM | 75 | 5 |

### M04 Timing (MASTEMY-DESIGN 13%)

- Worked applications: (1) Blink without delay using millis(); (2) Run two tasks without blocking
- Common misconception addressed: Using delay() and freezing the whole sketch
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | delay vs millis | 75 | 5 |
| M04L02 | Non-blocking timing | 75 | 5 |

### M05 Debouncing and input (MASTEMY-DESIGN 12%)

- Worked applications: (1) Debounce a noisy button; (2) Detect a single clean press
- Common misconception addressed: Counting one press as many due to bounce
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Switch bounce | 75 | 5 |
| M05L02 | Debounce techniques | 75 | 5 |

### M06 Sensors (MASTEMY-DESIGN 13%)

- Worked applications: (1) Read a temperature sensor; (2) Use a library to talk to a sensor
- Common misconception addressed: Ignoring sensor wiring/voltage requirements
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Reading common sensors | 75 | 5 |
| M06L02 | Libraries for sensors | 75 | 5 |

### M07 Actuators and power (MASTEMY-DESIGN 12%)

- Worked applications: (1) Drive a motor with a transistor/driver; (2) Power a load from a separate supply
- Common misconception addressed: Driving a motor directly from a logic pin
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Driving motors and relays | 75 | 5 |
| M07L02 | Powering external loads safely | 75 | 5 |

### M08 Communication (MASTEMY-DESIGN 12%)

- Worked applications: (1) Print sensor values to the serial monitor; (2) Send data over serial to a device
- Common misconception addressed: Relying on long serial prints that slow the loop
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Serial monitor and debugging | 75 | 5 |
| M08L02 | Talking to another device | 75 | 5 |

## Integrative case

Build an Arduino device that reads a sensor and controls an output: wire the circuit, write sketch code with setup and loop, debounce a button, read an analog sensor, and drive a motor or LED safely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1594-final-protected | 40 | 40 | yes |
| MST-1594-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Arduino foundations | 5 |
| Digital I/O | 5 |
| Analog I/O | 5 |
| Timing | 5 |
| Debouncing and input | 5 |
| Sensors | 5 |
| Actuators and power | 5 |
| Communication | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1594-Q0001** (single-answer, Select ONE) Why use millis() instead of delay() for timing multiple tasks in a sketch?

- A. delay() blocks all other code, while millis() lets the loop keep running and handle several tasks **(key)**  
  _Rationale:_ Correct: non-blocking timing keeps the program responsive.
- B. millis() is less accurate than delay()  
  _Rationale:_ millis-based timing is generally preferred for multitasking.
- C. delay() uses no CPU at all  
  _Rationale:_ delay() blocks the CPU from other work.
- D. millis() stops the loop entirely  
  _Rationale:_ It does not block the loop.

**MST-1594-Q0002** (single-answer, Select ONE) Why should a small motor usually be driven through a transistor or driver rather than directly from an Arduino pin?

- A. A logic pin cannot supply enough current and the motor's inductive load can damage the microcontroller **(key)**  
  _Rationale:_ Correct: a driver handles the current and protects the MCU.
- B. Motors require no current to run  
  _Rationale:_ Motors draw significant current.
- C. A pin outputs AC suitable for motors  
  _Rationale:_ Pins output DC logic levels.
- D. Transistors slow the motor down  
  _Rationale:_ A driver enables, not slows, the motor.

**MST-1594-Q0003** (multiple-answer, Select ALL that apply) Which statements about reading inputs on an Arduino are correct? (Select TWO)

- A. A digital input left unconnected can float, so a pull-up or pull-down resistor is used **(key)**  
  _Rationale:_ Correct: pull resistors give a defined logic level.
- B. A mechanical button can bounce, registering multiple transitions per press **(key)**  
  _Rationale:_ Correct: debouncing filters out the bounce.
- C. analogRead returns a true analog voltage, not a number  
  _Rationale:_ False; it returns a digitised integer from the ADC.
- D. Floating inputs always read a stable LOW  
  _Rationale:_ False; they read unpredictably.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
