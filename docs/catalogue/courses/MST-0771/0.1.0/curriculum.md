# Amazon Kinesis: Streaming Data Architecture

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0771` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Kinesis docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-KINESIS (https://docs.aws.amazon.com/streams/latest/dev/introduction.html; accessed 2026-10-02) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Amazon Kinesis: Streaming Data Architecture (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain streaming concepts and Kinesis services
2. Design Data Streams with shards and partition keys
3. Produce and consume records reliably
4. Deliver streams with Firehose
5. Process streams in real time with analytics
6. Operate streaming for scale, durability and cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Streaming and services (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe when streaming beats batch; (2) Map a need to Data Streams vs Firehose
- Common misconception addressed: Treating a stream like a queue that deletes on read
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Streaming vs batch | 80 | 7 |
| M01L02 | Kinesis service family | 80 | 7 |
| M01L03 | Choosing a service | 80 | 7 |

### M02 Data Streams design (MASTEMY-DESIGN 16%)

- Worked applications: (1) Size shards for a target throughput; (2) Choose a partition key to balance load
- Common misconception addressed: Using one partition key and creating a hot shard
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Shards and capacity | 80 | 7 |
| M02L02 | Partition keys and ordering | 80 | 7 |
| M02L03 | Retention and limits | 80 | 7 |

### M03 Producers and consumers (MASTEMY-DESIGN 17%)

- Worked applications: (1) Produce records with retry on throttling; (2) Consume with the KCL and checkpoint
- Common misconception addressed: Ignoring ProvisionedThroughputExceeded and dropping records
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Producers and the KPL | 80 | 7 |
| M03L02 | Consumers and the KCL | 80 | 7 |
| M03L03 | Enhanced fan-out | 80 | 7 |

### M04 Firehose delivery (MASTEMY-DESIGN 17%)

- Worked applications: (1) Deliver a stream to S3 with buffering; (2) Transform records with a Lambda in Firehose
- Common misconception addressed: Expecting Firehose to give sub-second, record-level latency
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Delivery streams | 80 | 7 |
| M04L02 | Transformation and buffering | 80 | 7 |
| M04L03 | Destinations | 80 | 7 |

### M05 Real-time processing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Compute a tumbling-window count; (2) Join a stream to reference data
- Common misconception addressed: Assuming exactly-once without designing for it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Stream processing options | 80 | 7 |
| M05L02 | Windowed aggregations | 80 | 7 |
| M05L03 | Managed Flink/analytics | 80 | 7 |

### M06 Operations and scale (MASTEMY-DESIGN 17%)

- Worked applications: (1) Reshard to handle a traffic increase; (2) Alarm on iterator age and throttling
- Common misconception addressed: Scaling up and never scaling back down
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Scaling shards | 80 | 7 |
| M06L02 | Monitoring and durability | 80 | 7 |
| M06L03 | Cost control | 80 | 7 |

## Integrative case

Design a clickstream pipeline on Kinesis: choose a partition-key strategy for a Data Stream, produce events with retries, consume with the KCL, deliver a copy to S3 with Firehose, run a real-time aggregation, and scale shards as traffic grows.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0771-final-protected | 40 | 50 | yes |
| MST-0771-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Streaming and services | 6 |
| Data Streams design | 6 |
| Producers and consumers | 7 |
| Firehose delivery | 7 |
| Real-time processing | 7 |
| Operations and scale | 7 |

Minimum reviewed item bank: 512 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0771-Q0001** (single-answer, Select ONE) What role does the partition key play in a Kinesis Data Stream?

- A. It determines which shard a record goes to and preserves per-key ordering **(key)**  
  _Rationale:_ Correct: the partition key maps records to shards and orders records per key.
- B. It encrypts the record payload  
  _Rationale:_ Encryption is separate from the partition key.
- C. It sets the data retention period  
  _Rationale:_ Retention is a stream setting, not the partition key.
- D. It deletes records after reading  
  _Rationale:_ Records persist for the retention window.

**MST-0771-Q0002** (single-answer, Select ONE) When is Kinesis Data Firehose a better fit than consuming a Data Stream directly?

- A. When you want managed, near-real-time delivery to destinations like S3 with little code **(key)**  
  _Rationale:_ Correct: Firehose is managed delivery with buffering and transforms.
- B. When you need sub-second, record-level custom processing  
  _Rationale:_ That calls for Data Streams with a custom consumer.
- C. When you must never store the data  
  _Rationale:_ Firehose delivers to storage destinations.
- D. When ordering per key must be guaranteed to a custom app  
  _Rationale:_ Fine-grained ordering control is a Data Streams concern.

**MST-0771-Q0003** (multiple-answer, Select TWO) Which TWO help avoid a hot shard and throttling in Kinesis Data Streams? (Select TWO.)

- A. Choose a high-cardinality partition key that spreads load **(key)**  
  _Rationale:_ Correct: a well-distributed key balances records across shards.
- B. Reshard or scale shards as throughput grows **(key)**  
  _Rationale:_ Correct: adding shards raises capacity.
- C. Send all records with a single constant partition key  
  _Rationale:_ A constant key concentrates load on one shard.
- D. Ignore throughput-exceeded errors  
  _Rationale:_ Ignoring throttling drops records.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
