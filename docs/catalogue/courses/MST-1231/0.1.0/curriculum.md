# ServiceNow CIS: Human Resources

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1231` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

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

1. Explain and apply the concepts of HR Service Delivery Foundations (design-assumption grouping)
2. Explain and apply the concepts of Configuration and Content (design-assumption grouping)
3. Explain and apply the concepts of Security, Operations and Reporting (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 HR Service Delivery Foundations (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Exposing restricted HR cases in the general knowledge base
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | HR case and knowledge management | 240 | 6 |
| M01L02 | Employee Service Center | 240 | 6 |
| M01L03 | Lifecycle events | 240 | 6 |

### M02 Configuration and Content (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Storing sensitive employee documents without access controls
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | COE and topic categories | 240 | 6 |
| M02L02 | Employee document management | 240 | 6 |
| M02L03 | HR integrations | 240 | 6 |

### M03 Security, Operations and Reporting (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Assuming default ITSM roles grant appropriate HR data access
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | HR data security and scoping | 240 | 6 |
| M03L02 | Reporting and dashboards | 240 | 6 |
| M03L03 | Continual improvement | 240 | 6 |

## Integrative case

Stand up an HR Service Delivery implementation: configure HR services and knowledge, enable the Employee Service Center, secure sensitive cases and documents, and report on case volume by COE.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1231-practice-form-A | 81 | 81 | yes |
| MST-1231-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1231-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1231-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| HR Service Delivery Foundations | 27 |
| Configuration and Content | 27 |
| Security, Operations and Reporting | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1231-Q0001** (single-answer, Select ONE) Why does HR Service Delivery use a separate, scoped data model rather than the standard ITSM tables?

- A. To keep sensitive employee data isolated and access-controlled **(key)**  
  _Rationale:_ Correct: HR data is confidential, so it uses scoped tables with dedicated security.
- B. Because ITSM tables cannot store text  
  _Rationale:_ ITSM tables can store text; isolation is for confidentiality, not capability.
- C. To avoid using the CMDB entirely  
  _Rationale:_ CMDB relevance is unrelated to the reason for a scoped HR model.
- D. Because HR cannot use workflows  
  _Rationale:_ HR uses workflows/flows like other applications.

**MST-1231-Q0002** (single-answer, Select ONE) Which component gives employees a single place to request HR services and search HR knowledge?

- A. Employee Service Center / Employee Center **(key)**  
  _Rationale:_ Correct: the Employee Center is the self-service portal for HR services and knowledge.
- B. CMDB  
  _Rationale:_ The CMDB stores configuration items, not an employee portal.
- C. MID Server  
  _Rationale:_ A MID Server handles integrations/discovery, not self-service.
- D. Update set  
  _Rationale:_ Update sets capture configuration changes, not a portal.

**MST-1231-Q0003** (multiple-answer, Select TWO) Which TWO are good practices for protecting sensitive HR records?

- A. Apply ACLs that restrict access by HR role and COE **(key)**  
  _Rationale:_ Correct: role- and COE-based ACLs enforce least-privilege on HR data.
- B. Separate confidential cases from the general knowledge base **(key)**  
  _Rationale:_ Correct: keeping confidential content out of public KBs prevents exposure.
- C. Grant all agents the admin role for convenience  
  _Rationale:_ Over-provisioning admin violates least privilege.
- D. Store documents on a public portal page  
  _Rationale:_ Public storage exposes sensitive documents.
- E. Disable auditing to improve performance  
  _Rationale:_ Disabling auditing removes accountability and is unsafe for HR data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
