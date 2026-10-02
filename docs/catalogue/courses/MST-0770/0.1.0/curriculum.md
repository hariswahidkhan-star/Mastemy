# Amazon Redshift: Data Warehousing and Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0770` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Redshift docs; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-REDSHIFT (https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon Redshift: Data Warehousing and Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Redshift architecture and clusters
2. Design tables with distribution and sort keys
3. Load and unload data efficiently
4. Write and tune analytical queries
5. Use Spectrum and data sharing
6. Manage security, scaling and cost

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Architecture (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe how data spreads across slices; (2) Choose serverless for spiky analytics
- Common misconception addressed: Assuming Redshift behaves like a row-oriented OLTP database
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Clusters, nodes and slices | 80 | 7 |
| M01L02 | Provisioned vs serverless | 80 | 7 |

### M02 Table design (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pick a distribution key for a fact table; (2) Choose a sort key for range queries
- Common misconception addressed: Using the wrong distribution style and causing data skew
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Distribution styles | 80 | 7 |
| M02L02 | Sort keys and compression | 80 | 7 |

### M03 Loading data (MASTEMY-DESIGN 17%)

- Worked applications: (1) Bulk-load with COPY from S3; (2) UNLOAD results back to S3
- Common misconception addressed: Inserting rows one at a time instead of bulk COPY
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | COPY from S3 | 80 | 7 |
| M03L02 | UNLOAD and ongoing ingestion | 80 | 7 |

### M04 Query tuning (MASTEMY-DESIGN 17%)

- Worked applications: (1) Read an EXPLAIN plan for a slow query; (2) Add a materialized view for a dashboard
- Common misconception addressed: Blaming the cluster size before fixing table design
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Query plans and WLM | 80 | 7 |
| M04L02 | Materialized views | 80 | 7 |

### M05 Spectrum and sharing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Query S3 data with Spectrum; (2) Share a dataset to another cluster
- Common misconception addressed: Copying data between teams instead of sharing it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Redshift Spectrum | 80 | 7 |
| M05L02 | Data sharing | 80 | 7 |

### M06 Security and cost (MASTEMY-DESIGN 17%)

- Worked applications: (1) Encrypt a cluster and restrict access; (2) Use concurrency scaling within a budget
- Common misconception addressed: Running an oversized cluster 24/7 for occasional load
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Encryption and access | 80 | 7 |
| M06L02 | Scaling and cost control | 80 | 7 |

## Integrative case

Stand up an analytics warehouse on Redshift: choose distribution and sort keys for a star schema, bulk-load from S3 with COPY, query external data with Spectrum, tune a slow dashboard query, and share a dataset to another cluster securely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0770-final-protected | 40 | 50 | yes |
| MST-0770-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Architecture | 6 |
| Table design | 6 |
| Loading data | 7 |
| Query tuning | 7 |
| Spectrum and sharing | 7 |
| Security and cost | 7 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0770-Q0001** (single-answer, Select ONE) Redshift is optimised primarily for which workload?

- A. Analytical (OLAP) queries over large datasets **(key)**  
  _Rationale:_ Correct: Redshift is a columnar analytical warehouse.
- B. High-frequency single-row transactional writes  
  _Rationale:_ That is an OLTP pattern, not Redshift's strength.
- C. Object storage of media files  
  _Rationale:_ Object storage is S3's role.
- D. Low-latency key-value lookups  
  _Rationale:_ That suits DynamoDB, not Redshift.

**MST-0770-Q0002** (single-answer, Select ONE) Choosing a poor distribution key most directly causes:

- A. Data skew that overloads some nodes and slows queries **(key)**  
  _Rationale:_ Correct: skew concentrates data and work on a few slices.
- B. Loss of encryption on the cluster  
  _Rationale:_ Distribution does not affect encryption.
- C. Automatic deletion of tables  
  _Rationale:_ Distribution does not delete data.
- D. A change to IAM roles  
  _Rationale:_ Distribution is unrelated to IAM.

**MST-0770-Q0003** (multiple-answer, Select TWO) Which TWO features let Redshift work with data beyond its local storage? (Select TWO.)

- A. Redshift Spectrum to query data in S3 **(key)**  
  _Rationale:_ Correct: Spectrum queries external S3 data.
- B. Data sharing to access another cluster's data **(key)**  
  _Rationale:_ Correct: data sharing exposes datasets across clusters.
- C. Deleting the cluster to free data  
  _Rationale:_ Deleting a cluster removes access, not a way to use data.
- D. Disabling compression  
  _Rationale:_ Compression settings do not access external data.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
