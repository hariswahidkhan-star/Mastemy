# Jenkins: Pipeline Engineering and Build Operations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0993` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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
| Certificate | Mastemy Certificate of Completion — Jenkins: Pipeline Engineering and Build Operations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Jenkins architecture and jobs
2. Declarative pipelines and Jenkinsfile
3. Agents, stages and parallelism
4. Credentials, parameters and shared libraries
5. Testing, artifacts and integrations
6. Pipeline reliability and operations

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Jenkins architecture and jobs (MASTEMY-DESIGN 16%)

- Worked applications: (1) Explain the controller/agent split; (2) Choose pipeline-as-code over a freestyle job and justify it
- Common misconception addressed: Running all builds on the controller instead of agents
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Controller, agents and job types | 80 | 6 |
| M01L02 | Pipeline as code vs freestyle jobs | 80 | 6 |

### M02 Declarative pipelines and Jenkinsfile (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a Jenkinsfile with build and test stages; (2) Add a post{always} cleanup block
- Common misconception addressed: Mixing scripted and declarative syntax without understanding the difference
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Declarative pipeline structure: pipeline, stages, steps | 80 | 6 |
| M02L02 | post conditions and environment blocks | 80 | 6 |

### M03 Agents, stages and parallelism (MASTEMY-DESIGN 16%)

- Worked applications: (1) Pin a stage to a labelled agent; (2) Run test suites in parallel stages
- Common misconception addressed: Assuming every stage runs on the same agent workspace
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Selecting agents and labels | 80 | 6 |
| M03L02 | Parallel stages and matrix builds | 80 | 6 |

### M04 Credentials, parameters and shared libraries (MASTEMY-DESIGN 16%)

- Worked applications: (1) Inject a secret safely with withCredentials; (2) Extract common steps into a shared library
- Common misconception addressed: Echoing a credential into the build log
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | The credentials store and withCredentials | 80 | 6 |
| M04L02 | Parameters and reusable shared libraries | 80 | 6 |

### M05 Testing, artifacts and integrations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Archive artifacts and publish a JUnit report; (2) Trigger a build on a repository push
- Common misconception addressed: Marking a build successful even when tests fail
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Publishing test results and artifacts | 80 | 6 |
| M05L02 | Triggering builds from version control | 80 | 6 |

### M06 Pipeline reliability and operations (MASTEMY-DESIGN 18%)

- Worked applications: (1) Add a timeout to a long-running stage; (2) Retry a flaky step a bounded number of times
- Common misconception addressed: Leaving stages without timeouts so a hang blocks executors
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Timeouts, retries and failure handling | 80 | 6 |
| M06L02 | Monitoring, backups and plugin management | 80 | 6 |

## Integrative case

Engineer a Jenkins pipeline for a service: write a declarative Jenkinsfile with build and parallel test stages pinned to labelled agents, inject deployment credentials with withCredentials, publish JUnit results and artifacts, and add timeouts, bounded retries and a post-always cleanup for reliability.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0993-final-protected | 30 | 30 | yes |
| MST-0993-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Jenkins architecture and jobs | 5 |
| Declarative pipelines and Jenkinsfile | 5 |
| Agents, stages and parallelism | 5 |
| Credentials, parameters and shared libraries | 5 |
| Testing, artifacts and integrations | 5 |
| Pipeline reliability and operations | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0993-Q0001** (single-answer, Select ONE) Why should builds run on Jenkins agents rather than on the controller?

- A. To isolate workloads and keep the controller responsive and stable **(key)**  
  _Rationale:_ Correct: agents isolate build work, protecting the controller's stability.
- B. Because the controller cannot run any steps  
  _Rationale:_ It technically can, but doing so is discouraged.
- C. Because agents store the credentials  
  _Rationale:_ Credentials live in the credentials store, not on agents by design.
- D. Because declarative pipelines require it syntactically  
  _Rationale:_ Declarative syntax does not mandate the controller/agent choice.

**MST-0993-Q0002** (multiple-answer, Select ALL that apply) Which practices improve Jenkins pipeline reliability? (Select TWO)

- A. Adding timeouts to stages that could hang **(key)**  
  _Rationale:_ Correct: timeouts stop a hung stage from blocking executors indefinitely.
- B. Using a post block to clean up regardless of outcome **(key)**  
  _Rationale:_ Correct: post{always} ensures cleanup even when a stage fails.
- C. Echoing credentials into the build log for debugging  
  _Rationale:_ That leaks secrets into logs.
- D. Marking the build successful even when tests fail  
  _Rationale:_ Hiding failures defeats the purpose of CI.

**MST-0993-Q0003** (single-answer, Select ONE) What is the correct way to use a stored secret inside a Jenkins pipeline step?

- A. Bind it with withCredentials so it is masked and scoped to the block **(key)**  
  _Rationale:_ Correct: withCredentials injects the secret into a limited scope and masks it in logs.
- B. Print it with echo to confirm the value  
  _Rationale:_ Printing a secret exposes it in the log.
- C. Hard-code it in the Jenkinsfile  
  _Rationale:_ Hard-coding secrets puts them in version control.
- D. Store it as a plain environment variable in the repo  
  _Rationale:_ Plain repo variables are not a secure secret store.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
