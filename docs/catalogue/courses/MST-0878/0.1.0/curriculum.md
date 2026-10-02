# Angular: Enterprise Frontend Application Development

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0878` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | general-professional-skills |
| Issuer | Mastemy (no external awarding body) (no affiliation or endorsement) |
| Exam code | n/a |
| Version basis | Mastemy design. Official vendor pages were proxy-blocked (EGRESS_BLOCKED) in this session; re-check against the vendor's current official documentation at blueprint review. |
| Evidence | **unverified-needs-official-check** - no official source read this session (vendor pages proxy-blocked); confirm at blueprint review |
| Planned time | T = 1200 min; instruction I = 960 min (80%); assessment A = 240 min (20%) |
| Assessment split | lesson checks 60 / module checks 84 / cumulative 96 min |
| Certificate | Mastemy Certificate of Completion — Angular: Enterprise Frontend Application Development (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Structure an Angular application with components
2. Use Angular dependency injection effectively
3. Implement routing, guards and reactive forms
4. Manage data, HTTP and change detection

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Selection items cannot demonstrate production coding/operational ability; that is taught through instructor-built projects and walkthroughs.

## Modules

### M01 Angular architecture and components (MASTEMY-DESIGN 25%)

- Worked applications: (1) Build a component with input/output bindings; (2) Convert an NgModule feature to standalone components
- Common misconception addressed: Confusing property binding [x] with event binding (x)
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Components, templates and data binding | 120 | 7 |
| M01L02 | Modules, standalone components and bootstrapping | 120 | 7 |

### M02 Dependency injection and services (MASTEMY-DESIGN 25%)

- Worked applications: (1) Provide a service at root vs component level; (2) Inject a configuration token into a service
- Common misconception addressed: Assuming a service provided in a component is a global singleton
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Providers, injectors and hierarchical DI | 120 | 7 |
| M02L02 | Services, singletons and injection scope | 120 | 7 |

### M03 Routing and forms (MASTEMY-DESIGN 25%)

- Worked applications: (1) Lazy-load a feature route behind a guard; (2) Build a reactive form with cross-field validation
- Common misconception addressed: Expecting template-driven and reactive forms to share the same validation API
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Router configuration, guards and lazy loading | 120 | 7 |
| M03L02 | Reactive forms and validation | 120 | 7 |

### M04 HTTP, state and change detection (MASTEMY-DESIGN 25%)

- Worked applications: (1) Add an auth interceptor to attach a token; (2) Switch a component to OnPush and fix a stale view
- Common misconception addressed: Believing OnPush updates a view when a mutated object keeps the same reference
- Module check: 21 items / 21 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | HttpClient, interceptors and error handling | 120 | 7 |
| M04L02 | Change detection and OnPush performance | 120 | 7 |

## Integrative case

Build an enterprise admin module: standalone components with OnPush change detection, a lazy-loaded route protected by a guard, a reactive form with validation, an HTTP interceptor for auth, and a service provided at the right injector scope.

## Cumulative assessment

Form length basis: Mastemy final assessment (no external exam).

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0878-final-protected | 40 | 48 | yes |
| MST-0878-final-alternate | 40 | 48 | no (optional practice) |

| Domain | Items per form |
|---|---|
| Angular architecture and components | 10 |
| Dependency injection and services | 10 |
| Routing and forms | 10 |
| HTTP, state and change detection | 10 |

Minimum reviewed item bank: 360 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0878-Q0001** (single-answer, Select ONE) A component uses ChangeDetectionStrategy.OnPush. You mutate an object's property in place without changing its reference. What happens to the view?

- A. It may not update, because OnPush checks input reference identity **(key)**  
  _Rationale:_ Correct: OnPush relies on reference changes; in-place mutation can be missed.
- B. It always updates immediately  
  _Rationale:_ That is default change detection, not OnPush.
- C. It throws a runtime error  
  _Rationale:_ No error is thrown; the view simply may go stale.
- D. It triggers a full application re-bootstrap  
  _Rationale:_ Change detection never re-bootstraps the app.

**MST-0878-Q0002** (multiple-answer, Select TWO) Which TWO statements about Angular dependency injection are correct? (Select TWO.)

- A. A service providedIn 'root' is a single app-wide instance **(key)**  
  _Rationale:_ Correct: root providers yield one shared singleton.
- B. Providing a service in a component creates an instance scoped to that component tree **(key)**  
  _Rationale:_ Correct: component-level providers scope the instance to that subtree.
- C. Every injected service is always a global singleton  
  _Rationale:_ Scope depends on where it is provided.
- D. Injectors cannot be hierarchical  
  _Rationale:_ Angular injectors are explicitly hierarchical.

**MST-0878-Q0003** (single-answer, Select ONE) Which binding syntax listens for a DOM event and calls a handler?

- A. (click)="onClick()" **(key)**  
  _Rationale:_ Correct: parentheses denote event binding.
- B. [click]="onClick()"  
  _Rationale:_ Square brackets are property binding, not event binding.
- C. {{ onClick() }}  
  _Rationale:_ Interpolation renders a value; it is not for events.
- D. #click="onClick()"  
  _Rationale:_ The hash defines a template reference variable.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
