# Excel Inventory, Procurement, and Stock Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0642` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Excel feature facts (XLOOKUP, tables, PivotTables, dynamic arrays) grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02; inventory and procurement methods (reorder point, safety stock, ABC analysis, inventory turnover) are standard operations techniques applied in Excel. Function availability varies by Excel channel; confirm against the current build before production. |
| Official sources | https://support.microsoft.com/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929; https://support.microsoft.com/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576 |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-INVENTORY |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — Excel Inventory, Procurement, and Stock Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model inventory position from transaction data
2. Calculate reorder points and safety stock
3. Perform ABC classification and stock valuation
4. Compute inventory turnover and days-of-stock KPIs
5. Build a procurement and stock dashboard

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Inventory data models (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build an item master and pull descriptions with XLOOKUP; (2) Compute running stock-on-hand from a transactions table
- Common misconception addressed: Keeping stock-on-hand as a single typed number instead of deriving it from transactions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Item master and transaction tables | 80 | 5 |
| M01L02 | Structured tables and XLOOKUP | 80 | 5 |
| M01L03 | Stock-on-hand calculations | 80 | 5 |

### M02 Reorder points and safety stock (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compute a reorder point as demand over lead time plus safety stock; (2) Model safety stock from demand variability and a service level
- Common misconception addressed: Setting reorder points from average demand only, ignoring lead-time variability
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lead time and demand | 80 | 5 |
| M02L02 | Reorder point formulas | 80 | 5 |
| M02L03 | Safety stock and service levels | 80 | 5 |

### M03 ABC analysis and valuation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Classify SKUs into A/B/C bands by cumulative value; (2) Compute inventory turnover and days-of-stock
- Common misconception addressed: Treating all SKUs equally rather than prioritising high-value A items
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pareto and ABC classification | 80 | 5 |
| M03L02 | FIFO and weighted-average valuation | 80 | 5 |
| M03L03 | Inventory turnover and days of stock | 80 | 5 |

### M04 Procurement dashboards (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a spend-by-supplier PivotTable; (2) Assemble a stockout and overstock KPI panel
- Common misconception addressed: Reporting total spend without splitting it by supplier or category
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Supplier and purchase-order tracking | 80 | 5 |
| M04L02 | PivotTables for spend analysis | 80 | 5 |
| M04L03 | Stock KPI dashboard | 80 | 5 |

## Integrative case

An operations analyst for a distributor builds a stock-control workbook: derive on-hand quantities from transactions, set reorder points with safety stock, classify SKUs by ABC value, and present turnover and stockout KPIs to purchasing.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0642-final-protected | 30 | 40 | yes |
| MST-0642-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Inventory data models | 8 |
| Reorder points and safety stock | 8 |
| ABC analysis and valuation | 7 |
| Procurement dashboards | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0642-Q0001** (single-answer, Select ONE) You want to pull an item description into a transactions table from an item master, returning blank when no match is found. Which approach is most robust in current Excel?

- A. XLOOKUP with an 'if not found' argument **(key)**  
  _Rationale:_ Correct: XLOOKUP has a built-in if-not-found argument and does not depend on column position.
- B. VLOOKUP with the item column to the right of the key  
  _Rationale:_ VLOOKUP cannot look to the left of the key and has no native not-found argument.
- C. A manual copy-paste of descriptions  
  _Rationale:_ Manual copying breaks as data changes.
- D. Hard-coding descriptions in the transaction rows  
  _Rationale:_ Hard-coding duplicates data and cannot be maintained.

**MST-0642-Q0002** (multiple-answer, Select TWO) Which TWO quantities does a classic reorder point depend on? (Select TWO.)

- A. Demand during the lead time **(key)**  
  _Rationale:_ Correct: the reorder point covers expected demand over the lead time.
- B. Safety stock **(key)**  
  _Rationale:_ Correct: safety stock buffers demand and lead-time variability.
- C. The supplier's invoice number  
  _Rationale:_ An invoice number is reference data, not a reorder input.
- D. The colour of the product label  
  _Rationale:_ Label colour is irrelevant to reorder calculation.

**MST-0642-Q0003** (single-answer, Select ONE) In ABC analysis, what characterises 'A' items?

- A. A small number of SKUs accounting for a large share of value **(key)**  
  _Rationale:_ Correct: A items are the vital few that drive most of the value.
- B. The cheapest items by unit cost  
  _Rationale:_ ABC ranks by total value contribution, not unit cost.
- C. Items with the longest supplier lead time  
  _Rationale:_ Lead time is not the ABC criterion.
- D. Items stored at the back of the warehouse  
  _Rationale:_ Physical location is not the ABC criterion.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
