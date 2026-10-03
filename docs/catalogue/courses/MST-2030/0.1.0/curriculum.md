# Electromagnetism: Fields, Circuits and Maxwell's Equations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2030` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Electromagnetism: Fields, Circuits and Maxwell's Equations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply Coulomb's law and the electric field concept to charge distributions
2. Use Gauss's law to find fields for symmetric distributions
3. Analyse DC and simple RC circuits using Kirchhoff's rules
4. Relate magnetic fields to currents and apply the Lorentz force
5. Explain electromagnetic induction and Faraday's and Lenz's laws
6. State Maxwell's equations and explain how they predict electromagnetic waves

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Electric fields and potential (25% (design weight), design weight)

- Worked applications: (1) Compute the field on the axis of a charged ring; (2) Relate potential difference to the work moving a charge
- Common misconception addressed: Confusing electric potential with potential energy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Coulomb's law and the electric field | 120 | 7 |
| M01L02 | Electric potential and energy of charge configurations | 120 | 7 |

### M02 Gauss's law and capacitance (25% (design weight), design weight)

- Worked applications: (1) Use a Gaussian surface to find the field of an infinite sheet; (2) Compute the capacitance of a parallel-plate capacitor with a dielectric
- Common misconception addressed: Assuming Gauss's law gives the field without a symmetry argument
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Gauss's law and symmetry | 120 | 7 |
| M02L02 | Conductors, capacitors and dielectrics | 120 | 7 |

### M03 Circuits (25% (design weight), design weight)

- Worked applications: (1) Solve a two-loop circuit with Kirchhoff's rules; (2) Find the time constant of a charging RC circuit
- Common misconception addressed: Treating internal resistance and EMF as the same thing
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Current, resistance and Ohm's law | 120 | 7 |
| M03L02 | Kirchhoff's rules and RC transients | 120 | 7 |

### M04 Magnetism, induction and Maxwell (25% (design weight), design weight)

- Worked applications: (1) Find the force on a current-carrying wire in a uniform field; (2) Predict the induced current direction when a magnet approaches a loop
- Common misconception addressed: Believing a static magnetic field can induce an EMF in a stationary loop
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Magnetic force, Ampere's law and the Lorentz force | 120 | 7 |
| M04L02 | Faraday's law, Lenz's law and Maxwell's equations | 120 | 7 |

## Integrative case

An engineer models a wireless charging pad: use Faraday's law to relate the changing field to the induced voltage, size the coil and capacitor, trace the energy path, and explain which of Maxwell's equations governs each step.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2030-final-protected | 40 | 40 | yes |
| MST-2030-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Electric fields and potential | 10 |
| Gauss's law and capacitance | 10 |
| Circuits | 10 |
| Magnetism, induction and Maxwell | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2030-Q0001** (single-answer, Select ONE) A positive test charge is released from rest in a uniform electric field. How does it move?

- A. It accelerates in the direction of the field **(key)**  
  _Rationale:_ Correct: force on a positive charge is qE, along the field, producing acceleration.
- B. It moves at constant velocity along the field  
  _Rationale:_ A constant force produces acceleration, not constant velocity.
- C. It moves opposite to the field  
  _Rationale:_ A positive charge feels a force along the field, not against it.
- D. It stays at rest because fields do no work at rest  
  _Rationale:_ The field exerts a force that sets the charge in motion.

**MST-2030-Q0002** (multiple-answer, Select TWO) Which TWO statements about Gauss's law are correct? (Select TWO.)

- A. The net flux through a closed surface depends only on the enclosed charge **(key)**  
  _Rationale:_ Correct: flux is proportional to enclosed charge, by Gauss's law.
- B. It is only useful for computing fields when the charge distribution has high symmetry **(key)**  
  _Rationale:_ Correct: extracting the field from the flux integral requires symmetry.
- C. It states that magnetic flux through any closed surface is nonzero  
  _Rationale:_ That describes magnetism; Gauss's law for electricity concerns electric charge.
- D. It requires the surface to be a physical conductor  
  _Rationale:_ The Gaussian surface is an imaginary mathematical surface.

**MST-2030-Q0003** (single-answer, Select ONE) A bar magnet is pushed north-pole-first toward a conducting loop. By Lenz's law, the induced current in the loop will

- A. flow so as to oppose the increase in flux, repelling the magnet **(key)**  
  _Rationale:_ Correct: the induced current opposes the change, creating a repulsive force.
- B. flow so as to attract the magnet faster  
  _Rationale:_ That would violate energy conservation; the force opposes the motion.
- C. be zero because the magnet is a permanent magnet  
  _Rationale:_ A changing flux induces a current regardless of the field source.
- D. reverse direction continuously  
  _Rationale:_ The direction is fixed while the flux increases.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
