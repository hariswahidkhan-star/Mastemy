# Cursor Model Selection and Usage Optimization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0568` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0568 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor Model Selection and Usage Optimization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Understand how models differ and match a model to a task
2. Control context size to manage cost and latency
3. Measure usage, find where spend concentrates and set budgets
4. Optimise the workflow with caching and by removing redundant runs
5. Optimise responsibly without trading away correctness or review

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Understanding model choices (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Match three tasks to appropriate models; (2) Decide when a smaller model is good enough
- Common misconception addressed: Always reaching for the largest model regardless of task
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How models differ in capability, speed and cost | 72 | 5 |
| M01L02 | Matching a model to a task | 72 | 5 |

### M02 Controlling context and cost (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Reduce a bloated context to the essentials; (2) Estimate the cost impact of a context change
- Common misconception addressed: Dumping the whole repo into context for a small task
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | How context size drives cost and latency | 96 | 5 |
| M02L02 | Trimming context to what the task needs | 96 | 5 |

### M03 Measuring usage (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Find which activities drive most spend; (2) Set a budget with an alert
- Common misconception addressed: Optimising spend without measuring where it goes
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Reading usage and cost signals | 80 | 5 |
| M03L02 | Finding where spend concentrates | 80 | 5 |
| M03L03 | Setting a budget and alerts | 80 | 5 |

### M04 Optimising the workflow (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Cache a repeated result to cut cost; (2) Eliminate a redundant repeated run
- Common misconception addressed: Re-running the same expensive task instead of reusing results
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Caching and reusing results | 96 | 5 |
| M04L02 | Batching and avoiding redundant runs | 96 | 5 |

### M05 Responsible optimization (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide where cost-cutting would hurt correctness; (2) Document a team's default model choices
- Common misconception addressed: Cutting cost by skipping review or tests
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Not trading away correctness for cost | 96 | 5 |
| M05L02 | Documenting model choices for a team | 96 | 5 |

## Integrative case

A lead optimises a team's Cursor spend: match each class of task to an appropriate model, trim bloated context, measure where spend concentrates and set a budget with alerts, cache repeated results, and document default model choices without trading away review or correctness.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0568-final-protected | 30 | 40 | yes |
| MST-0568-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Understanding model choices | 5 |
| Controlling context and cost | 6 |
| Measuring usage | 7 |
| Optimising the workflow | 6 |
| Responsible optimization | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0568-Q0001** (single-answer, Select ONE) When does choosing a smaller, cheaper model make sense?

- A. When the task is simple enough that the smaller model does it correctly **(key)**  
  _Rationale:_ Correct: match the model to the task; a smaller model suffices for simple work.
- B. Never; always use the largest model  
  _Rationale:_ Always using the largest model wastes cost on simple tasks.
- C. Only when cost is literally zero  
  _Rationale:_ Cost is rarely zero; the decision is about task fit.
- D. Whenever you are in a hurry, regardless of correctness  
  _Rationale:_ Speed must not override correctness.

**MST-0568-Q0002** (multiple-answer, Select TWO) Which TWO steps reduce Cursor cost without guessing? (Select TWO.)

- A. Measure where spend concentrates before optimising **(key)**  
  _Rationale:_ Correct: measuring targets the real cost drivers.
- B. Trim context to what the task actually needs **(key)**  
  _Rationale:_ Correct: smaller context cuts cost and latency.
- C. Skip tests to save model calls  
  _Rationale:_ Cutting tests trades away correctness, not waste.
- D. Dump the whole repo into every prompt  
  _Rationale:_ Oversized context raises cost with no benefit.

**MST-0568-Q0003** (single-answer, Select ONE) A proposed cost saving would skip the review step on AI-written changes. What is the right call?

- A. Reject it; correctness and review must not be traded for cost **(key)**  
  _Rationale:_ Correct: skipping review to save cost ships unreviewed risk.
- B. Accept it to hit the budget  
  _Rationale:_ Hitting a budget by removing review is a false saving.
- C. Accept it only on Fridays  
  _Rationale:_ The day does not change the risk.
- D. Accept it and remove tests too  
  _Rationale:_ That compounds the risk further.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
