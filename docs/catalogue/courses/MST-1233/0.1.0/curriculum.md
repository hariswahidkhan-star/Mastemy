# ServiceNow CIS: Customer Service Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1233` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ServiceNow (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION / unresolved |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of CSM Foundations (design-assumption grouping)
2. Explain and apply the concepts of Self-Service and Operations (design-assumption grouping)
3. Explain and apply the concepts of Configuration, Products and Reporting (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 CSM Foundations (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Modeling B2C consumers as B2B accounts
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Customer service model (B2B/B2C) | 240 | 6 |
| M01L02 | Accounts, contacts and consumers | 240 | 6 |
| M01L03 | Case management | 240 | 6 |

### M02 Self-Service and Operations (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Expecting SLAs to run without defined schedules
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Communities and self-service portal | 240 | 6 |
| M02L02 | Agent Workspace | 240 | 6 |
| M02L03 | Automation, SLAs and major issue management | 240 | 6 |

### M03 Configuration, Products and Reporting (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Granting case access without checking account/entitlement relationships
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Entitlements, products and assets | 240 | 6 |
| M03L02 | Integrations (field service, ITSM) | 240 | 6 |
| M03L03 | Reporting and dashboards | 240 | 6 |

## Integrative case

Implement CSM for a B2B software vendor: set up accounts/contacts and entitlements, configure case management and an SLA, enable a self-service portal, and report on case resolution by product.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1233-practice-form-A | 81 | 81 | yes |
| MST-1233-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1233-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1233-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| CSM Foundations | 27 |
| Self-Service and Operations | 27 |
| Configuration, Products and Reporting | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1233-Q0001** (single-answer, Select ONE) In ServiceNow CSM, which record type represents an organisation you provide service to?

- A. Account **(key)**  
  _Rationale:_ Correct: an account represents a customer organisation in the B2B model.
- B. Incident  
  _Rationale:_ Incident is an ITSM record, not a CSM customer organisation.
- C. Configuration item  
  _Rationale:_ A CI represents infrastructure, not a customer organisation.
- D. Knowledge article  
  _Rationale:_ A KB article is content, not a customer organisation.

**MST-1233-Q0002** (single-answer, Select ONE) What determines whether a contact is eligible to receive a given level of support?

- A. Entitlement **(key)**  
  _Rationale:_ Correct: entitlements define the support a contact/account is eligible for.
- B. Business rule  
  _Rationale:_ Business rules run logic; they are not the eligibility definition.
- C. UI action  
  _Rationale:_ UI actions add buttons/links, not eligibility.
- D. Dashboard  
  _Rationale:_ Dashboards visualise data, not entitlement.

**MST-1233-Q0003** (multiple-answer, Select TWO) Which TWO reduce agent workload in a CSM deployment?

- A. A self-service portal with knowledge and community **(key)**  
  _Rationale:_ Correct: self-service deflects cases from agents.
- B. Automated case routing and assignment **(key)**  
  _Rationale:_ Correct: automation reduces manual triage effort.
- C. Removing all SLAs  
  _Rationale:_ Removing SLAs harms service quality, it does not reduce workload responsibly.
- D. Giving every customer the admin role  
  _Rationale:_ That is a security risk, not a workload reduction.
- E. Disabling notifications  
  _Rationale:_ Disabling notifications hurts communication, not workload meaningfully.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
