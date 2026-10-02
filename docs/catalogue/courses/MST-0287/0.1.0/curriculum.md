# GIAC Cloud Security Automation: GCSA

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0287` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | GIAC (no affiliation or endorsement) |
| Exam code | unresolved - not published in catalog |
| Version basis | unresolved - needs official-source verification |
| Evidence | **unverified-needs-official-check** - issuer egress blocked 2026-10-02; official domains/weights/objective IDs/item counts/codes NOT verified |
| Legacy IDs | none |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 72 / module checks 108 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

> **Modules below are Mastemy design groupings, not a reproduction of the official blueprint.** The official syllabus could not be fetched (issuer network egress blocked on 2026-10-02); domain names, weightings, objective IDs, item counts, exam codes and durations are **not verified**.

## Learning outcomes

1. Describe DevSecOps principles and secure pipelines
2. Automate security in cloud infrastructure as code
3. Integrate security testing and secrets management into CI/CD
4. Apply continuous monitoring and compliance as code

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: This preparation assesses knowledge and applied reasoning through MCQ/MR only; it does not reproduce the official exam's hands-on, performance-based or non-MCQ item formats.

## Modules

### M01 DevSecOps and secure pipelines (not published - design grouping)

- Worked applications: (1) Place security gates at the right CI/CD stages; (2) Explain shift-left for a sample workflow
- Common misconception addressed: Treating security as a final gate rather than throughout the pipeline
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | DevSecOps principles and culture | 100 | 6 |
| M01L02 | Secure software delivery pipelines | 100 | 6 |
| M01L03 | Shift-left security testing | 100 | 6 |
| M01L04 | Threat modelling in delivery | 100 | 6 |

### M02 Infrastructure as code and cloud automation (not published - design grouping)

- Worked applications: (1) Add a policy-as-code guardrail to an IaC plan; (2) Detect drift between declared and actual cloud state
- Common misconception addressed: Assuming IaC is secure simply because it is automated
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Infrastructure as code fundamentals | 100 | 6 |
| M02L02 | Securing IaC and policy as code | 100 | 6 |
| M02L03 | Immutable infrastructure and hardening | 100 | 6 |
| M02L04 | Cloud identity and access automation | 100 | 6 |

### M03 Pipeline security testing and monitoring (not published - design grouping)

- Worked applications: (1) Wire SAST, SCA and secret scanning into CI; (2) Build a compliance-as-code check for a control
- Common misconception addressed: Believing passing automated scans proves full compliance
- Module check: 36 items / 36 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | SAST, DAST and software composition analysis | 100 | 6 |
| M03L02 | Secrets management in pipelines | 100 | 6 |
| M03L03 | Container and image security scanning | 100 | 6 |
| M03L04 | Continuous monitoring and compliance as code | 100 | 6 |

## Integrative case

A platform team builds a secure delivery pipeline: embed security checks into CI/CD, provision cloud infrastructure as code with guardrails, manage secrets automatically, and enforce compliance and monitoring as code.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the official exam's question count and duration are not verified (issuer egress blocked); confirm on the official exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0287-practice-form-A | 45 | 45 | yes |
| MST-0287-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0287-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0287-final-protected | 45 | 45 | yes |

| Domain (design grouping) | Items per form |
|---|---|
| DevSecOps and secure pipelines | 15 |
| Infrastructure as code and cloud automation | 15 |
| Pipeline security testing and monitoring | 15 |

Minimum reviewed item bank: 540 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0287-Q0001** (single-answer, Select ONE) What does 'shift-left' mean in a DevSecOps pipeline?

- A. Introducing security activities earlier in the development lifecycle **(key)**  
  _Rationale:_ Correct: shift-left moves security testing and review earlier, closer to coding.
- B. Moving all servers to the left data centre  
  _Rationale:_ Shift-left is a process concept, not a physical relocation.
- C. Deploying only after the project ends  
  _Rationale:_ That delays, rather than shifts security earlier.
- D. Removing security reviews entirely  
  _Rationale:_ Shift-left adds earlier security, it does not remove it.

**MST-0287-Q0002** (single-answer, Select ONE) What problem does policy as code primarily address for infrastructure as code?

- A. Automatically enforcing security and compliance rules on infrastructure definitions **(key)**  
  _Rationale:_ Correct: policy as code checks IaC against rules before provisioning.
- B. Writing application unit tests  
  _Rationale:_ Unit tests validate application logic, not infrastructure policy.
- C. Designing a user interface  
  _Rationale:_ UI design is unrelated to policy as code.
- D. Replacing the need for any cloud provider  
  _Rationale:_ Policy as code governs infrastructure; it does not replace providers.

**MST-0287-Q0003** (multiple-answer, Select TWO) Select TWO security tests commonly automated inside a CI/CD pipeline.

- A. Static application security testing (SAST) **(key)**  
  _Rationale:_ Correct: SAST analyses source code for vulnerabilities in CI.
- B. Software composition analysis (SCA) for dependencies **(key)**  
  _Rationale:_ Correct: SCA flags known-vulnerable third-party components.
- C. Repainting the office walls  
  _Rationale:_ This is not a software security test.
- D. Manually emailing code to each developer  
  _Rationale:_ This is not an automated security test.
- E. Disabling all logging during builds  
  _Rationale:_ Disabling logging reduces visibility and is not a security test.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
