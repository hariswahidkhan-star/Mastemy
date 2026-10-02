# GitHub Copilot + VS Code + .NET: Enterprise API Engineering

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0811` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — GitHub Copilot + VS Code + .NET: Enterprise API Engineering (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Scope an enterprise API's contract and non-functional requirements
2. Use GitHub Copilot in VS Code with review and testing
3. Implement validated .NET endpoints with DI and error handling
4. Secure endpoints and keep secrets out of source
5. Deliver with automated tests, CI, docs and versioning

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Enterprise API scope (MASTEMY-DESIGN 20%)

- Worked applications: (1) Draft an API contract with endpoints and error shapes; (2) List the non-functional requirements an enterprise API must meet
- Common misconception addressed: Treating a working endpoint as a finished enterprise API
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Requirements, contracts and standards | 120 | 7 |
| M01L02 | Non-functionals: security, versioning, SLAs | 120 | 7 |

### M02 GitHub Copilot in VS Code (MASTEMY-DESIGN 20%)

- Worked applications: (1) Use Copilot to scaffold a controller and then review it; (2) Write a test that proves a Copilot suggestion is correct
- Common misconception addressed: Accepting Copilot suggestions without reading or testing them
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Effective prompting and acceptance | 120 | 7 |
| M02L02 | Reviewing and testing suggestions | 120 | 7 |

### M03 .NET API implementation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Implement a validated endpoint with injected services; (2) Return consistent error responses for bad input
- Common misconception addressed: Skipping input validation because the client is trusted
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Endpoints, DI and validation | 120 | 7 |
| M03L02 | Persistence and error handling | 120 | 7 |

### M04 Security and configuration (MASTEMY-DESIGN 20%)

- Worked applications: (1) Protect an endpoint with authentication and an authorization check; (2) Move a connection secret out of source into configuration
- Common misconception addressed: Committing secrets in appsettings.json to source control
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | AuthN/AuthZ and secrets | 120 | 7 |
| M04L02 | Configuration and environments | 120 | 7 |

### M05 Quality and delivery (MASTEMY-DESIGN 20%)

- Worked applications: (1) Add tests that run in CI on every pull request; (2) Publish API docs and a version policy
- Common misconception addressed: Shipping API changes with no tests or version policy
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Automated tests and CI | 120 | 7 |
| M05L02 | Documentation and versioning | 120 | 7 |

## Integrative case

Engineer an enterprise .NET API endpoint: scope its contract and non-functionals, use GitHub Copilot in VS Code to scaffold it, implement validation and consistent errors, protect it with authentication, keep the connection secret in configuration, and prove it with tests that run in CI.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0811-final-protected | 40 | 50 | yes |
| MST-0811-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Enterprise API scope | 8 |
| GitHub Copilot in VS Code | 8 |
| .NET API implementation | 8 |
| Security and configuration | 8 |
| Quality and delivery | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0811-Q0001** (single-answer, Select ONE) What is the safest way to use a GitHub Copilot suggestion in production code?

- A. Read it, understand it, and cover it with a test before relying on it **(key)**  
  _Rationale:_ Correct: reviewed and tested suggestions are accountable code.
- B. Accept every suggestion to save time  
  _Rationale:_ Blind acceptance ships unreviewed, possibly wrong code.
- C. Assume generated code needs no tests  
  _Rationale:_ Generated code needs the same testing as hand-written code.
- D. Delete the tests Copilot writes  
  _Rationale:_ Removing tests reduces, not increases, confidence.

**MST-0811-Q0002** (multiple-answer, Select TWO) Which TWO practices protect an enterprise .NET API? (Select TWO.)

- A. Require authentication and an authorization check on protected endpoints **(key)**  
  _Rationale:_ Correct: authN/authZ restrict access to permitted callers.
- B. Keep connection secrets in configuration, not in source **(key)**  
  _Rationale:_ Correct: secrets in source control leak to everyone with repo access.
- C. Skip validation when the client is internal  
  _Rationale:_ Internal clients still send bad or malicious input.
- D. Hard-code the database password in the controller  
  _Rationale:_ Hard-coded secrets are exposed in source history.

**MST-0811-Q0003** (single-answer, Select ONE) Why run the API's tests in CI on every pull request?

- A. To catch regressions before changes merge **(key)**  
  _Rationale:_ Correct: CI tests gate merges and catch breakage early.
- B. Because CI encrypts the code  
  _Rationale:_ CI does not encrypt code.
- C. Because it removes the need for a version policy  
  _Rationale:_ Versioning and testing address different concerns.
- D. Because tests in CI never need maintenance  
  _Rationale:_ Tests are maintained like any other code.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
