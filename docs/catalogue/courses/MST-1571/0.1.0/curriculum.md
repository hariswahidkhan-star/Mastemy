# Test Automation with Selenium and Playwright

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1571` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-TASP-001 |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Test Automation with Selenium and Playwright (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. E2E testing foundations
2. Locating elements
3. Interactions
4. Waiting and asynchrony
5. Page Object pattern
6. Cross-browser and devices
7. Debugging and artifacts
8. CI integration

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on automated end-to-end testing with Selenium and Playwright; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 E2E testing foundations (MASTEMY-DESIGN 13%)

- Worked applications: (1) Place E2E tests in the overall strategy; (2) Choose a tool for a given project
- Common misconception addressed: Writing everything as E2E tests and skipping unit tests
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | The test pyramid and where E2E fits | 60 | 5 |
| M01L02 | Selenium vs Playwright | 60 | 5 |

### M02 Locating elements (MASTEMY-DESIGN 13%)

- Worked applications: (1) Select an element by role or test id; (2) Replace a brittle XPath with a stable locator
- Common misconception addressed: Depending on auto-generated CSS classes that change
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Selectors and locator strategies | 60 | 5 |
| M02L02 | Robust vs brittle selectors | 60 | 5 |

### M03 Interactions (MASTEMY-DESIGN 12%)

- Worked applications: (1) Fill and submit a login form; (2) Assert on resulting page state
- Common misconception addressed: Asserting before the UI has updated
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Clicks, typing and forms | 60 | 5 |
| M03L02 | Navigation and assertions | 60 | 5 |

### M04 Waiting and asynchrony (MASTEMY-DESIGN 13%)

- Worked applications: (1) Wait for an element to be actionable; (2) Diagnose a race-condition flake
- Common misconception addressed: Using fixed sleeps instead of condition-based waits
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Explicit vs implicit waits | 60 | 5 |
| M04L02 | Auto-waiting and flakiness | 60 | 5 |

### M05 Page Object pattern (MASTEMY-DESIGN 12%)

- Worked applications: (1) Model a page as a Page Object; (2) Reuse a login action across tests
- Common misconception addressed: Putting selectors directly in every test
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Encapsulating pages | 60 | 5 |
| M05L02 | Reusable actions and assertions | 60 | 5 |

### M06 Cross-browser and devices (MASTEMY-DESIGN 13%)

- Worked applications: (1) Run a test across multiple browsers; (2) Emulate a mobile viewport
- Common misconception addressed: Assuming one browser's behaviour holds for all
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Running across browsers | 60 | 5 |
| M06L02 | Viewport and mobile emulation | 60 | 5 |

### M07 Debugging and artifacts (MASTEMY-DESIGN 12%)

- Worked applications: (1) Capture a trace on failure; (2) Investigate a screenshot of a failed step
- Common misconception addressed: Re-running a flaky test until it passes without diagnosis
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Screenshots, videos and traces | 60 | 5 |
| M07L02 | Reading failures | 60 | 5 |

### M08 CI integration (MASTEMY-DESIGN 12%)

- Worked applications: (1) Run the suite headless in CI; (2) Shard tests to run in parallel
- Common misconception addressed: Letting flaky tests erode trust in the suite
- Module check: 10 items / 10 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Running tests in CI | 60 | 5 |
| M08L02 | Parallelism and reliability | 60 | 5 |

## Integrative case

Build a small end-to-end test suite for a login-and-checkout flow: locate elements robustly, handle waits and asynchrony, structure tests with the Page Object pattern, and make the suite reliable in CI.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1571-final-protected | 40 | 40 | yes |
| MST-1571-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| E2E testing foundations | 5 |
| Locating elements | 5 |
| Interactions | 5 |
| Waiting and asynchrony | 5 |
| Page Object pattern | 5 |
| Cross-browser and devices | 5 |
| Debugging and artifacts | 5 |
| CI integration | 5 |

Minimum reviewed item bank: 400 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1571-Q0001** (single-answer, Select ONE) Why are role-based or test-id locators preferred over selectors tied to CSS class names?

- A. They are more stable because they do not break when styling or generated class names change **(key)**  
  _Rationale:_ Correct: resilient locators reduce test brittleness.
- B. They make the page render faster  
  _Rationale:_ Locators do not affect rendering speed.
- C. They remove the need for waits  
  _Rationale:_ Waiting is a separate concern.
- D. They only work in Selenium  
  _Rationale:_ Both tools support stable locators.

**MST-1571-Q0002** (single-answer, Select ONE) What is the main problem with using fixed sleeps (e.g. sleep 3s) in E2E tests?

- A. They are either too short (flaky) or too long (slow), unlike condition-based waits **(key)**  
  _Rationale:_ Correct: condition-based waiting is both faster and more reliable.
- B. They are not supported by any framework  
  _Rationale:_ They are supported but discouraged.
- C. They disable screenshots  
  _Rationale:_ Unrelated to artifacts.
- D. They force cross-browser runs  
  _Rationale:_ Unrelated to browser coverage.

**MST-1571-Q0003** (multiple-answer, Select ALL that apply) Which statements about the Page Object pattern are correct? (Select TWO)

- A. It centralises selectors and page actions so tests are less brittle **(key)**  
  _Rationale:_ Correct: changes to a page are made in one place.
- B. It improves reuse by sharing actions like login across tests **(key)**  
  _Rationale:_ Correct: common flows become reusable methods.
- C. It requires putting raw selectors in every test  
  _Rationale:_ False; it removes selectors from tests.
- D. It eliminates the need for assertions  
  _Rationale:_ False; tests still assert on outcomes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
