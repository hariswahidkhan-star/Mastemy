# Outlook Productivity

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1427` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Outlook documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/graph/outlook-organize-messages |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-OUTLOOK |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Outlook Productivity (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Organize mail with folders, search, categories and Focused Inbox
2. Automate handling with inbox rules and Quick Steps
3. Manage calendar, meetings, tasks and follow-up flags

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Mail organization (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Organize mail with categories and folders; (2) Train Focused Inbox to surface priority senders
- Common misconception addressed: Filing everything into folders when search would be faster
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Folders, search and categories | 84 | 4 |
| M01L02 | Focused Inbox | 84 | 4 |

### M02 Rules and automation (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create an inbox rule that categorizes by sender; (2) Build a Quick Step for a repeated action
- Common misconception addressed: Expecting one rule to handle complex and/or logic without stacking
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Inbox rules | 84 | 4 |
| M02L02 | Quick Steps and templates | 84 | 4 |

### M03 Calendar and tasks (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Create a meeting from a personal meeting template; (2) Flag an email for follow-up with a reminder
- Common misconception addressed: Assuming inbox rules can forward calendar invites
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Calendar and meetings | 72 | 4 |
| M03L02 | Tasks and follow-up flags | 72 | 4 |

## Integrative case

A professional sets up Focused Inbox, category-based inbox rules, a meeting template, and a follow-up flag workflow to keep a busy mailbox under control.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1427-final-protected | 24 | 32 | yes |
| MST-1427-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Mail organization | 8 |
| Rules and automation | 8 |
| Calendar and tasks | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1427-Q0001** (single-answer, Select ONE) What does Focused Inbox do?

- A. Separates messages into Focused and Other based on learned relevance **(key)**  
  _Rationale:_ Correct: Focused Inbox classifies mail into Focused and Other and learns over time.
- B. Deletes all low-priority mail  
  _Rationale:_ It separates, it does not delete mail.
- C. Encrypts the mailbox  
  _Rationale:_ Focused Inbox is organization, not encryption.
- D. Creates Azure resource groups  
  _Rationale:_ Resource groups are an Azure concept, unrelated to Outlook.

**MST-1427-Q0002** (multiple-answer, Select TWO) Which TWO conditions can modern Outlook inbox rules use? (Select TWO.)

- A. Messages that come from outside your organization **(key)**  
  _Rationale:_ Correct: recent inbox rules support an external-sender condition.
- B. A category as a condition **(key)**  
  _Rationale:_ Correct: categories can be used as inbox-rule conditions.
- C. A storage redundancy tier  
  _Rationale:_ Redundancy tiers are Azure Storage settings, not mail rules.
- D. A Bicep parameter  
  _Rationale:_ Bicep parameters are IaC, unrelated to inbox rules.

**MST-1427-Q0003** (single-answer, Select ONE) A user wants a repeatable multi-action shortcut, such as moving and categorizing a message in one click. What should they use?

- A. A Quick Step **(key)**  
  _Rationale:_ Correct: Quick Steps bundle several actions into one click.
- B. A storage account  
  _Rationale:_ Storage accounts are Azure infrastructure, not an Outlook feature.
- C. An NSG  
  _Rationale:_ NSGs are networking controls, unrelated to Outlook.
- D. A VNet peering  
  _Rationale:_ Peering is an Azure networking concept, not an Outlook shortcut.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
