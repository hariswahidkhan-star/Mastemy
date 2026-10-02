# Chrome Enterprise Administration Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1475` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official Google Cloud documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Chrome Enterprise Administration Basics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Chrome Enterprise management and the Admin console
2. Apply user, browser and device policies
3. Manage extensions and security controls
4. Enroll and manage ChromeOS devices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Chrome Enterprise overview (MASTEMY-DESIGN 25%)

- Worked applications: (1) Create an OU structure for two departments; (2) Decide where to apply a policy in the OU tree
- Common misconception addressed: Thinking a policy set on a child OU is overridden by the parent by default
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Chrome Enterprise and the Admin console | 72 | 7 |
| M01L02 | Organizational units and policy scope | 72 | 7 |

### M02 Browser and user policies (MASTEMY-DESIGN 25%)

- Worked applications: (1) Enforce a managed homepage and bookmarks; (2) Restrict sign-in to the company domain
- Common misconception addressed: Confusing user policies with device/browser policies
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Managed Chrome browser policies | 72 | 7 |
| M02L02 | User settings and sign-in controls | 72 | 7 |

### M03 Extensions and security (MASTEMY-DESIGN 25%)

- Worked applications: (1) Force-install an approved extension; (2) Block an extension by permission
- Common misconception addressed: Assuming blocking the store is enough without an extension policy
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Extension allowlisting and force-install | 72 | 7 |
| M03L02 | Security policies and Safe Browsing | 72 | 7 |

### M04 ChromeOS device management (MASTEMY-DESIGN 25%)

- Worked applications: (1) Enroll a ChromeOS device into the org; (2) Configure an auto-update policy
- Common misconception addressed: Believing a device is managed before it is enrolled
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Device enrollment | 72 | 7 |
| M04L02 | Device policies and updates | 72 | 7 |

## Integrative case

An IT admin must standardize 300 managed browsers and 100 ChromeOS devices. Configure organizational units, apply browser and security policies, control extensions by policy, and enroll devices with the right settings.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1475-final-protected | 28 | 35 | yes |
| MST-1475-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Chrome Enterprise overview | 7 |
| Browser and user policies | 7 |
| Extensions and security | 7 |
| ChromeOS device management | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1475-Q0001** (single-answer, Select ONE) In the Google Admin console, what is the main purpose of organizational units (OUs)?

- A. To scope policies to groups of users or devices **(key)**  
  _Rationale:_ Correct: OUs let admins apply different policies to different sets.
- B. To store browsing history centrally  
  _Rationale:_ OUs do not store user browsing history.
- C. To replace IAM roles  
  _Rationale:_ OUs are not cloud IAM roles.
- D. To host web pages  
  _Rationale:_ OUs do not host content.

**MST-1475-Q0002** (multiple-answer, Select TWO) Which TWO are ways to control extensions via Chrome policy? (Select TWO.)

- A. Force-install a specific approved extension **(key)**  
  _Rationale:_ Correct: force-install deploys approved extensions.
- B. Block extensions requesting a certain permission **(key)**  
  _Rationale:_ Correct: permission-based blocking is a supported control.
- C. Physically removing the USB port  
  _Rationale:_ Irrelevant to extension policy.
- D. Deleting the user's email account  
  _Rationale:_ Not an extension control.

**MST-1475-Q0003** (single-answer, Select ONE) Before an admin's ChromeOS device policies take effect, the device must first be:

- A. Enrolled into the organization **(key)**  
  _Rationale:_ Correct: enrollment brings the device under management.
- B. Factory reset every morning  
  _Rationale:_ Daily reset is not required for management.
- C. Connected to a VPN only  
  _Rationale:_ A VPN alone does not enroll a device.
- D. Registered in BigQuery  
  _Rationale:_ BigQuery is unrelated to device enrollment.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
