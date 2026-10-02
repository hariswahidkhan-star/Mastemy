# Microsoft Lists: Operational Tracking and Register Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0671` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Lists documentation read via the Microsoft Learn MCP on 2026-10-02. Specific portal and UI labels can vary by release channel and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/microsoftteams/manage-lists-app |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-LISTS |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Lists: Operational Tracking and Register Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Create lists and columns from templates or scratch
2. Build views and formatting for operational tracking
3. Configure rules and alerts to keep teams in sync
4. Integrate Lists with Teams and SharePoint

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Lists and columns (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create an issue-tracker list from a template; (2) Add a choice column with validation
- Common misconception addressed: Adding hundreds of columns and hitting the per-item byte limit
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Create lists and templates | 120 | 5 |
| M01L02 | Column types and validation | 120 | 5 |

### M02 Views and formatting (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a filtered view for open issues; (2) Apply conditional formatting to highlight overdue items
- Common misconception addressed: Relying on one default view for every audience
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Views and filtering | 120 | 5 |
| M02L02 | Formatting and forms | 120 | 5 |

### M03 Rules and alerts (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a rule to notify an owner when status changes; (2) Set a reminder based on a due-date column
- Common misconception addressed: Assuming rules can perform complex multi-step automation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Rules and notifications | 120 | 5 |
| M03L02 | Alerts and reminders | 120 | 5 |

### M04 Integration (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add a list as a tab in a Teams channel; (2) Customise a list form in Power Apps
- Common misconception addressed: Thinking a Teams list is separate from its SharePoint site
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lists in Microsoft Teams | 120 | 5 |
| M04L02 | Lists with SharePoint and Power Apps | 120 | 5 |

## Integrative case

An operations team builds an issue-tracker list with column validation, filtered views, a rule-based alert, surfaced as a tab in a Teams channel.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0671-final-protected | 30 | 40 | yes |
| MST-0671-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Lists and columns | 8 |
| Views and formatting | 7 |
| Rules and alerts | 8 |
| Integration | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0671-Q0001** (single-answer, Select ONE) A user cannot add more columns to a large list around 300 columns. What is the most likely cause?

- A. The 8,000-byte-per-item row size limit has been reached **(key)**  
  _Rationale:_ Correct: column count is bounded by the per-item byte limit, not a fixed column count.
- B. Lists only allow four columns  
  _Rationale:_ Lists support many columns, subject to the byte limit.
- C. The list must be deleted and recreated  
  _Rationale:_ Recreating does not raise the byte limit.
- D. Teams blocks all new columns  
  _Rationale:_ Teams does not impose a separate column block.

**MST-0671-Q0002** (multiple-answer, Select TWO) Which TWO are true about Microsoft Lists? (Select TWO.)

- A. Lists can be created from built-in templates **(key)**  
  _Rationale:_ Correct: templates such as Issue tracker speed up list creation.
- B. Lists can be surfaced as a tab in a Teams channel **(key)**  
  _Rationale:_ Correct: the Lists app is available as a Teams tab.
- C. Lists replace Azure Storage accounts  
  _Rationale:_ Lists is a tracking app, not cloud storage infrastructure.
- D. Lists require Bicep to create columns  
  _Rationale:_ Columns are created in the UI, not with Bicep.

**MST-0671-Q0003** (single-answer, Select ONE) What keeps a team in sync when a list item's status changes?

- A. A rule that sends a notification **(key)**  
  _Rationale:_ Correct: rules trigger notifications on changes such as status updates.
- B. Deleting the item  
  _Rationale:_ Deleting removes the item rather than notifying.
- C. A storage redundancy setting  
  _Rationale:_ Redundancy is an Azure Storage concept, not a Lists feature.
- D. A VNet peering  
  _Rationale:_ Peering is an Azure networking concept, unrelated to Lists.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
