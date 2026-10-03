# Salesforce Administration Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2272` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint and teach durable, transferable platform concepts. Platform features, pricing and user interfaces change frequently; product specifics must be verified at production and on-screen steps may differ from any shown. |
| Evidence | **n/a-no-official-syllabus** - sources: none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Salesforce Administration Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain core CRM concepts and how Salesforce objects, records and relationships model a business
2. Manage users, profiles, roles and permissions following least privilege
3. Customise objects, fields, page layouts and record types to fit a process
4. Control data visibility with org-wide defaults, sharing rules and the role hierarchy
5. Automate simple processes with declarative tools and validation
6. Maintain data quality and produce reports and dashboards for stakeholders

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 CRM and the data model (25% (design weight), design weight)

- Worked applications: (1) Model a simple sales process as objects and relationships; (2) Explain the difference between a lead and an opportunity
- Common misconception addressed: Thinking a CRM is just a contact list rather than a process model
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CRM concepts and the Salesforce platform | 120 | 7 |
| M01L02 | Objects, fields, records and relationships | 120 | 7 |

### M02 Users, access and security (25% (design weight), design weight)

- Worked applications: (1) Grant a new rep only the access their job needs; (2) Choose a permission set vs editing a profile for a one-off need
- Common misconception addressed: Assuming everyone should get the System Administrator profile
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Users, profiles, roles and permission sets | 120 | 7 |
| M02L02 | Org-wide defaults, sharing rules and visibility | 120 | 7 |

### M03 Customisation and automation (25% (design weight), design weight)

- Worked applications: (1) Add a required field and a layout for a support process; (2) Build a validation rule that blocks an impossible close date
- Common misconception addressed: Believing automation can fix data that was never required at entry
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Custom fields, page layouts and record types | 120 | 7 |
| M03L02 | Declarative automation and validation rules | 120 | 7 |

### M04 Data quality and reporting (25% (design weight), design weight)

- Worked applications: (1) Clean a duplicate-ridden contact import before loading; (2) Build a dashboard answering one manager's weekly question
- Common misconception addressed: Treating a report as finished without checking who can see its data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Importing, de-duplicating and maintaining data | 120 | 7 |
| M04L02 | Reports, dashboards and list views | 120 | 7 |

## Integrative case

A growing non-profit adopts Salesforce for donor management: model donors and gifts as objects, set up users with least-privilege access, control who can see sensitive records, customise layouts and a validation rule for a stewardship process, import and de-duplicate existing data, and build a dashboard the director reviews each week.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2272-final-protected | 40 | 40 | yes |
| MST-2272-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| CRM and the data model | 10 |
| Users, access and security | 10 |
| Customisation and automation | 10 |
| Data quality and reporting | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2272-Q0001** (single-answer, Select ONE) A new support agent needs read access to one extra object for a short project without changing their baseline job access. What is the cleanest way to grant it?

- A. Assign a permission set that adds the extra access on top of their profile **(key)**  
  _Rationale:_ Correct: permission sets grant additional access without altering the underlying profile.
- B. Change their profile and change it back later  
  _Rationale:_ Editing the profile affects everyone on it and is error-prone to reverse.
- C. Give them the System Administrator profile  
  _Rationale:_ That violates least privilege and over-grants access.
- D. Share your own login  
  _Rationale:_ Credential sharing is a security and audit failure.

**MST-2272-Q0002** (multiple-answer, Select TWO) Which TWO mechanisms determine whether one user can see another user's records? (Select TWO.)

- A. Organisation-wide default sharing settings **(key)**  
  _Rationale:_ Correct: org-wide defaults set the baseline record visibility.
- B. The role hierarchy and sharing rules **(key)**  
  _Rationale:_ Correct: the role hierarchy and sharing rules open access above the baseline.
- C. The colour theme the user selected  
  _Rationale:_ Theming is cosmetic and does not affect record access.
- D. The user's email signature  
  _Rationale:_ An email signature has no bearing on data visibility.

**MST-2272-Q0003** (single-answer, Select ONE) Managers complain that close dates are sometimes entered in the past. Which tool prevents the bad data at entry?

- A. A validation rule that rejects a close date earlier than today **(key)**  
  _Rationale:_ Correct: validation rules enforce data integrity when a record is saved.
- B. A report that lists the bad records afterwards  
  _Rationale:_ A report finds problems after the fact; it does not prevent them.
- C. A dashboard chart of close dates  
  _Rationale:_ A dashboard visualises data but cannot block invalid entry.
- D. Asking users to be careful  
  _Rationale:_ Unenforced guidance does not reliably prevent bad data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
