# NCEES FE Mechanical

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0372` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | licensing-examination-knowledge-prep |
| Issuer | NCEES (no affiliation or endorsement) |
| Exam code | FE Mechanical |
| Version basis | unresolved (official outline not verified) |
| Evidence | **unverified-needs-official-check** - issuer outline not fetched in this pass; module/domain structure is a DESIGN ASSUMPTION |
| Legacy IDs | MST-ENG-NCEES-FEMEC-001 |
| Planned time | T = 9000 min; instruction I = 7200 min (80%); assessment A = 1800 min (20%) |
| Assessment split | lesson checks 450 / module checks 630 / cumulative 720 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-CERTPREP-02 |

> **DESIGN ASSUMPTION:** The official domain names, weightings, learning objectives and item counts were NOT verified against the issuer's published outline in this spec-writing pass. Every module, weighting, objective and item count below is a planning assumption and must be confirmed against the official exam page before authoring.

## Learning outcomes

1. Demonstrate knowledge and applied reasoning for the design-assumption domain: Mathematics and Probability (confirm against official outline at blueprint review)
2. Demonstrate knowledge and applied reasoning for the design-assumption domain: Statics, Dynamics and Mechanics of Materials (confirm against official outline at blueprint review)
3. Demonstrate knowledge and applied reasoning for the design-assumption domain: Thermodynamics and Heat Transfer (confirm against official outline at blueprint review)
4. Demonstrate knowledge and applied reasoning for the design-assumption domain: Mechanical Design and Materials (confirm against official outline at blueprint review)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Mathematics and Probability (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Solve an applied differential-equation problem; (2) Compute an expected value for a design choice
- Common misconception addressed: Dropping integration constants that carry physical meaning
- Module check: 158 items / 158 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Calculus and differential equations | 600 | 6 |
| M01L02 | Probability and statistics | 600 | 6 |
| M01L03 | Engineering economics | 600 | 6 |

### M02 Statics, Dynamics and Mechanics of Materials (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Analyse a particle-dynamics scenario; (2) Compute a stress in a loaded member
- Common misconception addressed: Confusing mass and weight in dynamics equations
- Module check: 158 items / 158 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Statics | 600 | 6 |
| M02L02 | Dynamics, kinematics and vibrations | 600 | 6 |
| M02L03 | Mechanics of materials | 600 | 6 |

### M03 Thermodynamics and Heat Transfer (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Apply the first law to a control volume; (2) Compute conduction through a composite wall
- Common misconception addressed: Assuming an ideal-gas relation holds near phase change
- Module check: 157 items / 157 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Thermodynamics | 600 | 6 |
| M03L02 | Heat transfer | 600 | 6 |
| M03L03 | Fluid mechanics | 600 | 6 |

### M04 Mechanical Design and Materials (DESIGN ASSUMPTION weighting)

- Worked applications: (1) Apply a fatigue or failure criterion conceptually; (2) Select a material from property requirements
- Common misconception addressed: Treating yield strength and ultimate strength as interchangeable
- Module check: 157 items / 157 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Machine design | 600 | 6 |
| M04L02 | Materials and properties | 600 | 6 |
| M04L03 | Measurements, instrumentation and controls | 600 | 6 |

## Integrative case

Work through multi-topic FE-style problems in mechanical engineering: identify the governing principle, set up the relationships, and reason to a quantitative answer. DESIGN ASSUMPTION pending official outline.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified; 270 items/270 min per form is a planning figure.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0372-practice-form-A | 270 | 270 | yes |
| MST-0372-practice-form-B | 270 | 270 | no (optional practice) |
| MST-0372-practice-form-C | 270 | 270 | no (optional practice) |
| MST-0372-final-protected | 270 | 270 | yes |

| Domain | Items per form |
|---|---|
| Mathematics and Probability | 68 |
| Statics, Dynamics and Mechanics of Materials | 68 |
| Thermodynamics and Heat Transfer | 67 |
| Mechanical Design and Materials | 67 |

Minimum reviewed item bank: 2484 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0372-Q0001** (single-answer-mcq, Select ONE) For an ideal gas undergoing a process, applying the first law to a closed system means that:

- A. The change in internal energy equals heat added minus work done by the gas **(key)**  
  _Rationale:_ Correct: this is the closed-system first law, dU = Q - W.
- B. Internal energy is always constant  
  _Rationale:_ Internal energy changes with heat and work interactions.
- C. Work and heat are the same quantity  
  _Rationale:_ Heat and work are different energy-transfer modes.
- D. Heat added always equals work done  
  _Rationale:_ They are equal only in special cases, not generally.

**MST-0372-Q0002** (single-answer-mcq, Select ONE) A ductile steel bar is loaded axially within its elastic range. Stress and strain are related by:

- A. Young's modulus (stress proportional to strain) **(key)**  
  _Rationale:_ Correct: in the elastic region, stress equals Young's modulus times strain.
- B. Poisson's ratio alone  
  _Rationale:_ Poisson's ratio relates lateral to axial strain, not stress to strain directly.
- C. The coefficient of thermal expansion  
  _Rationale:_ That governs thermal strain, not mechanical stress-strain here.
- D. A random relationship  
  _Rationale:_ The relationship is linear and well defined in the elastic range.

**MST-0372-Q0003** (multiple-answer-selection, Select TWO) Which TWO quantities are needed to compute conduction heat transfer through a plane wall at steady state?

- A. The thermal conductivity of the wall material **(key)**  
  _Rationale:_ Correct: conductivity is required by Fourier's law.
- B. The temperature difference across the wall **(key)**  
  _Rationale:_ Correct: the temperature gradient drives conduction.
- C. The electrical resistance of the wall  
  _Rationale:_ Electrical resistance is irrelevant to thermal conduction here.
- D. The colour of the wall surface  
  _Rationale:_ Surface colour affects radiation, not conduction.
- E. The ambient humidity  
  _Rationale:_ Humidity does not enter steady conduction through a solid wall.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
