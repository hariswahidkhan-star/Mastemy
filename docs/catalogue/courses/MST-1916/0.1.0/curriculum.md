# Crypto Wallets and Key Management Essentials

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1916` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Crypto Wallets and Key Management Essentials (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how private keys, public keys and addresses relate
2. Describe seed phrases, derivation paths and HD wallets
3. Compare hot, cold, hardware and multisig wallet options
4. Reason about transaction signing and approval safety
5. Identify common theft and social-engineering attack vectors
6. Design a practical key-management and recovery plan

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Keys and addresses (17% (design weight), design weight)

- Worked applications: (1) Derive an address from a key pair; (2) Explain why the address is not the private key
- Common misconception addressed: Sharing a public address thinking it reveals the key
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Private/public keys and addresses | 81 | 5 |
| M01L02 | What signing actually proves | 82 | 5 |

### M02 Seed phrases and HD wallets (18% (design weight), design weight)

- Worked applications: (1) Generate a seed phrase and derive two accounts; (2) Explain why losing the seed loses the funds
- Common misconception addressed: Storing a seed phrase in a cloud note
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Mnemonics and entropy | 86 | 5 |
| M02L02 | Derivation paths and account structure | 87 | 5 |

### M03 Wallet types (17% (design weight), design weight)

- Worked applications: (1) Compare a hardware wallet to a browser hot wallet; (2) Set up a 2-of-3 multisig for a treasury
- Common misconception addressed: Keeping life savings in a browser extension wallet
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Hot vs cold wallets | 81 | 5 |
| M03L02 | Hardware and multisig wallets | 82 | 5 |

### M04 Signing safely (16% (design weight), design weight)

- Worked applications: (1) Decode a signing request before approving; (2) Scope a token approval to a single spend
- Common misconception addressed: Blind-signing an opaque transaction
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading what you are signing | 77 | 5 |
| M04L02 | Blind signing and approval scope | 77 | 5 |

### M05 Attack vectors (16% (design weight), design weight)

- Worked applications: (1) Spot a phishing approval that drains a wallet; (2) Detect an address-poisoning lookalike
- Common misconception addressed: Pasting a recipient address without verifying it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Phishing, drainers and fake apps | 77 | 5 |
| M05L02 | Address poisoning and clipboard swaps | 77 | 5 |

### M06 Recovery and custody (16% (design weight), design weight)

- Worked applications: (1) Design a backup and recovery plan with redundancy; (2) Decide self-custody vs custodial for a use case
- Common misconception addressed: Having a single copy of the only seed phrase
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Backup and recovery strategies | 76 | 5 |
| M06L02 | Self-custody vs custodial trade-offs | 77 | 5 |

## Integrative case

A small startup will hold company crypto funds and let three employees transact; design a key-management plan covering wallet types, multisig approvals, signing hygiene and recovery, and explain the theft vectors each control mitigates.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1916-final-protected | 40 | 50 | yes |
| MST-1916-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Keys and addresses | 7 |
| Seed phrases and HD wallets | 7 |
| Wallet types | 7 |
| Signing safely | 7 |
| Attack vectors | 6 |
| Recovery and custody | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1916-Q0001** (single-answer, Select ONE) A user loses the device holding their self-custody wallet but still has the seed phrase. What is true?

- A. They can restore the same accounts on a new device from the seed phrase **(key)**  
  _Rationale:_ Correct: the seed phrase deterministically regenerates the keys.
- B. The funds are permanently lost with the device  
  _Rationale:_ The seed phrase enables recovery.
- C. They must contact the blockchain's support desk  
  _Rationale:_ There is no central support desk for self-custody.
- D. The addresses will be different and funds unreachable  
  _Rationale:_ HD derivation reproduces the same addresses.

**MST-1916-Q0002** (multiple-answer, Select TWO) Which TWO practices meaningfully reduce the risk of a drained wallet? (Select TWO.)

- A. Reviewing exactly what a transaction or approval authorises before signing **(key)**  
  _Rationale:_ Correct: understanding the request prevents malicious approvals.
- B. Keeping large balances in a hardware or multisig wallet rather than a hot wallet **(key)**  
  _Rationale:_ Correct: cold and multisig storage reduce exposure.
- C. Sharing the seed phrase with a support agent to verify ownership  
  _Rationale:_ No legitimate agent needs your seed phrase.
- D. Posting the public key screenshot in a forum for help  
  _Rationale:_ This invites targeted phishing and reveals nothing useful for support.

**MST-1916-Q0003** (single-answer, Select ONE) Why is blind signing an opaque transaction dangerous?

- A. You may authorise an action, such as an unlimited approval, that you did not intend **(key)**  
  _Rationale:_ Correct: without readable details you cannot judge what you approve.
- B. Blind signing always fails and wastes gas  
  _Rationale:_ It often succeeds, which is the danger.
- C. Blind signing reveals your seed phrase  
  _Rationale:_ Signing does not reveal the seed.
- D. Blind signing is required by all wallets  
  _Rationale:_ Readable signing is preferred and available.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
