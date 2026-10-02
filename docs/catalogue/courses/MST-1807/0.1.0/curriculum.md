# Industry 4.0 and IIoT

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1807` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-I40I-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Industry 4.0 and IIoT (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Industry 4.0 foundations
2. IIoT architecture
3. Data and analytics
4. Smart operations
5. Adoption, security and value

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate deploying a live IIoT system; hands-on practice belongs on a plant or testbed.

## Modules

### M01 Industry 4.0 foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Place a technology within the Industry 4.0 picture; (2) Explain cyber-physical systems
- Common misconception addressed: Treating Industry 4.0 as simply buying more machines
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The four industrial revolutions | 96 | 8 |
| M01L02 | Core Industry 4.0 technologies | 96 | 8 |

### M02 IIoT architecture (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design a layered IIoT architecture for a line; (2) Choose a protocol for machine data
- Common misconception addressed: Connecting operational technology to IT with no security segmentation
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sensors, edge and cloud | 96 | 8 |
| M02L02 | Industrial connectivity and protocols | 96 | 8 |

### M03 Data and analytics (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Design a pipeline from sensor to dashboard; (2) Describe how a digital twin is used
- Common misconception addressed: Collecting data with no clear question it will answer
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Industrial data pipelines | 96 | 8 |
| M03L02 | Analytics and digital twins | 96 | 8 |

### M04 Smart operations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set up a predictive-maintenance signal; (2) Explain how connectivity enables flexibility
- Common misconception addressed: Assuming predictive maintenance needs no historical baseline
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Predictive maintenance and OEE | 96 | 8 |
| M04L02 | Flexible, connected manufacturing | 96 | 8 |

### M05 Adoption, security and value (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify an OT security risk and control; (2) Build a phased Industry 4.0 roadmap
- Common misconception addressed: Launching a flashy pilot with no path to scale or value
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | OT/IT security and governance | 96 | 8 |
| M05L02 | Building a business case and roadmap | 96 | 8 |

## Integrative case

A factory wants to go 'smart' but has isolated machines and no data strategy. The learner must select Industry 4.0 technologies, design a secure IIoT architecture and data pipeline, set up predictive maintenance and OEE, and build a phased roadmap with a business case, then recommend where to start for real value.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1807-final-protected | 25 | 25 | yes |
| MST-1807-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Industry 4.0 foundations | 5 |
| IIoT architecture | 5 |
| Data and analytics | 5 |
| Smart operations | 5 |
| Adoption, security and value | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1807-Q0001** (single-answer, Select ONE) OPC UA is widely used in IIoT because it provides:

- A. A secure, vendor-neutral standard for industrial machine-to-machine data exchange **(key)**  
  _Rationale:_ Correct: OPC UA offers interoperable, secure industrial communication.
- B. A spreadsheet format for reports  
  _Rationale:_ OPC UA is a communication standard, not a file format.
- C. A brand of programmable logic controller  
  _Rationale:_ OPC UA is a protocol, not a PLC brand.
- D. A type of physical network cable  
  _Rationale:_ OPC UA is a protocol layer, not cabling.

**MST-1807-Q0002** (multiple-answer, Select TWO) Which TWO are sound practices when connecting OT to IT? (Select TWO.)

- A. Segment networks so operational technology is isolated and controlled **(key)**  
  _Rationale:_ Correct: segmentation limits the spread of threats into OT.
- B. Apply security monitoring across the OT/IT boundary **(key)**  
  _Rationale:_ Correct: monitoring the boundary detects intrusions early.
- C. Give every machine a direct public internet connection  
  _Rationale:_ Direct public exposure is a serious OT risk.
- D. Use shared default passwords across all devices  
  _Rationale:_ Shared defaults are an easily exploited weakness.

**MST-1807-Q0003** (single-answer, Select ONE) A digital twin is best described as:

- A. A live virtual model of a physical asset, updated with its real data **(key)**  
  _Rationale:_ Correct: a digital twin mirrors the real asset using its sensor data.
- B. A backup copy of the machine's manual  
  _Rationale:_ A manual copy is not a digital twin.
- C. A second identical physical machine  
  _Rationale:_ A physical duplicate is not a digital twin.
- D. A one-time CAD drawing never updated  
  _Rationale:_ A twin is continuously updated, unlike a static drawing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
