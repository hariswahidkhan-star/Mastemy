# AI-Assisted Excel Financial Statement Analysis

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0654` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Excel feature facts (cross-sheet linking, ratio formulas, common-size layouts) and Copilot-in-Excel / Copilot for Finance variance-analysis behaviour grounded in official Microsoft documentation read via the Microsoft Learn MCP on 2026-10-02; financial-statement analysis follows standard accounting methodology; Copilot availability depends on licensing and its narratives must be verified against the source numbers. Confirm Copilot availability against the current build and tenant before production. |
| Official sources | https://learn.microsoft.com/copilot/finance/variance/analyze-variances; https://support.microsoft.com/office/get-started-with-copilot-in-excel-d7110502-0334-4b4f-a175-a73abdfc118a |
| Evidence | **vendor-docs-partial** - official source(s) read via Microsoft Learn MCP on 2026-10-02; sources: SRC-MS-EXCEL-FINSTMT |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 64 / cumulative 116 min |
| Certificate | Mastemy Certificate of Completion — AI-Assisted Excel Financial Statement Analysis (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Build linked financial statements in Excel
2. Compute and interpret financial ratios
3. Use Copilot to assist statement interpretation
4. Identify red flags in the numbers
5. Present a concise financial analysis

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items (single-answer MCQ and multiple-answer selection) cannot demonstrate live tool use, hands-on configuration or writing quality; those are taught through demonstrations and model-answer analysis and are not assessed by this form.

## Modules

### M01 Statement structure (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a linked three-statement skeleton; (2) Tie net income through to retained earnings
- Common misconception addressed: Treating the three statements as independent rather than linked
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Income statement in Excel | 80 | 5 |
| M01L02 | Balance sheet layout | 80 | 5 |
| M01L03 | Cash-flow linkage | 80 | 5 |

### M02 Ratio analysis (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a ratio block (current ratio, return on equity, margins); (2) Common-size the income statement
- Common misconception addressed: Comparing ratios across firms without normalising for size
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Liquidity and solvency ratios | 80 | 5 |
| M02L02 | Profitability and efficiency ratios | 80 | 5 |
| M02L03 | Trend and common-size analysis | 80 | 5 |

### M03 Copilot-assisted interpretation (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Ask Copilot to explain a margin decline; (2) Validate a Copilot variance narrative against the source data
- Common misconception addressed: Publishing Copilot commentary without checking it against the source numbers
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Prompting Copilot to summarise statements | 80 | 5 |
| M03L02 | Copilot variance narratives | 80 | 5 |
| M03L03 | Critical review of AI commentary | 80 | 5 |

### M04 Analysis reporting (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Build a ratio-trend dashboard; (2) Flag deteriorating ratios as red-amber-green
- Common misconception addressed: Listing ratios without interpreting what they mean for decisions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Ratio dashboards | 80 | 5 |
| M04L02 | Red-flag indicators | 80 | 5 |
| M04L03 | One-page analysis memo | 80 | 5 |

## Integrative case

An analyst reviews two years of a company's statements: build a linked model, compute ratios and common-size trends, use Copilot to draft variance commentary, verify it against the numbers, and deliver a one-page analysis memo.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0654-final-protected | 30 | 40 | yes |
| MST-0654-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Statement structure | 8 |
| Ratio analysis | 8 |
| Copilot-assisted interpretation | 7 |
| Analysis reporting | 7 |

Minimum reviewed item bank: 308 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0654-Q0001** (single-answer, Select ONE) Why link the three financial statements rather than build them independently?

- A. Because they share figures (for example net income flows to retained earnings and cash) **(key)**  
  _Rationale:_ Correct: the statements are connected and must reconcile.
- B. Because Excel cannot store three separate sheets  
  _Rationale:_ Excel stores many sheets; this is about integrity.
- C. To make the file smaller  
  _Rationale:_ Linking does not meaningfully change file size.
- D. Because ratios cannot be computed otherwise  
  _Rationale:_ Ratios can be computed either way; linkage is about integrity.

**MST-0654-Q0002** (multiple-answer, Select TWO) Which TWO are liquidity ratios? (Select TWO.)

- A. Current ratio **(key)**  
  _Rationale:_ Correct: the current ratio measures short-term liquidity.
- B. Quick ratio **(key)**  
  _Rationale:_ Correct: the quick ratio is a stricter liquidity measure.
- C. Return on equity  
  _Rationale:_ Return on equity is a profitability ratio.
- D. Inventory colour mix  
  _Rationale:_ Not a financial ratio.

**MST-0654-Q0003** (single-answer, Select ONE) What should you always do before publishing a Copilot-written variance narrative?

- A. Check every claim in it against the underlying numbers **(key)**  
  _Rationale:_ Correct: AI commentary must be verified against the source data.
- B. Delete the source data to save space  
  _Rationale:_ Never delete the source; you need it to verify.
- C. Assume it is correct because it is detailed  
  _Rationale:_ Detail is not evidence of correctness.
- D. Translate it into another language first  
  _Rationale:_ Translation does not verify accuracy.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
