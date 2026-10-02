# SAP S/4HANA Financial Accounting: Certification-Track Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1241` v0.1.0 | Batch 2 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | SAP (no affiliation or endorsement) |
| Exam code | DESIGN ASSUMPTION / unresolved |
| Version basis | unresolved - official outline not verified this session |
| Evidence | **unverified-needs-official-check** - issuer site egress-blocked 2026-10-02; domains are DESIGN ASSUMPTION |
| Legacy IDs | MST-BUS-SAP-S4FIN-001 |
| Planned time | T = 2700 min; instruction I = 2160 min (80%); assessment A = 540 min (20%) |
| Assessment split | lesson checks 135 / module checks 189 / cumulative 216 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain and apply the concepts of S/4HANA and Finance Foundations (design-assumption grouping)
2. Explain and apply the concepts of Subledger Accounting (design-assumption grouping)
3. Explain and apply the concepts of Closing, Reporting and Integration (design-assumption grouping)

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

> Module and lesson groupings are a DESIGN ASSUMPTION pending verification of the official outline.

### M01 S/4HANA and Finance Foundations (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Treating the universal journal (ACDOCA) as separate GL and CO tables
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | SAP S/4HANA finance overview and the universal journal | 240 | 6 |
| M01L02 | Organizational structures in Financial Accounting | 240 | 6 |
| M01L03 | General Ledger accounting | 240 | 6 |

### M02 Subledger Accounting (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Posting a vendor invoice without a reconciliation account configured
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Accounts Payable | 240 | 6 |
| M02L02 | Accounts Receivable | 240 | 6 |
| M02L03 | Asset Accounting | 240 | 6 |

### M03 Closing, Reporting and Integration (equal split (DESIGN ASSUMPTION))

- Worked applications: (1) Work through a realistic scenario end to end and justify the chosen approach; (2) Compare two candidate solutions against stated requirements and defend the selection
- Common misconception addressed: Assuming FI and CO are reconciled separately rather than in one journal
- Module check: 63 items / 63 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Period-end closing operations | 240 | 6 |
| M03L02 | Financial reporting | 240 | 6 |
| M03L03 | Integration with Controlling (CO) | 240 | 6 |

## Integrative case

Configure core Financial Accounting for a new company code: define organisational structures, set up GL/AP/AR/asset accounting, and describe the period-end close and how the universal journal unifies FI and CO.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count and duration not verified in this session; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1241-practice-form-A | 81 | 81 | yes |
| MST-1241-practice-form-B | 81 | 81 | no (optional practice) |
| MST-1241-practice-form-C | 81 | 81 | no (optional practice) |
| MST-1241-final-protected | 81 | 81 | yes |

| Domain (design-assumption) | Items per form |
|---|---|
| S/4HANA and Finance Foundations | 27 |
| Subledger Accounting | 27 |
| Closing, Reporting and Integration | 27 |

Minimum reviewed item bank: 810 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1241-Q0001** (single-answer, Select ONE) What does the universal journal (ACDOCA) provide in SAP S/4HANA finance?

- A. A single source of truth unifying FI and CO line items **(key)**  
  _Rationale:_ Correct: the universal journal stores FI and CO in one table, removing reconciliation steps.
- B. A separate ledger only for asset accounting  
  _Rationale:_ It is not limited to assets; it unifies finance.
- C. A replacement for the chart of accounts  
  _Rationale:_ The chart of accounts still exists; ACDOCA stores postings.
- D. A tool only for external reporting  
  _Rationale:_ It serves both management and financial accounting.

**MST-1241-Q0002** (single-answer, Select ONE) Which account links a subledger (e.g. Accounts Payable) to the General Ledger?

- A. Reconciliation account **(key)**  
  _Rationale:_ Correct: reconciliation accounts connect subledgers to the GL automatically.
- B. Clearing account  
  _Rationale:_ Clearing accounts offset open items; they are not the subledger link.
- C. Cost element  
  _Rationale:_ Cost elements are a CO concept, not the subledger-GL link.
- D. Chart of depreciation  
  _Rationale:_ That is an asset-accounting structure, not the GL link.

**MST-1241-Q0003** (multiple-answer, Select TWO) Which TWO are organisational elements in SAP Financial Accounting?

- A. Company code **(key)**  
  _Rationale:_ Correct: the company code is the legal entity for external reporting.
- B. Chart of accounts **(key)**  
  _Rationale:_ Correct: the chart of accounts defines the GL account structure used by company codes.
- C. MID Server  
  _Rationale:_ A MID Server is a ServiceNow concept, not SAP.
- D. Virtual Cloud Network  
  _Rationale:_ A VCN is an OCI networking concept, not SAP FI.
- E. Transform map  
  _Rationale:_ A transform map is a ServiceNow import concept.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
