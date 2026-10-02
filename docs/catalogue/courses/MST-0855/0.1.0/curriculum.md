# Spring Cloud and Distributed Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0855` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Spring Cloud and Distributed Systems (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Centralise configuration and use service discovery
2. Build resilient clients with circuit breakers
3. Route traffic through an API gateway
4. Observe and connect services with tracing and messaging

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Config and discovery (MASTEMY-DESIGN 25%)

- Worked applications: (1) Externalise configuration for two services; (2) Register and look up a service
- Common misconception addressed: Hardcoding service URLs instead of using discovery
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Centralised configuration | 120 | 7 |
| M01L02 | Service discovery and registries | 120 | 7 |

### M02 Resilience (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add a circuit breaker with a fallback; (2) Set sensible timeouts and retry limits
- Common misconception addressed: Retrying without a timeout or backoff
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Client-side load balancing | 120 | 7 |
| M02L02 | Circuit breakers, retries and timeouts | 120 | 7 |

### M03 Gateway and routing (MASTEMY-DESIGN 25%)

- Worked applications: (1) Route two services behind a gateway; (2) Add a rate-limit filter
- Common misconception addressed: Putting business logic in gateway filters
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | API gateway routing and filters | 120 | 7 |
| M03L02 | Cross-cutting concerns at the edge | 120 | 7 |

### M04 Observability and messaging (MASTEMY-DESIGN 25%)

- Worked applications: (1) Propagate a trace across two services; (2) Publish and consume a domain event
- Common misconception addressed: Assuming logs alone explain a distributed failure
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Distributed tracing and correlation | 120 | 7 |
| M04L02 | Event-driven messaging basics | 120 | 7 |

## Integrative case

Compose a small system of three services: externalise their configuration and register them for discovery, call between them with a circuit breaker and timeouts, place them behind a gateway with rate limiting, and add distributed tracing to debug a slow request.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0855-final-protected | 40 | 50 | yes |
| MST-0855-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Config and discovery | 10 |
| Resilience | 10 |
| Gateway and routing | 10 |
| Observability and messaging | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0855-Q0001** (single-answer, Select ONE) Why use service discovery instead of hardcoded URLs?

- A. Instances change dynamically and must be resolved at runtime **(key)**  
  _Rationale:_ Correct: discovery resolves changing instance locations.
- B. It is faster to type  
  _Rationale:_ Convenience is not the reason for discovery.
- C. It removes the need for configuration  
  _Rationale:_ Discovery complements, not replaces, configuration.
- D. It encrypts all traffic  
  _Rationale:_ Discovery does not provide encryption.

**MST-0855-Q0002** (multiple-answer, Select TWO) Which TWO patterns improve resilience to a failing downstream service? (Select TWO.)

- A. Circuit breaker with a fallback **(key)**  
  _Rationale:_ Correct: a circuit breaker stops cascading failures and offers a fallback.
- B. Request timeouts **(key)**  
  _Rationale:_ Correct: timeouts prevent threads blocking on a slow dependency.
- C. Unbounded retries with no delay  
  _Rationale:_ Unbounded immediate retries can worsen an outage.
- D. Removing all error handling  
  _Rationale:_ Removing error handling reduces resilience.

**MST-0855-Q0003** (single-answer, Select ONE) Distributed tracing primarily helps you...

- A. follow one request across multiple services **(key)**  
  _Rationale:_ Correct: tracing correlates spans of a single request across services.
- B. replace unit tests  
  _Rationale:_ Tracing is for observability, not unit testing.
- C. store configuration  
  _Rationale:_ Tracing does not store config.
- D. load-balance requests  
  _Rationale:_ Load balancing is a separate concern.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
