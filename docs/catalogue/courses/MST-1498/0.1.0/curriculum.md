# AWS Identity Center and Federation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1498` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS Identity Center and Federation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain AWS IAM Identity Center and federated access
2. Configure permission sets and multi-account access
3. Integrate an external identity provider via SAML/SCIM
4. Apply least privilege and session controls for workforce access

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Identity Center overview (MASTEMY-DESIGN 25%)

- Worked applications: (1) Explain SSO flow to a multi-account org; (2) Compare IAM users to Identity Center access
- Common misconception addressed: Thinking Identity Center replaces IAM roles entirely
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | IAM Identity Center vs IAM users | 72 | 7 |
| M01L02 | Single sign-on and the access portal | 72 | 7 |

### M02 Permission sets and accounts (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create a read-only permission set; (2) Assign a group to three accounts
- Common misconception addressed: Confusing a permission set with an IAM policy attached to a user
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Permission sets | 72 | 7 |
| M02L02 | Assigning access across accounts | 72 | 7 |

### M03 External identity federation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Connect an external IdP via SAML; (2) Enable SCIM to sync groups
- Common misconception addressed: Believing SAML sign-in automatically provisions users without SCIM
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SAML identity provider integration | 72 | 7 |
| M03L02 | SCIM user and group provisioning | 72 | 7 |

### M04 Least privilege and sessions (MASTEMY-DESIGN 25%)

- Worked applications: (1) Narrow a permission set to needed actions; (2) Set a shorter session duration
- Common misconception addressed: Granting an AdministratorAccess permission set to everyone for convenience
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Scoping permission sets | 72 | 7 |
| M04L02 | Session duration and MFA | 72 | 7 |

## Integrative case

An org with 10 accounts manages access with per-account IAM users. Adopt IAM Identity Center: connect the corporate IdP, define permission sets, assign groups to accounts, and remove long-lived IAM users.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1498-final-protected | 28 | 35 | yes |
| MST-1498-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Identity Center overview | 7 |
| Permission sets and accounts | 7 |
| External identity federation | 7 |
| Least privilege and sessions | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1498-Q0001** (single-answer, Select ONE) In IAM Identity Center, what is a permission set?

- A. A reusable collection of policies that defines access when assigned to a user/group in an account **(key)**  
  _Rationale:_ Correct: permission sets define access provisioned into accounts.
- B. A long-lived IAM user password  
  _Rationale:_ Permission sets are not IAM user passwords.
- C. A VPC network ACL  
  _Rationale:_ That is unrelated networking, not identity.
- D. An S3 bucket policy  
  _Rationale:_ A bucket policy is resource-level, not an Identity Center permission set.

**MST-1498-Q0002** (multiple-answer, Select TWO) Which TWO are typically used to integrate a corporate identity provider with Identity Center? (Select TWO.)

- A. SAML 2.0 for single sign-on **(key)**  
  _Rationale:_ Correct: SAML federates authentication.
- B. SCIM for automatic user/group provisioning **(key)**  
  _Rationale:_ Correct: SCIM syncs users and groups.
- C. FTP for identity sync  
  _Rationale:_ FTP is not an identity protocol.
- D. Hard-coded IAM access keys per user  
  _Rationale:_ Access keys are what federation avoids.

**MST-1498-Q0003** (single-answer, Select ONE) Which practice best applies least privilege in Identity Center?

- A. Assign narrowly scoped permission sets matching each group's job **(key)**  
  _Rationale:_ Correct: scoped permission sets follow least privilege.
- B. Assign AdministratorAccess to all users  
  _Rationale:_ That is over-privileged.
- C. Disable MFA to simplify login  
  _Rationale:_ Disabling MFA weakens security.
- D. Use a single shared login for the team  
  _Rationale:_ Shared logins break accountability and least privilege.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
