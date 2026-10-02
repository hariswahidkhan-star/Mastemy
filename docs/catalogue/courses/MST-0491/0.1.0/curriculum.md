# ChatGPT Business Workspace Administration and Adoption

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0491` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT Business Workspace Administration and Adoption (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up and configure a ChatGPT business workspace for a team
2. Manage members, roles and shared resources
3. Drive safe, measurable adoption across a team
4. Apply data-control and compliance settings to the workspace

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on administration in a live workspace and organisation-specific policy judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configurations or peer review.

## Modules

### M01 Workspace setup (25%)

- Worked applications: (1) Plan the member and role structure for a 30-person workspace; (2) Match three teams to the right billing tier for the features they need
- Common misconception addressed: Assuming every team needs the most expensive tier
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Creating a workspace and inviting members | 120 | 6 |
| M01L02 | Billing tiers and feature availability | 120 | 6 |

### M02 Members and roles (25%)

- Worked applications: (1) Assign least-privilege roles to admins and members; (2) Set up a shared project so a team reuses the same instructions
- Common misconception addressed: Giving every member admin rights for convenience
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Assigning roles and permissions | 120 | 6 |
| M02L02 | Shared projects and resources | 120 | 6 |

### M03 Driving adoption (25%)

- Worked applications: (1) Define two adoption metrics beyond raw login counts; (2) Design a two-week pilot with a review checkpoint
- Common misconception addressed: Measuring success only by number of messages sent
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Measuring usage and value | 120 | 6 |
| M03L02 | Running a safe pilot and rollout | 120 | 6 |

### M04 Data control and compliance (25%)

- Worked applications: (1) Configure data-retention and training settings for the workspace; (2) Write an acceptable-use rule for confidential data
- Common misconception addressed: Assuming workspace defaults already meet the organisation's compliance needs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Workspace data-retention and training settings | 120 | 6 |
| M04L02 | Acceptable-use and review policies | 120 | 6 |

## Integrative case

An operations manager is asked to roll out a ChatGPT business workspace to 30 staff across three teams: they choose tiers by feature need, set least-privilege roles, configure data-retention and acceptable-use policies, run a two-week pilot with meaningful adoption metrics, and define a review checkpoint before full rollout.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0491-final-protected | 72 | 72 | yes |
| MST-0491-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Workspace setup | 18 |
| Members and roles | 18 |
| Driving adoption | 18 |
| Data control and compliance | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0491-Q0001** (single-answer, Select ONE) Which role assignment follows least-privilege for a team member who only needs to use shared projects?

- A. A standard member role without workspace-admin rights **(key)**  
  _Rationale:_ Correct: least-privilege grants only the access the task requires.
- B. Full workspace administrator for everyone  
  _Rationale:_ Granting admin to all violates least-privilege and increases risk.
- C. Billing owner for every member  
  _Rationale:_ Billing ownership is unrelated to using shared projects and over-grants access.
- D. No account at all  
  _Rationale:_ Removing access prevents the member from doing their job.

**MST-0491-Q0002** (single-answer, Select ONE) Which is the better measure of successful ChatGPT adoption on a team?

- A. Hours saved on a defined recurring task after rollout **(key)**  
  _Rationale:_ Correct: a value-based outcome measures real benefit, not mere activity.
- B. Total number of messages sent per day  
  _Rationale:_ Message volume is activity, not value, and is easy to inflate.
- C. How many people logged in once  
  _Rationale:_ A single login does not indicate sustained, valuable use.
- D. The model version in use  
  _Rationale:_ Model version is not an adoption outcome.

**MST-0491-Q0003** (multiple-answer, Select TWO) Which TWO workspace settings should an admin confirm for a team handling confidential data? (Select TWO)

- A. Data-retention configuration for the workspace **(key)**  
  _Rationale:_ Correct: retention settings govern how long and whether data is kept.
- B. Whether workspace data is excluded from model training per the tier's controls **(key)**  
  _Rationale:_ Correct: confirming training/data-use controls is central to handling confidential data.
- C. The colour theme of the interface  
  _Rationale:_ Theme has no bearing on data confidentiality.
- D. The number of saved chats per user  
  _Rationale:_ Chat count is not a confidentiality control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

