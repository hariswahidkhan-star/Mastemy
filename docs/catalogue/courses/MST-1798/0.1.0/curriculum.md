# Strength of Materials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1798` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-SM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Strength of Materials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Stress and strain
2. Axial loading and thermal effects
3. Torsion
4. Bending of beams
5. Combined loading and failure

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot fully demonstrate multi-step stress derivations; practice problems and worked solutions are provided separately.

## Modules

### M01 Stress and strain (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute axial stress and strain in a bar; (2) Read yield and ultimate points on a stress-strain curve
- Common misconception addressed: Confusing stress (internal) with the applied external load
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Normal and shear stress | 96 | 8 |
| M01L02 | Stress-strain behaviour and Hooke's law | 96 | 8 |

### M02 Axial loading and thermal effects (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute elongation of a loaded bar; (2) Find thermal stress in a constrained member
- Common misconception addressed: Assuming a free-to-expand member develops thermal stress
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deformation under axial load | 96 | 8 |
| M02L02 | Thermal stress | 96 | 8 |

### M03 Torsion (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute shear stress in a shaft under torque; (2) Find the angle of twist of a shaft
- Common misconception addressed: Using bending formulas for a shaft in pure torsion
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Torsion of circular shafts | 96 | 8 |
| M03L02 | Shear stress and angle of twist | 96 | 8 |

### M04 Bending of beams (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draw shear and bending-moment diagrams; (2) Compute maximum bending stress
- Common misconception addressed: Locating maximum bending stress at the neutral axis instead of the extreme fibre
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Shear force and bending moment diagrams | 96 | 8 |
| M04L02 | Bending stress and the flexure formula | 96 | 8 |

### M05 Combined loading and failure (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Combine axial and bending stress at a point; (2) Apply a factor of safety against yield
- Common misconception addressed: Treating the factor of safety as a guarantee against any failure
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Combined stresses and Mohr's circle | 96 | 8 |
| M05L02 | Failure theories and factor of safety | 96 | 8 |

## Integrative case

A cantilever shaft carries both a transverse load and a torque. The learner must compute axial, torsional and bending stresses, draw the bending-moment diagram, combine stresses at the critical point, and apply a failure theory with a factor of safety, then confirm the shaft is adequately sized.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1798-final-protected | 25 | 25 | yes |
| MST-1798-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Stress and strain | 5 |
| Axial loading and thermal effects | 5 |
| Torsion | 5 |
| Bending of beams | 5 |
| Combined loading and failure | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1798-Q0001** (single-answer, Select ONE) Maximum bending stress in a beam occurs at:

- A. The fibre farthest from the neutral axis **(key)**  
  _Rationale:_ Correct: bending stress is proportional to distance from the neutral axis, peaking at the extreme fibre.
- B. The neutral axis  
  _Rationale:_ Bending stress is zero at the neutral axis.
- C. The centroid of the cross-section  
  _Rationale:_ For symmetric sections the centroid is the neutral axis, where stress is zero.
- D. The supports only  
  _Rationale:_ Stress depends on the bending moment and position, not just supports.

**MST-1798-Q0002** (multiple-answer, Select TWO) Which TWO conditions produce thermal stress in a member? (Select TWO.)

- A. A temperature change **(key)**  
  _Rationale:_ Correct: a temperature change drives the tendency to expand or contract.
- B. Restraint preventing free expansion or contraction **(key)**  
  _Rationale:_ Correct: stress arises only when expansion is constrained.
- C. Being painted a dark colour  
  _Rationale:_ Surface colour does not create thermal stress.
- D. Being free to expand in all directions  
  _Rationale:_ Unrestrained expansion produces strain but no stress.

**MST-1798-Q0003** (single-answer, Select ONE) Within the elastic region, Hooke's law states that stress is:

- A. Proportional to strain **(key)**  
  _Rationale:_ Correct: stress = modulus x strain in the linear elastic range.
- B. Inversely proportional to strain  
  _Rationale:_ Stress rises with strain, not inversely.
- C. Independent of strain  
  _Rationale:_ They are directly related in the elastic region.
- D. Equal to the cross-sectional area  
  _Rationale:_ Area is used to compute stress, not equal to it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
