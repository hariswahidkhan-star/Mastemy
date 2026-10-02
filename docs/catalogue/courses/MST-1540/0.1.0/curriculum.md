# Algorithms

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1540` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

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

1. Analyse time and space complexity using Big-O reasoning
2. Select and apply core data structures to problems
3. Apply sorting and searching algorithms appropriately
4. Design solutions with recursion, divide-and-conquer and greedy strategies
5. Model and solve problems with graphs and dynamic programming
6. Reason about algorithm trade-offs and correctness

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Complexity and analysis (MASTEMY-DESIGN 20%)

- Worked applications: (1) Derive the Big-O of a nested loop; (2) Compare two implementations by growth rate
- Common misconception addressed: Confusing worst-case notation with actual running time
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Big-O, Big-Theta and Big-Omega | 168 | 8 |
| M01L02 | Amortised and average-case analysis | 168 | 8 |

### M02 Core data structures (MASTEMY-DESIGN 20%)

- Worked applications: (1) Pick a structure for a lookup-heavy workload; (2) Implement a min-heap push/pop
- Common misconception addressed: Assuming hash-table operations are always O(1)
- Module check: 30 items / 30 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Arrays, lists, stacks and queues | 168 | 8 |
| M02L02 | Hash tables, heaps and trees | 168 | 8 |

### M03 Sorting and searching (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose a sort for nearly-sorted data; (2) Apply binary search to a rotated array
- Common misconception addressed: Using binary search on unsorted input
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Comparison sorts and their bounds | 168 | 8 |
| M03L02 | Binary search and search strategies | 168 | 8 |

### M04 Recursion and design strategies (MASTEMY-DESIGN 20%)

- Worked applications: (1) Solve a recurrence with the master theorem; (2) Build a greedy interval-scheduling solution
- Common misconception addressed: Assuming greedy always yields the optimum
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Divide-and-conquer and recurrences | 168 | 8 |
| M04L02 | Greedy algorithms and when they fail | 168 | 8 |

### M05 Graphs and dynamic programming (MASTEMY-DESIGN 20%)

- Worked applications: (1) Run BFS/DFS on a dependency graph; (2) Define a DP table for a knapsack-style problem
- Common misconception addressed: Recomputing overlapping subproblems instead of memoising
- Module check: 29 items / 29 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Graph traversal and shortest paths | 168 | 8 |
| M05L02 | Dynamic programming formulation | 168 | 8 |

## Integrative case

Given a product requirement to rank and deduplicate a large activity feed under a latency budget, choose data structures, justify the complexity, and defend the algorithmic trade-offs against two alternative designs.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1540-final-protected | 25 | 25 | yes |
| MST-1540-final-alternate | 25 | 25 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Complexity and analysis | 5 |
| Core data structures | 5 |
| Sorting and searching | 5 |
| Recursion and design strategies | 5 |
| Graphs and dynamic programming | 5 |

Minimum reviewed item bank: 504 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1540-Q0001** (single-answer, Select ONE) What does O(n log n) describe for a comparison sort?

- A. A lower bound no comparison sort can beat in the worst case **(key)**  
  _Rationale:_ Correct: comparison sorts cannot do better than n log n in the worst case.
- B. The exact number of comparisons for every input  
  _Rationale:_ Big-O is an asymptotic bound, not an exact count.
- C. Memory used by the sort  
  _Rationale:_ It describes time growth, not space.
- D. That the sort is always faster than O(n^2) for all inputs  
  _Rationale:_ For small or special inputs an O(n^2) sort can be faster.

**MST-1540-Q0002** (multiple-answer, Select TWO) Which TWO statements about hash tables are accurate? (Select TWO.)

- A. Average lookup is O(1) with a good hash and load factor **(key)**  
  _Rationale:_ Correct: amortised O(1) under good conditions.
- B. Worst-case lookup can degrade to O(n) with many collisions **(key)**  
  _Rationale:_ Correct: pathological collisions linearise the bucket.
- C. They keep keys in sorted order  
  _Rationale:_ Hash tables do not maintain sorted order.
- D. They guarantee O(1) in every case  
  _Rationale:_ No such guarantee; collisions break it.

**MST-1540-Q0003** (single-answer, Select ONE) Why memoise in a dynamic-programming solution?

- A. To avoid recomputing overlapping subproblems **(key)**  
  _Rationale:_ Correct: memoisation caches subproblem results.
- B. To change the problem's optimal answer  
  _Rationale:_ It does not change the answer, only the work done.
- C. To reduce the number of distinct subproblems  
  _Rationale:_ The set of subproblems is unchanged.
- D. To make the recursion infinite  
  _Rationale:_ Memoisation helps terminate repeated work.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
