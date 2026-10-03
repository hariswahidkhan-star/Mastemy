# Solar PV Fundamentals: Cells, Systems and Yield

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2360` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (general professional skills course; no external standard claimed). Outcomes are Mastemy internal IDs derived from the course blueprint; scope versioned by verification date, not an issuer syllabus edition. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Solar PV Fundamentals: Cells, Systems and Yield (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the photovoltaic effect and the main PV cell and module technologies
2. Describe the components of a grid-tied and an off-grid PV system
3. Estimate the energy yield of a PV array from irradiance, orientation and losses
4. Interpret an IV curve and the effect of temperature and shading on output
5. Size inverters and basic balance-of-system components for a given array
6. Identify safety, standards and maintenance considerations for PV installations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Cells and modules (25% (design weight), design weight)

- Worked applications: (1) Identify the cell technology from a module datasheet's efficiency and appearance; (2) Match three use cases to mono, poly or thin-film choices
- Common misconception addressed: Thinking a higher-wattage panel is always more efficient
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The photovoltaic effect and semiconductor basics | 120 | 7 |
| M01L02 | Cell technologies: mono, poly, thin-film and bifacial | 120 | 7 |

### M02 System architectures (25% (design weight), design weight)

- Worked applications: (1) Draw the single-line diagram of a residential grid-tied system; (2) Choose components for an off-grid cabin with a daily load
- Common misconception addressed: Assuming a grid-tied system keeps running during a blackout
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Grid-tied, off-grid and hybrid system layouts | 120 | 7 |
| M02L02 | Balance of system: inverters, mounting and protection | 120 | 7 |

### M03 Performance and yield (25% (design weight), design weight)

- Worked applications: (1) Estimate annual kWh for a 5 kW array from local irradiance and a performance ratio; (2) Explain why midday output drops on a very hot clear day
- Common misconception addressed: Believing output scales only with sunlight and never with temperature
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Irradiance, tilt, azimuth and the IV curve | 120 | 7 |
| M03L02 | Temperature, shading and the performance ratio | 120 | 7 |

### M04 Design, safety and O&M (25% (design weight), design weight)

- Worked applications: (1) Select an inverter size for a 6 kW array and justify the DC/AC ratio; (2) List the lockout and labelling steps before servicing an array
- Common misconception addressed: Assuming an oversized inverter always improves yield
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Inverter and string sizing basics | 120 | 7 |
| M04L02 | Standards, safety and maintenance of PV arrays | 120 | 7 |

## Integrative case

A homeowner wants a rooftop solar quote checked before signing: estimate the realistic annual yield for their roof orientation, confirm the inverter and string sizing make sense, flag shading and temperature effects, and list the safety and maintenance commitments.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; 40 items / 40 minutes is a Mastemy design choice for a focused skills final.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2360-final-protected | 40 | 40 | yes |
| MST-2360-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cells and modules | 10 |
| System architectures | 10 |
| Performance and yield | 10 |
| Design, safety and O&M | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2360-Q0001** (single-answer, Select ONE) What does the photovoltaic effect describe?

- A. Generation of an electric current when light frees charge carriers in a semiconductor **(key)**  
  _Rationale:_ That is the photovoltaic effect at the heart of a PV cell.
- B. Storage of electricity in a chemical battery  
  _Rationale:_ That is electrochemical storage, not the PV effect.
- C. Conversion of sunlight directly into heat for hot water  
  _Rationale:_ That describes solar thermal, not photovoltaics.
- D. Rotation of a turbine by wind pressure  
  _Rationale:_ That is wind energy, unrelated to the PV effect.

**MST-2360-Q0002** (multiple-answer, Select TWO) Which TWO factors reduce the real-world energy yield of a PV array below its nameplate rating? (Select TWO.)

- A. High cell temperature on hot sunny days **(key)**  
  _Rationale:_ PV output falls as cell temperature rises above the rated condition.
- B. Partial shading of modules in a string **(key)**  
  _Rationale:_ Shading on one module can disproportionately cut string output.
- C. Using a module with a higher efficiency rating  
  _Rationale:_ Higher efficiency raises, not reduces, yield.
- D. Orienting the array toward the equator at optimal tilt  
  _Rationale:_ Optimal orientation increases yield.

**MST-2360-Q0003** (single-answer, Select ONE) A grid-tied PV system without battery backup stops producing usable power during a grid outage. Why?

- A. The inverter must disconnect for safety (anti-islanding) when the grid is down **(key)**  
  _Rationale:_ Anti-islanding protection prevents back-feeding a dead grid, so a basic grid-tied inverter shuts off.
- B. The panels physically stop absorbing light during outages  
  _Rationale:_ Panels still receive light; the inverter disconnects.
- C. Grid outages drain the panels of stored charge  
  _Rationale:_ Panels store no charge; there is no battery in this system.
- D. The array reverses polarity automatically  
  _Rationale:_ No polarity reversal occurs; the cause is anti-islanding.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
