# Elasticsearch: Search Applications and Index Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0953` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Elasticsearch: Search Applications and Index Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Search fundamentals
2. Mapping and analysis
3. Querying with the Query DSL
4. Aggregations
5. Index design and ingestion
6. Relevance and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on tool operation or production data work; those are taught through instructor-built demonstrations and walkthroughs.

## Modules

### M01 Search fundamentals (MASTEMY-DESIGN 17%)

- Worked applications: (1) Index a few documents and run a basic search; (2) Explain why an inverted index makes text search fast
- Common misconception addressed: Treating Elasticsearch as a primary relational database
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Elasticsearch is; documents, indices and shards | 80 | 5 |
| M01L02 | The inverted index and how search differs from SQL | 80 | 5 |

### M02 Mapping and analysis (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define a mapping with text and keyword fields; (2) Compare how a standard analyzer tokenizes a phrase
- Common misconception addressed: Aggregating or sorting on an analyzed text field instead of a keyword
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Field data types and explicit mappings | 80 | 5 |
| M02L02 | Analyzers, tokenization and text vs keyword | 80 | 5 |

### M03 Querying with the Query DSL (MASTEMY-DESIGN 17%)

- Worked applications: (1) Combine must/should/filter clauses in a bool query; (2) Move an exact-match clause into filter context for caching
- Common misconception addressed: Using a term query on an analyzed field and getting no hits
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Match, term and bool queries | 80 | 5 |
| M03L02 | Relevance scoring and query vs filter context | 80 | 5 |

### M04 Aggregations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Build a daily counts aggregation over a date field; (2) Compute an average inside each terms bucket
- Common misconception addressed: Running aggregations on high-cardinality text fields and exhausting memory
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bucket aggregations: terms and date histogram | 80 | 5 |
| M04L02 | Metric and nested aggregations | 80 | 5 |

### M05 Index design and ingestion (MASTEMY-DESIGN 16%)

- Worked applications: (1) Choose a shard/replica count for a dataset size; (2) Load data efficiently with the bulk API
- Common misconception addressed: Over-sharding a small index and wasting cluster overhead
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Index settings, shards and replicas | 80 | 5 |
| M05L02 | Bulk ingestion, index templates and lifecycle | 80 | 5 |

### M06 Relevance and operations (MASTEMY-DESIGN 16%)

- Worked applications: (1) Boost title matches over body matches in a query; (2) Interpret green/yellow/red cluster health
- Common misconception addressed: Assuming more shards automatically means better relevance
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Improving relevance: boosting and analyzers | 80 | 5 |
| M06L02 | Cluster health, monitoring and scaling | 80 | 5 |

## Integrative case

Design an Elasticsearch-backed search for a product catalogue: define mappings separating text and keyword fields, build a bool query with boosting for relevance, add faceted aggregations for filters, and plan index sharding, replicas and bulk ingestion.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0953-final-protected | 42 | 42 | yes |
| MST-0953-final-alternate | 42 | 42 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Search fundamentals | 7 |
| Mapping and analysis | 7 |
| Querying with the Query DSL | 7 |
| Aggregations | 7 |
| Index design and ingestion | 7 |
| Relevance and operations | 7 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0953-Q0001** (single-answer, Select ONE) Why does Elasticsearch use an inverted index for full-text search?

- A. It maps each term to the documents containing it, making term lookups fast **(key)**  
  _Rationale:_ Correct: the inverted index lets search jump straight to matching documents per term.
- B. It stores documents in insertion order for sequential scans  
  _Rationale:_ Sequential scanning is what the inverted index avoids.
- C. It enforces a fixed relational schema  
  _Rationale:_ Elasticsearch is schema-flexible and document-oriented.
- D. It compresses documents to save disk only  
  _Rationale:_ Its purpose is fast term lookup, not primarily compression.

**MST-0953-Q0002** (multiple-answer, Select ALL that apply) Which statements about text vs keyword fields are correct? (Select TWO)

- A. text fields are analyzed and suited to full-text match queries **(key)**  
  _Rationale:_ Correct: text fields are tokenized for relevance-based matching.
- B. keyword fields are stored as-is and suited to exact match, sorting and aggregations **(key)**  
  _Rationale:_ Correct: keyword fields are not analyzed, so they aggregate and sort reliably.
- C. You should aggregate on analyzed text fields by default  
  _Rationale:_ Aggregating on analyzed text is discouraged and often disabled.
- D. term queries on a text field match the original untokenized string  
  _Rationale:_ term matches exact tokens, so it often fails on analyzed text.

**MST-0953-Q0003** (single-answer, Select ONE) What is the benefit of placing an exact-match clause in filter context rather than query context?

- A. It skips relevance scoring and can be cached, improving performance **(key)**  
  _Rationale:_ Correct: filters answer yes/no, are cacheable and do not compute a score.
- B. It increases the relevance score of matches  
  _Rationale:_ Filter context does not contribute to scoring.
- C. It forces a full re-index of the data  
  _Rationale:_ Filter context has nothing to do with re-indexing.
- D. It converts the field to a text field  
  _Rationale:_ Query context does not change field mappings.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
