# Test Automation Architecture and Maintainability

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1005` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs |  |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Test Automation Architecture and Maintainability (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Test automation strategy
2. Designing for maintainability
3. UI automation patterns
4. Stable locators and waits
5. Test data and environments
6. Flakiness and reliability
7. CI integration and reporting

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Test automation strategy (MASTEMY-DESIGN 15%)

- Worked applications: (1) Decide which checks belong at unit, service or UI level; (2) Rebalance a top-heavy suite toward the pyramid
- Common misconception addressed: Believing automating everything through the UI is the safest strategy
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Goals of automation and what to automate | 103 | 6 |
| M01L02 | The test pyramid and the ice-cream-cone anti-pattern | 103 | 6 |

### M02 Designing for maintainability (MASTEMY-DESIGN 15%)

- Worked applications: (1) Extract a reusable action to remove duplication; (2) Refactor a test so a UI change touches one place
- Common misconception addressed: Copy-pasting steps across tests so one change breaks dozens of tests
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Separating intent from mechanics | 103 | 6 |
| M02L02 | DRY helpers, fixtures and the rule of least knowledge | 103 | 6 |

### M03 UI automation patterns (MASTEMY-DESIGN 14%)

- Worked applications: (1) Encapsulate a screen behind a page object; (2) Model a user task with the screenplay pattern
- Common misconception addressed: Putting assertions inside page objects and coupling them to tests
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The page object model | 103 | 6 |
| M03L02 | The screenplay/actor pattern and when to prefer it | 103 | 6 |

### M04 Stable locators and waits (MASTEMY-DESIGN 14%)

- Worked applications: (1) Replace a brittle XPath with a stable test ID; (2) Remove a fixed sleep in favour of an explicit wait
- Common misconception addressed: Using fixed sleeps to 'fix' timing problems
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Choosing resilient selectors | 103 | 6 |
| M04L02 | Explicit waits versus fixed sleeps | 103 | 6 |

### M05 Test data and environments (MASTEMY-DESIGN 14%)

- Worked applications: (1) Make a test create and clean up its own data; (2) Design data so tests run safely in parallel
- Common misconception addressed: Relying on shared seeded data that other tests mutate
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Independent, self-provisioning test data | 103 | 6 |
| M05L02 | Isolation, cleanup and parallel-safe tests | 103 | 6 |

### M06 Flakiness and reliability (MASTEMY-DESIGN 14%)

- Worked applications: (1) Diagnose a flaky test and classify its root cause; (2) Set a quarantine-and-fix policy instead of blind retries
- Common misconception addressed: Masking a flaky test permanently with an automatic retry
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Sources of flakiness and how to detect them | 103 | 6 |
| M06L02 | Quarantine, retries and root-cause policy | 103 | 6 |

### M07 CI integration and reporting (MASTEMY-DESIGN 14%)

- Worked applications: (1) Shard a suite to keep CI feedback fast; (2) Produce a report that points to the failing step, not just red/green
- Common misconception addressed: Treating a long, all-or-nothing CI run as acceptable feedback
- Module check: 18 items / 18 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Running suites in CI with sharding | 102 | 6 |
| M07L02 | Actionable reporting and trend tracking | 102 | 6 |

## Integrative case

Design a maintainable automated test architecture for a web application: choose the test pyramid balance, a page-object or screenplay structure, stable selectors and test data strategy, flakiness controls, and a CI integration, then review an existing brittle suite and propose refactors.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1005-final-protected | 35 | 35 | yes |
| MST-1005-final-alternate | 35 | 35 | no (optional practice) |

Minimum reviewed item bank: 490 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1005-Q0001** (single-answer, Select ONE) A UI test fails intermittently because it clicks a button before the page finishes loading. What is the maintainable fix?

- A. Replace the fixed sleep with an explicit wait for the element to be interactable **(key)**  
  _Rationale:_ Correct: an explicit condition-based wait handles variable load times reliably.
- B. Add a longer fixed sleep before the click  
  _Rationale:_ Longer sleeps slow the suite and still fail under load spikes.
- C. Wrap the test in an automatic retry and move on  
  _Rationale:_ Retrying masks the timing defect rather than fixing it.
- D. Delete the assertion after the click  
  _Rationale:_ Removing the assertion removes the test's value.

**MST-1005-Q0002** (multiple-answer, Select TWO) Which TWO practices reduce maintenance cost when the UI changes frequently? (Select TWO)

- A. Encapsulating each screen behind a page object **(key)**  
  _Rationale:_ Correct: a page object localises UI changes to one place.
- B. Selecting elements by stable test IDs rather than layout-dependent paths **(key)**  
  _Rationale:_ Correct: stable test IDs survive layout and styling changes.
- C. Duplicating selector strings in every test  
  _Rationale:_ Duplication multiplies the edits needed for one change.
- D. Selecting elements by their absolute XPath position  
  _Rationale:_ Absolute XPath breaks on minor structural changes.

**MST-1005-Q0003** (single-answer, Select ONE) Which distribution matches a healthy test pyramid?

- A. Many fast unit tests, fewer service tests, few UI tests **(key)**  
  _Rationale:_ Correct: the pyramid favours many cheap unit tests and few expensive UI tests.
- B. Mostly UI tests with few unit tests  
  _Rationale:_ That is the ice-cream-cone anti-pattern, which is slow and brittle.
- C. Only end-to-end tests  
  _Rationale:_ End-to-end-only suites are slow and hard to diagnose.
- D. Equal numbers at every level regardless of cost  
  _Rationale:_ Ignoring cost and speed defeats the purpose of the pyramid.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
