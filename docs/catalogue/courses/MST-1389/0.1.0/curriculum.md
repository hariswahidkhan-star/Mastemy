# AI in Logistics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1389` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-AI-SK-AL-001 |
| Planned time | T = 480 min; instruction I = 384 min (80%); assessment A = 96 min (20%) |
| Assessment split | lesson checks 24 / module checks 34 / cumulative 38 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe where AI applies across the logistics and supply-chain lifecycle
2. Explain AI-driven demand forecasting and inventory optimisation
3. Explain AI-driven route, fleet and warehouse optimisation
4. Assess the risks, data needs and ROI of AI logistics projects

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 AI across the supply chain (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build an AI opportunity map across a distributor's logistics lifecycle; (2) Audit what data a logistics AI use case would need
- Common misconception addressed: Thinking AI replaces the supply chain rather than augmenting decisions in it
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The logistics lifecycle and AI opportunity map | 48 | 6 |
| M01L02 | Data foundations for logistics AI | 48 | 6 |
### M02 Demand forecasting and inventory (MASTEMY-DESIGN 25%)

- Worked applications: (1) Interpret a demand forecast with its error band for ordering; (2) Set reorder points using an AI inventory recommendation
- Common misconception addressed: Treating a forecast as a fact instead of a probability with error
- Module check: 9 items / 9 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | AI demand forecasting | 48 | 6 |
| M02L02 | Inventory and replenishment optimisation | 48 | 6 |
### M03 Movement and warehouse optimisation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Compare route plans on cost, time and service level; (2) Identify warehouse tasks suited to automation and robotics
- Common misconception addressed: Assuming the shortest route is always the lowest-cost route
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Route and fleet optimisation | 48 | 6 |
| M03L02 | Warehouse automation and robotics | 48 | 6 |
### M04 Risk, feasibility and value (MASTEMY-DESIGN 25%)

- Worked applications: (1) Assess disruption and resilience risks for an AI routing rollout; (2) Build a simple ROI case for an AI logistics pilot
- Common misconception addressed: Launching an AI logistics project without a baseline to measure against
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Risk, disruption and resilience | 48 | 6 |
| M04L02 | Feasibility, ROI and adoption | 48 | 6 |

## Integrative case

A regional distributor wants to cut late deliveries and stockouts. Map where AI fits across its supply chain, choose a forecasting and a routing use case, assess data readiness and risk, and recommend one project with an ROI case.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1389-final-protected | 20 | 20 | yes |
| MST-1389-final-alternate | 20 | 20 | no (optional practice) |

| Domain | Items per form |
|---|---|
| AI across the supply chain | 5 |
| Demand forecasting and inventory | 5 |
| Movement and warehouse optimisation | 5 |
| Risk, feasibility and value | 5 |

Minimum reviewed item bank: 204 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-1389-Q0001** (single-answer, Select ONE) Where does AI add the most value in a logistics lifecycle?

- A. By physically moving goods instead of vehicles  
  _Rationale:_ AI does not move goods; it informs decisions.
- B. By improving decisions like forecasting, routing and inventory **(key)**  
  _Rationale:_ Correct: these decision points are where AI adds value.
- C. By eliminating the need for any data  
  _Rationale:_ AI depends on data, it does not remove the need for it.
- D. By removing all human oversight  
  _Rationale:_ Human oversight remains essential.

**MST-1389-Q0002** (multiple-answer, Select TWO) Which TWO are good uses of an AI demand forecast? (Select TWO.)

- A. Setting reorder points with a safety-stock buffer **(key)**  
  _Rationale:_ Correct: the forecast plus its error informs reorder points.
- B. Treating the forecast as a guaranteed exact number  
  _Rationale:_ Forecasts carry error; they are not guarantees.
- C. Planning warehouse and transport capacity **(key)**  
  _Rationale:_ Correct: capacity planning is a sound use of forecasts.
- D. Ignoring seasonality because AI handles everything  
  _Rationale:_ Seasonality still matters and must be considered.

**MST-1389-Q0003** (single-answer, Select ONE) A routing model returns the shortest-distance route. Why might it not be the best choice?

- A. Shortest distance can still miss time windows, cost or service targets **(key)**  
  _Rationale:_ Correct: cost and service, not just distance, decide the best route.
- B. Distance is never relevant to routing  
  _Rationale:_ Distance is relevant, just not the only factor.
- C. Shortest routes always break the law  
  _Rationale:_ Shortest routes are not inherently illegal.
- D. AI cannot compute distances  
  _Rationale:_ AI can compute distances; that is not the issue.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
