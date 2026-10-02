# Microsoft Dynamics 365: Finance and Operations Apps Developer (MB-500)

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1421` v0.1.0 | Batch 7 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | MB-500 |
| Version basis | Skills measured as of January 30, 2026 |
| Exam status | current |
| Evidence | **verified-official-source** - sources: SRC-MS-MB500 |
| Legacy IDs | MST-MIC-MS-MB500-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan finance and operations architecture and implement ALM with Lifecycle Services
2. Apply Visual Studio and Azure DevOps developer tools; design and develop AOT elements
3. Develop and test X++ and object-oriented code and framework functionality
4. Implement reporting, data integration and data management solutions
5. Implement security policies and optimize application performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: official item formats not reproducible as MCQ/MR (for example performance or case simulations) are listed in the exam-version record.

## Modules

### M01 Plan the architecture and solution design (5-10%)

- Worked applications: (1) Plan a package deployment path across Dev/Test/Prod with LCS; (2) Choose cloud vs on-premises for a customer scenario
- Common misconception addressed: Editing standard objects directly instead of using extension models
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Plan for the major components of finance and operations apps | 74 | 6 |
| M01L02 | Implement application lifecycle management (ALM) | 74 | 6 |

### M02 Apply developer tools (5-10%)

- Worked applications: (1) Create an extension model and resolve a version-control conflict; (2) Set up a CI/CD pipeline in Azure DevOps
- Common misconception addressed: Checking changes into the main branch without a feature branch
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Customize finance and operations apps by using Visual Studio | 74 | 6 |
| M02L02 | Manage source code and artifacts by using Microsoft Azure DevOps version control | 74 | 6 |

### M03 Design and develop AOT elements (15-20%)

- Worked applications: (1) Extend a form and table with a new field group; (2) Add an event handler method to a class
- Common misconception addressed: Overlayering a base class instead of using Chain of Command
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Create and extend UI elements | 115 | 6 |
| M03L02 | Create and extend the data model | 115 | 6 |
| M03L03 | Create classes and extend AOT elements | 115 | 6 |

### M04 Develop and test code (20-25%)

- Worked applications: (1) Implement Chain of Command around a standard method; (2) Write a SysTest unit test and run it in Test Explorer
- Common misconception addressed: Using row-based loops where a set-based operation would scale
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Develop X++ code | 111 | 6 |
| M04L02 | Develop object-oriented code | 111 | 6 |
| M04L03 | Implement finance and operations app framework functionality | 111 | 6 |
| M04L04 | Perform testing | 110 | 6 |

### M05 Implement reporting (10-15%)

- Worked applications: (1) Build an SSRS report with a report data provider class; (2) Add a Power BI visualization to a workspace
- Common misconception addressed: Choosing SSRS where an Electronic reporting format fits better
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Select reporting tools in finance and operations apps | 82 | 6 |
| M05L02 | Design, create, and revise Dynamics 365 reports | 82 | 6 |
| M05L03 | Design, create, and revise Dynamics 365 workspaces | 82 | 6 |

### M06 Integrate and manage data solutions (15-20%)

- Worked applications: (1) Implement a dual-write mapping to Dataverse; (2) Expose a custom service and consume a REST API
- Common misconception addressed: Confusing synchronous custom services with asynchronous OData batch
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Evaluate data integration patterns and scenarios | 86 | 6 |
| M06L02 | Implement data integration concepts and solutions | 86 | 6 |
| M06L03 | Implement data management | 86 | 6 |
| M06L04 | Integrate with Microsoft Power Platform, Microsoft 365, and Azure | 86 | 6 |

### M07 Implement security and optimize performance (10-15%)

- Worked applications: (1) Create a duty and role with specific privileges; (2) Add table and form caching to cut round-trips
- Common misconception addressed: Assuming XDS policies apply without being registered on the role
- Module check: 24 items / 24 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Implement security policies and requirements | 82 | 6 |
| M07L02 | Apply fundamental performance optimization techniques | 82 | 6 |
| M07L03 | Optimize performance | 82 | 6 |

## Integrative case

A developer extends a Dynamics 365 finance and operations deployment: build an extension model with Chain of Command, add a data entity and SSRS report, implement a dual-write integration, enforce XDS security and tune a set-based query for performance.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1421-practice-form-A | 72 | 72 | yes |
| MST-1421-practice-form-B | 72 | 72 | no (optional practice) |
| MST-1421-practice-form-C | 72 | 72 | no (optional practice) |
| MST-1421-final-protected | 72 | 72 | yes |

Minimum reviewed item bank: 876 (plan; 3 sample items drafted, 0 reviewed).

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
