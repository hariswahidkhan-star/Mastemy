# Topic Modelling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1363` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Topic modelling foundations
2. Classic methods
3. Modern approaches
4. Evaluation and use

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Topic modelling foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Frame a corpus for topic modelling; (2) Decide if topic modelling fits a goal
- Common misconception addressed: Expecting topic models to return clean, human-named categories
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What topic models do | 120 | 8 |
| M01L02 | Documents, terms and the bag-of-words view | 120 | 8 |

### M02 Classic methods (MASTEMY-DESIGN 25%)

- Worked applications: (1) Fit an LDA model to a corpus; (2) Tune the number of topics
- Common misconception addressed: Picking the number of topics arbitrarily with no evaluation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | LDA and its assumptions | 120 | 8 |
| M02L02 | Preprocessing and hyperparameters | 120 | 8 |

### M03 Modern approaches (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build an embedding-based topic model; (2) Choose classic vs neural for a corpus
- Common misconception addressed: Assuming newer embedding models are always better for every corpus
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Embedding-based topic models (e.g. BERTopic) | 120 | 8 |
| M03L02 | Comparing classic vs neural topics | 120 | 8 |

### M04 Evaluation and use (MASTEMY-DESIGN 25%)

- Worked applications: (1) Compute topic coherence; (2) Label topics for stakeholders
- Common misconception addressed: Trusting topics without checking coherence or human interpretability
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Coherence, stability and interpretation | 120 | 8 |
| M04L02 | Labelling and applying topics | 120 | 8 |

## Integrative case

A policy team wants to understand themes in thousands of open survey responses. Choose preprocessing, fit a classic and an embedding-based topic model, select the number of topics with coherence, and label and present interpretable themes.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1363-final-protected | 20 | 20 | yes |
| MST-1363-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Topic modelling foundations | 5 |
| Classic methods | 5 |
| Modern approaches | 5 |
| Evaluation and use | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1363-Q0001** (single-answer, Select ONE) What does a topic model actually output for each topic?

- A. A distribution over words that a human must interpret and name **(key)**  
  _Rationale:_ Correct: topics are word distributions, not pre-named categories.
- B. A single exact label like 'healthcare'  
  _Rationale:_ Models do not assign human names automatically.
- C. A sentiment score  
  _Rationale:_ That is sentiment analysis, not topic modelling.
- D. A translation of the document  
  _Rationale:_ Unrelated to topic modelling.

**MST-1363-Q0002** (multiple-answer, Select TWO) Which TWO practices help choose and trust the number of topics? (Select TWO.)

- A. Compare coherence scores across candidate topic counts **(key)**  
  _Rationale:_ Correct: coherence guides selection quantitatively.
- B. Have domain experts review topic interpretability **(key)**  
  _Rationale:_ Correct: human judgement validates usefulness.
- C. Always set the number of topics to 2  
  _Rationale:_ Arbitrary and usually too coarse.
- D. Pick the count that trains fastest  
  _Rationale:_ Training speed is not a quality signal.

**MST-1363-Q0003** (single-answer, Select ONE) When might classic LDA be preferable to an embedding-based model?

- A. On a large, simple corpus where interpretability and low cost matter **(key)**  
  _Rationale:_ Correct: LDA is cheap and interpretable; neither method is universally best.
- B. Always, because LDA is newer  
  _Rationale:_ LDA is older, not newer.
- C. Never, since embeddings always win  
  _Rationale:_ No method wins on every corpus.
- D. Only for image data  
  _Rationale:_ Topic modelling is for text.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
