# ChatGPT Connected-App Workflows and Approval Controls

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0493` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam | none - Mastemy skills course; no external exam or official syllabus |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT Connected-App Workflows and Approval Controls (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Connect ChatGPT to external apps and data sources safely
2. Design workflows that chain connected actions with human checkpoints
3. Configure approval and least-privilege controls for connected actions
4. Apply monitoring and revocation controls to connected-app risk

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on connector configuration, the behaviour of live integrations, and operational judgement on approving actions are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configurations or peer review.

## Modules

### M01 Connecting apps (25%)

- Worked applications: (1) Scope a connector so it can read one folder but not the whole drive; (2) List what a given connection can and cannot do
- Common misconception addressed: Granting a connector broad write access when only read is needed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How connectors and app access work | 120 | 6 |
| M01L02 | Scoping a connection to least privilege | 120 | 6 |

### M02 Designing connected workflows (25%)

- Worked applications: (1) Design a workflow that drafts an email but requires approval to send; (2) Insert a human checkpoint before any irreversible action
- Common misconception addressed: Letting a workflow perform write actions with no approval step
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chaining read and write actions | 120 | 6 |
| M02L02 | Placing human checkpoints before writes | 120 | 6 |

### M03 Approval controls (25%)

- Worked applications: (1) Add an approval gate for an action that moves money or data; (2) Separate a read-only role from a write-enabled role
- Common misconception addressed: Treating read and write permissions as a single combined grant
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Approval gates for sensitive actions | 120 | 6 |
| M03L02 | Separating read from write permissions | 120 | 6 |

### M04 Monitoring and revocation (25%)

- Worked applications: (1) Set up monitoring for connected-action activity; (2) Revoke a connector's access after a project ends
- Common misconception addressed: Leaving connectors authorised indefinitely after they are no longer needed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Monitoring connected-action activity | 120 | 6 |
| M04L02 | Revoking access when risk changes | 120 | 6 |

## Integrative case

An IT automation lead connects ChatGPT to the team's document store and email to speed up routine work: they scope each connector to least privilege, design workflows where drafting is automated but any send or write requires human approval, monitor connected-action activity, and revoke access when a project ends.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy-designed skills course; form length set from the assessment time budget, not an external exam.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0493-final-protected | 72 | 72 | yes |
| MST-0493-final-alternate | 72 | 72 | no (optional) |

| Domain | Items per form |
|---|---|
| Connecting apps | 18 |
| Designing connected workflows | 18 |
| Approval controls | 18 |
| Monitoring and revocation | 18 |

Minimum reviewed item bank: 408 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0493-Q0001** (single-answer, Select ONE) A workflow uses ChatGPT to draft and then send customer emails automatically. What control most reduces risk?

- A. A human approval checkpoint before any email is sent **(key)**  
  _Rationale:_ Correct: a human gate before an irreversible external action limits the impact of errors.
- B. Using a longer system prompt  
  _Rationale:_ Prompt length does not control an irreversible action.
- C. Sending from the newest model  
  _Rationale:_ Model version does not add an approval control.
- D. Increasing the sending rate limit  
  _Rationale:_ Raising limits increases, not reduces, risk.

**MST-0493-Q0002** (single-answer, Select ONE) Which connector configuration best follows least privilege for a summarisation task over one project folder?

- A. Read-only access scoped to that single folder **(key)**  
  _Rationale:_ Correct: read-only, narrowly scoped access grants only what the task needs.
- B. Full read-write access to the entire drive  
  _Rationale:_ This grants far more than the task requires.
- C. Admin access to the whole workspace  
  _Rationale:_ Workspace admin is grossly over-privileged for summarisation.
- D. Write access to all folders  
  _Rationale:_ Write access is unnecessary and risky for a read task.

**MST-0493-Q0003** (multiple-answer, Select TWO) Which TWO practices reduce standing risk from connected apps over time? (Select TWO)

- A. Monitor connected-action activity **(key)**  
  _Rationale:_ Correct: monitoring surfaces misuse or anomalies in connected actions.
- B. Revoke connector access when it is no longer needed **(key)**  
  _Rationale:_ Correct: removing unused access reduces the standing attack surface.
- C. Keep every connector authorised permanently  
  _Rationale:_ Permanent authorisation grows standing risk.
- D. Grant write access by default to save time  
  _Rationale:_ Default write access increases risk and violates least privilege.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.

