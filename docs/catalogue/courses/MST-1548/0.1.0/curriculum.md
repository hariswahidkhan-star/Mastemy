# Cryptography for Developers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1548` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-CD-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Cryptography for Developers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Cryptography foundations
2. Symmetric encryption
3. Hash functions and MACs
4. Password storage
5. Asymmetric cryptography
6. Key exchange and TLS
7. Protocols and tokens
8. Common pitfalls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on applied cryptography for software developers; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Cryptography foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Map confidentiality/integrity/authenticity to concrete controls; (2) Choose a CSPRNG over a general PRNG for a token
- Common misconception addressed: Confusing encoding (Base64) with encryption
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Security goals and threat models | 75 | 5 |
| M01L02 | Randomness and entropy | 75 | 5 |

### M02 Symmetric encryption (MASTEMY-DESIGN 13%)

- Worked applications: (1) Encrypt a message with AES-GCM and a unique nonce; (2) Explain why ECB mode leaks patterns
- Common misconception addressed: Reusing a nonce with the same key in GCM
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Block ciphers and modes | 75 | 5 |
| M02L02 | Authenticated encryption (AES-GCM) | 75 | 5 |

### M03 Hash functions and MACs (MASTEMY-DESIGN 12%)

- Worked applications: (1) Verify a download with a SHA-256 hash; (2) Authenticate an API body with HMAC
- Common misconception addressed: Using a plain hash where a MAC is required
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Cryptographic hashes and properties | 75 | 5 |
| M03L02 | HMAC and message integrity | 75 | 5 |

### M04 Password storage (MASTEMY-DESIGN 13%)

- Worked applications: (1) Hash a password with bcrypt and a per-user salt; (2) Tune Argon2 cost parameters
- Common misconception addressed: Storing passwords with fast hashes like MD5/SHA-1
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Salting and slow hashes | 75 | 5 |
| M04L02 | Argon2, bcrypt and scrypt | 75 | 5 |

### M05 Asymmetric cryptography (MASTEMY-DESIGN 12%)

- Worked applications: (1) Sign a message and verify the signature; (2) Choose ECDSA vs RSA for a constrained device
- Common misconception addressed: Thinking signing is the same as encrypting
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | RSA and elliptic-curve basics | 75 | 5 |
| M05L02 | Digital signatures | 75 | 5 |

### M06 Key exchange and TLS (MASTEMY-DESIGN 13%)

- Worked applications: (1) Trace a TLS handshake's key agreement; (2) Explain forward secrecy to a stakeholder
- Common misconception addressed: Assuming TLS alone authenticates the application user
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Diffie-Hellman and forward secrecy | 75 | 5 |
| M06L02 | How TLS composes primitives | 75 | 5 |

### M07 Protocols and tokens (MASTEMY-DESIGN 12%)

- Worked applications: (1) Validate a signed JWT's claims and expiry; (2) Explain certificate chains of trust
- Common misconception addressed: Trusting the alg header of a JWT without pinning it
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | JWTs and session tokens | 75 | 5 |
| M07L02 | Certificates and PKI | 75 | 5 |

### M08 Common pitfalls (MASTEMY-DESIGN 12%)

- Worked applications: (1) Use a constant-time comparison for tokens; (2) Adopt a vetted library instead of rolling your own
- Common misconception addressed: Writing custom cryptography primitives from scratch
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Side channels and timing attacks | 75 | 5 |
| M08L02 | Crypto-misuse and secure defaults | 75 | 5 |

## Integrative case

For a web application that stores user passwords and exchanges API messages, choose a password-hashing scheme, an authenticated-encryption mode, and a key-exchange approach, then justify each choice against a stated threat model and identify one misuse to avoid.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1548-final-protected | 40 | 40 | yes |
| MST-1548-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Cryptography foundations | 5 |
| Symmetric encryption | 5 |
| Hash functions and MACs | 5 |
| Password storage | 5 |
| Asymmetric cryptography | 5 |
| Key exchange and TLS | 5 |
| Protocols and tokens | 5 |
| Common pitfalls | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1548-Q0001** (single-answer, Select ONE) Why must a unique nonce be used for each AES-GCM encryption under the same key?

- A. Nonce reuse under one key breaks confidentiality and allows forging authentication tags **(key)**  
  _Rationale:_ Correct: GCM nonce reuse is catastrophic, leaking the authentication key material.
- B. It makes encryption faster  
  _Rationale:_ Nonce uniqueness is about security, not speed.
- C. It is only needed when the key is weak  
  _Rationale:_ Reuse is dangerous regardless of key strength.
- D. Nonces are optional in GCM  
  _Rationale:_ GCM requires a nonce per message.

**MST-1548-Q0002** (single-answer, Select ONE) Why are bcrypt, scrypt and Argon2 preferred over SHA-256 for password storage?

- A. They are deliberately slow and tunable, resisting brute-force and GPU attacks **(key)**  
  _Rationale:_ Correct: adjustable work factors slow attackers down.
- B. They are faster than SHA-256  
  _Rationale:_ They are intentionally slower, which is the point.
- C. They do not require a salt  
  _Rationale:_ They still use salts; slowness is the differentiator.
- D. They produce shorter hashes  
  _Rationale:_ Output length is not the security property here.

**MST-1548-Q0003** (multiple-answer, Select ALL that apply) Which statements about HMAC are correct? (Select TWO)

- A. It provides integrity and authenticity using a shared secret key **(key)**  
  _Rationale:_ Correct: HMAC binds a message to a key holder.
- B. It is stronger than a bare hash for verifying a message came from a key holder **(key)**  
  _Rationale:_ Correct: a plain hash offers no authenticity.
- C. It encrypts the message so it cannot be read  
  _Rationale:_ False; HMAC does not provide confidentiality.
- D. It eliminates the need for a secret key  
  _Rationale:_ False; the shared secret is essential to HMAC.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
