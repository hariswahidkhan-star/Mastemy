# Cursor + React + .NET + MySQL: Full-Stack Product Delivery

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0792` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | integrated-workflow-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Cursor + React + .NET + MySQL: Full-Stack Product Delivery (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Plan a full-stack feature across a React frontend and a .NET API over MySQL
2. Use Cursor to accelerate coding while reviewing every AI-suggested change
3. Build a React frontend that consumes the API safely
4. Build a .NET API with a MySQL data layer and validation
5. Test the stack end to end with automated checks
6. Ship through a reviewed, repeatable delivery process

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Feature planning (MASTEMY-DESIGN 16%)

- Worked applications: (1) Slice a feature into frontend, API and schema changes; (2) Write acceptance criteria a test can check
- Common misconception addressed: Starting to code before the data contract is agreed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Slicing a feature across the stack | 120 | 7 |
| M01L02 | Contracts and acceptance criteria | 120 | 7 |

### M02 Working with Cursor (MASTEMY-DESIGN 16%)

- Worked applications: (1) Accept, reject and refine an AI edit with a diff review; (2) Catch an AI change that breaks an existing test
- Common misconception addressed: Accepting AI edits without reading the diff
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Prompting and reviewing AI edits | 120 | 7 |
| M02L02 | Keeping the human as the code reviewer | 120 | 7 |

### M03 React frontend (MASTEMY-DESIGN 17%)

- Worked applications: (1) Fetch and render API data with loading and error states; (2) Validate a form before it calls the API
- Common misconception addressed: Trusting API data to always be present and well-formed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Components, state and data fetching | 120 | 7 |
| M03L02 | Forms, validation and error states | 120 | 7 |

### M04 .NET API and MySQL (MASTEMY-DESIGN 17%)

- Worked applications: (1) Expose a validated endpoint backed by a MySQL query; (2) Return correct status codes for invalid input
- Common misconception addressed: Returning 200 for every response regardless of outcome
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Endpoints, validation and status codes | 120 | 7 |
| M04L02 | MySQL data access and migrations | 120 | 7 |

### M05 End-to-end testing (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write an integration test that exercises API and database; (2) Add a frontend test for the critical user path
- Common misconception addressed: Relying only on manual clicking to confirm a release
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | API/integration tests against MySQL | 120 | 7 |
| M05L02 | Frontend tests for critical paths | 120 | 7 |

### M06 Reviewed delivery (MASTEMY-DESIGN 17%)

- Worked applications: (1) Open a pull request with tests passing and a reviewer assigned; (2) Roll back a bad change safely
- Common misconception addressed: Merging straight to main without review or tests
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Pull requests, CI and review gates | 120 | 7 |
| M06L02 | Release, rollback and observability basics | 120 | 7 |

## Integrative case

A small team ships a subscription feature end to end: plan the slice, use Cursor to move fast while reviewing every diff, build the React UI and .NET/MySQL API with validation, prove it with tests, and deliver it through a reviewed pipeline with a rollback plan.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0792-final-protected | 40 | 50 | yes |
| MST-0792-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Feature planning | 7 |
| Working with Cursor | 7 |
| React frontend | 7 |
| .NET API and MySQL | 7 |
| End-to-end testing | 6 |
| Reviewed delivery | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0792-Q0001** (single-answer, Select ONE) Cursor suggests a change that makes the feature work but a previously passing test now fails. What is the right response?

- A. Investigate why the test fails before accepting the change **(key)**  
  _Rationale:_ Correct: a newly failing test is a signal of a regression that must be understood, not ignored.
- B. Delete the failing test so CI is green  
  _Rationale:_ Deleting the test hides a regression rather than fixing it.
- C. Accept the change and merge; fix later  
  _Rationale:_ Merging a known regression pushes risk onto users.
- D. Disable CI for this branch  
  _Rationale:_ Turning off the safety net defeats the purpose of the pipeline.

**MST-0792-Q0002** (multiple-answer, Select TWO) Which TWO behaviours should a .NET API show for invalid input? (Select TWO.)

- A. Return a 4xx status code **(key)**  
  _Rationale:_ Correct: client errors should be signalled with a 4xx status.
- B. Return a clear validation message **(key)**  
  _Rationale:_ Correct: the caller needs to know what was wrong.
- C. Return 200 with an empty body  
  _Rationale:_ A 200 wrongly tells the client the request succeeded.
- D. Silently write a partial record  
  _Rationale:_ Persisting partial invalid data corrupts the store.

**MST-0792-Q0003** (single-answer, Select ONE) Why add an end-to-end integration test that hits the real MySQL database rather than only unit tests with mocks?

- A. It exercises real SQL translation and constraints that mocks do not reproduce **(key)**  
  _Rationale:_ Correct: integration against the real database catches schema and query behaviour mocks miss.
- B. It runs faster than unit tests  
  _Rationale:_ Integration tests are generally slower, not faster.
- C. It removes the need for code review  
  _Rationale:_ Testing does not replace human review.
- D. It guarantees zero bugs  
  _Rationale:_ No test guarantees the absence of all bugs.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
