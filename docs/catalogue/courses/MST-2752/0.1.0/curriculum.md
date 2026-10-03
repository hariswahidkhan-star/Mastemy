# Post-Quantum Cryptography

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2752` v0.1.0 | Batch 5 | workflow: Candidate | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy internal curriculum design (no official syllabus); emerging-technology scope as of 2026-10, speculative topics treated conceptually and safely. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Post-Quantum Cryptography (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain why quantum computers threaten RSA and elliptic-curve cryptography
2. Describe the main families of post-quantum algorithms at a high level
3. Identify standardised post-quantum schemes and their intended uses
4. Explain 'harvest now, decrypt later' and why migration planning is urgent
5. Plan a cryptographic inventory and crypto-agility approach
6. Communicate post-quantum risk and timelines honestly to stakeholders

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 The quantum threat (20% (design weight), design weight)

- Worked applications: (1) Classify which of an app's primitives Shor breaks; (2) Explain why symmetric keys mainly need larger sizes
- Common misconception addressed: Believing all cryptography is broken by quantum computers
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shor versus RSA and ECC | 64 | 4 |
| M01L02 | What stays safe and what breaks | 64 | 4 |
| M01L03 | Timeline uncertainty | 64 | 4 |

### M02 PQC algorithm families (22% (design weight), design weight)

- Worked applications: (1) Match a use case to a lattice-based scheme; (2) Explain the trade-offs of hash-based signatures
- Common misconception addressed: Assuming any one PQC family is best for everything
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Lattice-based schemes | 70 | 4 |
| M02L02 | Hash-based signatures | 70 | 4 |
| M02L03 | Code and other families | 71 | 4 |

### M03 Standards and schemes (20% (design weight), design weight)

- Worked applications: (1) Select a standardised KEM for a TLS-like handshake; (2) Select a standardised signature for firmware signing
- Common misconception addressed: Treating a draft scheme as if it were finalised and audited
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Standardised key encapsulation | 64 | 4 |
| M03L02 | Standardised signatures | 64 | 4 |
| M03L03 | Choosing a scheme | 64 | 4 |

### M04 Migration risk (20% (design weight), design weight)

- Worked applications: (1) Build a crypto inventory for a sample service; (2) Assess data whose secrecy must outlive 2035
- Common misconception addressed: Ignoring long-lived secrets exposed to harvest-now-decrypt-later
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Harvest now, decrypt later | 64 | 4 |
| M04L02 | Cryptographic inventory | 64 | 4 |
| M04L03 | Crypto-agility | 64 | 4 |

### M05 Planning and governance (18% (design weight), design weight)

- Worked applications: (1) Draft a phased migration roadmap; (2) Design a hybrid classical+PQC rollout
- Common misconception addressed: Promising a single overnight cut-over to post-quantum crypto
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Building a migration roadmap | 57 | 4 |
| M05L02 | Hybrid classical+PQC deployment | 57 | 4 |
| M05L03 | Communicating risk honestly | 59 | 4 |

## Integrative case

A platform team holds years of encrypted customer records: identify which assets are exposed to harvest-now-decrypt-later, choose standardised post-quantum schemes, and present a phased, crypto-agile migration plan with honest timelines.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official exam exists for this general professional skills course.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2752-final-protected | 40 | 40 | yes |
| MST-2752-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| The quantum threat | 8 |
| PQC algorithm families | 9 |
| Standards and schemes | 8 |
| Migration risk | 8 |
| Planning and governance | 7 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2752-Q0001** (single-answer, Select ONE) Why does 'harvest now, decrypt later' make post-quantum migration urgent even before large quantum computers exist?

- A. Adversaries can store today's encrypted long-lived data and decrypt it once capable quantum machines arrive **(key)**  
  _Rationale:_ Correct: data with long secrecy requirements is at risk now because it can be stored and decrypted later.
- B. Because RSA is already broken by classical computers today  
  _Rationale:_ RSA is not broken classically; the risk is future quantum capability.
- C. Because post-quantum algorithms stop working after a few years  
  _Rationale:_ PQC schemes do not expire; the urgency is about long-lived captured data.
- D. Because quantum computers already exist at the needed scale  
  _Rationale:_ They do not yet exist at scale; urgency comes from captured-data risk.

**MST-2752-Q0002** (multiple-answer, Select TWO) Which TWO statements about the quantum threat to cryptography are accurate? (Select TWO.)

- A. Shor's algorithm would break RSA and elliptic-curve public-key cryptography **(key)**  
  _Rationale:_ Correct: Shor targets the hardness assumptions behind RSA and ECC.
- B. Symmetric ciphers like AES mainly need larger key sizes, not replacement **(key)**  
  _Rationale:_ Correct: Grover gives only a quadratic speedup, addressed by doubling symmetric key length.
- C. Hash functions and symmetric ciphers are completely broken by quantum computers  
  _Rationale:_ They are weakened at most quadratically, not broken, by known quantum attacks.
- D. Switching to longer RSA keys fully solves the quantum threat  
  _Rationale:_ Longer RSA keys do not defeat Shor; new algorithm families are required.

**MST-2752-Q0003** (single-answer, Select ONE) What is the most responsible first step when planning a post-quantum migration for a large estate?

- A. Build an inventory of where and how cryptography is used, including long-lived secrets **(key)**  
  _Rationale:_ Correct: you cannot migrate what you have not inventoried; crypto-agility starts with discovery.
- B. Immediately delete all existing keys and certificates  
  _Rationale:_ Deleting keys breaks services and is not a migration step.
- C. Wait until a cryptographically relevant quantum computer is announced  
  _Rationale:_ Waiting ignores harvest-now-decrypt-later risk to long-lived data.
- D. Adopt a single unstandardised scheme everywhere at once  
  _Rationale:_ Using unvetted schemes and a big-bang cut-over is risky and not crypto-agile.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
