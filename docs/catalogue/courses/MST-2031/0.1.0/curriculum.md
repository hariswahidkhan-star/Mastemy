# Thermodynamics and Statistical Mechanics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2031` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Thermodynamics and Statistical Mechanics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the first law of thermodynamics to processes and cycles
2. Use the second law, entropy and the concept of reversibility
3. Analyse ideal-gas processes and heat engines, including Carnot efficiency
4. Relate microscopic states to macroscopic entropy via statistical mechanics
5. Apply the Boltzmann distribution to simple systems
6. Distinguish heat, work and internal energy in real scenarios

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 First law and energy (25% (design weight), design weight)

- Worked applications: (1) Compute the work done by a gas in an isothermal expansion; (2) Apply the first law to an isobaric heating process
- Common misconception addressed: Confusing heat added with change in internal energy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Heat, work, internal energy and the first law | 120 | 7 |
| M01L02 | Heat capacities and ideal-gas processes | 120 | 7 |

### M02 Second law and entropy (25% (design weight), design weight)

- Worked applications: (1) Compute the entropy change when ice melts; (2) Decide whether a proposed process violates the second law
- Common misconception addressed: Thinking entropy of a subsystem can never decrease
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Entropy, reversibility and the second law | 120 | 7 |
| M02L02 | The arrow of time and free energy | 120 | 7 |

### M03 Engines and cycles (25% (design weight), design weight)

- Worked applications: (1) Compute the maximum efficiency of an engine between two reservoirs; (2) Compare the coefficient of performance of two refrigerators
- Common misconception addressed: Believing an engine can reach 100% efficiency with a good design
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Heat engines, refrigerators and the Carnot cycle | 120 | 7 |
| M03L02 | Efficiency limits and real cycles | 120 | 7 |

### M04 Statistical mechanics (25% (design weight), design weight)

- Worked applications: (1) Count the microstates of a small two-level system; (2) Use the Boltzmann factor to find level populations at a temperature
- Common misconception addressed: Treating temperature as a measure of total energy rather than energy per degree of freedom
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Microstates, macrostates and Boltzmann entropy | 120 | 7 |
| M04L02 | The Boltzmann distribution and partition functions | 120 | 7 |

## Integrative case

An analyst evaluates a vendor's claim that a new engine beats the Carnot limit: compute the reservoir temperatures and the claimed efficiency, test the claim against the second law, and explain in entropy terms why it must fail.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2031-final-protected | 40 | 40 | yes |
| MST-2031-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| First law and energy | 10 |
| Second law and entropy | 10 |
| Engines and cycles | 10 |
| Statistical mechanics | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2031-Q0001** (single-answer, Select ONE) Heat is added to a gas while it expands, doing 200 J of work, and its internal energy rises by 150 J. How much heat was added?

- A. 350 J **(key)**  
  _Rationale:_ Correct: by the first law Q = dU + W = 150 + 200 = 350 J.
- B. 50 J  
  _Rationale:_ That subtracts work from internal energy; the first law adds them for heat input.
- C. 150 J  
  _Rationale:_ That ignores the work done by the gas.
- D. 200 J  
  _Rationale:_ That ignores the change in internal energy.

**MST-2031-Q0002** (multiple-answer, Select TWO) Which TWO conditions must hold for a heat engine to achieve the Carnot efficiency? (Select TWO.)

- A. All processes in the cycle are reversible **(key)**  
  _Rationale:_ Correct: the Carnot limit requires reversible operation.
- B. The engine operates between two fixed-temperature reservoirs **(key)**  
  _Rationale:_ Correct: Carnot efficiency is defined by the two reservoir temperatures.
- C. The working substance must be an ideal gas  
  _Rationale:_ Carnot efficiency is independent of the working substance.
- D. The cold reservoir must be at absolute zero  
  _Rationale:_ That would require infinite resources and is unattainable.

**MST-2031-Q0003** (single-answer, Select ONE) Why does the entropy of the universe increase when a hot object is placed in contact with a cold one?

- A. The heat flow is irreversible, and the cold object gains more entropy than the hot one loses **(key)**  
  _Rationale:_ Correct: dS = dQ/T is larger at the lower temperature, so total entropy rises.
- B. Energy is destroyed in the transfer  
  _Rationale:_ Energy is conserved; entropy, not energy, increases.
- C. The hot object gains entropy as it cools  
  _Rationale:_ The hot object loses entropy as it loses heat.
- D. Entropy is conserved in all heat transfers  
  _Rationale:_ Entropy is conserved only in reversible processes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
