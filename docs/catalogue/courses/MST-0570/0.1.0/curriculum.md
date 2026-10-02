# GitHub Copilot for Test Generation and Code Review

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0570` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from GitHub's official Copilot documentation; the egress proxy blocked docs.github.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.github.com, EGRESS_BLOCKED); sources: SRC-COPILOT-0570 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — GitHub Copilot for Test Generation and Code Review (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain where Copilot helps with tests and review and what stays human
2. Generate unit and edge-case tests that assert real behaviour
3. Use Copilot to assist code review while keeping the human in charge
4. Judge generated quality artifacts and avoid coverage-driven false confidence
5. Practise quality work responsibly with data care and accountability

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Copilot in the quality workflow (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) List quality tasks Copilot assists well; (2) Identify review judgement that stays human
- Common misconception addressed: Treating Copilot as a replacement for human review
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Where Copilot helps with tests and review | 72 | 5 |
| M01L02 | What stays a human responsibility | 72 | 5 |

### M02 Generating useful tests (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Generate behaviour-asserting tests for a function; (2) Add edge cases to a thin generated test
- Common misconception addressed: Accepting tests that pass but assert nothing
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generating unit tests that assert behaviour | 96 | 5 |
| M02L02 | Adding edge-case and error-path tests | 96 | 5 |

### M03 Assisting code review (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Summarise a diff and surface questions with Copilot; (2) Flag a risky change for closer human review
- Common misconception addressed: Letting Copilot's summary stand in for reading the diff
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Using Copilot to summarise and question a change | 80 | 5 |
| M03L02 | Spotting risky changes with Copilot's help | 80 | 5 |
| M03L03 | Keeping the human reviewer in charge | 80 | 5 |

### M04 Judging generated quality artifacts (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Confirm a generated test fails when behaviour breaks; (2) Reject a coverage gain with no real assertions
- Common misconception addressed: Chasing a coverage number instead of real assertions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Checking a generated test actually fails on a bug | 96 | 5 |
| M04L02 | Avoiding false confidence from coverage | 96 | 5 |

### M05 Responsible quality practice (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a generated test and its fixture for leaks; (2) Assign accountability for a merged, AI-tested change
- Common misconception addressed: Assuming no accountability because Copilot wrote the tests
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keeping sensitive data out of test fixtures and prompts | 96 | 5 |
| M05L02 | Accountability for reviewed and tested changes | 96 | 5 |

## Integrative case

A reviewer uses Copilot on a pull request: generate behaviour-asserting tests with edge cases, confirm they fail when the behaviour breaks, use Copilot to summarise and question the diff while still reading it, keep fixtures free of sensitive data, and stay accountable for the merge.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0570-final-protected | 30 | 40 | yes |
| MST-0570-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Copilot in the quality workflow | 5 |
| Generating useful tests | 6 |
| Assisting code review | 7 |
| Judging generated quality artifacts | 6 |
| Responsible quality practice | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0570-Q0001** (single-answer, Select ONE) How should a Copilot summary of a diff be used in review?

- A. As a starting point while the reviewer still reads the diff **(key)**  
  _Rationale:_ Correct: a summary aids review but does not replace reading the change.
- B. As a full replacement for reading the diff  
  _Rationale:_ A summary can miss exactly the risky detail that matters.
- C. As the sole record, with no human reviewer  
  _Rationale:_ A human must stay accountable for the review.
- D. Ignored entirely as useless  
  _Rationale:_ A summary is useful context when used alongside the diff.

**MST-0570-Q0002** (multiple-answer, Select TWO) Which TWO checks confirm a generated test is worth keeping? (Select TWO.)

- A. It asserts the intended behaviour **(key)**  
  _Rationale:_ Correct: meaningful assertions give a test its value.
- B. It fails when the behaviour is broken **(key)**  
  _Rationale:_ Correct: a test that cannot fail protects nothing.
- C. It raises coverage with no assertions  
  _Rationale:_ Coverage without assertions is false confidence.
- D. It always passes regardless of the code  
  _Rationale:_ A never-failing test is worthless.

**MST-0570-Q0003** (single-answer, Select ONE) A generated test raised coverage but asserts nothing meaningful. What should you do?

- A. Reject or rewrite it to assert real behaviour **(key)**  
  _Rationale:_ Correct: coverage without assertions gives false confidence.
- B. Keep it because coverage went up  
  _Rationale:_ A higher number with no assertions protects nothing.
- C. Delete all other tests to match its style  
  _Rationale:_ That spreads the problem.
- D. Merge it and move on  
  _Rationale:_ Merging a meaningless test adds no quality.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
