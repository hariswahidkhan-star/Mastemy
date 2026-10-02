# ISACA CISM: Certified Information Security Manager

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0095` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ISACA (no affiliation or endorsement) |
| Exam code | CISM |
| Version basis | DESIGN ASSUMPTION - official outline not retrieved (network egress blocked on issuer site) |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked on 2026-10-02; structure is a DESIGN ASSUMPTION pending official confirmation |
| Legacy IDs | MST-CYB-ISACA-CISM-001 |
| Planned time | T = 4800 min; instruction I = 3840 min (80%); assessment A = 960 min (20%) |
| Assessment split | lesson checks 240 / module checks 336 / cumulative 384 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain information-security governance and its alignment to business strategy (design-assumption scope, pending official confirmation)
2. Apply information-security risk-management practices across the risk lifecycle
3. Describe development and management of an information-security program
4. Plan and manage information-security incident response and recovery

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Information security governance (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Information security governance' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Information security governance'
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Governance, strategy and alignment to business goals | 480 | 6 |
| M01L02 | Roles, responsibilities and security culture | 480 | 6 |

### M02 Information security risk management (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Information security risk management' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Information security risk management'
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Risk identification and assessment | 480 | 6 |
| M02L02 | Risk response, treatment and monitoring | 480 | 6 |

### M03 Information security program (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Information security program' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Information security program'
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Program development and resources | 480 | 6 |
| M03L02 | Security controls, metrics and awareness | 480 | 6 |

### M04 Incident management (DESIGN ASSUMPTION)

- Worked applications: (1) Apply the key concepts of 'Incident management' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Incident management'
- Module check: 84 items / 84 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Incident response planning and preparation | 480 | 6 |
| M04L02 | Detection, response and recovery | 480 | 6 |

## Integrative case

A newly appointed security manager aligns the security program to business objectives: establishes a governance committee, runs a risk assessment, prioritises controls against a risk appetite, and stands up an incident-response capability with defined roles.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0095-practice-form-A | 144 | 144 | yes |
| MST-0095-practice-form-B | 144 | 144 | no (optional practice) |
| MST-0095-practice-form-C | 144 | 144 | no (optional practice) |
| MST-0095-final-protected | 144 | 144 | yes |

| Domain | Items per form |
|---|---|
| Information security governance | 36 |
| Information security risk management | 36 |
| Information security program | 36 |
| Incident management | 36 |

Minimum reviewed item bank: 1344 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0095-Q0001** (single-answer, Select ONE) A security manager wants the information-security strategy to directly support enterprise objectives. Which action best demonstrates governance alignment?

- A. Mapping security initiatives to documented business goals and risk appetite approved by leadership **(key)**  
  _Rationale:_ Correct: governance alignment ties security initiatives to business goals and an approved risk appetite.
- B. Deploying the newest security tools regardless of business context  
  _Rationale:_ Tool-first decisions without business alignment are the opposite of governance alignment.
- C. Delegating all strategy decisions to the firewall administrator  
  _Rationale:_ Strategy is a governance responsibility, not a single operator's task.
- D. Avoiding any documentation to stay flexible  
  _Rationale:_ Governance depends on documented, approved direction.

**MST-0095-Q0002** (single-answer, Select ONE) In risk management, 'risk appetite' is best defined as which of the following?

- A. The amount and type of risk an organization is willing to accept in pursuit of its objectives **(key)**  
  _Rationale:_ Correct: risk appetite is the level of risk leadership is willing to accept to meet objectives.
- B. The total number of vulnerabilities found in a scan  
  _Rationale:_ That is a technical finding count, not risk appetite.
- C. The budget spent on security tools  
  _Rationale:_ Spend is an input, not a statement of acceptable risk.
- D. The time taken to patch a system  
  _Rationale:_ Patch time is an operational metric, not risk appetite.

**MST-0095-Q0003** (multiple-answer, Select TWO) Select TWO activities that belong to incident-response preparation. (Select TWO.)

- A. Defining incident roles and an escalation path in advance **(key)**  
  _Rationale:_ Correct: defining roles and escalation is preparation done before incidents occur.
- B. Establishing and testing an incident-response plan **(key)**  
  _Rationale:_ Correct: building and exercising the plan is preparation.
- C. Negotiating the quarterly sales forecast  
  _Rationale:_ Sales forecasting is unrelated to incident response.
- D. Choosing the office coffee supplier  
  _Rationale:_ This is irrelevant to incident-response preparation.
- E. Setting the company dividend  
  _Rationale:_ Dividend policy is a finance decision, not incident preparation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
