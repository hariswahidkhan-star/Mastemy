# Discounted-Cash-Flow and Three-Statement Modeling in Excel

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2659` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Microsoft Excel and AI product features change often; this spec teaches durable concepts and must have product specifics re-verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Discounted-Cash-Flow and Three-Statement Modeling in Excel (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply financial-modelling best practice: clear inputs, calculations and outputs separated
2. Build the three linked statements (income statement, balance sheet, cash flow) that balance
3. Drive a model from documented assumptions and avoid hard-coded numbers in formulas
4. Build scenarios and sensitivities with data tables, scenario inputs and toggles
5. Use core finance functions NPV, IRR, PMT and XNPV correctly, mindful of their assumptions
6. Check and audit a model for integrity: balance checks, error flags and consistent signs

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Model structure and discipline (25% (design weight), design weight)

- Worked applications: (1) Separate a blue-input assumptions block from black calculation formulas; (2) Replace a hard-coded growth rate buried in a formula with a referenced input cell
- Common misconception addressed: Typing constants into formulas so assumptions cannot be changed in one place
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Inputs, calculations and outputs separation | 120 | 7 |
| M01L02 | Formatting conventions and no hard-coding | 120 | 7 |

### M02 The three statements (25% (design weight), design weight)

- Worked applications: (1) Link net income into retained earnings so the balance sheet balances; (2) Build a cash-flow statement that reconciles to the change in cash
- Common misconception addressed: Plugging a number to force the balance sheet to balance
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Income statement and balance sheet | 120 | 7 |
| M02L02 | Linking to a cash-flow statement that balances | 120 | 7 |

### M03 Assumptions and scenarios (25% (design weight), design weight)

- Worked applications: (1) Create a one-way data table showing NPV across discount rates; (2) Add a scenario toggle to switch between base, upside and downside cases
- Common misconception addressed: Changing many cells by hand for each scenario instead of a single switch
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Assumption drivers and switches | 120 | 7 |
| M03L02 | Scenario manager and data-table sensitivities | 120 | 7 |

### M04 Finance functions and integrity (25% (design weight), design weight)

- Worked applications: (1) Use XNPV with actual dates rather than NPV assuming equal periods; (2) Add a balance check row that flags red when assets do not equal liabilities plus equity
- Common misconception addressed: Trusting IRR without noticing multiple sign changes can give misleading results
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | NPV, XNPV, IRR and PMT | 120 | 7 |
| M04L02 | Balance checks, error flags and auditing | 120 | 7 |

## Integrative case

An analyst builds a three-statement model for a new product line: they separate inputs from calculations, link the statements so the balance sheet balances, add base/upside/downside scenario toggles and an NPV sensitivity table, and include balance checks before the model informs an investment decision.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - no official syllabus; form length is a Mastemy design choice.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2659-final-protected | 40 | 40 | yes |
| MST-2659-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Model structure and discipline | 10 |
| The three statements | 10 |
| Assumptions and scenarios | 10 |
| Finance functions and integrity | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2659-Q0001** (single-answer, Select ONE) Why should assumptions be placed in dedicated input cells rather than typed inside formulas?

- A. So every assumption can be seen, changed and audited in one place **(key)**  
  _Rationale:_ Correct: separating inputs keeps the model transparent and easy to update and review.
- B. Because Excel cannot calculate with constants in formulas  
  _Rationale:_ Excel can; the issue is maintainability and auditability, not capability.
- C. To make the file smaller  
  _Rationale:_ File size is not the reason.
- D. Because formulas cannot reference other cells  
  _Rationale:_ Formulas reference cells all the time.

**MST-2659-Q0002** (multiple-answer, Select TWO) Which TWO checks help confirm a three-statement model's integrity? (Select TWO.)

- A. A balance check that assets equal liabilities plus equity **(key)**  
  _Rationale:_ Correct: the balance sheet must balance in every period.
- B. Cash on the balance sheet ties to the cash-flow statement's ending cash **(key)**  
  _Rationale:_ Correct: the statements must reconcile to each other.
- C. The model looks visually tidy  
  _Rationale:_ Tidiness does not prove the numbers are correct.
- D. IRR is always above zero  
  _Rationale:_ IRR's sign depends on the cash flows and proves nothing about integrity.

**MST-2659-Q0003** (single-answer, Select ONE) Cash flows occur on irregular dates rather than at equal yearly intervals. Which function values them most appropriately?

- A. XNPV, which uses the actual dates of each cash flow **(key)**  
  _Rationale:_ Correct: XNPV accounts for exact dates, unlike NPV's equal-period assumption.
- B. NPV, which assumes equal periods  
  _Rationale:_ NPV mis-times irregular flows.
- C. PMT, which computes a loan payment  
  _Rationale:_ PMT is for level annuity payments, not valuing irregular flows.
- D. SUM of the cash flows  
  _Rationale:_ A simple sum ignores the time value of money.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
