# Windows Administration for IT

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1657` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-WAI-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Windows Administration for IT (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Navigate and configure Windows system settings for a managed environment
2. Manage local users, groups and NTFS/share permissions
3. Use the command line and PowerShell for common administrative tasks
4. Configure networking, updates and basic security settings on Windows
5. Diagnose and recover a Windows system using built-in tools

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Windows configuration (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide which startup services are safe to disable; (2) Plan a driver rollback for a misbehaving device
- Common misconception addressed: Editing the registry without a backup or a clear reason
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | System settings, services and the registry overview | 72 | 6 |
| M01L02 | Device and driver management | 72 | 6 |

### M02 Users, groups and permissions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Assign a user to the correct group for a task; (2) Predict effective access when NTFS and share permissions differ
- Common misconception addressed: Assuming share permissions override more restrictive NTFS permissions
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Local users, groups and least privilege | 72 | 6 |
| M02L02 | NTFS and share permissions combined | 72 | 6 |

### M03 Command line and PowerShell (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a PowerShell command to list stopped services; (2) Use the command line to check disk and system health
- Common misconception addressed: Believing PowerShell and the old command prompt are interchangeable
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Essential command-prompt tasks | 72 | 6 |
| M03L02 | PowerShell cmdlets for administration | 72 | 6 |

### M04 Networking, updates and security (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Configure a static IP and verify connectivity; (2) Plan an update schedule that minimises disruption
- Common misconception addressed: Turning off the firewall to 'make networking work'
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | IP configuration and Windows Firewall | 72 | 6 |
| M04L02 | Windows Update and baseline security settings | 72 | 6 |

### M05 Diagnostics and recovery (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Find the relevant entry in Event Viewer for a crash; (2) Choose between a restore point and a reset for a broken system
- Common misconception addressed: Reinstalling Windows before checking logs for a quick fix
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Event Viewer and performance tools | 72 | 6 |
| M05L02 | Safe Mode, restore points and recovery | 72 | 6 |

## Integrative case

A small office of fifteen Windows machines needs a standard configuration: local accounts with least privilege, a shared folder with correct permissions, automatic updates, and a documented recovery plan. Plan the configuration, choose the right tools, and record the steps so another administrator can repeat them.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1657-final-protected | 25 | 25 | yes |
| MST-1657-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Windows configuration | 5 |
| Users, groups and permissions | 5 |
| Command line and PowerShell | 5 |
| Networking, updates and security | 5 |
| Diagnostics and recovery | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1657-Q0001** (single-answer, Select ONE) A user needs read-only access to a shared folder. Share permission is Full Control but NTFS is Read. What is the effective access?

- A. Read, because the most restrictive of the combined permissions applies **(key)**  
  _Rationale:_ Correct: NTFS and share permissions combine to the most restrictive result.
- B. Full Control, because the share permission wins  
  _Rationale:_ Share permissions do not override more restrictive NTFS permissions.
- C. No access at all  
  _Rationale:_ Read is granted by both layers at minimum, so access is not denied.
- D. Modify, as a compromise between the two  
  _Rationale:_ Effective access is the most restrictive, not an average.

**MST-1657-Q0002** (multiple-answer, Select TWO) Which TWO are good reasons to use PowerShell over manual clicking for administration? (Select TWO.)

- A. Tasks can be scripted and repeated consistently **(key)**  
  _Rationale:_ Correct: scripting gives repeatable, auditable results.
- B. Changes can be applied to many machines at once **(key)**  
  _Rationale:_ Correct: PowerShell scales a task across many hosts.
- C. It removes the need to understand permissions  
  _Rationale:_ Permissions still apply regardless of the tool used.
- D. It bypasses all security controls  
  _Rationale:_ PowerShell runs under the same security model, not around it.

**MST-1657-Q0003** (single-answer, Select ONE) A Windows machine fails to boot normally after a driver update. Which recovery step is most appropriate first?

- A. Boot into Safe Mode and roll back the driver **(key)**  
  _Rationale:_ Correct: Safe Mode loads minimal drivers so the bad driver can be removed.
- B. Immediately reinstall Windows  
  _Rationale:_ Reinstalling is excessive before trying targeted recovery.
- C. Replace the motherboard  
  _Rationale:_ A software driver fault does not require hardware replacement.
- D. Delete the user's documents  
  _Rationale:_ This does not address a driver fault and risks data loss.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
