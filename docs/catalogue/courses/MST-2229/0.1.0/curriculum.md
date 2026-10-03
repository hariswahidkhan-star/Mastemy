# Mechanical Engineering Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2229` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Engineering standards, tool specifics and formulae must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Mechanical Engineering Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply statics and free-body diagrams to find forces and moments in simple structures
2. Use stress, strain and material properties to check a part against yield and factor of safety
3. Explain core thermodynamics and fluid concepts and where each governs a design
4. Analyse simple machines, gears and basic dynamics of motion
5. Select materials and manufacturing processes appropriate to a mechanical part
6. Read and interpret an engineering drawing with tolerances and GD&T basics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Statics and mechanics of materials (25% (Mastemy design weight), design weight)

- Worked applications: (1) Draw a free-body diagram for a loaded bracket and solve reactions; (2) Size a tension rod to a target factor of safety
- Common misconception addressed: Confusing mass with weight when summing forces
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Forces, moments and free-body diagrams | 120 | 7 |
| M01L02 | Stress, strain, yield and factor of safety | 120 | 7 |

### M02 Thermodynamics and fluids (25% (Mastemy design weight), design weight)

- Worked applications: (1) Trace energy through a simple heat engine cycle; (2) Compute pressure at depth in a tank and the force on a wall
- Common misconception addressed: Assuming energy is destroyed rather than converted
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Energy, heat and the laws of thermodynamics | 120 | 7 |
| M02L02 | Fluid statics, flow and pressure | 120 | 7 |

### M03 Dynamics and machine elements (25% (Mastemy design weight), design weight)

- Worked applications: (1) Compute the output speed and torque of a two-stage gear train; (2) Analyse the acceleration of a block on an inclined plane
- Common misconception addressed: Treating a rotating body's inertia as if it were a point mass
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Kinematics and dynamics of motion | 120 | 7 |
| M03L02 | Gears, bearings and simple machines | 120 | 7 |

### M04 Materials, manufacturing and drawings (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose a material for a lightweight stiff bracket and justify it; (2) Read a dimensioned drawing and flag an impossible tolerance stack
- Common misconception addressed: Reading a tolerance as the exact size rather than an allowed range
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Material selection and properties | 120 | 7 |
| M04L02 | Engineering drawings, tolerances and GD&T | 120 | 7 |

## Integrative case

A startup must design a bracket that holds a 15 kg sensor on a vibrating vehicle frame: size the part for stress and fatigue, pick a material and process, and produce a toleranced drawing for a shop.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2229-final-protected | 40 | 40 | yes |
| MST-2229-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Statics and mechanics of materials | 10 |
| Thermodynamics and fluids | 10 |
| Dynamics and machine elements | 10 |
| Materials, manufacturing and drawings | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2229-Q0001** (single-answer, Select ONE) A horizontal beam is pinned at one end and supported by a cable at the other. To find the cable tension, what should you do first?

- A. Draw a free-body diagram and sum moments about the pin **(key)**  
  _Rationale:_ Correct: taking moments about the pin removes the unknown pin reaction and isolates the cable tension.
- B. Measure the beam's temperature  
  _Rationale:_ Temperature is irrelevant to a static force balance here.
- C. Assume the tension equals the beam's weight  
  _Rationale:_ Tension depends on geometry and load position, not simply the weight.
- D. Sum forces only in the horizontal direction  
  _Rationale:_ Horizontal equilibrium alone cannot solve a vertical load problem.

**MST-2229-Q0002** (multiple-answer, Select TWO) Which TWO quantities must you know to compute the factor of safety of a ductile part in tension? (Select TWO.)

- A. The material's yield strength **(key)**  
  _Rationale:_ Correct: for a ductile part the yield strength sets the allowable stress.
- B. The applied (working) stress in the part **(key)**  
  _Rationale:_ Correct: factor of safety is the yield strength divided by the working stress.
- C. The colour of the part  
  _Rationale:_ Colour has no bearing on mechanical strength.
- D. The ambient humidity  
  _Rationale:_ Humidity does not define the static factor of safety in this basic case.

**MST-2229-Q0003** (single-answer, Select ONE) A reducing gear train increases torque at the output. What necessarily happens to the output rotational speed?

- A. It decreases in proportion to the gear ratio **(key)**  
  _Rationale:_ Correct: in an ideal gear train speed drops as torque rises, conserving power.
- B. It increases with the torque  
  _Rationale:_ Speed and torque trade off inversely in a gear reduction.
- C. It stays the same as the input  
  _Rationale:_ A reduction changes the speed; only a 1:1 ratio keeps it equal.
- D. It becomes zero  
  _Rationale:_ The output still turns; it is only slower.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
