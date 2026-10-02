# Excel Sales and Customer-Profitability Analytics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0644` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Excel feature facts (XLOOKUP, dynamic-array functions SORT and FILTER, PivotTables and slicers) grounded in official Microsoft Excel documentation read via the Microsoft Learn MCP on 2026-10-02; sales and customer-profitability methods (contribution margin, Pareto, segmentation) are standard commercial-analytics techniques applied in Excel. Confirm feature availability against the current build before production. |
| Official sources | https://support.microsoft.com/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929; https://support.microsoft.com/office/sort-function-22f63bd0-ccc8-492f-953d-c20e8e44b86c |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-SALES |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — Excel Sales and Customer-Profitability Analytics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Model sales data with dimensions and measures
2. Compute customer profitability and contribution
3. Segment customers for commercial decisions
4. Analyse sales with Pareto and top-N techniques
5. Build an executive sales dashboard

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Sales data modelling (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Add margin columns to a sales transactions table; (2) Join product cost into sales rows with XLOOKUP
- Common misconception addressed: Mixing revenue and margin without separating the underlying cost drivers
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Transaction and dimension tables | 80 | 5 |
| M01L02 | Joining data with XLOOKUP | 80 | 5 |
| M01L03 | Revenue and margin columns | 80 | 5 |

### M02 Customer profitability (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Compute customer contribution margin after cost-to-serve; (2) Build a simple customer lifetime-value estimate
- Common misconception addressed: Ranking customers on revenue alone rather than on profitability
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Revenue, cost-to-serve and contribution | 80 | 5 |
| M02L02 | Customer lifetime value basics | 80 | 5 |
| M02L03 | Cohort grouping | 80 | 5 |

### M03 Segmentation and Pareto (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build an 80/20 customer Pareto analysis; (2) Rank top customers with SORT and FILTER
- Common misconception addressed: Treating all customers equally rather than segmenting them
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | RFM-style segmentation | 80 | 5 |
| M03L02 | Pareto 80/20 analysis | 80 | 5 |
| M03L03 | Top-N with dynamic arrays | 80 | 5 |

### M04 Sales dashboards (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a sales-trend dashboard with slicers; (2) Add year-on-year variance measures
- Common misconception addressed: Presenting charts without comparison to target or prior period
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Trend and variance charts | 80 | 5 |
| M04L02 | PivotTables and slicers | 80 | 5 |
| M04L03 | Executive sales dashboard | 80 | 5 |

## Integrative case

A commercial analyst builds a sales-performance workbook: margin and contribution by customer, 80/20 segmentation, and a slicer-driven dashboard for the sales director.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0644-final-protected | 30 | 40 | yes |
| MST-0644-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Sales data modelling | 8 |
| Customer profitability | 8 |
| Segmentation and Pareto | 7 |
| Sales dashboards | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0644-Q0001** (single-answer, Select ONE) Which is the better reason to compute margin in a dedicated column rather than inside a chart?

- A. So the figure can be audited, reused and filtered as data **(key)**  
  _Rationale:_ Correct: a calculated column is transparent, reusable and filterable.
- B. Because charts cannot display any calculated value  
  _Rationale:_ Charts can display calculated values; the point is auditability.
- C. Because margin must always be hidden  
  _Rationale:_ Margin need not be hidden.
- D. Because columns are faster than formulas  
  _Rationale:_ A column still uses a formula.

**MST-0644-Q0002** (multiple-answer, Select TWO) Which TWO inputs are needed to compute a customer's contribution margin? (Select TWO.)

- A. Revenue from the customer **(key)**  
  _Rationale:_ Correct: contribution starts from revenue.
- B. Variable cost to serve the customer **(key)**  
  _Rationale:_ Correct: contribution subtracts variable cost-to-serve.
- C. The customer's postal code  
  _Rationale:_ Postal code is not a contribution input.
- D. The salesperson's start date  
  _Rationale:_ Not a contribution input.

**MST-0644-Q0003** (single-answer, Select ONE) A Pareto analysis of customers typically shows that:

- A. A minority of customers generate the majority of value **(key)**  
  _Rationale:_ Correct: the 80/20 pattern concentrates value in a few customers.
- B. All customers contribute equally  
  _Rationale:_ That is the opposite of a Pareto pattern.
- C. Revenue is unrelated to customer count  
  _Rationale:_ Pareto is specifically about concentration.
- D. The newest customers are always the most profitable  
  _Rationale:_ Pareto does not claim anything about recency.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
