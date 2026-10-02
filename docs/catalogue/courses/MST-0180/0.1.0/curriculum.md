# Microsoft SC-401: Information Security Administrator Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0180` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | SC-401 |
| Version basis | Skills measured as of October 28, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-SC401 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/sc-401) |
| Legacy IDs | MST-MIC-MS-SC401-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Implement information protection' to the depth the official outline requires
2. Apply the objectives of 'Implement data loss prevention and retention' to the depth the official outline requires
3. Apply the objectives of 'Manage risks, alerts, and activities' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Implement information protection (30–35%)

- Worked applications: (1) Build a custom sensitive info type with EDM; (2) Publish a sensitivity label with encryption and content marking
- Common misconception addressed: Confusing a trainable classifier with an exact data match (EDM) type
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Implement and manage data classification | 120 | 6 |
| M01L02 | Implement and manage sensitivity labels in Microsoft Purview | 120 | 6 |
| M01L03 | Implement information protection for Windows, file shares, and Exchange | 120 | 6 |

### M02 Implement data loss prevention and retention (30–35%)

- Worked applications: (1) Author a DLP policy for Exchange, SharePoint, and Teams; (2) Configure Endpoint DLP with just-in-time protection
- Common misconception addressed: Expecting a retention label and a sensitivity label to do the same job
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Create and configure data loss prevention policies | 120 | 6 |
| M02L02 | Implement and monitor Microsoft Purview Endpoint DLP | 120 | 6 |
| M02L03 | Implement and manage retention | 120 | 6 |

### M03 Manage risks, alerts, and activities (30–35%)

- Worked applications: (1) Configure an Insider Risk Management policy and review cases; (2) Investigate activity with Activity explorer and Audit
- Common misconception addressed: Assuming DSPM for AI needs no prerequisites or roles
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Implement and manage Microsoft Purview Insider Risk Management | 120 | 6 |
| M03L02 | Manage information security alerts and activities | 120 | 6 |
| M03L03 | Protect data used by AI services | 120 | 6 |

## Integrative case

A regulated company protects sensitive data in Microsoft 365 with Purview. Design the solution: classification and sensitivity labels, DLP across workloads and endpoints, retention, insider risk management, and controls for data used by AI services (DSPM for AI); justify the policy design to the compliance lead.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0180-practice-form-A | 45 | 45 | yes |
| MST-0180-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0180-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0180-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Implement information protection | 15 |
| Implement data loss prevention and retention | 15 |
| Manage risks, alerts, and activities | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0180-Q0001** (single-answer, Select ONE) You must detect a specific set of known employee ID values exactly, with no false positives from similar patterns. Which classification method fits best?

- A. Exact Data Match (EDM) based sensitive info type **(key)**  
  _Rationale:_ Correct: EDM matches against a hashed table of exact known values.
- B. A built-in credit card sensitive info type  
  _Rationale:_ That detects card patterns, not your specific ID list.
- C. A trainable classifier  
  _Rationale:_ Trainable classifiers detect categories by example, not exact known values.
- D. A retention label  
  _Rationale:_ Retention labels govern lifecycle, not classification matching.

**MST-0180-Q0002** (single-answer, Select ONE) Which Purview capability prevents sensitive content from being copied to a USB drive on a managed Windows device?

- A. Endpoint DLP **(key)**  
  _Rationale:_ Correct: Endpoint DLP enforces data-loss rules on device actions like USB copy.
- B. A retention policy  
  _Rationale:_ Retention controls how long content is kept, not device egress.
- C. A sensitivity label alone  
  _Rationale:_ A label classifies and can encrypt, but Endpoint DLP enforces the device action.
- D. An eDiscovery case  
  _Rationale:_ eDiscovery finds content for legal review; it does not block USB copy.

**MST-0180-Q0003** (multiple-answer, Select TWO) Which TWO tools help an administrator investigate information-protection and insider-risk activity? (Select TWO.)

- A. Activity explorer **(key)**  
  _Rationale:_ Correct: Activity explorer surfaces label and DLP activity across the estate.
- B. Microsoft Purview Audit **(key)**  
  _Rationale:_ Correct: Purview Audit records and lets you investigate user and admin activities.
- C. Azure Load Balancer  
  _Rationale:_ Load Balancer is a networking service, unrelated to Purview investigation.
- D. A Conditional Access policy  
  _Rationale:_ Conditional Access governs sign-in, not Purview activity investigation.
- E. A OneLake shortcut  
  _Rationale:_ OneLake shortcuts are a Fabric data feature, not an investigation tool.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
