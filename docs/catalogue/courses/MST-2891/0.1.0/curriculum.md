# Block Coding with Scratch (Ages 8-10)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2891` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Block Coding with Scratch (Ages 8-10) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build a sequence of blocks to control a sprite
2. Use loops to repeat actions efficiently
3. Use events (when clicked, when key pressed) to trigger scripts
4. Store and change information in a variable (e.g. a score)
5. Use an if-block to make a decision based on a condition
6. Plan, test and debug a small interactive project

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Sequences and events (25% (design weight), design weight)

- Worked applications: (1) Make a sprite walk when the space key is pressed; (2) Trigger two scripts from one green-flag event
- Common misconception addressed: Thinking all blocks run top-to-bottom even without an event hat
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Scripts, blocks and the stage | 120 | 7 |
| M01L02 | Events: starting scripts with clicks and keys | 120 | 7 |

### M02 Loops (25% (design weight), design weight)

- Worked applications: (1) Draw a square with a repeat 4 loop; (2) Use forever to keep a sprite bouncing
- Common misconception addressed: Thinking a forever loop will also run the blocks after it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Repeat and forever loops | 120 | 7 |
| M02L02 | Nesting a loop inside a loop | 120 | 7 |

### M03 Variables (25% (design weight), design weight)

- Worked applications: (1) Create a score variable that starts at 0; (2) Add 1 to score when a sprite is touched
- Common misconception addressed: Thinking a variable resets itself automatically each play
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Making a variable and showing it | 120 | 7 |
| M03L02 | Changing a score during play | 120 | 7 |

### M04 Conditions and debugging (25% (design weight), design weight)

- Worked applications: (1) Use if touching colour then bounce; (2) Find why a sprite never bounces and fix the condition
- Common misconception addressed: Thinking an if-block keeps checking without being inside a loop
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | If-then decisions with a condition | 120 | 7 |
| M04L02 | Testing and debugging a project | 120 | 7 |

## Integrative case

Learners build a 'catch the apples' game: a basket moves with the arrow keys, apples fall in a loop, a score variable increases on a catch, and an if-block ends the game at 10 points; they test and debug it.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2891-final-protected | 40 | 40 | yes |
| MST-2891-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Sequences and events | 10 |
| Loops | 10 |
| Variables | 10 |
| Conditions and debugging | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2891-Q0001** (single-answer, Select ONE) Why would you use a 'repeat 10' loop instead of dragging the same block ten times?

- A. A loop does the same job with fewer blocks and is easier to change **(key)**  
  _Rationale:_ Correct: loops make repeated actions shorter and easier to edit.
- B. Loops make the sprite move faster every time  
  _Rationale:_ A loop repeats the action; it does not speed it up each time.
- C. Dragging ten blocks is impossible in Scratch  
  _Rationale:_ You can drag ten blocks; a loop is just tidier.
- D. Loops change the sprite's colour  
  _Rationale:_ Loops repeat actions, not colours.

**MST-2891-Q0002** (multiple-answer, Select TWO) Which TWO things does a variable let you do in a game? (Select TWO.)

- A. Keep track of the score **(key)**  
  _Rationale:_ Correct: a variable can store a changing score.
- B. Remember how many lives are left **(key)**  
  _Rationale:_ Correct: a variable can store the number of lives.
- C. Draw the background art  
  _Rationale:_ Backgrounds are set with the stage, not a variable.
- D. Make the computer run without electricity  
  _Rationale:_ Variables store values; they do not power the device.

**MST-2891-Q0003** (single-answer, Select ONE) A sprite should bounce when it touches red, but it never bounces. What is the most likely bug?

- A. The if-block or its condition is wrong, or it is not inside a loop that keeps checking **(key)**  
  _Rationale:_ Correct: the decision must be checked repeatedly and use the right condition.
- B. Scratch cannot detect colours  
  _Rationale:_ Scratch can detect colours with the touching-colour block.
- C. The sprite is too small to bounce  
  _Rationale:_ Size does not stop a bounce script from running.
- D. Red is not allowed in Scratch  
  _Rationale:_ Any colour can be used in a condition.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
