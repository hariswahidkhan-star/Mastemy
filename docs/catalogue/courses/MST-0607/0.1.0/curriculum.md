# RAG Performance, Caching, and Cost Optimization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0607` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — RAG Performance, Caching, and Cost Optimization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Locate the latency and cost drivers in a RAG pipeline
2. Apply caching at the right layers
3. Tune retrieval for speed and cost
4. Control generation cost through model and context choices
5. Balance cost cuts against answer quality
6. Set cost budgets and monitor them in production

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Where latency and cost come from (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Profile a pipeline to find the bottleneck; (2) Attribute cost across retrieval and generation
- Common misconception addressed: Optimising the wrong stage without measuring
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Profiling the pipeline | 80 | 8 |
| M01L02 | Cost attribution by stage | 80 | 8 |

### M02 Caching strategies (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Add an embedding or retrieval cache; (2) Cache full answers safely with invalidation
- Common misconception addressed: Caching stale answers with no invalidation
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Embedding and retrieval caches | 80 | 8 |
| M02L02 | Answer caching and invalidation | 80 | 8 |

### M03 Retrieval efficiency (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Tune top-k and index parameters; (2) Reduce redundant or oversized context
- Common misconception addressed: Retrieving far more context than needed
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Top-k and index tuning | 80 | 8 |
| M03L02 | Context size and redundancy | 80 | 8 |

### M04 Model and context cost control (MASTEMY-DESIGN 17%, design weight)

- Worked applications: (1) Choose a model tier matched to the task; (2) Trim prompts and context to cut token cost
- Common misconception addressed: Always using the largest model for every query
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Model tier selection | 80 | 8 |
| M04L02 | Prompt and context trimming | 80 | 8 |

### M05 Quality-cost trade-offs (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Measure quality before and after an optimisation; (2) Reject a cut that degrades quality too far
- Common misconception addressed: Cutting cost while silently harming quality
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Measuring quality impact | 80 | 8 |
| M05L02 | Acceptable trade-off thresholds | 80 | 8 |

### M06 Budgets and monitoring (MASTEMY-DESIGN 16%, design weight)

- Worked applications: (1) Define a cost-per-query budget; (2) Alert on cost or latency regressions
- Common misconception addressed: No visibility into per-query cost
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Cost-per-query budgets | 80 | 8 |
| M06L02 | Monitoring and alerts | 80 | 8 |

## Integrative case

A high-traffic RAG assistant is too slow and too expensive. Profile the pipeline, cut latency and cost with caching, retrieval tuning and model choices, and prove the changes keep answer quality acceptable, then present a cost-per-query budget to the team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0607-final-protected | 40 | 40 | yes |
| MST-0607-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Where latency and cost come from | 7 |
| Caching strategies | 7 |
| Retrieval efficiency | 7 |
| Model and context cost control | 7 |
| Quality-cost trade-offs | 6 |
| Budgets and monitoring | 6 |

Minimum reviewed item bank: 440 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0607-Q0001** (single-answer, Select ONE) A team adds a bigger model to speed up a slow RAG system, but it gets slower and pricier. What step did they skip?

- A. Profiling to find the actual bottleneck before optimising **(key)**  
  _Rationale:_ Correct: measure first; the bottleneck may not be the model.
- B. Buying more GPUs  
  _Rationale:_ Hardware spend without profiling may not help.
- C. Removing all caching  
  _Rationale:_ Removing caching would worsen performance.
- D. Increasing top-k  
  _Rationale:_ Larger top-k usually adds cost and latency.

**MST-0607-Q0002** (multiple-answer, Select TWO) Which TWO caching practices cut cost without serving wrong answers? (Select TWO.)

- A. Cache embeddings and retrieval results for repeated inputs **(key)**  
  _Rationale:_ Correct: caching repeated work avoids recomputation safely.
- B. Invalidate cached answers when their source content changes **(key)**  
  _Rationale:_ Correct: invalidation prevents serving stale answers.
- C. Cache answers forever with no invalidation  
  _Rationale:_ That serves stale, possibly wrong answers.
- D. Disable caching to guarantee freshness at any cost  
  _Rationale:_ That needlessly raises cost and latency.

**MST-0607-Q0003** (single-answer, Select ONE) Before shipping a cost-cutting change, what must you verify?

- A. That answer quality stays within an acceptable threshold on an evaluation set **(key)**  
  _Rationale:_ Correct: cost cuts must not silently degrade quality.
- B. That the change reduces the codebase size  
  _Rationale:_ Code size is not the concern.
- C. That the model vendor approves  
  _Rationale:_ Vendor approval is not the gate.
- D. That latency increased  
  _Rationale:_ You want latency to drop, and quality to hold.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
