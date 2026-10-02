# Advanced Java

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1524` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | (none) |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Advanced Java (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Generics and type bounds
2. Collections and the Streams API
3. Concurrency and the java.util.concurrent toolkit
4. Functional Java: lambdas and method references
5. JVM memory, garbage collection and performance
6. Modern Java language features and modules

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production ability in the tool or language; skills are taught through instructor-built projects and walkthroughs.

## Modules

### M01 Generics and type bounds (MASTEMY-DESIGN 16%)

- Worked applications: (1) Write a generic container with a bounded type parameter; (2) Use ? extends and ? super correctly in a method signature
- Common misconception addressed: Believing generics exist at runtime rather than being erased
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Generic classes, methods and type inference | 120 | 6 |
| M01L02 | Bounded types and wildcards | 120 | 6 |

### M02 Collections and the Streams API (MASTEMY-DESIGN 17%)

- Worked applications: (1) Group objects with Collectors.groupingBy; (2) Pick HashMap vs TreeMap for a lookup requirement
- Common misconception addressed: Treating a Stream as reusable after a terminal operation
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | List, Set, Map and choosing the right implementation | 120 | 6 |
| M02L02 | Stream pipelines, collectors and reductions | 120 | 6 |

### M03 Concurrency and the java.util.concurrent toolkit (MASTEMY-DESIGN 16%)

- Worked applications: (1) Submit tasks to an ExecutorService and collect results; (2) Replace synchronized with a ConcurrentHashMap
- Common misconception addressed: Assuming volatile provides atomicity for compound actions
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Threads, the memory model and happens-before | 120 | 6 |
| M03L02 | Executors, futures and concurrent collections | 120 | 6 |

### M04 Functional Java: lambdas and method references (MASTEMY-DESIGN 16%)

- Worked applications: (1) Replace an anonymous class with a lambda; (2) Chain Optional.map and orElseGet
- Common misconception addressed: Using Optional as a field or method parameter
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Functional interfaces and lambda expressions | 120 | 6 |
| M04L02 | Method references, Optional and composition | 120 | 6 |

### M05 JVM memory, garbage collection and performance (MASTEMY-DESIGN 17%)

- Worked applications: (1) Interpret a heap profile to find a retained set; (2) Choose a GC appropriate to a latency goal
- Common misconception addressed: Thinking calling System.gc() guarantees collection
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Heap, stack and object lifecycle | 120 | 6 |
| M05L02 | Garbage collectors and reading GC behaviour | 120 | 6 |

### M06 Modern Java language features and modules (MASTEMY-DESIGN 18%)

- Worked applications: (1) Model immutable data with a record; (2) Declare a module-info with required and exported packages
- Common misconception addressed: Expecting records to allow mutable fields
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Records, sealed types and pattern matching | 120 | 6 |
| M06L02 | The module system and encapsulation | 120 | 6 |

## Integrative case

Refactor a legacy order-processing service: replace boilerplate value classes with records and sealed types, rewrite report code as Stream pipelines, parallelise independent calls with an ExecutorService, and justify a garbage-collector choice against a stated latency target.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1524-final-protected | 45 | 45 | yes |
| MST-1524-final-alternate | 45 | 45 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Generics and type bounds | 8 |
| Collections and the Streams API | 8 |
| Concurrency and the java.util.concurrent toolkit | 8 |
| Functional Java: lambdas and method references | 7 |
| JVM memory, garbage collection and performance | 7 |
| Modern Java language features and modules | 7 |

Minimum reviewed item bank: 486 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1524-Q0001** (single-answer, Select ONE) Why can a Java generic type parameter not be used with `instanceof List<String>` at runtime?

- A. Generic type information is erased by the compiler, so the runtime has no String parameter to check **(key)**  
  _Rationale:_ Correct: type erasure removes the parameter, leaving only the raw type at runtime.
- B. Generics are only allowed on interfaces  
  _Rationale:_ Generics apply to classes and methods too; this is unrelated.
- C. instanceof is not a valid Java operator  
  _Rationale:_ instanceof is valid; the issue is erasure of the type argument.
- D. List does not implement Collection  
  _Rationale:_ List does extend Collection; this is irrelevant to the question.

**MST-1524-Q0002** (multiple-answer, Select ALL that apply) Which statements about the Java Streams API are correct? (Select TWO)

- A. A stream can be consumed by only one terminal operation **(key)**  
  _Rationale:_ Correct: a stream is single-use; reusing it after a terminal op throws IllegalStateException.
- B. Intermediate operations such as map are lazy until a terminal operation runs **(key)**  
  _Rationale:_ Correct: intermediate ops build a pipeline that executes only when a terminal op is applied.
- C. Streams always mutate the source collection in place  
  _Rationale:_ Streams do not mutate the source; they produce new results.
- D. forEach guarantees encounter order on a parallel stream  
  _Rationale:_ Use forEachOrdered for order; forEach does not guarantee it in parallel.

**MST-1524-Q0003** (single-answer, Select ONE) What is the recommended use of java.util.Optional?

- A. As a return type to signal a possibly-absent result **(key)**  
  _Rationale:_ Correct: Optional is designed for return values that may be empty.
- B. As a field type to save memory  
  _Rationale:_ Optional is not intended for fields and adds overhead.
- C. As a method parameter to make arguments optional  
  _Rationale:_ Using Optional parameters is discouraged; overloads are preferred.
- D. As a replacement for all null checks everywhere  
  _Rationale:_ Optional targets return values, not a blanket null replacement.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
