# Building Simple Games in Python (Ages 11-13)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2897` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Building Simple Games in Python (Ages 11-13) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure a small game using functions
2. Use loops to run a game's main loop
3. Use conditionals to handle player choices and rules
4. Store game state such as score and lives in variables
5. Use randomness to make a game less predictable
6. Test and debug a text-based game

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Game structure with functions (25% (design weight), design weight)

- Worked applications: (1) Write a function that rolls a dice and returns the value; (2) Call the function from the main program
- Common misconception addressed: Thinking code inside a function runs before it is called
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Defining and calling functions | 120 | 7 |
| M01L02 | Splitting a game into small functions | 120 | 7 |

### M02 The game loop (25% (design weight), design weight)

- Worked applications: (1) Keep a game running with a while loop; (2) End the loop when the player wins or quits
- Common misconception addressed: Thinking the game loop needs no way to end
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | A main loop that keeps the game running | 120 | 7 |
| M02L02 | Ending the loop on a win or quit | 120 | 7 |

### M03 Rules and choices (25% (design weight), design weight)

- Worked applications: (1) Reject invalid menu choices and ask again; (2) Branch the game with if/elif on the choice
- Common misconception addressed: Thinking all user input is always valid
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Handling input and validating choices | 120 | 7 |
| M03L02 | Using conditionals for game rules | 120 | 7 |

### M04 State, randomness and testing (25% (design weight), design weight)

- Worked applications: (1) Use random to pick a secret number; (2) Fix a bug where the score updates in the wrong place
- Common misconception addressed: Thinking random gives the same result every run
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Tracking score and lives; import random | 120 | 7 |
| M04L02 | Testing and debugging the game | 120 | 7 |

## Integrative case

Learners build a text 'rock-paper-scissors' game in Python: functions for the computer's random move and for scoring, a main loop that plays rounds until the player quits, input validation for choices, and they debug a scoring error.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2897-final-protected | 40 | 40 | yes |
| MST-2897-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Game structure with functions | 10 |
| The game loop | 10 |
| Rules and choices | 10 |
| State, randomness and testing | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2897-Q0001** (single-answer, Select ONE) Why split a game into functions instead of one long block of code?

- A. Functions organise the code into reusable, named parts that are easier to test and fix **(key)**  
  _Rationale:_ Correct: functions make code reusable, readable and easier to debug.
- B. Functions make the game run without a computer  
  _Rationale:_ Code still needs a computer; functions just organise it.
- C. Python refuses to run code without functions  
  _Rationale:_ Python can run code without functions; they just help.
- D. Functions automatically win the game  
  _Rationale:_ Functions organise code; they do not play the game.

**MST-2897-Q0002** (multiple-answer, Select TWO) Which TWO are good reasons to use the random module in a game? (Select TWO.)

- A. To make the computer's move unpredictable **(key)**  
  _Rationale:_ Correct: randomness stops the computer always doing the same thing.
- B. To pick a secret number for a guessing game **(key)**  
  _Rationale:_ Correct: random can choose a hidden value.
- C. To guarantee the player always wins  
  _Rationale:_ Randomness does not guarantee a win for anyone.
- D. To remove the need for a game loop  
  _Rationale:_ A game still needs a loop; random does not replace it.

**MST-2897-Q0003** (single-answer, Select ONE) A player types 'banana' at a rock/paper/scissors prompt and the game crashes. What is the best fix?

- A. Validate the input and ask again if it is not a valid choice **(key)**  
  _Rationale:_ Correct: input validation handles unexpected entries safely.
- B. Tell players never to make mistakes  
  _Rationale:_ Programs should handle mistakes, not just forbid them.
- C. Remove the input entirely  
  _Rationale:_ The game needs the player's choice.
- D. Ignore the crash  
  _Rationale:_ Crashes should be fixed with validation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
