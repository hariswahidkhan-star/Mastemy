# Power BI Semantic Models and Enterprise Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0709` v0.1.0 | Batch 9 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (independent; not affiliated with or endorsed by Microsoft) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **PARTIAL** - product capabilities grounded in official Microsoft Learn docs; module structure is a Mastemy design assumption |
| Evidence | **vendor-docs-partial** - source SRC-MS-POWERBI-SEMANTIC (https://learn.microsoft.com/power-bi/collaborate-share/service-endorsement-overview) fetched 2026-10-02 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Power BI Semantic Models and Enterprise Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the skills of 'Design semantic models' to professional tasks
2. Apply the skills of 'Reuse and connect' to professional tasks
3. Apply the skills of 'Endorse and make discoverable' to professional tasks
4. Apply the skills of 'Govern the enterprise lifecycle' to professional tasks

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the product, the quality of live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded configuration or peer review.

## Modules

### M01 Design semantic models (25%, design assumption)

- Worked applications: (1) Design a shared semantic model for a sales subject area; (2) Decide between a shared model and a new model for a report
- Common misconception addressed: Creating a new semantic model for every report instead of reusing one
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a semantic model is | 60 | 6 |
| M01L02 | Star schema and relationships | 60 | 6 |
| M01L03 | Shared vs per-report models | 60 | 6 |
| M01L04 | Storage modes (Import, DirectQuery, Direct Lake) | 60 | 6 |
### M02 Reuse and connect (25%, design assumption)

- Worked applications: (1) Connect a report live to a shared model instead of copying data; (2) Extend a shared model with a departmental table via DirectQuery
- Common misconception addressed: Exporting to Excel instead of keeping a live connection to the model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Live connection to a shared model | 60 | 6 |
| M02L02 | Build permission | 60 | 6 |
| M02L03 | DirectQuery to a Power BI model for extension | 60 | 6 |
| M02L04 | Analyze in Excel | 60 | 6 |
### M03 Endorse and make discoverable (25%, design assumption)

- Worked applications: (1) Promote a model and request certification following org standards; (2) Mark a trusted model discoverable so others can request access
- Common misconception addressed: Assuming any user can certify content when only authorized reviewers can
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Promotion vs certification | 60 | 6 |
| M03L02 | Who can certify (authorized reviewers) | 60 | 6 |
| M03L03 | Master data designation | 60 | 6 |
| M03L04 | Semantic model discovery in the OneLake catalog | 60 | 6 |
### M04 Govern the enterprise lifecycle (25%, design assumption)

- Worked applications: (1) Promote a model through a deployment pipeline to production; (2) Use lineage view to assess the impact of a model change
- Common misconception addressed: Thinking promotion or endorsement grants data access by itself
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Deployment pipelines (dev/test/prod) | 60 | 6 |
| M04L02 | Row-level security and workspace roles | 60 | 6 |
| M04L03 | Lineage and impact analysis | 60 | 6 |
| M04L04 | Separating model and report workspaces | 60 | 6 |

## Integrative case

A BI center of excellence must curate a single source of truth: design a shared semantic model, have teams connect live, certify it through authorized reviewers, make it discoverable, and promote changes through a deployment pipeline with row-level security.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0709-final-protected | 72 | 72 | yes |
| MST-0709-final-alternate | 72 | 72 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Design semantic models | 18 |
| Reuse and connect | 18 |
| Endorse and make discoverable | 18 |
| Govern the enterprise lifecycle | 18 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0709-Q0001** (single-answer, Select ONE) Who is allowed to apply the Certified endorsement to a Power BI semantic model?

- A. Only reviewers authorized by the Power BI administrator **(key)**  
  _Rationale:_ Correct: certification can be applied only by a select group of authorized reviewers defined by the admin.
- B. Any user with read access  
  _Rationale:_ Read access does not permit certification.
- C. Anyone in the workspace  
  _Rationale:_ General workspace membership does not grant certification rights.
- D. Only external guests  
  _Rationale:_ External guests are not the authorized certifiers; admins define reviewers.
**MST-0709-Q0002** (single-answer, Select ONE) A report author wants to reuse an existing shared semantic model rather than duplicate data. Which approach is preferred?

- A. A live connection to the shared semantic model **(key)**  
  _Rationale:_ Correct: a live connection reuses the existing model and avoids creating a duplicate.
- B. Export the data to a new Excel file  
  _Rationale:_ Exporting duplicates data and loses the governed single source of truth.
- C. Rebuild the model from scratch  
  _Rationale:_ Rebuilding defeats reuse and creates another model to maintain.
- D. Delete the shared model  
  _Rationale:_ Deleting the shared model removes the single source of truth.
**MST-0709-Q0003** (multiple-answer, Select TWO) Which TWO statements about Power BI endorsement are correct? (Select TWO)

- A. Promotion can be done by any user with write permission on the item **(key)**  
  _Rationale:_ Correct: any content owner or member with write permission can promote content.
- B. Certification indicates the content meets org quality standards and is authoritative **(key)**  
  _Rationale:_ Correct: certification signals reliable, authoritative, ready-to-use content.
- C. Endorsement grants data access to everyone automatically  
  _Rationale:_ Endorsement affects discoverability and trust signals, not access rights.
- D. Only dashboards can be endorsed  
  _Rationale:_ Dashboards are the exception; most items can be endorsed, dashboards cannot.

## Verification note

Product capabilities described in this spec were grounded in official Microsoft Learn documentation (https://learn.microsoft.com/power-bi/collaborate-share/service-endorsement-overview) fetched on 2026-10-02. Microsoft publishes no exam syllabus or topic weights for this skills topic, so module weights and structure are Mastemy design assumptions (documented_topic_weights = []). No partnership, affiliation or endorsement is implied.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
