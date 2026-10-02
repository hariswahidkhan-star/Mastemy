# Microsoft Intune Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1429` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Intune documentation read via the Microsoft Learn MCP on 2026-10-02. Admin center labels and platform support can change by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/intune/device-enrollment/guide |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-INTUNE |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Intune Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Enroll devices into Microsoft Intune and explain the MDM model
2. Create device compliance and configuration policies
3. Integrate compliance with Conditional Access and monitor devices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Enrollment and MDM (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Enroll a Windows device in Microsoft Intune; (2) Assign Intune licenses to users so they can enroll
- Common misconception addressed: Expecting devices to receive policies before they are enrolled
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Device enrollment and the MDM certificate | 84 | 4 |
| M01L02 | Enrollment methods and restrictions | 84 | 4 |

### M02 Compliance and configuration policies (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create a device compliance policy for each platform; (2) Configure a device configuration profile
- Common misconception addressed: Confusing tenant-wide compliance policy settings with per-device compliance policies
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Compliance policies | 84 | 4 |
| M02L02 | Configuration profiles | 84 | 4 |

### M03 Conditional Access and monitoring (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Require a compliant device in a Conditional Access policy; (2) Use the Troubleshoot pane to check a user and device
- Common misconception addressed: Expecting Conditional Access to block devices without integrating compliance status
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Conditional Access integration | 72 | 4 |
| M03L02 | Monitoring and troubleshooting | 72 | 4 |

## Integrative case

An admin enrolls Windows devices, creates a compliance policy requiring a PIN and a current OS, and configures Conditional Access to require a compliant device for Microsoft 365 access.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1429-final-protected | 24 | 32 | yes |
| MST-1429-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Enrollment and MDM | 8 |
| Compliance and configuration policies | 8 |
| Conditional Access and monitoring | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1429-Q0001** (single-answer, Select ONE) What does Intune install on a device during enrollment to enforce organizational policies?

- A. An MDM (Mobile Device Management) certificate **(key)**  
  _Rationale:_ Correct: enrollment installs an MDM certificate that lets Intune enforce policy.
- B. A VPN gateway  
  _Rationale:_ A VPN gateway is not installed during Intune enrollment.
- C. A local administrator account  
  _Rationale:_ Enrollment does not create a local admin account.
- D. A BitLocker recovery key only  
  _Rationale:_ A recovery key is not what enables policy enforcement at enrollment.

**MST-1429-Q0002** (multiple-answer, Select TWO) Which TWO statements about Intune device compliance policies are true? (Select TWO.)

- A. They mark a device as compliant or noncompliant **(key)**  
  _Rationale:_ Correct: compliance evaluation marks devices compliant or noncompliant.
- B. Conditional Access can use compliance status to allow or block access **(key)**  
  _Rationale:_ Correct: Conditional Access can require a device be marked compliant.
- C. They physically prevent an operating system from booting  
  _Rationale:_ Incorrect: compliance policies do not block the OS from booting.
- D. They remove the need to enroll devices  
  _Rationale:_ Incorrect: compliance status requires the device to be enrolled.

**MST-1429-Q0003** (single-answer, Select ONE) In compliance policy settings, which option helps ensure only confirmed-compliant devices access resources?

- A. Mark devices with no compliance policy assigned as Not compliant **(key)**  
  _Rationale:_ Correct: this setting treats unassigned devices as noncompliant for Conditional Access.
- B. Set the validity period to 120 days  
  _Rationale:_ Validity period alone does not ensure only compliant devices get access.
- C. Disable Conditional Access  
  _Rationale:_ Disabling Conditional Access would remove the access control.
- D. Mark all devices as compliant by default  
  _Rationale:_ This weakens security rather than ensuring compliance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
