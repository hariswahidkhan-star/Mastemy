# Microsoft SC-300: Identity and Access Administrator Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0179` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | SC-300 |
| Version basis | Skills measured as of October 28, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-SC300 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/sc-300) |
| Legacy IDs | MST-MIC-MS-SC300-001 |
| Planned time | T = 1700 min; instruction I = 1360 min (80%); assessment A = 340 min (20%) |
| Assessment split | lesson checks 80 / module checks 140 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Implement and manage user identities' to the depth the official outline requires
2. Apply the objectives of 'Implement authentication and access management' to the depth the official outline requires
3. Apply the objectives of 'Plan and implement workload identities' to the depth the official outline requires
4. Apply the objectives of 'Plan and automate identity governance' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Implement and manage user identities (20–25%)

- Worked applications: (1) Configure administrative units and custom Entra roles; (2) Set up cross-tenant synchronization for external users
- Common misconception addressed: Confusing a security group with an administrative unit as a role scope
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Configure and manage a Microsoft Entra tenant | 85 | 6 |
| M01L02 | Create, configure, and manage Microsoft Entra identities | 85 | 6 |
| M01L03 | Implement and manage identities for external users and tenants | 85 | 6 |
| M01L04 | Implement and manage hybrid identity | 85 | 6 |

### M02 Implement authentication and access management (25–30%)

- Worked applications: (1) Build a Conditional Access policy requiring MFA and compliant device; (2) Configure sign-in and user risk policies in ID Protection
- Common misconception addressed: Assuming MFA settings and Conditional Access MFA are configured the same way
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Plan, implement, and manage Microsoft Entra user authentication | 85 | 6 |
| M02L02 | Plan, implement, and manage Microsoft Entra Conditional Access | 85 | 6 |
| M02L03 | Manage risk by using Microsoft Entra ID Protection | 85 | 6 |
| M02L04 | Implement Global Secure Access | 85 | 6 |

### M03 Plan and implement workload identities (20–25%)

- Worked applications: (1) Assign a managed identity to an Azure resource; (2) Configure app registration API permissions and consent
- Common misconception addressed: Confusing a managed identity with a service principal secret
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Plan and implement identities for applications and Azure workloads | 85 | 6 |
| M03L02 | Plan, implement, and monitor the integration of enterprise applications | 85 | 6 |
| M03L03 | Plan and implement app registrations | 85 | 6 |
| M03L04 | Manage and monitor app access by using Microsoft Defender for Cloud Apps | 85 | 6 |

### M04 Plan and automate identity governance (20–25%)

- Worked applications: (1) Create an access package with entitlement management; (2) Configure PIM eligible role with approval
- Common misconception addressed: Treating an access review and PIM activation as the same control
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Plan and implement entitlement management in Microsoft Entra | 85 | 6 |
| M04L02 | Plan, implement, and manage access reviews in Microsoft Entra | 85 | 6 |
| M04L03 | Plan and implement privileged access | 85 | 6 |
| M04L04 | Monitor identity activity by using logs, workbooks, and reports | 85 | 6 |

## Integrative case

An enterprise adopts Zero Trust identity on Microsoft Entra. Design the solution: tenant roles and admin units, authentication methods and Conditional Access, risk policies, workload identities and app registrations, and identity governance (entitlement management, access reviews, PIM); justify choices to the security lead.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0179-practice-form-A | 45 | 45 | yes |
| MST-0179-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0179-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0179-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Implement and manage user identities | 11 |
| Implement authentication and access management | 13 |
| Plan and implement workload identities | 11 |
| Plan and automate identity governance | 10 |

Minimum reviewed item bank: 652 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0179-Q0001** (single-answer, Select ONE) Access to a finance app must require multifactor authentication only when sign-in risk is elevated. Which control enforces this?

- A. A Conditional Access policy using sign-in risk as a condition **(key)**  
  _Rationale:_ Correct: Conditional Access can require MFA conditioned on sign-in risk.
- B. Tenant-wide security defaults  
  _Rationale:_ Security defaults apply broadly and cannot condition on per-sign-in risk.
- C. A per-user MFA setting  
  _Rationale:_ Legacy per-user MFA is always-on and not risk-conditioned.
- D. An administrative unit  
  _Rationale:_ Admin units scope management; they do not enforce authentication conditions.

**MST-0179-Q0002** (single-answer, Select ONE) Which identity should an Azure VM use to access Key Vault without any stored credential?

- A. A managed identity **(key)**  
  _Rationale:_ Correct: a managed identity lets the resource authenticate to Azure services with no stored secret.
- B. A service principal with a client secret  
  _Rationale:_ That stores a long-lived secret, which the requirement forbids.
- C. A guest user account  
  _Rationale:_ Guest accounts are for external collaboration, not resource authentication.
- D. A shared mailbox  
  _Rationale:_ A mailbox is not an authentication identity for a VM.

**MST-0179-Q0003** (multiple-answer, Select TWO) Which TWO Microsoft Entra features support just-enough, just-in-time privileged access governance? (Select TWO.)

- A. Privileged Identity Management (PIM) eligible assignments **(key)**  
  _Rationale:_ Correct: PIM grants time-bound, approval-gated role activation.
- B. Access reviews **(key)**  
  _Rationale:_ Correct: access reviews periodically recertify that access is still needed.
- C. Dynamic data masking  
  _Rationale:_ Masking is a database feature, not identity governance.
- D. A network security group  
  _Rationale:_ NSGs filter network traffic, not role access.
- E. A public IP prefix  
  _Rationale:_ IP prefixes are a networking construct, unrelated to privileged access.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
