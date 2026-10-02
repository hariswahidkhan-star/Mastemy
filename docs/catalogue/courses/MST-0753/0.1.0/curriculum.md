# AWS IAM: Identity, Access, and Least Privilege

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0753` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS IAM documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — AWS IAM: Identity, Access, and Least Privilege (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain IAM users, groups, roles and policies
2. Write and evaluate JSON policy documents
3. Apply least privilege and permission boundaries
4. Use roles for cross-account and workload access
5. Audit access with Access Analyzer and CloudTrail

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 IAM identities (MASTEMY-DESIGN 20%)

- Worked applications: (1) Create a group and attach a managed policy; (2) Assume a role from a workload
- Common misconception addressed: Using the root account for day-to-day work
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Users, groups and roles | 120 | 7 |
| M01L02 | Root account and MFA | 120 | 7 |

### M02 Policy documents (MASTEMY-DESIGN 20%)

- Worked applications: (1) Write a least-privilege policy for one bucket; (2) Read an explicit deny in evaluation
- Common misconception addressed: Believing an allow can override an explicit deny
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Policy structure and evaluation | 120 | 7 |
| M02L02 | Identity vs resource policies | 120 | 7 |

### M03 Least privilege (MASTEMY-DESIGN 20%)

- Worked applications: (1) Narrow a wildcard action to specific operations; (2) Apply a permission boundary to a role
- Common misconception addressed: Granting Action:* Resource:* for convenience
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scoping actions and resources | 120 | 7 |
| M03L02 | Permission boundaries | 120 | 7 |

### M04 Roles and federation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set up a cross-account assume-role trust; (2) Use an instance role instead of keys
- Common misconception addressed: Embedding long-lived access keys in applications
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Cross-account roles | 120 | 7 |
| M04L02 | Workload and federated access | 120 | 7 |

### M05 Audit and analysis (MASTEMY-DESIGN 20%)

- Worked applications: (1) Find externally shared resources with Access Analyzer; (2) Trace a denied API call in CloudTrail
- Common misconception addressed: Assuming CloudTrail captures everything with no configuration
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | IAM Access Analyzer | 120 | 7 |
| M05L02 | CloudTrail for access events | 120 | 7 |

## Integrative case

Secure an AWS account: replace root usage and static keys with roles and MFA, write least-privilege JSON policies with a permission boundary, enable cross-account access via assume-role, and verify exposure and denied calls with Access Analyzer and CloudTrail.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0753-final-protected | 40 | 50 | yes |
| MST-0753-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IAM identities | 8 |
| Policy documents | 8 |
| Least privilege | 8 |
| Roles and federation | 8 |
| Audit and analysis | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0753-Q0001** (single-answer, Select ONE) In AWS IAM policy evaluation, what is the effect of an explicit deny?

- A. It overrides any allow **(key)**  
  _Rationale:_ Correct: an explicit deny always wins over allows in IAM evaluation.
- B. It is ignored if an allow exists  
  _Rationale:_ Explicit deny takes precedence over allow.
- C. It applies only to the root user  
  _Rationale:_ Explicit deny applies to all principals it targets.
- D. It only works in resource policies  
  _Rationale:_ Explicit deny works in both identity and resource policies.

**MST-0753-Q0002** (multiple-answer, Select TWO) Which TWO approaches follow AWS least-privilege guidance? (Select TWO.)

- A. Grant only the specific actions and resources a task needs **(key)**  
  _Rationale:_ Correct: scoping actions and resources is the core of least privilege.
- B. Attach a permission boundary to cap a role's maximum permissions **(key)**  
  _Rationale:_ Correct: permission boundaries limit the effective permissions.
- C. Use Action:* Resource:* to avoid future changes  
  _Rationale:_ Wildcards grant far more than needed.
- D. Share one set of access keys across the whole team  
  _Rationale:_ Shared static keys break accountability and least privilege.

**MST-0753-Q0003** (single-answer, Select ONE) How should an application on an EC2 instance obtain AWS permissions?

- A. Via an IAM role attached to the instance **(key)**  
  _Rationale:_ Correct: instance roles supply temporary credentials without stored keys.
- B. By hardcoding access keys in the code  
  _Rationale:_ Hardcoded keys are a major security risk.
- C. Using the root account credentials  
  _Rationale:_ Root credentials must never be used by applications.
- D. By disabling IAM for the instance  
  _Rationale:_ IAM cannot be disabled; roles are the intended mechanism.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
