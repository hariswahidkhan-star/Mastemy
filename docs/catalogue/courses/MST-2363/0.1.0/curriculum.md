# Power Grids and Smart Grids: Operation and Flexibility

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2363` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (general professional skills course; no external standard claimed). Outcomes are Mastemy internal IDs derived from the course blueprint; scope versioned by verification date, not an issuer syllabus edition. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Power Grids and Smart Grids: Operation and Flexibility (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe how electricity grids are structured from generation to distribution
2. Explain how supply and demand are balanced in real time and why frequency matters
3. Distinguish transmission and distribution roles and key grid equipment
4. Explain reserves, inertia and ancillary services that keep the grid stable
5. Describe smart-grid technologies: metering, sensing, automation and demand response
6. Assess how distributed and variable resources change grid operation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Grid structure (25% (design weight), design weight)

- Worked applications: (1) Trace power from a plant to a home through voltage transformations; (2) Label the parts of a simple substation diagram
- Common misconception addressed: Thinking electricity is stored in the wires until needed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Generation, transmission and distribution layers | 120 | 7 |
| M01L02 | Voltage levels, substations and key equipment | 120 | 7 |

### M02 Balancing and stability (25% (design weight), design weight)

- Worked applications: (1) Explain what a falling grid frequency indicates and the response; (2) Match three services to the problem they solve
- Common misconception addressed: Believing frequency can drift freely without consequence
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Real-time supply-demand balancing and frequency | 120 | 7 |
| M02L02 | Inertia, reserves and ancillary services | 120 | 7 |

### M03 Smart-grid technology (25% (design weight), design weight)

- Worked applications: (1) Design a demand-response signal for EV charging off the evening peak; (2) Show how a smart meter enables time-of-use pricing
- Common misconception addressed: Assuming smart meters by themselves reduce consumption
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Smart metering, sensing and automation | 120 | 7 |
| M03L02 | Demand response and flexibility markets | 120 | 7 |

### M04 Distributed and variable resources (25% (design weight), design weight)

- Worked applications: (1) Explain how many rooftop solar homes can cause reverse power flow; (2) Decide when curtailment vs storage is the better response
- Common misconception addressed: Treating distributed resources as invisible to the grid operator
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Integrating rooftop solar, EVs and storage | 120 | 7 |
| M04L02 | Managing variability, congestion and curtailment | 120 | 7 |

## Integrative case

A distribution operator faces voltage problems on a feeder with heavy rooftop solar and growing EV charging: explain the balancing and voltage issues, propose smart-grid metering and demand-response measures, and decide where storage or curtailment is justified.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; 40 items / 40 minutes is a Mastemy design choice for a focused skills final.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2363-final-protected | 40 | 40 | yes |
| MST-2363-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Grid structure | 10 |
| Balancing and stability | 10 |
| Smart-grid technology | 10 |
| Distributed and variable resources | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2363-Q0001** (single-answer, Select ONE) Why must electricity supply and demand be balanced continuously on the grid?

- A. The grid stores almost no energy, so imbalance shows up instantly as a frequency deviation **(key)**  
  _Rationale:_ Without large inherent storage, any mismatch changes system frequency immediately.
- B. Because wires hold a day's worth of electricity as a buffer  
  _Rationale:_ Transmission lines store negligible energy.
- C. Because consumers are billed only once per year  
  _Rationale:_ Billing frequency is unrelated to real-time balancing.
- D. Because voltage is irrelevant to stability  
  _Rationale:_ Voltage and frequency are both central to stability.

**MST-2363-Q0002** (multiple-answer, Select TWO) Which TWO are examples of grid flexibility or ancillary services? (Select TWO.)

- A. Demand response that shifts EV charging away from the peak **(key)**  
  _Rationale:_ Demand response is a recognised flexibility service.
- B. Fast frequency response from batteries **(key)**  
  _Rationale:_ Batteries providing frequency response is an ancillary service.
- C. Painting substations a lighter colour  
  _Rationale:_ Cosmetic changes provide no grid service.
- D. Printing more electricity bills  
  _Rationale:_ Billing volume provides no flexibility.

**MST-2363-Q0003** (single-answer, Select ONE) A feeder with many rooftop solar homes shows voltage rising above limits at midday. What is the most likely cause?

- A. Reverse power flow from local solar export pushing voltage up **(key)**  
  _Rationale:_ Exported solar can raise local voltage beyond limits at times of low demand.
- B. Everyone switching on electric heaters at midday  
  _Rationale:_ Heating load would lower, not raise, voltage and is unlikely at midday.
- C. The substation being switched off  
  _Rationale:_ That would cause an outage, not a voltage rise.
- D. Smart meters generating electricity  
  _Rationale:_ Meters measure, they do not generate power.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
