# ASCM APICS Certified in Planning and Inventory Management: CPIM

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0303` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | ASCM (no affiliation or endorsement) |
| Exam code | CPIM |
| Version basis | unresolved |
| Evidence | **unverified-needs-official-check** - egress to the official site was blocked this session; groupings/weights are design assumptions |
| Legacy IDs | MST-ENG-ASCM-CPIM-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply supply-chain strategy, demand management and S&OP concepts
2. Analyse master scheduling, MRP and inventory decisions
3. Evaluate capacity, lean and distribution execution choices
4. Integrate planning knowledge across the plan-source-make-deliver flow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Supply chain and demand strategy (design-assumption grouping) (DESIGN ASSUMPTION weight)

- Worked applications: (1) Reconcile a demand forecast with a constrained supply plan in S&OP; (2) Select a forecasting method for a seasonal product
- Common misconception addressed: Confusing forecasting accuracy with demand-plan agreement
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Supply chain strategy and alignment | 240 | 15 |
| M01L02 | Demand management and forecasting | 240 | 15 |
| M01L03 | Sales and operations planning (S&OP) | 240 | 15 |

### M02 Planning and inventory (design-assumption grouping) (DESIGN ASSUMPTION weight)

- Worked applications: (1) Explode an MRP from a bill of materials and lead times; (2) Set a safety-stock level for a given service target
- Common misconception addressed: Treating MRP output as firm orders rather than planned orders
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Master scheduling and MPS | 240 | 15 |
| M02L02 | Material requirements planning (MRP) | 240 | 15 |
| M02L03 | Inventory management and safety stock | 240 | 15 |

### M03 Execution and continuous improvement (design-assumption grouping) (DESIGN ASSUMPTION weight)

- Worked applications: (1) Balance a work-centre load against available capacity; (2) Choose a KPI set for a plant's inventory performance
- Common misconception addressed: Assuming higher capacity utilisation always lowers cost
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Capacity management and scheduling | 240 | 15 |
| M03L02 | Lean, quality and continuous improvement | 240 | 15 |
| M03L03 | Distribution and performance measurement | 240 | 15 |

## Integrative case

A mid-size electronics plant has a seasonal demand spike, a constrained bottleneck work-centre, and rising inventory holding cost: build an integrated S&OP, master schedule and inventory plan that hits the service target at lowest cost.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official outline was not read this session; question count and duration are Mastemy design assumptions, confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0303-practice-form-A | 72 | 72 | yes |
| MST-0303-practice-form-B | 72 | 72 | no (optional practice) |
| MST-0303-practice-form-C | 72 | 72 | no (optional practice) |
| MST-0303-final-protected | 72 | 72 | yes |

| Domain (DESIGN ASSUMPTION grouping) | Items per form |
|---|---|
| Supply chain and demand strategy (design-assumption grouping) | 24 |
| Planning and inventory (design-assumption grouping) | 24 |
| Execution and continuous improvement (design-assumption grouping) | 24 |

Minimum reviewed item bank: 936 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0303-Q0001** (single-answer, Select ONE) An item has a gross requirement of 100, on-hand 30 and no scheduled receipts. What is the net requirement before lot sizing?

- A. 70 **(key)**  
  _Rationale:_ Correct: net requirement = gross (100) - on-hand (30) - scheduled receipts (0) = 70.
- B. 100  
  _Rationale:_ That ignores the 30 on-hand units.
- C. 130  
  _Rationale:_ On-hand is subtracted, not added.
- D. 30  
  _Rationale:_ 30 is the on-hand balance, not the net requirement.

**MST-0303-Q0002** (single-answer, Select ONE) The primary purpose of sales and operations planning (S&OP) is to:

- A. Align demand and supply plans across functions at an aggregate level **(key)**  
  _Rationale:_ Correct: S&OP aligns demand and supply across functions at an aggregate, medium-term level.
- B. Schedule individual machines by the hour  
  _Rationale:_ That is detailed scheduling, below the S&OP horizon.
- C. Set the general-ledger budget  
  _Rationale:_ S&OP informs but is not the accounting budget process.
- D. Pick carton sizes for shipping  
  _Rationale:_ Packaging is an execution detail, not S&OP's purpose.

**MST-0303-Q0003** (multiple-answer, Select TWO) A plant wants to reduce finished-goods inventory without hurting service. Select TWO actions consistent with lean inventory practice.

- A. Reduce replenishment lot sizes and setup times **(key)**  
  _Rationale:_ Correct: smaller lots with faster setups cut average inventory while protecting flow.
- B. Improve forecast accuracy to lower required safety stock **(key)**  
  _Rationale:_ Correct: better forecasts reduce the safety stock needed for a given service level.
- C. Increase batch sizes to gain economies of scale  
  _Rationale:_ Larger batches raise average inventory, the opposite of the goal.
- D. Add a second safety-stock buffer at every node  
  _Rationale:_ Extra buffers everywhere increase inventory.
- E. Lengthen supplier lead times to smooth ordering  
  _Rationale:_ Longer lead times require more, not less, inventory.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
