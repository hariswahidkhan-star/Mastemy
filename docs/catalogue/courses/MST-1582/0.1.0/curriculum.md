# Infrastructure as Code Patterns

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1582` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Infrastructure as Code Patterns (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. IaC fundamentals and benefits
2. Declarative vs imperative and state
3. Modules, composition and reuse
4. Environments, variables and secrets
5. Testing, validation and policy as code
6. CI/CD for infrastructure and drift

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 IaC fundamentals and benefits (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain how IaC makes an environment reproducible; (2) Identify the benefit lost when changes are made by hand
- Common misconception addressed: Treating a one-off manual change as harmless alongside IaC
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What IaC is and why it matters | 80 | 6 |
| M01L02 | Idempotency and repeatability | 80 | 6 |

### M02 Declarative vs imperative and state (MASTEMY-DESIGN 17%)

- Worked applications: (1) Classify a tool as declarative or imperative; (2) Explain what breaks if the state file is lost
- Common misconception addressed: Editing live infrastructure without updating state
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Declarative vs imperative approaches | 80 | 6 |
| M02L02 | State files and why they matter | 80 | 6 |

### M03 Modules, composition and reuse (MASTEMY-DESIGN 16%)

- Worked applications: (1) Refactor duplicated config into a module; (2) Wire one module's output into another's input
- Common misconception addressed: Copy-pasting config instead of parameterising a module
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Writing reusable modules | 80 | 6 |
| M03L02 | Composing modules and managing inputs/outputs | 80 | 6 |

### M04 Environments, variables and secrets (MASTEMY-DESIGN 16%)

- Worked applications: (1) Promote the same config from staging to production; (2) Keep a secret out of version control
- Common misconception addressed: Committing plaintext secrets into the IaC repository
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Parameterising across environments | 80 | 6 |
| M04L02 | Handling secrets safely | 80 | 6 |

### M05 Testing, validation and policy as code (MASTEMY-DESIGN 17%)

- Worked applications: (1) Catch a bad change in a plan before applying it; (2) Write a policy that blocks an open security group
- Common misconception addressed: Applying changes without reviewing the plan first
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Linting, validation and plan review | 80 | 6 |
| M05L02 | Policy as code and guardrails | 80 | 6 |

### M06 CI/CD for infrastructure and drift (MASTEMY-DESIGN 18%)

- Worked applications: (1) Design a pipeline that plans then applies on merge; (2) Detect drift and decide how to reconcile it
- Common misconception addressed: Letting manual drift accumulate until applies fail
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Pipelines for infrastructure changes | 80 | 6 |
| M06L02 | Detecting and reconciling drift | 80 | 6 |

## Integrative case

Build the IaC for a two-environment web stack: write a reusable module, parameterise it for staging and production while keeping secrets out of version control, run lint and plan review with a policy gate against open security groups, deliver changes through a plan-then-apply pipeline, and detect and reconcile drift.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1582-final-protected | 30 | 30 | yes |
| MST-1582-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IaC fundamentals and benefits | 5 |
| Declarative vs imperative and state | 5 |
| Modules, composition and reuse | 5 |
| Environments, variables and secrets | 5 |
| Testing, validation and policy as code | 5 |
| CI/CD for infrastructure and drift | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1582-Q0001** (single-answer, Select ONE) Why does a manual, out-of-band change to infrastructure managed by IaC cause problems?

- A. It creates drift, so the real environment no longer matches the code and state **(key)**  
  _Rationale:_ Correct: out-of-band changes cause drift that can break later applies and reproducibility.
- B. It permanently deletes the IaC tool  
  _Rationale:_ A manual change does not remove the tool.
- C. It makes the code run faster  
  _Rationale:_ Speed is unrelated; the issue is drift.
- D. It has no effect because IaC ignores reality  
  _Rationale:_ IaC compares to real state, so the change does matter.

**MST-1582-Q0002** (multiple-answer, Select ALL that apply) Which two practices keep secrets safe when using infrastructure as code? (Select TWO)

- A. Storing secrets in a dedicated secrets manager referenced at apply time **(key)**  
  _Rationale:_ Correct: a secrets manager keeps secrets out of the repo and controls access.
- B. Keeping secrets out of the version-controlled configuration files **(key)**  
  _Rationale:_ Correct: secrets committed to a repo are exposed to everyone with access.
- C. Hard-coding the production password in the main config file  
  _Rationale:_ Hard-coded secrets in the repo are a serious exposure.
- D. Emailing the secret to the whole team for convenience  
  _Rationale:_ Broad distribution by email increases exposure.

**MST-1582-Q0003** (single-answer, Select ONE) What is the main purpose of reviewing the plan (proposed changes) before applying IaC?

- A. To see exactly what will change and catch unintended or destructive actions first **(key)**  
  _Rationale:_ Correct: plan review surfaces unintended changes before they reach the environment.
- B. To permanently freeze the infrastructure  
  _Rationale:_ A plan does not freeze anything; it previews changes.
- C. To generate random configuration values  
  _Rationale:_ Plans show intended changes, not random values.
- D. To delete the state file safely  
  _Rationale:_ Plan review is not about deleting state.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
