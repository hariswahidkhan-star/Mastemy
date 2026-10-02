# Java Testing with JUnit and Mocking Tools

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0857` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Java Testing with JUnit and Mocking Tools (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write JUnit tests with assertions and lifecycle hooks
2. Design behaviour-focused tests and edge cases
3. Use mocks and stubs effectively
4. Manage coverage, flakiness and continuous integration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 JUnit fundamentals (MASTEMY-DESIGN 25%)

- Worked applications: (1) Write assertions for a pure function; (2) Parameterise a test over several cases
- Common misconception addressed: Writing tests that depend on execution order
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Tests, assertions and the test lifecycle | 120 | 7 |
| M01L02 | Parameterised and nested tests | 120 | 7 |

### M02 Test design (MASTEMY-DESIGN 25%)

- Worked applications: (1) Test a method's exception path; (2) Cover boundary values
- Common misconception addressed: Asserting implementation details instead of behaviour
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Arrange-Act-Assert and clear naming | 120 | 7 |
| M02L02 | Testing exceptions and edge cases | 120 | 7 |

### M03 Mocking (MASTEMY-DESIGN 25%)

- Worked applications: (1) Mock a repository and verify an interaction; (2) Stub a return value and assert behaviour
- Common misconception addressed: Mocking value objects you could simply construct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Test doubles and Mockito basics | 120 | 7 |
| M03L02 | Stubbing, verifying and argument matchers | 120 | 7 |

### M04 Quality and CI (MASTEMY-DESIGN 25%)

- Worked applications: (1) Fix a flaky time-dependent test; (2) Configure the suite to run on CI
- Common misconception addressed: Treating high coverage as proof of correctness
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Coverage, flakiness and test isolation | 120 | 7 |
| M04L02 | Running tests in continuous integration | 120 | 7 |

## Integrative case

Add tests to an untested service class: write JUnit tests for its behaviour and exception paths, mock its repository dependency to verify interactions, fix a flaky time-dependent test, and wire the suite to run in CI with a coverage report.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0857-final-protected | 40 | 50 | yes |
| MST-0857-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| JUnit fundamentals | 10 |
| Test design | 10 |
| Mocking | 10 |
| Quality and CI | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0857-Q0001** (single-answer, Select ONE) A good unit test asserts...

- A. observable behaviour and outputs, not internal implementation **(key)**  
  _Rationale:_ Correct: behaviour-focused tests survive refactoring.
- B. private field values directly  
  _Rationale:_ Asserting private internals makes tests brittle.
- C. the line numbers of the code  
  _Rationale:_ Line numbers are not behaviour.
- D. the running JVM version  
  _Rationale:_ The JVM version is not what the test verifies.

**MST-0857-Q0002** (multiple-answer, Select TWO) Which TWO are appropriate uses of a mock? (Select TWO.)

- A. Verify that a collaborator's method was called **(key)**  
  _Rationale:_ Correct: mocks can verify interactions.
- B. Stub a slow external dependency's response **(key)**  
  _Rationale:_ Correct: stubbing isolates the unit from slow dependencies.
- C. Replace a simple value object you can just construct  
  _Rationale:_ Mocking trivial values adds noise without benefit.
- D. Test the mocking library itself  
  _Rationale:_ You test your code, not the framework.

**MST-0857-Q0003** (single-answer, Select ONE) Does high code coverage guarantee correctness?

- A. No; it shows code ran, not that behaviour was verified **(key)**  
  _Rationale:_ Correct: coverage measures execution, not assertion quality.
- B. Yes, always  
  _Rationale:_ Code can run without being meaningfully asserted.
- C. Only at exactly 100%  
  _Rationale:_ Even 100% execution does not verify behaviour.
- D. Only when using Mockito  
  _Rationale:_ The mocking tool does not change this.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
