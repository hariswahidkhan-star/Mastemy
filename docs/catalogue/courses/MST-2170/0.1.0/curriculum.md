# Orbital Mechanics and Astrodynamics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2170` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Educational physics-overview course; concepts versioned by verification date. No official syllabus; scope is conceptual orbital mechanics only. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Orbital Mechanics and Astrodynamics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Kepler's laws and Newtonian gravitation as the basis of orbital motion
2. Describe common orbit types and why missions choose them
3. Explain orbital elements and how they define an orbit
4. Describe manoeuvres such as Hohmann transfers at a conceptual level
5. Explain perturbations and why orbits evolve over time
6. Communicate mission orbit trade-offs to non-specialists

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Gravitation and two-body motion (25% (Mastemy design weight), design weight)

- Worked applications: (1) Use Kepler's third law to compare two orbital periods qualitatively; (2) Explain why orbit shape follows a conic section
- Common misconception addressed: Believing objects in orbit are beyond gravity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Newtonian gravity and the two-body problem | 120 | 7 |
| M01L02 | Kepler's laws and conic-section orbits | 120 | 7 |

### M02 Orbits and orbital elements (25% (Mastemy design weight), design weight)

- Worked applications: (1) Match three missions to suitable orbit types; (2) Describe an orbit from its elements
- Common misconception addressed: Thinking all satellites sit in one single orbit
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Orbit types: LEO, MEO, GEO and beyond | 120 | 7 |
| M02L02 | The six classical orbital elements | 120 | 7 |

### M03 Manoeuvres and transfers (25% (Mastemy design weight), design weight)

- Worked applications: (1) Estimate relative delta-v needs for two transfers conceptually; (2) Explain why plane changes are expensive in delta-v
- Common misconception addressed: Assuming you can change orbit instantly for free
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Delta-v and the rocket equation concept | 120 | 7 |
| M03L02 | Hohmann transfers and plane changes conceptually | 120 | 7 |

### M04 Perturbations and mission design (25% (Mastemy design weight), design weight)

- Worked applications: (1) Explain how atmospheric drag lowers a low orbit over time; (2) Recommend an orbit for an imaging mission
- Common misconception addressed: Treating orbits as fixed and unchanging forever
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Why real orbits drift and decay | 120 | 7 |
| M04L02 | Choosing an orbit for a mission's goals | 120 | 7 |

## Integrative case

A mission planning class is asked to recommend, conceptually, an orbit for a global Earth-observation satellite: they reason from Kepler's laws and orbital elements, compare orbit types, outline the transfer and station-keeping needs, and present the trade-offs for a design review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2170-final-protected | 40 | 40 | yes |
| MST-2170-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Gravitation and two-body motion | 10 |
| Orbits and orbital elements | 10 |
| Manoeuvres and transfers | 10 |
| Perturbations and mission design | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2170-Q0001** (single-answer, Select ONE) According to Kepler's third law, a satellite in a higher orbit has what orbital period compared with a lower one?

- A. A longer period **(key)**  
  _Rationale:_ Correct: period increases with orbital size under Kepler's third law.
- B. A shorter period  
  _Rationale:_ Higher orbits have longer, not shorter, periods.
- C. The same period always  
  _Rationale:_ Period depends on orbital size, so it differs.
- D. Zero period  
  _Rationale:_ A finite orbit always has a finite, non-zero period.

**MST-2170-Q0002** (multiple-answer, Select TWO) Which TWO statements about orbital manoeuvres are correct? (Select TWO.)

- A. A Hohmann transfer is an energy-efficient two-burn transfer between circular orbits **(key)**  
  _Rationale:_ Correct: the Hohmann transfer is the classic efficient two-impulse transfer.
- B. Plane changes generally require significant delta-v **(key)**  
  _Rationale:_ Correct: changing orbital plane is delta-v expensive.
- C. Manoeuvres require no propellant at all  
  _Rationale:_ Manoeuvres require delta-v, which costs propellant.
- D. Orbits can be changed instantly with no energy  
  _Rationale:_ Changing an orbit always requires energy/delta-v.

**MST-2170-Q0003** (single-answer, Select ONE) Why does a satellite in low Earth orbit gradually lose altitude over time?

- A. Residual atmospheric drag removes orbital energy **(key)**  
  _Rationale:_ Correct: thin upper-atmosphere drag slowly decays low orbits.
- B. Gravity switches off periodically  
  _Rationale:_ Gravity does not switch off; it acts continuously.
- C. The satellite speeds up and escapes  
  _Rationale:_ Drag slows and lowers the orbit; it does not cause escape.
- D. Sunlight pushes it straight down  
  _Rationale:_ Radiation pressure is small and not a simple downward push.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
