# End-to-End Browser Testing with Playwright

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0897` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — End-to-End Browser Testing with Playwright (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write basic Playwright tests
2. Use auto-waiting and web-first assertions
3. Organise tests with the Page Object Model
4. Control network and authentication state
5. Use fixtures and run tests in parallel
6. Debug tests with traces and artifacts
7. Add visual and accessibility testing
8. Integrate Playwright into CI pipelines

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Playwright fundamentals (MASTEMY-DESIGN 12%)

- Worked applications: (1) Write a first test navigating and asserting; (2) Select elements with role-based locators
- Common misconception addressed: Using brittle CSS selectors instead of user-facing locators
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Test structure, runner and browsers | 120 | 7 |
| M01L02 | Locators and the page object | 120 | 7 |

### M02 Auto-waiting and assertions (MASTEMY-DESIGN 12%)

- Worked applications: (1) Rely on auto-waiting instead of manual sleeps; (2) Use expect().toBeVisible with retry
- Common misconception addressed: Adding fixed waitForTimeout calls to fix flakiness
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Actionability and auto-waiting | 120 | 7 |
| M02L02 | Web-first assertions and retries | 120 | 7 |

### M03 Locators and the Page Object Model (MASTEMY-DESIGN 12%)

- Worked applications: (1) Refactor selectors into a page object; (2) Chain and filter locators
- Common misconception addressed: Treating a locator as a snapshot rather than a lazy query
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Resilient locator strategies | 120 | 7 |
| M03L02 | Page Object Model structure | 120 | 7 |

### M04 Network and state control (MASTEMY-DESIGN 12%)

- Worked applications: (1) Mock an API response with route interception; (2) Reuse a saved auth storage state
- Common misconception addressed: Logging in through the UI in every test instead of reusing auth state
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Intercepting and mocking network | 120 | 7 |
| M04L02 | Managing storage state and auth | 120 | 7 |

### M05 Fixtures and parallelism (MASTEMY-DESIGN 12%)

- Worked applications: (1) Create a custom fixture for a logged-in page; (2) Shard tests across workers
- Common misconception addressed: Sharing mutable state between parallel workers and causing flakiness
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Test fixtures and worker scope | 120 | 7 |
| M05L02 | Parallel execution and isolation | 120 | 7 |

### M06 Debugging and tracing (MASTEMY-DESIGN 12%)

- Worked applications: (1) Capture and open a trace for a failure; (2) Diagnose a race from a trace
- Common misconception addressed: Assuming a passing local run guarantees no flakiness in CI
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Trace viewer and screenshots | 120 | 7 |
| M06L02 | Debugging flaky tests | 120 | 7 |

### M07 Visual and accessibility testing (MASTEMY-DESIGN 12%)

- Worked applications: (1) Add a screenshot comparison with a threshold; (2) Run an accessibility scan on a page
- Common misconception addressed: Committing visual snapshots from an inconsistent rendering environment
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Visual comparison snapshots | 120 | 7 |
| M07L02 | Accessibility checks | 120 | 7 |

### M08 CI integration and reporting (MASTEMY-DESIGN 12%)

- Worked applications: (1) Configure retries and the HTML reporter in CI; (2) Upload traces as CI artifacts on failure
- Common misconception addressed: Setting unlimited retries to mask genuinely failing tests
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Running Playwright in CI | 120 | 7 |
| M08L02 | Reporters, retries and artifacts | 120 | 7 |

## Integrative case

Build an end-to-end suite for a web app: role-based locators and a Page Object Model, auto-waiting assertions with no manual sleeps, mocked network and reused auth storage state, custom fixtures running in parallel, trace capture on failure, visual and accessibility checks, and CI with retries, the HTML reporter and uploaded artifacts.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0897-final-protected | 48 | 60 | yes |
| MST-0897-final-alternate | 48 | 60 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Playwright fundamentals | 6 |
| Auto-waiting and assertions | 6 |
| Locators and the Page Object Model | 6 |
| Network and state control | 6 |
| Fixtures and parallelism | 6 |
| Debugging and tracing | 6 |
| Visual and accessibility testing | 6 |
| CI integration and reporting | 6 |

Minimum reviewed item bank: 656 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0897-Q0001** (single-answer, Select ONE) A test is flaky because an element appears slightly late. What is the idiomatic Playwright fix?

- A. Rely on auto-waiting via a web-first assertion like expect(locator).toBeVisible() **(key)**  
  _Rationale:_ Correct: Playwright auto-waits and retries the assertion until it passes or times out.
- B. Add page.waitForTimeout(3000) before the action  
  _Rationale:_ Fixed sleeps are brittle and slow; they hide rather than fix the race.
- C. Disable retries entirely  
  _Rationale:_ Disabling retries does not address the timing issue.
- D. Switch to a brittle nth-child CSS selector  
  _Rationale:_ Brittle selectors increase flakiness, not reduce it.

**MST-0897-Q0002** (multiple-answer, Select TWO) Which TWO practices make a Playwright suite faster and more reliable? (Select TWO.)

- A. Reusing a saved authentication storage state across tests **(key)**  
  _Rationale:_ Correct: reusing auth state avoids logging in through the UI every test.
- B. Using role-based, user-facing locators **(key)**  
  _Rationale:_ Correct: accessible-role locators are more resilient than brittle CSS.
- C. Sharing mutable global state between parallel workers  
  _Rationale:_ Shared mutable state across workers causes flakiness.
- D. Adding long fixed sleeps everywhere  
  _Rationale:_ Fixed sleeps slow the suite and mask real timing issues.

**MST-0897-Q0003** (single-answer, Select ONE) What does the Playwright trace viewer primarily help you do?

- A. Inspect a timeline of actions, DOM snapshots and network to diagnose a failure **(key)**  
  _Rationale:_ Correct: the trace viewer reconstructs what happened during the run.
- B. Automatically rewrite failing selectors  
  _Rationale:_ The trace viewer inspects; it does not rewrite code.
- C. Guarantee a test can never be flaky again  
  _Rationale:_ It aids diagnosis but offers no such guarantee.
- D. Replace the need for assertions  
  _Rationale:_ Assertions remain essential; the trace only helps debugging.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
