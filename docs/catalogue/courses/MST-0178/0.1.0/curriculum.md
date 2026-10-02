# Microsoft SC-200: Security Operations Analyst Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0178` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | SC-200 |
| Version basis | Skills measured as of 2026-10-21 |
| Evidence | **verified-official-source** - source: SRC-MS-SC200 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/sc-200) |
| Legacy IDs | MST-MIC-MS-SC200-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Manage a Microsoft security-operations environment across Defender XDR and Sentinel
2. Respond to and remediate alerts and incidents across Defender XDR and Defender for Endpoint
3. Perform threat hunting with Kusto Query Language across Defender XDR and the Sentinel platform

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Manage a security operations environment (40-45%)

- Worked applications: (1) Apply the key concepts of 'Manage a security operations environment' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Manage a security operations environment'
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Configure automation for Microsoft Defender XDR and Microsoft Sentinel | 160 | 6 |
| M01L02 | Configure the Microsoft Sentinel SIEM and platform | 160 | 6 |
| M01L03 | Ingest data into the Microsoft Sentinel SIEM and platform | 160 | 6 |
| M01L04 | Configure detections | 160 | 6 |

### M02 Respond to security incidents (35-40%)

- Worked applications: (1) Apply the key concepts of 'Respond to security incidents' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Respond to security incidents'
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Respond to alerts and incidents in Microsoft Defender XDR | 160 | 6 |
| M02L02 | Respond to alerts and incidents in Microsoft Defender for Endpoint | 160 | 6 |
| M02L03 | Investigate Microsoft 365 activities to identify threats | 160 | 6 |

### M03 Perform threat hunting (20-25%)

- Worked applications: (1) Apply the key concepts of 'Perform threat hunting' to a realistic scenario; (2) Work a second scenario and compare alternatives
- Common misconception addressed: a frequent misunderstanding about 'Perform threat hunting'
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Detect threats by using Microsoft Defender XDR | 160 | 6 |
| M03L02 | Detect threats by using the Microsoft Sentinel platform | 160 | 6 |

## Integrative case

A SOC analyst onboards a new subsidiary into Microsoft Sentinel: configure data connectors and detections, build automation rules and playbooks, triage a multi-stage incident across endpoint and identity, and write KQL hunting queries to confirm the blast radius.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official source does not state question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0178-practice-form-A | 54 | 54 | yes |
| MST-0178-practice-form-B | 54 | 54 | no (optional practice) |
| MST-0178-practice-form-C | 54 | 54 | no (optional practice) |
| MST-0178-final-protected | 54 | 54 | yes |

| Domain | Items per form |
|---|---|
| Manage a security operations environment | 18 |
| Respond to security incidents | 18 |
| Perform threat hunting | 18 |

Minimum reviewed item bank: 576 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0178-Q0001** (single-answer, Select ONE) An analyst needs to automatically run a containment workflow whenever a high-severity incident is created in Microsoft Sentinel. Which Sentinel capability should be configured?

- A. An automation rule that triggers a playbook **(key)**  
  _Rationale:_ Correct: a Sentinel automation rule can trigger a playbook (Logic App) to run a containment workflow on incident creation.
- B. A workbook  
  _Rationale:_ Workbooks visualise data; they do not run response actions.
- C. A data connector  
  _Rationale:_ Data connectors ingest data; they do not orchestrate a response.
- D. A retention policy  
  _Rationale:_ Retention policies govern how long data is kept, not automated response.

**MST-0178-Q0002** (single-answer, Select ONE) During threat hunting, which language does the analyst use to write advanced hunting and detection queries across Defender XDR and Sentinel?

- A. Kusto Query Language (KQL) **(key)**  
  _Rationale:_ Correct: KQL is the query language for advanced hunting and analytics across Defender XDR and Sentinel.
- B. T-SQL  
  _Rationale:_ T-SQL queries relational SQL Server databases, not the Defender/Sentinel data platform.
- C. PromQL  
  _Rationale:_ PromQL queries Prometheus metrics, not Microsoft security telemetry.
- D. GraphQL  
  _Rationale:_ GraphQL is an API query language, not the hunting language for these products.

**MST-0178-Q0003** (multiple-answer, Select TWO) Select TWO Microsoft products whose alerts and incidents an SC-200 analyst is expected to investigate and remediate. (Select TWO.)

- A. Microsoft Defender for Endpoint **(key)**  
  _Rationale:_ Correct: investigating and remediating Defender for Endpoint incidents is an explicit objective.
- B. Microsoft Sentinel **(key)**  
  _Rationale:_ Correct: investigating and remediating Sentinel incidents is an explicit objective.
- C. Microsoft Excel  
  _Rationale:_ Excel is a spreadsheet application, not a security-operations product in scope.
- D. Microsoft Bookings  
  _Rationale:_ Bookings is a scheduling app and is out of scope for security operations.
- E. Windows Movie Maker  
  _Rationale:_ This is a consumer media tool and is not relevant to the exam.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
