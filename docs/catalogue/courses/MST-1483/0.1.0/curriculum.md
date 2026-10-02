# AWS CDK

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1483` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on the vendor's product documentation; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-CDK (https://docs.aws.amazon.com/cdk/; accessed 2026-10-02) |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 48 / cumulative 60 min |
| Certificate | Mastemy Certificate of Completion — AWS CDK (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain what the AWS CDK is and how it relates to CloudFormation
2. Set up a CDK project and understand apps, stacks and constructs
3. Define infrastructure with constructs in a programming language
4. Synthesize and deploy stacks and inspect generated templates
5. Use context, environments and parameters appropriately
6. Apply testing, best practices and safe deployment workflows

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 CDK concepts (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain how CDK synthesizes to CloudFormation; (2) Compare CDK to writing raw CloudFormation templates
- Common misconception addressed: Thinking CDK bypasses CloudFormation entirely
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What the CDK is and how it works | 48 | 5 |
| M01L02 | CDK vs CloudFormation and when to use it | 48 | 5 |

### M02 Project structure (MASTEMY-DESIGN 16%)

- Worked applications: (1) Initialize a CDK app and run the first synth; (2) Organize resources into an app, stacks and constructs
- Common misconception addressed: Putting every resource in one giant stack
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Apps, stacks and constructs | 48 | 5 |
| M02L02 | Project setup and the toolkit | 48 | 5 |

### M03 Defining infrastructure (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define an S3 bucket and a Lambda function with L2 constructs; (2) Wire constructs together with grants and references
- Common misconception addressed: Hardcoding ARNs instead of passing references between constructs
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | L1, L2 and L3 constructs | 48 | 5 |
| M03L02 | References, grants and the Construct Hub | 48 | 5 |

### M04 Synthesize and deploy (MASTEMY-DESIGN 17%)

- Worked applications: (1) Run cdk synth and read the generated template; (2) Use cdk diff before cdk deploy to review changes
- Common misconception addressed: Running cdk deploy without reviewing the diff
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Synthesis and generated templates | 48 | 5 |
| M04L02 | diff, deploy and rollback | 48 | 5 |

### M05 Context and environments (MASTEMY-DESIGN 17%)

- Worked applications: (1) Parameterize a stack for dev and prod environments; (2) Use context values and environment-specific config
- Common misconception addressed: Baking environment-specific values into shared code
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Environments and account/region targeting | 48 | 5 |
| M05L02 | Context, parameters and config | 48 | 5 |

### M06 Testing and best practices (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a fine-grained assertion test on a synthesized template; (2) Add a snapshot test and least-privilege IAM to a stack
- Common misconception addressed: Granting broad wildcard IAM instead of least privilege
- Module check: 8 items / 8 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Testing constructs and stacks | 48 | 5 |
| M06L02 | Best practices and safe workflows | 48 | 5 |

## Integrative case

A team codifies its infrastructure with the AWS CDK: scaffold a project, define a VPC, a bucket and a serverless API as constructs, organize them into stacks per environment, synthesize and review the CloudFormation output, add tests, and deploy through a safe workflow.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1483-final-protected | 30 | 30 | yes |
| MST-1483-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| CDK concepts | 5 |
| Project structure | 5 |
| Defining infrastructure | 5 |
| Synthesize and deploy | 5 |
| Context and environments | 5 |
| Testing and best practices | 5 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1483-Q0001** (single-answer, Select ONE) What does the AWS CDK ultimately produce to provision resources?

- A. CloudFormation templates that CDK synthesizes and deploys **(key)**  
  _Rationale:_ Correct: CDK synthesizes to CloudFormation, which provisions the resources.
- B. Direct API calls that bypass CloudFormation  
  _Rationale:_ CDK deploys through CloudFormation, it does not bypass it.
- C. Terraform HCL files  
  _Rationale:_ CDK produces CloudFormation, not Terraform HCL.
- D. Shell scripts run on each instance  
  _Rationale:_ CDK does not provision through per-instance shell scripts.

**MST-1483-Q0002** (multiple-answer, Select TWO) Which TWO are good practices when working with the AWS CDK? (Select TWO.)

- A. Review cdk diff before deploying changes **(key)**  
  _Rationale:_ Correct: reviewing the diff prevents unexpected or destructive changes.
- B. Grant least-privilege IAM via construct grant methods **(key)**  
  _Rationale:_ Correct: grant methods produce scoped, least-privilege policies.
- C. Hardcode ARNs across stacks instead of passing references  
  _Rationale:_ Hardcoding ARNs is brittle; references are preferred.
- D. Deploy straight to production without any tests  
  _Rationale:_ Skipping tests risks shipping broken infrastructure.

**MST-1483-Q0003** (single-answer, Select ONE) Before cdk deploy, which command shows what will change in the stack?

- A. cdk diff **(key)**  
  _Rationale:_ Correct: cdk diff compares the synthesized template against the deployed stack.
- B. cdk init  
  _Rationale:_ cdk init scaffolds a new project, it does not show changes.
- C. cdk destroy  
  _Rationale:_ cdk destroy tears down a stack rather than previewing changes.
- D. cdk docs  
  _Rationale:_ cdk docs opens documentation, not a change preview.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
