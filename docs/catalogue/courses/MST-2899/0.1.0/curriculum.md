# Micro:bit and Physical Computing (Ages 11-13)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2899` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal blueprint (no external syllabus) |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Micro:bit and Physical Computing (Ages 11-13) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the micro:bit's inputs, outputs and sensors
2. Program the LED display to show images and text
3. Use buttons and the accelerometer as inputs
4. Respond to sensor readings with conditionals
5. Use variables to store sensor data or counts
6. Plan, build and test a small physical-computing project

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Meet the micro:bit (25% (design weight), design weight)

- Worked applications: (1) Show a heart image then scroll your name; (2) Display a different icon for each button
- Common misconception addressed: Thinking the micro:bit needs a screen and keyboard to work
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inputs, outputs and on-board sensors | 120 | 7 |
| M01L02 | The LED display: images and scrolling text | 120 | 7 |

### M02 Inputs (25% (design weight), design weight)

- Worked applications: (1) Count button-A presses in a variable; (2) Trigger an action when the board is shaken
- Common misconception addressed: Thinking the accelerometer measures temperature
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Buttons A and B as inputs | 120 | 7 |
| M02L02 | The accelerometer: shake and tilt | 120 | 7 |

### M03 Reacting to the world (25% (design weight), design weight)

- Worked applications: (1) Show a warning icon when it gets dark; (2) Branch behaviour using an if on a sensor value
- Common misconception addressed: Thinking a sensor value is just one fixed number forever
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditionals with sensor values | 120 | 7 |
| M03L02 | Using the temperature and light sensors | 120 | 7 |

### M04 Building a project (25% (design weight), design weight)

- Worked applications: (1) Build a step-counter that counts shakes; (2) Test it by walking and fix over-counting
- Common misconception addressed: Thinking a first prototype needs no testing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Variables to count or store readings | 120 | 7 |
| M04L02 | Planning, building and testing | 120 | 7 |

## Integrative case

Learners build a micro:bit 'reaction timer and step counter': it shows icons on the LED grid, uses buttons and the accelerometer as inputs, counts shakes in a variable, warns when the room is dark using the light sensor, and they test and reduce over-counting.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2899-final-protected | 40 | 40 | yes |
| MST-2899-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Meet the micro:bit | 10 |
| Inputs | 10 |
| Reacting to the world | 10 |
| Building a project | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2899-Q0001** (single-answer, Select ONE) On a micro:bit, which of these is an INPUT?

- A. Button A, which the program can read when pressed **(key)**  
  _Rationale:_ Correct: buttons are inputs the program reads.
- B. The LED display showing a picture  
  _Rationale:_ The LED display is an output, not an input.
- C. The buzzer making a sound  
  _Rationale:_ Sound output is an output, not an input.
- D. A scrolling text message  
  _Rationale:_ Scrolling text is output shown on the display.

**MST-2899-Q0002** (multiple-answer, Select TWO) Which TWO are sensors built into the micro:bit? (Select TWO.)

- A. The accelerometer (detects movement/tilt) **(key)**  
  _Rationale:_ Correct: the accelerometer senses movement and tilt.
- B. The light sensor (detects brightness) **(key)**  
  _Rationale:_ Correct: the micro:bit can sense light levels.
- C. A colour printer  
  _Rationale:_ A printer is not part of the micro:bit.
- D. A hard disk drive  
  _Rationale:_ The micro:bit does not have a hard disk sensor.

**MST-2899-Q0003** (single-answer, Select ONE) Your step-counter counts far too many steps for one walk. What is a sensible fix?

- A. Adjust the code so it only counts a step when the shake is big enough, avoiding tiny jiggles **(key)**  
  _Rationale:_ Correct: tune the threshold/condition so small movements are ignored.
- B. Walk much faster  
  _Rationale:_ Walking faster does not fix over-counting.
- C. Remove the accelerometer  
  _Rationale:_ Without it the counter cannot detect steps.
- D. Count the steps by hand instead  
  _Rationale:_ The project is to make the micro:bit count correctly.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
