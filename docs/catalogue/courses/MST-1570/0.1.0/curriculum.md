# Unit Testing and TDD

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1570` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-UTT-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Unit Testing and TDD (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Why and what to test
2. Writing good unit tests
3. Test-driven development
4. Isolation and test doubles
5. Coverage, maintenance and CI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate a full test suite on production code; testing practice is taught through instructor-built walkthroughs.

## Modules

### M01 Why and what to test (MASTEMY-DESIGN 18%)

- Worked applications: (1) Decide which of five functions are worth unit testing first; (2) Rewrite a vague bug report as a failing test
- Common misconception addressed: Believing passing tests prove the code has no bugs
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a unit test is and the testing pyramid | 96 | 6 |
| M01L02 | Deciding what to test and the cost/value tradeoff | 96 | 6 |

### M02 Writing good unit tests (MASTEMY-DESIGN 24%)

- Worked applications: (1) Structure a test with Arrange-Act-Assert; (2) Name a test so its intent is obvious on failure
- Common misconception addressed: Asserting many unrelated things in one test
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Anatomy of a test: arrange, act, assert | 96 | 6 |
| M02L02 | Assertions, test names and the F.I.R.S.T. properties | 96 | 6 |

### M03 Test-driven development (MASTEMY-DESIGN 26%)

- Worked applications: (1) Drive a 'FizzBuzz' feature with red-green-refactor; (2) Add an edge case by writing the failing test first
- Common misconception addressed: Writing the implementation first and tests afterward but calling it TDD
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The red-green-refactor cycle | 96 | 6 |
| M03L02 | Letting tests drive design; small steps | 96 | 6 |

### M04 Isolation and test doubles (MASTEMY-DESIGN 20%)

- Worked applications: (1) Replace a slow API call with a stub in a test; (2) Use a mock to verify an email was sent
- Common misconception addressed: Mocking so much that the test no longer tests real behaviour
- Module check: 17 items / 17 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Dependencies, stubs, mocks and fakes | 96 | 6 |
| M04L02 | Designing code for testability; seams and injection | 96 | 6 |

### M05 Coverage, maintenance and CI (MASTEMY-DESIGN 12%)

- Worked applications: (1) Interpret a coverage report without chasing 100%; (2) Fix a flaky test caused by shared state
- Common misconception addressed: Treating high coverage as proof of good tests
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Coverage: what it tells you and what it does not | 96 | 6 |
| M05L02 | Keeping tests fast and green; tests in CI | 96 | 6 |

## Integrative case

Take an untested 'shopping cart discount' function and bring it under test: write characterisation tests, then use red-green-refactor to add a new tiered-discount rule, isolate a currency-conversion dependency with a test double, and leave a fast, readable suite.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1570-final-protected | 25 | 25 | yes |
| MST-1570-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Why and what to test | 5 |
| Writing good unit tests | 5 |
| Test-driven development | 5 |
| Isolation and test doubles | 5 |
| Coverage, maintenance and CI | 5 |

Minimum reviewed item bank: 338 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1570-Q0001** (single-answer, Select ONE) In test-driven development, what do you do FIRST when adding a new behaviour?

- A. Write a failing test that describes the new behaviour **(key)**  
  _Rationale:_ Correct: TDD starts with a failing (red) test before any implementation.
- B. Write the implementation, then a test to confirm it  
  _Rationale:_ That is test-after, not test-driven development.
- C. Refactor the existing code  
  _Rationale:_ Refactoring is the last step of the cycle, after the test passes.
- D. Delete the old tests  
  _Rationale:_ Existing tests are kept; TDD adds a new failing test.

**MST-1570-Q0002** (multiple-answer, Select ALL that apply) Which are properties of a good unit test? (Select TWO)

- A. It runs fast and in isolation from other tests **(key)**  
  _Rationale:_ Correct: fast, isolated tests are central to the F.I.R.S.T. properties.
- B. It fails for one clear reason **(key)**  
  _Rationale:_ Correct: a focused test points to a single cause when it fails.
- C. It depends on the order other tests run in  
  _Rationale:_ Order dependence makes tests fragile and is undesirable.
- D. It calls the real external payment API every run  
  _Rationale:_ Calling real external services makes tests slow and unreliable; use a double.

**MST-1570-Q0003** (single-answer, Select ONE) A test replaces a slow external service with an object that returns canned data so the unit can be tested in isolation. What is this called?

- A. A stub **(key)**  
  _Rationale:_ Correct: a stub supplies canned responses to isolate the unit under test.
- B. A production adapter  
  _Rationale:_ An adapter is real integration code, not a test double.
- C. A coverage report  
  _Rationale:_ Coverage measures executed lines; it is not a test double.
- D. A refactor  
  _Rationale:_ Refactoring changes structure without changing behaviour; it is not a test double.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
