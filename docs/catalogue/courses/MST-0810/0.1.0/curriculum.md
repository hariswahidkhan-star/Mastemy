# Claude Code + Terraform + AWS: Governed Infrastructure Changes

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0810` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Claude Code + Terraform + AWS: Governed Infrastructure Changes (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope governed infrastructure changes with approval and blast-radius review
2. Use Terraform state, plan and apply with modules and variables
3. Use Claude Code to draft and review infrastructure configuration
4. Provision AWS resources under least-privilege IAM
5. Apply changes safely with review, rollback and change records

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Governed change scope (MASTEMY-DESIGN 20%)

- Worked applications: (1) Define an approval gate for a production infrastructure change; (2) Estimate the blast radius of a proposed change
- Common misconception addressed: Treating an AI-suggested change as pre-approved for production
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Why infrastructure changes need governance | 120 | 7 |
| M01L02 | Review, approval and blast radius | 120 | 7 |

### M02 Terraform fundamentals for change (MASTEMY-DESIGN 20%)

- Worked applications: (1) Read a terraform plan and explain what it will change; (2) Parameterise an environment with variables and a module
- Common misconception addressed: Running apply without reviewing the plan output
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | State, plan and apply | 120 | 7 |
| M02L02 | Modules and variables | 120 | 7 |

### M03 Claude Code assisted authoring (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use Claude Code to draft a resource and explain each argument; (2) Review AI-generated HCL for drift from policy
- Common misconception addressed: Accepting AI-written HCL without reading the plan it produces
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Generating and explaining HCL | 120 | 7 |
| M03L02 | Reviewing AI-written configuration | 120 | 7 |

### M04 AWS resources and least privilege (MASTEMY-DESIGN 20%)

- Worked applications: (1) Scope an IAM policy to only the resources the change touches; (2) Choose the AWS service settings the workload needs
- Common misconception addressed: Attaching broad administrator permissions to run a small change
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Core AWS services and IAM | 120 | 7 |
| M04L02 | Scoping permissions to the change | 120 | 7 |

### M05 Safe apply and rollback (MASTEMY-DESIGN 20%)

- Worked applications: (1) Gate apply behind a reviewed plan and a human approval; (2) Document a rollback path before applying
- Common misconception addressed: Applying a change with no rollback plan or record
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Plan review, apply and verification | 120 | 7 |
| M05L02 | Rollback and change records | 120 | 7 |

## Integrative case

Make a governed change to AWS infrastructure: draft the Terraform with Claude Code, review the generated plan, scope an IAM policy to only the affected resources, require a human approval before apply, and document a rollback path and change record.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0810-final-protected | 40 | 50 | yes |
| MST-0810-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Governed change scope | 8 |
| Terraform fundamentals for change | 8 |
| Claude Code assisted authoring | 8 |
| AWS resources and least privilege | 8 |
| Safe apply and rollback | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0810-Q0001** (single-answer, Select ONE) Why review the output of terraform plan before running apply?

- A. Plan shows exactly what will be created, changed or destroyed before it happens **(key)**  
  _Rationale:_ Correct: reviewing the plan catches unintended or destructive changes first.
- B. Plan encrypts the state file  
  _Rationale:_ Plan does not encrypt state.
- C. Apply cannot change anything, so review is optional  
  _Rationale:_ Apply makes real changes; that is why plan review matters.
- D. Plan automatically approves the change  
  _Rationale:_ Plan does not approve; a human still decides.

**MST-0810-Q0002** (multiple-answer, Select TWO) Which TWO practices make a production infrastructure change safer? (Select TWO.)

- A. Require a human approval after a reviewed plan **(key)**  
  _Rationale:_ Correct: human approval on a reviewed plan is a deliberate gate.
- B. Document a rollback path before applying **(key)**  
  _Rationale:_ Correct: a rollback plan limits damage if the change fails.
- C. Apply directly from AI output without review  
  _Rationale:_ Unreviewed apply can make unintended changes.
- D. Use administrator credentials for every change  
  _Rationale:_ Over-broad credentials widen the blast radius.

**MST-0810-Q0003** (single-answer, Select ONE) A change touches one S3 bucket. What IAM scope follows least privilege?

- A. Permissions limited to that bucket and the required actions **(key)**  
  _Rationale:_ Correct: least privilege grants only what the change needs.
- B. Full administrator access for convenience  
  _Rationale:_ Administrator access far exceeds what the change needs.
- C. No permissions, relying on the console UI  
  _Rationale:_ The change still needs scoped permissions to run.
- D. Permissions to all buckets in the account  
  _Rationale:_ Account-wide access is broader than the change requires.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
