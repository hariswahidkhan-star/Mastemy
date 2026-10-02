# Graph Machine Learning and Graph Neural Networks

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0450` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-GNN-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Graph data and representation
2. Graph neural network basics
3. Advanced GNN architectures
4. Tasks and evaluation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Graph data and representation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Encode a social network as a graph; (2) Pick node/edge/graph-level task framing
- Common misconception addressed: Forcing graph data into a flat table and losing structure
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Graphs, nodes, edges and features | 120 | 8 |
| M01L02 | Adjacency, tasks and graph signals | 120 | 8 |

### M02 Graph neural network basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace one round of message passing; (2) Size a GCN for a citation graph
- Common misconception addressed: Assuming deeper GNNs always help
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Message passing and aggregation | 120 | 8 |
| M02L02 | Graph convolutional networks | 120 | 8 |

### M03 Advanced GNN architectures (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare GAT attention to mean aggregation; (2) Use neighbour sampling for a large graph
- Common misconception addressed: Ignoring over-smoothing when stacking many layers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Attention and GraphSAGE | 120 | 8 |
| M03L02 | Over-smoothing and sampling | 120 | 8 |

### M04 Tasks and evaluation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set up a link-prediction split without leakage; (2) Choose metrics for node classification
- Common misconception addressed: Splitting graph edges randomly and leaking neighbours
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Node, link and graph prediction | 120 | 8 |
| M04L02 | Evaluation and scalability | 120 | 8 |

## Integrative case

Model a citation network to predict paper topics and likely future citations. Represent the graph, choose a GNN architecture, address over-smoothing and scale with sampling, and design leak-free splits for node and link prediction.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0450-final-protected | 20 | 20 | yes |
| MST-0450-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Graph data and representation | 5 |
| Graph neural network basics | 5 |
| Advanced GNN architectures | 5 |
| Tasks and evaluation | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0450-Q0001** (single-answer, Select ONE) What is the core operation that defines most graph neural networks?

- A. Message passing: aggregating information from neighbouring nodes **(key)**  
  _Rationale:_ Correct: GNNs update each node from its neighbours' messages.
- B. Sorting nodes by degree  
  _Rationale:_ Sorting is not the defining operation.
- C. Flattening the graph into a single vector first  
  _Rationale:_ That discards the structure GNNs exploit.
- D. Running a convolution over raw pixels  
  _Rationale:_ That describes image CNNs.

**MST-0450-Q0002** (multiple-answer, Select TWO) Which TWO problems arise from stacking too many GNN layers? (Select TWO.)

- A. Over-smoothing, where node representations become indistinguishable **(key)**  
  _Rationale:_ Correct: repeated aggregation makes embeddings converge.
- B. Higher computational and memory cost **(key)**  
  _Rationale:_ Correct: more layers expand the receptive field and cost more.
- C. Guaranteed higher accuracy  
  _Rationale:_ Deeper GNNs often lose accuracy, not gain it.
- D. Loss of the ability to use node features  
  _Rationale:_ Node features are still used.

**MST-0450-Q0003** (single-answer, Select ONE) Why must link-prediction splits avoid placing an edge's endpoints' shared neighbours across train and test carelessly?

- A. Information can leak so the model sees test-edge structure during training **(key)**  
  _Rationale:_ Correct: careless splits leak neighbourhood information about test edges.
- B. Links cannot be predicted at all  
  _Rationale:_ They can; the issue is leakage.
- C. Node features must be removed  
  _Rationale:_ Removing features is unrelated.
- D. Graphs cannot be split  
  _Rationale:_ Graphs can be split with care.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
