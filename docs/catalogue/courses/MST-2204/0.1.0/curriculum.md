# Construction Scheduling and Planning

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2204` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Construction Scheduling and Planning (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why planning and scheduling matter to cost, quality and safety
2. Break a project into a work breakdown structure and activities
3. Build a logic network and compute the critical path, float and durations
4. Create and read a Gantt/bar chart and a baseline schedule
5. Level resources and respond to delays and acceleration pressures
6. Track progress, forecast completion and report honestly on slippage

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Planning fundamentals (25% (design weight), design weight)

- Worked applications: (1) Build a WBS for a house renovation; (2) Define activities and their durations
- Common misconception addressed: Confusing a to-do list with a logic-linked schedule
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why we plan: the planning hierarchy | 120 | 7 |
| M01L02 | Work breakdown structure and activity definition | 120 | 7 |

### M02 Network scheduling and the critical path (25% (design weight), design weight)

- Worked applications: (1) Compute the critical path of a small network; (2) Explain what float means for a non-critical task
- Common misconception addressed: Thinking every delayed task delays the project
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Logic, dependencies and durations | 120 | 7 |
| M02L02 | Critical path, float and the CPM calculation | 120 | 7 |

### M03 Schedules and resources (25% (design weight), design weight)

- Worked applications: (1) Convert a network into a baseline Gantt chart; (2) Level a crew that is over-allocated in one week
- Common misconception addressed: Ignoring resource limits when drawing a schedule
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Gantt charts and the baseline | 120 | 7 |
| M03L02 | Resource loading and levelling | 120 | 7 |

### M04 Delay, progress and forecasting (25% (design weight), design weight)

- Worked applications: (1) Update a schedule from site progress; (2) Forecast a new finish date after a two-week delay
- Common misconception addressed: Reporting percent-complete that hides a slipping critical path
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Tracking progress and earned schedule | 120 | 7 |
| M04L02 | Managing delay, acceleration and honest forecasting | 120 | 7 |

## Integrative case

A site manager must plan an office refurbishment: build a WBS and logic network, calculate the critical path, produce a resource-levelled baseline, then update progress weekly and forecast an honest completion date when a key delivery slips.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2204-final-protected | 40 | 40 | yes |
| MST-2204-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Planning fundamentals | 10 |
| Network scheduling and the critical path | 10 |
| Schedules and resources | 10 |
| Delay, progress and forecasting | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2204-Q0001** (single-answer, Select ONE) A non-critical activity with ten days of total float is delayed by three days. What is the effect on the project completion date, all else equal?

- A. No change, because the delay is absorbed by the available float **(key)**  
  _Rationale:_ Correct: a delay within float does not move completion.
- B. The project finishes three days late  
  _Rationale:_ Only a delay exceeding float on the critical path moves completion.
- C. The project finishes three days early  
  _Rationale:_ A delay does not accelerate completion.
- D. The critical path disappears  
  _Rationale:_ The critical path does not vanish because of a non-critical delay.

**MST-2204-Q0002** (multiple-answer, Select TWO) Which TWO statements about the critical path are correct? (Select TWO.)

- A. It is the longest path of dependent activities through the network **(key)**  
  _Rationale:_ Correct: the critical path is the longest dependent path.
- B. Activities on it have zero or minimum total float **(key)**  
  _Rationale:_ Correct: critical activities have zero or minimum float.
- C. It is simply the most expensive activities  
  _Rationale:_ Cost does not define the critical path; duration logic does.
- D. It can never change during the project  
  _Rationale:_ The critical path can shift as the schedule is updated.

**MST-2204-Q0003** (single-answer, Select ONE) What is the main purpose of a baseline schedule?

- A. To provide an approved reference against which actual progress is measured **(key)**  
  _Rationale:_ Correct: the baseline is the reference for measuring progress.
- B. To guarantee the project cannot be delayed  
  _Rationale:_ A baseline does not prevent delay; it measures against it.
- C. To replace the need for a budget  
  _Rationale:_ A schedule baseline does not replace a cost budget.
- D. To hide problems from the client  
  _Rationale:_ A baseline supports transparent reporting, not concealment.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
