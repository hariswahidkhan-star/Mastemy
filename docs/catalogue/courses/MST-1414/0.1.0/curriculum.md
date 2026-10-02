# Microsoft Copilot & Agent Administration Fundamentals (AB-900) Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1414` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AB-900 |
| Version basis | Skills measured as of 2026-10-14 (Microsoft Learn study guide for AB-900, retrieved 2026-10-02). |
| Evidence | **verified-official-source** - https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ab-900 |
| Legacy IDs | MST-MIC-MS-AB900-001 |
| Planned time | T = 1080 min; instruction I = 864 min (80%); assessment A = 216 min (20%) |
| Assessment split | lesson checks 54 / module checks 76 / cumulative 86 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Identify the core features and objects of Microsoft 365 services
2. Understand data protection and governance tasks for Microsoft 365 and Copilot
3. Perform basic administrative tasks for Copilot and agents

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Identify the core features and objects of Microsoft 365 services (30-35%)

- Worked applications: (1) Match admin tasks to the correct admin center (M365, Exchange, SharePoint, Teams); (2) Assign the right SharePoint site roles and permissions
- Common misconception addressed: Treating the Microsoft 365 admin center as the place to configure every workload setting
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Identify the core objects of Microsoft 365 services | 96 | 6 |
| M01L02 | Understand Microsoft 365 security principles | 96 | 6 |
| M01L03 | Identify core security features (Entra ID, Conditional Access, SSO) | 96 | 6 |

### M02 Understand data protection and governance tasks for Microsoft 365 and Copilot (35-40%)

- Worked applications: (1) Apply a sensitivity label and a DLP policy; (2) Configure retention and data lifecycle
- Common misconception addressed: Believing a sensitivity label encrypts by default without configuration
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Understand Microsoft Purview | 111 | 6 |
| M02L02 | Understand data security implications of Copilot | 111 | 6 |
| M02L03 | Identify and monitor oversharing and governance risks | 110 | 6 |

### M03 Perform basic administrative tasks for Copilot and agents (25-30%)

- Worked applications: (1) Compare built-in Copilot vs custom agents and licence models; (2) Identify use cases for Researcher and Analyst agents
- Common misconception addressed: Confusing the monthly licence model with pay-as-you-go billing
- Module check: 22 items / 22 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Understand features and capabilities of Copilot and agents | 82 | 6 |
| M03L02 | Perform basic administrative tasks for Copilot | 81 | 6 |
| M03L03 | Perform basic administrative tasks for agents | 81 | 6 |

## Integrative case

A 400-seat firm rolls out Microsoft 365 Copilot: map core M365 objects and security features, apply Purview sensitivity labels and DLP to prevent oversharing before Copilot grounding, then assign licences, monitor adoption, and govern a custom agent.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1414-practice-form-A | 40 | 40 | yes |
| MST-1414-practice-form-B | 40 | 40 | no (optional practice) |
| MST-1414-practice-form-C | 40 | 40 | no (optional practice) |
| MST-1414-final-protected | 40 | 40 | yes |

| Domain | Items per form |
|---|---|
| Identify the core features and objects of Microsoft 365 services | 13 |
| Understand data protection and governance tasks for Microsoft 365 and Copilot | 16 |
| Perform basic administrative tasks for Copilot and agents | 11 |

Minimum reviewed item bank: 420 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1414-Q0001** (single-answer, Select ONE) Before enabling Microsoft 365 Copilot broadly, an admin worries Copilot could surface over-shared SharePoint files. Which Purview-aligned step most directly reduces this risk?

- A. Apply sensitivity labels and run a SharePoint data access governance report **(key)**  
  _Rationale:_ Correct: labeling and the governance report address oversharing that Copilot would otherwise ground on.
- B. Assign more Copilot licences  
  _Rationale:_ Licensing enables Copilot; it does nothing about oversharing.
- C. Disable Microsoft Graph  
  _Rationale:_ Graph grounding is core to Copilot; disabling it is neither possible nor a governance control.
- D. Turn off audit logging  
  _Rationale:_ Removing audit logging reduces visibility and worsens governance.

**MST-1414-Q0002** (single-answer, Select ONE) Which admin center is the correct place to manage mailboxes and distribution groups?

- A. SharePoint admin center  
  _Rationale:_ SharePoint admin manages sites and libraries, not mailboxes.
- B. Exchange admin center **(key)**  
  _Rationale:_ Correct: Exchange admin center manages mailboxes and distribution groups.
- C. Teams admin center  
  _Rationale:_ Teams admin manages teams, channels and policies.
- D. Microsoft Entra admin center  
  _Rationale:_ Entra manages identity objects, not mailbox configuration.

**MST-1414-Q0003** (multiple-answer, Select TWO) Which TWO are valid basic administrative tasks for Copilot and agents? (Select TWO)

- A. Assign Copilot licences to users **(key)**  
  _Rationale:_ Correct: licence assignment is a core Copilot admin task.
- B. Monitor agent usage via the Microsoft 365 and Power Platform admin centers **(key)**  
  _Rationale:_ Correct: agent monitoring spans both admin centers.
- C. Write the model weights used by Copilot  
  _Rationale:_ Admins do not author the underlying model weights.
- D. Disable Zero Trust for faster sign-in  
  _Rationale:_ Weakening Zero Trust is not a sanctioned administrative task.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
