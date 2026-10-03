# Computational Physics and Numerical Methods

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2036` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Computational Physics and Numerical Methods (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Represent physical problems in a form suitable for numerical solution
2. Apply numerical integration and differentiation with error awareness
3. Solve ordinary differential equations numerically and assess stability
4. Use Monte Carlo methods for sampling and estimation
5. Validate and visualise simulation results against known limits
6. Reason about floating-point error, convergence and reproducibility

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 From physics to computation (25% (design weight), design weight)

- Worked applications: (1) Rewrite an equation of motion in dimensionless form; (2) Identify where catastrophic cancellation can occur in a formula
- Common misconception addressed: Assuming computed results are exact because the computer is precise
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Discretisation and dimensionless variables | 120 | 7 |
| M01L02 | Floating-point arithmetic and sources of error | 120 | 7 |

### M02 Integration and root finding (25% (design weight), design weight)

- Worked applications: (1) Estimate an integral with the trapezoidal and Simpson's rules; (2) Find a root with the bisection and Newton methods
- Common misconception addressed: Believing a finer grid always reduces total error
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Numerical integration and differentiation | 120 | 7 |
| M02L02 | Root finding and linear systems | 120 | 7 |

### M03 Differential equations (25% (design weight), design weight)

- Worked applications: (1) Integrate projectile motion with the Euler method; (2) Diagnose instability from an oversized time step
- Common misconception addressed: Thinking a method that runs without error is therefore accurate
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Euler and Runge-Kutta methods | 120 | 7 |
| M03L02 | Stability, step size and energy drift | 120 | 7 |

### M04 Stochastic and validation methods (25% (design weight), design weight)

- Worked applications: (1) Estimate pi with a Monte Carlo dart simulation; (2) Check a simulation against an analytic limiting case
- Common misconception addressed: Treating a plausible-looking plot as validation of correctness
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Monte Carlo sampling and estimation | 120 | 7 |
| M04L02 | Validation, visualisation and reproducibility | 120 | 7 |

## Integrative case

A graduate student builds a simulation of a damped driven oscillator: choose a time-step and integrator, check energy behaviour for stability, validate against the known analytic solution in a limit, and report the numerical error honestly.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2036-final-protected | 40 | 40 | yes |
| MST-2036-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| From physics to computation | 10 |
| Integration and root finding | 10 |
| Differential equations | 10 |
| Stochastic and validation methods | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2036-Q0001** (single-answer, Select ONE) Reducing the step size in an Euler integration of an ODE generally reduces truncation error but

- A. increases accumulated round-off error and run time, so there is an optimal step size **(key)**  
  _Rationale:_ Correct: smaller steps reduce truncation error but accumulate more round-off and cost; an optimum exists.
- B. always makes the result exact  
  _Rationale:_ Floating-point and accumulated error prevent exactness.
- C. has no effect on accuracy  
  _Rationale:_ Step size directly affects truncation error.
- D. eliminates all numerical instability  
  _Rationale:_ Stability depends on the method and problem, not step size alone.

**MST-2036-Q0002** (multiple-answer, Select TWO) Which TWO practices help ensure a physics simulation's results are trustworthy? (Select TWO.)

- A. Comparing output against an analytic solution in a limiting case **(key)**  
  _Rationale:_ Correct: validation against a known limit builds trust.
- B. Checking that a conserved quantity such as energy stays bounded **(key)**  
  _Rationale:_ Correct: monitoring conserved quantities reveals integration errors.
- C. Choosing the step size that produces the prettiest plot  
  _Rationale:_ Visual appeal is not a correctness criterion.
- D. Running only once with default settings  
  _Rationale:_ Convergence and sensitivity checks require varying parameters.

**MST-2036-Q0003** (single-answer, Select ONE) A fourth-order Runge-Kutta method is often preferred over the Euler method for the same step size because it

- A. achieves much smaller truncation error per step for a modest extra cost **(key)**  
  _Rationale:_ Correct: RK4 has higher-order accuracy, greatly reducing error for a small cost increase.
- B. never becomes unstable  
  _Rationale:_ RK4 can still be unstable for stiff problems or large steps.
- C. uses no function evaluations  
  _Rationale:_ RK4 uses several evaluations per step.
- D. eliminates round-off error  
  _Rationale:_ Round-off error is independent of the integration order.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
