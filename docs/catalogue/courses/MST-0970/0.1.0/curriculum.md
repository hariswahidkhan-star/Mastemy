# NumPy and Scientific Python Computing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0970` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — NumPy and Scientific Python Computing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the NumPy ndarray model, dtypes and view-versus-copy semantics
2. Use indexing, boolean masking and broadcasting correctly
3. Apply ufuncs, axis-wise aggregations and linear algebra routines
4. Write performant, numerically sound NumPy code and integrate it with the ecosystem

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 The ndarray and its model (25%, MASTEMY-DESIGN)

- Worked applications: (1) Replace a Python loop with a vectorised NumPy expression and compare; (2) Predict whether an operation returns a view or a copy
- Common misconception addressed: Assuming slicing always returns an independent copy of the data
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why NumPy: vectorisation over Python loops | 120 | 6 |
| M01L02 | Creating arrays and dtypes | 120 | 6 |
| M01L03 | Shape, axes and dimensionality | 120 | 6 |
| M01L04 | Memory layout, views and copies | 120 | 6 |

### M02 Indexing, slicing and broadcasting (25%, MASTEMY-DESIGN)

- Worked applications: (1) Use a boolean mask to select and update elements in place; (2) Apply broadcasting to combine arrays of different shapes correctly
- Common misconception addressed: Expecting arrays of incompatible shapes to broadcast when they cannot
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Basic and fancy indexing | 120 | 6 |
| M02L02 | Boolean masking | 120 | 6 |
| M02L03 | Broadcasting rules | 120 | 6 |
| M02L04 | Reshaping and axis manipulation | 120 | 6 |

### M03 Computation and linear algebra (25%, MASTEMY-DESIGN)

- Worked applications: (1) Aggregate a 2-D array along the correct axis for a stated question; (2) Solve a small linear system with numpy.linalg
- Common misconception addressed: Confusing axis=0 and axis=1 when aggregating a 2-D array
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Universal functions (ufuncs) | 120 | 6 |
| M03L02 | Aggregations along axes | 120 | 6 |
| M03L03 | Linear algebra routines | 120 | 6 |
| M03L04 | Random number generation | 120 | 6 |

### M04 Performance and the ecosystem (25%, MASTEMY-DESIGN)

- Worked applications: (1) Refactor a slow pipeline to eliminate hidden copies; (2) Choose a dtype that avoids overflow or precision loss
- Common misconception addressed: Using float32 or small integer dtypes where precision or range is insufficient
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Avoiding copies and loops | 120 | 6 |
| M04L02 | Vectorisation patterns and pitfalls | 120 | 6 |
| M04L03 | Interfacing with pandas and SciPy | 120 | 6 |
| M04L04 | Numerical stability and dtype choices | 120 | 6 |

## Integrative case

A simulation written with Python loops is too slow and occasionally produces wrong totals. Rewrite it with vectorised NumPy, fix an axis and dtype bug, and justify the memory-versus-speed and precision tradeoffs.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0970-final-protected | 144 | 144 | yes |
| MST-0970-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| The ndarray and its model | 36 |
| Indexing, slicing and broadcasting | 36 |
| Computation and linear algebra | 36 |
| Performance and the ecosystem | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0970-Q0001** (single-answer, Select ONE) A 2-D array has rows as samples and columns as features. To compute the mean of each feature, which axis should be aggregated?

- A. axis=0 (down the rows, one result per column) **(key)**  
  _Rationale:_ Correct: aggregating over axis=0 collapses the rows, giving one mean per feature column.
- B. axis=1 (across the columns, one result per row)  
  _Rationale:_ axis=1 collapses columns, giving a per-sample mean, not per-feature.
- C. Either axis gives the same result  
  _Rationale:_ The axes produce different results for a non-square, non-symmetric array.
- D. NumPy ignores the axis for mean  
  _Rationale:_ The axis argument directly controls which dimension is reduced.

**MST-0970-Q0002** (single-answer, Select ONE) A basic slice of a NumPy array is modified and the original array changes too. What explains this?

- A. Basic slicing returns a view that shares memory with the original **(key)**  
  _Rationale:_ Correct: a basic slice is a view over the same buffer, so edits propagate.
- B. NumPy always deep-copies on slicing  
  _Rationale:_ Basic slicing returns a view, not a copy.
- C. The array dtype was float64  
  _Rationale:_ dtype does not determine view-versus-copy behaviour.
- D. Broadcasting duplicated the array  
  _Rationale:_ Broadcasting is unrelated to why a slice shares memory.

**MST-0970-Q0003** (multiple-answer, Select TWO) Which TWO are reasons to vectorise code with NumPy instead of using Python loops? (Select TWO)

- A. Operations run in optimised compiled code over whole arrays **(key)**  
  _Rationale:_ Correct: ufuncs push the loop into fast compiled code, avoiding per-element Python overhead.
- B. It typically reduces interpreter overhead per element **(key)**  
  _Rationale:_ Correct: vectorised ops avoid the per-iteration Python bytecode cost.
- C. It guarantees results are always more numerically precise  
  _Rationale:_ Vectorisation changes speed, not inherent numerical precision.
- D. It removes the need to consider array shapes  
  _Rationale:_ Shape and broadcasting still matter when vectorising.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
