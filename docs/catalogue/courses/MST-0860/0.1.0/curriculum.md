# Kotlin for JVM Backend Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0860` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Kotlin for JVM Backend Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use Kotlin's null-safe, expressive language features
2. Combine OO and functional styles idiomatically
3. Write asynchronous backend code with coroutines
4. Build and test JVM backend services in Kotlin

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Kotlin language essentials (MASTEMY-DESIGN 25%)

- Worked applications: (1) Refactor nullable Java calls with safe-call and Elvis operators; (2) Add an extension function to a third-party type
- Common misconception addressed: Treating a platform type from Java as guaranteed non-null
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Null safety, val/var and type inference | 120 | 7 |
| M01L02 | Functions, lambdas and extension functions | 120 | 7 |

### M02 Object-oriented and functional Kotlin (MASTEMY-DESIGN 25%)

- Worked applications: (1) Model a result type with a sealed class and when; (2) Replace a builder with a data class and copy
- Common misconception addressed: Expecting a data class to deep-copy nested mutable fields
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Classes, data classes and sealed hierarchies | 120 | 7 |
| M02L02 | Higher-order functions and immutability | 120 | 7 |

### M03 Coroutines and asynchronous backend code (MASTEMY-DESIGN 25%)

- Worked applications: (1) Convert a blocking call into a suspend function; (2) Stream results with a cold Flow and handle cancellation
- Common misconception addressed: Believing launching a coroutine automatically moves work off the current thread
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Suspend functions, scopes and structured concurrency | 120 | 7 |
| M03L02 | Dispatchers, flows and cancellation | 120 | 7 |

### M04 Backend services with Kotlin on the JVM (MASTEMY-DESIGN 25%)

- Worked applications: (1) Expose a Spring controller returning a data-class DTO; (2) Write a coroutine-aware test for a service
- Common misconception addressed: Assuming Kotlin null safety protects values deserialized from JSON at runtime
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Interop with Java frameworks (Spring) | 120 | 7 |
| M04L02 | Testing, DTOs and serialization | 120 | 7 |

## Integrative case

Build a Kotlin REST service on Spring Boot: model the domain with data and sealed classes, expose suspend-based endpoints backed by coroutines and Flow, interoperate with a Java client library, and test cancellation and null-at-the-boundary handling.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0860-final-protected | 40 | 48 | yes |
| MST-0860-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Kotlin language essentials | 10 |
| Object-oriented and functional Kotlin | 10 |
| Coroutines and asynchronous backend code | 10 |
| Backend services with Kotlin on the JVM | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0860-Q0001** (single-answer, Select ONE) A Kotlin function calls a Java method returning String with no nullability annotation. What is the type of the result in Kotlin?

- A. A platform type, which Kotlin does not null-check at compile time **(key)**  
  _Rationale:_ Correct: platform types defer the null decision to the developer; a null can slip through.
- B. A guaranteed non-null String  
  _Rationale:_ Kotlin cannot guarantee non-null for an unannotated Java return.
- C. A compile error until you annotate the Java method  
  _Rationale:_ Kotlin compiles; it treats it as a platform type.
- D. Always String?  
  _Rationale:_ It is a platform type, not forced to the nullable form.

**MST-0860-Q0002** (multiple-answer, Select TWO) Which TWO statements about Kotlin structured concurrency are correct? (Select TWO.)

- A. Cancelling a parent scope cancels its child coroutines **(key)**  
  _Rationale:_ Correct: structured concurrency propagates cancellation down the scope.
- B. A suspend function suspends without blocking the underlying thread **(key)**  
  _Rationale:_ Correct: suspension frees the thread to do other work.
- C. launch returns the coroutine's result value directly  
  _Rationale:_ launch returns a Job; async returns a Deferred that holds the result.
- D. Coroutines always run on a new OS thread each  
  _Rationale:_ Many coroutines are multiplexed onto a small dispatcher thread pool.

**MST-0860-Q0003** (single-answer, Select ONE) A data class User(val name: String, val roles: MutableList<String>) is copied with copy(). What is true of the copy's roles list?

- A. It references the same mutable list as the original **(key)**  
  _Rationale:_ Correct: copy() is shallow; the MutableList reference is shared.
- B. It is a deep, independent copy of the list  
  _Rationale:_ copy() does not deep-copy nested mutable fields.
- C. It is null because copy() drops collections  
  _Rationale:_ copy() preserves all properties, including the list.
- D. It becomes immutable automatically  
  _Rationale:_ The field type is still MutableList; copy() does not change types.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
