# Long-Context Strategies

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1346` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why long context is challenging for LLMs
2. Describe chunking, retrieval and summarisation strategies
3. Compare long-context models with retrieval-based approaches
4. Manage attention cost and the 'lost in the middle' effect
5. Choose a long-context strategy for a given document task

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The long-context problem (MASTEMY-DESIGN 20%)

- Worked applications: (1) Estimate token cost of a long document; (2) Explain why attention cost grows with context
- Common misconception addressed: Assuming bigger context windows solve everything
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why long context is hard | 72 | 8 |
| M01L02 | Cost and the attention bottleneck | 72 | 8 |

### M02 Chunking and retrieval (MASTEMY-DESIGN 20%)

- Worked applications: (1) Chunk a document by meaningful boundaries; (2) Retrieve the most relevant chunks for a query
- Common misconception addressed: Chunking text arbitrarily by fixed length only
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Chunking strategies | 72 | 8 |
| M02L02 | Retrieval over long documents | 72 | 8 |

### M03 Long-context models vs RAG (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compare cost of full-context vs retrieval; (2) Pick an approach for a given document set
- Common misconception addressed: Believing a huge window always beats retrieval
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | When to use a long-context model | 72 | 8 |
| M03L02 | When retrieval wins | 72 | 8 |

### M04 Attention and positioning (MASTEMY-DESIGN 20%)

- Worked applications: (1) Order key context to counter mid-context loss; (2) Detect lost-in-the-middle in an answer
- Common misconception addressed: Assuming the model weighs all positions equally
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lost in the middle | 72 | 8 |
| M04L02 | Ordering and reranking context | 72 | 8 |

### M05 Summarisation and compression (MASTEMY-DESIGN 20%)

- Worked applications: (1) Summarise long input while keeping key facts; (2) Build a map-reduce summary pipeline
- Common misconception addressed: Summarising away the detail the task needs
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Hierarchical summarisation | 72 | 8 |
| M05L02 | Map-reduce over long inputs | 72 | 8 |

## Integrative case

An assistant must answer questions over long documents that exceed a comfortable prompt size. Decide between a long-context model and retrieval, design chunking and ordering, mitigate the lost-in-the-middle effect, and justify the chosen strategy against cost and accuracy.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1346-final-protected | 25 | 25 | yes |
| MST-1346-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The long-context problem | 5 |
| Chunking and retrieval | 5 |
| Long-context models vs RAG | 5 |
| Attention and positioning | 5 |
| Summarisation and compression | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1346-Q0001** (single-answer, Select ONE) Why does simply using a very large context window not fully solve long-document tasks?

- A. Attention cost grows with context and models may weight middle content poorly **(key)**  
  _Rationale:_ Correct: long context raises cost and can suffer the lost-in-the-middle effect.
- B. Large windows make the model smaller  
  _Rationale:_ Window size does not shrink the model.
- C. Long context removes the need for a prompt  
  _Rationale:_ A prompt is still required regardless of window size.
- D. Large windows guarantee perfect recall of every token  
  _Rationale:_ Models often under-use mid-context information.

**MST-1346-Q0002** (multiple-answer, Select TWO) Which TWO strategies help an assistant answer over documents larger than a comfortable prompt? (Select TWO.)

- A. Chunk the documents and retrieve only the relevant pieces **(key)**  
  _Rationale:_ Correct: retrieval keeps the prompt focused and affordable.
- B. Summarise sections hierarchically before answering **(key)**  
  _Rationale:_ Correct: hierarchical summarisation compresses long input while keeping key facts.
- C. Paste the entire corpus into every request regardless of cost  
  _Rationale:_ That is expensive and can trigger lost-in-the-middle issues.
- D. Discard the user's question  
  _Rationale:_ The question is needed to retrieve and answer.

**MST-1346-Q0003** (single-answer, Select ONE) Key information sits in the middle of a long prompt and the model ignores it. What mitigation is most appropriate?

- A. Reorder or rerank so the most relevant context is prominently placed **(key)**  
  _Rationale:_ Correct: placing key content where the model attends well counters lost-in-the-middle.
- B. Increase the temperature  
  _Rationale:_ Temperature does not fix positional attention weaknesses.
- C. Remove all context  
  _Rationale:_ Removing context loses the needed information.
- D. Switch to an image model  
  _Rationale:_ Modality change is irrelevant to text positioning.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
