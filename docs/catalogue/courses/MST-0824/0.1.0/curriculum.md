# C# Memory, Performance, and Diagnostics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0824` v0.1.0 | Batch 3 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | vendor-platform-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Provider facts checked on Microsoft Learn 2026-10-02 (Garbage collection and performance in .NET and memory management in ASP.NET Core: generations, the Large Object Heap, allocation patterns, and diagnosing memory issues). Other lessons are Mastemy design; re-check provider docs for the product versions chosen at production. |
| Evidence | **vendor-docs-partial** - sources: SRC-MS-DOTNET-DIAG (https://learn.microsoft.com/dotnet/standard/garbage-collection/performance; https://learn.microsoft.com/aspnet/core/performance/memory; accessed 2026-10-02) |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — C# Memory, Performance, and Diagnostics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the .NET memory model and garbage collection generations
2. Identify costly allocation patterns including the Large Object Heap
3. Reduce allocations with Span, pooling and value types
4. Diagnose memory and performance issues with .NET tools
5. Manage resource lifetime with IDisposable and client reuse

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Memory model and the GC (MASTEMY-DESIGN 20%)

- Worked applications: (1) Explain which objects land on the heap vs the stack; (2) Describe when a Gen 0 collection is triggered
- Common misconception addressed: Believing managed code never leaks memory
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Stack, heap and the managed heap | 120 | 7 |
| M01L02 | Generations and how GC reclaims memory | 120 | 7 |

### M02 Allocations and the LOH (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify an allocation hot path in a request handler; (2) Explain why large temporary objects cause expensive Gen 2 collections
- Common misconception addressed: Calling GC.Collect in production to fix a perceived leak
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Allocation cost and short-lived objects | 120 | 7 |
| M02L02 | The Large Object Heap and Gen 2 cost | 120 | 7 |

### M03 Reducing allocations (MASTEMY-DESIGN 20%)

- Worked applications: (1) Rewrite a string-concatenation hot path to reduce garbage; (2) Use pooling to reuse a buffer instead of reallocating
- Common misconception addressed: Assuming micro-optimisations help before measuring
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Span, pooling and reuse | 120 | 7 |
| M03L02 | Value types and avoiding boxing | 120 | 7 |

### M04 Diagnosing issues (MASTEMY-DESIGN 20%)

- Worked applications: (1) Capture a memory trace while reproducing high usage; (2) Use a heap dump to find what is retaining objects
- Common misconception addressed: Reading the Task Manager working set as managed-heap usage
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Counters, dumps and dotnet-trace/dotnet-counters | 120 | 7 |
| M04L02 | Reading a heap for leaks and retention | 120 | 7 |

### M05 Resource lifetime (MASTEMY-DESIGN 20%)

- Worked applications: (1) Dispose an IDisposable correctly with using; (2) Reuse an HttpClient instead of creating one per call
- Common misconception addressed: Disposing HttpClient on every request and exhausting sockets
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | IDisposable, using and finalizers | 120 | 7 |
| M05L02 | HttpClient and connection reuse | 120 | 7 |

## Integrative case

Investigate a .NET service with rising memory and latency: measure allocations, identify a large-object hot path driving Gen 2 collections, reduce garbage with pooling, confirm the fix with a trace, and correct an HttpClient-per-request pattern that is leaking sockets.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0824-final-protected | 40 | 50 | yes |
| MST-0824-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Memory model and the GC | 8 |
| Allocations and the LOH | 8 |
| Reducing allocations | 8 |
| Diagnosing issues | 8 |
| Resource lifetime | 8 |

Minimum reviewed item bank: 430 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0824-Q0001** (single-answer, Select ONE) Why are frequent large temporary objects (over the LOH threshold) a performance concern?

- A. They land on the Large Object Heap and trigger expensive Gen 2 collections **(key)**  
  _Rationale:_ Correct: large objects go to the LOH and cause costly Gen 2 work.
- B. They are stored on the stack and overflow it  
  _Rationale:_ Large objects are heap-allocated, not stack-allocated.
- C. They are never collected at all  
  _Rationale:_ They are collected, but in expensive Gen 2 collections.
- D. They disable the garbage collector  
  _Rationale:_ They do not disable the GC.

**MST-0824-Q0002** (multiple-answer, Select TWO) Which TWO are correct about resource lifetime in .NET? (Select TWO.)

- A. HttpClient should be reused rather than created and disposed per call **(key)**  
  _Rationale:_ Correct: creating an HttpClient per call can exhaust sockets.
- B. Objects implementing IDisposable should be disposed, e.g. with using **(key)**  
  _Rationale:_ Correct: disposing releases unmanaged or scarce resources promptly.
- C. GC.Collect should be called on every request  
  _Rationale:_ Forcing collections in production hurts performance.
- D. Finalizers are the preferred way to release resources deterministically  
  _Rationale:_ Dispose is deterministic; finalizers are not.

**MST-0824-Q0003** (single-answer, Select ONE) Task Manager shows a high working set for a .NET process. What does that tell you about the managed heap?

- A. Not much directly; working set is not the same as managed-heap usage **(key)**  
  _Rationale:_ Correct: working set includes more than the managed heap, so measure the heap specifically.
- B. The managed heap is exactly that size  
  _Rationale:_ Working set is not a direct measure of the managed heap.
- C. There is definitely a managed memory leak  
  _Rationale:_ High working set alone does not prove a managed leak.
- D. The GC has stopped running  
  _Rationale:_ A high working set does not mean the GC stopped.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
