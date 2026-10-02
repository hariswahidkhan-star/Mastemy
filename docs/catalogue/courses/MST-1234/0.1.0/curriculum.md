# ServiceNow CIS: Risk and Compliance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1234` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

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

1. Explain and apply the concepts of GRC Foundations (design-assumption grouping)
2. Explain and apply the concepts of GRC Operations (design-assumption grouping)
3. Explain and apply the concepts of Assessment, Reporting and Integration (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 GRC Foundations (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Treating a policy as the same object as a control
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Integrated Risk/GRC overview | 240 | 6 |
| M01L02 | Policy and compliance management | 240 | 6 |
| M01L03 | Risk management | 240 | 6 |

### M02 GRC Operations (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Closing an issue before remediation is verified
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Control and indicator management | 240 | 6 |
| M02L02 | Issue and remediation management | 240 | 6 |
| M02L03 | Audit management | 240 | 6 |

### M03 Assessment, Reporting and Integration (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Assuming indicators update controls without a defined schedule
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Risk assessment methodologies | 240 | 6 |
| M03L02 | Reporting and dashboards | 240 | 6 |
| M03L03 | Integrations and continuous monitoring | 240 | 6 |

## Integrative case

Configure a GRC program: define a policy and related controls, set up risk and indicator monitoring, run an audit engagement, and build a dashboard showing open issues and control effectiveness.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1234-practice-form-A | 81 | 81 | yes |
| MST-1234-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1234-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1234-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| GRC Foundations | 27 |
| GRC Operations | 27 |
| Assessment, Reporting and Integration | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1234-Q0001** (single-answer, Select ONE) In ServiceNow GRC, what does a control do?

- A. Implements a safeguard that mitigates a risk and can be tested **(key)**  
  _Rationale:_ Correct: controls are safeguards mapped to risks/policies and are tested for effectiveness.
- B. States a high-level organisational rule  
  _Rationale:_ That describes a policy, not a control.
- C. Records an audit finding  
  _Rationale:_ That is an issue/finding, not a control.
- D. Stores a configuration item  
  _Rationale:_ That is the CMDB's role.

**MST-1234-Q0002** (single-answer, Select ONE) Which object tracks a deficiency that needs remediation?

- A. Issue **(key)**  
  _Rationale:_ Correct: issues capture deficiencies/findings and drive remediation tasks.
- B. Catalog item  
  _Rationale:_ Catalog items are requestable services.
- C. MID Server  
  _Rationale:_ A MID Server handles integrations/discovery.
- D. Notification  
  _Rationale:_ Notifications send messages, they do not track deficiencies.

**MST-1234-Q0003** (multiple-answer, Select TWO) Which TWO support continuous control monitoring?

- A. Indicators that automatically test control criteria on a schedule **(key)**  
  _Rationale:_ Correct: automated indicators evaluate controls continuously.
- B. Integrations that pull evidence from source systems **(key)**  
  _Rationale:_ Correct: integrations supply current evidence for monitoring.
- C. Manually re-typing results once a year only  
  _Rationale:_ Annual manual entry is not continuous monitoring.
- D. Disabling the audit module  
  _Rationale:_ Disabling audit removes oversight.
- E. Deleting historical risk records  
  _Rationale:_ Deleting history undermines monitoring and traceability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
