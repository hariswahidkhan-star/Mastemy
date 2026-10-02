# Mobile App Security

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1563` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-SK-MAS-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Mobile App Security (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the mobile threat model and attack surface
2. Describe storing sensitive data safely on a device
3. Explain protecting data in transit and authenticating servers
4. Describe authentication, biometrics and platform security features
5. Explain code protections, dependency risk and a secure development lifecycle

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Mobile threat landscape (MASTEMY-DESIGN 20%)

- Worked applications: (1) Map a feature to the mobile risks it introduces; (2) Build a short threat model for a banking feature
- Common misconception addressed: Assuming the app store review makes an app secure
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Device, network and app attack surface | 120 | 8 |
| M01L02 | Mobile risk categories and threat modelling | 120 | 8 |

### M02 Secure data storage (MASTEMY-DESIGN 20%)

- Worked applications: (1) Decide where three secrets should be stored; (2) Fix an app that logs a token to disk
- Common misconception addressed: Believing app-private storage is safe on a rooted or jailbroken device
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Keystores, keychains and secure storage | 120 | 8 |
| M02L02 | What must never be stored and encryption at rest | 120 | 8 |

### M03 Secure communication (MASTEMY-DESIGN 20%)

- Worked applications: (1) Diagnose why disabling certificate checks is dangerous; (2) Design safe handling for an access and refresh token
- Common misconception addressed: Thinking HTTPS alone with disabled validation still protects traffic
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | TLS, certificate validation and pinning | 120 | 8 |
| M03L02 | API authentication and token handling | 120 | 8 |

### M04 Authentication and platform protections (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose an auth flow for a mobile client; (2) Decide which permissions a feature genuinely needs
- Common misconception addressed: Treating biometrics as a replacement for server-side authorisation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Authentication flows and biometrics | 120 | 8 |
| M04L02 | Platform permissions and app hardening | 120 | 8 |

### M05 Hardening and the secure lifecycle (MASTEMY-DESIGN 20%)

- Worked applications: (1) Prioritise hardening measures for a release; (2) Add a security check to the build pipeline
- Common misconception addressed: Believing client-side obfuscation can keep a secret truly secret
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Obfuscation, tampering and reverse engineering | 120 | 8 |
| M05L02 | Dependencies, testing and the secure SDLC | 120 | 8 |

## Integrative case

A fintech app handles tokens, personal data and payments on mobile. Build a threat model, decide where each secret is stored, secure communication with proper certificate validation and token handling, choose an authentication flow, and plan hardening and security checks for the release. Justify each decision against the threats.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1563-final-protected | 40 | 40 | yes |
| MST-1563-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Mobile threat landscape | 8 |
| Secure data storage | 8 |
| Secure communication | 8 |
| Authentication and platform protections | 8 |
| Hardening and the secure lifecycle | 8 |

Minimum reviewed item bank: 450 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1563-Q0001** (single-answer, Select ONE) A mobile app disables TLS certificate validation 'to make development easier' and ships that way. Why is this dangerous?

- A. It lets an attacker intercept and alter traffic via a man-in-the-middle, defeating HTTPS protection **(key)**  
  _Rationale:_ Correct: without certificate validation the client will trust an attacker's certificate, exposing all traffic.
- B. It only slows the app down slightly  
  _Rationale:_ The issue is a serious confidentiality and integrity breach, not speed.
- C. It improves security by skipping checks  
  _Rationale:_ Skipping validation removes protection; it does not improve security.
- D. It has no effect because HTTPS is used  
  _Rationale:_ HTTPS with disabled validation provides no real protection.

**MST-1563-Q0002** (multiple-answer, Select TWO) Which TWO are sound practices for storing sensitive data on a mobile device? (Select TWO.)

- A. Store secrets in the platform keystore or keychain rather than plain files **(key)**  
  _Rationale:_ Correct: platform secure storage is designed to protect keys and secrets.
- B. Avoid logging tokens or credentials to disk **(key)**  
  _Rationale:_ Correct: tokens written to logs or disk can be read by other processes or attackers.
- C. Hard-code an API secret in the app binary  
  _Rationale:_ Secrets in the binary can be extracted by reverse engineering.
- D. Save passwords in plain text for convenience  
  _Rationale:_ Plain-text passwords are trivially compromised.

**MST-1563-Q0003** (single-answer, Select ONE) A team relies on client-side obfuscation to keep an embedded API key secret. What is the correct understanding?

- A. Obfuscation raises the effort but cannot keep a client-side secret truly secret; secrets belong server-side **(key)**  
  _Rationale:_ Correct: anything shipped to the client can be extracted; real secrets must stay on the server.
- B. Obfuscation makes the key mathematically impossible to recover  
  _Rationale:_ Obfuscation only delays analysis; it does not make recovery impossible.
- C. A client-side key is as safe as a server-side one  
  _Rationale:_ Client-side secrets are inherently exposed, unlike server-side ones.
- D. Obfuscation removes the need for server authorisation  
  _Rationale:_ Server-side authorisation is still required regardless of obfuscation.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
