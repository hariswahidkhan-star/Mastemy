# IoT Systems Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2324` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — IoT Systems Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe the IoT architecture from devices to cloud
2. Compare connectivity options such as Wi-Fi, BLE, LoRaWAN and cellular
3. Explain messaging patterns including MQTT and publish/subscribe
4. Reason about power, bandwidth and edge-versus-cloud processing
5. Describe IoT data pipelines and device management
6. Apply core IoT security and privacy practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 IoT architecture (25% (Mastemy design weight), design weight)

- Worked applications: (1) Place sensing, aggregation and analytics at the right tier for a smart farm; (2) Decide which computation belongs at the edge versus the cloud for latency
- Common misconception addressed: Assuming every device must talk directly to the cloud
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Devices, gateways and cloud tiers | 120 | 7 |
| M01L02 | Edge versus cloud processing | 120 | 7 |

### M02 Connectivity (25% (Mastemy design weight), design weight)

- Worked applications: (1) Choose BLE versus LoRaWAN for a battery sensor reporting once an hour; (2) Estimate the data budget for a cellular-connected tracker
- Common misconception addressed: Picking Wi-Fi for a remote low-power sensor out of habit
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Short-range: Wi-Fi and BLE | 120 | 7 |
| M02L02 | Long-range: LoRaWAN and cellular | 120 | 7 |

### M03 Messaging and data (25% (Mastemy design weight), design weight)

- Worked applications: (1) Design MQTT topics for a building with many rooms and sensor types; (2) Select a quality-of-service level for critical alarm messages
- Common misconception addressed: Treating MQTT as request/response rather than publish/subscribe
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | MQTT and publish/subscribe | 120 | 7 |
| M03L02 | Telemetry pipelines and storage | 120 | 7 |

### M04 Operations and security (25% (Mastemy design weight), design weight)

- Worked applications: (1) Plan an over-the-air firmware update that can roll back on failure; (2) Give each device a unique identity and rotate its credentials
- Common misconception addressed: Shipping devices with a single shared default password
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Device provisioning and updates | 120 | 7 |
| M04L02 | IoT security, identity and privacy | 120 | 7 |

## Integrative case

A city wants to monitor air quality with hundreds of solar-powered sensors: choose connectivity and messaging, split processing between edge and cloud, and secure device identity and updates within a tight power budget.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2324-final-protected | 40 | 40 | yes |
| MST-2324-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IoT architecture | 10 |
| Connectivity | 10 |
| Messaging and data | 10 |
| Operations and security | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2324-Q0001** (single-answer, Select ONE) Why is pushing some processing to the edge often preferable to sending all raw data to the cloud?

- A. It reduces bandwidth and latency by filtering and acting on data near the source **(key)**  
  _Rationale:_ Correct: edge processing cuts data volume and response time.
- B. It removes any need for cloud services at all  
  _Rationale:_ Edge processing complements, rather than eliminates, the cloud.
- C. It makes devices consume more power in every case  
  _Rationale:_ Edge processing often saves transmission power, not increases it.
- D. It guarantees perfect security by itself  
  _Rationale:_ Edge processing is not a security guarantee on its own.

**MST-2324-Q0002** (multiple-answer, Select TWO) Which TWO reasons make MQTT well suited to constrained IoT devices? (Select TWO.)

- A. Its lightweight publish/subscribe model decouples senders from receivers **(key)**  
  _Rationale:_ Correct: pub/sub keeps device logic simple and decoupled.
- B. Its small message overhead suits low-bandwidth links **(key)**  
  _Rationale:_ Correct: MQTT's compact framing fits constrained networks.
- C. It requires each device to poll a web server repeatedly  
  _Rationale:_ Polling is not how MQTT works; brokers push to subscribers.
- D. It mandates a permanent high-bandwidth connection  
  _Rationale:_ MQTT is designed for intermittent, low-bandwidth links.

**MST-2324-Q0003** (single-answer, Select ONE) A remote sensor runs on a coin cell and reports a small reading once per hour. Which connectivity option fits best?

- A. LoRaWAN, a low-power wide-area technology for infrequent small messages **(key)**  
  _Rationale:_ Correct: LoRaWAN suits low-power, long-range, low-data-rate reporting.
- B. Continuous Wi-Fi streaming  
  _Rationale:_ Continuous Wi-Fi would drain a coin cell quickly.
- C. A wired Ethernet connection  
  _Rationale:_ A wired link is impractical for a remote battery sensor.
- D. High-throughput 5G video uplink  
  _Rationale:_ A video uplink far exceeds the power and data needs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
