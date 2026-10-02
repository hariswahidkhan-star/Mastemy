# ChatGPT + Shopify + GA4: Ecommerce Performance Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0813` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — ChatGPT + Shopify + GA4: Ecommerce Performance Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope an ecommerce performance analysis with the right metrics
2. Extract and validate Shopify store data
3. Analyse behaviour and attribution in GA4
4. Use ChatGPT to form and verify hypotheses
5. Report findings and prioritised actions with caveats

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Ecommerce analysis scope (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define the KPIs for a store performance review; (2) List what Shopify and GA4 each can and cannot tell you
- Common misconception addressed: Reading a single metric without its segment or context
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Questions, metrics and segments | 120 | 7 |
| M01L02 | Data sources and their limits | 120 | 7 |

### M02 Shopify data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Export an orders report and validate its totals; (2) Segment sales by product and channel
- Common misconception addressed: Assuming a Shopify export matches GA4 exactly
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Orders, products and reports | 120 | 7 |
| M02L02 | Exporting and validating store data | 120 | 7 |

### M03 GA4 behaviour data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Build a GA4 exploration for the purchase funnel; (2) Compare attribution across channels
- Common misconception addressed: Treating GA4 sessions and Shopify orders as the same count
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Events, sessions and conversions | 120 | 7 |
| M03L02 | Exploration reports and attribution | 120 | 7 |

### M04 ChatGPT-assisted interpretation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Ask ChatGPT to propose causes for a conversion drop; (2) Check each proposed cause against the actual figures
- Common misconception addressed: Presenting an AI hypothesis as a proven finding
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Turning data into hypotheses | 120 | 7 |
| M04L02 | Verifying claims against the data | 120 | 7 |

### M05 Reporting and action (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assemble a one-page performance summary with caveats; (2) Prioritise recommended actions by expected impact
- Common misconception addressed: Recommending actions without stating the data's limitations
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Dashboards and narratives | 120 | 7 |
| M05L02 | Recommendations and caveats | 120 | 7 |

## Integrative case

Analyse a store's performance: pull and validate a Shopify orders report, build a GA4 purchase-funnel exploration, reconcile the two sources' different counts, use ChatGPT to hypothesise causes of a conversion drop, verify each against the data, and deliver a one-page summary with prioritised actions and caveats.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0813-final-protected | 40 | 50 | yes |
| MST-0813-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Ecommerce analysis scope | 8 |
| Shopify data | 8 |
| GA4 behaviour data | 8 |
| ChatGPT-assisted interpretation | 8 |
| Reporting and action | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0813-Q0001** (single-answer, Select ONE) Shopify order count and GA4 purchase count differ for the same week. What is the correct interpretation?

- A. The two systems measure differently, so differences are expected and must be reconciled **(key)**  
  _Rationale:_ Correct: GA4 event tracking and Shopify order records use different definitions.
- B. One system is simply broken  
  _Rationale:_ A difference usually reflects measurement, not a broken system.
- C. The numbers should always match exactly  
  _Rationale:_ Exact agreement is not expected across these tools.
- D. GA4 is always the source of truth for revenue  
  _Rationale:_ Shopify order records are the authoritative sales record.

**MST-0813-Q0002** (multiple-answer, Select TWO) Which TWO practices keep an ecommerce performance report honest? (Select TWO.)

- A. State the limitations of the data behind each finding **(key)**  
  _Rationale:_ Correct: caveats stop readers over-interpreting the numbers.
- B. Verify AI-suggested causes against the actual figures **(key)**  
  _Rationale:_ Correct: verification separates hypotheses from findings.
- C. Present a hypothesis as a proven cause  
  _Rationale:_ Unverified hypotheses are not findings.
- D. Report one metric with no segmentation  
  _Rationale:_ Unsegmented single metrics mislead.

**MST-0813-Q0003** (single-answer, Select ONE) Why validate a Shopify orders export's totals before analysis?

- A. To ensure the export is complete and matches the store records **(key)**  
  _Rationale:_ Correct: validating totals catches partial or filtered exports.
- B. Because exports are always wrong  
  _Rationale:_ Exports are not always wrong; validation confirms them.
- C. Because GA4 requires it  
  _Rationale:_ Validation is about data integrity, not a GA4 requirement.
- D. Because it encrypts the file  
  _Rationale:_ Validation does not encrypt anything.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
