# VAT and Indirect Tax: Transaction and Control Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1053` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how VAT and other indirect taxes work through the supply chain
2. Determine output and input VAT on sample transactions
3. Apply place-of-supply and rate concepts in a jurisdiction-aware way
4. Design controls for accurate VAT capture and reporting
5. Prepare and reconcile a conceptual VAT return

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 How VAT works (MASTEMY-DESIGN 20%)

- Worked applications: (1) Trace VAT through a three-stage supply chain; (2) Show why VAT is borne by the final consumer
- Common misconception addressed: Thinking VAT is a cost to a VAT-registered business rather than a flow-through
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | VAT as a flow-through tax | 96 | 8 |
| M01L02 | Output VAT, input VAT and the net position | 96 | 8 |

### M02 Transactions and rates (MASTEMY-DESIGN 20%)

- Worked applications: (1) Assign rates to a mix of standard, zero and exempt supplies; (2) Compute net VAT on a sample invoice set
- Common misconception addressed: Applying one VAT rate to every supply
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Standard, reduced, zero-rated and exempt supplies | 96 | 8 |
| M02L02 | Calculating VAT on transactions | 96 | 8 |

### M03 Place of supply and cross-border (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide where a service is supplied for VAT; (2) Apply a reverse-charge concept to an import
- Common misconception addressed: Ignoring place-of-supply rules on cross-border services
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Place-of-supply principles (jurisdiction-aware) | 96 | 8 |
| M03L02 | Imports, exports and reverse charge | 96 | 8 |

### M04 Controls and data (MASTEMY-DESIGN 20%)

- Worked applications: (1) Design a control to catch mis-coded VAT; (2) Spot an invoice that fails VAT evidence rules
- Common misconception addressed: Assuming the accounting system always codes VAT correctly
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | VAT coding and master-data controls | 96 | 8 |
| M04L02 | Evidence, invoices and record-keeping | 96 | 8 |

### M05 Returns and reconciliation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Prepare a conceptual VAT return; (2) Reconcile the VAT control account to the return
- Common misconception addressed: Filing the VAT return without reconciling to the ledger
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Preparing the VAT return | 96 | 8 |
| M05L02 | Reconciliation, errors and adjustments | 96 | 8 |

## Integrative case

A finance analyst at a trading company must tighten VAT: trace VAT through the supply chain, correct a batch of mis-coded standard and zero-rated supplies, apply reverse charge to an import, design a coding control, and reconcile the VAT account to a conceptual return before submission.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1053-final-protected | 25 | 25 | yes |
| MST-1053-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| How VAT works | 5 |
| Transactions and rates | 5 |
| Place of supply and cross-border | 5 |
| Controls and data | 5 |
| Returns and reconciliation | 5 |

Minimum reviewed item bank: 378 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1053-Q0001** (single-answer, Select ONE) For a VAT-registered trading business, VAT charged to customers (output VAT) is best described as:

- A. Collected on behalf of the tax authority and owed onward, net of input VAT **(key)**  
  _Rationale:_ Correct: output VAT is collected for the authority, offset by recoverable input VAT.
- B. Additional sales revenue for the business  
  _Rationale:_ VAT collected is not the business's revenue.
- C. A permanent cost the business cannot recover  
  _Rationale:_ Registered businesses offset input VAT, so it flows through.
- D. Irrelevant once the invoice is raised  
  _Rationale:_ Output VAT must be reported and remitted.

**MST-1053-Q0002** (multiple-answer, Select TWO) Which TWO controls improve the accuracy of VAT reporting? (Select TWO.)

- A. Validating VAT codes on supplier and customer master data **(key)**  
  _Rationale:_ Correct: correct coding at source prevents misstatement.
- B. Reconciling the VAT control account to the return before filing **(key)**  
  _Rationale:_ Correct: reconciliation catches errors before submission.
- C. Guessing the VAT rate when unsure to save time  
  _Rationale:_ Guessing rates causes misstatement and penalties.
- D. Deleting invoices that look complicated  
  _Rationale:_ Omitting transactions understates VAT and breaks records.

**MST-1053-Q0003** (single-answer, Select ONE) A zero-rated supply differs from an exempt supply because, for a zero-rated supply, the business:

- A. Charges VAT at 0% and can generally still recover related input VAT **(key)**  
  _Rationale:_ Correct: zero-rated supplies allow input VAT recovery; exempt supplies generally do not.
- B. Cannot recover any input VAT at all  
  _Rationale:_ That is the usual position for exempt, not zero-rated, supplies.
- C. Must charge the standard rate  
  _Rationale:_ Zero-rated means a 0% rate, not the standard rate.
- D. Is always outside the VAT system  
  _Rationale:_ Zero-rated supplies are within the VAT system at 0%.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
