# Google Apps Script: Workspace Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0734` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Google Apps Script product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-GOOG-APPSSCRIPT (https://developers.google.com/apps-script; https://developers.google.com/apps-script/guides/sheets; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Google Apps Script: Workspace Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what Apps Script is and where scripts run
2. Write functions using JavaScript and Apps Script services
3. Automate Google Sheets with the Spreadsheet service
4. Work with Gmail, Drive and Calendar services
5. Build custom menus, triggers and simple UIs
6. Handle authorization, quotas and safe deployment

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Apps Script fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create and run a first function; (2) Explain bound vs standalone scripts
- Common misconception addressed: Confusing Apps Script with browser JavaScript permissions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Apps Script is and where it runs | 80 | 5 |
| M01L02 | The script editor and project model | 80 | 5 |

### M02 Language and services (MASTEMY-DESIGN 16%)

- Worked applications: (1) Loop over an array of rows; (2) Call a service method and read its result
- Common misconception addressed: Assuming the newest browser JS features are all available
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | JavaScript essentials for Apps Script | 80 | 5 |
| M02L02 | Calling built-in services | 80 | 5 |

### M03 Automating Sheets (MASTEMY-DESIGN 17%)

- Worked applications: (1) Read a range into an array; (2) Write computed values back to a sheet
- Common misconception addressed: Reading/writing cell by cell instead of in bulk
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Spreadsheet service basics | 80 | 5 |
| M03L02 | Reading and writing ranges | 80 | 5 |

### M04 Other services (MASTEMY-DESIGN 17%)

- Worked applications: (1) Send an email with GmailApp; (2) Create a file in Drive
- Common misconception addressed: Ignoring per-service daily quotas
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Gmail and Drive | 80 | 5 |
| M04L02 | Calendar | 80 | 5 |

### M05 Menus, triggers and UI (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a custom menu to a sheet; (2) Schedule a time-based trigger
- Common misconception addressed: Expecting a simple trigger to perform actions that require authorization
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Custom menus and simple UI | 80 | 5 |
| M05L02 | Installable and time-based triggers | 80 | 5 |

### M06 Authorization and deployment (MASTEMY-DESIGN 17%)

- Worked applications: (1) Review the scopes a script requests; (2) Deploy a script and manage versions
- Common misconception addressed: Granting broad scopes when narrow ones suffice
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Scopes and authorization | 80 | 5 |
| M06L02 | Quotas and safe deployment | 80 | 5 |

## Integrative case

Automate a weekly reporting chore: a script reads new rows from a Sheet, formats a summary, emails it through Gmail on a time-based trigger, files a copy in Drive, and adds a custom menu so a colleague can run it on demand.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0734-final-protected | 40 | 50 | yes |
| MST-0734-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Apps Script fundamentals | 7 |
| Language and services | 7 |
| Automating Sheets | 7 |
| Other services | 7 |
| Menus, triggers and UI | 6 |
| Authorization and deployment | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0734-Q0001** (single-answer, Select ONE) A script that lives inside and is attached to a specific Google Sheet is best described as which kind of Apps Script project?

- A. A bound script **(key)**  
  _Rationale:_ Correct: a bound script is attached to a specific host document.
- B. A standalone script  
  _Rationale:_ A standalone script is not attached to a specific document.
- C. A browser extension  
  _Rationale:_ Apps Script projects are not browser extensions.
- D. A compiled binary  
  _Rationale:_ Apps Script is not compiled to a standalone binary.

**MST-0734-Q0002** (multiple-answer, Select TWO) Which TWO practices make an Apps Script Sheets automation more reliable? (Select TWO.)

- A. Read and write ranges in bulk rather than cell by cell **(key)**  
  _Rationale:_ Correct: bulk operations are far faster and avoid quota issues.
- B. Be mindful of per-service daily quotas **(key)**  
  _Rationale:_ Correct: services such as email have daily limits.
- C. Request the broadest possible authorization scopes  
  _Rationale:_ Narrow scopes are safer; broad scopes over-permission the script.
- D. Loop one cell at a time for large sheets  
  _Rationale:_ Cell-by-cell access is slow and can hit limits.

**MST-0734-Q0003** (single-answer, Select ONE) You want a script to run automatically every Monday morning without anyone opening the sheet. What should you use?

- A. A time-based (installable) trigger **(key)**  
  _Rationale:_ Correct: a time-based trigger runs on a schedule with the needed authorization.
- B. A simple onOpen trigger  
  _Rationale:_ onOpen only runs when the document is opened and cannot perform authorized actions.
- C. A manual menu click each week  
  _Rationale:_ That is not automatic.
- D. A formula in a cell  
  _Rationale:_ A formula cannot send email or run on a schedule.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
