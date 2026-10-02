# AWS CloudFormation and Infrastructure Automation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0763` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on AWS CloudFormation User Guide; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-CFN (https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AWS CloudFormation and Infrastructure Automation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Author templates with resources, parameters and outputs
2. Manage stacks, change sets and drift
3. Use intrinsic functions, mappings and conditions
4. Reuse with nested stacks and modules
5. Deploy across accounts and regions with StackSets
6. Apply safety with policies, rollback and best practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 Template basics (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a template for an S3 bucket with a parameterised name; (2) Export an output for cross-stack reference
- Common misconception addressed: Confusing parameters (input) with outputs (export)
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Resources, parameters and outputs | 80 | 7 |
| M01L02 | Pseudo-parameters and metadata | 80 | 7 |

### M02 Stacks and change sets (MASTEMY-DESIGN 16%)

- Worked applications: (1) Preview an update with a change set before applying; (2) Detect and reconcile stack drift
- Common misconception addressed: Changing resources in the console and expecting the stack to know
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Creating and updating stacks | 80 | 7 |
| M02L02 | Change sets and drift detection | 80 | 7 |

### M03 Template logic (MASTEMY-DESIGN 17%)

- Worked applications: (1) Use Fn::Sub to build an ARN dynamically; (2) Add a condition to create a resource only in prod
- Common misconception addressed: Hard-coding values that should use Ref or GetAtt
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Intrinsic functions (Ref, GetAtt, Sub) | 80 | 7 |
| M03L02 | Mappings and conditions | 80 | 7 |

### M04 Reuse and composition (MASTEMY-DESIGN 17%)

- Worked applications: (1) Factor a network layer into a nested stack; (2) Reuse a module across environments
- Common misconception addressed: Copy-pasting templates instead of composing reusable units
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Nested stacks | 80 | 7 |
| M04L02 | Modules and template reuse | 80 | 7 |

### M05 Multi-account and region (MASTEMY-DESIGN 17%)

- Worked applications: (1) Deploy a guardrail stack to three accounts with a StackSet; (2) Add a new region target to a StackSet
- Common misconception addressed: Treating a StackSet like a single-account stack
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | StackSets concepts | 80 | 7 |
| M05L02 | Deploying to organisational units | 80 | 7 |

### M06 Safety and operations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add a stack policy to protect a database from replacement; (2) Reference a secret instead of embedding it
- Common misconception addressed: Storing plaintext secrets in template parameters
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Rollback, policies and deletion protection | 80 | 7 |
| M06L02 | Best practices and secrets | 80 | 7 |

## Integrative case

Automate an environment with CloudFormation: write a parameterised template with outputs, preview updates with a change set, add conditions for prod-only resources, factor the network into a nested stack, roll out a guardrail with a StackSet, and protect a database with a stack policy.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0763-final-protected | 40 | 50 | yes |
| MST-0763-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Template basics | 7 |
| Stacks and change sets | 7 |
| Template logic | 7 |
| Reuse and composition | 7 |
| Multi-account and region | 6 |
| Safety and operations | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0763-Q0001** (single-answer, Select ONE) What does a CloudFormation change set let you do before updating a stack?

- A. Preview exactly which resources will be added, modified or deleted **(key)**  
  _Rationale:_ Correct: a change set previews the impact of an update before you execute it.
- B. Permanently delete the stack  
  _Rationale:_ Change sets preview updates; they do not delete stacks.
- C. Bypass IAM permissions  
  _Rationale:_ Change sets do not bypass permissions.
- D. Encrypt all resources automatically  
  _Rationale:_ Change sets do not encrypt resources.

**MST-0763-Q0002** (single-answer, Select ONE) Which feature detects when stack resources were changed outside CloudFormation?

- A. Drift detection **(key)**  
  _Rationale:_ Correct: drift detection reports resources that differ from the template's expected state.
- B. A mapping  
  _Rationale:_ Mappings provide static lookups, not change detection.
- C. An output  
  _Rationale:_ Outputs export values; they do not detect drift.
- D. A parameter  
  _Rationale:_ Parameters accept input; they do not detect drift.

**MST-0763-Q0003** (multiple-answer, Select TWO) Which TWO practices improve the safety of CloudFormation deployments? (Select TWO.)

- A. Use change sets to preview updates before executing **(key)**  
  _Rationale:_ Correct: previewing changes reduces surprise impact.
- B. Apply a stack policy to protect critical resources from replacement **(key)**  
  _Rationale:_ Correct: stack policies guard sensitive resources.
- C. Embed plaintext secrets in template parameters  
  _Rationale:_ Plaintext secrets in templates are insecure.
- D. Edit resources directly in the console to move faster  
  _Rationale:_ Out-of-band edits cause drift and risk.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
