# Claude Code + GitHub Actions: Tested Continuous Delivery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0793` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Claude Code + GitHub Actions: Tested Continuous Delivery (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define a tested continuous-delivery pipeline and its gates
2. Use Claude Code to write and review changes with tests
3. Build a GitHub Actions workflow that runs tests on every change
4. Enforce quality and deployment gates before release
5. Operate the pipeline with rollback, secrets and observability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Designing the pipeline (20%)

- Worked applications: (1) Map a feature change through build, test and deploy stages; (2) Define the gate that blocks a failing change from release
- Common misconception addressed: Treating CI as optional rather than a required gate
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | From commit to deploy: stages and gates | 96 | 7 |
| M01L02 | What must pass before merge and before release | 96 | 7 |

### M02 Claude Code with tests (20%)

- Worked applications: (1) Add a feature plus a test that would fail without it; (2) Catch an AI-written test that passes even when the code is wrong
- Common misconception addressed: Trusting AI-generated tests without checking they actually test
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Writing changes and tests with Claude Code | 96 | 7 |
| M02L02 | Reviewing AI-generated code and tests | 96 | 7 |

### M03 GitHub Actions workflow (20%)

- Worked applications: (1) Write an Actions workflow that runs the test suite on pull requests; (2) Make a failing job report clearly why it failed
- Common misconception addressed: Configuring CI that reports green without running the tests
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | A workflow that runs tests on every push | 96 | 7 |
| M03L02 | Caching, matrices and clear failures | 96 | 7 |

### M04 Quality and deployment gates (20%)

- Worked applications: (1) Require tests and review to pass before merge; (2) Block a deploy when a required check is red
- Common misconception addressed: Allowing merge or deploy while required checks are failing
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Required checks and branch protection | 96 | 7 |
| M04L02 | Gating deploys on green and review | 96 | 7 |

### M05 Operating the pipeline (20%)

- Worked applications: (1) Roll back a bad release safely; (2) Store a deploy secret without exposing it in logs
- Common misconception addressed: Printing secrets into build logs or having no rollback path
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Rollback and recovery | 96 | 7 |
| M05L02 | Secrets, observability and alerts | 96 | 7 |

## Integrative case

An engineering team builds tested continuous delivery: design the pipeline and gates, use Claude Code to write changes with real tests, run them in GitHub Actions on every change, gate merges and deploys on green, and operate with rollback and secret hygiene.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0793-final-protected | 40 | 50 | yes |
| MST-0793-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Designing the pipeline | 8 |
| Claude Code with tests | 8 |
| GitHub Actions workflow | 8 |
| Quality and deployment gates | 8 |
| Operating the pipeline | 8 |

Minimum reviewed item bank: 388 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0793-Q0001** (single-answer, Select ONE) A Claude-generated test passes even after you deliberately break the function it covers. What does this indicate?

- A. The test is not actually exercising the behaviour and must be fixed **(key)**  
  _Rationale:_ Correct: a test that passes against broken code provides no protection.
- B. The function is correct after all  
  _Rationale:_ The function is broken by design; the test simply fails to catch it.
- C. The test is extra strict and can be trusted  
  _Rationale:_ It is not strict; it is ineffective.
- D. CI should be configured to skip the test  
  _Rationale:_ Skipping a useless test removes even the appearance of coverage without fixing it.

**MST-0793-Q0002** (multiple-answer, Select TWO) Which TWO conditions should block a merge to the protected branch? (Select TWO.)

- A. A required test check is failing **(key)**  
  _Rationale:_ Correct: merging over red tests ships known-broken code.
- B. Required review has not been completed **(key)**  
  _Rationale:_ Correct: unreviewed changes bypass a key quality control.
- C. The branch name does not match a naming convention  
  _Rationale:_ Naming style is cosmetic and should not block a sound change.
- D. The pull request has fewer than ten commits  
  _Rationale:_ Commit count is not a quality signal.

**MST-0793-Q0003** (single-answer, Select ONE) What is the correct way to use a deployment secret in a GitHub Actions job?

- A. Inject it from a secret store and keep it out of logs **(key)**  
  _Rationale:_ Correct: secrets must be injected securely and never printed.
- B. Echo it during the job to confirm it is set  
  _Rationale:_ Echoing a secret leaks it into the build log.
- C. Hard-code it in the workflow file  
  _Rationale:_ Committing a secret exposes it in the repository history.
- D. Store it in a plaintext file in the repo  
  _Rationale:_ A plaintext secret in the repo is a credential leak.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
