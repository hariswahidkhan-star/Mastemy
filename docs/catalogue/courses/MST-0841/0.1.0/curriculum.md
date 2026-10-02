# .NET Observability with OpenTelemetry

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0841` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **vendor-docs-partial - sources: SRC-MS-DOTNET-OTEL** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain logs, metrics and distributed tracing as the three pillars of observability
2. Instrument a .NET application using the built-in logging, metrics and activity APIs
3. Configure OpenTelemetry exporters (OTLP) to send telemetry to a backend
4. Correlate telemetry to diagnose latency and failures across components

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **vendor-docs-partial**. Source(s) consulted:
- https://learn.microsoft.com/dotnet/core/diagnostics/observability-with-otel

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Pillars of observability

- Purpose: Teach logs, metrics and distributed tracing and when each helps.
- Worked applications: (1) Classify five diagnostic questions as best answered by logs, metrics or traces; (2) Explain how a trace spans multiple components in a distributed call
- Common misconception addressed: Treating observability and debugging as the same invasive activity
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Logs, metrics and traces | 80 | 5 |
| M01L02 | Why observability differs from debugging | 80 | 5 |
| M01L03 | Telemetry sources in .NET | 80 | 5 |

### M02 Instrumenting .NET

- Purpose: Teach the ILogger, Meter and ActivitySource APIs that OTel builds on.
- Worked applications: (1) Emit a custom metric with System.Diagnostics.Metrics.Meter; (2) Create an ActivitySource span around a unit of work
- Common misconception addressed: Thinking OTel replaces the built-in .NET logging and metrics APIs
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | ILogger structured logging | 80 | 5 |
| M02L02 | Metrics with Meter | 80 | 5 |
| M02L03 | Distributed tracing with ActivitySource | 80 | 5 |

### M03 Exporting and analyzing

- Purpose: Teach configuring OTel exporters and reading telemetry.
- Worked applications: (1) Add OTLP exporter packages and point them at a local collector or dashboard; (2) Use correlated traces to find where latency is spent in a request
- Common misconception addressed: Logging so much high-cardinality data that it harms performance and cost
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | OpenTelemetry SDK configuration | 80 | 5 |
| M03L02 | OTLP exporters and backends | 80 | 5 |
| M03L03 | Correlating telemetry to diagnose issues | 80 | 5 |

## Integrative case

A request is intermittently slow and nobody can say which component is to blame. Instrument the .NET services with logs, metrics and traces, export via OTLP to a dashboard, and use correlated traces to locate the slow dependency.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0841-final-protected | 30 | 30 | yes |
| MST-0841-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Pillars of observability | 10 |
| Instrumenting .NET | 10 |
| Exporting and analyzing | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0841-Q0001** (single-answer, Select ONE) Which best describes distributed tracing among the three pillars of observability?

- A. It tracks a request and its activities across components so you can see where time is spent **(key)**  
  _Rationale:_ Correct: tracing follows a request across components to localize latency and failures.
- B. It records only counters and gauges such as active request count  
  _Rationale:_ Those are metrics, not traces.
- C. It stores individual event records like a single failed operation  
  _Rationale:_ That describes logs rather than distributed tracing.
- D. It is the same as attaching a debugger to production  
  _Rationale:_ Tracing is designed to be low-overhead and transparent, unlike invasive debugging.

**MST-0841-Q0002** (multiple-answer, Select TWO) Select TWO .NET framework APIs that the .NET OpenTelemetry implementation builds on for instrumentation.

- A. System.Diagnostics.Metrics.Meter for metrics **(key)**  
  _Rationale:_ Correct: OTel collects metrics emitted via Meter.
- B. System.Diagnostics.ActivitySource for distributed tracing **(key)**  
  _Rationale:_ Correct: OTel collects spans produced via ActivitySource/Activity.
- C. System.Console.WriteLine as the primary telemetry API  
  _Rationale:_ Console output is not the structured instrumentation API OTel consumes.
- D. A custom APM-specific proprietary API required by OTel  
  _Rationale:_ OTel avoids APM-specific APIs; it uses the standard .NET APIs.
- E. System.Threading.Thread for metrics collection  
  _Rationale:_ Thread is not a telemetry API.

**MST-0841-Q0003** (single-answer, Select ONE) You want to send .NET traces and metrics to any OpenTelemetry-compatible backend without coupling to one vendor. What should you configure?

- A. An OTLP exporter **(key)**  
  _Rationale:_ Correct: OTLP is the vendor-neutral wire protocol for exporting telemetry to compatible backends.
- B. A vendor-specific SDK in place of OpenTelemetry  
  _Rationale:_ A vendor SDK couples you to that vendor, the opposite of the goal.
- C. Only Console logging  
  _Rationale:_ Console logging does not export telemetry to a backend.
- D. A debugger attached to production  
  _Rationale:_ A debugger does not export telemetry and is invasive.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
