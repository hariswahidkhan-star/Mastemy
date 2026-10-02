# Google AppSheet: No-Code Business Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0735` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google AppSheet Help; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-APPSHEET (https://support.google.com/appsheet; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Google AppSheet: No-Code Business Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Connect data sources and generate an app
2. Model data with tables, columns and references
3. Build views, slices and user experience
4. Add behaviour with actions and automation bots
5. Control access with security and roles
6. Deploy, share and monitor an app

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Data sources and app creation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Connect a Google Sheet and auto-generate an app; (2) Add a second table from a new data source
- Common misconception addressed: Assuming AppSheet stores its own data rather than reading the connected source
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Connecting data sources | 80 | 7 |
| M01L02 | Generating a first app | 80 | 7 |

### M02 Data modelling (MASTEMY-DESIGN 16%)

- Worked applications: (1) Add a Ref column linking jobs to technicians; (2) Create a virtual column that computes a total
- Common misconception addressed: Confusing a real column with a virtual (computed) column
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tables, columns and types | 80 | 7 |
| M02L02 | References and virtual columns | 80 | 7 |

### M03 Views and UX (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a detail view grouped by status; (2) Create a slice showing only open jobs
- Common misconception addressed: Thinking a slice creates a separate copy of the data
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | View types and layouts | 80 | 7 |
| M03L02 | Slices and filtered views | 80 | 7 |

### M04 Actions and automation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add an action button to set a job to complete; (2) Build a bot that emails on a status change
- Common misconception addressed: Expecting a bot to run without an event trigger
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Actions and behaviour | 80 | 7 |
| M04L02 | Automation bots and events | 80 | 7 |

### M05 Security and access (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a security filter so users see only their rows; (2) Restrict a column to admins
- Common misconception addressed: Using a view filter for security instead of a security filter
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | User roles and security filters | 80 | 7 |
| M05L02 | Column and table permissions | 80 | 7 |

### M06 Deployment and operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Deploy the app and share with a group; (2) Review the audit log for app usage
- Common misconception addressed: Treating a prototype as deployed without whitelisting users
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Deploying and sharing | 80 | 7 |
| M06L02 | Monitoring and usage | 80 | 7 |

## Integrative case

Build a field-service app in AppSheet: connect a Sheets data source, model jobs and technicians with references, design list and detail views, add an action to mark a job complete, automate an email on status change, restrict edits by role, then deploy to the team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0735-final-protected | 40 | 50 | yes |
| MST-0735-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Data sources and app creation | 6 |
| Data modelling | 6 |
| Views and UX | 7 |
| Actions and automation | 7 |
| Security and access | 7 |
| Deployment and operations | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0735-Q0001** (single-answer, Select ONE) What does AppSheet use as the system of record for an app's data?

- A. The connected data source such as Google Sheets or a database **(key)**  
  _Rationale:_ Correct: AppSheet reads and writes to the connected source; it is not a separate datastore.
- B. An internal AppSheet-only database that replaces the source  
  _Rationale:_ AppSheet does not replace the source; it operates on the connected data.
- C. The user's device local storage only  
  _Rationale:_ Device storage is a cache, not the system of record.
- D. A static export taken at build time  
  _Rationale:_ Data is live against the source, not a one-time export.

**MST-0735-Q0002** (single-answer, Select ONE) Which column type links a row in one table to a row in another table?

- A. Ref column **(key)**  
  _Rationale:_ Correct: a Ref column creates a relationship to another table's key.
- B. Text column  
  _Rationale:_ Text stores free text, not a relationship.
- C. Number column  
  _Rationale:_ Number stores numeric values, not relationships.
- D. Enum column  
  _Rationale:_ Enum restricts to a fixed value list, not a table link.

**MST-0735-Q0003** (multiple-answer, Select TWO) Which TWO are valid ways to limit the rows a user can see or edit in an AppSheet app? (Select TWO.)

- A. Apply a security filter on the table **(key)**  
  _Rationale:_ Correct: security filters restrict which rows sync to the user.
- B. Set column or table permissions by role **(key)**  
  _Rationale:_ Correct: role-based permissions constrain access.
- C. Rely only on hiding a view from the menu  
  _Rationale:_ Hiding a view is cosmetic and does not restrict data.
- D. Change the thumbnail of the app  
  _Rationale:_ The thumbnail has no effect on access.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
