# Physical Chemistry: Thermodynamics, Kinetics and AI-Driven Modelling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2007` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Physical Chemistry: Thermodynamics, Kinetics and AI-Driven Modelling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the laws of thermodynamics to chemical systems
2. Use free energy to predict spontaneity and equilibrium
3. Analyse reaction kinetics and rate laws
4. Describe quantum and spectroscopic foundations
5. Relate molecular behaviour to bulk properties
6. Explain how machine learning augments physical-chemistry modelling

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Thermodynamics laws (17% (design weight), design weight)

- Worked applications: (1) Compute the entropy change for an ideal-gas expansion; (2) Decide spontaneity from enthalpy and entropy signs
- Common misconception addressed: Assuming an exothermic reaction is always spontaneous
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Internal energy, enthalpy and the first law | 81 | 5 |
| M01L02 | Entropy and the second law | 82 | 5 |

### M02 Free energy and equilibrium (17% (design weight), design weight)

- Worked applications: (1) Relate a measured equilibrium constant to free energy; (2) Predict how K shifts with temperature
- Common misconception addressed: Confusing a negative free-energy change with a fast reaction
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Gibbs free energy and spontaneity | 81 | 5 |
| M02L02 | Linking free energy to equilibrium constants | 82 | 5 |

### M03 Chemical kinetics (17% (design weight), design weight)

- Worked applications: (1) Derive the rate law from initial-rate data; (2) Use an Arrhenius plot to find activation energy
- Common misconception addressed: Reading reaction order directly off stoichiometric coefficients
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Rate laws and reaction order | 81 | 5 |
| M03L02 | Arrhenius behaviour and mechanisms | 82 | 5 |

### M04 Quantum foundations (17% (design weight), design weight)

- Worked applications: (1) Estimate energy-level spacing for a confined particle; (2) Match a spectral transition to an energy gap
- Common misconception addressed: Thinking energy levels in bound systems are continuous
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Quantisation and the particle-in-a-box idea | 81 | 5 |
| M04L02 | Spectroscopy and energy levels | 82 | 5 |

### M05 Statistical and molecular view (16% (design weight), design weight)

- Worked applications: (1) Use the Boltzmann factor to compare level populations; (2) Connect molecular speed distribution to temperature
- Common misconception addressed: Assuming all molecules share a single identical speed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Boltzmann distribution and partition ideas | 77 | 5 |
| M05L02 | From molecular behaviour to bulk properties | 77 | 5 |

### M06 AI-driven modelling (16% (design weight), design weight)

- Worked applications: (1) Decide when an ML potential can replace costly simulation; (2) Set an error bound before trusting a surrogate model
- Common misconception addressed: Trusting a surrogate model outside its training regime
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Surrogate and ML potentials for simulation | 77 | 5 |
| M06L02 | Validating and bounding ML predictions | 77 | 5 |

## Integrative case

A reaction-engineering trainee models a catalytic process: they must determine spontaneity and the rate law from data by hand, interpret the activation energy, then decide whether an ML surrogate potential is accurate enough to replace full simulations and set its error bounds.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2007-final-protected | 40 | 40 | yes |
| MST-2007-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Thermodynamics laws | 7 |
| Free energy and equilibrium | 7 |
| Chemical kinetics | 7 |
| Quantum foundations | 7 |
| Statistical and molecular view | 6 |
| AI-driven modelling | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2007-Q0001** (single-answer, Select ONE) A reaction has a negative Gibbs free-energy change. What does this guarantee?

- A. The reaction is thermodynamically spontaneous under the stated conditions **(key)**  
  _Rationale:_ Correct: a negative delta-G indicates spontaneity, not speed.
- B. The reaction will proceed quickly  
  _Rationale:_ Rate depends on kinetics, not on the sign of delta-G.
- C. The reaction is exothermic  
  _Rationale:_ Spontaneity depends on both enthalpy and entropy, not enthalpy alone.
- D. The equilibrium constant is less than one  
  _Rationale:_ A negative delta-G corresponds to K greater than one.

**MST-2007-Q0002** (multiple-answer, Select TWO) Which TWO quantities can be obtained from an Arrhenius analysis? (Select TWO.)

- A. The activation energy of the reaction **(key)**  
  _Rationale:_ Correct: the slope of ln k versus 1/T gives the activation energy.
- B. The pre-exponential (frequency) factor **(key)**  
  _Rationale:_ Correct: the intercept yields the pre-exponential factor.
- C. The overall Gibbs free-energy change  
  _Rationale:_ Free energy is a thermodynamic quantity, not from Arrhenius kinetics.
- D. The equilibrium constant directly  
  _Rationale:_ Arrhenius analysis concerns rate constants, not equilibrium constants.

**MST-2007-Q0003** (single-answer, Select ONE) When is it unsafe to replace a physics simulation with a trained ML potential?

- A. When the input configuration lies outside the model's training distribution **(key)**  
  _Rationale:_ Correct: extrapolation beyond training data is unreliable.
- B. Whenever any approximation is used  
  _Rationale:_ Well-validated surrogates within their domain are acceptable.
- C. Only for gas-phase systems  
  _Rationale:_ The applicability-domain concern is general, not phase-specific.
- D. Never; ML potentials are always exact  
  _Rationale:_ No ML potential is exact everywhere.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
