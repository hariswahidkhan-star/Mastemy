# Terraform Fundamentals

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1581` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain infrastructure as code and Terraform's model
2. Write configurations with resources, variables and outputs
3. Manage state safely including remote backends
4. Use providers, data sources and modules
5. Apply the plan/apply workflow and dependency graph
6. Follow practices for collaboration, security and reuse

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 IaC and Terraform model (MASTEMY-DESIGN 20%)

- Worked applications: (1) Describe desired state for a resource; (2) Explain how Terraform builds its graph
- Common misconception addressed: Treating Terraform like a sequence of imperative scripts
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Infrastructure as code principles | 168 | 8 |
| M01L02 | Declarative config and the resource graph | 168 | 8 |

### M02 Configuration language (MASTEMY-DESIGN 20%)

- Worked applications: (1) Parameterise a resource with variables; (2) Use count/for_each for repetition
- Common misconception addressed: Hard-coding values that should be variables
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Resources, variables and outputs | 168 | 8 |
| M02L02 | Expressions, functions and meta-arguments | 168 | 8 |

### M03 State management (MASTEMY-DESIGN 20%)

- Worked applications: (1) Configure a remote backend with locking; (2) Detect and reconcile drift
- Common misconception addressed: Committing state files with secrets to version control
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Local vs remote state | 168 | 8 |
| M03L02 | Locking, drift and sensitive data | 168 | 8 |

### M04 Providers, data sources and modules (MASTEMY-DESIGN 20%)

- Worked applications: (1) Look up an existing resource with a data source; (2) Refactor repeated config into a module
- Common misconception addressed: Copy-pasting config instead of using modules
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Providers and data sources | 168 | 8 |
| M04L02 | Writing and consuming modules | 168 | 8 |

### M05 Workflow and practices (MASTEMY-DESIGN 20%)

- Worked applications: (1) Review a plan before applying; (2) Pin provider and module versions
- Common misconception addressed: Running apply without reviewing the plan
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Plan, apply and destroy safely | 168 | 8 |
| M05L02 | Collaboration, versioning and security | 168 | 8 |

## Integrative case

Provision a small cloud environment with Terraform: structure variables and outputs, use a module, configure a remote state backend with locking, and review a plan before applying a change safely.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1581-final-protected | 25 | 25 | yes |
| MST-1581-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| IaC and Terraform model | 5 |
| Configuration language | 5 |
| State management | 5 |
| Providers, data sources and modules | 5 |
| Workflow and practices | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1581-Q0001** (single-answer, Select ONE) Why review the output of terraform plan before applying?

- A. It shows the changes Terraform will make so you can catch unintended ones **(key)**  
  _Rationale:_ Correct: plan previews create/update/destroy actions.
- B. It applies the changes immediately  
  _Rationale:_ plan does not apply; apply does.
- C. It deletes the state file  
  _Rationale:_ plan does not touch state destructively.
- D. It is required to format the code  
  _Rationale:_ Formatting is a separate command.

**MST-1581-Q0002** (multiple-answer, Select TWO) Which TWO are good state-management practices? (Select TWO.)

- A. Use a remote backend with state locking for teams **(key)**  
  _Rationale:_ Correct: remote state with locking prevents concurrent corruption.
- B. Keep state out of plain version control because it can hold secrets **(key)**  
  _Rationale:_ Correct: state may contain sensitive values.
- C. Email the state file around to share it  
  _Rationale:_ That leaks secrets and causes drift.
- D. Edit state by hand as the normal workflow  
  _Rationale:_ Manual edits are error-prone and avoided.

**MST-1581-Q0003** (single-answer, Select ONE) What is the main benefit of a Terraform module?

- A. Reusable, parameterised grouping of resources **(key)**  
  _Rationale:_ Correct: modules package reusable configuration.
- B. It stores cloud credentials  
  _Rationale:_ Modules do not store credentials.
- C. It replaces the need for providers  
  _Rationale:_ Providers are still required.
- D. It runs apply automatically on a schedule  
  _Rationale:_ Modules do not schedule applies.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
