# AWS IAM Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1480` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Web Services (AWS) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-IAM (https://docs.aws.amazon.com/IAM/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS IAM Deep Dive (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain IAM users, groups, roles and identity providers
2. Read and write IAM policies and understand evaluation logic
3. Apply roles, assume-role and temporary credentials
4. Enforce least privilege with permission boundaries and conditions
5. Audit and troubleshoot access with policy tools

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Identities (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a role and grant it to a service; (2) Describe a federated login to an AWS role
- Common misconception addressed: Using long-lived user keys where a role would be safer
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Users, groups and roles | 72 | 5 |
| M01L02 | Federation and identity providers | 72 | 5 |

### M02 Policies and evaluation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write a policy granting specific actions on specific resources; (2) Predict the result when an explicit deny meets an allow
- Common misconception addressed: Assuming an allow overrides an explicit deny
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Policy structure and types | 72 | 5 |
| M02L02 | Evaluation logic: allow, deny and precedence | 72 | 5 |

### M03 Roles and temporary credentials (MASTEMY-DESIGN 25%)

- Worked applications: (1) Assume a role and use temporary credentials; (2) Set up cross-account access with a role
- Common misconception addressed: Sharing static access keys instead of assuming roles
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | AssumeRole and temporary credentials | 72 | 5 |
| M03L02 | Cross-account and service roles | 72 | 5 |

### M04 Least privilege and auditing (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add a condition and a permission boundary to a policy; (2) Use a policy simulator to troubleshoot denied access
- Common misconception addressed: Granting wildcard actions and resources for convenience
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Conditions and permission boundaries | 72 | 5 |
| M04L02 | Access analysis and troubleshooting | 72 | 5 |

## Integrative case

Harden access for a growing AWS account: replace long-lived keys with roles and temporary credentials, write least-privilege policies with conditions, add permission boundaries for delegated admins, and audit effective access to confirm the design.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1480-final-protected | 40 | 50 | yes |
| MST-1480-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Identities | 10 |
| Policies and evaluation | 10 |
| Roles and temporary credentials | 10 |
| Least privilege and auditing | 10 |

Minimum reviewed item bank: 260 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1480-Q0001** (single-answer, Select ONE) An IAM request matches one policy that allows an action and another that explicitly denies it. What is the result?

- A. The request is denied **(key)**  
  _Rationale:_ Correct: an explicit deny always overrides any allow in IAM evaluation.
- B. The request is allowed  
  _Rationale:_ An explicit deny cannot be overridden by an allow.
- C. The request is allowed only on weekdays  
  _Rationale:_ No time rule applies; explicit deny wins.
- D. The result is random  
  _Rationale:_ IAM evaluation is deterministic, not random.

**MST-1480-Q0002** (multiple-answer, Select TWO) Which TWO practices support least privilege in AWS IAM? (Select TWO.)

- A. Grant only the specific actions and resources needed **(key)**  
  _Rationale:_ Correct: scoping actions and resources is the core of least privilege.
- B. Use roles with temporary credentials instead of long-lived keys **(key)**  
  _Rationale:_ Correct: temporary credentials reduce the risk of leaked static keys.
- C. Attach AdministratorAccess to every user  
  _Rationale:_ Blanket admin violates least privilege.
- D. Share one access key across the whole team  
  _Rationale:_ Shared keys remove accountability and over-permit.

**MST-1480-Q0003** (single-answer, Select ONE) An application on an EC2 instance needs to read from an S3 bucket. What is the recommended way to grant this?

- A. Attach an IAM role to the instance with a scoped S3 read policy **(key)**  
  _Rationale:_ Correct: an instance role provides temporary, scoped credentials without static keys.
- B. Embed a long-lived access key in the application code  
  _Rationale:_ Hardcoded keys are a major security risk.
- C. Make the bucket public  
  _Rationale:_ Public buckets expose data far beyond the app's needs.
- D. Grant the instance AdministratorAccess  
  _Rationale:_ Admin far exceeds a bucket-read requirement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
