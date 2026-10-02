# GraphRAG and Knowledge-Graph Retrieval

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0600` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs. Tool- and model-specific behaviour is vendor-neutral here and must be verified against the current official documentation at production. |
| Evidence | **n/a-no-official-syllabus** - no official source syllabus exists for this skills scope |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — GraphRAG and Knowledge-Graph Retrieval (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain where graph retrieval beats flat vector retrieval
2. Extract entities and relations into a knowledge graph
3. Design a graph schema that fits the questions
4. Combine graph traversal with vector retrieval
5. Produce grounded answers from graph-retrieved context
6. Manage graph quality, cost and updates

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Why graphs for retrieval (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Spot a multi-hop question flat RAG fails; (2) Decide when a graph is worth building
- Common misconception addressed: Assuming vector search handles all relationships
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Limits of flat vector RAG | 80 | 8 |
| M01L02 | When graphs help | 80 | 8 |

### M02 Building a knowledge graph from text (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Extract entities and relations from a document; (2) Resolve duplicate entities
- Common misconception addressed: Treating noisy extractions as ground truth
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Entity and relation extraction | 80 | 8 |
| M02L02 | Entity resolution and cleanup | 80 | 8 |

### M03 Graph schema and modelling (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Model nodes and edges for target queries; (2) Avoid an over- or under-specified schema
- Common misconception addressed: Modelling the graph before knowing the questions
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Nodes, edges and properties | 80 | 8 |
| M03L02 | Schema fit to query needs | 80 | 8 |

### M04 GraphRAG retrieval patterns (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Traverse the graph to gather multi-hop context; (2) Blend graph and vector results for a query
- Common misconception addressed: Using only one retrieval mode when both are needed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Traversal and neighbourhood retrieval | 80 | 8 |
| M04L02 | Blending graph and vector | 80 | 8 |

### M05 Answering and summarising over graphs (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Summarise a community of related entities; (2) Ground a multi-hop answer in traversed facts
- Common misconception addressed: Letting the model invent relationships not in the graph
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Community and global summaries | 80 | 8 |
| M05L02 | Grounding multi-hop answers | 80 | 8 |

### M06 Quality, cost and maintenance (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Evaluate extraction and answer quality; (2) Plan incremental graph updates
- Common misconception addressed: Rebuilding the whole graph on every change
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Measuring graph and answer quality | 80 | 8 |
| M06L02 | Incremental updates and cost | 80 | 8 |

## Integrative case

A knowledge assistant must answer multi-hop questions that span related entities. Build a knowledge graph from documents, combine graph traversal with vector retrieval (GraphRAG), and answer questions a flat vector store cannot, while controlling graph quality and cost.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0600-final-protected | 40 | 40 | yes |
| MST-0600-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why graphs for retrieval | 7 |
| Building a knowledge graph from text | 7 |
| Graph schema and modelling | 7 |
| GraphRAG retrieval patterns | 7 |
| Answering and summarising over graphs | 6 |
| Quality, cost and maintenance | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0600-Q0001** (single-answer, Select ONE) A question requires chaining three related facts across documents. Flat vector RAG returns disconnected chunks. Why does GraphRAG help?

- A. Graph traversal follows relationships between entities to assemble multi-hop context **(key)**  
  _Rationale:_ Correct: traversal connects related facts that flat retrieval leaves disconnected.
- B. Graphs make embeddings unnecessary  
  _Rationale:_ GraphRAG typically still uses vectors.
- C. Graphs guarantee the answer is correct  
  _Rationale:_ They improve context, not guarantee correctness.
- D. Flat RAG always outperforms graphs  
  _Rationale:_ Not for multi-hop relational questions.

**MST-0600-Q0002** (multiple-answer, Select TWO) Which TWO steps improve a knowledge graph built from raw text? (Select TWO.)

- A. Resolve duplicate entities that refer to the same thing **(key)**  
  _Rationale:_ Correct: entity resolution prevents fragmented, wrong traversals.
- B. Design the schema to fit the questions you must answer **(key)**  
  _Rationale:_ Correct: schema fit to queries makes traversal useful.
- C. Accept every extracted relation as true  
  _Rationale:_ Noisy extractions degrade the graph.
- D. Rebuild the entire graph on every tiny change  
  _Rationale:_ Full rebuilds are wasteful; prefer incremental updates.

**MST-0600-Q0003** (single-answer, Select ONE) A GraphRAG answer states a relationship that does not exist in the graph. What is the correct safeguard?

- A. Ground answers strictly in traversed facts and flag unsupported claims **(key)**  
  _Rationale:_ Correct: answers must be grounded in the graph, not invented.
- B. Allow the model to add plausible relationships  
  _Rationale:_ That introduces fabrication.
- C. Remove grounding to speed up answers  
  _Rationale:_ That worsens the problem.
- D. Trust the answer because the graph exists  
  _Rationale:_ Existence of a graph does not prevent hallucination.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
