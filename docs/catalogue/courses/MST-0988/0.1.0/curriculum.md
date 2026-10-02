# Terraform: Infrastructure as Code and State Management

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0988` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills course; no external exam outline to verify |
| Legacy IDs | - |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Terraform: Infrastructure as Code and State Management (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Infrastructure as code foundations
2. Configuration language (HCL)
3. State management
4. Dependencies and resources
5. Modules and reuse
6. Workflow and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items check knowledge and applied reasoning only; hands-on performance is taught through instructor-built projects and walkthroughs, not assessed by MCQ/MR.

## Modules

### M01 Infrastructure as code foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Initialise a project and read the plan output; (2) Define a single resource and apply it
- Common misconception addressed: Editing cloud resources by hand and causing config drift
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why IaC; declarative vs imperative | 80 | 6 |
| M01L02 | Providers and the init workflow | 80 | 6 |
| M01L03 | Resources and the plan/apply cycle | 80 | 6 |

### M02 Configuration language (HCL) (MASTEMY-DESIGN 17%)

- Worked applications: (1) Parameterise a resource with input variables; (2) Look up an existing resource with a data source
- Common misconception addressed: Hardcoding values that should be variables
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Variables and outputs | 80 | 6 |
| M02L02 | Expressions and functions | 80 | 6 |
| M02L03 | Data sources | 80 | 6 |

### M03 State management (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure a remote backend with state locking; (2) Inspect state to see tracked resources
- Common misconception addressed: Committing a local state file with secrets into version control
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | What state is and why it matters | 80 | 6 |
| M03L02 | Remote state and locking | 80 | 6 |
| M03L03 | State drift and refresh | 80 | 6 |

### M04 Dependencies and resources (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create several instances with for_each; (2) Force creation order with depends_on
- Common misconception addressed: Assuming Terraform guesses an order it cannot infer
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Implicit and explicit dependencies | 80 | 6 |
| M04L02 | Meta-arguments: count and for_each | 80 | 6 |
| M04L03 | Lifecycle rules | 80 | 6 |

### M05 Modules and reuse (MASTEMY-DESIGN 16%)

- Worked applications: (1) Extract repeated config into a reusable module; (2) Pass outputs from one module into another
- Common misconception addressed: Copy-pasting config instead of using a module
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Writing a module | 80 | 6 |
| M05L02 | Module inputs and outputs | 80 | 6 |
| M05L03 | Composing and versioning modules | 80 | 6 |

### M06 Workflow and operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Review a destructive plan before applying; (2) Separate dev and prod with workspaces or dirs
- Common misconception addressed: Running apply without first reviewing the plan
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Plan review and change safety | 80 | 6 |
| M06L02 | Workspaces and environments | 80 | 6 |
| M06L03 | Collaboration and CI | 80 | 6 |

## Integrative case

Provision cloud infrastructure with Terraform: write declarative configuration, manage providers and variables, understand and protect state, build reusable modules, and run a safe plan-and-apply change workflow.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0988-final-protected | 30 | 30 | yes |
| MST-0988-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Infrastructure as code foundations | 5 |
| Configuration language (HCL) | 5 |
| State management | 5 |
| Dependencies and resources | 5 |
| Modules and reuse | 5 |
| Workflow and operations | 5 |

Minimum reviewed item bank: 528 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0988-Q0001** (single-answer, Select ONE) Why does Terraform keep a state file?

- A. To map real infrastructure to your configuration and detect changes **(key)**  
  _Rationale:_ Correct: state records what Terraform manages so it can compute diffs.
- B. To store your cloud provider password  
  _Rationale:_ State is not a credential store; credentials come from provider configuration.
- C. To compile the configuration into a binary  
  _Rationale:_ Terraform does not compile config to a binary.
- D. To cache documentation locally  
  _Rationale:_ State has nothing to do with documentation.

**MST-0988-Q0002** (single-answer, Select ONE) Which command shows the changes Terraform would make without actually making them?

- A. terraform plan **(key)**  
  _Rationale:_ Correct: plan computes and displays the proposed changes without applying.
- B. terraform apply  
  _Rationale:_ apply executes the changes.
- C. terraform destroy  
  _Rationale:_ destroy tears down managed infrastructure.
- D. terraform init  
  _Rationale:_ init prepares the working directory and downloads providers.

**MST-0988-Q0003** (multiple-answer, Select TWO) Which TWO practices are recommended for Terraform state in a team? (Select TWO)

- A. Store state in a remote backend with locking **(key)**  
  _Rationale:_ Correct: remote state with locking prevents concurrent conflicting applies.
- B. Avoid committing state files containing secrets to version control **(key)**  
  _Rationale:_ Correct: state can hold sensitive values and should not be in a public repo.
- C. Let every engineer keep their own local state copy of shared infra  
  _Rationale:_ Divergent local states cause conflicts and drift.
- D. Edit the state file by hand to fix most problems  
  _Rationale:_ Manual edits are error-prone; use state commands instead.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
