# Smart Contract Security and Auditing

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1917` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint. Framework/product specifics must be verified at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Smart Contract Security and Auditing (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Classify common smart-contract vulnerability categories
2. Explain reentrancy, access-control and arithmetic flaws with examples
3. Reason about oracle, front-running and economic attacks
4. Apply a structured manual audit process to a contract
5. Use static analysis, fuzzing and tests to find defects
6. Write a clear, prioritised audit report with honest severity ratings

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Vulnerability taxonomy (15% (design weight), design weight)

- Worked applications: (1) Sort findings into a severity matrix; (2) Argue impact vs likelihood for one bug
- Common misconception addressed: Rating every finding as critical
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Classes of smart-contract bugs | 108 | 7 |
| M01L02 | Impact, likelihood and severity | 108 | 7 |

### M02 Reentrancy and state bugs (17% (design weight), design weight)

- Worked applications: (1) Exploit a reentrancy bug on a test contract; (2) Fix it with a guard and reordering
- Common misconception addressed: Assuming a nonReentrant guard fixes all cases
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Single and cross-function reentrancy | 122 | 7 |
| M02L02 | State-ordering and invariant violations | 123 | 7 |

### M03 Access control and arithmetic (16% (design weight), design weight)

- Worked applications: (1) Find a function missing an access modifier; (2) Exploit a rounding error to extract value
- Common misconception addressed: Trusting unchecked arithmetic in old code
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Missing or broken access control | 115 | 7 |
| M03L02 | Overflow, rounding and precision | 115 | 7 |

### M04 Economic and oracle attacks (17% (design weight), design weight)

- Worked applications: (1) Simulate a flash-loan price-manipulation attack; (2) Identify a front-runnable transaction
- Common misconception addressed: Ignoring economic attacks because the code is correct
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Price manipulation and flash loans | 122 | 7 |
| M04L02 | Front-running and MEV exposure | 123 | 7 |

### M05 Tooling (18% (design weight), design weight)

- Worked applications: (1) Run a static analyser and triage its output; (2) Write an invariant and fuzz it to failure
- Common misconception addressed: Treating a clean static scan as proof of safety
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Static analysis and linters | 129 | 7 |
| M05L02 | Fuzzing and invariant testing | 130 | 7 |

### M06 The audit process (17% (design weight), design weight)

- Worked applications: (1) Perform a structured manual review pass; (2) Write a finding with severity and remediation
- Common misconception addressed: Delivering findings with no reproducible steps
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Manual review methodology | 122 | 7 |
| M06L02 | Severity rating and reporting | 123 | 7 |

## Integrative case

You are auditing a lending contract before mainnet launch; run a structured review combining manual analysis, static tooling and fuzzing, reproduce at least one exploit, and deliver a prioritised report with honest severities and remediation guidance.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1917-final-protected | 45 | 55 | yes |
| MST-1917-final-alternate | 45 | 55 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Vulnerability taxonomy | 7 |
| Reentrancy and state bugs | 8 |
| Access control and arithmetic | 7 |
| Economic and oracle attacks | 8 |
| Tooling | 8 |
| The audit process | 7 |

Minimum reviewed item bank: 510 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1917-Q0001** (single-answer, Select ONE) A withdraw function sends Ether before it updates the user's balance. Which vulnerability class is this?

- A. Reentrancy, because an external call occurs before state is settled **(key)**  
  _Rationale:_ Correct: the external call can re-enter before the balance updates.
- B. Integer overflow  
  _Rationale:_ No arithmetic overflow is described.
- C. Missing event emission  
  _Rationale:_ Events are a logging concern, not this bug.
- D. Gas griefing only  
  _Rationale:_ The core issue is reentrancy, not gas griefing.

**MST-1917-Q0002** (multiple-answer, Select TWO) Which TWO practices strengthen a smart-contract audit beyond reading the code once? (Select TWO.)

- A. Writing invariants and fuzzing them against the contract **(key)**  
  _Rationale:_ Correct: fuzzing invariants surfaces edge cases.
- B. Reproducing a suspected exploit in a test to confirm severity **(key)**  
  _Rationale:_ Correct: a working proof of concept validates the finding.
- C. Rating all findings as the same severity to be safe  
  _Rationale:_ Flattening severity destroys prioritisation.
- D. Skipping tests because the code looks clean  
  _Rationale:_ Looking clean is not evidence of safety.

**MST-1917-Q0003** (single-answer, Select ONE) Why can a correct-looking contract still be drained by a flash-loan attack?

- A. The attack manipulates economic inputs like a price oracle rather than breaking the code logic **(key)**  
  _Rationale:_ Correct: economic manipulation exploits design assumptions, not code bugs.
- B. Flash loans overflow every integer  
  _Rationale:_ They do not rely on overflow.
- C. Flash loans delete the contract  
  _Rationale:_ They do not delete contracts.
- D. Correct code is immune to all attacks  
  _Rationale:_ Correct code can still have economic flaws.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
