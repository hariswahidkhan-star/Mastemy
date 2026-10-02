# Recommender Systems

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1318` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Describe the main types of recommender systems
2. Explain collaborative filtering approaches
3. Explain content-based recommendation
4. Discuss evaluation and cold-start challenges
5. Recognise bias, feedback loops and fairness issues

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Overview (MASTEMY-DESIGN 20%)

- Worked applications: (1) Classify three systems by type; (2) Map a product feature to a recommender type
- Common misconception addressed: Thinking all recommenders are the same
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What recommenders do | 96 | 8 |
| M01L02 | Types of recommenders | 96 | 8 |

### M02 Collaborative filtering (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain item-based similarity; (2) Describe latent factors in plain terms
- Common misconception addressed: Assuming CF needs item content features
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | User- and item-based CF | 96 | 8 |
| M02L02 | Matrix factorisation idea | 96 | 8 |

### M03 Content-based (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a simple content profile; (2) Explain why hybrids help
- Common misconception addressed: Ignoring that content-based narrows variety
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Item features and profiles | 96 | 8 |
| M03L02 | Combining signals (hybrid) | 96 | 8 |

### M04 Evaluation and cold start (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose an offline metric and caveat it; (2) Propose a cold-start strategy
- Common misconception addressed: Trusting offline metrics as online truth
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Offline metrics and their limits | 96 | 8 |
| M04L02 | The cold-start problem | 96 | 8 |

### M05 Risks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot a feedback loop risk; (2) Name a fairness concern in recommendations
- Common misconception addressed: Ignoring that recommenders shape what users see
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Popularity bias and feedback loops | 96 | 8 |
| M05L02 | Fairness and transparency | 96 | 8 |

## Integrative case

A streaming service wants better recommendations for new users and niche titles. Compare collaborative and content-based approaches, address the cold-start problem, and flag feedback-loop and fairness risks.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1318-final-protected | 25 | 25 | yes |
| MST-1318-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Overview | 5 |
| Collaborative filtering | 5 |
| Content-based | 5 |
| Evaluation and cold start | 5 |
| Risks | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1318-Q0001** (single-answer, Select ONE) What is the core idea of collaborative filtering?

- A. Recommend based on patterns among similar users or items, from interaction data **(key)**  
  _Rationale:_ Correct: CF uses interaction patterns, not item content.
- B. Recommend using only the text description of each item  
  _Rationale:_ That describes content-based filtering.
- C. Recommend items completely at random  
  _Rationale:_ CF is pattern-based, not random.
- D. Recommend only the single most expensive item  
  _Rationale:_ Price alone is not collaborative filtering.

**MST-1318-Q0002** (multiple-answer, Select TWO) Which TWO are real challenges for recommender systems? (Select TWO.)

- A. Cold start for new users or items with little data **(key)**  
  _Rationale:_ Correct: sparse data makes recommendations hard.
- B. Feedback loops that reinforce already-popular items **(key)**  
  _Rationale:_ Correct: loops can narrow exposure over time.
- C. Having any interaction data at all  
  _Rationale:_ Interaction data is an asset, not a problem.
- D. Users being able to rate items  
  _Rationale:_ Ratings help, not hinder, recommendation.

**MST-1318-Q0003** (single-answer, Select ONE) Why can strong offline metrics mislead when evaluating a recommender?

- A. They may not reflect real user behaviour and engagement online **(key)**  
  _Rationale:_ Correct: offline metrics are proxies, not live outcomes.
- B. They cannot be computed from data  
  _Rationale:_ They are computed from data; the issue is validity.
- C. They always match online results exactly  
  _Rationale:_ They often diverge from online results.
- D. They measure hardware speed only  
  _Rationale:_ They measure recommendation quality proxies, not speed.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
