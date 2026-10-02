# Mathematics for Machine Learning: Linear Algebra and Calculus

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0433` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-MALAE-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Work with vectors, matrices and their core operations
2. Interpret matrix transformations, norms and projections
3. Compute and interpret eigenvalues and eigenvectors
4. Apply derivatives and partial derivatives to functions
5. Use gradients and the chain rule for optimisation
6. Connect linear algebra and calculus to ML models

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Vectors and matrices (MASTEMY-DESIGN 17%)

- Worked applications: (1) Represent a dataset as a matrix and compute a dot product; (2) Multiply two matrices by hand and check dimensions
- Common misconception addressed: Confusing element-wise and matrix multiplication
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Vectors, spaces and operations | 140 | 8 |
| M01L02 | Matrices, products and special matrices | 140 | 8 |

### M02 Linear transformations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Interpret a 2x2 matrix as a geometric transformation; (2) Project a vector onto a subspace
- Common misconception addressed: Assuming every matrix has an inverse
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Transformations, rank and inverse | 140 | 8 |
| M02L02 | Norms, distances and projections | 140 | 8 |

### M03 Eigenvalues and decompositions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Find eigenvalues of a 2x2 matrix; (2) Explain what SVD does for dimensionality reduction
- Common misconception addressed: Treating eigenvectors as arbitrary rather than invariant directions
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Eigenvalues and eigenvectors | 140 | 8 |
| M03L02 | Diagonalisation and SVD intuition | 140 | 8 |

### M04 Single-variable calculus (MASTEMY-DESIGN 17%)

- Worked applications: (1) Differentiate a loss function of one parameter; (2) Find the minimum of a simple cost curve
- Common misconception addressed: Forgetting that a zero derivative can be a maximum or saddle
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Derivatives and rates of change | 140 | 8 |
| M04L02 | Optimising a one-variable function | 140 | 8 |

### M05 Multivariable calculus (MASTEMY-DESIGN 16%)

- Worked applications: (1) Compute the gradient of a two-variable function; (2) Apply the chain rule to a composed function
- Common misconception addressed: Dropping terms when differentiating composed functions
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Partial derivatives and gradients | 140 | 8 |
| M05L02 | The chain rule and Jacobians | 140 | 8 |

### M06 Maths behind training (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write one gradient-descent step in matrix notation; (2) Explain why the learning rate controls step size
- Common misconception addressed: Thinking gradient descent guarantees the global minimum
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Gradient descent in vector form | 140 | 8 |
| M06L02 | From maths to a model update | 140 | 8 |

## Integrative case

Given a small linear-regression problem, derive the gradient of the squared-error loss by hand, express the model in vector/matrix form, and explain each step of a gradient-descent update, connecting the calculus and linear algebra to what the optimiser actually does.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0433-final-protected | 30 | 30 | yes |
| MST-0433-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Vectors and matrices | 5 |
| Linear transformations | 5 |
| Eigenvalues and decompositions | 5 |
| Single-variable calculus | 5 |
| Multivariable calculus | 5 |
| Maths behind training | 5 |

Minimum reviewed item bank: 546 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0433-Q0001** (single-answer, Select ONE) For matrices A (2x3) and B (3x4), what is the shape of AB?

- A. 2x4 **(key)**  
  _Rationale:_ Correct: inner dimensions (3) cancel, leaving outer dimensions 2x4.
- B. 3x3  
  _Rationale:_ That ignores the rule that the product keeps the outer dimensions.
- C. 4x2  
  _Rationale:_ The order matters; AB is 2x4, not 4x2.
- D. Undefined  
  _Rationale:_ It is defined because A's columns (3) match B's rows (3).

**MST-0433-Q0002** (multiple-answer, Select TWO) Which TWO statements about eigenvectors of a matrix are correct? (Select TWO.)

- A. An eigenvector's direction is unchanged by the transformation **(key)**  
  _Rationale:_ Correct: the matrix only scales it by the eigenvalue.
- B. The eigenvalue gives the scaling factor along that direction **(key)**  
  _Rationale:_ Correct: Av = lambda v scales v by lambda.
- C. Every matrix has only one eigenvector  
  _Rationale:_ Matrices generally have several eigenvectors.
- D. Eigenvectors must always be unit length  
  _Rationale:_ They can be scaled to any non-zero length.

**MST-0433-Q0003** (single-answer, Select ONE) In gradient descent, why is the learning rate important?

- A. It scales each step along the negative gradient, controlling step size **(key)**  
  _Rationale:_ Correct: too large overshoots, too small is slow.
- B. It sets the number of parameters in the model  
  _Rationale:_ The learning rate does not change model size.
- C. It guarantees reaching the global minimum  
  _Rationale:_ It does not; descent can reach a local minimum or saddle.
- D. It computes the gradient itself  
  _Rationale:_ The gradient is computed separately; the rate only scales the step.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
