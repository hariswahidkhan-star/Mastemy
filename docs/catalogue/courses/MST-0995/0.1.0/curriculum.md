# Observability with OpenTelemetry, Prometheus, and Grafana

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0995` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-PG-001 |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Observability with OpenTelemetry, Prometheus, and Grafana (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Observability concepts: metrics, logs and traces
2. Instrumenting applications with OpenTelemetry
3. Metrics with Prometheus and PromQL
4. Distributed tracing and spans
5. Structured logging and correlation
6. Dashboards and visualisation in Grafana
7. Alerting, SLOs and error budgets
8. Pipelines, collectors and cost control

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; live tooling, real incident response and system operation are not assessed in this format.

## Modules

### M01 Observability concepts: metrics, logs and traces (MASTEMY-DESIGN 13%)

- Worked applications: (1) Decide whether a latency problem needs traces or metrics; (2) Reduce a high-cardinality label to control cost
- Common misconception addressed: Collecting everything and drowning in low-value data
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The three pillars and when each helps | 120 | 6 |
| M01L02 | Signals, cardinality and sampling basics | 120 | 6 |

### M02 Instrumenting applications with OpenTelemetry (MASTEMY-DESIGN 13%)

- Worked applications: (1) Add OpenTelemetry instrumentation to a service; (2) Propagate trace context across a service call
- Common misconception addressed: Instrumenting only one service and losing cross-service context
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Auto and manual instrumentation with OpenTelemetry | 120 | 6 |
| M02L02 | Context propagation across services | 120 | 6 |

### M03 Metrics with Prometheus and PromQL (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a PromQL query for request rate; (2) Add a recording rule for p95 latency
- Common misconception addressed: Using high-cardinality labels that blow up Prometheus memory
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prometheus data model and scraping | 120 | 6 |
| M03L02 | Writing PromQL queries and rules | 120 | 6 |

### M04 Distributed tracing and spans (MASTEMY-DESIGN 12%)

- Worked applications: (1) Follow a slow request through its spans; (2) Identify the span that dominates total latency
- Common misconception addressed: Treating a trace as a single log line instead of a span tree
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Spans, parent-child relationships and context | 120 | 6 |
| M04L02 | Reading a trace across multiple services | 120 | 6 |

### M05 Structured logging and correlation (MASTEMY-DESIGN 13%)

- Worked applications: (1) Emit a structured log with a trace id; (2) Jump from a log line to its trace
- Common misconception addressed: Logging unstructured text that cannot be correlated with traces
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Emitting structured logs | 120 | 6 |
| M05L02 | Correlating logs with traces by id | 120 | 6 |

### M06 Dashboards and visualisation in Grafana (MASTEMY-DESIGN 13%)

- Worked applications: (1) Build a dashboard panel for error rate; (2) Add a template variable for environment
- Common misconception addressed: Building dashboards no one uses instead of answering specific questions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Building a Grafana dashboard | 120 | 6 |
| M06L02 | Variables, panels and time ranges | 120 | 6 |

### M07 Alerting, SLOs and error budgets (MASTEMY-DESIGN 12%)

- Worked applications: (1) Define an availability SLO and its SLI; (2) Create a multi-window burn-rate alert
- Common misconception addressed: Alerting on raw CPU instead of user-facing SLOs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Defining SLIs and SLOs | 120 | 6 |
| M07L02 | Alert rules, burn rates and error budgets | 120 | 6 |

### M08 Pipelines, collectors and cost control (MASTEMY-DESIGN 12%)

- Worked applications: (1) Route signals through a Collector; (2) Apply tail sampling to cut trace volume
- Common misconception addressed: Keeping full-fidelity traces forever and overspending on storage
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | The OpenTelemetry Collector pipeline | 120 | 6 |
| M08L02 | Controlling cardinality, sampling and cost | 120 | 6 |

## Integrative case

Make a multi-service web app observable: instrument each service with OpenTelemetry and propagate context, export metrics to Prometheus and traces through a Collector, build Grafana dashboards tied to an availability SLO, and add a burn-rate alert, while keeping cardinality and sampling under cost control.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0995-final-protected | 40 | 40 | yes |
| MST-0995-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Observability concepts: metrics, logs and traces | 5 |
| Instrumenting applications with OpenTelemetry | 5 |
| Metrics with Prometheus and PromQL | 5 |
| Distributed tracing and spans | 5 |
| Structured logging and correlation | 5 |
| Dashboards and visualisation in Grafana | 5 |
| Alerting, SLOs and error budgets | 5 |
| Pipelines, collectors and cost control | 5 |

Minimum reviewed item bank: 608 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0995-Q0001** (single-answer, Select ONE) Which signal is best suited to finding which service in a request chain caused high end-to-end latency?

- A. A distributed trace, because its spans show time spent in each service along the request path **(key)**  
  _Rationale:_ Correct: traces break a request into spans per service, revealing where latency accrues.
- B. A single counter metric with no labels  
  _Rationale:_ An unlabelled counter cannot localise latency to a service.
- C. An unstructured application log  
  _Rationale:_ Unstructured logs alone do not reconstruct the cross-service timeline.
- D. A static dashboard screenshot  
  _Rationale:_ A screenshot is not a signal source for latency analysis.

**MST-0995-Q0002** (multiple-answer, Select ALL that apply) Which statements about metric cardinality in Prometheus are correct? (Select TWO)

- A. Each unique combination of label values creates a separate time series **(key)**  
  _Rationale:_ Correct: cardinality is the number of distinct label-value combinations, each a series.
- B. Putting unbounded values like user IDs in labels can exhaust memory **(key)**  
  _Rationale:_ Correct: high-cardinality labels such as user IDs cause series explosion and memory pressure.
- C. Labels have no effect on the number of stored time series  
  _Rationale:_ Labels directly determine how many series exist.
- D. Cardinality only matters for logs, not metrics  
  _Rationale:_ Cardinality is a central concern for metrics in Prometheus.

**MST-0995-Q0003** (single-answer, Select ONE) Why alert on an SLO burn rate rather than on raw CPU utilisation?

- A. Burn-rate alerts track consumption of the error budget tied to user-facing reliability, reducing noise from benign resource spikes **(key)**  
  _Rationale:_ Correct: SLO burn-rate alerting focuses on user impact and the error budget, not incidental resource use.
- B. CPU utilisation cannot be measured by Prometheus  
  _Rationale:_ CPU can be measured; the point is relevance, not capability.
- C. Burn-rate alerts remove the need for dashboards  
  _Rationale:_ Alerts and dashboards serve different purposes.
- D. Raw CPU always correlates exactly with user experience  
  _Rationale:_ High CPU does not reliably indicate user-facing failure.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
