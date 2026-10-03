# Notion for Team Productivity and Knowledge Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2275` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint and teach durable, transferable platform concepts. Platform features, pricing and user interfaces change frequently; product specifics must be verified at production and on-screen steps may differ from any shown. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Notion for Team Productivity and Knowledge Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how pages, blocks and databases combine to model information in Notion
2. Design databases with properties, views, filters and relations for real workflows
3. Build a team wiki and documentation structure that stays findable
4. Set up task and project tracking that connects to related knowledge
5. Manage sharing, permissions and team spaces responsibly
6. Create templates and light automations to keep a workspace consistent and maintainable

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Notion building blocks (25% (design weight), design weight)

- Worked applications: (1) Decide what should be a page vs a database entry; (2) Convert a long note into structured blocks
- Common misconception addressed: Treating Notion as only a notes app and ignoring databases
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pages, blocks and content structure | 120 | 7 |
| M01L02 | Databases, properties and views | 120 | 7 |

### M02 Designing databases (25% (design weight), design weight)

- Worked applications: (1) Build three views of one task database for different roles; (2) Add a relation linking projects to their meeting notes
- Common misconception addressed: Duplicating data instead of relating a single source
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Filters, sorts and grouped views | 120 | 7 |
| M02L02 | Relations, rollups and linked databases | 120 | 7 |

### M03 Knowledge and projects (25% (design weight), design weight)

- Worked applications: (1) Design a wiki home that routes people to the right doc; (2) Connect a decision log to the projects it affects
- Common misconception addressed: Letting a wiki sprawl with no owners or naming rules
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Building a findable team wiki | 120 | 7 |
| M03L02 | Task and project tracking connected to knowledge | 120 | 7 |

### M04 Collaboration and scale (25% (design weight), design weight)

- Worked applications: (1) Set a page so a client can view but not edit; (2) Build a meeting-note template with a database button
- Common misconception addressed: Assuming a shared page's sub-pages inherit the access you intended
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Sharing, permissions and team spaces | 120 | 7 |
| M04L02 | Templates, automations and workspace maintenance | 120 | 7 |

## Integrative case

A 20-person agency is drowning in scattered docs: model projects, tasks and meeting notes as related databases, build a findable wiki with clear ownership, create role-specific views, set sharing so clients see only what they should, and ship templates plus a light automation so the structure survives busy weeks.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2275-final-protected | 40 | 40 | yes |
| MST-2275-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Notion building blocks | 10 |
| Designing databases | 10 |
| Knowledge and projects | 10 |
| Collaboration and scale | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2275-Q0001** (single-answer, Select ONE) A team keeps copying client names into every task so reports are always out of date when a client is renamed. What is the better design?

- A. Store clients once in a Clients database and relate tasks to it, so a rename updates everywhere **(key)**  
  _Rationale:_ Correct: a relation to a single source avoids duplicated data and keeps everything consistent.
- B. Add a reminder to update every copy by hand  
  _Rationale:_ Manual updates are exactly the error-prone process to eliminate.
- C. Put client names only in page titles  
  _Rationale:_ Titles are still copies and do not stay in sync.
- D. Create a separate workspace per client  
  _Rationale:_ That fragments data and prevents cross-client reporting.

**MST-2275-Q0002** (multiple-answer, Select TWO) Which TWO features let one task database serve different roles without duplicating the data? (Select TWO.)

- A. Filtered views that show each role only its relevant tasks **(key)**  
  _Rationale:_ Correct: multiple views filter the same underlying data per audience.
- B. Grouping and sorting a view by status or owner **(key)**  
  _Rationale:_ Correct: grouping and sorting reshape the same data for different needs.
- C. Exporting a new copy for each person  
  _Rationale:_ Copies diverge and defeat a single source of truth.
- D. Changing the page icon  
  _Rationale:_ Icons are decorative and do not reshape data for roles.

**MST-2275-Q0003** (single-answer, Select ONE) An agency shares a project page with a client but is surprised the client can see internal sub-pages. What is the likely cause?

- A. Sub-pages inherited the shared page's access, so permissions must be checked at the level that should be private **(key)**  
  _Rationale:_ Correct: nested pages can inherit sharing, so access must be reviewed where privacy is required.
- B. Notion randomly exposes pages  
  _Rationale:_ Exposure follows the sharing model, not randomness.
- C. Clients can always see everything in a workspace  
  _Rationale:_ Access is controlled; the issue is inherited sharing, not blanket visibility.
- D. Sub-pages cannot be made private  
  _Rationale:_ Sub-page access can be set; inheritance just needs checking.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
