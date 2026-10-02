# Python Programming for Machine-Learning Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0435` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Write clean, idiomatic Python for data tasks
2. Use NumPy for vectorised numerical computation
3. Manipulate tabular data with pandas
4. Visualise data with common plotting libraries
5. Structure reproducible, testable ML code
6. Use environments, packaging and notebooks effectively

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Python essentials for data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Refactor a loop into a comprehension; (2) Add error handling to a data-loading function
- Common misconception addressed: Writing slow loops where vectorisation fits
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Core types, control flow and functions | 168 | 8 |
| M01L02 | Comprehensions, iterables and errors | 168 | 8 |

### M02 NumPy and vectorisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Vectorise a computation that used a Python loop; (2) Use broadcasting to combine arrays of different shapes
- Common misconception addressed: Misunderstanding broadcasting rules
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Arrays, shapes and broadcasting | 168 | 8 |
| M02L02 | Vectorised operations and performance | 168 | 8 |

### M03 pandas for tabular data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Clean a column with missing and malformed values; (2) Group and aggregate a sales table
- Common misconception addressed: Chained indexing that silently fails to assign
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Series, DataFrames and indexing | 168 | 8 |
| M03L02 | Cleaning, grouping and joining | 168 | 8 |

### M04 Visualising data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a labelled plot from a DataFrame; (2) Pick a chart type for three data questions
- Common misconception addressed: Using a chart that misrepresents the data
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Plotting fundamentals | 168 | 8 |
| M04L02 | Choosing the right chart | 168 | 8 |

### M05 Reproducible ML code (MASTEMY-DESIGN 20%)

- Worked applications: (1) Turn a notebook cell into a tested function; (2) Pin an environment for reproducibility
- Common misconception addressed: Leaving hidden state in notebook execution order
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Functions, modules and tests | 168 | 8 |
| M05L02 | Environments, packaging and notebooks | 168 | 8 |

## Integrative case

Build a reproducible analysis pipeline in Python: load a messy CSV, clean and transform it with pandas, vectorise computations with NumPy, visualise the result, and package the steps as reusable, tested functions others can run from scratch.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0435-final-protected | 25 | 25 | yes |
| MST-0435-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Python essentials for data | 5 |
| NumPy and vectorisation | 5 |
| pandas for tabular data | 5 |
| Visualising data | 5 |
| Reproducible ML code | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0435-Q0001** (single-answer, Select ONE) Why prefer a vectorised NumPy operation over a Python for-loop for element-wise maths?

- A. It runs the computation in optimised compiled code over the whole array **(key)**  
  _Rationale:_ Correct: vectorised ops avoid per-element Python overhead.
- B. It always uses less memory than a loop  
  _Rationale:_ Vectorised ops can use more memory, not less.
- C. It changes the mathematical result  
  _Rationale:_ The result is the same; only performance differs.
- D. It is required for arrays larger than 100 elements  
  _Rationale:_ There is no such requirement; it is a performance choice.

**MST-0435-Q0002** (multiple-answer, Select TWO) Which TWO are good practices for reproducible ML code? (Select TWO.)

- A. Pin package versions in an environment file **(key)**  
  _Rationale:_ Correct: pinned versions let others recreate the setup.
- B. Wrap steps in tested functions rather than loose notebook cells **(key)**  
  _Rationale:_ Correct: tested functions reduce hidden-state errors.
- C. Rely on cells being run in a particular manual order  
  _Rationale:_ Hidden execution order causes non-reproducible results.
- D. Hard-code absolute paths from your own machine  
  _Rationale:_ Absolute paths break on other machines.

**MST-0435-Q0003** (single-answer, Select ONE) In pandas, which risk comes from chained indexing like df[df.a>0]['b'] = 1?

- A. It may assign to a temporary copy and silently not change df **(key)**  
  _Rationale:_ Correct: chained indexing can produce a SettingWithCopy problem.
- B. It always raises an error and stops  
  _Rationale:_ It often warns rather than stopping, which is the danger.
- C. It deletes column b  
  _Rationale:_ It does not delete the column.
- D. It converts df to a NumPy array  
  _Rationale:_ It does not change the DataFrame type.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
