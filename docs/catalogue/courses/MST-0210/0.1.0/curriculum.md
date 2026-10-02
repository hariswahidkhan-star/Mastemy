# AWS Certified Security — Specialty

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0210` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | AWS (no affiliation or endorsement) |
| Exam code | not verified; design assumption: AWS Certified Security - Specialty - unverified |
| Version basis | design assumption - official outline not verified (issuer page egress-blocked) |
| Evidence | **unverified-needs-official-check** - sources: ; official page not fetched |
| Legacy IDs | MST-AWS-AWS-SCS-001 |
| Planned time | T = 3600 min; instruction I = 2880 min (80%); assessment A = 720 min (20%) |
| Assessment split | lesson checks 180 / module checks 252 / cumulative 288 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe AWS security concepts, the shared responsibility model and the security services landscape
2. Apply identity, access management and network protection on AWS
3. Evaluate data protection, encryption and key management
4. Analyse threat detection, logging, incident response and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Identity, access and the responsibility model (design-assumption weight; official weights not verified)

- Worked applications: (1) Design least-privilege roles for three workloads; (2) Diagnose an over-permissive policy and tighten it
- Common misconception addressed: Believing AWS secures the customer's data configuration under the shared responsibility model
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shared responsibility and security principles | 320 | 6 |
| M01L02 | Identity and access management | 320 | 6 |
| M01L03 | Permissions, policies and least privilege | 320 | 6 |

### M02 Network and data protection (design-assumption weight; official weights not verified)

- Worked applications: (1) Design network segmentation for a tiered app; (2) Choose encryption and key-management options for data at rest and in transit
- Common misconception addressed: Assuming data in a cloud storage bucket is private by default regardless of configuration
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Network security and segmentation | 320 | 6 |
| M02L02 | Encryption in transit and at rest | 320 | 6 |
| M02L03 | Key management and secrets | 320 | 6 |

### M03 Detection, response and governance (design-assumption weight; official weights not verified)

- Worked applications: (1) Design a detection-and-alert flow for suspicious API activity; (2) Plan an incident-response runbook for compromised credentials
- Common misconception addressed: Treating logging as complete security without detection and response
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Logging, monitoring and threat detection | 320 | 6 |
| M03L02 | Incident response on AWS | 320 | 6 |
| M03L03 | Governance, audit and compliance | 320 | 6 |

## Integrative case

You secure a regulated AWS workload end to end: design identity and access, protect data with encryption and key management, set up detection and incident response, and prove compliance to an auditor.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified (issuer page egress-blocked); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0210-practice-form-A | 108 | 108 | yes |
| MST-0210-practice-form-B | 108 | 108 | no (optional practice) |
| MST-0210-practice-form-C | 108 | 108 | no (optional practice) |
| MST-0210-final-protected | 108 | 108 | yes |

| Domain | Items per form |
|---|---|
| Identity, access and the responsibility model | 36 |
| Network and data protection | 36 |
| Detection, response and governance | 36 |

Minimum reviewed item bank: 1044 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0210-Q0001** (single-answer, Select ONE) Under the AWS shared responsibility model, which task is the CUSTOMER's responsibility?

- A. Configuring access controls and encryption for their data and resources **(key)**  
  _Rationale:_ Correct: customers are responsible for security in the cloud, including their access configuration and data protection.
- B. Physically securing the AWS data centres  
  _Rationale:_ Physical security of the infrastructure is AWS's responsibility.
- C. Patching the hypervisor of managed hardware  
  _Rationale:_ The underlying hypervisor is AWS's responsibility.
- D. Maintaining the global network backbone  
  _Rationale:_ The backbone is AWS's responsibility.

**MST-0210-Q0002** (single-answer, Select ONE) An engineer wants to grant a workload only the permissions it needs. Which principle and practice should guide the policy?

- A. Least privilege: grant only the specific actions and resources required **(key)**  
  _Rationale:_ Correct: least privilege grants only necessary actions on specific resources.
- B. Grant full administrator access to avoid future tickets  
  _Rationale:_ Broad access violates least privilege and increases risk.
- C. Use a shared root credential for all workloads  
  _Rationale:_ Shared root use is a serious security anti-pattern.
- D. Allow all actions but log them  
  _Rationale:_ Logging does not substitute for restricting permissions.

**MST-0210-Q0003** (multiple-answer, Select TWO) Suspicious API calls suggest possible credential compromise. Which TWO immediate response actions are appropriate? (Select TWO)

- A. Revoke or rotate the potentially compromised credentials **(key)**  
  _Rationale:_ Correct: revoking/rotating compromised credentials contains the incident.
- B. Preserve logs and investigate the scope of access used **(key)**  
  _Rationale:_ Correct: preserving logs and scoping access supports a sound investigation.
- C. Delete all logs to reduce noise  
  _Rationale:_ Destroying logs cripples investigation and may violate policy.
- D. Ignore it unless a customer complains  
  _Rationale:_ Ignoring a suspected compromise is unsafe.
- E. Widen the credential's permissions to keep services running  
  _Rationale:_ Expanding a suspect credential's access worsens exposure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
