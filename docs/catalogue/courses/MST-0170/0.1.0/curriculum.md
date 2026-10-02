# Microsoft DP-420: Azure Cosmos DB Developer Specialty

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0170` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | DP-420 |
| Version basis | Skills measured as of October 6, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-DP420 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/dp-420) |
| Legacy IDs | MST-MIC-MS-DP420-001 |
| Planned time | T = 1425 min; instruction I = 1140 min (80%); assessment A = 285 min (20%) |
| Assessment split | lesson checks 60 / module checks 105 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Design and develop database solutions' to the depth the official outline requires
2. Apply the objectives of 'Secure, optimize, and deploy database solutions' to the depth the official outline requires
3. Apply the objectives of 'Implement AI and analytics capabilities in database solutions' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Design and develop database solutions (40–45%)

- Worked applications: (1) Select a partition key from cardinality and access patterns; (2) Tune Request Unit throughput for a spiky workload
- Common misconception addressed: Choosing a low-cardinality partition key that creates hot partitions
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Evaluate resource models and SDK solutions | 95 | 6 |
| M01L02 | Implement database operations | 95 | 6 |
| M01L03 | Design and implement data models and partitioning strategies | 95 | 6 |
| M01L04 | Implement change feed | 95 | 6 |
| M01L05 | Design and implement Azure Cosmos DB solutions by using AI-assisted tools | 95 | 6 |

### M02 Secure, optimize, and deploy database solutions (30–35%)

- Worked applications: (1) Configure multi-region writes and partition failover; (2) Diagnose a high-RU query with diagnostic logs
- Common misconception addressed: Assuming strong consistency is always the safe default regardless of cost
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Implement database security controls | 95 | 6 |
| M02L02 | Implement availability and recovery solutions | 95 | 6 |
| M02L03 | Optimize and remediate database performance | 95 | 6 |
| M02L04 | Implement Fleet management and monitoring across multiple accounts and subscriptions | 95 | 6 |

### M03 Implement AI and analytics capabilities in database solutions (20–25%)

- Worked applications: (1) Design a vector index for RAG retrieval; (2) Store agent conversation state and semantic memory
- Common misconception addressed: Treating vector search and full-text search as interchangeable
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Design and implement AI retrieval | 95 | 6 |
| M03L02 | Design and implement agent memory stores | 95 | 6 |
| M03L03 | Design and implement operational analytics on Azure Cosmos DB | 95 | 6 |

## Integrative case

A startup builds an AI assistant on Azure Cosmos DB for NoSQL. Design the data solution: partitioning and RU strategy, consistency level, security controls, multi-region availability, and the AI retrieval layer (vector + hybrid search) plus agent memory; justify cost/performance trade-offs to the lead developer.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0170-practice-form-A | 45 | 45 | yes |
| MST-0170-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0170-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0170-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Design and develop database solutions | 20 |
| Secure, optimize, and deploy database solutions | 15 |
| Implement AI and analytics capabilities in database solutions | 10 |

Minimum reviewed item bank: 534 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0170-Q0001** (single-answer, Select ONE) Writes in an Azure Cosmos DB container are concentrating on one logical partition, throttling throughput. What is the most likely cause?

- A. A partition key with low cardinality creating a hot partition **(key)**  
  _Rationale:_ Correct: a poorly chosen, low-cardinality key funnels load to one partition.
- B. Using the .NET SDK instead of the Python SDK  
  _Rationale:_ SDK choice does not cause hot partitions.
- C. Enabling Time to Live on items  
  _Rationale:_ TTL expires items; it does not concentrate writes.
- D. Setting session consistency  
  _Rationale:_ Consistency level does not determine partition distribution.

**MST-0170-Q0002** (single-answer, Select ONE) Which capability best supports retrieving semantically similar documents for a Retrieval-Augmented Generation (RAG) pattern in Azure Cosmos DB?

- A. Vector search over a vector index **(key)**  
  _Rationale:_ Correct: vector search finds nearest-neighbour embeddings for semantic retrieval.
- B. A unique key policy  
  _Rationale:_ Unique key policies enforce uniqueness, not semantic similarity.
- C. A composite index for ORDER BY  
  _Rationale:_ Composite indexes speed ordering/filtering, not embedding similarity.
- D. Time to Live (TTL)  
  _Rationale:_ TTL controls item expiry, not retrieval relevance.

**MST-0170-Q0003** (multiple-answer, Select TWO) Which TWO actions improve availability of an Azure Cosmos DB solution? (Select TWO.)

- A. Enable multi-region writes **(key)**  
  _Rationale:_ Correct: multi-region writes let the app write to the nearest region and survive regional loss.
- B. Configure service-managed partition failover **(key)**  
  _Rationale:_ Correct: automatic failover promotes a healthy region when one becomes unavailable.
- C. Lower throughput to the minimum RU/s  
  _Rationale:_ Reducing RU/s risks throttling and does not improve availability.
- D. Disable all indexing  
  _Rationale:_ Disabling indexing affects query cost, not availability.
- E. Set consistency to strong in a single region  
  _Rationale:_ Single-region strong consistency does not improve regional availability.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
