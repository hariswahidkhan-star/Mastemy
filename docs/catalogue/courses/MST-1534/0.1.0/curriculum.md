# MATLAB Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1534` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-MF-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — MATLAB Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. The MATLAB environment
2. Matrices and arrays
3. Operators and vectorisation
4. Control flow and functions
5. Data types and tables
6. Plotting and visualisation
7. Numerical methods and the libraries
8. Files, scripts and good practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; MATLAB scripts and numerical work are taught through instructor-built walkthroughs.

## Modules

### M01 The MATLAB environment (MASTEMY-DESIGN 12%)

- Worked applications: (1) Run commands and inspect variables in the workspace; (2) Convert a command sequence into a reusable script
- Common misconception addressed: Clearing the workspace and expecting variables to persist
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The desktop, command window, workspace and paths | 90 | 6 |
| M01L02 | Scripts, live scripts and the editor | 90 | 6 |

### M02 Matrices and arrays (MASTEMY-DESIGN 15%)

- Worked applications: (1) Build a matrix and extract a submatrix by index; (2) Use the colon operator to select a row and a column
- Common misconception addressed: Using 0-based indexing; MATLAB indices start at 1
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating vectors and matrices; the colon operator | 90 | 6 |
| M02L02 | Indexing, slicing and reshaping | 90 | 6 |

### M03 Operators and vectorisation (MASTEMY-DESIGN 14%)

- Worked applications: (1) Compute element-wise products of two vectors; (2) Replace a for loop with a vectorised expression
- Common misconception addressed: Confusing * (matrix product) with .* (element-wise)
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Element-wise (.*, ./) vs matrix operators | 90 | 6 |
| M03L02 | Vectorising loops for speed | 90 | 6 |

### M04 Control flow and functions (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a function returning multiple outputs; (2) Validate inputs with arguments blocks
- Common misconception addressed: Preallocating too late, causing arrays to grow inside loops
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | if/switch, for and while | 90 | 6 |
| M04L02 | Functions, local functions and arguments validation | 90 | 6 |

### M05 Data types and tables (MASTEMY-DESIGN 12%)

- Worked applications: (1) Store mixed records in a table and index by variable; (2) Group and summarise a table with grouping functions
- Common misconception addressed: Using a cell array where a string array or table fits better
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Doubles, logicals, chars, strings and cell arrays | 90 | 6 |
| M05L02 | Structures and the table data type | 90 | 6 |

### M06 Plotting and visualisation (MASTEMY-DESIGN 12%)

- Worked applications: (1) Plot two series with a legend and axis labels; (2) Arrange related plots with subplot
- Common misconception addressed: Overwriting a figure instead of using hold on for multiple series
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | 2-D plots, labels, legends and subplots | 90 | 6 |
| M06L02 | Customising figures and exporting | 90 | 6 |

### M07 Numerical methods and the libraries (MASTEMY-DESIGN 13%)

- Worked applications: (1) Solve Ax=b with the backslash operator; (2) Fit a polynomial to noisy data and evaluate it
- Common misconception addressed: Inverting a matrix to solve a system instead of using backslash
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Solving linear systems, interpolation and polynomials | 90 | 6 |
| M07L02 | Statistics, curve fitting and toolbox awareness | 90 | 6 |

### M08 Files, scripts and good practice (MASTEMY-DESIGN 10%)

- Worked applications: (1) Import a CSV into a table and save a .mat file; (2) Profile a script and fix the slow section
- Common misconception addressed: Leaving everything in one long script instead of functions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Reading/writing data files and .mat files | 90 | 6 |
| M08L02 | Debugging, error handling and performance profiling | 90 | 6 |

## Integrative case

Analyse a sensor dataset in MATLAB: import a CSV into a table, clean and vectorise the computation of summary statistics across matrices, fit a model to the data, visualise results with labelled subplots, package the computation into validated functions, and profile the script for performance.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1534-final-protected | 40 | 40 | yes |
| MST-1534-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The MATLAB environment | 5 |
| Matrices and arrays | 5 |
| Operators and vectorisation | 5 |
| Control flow and functions | 5 |
| Data types and tables | 5 |
| Plotting and visualisation | 5 |
| Numerical methods and the libraries | 5 |
| Files, scripts and good practice | 5 |

Minimum reviewed item bank: 524 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1534-Q0001** (single-answer, Select ONE) In MATLAB, what is the difference between A*B and A.*B for matrices of compatible size?

- A. A*B is matrix multiplication; A.*B multiplies corresponding elements **(key)**  
  _Rationale:_ Correct: * is the linear-algebra matrix product, while .* is element-wise.
- B. They are identical  
  _Rationale:_ They differ: one is a matrix product, the other element-wise.
- C. A.*B is matrix multiplication; A*B is element-wise  
  _Rationale:_ This reverses the two operators.
- D. A*B only works on scalars  
  _Rationale:_ A*B is defined for conformable matrices, not only scalars.

**MST-1534-Q0002** (multiple-answer, Select TWO) Which statements about MATLAB arrays are correct? (Select TWO)

- A. Array indexing starts at 1, not 0 **(key)**  
  _Rationale:_ Correct: the first element of an array is A(1).
- B. The colon operator can select an entire row or column **(key)**  
  _Rationale:_ Correct: A(2,:) selects the whole second row.
- C. Negative indices count from the end as in some languages  
  _Rationale:_ MATLAB uses the end keyword, not negative indices.
- D. Scalars cannot be stored in arrays  
  _Rationale:_ A scalar is simply a 1x1 array in MATLAB.

**MST-1534-Q0003** (single-answer, Select ONE) Why is vectorising a computation usually preferred over an equivalent element-by-element for loop in MATLAB?

- A. Vectorised operations run in optimised library code over whole arrays, so they are typically much faster **(key)**  
  _Rationale:_ Correct: MATLAB's array operations are implemented in fast compiled routines, avoiding interpreter overhead per element.
- B. Loops are not allowed in MATLAB  
  _Rationale:_ Loops are allowed; vectorisation is a performance preference.
- C. Vectorisation changes the numerical result  
  _Rationale:_ It produces the same result, just faster.
- D. Vectorised code always uses less memory  
  _Rationale:_ Vectorisation can use more memory; the main benefit is speed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
