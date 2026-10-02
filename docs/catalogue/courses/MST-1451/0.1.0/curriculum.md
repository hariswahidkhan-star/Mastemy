# Hybrid Identity with Entra Connect

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1451` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Entra Connect and hybrid-identity documentation read via the Microsoft Learn MCP on 2026-10-02. Specific product UI labels can vary by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/entra/identity/hybrid/connect/whatis-azure-ad-connect |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-ENTRACONNECT |
| Legacy IDs | MST-MIC-SK-HIEC-001 |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Hybrid Identity with Entra Connect (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain hybrid identity and directory synchronisation to Microsoft Entra ID
2. Describe Microsoft Entra Connect, its components and Entra Cloud Sync
3. Compare sign-in methods and apply operational security best practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Hybrid identity and directory sync (MASTEMY-DESIGN 34%, design weight)

- Worked applications: (1) Explain why an organisation synchronises on-premises identities to Entra ID; (2) Identify the three main components of a sync deployment
- Common misconception addressed: Thinking directory sync copies plaintext passwords to the cloud
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What hybrid identity and directory synchronisation are | 80 | 4 |
| M01L02 | The synchronisation lifecycle and components | 80 | 4 |

### M02 Entra Connect and Cloud Sync (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Decide whether Entra Connect or Entra Cloud Sync fits a scenario; (2) Describe the role of the provisioning agent in Cloud Sync
- Common misconception addressed: Assuming Azure AD Connect v1 is still supported when it has been retired
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Microsoft Entra Connect and the sync engine | 80 | 4 |
| M02L02 | Entra Cloud Sync and when to choose it | 80 | 4 |

### M03 Sign-in methods and security (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Match a requirement to PHS, PTA or federation; (2) Explain why the Entra Connect server is treated as Tier 0
- Common misconception addressed: Treating the Entra Connect server as an ordinary member server rather than Tier 0
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Password hash sync, pass-through auth and federation | 80 | 4 |
| M03L02 | Operational and security best practices | 80 | 4 |

## Integrative case

An identity admin plans hybrid identity for an organisation: chooses between Entra Connect and Entra Cloud Sync, selects a sign-in method (PHS, PTA or federation), and documents operational and security steps such as treating the sync server as Tier 0 and enabling MFA.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1451-final-protected | 24 | 32 | yes |
| MST-1451-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Hybrid identity and directory sync | 8 |
| Entra Connect and Cloud Sync | 8 |
| Sign-in methods and security | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1451-Q0001** (single-answer, Select ONE) Which on-premises Microsoft application connects an on-premises Active Directory to Microsoft Entra ID for hybrid identity?

- A. Microsoft Entra Connect **(key)**  
  _Rationale:_ Correct: Entra Connect synchronises on-premises AD to Microsoft Entra ID.
- B. Microsoft Excel  
  _Rationale:_ Excel is a spreadsheet app, not an identity sync tool.
- C. Azure Blob Storage  
  _Rationale:_ Blob Storage is object storage, unrelated to identity sync.
- D. SharePoint Online  
  _Rationale:_ SharePoint is a collaboration service, not an identity sync tool.

**MST-1451-Q0002** (multiple-answer, Select TWO) Which TWO are recommended security practices for a hybrid identity deployment? (Select TWO.)

- A. Treat the Entra Connect server as a Tier 0 component **(key)**  
  _Rationale:_ Correct: the sync server holds critical identity data and is Tier 0.
- B. Apply multi-factor authentication for synced accounts **(key)**  
  _Rationale:_ Correct: MFA strengthens access security for hybrid accounts.
- C. Store on-premises passwords in clear text in Entra ID  
  _Rationale:_ Incorrect: Entra ID never stores clear-text passwords.
- D. Continue using the retired Azure AD Connect v1  
  _Rationale:_ Incorrect: Azure AD Connect v1 is retired and should be upgraded.

**MST-1451-Q0003** (single-answer, Select ONE) With password hash synchronisation (PHS), what does Microsoft Entra Connect send to the cloud?

- A. A hash of a hash of the user's password **(key)**  
  _Rationale:_ Correct: PHS synchronises a hash of the password hash, not the plaintext password.
- B. The user's plaintext password  
  _Rationale:_ Incorrect: the plaintext password is never synchronised.
- C. Nothing related to the password  
  _Rationale:_ PHS specifically synchronises password hash data.
- D. The user's Kerberos ticket  
  _Rationale:_ PHS synchronises a password hash, not Kerberos tickets.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
