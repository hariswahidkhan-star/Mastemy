# React Testing and Component Quality Assurance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0874` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — React Testing and Component Quality Assurance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Test components by user behaviour
2. Test interactions and asynchronous UI
3. Mock the network and isolate tests
4. Manage coverage, accessibility and CI

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Testing approach (MASTEMY-DESIGN 25%)

- Worked applications: (1) Query by role and text like a user; (2) Avoid testing internal component state
- Common misconception addressed: Reaching for test IDs for everything
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Testing user behaviour vs implementation | 120 | 7 |
| M01L02 | React Testing Library philosophy | 120 | 7 |

### M02 Interactions (MASTEMY-DESIGN 25%)

- Worked applications: (1) Test a button click updating the UI; (2) Wait for async content to appear
- Common misconception addressed: Using getBy for content that appears later
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Firing events and user-event | 120 | 7 |
| M02L02 | Asynchronous queries and findBy | 120 | 7 |

### M03 Mocking and isolation (MASTEMY-DESIGN 25%)

- Worked applications: (1) Mock an API response in a test; (2) Test loading and error states
- Common misconception addressed: Hitting the real network in unit tests
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Mocking network and modules | 120 | 7 |
| M03L02 | Mock Service Worker basics | 120 | 7 |

### M04 Quality and CI (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add an accessibility assertion; (2) Stabilise and run tests in CI
- Common misconception addressed: Equating coverage percentage with quality
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Coverage, accessibility checks and flakiness | 120 | 7 |
| M04L02 | Running component tests in CI | 120 | 7 |

## Integrative case

Add a test suite to a form component: query by role like a user, test a submit interaction and its async success and error states with a mocked API, add an accessibility assertion, and run the suite reliably in CI.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0874-final-protected | 40 | 50 | yes |
| MST-0874-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Testing approach | 10 |
| Interactions | 10 |
| Mocking and isolation | 10 |
| Quality and CI | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0874-Q0001** (single-answer, Select ONE) React Testing Library encourages querying elements by...

- A. role and accessible text, the way a user perceives them **(key)**  
  _Rationale:_ Correct: user-facing queries make tests resilient and accessible.
- B. internal component state  
  _Rationale:_ That couples tests to implementation.
- C. CSS class names only  
  _Rationale:_ Class names are brittle and not user-facing.
- D. the virtual DOM fiber nodes  
  _Rationale:_ Fibers are internals, not a query target.

**MST-0874-Q0002** (multiple-answer, Select TWO) Which TWO are good component-testing practices? (Select TWO.)

- A. Mock network requests in unit tests **(key)**  
  _Rationale:_ Correct: mocking keeps unit tests fast and deterministic.
- B. Use findBy/await for content that appears asynchronously **(key)**  
  _Rationale:_ Correct: async queries wait for the element to appear.
- C. Call the production API in every test  
  _Rationale:_ Real network calls make tests slow and flaky.
- D. Assert on private implementation details  
  _Rationale:_ That makes tests brittle.

**MST-0874-Q0003** (single-answer, Select ONE) A test using getByText for content that loads after a fetch will...

- A. fail because the element is not present yet **(key)**  
  _Rationale:_ Correct: getBy does not wait, so it fails before the content loads.
- B. always pass  
  _Rationale:_ It cannot pass before the element exists.
- C. mock the network automatically  
  _Rationale:_ A query does not mock anything.
- D. improve coverage  
  _Rationale:_ A failing query does not improve coverage.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
