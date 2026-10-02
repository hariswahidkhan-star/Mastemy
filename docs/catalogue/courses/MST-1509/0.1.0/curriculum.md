# Python Institute PCEP Certified Entry-Level Python Programmer Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1509` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | OpenEDG Python Institute (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION: PCEP-30-02 (official source not verified) |
| Version basis | DESIGN ASSUMPTION - official outline not verified (network egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - no official source fetched; confirm outline, weightings and item counts before SME review |
| Legacy IDs | MST-PRG-PYI-PCEP-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the fundamentals of computer programming, interpreters and the Python execution model
2. Use Python data types, variables, operators, numeral systems, I/O and basic expressions
3. Apply conditional execution, loops, the bitwise and logical operators, lists and list processing
4. Define and call functions, scope rules, tuples, dictionaries, exceptions and basic data collection handling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Computer Programming and Python Fundamentals (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Trace how the Python interpreter reads and runs a multi-line script line by line; (2) Fix an IndentationError and a SyntaxError in a short broken snippet
- Common misconception addressed: Believing Python is compiled to machine code ahead of time like C
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Interpreting and the interpreter; compilation vs interpretation | 120 | 6 |
| M01L02 | Lexis, syntax and semantics; keywords, instructions, indentation | 120 | 6 |
| M01L03 | The print() function, positional and keyword arguments, escape sequences | 120 | 6 |

### M02 Data Types, Variables, I/O and Operators (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Convert a binary and a hexadecimal literal to decimal and predict the printed value; (2) Predict the result of an expression mixing // , % and ** with operator priority
- Common misconception addressed: Assuming input() returns an int rather than a string
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Literals, numeral systems and the bool type | 120 | 6 |
| M02L02 | Variables, assignment, shortcut operators and the input() function | 120 | 6 |
| M02L03 | Arithmetic, string, assignment and operator priority/binding | 120 | 6 |

### M03 Control Flow, Lists, Functions, Tuples, Dictionaries and Exceptions (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Write the slice expression that reverses a list and one that drops the first and last items; (2) Explain why a variable changed inside a function is or is not visible outside it
- Common misconception addressed: Thinking a list passed to a function is copied rather than passed by reference
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditionals, the while and for loops, break/continue and bitwise/logical operators | 120 | 6 |
| M03L02 | Lists, indexing, slicing, list methods, nested lists and list comprehensions | 120 | 6 |
| M03L03 | Functions, parameters, return, scope, tuples, dictionaries and runtime exceptions | 120 | 6 |

## Integrative case

Walk through a short beginner script that reads two numbers, validates them, loops to build a list of results and prints a formatted summary; explain each language construct it uses and the errors it could raise.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified; the official question count and duration are unknown. Confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1509-practice-form-A | 45 | 45 | yes |
| MST-1509-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1509-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1509-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Computer Programming and Python Fundamentals | 15 |
| Data Types, Variables, I/O and Operators | 15 |
| Control Flow, Lists, Functions, Tuples, Dictionaries and Exceptions | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1509-Q0001** (single-answer, Select ONE) What value is printed by: print(2 ** 3 ** 2) ?

- A. 512 **(key)**  
  _Rationale:_ Correct: ** is right-associative, so 3 ** 2 = 9 is evaluated first, then 2 ** 9 = 512.
- B. 64  
  _Rationale:_ This is (2 ** 3) ** 2; exponentiation is right-associative, not left, so this is wrong.
- C. 36  
  _Rationale:_ This would be (2 * 3) ** 2; the operator is exponentiation, not multiplication.
- D. 18  
  _Rationale:_ This treats the expression as 2 * 3 * 3, which ignores how ** works.

**MST-1509-Q0002** (single-answer, Select ONE) A beginner writes x = input('n: ') then total = x + 1 and gets a TypeError. Why?

- A. input() returns a string, so x + 1 mixes str and int **(key)**  
  _Rationale:_ Correct: input() always returns a str; adding an int to a str raises TypeError. Wrap x in int() first.
- B. input() returns None  
  _Rationale:_ input() returns the typed text as a string, not None.
- C. The variable name x is reserved  
  _Rationale:_ x is a valid identifier; it is not a Python keyword.
- D. + cannot be used with integers  
  _Rationale:_ + works fine with integers; the error comes from the str operand.

**MST-1509-Q0003** (multiple-answer, Select TWO) Which TWO statements about Python lists are true?

- A. A list is mutable, so its contents can change in place **(key)**  
  _Rationale:_ Correct: lists support in-place changes such as append() and item assignment.
- B. Negative indexes count from the end of the list **(key)**  
  _Rationale:_ Correct: index -1 is the last element, -2 the second-to-last, and so on.
- C. Lists can only hold items of a single data type  
  _Rationale:_ A Python list may mix types, e.g. [1, 'a', True].
- D. Slicing a list modifies the original list in place  
  _Rationale:_ Slicing returns a new list; the original is unchanged.
- E. len() cannot be used on a list  
  _Rationale:_ len() returns the number of items in a list.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
