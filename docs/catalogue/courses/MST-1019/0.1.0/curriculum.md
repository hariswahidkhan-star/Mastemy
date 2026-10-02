# Software Supply-Chain Security and SBOM Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1019` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Software Supply-Chain Security and SBOM Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Supply-chain threat landscape
2. Dependency and artifact management
3. SBOM formats and generation
4. Provenance, signing and attestation
5. Vulnerability and license scanning in the pipeline
6. Policy, governance and incident response

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Supply-chain threat landscape (MASTEMY-DESIGN 16%)

- Worked applications: (1) Map one real attack pattern to a defence; (2) Trace a transitive dependency to its direct parent
- Common misconception addressed: Thinking only your own code is part of your attack surface
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How software supply chains are attacked | 80 | 6 |
| M01L02 | Dependencies, transitive risk and typosquatting | 80 | 6 |

### M02 Dependency and artifact management (MASTEMY-DESIGN 17%)

- Worked applications: (1) Pin a dependency and explain why a lockfile helps; (2) Choose a trusted internal registry over a public pull
- Common misconception addressed: Believing 'latest' is safer because it is newest
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Pinning, lockfiles and reproducible builds | 80 | 6 |
| M02L02 | Artifact registries and trusted sources | 80 | 6 |

### M03 SBOM formats and generation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Generate an SBOM for a small project; (2) Read an SBOM to list a project's components
- Common misconception addressed: Treating an SBOM as a one-time document rather than a living artefact
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | What an SBOM is and why it matters | 80 | 6 |
| M03L02 | SPDX and CycloneDX formats and generation | 80 | 6 |

### M04 Provenance, signing and attestation (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain what build provenance proves; (2) Verify a signed artifact before deployment
- Common misconception addressed: Assuming a signature proves the code is free of vulnerabilities
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Provenance and the SLSA levels | 80 | 6 |
| M04L02 | Signing and verifying artifacts (e.g. Sigstore) | 80 | 6 |

### M05 Vulnerability and license scanning in the pipeline (MASTEMY-DESIGN 17%)

- Worked applications: (1) Fail a build on a critical dependency CVE; (2) Flag an incompatible license in a dependency
- Common misconception addressed: Scanning only at release instead of on every change
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Scanning dependencies for known vulnerabilities | 80 | 6 |
| M05L02 | License compliance and policy gates | 80 | 6 |

### M06 Policy, governance and incident response (MASTEMY-DESIGN 18%)

- Worked applications: (1) Write a policy that blocks unsigned artifacts; (2) Plan the response to a newly disclosed dependency compromise
- Common misconception addressed: Having no plan for when a trusted dependency turns malicious
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Supply-chain policy and guardrails | 80 | 6 |
| M06L02 | Responding to a compromised dependency | 80 | 6 |

## Integrative case

Secure the supply chain of a service: pin dependencies with a lockfile and a trusted registry, generate and read an SBOM, verify build provenance and signed artifacts before deploy, add pipeline gates for vulnerable and incompatibly-licensed dependencies, then write the policy and the response plan for a compromised dependency.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1019-final-protected | 30 | 30 | yes |
| MST-1019-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Supply-chain threat landscape | 5 |
| Dependency and artifact management | 5 |
| SBOM formats and generation | 5 |
| Provenance, signing and attestation | 5 |
| Vulnerability and license scanning in the pipeline | 5 |
| Policy, governance and incident response | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1019-Q0001** (single-answer, Select ONE) What does a Software Bill of Materials (SBOM) primarily provide?

- A. An inventory of the components and dependencies that make up the software **(key)**  
  _Rationale:_ Correct: an SBOM lists components so you can answer 'are we affected?' quickly.
- B. A guarantee that the software has no vulnerabilities  
  _Rationale:_ An SBOM lists components; it does not certify them vulnerability-free.
- C. The source code of every dependency  
  _Rationale:_ An SBOM is an inventory, not the code itself.
- D. A signed legal contract with each vendor  
  _Rationale:_ It is a technical inventory, not a contract.

**MST-1019-Q0002** (multiple-answer, Select ALL that apply) Which two practices reduce the risk of pulling a malicious or unexpected dependency version? (Select TWO)

- A. Pinning versions with a lockfile **(key)**  
  _Rationale:_ Correct: pinning prevents unexpected version changes between builds.
- B. Verifying artifact signatures before use **(key)**  
  _Rationale:_ Correct: signature verification confirms the artifact's origin and integrity.
- C. Always installing the floating 'latest' tag  
  _Rationale:_ Floating tags invite unexpected and potentially malicious updates.
- D. Disabling all dependency scanning to speed builds  
  _Rationale:_ Disabling scanning removes a key safeguard.

**MST-1019-Q0003** (single-answer, Select ONE) A dependency is cryptographically signed and the signature verifies. What does this establish?

- A. That the artifact came from the expected signer and was not altered in transit **(key)**  
  _Rationale:_ Correct: signing proves origin and integrity, not absence of vulnerabilities.
- B. That the dependency contains no security vulnerabilities  
  _Rationale:_ A valid signature says nothing about vulnerabilities in the code.
- C. That the dependency has an open-source license  
  _Rationale:_ Signing does not determine licensing.
- D. That the dependency will never need updating  
  _Rationale:_ Signed code still needs updates and scanning.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
