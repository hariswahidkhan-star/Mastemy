# Amazon OpenSearch: Search and Observability Applications

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0772` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon OpenSearch Service docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-OPENSEARCH (https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon OpenSearch: Search and Observability Applications (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain OpenSearch architecture and domains
2. Model indices, mappings and shards
3. Ingest data into OpenSearch
4. Write search and aggregation queries
5. Build dashboards and observability views
6. Secure, scale and operate a domain

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Architecture and domains (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create a domain sized for log volume; (2) Separate data and master node roles
- Common misconception addressed: Running one node and assuming it is highly available
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | OpenSearch concepts | 80 | 7 |
| M01L02 | Domains and node roles | 80 | 7 |

### M02 Indices and mappings (MASTEMY-DESIGN 16%)

- Worked applications: (1) Define an explicit mapping for log fields; (2) Choose shard and replica counts
- Common misconception addressed: Over-sharding a small index and wasting resources
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Indices, documents and mappings | 80 | 7 |
| M02L02 | Shards and replicas | 80 | 7 |

### M03 Ingestion (MASTEMY-DESIGN 17%)

- Worked applications: (1) Bulk-ingest logs efficiently; (2) Roll indices over by size or age
- Common misconception addressed: Indexing one document per request at high volume
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Ingest pipelines and bulk API | 80 | 7 |
| M03L02 | Index templates and rollover | 80 | 7 |

### M04 Search and aggregations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a filtered search query; (2) Aggregate errors by service
- Common misconception addressed: Confusing a filter context with a scoring query
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Query DSL basics | 80 | 7 |
| M04L02 | Aggregations | 80 | 7 |

### M05 Dashboards and observability (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a dashboard of error rates; (2) Create an alert on a threshold
- Common misconception addressed: Treating a dashboard as an alert that nobody watches
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | OpenSearch Dashboards | 80 | 7 |
| M05L02 | Alerting | 80 | 7 |

### M06 Security and operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Restrict an index to a role; (2) Apply an index state management policy
- Common misconception addressed: Keeping hot data forever instead of tiering or deleting
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Fine-grained access control | 80 | 7 |
| M06L02 | Scaling and index lifecycle | 80 | 7 |

## Integrative case

Build a log-analytics platform on OpenSearch: create a domain, define index mappings and an index template, ingest logs, write search and aggregation queries, build a dashboard with alerts, and secure the domain with fine-grained access control.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0772-final-protected | 40 | 50 | yes |
| MST-0772-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architecture and domains | 6 |
| Indices and mappings | 6 |
| Ingestion | 7 |
| Search and aggregations | 7 |
| Dashboards and observability | 7 |
| Security and operations | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0772-Q0001** (single-answer, Select ONE) In OpenSearch, what does an index mapping define?

- A. The fields in documents and their data types **(key)**  
  _Rationale:_ Correct: a mapping defines fields and their types.
- B. The billing plan for the domain  
  _Rationale:_ Mappings are not billing settings.
- C. The number of AWS regions used  
  _Rationale:_ Mappings are per-index field definitions.
- D. The dashboard colour theme  
  _Rationale:_ Mappings are unrelated to theming.

**MST-0772-Q0002** (single-answer, Select ONE) Why use the bulk API instead of indexing one document per request for high-volume logs?

- A. Batching many documents per request greatly improves ingest throughput **(key)**  
  _Rationale:_ Correct: bulk requests reduce overhead and raise throughput.
- B. It changes the mapping automatically  
  _Rationale:_ Bulk does not redefine mappings.
- C. It encrypts the cluster  
  _Rationale:_ Bulk is unrelated to encryption.
- D. It removes the need for shards  
  _Rationale:_ Shards are still used.

**MST-0772-Q0003** (multiple-answer, Select TWO) Which TWO help operate an OpenSearch domain well over time? (Select TWO.)

- A. Use index lifecycle/state management to tier or delete old data **(key)**  
  _Rationale:_ Correct: lifecycle management controls storage growth.
- B. Apply fine-grained access control to indices **(key)**  
  _Rationale:_ Correct: access control secures data.
- C. Keep all data hot forever  
  _Rationale:_ Unbounded hot data wastes resources.
- D. Run a single node for production  
  _Rationale:_ A single node is not resilient.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
