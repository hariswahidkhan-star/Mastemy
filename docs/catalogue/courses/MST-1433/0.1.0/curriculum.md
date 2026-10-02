# Windows 11 for IT Support

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1433` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Windows deployment and support documentation read via the Microsoft Learn MCP on 2026-10-02. Tool names and log paths can change by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/windows-hardware/manufacture/desktop/deployment-troubleshooting-and-log-files |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-WIN11 |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Windows 11 for IT Support (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Windows 11 installation and deployment
2. Configure and manage Windows 11 devices
3. Troubleshoot common Windows 11 support issues using logs and tools

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Windows 11 setup and deployment (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Review Setuperr.log and then Setupact.log after a setup failure; (2) Use SetupDiag to diagnose an upgrade failure
- Common misconception addressed: Assuming WDS boot.wim deployment still works on current Windows Server
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Installation and deployment basics | 84 | 4 |
| M01L02 | Deployment logs and troubleshooting | 84 | 4 |

### M02 Configuration and management (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Identify an image with DISM /Get-ImageInfo; (2) Manage a device with Intune or Configuration Manager
- Common misconception addressed: Expecting Software Center notifications during the first-hour focus-assist quiet period
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Device configuration and updates | 84 | 4 |
| M02L02 | Managing Windows 11 with Intune and Configuration Manager | 84 | 4 |

### M03 Support and troubleshooting (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Check AppLocker and CodeIntegrity logs for blocked binaries; (2) Collect enrollment logs for a failed deployment
- Common misconception addressed: Treating every app failure as a hardware fault rather than a policy block
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Common support scenarios | 72 | 4 |
| M03L02 | Application and update issues | 72 | 4 |

## Integrative case

An IT support technician diagnoses a failed Windows 11 upgrade by reading SetupDiag output and setup logs, then resolves a blocked app by reviewing the AppLocker and CodeIntegrity logs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1433-final-protected | 24 | 32 | yes |
| MST-1433-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Windows 11 setup and deployment | 8 |
| Configuration and management | 8 |
| Support and troubleshooting | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1433-Q0001** (single-answer, Select ONE) After a failure in Windows Setup, which log file should you review first?

- A. Setuperr.log **(key)**  
  _Rationale:_ Correct: review Setuperr.log first, then Setupact.log, then others as needed.
- B. Setupact.log  
  _Rationale:_ Setupact.log is reviewed after Setuperr.log.
- C. smsts.log  
  _Rationale:_ smsts.log applies to task-sequence deployments, not the first review step here.
- D. System event log only  
  _Rationale:_ The guidance is to start with the Setup error log.

**MST-1433-Q0002** (multiple-answer, Select TWO) Which TWO tools help diagnose Windows deployment problems? (Select TWO.)

- A. SetupDiag **(key)**  
  _Rationale:_ Correct: SetupDiag parses Setup logs to find the root cause of an upgrade failure.
- B. Windows Setup log files **(key)**  
  _Rationale:_ Correct: Setup log files are key to identifying the point of failure.
- C. Disk Defragmenter  
  _Rationale:_ Defragmenting does not diagnose deployment failures.
- D. Snipping Tool  
  _Rationale:_ The Snipping Tool is for screenshots, not diagnostics.

**MST-1433-Q0003** (single-answer, Select ONE) An app is being blocked from running on Windows 11 SE. Which logs should you check for blocked executables?

- A. AppLocker and CodeIntegrity logs in Event Viewer **(key)**  
  _Rationale:_ Correct: these logs show whether executables related to the app are blocked.
- B. DNS server logs  
  _Rationale:_ DNS logs are unrelated to blocked executables.
- C. IIS access logs  
  _Rationale:_ IIS logs track web requests, not app blocking.
- D. Firewall rules only  
  _Rationale:_ Firewall rules control network traffic, not executable blocking.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
