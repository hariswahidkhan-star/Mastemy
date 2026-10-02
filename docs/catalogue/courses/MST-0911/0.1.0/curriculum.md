# Advanced Go: Distributed Services and Performance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0911` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Advanced Go: Distributed Services and Performance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Advanced concurrency
2. Service communication
3. Resilience and reliability
4. Distributed systems concepts
5. Observability
6. Performance and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Advanced concurrency (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a cancellable pipeline with errgroup; (2) Add backpressure with a bounded channel
- Common misconception addressed: Spawning unbounded goroutines under load
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pipelines, cancellation and errgroup | 120 | 6 |
| M01L02 | Backpressure and bounded resources | 120 | 6 |

### M02 Service communication (MASTEMY-DESIGN 16%)

- Worked applications: (1) Define a protobuf service and generate code; (2) Version an API without breaking clients
- Common misconception addressed: Breaking wire compatibility by reordering fields
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | gRPC, protobuf and HTTP APIs | 120 | 6 |
| M02L02 | Serialization and API versioning | 120 | 6 |

### M03 Resilience and reliability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a circuit breaker around a flaky dependency; (2) Make a write idempotent with a request key
- Common misconception addressed: Retrying non-idempotent writes and duplicating effects
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Timeouts, retries, circuit breakers | 120 | 6 |
| M03L02 | Idempotency and graceful degradation | 120 | 6 |

### M04 Distributed systems concepts (MASTEMY-DESIGN 16%)

- Worked applications: (1) Reason about at-least-once versus exactly-once delivery; (2) Choose a caching strategy and invalidation approach
- Common misconception addressed: Assuming network calls are reliable and instant
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Consistency, failure modes and the CAP trade-off | 120 | 6 |
| M04L02 | Coordination, caching and messaging | 120 | 6 |

### M05 Observability (MASTEMY-DESIGN 16%)

- Worked applications: (1) Propagate a trace across two services; (2) Expose RED/USE metrics for a service
- Common misconception addressed: Logging without correlation IDs across services
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Metrics, structured logging and tracing | 120 | 6 |
| M05L02 | Distributed tracing across services | 120 | 6 |

### M06 Performance and operations (MASTEMY-DESIGN 18%)

- Worked applications: (1) Find an allocation hot spot with pprof; (2) Benchmark a change and confirm the win
- Common misconception addressed: Guessing at performance instead of profiling
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Profiling with pprof and benchmarking | 120 | 6 |
| M06L02 | Deployment, configuration and operations | 120 | 6 |

## Integrative case

Evolve a Go service into a distributed system: add structured concurrency and backpressure, expose gRPC and HTTP, make calls resilient with timeouts and retries, add observability, profile with pprof, and reason about consistency across services.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0911-final-protected | 36 | 36 | yes |
| MST-0911-final-alternate | 36 | 36 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Advanced concurrency | 6 |
| Service communication | 6 |
| Resilience and reliability | 6 |
| Distributed systems concepts | 6 |
| Observability | 6 |
| Performance and operations | 6 |

Minimum reviewed item bank: 468 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0911-Q0001** (single-answer, Select ONE) Why must retrying a failed request generally be paired with idempotency for writes?

- A. Without idempotency a retry can apply the same write twice, duplicating its effect **(key)**  
  _Rationale:_ Correct: retries can land after a request actually succeeded, so writes must be safe to repeat.
- B. Idempotency makes retries run faster  
  _Rationale:_ Speed is not the point; correctness under duplication is.
- C. Retries are only ever used for reads  
  _Rationale:_ Writes are retried too, which is exactly why idempotency matters.
- D. Idempotency disables retries  
  _Rationale:_ It enables safe retries, not disables them.

**MST-0911-Q0002** (multiple-answer, Select ALL that apply) Which statements about distributed systems are accurate? (Select TWO)

- A. Network calls can be slow, reordered, duplicated or lost **(key)**  
  _Rationale:_ Correct: the network is unreliable, which designs must assume.
- B. Under a network partition a system must trade off availability against consistency **(key)**  
  _Rationale:_ Correct: this is the core CAP trade-off during partitions.
- C. Remote calls behave exactly like local function calls  
  _Rationale:_ Remote calls add latency and failure modes local calls do not have.
- D. Exactly-once delivery is free and automatic over a network  
  _Rationale:_ Exactly-once is hard; systems usually build it atop at-least-once plus idempotency.

**MST-0911-Q0003** (single-answer, Select ONE) What is pprof used for in a Go service?

- A. Collecting CPU, memory and goroutine profiles to find real performance hot spots **(key)**  
  _Rationale:_ Correct: pprof gathers profiles so optimisation targets measured bottlenecks.
- B. Automatically rewriting slow code  
  _Rationale:_ pprof measures; it does not rewrite code.
- C. Encrypting traffic between services  
  _Rationale:_ pprof is a profiler, not a security tool.
- D. Generating protobuf stubs  
  _Rationale:_ Code generation is protoc's job, not pprof's.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
