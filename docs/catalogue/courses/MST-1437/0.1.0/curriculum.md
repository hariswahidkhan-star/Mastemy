# Azure Monitor and Log Analytics with KQL

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1437` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts grounded in official Microsoft Azure Monitor, Log Analytics, and Kusto Query Language documentation read via the Microsoft Learn MCP on 2026-10-02. Portal labels and features can change by release and must be confirmed against the current build before production. |
| Official sources | https://learn.microsoft.com/azure/azure-monitor/logs/data-platform-logs |
| Evidence | **vendor-docs-partial** - official docs read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-AZMON |
| Legacy IDs | none |
| Planned time | T = 600 min; instruction I = 480 min (80%); assessment A = 120 min (20%) |
| Assessment split | lesson checks 30 / module checks 42 / cumulative 48 min |
| Certificate | Mastemy Certificate of Completion — Azure Monitor and Log Analytics with KQL (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe Azure Monitor and Log Analytics workspaces
2. Write KQL queries to filter, aggregate, and visualize log data
3. Create alerts and monitor workspace performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Azure Monitor and Log Analytics (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Create a Log Analytics workspace; (2) Retrieve data using Log Analytics Simple mode
- Common misconception addressed: Confusing metrics with logs in Azure Monitor
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The Azure Monitor data platform | 84 | 4 |
| M01L02 | Log Analytics workspaces | 84 | 4 |

### M02 Querying with KQL (MASTEMY-DESIGN 35%, design weight)

- Worked applications: (1) Filter rows with where and aggregate with summarize; (2) Render a timechart from a query
- Common misconception addressed: Running unbound queries that return gigabytes instead of using limit
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | KQL operators: where, summarize, project | 84 | 4 |
| M02L02 | Joins, bins, and rendering results | 84 | 4 |

### M03 Alerts and monitoring (MASTEMY-DESIGN 30%, design weight)

- Worked applications: (1) Create a log search alert rule from a query; (2) Measure ingestion latency with the percentile function
- Common misconception addressed: Expecting log search alerts to be as near-real-time as metric alerts
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Log search and metric alerts | 72 | 4 |
| M03L02 | Monitoring workspace performance | 72 | 4 |

## Integrative case

An engineer writes a KQL query against the Perf table to chart the 90th-percentile ingestion latency and creates a log search alert rule that fires when latency exceeds the baseline.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1437-final-protected | 24 | 32 | yes |
| MST-1437-final-alternate | 24 | 32 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Azure Monitor and Log Analytics | 8 |
| Querying with KQL | 8 |
| Alerts and monitoring | 8 |

Minimum reviewed item bank: 180 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1437-Q0001** (single-answer, Select ONE) Which KQL operator aggregates the contents of a table into a new summarized table?

- A. summarize **(key)**  
  _Rationale:_ Correct: summarize produces a new table that aggregates the input.
- B. where  
  _Rationale:_ where filters rows; it does not aggregate.
- C. project  
  _Rationale:_ project selects columns; it does not aggregate.
- D. take  
  _Rationale:_ take returns a number of rows; it does not aggregate.

**MST-1437-Q0002** (multiple-answer, Select TWO) Which TWO KQL operators are used to filter or select data? (Select TWO.)

- A. where **(key)**  
  _Rationale:_ Correct: where filters a table to rows that satisfy a predicate.
- B. project **(key)**  
  _Rationale:_ Correct: project selects, renames, or drops columns.
- C. render  
  _Rationale:_ render visualizes results; it does not filter or select.
- D. ingest  
  _Rationale:_ ingest is not a query operator for filtering data.

**MST-1437-Q0003** (single-answer, Select ONE) Which Azure Monitor alert type offers near-real-time monitoring by forking data from the log source?

- A. Metric alerts **(key)**  
  _Rationale:_ Correct: metric alerts for logs provide near-real-time monitoring.
- B. Log search alerts  
  _Rationale:_ Log search alerts evaluate on a schedule, not in near real time.
- C. Activity log alerts  
  _Rationale:_ Activity log alerts respond to activity events, not forked metric data.
- D. Smart detection alerts  
  _Rationale:_ Smart detection targets Application Insights anomalies, not this scenario.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
