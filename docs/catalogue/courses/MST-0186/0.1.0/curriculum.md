# Microsoft MB-330: Dynamics 365 Supply Chain Management Functional Consultant Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0186` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | MB-330 |
| Version basis | Skills measured as of October 21, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-MB330 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/mb-330) |
| Legacy IDs | MST-MIC-MS-MB330-001 |
| Planned time | T = 1900 min; instruction I = 1520 min (80%); assessment A = 380 min (20%) |
| Assessment split | lesson checks 85 / module checks 175 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Implement product information management' to the depth the official outline requires
2. Apply the objectives of 'Implement inventory and asset management' to the depth the official outline requires
3. Apply the objectives of 'Implement and manage supply chain processes' to the depth the official outline requires
4. Apply the objectives of 'Implement warehouse management and transportation management' to the depth the official outline requires
5. Apply the objectives of 'Implement master planning' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Implement product information management (25–30%)

- Worked applications: (1) Release a product and configure inventory dimension groups; (2) Configure item model groups and reservation hierarchies
- Common misconception addressed: Confusing a product master with a released product
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Create and manage products | 90 | 6 |
| M01L02 | Configure prerequisites for products | 90 | 6 |
| M01L03 | Configure additional product details | 90 | 6 |
| M01L04 | Manage inventory pricing and costing | 90 | 6 |

### M02 Implement inventory and asset management (20–25%)

- Worked applications: (1) Process an inventory counting journal; (2) Configure a quality association and nonconformance
- Common misconception addressed: Treating a quarantine order and a quality order as the same process
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Manage and process inventory activities | 90 | 6 |
| M02L02 | Manage quality | 90 | 6 |
| M02L03 | Configure asset management | 90 | 6 |
| M02L04 | Implement asset management | 89 | 6 |

### M03 Implement and manage supply chain processes (15–20%)

- Worked applications: (1) Create a purchase agreement and vendor rebate; (2) Configure landed cost with a voyage
- Common misconception addressed: Assuming a trade agreement and a purchase agreement are identical
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Implement procurement and sourcing | 89 | 6 |
| M03L02 | Implement landed cost | 89 | 6 |
| M03L03 | Implement common sales and marketing features | 89 | 6 |

### M04 Implement warehouse management and transportation management (20–25%)

- Worked applications: (1) Configure location directives and work templates; (2) Process outbound work with the Warehouse Management mobile app
- Common misconception addressed: Confusing a wave template with a work template
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Configure warehouse management | 89 | 6 |
| M04L02 | Perform warehouse management processes | 89 | 6 |
| M04L03 | Implement transportation management | 89 | 6 |
| M04L04 | Implement the Warehouse Management mobile app | 89 | 6 |

### M05 Implement master planning (10–15%)

- Worked applications: (1) Set up coverage groups and item coverage; (2) Run Planning Optimization and process planned orders
- Common misconception addressed: Expecting positive/negative days to behave like time fences
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Configure master planning | 89 | 6 |
| M05L02 | Manage master plans | 89 | 6 |

## Integrative case

A distributor implements Dynamics 365 Supply Chain Management. Design the configuration: product information and inventory dimensions, inventory/quality/asset management, procurement with landed cost, advanced warehousing with the mobile app, and master planning with Planning Optimization; justify the design to the operations lead.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0186-practice-form-A | 45 | 45 | yes |
| MST-0186-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0186-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0186-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Implement product information management | 12 |
| Implement inventory and asset management | 10 |
| Implement and manage supply chain processes | 8 |
| Implement warehouse management and transportation management | 10 |
| Implement master planning | 5 |

Minimum reviewed item bank: 734 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0186-Q0001** (single-answer, Select ONE) Which configuration determines whether an item is tracked by batch and/or serial number in Dynamics 365 Supply Chain Management?

- A. Tracking dimension group **(key)**  
  _Rationale:_ Correct: the tracking dimension group controls batch and serial tracking.
- B. A costing version  
  _Rationale:_ Costing versions hold standard/planned costs, not tracking behaviour.
- C. A coverage group  
  _Rationale:_ Coverage groups drive master planning, not item tracking.
- D. A wave template  
  _Rationale:_ Wave templates drive warehouse wave processing, not item tracking.

**MST-0186-Q0002** (single-answer, Select ONE) You must capture freight, insurance, and customs charges and apportion them to inbound inventory cost. Which feature do you implement?

- A. Landed cost with voyages **(key)**  
  _Rationale:_ Correct: landed cost tracks inbound charges and apportions them to inventory cost.
- B. A trade agreement  
  _Rationale:_ Trade agreements set prices/discounts, not inbound cost apportionment.
- C. A quality association  
  _Rationale:_ Quality associations trigger inspections, not cost apportionment.
- D. A coverage group  
  _Rationale:_ Coverage groups drive planning, not landed cost.

**MST-0186-Q0003** (multiple-answer, Select TWO) Which TWO are configured to direct where warehouse work puts away or picks inventory? (Select TWO.)

- A. Location directives **(key)**  
  _Rationale:_ Correct: location directives determine source/target locations for work.
- B. Work templates **(key)**  
  _Rationale:_ Correct: work templates define the work created for an inbound/outbound process.
- C. A costing version  
  _Rationale:_ Costing versions store costs, not warehouse work direction.
- D. A budget model  
  _Rationale:_ Budget models belong to finance budgeting, not warehousing.
- E. A sales tax group  
  _Rationale:_ Sales tax groups handle tax, not warehouse work.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
