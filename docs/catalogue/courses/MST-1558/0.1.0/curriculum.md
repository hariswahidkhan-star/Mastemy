# Browser Internals for Developers

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1558` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course; not an official vendor credential) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - skills scope defined by the Mastemy blueprint; no external exam outline exists to verify |
| Legacy IDs | MST-PRG-SK-BID-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Browser Internals for Developers (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. From URL to page
2. The rendering pipeline
3. The CSSOM and style
4. JavaScript execution
5. The event loop in depth
6. Memory and the engine
7. Networking and caching
8. Measuring performance

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate hands-on reasoning about browser internals for web developers; practical work is taught through instructor-built projects and walkthroughs.

## Modules

### M01 From URL to page (MASTEMY-DESIGN 13%)

- Worked applications: (1) Trace what happens after pressing Enter on a URL; (2) Explain how the parser builds the DOM
- Common misconception addressed: Thinking the DOM and the HTML source are identical
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Navigation and the network | 75 | 5 |
| M01L02 | HTML parsing and the DOM | 75 | 5 |

### M02 The rendering pipeline (MASTEMY-DESIGN 13%)

- Worked applications: (1) Identify which stage a change triggers; (2) Batch DOM reads and writes to avoid layout thrash
- Common misconception addressed: Reading layout properties repeatedly inside a loop
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Style, layout, paint and composite | 75 | 5 |
| M02L02 | Reflow vs repaint | 75 | 5 |

### M03 The CSSOM and style (MASTEMY-DESIGN 12%)

- Worked applications: (1) Explain render-blocking CSS; (2) Reduce specificity conflicts
- Common misconception addressed: Assuming CSS never blocks rendering
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Building the CSSOM | 75 | 5 |
| M03L02 | Selector matching and specificity | 75 | 5 |

### M04 JavaScript execution (MASTEMY-DESIGN 13%)

- Worked applications: (1) Explain why a long task blocks interaction; (2) Trace a microtask vs a macrotask
- Common misconception addressed: Believing setTimeout(fn,0) runs immediately
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Parsing, compilation and the call stack | 75 | 5 |
| M04L02 | The event loop and task queues | 75 | 5 |

### M05 The event loop in depth (MASTEMY-DESIGN 12%)

- Worked applications: (1) Schedule visual work with rAF; (2) Order output of promises vs timeouts
- Common misconception addressed: Doing heavy work inside a scroll handler
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Microtasks and macrotasks | 75 | 5 |
| M05L02 | requestAnimationFrame and rendering | 75 | 5 |

### M06 Memory and the engine (MASTEMY-DESIGN 13%)

- Worked applications: (1) Find a detached-DOM memory leak; (2) Explain how GC reclaims unreachable objects
- Common misconception addressed: Assuming setting a variable to null frees memory instantly
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Garbage collection basics | 75 | 5 |
| M06L02 | Memory leaks in the browser | 75 | 5 |

### M07 Networking and caching (MASTEMY-DESIGN 12%)

- Worked applications: (1) Use cache headers to speed repeat visits; (2) Preload a critical resource
- Common misconception addressed: Caching a response that should always be fresh
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M07L01 | HTTP caching and headers | 75 | 5 |
| M07L02 | Preload, prefetch and priorities | 75 | 5 |

### M08 Measuring performance (MASTEMY-DESIGN 12%)

- Worked applications: (1) Profile a janky interaction in DevTools; (2) Interpret LCP, CLS and INP
- Common misconception addressed: Optimising a metric without measuring the real bottleneck
- Module check: 13 items / 13 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M08L01 | DevTools performance profiling | 75 | 5 |
| M08L02 | Core Web Vitals | 75 | 5 |

## Integrative case

Diagnose a slow, janky web page: explain what the browser does from URL to pixels, identify whether the bottleneck is layout, paint, script or network, and propose concrete fixes tied to the rendering pipeline.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam); lengths are a design assumption for a skills course of this scale.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1558-final-protected | 40 | 40 | yes |
| MST-1558-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| From URL to page | 5 |
| The rendering pipeline | 5 |
| The CSSOM and style | 5 |
| JavaScript execution | 5 |
| The event loop in depth | 5 |
| Memory and the engine | 5 |
| Networking and caching | 5 |
| Measuring performance | 5 |

Minimum reviewed item bank: 448 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1558-Q0001** (single-answer, Select ONE) Why does repeatedly reading offsetHeight then changing styles in a loop cause 'layout thrashing'?

- A. Each read forces a synchronous layout after the previous write invalidated it **(key)**  
  _Rationale:_ Correct: interleaving reads and writes forces repeated reflows.
- B. It causes the garbage collector to run  
  _Rationale:_ Thrashing is about forced reflow, not GC.
- C. It blocks the network thread  
  _Rationale:_ Layout runs on the main thread, not the network.
- D. It disables the compositor  
  _Rationale:_ The compositor is not disabled by reads.

**MST-1558-Q0002** (single-answer, Select ONE) In the event loop, when do microtasks (e.g. resolved promise callbacks) run relative to macrotasks?

- A. All pending microtasks drain before the next macrotask runs **(key)**  
  _Rationale:_ Correct: the microtask queue is emptied after each task before rendering/next task.
- B. After all macrotasks have finished  
  _Rationale:_ No; microtasks run between tasks.
- C. Only when the stack is never empty  
  _Rationale:_ They run when the stack empties.
- D. Microtasks and macrotasks run in registration order together  
  _Rationale:_ They are separate queues with microtasks prioritised.

**MST-1558-Q0003** (multiple-answer, Select ALL that apply) Which changes typically avoid a full layout (reflow)? (Select TWO)

- A. Animating transform and opacity, which the compositor can handle **(key)**  
  _Rationale:_ Correct: these can be composited without layout.
- B. Batching DOM reads together and writes together **(key)**  
  _Rationale:_ Correct: avoids interleaved forced reflows.
- C. Changing an element's width in a tight loop  
  _Rationale:_ False; width changes trigger layout.
- D. Querying getBoundingClientRect after every style write  
  _Rationale:_ False; that forces synchronous layout.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
