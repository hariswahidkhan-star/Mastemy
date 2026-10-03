# Consensus Mechanisms and Applied Cryptography for Blockchains

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1910` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1440 min; instruction I = 1152 min (80%); assessment A = 288 min (20%) |
| Assessment split | lesson checks 72 / module checks 101 / cumulative 115 min |
| Certificate | Mastemy Certificate of Completion — Consensus Mechanisms and Applied Cryptography for Blockchains (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the Byzantine fault-tolerance problem consensus protocols solve
2. Compare Proof of Work, Proof of Stake and BFT-style consensus and their trade-offs
3. Describe how public-key cryptography and digital signatures authenticate transactions
4. Explain hash functions, Merkle structures and their role in integrity
5. Reason about finality, liveness and safety under network and adversary assumptions
6. Identify the security and decentralisation trade-offs of each consensus design

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The consensus problem (15% (design weight), design weight)

- Worked applications: (1) Simulate a double-spend attempt and show why consensus prevents it; (2) Compare two chains and apply the fork-choice rule
- Common misconception addressed: Thinking a confirmed block can never be reverted
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Byzantine generals and double-spend | 86 | 6 |
| M01L02 | Safety, liveness and the FLP result | 87 | 6 |

### M02 Proof of Work (17% (design weight), design weight)

- Worked applications: (1) Compute difficulty adjustment for a target block time; (2) Estimate the cost of a 51% attack on a sample chain
- Common misconception addressed: Believing PoW is wasteful by accident rather than by design
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Mining, difficulty and the longest chain | 98 | 6 |
| M02L02 | Energy, 51% attacks and selfish mining | 98 | 6 |

### M03 Proof of Stake (18% (design weight), design weight)

- Worked applications: (1) Trace a validator being slashed for equivocation; (2) Explain why staking aligns honesty with reward
- Common misconception addressed: Assuming PoS is simply PoW without electricity
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Validators, staking and slashing | 103 | 6 |
| M03L02 | Finality gadgets and nothing-at-stake | 104 | 6 |

### M04 BFT and permissioned consensus (15% (design weight), design weight)

- Worked applications: (1) Run a PBFT round with one faulty node; (2) Show why 3f+1 nodes tolerate f faults
- Common misconception addressed: Confusing crash faults with Byzantine faults
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | PBFT and quorum-based agreement | 86 | 6 |
| M04L02 | Leader rotation and view changes | 87 | 6 |

### M05 Keys and signatures (18% (design weight), design weight)

- Worked applications: (1) Sign and verify a transaction with an ECDSA key pair; (2) Derive an address from a public key
- Common misconception addressed: Confusing the private key with the seed phrase
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Public-key pairs and ECDSA | 103 | 6 |
| M05L02 | Signing, verifying and address derivation | 104 | 6 |

### M06 Hashing and integrity (17% (design weight), design weight)

- Worked applications: (1) Build a Merkle proof a light client can verify; (2) Show collision resistance protecting block integrity
- Common misconception addressed: Assuming any hash function is safe for any purpose
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Pre-image and collision resistance | 98 | 6 |
| M06L02 | Merkle proofs in light clients | 98 | 6 |

## Integrative case

A new layer-1 project must choose a consensus mechanism for a payments network expecting adversarial validators; evaluate Proof of Work, Proof of Stake and BFT options against safety, liveness, cost and decentralisation and defend the recommendation.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1910-final-protected | 45 | 55 | yes |
| MST-1910-final-alternate | 45 | 55 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The consensus problem | 7 |
| Proof of Work | 8 |
| Proof of Stake | 8 |
| BFT and permissioned consensus | 7 |
| Keys and signatures | 8 |
| Hashing and integrity | 7 |

Minimum reviewed item bank: 426 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1910-Q0001** (single-answer, Select ONE) Why does a classic PBFT network require at least 3f+1 nodes to tolerate f Byzantine faults?

- A. Honest nodes must form a quorum that overlaps across votes despite f malicious and f unreachable **(key)**  
  _Rationale:_ Correct: the 3f+1 bound guarantees overlapping honest quorums.
- B. Because 3f+1 is the fastest possible number of nodes  
  _Rationale:_ It is a safety bound, not a speed optimisation.
- C. Because each fault needs exactly three backup nodes  
  _Rationale:_ That is not how the bound is derived.
- D. Because PBFT encrypts messages three times  
  _Rationale:_ PBFT is about agreement, not triple encryption.

**MST-1910-Q0002** (multiple-answer, Select TWO) Which TWO statements about Proof of Stake slashing are correct? (Select TWO.)

- A. A validator can lose staked funds for signing two conflicting blocks **(key)**  
  _Rationale:_ Correct: equivocation is a slashable offence.
- B. Slashing makes attacking the chain economically costly for the attacker **(key)**  
  _Rationale:_ Correct: putting stake at risk aligns incentives with honesty.
- C. Slashing rewards validators for going offline  
  _Rationale:_ Downtime is penalised, not rewarded.
- D. Slashing replaces the need for any cryptographic signatures  
  _Rationale:_ Signatures are still required to attribute actions.

**MST-1910-Q0003** (single-answer, Select ONE) A user signs a transaction. What exactly proves to the network that the account owner authorised it?

- A. A digital signature verifiable against the account's public key **(key)**  
  _Rationale:_ Correct: the signature verifies under the public key without revealing the private key.
- B. The plaintext private key included in the transaction  
  _Rationale:_ Private keys are never transmitted.
- C. The miner's approval stamp  
  _Rationale:_ Miners order transactions; they do not authorise them.
- D. The transaction fee amount  
  _Rationale:_ Fees do not authenticate the sender.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
