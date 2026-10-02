# Software Quality Assurance and Test Strategy

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1004` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Software Quality Assurance and Test Strategy (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Define quality attributes and build a risk-based test strategy
2. Apply systematic test-design techniques to derive effective cases
3. Choose appropriate test levels and interpret coverage honestly
4. Improve defect handling, automation choices and quality metrics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Quality and strategy foundations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Translate a quality risk into targeted test coverage; (2) Draft a one-page test strategy for a small product
- Common misconception addressed: Equating quality assurance with manual testing at the end of a project
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | What quality means and who owns it | 120 | 6 |
| M01L02 | Verification versus validation | 120 | 6 |
| M01L03 | Quality attributes and risk | 120 | 6 |
| M01L04 | Building a test strategy | 120 | 6 |

### M02 Test design techniques (25%, MASTEMY-DESIGN)

- Worked applications: (1) Derive boundary-value cases for a numeric input field; (2) Build a decision table for a discount rule with several conditions
- Common misconception addressed: Testing only the happy path and ignoring boundaries and error cases
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Equivalence partitioning and boundary values | 120 | 6 |
| M02L02 | Decision tables and state transitions | 120 | 6 |
| M02L03 | Exploratory testing | 120 | 6 |
| M02L04 | Risk-based prioritisation | 120 | 6 |

### M03 Test levels and the pyramid (25%, MASTEMY-DESIGN)

- Worked applications: (1) Rebalance a top-heavy suite toward the test pyramid; (2) Interpret a coverage number and state what it misses
- Common misconception addressed: Treating high code coverage as proof the software is correct
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Unit, integration, system and acceptance | 120 | 6 |
| M03L02 | The test pyramid and anti-patterns | 120 | 6 |
| M03L03 | Test data and environments | 120 | 6 |
| M03L04 | Coverage: what it does and does not tell you | 120 | 6 |

### M04 Process, automation and metrics (25%, MASTEMY-DESIGN)

- Worked applications: (1) Triage a defect backlog by severity and risk; (2) Decide which tests to automate first and why
- Common misconception addressed: Automating flaky or low-value tests and trusting vanity metrics
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Defect lifecycle and triage | 120 | 6 |
| M04L02 | Where automation pays off | 120 | 6 |
| M04L03 | Quality in CI/CD and shift-left | 120 | 6 |
| M04L04 | Meaningful quality metrics | 120 | 6 |

## Integrative case

A team ships regressions despite a large, slow test suite. Design a risk-based test strategy, rebalance the suite toward the pyramid, and justify which tests to automate and which metrics to track.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1004-final-protected | 144 | 144 | yes |
| MST-1004-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Quality and strategy foundations | 36 |
| Test design techniques | 36 |
| Test levels and the pyramid | 36 |
| Process, automation and metrics | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1004-Q0001** (single-answer, Select ONE) An input accepts integers from 1 to 100. Which set of values best reflects boundary-value analysis?

- A. 0, 1, 100 and 101 **(key)**  
  _Rationale:_ Correct: boundary-value analysis tests just inside and just outside each limit.
- B. 50 only  
  _Rationale:_ A single mid-range value tests neither boundary.
- C. Random values between 1 and 100  
  _Rationale:_ Random mid-range values are unlikely to probe the boundaries where defects cluster.
- D. Only 1 and 100  
  _Rationale:_ Testing just the valid edges omits the just-outside values that catch off-by-one errors.

**MST-1004-Q0002** (single-answer, Select ONE) Why is 90% code coverage not proof that software is correct?

- A. Coverage shows which lines ran, not whether their behaviour was verified **(key)**  
  _Rationale:_ Correct: executing a line is not the same as asserting it produced the right result for all relevant cases.
- B. Coverage above 80% is always sufficient by standard  
  _Rationale:_ No standard threshold proves correctness; the limitation is conceptual.
- C. Coverage measures only integration tests  
  _Rationale:_ Coverage can be measured at any test level; that is not the issue.
- D. Coverage guarantees no boundary defects  
  _Rationale:_ Coverage says nothing specific about boundary conditions.

**MST-1004-Q0003** (multiple-answer, Select TWO) Which TWO statements reflect a healthy application of the test pyramid? (Select TWO)

- A. Many fast unit tests form the base of the suite **(key)**  
  _Rationale:_ Correct: a broad base of fast unit tests gives quick, stable feedback.
- B. Fewer, slower end-to-end tests sit at the top **(key)**  
  _Rationale:_ Correct: expensive end-to-end tests are used sparingly for critical flows.
- C. Most tests should be slow end-to-end UI tests  
  _Rationale:_ A top-heavy suite is the ice-cream-cone anti-pattern: slow and brittle.
- D. Unit tests should be avoided to save time  
  _Rationale:_ Unit tests are the most cost-effective layer, not something to avoid.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
