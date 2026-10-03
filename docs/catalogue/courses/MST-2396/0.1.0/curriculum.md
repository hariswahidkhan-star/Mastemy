# Electric Vehicle (EV) Technology

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2396` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Electric Vehicle (EV) Technology (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the major subsystems of a battery electric vehicle and their roles
2. Explain electric machine types and the function of the power inverter
3. Analyse energy flow, efficiency and range from the battery to the wheels
4. Compare charging standards, connectors and charge-rate limits
5. Explain high-voltage safety concepts and interlock systems
6. Evaluate EV efficiency and range trade-offs for a given duty cycle

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 EV architecture (20% (design weight), design weight)

- Worked applications: (1) Draw the HV power flow for a single-motor BEV; (2) Compare packaging of a skateboard platform versus a converted ICE chassis
- Common misconception addressed: An EV is simply an ICE car with the engine swapped for a motor
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | BEV, PHEV and FCEV overview | 48 | 3 |
| M01L02 | High-voltage powertrain layout | 48 | 3 |
| M01L03 | Low-voltage and auxiliary systems | 48 | 3 |
| M01L04 | Thermal management | 48 | 3 |

### M02 Electric machines and inverters (20% (design weight), design weight)

- Worked applications: (1) Explain why an inverter is needed between battery and motor; (2) Estimate energy recovered during a braking event
- Common misconception addressed: Regenerative braking can recover all kinetic energy with no losses
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Motor types and torque | 48 | 3 |
| M02L02 | Inverter and PWM basics | 48 | 3 |
| M02L03 | Regenerative braking | 48 | 3 |
| M02L04 | Efficiency and losses | 48 | 3 |

### M03 Energy and range (20% (design weight), design weight)

- Worked applications: (1) Estimate range from pack capacity and average consumption; (2) Explain why highway range is usually lower than city range for a BEV
- Common misconception addressed: Battery capacity alone determines range regardless of driving style
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Energy storage and consumption | 48 | 3 |
| M03L02 | Range estimation | 48 | 3 |
| M03L03 | Drive cycles | 48 | 3 |
| M03L04 | Range anxiety factors | 48 | 3 |

### M04 Charging (20% (design weight), design weight)

- Worked applications: (1) Match a vehicle to a suitable charger type for an overnight versus a motorway stop; (2) Explain why DC fast charging tapers near high state of charge
- Common misconception addressed: Every charger delivers the same power to every car
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | AC vs DC charging | 48 | 3 |
| M04L02 | Connectors and standards | 48 | 3 |
| M04L03 | Charge curves and tapering | 48 | 3 |
| M04L04 | Smart and bidirectional charging | 48 | 3 |

### M05 High-voltage safety (20% (design weight), design weight)

- Worked applications: (1) Identify the correct sequence to de-energise an HV system for service; (2) Explain the purpose of an HV interlock loop
- Common misconception addressed: A powered-off ignition means the high-voltage system is safe to touch
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | HV hazards | 48 | 3 |
| M05L02 | Isolation and interlocks | 48 | 3 |
| M05L03 | Service disconnect procedures | 48 | 3 |
| M05L04 | First-responder considerations | 48 | 3 |

## Integrative case

A fleet operator is electrifying its depot: the team must select vehicles and chargers for mixed urban and motorway duty, size energy and charging needs, and set out high-voltage safety procedures for maintenance staff.

## Cumulative assessment

Form length basis: 40-item knowledge form (1 minute per item) across architecture, machines, energy, charging and HV safety

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2396-final-protected | 40 | 40 | yes |
| MST-2396-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| EV architecture | 8 |
| Electric machines and inverters | 8 |
| Energy and range | 8 |
| Charging | 8 |
| High-voltage safety | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2396-Q0001** (single-answer, Select ONE) What is the primary function of the power inverter in a battery electric vehicle?

- A. To step the 12 V battery up to high voltage for the cabin heater  
  _Rationale:_ That is the role of a DC-DC converter and PTC heater, not the traction inverter.
- B. To convert the battery's DC into controlled AC to drive the traction motor **(key)**  
  _Rationale:_ The inverter converts DC pack output into variable-frequency AC to control motor torque and speed.
- C. To store surplus energy during regenerative braking  
  _Rationale:_ Energy is stored in the battery; the inverter manages conversion, not storage.
- D. To filter coolant through the battery pack  
  _Rationale:_ Coolant flow is handled by the thermal management system, not the inverter.

**MST-2396-Q0002** (single-answer, Select ONE) Why does DC fast charging typically slow down as the battery approaches a high state of charge?

- A. The charger runs out of electricity  
  _Rationale:_ The supply is not exhausted; the vehicle limits the rate.
- B. The battery management system reduces current to protect the cells **(key)**  
  _Rationale:_ At high state of charge the BMS tapers current to limit cell voltage and avoid damage or lithium plating.
- C. The connector physically shrinks when warm  
  _Rationale:_ Connector geometry does not change the charge taper.
- D. Regenerative braking takes over the charging  
  _Rationale:_ Regen is unrelated to stationary DC charging behaviour.

**MST-2396-Q0003** (multiple-answer, Select TWO) An engineer must make a BEV safe before touching the high-voltage system. Select TWO actions that are essential parts of a safe de-energisation procedure.

- A. Remove or open the high-voltage service disconnect **(key)**  
  _Rationale:_ Opening the service disconnect physically isolates the pack from the HV bus.
- B. Verify the absence of voltage with a rated meter after a wait period **(key)**  
  _Rationale:_ Confirming zero voltage after capacitor discharge is essential before contact.
- C. Simply switch off the cabin infotainment  
  _Rationale:_ Infotainment is a low-voltage load and does not isolate the HV system.
- D. Rev the motor to drain the battery  
  _Rationale:_ This neither isolates nor safely discharges the HV system.
- E. Disconnect only the 12 V auxiliary battery  
  _Rationale:_ The 12 V battery is not the high-voltage hazard source.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
