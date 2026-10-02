# React Performance Optimization and Profiling

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0871` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor/product documentation pages were proxy-blocked (EGRESS_BLOCKED) in this session; no official syllabus or weighting is published for this skills course. Re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor/product pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — React Performance Optimization and Profiling (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Explain React's render and reconciliation model
2. Apply memoization correctly
3. Profile with React DevTools
4. Improve loading with code splitting and virtualisation

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding ability; code is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Rendering model (MASTEMY-DESIGN 25%)

- Worked applications: (1) Explain why a specific component re-rendered; (2) Fix a list missing stable keys
- Common misconception addressed: Thinking a state change re-renders the whole application
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | How React renders and re-renders | 120 | 7 |
| M01L02 | Reconciliation and keys | 120 | 7 |

### M02 Memoization (MASTEMY-DESIGN 25%)

- Worked applications: (1) Memoize an expensive computation; (2) Stabilise a callback passed to a memoized child
- Common misconception addressed: Wrapping everything in useMemo by default
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | memo, useMemo and useCallback | 120 | 7 |
| M02L02 | When memoization helps and when it hurts | 120 | 7 |

### M03 Profiling (MASTEMY-DESIGN 25%)

- Worked applications: (1) Profile a janky interaction; (2) Identify the component causing extra re-renders
- Common misconception addressed: Optimising before measuring
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | The React DevTools Profiler | 120 | 7 |
| M03L02 | Finding wasted renders and slow commits | 120 | 7 |

### M04 Loading performance (MASTEMY-DESIGN 25%)

- Worked applications: (1) Lazy-load a route with Suspense; (2) Virtualise a long list
- Common misconception addressed: Shipping one large bundle for the whole app
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Code splitting and lazy loading | 120 | 7 |
| M04L02 | Virtualisation and bundle size | 120 | 7 |

## Integrative case

A React dashboard feels sluggish: use the Profiler to find wasted renders, add stable keys and targeted memoization to cut them, code-split heavy routes and virtualise a long table, and confirm the improvement by re-profiling.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0871-final-protected | 40 | 50 | yes |
| MST-0871-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Rendering model | 10 |
| Memoization | 10 |
| Profiling | 10 |
| Loading performance | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)


**MST-0871-Q0001** (single-answer, Select ONE) When a component's state changes, by default React re-renders...

- A. that component and its descendants **(key)**  
  _Rationale:_ Correct: a state update re-renders the component and its subtree.
- B. the entire application every time  
  _Rationale:_ React does not re-render unrelated trees.
- C. only the DOM text nodes  
  _Rationale:_ Rendering is about components, not just text.
- D. nothing until a full page reload  
  _Rationale:_ State changes update without reload.

**MST-0871-Q0002** (multiple-answer, Select TWO) Which TWO statements about memoization in React are correct? (Select TWO.)

- A. useCallback stabilises a function's identity across renders **(key)**  
  _Rationale:_ Correct: it preserves the same function reference.
- B. React.memo skips re-render when props are shallowly equal **(key)**  
  _Rationale:_ Correct: memo compares props shallowly to skip work.
- C. useMemo should wrap every value in a component  
  _Rationale:_ Over-memoizing adds overhead without benefit.
- D. Memoization is always free  
  _Rationale:_ Memoization has its own comparison and memory cost.

**MST-0871-Q0003** (single-answer, Select ONE) The right first step when a UI feels slow is to...

- A. profile and measure where time is actually spent **(key)**  
  _Rationale:_ Correct: measurement guides effective optimisation.
- B. wrap everything in memo immediately  
  _Rationale:_ Blind memoization can hurt and hides the real cause.
- C. rewrite the app in another framework  
  _Rationale:_ That is disproportionate and unmeasured.
- D. add more component state  
  _Rationale:_ More state does not address performance.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
