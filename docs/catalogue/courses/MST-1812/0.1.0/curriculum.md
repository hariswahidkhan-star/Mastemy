# Salesforce Certified Platform App Builder Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1812` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Salesforce (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION: not confirmed (official source not verified) |
| Version basis | DESIGN ASSUMPTION - official outline not verified (network egress blocked 2026-10-02) |
| Evidence | **unverified-needs-official-check** - no official source fetched; confirm outline, weightings and item counts before SME review |
| Legacy IDs | MST-BUS-SFDC-PAB-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Salesforce platform data modelling with objects, fields, relationships and schema
2. Build app UIs with Lightning App Builder, pages, record pages and navigation declaratively
3. Automate business processes with flows, approval processes and declarative logic
4. Apply security, reporting, and app deployment/management on the platform

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Data Modelling and the Declarative Platform (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Select the right field type and relationship for three requirements; (2) Use record types and page layouts to serve two business units
- Common misconception addressed: Adding code when App Builder, flows and formulas would suffice
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Standard and custom objects, fields and relationships | 120 | 6 |
| M01L02 | Schema design, record types, page layouts and the Schema Builder | 120 | 6 |
| M01L03 | Choosing declarative tools over code (the App Builder mindset) | 120 | 6 |

### M02 Building User Interfaces and App Experiences (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Configure a record page with dynamic forms and conditional visibility; (2) Design a Lightning app with the right pages and utility items
- Common misconception addressed: Believing every UI change requires a developer
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lightning App Builder, app pages, home and record pages | 120 | 6 |
| M02L02 | Dynamic forms, dynamic actions and component visibility | 120 | 6 |
| M02L03 | Navigation, utility bar and app branding/management | 120 | 6 |

### M03 Automation, Security, Reporting and Deployment (weight: DESIGN ASSUMPTION - unverified)

- Worked applications: (1) Design a record-triggered flow that routes an approval; (2) Set org-wide defaults and sharing rules for a confidential object
- Common misconception addressed: Confusing object-level, field-level and record-level security
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Flows (screen, record-triggered, scheduled) and approval processes | 120 | 6 |
| M03L02 | Security: profiles, permission sets, roles, OWD and sharing | 120 | 6 |
| M03L03 | Reports, dashboards, and deployment via change sets/packages | 120 | 6 |

## Integrative case

Build an internal projects app declaratively: model objects and relationships, design Lightning record pages, automate approvals with a flow, secure data with profiles/permission sets, and package it for deployment.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official source not verified; the official question count and duration are unknown. Confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1812-practice-form-A | 45 | 45 | yes |
| MST-1812-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1812-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1812-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Data Modelling and the Declarative Platform | 15 |
| Building User Interfaces and App Experiences | 15 |
| Automation, Security, Reporting and Deployment | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1812-Q0001** (single-answer, Select ONE) A business wants records of one object shared more openly than the org-wide default allows, but only for a specific group. What should an app builder use?

- A. A sharing rule **(key)**  
  _Rationale:_ Correct: sharing rules open up access beyond the org-wide default for defined groups or criteria.
- B. A validation rule  
  _Rationale:_ Validation rules enforce data quality; they do not control sharing.
- C. A page layout  
  _Rationale:_ Page layouts control UI arrangement, not record access.
- D. A formula field  
  _Rationale:_ Formula fields compute values; they do not grant record access.

**MST-1812-Q0002** (single-answer, Select ONE) Which automation tool is the recommended declarative choice for complex record-triggered business logic in Salesforce today?

- A. Flow **(key)**  
  _Rationale:_ Correct: Flow is Salesforce's primary declarative automation tool and the recommended path over retired tools.
- B. Workflow Rules  
  _Rationale:_ Workflow Rules are being retired in favour of Flow.
- C. Process Builder  
  _Rationale:_ Process Builder is being retired in favour of Flow.
- D. Apex trigger (always)  
  _Rationale:_ Code is only needed when declarative tools cannot meet the requirement.

**MST-1812-Q0003** (multiple-answer, Select TWO) Which TWO are ways to grant a user additional permissions beyond their profile?

- A. Assign a permission set **(key)**  
  _Rationale:_ Correct: permission sets add permissions on top of a profile.
- B. Assign a permission set group **(key)**  
  _Rationale:_ Correct: a permission set group bundles permission sets for assignment.
- C. Change the record's page layout  
  _Rationale:_ Page layouts affect UI, not permissions.
- D. Add a validation rule  
  _Rationale:_ Validation rules restrict data entry; they do not grant permissions.
- E. Create a report folder  
  _Rationale:_ Report folders organise reports; they do not grant object permissions.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
