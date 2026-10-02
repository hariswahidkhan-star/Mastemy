# ServiceNow CIS: Discovery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1232` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

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

1. Explain and apply the concepts of Discovery Foundations (design-assumption grouping)
2. Explain and apply the concepts of The Discovery Process (design-assumption grouping)
3. Explain and apply the concepts of CMDB Population and Troubleshooting (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 Discovery Foundations (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Running Discovery without a reachable MID Server
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | MID Server setup | 240 | 6 |
| M01L02 | Discovery schedules | 240 | 6 |
| M01L03 | Credentials and security | 240 | 6 |

### M02 The Discovery Process (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Expecting horizontal discovery to build service maps automatically
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Probes and sensors | 240 | 6 |
| M02L02 | Pattern-based discovery | 240 | 6 |
| M02L03 | Cloud and serverless discovery | 240 | 6 |

### M03 CMDB Population and Troubleshooting (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Allowing duplicate CIs by ignoring identification rules
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CMDB population and CI identification/reconciliation | 240 | 6 |
| M03L02 | Service mapping basics | 240 | 6 |
| M03L03 | Troubleshooting Discovery | 240 | 6 |

## Integrative case

Plan a Discovery rollout for a hybrid datacenter and cloud estate: configure a MID Server and credentials, schedule discovery, choose probes/patterns, and define how CIs reconcile into the CMDB without duplicates.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1232-practice-form-A | 81 | 81 | yes |
| MST-1232-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1232-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1232-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| Discovery Foundations | 27 |
| The Discovery Process | 27 |
| CMDB Population and Troubleshooting | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1232-Q0001** (single-answer, Select ONE) What component executes Discovery probes and patterns on behalf of the ServiceNow instance?

- A. MID Server **(key)**  
  _Rationale:_ Correct: the MID Server runs probes/patterns inside the customer network and returns results.
- B. Transform map  
  _Rationale:_ Transform maps map import data; they do not execute Discovery.
- C. Flow Designer  
  _Rationale:_ Flow Designer automates process logic, not Discovery execution.
- D. UI policy  
  _Rationale:_ UI policies control form behaviour.

**MST-1232-Q0002** (single-answer, Select ONE) Which mechanism prevents duplicate configuration items when Discovery runs repeatedly?

- A. CMDB identification and reconciliation rules **(key)**  
  _Rationale:_ Correct: identification/reconciliation rules match incoming data to existing CIs.
- B. Access control lists  
  _Rationale:_ ACLs enforce security, not CI deduplication.
- C. Notification rules  
  _Rationale:_ Notifications send messages; they do not reconcile CIs.
- D. Report schedules  
  _Rationale:_ Report schedules deliver reports, not CI identification.

**MST-1232-Q0003** (multiple-answer, Select TWO) Which TWO are required for the MID Server to discover a Linux host via SSH?

- A. Valid SSH credentials stored in ServiceNow **(key)**  
  _Rationale:_ Correct: Discovery needs credentials to authenticate to the target.
- B. Network reachability from the MID Server to the host **(key)**  
  _Rationale:_ Correct: the MID Server must be able to reach the host on the needed ports.
- C. A Performance Analytics license  
  _Rationale:_ Performance Analytics is unrelated to SSH discovery.
- D. A published knowledge article  
  _Rationale:_ Knowledge articles are irrelevant to discovery.
- E. A service catalog item  
  _Rationale:_ Catalog items are requestable services, not a discovery prerequisite.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
