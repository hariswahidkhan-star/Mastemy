# Engineering Mathematics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1795` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-EM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Engineering Mathematics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Algebra and functions
2. Trigonometry and vectors
3. Differential calculus
4. Integral calculus
5. Differential equations and transforms

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot fully demonstrate multi-step derivations and proofs; practice problems and worked solutions are provided separately.

## Modules

### M01 Algebra and functions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Model a relationship with an appropriate function; (2) Solve an exponential equation with logarithms
- Common misconception addressed: Confusing a function's input and output when transforming graphs
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Functions, graphs and transformations | 96 | 8 |
| M01L02 | Exponentials and logarithms | 96 | 8 |

### M02 Trigonometry and vectors (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Resolve a force into components with trigonometry; (2) Compute a dot or cross product
- Common misconception addressed: Mixing up the dot product (scalar) and cross product (vector)
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Trigonometric functions and identities | 96 | 8 |
| M02L02 | Vectors and operations | 96 | 8 |

### M03 Differential calculus (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Differentiate a composite function with the chain rule; (2) Find a maximum using the derivative
- Common misconception addressed: Setting the second derivative to zero to find a maximum
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Derivatives and rules | 96 | 8 |
| M03L02 | Applications: rates and optima | 96 | 8 |

### M04 Integral calculus (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Integrate by substitution; (2) Compute the area under a curve
- Common misconception addressed: Forgetting the constant of integration in an indefinite integral
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Integration techniques | 96 | 8 |
| M04L02 | Applications: area, work and averages | 96 | 8 |

### M05 Differential equations and transforms (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Solve a first-order linear differential equation; (2) Use a Laplace transform to solve an initial-value problem
- Common misconception addressed: Treating a differential equation as if it were an ordinary algebraic one
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | First-order differential equations | 96 | 8 |
| M05L02 | Introduction to Laplace transforms | 96 | 8 |

## Integrative case

An engineer must model the cooling of a component over time. The learner must choose a function form, set up a first-order differential equation for the cooling, solve it (including by Laplace transform), and use calculus to find the time to reach a target temperature, then interpret the result physically.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1795-final-protected | 25 | 25 | yes |
| MST-1795-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Algebra and functions | 5 |
| Trigonometry and vectors | 5 |
| Differential calculus | 5 |
| Integral calculus | 5 |
| Differential equations and transforms | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1795-Q0001** (single-answer, Select ONE) At a local maximum of a smooth function, the first derivative is:

- A. Zero, with the function changing from increasing to decreasing **(key)**  
  _Rationale:_ Correct: a stationary point has zero first derivative; a maximum turns from rising to falling.
- B. Always positive  
  _Rationale:_ A positive derivative means the function is still increasing.
- C. Undefined for every maximum  
  _Rationale:_ Smooth maxima have a defined, zero derivative.
- D. Equal to the function's value  
  _Rationale:_ The derivative and the value are unrelated quantities.

**MST-1795-Q0002** (multiple-answer, Select TWO) Which TWO statements about the dot and cross products are correct? (Select TWO.)

- A. The dot product of two vectors is a scalar **(key)**  
  _Rationale:_ Correct: a dot b yields a single number.
- B. The cross product of two 3-D vectors is a vector perpendicular to both **(key)**  
  _Rationale:_ Correct: a cross b is orthogonal to a and b.
- C. The dot product always yields a vector  
  _Rationale:_ The dot product is a scalar, not a vector.
- D. The cross product is defined the same way in two and three dimensions  
  _Rationale:_ The cross product is specific to three dimensions.

**MST-1795-Q0003** (single-answer, Select ONE) An indefinite integral must include a constant of integration because:

- A. Differentiation loses any constant term, so antiderivatives differ by a constant **(key)**  
  _Rationale:_ Correct: many functions share the same derivative, differing only by a constant.
- B. The integral is always larger than the function  
  _Rationale:_ Integrals are not inherently larger.
- C. Constants make the answer look more complete  
  _Rationale:_ It is mathematically required, not cosmetic.
- D. Definite integrals also need the constant  
  _Rationale:_ Definite integrals evaluate limits and drop the constant.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
