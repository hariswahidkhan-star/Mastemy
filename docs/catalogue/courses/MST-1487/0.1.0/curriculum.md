# AWS Organizations and Control Tower

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1487` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-ORG (https://docs.aws.amazon.com/organizations/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — AWS Organizations and Control Tower (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain multi-account strategy and why it matters
2. Structure accounts with Organizations and organizational units
3. Apply service control policies for guardrails
4. Set up a landing zone with AWS Control Tower
5. Centralize identity, logging and billing across accounts
6. Govern, detect drift and manage account lifecycle

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Multi-account strategy (MASTEMY-DESIGN 16%)

- Worked applications: (1) Justify separating workloads into multiple accounts; (2) Map teams and environments to accounts and OUs
- Common misconception addressed: Running all workloads in one account for simplicity
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why multiple accounts | 48 | 5 |
| M01L02 | Account and OU design patterns | 48 | 5 |

### M02 Organizations structure (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create an organization and move accounts into OUs; (2) Enable consolidated billing across the organization
- Common misconception addressed: Confusing an OU with an IAM group
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Organizations, the management account and OUs | 48 | 5 |
| M02L02 | Consolidated billing and account creation | 48 | 5 |

### M03 Service control policies (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write an SCP that denies disabling CloudTrail; (2) Explain that SCPs set the permission ceiling, not grants
- Common misconception addressed: Expecting an SCP to grant permissions rather than limit them
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | What SCPs do and do not do | 48 | 5 |
| M03L02 | Writing and attaching SCPs | 48 | 5 |

### M04 Control Tower landing zone (MASTEMY-DESIGN 17%)

- Worked applications: (1) Set up a landing zone and enroll an account; (2) Apply mandatory and strongly-recommended guardrails
- Common misconception addressed: Editing landing-zone resources manually outside Control Tower
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Landing zone concepts | 48 | 5 |
| M04L02 | Guardrails and account factory | 48 | 5 |

### M05 Centralized identity and logging (MASTEMY-DESIGN 17%)

- Worked applications: (1) Centralize access with IAM Identity Center; (2) Aggregate CloudTrail and Config logs to a log-archive account
- Common misconception addressed: Creating separate IAM users in every account
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | IAM Identity Center and federation | 48 | 5 |
| M05L02 | Centralized logging and audit accounts | 48 | 5 |

### M06 Governance and lifecycle (MASTEMY-DESIGN 17%)

- Worked applications: (1) Detect drift against Control Tower guardrails; (2) Offboard an account and clean up its resources
- Common misconception addressed: Leaving unused accounts open with no governance
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Drift detection and compliance | 48 | 5 |
| M06L02 | Account lifecycle and offboarding | 48 | 5 |

## Integrative case

A growing company moves from one account to a governed multi-account setup: design an OU structure, apply service control policies as guardrails, stand up a Control Tower landing zone, centralize logging and identity, and set up consolidated billing with cost visibility per account.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1487-final-protected | 30 | 30 | yes |
| MST-1487-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Multi-account strategy | 5 |
| Organizations structure | 5 |
| Service control policies | 5 |
| Control Tower landing zone | 5 |
| Centralized identity and logging | 5 |
| Governance and lifecycle | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1487-Q0001** (single-answer, Select ONE) What does a service control policy (SCP) do in AWS Organizations?

- A. Sets the maximum permissions (a guardrail) for accounts, without granting access **(key)**  
  _Rationale:_ Correct: SCPs define the permission ceiling; IAM still grants actual access.
- B. Grants IAM permissions directly to users  
  _Rationale:_ SCPs limit permissions; they do not grant them.
- C. Replaces the need for IAM policies  
  _Rationale:_ IAM policies are still required to grant access within the SCP ceiling.
- D. Controls billing allocation between accounts  
  _Rationale:_ SCPs govern permissions, not billing allocation.

**MST-1487-Q0002** (multiple-answer, Select TWO) Which TWO are benefits of a governed multi-account setup with Control Tower? (Select TWO.)

- A. Centralized logging to a dedicated log-archive account **(key)**  
  _Rationale:_ Correct: Control Tower centralizes audit logs for the organization.
- B. Consistent guardrails applied across enrolled accounts **(key)**  
  _Rationale:_ Correct: guardrails enforce baseline governance across accounts.
- C. A single shared root user for all teams  
  _Rationale:_ Sharing a root user is an anti-pattern, not a benefit.
- D. Eliminating the need for any IAM controls  
  _Rationale:_ IAM is still required within each account.

**MST-1487-Q0003** (single-answer, Select ONE) How should user access be managed across many AWS accounts?

- A. Centralize with IAM Identity Center and federation **(key)**  
  _Rationale:_ Correct: Identity Center centralizes access instead of per-account users.
- B. Create separate IAM users in every account  
  _Rationale:_ Per-account users are hard to manage and audit at scale.
- C. Share one access key across all accounts  
  _Rationale:_ Sharing keys is insecure and unauditable.
- D. Use the management account root for daily work  
  _Rationale:_ Root should not be used for daily operations.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
