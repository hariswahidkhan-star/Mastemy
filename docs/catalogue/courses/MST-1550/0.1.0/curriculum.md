# Coding Interview Preparation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1550` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | none |
| Planned time | T = 2100 min; instruction I = 1680 min (80%); assessment A = 420 min (20%) |
| Assessment split | lesson checks 105 / module checks 147 / cumulative 168 min |
| Certificate | Mastemy Certificate of Completion — does not award any external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure a problem-solving approach under interview conditions
2. Recognise common problem patterns and map them to techniques
3. Communicate reasoning and trade-offs while coding
4. Analyse and state the complexity of a proposed solution
5. Handle edge cases, testing and debugging on the spot
6. Manage behavioural and system-design discussion basics

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Interview approach and communication (MASTEMY-DESIGN 20%)

- Worked applications: (1) Restate an ambiguous prompt into constraints; (2) Narrate a plan before coding
- Common misconception addressed: Jumping to code before clarifying requirements
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Clarify, plan, code, test framework | 168 | 8 |
| M01L02 | Thinking aloud and handling hints | 168 | 8 |

### M02 Arrays, strings and hashing patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Apply sliding window to a substring problem; (2) Use a hash map to find pair sums
- Common misconception addressed: Using nested loops where a hash map is O(n)
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Two pointers and sliding window | 168 | 8 |
| M02L02 | Frequency maps and prefix sums | 168 | 8 |

### M03 Trees, graphs and recursion patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Traverse a tree to validate a BST; (2) Enumerate combinations with backtracking
- Common misconception addressed: Forgetting to prune or mark visited nodes
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Tree and graph traversal patterns | 168 | 8 |
| M03L02 | Backtracking templates | 168 | 8 |

### M04 Dynamic programming and greedy patterns (MASTEMY-DESIGN 20%)

- Worked applications: (1) Convert a recursive solution to bottom-up DP; (2) Decide if a greedy choice is safe
- Common misconception addressed: Assuming a problem is greedy without proof
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Recognising DP from problem shape | 168 | 8 |
| M04L02 | Greedy vs DP decision | 168 | 8 |

### M05 Complexity, testing and behavioural basics (MASTEMY-DESIGN 20%)

- Worked applications: (1) Enumerate edge cases for an input; (2) Answer a STAR-format behavioural question
- Common misconception addressed: Claiming an optimal solution without analysing it
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Stating complexity and optimising | 168 | 8 |
| M05L02 | Edge cases, testing and the behavioural round | 168 | 8 |

## Integrative case

Walk through a 45-minute mock interview on a medium-difficulty array problem: clarify requirements, propose and critique a brute-force then optimal approach, code it, state complexity, and test it aloud.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1550-final-protected | 25 | 25 | yes |
| MST-1550-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Interview approach and communication | 5 |
| Arrays, strings and hashing patterns | 5 |
| Trees, graphs and recursion patterns | 5 |
| Dynamic programming and greedy patterns | 5 |
| Complexity, testing and behavioural basics | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1550-Q0001** (single-answer, Select ONE) What should you do first when given an ambiguous interview problem?

- A. Ask clarifying questions to pin down inputs, outputs and constraints **(key)**  
  _Rationale:_ Correct: clarifying prevents solving the wrong problem.
- B. Start coding the first idea immediately  
  _Rationale:_ Coding early risks solving the wrong problem.
- C. State the final complexity  
  _Rationale:_ You cannot state complexity before a plan.
- D. Ask for the answer  
  _Rationale:_ That is not problem solving.

**MST-1550-Q0002** (multiple-answer, Select TWO) Which TWO patterns suit finding a contiguous subarray meeting a condition? (Select TWO.)

- A. Sliding window **(key)**  
  _Rationale:_ Correct: windows handle contiguous ranges efficiently.
- B. Prefix sums **(key)**  
  _Rationale:_ Correct: prefix sums answer range-sum queries in O(1).
- C. Full pairwise nested loops as the intended optimum  
  _Rationale:_ That is the brute force, not the optimal pattern.
- D. Random shuffling  
  _Rationale:_ Randomisation does not apply here.

**MST-1550-Q0003** (single-answer, Select ONE) When is a greedy approach safe to use over DP?

- A. When a greedy-choice property and optimal substructure can be shown **(key)**  
  _Rationale:_ Correct: greedy needs those properties to be provably optimal.
- B. Whenever it runs faster  
  _Rationale:_ Speed does not guarantee correctness.
- C. Only on sorted input  
  _Rationale:_ Sorting may help but is not the deciding factor.
- D. Never; DP is always required  
  _Rationale:_ Greedy is optimal for some problems.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
