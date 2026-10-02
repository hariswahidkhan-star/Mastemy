# COBOL: Mainframe Business Application Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0933` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — COBOL: Mainframe Business Application Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. COBOL program structure
2. Data definition and the PICTURE clause
3. Procedure logic
4. File handling
5. Tables and string handling
6. Batch processing and integration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 COBOL program structure (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a program that reads inputs and displays a total; (2) Identify where data and procedure logic live in the divisions
- Common misconception addressed: Mixing data definitions into the PROCEDURE DIVISION
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The four divisions and program layout | 80 | 5 |
| M01L02 | Compiling and running a COBOL program | 80 | 5 |

### M02 Data definition and the PICTURE clause (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define a customer record with group and elementary items; (2) Format a currency amount with an edited PIC clause
- Common misconception addressed: Confusing a numeric field with its display-edited picture
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Level numbers, group and elementary items | 80 | 5 |
| M02L02 | PICTURE clauses, editing and USAGE | 80 | 5 |

### M03 Procedure logic (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute a discounted price with COMPUTE and rounding; (2) Loop over records with PERFORM UNTIL
- Common misconception addressed: Relying on GO TO and creating unstructured spaghetti flow
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | MOVE, COMPUTE and conditional statements | 80 | 5 |
| M03L02 | PERFORM, paragraphs and structured flow | 80 | 5 |

### M04 File handling (MASTEMY-DESIGN 17%)

- Worked applications: (1) Read a sequential file to end-of-file and sum a field; (2) Look up a record in an indexed file by key
- Common misconception addressed: Ignoring the FILE STATUS and assuming every I/O operation succeeded
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sequential files: OPEN, READ, WRITE, CLOSE | 80 | 5 |
| M04L02 | Indexed files and file status checking | 80 | 5 |

### M05 Tables and string handling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Accumulate monthly totals in an OCCURS table; (2) Split a full name with UNSTRING
- Common misconception addressed: Indexing an OCCURS table out of bounds without checking limits
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | OCCURS tables and subscripting | 80 | 5 |
| M05L02 | SEARCH, STRING and UNSTRING | 80 | 5 |

### M06 Batch processing and integration (MASTEMY-DESIGN 16%)

- Worked applications: (1) Produce a control-break subtotal report; (2) Factor shared logic into a called subprogram
- Common misconception addressed: Assuming a called subprogram's WORKING-STORAGE resets on every CALL
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Control-break reporting and batch design | 80 | 5 |
| M06L02 | Subprograms, CALL and working with the mainframe ecosystem | 80 | 5 |

## Integrative case

Build a batch billing program: read a sequential transaction file, validate and compute charges with edited numeric fields, accumulate totals in an OCCURS table, produce a control-break report by customer, and call a shared subprogram for tax calculation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0933-final-protected | 42 | 42 | yes |
| MST-0933-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| COBOL program structure | 7 |
| Data definition and the PICTURE clause | 7 |
| Procedure logic | 7 |
| File handling | 7 |
| Tables and string handling | 7 |
| Batch processing and integration | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0933-Q0001** (single-answer, Select ONE) In which COBOL division are record layouts and variables described?

- A. DATA DIVISION **(key)**  
  _Rationale:_ Correct: the DATA DIVISION defines files and working storage, including record layouts.
- B. PROCEDURE DIVISION  
  _Rationale:_ The PROCEDURE DIVISION holds executable logic, not data definitions.
- C. IDENTIFICATION DIVISION  
  _Rationale:_ That division names the program and its author.
- D. ENVIRONMENT DIVISION  
  _Rationale:_ That division maps files to the system, not record layouts.

**MST-0933-Q0002** (multiple-answer, Select ALL that apply) Which statements about the COBOL PICTURE clause are correct? (Select TWO)

- A. PIC 9(5) describes a five-digit numeric field **(key)**  
  _Rationale:_ Correct: 9 denotes a digit position and (5) repeats it five times.
- B. Edited pictures like PIC $$,$$9.99 are for display formatting **(key)**  
  _Rationale:_ Correct: edited clauses insert symbols for presentation, not computation.
- C. PIC X fields are used for arithmetic  
  _Rationale:_ X denotes alphanumeric data, which is not used directly in arithmetic.
- D. A PICTURE clause sets the paragraph execution order  
  _Rationale:_ PICTURE describes data; it has nothing to do with control flow.

**MST-0933-Q0003** (single-answer, Select ONE) Why should a COBOL program check FILE STATUS after file operations?

- A. To detect and handle I/O conditions such as end-of-file or a failed open **(key)**  
  _Rationale:_ Correct: the status code reports success or specific error conditions so the program can react.
- B. To speed up sequential reads  
  _Rationale:_ It reports outcomes; it does not change performance.
- C. To automatically sort the file  
  _Rationale:_ Sorting is a separate operation, unrelated to file status.
- D. To allocate working storage  
  _Rationale:_ Working storage is defined in the DATA DIVISION, not via file status.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
