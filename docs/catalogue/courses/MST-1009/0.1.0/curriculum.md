# Secure Software Development Lifecycle

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1009` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Secure Software Development Lifecycle (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Integrate security activities across every SDLC phase (shift-left)
2. Apply abuse cases, threat modeling and secure design principles
3. Select and use SAST, DAST, SCA and secure review appropriately
4. Operate security gates, vulnerability management and incident response

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Secure SDLC foundations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Add security activities to each phase of an existing SDLC; (2) Write a security requirement that is testable
- Common misconception addressed: Treating security as a final gate rather than a continuous activity
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why security must shift left | 120 | 6 |
| M01L02 | Security in each SDLC phase | 120 | 6 |
| M01L03 | Roles, champions and culture | 120 | 6 |
| M01L04 | Compliance and security requirements | 120 | 6 |

### M02 Requirements and design security (25%, MASTEMY-DESIGN)

- Worked applications: (1) Derive abuse cases from a feature's user stories; (2) Produce a lightweight threat model for a new API
- Common misconception addressed: Skipping design-phase threat modeling and relying on scanning later
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Abuse cases and security requirements | 120 | 6 |
| M02L02 | Threat modeling in design | 120 | 6 |
| M02L03 | Secure design principles | 120 | 6 |
| M02L04 | Privacy and data protection by design | 120 | 6 |

### M03 Implementation and verification (25%, MASTEMY-DESIGN)

- Worked applications: (1) Choose SAST, DAST and SCA for the risks they each catch; (2) Review a code sample for an injection and a secrets flaw
- Common misconception addressed: Assuming one scanning tool type covers all vulnerability classes
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Secure coding standards | 120 | 6 |
| M03L02 | SAST, DAST and SCA | 120 | 6 |
| M03L03 | Secrets and dependency management | 120 | 6 |
| M03L04 | Security code review | 120 | 6 |

### M04 Release, operations and response (25%, MASTEMY-DESIGN)

- Worked applications: (1) Define pass/fail security gates for a pipeline; (2) Prioritise a vulnerability backlog by exploitability and impact
- Common misconception addressed: Patching by severity score alone, ignoring exploitability and exposure
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Security in CI/CD gates | 120 | 6 |
| M04L02 | Vulnerability management and patching | 120 | 6 |
| M04L03 | Logging, monitoring and detection | 120 | 6 |
| M04L04 | Incident response and post-mortems | 120 | 6 |

## Integrative case

A team must embed security into a product delivered every two weeks without blocking releases. Design SDLC security activities, pipeline gates and a vulnerability-management flow, and defend where threat modeling and each scan type belong.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1009-final-protected | 144 | 144 | yes |
| MST-1009-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Secure SDLC foundations | 36 |
| Requirements and design security | 36 |
| Implementation and verification | 36 |
| Release, operations and response | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1009-Q0001** (single-answer, Select ONE) At which point does threat modeling add the most value in the SDLC?

- A. During design, before code is written **(key)**  
  _Rationale:_ Correct: modeling threats in design lets teams remove flaws cheaply before they are built in.
- B. Only after deployment to production  
  _Rationale:_ Post-deployment is the most expensive place to discover design flaws.
- C. During the marketing review  
  _Rationale:_ Marketing review is unrelated to technical threat modeling.
- D. Never; scanning tools make it unnecessary  
  _Rationale:_ Scanners catch implementation bugs, not design-level threats.

**MST-1009-Q0002** (single-answer, Select ONE) Which tool type analyses your third-party and open-source dependencies for known vulnerabilities?

- A. Software composition analysis (SCA) **(key)**  
  _Rationale:_ Correct: SCA inventories dependencies and flags components with known vulnerabilities.
- B. Static application security testing (SAST)  
  _Rationale:_ SAST analyses your own source code, not dependency inventories.
- C. Dynamic application security testing (DAST)  
  _Rationale:_ DAST tests a running application from the outside.
- D. A linter for code style  
  _Rationale:_ A style linter does not track dependency vulnerabilities.

**MST-1009-Q0003** (multiple-answer, Select TWO) Which TWO practices reflect shifting security left? (Select TWO)

- A. Writing testable security requirements during requirements gathering **(key)**  
  _Rationale:_ Correct: defining security needs early makes them part of the build, not an afterthought.
- B. Running SAST automatically on pull requests **(key)**  
  _Rationale:_ Correct: catching code flaws at PR time is earlier and cheaper than post-release.
- C. Performing all security testing only after go-live  
  _Rationale:_ Testing only after go-live is the opposite of shifting left.
- D. Delegating security entirely to an external audit at year end  
  _Rationale:_ An annual external audit alone leaves flaws in place for most of the cycle.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
