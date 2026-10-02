# ASQ Certified Software Quality Engineer: CSQE

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0319` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ASQ (no affiliation or endorsement) |
| Exam code | CSQE |
| Version basis | unresolved — not verified from official source |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; no official source read |
| Legacy IDs | (none) |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> Modules below are **Mastemy design groupings**, not a reproduction of the official blueprint. Official domain weightings, objective IDs, item counts and durations were not verified (issuer domain egress blocked on 2026-10-02).

## Learning outcomes

1. Explain software quality management, standards and the quality engineer's role
2. Apply software engineering process, lifecycle and configuration management practices
3. Apply software verification, validation, testing and metrics methods
4. Explain software project management, risk and continuous improvement

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Software quality management and standards (design grouping; weight not published/verified)

- Worked applications: (1) Map a quality management system to a chosen software lifecycle model; (2) Select quality standards and models appropriate to a project context
- Common misconception addressed: Believing software quality means only testing at the end rather than process quality throughout
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Software quality concepts and the SQE role | 100 | 6 |
| M01L02 | Quality management systems for software | 100 | 6 |
| M01L03 | Software quality standards and models | 100 | 6 |
| M01L04 | Audits, reviews and ethics | 100 | 6 |

### M02 Software engineering processes and configuration (design grouping; weight not published/verified)

- Worked applications: (1) Choose a lifecycle model for a given project and justify it; (2) Design a configuration management and change-control scheme
- Common misconception addressed: Treating configuration management as optional overhead rather than a quality control
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Software lifecycle models | 100 | 6 |
| M02L02 | Requirements and design quality | 100 | 6 |
| M02L03 | Configuration management and change control | 100 | 6 |
| M02L04 | Software process improvement models | 100 | 6 |

### M03 Verification, validation, testing and metrics (design grouping; weight not published/verified)

- Worked applications: (1) Design a verification and validation plan for a module; (2) Select software quality metrics and interpret a defect trend
- Common misconception addressed: Confusing verification (building it right) with validation (building the right thing)
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Verification and validation fundamentals | 100 | 6 |
| M03L02 | Software testing methods and levels | 100 | 6 |
| M03L03 | Defect management and root-cause analysis | 100 | 6 |
| M03L04 | Software metrics and measurement | 100 | 6 |

## Integrative case

A software team shipping defects late in the cycle asks a software quality engineer to assess its lifecycle process, define verification and validation activities, choose quality metrics and build a defect-prevention plan.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0319-practice-form-A | 45 | 45 | yes |
| MST-0319-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0319-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0319-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Software quality management and standards | 15 |
| Software engineering processes and configuration | 15 |
| Verification, validation, testing and metrics | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0319-Q0001** (single, Select ONE) A reviewer checks whether code meets its design specification. This activity is primarily:

- A. Verification **(key)**  
  _Rationale:_ Correct: verification checks that the product is built according to its specification.
- B. Validation  
  _Rationale:_ Validation checks the product meets the user's actual needs, not the spec.
- C. Deployment  
  _Rationale:_ Deployment is release, not a check against the specification.
- D. Requirements elicitation  
  _Rationale:_ Elicitation gathers needs; it is not a conformance check.

**MST-0319-Q0002** (single, Select ONE) Which practice most directly prevents an unauthorised change from reaching a released build?

- A. Configuration management with change control **(key)**  
  _Rationale:_ Correct: controlled change management governs what enters a baseline.
- B. Writing more unit tests  
  _Rationale:_ Tests find defects but do not control which changes are admitted.
- C. Increasing team size  
  _Rationale:_ Adding staff does not govern change admission.
- D. Longer release cycles  
  _Rationale:_ Cycle length does not by itself control unauthorised changes.

**MST-0319-Q0003** (multiple, Select TWO) Select TWO activities that are forms of static testing (no code execution).

- A. Code inspection **(key)**  
  _Rationale:_ Correct: inspection examines artifacts without executing code.
- B. Requirements walkthrough **(key)**  
  _Rationale:_ Correct: a walkthrough reviews an artifact without execution.
- C. Load testing  
  _Rationale:_ Load testing executes the system under demand.
- D. Unit test execution  
  _Rationale:_ Executing unit tests is dynamic testing.
- E. Smoke testing a build  
  _Rationale:_ Smoke testing runs the build, so it is dynamic.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
