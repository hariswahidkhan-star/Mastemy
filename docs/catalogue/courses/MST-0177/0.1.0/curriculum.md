# Microsoft SC-100: Cybersecurity Architect Expert Exam Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0177` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | SC-100 |
| Version basis | Skills measured as of 2026-10-21 |
| Evidence | **verified-official-source** - source: SRC-MS-SC100 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/sc-100) |
| Legacy IDs | MST-MIC-MS-SC100-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design security strategy and resiliency solutions aligned to Microsoft best-practice frameworks and Zero Trust
2. Design security-operations, identity, privileged-access and compliance capabilities
3. Design security-posture, endpoint and workload solutions for hybrid and multicloud infrastructure
4. Design security solutions for Microsoft 365, applications and organizational data

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Design solutions that align with security best practices and priorities (20-25%)

- Worked applications: (1) Apply the key concepts of 'Design solutions that align with security best practices and priorities' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design solutions that align with security best practices and priorities'
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Design a resiliency strategy for ransomware and other attacks | 192 | 6 |
| M01L02 | Design solutions that align with MCRA and MCSB | 192 | 6 |
| M01L03 | Design solutions that align with CAF and WAF | 192 | 6 |
| M01L04 | Design solutions that align with the Zero Trust adoption framework | 192 | 6 |

### M02 Design security operations, identity, and compliance capabilities (25-30%)

- Worked applications: (1) Apply the key concepts of 'Design security operations, identity, and compliance capabilities' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design security operations, identity, and compliance capabilities'
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Design solutions for security operations | 192 | 6 |
| M02L02 | Design solutions for identity and access management | 192 | 6 |
| M02L03 | Design solutions for securing privileged access | 192 | 6 |
| M02L04 | Design solutions for regulatory compliance | 192 | 6 |

### M03 Design security solutions for infrastructure (25-30%)

- Worked applications: (1) Apply the key concepts of 'Design security solutions for infrastructure' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design security solutions for infrastructure'
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Design solutions for security posture management in hybrid and multicloud environments | 192 | 6 |
| M03L02 | Specify requirements for securing server and client endpoints | 192 | 6 |
| M03L03 | Specify requirements for securing SaaS, PaaS, and IaaS | 192 | 6 |
| M03L04 | Evaluate solutions for network security and Security Service Edge (SSE) | 192 | 6 |

### M04 Design security solutions for applications and data (20-25%)

- Worked applications: (1) Apply the key concepts of 'Design security solutions for applications and data' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Design security solutions for applications and data'
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Evaluate solutions for securing Microsoft 365 | 192 | 6 |
| M04L02 | Design solutions for securing applications | 192 | 6 |
| M04L03 | Design solutions for securing an organization's data | 192 | 6 |

## Integrative case

A multinational adopts a Zero Trust strategy after a ransomware scare: design a BCDR and resiliency plan, a SIEM/XDR and SOAR operations model, a privileged-access and Conditional Access design, and data and application protection with Microsoft Purview and Defender, then justify each choice against the MCRA and MCSB.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0177-practice-form-A | 108 | 108 | yes |
| MST-0177-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0177-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0177-final-protected | 108 | 108 | yes |

| Domain | Items per form |
|---|---|
| Design solutions that align with security best practices and priorities | 27 |
| Design security operations, identity, and compliance capabilities | 27 |
| Design security solutions for infrastructure | 27 |
| Design security solutions for applications and data | 27 |

Minimum reviewed item bank: 1116 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0177-Q0001** (single-answer, Select ONE) An architect designs a detection-and-response capability that unifies endpoint, identity, email and cloud-app signals with a SIEM for long-term correlation. Which combination best fits?

- A. Microsoft Defender XDR with Microsoft Sentinel **(key)**  
  _Rationale:_ Correct: Defender XDR unifies endpoint, identity, email and cloud-app signals, and Sentinel adds cloud-native SIEM correlation and SOAR.
- B. Only Microsoft Defender for Endpoint  
  _Rationale:_ Defender for Endpoint covers endpoints alone and is not a full XDR-plus-SIEM solution.
- C. Azure Policy with resource locks  
  _Rationale:_ These are governance controls, not a detection-and-response capability.
- D. Microsoft Entra ID P1 licensing alone  
  _Rationale:_ Licensing enables identity features but is not a detection-and-response design.

**MST-0177-Q0002** (single-answer, Select ONE) To translate regulatory requirements into enforced controls and demonstrate compliance, which Microsoft solution should the design centre on?

- A. Microsoft Purview with Azure Policy and Defender for Cloud regulatory compliance **(key)**  
  _Rationale:_ Correct: Purview, Azure Policy and Defender for Cloud together translate, enforce and evidence regulatory controls.
- B. Microsoft Entra Internet Access only  
  _Rationale:_ Entra Internet Access is a secure web gateway, not a compliance-control framework.
- C. Azure Load Balancer  
  _Rationale:_ A load balancer distributes traffic and has no compliance role.
- D. Windows LAPS  
  _Rationale:_ LAPS manages local administrator passwords; it does not translate regulatory requirements into controls.

**MST-0177-Q0003** (multiple-answer, Select TWO) Select TWO frameworks that the SC-100 design guidance expects an architect to align security solutions with. (Select TWO.)

- A. Microsoft Cloud Adoption Framework for Azure (CAF) **(key)**  
  _Rationale:_ Correct: the study guide requires designs to align with the Cloud Adoption Framework.
- B. Azure Well-Architected Framework (WAF) **(key)**  
  _Rationale:_ Correct: the study guide requires designs to align with the Well-Architected Framework.
- C. ITIL v2 service desk model  
  _Rationale:_ ITIL v2 is a legacy service-management framework and is not part of the SC-100 objectives.
- D. COBIT maturity scale only  
  _Rationale:_ COBIT is not the framework the SC-100 guidance centres design alignment on.
- E. The OSI seven-layer model  
  _Rationale:_ The OSI model is a networking reference model, not a security-design framework in this guidance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
