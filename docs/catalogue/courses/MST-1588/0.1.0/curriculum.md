# DevSecOps

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1588` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-D-002 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — DevSecOps (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. DevSecOps foundations
2. Threat awareness
3. Secrets management
4. Static analysis
5. Dependency security
6. Container and IaC security
7. Dynamic and runtime
8. Policy and gates

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on integrating security into DevOps (DevSecOps); practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 DevSecOps foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Explain shift-left in a pipeline; (2) Assign security responsibility across the team
- Common misconception addressed: Treating security as a final gate owned by one team
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Shifting security left | 60 | 5 |
| M01L02 | Shared responsibility for security | 60 | 5 |

### M02 Threat awareness (MASTEMY-DESIGN 13%)

- Worked applications: (1) Sketch a simple threat model for a service; (2) Prioritise findings by risk, not count
- Common misconception addressed: Trying to fix every finding regardless of severity
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Thinking like an attacker | 60 | 5 |
| M02L02 | Risk-based prioritisation | 60 | 5 |

### M03 Secrets management (MASTEMY-DESIGN 12%)

- Worked applications: (1) Move a hardcoded key into a secret store; (2) Add secret scanning to the pipeline
- Common misconception addressed: Committing credentials and rotating them 'later'
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Avoiding hardcoded secrets | 60 | 5 |
| M03L02 | Secret scanning and vaults | 60 | 5 |

### M04 Static analysis (MASTEMY-DESIGN 13%)

- Worked applications: (1) Run SAST on each pull request; (2) Triage a false positive vs real issue
- Common misconception addressed: Ignoring SAST output because of noise
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | SAST in the pipeline | 60 | 5 |
| M04L02 | Triaging SAST findings | 60 | 5 |

### M05 Dependency security (MASTEMY-DESIGN 12%)

- Worked applications: (1) Scan dependencies for known CVEs; (2) Generate an SBOM for a build
- Common misconception addressed: Pinning to a version with a known critical CVE
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Software composition analysis (SCA) | 60 | 5 |
| M05L02 | Vulnerable dependencies and SBOM | 60 | 5 |

### M06 Container and IaC security (MASTEMY-DESIGN 13%)

- Worked applications: (1) Scan an image for vulnerable packages; (2) Lint IaC for insecure defaults
- Common misconception addressed: Running containers as root with no scanning
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Scanning container images | 60 | 5 |
| M06L02 | Infrastructure-as-code scanning | 60 | 5 |

### M07 Dynamic and runtime (MASTEMY-DESIGN 12%)

- Worked applications: (1) Run a DAST scan against a staging app; (2) Set up a basic runtime alert
- Common misconception addressed: Assuming pre-deploy scanning covers runtime threats
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | DAST basics | 60 | 5 |
| M07L02 | Runtime monitoring and response | 60 | 5 |

### M08 Policy and gates (MASTEMY-DESIGN 12%)

- Worked applications: (1) Fail a build on a critical finding; (2) Set a risk-based exception process
- Common misconception addressed: Gating on every low-severity finding and blocking delivery
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Build-failing policies | 60 | 5 |
| M08L02 | Balancing speed and security | 60 | 5 |

## Integrative case

Add security to a CI/CD pipeline: shift testing left with SAST, SCA and secret scanning, manage secrets properly, scan containers and IaC, and set policy gates that fail builds on critical findings without blocking the team unnecessarily.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1588-final-protected | 40 | 40 | yes |
| MST-1588-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| DevSecOps foundations | 5 |
| Threat awareness | 5 |
| Secrets management | 5 |
| Static analysis | 5 |
| Dependency security | 5 |
| Container and IaC security | 5 |
| Dynamic and runtime | 5 |
| Policy and gates | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1588-Q0001** (single-answer, Select ONE) What does 'shifting security left' mean in DevSecOps?

- A. Moving security checks earlier into development and the pipeline rather than only before release **(key)**  
  _Rationale:_ Correct: earlier feedback is cheaper and faster to fix.
- B. Delaying all security testing until production  
  _Rationale:_ That is shifting right, the opposite.
- C. Assigning security to a single gatekeeper team  
  _Rationale:_ Shift-left shares responsibility.
- D. Disabling automated scans to move faster  
  _Rationale:_ That removes security, not shifts it left.

**MST-1588-Q0002** (single-answer, Select ONE) What is the purpose of Software Composition Analysis (SCA) in a pipeline?

- A. Detecting known vulnerabilities in third-party and open-source dependencies **(key)**  
  _Rationale:_ Correct: SCA inventories dependencies and flags known CVEs.
- B. Scanning your own source code for logic bugs  
  _Rationale:_ That is SAST, not SCA.
- C. Testing a running application from the outside  
  _Rationale:_ That is DAST.
- D. Encrypting network traffic  
  _Rationale:_ Unrelated to SCA.

**MST-1588-Q0003** (multiple-answer, Select ALL that apply) Which practices make security gates sustainable in CI/CD? (Select TWO)

- A. Fail builds on critical/high findings while triaging lower-severity ones **(key)**  
  _Rationale:_ Correct: risk-based gating protects without blocking everything.
- B. Scan for committed secrets automatically on every change **(key)**  
  _Rationale:_ Correct: catching secrets early prevents leaks.
- C. Block the build on every low-severity informational finding  
  _Rationale:_ False; that stalls delivery and breeds alert fatigue.
- D. Store secrets in the repository for convenience  
  _Rationale:_ False; secrets must stay out of source control.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
