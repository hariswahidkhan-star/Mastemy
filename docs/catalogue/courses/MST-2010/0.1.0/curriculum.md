# Computational Chemistry: Modelling, Simulation and Machine Learning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2010` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Computational Chemistry: Modelling, Simulation and Machine Learning (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain electronic-structure and force-field methods
2. Set up and interpret geometry optimisations
3. Run and analyse molecular-dynamics simulations
4. Choose an appropriate level of theory for a problem
5. Evaluate accuracy, cost and convergence trade-offs
6. Integrate machine-learning methods into computational workflows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Electronic structure (17% (design weight), design weight)

- Worked applications: (1) Choose a basis set for a given accuracy target; (2) Interpret an SCF convergence failure
- Common misconception addressed: Assuming a bigger basis set always fixes an error
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Hartree-Fock and basis sets | 81 | 5 |
| M01L02 | Density-functional theory essentials | 82 | 5 |

### M02 Molecular mechanics (17% (design weight), design weight)

- Worked applications: (1) Pick a force field for a biomolecular system; (2) Decide between classical and quantum treatment
- Common misconception addressed: Using a force field for a bond-breaking reaction
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Force fields and parameters | 81 | 5 |
| M02L02 | When classical models are appropriate | 82 | 5 |

### M03 Geometry and energy (17% (design weight), design weight)

- Worked applications: (1) Locate a minimum on a potential-energy surface; (2) Verify a transition state with a frequency check
- Common misconception addressed: Reporting a saddle point as an energy minimum
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Potential-energy surfaces | 81 | 5 |
| M03L02 | Geometry optimisation and transition states | 82 | 5 |

### M04 Molecular dynamics (17% (design weight), design weight)

- Worked applications: (1) Set equilibration and production stages for MD; (2) Compute a property average from a trajectory
- Common misconception addressed: Analysing an MD run before it has equilibrated
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Running an MD simulation | 81 | 5 |
| M04L02 | Analysing trajectories and ensembles | 82 | 5 |

### M05 Method selection (16% (design weight), design weight)

- Worked applications: (1) Select a method balancing accuracy and cost; (2) Check convergence with respect to settings
- Common misconception addressed: Trusting a single unconverged calculation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Choosing a level of theory | 77 | 5 |
| M05L02 | Accuracy, cost and convergence | 77 | 5 |

### M06 Machine learning in simulation (16% (design weight), design weight)

- Worked applications: (1) Validate an ML potential against reference data; (2) Report uncertainty for an ML-predicted energy
- Common misconception addressed: Deploying an ML potential outside its training domain
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | ML interatomic potentials | 77 | 5 |
| M06L02 | Validation and uncertainty of ML models | 77 | 5 |

## Integrative case

A computational-chemistry trainee studies a catalytic step: they must choose a level of theory, optimise geometries and confirm a transition state, run an MD analysis, then decide whether an ML interatomic potential is validated enough to scale the study and report its uncertainty.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2010-final-protected | 40 | 40 | yes |
| MST-2010-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Electronic structure | 7 |
| Molecular mechanics | 7 |
| Geometry and energy | 7 |
| Molecular dynamics | 7 |
| Method selection | 6 |
| Machine learning in simulation | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2010-Q0001** (single-answer, Select ONE) Why is verifying a transition state with a vibrational-frequency calculation important?

- A. A true transition state has exactly one imaginary frequency along the reaction coordinate **(key)**  
  _Rationale:_ Correct: one imaginary frequency confirms a first-order saddle point.
- B. It confirms the structure is an energy minimum  
  _Rationale:_ A minimum has no imaginary frequencies, unlike a transition state.
- C. Frequencies are irrelevant to transition states  
  _Rationale:_ The imaginary mode is the defining feature of a transition state.
- D. It proves the basis set is complete  
  _Rationale:_ Frequency analysis checks the stationary point, not basis completeness.

**MST-2010-Q0002** (multiple-answer, Select TWO) Which TWO trade-offs must be weighed when choosing a level of theory? (Select TWO.)

- A. Accuracy of the predicted properties **(key)**  
  _Rationale:_ Correct: higher-level methods are generally more accurate.
- B. Computational cost and system size feasibility **(key)**  
  _Rationale:_ Correct: cost scales steeply and limits tractable system size.
- C. The colour of the visualisation software  
  _Rationale:_ Rendering choices do not affect the method's validity.
- D. The alphabetical order of element symbols  
  _Rationale:_ That is irrelevant to the level of theory.

**MST-2010-Q0003** (single-answer, Select ONE) What is the key limitation of a machine-learning interatomic potential?

- A. It is reliable only for configurations represented in its training data **(key)**  
  _Rationale:_ Correct: ML potentials extrapolate poorly beyond training coverage.
- B. It can replace experiments entirely with no checks  
  _Rationale:_ Validation against reference data is still required.
- C. It works equally well for any chemistry without training  
  _Rationale:_ Performance depends on relevant training data.
- D. It has no computational cost advantage  
  _Rationale:_ A major motivation is lower cost than high-level methods.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
