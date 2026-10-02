# GitHub: Repository Governance and Delivery Workflows

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0984` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **vendor-docs-partial** - grounded in Microsoft Learn vendor documentation (https://learn.microsoft.com/security/zero-trust/develop/secure-dev-environment-zero-trust); weights and outcomes are Mastemy design |
| Legacy IDs |  |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — GitHub: Repository Governance and Delivery Workflows (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Git and GitHub foundations
2. Branching and pull requests
3. Branch protection and governance
4. Access, teams and permissions
5. Automation with GitHub Actions
6. Delivery workflows and security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Git and GitHub foundations (MASTEMY-DESIGN 17%)

- Worked applications: (1) Initialise a repo and push it to GitHub; (2) Trace a commit from local history to the remote
- Common misconception addressed: Confusing Git the tool with GitHub the hosting service
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Repositories, commits and remotes | 80 | 6 |
| M01L02 | Cloning, pushing and the GitHub model | 80 | 6 |

### M02 Branching and pull requests (MASTEMY-DESIGN 17%)

- Worked applications: (1) Open a feature branch and raise a pull request; (2) Resolve a merge conflict during review
- Common misconception addressed: Committing directly to the default branch instead of using a PR
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Branches and merge vs rebase | 80 | 6 |
| M02L02 | Pull requests and code review | 80 | 6 |

### M03 Branch protection and governance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Configure a protected main branch requiring review; (2) Add a CODEOWNERS file to route reviews
- Common misconception addressed: Assuming protection rules apply to administrators by default
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Branch protection and required reviews | 80 | 6 |
| M03L02 | CODEOWNERS and required status checks | 80 | 6 |

### M04 Access, teams and permissions (MASTEMY-DESIGN 17%)

- Worked applications: (1) Map teams to least-privilege repository roles; (2) Audit who can bypass branch protection
- Common misconception addressed: Granting broad admin access instead of scoped roles
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Organisations, teams and roles | 80 | 6 |
| M04L02 | Repository permissions and least privilege | 80 | 6 |

### M05 Automation with GitHub Actions (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a CI workflow that runs tests on each PR; (2) Store a token as an encrypted Actions secret
- Common misconception addressed: Hardcoding secrets in a workflow file instead of using secrets
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Workflows, triggers and jobs | 80 | 6 |
| M05L02 | CI checks and secrets | 80 | 6 |

### M06 Delivery workflows and security (MASTEMY-DESIGN 16%)

- Worked applications: (1) Gate a deployment on a successful workflow run; (2) Triage a Dependabot security alert
- Common misconception addressed: Treating a green CI run as proof the change is secure
- Module check: 14 items / 14 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Release and deployment workflows | 80 | 6 |
| M06L02 | Dependabot, scanning and security basics | 80 | 6 |

## Integrative case

Set up repository governance for a product team on GitHub: enforce a protected main branch with required reviews and status checks, route reviews with CODEOWNERS, map teams to least-privilege roles, add a CI workflow that gates pull requests, and wire a guarded deployment; then defend the governance model against a tampering scenario.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0984-final-protected | 30 | 30 | yes |
| MST-0984-final-alternate | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Git and GitHub foundations | 5 |
| Branching and pull requests | 5 |
| Branch protection and governance | 5 |
| Access, teams and permissions | 5 |
| Automation with GitHub Actions | 5 |
| Delivery workflows and security | 5 |

Minimum reviewed item bank: 372 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0984-Q0001** (single-answer, Select ONE) What does a branch protection rule requiring pull request reviews primarily prevent?

- A. Unreviewed changes being merged directly into a protected branch **(key)**  
  _Rationale:_ Correct: it forces changes through review before they reach the protected branch.
- B. All commits to any branch in the repository  
  _Rationale:_ It targets the protected branch, not every branch.
- C. Cloning the repository  
  _Rationale:_ Protection rules govern merges, not cloning.
- D. GitHub Actions from running  
  _Rationale:_ Protection rules do not disable Actions.

**MST-0984-Q0002** (multiple-answer, Select TWO) Which TWO are good practices for secrets in GitHub Actions? (Select TWO)

- A. Store tokens as encrypted repository or environment secrets **(key)**  
  _Rationale:_ Correct: secrets are encrypted and injected at runtime, not stored in source.
- B. Reference secrets via the secrets context in the workflow **(key)**  
  _Rationale:_ Correct: workflows read them through the secrets context rather than literals.
- C. Commit the token directly in the workflow YAML for convenience  
  _Rationale:_ Hardcoding secrets exposes them in history.
- D. Print the secret to the log to confirm it loaded  
  _Rationale:_ Logging secrets leaks them; Actions masks but you must not print them.

**MST-0984-Q0003** (single-answer, Select ONE) Which statement best distinguishes Git from GitHub?

- A. Git is the version-control tool; GitHub is a hosting and collaboration platform built around it **(key)**  
  _Rationale:_ Correct: Git tracks versions locally; GitHub hosts repositories and adds collaboration features.
- B. GitHub is the version-control tool and Git is the website  
  _Rationale:_ It is the reverse.
- C. They are two names for the same program  
  _Rationale:_ They are distinct: a tool and a platform.
- D. Git only works if GitHub is online  
  _Rationale:_ Git works fully offline without GitHub.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
