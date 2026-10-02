# ServiceNow CIS: IT Service Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1230` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ServiceNow (no affiliation or endorsement) |
| Exam code | CIS-ITSM |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Legacy IDs | MST-CYB-SNOW-CISITSM-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of ITSM Foundations on ServiceNow (design-assumption grouping)
2. Explain and apply the concepts of Change, Request and Knowledge (design-assumption grouping)
3. Explain and apply the concepts of Configuration, SLAs and Analytics (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 ITSM Foundations on ServiceNow (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Logging every disruption as a problem rather than an incident
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | ITIL alignment and ITSM processes | 240 | 6 |
| M01L02 | Incident management | 240 | 6 |
| M01L03 | Problem management | 240 | 6 |

### M02 Change, Request and Knowledge (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Treating a standard change as if it needs full CAB approval
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Change management and CAB | 240 | 6 |
| M02L02 | Request management and the service catalog | 240 | 6 |
| M02L03 | Knowledge management | 240 | 6 |

### M03 Configuration, SLAs and Analytics (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Expecting SLAs to pause automatically without defined schedules
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CMDB and service modeling | 240 | 6 |
| M03L02 | Service level agreements (SLAs) | 240 | 6 |
| M03L03 | Performance Analytics and reporting | 240 | 6 |

## Integrative case

Configure an ITSM implementation for a help desk: set up incident and request flows, define an SLA, model a service in the CMDB, and build a Performance Analytics view for the service owner.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1230-practice-form-A | 81 | 81 | yes |
| MST-1230-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1230-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1230-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| ITSM Foundations on ServiceNow | 27 |
| Change, Request and Knowledge | 27 |
| Configuration, SLAs and Analytics | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1230-Q0001** (single-answer, Select ONE) In ITIL/ITSM terms, what is the primary goal of incident management?

- A. Restore normal service operation as quickly as possible **(key)**  
  _Rationale:_ Correct: incident management focuses on rapid restoration of service, not root cause.
- B. Find and remove the root cause of recurring issues  
  _Rationale:_ That is the goal of problem management, not incident management.
- C. Approve and schedule infrastructure changes  
  _Rationale:_ That is change management.
- D. Maintain accurate configuration records  
  _Rationale:_ That is configuration management.

**MST-1230-Q0002** (single-answer, Select ONE) Which ServiceNow capability defines and tracks the time targets for resolving a record?

- A. SLA definition **(key)**  
  _Rationale:_ Correct: SLA definitions set and measure time targets against schedules and conditions.
- B. Business rule  
  _Rationale:_ Business rules run logic on database operations, not SLA tracking specifically.
- C. Catalog item  
  _Rationale:_ Catalog items are requestable services, not time targets.
- D. Assignment rule  
  _Rationale:_ Assignment rules route records; they do not track time targets.

**MST-1230-Q0003** (multiple-answer, Select TWO) Which TWO are typically pre-approved and low-risk in change management?

- A. Standard changes **(key)**  
  _Rationale:_ Correct: standard changes are pre-authorised, low-risk and repeatable.
- B. Routine password-reset-type changes following an approved model **(key)**  
  _Rationale:_ Correct: changes following an approved standard model skip full CAB review.
- C. Emergency changes to fix a major outage  
  _Rationale:_ Emergency changes are high-urgency and need expedited (not pre-) approval.
- D. A major datacenter migration  
  _Rationale:_ Large, high-risk changes require full assessment and CAB.
- E. An untested production configuration change  
  _Rationale:_ Untested changes carry risk and are not pre-approved.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
