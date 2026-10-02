# Microsoft MS-700: Teams Administrator Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0183` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | MS-700 |
| Version basis | Skills measured as of October 27, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-MS700 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/ms-700) |
| Legacy IDs | MST-MIC-MS-MS700-001 |
| Planned time | T = 1600 min; instruction I = 1280 min (80%); assessment A = 320 min (20%) |
| Assessment split | lesson checks 60 / module checks 140 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Configure and manage a Teams environment' to the depth the official outline requires
2. Apply the objectives of 'Manage teams, channels, chats, and apps' to the depth the official outline requires
3. Apply the objectives of 'Manage meetings and calling' to the depth the official outline requires
4. Apply the objectives of 'Monitor, report on, and troubleshoot Teams' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Configure and manage a Teams environment (40–45%)

- Worked applications: (1) Size network bandwidth with the Teams Network Planner; (2) Set a Microsoft 365 group naming and expiration policy
- Common misconception addressed: Confusing external access (federation) with guest access
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Plan network settings for Teams | 107 | 6 |
| M01L02 | Manage security and compliance settings for Teams | 107 | 6 |
| M01L03 | Plan and implement governance for Teams | 107 | 6 |
| M01L04 | Configure and manage external collaboration | 107 | 6 |
| M01L05 | Manage Teams clients and devices | 107 | 6 |

### M02 Manage teams, channels, chats, and apps (20–25%)

- Worked applications: (1) Create a team from a template and manage membership; (2) Configure a messaging policy and private channels
- Common misconception addressed: Treating a private channel and a shared channel as the same thing
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Create and manage teams | 107 | 6 |
| M02L02 | Manage channels and chats | 107 | 6 |
| M02L03 | Manage apps for Teams | 107 | 6 |

### M03 Manage meetings and calling (15–20%)

- Worked applications: (1) Create a meeting policy and template; (2) Assign phone numbers and configure a call queue
- Common misconception addressed: Assuming a webinar and a town hall have identical capabilities
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Manage meetings and events | 106 | 6 |
| M03L02 | Manage phone numbers and services for Teams Phone | 106 | 6 |

### M04 Monitor, report on, and troubleshoot Teams (15–20%)

- Worked applications: (1) Report on call quality with CQD; (2) Clear the Teams client cache to fix a sign-in issue
- Common misconception addressed: Reading usage reports as real-time call-quality diagnostics
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Monitor and report on Teams | 106 | 6 |
| M04L02 | Troubleshoot audio, video, and client issues | 106 | 6 |

## Integrative case

An admin rolls out Microsoft Teams enterprise-wide. Design the solution: network readiness, security/compliance and governance policies, external and guest collaboration, team/channel/app management, meetings and Teams Phone, and monitoring/troubleshooting; justify the governance model to the collaboration owner.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0183-practice-form-A | 45 | 45 | yes |
| MST-0183-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0183-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0183-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Configure and manage a Teams environment | 19 |
| Manage teams, channels, chats, and apps | 10 |
| Manage meetings and calling | 8 |
| Monitor, report on, and troubleshoot Teams | 8 |

Minimum reviewed item bank: 604 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0183-Q0001** (single-answer, Select ONE) A partner organization's users must be able to chat with your users using their own Teams identities. Which capability do you configure?

- A. External access (federation) **(key)**  
  _Rationale:_ Correct: external access federates with other Teams/Skype orgs using their own identities.
- B. Guest access  
  _Rationale:_ Guest access adds external users into your tenant as guests, not federation.
- C. A sensitivity label  
  _Rationale:_ Labels classify content; they do not enable cross-org chat.
- D. A messaging policy  
  _Rationale:_ Messaging policies control message features, not cross-org federation.

**MST-0183-Q0002** (single-answer, Select ONE) Inbound support calls must be distributed to a group of agents with hold music and overflow handling. Which Teams Phone feature do you configure?

- A. A call queue **(key)**  
  _Rationale:_ Correct: call queues distribute inbound calls to agents with music and overflow rules.
- B. A meeting template  
  _Rationale:_ Meeting templates standardize meeting settings, not call distribution.
- C. A messaging policy  
  _Rationale:_ Messaging policies govern chat, not phone call routing.
- D. A sensitivity label  
  _Rationale:_ Labels classify content; they do not route calls.

**MST-0183-Q0003** (multiple-answer, Select TWO) Which TWO channel types can restrict membership to a subset of people? (Select TWO.)

- A. Private channel **(key)**  
  _Rationale:_ Correct: private channels are visible only to their specific members.
- B. Shared channel **(key)**  
  _Rationale:_ Correct: shared channels have their own membership, including external B2B direct connect.
- C. Standard channel  
  _Rationale:_ Standard channels are open to all team members, not a subset.
- D. A meeting policy  
  _Rationale:_ A meeting policy is not a channel type.
- E. A call queue  
  _Rationale:_ A call queue is a telephony feature, not a channel type.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
