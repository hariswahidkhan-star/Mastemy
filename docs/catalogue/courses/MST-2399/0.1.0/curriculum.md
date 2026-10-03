# Vehicle Dynamics and Chassis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2399` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Vehicle Dynamics and Chassis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain tyre behaviour, slip and the friction circle
2. Analyse longitudinal dynamics in acceleration and braking
3. Analyse lateral dynamics, cornering and under/oversteer
4. Describe suspension types, geometry and their effects
5. Explain steering and braking system fundamentals
6. Apply dynamics concepts to tune a vehicle's handling balance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Tyres and friction (20% (design weight), design weight)

- Worked applications: (1) Plot available grip on a friction circle for combined braking and cornering; (2) Estimate peak tyre force from a simple load-sensitivity curve
- Common misconception addressed: A tyre can deliver maximum braking and maximum cornering force at the same instant
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tyre force generation | 48 | 3 |
| M01L02 | Slip ratio and slip angle | 48 | 3 |
| M01L03 | The friction circle | 48 | 3 |
| M01L04 | Load sensitivity | 48 | 3 |

### M02 Longitudinal dynamics (20% (design weight), design weight)

- Worked applications: (1) Compute front/rear weight transfer under braking; (2) Set a brake bias to avoid premature rear lock-up
- Common misconception addressed: Weight distribution does not change when a car accelerates or brakes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Weight transfer | 48 | 3 |
| M02L02 | Traction limits | 48 | 3 |
| M02L03 | Braking and distribution | 48 | 3 |
| M02L04 | Launch behaviour | 48 | 3 |

### M03 Lateral dynamics (20% (design weight), design weight)

- Worked applications: (1) Classify a handling trace as understeer or oversteer; (2) Explain how a stiffer front anti-roll bar shifts balance
- Common misconception addressed: Oversteer and understeer are the same thing described differently
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cornering forces | 48 | 3 |
| M03L02 | Understeer and oversteer | 48 | 3 |
| M03L03 | Yaw and stability | 48 | 3 |
| M03L04 | Limit handling | 48 | 3 |

### M04 Suspension and geometry (20% (design weight), design weight)

- Worked applications: (1) Identify how added negative camber affects cornering grip; (2) Compare a MacPherson strut with a double wishbone
- Common misconception addressed: Softer springs always improve handling in every situation
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Suspension types | 48 | 3 |
| M04L02 | Camber, caster, toe | 48 | 3 |
| M04L03 | Roll centres | 48 | 3 |
| M04L04 | Springs and dampers | 48 | 3 |

### M05 Steering and braking (20% (design weight), design weight)

- Worked applications: (1) Explain how ABS prevents wheel lock-up; (2) Relate Ackermann steering to low-speed cornering
- Common misconception addressed: ABS shortens stopping distance on every surface without exception
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Steering geometry | 48 | 3 |
| M05L02 | Ackermann | 48 | 3 |
| M05L03 | Brake systems | 48 | 3 |
| M05L04 | ABS and stability control | 48 | 3 |

## Integrative case

A chassis team receives customer complaints that a sports saloon feels nervous at the limit: they must diagnose the handling balance using dynamics principles and propose suspension and brake-bias changes, justifying each against grip and stability.

## Cumulative assessment

Form length basis: 40-item knowledge form (1 minute per item) across tyres, longitudinal, lateral, suspension and steering/braking

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2399-final-protected | 40 | 40 | yes |
| MST-2399-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Tyres and friction | 8 |
| Longitudinal dynamics | 8 |
| Lateral dynamics | 8 |
| Suspension and geometry | 8 |
| Steering and braking | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2399-Q0001** (single-answer, Select ONE) A car enters a corner and the front tyres lose grip first, so the car runs wide of the intended line. This behaviour is called:

- A. Oversteer  
  _Rationale:_ Oversteer is when the rear loses grip first and the tail slides out.
- B. Understeer **(key)**  
  _Rationale:_ When the front loses grip first and the car runs wide, the vehicle is understeering.
- C. Neutral steer  
  _Rationale:_ Neutral steer is balanced front and rear grip loss, not running wide.
- D. Weight transfer  
  _Rationale:_ Weight transfer is a cause of grip changes, not the name of this handling state.

**MST-2399-Q0002** (single-answer, Select ONE) What does the tyre friction circle primarily illustrate?

- A. That tyre grip is unlimited in all directions  
  _Rationale:_ The whole point of the circle is that grip is limited.
- B. That the combined longitudinal and lateral force a tyre can produce is limited by a finite total grip **(key)**  
  _Rationale:_ The friction circle shows that braking and cornering forces share one finite grip budget.
- C. That tyres never generate lateral force  
  _Rationale:_ Tyres generate lateral force when cornering; the circle bounds it.
- D. That tyre temperature has no effect on grip  
  _Rationale:_ The circle is about force limits, and temperature does affect grip.

**MST-2399-Q0003** (multiple-answer, Select TWO) An engineer wants to reduce mid-corner understeer in a front-engined car. Select TWO changes that typically shift the balance away from understeer.

- A. Soften the front anti-roll bar **(key)**  
  _Rationale:_ A softer front bar increases front grip relative to rear, reducing understeer.
- B. Stiffen the rear anti-roll bar **(key)**  
  _Rationale:_ A stiffer rear bar reduces rear grip relative to front, shifting balance toward neutral or oversteer.
- C. Stiffen the front anti-roll bar  
  _Rationale:_ A stiffer front bar reduces front grip and increases understeer.
- D. Increase front tyre pressures far above the optimum  
  _Rationale:_ Over-inflating the fronts reduces their contact grip and worsens understeer.
- E. Add ballast over the front axle  
  _Rationale:_ More front mass generally increases understeer, not reduce it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
