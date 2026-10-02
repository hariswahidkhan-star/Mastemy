# Kanban Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1744` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Explain Kanban's purpose, principles and where it fits among agile methods
2. Visualise work and design a Kanban board for a real workflow
3. Apply work-in-progress limits and manage flow
4. Measure flow with lead time, throughput and cumulative flow
5. Improve the system using policies, cadences and feedback loops

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Kanban foundations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide whether Kanban or Scrum fits three scenarios; (2) Describe Kanban's start-where-you-are principle in your own words
- Common misconception addressed: Thinking Kanban means 'no process' or 'no planning'
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Kanban is and its core principles | 96 | 8 |
| M01L02 | Kanban versus Scrum and when to use it | 96 | 8 |

### M02 Visualising work (MASTEMY-DESIGN 20%)

- Worked applications: (1) Turn a team's real process into board columns; (2) Define classes of service for urgent versus standard work
- Common misconception addressed: Creating columns that hide, rather than reveal, the real workflow
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Mapping a workflow into board columns | 96 | 8 |
| M02L02 | Cards, classes of service and explicit policies | 96 | 8 |

### M03 WIP limits and flow (MASTEMY-DESIGN 20%)

- Worked applications: (1) Set WIP limits for a three-column board; (2) Identify and address a bottleneck on a sample board
- Common misconception addressed: Starting new work whenever capacity feels available
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Why limit work in progress | 96 | 8 |
| M03L02 | Managing bottlenecks and blockers | 96 | 8 |

### M04 Measuring flow (MASTEMY-DESIGN 20%)

- Worked applications: (1) Compute lead time and throughput from sample data; (2) Spot a growing queue in a cumulative flow diagram
- Common misconception addressed: Measuring utilisation instead of flow
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Lead time, cycle time and throughput | 96 | 8 |
| M04L02 | Reading a cumulative flow diagram | 96 | 8 |

### M05 Improving the system (MASTEMY-DESIGN 20%)

- Worked applications: (1) Schedule the key Kanban cadences for a team; (2) Propose one policy change from a flow metric
- Common misconception addressed: Changing many things at once so you cannot tell what helped
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Cadences: standups, replenishment and reviews | 96 | 8 |
| M05L02 | Feedback loops and continuous improvement | 96 | 8 |

## Integrative case

A marketing operations team is overloaded, with many tasks started and few finished. Design a Kanban board for their intake-to-publish workflow, set work-in-progress limits, define explicit policies and a replenishment cadence, and propose two flow metrics to track whether throughput improves.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1744-final-protected | 25 | 25 | yes |
| MST-1744-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kanban foundations | 5 |
| Visualising work | 5 |
| WIP limits and flow | 5 |
| Measuring flow | 5 |
| Improving the system | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1744-Q0001** (single-answer, Select ONE) What is the primary purpose of a work-in-progress (WIP) limit?

- A. To improve flow by reducing multitasking and exposing bottlenecks **(key)**  
  _Rationale:_ Correct: limiting WIP shortens lead time and surfaces constraints.
- B. To cap how many people can be on the team  
  _Rationale:_ WIP limits constrain concurrent work items, not headcount.
- C. To guarantee every task is finished the same day  
  _Rationale:_ WIP limits improve flow but do not fix delivery times.
- D. To stop the team from ever starting new work  
  _Rationale:_ They regulate, not prohibit, starting work.

**MST-1744-Q0002** (multiple-answer, Select TWO) Which TWO metrics directly describe the flow of work through a Kanban system? (Select TWO.)

- A. Lead time **(key)**  
  _Rationale:_ Correct: lead time measures how long work takes from request to done.
- B. Throughput **(key)**  
  _Rationale:_ Correct: throughput measures items completed per period.
- C. Number of team members  
  _Rationale:_ Headcount is a resource, not a flow metric.
- D. Lines of documentation written  
  _Rationale:_ Output volume of docs is not a flow metric.

**MST-1744-Q0003** (single-answer, Select ONE) A team's board shows many items stuck in 'In Review' while 'In Progress' keeps filling. The best first action is:

- A. Address the review bottleneck before starting more work **(key)**  
  _Rationale:_ Correct: relieving the constraint improves overall flow.
- B. Add more columns to the board  
  _Rationale:_ More columns do not clear the bottleneck.
- C. Raise every WIP limit  
  _Rationale:_ Raising limits worsens the pile-up.
- D. Remove the review step entirely  
  _Rationale:_ Deleting a needed step trades flow for quality risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
