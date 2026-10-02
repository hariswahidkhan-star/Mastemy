# Engineering Mechanics: Statics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1796` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-EMS-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Engineering Mechanics: Statics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Force systems
2. Equilibrium of particles and bodies
3. Structures: trusses and frames
4. Distributed loads and centroids
5. Friction and applications

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot fully demonstrate multi-step equilibrium derivations; practice problems and worked solutions are provided separately.

## Modules

### M01 Force systems (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Resolve a force into components; (2) Compute the moment of a force about a point
- Common misconception addressed: Forgetting that a moment depends on the perpendicular distance
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Forces, moments and couples | 96 | 8 |
| M01L02 | Resultants of force systems | 96 | 8 |

### M02 Equilibrium of particles and bodies (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draw a correct free-body diagram; (2) Solve for unknown reactions using equilibrium
- Common misconception addressed: Omitting a reaction force when drawing the free-body diagram
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Free-body diagrams | 96 | 8 |
| M02L02 | Equilibrium equations | 96 | 8 |

### M03 Structures: trusses and frames (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Find member forces by the method of joints; (2) Use the method of sections for one member
- Common misconception addressed: Assuming every truss member carries load (ignoring zero-force members)
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Method of joints | 96 | 8 |
| M03L02 | Method of sections | 96 | 8 |

### M04 Distributed loads and centroids (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Locate the centroid of a composite area; (2) Replace a distributed load with a resultant
- Common misconception addressed: Placing the resultant of a triangular load at the midpoint
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Centroids and centre of gravity | 96 | 8 |
| M04L02 | Distributed loads to equivalent forces | 96 | 8 |

### M05 Friction and applications (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Determine whether a block slips or tips; (2) Apply friction to a simple machine
- Common misconception addressed: Assuming friction force always equals mu times normal force even when static
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Dry (Coulomb) friction | 96 | 8 |
| M05L02 | Friction in wedges and belts | 96 | 8 |

## Integrative case

A bracket supports a signboard against wind load. The learner must draw the free-body diagram, resolve forces and moments, solve the support reactions, analyse a supporting truss, convert the distributed wind load to a resultant, and check friction at a pinned joint, then confirm the bracket is in equilibrium.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1796-final-protected | 25 | 25 | yes |
| MST-1796-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Force systems | 5 |
| Equilibrium of particles and bodies | 5 |
| Structures: trusses and frames | 5 |
| Distributed loads and centroids | 5 |
| Friction and applications | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1796-Q0001** (single-answer, Select ONE) For a rigid body in static equilibrium in a plane:

- A. The sums of forces in two directions and of moments are all zero **(key)**  
  _Rationale:_ Correct: plane equilibrium requires sum Fx = sum Fy = sum M = 0.
- B. Only the sum of vertical forces must be zero  
  _Rationale:_ Horizontal forces and moments must also balance.
- C. The body must be moving at constant velocity  
  _Rationale:_ Statics concerns bodies at rest.
- D. Moments can be ignored if forces balance  
  _Rationale:_ Moment balance is an independent requirement.

**MST-1796-Q0002** (multiple-answer, Select TWO) Which TWO assumptions underlie ideal truss analysis? (Select TWO.)

- A. Members carry only axial force (tension or compression) **(key)**  
  _Rationale:_ Correct: ideal truss members are two-force members.
- B. Loads are applied only at the joints **(key)**  
  _Rationale:_ Correct: joint loading keeps members axial.
- C. Joints are rigid and transmit bending moments  
  _Rationale:_ Ideal truss joints are pinned, carrying no moment.
- D. Every member must be in tension  
  _Rationale:_ Members may be in tension or compression.

**MST-1796-Q0003** (single-answer, Select ONE) The moment of a force about a point equals:

- A. The force multiplied by the perpendicular distance to its line of action **(key)**  
  _Rationale:_ Correct: moment = force x perpendicular (moment) arm.
- B. The force multiplied by the time applied  
  _Rationale:_ That is impulse, not moment.
- C. The force divided by the distance  
  _Rationale:_ Moment is a product, not a quotient.
- D. The force regardless of where it acts  
  _Rationale:_ Position relative to the point is essential.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
