# AWS DevOps CI/CD Tools

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1495` v0.1.0 | Batch 13 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official AWS documentation was proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review. |
| Planned time | T = 720 min; instruction I = 576 min (80%); assessment A = 144 min (20%) |
| Assessment split | lesson checks 36 / module checks 50 / cumulative 58 min |
| Certificate | Mastemy Certificate of Completion — AWS DevOps CI/CD Tools (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain CI/CD concepts and the AWS developer tools suite
2. Build pipelines with CodePipeline and CodeBuild
3. Deploy safely with CodeDeploy strategies
4. Add testing, approvals and infrastructure as code to pipelines

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 CI/CD foundations (MASTEMY-DESIGN 25%)

- Worked applications: (1) Map build-test-deploy to pipeline stages; (2) Connect a repo as a pipeline source
- Common misconception addressed: Thinking continuous delivery means every commit auto-releases to production unattended
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | CI/CD principles and the AWS tools suite | 72 | 7 |
| M01L02 | Source control and pipeline stages | 72 | 7 |

### M02 Build and pipeline (MASTEMY-DESIGN 25%)

- Worked applications: (1) Define a buildspec for a build project; (2) Chain build and deploy stages in a pipeline
- Common misconception addressed: Confusing CodeBuild (build) with CodeDeploy (deploy)
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | CodeBuild build projects | 72 | 7 |
| M02L02 | CodePipeline stages and actions | 72 | 7 |

### M03 Deployment strategies (MASTEMY-DESIGN 25%)

- Worked applications: (1) Configure a blue/green deployment; (2) Set an automatic rollback on alarm
- Common misconception addressed: Believing an in-place deploy has the same rollback safety as blue/green
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | CodeDeploy deployment types | 72 | 7 |
| M03L02 | Blue/green and canary with rollback | 72 | 7 |

### M04 Quality and IaC (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add a test stage and manual approval; (2) Deploy infra with CloudFormation in a stage
- Common misconception addressed: Treating infrastructure changes as manual steps outside the pipeline
- Module check: 12 items / 12 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Automated tests and approvals | 72 | 7 |
| M04L02 | Infrastructure as code in the pipeline | 72 | 7 |

## Integrative case

A team deploys manually and breaks production. Build a CI/CD pipeline on AWS: source to CodeBuild to CodeDeploy with CodePipeline, add tests and a manual approval, and deploy with a blue/green strategy plus rollback.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1495-final-protected | 28 | 35 | yes |
| MST-1495-final-alternate | 28 | 35 | no (optional practice) |

| Domain | Items per form |
|---|---|
| CI/CD foundations | 7 |
| Build and pipeline | 7 |
| Deployment strategies | 7 |
| Quality and IaC | 7 |

Minimum reviewed item bank: 264 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1495-Q0001** (single-answer, Select ONE) Which AWS service orchestrates the stages of a release pipeline?

- A. CodePipeline **(key)**  
  _Rationale:_ Correct: CodePipeline models and runs the stages of a release.
- B. CodeBuild  
  _Rationale:_ CodeBuild compiles and tests; it does not orchestrate stages.
- C. CodeDeploy  
  _Rationale:_ CodeDeploy handles deployment, not overall orchestration.
- D. CloudWatch  
  _Rationale:_ CloudWatch monitors; it does not orchestrate a pipeline.

**MST-1495-Q0002** (multiple-answer, Select TWO) Which TWO benefits does a blue/green deployment provide? (Select TWO.)

- A. Fast rollback by shifting traffic back to the old environment **(key)**  
  _Rationale:_ Correct: the old 'blue' environment remains available for rollback.
- B. Reduced downtime by switching traffic to a tested new environment **(key)**  
  _Rationale:_ Correct: traffic shifts once the new environment is ready.
- C. Eliminating the need for any testing  
  _Rationale:_ Testing is still required.
- D. Guaranteeing zero cost  
  _Rationale:_ Running two environments can increase cost.

**MST-1495-Q0003** (single-answer, Select ONE) Why add a manual approval action in a CodePipeline before production deploy?

- A. To require human sign-off before promoting a change to production **(key)**  
  _Rationale:_ Correct: approval gates let a human authorize the production release.
- B. To compile the source code  
  _Rationale:_ Compilation is CodeBuild's job.
- C. To store artifacts  
  _Rationale:_ Artifact storage is not an approval action.
- D. To replace automated tests  
  _Rationale:_ Approvals complement, not replace, tests.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
