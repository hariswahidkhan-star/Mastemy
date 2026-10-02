# Data Structures and Algorithms: Complete Foundations

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0937` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| External exam | none (Mastemy skills course) |
| Syllabus basis | **MASTEMY-DESIGN** - Mastemy-designed curriculum; no official syllabus |
| Evidence | **n/a-no-official-syllabus** - no external issuer to verify against |
| Planned time | T = 2400 min; instruction I = 1920 min (80%); assessment A = 480 min (20%) |
| Assessment split | lesson checks 120 / module checks 168 / cumulative 192 min |
| Certificate | Mastemy Certificate of Completion — Data Structures and Algorithms: Complete Foundations (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Select the appropriate linear or hierarchical data structure for a given access pattern
2. Analyse the time and space complexity of operations on common structures
3. Apply hashing, searching and sorting algorithms correctly to practical problems
4. Implement and reason about tree and graph traversals

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every course outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Hands-on operation, the quality of tools and live outputs, and professional judgement are taught by video demonstration and model-answer analysis; the certificate assessment uses single-answer MCQ and multiple-answer selection only and never requires uploads, recorded work, submitted code or peer review.

## Modules

### M01 Linear structures and their operations (25%, MASTEMY-DESIGN)

- Worked applications: (1) Choose between an array and a linked list for five access patterns and justify each; (2) Implement a bounded queue with a ring buffer and reason about its wrap-around
- Common misconception addressed: Believing linked-list indexing is as fast as array indexing
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Arrays, dynamic arrays and amortised cost | 120 | 6 |
| M01L02 | Linked lists: singly, doubly and circular | 120 | 6 |
| M01L03 | Stacks and queues | 120 | 6 |
| M01L04 | Deques and ring buffers | 120 | 6 |

### M02 Trees and hierarchical structures (25%, MASTEMY-DESIGN)

- Worked applications: (1) Trace in-order, pre-order and post-order traversal on a worked tree; (2) Decide when a heap beats a sorted array for a top-k problem
- Common misconception addressed: Assuming a binary search tree is always balanced and therefore always O(log n)
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Binary trees and traversals | 120 | 6 |
| M02L02 | Binary search trees and balancing | 120 | 6 |
| M02L03 | Heaps and priority queues | 120 | 6 |
| M02L04 | Tries and prefix structures | 120 | 6 |

### M03 Hashing and associative structures (25%, MASTEMY-DESIGN)

- Worked applications: (1) Diagnose why a hash table degraded to O(n) and propose a fix; (2) Pick a collision strategy for a cache with high delete churn
- Common misconception addressed: Treating hash-table lookups as always O(1) regardless of load factor and hash quality
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Hash functions and distribution | 120 | 6 |
| M03L02 | Collision resolution: chaining and open addressing | 120 | 6 |
| M03L03 | Load factor and resizing | 120 | 6 |
| M03L04 | Sets, maps and multimaps | 120 | 6 |

### M04 Core algorithms over structures (25%, MASTEMY-DESIGN)

- Worked applications: (1) Select a sort for nearly-sorted, bounded-range and memory-constrained inputs; (2) Convert a recursive traversal to an explicit-stack iterative version
- Common misconception addressed: Believing a lower Big-O always runs faster on small or real-world inputs
- Module check: 42 items / 42 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Searching: linear, binary and bounds | 120 | 6 |
| M04L02 | Sorting: comparison and non-comparison | 120 | 6 |
| M04L03 | Graph representations and traversal | 120 | 6 |
| M04L04 | Recursion and iterative conversion | 120 | 6 |

## Integrative case

A team ships a feature whose request latency spikes under load. Using the structures in this course, model the data, pick the right containers and search/sort strategy, and defend the memory-versus-time tradeoffs to reviewers.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - skills course with no external exam; length derives from the assessment time budget.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0937-final-protected | 144 | 144 | yes |
| MST-0937-final-alternate | 144 | 144 | no (optional retake) |

| Domain | Items per form |
|---|---|
| Linear structures and their operations | 36 |
| Trees and hierarchical structures | 36 |
| Hashing and associative structures | 36 |
| Core algorithms over structures | 36 |

Minimum reviewed item bank: 816 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0937-Q0001** (single-answer, Select ONE) A program appends to a collection millions of times and only ever reads from the end. Which structure gives the best amortised performance with the least memory overhead?

- A. A dynamic array (amortised O(1) append) **(key)**  
  _Rationale:_ Correct: a dynamic array gives amortised O(1) append and has no per-element pointer overhead.
- B. A doubly linked list  
  _Rationale:_ A doubly linked list appends in O(1) but carries two pointers per node, wasting memory for this pattern.
- C. A balanced binary search tree  
  _Rationale:_ A BST adds O(log n) per insert and ordering you do not need here.
- D. A hash set  
  _Rationale:_ A hash set does not preserve insertion order and adds hashing overhead for no benefit.

**MST-0937-Q0002** (single-answer, Select ONE) A hash table with chaining is showing lookups far slower than O(1). Which single cause most directly explains this?

- A. A high load factor with a poor hash spreading keys into few buckets **(key)**  
  _Rationale:_ Correct: a high load factor plus poor distribution lengthens chains, pushing lookups toward O(n).
- B. The table stores strings instead of integers  
  _Rationale:_ Key type alone does not break O(1) if the hash distributes well.
- C. The table was created with a capacity hint  
  _Rationale:_ A capacity hint reduces resizes and generally helps, not hurts.
- D. Open addressing is being used  
  _Rationale:_ The scenario states chaining, not open addressing.

**MST-0937-Q0003** (multiple-answer, Select TWO) Which TWO statements about binary search are correct? (Select TWO)

- A. It requires the input to be sorted on the search key **(key)**  
  _Rationale:_ Correct: binary search relies on ordering to discard half the range each step.
- B. It runs in O(log n) comparisons on a sorted array **(key)**  
  _Rationale:_ Correct: each step halves the search range, giving logarithmic comparisons.
- C. It works in O(log n) on an unsorted array  
  _Rationale:_ Without ordering the halving assumption fails; you would need a linear scan.
- D. It needs a hash function  
  _Rationale:_ Binary search uses comparisons and ordering, not hashing.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
