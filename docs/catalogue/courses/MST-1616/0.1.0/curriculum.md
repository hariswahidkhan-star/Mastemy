# NumPy

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1616` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | MST-DAT-SK-N-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — NumPy (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Arrays and dtypes
2. Indexing and slicing
3. Operations
4. Aggregation and axes
5. Reshaping and combining
6. Numerical computing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Arrays and dtypes (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create arrays with zeros, arange and linspace; (2) Choose an appropriate dtype
- Common misconception addressed: Mixing Python lists and arrays expecting identical behavior
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The ndarray | 80 | 6 |
| M01L02 | Data types and memory | 80 | 6 |
| M01L03 | Creating arrays | 80 | 6 |

### M02 Indexing and slicing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Select a subarray with slicing; (2) Filter elements with a boolean mask
- Common misconception addressed: Modifying a slice and being surprised the original changed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Basic indexing and slicing | 80 | 6 |
| M02L02 | Boolean and fancy indexing | 80 | 6 |
| M02L03 | Views versus copies | 80 | 6 |

### M03 Operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add two arrays element-wise; (2) Broadcast a vector across a matrix
- Common misconception addressed: Writing Python loops where vectorized ops apply
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Element-wise operations | 80 | 6 |
| M03L02 | Broadcasting | 80 | 6 |
| M03L03 | Universal functions (ufuncs) | 80 | 6 |

### M04 Aggregation and axes (MASTEMY-DESIGN 17%)

- Worked applications: (1) Sum a 2D array along an axis; (2) Find indices with argmax and argsort
- Common misconception addressed: Forgetting that axis=0 reduces down columns
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reductions (sum, mean, max) | 80 | 6 |
| M04L02 | The axis argument | 80 | 6 |
| M04L03 | Sorting and searching | 80 | 6 |

### M05 Reshaping and combining (MASTEMY-DESIGN 16%)

- Worked applications: (1) Reshape a 1D array into a matrix; (2) Stack arrays vertically and horizontally
- Common misconception addressed: Reshaping with a wrong total size and raising an error
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Reshape and transpose | 80 | 6 |
| M05L02 | Stacking and splitting | 80 | 6 |
| M05L03 | Concatenation | 80 | 6 |

### M06 Numerical computing (MASTEMY-DESIGN 16%)

- Worked applications: (1) Multiply matrices with the dot product; (2) Generate reproducible random data with a seed
- Common misconception addressed: Looping over elements instead of vectorizing for speed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Linear algebra basics | 80 | 6 |
| M06L02 | Random number generation | 80 | 6 |
| M06L03 | Performance and vectorization | 80 | 6 |

## Integrative case

Use NumPy to analyze a numeric dataset: build and index arrays, apply vectorized and broadcasting operations, aggregate along axes, and reshape and combine arrays for a computation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1616-final-protected | 30 | 30 | yes |
| MST-1616-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Arrays and dtypes | 5 |
| Indexing and slicing | 5 |
| Operations | 5 |
| Aggregation and axes | 5 |
| Reshaping and combining | 5 |
| Numerical computing | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1616-Q0001** (single-answer, Select ONE) You take a slice of a NumPy array and modify it; the original array also changes. Why?

- A. Basic slicing returns a view that shares memory with the original **(key)**  
  _Rationale:_ Correct: basic slicing yields a view onto the same underlying data, so edits propagate.
- B. NumPy copies arrays on every slice  
  _Rationale:_ Basic slicing returns a view, not a copy.
- C. The array was corrupted  
  _Rationale:_ This is expected view behavior, not corruption.
- D. Slicing is not allowed on arrays  
  _Rationale:_ Slicing is fully supported on arrays.

**MST-1616-Q0002** (single-answer, Select ONE) Adding a shape (3,) vector to a shape (4,3) matrix works because of which NumPy feature?

- A. Broadcasting **(key)**  
  _Rationale:_ Correct: broadcasting stretches the vector across the matrix's rows.
- B. Transposition  
  _Rationale:_ Transposition changes axes order; it is not why the add works.
- C. Sorting  
  _Rationale:_ Sorting is unrelated to element-wise addition.
- D. Concatenation  
  _Rationale:_ Concatenation joins arrays; it does not add them.

**MST-1616-Q0003** (multiple-answer, Select TWO) Which TWO statements about NumPy aggregation are correct? (Select TWO)

- A. axis=0 reduces along rows, collapsing each column **(key)**  
  _Rationale:_ Correct: axis=0 collapses the row dimension, giving a per-column result.
- B. Omitting axis aggregates over the entire array **(key)**  
  _Rationale:_ Correct: with no axis, the reduction spans all elements to one value.
- C. axis=0 always returns a scalar  
  _Rationale:_ axis=0 returns an array per column, not a single scalar in general.
- D. Reductions cannot be applied to 2D arrays  
  _Rationale:_ Reductions apply to arrays of any dimensionality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
