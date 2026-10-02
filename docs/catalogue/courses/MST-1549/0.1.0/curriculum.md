# Competitive Programming

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1549` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-CP-002 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Competitive Programming (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Contest fundamentals
2. Core data structures
3. Sorting and searching
4. Greedy techniques
5. Dynamic programming
6. Graph algorithms
7. Number theory and math
8. Contest strategy

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on competitive-programming problem solving; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Contest fundamentals (MASTEMY-DESIGN 13%)

- Worked applications: (1) Infer an O(n log n) target from n<=2e5; (2) Set up fast input reading
- Common misconception addressed: Ignoring input size when choosing an algorithm
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Reading constraints and I/O | 75 | 5 |
| M01L02 | Estimating complexity from limits | 75 | 5 |

### M02 Core data structures (MASTEMY-DESIGN 13%)

- Worked applications: (1) Answer range-sum queries with a prefix array; (2) Find a subarray with the two-pointer technique
- Common misconception addressed: Recomputing sums inside a loop instead of precomputing
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Arrays, stacks and queues | 75 | 5 |
| M02L02 | Prefix sums and two pointers | 75 | 5 |

### M03 Sorting and searching (MASTEMY-DESIGN 12%)

- Worked applications: (1) Binary-search the minimal feasible capacity; (2) Use sorting to enable a greedy sweep
- Common misconception addressed: Binary searching on a non-monotonic predicate
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Sorting-based techniques | 75 | 5 |
| M03L02 | Binary search and binary search on the answer | 75 | 5 |

### M04 Greedy techniques (MASTEMY-DESIGN 13%)

- Worked applications: (1) Schedule maximum non-overlapping intervals; (2) Prove a greedy choice with an exchange argument
- Common misconception addressed: Assuming a greedy works without justifying optimality
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Exchange arguments | 75 | 5 |
| M04L02 | Interval and scheduling greedets | 75 | 5 |

### M05 Dynamic programming (MASTEMY-DESIGN 12%)

- Worked applications: (1) Solve 0/1 knapsack with a DP table; (2) Compute the longest common subsequence
- Common misconception addressed: Double-counting states from an unclear transition
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | 1D and 2D DP | 75 | 5 |
| M05L02 | Knapsack and DP on subsequences | 75 | 5 |

### M06 Graph algorithms (MASTEMY-DESIGN 13%)

- Worked applications: (1) Find shortest paths with Dijkstra; (2) Detect connected components with union-find
- Common misconception addressed: Using BFS for shortest paths on a weighted graph
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | BFS, DFS and shortest paths | 75 | 5 |
| M06L02 | Union-find and MST | 75 | 5 |

### M07 Number theory and math (MASTEMY-DESIGN 12%)

- Worked applications: (1) Compute n choose k modulo a prime; (2) Precompute primes with a sieve
- Common misconception addressed: Taking a modulo of a negative number without adjusting
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | Modular arithmetic | 75 | 5 |
| M07L02 | Sieve, GCD and combinatorics | 75 | 5 |

### M08 Contest strategy (MASTEMY-DESIGN 12%)

- Worked applications: (1) Order problems by expected difficulty; (2) Stress-test a solution against a brute force
- Common misconception addressed: Spending all time on the hardest problem first
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | Problem triage and testing | 75 | 5 |
| M08L02 | Debugging under time pressure | 75 | 5 |

## Integrative case

Given a timed contest problem with tight constraints, read the limits to infer the required complexity, choose a data structure and algorithm, estimate operations against the time limit, and outline edge cases before coding.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1549-final-protected | 40 | 40 | yes |
| MST-1549-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Contest fundamentals | 5 |
| Core data structures | 5 |
| Sorting and searching | 5 |
| Greedy techniques | 5 |
| Dynamic programming | 5 |
| Graph algorithms | 5 |
| Number theory and math | 5 |
| Contest strategy | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1549-Q0001** (single-answer, Select ONE) If a problem has n up to 2x10^5 with a 1-second limit, which complexity is most appropriate?

- A. O(n log n) **(key)**  
  _Rationale:_ Correct: around 2e5*18 operations fits comfortably in a second.
- B. O(n^2)  
  _Rationale:_ 4e10 operations is far too slow for the limit.
- C. O(2^n)  
  _Rationale:_ Exponential is infeasible for n=2e5.
- D. O(n!)  
  _Rationale:_ Factorial is infeasible beyond tiny n.

**MST-1549-Q0002** (single-answer, Select ONE) Binary search on the answer requires the feasibility predicate to be:

- A. Monotonic, so once it becomes true it stays true **(key)**  
  _Rationale:_ Correct: monotonicity is what lets binary search converge.
- B. Computable only in constant time  
  _Rationale:_ The check can be more expensive; monotonicity is the requirement.
- C. Always false at the midpoint  
  _Rationale:_ That would make the search meaningless.
- D. Independent of the input  
  _Rationale:_ It must depend on the candidate answer.

**MST-1549-Q0003** (multiple-answer, Select ALL that apply) Which statements about 0/1 knapsack dynamic programming are correct? (Select TWO)

- A. A 1D rolling array can replace the 2D table if the capacity loop runs in reverse **(key)**  
  _Rationale:_ Correct: reverse iteration prevents reusing an item more than once.
- B. Its time complexity is pseudo-polynomial, O(n*W) **(key)**  
  _Rationale:_ Correct: it depends on the numeric capacity W, not just n.
- C. It always runs in O(n log n)  
  _Rationale:_ False; it is O(n*W).
- D. Greedy by value/weight always gives the optimal 0/1 solution  
  _Rationale:_ False; that only works for the fractional knapsack.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
