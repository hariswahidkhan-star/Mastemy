# Azure DevOps Boards and Repos

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1444` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure DevOps (Boards and Repos) documentation read via the Microsoft Learn MCP on 2026-10-02. Portal labels and features can change by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/azure/devops/boards/backlogs/connect-work-items-to-git-dev-ops |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZDO |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Azure DevOps Boards and Repos (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manage work with Azure Boards work items and backlogs
2. Use Azure Repos Git branches and pull requests
3. Link work and code for traceability using policies

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Azure Boards (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create and manage work items on a backlog; (2) Create a branch directly from a work item
- Common misconception addressed: Thinking work items and code live in separate, unlinked systems
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Work items, backlogs, and boards | 84 | 4 |
| M01L02 | Linking work items to development | 84 | 4 |

### M02 Azure Repos and Git (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create a pull request from a pushed branch; (2) Link a commit to a work item with AB#
- Common misconception addressed: Committing directly to main instead of using branches and pull requests
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Git repositories and branches | 84 | 4 |
| M02L02 | Pull requests and reviews | 84 | 4 |

### M03 Traceability and policies (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Require linked work items with a branch policy; (2) Auto-complete a work item when a pull request merges
- Common misconception addressed: Expecting traceability without configuring branch policies or linking
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Branch policies | 72 | 4 |
| M03L02 | End-to-end traceability | 72 | 4 |

## Integrative case

A developer creates a branch from a Boards work item, pushes changes, opens a pull request that links the commit with AB#, and a branch policy ensures the work item is linked before merge.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1444-final-protected | 24 | 32 | yes |
| MST-1444-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Azure Boards | 8 |
| Azure Repos and Git | 8 |
| Traceability and policies | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1444-Q0001** (single-answer, Select ONE) In Azure DevOps, which syntax in a commit message links it to an Azure Boards work item?

- A. AB#{work item ID} **(key)**  
  _Rationale:_ Correct: mentioning AB#{id} links the commit to that work item.
- B. @{id}  
  _Rationale:_ Incorrect: @ is used for mentions, not work-item linking.
- C. ref:{id}  
  _Rationale:_ Incorrect: ref: is not the Azure Boards linking syntax.
- D. //{id}  
  _Rationale:_ Incorrect: // is a comment marker, not a linking syntax.

**MST-1444-Q0002** (multiple-answer, Select TWO) Which TWO statements about Azure Boards and Repos integration are true? (Select TWO.)

- A. You can create a Git branch directly from a work item **(key)**  
  _Rationale:_ Correct: a branch can be created from the Development control of a work item.
- B. A branch policy can require linked work items on a pull request **(key)**  
  _Rationale:_ Correct: the Check for linked work items policy enforces this.
- C. Azure Repos cannot use Git  
  _Rationale:_ Incorrect: Azure Repos supports Git repositories.
- D. Work items cannot be linked to pull requests  
  _Rationale:_ Incorrect: work items can link to branches, commits, and pull requests.

**MST-1444-Q0003** (single-answer, Select ONE) What does a pull request enable in Azure Repos?

- A. Merging changes and starting a code review **(key)**  
  _Rationale:_ Correct: a pull request merges changes and starts a code review.
- B. Formatting a disk  
  _Rationale:_ Incorrect: that is unrelated to pull requests.
- C. Creating a virtual machine  
  _Rationale:_ Incorrect: PRs do not create VMs.
- D. Issuing certificates  
  _Rationale:_ Incorrect: PRs do not issue certificates.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
