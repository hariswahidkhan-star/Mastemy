# Azure Storage Deep Dive

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1448` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Azure Storage documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/azure/storage/common/storage-account-overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZSTORAGE |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Azure Storage Deep Dive (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe storage account types and the services they contain
2. Use blob storage, access tiers and lifecycle management
3. Choose redundancy options and apply access security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Storage accounts and services (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create a general-purpose v2 account; (2) Identify blob, file, queue and table endpoints
- Common misconception addressed: Expecting one account to mix redundancy settings per service
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Account types and services | 84 | 4 |
| M01L02 | Namespaces and endpoints | 84 | 4 |

### M02 Blob storage and tiers (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Upload blobs and set an access tier; (2) Author a lifecycle rule to tier old data to cool
- Common misconception addressed: Setting access tiers on append or page blobs, which is unsupported
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Blobs and containers | 84 | 4 |
| M02L02 | Access tiers and lifecycle management | 84 | 4 |

### M03 Redundancy and security (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Choose a redundancy option for a backup workload; (2) Secure access with keys, SAS or Entra authorization
- Common misconception addressed: Assuming the archive tier is supported for ZRS or GZRS accounts
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Redundancy options (LRS, ZRS, GRS) | 72 | 4 |
| M03L02 | Access control and security | 72 | 4 |

## Integrative case

An architect selects a storage account type, chooses access tiers with a lifecycle rule, and picks a redundancy option for a backup-and-archive workload.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1448-final-protected | 24 | 32 | yes |
| MST-1448-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Storage accounts and services | 8 |
| Blob storage and tiers | 8 |
| Redundancy and security | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1448-Q0001** (single-answer, Select ONE) Which access tier is optimized for data accessed infrequently and retained at least 30 days?

- A. Cool tier **(key)**  
  _Rationale:_ Correct: the cool tier suits infrequently accessed data with a 30-day minimum retention.
- B. Hot tier  
  _Rationale:_ Hot is for frequently accessed data with higher storage cost.
- C. Archive tier  
  _Rationale:_ Archive is offline with a 180-day minimum, for rarely accessed data.
- D. Premium tier  
  _Rationale:_ Premium is a performance tier, not an access tier for retention.

**MST-1448-Q0002** (multiple-answer, Select TWO) Which TWO are valid Azure Storage redundancy options? (Select TWO.)

- A. Locally redundant storage (LRS) **(key)**  
  _Rationale:_ Correct: LRS replicates within a single datacentre.
- B. Geo-redundant storage (GRS) **(key)**  
  _Rationale:_ Correct: GRS replicates to a secondary region.
- C. Conditional-access redundancy  
  _Rationale:_ Conditional Access is an Entra feature, not a redundancy option.
- D. Focused-inbox redundancy  
  _Rationale:_ Focused Inbox is an Outlook feature, not a storage redundancy option.

**MST-1448-Q0003** (single-answer, Select ONE) On which blob type can you set an access tier?

- A. Block blobs **(key)**  
  _Rationale:_ Correct: setting an access tier is only supported on block blobs.
- B. Append blobs  
  _Rationale:_ Append blobs do not support access-tier settings.
- C. Page blobs  
  _Rationale:_ Page blobs do not support access-tier settings.
- D. All blob types equally  
  _Rationale:_ Only block blobs support access tiers.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
