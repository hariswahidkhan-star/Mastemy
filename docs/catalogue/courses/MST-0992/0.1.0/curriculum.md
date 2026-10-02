# GitLab CI: Build, Test, and Deployment Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0992` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — GitLab CI: Build, Test, and Deployment Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. GitLab CI concepts and the pipeline
2. Writing .gitlab-ci.yml jobs and stages
3. Runners, executors and caching
4. Artifacts, dependencies and variables
5. Testing, environments and deployment
6. Security, rules and pipeline efficiency

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 GitLab CI concepts and the pipeline (MASTEMY-DESIGN 16%)

- Worked applications: (1) Describe how stages order job execution; (2) Explain what triggers a pipeline on push
- Common misconception addressed: Thinking jobs in the same stage run sequentially by default
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Pipelines, stages and jobs | 80 | 6 |
| M01L02 | How commits trigger pipelines | 80 | 6 |

### M02 Writing .gitlab-ci.yml jobs and stages (MASTEMY-DESIGN 17%)

- Worked applications: (1) Define build/test/deploy stages in .gitlab-ci.yml; (2) Reuse setup with a before_script
- Common misconception addressed: Expecting jobs to share a working directory implicitly between stages
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Job structure, scripts and the stages keyword | 80 | 6 |
| M02L02 | before_script, after_script and job templates | 80 | 6 |

### M03 Runners, executors and caching (MASTEMY-DESIGN 16%)

- Worked applications: (1) Cache dependencies between pipeline runs; (2) Choose cache vs artifacts for a build output
- Common misconception addressed: Using cache to pass build outputs that later jobs depend on
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Runners and executor types | 80 | 6 |
| M03L02 | Cache vs artifacts for speeding up jobs | 80 | 6 |

### M04 Artifacts, dependencies and variables (MASTEMY-DESIGN 16%)

- Worked applications: (1) Publish a test report as a job artifact; (2) Store a secret as a masked protected variable
- Common misconception addressed: Committing secrets into .gitlab-ci.yml instead of using variables
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Passing artifacts between jobs | 80 | 6 |
| M04L02 | CI/CD variables, masking and protected values | 80 | 6 |

### M05 Testing, environments and deployment (MASTEMY-DESIGN 17%)

- Worked applications: (1) Fail the pipeline when tests fail; (2) Add a manual approval job before production deploy
- Common misconception addressed: Deploying to production automatically with no gate
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Running tests and reporting results | 80 | 6 |
| M05L02 | Environments, manual gates and deployments | 80 | 6 |

### M06 Security, rules and pipeline efficiency (MASTEMY-DESIGN 18%)

- Worked applications: (1) Run a deploy job only on the default branch with rules; (2) Parallelise independent jobs to cut pipeline time
- Common misconception addressed: Running every job on every branch regardless of relevance
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | rules, only/except and conditional jobs | 80 | 6 |
| M06L02 | Keeping pipelines fast and secure | 80 | 6 |

## Integrative case

Build a CI/CD pipeline for a web service in GitLab: define build, test and deploy stages; cache dependencies and pass the build as an artifact; store credentials as masked protected variables; gate the production deploy behind a manual approval; and restrict deploy jobs to the default branch with rules.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0992-final-protected | 30 | 30 | yes |
| MST-0992-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| GitLab CI concepts and the pipeline | 5 |
| Writing .gitlab-ci.yml jobs and stages | 5 |
| Runners, executors and caching | 5 |
| Artifacts, dependencies and variables | 5 |
| Testing, environments and deployment | 5 |
| Security, rules and pipeline efficiency | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0992-Q0001** (single-answer, Select ONE) How do jobs within the same stage of a GitLab CI pipeline run by default?

- A. In parallel (subject to available runners) **(key)**  
  _Rationale:_ Correct: same-stage jobs run in parallel; stages run in sequence.
- B. Strictly one after another in file order  
  _Rationale:_ Same-stage jobs are parallel, not sequential.
- C. Only the first job runs  
  _Rationale:_ All jobs in the stage run.
- D. They never run until the pipeline is approved  
  _Rationale:_ No approval is required for normal jobs.

**MST-0992-Q0002** (multiple-answer, Select ALL that apply) Which practices keep a GitLab CI pipeline secure and efficient? (Select TWO)

- A. Store secrets as masked, protected CI/CD variables **(key)**  
  _Rationale:_ Correct: masked protected variables keep secrets out of the repo and logs.
- B. Use rules to run deploy jobs only on the intended branch **(key)**  
  _Rationale:_ Correct: conditional rules avoid running jobs where they do not belong.
- C. Commit API tokens directly into .gitlab-ci.yml  
  _Rationale:_ Hard-coding secrets exposes them in version control.
- D. Deploy straight to production on every commit with no gate  
  _Rationale:_ Unreviewed automatic production deploys are risky.

**MST-0992-Q0003** (single-answer, Select ONE) When should you use artifacts rather than cache to move a build output to a later job?

- A. When a later job depends on that output as a required input **(key)**  
  _Rationale:_ Correct: artifacts reliably pass required outputs between jobs; cache is a best-effort speed-up.
- B. Whenever you want to reduce dependency download time  
  _Rationale:_ That is the role of cache, not artifacts.
- C. Only for secrets  
  _Rationale:_ Secrets belong in variables, not artifacts.
- D. Never; cache and artifacts are identical  
  _Rationale:_ They serve different purposes and guarantees.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
