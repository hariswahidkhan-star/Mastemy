# AWS Cloud Development Kit: Infrastructure in Code

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0764` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Topic facts based on AWS Cloud Development Kit (CDK) v2 Developer Guide; official pages were not reachable from the build environment (egress blocked 2026-10-02). Re-fetch and confirm product versions and any published learning objectives at production. |
| Evidence | **unverified-needs-official-check** - sources: SRC-AWS-CDK (https://docs.aws.amazon.com/cdk/v2/guide/home.html; accessed 2026-10-02) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — AWS Cloud Development Kit: Infrastructure in Code (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Describe CDK apps, stacks and constructs
2. Use L1, L2 and L3 constructs appropriately
3. Synthesize and deploy with the CDK CLI
4. Manage context, environments and bootstrapping
5. Test infrastructure with assertions and snapshots
6. Apply patterns, aspects and best practices

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items assess knowledge and applied reasoning only; they do not assess hands-on performance in the product, which is taught through instructor-built walkthroughs.

## Modules

### M01 CDK fundamentals (MASTEMY-DESIGN 16%)

- Worked applications: (1) Create an app with one stack and an S3 bucket construct; (2) Inspect the synthesised template
- Common misconception addressed: Thinking CDK replaces CloudFormation rather than generating it
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Apps, stacks and constructs | 80 | 7 |
| M01L02 | How CDK synthesises to CloudFormation | 80 | 7 |

### M02 Construct levels (MASTEMY-DESIGN 16%)

- Worked applications: (1) Replace an L1 resource with an L2 construct; (2) Use an L3 pattern for a load-balanced service
- Common misconception addressed: Reaching for L1 when a safer L2 construct exists
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | L1 (Cfn) resources | 80 | 7 |
| M02L02 | L2 and L3 higher-level constructs | 80 | 7 |

### M03 CLI workflow (MASTEMY-DESIGN 17%)

- Worked applications: (1) Run cdk diff before deploying a change; (2) Bootstrap a new account/region
- Common misconception addressed: Deploying without bootstrapping the target environment
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | synth, diff and deploy | 80 | 7 |
| M03L02 | Bootstrapping an environment | 80 | 7 |

### M04 Context and environments (MASTEMY-DESIGN 17%)

- Worked applications: (1) Parameterise a stack for dev vs prod accounts; (2) Pin context to make synthesis deterministic
- Common misconception addressed: Hard-coding account IDs across environments
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Environment-specific config | 80 | 7 |
| M04L02 | Context values and feature flags | 80 | 7 |

### M05 Testing infrastructure (MASTEMY-DESIGN 17%)

- Worked applications: (1) Assert a bucket has encryption enabled; (2) Add a snapshot test to catch unintended changes
- Common misconception addressed: Assuming code that compiles produces the intended resources
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Fine-grained assertions | 80 | 7 |
| M05L02 | Snapshot tests | 80 | 7 |

### M06 Patterns and quality (MASTEMY-DESIGN 17%)

- Worked applications: (1) Package a reusable construct for teams; (2) Use an aspect to enforce tagging across a stack
- Common misconception addressed: Duplicating infrastructure instead of sharing constructs
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Reusable constructs and aspects | 80 | 7 |
| M06L02 | Security and best practices | 80 | 7 |

## Integrative case

Define a service in the CDK: build an app and stack with L2 constructs, parameterise dev vs prod via environments, run cdk diff and deploy after bootstrapping, add assertion and snapshot tests, and enforce tagging with an aspect.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0764-final-protected | 40 | 50 | yes |
| MST-0764-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| CDK fundamentals | 7 |
| Construct levels | 7 |
| CLI workflow | 7 |
| Context and environments | 7 |
| Testing infrastructure | 6 |
| Patterns and quality | 6 |

Minimum reviewed item bank: 368 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0764-Q0001** (single-answer, Select ONE) What does the AWS CDK produce when you synthesise an app?

- A. A CloudFormation template that is then deployed **(key)**  
  _Rationale:_ Correct: CDK synthesises to CloudFormation templates, which deploy the resources.
- B. Raw machine code that bypasses AWS  
  _Rationale:_ CDK does not bypass AWS; it generates CloudFormation.
- C. A database backup  
  _Rationale:_ Synthesis has nothing to do with backups.
- D. A billing invoice  
  _Rationale:_ Synthesis does not create invoices.

**MST-0764-Q0002** (single-answer, Select ONE) Why are L2 constructs usually preferred over L1 (Cfn) constructs?

- A. They provide sensible defaults and helper methods, reducing error-prone boilerplate **(key)**  
  _Rationale:_ Correct: L2 constructs add opinionated defaults and convenience over raw L1 resources.
- B. They skip CloudFormation entirely  
  _Rationale:_ All constructs still synthesise to CloudFormation.
- C. They are the only way to deploy  
  _Rationale:_ L1 constructs can also deploy.
- D. They disable IAM  
  _Rationale:_ Construct level does not disable IAM.

**MST-0764-Q0003** (multiple-answer, Select TWO) Which TWO steps belong in a safe CDK deployment workflow? (Select TWO.)

- A. Bootstrap the target account and region before first deploy **(key)**  
  _Rationale:_ Correct: bootstrapping provisions the resources CDK needs to deploy.
- B. Run cdk diff to review changes before deploying **(key)**  
  _Rationale:_ Correct: diff shows what will change before you apply it.
- C. Hard-code the same account ID for every environment  
  _Rationale:_ Hard-coding accounts breaks multi-environment deploys.
- D. Skip tests because the code compiles  
  _Rationale:_ Compiling does not guarantee correct resources.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
