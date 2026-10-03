# Introduction to Robotics for Kids (Ages 8-10)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2893` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Introduction to Robotics for Kids (Ages 8-10) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe what a robot is and name its main parts
2. Explain how sensors let a robot gather information
3. Explain how motors and outputs let a robot act
4. Describe the sense-think-act loop a robot follows
5. Program a robot to respond to a sensor reading
6. Work safely and as a team when building and testing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 What is a robot? (25% (design weight), design weight)

- Worked applications: (1) Label the parts of a classroom robot; (2) Sort everyday machines into 'robot' and 'not a robot'
- Common misconception addressed: Thinking anything that moves is a robot
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Robots around us and their parts | 120 | 7 |
| M01L02 | Inputs, outputs and the robot 'brain' | 120 | 7 |

### M02 Sensors (sense) (25% (design weight), design weight)

- Worked applications: (1) Cover a light sensor and watch the value change; (2) Choose the right sensor to detect a wall
- Common misconception addressed: Thinking a sensor can act on its own without a program
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Common sensors: light, distance, touch | 120 | 7 |
| M02L02 | Reading a sensor value | 120 | 7 |

### M03 Motors and actions (act) (25% (design weight), design weight)

- Worked applications: (1) Make a robot drive forward for 2 seconds; (2) Turn on a light when a button is pressed
- Common misconception addressed: Thinking motors decide what to do by themselves
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Motors, wheels and moving | 120 | 7 |
| M03L02 | Outputs: lights, sounds and grippers | 120 | 7 |

### M04 Sense-think-act and teamwork (25% (design weight), design weight)

- Worked applications: (1) Program: if distance is small, then stop; (2) Agree team roles before testing the robot
- Common misconception addressed: Thinking a robot thinks like a person
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The sense-think-act loop | 120 | 7 |
| M04L02 | Testing safely and sharing roles | 120 | 7 |

## Integrative case

A team builds and programs a small robot to drive across a table and stop before the edge using a distance sensor: they plan the sense-think-act loop, assign roles, test safely, and fix the point where the robot stops too late.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2893-final-protected | 40 | 40 | yes |
| MST-2893-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| What is a robot? | 10 |
| Sensors (sense) | 10 |
| Motors and actions (act) | 10 |
| Sense-think-act and teamwork | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2893-Q0001** (single-answer, Select ONE) What is the 'sense-think-act' loop in a robot?

- A. The robot reads a sensor, decides what to do, then moves or acts **(key)**  
  _Rationale:_ Correct: sense (read), think (decide), act (move/output), repeated.
- B. The robot only sits and waits  
  _Rationale:_ A robot senses, decides and acts; it does not just wait.
- C. The robot reads minds  
  _Rationale:_ Robots use sensors, not mind-reading.
- D. The robot acts first and never senses  
  _Rationale:_ Sensing comes before acting in the loop.

**MST-2893-Q0002** (multiple-answer, Select TWO) Which TWO of these are sensors that give a robot information? (Select TWO.)

- A. A distance sensor **(key)**  
  _Rationale:_ Correct: it senses how far away an object is.
- B. A light sensor **(key)**  
  _Rationale:_ Correct: it senses how bright it is.
- C. A wheel motor  
  _Rationale:_ A motor makes the robot move; it is an output, not a sensor.
- D. A buzzer  
  _Rationale:_ A buzzer makes sound; it is an output, not a sensor.

**MST-2893-Q0003** (single-answer, Select ONE) A robot should stop before the table edge but falls off. What is the best fix?

- A. Adjust the program so it stops when the distance sensor reads a bigger gap (stops sooner) **(key)**  
  _Rationale:_ Correct: change the sensor threshold so it reacts in time.
- B. Make the robot drive faster  
  _Rationale:_ Faster driving makes it fall off sooner, not safer.
- C. Remove the distance sensor  
  _Rationale:_ Without the sensor it cannot detect the edge.
- D. Hope it works next time  
  _Rationale:_ We fix the program instead of hoping.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
