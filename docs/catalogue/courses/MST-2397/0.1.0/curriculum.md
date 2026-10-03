# EV Battery Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2397` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — EV Battery Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain lithium-ion cell chemistry, construction and key parameters
2. Describe how cells, modules and packs are assembled and interconnected
3. Explain the functions of a battery management system
4. Analyse state of charge, state of health and cell balancing
5. Describe battery thermal management and safety including thermal runaway
6. Evaluate degradation, second-life and recycling considerations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Cell fundamentals (20% (design weight), design weight)

- Worked applications: (1) Read capacity and C-rate from a cell datasheet; (2) Compare energy density of two cell chemistries
- Common misconception addressed: All lithium batteries use exactly the same chemistry
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Li-ion electrochemistry | 48 | 3 |
| M01L02 | Chemistries and formats | 48 | 3 |
| M01L03 | Voltage, capacity and C-rate | 48 | 3 |
| M01L04 | Cell datasheets | 48 | 3 |

### M02 Pack architecture (20% (design weight), design weight)

- Worked applications: (1) Compute pack voltage and capacity from a 96s2p configuration; (2) Explain why parallel cells must be matched
- Common misconception addressed: Adding cells in series increases capacity rather than voltage
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cells, modules, packs | 48 | 3 |
| M02L02 | Series and parallel arrangements | 48 | 3 |
| M02L03 | Busbars and interconnects | 48 | 3 |
| M02L04 | Enclosure and structural packs | 48 | 3 |

### M03 Battery management systems (20% (design weight), design weight)

- Worked applications: (1) List the protections a BMS must enforce; (2) Explain the purpose of a precharge circuit
- Common misconception addressed: A BMS only measures state of charge and does nothing else
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | BMS functions | 48 | 3 |
| M03L02 | Sensing and protection | 48 | 3 |
| M03L03 | Contactors and precharge | 48 | 3 |
| M03L04 | Communication and faults | 48 | 3 |

### M04 State estimation and balancing (20% (design weight), design weight)

- Worked applications: (1) Estimate state of charge from open-circuit voltage; (2) Explain why cell balancing is needed over pack life
- Common misconception addressed: A pack is as healthy as its average cell, so weak cells do not matter
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | State of charge | 48 | 3 |
| M04L02 | State of health | 48 | 3 |
| M04L03 | Passive vs active balancing | 48 | 3 |
| M04L04 | Coulomb counting and modelling | 48 | 3 |

### M05 Thermal, safety and lifecycle (20% (design weight), design weight)

- Worked applications: (1) Describe how a cooling plate limits cell temperature spread; (2) Outline how thermal runaway propagation is mitigated by design
- Common misconception addressed: Thermal runaway in one cell can never affect its neighbours
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Thermal management | 48 | 3 |
| M05L02 | Thermal runaway and propagation | 48 | 3 |
| M05L03 | Degradation mechanisms | 48 | 3 |
| M05L04 | Second life and recycling | 48 | 3 |

## Integrative case

A pack engineering team must specify a 400 V traction battery for a mid-size EV: they must choose a chemistry and configuration, define BMS protections and balancing, and design thermal management that limits runaway propagation.

## Cumulative assessment

Form length basis: 40-item knowledge form (1 minute per item) across cells, packs, BMS, state estimation and thermal safety

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2397-final-protected | 40 | 40 | yes |
| MST-2397-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cell fundamentals | 8 |
| Pack architecture | 8 |
| Battery management systems | 8 |
| State estimation and balancing | 8 |
| Thermal, safety and lifecycle | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2397-Q0001** (single-answer, Select ONE) A battery pack is built from 96 cells in series and 2 in parallel (96s2p). If each cell is nominally 3.7 V and 50 Ah, what is the approximate nominal pack voltage?

- A. 3.7 V  
  _Rationale:_ That is a single cell; series cells add voltage.
- B. 100 V  
  _Rationale:_ This does not reflect 96 series cells.
- C. 355 V **(key)**  
  _Rationale:_ Series cells add voltage: 96 × 3.7 V ≈ 355 V. Parallel cells increase capacity, not voltage.
- D. 710 V  
  _Rationale:_ This doubles the voltage as if the parallel cells also added voltage, which they do not.

**MST-2397-Q0002** (single-answer, Select ONE) What is the primary purpose of cell balancing in a battery management system?

- A. To make every cell physically the same size  
  _Rationale:_ Balancing addresses charge state, not physical dimensions.
- B. To equalise the state of charge across cells so pack capacity is not limited by the weakest cell **(key)**  
  _Rationale:_ Balancing brings cells to a similar state of charge so one cell does not prematurely limit charge or discharge.
- C. To increase the pack's nominal voltage  
  _Rationale:_ Balancing does not change nominal voltage.
- D. To cool the cells during fast charging  
  _Rationale:_ Cooling is handled by thermal management, not balancing.

**MST-2397-Q0003** (multiple-answer, Select TWO) A design review examines mitigations for lithium-ion thermal runaway. Select TWO measures that specifically help limit cell-to-cell propagation within a pack.

- A. Add thermal barriers or insulation between cells **(key)**  
  _Rationale:_ Inter-cell barriers slow heat transfer, limiting propagation to neighbouring cells.
- B. Provide venting paths that direct hot gases away from adjacent cells **(key)**  
  _Rationale:_ Directed venting reduces the chance that ejected hot gas ignites neighbours.
- C. Increase the pack's nominal voltage  
  _Rationale:_ Higher voltage does not reduce thermal propagation.
- D. Remove all temperature sensors to simplify wiring  
  _Rationale:_ Fewer sensors reduce early detection and worsen safety.
- E. Charge the pack at the highest possible current at all times  
  _Rationale:_ Aggressive charging increases heat generation and runaway risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
