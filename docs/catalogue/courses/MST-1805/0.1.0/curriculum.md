# Engineering Economics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1805` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify. Sources: MASTEMY-DESIGN (internal course design; no external syllabus) |
| Legacy IDs | MST-ENG-SK-EE-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Engineering Economics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Economic foundations
2. Equivalence and interest
3. Project evaluation
4. Comparing alternatives
5. Depreciation, tax and risk

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot fully demonstrate building a complete multi-year after-tax model; practice problems and worked solutions are provided separately.

## Modules

### M01 Economic foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Draw a cash-flow diagram for a project; (2) Explain why a dollar today beats a dollar later
- Common misconception addressed: Comparing cash flows at different times without discounting
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Cost concepts for engineers | 96 | 8 |
| M01L02 | Cash flows and the time value of money | 96 | 8 |

### M02 Equivalence and interest (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Convert a future sum to present worth; (2) Compute the annual worth of a series
- Common misconception addressed: Using simple interest where compounding applies
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Compound interest factors | 96 | 8 |
| M02L02 | Present, future and annual worth | 96 | 8 |

### M03 Project evaluation (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute NPV for a project at a given rate; (2) Interpret an internal rate of return
- Common misconception addressed: Choosing a project on payback alone and ignoring later cash flows
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Net present value and IRR | 96 | 8 |
| M03L02 | Payback and benefit-cost ratio | 96 | 8 |

### M04 Comparing alternatives (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compare two alternatives by incremental IRR; (2) Decide whether to replace an asset
- Common misconception addressed: Comparing alternatives of different lives without a common basis
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Incremental analysis | 96 | 8 |
| M04L02 | Replacement and service-life decisions | 96 | 8 |

### M05 Depreciation, tax and risk (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Compute straight-line depreciation; (2) Run a sensitivity check on a key assumption
- Common misconception addressed: Treating depreciation as a cash outflow in the cash-flow analysis
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Depreciation methods | 96 | 8 |
| M05L02 | After-tax analysis and sensitivity | 96 | 8 |

## Integrative case

An engineer must choose between a cheaper machine with high running costs and a costlier efficient one. The learner must build cash-flow diagrams, discount to present worth, compute NPV and IRR, compare the alternatives incrementally over a common life, and test sensitivity to the interest rate, then recommend the better investment.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1805-final-protected | 25 | 25 | yes |
| MST-1805-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Economic foundations | 5 |
| Equivalence and interest | 5 |
| Project evaluation | 5 |
| Comparing alternatives | 5 |
| Depreciation, tax and risk | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1805-Q0001** (single-answer, Select ONE) A project's net present value (NPV) is positive when:

- A. The discounted benefits exceed the discounted costs **(key)**  
  _Rationale:_ Correct: a positive NPV means the project adds value at the chosen discount rate.
- B. The payback period is longer than the project life  
  _Rationale:_ A long payback does not imply positive NPV.
- C. The initial cost is the largest single cash flow  
  _Rationale:_ Cash-flow size alone does not set NPV's sign.
- D. No discount rate has been applied  
  _Rationale:_ NPV requires discounting by definition.

**MST-1805-Q0002** (multiple-answer, Select TWO) Which TWO reflect the time value of money? (Select TWO.)

- A. Money available now can be invested to earn a return **(key)**  
  _Rationale:_ Correct: earning potential makes present money worth more.
- B. Future cash flows must be discounted to compare with present ones **(key)**  
  _Rationale:_ Correct: discounting puts cash flows on a common time basis.
- C. A dollar in ten years is worth more than a dollar today  
  _Rationale:_ Future dollars are worth less, not more, today.
- D. Interest rates are irrelevant to project choice  
  _Rationale:_ Interest rates are central to economic comparison.

**MST-1805-Q0003** (single-answer, Select ONE) In cash-flow analysis, depreciation is best treated as:

- A. A non-cash expense that affects taxes, not a direct cash outflow **(key)**  
  _Rationale:_ Correct: depreciation is non-cash but reduces taxable income.
- B. A cash payment made each year  
  _Rationale:_ Depreciation is not a cash outflow.
- C. The salvage value of the asset  
  _Rationale:_ Salvage is a separate cash flow at disposal.
- D. Irrelevant to any economic analysis  
  _Rationale:_ Depreciation matters through its tax effect.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written. This is a curriculum specification, not course content.
