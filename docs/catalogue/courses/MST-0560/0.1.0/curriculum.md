# Cursor for Automated Testing and Defect Repair

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0560` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0560 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor for Automated Testing and Defect Repair (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Set up a testing and defect-repair workflow in Cursor
2. Generate unit and edge-case tests that assert real behaviour
3. Reproduce a defect as a failing test and drive a minimal fix
4. Read coverage and avoid brittle, false-confidence tests
5. Deliver AI-assisted tests and fixes responsibly with human review

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 A testing workflow in Cursor (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Set up a repo so Cursor can run and read tests; (2) Decide inline fix versus agent for a defect
- Common misconception addressed: Expecting Cursor to find a bug with no failing signal
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How Cursor uses code and failures as context | 72 | 5 |
| M01L02 | Choosing a surface for a test versus a bug fix | 72 | 5 |

### M02 Generating meaningful tests (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Generate tests that assert behaviour, not implementation; (2) Add boundary and error-path cases to a thin test
- Common misconception addressed: Accepting tests that pass but assert nothing useful
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generating unit tests that assert real behaviour | 96 | 5 |
| M02L02 | Covering edge cases and boundaries | 96 | 5 |

### M03 Reproducing and repairing defects (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Write a failing test that reproduces a reported bug; (2) Make the smallest change that turns it green
- Common misconception addressed: Fixing the symptom while leaving the root cause
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Turning a bug report into a failing test | 80 | 5 |
| M03L02 | Using the failing test to drive a minimal fix | 80 | 5 |
| M03L03 | Confirming the fix and guarding against regression | 80 | 5 |

### M04 Coverage and test quality (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Find an untested branch and add a test for it; (2) Rework a brittle test into a stable one
- Common misconception addressed: Chasing a coverage number instead of meaningful assertions
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Reading coverage output with Cursor | 96 | 5 |
| M04L02 | Avoiding brittle and false-confidence tests | 96 | 5 |

### M05 Responsible test delivery (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review an AI-written fix and its test before merge; (2) Decide which fix needs a human to confirm the root cause
- Common misconception addressed: Trusting an AI fix without confirming the root cause
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keeping sensitive data out of fixtures and prompts | 96 | 5 |
| M05L02 | Human review of AI-written tests and fixes | 96 | 5 |

## Integrative case

An engineer repairs a reported defect with Cursor: reproduce it as a failing test, use that signal to drive the smallest correct fix, add a regression guard, check the branch was actually exercised, and merge after a human confirms the root cause.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0560-final-protected | 30 | 40 | yes |
| MST-0560-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| A testing workflow in Cursor | 5 |
| Generating meaningful tests | 6 |
| Reproducing and repairing defects | 7 |
| Coverage and test quality | 6 |
| Responsible test delivery | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0560-Q0001** (single-answer, Select ONE) What is the first step when repairing a reported defect in Cursor?

- A. Reproduce the defect as a failing test **(key)**  
  _Rationale:_ Correct: a failing test gives a precise signal to fix against.
- B. Rewrite the whole module to be safe  
  _Rationale:_ A broad rewrite ignores the specific defect.
- C. Increase the coverage percentage first  
  _Rationale:_ Coverage does not reproduce the bug.
- D. Delete the failing feature  
  _Rationale:_ Removing the feature is not a repair.

**MST-0560-Q0002** (multiple-answer, Select TWO) Which TWO signs show a generated test is actually useful? (Select TWO.)

- A. It asserts the intended behaviour, not just that code ran **(key)**  
  _Rationale:_ Correct: meaningful assertions are what give a test value.
- B. It fails when the behaviour is broken **(key)**  
  _Rationale:_ Correct: a test that cannot fail protects nothing.
- C. It always passes regardless of the code  
  _Rationale:_ A test that never fails gives false confidence.
- D. It raises the coverage number with no assertions  
  _Rationale:_ Coverage without assertions is false confidence.

**MST-0560-Q0003** (single-answer, Select ONE) An AI fix makes the failing test pass. What still must be confirmed?

- A. That the fix addresses the root cause, not just the symptom **(key)**  
  _Rationale:_ Correct: a green test can still leave the root cause in place.
- B. That the commit message is long enough  
  _Rationale:_ Message length is irrelevant to correctness.
- C. That coverage reached 100 percent  
  _Rationale:_ Total coverage is not the goal here.
- D. That the agent wrote it quickly  
  _Rationale:_ Speed says nothing about correctness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
