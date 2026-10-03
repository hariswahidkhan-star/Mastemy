# Ethereum and the EVM: Accounts, Gas and Transactions

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1911` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1320 min; instruction I = 1056 min (80%); assessment A = 264 min (20%) |
| Assessment split | lesson checks 66 / module checks 92 / cumulative 106 min |
| Certificate | Mastemy Certificate of Completion — Ethereum and the EVM: Accounts, Gas and Transactions (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain Ethereum's account model and how it differs from UTXO chains
2. Describe how the EVM executes transactions and manages state
3. Reason about gas, fees and the EIP-1559 fee market
4. Distinguish externally owned accounts from contract accounts
5. Trace a transaction's journey including logs, receipts and events
6. Explain how layer-2 rollups scale Ethereum while inheriting its security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The account model (16% (design weight), design weight)

- Worked applications: (1) Compare Ethereum's account model to Bitcoin's UTXO model; (2) Track a nonce incrementing across transactions
- Common misconception addressed: Confusing an EOA with a contract account
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | EOAs vs contract accounts | 84 | 5 |
| M01L02 | State, nonces and balances | 85 | 5 |

### M02 The EVM (18% (design weight), design weight)

- Worked applications: (1) Read a simple sequence of EVM opcodes; (2) Show how storage writes cost more than memory
- Common misconception addressed: Assuming the EVM runs native machine code
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Opcodes, stack and memory | 95 | 5 |
| M02L02 | Storage, calldata and execution context | 95 | 5 |

### M03 Gas and fees (18% (design weight), design weight)

- Worked applications: (1) Estimate gas for a token transfer and a storage write; (2) Set base fee and tip during congestion
- Common misconception addressed: Setting a gas limit too low and causing out-of-gas
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Gas units and gas limits | 95 | 5 |
| M03L02 | EIP-1559 base fee and priority tips | 95 | 5 |

### M04 Transactions and messages (16% (design weight), design weight)

- Worked applications: (1) Build and sign a raw transaction; (2) Trace an internal message between two contracts
- Common misconception addressed: Thinking every call is a separate on-chain transaction
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Building and signing transactions | 84 | 5 |
| M04L02 | Internal messages and call stacks | 85 | 5 |

### M05 Logs, events and receipts (16% (design weight), design weight)

- Worked applications: (1) Decode an event log to recover indexed fields; (2) Read a receipt to find a revert reason
- Common misconception addressed: Treating a reverted transaction as free
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Event logs and topics | 84 | 5 |
| M05L02 | Receipts, status and revert reasons | 85 | 5 |

### M06 Scaling with layer 2 (16% (design weight), design weight)

- Worked applications: (1) Compare an optimistic rollup withdrawal delay to a zk rollup's; (2) Assess trust assumptions when bridging assets
- Common misconception addressed: Believing an L2 is as decentralised as L1 by default
- Module check: 15 items / 15 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Optimistic and zk rollups | 84 | 5 |
| M06L02 | Data availability and bridging risk | 85 | 5 |

## Integrative case

A fintech team is porting a payments feature to Ethereum and keeps hitting failed transactions and surprise gas costs; diagnose the account, gas and EVM behaviour, and recommend an L1-or-L2 deployment with honest trade-offs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1911-final-protected | 42 | 52 | yes |
| MST-1911-final-alternate | 42 | 52 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The account model | 7 |
| The EVM | 7 |
| Gas and fees | 7 |
| Transactions and messages | 7 |
| Logs, events and receipts | 7 |
| Scaling with layer 2 | 7 |

Minimum reviewed item bank: 384 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1911-Q0001** (single-answer, Select ONE) A contract call reverts but the user is still charged. Why?

- A. Gas is consumed by the executed computation up to the revert, so the work is paid for **(key)**  
  _Rationale:_ Correct: gas pays for execution even when the final state change is undone.
- B. The network refunds all gas on any revert  
  _Rationale:_ Only unused gas is returned, not gas already spent.
- C. Reverts are always free  
  _Rationale:_ Reverts consume the gas used before the failure.
- D. The miner reimburses the user  
  _Rationale:_ Miners do not reimburse reverted gas.

**MST-1911-Q0002** (multiple-answer, Select TWO) Which TWO statements about EIP-1559 are correct? (Select TWO.)

- A. The base fee is algorithmically adjusted per block based on demand **(key)**  
  _Rationale:_ Correct: the base fee rises and falls with block fullness.
- B. The base fee is burned rather than paid to the validator **(key)**  
  _Rationale:_ Correct: burning the base fee is a defining EIP-1559 feature.
- C. Users can no longer set any tip for validators  
  _Rationale:_ Users still set a priority fee (tip).
- D. EIP-1559 removed gas entirely  
  _Rationale:_ Gas still measures computation.

**MST-1911-Q0003** (single-answer, Select ONE) What distinguishes a contract account from an externally owned account on Ethereum?

- A. A contract account has associated code executed when it receives a message **(key)**  
  _Rationale:_ Correct: contract accounts hold code; EOAs do not.
- B. A contract account is controlled by a private key  
  _Rationale:_ That describes an EOA, not a contract account.
- C. A contract account cannot hold a balance  
  _Rationale:_ Contract accounts can hold Ether.
- D. A contract account has no address  
  _Rationale:_ Contract accounts have addresses.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
