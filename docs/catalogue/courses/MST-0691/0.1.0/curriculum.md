# Azure Security Architecture and Zero Trust

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0691` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). Zero Trust principles, Entra Conditional Access, network and data controls partially verified against official Microsoft Learn security docs; re-verify product specifics at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-ZEROTRUST (https://learn.microsoft.com/security/zero-trust/, accessed 2026-10-02) |
| Legacy IDs | none |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Azure Security Architecture and Zero Trust (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Zero Trust principles and the Microsoft reference architecture
2. Design identity-centric access with Conditional Access and least privilege
3. Secure endpoints and devices as policy enforcement points
4. Protect networks with segmentation and private access
5. Protect data with classification, encryption and access controls
6. Secure applications and workloads in a defence-in-depth model
7. Apply governance, monitoring and continuous verification
8. Build an incident-ready security operations baseline

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Zero Trust principles (MASTEMY-DESIGN 13%, design weight)

- Worked applications: (1) Map 'verify explicitly, least privilege, assume breach' to three controls; (2) Critique a perimeter-only design against Zero Trust
- Common misconception addressed: Believing a firewall perimeter equals Zero Trust
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Zero Trust pillars and the reference architecture | 93 | 6 |
| M01L02 | From perimeter security to continuous verification | 94 | 6 |

### M02 Identity and access (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Design Conditional Access policies for risk-based access; (2) Apply PIM for just-in-time privileged roles
- Common misconception addressed: Treating MFA as sufficient without conditional policy
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Conditional Access and phishing-resistant MFA | 108 | 6 |
| M02L02 | Privileged Identity Management and least privilege | 108 | 6 |

### M03 Endpoints and devices (MASTEMY-DESIGN 12%, design weight)

- Worked applications: (1) Require device compliance as a Conditional Access signal; (2) Plan endpoint posture for unmanaged devices
- Common misconception addressed: Trusting any device that has valid credentials
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Device identity, compliance and management | 86 | 6 |
| M03L02 | Endpoints as policy enforcement points | 87 | 6 |

### M04 Network security (MASTEMY-DESIGN 12%, design weight)

- Worked applications: (1) Micro-segment a workload and remove flat east-west access; (2) Replace VPN-all-access with per-app private access
- Common misconception addressed: Keeping flat networks behind a single VPN
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Segmentation and software-defined perimeters | 86 | 6 |
| M04L02 | Private access and reducing implicit trust | 87 | 6 |

### M05 Data protection (MASTEMY-DESIGN 13%, design weight)

- Worked applications: (1) Classify and label sensitive data and enforce policy; (2) Design encryption at rest, in transit and key management
- Common misconception addressed: Protecting the network but leaving data unclassified
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Data classification, labelling and DLP | 93 | 6 |
| M05L02 | Encryption and key management | 94 | 6 |

### M06 Applications and workloads (MASTEMY-DESIGN 12%, design weight)

- Worked applications: (1) Apply workload identity and secretless access for a service; (2) Add app-level access policies and runtime protection
- Common misconception addressed: Hardcoding credentials in workloads
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Securing applications and APIs | 86 | 6 |
| M06L02 | Workload identity and defence in depth | 87 | 6 |

### M07 Governance and monitoring (MASTEMY-DESIGN 12%, design weight)

- Worked applications: (1) Define policy baselines and drift detection; (2) Design continuous access evaluation and alerting
- Common misconception addressed: Treating a security baseline as static
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Policy, posture management and governance | 86 | 6 |
| M07L02 | Continuous verification and monitoring | 87 | 6 |

### M08 Security operations baseline (MASTEMY-DESIGN 11%, design weight)

- Worked applications: (1) Define an incident response runbook for a credential breach; (2) Map detection coverage to an attack framework
- Common misconception addressed: Assuming prevention removes the need for detection
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Detection, response and recovery readiness | 79 | 6 |
| M08L02 | Measuring and maturing the security program | 79 | 6 |

## Integrative case

A health insurer adopts Zero Trust across a hybrid estate. Design the architecture: Conditional Access with phishing-resistant MFA and PIM, device compliance as an access signal, network micro-segmentation with private access, data classification and encryption, workload identity, and continuous monitoring, then defend the design against a board-level risk review.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0691-final-protected | 40 | 40 | yes |
| MST-0691-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Zero Trust principles | 5 |
| Identity and access | 5 |
| Endpoints and devices | 5 |
| Network security | 5 |
| Data protection | 5 |
| Applications and workloads | 5 |
| Governance and monitoring | 5 |
| Security operations baseline | 5 |

Minimum reviewed item bank: 512 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0691-Q0001** (single-answer, Select ONE) A design places a firewall at the datacentre edge and trusts everything inside. How does Zero Trust assess this?

- A. It violates 'assume breach' and 'verify explicitly'; internal traffic must also be verified and segmented **(key)**  
  _Rationale:_ Correct: Zero Trust removes implicit internal trust.
- B. It fully satisfies Zero Trust because the perimeter is strong  
  _Rationale:_ A strong perimeter alone is not Zero Trust.
- C. Zero Trust only concerns passwords  
  _Rationale:_ Zero Trust spans identity, device, network, data and apps.
- D. Internal traffic never needs inspection  
  _Rationale:_ Assume-breach requires internal verification.

**MST-0691-Q0002** (multiple-answer, Select TWO) Which TWO strengthen identity verification under Zero Trust? (Select TWO.)

- A. Phishing-resistant MFA (for example FIDO2 or certificate-based) **(key)**  
  _Rationale:_ Correct: phishing-resistant MFA raises assurance.
- B. Risk-based Conditional Access that factors device and sign-in risk **(key)**  
  _Rationale:_ Correct: conditional, risk-aware policy verifies explicitly.
- C. Allowing legacy protocols that bypass MFA  
  _Rationale:_ Legacy protocols undermine MFA.
- D. Permanent global admin for all IT staff  
  _Rationale:_ Standing privilege violates least privilege.

**MST-0691-Q0003** (single-answer, Select ONE) A workload needs to call a database and a storage account without storing any secret. What is the Zero Trust-aligned choice?

- A. Managed/workload identity issuing short-lived tokens **(key)**  
  _Rationale:_ Correct: secretless identity-based access verifies explicitly and limits exposure.
- B. A shared static connection string in config  
  _Rationale:_ Static secrets are a breach liability.
- C. Embedding credentials in the build image  
  _Rationale:_ Embedded secrets leak.
- D. Disabling authentication inside the trusted network  
  _Rationale:_ Internal trust is exactly what Zero Trust removes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
