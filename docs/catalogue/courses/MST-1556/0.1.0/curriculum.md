# Web Performance Optimisation

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-1556` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) |
| Exam code | n/a (skills course) |
| Version basis | n/a (skills course; feature table versioned by verification date) |
| Evidence | **n/a-no-official-syllabus** - no external awarding body; modules and weights are a Mastemy DESIGN ASSUMPTION |
| Legacy IDs | MST-PRG-SK-WPO-001 |
| Planned time | T = 1500 min; instruction I = 1200 min (80%); assessment A = 300 min (20%) |
| Assessment split | lesson checks 75 / module checks 105 / cumulative 120 min |
| Certificate | Mastemy Certificate of Completion — Web Performance Optimisation (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain how web performance is measured with lab and field data
2. Describe how the browser turns resources into pixels
3. Explain optimising images, fonts and network delivery
4. Describe reducing JavaScript cost and main-thread work
5. Explain a measure-fix-verify workflow and performance budgets

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Assesses knowledge and applied reasoning through selection items; does not assess hands-on performance.

## Modules

### M01 Measuring performance (MASTEMY-DESIGN 20%)

- Worked applications: (1) Interpret LCP, CLS and INP for a sample page; (2) Decide whether a regression is real using field data
- Common misconception addressed: Believing a single lab score represents all real users
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Core Web Vitals and user-centric metrics | 120 | 8 |
| M01L02 | Lab vs field data and profiling tools | 120 | 8 |

### M02 The critical rendering path (MASTEMY-DESIGN 20%)

- Worked applications: (1) Identify render-blocking resources in a waterfall; (2) Reorder resource loading to improve first paint
- Common misconception addressed: Assuming all CSS and scripts block rendering equally
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Parsing, render-blocking resources and the critical path | 120 | 8 |
| M02L02 | Render-blocking CSS and JavaScript | 120 | 8 |

### M03 Asset and network optimisation (MASTEMY-DESIGN 20%)

- Worked applications: (1) Choose formats and sizes for a responsive hero image; (2) Set cache headers for static versus dynamic assets
- Common misconception addressed: Thinking a larger image is always higher quality and worth the bytes
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Image and font optimisation | 120 | 8 |
| M03L02 | Compression, caching and HTTP delivery | 120 | 8 |

### M04 JavaScript and runtime cost (MASTEMY-DESIGN 20%)

- Worked applications: (1) Split a bundle so rarely used code loads on demand; (2) Break up a long task causing input delay
- Common misconception addressed: Assuming adding more JavaScript features is free at runtime
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Bundle size, code splitting and tree shaking | 120 | 8 |
| M04L02 | Main-thread work, long tasks and lazy loading | 120 | 8 |

### M05 A performance optimisation workflow (MASTEMY-DESIGN 20%)

- Worked applications: (1) Prioritise three fixes by expected impact and effort; (2) Add a budget check that fails a bloated build
- Common misconception addressed: Optimising random things before measuring where time is spent
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Setting budgets and prioritising fixes | 120 | 8 |
| M05L02 | Verifying improvements and preventing regressions | 120 | 8 |

## Integrative case

A marketing site has a slow largest-contentful-paint and janky interactions on mobile. Measure with lab and field data, find render-blocking resources and heavy JavaScript, prioritise fixes by impact, apply them, then set a performance budget to keep the gains and present the before/after to stakeholders.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-1556-final-protected | 40 | 40 | yes |
| MST-1556-final-alternate | 40 | 40 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Measuring performance | 8 |
| The critical rendering path | 8 |
| Asset and network optimisation | 8 |
| JavaScript and runtime cost | 8 |
| A performance optimisation workflow | 8 |

Minimum reviewed item bank: 450 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-1556-Q0001** (single-answer, Select ONE) A page loads a large render-blocking stylesheet in the head before any content paints. What is the most direct improvement?

- A. Reduce and prioritise critical CSS so rendering is not blocked by non-critical styles **(key)**  
  _Rationale:_ Correct: delivering only critical CSS first unblocks the first paint while the rest loads non-blocking.
- B. Add a second copy of the stylesheet  
  _Rationale:_ Duplicating the stylesheet adds bytes and does not unblock rendering.
- C. Convert the CSS to a large inline image  
  _Rationale:_ An image cannot replace stylesheet rules and would add weight.
- D. Ignore it because CSS never affects load time  
  _Rationale:_ Render-blocking CSS directly delays first paint.

**MST-1556-Q0002** (multiple-answer, Select TWO) Which TWO techniques reduce the amount of JavaScript executed on initial load? (Select TWO.)

- A. Code splitting so non-critical code loads on demand **(key)**  
  _Rationale:_ Correct: splitting defers code until it is needed, shrinking the initial payload.
- B. Tree shaking to drop unused exports from the bundle **(key)**  
  _Rationale:_ Correct: tree shaking removes dead code from the shipped bundle.
- C. Inlining every dependency into one large bundle  
  _Rationale:_ One large bundle increases, not reduces, initial JavaScript.
- D. Running all analytics synchronously at startup  
  _Rationale:_ Synchronous startup work adds main-thread cost, worsening load.

**MST-1556-Q0003** (single-answer, Select ONE) Before optimising, what should guide which fixes to make first?

- A. Measurement showing where time is actually spent, ranked by impact **(key)**  
  _Rationale:_ Correct: measuring first ensures effort targets the real bottlenecks.
- B. Guessing based on which code looks oldest  
  _Rationale:_ Code age is not evidence of a performance bottleneck.
- C. Optimising the smallest files first for quick wins  
  _Rationale:_ Small files are rarely the bottleneck; impact should drive order.
- D. Changing everything at once without measuring  
  _Rationale:_ Changing everything blindly makes impact impossible to attribute.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
