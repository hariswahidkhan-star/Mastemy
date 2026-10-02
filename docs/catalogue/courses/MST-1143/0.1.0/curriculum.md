# Primavera P6: Scheduling and Project Control

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1143` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build and maintain a resource-loaded P6 schedule using a work breakdown structure and activity relationships
2. Apply calendars, constraints and the critical path method to analyse a schedule
3. Baseline a schedule and track progress using data date updates and earned value
4. Level resources and resolve over-allocation within a project plan
5. Produce layouts, filters and reports that communicate schedule status to stakeholders

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation of the tools and workflows taught, the quality of live outputs, and professional judgement on the job are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, graded prompts or peer review.

## Modules

### M01 WBS and activity networks (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a WBS and activity list for a small fit-out project; (2) Convert a logic diagram into P6 predecessor/successor links
- Common misconception addressed: Treating the WBS as a task list rather than a deliverable hierarchy
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Projects, EPS and the work breakdown structure | 96 | 8 |
| M01L02 | Activities, durations and relationship logic | 96 | 8 |
### M02 Calendars, constraints and the critical path (MASTEMY-DESIGN 20%)

- Worked applications: (1) Diagnose why an activity floats when it should be critical; (2) Choose an appropriate constraint for a fixed delivery date
- Common misconception addressed: Using hard constraints to force dates instead of driving logic
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Calendars and activity types | 96 | 8 |
| M02L02 | Constraints and critical path analysis | 96 | 8 |
### M03 Baselines and progress tracking (MASTEMY-DESIGN 20%)

- Worked applications: (1) Record a progress update at a given data date; (2) Interpret SPI and CPI from a sample update
- Common misconception addressed: Updating % complete without advancing the data date
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Setting and assigning baselines | 96 | 8 |
| M03L02 | Data date updates and earned value | 96 | 8 |
### M04 Resource and cost control (MASTEMY-DESIGN 20%)

- Worked applications: (1) Spot over-allocation in a resource histogram; (2) Level a two-crew conflict and report the schedule impact
- Common misconception addressed: Assuming levelling never changes the project finish date
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Assigning resources and roles | 96 | 8 |
| M04L02 | Resource levelling and over-allocation | 96 | 8 |
### M05 Reporting and communication (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a layout that highlights the critical path for a review; (2) Filter a schedule to the next 30 days of near-critical work
- Common misconception addressed: Sending the full schedule instead of a stakeholder-appropriate view
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Layouts, filters and grouping | 96 | 8 |
| M05L02 | Reports and status communication | 96 | 8 |

## Integrative case

A contractor must plan an eight-month plant upgrade in P6: build the WBS and activity network, load resources, set a baseline, then run two progress updates and explain the slipping critical path and recovery options to the project board.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1143-final-protected | 25 | 25 | yes |
| MST-1143-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| WBS and activity networks | 5 |
| Calendars, constraints and the critical path | 5 |
| Baselines and progress tracking | 5 |
| Resource and cost control | 5 |
| Reporting and communication | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1143-Q0001** (single-answer, Select ONE) An activity shows total float of zero but is not on the longest path reported by P6. What is the most likely cause?

- A. A constraint or calendar is driving the activity, not network logic **(key)**  
  _Rationale:_ Correct: constraints and calendars can produce zero float independently of the longest logic path.
- B. P6 cannot show float for constrained activities  
  _Rationale:_ P6 does compute float for constrained activities; the value is simply affected by the constraint.
- C. The activity has no predecessors  
  _Rationale:_ Missing predecessors affects float but would not by itself force it to zero off the critical path.
- D. Total float is always zero for every activity  
  _Rationale:_ Total float varies across the network; it is not universally zero.

**MST-1143-Q0002** (multiple-answer, Select TWO) During a progress update you want a reliable earned-value picture. Which TWO actions are required? (Select TWO.)

- A. Advance the data date to the status date before reading SPI/CPI **(key)**  
  _Rationale:_ Correct: earned-value indices are meaningless unless the data date reflects the as-of point.
- B. Record actual progress against the current baseline **(key)**  
  _Rationale:_ Correct: EV compares actual progress to the baseline, so a baseline must be assigned and progress recorded.
- C. Delete the baseline before updating  
  _Rationale:_ Deleting the baseline removes the reference EV is measured against.
- D. Set every remaining activity to 100% complete  
  _Rationale:_ Marking unfinished work complete falsifies the status and the indices.

**MST-1143-Q0003** (single-answer, Select ONE) A project board wants a one-page view of what is at risk in the next month. Which P6 output best fits?

- A. A filtered layout of near-critical activities in the next 30 days, grouped by responsibility **(key)**  
  _Rationale:_ Correct: a filtered, grouped layout targets the board's decision horizon.
- B. The full activity table exported to a spreadsheet  
  _Rationale:_ The full table buries the signal the board needs in detail.
- C. A resource histogram for the whole project  
  _Rationale:_ A whole-project histogram does not isolate the next month's risk.
- D. The raw baseline with no progress applied  
  _Rationale:_ A baseline without progress shows the plan, not current risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
