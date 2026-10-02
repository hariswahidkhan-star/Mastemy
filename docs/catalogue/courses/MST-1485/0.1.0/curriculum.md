# AWS Security Services Overview

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1485` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-SEC (https://docs.aws.amazon.com/security/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — AWS Security Services Overview (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the AWS shared responsibility model
2. Use IAM for identities, roles and least-privilege policies
3. Detect threats with GuardDuty, Security Hub and Inspector
4. Protect data and secrets with KMS, Secrets Manager and Macie
5. Protect the network and edge with WAF, Shield and firewalls
6. Audit and respond with CloudTrail, Config and incident practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Shared responsibility and identity (MASTEMY-DESIGN 16%)

- Worked applications: (1) Separate customer vs AWS duties for a managed service; (2) Explain where responsibility shifts between IaaS and SaaS-like services
- Common misconception addressed: Assuming AWS secures the customer's data and configuration
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The shared responsibility model | 48 | 5 |
| M01L02 | Security of vs in the cloud | 48 | 5 |

### M02 IAM and access (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a least-privilege IAM policy for a role; (2) Replace long-lived keys with roles and temporary credentials
- Common misconception addressed: Attaching broad wildcard permissions for convenience
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Users, roles and policies | 48 | 5 |
| M02L02 | Least privilege and temporary credentials | 48 | 5 |

### M03 Threat detection (MASTEMY-DESIGN 17%)

- Worked applications: (1) Enable GuardDuty and triage a finding; (2) Aggregate findings centrally with Security Hub
- Common misconception addressed: Turning on detection but never reviewing the findings
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | GuardDuty and Inspector | 48 | 5 |
| M03L02 | Security Hub and aggregation | 48 | 5 |

### M04 Data and secret protection (MASTEMY-DESIGN 17%)

- Worked applications: (1) Encrypt data with KMS keys and key policies; (2) Store and rotate a database credential in Secrets Manager
- Common misconception addressed: Hardcoding secrets in code instead of using Secrets Manager
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | KMS and encryption | 48 | 5 |
| M04L02 | Secrets Manager and Macie | 48 | 5 |

### M05 Network and edge protection (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add AWS WAF rules to a public application; (2) Explain how Shield mitigates DDoS at the edge
- Common misconception addressed: Relying only on security groups for application-layer attacks
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | WAF and Shield | 48 | 5 |
| M05L02 | Network firewall and edge controls | 48 | 5 |

### M06 Audit and response (MASTEMY-DESIGN 17%)

- Worked applications: (1) Use CloudTrail to trace who changed a resource; (2) Detect configuration drift with AWS Config rules
- Common misconception addressed: Treating CloudTrail logs as optional for investigations
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | CloudTrail and Config | 48 | 5 |
| M06L02 | Incident response and automation | 48 | 5 |

## Integrative case

A regulated company hardens its AWS account: clarify the shared responsibility model, tighten IAM to least privilege, turn on detection services, protect data and secrets, add edge protection for a public app, and ensure auditing and an incident-response path are in place.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1485-final-protected | 30 | 30 | yes |
| MST-1485-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Shared responsibility and identity | 5 |
| IAM and access | 5 |
| Threat detection | 5 |
| Data and secret protection | 5 |
| Network and edge protection | 5 |
| Audit and response | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1485-Q0001** (single-answer, Select ONE) Under the AWS shared responsibility model, who is responsible for configuring IAM permissions and securing customer data?

- A. The customer **(key)**  
  _Rationale:_ Correct: the customer is responsible for security in the cloud, including IAM and data.
- B. AWS alone  
  _Rationale:_ AWS secures the infrastructure, not the customer's configurations.
- C. Neither party  
  _Rationale:_ Responsibility is shared, not absent.
- D. A third-party auditor  
  _Rationale:_ Auditors assess but do not own the configuration responsibility.

**MST-1485-Q0002** (multiple-answer, Select TWO) Which TWO are threat-detection services in AWS? (Select TWO.)

- A. Amazon GuardDuty **(key)**  
  _Rationale:_ Correct: GuardDuty detects malicious or anomalous activity.
- B. AWS Security Hub **(key)**  
  _Rationale:_ Correct: Security Hub aggregates and prioritizes security findings.
- C. Amazon S3 Glacier  
  _Rationale:_ Glacier is archival storage, not threat detection.
- D. AWS Lambda  
  _Rationale:_ Lambda runs code; it is not a detection service by itself.

**MST-1485-Q0003** (single-answer, Select ONE) A database password is currently hardcoded in application code. What is the recommended fix?

- A. Store it in AWS Secrets Manager and retrieve it at runtime with rotation **(key)**  
  _Rationale:_ Correct: Secrets Manager stores and rotates secrets instead of hardcoding.
- B. Commit it to a private repository  
  _Rationale:_ A repo, even private, is not a secure secret store.
- C. Email it to the operations team  
  _Rationale:_ Emailing secrets spreads exposure.
- D. Leave it in code but add a comment  
  _Rationale:_ A comment does nothing to secure the secret.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
