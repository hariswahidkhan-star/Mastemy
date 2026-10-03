# Java Programming: Basic

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2558` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint for a Basic-level Java programming course. Language, library and tooling specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Java Programming: Basic (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write, run and debug small Java programs using the standard toolchain
2. Use Java's primitive types, literals and operators correctly
3. Convert between types and explain Java's expression-evaluation rules
4. Control program flow with conditionals and loops
5. Decompose a task into functions with clear parameters and return values
6. Read error messages and fix common beginner mistakes in Java

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Setting up and first programs (25%, design weight)

- Worked applications: (1) Write and run a Java program that prints a computed value; (2) Fix three reported syntax errors in a short Java script
- Common misconception addressed: Believing a program always runs line by line, ignoring how Java evaluates expressions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installing the Java toolchain and running your first program | 120 | 7 |
| M01L02 | Variables, literals and basic input/output | 120 | 7 |

### M02 Data types and operators (25%, design weight)

- Worked applications: (1) Build a simple unit converter using arithmetic and string formatting; (2) Predict the result of several mixed-type expressions
- Common misconception addressed: Assuming integer and floating-point division always behave the same
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Numbers, strings and booleans in Java | 120 | 7 |
| M02L02 | Operators, expressions and type conversion | 120 | 7 |

### M03 Control flow (25%, design weight)

- Worked applications: (1) Implement FizzBuzz using loops and conditionals; (2) Trace a nested loop and count how many times the body runs
- Common misconception addressed: Confusing assignment with the equality comparison operator
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditionals and branching | 120 | 7 |
| M03L02 | Loops and iteration | 120 | 7 |

### M04 Functions and program structure (25%, design weight)

- Worked applications: (1) Refactor repeated code into a reusable function; (2) Diagnose a bug caused by a variable's scope
- Common misconception addressed: Believing every function must return a value
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Defining and calling functions | 120 | 7 |
| M04L02 | Parameters, return values and scope | 120 | 7 |

## Integrative case

A beginner must build a small command-line Java program that reads input, validates it with conditionals, computes a result inside functions, and prints a formatted report, fixing each error the toolchain reports along the way.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2558-final-protected | 40 | 40 | yes |
| MST-2558-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Setting up and first programs | 10 |
| Data types and operators | 10 |
| Control flow | 10 |
| Functions and program structure | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2558-Q0001** (single-answer, Select ONE) In Java, what is the most reliable first step when the toolchain reports a syntax error on a line?

- A. Read the error message and its location, then inspect that line and the one above it **(key)**  
  _Rationale:_ Correct: the message and position point directly at the fault, which often starts on the previous line.
- B. Rewrite the whole program from scratch  
  _Rationale:_ Wasteful and does not teach you what was wrong.
- C. Ignore the error and run the program again  
  _Rationale:_ The error stops the program; running again changes nothing.
- D. Delete the reported line without reading it  
  _Rationale:_ This removes needed logic without understanding the cause.

**MST-2558-Q0002** (multiple-answer, Select TWO) Which TWO statements about variables in Java are correct? (Select TWO.)

- A. A variable must be assigned a value before it is read **(key)**  
  _Rationale:_ Correct: reading an unassigned variable is a common beginner error.
- B. A descriptive variable name makes a program easier to read and maintain **(key)**  
  _Rationale:_ Correct: clear names communicate intent to future readers.
- C. Variable names may freely begin with a digit  
  _Rationale:_ Identifiers generally cannot start with a digit.
- D. Choosing a variable name changes how fast the program runs  
  _Rationale:_ Names do not affect runtime behaviour.

**MST-2558-Q0003** (single-answer, Select ONE) A loop that should run ten times instead runs forever. What is the most likely cause?

- A. The loop's termination condition never becomes false because the counter is not updated **(key)**  
  _Rationale:_ Correct: without progress toward the exit condition the loop never ends.
- B. The program has too many comments  
  _Rationale:_ Comments do not affect control flow.
- C. The computer is too slow  
  _Rationale:_ Speed does not cause an infinite loop.
- D. Loops are not allowed to run ten times  
  _Rationale:_ There is no such restriction.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
