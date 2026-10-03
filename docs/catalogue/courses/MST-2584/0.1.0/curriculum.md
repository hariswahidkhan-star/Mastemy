# Ruby Programming: Advanced

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-2584` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | No issuer syllabus. Outcomes are Mastemy internal IDs derived from the course blueprint; compiler, runtime, standard-library and tooling versions to be pinned at production. |
| Evidence | **n/a-no-official-syllabus** - sources:  |
| Legacy IDs | none |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Ruby Programming: Advanced (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Write advanced metaprogramming with modules, hooks and refinements
2. Build internal DSLs with instance_eval and method_missing carefully
3. Reason about the Ruby object model, singleton classes and method lookup
4. Use concurrency with threads, fibers and the GVL implications
5. Apply patterns for performance, memoisation and lazy evaluation
6. Test with RSpec including doubles and shared examples

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Object model (20% (design weight), design weight)

- Worked applications: (1) Inspect ancestors to predict lookup; (2) Add a singleton method to one object
- Common misconception addressed: Confusing include with extend placement
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Singleton classes and self | 64 | 4 |
| M01L02 | Method lookup and ancestors | 64 | 4 |
| M01L03 | prepend, include and extend | 64 | 4 |

### M02 Metaprogramming (20% (design weight), design weight)

- Worked applications: (1) Generate methods from a schema; (2) Use a refinement instead of a monkey patch
- Common misconception addressed: Monkey-patching core classes globally
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | define_method and send | 64 | 4 |
| M02L02 | Hooks: included, inherited | 64 | 4 |
| M02L03 | Refinements for scoped patches | 64 | 4 |

### M03 Internal DSLs (20% (design weight), design weight)

- Worked applications: (1) Build a configuration DSL; (2) Capture a block into a builder
- Common misconception addressed: Making a DSL so magic it is unreadable
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | instance_eval and instance_exec | 64 | 4 |
| M03L02 | Builder-style DSLs | 64 | 4 |
| M03L03 | Readable DSL design | 64 | 4 |

### M04 Concurrency (20% (design weight), design weight)

- Worked applications: (1) Parallelise IO-bound work with threads; (2) Drive a generator with a Fiber
- Common misconception addressed: Expecting threads to speed up CPU-bound Ruby under the GVL
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Threads and the GVL | 64 | 4 |
| M04L02 | Fibers and cooperative scheduling | 64 | 4 |
| M04L03 | Mutexes and thread safety | 64 | 4 |

### M05 Performance and testing (20% (design weight), design weight)

- Worked applications: (1) Memoise an expensive lookup; (2) Stub a collaborator with a double
- Common misconception addressed: Memoising a value that can legitimately be nil/false
- Module check: 16 items / 16 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Memoisation with ||= | 64 | 4 |
| M05L02 | Lazy enumerators | 64 | 4 |
| M05L03 | RSpec doubles and shared examples | 64 | 4 |

## Integrative case

An engineer builds a Ruby workflow engine: generate step methods via metaprogramming, expose an internal DSL with instance_eval, parallelise IO with threads mindful of the GVL, and specify behaviour with RSpec doubles.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - Mastemy final-assessment length; no official external exam exists for this skill.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-2584-final-protected | 40 | 40 | yes |
| MST-2584-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Object model | 8 |
| Metaprogramming | 8 |
| Internal DSLs | 8 |
| Concurrency | 8 |
| Performance and testing | 8 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-2584-Q0001** (single-answer, Select ONE) Why does the Global VM Lock (GVL) in CRuby limit speedup for CPU-bound threads?

- A. Only one thread runs Ruby bytecode at a time, so CPU work is not truly parallel **(key)**  
  _Rationale:_ The GVL serialises Ruby execution; threads help mainly with IO waits.
- B. Threads are disabled entirely in CRuby  
  _Rationale:_ Threads exist; the GVL just serialises bytecode execution.
- C. The GVL speeds up all CPU work automatically  
  _Rationale:_ It constrains, not accelerates, CPU-bound parallelism.
- D. Fibers remove the GVL  
  _Rationale:_ Fibers are cooperative and still under the same model.

**MST-2584-Q0002** (multiple-answer, Select TWO) Select TWO accurate statements about method lookup in Ruby's object model.

- A. Modules prepended to a class are searched before the class's own methods **(key)**  
  _Rationale:_ prepend inserts the module earlier in the ancestor chain.
- B. The ancestors array reflects the order methods are searched **(key)**  
  _Rationale:_ Lookup follows the ancestors order from the receiver upward.
- C. Singleton methods are never consulted during lookup  
  _Rationale:_ The singleton class is searched first.
- D. include inserts a module before the class itself in the chain  
  _Rationale:_ include inserts after the class; prepend inserts before.

**MST-2584-Q0003** (single-answer, Select ONE) What is the risk of memoising with @value ||= compute when compute may return nil or false?

- A. Every access re-runs compute because the falsey result is never cached **(key)**  
  _Rationale:_ ||= treats nil/false as unset, defeating memoisation for those values.
- B. It caches the wrong type  
  _Rationale:_ The issue is re-computation, not type.
- C. It raises a NoMethodError  
  _Rationale:_ No error is raised; it just recomputes.
- D. It makes the method thread-safe  
  _Rationale:_ ||= gives no thread-safety guarantee.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
