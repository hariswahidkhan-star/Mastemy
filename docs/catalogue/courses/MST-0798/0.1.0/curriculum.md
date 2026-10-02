# Gemini + AppSheet + Google Sheets: Operational App Workflow

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0798` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google AppSheet, Gemini and Google Sheets product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-APPSHEET (https://support.google.com/appsheet/; https://support.google.com/docs/topic/9054603; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Gemini + AppSheet + Google Sheets: Operational App Workflow (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Design an operational app on a Google Sheets data source
2. Model data, keys and relationships for an AppSheet app
3. Build views, forms and actions for field users
4. Add automation bots and notifications
5. Use Gemini to assist app and formula creation, then verify it
6. Govern access, data quality and deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught via instructor-built projects and walkthroughs.

## Modules

### M01 App and data source (MASTEMY-DESIGN 16%)

- Worked applications: (1) Connect a Sheet and generate a starter app; (2) Map the real-world process to app screens
- Common misconception addressed: Starting to build before defining the workflow
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Connecting a Sheets data source | 80 | 5 |
| M01L02 | Planning the operational workflow | 80 | 5 |

### M02 Data modelling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a unique key and typed columns; (2) Link inspections to sites with a reference
- Common misconception addressed: Using a non-unique column as the row key
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Keys, columns and types | 80 | 5 |
| M02L02 | References and relationships | 80 | 5 |

### M03 Views, forms and actions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a form with required fields; (2) Add an action that marks a record complete
- Common misconception addressed: Exposing every column in a cramped field view
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Views for field users | 80 | 5 |
| M03L02 | Forms and actions | 80 | 5 |

### M04 Automation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Create a bot that emails on a failed check; (2) Schedule a daily summary
- Common misconception addressed: Triggering a bot on every edit and flooding users
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bots and events | 80 | 5 |
| M04L02 | Notifications and scheduled tasks | 80 | 5 |

### M05 AI assistance and verification (MASTEMY-DESIGN 17%)

- Worked applications: (1) Ask Gemini for an expression and test it; (2) Verify a generated rule against sample rows
- Common misconception addressed: Shipping a generated expression without testing edge cases
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Gemini-assisted expressions | 80 | 5 |
| M05L02 | Verifying generated logic | 80 | 5 |

### M06 Governance and deployment (MASTEMY-DESIGN 17%)

- Worked applications: (1) Restrict edit access by user role; (2) Deploy the app and plan a change
- Common misconception addressed: Deploying without validation or access controls
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Access and data quality | 80 | 5 |
| M06L02 | Deploying and versioning | 80 | 5 |

## Integrative case

A field team needs a no-code inspection app: model the Sheets data and relationships, build capture forms and list views, add an automation that notifies a supervisor on a failed inspection, use Gemini to draft expressions and verify them, then control access and roll the app out to the team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0798-final-protected | 40 | 50 | yes |
| MST-0798-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| App and data source | 7 |
| Data modelling | 7 |
| Views, forms and actions | 7 |
| Automation | 7 |
| AI assistance and verification | 6 |
| Governance and deployment | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0798-Q0001** (single-answer, Select ONE) An AppSheet app repeatedly loads the wrong record when users tap a row. The most likely cause is:

- A. The table's row key is not unique **(key)**  
  _Rationale:_ Correct: AppSheet needs a unique key to identify each row reliably.
- B. Too many views are defined  
  _Rationale:_ The number of views does not affect row identity.
- C. The Sheet has a header row  
  _Rationale:_ A header row is expected and normal.
- D. Gemini was not used to build it  
  _Rationale:_ Record identity depends on keys, not on AI assistance.

**MST-0798-Q0002** (single-answer, Select ONE) Gemini drafts an AppSheet expression for a validation rule. Before using it you should:

- A. Test it against sample rows including edge cases **(key)**  
  _Rationale:_ Correct: generated logic must be verified against real and edge-case data.
- B. Deploy it to all users immediately  
  _Rationale:_ Deploying unverified logic risks breaking data capture.
- C. Assume it is correct because it compiled  
  _Rationale:_ Compiling does not prove the logic is right.
- D. Delete the sample data first  
  _Rationale:_ Sample data is needed to test the rule.

**MST-0798-Q0003** (multiple-answer, Select TWO) Which TWO are good governance practices before rolling out an operational app? (Select TWO.)

- A. Restrict edit access by user role **(key)**  
  _Rationale:_ Correct: least-privilege access protects operational data.
- B. Validate required fields and data types **(key)**  
  _Rationale:_ Correct: validation keeps the captured data trustworthy.
- C. Give every user owner rights  
  _Rationale:_ Owner rights for all violates least privilege.
- D. Skip testing to ship faster  
  _Rationale:_ Skipping testing risks shipping broken workflows.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
