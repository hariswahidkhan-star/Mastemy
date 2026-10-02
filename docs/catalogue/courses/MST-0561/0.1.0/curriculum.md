# Cursor for Safe Legacy-Code Modernization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0561` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Feature facts intended to be drawn from Cursor's official documentation; the egress proxy blocked docs.cursor.com this session (EGRESS_BLOCKED), so no official page was read. Features, menu names and limits are DESIGN ASSUMPTION pending an official check. |
| Official sources | (none read; vendor docs blocked by egress proxy) |
| Evidence | **unverified-needs-official-check** - vendor site blocked by egress proxy this session (docs.cursor.com, EGRESS_BLOCKED); sources: SRC-CURSOR-0561 |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Cursor for Safe Legacy-Code Modernization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Cursor to understand legacy code and map its dependencies
2. Capture current behaviour with characterization tests before changing code
3. Modernize incrementally with the agent and a review safety net
4. Manage dependency and behaviour risk during modernization
5. Deliver modernization responsibly with review, sign-off and code security

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate live tool use or writing quality; those are taught through instructor demonstrations and model-answer analysis.

## Modules

### M01 Understanding legacy code with Cursor (MASTEMY-DESIGN 15%, design weight)

- Worked applications: (1) Get a plain-language explanation of a legacy module; (2) Map what a change would touch before starting
- Common misconception addressed: Changing legacy code before understanding its callers
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Using Cursor to explain unfamiliar code | 72 | 5 |
| M01L02 | Mapping dependencies before changing anything | 72 | 5 |

### M02 Characterization tests first (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Write characterization tests for a legacy function; (2) Pin current behaviour before refactoring
- Common misconception addressed: Refactoring legacy code with no behavioural safety net
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Capturing current behaviour as tests | 96 | 5 |
| M02L02 | Building a safety net around untested code | 96 | 5 |

### M03 Incremental modernization with the agent (MASTEMY-DESIGN 25%, design weight)

- Worked applications: (1) Modernize one seam in a small reversible step; (2) Reject a step that broke a characterization test
- Common misconception addressed: Attempting a big-bang rewrite instead of small steps
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Scoping small, reversible modernization steps | 80 | 5 |
| M03L02 | Reviewing agent diffs against the safety net | 80 | 5 |
| M03L03 | Rolling back a step that changed behaviour | 80 | 5 |

### M04 Managing risk and dependencies (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Plan a dependency upgrade with a rollback; (2) Decide which legacy area is not worth touching now
- Common misconception addressed: Upgrading everything at once without a rollback plan
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Handling deprecated dependencies and APIs | 96 | 5 |
| M04L02 | Deciding what to modernize versus leave alone | 96 | 5 |

### M05 Responsible modernization delivery (MASTEMY-DESIGN 20%, design weight)

- Worked applications: (1) Review a modernization step before merge; (2) Route a behaviour-affecting change to sign-off
- Common misconception addressed: Treating 'tests still pass' as proof nothing changed when tests are thin
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Keeping proprietary legacy code secure in prompts | 96 | 5 |
| M05L02 | Human review and sign-off for behaviour-affecting changes | 96 | 5 |

## Integrative case

A developer modernizes a fragile legacy billing module with Cursor: first use it to explain the code and map callers, capture current behaviour as characterization tests, then make small reversible steps reviewed against that safety net, with behaviour-affecting changes sent to sign-off.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0561-final-protected | 30 | 40 | yes |
| MST-0561-final-alternate | 30 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Understanding legacy code with Cursor | 5 |
| Characterization tests first | 6 |
| Incremental modernization with the agent | 7 |
| Managing risk and dependencies | 6 |
| Responsible modernization delivery | 6 |

Minimum reviewed item bank: 330 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0561-Q0001** (single-answer, Select ONE) What should come before refactoring untested legacy code?

- A. Writing characterization tests that capture current behaviour **(key)**  
  _Rationale:_ Correct: a behavioural safety net lets you refactor with confidence.
- B. Deleting the parts that look unused  
  _Rationale:_ Deleting code you do not understand is risky.
- C. A full big-bang rewrite  
  _Rationale:_ Big-bang rewrites discard the safety net and raise risk.
- D. Upgrading every dependency first  
  _Rationale:_ Mass upgrades add risk before you can detect regressions.

**MST-0561-Q0002** (multiple-answer, Select TWO) Which TWO principles make legacy modernization with Cursor safer? (Select TWO.)

- A. Make small, reversible steps reviewed against tests **(key)**  
  _Rationale:_ Correct: small reversible steps limit and localise risk.
- B. Understand callers and dependencies before changing code **(key)**  
  _Rationale:_ Correct: knowing the blast radius prevents surprises.
- C. Replace everything in a single large change  
  _Rationale:_ Big-bang changes are hard to review and revert.
- D. Skip tests because the code is old  
  _Rationale:_ Old code needs a safety net more, not less.

**MST-0561-Q0003** (single-answer, Select ONE) Tests still pass after a change, but the suite is thin. What does that tell you?

- A. Passing thin tests is weak evidence; behaviour may still have changed **(key)**  
  _Rationale:_ Correct: a thin suite cannot prove behaviour was preserved.
- B. The change is definitely safe to ship  
  _Rationale:_ Thin tests do not prove safety.
- C. No further review is needed  
  _Rationale:_ Behaviour-affecting changes still need review.
- D. Coverage must already be complete  
  _Rationale:_ Passing tests say nothing about coverage completeness.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
