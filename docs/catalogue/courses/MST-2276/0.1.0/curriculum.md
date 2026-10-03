# Airtable Databases and Workflow Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2276` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint and teach durable, transferable platform concepts. Platform features, pricing and user interfaces change frequently; product specifics must be verified at production and on-screen steps may differ from any shown. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Airtable Databases and Workflow Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model data as tables, fields, records and links rather than flat spreadsheets
2. Choose appropriate field types and design relationships between tables
3. Build views, filters, groups and interfaces for different users
4. Use formulas, lookups and rollups to derive and summarise data
5. Automate repetitive steps with triggers and actions
6. Share bases responsibly and keep data clean and maintainable

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 From spreadsheets to databases (25% (design weight), design weight)

- Worked applications: (1) Split a messy sheet into two linked tables; (2) Pick the right field type for a status and a date
- Common misconception addressed: Keeping everything in one giant table because it is familiar
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why a linked database beats a flat sheet | 120 | 7 |
| M01L02 | Tables, records, fields and field types | 120 | 7 |

### M02 Relationships and derived data (25% (design weight), design weight)

- Worked applications: (1) Link orders to customers and show each customer's total; (2) Write a rollup that counts open tasks per project
- Common misconception addressed: Expecting a formula to reach data in an unlinked table
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Linking tables and designing relationships | 120 | 7 |
| M02L02 | Formulas, lookups and rollups | 120 | 7 |

### M03 Views and interfaces (25% (design weight), design weight)

- Worked applications: (1) Build a kanban and a calendar view of one table; (2) Create an interface so a manager never opens the raw grid
- Common misconception addressed: Assuming every user should edit the underlying base directly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Views, filters, groups and sorting | 120 | 7 |
| M03L02 | Interfaces for non-technical users | 120 | 7 |

### M04 Automation and sharing (25% (design weight), design weight)

- Worked applications: (1) Automate a Slack message when a record is marked blocked; (2) Add an automation that stamps a completed date
- Common misconception addressed: Treating an automation as reliable without testing its trigger
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Automations: triggers and actions | 120 | 7 |
| M04L02 | Sharing, permissions and data hygiene | 120 | 7 |

## Integrative case

An events team tracks speakers, sessions and venues in one overloaded spreadsheet: redesign it as linked tables, add rollups that total sessions per speaker, build calendar and kanban views plus a clean interface for the programme manager, automate a reminder when a session lacks a room, and set sharing so partners see only their sessions.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2276-final-protected | 40 | 40 | yes |
| MST-2276-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| From spreadsheets to databases | 10 |
| Relationships and derived data | 10 |
| Views and interfaces | 10 |
| Automation and sharing | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2276-Q0001** (single-answer, Select ONE) A team wants each project record to show how many of its linked tasks are still open. Which combination achieves this?

- A. A link to the Tasks table plus a rollup that counts linked tasks where status is open **(key)**  
  _Rationale:_ Correct: a rollup aggregates values from linked records, enabling the count.
- B. A single long text field listing tasks  
  _Rationale:_ Free text cannot be counted or kept in sync.
- C. Copying the task count in by hand each day  
  _Rationale:_ Manual counts go stale and are error-prone.
- D. A formula in the Tasks table only  
  _Rationale:_ Without a rollup on the project side, the project record cannot show the aggregate.

**MST-2276-Q0002** (multiple-answer, Select TWO) Which TWO choices make an Airtable base easier for a non-technical manager to use safely? (Select TWO.)

- A. Building an interface that exposes only the needed fields and actions **(key)**  
  _Rationale:_ Correct: an interface hides complexity and reduces accidental edits.
- B. Granting read-only or limited access instead of full base editing **(key)**  
  _Rationale:_ Correct: limited permissions protect the underlying structure.
- C. Giving everyone creator access to the base  
  _Rationale:_ Broad creator access risks accidental structural damage.
- D. Hiding the field names entirely from the designer  
  _Rationale:_ Designers need field names; this does not help the manager.

**MST-2276-Q0003** (single-answer, Select ONE) An automation that posts a reminder when a session has no room never fires, though matching records exist. What is the first thing to check?

- A. Whether the trigger condition and its field actually match the records, by testing the automation **(key)**  
  _Rationale:_ Correct: most non-firing automations have a mismatched or untested trigger condition.
- B. Whether the base has too many colours  
  _Rationale:_ Colour has no effect on automation triggers.
- C. Whether the records were created on a weekend  
  _Rationale:_ Creation day does not gate a condition-based trigger.
- D. Whether the table name is short enough  
  _Rationale:_ Table-name length does not affect triggers.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
