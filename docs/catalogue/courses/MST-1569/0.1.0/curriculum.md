# System Design for Scale

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1569` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-SDS-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — System Design for Scale (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Fundamentals
2. Scaling basics
3. Caching
4. Databases at scale
5. Partitioning
6. Consistency and availability
7. Asynchronous processing
8. Reliability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on designing systems that scale; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Fundamentals (MASTEMY-DESIGN 13%)

- Worked applications: (1) Estimate QPS and storage for a feature; (2) Define SLOs for a service
- Common misconception addressed: Designing before clarifying requirements and scale
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Requirements and back-of-envelope estimation | 60 | 5 |
| M01L02 | Latency, throughput and SLAs | 60 | 5 |

### M02 Scaling basics (MASTEMY-DESIGN 13%)

- Worked applications: (1) Make a service horizontally scalable; (2) Place a load balancer in front of replicas
- Common misconception addressed: Keeping session state on one server, breaking scale-out
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Vertical vs horizontal scaling | 60 | 5 |
| M02L02 | Stateless services and load balancing | 60 | 5 |

### M03 Caching (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add a read-through cache for hot keys; (2) Serve static assets via a CDN
- Common misconception addressed: Caching without an invalidation strategy
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cache strategies and placement | 60 | 5 |
| M03L02 | Invalidation and the CDN | 60 | 5 |

### M04 Databases at scale (MASTEMY-DESIGN 13%)

- Worked applications: (1) Offload reads to replicas; (2) Choose a datastore for an access pattern
- Common misconception addressed: Choosing NoSQL merely because it is 'web scale'
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SQL vs NoSQL trade-offs | 60 | 5 |
| M04L02 | Replication and read replicas | 60 | 5 |

### M05 Partitioning (MASTEMY-DESIGN 12%)

- Worked applications: (1) Shard data by a well-chosen key; (2) Use consistent hashing to add nodes
- Common misconception addressed: Picking a shard key that creates hotspots
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Sharding strategies | 60 | 5 |
| M05L02 | Consistent hashing and hotspots | 60 | 5 |

### M06 Consistency and availability (MASTEMY-DESIGN 13%)

- Worked applications: (1) Reason about CAP trade-offs for a feature; (2) Choose a consistency level for a write
- Common misconception addressed: Assuming strong consistency is always required
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | CAP and consistency models | 60 | 5 |
| M06L02 | Eventual consistency in practice | 60 | 5 |

### M07 Asynchronous processing (MASTEMY-DESIGN 12%)

- Worked applications: (1) Decouple work with a queue; (2) Make a consumer idempotent
- Common misconception addressed: Processing a message twice because the handler is not idempotent
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Message queues | 60 | 5 |
| M07L02 | Idempotency and retries | 60 | 5 |

### M08 Reliability (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add rate limiting to protect a service; (2) Design a graceful-degradation path
- Common misconception addressed: Ignoring cascading failures and retry storms
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Rate limiting and backpressure | 60 | 5 |
| M08L02 | Monitoring and failure modes | 60 | 5 |

## Integrative case

Design a URL shortener expected to grow to high traffic: estimate load, choose storage and an ID scheme, add caching and a CDN, decide on replication and partitioning, and reason about the trade-offs and failure modes.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1569-final-protected | 40 | 40 | yes |
| MST-1569-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Fundamentals | 5 |
| Scaling basics | 5 |
| Caching | 5 |
| Databases at scale | 5 |
| Partitioning | 5 |
| Consistency and availability | 5 |
| Asynchronous processing | 5 |
| Reliability | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1569-Q0001** (single-answer, Select ONE) Why is making application servers stateless important for horizontal scaling?

- A. Any request can be served by any instance, so you can add instances behind a load balancer freely **(key)**  
  _Rationale:_ Correct: statelessness removes server affinity that blocks scale-out.
- B. It eliminates the need for a database  
  _Rationale:_ State moves to shared stores, not disappears.
- C. It guarantees strong consistency  
  _Rationale:_ Statelessness is unrelated to consistency guarantees.
- D. It removes all latency  
  _Rationale:_ It does not remove latency.

**MST-1569-Q0002** (single-answer, Select ONE) What risk does a poorly chosen shard key introduce?

- A. Hotspots, where one shard receives disproportionate load **(key)**  
  _Rationale:_ Correct: skewed keys concentrate traffic on a single shard.
- B. Automatic strong consistency across shards  
  _Rationale:_ Sharding does not provide that.
- C. Elimination of the need for caching  
  _Rationale:_ Sharding and caching are independent.
- D. Guaranteed even latency everywhere  
  _Rationale:_ Poor keys cause uneven latency.

**MST-1569-Q0003** (multiple-answer, Select ALL that apply) Which statements about caching are correct? (Select TWO)

- A. A read-through cache can reduce load on the primary datastore for hot keys **(key)**  
  _Rationale:_ Correct: frequently read data is served from cache.
- B. Cache invalidation strategy must be designed to avoid serving stale data **(key)**  
  _Rationale:_ Correct: invalidation is a core, hard part of caching.
- C. Caching removes the need to ever read the database  
  _Rationale:_ False; cache misses and writes still hit the datastore.
- D. A CDN is only useful for dynamic, per-user API responses  
  _Rationale:_ False; CDNs excel at static/cacheable content.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
