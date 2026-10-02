# Search and Ranking with ML

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1364` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Search and ranking foundations
2. Retrieval methods
3. Learning to rank
4. Evaluation and online quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Search and ranking foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Separate retrieval from ranking; (2) Define relevance for a query set
- Common misconception addressed: Conflating fast retrieval with high-quality final ranking
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Retrieval vs ranking | 120 | 8 |
| M01L02 | Relevance and user intent | 120 | 8 |

### M02 Retrieval methods (MASTEMY-DESIGN 25%)

- Worked applications: (1) Compare BM25 and dense retrieval; (2) Build a hybrid retriever
- Common misconception addressed: Assuming dense vectors always beat strong lexical baselines
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lexical (BM25) vs dense retrieval | 120 | 8 |
| M02L02 | Hybrid retrieval and embeddings | 120 | 8 |

### M03 Learning to rank (MASTEMY-DESIGN 25%)

- Worked applications: (1) Engineer ranking features; (2) Train a pairwise ranker
- Common misconception addressed: Optimising for clicks without guarding against position bias
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pointwise, pairwise and listwise LTR | 120 | 8 |
| M03L02 | Features and gradient-boosted rankers | 120 | 8 |

### M04 Evaluation and online quality (MASTEMY-DESIGN 25%)

- Worked applications: (1) Compute NDCG for a ranking; (2) Design an A/B test for ranking
- Common misconception addressed: Trusting offline NDCG while ignoring online behaviour and bias
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Offline metrics: NDCG, MRR, MAP | 120 | 8 |
| M04L02 | Online A/B tests and feedback loops | 120 | 8 |

## Integrative case

A marketplace's search returns relevant items but orders them poorly, hurting conversions. Design hybrid retrieval, a learning-to-rank model with bias-aware features, offline NDCG/MRR evaluation, and an online A/B test.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1364-final-protected | 20 | 20 | yes |
| MST-1364-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Search and ranking foundations | 5 |
| Retrieval methods | 5 |
| Learning to rank | 5 |
| Evaluation and online quality | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1364-Q0001** (single-answer, Select ONE) Why separate the retrieval stage from the ranking stage in search?

- A. Retrieval cheaply narrows millions of items; ranking carefully orders the few that remain **(key)**  
  _Rationale:_ Correct: the two stages have different cost/quality roles.
- B. Because ranking must process every document in the index  
  _Rationale:_ Ranking operates on the retrieved subset, not the whole index.
- C. Because retrieval requires no relevance at all  
  _Rationale:_ Retrieval still needs reasonable recall.
- D. Because they are the same operation  
  _Rationale:_ They are distinct stages.

**MST-1364-Q0002** (multiple-answer, Select TWO) Which TWO statements about dense vs lexical retrieval are accurate? (Select TWO.)

- A. Dense retrieval can match semantically related terms that share no words **(key)**  
  _Rationale:_ Correct: embeddings capture semantic similarity.
- B. Lexical BM25 remains a strong, cheap baseline, especially for exact terms **(key)**  
  _Rationale:_ Correct: BM25 is hard to beat on keyword/exact matches.
- C. Dense retrieval always outperforms BM25 on every query  
  _Rationale:_ It does not; hybrid often wins.
- D. Lexical retrieval understands paraphrases better than embeddings  
  _Rationale:_ Embeddings handle paraphrase better.

**MST-1364-Q0003** (single-answer, Select ONE) Training a ranker purely on clicks risks reinforcing which bias?

- A. Position bias: items shown higher get more clicks regardless of true relevance **(key)**  
  _Rationale:_ Correct: position bias must be modelled or corrected.
- B. Alphabetical bias toward item names  
  _Rationale:_ Not the dominant click bias in ranking.
- C. Colour bias in thumbnails only  
  _Rationale:_ Not the structural bias meant here.
- D. Timezone bias in logs  
  _Rationale:_ Not the ranking bias at issue.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
