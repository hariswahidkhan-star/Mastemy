# Advanced Java: Collections, Generics, Streams, and Concurrency

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0849` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | not applicable (skills course) |
| Evidence | **n/a-no-official-syllabus** |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Completion of an independent Mastemy skills course; does not award any external certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Choose and use the right collection types effectively
2. Write and bound generic types and methods safely
3. Process data with the Streams API and collectors
4. Use functional interfaces and method references idiomatically
5. Build correct concurrent code with executors and synchronisation
6. Diagnose and avoid common concurrency and performance pitfalls

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; hands-on performance, tool operation and code authoring are not assessed in this format.

## Modules

### M01 Collections (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Pick a Map for high-read, low-write lookups; (2) Choose a Set that preserves insertion order
- Common misconception addressed: Using a LinkedList where an ArrayList performs better
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | List, Set and Map choices | 120 | 7 |
| M01L02 | Performance characteristics | 120 | 7 |

### M02 Generics (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Write a generic method with a bounded type; (2) Use ? extends and ? super correctly
- Common misconception addressed: Expecting generics to exist at runtime after erasure
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generic classes and methods | 120 | 7 |
| M02L02 | Bounded types and wildcards | 120 | 7 |

### M03 Streams (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Group orders by customer with a collector; (2) Replace a loop with a map/filter/reduce pipeline
- Common misconception addressed: Reusing a stream after it has been consumed
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Stream pipelines | 120 | 7 |
| M03L02 | Collectors and grouping | 120 | 7 |

### M04 Functional style (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Pass a Comparator as a lambda; (2) Compose predicates with and/or
- Common misconception addressed: Mutating shared state inside a lambda
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Functional interfaces | 120 | 7 |
| M04L02 | Method references and composition | 120 | 7 |

### M05 Concurrency (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Submit tasks to a thread pool and collect results; (2) Protect shared state with a concurrent collection
- Common misconception addressed: Assuming a check-then-act sequence is atomic
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Threads and executors | 120 | 7 |
| M05L02 | Synchronisation and concurrent collections | 120 | 7 |

### M06 Pitfalls and performance (DESIGN ASSUMPTION (equal weight; no official weighting published))

- Worked applications: (1) Fix a visibility bug with volatile or a lock; (2) Remove an unnecessary synchronisation bottleneck
- Common misconception addressed: Calling parallelStream everywhere expecting free speedups
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Data races and deadlocks | 120 | 7 |
| M06L02 | Memory and performance tuning | 120 | 7 |

## Integrative case

Refactor a slow batch processor: pick appropriate collections, express the transformation as a Stream pipeline with collectors, generify the reusable parts, parallelise the independent work safely with an executor, and explain one data race you prevented and how you confirmed thread safety.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0849-final-protected | 40 | 50 | yes |
| MST-0849-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Collections | 7 |
| Generics | 7 |
| Streams | 7 |
| Functional style | 7 |
| Concurrency | 6 |
| Pitfalls and performance | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0849-Q0001** (single-answer, Select ONE) Due to type erasure in Java generics, which statement is true at runtime?

- A. Generic type parameters are not available at runtime **(key)**  
  _Rationale:_ Correct: generics are erased, so List<String> and List<Integer> are the same raw type at runtime.
- B. Each parameterised type creates a distinct runtime class  
  _Rationale:_ Erasure means no distinct runtime classes are generated per type argument.
- C. You can use instanceof List<String> directly  
  _Rationale:_ The parameter is erased, so that check is not allowed.
- D. Primitives can be used directly as type parameters  
  _Rationale:_ Type parameters require reference types, hence boxing.

**MST-0849-Q0002** (single-answer, Select ONE) What happens if you call a terminal operation on a stream that was already consumed?

- A. An IllegalStateException is thrown **(key)**  
  _Rationale:_ Correct: a stream can be operated on only once; reusing it throws IllegalStateException.
- B. It silently reprocesses the elements  
  _Rationale:_ Streams do not auto-reset for reuse.
- C. It returns the previous result from cache  
  _Rationale:_ There is no cached-result reuse for a consumed stream.
- D. It converts the stream into a List  
  _Rationale:_ Reuse does not convert the stream; it fails.

**MST-0849-Q0003** (multiple-answer, Select TWO) Which TWO practices help write correct concurrent Java code? (Select TWO.)

- A. Use concurrent collections for shared mutable state **(key)**  
  _Rationale:_ Correct: concurrent collections handle thread-safe access correctly.
- B. Guard compound check-then-act logic with proper synchronisation **(key)**  
  _Rationale:_ Correct: compound actions are not atomic and need synchronisation.
- C. Assume all field reads are visible across threads without synchronisation  
  _Rationale:_ Without synchronisation/volatile, writes may not be visible to other threads.
- D. Share a non-thread-safe HashMap across threads freely  
  _Rationale:_ A plain HashMap is not thread-safe and can corrupt under concurrent writes.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
