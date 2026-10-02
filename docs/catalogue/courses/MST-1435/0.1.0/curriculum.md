# Microsoft Defender XDR Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1435` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Defender XDR documentation read via the Microsoft Learn MCP on 2026-10-02. Portal labels and feature availability can change by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/defender-xdr/incidents-overview |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-DEFXDR |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Defender XDR Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how incidents and alerts work in the Microsoft Defender portal
2. Investigate and respond to incidents including automated response
3. Use advanced hunting and understand cross-product correlation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Incidents and alerts (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Prioritize incidents in the incident queue by severity; (2) Review the attack story and assets of an incident
- Common misconception addressed: Treating each alert as an isolated event instead of part of a correlated incident
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Incidents, alerts, and correlation | 84 | 4 |
| M01L02 | The Microsoft Defender portal | 84 | 4 |

### M02 Investigation and response (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Approve or reject a pending remediation action in Evidence and Response; (2) Isolate a device as a response action
- Common misconception addressed: Assuming automated investigation always acts without any approval
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Investigating incidents | 84 | 4 |
| M02L02 | Automated investigation and response (AIR) | 84 | 4 |

### M03 Advanced hunting and workloads (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Write a KQL advanced hunting query; (2) Correlate signals across Defender for Endpoint, Identity, and Office 365
- Common misconception addressed: Thinking advanced hunting queries can scan unlimited history
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Advanced hunting with KQL | 72 | 4 |
| M03L02 | Cross-product signal correlation | 72 | 4 |

## Integrative case

A SOC analyst triages a correlated incident, reviews the attack story, approves a remediation action to isolate a device, and runs a KQL advanced hunting query to find related activity.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1435-final-protected | 24 | 32 | yes |
| MST-1435-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Incidents and alerts | 8 |
| Investigation and response | 8 |
| Advanced hunting and workloads | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1435-Q0001** (single-answer, Select ONE) In Microsoft Defender XDR, what is an incident?

- A. A group of related alerts that form a single attack story **(key)**  
  _Rationale:_ Correct: correlation engines aggregate related alerts into one incident.
- B. A single raw log line  
  _Rationale:_ A raw event is not an incident on its own.
- C. A firewall rule  
  _Rationale:_ A firewall rule is unrelated to an incident.
- D. A device compliance policy  
  _Rationale:_ A compliance policy is not an incident.

**MST-1435-Q0002** (multiple-answer, Select TWO) Which TWO are capabilities of Microsoft Defender XDR? (Select TWO.)

- A. Automated investigation and response (AIR) **(key)**  
  _Rationale:_ Correct: AIR investigates and can remediate threats automatically.
- B. Advanced hunting using Kusto Query Language (KQL) **(key)**  
  _Rationale:_ Correct: advanced hunting uses KQL to query collected data.
- C. Automatically formatting hard drives on every alert  
  _Rationale:_ Incorrect: Defender XDR does not wipe drives on every alert.
- D. Issuing TLS certificates  
  _Rationale:_ Incorrect: certificate issuance is not a Defender XDR function.

**MST-1435-Q0003** (single-answer, Select ONE) Which language is used to write advanced hunting queries in Microsoft Defender?

- A. Kusto Query Language (KQL) **(key)**  
  _Rationale:_ Correct: advanced hunting queries are written in KQL.
- B. Transact-SQL (T-SQL)  
  _Rationale:_ T-SQL is used by SQL Server, not advanced hunting.
- C. DAX  
  _Rationale:_ DAX is a Power BI formula language, not for hunting.
- D. Bicep  
  _Rationale:_ Bicep is infrastructure-as-code, not a query language.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
