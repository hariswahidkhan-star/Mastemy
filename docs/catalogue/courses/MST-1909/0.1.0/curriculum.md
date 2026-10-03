# Blockchain Fundamentals: Ledgers, Blocks and Decentralised Trust

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1909` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Blockchain Fundamentals: Ledgers, Blocks and Decentralised Trust (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what a distributed ledger is and how it differs from a traditional database
2. Describe how blocks, hashes and chaining make a ledger tamper-evident
3. Distinguish public, private and permissioned networks and their trust assumptions
4. Trace how a transaction moves from submission to finality on a public chain
5. Evaluate when a blockchain is and is not the right tool for a problem
6. Explain the economic and governance forces that keep a decentralised network running

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Distributed ledgers vs databases (16% (design weight), design weight)

- Worked applications: (1) Model a shared supplier ledger as a database, then as a chain, and compare; (2) Hash a sample record and alter one byte to show tamper-evidence
- Common misconception addressed: Believing a blockchain is just a slow database
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a blockchain is and is not | 77 | 5 |
| M01L02 | State, replication and the CAP trade-offs | 77 | 5 |

### M02 Blocks, hashes and chaining (18% (design weight), design weight)

- Worked applications: (1) Build a Merkle proof for one transaction by hand; (2) Show how changing a leaf invalidates the root
- Common misconception addressed: Thinking every node stores every full history forever
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Cryptographic hashes and tamper-evidence | 86 | 5 |
| M02L02 | Merkle trees and block structure | 87 | 5 |

### M03 Network types and trust models (16% (design weight), design weight)

- Worked applications: (1) Pick the right network type for a consortium of hospitals; (2) Map who can read and who can write in each model
- Common misconception addressed: Assuming public and private chains share the same guarantees
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Public, private and permissioned networks | 77 | 5 |
| M03L02 | Trust assumptions and threat models | 77 | 5 |

### M04 The transaction lifecycle (18% (design weight), design weight)

- Worked applications: (1) Walk a transaction from wallet signing to finality; (2) Explain why a 1-confirmation payment can still revert
- Common misconception addressed: Treating the first confirmation as final settlement
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | From mempool to inclusion | 86 | 5 |
| M04L02 | Confirmations, finality and reorgs | 87 | 5 |

### M05 When to use a blockchain (16% (design weight), design weight)

- Worked applications: (1) Apply the decision checklist to a loyalty-points use case; (2) Reject a case where a database is clearly better
- Common misconception addressed: Reaching for a blockchain because it is fashionable
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The decision checklist | 76 | 5 |
| M05L02 | Common anti-patterns and hype traps | 77 | 5 |

### M06 Incentives and governance (16% (design weight), design weight)

- Worked applications: (1) Explain a contentious hard fork to a non-technical stakeholder; (2) Trace how incentives align miners/validators with honesty
- Common misconception addressed: Assuming decentralised means leaderless or ungoverned
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Why nodes participate | 76 | 5 |
| M06L02 | Protocol upgrades and forks | 77 | 5 |

## Integrative case

A regional produce cooperative wants a shared record of shipments across 12 independent farms and 3 distributors; decide whether a blockchain fits, choose a network type, and justify the trust and governance trade-offs to the board.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1909-final-protected | 40 | 50 | yes |
| MST-1909-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Distributed ledgers vs databases | 7 |
| Blocks, hashes and chaining | 7 |
| Network types and trust models | 7 |
| The transaction lifecycle | 7 |
| When to use a blockchain | 6 |
| Incentives and governance | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1909-Q0001** (single-answer, Select ONE) A record stored in a blockchain block is altered after the block is chained. Why is this immediately detectable?

- A. The block's hash changes, breaking the link every later block committed to **(key)**  
  _Rationale:_ Correct: each block commits to the previous hash, so any edit cascades.
- B. The network sends an email alert  
  _Rationale:_ There is no such mechanism; detection is cryptographic.
- C. The ledger is encrypted so edits are impossible  
  _Rationale:_ Ledgers are tamper-evident, not encrypted against edits.
- D. Only the miner can see the change  
  _Rationale:_ Any verifying node recomputes hashes and detects the mismatch.

**MST-1909-Q0002** (multiple-answer, Select TWO) Which TWO properties genuinely require a decentralised blockchain rather than a well-run shared database? (Select TWO.)

- A. No single party can be trusted to control the write history **(key)**  
  _Rationale:_ Correct: removing a trusted central writer is a core blockchain use case.
- B. Participants need verifiable, tamper-evident settlement without a central intermediary **(key)**  
  _Rationale:_ Correct: trust-minimised settlement is a genuine blockchain property.
- C. The team wants faster queries than a database  
  _Rationale:_ Databases are faster; speed is not a blockchain advantage.
- D. The data must be stored only once to save disk  
  _Rationale:_ Blockchains replicate data across nodes, using more storage.

**MST-1909-Q0003** (single-answer, Select ONE) A payment shows 1 confirmation on a public chain. Why might the merchant still wait before releasing goods?

- A. A short chain reorganisation can orphan the block and revert the transaction **(key)**  
  _Rationale:_ Correct: finality is probabilistic, so more confirmations reduce reorg risk.
- B. The transaction fee has not been paid yet  
  _Rationale:_ An included transaction has already paid its fee.
- C. One confirmation means the transaction failed  
  _Rationale:_ One confirmation means it was included once.
- D. The merchant must manually approve each block  
  _Rationale:_ Merchants do not approve blocks.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
