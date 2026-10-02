# Java JVM Performance and Memory Diagnostics

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0850` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Java JVM Performance and Memory Diagnostics (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain the JVM memory model and garbage-collection eligibility
2. Compare garbage collectors and read GC logs
3. Profile applications and diagnose memory leaks
4. Apply a measurement-first tuning and diagnosis workflow

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 JVM memory model (MASTEMY-DESIGN 25%)

- Worked applications: (1) Diagram where objects, locals and class metadata live; (2) Identify what makes an object eligible for GC
- Common misconception addressed: Thinking that setting one reference to null always frees memory immediately
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Heap, stack, metaspace and the object lifecycle | 120 | 7 |
| M01L02 | References and garbage-collection basics | 120 | 7 |

### M02 Garbage collectors (MASTEMY-DESIGN 25%)

- Worked applications: (1) Interpret a GC log for pause times; (2) Choose a collector for a low-pause service
- Common misconception addressed: Assuming a bigger heap always reduces pauses
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Generational GC and collector choices (G1, ZGC) | 120 | 7 |
| M02L02 | Reading GC logs and pause behaviour | 120 | 7 |

### M03 Profiling and leaks (MASTEMY-DESIGN 25%)

- Worked applications: (1) Find a leak suspect in a heap dump; (2) Profile an allocation hot path
- Common misconception addressed: Confusing high memory use with a memory leak
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Heap dumps and analysis with MAT | 120 | 7 |
| M03L02 | CPU and allocation profiling with JFR and async-profiler | 120 | 7 |

### M04 Tuning and diagnosis workflow (MASTEMY-DESIGN 25%)

- Worked applications: (1) Set heap and GC flags for a given SLA; (2) Write a step-by-step triage runbook for an OutOfMemoryError
- Common misconception addressed: Tuning flags before measuring the actual bottleneck
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | JVM flags and heap sizing | 120 | 7 |
| M04L02 | A repeatable performance-diagnosis method | 120 | 7 |

## Integrative case

A Java service shows rising memory and long pauses under load: read its GC logs to characterise the problem, take and analyse a heap dump to find a leak suspect, choose and configure an appropriate collector and heap size, and document a triage runbook.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0850-final-protected | 40 | 50 | yes |
| MST-0850-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| JVM memory model | 10 |
| Garbage collectors | 10 |
| Profiling and leaks | 10 |
| Tuning and diagnosis workflow | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0850-Q0001** (single-answer, Select ONE) An object becomes eligible for garbage collection when...

- A. it is no longer reachable from any GC root **(key)**  
  _Rationale:_ Correct: reachability from GC roots determines eligibility.
- B. its reference is set to null in one place while others remain  
  _Rationale:_ Other live references keep it reachable.
- C. the heap becomes full  
  _Rationale:_ A full heap triggers collection but does not define eligibility.
- D. a finalize() method is declared  
  _Rationale:_ Declaring finalize() does not make an object collectable.

**MST-0850-Q0002** (multiple-answer, Select TWO) Which TWO tools help diagnose JVM memory problems? (Select TWO.)

- A. A heap-dump analyser such as Eclipse MAT **(key)**  
  _Rationale:_ Correct: MAT inspects heap dumps for leak suspects.
- B. Java Flight Recorder (JFR) **(key)**  
  _Rationale:_ Correct: JFR records allocation and GC events for analysis.
- C. A CSS minifier  
  _Rationale:_ A CSS minifier is a front-end build tool, unrelated to the JVM.
- D. A DNS resolver  
  _Rationale:_ DNS resolution is unrelated to JVM memory.

**MST-0850-Q0003** (single-answer, Select ONE) Does high steady memory usage alone indicate a memory leak?

- A. No; a leak is continuously growing, unreclaimable memory **(key)**  
  _Rationale:_ Correct: a leak keeps growing and cannot be reclaimed.
- B. Yes, always  
  _Rationale:_ Steady high usage can be normal working set.
- C. Only when using ZGC  
  _Rationale:_ The collector does not change this definition.
- D. Only on 32-bit JVMs  
  _Rationale:_ Leak definition is independent of word size.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
