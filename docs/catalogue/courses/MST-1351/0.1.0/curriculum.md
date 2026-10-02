# Feature Stores

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1351` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

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

1. Feature store concepts
2. Training/serving consistency
3. Serving and freshness
4. Operations and governance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Feature store concepts (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map a feature to offline and online stores; (2) Identify features worth centralising
- Common misconception addressed: Thinking a feature store is just another database table
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why feature stores exist: reuse and consistency | 120 | 8 |
| M01L02 | Offline vs online stores | 120 | 8 |

### M02 Training/serving consistency (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a point-in-time correct training set; (2) Spot a leaky feature join
- Common misconception addressed: Joining the latest feature values into historical training rows
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Point-in-time correctness and time travel | 120 | 8 |
| M02L02 | Avoiding label leakage in joins | 120 | 8 |

### M03 Serving and freshness (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set a TTL for a near-real-time feature; (2) Design online lookup for a request path
- Common misconception addressed: Assuming batch-computed features are fresh enough for every use case
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Online serving and low-latency lookups | 120 | 8 |
| M03L02 | Materialisation, TTLs and freshness | 120 | 8 |

### M04 Operations and governance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Version a feature definition safely; (2) Add a drift check to a served feature
- Common misconception addressed: Changing a feature's meaning without versioning or notifying consumers
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Feature definitions, versioning and ownership | 120 | 8 |
| M04L02 | Monitoring feature drift and quality | 120 | 8 |

## Integrative case

A bank's model performs well offline but poorly in production. The cause is training/serving skew: training used latest feature values while serving used stale ones. Design offline/online stores, point-in-time joins, freshness TTLs and drift monitoring to close the skew.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1351-final-protected | 20 | 20 | yes |
| MST-1351-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Feature store concepts | 5 |
| Training/serving consistency | 5 |
| Serving and freshness | 5 |
| Operations and governance | 5 |

Minimum reviewed item bank: 336 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1351-Q0001** (single-answer, Select ONE) Training/serving skew most often arises when:

- A. Features are computed differently or at different times for training vs serving **(key)**  
  _Rationale:_ Correct: inconsistent feature computation between the two paths causes skew.
- B. The model has too few parameters  
  _Rationale:_ That is capacity, not skew.
- C. The GPU is too slow  
  _Rationale:_ Hardware speed does not cause skew.
- D. The learning rate is too high  
  _Rationale:_ An optimisation setting, unrelated to feature consistency.

**MST-1351-Q0002** (multiple-answer, Select TWO) Which TWO properties make a point-in-time correct training set? (Select TWO.)

- A. Each row uses only feature values known at that row's timestamp **(key)**  
  _Rationale:_ Correct: this prevents using future information.
- B. Joins respect event-time, not current-time, lookups **(key)**  
  _Rationale:_ Correct: event-time joins avoid leakage.
- C. Every row uses the most recent feature value available today  
  _Rationale:_ That leaks future values into past rows.
- D. Labels are copied into the feature columns  
  _Rationale:_ That is direct label leakage.

**MST-1351-Q0003** (single-answer, Select ONE) A real-time pricing model must read a feature within 10 ms per request. Which store serves it?

- A. The online store, optimised for low-latency key lookups **(key)**  
  _Rationale:_ Correct: online stores exist for request-path serving.
- B. The offline store used for batch training  
  _Rationale:_ Offline stores are for large historical reads, not low latency.
- C. A nightly CSV export  
  _Rationale:_ Not a low-latency serving path.
- D. The model registry  
  _Rationale:_ The registry stores models, not served feature values.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
