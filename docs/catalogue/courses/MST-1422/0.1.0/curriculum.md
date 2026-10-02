# Microsoft Dynamics 365 Business Central Developer (MB-820)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1422` v0.1.0 | Batch 7 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | MB-820 |
| Version basis | Skills measured as of June 10, 2025 |
| Exam status | current |
| Evidence | **verified-official-source** - sources: SRC-MS-MB820 |
| Legacy IDs | MST-MIC-MS-MB820-001 |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Business Central architecture, apps and the extension model
2. Install, develop, debug and deploy Business Central extensions
3. Develop AL objects: tables, pages, reports, XMLports, codeunits, permissions and queries
4. Use AL to extend Business Central and apply development standards
5. Test, analyze telemetry and integrate Business Central with other applications

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance or case simulations) are listed in the exam-version record.

## Modules

### M01 Describe Business Central (10-15%)

- Worked applications: (1) Decide base-app vs system-app placement for new objects; (2) Map a customization to the online update lifecycle
- Common misconception addressed: Modifying the base app instead of building an extension
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Describe the Business Central architecture | 100 | 6 |
| M01L02 | Describe Business Central apps | 100 | 6 |

### M02 Install, develop, and deploy for Business Central (10-15%)

- Worked applications: (1) Configure app.json and launch.json for a workspace; (2) Debug and deploy an extension from VS Code
- Common misconception addressed: Running multiple extensions without managing dependencies
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Install and configure a Business Central development environment | 100 | 6 |
| M02L02 | Create, debug, and deploy an extension in Business Central | 100 | 6 |

### M03 Develop by using AL objects (35-40%)

- Worked applications: (1) Build a table extension and a Role Center page; (2) Create a query object that joins and aggregates data
- Common misconception addressed: Using a record variable loop where a query object would be faster
- Module check: 25 items / 25 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Build and extend tables and pages in Business Central | 100 | 6 |
| M03L02 | Build and extend reports | 100 | 6 |
| M03L03 | Design and create an XMLport | 100 | 6 |
| M03L04 | Develop codeunits | 100 | 6 |
| M03L05 | Create entitlement and permission set objects | 100 | 6 |
| M03L06 | Create queries in Business Central | 100 | 6 |

### M04 Develop by using AL (15-20%)

- Worked applications: (1) Implement an assisted setup and onboarding checklist; (2) Create a profile and view in AL
- Common misconception addressed: Hard-coding text instead of using label files and translations
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Customize the UI experience, and implement onboarding techniques | 94 | 6 |
| M04L02 | Describe the essential development standards | 93 | 6 |
| M04L03 | Use AL to extend Business Central | 93 | 6 |

### M05 Work with development tools (10-15%)

- Worked applications: (1) Install the Test Toolkit and write a test codeunit; (2) Configure a custom telemetry signal
- Common misconception addressed: Assuming telemetry is captured without configuration
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Implement semiautomated test processes, and run standard Business Central tests | 100 | 6 |
| M05L02 | Manage and analyze telemetry | 100 | 6 |

### M06 Integrate Business Central with other applications (10-15%)

- Worked applications: (1) Call an external REST service with HttpClient and JSON; (2) Create an API page with OData bound actions
- Common misconception addressed: Confusing bound and unbound OData actions
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Access REST services from within Business Central | 100 | 6 |
| M06L02 | Implement APIs | 100 | 6 |

## Integrative case

A partner builds an AppSource extension for Business Central: model table and page extensions, add a document report and an XMLport, implement API pages with bound actions, write test codeunits, and emit custom telemetry signals.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1422-practice-form-A | 63 | 63 | yes |
| MST-1422-practice-form-B | 63 | 63 | no (optional practice) |
| MST-1422-practice-form-C | 63 | 63 | no (optional practice) |
| MST-1422-final-protected | 63 | 63 | yes |

Minimum reviewed item bank: 750 (plan; 3 sample items drafted, 0 reviewed).

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
