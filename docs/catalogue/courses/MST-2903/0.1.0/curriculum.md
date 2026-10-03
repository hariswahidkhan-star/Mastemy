# Python Programming for Teens (Ages 14-17)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2903` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Python Programming for Teens (Ages 14-17) (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write well-structured Python using functions and clear names
2. Work with lists and dictionaries to store collections of data
3. Read from and write to files
4. Handle errors using try/except
5. Break a problem down into smaller functions (decomposition)
6. Debug programs methodically and test their behaviour

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Core Python and functions (25% (design weight), design weight)

- Worked applications: (1) Write a function that returns the average of a list; (2) Refactor repeated code into one function
- Common misconception addressed: Thinking a function always prints rather than returning a value
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Functions, parameters and return values | 120 | 7 |
| M01L02 | Readable code and naming conventions | 120 | 7 |

### M02 Data structures (25% (design weight), design weight)

- Worked applications: (1) Store students and scores in a dictionary; (2) Loop through a list to find the largest value
- Common misconception addressed: Thinking a list and a dictionary are interchangeable for lookups
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lists: indexing, looping and methods | 120 | 7 |
| M02L02 | Dictionaries: keys, values and lookups | 120 | 7 |

### M03 Files and errors (25% (design weight), design weight)

- Worked applications: (1) Write a program that saves notes to a file; (2) Catch a missing-file error gracefully
- Common misconception addressed: Thinking a program never needs to handle errors
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reading and writing text files | 120 | 7 |
| M03L02 | Error handling with try/except | 120 | 7 |

### M04 Problem solving (25% (design weight), design weight)

- Worked applications: (1) Break a quiz program into clear functions; (2) Trace a bug with print statements and fix it
- Common misconception addressed: Thinking more code always means a better solution
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Decomposing a problem into functions | 120 | 7 |
| M04L02 | Testing and systematic debugging | 120 | 7 |

## Integrative case

Learners build a command-line 'class gradebook': it stores names and scores in a dictionary, loads and saves them to a file, uses functions for averages and top scores, handles a missing-file error with try/except, and they decompose and debug the program methodically.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2903-final-protected | 40 | 40 | yes |
| MST-2903-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Core Python and functions | 10 |
| Data structures | 10 |
| Files and errors | 10 |
| Problem solving | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2903-Q0001** (single-answer, Select ONE) What is the main advantage of a function that uses 'return' rather than only printing?

- A. The returned value can be reused elsewhere in the program, not just displayed **(key)**  
  _Rationale:_ Correct: returning a value lets other code use the result.
- B. return makes the program run without a computer  
  _Rationale:_ Code still needs a computer; return just passes a value back.
- C. Printing and returning are exactly the same  
  _Rationale:_ Printing shows text; returning hands back a usable value.
- D. return deletes the function  
  _Rationale:_ return provides a result; it does not delete the function.

**MST-2903-Q0002** (multiple-answer, Select TWO) Which TWO situations are good reasons to use a dictionary instead of a list? (Select TWO.)

- A. Looking up a student's score by their name **(key)**  
  _Rationale:_ Correct: dictionaries map keys (names) to values (scores).
- B. Storing settings as labelled key/value pairs **(key)**  
  _Rationale:_ Correct: dictionaries are ideal for labelled values.
- C. Keeping a simple ordered sequence of numbers to total  
  _Rationale:_ A plain ordered sequence is better suited to a list.
- D. Repeating one action a fixed number of times  
  _Rationale:_ That is a loop concern, not a reason for a dictionary.

**MST-2903-Q0003** (single-answer, Select ONE) Your program crashes when a data file is missing. What is the best way to handle this?

- A. Wrap the file access in try/except and give a helpful message if the file is missing **(key)**  
  _Rationale:_ Correct: error handling lets the program respond gracefully.
- B. Assume the file is always there  
  _Rationale:_ Files can be missing; the program should handle it.
- C. Delete the part of the program that reads files  
  _Rationale:_ The program needs to read the file; handle the error instead.
- D. Let it crash every time  
  _Rationale:_ Graceful handling is better than crashing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
