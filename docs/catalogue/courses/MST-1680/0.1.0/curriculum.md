# Mobile Device Security

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1680` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-MDS-001 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Mobile Device Security (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain mobile threats and the mobile attack surface
2. Apply device hardening and secure configuration
3. Describe app security and permission risks
4. Use mobile device management and BYOD controls appropriately
5. Protect mobile data and respond to loss or theft

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Mobile threats (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) List the ways a phone can be attacked; (2) Classify three mobile threats by type
- Common misconception addressed: Assuming phones are inherently safer than computers
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The mobile attack surface | 72 | 6 |
| M01L02 | Common mobile threats and malware | 72 | 6 |

### M02 Device hardening (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set a hardening baseline for a work phone; (2) Explain why timely OS updates matter on mobile
- Common misconception addressed: Delaying updates because they are inconvenient
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Screen locks, encryption and updates | 72 | 6 |
| M02L02 | Secure configuration baselines | 72 | 6 |

### M03 App and permission risks (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Judge whether an app's permissions are excessive; (2) Decide whether sideloading is acceptable in a case
- Common misconception addressed: Granting every permission an app requests without thought
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | App stores, sideloading and vetting | 72 | 6 |
| M03L02 | Permissions and data access | 72 | 6 |

### M04 MDM and BYOD (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose MDM controls for a BYOD scenario; (2) Separate work and personal data on one device
- Common misconception addressed: Enforcing full device control over an employee's personal phone
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Mobile device management capabilities | 72 | 6 |
| M04L02 | BYOD policy and privacy balance | 72 | 6 |

### M05 Data and loss (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a response to a reported lost phone; (2) Decide what to wipe when an employee leaves
- Common misconception addressed: Relying on a short PIN alone to protect a lost device
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Protecting data at rest and in transit | 72 | 6 |
| M05L02 | Responding to loss or theft | 72 | 6 |

## Integrative case

A company lets staff use personal phones for work email and files. Identify the risks, set a baseline for device hardening, decide which controls to enforce through management without overreaching into personal data, and plan what happens when a device is lost or an employee leaves.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1680-final-protected | 25 | 25 | yes |
| MST-1680-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Mobile threats | 5 |
| Device hardening | 5 |
| App and permission risks | 5 |
| MDM and BYOD | 5 |
| Data and loss | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1680-Q0001** (single-answer, Select ONE) A free app requests access to contacts, location, microphone and SMS but only shows a flashlight. What is the best conclusion?

- A. The permissions are excessive for its function and the app is suspicious **(key)**  
  _Rationale:_ Correct: permissions far beyond the stated function are a red flag.
- B. The permissions are normal for any app  
  _Rationale:_ A flashlight needs none of those permissions.
- C. More permissions always mean a better app  
  _Rationale:_ Excess permissions increase risk, not quality.
- D. Permissions have nothing to do with security  
  _Rationale:_ Permissions directly affect what data an app can reach.

**MST-1680-Q0002** (multiple-answer, Select TWO) Which TWO controls best protect data on a lost work phone? (Select TWO.)

- A. Full-device encryption with a strong passcode **(key)**  
  _Rationale:_ Correct: encryption plus a strong passcode protects data at rest.
- B. The ability to remotely wipe the device **(key)**  
  _Rationale:_ Correct: remote wipe removes data if recovery fails.
- C. A four-digit PIN reused as the user's bank PIN  
  _Rationale:_ A weak, reused PIN offers little protection.
- D. Disabling all updates to save battery  
  _Rationale:_ Disabling updates leaves known vulnerabilities open.

**MST-1680-Q0003** (single-answer, Select ONE) In a BYOD programme, what is the main reason to separate work and personal data on a device?

- A. It lets the company protect work data without controlling personal information **(key)**  
  _Rationale:_ Correct: containerisation respects privacy while securing work data.
- B. It makes the phone run faster  
  _Rationale:_ Separation is about data governance, not speed.
- C. It removes the need for any passcode  
  _Rationale:_ A passcode is still required.
- D. It gives the company full control of personal photos  
  _Rationale:_ The point is to avoid, not enable, reaching personal data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
