# Project Scheduling and Critical Path

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1746` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-PMB-SK-PSCP-001 |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — Project Scheduling and Critical Path (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scheduling foundations
2. Sequencing and dependencies
3. The critical path
4. Schedule compression and resources
5. Baseline, monitoring and control

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate building a live schedule in scheduling software; hands-on practice belongs in a tool.

## Modules

### M01 Scheduling foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decompose a work package into schedulable activities; (2) Estimate a duration with three-point estimating
- Common misconception addressed: Confusing effort (person-hours) with duration (elapsed time)
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Activities, durations and estimates | 58 | 6 |
| M01L02 | From WBS to activity list | 58 | 6 |

### M02 Sequencing and dependencies (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draw a network diagram from a dependency table; (2) Apply a lead or lag to a dependency
- Common misconception addressed: Treating all dependencies as finish-to-start by default
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Dependency types and the network diagram | 58 | 6 |
| M02L02 | Leads, lags and constraints | 58 | 6 |

### M03 The critical path (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute early/late dates with forward and backward passes; (2) Identify the critical path and total float
- Common misconception addressed: Believing every delayed task delays the project
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Forward and backward pass | 58 | 6 |
| M03L02 | Float and the critical path | 58 | 6 |

### M04 Schedule compression and resources (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose crashing vs fast-tracking to recover time; (2) Level an over-allocated resource
- Common misconception addressed: Crashing non-critical tasks and expecting the project to finish sooner
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Crashing and fast-tracking | 57 | 6 |
| M04L02 | Resource levelling | 57 | 6 |

### M05 Baseline, monitoring and control (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Set a schedule baseline and track against it; (2) Interpret a schedule variance
- Common misconception addressed: Changing the baseline informally whenever the plan slips
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Setting and protecting the baseline | 57 | 6 |
| M05L02 | Schedule performance tracking | 57 | 6 |

## Integrative case

A product launch must hit a trade-show date. The learner must build an activity list from the WBS, sequence dependencies, compute the critical path and float, decide how to compress the schedule when it runs late, and track progress against a protected baseline, then recommend a recovery plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1746-final-protected | 25 | 25 | yes |
| MST-1746-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Scheduling foundations | 5 |
| Sequencing and dependencies | 5 |
| The critical path | 5 |
| Schedule compression and resources | 5 |
| Baseline, monitoring and control | 5 |

Minimum reviewed item bank: 270 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1746-Q0001** (single-answer, Select ONE) Total float of an activity is:

- A. The time an activity can slip without delaying the project finish **(key)**  
  _Rationale:_ Correct: total float is slack against the project end date.
- B. The time an activity takes to complete  
  _Rationale:_ That is its duration, not float.
- C. The cost of delaying the activity  
  _Rationale:_ Float is a time concept, not a cost.
- D. The number of resources assigned  
  _Rationale:_ Resourcing is unrelated to float.

**MST-1746-Q0002** (multiple-answer, Select TWO) Which TWO are valid ways to shorten a schedule? (Select TWO.)

- A. Fast-tracking: running activities in parallel that were sequential **(key)**  
  _Rationale:_ Correct: overlapping work can shorten duration, at added risk.
- B. Crashing: adding resources to critical activities **(key)**  
  _Rationale:_ Correct: crashing shortens critical work, usually at added cost.
- C. Crashing tasks that are not on the critical path  
  _Rationale:_ Only critical-path compression shortens the project.
- D. Removing the schedule baseline  
  _Rationale:_ Deleting the baseline does not change the work.

**MST-1746-Q0003** (single-answer, Select ONE) A finish-to-start dependency means:

- A. The successor cannot start until the predecessor finishes **(key)**  
  _Rationale:_ Correct: FS is the most common dependency type.
- B. Both tasks must finish at the same time  
  _Rationale:_ That is finish-to-finish.
- C. Both tasks must start at the same time  
  _Rationale:_ That is start-to-start.
- D. The successor must finish before the predecessor starts  
  _Rationale:_ That ordering is not a standard dependency.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
