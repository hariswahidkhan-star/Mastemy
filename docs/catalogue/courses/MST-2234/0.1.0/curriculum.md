# Industrial and Manufacturing Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2234` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Engineering standards, tool specifics and formulae must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Industrial and Manufacturing Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe major manufacturing processes and how they shape design choices
2. Apply lean principles to identify and remove waste in a process
3. Analyse and balance a production line and compute takt time
4. Use basic quality tools and statistical process control
5. Plan facility layout and material flow
6. Apply ergonomics and safety principles to work design

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Manufacturing processes (25% (Mastemy design weight), design weight)

- Worked applications: (1) Match four parts to the cheapest suitable process; (2) Decide when additive beats machining for a bracket
- Common misconception addressed: Assuming one process is best regardless of volume
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Machining, casting, forming and joining | 120 | 7 |
| M01L02 | Additive and modern process selection | 120 | 7 |

### M02 Lean and process improvement (25% (Mastemy design weight), design weight)

- Worked applications: (1) Identify the seven wastes in a described workflow; (2) Balance a four-station line to meet takt time
- Common misconception addressed: Optimising a single station while the line stays unbalanced
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Value, waste and lean principles | 120 | 7 |
| M02L02 | Line balancing and takt time | 120 | 7 |

### M03 Quality and control (25% (Mastemy design weight), design weight)

- Worked applications: (1) Build a Pareto chart to prioritise defect causes; (2) Read a control chart and spot an out-of-control signal
- Common misconception addressed: Reacting to normal variation as if it were a special cause
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Quality tools and root-cause analysis | 120 | 7 |
| M03L02 | Statistical process control and capability | 120 | 7 |

### M04 Facilities, ergonomics and safety (25% (Mastemy design weight), design weight)

- Worked applications: (1) Lay out a cell to minimise travel distance; (2) Redesign a station to reduce repetitive strain
- Common misconception addressed: Treating safety and ergonomics as optional add-ons
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Layout and material flow | 120 | 7 |
| M04L02 | Ergonomics and workplace safety | 120 | 7 |

## Integrative case

A small factory assembles desk lamps but misses demand: measure takt time, rebalance the line, cut the biggest wastes, apply SPC to a wobbly solder step, and relayout the cell to hit the daily target safely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2234-final-protected | 40 | 40 | yes |
| MST-2234-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Manufacturing processes | 10 |
| Lean and process improvement | 10 |
| Quality and control | 10 |
| Facilities, ergonomics and safety | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2234-Q0001** (single-answer, Select ONE) What does takt time represent in a production line?

- A. The rate at which units must be completed to meet customer demand **(key)**  
  _Rationale:_ Correct: takt time is available time divided by demand, pacing the line.
- B. The fastest a machine can physically run  
  _Rationale:_ That is cycle time capacity, not takt time.
- C. The total cost of the line per day  
  _Rationale:_ Takt time is a time measure, not a cost.
- D. The number of defects allowed  
  _Rationale:_ Defect limits are a quality target, unrelated to takt.

**MST-2234-Q0002** (multiple-answer, Select TWO) Which TWO of the following are among the classic 'wastes' targeted by lean? (Select TWO.)

- A. Overproduction **(key)**  
  _Rationale:_ Correct: making more or sooner than needed is a core lean waste.
- B. Excess transportation of material **(key)**  
  _Rationale:_ Correct: unnecessary movement of material is a recognised waste.
- C. Training operators  
  _Rationale:_ Developing people is value-adding, not a waste.
- D. Meeting the customer's required quality  
  _Rationale:_ Delivering required quality is value, not waste.

**MST-2234-Q0003** (single-answer, Select ONE) A control chart shows a single point far outside the upper control limit. What is the appropriate response?

- A. Investigate it as a potential special cause **(key)**  
  _Rationale:_ Correct: an out-of-limit point signals an assignable cause to investigate.
- B. Ignore it as normal random variation  
  _Rationale:_ Points beyond the limits are not expected from common-cause variation.
- C. Immediately shrink the control limits  
  _Rationale:_ Limits reflect the process; you investigate the signal first.
- D. Stop plotting the chart  
  _Rationale:_ The chart is doing its job by flagging the signal.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
