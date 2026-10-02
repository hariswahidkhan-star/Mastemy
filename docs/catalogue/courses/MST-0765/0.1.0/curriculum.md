# Amazon CloudWatch: Monitoring and Operational Visibility

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0765` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon CloudWatch User Guide; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-CW (https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon CloudWatch: Monitoring and Operational Visibility (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Collect metrics, custom metrics and dimensions
2. Build dashboards and visualisations
3. Create alarms and composite alarms
4. Work with Logs, Logs Insights and metric filters
5. Use events/EventBridge and automated responses
6. Apply monitoring strategy and cost practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Metrics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Publish a custom business metric; (2) Choose the right statistic and period for latency
- Common misconception addressed: Averaging a percentile metric and misreading tail latency
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Namespaces, dimensions and statistics | 80 | 7 |
| M01L02 | Custom metrics and resolution | 80 | 7 |

### M02 Dashboards (MASTEMY-DESIGN 16%)

- Worked applications: (1) Build a service health dashboard; (2) Add a cross-account widget
- Common misconception addressed: Cluttering a dashboard so key signals are lost
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Building dashboards | 80 | 7 |
| M02L02 | Widgets and cross-account views | 80 | 7 |

### M03 Alarms (MASTEMY-DESIGN 17%)

- Worked applications: (1) Alarm on sustained high error rate with an SNS action; (2) Combine alarms to reduce noise
- Common misconception addressed: Setting thresholds so tight they fire constantly
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Metric alarms and thresholds | 80 | 7 |
| M03L02 | Composite alarms and actions | 80 | 7 |

### M04 Logs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Query errors across a service with Logs Insights; (2) Create a metric filter to alarm on a log pattern
- Common misconception addressed: Keeping logs forever and ignoring retention cost
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Log groups and retention | 80 | 7 |
| M04L02 | Logs Insights and metric filters | 80 | 7 |

### M05 Events and automation (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trigger a Lambda on a specific event pattern; (2) Auto-restart a failed resource via an event
- Common misconception addressed: Confusing scheduled events with reactive event patterns
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | EventBridge rules | 80 | 7 |
| M05L02 | Automated remediation | 80 | 7 |

### M06 Strategy and cost (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define SLO-based alarms for a service; (2) Reduce log cost with filtering and retention
- Common misconception addressed: Treating more dashboards as better observability
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Monitoring strategy and SLOs | 80 | 7 |
| M06L02 | Cost of metrics, logs and alarms | 80 | 7 |

## Integrative case

Give a service real operational visibility: publish a custom metric, build a focused dashboard, create a composite alarm with an SNS action, query failures in Logs Insights with a metric filter, trigger remediation via EventBridge, and tune retention to control cost.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0765-final-protected | 40 | 50 | yes |
| MST-0765-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Metrics | 7 |
| Dashboards | 7 |
| Alarms | 7 |
| Logs | 7 |
| Events and automation | 6 |
| Strategy and cost | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0765-Q0001** (single-answer, Select ONE) Which CloudWatch feature lets you run ad-hoc queries across log data to investigate an incident?

- A. CloudWatch Logs Insights **(key)**  
  _Rationale:_ Correct: Logs Insights runs interactive queries over log groups.
- B. A metric alarm  
  _Rationale:_ Alarms evaluate thresholds; they do not run log queries.
- C. A dashboard widget  
  _Rationale:_ Widgets visualise data but do not provide ad-hoc log querying.
- D. A namespace  
  _Rationale:_ A namespace is a metric container, not a query tool.

**MST-0765-Q0002** (single-answer, Select ONE) You want one alarm that only fires when both high latency AND high error rate are true. What do you use?

- A. A composite alarm combining the two metric alarms **(key)**  
  _Rationale:_ Correct: composite alarms combine multiple alarm states with logic such as AND.
- B. A single metric alarm  
  _Rationale:_ A single metric alarm cannot combine two independent metrics with logic.
- C. A log retention setting  
  _Rationale:_ Retention controls storage, not alarm logic.
- D. A dashboard  
  _Rationale:_ Dashboards visualise but do not alarm.

**MST-0765-Q0003** (multiple-answer, Select TWO) Which TWO actions help control CloudWatch Logs cost? (Select TWO.)

- A. Set appropriate retention periods on log groups **(key)**  
  _Rationale:_ Correct: retention limits how long logs are stored and billed.
- B. Filter or sample noisy, low-value logs **(key)**  
  _Rationale:_ Correct: reducing ingested volume lowers cost.
- C. Keep all logs indefinitely by default  
  _Rationale:_ Indefinite retention increases cost.
- D. Duplicate every log into three groups  
  _Rationale:_ Duplication raises both ingestion and storage cost.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
