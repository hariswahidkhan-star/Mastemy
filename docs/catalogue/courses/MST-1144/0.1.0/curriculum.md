# Microsoft Project: Scheduling and Resource Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1144` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-MIC-SK-MPF-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Create a task-based schedule in Microsoft Project using outlining and task dependencies
2. Apply manual and automatic scheduling modes and resolve the differences
3. Assign resources and interpret work, duration and units relationships
4. Set a baseline and track progress against it
5. Build views, filters and reports that communicate plan status

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the tools and workflows taught, the quality of live outputs, and professional judgement on the job are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 Tasks and outlining (MASTEMY-DESIGN 20%)

- Worked applications: (1) Outline a rollout into phases, summary tasks and milestones; (2) Convert a manually scheduled plan to automatic and explain the shifts
- Common misconception addressed: Believing manual scheduling behaves like automatic once dependencies are added
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Creating tasks, summaries and milestones | 96 | 8 |
| M01L02 | Manual vs automatic scheduling | 96 | 8 |
### M02 Dependencies and the schedule (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply finish-to-start links with a two-day lag; (2) Identify the critical path in a sample plan
- Common misconception addressed: Using date constraints where a dependency link is the correct tool
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Linking tasks and dependency types | 96 | 8 |
| M02L02 | Lead, lag and the critical path | 96 | 8 |
### M03 Resources and assignments (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assign a part-time resource and read the resulting work; (2) Fix an over-allocation flagged in the resource usage view
- Common misconception addressed: Assuming duration stays fixed when you change assignment units
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Resource types and the resource sheet | 96 | 8 |
| M03L02 | Work, duration and units | 96 | 8 |
### M04 Baselines and tracking (MASTEMY-DESIGN 20%)

- Worked applications: (1) Baseline a plan and record actuals at a status date; (2) Read start and finish variance against the baseline
- Common misconception addressed: Re-baselining after every change so variance never appears
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Setting a baseline | 96 | 8 |
| M04L02 | Updating progress and variance | 96 | 8 |
### M05 Views and reporting (MASTEMY-DESIGN 20%)

- Worked applications: (1) Filter to incomplete tasks due this week; (2) Build a status report for a sponsor from a Project dashboard
- Common misconception addressed: Sharing the Gantt screenshot instead of a decision-focused report
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Core views, tables and filters | 96 | 8 |
| M05L02 | Reports and dashboards | 96 | 8 |

## Integrative case

A team lead must plan a three-month internal software rollout in Microsoft Project: outline the tasks, set dependencies and a baseline, assign a small team, then report at the halfway point on slippage and reallocation options.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1144-final-protected | 25 | 25 | yes |
| MST-1144-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Tasks and outlining | 5 |
| Dependencies and the schedule | 5 |
| Resources and assignments | 5 |
| Baselines and tracking | 5 |
| Views and reporting | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1144-Q0001** (single-answer, Select ONE) A task in Microsoft Project does not move when you link a predecessor that finishes later. What is the most likely reason?

- A. The task is set to manually scheduled **(key)**  
  _Rationale:_ Correct: manually scheduled tasks ignore dependency-driven date changes until switched to automatic.
- B. Microsoft Project does not support task links  
  _Rationale:_ Project fully supports dependency links.
- C. The predecessor has no resources assigned  
  _Rationale:_ Resource assignment does not control whether links move dates.
- D. The project has no baseline  
  _Rationale:_ A baseline records a reference; it does not affect link-driven scheduling.

**MST-1144-Q0002** (multiple-answer, Select TWO) You change a task's assignment units from 100% to 50% and want to understand the effect. Which TWO statements are correct for a fixed-units, effort-driven task? (Select TWO.)

- A. Duration can lengthen because the same work is done at a lower rate **(key)**  
  _Rationale:_ Correct: with fixed units and fixed work, reducing the rate extends duration.
- B. Work stays the same unless you change it **(key)**  
  _Rationale:_ Correct: the amount of work is held; only how it spreads over time changes.
- C. Duration is unaffected by assignment units  
  _Rationale:_ Units directly influence duration for effort-driven, fixed-units tasks.
- D. Work automatically halves when units halve  
  _Rationale:_ Work is not reduced by changing units; it is the planned effort.

**MST-1144-Q0003** (single-answer, Select ONE) At the halfway status date a task shows positive finish variance. What does this indicate against the baseline?

- A. The task is forecast to finish later than the baseline planned **(key)**  
  _Rationale:_ Correct: positive finish variance means the current finish is later than baseline.
- B. The task finished earlier than planned  
  _Rationale:_ An earlier finish would show negative variance.
- C. The baseline has been deleted  
  _Rationale:_ Variance requires a baseline to exist, so it has not been deleted.
- D. The task has no resources  
  _Rationale:_ Variance reflects dates, not resource assignment.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
