# Java Application Security and Dependency Governance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0859` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Java Application Security and Dependency Governance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply core application-security principles to JVM services
2. Implement authentication, authorization and secret handling
3. Govern dependencies and the software supply chain
4. Harden builds, releases and runtime configuration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Application security fundamentals for the JVM (MASTEMY-DESIGN 25%)

- Worked applications: (1) Threat-model a Spring REST endpoint; (2) Fix a SQL injection with a parameterised query
- Common misconception addressed: Believing an ORM makes injection impossible regardless of how queries are built
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Threat modelling and the OWASP Top 10 | 120 | 7 |
| M01L02 | Input validation, output encoding and injection defence | 120 | 7 |

### M02 Authentication, authorization and secrets (MASTEMY-DESIGN 25%)

- Worked applications: (1) Design role-based access for an admin API; (2) Move a hard-coded credential into a secret store
- Common misconception addressed: Treating a JWT as confidential rather than merely signed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Authn/authz patterns and session handling | 120 | 7 |
| M02L02 | Secret management and secure configuration | 120 | 7 |

### M03 Dependency and supply-chain governance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Generate an SBOM and scan for known CVEs; (2) Triage a transitive CVE and decide upgrade vs mitigate
- Common misconception addressed: Assuming a direct-dependency scan also covers transitive vulnerabilities
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CVEs, SBOMs and dependency scanning | 120 | 7 |
| M03L02 | Vulnerability triage and remediation policy | 120 | 7 |

### M04 Secure build, release and runtime hardening (MASTEMY-DESIGN 25%)

- Worked applications: (1) Sign a release artifact and verify its provenance; (2) Add security headers and disable risky defaults
- Common misconception addressed: Thinking HTTPS alone satisfies all transport-security requirements
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Signing, provenance and reproducible releases | 120 | 7 |
| M04L02 | Runtime hardening and security headers | 120 | 7 |

## Integrative case

A payments service has a flagged transitive CVE, hard-coded database credentials and no release signing. Produce a remediation plan: parameterise a vulnerable query, move secrets to a vault, generate an SBOM, triage the CVE, and sign the release with verifiable provenance.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0859-final-protected | 40 | 48 | yes |
| MST-0859-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Application security fundamentals for the JVM | 10 |
| Authentication, authorization and secrets | 10 |
| Dependency and supply-chain governance | 10 |
| Secure build, release and runtime hardening | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0859-Q0001** (single-answer, Select ONE) A JWT carries a user's roles and is signed with HS256. Why is it unsafe to put a secret API key inside the token's payload?

- A. The payload is only Base64URL-encoded, not encrypted, so anyone can read it **(key)**  
  _Rationale:_ Correct: a signed JWT guarantees integrity, not confidentiality; the claims are readable.
- B. HS256 cannot sign payloads larger than 256 bytes  
  _Rationale:_ HS256 refers to the HMAC-SHA-256 algorithm, not a size limit.
- C. JWTs are automatically encrypted, so keys rotate incorrectly  
  _Rationale:_ A plain JWS is not encrypted; that is the whole point of the risk.
- D. The signature prevents the client from reading any claims  
  _Rationale:_ The signature does not hide claims; clients routinely read them.

**MST-0859-Q0002** (multiple-answer, Select TWO) Which TWO practices meaningfully reduce software supply-chain risk for a Java service? (Select TWO.)

- A. Generating an SBOM and scanning it for known CVEs **(key)**  
  _Rationale:_ Correct: an SBOM enables continuous vulnerability matching.
- B. Pinning and verifying dependency checksums **(key)**  
  _Rationale:_ Correct: checksum verification detects tampered or substituted artifacts.
- C. Only scanning direct dependencies declared in the POM  
  _Rationale:_ Most risk hides in transitive dependencies, which this misses.
- D. Disabling TLS certificate validation to speed up downloads  
  _Rationale:_ That removes a key integrity control and increases risk.

**MST-0859-Q0003** (single-answer, Select ONE) An endpoint builds a query by concatenating user input into a JPA native query string. What is the correct fix?

- A. Use bound parameters (named or positional) instead of string concatenation **(key)**  
  _Rationale:_ Correct: parameter binding separates code from data and stops injection.
- B. HTML-encode the user input before concatenating it  
  _Rationale:_ Output encoding defends against XSS, not SQL injection.
- C. Trust the ORM to sanitise the native query automatically  
  _Rationale:_ Native queries bypass the ORM's safety; the ORM does not sanitise them.
- D. Wrap the query in a try/catch block  
  _Rationale:_ Catching exceptions does not prevent the injection from executing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
