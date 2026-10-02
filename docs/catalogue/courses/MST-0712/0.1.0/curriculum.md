# Power Apps Model-Driven Applications and Dataverse

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0712` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-POWERAPPS-MDA (https://learn.microsoft.com/power-apps/maker/model-driven-apps/model-driven-app-overview) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Power Apps Model-Driven Applications and Dataverse (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Start from the data model' to professional tasks
2. Apply the skills of 'Build forms and views' to professional tasks
3. Apply the skills of 'Add business logic' to professional tasks
4. Apply the skills of 'Compose and secure the app' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Start from the data model (25%, design assumption)

- Worked applications: (1) Design a Dataverse table set with relationships for a case tracker; (2) Choose columns and relationships for a customer-to-case model
- Common misconception addressed: Trying to build a model-driven app on a non-Dataverse data source
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Model-driven apps start with data | 60 | 6 |
| M01L02 | Dataverse tables, columns and relationships | 60 | 6 |
| M01L03 | Standard vs activity tables | 60 | 6 |
| M01L04 | Why model-driven apps require Dataverse | 60 | 6 |
### M02 Build forms and views (25%, design assumption)

- Worked applications: (1) Create a main form and two filtered views for a table; (2) Add a chart and a dashboard to visualize table data
- Common misconception addressed: Treating a view as static when it is a live, dynamic query
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Forms for data entry and display | 60 | 6 |
| M02L02 | Views as named, filtered queries | 60 | 6 |
| M02L03 | Quick-create and quick-view forms | 60 | 6 |
| M02L04 | Charts and dashboards on tables | 60 | 6 |
### M03 Add business logic (25%, design assumption)

- Worked applications: (1) Create a business rule that validates and sets a field; (2) Add a business process flow that guides a multi-stage process
- Common misconception addressed: Expecting every business-rule action to work in canvas apps too
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Business rules (no-code logic and validation) | 60 | 6 |
| M03L02 | Where business rules run (form and server) | 60 | 6 |
| M03L03 | Business process flows | 60 | 6 |
| M03L04 | Real-time workflows and actions | 60 | 6 |
### M04 Compose and secure the app (25%, design assumption)

- Worked applications: (1) Assemble tables, forms and views into a model-driven app with a site map; (2) Assign a security role that limits access to the right records
- Common misconception addressed: Assuming hiding a table from the site map secures its data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The app designer and site map | 60 | 6 |
| M04L02 | Security roles and access | 60 | 6 |
| M04L03 | Unified Interface across devices | 60 | 6 |
| M04L04 | Validating and sharing the app | 60 | 6 |

## Integrative case

A service team needs a case-management app: model Dataverse tables and relationships, build forms, views, charts and a dashboard, add business rules and a business process flow, then compose a model-driven app with a site map and least-privilege security roles.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0712-final-protected | 72 | 72 | yes |
| MST-0712-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Start from the data model | 18 |
| Build forms and views | 18 |
| Add business logic | 18 |
| Compose and secure the app | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0712-Q0001** (single-answer, Select ONE) What must a model-driven app use as its data source?

- A. Microsoft Dataverse **(key)**  
  _Rationale:_ Correct: model-driven apps can only be defined using Dataverse as the data model.
- B. Any SharePoint list  
  _Rationale:_ Model-driven apps require Dataverse, not arbitrary SharePoint lists.
- C. A local Excel file  
  _Rationale:_ A local Excel file cannot back a model-driven app.
- D. An Azure Blob container  
  _Rationale:_ Blob storage is not a model-driven app data source.
**MST-0712-Q0002** (single-answer, Select ONE) A maker wants no-code validation that runs on the form and at the server for a table. Which Dataverse feature fits?

- A. A business rule **(key)**  
  _Rationale:_ Correct: business rules apply no-code logic and validation across a table's forms and at the server level.
- B. A Power BI measure  
  _Rationale:_ A measure is a reporting calculation, not a Dataverse validation.
- C. A deployment pipeline  
  _Rationale:_ Deployment pipelines move solutions; they are not form validation.
- D. A resource lock  
  _Rationale:_ Resource locks are an Azure governance control, unrelated to Dataverse logic.
**MST-0712-Q0003** (multiple-answer, Select TWO) Which TWO components are defined at the Dataverse table level for a model-driven app? (Select TWO)

- A. Views **(key)**  
  _Rationale:_ Correct: views are defined on a table as named, filtered queries.
- B. Forms **(key)**  
  _Rationale:_ Correct: forms are defined on a table for data entry and display.
- C. The Azure subscription  
  _Rationale:_ The Azure subscription is cloud infrastructure, not a table component.
- D. A Fabric capacity  
  _Rationale:_ A Fabric capacity is analytics compute, unrelated to table components.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/power-apps/maker/model-driven-apps/model-driven-app-overview) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
