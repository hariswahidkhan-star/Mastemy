# Microsoft MD-102: Endpoint Administrator Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0181` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | MD-102 |
| Version basis | Skills measured as of October 27, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-MD102 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/md-102) |
| Legacy IDs | MST-MIC-MS-MD102-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 65 / module checks 175 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Prepare infrastructure for devices' to the depth the official outline requires
2. Apply the objectives of 'Manage and maintain devices' to the depth the official outline requires
3. Apply the objectives of 'Protect devices' to the depth the official outline requires
4. Apply the objectives of 'Manage and secure applications' to the depth the official outline requires
5. Apply the objectives of 'Optimize endpoint operations by using automation, monitoring, and reporting' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Prepare infrastructure for devices (20–25%)

- Worked applications: (1) Choose Entra join vs registration for corporate laptops; (2) Configure automatic enrollment and a compliance policy
- Common misconception addressed: Confusing Microsoft Entra join with device registration
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Add devices to Microsoft Entra ID | 111 | 6 |
| M01L02 | Enroll devices to Microsoft Intune | 111 | 6 |
| M01L03 | Implement identity and compliance | 111 | 6 |

### M02 Manage and maintain devices (25–30%)

- Worked applications: (1) Deploy Windows with a user-driven Autopilot profile; (2) Build a configuration profile from imported ADMX
- Common misconception addressed: Assuming an Autopilot deployment profile and a device-preparation policy are the same
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Deploy and upgrade Windows clients by using cloud-based tools | 111 | 6 |
| M02L02 | Plan and implement device configuration profiles | 111 | 6 |
| M02L03 | Implement Microsoft Intune Suite add-on capabilities | 111 | 6 |
| M02L04 | Perform remote actions on devices | 111 | 6 |

### M03 Protect devices (15–20%)

- Worked applications: (1) Create a BitLocker disk encryption policy with key escrow; (2) Configure update rings and Windows Autopatch
- Common misconception addressed: Thinking a security baseline replaces a dedicated antivirus policy
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Configure endpoint security | 111 | 6 |
| M03L02 | Manage device updates | 111 | 6 |

### M04 Manage and secure applications (15–20%)

- Worked applications: (1) Deploy a Win32 app with detection rules; (2) Apply an app protection policy to BYOD
- Common misconception addressed: Expecting app protection policies to require full device enrollment
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Deploy and update apps | 111 | 6 |
| M04L02 | Plan and implement app protection and app configuration policies | 110 | 6 |

### M05 Optimize endpoint operations by using automation, monitoring, and reporting (10–15%)

- Worked applications: (1) Automate a task with PowerShell and Microsoft Graph; (2) Analyze device health with Endpoint Analytics
- Common misconception addressed: Reading Endpoint Analytics scores as compliance status
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Automate management tasks | 110 | 6 |
| M05L02 | Monitor and optimize health | 110 | 6 |

## Integrative case

An IT team modernizes endpoint management with Intune. Design the solution: Entra join and enrollment, Autopilot deployment and configuration profiles, endpoint security and update rings, app deployment and BYOD app protection, and automation/monitoring; justify the modern-workplace plan to the endpoint owner.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0181-practice-form-A | 45 | 45 | yes |
| MST-0181-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0181-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0181-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Prepare infrastructure for devices | 10 |
| Manage and maintain devices | 13 |
| Protect devices | 8 |
| Manage and secure applications | 8 |
| Optimize endpoint operations by using automation, monitoring, and reporting | 6 |

Minimum reviewed item bank: 686 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0181-Q0001** (single-answer, Select ONE) Corporate Windows laptops must be fully managed and sign in with organizational Entra credentials. Which device identity state is required?

- A. Microsoft Entra joined **(key)**  
  _Rationale:_ Correct: Entra join makes the device org-owned and signs in with Entra credentials.
- B. Microsoft Entra registered  
  _Rationale:_ Registration is for personal (BYOD) devices with limited management.
- C. Workgroup only  
  _Rationale:_ A workgroup device is not managed by Entra at all.
- D. Hybrid unmanaged  
  _Rationale:_ This is not a valid managed corporate join state for cloud-first management.

**MST-0181-Q0002** (single-answer, Select ONE) Which cloud-based tool provisions a new Windows device straight from the OEM into a managed, ready-to-use state?

- A. Windows Autopilot **(key)**  
  _Rationale:_ Correct: Autopilot provisions devices from OEM state into a managed configuration.
- B. BitLocker  
  _Rationale:_ BitLocker encrypts disks; it does not provision devices.
- C. Endpoint Analytics  
  _Rationale:_ Endpoint Analytics reports on health; it does not provision devices.
- D. A compliance policy  
  _Rationale:_ Compliance policies evaluate state; they do not perform provisioning.

**MST-0181-Q0003** (multiple-answer, Select TWO) Which TWO Intune capabilities protect data on devices? (Select TWO.)

- A. Disk encryption policy (BitLocker) with key escrow **(key)**  
  _Rationale:_ Correct: BitLocker policies encrypt the disk and escrow recovery keys.
- B. App protection policy for managed apps **(key)**  
  _Rationale:_ Correct: app protection policies protect org data inside apps, including on BYOD.
- C. A OneLake shortcut  
  _Rationale:_ OneLake shortcuts are a Fabric data feature, not device protection.
- D. A Conditional Access named location only  
  _Rationale:_ A named location is a condition input, not by itself device data protection.
- E. An Azure Firewall rule  
  _Rationale:_ Azure Firewall protects network traffic, not on-device data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
