# Cloud Security Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1670` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-CSF-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Cloud Security Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain the shared-responsibility model across cloud service types
2. Apply identity and access management in the cloud
3. Secure cloud data, storage and networking
4. Identify common cloud misconfigurations and how to prevent them
5. Use logging, monitoring and posture tools in the cloud

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Cloud security foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide who secures what for a PaaS database; (2) List the top risks for a new cloud deployment
- Common misconception addressed: Assuming the cloud provider secures everything for you
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shared responsibility across IaaS, PaaS and SaaS | 72 | 6 |
| M01L02 | Cloud threat landscape | 72 | 6 |

### M02 Identity and access (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Replace a broad role with a least-privilege one; (2) Decide how to store an application secret safely
- Common misconception addressed: Using long-lived root or admin keys for everyday tasks
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cloud IAM, roles and least privilege | 72 | 6 |
| M02L02 | Federation, keys and secrets | 72 | 6 |

### M03 Data and storage (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Lock down a publicly readable storage bucket; (2) Choose encryption settings for sensitive data
- Common misconception addressed: Believing default settings are always the secure settings
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Encryption at rest and in transit | 72 | 6 |
| M03L02 | Securing object storage and databases | 72 | 6 |

### M04 Cloud networking (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a security-group rule allowing only needed traffic; (2) Decide when to use private endpoints
- Common misconception addressed: Opening a service to the whole internet for convenience
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Virtual networks and security groups | 72 | 6 |
| M04L02 | Segmentation and private connectivity | 72 | 6 |

### M05 Monitoring and posture (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Enable logging that would reveal credential misuse; (2) Use a guardrail to prevent public buckets
- Common misconception addressed: Turning off logging because it incurs cost
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cloud logging and alerting | 72 | 6 |
| M05L02 | Posture management and guardrails | 72 | 6 |

## Integrative case

A team has deployed applications to a public cloud with broad permissions and a publicly readable storage bucket. Clarify who is responsible for what, tighten identity and access, lock down the exposed storage, segment the network, and enable logging that would reveal misuse.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1670-final-protected | 25 | 25 | yes |
| MST-1670-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cloud security foundations | 5 |
| Identity and access | 5 |
| Data and storage | 5 |
| Cloud networking | 5 |
| Monitoring and posture | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1670-Q0001** (single-answer, Select ONE) Under the shared-responsibility model for IaaS, who is responsible for patching the guest operating system?

- A. The customer **(key)**  
  _Rationale:_ Correct: in IaaS the customer manages the OS and above.
- B. The cloud provider  
  _Rationale:_ The provider secures the underlying infrastructure, not the guest OS in IaaS.
- C. No one, it patches itself  
  _Rationale:_ OS patching is a managed responsibility, not automatic here.
- D. The end users of the application  
  _Rationale:_ End users do not patch the server OS.

**MST-1670-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce cloud identity risk? (Select TWO.)

- A. Granting least-privilege roles instead of broad admin **(key)**  
  _Rationale:_ Correct: least privilege limits the blast radius of a compromise.
- B. Using short-lived credentials or a secrets manager **(key)**  
  _Rationale:_ Correct: short-lived secrets reduce the value of stolen keys.
- C. Sharing one root key across the whole team  
  _Rationale:_ A shared root key removes accountability and widens risk.
- D. Embedding long-lived keys in public code  
  _Rationale:_ Hard-coded keys in public code are frequently stolen.

**MST-1670-Q0003** (single-answer, Select ONE) A storage bucket holding customer files is world-readable. What is the best remediation?

- A. Restrict access to only the identities that require it and audit the exposure **(key)**  
  _Rationale:_ Correct: least-privilege access plus reviewing who accessed it addresses the exposure.
- B. Rename the bucket and leave it public  
  _Rationale:_ Renaming does not remove public access.
- C. Delete the logging so the issue is not recorded  
  _Rationale:_ Removing logs hides evidence and worsens posture.
- D. Make every other bucket public too for consistency  
  _Rationale:_ This spreads the exposure instead of fixing it.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
