# RAG Query Rewriting and Retrieval Routing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0595` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Vendor-neutral RAG engineering practice; no single official issuer syllabus. Specific vendor product behaviour is DESIGN ASSUMPTION pending an official check against each vendor's documentation. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session; sources: SRC-RAG-ROUTING |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — RAG Query Rewriting and Retrieval Routing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why raw user queries often retrieve poorly
2. Rewrite and expand queries to improve recall
3. Route queries to the right source or index
4. Decompose multi-part questions into sub-queries
5. Evaluate routing and rewriting without overfitting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot grade a live routing system; query rewriting and routing are taught through worked traces.

## Modules

### M01 Why raw queries fail (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Show a vocabulary-mismatch miss and explain it; (2) Classify three failures as recall or precision problems
- Common misconception addressed: Blaming the model when the query never retrieved the right passage
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How retrieval misses happen | 72 | 5 |
| M01L02 | Recall versus precision failures | 72 | 5 |

### M02 Query rewriting and expansion (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Rewrite a terse query into a retrieval-friendly one; (2) Expand a query with synonyms without drifting off-topic
- Common misconception addressed: Expanding so broadly that precision collapses
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Rewriting for retrieval | 96 | 5 |
| M02L02 | Expansion and its risks | 96 | 5 |

### M03 Retrieval routing (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Route product-specific questions to the right index; (2) Design a fallback when no route is confident
- Common misconception addressed: Sending every query to one index regardless of topic
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Routing to the right source | 80 | 5 |
| M03L02 | Confidence and fallback routing | 80 | 5 |
| M03L03 | Combining routing with filters | 80 | 5 |

### M04 Decomposing questions (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Split a two-part question into sub-queries; (2) Recombine sub-answers into one grounded response
- Common misconception addressed: Answering only the first half of a compound question
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Decomposing multi-part questions | 96 | 5 |
| M04L02 | Recombining sub-answers | 96 | 5 |

### M05 Evaluating routing and rewriting (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Measure recall gain on a labelled set; (2) Detect when a rewrite helped one query but hurt others
- Common misconception addressed: Shipping a rewrite that helps demos but hurts the average
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Measuring with a labelled set | 96 | 5 |
| M05L02 | Guarding against regressions | 96 | 5 |

## Integrative case

A support assistant is missing answers that exist in the docs: add query rewriting to fix vocabulary mismatch, route product-specific questions to the right index, decompose a two-part question into sub-queries, and measure the recall gain on a labelled set.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0595-final-protected | 30 | 40 | yes |
| MST-0595-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why raw queries fail | 5 |
| Query rewriting and expansion | 6 |
| Retrieval routing | 7 |
| Decomposing questions | 6 |
| Evaluating routing and rewriting | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0595-Q0001** (single-answer, Select ONE) Users ask about 'time off' but the docs say 'leave', and retrieval misses the answer. The most direct fix is:

- A. Rewrite or expand the query to bridge the vocabulary gap **(key)**  
  _Rationale:_ Correct: query rewriting aligns user wording with document terminology to improve recall.
- B. Shorten the documents  
  _Rationale:_ Document length is not the mismatch cause.
- C. Use a bigger model to guess  
  _Rationale:_ The passage was never retrieved; generation cannot fix a retrieval miss.
- D. Remove all metadata  
  _Rationale:_ Unrelated to the vocabulary mismatch.

**MST-0595-Q0002** (multiple-answer, Select TWO) Which TWO describe good retrieval routing? (Select TWO.)

- A. Directing product-specific questions to that product's index **(key)**  
  _Rationale:_ Correct: routing to the relevant source improves precision and recall.
- B. Defining a fallback when no route is confident **(key)**  
  _Rationale:_ Correct: a fallback prevents dropped queries when routing is uncertain.
- C. Sending every query to one index regardless of topic  
  _Rationale:_ Ignoring topic defeats the purpose of routing.
- D. Routing by the length of the question only  
  _Rationale:_ Length is not a meaningful routing signal.

**MST-0595-Q0003** (single-answer, Select ONE) A query rewrite boosted one demo question but you suspect regressions. The honest next step is:

- A. Evaluate the rewrite across a labelled set to check average impact **(key)**  
  _Rationale:_ Correct: measuring across many queries reveals whether the average improved.
- B. Ship it because the demo looked good  
  _Rationale:_ A single demo can hide regressions.
- C. Disable retrieval entirely  
  _Rationale:_ That removes the capability rather than evaluating the change.
- D. Assume all rewrites always help  
  _Rationale:_ Rewrites can help some queries and hurt others.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
