# Fluid Mechanics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1800` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-FM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Fluid Mechanics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Fluid properties and statics
2. Fluid kinematics
3. Energy in flow: Bernoulli
4. Viscous flow and losses
5. Dimensional analysis and applications

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot fully demonstrate multi-step flow calculations; practice problems and worked solutions are provided separately.

## Modules

### M01 Fluid properties and statics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute pressure at depth in a fluid; (2) Find the force on a submerged surface
- Common misconception addressed: Forgetting that hydrostatic pressure depends on depth, not container shape
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Density, viscosity and pressure | 96 | 8 |
| M01L02 | Hydrostatic pressure and forces | 96 | 8 |

### M02 Fluid kinematics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply continuity to a varying-area duct; (2) Sketch streamlines for a simple flow
- Common misconception addressed: Assuming velocity is constant across a changing pipe diameter
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Flow description and streamlines | 96 | 8 |
| M02L02 | Continuity and conservation of mass | 96 | 8 |

### M03 Energy in flow: Bernoulli (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply Bernoulli between two points in a flow; (2) Identify where Bernoulli does not apply
- Common misconception addressed: Applying Bernoulli across a pump or through strong friction
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The Bernoulli equation | 96 | 8 |
| M03L02 | Applications and limitations | 96 | 8 |

### M04 Viscous flow and losses (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Classify a flow using the Reynolds number; (2) Compute head loss in a pipe
- Common misconception addressed: Assuming all pipe flow is laminar
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Laminar vs turbulent flow | 96 | 8 |
| M04L02 | Pipe friction and head loss | 96 | 8 |

### M05 Dimensional analysis and applications (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Form a dimensionless group from variables; (2) Read a pump operating point
- Common misconception addressed: Comparing two flows without matching the relevant dimensionless numbers
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Dimensionless numbers | 96 | 8 |
| M05L02 | Pumps and flow measurement | 96 | 8 |

## Integrative case

A pumping system delivers less flow than designed. The learner must apply continuity and Bernoulli, classify the flow with the Reynolds number, compute friction head loss, and use the pump curve to find the true operating point, then recommend a fix to restore the design flow.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1800-final-protected | 25 | 25 | yes |
| MST-1800-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Fluid properties and statics | 5 |
| Fluid kinematics | 5 |
| Energy in flow: Bernoulli | 5 |
| Viscous flow and losses | 5 |
| Dimensional analysis and applications | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1800-Q0001** (single-answer, Select ONE) Hydrostatic pressure at a given depth in a still fluid depends on:

- A. The fluid density, gravity and the depth **(key)**  
  _Rationale:_ Correct: p = rho x g x h, independent of container shape.
- B. The shape of the container  
  _Rationale:_ Pressure at depth does not depend on container shape.
- C. The total weight of the container  
  _Rationale:_ Only the fluid column above the point matters.
- D. The surface area of the fluid  
  _Rationale:_ Depth, not surface area, sets the pressure.

**MST-1800-Q0002** (multiple-answer, Select TWO) Which TWO are true about the Reynolds number? (Select TWO.)

- A. It compares inertial to viscous forces **(key)**  
  _Rationale:_ Correct: Re is the ratio of inertial to viscous effects.
- B. A high value indicates turbulent flow **(key)**  
  _Rationale:_ Correct: above the critical range, flow is turbulent.
- C. It has units of metres per second  
  _Rationale:_ The Reynolds number is dimensionless.
- D. It only applies to gases  
  _Rationale:_ Re applies to liquids and gases alike.

**MST-1800-Q0003** (single-answer, Select ONE) The Bernoulli equation is valid only when the flow is approximately:

- A. Steady, incompressible and frictionless along a streamline **(key)**  
  _Rationale:_ Correct: Bernoulli assumes no significant friction or energy addition along a streamline.
- B. Highly turbulent with large friction losses  
  _Rationale:_ Friction losses violate Bernoulli's assumptions.
- C. Driven by a pump adding energy between the points  
  _Rationale:_ Energy addition requires an extended energy equation.
- D. Compressible at high Mach number  
  _Rationale:_ Bernoulli's basic form assumes incompressible flow.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
