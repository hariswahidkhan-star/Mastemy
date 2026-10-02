# Microsoft Sentinel: Security Monitoring and Response

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0693` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus (Mastemy skills course). Microsoft Sentinel SIEM, data connectors, analytics rules, incidents and SOAR behaviour partially verified against official Microsoft Learn Sentinel docs; re-verify specifics at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-SENTINEL (https://learn.microsoft.com/azure/sentinel/overview, accessed 2026-10-02) |
| Legacy IDs | MST-MIC-SK-MSE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Microsoft Sentinel: Security Monitoring and Response (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the SIEM/SOAR model and Sentinel architecture
2. Connect data sources and manage the Log Analytics workspace
3. Write KQL for detection and investigation
4. Build analytics rules that create incidents
5. Investigate and manage incidents and entities
6. Automate response with playbooks and SOAR

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 SIEM/SOAR and Sentinel architecture (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Explain how alerts become incidents in Sentinel; (2) Plan which log sources matter for three threats
- Common misconception addressed: Treating a SIEM as a log archive rather than detection
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SIEM and SOAR concepts and Sentinel architecture | 77 | 5 |
| M01L02 | Workspaces, ingestion and cost signals | 77 | 5 |

### M02 Data connectors (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Onboard identity and endpoint connectors; (2) Decide what to ingest versus leave out for cost
- Common misconception addressed: Ingesting everything without a detection purpose
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Data connectors and normalisation | 77 | 5 |
| M02L02 | Workspace design and retention | 77 | 5 |

### M03 KQL for detection (MASTEMY-DESIGN 18%, design weight)

- Worked applications: (1) Write a KQL query to find impossible-travel sign-ins; (2) Summarise failed logons by account and host
- Common misconception addressed: Writing queries that match too broadly and flood alerts
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | KQL fundamentals for security data | 86 | 5 |
| M03L02 | Detection queries and tuning for noise | 87 | 5 |

### M04 Analytics rules and incidents (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Turn a KQL query into a scheduled analytics rule; (2) Map a rule to MITRE ATT&CK tactics
- Common misconception addressed: Creating rules with no severity or entity mapping
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Scheduled analytics rules and entity mapping | 81 | 5 |
| M04L02 | Incident creation, grouping and MITRE coverage | 82 | 5 |

### M05 Incident investigation (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Investigate an incident using the timeline and entities; (2) Use the investigation graph to find the root cause
- Common misconception addressed: Closing incidents without recording the finding
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Incident queue, timeline and entities | 81 | 5 |
| M05L02 | Investigation graph and similar incidents | 82 | 5 |

### M06 Automation and SOAR (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Build a playbook that disables a user on a high-severity incident; (2) Add an approval step before a disruptive action
- Common misconception addressed: Automating destructive actions without a human gate
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Playbooks and Logic Apps automation | 76 | 5 |
| M06L02 | Automation rules and response gating | 77 | 5 |

## Integrative case

A SOC onboards Sentinel for a mid-size firm. Connect identity, endpoint and cloud logs to a central workspace, write KQL detections mapped to MITRE ATT&CK, create analytics rules that raise incidents, build an investigation workflow with entities and a timeline, and automate containment with a playbook, then defend the detection coverage.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0693-final-protected | 30 | 30 | yes |
| MST-0693-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| SIEM/SOAR and Sentinel architecture | 5 |
| Data connectors | 5 |
| KQL for detection | 5 |
| Analytics rules and incidents | 5 |
| Incident investigation | 5 |
| Automation and SOAR | 5 |

Minimum reviewed item bank: 348 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0693-Q0001** (single-answer, Select ONE) An analyst wants low-fidelity alerts from several sources grouped into one investigable record. What does Sentinel use?

- A. Analytics rules that correlate alerts into incidents **(key)**  
  _Rationale:_ Correct: incidents group related alerts for investigation.
- B. A raw log export to CSV  
  _Rationale:_ Raw export is not correlation.
- C. Disabling all alerts  
  _Rationale:_ That removes detection.
- D. A single metric chart  
  _Rationale:_ A chart is not incident correlation.

**MST-0693-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce alert fatigue while keeping real detections? (Select TWO.)

- A. Tune queries and thresholds to cut false positives **(key)**  
  _Rationale:_ Correct: tuning reduces noise.
- B. Map rules to MITRE ATT&CK and set meaningful severity **(key)**  
  _Rationale:_ Correct: prioritisation focuses analysts on real risk.
- C. Alert on every event with no filtering  
  _Rationale:_ Unfiltered alerting floods the SOC.
- D. Ingest only after an incident occurs  
  _Rationale:_ Late ingestion misses detection windows.

**MST-0693-Q0003** (single-answer, Select ONE) A high-severity incident should immediately disable a compromised account but a human must confirm first. How should the playbook be built?

- A. Automate the containment with a required approval step before the disable action **(key)**  
  _Rationale:_ Correct: gating destructive actions balances speed and control.
- B. Auto-disable with no review for all incidents  
  _Rationale:_ Ungated destructive automation is risky.
- C. Only email the SOC and take no action  
  _Rationale:_ Notification alone delays containment.
- D. Delete the workspace  
  _Rationale:_ That destroys the SIEM, not the threat.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
