# Programming Fundamentals (Language-Agnostic)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1520` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-PFLA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Programming Fundamentals (Language-Agnostic) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Computational thinking and problem decomposition
2. Data, variables and expressions
3. Control flow: selection and iteration
4. Procedures, data structures and quality
5. Debugging, testing and reading code

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Computational thinking and problem decomposition (MASTEMY-DESIGN 18%)

- Worked applications: (1) Break a 'split a restaurant bill' task into inputs, steps and outputs; (2) Write pseudocode for finding the largest of three numbers
- Common misconception addressed: Believing a computer infers intent rather than following exact instructions
- Module check: 26 items / 26 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a program is: instructions, input and output | 144 | 6 |
| M01L02 | Decomposition, pseudocode and flowcharts | 144 | 6 |

### M02 Data, variables and expressions (MASTEMY-DESIGN 20%)

- Worked applications: (1) Model a shopping cart total with variables and arithmetic; (2) Predict the result of mixed integer and decimal arithmetic
- Common misconception addressed: Thinking a variable holds a formula rather than a stored value
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Values, types and variables | 144 | 6 |
| M02L02 | Operators, expressions and operator precedence | 144 | 6 |

### M03 Control flow: selection and iteration (MASTEMY-DESIGN 24%)

- Worked applications: (1) Trace an if/else ladder that assigns a grade from a score; (2) Count down from ten using a loop and an accumulator
- Common misconception addressed: Writing an off-by-one loop that runs one time too many or too few
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditions, boolean logic and selection | 144 | 6 |
| M03L02 | Loops: counted and condition-controlled | 144 | 6 |

### M04 Procedures, data structures and quality (MASTEMY-DESIGN 22%)

- Worked applications: (1) Refactor repeated steps into a reusable procedure with parameters; (2) Store a list of names and look one up by position
- Common misconception addressed: Assuming a procedure changes the caller's variables when it returns a value instead
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Procedures, parameters and return values | 144 | 6 |
| M04L02 | Arrays and lists: storing many values | 144 | 6 |

### M05 Debugging, testing and reading code (MASTEMY-DESIGN 16%)

- Worked applications: (1) Find the bug in a loop that never terminates; (2) Design two test cases including one edge case for a 'max of a list' routine
- Common misconception addressed: Treating code that runs without errors as code that is correct
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Errors, debugging and tracing | 144 | 6 |
| M05L02 | Testing, edge cases and reading others' code | 144 | 6 |

## Integrative case

Design and trace the logic for a small text-based quiz program: read input, validate it, branch on the answer, loop through questions, keep a running score with variables, and organise the steps into named procedures - expressed as pseudocode and a flowchart rather than one specific language.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1520-final-protected | 25 | 25 | yes |
| MST-1520-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Computational thinking and problem decomposition | 5 |
| Data, variables and expressions | 5 |
| Control flow: selection and iteration | 5 |
| Procedures, data structures and quality | 5 |
| Debugging, testing and reading code | 5 |

Minimum reviewed item bank: 422 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1520-Q0001** (single-answer, Select ONE) A loop keeps running and never stops. Which description names this problem?

- A. An infinite loop caused by a condition that never becomes false **(key)**  
  _Rationale:_ Correct: the loop condition is never made false, so the loop never ends.
- B. A syntax error that stops the program compiling  
  _Rationale:_ A syntax error prevents the program from running at all; this program runs but will not stop.
- C. A type mismatch between two variables  
  _Rationale:_ A type mismatch is unrelated to whether the loop terminates.
- D. A missing return value from a procedure  
  _Rationale:_ A missing return value does not by itself cause a loop to run forever.

**MST-1520-Q0002** (multiple-answer, Select ALL that apply) Which of the following are good reasons to break a program into procedures? (Select TWO)

- A. Each piece of logic can be named, reused and tested on its own **(key)**  
  _Rationale:_ Correct: procedures let you name, reuse and test a unit of logic independently.
- B. It removes the need to decompose the problem first  
  _Rationale:_ Decomposition is what leads you to the procedures; it is not replaced by them.
- C. Repeated steps can be written once and called many times **(key)**  
  _Rationale:_ Correct: shared logic lives in one place instead of being copied.
- D. It guarantees the program has no bugs  
  _Rationale:_ Procedures help organise code but do not guarantee correctness.

**MST-1520-Q0003** (single-answer, Select ONE) A program runs with no error messages but produces the wrong total. What kind of error is this?

- A. A logic error **(key)**  
  _Rationale:_ Correct: the program runs but the logic produces an incorrect result.
- B. A syntax error  
  _Rationale:_ A syntax error would stop the program from running at all.
- C. A hardware fault  
  _Rationale:_ Nothing indicates a hardware fault; the symptom is a wrong computed value.
- D. A missing input  
  _Rationale:_ The program produced an output, so input was received; the fault is in the logic.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
