# Power Automate Cloud Flows Basics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1426` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Power Automate cloud flows documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/power-automate/triggers-introduction |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-POWERAUTOMATE |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Power Automate Cloud Flows Basics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain triggers and the main cloud flow types
2. Add actions and connectors to build a flow
3. Test flows, read run history and manage sharing

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Triggers and flow types (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create an automated flow triggered by a new email; (2) Create a scheduled flow that runs weekly
- Common misconception addressed: Choosing a scheduled trigger when an event-based trigger is needed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Automated, instant and scheduled flows | 84 | 4 |
| M01L02 | Choosing the right trigger | 84 | 4 |

### M02 Actions and connectors (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Add a SharePoint action and map dynamic content; (2) Post an adaptive message to a Teams channel
- Common misconception addressed: Hardcoding values instead of using dynamic content from the trigger
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Adding actions and connectors | 84 | 4 |
| M02L02 | Dynamic content and expressions basics | 84 | 4 |

### M03 Testing and management (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Test a flow and inspect a failed run; (2) Share a flow as a co-owner
- Common misconception addressed: Assuming a saved flow runs without at least one action
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Testing and run history | 72 | 4 |
| M03L02 | Managing and sharing flows | 72 | 4 |

## Integrative case

An analyst builds a cloud flow that saves email attachments to SharePoint and notifies a Teams channel, then tests it with run history and shares it with a colleague.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1426-final-protected | 24 | 32 | yes |
| MST-1426-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Triggers and flow types | 8 |
| Actions and connectors | 8 |
| Testing and management | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1426-Q0001** (single-answer, Select ONE) What must every cloud flow contain to be saved?

- A. At least a trigger and one action **(key)**  
  _Rationale:_ Correct: a cloud flow needs a trigger and at least one action to be saved.
- B. A Bicep file  
  _Rationale:_ Bicep is an Azure IaC tool, not required for flows.
- C. A storage account  
  _Rationale:_ A storage account is not required to save a flow.
- D. Three approvals  
  _Rationale:_ Approvals are optional actions, not a save requirement.

**MST-1426-Q0002** (multiple-answer, Select TWO) Which TWO are valid Power Automate cloud flow types? (Select TWO.)

- A. Automated **(key)**  
  _Rationale:_ Correct: automated flows run when a trigger event occurs.
- B. Scheduled **(key)**  
  _Rationale:_ Correct: scheduled flows run on a defined recurrence.
- C. Redundant-geo  
  _Rationale:_ GRS is an Azure Storage redundancy option, not a flow type.
- D. Conditional-access  
  _Rationale:_ Conditional Access is an Entra feature, not a flow type.

**MST-1426-Q0003** (single-answer, Select ONE) Where do you confirm whether a flow succeeded or failed after it ran?

- A. The flow's run history **(key)**  
  _Rationale:_ Correct: run history shows each run's status and lets you inspect failures.
- B. The Azure portal cost blade  
  _Rationale:_ Cost management does not show flow run status.
- C. An NSG rule  
  _Rationale:_ NSGs are networking controls, not flow diagnostics.
- D. A storage access tier  
  _Rationale:_ Access tiers are unrelated to flow run status.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
