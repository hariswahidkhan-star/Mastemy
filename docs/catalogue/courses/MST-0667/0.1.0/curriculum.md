# Microsoft Loop: Collaborative Workspaces and Components

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0667` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Loop feature facts (workspaces, pages and components; portable components that stay in sync across Teams, Outlook, Whiteboard and OneNote; .loop files stored in OneDrive; task-list, table and voting components; Planner and To Do task integration; workspace membership, ownership, sensitivity labels and external-sharing limits) grounded in official Microsoft documentation read via the Microsoft Learn MCP on 2026-10-02. Loop is governed by admin policy and licensing; confirm availability against the current tenant before production. |
| Official sources | https://learn.microsoft.com/microsoft-365/loop/loop-components-teams; https://learn.microsoft.com/microsoft-365/loop/loop-permission |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-LOOP |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Loop: Collaborative Workspaces and Components (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Loop workspaces, pages and components
2. Share live components across Microsoft 365
3. Apply Loop collaboration patterns
4. Integrate tasks with Planner and To Do
5. Understand Loop governance and limits

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Loop fundamentals (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Create a workspace with pages and components; (2) Explain where a Loop component is stored and who can edit it
- Common misconception addressed: Thinking Loop replaces SharePoint for enterprise knowledge management
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Workspaces, pages and components | 80 | 5 |
| M01L02 | Loop versus OneNote and SharePoint | 80 | 5 |
| M01L03 | .loop files and OneDrive storage | 80 | 5 |

### M02 Components across Microsoft 365 (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Share a live task-list component in Teams and in Outlook; (2) Embed a table component that stays in sync everywhere it is shared
- Common misconception addressed: Expecting a pasted component to be a static copy rather than a live, synced one
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Components in Teams and Outlook | 80 | 5 |
| M02L02 | Live sync behaviour | 80 | 5 |
| M02L03 | Task lists, tables and voting components | 80 | 5 |

### M03 Collaboration patterns (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a project workspace from a template; (2) Link tasks to Planner and To Do
- Common misconception addressed: Duplicating task lists instead of using synced task integration
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Co-creation and mentions | 80 | 5 |
| M03L02 | Planner and To Do task integration | 80 | 5 |
| M03L03 | Templates and reuse | 80 | 5 |

### M04 Governance and limits (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Configure workspace membership and ownership; (2) Apply a sensitivity label to a workspace
- Common misconception addressed: Assuming external sharing and Information Barriers work exactly as in SharePoint
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Membership and permissions | 80 | 5 |
| M04L02 | Sensitivity labels and compliance | 80 | 5 |
| M04L03 | External sharing limits | 80 | 5 |

## Integrative case

A project coordinator builds a Loop workspace for a cross-team initiative: pages and live components shared into Teams and Outlook, Planner-linked tasks, and correct workspace membership and sensitivity labels.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0667-final-protected | 30 | 40 | yes |
| MST-0667-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Loop fundamentals | 8 |
| Components across Microsoft 365 | 8 |
| Collaboration patterns | 7 |
| Governance and limits | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0667-Q0001** (single-answer, Select ONE) You paste a Loop component into both a Teams chat and an Outlook email. What happens when someone edits it in Teams?

- A. The change appears everywhere the component is shared, because it stays in sync **(key)**  
  _Rationale:_ Correct: Loop components are live and sync across the places they are shared.
- B. Nothing; each paste is an independent static copy  
  _Rationale:_ Components are live, not static copies.
- C. The Outlook copy is deleted  
  _Rationale:_ The copies stay in sync, not deleted.
- D. Only the author can ever see the change  
  _Rationale:_ All recipients see synced changes.

**MST-0667-Q0002** (multiple-answer, Select TWO) Which TWO statements about Microsoft Loop are correct? (Select TWO.)

- A. Components created in Teams or Outlook are stored as .loop files in OneDrive **(key)**  
  _Rationale:_ Correct: such components are .loop files in the creator's OneDrive.
- B. Loop is positioned for real-time co-creation, not as an enterprise knowledge base like SharePoint **(key)**  
  _Rationale:_ Correct: Loop is a co-creation layer, not a SharePoint replacement.
- C. Loop supports the same external sharing and Information Barriers as SharePoint sites  
  _Rationale:_ Loop has different external-sharing and Information Barrier behaviour.
- D. Loop components cannot be edited by anyone but their creator  
  _Rationale:_ Recipients can edit shared components.

**MST-0667-Q0003** (single-answer, Select ONE) A shared Loop workspace's owners all leave the company. What happens?

- A. The workspace becomes ownerless but remains, and an admin can assign a new owner **(key)**  
  _Rationale:_ Correct: ownerless workspaces persist and can be reassigned by an admin.
- B. It is deleted immediately  
  _Rationale:_ It is not automatically deleted.
- C. It becomes public to the internet  
  _Rationale:_ It does not become public.
- D. All its components are converted to PDF  
  _Rationale:_ No such conversion occurs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
