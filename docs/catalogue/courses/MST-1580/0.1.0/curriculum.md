# Jenkins

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1580` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-J-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Jenkins (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Jenkins foundations
2. Jobs and pipelines
3. Declarative pipelines
4. Build and test stages
5. Credentials and security
6. Agents and scaling
7. Triggers and integration
8. Pipeline quality

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on automating builds and delivery with Jenkins; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Jenkins foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Describe the controller/agent architecture; (2) Run a job on a labelled agent
- Common misconception addressed: Running all builds on the controller itself
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What Jenkins is and core concepts | 60 | 5 |
| M01L02 | Controller and agents | 60 | 5 |

### M02 Jobs and pipelines (MASTEMY-DESIGN 13%)

- Worked applications: (1) Create a pipeline job from a Jenkinsfile; (2) Store the Jenkinsfile in the repo
- Common misconception addressed: Configuring everything through the UI instead of as code
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Freestyle vs pipeline jobs | 60 | 5 |
| M02L02 | Pipeline as code | 60 | 5 |

### M03 Declarative pipelines (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a declarative pipeline with stages; (2) Add a post block for cleanup
- Common misconception addressed: Confusing declarative and scripted pipeline syntax
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Pipeline, stages and steps | 60 | 5 |
| M03L02 | post conditions | 60 | 5 |

### M04 Build and test stages (MASTEMY-DESIGN 13%)

- Worked applications: (1) Add build and test stages; (2) Archive artifacts and test reports
- Common misconception addressed: Marking a build successful while tests failed
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Compiling and running tests | 60 | 5 |
| M04L02 | Publishing results and artifacts | 60 | 5 |

### M05 Credentials and security (MASTEMY-DESIGN 12%)

- Worked applications: (1) Inject a credential into a stage; (2) Avoid printing a secret to the log
- Common misconception addressed: Hardcoding passwords in the Jenkinsfile
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | The credentials store | 60 | 5 |
| M05L02 | Using secrets safely | 60 | 5 |

### M06 Agents and scaling (MASTEMY-DESIGN 13%)

- Worked applications: (1) Distribute work across agents; (2) Run independent stages in parallel
- Common misconception addressed: Over-provisioning executors on one node
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Agents and executors | 60 | 5 |
| M06L02 | Parallel stages | 60 | 5 |

### M07 Triggers and integration (MASTEMY-DESIGN 12%)

- Worked applications: (1) Trigger a build on a push via webhook; (2) Report status back to the repository
- Common misconception addressed: Polling frequently instead of using webhooks
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | SCM polling and webhooks | 60 | 5 |
| M07L02 | Integrating with version control | 60 | 5 |

### M08 Pipeline quality (MASTEMY-DESIGN 12%)

- Worked applications: (1) Notify the team on failure; (2) Refactor a long pipeline into shared steps
- Common misconception addressed: Letting a flaky pipeline erode trust
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Notifications and visibility | 60 | 5 |
| M08L02 | Pipeline maintenance | 60 | 5 |

## Integrative case

Set up a Jenkins pipeline for a web app: write a declarative Jenkinsfile with build, test and deploy stages, manage credentials securely, add an agent and parallel stages, and make failures visible to the team.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1580-final-protected | 40 | 40 | yes |
| MST-1580-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Jenkins foundations | 5 |
| Jobs and pipelines | 5 |
| Declarative pipelines | 5 |
| Build and test stages | 5 |
| Credentials and security | 5 |
| Agents and scaling | 5 |
| Triggers and integration | 5 |
| Pipeline quality | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1580-Q0001** (single-answer, Select ONE) Why is storing the pipeline definition as a Jenkinsfile in the repository ('pipeline as code') preferred over UI configuration?

- A. The pipeline is versioned, reviewable and reproducible alongside the code **(key)**  
  _Rationale:_ Correct: pipeline-as-code brings the benefits of version control to CI.
- B. It makes builds run without any agent  
  _Rationale:_ Agents are still required to run work.
- C. It disables credentials entirely  
  _Rationale:_ Credentials are managed separately and securely.
- D. It prevents the pipeline from ever failing  
  _Rationale:_ It does not change failure behaviour.

**MST-1580-Q0002** (single-answer, Select ONE) How should a secret (e.g. a deploy token) be used in a Jenkins pipeline?

- A. Stored in the credentials store and injected into the stage, never printed to the log **(key)**  
  _Rationale:_ Correct: the credentials store keeps secrets out of source and logs.
- B. Hardcoded as a string in the Jenkinsfile  
  _Rationale:_ That exposes the secret in version control.
- C. Echoed to the console for debugging  
  _Rationale:_ Printing secrets leaks them in build logs.
- D. Emailed to the whole team  
  _Rationale:_ That is an obvious leak.

**MST-1580-Q0003** (multiple-answer, Select ALL that apply) Which statements about declarative Jenkins pipelines are correct? (Select TWO)

- A. A pipeline is composed of stages, each containing steps **(key)**  
  _Rationale:_ Correct: that is the declarative structure.
- B. A post section can run steps based on build outcome (always/success/failure) **(key)**  
  _Rationale:_ Correct: post conditions handle cleanup and notifications.
- C. Declarative pipelines cannot run stages in parallel  
  _Rationale:_ False; parallel stages are supported.
- D. All builds should run on the controller for speed  
  _Rationale:_ False; running work on the controller is discouraged.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
