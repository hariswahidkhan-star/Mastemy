# Cryptography for Software and Security Professionals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1013` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs |  |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cryptography for Software and Security Professionals (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Cryptography foundations
2. Symmetric encryption
3. Hashing and MACs
4. Asymmetric cryptography
5. Key and secret management
6. Password and credential protection

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Cryptography foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Map a security goal to the property it needs; (2) Explain why secrecy must rest in the key, not the algorithm
- Common misconception addressed: Believing a secret, home-made algorithm is safer than a public vetted one
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Confidentiality, integrity, authenticity and non-repudiation | 80 | 6 |
| M01L02 | Kerckhoffs's principle and why not to roll your own | 80 | 6 |

### M02 Symmetric encryption (MASTEMY-DESIGN 17%)

- Worked applications: (1) Choose an AEAD mode for confidentiality plus integrity; (2) Generate and never reuse a nonce correctly
- Common misconception addressed: Using an unauthenticated mode and assuming encryption alone gives integrity
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Block ciphers, modes and authenticated encryption | 80 | 6 |
| M02L02 | Nonces, IVs and AEAD | 80 | 6 |

### M03 Hashing and MACs (MASTEMY-DESIGN 17%)

- Worked applications: (1) Select a hash for integrity versus a MAC for authenticity; (2) Verify a message with an HMAC in constant time
- Common misconception addressed: Using a plain hash where a keyed MAC is required
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cryptographic hashes and their properties | 80 | 6 |
| M03L02 | HMAC and authenticated integrity | 80 | 6 |

### M04 Asymmetric cryptography (MASTEMY-DESIGN 17%)

- Worked applications: (1) Use a key exchange to establish a shared secret; (2) Verify a digital signature and its certificate chain
- Common misconception addressed: Confusing encryption with signing when choosing a key pair
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Public-key encryption and key exchange | 80 | 6 |
| M04L02 | Digital signatures and certificates | 80 | 6 |

### M05 Key and secret management (MASTEMY-DESIGN 16%)

- Worked applications: (1) Design a key rotation scheme without breaking old data; (2) Move a hard-coded secret into a managed store
- Common misconception addressed: Hard-coding keys in source or configuration files
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Key generation, storage and rotation | 80 | 6 |
| M05L02 | Secrets in code, KMS and hardware protection | 80 | 6 |

### M06 Password and credential protection (MASTEMY-DESIGN 16%)

- Worked applications: (1) Hash passwords with a slow, salted algorithm; (2) Tune a work factor and store it with the hash
- Common misconception addressed: Storing passwords with a fast general-purpose hash and no salt
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Password hashing with salts and work factors | 80 | 6 |
| M06L02 | Avoiding fast hashes and timing leaks | 80 | 6 |

## Integrative case

Make the cryptographic design choices for a new messaging feature: select primitives for confidentiality, integrity and authentication, design key generation, storage and rotation, avoid common pitfalls, and document the choices so a reviewer can confirm no primitive is misused.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1013-final-protected | 30 | 30 | yes |
| MST-1013-final-alternate | 30 | 30 | no (optional practice) |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1013-Q0001** (single-answer, Select ONE) A developer needs both confidentiality and tamper detection for a message in one step. Which choice is appropriate?

- A. An authenticated encryption (AEAD) mode **(key)**  
  _Rationale:_ Correct: AEAD provides confidentiality and integrity/authenticity together.
- B. An unauthenticated encryption mode alone  
  _Rationale:_ Encryption without authentication does not detect tampering.
- C. A plain cryptographic hash of the plaintext  
  _Rationale:_ A hash alone provides neither confidentiality nor keyed authenticity.
- D. Base64 encoding  
  _Rationale:_ Encoding is not encryption and provides no security.

**MST-1013-Q0002** (multiple-answer, Select TWO) Which TWO practices are required to store user passwords safely? (Select TWO)

- A. Use a slow password-hashing algorithm with a tunable work factor **(key)**  
  _Rationale:_ Correct: a deliberately slow hash resists brute-force attacks.
- B. Use a unique random salt per password **(key)**  
  _Rationale:_ Correct: per-password salts defeat precomputed (rainbow table) attacks.
- C. Encrypt passwords with a hard-coded key in the source  
  _Rationale:_ Hard-coded keys and reversible encryption are unsafe for passwords.
- D. Hash passwords with a single fast general-purpose hash  
  _Rationale:_ Fast hashes are easily brute-forced and are the wrong tool.

**MST-1013-Q0003** (single-answer, Select ONE) Why should teams avoid designing their own encryption algorithm?

- A. Security should rest in the secret key, using algorithms publicly vetted by experts **(key)**  
  _Rationale:_ Correct: Kerckhoffs's principle holds that only the key should be secret, and vetted algorithms are trusted.
- B. Custom algorithms are always faster and that is dangerous  
  _Rationale:_ Speed is not the reason; lack of public scrutiny is.
- C. Public algorithms cannot be used commercially  
  _Rationale:_ Vetted public algorithms are freely usable.
- D. Home-made algorithms are illegal  
  _Rationale:_ Legality is not the issue; unverified security is.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
