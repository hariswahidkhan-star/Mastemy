# HashiCorp Terraform Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0281` v0.1.0 | Batch 4 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | HashiCorp (no affiliation or endorsement) |
| Exam code | not resolved |
| Version basis | unresolved (official source not verified) |
| Evidence | **unverified-needs-official-check** - issuer site EGRESS_BLOCKED on 2026-10-02; domains below are DESIGN ASSUMPTIONS |
| Legacy IDs | MST-PRG-HC-TFA-001 |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain infrastructure-as-code concepts and Terraform's purpose and basics
2. Use the Terraform CLI and the core workflow (write, plan, apply)
3. Interact with modules and manage Terraform state
4. Read, generate and modify configuration and describe HCP Terraform capabilities

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

> Domains, weightings and objectives are DESIGN ASSUMPTIONS. The official issuer page was blocked by the egress proxy (EGRESS_BLOCKED) on 2026-10-02 and third-party sources were not treated as authoritative. Confirm every domain and weighting against the official exam page before authoring.

## Modules

### M01 IaC Concepts and Terraform Basics (weight: design assumption, unverified)

- Worked applications: (1) Explain how a resource dependency graph orders create and destroy operations; (2) Choose IaC over manual provisioning for a repeatable multi-environment build
- Common misconception addressed: Treating Terraform as a configuration-management tool for in-place OS changes
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Infrastructure as code benefits and patterns | 120 | 6 |
| M01L02 | Terraform's purpose vs configuration management | 120 | 6 |
| M01L03 | Providers, resources and the dependency graph | 120 | 6 |

### M02 Terraform CLI and Core Workflow (weight: design assumption, unverified)

- Worked applications: (1) Interpret a plan showing create, update-in-place and replace actions; (2) Use a saved plan file to guarantee apply matches what was reviewed
- Common misconception addressed: Assuming 'apply' re-reads configuration rather than the saved plan
- Module check: 32 items / 32 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | init, plan, apply and destroy | 120 | 6 |
| M02L02 | Formatting, validation and the plan file | 120 | 6 |
| M02L03 | Provider and module installation | 120 | 6 |

### M03 Modules and State (weight: design assumption, unverified)

- Worked applications: (1) Refactor repeated resources into a parameterised module with outputs; (2) Configure remote state with locking and explain why it prevents corruption
- Common misconception addressed: Editing state by hand instead of using state management commands
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Authoring and consuming modules | 120 | 6 |
| M03L02 | Input variables, outputs and versions | 120 | 6 |
| M03L03 | State storage, locking and sensitive data | 120 | 6 |

### M04 Configuration and HCP Terraform (weight: design assumption, unverified)

- Worked applications: (1) Use for_each to create a keyed set of resources that survive reordering; (2) Describe how an HCP Terraform run applies policy and manages state
- Common misconception addressed: Using count where for_each is needed, causing resource recreation on reorder
- Module check: 31 items / 31 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Expressions, functions and meta-arguments | 120 | 6 |
| M04L02 | Dynamic blocks, for_each and count | 120 | 6 |
| M04L03 | HCP Terraform workspaces and run workflow | 120 | 6 |

## Integrative case

A platform engineer standardises environment provisioning: model infrastructure with reusable modules and for_each, manage remote state with locking, review a plan before apply, and move runs into HCP Terraform with policy; justify the workflow and state design.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - official question count/duration not verified (EGRESS_BLOCKED 2026-10-02); confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0281-practice-form-A | 57 | 57 | yes |
| MST-0281-practice-form-B | 57 | 57 | no (optional practice) |
| MST-0281-practice-form-C | 57 | 57 | no (optional practice) |
| MST-0281-final-protected | 57 | 57 | yes |

| Domain | Items per form |
|---|---|
| IaC Concepts and Terraform Basics | 15 |
| Terraform CLI and Core Workflow | 14 |
| Modules and State | 14 |
| Configuration and HCP Terraform | 14 |

Minimum reviewed item bank: 624 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0281-Q0001** (single-answer, Select ONE) A Terraform plan shows a resource must be replaced after you reordered items in a list used with count. Why?

- A. count uses positional indexes, so reordering shifts resource addresses **(key)**  
  _Rationale:_ Correct: count indexes by position, so reordering recreates resources.
- B. Terraform always replaces every resource on each plan  
  _Rationale:_ Terraform replaces only resources whose identity or immutable args change.
- C. The provider was uninstalled  
  _Rationale:_ A missing provider would error, not cause orderly replacement.
- D. State locking failed  
  _Rationale:_ Lock failure prevents the run; it does not cause replacement.

**MST-0281-Q0002** (single-answer, Select ONE) Why configure remote state with locking for a team?

- A. It prevents concurrent applies from corrupting shared state **(key)**  
  _Rationale:_ Correct: locking serialises writes so concurrent applies cannot corrupt state.
- B. It encrypts the provider binary  
  _Rationale:_ Locking concerns state access, not provider binaries.
- C. It removes the need for a plan  
  _Rationale:_ A plan is still the way to preview changes.
- D. It disables variables  
  _Rationale:_ Remote state does not affect variable usage.

**MST-0281-Q0003** (multiple-answer, Select TWO) Which TWO are true about the core Terraform workflow and state? (Select TWO)

- A. A saved plan file lets apply execute exactly what was reviewed **(key)**  
  _Rationale:_ Correct: applying a saved plan guarantees it matches the reviewed plan.
- B. State should be changed with state commands, not hand-edited **(key)**  
  _Rationale:_ Correct: manual state edits risk corruption; state commands are the safe path.
- C. apply re-reads configuration and ignores a saved plan  
  _Rationale:_ Applying a saved plan executes that plan, not a fresh read.
- D. State files never need protection  
  _Rationale:_ State can contain sensitive data and must be protected.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
