# AWS Landing Zones and Multi-Account Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0752` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on AWS Organizations, Control Tower and multi-account governance product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-LANDINGZONE (https://docs.aws.amazon.com/organizations/; https://docs.aws.amazon.com/controltower/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AWS Landing Zones and Multi-Account Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the multi-account strategy and landing-zone concept
2. Structure an organization with organizational units and accounts
3. Apply service control policies and guardrails
4. Centralise identity and access across accounts
5. Centralise logging, audit and security tooling
6. Govern cost, provisioning and ongoing operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Multi-account strategy (MASTEMY-DESIGN 16%)

- Worked applications: (1) Decide which workloads get separate accounts; (2) Map a landing zone's core accounts
- Common misconception addressed: Putting every workload in one account for simplicity
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why multiple accounts | 80 | 5 |
| M01L02 | Landing-zone building blocks | 80 | 5 |

### M02 Organization structure (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design an OU tree for prod, non-prod and security; (2) Define a baseline for new accounts
- Common misconception addressed: Treating an OU as a network or billing boundary
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Organizations and OUs | 80 | 5 |
| M02L02 | Account vending and baselines | 80 | 5 |

### M03 Guardrails and SCPs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write an SCP that blocks disabling CloudTrail; (2) Choose preventive vs detective for a rule
- Common misconception addressed: Expecting an SCP to grant permissions rather than limit them
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Service control policies | 80 | 5 |
| M03L02 | Preventive vs detective guardrails | 80 | 5 |

### M04 Identity across accounts (MASTEMY-DESIGN 17%)

- Worked applications: (1) Federate identity to a central store; (2) Assume a cross-account role for admin access
- Common misconception addressed: Creating long-lived IAM users in every account
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Centralised identity and SSO | 80 | 5 |
| M04L02 | Cross-account roles | 80 | 5 |

### M05 Centralised logging and audit (MASTEMY-DESIGN 17%)

- Worked applications: (1) Send CloudTrail and config logs to an audit account; (2) Aggregate security findings centrally
- Common misconception addressed: Letting each account keep its own logs with no central copy
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Aggregating logs | 80 | 5 |
| M05L02 | Security tooling and findings | 80 | 5 |

### M06 Cost and operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set budgets and cost allocation tags; (2) Detect and remediate configuration drift
- Common misconception addressed: Assuming consolidated billing removes per-account accountability
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Consolidated billing and budgets | 80 | 5 |
| M06L02 | Provisioning and drift control | 80 | 5 |

## Integrative case

Design a landing zone for a growing company: lay out an OU and account structure, apply service control policy guardrails, federate identity centrally, aggregate logs and security findings into an audit account, and add cost and provisioning controls, then justify each boundary to the security team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0752-final-protected | 40 | 50 | yes |
| MST-0752-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Multi-account strategy | 7 |
| Organization structure | 7 |
| Guardrails and SCPs | 7 |
| Identity across accounts | 7 |
| Centralised logging and audit | 6 |
| Cost and operations | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0752-Q0001** (single-answer, Select ONE) A service control policy (SCP) in AWS Organizations is used to:

- A. Set the maximum permissions available in member accounts **(key)**  
  _Rationale:_ Correct: SCPs set permission boundaries; they restrict, never grant, access.
- B. Grant users new permissions directly  
  _Rationale:_ SCPs cannot grant access; identity policies do that within SCP limits.
- C. Create network routes between accounts  
  _Rationale:_ SCPs are about permissions, not networking.
- D. Store centralised audit logs  
  _Rationale:_ Logging is handled by CloudTrail and log aggregation, not SCPs.

**MST-0752-Q0002** (single-answer, Select ONE) Where should an organization centralise CloudTrail and config logs in a landing zone?

- A. A dedicated log-archive/audit account **(key)**  
  _Rationale:_ Correct: a separate audit account isolates and protects centralised logs.
- B. Each workload account only  
  _Rationale:_ Per-account-only logging has no tamper-resistant central copy.
- C. A public S3 bucket  
  _Rationale:_ Public exposure of audit logs is a serious security risk.
- D. A developer's personal account  
  _Rationale:_ Audit logs must not live in an unmanaged personal account.

**MST-0752-Q0003** (multiple-answer, Select TWO) Which TWO are valid reasons to use multiple AWS accounts? (Select TWO.)

- A. Strong blast-radius and security isolation **(key)**  
  _Rationale:_ Correct: separate accounts limit the blast radius of mistakes and breaches.
- B. Clear cost separation by team or environment **(key)**  
  _Rationale:_ Correct: account boundaries make cost attribution clean.
- C. To avoid ever using IAM  
  _Rationale:_ Multiple accounts still require IAM for access control.
- D. Because one account cannot run more than one service  
  _Rationale:_ A single account can run many services; that is not the reason.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
