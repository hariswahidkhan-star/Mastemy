# Engineering Mechanics: Dynamics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1797` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-EMD-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Engineering Mechanics: Dynamics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Kinematics of particles
2. Kinetics: Newton's second law
3. Work and energy
4. Impulse and momentum
5. Rigid-body dynamics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot fully demonstrate multi-step dynamics derivations; practice problems and worked solutions are provided separately.

## Modules

### M01 Kinematics of particles (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Relate position, velocity and acceleration; (2) Analyse a projectile's trajectory
- Common misconception addressed: Treating velocity and acceleration as always pointing the same way
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Rectilinear motion | 96 | 8 |
| M01L02 | Curvilinear motion and projectiles | 96 | 8 |

### M02 Kinetics: Newton's second law (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply F = ma to a connected-body system; (2) Set up equations for a block on an incline
- Common misconception addressed: Forgetting that F = ma uses the net force, not a single force
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Force, mass and acceleration | 96 | 8 |
| M02L02 | Equations of motion in systems | 96 | 8 |

### M03 Work and energy (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Use the work-energy theorem to find a speed; (2) Account for friction losses in an energy balance
- Common misconception addressed: Ignoring energy lost to friction in an energy balance
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Work-energy principle | 96 | 8 |
| M03L02 | Conservation of energy with friction | 96 | 8 |

### M04 Impulse and momentum (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Apply impulse-momentum to a changing force; (2) Analyse an impact using restitution
- Common misconception addressed: Assuming kinetic energy is conserved in every collision
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Linear impulse and momentum | 96 | 8 |
| M04L02 | Impact and collisions | 96 | 8 |

### M05 Rigid-body dynamics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Relate torque, inertia and angular acceleration; (2) Analyse rolling without slipping
- Common misconception addressed: Using linear F = ma alone for a rotating rigid body
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Rotation about a fixed axis | 96 | 8 |
| M05L02 | General plane motion | 96 | 8 |

## Integrative case

An automated conveyor drops parts onto a rotating sorting arm. The learner must analyse the part's projectile motion, apply Newton's second law and the work-energy principle to its slide, use impulse-momentum for the impact, and analyse the arm's rotation, then predict where parts land. Exact tool/version used for simulation is confirmed before production.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1797-final-protected | 25 | 25 | yes |
| MST-1797-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kinematics of particles | 5 |
| Kinetics: Newton's second law | 5 |
| Work and energy | 5 |
| Impulse and momentum | 5 |
| Rigid-body dynamics | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1797-Q0001** (single-answer, Select ONE) The work-energy principle states that the net work done on a body equals:

- A. The change in its kinetic energy **(key)**  
  _Rationale:_ Correct: net work = change in kinetic energy.
- B. Its total weight  
  _Rationale:_ Weight is a force, not energy.
- C. The impulse applied to it  
  _Rationale:_ Impulse relates to momentum, not the work-energy principle.
- D. Its momentum  
  _Rationale:_ Momentum is mass times velocity, not work.

**MST-1797-Q0002** (multiple-answer, Select TWO) Which TWO are true for a perfectly inelastic collision? (Select TWO.)

- A. Linear momentum is conserved **(key)**  
  _Rationale:_ Correct: momentum is conserved in collisions with no external impulse.
- B. The bodies move together after impact **(key)**  
  _Rationale:_ Correct: perfectly inelastic means they stick and share a velocity.
- C. Kinetic energy is fully conserved  
  _Rationale:_ Inelastic collisions lose kinetic energy.
- D. The bodies bounce apart elastically  
  _Rationale:_ That describes an elastic, not inelastic, collision.

**MST-1797-Q0003** (single-answer, Select ONE) For a wheel rolling without slipping, the contact point:

- A. Has zero instantaneous velocity relative to the ground **(key)**  
  _Rationale:_ Correct: rolling without slipping means no relative sliding at the contact.
- B. Moves fastest of all points on the wheel  
  _Rationale:_ The contact point is instantaneously at rest, the slowest.
- C. Moves at the same speed as the centre  
  _Rationale:_ The top moves at twice the centre's speed, not the contact.
- D. Experiences no normal force  
  _Rationale:_ A normal force still acts at the contact.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
