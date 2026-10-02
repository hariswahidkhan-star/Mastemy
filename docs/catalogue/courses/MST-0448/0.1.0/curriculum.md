# Recommendation Systems and Personalization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0448` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Recommendation foundations
2. Collaborative filtering
3. Content and hybrid models
4. Evaluation and serving

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Recommendation foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify a use case as rating vs ranking; (2) Separate implicit from explicit feedback
- Common misconception addressed: Treating implicit clicks as explicit positive ratings
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Problem types: rating, ranking, retrieval | 120 | 8 |
| M01L02 | Data, feedback signals and the long tail | 120 | 8 |

### M02 Collaborative filtering (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute item-item similarity for a catalogue; (2) Factorize a user-item matrix with latent factors
- Common misconception addressed: Assuming collaborative filtering solves cold start
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Neighbourhood methods | 120 | 8 |
| M02L02 | Matrix factorization | 120 | 8 |

### M03 Content and hybrid models (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build item features for a content model; (2) Combine content and CF into a hybrid
- Common misconception addressed: Ignoring cold-start items that have no interactions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Content-based recommendation | 120 | 8 |
| M03L02 | Hybrid and two-tower models | 120 | 8 |

### M04 Evaluation and serving (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute precision@k and NDCG for a ranked list; (2) Design an A/B test for a new ranker
- Common misconception addressed: Judging a ranker only by overall accuracy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Offline ranking metrics | 120 | 8 |
| M04L02 | Online testing and feedback loops | 120 | 8 |

## Integrative case

A streaming service wants a homepage that mixes popular and personalized titles while handling brand-new items. Choose collaborative, content or hybrid methods, address cold start, and design offline and online evaluation that reflects ranking quality.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0448-final-protected | 20 | 20 | yes |
| MST-0448-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Recommendation foundations | 5 |
| Collaborative filtering | 5 |
| Content and hybrid models | 5 |
| Evaluation and serving | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0448-Q0001** (single-answer, Select ONE) Which problem does a pure collaborative-filtering recommender struggle with most?

- A. Cold start for a brand-new item with no interactions **(key)**  
  _Rationale:_ Correct: with no interactions, CF has no signal for the item.
- B. Recommending very popular items  
  _Rationale:_ Popular items are easy for CF.
- C. Computing item similarity for established items  
  _Rationale:_ That is CF's strength.
- D. Storing a user-item matrix  
  _Rationale:_ Storage is an engineering concern, not a CF weakness.

**MST-0448-Q0002** (multiple-answer, Select TWO) Which TWO metrics are appropriate for evaluating a ranked recommendation list? (Select TWO.)

- A. NDCG@k **(key)**  
  _Rationale:_ Correct: NDCG rewards relevant items ranked higher.
- B. Precision@k **(key)**  
  _Rationale:_ Correct: precision@k measures relevant items in the top k.
- C. Mean squared error of pixel values  
  _Rationale:_ That is an image metric, unrelated to ranking.
- D. Word error rate  
  _Rationale:_ WER is a speech-transcription metric.

**MST-0448-Q0003** (single-answer, Select ONE) Why should implicit feedback such as clicks not be treated identically to explicit star ratings?

- A. A click signals interest but not necessarily satisfaction or a strong preference **(key)**  
  _Rationale:_ Correct: implicit signals are noisier and lack a clear negative.
- B. Clicks cannot be logged  
  _Rationale:_ Clicks are routinely logged.
- C. Explicit ratings are always unavailable  
  _Rationale:_ They are sometimes available; that is not the point.
- D. Implicit feedback is always more accurate  
  _Rationale:_ It is noisier, not more accurate.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
