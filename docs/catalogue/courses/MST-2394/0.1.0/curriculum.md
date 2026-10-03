# Automotive Engineering Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2394` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | curriculum specification (design assumption, see course package); no official syllabus exists for this general professional-skills course |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Automotive Engineering Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the major subsystems of a motor vehicle and how they interact as an integrated system
2. Explain the engineering units, loads and performance metrics used across automotive design
3. Interpret a vehicle's power, torque and gearing relationships from basic principles
4. Relate materials, weight and packaging choices to cost, safety and performance trade-offs
5. Summarise the vehicle development lifecycle from concept to end-of-line validation
6. Apply basic reliability and safety concepts to a simple automotive design decision

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Vehicle systems overview (20% (design weight), design weight)

- Worked applications: (1) Map every subsystem of a given hatchback onto a block diagram; (2) Trace a driver throttle input through the subsystems to wheel torque
- Common misconception addressed: A vehicle is just an engine plus wheels; the other subsystems are optional extras
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The vehicle as a system | 48 | 3 |
| M01L02 | Powertrain, chassis and body | 48 | 3 |
| M01L03 | Electrical and control systems | 48 | 3 |
| M01L04 | Comfort, safety and HMI subsystems | 48 | 3 |

### M02 Engineering fundamentals (20% (design weight), design weight)

- Worked applications: (1) Draw a free-body diagram of a car on a gradient; (2) Compute the power needed to hold a steady speed
- Common misconception addressed: Torque and power are the same quantity expressed differently
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Units, forces and free-body diagrams | 48 | 3 |
| M02L02 | Energy, work and power | 48 | 3 |
| M02L03 | Thermodynamics and fluids basics | 48 | 3 |
| M02L04 | Measurement and tolerances | 48 | 3 |

### M03 Performance and dynamics basics (20% (design weight), design weight)

- Worked applications: (1) Estimate 0-100 km/h time from power-to-weight ratio; (2) Compare two final-drive ratios for top speed vs acceleration
- Common misconception addressed: More power always means a faster car regardless of gearing or mass
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Power, torque and gearing | 48 | 3 |
| M03L02 | Rolling resistance and aerodynamics | 48 | 3 |
| M03L03 | Acceleration and braking | 48 | 3 |
| M03L04 | Fuel and energy economy | 48 | 3 |

### M04 Materials, packaging and cost (20% (design weight), design weight)

- Worked applications: (1) Pick a body material for a cost-sensitive panel and justify it; (2) Estimate mass saving from an aluminium versus steel bonnet
- Common misconception addressed: The lightest material is always the best engineering choice
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Metals, polymers and composites | 48 | 3 |
| M04L02 | Weight and packaging trade-offs | 48 | 3 |
| M04L03 | Manufacturing cost drivers | 48 | 3 |
| M04L04 | Recyclability and lifecycle | 48 | 3 |

### M05 Development lifecycle (20% (design weight), design weight)

- Worked applications: (1) Place a list of tasks on a V-model development timeline; (2) Decide which failures must be caught before line release
- Common misconception addressed: Validation is a single test at the end rather than a staged process
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Concept and requirements | 48 | 3 |
| M05L02 | Design, CAD and simulation | 48 | 3 |
| M05L03 | Prototyping and validation | 48 | 3 |
| M05L04 | Reliability, safety and sign-off | 48 | 3 |

## Integrative case

A startup must specify a compact urban runabout: the team must balance performance targets, material and packaging choices, cost ceilings and a realistic development timeline, then defend the key trade-offs to investors.

## Cumulative assessment

Form length basis: 40-item knowledge form (1 minute per item) covering all five modules in proportion to design weight

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2394-final-protected | 40 | 40 | yes |
| MST-2394-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Vehicle systems overview | 8 |
| Engineering fundamentals | 8 |
| Performance and dynamics basics | 8 |
| Materials, packaging and cost | 8 |
| Development lifecycle | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2394-Q0001** (single-answer, Select ONE) Torque at the crankshaft is 200 N·m and the overall gear ratio to the wheels is 10:1 (ignoring losses). What is the approximate torque delivered at the wheels?

- A. 20 N·m  
  _Rationale:_ This divides by the ratio; a reduction ratio multiplies torque, it does not reduce it.
- B. 200 N·m  
  _Rationale:_ The ratio changes the torque; it is not unchanged through the gearing.
- C. 2000 N·m **(key)**  
  _Rationale:_ A 10:1 reduction multiplies crankshaft torque by 10, giving roughly 2000 N·m at the wheels.
- D. 210 N·m  
  _Rationale:_ Gear ratios multiply rather than add to the input torque.

**MST-2394-Q0002** (single-answer, Select ONE) A car travels at a steady speed on a level road. Which statement best describes the net longitudinal force on it?

- A. The net force is large and forward, proportional to engine power  
  _Rationale:_ Steady speed means zero acceleration, so the net force is not large.
- B. The net force is zero because tractive force balances resistance **(key)**  
  _Rationale:_ At constant velocity acceleration is zero, so drive force equals the sum of rolling and aerodynamic resistance.
- C. The net force is backward because drag always dominates  
  _Rationale:_ If drag dominated, the car would decelerate; at steady speed forces balance.
- D. There is no force acting on the car at all  
  _Rationale:_ Several forces act; they simply sum to zero at constant speed.

**MST-2394-Q0003** (multiple-answer, Select TWO) A team wants to reduce a vehicle's steady-state fuel consumption at highway speed. Select TWO changes that directly reduce the dominant resistive losses at that speed.

- A. Lower the aerodynamic drag coefficient **(key)**  
  _Rationale:_ Aerodynamic drag scales with speed squared and dominates at highway speed, so reducing Cd cuts the largest loss.
- B. Reduce rolling resistance with low-resistance tyres **(key)**  
  _Rationale:_ Rolling resistance is a significant steady-speed loss, so lower-resistance tyres directly reduce consumption.
- C. Fit larger diameter brake discs  
  _Rationale:_ Brake size affects stopping, not steady-state cruising losses.
- D. Add a louder exhaust system  
  _Rationale:_ Exhaust sound does not change the resistive forces the engine must overcome.
- E. Install a larger infotainment screen  
  _Rationale:_ Cabin electronics have negligible effect on highway tractive losses.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
