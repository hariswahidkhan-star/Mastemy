# OneDrive: Secure File Collaboration and Synchronization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0674` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official OneDrive in Microsoft 365 documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/sharepoint/onedrive-overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-ONEDRIVE |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — OneDrive: Secure File Collaboration and Synchronization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Store and organize files in OneDrive
2. Configure the sync client, Files On-Demand and Known Folder Move
3. Share files with appropriate permissions and co-author
4. Protect and recover files with versioning and retention

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Storage and organization (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Set up OneDrive and upload a folder structure; (2) Organize project files into shareable folders
- Common misconception addressed: Storing everything in one flat folder with no structure
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | OneDrive basics and the web experience | 120 | 5 |
| M01L02 | Organizing files and folders | 120 | 5 |

### M02 Sync and Files On-Demand (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Sync a library and work offline; (2) Enable Known Folder Move for Desktop and Documents
- Common misconception addressed: Assuming Files On-Demand downloads every file locally
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Installing and using the sync client | 120 | 5 |
| M02L02 | Files On-Demand and Known Folder Move | 120 | 5 |

### M03 Sharing and collaboration (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Share a folder with a specific-people link; (2) Co-author a document and attach it as a modern attachment
- Common misconception addressed: Emailing file copies instead of sharing a single link
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sharing links and permissions | 120 | 5 |
| M03L02 | Co-authoring and Outlook attachments | 120 | 5 |

### M04 Protection and recovery (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Restore a file from version history; (2) Review retention and access-control settings
- Common misconception addressed: Believing deleted files are unrecoverable before retention expires
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Version history and restore | 120 | 5 |
| M04L02 | Retention and security basics | 120 | 5 |

## Integrative case

A consultant configures sync and Known Folder Move, shares a client folder with specific-people links, and restores an earlier version after an accidental edit.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0674-final-protected | 30 | 40 | yes |
| MST-0674-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Storage and organization | 8 |
| Sync and Files On-Demand | 7 |
| Sharing and collaboration | 8 |
| Protection and recovery | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0674-Q0001** (single-answer, Select ONE) What does OneDrive Files On-Demand allow?

- A. Viewing and interacting with files in File Explorer without downloading them all **(key)**  
  _Rationale:_ Correct: Files On-Demand shows cloud files without consuming local disk until opened.
- B. Downloading every file to the device automatically  
  _Rationale:_ Files download on access by default, not all at once.
- C. Encrypting the local disk  
  _Rationale:_ Files On-Demand manages local availability, not disk encryption.
- D. Creating Azure virtual networks  
  _Rationale:_ Networking is unrelated to OneDrive file availability.

**MST-0674-Q0002** (multiple-answer, Select TWO) Which TWO are OneDrive collaboration features? (Select TWO.)

- A. Modern attachments that share a link instead of a copy **(key)**  
  _Rationale:_ Correct: OneDrive integrates with Outlook to share links as modern attachments.
- B. Real-time co-authoring in Office apps **(key)**  
  _Rationale:_ Correct: OneDrive enables co-authoring in Word, Excel and PowerPoint.
- C. Running Microsoft Graph PowerShell  
  _Rationale:_ PowerShell administration is a separate skill from OneDrive collaboration.
- D. Configuring NSG rules  
  _Rationale:_ NSGs are Azure networking controls, unrelated to OneDrive.

**MST-0674-Q0003** (single-answer, Select ONE) A user accidentally overwrites a document. What is the quickest recovery option?

- A. Restore an earlier copy from version history **(key)**  
  _Rationale:_ Correct: version history lets users restore a previous version of the file.
- B. Reinstall the sync client  
  _Rationale:_ Reinstalling sync does not restore prior content.
- C. Change the storage redundancy  
  _Rationale:_ Redundancy is an Azure Storage concept, not a OneDrive recovery control.
- D. Create a new storage account  
  _Rationale:_ Storage accounts are Azure infrastructure, unrelated to OneDrive recovery.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
