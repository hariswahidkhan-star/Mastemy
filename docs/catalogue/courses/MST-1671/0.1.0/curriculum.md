# Cryptography Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1671` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | n/a (Mastemy skills course; no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; Mastemy skills blueprint |
| Legacy IDs | MST-CYB-SK-CF-002 |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Mastemy Certificate of Completion — Cryptography Fundamentals (module checks >= 75%, final >= 80%) |
| Disclaimer | DISC-SKILLS-02 |

## Learning outcomes

1. Explain the goals of cryptography and the main primitive types
2. Apply symmetric and asymmetric encryption appropriately
3. Use hashing and message authentication correctly
4. Describe digital signatures, certificates and key exchange
5. Recognise common cryptographic mistakes and how to avoid them

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Cryptography foundations (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Match a security goal to the right primitive; (2) Explain why 'encryption' is not a single thing
- Common misconception addressed: Thinking encryption by itself also guarantees integrity
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Confidentiality, integrity and authenticity | 72 | 6 |
| M01L02 | Primitive types at a glance | 72 | 6 |

### M02 Symmetric and asymmetric (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Decide when symmetric vs asymmetric is appropriate; (2) Explain why key distribution differs between them
- Common misconception addressed: Using asymmetric encryption to encrypt large bulk data directly
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Symmetric ciphers and modes | 72 | 6 |
| M02L02 | Public-key cryptography | 72 | 6 |

### M03 Hashing and MACs (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Choose a proper way to store user passwords; (2) Decide when a MAC is needed in addition to encryption
- Common misconception addressed: Storing passwords with a fast, unsalted hash
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cryptographic hashing and salting | 72 | 6 |
| M03L02 | Message authentication codes | 72 | 6 |

### M04 Signatures and certificates (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Explain how a signature proves origin and integrity; (2) Trace how a browser trusts a web server certificate
- Common misconception addressed: Believing a padlock icon alone proves a site is trustworthy
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Digital signatures | 72 | 6 |
| M04L02 | Certificates, PKI and key exchange | 72 | 6 |

### M05 Common mistakes (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Spot a deprecated algorithm in a configuration; (2) Explain the danger of predictable key generation
- Common misconception addressed: Inventing your own cipher instead of using vetted standards
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Weak algorithms and key reuse | 72 | 6 |
| M05L02 | Randomness and implementation errors | 72 | 6 |

## Integrative case

An application stores passwords in plain text and sends data over an unencrypted channel. Choose the right primitive for each need: hash the passwords properly, encrypt data in transit, add integrity protection, and explain how certificates let clients trust the server.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1671-final-protected | 25 | 25 | yes |
| MST-1671-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cryptography foundations | 5 |
| Symmetric and asymmetric | 5 |
| Hashing and MACs | 5 |
| Signatures and certificates | 5 |
| Common mistakes | 5 |

Minimum reviewed item bank: 296 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1671-Q0001** (single-answer, Select ONE) How should user passwords be stored?

- A. Hashed with a slow, salted password-hashing function **(key)**  
  _Rationale:_ Correct: salted, slow hashing resists cracking and precomputation.
- B. Encrypted and decrypted on every login  
  _Rationale:_ Reversible encryption keeps plaintext recoverable if keys leak.
- C. In plain text for easy support  
  _Rationale:_ Plain text exposes all passwords on any breach.
- D. With a single fast unsalted hash  
  _Rationale:_ Fast unsalted hashes are quickly cracked and allow precomputed attacks.

**MST-1671-Q0002** (multiple-answer, Select TWO) Which TWO statements about symmetric and asymmetric cryptography are correct? (Select TWO.)

- A. Symmetric encryption is efficient for bulk data **(key)**  
  _Rationale:_ Correct: symmetric ciphers are fast for large volumes.
- B. Asymmetric cryptography eases key distribution **(key)**  
  _Rationale:_ Correct: public keys can be shared openly, easing distribution.
- C. Asymmetric encryption is ideal for encrypting huge files directly  
  _Rationale:_ Asymmetric is slow; it typically protects a symmetric key instead.
- D. Symmetric keys can be published safely  
  _Rationale:_ A shared secret key must stay confidential.

**MST-1671-Q0003** (single-answer, Select ONE) Why does encryption alone not guarantee that a message was not altered?

- A. Encryption protects confidentiality; integrity needs a MAC or signature **(key)**  
  _Rationale:_ Correct: a separate mechanism is required to detect tampering.
- B. Encrypted data cannot be changed at all  
  _Rationale:_ Ciphertext can still be modified; detection requires integrity checks.
- C. Encryption automatically signs the message  
  _Rationale:_ Encryption and signing are distinct operations.
- D. Integrity is only a concern for plaintext  
  _Rationale:_ Integrity matters regardless of encryption.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
