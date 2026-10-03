# Foundations of Quantum Mechanics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2033` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Foundations of Quantum Mechanics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the experimental evidence that motivated quantum theory
2. Interpret the wavefunction and the Born probability rule
3. Apply the Schrodinger equation to simple bound systems
4. Use the uncertainty principle and operator formalism qualitatively
5. Explain quantisation, tunnelling and superposition with examples
6. Distinguish quantum predictions from classical intuition

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Origins of quantum theory (25% (design weight), design weight)

- Worked applications: (1) Compute a photon energy from its frequency; (2) Estimate the de Broglie wavelength of an electron
- Common misconception addressed: Thinking light is either purely a wave or purely a particle in all experiments
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Blackbody radiation, the photoelectric effect and photons | 120 | 7 |
| M01L02 | Wave-particle duality and the de Broglie wavelength | 120 | 7 |

### M02 The wavefunction (25% (design weight), design weight)

- Worked applications: (1) Normalise a given one-dimensional wavefunction; (2) Compute the probability of finding a particle in a region
- Common misconception addressed: Treating the wavefunction itself as a probability rather than its squared magnitude
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The wavefunction and the Born rule | 120 | 7 |
| M02L02 | Normalisation and expectation values | 120 | 7 |

### M03 The Schrodinger equation (25% (design weight), design weight)

- Worked applications: (1) Find the allowed energies of a particle in an infinite well; (2) Sketch the first two stationary states of a box
- Common misconception addressed: Assuming a bound particle can have any continuous energy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The time-independent Schrodinger equation | 120 | 7 |
| M03L02 | The particle in a box and energy quantisation | 120 | 7 |

### M04 Uncertainty, tunnelling and superposition (25% (design weight), design weight)

- Worked applications: (1) Estimate the minimum momentum spread from a position uncertainty; (2) Explain why tunnelling allows escape through a classically forbidden barrier
- Common misconception addressed: Believing the uncertainty principle is just a measurement-disturbance effect
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The Heisenberg uncertainty principle and operators | 120 | 7 |
| M04L02 | Tunnelling and superposition | 120 | 7 |

## Integrative case

A student analyses a scanning tunnelling microscope: relate the measured tunnelling current to barrier width using quantum tunnelling, explain why the electron's energy is quantised in the tip, and distinguish the quantum prediction from a classical one.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2033-final-protected | 40 | 40 | yes |
| MST-2033-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Origins of quantum theory | 10 |
| The wavefunction | 10 |
| The Schrodinger equation | 10 |
| Uncertainty, tunnelling and superposition | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2033-Q0001** (single-answer, Select ONE) According to the Born rule, the quantity that gives the probability density of finding a particle at a point is

- A. the squared magnitude of the wavefunction **(key)**  
  _Rationale:_ Correct: |psi|^2 is the probability density in the Born interpretation.
- B. the wavefunction itself  
  _Rationale:_ The wavefunction can be complex and is not a probability.
- C. the energy of the particle  
  _Rationale:_ Energy does not give a spatial probability density.
- D. the derivative of the wavefunction  
  _Rationale:_ The derivative relates to momentum, not probability density.

**MST-2033-Q0002** (multiple-answer, Select TWO) Which TWO phenomena cannot be explained by classical physics and require quantum mechanics? (Select TWO.)

- A. Electrons tunnelling through a potential barrier they lack the energy to cross classically **(key)**  
  _Rationale:_ Correct: tunnelling is a purely quantum effect.
- B. The discrete emission spectrum of atomic hydrogen **(key)**  
  _Rationale:_ Correct: discrete spectral lines reflect quantised energy levels.
- C. A ball rolling down a frictionless ramp  
  _Rationale:_ This is well described by classical mechanics.
- D. The parabolic path of a thrown stone  
  _Rationale:_ Projectile motion is classical.

**MST-2033-Q0003** (single-answer, Select ONE) The energy levels of a particle confined to an infinite square well are quantised because

- A. only wavelengths that fit an integer number of half-wavelengths in the well are allowed **(key)**  
  _Rationale:_ Correct: boundary conditions select discrete standing-wave modes, giving quantised energies.
- B. the particle loses energy to the walls  
  _Rationale:_ The walls are idealised and do no work; quantisation comes from boundary conditions.
- C. the particle is always at rest  
  _Rationale:_ A confined particle has nonzero minimum (zero-point) energy.
- D. energy is continuous but we can only measure discrete values  
  _Rationale:_ The allowed energies themselves are discrete for a bound system.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
