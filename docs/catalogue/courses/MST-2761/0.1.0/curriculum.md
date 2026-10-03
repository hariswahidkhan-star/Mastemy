# Internet of Things & Edge AI

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2761` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Internet of Things & Edge AI (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain IoT architecture from devices through connectivity to the cloud
2. Describe sensors, microcontrollers and constrained devices
3. Reason about connectivity options and their trade-offs
4. Explain edge computing and why some AI runs on the device
5. Describe model optimisation for edge deployment conceptually
6. Identify security, privacy and reliability concerns for IoT and edge AI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 IoT architecture (20% (design weight), design weight)

- Worked applications: (1) Draw the device-gateway-cloud path for a sensor; (2) Choose a data flow for telemetry
- Common misconception addressed: Assuming every device must talk directly to the cloud
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Devices to cloud overview | 64 | 4 |
| M01L02 | Gateways and protocols | 64 | 4 |
| M01L03 | Data flow patterns | 64 | 4 |

### M02 Devices and sensors (22% (design weight), design weight)

- Worked applications: (1) Pick a sensor and microcontroller within a power budget; (2) Estimate battery life for a sleepy sensor
- Common misconception addressed: Ignoring power constraints when choosing components
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Sensors and signals | 70 | 4 |
| M02L02 | Microcontrollers and constraints | 70 | 4 |
| M02L03 | Power and lifetime | 71 | 4 |

### M03 Connectivity (20% (design weight), design weight)

- Worked applications: (1) Choose a connectivity option for a remote sensor; (2) Trade bandwidth against battery life
- Common misconception addressed: Assuming Wi-Fi is always the right choice
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Short versus long range | 64 | 4 |
| M03L02 | Bandwidth versus power trade-offs | 64 | 4 |
| M03L03 | Choosing a protocol | 64 | 4 |

### M04 Edge AI (20% (design weight), design weight)

- Worked applications: (1) Decide which inference runs on-device versus cloud; (2) Apply quantisation to shrink a model conceptually
- Common misconception addressed: Believing edge AI needs no connectivity or updates
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Why run AI at the edge | 64 | 4 |
| M04L02 | Model optimisation for devices | 64 | 4 |
| M04L03 | Edge versus cloud split | 64 | 4 |

### M05 Security and reliability (18% (design weight), design weight)

- Worked applications: (1) Identify an insecure default on an IoT device; (2) Plan a safe over-the-air update strategy
- Common misconception addressed: Shipping devices with no update or security plan
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | IoT security basics | 57 | 4 |
| M05L02 | Privacy of device data | 57 | 4 |
| M05L03 | Reliability and updates | 59 | 4 |

## Integrative case

A startup builds a fleet of battery-powered field sensors with on-device anomaly detection: design the device-to-cloud architecture, choose connectivity within a power budget, decide what AI runs at the edge, and address security, privacy and update reliability.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2761-final-protected | 40 | 40 | yes |
| MST-2761-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IoT architecture | 8 |
| Devices and sensors | 9 |
| Connectivity | 8 |
| Edge AI | 8 |
| Security and reliability | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2761-Q0001** (single-answer, Select ONE) A battery sensor in a remote field must last two years and send small readings hourly. Which connectivity choice fits best?

- A. A low-power wide-area protocol designed for small, infrequent messages **(key)**  
  _Rationale:_ Correct: LPWAN-style connectivity trades bandwidth for long range and very low power.
- B. Continuous high-bandwidth video streaming over Wi-Fi  
  _Rationale:_ High-bandwidth streaming drains batteries and exceeds the need.
- C. A wired Ethernet connection to each field sensor  
  _Rationale:_ Wiring remote field sensors is impractical and unnecessary for small readings.
- D. Keeping the radio powered on at full strength at all times  
  _Rationale:_ Always-on full-power radio defeats the two-year battery goal.

**MST-2761-Q0002** (multiple-answer, Select TWO) Which TWO are genuine reasons to run AI inference at the edge rather than in the cloud? (Select TWO.)

- A. Lower latency because data need not round-trip to the cloud **(key)**  
  _Rationale:_ Correct: on-device inference avoids network round-trips, reducing latency.
- B. Reduced bandwidth and better privacy by processing data locally **(key)**  
  _Rationale:_ Correct: processing locally cuts data sent and can keep sensitive data on-device.
- C. Edge devices have unlimited compute and memory  
  _Rationale:_ Edge devices are constrained; that is a challenge, not a reason.
- D. Edge AI removes any need for security  
  _Rationale:_ Edge AI still requires security; it does not remove the need.

**MST-2761-Q0003** (single-answer, Select ONE) Why is model optimisation (e.g. quantisation or pruning) often required before deploying AI to edge devices?

- A. Edge devices have limited compute, memory and power, so models must be made smaller and cheaper to run **(key)**  
  _Rationale:_ Correct: constrained hardware forces smaller, more efficient models.
- B. Because optimisation always improves accuracy  
  _Rationale:_ Optimisation trades some accuracy for efficiency; it does not always improve accuracy.
- C. Because edge devices cannot run any model without the cloud  
  _Rationale:_ The point of edge AI is on-device inference without the cloud.
- D. Because larger models always transfer faster over networks  
  _Rationale:_ Larger models are harder, not easier, to deploy on constrained devices.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
