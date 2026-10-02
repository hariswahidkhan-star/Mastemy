# Apache Kafka: Event Streaming and Data Integration

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0958` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Apache Kafka: Event Streaming and Data Integration (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Kafka architecture and the log
2. Topics, partitions and offsets
3. Producers and delivery semantics
4. Consumers and consumer groups
5. Data integration with Kafka Connect
6. Reliability, ordering and schema management

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Kafka architecture and the log (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe how an append-only log stores events; (2) Explain the role of a broker in a cluster
- Common misconception addressed: Treating Kafka as a message queue that deletes messages on read
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Brokers, the commit log and the pub/sub model | 80 | 6 |
| M01L02 | Clusters, controllers and replication overview | 80 | 6 |

### M02 Topics, partitions and offsets (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose a partition key to preserve per-entity order; (2) Explain why ordering holds only within a partition
- Common misconception addressed: Expecting global ordering across all partitions of a topic
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Topics, partitions and the partitioning key | 80 | 6 |
| M02L02 | Offsets, retention and log compaction | 80 | 6 |

### M03 Producers and delivery semantics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Configure acks=all for durability; (2) Enable the idempotent producer to avoid duplicates
- Common misconception addressed: Assuming acks=1 guarantees no data loss on broker failure
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Producer acks, batching and keys | 80 | 6 |
| M03L02 | At-least-once, at-most-once and idempotent producers | 80 | 6 |

### M04 Consumers and consumer groups (MASTEMY-DESIGN 16%)

- Worked applications: (1) Scale throughput by adding consumers to a group; (2) Explain why consumers in a group never double-read a partition
- Common misconception addressed: Adding more consumers than partitions and expecting more parallelism
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Consumer groups, rebalancing and partition assignment | 80 | 6 |
| M04L02 | Committing offsets and processing guarantees | 80 | 6 |

### M05 Data integration with Kafka Connect (MASTEMY-DESIGN 17%)

- Worked applications: (1) Stream a database table into Kafka with a source connector; (2) Land a topic into object storage with a sink connector
- Common misconception addressed: Writing bespoke pipeline code where a managed connector exists
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Source and sink connectors | 80 | 6 |
| M05L02 | Converters, transforms and scaling connectors | 80 | 6 |

### M06 Reliability, ordering and schema management (MASTEMY-DESIGN 18%)

- Worked applications: (1) Explain how the in-sync replica set protects writes; (2) Evolve a schema while keeping backward compatibility
- Common misconception addressed: Changing a schema in a way that breaks existing consumers
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Replication, ISR and durability | 80 | 6 |
| M06L02 | Schemas, compatibility and a schema registry | 80 | 6 |

## Integrative case

Design an order-events pipeline: model orders as a keyed topic so per-customer order is preserved, configure a durable idempotent producer, scale consumers within a group to match partition count, integrate a database source with Kafka Connect, and manage schema evolution for backward compatibility.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0958-final-protected | 30 | 30 | yes |
| MST-0958-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kafka architecture and the log | 5 |
| Topics, partitions and offsets | 5 |
| Producers and delivery semantics | 5 |
| Consumers and consumer groups | 5 |
| Data integration with Kafka Connect | 5 |
| Reliability, ordering and schema management | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0958-Q0001** (single-answer, Select ONE) Within which scope does Kafka guarantee message ordering?

- A. Within a single partition **(key)**  
  _Rationale:_ Correct: ordering is guaranteed per partition, not across a whole topic.
- B. Across all partitions of a topic  
  _Rationale:_ There is no global cross-partition ordering guarantee.
- C. Across all topics in a cluster  
  _Rationale:_ Ordering is never guaranteed cluster-wide.
- D. Only when there is exactly one consumer  
  _Rationale:_ Consumer count does not change the per-partition ordering guarantee.

**MST-0958-Q0002** (multiple-answer, Select ALL that apply) Which settings help a Kafka producer avoid data loss and duplicates? (Select TWO)

- A. acks=all so the leader waits for in-sync replicas **(key)**  
  _Rationale:_ Correct: acks=all maximises durability against broker failure.
- B. Enabling the idempotent producer **(key)**  
  _Rationale:_ Correct: idempotence prevents duplicate records from retries.
- C. acks=0 for maximum durability  
  _Rationale:_ acks=0 gives no delivery guarantee and risks loss.
- D. Disabling replication to speed up writes  
  _Rationale:_ Removing replication reduces durability, increasing loss risk.

**MST-0958-Q0003** (single-answer, Select ONE) What happens if a consumer group has more consumers than a topic has partitions?

- A. Some consumers sit idle because each partition is assigned to at most one consumer in the group **(key)**  
  _Rationale:_ Correct: parallelism is capped by partition count within a group.
- B. Every consumer reads every partition in parallel  
  _Rationale:_ A partition is assigned to only one consumer per group.
- C. The extra consumers increase per-partition throughput  
  _Rationale:_ They cannot; partition count is the ceiling.
- D. Kafka automatically splits partitions to match  
  _Rationale:_ Partitions are not auto-split to add consumers.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
