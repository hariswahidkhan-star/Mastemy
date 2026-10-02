# Salesforce: Sales Operations and Pipeline Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1115` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course design (vendor-neutral). No third-party exam code, weighting or syllabus is claimed; content to be verified against current sources at production. |
| Evidence | **n/a-no-official-syllabus** - sources: none (original Mastemy design) |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Salesforce: Sales Operations and Pipeline Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Navigate Salesforce objects and the sales data model
2. Manage leads, opportunities and the sales pipeline
3. Configure sales process automation and productivity tools
4. Build reports and dashboards for pipeline performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Salesforce data model (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Map a B2B sales motion to Salesforce objects; (2) Design a record type for a product line
- Common misconception addressed: Confusing leads with contacts and accounts
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Standard objects: leads, accounts, contacts, opportunities | 120 | 8 |
| M01L02 | Record types, page layouts and relationships | 120 | 8 |

### M02 Pipeline and opportunity management (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Convert a qualified lead to an opportunity; (2) Audit a pipeline for stale opportunities
- Common misconception addressed: Leaving opportunities in a stage with no close date
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lead conversion and opportunity stages | 120 | 8 |
| M02L02 | Forecast categories and pipeline hygiene | 120 | 8 |

### M03 Sales automation and productivity (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a validation rule for required fields; (2) Automate a follow-up task on stage change
- Common misconception addressed: Automating processes without validation, creating dirty data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Workflow rules, flows and validation | 120 | 8 |
| M03L02 | Tasks, activities and sales productivity tools | 120 | 8 |

### M04 Reports and dashboards (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a pipeline-by-stage report; (2) Design a sales-manager dashboard
- Common misconception addressed: Building dashboards on reports with the wrong report type
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Report types, filters and groupings | 120 | 8 |
| M04L02 | Dashboards for pipeline and forecast | 120 | 8 |

## Integrative case

A sales operations analyst must stand up Salesforce for a new sales team. They must configure the object model and record types, define opportunity stages and forecast categories, automate hygiene with validation and flows, and deliver a forecast dashboard, defending the pipeline-hygiene rules to sales leadership.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1115-final-protected | 40 | 40 | yes |
| MST-1115-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Salesforce data model | 10 |
| Pipeline and opportunity management | 10 |
| Sales automation and productivity | 10 |
| Reports and dashboards | 10 |

Minimum reviewed item bank: 376 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1115-Q0001** (single-answer, Select ONE) In Salesforce, converting a qualified lead typically creates:

- A. An account, a contact and optionally an opportunity **(key)**  
  _Rationale:_ Correct: lead conversion maps to account, contact and opportunity.
- B. A new user licence  
  _Rationale:_ Conversion does not create a licence.
- C. A dashboard automatically  
  _Rationale:_ Dashboards are built separately.
- D. A permission set  
  _Rationale:_ Unrelated to lead conversion.

**MST-1115-Q0002** (multiple-answer, Select TWO) Which TWO support reliable pipeline hygiene in Salesforce? (Select TWO.)

- A. Validation rules that require a close date and next step **(key)**  
  _Rationale:_ Correct: validation enforces data quality at entry.
- B. Regular review and clean-up of stale opportunities **(key)**  
  _Rationale:_ Correct: hygiene routines keep the forecast trustworthy.
- C. Allowing any stage change with no required fields  
  _Rationale:_ That produces dirty pipeline data.
- D. Hiding the forecast from sales managers  
  _Rationale:_ Reduces, not improves, hygiene oversight.

**MST-1115-Q0003** (single-answer, Select ONE) Choosing the wrong report type in Salesforce most often causes:

- A. Missing or unexpected records because of object relationships **(key)**  
  _Rationale:_ Correct: report type controls which related records appear.
- B. The org to be deleted  
  _Rationale:_ Report type does not delete data.
- C. Users to lose their passwords  
  _Rationale:_ Unrelated to report type.
- D. Automatic currency conversion  
  _Rationale:_ Not a report-type effect.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
