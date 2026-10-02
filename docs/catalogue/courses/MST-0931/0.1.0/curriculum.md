# MATLAB: Engineering Computation and Numerical Methods

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0931` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — MATLAB: Engineering Computation and Numerical Methods (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. MATLAB environment and matrix basics
2. Vectorisation and array operations
3. Scripts, functions and program structure
4. Plotting and data visualisation
5. Numerical methods: roots, integration and ODEs
6. Linear algebra and least-squares fitting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 MATLAB environment and matrix basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build a matrix and extract a submatrix with indexing; (2) Use the colon operator to generate a vector
- Common misconception addressed: Confusing element-wise .* with matrix multiplication *
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The workspace, command window and variables | 80 | 6 |
| M01L02 | Creating and indexing matrices | 80 | 6 |

### M02 Vectorisation and array operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Replace a for loop with a vectorised expression; (2) Select array elements with a logical mask
- Common misconception addressed: Writing explicit loops where vectorisation is faster and clearer
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Element-wise operators and broadcasting | 80 | 6 |
| M02L02 | Logical indexing and replacing loops | 80 | 6 |

### M03 Scripts, functions and program structure (MASTEMY-DESIGN 16%)

- Worked applications: (1) Convert a script into a reusable function; (2) Pass a function handle into another function
- Common misconception addressed: Assuming script variables are isolated like function variables
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scripts versus functions and local functions | 80 | 6 |
| M03L02 | Input validation and function handles | 80 | 6 |

### M04 Plotting and data visualisation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Plot two series with a legend and axis labels; (2) Arrange results in a 2x2 subplot grid
- Common misconception addressed: Forgetting hold on so later plots overwrite earlier ones
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | 2-D plots, labels and legends | 80 | 6 |
| M04L02 | Subplots and basic 3-D surfaces | 80 | 6 |

### M05 Numerical methods: roots, integration and ODEs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Find a root of a nonlinear equation with fzero; (2) Integrate a system of ODEs with ode45
- Common misconception addressed: Expecting ode45 to accept a fixed step like Euler's method
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Root finding with fzero and interpolation | 80 | 6 |
| M05L02 | Quadrature and solving ODEs with ode45 | 80 | 6 |

### M06 Linear algebra and least-squares fitting (MASTEMY-DESIGN 18%)

- Worked applications: (1) Solve Ax=b with the backslash operator; (2) Fit a polynomial with polyfit and evaluate with polyval
- Common misconception addressed: Using inv(A)*b instead of the more stable A\b
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Solving linear systems with the backslash operator | 80 | 6 |
| M06L02 | Polynomial and least-squares fitting | 80 | 6 |

## Integrative case

Analyse sensor data from a mechanical test rig: load the data, vectorise the cleaning step, fit a model with least squares, solve a small ODE describing the system response, and present the results in a labelled multi-panel figure.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0931-final-protected | 30 | 30 | yes |
| MST-0931-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| MATLAB environment and matrix basics | 5 |
| Vectorisation and array operations | 5 |
| Scripts, functions and program structure | 5 |
| Plotting and data visualisation | 5 |
| Numerical methods: roots, integration and ODEs | 5 |
| Linear algebra and least-squares fitting | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0931-Q0001** (single-answer, Select ONE) In MATLAB, what does the operator `.*` do between two equally sized matrices?

- A. Element-wise multiplication of corresponding entries **(key)**  
  _Rationale:_ Correct: .* multiplies entries element by element.
- B. Matrix (linear-algebra) multiplication  
  _Rationale:_ That is the * operator, not .*.
- C. Solves a linear system  
  _Rationale:_ Solving a system uses the backslash operator \.
- D. Concatenates the matrices  
  _Rationale:_ Concatenation uses square brackets, not .*.

**MST-0931-Q0002** (multiple-answer, Select ALL that apply) Which statements about vectorisation in MATLAB are correct? (Select TWO)

- A. Logical indexing can select elements that satisfy a condition without a loop **(key)**  
  _Rationale:_ Correct: a logical mask indexes the array directly.
- B. Vectorised array operations are typically faster than equivalent explicit loops **(key)**  
  _Rationale:_ Correct: built-in array operations run in optimised native code.
- C. Vectorisation requires the Parallel Computing Toolbox  
  _Rationale:_ Vectorisation is core MATLAB and needs no extra toolbox.
- D. Element-wise operators require matrices of incompatible sizes  
  _Rationale:_ They require compatible sizes (or broadcastable ones).

**MST-0931-Q0003** (single-answer, Select ONE) Why is `A\b` generally preferred over `inv(A)*b` to solve `Ax=b`?

- A. It is more numerically stable and usually faster **(key)**  
  _Rationale:_ Correct: the backslash solver avoids forming the inverse, improving stability and speed.
- B. It computes a different solution than the linear system  
  _Rationale:_ It solves the same system, just more reliably.
- C. inv(A) does not exist in MATLAB  
  _Rationale:_ inv exists; it is simply the less stable choice here.
- D. Backslash only works for diagonal matrices  
  _Rationale:_ Backslash handles general systems, not only diagonal ones.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
