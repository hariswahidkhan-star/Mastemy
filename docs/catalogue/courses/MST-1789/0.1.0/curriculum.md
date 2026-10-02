# Operations Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1789` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-OM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Operations Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Operations strategy
2. Process design and analysis
3. Capacity and demand
4. Inventory and scheduling
5. Quality and improvement in operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate running a live production line; hands-on practice belongs in a simulation or on the floor.

## Modules

### M01 Operations strategy (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Map inputs, transformation and outputs for an operation; (2) Align a process to a competitive priority
- Common misconception addressed: Trying to be best at cost, quality, speed and flexibility all at once
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Operations and competitive priorities | 96 | 8 |
| M01L02 | Processes and the transformation model | 96 | 8 |

### M02 Process design and analysis (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Identify the bottleneck in a process; (2) Compute capacity of a line
- Common misconception addressed: Adding capacity to a non-bottleneck and expecting more output
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Process types and layout | 96 | 8 |
| M02L02 | Capacity and bottlenecks | 96 | 8 |

### M03 Capacity and demand (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a chase or level capacity strategy; (2) Explain why queues form at high utilisation
- Common misconception addressed: Planning for 100% utilisation and being surprised by long queues
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Capacity planning strategies | 96 | 8 |
| M03L02 | Demand management and queuing | 96 | 8 |

### M04 Inventory and scheduling (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute an economic order quantity; (2) Sequence jobs by a chosen rule
- Common misconception addressed: Ignoring setup and holding cost trade-offs when setting order size
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Inventory models (EOQ) | 96 | 8 |
| M04L02 | Scheduling and sequencing | 96 | 8 |

### M05 Quality and improvement in operations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Select a quality tool for a defect problem; (2) Apply a simple improvement cycle
- Common misconception addressed: Inspecting quality in at the end rather than building it into the process
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Quality in operations | 96 | 8 |
| M05L02 | Lean and continuous improvement | 96 | 8 |

## Integrative case

A workshop cannot meet demand despite buying more machines. The learner must map the process, find the true bottleneck, choose a capacity strategy, set order quantities and a scheduling rule, and apply a quality-improvement cycle, then recommend changes that actually raise throughput.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1789-final-protected | 25 | 25 | yes |
| MST-1789-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Operations strategy | 5 |
| Process design and analysis | 5 |
| Capacity and demand | 5 |
| Inventory and scheduling | 5 |
| Quality and improvement in operations | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1789-Q0001** (single-answer, Select ONE) The capacity of a process is determined by:

- A. Its bottleneck (the slowest resource) **(key)**  
  _Rationale:_ Correct: throughput is limited by the bottleneck, not the fastest step.
- B. The fastest step in the process  
  _Rationale:_ The fastest step cannot raise overall output past the bottleneck.
- C. The total number of machines owned  
  _Rationale:_ Owning machines does not help if the bottleneck is elsewhere.
- D. The size of the finished-goods warehouse  
  _Rationale:_ Storage does not set process capacity.

**MST-1789-Q0002** (multiple-answer, Select TWO) Which TWO are true as utilisation approaches 100%? (Select TWO.)

- A. Waiting times and queues grow sharply **(key)**  
  _Rationale:_ Correct: near full utilisation, small variability causes large queues.
- B. The system has little slack to absorb variability **(key)**  
  _Rationale:_ Correct: high utilisation removes the buffer that absorbs variation.
- C. Queues disappear entirely  
  _Rationale:_ Queues grow, not vanish, near full utilisation.
- D. Variability stops affecting the process  
  _Rationale:_ Variability's effect intensifies near full utilisation.

**MST-1789-Q0003** (single-answer, Select ONE) The economic order quantity (EOQ) balances:

- A. Ordering cost against inventory holding cost **(key)**  
  _Rationale:_ Correct: EOQ minimises the sum of ordering and holding costs.
- B. Sales revenue against marketing spend  
  _Rationale:_ EOQ is about inventory costs, not marketing.
- C. Labour cost against energy cost  
  _Rationale:_ Those are not the EOQ trade-off.
- D. Supplier count against customer count  
  _Rationale:_ EOQ is a quantity decision, not a counting one.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
