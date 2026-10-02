# Amazon DynamoDB: Data Modeling and Application Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0758` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon DynamoDB product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-DYNAMODB (https://docs.aws.amazon.com/dynamodb/; https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon DynamoDB: Data Modeling and Application Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain DynamoDB core concepts: tables, items, keys and partitions
2. Design partition and sort keys around access patterns
3. Model one-to-many and many-to-many with single-table design
4. Query efficiently with indexes and avoid scans
5. Choose capacity modes and handle throttling
6. Use streams, TTL and transactions in application design

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Core concepts (MASTEMY-DESIGN 16%)

- Worked applications: (1) Identify the partition key for a user profile table; (2) Explain how items map to partitions
- Common misconception addressed: Thinking DynamoDB is relational with joins
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tables, items and attributes | 80 | 5 |
| M01L02 | Partitions and the primary key | 80 | 5 |

### M02 Key design (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design a composite key for orders by customer; (2) List access patterns before choosing keys
- Common misconception addressed: Designing the schema before knowing the queries
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Partition and sort keys | 80 | 5 |
| M02L02 | Designing from access patterns | 80 | 5 |

### M03 Single-table design (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model customers and their orders in one table; (2) Overload a sort key for multiple entity types
- Common misconception addressed: Creating a separate table per entity like a relational DB
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Modelling relationships | 80 | 5 |
| M03L02 | Item collections and overloading | 80 | 5 |

### M04 Querying and indexes (MASTEMY-DESIGN 17%)

- Worked applications: (1) Replace a scan with a Query on a GSI; (2) Choose GSI vs LSI for an access pattern
- Common misconception addressed: Using Scan for routine lookups
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Query vs scan | 80 | 5 |
| M04L02 | Global and local secondary indexes | 80 | 5 |

### M05 Capacity and throttling (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pick a capacity mode for spiky traffic; (2) Redesign a key to spread a hot partition
- Common misconception addressed: Blaming throughput limits for a poorly distributed key
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | On-demand vs provisioned | 80 | 5 |
| M05L02 | Hot partitions and throttling | 80 | 5 |

### M06 Streams, TTL and transactions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Trigger a Lambda from a DynamoDB stream; (2) Expire old sessions with TTL
- Common misconception addressed: Expecting TTL deletion to be instantaneous at the expiry second
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Streams and event-driven processing | 80 | 5 |
| M06L02 | TTL and transactions | 80 | 5 |

## Integrative case

Model the data for an orders service starting from its access patterns: choose partition and sort keys, apply single-table design with secondary indexes, pick a capacity mode, and use streams and TTL for downstream processing and cleanup, then explain why each query avoids a full table scan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0758-final-protected | 40 | 50 | yes |
| MST-0758-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Core concepts | 7 |
| Key design | 7 |
| Single-table design | 7 |
| Querying and indexes | 7 |
| Capacity and throttling | 6 |
| Streams, TTL and transactions | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0758-Q0001** (single-answer, Select ONE) Why should you define access patterns before designing a DynamoDB table?

- A. Key and index design depend on how data is queried **(key)**  
  _Rationale:_ Correct: DynamoDB is designed around access patterns; keys and indexes follow from them.
- B. DynamoDB auto-creates joins from the schema  
  _Rationale:_ DynamoDB does not support joins.
- C. Access patterns set the billing currency  
  _Rationale:_ Access patterns are unrelated to billing currency.
- D. Tables cannot be queried without a full scan  
  _Rationale:_ Well-designed keys and indexes allow efficient queries without scans.

**MST-0758-Q0002** (single-answer, Select ONE) A routine lookup of a customer's orders currently uses Scan and is slow and costly. What is the better approach?

- A. Query a key or secondary index matching the access pattern **(key)**  
  _Rationale:_ Correct: Query reads only matching items; Scan reads the whole table.
- B. Increase the Scan frequency  
  _Rationale:_ Scanning more often increases cost without fixing the pattern.
- C. Add more attributes to each item  
  _Rationale:_ Item size does not turn a Scan into an efficient lookup.
- D. Switch the table to a relational engine mid-request  
  _Rationale:_ You cannot swap engines per request; redesign the access pattern instead.

**MST-0758-Q0003** (multiple-answer, Select TWO) Which TWO help mitigate a hot partition in DynamoDB? (Select TWO.)

- A. Choose a high-cardinality partition key **(key)**  
  _Rationale:_ Correct: a high-cardinality key spreads load across partitions.
- B. Add a write-sharding suffix to the key **(key)**  
  _Rationale:_ Correct: sharding distributes writes that would otherwise hit one partition.
- C. Store all items under a single constant key  
  _Rationale:_ A constant key concentrates all load on one partition.
- D. Disable indexes entirely  
  _Rationale:_ Removing indexes does not address key distribution.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
