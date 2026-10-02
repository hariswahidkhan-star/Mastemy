# Internet of Things: Industrial Data and Connected Assets

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1179` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Internet of Things: Industrial Data and Connected Assets (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. IoT architecture and devices
2. Industrial connectivity and protocols
3. Industrial data pipelines
4. Analytics and asset insight
5. IoT security and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate wiring sensors or configuring a live gateway; hands-on practice belongs in a lab.

## Modules

### M01 IoT architecture and devices (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map a connected asset to the sensor, edge, network and cloud layers; (2) Choose a sensor type for a given measurement
- Common misconception addressed: Treating every connected device as needing constant cloud connectivity
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Sensors, actuators and edge devices | 96 | 8 |
| M01L02 | IoT reference architecture layers | 96 | 8 |

### M02 Industrial connectivity and protocols (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Select a protocol (MQTT vs OPC UA) for a telemetry use case; (2) Size bandwidth for a sensor fleet
- Common misconception addressed: Assuming consumer Wi-Fi is adequate for industrial telemetry
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Fieldbus, MQTT and OPC UA | 96 | 8 |
| M02L02 | Networks, gateways and bandwidth | 96 | 8 |

### M03 Industrial data pipelines (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide which processing happens at the edge vs the cloud; (2) Design a time-series ingestion flow
- Common misconception addressed: Sending all raw high-frequency data to the cloud unfiltered
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Data ingestion and time-series storage | 96 | 8 |
| M03L02 | Edge vs cloud processing | 96 | 8 |

### M04 Analytics and asset insight (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Interpret a vibration trend to flag an anomaly; (2) Define a rule for a condition alert
- Common misconception addressed: Confusing predictive maintenance with fixed-interval preventive maintenance
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Condition monitoring and anomaly detection | 96 | 8 |
| M04L02 | Predictive maintenance basics | 96 | 8 |

### M05 IoT security and operations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a secure onboarding flow for new devices; (2) Design an over-the-air update rollout
- Common misconception addressed: Leaving default device credentials unchanged in production
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Device identity, encryption and updates | 96 | 8 |
| M05L02 | Fleet management and reliability | 96 | 8 |

## Integrative case

A manufacturer wants to monitor the health of 200 pumps across three plants. The learner must choose sensors and a protocol, decide edge-versus-cloud processing, design a secure onboarding and update plan, and recommend a condition-monitoring rule set, then justify the architecture against bandwidth and security constraints.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1179-final-protected | 25 | 25 | yes |
| MST-1179-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IoT architecture and devices | 5 |
| Industrial connectivity and protocols | 5 |
| Industrial data pipelines | 5 |
| Analytics and asset insight | 5 |
| IoT security and operations | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1179-Q0001** (single-answer, Select ONE) For lightweight publish/subscribe telemetry from many constrained devices, the most suitable protocol is:

- A. MQTT **(key)**  
  _Rationale:_ Correct: MQTT is a lightweight pub/sub protocol designed for constrained devices and intermittent links.
- B. HTTP polling every second  
  _Rationale:_ High overhead and poor fit for many constrained devices.
- C. SMTP  
  _Rationale:_ An email protocol, not a telemetry transport.
- D. FTP  
  _Rationale:_ A file-transfer protocol, not suited to streaming telemetry.

**MST-1179-Q0002** (multiple-answer, Select TWO) Which TWO are sound IoT device security practices? (Select TWO.)

- A. Give each device a unique identity and credential **(key)**  
  _Rationale:_ Correct: per-device identity limits blast radius if one device is compromised.
- B. Encrypt data in transit **(key)**  
  _Rationale:_ Correct: encryption protects telemetry over untrusted networks.
- C. Keep the manufacturer default password  
  _Rationale:_ Default credentials are a common attack vector.
- D. Disable all firmware updates  
  _Rationale:_ Blocking updates leaves known vulnerabilities unpatched.

**MST-1179-Q0003** (single-answer, Select ONE) Predictive maintenance differs from preventive maintenance because it:

- A. Schedules action based on the asset's actual measured condition **(key)**  
  _Rationale:_ Correct: predictive maintenance acts on condition data rather than a fixed calendar.
- B. Always runs on a fixed calendar interval  
  _Rationale:_ That describes preventive, not predictive, maintenance.
- C. Only fixes assets after they fail  
  _Rationale:_ That is reactive maintenance.
- D. Eliminates the need for any sensors  
  _Rationale:_ Predictive maintenance depends on condition sensing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
