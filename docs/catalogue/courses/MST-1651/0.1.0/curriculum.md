# ServiceNow Certified Implementation Specialist - HR Service Delivery Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1651` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ServiceNow (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION - not confirmed from an official source (kept out of official_exam_code) |
| Version basis | DESIGN ASSUMPTION - not confirmed from an official source |
| Evidence | **unverified-needs-official-check** - official source could not be fetched (network egress blocked 2026-10-02) |
| Legacy IDs | MST-CYB-SNOW-CISHR-001 |
| Planned time | T = 1350 min; instruction I = 1080 min (80%); assessment A = 270 min (20%) |
| Assessment split | lesson checks 45 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the ServiceNow HR Service Delivery (HRSD) data model, scoped apps and personas
2. Configure HR services, catalogs, and HR case management
3. Implement Employee Center, knowledge, and employee self-service
4. Configure lifecycle events, document management, and integrations/security for HRSD

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> **Module structure, titles and all weightings below are DESIGN ASSUMPTIONS.** The official exam outline could not be fetched (network egress blocked on 2026-10-02) and must be confirmed against the issuer's official source before SME review and publication.

## Modules

### M01 HRSD Foundations and Data Model (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Define an HR service and the HR criteria that scope who can see it; (2) Model the relationship between HR case, HR service and COE
- Common misconception addressed: Confusing an HR service (catalog-facing) with the COE (the department grouping that owns it)
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | HRSD architecture, scoped apps and COE structure | 120 | 6 |
| M01L02 | HR services, HR criteria and personas | 120 | 6 |
| M01L03 | HR profile, employee data and confidentiality basics | 120 | 6 |

### M02 HR Case Management and Employee Center (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Configure auto-assignment of an HR case to the correct COE; (2) Publish a knowledge article scoped to the right audience in Employee Center
- Common misconception addressed: Assuming all HR cases are visible to all fulfillers rather than scoped by COE and criteria
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | HR case types, states and assignment | 120 | 6 |
| M02L02 | Record producers, catalog items and the HR portal | 120 | 6 |
| M02L03 | Employee Center, knowledge bases and self-service | 120 | 6 |

### M03 Lifecycle Events, Documents, Integrations and Security (weight: DESIGN ASSUMPTION)

- Worked applications: (1) Build an onboarding lifecycle event with sequential activity sets; (2) Apply HR security to keep sensitive case documents confidential
- Common misconception addressed: Treating ACLs and HR criteria as interchangeable when controlling access to HR data
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Lifecycle Events and activity sets for onboarding/offboarding | 120 | 6 |
| M03L02 | Employee Document Management and templates | 120 | 6 |
| M03L03 | Integrations, HR security and data confidentiality | 120 | 6 |

## Integrative case

An HR team is implementing ServiceNow HRSD for onboarding: design the HR service and catalog, configure case types and assignment, publish knowledge in Employee Center, and build an onboarding lifecycle event while keeping HR data confidential.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source was not fetched; official question count, duration and domain weightings must be confirmed on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1651-practice-form-A | 45 | 45 | yes |
| MST-1651-practice-form-B | 45 | 45 | no (optional practice) |
| MST-1651-practice-form-C | 45 | 45 | no (optional practice) |
| MST-1651-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| HRSD Foundations and Data Model | 15 |
| HR Case Management and Employee Center | 15 |
| Lifecycle Events, Documents, Integrations and Security | 15 |

Minimum reviewed item bank: 498 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1651-Q0001** (single-answer, Select ONE) In ServiceNow HRSD, what does a Center of Excellence (COE) primarily represent?

- A. A grouping that owns a set of HR services and the cases raised against them **(key)**  
  _Rationale:_ Correct: a COE (e.g. Benefits, Payroll) owns related HR services and their cases.
- B. A single employee's HR profile record  
  _Rationale:_ An HR profile is one employee's data, not a service-owning grouping.
- C. A network firewall zone  
  _Rationale:_ COE is an HRSD organisational concept, not infrastructure.
- D. A type of knowledge article  
  _Rationale:_ A COE is not a knowledge article; it owns services and cases.

**MST-1651-Q0002** (single-answer, Select ONE) An employee submits an HR request through Employee Center. Which ServiceNow object most directly captures and tracks the work to fulfil it?

- A. An HR case **(key)**  
  _Rationale:_ Correct: HR requests are tracked and fulfilled as HR cases.
- B. A CMDB configuration item  
  _Rationale:_ The CMDB tracks IT assets, not HR request fulfilment.
- C. A change request  
  _Rationale:_ Change requests manage IT changes, not HR service delivery.
- D. An incident record in ITSM  
  _Rationale:_ HRSD uses HR cases, not ITSM incidents, for HR requests.

**MST-1651-Q0003** (multiple-answer, Select TWO) Select TWO ServiceNow capabilities that help keep sensitive HR case information confidential.

- A. HR-specific security/ACL configuration restricting who can read HR records **(key)**  
  _Rationale:_ Correct: HR security and ACLs restrict access to sensitive HR data.
- B. Marking HR cases and documents as confidential/restricted to the HR role **(key)**  
  _Rationale:_ Correct: confidentiality settings limit visibility of sensitive HR cases and documents.
- C. Publishing all HR knowledge articles to every employee by default  
  _Rationale:_ Broad publishing reduces rather than protects confidentiality.
- D. Disabling all logging on HR records  
  _Rationale:_ Disabling logging harms auditability and is not a confidentiality control.
- E. Granting the admin role to every fulfiller  
  _Rationale:_ Over-granting access weakens confidentiality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
