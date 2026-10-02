# Microsoft Entra ID Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1428` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Entra ID documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/entra/fundamentals/what-is-entra |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-ENTRA |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Entra ID Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manage users, guests, groups and licensing in Entra ID
2. Configure authentication methods, MFA and directory roles
3. Explain Conditional Access and build a basic policy

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Identities (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create a user and invite a B2B guest; (2) Assign licenses through a group
- Common misconception addressed: Assigning licenses user by user instead of group-based licensing
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Users and guests | 84 | 4 |
| M01L02 | Groups and licensing | 84 | 4 |

### M02 Authentication and roles (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Enable MFA for a pilot group; (2) Assign a least-privilege directory role
- Common misconception addressed: Granting Global Administrator when a scoped role suffices
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | MFA and authentication methods | 84 | 4 |
| M02L02 | Directory roles and RBAC | 84 | 4 |

### M03 Conditional access basics (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Draft an if-then Conditional Access policy; (2) Enable the policy in report-only mode
- Common misconception addressed: Enabling a broad policy without an emergency-access exclusion
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditional Access concepts | 72 | 4 |
| M03L02 | Policy building and report-only | 72 | 4 |

## Integrative case

An admin creates security groups, assigns a directory role, enables MFA, and drafts a report-only Conditional Access policy for an HR application.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1428-final-protected | 24 | 32 | yes |
| MST-1428-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Identities | 8 |
| Authentication and roles | 8 |
| Conditional access basics | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1428-Q0001** (single-answer, Select ONE) A Conditional Access policy is best described as which kind of statement?

- A. An if-then statement: if a condition is met, then enforce a control **(key)**  
  _Rationale:_ Correct: Conditional Access policies are if-then statements that enforce controls such as MFA.
- B. A storage redundancy setting  
  _Rationale:_ Redundancy is an Azure Storage concept, not an access policy.
- C. A production BOM  
  _Rationale:_ BOMs belong to manufacturing, not identity.
- D. A mail rule  
  _Rationale:_ Inbox rules handle email, not resource access decisions.

**MST-1428-Q0002** (multiple-answer, Select TWO) Which TWO are recommended when creating a broad Conditional Access policy? (Select TWO.)

- A. Exclude emergency access (break-glass) accounts **(key)**  
  _Rationale:_ Correct: excluding break-glass accounts prevents admin lockout.
- B. Test in report-only mode before enabling **(key)**  
  _Rationale:_ Correct: report-only mode validates impact before enforcement.
- C. Delete all guest users first  
  _Rationale:_ Deleting guests is not part of policy creation guidance.
- D. Disable MFA for everyone  
  _Rationale:_ Disabling MFA weakens, not strengthens, security.

**MST-1428-Q0003** (single-answer, Select ONE) What is the benefit of group-based licensing in Entra ID?

- A. Licenses are assigned to a group and flow to its members **(key)**  
  _Rationale:_ Correct: group-based licensing assigns licenses via group membership rather than per user.
- B. It encrypts all mailboxes  
  _Rationale:_ Licensing does not perform mailbox encryption.
- C. It creates virtual networks  
  _Rationale:_ VNets are an Azure networking concept, unrelated to licensing.
- D. It sets blob access tiers  
  _Rationale:_ Access tiers are an Azure Storage concept.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
