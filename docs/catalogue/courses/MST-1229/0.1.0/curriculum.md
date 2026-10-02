# ServiceNow Certified Application Developer: CAD

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1229` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ServiceNow (no affiliation or endorsement) |
| Exam code | CAD |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Legacy IDs | MST-CYB-SNOW-CAD-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of Application Development Fundamentals (design-assumption grouping)
2. Explain and apply the concepts of Server-Side and Client-Side Scripting (design-assumption grouping)
3. Explain and apply the concepts of Building, Extending and Deploying Apps (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 Application Development Fundamentals (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Building in the global scope when a scoped app is required
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Scoped applications and the data model | 240 | 6 |
| M01L02 | Tables, fields and extending tables | 240 | 6 |
| M01L03 | Access control lists (ACLs) | 240 | 6 |

### M02 Server-Side and Client-Side Scripting (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Running heavy queries in client scripts instead of server-side
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Business rules and script includes | 240 | 6 |
| M02L02 | Client scripts and UI policies | 240 | 6 |
| M02L03 | GlideRecord and server APIs | 240 | 6 |

### M03 Building, Extending and Deploying Apps (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Deploying changes without capturing them in an application/update set
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Flow Designer and integrations | 240 | 6 |
| M03L02 | UI actions and form design | 240 | 6 |
| M03L03 | Application packaging and deployment | 240 | 6 |

## Integrative case

Design a scoped application for managing equipment loans: define the data model and ACLs, add a business rule and client script, build a flow, and describe how you would package it for deployment.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1229-practice-form-A | 81 | 81 | yes |
| MST-1229-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1229-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1229-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| Application Development Fundamentals | 27 |
| Server-Side and Client-Side Scripting | 27 |
| Building, Extending and Deploying Apps | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1229-Q0001** (single-answer, Select ONE) Which scripting object should be used to query records on the server in ServiceNow?

- A. GlideRecord **(key)**  
  _Rationale:_ Correct: GlideRecord is the standard server-side API for querying and manipulating records.
- B. GlideForm (g_form)  
  _Rationale:_ g_form manipulates the form in the browser, it does not query the database.
- C. GlideUser (g_user)  
  _Rationale:_ g_user exposes client-side user info, not record querying.
- D. GlideModal  
  _Rationale:_ GlideModal creates dialog windows, not database queries.

**MST-1229-Q0002** (single-answer, Select ONE) Where should reusable server-side functions be stored so multiple scripts can call them?

- A. Script include **(key)**  
  _Rationale:_ Correct: script includes hold reusable server-side classes/functions callable from other server scripts.
- B. Client script  
  _Rationale:_ Client scripts run in the browser and are not reusable server logic.
- C. UI policy  
  _Rationale:_ UI policies declaratively control form fields, not reusable code.
- D. Dictionary entry  
  _Rationale:_ Dictionary entries define fields, not functions.

**MST-1229-Q0003** (multiple-answer, Select TWO) Which TWO are valid ways to control row-level security for a table?

- A. Create an ACL on the table with a condition and/or script **(key)**  
  _Rationale:_ Correct: ACLs evaluate conditions, roles and scripts to grant record access.
- B. Use a 'before query' business rule to add query conditions **(key)**  
  _Rationale:_ Correct: a before-query business rule can restrict which rows a user sees.
- C. Add a client script that hides rows  
  _Rationale:_ Client scripts affect forms, not server-side row security.
- D. Change the table label  
  _Rationale:_ Labels are cosmetic and do not affect security.
- E. Disable the list view  
  _Rationale:_ Hiding a view does not enforce record-level security.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
