# Power Automate for Microsoft 365 Approval Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0679` v0.1.0 | Batch 12 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Power Automate approvals documentation read via the Microsoft Learn MCP on 2026-10-02. Specific product UI labels can vary by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/power-automate/modern-approvals |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-PAAPPR |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Power Automate for Microsoft 365 Approval Workflows (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain Power Automate triggers, actions and the approvals action
2. Build a basic approval flow with conditions and email notifications
3. Design sequential, parallel and group approval patterns

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Flows and the approvals action (MASTEMY-DESIGN 34%, design weight)

- Worked applications: (1) Choose a trigger for 'when an item is created' in SharePoint; (2) Configure Title, Details and Assigned To on an approval action
- Common misconception addressed: Confusing an automated trigger with a manual trigger for an event-driven flow
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Triggers, actions and connectors | 160 | 8 |
| M01L02 | The Start and wait for an approval action | 160 | 8 |

### M02 Conditions and notifications (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Build a condition that checks whether the response equals 'Approve'; (2) Send a different email on approval and on rejection
- Common misconception addressed: Forgetting the rejection branch so rejected requests are never handled
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Branching with conditions on the approver response | 160 | 8 |
| M02L02 | Sending email and updating records | 160 | 8 |

### M03 Advanced approval patterns (MASTEMY-DESIGN 33%, design weight)

- Worked applications: (1) Design a two-stage sequential approval (manager then director); (2) Send a 'first to respond' approval to a Microsoft 365 group
- Common misconception addressed: Assuming group approval requires every member to respond when 'first to respond' needs only one
- Module check: 28 items / 28 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sequential and parallel approvals | 160 | 8 |
| M03L02 | Approvals to Microsoft 365 groups | 160 | 8 |

## Integrative case

A maker builds a vacation-request approval flow: triggers on a new SharePoint list item, starts and waits for an approval, branches on the decision with a condition, emails the requester, and updates the list, then extends it to a sequential manager approval.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0679-final-protected | 48 | 64 | yes |
| MST-0679-final-alternate | 48 | 64 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Flows and the approvals action | 16 |
| Conditions and notifications | 16 |
| Advanced approval patterns | 16 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0679-Q0001** (single-answer, Select ONE) Which Power Automate action lets a flow pause until an approver responds before continuing?

- A. Start and wait for an approval **(key)**  
  _Rationale:_ Correct: this action pauses the flow until the approval is resolved.
- B. Send an email (V2)  
  _Rationale:_ Sending email notifies someone but does not wait for an approval decision.
- C. Get manager (V2)  
  _Rationale:_ This retrieves a manager but does not wait for approval.
- D. Compose  
  _Rationale:_ Compose stores a value and does not handle approvals.

**MST-0679-Q0002** (multiple-answer, Select TWO) Which TWO statements about sending an approval to a Microsoft 365 group with 'First to respond' are correct? (Select TWO.)

- A. Only one member of the group needs to respond **(key)**  
  _Rationale:_ Correct: with first-to-respond, a single member's response represents the group.
- B. The group must be mail-enabled to receive email notifications **(key)**  
  _Rationale:_ Correct: only mail-enabled groups receive the email notification.
- C. Every member of the group must approve  
  _Rationale:_ Incorrect: that would be an 'Everyone must respond' pattern, not first-to-respond.
- D. Teams notifications are sent to the whole group  
  _Rationale:_ Incorrect: Teams notifications are not sent for group approvals.

**MST-0679-Q0003** (single-answer, Select ONE) After an approval resolves, what is the purpose of adding a Condition action on the approver response?

- A. To run different actions depending on whether the request was approved or rejected **(key)**  
  _Rationale:_ Correct: a condition branches the flow based on the response.
- B. To pause the flow a second time  
  _Rationale:_ A condition does not wait; it branches.
- C. To create the approval request  
  _Rationale:_ The approval action, not a condition, creates the request.
- D. To connect to SharePoint  
  _Rationale:_ Connection is handled by the connector, not a condition.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
