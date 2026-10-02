# JavaScript Unit Testing with Vitest and Jest

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0898` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Legacy IDs | (none) |
| Planned time | T = 900 min; instruction I = 720 min (80%); assessment A = 180 min (20%) |
| Assessment split | lesson checks 45 / module checks 63 / cumulative 72 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure unit tests with clear arrange-act-assert and good naming
2. Use mocks, spies and fakes to isolate the unit under test
3. Test asynchronous code and timers reliably
4. Measure coverage and run tests in CI while keeping suites maintainable

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: hands-on performance, tool operation and code authoring are not reproducible in MCQ/MR and are not assessed in this format.

## Verification

Status: **n/a-no-official-syllabus**. Source(s) consulted:
- none (no external source; Mastemy skills course)

## Modules

Module weights are a DESIGN ASSUMPTION (equal weight); no official weighting is published for this skills topic.

### M01 Test fundamentals

- Purpose: Teach what a unit test is and how to structure it.
- Worked applications: (1) Write arrange-act-assert tests for a pure pricing function; (2) Name tests so a failure report reads like a specification
- Common misconception addressed: Writing one giant test that asserts many unrelated behaviors
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What a unit test is | 80 | 5 |
| M01L02 | Arrange-act-assert and naming | 80 | 5 |
| M01L03 | Vitest and Jest basics | 80 | 5 |

### M02 Test doubles

- Purpose: Teach mocks, spies, stubs and fakes to isolate units.
- Worked applications: (1) Spy on a logger to assert it was called with the right arguments; (2) Replace a network module with a fake so the test stays offline
- Common misconception addressed: Mocking so much that the test no longer verifies real behavior
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Mocks, spies, stubs and fakes | 80 | 5 |
| M02L02 | Isolating dependencies | 80 | 5 |
| M02L03 | When not to mock | 80 | 5 |

### M03 Async, coverage and CI

- Purpose: Teach async/timer testing, coverage and maintainable CI suites.
- Worked applications: (1) Test a promise-returning function for both resolve and reject paths; (2) Use fake timers to test a debounce without real waiting
- Common misconception addressed: Treating 100% line coverage as proof the code is correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Testing async code and timers | 80 | 5 |
| M03L02 | Coverage and what it does not prove | 80 | 5 |
| M03L03 | Running tests in CI | 80 | 5 |

## Integrative case

A JavaScript module has flaky, slow tests that hit the network and still miss bugs. Restructure them with arrange-act-assert, isolate dependencies with appropriate doubles, make async and timer tests deterministic, and wire coverage into CI without chasing a misleading 100%.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course; no external exam defines question count or duration.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0898-final-protected | 30 | 30 | yes |
| MST-0898-practice-form-ALT | 30 | 30 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Test fundamentals | 10 |
| Test doubles | 10 |
| Async, coverage and CI | 10 |

Minimum reviewed item bank: 276 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0898-Q0001** (single-answer, Select ONE) What does the arrange-act-assert structure give a unit test?

- A. A clear separation of setup, the single action under test, and the verification **(key)**  
  _Rationale:_ Correct: AAA keeps tests readable by separating setup, action and assertion.
- B. A guarantee the code has no bugs  
  _Rationale:_ Structure improves clarity but cannot guarantee bug-free code.
- C. Automatic parallel execution across machines  
  _Rationale:_ AAA is about structure, not execution topology.
- D. A replacement for the production code  
  _Rationale:_ Tests verify code; they do not replace it.

**MST-0898-Q0002** (multiple-answer, Select TWO) Select TWO techniques for making asynchronous and timer-based JavaScript tests reliable.

- A. Await the promise and assert both resolve and reject paths **(key)**  
  _Rationale:_ Correct: awaiting and covering both outcomes makes async tests deterministic.
- B. Use fake timers to advance time instead of real waiting **(key)**  
  _Rationale:_ Correct: fake timers remove real delays and flakiness from timer tests.
- C. Add fixed real sleeps and hope the operation finished  
  _Rationale:_ Real sleeps are slow and flaky.
- D. Hit the live network so the test is realistic  
  _Rationale:_ Live network calls make unit tests slow and non-deterministic.
- E. Ignore the reject path because it rarely happens  
  _Rationale:_ Untested error paths are a common source of real bugs.

**MST-0898-Q0003** (single-answer, Select ONE) Why is 100% line coverage not proof that code is correct?

- A. Executing a line is not the same as asserting its behavior is right **(key)**  
  _Rationale:_ Correct: coverage shows lines ran, not that outcomes were meaningfully asserted.
- B. Coverage tools always report the wrong number  
  _Rationale:_ Coverage numbers are generally accurate; the issue is what they mean.
- C. 100% coverage is impossible to reach  
  _Rationale:_ It is reachable; the point is it still does not prove correctness.
- D. Coverage measures performance, not tests  
  _Rationale:_ Coverage measures executed code, not performance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
