# Hybrid Powertrains

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2398` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Hybrid Powertrains (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Classify hybrid architectures and their degrees of hybridisation
2. Explain power-split, series and parallel hybrid operating modes
3. Analyse energy flow and the role of the engine, motor and battery
4. Describe energy management strategies and mode transitions
5. Explain regenerative braking and engine start-stop in hybrids
6. Evaluate hybrid efficiency benefits for different duty cycles

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Hybrid classification (20% (design weight), design weight)

- Worked applications: (1) Classify a vehicle as mild or full hybrid from its spec; (2) Place a given motor as P2 or P4 on an architecture diagram
- Common misconception addressed: Any car with a battery is a full hybrid
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Micro, mild, full and plug-in | 48 | 3 |
| M01L02 | Series, parallel, power-split | 48 | 3 |
| M01L03 | P0-P4 motor positions | 48 | 3 |
| M01L04 | Degree of hybridisation | 48 | 3 |

### M02 Operating modes (20% (design weight), design weight)

- Worked applications: (1) Trace power flow in series mode versus parallel mode; (2) Decide when a full hybrid should switch the engine on
- Common misconception addressed: A hybrid always runs the engine and motor together at all times
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Electric-only mode | 48 | 3 |
| M02L02 | Engine-only and blended | 48 | 3 |
| M02L03 | Power-split operation | 48 | 3 |
| M02L04 | Mode transition logic | 48 | 3 |

### M03 Components and energy flow (20% (design weight), design weight)

- Worked applications: (1) Explain how a planetary gear enables a power split; (2) Size a battery for a mild versus full hybrid
- Common misconception addressed: A hybrid needs the same huge battery as a pure EV
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Electric machines in hybrids | 48 | 3 |
| M03L02 | Battery sizing for hybrids | 48 | 3 |
| M03L03 | Planetary gear sets | 48 | 3 |
| M03L04 | Clutches and couplings | 48 | 3 |

### M04 Energy management (20% (design weight), design weight)

- Worked applications: (1) Apply a simple rule-based strategy to a drive trace; (2) Explain why state of charge must stay within a window
- Common misconception addressed: The controller should always drive the engine at full load
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Rule-based strategies | 48 | 3 |
| M04L02 | Optimal control concepts | 48 | 3 |
| M04L03 | State-of-charge management | 48 | 3 |
| M04L04 | Drivability constraints | 48 | 3 |

### M05 Efficiency and braking (20% (design weight), design weight)

- Worked applications: (1) Blend friction and regenerative braking for a stop; (2) Estimate fuel saving from start-stop in city driving
- Common misconception addressed: Regenerative braking works equally well on the motorway and in the city
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Regenerative braking blending | 48 | 3 |
| M05L02 | Engine start-stop | 48 | 3 |
| M05L03 | Fuel economy gains | 48 | 3 |
| M05L04 | Duty-cycle sensitivity | 48 | 3 |

## Integrative case

An OEM must choose a hybrid architecture for a city-biased compact car: the team compares mild, full and plug-in options, defines operating modes and an energy-management strategy, and justifies the expected fuel-economy benefit.

## Cumulative assessment

Form length basis: 40-item knowledge form (1 minute per item) across classification, modes, components, energy management and braking

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2398-final-protected | 40 | 40 | yes |
| MST-2398-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Hybrid classification | 8 |
| Operating modes | 8 |
| Components and energy flow | 8 |
| Energy management | 8 |
| Efficiency and braking | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2398-Q0001** (single-answer, Select ONE) In a series hybrid operating in normal mode, how does power normally reach the driven wheels?

- A. Directly from the internal combustion engine through a gearbox  
  _Rationale:_ In a pure series hybrid the engine has no mechanical path to the wheels.
- B. From an electric motor, with the engine driving a generator **(key)**  
  _Rationale:_ In series mode the engine drives a generator and the electric motor alone propels the wheels.
- C. Only from the battery, with the engine never running  
  _Rationale:_ The engine runs to generate electricity when needed.
- D. From a belt connecting the engine crankshaft to the axle  
  _Rationale:_ No such direct belt drive to the axle exists in a series hybrid.

**MST-2398-Q0002** (single-answer, Select ONE) Which statement best describes a mild hybrid compared with a full hybrid?

- A. A mild hybrid can drive on electric power alone for extended distances  
  _Rationale:_ That capability characterises full and plug-in hybrids, not mild hybrids.
- B. A mild hybrid assists the engine and enables start-stop but cannot drive on electric power alone **(key)**  
  _Rationale:_ Mild hybrids provide torque assist and smoother start-stop but have no sustained electric-only propulsion.
- C. A mild hybrid has a larger battery than a plug-in hybrid  
  _Rationale:_ Plug-in hybrids have substantially larger batteries.
- D. A mild hybrid has no electric machine at all  
  _Rationale:_ A mild hybrid includes a small electric machine for assist and start-stop.

**MST-2398-Q0003** (multiple-answer, Select TWO) A hybrid controller decides when to recover energy. Select TWO conditions under which regenerative braking is most effective at recovering energy.

- A. During frequent decelerations in city driving **(key)**  
  _Rationale:_ Repeated braking events in city driving offer many opportunities to recover kinetic energy.
- B. When the battery has headroom to accept charge **(key)**  
  _Rationale:_ Energy can only be stored if the battery is not already near full state of charge.
- C. When the battery is already fully charged  
  _Rationale:_ A full battery cannot accept regenerated energy, so recovery is limited.
- D. During long steady-speed motorway cruising  
  _Rationale:_ Steady cruising involves little braking, so there is little energy to recover.
- E. When the vehicle is parked and switched off  
  _Rationale:_ No kinetic energy is available to recover when stationary.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
