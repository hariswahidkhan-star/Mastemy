# AWS IoT Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1501` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS IoT Fundamentals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain AWS IoT Core architecture and device connectivity
2. Connect devices securely with certificates and policies
3. Route messages with the IoT rules engine
4. Manage device state with shadows and fleet tools

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 IoT foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Trace a message from device to cloud; (2) Choose MQTT topics for a fleet
- Common misconception addressed: Thinking devices talk directly to databases rather than through the broker
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | AWS IoT Core architecture | 72 | 7 |
| M01L02 | MQTT and the message broker | 72 | 7 |

### M02 Secure device connectivity (MASTEMY-DESIGN 25%)

- Worked applications: (1) Provision a certificate for a device; (2) Write an IoT policy scoping topics
- Common misconception addressed: Sharing one certificate across the whole fleet
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Device certificates and authentication | 72 | 7 |
| M02L02 | IoT policies and least privilege | 72 | 7 |

### M03 Message routing (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a rule filtering high temperatures; (2) Route matching messages to a data store
- Common misconception addressed: Believing every message must be processed by a Lambda
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The IoT rules engine | 72 | 7 |
| M03L02 | Routing to AWS services | 72 | 7 |

### M04 Device management (MASTEMY-DESIGN 25%)

- Worked applications: (1) Use a shadow for desired vs reported state; (2) Monitor fleet connectivity
- Common misconception addressed: Confusing the device shadow with real-time device connectivity
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Device shadows | 72 | 7 |
| M04L02 | Fleet provisioning and monitoring | 72 | 7 |

## Integrative case

A company deploys 500 temperature sensors. Connect them to AWS IoT Core with per-device certificates, route readings via the rules engine to storage and alerts, and use device shadows to track desired vs reported state.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1501-final-protected | 28 | 35 | yes |
| MST-1501-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IoT foundations | 7 |
| Secure device connectivity | 7 |
| Message routing | 7 |
| Device management | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1501-Q0001** (single-answer, Select ONE) Which protocol is commonly used for lightweight device messaging with AWS IoT Core?

- A. MQTT **(key)**  
  _Rationale:_ Correct: MQTT is a lightweight pub/sub protocol used by IoT devices.
- B. SMTP  
  _Rationale:_ SMTP is for email, not device telemetry.
- C. SNMP only  
  _Rationale:_ SNMP is network management, not the IoT Core device protocol.
- D. FTP  
  _Rationale:_ FTP is file transfer, not IoT messaging.

**MST-1501-Q0002** (multiple-answer, Select TWO) Which TWO practices secure device connections at scale? (Select TWO.)

- A. Issue a unique certificate per device **(key)**  
  _Rationale:_ Correct: per-device certs limit blast radius if one is compromised.
- B. Attach least-privilege IoT policies scoping allowed topics **(key)**  
  _Rationale:_ Correct: scoped policies restrict what a device can do.
- C. Reuse one certificate for all devices  
  _Rationale:_ A shared cert is a security risk.
- D. Allow every device to publish to every topic  
  _Rationale:_ Over-broad topic access violates least privilege.

**MST-1501-Q0003** (single-answer, Select ONE) What does a device shadow store?

- A. The desired and reported state of a device, persisted in the cloud **(key)**  
  _Rationale:_ Correct: shadows hold state so apps can read/set it even when the device is offline.
- B. The device's firmware binary  
  _Rationale:_ Shadows store state, not firmware images.
- C. The MQTT broker logs  
  _Rationale:_ That is logging, not the shadow.
- D. The billing data  
  _Rationale:_ Shadows do not store billing information.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
