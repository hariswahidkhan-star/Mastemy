# Python for Kids: First Steps (Ages 11-13)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2896` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Python for Kids: First Steps (Ages 11-13) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write and run a simple Python program that prints output
2. Store data in variables of different types (text, number)
3. Get input from a user and use it in a program
4. Use if/elif/else to make decisions
5. Use for and while loops to repeat actions
6. Find and fix common errors in Python code

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 First programs and variables (25% (design weight), design weight)

- Worked applications: (1) Print a personalised greeting; (2) Store a name and age in variables and print a sentence
- Common misconception addressed: Thinking a variable's value cannot be changed later
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | print(), running code and comments | 120 | 7 |
| M01L02 | Variables and basic data types | 120 | 7 |

### M02 Input and output (25% (design weight), design weight)

- Worked applications: (1) Ask the user their name and greet them; (2) Convert an input string to a number to add 1
- Common misconception addressed: Thinking input() returns a number by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Getting input() from the user | 120 | 7 |
| M02L02 | Converting text to numbers | 120 | 7 |

### M03 Making decisions (25% (design weight), design weight)

- Worked applications: (1) Write a program that says if a number is even or odd; (2) Add an elif branch for a third case
- Common misconception addressed: Thinking elif runs even when the first if was true
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Comparisons and if/elif/else | 120 | 7 |
| M03L02 | Combining conditions with and/or | 120 | 7 |

### M04 Loops and debugging (25% (design weight), design weight)

- Worked applications: (1) Print 1 to 10 with a for loop; (2) Repeat until the user types 'stop' with a while loop
- Common misconception addressed: Thinking a while loop stops on its own without a changing condition
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | for and while loops | 120 | 7 |
| M04L02 | Reading error messages and debugging | 120 | 7 |

## Integrative case

Learners build a simple 'number guessing' program in Python: it greets the user by name, reads guesses with input(), converts them to numbers, uses if/elif/else to say higher or lower, loops until correct, and they fix a type error along the way.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2896-final-protected | 40 | 40 | yes |
| MST-2896-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| First programs and variables | 10 |
| Input and output | 10 |
| Making decisions | 10 |
| Loops and debugging | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2896-Q0001** (single-answer, Select ONE) In Python, what does input() return by default when the user types 7?

- A. The text '7' (a string), which must be converted before doing maths **(key)**  
  _Rationale:_ Correct: input() returns a string; use int() to get a number.
- B. The number 7 ready for maths  
  _Rationale:_ input() returns text, not a number, by default.
- C. Nothing at all  
  _Rationale:_ input() returns what the user typed.
- D. A True/False value  
  _Rationale:_ input() returns a string, not a boolean.

**MST-2896-Q0002** (multiple-answer, Select TWO) Which TWO are valid ways to repeat an action in Python? (Select TWO.)

- A. A for loop **(key)**  
  _Rationale:_ Correct: for loops repeat a set number of times or over items.
- B. A while loop **(key)**  
  _Rationale:_ Correct: while loops repeat while a condition is true.
- C. An input() statement  
  _Rationale:_ input() reads one value; it does not repeat actions.
- D. A print() statement  
  _Rationale:_ print() shows output once; it does not loop.

**MST-2896-Q0003** (single-answer, Select ONE) Your while loop never stops. What is the most likely cause?

- A. The condition never becomes False because nothing inside the loop changes it **(key)**  
  _Rationale:_ Correct: a while loop needs its condition to eventually become False.
- B. Python does not support while loops  
  _Rationale:_ Python does support while loops.
- C. while loops always run forever  
  _Rationale:_ A correct while loop stops when its condition is False.
- D. You used too many comments  
  _Rationale:_ Comments do not affect whether a loop stops.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
