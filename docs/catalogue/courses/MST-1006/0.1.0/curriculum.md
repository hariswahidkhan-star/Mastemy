# Performance, Load, and Stress Testing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1006` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | MST-PRG-SK-PT-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Performance, Load, and Stress Testing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Performance testing fundamentals
2. Test types and when to use them
3. Workload modelling
4. Metrics, percentiles and analysis
5. Finding bottlenecks
6. Capacity and reporting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Performance testing fundamentals (MASTEMY-DESIGN 17%)

- Worked applications: (1) Translate a business need into a measurable performance requirement; (2) Distinguish throughput from latency in a result set
- Common misconception addressed: Reporting only averages and ignoring tail latency
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Performance requirements and SLIs/SLOs | 80 | 6 |
| M01L02 | Latency, throughput, utilisation and saturation | 80 | 6 |

### M02 Test types and when to use them (MASTEMY-DESIGN 17%)

- Worked applications: (1) Select the test type that exposes a given risk; (2) Design a soak test to reveal a memory leak
- Common misconception addressed: Thinking one big load test covers stress, spike and soak concerns
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Load, stress, spike and soak tests | 80 | 6 |
| M02L02 | Choosing the test type for a risk | 80 | 6 |

### M03 Workload modelling (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a workload mix reflecting real user behaviour; (2) Choose an open model to simulate arrival-rate growth
- Common misconception addressed: Hammering an endpoint with no think time and calling it realistic
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Open versus closed workload models | 80 | 6 |
| M03L02 | Think time, pacing and realistic mixes | 80 | 6 |

### M04 Metrics, percentiles and analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Report p95/p99 and explain what they mean; (2) Correlate rising latency with a saturating resource
- Common misconception addressed: Assuming a low average latency means all users are fast
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Why percentiles beat averages | 80 | 6 |
| M04L02 | Correlating client and server metrics | 80 | 6 |

### M05 Finding bottlenecks (MASTEMY-DESIGN 16%)

- Worked applications: (1) Locate the saturating resource behind rising latency; (2) Identify the knee where throughput stops scaling
- Common misconception addressed: Blaming the application when the database connection pool is the limit
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The USE method and resource saturation | 80 | 6 |
| M05L02 | Queueing effects and the knee of the curve | 80 | 6 |

### M06 Capacity and reporting (MASTEMY-DESIGN 16%)

- Worked applications: (1) Recommend capacity with a stated safety margin; (2) Write a result summary a non-specialist can act on
- Common misconception addressed: Sizing for the average load rather than the expected peak
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | From results to a capacity decision | 80 | 6 |
| M06L02 | Headroom, safety margin and reporting to stakeholders | 80 | 6 |

## Integrative case

Plan and interpret a performance test campaign for a checkout API before a sales event: set performance requirements, design load/stress/soak scenarios with realistic workload models, choose metrics and percentiles, find the bottleneck from the results, and recommend a capacity decision.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1006-final-protected | 30 | 30 | yes |
| MST-1006-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1006-Q0001** (single-answer, Select ONE) A report shows average response time of 120 ms but users complain of slowness. Which metric best reveals the problem?

- A. The p99 (99th percentile) latency **(key)**  
  _Rationale:_ Correct: tail percentiles expose the slow experiences the average hides.
- B. The arithmetic mean only  
  _Rationale:_ The mean is what already hid the problem.
- C. Total request count  
  _Rationale:_ Request count does not describe the slow experiences.
- D. Server uptime  
  _Rationale:_ Uptime is unrelated to per-request latency distribution.

**MST-1006-Q0002** (multiple-answer, Select TWO) Which TWO test types are most appropriate to find a slow memory leak and to find behaviour beyond normal peak? (Select TWO)

- A. A soak test for the slow memory leak **(key)**  
  _Rationale:_ Correct: a long-duration soak test reveals leaks that only appear over time.
- B. A stress test for behaviour beyond normal peak **(key)**  
  _Rationale:_ Correct: stress testing pushes past expected peak to find the breaking point.
- C. A single short smoke test for both  
  _Rationale:_ A short smoke test cannot reveal leaks or breaking points.
- D. A static code review for both  
  _Rationale:_ A code review is not a performance test type.

**MST-1006-Q0003** (single-answer, Select ONE) Throughput stops increasing while latency rises sharply as load grows. What does this indicate?

- A. A resource has saturated; the system is past the knee of the curve **(key)**  
  _Rationale:_ Correct: flat throughput with rising latency marks resource saturation.
- B. The test client is too fast  
  _Rationale:_ A fast client does not cause server-side saturation symptoms.
- C. The SLO is set too low  
  _Rationale:_ The SLO setting does not change the observed saturation.
- D. Percentiles are being miscalculated  
  _Rationale:_ The pattern is a real saturation signal, not a metrics artifact.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
