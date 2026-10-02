# Observability: Logs, Metrics, Traces

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1583` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain observability and its three core signals
2. Design useful structured logging
3. Define and use metrics and dashboards
4. Apply distributed tracing to understand request flow
5. Set meaningful alerts and SLOs
6. Use signals together to debug production issues

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Observability foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify a question as a log, metric or trace need; (2) Explain cardinality's effect on metrics
- Common misconception addressed: Treating more dashboards as more observability
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Monitoring vs observability | 168 | 8 |
| M01L02 | The three signals and when to use each | 168 | 8 |

### M02 Logging (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add structured fields and a correlation ID; (2) Choose appropriate log levels
- Common misconception addressed: Logging unstructured text that cannot be queried
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Structured and levelled logging | 168 | 8 |
| M02L02 | Correlation IDs and log hygiene | 168 | 8 |

### M03 Metrics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Instrument a counter and a histogram; (2) Build a RED dashboard for a service
- Common misconception addressed: Using high-cardinality labels that blow up storage
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Metric types and labels | 168 | 8 |
| M03L02 | Dashboards and the RED/USE methods | 168 | 8 |

### M04 Distributed tracing (MASTEMY-DESIGN 20%)

- Worked applications: (1) Follow a request across services in a trace; (2) Identify a slow span
- Common misconception addressed: Breaking trace context across a service boundary
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Spans, traces and context propagation | 168 | 8 |
| M04L02 | Reading a trace to find bottlenecks | 168 | 8 |

### M05 Alerting, SLOs and debugging (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define an SLI and SLO for latency; (2) Write an alert that is actionable, not noisy
- Common misconception addressed: Alerting on causes instead of user-facing symptoms
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | SLIs, SLOs and error budgets | 168 | 8 |
| M05L02 | Actionable alerts and incident debugging | 168 | 8 |

## Integrative case

A service's latency spikes intermittently: use logs, metrics and traces together to localise the cause, then propose an SLO and alert that would have caught it earlier.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1583-final-protected | 25 | 25 | yes |
| MST-1583-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Observability foundations | 5 |
| Logging | 5 |
| Metrics | 5 |
| Distributed tracing | 5 |
| Alerting, SLOs and debugging | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1583-Q0001** (single-answer, Select ONE) Which signal best answers 'where did time go in this single request across services'?

- A. A distributed trace **(key)**  
  _Rationale:_ Correct: traces show per-span timing across services.
- B. A single log line  
  _Rationale:_ One log line lacks cross-service timing.
- C. A CPU metric  
  _Rationale:_ A metric aggregates; it does not follow one request.
- D. A static dashboard title  
  _Rationale:_ That provides no per-request detail.

**MST-1583-Q0002** (multiple-answer, Select TWO) Which TWO make an alert actionable rather than noisy? (Select TWO.)

- A. It fires on a user-facing symptom tied to an SLO **(key)**  
  _Rationale:_ Correct: symptom-based alerts matter to users.
- B. It includes enough context to begin investigation **(key)**  
  _Rationale:_ Correct: context speeds response.
- C. It fires on every minor fluctuation  
  _Rationale:_ Over-firing causes alert fatigue.
- D. It has no defined owner or runbook  
  _Rationale:_ Unowned alerts are not actionable.

**MST-1583-Q0003** (single-answer, Select ONE) Why are high-cardinality labels risky for metrics?

- A. They can explode the number of time series and storage cost **(key)**  
  _Rationale:_ Correct: each label combination is a new series.
- B. They make logs unreadable  
  _Rationale:_ This concerns metrics, not logs.
- C. They disable tracing  
  _Rationale:_ Labels do not disable tracing.
- D. They are required for every metric  
  _Rationale:_ They are to be used sparingly.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
