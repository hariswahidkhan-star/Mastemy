# Finite Element Analysis (FEA) Intro

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2236` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Engineering standards, tool specifics and formulae must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Finite Element Analysis (FEA) Intro (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the idea of discretising a domain into elements and nodes
2. Describe element types, shape functions and degrees of freedom
3. Set up a static structural problem with loads and boundary conditions
4. Judge mesh quality and perform a convergence study
5. Interpret stress and displacement results critically
6. Recognise common FEA pitfalls and validate against hand calculations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 FEA fundamentals (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain why a finer mesh approximates the true geometry better; (2) Count the degrees of freedom of a simple 2D element
- Common misconception addressed: Believing more nodes always mean a correct answer regardless of setup
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Discretisation: nodes, elements and the mesh | 120 | 7 |
| M01L02 | Element types, shape functions and DOF | 120 | 7 |

### M02 Problem setup (25% (Mastemy design weight), design weight)

- Worked applications: (1) Apply a fixed support and a pressure load correctly; (2) Choose linear-elastic vs nonlinear material for a case
- Common misconception addressed: Over-constraining a model so it reports artificially low stress
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Loads, constraints and boundary conditions | 120 | 7 |
| M02L02 | Material models and assumptions | 120 | 7 |

### M03 Meshing and convergence (25% (Mastemy design weight), design weight)

- Worked applications: (1) Refine a mesh near a stress concentration; (2) Run a convergence study and read when results stabilise
- Common misconception addressed: Reading a singular peak stress at a sharp corner as real
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mesh quality and refinement | 120 | 7 |
| M03L02 | Convergence studies and error | 120 | 7 |

### M04 Results and validation (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compare FEA tip deflection to a beam hand calculation; (2) Spot a result that violates equilibrium or symmetry
- Common misconception addressed: Trusting a colourful plot without any sanity check
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Interpreting stress and displacement | 120 | 7 |
| M04L02 | Pitfalls and validation against hand calcs | 120 | 7 |

## Integrative case

An engineer checks a cantilever mounting plate with a hole: build a mesh, apply the load and supports, refine near the hole, run a convergence study, and validate the result against a beam-theory estimate.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2236-final-protected | 40 | 40 | yes |
| MST-2236-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| FEA fundamentals | 10 |
| Problem setup | 10 |
| Meshing and convergence | 10 |
| Results and validation | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2236-Q0001** (single-answer, Select ONE) What is the core idea behind the finite element method?

- A. Dividing a complex domain into simple elements whose behaviour is summed **(key)**  
  _Rationale:_ Correct: FEA approximates a continuous problem with many simple, connected elements.
- B. Solving the exact closed-form solution directly  
  _Rationale:_ FEA is an approximation; it does not give the exact continuous solution.
- C. Measuring the real part in a lab  
  _Rationale:_ FEA is a simulation method, not a physical test.
- D. Replacing material properties with colours  
  _Rationale:_ Colours only visualise results; they are not the method.

**MST-2236-Q0002** (multiple-answer, Select TWO) Which TWO practices improve confidence in an FEA result? (Select TWO.)

- A. Performing a mesh-convergence study **(key)**  
  _Rationale:_ Correct: convergence shows the result is mesh-independent.
- B. Validating against a hand calculation or test **(key)**  
  _Rationale:_ Correct: independent checks catch setup errors.
- C. Choosing the prettiest contour colours  
  _Rationale:_ Colour choices do not affect correctness.
- D. Using the coarsest possible mesh to save time  
  _Rationale:_ An under-refined mesh can hide real stresses.

**MST-2236-Q0003** (single-answer, Select ONE) Your model shows an extremely high stress at a perfectly sharp re-entrant corner that keeps rising as you refine the mesh. What is the right interpretation?

- A. It is likely a stress singularity, not a real finite stress **(key)**  
  _Rationale:_ Correct: a sharp corner is a modelling artefact that produces an unbounded, unphysical stress.
- B. The part will definitely fail there  
  _Rationale:_ A singular value is a mesh artefact, not a reliable prediction.
- C. The mesh is converged and correct  
  _Rationale:_ A value that keeps rising with refinement is the opposite of converged.
- D. You should report the peak value as-is  
  _Rationale:_ A singular peak must be handled with a fillet or a different measure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
