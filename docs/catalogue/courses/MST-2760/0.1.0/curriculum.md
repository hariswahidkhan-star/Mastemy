# Spatial Computing & Digital Twins

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2760` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal curriculum design (no official syllabus); emerging-technology scope as of 2026-10, speculative topics treated conceptually and safely. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Spatial Computing & Digital Twins (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain spatial computing and how devices understand physical space
2. Describe digital twins and how they mirror physical assets
3. Reason about the data pipeline from sensors to a live twin
4. Explain simulation and what-if analysis on digital twins
5. Identify use cases across industry, cities and facilities
6. Assess data quality, synchronisation and governance challenges

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Spatial computing (20% (design weight), design weight)

- Worked applications: (1) Describe how a device anchors content to a real location; (2) Explain why persistent anchors enable shared spaces
- Common misconception addressed: Treating spatial computing as just 3D graphics
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What spatial computing is | 64 | 4 |
| M01L02 | Mapping and anchors | 64 | 4 |
| M01L03 | Blending physical and digital | 64 | 4 |

### M02 Digital twin basics (22% (design weight), design weight)

- Worked applications: (1) Decide the fidelity a twin needs for a use case; (2) Distinguish a live twin from a static CAD model
- Common misconception addressed: Assuming any 3D model is a digital twin
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | What a digital twin is | 70 | 4 |
| M02L02 | Twin fidelity levels | 70 | 4 |
| M02L03 | Twin versus simple model | 71 | 4 |

### M03 Data pipeline (20% (design weight), design weight)

- Worked applications: (1) Design an ingestion flow from a machine's sensors; (2) Set a sync frequency for a near-real-time twin
- Common misconception addressed: Believing a twin stays accurate without continuous data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sensors and ingestion | 64 | 4 |
| M03L02 | Keeping a twin in sync | 64 | 4 |
| M03L03 | Edge and cloud roles | 64 | 4 |

### M04 Simulation and analysis (20% (design weight), design weight)

- Worked applications: (1) Run a what-if to test a factory layout change; (2) Use the twin to predict a maintenance need
- Common misconception addressed: Trusting a simulation whose input data is stale
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | What-if simulation | 64 | 4 |
| M04L02 | Predictive insight | 64 | 4 |
| M04L03 | Closing the loop to control | 64 | 4 |

### M05 Use cases and governance (18% (design weight), design weight)

- Worked applications: (1) Pick a twin use case for a building; (2) Flag a data-governance risk in a city twin
- Common misconception addressed: Ignoring who owns and governs the twin's data
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Industry and facilities | 57 | 4 |
| M05L02 | City-scale twins | 57 | 4 |
| M05L03 | Data quality and governance | 59 | 4 |

## Integrative case

A facilities operator wants a digital twin of a factory to cut downtime: decide the fidelity needed, design the sensor-to-twin data pipeline, run what-if simulations for layout and maintenance, and address data-quality, synchronisation and governance risks.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2760-final-protected | 40 | 40 | yes |
| MST-2760-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Spatial computing | 8 |
| Digital twin basics | 9 |
| Data pipeline | 8 |
| Simulation and analysis | 8 |
| Use cases and governance | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2760-Q0001** (single-answer, Select ONE) What most clearly distinguishes a digital twin from an ordinary 3D CAD model of an asset?

- A. A digital twin is continuously updated with live data so it reflects the asset's current state **(key)**  
  _Rationale:_ Correct: the defining feature is the live data link keeping the twin synchronised with reality.
- B. A digital twin is simply a higher-resolution 3D render  
  _Rationale:_ Resolution is not the distinction; the live data connection is.
- C. A digital twin must be printed in 3D  
  _Rationale:_ Printing is unrelated to what makes a twin.
- D. A digital twin never changes once built  
  _Rationale:_ A static model never changes; a twin updates with live data.

**MST-2760-Q0002** (multiple-answer, Select TWO) Which TWO are valid uses of a digital twin? (Select TWO.)

- A. Running what-if simulations to test changes before applying them physically **(key)**  
  _Rationale:_ Correct: simulating scenarios on the twin avoids risky physical trials.
- B. Predicting maintenance needs from the asset's live behaviour **(key)**  
  _Rationale:_ Correct: predictive maintenance is a core twin use case.
- C. Permanently replacing the physical asset so it can be switched off  
  _Rationale:_ A twin mirrors the asset; it does not replace the physical thing.
- D. Guaranteeing outcomes regardless of input data quality  
  _Rationale:_ Twin insights are only as good as their data; quality matters.

**MST-2760-Q0003** (single-answer, Select ONE) A factory twin gives misleading predictions. Investigation shows sensor data arrives hours late. What does this illustrate?

- A. Synchronisation and data quality are essential; a twin with stale data misrepresents reality **(key)**  
  _Rationale:_ Correct: a twin depends on timely, accurate data to stay a faithful mirror.
- B. Digital twins do not need any data  
  _Rationale:_ Twins fundamentally depend on data; this is the opposite lesson.
- C. The 3D model's colours were wrong  
  _Rationale:_ The issue is data latency, not appearance.
- D. Simulations are always correct regardless of inputs  
  _Rationale:_ Garbage-in produces misleading output; inputs matter.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
