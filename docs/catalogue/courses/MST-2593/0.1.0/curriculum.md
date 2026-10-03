# R Programming: Advanced

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2593` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint; compiler, runtime, standard-library and tooling versions to be pinned at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — R Programming: Advanced (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Fit and interpret statistical models in R
2. Write efficient, vectorised and profiled R code
3. Build reproducible analyses and R Markdown reports
4. Create functions and lightweight packages with good practice
5. Apply non-standard evaluation and tidy evaluation concepts
6. Handle large data and parallelism in R

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Statistical modelling (20% (design weight), design weight)

- Worked applications: (1) Fit and interpret an lm summary; (2) Check residual diagnostics
- Common misconception addressed: Reading a coefficient as causal from observational data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Linear models with lm | 64 | 4 |
| M01L02 | Model summaries and diagnostics | 64 | 4 |
| M01L03 | Generalised linear models | 64 | 4 |

### M02 Performance (20% (design weight), design weight)

- Worked applications: (1) Rewrite a loop as a vectorised call; (2) Profile a slow function
- Common misconception addressed: Growing a vector in a loop and triggering copies
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Vectorisation over loops | 64 | 4 |
| M02L02 | Profiling with profvis/Rprof | 64 | 4 |
| M02L03 | Memory and copy-on-modify | 64 | 4 |

### M03 Reproducibility (20% (design weight), design weight)

- Worked applications: (1) Parameterise an R Markdown report; (2) Pin dependencies with renv
- Common misconception addressed: Reporting random results without setting a seed
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | R Markdown and knitr | 64 | 4 |
| M03L02 | Project structure and renv | 64 | 4 |
| M03L03 | Seeds and deterministic output | 64 | 4 |

### M04 Functions and packages (20% (design weight), design weight)

- Worked applications: (1) Document a function with roxygen; (2) Add a testthat unit test
- Common misconception addressed: Shipping a package without tests or docs
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Robust function design | 64 | 4 |
| M04L02 | Package skeleton and documentation | 64 | 4 |
| M04L03 | Testing with testthat | 64 | 4 |

### M05 Advanced evaluation and scale (20% (design weight), design weight)

- Worked applications: (1) Write a dplyr helper using {{ }}; (2) Parallelise with future/apply
- Common misconception addressed: Mixing up quosures and plain symbols in NSE
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Environments and NSE | 64 | 4 |
| M05L02 | Tidy evaluation with {{ }} | 64 | 4 |
| M05L03 | Parallel and chunked processing | 64 | 4 |

## Integrative case

A data scientist builds a reproducible R analysis: fit and diagnose a regression, vectorise and profile a hot function, wrap reusable logic in a tested package, and publish a parameterised R Markdown report with pinned dependencies.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2593-final-protected | 40 | 40 | yes |
| MST-2593-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Statistical modelling | 8 |
| Performance | 8 |
| Reproducibility | 8 |
| Functions and packages | 8 |
| Advanced evaluation and scale | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2593-Q0001** (single-answer, Select ONE) When interpreting an lm() summary from observational data, why is caution needed with coefficients?

- A. An association in observational data does not establish causation **(key)**  
  _Rationale:_ Confounding and design limits mean coefficients are not inherently causal.
- B. Coefficients from lm are always exactly zero  
  _Rationale:_ They are estimated values, not always zero.
- C. lm cannot be used on observational data  
  _Rationale:_ It can; the caution is about interpretation.
- D. A high R-squared proves causation  
  _Rationale:_ Fit quality does not establish causation.

**MST-2593-Q0002** (multiple-answer, Select TWO) Select TWO practices that improve reproducibility of an R analysis.

- A. Setting a random seed before stochastic steps **(key)**  
  _Rationale:_ A fixed seed makes random results repeatable.
- B. Pinning package versions with a tool like renv **(key)**  
  _Rationale:_ Recording exact dependency versions stabilises results across machines.
- C. Relying on the interactive global environment state  
  _Rationale:_ Hidden global state undermines reproducibility.
- D. Hardcoding absolute paths to your home directory  
  _Rationale:_ Machine-specific paths break portability.

**MST-2593-Q0003** (single-answer, Select ONE) Why can growing a vector inside a loop (e.g. x <- c(x, i)) be slow in R?

- A. Each append can copy the whole vector due to copy-on-modify, giving quadratic cost **(key)**  
  _Rationale:_ Repeated reallocation and copying makes incremental growth expensive; preallocation avoids it.
- B. Loops are disallowed in R  
  _Rationale:_ Loops are allowed; the issue is repeated copying.
- C. c() always returns a list  
  _Rationale:_ c() returns a vector here; the cost is copying.
- D. The vector becomes a factor  
  _Rationale:_ Growth does not change the type to a factor.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
