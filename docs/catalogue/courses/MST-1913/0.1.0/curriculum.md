# Token Standards: Fungible, Non-Fungible and Multi-Token Design

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1913` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Token Standards: Fungible, Non-Fungible and Multi-Token Design (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the purpose and interface of fungible-token standards
2. Describe non-fungible-token standards and how uniqueness is represented
3. Compare single-token and multi-token standards and when to use each
4. Reason about approvals, allowances and the risks they create
5. Design metadata, supply and minting policies for a token
6. Identify common token pitfalls and compatibility concerns

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Fungible tokens (17% (design weight), design weight)

- Worked applications: (1) Implement a basic fungible-token transfer and balance check; (2) Read total supply and decimals
- Common misconception addressed: Confusing token units with human-readable amounts
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The fungible-token interface | 81 | 5 |
| M01L02 | Transfers, balances and total supply | 82 | 5 |

### M02 Approvals and allowances (16% (design weight), design weight)

- Worked applications: (1) Walk an approve-then-transferFrom spend by a contract; (2) Show an unlimited-approval risk and a safer alternative
- Common misconception addressed: Granting unlimited allowance to an unknown contract
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | The approve/transferFrom flow | 77 | 5 |
| M02L02 | Allowance risks and safer patterns | 77 | 5 |

### M03 Non-fungible tokens (18% (design weight), design weight)

- Worked applications: (1) Mint an NFT and set its metadata URI; (2) Transfer ownership and verify it on-chain
- Common misconception addressed: Assuming the image lives on-chain by default
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Representing uniqueness and ownership | 86 | 5 |
| M03L02 | Token URIs and metadata | 87 | 5 |

### M04 Multi-token standards (16% (design weight), design weight)

- Worked applications: (1) Use a multi-token contract for a game's items; (2) Batch-transfer several token IDs at once
- Common misconception addressed: Deploying one contract per item unnecessarily
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Batch transfers and mixed token types | 77 | 5 |
| M04L02 | When a single contract fits many assets | 77 | 5 |

### M05 Supply and minting policy (17% (design weight), design weight)

- Worked applications: (1) Design a capped-supply mint with role control; (2) Add a burn function and account for supply
- Common misconception addressed: Letting anyone mint because minting was left public
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Fixed, capped and mintable supply | 81 | 5 |
| M05L02 | Burning and access-controlled minting | 82 | 5 |

### M06 Pitfalls and compatibility (16% (design weight), design weight)

- Worked applications: (1) Spot a fee-on-transfer token breaking an integration; (2) Handle non-standard return values defensively
- Common misconception addressed: Assuming every token follows the standard exactly
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Non-standard implementations | 76 | 5 |
| M06L02 | Rounding, decimals and fee-on-transfer | 77 | 5 |

## Integrative case

A marketplace must support both a payment token and unique collectible items in one product; choose the right token standards, design approvals, metadata and minting policy, and document the allowance and compatibility risks for the integration team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1913-final-protected | 40 | 50 | yes |
| MST-1913-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Fungible tokens | 7 |
| Approvals and allowances | 7 |
| Non-fungible tokens | 7 |
| Multi-token standards | 6 |
| Supply and minting policy | 7 |
| Pitfalls and compatibility | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1913-Q0001** (single-answer, Select ONE) A user grants a spending contract an unlimited token allowance. What is the main risk?

- A. If the contract is buggy or malicious it can move the user's full balance at any time **(key)**  
  _Rationale:_ Correct: unlimited allowance exposes the entire balance indefinitely.
- B. The user can no longer receive tokens  
  _Rationale:_ Allowances govern spending, not receiving.
- C. The token's total supply decreases  
  _Rationale:_ Approvals do not change supply.
- D. Transfers become free  
  _Rationale:_ Gas is still required.

**MST-1913-Q0002** (multiple-answer, Select TWO) Which TWO are reasons to choose a multi-token standard over deploying one fungible-token contract per asset? (Select TWO.)

- A. A single contract can manage many token types, reducing deployment overhead **(key)**  
  _Rationale:_ Correct: multi-token standards hold many assets in one contract.
- B. Batch transfers of several token IDs can be done in one transaction **(key)**  
  _Rationale:_ Correct: batching is a core multi-token feature.
- C. It guarantees the token price will rise  
  _Rationale:_ Standards do not affect price.
- D. It makes tokens immune to approval risk  
  _Rationale:_ Approval risks still apply.

**MST-1913-Q0003** (single-answer, Select ONE) Why can a fungible token's `decimals` value mislead a developer summing raw balances?

- A. Raw on-chain balances are integers scaled by decimals, not human-readable amounts **(key)**  
  _Rationale:_ Correct: you must scale by decimals to get display amounts.
- B. decimals changes the total supply each block  
  _Rationale:_ decimals is a fixed display scale.
- C. decimals encrypts the balance  
  _Rationale:_ It does not encrypt anything.
- D. decimals is the number of holders  
  _Rationale:_ It is not a holder count.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
