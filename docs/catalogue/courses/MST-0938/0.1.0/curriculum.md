# Algorithm Design, Complexity, and Optimization

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0938` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Algorithm Design, Complexity, and Optimization (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Analyse algorithmic time and space complexity using asymptotic notation
2. Select an appropriate design technique (divide-and-conquer, greedy, dynamic programming) for a problem
3. Reason about graph and optimisation algorithms and their limits
4. Apply profiling and tradeoff analysis to optimise real code responsibly

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Complexity analysis foundations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Derive the Big-O of three nested-loop fragments; (2) Solve a divide-and-conquer recurrence with the Master Theorem
- Common misconception addressed: Treating Big-O as an exact runtime rather than an asymptotic upper bound
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Big-O, Big-Theta and Big-Omega | 120 | 6 |
| M01L02 | Best, average and worst case | 120 | 6 |
| M01L03 | Amortised and space complexity | 120 | 6 |
| M01L04 | Reading recurrences and the Master Theorem | 120 | 6 |

### M02 Core design techniques (25%, MASTEMY-DESIGN)

- Worked applications: (1) Identify whether a problem has optimal substructure and overlapping subproblems; (2) Prove a greedy choice is safe with an exchange argument
- Common misconception addressed: Assuming a greedy approach is correct without proving the greedy-choice property
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Divide and conquer | 120 | 6 |
| M02L02 | Greedy algorithms and exchange arguments | 120 | 6 |
| M02L03 | Dynamic programming | 120 | 6 |
| M02L04 | Backtracking and pruning | 120 | 6 |

### M03 Graph and optimisation algorithms (25%, MASTEMY-DESIGN)

- Worked applications: (1) Choose BFS versus Dijkstra for weighted and unweighted graphs; (2) Recognise when a problem is NP-hard and switch to an approximation
- Common misconception addressed: Trying to find an exact polynomial solution to an NP-hard problem
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Shortest paths: BFS, Dijkstra | 120 | 6 |
| M03L02 | Minimum spanning trees | 120 | 6 |
| M03L03 | Network flow basics | 120 | 6 |
| M03L04 | Intractability and NP-hardness awareness | 120 | 6 |

### M04 Practical optimisation and tradeoffs (25%, MASTEMY-DESIGN)

- Worked applications: (1) Use a profile to find the real bottleneck before changing code; (2) Trade memory for speed with a memoisation table and bound its size
- Common misconception addressed: Optimising code that is not on the critical path (premature optimisation)
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Profiling before optimising | 120 | 6 |
| M04L02 | Time-space tradeoffs and memoisation | 120 | 6 |
| M04L03 | Cache-aware and locality effects | 120 | 6 |
| M04L04 | Choosing the right algorithm for real data | 120 | 6 |

## Integrative case

A reporting job that ran in minutes now takes hours as data grew. Profile it, identify the dominant term, redesign the hot algorithm, and justify the complexity improvement and any memory cost to stakeholders.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0938-final-protected | 144 | 144 | yes |
| MST-0938-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Complexity analysis foundations | 36 |
| Core design techniques | 36 |
| Graph and optimisation algorithms | 36 |
| Practical optimisation and tradeoffs | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0938-Q0001** (single-answer, Select ONE) An algorithm runs in T(n) = 2T(n/2) + O(n). What is its asymptotic time complexity?

- A. O(n log n) **(key)**  
  _Rationale:_ Correct: by the Master Theorem this balanced split with linear combine gives O(n log n).
- B. O(n)  
  _Rationale:_ O(n) ignores the log n factor from the recursive halving levels.
- C. O(n^2)  
  _Rationale:_ O(n^2) would arise from a linear number of linear-work levels, not a halving recurrence.
- D. O(log n)  
  _Rationale:_ O(log n) omits the linear work done at each level.

**MST-0938-Q0002** (single-answer, Select ONE) A problem must find the shortest path in an unweighted graph. Which algorithm is the most appropriate and efficient choice?

- A. Breadth-first search **(key)**  
  _Rationale:_ Correct: BFS finds shortest paths by edge count in unweighted graphs in O(V+E).
- B. Dijkstra's algorithm with a priority queue  
  _Rationale:_ Dijkstra works but adds priority-queue overhead that is unnecessary when all edges have equal weight.
- C. Depth-first search  
  _Rationale:_ DFS does not guarantee the shortest path by edge count.
- D. Bellman-Ford  
  _Rationale:_ Bellman-Ford handles negative weights and is slower; it is overkill for an unweighted graph.

**MST-0938-Q0003** (multiple-answer, Select TWO) Which TWO conditions indicate a problem is a good candidate for dynamic programming? (Select TWO)

- A. It has optimal substructure **(key)**  
  _Rationale:_ Correct: an optimal solution is built from optimal solutions to subproblems.
- B. It has overlapping subproblems **(key)**  
  _Rationale:_ Correct: the same subproblems recur, so caching their results avoids repeated work.
- C. Each subproblem is solved exactly once with no reuse  
  _Rationale:_ No reuse means memoisation gives no benefit; plain divide-and-conquer fits better.
- D. The problem is proven NP-hard  
  _Rationale:_ NP-hardness does not by itself imply a polynomial DP exists.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
