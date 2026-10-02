# Advanced Angular: RxJS, State, and Performance

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0879` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1800 min; instruction I = 1440 min (80%); assessment A = 360 min (20%) |
| Assessment split | lesson checks 90 / module checks 126 / cumulative 144 min |
| Certificate | Mastemy Certificate of Completion — Advanced Angular: RxJS, State, and Performance (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Use RxJS observables and core operators
2. Select the correct higher-order mapping operator
3. Handle errors and multicast observables
4. Apply Angular state-management patterns
5. Optimise Angular rendering performance
6. Test reactive Angular code

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 RxJS observables and operators (MASTEMY-DESIGN 17%)

- Worked applications: (1) Replace manual subscribe with the async pipe; (2) Combine two streams with combineLatest
- Common misconception addressed: Forgetting to unsubscribe from a long-lived manual subscription
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Observables, subscriptions and the async pipe | 120 | 7 |
| M01L02 | Transformation and combination operators | 120 | 7 |

### M02 Higher-order mapping and flattening (MASTEMY-DESIGN 17%)

- Worked applications: (1) Use switchMap for a type-ahead search; (2) Use exhaustMap to ignore double submits
- Common misconception addressed: Using mergeMap for search and leaking stale responses
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | switchMap, mergeMap, concatMap and exhaustMap | 120 | 7 |
| M02L02 | Choosing the right flattening operator | 120 | 7 |

### M03 Error handling and multicasting (MASTEMY-DESIGN 17%)

- Worked applications: (1) Recover a failed stream with catchError and retry; (2) Share one HTTP result with shareReplay
- Common misconception addressed: Assuming catchError placed after the source re-subscribes to it
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | catchError, retry and resilient streams | 120 | 7 |
| M03L02 | Subjects, shareReplay and multicasting | 120 | 7 |

### M04 State management patterns (MASTEMY-DESIGN 17%)

- Worked applications: (1) Model feature state with a service and BehaviorSubject; (2) Convert derived state to Angular signals
- Common misconception addressed: Expecting a plain BehaviorSubject to give replay to late subscribers beyond its current value
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Component state vs a store | 120 | 7 |
| M04L02 | Signals and reactive state | 120 | 7 |

### M05 Performance and change detection (MASTEMY-DESIGN 17%)

- Worked applications: (1) Add trackBy to stop list re-rendering; (2) Run a high-frequency task outside Angular's zone
- Common misconception addressed: Believing trackBy improves performance without a stable identity key
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | OnPush, trackBy and memoized selectors | 120 | 7 |
| M05L02 | Zone.js, runOutsideAngular and bundle size | 120 | 7 |

### M06 Testing reactive Angular (MASTEMY-DESIGN 17%)

- Worked applications: (1) Write a marble test for a debounced stream; (2) Test a component using the async pipe
- Common misconception addressed: Treating asynchronous observable emissions as synchronous in tests
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M06L01 | Marble testing observables | 120 | 7 |
| M06L02 | Testing components with async state | 120 | 7 |

## Integrative case

Build a live search dashboard: a debounced type-ahead using switchMap, resilient HTTP with catchError and shareReplay, feature state via signals and a store service, OnPush components with trackBy, and marble tests for the search stream.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0879-final-protected | 40 | 50 | yes |
| MST-0879-final-alternate | 40 | 50 | no (optional practice) |

| Domain | Items per form |
|---|---|
| RxJS observables and operators | 7 |
| Higher-order mapping and flattening | 7 |
| Error handling and multicasting | 7 |
| State management patterns | 7 |
| Performance and change detection | 6 |
| Testing reactive Angular | 6 |

Minimum reviewed item bank: 500 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0879-Q0001** (single-answer, Select ONE) A type-ahead search issues an HTTP request per keystroke. Which operator ensures only the latest request's result is used and in-flight older requests are cancelled?

- A. switchMap **(key)**  
  _Rationale:_ Correct: switchMap unsubscribes from the previous inner observable when a new value arrives.
- B. mergeMap  
  _Rationale:_ mergeMap keeps all inner subscriptions, so stale responses can arrive late.
- C. concatMap  
  _Rationale:_ concatMap queues requests in order, delaying the latest result.
- D. exhaustMap  
  _Rationale:_ exhaustMap ignores new values while one is in flight, dropping newer keystrokes.

**MST-0879-Q0002** (multiple-answer, Select TWO) Which TWO practices help an Angular app avoid memory and performance problems with RxJS? (Select TWO.)

- A. Using the async pipe so subscriptions clean up with the component **(key)**  
  _Rationale:_ Correct: the async pipe unsubscribes automatically on destroy.
- B. Using shareReplay to avoid duplicate HTTP calls for shared data **(key)**  
  _Rationale:_ Correct: shareReplay multicasts one result to many subscribers.
- C. Manually subscribing in ngOnInit and never unsubscribing  
  _Rationale:_ That leaks subscriptions for long-lived streams.
- D. Calling subscribe inside a template expression  
  _Rationale:_ That creates repeated subscriptions on every change detection.

**MST-0879-Q0003** (single-answer, Select ONE) *ngFor re-renders an entire list whenever the array reference changes. What does a correct trackBy function require to help?

- A. A stable unique identity for each item (such as an id) **(key)**  
  _Rationale:_ Correct: trackBy must return a stable key so Angular can reuse DOM nodes.
- B. The array index, which is always stable across reorders  
  _Rationale:_ Index is not stable when items are reordered or removed.
- C. A new object per render to force updates  
  _Rationale:_ New objects defeat tracking and cause more re-rendering.
- D. Nothing; trackBy works without a return value  
  _Rationale:_ trackBy must return a key to be effective.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
