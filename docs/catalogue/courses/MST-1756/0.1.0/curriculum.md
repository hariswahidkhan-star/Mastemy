# Jira for Project Teams

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1756` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-PMB-SK-JPT-001 |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Jira for Project Teams (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Jira fundamentals
2. Boards and workflows
3. Backlog and sprint management
4. Searching and reporting with JQL
5. Configuration and team practice

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate configuring a live Jira instance; hands-on practice belongs in the product.

## Modules

### M01 Jira fundamentals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Create an issue with the right type and fields; (2) Navigate from a board to an issue
- Common misconception addressed: Treating every work item as the same issue type
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Projects, issues and issue types | 58 | 6 |
| M01L02 | The Jira interface and navigation | 58 | 6 |

### M02 Boards and workflows (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Move an issue through a workflow correctly; (2) Choose a Scrum or Kanban board for a team
- Common misconception addressed: Editing statuses on the board without updating the workflow
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Scrum and Kanban boards | 58 | 6 |
| M02L02 | Workflows, statuses and transitions | 58 | 6 |

### M03 Backlog and sprint management (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a sprint from a prioritised backlog; (2) Split an oversized story in the backlog
- Common misconception addressed: Adding scope mid-sprint without adjusting the commitment
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Backlog grooming and estimation | 58 | 6 |
| M03L02 | Planning and running a sprint | 58 | 6 |

### M04 Searching and reporting with JQL (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write a JQL query to find a team's open bugs; (2) Read a burndown or velocity chart
- Common misconception addressed: Relying on memory instead of saved JQL filters for recurring questions
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | JQL basics and filters | 57 | 6 |
| M04L02 | Dashboards and agile reports | 57 | 6 |

### M05 Configuration and team practice (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set components and a fix version on issues; (2) Define a definition of done in the workflow
- Common misconception addressed: Over-customising Jira until the workflow is unusable
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Permissions, components and versions | 57 | 6 |
| M05L02 | Good team hygiene in Jira | 57 | 6 |

## Integrative case

A software team is adopting Jira to replace spreadsheets. The learner must set up projects and issue types, choose and configure a board and workflow, plan and run a sprint, write JQL for reporting, and establish team hygiene practices, then demonstrate a working configuration that fits the team's process. Exact plan and feature availability are confirmed against the current product before production.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1756-final-protected | 25 | 25 | yes |
| MST-1756-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Jira fundamentals | 5 |
| Boards and workflows | 5 |
| Backlog and sprint management | 5 |
| Searching and reporting with JQL | 5 |
| Configuration and team practice | 5 |

Minimum reviewed item bank: 270 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1756-Q0001** (single-answer, Select ONE) JQL in Jira is used to:

- A. Search and filter issues using a structured query language **(key)**  
  _Rationale:_ Correct: JQL (Jira Query Language) builds structured issue searches.
- B. Write backend Java code for Jira plugins  
  _Rationale:_ JQL is a query language, not a programming language.
- C. Design the visual theme of a board  
  _Rationale:_ JQL does not control appearance.
- D. Encrypt issue data at rest  
  _Rationale:_ JQL is unrelated to storage encryption.

**MST-1756-Q0002** (multiple-answer, Select TWO) Which TWO are good sprint practices in Jira? (Select TWO.)

- A. Commit to a sprint scope from a prioritised backlog **(key)**  
  _Rationale:_ Correct: sprint planning draws from a ranked backlog.
- B. Keep the sprint scope stable once committed **(key)**  
  _Rationale:_ Correct: protecting the commitment supports a predictable sprint.
- C. Add new stories into the active sprint whenever asked  
  _Rationale:_ Uncontrolled additions undermine the sprint commitment.
- D. Delete the backlog after each sprint  
  _Rationale:_ The backlog persists and is re-prioritised, not deleted.

**MST-1756-Q0003** (single-answer, Select ONE) A Jira workflow defines:

- A. The set of statuses an issue can have and the allowed transitions between them **(key)**  
  _Rationale:_ Correct: workflows model the lifecycle of an issue.
- B. The colour scheme of the board  
  _Rationale:_ Appearance is not the workflow.
- C. The list of users in the organisation  
  _Rationale:_ User directory is separate from workflow.
- D. The company's billing plan  
  _Rationale:_ Billing is unrelated to issue workflow.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
