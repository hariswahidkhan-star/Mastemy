# Prometheus Certified Associate (PCA) Exam Prep

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1516` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Linux Foundation / CNCF (no affiliation or endorsement) |
| Exam code | PCA |
| Version basis | unresolved (unconfirmed) |
| Evidence | **unverified-needs-official-check** - official outline not fetched (egress blocked); no source IDs |
| Legacy IDs | MST-PRG-LF-PCA-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Demonstrate knowledge of the 'Observability Concepts' domain to the depth required for independent exam preparation
2. Demonstrate knowledge of the 'Prometheus Fundamentals' domain to the depth required for independent exam preparation
3. Demonstrate knowledge of the 'PromQL' domain to the depth required for independent exam preparation
4. Demonstrate knowledge of the 'Instrumentation and Exporters' domain to the depth required for independent exam preparation
5. Demonstrate knowledge of the 'Alerting and Dashboards' domain to the depth required for independent exam preparation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope (design-assumption) outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on, performance-based or other official item formats are not reproduced in this format.

> Domain structure below is a **design assumption** drafted from general knowledge of this credential. It was **not** verified against the issuer's official exam outline (egress blocked). Domain names, weights, question counts and durations must be confirmed before production.

## Modules

### M01 Observability Concepts (weight: design assumption - confirm against official outline)

- Worked applications: (1) Classify a set of signals as metrics, logs or traces and justify each; (2) Explain why a short-lived batch job uses the Pushgateway rather than being scraped
- Common misconception addressed: Believing Prometheus pushes data to targets rather than scraping them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Describe observability and the role of metrics | 80 | 6 |
| M01L02 | Compare metrics, logs and traces | 80 | 6 |
| M01L03 | Describe the Prometheus push vs pull model | 80 | 6 |

### M02 Prometheus Fundamentals (weight: design assumption - confirm against official outline)

- Worked applications: (1) Write a scrape_config that discovers and scrapes two jobs at different intervals; (2) Pick the correct metric type (counter, gauge, histogram, summary) for four measurements
- Common misconception addressed: Using a gauge for a value that only ever increases instead of a counter
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Describe the Prometheus architecture and components | 80 | 6 |
| M02L02 | Install and configure Prometheus and scrape targets | 80 | 6 |
| M02L03 | Explain the data model, metric types and labels | 80 | 6 |

### M03 PromQL (weight: design assumption - confirm against official outline)

- Worked applications: (1) Write a PromQL query for the 95th-percentile request latency over 5 minutes using a histogram; (2) Build a recording rule that precomputes an expensive aggregation
- Common misconception addressed: Applying rate() to a gauge instead of a counter
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Use selectors, matchers and operators | 80 | 6 |
| M03L02 | Apply functions and aggregation operators | 80 | 6 |
| M03L03 | Create recording rules | 80 | 6 |

### M04 Instrumentation and Exporters (weight: design assumption - confirm against official outline)

- Worked applications: (1) Add a counter and a histogram to an app using a client library and expose /metrics; (2) Configure file-based service discovery to add targets without restarting Prometheus
- Common misconception addressed: Exposing high-cardinality labels (e.g. user IDs) and overwhelming the time series database
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Instrument application code with client libraries | 80 | 6 |
| M04L02 | Deploy and use exporters (node_exporter and others) | 80 | 6 |
| M04L03 | Configure service discovery for targets | 80 | 6 |

### M05 Alerting and Dashboards (weight: design assumption - confirm against official outline)

- Worked applications: (1) Write an alerting rule with a for: duration and verify pending vs firing states; (2) Configure an Alertmanager route that sends critical alerts to a different receiver
- Common misconception addressed: Expecting an alert to fire immediately rather than after its for: duration
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Write alerting rules and understand alert states | 80 | 6 |
| M05L02 | Route and silence alerts with Alertmanager | 80 | 6 |
| M05L03 | Visualise metrics in Grafana dashboards | 80 | 6 |

## Integrative case

An engineer instruments a web service and stands up monitoring: choose metric types, write a scrape config, build PromQL for latency SLOs, author alerting rules with sane for: windows, route them through Alertmanager, and present a Grafana dashboard to the on-call team.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official exam outline not fetched (egress blocked); question count, duration and domain weights are unconfirmed. Confirm on the issuer's official exam page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1516-practice-form-A | 40 | 40 | yes |
| MST-1516-practice-form-B | 40 | 40 | no (optional practice) |
| MST-1516-practice-form-C | 40 | 40 | no (optional practice) |
| MST-1516-final-protected | 40 | 40 | yes |

| Domain | Items per form |
|---|---|
| Observability Concepts | 8 |
| Prometheus Fundamentals | 8 |
| PromQL | 8 |
| Instrumentation and Exporters | 8 |
| Alerting and Dashboards | 8 |

Minimum reviewed item bank: 550 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1516-Q0001** (single-answer, Select ONE) How does Prometheus normally collect metrics from an instrumented service?

- A. It scrapes an HTTP /metrics endpoint on a schedule (pull model) **(key)**  
  _Rationale:_ Correct: Prometheus pulls by scraping targets' /metrics endpoints.
- B. The service pushes metrics directly to Prometheus on every event  
  _Rationale:_ Prometheus is pull-based; direct per-event push is not its model.
- C. It reads metrics from the kernel audit log  
  _Rationale:_ Prometheus does not source metrics from kernel audit logs.
- D. It queries a relational database for counters  
  _Rationale:_ Prometheus scrapes exporters/endpoints, not a relational database.

**MST-1516-Q0002** (single-answer, Select ONE) Which PromQL function gives the per-second average rate of increase of a counter over the last 5 minutes?

- A. rate(metric[5m]) **(key)**  
  _Rationale:_ Correct: rate() computes the per-second average increase of a counter over the range.
- B. avg(metric)  
  _Rationale:_ avg() averages instant values across series, not the rate of a counter.
- C. delta(metric[5m])  
  _Rationale:_ delta() is for gauges and returns the difference, not a per-second rate.
- D. count(metric)  
  _Rationale:_ count() returns the number of series, not a rate.

**MST-1516-Q0003** (multiple-answer, Select TWO) Which TWO are valid Prometheus metric types? (Select TWO.)

- A. Counter **(key)**  
  _Rationale:_ Correct: a counter is a cumulative, monotonically increasing metric.
- B. Histogram **(key)**  
  _Rationale:_ Correct: a histogram samples observations into configurable buckets.
- C. Ledger  
  _Rationale:_ Ledger is not a Prometheus metric type.
- D. Pointer  
  _Rationale:_ Pointer is not a Prometheus metric type.
- E. Stream  
  _Rationale:_ Stream is not a Prometheus metric type.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
