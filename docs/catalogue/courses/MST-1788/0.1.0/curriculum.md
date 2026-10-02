# Transportation Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1788` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-TM-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Transportation Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Transportation fundamentals
2. Freight and carrier management
3. Routing and network design
4. Fleet and capacity
5. Transport performance and compliance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate dispatching a live fleet; hands-on practice belongs in a TMS or on the road.

## Modules

### M01 Transportation fundamentals (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compare modes on cost, speed and reach; (2) Design an intermodal movement
- Common misconception addressed: Assuming one mode is always best regardless of context
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Role of transport in the supply chain | 96 | 8 |
| M01L02 | Modes and intermodal transport | 96 | 8 |

### M02 Freight and carrier management (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Interpret an Incoterm to assign responsibility; (2) Select a carrier against criteria
- Common misconception addressed: Misreading Incoterms and mis-assigning cost or risk
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Carrier selection and contracts | 96 | 8 |
| M02L02 | Freight rates and Incoterms | 96 | 8 |

### M03 Routing and network design (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a multi-stop route to cut distance; (2) Choose a network shape for a demand pattern
- Common misconception addressed: Optimising individual routes while ignoring the network as a whole
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Route planning and optimisation | 96 | 8 |
| M03L02 | Hub-and-spoke vs point-to-point | 96 | 8 |

### M04 Fleet and capacity (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Consolidate shipments to raise utilisation; (2) Size a fleet to a demand profile
- Common misconception addressed: Running half-empty vehicles to keep delivery frequency up
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Fleet sizing and utilisation | 96 | 8 |
| M04L02 | Load planning and consolidation | 96 | 8 |

### M05 Transport performance and compliance (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Build a cost-to-serve view for a lane; (2) Flag a hours-of-service compliance risk
- Common misconception addressed: Chasing on-time delivery while ignoring cost-to-serve
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | KPIs and cost-to-serve | 96 | 8 |
| M05L02 | Safety, hours and regulation | 96 | 8 |

## Integrative case

A distributor's transport costs are rising and vehicles run half-empty. The learner must choose modes and carriers, interpret Incoterms, redesign routes and the network, consolidate loads to raise utilisation, and track cost-to-serve and compliance, then recommend a transport plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1788-final-protected | 25 | 25 | yes |
| MST-1788-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Transportation fundamentals | 5 |
| Freight and carrier management | 5 |
| Routing and network design | 5 |
| Fleet and capacity | 5 |
| Transport performance and compliance | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1788-Q0001** (single-answer, Select ONE) Incoterms primarily define:

- A. Who bears cost and risk at each point of an international shipment **(key)**  
  _Rationale:_ Correct: Incoterms allocate responsibility, cost and risk between buyer and seller.
- B. The price of the goods being shipped  
  _Rationale:_ Incoterms govern responsibility, not the price.
- C. The carrier's internal routing software  
  _Rationale:_ Incoterms are not software.
- D. The language the contract is written in  
  _Rationale:_ Incoterms are independent of contract language.

**MST-1788-Q0002** (multiple-answer, Select TWO) Which TWO raise vehicle utilisation? (Select TWO.)

- A. Consolidating multiple small shipments into one load **(key)**  
  _Rationale:_ Correct: consolidation fills capacity and cuts trips.
- B. Planning backhauls so vehicles are not empty on return **(key)**  
  _Rationale:_ Correct: backhauls use otherwise wasted return capacity.
- C. Dispatching every order immediately in its own vehicle  
  _Rationale:_ Single-order dispatch lowers utilisation.
- D. Reducing the size of the fleet without changing demand  
  _Rationale:_ Shrinking the fleet alone does not raise utilisation of remaining vehicles.

**MST-1788-Q0003** (single-answer, Select ONE) A hub-and-spoke network is typically chosen to:

- A. Consolidate flows through hubs to gain economies of scale **(key)**  
  _Rationale:_ Correct: hubs aggregate volume, lowering per-unit cost at the expense of some directness.
- B. Guarantee the shortest possible distance for every shipment  
  _Rationale:_ Hub routing can add distance versus point-to-point.
- C. Eliminate the need for any warehouses  
  _Rationale:_ Hubs are facilities, not the absence of them.
- D. Avoid using any carriers  
  _Rationale:_ Networks still require carriers.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
