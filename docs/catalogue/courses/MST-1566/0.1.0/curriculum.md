# Clean Code

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1566` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write readable code with clear naming and structure
2. Design small, single-purpose functions and modules
3. Handle errors and edge cases cleanly
4. Write and value meaningful tests
5. Recognise and reduce code smells
6. Apply clean-code principles during review and refactoring

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Naming and readability (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rename cryptic variables to intent; (2) Reformat a dense block for readability
- Common misconception addressed: Encoding type information into names instead of intent
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Intention-revealing names | 168 | 8 |
| M01L02 | Formatting and consistent structure | 168 | 8 |

### M02 Functions and modules (MASTEMY-DESIGN 20%)

- Worked applications: (1) Extract a long function into smaller ones; (2) Reduce a function's argument count
- Common misconception addressed: Functions that do several unrelated things
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Small single-purpose functions | 168 | 8 |
| M02L02 | Arguments, side effects and cohesion | 168 | 8 |

### M03 Error handling and edge cases (MASTEMY-DESIGN 20%)

- Worked applications: (1) Replace nested conditionals with guard clauses; (2) Handle a boundary input explicitly
- Common misconception addressed: Swallowing exceptions silently
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Exceptions vs error codes | 168 | 8 |
| M03L02 | Guard clauses and null handling | 168 | 8 |

### M04 Tests and clean code (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a focused test for one behaviour; (2) Refactor a brittle test
- Common misconception addressed: Tests that assert many unrelated things at once
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | What makes a good unit test | 168 | 8 |
| M04L02 | Test readability and the F.I.R.S.T. ideas | 168 | 8 |

### M05 Smells and refactoring (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify duplication and extract it; (2) Perform a behaviour-preserving rename
- Common misconception addressed: Refactoring without tests to protect behaviour
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Common code smells | 168 | 8 |
| M05L02 | Safe incremental refactoring | 168 | 8 |

## Integrative case

Take a 300-line 'god function' from a code review and incrementally improve it: rename, extract functions, remove duplication and add tests, defending each change as behaviour-preserving.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1566-final-protected | 25 | 25 | yes |
| MST-1566-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Naming and readability | 5 |
| Functions and modules | 5 |
| Error handling and edge cases | 5 |
| Tests and clean code | 5 |
| Smells and refactoring | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1566-Q0001** (single-answer, Select ONE) What is the main goal of intention-revealing names?

- A. To let a reader understand purpose without extra comments **(key)**  
  _Rationale:_ Correct: good names reduce the need for comments.
- B. To make names as short as possible  
  _Rationale:_ Brevity is not the goal; clarity is.
- C. To encode the variable's type in the name  
  _Rationale:_ Type encoding is discouraged in clean code.
- D. To match the database column names  
  _Rationale:_ That is incidental, not the goal.

**MST-1566-Q0002** (multiple-answer, Select TWO) Which TWO are signs a function should be split? (Select TWO.)

- A. It does several unrelated things **(key)**  
  _Rationale:_ Correct: multiple responsibilities signal a split.
- B. It has many levels of nested logic **(key)**  
  _Rationale:_ Correct: deep nesting often hides separable steps.
- C. It has a descriptive name  
  _Rationale:_ A good name is positive, not a smell.
- D. It is covered by tests  
  _Rationale:_ Test coverage is not a reason to split.

**MST-1566-Q0003** (single-answer, Select ONE) Why avoid swallowing exceptions silently?

- A. It hides failures and makes debugging harder **(key)**  
  _Rationale:_ Correct: silent catches obscure real problems.
- B. It always crashes the program  
  _Rationale:_ Silent swallowing does the opposite of crashing.
- C. It improves performance  
  _Rationale:_ Performance is not the issue.
- D. It is required by all style guides  
  _Rationale:_ It is discouraged, not required.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
