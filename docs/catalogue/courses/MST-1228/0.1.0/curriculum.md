# ServiceNow Certified System Administrator: CSA

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1228` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ServiceNow (no affiliation or endorsement) |
| Exam code | CSA |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Legacy IDs | MST-CYB-SNOW-CSA-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of Platform Fundamentals and Navigation (design-assumption grouping)
2. Explain and apply the concepts of Data Administration and Configuration (design-assumption grouping)
3. Explain and apply the concepts of Self-Service, Automation and Reporting (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 Platform Fundamentals and Navigation (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Confusing the application navigator scope with user roles
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | User interface and navigation | 216 | 6 |
| M01L02 | Lists, filters and forms | 216 | 6 |
| M01L03 | Branding and personalization | 216 | 6 |

### M02 Data Administration and Configuration (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Assuming import sets write directly to target tables without transform maps
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Tables, fields and relationships | 216 | 6 |
| M02L02 | Importing data and transform maps | 216 | 6 |
| M02L03 | Configuration Management (CMDB) basics | 216 | 6 |

### M03 Self-Service, Automation and Reporting (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Granting access by assigning roles directly to users instead of groups
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Users, groups and roles | 216 | 6 |
| M03L02 | Notifications and events | 216 | 6 |
| M03L03 | Flow Designer and workflow basics | 216 | 6 |
| M03L04 | Reporting and dashboards | 216 | 6 |

## Integrative case

You are onboarding a new department onto a ServiceNow instance: configure a table and form, set up groups and roles, build a notification and a simple flow, and produce a report for the service owner.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1228-practice-form-A | 81 | 81 | yes |
| MST-1228-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1228-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1228-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| Platform Fundamentals and Navigation | 27 |
| Data Administration and Configuration | 27 |
| Self-Service, Automation and Reporting | 27 |

Minimum reviewed item bank: 822 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1228-Q0001** (single-answer, Select ONE) In ServiceNow, what is the recommended way to grant a set of users the same access?

- A. Assign roles to a group and add the users to the group **(key)**  
  _Rationale:_ Correct: roles are assigned to groups and inherited by members, which scales and is easier to maintain.
- B. Assign each role to each user individually  
  _Rationale:_ Direct per-user role assignment is hard to maintain and error-prone.
- C. Give every user the admin role  
  _Rationale:_ Over-provisioning admin violates least privilege.
- D. Add users to the sys_user table manually  
  _Rationale:_ Being a user record does not itself grant application access.

**MST-1228-Q0002** (single-answer, Select ONE) Which ServiceNow feature transforms imported data before it is written to a target table?

- A. Transform map **(key)**  
  _Rationale:_ Correct: a transform map maps and transforms staged import-set rows into the target table.
- B. Business rule  
  _Rationale:_ Business rules run on database operations but are not the import mapping mechanism.
- C. UI policy  
  _Rationale:_ UI policies control form behaviour, not data import mapping.
- D. Access control rule  
  _Rationale:_ ACLs enforce security, not import transformation.

**MST-1228-Q0003** (multiple-answer, Select TWO) Which TWO objects can a notification be triggered by in ServiceNow?

- A. A record being inserted or updated **(key)**  
  _Rationale:_ Correct: notifications can be triggered by record insert/update conditions.
- B. An event being generated **(key)**  
  _Rationale:_ Correct: notifications can be triggered by events in the event queue.
- C. A report being exported to PDF  
  _Rationale:_ Exporting a report does not trigger notifications.
- D. A user logging out  
  _Rationale:_ Logout is not a standard notification trigger.
- E. A dashboard being viewed  
  _Rationale:_ Viewing a dashboard does not trigger notifications.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
