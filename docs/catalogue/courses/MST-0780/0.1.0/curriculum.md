# Amazon Advertising: Sponsored Campaign Planning and Measurement

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0780` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on Amazon Web Services (AWS) product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product features, versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AMZN-ADS (https://advertising.amazon.com/API/docs/en-us/; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Amazon Advertising: Sponsored Campaign Planning and Measurement (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Amazon Ads campaign types and where each fits
2. Structure campaigns, ad groups, targeting and bids
3. Plan budgets and bidding strategies toward goals
4. Measure performance with ACOS, ROAS and attribution
5. Optimize campaigns with search-term and placement data
6. Report results and respect data and API practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Campaign types and structure (MASTEMY-DESIGN 25%)

- Worked applications: (1) Choose a campaign type for a stated goal; (2) Structure ad groups with keyword and product targets
- Common misconception addressed: Putting unrelated products in one ad group and losing control of relevance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Sponsored Products, Brands and Display | 120 | 5 |
| M01L02 | Campaigns, ad groups and targeting | 120 | 5 |

### M02 Budgets and bidding (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set a daily budget and bidding strategy toward a goal; (2) Apply placement bid adjustments
- Common misconception addressed: Bidding the same on every placement regardless of performance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Budgets and pacing | 120 | 5 |
| M02L02 | Bidding strategies and adjustments | 120 | 5 |

### M03 Measurement (MASTEMY-DESIGN 25%)

- Worked applications: (1) Compute ACOS and ROAS from spend and sales; (2) Interpret attributed conversions within a window
- Common misconception addressed: Confusing ACOS and ROAS or ignoring the attribution window
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | ACOS, ROAS and spend metrics | 120 | 5 |
| M03L02 | Attribution and conversion windows | 120 | 5 |

### M04 Optimization and reporting (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add negative keywords from a search-term report; (2) Build a performance report for stakeholders
- Common misconception addressed: Pausing campaigns on one bad day instead of reading the trend
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Search-term and placement optimization | 120 | 5 |
| M04L02 | Reporting, data practices and API basics | 120 | 5 |

## Integrative case

Plan and measure a Sponsored Products program for a product line: structure campaigns and ad groups with keyword and product targeting, set budgets and a bidding strategy toward a target ACOS, measure ROAS and attribution, optimize from search-term reports, and report results to stakeholders.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0780-final-protected | 40 | 50 | yes |
| MST-0780-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Campaign types and structure | 10 |
| Budgets and bidding | 10 |
| Measurement | 10 |
| Optimization and reporting | 10 |

Minimum reviewed item bank: 328 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0780-Q0001** (single-answer, Select ONE) A campaign spends $200 and produces $800 in attributed sales. What is its ACOS?

- A. 25% **(key)**  
  _Rationale:_ Correct: ACOS = spend / sales = 200 / 800 = 25%.
- B. 400%  
  _Rationale:_ That is ROAS expressed as a percentage, not ACOS.
- C. 4%  
  _Rationale:_ This misplaces the decimal; 200/800 is 25%, not 4%.
- D. 75%  
  _Rationale:_ 75% does not follow from 200/800.

**MST-0780-Q0002** (multiple-answer, Select TWO) Which TWO actions use a search-term report to improve Sponsored Products results? (Select TWO.)

- A. Add irrelevant, non-converting terms as negative keywords **(key)**  
  _Rationale:_ Correct: negatives stop wasted spend on irrelevant searches.
- B. Promote high-converting search terms into targeted keywords **(key)**  
  _Rationale:_ Correct: targeting proven terms focuses budget where it converts.
- C. Delete all reports to simplify the account  
  _Rationale:_ Reports are the basis for optimization.
- D. Raise every bid equally regardless of term performance  
  _Rationale:_ Uniform bid increases ignore the report's signal.

**MST-0780-Q0003** (single-answer, Select ONE) A seller wants to drive discovery of new products with keyword-targeted ads on the search results page. Which campaign type is the typical starting point?

- A. Sponsored Products **(key)**  
  _Rationale:_ Correct: Sponsored Products is the common starting point for keyword-targeted product ads.
- B. A payroll report  
  _Rationale:_ That is not an advertising product.
- C. An IAM policy  
  _Rationale:_ IAM policies are access control, not ad campaigns.
- D. A billing budget alert  
  _Rationale:_ Budget alerts track cost but are not a campaign type.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
